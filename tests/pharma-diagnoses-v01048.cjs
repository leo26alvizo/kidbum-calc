'use strict';
/* Pharma Pro 0.10.48: tests source-specific medication → diagnosis crosswalk,
   nine PRONAM 2026 hypertension reference intervals and safe pending states.
   Never assumes all 643 products have validated indications or doses. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const fakeDocument={
 getElementById(id){return id==='disease-results'?{}:null;},
 createElement(tag){
  return {tag,children:[],textContent:'',className:'',attributes:{},
   setAttribute(k,v){this.attributes[k]=v;},
   append(...nodes){this.children.push(...nodes);},
   replaceChildren(...nodes){this.children=nodes;},
   get href(){return this._href;},set href(s){this._href=s;}
  };
 }
};
const ctx={window:{},document:fakeDocument};
for(const p of ['assets/pharma-pro-expansion.js','assets/pharma-pro-guides-plus.js',
  'assets/pharma-pro-expansion-index-v01043.js','assets/pharma-pro-core.js',
  'assets/pharma-pro-monographs.js','assets/pharma-pro-indications-ui.js']){
 const source=read(p);
 new vm.Script(source,{filename:p});
 vm.runInNewContext(source,ctx,{timeout:7000,filename:p});
}
const lib=ctx.window.KidBumPharmaCore,ui=ctx.window.KidBumPharmaIndicationsUI;
assert.equal(lib.records.length,643);
assert.equal(lib.conditions.length,15);
assert.ok(ui?.renderForDrug&&ui?.doseForDrug&&ui?.relatedForDrug);
const doses=lib.records.filter(m=>ui.doseForDrug(m.id));
assert.equal(doses.length,9,'Only nine explicitly transcribed PRONAM HTA reference intervals');
const expected={
 amlodipino:['5–10 mg','cada 24 h'],enalapril:['10–40 mg','cada 24 h'],
 lisinopril:['10–40 mg','cada 24 h'],clortalidona:['12.5–50 mg','cada 24 h'],
 hidroclorotiazida:['12.5–50 mg','cada 24 h'],valsartan:['80–320 mg','cada 24 h'],
 telmisartan:['40–80 mg','cada 24 h'],olmesartan:['10–40 mg','cada 24 h'],
 bisoprolol:['2.5–20 mg','cada 24 h']
};
for(const [id,[dose,frequency]] of Object.entries(expected)){
 const entry=ui.doseForDrug(id);
 assert.equal(entry.dose,dose,id);
 assert.equal(entry.frequency,frequency,id);
 assert.match(entry.scope,/mujeres en edad fértil o embarazadas/i);
 assert.match(entry.scope,/no es pauta de inicio personalizada/i);
 assert.match(entry.source,/pronamsalud\.csg\.gob\.mx\/infografia-hipertension/);
 assert.ok(ui.relatedForDrug(id).some(d=>d.id==='hipertension-arterial'));
}
assert.equal(ui.doseForDrug('metoprolol'),null,'No ambiguous tartrate/succinate schedule');
assert.equal(ui.doseForDrug('ramipril'),null,'Do not publish disputed/max-dose reference without review');
assert.equal(ui.doseForDrug('insulina-regular'),null,'Never extrapolate high-risk regimen');
assert.equal(ui.doseForDrug('ceftriaxona'),null,'US label gating remains only in its monograph');
const hta=lib.conditions.find(c=>c.id==='hipertension-arterial');
assert.match(hta.source,/2026\/CSG\/PRONAM/);
assert.match(hta.year,/2026/);
const associated=lib.records.filter(d=>ui.relatedForDrug(d.id).length);
assert.ok(associated.length>=35&&associated.length<200,'Only source-based, explicit associations; no class-level extrapolation');
const textOf=n=>(typeof n==='string'?n:(n.textContent||'')+(n.children||[]).map(textOf).join(' '));
for(const med of lib.records){
 const node=ui.renderForDrug(med.id);
 assert.ok(node&&node.tag==='section',med.id);
 const output=textOf(node);
 assert.match(output,/¿En qué diagnósticos se utiliza\?/);
 assert.match(output,/Dosis y esquemas por diagnóstico/);
 assert.match(output,/COFEPRIS/);
 assert.match(output,/DailyMed/);
 if(ui.relatedForDrug(med.id).length===0)assert.match(output,/Todavía no hay una relación medicamento–diagnóstico cotejada/);
 if(!ui.doseForDrug(med.id)&&!ctx.window.KidBumPharmaMonographs.byId[med.id])assert.match(output,/Esquema NO cotejado/);
 if(ui.doseForDrug(med.id))assert.match(output,/PRONAM México 2026/);
}
assert.ok(ui.relatedForDrug('amoxicilina').some(d=>d.id==='neumonia-comunidad-baja'));
assert.ok(ui.relatedForDrug('colchicina').some(d=>d.id==='gota-crisis'));
assert.ok(ui.relatedForDrug('omeprazol').some(d=>d.id==='reflujo-gastroesofagico'));
assert.ok(ui.relatedForDrug('levotiroxina').some(d=>d.id==='hipotiroidismo-primario'));
assert.equal(ui.relatedForDrug('bimatoprost').length,0,'No unsupported therapeutic claims');
const src=read('assets/pharma-pro-indications-ui.js'),uiSrc=read('assets/pharma-pro-ui.js');
assert.doesNotMatch(src,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|innerHTML/);
assert.match(uiSrc,/renderForDrug\(med\.id\)/,'Both quick and full detail include indications');
assert.match(read('pharma-pro.html'),/\.pharma-drug-diagnoses/,'Styles loaded into offline page');
assert.match(read('sw.js'),/pharma-indicaciones-pronam26-v01048/,'Offline cache version bumped');
console.log('PASS Pharma 0.10.48: 643 safe drug profiles, source-linked diagnoses, 9 PRONAM 2026 HTA dose bands, no unsupported dose fabrication.');
