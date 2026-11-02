const fs=require('node:fs');
const crypto=require('node:crypto');
const path=require('node:path');
const backup='C:/Users/Aiano/agent-skills-replicas/lineage-governance-20261101';
const before=JSON.parse(fs.readFileSync(path.join(backup,'BEFORE.json')));
const names=['vision-recognition','vision-matting','vision-qc','comfyui-generate','powershell','git-workflow','llm-api','gitea','course-docs','server-ops'];
const label='> Lineage: screenshot-replicated strict-process skill, originating in a\n> weak-capability-LLM environment (user-provided design background, not a model\n> capability measurement). Source batch and local distribution status are\n> recorded in the [repository index](../../SKILLS-INDEX.md#screenshot-replicas).';
for(const n of names){
  const old=fs.readFileSync(path.join(backup,'repo/skills',n,'SKILL.md'),'utf8').replace(/\r\n/g,'\n');
  const now=fs.readFileSync(path.join('skills',n,'SKILL.md'),'utf8').replace(/\r\n/g,'\n');
  const heading=old.match(/^# .+$/m)[0];
  const expected=old.replace('version: "1.0.0"','version: "1.0.1"').replace(heading,heading+'\n\n'+label);
  if(now.replace(/\n?$/,'\n')!==expected.replace(/\n?$/,'\n'))throw Error('Non-label or version delta: '+n);
  for(const [k,v] of Object.entries(before.trees.skills)){
    if(k.startsWith(n+'/')&&!k.endsWith('/SKILL.md')){
      const h=crypto.createHash('sha256').update(fs.readFileSync('skills/'+k)).digest('hex').toUpperCase();
      if(h!==v.sha256)throw Error('Protected support-file delta: '+k);
    }
  }
  for(const base of ['C:/Users/Aiano/.agents/skills','C:/Users/Aiano/.codex/skills']){
    if(fs.existsSync(path.join(base,n)))throw Error('Unexpected installation: '+n);
  }
}
console.log(JSON.stringify({status:'passed',skills:10,change:'lineage note and 1.0.0 to 1.0.1; final newline normalization only',supportFiles:'unchanged',installed:'absent in both checked roots'}));
