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
const injectedScript = "<script>window.addEventListener('error',e=>window.__pharmaErrors.push(String(e.message)));\nwindow.addEventListener('load',()=>setTimeout(()=>{const tests=[],q=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];function check(name,f){try{if(!f())throw Error('False');tests.push({name,pass:true});}catch(e){tests.push({name,pass:false,message:String(e)});}}function click(s){const n=q(s);if(!n)throw Error('Missing '+s);n.click();}function change(s,v){q(s).value=v;q(s).dispatchEvent(new Event('change',{bubbles:true}));}const L=window.KidBumPharmaCore;\ncheck('Catalog and dynamic counts',()=>L.records.length>1500&&q('#num-meds').textContent.includes(L.records.length)&&q('#cj-route-count').textContent.includes(L.conditions.length));\ncheck('Dashboard and quick actions',()=>all('.cj-action').length===9&&all('.cj-bottom button').length===4&&!q('#cj-dashboard').hidden);\ncheck('High risk filter',()=>{click('.cj-action[data-tone=\"risk\"]');return q('[data-pop=\"high\"]').classList.contains('active')&&all('#drug-grid .med-card').every(x=>L.byId[x.dataset.drugId].highRisk);});\ncheck('Home restores library',()=>{click('[data-nav=\"home\"]');return !q('#cj-dashboard').hidden&&q('[data-pop=\"all\"]').classList.contains('active');});\ncheck('Comparator uses same group',()=>{all('.cj-action').find(x=>x.textContent.includes('Comparar')).click();const pair=Object.entries(Object.groupBy(L.records,x=>x.group)).find(([g,ds])=>ds.length>1);change('#cj-compare-group',pair[0]);change('#cj-compare-a',pair[1][0].id);change('#cj-compare-b',pair[1][1].id);return all('.cj-compare-card').length===2&&q('#cj-extra').textContent.includes('No compara eficacia');});\ncheck('IV list restricts presentation',()=>{click('[data-nav=\"home\"]');all('.cj-action').find(x=>x.textContent.includes('Referencias IV')).click();return q('#cj-extra').textContent.includes('Cefepima')&&!q('#cj-extra').textContent.includes('Ketorolaco');});\ncheck('Hospital reference retains gate',()=>{all('.cj-extra-list button').find(x=>x.textContent.includes('Cefepima')).click();const form=q('#pharma-ux-full .pharma-evidence-dossier form');if(!form)throw Error('No form');form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return q('#pharma-ux-full').textContent.includes('Bloqueada: faltan verificaciones obligatorias')&&!q('.pharma-hospital-table-scroll');});\ncheck('Detail tabs and hospital source',()=>all('.cj-detail-nav button').length===4&&q('#pharma-ux-full').textContent.includes('sin validación independiente'));\ncheck('Recent history local session',()=>{click('[data-nav=\"home\"]');return q('#cj-recent-list').textContent.includes('Cefepima');});\ncheck('Clear recent',()=>{click('#cj-clear-recent');return !q('#cj-recent-list').textContent.includes('Cefepima');});\ncheck('Safety navigation',()=>{click('[data-nav=\"safety\"]');return !q('#tools').classList.contains('hidden')&&!!q('#pharma-recon-form');});\ncheck('Dark theme',()=>{click('#theme');return getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()==='#2b202d';});\ncheck('No lateral overflow',()=>document.documentElement.scrollWidth<=window.innerWidth+4);\ncheck('No JS exceptions',()=>window.__pharmaErrors.length===0);\nconst o=document.createElement('output');o.id='kidbum-qa';o.setAttribute('data-report',encodeURIComponent(JSON.stringify(tests)));document.body.append(o);},250));</script>";
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
 console.log('Pharma Coral & Jade Chromium smoke PASS: '+report.length+' scenarios');
}finally{
 fs.rmSync(fixturePath,{force:true});
 fs.rmSync(tmp,{recursive:true,force:true});
}
