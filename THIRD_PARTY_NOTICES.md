# Third-party data attribution

Project-owned software and development documentation are licensed under [MIT](LICENSE). Project-owned original historical reading text is licensed under [CC BY 4.0](LICENSES/CC-BY-4.0.txt), as scoped in [LICENSE-CONTENT.md](LICENSE-CONTENT.md). These grants do not replace the licenses or rights of the third-party materials listed below.

## Cliopatria / Seshat

Historical territory layers are adapted from **Cliopatria**, part of the **Seshat Global History Databank**. Credits include dataset editors **Ed Chalstrey, James Bennett and Erin Mutch**, and the project contributors.

- Project: <https://github.com/Seshat-Global-History-Databank/cliopatria>
- Source revision: `5f433377139a6eeaeacbdc894b70f8805b72c8b5`
- Original license notice: <https://github.com/Seshat-Global-History-Databank/cliopatria/blob/5f433377139a6eeaeacbdc894b70f8805b72c8b5/LICENSE.md>
- License: [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)
- Dataset archive and initial creator credits: <https://zenodo.org/records/13363121>
- Methods paper: <https://doi.org/10.1038/s41597-025-04516-9>

Time Atlas modifies the data by retaining POLITY records in the supported dates, repairing invalid geometry where needed, clipping only the Mercator polar limits, simplifying global geometry at different tolerances inside and outside the China-neighbor detail region, rounding coordinates, adding display labels and colors, and splitting data into period archives and 20-year runtime slices. Original polity names and temporal intervals are retained in the derived records. Additional display filtering and name adjustments are described in the README and disclosed in relevant polity details. These adaptations are by Time Atlas and do not imply endorsement by the original creators.

The license applies to the historical map data and its adaptations. It is not a blanket license for all application source code or referenced works.

## Natural Earth

Made with **Natural Earth**. Primary authors **Tom Patterson and Nathaniel Vaughn Kelso**, and contributors.

- Project: <https://www.naturalearthdata.com/>
- Terms: <https://www.naturalearthdata.com/about/terms-of-use/>
- Source: <https://github.com/nvkelso/natural-earth-vector>
- Source revision: `ca96624a56bd078437bca8184e78163e5039ad19`
- Layers: `ne_50m_land`, `ne_50m_lakes`, `ne_50m_rivers_lake_centerlines`

Natural Earth map data is in the public domain. Time Atlas simplifies these global land and water layers. They provide present-day physical geography and are not reconstructions of historical coastlines or watercourses.

## Historical reading references

Editorial Chinese introductions of events, dynasties and people are project-authored drafts, including the individual backgrounds in `src/data/backgrounds.ts` and period learning guides in `src/data/learning.ts`. Reference links are supplied within each record in `src/data/content.ts`; they are not automatically imported article text. These drafts still require source-by-source historical review. Linked pages, editions, translations and images retain their respective rights. This project does not bundle portraits or other images from those sites.

The Silk Road theme uses UNESCO's [Silk Roads: the Routes Network of Chang'an–Tianshan Corridor](https://whc.unesco.org/en/list/1442/) as contextual reading. The route drawn by the application is a project-authored schematic connection of nodes, rather than a UNESCO map or an exact itinerary.

Person journeys now use separately curated, cited presence records in `src/data/journeys.ts`, rather than related event locations. Su Shi's chronology is referenced to the [Funiushan Cultural Research Center, Pingdingshan University](https://fns.pdsu.edu.cn/info/1062/1655.htm); Kangxi's to the [Palace Museum chronology](https://www.dpm.org.cn/court/lineage/226256.html); Zhuge Liang's to the public-domain original _Records of the Three Kingdoms_, chapter 35. Captions are project-authored factual summaries; no modern biography, illustration or map from those sites is copied into the published site. Arrows show the chronological order of selected records, omit intermediate travel, and do not reconstruct exact roads or continuous residence.

## Wikidata person facts

- Source and data access: <https://www.wikidata.org/wiki/Wikidata:Data_access>
- License: <https://www.wikidata.org/wiki/Wikidata:Licensing> — structured entity data is CC0.
- Snapshot: `data/people.sources.json`; individual references retain entity IDs and exact revision URLs.
- Browser data: `src/data/generated/people.json`; identities, aliases, basic descriptions/occupations and sufficiently precise dates.

Chinese Wikipedia's public API is used only to resolve entity identity, title conversion and redirects. No Wikipedia article prose is imported. Basic descriptions are derived from Wikidata's structured descriptions/occupation fields; richer introductions are independently written and referenced. Local raw responses and checksums support review and reproducibility; the browser uses bundled records and makes no third-party person API requests.

CBDB, Peking University's visualization platforms, TimeMapper, Journey and Su Shi Journey were inspected as research references. No CBDB standalone database, project code, original narrative text or media was copied into the app. The CBDB academic download is CC BY-NC-SA 4.0; it is not treated as CC0 or assumed suitable for unrestricted commercial redistribution.

## Local research retention

The derived Cliopatria maps and Natural Earth layers are committed losslessly in `data/map-packs/`; compression does not change their licenses, attribution, coordinates or content. `npm run data:prepare` restores runtime layers under `public/data/` and full-period audit archives under `.cache/map-archives/`. SHA-256 checks cover both compressed packs and the exact original GeoJSON bytes. Audit archives are retained locally and in the packs, but are not duplicated in the static website.

Research queries and returned evidence are retained locally in the ignored `data/research/searches/` directory. Browser verification screenshots, logs and traces in `data/research/verification/` are also local-only; selected project screenshots are published separately in `docs/images/`. Reference responses and extracted text are kept in the ignored local directory `data/raw/research/`, with retrieval times, redirects, source revisions, checksums and request failures in `data/research/fetches.json`. Future request attempts are appended to `data/research/fetch-history.jsonl`; cache verification does not change the original retrieval time. Files predating exact timestamp logging are explicitly marked as such.

The website publishes project-authored summaries, source links and a metadata-only `research-index.json`, not downloaded reference article bodies. Local retention is for verification and does not grant redistribution rights. Chronas and MapLibre's route animation example were consulted for interface design; no Chronas code or assets were incorporated.

## Software dependencies

The GitHub repository links use the Octicons `mark-github` icon from [primer/octicons](https://github.com/primer/octicons/blob/1dafaa68a1cef892168aa0fe3d16f0b406715c15/icons/mark-github-16.svg), copyright © 2026 GitHub Inc., under [MIT](LICENSES/Octicons-MIT.txt). Its original path is retained in `src/components/GitHubIcon.tsx`; only the React wrapper, display size and inherited color are adapted.

React, Vite, TypeScript, MapLibre GL JS, Lucide, Playwright, Vitest, Prettier and Shapely remain subject to their respective upstream licenses. Installed package license files accompany the development dependencies; package versions are recorded in `package-lock.json` and `scripts/requirements.txt`.
