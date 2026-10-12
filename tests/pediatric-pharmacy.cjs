'use strict';
// Integrated Pediatrics pharmacy placement and safety checks.
// Run from repo root: node tests/pediatric-pharmacy.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('const dateInput=');
const end=html.indexOf('const categories=',start);
assert.ok(start>0&&end>start,'Clinical definitions must exist');
const data=vm.runInNewContext(html.slice(start,end)+'\n({defs,pediatricPharma});',{}, {timeout:5000});
const defs=data.defs,catalog=data.pediatricPharma;
assert.equal(defs.length,68,'Pharmacy is not a 69th calculator');
assert.equal(defs.filter(d=>d.category==='Pediatría').length,22,'All pediatric calculators preserved');
assert.equal(catalog.length,3,'First review cohort remains small');
assert.deepEqual(Array.from(catalog,x=>x.name),['Paracetamol','Ibuprofeno','Amoxicilina']);
for(const item of catalog){
 assert.ok(item.type&&item.forms&&Array.isArray(item.checks)&&item.checks.length>=3);
 for(const banned of ['dose','dosage','mgPerKg','milliliters','result','volume']){
  assert.ok(!(banned in item),'No unverified dose fields: '+item.name);
 }
}
assert.ok(html.includes('function renderPharma(){'));
assert.ok(html.includes('data-pharma-open'));
assert.ok(html.includes('category===\x27Pediatría\x27'),'Pharmacy card belongs inside Pediatrics');
assert.ok(html.includes("screen==='pharma'"),'Pharmacy has a dedicated view');
assert.ok(html.includes("if(screen==='pharma'){renderPharma();return;}"),'Pharmacy route must resolve');
assert.ok(html.includes("go('pharma')"),'Pharmacy card opens its own view');
assert.ok(html.includes("id=\"pharma-back\""),'Pharmacy has a back control');
assert.ok(!defs.some(x=>x.title==='Farmacología pediátrica'),'Pharmacy is not counted as a clinical calculator');

const homeBegin=html.indexOf('function renderHome(full){');
const homeEnd=html.indexOf('function renderPharma(){',homeBegin);
assert.ok(homeBegin>0&&homeEnd>homeBegin);
const homepageSource=html.slice(homeBegin,homeEnd);
const pharmaBegin=homeEnd;
const pharmaEnd=html.indexOf('function syncGcsOptions(){',pharmaBegin);
assert.ok(pharmaEnd>pharmaBegin);
const pharmaSource=html.slice(pharmaBegin,pharmaEnd);
const elements={};
const cardButton={dataset:{},onclick:null,onkeydown:null};
const main={innerHTML:''};
const context={
 defs,pediatricPharma:catalog,main,screen:'home',category:'Pediatría',search:'',faves:[],
 atlas:{img:()=>'<img alt="">',anatomy:{},categoryMap:{}},
 categories:['Todas','Pediatría'],
 enc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 el(selector){return elements[selector]||(elements[selector]={innerHTML:'',hidden:false,onclick:null,oninput:null,querySelectorAll:()=>[]});},
 document:{querySelectorAll:(selector)=>selector==='[data-pharma-open]'?[cardButton]:[]},
 go(page){context.route=page;}
};
vm.runInNewContext(homepageSource+pharmaSource+'\nrenderHome(true);',context,{timeout:5000});
assert.ok(elements['#calc-list'].innerHTML.includes('data-pharma-open'),'Pharma card must be in Pediatrics grid');
assert.equal((elements['#calc-list'].innerHTML.match(/data-pharma-open/g)||[]).length,1);
assert.ok(elements['#calc-list'].innerHTML.includes('Farmacología pediátrica'));
assert.equal(typeof cardButton.onclick,'function');
cardButton.onclick();
assert.equal(context.route,'pharma','Click opens the pharmacy module');
vm.runInNewContext('renderPharma();',context,{timeout:5000});
assert.ok(main.innerHTML.includes('Seguridad farmacológica'),'The clinical safety notice is visible');
assert.ok(main.innerHTML.includes('Amoxicilina oral · solo otitis media aguda (OMA)'),
 'Amoxicillin limited to otoscopically confirmed AOM');
assert.ok(main.innerHTML.includes('No emplear para sinusitis, faringitis, neumonía ni otras infecciones.'),
 'No generic antibiotic calculator');
assert.ok(main.innerHTML.includes('id="pfa-result"'),
 'Separate antibiotic result container');
assert.ok(main.innerHTML.includes('80 mg/kg/día')&&main.innerHTML.includes('90 mg/kg/día'),
 'Daily dose must be labeled per day rather than per administration');
assert.ok(main.innerHTML.includes('no calcula')===false,'Obsolete blanket no-calculation warning is not shown');
assert.ok(main.innerHTML.includes('Referencia de dosis oral por peso'),'Two oral analgesics now offer guarded calculation');
assert.ok(main.innerHTML.includes('pfx-med'),'Pharmacy form is present');
for(const d of catalog)assert.ok(main.innerHTML.includes(d.name),'Medication displayed: '+d.name);
assert.equal(typeof elements['#pharma-back'].onclick,'function');
elements['#pharma-back'].onclick();
assert.equal(context.category,'Pediatría','Back returns to Pediatrics, not a new category');
assert.equal(context.route,'home');
context.screen='home';context.category='Todas';context.search='';
vm.runInNewContext('renderHome(false);',context,{timeout:5000});
assert.ok(!elements['#calc-list'].innerHTML.includes('data-pharma-open'),'No separate global catalogue card');
context.category='Todas';context.search='farmacología';
vm.runInNewContext('renderHome(false);',context,{timeout:5000});
assert.ok(elements['#calc-list'].innerHTML.includes('data-pharma-open'),'Pharmacy remains searchable');
context.screen='favorite';context.category='Pediatría';context.search='';
vm.runInNewContext('renderHome(false);',context,{timeout:5000});
assert.ok(!elements['#calc-list'].innerHTML.includes('data-pharma-open'),'Review catalog does not change favorite calculator list');
console.log('Pediatric pharmacy: placement, routing, search, safety and 68-calculator inventory PASSED');
