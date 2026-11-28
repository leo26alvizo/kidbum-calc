/* LEO MED Urgencias/UCI 0.10.56 · adult-only accessible rapid clinical flow */
(function(root){
'use strict';
const engine=root.KidBumCriticalAlgorithms;
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
 'paro-adulto':[['📋 ACLS 2025 · algoritmos originales','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms']],
 'bradicardia-adulto':[['📋 ACLS · bradicardia y pulso','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms']],
 'taquiarritmia-adulto':[['📋 ACLS · taquiarritmias','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms']],
 'post-paro':[['📋 AHA 2025 · post paro','https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care']],
 'sepsis-choque':[['📈 SOFA · LEO MED','./index.html'],['📘 SSC 2026','https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026']],
 'sindrome-coronario':[['📊 HEART / GRACE · LEO MED','./expansion-20.html#heart']],
 'tromboembolia-pulmonar':[['📊 Wells / Ginebra / PESI · LEO MED','./index.html']],
 'ictus-isquemico':[['📋 AHA/ASA 2026 · EVC','https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke']],
 'hemorragia-intracerebral':[['📊 ICH Score · LEO MED','./expansion-20.html#ich']],
 'insuficiencia-respiratoria-adulto':[['🧪 Gasometría integrada','./index.html']],
 'sindrome-distres-respiratorio':[['📘 ATS · ventilación SDRA','https://academic.oup.com/ajrccm/article/209/1/24/8427573']],
 'hiperpotasemia-adulto':[['📘 UKKA · hiperpotasemia','https://guidelines.ukkidney.org/hyperkalaemia/']],
 'lesion-renal-aguda-adulto':[['📊 KDIGO · LRA','./expansion-20.html#kdigo']],
 'hemorragia-digestiva-alta':[['📊 AIMS65 · LEO MED','./expansion-20.html#aims65']],
 'sedacion-analgesia-uci':[['📘 SCCM PADIS 2025','https://sccm.org/clinical-resources/guidelines/guidelines/focused-update-padis-guideline']]
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
 refs.append(ul,elem('p','Guías utilizadas como orientación editorial para adultos. El año o la procedencia de la fuente no certifica adopción institucional en México. Los enlaces a fármacos no autorizan dosis, preparación ni órdenes.'));
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
 const plan=root.KidBumCriticalTreatmentBridge?.get(a.id,step.id);
 if(!plan)return null;
 const section=elem('section',undefined,'alg-therapy');
 section.dataset.outcomeId=step.id;section.dataset.algorithmId=a.id;
 section.setAttribute('aria-label','Tratamiento por rama y fichas vinculadas de Pharma Pro');
 const head=elem('div',undefined,'alg-therapy-head');
 head.append(elem('h3','💊 Tratamiento y farmacología vinculada'),
  elem('span','Rama: '+step.data.title.replace(/^🚨\s*|^⚠️\s*/,'').slice(0,58),'alg-therapy-branch'));
 section.append(head,elem('p',plan.purpose,'alg-therapy-context'));
 const intro=elem('p','Conducta prioritaria: '+plan.context,'alg-therapy-purpose');
 section.append(intro);
 if(plan.drugs.length){
  const heading=elem('div',undefined,'alg-therapy-med-intro');
  heading.append(elem('strong','Medicamentos pertinentes para esta rama · no son órdenes'),elem('span',plan.drugs.length+' fichas de Pharma Pro','alg-therapy-count'));
  section.append(heading);
  const cards=elem('div',undefined,'alg-therapy-medications');
  for(const m of plan.drugs){
   const card=elem('article',undefined,'alg-therapy-med');card.dataset.drugId=m.id;
   card.append(elem('span',m.role,'alg-rx-role'),elem('strong',m.name,'alg-rx-name'),elem('p',m.context,'alg-rx-context'));
   const status=elem('div',undefined,'alg-rx-flags');
   if(m.highRisk)status.append(elem('span','⚠ Alto riesgo · doble verificación','alg-rx-warning'));
   if(!m.populations.includes('Adultos'))status.append(elem('span','⚠ Población adulta NO indexada en Pharma Pro','alg-rx-warning'));
   else status.append(elem('span','Índice: Adultos · dosis no validada para esta rama','alg-rx-tag'));
   card.append(status,elem('p',m.warning,'alg-rx-precaution'));
   const link=elem('a','Abrir ficha en Pharma Pro →','alg-rx-link');
   link.href=m.href;link.target='_blank';link.rel='noopener noreferrer';
   link.setAttribute('aria-label','Abrir ficha de '+m.name+' en Pharma Pro');card.append(link);cards.append(card);
  }
  section.append(cards);
 }else section.append(elem('p','Sin selección automática de fármacos en este desenlace. Puede requerir cirugía, soporte de órgano, confirmación diagnóstica o tratamiento dependiente de datos aún desconocidos.','alg-therapy-no-drug'));
 const checklist=elem('details',undefined,'alg-therapy-checklist');
 checklist.append(elem('summary','🛡️ Verificación farmacológica obligatoria'));
 const ul=elem('ul');
 for(const txt of [
  'Confirmar edad adulta, diagnóstico/fenotipo, gravedad, peso cuando proceda y vía/indicación específica.',
  'Verificar alergias, anticoagulación, embarazo posible, contraindicaciones, función renal/hepática e interacciones.',
  'Cotejar concentración, dosis, intervalo, ajuste y compatibilidad con protocolo local y ficha autorizada del producto en México.',
  'El catálogo Pharma Pro es orientativo: NO valida automáticamente indicación, dosis, disponibilidad ni una prescripción.'
 ])ul.append(elem('li',txt));checklist.append(ul);section.append(checklist);
 const foot=elem('div',undefined,'alg-therapy-footer');
 foot.append(elem('span','📚 '+plan.sources.map(x=>x.label+' ('+x.year+')').join(' · ')));
 const link=elem('a','Biblioteca Pharma Pro completa ↗','alg-rx-library');link.href='./pharma-pro.html';
 link.target='_blank';link.rel='noopener noreferrer';foot.append(link);section.append(foot);
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
root.KidBumCriticalAlgorithmUI=Object.freeze({
 open,close,back,restart,setMode,getState:()=>({active:state.active,current:state.current,steps:state.path.length,mode:state.mode,category:state.category})
});
})(typeof window!=='undefined'?window:globalThis);
