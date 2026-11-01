# 四技能三线实施证据

日期：2026-11-01。唯一实施进度在 [计划顶部](four-skills-three-line-plan.md)，本文件只存动作与验证事实。

## S0 保护与基线：完成

- HEAD：69f2f23d5886bad88ddb8f8e0b2998284d8728b8；历史基线：e43c0cbe33a038ea1e94c563066546eb57b9a6e9。
- 持久保护包：C:/Users/Aiano/codex-skills-replicas/three-line-20261101/S0-MANIFEST.json。S0 时仓库 19 文件、安装端 19 文件逐字节一致；两份完整副本与历史 17 文件均已保全并回读哈希。
- 另冻结 75 个无关仓库文件、handoff-context 安装端 2 文件、1028 原图 33 张。HEAD 与远端不变。
- S0 时未提交差异只属于本次计划文档；已保存当时计划/入口快照。没有可见的其他活跃会话在当前仓库并行写入，亦无现成归属表；本轮不新造任务协议。
- 初次保护脚本因换行转义语法错误未运行任何动作；修正后才执行快照，未把工具错误记为技能失败。

## S1 原文封存：完成（非规则字形歧义已标）

- corpus/1028-original 四份 original.txt、来源/文本 SHA256 manifest、跨页与校订说明已落盘；印刷页 25–27 全部对照，description、正文与版本史均保留。
- 一处架构实例开头短语不能确定，使用显式图字不清标记；不据此派生新规则。核心清单与范围规则清晰。原文技术主张不静默纠错。
- 没有 SKILL.md；四份私人原文均被 Git 忽略。没有复制到发现目录；来源 33 张原图哈希不变。

## S2 纯历史恢复：仓库检查点完成

- 17 文件全部恢复至 e43c0cb，逐字节 SHA256 与持久历史快照相同，记录见 validation/2026-11-01-three-line/S2-pure-restore.json。
- 仅删除基线没有的 structure-and-topology.md 与 debugging.md，均可从 S0 完整快照恢复。其他技能、HEAD、标签不变。
- apply_patch 完成内容恢复后，只把末尾换行规范化回历史字节；不是 rebase/reset/revert 整仓。随后已完成带漂移检查的安装同步，见下一节。

## S2 本机历史检查点与 S3 精炼安装：完成

- 先在隔离样例验证安装漂移拒绝、失败回滚、回滚遇外部写保护、回读和幂等，再同步纯恢复树。INSTALL-baseline.json 为纯历史 17 文件安装身份；安装前拒绝 S0 外部漂移。
- 本机精炼后仅 6 文件相对历史改变：四入口、product-docs lifecycle 与 greenfield。其余 11 文件保持历史字节，两个吸收新增 reference 不留在仓库/安装。
- product-docs 1.0.5；architecture/code-quality/design-standards 各 1.1.1。INSTALL-final.json 保存最终 17 文件身份，安装结果逐文件哈希与仓库一致。两份安装清单均在 S0 持久保护包。没有修改标签或远端。
- 场景审阅见 validation/2026-11-01-three-line/local-review.md：保留任务/下一步/证据，不依赖 Goal/API/命名任务对象；完成不重放、局部失败局部处理、共享最小写与 fork 身份。不是停摆的 #16 完整改造。
- quick_validate 初次在 Windows 默认 GBK 下两项读 UTF-8 失败；改用 python -X utf8 后四项通过，未修改技能迎合编码错误。

## S4 严格变体：源码完成，未启用

- variants/1028-strict/project-{docs,design,arch,dev}/SKILL.md.disabled，独立各 1.0.0。无可发现入口、无安装、无默认同步。
- COVERAGE.md 对照四份原文全部角色/方法/协议/出口/红线/文档/历史，128 组条款处置，不以旧31项为分母。源码规则有独立定位标识，仅供覆盖核对，不引入任务平台。
- 保留严格证据和失败门，纠正无限排空、手写/内存绝对化、默认缓冲总不可读、alpha单点归因、暗图诊断顶替原件、每轮自动commit等错误或越权风险。
- Node.js HTTP 和 Khronos WebGL 官方文档均实际 HTTP 200 回读，确认 response.end 与合成后buffer清除语义；不是实际产品HTTP/GPU实验。

## S5 收口与验证边界

- 机器校验见 [validation.json](validation/2026-11-01-three-line/validation.json)，本机和严格场景自审分别见 [local-review](validation/2026-11-01-three-line/local-review.md) / [strict-review](validation/2026-11-01-three-line/strict-review.md)。
- 四份本机入口与隔离严格入口共8份官方格式校验通过；四份 UI YAML 解析和默认提示名称通过；16个本机Markdown链接及坏链接负例通过。
- 源身份/改词/跨页漏段/错批次负例、17文件历史检查点、最终安装一致、隔离安装故障/回滚/漂移/幂等、未启用路径、128组映射完整性、无关保护均有执行证据。静态计数不证明语义或实战有效。
- 转录标记保留一处非规则实例短语的字形歧义；没宣称原文逐字节复原或全无歧义。未做独立模型行为测试或真实项目HTTP/GPU/Babata/StockMesh链路验收。
- 只删除两个已保全的吸收后 references；没有删除历史Git标签/提交、无关技能、原图或他人文档。回滚可用S0持久快照精确恢复受影响目标，不回退整仓。
- 没有 commit、push、tag、GitHub Release 或严格变体激活。磁盘安装已回读，当前会话技能发现快照不保证热刷新，新会话应重新发现并回读。

## 验证脚本

保护回读：`node docs/validation/2026-11-01-three-line/scripts/state.cjs protect`。快照命令拒绝覆盖已有 manifest。历史内容已恢复并留证，不再重复执行恢复或安装命令；后续仅按新授权行动。完整校验脚本会创建隔离测试副本，不改生产安装。

## 最终文档与桌面阅读副本回收（2026-11-01）

- 桌面 1028-four-skills-three-line-plan.html 已由当前完整 Markdown 生成，沿用原版式和 15 个目录锚点；旧“只规划/未执行”顶栏已替换成实施终态，没有改旧31项历史报告。
- 使用 report-render / design-standards 的实际渲染与证据边界：Edge 156.0.4314.58，1440×1000 与390×844视口、scale=1。浏览器无页面/资源错误，所有15个目录目标与本地链接可达；页面无整体横溢，手机8张表保留独立横向滚动容器，不缩成不可读小字。
- 初次 fullPage 手机长图的后半内容出现错位；不能仅凭PNG尺寸宣称通过。改成真实视口逐段截图再拼接，重新查看两视口的顶部、布局、实施表、终态等代表区域。最终尺寸1440×13292与390×21876；完整PNG及输入/输出哈希、浏览器与几何检查见 [report-qc.json](validation/2026-11-01-three-line/report-qc.json)。这是代表视图自检，不是逐像素或用户可用性验收。
- 工作区入口将旧“当前实施状态/恢复约束”等标成历史，避免历史Goal/task-state顺序覆盖当前工具无关恢复规则；当前唯一进度仍由本计划顶部拥有。
- 最终复跑9组机器检查全部pass：17文件仓库/安装身份一致，6文件相对历史有精炼，16本机链接通过，128组严格覆盖，语料仍被忽略，严格仍未安装。复跑只创建隔离测试副本，没有恢复/重装生产技能。
- 75个无关仓库文件、handoff-context安装端2文件、33张原图及HEAD再次保护回读无漂移；Git暂存区为空。格式、场景自审与真实项目/独立模型验证的边界保持前述说明，不提升用户接受状态。
