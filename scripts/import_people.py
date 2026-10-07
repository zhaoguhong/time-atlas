#!/usr/bin/env python3
"""Fetch a bounded, reviewed list of Wikidata entities; preserve revisions and raw hashes.

The browser uses the generated snapshot and never depends on a remote API.
Default reuses validated caches; --refresh explicitly creates a new source snapshot.
"""
import argparse, hashlib, json, re, time, urllib.parse, urllib.request
from pathlib import Path
from datetime import datetime, timezone
ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'data/raw/people'
OUT = ROOT / 'src/data/generated/people.json'
LOCK = ROOT / 'data/people.sources.json'
API = 'https://www.wikidata.org/w/api.php'
WIKI_API = 'https://zh.wikipedia.org/w/api.php'
UA = 'TimeAtlas/0.2 (educational historical atlas; bounded static data import)'

def fetch(params, cache_name, refresh, records, api=API):
    path = RAW / cache_name
    url = api + '?' + urllib.parse.urlencode({'format':'json',**params})
    checkpoint=RAW/'fetch-index.json'
    saved=json.loads(checkpoint.read_text()) if checkpoint.exists() else {}
    old = saved.get(cache_name) or next((r for r in records if r['file'] == cache_name), None)
    cached = path.exists() and not refresh and old and old['url'] == url
    if cached:
        raw = path.read_bytes()
        if hashlib.sha256(raw).hexdigest() != old['sha256']:
            raise ValueError('Cache checksum mismatch: '+str(path))
    else:
        for attempt in range(6):
            try:
                time.sleep(1.2)
                req = urllib.request.Request(url, headers={'User-Agent':UA})
                raw = urllib.request.urlopen(req, timeout=45).read()
                parsed = json.loads(raw)
                if 'error' in parsed: raise ValueError(parsed['error'])
                path.write_bytes(raw)
                break
            except Exception:
                if attempt == 5: raise
                time.sleep(15 * (attempt + 1))
    retrieved_at = old.get('retrievedAt') if cached else None
    if not retrieved_at:
        retrieved_at = datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).isoformat()
    record = {'file':cache_name,'url':url,'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'retrievedAt':retrieved_at}
    saved[cache_name]=record; checkpoint.write_text(json.dumps(saved,ensure_ascii=False,indent=2)+'\n')
    return json.loads(raw), record

def year(claims):
    values = [c for c in claims if c.get('rank') != 'deprecated' and c.get('mainsnak',{}).get('snaktype') == 'value']
    preferred = [c for c in values if c.get('rank') == 'preferred']
    if preferred: values = preferred
    years = set()
    for claim in values:
        value = claim['mainsnak'].get('datavalue',{}).get('value',{})
        if value.get('precision',0) < 9 or value.get('before',0) or value.get('after',0): continue
        # Approximation/disputed values stay unknown rather than being silently exact.
        qualifiers = claim.get('qualifiers',{})
        if 'P1480' in qualifiers: continue
        match = re.match(r'([+-])0*(\d+)-',value.get('time',''))
        if match:
            number = int(match[2]) * (-1 if match[1] == '-' else 1)
            if number: years.add(number)
    return next(iter(years)) if len(years) == 1 else None

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--refresh',action='store_true'); args=parser.parse_args()
    RAW.mkdir(parents=True,exist_ok=True); OUT.parent.mkdir(parents=True,exist_ok=True)
    old=json.loads(LOCK.read_text()) if LOCK.exists() else {'requests':[]}
    seeds=json.loads((ROOT/'data/people-seeds.json').read_text())
    extra_seeds=json.loads((ROOT/'data/people-extra-seeds.json').read_text())
    # A few ambiguous Wikipedia titles need explicit disambiguation; do not accept a modern namesake.
    titles={'李靖':'李靖 (唐朝)','杨广':'隋炀帝','陈后主':'陳叔寶','王小波':'王小波 (北宋)','李顺':'李顺 (北宋)','王蒙':'王蒙 (元朝)','王恂':'王恂 (元朝)','李春':'李春 (隋朝)','李密':'李密 (隋朝)','李冶':'李冶 (数学家)','田文':'孟尝君','田文镜':'田文镜','窦太后':'孝文窦皇后','萧皇后':'萧皇后 (隋炀帝)','明珠':'纳兰明珠','冯太后':'文明太后'}
    # Remove non-person entries or people mistakenly placed in a period during seed curation.
    excluded={'瓦岗军','陈寅恪','貂蝉','花木兰'}
    items=[]; seen=set()
    for era,names in seeds.items():
        for name in names:
            if name in excluded or name in seen: continue
            seen.add(name); items.append({'name':name,'era':era,'title':titles.get(name,name)})
    for era,names in extra_seeds.items():
        for name in names:
            if name in seen: continue
            seen.add(name); items.append({'name':name,'era':era,'title':{'王建':'王建 (前蜀)','庆亲王奕劻':'奕劻','刘据':'劉據'}.get(name,name)})
    for item in items:
        if item['name']=='陈寿': item['era']='three'
    existing=dict(re.findall(r"p\(\s*'([^']+)',\s*'([^']+)'",(ROOT/'src/data/content.ts').read_text()))
    legacy={name:id for id,name in existing.items()}
    special={'苏轼':'sushi','李白':'libai','李清照':'liqingzhao','王羲之':'wangxizhi','孔子':'confucius','墨子':'mozi','孟子':'mengzi','辛弃疾':'xinqiji','陶渊明':'taoyuanming','徐霞客':'xuxiake','郑成功':'zhengchenggong','王守仁':'wangyangming','欧阳修':'ouyangxiu','司马光':'simaguang','朱熹':'zhuxi','鲁迅':'luxun-writer'}
    extra_aliases={'苏轼':['苏东坡','东坡','子瞻','sushi','su shi'],'李白':['李太白','太白','青莲居士'],'康熙帝':['康熙','爱新觉罗玄烨','玄烨','清圣祖'],'乾隆帝':['乾隆','弘历'],'雍正帝':['雍正','胤禛'],'王守仁':['王阳明','阳明'],'郑燮':['郑板桥'],'纳兰性德':['纳兰容若','容若'],'纪昀':['纪晓岚'],'文成公主':['文成'],'刘伯温':['刘基'],'屈原':['屈平'],'李清照':['易安居士','易安'],'陶渊明':['陶潜','元亮'],'曹雪芹':['曹霑'],'李隆基':['唐玄宗'],'武则天':['武曌'],'孙中山':['孙文','孙逸仙']}
    # Resolve Chinese Wikipedia redirects/conversion first. Direct wbgetentities titles
    # silently misses simplified titles whose actual page name uses traditional Chinese.
    records=[]; resolved={}; rejected={}; entities={}
    # Explicitly reviewed identities for pages with modern namesakes/disambiguation.
    identity_overrides={'李靖':'Q706792','吴镇':'Q704735','王蒙':'Q700903','王祯':'Q716074','李诫':'Q1822568','刘墉':'Q6653873','陈寿':'Q468890','陈平':'Q707658','甘德':'Q403757','张载':'Q197338','杨炯':'Q5370024','邹衍':'Q227022'}
    for batch_index in range(0,len(items),45):
        batch=items[batch_index:batch_index+45]
        result,record=fetch({'action':'query','titles':'|'.join(i['title'] for i in batch),'prop':'pageprops','ppprop':'wikibase_item','redirects':1,'converttitles':1},f'titles-{batch_index//45:02d}.json',args.refresh,old['requests'],WIKI_API)
        records.append(record)
        query=result.get('query',{})
        redirects={r['from']:r['to'] for key in ['normalized','converted','redirects'] for r in query.get(key,[])}
        pages={p.get('title'):p for p in query.get('pages',{}).values()}
        for item in batch:
            title=item['title']; visited=set()
            while title in redirects and title not in visited:
                visited.add(title); title=redirects[title]
            qid=pages.get(title,{}).get('pageprops',{}).get('wikibase_item')
            if qid: resolved[item['name']]={**item,'qid':qid,'pageTitle':title}
            else: rejected[item['name']]='No unambiguous linked entity'
        print(f'Resolved {min(batch_index+45,len(items))}/{len(items)} titles',flush=True)
    for name,qid in identity_overrides.items():
        item=next(i for i in items if i['name']==name)
        resolved[name]={**item,'qid':qid,'pageTitle':item['title']}; rejected.pop(name,None)
    ids=list(dict.fromkeys(i['qid'] for i in resolved.values()))
    for batch_index in range(0,len(ids),45):
        result,record=fetch({'action':'wbgetentities','ids':'|'.join(ids[batch_index:batch_index+45]),'props':'info|labels|descriptions|aliases|claims|sitelinks','languages':'zh|zh-hans|zh-hant|en'},f'entities-{batch_index//45:02d}.json',args.refresh,old['requests'])
        records.append(record); entities.update(result.get('entities',{}))
        print(f'Fetched {min(batch_index+45,len(ids))}/{len(ids)} entities',flush=True)
    occupations=list(dict.fromkeys(c.get('mainsnak',{}).get('datavalue',{}).get('value',{}).get('id') for entity in entities.values() for c in entity.get('claims',{}).get('P106',[]) if c.get('mainsnak',{}).get('datavalue',{}).get('value',{}).get('id')))
    roles={}
    for batch_index in range(0,len(occupations),45):
        result,record=fetch({'action':'wbgetentities','ids':'|'.join(occupations[batch_index:batch_index+45]),'props':'labels','languages':'zh|zh-hans|zh-hant'},f'occupations-{batch_index//45:02d}.json',args.refresh,old['requests'])
        records.append(record)
        for qid,entity in result.get('entities',{}).items():
            roles[qid]=next((entity['labels'][lang]['value'] for lang in ['zh-hans','zh','zh-hant'] if lang in entity.get('labels',{})),None)
    era_names={'warring':'春秋战国','qin':'秦代','han':'两汉','three':'汉末三国','jin':'两晋十六国','north-south':'南北朝','sui':'隋代','tang':'唐代','five':'五代十国','song':'宋辽夏金','yuan':'元代','ming':'明代','qing':'清代至近代'}
    era_limits={'qin':(-221,-207),'han':(-206,219),'three':(180,280),'jin':(265,420),'north-south':(386,589),'sui':(581,618),'tang':(618,907),'five':(907,979),'song':(916,1279),'yuan':(1206,1368),'ming':(1368,1644),'qing':(1616,1912)}
    collected={}
    for matched in resolved.values():
            qid=matched['qid']; entity=entities.get(qid,{})
            if qid.startswith('-') or 'missing' in entity: continue
            if not any(c.get('mainsnak',{}).get('datavalue',{}).get('value',{}).get('id') == 'Q5' for c in entity.get('claims',{}).get('P31',[])):
                rejected[matched['name']]='Entity is not a historical human'; continue
            candidates={v['value'] for v in entity.get('labels',{}).values()}
            candidates.add(entity.get('sitelinks',{}).get('zhwiki',{}).get('title',''))
            candidates.update(a['value'] for values in entity.get('aliases',{}).values() for a in values)
            candidates.add(matched['pageTitle'])
            name=next((legacy_name for legacy_name in legacy if legacy_name in candidates),matched['name']); labels=entity.get('labels',{}); descriptions=entity.get('descriptions',{})
            role=next((descriptions[lang]['value'] for lang in ['zh-hans','zh','zh-hant'] if lang in descriptions),None)
            occupation_labels=list(dict.fromkeys(roles.get(c.get('mainsnak',{}).get('datavalue',{}).get('value',{}).get('id')) for c in entity.get('claims',{}).get('P106',[]) if roles.get(c.get('mainsnak',{}).get('datavalue',{}).get('value',{}).get('id'))))
            if not role: role=era_names[matched['era']]+' · '+('、'.join(occupation_labels[:3]) if occupation_labels else '历史人物')
            birth=year(entity.get('claims',{}).get('P569',[])); death=year(entity.get('claims',{}).get('P570',[]))
            if birth and birth > 1912:
                rejected[name]='Modern namesake'; continue
            if birth and death and birth > death:
                rejected[name]='Contradictory dates'; continue
            limit=era_limits.get(matched['era'])
            if limit and ((birth and birth > limit[1]) or (death and death < limit[0])):
                rejected[name]='Lifetime incompatible with curated period'; continue
            revision=entity.get('lastrevid')
            aliases=list(dict.fromkeys(sorted(a for a in candidates if a and a != name)+[matched['name']]+extra_aliases.get(name,[])))
            summary=role.rstrip('。')+'。'
            collected[qid]={'id':legacy.get(name,special.get(name,qid.lower())),'name':name,'birth':birth,'death':death,'role':role,'summary':summary,'biography':summary,'color':['#6b8a82','#9c865e','#8b8197','#698996'][ord(name[0])%4],'aliases':aliases,'era':matched['era'],'recordKind':'catalog','wikidata':qid,'revision':revision,'sources':[{'title':f'Wikidata · {name} ({qid})','url':f'https://www.wikidata.org/w/index.php?title={qid}&oldid={revision}' if revision else f'https://www.wikidata.org/wiki/{qid}','note':'CC0 结构化基础资料；简介采用中文身份描述或职业字段。未知或有多种纪年的生卒年不填单一值。'}]}
    output=sorted(collected.values(),key=lambda p:(p['era'],p['birth'] or 0,p['name']))
    OUT.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
    missing=[i['name'] for i in items if not any(p['name']==i['name'] or i['name'] in p['aliases'] for p in output)]
    manifest={'source':'Wikidata','license':'CC0','generatedAt':datetime.now(timezone.utc).isoformat(),'seedFiles':[{'file':file,'sha256':hashlib.sha256((ROOT/'data'/file).read_bytes()).hexdigest()} for file in ['people-seeds.json','people-extra-seeds.json']],'count':len(output),'requested':len(items),'unresolved':missing,'rejected':rejected,'requests':records,'outputSha256':hashlib.sha256(OUT.read_bytes()).hexdigest()}
    LOCK.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    public=ROOT/'public/data/content-provenance.json'; public.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print('Unresolved (review explicitly, never silently substitute):',', '.join(missing),flush=True)
    print(f'Wrote {len(output)} sourced profiles to {OUT.relative_to(ROOT)}',flush=True)
if __name__=='__main__':main()
