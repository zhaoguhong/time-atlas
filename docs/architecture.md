# 架构与代码导航

山河纪是浏览器中的静态应用：React 与 TypeScript 管理界面和阅读状态，Vite 构建资源，MapLibre GL JS 绘制地图。历史内容和地图输入随仓库提供，运行时不依赖业务 API 或在线瓦片服务。

启动与验证见[贡献指南](../CONTRIBUTING.md)，来源、数据生成与审校见[数据维护](data.md)。本页说明当前模块职责与需要保留的行为，不记录历次实现过程。

## 模块入口

| 模块             | 入口与职责                                                                                                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 应用与阅读状态   | [`src/App.tsx`](../src/App.tsx)：连接视图、年份、筛选、选择、专题与阅读面板                                                                                                                                                        |
| 导航与分享       | [`navigation.ts`](../src/lib/navigation.ts)、[`history-writer.ts`](../src/lib/history-writer.ts)：URL hash、历史记录与返回状态                                                                                                     |
| 纪年与事件范围   | [`history.ts`](../src/lib/history.ts)、[`current-events.ts`](../src/lib/current-events.ts)：无公元 0 年的运算与区间筛选                                                                                                            |
| 地图             | [`HistoryMap.tsx`](../src/components/HistoryMap.tsx)、[`maps.ts`](../src/lib/maps.ts)、[`markers.ts`](../src/lib/markers.ts)：切片、来源展示、标签与地理标记                                                                       |
| 地图时间轴与播放 | [`Timeline.tsx`](../src/components/Timeline.tsx)、[`playback.ts`](../src/lib/playback.ts)：年代、专题和年谱播放                                                                                                                    |
| 时空柱布局       | [`TimePillar.tsx`](../src/components/TimePillar.tsx)、[`time-pillar.ts`](../src/lib/time-pillar.ts)、[`pillar-scene.ts`](../src/lib/pillar-scene.ts)：时间窗口、卡片布局与有界场景缓存                                             |
| 时空柱运动       | [`use-pillar-view.ts`](../src/hooks/use-pillar-view.ts)、[`use-pillar-browse.ts`](../src/hooks/use-pillar-browse.ts)：导航插值与独立的事件停留/移动时钟                                                                            |
| 按需阅读         | [`use-reading-record.ts`](../src/hooks/use-reading-record.ts)、[`CanvasBoundary.tsx`](../src/components/CanvasBoundary.tsx)：正文请求、缓存、重试及画布加载失败隔离                                                                |
| 阅读偏好         | [`scope-preferences.ts`](../src/lib/scope-preferences.ts)、[`reading-progress.ts`](../src/lib/reading-progress.ts)：视图范围偏好、专题阅读进度与最近阅读                                                                           |
| 移动布局与显示   | [`MobileSheetHandle.tsx`](../src/components/MobileSheetHandle.tsx)、[`use-reading-resize.ts`](../src/hooks/use-reading-resize.ts)、[`use-display-mode.ts`](../src/hooks/use-display-mode.ts)：阅读面板、旋转后的阅读位置与显示模式 |
| 昼夜与时空柱样式 | [`color-mode.ts`](../src/lib/color-mode.ts)、[`pillar-theme.ts`](../src/lib/pillar-theme.ts)：全站配色与独立的时空柱形状偏好                                                                                                       |

## 状态边界

- 地图与时空柱共享年份和选中内容，但分别保存时间筛选。中国／世界／地区选择是时空柱偏好，不能隐式过滤地图或改变地图相机。
- 分享与返回需要保留对应的年份、阅读对象、筛选和专题状态。专题内部选章保留专题上下文；独立搜索可以退出专题。返回阅读时应恢复相应位置。
- 地图播放与时空柱自动浏览使用独立行为。时空柱交互会取消自动浏览；普通事件阅读保留当前画布时间，明确的“在地图中查看”使用事件日期。
- 拖动、滚轮和捏合跟随当前绘制的分数时间位置；年度标签与 URL 使用没有公元 0 年的整数纪年。松手不能让旧动画覆盖手势结果。
- 年谱逐条播放有出处的活动记录，同年多条与重复地点仍保留顺序。暂停保留播放进度；插值连线不代表历史道路。
- 全站昼夜模式与时空柱形状分别保存。尊重系统的减少动态效果偏好。

## 加载与构建

地图由 `data/map-packs/` 离线还原到运行目录；浏览器按年代请求 GeoJSON 切片并使用有界缓存，不下载整个历史归档。地图实现懒加载，切片更新期间保留已绘制内容。数据准备命令与来源校验见[数据维护](data.md#仓库无损压缩与运行数据)。

事件和人物的目录包含摘要、日期与检索字段，完整正文及来源通过带内容哈希的 JSON 按需加载。请求去重与缓存由阅读 hook 管理；失败时保留摘要和重试入口。画布模块失败不应清空已有阅读内容。生成链路与原始内容入口见[阅读目录与正文](data.md#阅读目录与正文)。

MapLibre worker 由 `HistoryMap.tsx` 显式导入 `maplibre-gl-worker.mjs?worker&url`，[`vite.config.ts`](../vite.config.ts) 使用 ESM worker 输出。修改这条链路时，开发服务可用不足以证明生产包可用，必须运行生产预览检查。

## 布局与回归重点

地图的时期导航和年代操作位于时间轴，长文位于阅读区。时空柱的缩放与设置位于画布工具组，完整事件目录在设置中；不能因卡片排布而丢失范围内事件的阅读入口。丝路示意线属于对应专题，不是默认常驻图层。

桌面使用侧边阅读区；手机竖屏使用底部阅读面板，短横屏使用左右分栏。修改布局时检查触控目标、键盘焦点、卡片裁切、阅读滚动、旋转和实际可点击区域。测试不能为了选中被裁切的卡片而绕过真实交互条件。

动画中断需验证中间位置、取消后的稳定状态以及 BCE/CE 边界；自动浏览需分别验证停留、移动和取消。真实绘制帧测试与受控时钟测试各有用途：前者验证可见运动，后者固定特定阶段进行交互。不要用一次瞬时属性轮询代替整个运动过程的验证。
