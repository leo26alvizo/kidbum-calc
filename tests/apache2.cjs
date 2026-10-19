'use strict';
// APACHE II independent score regression, compared with Merck scoring table.
// Merck Manual (adapted from Knaus et al., Crit Care Med 1985;13:818–829):
// https://www.merckmanuals.com/professional/multimedia/table/acute-physiologic-assessment-and-chronic-health-evaluation-apache-ii-scoring-system
// node tests/apache2.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
assert.equal(scripts.length,2,'App scripts still load');
const context={};context.window=context;context.globalThis=context;
vm.runInNewContext(scripts[0],context,{timeout:4000});
const calculate=(id,data)=>context.KidBumEngine.calculate(id,data);
const begin=html.indexOf('const dateInput='),end=html.indexOf('const categories=',begin);
const defs=vm.runInNewContext(html.slice(begin,end)+'\ndefs;',{}, {timeout:4000});
const validatorBegin=html.indexOf('function validateClinicalInputs(');
const validatorEnd=html.indexOf('function update(){',validatorBegin);
const validate=vm.runInNewContext(html.slice(validatorBegin,validatorEnd)+'\nvalidateClinicalInputs;',{}, {timeout:4000});
const quick=defs.find(d=>d.id==='apache2quick');
const precise=defs.find(d=>d.id==='apache2');
assert.ok(quick&&precise,'Both APACHE II modes are present');
const sample=def=>Object.fromEntries(def.fields.map(f=>[f.key,f.example||'']));
const quickExample=sample(quick),preciseExample=sample(precise);
assert.ok(quick.fields.every(f=>f.optional||quickExample[f.key]!==''),'Fast fictional example complete');
assert.equal(validate(quick,quickExample),null,'Fast fictional example must pass UI validator');
assert.equal(validate(precise,preciseExample),null,'Precise fictional example must pass UI validator');
for(const [id,data] of [['apache2quick',quickExample],['apache2',preciseExample]]){
 const r=calculate(id,data);
 assert.equal(r.error,undefined,id+': '+JSON.stringify(r));
 assert.equal(r.value,15,id+' fictional example expected 15/71');
}
const baseline={
 age:'35',temp:'37',map:'90',hr:'90',rr:'16',fio2:'0.21',
 pao2:'90',aagrad:'',acidmode:'ph',ph:'7.40',hco3:'',
 na:'140',k:'4',cr:'1',hct:'40',wbc:'8',gcs:'15',
 arf:'false',chronic:'no'
};
let boundaries=0;
function score(data,expected,desc){
 const result=calculate('apache2',{...baseline,...data});
 assert.equal(result.error,undefined,desc+' '+JSON.stringify(result));
 assert.equal(result.value,expected,desc+' points');
 boundaries++;
}
score({},0,'All normal');
const matrix={
 temp:[[29,4],[31,3],[33,3],[35,1],[37,0],[38.6,1],[39.5,3],[41,4]],
 map:[[40,4],[60,2],[95,0],[115,2],[135,3],[160,4]],
 hr:[[35,4],[45,3],[60,2],[90,0],[120,2],[150,3],[185,4]],
 rr:[[5,4],[8,3],[10,1],[16,0],[28,1],[40,3],[55,4]],
 na:[[109,4],[115,3],[125,2],[140,0],[152,1],[157,2],[165,3],[185,4]],
 k:[[2.3,4],[2.7,2],[3.2,1],[4,0],[5.7,1],[6.5,3],[7.3,4]],
 cr:[[0.5,2],[1,0],[1.6,2],[2.4,3],[4,4]],
 hct:[[18,4],[25,2],[40,0],[47,1],[55,2],[65,4]],
 wbc:[[0.7,4],[2,2],[10,0],[16,1],[30,2],[45,4]],
 gcs:[[3,12],[10,5],[15,0]],
 age:[[35,0],[50,2],[60,3],[70,5],[80,6]]
};
for(const [key,rows] of Object.entries(matrix))
 for(const [value,points] of rows)
  score({[key]:String(value)},points,key+' '+value);
for(const [value,points] of [[50,4],[58,3],[65,1],[75,0]])
 score({pao2:String(value)},points,'PaO2 '+value+' with FiO2 .21');
for(const [value,points] of [[100,0],[250,2],[400,3],[550,4]])
 score({fio2:'0.5',pao2:'',aagrad:String(value)},points,'A-a gradient '+value+' at FiO2 .5');
for(const [value,points] of [[7.1,4],[7.2,3],[7.3,2],[7.4,0],[7.55,1],[7.65,3],[7.75,4]])
 score({ph:String(value)},points,'arterial pH '+value);
for(const [value,points] of [[10,4],[16,3],[20,2],[25,0],[35,1],[45,3],[55,4]])
 score({acidmode:'hco3',ph:'',hco3:String(value)},points,'venous HCO3 '+value);
for(const [chronic,points] of [['no',0],['elective',2],['emergency',5],['nonoperative',5]])
 score({chronic},points,'Prior severe illness '+chronic);
score({cr:'1.6',arf:'true'},4,'Creatinine score doubled for AKI');
score({cr:'4',arf:'true'},8,'Creatinine score doubled when high');
assert.ok(calculate('apache2',{...baseline,age:'17'}).error,'No adults younger than 18');
assert.ok(calculate('apache2',{...baseline,ph:'',acidmode:'ph'}).error,'Missing pH is invalid');
assert.ok(calculate('apache2',{...baseline,fio2:'0.55',aagrad:'',pao2:'65'}).error,'A-a gradient is required for FiO2 >=.5');
const fake={...quickExample,temp:'99'};
assert.ok(calculate('apache2quick',fake).error,'Fast mode rejects impossible points');
assert.ok(calculate('apache2quick',{...quickExample,gcs:'13'}).error,'Fast mode rejects invalid GCS contribution');
assert.ok(calculate('apache2quick',{...quickExample,chronic:'4'}).error,'Fast mode rejects impossible chronic score');
assert.ok(calculate('apache2quick',{...quickExample,arf:''}).error,'AKI status must be explicit');
assert.equal(calculate('apache2quick',{...quickExample,acidmode:'hco3',hco3:'2'}).value,15,'Venous HCO3 alternative quick mode');
console.log('APACHE II PASSED: '+boundaries+' independent score cases, matching examples, strict quick-score validation.');
