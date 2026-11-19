'use strict';
/* Phase III: 16 additional high-risk pediatric flowgraphs, all branches and safeguards. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const files=['assets/pediatria-algoritmos-core-v01051.js','assets/pediatria-algoritmos-extension-v01052.js','assets/pediatria-algoritmos-extension-v01053.js'];
const context={};context.window=context;
for(const filename of files){const source=read(filename);new vm.Script(source,{filename});vm.runInNewContext(source,context,{filename,timeout:6000});}
const lib=context.KidBumPediatricAlgorithms;
const idlist=['abcde-pediatrico','paro-pediatrico','bradicardia-pals','taquicardia-pals','dificultad-respiratoria','oxigenoterapia-escala','itu-pediatrica','meningitis-pediatrica','reanimacion-neonatal','hipoglucemia-neonatal','sepsis-neonatal','apendicitis-pediatrica','obstruccion-invaginacion','trastornos-sodio','lesion-renal-aguda','neutropenia-febril'];
assert.equal(lib.version,'0.10.53');
assert.equal(lib.algorithms.length,28);
assert.deepEqual(Array.from(lib.algorithms.slice(12),x=>x.id),idlist);
assert.equal(new Set(lib.algorithms.map(x=>x.id)).size,28,'No duplicate algorithm IDs');
assert.deepEqual(Array.from(lib.validate()),[],'Graph validator must report no broken edge/unreachable exits');
assert.equal(lib.search('').length,28);
const counts={Urgencias:10,Neumología:5,Infectología:3,Neonatología:4,Gastroenterología:3,Hospitalización:3};
for(const [category,count] of Object.entries(counts))assert.equal(lib.search('',category).length,count,category+' count');
assert.equal(lib.search('paro').some(a=>a.id==='paro-pediatrico'),true);
assert.equal(lib.search('Meningitis').some(a=>a.id==='meningitis-pediatrica'),true);
assert.equal(lib.search('Apendicitis').some(a=>a.id==='apendicitis-pediatrica'),true);
assert.equal(lib.search('LESION RENAL').some(a=>a.id==='lesion-renal-aguda'),true);
assert.equal(lib.search('Neutropenia').some(a=>a.id==='neutropenia-febril'),true);
assert.equal(lib.getStep('nonesuch'),null);
assert.equal(lib.transition('nonesuch','danger',0),null);
let leafChecks=0,decisionBranches=0;
for(const id of idlist){
 const a=lib.byId[id];
 assert.ok(a.scope?.length>=65,id+': missing explicit scope');
 assert.ok(['crítica','prioritaria'].includes(a.urgency),id+': priority missing');
 assert.ok(a.sources?.length,id+': missing sources');
 for(const s of a.sources){
  assert.match(s.url,/^https:\/\/[^/]+\//,id+': incorrect reference');
  assert.ok(s.label?.length>12&&s.year?.length>3,id+': missing source version');
 }
 const first=lib.getStep(id);
 assert.equal(first.kind,'question',id+': expected first question');
 assert.ok(first.data.choices.some(c=>c.tone==='danger'),id+': first screen must expose urgent pathway');
 assert.ok(first.data.choices.some(c=>/no|desconoc|determinar|posible/i.test(c.label)),id+': no uncertainty branch');
 const visitedOutcomes=new Set(),visitedNodes=new Set();
 function traverse(n,depth){
  assert.ok(depth<=4,id+': too many taps for quick access');
  const step=lib.getStep(id,n);assert.ok(step,id+': invalid graph node '+n);
  if(step.kind==='outcome'){
   visitedOutcomes.add(n);leafChecks++;
   assert.ok(['danger','warning'].includes(step.data.tone),id+': automatic green branch disallowed');
   assert.ok(step.data.title?.length>=14&&step.data.summary?.length>=60,id+': incomplete result');
   assert.ok(step.data.actions?.length>=2,id+': at least two clinical actions');
   assert.doesNotMatch(step.data.title+' '+step.data.summary,/alta autorizada|prescripción aprobada|apto para alta/i);
   return;
  }
  if(visitedNodes.has(n))throw Error(id+': cycle detected');
  visitedNodes.add(n);
  assert.ok(step.data.question?.length>=18,id+': too vague question');
  assert.ok(step.data.hint?.length>=35,id+': missing clinical details');
  assert.ok(step.data.choices.length>=2&&step.data.choices.length<=4,id+': 2–4 tactile options required');
  for(let i=0;i<step.data.choices.length;i++){
   const next=lib.transition(id,n,i);
   decisionBranches++;
   assert.equal(next,step.data.choices[i].next,id+': wrong linked decision');
   traverse(next,depth+1);
  }
  visitedNodes.delete(n);
 }
 traverse(a.start,0);
 assert.deepEqual([...visitedOutcomes].sort(),Object.keys(a.outcomes).sort(),id+': missed terminal states');
 assert.equal(lib.transition(id,a.start,-1),null);
 assert.equal(lib.transition(id,a.start,1.2),null);
 assert.equal(lib.transition(id,a.start,999),null);
 assert.ok(Object.values(a.outcomes).some(o=>o.tone==='danger'),id+': missing emergency');
}
const text=(id)=>Object.values(lib.byId[id].outcomes).flatMap(x=>[x.title,x.summary,...x.actions]).join(' ');
assert.match(lib.byId['paro-pediatrico'].nodes.danger.question,/10 segundos/);
assert.match(text('paro-pediatrico'),/no se desfibrila/i);
assert.match(text('paro-pediatrico'),/desfibrilación/i);
assert.match(lib.byId['bradicardia-pals'].nodes.danger.question,/60\/min/);
assert.match(text('bradicardia-pals'),/compresiones/i);
assert.match(text('taquicardia-pals'),/cardioversión sincronizada/i);
assert.match(text('reanimacion-neonatal'),/ventilación efectiva/i);
assert.match(lib.byId['reanimacion-neonatal'].nodes.ventilate.question,/30 segundos/);
assert.match(text('hipoglucemia-neonatal'),/glucosa parenteral/i);
assert.match(text('sepsis-neonatal'),/hemocultivos/i);
assert.match(text('meningitis-pediatrica'),/punción lumbar/i);
assert.match(text('itu-pediatrica'),/orina/i);
assert.match(text('apendicitis-pediatrica'),/cirugía pediátrica/i);
assert.match(text('obstruccion-invaginacion'),/peritonitis, shock o perforación/i);
assert.match(text('trastornos-sodio'),/hipertónica/i);
assert.match(text('lesion-renal-aguda'),/hiperpotasemia/i);
assert.match(text('neutropenia-febril'),/antibiótico/i);
const extension=read(files[2]);
assert.doesNotMatch(extension,/\bfetch\s*\(|XMLHttpRequest|sessionStorage|localStorage|innerHTML|eval\s*\(/,'Clinical graph must never collect patient data');
assert.doesNotMatch(extension,/\b\d+(?:\.\d+)?\s*(?:mg|mL|µg)\s*\/\s*kg/i,'No automatic or unverified prescriptions');
const html=read('algoritmos-pediatria.html'),home=read('index.html'),sw=read('sw.js'),ui=read('assets/pediatria-algoritmos-ui-v01051.js');
assert.match(html,/content="0\.10\.55"/);
assert.match(html,/28 rutas \+ 29 fichas/);
assert.match(html,/data-category="Hospitalización"/);
const scripts=[...html.matchAll(/<script src="\.\/([^"]+)"/g)].map(m=>m[1]);
const idx=scripts.indexOf(files[2]);
assert.ok(idx>scripts.indexOf(files[1])&&idx<scripts.indexOf('assets/pediatria-algoritmos-ui-v01051.js'),'Extension must load before UI');
assert.match(home,/28 algoritmos \+ tratamientos/);
assert.match(home,/data-ped-alg/);
assert.match(ui,/reanimacion-neonatal/);
assert.match(ui,/apendicitis-pediatrica/);
assert.match(ui,/PRAM/);
assert.ok(sw.includes("'./assets/pediatria-algoritmos-extension-v01053.js'"));
assert.match(sw,/phase3-v01053/);
console.log('PASS pediatric phase III: '+idlist.length+' new graphs; 28 total; '+decisionBranches+' decisions and '+leafChecks+' safe endpoints; mobile UX, source scope, PWA.');
