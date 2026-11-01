const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex').toUpperCase();
function scan(dir){
  if(!fs.existsSync(dir))return null;
  const out={};
  for(const e of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
    if(e.isSymbolicLink())throw Error('Unexpected symlink '+dir+'/'+e.name);
    const file=path.join(dir,e.name);
    if(e.isDirectory()){for(const[k,v]of Object.entries(scan(file)))out[e.name+'/'+k]=v;}
    else{const b=fs.readFileSync(file);out[e.name]={bytes:b.length,sha256:sha(b)};}
  }return out;
}
const git=args=>cp.execFileSync('git',args,{encoding:'utf8'}).trim();
const version=t=>t.match(/^  version:\s*"([0-9.]+)"/m)?.[1]||'unverified';
const same=(a,b)=>!!a&&!!b&&JSON.stringify(a)===JSON.stringify(b);
const skills=fs.readdirSync('skills').filter(n=>fs.statSync('skills/'+n).isDirectory()).map(name=>{
  const files=scan('skills/'+name);
  const installations={};
  for(const [label,base]of Object.entries({agents:'C:/Users/Aiano/.agents/skills',codex:'C:/Users/Aiano/.codex/skills'})){
    const actual=scan(base+'/'+name);installations[label]={status:!actual?'absent':same(files,actual)?'installed-same':'installed-drift',files:actual};
  }
  return {name,version:version(fs.readFileSync('skills/'+name+'/SKILL.md','utf8')),files,installations,committedAt:git(['log','-1','--format=%H','--','skills/'+name]),workingTreeDelta:git(['diff','--name-status','HEAD','--','skills/'+name]),discovery:'SKILL.md exists; actual loading not observed'};
});
const strict=fs.readdirSync('variants/1028-strict').filter(n=>fs.statSync('variants/1028-strict/'+n).isDirectory()).map(name=>({name,version:version(fs.readFileSync('variants/1028-strict/'+name+'/SKILL.md.disabled','utf8')),files:scan('variants/1028-strict/'+name),discoverable:fs.existsSync('variants/1028-strict/'+name+'/SKILL.md'),installations:Object.fromEntries(['agents','codex'].map(k=>[k,fs.existsSync('C:/Users/Aiano/.'+k+'/skills/'+name)?'present':'absent']))}));
const result={date:new Date().toISOString(),head:git(['rev-parse','HEAD']),push:'not-performed-this-task; remote content not queried',skills,strict};
const out='docs/validation/2026-11-01-lineage/observations.json';
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output:out,head:result.head,skills:skills.map(({name,version,installations,committedAt})=>({name,version,agents:installations.agents.status,codex:installations.codex.status,committedAt})),strict:strict.map(({name,version,discoverable,installations})=>({name,version,discoverable,installations}))},null,2));
