# Skill 来源、风格与分发索引

最后整表核对：2026-11-01；2026-11-02仅追加独立外部提炼线 `skill-review`。
范围是本仓库18个标准入口、5个禁用严格变体和5份私有来源转录，不是本机全部技能。
此索引登记内容线与分发观察，不是运行时
任务权威、安装开关或自动选模器；当前工作只见[计划入口](docs/skill-replication-plan.md)。

## 如何读

- **能力信任型**：少量高价值引导，允许模型判断，大纲/流程按风险裁剪。
- **严格核证型**：更显式的流程、边界、证据与停止条件。严格不代表自动正确。
- **强/弱LLM背景**：用户指定的创作环境/设计取向，不是本次测得的能力排名，
  也不能据此反推具体模型、版本或作者。作者按用户自建声明登记；生成模型未知。
- **已本机发布且一致**：在本机`.agents/skills/<name>`发现安装，完整清单与
  SHA256和仓库一致。**未安装**：本轮核对`.agents/skills`和`.codex/skills`
  两根的同名目录均未发现，不保证其他宿主/目录也不存在。
- **可发现**：安装根有标准`SKILL.md`入口；不等于当前会话已加载或实际调用。
  本轮不检查宿主缓存/自动调用策略的实际运行效果；除明确使用过的维护技能外，
  不从路径存在推断会话加载。这里各技能的当前会话调用状态统一记**未核**。
- 技能SemVer独立管理；仓库日期标签不是技能版本。`repo-2026.11.01`已推送，
  指向内容提交`b02192f`；完整身份与远端回读见[发布记录](docs/validation/2026-11-01-publication/REVIEW.md)。

证据：[逐文件身份与安装回读](docs/validation/2026-11-01-lineage/observations.json)、
[本轮校验与限制](docs/validation/2026-11-01-lineage/REVIEW.md)。观察过时后应重核受影响行。

## 本机主线与既有本机对应

以下7项安装均一致，`.agents`有可发现入口；`.codex`同名目录未发现。
分发意图为**保留本机主线**；本轮只更新交接主线，其他6项只读核对，不重新安装。
四件套和交接是能力信任型；汇报两项保留其既有工作流，不因同样出现在截图
就自动归为“无本机对应的弱模型严格复刻”。

| 技能 / 内容线 | 版本与正式入口 | 风格/背景 | 主干与后续来源 | 对应严格线 | 本机/分发状态 | 当前Git内容身份 |
| --- | --- | --- | --- | --- | --- | --- |
| product-docs / 本机产品主线 | [1.0.5](skills/product-docs/SKILL.md) | 能力信任型；用户指定GPT训练风格，具体模型未核 | 恢复e43c0cb吸收前历史；选择性精炼，保留工具无关流程简化 | project-docs | 已本机发布且一致；保留 | 本次日期发布内容，见发布记录 |
| architecture / 本机架构主线 | [1.1.1](skills/architecture/SKILL.md) | 能力信任型；同上 | 同一e43c0cb历史；1028只作镜子，非严格合同整体融合 | project-arch | 已本机发布且一致；保留 | 本次日期发布内容，见发布记录 |
| code-quality / 本机代码主线 | [1.1.1](skills/code-quality/SKILL.md) | 能力信任型；同上 | 同一e43c0cb历史；少量质量闭环精炼 | project-dev | 已本机发布且一致；保留 | 本次日期发布内容，见发布记录 |
| design-standards / 本机设计主线 | [1.1.1](skills/design-standards/SKILL.md) | 能力信任型；同上 | 同一e43c0cb历史；按适用范围验证实际输出 | project-design | 已本机发布且一致；保留 | 本次日期发布内容，见发布记录 |
| handoff-context / 本机交接主线 | [1.0.3](skills/handoff-context/SKILL.md) | 能力信任型；用户要求相信能力、简洁、工具解耦 | 已接受b1b1c43的1.0.1及原始用户意图；审阅69f2f23的1.0.2，去除未验收#16 API/身份表绑定；借鉴1028少量证据亮点 | handoff-note | 本轮已本机发布且一致；保留 | 本次日期发布内容；不覆盖历史1.0.2身份 |
| report-render / 既有本机渲染线 | [1.0.0](skills/report-render/SKILL.md) | 既有可移植渲染合同；不新增强/弱归类 | 旧34页截图22–24页复刻，清理特定环境后成为既有本机对应；1028未声称逐条重建 | 无本轮新变体 | 既有安装且一致；本轮不分发 | 内容已在HEAD；最近相关提交6c17cc7 |
| research-report / 既有本机调研线 | [1.1.0](skills/research-report/SKILL.md) | 既有调研编排合同；不新增强/弱归类 | 旧34页截图24–26页复刻；后收本机可迁移审查改进；1028未声称逐条重建 | 无本轮新变体 | 既有安装且一致；本轮不分发 | 内容已在HEAD；最近相关提交6c17cc7 |

四件套恢复证据见[三线结果](docs/four-skills-three-line-evidence.md)，交接来源与
历史裁定见[交接自审](docs/validation/2026-11-01-lineage/handoff-review.md)。
e43c0cb是主干基线，不声称当前内容与该提交逐字相同。

## Independent Distillations

独立提炼线不并入原有四件套、1028严格变体或截图原文。按用户要求保留可自用的
方法，删除具体品牌/生态推广与无必要流程，版权署名不删除。

| 技能 / 入口 | 风格与版本 | 来源 | 本机与分发 | 证据 |
| --- | --- | --- | --- | --- |
| [skill-review](skills/skill-review/SKILL.md)：技能审查、比较与改进 | 能力信任型；独立1.0.0；生成模型未登记 | YTruman/better-skill固定提交f5a82c6，MIT改编；非上游原版/官方背书 | 2026-11-02已本机发布且6文件SHA256一致；`.codex`无同名目录；本会话显式使用并获用户认可，自动触发未测；Git分发见记录 | [取舍与验证及分发](docs/validation/2026-11-02-skill-review/REVIEW.md) |

## Screenshot Replicas

这10项没有吸收前的本机同源主线。**共同标记：用户指定的弱能力LLM环境下
形成的严格流程取向，现为截图复刻/适配版**。不是“仅弱模型可用”，也不是
模型评测结论。正文只增加短来源说明，未改算法、脚本或业务触发description。

共同主干是旧34页截图批次，1.0.0源码已在69f2f23提交；本轮入口标记滚到
1.0.1，纳入本次日期发布内容。不能统称“全部已由1028逐条重建”。
两安装根同名目录均未发现，因此本机无这些入口可发现；当前分发决定为
**仅存仓库，暂不本机分发**。将来安装需明确动作与回读，不从索引自动执行。

| 技能与职责 | 版本/入口 | 主干与1028对齐证据 | 本机/启用 | 分发意图 |
| --- | --- | --- | --- | --- |
| vision-recognition：识图与客观测量 | [1.0.1](skills/vision-recognition/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| vision-matting：透明抠图/分层合成 | [1.0.1](skills/vision-matting/SKILL.md) | 旧截图复刻；已有1028脚本级对齐记录，不据此宣称全合同覆盖 | 未安装；无安装入口 | 仅存仓库 |
| vision-qc：抠图/渲染质量核证 | [1.0.1](skills/vision-qc/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| comfyui-generate：工作流执行 | [1.0.1](skills/comfyui-generate/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| powershell：脚本陷阱处理 | [1.0.1](skills/powershell/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| git-workflow：Git协作流程 | [1.0.1](skills/git-workflow/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| llm-api：兼容接口调用 | [1.0.1](skills/llm-api/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；旧文“已安装”与现状不符，原因未核 | 仅存仓库，不擅自补装 |
| gitea：实例API操作 | [1.0.1](skills/gitea/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| course-docs：课程因果结构 | [1.0.1](skills/course-docs/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |
| server-ops：服务排障运维 | [1.0.1](skills/server-ops/SKILL.md) | 旧截图复刻；1028完整对齐待核 | 未安装；无安装入口 | 仅存仓库 |

69f2f23是旧提交身份，不是1.0.1内容哈希。批次与安装差异说明见
[前置来源分析](docs/skill-lineage-governance-analysis.md)。

## Disabled Strict Variants

这5项以**1028为主干**，吸收合理且不冲突的本机边界，针对用户指定的弱能力
环境采用更显式核证。与本机主线独立SemVer；当前均1.0.0，纳入本次日期发布内容。
均只有`SKILL.md.disabled`，无标准入口；两个安装根同名目录均未发现。
**只存审阅源码，不安装、不启用**；这不是永久删弃，也不是授权未来自动安装。

| 严格技能 | 禁用源码 | 对应本机主线 | 来源/修正证据 | 实际与意图 |
| --- | --- | --- | --- | --- |
| project-docs | [1.0.0](variants/1028-strict/project-docs/SKILL.md.disabled) | product-docs | 1028印刷25–26页；[128组覆盖/裁决](variants/1028-strict/COVERAGE.md)中的产品组 | 未安装/不可发现；继续封存 |
| project-design | [1.0.0](variants/1028-strict/project-design/SKILL.md.disabled) | design-standards | 1028印刷26页；同上设计组 | 未安装/不可发现；继续封存 |
| project-arch | [1.0.0](variants/1028-strict/project-arch/SKILL.md.disabled) | architecture | 1028印刷26–27页；同上架构组 | 未安装/不可发现；继续封存 |
| project-dev | [1.0.0](variants/1028-strict/project-dev/SKILL.md.disabled) | code-quality | 1028印刷27页；同上代码组 | 未安装/不可发现；继续封存 |
| handoff-note | [1.0.0](variants/1028-strict/handoff-note/SKILL.md.disabled) | handoff-context | 1028印刷29–30页；[交接覆盖/纠错](variants/1028-strict/handoff-note/COVERAGE.md) | 未安装/不可发现；继续封存 |

## Private Corpus

来源资料不是第三套运行技能，没有技能SemVer；转录修订号不等于来源技能版本。
原文在本机被Git忽略，不公开、不分发、不激活；公开只有安全说明和指纹。
页眉页脚、空白/排版有规范化，非缺失原SKILL.md逐字节恢复。

| 原文身份 | 来源 | 记录与可靠性 | 处置 |
| --- | --- | --- | --- |
| project-docs | 1028印刷25–26页 | [四技能封存说明](corpus/1028-original/TRANSCRIPTION-NOTES.md)、[manifest](corpus/1028-original/MANIFEST.json)；转录修订1 | 私有语料，非执行合同 |
| project-design | 1028印刷26页 | 同一四技能manifest；转录修订1 | 同上 |
| project-arch | 1028印刷26–27页 | 同一manifest；保留一个已标明的非规则字形疑点，不能当无歧义定稿 | 同上 |
| project-dev | 1028印刷27页 | 同一四技能manifest；转录修订1 | 同上 |
| handoff-note | 1028印刷29–30页 | [独立转录说明](corpus/1028-original/handoff-note/TRANSCRIPTION-NOTES.md)、[独立manifest](corpus/1028-original/handoff-note/MANIFEST.json)；转录修订1 | 同上；不改四技能旧封存快照 |

## Git 与证明边界

实施观察的基线HEAD为`69f2f23d5886bad88ddb8f8e0b2998284d8728b8`；
该时点的observations.json与核验报告是历史快照，不代表后续Git分发状态。
2026-11-01另获『简单测测收尾，推送标签』授权；本次提交、日期标签与远端身份
统一由[发布记录](docs/validation/2026-11-01-publication/REVIEW.md)登记。
Git push、仓库标签、GitHub Release与本机安装是不同动作；本次不创建Release或重装。

格式/路径/哈希/边界校验只证明检查覆盖的合同和身份，不证明截图作者技术主张
正确，不证明真实跨会话交接效果，也不替代用户验收。维护者场景走查不冒充
独立模型测试。

## 维护方式

内容、版本、安装/卸载、分发决定改变时，只更新受影响行和对应证据。
未知就保留未知，不靠历史安装说明或模型背景猜事实。索引与磁盘冲突时，
最新授权决定应然、只读回读决定实然；显式记偏差，不让索引自行安装或改版本。
这是一份手工主登记；observations.json是可再生验证快照，不是第二份手工配置。
