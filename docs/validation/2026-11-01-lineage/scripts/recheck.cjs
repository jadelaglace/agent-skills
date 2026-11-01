// Read-only repository recheck; disabled entrypoints are validated in OS temp.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
process.chdir(path.resolve(__dirname, '../../../..'));
const read = p => fs.readFileSync(p, 'utf8');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const git = args => cp.execFileSync('git', args, {encoding: 'utf8'}).trim();
const main = ['product-docs', 'architecture', 'code-quality', 'design-standards', 'handoff-context', 'report-render', 'research-report'];
const strict = ['project-docs', 'project-arch', 'project-design', 'project-dev', 'handoff-note'];
const replicas = ['vision-recognition', 'vision-matting', 'vision-qc', 'comfyui-generate', 'powershell', 'git-workflow', 'llm-api', 'gitea', 'course-docs', 'server-ops'];
function walk(p) {
  return fs.readdirSync(p, {withFileTypes: true}).flatMap(e => {
    assert.ok(!e.isSymbolicLink(), 'Unexpected link: ' + p + '/' + e.name);
    const f = path.join(p, e.name);
    return e.isDirectory() ? walk(f) : [f];
  });
}
function inventory(p) {
  return Object.fromEntries(walk(p).map(f => [path.relative(p, f).split(path.sep).join('/'), hash(fs.readFileSync(f))]).sort(([a], [b]) => a.localeCompare(b)));
}
const stagedIdentity = () => hash(cp.execFileSync('git', ['ls-files', '--stage'], {maxBuffer: 8 * 1024 * 1024}));
const before = {head: git(['rev-parse', 'HEAD']), stagedEntriesSha256: stagedIdentity()};
for (const n of main) assert.deepEqual(inventory('skills/' + n), inventory('C:/Users/Aiano/.agents/skills/' + n), n);
for (const root of ['C:/Users/Aiano/.agents/skills', 'C:/Users/Aiano/.codex/skills']) {
  for (const n of [...strict, ...replicas]) assert.equal(fs.existsSync(root + '/' + n), false, root + '/' + n);
}
for (const root of ['variants/1028-strict', 'corpus/1028-original']) {
  assert.equal(walk(root).some(f => path.basename(f).toLowerCase() === 'skill.md'), false, root);
}
const entries = [];
for (const line of read('SKILLS-INDEX.md').split(String.fromCharCode(10))) {
  const open = line.indexOf('](');
  if (open < 0) continue;
  const start = line.lastIndexOf('[', open);
  const end = line.indexOf(')', open + 2);
  if (start < 0 || end < 0) continue;
  const version = line.slice(start + 1, open);
  const file = line.slice(open + 2, end);
  if (version.split('.').length === 3 && (file.startsWith('skills/') || file.startsWith('variants/'))) entries.push({1: version, 2: file});
}
const expected = [...main, ...replicas].map(n => 'skills/' + n + '/SKILL.md').concat(strict.map(n => 'variants/1028-strict/' + n + '/SKILL.md.disabled'));
assert.deepEqual(entries.map(m => m[2]).sort(), expected.sort());
for (const m of entries) {
  const versionLine = read(m[2]).split(String.fromCharCode(10)).find(line => line.trim().startsWith('version:'));
  assert.ok(versionLine && versionLine.includes(JSON.stringify(m[1])), m[2]);
  assert.ok(fs.existsSync(m[2]), m[2]);
}
for (const n of strict) {
  const p = 'corpus/1028-original/' + n + '/original.txt';
  assert.equal(git(['check-ignore', '--', p]), p);
  assert.equal(git(['ls-files', '--', p]), '');
}
const labels = cp.execFileSync(process.execPath, [path.join(__dirname, 'check-labels.cjs')], {encoding: 'utf8'}).trim();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-disabled-recheck-'));
const validator = 'C:/Users/Aiano/.codex/skills/.system/skill-creator/scripts/quick_validate.py';
const format = [];
for (const n of [...main, ...replicas]) {
  const r = cp.spawnSync('uv', ['run', '--with', 'PyYAML', 'python', '-X', 'utf8', validator, 'skills/' + n], {encoding: 'utf8'});
  assert.equal(r.status, 0, (r.error?.message || '') + r.stdout + r.stderr);
  format.push({name: n, kind: 'repository', result: r.stdout.trim()});
}
for (const n of strict) {
  const d = path.join(temp, n);
  fs.mkdirSync(d);
  fs.copyFileSync('variants/1028-strict/' + n + '/SKILL.md.disabled', path.join(d, 'SKILL.md'));
  const r = cp.spawnSync('uv', ['run', '--with', 'PyYAML', 'python', '-X', 'utf8', validator, d], {encoding: 'utf8'});
  assert.equal(r.status, 0, (r.error?.message || '') + r.stdout + r.stderr);
  format.push({name: n, kind: 'isolated-strict', result: r.stdout.trim()});
}
const installedFormat = cp.spawnSync('uv', ['run', '--with', 'PyYAML', 'python', '-X', 'utf8', validator, 'C:/Users/Aiano/.agents/skills/handoff-context'], {encoding: 'utf8'});
assert.equal(installedFormat.status, 0, (installedFormat.error?.message || '') + installedFormat.stdout + installedFormat.stderr);
format.push({name: 'handoff-context', kind: 'installed', result: installedFormat.stdout.trim()});
assert.equal(git(['diff', '--check']), '');
const whitespace = cp.spawnSync('git', ['diff', '--cached', '--check'], {encoding: 'utf8'});
assert.equal(git(['rev-parse', 'HEAD']), before.head);
assert.equal(stagedIdentity(), before.stagedEntriesSha256);
console.log(JSON.stringify({status: 'passed-with-limits', installedTreesEqual: 7, indexEntries: entries.length, disabledSources: 5, replicasAbsent: 10, ignoredUntrackedOriginals: 5, labels: JSON.parse(labels), strictFormat: format, isolatedCopies: temp, gitUnchanged: before, stagedWhitespace: {exit: whitespace.status, output: whitespace.stdout.trim()}, limits: ['No model behavioral or host discovery test', 'No remote query, commit, push, tag, installation or activation', 'Existing staged whitespace findings reported, not modified']}, null, 2));
