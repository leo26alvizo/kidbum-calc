'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const ctx={};ctx.window=ctx;
vm.runInNewContext(fs.readFileSync('assets/oftalmologia-algoritmos-core-v01075.js','utf8'),ctx);const e=ctx.KidBumOphthalmologyAlgorithms;assert.equal(e.algorithms.length,16);assert.equal(new Set(e.algorithms.map(a=>a.id)).size,16);
let leaves=0;for(const a of e.algorithms){assert.ok(a.scope&&a.sources.every(s=>s.url.startsWith('https://')&&s.year));assert.equal(e.getStep(a.id).kind,'question');assert.equal(e.transition(a.id,a.start,2),'uncertain');assert.equal(e.transition(a.id,'specific',2),'uncertain');const visited=new Set();function visit(node,path=[]){assert.ok(!path.includes(node));const s=e.getStep(a.id,node);assert.ok(s);if(s.kind==='outcome'){visited.add(node);leaves++;assert.ok(['danger','warning'].includes(s.data.tone));assert.ok(s.data.actions.length>=2);assert.doesNotMatch(s.data.title,/alta autorizada|seguro para alta/i);return;}s.data.choices.forEach((c,i)=>{assert.equal(e.transition(a.id,node,i),c.next);visit(c.next,[...path,node])});assert.equal(e.transition(a.id,node,-1),null);assert.equal(e.transition(a.id,node,1.5),null);}visit(a.start);assert.equal(visited.size,4);}
assert.ok(e.search('QUERATITIS').some(x=>x.id==='queratitis'));assert.ok(e.search('retina','Retina y neurooftalmología').length);assert.equal(e.getStep('fake'),null);assert.equal(e.getStep('__proto__'),null);
assert.match(e.byId['quemadura-quimica'].initial,/irrigación copiosa inmediata/);assert.match(e.byId['globo-abierto'].outcomes.critical.actions.join(' '),/sin presión/);assert.match(e.byId['occlusion-arterial'].outcomes.critical.title,/EVC/);
const home=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8'),page=fs.readFileSync('algoritmos-oftalmologia.html','utf8');assert.match(home,/data-oph-alg/);assert.match(home,/algoritmos-oftalmologia\.html/);assert.match(home,/category==='Oftalmología'/);assert.match(home,/const cards=algCard\+emergencyAlgCard\+wallaceCard/);assert.match(home,/\+pharmaCard\+ophAlgCard\+list\.map/);assert.match(page,/especialidad=oftalmologia/);for(const p of ["algoritmos-oftalmologia.html","assets/oftalmologia-algoritmos-core-v01075.js","assets/oftalmologia-algoritmos-ui-v01075.js","assets/oftalmologia-algoritmos-v01075.css"])assert.ok(sw.includes("'./"+p+"'"));assert.doesNotMatch(fs.readFileSync('assets/oftalmologia-algoritmos-core-v01075.js','utf8'),/localStorage|fetch\s*\(|innerHTML/);console.log('PASS 16 ophthalmology routes, '+leaves+' traversed safe exits, source links and offline registration.');

const ui=fs.readFileSync('assets/oftalmologia-algoritmos-ui-v01075.js','utf8');
const css=fs.readFileSync('assets/oftalmologia-algoritmos-v01075.css','utf8');
const iconMap=JSON.parse(ui.match(/const ophthalmicIcons=Object\.freeze\((\{[^\n]+\})\);/)[1]);
assert.deepEqual(Object.keys(iconMap).sort(),Array.from(e.algorithms,a=>a.id).sort());
assert.equal(new Set(Object.values(iconMap)).size,16);
assert.match(ui,/iconFor\(a\),'alg-tile-icon'/);
assert.match(ui,/alg-flow-icon'\)\.textContent=iconFor\(a\)/);
assert.match(ui,/icon\.setAttribute\('aria-hidden','true'\)/);
for(const color of ['#00cfe9','#ffda24','#080c10'])assert.ok(css.includes(color));
assert.match(css,/html\.dark body\.alg-peds\.alg-ophthalmology/);
assert.match(css,/\.alg-option:not\(\.danger\):not\(\.warning\)/);
console.log('PASS 16 distinct icons and scoped cyan/yellow/black theme; clinical colors preserved.');

const pharmaFiles=['assets/pharma-pro-expansion.js','assets/pharma-pro-guides-plus.js','assets/pharma-pro-expansion-index-v01043.js','assets/pharma-broad-index-v01058.js','assets/pharma-pro-core.js','assets/oftalmologia-farma-bridge-v01077.js'];
for(const p of pharmaFiles)vm.runInNewContext(fs.readFileSync(p,'utf8'),ctx,{filename:p});
const bridge=ctx.KidBumOphthalmologyPharmaBridge,pharma=ctx.KidBumPharmaCore;
let coverage=0,medLinks=0;
for(const a of e.algorithms)for(const outcome of Object.keys(a.outcomes)){
 const plan=bridge.get(a.id,outcome);assert.ok(plan&&plan.notes&&plan.needsClinicalValidation);coverage++;
 if(outcome==='uncertain')assert.equal(plan.drugs.length,0);
 for(const d of plan.drugs){assert.ok(pharma.byId[d.id],d.id);assert.equal(d.href,'./pharma-pro.html#'+encodeURIComponent(d.id));assert.ok(d.context&&d.route&&d.source[1].startsWith('https://'));medLinks++;}
}
assert.equal(coverage,64);assert.ok(medLinks>=20);
assert.equal(bridge.get('retina','critical').drugs.length,0);
assert.equal(bridge.get('occlusion-arterial','critical').drugs.length,0);
assert.equal(bridge.get('compartimento-orbitario','critical').drugs.length,0);
assert.equal(bridge.get('quemadura-quimica','critical').drugs.length,0);
assert.equal(bridge.get('uveitis','critical').drugs.length,0);
assert.equal(bridge.get('__proto__','critical'),null);
assert.equal(bridge.get('retina','__proto__'),null);
assert.ok(bridge.get('endoftalmitis','critical').drugs.every(d=>d.route.includes('Intravítrea')));
assert.ok(sw.includes('./assets/oftalmologia-farma-bridge-v01077.js')&&page.includes('./assets/oftalmologia-farma-bridge-v01077.js'));
assert.match(ui,/renderTreatment\(a,step\)/);assert.match(ui,/Biblioteca Pharma PRO completa/);
console.log('PASS '+coverage+' ophthalmology outcomes, '+medLinks+' catalog links, fail-closed uncertainty and offline assets.');
