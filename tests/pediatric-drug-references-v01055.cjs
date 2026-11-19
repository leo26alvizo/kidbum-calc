'use strict';
/* KidBum clinical source-based dosing reference coverage and fail-closed test.
 * Verifies 29/29 dossiers against REAL 643 Pharma Pro records; 19 have
 * contextually sourced dose examples and 10 explicitly withhold numbers.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const peds=[
 'assets/pediatria-algoritmos-core-v01051.js',
 'assets/pediatria-algoritmos-extension-v01052.js',
 'assets/pediatria-algoritmos-extension-v01053.js',
 'assets/pediatria-farmaco-bridge-v01054.js',
 'assets/pediatric-drug-references-v01055.js'];
const pharma=['assets/pharma-pro-expansion.js','assets/pharma-pro-guides-plus.js','assets/pharma-pro-expansion-index-v01043.js','assets/pharma-pro-core.js'];
const context={};context.window=context;
for(const p of [...peds,...pharma]){const s=read(p);new vm.Script(s,{filename:p});vm.runInNewContext(s,context,{filename:p,timeout:5000});}
const bridge=context.KidBumPediatricTherapyBridge,db=context.KidBumPediatricDrugReferences,lib=context.KidBumPharmaCore;
assert.equal(db.version,'0.10.55');assert.equal(bridge.version,'0.10.54');
assert.equal(lib.records.length,643);
assert.deepEqual(Array.from(db.validate()),[]);
assert.deepEqual(Array.from(bridge.validate()),[]);
assert.equal(db.coverage.linked,29);assert.equal(db.coverage.withNumericReference,19);
assert.equal(db.coverage.pendingNumericReference,10);assert.equal(db.coverage.contextualRegimens,24);
const used=[...new Set(Object.entries(bridge.byId).flatMap(([algo,x])=>Object.values(x.branches).flatMap(y=>y.medicines.map(z=>z.id))))].sort();
assert.deepEqual(Object.keys(db.records).sort(),used,'All real linked drugs must have one and only one dossier');
let seenDose=0,seenPending=0;
for(const id of used){
 const m=db.records[id],p=lib.byId[id];
 assert.ok(p,'No real Pharma Pro drug: '+id);
 assert.equal(m.id,id);
 assert.ok(m.indication.length>=35,id+': missing indication');
 assert.ok(m.watch.length&&m.avoid.length&&m.renal&&m.hepatic,id+': missing safety info');
 assert.ok(db.sources[m.source],id+': main clinical source missing');
 assert.ok(db.sources[m.source].url.startsWith('https://'),id+': source must be HTTPS');
 if(m.regimens.length)seenDose++;else{seenPending++;assert.ok(m.pending.length>=65,id+': no pending reason');}
 const allIds=new Set();
 for(const r of m.regimens){
  assert.ok(!allIds.has(r.id),id+': duplicate dose');allIds.add(r.id);
  assert.ok(r.branches.length>=1,id+': no clinical route');
  assert.ok(r.scope.length>=50,id+': no scope');
  assert.ok(r.doseText&&r.doseText.length>=15,id+': empty dose');
  assert.ok(r.route&&r.interval&&r.maximum&&r.monitor&&r.guard&&r.duration,id+': incomplete source reference');
  assert.match(r.evidence,/pauta-documental-especifica/);
  assert.match(r.jurisdiction,/NO autorización/);
  assert.ok(db.sources[r.source],id+': missing source');
  for(const o of r.branches){
   const outcome=bridge.get(r.algorithm,o);
   assert.ok(outcome&&outcome.drugs.some(x=>x.id===id),id+': source-context mismatch '+r.algorithm+'/'+o);
   const only=db.find(id,r.algorithm,o);
   assert.ok(only&&only.regimens.some(x=>x.id===r.id),'Source reference unavailable on same outcome');
   assert.equal(only.populationVerifiedForRegimen,true);
  }
 }
}
assert.equal(seenDose,19);assert.equal(seenPending,10);
assert.equal(db.find('nonexistent','anafilaxia','immediate'),null);
assert.equal(db.find('adrenalina','anafilaxia','nonexistent').regimens.length,0);
assert.equal(db.find('adrenalina','crup','critical').regimens[0].route,'NEBULIZADA');
assert.match(db.find('adrenalina','anafilaxia','immediate').regimens[0].route,/IM/);
assert.match(db.find('adrenalina','paro-pediatrico','nonshock').regimens[0].route,/IV\/IO/);
assert.equal(db.find('adrenalina','reanimacion-neonatal','compressions').regimens.length,0,'PALS dose never inherited by NRP');
assert.equal(db.find('ceftriaxona','lactante-febril','age29').regimens.length,0,'Meningitis dosing never inherited by febrile infant');
assert.equal(db.find('ceftriaxona','meningitis-pediatrica','critical').regimens.length,1);
assert.equal(db.find('cefotaxima','meningitis-pediatrica','critical').regimens.length,1);
assert.equal(db.find('amoxicilina','neumonia','assess-mild').regimens.length,1);
assert.equal(db.find('amoxicilina','sepsis','emergency').regimens.length,0);
assert.equal(db.find('dexametasona','crup','critical').regimens[0].doseText,'0.6 mg/kg por dosis.');
assert.equal(db.find('dexametasona','crup','moderate').regimens[0].doseText,'0.15 mg/kg por vía oral cuando está indicado.');
assert.equal(db.find('insulina-regular','cetoacidosis','hospital').regimens[0].route,'Infusión IV continua');
assert.match(db.find('insulina-regular','cetoacidosis','hospital').regimens[0].guard,/Nunca bolo/);
assert.equal(db.find('atropina','bradicardia-pals','urgent').regimens[0].doseText,'0.02 mg/kg por dosis.');
assert.equal(db.find('adenosina','taquicardia-pals','urgent').regimens[0].maximum,'Primera: 6 mg. Segunda: 12 mg.');
assert.equal(db.find('meropenem','neutropenia-febril','critical').regimens.length,0);
assert.equal(db.find('sodio-hipertonico','trastornos-sodio','critical').regimens.length,0);
assert.equal(db.find('furosemida','lesion-renal-aguda','critical').regimens.length,0);
assert.equal(db.find('prednisona','asma-crisis','treat').regimens.length,0);
assert.equal(db.find('midazolam','convulsion','status').regimens.length,2,'Routes not automatically combined');
assert.equal(db.find('piperacilina-tazobactam','neutropenia-febril','urgent').regimens[0].doseText.includes('PIPERACILINA'),true);
const fresh={};fresh.window=fresh;
vm.runInNewContext(read(peds[4]),fresh,{filename:'standalone-reference',timeout:5000});
assert.equal(fresh.KidBumPediatricDrugReferences.coverage.linked,29);
assert.deepEqual(Array.from(fresh.KidBumPediatricDrugReferences.validate()),[],'Standalone Pharma Pro must not need algorithm engine');
assert.equal(fresh.KidBumPediatricDrugReferences.find('adrenalina','anafilaxia','immediate').regimens.length,1);
const js=read(peds[4]),view=read('assets/pediatric-drug-references-ui-v01055.js'),page=read('algoritmos-pediatria.html'),pharmaPage=read('pharma-pro.html'),algUI=read('assets/pediatria-algoritmos-ui-v01051.js'),pharmaUI=read('assets/pharma-pro-ui.js'),css=read('assets/pediatric-drug-references-v01055.css'),sw=read('sw.js');
assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest|sessionStorage|localStorage|innerHTML|eval\s*\(/);
assert.doesNotMatch(view,/\bfetch\s*\(|XMLHttpRequest|sessionStorage|localStorage|innerHTML|eval\s*\(/);
assert.match(page,/kidbum-app-version" content="0\.10\.55"/);
assert.match(page,/28 rutas \+ 29 fichas/);
assert.match(page,/pediatric-drug-references-v01055\.js/);
assert.match(page,/pediatric-drug-references-ui-v01055\.js/);
assert.ok(page.indexOf('pediatria-farmaco-bridge-v01054.js')<page.indexOf('pediatric-drug-references-v01055.js'));
assert.ok(page.indexOf('pediatric-drug-references-ui-v01055.js')<page.indexOf('pediatria-algoritmos-ui-v01051.js'));
assert.match(pharmaPage,/pediatric-drug-references-v01055\.js/);
assert.match(pharmaPage,/pediatric-drug-references-ui-v01055\.js/);
assert.match(pharmaUI,/K(idBumPediatricDrugUI|idBumPediatricDrugReferences)/);
assert.match(pharmaUI,/pediatricContext/);
assert.match(algUI,/root\.KidBumPediatricDrugUI\?\.render/);
assert.match(algUI,/pharma-pro\.html\?peds=1/);
assert.match(css,/@media\(max-width:600px\)/);
for(const x of ['./assets/pediatric-drug-references-v01055.js','./assets/pediatric-drug-references-ui-v01055.js','./assets/pediatric-drug-references-v01055.css'])assert.ok(sw.includes("'"+x+"'"),'Offline resource missing: '+x);
console.log('PASS: 29/29 linked pediatric drug dossiers, 19 guideline-scoped numeric references, 10 fail-closed pending, 24 distinct clinical regimens and 643 real Pharma Pro records. No automatic dosing.');
