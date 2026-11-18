/* KidBum Algoritmos Pediátricos v0.10.51
 * Four purpose-built clinical decision aids with explicit scope and source links.
 * Educational triage support, NOT a diagnostic engine, dose calculator or medical order.
 * Graphs are deterministic, local-only, and fail closed to an in-person assessment.
 */
(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
root.KidBumPediatricAlgorithms=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const ALGORITHMS=[
{
 id:'diarrea',icon:'💧',category:'Gastroenterología',title:'Diarrea y deshidratación',subtitle:'Identificar choque, deshidratación y capacidad para beber',scope:'Niños de 2 meses a menores de 5 años; no sustituye valoración de otras causas de diarrea.',start:'danger',time:'3 decisiones',urgency:'prioritaria',
 sources:[
  {label:'IMSS · GPC 156-08 (guía mexicana; comprobar actualización institucional)',url:'https://www.imss.gob.mx/node/85161',year:'versión histórica'},
  {label:'NICE CG84 · gastroenteritis en menores de 5 años',url:'https://www.nice.org.uk/guidance/cg84/chapter/Recommendations',year:'2009, consultar vigencia'}
 ],
 nodes:{
  danger:{question:'¿Hay datos de choque, deshidratación grave o alteración marcada de conciencia?',hint:'Buscar mala perfusión, pulsos débiles, incapacidad de responder, deterioro hemodinámico o signos clínicos graves.',choices:[{label:'Sí · signos graves',next:'emergency',tone:'danger'},{label:'No se identifican',next:'scope'},{label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
  scope:{question:'¿El niño tiene entre 2 meses y menos de 5 años?',hint:'Esta ruta simplificada no sirve para recién nacidos ni para adolescentes.',choices:[{label:'Sí',next:'dehydration'},{label:'No / no sé',next:'outside',tone:'warning'}]},
  dehydration:{question:'¿Hay signos de deshidratación?',hint:'Valorar sed, ojos hundidos, mucosas, diuresis, estado general, llenado capilar y turgencia en conjunto; un signo aislado no determina gravedad.',choices:[{label:'Sí',next:'oral'},{label:'No',next:'no-dehydration'},{label:'Evaluación incierta',next:'assess',tone:'warning'}]},
  oral:{question:'¿Tolera suero oral y puede beber sin dificultad importante?',hint:'Vómitos persistentes, imposibilidad de beber o deterioro requieren valoración y posible vía enteral/IV hospitalaria.',choices:[{label:'Sí · tolera',next:'rehydrate'},{label:'No · no tolera',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  emergency:{tone:'danger',title:'🚨 Reanimación y atención hospitalaria urgente',summary:'La sospecha de choque o deshidratación grave exige atención presencial inmediata; no retrasar la estabilización para completar el algoritmo.',actions:['Activar apoyo y evaluación ABCDE con monitorización y acceso vascular según protocolo.','Valorar perfusión y estado neurológico de forma seriada; plan de reanimación/reemplazo según gravedad y recursos.','Determinar causa de la diarrea y descartar infección invasiva u otro abdomen agudo.']},
  outside:{tone:'warning',title:'No aplicar este algoritmo a esa edad',summary:'La ruta de IMSS elegida aborda de 2 meses a menores de 5 años.',actions:['Aplicar protocolo de edad correspondiente.','Neonatos o lactantes pequeños sintomáticos requieren umbral bajo de valoración urgente.']},
  'no-dehydration':{tone:'support',title:'Sin deshidratación clínica identificada',summary:'Si la evaluación presencial confirma ausencia de signos de alarma: prevención de deshidratación y vigilancia.',actions:['Continuar alimentación y lactancia habitual según tolerancia.','Ofrecer solución de rehidratación oral; explicar signos de alarma, diuresis y cuándo regresar.','Reevaluar si aparecen sangre en heces, fiebre importante, menor ingesta o empeoramiento.']},
  rehydrate:{tone:'warning',title:'Rehidratación oral supervisada y reevaluación',summary:'Con deshidratación no grave y capacidad de beber, valorar un plan de rehidratación oral con vigilancia.',actions:['Aplicar esquema de rehidratación oral específico de la guía y del grado de deshidratación.','Reevaluar estado general, perfusión, diuresis y tolerancia; escalar si fracasa.','No asumir que puede darse de alta hasta confirmar respuesta y condiciones de seguimiento.']},
  assess:{tone:'warning',title:'Valoración presencial / hospitalaria',summary:'Los signos de deshidratación o la tolerancia no pueden clasificarse con seguridad.',actions:['Valorar ABCDE, signos vitales, hidratación y diagnóstico alternativo.','Si no tolera la vía oral, considerar alternativas enterales/IV según gravedad y protocolo.','Mantener reevaluación; no convertir incertidumbre en clasificación de bajo riesgo.']}
 }
},
{
 id:'bronquiolitis',icon:'🫁',category:'Neumología',title:'Bronquiolitis',subtitle:'Apnea, dificultad respiratoria, alimentación y referencia',scope:'Habitualmente menores de 2 años con síndrome clínico compatible. El diagnóstico es clínico.',start:'danger',time:'3 decisiones',urgency:'prioritaria',
 sources:[{label:'NICE NG9 · bronquiolitis infantil; recomendaciones sobre oxígeno y referencia',url:'https://www.nice.org.uk/guidance/ng9/chapter/Recommendations',year:'2015, actualización 2021'}],
 nodes:{
  danger:{question:'¿Hay apnea, cianosis central, agotamiento o dificultad respiratoria intensa?',hint:'La apnea puede ser referida por cuidadores. Buscar quejido, retracciones intensas, alteración de alerta y fracaso respiratorio inminente.',choices:[{label:'Sí · peligro',next:'emergency',tone:'danger'},{label:'No',next:'scope'},{label:'No es claro',next:'refer',tone:'warning'}]},
  scope:{question:'¿Es un menor de 2 años con cuadro compatible de bronquiolitis?',hint:'En episodios recurrentes de sibilancias o niño mayor, considerar otros diagnósticos como asma; evaluar diferencial.',choices:[{label:'Sí',next:'risk'},{label:'No / no estoy seguro',next:'outside',tone:'warning'}]},
  risk:{question:'¿Hay hipoxemia, mala ingesta, deshidratación o alto riesgo?',hint:'Considerar edad muy pequeña, prematurez, cardiopatía, enfermedad pulmonar o inmunodeficiencia. Confirmar SpO₂ con técnica adecuada; umbrales dependen de edad y comorbilidad.',choices:[{label:'Sí / es probable',next:'refer',tone:'warning'},{label:'No · evaluación tranquilizadora',next:'support'},{label:'Dato desconocido',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  emergency:{tone:'danger',title:'🚨 Estabilización respiratoria inmediata',summary:'Apnea, cianosis, fatiga marcada o dificultad respiratoria grave requieren atención hospitalaria urgente.',actions:['Activar evaluación ABCDE, oxigenación y soporte respiratorio según gravedad.','Monitorización continua y reevaluar riesgo de falla respiratoria; solicitar pediatría/terapia intensiva si corresponde.','No retrasar la referencia por radiografías o pruebas virales rutinarias.']},
  refer:{tone:'warning',title:'Evaluación hospitalaria prioritaria',summary:'La hipoxemia, la incapacidad de alimentarse, los signos de deshidratación o los factores de riesgo modifican la indicación de ingreso.',actions:['Verificar saturación y esfuerzo respiratorio, ingesta e hidratación.','Usar criterios de referencia/ingreso NICE NG9 ajustados a edad y comorbilidades.','Si se requiere soporte, titular oxígeno y vía de hidratación conforme a protocolo.']},
  assess:{tone:'warning',title:'Evaluación clínica incompleta',summary:'Sin una medida fiable de saturación y una valoración de ingesta y esfuerzo, no se puede concluir bajo riesgo.',actions:['Completar valoración presencial y medir SpO₂ en segundo nivel si está indicado.','Mantener vigilancia y revisar factores de riesgo antes de decidir destino.']},
  outside:{tone:'warning',title:'Confirmar diagnóstico diferencial',summary:'El patrón clínico no encaja claramente con el ámbito de bronquiolitis.',actions:['Valorar asma, neumonía, cuerpo extraño, cardiopatía u otras causas según historia y exploración.','Escalar si existe insuficiencia respiratoria o duda sobre gravedad.']},
  support:{tone:'support',title:'Manejo de sostén con seguimiento',summary:'En bronquiolitis leve, la base del manejo es apoyo y vigilancia, siempre tras evaluación clínica.',actions:['Favorecer alimentación e hidratación; aspiración nasal superficial si secreciones dificultan tomas.','No indicar rutinariamente broncodilatadores, corticoides ni antibióticos por la sola bronquiolitis.','Dar signos de alarma: apnea, cianosis, agotamiento, menor alimentación, deshidratación o empeoramiento.']}
 }
},
{
 id:'sepsis',icon:'🚨',category:'Urgencias',title:'Sepsis y choque séptico',subtitle:'Reconocimiento, primera hora y escalamiento inmediato',scope:'Lactantes mayores, niños y adolescentes; neonatos requieren además protocolo neonatal específico.',start:'shock',time:'2 decisiones',urgency:'crítica',
 sources:[{label:'Surviving Sepsis Campaign · recomendaciones pediátricas 2026',url:'https://www.survivingsepsis.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-the-management-of-sepsis-and-septic-shock-in',year:'2026'}],
 nodes:{
  shock:{question:'¿Hay infección sospechada y datos de choque o hipoperfusión?',hint:'Perfusión deficiente, llenado capilar alterado, extremidades frías, pulsos anómalos, cambio de conciencia u oliguria. La presión normal NO excluye choque compensado.',choices:[{label:'Sí · choque probable',next:'emergency',tone:'danger'},{label:'No evidente',next:'probable'},{label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
  probable:{question:'¿Hay sepsis probable o disfunción orgánica asociada a infección?',hint:'Valorar estado neurológico, respiratorio, hemodinámico y laboratorios según contexto; no esperar a cumplir puntuaciones para valorar/tratar.',choices:[{label:'Sí · sepsis probable',next:'sepsis-evaluation',tone:'warning'},{label:'No / diagnóstico alterno',next:'reassess'},{label:'Datos insuficientes',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  emergency:{tone:'danger',title:'🚨 Activar protocolo de choque séptico YA',summary:'Sospecha clínica de choque séptico: estabilización inmediata y antimicrobianos idealmente durante la primera hora desde el reconocimiento.',actions:['Activar equipo de reanimación/pediatría; ABCDE, acceso, lactato y cultivos si no retrasan antibióticos.','Iniciar tratamiento antimicrobiano empírico según foco, epidemiología y protocolo institucional.','La reanimación con cristaloides depende de disponibilidad de cuidados intensivos y de hipotensión; reevaluar tras CADA bolo y suspender ante sobrecarga.','Escalar precozmente soporte vasoactivo/terapia intensiva si persiste hipoperfusión. No administrar fluidos con una regla única para todos los contextos.']},
  'sepsis-evaluation':{tone:'warning',title:'Evaluación urgente de sepsis probable',summary:'Sin choque, la SSC 2026 sugiere una investigación rápida y, si se mantiene la sospecha de sepsis, antimicrobianos idealmente antes de 3 horas.',actions:['Valorar disfunción orgánica y medir lactato en sepsis probable según guía.','Tomar cultivos cuando sea posible sin demorar tratamiento necesario.','Reevaluar repetidamente; si surge hipoperfusión o choque, pasar de inmediato a vía crítica.','Buscar foco y determinar necesidad de ingreso, observación o interconsulta.']},
  assess:{tone:'warning',title:'No clasificar como riesgo bajo',summary:'La información es insuficiente para determinar perfusión o disfunción orgánica.',actions:['Realizar evaluación ABCDE y perfusión presencial de inmediato.','Si hay sospecha fuerte de choque, activar manejo urgente sin esperar más preguntas.']},
  reassess:{tone:'warning',title:'Sepsis NO descartada por este flujo',summary:'Esta ruta breve no es una prueba diagnóstica ni un sistema de exclusión.',actions:['Completar evaluación clínica, diferenciales y vigilancia apropiada.','Escalar de inmediato ante deterioro, nuevos datos de disfunción orgánica o perfusión alterada.']}
 }
},
{
 id:'ictericia',icon:'👶',category:'Neonatología',title:'Ictericia neonatal',subtitle:'Edad gestacional, horas de vida, bilirrubina y neurotoxicidad',scope:'Recién nacidos de al menos 35 semanas de gestación; no extrapolar umbrales a menores de 35 semanas.',start:'danger',time:'3 decisiones',urgency:'prioritaria',
 sources:[{label:'AAP · hiperbilirrubinemia neonatal ≥35 semanas; GPC 2022',url:'https://www.aap.org/en/patient-care/hyperbilirubinemia/',year:'2022, vigente según AAP hasta agosto de 2027'}],
 nodes:{
  danger:{question:'¿Hay signos neurológicos de alarma o ictericia en las primeras 24 horas?',hint:'Alteración de conciencia, succión débil marcada, cambios del tono o llanto agudo sugieren posible enfermedad grave. Ictericia antes de 24 h exige evaluación inmediata por posible hemólisis.',choices:[{label:'Sí · alarma',next:'emergency',tone:'danger'},{label:'No identificados',next:'scope'},{label:'No sé',next:'assess',tone:'warning'}]},
  scope:{question:'¿Nació con al menos 35 semanas de gestación?',hint:'La guía AAP 2022 de umbrales de fototerapia y exanguinotransfusión aplica desde 35 semanas.',choices:[{label:'Sí · ≥35 semanas',next:'lab'},{label:'No · <35 semanas',next:'outside',tone:'warning'},{label:'Se desconoce',next:'assess',tone:'warning'}]},
  lab:{question:'¿Tienes bilirrubina sérica TOTAL y edad posnatal exacta en horas?',hint:'Para decidir tratamiento también necesitas semanas gestacionales y factores de riesgo de neurotoxicidad. No estimar bilirrubina a partir de las zonas de Kramer.',choices:[{label:'Sí · datos completos',next:'compare'},{label:'No · faltan datos',next:'measure',tone:'warning'}]}
 },
 outcomes:{
  emergency:{tone:'danger',title:'🚨 Evaluación neonatal urgente',summary:'Signos neurológicos compatibles con encefalopatía o ictericia en las primeras 24 horas requieren evaluación hospitalaria sin demora.',actions:['Explorar estado neurológico, alimentación, signos de hemólisis e infección.','Medir bilirrubina sérica total y aplicar protocolo de escalamiento según edad y riesgo.','No determinar necesidad de fototerapia solo por apariencia o escala de Kramer.']},
  outside:{tone:'warning',title:'Usar protocolo para prematuros <35 semanas',summary:'La curva AAP 2022 para ≥35 semanas no debe extrapolarse a prematuros más inmaduros.',actions:['Consultar guía neonatal institucional para edad gestacional real.','Monitorizar y considerar valoración por neonatología.']},
  assess:{tone:'warning',title:'Completar información o valorar urgencia',summary:'Si hay duda sobre signos neurológicos o edad gestacional, no se puede interpretar con seguridad.',actions:['Evaluación clínica neonatal presencial.','Comprobar antecedentes obstétricos y estudios pertinentes.']},
  measure:{tone:'warning',title:'Medir bilirrubina y precisar las horas de vida',summary:'La inspección visual no sustituye una medición cuando se requiere tomar decisiones terapéuticas.',actions:['Solicitar bilirrubina sérica total cuando esté indicada por cribado/medición transcutánea y contexto.','Registrar edad en horas, semanas de gestación y factores de riesgo de neurotoxicidad.','Revisar umbral por gráfico AAP específico y organizar seguimiento.']},
  compare:{tone:'warning',title:'Comparar con la curva AAP correspondiente',summary:'La indicación de fototerapia, escalamiento o seguimiento depende de bilirrubina TOTAL, edad en horas, semanas y factores de neurotoxicidad.',actions:['Consultar nomograma oficial AAP 2022 y usar línea apropiada para edad gestacional/riesgos.','Determinar necesidad de confirmar con bilirrubina sérica, fototerapia, escalamiento o control según distancia al umbral.','Este módulo NO calcula ni valida umbrales terapéuticos.']}
 }
}
];
const byId=Object.freeze(Object.fromEntries(ALGORITHMS.map(a=>[a.id,a])));
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim();
function search(query='',category='all'){
 const q=normalize(query);
 return ALGORITHMS.filter(a=>(category==='all'||a.category===category)&&(!q||normalize(a.title+' '+a.subtitle+' '+a.category).includes(q)));
}
function getStep(id,nodeId){
 const a=byId[id];if(!a)return null;
 const node=nodeId||a.start;
 return a.nodes[node]?{kind:'question',data:a.nodes[node],id:node}:a.outcomes[node]?{kind:'outcome',data:a.outcomes[node],id:node}:null;
}
function transition(id,nodeId,choiceIndex){
 const step=getStep(id,nodeId);
 if(!step||step.kind!=='question'||!Number.isInteger(choiceIndex))return null;
 const next=step.data.choices[choiceIndex]?.next;
 return next&&getStep(id,next)?next:null;
}
function validate(){
 const errors=[];
 for(const a of ALGORITHMS){
  const visited=new Set(),walk=(id)=>{
   if(visited.has(id))return;
   visited.add(id);
   const step=getStep(a.id,id);
   if(!step){errors.push(a.id+': missing '+id);return;}
   if(step.kind==='question'){
    if(step.data.choices.length<2)errors.push(a.id+': too few choices');
    for(const c of step.data.choices)walk(c.next);
   }
  };
  if(!a.scope||!a.sources.length)errors.push(a.id+': missing source or scope');
  walk(a.start);
  for(const id of Object.keys(a.nodes).concat(Object.keys(a.outcomes)))if(!visited.has(id))errors.push(a.id+': unreachable '+id);
  for(const o of Object.values(a.outcomes))if(!Array.isArray(o.actions)||!o.actions.length||!o.summary)errors.push(a.id+': incomplete outcome');
 }
 return errors;
}
return Object.freeze({algorithms:Object.freeze(ALGORITHMS),byId,search,getStep,transition,validate,normalize,version:'0.10.51'});
});
