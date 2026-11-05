'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(fs.existsSync);
assert.ok(chrome,'Chromium required for PAS layout QA');
const base=fs.readFileSync(path.join(root,'pediatria-pas.html'),'utf8');
const injected="<script>\nwindow.__pasLayoutErrors=[];\nwindow.addEventListener('error',e=>window.__pasLayoutErrors.push(String(e.message)));\nfunction layoutQA(){\n const results=[],$=s=>document.querySelector(s);\n const check=(name,fn)=>{try{if(fn()===false)throw Error('false');results.push({name,ok:true});}catch(e){results.push({name,ok:false,error:String(e)});}};\n const hero=$('.pas-hero'),photo=$('.pas-cover-photo-img'),aside=$('.pas-sidebar'),main=$('#pas-calculator');\n check('User photograph loads as local WebP',()=>photo?.complete&&photo.naturalWidth===1200&&photo.naturalHeight===900);\n check('Photo is visible at top and before questions',()=>hero&&photo&&photo.getBoundingClientRect().height>175&&\n  hero.compareDocumentPosition(main)&Node.DOCUMENT_POSITION_FOLLOWING);\n check('Cover has meaningful surgical-alt text',()=>photo.getAttribute('alt').includes('apendicectomía')&&photo.getAttribute('fetchpriority')==='high');\n check('All patient-input/clinical sections precede result',()=>{\n  const sections=['#pas-patient-title','#pas-history-title','#pas-exam-title','#pas-labs-title','#pas-education-title'];\n  return sections.every(s=>$(s)&&$(s).compareDocumentPosition(aside)&Node.DOCUMENT_POSITION_FOLLOWING);\n });\n check('Result and semáforo are visually AFTER complete form',()=>{\n  const a=aside.getBoundingClientRect(),m=main.getBoundingClientRect();\n  return a.top>=m.bottom-2&&$('.pas-traffic').getBoundingClientRect().top>=a.top;\n });\n check('Results panel is never sticky and not ordered above questions',()=>{\n  const sideStyle=getComputedStyle(aside),cardStyle=getComputedStyle($('#pas-outcome'));\n  return sideStyle.order!=='-1'&&cardStyle.position!=='sticky';\n });\n check('No first-screen PAS score near cover',()=>$('.pas-hero-tags')?.textContent.includes('Resultado al final')&&\n  !$('.pas-hero-tags').textContent.includes('0–3'));\n check('Jump to results anchor is present',()=>$('#pas-results')&&$('.pas-finish-strip a')?.getAttribute('href')==='#pas-results');\n check('Status still updates without a blank result on input',()=>{\n  const age=$('#pas-age');age.value='10';age.dispatchEvent(new Event('input',{bubbles:true}));\n  return $('#pas-risk-name').textContent.includes('incompleta')&&$('#pas-outcome').dataset.band==='pending';\n });\n check('Theme works with surgical photo',()=>{\n  $('#pas-theme').click();const dark=document.documentElement.classList.contains('dark');\n  $('#pas-theme').click();\n  return dark&&!document.documentElement.classList.contains('dark')&&photo.naturalWidth===1200;\n });\n check('No horizontal overflow',()=>document.documentElement.scrollWidth<=innerWidth+4);\n check('No uncaught runtime errors',()=>window.__pasLayoutErrors.length===0);\n const out=document.createElement('output');out.id='pas-layout-browser-qa';out.setAttribute('data-report',encodeURIComponent(JSON.stringify(results)));document.body.append(out);\n}\nwindow.addEventListener('load',()=>setTimeout(layoutQA,350));\n</script>";
const fixture=path.join(root,'.pas-layout-browser-'+process.pid+'.html');
fs.writeFileSync(fixture,base.replace('</body>',injected+'</body>'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-pas-cover-'));
try{
 for(const [w,h] of [[390,844],[1366,900]]){
  const args=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
   '--no-first-run','--allow-file-access-from-files','--disable-extensions',
   '--virtual-time-budget=4000','--window-size='+w+','+h,'--user-data-dir='+path.join(tmp,'profile'+w),'--dump-dom','file://'+fixture];
  const p=cp.spawnSync(chrome,args,{cwd:root,encoding:'utf8',timeout:60000,maxBuffer:12*1024*1024});
  assert.equal(p.status,0,'Chromium failed '+w+': '+(p.stderr||'').slice(-1000));
  const match=p.stdout.match(/id="pas-layout-browser-qa" data-report="([^"]+)"/);
  assert.ok(match,'PAS browser test did not finish: '+w+' '+(p.stderr||'').slice(-1000));
  const tests=JSON.parse(decodeURIComponent(match[1]));
  for(const test of tests)console.log(w+' '+(test.ok?'PASS ':'FAIL ')+test.name+(test.error?' :: '+test.error:''));
  assert.equal(tests.filter(x=>!x.ok).length,0,'PAS 0.10.46 browser QA failure at '+w);
 }
 console.log('PAS photographic cover and results-last responsive Chromium PASS.');
}finally{fs.rmSync(fixture,{force:true});fs.rmSync(tmp,{recursive:true,force:true});}
