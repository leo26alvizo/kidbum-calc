'use strict';
/* KidBum result presentation regression, no clinical formula changes. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const home=read('index.html'),sw=read('sw.js'),css=read('assets/result-clarity-v01059.css');
assert.match(home,/assets\/result-clarity-v01059\.css/);
assert.match(sw,/'\.\/assets\/result-clarity-v01059\.css'/,'New CSS is offline precached');
assert.match(sw,/result-clarity-v01059/,'Cache version updated');
assert.match(home,/class="panel result-panel kb-result-modern"/);
assert.match(home,/id="result-progress"/);
assert.match(home,/id="result-state"/);
assert.match(home,/id="result-missing"/);
assert.match(home,/id="kb-copy-brief" disabled/);
assert.match(home,/if\(res\.missing\)/);
assert.match(home,/if\(res\.error\)/);
assert.match(home,/res\.value===null\?'not-evaluable':'ready'/);
assert.match(home,/const res=validateClinicalInputs\(d,data\)\|\|engine\.calculate\(id,data\);latest=res/,'Existing engine call remains intact');
assert.match(home,/source=\(refs\[d\.id\]\|\|\[\]\)\[0\]/,'Summaries cite available references, not invented sources');
const copySource=home.slice(home.indexOf('async function copyBriefResult(){'),home.indexOf('const analysisModeInstructions='));
assert.ok(copySource.includes("el('#result-value').textContent"),'Summary uses displayed result');
assert.ok(!copySource.includes("el('#f-'"),'Summary must not copy entered clinical form fields');
assert.ok(!copySource.includes('localStorage')&&!copySource.includes('fetch('),'Summary is manual and local');
assert.match(copySource,/if\(!d\|\|!res\|\|res\.missing\|\|res\.error\|\|res\.value===null\)return/,'Unsafe/incomplete results not copied');
for(const page of ['guardia-pro.html','geriatria-escalas.html','hepatologia-indices.html','expansion-20.html','escalas-cardioembolia.html','capurro.html']){
 assert.match(read(page),/assets\/result-clarity-v01059\.css/,'New result styling missing from '+page);
 assert.match(read(page),/kb-result-surface/,'Result surface missing from '+page);
}
assert.match(css,/forced-colors:active/);
assert.match(css,/prefers-reduced-motion:reduce/);
assert.match(css,/max-width:760px/);
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(x=>fs.existsSync(x));
assert.ok(chrome,'Chromium required to verify mobile and desktop results');
function smoke(){
 const report=[],q=s=>document.querySelector(s);
 const check=(name,fn)=>{try{if(!fn())throw Error('Expected true');report.push({name,ok:true});}catch(e){report.push({name,ok:false,error:String(e)});}};
 check('Main runtime loads with no errors',()=>Boolean(window.KidBumAccess)&&window.__kbResultErrors.length===0);
 const input=q('#search-input');input.value='gcs';input.dispatchEvent(new Event('input',{bubbles:true}));
 check('GCS appears in global search',()=>Boolean(q('#kb-access-slot [data-kb-open="calc:gcs"]')));
 q('#kb-access-slot [data-kb-open="calc:gcs"]')?.click();
 check('Missing fields are stated by name',()=>q('#result-state')?.textContent==='Datos pendientes'&&!q('#result-missing')?.hidden&&q('#result-missing li')?.textContent.includes('Respuesta'));
 check('Incomplete result cannot be copied',()=>q('#kb-copy-brief')?.disabled===true&&q('#result-value')?.textContent==='—');
 check('Progress counts required clinical fields',()=>q('#result-progress')?.textContent.includes('0 de 3'));
 check('Sources and limitations are visible',()=>Boolean(q('.kb-result-reference')?.textContent.includes('Fuente')));
 q('#example')?.click();
 check('Complete example reports the unchanged GCS result',()=>q('#result-value')?.textContent.trim().startsWith('15')&&q('#result-state')?.textContent==='Cálculo completado');
 check('Complete result allows manual summary copy',()=>q('#kb-copy-brief')?.disabled===false&&q('#result-interp')?.textContent.length>4);
 q('#reset')?.click();
 check('Reset revokes copy and restores pending state',()=>q('#kb-copy-brief')?.disabled===true&&q('#result-state')?.textContent==='Datos pendientes');
 check('No horizontal overflow',()=>document.documentElement.scrollWidth<=window.innerWidth+4);
 check('No runtime JS errors',()=>window.__kbResultErrors.length===0);
 const output=document.createElement('output');output.id='kb-result-smoke';output.setAttribute('data-report',encodeURIComponent(JSON.stringify(report)));document.body.append(output);
}
const inject='<script>window.__kbResultErrors=[];window.addEventListener("error",e=>window.__kbResultErrors.push(String(e.message)));</script>';
const footer='<script>(function(){let ran=false;function start(){if(ran)return;ran=true;setTimeout('+smoke.toString()+',1200)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();})();</script>';
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-results-'));
const file=path.join(root,'.kb-result-qa-'+process.pid+'.html');
try{
 fs.writeFileSync(file,home.replace('<body>','<body>'+inject).replace('</body>',footer+'</body>'));
 for(const [width,height] of [[390,844],[1366,900]]){
  const proc=cp.spawnSync(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--allow-file-access-from-files','--disable-extensions','--virtual-time-budget=13000','--window-size='+width+','+height,'--user-data-dir='+path.join(tmp,'profile-'+width),'--dump-dom','file://'+file],{cwd:root,encoding:'utf8',timeout:45000,maxBuffer:18*1024*1024});
  assert.equal(proc.status,0,'Chrome '+width+' failed: '+String(proc.stderr).slice(-900));
  const matched=proc.stdout.match(/id="kb-result-smoke" data-report="([^"]+)"/);
  assert.ok(matched,'Browser report missing '+width+'; stdout tail: '+String(proc.stdout).slice(-700)+'; stderr tail: '+String(proc.stderr).slice(-500));
  const results=JSON.parse(decodeURIComponent(matched[1]));
  for(const x of results)console.log((x.ok?'PASS ':'FAIL ')+width+'px · '+x.name+(x.error?' · '+x.error:''));
  assert.equal(results.filter(x=>!x.ok).length,0,'Result clarity browser failure '+width);
 }
}finally{fs.rmSync(file,{force:true});fs.rmSync(tmp,{recursive:true,force:true});}
console.log('PASS v0.10.59: result status, missing data, safe copy, sources, 6 standalone modules, offline and accessibility.');
