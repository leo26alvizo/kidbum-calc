'use strict';
// Pediatric infant support v0.10.44 — technical checks, not independent clinical validation.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={};context.window=context;context.globalThis=context;
for(const path of ['assets/pediatric-pharma.js','assets/pediatric-dose-math-v01044.js']){
 const s=fs.readFileSync(path,'utf8');new vm.Script(s,{filename:path});
 vm.runInNewContext(s,context,{filename:path,timeout:5000});
}
const e=context.KidBumPediatricPharma,math=context.KidBumPediatricDoseMath;
assert.ok(e?.calculate&&math?.calculate);
const equal=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,String(a)+' != '+String(b));
function reject(id,x,code){const r=e.calculate(id,x);assert.equal(r.ok,false,JSON.stringify(r));assert.equal(r.code,code);assert.equal(r.mlPerDose,undefined);}
const para={ageMonths:'8',weightKg:'8',doseMgKg:'10',strength:'160/5',
 indication:'pain',verifiedLabel:'yes',clinician:'yes',infantPlan:'yes',doses24h:'0',
 totalMg24h:'0',hoursSinceLast:'',allergy:'no',liver:'no',other:'no'};
let r=e.calculate('paracetamol',para);assert.equal(r.ok,true,r.error);equal(r.mgPerDose,80);equal(r.mlPerDose,2.5);equal(r.maxMg24h,480);
r=e.calculate('paracetamol',{...para,ageMonths:'1',weightKg:'3.6',doseMgKg:'15'});
assert.equal(r.ok,true,r.error);equal(r.mgPerDose,54);equal(r.mlPerDose,1.6875);
reject('paracetamol',{...para,ageMonths:'0'},'age');
reject('paracetamol',{...para,ageMonths:'2',indication:'fever'},'feverInfant');
reject('paracetamol',{...para,infantPlan:''},'infant');
reject('paracetamol',{...para,ageMonths:'216'},'age');
reject('paracetamol',{...para,ageMonths:'1',weightKg:'2.5'},'weight');
const ibu={...para,ageMonths:'6',weightKg:'7',strength:'100/5',doseMgKg:'10',
 kidney:'no',dehydration:'no',varicella:'no',bleeding:'no',asthma:'no'};
delete ibu.liver;delete ibu.other;
r=e.calculate('ibuprofeno',ibu);assert.equal(r.ok,true,r.error);equal(r.mgPerDose,70);equal(r.mlPerDose,3.5);
reject('ibuprofeno',{...ibu,ageMonths:'5'},'age');
reject('ibuprofeno',{...ibu,infantPlan:'no'},'infant');
reject('ibuprofeno',{...ibu,weightKg:'4.9'},'weight');
const aom={ageMonths:'6',weightKg:'8',diagnosis:'aom_confirmed',treatmentChoice:'yes',clinician:'yes',
 infantPlan:'yes',oralFeasible:'yes',plainAmoxicillin:'yes',verifiedLabel:'yes',strength:'400/5',
 dailyMgKg:'80',allergy:'no',renal:'no',amox30:'no',conjunctivitis:'no',nonresponsive:'no',
 treatmentFailure:'no',complicated:'no',highRisk:'no'};
r=e.calculate('amoxicilina_oma',aom);
assert.equal(r.ok,true,r.error);equal(r.mgPerDay,640);equal(r.mgPerDose,320);equal(r.mlPerDose,4);
reject('amoxicilina_oma',{...aom,ageMonths:'5'},'age');
reject('amoxicilina_oma',{...aom,infantPlan:'no'},'infant');
reject('amoxicilina_oma',{...aom,ageMonths:'216'},'age');
reject('amoxicilina_oma',{...aom,conjunctivitis:'yes'},'precaution');
const patient={drug:'Paracetamol oral',ageDays:'0',weightKg:'3.1',premature:'no',
 gestationalWeeks:'39',neonatalProtocol:'yes',route:'oral',
 highRiskExcluded:'yes',referenceReviewed:'yes',clinician:'yes',
 basis:'perDose',mgKg:'10',dosesPerDay:'4',strengthMg:'160',strengthMl:'5',
 maxSingleMg:'40',maxDailyMg:'150',priorMg24h:'0'};
let v=math.calculate(patient);
assert.equal(v.ok,true,v.error);equal(v.mgPerDose,31);equal(v.mlPerDose,31/32);equal(v.mgPerDay,124);
v=math.calculate({...patient,basis:'perDay',mgKg:'40'});
assert.equal(v.ok,true,v.error);equal(v.mgPerDose,31);equal(v.mgPerDay,124);
for(const [key,value,code] of [
 ['neonatalProtocol','no','neonatal'],['gestationalWeeks','','gestation'],
 ['referenceReviewed','no','source'],['clinician','no','source'],
 ['highRiskExcluded','no','highRisk'],['route','iv','route'],
 ['premature','','premature'],['maxSingleMg','','max'],
 ['maxDailyMg','5','limit'],['priorMg24h','145','limit'],
 ['ageDays','-1','age'],['ageDays','not a number','age'],
 ['weightKg','0','weight'],['mgKg','0','dose'],
 ['strengthMg','0','strength'],['dosesPerDay','0','frequency']
]){
 const x=math.calculate({...patient,[key]:value});
 assert.equal(x.ok,false,key);assert.equal(x.code,code,key);
 assert.equal(x.mlPerDose,undefined,key+' must not return dose');
}
assert.equal(math.calculate({...patient,ageDays:'180',premature:'yes',gestationalWeeks:''}).code,'gestation');
assert.equal(math.calculate({...patient,ageDays:'180',premature:'no',gestationalWeeks:'',neonatalProtocol:'no'}).ok,true);
const page=fs.readFileSync('index.html','utf8');
for(const id of ['pfx-age-guidance','pfx-infantPlan','pfa-age-guidance','pfa-infantPlan','pdv-section','pdv-ageDays','pdv-neonatalProtocol','pdv-result'])
 assert.ok(page.includes('id="'+id+'"'),id);
assert.ok(page.includes('window.KidBumPediatricDoseMath?.calculate(data)'));
assert.ok(page.includes('window.KidBumPediatricPharma?.calculate(selected,data)'));
assert.match(page,/assets\/pediatric-dose-math-v01044\.js/);
assert.match(page,/assets\/pediatric-pharma-v01044\.css/);
const sw=fs.readFileSync('sw.js','utf8');
for(const file of ['pediatric-dose-math-v01044.js','pediatric-pharma-v01044.css'])assert.ok(sw.includes(file));
assert.doesNotMatch(fs.readFileSync('assets/pediatric-dose-math-v01044.js','utf8'),/fetch\s*\(|localStorage|sessionStorage|sendBeacon/);
assert.match(page,/content="0\.10\.47"/);
console.log('PASS infant dosing: paracetamol ≥1m, ibuprofen/OMA ≥6m, fever <3m guard, day-0 math and neonatal protocol, maximums, exact presentation, offline.');
