"""Keep reference responses, text, timestamps and hashes locally; never publish article bodies."""
import argparse
import fcntl
import concurrent.futures
import datetime as dt
import hashlib
import http.client
import json
import re
from html.parser import HTMLParser
from pathlib import Path
import time
import subprocess
import shutil
import threading
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data/raw/research"
INDEX = ROOT / "data/research/fetches.json"
HISTORY = ROOT / "data/research/fetch-history.jsonl"
HISTORY_LOCK = threading.Lock()


def record_request(entry):
    with HISTORY_LOCK, HISTORY.open("a", encoding="utf-8") as journal:
        journal.write(json.dumps(entry, ensure_ascii=False) + "\n")


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
        if tag in ("p", "div", "br", "h1", "h2", "h3", "li"):
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)


def now():
    return dt.datetime.now(dt.timezone.utc).isoformat()


def collect(source, previous):
    url = source["url"]
    key = hashlib.sha256(url.encode()).hexdigest()[:24]
    old = previous.get(url)
    path = ROOT / old['rawPath'] if old and old.get('rawPath') else RAW / f"{key}.html"
    if old and path.exists() and hashlib.sha256(path.read_bytes()).hexdigest() == old.get("sha256"):
        text_path = ROOT / old['textPath'] if old.get('textPath') else path.with_suffix('.txt')
        revision_match = re.search(rb'oldid=(\d+)', path.read_bytes())
        checked_at = now()
        record_request({"action": "cache-check", "url": url, "checkedAt": checked_at,
                        "retrievedAt": old.get("retrievedAt"), "sha256": old["sha256"]})
        return {**old, "references": source.get("references", []), "lastCacheCheckAt": checked_at,
                "revisionId": int(revision_match.group(1)) if revision_match else old.get('revisionId'),
                "textSha256": hashlib.sha256(text_path.read_bytes()).hexdigest() if text_path.exists() else None}
    encoded = urllib.parse.quote(url, safe=":/?&=%#@+;")
    for attempt in range(3):
        started_at = now()
        try:
            request = urllib.request.Request(encoded, headers={"User-Agent": "TimeAtlas/0.1 (local educational reference audit)"})
            with urllib.request.urlopen(request, timeout=35) as response:
                charset = response.headers.get_content_charset() or "utf-8"
                content_type = response.headers.get_content_type()
                resolved = response.url
                status = response.status
                data = response.read()
            if content_type == "application/pdf":
                path = path.with_suffix('.pdf')
            path.write_bytes(data)
            plain = path.with_suffix(".txt")
            if content_type == "application/pdf":
                if shutil.which('pdftotext'):
                    subprocess.run(['pdftotext', '-layout', str(path), str(plain)], check=True)
                else:
                    plain.write_text('Original PDF preserved. No local PDF text extractor. Web search evidence is retained in data/research/searches/2026-10-06-cultural-records.json.\n')
                revision = None
            else:
                decoded = data.decode(charset, errors="replace")
                parser = TextExtractor()
                parser.feed(decoded)
                lines = [line.strip() for line in "".join(parser.parts).splitlines() if line.strip()]
                plain.write_text("\n".join(lines), encoding="utf-8")
                revision_match = re.search(r'oldid[=\\\"]+(\d+)', decoded)
                revision = int(revision_match.group(1)) if revision_match else None
            retrieved_at = now()
            record_request({"action": "fetch", "url": url, "startedAt": started_at,
                            "retrievedAt": retrieved_at, "attempt": attempt + 1,
                            "resolvedUrl": resolved, "status": status,
                            "rawPath": str(path.relative_to(ROOT)), "sha256": hashlib.sha256(data).hexdigest()})
            return {"url": url, "resolvedUrl": resolved, "title": source.get("title"), "retrievedAt": retrieved_at, "status": status,
                    "rawPath": str(path.relative_to(ROOT)), "textPath": str(plain.relative_to(ROOT)),
                    "sha256": hashlib.sha256(data).hexdigest(), "textSha256": hashlib.sha256(plain.read_bytes()).hexdigest(), "bytes": len(data), "contentType": content_type, "revisionId": revision, "references": source.get("references", []),
                    "usage": "Local verification only; website contains project-authored summaries and links."}
        except (urllib.error.URLError, TimeoutError, OSError, http.client.HTTPException) as error:
            attempted_at = now()
            failure = {"error": str(error)}
            if isinstance(error, http.client.IncompleteRead) and error.partial:
                partial_hash = hashlib.sha256(error.partial).hexdigest()
                partial_path = RAW / f"{key}-incomplete-{partial_hash[:12]}.bin"
                partial_path.write_bytes(error.partial)
                failure.update({"partialRawPath": str(partial_path.relative_to(ROOT)),
                                "partialSha256": partial_hash,
                                "partialBytes": len(error.partial)})
            if isinstance(error, urllib.error.HTTPError):
                failure["status"] = error.code
                try:
                    body = error.read()
                    if body:
                        body_hash = hashlib.sha256(body).hexdigest()
                        failure_path = RAW / f"{key}-error-{error.code}-{body_hash[:12]}.html"
                        failure_path.write_bytes(body)
                        failure.update({"failureRawPath": str(failure_path.relative_to(ROOT)),
                                        "failureSha256": body_hash})
                except (OSError, http.client.HTTPException):
                    pass
            record_request({"action": "fetch-failed", "url": url, "startedAt": started_at,
                            "attemptedAt": attempted_at, "attempt": attempt + 1, **failure})
            if attempt == 2:
                return {"url": url, "title": source.get("title"), "attemptedAt": attempted_at, **failure,
                        "references": source.get("references", [])}
            time.sleep(2 * (attempt + 1))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", nargs="?", default="data/research/references.json")
    args = parser.parse_args()
    sources = json.loads((ROOT / args.manifest).read_text())["sources"]
    RAW.mkdir(parents=True, exist_ok=True)
    INDEX.parent.mkdir(parents=True, exist_ok=True)
    old = json.loads(INDEX.read_text()) if INDEX.exists() else {"sources": []}
    previous = {source["url"]: source for source in old["sources"]}
    output = dict(previous)
    # Modest concurrency. Every response is retained, including redirects and failures.
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(collect, source, previous) for source in sources]
        for future in concurrent.futures.as_completed(futures):
            source = future.result()
            output[source["url"]] = source
            INDEX.write_text(json.dumps({"updatedAt": now(), "sources": sorted(output.values(), key=lambda s: s["url"])}, ensure_ascii=False, indent=2) + "\n")
            print(("FAILED " if "error" in source else "SAVED ") + source["url"], flush=True)


if __name__ == "__main__":
    # A second collector must not overwrite a newer index with an old snapshot.
    INDEX.parent.mkdir(parents=True, exist_ok=True)
    with (INDEX.parent / ".fetch.lock").open("w") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            raise SystemExit("Another reference collection is running. Wait for it to finish.")
        main()
