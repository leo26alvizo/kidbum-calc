/* KidBum CALC — Pediatric oral medicine reference, version 1.
 * Narrow eligibility: age 24–143 months, weight 8–40 kg, supervised care.
 * Independent clinical references: CENSIA 2025, AAP, RCH Melbourne.
 * Never a medical prescription; no patient data persisted or transmitted.
 */
(function(root){
'use strict';
const choices=Object.freeze({
 paracetamol:Object.freeze({label:'Paracetamol oral',strengthMg:160,strengthMl:5,doseChoices:[10,15],intervalHours:6,maxDoses24h:4,maxMgKg24h:60,maxMgPerDose:600,checks:['allergy','liver','other']}),
 ibuprofeno:Object.freeze({label:'Ibuprofeno oral',strengthMg:100,strengthMl:5,doseChoices:[5,10],intervalHours:8,maxDoses24h:3,maxMgKg24h:30,maxMgPerDose:400,checks:['allergy','kidney','dehydration','varicella','bleeding','asthma']})
});
const fail=(code,message)=>({ok:false,code,error:message});
function calc(id,input){
 const med=choices[id];
 if(!med)return fail('unreviewed','Este medicamento aún no tiene un cálculo habilitado.');
 const x=input||{};
 const age=Number(x.ageMonths),weight=Number(x.weightKg),dose=Number(x.doseMgKg),
   mgPrior=Number(x.totalMg24h),count=Number(x.doses24h);
 if(!Number.isInteger(age)||age<24||age>143)return fail('age','Disponible solo para niños de 24 a 143 meses. Fuera de este intervalo: valoración individual.');
 if(!Number.isFinite(weight)||weight<8||weight>40)return fail('weight','Peso fuera del intervalo revisado (8–40 kg). Verificar peso y necesidades individuales.');
 if(!med.doseChoices.includes(dose)||!Number.isFinite(dose))return fail('dose','Selecciona una dosis de referencia admitida para este fármaco.');
 if(String(x.strength)!==med.strengthMg+'/'+med.strengthMl)return fail('strength','La concentración del frasco no coincide con la presentación revisada. No convertir dosis.');
 if(x.verifiedLabel!=='yes')return fail('label','Confirma el principio activo, vía oral y concentración exacta en la etiqueta del frasco.');
 if(x.clinician!=='yes')return fail('supervision','Este cálculo requiere valoración y selección de dosis por personal médico.');
 if(x.indication!=='fever'&&x.indication!=='pain')return fail('indication','Selecciona una indicación sintomática evaluada (dolor o malestar por fiebre).');
 for(const key of med.checks){
  if(x[key]!=='no')return fail('contraindication','El cálculo está bloqueado por una contraindicación, precaución o antecedente no descartado ('+key+').');
 }
 if(x.doses24h===undefined||String(x.doses24h).trim()===''||x.totalMg24h===undefined||String(x.totalMg24h).trim()==='')return fail('history','Documenta explícitamente dosis previas y mg totales en las últimas 24 horas (0 si ninguno).');
 if(!Number.isInteger(count)||count<0||count>med.maxDoses24h)return fail('history','Introduce el número documentado de dosis en las últimas 24 horas.');
 if(!Number.isFinite(mgPrior)||mgPrior<0||mgPrior>100000)return fail('history','Introduce la cantidad total en mg recibida durante las últimas 24 horas; 0 únicamente si ninguna.');
 if(count===0&&mgPrior!==0)return fail('history','Los antecedentes son incompatibles: hay mg previos, pero cero administraciones.');
 if(count>0&&mgPrior===0)return fail('history','Los antecedentes son incompatibles: existen administraciones previas sin dosis registrada.');
 if(count>0){
  const hours=Number(x.hoursSinceLast);
  if(!Number.isFinite(hours)||hours<0||hours>24)return fail('interval','Registra las horas desde la última administración.');
  if(hours<med.intervalHours)return fail('interval','No ha transcurrido el intervalo de referencia desde la última administración.');
 }
 if(count>=med.maxDoses24h)return fail('limit','Ya se alcanzó el máximo conservador de administraciones en 24 horas.');
 const mg=weight*dose,maxDaily=weight*med.maxMgKg24h;
 if(mg>med.maxMgPerDose+1e-9)return fail('limit','La dosis propuesta supera el máximo individual revisado.');
 if(mgPrior+mg>maxDaily+1e-9)return fail('limit','La dosis propuesta supera el máximo conservador para las 24 horas.');
 const mgPerMl=med.strengthMg/med.strengthMl;
 const ml=mg/mgPerMl;
 if(!Number.isFinite(ml)||ml<=0||ml>100)return fail('arithmetic','No es posible verificar la conversión a mL.');
 return Object.freeze({
  ok:true,id,drug:med.label,ageMonths:age,weightKg:weight,
  mgKgPerDose:dose,mgPerDose:mg,mlPerDose:ml,
  mgPerMl,concentration:med.strengthMg+' mg/'+med.strengthMl+' mL',
  intervalHours:med.intervalHours,maxDoses24h:med.maxDoses24h,
  priorMg24h:mgPrior,dosesPrior24h:count,maxMg24h:maxDaily,
  prospectiveMg24h:mgPrior+mg,
  caution:'Referencia aritmética, NO una orden médica. Verificar presentación, indicación, límites, tratamiento concomitante y dosificación final antes de administrar.'
 });
}
root.KidBumPediatricPharma=Object.freeze({calculate:calc,supported:Object.freeze(Object.keys(choices))});
})(typeof window!=='undefined'?window:globalThis);
