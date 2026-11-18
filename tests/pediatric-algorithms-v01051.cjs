'use strict';
/* Clinical graph contract: scope, danger-first routes, reachable exits and zero invented dosing. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const modulePath='assets/pediatria-algoritmos-core-v01051.js';
const source=read(modulePath),page=read('algoritmos-pediatria.html'),css=read('assets/pediatria-algoritmos-v01051.css');
const ui=read('assets/pediatria-algoritmos-ui-v01051.js'),index=read('index.html'),sw=read('sw.js');
new vm.Script(source,{filename:modulePath});new vm.Script(ui,{filename:'pediatric-algorithms-ui'});
const a=require('../'+modulePath);
assert.equal(a.version,'0.10.51');
assert.equal(a.algorithms.length,4);
assert.deepEqual(a.validate(),[],'Every decision must lead to a complete, valid graph');
assert.deepEqual(a.algorithms.map(x=>x.id),['diarrea','bronquiolitis','sepsis','ictericia']);
assert.equal(a.search('SEPSIS').length,1);
assert.equal(a.search('brOnQuIoLiTiS').length,1);
assert.equal(a.search('deshidratacion').length,1);
assert.equal(a.search('ictericia').length,1);
assert.equal(a.search('no-catalog-match').length,0);
assert.equal(a.search('','Neumología').length,1);
for(const item of a.algorithms){
 assert.ok(item.scope.length>25,item.id+' missing explicit population');
 assert.ok(item.sources.length>=1,item.id+' missing references');
 assert.ok(item.sources.every(s=>/^https:\/\//.test(s.url)&&s.label&&s.year),item.id+' source incomplete');
 const first=a.getStep(item.id);
 assert.ok(first&&first.kind==='question',item.id+' no entry question');
 assert.match(first.data.question,/choque|apnea|neurológicos|conciencia/i,item.id+' danger must be first');
 assert.ok(first.data.choices.some(c=>c.tone==='danger'),item.id+' danger action must be early');
 assert.ok(first.data.choices.some(c=>c.label.includes('No')&&c.next),item.id+' must support no/unknown');
 const reached=new Set();
 function traverse(id,depth){
  assert.ok(depth<=8,item.id+' too many taps');
  const s=a.getStep(item.id,id);assert.ok(s);
  if(s.kind==='outcome'){
   reached.add(id);
   assert.ok(['danger','warning','support'].includes(s.data.tone));
   assert.ok(s.data.actions.length>=2);
   assert.ok(s.data.title&&s.data.summary);
   assert.ok(!/alta médica autorizada|prescripción completada/i.test(s.data.title+' '+s.data.summary));
   return;
  }
  assert.ok(s.data.choices.length>=2);
  for(let i=0;i<s.data.choices.length;i++){
   const next=a.transition(item.id,id,i);
   assert.equal(next,s.data.choices[i].next);
   traverse(next,depth+1);
  }
 }
 traverse(item.start,0);
 assert.equal(reached.size,Object.keys(item.outcomes).length,item.id+' orphan outcomes');
 assert.ok(Object.values(item.outcomes).some(o=>o.tone==='danger'));
 assert.equal(a.transition(item.id,item.start,99),null);
 assert.equal(a.transition(item.id,item.start,NaN),null);
 assert.equal(a.getStep(item.id,'nonexistent'),null);
}
assert.equal(a.getStep('invalid'),null);
assert.equal(a.transition('invalid','danger',0),null);
assert.match(a.byId.sepsis.outcomes.emergency.summary,/primera hora/);
assert.match(a.byId.sepsis.outcomes.emergency.actions.join(' '),/disponibilidad de cuidados intensivos/);
assert.match(a.byId.diarrea.scope,/2 meses/);
assert.match(a.byId.ictericia.scope,/35 semanas/);
assert.match(a.byId.ictericia.outcomes.compare.summary,/bilirrubina TOTAL/);
assert.match(a.byId.bronquiolitis.outcomes.support.actions.join(' '),/No indicar rutinariamente broncodilatadores/);
assert.doesNotMatch(source,/\b(fetch|XMLHttpRequest|eval|localStorage|sessionStorage)\s*\(/,'Never network/access patient data in graph');
assert.doesNotMatch(source,/(mg\s*\/\s*kg|mL\s*\/\s*kg|microgramos\s*\/\s*kg)/i,'No medical dosing by editorial graph');
assert.doesNotMatch(ui,/\bfetch\s*\(|XMLHttpRequest|innerHTML|sendBeacon/,'UI stays local and escapes all text');
assert.match(page,/<html lang="es"/);
assert.match(page,/id="alg-grid"/);
assert.match(page,/id="alg-interaction"/);
assert.match(page,/id="alg-mode-guardia"/);
assert.match(page,/id="alg-mode-estudio"/);
assert.match(page,/id="alg-search-input"/);
assert.match(page,/id="alg-library"/);
assert.match(index,/class="ped-alg-tile"/);
assert.match(index,/data-ped-alg/);
assert.match(index,/location\.assign\('\.\/algoritmos-pediatria\.html'\)/);
assert.doesNotMatch(index,/const cards=algCard\+.*?algCard\+/, 'only one tile');
assert.match(css,/@media\(max-width:520px\)/);
assert.match(css,/focus-visible/);
for(const asset of [
 './algoritmos-pediatria.html',
 './assets/pediatria-algoritmos-core-v01051.js',
 './assets/pediatria-algoritmos-ui-v01051.js',
 './assets/pediatria-algoritmos-v01051.css'
])assert.ok(sw.includes("'"+asset+"'"),'Missing offline resource '+asset);
assert.match(sw,/pediatric-clinical-algorithms-v01051/);
console.log('PASS 4 pediatric clinical algorithms: all branches reachable, danger-first triage, traceable sources, accessible offline UX and no invented dosing.');
