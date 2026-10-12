/* KidBum CALC — Neurología y Raquimedular, fase 1.
 * ABCD2 y cálculo aritmético de referencia de alteplasa IV en ictus isquémico adulto.
 * Sin diagnóstico automatizado, selección de candidatos, indicaciones ni órdenes clínicas.
 * ABCD2: Johnston et al Lancet 2007; AHA declaración TIA 2023.
 * Alteplasa: AHA/ASA guía de ictus isquémico agudo 2026, Tabla 7.
 */
(function(root){
'use strict';
const ids=Object.freeze(['abcd2','alteplaseais']);
function numeric(v,label,lo,hi){
 let n=NaN;
 if(typeof v==='number')n=v;
 else if(typeof v==='string'){
  const trimmed=v.trim().replace(',','.');
  if(/^[+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/.test(trimmed))n=Number(trimmed);
 }
 if(!Number.isFinite(n)||n<lo||n>hi)return {error:[label+': introduce un valor numérico entre '+lo+' y '+hi+'.']};
 return {value:n};
}
function select(v,label,options){
 if(!options.includes(v))return {error:[label+': selecciona una opción válida.']};
 return {value:v};
}
function error(message){return {error:[message]};}
function result(value,unit,interpretation,notes,detail){
 if(!Number.isFinite(value))return error('Resultado no válido; verifica las entradas.');
 return {value,unit,interpretation,notes,detail};
}
function calculate(id,input){
 if(!ids.includes(id))return error('Calculadora neurológica no encontrada.');
 const x=input||{};
 if(id==='abcd2'){
  const age=numeric(x.age,'Edad',18,120);
  const sbp=numeric(x.sbp,'Presión sistólica inicial',60,300);
  const dbp=numeric(x.dbp,'Presión diastólica inicial',20,200);
  const feature=select(x.feature,'Manifestación clínica',['weakness','speech','other']);
  const duration=select(x.duration,'Duración',['lt10','min10to59','ge60']);
  const diabetes=select(x.diabetes,'Diabetes mellitus',['true','false']);
  const resolved=select(x.resolved,'Resolución del cuadro',['true','false']);
  for(const f of [age,sbp,dbp,feature,duration,diabetes,resolved])if(f.error)return f;
  if(dbp.value>sbp.value)return error('La presión diastólica no puede superar a la sistólica. Verifica ambos valores antes de puntuar ABCD².');
  if(resolved.value!=='true')return error('ABCD2 solo corresponde a un AIT clínicamente sospechado con síntomas resueltos. Déficit persistente: activar evaluación urgente de EVC.');
  const a=age.value>=60?1:0;
  const bp=sbp.value>=140||dbp.value>=90?1:0;
  const c=feature.value==='weakness'?2:feature.value==='speech'?1:0;
  const d=duration.value==='ge60'?2:duration.value==='min10to59'?1:0;
  const dm=diabetes.value==='true'?1:0;
  const score=a+bp+c+d+dm;
  const group=score<=3?'0–3 (estrato históricamente bajo)':score<=5?'4–5 (estrato históricamente intermedio)':'6–7 (estrato históricamente alto)';
  return result(score,'/ 7 puntos',
    'ABCD²: '+score+'/7; '+group+'. Todo posible AIT necesita evaluación neurológica urgente. Un puntaje bajo NO descarta estenosis sintomática ni EVC próximo.',
    [
      'Utilizar solo tras sospecha clínica de AIT y resolución del déficit; no confirma un AIT, no sustituye TAC/RM ni imagen vascular cuando corresponda.',
      'No emplear ABCD² aisladamente para alta, ingreso, antitrombóticos o exclusión de riesgo. Considerar síntomas, fibrilación auricular, estenosis, exploración, imagen y acceso a valoración urgente.',
      'Presión arterial: sistólica ≥140 mmHg O diastólica ≥90 mmHg suma 1 punto. Categorías clínicas excluyentes: debilidad unilateral 2, alteración del habla sin debilidad 1.',
      'Criterios de Johnston 2007; recomendaciones AHA 2023. Las categorías históricas no representan una probabilidad personalizada.'
    ],
    'Edad ≥60: '+a+'; PA inicial ≥140/90: '+bp+'; clínica: '+c+'; duración: '+d+'; diabetes: '+dm+'. Total '+score+'.');
 }
 const weight=numeric(x.weight,'Peso corporal',20,300);
 const context=select(x.context,'Situación clínica',['adult_ais_reference']);
 const acknowledge=select(x.acknowledge,'Alcance de seguridad',['yes','no']);
 for(const f of [weight,context,acknowledge])if(f.error)return f;
 if(acknowledge.value!=='yes')return error('Antes de ver la fórmula debes reconocer que la calculadora NO comprueba elegibilidad ni autoriza trombólisis.');
 const dose=Math.min(0.9*weight.value,90);
 const bolus=0.1*dose;
 const infusion=dose-bolus;
 return result(dose,'mg de alteplasa (referencia)',
    'Cálculo matemático exclusivamente educativo. Total '+dose.toFixed(2)+' mg; 10% en bolo '+bolus.toFixed(2)+' mg durante 1 minuto y 90% '+infusion.toFixed(2)+' mg durante 60 minutos, solo después de decisión por equipo tratante.',
    [
      'NO es una prescripción ni autorización de trombólisis. Solo aplica a alteplasa IV para ictus isquémico agudo en adultos previamente considerados candidatos por un equipo capacitado y un protocolo institucional.',
      'Verificar imagen cerebral para excluir hemorragia, tiempo de última vez visto sano, déficit incapacitante, presión arterial, glucosa, anticoagulación/INR, plaquetas, contraindicaciones y condiciones clínicas relevantes según el protocolo vigente.',
      'AHA/ASA 2026 recomienda tanto alteplasa 0.9 mg/kg (máximo 90 mg) como tenecteplasa 0.25 mg/kg (máximo 25 mg) en candidatos seleccionados. NO confundir fármacos ni sus regímenes; esta calculadora NO calcula tenecteplasa.',
      'El bolo de alteplasa (10%) se administra en 1 minuto y el resto durante los 60 minutos siguientes. La preparación, concentración, bomba, monitoreo y doble verificación son responsabilidad del equipo y farmacia.',
      'No extrapolar a pediatría ni otras indicaciones de alteplasa. No se solicita ni almacena información identificable del paciente.'
    ],
    'Fórmula alteplasa: min(peso '+weight.value+' kg × 0.9 mg/kg, 90 mg) = '+dose.toFixed(2)+' mg; bolo = 10% = '+bolus.toFixed(2)+' mg; fracción para infusión = 90% = '+infusion.toFixed(2)+' mg. Guía AHA/ASA 2026, tabla 7.');
}
root.KidBumNeuro=Object.freeze({ids,calculate});
})(typeof globalThis!=='undefined'?globalThis:this);
