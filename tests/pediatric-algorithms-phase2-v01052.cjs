'use strict';
/* Phase-II release contract: exactly 8 new sourced pediatric algorithms (12 total). */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const baseSrc=read('assets/pediatria-algoritmos-core-v01051.js');
const extensionSrc=read('assets/pediatria-algoritmos-extension-v01052.js');
const root={};root.window=root;
for(const [label,source] of [['legacy core',baseSrc],['phase II',extensionSrc]]){
 new vm.Script(source,{filename:label});
 vm.runInNewContext(source,root,{filename:label,timeout:5000});
}
const lib=root.KidBumPediatricAlgorithms;
assert.ok(lib,'Expanded library not loaded');
assert.equal(lib.version,'0.10.52');
assert.equal(lib.algorithms.length,12);
assert.deepEqual(Array.from(lib.algorithms.slice(0,4),a=>a.id),['diarrea','bronquiolitis','sepsis','ictericia'],'Base four must not change');
const expected=['anafilaxia','convulsion','hipoglucemia','cetoacidosis','asma-crisis','crup','neumonia','lactante-febril'];
assert.deepEqual(Array.from(lib.algorithms.slice(4),a=>a.id),expected);
assert.deepEqual(Array.from(lib.validate()),[],'Every node in all 12 graphs is reachable and resolves');
assert.equal(new Set(lib.algorithms.map(a=>a.id)).size,12);
assert.equal(lib.search('').length,12);
assert.equal(lib.search('AsMa').some(a=>a.id==='asma-crisis'),true);
assert.equal(lib.search('CETOACIDOSIS').some(a=>a.id==='cetoacidosis'),true);
assert.equal(lib.search('NEUMONÍA').some(a=>a.id==='neumonia'),true);
assert.equal(lib.search('Neumonia').some(a=>a.id==='neumonia'),true);
assert.equal(lib.search('lactante febril').some(a=>a.id==='lactante-febril'),true);
assert.equal(lib.search('','Infectología').length,1);
assert.equal(lib.search('','Urgencias').length,5,'sepsis+4 new emergency pathways');
assert.equal(lib.search('','Neumología').length,4,'bronchiolitis+asthma+croup+pneumonia');
assert.equal(lib.search('','Neonatología').length,1);
assert.equal(lib.search('invalid-xyz').length,0);
assert.equal(lib.getStep('missing'),null);
assert.equal(lib.transition('missing','danger',0),null);
for(const id of expected){
 const a=lib.byId[id];
 assert.ok(a, id+' missing');
 assert.ok(a.scope&&a.scope.length>=70,id+' missing population and exclusion');
 assert.ok(a.sources.length>=1,id+' must have references');
 assert.ok(a.sources.every(s=>/^https:\/\/[^/]+\/.+/.test(s.url)&&s.label&&s.year),id+' needs real source URL+date');
 assert.ok(['crítica','prioritaria'].includes(a.urgency),id+' must label priority');
 assert.ok(Object.keys(a.nodes).length<=5,id+' too many questions');
 const initial=lib.getStep(id);
 assert.equal(initial.kind,'question',id+' start must be a decision');
 assert.ok(initial.data.choices.some(x=>x.tone==='danger'),id+' must expose danger exit immediately');
 assert.ok(initial.data.choices.some(x=>/no|desconocid|determinar|inciert/i.test(x.label)),id+' must offer non-affirmative path');
 const exits=new Set();
 const explore=(nodeId,depth)=>{
  assert.ok(depth<=6,id+' path exceeds quick 5 decisions');
  const node=lib.getStep(id,nodeId);
  assert.ok(node,id+': broken graph '+nodeId);
  if(node.kind==='outcome'){
   exits.add(nodeId);
   assert.ok(['danger','warning'].includes(node.data.tone),id+' cannot auto-approve discharge');
   assert.ok(node.data.actions.length>=2,id+' incomplete action set');
   assert.ok(node.data.summary.length>=45,id+' result summary too short');
   assert.doesNotMatch(node.data.title,/alta autorizada|receta aprobada|paciente seguro/i);
   return;
  }
  assert.ok(node.data.question.length>=20&&node.data.hint.length>=30,id+' question lacks useful context');
  assert.ok(node.data.choices.length>=2&&node.data.choices.length<=4,id+' choices need 2-4');
  node.data.choices.forEach((c,i)=>{
   const next=lib.transition(id,nodeId,i);
   assert.equal(next,c.next,id+' wrong branch for '+nodeId);
   explore(next,depth+1);
  });
 };
 explore(a.start,0);
 assert.deepEqual([...exits].sort(),Object.keys(a.outcomes).sort(),id+' hidden or orphan exits');
 assert.equal(lib.transition(id,a.start,-1),null);
 assert.equal(lib.transition(id,a.start,999),null);
 assert.equal(lib.transition(id,a.start,1.5),null);
 assert.ok(Object.values(a.outcomes).some(o=>o.tone==='danger'),id+' must have urgent exit');
}
const checks=[
 ['anafilaxia',/adrenalina \(epinefrina\) IM/,/no esperar antihistamínicos/i],
 ['convulsion',/5 min/i,/benzodiacepina/i],
 ['hipoglucemia',/glucosa IV\/IO/i,/NO ofrecer nada por boca/i],
 ['cetoacidosis',/pediatría\/UCI|pediátrico/i,/potasio/i],
 ['asma-crisis',/broncodilatador de acción rápida/i,/no usar sedación/i],
 ['crup',/adrenalina nebulizada/i,/vía aérea/i],
 ['neumonia',/oxígeno\/ventilación/i,/sepsis/i],
 ['lactante-febril',/infección invasiva/i,/hospitalaria/i]
];
for(const [id,first,second]of checks){
 const a=lib.byId[id];
 const text=Object.values(a.outcomes).flatMap(o=>[o.title,o.summary,...o.actions]).join('\n');
 assert.match(text,first,id+' expected urgent measure missing');
 assert.match(text,second,id+' safety context missing');
}
assert.match(lib.byId['lactante-febril'].scope,/8–60 días/);
assert.ok(['age8','age22','age29'].every(s=>lib.byId['lactante-febril'].outcomes[s]));
assert.match(lib.byId['asma-crisis'].nodes.allergy.hint,/anafilaxia/i);
assert.match(lib.byId.crup.nodes.atypical.hint,/epiglotitis/i);
assert.match(lib.byId.hipoglucemia.nodes.danger.hint,/No dar alimentos/i);
assert.match(lib.byId.cetoacidosis.nodes.triad.hint,/equilibrio ácido-base|acidosis metabólica/);
assert.doesNotMatch(extensionSrc,/\bfetch\s*\(|XMLHttpRequest|sessionStorage|localStorage|innerHTML|eval\s*\(/,'No patient data collection, network or HTML injection');
assert.doesNotMatch(extensionSrc,/\d+(?:\.\d+)?\s*(?:mg|mL|µg)\s*\/\s*kg/i,'No editorial weight-based dose published');
const page=read('algoritmos-pediatria.html');
const index=read('index.html'),ui=read('assets/pediatria-algoritmos-ui-v01051.js'),css=read('assets/pediatria-algoritmos-v01051.css'),sw=read('sw.js');
assert.match(page,/kidbum-app-version" content="0\.10\.55"/);
assert.match(page,/🩺 28 rutas \+ 29 fichas/);
assert.match(page,/data-category="Infectología"/);
const scripts=[...page.matchAll(/<script src="\.\/([^"]+)"(?: defer)?><\/script>/g)].map(m=>m[1]);
assert.ok(scripts.indexOf('assets/pediatria-algoritmos-core-v01051.js')<scripts.indexOf('assets/pediatria-algoritmos-extension-v01052.js'));
assert.ok(scripts.indexOf('assets/pediatria-algoritmos-extension-v01052.js')<scripts.indexOf('assets/pediatria-algoritmos-ui-v01051.js'));
assert.match(page,/id="alg-tools"/);
assert.match(ui,/CLINICAL_TOOLS/);
assert.match(ui,/PRAM/);
assert.match(ui,/renderTools\(id\)/);
assert.match(ui,/urgency/);
assert.match(css,/alg-tool-link/);
assert.match(index,/28 algoritmos \+ tratamientos/);
assert.match(index,/data-ped-alg/);
assert.ok(sw.includes("'./assets/pediatria-algoritmos-extension-v01052.js'"));
assert.match(sw,/expanded-phase2-v01052/);
console.log('PASS phase II: 12 pediatric algorithms, 8 new source-linked danger-first graphs, fully tested exits, responsive quick-navigation and offline assets.');
