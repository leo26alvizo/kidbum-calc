(function(root){
'use strict';
/* Mobile-first search/navigation: one input, two catalogues, zero patient data. */
const lib=root.KidBumPharmaCore;
const UI=root.KidBumPharmaUI;
if(!lib||!UI||!document.getElementById('quick-search'))return;
document.documentElement.classList.add('pharma-fast-ready');
const $=id=>document.getElementById(id);
const quick=$('quick-search'),suggestions=$('quick-suggestions'),clear=$('quick-clear');
const tabs=[...document.querySelectorAll('[data-pharma-view]')];
const state={view:'drugs',history:{drugs:'',diseases:''},drugDetail:false};
let activeSuggestion=-1,renderedSuggestions=[];
quick.setAttribute('aria-autocomplete','list');
quick.setAttribute('aria-haspopup','listbox');
suggestions.setAttribute('role','listbox');
const node=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x;};
function dispatch(id,value){
 const input=$(id);if(!input)return;input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));
}
function hideSuggestions(){
 activeSuggestion=-1;renderedSuggestions=[];
 suggestions.replaceChildren();suggestions.classList.add('hidden');
 quick.setAttribute('aria-expanded','false');quick.removeAttribute('aria-activedescendant');
}
function selectSuggestion(index){
 if(!renderedSuggestions.length)return;
 activeSuggestion=(index+renderedSuggestions.length)%renderedSuggestions.length;
 suggestions.querySelectorAll('[role="option"]').forEach((b,i)=>b.setAttribute('aria-selected',String(i===activeSuggestion)));
 quick.setAttribute('aria-activedescendant','pharma-suggest-'+activeSuggestion);
}
function currentItems(){
 const q=quick.value.trim();if(!q)return [];
 if(state.view==='drugs'){
  const matches=[...lib.search(q,'all','all',false)];const directIds=new Set(matches.map(x=>x.id));
  for(const med of root.KidBumPharmaDiagnosisCatalog?.search(q)||[]){
   if(!matches.some(x=>x.id===med.id))matches.push(med);
  }
  return matches.slice(0,7).map(x=>({id:x.id,label:x.name,info:x.group+(x.highRisk?' · ⚠ Alto riesgo':'')+(x.lasaPairs.length?' · LASA':'')+(directIds.has(x.id)?'':' · diagnóstico orientativo'),kind:'drug'}));
 }
 if(state.view==='diseases'){
  const routes=lib.searchConditions(q).slice(0,4).map(x=>({id:x.id,label:x.name,info:'Ruta terapéutica documentada · adultos',kind:'disease'}));
  const topics=(root.KidBumPharmaExpansionIndex?.searchDiseases(q)||[]).slice(0,7-routes.length).map(x=>({id:x.id,label:x.name,info:'Índice clínico · SIN tratamiento cotejado',kind:'topic'}));
  const editorial=(root.KidBumPharmaDiagnosisCatalog?.searchDiagnoses(q)||[])
    .filter(entry=>!routes.some(x=>x.label===entry.name)&&!topics.some(x=>x.label===entry.name))
    .slice(0,Math.max(0,7-routes.length-topics.length))
    .map(x=>({id:x.name,label:x.name,info:x.medicineIds.length+' medicamentos vinculados · índice orientativo SIN validación de tratamiento',kind:'editorial'}));
  return [...routes,...topics,...editorial];
 }
 return [];
}
function openItem(item){
 hideSuggestions();
 if(item.kind==='drug'){root.KidBumPharmaUI.openDrug(item.id);}
 else if(item.kind==='topic')root.KidBumPharmaIndexUI?.openDisease(item.id);
 else if(item.kind==='editorial'){
  quick.value=item.label;state.history.diseases=item.label;
  dispatch('disease-search',item.label);
  $('pharma-dx-catalog')?.scrollIntoView({behavior:'smooth',block:'start'});
 }
 else if(root.KidBumPharmaIndicationsUI?.openCondition)root.KidBumPharmaIndicationsUI.openCondition(item.id);
}
function fillSuggestions(){
 const items=currentItems();
 suggestions.replaceChildren();renderedSuggestions=items;activeSuggestion=-1;quick.removeAttribute('aria-activedescendant');
 if(!quick.value.trim()||state.view==='safety'){hideSuggestions();return;}
 if(!items.length){const p=node('p','Sin coincidencias en los índices. Revisa el nombre o utiliza otras fuentes.','small muted');suggestions.append(p);}
 items.forEach((item,i)=>{
  const b=node('button');b.type='button';b.id='pharma-suggest-'+i;
  b.setAttribute('role','option');b.setAttribute('aria-selected','false');
  b.append(node('strong',item.label),node('small',item.info));
  b.onclick=()=>openItem(item);
  b.onmouseenter=()=>selectSuggestion(i);
  suggestions.append(b);
 });
 suggestions.classList.remove('hidden');
 quick.setAttribute('aria-expanded','true');
}
function sectionVisibility(){
 const detailVisible=state.drugDetail;document.dispatchEvent(new CustomEvent('pharma:view',{detail:{view:state.view,drugDetail:detailVisible}}));
 $('detail').classList.toggle('hidden',!detailVisible);
 $('browse').classList.toggle('hidden',detailVisible||state.view!=='drugs');
 $('disease-finder').classList.toggle('hidden',detailVisible||state.view!=='diseases');
 $('tools').classList.toggle('hidden',detailVisible||state.view!=='safety');
 $('integrations').classList.toggle('hidden',detailVisible||state.view!=='safety');
}
function display(view){
 if(!['drugs','diseases','safety'].includes(view))return;
 state.view=view;
 tabs.forEach(t=>{const active=t.dataset.pharmaView===view;t.classList.toggle('active',active);t.setAttribute('aria-pressed',String(active));});
 $('quick-label').textContent=view==='diseases'?'Buscar enfermedad o diagnóstico':view==='drugs'?'Buscar medicamento, grupo o uso':'Verificador farmacológico';
 quick.placeholder=view==='diseases'?'Ej. gota, migraña, hipotiroidismo…':'Nombre genérico, grupo o uso…';
 $('quick-examples').classList.toggle('hidden',view!=='diseases');
 $('quick-search').closest('.pharma-fast-search').classList.toggle('hidden',view==='safety');
 state.drugDetail=false;
 sectionVisibility();hideSuggestions();
 if(view==='diseases'||view==='drugs')quick.value=state.history[view]||'';
 if(view==='drugs')dispatch('search',quick.value);
 if(view==='diseases')dispatch('disease-search',quick.value);
}
function chooseView(view){
 if(state.drugDetail){history.replaceState(null,'',location.pathname+location.search);UI.closeDrug();state.drugDetail=false;}
 display(view);
 const nav=$('pharma-view-nav');nav.scrollIntoView({behavior:'smooth',block:'start'});
}
tabs.forEach(t=>t.addEventListener('click',()=>chooseView(t.dataset.pharmaView)));
quick.addEventListener('input',()=>{
 state.history[state.view]=quick.value;
 if(state.view==='drugs')dispatch('search',quick.value);
 else if(state.view==='diseases')dispatch('disease-search',quick.value);
 fillSuggestions();
});
quick.addEventListener('keydown',e=>{
 if(e.key==='Escape'){hideSuggestions();quick.blur();return;}
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){
  if(!currentItems().length)return;
  e.preventDefault();
  if(suggestions.classList.contains('hidden'))fillSuggestions();
  selectSuggestion(e.key==='ArrowDown'?activeSuggestion+1:(activeSuggestion===-1?renderedSuggestions.length-1:activeSuggestion-1));
  return;
 }
 if(e.key==='Enter'&&currentItems().length){
  e.preventDefault();openItem(renderedSuggestions[activeSuggestion]||currentItems()[0]);
 }
});
clear.onclick=()=>{quick.value='';quick.dispatchEvent(new Event('input'));quick.focus();};
document.querySelectorAll('[data-quick-disease]').forEach(b=>b.onclick=()=>{
 display('diseases');quick.value=b.dataset.quickDisease;quick.dispatchEvent(new Event('input'));quick.focus();
});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('.pharma-fast-search'))hideSuggestions();});
root.KidBumPharmaQuick=Object.freeze({
 onDrugOpen(id){
  state.drugDetail=true;document.dispatchEvent(new CustomEvent('pharma:drug',{detail:{id}}));
  sectionVisibility();hideSuggestions();
 },
 onDrugClose(){
  state.drugDetail=false;
  sectionVisibility();
 },
 openDisease(id){
  const entry=lib.conditions.find(x=>x.id===id);
  if(!entry)return false;
  history.replaceState(null,'',location.pathname+location.search);
  display('diseases');
  quick.value=entry.name;
  state.history.diseases=entry.name;
  dispatch('disease-search',entry.name);
  const opened=root.KidBumPharmaIndicationsUI?.openCondition?.(id);
  return opened===true;
 }
});
/* The original page invokes showDrug once on initial hash; respect deep links. */
display('drugs');
let initialId='';try{initialId=decodeURIComponent(location.hash.slice(1));}catch(e){}
if(Object.hasOwn(lib.byId,initialId)){
 state.drugDetail=true;sectionVisibility();
}
})(typeof window!=='undefined'?window:globalThis);
