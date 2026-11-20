'use strict';
/* Browser smoke for 643 previously mapped medicines and 923 deliberately unmapped index entries. */
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable']
 .filter(Boolean).find(p=>fs.existsSync(p));
assert.ok(chrome,'Chrome required for Pharma browser smoke');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pharma-dx-'));
const page=fs.readFileSync(path.join(root,'pharma-pro.html'),'utf8');
const script="<script>\n"+
"window.addEventListener('load',()=>setTimeout(()=>{\n"+
" const tests=[];\n"+
" function check(name,run){try{const result=run();if(result===false)throw Error('False');tests.push({name,pass:true});}catch(e){tests.push({name,pass:false,message:String(e)});}}\n"+
" const $=selector=>document.querySelector(selector);\n"+
" const input=(selector,value)=>{const x=$(selector);if(!x)throw Error('Missing '+selector);x.value=value;x.dispatchEvent(new Event('input',{bubbles:true}));};\n"+
" check('Existing diagnosis links kept, 923 new entries explicitly unmapped',()=>window.KidBumPharmaDiagnosisCatalog.coverage.total===1566&&window.KidBumPharmaDiagnosisCatalog.coverage.mapped===643&&window.KidBumPharmaDiagnosisCatalog.coverage.missing===923);\n"+
" check('250 distinct clinical contexts',()=>window.KidBumPharmaDiagnosisCatalog.diagnoses.length===250);\n"+
" check('Verified pathways remain 15',()=>window.KidBumPharmaCore.conditions.length===15);\n"+
" check('No auto approval',()=>window.KidBumPharmaDiagnosisCatalog.coverage.verifiedIndependently===0);\n"+
" check('Card shows orientative mapped condition',()=>{const x=window.KidBumPharmaCore.byId.bimatoprost;return !!x&&window.KidBumPharmaDiagnosisCatalog.related(x.id)[0].name.includes('Glaucoma');});\n"+
" check('Opening medication displays diagnosis and warning',()=>{window.KidBumPharmaUI.openDrug('bimatoprost');const text=$('#pharma-ux-quick').textContent;return !$('#detail').classList.contains('hidden')&&text.includes('Glaucoma')&&text.includes('NO son indicaciones aprobadas');});\n"+
" check('Dose is not invented for editorial association',()=>$('#pharma-ux-quick').textContent.includes('Esquema NO cotejado'));\n"+
" check('Disease tab opens',()=>{window.KidBumPharmaUI.closeDrug();$('[data-pharma-view=\"diseases\"]').click();return !$('#disease-finder').classList.contains('hidden');});\n"+
" check('Diagnoses search finds glaucoma',()=>{input('#quick-search','glaucoma');return $('#pharma-dx-status').textContent.includes('643 de 1566')&&$('#pharma-dx-results').textContent.includes('Glaucoma');});\n"+
" check('Inverse listing includes bimatoprost',()=>{const b=$('#pharma-dx-results .pharma-dx-entry button');if(!b)throw Error('Missing map toggle');b.click();return $('#pharma-dx-results').textContent.includes('Bimatoprost');});\n"+
" check('Inverse linked medicine opens original detail',()=>{const b=[...document.querySelectorAll('#pharma-dx-results .pharma-dx-meds button')].find(x=>x.textContent.includes('Bimatoprost'));if(!b)throw Error('No bimatoprost');b.click();return !$('#detail').classList.contains('hidden')&&$('#pharma-ux-quick').textContent.includes('Glaucoma');});\n"+
" check('No horizontal overflow',()=>document.documentElement.scrollWidth<=window.innerWidth+4);\n"+
" check('No uncaught runtime errors',()=>window.__pharmaDxErrors.length===0);\n"+
" const out=document.createElement('output');out.id='pharma-dx-qa';out.dataset.results=encodeURIComponent(JSON.stringify(tests));document.body.append(out);\n"+
"},250));\n</script>";
let fixture=page.replace('<body><main>','<body><script>window.__pharmaDxErrors=[];window.addEventListener("error",e=>window.__pharmaDxErrors.push(String(e.message)));</script><main>');
assert.notEqual(fixture,page);
fixture=fixture.replace('</body>',script+'</body>');
const fixtureFile=path.join(root,'.pharma-dx-qa-'+process.pid+'.html');
fs.writeFileSync(fixtureFile,fixture);
try{
 const r=cp.spawnSync(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
  '--no-first-run','--allow-file-access-from-files','--disable-extensions','--virtual-time-budget=6000',
  '--window-size=390,844','--user-data-dir='+path.join(dir,'profile'),'--dump-dom','file://'+fixtureFile],
 {cwd:root,encoding:'utf8',timeout:40000,maxBuffer:8*1024*1024});
 assert.equal(r.status,0,'Chrome failed: '+String(r.stderr).slice(-1200));
 const m=r.stdout.match(/id="pharma-dx-qa" data-results="([^"]+)"/);
 assert.ok(m,'Browser report missing: '+String(r.stderr).slice(-800));
 const tests=JSON.parse(decodeURIComponent(m[1]));
 for(const x of tests)console.log((x.pass?'PASS':'FAIL')+' '+x.name+(x.message?' :: '+x.message:''));
 assert.equal(tests.filter(x=>!x.pass).length,0,'Pharma diagnosis browser regression');
 console.log('PASS diagnosis browser integration: '+tests.length+' Chrome checks');
}finally{fs.rmSync(fixtureFile,{force:true});fs.rmSync(dir,{recursive:true,force:true});}
