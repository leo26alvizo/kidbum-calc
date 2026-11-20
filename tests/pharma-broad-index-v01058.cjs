'use strict';
/* 0.10.58: terminological expansion MUST NOT create implicit clinical approvals. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const root={};root.window=root;root.globalThis=root;
for(const path of [
 'assets/pharma-pro-expansion.js',
 'assets/pharma-pro-guides-plus.js',
 'assets/pharma-pro-expansion-index-v01043.js',
 'assets/pharma-broad-index-v01058.js',
 'assets/pharma-pro-core.js',
 'assets/pharma-drug-diagnoses-v01050.js'
])vm.runInNewContext(read(path),root,{filename:path,timeout:5000});
const lib=root.KidBumPharmaCore,broad=root.KidBumPharmaBroadIndex,dx=root.KidBumPharmaDiagnosisCatalog;
assert.equal(broad.version,'0.10.58');
assert.equal(broad.count,923,'Deduplicated additions must remain stable');
assert.equal(lib.records.length,1566,'Exactly 643 existing + 923 added searchable entries');
assert.equal(new Set(lib.records.map(x=>x.id)).size,1566,'No colliding medicine IDs');
assert.equal(new Set(lib.records.map(x=>x.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())).size,1566,'No duplicate medicine names');
assert.equal(Object.keys(broad.groups).length,29,'All 29 proposed clinical indexing areas preserved');
assert.equal(broad.newIds.length,923);
for(const id of broad.newIds){
 const d=lib.byId[id];
 assert.ok(d&&d.id===id,'Expanded catalog entry not registered: '+id);
 assert.deepEqual(Array.from(d.populations),['No verificada'],'Population must not imply adult or pediatric authorization: '+id);
 assert.equal(d.indexPendingSafety,true,'Unknown risk status must be visible: '+id);
 assert.equal(d.evidence,null,'New entries must not gain unreviewed monographs: '+id);
 assert.equal(d.highRisk,false,'The ISMP high-risk flag is UNCHECKED, not independently asserted: '+id);
 assert.match(d.use,/NO prueba indicación/);
 assert.match(d.checks,/SIN COTEJO/);
 assert.match(d.reviewStatus,/monografía y dosis pendientes/);
}
assert.ok(lib.search('CEFIDEROCOL').some(d=>d.id==='kb58-cefiderocol'),'Search for newly added antiinfective');
assert.ok(lib.search('mosunetuzumab').some(d=>d.id==='kb58-mosunetuzumab'),'Search for advanced oncology agent');
assert.ok(lib.search('Idursulfasa').some(d=>d.id==='kb58-idursulfasa'),'Search for rare disease enzyme');
assert.ok(!lib.search('no-existe-un-drug').length);
assert.equal(dx.coverage.total,1566);
assert.equal(dx.coverage.mapped,643,'Existing diagnosis associations must be preserved WITHOUT fabricating new ones');
assert.equal(dx.coverage.missing,923,'New items stay explicitly unmapped until independent editorial verification');
for(const id of broad.newIds)assert.equal(dx.related(id).length,0,'No fabricated clinical use for '+id);
const namesBox={window:{}};
vm.runInNewContext(read('assets/clinical-drug-names-v01057.js'),namesBox,{timeout:5000});
const names=namesBox.window.KidBumDrugSearchNames;
assert.equal(names.length,1566,'Home-screen search must include exactly every drug ID');
assert.equal(new Set(names.map(x=>x[0])).size,1566);
assert.ok(names.every(([id,name])=>lib.byId[id]?.name===name),'Home deep links must refer to actual Pharma Pro records');
const sw=read('sw.js'),html=read('pharma-pro.html');
assert.match(sw,/'\.\/assets\/pharma-broad-index-v01058\.js'/,'New index is precached for airplane mode');
assert.match(sw,/kidbum-calc-v01060-safe-update/,'Current cache revision prevents mixed pharmacy versions');
assert.ok(html.indexOf('src="./assets/pharma-broad-index-v01058.js"')>html.indexOf('src="./assets/pharma-pro-expansion-index-v01043.js"'));
assert.ok(html.indexOf('src="./assets/pharma-broad-index-v01058.js"')<html.indexOf('src="./assets/pharma-pro-core.js"'));
assert.doesNotMatch(html,/Los 643 medicamentos están asociados/,'Do not claim every expanded entry has clinical linkage');
assert.match(html,/no reciben diagnósticos atribuidos automáticamente/);
assert.match(read('assets/pharma-pro-reconciliation-v01042.js'),/ficha índice sin verificación de riesgos/);
console.log('PASS v0.10.58: 923 new entries, 1,566 unique names and live links, 29 specialty groups, new populations unverified, diagnosis coverage transparently partial, zero auto-doses, offline cache and privacy.');
