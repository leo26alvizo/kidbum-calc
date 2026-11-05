'use strict';
// Clinical PAS algorithm QA — verifies arithmetic and fail-closed behavior, NOT independent medical validation.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=x=>fs.readFileSync(x,'utf8');
const core=read('assets/pediatric-pas-core-v01045.js');
const ui=read('assets/pediatric-pas-ui-v01045.js');
const css=read('assets/pediatric-pas-v01045.css');
const page=read('pediatria-pas.html'),home=read('index.html'),sw=read('sw.js');
new vm.Script(core,{filename:'pas-core.js'});new vm.Script(ui,{filename:'pas-ui.js'});
const ctx={};ctx.globalThis=ctx;vm.runInNewContext(core,ctx,{timeout:5000});
const pas=ctx.KidBumPAS;assert.ok(pas&&pas.calculate&&pas.classify);
assert.equal(pas.criteria.length,8);
assert.equal(Array.from(pas.criteria,x=>x.points).reduce((a,b)=>a+b,0),10);
assert.equal(new Set(Array.from(pas.criteria,x=>x.key)).size,8);
assert.equal(pas.classify(0),'low');assert.equal(pas.classify(3),'low');
assert.equal(pas.classify(4),'intermediate');assert.equal(pas.classify(6),'intermediate');
assert.equal(pas.classify(7),'high');assert.equal(pas.classify(10),'high');
const clinical=['migration','anorexia','vomiting','fever','rlq','movement'];
const allNo=Object.fromEntries(clinical.map(k=>[k,'no']));
function input(yes=[],rest={}){
 const answers={...allNo,...Object.fromEntries(yes.map(k=>[k,'yes']))};
 return {ageYears:'9',redFlags:{unstable:'no',peritonitis:'no'},
  answers,wbcK:'8',ancK:'5',...rest};
}
function ok(data,score,band){
 const r=pas.calculate(data);
 assert.equal(r.ok,true,JSON.stringify(r));
 assert.equal(r.complete,true);
 assert.equal(r.score,score,JSON.stringify(r));
 assert.equal(r.band,band,JSON.stringify(r));
 assert.equal(r.range[0],score);assert.equal(r.range[1],score);
 return r;
}
ok(input(),0,'low');
ok(input(['migration','anorexia','vomiting']),3,'low');
ok(input(['migration','anorexia','vomiting','fever']),4,'intermediate');
ok(input(['rlq','movement','migration','anorexia']),6,'intermediate');
ok(input(['rlq','movement','migration','anorexia','vomiting']),7,'high');
ok(input(clinical,{wbcK:'12',ancK:'9'}),10,'high');
let r=pas.calculate(input(['movement','rlq'],{answers:{migration:'unknown',anorexia:'no',vomiting:'no',fever:'no',rlq:'yes',movement:'yes'}}));
assert.equal(r.ok,true);assert.equal(r.score,null);assert.equal(r.complete,false);
assert.equal(r.pointsKnown,4);assert.equal(r.range[0],4);assert.equal(r.range[1],5);
assert.equal(r.band,'pending');assert.equal(r.missing,1);
assert.match(r.warnings.join(' '),/INCOMPLETO/);
r=pas.calculate({...input(),ancK:''});
assert.equal(r.score,null);assert.equal(r.band,'pending');assert.equal(r.missing,1);assert.equal(r.range[1],1);
r=pas.calculate(input([], {redFlags:{unstable:'unknown',peritonitis:'unknown'}}));
assert.equal(r.score,0);assert.equal(r.band,'pending');assert.equal(r.complete,true);
r=pas.calculate(input(['rlq','movement','migration'],{redFlags:{unstable:'unknown',peritonitis:'unknown'}}));
assert.equal(r.score,5);assert.equal(r.band,'intermediate');
r=pas.calculate(input(['rlq','movement','migration','vomiting','anorexia'],{redFlags:{unstable:'unknown',peritonitis:'unknown'}}));
assert.equal(r.score,7);assert.equal(r.band,'high');
for(const flag of ['unstable','peritonitis']){
 const flags={unstable:'no',peritonitis:'no'};flags[flag]='yes';
 r=pas.calculate({...input(),redFlags:flags});
 assert.equal(r.band,'urgent');assert.equal(r.urgent,true);assert.equal(r.score,0);
 assert.match(r.warnings.join(' '),/ALERTA CLÍNICA/);
}
r=pas.calculate({ageYears:'10',redFlags:{unstable:'yes',peritonitis:'unknown'},answers:{}});
assert.equal(r.band,'urgent');assert.equal(r.score,null);assert.ok(r.missing>0);
for(const age of ['0','1','3.99']){
 r=pas.calculate(input([],{ageYears:age}));assert.equal(r.ok,true);assert.equal(r.band,'outOfScope');assert.equal(r.score,0);
 assert.match(r.warnings.join(' '),/Menores de 4 años/);
}
r=pas.calculate(input([],{ageYears:''}));assert.equal(r.band,'pending');
r=pas.calculate(input([],{ageYears:'18'}));assert.equal(r.band,'outOfScope');
r=pas.calculate(input([],{ageYears:'16'}));assert.equal(r.band,'low');
assert.match(r.warnings.join(' '),/4–15/);
r=pas.calculate(input([],{temperatureC:'38',answers:{...allNo,fever:'no'}}));
assert.equal(r.score,0);
r=pas.calculate(input([],{temperatureC:'38.1',answers:{...allNo,fever:'unknown'}}));
assert.equal(r.score,1);
r=pas.calculate(input([],{wbcK:'10',ancK:'7.5'}));assert.equal(r.score,0);
r=pas.calculate(input([],{wbcK:'10.01',ancK:'7.51'}));assert.equal(r.score,2);
r=pas.calculate(input([],{wbcK:'12',ancK:'',neutrophilPercent:'75'}));
assert.equal(r.ok,true);assert.equal(r.ancDerived,true);assert.equal(r.ancK,9);assert.equal(r.score,2);
for(const [changes,code] of [
 [{wbcK:'12',ancK:'9',neutrophilPercent:'20'},'labConflict'],
 [{wbcK:'7',ancK:'9'},'labConflict'],
 [{wbcK:'',ancK:'',neutrophilPercent:'82'},'wbcRequired'],
 [{wbcK:'-1'},'wbc'],[{ancK:'NaN'},'anc'],[{neutrophilPercent:'101'},'neutrophils'],
 [{temperatureC:'45'},'temperature'],[{ageYears:'19'},'age'],
 [{temperatureC:'38.5',answers:{...allNo,fever:'no'}},'feverConflict'],
 [{answers:{...allNo,migration:'maybe'}},'answer'],
 [{redFlags:{unstable:'maybe',peritonitis:'no'}},'redFlags']
]){
 const x=pas.calculate(input([],changes));
 assert.equal(x.ok,false,JSON.stringify(changes));assert.equal(x.code,code);
 assert.equal(x.score,undefined,'Invalid input must never display a numerical PAS');
}
assert.ok(page.includes('aria-live="polite"'));
assert.ok(page.includes('id="pas-outcome"'));
assert.ok(page.includes('data-band="pending"'));
assert.ok(page.includes('id="pas-anc-preview"'));
assert.ok(page.includes('data-flag="unstable"'));
assert.ok(page.includes('data-flag="peritonitis"'));
assert.equal((page.match(/data-criterion="/g)||[]).length,6,'Six clinical selections, two objective lab fields');
assert.equal((page.match(/data-flag="/g)||[]).length,2);
assert.match(page,/ANC.*7500/);
assert.match(page,/0–3/);assert.match(page,/4–6/);assert.match(page,/7–10/);
assert.match(page,/pediatric-appendicitis-risk-calculator-parc/);
assert.match(page,/2026/);
assert.ok(home.includes("{id:'pas',title:'PAS · Apendicitis pediátrica'"));
assert.ok(home.includes("c.dataset.pedRapid==='pas'?'./pediatria-pas.html'"));
assert.match(home,/content="0\.10\.46"/);
assert.match(page,/content="0\.10\.46"/);
for(const path of ['pediatria-pas.html','assets/pediatric-pas-core-v01045.js','assets/pediatric-pas-ui-v01045.js','assets/pediatric-pas-v01045.css'])
 assert.ok(sw.includes("'./"+path+"'"),'Offline precache missing '+path);
assert.match(sw,/pediatric-pas-v01045/);
assert.match(css,/@media\(max-width:660px\)/);
assert.match(css,/@media\(max-width:370px\)/);
assert.match(css,/html\.dark/);
assert.match(css,/\[aria-pressed="true"\]/);
assert.doesNotMatch(core,/fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon/);
assert.doesNotMatch(ui,/fetch\s*\(|XMLHttpRequest|sendBeacon|api\.openai\.com/);
assert.ok(!page.includes('<input id="patient-name"'));
console.log('PAS clinical QA PASS: 8 criteria, 10 total, 0/3/4/6/7/10 risk bands, fail-closed missing inputs, strict ANC/WBC/temp thresholds, danger overrides, age guard, PWA and accessible UI.');
