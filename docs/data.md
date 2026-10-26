# 数据来源、处理与维护

本页说明权威数据入口、派生文件、史料约束与审校流程。日常启动见 [README](../README.md#本地运行)，开发验证见[贡献指南](../CONTRIBUTING.md#验证)。数量与覆盖以[覆盖清单](../public/data/coverage.json)、[地图来源清单](../public/data/provenance.json)及[内容审校结果](../data/research/content-audit.json)为准，不在此维护另一套数量快照。

## 来源与权威入口

| 内容                   | 来源与使用方式                                                                                                            | 仓库入口                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 历史疆域               | [Cliopatria / Seshat](https://github.com/Seshat-Global-History-Databank/cliopatria)，固定版本，保留来源日期与几何处理说明 | `data/sources.lock.json`、`public/data/provenance.json`、`data/map-packs/`              |
| 现代自然地理参照       | [Natural Earth](https://www.naturalearthdata.com/)，公有领域的海岸、陆地、河流和湖泊                                      | 同一地图来源锁、处理脚本与包清单                                                        |
| 人物基础身份           | [Wikidata](https://www.wikidata.org/wiki/Wikidata:Licensing)，CC0，保留实体与 revision                                    | `data/people*-seeds.json`、`data/people.sources.json`、`src/data/generated/people.json` |
| 事件与编辑人物介绍     | 逐条引用原典、博物馆、考古机构与研究文献，独立撰写中文摘要                                                                | `src/data/content.ts` 汇总各事件、人物和阅读内容集合                                    |
| 中国朝代与世界政权档案 | 资料出处、编辑阅读范围与地图来源适用日期分别保留                                                                          | `src/data/dynasties.ts`、`dynasty-reading.ts`、`world-polities.ts`                      |
| 专题与学习分期         | 使用既有记录 ID 组织有出处的导读、章节与地图问题                                                                          | `src/data/topics.ts`、`periods.ts`、`learning.ts`                                       |
| 独立核对的活动年谱     | 有具体日期、地点和活动内容的本人记录                                                                                      | `src/data/journeys.ts`                                                                  |

Cliopatria 的 CC BY 4.0 署名、来源、许可链接及修改说明必须保留。Wikidata 身份数据与项目编辑讲解适用的许可不同；引用网页不意味着可以重新分发全文或图片。完整范围见[第三方声明](../THIRD_PARTY_NOTICES.md)和[许可说明](../LICENSE-CONTENT.md)。未导入 CHGIS 或 CBDB 原始整库，CBDB 的研究参考不能替代再分发许可。

## 历史内容规则

- 每条事件、人物、政权档案与年谱记录均需介绍和可定位出处。事件另有背景、影响、日期与地点；按需要说明不确定性。引用应核对实际卷次与内容，不能仅按标题或人物名称匹配。
- 历史上没有公元 0 年。计算使用 `src/lib/history.ts` 的 `toOrdinal` / `fromOrdinal`；公元前后插值也遵守这一规则。
- 考古区间、约略年代、`dateLabel` 与 `endYear` 不应改写成精确纪年。未知生卒年保留未知，不为增加条目而猜测出生、死亡或活动年份。
- 导航分期是学习分段，不能代替政权真实存续日期或地图来源的适用区间。地图有全球轮廓，不代表事件与人物已完整覆盖世界史。
- 人物与事件相关不等于本人在场。去世后的关联事件必须解释间接或身后关系；主题、年代相近的自动推荐不能宣称因果。
- 事件坐标可能代表区域；城市位置不等于古城边界，现代海岸、河流和湖泊仅供参照。

地图疆域仍止于1912年，事件阅读与时空柱延伸至2000年，两者在覆盖清单中分别使用 `mapRange` 与 `readingRange`。现代人物的事件关联按阅读范围审校，不因出生晚于地图上限就当作不可阅读；缺少同期疆域时必须保留界面说明。

### 事件主题筛选

`src/data/event-topics.ts` 按稳定事件 ID 维护既有记录的阅读主题，新增记录直接在 `themes` 中声明与筛选选项相同的精确标签；匹配不扫描正文关键词。分类以已引用来源的事件正文为依据；主题可以交叉归属，不改写事件原有的 `category`。哲学、宗教、文学艺术等可直接筛选；原归为政治、文化或交流、但直接描述战争的记录也明确补入战争筛选。不要靠正文提到某个关键词或人物就自动归类。新增事件或修订主题时同步检查这个映射；未细分的记录仍通过原类别与“全部”可达。

`src/lib/event-categories.test.ts` 检查映射 ID、重复项、跨类别筛选和目录一致性；不把这些检查当作史料核验。

### 年谱与早期史的具体约束

苏轼年谱参考[平顶山学院年谱](https://fns.pdsu.edu.cn/info/1062/1655.htm)，康熙参考[故宫生平与年表](https://www.dpm.org.cn/court/lineage/226256.html)，诸葛亮参考[《三国志》卷 35](https://zh.wikisource.org/wiki/三國志/卷35)。详细出处仍以每条记录为准。

只有独立核对的实际到访才能进入年谱。任命、相关战场、使臣谈判、文学地名或疆域不能自动转为本人行程。同年多条记录与重复地点保留顺序，动画仅表达记录先后，不推断道路、速度或中间活动。

- 康熙记录不包含台湾、尼布楚或费扬古在昭莫多的作战地点作为本人到访。
- 苏轼未到任的汝州、英州不作相应任命年份的到访点；1100 年北归经过英州的有据记录另行保留。
- 诸葛亮隆中采用襄阳解释，保留争议说明。
- 夏代没有可靠的上游疆域，应展示已有考古／文献节点与限制。商周多边形时间采样粗略，前 1046—前 1001 年的周疆域缺口不得借商的几何补齐。

早期节点入口为 `src/data/civilizations.ts` 和 `early-history.ts`。新增专题复用事件 ID，不复制出日期或来源不同的另一条同名记录。

## 仓库无损压缩与运行数据

`data/map-packs/` 是提交到 Git 的地图输入，包含按时期打包的 Brotli 文件及压缩包、原文件的 SHA-256 清单。包保存完整 GeoJSON 字节；存储压缩不重新简化几何，也不改变数字、字段或记录。

`npm run data:prepare` 用 Node.js 内置 Brotli 离线恢复并校验数据。`npm run dev`、`npm test`、`npm run data:check` 和 `npm run build` 会自动调用它；直接执行 `vite` 或 `vitest` 前须自行准备。

- 完整时期归档还原到 `.cache/map-archives/`，用于审校与测试，不进入网站。
- 浏览器切片还原到 `public/data/maps/`，自然地理图层还原到 `public/data/`。这些派生文件不入库，构建时纳入网站。
- 已有正确文件不重写；缺失或损坏的派生文件从包恢复，压缩包本身损坏则报错。
- 浏览器按需请求普通 GeoJSON 切片，使用有界缓存，不解压整包，也不依赖托管服务的 Brotli 支持。

不要只修改还原后的 GeoJSON，下次准备数据会按包内容恢复。修改地图处理方式时，应重建并提交包、来源锁及对应清单。

### 重建地图

日常开发无需 Python。修改地图处理方式时使用：

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements.txt
.venv/bin/python scripts/build_maps.py
npm run data:pack
npm run data:check
```

脚本下载或重用 `data/raw/` 中锁定的原始文件，始终校验哈希，不自动追随上游版本。全球几何按 Web Mercator 极区限制裁切；中国及周边使用较细简化，其余地区使用较粗简化。范围、容差、记录数与输出哈希见 `public/data/provenance.json`。`area` 是经纬度平面面积，仅供排序，不是平方公里。

### 地图展示与来源纠偏

`src/lib/maps.ts` 的展示规则与原始来源记录分离，不能用标签调整悄悄改写原始名称、身份、几何或适用日期：

- 隐去 220 年及以后仍标为 Han Dynasty 的争议归属；不将地域重新分配给其他政权。
- 隐去前 1046 年及以后仍标为 Shang Dynasty 的来源归属；不将商的轮廓改名为周。
- 222 年前的 Eastern Wu 显示“孙氏势力”，317 年后的 Western Jin 来源记录显示“东晋”，均保留展示说明。
- 古代的 Later Zhou 指周王室，不能与五代后周混淆。
- 来源合并的五代十国多边形显示“五代十国”，阅读说明保留“来源合并、并非统一政权”的限制，不能当作各国独立边界。

世界政权档案通过明确的源名称别名和日期条件匹配地图，为读者提供中文名称、介绍与出处，不替换中国朝代档案或修改来源多边形。缺失疆域保持空白；空白不表示当地无人居住。

## 人物与世界史维护

人物导入使用 Python 标准库：

```sh
npm run data:people
npm run data:check
npm run data:audit:ci
```

导入器先通过中文维基百科接口解析名称及重定向，再获取 Wikidata 实体；它拒绝消歧义页、非人物和时代不符的同名记录。接口仅用于生成资料快照，浏览器不请求人物 API。默认重用 URL 与哈希一致的缓存，`--refresh` 才显式更新来源版本，不能为了清理仓库重新生成不同版本的快照。

`data/people.sources.json` 保留请求与哈希，`src/data/generated/people.json` 保留实体和 revision；这些可复现输出需要提交，与被忽略的原始响应缓存不同。人物“延伸阅读”来自同版本 Wikidata 的站点链接，生成在 `src/data/generated/person-reading-links.json`，不能按姓名猜测词条地址。编辑人物介绍位于 `person-reading.ts`、`depth-people.ts`、`person-expansion*.ts` 等集合。

世界史事件位于 `src/data/world-events.ts` 和 `world-expansion-*.ts`，东西方哲学节点及编辑人物档案位于 `philosophy-west.ts`、`philosophy-east.ts`，跨类别阅读节点位于 `category-expansion.ts`、`category-depth.ts`，对应人物及有据的创作、研究关联位于 `category-people.ts`，现代哲学与世界史位于 `philosophy-modern.ts`、`world-modern.ts`，均由 `content.ts` 汇总。每条记录独立提供出处、日期范围、代表地点与影响。参考网站的原文与插图不随网站分发；地区是阅读归属，不能仅按现代坐标自动推断。中国之外的既有早期事件分类也应与 `src/lib/time-pillar.ts` 中的映射一致。

## 阅读目录与正文

`scripts/prepare-reading.mjs` 从 `src/data/content.ts` 导出轻量目录 `src/data/generated/reading-catalog.json` 和 `public/data/reading/` 下的完整事件／人物正文。这两类运行生成物由 Git 忽略，在数据准备时自动生成。

目录保留摘要、日期和检索字段，正文保留完整原始记录与来源。文件名使用稳定的 ASCII 标识和内容哈希；不要为了文件名修改原始记录 ID 或分享链接。`src/lib/reading-catalog.test.ts` 检查完整记录一致性、哈希与路径，浏览器请求由 `src/hooks/use-reading-record.ts` 管理。

内容修改应落在权威数据模块，不能手改运行目录、正文 JSON 或快照的哈希。加载和失败恢复设计见[架构说明](architecture.md#加载与构建)。

## 审校与缓存

普通贡献者与 CI 使用 `npm run data:audit:ci`：检查字段、纪年、关联、专题与来源元数据。存在的缓存会验证哈希，缺失文件明确统计为未核验；该命令不改写覆盖或审校报告。

内容变更后的完整审校使用 `npm run data:audit`，要求已留存来源缓存存在且哈希一致，随后生成 `public/data/coverage.json` 和 `data/research/content-audit.json`。覆盖清单中的 `events.byFilterCategory` 按实际筛选规则列出各类别的中外与地区分布，主题可交叉，不能将这些计数相加当作独立事件总量。失败抓取与成功快照分别记录；缓存缺失或损坏时不能当作完整审校通过。没有必要缓存的贡献者应说明限制，由持有缓存的维护者完成审校。

`npm run data:references` 会请求参考网站并更新索引，可能耗时或遭拒绝访问，不是普通构建检查。原始参考资料通过 `scripts/collect-references.py` 留存。新抓取字节可能不同，不能替代旧快照后继续声称原哈希已验证。

| 文件或目录                                                                    | 用途与提交范围                                         |
| ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| `data/research/*-references.json`、`references.json`、`source-inventory.json` | 引用与来源清单，提交                                   |
| `data/research/fetches.json`、`fetch-history.jsonl`                           | 请求、版本与校验元数据，提交；追加记录不覆盖历史       |
| `public/data/research-index.json`、`content-provenance.json`                  | 公开来源索引与版本说明，提交                           |
| `public/data/coverage.json`、`data/research/content-audit.json`               | 生成的覆盖与审校结果，内容更新时按流程生成并提交       |
| `data/raw/`                                                                   | 原始地图、人物响应、参考网页和文章，保留在本地，不提交 |
| `data/research/searches/`、`data/research/verification/`                      | 检索证据和验证输出，保留在本地，不提交                 |

请求记录中的 `retrievedAt` 是实际抓取时间，`lastCacheCheckAt` 是缓存检查时间，`attemptedAt` 是失败尝试时间。未知的旧时间保持未知，不能从文件修改时间倒推。检索应保留查询、提供方、实际时间与返回证据，失败和修正也应保留。

遵守 `.prettierignore`，不格式化原始快照、生成的来源清单或追加式请求历史。Git 忽略不代表可以删除：缓存是验证来源的证据。公开网站分发运行地图、项目编写的讲解和来源元数据，不分发下载的参考文章正文。
