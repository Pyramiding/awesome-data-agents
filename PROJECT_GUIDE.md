# Data Agent 项目资料路线

[返回总览](README.md) · [公开分享导航](TALKS.md) · [机器索引](resources.json) · [设计评审模板](DESIGN_REVIEW.md)

从要完成的任务选择实现入口，再结合官方技术说明和更新证据阅读。下列类型与阅读路线为本仓编辑归纳；项目能力、许可证和维护状态以各自原始页面为准。

**本轮专题扩充：2026-11-05。** 为 5 个已有项目补齐官方阅读路线，增加 SQLBot 应用案例；既有版本更新仍见 [增量记录](UPDATES.md)。文档核验、项目发布与实际运行是不同证据：本轮没有部署项目、调用模型或测量项目成绩。

**2026-11-06 定向复核：** WrenAI、DB-GPT、MCP Toolbox、Data Formulator、Jupyter AI 与 Vanna 六个既有条目补齐固定提交证据、版本和许可证范围。其余项目保持原核验日期；未部署运行这些项目。

## 按任务选择起点

| 目标 | 可先研究 | 第一轮验证应看到什么 |
|---|---|---|
| 自建 SQL / 指标分析 Agent | Datus Agent（完整实现）；BSL（独立语义组件） | 业务口径可检索，查询走语义工具，错误可复现 |
| 为现有 Agent 提供数据库工具 | MCP Toolbox for Databases | 参数化工具、连接与认证、调用轨迹 |
| 数据模型开发、修改与诊断 | dbt MCP + dbt Agent Skills | 先读上下文，再编译、测试和评审变更 |
| 数据接入与增量管道排障 | dlt MCP Server | 管道状态、schema diff、查询结果支撑诊断 |
| Notebook 数据科学与可视分析 | Jupyter AI / Data Formulator | 单元格、运行输出或分析分支可审阅与继续执行 |
| 自动实验与模型改进 | R&D-Agent | 假设、实验代码、实际测量与反馈完整闭环 |
| 数据工程能力验收 | ADE-bench | 固定环境中的任务通过率、成本、运行时和失败记录 |

## 四条动手阅读路线

| 路线 | 建议顺序 | 第一轮应留下的产物 |
|---|---|---|
| **中文实现：从业务问题到分析报告** | [Spring AI Alibaba](#spring-ai-alibaba-dataagent) 的启动 → 知识配置 → 架构 → 高级功能；再对照 [DB-GPT](#db-gpt) | 一份明确业务口径的任务、执行查询、报告，以及中断或权限不足时的记录 |
| **给现有 Agent 增加数据能力** | [Google Data Agent Kit](#google-data-agent-kit) 的安装 → MCP 授权 → Codelab；再读 dbt MCP / Toolbox 的工具契约 | 客户端与调用身份、实际工具清单、一次有证据的查询，以及调用失败时的原始错误 |
| **语义与上下文：把定义接到计算** | [WrenAI](#wrenai) 的模型与规划 → [DataHub](#datahub-analytics-agent) 的上下文检索 → [AWS 语义层对照](#托管平台沿官方教程复现) | 术语到指标/表的映射、展开后的查询、来源对账和角色差异；不只看最终回答 |
| **生产治理与验收** | [公开讲义](TALKS.md) → [设计评审](DESIGN_REVIEW.md) → ADE-bench / 自有任务回归 | 一个能失败的验收条件、具体证据、人工接手点，以及定义变化后应重开的任务 |

这些是本仓建议的阅读与复现顺序，不代表项目必须使用相同内部流程，也不把读完教程视为已完成生产验证。

## 本轮补齐的项目路线

### Spring AI Alibaba DataAgent

**类型：分析应用。** [实现](https://github.com/spring-ai-alibaba/DataAgent) · [1.0.0-rc7](https://github.com/spring-ai-alibaba/DataAgent/releases/tag/1.0.0-rc7) · [Apache-2.0](https://github.com/spring-ai-alibaba/DataAgent/blob/main/LICENSE)

[快速开始](https://github.com/spring-ai-alibaba/DataAgent/blob/main/docs/QUICK_START.md) → [知识配置](https://github.com/spring-ai-alibaba/DataAgent/blob/main/docs/KNOWLEDGE_USAGE.md) → [架构设计](https://github.com/spring-ai-alibaba/DataAgent/blob/main/docs/ARCHITECTURE.md) → [高级功能](https://github.com/spring-ai-alibaba/DataAgent/blob/main/docs/ADVANCED_FEATURES.md)

- **重点读什么：** 证据与 Schema 召回、表关系、可行性和规划如何接入 SQL/Python/报告；字段映射、业务知识与文档/问答知识分别放在哪里。
- **怎样检查：** 用同一个业务问题追踪计划、生成查询、Python 输出和报告；需要 Python 时，再核对任务容器的依赖安装、资源限制与清理记录。
- **关键边界：** 当前 main 高级文档明确说明后端尚未对 `X-API-Key` 做权限校验。API Key 管理入口存在不等于认证已生效。RC 标签、main 文档和固定版本需要分别核对。

### DB-GPT

**类型：Agent 应用平台。** [实现与启动](https://github.com/eosphoros-ai/DB-GPT/blob/main/README.md) · [v0.8.2](https://github.com/eosphoros-ai/DB-GPT/releases/tag/v0.8.2) · [MIT](https://github.com/eosphoros-ai/DB-GPT/blob/9d50d0a55071a040a8cb7684b3b6acfa13cc7c47/LICENSE)

[分析规划](https://github.com/eosphoros-ai/DB-GPT/blob/main/docs/data_analysis_planning_agent.md) → [上下文管理](https://github.com/eosphoros-ai/DB-GPT/blob/9d50d0a55071a040a8cb7684b3b6acfa13cc7c47/docs/docs/agents/modules/context-management.md) → [SQL 工具契约](https://github.com/eosphoros-ai/DB-GPT/blob/9d50d0a55071a040a8cb7684b3b6acfa13cc7c47/docs/docs/agents/modules/resource/tools/sql-query.md)

- **重点读什么：** 计划状态与工具循环如何协作；长会话怎样逐层压缩观察和历史，同时保留完整工具结果的快照路径。
- **怎样检查：** 在结果较大的任务中区分“显示的前 50 行”“完整工具结果”和“完整数据集”，再检查压缩后的分析是否仍保留筛选条件。
- **关键边界：** 规划页含设计示例与未来规划，不能把每个工具名称当作稳定功能承诺；`sql_query` 的只读契约不代表所有 Python、Shell 和其他工具均只读。11 月 5 日核验时文档站超时，故链接到官方仓库原稿。

### SQLBot

**类型：ChatBI 应用与 MCP 提供方。** [实现与部署说明](https://github.com/dataease/SQLBot/blob/main/README.md) · [v1.10.3](https://github.com/dataease/SQLBot/releases/tag/v1.10.3) · [许可证原文](https://github.com/dataease/SQLBot/blob/main/LICENSE)

- **重点读什么：** 术语、SQL 示例和向量检索怎样辅助问数；工作空间、嵌入入口和 MCP 调用怎样组织数据访问。适合与完整自主分析 Agent 比较应用层职责。
- **怎样检查：** 固定业务定义后，分别从原生页面与嵌入入口问同一问题，保留选表、查询、图表和调用身份；再用不同工作空间的授权账号复测。
- **关键边界：** 许可证是附加条件的 FIT2CLOUD modified GPLv3，不能简写成标准 GPLv3。部署示例包含 `privileged` 选项，应与生产配置分开评审；本仓没有运行该部署示例。

### Google Data Agent Kit

**类型：Skills 与工具插件。** [插件说明](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin/blob/main/README.md) · [1.2.0](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin/releases/tag/1.2.0) · [Apache-2.0](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin/blob/main/LICENSE)

[插件安装](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin/blob/main/README.md) → [MCP 与授权](https://docs.cloud.google.com/data-agent-kit/use-mcp-servers) → [原始数据到预测 Codelab](https://codelabs.developers.google.com/next26/gen-keynote/raw-data-forecasting) → [Data Apps 技术实现指南](https://googlecloudplatform.github.io/cloud-solutions/agentic-coding-with-data-agent-kit-demo/)

- **重点读什么：** 宿主 Agent、Skills 和 MCP 各自负责什么；工具调用角色、产品数据权限与服务账号模拟如何组合。
- **怎样检查：** 先完成受限数据范围内的查询，再按教程跟踪文档抽取、结构化数据与分析步骤。保存实际身份和工具结果，避免只记录自然语言总结。
- **关键边界：** 插件与 IDE 扩展的安装方式不同；Skills 的确认指令不能代替 IAM 授权。Codelab 中的演示角色、资源公开配置和生产配置应分别评审；插件免费不代表云计算与模型使用免费。

### DataHub Analytics Agent

**类型：分析应用。** [启动与开发说明](https://github.com/datahub-project/analytics-agent/blob/main/README.md) · [v0.4.0](https://github.com/datahub-project/analytics-agent/releases/tag/v0.4.0) · [Apache-2.0](https://github.com/datahub-project/analytics-agent/blob/main/LICENSE)

[快速启动与合成零售演示](https://github.com/datahub-project/analytics-agent/blob/main/README.md) → [Context Kit 接入教程](https://datahub.com/blog/building-autonomous-data-agents/) → [运行时授权分工](https://datahub.com/blog/agent-governance-with-datahub-and-secupi/)

- **重点读什么：** LangGraph ReAct 如何使用目录和引擎工具；DataHub 连接可选，不能假设启动演示必然具备完整企业上下文；目录改进建议如何经用户确认后写回。
- **怎样检查：** 对同一问题记录所选表、业务定义、查询和图表；比较加入上下文前后的变化，同时检查数据权限是否保持一致。
- **关键边界：** 界面的上下文质量分数不是业务答案正确率。v0.4.0 release 包含 DDL/DML 提交处理，不能将整个应用描述为强制只读；元数据工具开关与数仓身份权限须分别核对。4 月 Context Kit 教程的历史 SDK 示例需按当前版本修正。

### WrenAI

**类型：语义层与 Agent 工具。** [实现](https://github.com/Canner/WrenAI) · [wren-v0.17.1](https://github.com/Canner/WrenAI/releases/tag/wren-v0.17.1) · [分路径许可证](https://github.com/Canner/WrenAI/blob/548eee3e864b11e7f11eee15ae82be178a295f22/LICENSE)

[快速开始](https://docs.getwren.ai/oss/get_started/quickstart) → [架构原稿](https://github.com/Canner/WrenAI/blob/548eee3e864b11e7f11eee15ae82be178a295f22/docs/core/reference/architecture.md) → [MDL 参考](https://github.com/Canner/WrenAI/blob/main/docs/core/reference/mdl.md)

- **重点读什么：** 项目中的业务模型和知识如何编译为查询；知识源文件与可重建记忆索引如何分开；Agent 如何使用规划、校验和结构化错误。
- **怎样检查：** 对同一指标保存模型定义、展开 SQL、执行结果与对账证据，分别看 `dry-plan`、`dry-run` 和业务语义检查覆盖了什么。
- **关键边界：** main 架构把 golden NL-SQL eval 标为开发中，不能据文档中的名称写成已具备完整验收系统。代码、文档按路径采用不同许可；行列安全和商业交付能力也需逐项核对。

## 实现与组件

### Datus Agent · 完整 Agent

[实现](https://github.com/Datus-ai/Datus-agent) · [OntologyAnalyst 技术资料](https://docs.datus.ai/dev/subagent/ontology_analyst/) · [v0.4.4 更新证据](https://github.com/Datus-ai/Datus-agent/releases/tag/v0.4.4) · [许可证 Apache-2.0](https://github.com/Datus-ai/Datus-agent/blob/main/LICENSE)

- **机制：** 按业务域组织 schema、参考 SQL、指标和业务知识，检索后调用数据库/语义工具；修正反馈回流上下文；提供 CLI、Web、API 和 MCP。
- **适合：** 研究数据工程 Agent 的上下文资产化、领域子 Agent 和指标优先查询。
- **使用前了解：** 部署时需按所用数据库安装适配器；v0.4.3 移除了旧 gen_metrics/gen_semantic_model 工作流，阅读旧教程时需核对版本。
- **近期变化（10 月 28 日）：** v0.4.4 补充 OntologyAnalyst 与数据源映射、执行适配器及工具隔离。Agent 等待超时不保证远端查询已经终止，不应据此直接重试写入；dev 技术文档可能领先稳定版本。

### dbt MCP Server · 工具服务

[实现](https://github.com/dbt-labs/dbt-mcp) · [技术资料](https://docs.getdbt.com/docs/dbt-ai/about-mcp) · [v2.10.1 更新证据](https://github.com/dbt-labs/dbt-mcp/releases/tag/v2.10.1) · [许可证 Apache-2.0](https://github.com/dbt-labs/dbt-mcp/blob/main/LICENSE)

- **机制：** 通过 MCP 提供本地 dbt CLI、manifest 查询、Semantic Layer、Discovery、Admin API 与 SQL 工具，让通用 Agent 复用 dbt 上下文。
- **适合：** 已采用 dbt 的团队构建分析工程助手、指标问答与作业诊断工具。
- **使用前了解：** 它是工具服务；本地 CLI 与平台 API 的依赖不同。Semantic Layer、Discovery 和平台 SQL 等能力需要对应 dbt Platform 配置与权限。
- **本轮变化（11 月 3 日）：** v2.10.1 将 job/run 访问描述改为 Owner 目标与共享列举策略，授权宿主需处理 `JOBS_LISTING`、`RUNS_LISTING`；移除未用的全文助手，保留 `llms.txt` 搜索与单页读取。此前 Mesh 发现与超时处理仍需按对应配置使用，不能据新版本推断所有部署具备相同权限。

### dbt Agent Skills · 技能包

[实现](https://github.com/dbt-labs/dbt-agent-skills) · [技术资料](https://github.com/dbt-labs/dbt-agent-skills/tree/main/evals) · [2026 更新证据](https://docs.getdbt.com/blog/dbt-agent-skills) · [许可证 Apache-2.0](https://github.com/dbt-labs/dbt-agent-skills/blob/main/LICENSE)

- **机制：** 将探索数据、编写模型、验证结果、编写测试等流程封装为按需加载的 Agent Skills，并提供补充参考与评估工具。
- **适合：** 用已有编码 Agent 承接分析工程工作，或设计企业自己的数据技能包和验证流程。
- **使用前了解：** 它提供流程与知识，依赖宿主 Agent 和实际 dbt 环境执行；技能是否被自动选中也需纳入评估。

### ADE-bench · 评测环境

[实现](https://github.com/dbt-labs/ade-bench) · [技术资料](https://github.com/dbt-labs/ade-bench/blob/main/docs/CLI.md) · [2026 更新证据](https://github.com/dbt-labs/ade-bench/commit/fe3c50263447232064cdd45908efc6270970118a) · [许可证 Apache-2.0](https://github.com/dbt-labs/ade-bench/blob/main/LICENSE)

- **机制：** 每个任务复制项目并创建临时沙箱，注入任务问题，交给 Agent 修改，随后以 dbt 测试、结果表对比和文件快照判断是否完成。
- **适合：** 评估修改数据模型、排查管道错误等工程任务，也可用于回归比较不同工具与技能组合。
- **使用前了解：** 默认任务主要围绕 dbt 分析工程；评测结果不能直接外推到开放式业务洞察或可视化报告质量。

### MCP Toolbox for Databases · 工具服务

[实现](https://github.com/googleapis/mcp-toolbox) · [技术资料](https://github.com/googleapis/mcp-toolbox/blob/06ea49d9a487a72c22419b5a8d5c22c11f0d7485/docs/en/documentation/introduction/_index.md) · [v1.16.0 更新证据](https://github.com/googleapis/mcp-toolbox/releases/tag/v1.16.0) · [许可证 Apache-2.0](https://github.com/googleapis/mcp-toolbox/blob/06ea49d9a487a72c22419b5a8d5c22c11f0d7485/LICENSE)

- **机制：** 将数据源连接和工具声明集中在配置中，向 MCP 客户端或 Agent SDK 暴露预置查询及定制工具，并提供认证、连接池和可观测性。
- **适合：** 搭建统一数据库工具服务，或将受控查询封装成可复用工具供多个数据 Agent 调用。
- **使用前了解：** bigquery-execute-sql 官方定位为有人监督的开发助手工具，不建议直接用于生产 Agent；默认 readOnly=false、writeMode=allowed。protected 模式仍允许经验证的会话临时写入，不等于严格只读；生产应配置最小权限与受控工具。
- **本次变化（11 月 6 日核验）：** v1.16.0 于 2026-11-05T19:56:15Z 发布（上海时间 11 月 6 日）。protected 拒绝无法证明属于当前会话临时数据集的非 SELECT 写入；默认 allowed 并未因此变成只读。详见 [工具说明](https://github.com/googleapis/mcp-toolbox/blob/06ea49d9a487a72c22419b5a8d5c22c11f0d7485/docs/en/integrations/bigquery/tools/bigquery-execute-sql.md)。
- **历史变化（10 月 23 日）：** v1.15 新增 Conversational Analytics 数据 Agent 管理和 Looker 保存查询工具。创建、更新、删除 Agent 属于管理写操作，需与只读查询分开授权；release 于 10 月 23 日公开，早于该日的 changelog 标签不作为公开发布日期。

### Boring Semantic Layer (BSL) · 语义组件

[实现](https://github.com/boringdata/boring-semantic-layer) · [技术资料](https://boringdata.github.io/boring-semantic-layer/) · [2026 更新证据](https://github.com/boringdata/boring-semantic-layer/releases/tag/v0.3.18) · [许可证 MIT](https://github.com/boringdata/boring-semantic-layer/blob/main/LICENSE)

- **机制：** 用 Python/Ibis 定义维度、度量和语义表，通过受控指标查询编译到不同数据库后端。
- **适合：** 研究指标口径约束、语义工具接口与轻量级分析 Agent 的数据底座。
- **使用前了解：** 它是语义组件；需要另接 Agent、认证和 UI。已有 dbt MetricFlow 模型的团队还需评估语义模型转换成本。

### R&D-Agent · 实验 Agent

[实现](https://github.com/microsoft/RD-Agent) · [技术资料](https://rdagent.readthedocs.io/en/latest/scens/data_science.html) · [2026 更新证据](https://github.com/microsoft/RD-Agent/releases/tag/v1.0.0) · [许可证 MIT](https://github.com/microsoft/RD-Agent/blob/main/LICENSE)

- **机制：** 将提出假设的 Research 和编码实现的 Development 分开，依据实际实验和评估反馈循环改进数据特征、模型或训练方案。
- **适合：** 研究数据科学 Agent 的自动实验、代码修复和反馈循环，或复现 ML 工程任务。
- **使用前了解：** 项目当前明确支持 Linux，多数场景需要 Docker；不同建模任务还需相应数据与计算资源，非开箱即用业务 BI 助手。

### Data Formulator · 分析工作区

[实现](https://github.com/microsoft/data-formulator) · [技术资料](https://github.com/microsoft/data-formulator/blob/5477f0e236426dc8f74a498ec400414fba7fbc0f/DEVELOPMENT.md) · [2026 更新证据](https://github.com/microsoft/data-formulator/releases/tag/0.7.0) · [许可证 MIT](https://github.com/microsoft/data-formulator/blob/5477f0e236426dc8f74a498ec400414fba7fbc0f/LICENSE)

- **机制：** 通过数据连接器和数据记忆理解多源数据，在 Data Thread 中保留分析路径，支持从历史节点分支、图表编辑和自然语言继续探索。
- **适合：** 交互式 EDA、图表与报告体验原型，也适合研究用户如何审阅和纠正 Agent 的分析过程。
- **使用前了解：** 稳定复现仍可固定 0.7.0；GitHub 最新 tag 为 0.8b1，README 对应包版本 0.8.0b1，官方称为 beta，虽然 GitHub prerelease 字段为 false。当前开发文档默认面向单用户本地运行；匿名多用户部署应关闭数据连接器、自定义模型和密钥显示，正式团队部署需认证身份，不能把浏览器 UUID 当作安全身份。

### Jupyter AI · Notebook 工作区

[实现](https://github.com/jupyterlab/jupyter-ai) · [技术资料](https://github.com/jupyterlab/jupyter-ai/blob/995b53b651c39bf9a7744bfe0d2d85b0967b672c/docs/source/releases/v3.2.0.md) · [2026 更新证据](https://jupyter-ai.readthedocs.io/en/stable/releases/v3.2.0.html) · [许可证 BSD-3-Clause](https://github.com/jupyterlab/jupyter-ai/blob/dc4d493031484480040a89e68ecea8d49f1665e2/LICENSE)

- **机制：** 在 JupyterLab 原生聊天中连接 Agent，通过内置 MCP 和前端命令操作 Notebook 与文件，并在写入和执行前进行权限审批。
- **适合：** 需要人工审阅的 Notebook 分析、数据科学协作，以及将步骤和输出留在可继续运行的工作区。
- **使用前了解：** v3.2.0 的 Notebook 编辑、运行和调试可不依赖 RTC，但官方明确说明：外部直接修改磁盘上的 Notebook 不会因此实时刷新到界面，文件刷新还可能丢失滚动位置。聊天工具实时操作与任意磁盘修改自动同步是不同能力；主仓库发布还需结合子包 release notes 阅读。

### dlt MCP Server · 工具服务

[实现](https://github.com/dlt-hub/dlt-mcp) · [技术资料](https://dlthub.com/docs/dlt-ecosystem/llm-tooling/llm-native-workflow) · [2026 更新证据](https://github.com/dlt-hub/dlt-mcp/commit/b128708215abe34a91e028a2f8916516392ffb8a) · [许可证 Apache-2.0](https://github.com/dlt-hub/dlt-mcp/blob/main/LICENSE)

- **机制：** 把本地 dlt 管道元数据、加载状态、schema 差异、只读查询与 dlt 文档/代码检索暴露为 MCP 工具。
- **适合：** 给数据工程 Agent 补充真实管道状态，使其能够诊断增量加载、表结构变动和数据接入问题。
- **使用前了解：** 需要已有 dlt 管道并配置目标数据库 extras；它提供数据接入工具上下文，执行和规划仍由宿主 Agent 完成。

## 已归档的架构案例

### Vanna 2.0 · 2026-03-29 已归档

[源码](https://github.com/vanna-ai/vanna) · [迁移与架构说明](https://github.com/vanna-ai/vanna/blob/365d0617c1a4567ffee1b19b40c27feb4206bfcf/MIGRATION_GUIDE.md) · [版本证据](https://github.com/vanna-ai/vanna/releases/tag/v2.0.2) · [许可证 MIT](https://github.com/vanna-ai/vanna/blob/365d0617c1a4567ffee1b19b40c27feb4206bfcf/LICENSE)

由应用实现 UserResolver，将经认证的身份和组信息交给 Agent 与工具注册表；工具组权限、SQL 执行与流式 UI 在同一调用链中协作。 项目已于 2026-03-29 归档。LegacyVannaAdapter 共享同一 VannaBase 实例，官方迁移指南明确说明不能利用行级安全；身份传递和工具组权限不能直接当作数据库行级隔离保证。

## 托管平台：沿官方教程复现

| 平台 / 目标 | 官方技术入口 | 建议关注 |
|---|---|---|
| Fabric：运行时与企业集成 | [Runtime](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-runtime) · [MCP](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-mcp-server) · [Foundry / Fabric IQ](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-foundry-fabric-iq) | 标准/预览运行时、领域 Agent 发现、认证与多 Agent 调用 |
| BigQuery：分析与数据工程 | [Data Science Agent](https://docs.cloud.google.com/bigquery/docs/colab-data-science-agent) · [Pipelines](https://docs.cloud.google.com/bigquery/docs/data-engineering-agent-pipelines) · [A2A API](https://docs.cloud.google.com/gemini/data-agents/data-engineering-agent/api-overview) | Notebook 证据、SQLX 生成与应用、任务完成状态；逐项核对执行能力 |
| Snowflake：从数据到运行时 | [从零搭建](https://www.snowflake.com/en/developers/guides/build-a-cortex-agent-from-scratch-with-snowflake/) · [Agent SDK](https://www.snowflake.com/en/developers/guides/getting-started-with-cortex-agent-sdk/) | 语义视图 + 检索工具、多轮状态、后台任务、代码沙箱 |
| Databricks：接入和验收 | [Genie MCP](https://docs.databricks.com/aws/en/agents/mcp-tools/genie-mcp) · [Test and monitor](https://docs.databricks.com/aws/en/genie-agents/monitor) | Catalog 权限、来源链接、SQL 结果比较与 Agent 任务评分 |
| AWS：用户身份贯穿访问链 | [Lake Formation + Trusted Identity Propagation](https://aws.amazon.com/blogs/security/identity-aware-ai-data-agents-with-aws-lake-formation-and-trusted-identity-propagation/) | 真实用户身份如何穿过 AgentCore、MCP、Lambda 与 Athena，并留下访问证据 |
| AWS：同一问题比较语义层实现 | [Stardog 图谱](https://aws.amazon.com/blogs/machine-learning/build-a-semantic-layer-for-agentic-ai-on-aws-with-stardog-and-amazon-bedrock-agentcore/) · [Denodo 虚拟化](https://aws.amazon.com/blogs/machine-learning/build-a-semantic-layer-for-agentic-ai-on-aws-with-denodo-and-amazon-bedrock-agentcore/) · [AtScale 维度模型](https://aws.amazon.com/blogs/machine-learning/build-a-semantic-layer-for-agentic-ai-on-aws-with-atscale-and-amazon-bedrock-agentcore/) | 比较同一 C360 场景的数据放置、查询语言、模型和身份路径；AtScale 示例将分析数据先汇入 Redshift，不能与联邦查询混为一谈 |
| AWS：跨模态与专门 Agent | [数据治理与准备](https://aws.amazon.com/blogs/industries/multi-agent-multimodal-data-analysis-on-aws-part-1-data-governance-and-visualization/) → [MCP / A2A 编排](https://aws.amazon.com/blogs/industries/multi-agent-multimodal-data-analysis-on-aws-part-2-multi-agent-orchestration-and-predictive-analytics/) | 先理解目录和订阅，再看 Supervisor 的调用身份、超时与证据综合；是合成数据研究示例 |
| 火山引擎：检索范围与工具配置 | [3.21 系列文档](https://docs.volcengine.com/docs/data-agent-private/v3-21-0?lang=zh) · [官方培训入口](https://developer.volcengine.com/videos/7566240392669528073) | 分开核对版本形态、会话检索范围、SQL/Python/联网工具与接口凭证；视频完整播放未独立测试 |
| Databricks：应用接入与配置交付 | [Genie Agents API](https://docs.databricks.com/aws/en/genie-agents/conversation-api) | 查询会话、Agent mode 与管理 API 分开授权；接入成功后仍需运行基准问题验证答案 |

## 将项目资料变成一次可检查的实验

1. 选一个真实任务，记录输入数据、业务口径和期望产物，例如“修改一个模型并检查下游影响”或“解释营收变化并附执行证据”。
2. 固定项目版本、模型、工具权限和样例数据，保存实际工具调用与结果。
3. 分别检查执行成功、结果正确与业务语义正确；用确定性测试覆盖可计算的约束。
4. 在相同条件下改变一个因素，例如加入 Skills、语义模型或上下文指南，比较质量、成本和完成时间。
5. 把失败和修正写入回归集，再决定是否进入下一阶段；可配合 [设计评审模板](DESIGN_REVIEW.md) 使用。

评测材料可交叉阅读 [ADE-bench 方法](https://www.getdbt.com/blog/ade-bench-dbt-data-benchmarking)、[Preset Skills 对照](https://preset.io/blog/building-preset-agent-skills/) 与 [Xorq 语义目录实验](https://xorq.dev/blog/orientation-over-reasoning/)。开放式分析还需检查证据是否充足和是否应该拒答；[Hex DataBench](https://hex.tech/blog/databench-agentic-analytics-benchmark/) 提供方法参考，其任务集并未公开。

## 后续扩展优先级

| 优先级 | 下一步补什么 | 收录完成的标准 |
|---|---|---|
| 1 | 为更多项目补齐“架构 → 启动 → 工具/权限 → 评测”的资料包 | 每一步都有一手入口、对应版本和证据边界；无独立日期的文档作为项目支持材料 |
| 2 | 按真实任务比较实现路径 | 用相同问题比较语义建模、执行位置、人工接手和交付证据；有实际运行才填写成绩 |
| 3 | 增加可复现实验记录 | 固定样例数据、项目/模型版本与权限，保留查询和失败；同时报告成本与运行时间 |
| 4 | 持续补全中文大会实录与海外讲义 | 找到具体场次的可读材料后才升级状态；只有大会入口、报名页或二维码时继续保留限制 |

这轮已完成资料包与分享入口的扩充。上表后续实验尚未运行，不把建议的验收产物写成已经取得的测试结果。
