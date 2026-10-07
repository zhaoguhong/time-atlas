# 数据来源、处理与维护

| 内容                     | 原始来源                                                                            | 本版的使用方式                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 历史疆域                 | [Cliopatria / Seshat](https://github.com/Seshat-Global-History-Databank/cliopatria) | 下载原始 GeoJSON，按年份筛选、全球几何简化与中文名称整理         |
| 海岸、陆地、河流、湖泊   | [Natural Earth](https://www.naturalearthdata.com/)                                  | 1:50m 自然地理图层，作为现代地理参照                             |
| 原典、事件与重点人物介绍 | 各档案内标明的原典、维基文库及百科参考链接                                          | 本项目编写中文摘要、影响说明与关联；没有整段复制参考文本         |
| 丝路专题                 | [UNESCO 丝绸之路](https://whc.unesco.org/en/list/1442/)与相关档案参考               | 连接已知节点的示意线，不是精确行程重建                           |
| 人物结构化档案           | [Wikidata](https://www.wikidata.org/wiki/Wikidata:Licensing) · CC0                  | 名称、别名、身份、职业、生卒纪年，保存实体版本；编辑简介另行标注 |
| 人物行迹                 | 故宫年表、苏轼年谱与《三国志》                                                      | 只绘制有出处的本人活动节点，缺失年份不推断                       |
| 朝代与政权               | 史记、汉书、各代正史等原典                                                          | 简介、都城、存续年与导航分期分开说明                             |

Cliopatria 数据采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)，须保留署名、来源、许可链接及修改说明。Natural Earth 数据为公有领域。完整署名和第三方数据说明见 [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)。

历史疆域保留全球轮廓，仅按 Web Mercator 极区限制裁切至 `[-180°, -85°, 180°, 85°]`。原始源有 13,797 条记录，本版处理出 11,944 条记录，涉及 1,340 个源政权分组，19 个完整时期归档共约 48.7 MB。运行时按20年切片加载，共602片，最大单片约3.34 MB，内存最多保留4片；同一条记录可能跨时期或切片出现。全球地图不等于全球事件库，事件与人物仍以中国为主。

`data/sources.lock.json` 固定上游 Git 提交与 SHA-256。`public/data/provenance.json` 记录来源、处理范围、记录数和文件大小。重建脚本在读取或下载原始数据时验证哈希，不跟随上游自动变动。

### 仓库无损压缩与运行数据

`data/map-packs/` 是提交到 Git 的地图输入：按时期分包的 Brotli 压缩文件，以及包含每个压缩包和原文件 SHA-256 的清单。包内保存完整 GeoJSON 文本，不重新序列化数字、不减少坐标精度、不删除字段或记录。完整时期归档、602 个切片和三个自然地理图层均可逐字节恢复；上面的几何简化属于既有数据处理，本次存储压缩没有增加简化。

`npm run data:prepare` 使用 Node.js 内置 Brotli 离线恢复数据。`npm run dev`、`npm test`、`npm run data:check` 和 `npm run build` 会自动调用它；已有正确文件只校验、不重写，缺失或损坏的派生文件从包中恢复，压缩包本身损坏则报错。直接调用 `vite` 或 `vitest` 前须先执行 `npm run data:prepare`。

- 完整时期归档还原到 `.cache/map-archives/`，用于审校与测试，不进入静态网站。
- 浏览器所需切片还原到 `public/data/maps/<时期>/<切片>.geojson`；自然地理图层还原到 `public/data/`。这些派生文件由 `.gitignore` 排除，但生产构建会包含它们。
- 浏览器请求路径、响应字节、按需加载和四片 LRU 缓存保持原样。压缩包仅用于开发和构建，不需要浏览器解压，也不依赖托管服务器支持 Brotli。

普通贡献者不需要修改压缩包。地图处理变化后使用下方重建流程，再执行 `npm run data:pack` 更新包与清单，并提交 `data/map-packs/` 和相关来源清单。不要仅修改还原出的 GeoJSON：下次准备数据时会恢复为提交的包内容。

### 重建地图数据

日常运行不需要 Python，也不需要重新下载数据。只有修改地图处理方式时才需要：

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements.txt
.venv/bin/python scripts/build_maps.py
npm run data:pack
npm run data:check
```

脚本首次运行会下载锁定的原始文件到 `data/raw/`。这些缓存不进入版本控制。后续重用缓存，但仍验证 SHA-256。历史几何保留原始名称与时间区间；无效几何经修复，与中国及周边区域 `[40, -12, 150, 65]` 相交的记录以0.035度容差简化，其余以0.09度简化，并保留四位小数。图层颜色与部分中文名称由本项目补充。`area` 只用于标签与图例排序，是经纬度平面面积，不是平方公里。

### 资料边界

这是一版可用的学习原型，内容仍需逐条史料校验与专家审核。

- 导航时期的区间是界面分段。例如元的导航区间从 1279 年开始，元朝在此之前已经建立，地图仍按原始记录展示。
- 源数据可能存在名称、年代、疆域归属和空间覆盖的争议。缺少色块不表示该地无人居住或没有历史。
- 当前展示层省略 220 年及以后仍标为 Han Dynasty 的记录，避免把汉朝延续到三国；不会自行把相应地域分配给其他政权。
- Eastern Wu 在 222 年前显示为“孙氏势力”；317 年后源名 Western Jin 的记录显示为“东晋”。原始名称、几何和时间区间保持可查，档案中明确说明显示名调整。这些规则位于 `src/lib/maps.ts`。
- 源数据中的五代十国合并多边形显示为“五代十国（来源合并）”，并说明它不代表统一政权；宋初部分年份的单独政权边界仍缺少资料。
- 河流、湖泊和海岸是现代自然地理参照。古今地名坐标代表城市所在区域，不能用来认定古城边界或考古遗址。
- 事件地点可能采用代表性位置；跨多年事件采用一个导航年，相关说明见具体档案。人物未采用确定生卒年时显示 `?`。
- 丝路线是一条交流节点示意线，不代表某年整条道路的控制状况，也不代表张骞或玄奘的实际行程。
- 本版已导入591份Wikidata结构化人物快照，经过同名、身份、生卒纪年和分期核对，与原有人物及编辑档案合并后共673人。基础身份档案有简短介绍与出处，不等于详细传记或完整年谱。未导入CHGIS或CBDB原始整库；CBDB仅用于研究参考。

### 人物资料与行迹维护

```sh
npm run data:people
npm run data:check
npm run data:audit:ci
```

导入脚本只使用Python标准库。先通过中文维基百科的公开接口解析简繁名称和重定向，再取Wikidata实体；这些接口只用于构建资料快照，浏览器不会发起人物API请求。脚本拒绝消歧义页、非人物和时代不符的同名记录。简短身份描述及职业字段为CC0结构化数据；未采用确定或精度足够的纪年保持未知。`--refresh`显式更新来源版本，默认重用URL相同、SHA-256一致的缓存。

`data/people.sources.json`固定每份请求的URL和原始哈希，人物记录保留Wikidata实体和revision；`src/data/generated/people.json`为可复现输出。公开版本说明见`public/data/content-provenance.json`，当前覆盖核对见`public/data/coverage.json`。导入未能唯一确认的六个名字由有出处的编辑档案覆盖，不采用消歧义页或现代同名者代替。

苏轼行迹参考[平顶山学院年谱](https://fns.pdsu.edu.cn/info/1062/1655.htm)，康熙参考[故宫生平与年表](https://www.dpm.org.cn/court/lineage/226256.html)，诸葛亮参考[《三国志》卷35](https://zh.wikisource.org/wiki/三國志/卷35)。每条记录包含年份、实际活动类型、地点、坐标精度说明和出处。任命地、相关战场与使臣谈判地不自动变成本人到访；康熙轨迹不含台湾、尼布楚或费扬古的昭莫多战场。苏轼的汝州、未到任的英州不作当年到访点；1100年北归行至英州的明确记录单独保留。

新增年谱须核对实际到访及先后次序；没有核对的年谱不画线。生卒、事件或文学作品中的地名均不自动证明到访。时间轴已扩至约前10000—1912年；夏没有可靠的源疆域，展示考古和传世文献节点及资料限制。商周源多边形年代粗略，前1046—前1001年的周疆域缺口保留为空，不沿用商的轮廓补齐。早期数据在 `src/data/early-history.ts` 与 `src/data/civilizations.ts`，其近似年代不应转换为精确纪年。

## 审校与缓存

普通贡献者与 CI 使用 `npm run data:audit:ci`：检查全部记录的字段、纪年、关联、专题章节和来源元数据；本地存在的缓存仍会验证哈希，缺失文件会明确统计为未核验。该命令不改写覆盖或审校报告。

维护者完整审校使用 `npm run data:audit`，要求已留存的来源缓存存在且哈希一致，再生成 `public/data/coverage.json` 和 `data/research/content-audit.json`。缓存损坏或缺失时停止，不把缺失当作通过。

`npm run data:references` 用于资料维护，会请求参考网站并更新索引；首次收集可能耗时较长，也可能遇到远端拒绝访问。新抓取不保证与以前快照字节相同，不能将重新抓取的网页冒充原版本。

来源清单、版本锁、请求元数据和生成的审校结果进入仓库；原始地图、接口响应和参考文章留在被忽略的 `data/raw/`。`data/research/searches/` 的检索证据及 `data/research/verification/` 的截图、日志和 trace 仅本地保留，避免公开无关环境信息与参考文本。被忽略不表示可以删除。

后续请求与缓存检查追加到 `data/research/fetch-history.jsonl`；实际抓取、缓存检查和失败尝试的时间分别记录。未知旧时间保持未知。公开站点只分发摘要、运行地图与来源元数据，不分发下载的参考文章正文。

## 维护入口

| 路径                                             | 内容                       |
| ------------------------------------------------ | -------------------------- |
| `src/data/content.ts` 与事件集合                 | 事件、人物、关联与出处     |
| `src/data/civilizations.ts` / `early-history.ts` | 史前、早期文明与古代节点   |
| `src/data/person-reading.ts` / `depth-people.ts` | 编辑人物介绍               |
| `src/data/journeys.ts`                           | 独立核对的年谱记录         |
| `src/data/topics.ts`                             | 专题导读、章节和地图问题   |
| `src/data/dynasties.ts` / `dynasty-reading.ts`   | 政权日期与政治社会介绍     |
| `src/data/periods.ts` / `learning.ts`            | 导航时期与学习路线         |
| `src/lib/history.ts` / `navigation.ts`           | 纪年、筛选、分享与返回状态 |
| `scripts/build_maps.py` / `import_people.py`     | 固定版本地图与人物导入     |
| `scripts/pack-maps.mjs` / `prepare-maps.mjs`     | 地图无损打包、校验与还原   |
| `scripts/audit-content.mjs`                      | 结构、纪年、关联与缓存校验 |
| `scripts/collect-references.py`                  | 原始参考资料和请求留存     |

当前状态和未解决问题只在 [AGENTS.md](../AGENTS.md) 维护，数量以生成清单为准。新增专题复用事件 ID；更新地图来源必须显式更新锁文件、重建并核对变化。
