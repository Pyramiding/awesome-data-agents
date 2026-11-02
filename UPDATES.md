# 增量更新记录

[返回总览](README.md) · [机器索引](resources.json) · [收录方法](METHODOLOGY.md) · [项目路线](PROJECT_GUIDE.md)

这里记录每轮真正新增的资料、已有条目的实质更新，以及仍未核验的公开材料。日期来自原始发布页或版本记录，不把抓取时间当作发表时间；这是有边界的编辑检索，不是全网穷尽抓取。

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
