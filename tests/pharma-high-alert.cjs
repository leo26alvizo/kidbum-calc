'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const files=['assets/pharma-pro-monographs.js','assets/pharma-pro-source-audit.js','assets/pharma-pro-high-alert.js'];
const ctx={window:{}};for(const path of files){const s=fs.readFileSync(path,'utf8');new vm.Script(s,{filename:path});vm.runInNewContext(s,ctx,{timeout:3500});}
const m=ctx.window.KidBumPharmaMonographs;
assert.ok(m);
assert.equal(m.records.length,9);
assert.equal(m.coverage.totalIndexed,227);
assert.equal(m.coverage.labelChecked,9);
assert.equal(m.coverage.notLabelChecked,218);
assert.equal(m.coverage.clinicallyApproved,0);
const expected={
 'potasio-iv':['559a0a8c-a8fe-40a5-b196-21f9308780ab',23,'2026-07-01'],
 heparina:['7014808d-cec9-4b2c-8eb5-940493e356ab',18,'2026-10-23'],
 'insulina-lispro':['c8ecbd7a-0e22-4fc7-a503-faa58c1b6f3f',87,'2026-06-16']
};
for(const [id,[setid,version,date]] of Object.entries(expected)){
 const d=m.byId[id];assert.ok(d);
 assert.equal(d.source.setid,setid);assert.equal(d.source.version,version);assert.equal(d.source.effective,date);
 assert.equal(d.source.url,'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid='+setid);
 assert.match(d.jurisdiction,/México/);
 assert.match(d.status,/parcial/i);
 assert.ok(d.cautions.length>=3);
 assert.ok(d.monitoring.length>=2);
 assert.ok(m.preparations[id].method&&m.preparations[id].restrictions&&m.preparations[id].finalValidation);
 assert.ok(m.preparations[id].sourceSection);
 assert.equal(m.indications(id,'neonate').length,0);
 assert.equal(m.indications(id,'pediatric').length,0);
 assert.equal(m.check(id,{}).status,'blocked');
 assert.equal(m.check(id,{population:'neonate',allergy:'no'}).status,'blocked');
}
const base={population:'adult',allergy:'no',pregnancy:'no',productConfirmed:'yes',hospitalProtocol:'yes'};
const kcl={...base,indication:'adult-kcl-noncritical',route:'iv',kRange:'noncritical',renalStable:'yes',monitoring:'yes',dilutionValidated:'yes',urgentSymptoms:'no'};
const hep={...base,indication:'adult-heparin-full-iv',route:'iv',bleeding:'no',hit:'no',labMonitoring:'yes',neuroaxial:'no',vialStrength:'yes'};
const lis={...base,indication:'adult-lispro-mealtime-sc',route:'sc',formulation:'u100',hypoglycemia:'no',meal:'yes',glucose:'yes',insulinPlan:'yes'};
for(const [id,v] of [['potasio-iv',kcl],['heparina',hep],['insulina-lispro',lis]]){
 const r=m.check(id,v);
 assert.equal(r.status,'reference',id+' label scope');
 assert.ok(r.warnings.some(w=>/NO implica dosis individual/.test(w)));
 assert.ok(r.warnings.some(w=>/Alto riesgo/.test(w)));
 assert.ok(r.regimen.reference&&r.regimen.constraints.length>=2);
 for(const key of Object.keys(v)){
  const removed={...v};delete removed[key];
  assert.equal(m.check(id,removed).status,'blocked',id+' required '+key);
 }
 assert.equal(m.check(id,{...v,allergy:'unknown'}).status,'blocked');
 assert.equal(m.check(id,{...v,pregnancy:'yes'}).status,'blocked');
 assert.equal(m.check(id,{...v,hospitalProtocol:'no'}).status,'blocked');
 assert.equal(m.check(id,{...v,route:'im'}).status,'blocked');
 assert.equal(m.check(id,{...v,indication:'unreviewed'}).status,'blocked');
}
assert.match(m.check('potasio-iv',kcl).regimen.reference,/10 mEq\/h/);
assert.match(m.check('potasio-iv',kcl).regimen.reference,/40 mEq\/L/);
assert.match(m.preparations['potasio-iv'].restrictions,/NUNCA IV directo\/bolo/);
assert.equal(m.check('potasio-iv',{...kcl,kRange:'critical'}).status,'blocked');
assert.equal(m.check('potasio-iv',{...kcl,kRange:'normal'}).status,'blocked');
assert.equal(m.check('potasio-iv',{...kcl,renalStable:'no'}).status,'blocked');
assert.equal(m.check('potasio-iv',{...kcl,dilutionValidated:'no'}).status,'blocked');
assert.equal(m.check('potasio-iv',{...kcl,monitoring:'no'}).status,'blocked');
assert.equal(m.check('potasio-iv',{...kcl,urgentSymptoms:'yes'}).status,'blocked');
assert.equal(m.check('heparina',{...hep,hit:'yes'}).status,'blocked');
assert.equal(m.check('heparina',{...hep,bleeding:'yes'}).status,'blocked');
assert.equal(m.check('heparina',{...hep,labMonitoring:'no'}).status,'blocked');
assert.equal(m.check('heparina',{...hep,vialStrength:'no'}).status,'blocked');
assert.equal(m.check('heparina',{...hep,neuroaxial:'yes'}).status,'blocked');
assert.match(m.check('heparina',hep).regimen.context,/NO un nomograma actual/);
assert.equal(m.check('insulina-lispro',{...lis,formulation:'u200'}).status,'blocked');
assert.equal(m.check('insulina-lispro',{...lis,formulation:'mix'}).status,'blocked');
assert.equal(m.check('insulina-lispro',{...lis,hypoglycemia:'yes'}).status,'blocked');
assert.equal(m.check('insulina-lispro',{...lis,meal:'no'}).status,'blocked');
assert.equal(m.check('insulina-lispro',{...lis,glucose:'unknown'}).status,'blocked');
assert.equal(m.check('insulina-lispro',{...lis,insulinPlan:'no'}).status,'blocked');
assert.match(m.check('insulina-lispro',lis).regimen.reference,/NO establece una dosis fija/);
assert.match(m.preparations['insulina-lispro'].restrictions,/U-200/);
assert.match(m.preparations['insulina-lispro'].method,/15 minutos/);
const regression=m.check('metformina',{population:'adult',indication:'adult-t2-metformin-ir-start',route:'po',allergy:'no',productConfirmed:'yes',pregnancy:'no',renal:'ge45',metabolicAcidosis:'no',acuteIllness:'no',iodinatedContrast:'no'});
assert.equal(regression.status,'reference','prior six monographs remain callable');
const ui=fs.readFileSync('assets/pharma-pro-monographs-ui.js','utf8');
for(const key of ['kRange','renalStable','dilutionValidated','labMonitoring','hit','vialStrength','hypoglycemia','insulinPlan','formulation'])assert.ok(ui.includes(key),'Required UI field '+key);
const page=fs.readFileSync('pharma-pro.html','utf8'),sw=fs.readFileSync('sw.js','utf8'),home=fs.readFileSync('index.html','utf8');
assert.match(page,/9\/227/);
assert.match(page,/218\/227/);
assert.match(page,/0 fichas con validación clínica/);
assert.match(page,/assets\/pharma-pro-high-alert\.js/);
assert.match(sw,/pharma-high-alert-v01034/);
assert.ok(sw.includes("'./assets/pharma-pro-high-alert.js'"));
assert.match(home,/<meta name="kidbum-app-version" content="0\.10\.34"/);
assert.doesNotMatch(fs.readFileSync('assets/pharma-pro-high-alert.js','utf8'),/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);
console.log('PASS · 227 catalog entries, 9 label-cotejado partial profiles, 218 non-verified, 0 clinical approval; KCl IV / heparin / lispro U100 all fail closed; prior monographs preserved.');
