# Awesome Data Agents · 2026

> 2026 年 Data Agent 技术方案、生产实践、开源实现、论文、评测与公开分享的来源核验清单。

[English summary](#english-summary) · [技术路线图](#技术路线图) · [必读十篇](#2026-必读十篇) · [工程实践](#工程实践与公开分享) · [中文分享](#中文与国内实践) · [开源实现](#开源实现与公开源码) · [论文与评测](#论文与评测) · [持续更新文档](#持续更新的产品与架构文档) · [贡献](CONTRIBUTING.md)

**资料截止：2026-10-22（Asia/Shanghai）。** 本仓库关注 2026 年首次发布、正式发表或发生重要版本更新的 Data Agent 资料。每条尽量链接作者、项目或会议的原始页面，并区分“已发布”“持续更新文档”和“仅公开议程”。

> [!NOTE]
> 这是一个聚焦 **2026 工程实践与公开实现** 的独立精选，不是 [HKUSTDial/awesome-data-agents](https://github.com/HKUSTDial/awesome-data-agents) 的镜像或官方分支。后者更偏学术论文 taxonomy，值得配合阅读。

## English summary

A source-checked, 2026-focused index of Data Agent architectures, production write-ups, public implementations, benchmarks, papers, and talks. Chinese annotations are used to keep the technical takeaways compact; original English titles and first-party links are preserved.

## 收录口径

这里的 **Data Agent** 指能在受治理的数据环境中自主完成部分或全部数据发现、语义理解、查询/代码生成、执行、验证、分析、可视化、报告或后续行动的智能体系统。它包括面向分析、数据科学、数据工程和数据治理的 Agent，不等同于只有一次 Text-to-SQL 调用的聊天框。

- 优先作者、项目、厂商、论文或大会官方页面；转载仅在原始材料不可得且信息有独特价值时收录。
- 必须能核验到 2026 年日期；旧项目只有在 2026 年存在重要版本或公开材料时才进入“持续更新”。
- 营销页若没有架构、实现、评测或可复用经验，不收录。
- 内部效果数字均视为发布方自述，不当作跨系统可比结论。
- `🧪` 表示研究或早期项目；`♻️` 表示旧项目在 2026 年有重要更新；`📅` 表示截至截止日仅有议程/大纲，不能视作已有回放。

详细方法见 [METHODOLOGY.md](METHODOLOGY.md)，机器可读元数据见 [resources.json](resources.json)。

## 技术路线图

| 层次 | 2026 年的共同做法 | 代表资料 |
|---|---|---|
| 业务语义与上下文 | 从“塞 schema”转向分层检索、语义层、Ontology、Skills、代码与查询历史联合 grounding | OpenAI、Anthropic、Snowflake、EvoOntology |
| 规划与编排 | 从一次 SQL 生成转向多步计划、可中断循环、并行假设、单/多 Agent 动态组合 | Databricks Genie、Shopee、Google Data Agent Kit |
| 工具与执行 | MCP/插件连接数据栈；SQL、Python、Spark、Notebook 在隔离环境内执行 | Google、AWS、Altimate、Spring AI Alibaba |
| 验证与证据 | SQL 可运行不等于分析正确；结果集、语义、轨迹与引用需要分别验证 | DAB、DataSpace、Hex、ClickHouse |
| 治理与安全 | 权限继承、只读边界、凭据隔离、字段脱敏、审批和审计成为默认能力 | Microsoft Fabric、DataFoundry、AWS、Snowflake |
| 评测与迭代 | 从离线 QA 分数走向 trace-backed eval、回归集、线上 canary、反馈/记忆闭环 | OpenAI Evals、Hex Evals、AgenticDataBench |

一个可落地的最小闭环通常是：

```text
问题 → 意图/澄清 → 上下文与语义检索 → 计划 → 受控执行
     → 结果/语义验证 → 证据化回答 → 评测、反馈与记忆
```

## 2026 必读十篇

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

## 工程实践与公开分享

### Context、语义层与可信分析

- **2026-01-22 · AWS · [Accelerate context-aware data analysis and ML workflows with Amazon SageMaker Data Agent](https://aws.amazon.com/blogs/big-data/accelerate-context-aware-data-analysis-and-ml-workflows-with-amazon-sagemaker-data-agent/)** — Glue/DataZone 目录、Notebook 状态、分析计划、Serverless 执行和 IAM 治理的端到端示例。
- **2026-01-29 · OpenAI · [Inside OpenAI’s in-house data agent](https://openai.com/index/inside-our-in-house-data-agent/)** — 六层上下文、按需 RAG、工具循环、可复用 workflow 与持续评测。
- **2026-03-06 · Pinterest Engineering · [Unified Context-Intent Embeddings for Scalable Text-to-SQL](https://medium.com/pinterest-engineering/unified-context-intent-embeddings-for-scalable-text-to-sql-793635e60aac)** — 用历史分析 SQL 的 context-intent embedding、结构/统计模式和治理信号先定位可信资产，再生成 SQL。
- **2026-03-19 · Snowflake · [The Agent Context Layer for Trustworthy Data Agents](https://www.snowflake.com/en/blog/agent-context-layer-trustworthy-data-agents/)** — 以业务定义、规则、时效与权限构建 Agent Context Layer。
- **2026-03-30 · Analytics at Meta · [Inside Meta’s Home Grown AI Analytics Agent](https://medium.com/@AnalyticsAtMeta/inside-metas-home-grown-ai-analytics-agent-4ea6779acfb3)** — 个人历史、域摘要、共享离线记忆与 Cookbook → Recipe → Ingredient 分层知识。
- **2026-04-30 · DataHub · [Introducing the DataHub Analytics Agent](https://datahub.com/blog/datahub-analytics-agent/)** — Context Graph 读写，联合 schema、glossary、lineage、owner、quality 与 freshness，并通过 MCP/Agent Context Kit 暴露。
- **2026-06-03 · Anthropic · [How Anthropic enables self-service data analytics with Claude](https://claude.com/resources/articles/how-anthropic-enables-self-service-data-analytics-with-claude)** — Skills 与 dbt/model 同 PR 更新，并用内部 eval 验证变更。
- **2026-06-30 · Snowflake · [Introducing Cortex Sense](https://www.snowflake.com/en/blog/enterprise-ai-agents-grounded-context/)** — 从查询历史、转换和 BI 指标提取上下文，并按权威性、流行度与新鲜度排序。
- **2026-07-27 · LangChain · [How we built LangChain’s agent-first data stack](https://www.langchain.com/blog/agent-data-stack)** — dbt 模型、语义层和 Git 同步指南组成多层 context，并说明组织落地方式。
- **2026-08-17 · Snowflake · [Building an Internal Context Layer for AI Agents](https://www.snowflake.com/en/blog/snowflake-internal-context-layer-for-ai-agents/)** — 产品数据科学团队如何用内部语义层回答跨团队产品问题。
- **2026-09-29 · Datus · [The Semantic Layer in the Agent Loop](https://datus.ai/blog/semantic-layer-in-the-agent-loop/)** — 把语义层放进推理循环，作为 grain、fan-out、歧义与指标定义的确定性检查器。

### Agent 编排、数据工程与执行

- **2026-02-03 · Snowflake · [Take Ideas to Production Faster with an Agentic AI Developer Platform](https://www.snowflake.com/en/blog/agentic-ai-developer-platform/)** — 用 catalog、lineage、RBAC、Skills 与受治理执行覆盖工程、分析和 ML。
- **2026-04-11 · Google Cloud · [Building Event-Driven Data Agents with BigQuery, Pub/Sub, and ADK](https://cloud.google.com/blog/topics/developers-practitioners/building-event-driven-data-agents-with-bigquery-pubsub-and-adk)** — Detection → Routing → Resolution → Observability 的事件驱动闭环，并保留人工升级。
- **2026-04-17 · Databricks · [Introducing Genie Agent Mode](https://www.databricks.com/blog/introducing-genie-agent-mode)** — 从问答模式扩展到多步探索、假设验证和结构化解释。
- **2026-04-21 · Snowflake · [Cortex Code Expands: One Governed Agent for Your Entire Data Stack](https://www.snowflake.com/en/blog/cortex-code-governed-agent-data-stack/)** — Skills、SDK、MCP、ACP、Sandbox 与 Plan Mode 的平台化组合。
- **2026-04-30 · AWS · [Agentic analytics with SageMaker, Athena, and Amazon Quick](https://aws.amazon.com/blogs/machine-learning/unleashing-agentic-ai-analytics-on-amazon-sagemaker-with-amazon-athena-and-amazon-quick/)** — 把结构化查询、非结构化知识库与受治理的自助分析组合起来。
- **2026-05-08 · Databricks · [Pushing the Frontier for Data Agents with Genie](https://www.databricks.com/blog/pushing-frontier-data-agents-genie)** — 结构化与非结构化数据的并行发现、自纠错和验证。
- **2026-05-19 · Google Cloud · [Data Agent Kit brings data skills and tools to your IDE or CLI](https://cloud.google.com/blog/products/data-analytics/data-agent-kit-brings-data-skills-and-tools-to-your-ide-or-cli/)** — 预置 Skills + MCP tools，把 BigQuery、AlloyDB、GCS 等带进常用 Agent。
- **2026-06-15 · Google Cloud · [What’s new in data agents](https://cloud.google.com/blog/products/data-analytics/new-data-agents-across-the-agentic-data-cloud/)** — 分析、数据科学、数据工程和数据库可观测 Agent 的产品矩阵。
- **2026-07-23 · Databricks · [Why a Frontier Data Agent Outperforms General Coding Agents](https://www.databricks.com/blog/why-frontier-data-agent-outperforms-general-coding-agents-quality-and-cost)** — 用真实内部任务讨论专项检索、持久记忆和企业上下文的价值；对比结果属于厂商内部评测。
- **2026-09-08 · Google Cloud · [Agentic analytics with the Data Agent Kit](https://cloud.google.com/blog/products/data-analytics/agentic-analytics-with-the-data-agent-kit)** — BigQuery、Cloud SQL 与 GCS 多源根因分析教程，包含权限确认和执行轨迹。
- **2026-09-10 · OpenAI · [Now everyone can put data to work](https://openai.com/index/put-data-to-work/)** — Data agent 从分析延伸到交互式仪表盘与经批准的后续行动；适合观察产品化边界。
- **2026-09-24 · DevConf.US · [Building In-House Data Agents on RHOAI](https://pretalx.devconf.info/devconf-us-2026/talk/P9W73V/)** — OpenShift AI、Spark、Kubeflow Operator、Context Layer 与 MCP tools 的管道诊断/修复案例。
- **2026-09-30 · Google Cloud · [Data Agent Kit is now GA](https://cloud.google.com/blog/topics/developers-practitioners/data-agent-kit-is-now-ga-bring-google-data-cloud-to-any-coding-agent)** — 免费 MCP tools + Agent Skills 的 GA 发布和兼容 Agent 说明。
- **2026-10-16 · Google Cloud · [Cross-cloud agentic analytics reference architecture](https://docs.cloud.google.com/architecture/agentic-ai-cross-cloud-analytics)** — 面向多云数据湖、仓库和非结构化数据的高层参考架构。

### Evaluation、质量与可观测

- **2026-02-17 · Amplitude · [Can agents take on enterprise analytics? A task-based evaluation](https://amplitude.com/blog/ai-analytics-agents-task-based-evaluation)** — 用描述、诊断、预测、处方四类任务与透明度/证据 rubric 取代单一 Text-to-SQL 分数。
- **2026-05-22 · Hex · [How we built a lab to evaluate data agents](https://hex.tech/blog/evaluate-data-agents/)** — candidate-vs-baseline、确定性/LLM/混合评分和带脏 schema 的合成公司数据。
- **2026-08-04 · Hex · [Introducing Evals](https://hex.tech/blog/evals/)** — 版本化 YAML eval suite、Context Preview、定时漂移检测和模型/成本 sweep。
- **2026-09-01 · ClickHouse · [The Agentic Analytics Benchmark](https://clickhouse.com/blog/agentic-analytics-benchmark-data-agent-mnist)** — 201 个生产问题、29 个模型，以通过率、成本、时延和轮次预算联合评测；公开方法和限制。

### Slides 与视频

- **2026-05-21 · Preset · [Anatomy of our Internal Data Agent](https://preset.io/events/how-we-built-our-agents/)** — 公开 Live Talk，覆盖内部数据专家、工具、语义层和数据团队工作方式。
- **2026-05-26 · Open Data Circle · [Data Agents Need an Agent-facing Data Plane](https://speakerdeck.com/opendatacircle/data-agents-need-an-agent-facing-data-plane)** — freshness、semantics、multimodality、governance、actionability、observability 六维框架与演进图。

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

### 📅 截止日之后：仅公开议程

QCon 上海大会时间为 **2026-10-22–24**，但以下 Data Agent 场次均排在 **10 月 23 日**。因此在本清单截止日（10 月 22 日）它们尚未发生，链接只是官方议题大纲，不能写成已有演讲成果、录像或 PPT：

- [专题总页：Agentic 时代的数据系统重构](https://qcon.infoq.cn/2026/shanghai/track/1976)
- [网易云音乐 DAS：AI 原生一站式数据开发治理平台](https://qcon.infoq.cn/2026/shanghai/presentation/7257) — 五层 AI Infra、安全纵深、数据虚拟化与语义知识库。
- [快手：Data Agent 数据生产与智能决策新范式](https://qcon.infoq.cn/2026/shanghai/presentation/7230) — 父子 Agent、动态上下文管理、知识飞轮与自动评测。
- [Datus：Semantic Runtime](https://qcon.infoq.cn/2026/shanghai/presentation/7342) — 语义模型到 SQL 编译、grain/cardinality/fan-out 与 Ontology tools。
- [小红书 DIBP](https://qcon.infoq.cn/2026/shanghai/presentation/7343) — 单 Agent → Harness → Multi-Agent 与 Context Layer。
- [美团 AIDE 数据研发 Agent](https://qcon.infoq.cn/2026/shanghai/presentation/7356) — 需求、开发测试、审批上线、高风险护栏与真实会话评测。
- [DACon 北京 2026 议程](https://www.bagevent.com/event/9196611) — 10 月 23–24 日包含 360、高德、京东、理想汽车和 OntoOS 等 Data Agent/本体相关场次；截至截止日同样属于 upcoming agenda。

## 开源实现与公开源码

> “公开源码”不自动等于 OSI 开源。下列无许可证、混合许可证或 EAP 项目已显式标注；使用前请自行核对仓库当前 LICENSE。

### 2026 新项目 / 新公开实现

- **GoogleCloudPlatform/[data-agent-kit-plugin](https://github.com/GoogleCloudPlatform/data-agent-kit-plugin)** — 15+ Google Data Cloud 服务的 MCP tools + Agent Skills；面向 Codex、Claude Code 等插件客户端。Apache-2.0。
- **datahub-project/[analytics-agent](https://github.com/datahub-project/analytics-agent)** — DataHub Context Graph/MCP → SQL warehouse → LangGraph/LLM → Vega-Lite，并能把缺失术语和文档反馈给上下文图。Apache-2.0。
- **AltimateAI/[altimate-code](https://github.com/AltimateAI/altimate-code)** — dbt/SQL/数据工程 Agent harness，强调大量确定性工具和编译引擎校验。MIT。
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
- **getnao/[nao](https://github.com/getnao/nao)** — context-as-code、版本化评测、自托管 UI 与 MCP；2026-02 公开发布。**Open-core / mixed license**。
- **JetBrains/[databao-agent](https://github.com/JetBrains/databao-agent)** — Context engine/语义层驱动的本地 Python Data Agent，连接 SQL、dbt 与 Vega-Lite。**EAP，不建议生产使用。**
- **Canner/[WrenAI](https://github.com/Canner/WrenAI)** — 开放上下文层/语义模型驱动的 governed text-to-SQL 和图表；2026-10 有重要版本。**多许可证，按子目录核对。**
- **eosphoros-ai/[DB-GPT](https://github.com/eosphoros-ai/DB-GPT)** — 通用 Agentic AI 数据助手/应用平台；2026-08 发布 v0.8.2。MIT。
- **ucbepic/[DataAgentBench](https://github.com/ucbepic/DataAgentBench)** — 企业异构 DB benchmark、验证器与持续榜单。**根目录无 LICENSE，按公开 benchmark 处理。**

### 相关清单

- [HKUSTDial/awesome-data-agents](https://github.com/HKUSTDial/awesome-data-agents) — 配套学术综述的论文 taxonomy；与本仓定位互补。
- [SJTU-DMTai/Awesome-Data-Agent-Papers](https://github.com/SJTU-DMTai/Awesome-Data-Agent-Papers) — 自动维护的 Data Agent 论文清单。

## 论文与评测

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

## 持续更新的产品与架构文档

- **Microsoft Fabric · [Data agent concepts](https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent)** — Orchestrator、OneLake 数据源、语义模型、Purview 策略与多 Agent 集成；2026-05 更新。
- **Microsoft Fabric · [Evaluate your data agent](https://learn.microsoft.com/fabric/data-science/evaluate-data-agent)** — SDK 化测试与质量评估；2026-09 更新。
- **Alibaba Cloud DMS · [Data Agent OpenAPI integration guide](https://www.alibabacloud.com/help/en/dms/data-agent-openapi-integration-guide)** — 核心抽象、API 调用流程和两类集成场景；2026-06 更新。
- **Alibaba Cloud DataWorks · [New Data Agent](https://www.alibabacloud.com/help/en/dataworks/user-guide/new-data-agent)** — 基于 Qwen Code 的数据开发/治理 Agent 与 DataWorks Skills；2026-10 更新。
- **Alibaba Cloud SLS · [DataAgent core concepts](https://www.alibabacloud.com/help/en/sls/sls-dataagent-core-concept)** — 三层 Context Model 结构；2026-09 更新。
- **Alibaba Cloud MaxCompute · [Multi-source, multi-engine DataAgent](https://www.alibabacloud.com/help/en/maxcompute/user-guide/multi-source-multi-engine-dataagent)** — 企业数据、对象文件和本地知识的联合分析；2026-10 更新。
- **Alibaba Cloud AnalyticDB · [Data Agent architecture](https://www.alibabacloud.com/help/en/analyticdb/analyticdb-for-postgresql/data-agent/)** — 四层整体架构与使用边界；2026-09 更新。

## 如何阅读

- **要做企业问数/ChatBI**：先读 OpenAI、Anthropic、Snowflake Context Layer，再看 DAB 与 Shopee。
- **要做多源深度分析**：读 Google Data Agent Kit、Databricks Genie、DataSpace。
- **要做数据工程 Agent**：看 Altimate Code、Snowflake Cortex Code、DataWorks 与 RHOAI 分享。
- **要建立质量体系**：从 OpenAI Evals、Hex、ClickHouse、AgenticDataBench 和 Microsoft workshop 开始。
- **要选语义/上下文路线**：对照 DataHub、WrenAI、EvoOntology、Datus 和 Snowflake Cortex Sense。

## 贡献与勘误

欢迎提交 Issue 或 PR。请提供原始 URL、可核验日期、资料类型、核心技术点，以及是否为产品方自述/议程/转载。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

本仓只做资料索引与摘要，不代表对任何产品、论文结果或许可证状态的背书。链接内容与许可证可能变化，采用前请再次核验。
