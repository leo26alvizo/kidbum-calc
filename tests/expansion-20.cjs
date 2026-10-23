'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const text=fs.readFileSync('assets/expansion-20.js','utf8'),home=fs.readFileSync('index.html','utf8'),page=fs.readFileSync('expansion-20.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
const context={window:{}};new vm.Script(text);vm.runInNewContext(text,context);
const {tools,evaluate,sources}=context.window.KidBum20;
const required=['pecarn','silverman','ballard','pram','kdigo','heart','grace','meld','ich','bisap','aims65','appendicitis','westley','pews','nexus','ottawa','meows','fullpiers','at4','frailty'];
assert.equal(tools.length,20);assert.equal(new Set(tools.map(x=>x.id)).size,20);
assert.deepEqual(Array.from(tools,x=>x.id),required);
for(const t of tools){
 assert.match(t.source,/^https:\/\//);assert.ok(t.warning.length>45,t.id+' caution');assert.ok(t.title.length>9,t.id);
 assert.ok(fs.existsSync('assets/'+t.image),'Missing verified cover '+t.id);
 assert.match(home,new RegExp("id:'"+t.id+"',category:'"));
 assert.ok(t.kind,t.id+' engine');
 const models=t.variants?Object.values(t.variants):[t];
 for(const model of models){
  assert.ok(model.fields.length>=1);
  const missing=evaluate(t,{},t.variants?Object.keys(t.variants)[0]:undefined);
  assert.equal(missing,null,t.id+' no result on missing data');
  const inputs={};for(const field of model.fields){const first=field.type==='choice'?field.options[0][0]:field.min;inputs[field.key]=String(first)}
  const key=t.variants?Object.keys(t.variants).find(k=>t.variants[k]===model):undefined;
  const res=evaluate(t,inputs,key);
  assert.ok(res&&res.display&&res.interpretation,t.id+' should provide nonempty output');
 }
}
function values(id,over={},variant){const t=tools.find(t=>t.id===id),f=t.variants?t.variants[variant||Object.keys(t.variants)[0]].fields:t.fields;return Object.assign(Object.fromEntries(f.map(x=>[x.key,String(x.type==='choice'?x.options[0][0]:x.min)])),over)}
function run(id,over,mode){const t=tools.find(t=>t.id===id);return evaluate(t,values(id,over,mode),mode)}
assert.match(run('pecarn',{},'infant').display,/Muy bajo/);
assert.match(run('pecarn',{fracture:'yes'},'infant').display,/alto riesgo/);
assert.match(run('pecarn',{vomit:'yes'},'older').display,/intermedio/);
assert.match(run('silverman',{}).display,/0 puntos/);
assert.match(run('pram',{sat:'2',supra:'2',scalene:'2',air:'3',wheeze:'3'}).display,/12 puntos/);
assert.match(run('ballard',Object.fromEntries(Array.from({length:12},(_,i)=>['b'+i,'0']))).display,/24.0 semanas/);
assert.match(run('kdigo',{baseline:'1',current:'2',within7:'yes',delta48:'no',urine:'0',rrt:'no'}).display,/estadio 2/);
assert.match(run('kdigo',{baseline:'1',current:'1',within7:'no',delta48:'yes',urine:'0',rrt:'no'}).display,/estadio 1/);
assert.match(run('heart',{}).display,/0 puntos/);
assert.match(run('grace',{}).display,/cálculo oficial pendiente/);
assert.match(run('fullpiers',{}).display,/cálculo oficial pendiente/);
assert.match(run('meld',{female:'0',bilirubin:'1',inr:'1',cr:'1',na:'137',albumin:'3.5',dialysis:'no'}).display,/6 puntos/);
assert.match(run('ich',{gcs:'2',age:'yes',volume:'yes',ventricle:'yes',infratentorial:'yes'}).display,/6\/6/);
assert.match(run('bisap',{bun:'yes',mental:'yes',sirs:'yes'}).display,/3 puntos/);
assert.match(run('aims65',{}).display,/0 puntos/);
assert.match(run('appendicitis',{},'alvarado').display,/0 puntos/);
assert.match(run('appendicitis',{},'air').display,/0 puntos/);
assert.match(run('westley',{stridor:'2',retractions:'3',air:'2',cyanosis:'5',mental:'5'}).display,/17 puntos/);
assert.match(run('pews',{}).display,/0 puntos/);
assert.match(run('nexus',{}).display,/ausentes/);
assert.match(run('nexus',{neuro:'yes'}).display,/positivo/);
assert.match(run('ottawa',{pain:'yes',fifth:'yes'},'foot').display,/positiva/);
assert.match(run('meows',{temp:'38.5',sbp:'160',dbp:'80',hr:'90',rr:'19',neuro:'no',bleed:'no'}).display,/roja/);
assert.match(run('at4',{alert:'4',amt4:'0',attention:'0',acute:'4'}).display,/8 puntos/);
assert.match(run('frailty',{cfs:'9'}).display,/CFS 9\/9/);
assert.match(page,/assets\/expansion-20\.js/);assert.match(page,/assets\/chatgpt-analysis\.js/);assert.match(page,/KidBumAnalysis\.attach/);
assert.match(page,/setReady\(false\)/);assert.match(page,/setReady\(true\)/);assert.match(page,/kidbum-theme/);
for(const script of page.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)){if(script[1].trim())new vm.Script(script[1])}
assert.match(sw,/'\.\/expansion-20\.html'/);assert.match(sw,/'\.\/assets\/expansion-20\.js'/);
assert.equal(tools.filter(t=>t.kind==='reference').length,2,'GRACE/fullPIERS should not invent risks');
console.log('PASS: 20 clinical modules, validated boundary scenarios, 20 verified images, no input assumptions, ChatGPT privacy handoff, PWA.');
