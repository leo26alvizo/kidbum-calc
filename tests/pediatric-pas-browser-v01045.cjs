'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(fs.existsSync);
assert.ok(chrome,'Chromium required for PAS UX QA');
const base=fs.readFileSync(path.join(root,'pediatria-pas.html'),'utf8');
const injected="<script>\nwindow.__pasErrors=[];window.addEventListener('error',e=>window.__pasErrors.push(String(e.message)));\nwindow.addEventListener('load',()=>setTimeout(()=>{\n const tests=[],$=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];\n const check=(name,fn)=>{try{if(!fn())throw Error('false');tests.push({name,pass:true});}catch(e){tests.push({name,pass:false,error:String(e)});}};\n const select=(id,v)=>$('[data-criterion=\"'+id+'\"] [data-value=\"'+v+'\"]').click();\n const keys=window.KidBumPAS.criteria.map(c=>c.key);\n check('Exactly eight binary criteria and zero numeric or extra fields',()=>all('[data-criterion]').length===8&&all('[data-criterion] button').length===16&&all('input,[data-flag]').length===0);\n check('Initial state does not imply negatives',()=>all('[data-criterion] [aria-pressed=\"true\"]').length===0&&$('#pas-points').textContent==='—'&&$('#pas-copy').disabled);\n check('Partial result stays pending',()=>{select('migration','yes');return $('#pas-points').textContent==='—'&&$('#pas-range').textContent.includes('1–10');});\n check('All No gives zero',()=>{keys.forEach(k=>select(k,'no'));return $('#pas-points').textContent==='0'&&$('#pas-outcome').dataset.band==='score';});\n check('All Yes gives ten',()=>{keys.forEach(k=>select(k,'yes'));return $('#pas-points').textContent==='10';});\n check('Lab binary buttons each contribute one',()=>{select('wbc','no');select('anc','no');return $('#pas-points').textContent==='8';});\n check('Fictional example gives seven',()=>{$('#pas-example').click();return $('#pas-points').textContent==='7'&&!$('#pas-example-note').hidden;});\n check('Clear resets all eight criteria',()=>{$('#pas-clear-top').click();return $('#pas-points').textContent==='—'&&all('[data-criterion] [aria-pressed=\"true\"]').length===0&&$('#pas-example-note').hidden;});\n check('Bottom reset also clears',()=>{$('#pas-example').click();$('#pas-reset').click();return $('#pas-points').textContent==='—';});\n check('Theme toggles',()=>{const d=document.documentElement.classList.contains('dark');$('#pas-theme').click();return document.documentElement.classList.contains('dark')!==d;});\n check('Evidence links',()=>!!$('a[href*=\"hopkinsmedicine.org\"]'));\n check('No horizontal overflow',()=>document.documentElement.scrollWidth<=innerWidth+4);\n check('No runtime errors',()=>window.__pasErrors.length===0);\n const out=document.createElement('output');out.id='pas-browser-qa';out.setAttribute('data-report',encodeURIComponent(JSON.stringify(tests)));document.body.append(out);\n},350));\n</script>";
const fixture=path.join(root,'.pas-browser-qa-'+process.pid+'.html');
assert.ok(base.includes('</body>'));
fs.writeFileSync(fixture,base.replace('</body>',injected+'</body>'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-pas-'));
try{
 for(const [w,h] of [[390,844],[1366,900]]){
  const args=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--allow-file-access-from-files','--disable-extensions',
   '--virtual-time-budget=5500','--window-size='+w+','+h,'--user-data-dir='+path.join(tmp,'profile'+w),'--dump-dom','file://'+fixture];
  const p=cp.spawnSync(chrome,args,{cwd:root,encoding:'utf8',timeout:60000,maxBuffer:12*1024*1024});
  assert.equal(p.status,0,'Chromium nonzero '+w+': '+(p.stderr||'').slice(-1000));
  const match=p.stdout.match(/id="pas-browser-qa" data-report="([^"]+)"/);
  assert.ok(match,'PAS browser harness did not run at '+w+': '+(p.stderr||'').slice(-900));
  const checks=JSON.parse(decodeURIComponent(match[1]));
  for(const c of checks)console.log(w+' '+(c.pass?'PASS ':'FAIL ')+c.name+(c.error?' :: '+c.error:''));
  assert.equal(checks.filter(x=>!x.pass).length,0,'PAS UX failed on viewport '+w);
 }
 console.log('Pediatric PAS Chromium QA PASS — 390 mobile + 1366 desktop');
}finally{
 fs.rmSync(fixture,{force:true});fs.rmSync(tmp,{recursive:true,force:true});
}
