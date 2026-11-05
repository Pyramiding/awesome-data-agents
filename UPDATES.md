# 增量更新记录

[返回总览](README.md) · [机器索引](resources.json) · [收录方法](METHODOLOGY.md) · [项目路线](PROJECT_GUIDE.md)

这里记录每轮真正新增的资料、已有条目的实质更新，以及仍未核验的公开材料。日期来自原始发布页或版本记录，不把抓取时间当作发表时间；这是有边界的编辑检索，不是全网穷尽抓取。

## 2026-11-05：项目技术文档与公开分享扩充

- **范围：** 专题补录 2026 年资料，接续 [上一版 156 条快照](https://github.com/Pyramiding/awesome-data-agents/tree/e6686da961fbf417c15d342ee3d29f97c6abab61)。这轮不是“上次上传后的新发布”检索，资料截止日仍为 11 月 5 日。
- **新增：** 12 条，包含 5 篇架构实践、3 份持续文档、3 条分享入口与 1 个公开实现，累计 **156 → 168 条**。
- **补齐项目路线：** Spring AI Alibaba DataAgent、DB-GPT、WrenAI、DataHub Analytics Agent、Google Data Agent Kit，共 5 个已有条目；文档与支持链接不再重复计数为新项目。
- **阅读体验：** 新增 [公开分享导航](TALKS.md)，在 [项目资料路线](PROJECT_GUIDE.md)加入 4 条动手路线、6 个重点项目入口及后续扩展优先级；README 给出主题判断和本轮明细。
- **验证：** 索引、计数、去重、文内导航和改动范围检查通过；59 个新增/关联链接中，56 个完整请求正常、1 个大 PDF 响应头正常，2 个旧分享入口直接访问受限但经原站页面读取确认，访问说明已写入分享导航。

### 本轮资料结构

| 类别 | 补入内容 | 证据边界 |
|---|---|---|
| 中文工程实践 | 衡石多轮问数，火山引擎 3.21 系列文档与培训页，SQLBot | 以官网原文、文档日期和公开 release 为准；视频页面与完整播放分开记录，SQLBot 标明附加许可条件 |
| 国际架构与文档 | DataHub Context Kit / SecuPi，AWS 多模态编排 / AtScale，Google MCP，Databricks API | 分清上下文与授权、查询与管理接口、联邦查询与预先汇集数据；教程未在本仓部署或压测 |
| 可读公开分享 | Paras Doshi 的 7 项分析检查与 3 个分析 Harness | 分别核验 18 页、15 页 PDF；页面提到的录像未单独核验，不将教学数字当项目实测 |

一手链接与原始日期列在 [README 本轮表格](README.md#本轮扩充技术文档项目路线与公开分享)及机器索引中。AWS 系列前篇和对照方案作为支持材料，不因链接多就增加独立条目数。

### 已有项目的文档与日期证据

| 原条目 | 本轮补充 | 日期 / 版本处理 |
|---|---|---|
| Spring AI Alibaba DataAgent | 架构、快速开始、三类知识与高级功能；指出 API Key 后端校验缺口 | 原索引 09-20 更新日期未附证据，改用 [1.0.0-rc7 · 07-29](https://github.com/spring-ai-alibaba/DataAgent/releases/tag/1.0.0-rc7)；RC 名称与 main 文档分开说明 |
| DB-GPT | 分析规划、分层上下文压缩、工具快照与只读 SQL 契约 | 保留 [v0.8.2 · 08-26](https://github.com/eosphoros-ai/DB-GPT/releases/tag/v0.8.2)；文档站超时，改链可读的官方仓库原稿 |
| WrenAI | 架构、MDL、知识源与记忆索引；评测开发状态与许可路径 | 保留既有 release 历史；main 文档和不同发行组件不能视为同一版本 |
| DataHub Analytics Agent | 启动/合成演示、上下文接入与写回边界 | 用 [v0.4.0 · 07-29](https://github.com/datahub-project/analytics-agent/releases/tag/v0.4.0)替代较弱的仓库创建时间证据 |
| Google Data Agent Kit | 安装、MCP 授权、Codelab 与数据应用技术指南 | 用 [1.2.0 · 10-30](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin/releases/tag/1.2.0)替代仓库创建时间；不是本日新版本 |

### 没有扩大结论

- 本轮核验文档与材料，没有执行教程中的云资源创建、模型调用、项目安装或基准评测；项目路线中的产物是建议的验收项。
- 讲义中的提醒 hook 不等于强制门禁，写下失效条件不等于系统已实现自动失效；Agent 自述“已检查”也不等于留下了独立执行证据。
- 无可核验 2026 实质更新的候选项目未强行归为今年新项目；普通提交、近期抓取和新转载不等于新发布。
- 此前 `agenda` 记录继续保留原状态，本轮新增分享导航不表示所有大会录像/PPT 均已公开。

## 2026-11-05

- **检索窗口：** 2026-11-03—2026-11-05，接续 11 月 2 日资料截止日；在保留新导航、贡献入口与许可说明的 [当前版本](https://github.com/Pyramiding/awesome-data-agents/tree/0334da5b7a7df8369bd4b2c820f7792addc7e02c)上更新。
- **新增：** 6 条，包含 5 篇架构实践与 1 篇研究。
- **原记录更新：** 3 个项目、4 个 release；另校正 1 处 DataWorks 中英文文档状态，不重复增加条目。
- **复查范围：** 31 个已收录公开实现的近期 release；对本轮更新的 3 个项目重新核对许可证与未归档状态。会议议程沿用 11 月 2 日材料核验结果，本轮未宣称新增回放或幻灯片。
- **累计：** 150 → **156 条**；`refresh_history` 分别记录新增、版本更新与勘误 ID。
- **验证：** 索引、计数、去重与文内导航检查通过；27 个新增或关联链接中，26 个直接访问正常，OceanBase 对自动请求限流，已另行读取官网正文核实。

### 新增资料

| 原始日期 | 资料 | 值得复用的机制与边界 |
|---|---|---|
| 11-03 | [Snowflake Engineering：Meaning Before Metrics](https://www.snowflake.com/en/blog/engineering/business-ontology-context/) | 域限定概念、类型化关系、steward 审批与版本生效；定义与计算分工明确。Business Ontology 当前 private preview，public preview soon。 |
| 11-03 | [Snowflake CoCo：Cloud Agents 与 Automations](https://www.snowflake.com/en/blog/snowflake-coco-cloud-agents-automations/) | 沙箱长任务、Git/PR 交付、以创建者身份运行的自动化及逐次审计；Memory、MCP Gateway Tools 和动态模型路由为 public preview。 |
| 11-03 | [Snowflake：Governed Business Context and AI Security](https://www.snowflake.com/en/blog/ai-agents-governance-ai-security-cost-control/) | Gateway 集中策略，工具调用按最终用户身份在执行前授权；Gateway/Tools 为 public preview，Cortex Sandboxes 为 private preview。 |
| 11-03 | [VidUEU-Agent](https://arxiv.org/abs/2611.04418) | 视频到指令数据的四阶段整理，再用下游训练反馈调整分布；属于多模态训练数据研究，非企业 BI 框架。 |
| 11-04 | [衡石：从问数到分析资产](https://www.hengshi.com/blog/hengshi-data-agent-tasks-analytics-assets.html) | 语义指标、查询与看板创作连接交付；恢复前检查已有资产，区分计算、页面操作与保存完成。销售分析是设计示例。 |
| 11-04 | [OceanBase：Ontology-Driven Enterprise Data Agents](https://en.oceanbase.com/blog/ontology-driven-enterprise-data-agents) | 业务对象到指标的渐进探索，场景草稿经专家与真实问题校验；关系、贡献分析与因果判断分开。页面另标 11-05 更新，仍按首次发表日期计数。 |

Snowflake 三篇分别覆盖**定义治理、任务运行时、动作控制面**，具有不同可复用机制；同日的综合发布汇总不再重复收录。VidUEU-Agent 按 arXiv v1 的 **2026-11-03T07:02:55Z** 收录，本轮没有另增未经许可核验的实现或数据集。

### 已有项目：更新原 ID

| 条目 | 本轮证据 | 主要变化与采用前检查 |
|---|---|---|
| Altimate Code | [v0.12.9 · 11-04 UTC](https://github.com/AltimateAI/altimate-code/releases/tag/v0.12.9) | model-free tool CLI/MCP、结构化 dbt 血缘与工作区规则提案/Owner 审查；分析角色在配置授权下仍须拒绝写工具。MIT。 |
| nao | [v0.3.32 · 11-03](https://github.com/getnao/nao/releases/tag/v0.3.32) → [v0.3.33 · 11-03](https://github.com/getnao/nao/releases/tag/v0.3.33) | 实验性 codemode 替换旧 Python interpreter，语义查询刷新时重编译，增加 GitHub Enterprise Server 接入；保留根 Apache-2.0 与 Enterprise 标记文件的商业条款区分。 |
| dbt MCP Server | [v2.10.1 · 11-03](https://github.com/dbt-labs/dbt-mcp/releases/tag/v2.10.1) | job/run 访问描述采用 Owner 目标和共享列举策略，授权宿主需处理 `JOBS_LISTING`、`RUNS_LISTING`；仅移除未使用的全文助手，文档搜索和单页读取仍在。Apache-2.0。 |

Altimate Code 的 `published_at` 为 **2026-11-04T23:16:13Z**，在 Asia/Shanghai 已是 11 月 5 日；索引保留来源 UTC 日期和完整时间。dbt MCP 的 release 标题写 11 月 2 日，实际 `published_at` 为 **2026-11-03T16:45:17Z**，本轮按公开 release 时间归入窗口。

### 文档勘误与未扩大收录的内容

- [DataWorks 英文简介](https://www.alibabacloud.com/help/en/dataworks/user-guide/new-data-agent)在 11 月 5 日重开时已显示 **Oct 29, 2026**，并包含八层架构。更新上轮“英文仍为 10 月 9 日”的观察记录；主条目日期仍是 10 月 29 日，不计为本轮新文档。下方 11 月 2 日记录保留当时核验状态。
- 衡石《让多轮问数保持口径一致》的转载页标注 11 月 3 日，但官网原文为 **11 月 2 日**，因此没有按转载日期计入窗口。相同规则也适用于新出现的旧产品发布译文。
- 不把大会已举办、预告页或可访问的演示应用直接视为新发布的完整分享材料；不把项目日常提交自动计为实质版本更新。
- 预览产品的公开文章标记为 `published`，只表示文章可读。产品的 private/public preview 状态另行说明，不据此宣称生产可用或所有能力均已 GA。

## 2026-11-02

- **检索窗口：** 2026-10-23—2026-11-02，接续 [2026-10-22 快照](https://github.com/Pyramiding/awesome-data-agents/tree/228d833f557175f3ce06242c413f532df59c52d9)。
- **新增：** 17 条，包含 7 条架构实践、3 条评测、2 条分享/复盘、3 篇研究、2 份持续文档。
- **原记录更新：** 6 个项目与 1 份产品文档，不重复增加项目数量。
- **材料复查：** 7 条会议议程保留 `agenda`，不把“已举办”写成“已有可读录像/PPT”。
- **累计：** 133 → **150 条**；机器索引中的 `refresh_history` 保留本轮新增、更新与议程复查 ID。

### 新增资料

| 原始日期 | 资料 | 类型 |
|---|---|---|
| 10-23 | [Keyhole：数据工程 Harness 参考架构](https://keyholesoftware.com/agentic-harness/) | 架构 |
| 10-23 | [KX：MCP qSQL Suggester 与验证链](https://kx.com/blog/natural-language-to-qsql-mcp-suggester/) | 架构 |
| 10-23 更新 | [Atlan：The FDE Playbook for Analytics Agents](https://analytics-playbook.atlan.com/) | 持续文档 |
| 10-23 | [AdaPRA：自适应过程检查准则](https://arxiv.org/abs/2610.33245) | 研究 |
| 10-25 | [CaliMem：校准记忆与数据整理搜索](https://arxiv.org/abs/2610.34500) | 研究 |
| 10-27 | [M4Bench：EHR 数据派生任务与规格完整性](https://arxiv.org/abs/2610.37459) | 研究 |
| 10-27 | [Data–Marc：动态参考查询与 SDK 评测](https://data-marc.com/2026/10/27/can-you-trust-your-fabric-data-agent-programmatically-testing-accuracy-and-determinism/) | 评测 |
| 10-27 | [ClickHouse：Jev 表排序与失败归因](https://clickhouse.com/blog/agentic-analytics-benchmark-jev) | 评测 |
| 10-27 | [Hex 4.0：依赖 DAG、血缘与执行器](https://hex.tech/blog/introducing-hex-4-0/) | 架构 |
| 10-27 | [云器 DACon：知识与本体会后复盘](https://www.yunqi.tech/resource/blogs/dacon-ai-lakehouse) | 公开复盘 |
| 10-28 | [DOSI：可执行业务上下文](https://datus.ai/blog/datus-dosi-executable-business-context/) | 架构 |
| 10-28 | [Atlan Context Conference：分析 Agent 蓝图](https://atlan.com/context-conference/post-ai-data-stack/) | 视频与逐字稿 |
| 10-29 | [Cube：Data Model Factory](https://cube.dev/blog/data-modeling-is-becoming-system-design) | 架构 |
| 10-29 | [Michael Peña：准确率是分布，而非单个数字](https://michaeljohnpena.com/blog/2026-10-29-fabric-data-agent-determinism-real-nem-data/) | 评测 |
| 10-29 | [MotherDuck：Dive Apps 与 Python Flights](https://motherduck.com/blog/dive-apps-superpowers-for-ai-builders/) | 架构 |
| 10-29 | [云器：Semantic View 与可信上下文](https://www.yunqi.tech/resource/blogs/semantic-view-ai-agent) | 架构 |
| 10-30 发布 | [Hex：Governed mode](https://learn.hex.tech/docs/agent-management/governed-mode) | 持续文档 |

Atlan 手册按 [V4.0 的 10 月 23 日实质更新](https://github.com/atlanai/analytics-playbook/blob/main/CHANGELOG.md)收录；其最早版本在 9 月，不用新建代码托管空间的时间冒充首次发布。论文日期沿用 arXiv 的 submitted 日期，完整 UTC 时间保存在索引中。

### 已有项目与文档：更新原 ID

| 条目 | 本轮证据 | 主要变化与边界 |
|---|---|---|
| Altimate Code | [v0.12.8 · 10-23](https://github.com/AltimateAI/altimate-code/releases/tag/v0.12.8) | 列值画像、工作区记忆/Skills、工具失败反馈与 fail-closed 检查；未把同版本已移除工具列为可用能力。 |
| MCP Toolbox for Databases | [v1.15.0 · 10-23](https://github.com/googleapis/mcp-toolbox/releases/tag/v1.15.0) | 数据 Agent 管理工具、Looker query_id、认证检查；管理写操作需独立授权。 |
| Datus Agent | [v0.4.4 · 10-28](https://github.com/Datus-ai/Datus-agent/releases/tag/v0.4.4) | OntologyAnalyst、执行适配器及超时/工具隔离；等待超时不保证远端查询已终止。 |
| dbt MCP Server | [v2.9.0 · 10-27](https://github.com/dbt-labs/dbt-mcp/releases/tag/v2.9.0) → [v2.10.0 · 10-30](https://github.com/dbt-labs/dbt-mcp/releases/tag/v2.10.0) | Mesh 发现、子进程超时处理与环境级授权；仍是工具服务。 |
| WrenAI | [wren-v0.17.0 · 10-27](https://github.com/Canner/WrenAI/releases/tag/wren-v0.17.0) → [0.17.1 · 10-30](https://github.com/Canner/WrenAI/releases/tag/wren-v0.17.1) | Ossie/OpenMetadata 互操作与兼容修复；版本和许可按组件区分。 |
| nao | [v0.3.29 · 10-25](https://github.com/getnao/nao/releases/tag/v0.3.29) → [0.3.30 · 10-28](https://github.com/getnao/nao/releases/tag/v0.3.30) → [0.3.31 · 10-30](https://github.com/getnao/nao/releases/tag/v0.3.31) | 分组 Skills、查询边界与接入/评测改进；根许可证改为 Apache-2.0，但 Enterprise 标记文件仍受商业条款约束。 |
| DataWorks Data Agent | [中文简介 · 10-29](https://help.aliyun.com/zh/dataworks/user-guide/new-data-agent) | 八层架构、Context Graph、企业管控与工作流；[英文旧页](https://www.alibabacloud.com/help/en/dataworks/user-guide/new-data-agent)仍为 10-09。 |

Toolbox 的 changelog 写 10-22，但 release 的 `published_at` 为 **2026-10-23T00:14:18Z**；Wren 0.17.0 的 changelog 写 10-23，release 实际于 **10-27** 发布。本轮以可核验的公开 release 时间为准，索引保留差异。

### 没有自动升级或扩大结论

- QCon 上海与 DACon 北京已结束。已确认的议题大纲继续保留；PPT 汇总入口本轮无法核验具体文件，扫码领取也不等于已验证可直接阅读的完整材料。云器官方复盘作为独立新文，不代表整场大会的材料均已公开。
- Hex 4.0 发布时仍为 private beta；Governed mode 是来源引导，不是硬权限边界。
- ClickHouse 的表排序组件指标与端到端准确率分开陈述；M4Bench 的部分一致性 reward 与严格全通过率分开陈述。
- AdaPRA 的实现可核验，但不能声称所有运行轨迹已公开；CaliMem 的匿名代码工件与许可证本轮未独立核实，因此只增加论文，不另增加“已核验开源项目”。
- 未把旧文章的新抓取时间、无技术细节的发布新闻，或没有合格新 release 的项目日常提交算作新增。
