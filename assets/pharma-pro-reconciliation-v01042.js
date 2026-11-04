/* Pharma Pro 3.0 · Phase 1 / v0.10.42
 * Partial, local medication-list reconciliation. NEVER a comprehensive interaction database,
 * Mexican prescribing authorization, clinical approval, or a check of patient-specific dosing.
 * No network, persistence or patient identifiers.
 */
(function(root){
 'use strict';
 const lib=root.KidBumPharmaCore, monographs=root.KidBumPharmaMonographs;
 if(!lib||!monographs)return;
 const date='2026-11-04';
 const rechecked=Object.freeze([
  Object.freeze({id:'potasio-iv',setid:'559a0a8c-a8fe-40a5-b196-21f9308780ab',version:23,effective:'2026-07-01',scope:'Concentrado Hospira 2 mEq/mL · solo IV después de dilución; nunca IV directo',sections:'Descripción, contraindicaciones, advertencias y dosificación'}),
  Object.freeze({id:'heparina',setid:'7014808d-cec9-4b2c-8eb5-940493e356ab',version:18,effective:'2026-10-23',scope:'Heparina sódica Hikma · identificación del vial y potencia, sangrado y vigilancia; no confundir con flush',sections:'Preparación 2.1, monitorización 2.3, contraindicaciones y 5.1–5.3'}),
  Object.freeze({id:'insulina-lispro',setid:'c8ecbd7a-0e22-4fc7-a503-faa58c1b6f3f',version:87,effective:'2026-06-16',scope:'Humalog U-100 SC prandial; U-200 no IV ni bomba; no convertir a mL desde la pluma',sections:'Administración 2.1–2.3, potencias 3 y contraindicaciones 4'})
 ]);
 const anticoagulants=new Set(['heparina','enoxaparina','warfarina','apixaban','rivaroxaban','dabigatran']);
 const insulin=new Set(['insulina-regular','insulina-nph','insulina-glargina','insulina-lispro']);
 function sourceIntegrity(){
  const supported=[];
  for(const r of rechecked){
   const m=monographs.byId[r.id];
   const valid=Boolean(m&&m.source&&m.source.setid===r.setid&&m.source.version===r.version&&m.source.effective===r.effective);
   supported.push(Object.freeze({id:r.id,name:lib.byId[r.id]?.name||r.id,valid,
    source:valid?m.source.url:'',version:r.version,effective:r.effective,scope:r.scope,sections:r.sections,
    checkedAt:date,
    state:valid?'Reconsultada frente a etiqueta US el '+date:'INCONSISTENCIA: versión, producto o etiqueta modificada'}));
  }
  return Object.freeze(supported);
 }
 function coverage(){
  const c=monographs.coverage||{};
  const count=lib.records.length,partial=monographs.records.length;
  const valid=sourceIntegrity().filter(x=>x.valid).length;
  return Object.freeze({total:count,partial,other:count-partial,
   approved:typeof c.clinicallyApproved==='number'?c.clinicallyApproved:0,
   recheckedNow:valid,
   reviewedAt:date,
   label:'Cotejo documental parcial de producto US, no validación farmacéutica independiente'});
 }
 function evaluate(ids){
  const errors=[],notices=[],pairs=[],highRisk=[],lasa=[],duplicates=[],classes=[];
  const selected=Array.isArray(ids)?ids:[];
  if(!Array.isArray(ids))errors.push('Debes proporcionar una lista de medicamentos.');
  if(selected.length<2||selected.length>8)errors.push('Selecciona entre 2 y 8 entradas para una revisión parcial.');
  if(selected.some(x=>typeof x!=='string'||!lib.byId[x]))errors.push('Hay un medicamento sin identificar en el catálogo.');
  const validIds=selected.filter(x=>typeof x==='string'&&lib.byId[x]);
  const unique=[...new Set(validIds)];
  if(errors.length)return {status:'blocked',errors,selected:[],pairs:[],reviewedPairs:0,
   notReviewedPairs:0,highRisk:[],lasa:[],duplicates:[],classes:[],notices:[],
   safe:false,coverage:coverage()};
  const names=selected.map(id=>lib.byId[id].name);
  const counter=Object.create(null);for(const id of selected)counter[id]=(counter[id]||0)+1;
  for(const id of unique){
   const d=lib.byId[id];
   if(counter[id]>1)duplicates.push('Duplicidad exacta: '+d.name+' aparece '+counter[id]+' veces. Verificar si representa una administración duplicada.');
   if(d.highRisk)highRisk.push({id,name:d.name,scope:d.highRiskScope||'Verificar formulación/vía y protocolo',
    source:monographs.byId[id]?.source?.url||''});
  }
  if(unique.filter(id=>anticoagulants.has(id)).length>1)
   classes.push('Varios anticoagulantes: revisar indicación, solapamiento y transición; no asumir que toda combinación es accidental ni segura.');
  if(unique.filter(id=>insulin.has(id)).length>1)
   classes.push('Varias insulinas: comprobar pauta basal/prandial, concentración y horario; una combinación puede ser intencional.');
  let reviewedPairs=0,notReviewedPairs=0;
  // Pairwise coverage is never interpreted as a blanket safety clearance.
  for(let i=0;i<unique.length;i++)for(let j=i+1;j<unique.length;j++){
   const a=unique[i],b=unique[j],aRec=lib.byId[a],bRec=lib.byId[b];
   const result=lib.interaction(a,b);
   if(result.supported&&result.level==='warning'){
    reviewedPairs++;pairs.push({a,b,level:'documented',message:result.message,source:result.source?.url||''});
   }else{
    notReviewedPairs++;
   }
   if((aRec.lasaPairs||[]).some(x=>x.id===b)||(bRec.lasaPairs||[]).some(x=>x.id===a)){
    lasa.push({a,b,message:'Par LASA documentado: '+aRec.name+' / '+bRec.name+'. Verificar nombre completo, concentración, envase y principio activo.'});
   }
  }
  notices.push('NO es una comprobación completa: '+notReviewedPairs+' de '+(unique.length*(unique.length-1)/2)+' pares distintos NO tienen una regla de interacción cargada.');
  notices.push('Las alertas de clase (anticoagulantes/insulinas) son recordatorios de conciliación, no interacciones confirmadas ni contraindicaciones automáticas.');
  notices.push('No se verifican dosis, indicación, embarazo, alergias, función renal, duplicidades entre distintas sales, todas las interacciones ni compatibilidad intravenosa.');
  notices.push('Consultar IPP mexicana, protocolo hospitalario y Farmacia Clínica antes de prescribir o administrar.');
  return {status:'requires-professional-review',safe:false,errors:[],
   selected:names,uniqueCount:unique.length,selectionCount:selected.length,
   pairs,reviewedPairs,notReviewedPairs,duplicates,lasa,classes,highRisk,notices,
   coverage:coverage()};
 }
 root.KidBumPharmaReconciliation=Object.freeze({evaluate,coverage,sourceIntegrity,sourceRechecks:rechecked,reviewedAt:date});
})(typeof window!=='undefined'?window:globalThis);
