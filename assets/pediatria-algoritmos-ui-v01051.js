/* KidBum Pediatría 0.10.51 · local-only accessible flow UI */
(function(root){
'use strict';
const engine=root.KidBumPediatricAlgorithms;
if(!engine||!root.document)return;
const $=id=>document.getElementById(id);
if(!$('alg-grid')||!$('alg-interaction'))return;
const elem=(tag,content,cls)=>{
 const el=document.createElement(tag);
 if(content!==undefined)el.textContent=content;
 if(cls)el.className=cls;
 return el;
};
const state={category:'all',query:'',active:null,current:null,path:[],mode:'guardia'};
const categories=[...document.querySelectorAll('[data-category]')];
function updateControls(){
 categories.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===state.category)));
 $('alg-mode-guardia').setAttribute('aria-pressed',String(state.mode==='guardia'));
 $('alg-mode-estudio').setAttribute('aria-pressed',String(state.mode==='estudio'));
}
function renderLibrary(){
 const priority={crítica:0,prioritaria:1};
 const matches=[...engine.search(state.query,state.category)].sort((a,b)=>(priority[a.urgency]??2)-(priority[b.urgency]??2)||a.title.localeCompare(b.title,'es'));
 $('alg-count').textContent=matches.length+' de '+engine.algorithms.length+' disponibles';
 $('alg-grid').replaceChildren();
 for(const a of matches){
  const b=elem('button',undefined,'alg-tile');b.type='button';b.dataset.algoId=a.id;
  b.setAttribute('aria-label','Abrir algoritmo '+a.title);
  const top=elem('span',undefined,'alg-tile-top');
  top.append(elem('span',a.icon,'alg-tile-icon'),elem('span',(a.urgency==='crítica'?'🚨 ':'')+a.time,'alg-tile-tag'));
  b.append(top,elem('h3',a.title),elem('p',a.subtitle),elem('span','Iniciar algoritmo →','alg-tile-open'));
  b.addEventListener('click',()=>open(a.id));
  $('alg-grid').append(b);
 }
 if(!matches.length)$('alg-grid').append(elem('p','Sin coincidencias. Prueba otro término o selecciona “Todos”.','alg-empty'));
 updateControls();
}
function routeUrl(id){
 try{history.replaceState(null,'',location.pathname+location.search+(id?'#'+encodeURIComponent(id):''));}catch(e){}
}
function showSection(active){
 $('alg-library').hidden=active;
 $('alg-flow').hidden=!active;
}
const CLINICAL_TOOLS=Object.freeze({
 sepsis:[['△ TEP · evaluación inicial','./pediatria-evaluacion-rapida.html#tep']],
 'asma-crisis':[['📊 PRAM · gravedad de asma','./expansion-20.html#pram']],
 crup:[['△ TEP · evaluación inicial','./pediatria-evaluacion-rapida.html#tep']],
 bronquiolitis:[['△ TEP · evaluación inicial','./pediatria-evaluacion-rapida.html#tep']],
 neumonia:[['△ TEP · evaluación inicial','./pediatria-evaluacion-rapida.html#tep']],
 convulsion:[['△ TEP · evaluación inicial','./pediatria-evaluacion-rapida.html#tep']],
 ictericia:[['👶 Zonas de Kramer · NO estima bilirrubina','./pediatria-evaluacion-rapida.html#kramer']],
 'abcde-pediatrico':[['🔺 Triángulo de Evaluación Pediátrica','./pediatria-evaluacion-rapida.html#tep']],
 'paro-pediatrico':[['📋 Algoritmos originales PALS 2025 · AHA','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/']],
 'bradicardia-pals':[['📋 Algoritmos originales PALS 2025 · AHA','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/']],
 'taquicardia-pals':[['📋 Algoritmos originales PALS 2025 · AHA','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/']],
 'dificultad-respiratoria':[['🔺 TEP · gravedad pediátrica','./pediatria-evaluacion-rapida.html#tep']],
 'oxigenoterapia-escala':[['🔺 TEP · apariencia, respiración y perfusión','./pediatria-evaluacion-rapida.html#tep']],
 'itu-pediatrica':[['📘 NICE NG224 · muestras y manejo','https://www.nice.org.uk/guidance/ng224/chapter/Recommendations']],
 'meningitis-pediatrica':[['📘 NICE NG240 · meningitis','https://www.nice.org.uk/guidance/ng240/chapter/Recommendations']],
 'reanimacion-neonatal':[['📋 Algoritmo neonatal original AHA/AAP','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation']],
 'apendicitis-pediatrica':[['📊 PAS · escala de apendicitis','./pediatria-pas.html']],
 'trastornos-sodio':[['🧪 Herramientas de líquidos · KidBum','./index.html']],
 'lesion-renal-aguda':[['📈 KDIGO · lesión renal aguda','./expansion-20.html#kdigo']]
});
function renderTools(id){
 const panel=$('alg-tools');if(!panel)return;
 panel.replaceChildren();const items=CLINICAL_TOOLS[id]||[];
 panel.hidden=items.length===0;
 if(!items.length)return;
 panel.append(elem('strong','Herramientas relacionadas · no sustituyen la valoración','alg-tools-heading'));
 for(const [label,href] of items){
  const link=elem('a',label,'alg-tool-link');
  link.href=href;
  if(/^https:\/\//.test(href)){link.target='_blank';link.rel='noopener noreferrer';}
  panel.append(link);
 }
}
function open(id){
 const a=engine.byId[id];
 if(!a)return false;
 state.active=id;state.current=a.start;state.path=[];
 $('alg-flow-icon').textContent=a.icon;
 $('alg-flow-title').textContent=a.title;
 $('alg-flow-subtitle').textContent=a.subtitle;
 const refs=$('alg-evidence-content');refs.replaceChildren();
 refs.append(elem('p','Ámbito: '+a.scope));
 const ul=elem('ul');
 for(const s of a.sources){
  const li=elem('li'),link=elem('a',s.label+' · '+s.year);
  link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';li.append(link);ul.append(li);
 }
 refs.append(ul,elem('p','Guías utilizadas para adaptar el flujo. El año de la fuente no certifica su vigencia o adopción institucional en México. No contiene órdenes, dosis ni cálculo de tratamiento.'));
 renderTools(id);
 showSection(true);routeUrl(id);renderFlow();
 $('alg-flow').scrollIntoView({block:'start',behavior:'smooth'});
 return true;
}
function close(){
 state.active=null;state.current=null;state.path=[];
 showSection(false);routeUrl('');
 renderLibrary();
 $('alg-library').scrollIntoView({block:'start',behavior:'smooth'});
}
function goTo(choiceIndex){
 if(!state.active)return;
 const next=engine.transition(state.active,state.current,choiceIndex);
 if(!next)return;
 state.path.push({from:state.current,index:choiceIndex,to:next});
 state.current=next;
 renderFlow();
}
function back(){
 if(!state.active)return;
 if(!state.path.length){close();return;}
 const prior=state.path.pop();
 state.current=prior.from;renderFlow();
}
function restart(){
 if(!state.active)return;
 state.path=[];state.current=engine.byId[state.active].start;renderFlow();
}
function renderRail(){
 const step=engine.getStep(state.active,state.current);
 const max=Math.min(6,Math.max(3,engine.byId[state.active]&&Object.keys(engine.byId[state.active].nodes).length+1||3));
 const completed=Math.min(max,state.path.length+(step?.kind==='outcome'?1:0)+1);
 const rail=$('alg-rail');rail.replaceChildren();
 for(let i=0;i<max;i++)rail.append(elem('span',undefined,i<completed?'active':''));
 rail.setAttribute('aria-label','Avance: '+Math.min(state.path.length+1,max)+' de '+max+' etapas aproximadas');
}
function renderTreatment(a,step){
 const bridge=root.KidBumPediatricTherapyBridge;
 const plan=bridge?.get(a.id,step.id);
 if(!plan)return null;
 const section=elem('section',undefined,'alg-therapy');
 section.dataset.outcomeId=step.id;
 section.dataset.algorithmId=a.id;
 section.setAttribute('aria-label','Tratamiento clínico y fichas de Pharma Pro');
 const head=elem('div',undefined,'alg-therapy-head');
 const heading=elem('h3','💊 Tratamiento y farmacología vinculada');
 const context=elem('span','Rama: '+step.data.title.replace(/^🚨\s*|^⚠️\s*/,'').slice(0,62),'alg-therapy-branch');
 head.append(heading,context);section.append(head);
 section.append(elem('p',plan.context,'alg-therapy-context'));
 const info=elem('p','Objetivo: '+plan.purpose,'alg-therapy-purpose');
 section.append(info);
 if(plan.drugs.length){
  const intro=elem('div',undefined,'alg-therapy-med-intro');
  intro.append(elem('strong','Fármacos que conviene consultar en esta situación'));
  intro.append(elem('span',plan.drugs.length+' fichas vinculadas','alg-therapy-count'));
  section.append(intro);
  const cards=elem('div',undefined,'alg-therapy-medications');
  plan.drugs.forEach(m=>{
   const card=elem('article',undefined,'alg-therapy-med');
   card.dataset.drugId=m.id;
   const label=elem('span',m.role,'alg-rx-role');
   const name=elem('strong',m.name,'alg-rx-name');
   const explanation=elem('p',m.context,'alg-rx-context');
   card.append(label,name,explanation);
   const status=elem('div',undefined,'alg-rx-flags');
   if(m.highRisk)status.append(elem('span','⚠ Alto riesgo: doble verificación','alg-rx-warning'));
   const age=a.category==='Neonatología'?'Neonatología':'Pediatría';
   if(!m.populations.includes(age))status.append(elem('span','⚠ Sin ficha validada para '+age+' en Pharma Pro','alg-rx-warning'));
   else status.append(elem('span','Catálogo: '+age+' · dosis no verificadas','alg-rx-tag'));
   card.append(status);
   if(m.warning)card.append(elem('p','Precaución: '+m.warning,'alg-rx-precaution'));
   const reference=root.KidBumPediatricDrugUI?.render(m.id,{algorithm:a.id,outcome:step.id,compact:true});
   if(reference)card.append(reference);
   const contextual=elem('a','Abrir pauta contextual en Pharma Pro →','alg-rx-dose-link');
   contextual.href='./pharma-pro.html?peds=1&alg='+encodeURIComponent(a.id)+'&outcome='+encodeURIComponent(step.id)+'&med='+encodeURIComponent(m.id)+'#'+encodeURIComponent(m.id);
   contextual.target='_blank';contextual.rel='noopener noreferrer';
   contextual.setAttribute('aria-label','Abrir referencia pediátrica de '+m.name+' para '+a.title);
   card.append(contextual);
   const link=elem('a','Consultar ficha en Pharma Pro →','alg-rx-link');
   link.href=m.href;link.target='_blank';link.rel='noopener noreferrer';
   link.setAttribute('aria-label','Abrir ficha de '+m.name+' en Pharma Pro');
   card.append(link);
   cards.append(card);
  });
  section.append(cards);
 }else{
  section.append(elem('p','Sin medicamento seleccionado automáticamente en esta rama. No implica que nunca pueda indicarse uno; la prioridad está descrita en la conducta clínica anterior.','alg-therapy-no-drug'));
 }
 const safe=elem('details',undefined,'alg-therapy-checklist');
 safe.append(elem('summary','🛡️ Comprobaciones antes de prescribir'));
 const bullets=elem('ul');
 for(const item of [
  'Confirmar diagnóstico, gravedad, edad gestacional/posnatal y peso actual.',
  'Verificar alergias, vía, formulación y concentración local; revisar función renal/hepática e interacciones.',
  'Cotejar la pauta y dosis pediátrica/neonatal con guía aplicable y ficha autorizada del producto en México.',
  'Las fichas de índice de Pharma Pro pueden carecer de indicación, dosis o población validadas: NO constituyen una orden.'
 ])bullets.append(elem('li',item));
 safe.append(bullets);section.append(safe);
 const foot=elem('div',undefined,'alg-therapy-footer');
 foot.append(elem('span','📚 Fuentes del algoritmo: '+plan.sources.map(x=>x.year).join(' · ')));
 const full=elem('a','Explorar los 643 medicamentos ↗','alg-rx-library');
 full.href='./pharma-pro.html';full.target='_blank';full.rel='noopener noreferrer';
 foot.append(full);section.append(foot);
 return section;
}
function renderFlow(){
 const a=engine.byId[state.active],step=engine.getStep(state.active,state.current);
 if(!a||!step)return;
 const area=$('alg-interaction');area.replaceChildren();
 renderRail();
 if(step.kind==='question'){
  const wrap=elem('section',undefined,'alg-question');
  wrap.append(elem('span','DECISIÓN '+(state.path.length+1),'alg-step-label'),elem('h3',step.data.question));
  const details=elem('details',undefined,'alg-hint-details'),summary=elem('summary','🔎 Qué buscar en la valoración');
  const hint=elem('p',step.data.hint,'alg-hint');
  details.append(summary,hint);details.open=state.mode==='estudio';
  wrap.append(details);
  const options=elem('div',undefined,'alg-options');
  step.data.choices.forEach((choice,index)=>{
   const b=elem('button',choice.label,'alg-option'+(choice.tone?' '+choice.tone:''));
   b.type='button';b.dataset.choiceIndex=String(index);
   b.addEventListener('click',()=>goTo(index));options.append(b);
  });
  wrap.append(options);
  area.append(wrap);
 }else{
  const outcome=step.data;
  const wrap=elem('section',undefined,'alg-outcome '+outcome.tone);
  wrap.setAttribute('role','status');
  wrap.append(elem('span','RESULTADO DE LA RUTA · NO SUSTITUYE EVALUACIÓN','alg-step-label'),elem('h3',outcome.title),elem('p',outcome.summary));
  const list=elem('ol');
  for(const action of outcome.actions)list.append(elem('li',action));
  wrap.append(list);
  area.append(wrap);
  const therapy=renderTreatment(a,step);
  if(therapy)area.append(therapy);
 }
 $('alg-back-step').disabled=!state.path.length;
 const trail=state.path.map(x=>{
  const q=engine.getStep(a.id,x.from)?.data;
  return q?.choices[x.index]?.label;
 }).filter(Boolean);
 $('alg-trail').textContent=trail.length?'Ruta seleccionada: '+trail.join('  ›  '):'Inicia seleccionando la situación clínica que corresponde.';
 $('alg-evidence').open=state.mode==='estudio';
 updateControls();
}
function setMode(next){
 if(next!=='guardia'&&next!=='estudio')return;
 state.mode=next;
 if(state.active)renderFlow();else updateControls();
}
$('alg-search-input').addEventListener('input',e=>{state.query=e.target.value;renderLibrary();});
categories.forEach(button=>button.addEventListener('click',()=>{
 state.category=button.dataset.category;renderLibrary();
}));
$('alg-to-library').addEventListener('click',close);
$('alg-back-step').addEventListener('click',back);
$('alg-restart').addEventListener('click',restart);
$('alg-mode-guardia').addEventListener('click',()=>setMode('guardia'));
$('alg-mode-estudio').addEventListener('click',()=>setMode('estudio'));
$('alg-theme').addEventListener('click',()=>{
 const dark=document.documentElement.classList.toggle('dark');
 try{localStorage.setItem('kidbum-theme',dark?'dark':'light');}catch(e){}
});
root.addEventListener('hashchange',()=>{
 const id=decodeURIComponent(location.hash.slice(1));
 if(engine.byId[id]){if(state.active!==id)open(id);}
 else if(state.active)close();
});
const initial=decodeURIComponent(location.hash.slice(1));
if(engine.byId[initial])open(initial);
else renderLibrary();
root.KidBumPediatricAlgorithmUI=Object.freeze({
 open,close,back,restart,setMode,getState:()=>({active:state.active,current:state.current,steps:state.path.length,mode:state.mode,category:state.category})
});
})(typeof window!=='undefined'?window:globalThis);
