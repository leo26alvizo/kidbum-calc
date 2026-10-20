'use strict';
// Urinary output in adults — independent validation and KDIGO threshold regressions.
// node tests/urine-output-adult.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const blocks=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
assert.ok(blocks.length>=2,'Clinical core must load');
const context={};context.window=context;context.globalThis=context;
vm.runInNewContext(fs.readFileSync('assets/startup-bundle.js','utf8'),context,{timeout:10000});
vm.runInNewContext(blocks[0],context,{timeout:10000});
const e=context.KidBumEngine;
const defs=vm.runInNewContext(html.slice(html.indexOf('const dateInput='),html.indexOf('const categories='))+'\ndefs;',{}, {timeout:5000});
const a=html.indexOf('function validateClinicalInputs('),b=html.indexOf('function update(){',a);
const guard=vm.runInNewContext(html.slice(a,b)+'\nvalidateClinicalInputs;',{}, {timeout:5000});
const d=defs.find(d=>d.id==='urineoutputadult');
assert.ok(d&&d.category==='Función renal');
assert.equal(defs.length,77,'Previous 76 calculators preserved and one added');
assert.equal(e.list.length,77,'All clinical modules registered');
assert.equal(new Set(defs.map(d=>d.id)).size,77,'No duplicate calculator ID');
const sample=Object.fromEntries(d.fields.map(f=>[f.key,f.example||'']));
assert.equal(guard(d,sample),null,'Fictitious example is complete and passes form validation');
let count=0;
function calculate(overrides={}){
 return e.calculate(d.id,{...sample,...overrides});
}
function within(data,expected,phrase){
 const r=calculate(data);
 assert.ok(!r.error,'Unexpected error '+JSON.stringify(r));
 assert.ok(Math.abs(r.value-expected)<1e-10,'Expected '+expected+' got '+r.value);
 assert.equal(r.unit,'mL/kg/h');
 if(phrase)assert.ok(r.interpretation.includes(phrase),JSON.stringify(r));
 count++;return r;
}
function reject(data){
 const supplied={...sample,...data};
 const r=e.calculate(d.id,supplied);
 assert.ok(Array.isArray(r.error)&&r.error.length>0,'Invalid case accepted '+JSON.stringify(supplied));
 assert.equal(r.value,undefined);
 count++;
 return r;
}
let r=within({},210/(70*8),'≥6 h');
assert.ok(r.detail.includes('26.3 mL/h'),'Shows mL/hr alongside mL/kg/hr');
assert.ok(r.notes.some(x=>x.includes('NO demuestra')),'No automatic AKI stage');
within({urine:'210',hours:'6'},0.5,'sin oliguria');
within({urine:'209.99',hours:'6'},209.99/(70*6),'≥6 h');
within({urine:'419.99',hours:'12'},419.99/(70*12),'≥12 h');
within({urine:'420',hours:'12'},0.5,'sin oliguria');
within({urine:'504',hours:'24'},0.3,'≥12 h');
within({urine:'503.9',hours:'24'},503.9/(70*24),'mayor gravedad');
within({urine:'0',hours:'12'},0,'Anuria');
within({urine:'0',hours:'24'},0,'Anuria');
within({urine:'0',hours:'11'},0,'≥6 h');
within({urine:'0',hours:'5'},0,'menor de 6 h');
within({urine:'500',hours:'5'},500/(70*5),'sin oliguria');
within({urine:'300',hours:'1',weight:'50'},6,'sin oliguria');
within({age:'18',weight:'20',urine:'12',hours:'1'},0.6,'sin oliguria');
within({age:'120',weight:'300',urine:'0',hours:'24'},0,'Anuria');
for(const data of [
 {age:'17'},{age:'121'},{age:'19.5'},{age:''},{age:'foo'},
 {weight:'19.9'},{weight:'301'},{weight:''},{weight:'Infinity'},
 {hours:'0'},{hours:'0.5'},{hours:'24.1'},{hours:'-6'},{hours:''},
 {urine:'-1'},{urine:'10001'},{urine:''},{urine:'NaN'},
 {confirmed:'no'},{confirmed:''},{confirmed:'__INVALID_OPTION__'}
])reject(data);
for(const field of d.fields){
 const sampleInvalid={...sample,[field.key]:field.type==='choice'?'__INVALID_OPTION__':'not-a-number'};
 const result=guard(d,sampleInvalid);
 assert.ok(result&&(result.error||result.missing),'Form accepted invalid '+field.key);
 assert.ok(e.calculate(d.id,sampleInvalid).error,'Engine accepted invalid '+field.key);
 count++;
}
assert.ok(e.list.includes('pediou'),'Original pediatric urine calculation retained');
assert.ok(e.list.includes('fena')&&e.list.includes('feurea'),'Existing renal indices retained');
const text=html.match(/urineoutputadult:\[\[['KDIGO[\s\S]*?\]\],/);
assert.ok(text,'Original KDIGO guideline linked from reference section');
console.log('ADULT URINE OUTPUT PASS: '+count+' positive, boundary and blocking checks, one new calculation, existing 76 preserved');
