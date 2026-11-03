const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto'),assert=require('node:assert/strict'),os=require('node:os');
const root=process.cwd(),out='docs/validation/2026-11-01-lineage';
const backup='C:/Users/Aiano/work/agent-skills-replicas/lineage-governance-20261101';
const before=JSON.parse(fs.readFileSync(backup+'/BEFORE.json'));
const read=p=>fs.readFileSync(p,'utf8');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex').toUpperCase();
const git=args=>cp.execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const replicas=['vision-recognition','vision-matting','vision-qc','comfyui-generate','powershell','git-workflow','llm-api','gitea','course-docs','server-ops'];
const mainlines=['product-docs','architecture','code-quality','design-standards','handoff-context','report-render','research-report'];
const strict=['project-docs','project-arch','project-dev','project-design','handoff-note'];
function walk(dir){return !fs.existsSync(dir)?[]:fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('Unexpected link '+dir+'/'+e.name);const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p];});}
function inventory(dir){if(!fs.existsSync(dir))return null;return Object.fromEntries(walk(dir).map(p=>[path.relative(dir,p).replace(/\\/g,'/'),sha(fs.readFileSync(p))]).sort(([a],[b])=>a.localeCompare(b)));}
function registered(index){
  const entries=[];
  for(const line of index.split('\n')){const i=line.indexOf('](');if(i<0)continue;const j=line.lastIndexOf('[',i);const k=line.indexOf(')',i+2);if(j<0||k<0)continue;const version=line.slice(j+1,i),file=line.slice(i+2,k);if(/^\d+\.\d+\.\d+$/.test(version)&&(file.startsWith('skills/')||file.startsWith('variants/')))entries.push({version,file});}
  return entries;
}
function checkRegistry(index){
  const entries=registered(index),expected=[...mainlines,...replicas].map(n=>'skills/'+n+'/SKILL.md').concat(strict.map(n=>'variants/1028-strict/'+n+'/SKILL.md.disabled'));
  assert.deepEqual(entries.map(x=>x.file).sort(),expected.sort(),'missing/duplicate/extra registry entries');
  for(const e of entries){assert.ok(fs.existsSync(e.file),'missing path '+e.file);const v=read(e.file).match(/^  version:\s*"([^"]+)"/m)?.[1];assert.equal(e.version,v,'registry version drift '+e.file);}
  return entries.length;
}
function brokenLinks(file,text){
  const bad=[];
  const normalized=text.replace(/```[\s\S]*?```/g,'').replace(/`[^`\n]+`/g,'');
  for(const line of normalized.split('\n')){let cursor=0;while(true){const i=line.indexOf('](',cursor);if(i<0)break;const k=line.indexOf(')',i+2);if(k<0)break;const href=line.slice(i+2,k).replace(/^<|>$/g,'');cursor=k+1;if(/^(https?:|mailto:|codex:)/i.test(href))continue;
    const [dest,fragment]=href.split('#'),target=dest?path.resolve(path.dirname(file),decodeURIComponent(dest)):file;
    if(!fs.existsSync(target)){bad.push(href);continue;}
    if(fragment&&/\.md$/.test(target)){
      const slugs=[...read(target).matchAll(/^#{1,6} (.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[`*]/g,'').replace(/[^\p{L}\p{N} _-]/gu,'').replace(/ /g,'-'));
      if(!slugs.includes(decodeURIComponent(fragment)))bad.push(href);
    }
  }}return bad;
}
function sameTree(a,b){assert.deepEqual(inventory(a),inventory(b),'tree mismatch '+a+' / '+b);}
function checkManifest(dir,m){const t=m.text;const b=fs.readFileSync(path.join(dir,t.file));assert.equal(b.length,t.bytes);assert.equal(sha(b),t.sha256);}
const report={date:new Date().toISOString(),checks:[],limits:['Maintainer semantic review, not independent model execution or user acceptance','No external service/model/project workflow test','Two installation roots only; session loading and other hosts unknown','Remote content not queried; no Git publication authorized']};
function check(name,fn){const detail=fn();report.checks.push({name,status:'passed',...(detail===undefined?{}:{detail})});}
check('Exact replica note/version deltas and support-file preservation',()=>{cp.execFileSync(process.execPath,[out+'/scripts/check-labels.cjs'],{stdio:'pipe'});return '10 skills; no algorithm/script change';});
check('Previously completed skills preserved, including all four 17-file mainline identities',()=>{
  let count=0;for(const[k,v]of Object.entries(before.trees.skills)){if(k==='handoff-context/SKILL.md'||replicas.some(n=>k===n+'/SKILL.md'))continue;assert.equal(sha(fs.readFileSync('skills/'+k)),v.sha256,k);count++;}
  assert.equal(walk('skills').length,Object.keys(before.trees.skills).length);
  for(const[k,v]of Object.entries(before.trees.variants))assert.equal(sha(fs.readFileSync('variants/'+k)),v.sha256,k);
  for(const[k,v]of Object.entries(before.trees.corpus)){if(k.startsWith('1028-original/handoff-note/'))continue;assert.equal(sha(fs.readFileSync('corpus/'+k)),v.sha256,k);}
  return {unchangedSkillFiles:count,unchangedPriorVariantFiles:Object.keys(before.trees.variants).length};
});
check('Installed mainlines match complete repo trees, protected installations unchanged',()=>{
  for(const n of mainlines)sameTree('skills/'+n,'C:/Users/Aiano/.agents/skills/'+n);
  for(const[dir,state]of Object.entries(before.installs)){if(!state)continue;for(const[k,v]of Object.entries(state)){if(dir.endsWith('/handoff-context')&&k==='SKILL.md')continue;assert.equal(sha(fs.readFileSync(dir+'/'+k)),v.sha256,dir+'/'+k);}}
  return '7 installed trees same; only handoff entry changed this task';
});
check('No strict/corpus discovery or unintended installations',()=>{
  for(const base of ['variants/1028-strict','corpus/1028-original'])assert.equal(walk(base).some(p=>path.basename(p).toLowerCase()==='skill.md'),false);
  for(const base of ['C:/Users/Aiano/.agents/skills','C:/Users/Aiano/.codex/skills']){for(const n of [...strict,...replicas])assert.equal(fs.existsSync(base+'/'+n),false,base+'/'+n);}
  return '5 disabled variants, 10 replicas absent in both install roots';
});
check('Sealed handoff corpus identity and screenshot identity',()=>{
  const dir='corpus/1028-original/handoff-note',m=JSON.parse(read(dir+'/MANIFEST.json'));checkManifest(dir,m);
  const source='C:/Users/Aiano/Desktop/research_reports/reports/technology/外部Skill翻新_1028版/originals';
  for(const s of m.sources)assert.equal(sha(fs.readFileSync(source+'/'+s.file)),s.sha256);
  assert.throws(()=>checkManifest(dir,{...m,text:{...m.text,sha256:'0'.repeat(64)}}));
  return {pages:[29,30],negativeMutation:'wrong fingerprint rejected'};
});
check('All five original texts ignored and not tracked',()=>{for(const n of strict){const p='corpus/1028-original/'+n+'/original.txt';assert.equal(git(['check-ignore','--',p]),p);assert.equal(git(['ls-files','--',p]),'');}return 5;});
check('Index coverage, path and version consistency with negative tests',()=>{
  const i=read('SKILLS-INDEX.md'),count=checkRegistry(i);
  assert.throws(()=>checkRegistry(i.replace('[1.0.3](skills/handoff-context/SKILL.md)','[9.9.9](skills/handoff-context/SKILL.md)')));
  assert.throws(()=>checkRegistry(i.replace('skills/handoff-context/SKILL.md','skills/ABSENT/SKILL.md')));
  assert.throws(()=>checkRegistry(i+'\n[1.0.3](skills/handoff-context/SKILL.md)'));
  return {entries:count,negativeTests:['version drift','missing path/entry','duplicate entry']};
});
check('Affected Markdown links and index anchor',()=>{
  const files=['README.md','SKILLS-INDEX.md','skills/handoff-context/SKILL.md',...replicas.map(n=>'skills/'+n+'/SKILL.md'),...walk('variants/1028-strict/handoff-note').filter(p=>/\.md(?:\.disabled)?$/.test(p)),...walk('corpus/1028-original/handoff-note').filter(p=>p.endsWith('.md')),...walk(out).filter(p=>p.endsWith('.md'))];
  let count=0;for(const file of files){assert.deepEqual(brokenLinks(file,read(file)),[],file);count++;}
  assert.deepEqual(brokenLinks('SKILLS-INDEX.md','[bad](ABSENT.md)'),['ABSENT.md']);
  assert.deepEqual(brokenLinks('SKILLS-INDEX.md','[bad](#absent-heading)'),['#absent-heading']);
  return {files:count,negativeTests:['broken file','broken anchor']};
});
check('Public index/derivative privacy and whitespace',()=>{
  const files=['SKILLS-INDEX.md',...walk('variants/1028-strict/handoff-note'),...replicas.map(n=>'skills/'+n+'/SKILL.md')];
  for(const file of files){const t=read(file);assert.equal(/C:[\\/]Users|(?:sk-[A-Za-z0-9]{20,})|Bearer [A-Za-z0-9._-]{20,}/.test(t),false,file);assert.equal(t.includes('\uFFFD'),false,file);assert.equal(/[ \t]+$/m.test(t),false,file);}
  git(['diff','--check']);return files.length;
});
check('No Git commit, ref/tag, or staged-content changes',()=>{assert.equal(git(['rev-parse','HEAD']),before.git.head);assert.equal(git(['show-ref']),before.git.refs);assert.equal(git(['diff','--cached','--name-only']),'');return before.git.head;});
check('Official entrypoint format validation in isolated strict staging',()=>{
  const validator='C:/Users/Aiano/.codex/skills/.system/skill-creator/scripts/quick_validate.py';
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'lineage-skill-format-'));const logs=[];
  for(const n of [...mainlines,...replicas]){const output=cp.execFileSync('uv',['run','--with','PyYAML','python','-X','utf8',validator,'skills/'+n],{encoding:'utf8'});logs.push({name:n,kind:'repo',output:output.trim()});}
  for(const n of strict){const dir=path.join(temp,n);fs.mkdirSync(dir);fs.copyFileSync('variants/1028-strict/'+n+'/SKILL.md.disabled',path.join(dir,'SKILL.md'));const output=cp.execFileSync('uv',['run','--with','PyYAML','python','-X','utf8',validator,dir],{encoding:'utf8'});logs.push({name:n,kind:'isolated-strict',output:output.trim()});}
  const output=cp.execFileSync('uv',['run','--with','PyYAML','python','-X','utf8',validator,'C:/Users/Aiano/.agents/skills/handoff-context'],{encoding:'utf8'});logs.push({name:'handoff-context',kind:'installed',output:output.trim()});
  report.formatLogs=logs;return {validations:logs.length,strictStaging:'isolated temporary root, never installation'};
});
report.status='passed-with-stated-limits';fs.writeFileSync(out+'/validation.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
