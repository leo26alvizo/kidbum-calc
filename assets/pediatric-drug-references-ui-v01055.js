/* LEO MED · fichas farmacológicas pediátricas v0.10.55
 * UI shared by algorithm outcomes and Pharma Pro detail; no treatment orders.
 */
(function(root){
'use strict';
const db=root.KidBumPediatricDrugReferences;
if(!db||!root.document)return;
const node=(tag,value,cls)=>{const e=document.createElement(tag);if(value!==undefined)e.textContent=String(value);if(cls)e.className=cls;return e;};
function render(id,options={}){
 const record=db.records[id];
 if(!record)return null;
 const algorithm=options.algorithm||null,outcome=options.outcome||null;
 const strict=Boolean(algorithm&&outcome);
 const refs=strict?db.find(id,algorithm,outcome)?.regimens||[]:record.regimens;
 const box=node('section',undefined,'kb-ped-dose'+(options.compact?' compact':''));
 box.dataset.drugId=id;
 box.dataset.context=strict?'specific':'all';
 box.setAttribute('aria-label','Pautas pediátricas referenciadas por indicación');
 const header=node('div',undefined,'kb-dose-heading');
 header.append(node('h4','📏 Pauta pediátrica · referencia documental'));
 const badge=node('span',refs.length?'Fuente para esta indicación':'Dosis por cotejar',refs.length?'kb-dose-source-tag':'kb-dose-pending-tag');
 header.append(badge);box.append(header);
 box.append(node('p',record.indication,'kb-dose-indication'));
 if(strict&&!refs.length){
  box.append(node('p','No existe una dosis cotejada para ESTA combinación de diagnóstico, gravedad, edad y vía. No usar una dosis de otra indicación.','kb-dose-unavailable'));
  box.append(node('p',record.pending,'kb-dose-notes'));
 }else if(!refs.length){
  box.append(node('p','Ficha creada con seguridad, vigilancia y referencias. La pauta numérica por edad, vía e indicación está PENDIENTE de cotejo.','kb-dose-unavailable'));
  box.append(node('p',record.pending,'kb-dose-notes'));
 }else{
  if(!strict)box.append(node('p','Hay pautas diferentes por contexto. La dosis de una enfermedad NO debe transferirse a otra.','kb-dose-unavailable'));
  for(const r of refs){
   const card=node('article',undefined,'kb-dose-regimen');
   card.dataset.regimenId=r.id;
   const title=node('strong',r.scope,'kb-dose-scope');
   card.append(title);
   const dosage=node('div',undefined,'kb-dose-values');
   for(const [label,value] of [['Dosis de referencia',r.doseText],['Vía',r.route],['Intervalo',r.interval],['Límite',r.maximum],['Duración',r.duration]]){
    const row=node('div',undefined,'kb-dose-row');
    row.append(node('span',label),node('strong',value));
    dosage.append(row);
   }
   card.append(dosage,node('p','⚠️ Condiciones: '+r.guard,'kb-dose-guard'),node('p','Vigilancia: '+r.monitor,'kb-dose-monitor'));
   const source=db.sources[r.source];
   if(source){
    const link=node('a','Fuente: '+source.name+' · '+source.year+' ↗','kb-dose-cite');
    link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';card.append(link);
   }
   card.append(node('p','Referencia internacional de alcance limitado. No constituye indicación validada para el paciente ni ficha autorizada en México.','kb-dose-disclaimer'));
   box.append(card);
  }
 }
 const details=node('details',undefined,'kb-dose-safety');
 const summary=node('summary','🛡️ Contraindicaciones, ajustes y seguimiento');details.append(summary);
 const watch=node('ul');
 for(const x of record.avoid)watch.append(node('li','Precaución: '+x));
 for(const x of record.watch)watch.append(node('li','Vigilancia: '+x));
 watch.append(node('li','Riñón: '+record.renal),node('li','Hígado: '+record.hepatic));
 details.append(watch);
 box.append(details);
 if(!strict&&record.regimens.length){
  box.append(node('p','⚠️ Otras indicaciones, neonatos, prematuridad, infección grave, ajustes renal/hepático o formulaciones distintas pueden requerir pautas COMPLETAMENTE diferentes.','kb-dose-notes'));
 }
 const source=db.sources[record.source];
 if(source){
  const l=node('a','Consultar fuente clínica principal ↗','kb-dose-cite');
  l.href=source.url;l.target='_blank';l.rel='noopener noreferrer';box.append(l);
 }
 return box;
}
root.KidBumPediatricDrugUI=Object.freeze({render});
})(typeof window!=='undefined'?window:globalThis);
