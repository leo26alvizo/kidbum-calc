/* KidBum Urgencias/UCI 0.10.56 · adult-only accessible rapid clinical flow */
(function(root){
'use strict';
const engine=root.KidBumNeuroAlgorithms;
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
const CLINICAL_TOOLS=Object.freeze({"evc":[["NIHSS y escalas neurológicas","./index.html?especialidad=neurologia"]],"ait":[["ABCD² · LEO MED","./index.html?especialidad=neurologia"]],"hsa":[["WFNS","./neurologia.html#neuro-wfns"],["Fisher modificada","./neurologia.html#neuro-mfisher"]],"status":[["STESS","./neurologia.html#neuro-stess"]],"meningitis":[["Glucosa LCR/sangre","./neurologia.html#neuro-csfratio"]],"gbs":[["MRC","./neurologia.html#neuro-mrc"],["Hughes","./neurologia.html#neuro-gbs"]],"tce":[["FOUR","./neurologia.html#neuro-four"],["PPC","./neurologia.html#neuro-cpp"]],"trauma-medular":[["TLICS","./ortopedia.html#ort-tlics"],["SLIC","./ortopedia.html#ort-slic"]],"mielopatia":[["Nurick","./neurologia.html#neuro-nurick"]]});
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
 const a=Object.hasOwn(engine.byId,id)?engine.byId[id]:null;
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
function renderPharma(id,outcome){const p=root.KidBumNeuroPharmaBridge?.get(id,outcome);if(!p||(!p.drugs.length&&!p.note))return null;const panel=elem('section',undefined,'neuro-pharma-panel');panel.append(elem('h3','💊 Pharma PRO · consulta contextual'),elem('p','No es prescripción. Validar indicación, dosis, presentación, vía, alergias, función renal/hepática, interacciones y monitorización. Alternativas no son combinaciones. No retrasar atención para consultar fichas.'));
for(const d of p.drugs){const item=elem('article',undefined,'neuro-pharma-item');item.append(elem('strong',d.name),elem('small',d.role),elem('p',d.context));const a=elem('a','Consultar ficha en Pharma PRO →','alg-tool-link');a.href=d.href;a.target='_blank';a.rel='noopener noreferrer';item.append(a);panel.append(item);}if(p.note)panel.append(elem('p',p.note));return panel;}
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
  const pharma=renderPharma(a.id,step.id);if(pharma)area.append(pharma);
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
 let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch(e){}
 if(engine.byId[id]){if(state.active!==id)open(id);}
 else if(state.active)close();
});
let initial='';try{initial=decodeURIComponent(location.hash.slice(1));}catch(e){}
if(engine.byId[initial])open(initial);
else renderLibrary();
root.KidBumNeuroAlgorithmUI=Object.freeze({
 open,close,back,restart,setMode,getState:()=>({active:state.active,current:state.current,steps:state.path.length,mode:state.mode,category:state.category})
});
})(typeof window!=='undefined'?window:globalThis);
