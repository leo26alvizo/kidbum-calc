'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process'),os=require('node:os'),path=require('node:path');
const root=path.resolve(__dirname,'..'),home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(fs.existsSync);
assert.ok(chrome,'Chromium required for real catalog QA');
const fixture=path.join(root,'.catalog-count-browser-qa-'+process.pid+'.html');
const injected="<script>\nwindow.__countQAErrors=[];window.addEventListener('error',e=>window.__countQAErrors.push(e.message));\nwindow.addEventListener('load',()=>setTimeout(()=>{\n const results=[],$=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];\n const check=(label,fn)=>{try{if(fn()!==true)throw Error('false');results.push({label,ok:true});}catch(e){results.push({label,ok:false,error:String(e)});}};\n const visible=()=>all('#calc-list article.calc-card:not([data-pharma-open])').length;\n const chip=(cat)=>all('#chips [data-cat]').find(x=>x.dataset.cat===cat);\n const expected={'Todas':138,'Pediatría':35,'Urgencias y Terapia Intensiva':21,'Endocrinología y Diabetes':6,'Geriatría':10,'Hepatología':9,'Cardiología':11,'Ginecología y obstetricia':7};\n check('138 global quick-stat badge',()=>Number($('.quick-stats .mini-stat strong')?.textContent)===138);\n check('138 visible calculator cards on Todas with no search',()=>visible()===138);\n check('PASS and gasometry have distinct launch cards',()=>all('[data-ped-rapid=\"pas\"]').length===1&&all('[data-gasometria-open]').length===1);\n check('Every specialty has correct global-category badge and visible cards',()=>{\n  for(const c of all('#chips [data-cat]').map(x=>x.dataset.cat)){\n   const target=chip(c);if(!target)throw Error('No chip '+c);\n   const expectedBadge=Number(target.querySelector('.chip-count')?.textContent);\n   target.click();\n   const cards=visible();\n   if(cards!==expectedBadge)throw Error(c+': '+cards+' cards, chip says '+expectedBadge);\n   if(expected[c]!==undefined&&cards!==expected[c])throw Error(c+': expected '+expected[c]+', actual '+cards);\n   if(c==='Pediatría'&&all('#calc-list [data-pharma-open]').length!==1)throw Error('Pharma clinical module missing, intentionally not counted');\n  }\n  return true;\n });\n check('Returning to Todas restores 138 cards',()=>{chip('Todas').click();return visible()===138});\n check('Quick stats remain 138 after category navigation',()=>Number($('.quick-stats .mini-stat strong')?.textContent)===138);\n check('No uncaught JavaScript errors',()=>window.__countQAErrors.length===0);\n const o=document.createElement('output');o.id='catalog-count-browser-qa';o.dataset.report=encodeURIComponent(JSON.stringify(results));document.body.append(o);\n},430));\n</script>";
fs.writeFileSync(fixture,home.replace('</body>',injected+'</body>'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-catalog-count-'));
try{
 for(const [w,h] of [[390,844],[1366,900]]){
  const args=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--allow-file-access-from-files','--disable-extensions',
   '--virtual-time-budget=4600','--window-size='+w+','+h,'--user-data-dir='+path.join(tmp,'profile'+w),'--dump-dom','file://'+fixture];
  const p=cp.spawnSync(chrome,args,{cwd:root,encoding:'utf8',timeout:60000,maxBuffer:16*1024*1024});
  assert.equal(p.status,0,'Chromium failed at '+w+': '+(p.stderr||'').slice(-1400));
  const match=p.stdout.match(/id="catalog-count-browser-qa" data-report="([^"]+)"/);
  assert.ok(match,'Catalog counts test did not finish at '+w+': '+(p.stderr||'').slice(-1000));
  const items=JSON.parse(decodeURIComponent(match[1]));
  for(const x of items)console.log(w+' '+(x.ok?'PASS ':'FAIL ')+x.label+(x.error?' :: '+x.error:''));
  assert.equal(items.filter(x=>!x.ok).length,0,'Incorrect dynamic homepage catalog counts at '+w);
 }
 console.log('PASS catalog count 0.10.47 in real Chromium mobile and desktop.');
}finally{fs.rmSync(fixture,{force:true});fs.rmSync(tmp,{recursive:true,force:true});}
