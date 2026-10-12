'use strict';
// KidBum CALC functional and defensive-input audit; node tests/safety-audit.cjs
// Checks application behavior. NOT an independent clinical validation.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const bundle=fs.readFileSync('assets/startup-bundle.js','utf8');
const inline=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim());
assert.equal(inline.length,2,'Expected two inline scripts');
const root={};root.window=root;root.globalThis=root;
vm.runInNewContext(bundle,root,{timeout:10000});
vm.runInNewContext(inline[0],root,{timeout:10000});
assert.ok(root.KidBumEngine,'Integrated clinical engine must load');
const begin=html.indexOf('const dateInput=');
const end=html.indexOf('const categories=',begin);
assert.ok(begin>0&&end>begin,'Calculator definitions must exist');
const defs=vm.runInNewContext(html.slice(begin,end)+'\ndefs;',{}, {timeout:5000});
assert.equal(root.KidBumEngine.list.length,defs.length,'Every form must have an engine registration');
assert.ok(defs.length>=68,'Do not silently remove the original calculators');
const calc=(id,data)=>root.KidBumEngine.calculate(id,data);
const start=html.indexOf('function validateClinicalInputs(');
const stop=html.indexOf('function update(){',start);
assert.ok(start>0&&stop>start,'Clinical form guard must exist');
const validate=vm.runInNewContext(html.slice(start,stop)+'\nvalidateClinicalInputs;',{}, {timeout:5000});
function formInput(def){
 const data={};
 for(const field of def.fields){
  const raw=field.example||'';
  data[field.key]=field.type==='choice'&&['mental','confusion'].includes(field.key)
   ?(raw===''?undefined:raw==='true'):raw;
 }
 return data;
}
function good(result){
 return result&&!result.error&&!result.missing
  &&(result.value!==undefined||result.display!==undefined)
  &&(result.value===undefined||result.value===null||Number.isFinite(result.value));
}
let normal=0,invalid=0,arithmetic=0;
const coverage={};
for(const def of defs){
 const base=formInput(def);
 const first=calc(def.id,base);
 assert.equal(validate(def,base),null,'Valid example blocked by shared form guard: '+def.id);
 assert.ok(good(first),'Example does not yield a valid result: '+def.id+' '+JSON.stringify(first));
 normal++;coverage[def.category]=(coverage[def.category]||0)+1;
 for(const field of def.fields){
  const attempts=[];
  if(field.type==='number'){
   if(Number.isFinite(field.min))attempts.push(['belowMin',String(field.min-1)]);
   if(Number.isFinite(field.max))attempts.push(['aboveMax',String(field.max+1)]);
   attempts.push(['notANumber','not-a-number'],['infinity','Infinity']);
  }else if(field.type==='date'){
   attempts.push(['invalidDate','2026-02-31']);
  }else if(field.type==='choice'){
   attempts.push(['invalidOption','__INVALID_OPTION__']);
  }
  for(const [kind,wrongValue] of attempts){
   const data={...base,[field.key]:wrongValue};
   const pre=validate(def,data);
   assert.ok(pre&&(pre.error||pre.missing),
    'Invalid input passed shared form guard: '+def.id+'.'+field.key+' / '+kind);
   const result=calc(def.id,data);
   assert.ok(result&&Array.isArray(result.error)&&result.error.length>0,
    'Invalid input accepted by engine: '+def.id+'.'+field.key+' / '+kind);
   invalid++;
  }
 }
}
function near(id,data,expected){
 const result=calc(id,data);
 assert.ok(good(result),'Independent check did not yield a result: '+id);
 assert.ok(typeof result.value==='number'&&Math.abs(result.value-expected)<1e-6,
  'Math check failed for '+id+': got '+result.value+', expected '+expected);
 arithmetic++;
}
near('anion',{na:140,cl:104,hco3:23},13);
near('osm',{na:140,gluc:90,bun:14},290);
near('bmi',{weight:70,height:170},70/(1.7*1.7));
near('bsa',{weight:70,height:170},Math.sqrt(170*70/3600));
near('map',{sbp:120,dbp:80},(120+2*80)/3);
near('shock',{hr:100,sbp:100},1);
near('gcs',{eye:'4',verbal:'5',motor:'6'},15);
near('pafi',{pao2:80,fio2:40,peep:'yes'},200);
near('rox',{spo2:92,fio2:50,rr:25,time:'6',hfno:'yes'},7.36);
near('rass',{assessed:'yes',score:'-2'},-2);
near('alteplaseais',{weight:70,context:'adult_ais_reference',acknowledge:'yes'},63);
near('pedholliday',{weight:15,ageDays:365},1250);
near('ped421',{weight:15,ageDays:365},50);
near('fena',{una:20,pna:140,ucr:80,pcr:2,diuretics:'false'},100*20*2/(140*80));
near('feurea',{ureaU:300,ureaP:40,ureaunit:'urea_mgdl',ucr:80,pcr:2,diuretics:'false'},100*300*2/(40*80));
for(const [id,key] of [['rox','hfno'],['rass','assessed']]){
 const def=defs.find(d=>d.id===id);
 assert.ok(calc(id,{...formInput(def),[key]:'no'}).error,
  'Clinical context must block calculation: '+id);
}
/* Cross-field safety: systolic pressure cannot be lower than diastolic. */
let contradictoryPressureChecks=0;
for(const id of ['abcd2','map','curb']){
 const def=defs.find(d=>d.id===id);
 const data={...formInput(def),sbp:'80',dbp:'120'};
 assert.ok(validate(def,data)?.error,'Form must block contradictory BP: '+id);
 assert.ok(calc(id,data).error,'Engine must block contradictory BP: '+id);
 contradictoryPressureChecks++;
}
console.log('KidBum CALC functional safety audit: PASSED');
console.log(JSON.stringify({
 calculators:normal,invalidInputsRejected:invalid,conditionalAisInputsDeferred:0,
 independentArithmeticChecks:arithmetic,contradictoryPressureChecks,totalExecuted:normal+invalid+arithmetic+2+contradictoryPressureChecks,
 categories:coverage
},null,2));
