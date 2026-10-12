'use strict';
// Drug-reference engine test cases. Run: node tests/pediatric-drug-doses.cjs
// Technical safety tests; not independent clinical approval.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const js=fs.readFileSync('assets/pediatric-pharma.js','utf8');
const context={};context.window=context;context.globalThis=context;
vm.runInNewContext(js,context,{timeout:5000});
const e=context.KidBumPediatricPharma;
assert.ok(e&&typeof e.calculate==='function');
assert.deepEqual(Array.from(e.supported),['paracetamol','ibuprofeno','amoxicilina_oma']);
const para={ageMonths:'36',weightKg:'15',doseMgKg:'15',strength:'160/5',
 indication:'pain',verifiedLabel:'yes',clinician:'yes',
 doses24h:'0',totalMg24h:'0',hoursSinceLast:'',
 allergy:'no',liver:'no',other:'no'};
const ibu={ageMonths:'36',weightKg:'15',doseMgKg:'10',strength:'100/5',
 indication:'fever',verifiedLabel:'yes',clinician:'yes',
 doses24h:'0',totalMg24h:'0',hoursSinceLast:'',
 allergy:'no',kidney:'no',dehydration:'no',varicella:'no',bleeding:'no',asthma:'no'};
const approx=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-10,actual+' vs '+expected);
let cases=0;
function pass(id,input,mg,ml,interval,max24,maxDoses){
 const r=e.calculate(id,input);
 assert.equal(r.ok,true,id+': '+(r.error||''));
 approx(r.mgPerDose,mg);approx(r.mlPerDose,ml);
 assert.equal(r.intervalHours,interval);assert.equal(r.maxMg24h,max24);
 assert.equal(r.maxDoses24h,maxDoses);
 assert.equal(r.priorMg24h,Number(input.totalMg24h));
 cases++;
 return r;
}
function reject(id,input,code){
 const r=e.calculate(id,input);
 assert.equal(r.ok,false,'Must block '+id+' '+JSON.stringify(input));
 assert.equal(r.code,code,JSON.stringify(r));
 assert.equal(r.mgPerDose,undefined);
 assert.equal(r.mlPerDose,undefined);
 cases++;
}
pass('paracetamol',para,225,225/32,6,900,4);
pass('paracetamol',{...para,doseMgKg:'10'},150,150/32,6,900,4);
pass('ibuprofeno',ibu,150,150/20,8,450,3);
pass('ibuprofeno',{...ibu,doseMgKg:'5'},75,75/20,8,450,3);
pass('paracetamol',{...para,weightKg:'40',doseMgKg:'15',ageMonths:'143'},600,600/32,6,2400,4);
pass('ibuprofeno',{...ibu,weightKg:'40',doseMgKg:'10',ageMonths:'119'},400,400/20,8,1200,3);
pass('paracetamol',{...para,doses24h:'1',totalMg24h:'225',hoursSinceLast:'6'},225,225/32,6,900,4);
pass('ibuprofeno',{...ibu,doses24h:'2',totalMg24h:'300',hoursSinceLast:'8'},150,150/20,8,450,3);
reject('amoxicilina',para,'unreviewed');
reject('',para,'unreviewed');
for(const id of ['paracetamol','ibuprofeno']){
 const d=id==='paracetamol'?para:ibu;
 for(const ageMonths of ['','0','23','144','NaN','36.5','Infinity']){
  reject(id,{...d,ageMonths},'age');
 }
 for(const weightKg of ['','0','7.99','40.01','NaN','Infinity','-8']){
  reject(id,{...d,weightKg},'weight');
 }
 for(const doseMgKg of ['','1','16','foo','Infinity','0']){
  reject(id,{...d,doseMgKg},'dose');
 }
 for(const strength of ['','100/1','100/5','160/5','20/1','500/5']){
  if(strength!==d.strength)reject(id,{...d,strength},'strength');
 }
 for(const verifiedLabel of ['','no','unknown']){
  reject(id,{...d,verifiedLabel},'label');
 }
 for(const clinician of ['','no','unknown']){
  reject(id,{...d,clinician},'supervision');
 }
 for(const indication of ['','infection','antibiotic']){
  reject(id,{...d,indication},'indication');
 }
 for(const doses24h of ['','-1','99','1.5']){
  reject(id,{...d,doses24h},'history');
 }
 for(const totalMg24h of ['','-1','NaN','Infinity','100001']){
  reject(id,{...d,totalMg24h},'history');
 }
 reject(id,{...d,doses24h:'0',totalMg24h:'25'},'history');
 reject(id,{...d,doses24h:'1',totalMg24h:'0',hoursSinceLast:'9'},'history');
 reject(id,{...d,doses24h:'1',totalMg24h:'100',hoursSinceLast:''},'interval');
 reject(id,{...d,doses24h:'1',totalMg24h:'100',hoursSinceLast:'1'},'interval');
 reject(id,{...d,doses24h:String(id==='paracetamol'?4:3),totalMg24h:'100',hoursSinceLast:'8'},'limit');
 reject(id,{...d,doses24h:'1',totalMg24h:id==='paracetamol'?'800':'400',hoursSinceLast:'9'},'limit');
 const keys=id==='paracetamol'?['allergy','liver','other']:
 ['allergy','kidney','dehydration','varicella','bleeding','asthma'];
 for(const key of keys)for(const value of ['',undefined,'yes','unknown']){
  reject(id,{...d,[key]:value},'contraindication');
 }
}

// Restricted AOM regimen; all inputs are fictitious and physician-confirmed.
const aom={
 ageMonths:'36',weightKg:'15',diagnosis:'aom_confirmed',treatmentChoice:'yes',
 clinician:'yes',oralFeasible:'yes',plainAmoxicillin:'yes',
 verifiedLabel:'yes',strength:'400/5',dailyMgKg:'90',
 allergy:'no',renal:'no',amox30:'no',conjunctivitis:'no',
 nonresponsive:'no',treatmentFailure:'no',complicated:'no',highRisk:'no'
};
function passAom(data,mgDay,mgDose,ml){
 const r=e.calculate('amoxicilina_oma',data);
 assert.equal(r.ok,true,r.error||'AOM should calculate');
 approx(r.mgPerDay,mgDay);approx(r.mgPerDose,mgDose);approx(r.mlPerDose,ml);
 assert.equal(r.intervalHours,12);
 assert.equal(r.concentration,'400 mg/5 mL');
 assert.equal(r.maxMgPerDose,1000);cases++;
}
function rejectAom(data,code){
 const r=e.calculate('amoxicilina_oma',data);
 assert.equal(r.ok,false,'AOM should block: '+JSON.stringify(data));
 assert.equal(r.code,code,'Unexpected block: '+JSON.stringify(r));
 assert.equal(r.mgPerDose,undefined);
 assert.equal(r.mlPerDose,undefined);cases++;
}
passAom(aom,1350,675,8.4375);
passAom({...aom,dailyMgKg:'80'},1200,600,7.5);
passAom({...aom,weightKg:'20'},1800,900,11.25);
rejectAom({...aom,weightKg:'30'},'limit');
rejectAom({...aom,weightKg:'40'},'limit');
for(const ageMonths of ['','23','144','36.5','NaN','Infinity',undefined])
 rejectAom({...aom,ageMonths},'age');
for(const weightKg of ['','7.9','40.1','NaN','Infinity',undefined])
 rejectAom({...aom,weightKg},'weight');
for(const dailyMgKg of ['','20','45','10','0',undefined])
 rejectAom({...aom,dailyMgKg},'dose');
for(const [key,invalid,code] of [
 ['diagnosis','no','diagnosis'],['treatmentChoice','no','treatmentChoice'],
 ['clinician','no','clinician'],['oralFeasible','no','oralFeasible'],
 ['plainAmoxicillin','no','plainAmoxicillin'],['verifiedLabel','no','verifiedLabel'],
 ['strength','400/57','strength']
]){
 rejectAom({...aom,[key]:invalid},code);
 rejectAom({...aom,[key]:''},code);
}
for(const key of ['allergy','renal','amox30','conjunctivitis',
 'nonresponsive','treatmentFailure','complicated','highRisk']){
 for(const value of ['','yes','unknown',undefined])
  rejectAom({...aom,[key]:value},'precaution');
}
rejectAom({...aom,diagnosis:'pharyngitis'},'diagnosis');
rejectAom({...aom,strength:'250/5'},'strength');
rejectAom({...aom,strength:'600/5'},'strength');

const html=fs.readFileSync('index.html','utf8');
assert.ok(html.includes('<script src="./assets/pediatric-pharma.js"></script>'),'Safe drug engine loaded in browser');
assert.ok(html.includes('window.KidBumPediatricPharma?.calculate(selected,data)'),'UI connects to drug engine');
assert.ok(!html.includes('pfx-amoxicilina'),'Amoxicillin is not an available dosing choice');
assert.ok(html.includes("calculate('amoxicilina_oma',data)"),'AOM form uses guarded engine');
assert.ok(html.includes('No emplear para sinusitis, faringitis, neumonía ni otras infecciones.'),'Scope must be explicit');
assert.ok(!js.includes('localStorage')&&!js.includes('fetch('),'No patient data persistence or transmission');
assert.equal(vm.runInNewContext(js+'\ntrue;',context,{timeout:5000}),true);
console.log('Pediatric pharmacology safety tests PASSED:',cases,'positive/blocked cases; analgesics and AOM-only antibiotic');
