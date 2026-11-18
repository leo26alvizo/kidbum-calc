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
 const matches=engine.search(state.query,state.category);
 $('alg-count').textContent=matches.length+' de '+engine.algorithms.length+' disponibles';
 $('alg-grid').replaceChildren();
 for(const a of matches){
  const b=elem('button',undefined,'alg-tile');b.type='button';b.dataset.algoId=a.id;
  b.setAttribute('aria-label','Abrir algoritmo '+a.title);
  const top=elem('span',undefined,'alg-tile-top');
  top.append(elem('span',a.icon,'alg-tile-icon'),elem('span',a.time,'alg-tile-tag'));
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
 const max=state.active==='sepsis'?3:4;
 const completed=Math.min(max,state.path.length+(step?.kind==='outcome'?1:0)+1);
 const rail=$('alg-rail');rail.replaceChildren();
 for(let i=0;i<max;i++)rail.append(elem('span',undefined,i<completed?'active':''));
 rail.setAttribute('aria-label','Avance: '+Math.min(state.path.length+1,max)+' de '+max+' etapas aproximadas');
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
