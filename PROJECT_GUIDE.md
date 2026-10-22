# Data Agent 项目资料路线

[返回总览](README.md) · [机器索引](resources.json) · [设计评审模板](DESIGN_REVIEW.md)

从要完成的任务选择实现入口，再结合官方技术说明和更新证据阅读。下列类型与阅读路线为本仓编辑归纳；项目能力、许可证和维护状态以各自原始页面为准。

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

## 实现与组件

### Datus Agent · 完整 Agent

[实现](https://github.com/Datus-ai/Datus-agent) · [技术资料](https://docs.datus.ai/0.4/semantic/dosi_engine/) · [2026 更新证据](https://github.com/Datus-ai/Datus-agent/releases/tag/v0.4.3) · [许可证 Apache-2.0](https://github.com/Datus-ai/Datus-agent/blob/main/LICENSE)

- **机制：** 按业务域组织 schema、参考 SQL、指标和业务知识，检索后调用数据库/语义工具；修正反馈回流上下文；提供 CLI、Web、API 和 MCP。
- **适合：** 研究数据工程 Agent 的上下文资产化、领域子 Agent 和指标优先查询。
- **使用前了解：** 部署时需按所用数据库安装适配器；v0.4.3 移除了旧 gen_metrics/gen_semantic_model 工作流，阅读旧教程时需核对版本。

### dbt MCP Server · 工具服务

[实现](https://github.com/dbt-labs/dbt-mcp) · [技术资料](https://docs.getdbt.com/docs/dbt-ai/about-mcp) · [2026 更新证据](https://github.com/dbt-labs/dbt-mcp/releases/tag/v2.8.0) · [许可证 Apache-2.0](https://github.com/dbt-labs/dbt-mcp/blob/main/LICENSE)

- **机制：** 通过 MCP 提供本地 dbt CLI、manifest 查询、Semantic Layer、Discovery、Admin API 与 SQL 工具，让通用 Agent 复用 dbt 上下文。
- **适合：** 已采用 dbt 的团队构建分析工程助手、指标问答与作业诊断工具。
- **使用前了解：** 它是工具服务；本地 CLI 与平台 API 的依赖不同。Semantic Layer、Discovery 和平台 SQL 等能力需要对应 dbt Platform 配置与权限。

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

[实现](https://github.com/googleapis/mcp-toolbox) · [技术资料](https://mcp-toolbox.dev/documentation/introduction/) · [2026 更新证据](https://github.com/googleapis/mcp-toolbox/releases/tag/v1.14.0) · [许可证 Apache-2.0](https://github.com/googleapis/mcp-toolbox/blob/main/LICENSE)

- **机制：** 将数据源连接和工具声明集中在配置中，向 MCP 客户端或 Agent SDK 暴露预置查询及定制工具，并提供认证、连接池和可观测性。
- **适合：** 搭建统一数据库工具服务，或将受控查询封装成可复用工具供多个数据 Agent 调用。
- **使用前了解：** 它是数据库接入与执行基础设施；仍需应用层提供业务语义、规划、结果验证和权限配置。

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

[实现](https://github.com/microsoft/data-formulator) · [技术资料](https://github.com/microsoft/data-formulator/blob/main/DEVELOPMENT.md) · [2026 更新证据](https://github.com/microsoft/data-formulator/releases/tag/0.7.0) · [许可证 MIT](https://github.com/microsoft/data-formulator/blob/main/LICENSE)

- **机制：** 通过数据连接器和数据记忆理解多源数据，在 Data Thread 中保留分析路径，支持从历史节点分支、图表编辑和自然语言继续探索。
- **适合：** 交互式 EDA、图表与报告体验原型，也适合研究用户如何审阅和纠正 Agent 的分析过程。
- **使用前了解：** 2026-08-15 的 0.8.0b1 仍为 beta；复现时可优先固定稳定版 0.7.0，再按需试用预览版。

### Jupyter AI · Notebook 工作区

[实现](https://github.com/jupyterlab/jupyter-ai) · [技术资料](https://jupyter-ai.readthedocs.io/en/stable/users/index.html) · [2026 更新证据](https://jupyter-ai.readthedocs.io/en/stable/releases/v3.2.0.html) · [许可证 BSD-3-Clause](https://github.com/jupyterlab/jupyter-ai/blob/main/LICENSE)

- **机制：** 在 JupyterLab 原生聊天中连接 Agent，通过内置 MCP 和前端命令操作 Notebook 与文件，并在写入和执行前进行权限审批。
- **适合：** 需要人工审阅的 Notebook 分析、数据科学协作，以及将步骤和输出留在可继续运行的工作区。
- **使用前了解：** v3.2.0 起代码拆入多个子包，主项目发布记录侧重汇总；部署与开发应以官方子包兼容版本及 release notes 为准。

### dlt MCP Server · 工具服务

[实现](https://github.com/dlt-hub/dlt-mcp) · [技术资料](https://dlthub.com/docs/dlt-ecosystem/llm-tooling/llm-native-workflow) · [2026 更新证据](https://github.com/dlt-hub/dlt-mcp/commit/b128708215abe34a91e028a2f8916516392ffb8a) · [许可证 Apache-2.0](https://github.com/dlt-hub/dlt-mcp/blob/main/LICENSE)

- **机制：** 把本地 dlt 管道元数据、加载状态、schema 差异、只读查询与 dlt 文档/代码检索暴露为 MCP 工具。
- **适合：** 给数据工程 Agent 补充真实管道状态，使其能够诊断增量加载、表结构变动和数据接入问题。
- **使用前了解：** 需要已有 dlt 管道并配置目标数据库 extras；它提供数据接入工具上下文，执行和规划仍由宿主 Agent 完成。

## 已归档的架构案例

### Vanna 2.0 · 2026-03-29 已归档

[源码](https://github.com/vanna-ai/vanna) · [迁移与架构说明](https://github.com/vanna-ai/vanna/blob/main/MIGRATION_GUIDE.md) · [版本证据](https://github.com/vanna-ai/vanna/releases/tag/v2.0.2) · [许可证 MIT](https://github.com/vanna-ai/vanna/blob/main/LICENSE)

将 UserResolver 得到的身份和组成员信息传入 Agent 与工具；工具根据用户权限执行 SQL，向 Web 组件流式发送表格、图表与总结。 项目已归档且只读，不能按活跃维护项目推荐；新系统选型需自行评估维护与依赖成本。

## 托管平台：沿官方教程复现

| 平台 / 目标 | 官方技术入口 | 建议关注 |
|---|---|---|
| Fabric：运行时与企业集成 | [Runtime](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-runtime) · [MCP](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-mcp-server) · [Foundry / Fabric IQ](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-foundry-fabric-iq) | 标准/预览运行时、领域 Agent 发现、认证与多 Agent 调用 |
| BigQuery：分析与数据工程 | [Data Science Agent](https://docs.cloud.google.com/bigquery/docs/colab-data-science-agent) · [Pipelines](https://docs.cloud.google.com/bigquery/docs/data-engineering-agent-pipelines) · [A2A API](https://docs.cloud.google.com/gemini/data-agents/data-engineering-agent/api-overview) | Notebook 证据、SQLX 生成与应用、任务完成状态；逐项核对执行能力 |
| Snowflake：从数据到运行时 | [从零搭建](https://www.snowflake.com/en/developers/guides/build-a-cortex-agent-from-scratch-with-snowflake/) · [Agent SDK](https://www.snowflake.com/en/developers/guides/getting-started-with-cortex-agent-sdk/) | 语义视图 + 检索工具、多轮状态、后台任务、代码沙箱 |
| Databricks：接入和验收 | [Genie MCP](https://docs.databricks.com/aws/en/agents/mcp-tools/genie-mcp) · [Test and monitor](https://docs.databricks.com/aws/en/genie-agents/monitor) | Catalog 权限、来源链接、SQL 结果比较与 Agent 任务评分 |
| AWS：用户身份贯穿访问链 | [Lake Formation + Trusted Identity Propagation](https://aws.amazon.com/blogs/security/identity-aware-ai-data-agents-with-aws-lake-formation-and-trusted-identity-propagation/) | 真实用户身份如何穿过 AgentCore、MCP、Lambda 与 Athena，并留下访问证据 |

## 将项目资料变成一次可检查的实验

1. 选一个真实任务，记录输入数据、业务口径和期望产物，例如“修改一个模型并检查下游影响”或“解释营收变化并附执行证据”。
2. 固定项目版本、模型、工具权限和样例数据，保存实际工具调用与结果。
3. 分别检查执行成功、结果正确与业务语义正确；用确定性测试覆盖可计算的约束。
4. 在相同条件下改变一个因素，例如加入 Skills、语义模型或上下文指南，比较质量、成本和完成时间。
5. 把失败和修正写入回归集，再决定是否进入下一阶段；可配合 [设计评审模板](DESIGN_REVIEW.md) 使用。

评测材料可交叉阅读 [ADE-bench 方法](https://www.getdbt.com/blog/ade-bench-dbt-data-benchmarking)、[Preset Skills 对照](https://preset.io/blog/building-preset-agent-skills/) 与 [Xorq 语义目录实验](https://xorq.dev/blog/orientation-over-reasoning/)。开放式分析还需检查证据是否充足和是否应该拒答；[Hex DataBench](https://hex.tech/blog/databench-agentic-analytics-benchmark/) 提供方法参考，其任务集并未公开。
