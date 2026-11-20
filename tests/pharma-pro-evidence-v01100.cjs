'use strict';
/* Evidence-specific scope: 40 priority, 9 prior gated label refs, 6 new safety-only
   audits. Never imply independent Mexican/clinical validation or unlock doses. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const read=p=>fs.readFileSync(p,'utf8'),html=read('pharma-pro.html'),sw=read('sw.js'),evidenceSource=read('assets/pharma-pro-evidence-v01100.js'),uiSource=read('assets/pharma-pro-evidence-ui-v01100.js'),parentUI=read('assets/pharma-pro-ui.js');
const scripts=[
 'assets/pharma-pro-expansion.js','assets/pharma-pro-guides-plus.js','assets/pharma-pro-expansion-index-v01043.js','assets/pharma-broad-index-v01058.js',
 'assets/pharma-pro-core.js','assets/pharma-pro-monographs.js','assets/pharma-pro-source-audit.js','assets/pharma-pro-high-alert.js','assets/pharma-pro-evidence-v01100.js'
];
const ctx={window:{}};for(const p of scripts)vm.runInNewContext(read(p),ctx,{filename:p,timeout:5000});
const lib=ctx.window.KidBumPharmaCore,prior=ctx.window.KidBumPharmaMonographs,evidence=ctx.window.KidBumPharmaEvidence;
assert.equal(lib.records.length,1566,'No loss in pharmaceutical index');
assert.equal(prior.records.length,9,'Existing nine fail-closed dose references preserved');
assert.equal(evidence.records.length,6,'Six additional audited safety dossiers');
assert.equal(evidence.priorityIds.length,40,'Exactly forty priorities');
assert.equal(new Set(evidence.priorityIds).size,40,'No duplicate priorities');
for(const id of evidence.priorityIds)assert.ok(lib.byId[id],'Priority must have valid catalog ID: '+id);
const report=evidence.summary(lib,prior);
assert.equal(report.priority,40);
assert.equal(report.scopedDose,9);
assert.equal(report.sourceSafety,6);
assert.equal(report.sourceChecked,15);
assert.equal(report.pending,25);
assert.equal(report.fullyApproved,0);
assert.equal(report.mexicanConfirmed,0);
assert.equal(report.totalIndex,1566);
const expected={
 'metoclopramida':['de55c133-eb08-4a35-91a2-5dc093027397',8,'2026-02-16'],
 'ibuprofeno':['d21129f8-4d96-4e36-bc39-a534306dd77e',16,'2026-11-02'],
 'cefepima':['de477f37-40f6-4295-ae72-a2ee36a8922e',24,'2026-09-24'],
 'cefazolina':['1dc9de56-e259-4546-a1db-23119a8a088e',13,'2026-05-20'],
 'ondansetron':['2fa30bdb-f60e-40a7-98b4-c346bc85d539',7,'2026-11-19'],
 'furosemida':['3ba730ab-90d4-478a-80b3-1ea3edb03e4d',18,'2026-11-18']
};
for(const [id,[setid,version,published]] of Object.entries(expected)){
 const d=evidence.byId[id];assert.ok(d,'Missing reviewed label '+id);
 assert.equal(d.source.setid,setid);
 assert.equal(d.source.version,version);
 assert.equal(d.source.published,published);
 assert.equal(d.source.url,'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid='+setid);
 assert.ok(d.source.sections.length>=5);
 assert.ok(d.formulation&&d.indications.length>=1&&d.cautions.length>=3&&d.interactions.length>=1&&d.monitoring.length>=2);
 assert.ok(d.adjustment&&d.pregnancy&&d.jurisdiction.includes('México'));
 assert.equal(d.hasRegimen,false);
 assert.equal(d.clinicalApproved,false);
 assert.equal(d.mexicanProductConfirmed,false);
 assert.equal(evidence.state(id,prior),'source-safety-only');
 assert.ok(!prior.byId[id],'Safety-only label must NOT silently extend preapproved dosing engine');
 assert.notEqual(prior.check(id,{population:'adult',allergy:'no'}).status,'reference','No new dose unlocked for '+id);
}
for(const m of prior.records)assert.equal(evidence.state(m.id,prior),'source-dose-partial');
assert.equal(evidence.state('vancomicina',prior),'priority-pending');
assert.equal(evidence.state('no-such-drug',prior),'index-pending');
assert.match(html,/id="pharma-evidence-board"/);
assert.match(html,/15 medicamentos con cotejo parcial/);
assert.match(html,/0 fichas con validación clínica\/farmacéutica independiente/);
assert.match(html,/assets\/pharma-pro-evidence-v01100\.js/);
assert.match(html,/assets\/pharma-pro-evidence-ui-v01100\.js/);
assert.match(html,/assets\/pharma-pro-evidence-v01100\.css/);
assert.ok(html.indexOf('pharma-pro-high-alert.js')<html.indexOf('pharma-pro-evidence-v01100.js'));
assert.ok(html.indexOf('pharma-pro-evidence-ui-v01100.js')<html.indexOf('pharma-pro-ui.js'));
for(const file of ['pharma-pro-evidence-v01100.js','pharma-pro-evidence-ui-v01100.js','pharma-pro-evidence-v01100.css'])assert.ok(sw.includes("'./assets/"+file+"'"),'Offline bundle missing '+file);
assert.match(sw,/pharma-evidence2-r1/);
assert.ok(parentUI.includes('KidBumPharmaEvidence?.byId[med.id]'),'Quick view status integrated');
assert.ok(parentUI.includes('KidBumPharmaEvidenceUI?.renderPriorityNotice(id)'),'Full view source embedded');
assert.ok(!uiSource.includes('localStorage')&&!uiSource.includes('fetch(')&&!uiSource.includes('innerHTML'),'Safety view stays local and sanitizes label content');
assert.match(uiSource,/SIN pauta posológica habilitada/);
assert.match(uiSource,/COFEPRIS/);
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(x=>fs.existsSync(x));
assert.ok(chrome,'Chromium required for mobile/desktop evidence UX');
function smoke(){
 const results=[],q=s=>document.querySelector(s),check=(name,fn)=>{try{if(!fn())throw Error('Check false');results.push({name,ok:true});}catch(err){results.push({name,ok:false,error:String(err)})}};
 check('Evidence dashboard mounted',()=>Boolean(q('#pharma-evidence-board .pharma-evidence-summary')));
 check('40 priority entries accessible',()=>document.querySelectorAll('#pharma-evidence-list .pharma-evidence-item').length===40);
 check('15 source-checked with zero clinical approvals',()=>q('#pharma-evidence-board')?.textContent.includes('15 de 40')&&q('#pharma-evidence-board')?.textContent.includes('0 con validación clínica independiente'));
 const button=q('.pharma-evidence-filters [data-filter="source-safety-only"]');
 button?.click();
 check('Safety-only filter shows six and none are regimens',()=>document.querySelectorAll('#pharma-evidence-list .pharma-evidence-item').length===6&&q('#pharma-evidence-count')?.textContent.includes('6 de 40'));
 const open=q('#pharma-evidence-list .pharma-evidence-item button');open?.click();
 check('Safety-reviewed medication opens existing drug page',()=>!!q('#detail')&&!q('#detail').classList.contains('hidden'));
 const full=[...document.querySelectorAll('#detail .pharma-ux-switcher button')].find(b=>b.textContent.includes('Ficha completa'));
 full?.click();
 check('Product-specific label shown with safety but no enabled dosage',()=>q('.pharma-evidence-dossier')?.textContent.includes('SIN dosis')&&q('.pharma-evidence-dossier')?.textContent.includes('DailyMed'));
 check('Existing clinical dose verification remains gated',()=>!window.KidBumPharmaMonographs.byId['metoclopramida']&&window.KidBumPharmaMonographs.check('metoclopramida',{}).status!=='reference');
 check('No horizontal overflow in responsive viewport',()=>document.documentElement.scrollWidth<=window.innerWidth+6);
 const out=document.createElement('output');out.id='kb-pharma-evidence-report';out.dataset.report=encodeURIComponent(JSON.stringify(results));document.body.append(out);
}
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-pharma2-')),file=path.join(process.cwd(),'.kb-pharma2-qa-'+process.pid+'.html');
try{
 fs.writeFileSync(file,html.replace('</body>','<script>window.addEventListener("load",()=>setTimeout('+smoke.toString()+',900));<\/script></body>'));
 for(const [width,height] of [[390,844],[1366,900]]){
  const processResult=cp.spawnSync(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--allow-file-access-from-files','--disable-extensions','--virtual-time-budget=13000','--window-size='+width+','+height,'--user-data-dir='+path.join(tmp,'profile-'+width),'--dump-dom','file://'+file],{encoding:'utf8',timeout:45000,maxBuffer:19*1024*1024});
  assert.equal(processResult.status,0,'Chromium failed at '+width+'px: '+String(processResult.stderr).slice(-750));
  const tag=processResult.stdout.match(/id="kb-pharma-evidence-report" data-report="([^"]+)"/);
  assert.ok(tag,'Browser test report missing '+width+'px; '+processResult.stdout.slice(-500));
  const rows=JSON.parse(decodeURIComponent(tag[1]));
  for(const item of rows)console.log((item.ok?'PASS ':'FAIL ')+width+'px · '+item.name+(item.error?' · '+item.error:''));
  assert.equal(rows.filter(item=>!item.ok).length,0,'Browser evidence UX failed at '+width+'px');
 }
}finally{fs.rmSync(file,{force:true});fs.rmSync(tmp,{recursive:true,force:true});}
console.log('PASS: Pharma Pro 2.0 · 40 priority, 15 specific label audits (9 gated-dose + 6 safety-only), zero unverified doses and offline usability.');
