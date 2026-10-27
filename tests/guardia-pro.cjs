'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const clinical=fs.readFileSync('assets/guardia-pro.js','utf8');
const page=fs.readFileSync('guardia-pro.html','utf8');
const home=fs.readFileSync('index.html','utf8');
const ctx={window:{}};new vm.Script(clinical);vm.runInNewContext(clinical,ctx);
const kit=ctx.window.KidBumGuardiaPro;
assert.ok(kit,'Standalone clinical engine');
assert.equal(kit.tools.length,3);
assert.deepEqual(Array.from(kit.tools,t=>t.id),['hit4ts','padua','improvebleed']);
const calc=(id,fixture)=>kit.evaluate(id,fixture);
const example=id=>({...kit.examples[id]});
for(const t of kit.tools){
 assert.ok(t.source.startsWith('https://'));assert.ok(t.warning.length>70);
 assert.ok(kit.examples[t.id]);assert.ok(calc(t.id,example(t.id)),'Every fictional example evaluates');
 for(const f of t.fields){
  assert.ok(f.label.length>3);
  if(f.type==='choice')assert.ok(f.options.every(([k])=>k!==''),'Missing choice is never accepted');
  const x=example(t.id);delete x[f.key];assert.equal(calc(t.id,x),null,'Fail closed for missing '+t.id+'/'+f.key);
 }
}
let x=example('hit4ts');
for(const k of ['platelets','timing','thrombosis','other'])x[k]='0';
assert.equal(calc('hit4ts',x).value,0);
x.platelets='2';x.timing='1';assert.equal(calc('hit4ts',x).value,3);
x.thrombosis='1';assert.equal(calc('hit4ts',x).value,4);
x.other='1';assert.equal(calc('hit4ts',x).value,5);
x.timing='2';assert.equal(calc('hit4ts',x).value,6);
x.thrombosis='2';x.other='2';assert.equal(calc('hit4ts',x).value,8);
assert.match(calc('hit4ts',x).interpretation,/ALTA/);
assert.equal(calc('hit4ts',{...x,context:'no'}),null);
assert.equal(calc('hit4ts',{...x,platelets:'3'}),null);
let p=example('padua');for(const f of kit.tools.find(t=>t.id==='padua').fields){if(f.key!=='scope')p[f.key]='no'}
assert.equal(calc('padua',p).value,0);
p.cancer='yes';assert.equal(calc('padua',p).value,3);
p.age70='yes';assert.equal(calc('padua',p).value,4);
assert.match(calc('padua',p).interpretation,/ELEVADO/);
for(const f of kit.tools.find(t=>t.id==='padua').fields){if(f.key!=='scope')p[f.key]='yes'}
assert.equal(calc('padua',p).value,20);
assert.equal(calc('padua',{...p,scope:'no'}),null);
let b=example('improvebleed');
for(const f of kit.tools.find(t=>t.id==='improvebleed').fields){if(!['scope','age','sex','egfr'].includes(f.key))b[f.key]='no'}
b.age='85';b.egfr='60';b.sex='male';b.cancer='yes';
assert.equal(calc('improvebleed',b).value,6.5);
assert.match(calc('improvebleed',b).interpretation,/no excluye sangrado/i);
b.cancer='no';b.age='70';b.egfr='29';b.catheter='yes';
assert.equal(calc('improvebleed',b).value,7);
assert.match(calc('improvebleed',b).interpretation,/ELEVADO/);
b.egfr='30';assert.equal(calc('improvebleed',b).value,5.5);
b.egfr='59';assert.equal(calc('improvebleed',b).value,5.5);
b.egfr='60';assert.equal(calc('improvebleed',b).value,4.5);
b.age='84';assert.equal(calc('improvebleed',b).value,4.5);
b.age='85';assert.equal(calc('improvebleed',b).value,6.5);
assert.equal(calc('improvebleed',{...b,age:'84.5'}),null);
assert.equal(calc('improvebleed',{...b,egfr:'NaN'}),null);
assert.equal(calc('improvebleed',{...b,scope:'no'}),null);
assert.match(home,/guardia-pro\.html#hit4ts/);assert.match(home,/guardia-pro\.html#padua/);assert.match(home,/guardia-pro\.html#improvebleed/);
assert.match(home,/data-guardia-pro/);assert.match(home,/Trombosis y sangrado/);
assert.match(page,/id="example"/);assert.match(page,/id="reset"/);assert.match(page,/id="copy"/);
assert.match(page,/kidbum-theme/);assert.match(page,/localStorage\.setItem\('kidbum-theme'/);
assert.doesNotMatch(page+clinical,/api\.openai\.com|fetch\(/,'No outbound patient API');
for(const script of page.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g)){if(script[1].trim())new vm.Script(script[1])}
console.log('Guardia Pro PASS: 4Ts 0–8, Padua 0–20, IMPROVE fractions, age and eGFR cutoffs, fail-closed inputs and local UI.');
