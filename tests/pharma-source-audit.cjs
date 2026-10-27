'use strict';
/* Formulation-level, source-provenance and high-risk eligibility checks.
 * This test intentionally distinguishes source-text cotejo from clinical validation.
 */
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('assets/pharma-pro-monographs.js','utf8');
const overlay=fs.readFileSync('assets/pharma-pro-source-audit.js','utf8');
const core=fs.readFileSync('assets/pharma-pro-core.js','utf8');
const markup=fs.readFileSync('pharma-pro.html','utf8');
const ui=fs.readFileSync('assets/pharma-pro-monographs-ui.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
new vm.Script(source);new vm.Script(overlay);new vm.Script(ui);
const c={window:{}};vm.runInNewContext(source,c);vm.runInNewContext(overlay,c);
const m=c.window.KidBumPharmaMonographs;
assert.equal(m.records.length,6,'Six label-cotejado partial monographs');
assert.equal(m.coverage.totalIndexed,227);
assert.equal(m.coverage.labelChecked,6);
assert.equal(m.coverage.notLabelChecked,221);
assert.equal(m.coverage.clinicallyApproved,0,'No independent pharmacist approval claimed');
assert.ok(m.coverage.reviewStandard.includes('pendientes'));
assert.deepEqual(Array.from(m.records,x=>x.id),['ceftriaxona','enoxaparina','insulina-glargina','metformina','amoxicilina','omeprazol']);
const expectedSources={
 ceftriaxona:['8351aa37-552d-471d-b293-c564dcb6ec29',18,'2026-09-30'],
 enoxaparina:['5017a927-2a24-4f27-89f9-27c805bf7d59',33,'2026-05-28'],
 'insulina-glargina':['c9561d96-124d-48ca-982f-0aa1575bff36',25,'2025-05-30'],
 metformina:['f86bda10-8b25-4125-8bb1-1b5917969ff0',14,'2026-09-30'],
 amoxicilina:['82c0c5d1-df2d-4352-bd12-99f955af569e',11,'2026-10-19'],
 omeprazol:['ed9895ae-3d18-434c-8b56-47bccdc8fe6d',51,'2026-10-15']
};
for(const id of Object.keys(expectedSources)){
 const drug=m.byId[id];assert.ok(drug,id);
 assert.deepEqual([drug.source.setid,drug.source.version,drug.source.effective],expectedSources[id],id+' provenance');
 assert.ok(drug.source.url.includes('setid='+drug.source.setid));
 assert.ok(m.preparations[id]?.method&&m.preparations[id]?.restrictions&&m.preparations[id]?.sourceSection&&m.preparations[id]?.finalValidation,'Preparation metadata explicitly sourced '+id);
 assert.match(drug.jurisdiction,/México/);
 assert.ok(drug.regimens.length>=1);
 const forbidden=(id==='omeprazol'?'30 mg IV':id==='insulina-glargina'?'IV injection':null);
 if(forbidden)assert.ok(!drug.regimens.some(x=>x.reference.includes(forbidden)));
}
assert.match(m.preparations.ceftriaxona.method,/1 g.*9\.6 mL/);
assert.match(m.preparations.ceftriaxona.method,/10–40 mg\/mL/);
assert.match(m.preparations.ceftriaxona.restrictions,/calcio/i);
assert.match(m.preparations['insulina-glargina'].restrictions,/NO mezclar, diluir/);
assert.match(m.preparations.enoxaparina.method,/No requiere reconstitución/);
const basic={population:'adult',route:'po',allergy:'no',productConfirmed:'yes',pregnancy:'no'};
const met={...basic,indication:'adult-t2-metformin-ir-start',renal:'ge45',metabolicAcidosis:'no',acuteIllness:'no',iodinatedContrast:'no'};
const amox={...basic,indication:'adult-ent-skin-gu-mild',weightOver40:'yes',renal:'ge30',bacterial:'yes'};
const ome={...basic,indication:'adult-symptomatic-gerd',alarmSymptoms:'no',rilpivirine:'no'};
for(const [id,valid] of [['metformina',met],['amoxicilina',amox],['omeprazol',ome]]){
 let r=m.check(id,valid);
 assert.equal(r.status,'reference',id+' fully specified');
 assert.ok(r.regimen.reference.length>45);
 assert.ok(r.warnings.some(x=>/NO representa validación clínica/.test(x)),'Do not claim validated');
 assert.equal(m.check(id,{}).status,'blocked');
 assert.equal(m.check(id,{...valid,population:'neonate'}).status,'blocked');
 assert.equal(m.check(id,{...valid,population:'pediatric'}).status,'blocked');
 assert.equal(m.check(id,{...valid,allergy:'yes'}).status,'blocked');
 assert.equal(m.check(id,{...valid,allergy:'unknown'}).status,'blocked');
 assert.equal(m.check(id,{...valid,route:'iv'}).status,'blocked');
 assert.equal(m.check(id,{...valid,productConfirmed:'no'}).status,'blocked');
 assert.equal(m.check(id,{...valid,pregnancy:'unknown'}).status,'blocked');
 assert.equal(m.check(id,{...valid,indication:'irrelevant'}).status,'blocked');
 for(const field of Object.keys(valid)){
  const missing={...valid};delete missing[field];
  assert.equal(m.check(id,missing).status,'blocked',id+' missing '+field+' fails closed');
 }
}
assert.match(m.check('metformina',met).regimen.reference,/500 mg VO dos veces/);
for(const key of ['renal','metabolicAcidosis','acuteIllness','iodinatedContrast']){
 const v={...met,[key]:key==='renal'?'low':'yes'};
 assert.equal(m.check('metformina',v).status,'blocked',key);
}
assert.match(m.check('amoxicilina',amox).regimen.reference,/500 mg VO cada 12 h/);
assert.equal(m.check('amoxicilina',{...amox,weightOver40:'no'}).status,'blocked');
assert.equal(m.check('amoxicilina',{...amox,bacterial:'no'}).status,'blocked');
assert.equal(m.check('amoxicilina',{...amox,renal:'low'}).status,'blocked');
assert.match(m.check('omeprazol',ome).regimen.reference,/20 mg VO una vez al día/);
assert.equal(m.check('omeprazol',{...ome,alarmSymptoms:'yes'}).status,'blocked');
assert.equal(m.check('omeprazol',{...ome,rilpivirine:'yes'}).status,'blocked');
const oldEnox=m.check('enoxaparina',{population:'adult',indication:'medical-prophy',route:'sc',allergy:'no',renal:'ge30',kidneyStable:'yes',bleeding:'no',hit:'no',neuroaxial:'no'});
assert.equal(oldEnox.status,'reference','Existing enox safety retained');
assert.equal(m.check('insulina-glargina',{population:'adult',indication:'adult-t2-naive',route:'iv',allergy:'no',formulation:'u300',type:'t2',prior:'no',hypoglycemia:'no'}).status,'blocked');
assert.match(ui,/engine\.preparations\?\.\[id\]/,'Preparation only shown alongside gated dose');
assert.match(ui,/group\('Vía y preparación específica/);
assert.match(ui,/productConfirmed/);
assert.match(ui,/rilpivirine/);
assert.match(markup,/pharma-coverage/);
assert.match(markup,/0 fichas con validación clínica/);
assert.match(markup,/assets\/pharma-pro-source-audit\.js/);
assert.match(sw,/pharma-source-audit-v01033/);
assert.ok(sw.includes("'./assets/pharma-pro-source-audit.js'"));
console.log('Pharma label audit PASS: 227 status entries, six source-cotejado partial monographs, preparation provenance, all new eligibility gates, original 3 retained.');
