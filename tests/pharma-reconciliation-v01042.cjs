'use strict';
/* Pharma Pro 3.0 phase-one / 0.10.42: no-inference safety audit, source provenance and offline guarantees. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};
const paths=['assets/pharma-pro-expansion.js','assets/pharma-pro-core.js',
 'assets/pharma-pro-monographs.js','assets/pharma-pro-source-audit.js',
 'assets/pharma-pro-high-alert.js','assets/pharma-pro-reconciliation-v01042.js'];
for(const path of paths){
 const source=fs.readFileSync(path,'utf8');new vm.Script(source,{filename:path});
 vm.runInNewContext(source,ctx,{filename:path,timeout:4000});
}
const r=ctx.window.KidBumPharmaReconciliation,lib=ctx.window.KidBumPharmaCore,mono=ctx.window.KidBumPharmaMonographs;
assert.ok(r&&lib&&mono);
assert.equal(lib.records.length,227);
assert.equal(r.coverage().total,227);
assert.equal(r.coverage().partial,9);
assert.equal(r.coverage().other,218);
assert.equal(r.coverage().approved,0);
assert.equal(r.coverage().recheckedNow,3);
assert.equal(r.reviewedAt,'2026-11-04');
const rechecks=r.sourceIntegrity();
assert.equal(rechecks.length,3);
for(const x of rechecks){
 assert.equal(x.valid,true,'verified against selected DailyMed metadata: '+x.id);
 assert.match(x.source,/^https:\/\/dailymed\.nlm\.nih\.gov\/dailymed\/drugInfo\.cfm\?setid=/);
 assert.ok(mono.byId[x.id].cautions.length>=3);
}
assert.deepEqual(Array.from(r.sourceRechecks.map(x=>x.id)),['potasio-iv','heparina','insulina-lispro']);
for(const raw of [null,[],['heparina'],['invalid','heparina'],Array(9).fill('heparina')]){
 const x=r.evaluate(raw);assert.equal(x.status,'blocked');assert.equal(x.safe,false);assert.ok(x.errors.length);
}
let x=r.evaluate(['warfarina','amiodarona']);
assert.equal(x.safe,false);
assert.equal(x.status,'requires-professional-review');
assert.equal(x.reviewedPairs,1);
assert.equal(x.notReviewedPairs,0);
assert.equal(x.pairs.length,1);
assert.ok(x.pairs[0].source.startsWith('https://'));
assert.ok(x.pairs[0].message.includes('INR'));
x=r.evaluate(['warfarina','metronidazol','amiodarona']);
assert.equal(x.reviewedPairs,2);
assert.equal(x.notReviewedPairs,1);
assert.equal(x.pairs.length,2);
x=r.evaluate(['enoxaparina','ketorolaco']);
assert.equal(x.reviewedPairs,1);
assert.match(x.pairs[0].message,/hemorrág/i);
x=r.evaluate(['paracetamol','omeprazol']);
assert.equal(x.reviewedPairs,0);
assert.equal(x.notReviewedPairs,1);
assert.equal(x.status,'requires-professional-review');
assert.equal(x.safe,false);
assert.ok(x.notices.join(' ').includes('NO'));
x=r.evaluate(['heparina','enoxaparina']);
assert.equal(x.classes.length,1);
assert.match(x.classes[0],/anticoagulantes/);
assert.ok(x.highRisk.some(d=>d.id==='heparina'&&d.source.includes('dailymed')));
x=r.evaluate(['insulina-regular','insulina-lispro']);
assert.match(x.classes.join(' '),/insulinas/);
assert.ok(x.highRisk.length>=1);
x=r.evaluate(['heparina','heparina','warfarina']);
assert.equal(x.selectionCount,3);
assert.equal(x.uniqueCount,2);
assert.equal(x.duplicates.length,1);
assert.equal(x.reviewedPairs+x.notReviewedPairs,1,'No false inflated pair count from duplicates');
assert.equal(x.safe,false);
const lasamed=lib.records.find(d=>d.lasaPairs.some(p=>Boolean(lib.byId[p.id])));
assert.ok(lasamed,'Existing LASA reference list present');
const pair=lasamed.lasaPairs.find(p=>lib.byId[p.id]);
x=r.evaluate([lasamed.id,pair.id]);
assert.equal(x.lasa.length,1,'Documented look-alike pair flagged');
assert.equal(x.safe,false);
const src=fs.readFileSync('assets/pharma-pro-reconciliation-v01042.js','utf8');
assert.doesNotMatch(src,/\bfetch\s*\(|\bXMLHttpRequest\b|navigator\.sendBeacon|localStorage|sessionStorage/);
const html=fs.readFileSync('pharma-pro.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
assert.match(html,/id="pharma-reconciliation"/);
assert.match(html,/id="pharma-recon-rows"/);
assert.match(html,/id="pharma-recon-result"/);
assert.match(html,/id="pharma-recon-source-results"/);
assert.match(html,/id="pharma-recon-form"/);
assert.match(html,/assets\/pharma-pro-reconciliation-v01042\.js/);
assert.match(html,/assets\/pharma-pro-reconciliation-ui-v01042\.js/);
assert.match(html,/assets\/pharma-pro-reconciliation-v01042\.css/);
for(const x of ['assets/pharma-pro-reconciliation-v01042.js','assets/pharma-pro-reconciliation-ui-v01042.js','assets/pharma-pro-reconciliation-v01042.css'])
 assert.ok(sw.includes("'./"+x+"'"),x+' missing PWA precache');
new vm.Script(fs.readFileSync('assets/pharma-pro-reconciliation-ui-v01042.js','utf8'));
assert.match(fs.readFileSync('assets/pharma-pro-reconciliation-v01042.css','utf8'),/@media\(max-width:740px\)/);
console.log('Pharma reconciliation PASS: 227 indexed, 9 partial label comparisons, 3 official labels rechecked, 0 clinical approvals, LASA/high-risk/duplicates documented, unknown interactions never cleared, UI/PWA assets and privacy.');
