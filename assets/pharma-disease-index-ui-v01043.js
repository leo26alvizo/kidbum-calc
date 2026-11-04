/* KidBum 0.10.43 · Disease taxonomy explorer, no therapeutic inference. */
(function(root){
'use strict';
const source=root.KidBumPharmaExpansionIndex;
const pane=document.getElementById('pharma-disease-index');
const hiddenSearch=document.getElementById('disease-search');
if(!source||!pane||!hiddenSearch)return;
const $=sel=>pane.querySelector(sel);
const create=(tag,text,cls)=>{
 const el=document.createElement(tag);if(text!==undefined)el.textContent=text;
 if(cls)el.className=cls;return el;
};
const group=$('#pharma-index-category'),cards=$('#pharma-index-results'),more=$('#pharma-index-more'),counter=$('#pharma-index-counter');
const selected={id:null};
let limit=24;
const categories=[...new Set(source.diseases.map(x=>x.category))].sort((a,b)=>a.localeCompare(b,'es'));
for(const label of categories){
 const o=create('option',label);o.value=label;group.append(o);
}
function makeCard(entry){
 const article=create('article',undefined,'pharma-index-card');
 article.dataset.topicId=entry.id;
 const header=create('div',undefined,'pharma-index-card-head');
 header.append(create('strong',entry.name),create('span','Índice · sin guía cotejada','pharma-index-status'));
 const about=create('button',selected.id===entry.id?'Cerrar':'Ver contexto');
 about.type='button';about.setAttribute('aria-expanded',String(selected.id===entry.id));
 about.setAttribute('aria-label','Ver detalles de '+entry.name);
 about.onclick=()=>{selected.id=selected.id===entry.id?null:entry.id;render();};
 article.append(header,create('p',entry.category,'pharma-index-category'),about);
 if(selected.id===entry.id){
  const details=create('div',undefined,'pharma-index-description');
  details.append(create('p','Entrada para búsqueda temática. No confirma criterios diagnósticos, gravedad, equivalencia con códigos CIE-11, medicamentos ni esquemas de tratamiento.'));
  details.append(create('p','Antes de decidir, revisar guías mexicanas actuales, contexto del paciente, signos de alarma y referencias del diagnóstico específico.'));
  const a=create('a','Clasificación Internacional de Enfermedades (OMS) ↗');
  a.href=source.sourceReferences.icd;a.target='_blank';a.rel='noopener noreferrer';
  details.append(a);
  article.append(details);
 }
 return article;
}
function render(){
 const query=hiddenSearch.value;
 const matches=source.searchDiseases(query,group.value);
 counter.textContent=matches.length+' temas del índice clínico · '+source.diseases.length+' disponibles. No son rutas terapéuticas validadas.';
 cards.replaceChildren();
 for(const d of matches.slice(0,limit))cards.append(makeCard(d));
 if(matches.length===0)cards.append(create('p','No hay temas con esta búsqueda. Esto no descarta ningún diagnóstico.','pharma-index-empty'));
 more.hidden=matches.length<=limit;more.textContent='Mostrar siguientes '+Math.min(24,matches.length-limit)+' temas';
}
hiddenSearch.addEventListener('input',()=>{limit=24;selected.id=null;render();});
group.addEventListener('change',()=>{limit=24;selected.id=null;render();});
more.addEventListener('click',()=>{limit+=24;render();});
function openDisease(id){
 const target=source.diseases.find(x=>x.id===id);
 if(!target)return false;
 group.value='all';limit=24;selected.id=target.id;
 hiddenSearch.value=target.name;
 hiddenSearch.dispatchEvent(new Event('input',{bubbles:true}));
 selected.id=target.id;render();
 const q=document.getElementById('quick-search');
 if(q){q.value=target.name;q.dispatchEvent(new Event('input',{bubbles:true}));}
 selected.id=target.id;render();
 pane.scrollIntoView({behavior:'smooth',block:'start'});
 return true;
}
// Public status is derived from actual loaded catalog, not from static release marketing.
const coverage=document.getElementById('pharma-coverage');
const lib=root.KidBumPharmaCore,mono=root.KidBumPharmaMonographs;
if(coverage&&lib&&mono){
 const partial=mono.coverage?.labelChecked??mono.records.length;
 const approved=mono.coverage?.clinicallyApproved??0;
 const strong=create('strong','Cobertura real de la biblioteca: ');
 const copy=document.createTextNode(lib.records.length+' entradas de búsqueda, '+partial+' fichas con cotejo parcial US, '+(lib.records.length-partial)+' sin cotejo de etiqueta, '+approved+' con aprobación clínica/farmacéutica independiente registrada. Las nuevas entradas NO tienen dosis ni categoría ISMP cotejadas.');
 coverage.replaceChildren(strong,copy);
}
render();
root.KidBumPharmaIndexUI=Object.freeze({openDisease,render});
})(typeof window!=='undefined'?window:globalThis);
