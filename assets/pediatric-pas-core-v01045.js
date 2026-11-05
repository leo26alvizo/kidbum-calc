/* KidBum PAS 0.10.45 — pure, deterministic clinical score (Samuel 2002).
 * 8 distinct components / max 10 points. No missing value is a negative answer.
 * Hopkins clinical PATHWAY (2026): 0-3 low, 4-6 equivocal, 7-10 high.
 * ANC >7500/µL, WBC >10000/µL, documented fever >38 °C.
 * NOT a calibrated probability, diagnosis, discharge criterion, or treatment order.
 */
(function(root){
'use strict';
const criteria=Object.freeze([
 Object.freeze({key:'migration',points:1,group:'history',label:'Migración del dolor a fosa ilíaca derecha'}),
 Object.freeze({key:'anorexia',points:1,group:'history',label:'Anorexia o pérdida del apetito'}),
 Object.freeze({key:'vomiting',points:1,group:'history',label:'Náusea o vómito'}),
 Object.freeze({key:'fever',points:1,group:'history',label:'Fiebre documentada >38 °C'}),
 Object.freeze({key:'rlq',points:2,group:'exam',label:'Dolor a la palpación en fosa ilíaca derecha'}),
 Object.freeze({key:'movement',points:2,group:'exam',label:'Dolor en FID al toser, percutir o saltar'}),
 Object.freeze({key:'wbc',points:1,group:'lab',label:'Leucocitos >10 000/µL'}),
 Object.freeze({key:'anc',points:1,group:'lab',label:'Neutrófilos absolutos >7500/µL'})
]);
const fail=(code,message)=>Object.freeze({ok:false,code,message});
const parse=(v)=>{
 if(v===null||v===undefined||v==='')return null;
 const s=String(v).trim();if(!s)return null;
 if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s))return NaN;
 const n=Number(s);return Number.isFinite(n)?n:NaN;
};
function classify(n){return n<=3?'low':n<=6?'intermediate':'high';}
function calculate(payload){
 const d=payload||{},responses=d.answers||{},red=d.redFlags||{};
 const age=parse(d.ageYears),temperature=parse(d.temperatureC),wbc=parse(d.wbcK),
   ancDirect=parse(d.ancK),percent=parse(d.neutrophilPercent);
 if(age!==null&&(!Number.isFinite(age)||age<0||age>=19))return fail('age','Edad en años debe estar entre 0 y menos de 19.');
 if(temperature!==null&&(!Number.isFinite(temperature)||temperature<33||temperature>43))return fail('temperature','Temperatura imposible o fuera de 33–43 °C. Verifica la medición.');
 if(wbc!==null&&(!Number.isFinite(wbc)||wbc<0.1||wbc>150))return fail('wbc','Leucocitos fuera de 0.1–150 ×10³/µL. Revisa unidades del laboratorio.');
 if(ancDirect!==null&&(!Number.isFinite(ancDirect)||ancDirect<0||ancDirect>150))return fail('anc','ANC fuera de 0–150 ×10³/µL. Verifica unidades.');
 if(percent!==null&&(!Number.isFinite(percent)||percent<0||percent>100))return fail('neutrophils','Porcentaje de neutrófilos fuera de 0–100%.');
 if(percent!==null&&wbc===null)return fail('wbcRequired','Para derivar ANC del porcentaje de neutrófilos necesitas leucocitos del mismo hemograma.');
 if(wbc!==null&&ancDirect!==null&&ancDirect>wbc+0.005)
  return fail('labConflict','ANC no puede superar los leucocitos totales. Revisa unidades y fecha de muestras.');
 let derived=percent!==null&&wbc!==null?wbc*percent/100:null;
 if(ancDirect!==null&&derived!==null&&Math.abs(ancDirect-derived)>Math.max(0.5,derived*0.1))
  return fail('labConflict','ANC informado y calculado por porcentaje no concuerdan. Revisa diferencial y unidades.');
 const anc=ancDirect!==null?ancDirect:derived;
 let values={},points=0,missingWeight=0,answered=0;
 for(const item of criteria){
  let value=item.key==='wbc'?(wbc===null?'unknown':wbc>10?'yes':'no'):
   item.key==='anc'?(anc===null?'unknown':anc>7.5?'yes':'no'):
   (responses[item.key]===undefined?'unknown':responses[item.key]);
  if(item.key==='fever'&&temperature!==null){
   const observed=temperature>38?'yes':'no';
   if(value!=='unknown'&&value!==observed)return fail('feverConflict','Temperatura y selección de fiebre no coinciden. Corrige la respuesta.');
   value=observed;
  }
  if(!['yes','no','unknown'].includes(value))return fail('answer','Respuesta no válida en '+item.key+'.');
  values[item.key]=value;
  if(value==='yes')points+=item.points;
  if(value==='unknown')missingWeight+=item.points;
  else answered++;
 }
 if(!['yes','no','unknown'].includes(red.unstable||'unknown')||!['yes','no','unknown'].includes(red.peritonitis||'unknown'))
  return fail('redFlags','Signos de alarma inválidos.');
 const urgent=red.unstable==='yes'||red.peritonitis==='yes',
   flagsChecked=red.unstable==='no'&&red.peritonitis==='no',
   ageValid=age!==null&&age>=4&&age<18,
   complete=answered===8;
 const interval=[points,points+missingWeight],
   score=complete?points:null,
   clinicalBand=complete?classify(points):null;
 let band=urgent?'urgent':age===null?'pending':!ageValid?'outOfScope':!complete?'pending':clinicalBand==='low'&&!flagsChecked?'pending':clinicalBand;
 const warnings=[];
 if(age===null)warnings.push('Anota edad antes de asignar semáforo de riesgo.');
 else if(age<4)warnings.push('Menores de 4 años: PAS no suficientemente validado para excluir apendicitis; mayor riesgo de presentación atípica y perforación.');
 else if(age>=18)warnings.push('Mayores de 17 años: esta ruta pediátrica no sustituye evaluación de adultos.');
 else if(age>15)warnings.push('Puntaje desarrollado originalmente en 4–15 años; interpretar según contexto en adolescentes mayores.');
 if(!complete)warnings.push('PAS INCOMPLETO: faltan '+(8-answered)+' criterios. Intervalo matemático posible '+interval[0]+'–'+interval[1]+'/10. No asumir que los datos pendientes son negativos.');
 if(!flagsChecked&&!urgent)warnings.push('Antes de considerar el semáforo verde, descartar y documentar signos de alarma.');
 if(urgent)warnings.unshift('ALERTA CLÍNICA: inestabilidad o signos de peritonitis. Valoración de urgencias y cirugía sin esperar PAS ni pruebas adicionales.');
 if(complete&&clinicalBand==='low'&&!urgent)warnings.push('Un PAS ≤3 NO descarta apendicitis temprana; requiere historia, reexploración y seguimiento seguros.');
 if(complete&&clinicalBand==='high'&&!urgent)warnings.push('PAS ≥7 es alta sospecha, NO confirma apendicitis sin valoración clínica y estudios indicados.');
 const titles={urgent:'ALERTA · evaluación urgente',outOfScope:'PAS sin validación etaria suficiente',
  pending:'Evaluación aún incompleta',low:'VERDE · baja sospecha por PAS',
  intermediate:'AMARILLO · evaluación intermedia',high:'ROJO · alta sospecha por PAS'};
 const plans={
  urgent:['Priorizar estabilización, monitorización y valoración médica inmediata.','Solicitar evaluación quirúrgica urgente por sospecha de abdomen agudo o sepsis; no retrasar por el puntaje.'],
  outOfScope:['No usar el PAS para descartar apendicitis en esta edad.','Solicitar evaluación pediátrica individual; considerar ecografía y cirugía si clínica compatible.'],
  pending:['Completar anamnesis, exploración y hemograma con diferencial según pertinencia clínica.','Reexaminar y actuar por sospecha clínica, sin esperar un puntaje definitivo si hay deterioro.'],
  low:['Revaluar abdomen y evolución; valorar diagnósticos alternativos.','Solo considerar observación/alta según valoración presencial, tolerancia oral y seguimiento/retorno oportuno.'],
  intermediate:['Mantener observación y reexploración seriada; obtener laboratorios pertinentes.','Considerar ecografía de FID como imagen inicial, según disponibilidad y juicio clínico.'],
  high:['Valoración urgente por pediatría/urgencias y considerar cirugía pediátrica.','Ecografía dirigida de FID como primera imagen en paciente estable; ayuno/IV según evaluación institucional.']
 };
 return Object.freeze({ok:true,ageYears:age,ageValid,temperatureC:temperature,wbcK:wbc,ancK:anc,
  ancDerived:ancDirect===null&&derived!==null,neutrophilPercent:percent,
  values:Object.freeze(values),score,pointsKnown:points,range:Object.freeze(interval),
  answered,missing:8-answered,missingWeight,complete,clinicalBand,band,urgent,
  riskLabel:titles[band],recommendations:Object.freeze(plans[band]),warnings:Object.freeze(warnings)});
}
root.KidBumPAS=Object.freeze({criteria,calculate,classify});
})(typeof window!=='undefined'?window:globalThis);
