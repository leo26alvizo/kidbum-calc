/* KidBum CALC v0.9.9 — Fase 1 v1.0.0: oxigenación y sedación.
 * Global ARDS Definition 2024; Roca et al AJRCCM 2019; Sessler RASS 2002.
 * No diagnóstico automático de SDRA, intubación, sedación ni indicación médica.
 */
(function(root){
'use strict';
const ids=Object.freeze(['pafi','rox','rass']);
function number(value,label,low,high){
 let x=NaN;
 if(typeof value==='number')x=value;
 else if(typeof value==='string'){
   const t=value.trim().replace(',','.');
   if(/^(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/.test(t))x=Number(t);
 }
 if(!Number.isFinite(x)||x<low||x>high)throw Error(label+': introduce un valor entre '+low+' y '+high+'.');
 return x;
}
function pick(value,label,allowed){
 if(!allowed.includes(value))throw Error(label+': elige una opción válida.');
 return value;
}
function result(value,unit,interpretation,notes,detail){
 if(!Number.isFinite(value))throw Error('Cálculo no finito, revisa los valores.');
 return {value,unit,interpretation,notes,detail};
}
const rassDescriptions=Object.freeze({
 '4':'+4 Combativo: conducta violenta, peligro inmediato para el personal.',
 '3':'+3 Muy agitado: agresivo; retira tubos o catéteres.',
 '2':'+2 Agitado: movimientos frecuentes sin propósito o lucha con el ventilador.',
 '1':'+1 Inquieto: ansiedad sin movimientos violentos.',
 '0':'0 Alerta y tranquilo.',
 '-1':'−1 Somnoliento: contacto ocular sostenido >10 s ante la voz.',
 '-2':'−2 Sedación leve: contacto ocular ante voz <10 s.',
 '-3':'−3 Sedación moderada: movimiento o apertura ocular ante voz, sin contacto ocular.',
 '-4':'−4 Sedación profunda: no responde a la voz, sí al estímulo físico.',
 '-5':'−5 No despertable: no responde a la voz ni al estímulo físico.'
});
function calculate(id,data){
 if(!ids.includes(id))return {error:['Calculadora no disponible.']};
 const d=data||{};
 try{
  if(id==='pafi'){
   const pa=number(d.pao2,'PaO₂ arterial',20,650);
   const fiPercent=number(d.fio2,'FiO₂ expresada en porcentaje',21,100);
   const peep=pick(d.peep,'PEEP/CPAP al menos 5 cmH₂O',['yes','no','unknown']);
   const v=pa/(fiPercent/100);
   const band=v<=100?'≤100 mmHg (banda de hipoxemia severa en SDRA cuando se cumplen criterios)':v<=200?'101–200 mmHg (banda moderada en SDRA cuando se cumplen criterios)':v<=300?'201–300 mmHg (banda leve en SDRA cuando se cumplen criterios)':' >300 mmHg';
   const notes=[
    'PaO₂ debe proceder de GASOMETRÍA ARTERIAL; FiO₂ de la concentración administrada en el momento del muestreo, introducida como porcentaje (ej. 40, NO 0.40).',
    'La razón PaO₂/FiO₂ NO diagnostica por sí sola síndrome de distrés respiratorio agudo (SDRA): requiere tiempo de evolución, opacidades bilaterales, explicación del edema y criterios de soporte respiratorio.',
    'Las bandas de gravedad de la definición de Berlín requieren presión positiva (PEEP/CPAP ≥5 cmH₂O); la definición global más reciente incluye criterios específicos para alto flujo/no intubados.',
    'Valorar trayectoria clínica, trabajo respiratorio, ventilación y hemodinamia; la relación aislada no decide soporte ni intubación.'
   ];
   if(peep!=='yes')notes.push('No consta PEEP/CPAP ≥5 cmH₂O: NO aplicar automáticamente las categorías de gravedad del SDRA de Berlín.');
   if(v<=100)notes.push('Hipoxemia importante por la relación calculada: priorizar evaluación clínica y reevaluación del soporte oxigenatorio.');
   const interpretation='PaO₂/FiO₂ = '+v.toFixed(1)+' mmHg; '+band+'. '+(peep==='yes'?'PEEP/CPAP ≥5 declarada; faltan aún otros criterios para SDRA.':'Sin confirmación de PEEP/CPAP ≥5: descripción exclusivamente numérica, NO clasificación diagnóstica.');
   return result(v,'mmHg',interpretation,notes,'PaO₂ '+pa+' mmHg ÷ (FiO₂ '+fiPercent+'% / 100) = '+v.toFixed(2)+' mmHg. PEEP/CPAP ≥5: '+peep+'.');
  }
  if(id==='rox'){
   const spo2=number(d.spo2,'Saturación periférica SpO₂',50,100);
   const fiPercent=number(d.fio2,'FiO₂ en porcentaje',21,100);
   const rr=number(d.rr,'Frecuencia respiratoria',5,70);
   const time=pick(d.time,'Horas de evaluación con alto flujo',['2','6','12','other']);
   const hfno=pick(d.hfno,'Oxigenoterapia nasal de alto flujo',['yes','no']);
   if(hfno!=='yes')return {error:['Los puntos de corte publicados del índice ROX se estudiaron en pacientes bajo cánula nasal de alto flujo. No interpretes este cálculo fuera de ese contexto.']};
   const value=(spo2/(fiPercent/100))/rr;
   const lower={2:2.85,6:3.47,12:3.85}[time];
   let desc='ROX '+value.toFixed(2)+'. ';
   if(time==='other')desc+='Tiempo diferente de 2, 6 o 12 h: no se aplica un umbral validado de la cohorte original.';
   else if(value<lower)desc+='A las '+time+' h: por debajo del umbral inferior '+lower.toFixed(2)+' descrito en pacientes con neumonía; alto riesgo de fracaso de cánula de alto flujo en esa población.';
   else if(value>=4.88)desc+='A las '+time+' h: ≥4.88, asociado con menor probabilidad de intubación en la cohorte original; NO garantiza éxito.';
   else desc+='A las '+time+' h: zona intermedia; no hay clasificación fiable usando ROX aislado.';
   const notes=[
    'Índice ROX = (SpO₂ como porcentaje / FiO₂ como FRACCIÓN) / frecuencia respiratoria (respiraciones/min). Ejemplo: SpO₂ 92, FiO₂ 50%, FR 25 → 7.36.',
    'Los umbrales 2, 6 y 12 h provienen principalmente de pacientes con neumonía e insuficiencia respiratoria hipoxémica tratados con cánula nasal de alto flujo; su desempeño puede diferir en otras patologías.',
    'ROX no es indicación automática de intubación ni criterio único para continuar alto flujo; priorizar agotamiento, esfuerzo respiratorio, deterioro, gases arteriales, conciencia y perfusión.',
    'Medir tendencia en serie y documentar el tiempo desde el inicio de alto flujo. Asegurar señal fiable de pulsioximetría y FiO₂ real.'
   ];
   if(spo2>97)notes.push('SpO₂ >97%: sensibilidad reducida para detectar cambios en oxigenación por la parte plana de la curva de disociación; interpretar con cautela.');
   if(spo2<90)notes.push('SpO₂ <90%: posible hipoxemia significativa; priorizar evaluación urgente y soporte según el equipo tratante.');
   return result(value,'índice ROX',desc,notes,'ROX = ('+spo2+' / '+(fiPercent/100).toFixed(2)+') / '+rr+' = '+value.toFixed(3)+'. Alto flujo: sí. Tiempo: '+time+(time==='other'?' no estandarizado':' horas')+'.');
  }
  const confirmed=pick(d.assessed,'Valoración presencial RASS',['yes','no']);
  if(confirmed==='no')return {error:['RASS requiere observación clínica y la secuencia estandarizada de respuesta a voz y estímulo físico.']};
  const v=pick(d.score,'Nivel observado RASS',['-5','-4','-3','-2','-1','0','1','2','3','4']);
  const value=Number(v);
  const notes=[
   'RASS cuantifica agitación y nivel de respuesta en UCI, pero NO diagnostica delirium, dolor o trastornos neurológicos.',
   'Evaluar en orden: observar sin estímulo → dirigir voz/nombre y contacto ocular → si no responde, estimulación física según protocolo.',
   'Documentar factores que impiden la valoración fiable (bloqueo neuromuscular, barreras sensoriales, lesión neurológica, intubación, etc.).',
   'No usar un número RASS para titular sedantes sin objetivo clínico indicado, valoración hemodinámica y protocolo institucional.'
  ];
  if(value<=-4)notes.push('RASS −4/−5: un tamizaje habitual de delirium como CAM-ICU no es evaluable en ese estado; reevaluar cuando proceda.');
  if(value>=3)notes.push('Agitación intensa: priorizar seguridad del paciente y equipo, valoración de hipoxemia, dolor, delirium y causas reversibles.');
  return result(value,'puntos RASS',rassDescriptions[v],notes,'Escala ordinal Richmond Agitation-Sedation Scale: '+rassDescriptions[v]+' No se obtiene sumando criterios.');
 }catch(e){return {error:[String(e&&e.message||e)]};}
}
root.KidBumCritical=Object.freeze({ids,calculate,rassDescriptions});
})(typeof globalThis!=='undefined'?globalThis:this);
