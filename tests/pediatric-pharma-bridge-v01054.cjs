'use strict';
/* Fail-closed clinical and interoperability checks for v0.10.54. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const algoSources=[
 'assets/pediatria-algoritmos-core-v01051.js',
 'assets/pediatria-algoritmos-extension-v01052.js',
 'assets/pediatria-algoritmos-extension-v01053.js',
 'assets/pediatria-farmaco-bridge-v01054.js'];
const pharmacySources=[
 'assets/pharma-pro-expansion.js',
 'assets/pharma-pro-guides-plus.js',
 'assets/pharma-pro-expansion-index-v01043.js',
 'assets/pharma-pro-core.js'];
const window={};window.window=window;
for(const p of [...algoSources,...pharmacySources]){
 const source=read(p);new vm.Script(source,{filename:p});
 vm.runInNewContext(source,window,{filename:p,timeout:8000});
}
const e=window.KidBumPediatricAlgorithms,b=window.KidBumPediatricTherapyBridge,med=window.KidBumPharmaCore;
assert.equal(e.version,'0.10.53');assert.equal(b.version,'0.10.54');
assert.equal(e.algorithms.length,28);assert.equal(med.records.length,643);
assert.deepEqual(Array.from(b.validate()),[]);
assert.deepEqual(Object.keys(b.byId).sort(),Array.from(e.algorithms,a=>a.id).sort());
const all=e.algorithms.flatMap(a=>Object.keys(a.outcomes).map(outcome=>b.get(a.id,outcome)));
assert.equal(all.length,122,'All outcome branches must have treatment connection');
assert.ok(all.every(x=>x&&x.context&&x.purpose&&x.sources.length&&x.population));
const withDrug=all.filter(x=>x.drugs.length),noDrug=all.filter(x=>!x.drugs.length);
assert.ok(withDrug.length>=35,'Enough genuinely contextual drug links');
assert.ok(noDrug.length>=55,'Important nonpharmacological outcomes must remain nonprescriptive');
const referenced=new Set();
for(const [id,entry] of Object.entries(b.drugs)){
 const real=med.byId[id];
 assert.ok(real,'Linked drug missing from actual Pharma Pro: '+id);
 assert.equal(entry[0],real.name,id+' drug name drift');
 assert.deepEqual(Array.from(entry[1]),Array.from(real.populations),id+' population drift');
 assert.equal(Boolean(entry[2]),Boolean(real.highRisk),id+' high-alert drift');
}
for(const plan of all){
 assert.match(plan.status,/educativo/);
 assert.equal(plan.needsClinicalValidation,true);
 assert.ok(plan.actions.length>=2);
 for(const d of plan.drugs){
  referenced.add(d.id);
  assert.ok(med.byId[d.id],plan.algorithmId+': dead link '+d.id);
  assert.ok(d.href==='./pharma-pro.html#'+d.id,plan.algorithmId+': wrong destination');
  assert.ok(d.context?.length>=35,plan.algorithmId+': missing indication-specific context');
  assert.ok(d.role,plan.algorithmId+': missing therapeutic role');
  assert.equal(d.name,med.byId[d.id].name);
  assert.deepEqual(Array.from(d.populations),Array.from(med.byId[d.id].populations));
  assert.equal(d.highRisk,Boolean(med.byId[d.id].highRisk));
 }
}
assert.ok(referenced.size>=25,'At least 25 real cross-linked drug monographs');
assert.equal(b.get('does-not-exist','critical'),null);
assert.equal(b.get('anafilaxia','not-a-terminal'),null);
function ids(a,o){return Array.from(b.get(a,o).drugs,x=>x.id);}
function contexts(a,o){return b.get(a,o).drugs.map(x=>x.context+' '+x.warning).join(' ');}
assert.deepEqual(ids('bronquiolitis','support'),[],'Do not suggest routine bronchodilators/antibiotics in bronchiolitis');
assert.deepEqual(ids('diarrea','rehydrate'),[],'ORS is not equivalent to prescription medication');
assert.deepEqual(ids('ictericia','compare'),[],'Phototherapy is not a medication');
assert.deepEqual(ids('anafilaxia','observe'),[],'Do not convert mild skin-only symptoms into epinephrine order');
assert.ok(ids('anafilaxia','immediate').includes('adrenalina'));
assert.match(contexts('anafilaxia','immediate'),/INTRAMUSCULAR/i);
assert.match(contexts('anafilaxia','immediate'),/no reemplaza|no sustituye/i);
assert.ok(ids('crup','critical').includes('adrenalina'));
assert.match(contexts('crup','critical'),/NEBULIZADA/);
assert.ok(!/IM para crup/i.test(contexts('crup','critical')));
assert.ok(ids('paro-pediatrico','nonshock').includes('adrenalina'));
assert.ok(!ids('paro-pediatrico','nonshock').includes('amiodarona'));
assert.ok(ids('paro-pediatrico','shock').includes('amiodarona'));
assert.deepEqual(ids('paro-pediatrico','unknown'),[]);
assert.deepEqual(ids('reanimacion-neonatal','routine'),[]);
assert.ok(ids('reanimacion-neonatal','compressions').includes('adrenalina'));
assert.ok(!ids('lactante-febril','age8').includes('ceftriaxona'),'No ceftriaxone in newborn-by-default route');
assert.ok(ids('lactante-febril','age29').includes('ceftriaxona'));
assert.ok(ids('cetoacidosis','hospital').includes('insulina-regular'));
assert.ok(!ids('cetoacidosis','hospital').includes('potasio-iv'));
assert.ok(ids('asma-crisis','allergic').includes('adrenalina'));
assert.ok(!ids('asma-crisis','allergic').includes('salbutamol'));
assert.ok(ids('asma-crisis','treat').includes('salbutamol'));
assert.ok(ids('neutropenia-febril','urgent').includes('piperacilina-tazobactam'));
assert.ok(ids('meningitis-pediatrica','critical').includes('ceftriaxona'));
assert.deepEqual(ids('hipoglucemia-neonatal','critical'),[]);
assert.deepEqual(ids('trastornos-sodio','hyper'),[],'Never recommend hypertonic sodium in hypernatremia');
assert.ok(ids('trastornos-sodio','critical').includes('sodio-hipertonico'));
assert.ok(ids('lesion-renal-aguda','critical').includes('furosemida'));
assert.deepEqual(ids('lesion-renal-aguda','urgent'),[],'Diuretics must not be automatic AKI treatment');
assert.deepEqual(ids('dificultad-respiratoria','urgent'),[],'No empiric drug without respiratory syndrome');
const bridge=read(algoSources[3]),page=read('algoritmos-pediatria.html'),ui=read('assets/pediatria-algoritmos-ui-v01051.js'),css=read('assets/pediatria-farmaco-bridge-v01054.css'),sw=read('sw.js'),index=read('index.html'),pharmaPage=read('pharma-pro.html'),pharmaUI=read('assets/pharma-pro-ui.js');
assert.doesNotMatch(bridge,/\bfetch\s*\(|XMLHttpRequest|sessionStorage|localStorage|innerHTML|eval\s*\(/,'No patient data collection or network in treatment bridge');
assert.doesNotMatch(bridge,/(?:\d+\s*(?:mg|mL|µg)\s*\/\s*kg|=\s*\d+\s*mg\/kg)/i,'No unverified mg/kg dosing');
assert.match(page,/kidbum-app-version" content="0\.10\.55"/);
assert.match(page,/pediatria-farmaco-bridge-v01054\.css/);
assert.match(page,/pediatria-farmaco-bridge-v01054\.js/);
assert.ok(page.indexOf('pediatria-algoritmos-extension-v01053.js')<page.indexOf('pediatria-farmaco-bridge-v01054.js')&&page.indexOf('pediatria-farmaco-bridge-v01054.js')<page.indexOf('pediatria-algoritmos-ui-v01051.js'),'Bridge must load before UI');
assert.match(ui,/function renderTreatment\(a,step\)/);
assert.match(ui,/renderTreatment\(a,step\)/);
assert.match(ui,/m\.href/);
assert.match(ui,/alg-rx-warning/);
assert.match(ui,/target='_blank'/);
assert.doesNotMatch(ui,/\bfetch\s*\(|XMLHttpRequest|innerHTML/);
assert.match(css,/alg-rx-link/);
assert.match(css,/min-height:49px/);
assert.match(css,/@media\(max-width:600px\)/);
assert.match(index,/28 algoritmos \+ tratamientos/);
assert.match(pharmaPage,/pharma-pro-ui\.js/);
assert.match(pharmaUI,/function fromHash\(\)/);
assert.match(pharmaUI,/if\(Object\.hasOwn\(lib\.byId,id\)\)showDrug\(id\)/);
assert.ok(sw.includes("'./assets/pediatria-farmaco-bridge-v01054.js'"));
assert.ok(sw.includes("'./assets/pediatria-farmaco-bridge-v01054.css'"));
assert.match(sw,/pediatric-pharma-bridge-v01054/);
console.log('PASS: 28/28 algorithms ↔ '+all.length+' treatment results; '+withDrug.length+' drug-bearing, '+noDrug.length+' deliberately non-prescriptive; '+referenced.size+' real Pharma Pro medications, 643-item live catalog, offline/mobile/clinical safety.');
