# 三项请求恢复复核

日期：2026-11-01。基于已存在的实施成果，依次核对交接双线、十项来源标记、
仓库索引。不重做历史恢复、技能改写、版本升级或安装，不续跑旧分发待办。
本次使用skill-creator的入口格式校验和product-docs的终态防重放/证据分层原则；
这不构成独立模型行为测试。

## 核对结果

1. 交接主线handoff-context为1.0.3，与本机完整树逐文件SHA256一致；
   严格handoff-note为独立1.0.0，保存在SKILL.md.disabled，不安装、不启用。
   主线保留可选大纲和工具无关恢复，严格线保持1028来源与纠错覆盖记录。
2. 十个无吸收前本机同源主线的复刻项均为1.0.1，来源说明明确弱能力LLM
   环境下的严格取向。check-labels.cjs实跑通过：相对既有保护快照，仅说明、
   patch版本与末尾换行变化，所有支持文件不变。不能声称全部已按1028逐条重建。
3. SKILLS-INDEX.md的22个技能/变体入口路径、版本与预期清单一致；
   17个标准技能、5个禁用严格变体之外，另有5份私有原文的资料登记。
   7个已安装主线完整树与仓库逐哈希相同。5个严格变体和10个复刻项在
   .agents/skills、.codex/skills两安装根均未发现同名目录。
   corpus与variants均无标准SKILL.md；5份original.txt全部被Git忽略且未跟踪。

## 实跑与保护

命令：node docs/validation/2026-11-01-lineage/scripts/recheck.cjs。
最终退出码0，结果passed-with-limits；17个仓库入口、5个隔离严格入口、
1个本机交接入口共23次官方quick_validate通过。
直接检查禁用目录返回SKILL.md not found是未启用形态，不是严格正文格式失败；
最终检查使用OS临时目录内的副本，不在生产目录创建标准入口。

HEAD前后均为69f2f23d5886bad88ddb8f8e0b2998284d8728b8。
git ls-files --stage结果SHA256前后相同：
9c805915c11e2847ac6b65547dacc1e3092f3f392aac58f65ee389670036edd0。
只比较是否存在暂存改动不足以证明暂存内容未变；最终脚本已使用完整索引条目指纹。
本次不add/commit/push/tag/Release，不安装/激活技能，不访问远端。
新增复核脚本与本记录，并更新当前进度；既有暂存内容保留。

## 单独披露

未暂存差异的git diff --check通过；既有暂存区的git diff --cached --check
退出码2，仍有以下文件的末尾多余空行，不宣称Git分发门禁全通过：

- corpus/1028-original/TRANSCRIPTION-NOTES.md:24
- docs/validation/2026-11-01-three-line/scripts/install.cjs:22
- docs/validation/2026-11-01-three-line/scripts/validate.cjs:25

这些不改变本次三项结果，但未来分发前需处理；本次不擅改已有暂存文件。
新脚本曾遇转义、工作目录和Git输出缓冲问题，均是验证执行问题，修正后才
获得上述通过结果；不把这些工具错误算作技能内容缺陷或隐去终态限制。

本次结论仅覆盖静态格式、标记差异、索引与安装身份、未启用/私有边界；
不证明模型能力、真实跨会话行为、宿主发现/加载、远端新鲜度或用户接受。
