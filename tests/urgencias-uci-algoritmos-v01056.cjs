'use strict';
const currentReleasePattern=require('node:fs').readFileSync('release-check.js','utf8').match(/KidBumPublicRelease\s*=\s*'([0-9.]+)'/)[1].replace(/\./g,'\\.');
/* Adult Urgencias/UCI v0.10.56: exhaustive graph safety and pharma cross-catalog validation. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const rd=p=>fs.readFileSync(p,'utf8');
const paths=[
 'assets/urgencias-algoritmos-core-v01056.js',
 'assets/urgencias-algoritmos-resuc-cardio-v01056.js',
 'assets/urgencias-algoritmos-neuro-resp-v01056.js',
 'assets/urgencias-algoritmos-metab-uci-v01056.js',
 'assets/urgencias-algoritmos-build-v01056.js',
 'assets/urgencias-farma-bridge-v01056.js'];
const pharmacy=[
 'assets/pharma-pro-expansion.js',
 'assets/pharma-pro-guides-plus.js',
 'assets/pharma-pro-expansion-index-v01043.js',
 'assets/pharma-pro-core.js'];
const ctx={};ctx.window=ctx;
for(const p of [...paths,...pharmacy]){
 const source=rd(p);new vm.Script(source,{filename:p});
 vm.runInNewContext(source,ctx,{filename:p,timeout:8000});
}
const engine=ctx.KidBumCriticalAlgorithms,bridge=ctx.KidBumCriticalTreatmentBridge,pharma=ctx.KidBumPharmaCore;
assert.ok(engine&&bridge&&pharma);
assert.equal(engine.version,'0.10.56');assert.equal(bridge.version,'0.10.56');
assert.equal(engine.algorithms.length,40);assert.equal(pharma.records.length,643);
assert.equal(new Set(engine.algorithms.map(x=>x.id)).size,40);
assert.deepEqual(Array.from(engine.validate()),[]);
assert.deepEqual(Array.from(bridge.validate()),[]);
const groups={Reanimación:8,Cardiovascular:8,Neurocríticos:5,Respiratorio:6,Metabólico:6,'UCI y soporte':5,'Trauma y toxicología':2};
for(const [g,n]of Object.entries(groups))assert.equal(engine.search('',g).length,n,'category '+g);
assert.equal(engine.search('').length,40);assert.equal(engine.search('HIPERPOTASEMIA').some(x=>x.id==='hiperpotasemia-adulto'),true);
assert.equal(engine.search('tromboembolia').some(x=>x.id==='tromboembolia-pulmonar'),true);
assert.equal(engine.search('ictus').some(x=>x.id==='ictus-isquemico'),true);
assert.equal(engine.search('cetoacidosis').some(x=>x.id==='cetoacidosis-diabetica-adulto'),true);
assert.equal(engine.search('blah-----').length,0);
assert.equal(engine.getStep('fake'),null);assert.equal(engine.transition('fake','danger',0),null);
let leaves=0,edges=0,medLinks=0,medBranches=0;
const used=new Set(),visitedMedContext=[];
for(const a of engine.algorithms){
 assert.match(a.scope,/Adultos/);
 assert.ok(a.title.length>=14&&a.subtitle.length>=30,a.id+': no clinical scope');
 assert.ok(a.sources.length>=1&&a.sources.every(x=>x.label&&x.url.startsWith('https://')&&x.year));
 assert.ok(['crítica','prioritaria'].includes(a.urgency));
 assert.ok(Object.keys(a.nodes).length<=3,a.id+': too many decisions');
 const start=engine.getStep(a.id);assert.equal(start.kind,'question');
 assert.ok(start.data.choices.some(c=>c.tone==='danger'),a.id+': not danger-first');
 assert.ok(start.data.choices.some(c=>/no puedo|no se puede|certeza/i.test(c.label)),a.id+': no uncertainty path');
 const outcomeIds=new Set();
 const visit=(node,stack)=>{
  if(stack.includes(node))throw Error('cycle '+a.id+'/'+node);
  const step=engine.getStep(a.id,node);
  assert.ok(step,a.id+': invalid '+node);
  if(step.kind==='outcome'){
   const o=step.data;outcomeIds.add(node);leaves++;
   assert.ok(['warning','danger'].includes(o.tone),a.id+'/'+node+': forbidden green discharge');
   assert.ok(o.summary.length>=38&&o.actions.length>=2,a.id+'/'+node+': incomplete clinical instructions');
   assert.doesNotMatch(o.title+' '+o.summary,/alta autorizada|receta aprobada|paciente seguro para alta/i);
   const plan=bridge.get(a.id,node);assert.ok(plan,a.id+'/'+node+': missing treatment');
   assert.ok(plan.needsClinicalValidation&&plan.status.includes('no prescripción'),a.id+'/'+node+': no safety tag');
   assert.ok(plan.sources.length&&plan.actions.length>=2);
   if(plan.drugs.length){medBranches++;medLinks+=plan.drugs.length;}
   for(const d of plan.drugs){
    used.add(d.id);visitedMedContext.push([a.id,node,d.id]);
    const x=pharma.byId[d.id];assert.ok(x,a.id+': unknown catalog medication '+d.id);
    assert.equal(d.name,x.name);
    assert.equal(d.highRisk,Boolean(x.highRisk));
    assert.deepEqual(Array.from(d.populations),Array.from(x.populations));
    assert.ok(d.populations.includes('Adultos'),d.id+': catalog not adult');
    assert.equal(d.href,'./pharma-pro.html#'+encodeURIComponent(d.id));
    assert.ok(d.context.length>=40&&d.warning.length>=60,a.id+': medication lacks scenario-specific caution');
    assert.ok(d.role.length>=7);
   }
   return;
  }
  assert.ok(step.data.question.length>=38&&step.data.hint.length>=40,a.id+': vague question');
  assert.ok(step.data.choices.length>=2&&step.data.choices.length<=4);
  step.data.choices.forEach((choice,i)=>{
   edges++;
   const next=engine.transition(a.id,node,i);
   assert.equal(next,choice.next,a.id+': incorrect transition');
   visit(next,[...stack,node]);
  });
 };
 visit(a.start,[]);
 assert.deepEqual([...outcomeIds].sort(),Object.keys(a.outcomes).sort(),a.id+': unreachable outcome');
 assert.equal(engine.transition(a.id,a.start,-1),null);
 assert.equal(engine.transition(a.id,a.start,1.5),null);
 assert.equal(engine.transition(a.id,a.start,999),null);
 for(const k of ['assess','evaluate'])if(a.outcomes[k])assert.equal(bridge.get(a.id,k).drugs.length,0,a.id+': uncertain or low-risk outcomes MUST NOT auto suggest drugs');
}
assert.equal(bridge.coverage.algorithms,40);
assert.equal(bridge.coverage.outcomes,162);
assert.equal(engine.algorithms.reduce((n,a)=>n+Object.keys(a.outcomes).length,0),162);
assert.ok(medBranches>=50,'Clinical selections must actually be populated');
assert.ok(used.size>=40,'At least forty distinct real Pharma Pro drugs');
assert.ok(medLinks>=70,'Provide sufficiently broad contextual pharmacology');
const ids=(a,o)=>Array.from(bridge.get(a,o).drugs,x=>x.id);
assert.ok(ids('paro-adulto','vf').includes('amiodarona'));
assert.ok(ids('paro-adulto','pea').includes('adrenalina')&&!ids('paro-adulto','pea').includes('amiodarona'));
assert.equal(ids('paro-adulto','norhythm').length,0,'No rhythm: never select antiarrhythmic');
assert.ok(ids('anafilaxia-adulto','critical').includes('adrenalina'));
assert.ok(bridge.get('anafilaxia-adulto','critical').drugs.some(d=>/INTRAMUSCULAR/.test(d.context)));
assert.ok(bridge.get('paro-adulto','pea').drugs.some(d=>/IV\/IO/.test(d.context)));
assert.ok(ids('hiperpotasemia-adulto','critical').includes('gluconato-calcio'));
assert.ok(!ids('hipernatremia-adulto','critical').includes('sodio-hipertonico'),'Sodium concentration conflation');
assert.ok(ids('hiponatremia-adulto','critical').includes('sodio-hipertonico'));
assert.ok(ids('cetoacidosis-diabetica-adulto','critical').includes('insulina-regular'));
assert.ok(!ids('estado-hiperosmolar','evaluate').includes('insulina-regular'));
assert.ok(ids('ictus-isquemico','critical').includes('alteplasa')&&ids('ictus-isquemico','critical').includes('tenecteplasa'));
assert.equal(ids('hemorragia-intracerebral','critical').filter(id=>id==='alteplasa'||id==='tenecteplasa').length,0);
assert.equal(ids('diseccion-aortica','critical').filter(id=>id==='heparina'||id==='alteplasa').length,0);
assert.equal(ids('hemorragia-digestiva-alta','critical').filter(id=>id==='heparina'||id==='enoxaparina').length,0);
assert.equal(ids('choque-indiferenciado','urgent').length,0,'No shock phenotype: no general vasopressor');
assert.equal(ids('insuficiencia-respiratoria-adulto','critical').length,0,'No universal drug in undifferentiated respiratory failure');
assert.equal(ids('taponamiento-cardiaco','critical').length,0,'Drainage, not drugs, is lifesaving');
assert.ok(ids('intoxicacion-opioides','critical').includes('naloxona'));
assert.equal(ids('delirium-uci','critical').length,0,'No default sedative for dangerous delirium');
assert.equal(ids('neutropenia-febril-adulto','critical').includes('meropenem'),true);
assert.ok(ctx.KidBumCriticalDraft===undefined,'Draft must be removed after freeze');
const home=rd('index.html'),page=rd('algoritmos-urgencias.html'),css=rd('assets/urgencias-algoritmos-v01056.css'),ui=rd('assets/urgencias-algoritmos-ui-v01056.js'),sw=rd('sw.js');
assert.match(home,/data-urg-alg/);assert.match(home,/category==='Urgencias y Terapia Intensiva'/);
assert.match(home,/algoritmos-urgencias\.html/);
assert.match(home,/const cards=algCard\+emergencyAlgCard/);
assert.match(home,/data-ped-alg/,'Pediatric specialty tile must remain unaffected');
assert.match(home,new RegExp("kidbum-app-version\" content=\""+currentReleasePattern+"\""));
assert.match(page,/kidbum-app-version" content="0\.10\.56"/);
assert.match(page,/40 rutas clínicas/);
assert.match(page,/data-category="UCI y soporte"/);
assert.match(page,/data-category="Trauma y toxicología"/);
const js=[...page.matchAll(/<script src="\.\/([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(js.slice(-7),[...paths,'assets/urgencias-algoritmos-ui-v01056.js'],'Urgencias UI must load after six engine/pharmacy scripts');
assert.match(ui,/KidBumCriticalAlgorithms/);assert.match(ui,/KidBumCriticalTreatmentBridge/);
assert.match(ui,/KidBumCriticalAlgorithmUI/);assert.match(ui,/function renderTreatment\(a,step\)/);
assert.doesNotMatch(ui,/KidBumPediatricDrugUI/);
assert.match(ui,/pharma-pro\.html/);
assert.match(css,/\.urg-alg-tile/);
assert.match(css,/body\.alg-critical/);
for(const p of ['algoritmos-urgencias.html','assets/urgencias-algoritmos-v01056.css',...paths])assert.ok(sw.includes("'./"+p+"'"),'Missing required offline cache: '+p);
assert.match(sw,/urgencias-uci-alg-v01056/);
for(const p of paths){
 const data=rd(p);
 assert.doesNotMatch(data,/\bfetch\s*\(|XMLHttpRequest|sessionStorage|localStorage|innerHTML|eval\s*\(/,'No private patient data or unsafe HTML: '+p);
 assert.doesNotMatch(data,/=\s*\d+(?:\.\d+)?\s*mg\s*\/\s*kg\b/i,'No auto drug doses: '+p);
}
console.log('PASS adult Urgencias/UCI 0.10.56: 40 clinical flows, 162 treatment outcomes, '+medBranches+' medicated contexts, '+used.size+' live Pharma Pro drugs, '+edges+' traversed decisions, '+leaves+' safe exits, embedded Urgencias tile and complete offline bundle.');
