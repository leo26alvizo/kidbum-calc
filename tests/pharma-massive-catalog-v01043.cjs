'use strict';
/* KidBum Pharma Pro 0.10.43: search-directory expansion, explicitly NON-PRESCRIPTIVE.
 * Protect historic guideline count and patient safety while growing discovery.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}},files=[
 'assets/pharma-pro-expansion.js',
 'assets/pharma-pro-guides-plus.js',
 'assets/pharma-pro-expansion-index-v01043.js',
 'assets/pharma-pro-core.js',
 'assets/pharma-pro-monographs.js',
 'assets/pharma-pro-source-audit.js',
 'assets/pharma-pro-high-alert.js',
 'assets/pharma-pro-reconciliation-v01042.js'
];
for(const file of files){
 const source=fs.readFileSync(file,'utf8');
 new vm.Script(source,{filename:file});
 vm.runInNewContext(source,context,{timeout:6000,filename:file});
}
const lib=context.window.KidBumPharmaCore,idx=context.window.KidBumPharmaExpansionIndex;
const mono=context.window.KidBumPharmaMonographs,rec=context.window.KidBumPharmaReconciliation;
assert.ok(lib&&idx&&mono&&rec);
assert.equal(idx.medicationRows.length,416,'Exactly 416 new search entries');
assert.equal(idx.newDrugIds.length,416);
assert.equal(idx.diseases.length,205,'Exactly 205 medical conditions/syndrome topics');
assert.equal(lib.records.length,643,'227 legacy + 416 index names');
assert.equal(new Set(lib.records.map(x=>x.id)).size,643,'No medication identifier collisions');
assert.equal(new Set(idx.diseases.map(x=>x.id)).size,205,'No diagnostic identifier collisions');
assert.equal(lib.conditions.length,15,'Keep the original guideline-scoped adult routes only');
assert.ok(lib.conditions.every(x=>x.options?.length>=1),'Preserve verified pathway content');
assert.equal(mono.records.length,9,'New medications do NOT gain dose monographs');
assert.equal(mono.coverage.totalIndexed,643);
assert.equal(mono.coverage.labelChecked,9);
assert.equal(mono.coverage.notLabelChecked,634);
assert.equal(mono.coverage.clinicallyApproved,0);
assert.equal(rec.coverage().total,643);
assert.equal(rec.coverage().other,634);
assert.equal(rec.coverage().approved,0);
assert.equal(rec.coverage().recheckedNow,3,'Prior verified-label metadata unchanged');
const newSet=new Set(idx.newDrugIds);
for(const d of lib.records.filter(x=>newSet.has(x.id))){
 assert.equal(d.indexPendingSafety,true,'Each new entry declares unknown safety classification');
 assert.equal(d.highRisk,false,'Do not invent ISMP membership from group name');
 assert.equal(d.populations.join(','),'Adultos','New names are adult-only search scope, NOT approved pediatric use');
 assert.match(d.checks,/no se han cotejado dosis/i);
 assert.equal(d.evidence,null,'No fabricated individual source');
 assert.equal('dose' in d,false,'No individualized dose');
 assert.equal('dilution' in d,false,'No invented mixing instructions');
 assert.equal(mono.byId[d.id],undefined,'No new regimen enabled');
}
for(const d of lib.records.filter(x=>!newSet.has(x.id)))assert.equal(d.indexPendingSafety,false);
assert.equal(idx.searchDiseases('ictus').some(x=>x.id==='ictus-isquemico'),true);
assert.equal(idx.searchDiseases('hiperpotasemia').length,1);
assert.equal(idx.searchDiseases('pielonefritis').some(x=>x.id==='pielonefritis'),true);
assert.ok(idx.searchDiseases('').length===205);
assert.equal(idx.searchDiseases('xyzxyztopic').length,0);
assert.ok(idx.searchDiseases('','Pediatría').length>=10);
assert.ok(idx.searchDiseases('','Cardiología y vascular').length>=18);
assert.equal(lib.searchConditions('sepsis').length,0,'Unreviewed topics are NOT treatment routes');
assert.equal(lib.searchConditions('gota').length,2,'Existing 15 guide pathways retained');
assert.equal(lib.search('ceftarolina').length,1);
assert.ok(lib.search('atorvastatina')[0]?.indexPendingSafety);
assert.ok(lib.search('bimatoprost')[0]?.indexPendingSafety);
assert.ok(lib.search('escabiosis').length===0,'Illnesses are not automatically medication names');
const pair=rec.evaluate(['heparina','atorvastatina']);
assert.equal(pair.status,'requires-professional-review');
assert.equal(pair.safe,false);
assert.equal(pair.notReviewedPairs,1,'New medicines must not be cleared by absence of alert');
assert.ok(pair.notices.join(' ').includes('NO'));
for(const x of Object.values(idx.sourceReferences))assert.match(x,/^https:\/\//);
const indexSrc=fs.readFileSync('assets/pharma-pro-expansion-index-v01043.js','utf8');
const indexUI=fs.readFileSync('assets/pharma-disease-index-ui-v01043.js','utf8');
const css=fs.readFileSync('assets/pharma-disease-index-v01043.css','utf8');
for(const s of [indexSrc,indexUI])assert.doesNotMatch(s,/\bfetch\s*\(|\bXMLHttpRequest\b|sendBeacon|localStorage|sessionStorage|api\.openai\.com/);
new vm.Script(indexUI);
const html=fs.readFileSync('pharma-pro.html','utf8');
assert.match(html,/id="pharma-disease-index"/);
assert.match(html,/id="pharma-index-results"/);
assert.match(html,/id="pharma-index-category"/);
assert.match(html,/643 entradas farmacológicas y 205 temas diagnósticos/);
assert.match(html,/9\/643/);
assert.match(html,/634\/643/);
assert.match(css,/@media\(max-width:590px\)/);
const js=[...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
assert.equal(js.length,14);
assert.ok(js.indexOf('assets/pharma-pro-expansion-index-v01043.js')>js.indexOf('assets/pharma-pro-guides-plus.js'));
assert.ok(js.indexOf('assets/pharma-pro-expansion-index-v01043.js')<js.indexOf('assets/pharma-pro-core.js'));
assert.ok(js.indexOf('assets/pharma-disease-index-ui-v01043.js')<js.indexOf('assets/pharma-pro-quick-ui.js'));
const sw=fs.readFileSync('sw.js','utf8');
for(const f of ['assets/pharma-pro-expansion-index-v01043.js','assets/pharma-disease-index-ui-v01043.js','assets/pharma-disease-index-v01043.css']){
 assert.ok(sw.includes("'./"+f+"'"),'Missing PWA precache '+f);
}
const quick=fs.readFileSync('assets/pharma-pro-quick-ui.js','utf8');
assert.match(quick,/kind:'topic'/);
assert.match(quick,/KidBumPharmaIndexUI\?\.openDisease/);
const main=fs.readFileSync('index.html','utf8');
assert.match(main,/<meta name="kidbum-app-version" content="0\.10\.47"/);
assert.match(html,/<meta name="kidbum-app-version" content="0\.10\.43"/);
console.log('PASS · 643 unique drug catalog entries (416 new; ALL non-prescriptive), 205 indexed illnesses/syndromes, 15 pre-existing adult guideline routes unchanged, 9/643 partial US label checks, 0 independent clinical approvals, no false safety clearance, offline assets.');
