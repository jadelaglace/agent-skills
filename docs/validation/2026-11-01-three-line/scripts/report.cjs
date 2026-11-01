// Local report projection and browser QC; never restores or installs Skills.
const fs=require('node:fs'), path=require('node:path'), crypto=require('node:crypto'), assert=require('node:assert/strict');
const {pathToFileURL,fileURLToPath}=require('node:url');
const modules='C:/Users/Aiano/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const repo='C:/Users/Aiano/codex-skills';
const markdown=path.join(repo,'docs/four-skills-three-line-plan.md');
const html='C:/Users/Aiano/Desktop/1028-four-skills-three-line-plan.html';
const output=path.join(repo,'docs/validation/2026-11-01-three-line');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex').toUpperCase();
const escape=t=>t.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
async function build(){
 const {marked}=await import(pathToFileURL(path.join(modules,'marked/lib/marked.esm.js')).href);
 const before=fs.readFileSync(html,'utf8'), css=before.match(/<style>([\s\S]*?)<\/style>/i);
 assert.ok(css,'Existing stylesheet required');
 const source=fs.readFileSync(markdown,'utf8'), toc=[];
 let heading=0;
 const renderer=new marked.Renderer();
 renderer.heading=function(token){const id='s'+heading++;if(token.depth===2)toc.push({id,text:token.text});return '<h'+token.depth+' id="'+id+'">'+this.parser.parseInline(token.tokens)+'</h'+token.depth+'>\n';};
 let body=marked.parse(source,{renderer,breaks:true});
 body=body.replace(/href="([^"]+)"/g,(all,href)=>/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(href)?all:'href="'+escape(new URL(href,pathToFileURL(markdown)).href)+'"');
 body=body.replace(/<table>/g,'<div class="table-scroll" tabindex="0" role="region" aria-label="可横向滚动的数据表"><table>').replace(/<\/table>/g,'</table></div>');
 const nav=toc.map(i=>'<a href="#'+i.id+'">'+escape(i.text)+'</a>').join('');
 const document='<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>四技能三线实施结果与完整计划 · 2026-11-01</title><style>'+css[1]+'</style></head><body><main><div class="eyebrow">2026-11-01 · 三线实施结果与完整计划</div><div class="banner">本机原名四件套已完成历史恢复、原则精炼和安装回读；1028 原文封存，严格变体不安装、不激活。没有 commit、push、tag 或 GitHub Release；实战与用户接受不冒充完成。</div><p class="source">唯一维护源：<a href="'+pathToFileURL(markdown).href+'">仓库详细计划 Markdown</a> · <a href="'+pathToFileURL(path.join(repo,'docs/four-skills-three-line-evidence.md')).href+'">实施证据</a>。本页是完整阅读副本；<a href="file:///C:/Users/Aiano/Desktop/1028-four-skills-merge-review.html">旧 31 项对照报告</a>仅作历史证据，不再授权直接融合。</p><nav aria-label="目录">'+nav+'</nav>'+body+'<p class="source">完整正文结束 · 2026-11-01 · 来源 SHA256：'+hash(Buffer.from(source))+'</p></main></body></html>\n';
 fs.writeFileSync(html,document);
 return {markdown,html,markdownSha256:hash(Buffer.from(source)),htmlSha256:hash(Buffer.from(document)),headings:heading,toc:toc.length};
}
async function inspect(){
 const {chromium}=require(path.join(modules,'playwright')),sharp=require(path.join(modules,'sharp'));
 let browser;
 try{browser=await chromium.launch({headless:true});}catch(error){const executablePath=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p));if(!executablePath)throw error;browser=await chromium.launch({headless:true,executablePath});}
 const result={mode:'long',profile:'preserved-existing-report',date:'2026-11-01',renderer:browser.version(),input:html,inputSha256:hash(fs.readFileSync(html)),views:[],limits:['Representative screenshots do not prove every pixel, usability or Skill behavior']};
 try{for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const name=viewport.width===1440?'desktop':'mobile',page=await browser.newPage({viewport,deviceScaleFactor:1}),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));
  await page.goto(pathToFileURL(html).href,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
  const geometry=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return {width:innerWidth,documentWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,uniqueIds:new Set(ids).size===ids.length,anchors:[...document.querySelectorAll('nav a')].map(a=>({href:a.getAttribute('href'),found:Boolean(document.querySelector(a.getAttribute('href')))})),badOverflow:[...document.querySelectorAll('h1,h2,h3,p,pre,nav,li')].filter(e=>!e.closest('.table-scroll')).filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+': '+e.textContent.slice(0,90)),links:[...document.querySelectorAll('a')].map(a=>a.href),footer:document.querySelector('main > p:last-child').textContent,tables:document.querySelectorAll('table').length,scrollTables:[...document.querySelectorAll('.table-scroll')].filter(e=>e.scrollWidth>e.clientWidth).length};});
  assert.equal(geometry.documentWidth,viewport.width,name+' page overflow');assert.ok(geometry.uniqueIds);assert.ok(geometry.anchors.every(a=>a.found));assert.deepEqual(geometry.badOverflow,[]);assert.deepEqual(errors,[]);
  const missingLocal=geometry.links.filter(h=>h.startsWith('file:')).filter(h=>!fs.existsSync(fileURLToPath(new URL(h))));assert.deepEqual(missingLocal,[],'Missing report link');assert.ok(geometry.footer.startsWith('完整正文结束'));
  // Edge fullPage captures beyond 16384px wrapped content in this environment.
  // Capture real viewport strips and compose; do not trust that successful PNG.
  const png=path.join(output,'report-'+name+'.png'),strips=[];
  for(let top=0;top<geometry.height;top+=viewport.height){
   const captureTop=Math.min(top,geometry.height-viewport.height);
   await page.evaluate(y=>scrollTo(0,y),captureTop);
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const actualTop=await page.evaluate(()=>scrollY);assert.equal(actualTop,captureTop);
   const bytes=await page.screenshot();
   const strip=await sharp(bytes).extract({left:0,top:top-captureTop,width:viewport.width,height:Math.min(viewport.height,geometry.height-top)}).toBuffer();
   strips.push({input:strip,left:0,top});
  }
  await sharp({create:{width:viewport.width,height:geometry.height,channels:3,background:'#f2f5f8'}}).composite(strips).png().toFile(png);
  const metadata=await sharp(png).metadata();assert.equal(metadata.width,viewport.width);assert.ok(Math.abs(metadata.height-geometry.height)<=1);
  const samples=[];for(const [label,selector]of [['top','main'],['layout','#s7'],['execution','#s17'],['terminal','#s21']]){const y=await page.locator(selector).evaluate(e=>Math.floor(e.getBoundingClientRect().top+scrollY));const top=label==='top'?0:Math.max(0,Math.min(y,metadata.height-viewport.height));const sample=path.join(output,'report-'+name+'-'+label+'.png');await sharp(png).extract({left:0,top,width:viewport.width,height:Math.min(viewport.height,metadata.height)}).toFile(sample);samples.push(sample);}
  result.views.push({name,viewport,scale:1,captureMethod:'actual-viewport-strips',stripCount:strips.length,...geometry,errors,missingLocal,png,pngSha256:hash(fs.readFileSync(png)),pngDimensions:{width:metadata.width,height:metadata.height},samples});await page.close();
 }}finally{await browser.close();}
 fs.writeFileSync(path.join(output,'report-qc.json'),JSON.stringify(result,null,2)+'\n');return result;
}
(async()=>console.log(JSON.stringify({build:await build(),qc:await inspect()},null,2)))().catch(e=>{console.error(e.stack);process.exitCode=1;});
