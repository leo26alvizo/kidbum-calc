/* LEO MED Oftalmología · iconografía clínica local, sin cambios de decisiones. */
(function(root){
'use strict';
const engine=root.KidBumOphthalmologyAlgorithms;
if(!engine||!root.document)return;
const $=id=>document.getElementById(id);
if(!$('alg-grid')||!$('alg-interaction'))return;
const elem=(tag,content,cls)=>{
 const el=document.createElement(tag);
 if(content!==undefined)el.textContent=content;
 if(cls)el.className=cls;
 return el;
};
const ophthalmicIcons=Object.freeze({"ojo-rojo":"👁️","perdida-visual":"🌑","quemadura-quimica":"🧪","globo-abierto":"🛡️","glaucoma-agudo":"⏱️","queratitis":"🔬","uveitis":"🔥","retina":"⚡","occlusion-arterial":"🩸","arteritis":"🧠","celulitis-orbitaria":"🦠","compartimento-orbitario":"⚠️","endoftalmitis":"💉","diplopia":"👀","hifema":"💧","retinopatia-diabetica":"📈","conjuntivitis":"🌿","orzuelo-chalazion-blefaritis":"🧿","ojo-seco":"🏜️","abrasion-corneal":"🩹","hemorragia-subconjuntival":"🟥","dacriocistitis-obstruccion-lagrimal":"🫧","pterigion-pinguecula":"☀️"});
const iconFor=a=>Object.hasOwn(ophthalmicIcons,a.id)?ophthalmicIcons[a.id]:'👁️';
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
  const icon=elem('span',iconFor(a),'alg-tile-icon');icon.setAttribute('aria-hidden','true');
  top.append(icon,elem('span',(a.urgency==='crítica'?'🚨 ':'')+a.time,'alg-tile-tag'));
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
function pharmaLink(label,href,cls){const a=elem('a',label,cls);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a;}
function renderTools(id){const panel=$('alg-tools');panel.replaceChildren();const a=elem('a','Calculadoras y escalas de Oftalmología →','alg-tool-link');a.href='./index.html?especialidad=oftalmologia';panel.append(a,pharmaLink('💊 Biblioteca Pharma PRO ↗','./pharma-pro.html','alg-tool-link'));panel.hidden=false;}
function renderTreatment(a,step){
 const plan=root.KidBumOphthalmologyPharmaBridge?.get(a.id,step.id);
 const section=elem('section',undefined,'alg-therapy oph-therapy');
 const head=elem('div',undefined,'alg-therapy-head');
 head.append(elem('h3','💊 Farmacología · Pharma PRO'),elem('span','Consulta educativa','alg-therapy-branch'));section.append(head);
 section.append(elem('p',plan?.notes||'La selección terapéutica requiere valoración individual.','alg-therapy-context'));
 section.append(elem('p','La ficha general no valida indicación, vía, concentración, dosis ni registro mexicano para este desenlace. No es una receta.','alg-therapy-purpose'));
 if(plan?.drugs.length){
  const cards=elem('div',undefined,'alg-therapy-medications');
  for(const m of plan.drugs){
   const card=elem('article',undefined,'alg-therapy-med');
   card.append(elem('span',m.route,'alg-rx-role'),elem('strong',m.name,'alg-rx-name'),elem('p',m.context,'alg-rx-context'));
   if(m.route.includes('Intravítrea'))card.append(elem('span','⚠ Vía especializada · no extrapolar ficha sistémica','alg-rx-warning'));
   card.append(elem('span','Ficha de referencia · dosis no validada','alg-rx-tag'),pharmaLink('Abrir ficha en Pharma PRO ↗',m.href,'alg-rx-link'),pharmaLink('Fuente: '+m.source[0],m.source[1],'alg-rx-library'));cards.append(card);
  }
  section.append(cards);
 }else section.append(elem('p','Sin selección de fármacos para este desenlace. Priorizar exploración, escalamiento o intervención; consulta libre de la biblioteca.','alg-therapy-no-drug'));
 const details=elem('details',undefined,'alg-therapy-checklist');details.append(elem('summary','🛡️ Verificación farmacológica obligatoria'));
 const ul=elem('ul');for(const t of ['Confirmar diagnóstico, edad, peso si procede, alergias, embarazo, contraindicaciones, función renal/hepática e interacciones.','Confirmar vía ocular, sistémica o intravítrea, presentación, concentración y pauta en protocolo local y ficha autorizada en México.','No retrasar irrigación, traslado, descompresión o intervención urgente por consultar la biblioteca. Revisión clínica independiente pendiente.'])ul.append(elem('li',t));details.append(ul);section.append(details);
 const foot=elem('div',undefined,'alg-therapy-footer');foot.append(pharmaLink('Biblioteca Pharma PRO completa ↗','./pharma-pro.html','alg-rx-library'));section.append(foot);return section;
}
function open(id){
 const a=Object.hasOwn(engine.byId,id)?engine.byId[id]:null;
 if(!a)return false;
 state.active=id;state.current=a.start;state.path=[];
 $('alg-flow-icon').textContent=iconFor(a);
 $('alg-flow-title').textContent=a.title;
 $('alg-flow-subtitle').textContent=a.subtitle;
 const refs=$('alg-evidence-content');refs.replaceChildren();
 refs.append(elem('p','Ámbito: '+a.scope));
 const ul=elem('ul');
 for(const s of a.sources){
  const li=elem('li'),link=elem('a',s.label+' · '+s.year);
  link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';li.append(link);ul.append(li);
 }
 refs.append(ul,elem('p','Fuentes de orientación clínica; no certifican adopción institucional en México. Revisión clínica independiente pendiente. No constituye prescripción.'));
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
 const max=Math.max(3,Object.keys(engine.byId[state.active].nodes).length+1);
 const completed=step?.kind==='outcome'?max:Math.min(max,state.path.length+1);
 const rail=$('alg-rail');rail.replaceChildren();
 for(let i=0;i<max;i++)rail.append(elem('span',undefined,i<completed?'active':''));
 rail.setAttribute('aria-label',step?.kind==='outcome'?'Ruta completada':'Avance: '+Math.min(state.path.length+1,max)+' de '+max+' etapas máximas aproximadas');
}
function renderFlow(){
 const a=engine.byId[state.active],step=engine.getStep(state.active,state.current);
 if(!a||!step)return;
 const area=$('alg-interaction');area.replaceChildren();
 renderRail();
 if(a.initial){const urgent=elem('div',a.initial,'alg-alert');urgent.setAttribute('role','note');area.append(urgent);}
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
  area.append(wrap,renderTreatment(a,step));
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
 let id='';try{id=decodeURIComponent(location.hash.slice(1))}catch(e){};
 if(Object.hasOwn(engine.byId,id)){if(state.active!==id)open(id);}
 else if(state.active)close();
});
let initial='';try{initial=decodeURIComponent(location.hash.slice(1))}catch(e){};
if(Object.hasOwn(engine.byId,initial))open(initial);
else renderLibrary();
root.KidBumOphthalmologyAlgorithmUI=Object.freeze({
 open,close,back,restart,setMode,getState:()=>({active:state.active,current:state.current,steps:state.path.length,mode:state.mode,category:state.category})
});
})(typeof window!=='undefined'?window:globalThis);
