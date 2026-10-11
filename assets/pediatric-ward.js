/* KidBum CALC — Pediatric Ward 0.7
 * Additional hospital arithmetic and educational reference cards.
 * No automatic medication orders or IV access authorization.
 */
(function(root){
'use strict';
function n(v){if(v===null||v===undefined||v===''||typeof v==='boolean')return NaN;const q=Number(String(v).replace(',','.').trim());return Number.isFinite(q)?q:NaN}
function between(x,l,h){return Number.isFinite(x)&&x>=l&&x<=h}
function ok(value,unit,interpretation,notes,detail,extra){return {value,unit,interpretation,notes,detail,...(extra||{})}}
function error(message){return {error:[message]}}
const vital=Object.freeze({
 neonate:{name:'Neonato',rr:'35–55',hr:'100–205',sbp:'67–84',dbp:'35–53',map:'45–60'},
 infant:{name:'Lactante (1–12 meses)',rr:'30–53',hr:'100–180',sbp:'72–104',dbp:'37–56',map:'50–62'},
 toddler:{name:'1–2 años',rr:'22–37',hr:'98–140',sbp:'86–106',dbp:'42–63',map:'49–62'},
 preschool:{name:'3–5 años',rr:'20–29',hr:'80–120',sbp:'89–112',dbp:'46–72',map:'58–69'},
 school:{name:'6–12 años',rr:'18–25',hr:'75–118',sbp:'97–120',dbp:'57–80',map:'66–79'},
 adolescent:{name:'13–17 años',rr:'12–20',hr:'60–100',sbp:'110–131',dbp:'64–83',map:'73–84'}
});
function insensible(o){
 const kg=n(o.weight),cm=n(o.height),hours=n(o.hours),age=n(o.ageDays);
 if(!between(kg,.4,200)||!between(cm,40,220)||!between(hours,1,48)||!Number.isInteger(age)||!between(age,28,6574))
   return error('Requiere peso, talla, horas (1–48) y edad de 28 días a 18 años válidos. No extrapolar a prematuros.');
 const bsa=Math.sqrt(kg*cm/3600),lo=bsa*300*hours/24,hi=bsa*400*hours/24;
 return ok((lo+hi)/2,'mL estimados',
  'Estimación fisiológica de pérdidas insensibles: '+lo.toFixed(1)+'–'+hi.toFixed(1)+' mL en '+hours+' horas.',
  ['Rango docente 300–400 mL/m²/día en condiciones habituales; NO es volumen que se deba infundir automáticamente.','Fiebre, taquipnea, fototerapia, incubadoras, humedad, ventilación y quemaduras pueden modificar ampliamente las pérdidas.','En neonatos y enfermedad grave se requiere valoración y protocolo específico. No sustituye balance hídrico, peso diario ni evaluación clínica.'],
  'ASC por Mosteller = √(peso kg × talla cm / 3600) = '+bsa.toFixed(3)+' m². Intervalo = ASC × [300,400] mL/m²/d × '+hours+'/24.',
  {display:lo.toFixed(0)+'–'+hi.toFixed(0)+' mL'});
}
function gir(o){
 const w=n(o.weight),rate=n(o.rate),d=n(o.dextrose);
 if(!between(w,.4,200)||!between(rate,0,500)||!between(d,0,50))return error('Ingresa peso, velocidad real en mL/h y concentración de glucosa en % p/v.');
 if(d===0||rate===0)return ok(0,'mg/kg/min','Sin glucosa IV aportada en la mezcla evaluada.',
  ['No se incluyen otras infusiones ni aportes enterales; valor no equivale al total de glucosa recibido.'],
  'GIR = (% dextrosa × mL/h) / (6 × kg).');
 const v=d*rate/(6*w);
 if(!['term','preterm','older'].includes(o.group))return error('Selecciona grupo etario para evitar aplicar metas neonatales inapropiadas.');
 const label=o.group==='term'?'Recién nacido a término: rango orientativo inicial 4–6 mg/kg/min':o.group==='preterm'?'Prematuro: rango orientativo inicial 6–8 mg/kg/min':'Fuera del periodo neonatal no existe una meta universal de GIR: individualizar';
 return ok(v,'mg/kg/min',label,
  ['Este valor corresponde SOLO a esta infusión, no incluye nutrición enteral ni otras soluciones con glucosa.',
   'Los rangos neonatales RCH son orientativos, no objetivos obligatorios ni instrucciones para modificar una bomba.',
   'Valorar glucemia, edad gestacional, estado nutricional, insulina, situación crítica y acceso venoso antes de modificar la infusión.',
   d>12.5?'Solución glucosada concentrada: verificar osmolaridad final, presentación y autorización de vía por Farmacia y protocolo.':'No usar la concentración para asumir seguridad de vía periférica.'],
  'GIR = (dextrosa '+d+'% × velocidad '+rate+' mL/h) ÷ (6 × peso '+w+' kg) = '+v.toFixed(2)+' mg/kg/min.');
}
function solution(o){
 const d=n(o.dextrose),salt=n(o.saline),vol=n(o.volume),hours=n(o.hours),weight=n(o.weight);
 if(!between(d,0,50)||!between(salt,0,20)||!between(vol,1,20000)||!between(hours,.25,48)||!between(weight,.4,200)||(!d&&!salt))
  return error('Verifica concentraciones finales % p/v de glucosa (0–50) y NaCl (0–20), volumen, horas y peso.');
 const osmGluc=d*10/180.156*1000,osmSalt=salt*10/58.44*2*1000;
 const osm=osmGluc+osmSalt,naPerL=salt*10/58.44*1000,sodDelivered=naPerL*vol/1000;
 const gramsGlucose=d*vol/100,rate=vol/hours,gir=d*rate/(6*weight);
 const alarm=salt>=3?'Solución de NaCl altamente hipertónica: NO administrar directamente por inferencia de esta herramienta.':osm>=900?'Osmolaridad teórica elevada: verificar necesidad de acceso central, formulación y protocolo.':'Osmolaridad teórica calculada: NO autoriza vía periférica.';
 return ok(osm,'mOsm/L teóricos',alarm,
  ['Es un cálculo IDEAL aproximado de partículas; no es osmolaridad medida ni sustituye ficha técnica, farmacia o osmolaridad del producto final.',
   'El umbral de 900 mOsm/L se describe para nutrición parenteral periférica (ESPGHAN/ASPEN), NO es un permiso general para cualquier fármaco o solución.',
   'Vía periférica/central depende además de vesicancia, pH, compatibilidad, aditivos, concentración final, velocidad, duración y condiciones venosas.',
   salt>=3?'ALERTA: verificar estrictamente salina hipertónica; no realizar mezclas ni administración con esta pantalla.':'No utilizar este cálculo para elaborar diluciones o prescribir infusiones.'],
  'Estimación: dextrosa '+osmGluc.toFixed(1)+' + NaCl '+osmSalt.toFixed(1)+' = '+osm.toFixed(1)+' mOsm/L. Volumen '+vol+' mL en '+hours+' h ('+rate.toFixed(1)+' mL/h). Na+ estimado '+sodDelivered.toFixed(1)+' mmol; glucosa '+gramsGlucose.toFixed(1)+' g; GIR '+gir.toFixed(2)+' mg/kg/min.',
  {display:'≈'+osm.toFixed(0)+' mOsm/L'});
}
function vitalSigns(o){
 if(!Object.prototype.hasOwnProperty.call(vital,o.ageGroup))return error('Selecciona el grupo de edad.');
 const v=vital[o.ageGroup];
 return ok(0,'',v.name+' — referencia PALS 2025',
 ['Rangos de referencia poblacional: no son máximos/mínimos absolutos ni límites para descartar choque o gravedad.',
 'FC referida en vigilia; fiebre, dolor, llanto, sueño, enfermedad, percentiles de talla y técnica de medición modifican la interpretación.',
 'La presión arterial pediátrica se interpreta con edad, sexo y percentil de talla cuando corresponde; este cuadro no diagnostica hipertensión.'],
 'Tarjeta PALS 2025 (American Red Cross): FR respiraciones/min, FC despierto latidos/min; presión en mmHg.',
 {display:'Ver tabla por edad',table:{title:'Signos vitales de referencia',headers:['FR/min','FC despierto','PAS mmHg','PAD mmHg','PAM mmHg'],values:[v.rr,v.hr,v.sbp,v.dbp,v.map],unit:'Referencias por grupo etario',caption:'American Red Cross PALS Pediatric Systematic Assessment 2025. Únicamente referencia clínica.'}});
}
function formulaVolume(o){
 const w=n(o.weight),age=n(o.months),feeds=n(o.feeds);
 if(!between(w,2,15)||!Number.isInteger(age)||!between(age,1,11)||!Number.isInteger(feeds)||!between(feeds,4,12))
  return error('Referencia exclusivamente para lactantes a término sanos de 1–11 meses, 2–15 kg y 4–12 tomas/día.');
 if(o.term!=='true')return error('No aplicar este promedio a prematuridad o enfermedad: requiere programa nutricional individual.');
 const daily=w*(75/.45359237),per=daily/feeds;
 return ok(daily,'mL/día aproximados','Promedio poblacional de fórmula; alimentar según señales de hambre y saciedad.',
 ['AAP: ≈75 mL de fórmula por libra de peso al día; es un promedio, NO un mínimo obligatorio ni receta para cada lactante.',
 'Muchos lactantes ingieren alrededor de 960 mL/día como máximo habitual; hay excepciones y alimentación complementaria según edad.',
 'No usar en primera semana, prematuridad, crecimiento deficiente, cardiopatía, enfermedad renal o nutrición por sonda sin valoración.',
 'La lactancia materna directa se guía por demanda y crecimiento, no por este cálculo de fórmula.',
 'En lactantes con leche materna total/parcial, revisar vitamina D con pediatría; suplementación y hierro dependen de edad, alimentación y riesgo.'],
 'AAP: 75 mL por 453 g/día ≈165.3 mL/kg/día. Para '+w+' kg: '+daily.toFixed(0)+' mL/día; repartido matemáticamente en '+feeds+' tomas ≈'+per.toFixed(0)+' mL/toma (no prescripción).');
}
function milkEnergy(o){
 const vol=n(o.volume),density=n(o.density);
 if(!between(vol,0,5000)||!between(density,1,200))return error('Introduce volumen realmente ingerido (mL) y energía declarada (kcal/100 mL) en la etiqueta.');
 const kcal=vol*density/100;
 return ok(kcal,'kcal','Energía estimada del volumen declarado, no requerimiento individual',
  ['Leche humana: el contenido energético varía; 65–67 kcal/100 mL es orientativo, no medición de una muestra concreta.',
   'En fórmulas infantiles utiliza siempre la densidad calórica en su envase y la preparación autorizada; no modificar diluciones.',
   'Fortificadores, módulos de proteína, vitaminas y hierro NO se añaden automáticamente; requieren indicación individualizada y valoración de seguridad.'],
  vol+' mL × '+density+' kcal/100 mL = '+kcal.toFixed(1)+' kcal.');
}
function foodEnergy(o){
 const carbs=n(o.carbs),protein=n(o.protein),fat=n(o.fat);
 if(![carbs,protein,fat].every(x=>between(x,0,1500)))return error('Completa carbohidratos, proteínas y grasas (gramos en la porción consumida).');
 const kcal=carbs*4+protein*4+fat*9;
 return ok(kcal,'kcal estimadas','Energía calculada por macronutrientes (factores generales 4–4–9)',
 ['No equivale necesariamente a la etiqueta de alimentos: fibra, polioles, alcohol, digestibilidad y redondeos pueden modificar el valor.',
 'La energía de una comida NO define el requerimiento de un niño. Revisar edad, actividad, crecimiento y dietas terapéuticas.'],
 'Carbohidratos '+carbs+'×4 + proteína '+protein+'×4 + grasas '+fat+'×9 = '+kcal.toFixed(1)+' kcal.');
}
function doseCeil(o){
 const w=n(o.weight),mg=n(o.dose),freq=n(o.frequency),maxSingle=n(o.maxSingle),maxDay=n(o.maxDaily);
 if(!between(w,.4,200)||!between(mg,0.001,100000)||!Number.isInteger(freq)||!between(freq,1,24)||!between(maxSingle,0.001,100000)||!between(maxDay,0.001,100000))
  return error('Ingresa peso, dosis propuesta (mg/dosis), administraciones/24 h y dos límites verificados del mismo medicamento y vía.');
 const daily=mg*freq,overOne=mg>maxSingle,overDay=daily>maxDay;
 return ok(mg/w,'mg/kg/dosis',overOne||overDay?'ALERTA: supera uno o ambos máximos introducidos':'No excede los máximos introducidos; NO equivale a dosis correcta o segura.',
 ['Debes obtener topes verificados para el MEDICAMENTO, INDICACIÓN, EDAD, VÍA y PRESENTACIÓN concretos antes de ingresarlos.',
 'Esta herramienta NO tiene base propia de dosis máximas ni valida que el fármaco esté indicado; un resultado bajo el límite no autoriza administrarlo.',
 'Considerar peso de dosificación, insuficiencia renal/hepática, alergias, interacciones, concentración mg/mL, prematuridad y validación de Farmacia.'],
 'Propuesta '+mg+' mg/dosis × '+freq+' = '+daily+' mg/24h ('+(daily/w).toFixed(2)+' mg/kg/día). Límite/dosis '+maxSingle+' mg '+(overOne?'EXCEDIDO':'sin superar')+'; máximo/24h '+maxDay+' mg '+(overDay?'EXCEDIDO':'sin superar')+'.',
 {display:overOne||overDay?'⚠ Supera máximo':'Revisión aritmética'});
}
const routes={
 standard:['Solución isotónica estándar: la administración suele ser periférica cuando hay indicación y presentación autorizada; no verificar únicamente osmolaridad.','Confirmar producto, velocidad, balance, aditivos y sitio de punción según protocolo.'],
 highpn:['Nutrición parenteral de alta osmolaridad: en general requiere vía central.','ESPGHAN recomienda PN periférica de corta duración solo con osmolaridad final <900 mOsm/L; no usar ese valor para autorizar otros medicamentos.'],
 hypertonic:['Soluciones concentradas de sodio o glucosa: mayor riesgo local y sistémico.','Debe verificarse concentración final, dilución aprobada, osmolaridad real, indicación y vía según protocolo; no infundir concentrados directamente.'],
 vesicant:['Medicamentos vesicantes/irritantes: el riesgo de extravasación puede requerir acceso central según fármaco y protocolo.','No hay una clasificación universal solo por nombre; comprobar ficha técnica específica, diluyente, concentración, velocidad y monitorización.'],
 vasoactive:['Fármacos vasoactivos: protocolos de emergencia pueden permitir temporalmente accesos periféricos vigilados en situaciones concretas.','No interrumpir tratamiento urgente por esta ficha ni asumir que todos los casos exigen vía central; seguir protocolo de UCI/urgencias.']
};
function access(o){
 const it=routes[o.context];if(!it)return error('Selecciona el tipo de infusión a revisar.');
 return ok(0,'',it[0],
 [it[1],'Esta ficha NO aprueba ni prohíbe automáticamente una vía: verificar orden médica, farmacia, estabilidad y compatibilidad con protocolo local.','En niños, la fragilidad de vasos y el riesgo de lesión por extravasación requieren valoración continua.'],
 'Consulta orientativa de tipo de solución y acceso venoso; no reemplaza ficha técnica o política de infusión del hospital.',{display:'Valorar acceso'});
}
function supplements(o){
 const months=n(o.months);
 if(!Number.isInteger(months)||!between(months,0,11)||!['breast','mixed','formula'].includes(o.feeding)||!['true','false'].includes(o.preterm))return error('Selecciona edad, patrón de alimentación y antecedente de prematuridad.');
 const notes=[
 'AAP lactancia 2022: valorar vitamina D 400 UI/día en lactantes con ingesta de fórmula enriquecida insuficiente, especialmente con lactancia materna total o parcial; comprobar las recomendaciones actualizadas e ingesta real.',
 'AAP 2026: en lactantes de término exclusivamente amamantados, revisar riesgo y prevención de déficit de hierro desde los 4 meses; el manejo puede variar según introducción de alimentos ricos en hierro.',
 'No indicar hierro, vitamina D, fortificadores o suplementos en cantidad personalizada sin verificar peso, edad, dieta total, formulación y condiciones clínicas.',
 o.preterm==='true'?'Antecedente de prematuridad: los requerimientos y estrategias de hierro, proteína y fortificación son específicos de neonatología.':'Evaluar crecimiento, exposición alimentaria, signos clínicos y guías locales.'
 ];
 return ok(0,'','Ficha para revisión de suplementos; no es prescripción',notes,
 'Edad '+months+' meses; alimentación '+({breast:'lactancia materna',mixed:'mixta',formula:'fórmula'}[o.feeding])+'.', {display:'Revisar contexto'});
}
const funcs=Object.freeze({
 pedinsensible:insensible,pedgir:gir,pedsolutions:solution,pedvitals:vitalSigns,
 pedformulavol:formulaVolume,pedmilkcal:milkEnergy,pedfoodcal:foodEnergy,
 pedmaxverify:doseCeil,pedaccess:access,pedsupp:supplements
});
root.KidBumWard=Object.freeze({ids:Object.freeze(Object.keys(funcs)),calculate:(id,o)=>funcs[id]?funcs[id](o||{}):error('Herramienta no disponible'),_reference:{vital}});
})(typeof globalThis!=='undefined'?globalThis:this);
