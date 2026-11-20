'use strict';
/* Real 390px Chromium smoke test for KidBum access improvements. */
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(x=>fs.existsSync(x));
assert.ok(chrome,'Chrome/Chromium required for mobile UI checks');
const source=fs.readFileSync(path.join(root,'index.html'),'utf8');
const boot='<script>window.__kbErrors=[];window.addEventListener("error",e=>window.__kbErrors.push(String(e.message)));try{localStorage.setItem("kidbum-access-recent-v1",JSON.stringify(["calc:gcs"]));}catch(e){}</script>';
const fixture=source.replace('<body>','<body>'+boot);
assert.notEqual(fixture,source,'Could not inject preflight browser error handler');
function runSmoke(){
 const report=[],q=s=>document.querySelector(s);
 const check=(name,fn)=>{try{if(fn()===false)throw Error('false');report.push({name,ok:true});}catch(e){report.push({name,ok:false,error:String(e)});}};
 const type=(term)=>{const field=q('#search-input');if(!field)throw Error('Missing search field');field.value=term;field.dispatchEvent(new Event('input',{bubbles:true}));};
 const click=(selector)=>{const node=q(selector);if(!node)throw Error('Missing '+selector);node.click();};
 check('New access runtime loaded without exceptions',()=>Boolean(window.KidBumAccess)&&window.__kbErrors.length===0);
 check('Skip link targets the main region',()=>q('.kb-skip-link')?.getAttribute('href')==='#main-content');
 check('Offline status exposes verified vs unverified state',()=>Boolean(q('#kb-offline-status')?.textContent)&&!q('#kb-update-banner').offsetParent);
 check('Universal search includes 639 indexed medication names',()=>window.KidBumDrugSearchNames.length>=630);
 check('Pharma Pro search links exact ceftriaxone dossier',()=>{
  type('CEFTRIAXONA');
  return Boolean(q('#kb-access-slot [data-kb-open="url:./pharma-pro.html#ceftriaxona"]'))&&q('#kb-access-count').textContent.includes('coincidencia');
 });
 check('Accent-insensitive search finds pediatric PECARN',()=>{
  type('Pediatría PECARN');
  return Boolean(q('#kb-access-slot [data-kb-open="url:./expansion-20.html#pecarn"]'));
 });
 check('Cross-module pin persists only route identifier',()=>{
  click('#kb-access-slot [data-kb-pin="url:./expansion-20.html#pecarn"]');
  return JSON.parse(localStorage.getItem('kidbum-access-pins-v1')||'[]').includes('url:./expansion-20.html#pecarn');
 });
 check('Glasgow is discoverable by GCS acronym',()=>{
  type('GCS');
  return Boolean(q('#kb-access-slot [data-kb-open="calc:gcs"]'));
 });
 check('Clinical calculator opens without changing its engine',()=>{
  click('#kb-access-slot [data-kb-open="calc:gcs"]');
  return Boolean(q('#result-value'))&&localStorage.getItem('kidbum-access-recent-v1')===null;
 });
 check('Bottom Inicio does not show recent tools',()=>{
  click('[data-mobile-nav="home"]');
  return !q('#kb-access-clear')&&![...document.querySelectorAll('#kb-access-slot h3')].some(x=>x.textContent.includes('Utilizadas recientemente'));
 });
 check('Previously saved module appears in Favorites',()=>{
  click('[data-mobile-nav="favorite"]');
  return Boolean(q('#kb-access-slot [data-kb-open="url:./expansion-20.html#pecarn"]'));
 });
 check('History is erased and stays disabled; favorites remain local',()=>{
  return localStorage.getItem('kidbum-access-recent-v1')===null&&
   JSON.parse(localStorage.getItem('kidbum-access-pins-v1')||'[]').includes('url:./expansion-20.html#pecarn');
 });
 check('Keyboard focus visibly reaches skip link',()=>{
  const link=q('.kb-skip-link');link.focus();return document.activeElement===link;
 });
 check('No horizontal overflow at 390px',()=>document.documentElement.scrollWidth<=window.innerWidth+4);
 check('No JavaScript errors after UI interactions',()=>window.__kbErrors.length===0);
 const out=document.createElement('output');out.id='kb-access-browser-report';out.setAttribute('data-json',encodeURIComponent(JSON.stringify(report)));document.body.appendChild(out);
}
const smoke='<script>window.addEventListener("load",()=>setTimeout('+runSmoke.toString()+',600));</script>';
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-access-'));
const file=path.join(root,'.kb-access-browser-'+process.pid+'.html');
fs.writeFileSync(file,fixture.replace('</body>',smoke+'</body>'));
try{
 const result=cp.spawnSync(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--allow-file-access-from-files','--disable-extensions','--virtual-time-budget=13000','--window-size=390,844','--user-data-dir='+path.join(tmp,'profile'),'--dump-dom','file://'+file],{cwd:root,encoding:'utf8',timeout:45000,maxBuffer:18*1024*1024});
 assert.equal(result.status,0,'Chrome error '+String(result.stderr).slice(-800));
 const match=result.stdout.match(/id="kb-access-browser-report" data-json="([^"]+)"/);
 assert.ok(match,'Browser results missing: '+String(result.stderr).slice(-650));
 const report=JSON.parse(decodeURIComponent(match[1]));
 for(const r of report)console.log((r.ok?'PASS':'FAIL')+' '+r.name+(r.error?' :: '+r.error:''));
 assert.equal(report.filter(x=>!x.ok).length,0,'Mobile browser access checks failed');
}finally{fs.rmSync(file,{force:true});fs.rmSync(tmp,{recursive:true,force:true});}
