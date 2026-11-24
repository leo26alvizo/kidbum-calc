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

/* v0.10.48: reciprocidad medicamento → diagnóstico.
   Los vínculos provienen de las rutas documentadas, no de inferencias por clase.
   PRONAM HAS 2026 contiene intervalos de referencia, NO dosis individualizadas.
   La infografía excluye mujeres en edad fértil/embarazo y no sustituye la IPP mexicana.
*/
const HTA_SOURCE='https://pronamsalud.csg.gob.mx/infografia-hipertension-arterial-sistemica.pdf';
const HTA_REGIMENS=Object.freeze({
 amlodipino:['5–10 mg','cada 24 h'],
 enalapril:['10–40 mg','cada 24 h'],
 lisinopril:['10–40 mg','cada 24 h'],
 clortalidona:['12.5–50 mg','cada 24 h'],
 hidroclorotiazida:['12.5–50 mg','cada 24 h'],
 valsartan:['80–320 mg','cada 24 h'],
 telmisartan:['40–80 mg','cada 24 h'],
 olmesartan:['10–40 mg','cada 24 h'],
 bisoprolol:['2.5–20 mg','cada 24 h']
});
const HTA_CONTEXT='Solo referencia general de la infografía PRONAM HAS, 2.ª edición (2026): adultos >20 años en contexto ambulatorio, cuando el protocolo sea aplicable; la infografía excluye mujeres en edad fértil o embarazadas. No es pauta de inicio personalizada ni aplica a urgencia hipertensiva, menores o embarazo. Comprobar formulación, presión arterial, fragilidad, función renal, potasio e interacciones.';
function doseForDrug(id){
 const row=HTA_REGIMENS[id];
 return row?Object.freeze({id,diagnosis:'Hipertensión arterial sistémica',dose:row[0],frequency:row[1],route:'vía oral; confirmar formulación',source:HTA_SOURCE,sourceLabel:'PRONAM México 2026 · infografía oficial',scope:HTA_CONTEXT}):null;
}
function relatedForDrug(id){
 const matches=lib.conditions.filter(c=>c.options.some(o=>o[0]===id)).map(c=>{
  const option=c.options.find(o=>o[0]===id);
  return {id:c.id,name:c.name,tier:option[1],note:option[2],scope:c.scope,source:c.id==='hipertension-arterial'?HTA_SOURCE:c.source,year:c.id==='hipertension-arterial'?'PRONAM México 2026':c.year};
 });
 if(doseForDrug(id)&&!matches.some(c=>c.id==='hipertension-arterial')){
  matches.unshift({id:'hipertension-arterial',name:'Hipertensión arterial sistémica',tier:'Tabla de antihipertensivos PRONAM',note:'Referencia de dosis exclusivamente para la indicación y población descritas.',scope:HTA_CONTEXT,source:HTA_SOURCE,year:'PRONAM México 2026'});
 }
 return matches;
}
function renderForDrug(id){
 const med=lib.byId[id];if(!med)return null;
 const container=node('section',undefined,'pharma-drug-indications');
 container.setAttribute('aria-label','Indicaciones por diagnóstico y esquemas de '+med.name);
 container.append(node('h3','🩺 ¿En qué diagnósticos se utiliza?'));
 const matches=relatedForDrug(id);
 const therapeutic=root.KidBumTherapeuticLinesUI?.render(id);
 if(therapeutic)container.append(therapeutic);
 else if(matches.length){
  const list=node('div',undefined,'pharma-drug-diagnoses');
  for(const d of matches){
   const item=node('article',undefined,'pharma-drug-diagnosis');
   item.append(node('strong',d.name),node('p',d.tier+' · '+d.note,'small'));
   item.append(node('p','Aplicabilidad: '+d.scope,'small muted'),link(d.source,d.year+' · consultar criterios de guía'));
   list.append(item);
  }
  container.append(list);
 }else{
  container.append(node('p','Todavía no hay una relación medicamento–diagnóstico cotejada individualmente para esta entrada. No significa que carezca de indicaciones clínicas.','pharma-indication-pending'));
  container.append(node('p','Descripción del índice (NO equivale a indicación autorizada): '+med.use,'small muted'));
 }
 /* Catálogo editorial completo: todos los medicamentos cuentan con al menos
    un diagnóstico o contexto clínico, sin afirmar validación por ficha o uso en México. */
 const editorial=root.KidBumPharmaDiagnosisCatalog?.related(id)||[];
 if(!therapeutic&&editorial.length){
  const section=node('div',undefined,'pharma-orientative-wrap');
  section.append(node('h4','Diagnósticos o motivos de uso asociados · revisión pendiente'));
  section.append(node('p','Relaciones clínicas editoriales para orientar la búsqueda. NO son indicaciones aprobadas ni confirman que este medicamento sea preferible, seguro o esté disponible para este diagnóstico en México.','small muted'));
  const list=node('ul',undefined,'pharma-orientative-list');
  for(const item of editorial)list.append(node('li',item.name));
  section.append(list,node('p','Para las intervenciones de anestesia, anticoncepción o diagnósticos por procedimientos se indica el motivo clínico de uso; no necesariamente una enfermedad. Confirmar producto, población, contraindicaciones y guía antes de usar.','small muted'));
  container.append(section);
 }else if(!therapeutic){
  container.append(node('p','⚠ Asociación de uso clínico ausente; requiere corrección editorial.','pharma-indication-pending'));
 }
 const dose=node('div',undefined,'pharma-drug-dose');
 dose.append(node('h3','💊 Dosis y esquemas por diagnóstico'));
 const verified=doseForDrug(id);
 const mono=root.KidBumPharmaMonographs?.byId?.[id];
 if(verified){
  dose.append(node('strong',verified.diagnosis+' · '+verified.sourceLabel));
  dose.append(node('p','Intervalo de referencia: '+verified.dose+' por '+verified.route+' · '+verified.frequency+'.','pharma-dose-value'));
  dose.append(node('p',verified.scope,'small muted'));
  dose.append(link(verified.source,'Ver tabla original de dosis PRONAM 2026'));
  if(mono)dose.append(node('p','Existen además referencias parciales específicas de etiquetado estadounidense en la ficha completa; requieren sus propias verificaciones.','small muted'));
 }else if(mono){
  dose.append(node('p','Existen '+mono.regimens.length+' referencia(s) posológica(s) parciales de una etiqueta estadounidense. Para verlas, abre la ficha completa, selecciona indicación, población, vía y responde los controles de seguridad obligatorios.','pharma-indication-pending'));
 }else{
  dose.append(node('p','Esquema NO cotejado: faltan dosis, vía, frecuencia, duración y ajustes específicos de una formulación e indicación. No se estima una pauta a partir de la clase farmacológica.','pharma-indication-pending'));
 }
 dose.append(node('p','Para toda pauta: validar edad/peso, diagnóstico, alergias, embarazo, función renal/hepática, interacciones, presentación y protocolo institucional. Una referencia poblacional no equivale a prescripción.','small muted'));
 container.append(dose);
 const references=node('div',undefined,'pharma-drug-source-search');
 references.append(link('https://registros.cofepris.gob.mx/BRSDM/default.aspx','COFEPRIS · buscar presentación autorizada en México'));
 references.append(link('https://dailymed.nlm.nih.gov/dailymed/search.cfm?query='+encodeURIComponent(med.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'')),'DailyMed · buscar etiquetas específicas (EE. UU.)'));
 references.append(node('p','Los enlaces de búsqueda NO son cotejos individuales: elegir principio activo, vía, concentración y marca antes de usar información de la etiqueta.','small muted'));
 container.append(references);
 return container;
}

let selected='',openDrug=()=>{};
function viewConditions(){
 const results=$('disease-results');results.replaceChildren();
 const query=$('disease-search').value.trim();
 const population=$('disease-pop').value;
 const conditions=lib.searchConditions(query);
 $('disease-count').textContent=conditions.length+' escenarios con fuente clínica disponibles · ámbito de estas rutas: adultos no embarazados.';
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
  return relatedForDrug(id).map(d=>({id:d.id,name:d.name,source:d.source}));
 },
 doseForDrug,
 relatedForDrug,
 renderForDrug
});
})(typeof window!=='undefined'?window:globalThis);
