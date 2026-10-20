'use strict';
// KidBum CALC: six non-prescriptive electrolyte reference engines.
// Independent arithmetic, UI example completeness, unit and safety checks.
// node tests/electrolytes.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const blocks=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
const ctx={};ctx.window=ctx;ctx.globalThis=ctx;
vm.runInNewContext(fs.readFileSync('assets/startup-bundle.js','utf8'),ctx,{timeout:10000});
vm.runInNewContext(blocks[0],ctx,{timeout:5000});
const engine=ctx.KidBumEngine;
const a=html.indexOf('const dateInput='),b=html.indexOf('const categories=',a);
const definitions=vm.runInNewContext(html.slice(a,b)+'\ndefs;',{}, {timeout:5000});
const start=html.indexOf('function validateClinicalInputs(');
const stop=html.indexOf('function update(){',start);
const validate=vm.runInNewContext(html.slice(start,stop)+'\nvalidateClinicalInputs;',{}, {timeout:5000});
const ids=['nadeficit','freewater','correctedca','osmgap','potassiumreview','bicarbdef'];
assert.equal(engine.list.length,84,'Previous renal/chemistry references preserved among 84 clinical tools');
assert.equal(definitions.length,84);
assert.equal(new Set(definitions.map(d=>d.id)).size,84,'No duplicate IDs');
const base={};
for(const id of ids){
 const d=definitions.find(d=>d.id===id);
 assert.ok(d,'Field definition present: '+id);
 assert.equal(d.category,['nadeficit','freewater','potassiumreview'].includes(id)?'Función renal':'Química clínica');
 base[id]=Object.fromEntries(d.fields.map(f=>[f.key,f.example||'']));
 assert.equal(validate(d,base[id]),null,'Fictitious example validates '+id);
 const r=engine.calculate(id,base[id]);
 assert.equal(r.error,undefined,'Fictitious example computes '+id+': '+JSON.stringify(r));
 assert.ok(Number.isFinite(r.value));
 assert.ok(r.notes.some(s=>/NO|no |nunca |sin /i.test(s)),'Safety warning present: '+id);
}
const approx=(id,input,expected)=>{
 const result=engine.calculate(id,input);
 assert.equal(result.error,undefined,'Unexpected block: '+id+' '+JSON.stringify(result));
 assert.ok(Math.abs(result.value-expected)<1e-8,id+' expected '+expected+', got '+result.value);
};
const blocked=(id,change)=>{
 const res=engine.calculate(id,{...base[id],...change});
 assert.ok(Array.isArray(res.error)&&res.error.length>0,'Must block '+id+' '+JSON.stringify(change));
 assert.equal(res.value,undefined,'No partial output permitted');
};
approx('nadeficit',base.nadeficit,175); // 70*0.5*(133-128)
approx('nadeficit',{...base.nadeficit,target:'130'},70);
blocked('nadeficit',{target:'139'});
blocked('nadeficit',{na:'140'});
blocked('nadeficit',{checked:'no'});
blocked('nadeficit',{tbwfactor:'0.7'});
approx('freewater',base.freewater,30*(166/140-1));
approx('freewater',{...base.freewater,na:'147'},30*(147/140-1));
blocked('freewater',{na:'135'});
blocked('freewater',{verified:'no'});
blocked('freewater',{tbwfactor:''});
approx('correctedca',base.correctedca,9.2);
approx('correctedca',{...base.correctedca,ca:'9',alb:'4'},9);
blocked('correctedca',{context:'unknown'});
blocked('correctedca',{alb:'0'});
assert.ok(engine.calculate('correctedca',base.correctedca).notes.some(x=>x.includes('ionizado')));
approx('osmgap',base.osmgap,22); // measured 312 - calculated 290
approx('osmgap',{...base.osmgap,measured:'290'},0);
approx('osmgap',{...base.osmgap,ethanolMode:'measured',ethanol:'74'},2); // 74/3.7 = 20
blocked('osmgap',{sameSample:'no'});
blocked('osmgap',{ethanolMode:'measured',ethanol:''});
blocked('osmgap',{ethanol:'30',ethanolMode:'absent'});
blocked('osmgap',{measured:'unavailable'});
approx('potassiumreview',base.potassiumreview,2.8);
approx('potassiumreview',{...base.potassiumreview,k:'6.5',ecg:'yes'},6.5);
blocked('potassiumreview',{k:'0'});
blocked('potassiumreview',{ecg:'INVALID'});
blocked('potassiumreview',{verified:'no'});
const k=engine.calculate('potassiumreview',{...base.potassiumreview,k:'2.2'});
assert.ok(k.interpretation.includes('urgente'));
assert.ok(k.notes.some(s=>s.includes('NO se puede deducir el déficit corporal')));
approx('bicarbdef',base.bicarbdef,280); // 70*0.5*(18-10)
approx('bicarbdef',{...base.bicarbdef,factor:'0.3'},168);
blocked('bicarbdef',{target:'22'});
blocked('bicarbdef',{hco3:'22'});
blocked('bicarbdef',{confirm:'no'});
blocked('bicarbdef',{factor:'0.7'});
const text=engine.calculate('bicarbdef',base.bicarbdef).notes.join(' ');
assert.ok(/No utilizar para convertir en ampollas/.test(text));
for(const id of ['egfr','cg','anion','fena','feurea','correctedna','osm'])
 assert.ok(engine.list.includes(id),'Original calculation preserved: '+id);
console.log('Electrolyte calculators PASS: six modules, complete examples, cross-validation, no automated fluid or KCl orders');
