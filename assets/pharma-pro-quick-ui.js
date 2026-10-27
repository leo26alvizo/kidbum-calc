(function(root){
'use strict';
/* Mobile-first search/navigation: one input, two catalogues, zero patient data. */
const lib=root.KidBumPharmaCore;
const UI=root.KidBumPharmaUI;
if(!lib||!UI||!document.getElementById('quick-search'))return;
const $=id=>document.getElementById(id);
const quick=$('quick-search'),suggestions=$('quick-suggestions'),clear=$('quick-clear');
const tabs=[...document.querySelectorAll('[data-pharma-view]')];
const state={view:'drugs',history:{drugs:'',diseases:''},drugDetail:false};
const node=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x;};
function dispatch(id,value){
 const input=$(id);if(!input)return;input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));
}
function hideSuggestions(){suggestions.replaceChildren();suggestions.classList.add('hidden');quick.setAttribute('aria-expanded','false');}
function currentItems(){
 const q=quick.value.trim();if(!q)return [];
 if(state.view==='drugs')return lib.search(q,'all','all',false).slice(0,7).map(x=>({id:x.id,label:x.name,info:x.group+(x.highRisk?' · ⚠ Alto riesgo':'')+(x.lasaPairs.length?' · LASA':''),kind:'drug'}));
 if(state.view==='diseases')return lib.searchConditions(q).slice(0,7).map(x=>({id:x.id,label:x.name,info:'Ruta de guía · adultos',kind:'disease'}));
 return [];
}
function openItem(item){
 hideSuggestions();
 if(item.kind==='drug'){root.KidBumPharmaUI.openDrug(item.id);}
 else if(root.KidBumPharmaIndicationsUI?.openCondition)root.KidBumPharmaIndicationsUI.openCondition(item.id);
}
function fillSuggestions(){
 const items=currentItems();
 suggestions.replaceChildren();
 if(!quick.value.trim()||state.view==='safety'){hideSuggestions();return;}
 if(!items.length){const p=node('p','Sin coincidencias verificadas. Revisa el nombre o la indicación.','small muted');suggestions.append(p);}
 for(const item of items){
  const b=node('button');b.type='button';
  b.append(node('strong',item.label),node('small',item.info));
  b.onclick=()=>openItem(item);
  suggestions.append(b);
 }
 suggestions.classList.remove('hidden');
 quick.setAttribute('aria-expanded','true');
}
function sectionVisibility(){
 const detailVisible=state.drugDetail;
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
 if(state.drugDetail){history.replaceState(null,'',location.pathname+location.search);state.drugDetail=false;}
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
 if(e.key==='Escape'){hideSuggestions();quick.blur();}
 if(e.key==='Enter'&&currentItems().length){e.preventDefault();openItem(currentItems()[0]);}
});
clear.onclick=()=>{quick.value='';quick.dispatchEvent(new Event('input'));quick.focus();};
document.querySelectorAll('[data-quick-disease]').forEach(b=>b.onclick=()=>{
 display('diseases');quick.value=b.dataset.quickDisease;quick.dispatchEvent(new Event('input'));quick.focus();
});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('.pharma-fast-search'))hideSuggestions();});
root.KidBumPharmaQuick=Object.freeze({
 onDrugOpen(){
  state.drugDetail=true;
  sectionVisibility();hideSuggestions();
 },
 onDrugClose(){
  state.drugDetail=false;
  sectionVisibility();
 }
});
/* The original page invokes showDrug once on initial hash; respect deep links. */
display('drugs');
if(location.hash&&lib.byId[decodeURIComponent(location.hash.slice(1))]){
 state.drugDetail=true;sectionVisibility();
}
})(typeof window!=='undefined'?window:globalThis);
