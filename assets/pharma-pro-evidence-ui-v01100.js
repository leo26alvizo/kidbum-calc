(function(root){
'use strict';
const evidence=root.KidBumPharmaEvidence,library=root.KidBumPharmaCore,monographs=root.KidBumPharmaMonographs;
if(!evidence||!library)return;
const el=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
const official='https://registros.cofepris.gob.mx/BRSDM/default.aspx';
const sourceLink=(url,text)=>{const link=el('a',text);link.href=url;link.rel='noopener noreferrer';link.target='_blank';return link;};
function lineList(container,title,items){
 const h=el('h4',title);container.append(h);
 const ul=el('ul');
 for(const item of items){ul.append(el('li',item));}
 container.append(ul);
}
function renderReview(id){
 const d=evidence.byId[id];if(!d)return null;
 const card=el('section',undefined,'pharma-evidence-dossier');
 card.setAttribute('aria-label','Cotejo de seguridad de '+d.name);
 card.append(el('h3','Ficha de seguridad por presentación · '+d.name));
 card.append(el('div',d.status,'pharma-evidence-grade'));
 card.append(el('p',d.jurisdiction+' · Revisada el '+d.reviewedAt+'.','small muted'));
 const warning=el('div','SIN pauta posológica habilitada en esta ficha. No valida equivalencia mexicana, compatibilidad IV, uso pediátrico ni autorización clínica independiente.','pharma-evidence-caution');
 card.append(warning);
 card.append(el('p','Presentación del etiquetado: '+d.formulation));
 lineList(card,'Indicaciones descritas en ESTA etiqueta',d.indications);
 lineList(card,'Contraindicaciones y señales de seguridad',d.cautions);
 lineList(card,'Interacciones específicas que requieren revisión',d.interactions);
 lineList(card,'Vigilancia clínica y laboratorio',d.monitoring);
 card.append(el('h4','Función renal / hepática y límites de ajuste'));
 card.append(el('p',d.adjustment));
 card.append(el('h4','Embarazo y lactancia'));
 card.append(el('p',d.pregnancy));
 const refs=el('div',undefined,'refs');
 refs.append(sourceLink(d.source.url,'Etiqueta íntegra DailyMed · '+d.source.title+' · versión '+d.source.version+' · publicada '+d.source.published));
 refs.append(sourceLink(official,'COFEPRIS · buscar registro, presentación e información mexicana'));
 card.append(refs);
 card.append(el('p','Secciones cotejadas: '+d.source.sections.join(' · ')+'. Esta revisión es parcial y no evalúa exhaustivamente el resto del documento.','small muted'));
 return card;
}
function renderPriorityNotice(id){
 if(!evidence.priorityIds.includes(id))return null;
 const state=evidence.state(id,monographs);
 if(state==='source-dose-partial'){
  const m=monographs.byId[id],card=el('section',undefined,'pharma-evidence-dossier');
  card.append(el('h3','Trazabilidad de la ficha · '+m.name));
  card.append(el('div','Etiqueta US · pauta documental parcial condicionada por verificaciones','pharma-evidence-grade'));
  card.append(el('p','La referencia posológica ya existente está disponible SOLO en la sección de verificaciones obligatorias. No existe aprobación clínica/farmacéutica independiente ni registro mexicano confirmado.'));
  card.append(sourceLink(m.source.url,'Consultar fuente original · '+m.source.title));
  card.append(el('p','Producto y vía específicos; no extrapolar a embarazo, neonatos, concentraciones distintas o indicaciones ausentes.','small muted'));
  return card;
 }
 if(state==='source-safety-only')return renderReview(id);
 const item=library.byId[id],card=el('section',undefined,'pharma-evidence-dossier');
 card.append(el('h3','Priorizada para revisión · '+(item?.name||id)));
 card.append(el('div','NO COTEJADA · no presentar dosis o dilución como validada','pharma-evidence-grade'));
 card.append(el('p','Esta entrada está en la lista editorial de 40 medicamentos prioritarios, pero no dispone de una nueva revisión documental individual en esta fase. El nombre no implica indicación autorizada ni ausencia de riesgos.'));
 card.append(sourceLink(official,'Comprobar presentación/registro COFEPRIS'));
 return card;
}
function mountDashboard(){
 const host=document.getElementById('pharma-evidence-board');if(!host)return;
 const coverage=evidence.summary(library,monographs);
 const title=el('div',undefined,'section-title');
 title.append(el('div','Pharma Pro 2.0 · seguimiento de evidencia','eyebrow'),el('h2','40 medicamentos prioritarios · revisión por etapas'));
 title.append(el('p','Fuentes específicas, presentación y riesgos antes que cantidad. Una ficha revisada documentalmente NO es una monografía clínicamente aprobada ni una autorización para prescribir.'));
 host.append(title);
 const metrics=el('div',undefined,'pharma-evidence-summary');
 for(const [value,label] of [[coverage.priority,'Prioritarios seleccionados'],[coverage.scopedDose,'Cotejos previos con pautas condicionadas'],[coverage.sourceSafety,'Nuevas fichas de seguridad sin dosis'],[coverage.pending,'Prioritarios aún pendientes']]){
  const box=el('div',undefined,'pharma-evidence-stat');box.append(el('strong',String(value)),el('span',label));metrics.append(box);
 }
 host.append(metrics);
 const note=el('p',coverage.sourceChecked+' de '+coverage.priority+' con algún cotejo documental específico; '+coverage.fullyApproved+' con validación clínica independiente y '+coverage.mexicanConfirmed+' con producto mexicano confirmado. En el catálogo general hay '+coverage.totalIndex+' entradas. No son equivalentes las distintas etapas de revisión.','small');
 host.append(note);
 const links=el('p',undefined,'small');
 links.append(sourceLink(official,'Visor de registros COFEPRIS'),document.createTextNode(' · '),
 sourceLink('https://pronamsalud.csg.gob.mx/','PRONAM México · protocolos por enfermedad'));
 host.append(links);
 const filters=el('div',undefined,'pharma-evidence-filters');
 filters.setAttribute('role','group');filters.setAttribute('aria-label','Filtrar fichas prioritarias por estado de revisión');
 const labels=[['all','Los 40'],['source-dose-partial','9 cotejos posológicos parciales'],['source-safety-only','6 revisiones de seguridad'],['priority-pending','Pendientes']];
 let selected='all';
 const list=el('div',undefined,'pharma-evidence-list');list.id='pharma-evidence-list';
 const count=el('p',undefined,'small muted');count.id='pharma-evidence-count';count.setAttribute('aria-live','polite');
 function draw(){
  list.replaceChildren();
  for(const b of filters.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.filter===selected));
  const visible=evidence.priorityIds.filter(id=>library.byId[id]&&(selected==='all'||evidence.state(id,monographs)===selected));
  count.textContent=visible.length+' de '+coverage.priority+' medicamentos prioritarios';
  for(const id of visible){
   const med=library.byId[id],status=evidence.state(id,monographs),item=el('article',undefined,'pharma-evidence-item');
   const label=el('div');label.append(el('strong',med.name),el('small',status==='source-dose-partial'?'Pauta parcial etiquetada · exige verificaciones':status==='source-safety-only'?'Seguridad cotejada · NO hay dosis': 'Pendiente de cotejo individual'));
   const open=el('button','Consultar');open.type='button';open.setAttribute('aria-label','Abrir ficha de '+med.name);
   open.onclick=()=>{if(root.KidBumPharmaUI?.openDrug)root.KidBumPharmaUI.openDrug(id);else root.location.hash=id;};
   item.append(label,open);list.append(item);
  }
 }
 for(const [id,name]of labels){const b=el('button',name);b.type='button';b.dataset.filter=id;b.setAttribute('aria-pressed','false');b.onclick=()=>{selected=id;draw();};filters.append(b);}
 const expandable=el('details',undefined,'pharma-evidence-list-wrap');
 expandable.append(el('summary','Ver los 40 medicamentos prioritarios y filtrar por estado'),filters,count,list);
 host.append(expandable);draw();
}
root.KidBumPharmaEvidenceUI=Object.freeze({renderReview,renderPriorityNotice,mountDashboard});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountDashboard,{once:true});
else mountDashboard();
})(typeof window!=='undefined'?window:globalThis);
