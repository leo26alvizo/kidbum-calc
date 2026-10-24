'use strict';
// Clinical formulas are checked independently of their UI and against source-defined units.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/hepatologia-indices.js','utf8');
const ctx={window:{}};new vm.Script(source,{filename:'hepatologia-indices.js'});vm.runInNewContext(source,ctx);
const {tools,evaluate,examples}=ctx.window.KidBumHepatologia;
const ids=['rfactor','deritis','apri','albi','fli','nfs'];
assert.deepEqual(Array.from(tools,t=>t.id),ids);
const almost=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,'Expected '+b+', got '+a);
for(const def of tools){
 assert.match(def.source,/^https:\/\//);
 assert.ok(def.warning.length>=130,def.id+' requires explicit safety warning');
 assert.ok(fs.existsSync('assets/'+def.image),def.id+' image missing');
 const example=examples[def.id];assert.ok(example);
 assert.deepEqual(Object.keys(example).sort(),Array.from(def.fields,f=>f.key).sort());
 const result=evaluate(def,example);assert.ok(result&&result.value&&result.interpretation);
 assert.equal(evaluate(def,{}),null);
 for(const field of def.fields){
  const missing={...example};delete missing[field.key];assert.equal(evaluate(def,missing),null,def.id+'/'+field.key+' absent');
  for(const invalid of ['-1','Infinity','NaN','1e3','../../etc','', ' ']){
   assert.equal(evaluate(def,{...example,[field.key]:invalid}),null,def.id+'/'+field.key+' invalid '+invalid);
  }
  if(field.type==='number'){
   assert.equal(evaluate(def,{...example,[field.key]:String(field.max+1)}),null,def.id+'/'+field.key+' above range');
   assert.equal(evaluate(def,{...example,[field.key]:String(field.min-0.1)}),null,def.id+'/'+field.key+' below range');
  }
 }
}
const R=(ALT,ALTu,FA,FAu)=>evaluate('rfactor',{alt:String(ALT),altUln:String(ALTu),alp:String(FA),alpUln:String(FAu)});
assert.match(R(280,40,240,120).value,/3.50/);
assert.match(R(280,40,240,120).interpretation,/mixto/);
assert.match(R(200,40,120,120).interpretation,/hepatocelular/,'R=5 boundary');
assert.match(R(80,40,120,120).interpretation,/colestásico/,'R=2 boundary');
assert.match(R(80,40,80,120).interpretation,/mixto/);
assert.match(R(20,40,60,120).interpretation,/Sin patrón/,'Both enzymes normal: do not label liver injury');
assert.equal(evaluate('rfactor',{...examples.rfactor,altUln:'0'}),null,'Cannot divide by zero');
assert.equal(evaluate('rfactor',{...examples.rfactor,alpUln:'0'}),null,'Cannot divide by zero');
assert.match(evaluate('deritis',{ast:'80',alt:'40'}).value,/2.00/);
assert.match(evaluate('apri',{ast:'80',astUln:'40',platelets:'200'}).value,/1.00/);
assert.equal(evaluate('apri',{ast:'80',astUln:'40',platelets:'0'}),null);
function fromValue(s){return Number(s.replace(/\./g,'').replace(',','.').replace(/\/100|\s*×|\s*segundos/g,''));}
const albi=evaluate('albi',{bilirubin:'1',albumin:'4'});
const calculated=0.66*Math.log10(17.104)-0.085*40;
almost(fromValue(albi.value.replace('ALBI ','')),Number(calculated.toFixed(3)),0.000001);
assert.match(albi.interpretation,/Grado 2/);
assert.match(evaluate('albi',{bilirubin:'0.7',albumin:'4.5'}).interpretation,/Grado 1/);
assert.match(evaluate('albi',{bilirubin:'10',albumin:'2.4'}).interpretation,/Grado 3/);
const f=examples.fli;const score=100/(1+Math.exp(-(0.953*Math.log(+f.tg)+0.139*(+f.bmi)+0.718*Math.log(+f.ggt)+0.053*(+f.waist)-15.745)));
almost(fromValue(evaluate('fli',f).value),Number(score.toFixed(1)),0.0000001);
assert.match(evaluate('fli',{bmi:'22',waist:'75',tg:'90',ggt:'15'}).interpretation,/menos probable/);
assert.match(evaluate('fli',{bmi:'40',waist:'130',tg:'330',ggt:'200'}).interpretation,/mayor probabilidad/);
const n=examples.nfs;const exact=-1.675+0.037*50+0.094*30+1.13+0.99*80/60-0.013*180-0.66*3.6;
almost(fromValue(evaluate('nfs',n).value),Number(exact.toFixed(3)),0.000001);
assert.match(evaluate('nfs',n).interpretation,/superior/);
assert.match(evaluate('nfs',{age:'40',bmi:'22',ifg:'no',ast:'24',alt:'36',platelets:'270',albumin:'4.5'}).interpretation,/inferior/);
assert.equal(evaluate('nfs',{...n,ifg:'unknown'}),null,'No auto-assuming diabetes history');
const html=fs.readFileSync('hepatologia-indices.html','utf8');
for(const match of html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g))if(match[1].trim())new vm.Script(match[1],{filename:'hepatologia-indices.html'});
for(const word of ['id="example"','id="example-note"','id="copy"','id="reset"','id="kb-ai-mount"','KidBumAnalysis.attach','analysis.setReady(Boolean(last))','localStorage.getItem(\'kidbum-theme\')','src="./assets/hepatologia-indices.js"'])assert.ok(html.includes(word),'Missing UI feature: '+word);
assert.ok(!/\bfetch\(|XMLHttpRequest|indexedDB/.test(source+html),'No network use of measurements');
const main=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
for(const id of ids){
 assert.ok(main.includes("id:'"+id+"',category:'Hepatología',href:'./hepatologia-indices.html#"+id+"'"),'Missing registry '+id);
 assert.ok(main.includes('"id":"'+id+'"'),'Missing rendered tile '+id);
}
assert.match(main,/data-hepatologia/);
assert.match(sw,/'\.\/hepatologia-indices\.html'/);
assert.match(sw,/'\.\/assets\/hepatologia-indices\.js'/);
console.log('HEPATOLOGY PASS: six formulas, units, raw arithmetic, clinical thresholds, missing/invalid inputs, examples, accessibility and airplane mode.');
