'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const c={};c.window=c;c.globalThis=c;
const scripts=['assets/pharma-pro-expansion.js','assets/pharma-pro-guides-plus.js','assets/pharma-pro-expansion-index-v01043.js','assets/pharma-broad-index-v01058.js','assets/clinical-drug-names-v01057.js','assets/pharma-expansion-v01084.js','assets/pharma-pro-core.js','assets/pharma-drug-diagnoses-v01050.js'];
for(const p of scripts)vm.runInNewContext(fs.readFileSync(p,'utf8'),c,{filename:p});
const E=c.KidBumPharmaExpansion84,L=c.KidBumPharmaCore,D=c.KidBumPharmaDiagnosisCatalog,I=c.KidBumPharmaExpansionIndex;
assert.equal(E.additions.length,181);assert.equal(L.records.length,1747);assert.equal(L.conditions.length,31);assert.equal(new Set(L.records.map(x=>x.id)).size,1747);
assert.equal(c.KidBumDrugSearchNames.length,1747);assert.ok(c.KidBumDrugSearchNames.every(([id,name])=>L.byId[id]?.name===name));
for(const x of E.additions){const d=L.byId[x[0]];assert.ok(d&&d.indexPendingSafety);assert.deepEqual(Array.from(d.populations),['No verificada']);assert.equal(d.evidence,null);}
for(const id of Object.keys(E.high)){assert.ok(L.byId[id]?.highRisk,id);assert.ok(L.byId[id].highRiskScope,id);}
for(const p of E.pairs){assert.ok(L.byId[p.ids[0]].lasaPairs.some(x=>x.id===p.ids[1]&&L.lasaSources[x.source]),p.ids.join(' '));assert.ok(L.byId[p.ids[1]].lasaPairs.some(x=>x.id===p.ids[0]));}
for(const r of E.routes){assert.ok(L.conditions.some(x=>x.id===r.id),r.id);assert.equal(r.population,'adult');assert.ok(r.scope&&r.redFlags&&r.factors.length&&r.source.startsWith('https://'));for(const [id] of r.options)assert.ok(L.byId[id]);assert.ok(!('dose' in r));}
assert.equal(D.coverage.verifiedIndependently,0);assert.ok(D.coverage.mapped>643);assert.ok(I.diseases.length>300);assert.equal(new Set(I.diseases.map(x=>x.id)).size,I.diseases.length);assert.ok(I.searchDiseases('conjuntivitis').length>=3);
const page=fs.readFileSync('pharma-pro.html','utf8'),home=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');assert.ok(page.indexOf('assets/pharma-expansion-v01084.js')<page.indexOf('src="./assets/pharma-pro-core.js"'));assert.ok(home.includes('assets/pharma-expansion-v01084.js'));assert.ok(sw.includes('./assets/pharma-expansion-v01084.js'));
console.log('PASS 1747 records, '+I.diseases.length+' topics, 31 scoped pathways, '+Object.keys(E.high).length+' risk classifications, '+E.pairs.length+' LASA pairs, '+D.coverage.mapped+' mapped entries.');
