'use strict';
/* v0.10.50: 643/643 explicit diagnosis/context links; NOT verified prescribing.
   A failure here must block release if any drug loses its mapping. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const sources=[
 'assets/pharma-pro-expansion.js','assets/pharma-pro-guides-plus.js',
 'assets/pharma-pro-expansion-index-v01043.js','assets/pharma-pro-core.js',
 'assets/pharma-drug-diagnoses-v01050.js'
];
const context={window:{}};
for(const p of sources){
 const source=read(p);new vm.Script(source,{filename:p});
 vm.runInNewContext(source,context,{filename:p,timeout:5000});
}
const lib=context.window.KidBumPharmaCore,atlas=context.window.KidBumPharmaDiagnosisCatalog;
assert.ok(lib&&atlas);
assert.equal(lib.records.length,643);
assert.equal(lib.conditions.length,15,'Keep only existing 15 verified guideline pathways');
assert.equal(atlas.coverage.total,643);
assert.equal(atlas.coverage.mapped,643);
assert.equal(atlas.coverage.missing,0);
assert.equal(atlas.coverage.verifiedIndependently,0,'Editorial map must not imply independent clinical approval');
assert.equal(atlas.missingIds.length,0);
assert.equal(atlas.diagnoses.length,250,'Explicit diagnosis or context categories');
const allIds=new Set(lib.records.map(m=>m.id));
const covered=new Set();
for(const medicine of lib.records){
 const mapped=atlas.related(medicine.id);
 assert.ok(mapped.length>=1,medicine.id+' has no indication');
 for(const item of mapped){
  assert.equal(item.status,'orientative');
  assert.equal(item.reviewed,false,'No implicit approval '+medicine.id);
  assert.equal(item.source,null,'No invented individually checked clinical citation '+medicine.id);
  assert.ok(item.name.length>=8,'Diagnostic label too generic: '+medicine.id);
  assert.equal('dose' in item,false,'Clinical dose must never be inferred from indication '+medicine.id);
  assert.equal('regimen' in item,false,'No dosing from editorial mapping '+medicine.id);
 }
 covered.add(medicine.id);
}
assert.equal(covered.size,643);
assert.equal(atlas.related('not-a-medicine').length,0);
for(const dx of atlas.diagnoses){
 assert.ok(dx.name.length>=8);
 assert.ok(dx.medicineIds.length>=1);
 assert.equal(new Set(dx.medicineIds).size,dx.medicineIds.length,'No duplicate medicine in diagnosis '+dx.name);
 for(const id of dx.medicineIds){
  assert.ok(allIds.has(id),'No noncatalog medicine: '+id);
  assert.ok(atlas.related(id).some(o=>o.name===dx.name),'Bidirectional association mismatch for '+id);
 }
}
assert.ok(atlas.related('metotrexato').some(x=>/Artritis reumatoide/.test(x.name)));
assert.ok(atlas.related('vincristina').some(x=>/Neoplasia hematológica/.test(x.name)));
assert.ok(atlas.related('insulina-regular').some(x=>/Diabetes mellitus/.test(x.name)));
assert.ok(atlas.related('bimatoprost').some(x=>/Glaucoma/.test(x.name)));
assert.ok(atlas.related('fentanilo').some(x=>/anestesia/i.test(x.name)));
assert.ok(atlas.related('mifepristona').some(x=>/Interrupción farmacológica/.test(x.name)));
assert.ok(atlas.related('acetilcisteina-otica').some(x=>/por producto a verificar/.test(x.name)));
assert.ok(atlas.related('obeticholico-acido').some(x=>/situación regulatoria vigente/.test(x.name)));
assert.ok(atlas.search('migraña').some(x=>x.id==='sumatriptan'));
assert.ok(atlas.search('glaucoma').some(x=>x.id==='bimatoprost'));
assert.ok(atlas.search('tuberculosis').some(x=>x.id==='bedaquilina'));
assert.ok(atlas.searchDiagnoses('Diabetes mellitus').some(x=>x.medicineIds.includes('metformina')));
assert.ok(atlas.searchDiagnoses('intoxicación').length>=2);
assert.equal(atlas.searchDiagnoses('no-match-xyzzx').length,0);
const idx=read('assets/pharma-disease-index-ui-v01043.js');
const lookup=read('assets/pharma-pro-indications-ui.js');
const drugs=read('assets/pharma-pro-ui.js');
const quick=read('assets/pharma-pro-quick-ui.js');
const page=read('pharma-pro.html');
const sw=read('sw.js');
for(const code of [idx,lookup,drugs,quick])new vm.Script(code);
for(const source of [read('assets/pharma-drug-diagnoses-v01050.js'),idx,lookup]){
 assert.doesNotMatch(source,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|innerHTML/,'Clinical association sources remain static and local');
}
assert.match(lookup,/Diagnósticos o motivos de uso asociados/);
assert.match(lookup,/NO son indicaciones aprobadas/);
assert.match(lookup,/root\.KidBumPharmaDiagnosisCatalog\?\.related\(id\)/);
assert.match(lookup,/Esquema NO cotejado/,'Do not misrepresent dosing for 631 drugs');
assert.match(drugs,/pharmaSummary/);
assert.match(drugs,/KidBumPharmaDiagnosisCatalog\?\.related\(m\.id\)/);
assert.match(drugs,/Uso clínico orientativo \(sin cotejo\)/);
assert.match(quick,/KidBumPharmaDiagnosisCatalog\?\.search\(q\)/);
assert.match(quick,/kind:'editorial'/);
assert.match(idx,/root\.KidBumPharmaDiagnosisCatalog/);
assert.match(idx,/medicamentos vinculados · uso orientativo sin cotejo/);
assert.match(page,/id="pharma-dx-catalog"/);
assert.match(page,/id="pharma-dx-results"/);
assert.match(page,/v0\.10\.61 · Pharma Pro 2\.0/);
const scripts=[...page.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(x=>x[1]);
assert.equal(scripts.length,21,'New product-safety evidence modules are additive; pediatric reference scripts remain present');
assert.ok(scripts.indexOf('assets/pharma-pro-core.js')<scripts.indexOf('assets/pediatric-drug-references-v01055.js'));
assert.ok(scripts.indexOf('assets/pediatric-drug-references-v01055.js')<scripts.indexOf('assets/pediatric-drug-references-ui-v01055.js'));

assert.ok(scripts.includes('assets/pharma-drug-diagnoses-v01050.js'));
assert.ok(scripts.indexOf('assets/pharma-pro-core.js')<scripts.indexOf('assets/pharma-drug-diagnoses-v01050.js'));
assert.ok(scripts.indexOf('assets/pharma-drug-diagnoses-v01050.js')<scripts.indexOf('assets/pharma-pro-indications-ui.js'));
for(const p of scripts)assert.ok(sw.includes("'./"+p+"'"),'PWA module missing '+p);
assert.match(sw,/pharma-drug-diagnosis-coverage-v01050/);
console.log('PASS Pharma v0.10.50: all 643 medicines explicitly linked to 250 diagnostic/use-context entries, 0 unmatched, bidirectional navigation, no fabricated doses or clinical approval.');
