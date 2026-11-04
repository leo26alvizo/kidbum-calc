'use strict';
/* Real browser smoke tests. Uses Chrome/Chromium preinstalled in GitHub Actions. */
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const cp=require('node:child_process');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const browser=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable']
 .filter(Boolean).find(p=>fs.existsSync(p));
assert.ok(browser,'Chrome/Chromium not available');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'pharma-ux-browser-'));
const source=fs.readFileSync(path.join(root,'pharma-pro.html'),'utf8');
const injectedScript = "<script>\nwindow.addEventListener('error',e=>window.__pharmaErrors.push(String(e.message)));\nfunction pharmaSmoke(){\n const tests=[];\n function check(name,fn){\n  try{const value=fn();if(value===false)throw Error('False');tests.push({name,pass:true});}\n  catch(error){tests.push({name,pass:false,message:String(error)});}\n }\n const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];\n const click=s=>{const x=$(s);if(!x)throw Error('Missing '+s);x.click();};\n const input=(s,value)=>{const x=$(s);if(!x)throw Error('Missing '+s);x.value=value;x.dispatchEvent(new Event('input',{bubbles:true}));};\n check('No runtime errors on initial load',()=>window.__pharmaErrors.length===0);\n check('Catalog 227 and first page 24',()=>window.KidBumPharmaCore.records.length===227&&all('#drug-grid .med-card').length===24);\n check('Three existing modes preserved',()=>all('[data-pharma-view]').length===3);\n check('All original 15 guide routes',()=>window.KidBumPharmaCore.conditions.length===15);\n check('No unexpected initial layout overflow',()=>document.documentElement.scrollWidth<=window.innerWidth+4);\n check('Drug search yields ceftriaxone',()=>{\n  input('#quick-search','ceftriaxona');\n  return all('#drug-grid .med-card').length>=1&&$('#quick-suggestions').textContent.toLowerCase().includes('ceftriaxona');\n });\n check('Search suggestion opens safety-first rapid sheet',()=>{\n  click('#quick-suggestions button');\n  return !$('#detail').classList.contains('hidden')&&\n   !$('#pharma-ux-quick').classList.contains('hidden')&&\n   $('#pharma-ux-full').classList.contains('hidden')&&\n   $('#pharma-ux-quick').textContent.includes('calcio');\n });\n check('Full sheet renders monograph without removing gate',()=>{\n  click('.pharma-ux-switcher button:nth-child(2)');\n  return !$('#pharma-ux-full').classList.contains('hidden')&&\n   all('.pharma-ux-fold').length>=4&&\n   Boolean($('#pharma-ux-full .pm-verified form'))&&\n   $('#pharma-ux-full').textContent.includes('NO se publica');\n });\n check('Unanswered monograph check remains fail-closed',()=>{\n  const form=$('#pharma-ux-full .pm-verified form');\n  if(!form)throw Error('No monograph form');\n  const details=form.closest('details');if(details)details.open=true;\n  form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));\n  const output=$('#pharma-ux-full .pm-verified .tool-result');\n  return Boolean(output)&&output.textContent.includes('NO MOSTRAR PAUTA');\n });\n check('Toggle shared theme dark and light',()=>{\n  click('#theme');\n  const dark=document.documentElement.classList.contains('dark')&&localStorage.getItem('kidbum-theme')==='dark';\n  click('#theme');\n  return dark&&!document.documentElement.classList.contains('dark')&&localStorage.getItem('kidbum-theme')==='light';\n });\n check('Favorite medication persists local identifier',()=>{\n  click('#detail .detail-header button');\n  return JSON.parse(localStorage.getItem('kidbum-pharma-favorite-drugs')||'[]').includes('ceftriaxona');\n });\n check('Back returns original filtered catalog',()=>{\n  click('#detail>.back');\n  return $('#detail').classList.contains('hidden')&&!$('#browse').classList.contains('hidden')&&\n   $('#quick-search').value==='ceftriaxona';\n });\n check('Favorite filter still works',()=>{\n  click('[data-pop=\"favorites\"]');\n  return $('#count').textContent.includes('1 de 227');\n });\n check('Disease route navigation remains available',()=>{\n  click('[data-pharma-view=\"diseases\"]');\n  return !$('#disease-finder').classList.contains('hidden')&&\n   $('#browse').classList.contains('hidden')&&\n   $('#disease-count').textContent.includes('15');\n });\n check('Disease search stays within validated 15 routes',()=>{\n  input('#quick-search','Gota');\n  return all('#disease-results .disease-card').length===2;\n });\n check('Keyboard combobox moves active descendant',()=>{\n  const q=$('#quick-search');\n  q.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true}));\n  const first=q.getAttribute('aria-activedescendant')==='pharma-suggest-0';\n  q.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true}));\n  return first&&q.getAttribute('aria-activedescendant')==='pharma-suggest-1'&&\n   $('#pharma-suggest-1').getAttribute('aria-selected')==='true';\n });\n check('Safety mode still provides original audit',()=>{\n  click('[data-pharma-view=\"safety\"]');\n  return !$('#tools').classList.contains('hidden')&&\n   Boolean($('#tool-panel #audit-drug'))&&\n   $('#browse').classList.contains('hidden');\n });\n check('No browser exceptions after interactions',()=>window.__pharmaErrors.length===0);\n const output=document.createElement('output');output.id='kidbum-qa';\n output.setAttribute('data-report',encodeURIComponent(JSON.stringify(tests)));\n document.body.append(output);\n}\nwindow.addEventListener('load',()=>setTimeout(pharmaSmoke,250));\n</script>";

let fixture=source.replace('<body><main>','<body><script>window.__pharmaErrors=[];</script><main>');
assert.notEqual(fixture,source,'Unable to inject early error handler');
assert.ok(fixture.includes('</body>'));
fixture=fixture.replace('</body>',injectedScript+'\n</body>');
const fixturePath=path.join(root,'.pharma-browser-fixture-'+process.pid+'.html');
fs.writeFileSync(fixturePath,fixture);
try{
 const result=cp.spawnSync(browser,[
  '--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
  '--no-first-run','--allow-file-access-from-files','--disable-extensions',
  '--virtual-time-budget=5000','--window-size=390,844','--user-data-dir='+path.join(tmp,'profile'),
  '--dump-dom','file://'+fixturePath
 ],{cwd:root,encoding:'utf8',timeout:45000,maxBuffer:8*1024*1024});
 assert.equal(result.status,0,'Chromium failed: '+(result.stderr||'').slice(-900));
 const m=result.stdout.match(/id="kidbum-qa" data-report="([^"]+)"/);
 assert.ok(m,'Browser did not complete smoke tests; stderr: '+(result.stderr||'').slice(-1100));
 const report=JSON.parse(decodeURIComponent(m[1]));
 for(const x of report)console.log((x.pass?'PASS':'FAIL')+' '+x.name+(x.message?' :: '+x.message:''));
 const fails=report.filter(x=>!x.pass);
 assert.equal(fails.length,0,fails.length+' browser UX tests failed');
 console.log('Pharma UX real Chromium smoke PASS: '+report.length+' scenarios');
}finally{
 fs.rmSync(fixturePath,{force:true});
 fs.rmSync(tmp,{recursive:true,force:true});
}
