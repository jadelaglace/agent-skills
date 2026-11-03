const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const root = process.cwd();
const backup = 'C:/Users/Aiano/work/agent-skills-replicas/lineage-governance-20261101';
const sha = data => crypto.createHash('sha256').update(data).digest('hex').toUpperCase();
function scan(dir) {
  if (!fs.existsSync(dir)) return null;
  const out = {};
  function walk(at, rel = '') {
    for (const e of fs.readdirSync(at, {withFileTypes:true})) {
      if (e.isSymbolicLink()) throw new Error('Unexpected link: '+at+'/'+e.name);
      const key = rel ? rel+'/'+e.name : e.name;
      const file = path.join(at,e.name);
      if (e.isDirectory()) walk(file,key);
      else { const b=fs.readFileSync(file); out[key]={bytes:b.length,sha256:sha(b)}; }
    }
  }
  walk(dir); return out;
}
if (fs.existsSync(backup)) throw new Error('Refusing to overwrite before snapshot');
fs.mkdirSync(backup,{recursive:true});
const repos = ['skills','variants','corpus'];
const trees = {};
for (const name of repos) {
  trees[name]=scan(path.join(root,name));
  if (trees[name]) fs.cpSync(path.join(root,name),path.join(backup,'repo',name),{recursive:true,errorOnExist:true});
}
for (const name of ['README.md','.gitignore','docs/skill-replication-plan.md','docs/skill-lineage-governance-analysis.md']) {
  const target=path.join(backup,'repo',name); fs.mkdirSync(path.dirname(target),{recursive:true}); fs.copyFileSync(path.join(root,name),target);
}
const names=fs.readdirSync(path.join(root,'skills')).filter(n=>fs.statSync(path.join(root,'skills',n)).isDirectory());
const strictNames=['project-docs','project-arch','project-dev','project-design','handoff-note'];
const installs={};
for (const base of ['C:/Users/Aiano/.agents/skills','C:/Users/Aiano/.codex/skills']) {
  for (const name of [...names,...strictNames]) {
    const dir=path.join(base,name); const state=scan(dir); installs[base+'/'+name]=state;
    if (state) fs.cpSync(dir,path.join(backup,'install',base.includes('.agents')?'agents':'codex',name),{recursive:true,errorOnExist:true});
  }
}
const git=args=>cp.execFileSync('git',args,{encoding:'utf8'}).trim();
const gitState={head:git(['rev-parse','HEAD']),refs:git(['show-ref']),index:sha(fs.readFileSync(path.join(root,'.git/index'))),status:git(['status','--short'])};
const result={date:new Date().toISOString(),backup,root,trees,installs,git:gitState,note:'After docs-first approval capture, before runtime skill edits. Handoff corpus provisional, not sealed.'};
fs.writeFileSync(path.join(backup,'BEFORE.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({backup,head:gitState.head,repoFiles:Object.fromEntries(Object.entries(trees).map(([k,v])=>[k,Object.keys(v||{}).length])),installed:Object.entries(installs).filter(([,v])=>v).map(([k,v])=>({path:k,files:Object.keys(v).length}))},null,2));
