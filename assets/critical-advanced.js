/* KidBum CALC phase 2 of 1.0.0 — SOFA-2 (JAMA 2025) & CAM-ICU (Vanderbilt).
 * SOFA-2: clinician picks 0–4 for each organ from fully labeled source categories.
 * CAM-ICU: complete bedside examination required; RASS -4/-5 never scored.
 * No automatic sepsis diagnosis, ICU mortality estimate or clinical order.
 */
(function(root){
'use strict';
const ids=Object.freeze(['sofa2','camicu']);
const groups=Object.freeze([
 {key:'brain',label:'Cerebro'}, {key:'resp',label:'Respiratorio'},
 {key:'cv',label:'Cardiovascular'}, {key:'liver',label:'Hígado'},
 {key:'kidney',label:'Riñón'}, {key:'hemo',label:'Hemostasia'}
]);
const criteria=Object.freeze({
 brain:[
 '0 · GCS 15 / órdenes voluntarias equivalentes',
 '1 · GCS 13–14, localiza dolor, o precisa fármacos para delirium',
 '2 · GCS 9–12 / retira ante dolor',
 '3 · GCS 6–8 / flexión ante dolor',
 '4 · GCS 3–5 / extensión, sin respuesta o mioclonías generalizadas'
 ],
 resp:[
 '0 · PaO₂/FiO₂ >300 mmHg',
 '1 · PaO₂/FiO₂ ≤300 y >225 mmHg',
 '2 · PaO₂/FiO₂ ≤225 mmHg sin criterio de nivel 3–4',
 '3 · PaO₂/FiO₂ ≤150 mmHg CON soporte ventilatorio avanzado',
 '4 · PaO₂/FiO₂ ≤75 mmHg CON soporte ventilatorio avanzado, O ECMO'
 ],
 cv:[
 '0 · PAM ≥70 mmHg sin vasopresor/inotrópico',
 '1 · PAM <70 mmHg sin vasopresor/inotrópico',
 '2 · Norepinefrina + epinefrina ≤0.2 µg/kg/min, O cualquier otro vasoactivo/inotrópico',
 '3 · NE+EPI >0.2 a ≤0.4 µg/kg/min, O dosis baja + otro vasoactivo',
 '4 · NE+EPI >0.4 µg/kg/min, O media + otro vasoactivo, O soporte mecánico'
 ],
 liver:[
 '0 · Bilirrubina total ≤1.20 mg/dL',
 '1 · Bilirrubina >1.20 a ≤3.0 mg/dL',
 '2 · Bilirrubina >3.0 a ≤6.0 mg/dL',
 '3 · Bilirrubina >6.0 a ≤12.0 mg/dL',
 '4 · Bilirrubina >12.0 mg/dL'
 ],
 kidney:[
 '0 · Creatinina ≤1.20 mg/dL, diuresis preservada y sin TRR',
 '1 · Creatinina >1.20 a ≤2.0 O diuresis <0.5 mL/kg/h durante 6–<12 h',
 '2 · Creatinina >2.0 a ≤3.50 O diuresis <0.5 mL/kg/h durante ≥12 h',
 '3 · Creatinina >3.50 O diuresis <0.3 mL/kg/h ≥24 h O anuria ≥12 h',
 '4 · Recibiendo o cumple criterios de tratamiento de reemplazo renal (incluida TRR crónica)'
 ],
 hemo:[
 '0 · Plaquetas >150 ×10³/µL',
 '1 · Plaquetas ≤150 y >100 ×10³/µL',
 '2 · Plaquetas ≤100 y >80 ×10³/µL',
 '3 · Plaquetas ≤80 y >50 ×10³/µL',
 '4 · Plaquetas ≤50 ×10³/µL'
 ]
});
function allowed(x,label,arr){
 if(!arr.includes(x))throw Error(label+': selecciona una respuesta válida; no se permite dejarla vacía.');
 return x;
}
function result(value,unit,interpretation,notes,detail,display){
 const o={value,unit,interpretation,notes,detail};
 if(display)o.display=display;
 return o;
}
function calculate(id,d){
 if(!ids.includes(id))return {error:['Herramienta no disponible.']};
 const x=d||{};
 try{
  if(id==='sofa2'){
   if(allowed(x.adult,'Población adulta',['yes','no'])!=='yes')
     return {error:['SOFA-2 fue validado en adultos críticamente enfermos de UCI; no calcular para población pediátrica con esta versión.']};
   if(allowed(x.confirm,'Valoración completa de seis órganos',['yes','no'])!=='yes')
     return {error:['SOFA-2 requiere evaluación completa de los seis dominios con tabla JAMA 2025 y reglas de soporte; no inferir cero de datos ausentes.']};
   let total=0;const lines=[];
   for(const group of groups){
    const v=allowed(x[group.key],group.label,['0','1','2','3','4']);
    const pts=Number(v);
    total+=pts;
    lines.push(group.label+' = '+pts+': '+criteria[group.key][pts]);
   }
   const notes=[
    'SOFA-2 original JAMA 2025: seis dominios (cerebro, respiratorio, cardiovascular, hígado, riñón y hemostasia), máximo 24 puntos. NO es el SOFA clásico de 1996.',
    'Las categorías se SELECCIONAN por profesional tras examinar datos y aplicar reglas de SOFA-2; esta herramienta suma y documenta las selecciones, no interpreta automáticamente gasometrías, soporte, fármacos ni terapias.',
    'En un órgano con más de un criterio, seleccionar el GRADO MÁS ALTO que corresponda; vigilar soporte ventilatorio, dosis de vasopresores combinados, soporte mecánico y TRR. Confirmar excepciones y notas de la tabla JAMA 2025.',
    'SOFA-2 refleja gravedad de disfunción de órgano, no diagnostica por sí solo sepsis ni sustituye juicio intensivista. No extrapolar la puntuación a una probabilidad individual de mortalidad.',
    'No sustituir resultados faltantes por 0. Sedación, disfunción crónica, techo terapéutico y disponibilidad de recursos pueden modificar la forma de aplicar la escala original.'
   ];
   return result(total,'/ 24 puntos','SOFA-2 '+total+'/24. Suma descriptiva de seis sistemas; no constituye diagnóstico de sepsis ni una indicación terapéutica.',notes,lines.join('; ')+'. Total = '+total+'.');
  }
  if(allowed(x.assessed,'Aplicación CAM-ICU presencial',['yes','no'])!=='yes')
   return {error:['CAM-ICU exige aplicación estandarizada presencial (RASS, curso, atención y pensamiento cuando corresponda).']};
  const rass=allowed(x.rass,'RASS',['-5','-4','-3','-2','-1','0','1','2','3','4']);
  if(rass==='-5'||rass==='-4')
   return result(null,'','CAM-ICU NO EVALUABLE (RASS −4/−5): reevaluar cuando el paciente esté suficientemente despierto.',[
    'No documentar CAM-ICU negativo por ausencia de respuesta en sedación profunda o coma.',
    'Revisar sedación, conciencia y seguridad; volver a evaluar RASS y CAM-ICU según protocolo.'
   ],'RASS '+rass+' = no evaluable, no se asigna un resultado CAM-ICU.','No evaluable');
  const acute=allowed(x.acute,'Cambio agudo/fluctuación en 24 h',['yes','no'])==='yes';
  const att=allowed(x.attention,'Errores en atención 10 letras',['0','1','2','3','4','5','6','7','8','9','10','NT']);
  if(att==='NT')return {error:['La atención no fue evaluable: no emitir CAM-ICU negativo ni positivo. Registrar prueba alternativa válida o estado no evaluable.']};
  const errors=Number(att);
  const inattentive=errors>2;
  const altered=rass!=='0';
  let disorganized=false,thinking='No requerida por algoritmo';
  // Test thinking only necessary when first 2 positive and RASS=0.
  if(acute&&inattentive&&!altered){
    const v=allowed(x.thinking,'Errores de pensamiento (4 preguntas + orden)',['0','1','2','3','4','5','NT']);
    if(v==='NT')return {error:['Pensamiento desorganizado no evaluable con rasgos 1 y 2 positivos y RASS 0. No emitir CAM-ICU negativo.']};
    thinking=v+'/5 errores';
    disorganized=Number(v)>1;
  }
  const positive=acute&&inattentive&&(altered||disorganized);
  const interpretation=positive
    ?'CAM-ICU POSITIVO: rasgos 1 y 2 presentes junto con 3 o 4. Tamizaje positivo para delirium; confirmar valoración clínica y buscar causas.'
    :'CAM-ICU NEGATIVO en la evaluación actual. Un resultado negativo NO excluye fluctuación posterior; repetir según protocolo.';
  const notes=[
   'CAM-ICU de Vanderbilt: rasgo 1 inicio agudo/fluctuante, rasgo 2 inatención (>2 de 10 errores), rasgo 3 RASS distinto de 0, rasgo 4 pensamiento desorganizado (>1 de 5 errores). Regla: 1 Y 2 Y (3 O 4).',
   'Atención con secuencia validada SAVEAHAART o equivalente oficial, instrucción de apretar al oír A; error = omisión o respuesta ante letra no A. Si es imposible, utilizar test alternativo oficial o registrar no evaluable.',
   'Pensamiento desorganizado: cuatro preguntas estandarizadas y orden de dedos. No utilizar una impresión subjetiva como sustituto de la prueba estructurada.',
   'CAM-ICU es un tamizaje; valorar hipoxemia, infección, fármacos, dolor, abstinencia, alteraciones metabólicas y factores neurológicos. No indicar fármacos basándose solamente en este resultado.',
   'RASS −4 y −5 no son evaluables. En RASS ≥−3 puede administrarse la prueba conforme a protocolo hospitalario.'
  ];
  return result(positive?1:0,'CAM-ICU',interpretation,notes,'Rasgo 1: '+(acute?'Sí':'No')+'; rasgo 2: '+errors+'/10 errores ('+(inattentive?'Sí':'No')+'); rasgo 3: RASS '+rass+' ('+(altered?'Sí':'No')+'); rasgo 4: '+thinking+'. Regla: '+(positive?'positiva':'negativa')+'.',positive?'Positivo':'Negativo');
 }catch(e){return {error:[String(e&&e.message||e)]};}
}
root.KidBumCriticalAdvanced=Object.freeze({ids,criteria,calculate});
})(typeof globalThis!=='undefined'?globalThis:this);
