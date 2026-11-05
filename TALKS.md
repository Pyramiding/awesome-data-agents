# Data Agent 公开分享导航

[返回总览](README.md) · [项目资料路线](PROJECT_GUIDE.md) · [机器索引](resources.json) · [更新记录](UPDATES.md)

**资料截止：2026-11-05。** 按“要解决的问题”和“实际可读的材料”选择入口。下表重新编排已有收录，并补入本轮核验的讲义与官方培训页；不是把所有链接都算作本日新分享。

## 先按问题选择

| 想解决的问题 | 建议先读 | 接着做什么 |
|---|---|---|
| Data Agent 到底覆盖哪些数据工作？ | SIGMOD 教程讲义 | 对照本仓的上下文、执行、验证与运营四个工程轴，明确系统范围 |
| 企业问数怎样演进到多步分析？ | Shopee 全文实录 | 对照项目的上下文组织、执行隔离与评测，找出与自己场景相同的约束 |
| 怎样识别“SQL 能跑，分析却错了”？ | Catch 7 AI Analysis Mistakes | 把粒度、完整时间窗和来源对账转成可以失败的验收问题 |
| 怎样把判断与证据留给下一次任务？ | Build 3 AI Harnesses | 为一个指标写定义、检查与证据记录，再实现实际生效的门禁和失效检查 |
| 怎样让上下文成为团队可维护的资产？ | Atlan Context Conference | 区分已确认指标、推断、人工审核与版本变更 |
| 怎样开始配置一个托管分析 Agent？ | 火山引擎培训页 + 对应版本文档 | 先核对版本形态、可检索资产和工具开关，再验证实际调用身份 |

## 公开实录与幻灯片

| 日期依据 | 分享 | 已确认的材料 | 建议关注 |
|---|---|---|---|
| 2026-05-26 · 发布 | Open Data Circle · [Data Agents Need an Agent-facing Data Plane](https://speakerdeck.com/opendatacircle/data-agents-need-an-agent-facing-data-plane) | 幻灯片页；本轮直接请求超时，另经原站页面读取确认 | 将数据面、权限和观测作为 Agent 接入的一部分，而不只关注模型调用 |
| 2026-06-03 · 教程日期 | SIGMOD · [Data Agents 教程讲义](https://2026.sigmod.org/slides/DataAgents-SIGMOD2026.pdf) | PDF，沿用既有收录；文件较大，本轮响应头正常，完整下载超时 | 自治分级与数据生命周期；分级本身不等于生产验收结论 |
| 2026-07-10 · 发布 | Paras Doshi · [Catch 7 AI Analysis Mistakes Before They Drive Decisions](https://www.insightextractor.com/p/maven-session-slide-deck-download) | **本轮新增：[18 页 PDF](https://www.insightextractor.com/api/v1/file/162a46cb-90f0-42da-9c25-6bde530522be.pdf)** | 指标定义、粒度、时期覆盖与来源对账；案例数字是虚构教学数据，不能当作项目实测 |
| 2026-07-14 · 实录发布 | Shopee / InfoQ · [从 AI 取数到智能分析：企业级数据 Agent 的多阶段演进与工程化落地](https://www.infoq.cn/article/LfO7mzdhxMWTtICFuTNb) | 实录正文可读取；本轮直接请求受限（451）；原 QCon 北京场次在 4 月 | 从链路到多阶段编排，结合 File-as-Context、Sandbox、Skills 与评测运营 |
| 2026-07-16 · 发布 | Paras Doshi · [Build 3 AI Harnesses for Trustworthy Analytics](https://www.insightextractor.com/p/session-slide-and-recording-build) | **本轮新增：[15 页 PDF](https://www.insightextractor.com/api/v1/file/c04ec353-b782-4432-b631-1a0d42353cbb.pdf)** | 上下文、校验、证据复用的文件布局；示例 hook 只是提醒，证据失效条件仍需实际实现 |
| 2026-10-28 · 场次日期 | Atlan · [The Post-AI Data Stack: A blueprint for analytics agents](https://atlan.com/context-conference/post-ai-data-stack/) | 36:55 视频与可定位逐字稿，沿用 11 月 2 日核验 | 指标、Ontology、Skills 的分工，以及人工审核和迭代评测；客户数字属于分享方经验 |

两份 Paras Doshi 发布页都提到录像，本轮只核验了可读讲义，不据页面标题宣称录像已完整验证。保留作者原始页面与 PDF 链接，便于材料更新后继续定位。

## 官方视频入口与带领取条件的材料

| 日期 | 入口 | 本轮或既有核验边界 | 配套阅读 |
|---|---|---|---|
| 2026-08-20 | 火山引擎 VeDI · [分析洞察快速入门-04 搭建流程概览](https://developer.volcengine.com/videos/7566240392669528073) | **本轮新增。** 已核验官方页面、发布元数据与简介；未独立测试完整播放，未取得逐字稿 | [3.21 系列文档](https://docs.volcengine.com/docs/data-agent-private/v3-21-0?lang=zh)；版本形态和参数以实际安装版本为准 |
| 2026-10-27 | 云器科技 · [DACon 北京会后复盘](https://www.yunqi.tech/resource/blogs/dacon-ai-lakehouse) | 正文复盘可读；完整 PPT 需扫码小程序，沿用既有访问限制 | [Semantic View 技术文章](https://www.yunqi.tech/resource/blogs/semantic-view-ai-agent) |

## 只有议程时怎样使用

[QCon 上海与 DACon 北京的待核验场次](README.md#会议议程与公开材料核验)可以用来了解选题和讲者，但仍保留 `agenda`。找到具体场次的可读实录、幻灯片或回放后再补材料，不以“大会已结束”代替材料核验。

维护时同时保存三种日期：**场次发生日期、实录/视频发布日期、本仓核验日期**。同一场分享的材料晚于大会公开时，不能将它们混成一个发布时间。

## 把分享转成一次工程检查

1. 先写出分享解决的约束，例如业务口径不一致、上下文丢失、长任务失败或工具权限过宽。
2. 在 [项目资料路线](PROJECT_GUIDE.md) 中找到对应机制，核对当前版本是否已经实现，还是仅有设计或路线图。
3. 为该机制写一个会失败的例子，例如改变时间范围、引入一对多关联或撤销某个资源权限。
4. 保存查询、结果、使用的定义和失败时的处理过程；有实际运行证据后，再填入自己的验收记录。

这份导航提供阅读与检查顺序，未替读者执行项目部署或复现分享中的效果。
