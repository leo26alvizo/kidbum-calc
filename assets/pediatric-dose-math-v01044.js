/* KidBum CALC 0.10.44 — generic arithmetic verification of an EXISTING clinician-prescribed oral dose.
 * Accepts any age from day 0 but DOES NOT recommend drug, mg/kg, interval, or maximum.
 * All values must come from an age-appropriate, individually reviewed prescription/reference.
 * No storage, telemetry, prescription, or drug-specific eligibility inference.
 */
(function(root){
'use strict';
const num=(v)=>{
 if(v===undefined||v===null||typeof v==='boolean')return null;
 const s=String(v).trim();
 if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s))return null;
 const n=Number(s);return Number.isFinite(n)?n:null;
};
const fail=(code,error)=>Object.freeze({ok:false,code,error});
function calculate(raw){
 const x=raw||{};
 const ageDays=num(x.ageDays),ga=num(x.gestationalWeeks),weight=num(x.weightKg);
 if(ageDays===null||!Number.isInteger(ageDays)||ageDays<0||ageDays>6574)
  return fail('age','Edad cronológica en días: introduce 0–6574. Se admite el día 0 para verificación matemática neonatal.');
 if(weight===null||weight<0.4||weight>200)
  return fail('weight','Peso actual fuera del intervalo matemático (0.4–200 kg) o no confirmado.');
 if(x.route!=='oral')return fail('route','Solo vía ORAL. No emplear para infusiones, medicación IV, intratecal, inhalada ni inyectable.');
 if(typeof x.drug!=='string'||x.drug.trim().length<3||x.drug.trim().length>90)
  return fail('drug','Introduce el medicamento genérico exacto de la pauta previamente indicada.');
 if(x.highRiskExcluded!=='yes')return fail('highRisk','Se requiere descartar y revisar medicamentos de alto riesgo; esta herramienta no es apropiada para ellos.');
 if(x.referenceReviewed!=='yes'||x.clinician!=='yes')return fail('source','Se exige pauta escrita verificada para edad/gestación y revisión médica. No calcula una pauta nueva.');
 if(x.premature!=='yes'&&x.premature!=='no')return fail('premature','Confirma expresamente si existe prematuridad; modifica farmacocinética y elegibilidad.');
 if(ageDays<28||x.premature==='yes'){
  if(ga===null||!Number.isInteger(ga)||ga<22||ga>42)return fail('gestation','Recién nacido o antecedente de prematuridad: anota semanas COMPLETAS de gestación al nacimiento (22–42).');
  if(x.neonatalProtocol!=='yes')return fail('neonatal','El protocolo específico de edad posnatal, gestación y maduración renal debe haber sido revisado; sin él no se muestran cifras.');
 }
 const mgkg=num(x.mgKg),strengthMg=num(x.strengthMg),strengthMl=num(x.strengthMl),
 doses=num(x.dosesPerDay),maxSingle=num(x.maxSingleMg),maxDaily=num(x.maxDailyMg),
 prior=num(x.priorMg24h);
 if(mgkg===null||mgkg<=0||mgkg>1000)return fail('dose','Introduce la pauta prescrita positiva en mg/kg por TOMA o por DÍA, sin extrapolar.');
 if(!['perDose','perDay'].includes(x.basis))return fail('basis','Confirma si la pauta escrita indica mg/kg/TOMA o mg/kg/DÍA.');
 if(doses===null||!Number.isInteger(doses)||doses<1||doses>12)
  return fail('frequency','Introduce las tomas previstas por 24 h según pauta VERIFICADA (entero 1–12). No se infiere el intervalo.');
 if(strengthMg===null||strengthMg<=0||strengthMg>50000||strengthMl===null||strengthMl<=0||strengthMl>1000)
  return fail('strength','Introduce concentración real mg y mL de la presentación oral (ambos >0). No calcular gotas.');
 if(maxSingle===null||maxSingle<=0||maxDaily===null||maxDaily<=0)
  return fail('max','Captura máximo por toma y máximo diario ya VERIFICADOS para fármaco, edad y contexto; no se generan límites por defecto.');
 if(prior===null||prior<0||prior>100000)return fail('history','Introduce mg ya recibidos en últimas 24 h; 0 solo si se confirmó que no recibió nada.');
 const mgPerDay=x.basis==='perDay'?mgkg*weight:mgkg*weight*doses;
 const mgPerDose=mgPerDay/doses;
 const mlPerDose=mgPerDose/(strengthMg/strengthMl);
 if(!Number.isFinite(mgPerDose)||!Number.isFinite(mlPerDose)||mgPerDose<=0||mlPerDose<=0||mlPerDose>100)
  return fail('arithmetic','Volumen o resultado matemático fuera de rango para revisión manual.');
 if(mgPerDose>maxSingle+1e-9||mgPerDay>maxDaily+1e-9||prior+mgPerDose>maxDaily+1e-9)
  return fail('limit','La pauta excede un máximo documentado o los mg acumulados en 24 h. No se redondea ni reduce automáticamente.');
 return Object.freeze({ok:true,ageDays,gestationalWeeks:ga,premature:x.premature==='yes',weightKg:weight,
  drug:x.drug.trim(),mgKg:mgkg,basis:x.basis,dosesPerDay:doses,mgPerDay,mgPerDose,mlPerDose,
  mgPerMl:strengthMg/strengthMl,priorMg24h:prior,maxSingleMg:maxSingle,maxDailyMg:maxDaily,
  caution:'VERIFICACIÓN MATEMÁTICA solamente: NO valida selección del fármaco, pauta, seguridad en neonatos, frecuencia, dosis máximas, formulación o vía. No es una orden médica; el volumen no está redondeado a jeringa. Requiere protocolo y validación clínica/farmacológica individual.'
 });
}
root.KidBumPediatricDoseMath=Object.freeze({calculate});
})(typeof window!=='undefined'?window:globalThis);
