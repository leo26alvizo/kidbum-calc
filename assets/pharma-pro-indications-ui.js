(function(root){
'use strict';
/* Disease → therapeutics crosswalk. Guideline orientation only.
   Never prescribes, doses, ranks for a patient, or accepts identifiable data.
*/
const $=id=>document.getElementById(id);
const lib=root.KidBumPharmaCore;
if(!lib||!$('disease-results'))return;
const node=(tag,text,cls)=>{
 const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;
};
const link=(href,label)=>{const a=node('a',label+' ↗');a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a;};
let selected='',openDrug=()=>{};
function viewConditions(){
 const results=$('disease-results');results.replaceChildren();
 const query=$('disease-search').value.trim();
 const population=$('disease-pop').value;
 const conditions=lib.searchConditions(query);
 $('disease-count').textContent=conditions.length+' indicaciones verificadas disponibles · ámbito de estas rutas: adultos no embarazados.';
 if(!conditions.length){
  results.append(node('div','No encontramos una ruta respaldada para esa enfermedad. NO significa que no existan tratamientos. Busca en el catálogo de medicamentos o consulta una guía clínica vigente.','empty'));return;
 }
 for(const d of conditions){
  const wrapper=node('article',undefined,'disease-card');
  const top=node('div',undefined,'disease-top');
  const name=node('h3',d.name);
  const button=node('button',selected===d.id?'Ocultar detalles':'Ver opciones según guía →','db-btn');
  button.type='button';button.setAttribute('aria-expanded',String(selected===d.id));
  button.setAttribute('aria-label','Ver opciones para '+d.name);
  button.onclick=()=>{selected=selected===d.id?'':d.id;viewConditions();};
  top.append(name,button);wrapper.append(top);
  wrapper.append(node('p',d.scope,'small muted'));
  if(selected===d.id){
   const active=node('div',undefined,'disease-expanded');
   if(population!=='adult'){
    active.append(node('div','No se muestran opciones para pediatría, neonatología, embarazo ni pacientes con diagnóstico no confirmado. Estas rutas sólo se verificaron para el contexto adulto específico.','pending'));
    active.append(link(d.source,d.year+' · fuente clínica'));
   }else{
    const alert=node('div',undefined,'disease-alert');alert.append(node('strong','Contexto exacto de la recomendación'));alert.append(node('p',d.scope));active.append(alert);
    const flags=node('div',undefined,'disease-danger');flags.append(node('strong','Signos de alarma / situaciones excluidas'));flags.append(node('p',d.redFlags));active.append(flags);
    const factors=node('div',undefined,'fact');factors.append(node('h4','Antes de elegir, verificar:'));const ul=node('ul');for(const f of d.factors)ul.append(node('li',f));factors.append(ul);active.append(factors);
    active.append(node('h4','Medicamentos asociados a este escenario en la guía · no constituyen una prescripción'));
    const list=node('div',undefined,'disease-options');
    for(const [id,tier,note] of d.options){
     const med=lib.byId[id];if(!med)continue;
     const card=node('article',undefined,'disease-option');
     const lbl=node('div',tier,'disease-tier'),label=node('div',undefined,'disease-med-title');
     label.append(node('strong',med.name));
     if(med.highRisk)label.append(node('span','⚠ Alto riesgo'+(med.highRiskScope?' ('+med.highRiskScope+')':''),'pill warn'));
     if(med.lasaPairs.length)label.append(node('span','LASA · nombre confuso','pill lasa'));
     card.append(lbl,label,node('p',note,'small muted'));
     const more=node('button','Ver ficha farmacológica →','db-btn');more.type='button';more.onclick=()=>openDrug(id);card.append(more);list.append(card);
    }
    active.append(list);
    const source=node('div',undefined,'disease-reference');source.append(link(d.source,d.year));source.append(node('p','Las guías pertenecen a la jurisdicción indicada; verificar PRONAM, disponibilidad, resistencias y protocolos mexicanos. Opciones no se ordenan para un paciente concreto.','small muted'));active.append(source);
   }
   wrapper.append(active);
  }
  results.append(wrapper);
 }
}
root.KidBumPharmaIndicationsUI=Object.freeze({
 mount(onOpenDrug){
  openDrug=onOpenDrug;
  $('disease-search').addEventListener('input',()=>{selected='';viewConditions();});
  $('disease-pop').addEventListener('change',viewConditions);
  viewConditions();
 },
 openCondition(id){
  const target=lib.conditions.find(x=>x.id===id);
  if(!target)return false;
  selected=id;
  $('disease-search').value=target.name;
  viewConditions();
  const header=$('disease-finder');
  if(header)header.scrollIntoView({behavior:'smooth',block:'start'});
  return true;
 },
  filterByDrug(id){
  const related=lib.conditions.filter(d=>d.options.some(x=>x[0]===id));
  return related.map(d=>({id:d.id,name:d.name,source:d.source}));
 }
});
})(typeof window!=='undefined'?window:globalThis);
