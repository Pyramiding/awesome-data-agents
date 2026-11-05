# Awesome Data Agents · 2026

**[打开网页版 →](https://pyramiding.github.io/awesome-data-agents/)** · 双维分类、关键词搜索、连续阅读、收藏与深浅主题 · [网页维护说明](WEB.md)

> 一份把公开资料变成工程决策地图的 Data Agent 索引：从“能写 SQL”走向“可验证地完成数据工作”。

A source-checked guide to AI data agents: architectures, implementations, semantic layers, benchmarks and production practices. Chinese notes, original-language sources.

**168 条资料** · `62` 架构与实践 · `32` 公开实现 · `23` 分享与议程 · `17` 研究 · `20` 持续文档 · `14` 评测

**资料截止：2026-11-05（Asia/Shanghai）** · [增量更新记录](UPDATES.md)

## 从这里开始 · Start here

| 你想做什么 / Your goal | 先看这里 / Start here |
|---|---|
| 建立全景认识 / Get oriented | [先看结论](#先看结论) → [2026 十个起点](#2026-十个起点) |
| 选项目、组件或接入方案 / Choose an implementation | [项目资料路线](PROJECT_GUIDE.md) → [实现选型快表](#选型快表) |
| 设计自己的 Data Agent / Design a system | [参考架构](#一眼看懂-data-agent) → [工程模式与反模式](#工程模式与反模式) |
| 评估质量与上线条件 / Evaluate readiness | [Benchmark 选择指南](#benchmark-选择指南) → [设计评审模板](DESIGN_REVIEW.md) |
| 看公开分享或讲义 / Explore talks and slides | [公开分享导航](TALKS.md) → 按问题选择实录、幻灯片与官方培训入口 |
| 查新增资料或参与维护 / Follow changes or contribute | [更新记录](UPDATES.md) → [推荐资料 / 提交勘误](https://github.com/Pyramiding/awesome-data-agents/issues/new/choose) |

[收录规则](METHODOLOGY.md) · [贡献指南](CONTRIBUTING.md) · [机器可读索引](resources.json)

<details>
<summary><strong>完整导航 / Full contents</strong></summary>

[先看结论](#先看结论) · [参考架构](#一眼看懂-data-agent) · [交付成熟度](#交付成熟度从会回答到可托付) · [反模式](#工程模式与反模式) · [10 个起点](#2026-十个起点) · [国际导航](#国际资料导航) · [工程实践](#工程实践与公开分享) · [中文分享](#中文与国内实践) · [公开分享导航](TALKS.md) · [公开实现](#开源实现与公开源码) · [项目路线](PROJECT_GUIDE.md) · [论文评测](#论文与评测) · [设计评审模板](DESIGN_REVIEW.md) · [机器索引](resources.json)

</details>

这里不追求链接数量。每条资料都尽量回到作者、项目或大会原始页面，并回答三个问题：**它解决什么、采用什么机制、证据边界在哪里。** 仓库进一步把分散材料提炼成参考架构、交付成熟度与设计检查表，帮助读者做方案判断，而不只是收藏链接。

<details>
<summary><strong>English summary</strong></summary>

A source-checked, 2026-focused field guide to Data Agent architectures, production write-ups, public implementations, benchmarks, papers, and talks. Beyond indexing links, it synthesizes an engineering model for context, execution, verification, and governance. Chinese annotations stay concise while original titles and first-party links are preserved.

</details>

![Data Agent 原创系统参考图：跨层控制面约束身份、策略、预算审批与审计；Know 组织元数据、指标语义、血缘和已审核记忆；Act 通过任务 DAG、检查点及 SQL/Python/API 沙箱执行并观察；Prove 分别检查执行、数据与业务语义，附带来源、查询和限制，证据不足则澄清或升级；轨迹经评测、人工审核后形成获准的改进。](data-agent-system-map-v2.png)

*原创工程参考图：上层治理贯穿全程；中部展开上下文、任务 DAG、工具沙箱与分层验证；下层单独呈现经人工审核的评测改进。点击图片可查看细节。*

<details>
<summary>如何读这张图：三条容易被忽略的工程边界</summary>

- **上下文不等于原始数据。** 目录、指标定义、粒度、关联关系和新鲜度帮助规划；实际查询与计算进入受控工具运行时，不要求把全部数据塞进模型。
- **执行成功不等于答案正确。** 执行、数据质量和业务语义分别校验，并保留来源、查询与限制。图中 Verified 表示通过所配置的检查并附有证据，不是正确性的绝对保证；证据不足应澄清、局部修复或升级处理。
- **评测改进不等于自动自我训练。** Traces → Eval suite → Human review → Approved updates 是经审核的改进链；失败修复只重跑受影响步骤，不默认重启整个流程，也不直接把未验证结论写入长期记忆。

</details>

## 本轮扩充：技术文档、项目路线与公开分享

本轮补录 **12 条** 2026 年资料，并为 **5 个**已有项目补齐官方阅读路线。它是按主题补强，不将这些历史材料写成上次上传后的新发布；原始日期、版本与核验时间分别记录。

从 [四条动手阅读路线](PROJECT_GUIDE.md#四条动手阅读路线)进入，或按 [公开分享导航](TALKS.md)选择实录、PDF 和培训页。完整明细见 [更新记录](UPDATES.md) 与 [机器索引](resources.json)。

这轮更值得带着问题读的三个工程判断（本仓编辑归纳）：

- **看到配置入口，还要找到实际执行约束的位置。** [Spring AI Alibaba 高级文档](https://github.com/spring-ai-alibaba/DataAgent/blob/main/docs/ADVANCED_FEATURES.md)明确 API Key 后端校验尚未完成；[Google MCP 文档](https://docs.cloud.google.com/data-agent-kit/use-mcp-servers)则把工具调用与数据服务授权分开说明。
- **有流程说明，还要检查它是否真的阻止错误交付。** [三个分析 Harness 讲义](https://www.insightextractor.com/p/session-slide-and-recording-build)给出可审阅的文件布局，但示例 hook 只是提醒；指标变化后的证据失效也需要实际实现。
- **同样叫语义层，数据放置与执行路径可能不同。** [AWS / AtScale 教程](https://aws.amazon.com/blogs/machine-learning/build-a-semantic-layer-for-agentic-ai-on-aws-with-atscale-and-amazon-bedrock-agentcore/)将分析数据先汇入 Redshift；对照系列中的图谱和虚拟化方案，选型时应把上下文、计算位置和身份路径一起比较。

<details>
<summary><strong>展开本轮补录的 12 条资料</strong></summary>

| 原始日期 | 一手资料 | 类型 / 阅读价值 |
|---|---|---|
| 04-07 | [DataHub Agent Context Kit：从目录上下文到分析 Agent](https://datahub.com/blog/building-autonomous-data-agents/) | 架构教程；SDK 与 MCP 两条接入路径，历史代码需核对当前版本 |
| 07-01 更新 | [火山引擎 DataAgent 私有化：3.21 系列文档](https://docs.volcengine.com/docs/data-agent-private/v3-21-0?lang=zh) | 持续文档；检索范围、版本形态、工具开关与接口凭证 |
| 07-10 | [Catch 7 AI Analysis Mistakes](https://www.insightextractor.com/p/maven-session-slide-deck-download) | 公开讲义；18 页检查指标、粒度、时期、来源与证据 |
| 07-16 | [Build 3 AI Harnesses for Trustworthy Analytics](https://www.insightextractor.com/p/session-slide-and-recording-build) | 公开讲义；15 页上下文、校验与证据复用设计 |
| 08-04 | [AWS 多模态数据分析：MCP / A2A 与 Supervisor](https://aws.amazon.com/blogs/industries/multi-agent-multimodal-data-analysis-on-aws-part-2-multi-agent-orchestration-and-predictive-analytics/) | 架构教程；配套前篇的数据治理，使用合成数据演示 |
| 08-20 | [火山引擎：分析洞察搭建流程概览](https://developer.volcengine.com/videos/7566240392669528073) | 官方视频页；已核验简介和日期，完整播放未独立测试 |
| 09-10 | [DataHub + SecuPi：上下文与运行时控制](https://datahub.com/blog/agent-governance-with-datahub-and-secupi/) | 架构；用户身份、字段屏蔽和审计链分工 |
| 10-20 | [AWS + AtScale：语义模型与 AgentCore](https://aws.amazon.com/blogs/machine-learning/build-a-semantic-layer-for-agentic-ai-on-aws-with-atscale-and-amazon-bedrock-agentcore/) | 架构教程；SML、MCP、身份传播与部署 |
| 10-26 更新 | [Google Data Agent Kit：Use MCP servers](https://docs.cloud.google.com/data-agent-kit/use-mcp-servers) | 持续文档；工具角色、服务权限、账号模拟与策略执行 |
| 10-29 release | [SQLBot](https://github.com/dataease/SQLBot) | ChatBI 应用 / MCP 提供方；附加条件的 modified GPLv3 |
| 10-30 更新 | [Databricks：Use the Genie Agents API](https://docs.databricks.com/aws/en/genie-agents/conversation-api) | 持续文档；会话、Agent mode 与管理 API 分开授权 |
| 11-02 | [衡石：多轮问数的上下文、偏好与学习开关](https://www.hengshi.com/blog/hengshi-data-agent-context-preferences-learning.html) | 架构实践；会话条件、业务定义和长期复用分别验收 |

</details>

## 先看结论

> 以下是本仓对 2026 年公开材料的编辑归纳，不是行业标准或厂商排名。判断依据均可沿链接回到原始资料。

1. **瓶颈正从“模型会不会写 SQL”转向“系统有没有正确上下文”。** Schema 只是起点，业务指标、术语、血缘、历史查询、组织知识与新鲜度共同决定答案上限。可对照 [OpenAI](https://openai.com/index/inside-our-in-house-data-agent/)、[Anthropic](https://claude.com/resources/articles/how-anthropic-enables-self-service-data-analytics-with-claude) 与 [Snowflake](https://www.snowflake.com/en/blog/agent-context-layer-trustworthy-data-agents/) 的实践。
2. **可靠性来自受限执行器与独立验证，而不是更长的推理文本。** SQL、Python 或 Spark 需要在可控环境执行；“能运行”“结果合理”“业务语义正确”必须分开检查。
3. **语义层正在从静态词典变成 Agent 循环中的 runtime 与 validator。** 它不仅解释指标，也约束 grain、join、fan-out、权限和工具选择。
4. **评测单位正在从最终答案扩展到轨迹、证据、拒答、成本与时延。** [Hex](https://hex.tech/blog/evaluate-data-agents/)、[DAB](https://arxiv.org/abs/2603.20576) 和 [ClickHouse](https://clickhouse.com/blog/agentic-analytics-benchmark-data-agent-mnist) 展示了不同层次的测法。
5. **Multi-Agent 不是默认答案。** 只有并行探索、专业分工或权限隔离带来明确收益时，额外的状态、成本和故障链路才值得承担；其余场景先把单 Agent、确定性工具与验证闭环做好。

## 一眼看懂 Data Agent

Data Agent 的难点，不只是把自然语言翻译成查询，而是让系统在正确的数据、业务语义和权限边界内，完成可执行、可验证、可追溯的分析。本仓用四个问题组织资料：**它知道什么、如何行动、怎样证明、由谁控制。**

| 工程轴 | 核心问题 | 关键构件 | 交付时应看到什么 |
|---|---|---|---|
| **Know · 上下文** | Agent 是否拿到了正确的业务语境？ | Schema、指标口径、Glossary、Lineage、历史查询、Ontology、Skills | 上下文有来源、版本、权限和新鲜度，而不是一次性把整库 Schema 塞进 Prompt |
| **Act · 执行** | Agent 如何把问题变成受控步骤？ | 澄清、计划、工具选择、SQL/Python/Spark、Sandbox、停止条件 | 每一步可中断、可复现；高风险工具受限，凭据不进入模型上下文 |
| **Prove · 验证** | 为什么相信结果，而不只是一段流畅回答？ | 语法、结果与语义检查，引用、轨迹、不确定性 | 展示数据来源、执行过程与验证结果；证据不足时拒答或升级 |
| **Control · 运营** | 上线后如何持续安全、稳定地工作？ | 权限、审批、审计、Trace、Evals、回归集、成本/时延预算、反馈与记忆 | 质量退化可发现，错误可追踪，写操作可审批，版本可回滚 |

```text
业务问题
   ↓
意图识别与澄清 ───────────── 身份、权限与风险策略
   ↓
上下文路由 ───── Schema｜指标｜术语｜血缘｜历史｜Skills
   ↓
计划与工具选择 ───────────── 任务分解、预算、停止条件
   ↓
受控执行 ─────── SQL｜Python｜Spark｜搜索｜BI
   ↓
多层验证 ─────── 可运行｜结果｜语义｜证据｜不确定性
   ↓
回答或经审批的行动
   ↺
Trace → Evals → 回归 → 反馈/记忆
```

只覆盖中间的“生成并运行 SQL”，仍是能力组件；上下文、执行、验证和运营形成闭环后，系统才接近可长期使用的 Data Agent。

## 交付成熟度：从会回答到可托付

这里衡量的不是模型聪明程度，而是一个 Data Agent 是否具备进入真实工作流的条件；它与论文中的自治等级不是同一套分类。

| 阶段 | 系统能做什么 | 升级前必须补齐 |
|---|---|---|
| **M0 · 可检索** | 找到相关表、指标和文档，回答定义类问题 | 权威来源、权限过滤、上下文新鲜度 |
| **M1 · 可执行** | 运行 SQL/代码，产出表格或图表 | 只读默认、Sandbox、超时/行数限制、可复现产物 |
| **M2 · 可验证** | 检查计划、查询、结果和业务语义，并附带证据 | 失败分类、确定性校验、引用、拒答与人工升级路径 |
| **M3 · 可运营** | 在生产环境持续服务，并发现质量回退 | Trace、版本化回归集、Baseline、成本/时延预算、发布门禁 |
| **M4 · 可行动** | 在明确授权后触发下游流程或写操作 | 人工审批、最小权限、幂等、回滚与完整审计 |

成熟度不是功能计数：若权限、验证或回滚缺位，即使系统能完成复杂任务，也不应向更高阶段标注。可直接使用 [Data Agent 设计评审模板](DESIGN_REVIEW.md) 做上线前检查。

## 按目标阅读

| 你的目标 | 建议先读 | 再看实现/评测 |
|---|---|---|
| 企业问数 / ChatBI | OpenAI、Anthropic、Snowflake Context Layer | DAB、Shopee、DataHub |
| 多源深度分析 | Google Data Agent Kit、Databricks Genie | DataSpace、DeepEye |
| 数据工程 Agent | Altimate Code、Snowflake Cortex Code | DataClawEval、DataWorks、RHOAI |
| 质量与评测体系 | OpenAI、Hex、ClickHouse | AgenticDataBench、Microsoft workshop |
| 语义与上下文层 | DataHub、EvoOntology、Datus | WrenAI、Snowflake Cortex Sense |

## 工程模式与反模式

| 反模式 | 典型症状 | 更稳妥的工程模式 |
|---|---|---|
| **Schema 全量灌入 Prompt** | 上下文过长、过时，命中原因难解释 | 分层检索，只装配与当前问题有关的 Schema、指标和历史证据 |
| **SQL 能跑就算正确** | Grain、Join、单位或业务口径仍可能错误 | 把执行校验、结果校验、语义校验与证据检查拆开 |
| **默认上 Multi-Agent** | 状态、成本和故障链路变复杂，却没有明确收益 | 先完成单 Agent 闭环；仅在并行、分工或隔离确有需要时拆分 |
| **模型直连全部数据与工具** | 权限过宽、凭据暴露、工具选择不可控 | 通过受治理工具层连接，采用最小权限、只读默认和 Sandbox |
| **只测演示样例** | Happy path 顺畅，遇到脏 Schema、歧义或缺失数据就失效 | 建立真实任务回归集、失败分类与 Candidate-vs-Baseline 评测 |
| **永久记忆但没有治理** | 旧口径与错误经验被持续复用 | 为记忆标注来源、版本、Owner 与失效策略 |
| **直接开放写操作** | 分析错误被放大为下游动作 | 写操作单独授权，并增加审批、幂等、审计与回滚 |

## 收录边界

这里的 **Data Agent** 指能在受治理的数据环境中，自主完成部分或全部数据发现、语义理解、查询/代码生成、执行、验证、分析、可视化、报告或后续行动的智能体系统。它不等同于只有一次 Text-to-SQL 调用的聊天框。

- 优先一手来源；必须能核验到 2026 年日期或重要更新，并包含可复用的架构、实现或评测信息。
- 厂商内部数字只按“发布方自述”记录，不做跨系统排名；无项目级许可证的仓库只称“公开源码”。
- `🧪` 为研究或早期项目；`♻️` 为旧项目的 2026 重要更新；`📅` 为截止日仅有议程，不能视作已有回放；`🗄️` 为已归档实现。

完整规则见 [METHODOLOGY.md](METHODOLOGY.md)，结构化元数据见 [resources.json](resources.json)。

## 2026 十个起点

1. **2026-01-29 · [Inside OpenAI’s in-house data agent](https://openai.com/index/inside-our-in-house-data-agent/)** — 表使用、人工标注、Codex 代码富化、组织知识、记忆和运行时上下文六层 grounding；同时公开了 SQL/结果联合评测思路。
2. **2026-06-03 · [How Anthropic enables self-service data analytics with Claude](https://claude.com/resources/articles/how-anthropic-enables-self-service-data-analytics-with-claude)** — 把可信数据基础、source of truth、Skills、验证与同代码评审流程连接起来。
3. **2026-05-19 · [Data Agent Kit brings data skills and tools to your IDE or CLI](https://cloud.google.com/blog/products/data-analytics/data-agent-kit-brings-data-skills-and-tools-to-your-ide-or-cli/)** — “通用 Coding Agent + Data Skills + MCP tools”路线的代表。
4. **2026-05-08 · [Pushing the Frontier for Data Agents with Genie](https://www.databricks.com/blog/pushing-frontier-data-agents-genie)** — 专项知识搜索、并行思考、多模型和自纠错/验证的组合设计。
5. **2026-03-19 · [The Agent Context Layer for Trustworthy Data Agents](https://www.snowflake.com/en/blog/agent-context-layer-trustworthy-data-agents/)** — 从语义、规则、权限和验证解释可信 Data Agent 的上下文层。
6. **2026-04-16–18 · [Shopee：从 AI 取数到智能分析](https://qcon.infoq.cn/2026/beijing/presentation/7006)** — 从单链 RAG 到渐进披露 Multi-Agent、File-as-Context、Sandbox、Skills 与评测运营闭环。
7. **2026-02-04 · [Data Agents: Levels, State of the Art, and Open Problems](https://arxiv.org/abs/2602.04261)** — 从 L0 到 L5 的自治分级，是建立共同语言的最佳入口之一。
8. **2026-03-21 · [Can AI Agents Answer Your Data Questions?](https://arxiv.org/abs/2603.20576)** — 面向真实企业异构数据库任务的 DAB benchmark；建议同时查看最新版论文与榜单。
9. **2026-08-04 · [DataSpace](https://arxiv.org/abs/2608.03451)** — 410 个跨语言任务、六种模态与确定性表格评测，也是 KDD Cup 2026 Data Agent Track 的官方 benchmark。
10. **2026-09-15 · [EvoOntology](https://github.com/ruc-datalab/EvoOntology)** — 通过 MCP 暴露可版本化、可自演进的 Ontology Layer，直接回应语义层维护成本问题。

## 国际资料导航

从一个具体工程问题进入，再顺着实现、教程和评测阅读。下表是资料入口，不是厂商排名；完整项目路线见 [PROJECT_GUIDE.md](PROJECT_GUIDE.md)。

| 你想研究什么 | 建议入口 | 可复用的内容 |
|---|---|---|
| 数据工程 Agent 如何自行校验 | [dbt Wizard harness](https://docs.getdbt.com/blog/wizard-agent-harness) · [dbt Skills](https://docs.getdbt.com/blog/dbt-agent-skills) | DAG 上下文、编译反馈、限定验证范围、数据差异评审 |
| 分析 Agent 的工具如何设计 | [Cube Harness](https://cube.dev/blog/building-an-agentic-analytics-harness) · [Preset 生产化](https://preset.io/blog/preset-chatbot-technical-deep-dive/) | 结构化错误、结果分页、持久状态、异步与流式接入 |
| 上下文如何持续修正 | [Hex Context Suggestions](https://hex.tech/blog/introducing-context-suggestions/) · [MotherDuck Guides](https://motherduck.com/blog/context-belongs-in-the-warehouse/) | 会话复盘、人工审核、仓内上下文和版本管理 |
| BI 与多租户工具如何接入 | [Superset MCP](https://preset.io/blog/superset-mcp-service-deep-dive/) · [Preset 企业化](https://preset.io/blog/preset-mcp-open-source-to-enterprise/) | 预览与持久化分开、RBAC/RLS、工作区隔离 |
| 如何评测上下文和 Skills 的实际收益 | [Xorq 配对实验](https://xorq.dev/blog/orientation-over-reasoning/) · [Preset Skills 评测](https://preset.io/blog/building-preset-agent-skills/) | 固定条件对照、轨迹规则检查、质量与额外 token 成本 |
| 如何构建真实的数据工作验收集 | [ADE-bench](https://www.getdbt.com/blog/ade-bench-dbt-data-benchmarking) · [Hex DataBench](https://hex.tech/blog/databench-agentic-analytics-benchmark/) | 工程修复与开放分析采用不同验收；后者任务集仍私有 |
| 云平台上的 Agent 怎样继承真实用户权限 | [AWS 身份传播](https://aws.amazon.com/blogs/security/identity-aware-ai-data-agents-with-aws-lake-formation-and-trusted-identity-propagation/) · [Genie MCP](https://docs.databricks.com/aws/en/agents/mcp-tools/genie-mcp) | 身份沿工具链传递、按数据目录授权、记录访问证据 |

日期中的“更新”表示该页或项目在 2026 年的重要变更，不表示首次发布。资料数量按独立条目统计，同一项目的文章、实现与教程可能分别计数。

## 工程实践与公开分享

### 上下文、语义与可信分析

- **2026-01-22 · AWS · [Accelerate context-aware data analysis and ML workflows with Amazon SageMaker Data Agent](https://aws.amazon.com/blogs/big-data/accelerate-context-aware-data-analysis-and-ml-workflows-with-amazon-sagemaker-data-agent/)** — Glue/DataZone 目录、Notebook 状态、分析计划、Serverless 执行和 IAM 治理的端到端示例。
- **2026-01-28 · Hex · [Introducing Context Studio](https://hex.tech/blog/introducing-context-studio/)** — 统一管理数据资产认证、确定性指标模型和业务指南；从真实对话诊断错误，预览上下文修改，再版本化发布。
- **2026-01-29 · OpenAI · [Inside OpenAI’s in-house data agent](https://openai.com/index/inside-our-in-house-data-agent/)** — 六层上下文、按需 RAG、工具循环、可复用 workflow 与持续评测。
- **2026-03-06 · Pinterest Engineering · [Unified Context-Intent Embeddings for Scalable Text-to-SQL](https://medium.com/pinterest-engineering/unified-context-intent-embeddings-for-scalable-text-to-sql-793635e60aac)** — 用历史分析 SQL 的 context-intent embedding、结构/统计模式和治理信号先定位可信资产，再生成 SQL。
- **2026-03-19 · Snowflake · [The Agent Context Layer for Trustworthy Data Agents](https://www.snowflake.com/en/blog/agent-context-layer-trustworthy-data-agents/)** — 以业务定义、规则、时效与权限构建 Agent Context Layer。
- **2026-03-30 · Analytics at Meta · [Inside Meta’s Home Grown AI Analytics Agent](https://medium.com/@AnalyticsAtMeta/inside-metas-home-grown-ai-analytics-agent-4ea6779acfb3)** — 个人历史、域摘要、共享离线记忆与 Cookbook → Recipe → Ingredient 分层知识。
- **2026-04-23 · Hex · [Introducing Context Suggestions](https://hex.tech/blog/introducing-context-suggestions/)** — Review Agent 复盘代码、工具调用和分析输出，将澄清、歧义与缺失定义聚类成问题，并提出上下文变更供团队审核。
- **2026-04-30 · DataHub · [Introducing the DataHub Analytics Agent](https://datahub.com/blog/datahub-analytics-agent/)** — Context Graph 读写，联合 schema、glossary、lineage、owner、quality 与 freshness，并通过 MCP/Agent Context Kit 暴露。
- **2026-06-03 · Anthropic · [How Anthropic enables self-service data analytics with Claude](https://claude.com/resources/articles/how-anthropic-enables-self-service-data-analytics-with-claude)** — Skills 与 dbt/model 同 PR 更新，并用内部 eval 验证变更。
- **2026-06-30 · Snowflake · [Introducing Cortex Sense](https://www.snowflake.com/en/blog/enterprise-ai-agents-grounded-context/)** — 从查询历史、转换和 BI 指标提取上下文，并按权威性、流行度与新鲜度排序。
- **2026-07-10 · Cube · [The Context Layer Needs a Semantic Layer](https://cube.dev/blog/the-context-layer-needs-a-semantic-layer)** — 区分可执行语义、描述性业务知识与历史记忆，说明指标和权限如何在查询编译时落实；属于厂商架构观点。
- **2026-07-27 · LangChain · [How we built LangChain’s agent-first data stack](https://www.langchain.com/blog/agent-data-stack)** — dbt 模型、语义层和 Git 同步指南组成多层 context，并说明组织落地方式。
- **2026-07-29 · MotherDuck · [Context belongs in the warehouse](https://motherduck.com/blog/context-belongs-in-the-warehouse/)** — 将指标定义、关联规则和业务陷阱存为仓内 Markdown Guides，以 SQL 管理与版本化；Agent 经 MCP 按需读取，组织和个人上下文分层分发。
- **2026-08-17 · Snowflake · [Building an Internal Context Layer for AI Agents](https://www.snowflake.com/en/blog/snowflake-internal-context-layer-for-ai-agents/)** — 产品数据科学团队如何用内部语义层回答跨团队产品问题。
- **2026-09-16 · dbt Labs · [dbt_context_engineering: modeling the context your AI agents read](https://docs.getdbt.com/blog/dbt-context-engineering)** — 将工单、通话和合同等非结构化材料建模为 Agent 可检索、可引用的上下文，沿用版本、测试与血缘管理。
- **2026-09-29 · Datus · [The Semantic Layer in the Agent Loop](https://datus.ai/blog/semantic-layer-in-the-agent-loop/)** — 把语义层放进推理循环，作为 grain、fan-out、歧义与指标定义的确定性检查器。
- **2026-10-28 · Datus · [Introducing DOSI: Executable Business Context for AI Agents](https://datus.ai/blog/datus-dosi-executable-business-context/)** — 将经审核的 Ossie 模型编译为 SQL，暴露指标、血缘与稳定错误契约，并检查关联歧义和 fan-out；业务口径与源数据仍需验证。
- **2026-10-29 · Cube · [Building the Data Model Factory](https://cube.dev/blog/data-modeling-is-becoming-system-design)** — 从模式、查询日志与对话发现上下文缺口，生成语义模型变更 PR，由人定义验收并独立审查；是实践方案，不是公开对照评测。
- **2026-11-03 · Snowflake Engineering · [Meaning Before Metrics: How We Built a Governed Business Ontology for AI Agents](https://www.snowflake.com/en/blog/engineering/business-ontology-context/)** — 业务域区分同名概念，定义修改经 steward 批准后才替换生效版本；Ontology 解释含义，Semantic Views 执行计算。**当前 private preview、public preview soon；示例不可直接执行，子域权限不自动继承。**
- **2026-11-04 · OceanBase · [Ontology-Driven Enterprise Data Agents: From Retrieving Numbers to Explaining Why](https://en.oceanbase.com/blog/ontology-driven-enterprise-data-agents)** — DataPilot 以对象、关系、属性与指标定义逐步装配上下文；从场景草稿出发，用真实业务问题和明细验证。**物理关联不等于业务关系，变化贡献不等于因果。**

### 编排、执行与数据工程

- **2026-02-03 · Snowflake · [Take Ideas to Production Faster with an Agentic AI Developer Platform](https://www.snowflake.com/en/blog/agentic-ai-developer-platform/)** — 用 catalog、lineage、RBAC、Skills 与受治理执行覆盖工程、分析和 ML。
- **2026-02-05 · dbt Labs · [Make your AI better at data work with dbt's agent skills](https://docs.getdbt.com/blog/dbt-agent-skills)** — 把建模、测试、语义层和迁移流程封装为按任务加载的 Skills；附接入与端到端工作流示例。
- **2026-03-12 更新 · Snowflake Developers · [Build a Cortex Agent from Scratch with Snowflake](https://www.snowflake.com/en/developers/guides/build-a-cortex-agent-from-scratch-with-snowflake/)** — 从样例数据、语义视图和 Cortex Search 建到双工具 Agent，再用 SQL/Python 测试，复现指标与产品文档的统一问答。
- **2026-03-27 · ClickHouse · [How we’re building a data platform for a new user: agents](https://clickhouse.com/blog/building-a-data-platform-for-agents)** — 以 LibreChat、ClickHouse＋MCP 和 Langfuse 构成交互、数据及观测三层架构，讨论探索型查询、上下文发现和任务级权限。 **文中含路线图，需区分已发布与计划能力。**
- **2026-04-11 · Google Cloud · [Building Event-Driven Data Agents with BigQuery, Pub/Sub, and ADK](https://cloud.google.com/blog/topics/developers-practitioners/building-event-driven-data-agents-with-bigquery-pubsub-and-adk)** — Detection → Routing → Resolution → Observability 的事件驱动闭环，并保留人工升级。
- **2026-04-17 · Databricks · [Introducing Genie Agent Mode](https://www.databricks.com/blog/introducing-genie-agent-mode)** — 从问答模式扩展到多步探索、假设验证和结构化解释。
- **2026-04-21 · Snowflake · [Cortex Code Expands: One Governed Agent for Your Entire Data Stack](https://www.snowflake.com/en/blog/cortex-code-governed-agent-data-stack/)** — Skills、SDK、MCP、ACP、Sandbox 与 Plan Mode 的平台化组合。
- **2026-04-30 · AWS · [Agentic analytics with SageMaker, Athena, and Amazon Quick](https://aws.amazon.com/blogs/machine-learning/unleashing-agentic-ai-analytics-on-amazon-sagemaker-with-amazon-athena-and-amazon-quick/)** — 把结构化查询、非结构化知识库与受治理的自助分析组合起来。
- **2026-05-05 · Preset · [Shipping Preset Chatbot: From AI Prototype to Production](https://preset.io/blog/preset-chatbot-technical-deep-dive/)** — MCP 统一多端能力，LangGraph 持久化对话；详述异步 Agent 接入同步 Web 框架、独立连接池、SSE 桥接和工具错误处理。
- **2026-05-08 · Databricks · [Pushing the Frontier for Data Agents with Genie](https://www.databricks.com/blog/pushing-frontier-data-agents-genie)** — 结构化与非结构化数据的并行发现、自纠错和验证。
- **2026-05-19 · Google Cloud · [Data Agent Kit brings data skills and tools to your IDE or CLI](https://cloud.google.com/blog/products/data-analytics/data-agent-kit-brings-data-skills-and-tools-to-your-ide-or-cli/)** — 预置 Skills + MCP tools，把 BigQuery、AlloyDB、GCS 等带进常用 Agent。
- **2026-06-02 · Cube · [Introducing Cube Agent Skills](https://cube.dev/blog/introducing-cube-agent-skills)** — 把周报、流失分析和模型变更流程存为模型项目中的 Markdown Skills，经分支、评审与部署复用。
- **2026-06-09 · ClickHouse · [ClickHouse Agents: Claude-powered agentic analytics, now in public beta](https://clickhouse.com/blog/clickhouse-agents-beta)** — 将原生查询、MCP、沙箱代码执行、Skills、记忆、子 Agent 与分析产物整合到 Cloud RBAC 下的 LibreChat 托管运行时。 **公开 Beta。**
- **2026-06-15 · Google Cloud · [What’s new in data agents](https://cloud.google.com/blog/products/data-analytics/new-data-agents-across-the-agentic-data-cloud/)** — 分析、数据科学、数据工程和数据库可观测 Agent 的产品矩阵。
- **2026-07-23 · Databricks · [Why a Frontier Data Agent Outperforms General Coding Agents](https://www.databricks.com/blog/why-frontier-data-agent-outperforms-general-coding-agents-quality-and-cost)** — 用真实内部任务讨论专项检索、持久记忆和企业上下文的价值；对比结果属于厂商内部评测。
- **2026-09-03 · Cube · [Building an Agentic Analytics Harness](https://cube.dev/blog/building-an-agentic-analytics-harness)** — 从 Semantic SQL、可恢复工具错误、结果截断提示、持久产物和权限过滤检索拆解分析 Agent 的运行机制。
- **2026-09-08 · Google Cloud · [Agentic analytics with the Data Agent Kit](https://cloud.google.com/blog/products/data-analytics/agentic-analytics-with-the-data-agent-kit)** — BigQuery、Cloud SQL 与 GCS 多源根因分析教程，包含权限确认和执行轨迹。
- **2026-09-10 · OpenAI · [Now everyone can put data to work](https://openai.com/index/put-data-to-work/)** — Data agent 从分析延伸到交互式仪表盘与经批准的后续行动；适合观察产品化边界。
- **2026-09-24 · DevConf.US · [Building In-House Data Agents on RHOAI](https://pretalx.devconf.info/devconf-us-2026/talk/P9W73V/)** — OpenShift AI、Spark、Kubeflow Operator、Context Layer 与 MCP tools 的管道诊断/修复案例。
- **2026-09-30 · Google Cloud · [Data Agent Kit is now GA](https://cloud.google.com/blog/topics/developers-practitioners/data-agent-kit-is-now-ga-bring-google-data-cloud-to-any-coding-agent)** — 免费 MCP tools + Agent Skills 的 GA 发布和兼容 Agent 说明。
- **2026-10-09 更新 · Snowflake Developers · [Getting Started with the Cortex Agent SDK](https://www.snowflake.com/en/developers/guides/getting-started-with-cortex-agent-sdk/)** — 五个递进示例覆盖流式结果、多轮会话、后台运行与代码沙箱，最终组成检查流水线、数据质量并按需诊断事故的运维 Agent。
- **2026-10-14 · dbt Labs · [Inside the dbt Wizard harness: building an agent that thinks in DAGs](https://docs.getdbt.com/blog/wizard-agent-harness)** — 拆解 DAG 上下文、编译反馈、专用验证 Agent、批准范围内构建与 deferral；将数据差异交给人工评审。
- **2026-10-16 · Google Cloud · [Cross-cloud agentic analytics reference architecture](https://docs.cloud.google.com/architecture/agentic-ai-cross-cloud-analytics)** — 面向多云数据湖、仓库和非结构化数据的高层参考架构。
- **2026-10-23 · Keyhole Software · [White Paper – Agentic Harness Architecture in 2026: Components, Vendors, and a Reference Design for Data Engineering](https://keyholesoftware.com/agentic-harness/)** — 将只读发现、计划审批、确定性测试、PR/CI 晋级与目录登记组成数据工程交付门禁。**端到端示例是复合参考场景，不是单个客户实测。**
- **2026-10-23 · KX · [Natural Language to qSQL with the MCP qSQL Suggester](https://kx.com/blog/natural-language-to-qsql-mcp-suggester/)** — 专用模型 + MCP/Skills，结合候选一致性、解析/qlint/执行检查与按需参考结果对比；**一致性不证明语义正确，自托管仍需 q/kdb+ 许可。**
- **2026-10-27 · Hex · [Introducing Hex 4.0](https://hex.tech/blog/introducing-hex-4-0/)** — 显式依赖 DAG、数字血缘、独立步骤并行和受影响依赖局部重跑。**发布时为 private beta；性能示例来自内部应用。**
- **2026-10-29 · MotherDuck · [Introducing Dive Apps: Superpowers for AI Builders](https://motherduck.com/blog/dive-apps-superpowers-for-ai-builders/)** — MCP 构建数据应用，交互触发 serverless Python Flights、Agent harness 与写回；写操作仍需设计授权、审批和回滚。
- **2026-11-03 · Snowflake · [Snowflake CoCo: Agentic Development on Data Without Limits](https://www.snowflake.com/en/blog/snowflake-coco-cloud-agents-automations/)** — 沙箱长任务、Git/PR 交付、Profiles 与自动化；定时、事件或 webhook 任务以创建者身份运行，每次留下审计。**MCP Gateway Tools、Memory 和动态模型路由为 public preview，不能整组统称 GA。**

### 身份、权限与接入治理

- **2026-03-31 · Preset · [Preset MCP: From Open Source to Enterprise](https://preset.io/blog/preset-mcp-open-source-to-enterprise/)** — 通过外围中间件为 MCP 服务加入工作区隔离、逐请求数据库绑定、OAuth、弹性部署及可观测性，同时复用原有权限检查。
- **2026-03-31 · Preset / Apache Superset · [Apache Superset MCP Service: A Technical Deep Dive](https://preset.io/blog/superset-mcp-service-deep-dive/)** — MCP 直接复用 Superset Python 库与 DAO；图表修改默认预览，持久化显式执行；沿用 RBAC/RLS 并限制响应 token。
- **2026-10-06 · AWS Security Blog · [Identity-aware AI data agents with AWS Lake Formation and Trusted Identity Propagation](https://aws.amazon.com/blogs/security/identity-aware-ai-data-agents-with-aws-lake-formation-and-trusted-identity-propagation/)** — 贯穿 AgentCore、MCP Gateway、Lambda 和 Athena 传递真实用户身份，由 Lake Formation 授权并用 CloudTrail 核验。
- **2026-11-03 · Snowflake · [Build Trust in AI Agents with Governed Business Context and AI Security](https://www.snowflake.com/en/blog/ai-agents-governance-ai-security-cost-control/)** — Gateway 集中策略，MCP 工具按最终用户身份在执行前检查权限，配合运行观测与费用治理。**Gateway/Tools 为 public preview，Cortex Sandboxes 为 private preview；预算目标和告警不等于所有任务的强制停止。**

### 评测、质量与可观测性

- **2026-02-17 · Amplitude · [Can agents take on enterprise analytics? A task-based evaluation](https://amplitude.com/blog/ai-analytics-agents-task-based-evaluation)** — 用描述、诊断、预测、处方四类任务与透明度/证据 rubric 取代单一 Text-to-SQL 分数。
- **2026-04-22 · Xorq · [Orientation Over Reasoning](https://xorq.dev/blog/orientation-over-reasoning/)** — 固定模型、执行预算与评分器，在 450 个 DABStep 问题上比较原始文件与 33 个命名语义表达式目录，公开环境、日志及评分流程。 **作者明确提示公开题污染，配对成绩不作排行榜依据。**
- **2026-04-30 · Dot · [From 10% to 90% on Adyen’s DABstep: configuring a data warehouse agent](https://www.getdot.ai/blog/from-10-to-90-percent-on-adyens-dabstep)** — 将业务约定与重复分析路径沉淀为配置，再让 Agent 读取失败、提出修改并重新测量；用版本化实验记录保留成功和回退路径。 **仅覆盖 30 个任务、14 个配置版本；标题中的 90% 不是全量基准得分。**
- **2026-05-22 · Hex · [How we built a lab to evaluate data agents](https://hex.tech/blog/evaluate-data-agents/)** — candidate-vs-baseline、确定性/LLM/混合评分和带脏 schema 的合成公司数据。
- **2026-06-11 · Preset · [Preset Agent Skills: Giving Your AI Agent Real Preset Expertise](https://preset.io/blog/building-preset-agent-skills/)** — 以 31 个真实 BI 操作任务成对比较有无 Skills，重复运行并确定性检查工具选择、执行顺序、审批节点与秘密保护。 **结果限于作者任务集，并增加上下文成本。**
- **2026-08-04 · Hex · [Introducing Evals](https://hex.tech/blog/evals/)** — 版本化 YAML eval suite、Context Preview、定时漂移检测和模型/成本 sweep。
- **2026-08-13 · Hex · [Introducing DataBench](https://hex.tech/blog/databench-agentic-analytics-benchmark/)** — 在混乱的合成企业数据仓库中设置 100 个问答与开放分析任务，覆盖指标歧义、缺失证据和拒绝作答。 **任务集保持私有，适合研究评测方法。**
- **2026-09-01 · ClickHouse · [The Agentic Analytics Benchmark](https://clickhouse.com/blog/agentic-analytics-benchmark-data-agent-mnist)** — 201 个生产问题、29 个模型，以通过率、成本、时延和轮次预算联合评测；公开方法和限制。
- **2026-09-17 更新 · Databricks Documentation · [Test and monitor a Genie Agent](https://docs.databricks.com/aws/en/genie-agents/monitor)** — 串联线上反馈、人工纠错与离线基准；区分 Chat 的 SQL 结果比较和 Agent 的 LLM 评判，适合设计持续维护的验收集。
- **2026-10-14 更新 · dbt Labs · [Introducing ADE-bench: measuring how AI agents perform data work](https://www.getdbt.com/blog/ade-bench-dbt-data-benchmarking)** — 以真实 dbt 项目、DuckDB 数据与 Docker 环境测试模糊修复任务，并联合观察测试通过率、成本和运行时。 **结果属于发布方特定配置。**
- **2026-10-27 · Data–Marc · [Can You Trust Your Fabric Data Agent? Programmatically Testing Accuracy and Determinism](https://data-marc.com/2026/10/27/can-you-trust-your-fabric-data-agent-programmatically-testing-accuracy-and-determinism/)** — 保存参考查询，每次从当前数据计算期望值，再运行 SDK 评测并留存步骤。参考查询的身份、权限与数据快照必须和被测 Agent 对齐。
- **2026-10-27 · ClickHouse · [The Agentic Analytics Benchmark: ranking tables and labeling failures with Jev](https://clickhouse.com/blog/agentic-analytics-benchmark-jev)** — 表排序、类型化失败归因与确定性事实检查；**检索组件表现较好，但跨 20 个模型未出现显著端到端准确率提升**，保留负结果与开发/保留集边界。
- **2026-10-29 · Michael John Peña · [Fabric Data Agent Accuracy Is a Distribution, Not a Number](https://michaeljohnpena.com/blog/2026-10-29-fabric-data-agent-determinism-real-nem-data/)** — 对 24 问题、三种表述做多次新会话评测，比较数值判定、SDK judge 与 pass^k。仅覆盖指定电力数据、Standard runtime 和预览 SDK，不代表所有 Fabric Agent。

### 演讲与视频

- **2026-05-21 · Preset · [Anatomy of our Internal Data Agent](https://preset.io/events/how-we-built-our-agents/)** — 公开 Live Talk，覆盖内部数据专家、工具、语义层和数据团队工作方式。
- **2026-05-26 · Open Data Circle · [Data Agents Need an Agent-facing Data Plane](https://speakerdeck.com/opendatacircle/data-agents-need-an-agent-facing-data-plane)** — freshness、semantics、multimodality、governance、actionability、observability 六维框架与演进图。
- **2026-10-28 · Atlan Context Conference · [The Post-AI Data Stack: A blueprint for analytics agents](https://atlan.com/context-conference/post-ai-data-stack/)** — **36:55 公开视频与逐字稿**；指标、Ontology、Skills 上下文及客户落地讨论，覆盖认证指标优先、标注推断、版本治理与评测回流。准确率陈述属于发布方内部经验。

## 中文与国内实践

### 已公开材料

- **2026-08-17 · 中国互联网协会人工智能工作委员会 × 中国信通院 · [《数据智能体研究报告（2026）》征求意见稿](https://www.isc.org.cn/article/30075177847877632.html)** — 55 页中文分类框架，覆盖定义、与 BI/RPA/NL2SQL/LLM 的差异、参考架构、关键技术、生态、应用和安全合规；注意它是征求意见稿，不是最终版。
- **2026-04-17 / 2026-07-14 · Shopee @ QCon 北京 · [议题页](https://qcon.infoq.cn/2026/beijing/presentation/7006) / [全文实录](https://www.infoq.cn/article/LfO7mzdhxMWTtICFuTNb)** — 渐进披露 Multi-Agent、画像/记忆、语义模型、File-as-Context、Sandbox、Skills 和自动评测；目前未核到官方完整视频。
- **2026-04-16–18 · 网易 @ QCon 北京 · [从 Copilot 到 DataAgent：企业级智能数据开发治理平台的技术演进和实践](https://qcon.infoq.cn/2026/beijing/presentation/7030)** — EasyData 从 Copilot、Agent 到 CLI 化，并连接任务诊断与智能分析。
- **2026-04-16–18 · 美团 @ QCon 北京 · [不止 ChatBI：懂归因、能洞察的美团 Data Agent 落地实践](https://qcon.infoq.cn/2026/beijing/presentation/6946)** — 全流程架构、业务知识图谱、记忆、动态语义层和机评体系。
- **2026-04-25 · 同程旅行 @ DACon 上海 · [DataAgent 在分析和营销场景的智能化建设探索](https://www.bagevent.com/event/9108668/p/569570)** — 从分析规划、归因到营销建议与流程的闭环；页面为大会摘要。
- **2026-07-03 · 腾讯云大数据 · [构建可信、可控、可演进的 Data Agent](https://developer.cloud.tencent.cn/article/2703714)** — 统一语义层、多 Agent、Skills、权限审计和持续学习六要素。
- **2026-08-21–22 · 数新智能 @ AICon 深圳 · [基于 DataCyber 的 Data Agent](https://aicon.infoq.cn/2026/shenzhen/presentation/7205)** — SRW 执行三角与 GPME 治理四件套，连接湖仓、元数据、语义层和 MCP 工具面。
- **2026-09-01 · 腾讯 DataBuddy · [数据语义驱动的企业 Agent Runtime 实践](https://developer.cloud.tencent.cn/article/2735067)** — Runtime、权限、沙箱、HITL、Trace、分层记忆与评测回流三条主线。
- **2026-09-09 · 云器科技 · [从 Tool Calling 到 Data Agent：企业数据智能体的生产化路径](https://www.yunqi.tech/resource/blogs/enterprise-data-agent-production)** — 语义层、长工作流、Sandbox、Trace 与评测闭环；效果数字属于厂商案例口径。
- **2026-09-10 · 腾讯云大数据 · [2026 腾讯云大数据年度精选技术实践指南](https://www.infoq.cn/minibook/W2lxNULd8rJGsXWjEgMX)** — 汇总 DataBuddy、WeData、Agent-Ready 数据平台与 ChatBI → 决策智能体实践。
- **2026-09-19 · 快手技术沙龙 · [Data Agent：数据生产与智能决策新范式](https://www.ithome.com/1/005/819.htm)** — 父子 Agent、Skills、知识/记忆、Trace 与评测准入；当前可得页面是媒体回顾，数字应视为“据快手分享”。
- **2026-10-27 · 云器科技 @ DACon 北京 · [从数据底座到 AI 知识底座，云器在 DACon 带来了什么？｜附演讲材料](https://www.yunqi.tech/resource/blogs/dacon-ai-lakehouse)** — 官方会后复盘，说明抽取、语义对齐、认证和运行反馈的知识生产链，以及 AI ETL、Semantic View、SingSight 的分工。**正文可读；完整 PPT 需扫码小程序，本轮未核验直接下载或录像。**
- **2026-10-29 · 云器科技 · [让 AI Agent 真正理解业务：云器 Semantic View 如何提供统一语义与可信数据上下文](https://www.yunqi.tech/resource/blogs/semantic-view-ai-agent)** — 从内省命令与 `semantic_view()` 先确认指标、粒度、关联再计算；对象授权不等于行列隔离，语义层也不会自动修复源数据质量。
- **2026-11-04 · 衡石科技 · [从问数到分析资产：衡石 Data Agent 的任务拆解、辅助创作与持续优化](https://www.hengshi.com/blog/hengshi-data-agent-tasks-analytics-assets.html)** — HQL 指标、查询、建模和看板创作组成交付链；恢复前分别读取和核对已有产物，减少重复创建。**销售分析是任务设计示例，工具与写入边界依具体版本和入口核验。**

### 会议议程与公开材料核验

<details>
<summary><strong>展开已举办、但具体录像或幻灯片尚未核验的场次</strong></summary>

QCon 上海 **2026-10-22–24** 与 DACon 北京 **10 月 23–24 日**均已举办。上次于 **2026-11-02** 复查时，下列记录仍仅确认官方大纲；本轮沿用该材料核验状态。大会结束或出现 PPT 汇总入口，不等于已核验该场次的可读录像、实录或幻灯片，因此继续标记为 `agenda`：

- [专题总页：Agentic 时代的数据系统重构](https://qcon.infoq.cn/2026/shanghai/track/1976)
- [DAS：当 Data 遇见 Agent——网易云音乐大数据 AI Infra 的共生之路](https://qcon.infoq.cn/2026/shanghai/presentation/7257) — 五层 AI Infra、安全纵深、数据虚拟化与语义知识库。
- [Data Agent - 快手大数据智能化探索之路](https://qcon.infoq.cn/2026/shanghai/presentation/7230) — 父子 Agent、动态上下文管理、知识飞轮与自动评测。
- [如何构建 AI Native 的数据语义层：从 Data Agent 实践到可执行的 Semantic Runtime](https://qcon.infoq.cn/2026/shanghai/presentation/7342) — 语义模型到 SQL 编译、grain/cardinality/fan-out 与 Ontology tools。
- [DIBP-小红书数据 Agent 的语义层建设实践](https://qcon.infoq.cn/2026/shanghai/presentation/7343) — 单 Agent → Harness → Multi-Agent 与 Context Layer。
- [从代码生成到可信交付：美团 AIDE 数据研发 Agent 实践](https://qcon.infoq.cn/2026/shanghai/presentation/7356) — 需求、开发测试、审批上线、高风险护栏与真实会话评测。
- [DACon 北京 2026 议程](https://www.bagevent.com/event/9196611) — 包含 360、高德、京东、理想汽车和 OntoOS 等 Data Agent/本体相关场次；保留议程入口，不把扫码领取材料视为已公开可读取的完整 PPT。

</details>

## 开源实现与公开源码

> “公开源码”不自动等于 OSI 开源。下列无许可证、混合许可证或 EAP 项目已显式标注；使用前请自行核对仓库当前 LICENSE。

### 选型快表

这张表只做入口导航，不是排行榜。完整说明和许可证提示仍以下方项目条目为准。

| 采用目标 | 可先看 | 值得关注 | 采用前检查 |
|---|---|---|---|
| 给现有 Coding Agent 增加数据能力 | Google Data Agent Kit Plugin | Skills 与 MCP tools 的组合 | 支持的数据源、客户端兼容性与权限范围 |
| 用元数据图谱支撑可信分析 | DataHub Analytics Agent | Context Graph 读写与知识反馈 | 元数据完整度、Warehouse 连接和写回边界 |
| 做 dbt / SQL 工程 Agent | Altimate Code | 确定性工具、编译与校验 | 项目兼容性、执行隔离和人工 Review 门禁 |
| 做企业多源分析 | DataFoundry | 统一语义、只读边界与审计回放 | 项目仍处早期，需验证连接器和运维能力 |
| 编排复杂分析计划 | DeepEye | Typed DAG、Validator、Optimizer、Executor | 研究实现与生产治理之间的补齐成本 |
| 建设可演进语义层 | EvoOntology | 版本化 Ontology 与 MCP 暴露 | 本体维护责任、变更审核和回滚机制 |
| Java / Spring 技术栈 | Spring AI Alibaba DataAgent | Graph 编排、SQL/Python 分析、MCP/RAG | 与现有权限、数据源和观测体系的集成 |
| 语义建模驱动问数 | WrenAI | 开放上下文层与语义模型 | 多许可证边界、部署模式和治理需求 |

### 2026 新项目 / 新公开实现

- **GoogleCloudPlatform/[data-agent-kit-plugin](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin)** — 15+ Google Data Cloud 服务的 MCP tools + Agent Skills；面向 Codex、Claude Code 等插件客户端。Apache-2.0。
- **datahub-project/[analytics-agent](https://github.com/datahub-project/analytics-agent)** — DataHub Context Graph/MCP → SQL warehouse → LangGraph/LLM → Vega-Lite，并能把缺失术语和文档反馈给上下文图。Apache-2.0。
- **AltimateAI/[altimate-code](https://github.com/AltimateAI/altimate-code)** — dbt/SQL/数据工程 Agent harness；v0.12.9 增加 model-free tool CLI/MCP、结构化 dbt 血缘和经 Owner 审查的工作区规则，并修复分析角色的写工具拒绝边界。MIT。
- **datagallery-ai/[dataagent](https://github.com/datagallery-ai/dataagent)**（DataFoundry）— 28 类数据源、统一语义、只读边界、凭据隔离、字段脱敏与全链路回放。Apache-2.0；项目自标 early but usable。
- **aliyun/[data-agent-skill](https://github.com/aliyun/data-agent-skill)** — 阿里云 Data Agent 的 CLI 与 MCP 两套 Skills，支持数据库/文件分析、深度报告与会话复用；仓库当前未声明项目级许可证时应按公开源码处理。
- **aws-samples/[sample-data-agent-on-duckdb](https://github.com/aws-samples/sample-data-agent-on-duckdb)** — AgentCore 内进程 DuckDB，直接查询 S3 Parquet、S3 Tables、Glue Catalog 与 DuckLake。MIT-0。
- **microsoft/[fabric-data-agent-workshop](https://github.com/microsoft/fabric-data-agent-workshop)** — 语义模型准备、多源 Agent、LLM-as-Judge 校准与 MLflow 评测的动手 workshop。MIT。
- **HKUSTDial/[DeepEye](https://github.com/HKUSTDial/DeepEye)** — 自然语言计划编译为 typed DAG，再经 Validator → Optimizer → Executor；区分 AgentNode 与确定性 ToolNode，支持并行、Sandbox 和人工 steering。Apache-2.0。
- **openai/[openai-cookbook Data Analyst](https://github.com/openai/openai-cookbook/tree/main/examples/agents_api/apps/data_analyst)** — `search_tables`、`search_context`、`query_warehouse`、`save_memory` 四个聚焦工具；凭据不进模型，数据库连接只读并限制超时/行数。
- **ruc-datalab/[EvoOntology](https://github.com/ruc-datalab/EvoOntology)** — 面向异构表/文件/数据库的自演进 Ontology Layer，提供 MCP、Codex 和 Claude Code 插件。MIT。
- **HKUSTDial/[DataSpace](https://github.com/HKUSTDial/DataSpace)** — 异构工作区 benchmark、数据集、evaluator 和 baseline；KDD Cup 2026 官方 benchmark。MIT。
- **AgenticDataBench/[AgenticDataBench](https://github.com/AgenticDataBench/AgenticDataBench)** — 15 个领域、细粒度技能标签、生成器、testbed 和多 Agent harness。Apache-2.0。
- **HKUSTDial/[kddcup2026-data-agents-starter-kit](https://github.com/HKUSTDial/kddcup2026-data-agents-starter-kit)** — 最小 ReAct baseline 与竞赛输入/输出协议。**无项目级 LICENSE，按公开源码处理。**
- **Automattic/[agentic-analytics](https://github.com/Automattic/agentic-analytics)** — 面向 Parse.ly、GA 与第一方数据的 Coding Agent plugin，使用 DuckDB 本地缓存并生成报告。早期、**无 LICENSE**。

### ♻️ 2026 重要更新 / 持续活跃

- **spring-ai-alibaba/[DataAgent](https://github.com/spring-ai-alibaba/DataAgent)** — Spring AI Alibaba Graph 上的企业数据分析 Agent，覆盖 Text-to-SQL、Python 深度分析、报告、MCP 与 RAG。Apache-2.0。
- **getnao/[nao](https://github.com/getnao/nao)** — context-as-code、评测、自托管 UI 与 MCP；11 月 3 日 v0.3.32–33 加入实验性 codemode、移除旧 Python interpreter，补充语义查询刷新和 GitHub Enterprise Server 接入。**根 Apache-2.0 + Enterprise 文件商业条款，仍属混合许可。**
- **JetBrains/[databao-agent](https://github.com/JetBrains/databao-agent)** — Context engine/语义层驱动的本地 Python Data Agent，连接 SQL、dbt 与 Vega-Lite。**EAP，不建议生产使用。**
- **Canner/[WrenAI](https://github.com/Canner/WrenAI)** — 开放上下文层/语义模型驱动问数；wren 0.17 新增 Ossie/OpenMetadata 互操作，10 月 30 日 0.17.1 修复兼容性。**版本与多许可证均按组件核对。**
- **eosphoros-ai/[DB-GPT](https://github.com/eosphoros-ai/DB-GPT)** — 通用 Agentic AI 数据助手/应用平台；2026-08 发布 v0.8.2。MIT。
- **ucbepic/[DataAgentBench](https://github.com/ucbepic/DataAgentBench)** — 企业异构 DB benchmark、验证器与持续榜单。**根目录无 LICENSE，按公开 benchmark 处理。**

### 更多项目与工程组件

按实现类型区分完整 Agent、工作区、工具服务、语义组件和评测环境。每项的机制、技术文档、2026 更新证据与使用边界见 [项目资料路线](PROJECT_GUIDE.md)。

| 项目 | 类型 | 核心机制 / 用途 | 许可证与状态 |
|---|---|---|---|
| [Datus Agent](https://github.com/Datus-ai/Datus-agent) | 完整 Agent | v0.4.4 接入 OntologyAnalyst 与数据源映射，补充执行适配器及工具隔离。 | [Apache-2.0](https://github.com/Datus-ai/Datus-agent/blob/main/LICENSE)；2026-10-28 release |
| [dbt MCP Server](https://github.com/dbt-labs/dbt-mcp) | 工具服务 | v2.10.1 调整 job/run 的 Owner 目标与共享列举策略；授权宿主需处理相应 listing 策略。 | [Apache-2.0](https://github.com/dbt-labs/dbt-mcp/blob/main/LICENSE)；2026-11-03 release |
| [dbt Agent Skills](https://github.com/dbt-labs/dbt-agent-skills) | 技能包 | 可安装的 dbt 流程知识：先检查真实数据、迭代建模、再测试验证；包含指标建模与技能 A/B 评估材料。 | [Apache-2.0](https://github.com/dbt-labs/dbt-agent-skills/blob/main/LICENSE)；2026 有重要更新 |
| [ADE-bench](https://github.com/dbt-labs/ade-bench) | 评测环境 | 用真实 dbt 项目、数据库、隔离容器与结果测试评测数据工作；可比较模型、MCP、技能包带来的效果与成本。 | [Apache-2.0](https://github.com/dbt-labs/ade-bench/blob/main/LICENSE)；2026 有重要更新 |
| [MCP Toolbox for Databases](https://github.com/googleapis/mcp-toolbox) | 工具服务 | v1.15 扩展数据 Agent 管理与保存查询，并集中认证检查；管理写操作需单独授权。 | [Apache-2.0](https://github.com/googleapis/mcp-toolbox/blob/main/LICENSE)；2026-10-23 release |
| [Boring Semantic Layer (BSL)](https://github.com/boringdata/boring-semantic-layer) | 语义组件 | 基于 Ibis 的轻量语义层，将维度与指标封装为可查询模型；可作为 Agent 的指标工具底座，减少临时重写口径。 | [MIT](https://github.com/boringdata/boring-semantic-layer/blob/main/LICENSE)；2026 有重要更新 |
| [R&D-Agent](https://github.com/microsoft/RD-Agent) | 实验 Agent | 以研究 Agent 提出假设、开发 Agent 编码实验、执行反馈再迭代，覆盖数据科学与建模任务，适合观察实验闭环。 | [MIT](https://github.com/microsoft/RD-Agent/blob/main/LICENSE)；2026 有重要更新 |
| [Data Formulator](https://github.com/microsoft/data-formulator) | 分析工作区 | 把数据连接、加载 Agent、带记忆的 Data Thread、图表细化和报告分享串在可分支的可视工作区，适合交互式分析。 | [MIT](https://github.com/microsoft/data-formulator/blob/main/LICENSE)；2026 有重要更新 |
| [Jupyter AI](https://github.com/jupyterlab/jupyter-ai) | Notebook 工作区 | 在 JupyterLab 内让 Agent 编辑、运行和调试 Notebook；以 ACP/MCP 接入工具，适合保留单元格与执行结果作为分析证据。 | [BSD-3-Clause](https://github.com/jupyterlab/jupyter-ai/blob/main/LICENSE)；2026 有重要更新 |
| [dlt MCP Server](https://github.com/dlt-hub/dlt-mcp) | 工具服务 | 为 Agent 提供 dlt 管道、表结构、增量状态、schema diff 与 SELECT 查询工具，适合数据接入和管道诊断。 | [Apache-2.0](https://github.com/dlt-hub/dlt-mcp/blob/main/LICENSE)；2026 有重要更新 |
| [Vanna 2.0](https://github.com/vanna-ai/vanna) | 已归档框架 | 用户身份贯穿提示、SQL 工具和行级过滤，并流式输出表格图表；2026-03-29 已归档，适合作为架构研究案例。 | [MIT](https://github.com/vanna-ai/vanna/blob/main/LICENSE)；🗄️ 2026-03-29 已归档 |
| [SQLBot](https://github.com/dataease/SQLBot) | ChatBI 应用 / MCP 提供方 | 术语与 SQL 示例辅助问数，支持工作空间和嵌入式接入；v1.10.3 增加动态检索策略等。 | [FIT2CLOUD modified GPLv3](https://github.com/dataease/SQLBot/blob/main/LICENSE)，含附加条件；2026-10-29 release |

## 论文与评测

### Benchmark 选择指南

| 你想验证什么 | 可先看 | 主要信号 | 使用时注意 |
|---|---|---|---|
| 数据模型变更与管道修复 | [ADE-bench](https://github.com/dbt-labs/ade-bench) | dbt 项目、真实数据、隔离容器和测试 | 固定任务/工具/引擎版本，联合记录成本和运行时 |
| 企业异构数据库问答 | DAB | 真实企业任务、端到端分析能力 | 以最新版任务和榜单为准，避免混用早期规模 |
| 跨领域技能覆盖 | AgenticDataBench | 领域与细粒度 Skill 标签 | 适合定位能力缺口，不等于你的生产分布 |
| 多模态工作区分析 | DataSpace | 六种模态、确定性表格评测 | 需同时评估检索、执行和最终产物 |
| 端到端数据工程 | DataClawEval | PySpark、MySQL、HiveSQL、Presto/Trino、FlinkSQL | 关注环境复现、依赖与执行副作用 |
| 生产分析问题的成本质量权衡 | ClickHouse Agentic Analytics Benchmark | 通过率、成本、时延与轮次预算 | 模型和工具配置会显著影响横向比较 |

- **2026-01-29 · [DataCross](https://arxiv.org/abs/2601.21403)** 🧪 — 跨模态异构数据分析 benchmark 与多数据源专家 Agent，覆盖结构化数据、扫描报告和图像。
- **2026-02-04 · [Data Agents: Levels, State of the Art, and Open Problems](https://arxiv.org/abs/2602.04261)** — SIGMOD 2026 tutorial；提出 L0–L5 自治分级。
- **2026-03-21 · [Can AI Agents Answer Your Data Questions?](https://arxiv.org/abs/2603.20576)** — DAB；请优先看最新版 v3（2026-10-07），旧搜索摘要仍可能显示早期数据规模。
- **2026-06-03 · [SIGMOD 2026 Data Agents Tutorial Slides](https://2026.sigmod.org/slides/DataAgents-SIGMOD2026.pdf)** — L0–L5 分级、数据生命周期各类 Agent 与开放问题的完整教程幻灯片。
- **2026-06-07 · [Data Agents Under Attack](https://arxiv.org/abs/2606.08661)** 🧪 — 面向 Data Agent 的威胁分类，覆盖三类攻击目标、七类战术和十四类技术。
- **2026-07-02 · [AgenticDataBench](https://arxiv.org/abs/2607.01647)** 🧪 — 15 个垂直领域、真实 B2B 金融科技用例与 skill-level 评测。
- **2026-07 · [UniDataBench](https://aclanthology.org/2026.acl-long.1556/)** — ACL 2026；结构化、半结构化和非结构化多源数据分析，并提出 ReActInsight。
- **2026-07 · [DataSage](https://aclanthology.org/2026.findings-acl.309/)** — ACL Findings 2026；外部知识检索、多角色辩论和多路径推理的洞察发现框架。
- **2026-07-30 · [DataClawEval](https://arxiv.org/abs/2607.28033) / [code](https://github.com/Dicemy/DataClawEval)** 🧪 — 100 个工业级端到端数据工程任务，覆盖 PySpark、MySQL、HiveSQL、Presto/Trino 与 FlinkSQL。
- **2026-08-04 · [DataSpace](https://arxiv.org/abs/2608.03451)** — 410 个任务、7,439 个 artifacts、六种模态和确定性 evaluator。
- **2026-08 · [KDD Cup 2026: Data Agents for Complex Data Analysis](https://dataagent.top/)** — 官方赛道、数据、规则与赛后材料入口；与 DataSpace/KDD Starter Kit 配合使用。
- **2026-08-28 · [Evaluating Enterprise Analytics Agents](https://arxiv.org/abs/2609.09182)** — 端到端、trace-backed 的企业分析 Agent 评测方法，覆盖语义、执行、拒答与升级。
- **2026-09-21 · [Data Agents: Agentic Data Systems](https://arxiv.org/abs/2609.24137)** — TKDE accepted；语义数据组织、语义算子、Agentic pipeline、反馈、记忆与主动适应六组件。
- **2026-09-21 · [Learned Enterprise Data Comprehension](https://arxiv.org/abs/2609.25286)** 🧪 — 通过学习式压缩与路由处理 schema、关系、政策和业务角色；强结果尚待独立复现。
- **2026-10-23 · [AdaPRA: Process Reward Agents with Adaptive Rubrics for Data Science](https://arxiv.org/abs/2610.33245)** — 持久工作区与跨尝试记忆，过程奖励 Agent 实际检查轨迹和代码，再按任务调整 rubric。收益属于论文给定模型、预算和 DSPredict 任务，不等于通用 BI 验收结果。
- **2026-10-25 · [CaliMem: Search-Efficient Data Agent via Calibrated Memory](https://arxiv.org/abs/2610.34500)** — 数据整理策略执行前先预测结果，再以实测偏差校准记忆中的结论与适用条件，减少一次失败后过度概括；面向训练数据整理，不是企业问数框架。
- **2026-10-27 · [M4Bench: Evaluating Procedural Specification for Clinical EHR Derivation Agents](https://arxiv.org/abs/2610.37459)** — 用 28 个 EHR 派生任务检验时间窗、缺失规则与输出粒度。**Skills 提升部分一致性奖励，不等于任务完全通过；严格全通过仍低，源数据有独立访问条件。**
- **2026-11-03 · [VidUEU-Agent: A Data-Curation Agent for Multimodal Understanding, Editing, and Unified Tasks](https://arxiv.org/abs/2611.04418)** 🧪 — 视频过滤、信号挖掘、元数据构建与指令样本路由，再以训练反馈调整数据分布。**面向多模态训练数据整理，不是 BI 框架；规模与收益为论文自述，本轮仅核验论文。**

## 持续更新的产品与架构文档

- **Microsoft Fabric · [Data agent concepts](https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent)** — Orchestrator、OneLake 数据源、语义模型、Purview 策略与多 Agent 集成；2026-05 更新。
- **Microsoft Fabric · [Evaluate your data agent](https://learn.microsoft.com/fabric/data-science/evaluate-data-agent)** — SDK 化测试与质量评估；2026-09 更新。
- **Alibaba Cloud DMS · [Data Agent OpenAPI integration guide](https://www.alibabacloud.com/help/en/dms/data-agent-openapi-integration-guide)** — 核心抽象、API 调用流程和两类集成场景；2026-06 更新。
- **Alibaba Cloud DataWorks · [Data Agent 简介（中文）](https://help.aliyun.com/zh/dataworks/user-guide/new-data-agent)** — **2026-10-29 更新**，展开八层架构、Context Graph、Agent 管控、自动化、工作流与 IM；11 月 5 日复查，[英文版](https://www.alibabacloud.com/help/en/dataworks/user-guide/new-data-agent)现也标注 10 月 29 日并包含八层架构。本轮校正语言版本状态，不另算新资料。
- **Alibaba Cloud SLS · [DataAgent core concepts](https://www.alibabacloud.com/help/en/sls/sls-dataagent-core-concept)** — 三层 Context Model 结构；2026-09 更新。
- **Alibaba Cloud MaxCompute · [Multi-source, multi-engine DataAgent](https://www.alibabacloud.com/help/en/maxcompute/user-guide/multi-source-multi-engine-dataagent)** — 企业数据、对象文件和本地知识的联合分析；2026-10 更新。
- **Alibaba Cloud AnalyticDB · [Data Agent architecture](https://www.alibabacloud.com/help/en/analyticdb/analyticdb-for-postgresql/data-agent/)** — 四层整体架构与使用边界；2026-09 更新。

### 国际平台接入与实现细节

- **2026-08-28 更新 · Microsoft Learn · [Best practices for improving data agent query generation](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-configuration-best-practices)** — 将上下文落实到 Schema 选择、对象描述、跨表规则和查询示例，尤其适合借鉴表粒度、先聚合后连接、财年及单位说明。
- **2026-09-01 更新 · Microsoft Learn · [Add Fabric data agents to a Foundry agent with Fabric IQ (preview)](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-foundry-fabric-iq)** — 经 OneLake Catalog 发现多个领域数据 Agent，再由 Foundry 统一调用；包含跨 Agent 问题测试和长任务配置。
- **2026-09-04 更新 · Microsoft Learn · [Data agent as Model Context Protocol server](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-mcp-server)** — 把已发布数据 Agent 暴露为单个 MCP 工具，附 Python 和编辑器接入；重点关注工具描述与 Bearer token 认证。
- **2026-10-13 更新 · Microsoft Learn · [Fabric data agent runtime](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-runtime)** — 通过标准与预览运行时理解编排、路由和查询生成的发布边界，可借鉴升级验证、回归评测和生产变更流程。
- **2026-10-13 更新 · Google Cloud · [Data Engineering Agent API: Build data pipelines with an agent](https://docs.cloud.google.com/gemini/data-agents/data-engineering-agent/api-overview)** — 给出基于 A2A 的 Agent Card、流式与同步消息接口，可用于将数据工程 Agent 接入自有应用并处理权限和完成状态。
- **2026-10-16 更新 · Databricks Documentation · [Genie One MCP server](https://docs.databricks.com/aws/en/agents/mcp-tools/genie-mcp)** — 经 Unity Gateway 将 Genie 暴露为对话分析工具，按 Unity Catalog 权限访问数据并返回来源链接，适合研究具备业务语义的工具接口。
- **2026-10-20 更新 · Google Cloud · [Use the Colab Enterprise Data Science Agent with BigQuery](https://docs.cloud.google.com/bigquery/docs/colab-data-science-agent)** — 演示从 BigQuery 或 CSV 进入 Notebook 分析，覆盖探索、缺失值、预测与可视化，并可比较 SQL、DataFrames 和 PySpark 路径。
- **2026-10-20 更新 · Google Cloud · [Use the Data Engineering Agent to build and modify data pipelines](https://docs.cloud.google.com/bigquery/docs/data-engineering-agent-pipelines)** — 用自然语言生成和审阅 Dataform SQLX 流水线，包含预览与提示示例；明确区分生成代码、应用变更和执行流水线。
- **2026-10-23 更新 · Atlan AI Labs · [The FDE Playbook for Analytics Agents](https://analytics-playbook.atlan.com/)** — V4 实施手册，从封存黄金集到指标生成、按题检索、轨迹改进和发布门禁，附模板及故障排查；内部仓库评测与复合案例不能外推为独立生产证明。
- **2026-10-30 发布 · Hex · [Governed mode](https://learn.hex.tech/docs/agent-management/governed-mode)** — 按资产类型和状态引导 Agent 来源选择。**官方明确不是硬安全边界，不替代数仓或数据连接权限**；[独立发布记录](https://learn.hex.tech/changelog/2026-10-30)提供日期证据。

## 贡献与勘误

发现值得加入的原始资料，或已有条目的日期、链接、许可证、状态有误？可以[推荐资料或提交勘误](https://github.com/Pyramiding/awesome-data-agents/issues/new/choose)，中文和英文都欢迎；提交 Issue 不需要先编辑 JSON。

直接提交 PR 时，请同步涉及的 README 与机器索引字段。请提供原始 URL、可核验日期、资料类型、核心技术点，以及是否为产品方自述/议程/转载。完整收录标准与检查步骤见 [CONTRIBUTING.md](CONTRIBUTING.md)。

本仓提供资料索引、编辑归纳与工程评审模板，不代表对任何产品、论文结果或许可证状态的背书。链接内容与许可证可能变化，采用前请再次核验。

## 许可 / License

本仓库的原创文字、注释、资料的选择与编排，以及原创图示，采用 [Creative Commons Attribution 4.0 International（CC BY 4.0）](LICENSE) 许可，且仅限于贡献者有权授予的著作权及类似权利。允许转载、改编和商用；分享时须适当署名、附许可链接并说明是否修改。可署名为「Pyramiding 与贡献者，Awesome Data Agents」，并链接到[本仓库](https://github.com/Pyramiding/awesome-data-agents)。

外链文章、论文、代码、数据集和其他第三方材料仍适用各自的权利与许可；收录或引用不意味着本仓库授予其使用权。商标权不在本许可范围内。不受著作权或类似权利保护的材料，以及法律允许的例外使用，不受本许可新增限制。

Original text, annotations, selection and arrangement of resources, and original diagrams in this repository are licensed under [CC BY 4.0](LICENSE), only to the extent the contributors hold the relevant copyright and similar rights. You may share and adapt this material, including commercially, with appropriate attribution, a license link, and an indication of changes. Suggested attribution: “Pyramiding and contributors, Awesome Data Agents,” with a link to [this repository](https://github.com/Pyramiding/awesome-data-agents).

Linked articles, papers, code, datasets, and other third-party materials remain subject to their respective rights and licenses. Inclusion or citation does not grant rights to those materials. Trademark rights are not licensed. Material not protected by copyright or similar rights, and uses permitted by applicable exceptions or limitations, remain unaffected. See the [license summary](https://creativecommons.org/licenses/by/4.0/) and [full legal text](LICENSE).
