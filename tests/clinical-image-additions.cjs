'use strict';
// Seven calculators from clinical reference image, independent arithmetic and safety tests.
// Run: node tests/clinical-image-additions.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
const ctx={};ctx.window=ctx;ctx.globalThis=ctx;
vm.runInNewContext(fs.readFileSync('assets/startup-bundle.js','utf8'),ctx,{timeout:10000});
vm.runInNewContext(scripts[0],ctx,{timeout:5000});
const e=ctx.KidBumEngine;
const defs=vm.runInNewContext(html.slice(html.indexOf('const dateInput='),html.indexOf('const categories='))+'\ndefs;',{}, {timeout:5000});
const a=html.indexOf('function validateClinicalInputs('),b=html.indexOf('function update(){',a);
const guard=vm.runInNewContext(html.slice(a,b)+'\nvalidateClinicalInputs;',{}, {timeout:5000});
const ids=['sofa1','psiport','parklandburn','aldrete','apgar','devineibw','pedmathdose'];
assert.equal(e.list.length,84,'77 previous calculators plus seven new');
assert.equal(defs.length,84,'All 84 cards visible');
assert.equal(new Set(defs.map(d=>d.id)).size,84);
const testData={};
let count=0;
function valid(id,modify,expected,word){
 const r=e.calculate(id,{...testData[id],...modify});
 assert.ok(!r.error,JSON.stringify({id,modify,result:r}));
 assert.ok(Math.abs(r.value-expected)<1e-8,id+': '+r.value+' expected '+expected);
 if(word)assert.ok(r.interpretation.includes(word),id+' missing '+word);
 count++;return r;
}
function invalid(id,modify){
 const r=e.calculate(id,{...testData[id],...modify});
 assert.ok(r.error,id+' accepted '+JSON.stringify(modify));
 assert.equal(r.value,undefined);
 count++;
}
for(const id of ids){
 const d=defs.find(d=>d.id===id);
 assert.ok(d,'New card '+id);
 const data=Object.fromEntries(d.fields.map(f=>[f.key,f.example||'']));
 testData[id]=data;
 assert.equal(guard(d,data),null,'Example loads correctly: '+id);
 assert.ok(!e.calculate(id,data).error,'Example computes: '+id);
 for(const field of d.fields){
  const bad=field.type==='choice'?'INVALID':'NaN';
  const entry={...data,[field.key]:bad};
  assert.ok(guard(d,entry),'Form rejects bad value '+id+'.'+field.key);
  assert.ok(e.calculate(id,entry).error,'Engine rejects bad value '+id+'.'+field.key);
  count++;
 }
}
assert.equal(defs.find(x=>x.id==='sofa1').category,'Urgencias y Terapia Intensiva');
valid('sofa1',{},4,'SOFA clásico');
valid('sofa1',{resp:'4',platelets:'4',liver:'4',cardio:'4',gcs:'4',renal:'4'},24);
valid('sofa1',{resp:'0',cardio:'0',renal:'0'},0);
invalid('sofa1',{gcs:'5'});
invalid('sofa1',{reviewed:'no'});
valid('psiport',{},95,'IV');
const allNo=Object.fromEntries([
 'nursing','neoplasm','liver','chf','cva','renal','psiConfusion',
 'tachypnea','hypotension','temperature','pulse','ph','bun','na',
 'glucose','hct','oxygen','effusion'
].map(k=>[k,'no']));
valid('psiport',{...allNo,age:'45',sex:'female'},35,'I');
valid('psiport',{...allNo,age:'65',sex:'male'},65,'II');
valid('psiport',{...allNo,age:'75',sex:'male'},75,'III');
valid('psiport',{...allNo,age:'100',sex:'male'},100,'IV');
valid('psiport',{...allNo,age:'100',sex:'male',neoplasm:'yes',liver:'yes'},150,'V');
invalid('psiport',{diagnosis:'no'});
invalid('psiport',{ph:''});
invalid('psiport',{nursing:'unknown'});
valid('parklandburn',{},8400,'Parkland clásica');
valid('parklandburn',{scheme:'aba2'},4200,'ABA 2024');
invalid('parklandburn',{tbsa:'10'});
invalid('parklandburn',{verified:'no'});
invalid('parklandburn',{scheme:''});
valid('aldrete',{},9,'Aldrete');
valid('aldrete',{oxygen:'2'},10);
valid('aldrete',{activity:'0',breathing:'0',circulation:'0',consciousness:'0',oxygen:'0'},0);
invalid('aldrete',{oxygen:'3'});
invalid('aldrete',{checked:'no'});
valid('apgar',{},8,'Apgar');
valid('apgar',{appearance:'0',pulse:'0',grimace:'0',activity:'0',respiration:'0'},0);
valid('apgar',{appearance:'2',activity:'2'},10);
invalid('apgar',{minute:'3'});
invalid('apgar',{pulse:'10'});
valid('devineibw',{},73,'Peso teórico');
valid('devineibw',{sex:'female'},68.5);
invalid('devineibw',{age:'17'});
invalid('devineibw',{height:'140'});
valid('pedmathdose',{},200,'pauta ya indicada');
valid('pedmathdose',{basis:'reference',referenceWeight:'18'},180);
invalid('pedmathdose',{basis:'reference',referenceWeight:''});
invalid('pedmathdose',{dose:'50'});
invalid('pedmathdose',{prescribed:'no'});
invalid('pedmathdose',{units:'mgkgday'});
invalid('pedmathdose',{age:'10'});
invalid('pedmathdose',{times:'2.5'});
invalid('pedmathdose',{basis:'actual',referenceWeight:'25'});
for(const id of ['apache2','sofa2','qsofa','curb','bmi','bsa','ped421','pedholliday','pedmaxverify'])
 assert.ok(e.list.includes(id),'Preserved existing calculator: '+id);
assert.ok(!defs.some(d=>/Peso ideal \+ Dosis pediátrica/i.test(d.title)),'No false pediatric ideal weight recommendation');

// Boundary regression: PSI/PORT classification transitions must not drift.
const noPORT=Object.fromEntries([
 'nursing','neoplasm','liver','chf','cva','renal','psiConfusion',
 'tachypnea','hypotension','temperature','pulse','ph','bun','na',
 'glucose','hct','oxygen','effusion'
].map(k=>[k,'no']));
for(const [age,sex,expectedScore,expectedClass] of [
 [50,'male',50,'I'],[51,'male',51,'II'],
 [50,'female',40,'I'],[51,'female',41,'II'],
 [70,'male',70,'II'],[71,'male',71,'III'],
 [90,'male',90,'III'],[91,'male',91,'IV'],
 [120,'male',120,'IV']
]){
 const r=e.calculate('psiport',{...testData.psiport,...noPORT,age:String(age),sex});
 assert.equal(r.value,expectedScore,'PSI score boundary '+age+'/'+sex);
 assert.ok(r.interpretation.includes('clase '+expectedClass),'PSI class boundary '+age+'/'+sex);
 count++;
}
for(const [age,sex,positive,expectedScore,expectedClass] of [
 [45,'female','nursing',45,'I'],
 [45,'male','neoplasm',75,'III'],
 [100,'male','neoplasm',130,'IV'],
 [101,'male','neoplasm',131,'V']
]){
 const r=e.calculate('psiport',{...testData.psiport,...noPORT,age:String(age),sex,[positive]:'yes'});
 assert.equal(r.value,expectedScore,'PSI weighted boundary '+age+'/'+positive);
 assert.ok(r.interpretation.includes('clase '+expectedClass),'PSI weighted class '+age+'/'+positive);
 count++;
}
// Original Fine step 1 excludes only age >50, five diseases and five exam findings.
// Institutional residence, blood tests and radiography contribute points in step 2,
// but cannot automatically disqualify a patient from class I.
for(const positive of ['nursing','ph','bun','na','glucose','hct','oxygen','effusion']){
 const r=e.calculate('psiport',{...testData.psiport,...noPORT,age:'45',sex:'male',[positive]:'yes'});
 assert.ok(r.interpretation.includes('clase I'),'Fine step-one class I preserved for '+positive);
 count++;
}
for(const positive of ['neoplasm','liver','chf','cva','renal','psiConfusion','tachypnea','hypotension','temperature','pulse']){
 const r=e.calculate('psiport',{...testData.psiport,...noPORT,age:'45',sex:'male',[positive]:'yes'});
 assert.ok(!r.interpretation.includes('clase I'),'Fine step-one disqualified by '+positive);
 count++;
}
// Adult burn calculation at the ABA inclusion threshold; never output an infusion rate.
for(const [scheme,expected] of [['parkland4',5600],['aba2',2800]]){
 const r=valid('parklandburn',{weight:'70',tbsa:'20',hours:'7.5',scheme},expected);
 assert.ok(!r.interpretation.includes('mL/h'),'Burn estimate must never prescribe an hourly rate');
}
invalid('parklandburn',{tbsa:'19.99'});
// Devine's 60-inch anchor: historical adult reference, not a pediatric ideal-weight formula.
valid('devineibw',{height:'152.4',sex:'male'},50);
valid('devineibw',{height:'152.4',sex:'female'},45.5);
// Dose exactly at both clinician-supplied maximums is arithmetic equality, not approval.
const exact=e.calculate('pedmathdose',{
 ...testData.pedmathdose,weight:'20',dose:'10',times:'3',maxDose:'200',maxDay:'600'
});
assert.equal(exact.value,200);
assert.ok(exact.interpretation.includes('no es prescripción'));
count++;
invalid('pedmathdose',{weight:'20',dose:'10',times:'3',maxDose:'199.99',maxDay:'600'});
invalid('pedmathdose',{weight:'20',dose:'10',times:'3',maxDose:'200',maxDay:'599.99'});

console.log('Seven clinical image calculators PASSED: '+count+' independent boundary and safety cases; all 84 calculators retained.');
