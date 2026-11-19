/* KidBum Pediatría 0.10.53 · Phase III clinical triage pathways.
 * New paths are danger-first, source-linked, with bounded 2–3 decisions.
 * Educational editorial structure; no dose, energy, fluid or discharge engine.
 */
(function(root){
'use strict';
const old=root.KidBumPediatricAlgorithms;
if(!old||old.version!=='0.10.52')throw Error('Se requiere KidBum Pediatría 0.10.52');
const NEW=[];
const SRC={
 pals:{label:'AHA/AAP · PALS 2025 (documento oficial)',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support',year:'2025'},
 bls:{label:'AHA/AAP · soporte vital básico pediátrico 2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',year:'2025'},
 aha:{label:'AHA · algoritmos pediátricos 2025 (consultar tablas originales)',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/',year:'2025'},
 nres:{label:'AHA/AAP · reanimación neonatal 2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation',year:'2025'},
 rresp:{label:'RCH · evaluación de gravedad respiratoria pediátrica',url:'https://www.rch.org.au/clinicalguide/guideline_index/assessment_of_severity_of_respiratory_conditions/',year:'consulta 2026; protocolo internacional'},
 oxygen:{label:'RCH · Oxygen delivery',url:'https://www.rch.org.au/rchcpg/hospital_clinical_guideline_index/oxygen_delivery/',year:'consulta 2026; protocolo de enfermería australiano'},
 uti:{label:'NICE NG224 · infección urinaria en menores de 16 años',url:'https://www.nice.org.uk/guidance/ng224/chapter/Recommendations',year:'2022'},
 meningitis:{label:'NICE NG240 · meningitis bacteriana y enfermedad meningocócica',url:'https://www.nice.org.uk/guidance/ng240/chapter/Recommendations',year:'2024'},
 neonatalInf:{label:'NICE NG195 · infección neonatal, prevención y tratamiento',url:'https://www.nice.org.uk/guidance/ng195',year:'2021; modificaciones hasta 2026'},
 neonatalGlu:{label:'RCH · hipoglucemia neonatal',url:'https://www.rch.org.au/rchcpg/hospital_clinical_guideline_index/Neonatal_hypoglycaemia/',year:'consulta 2026; guía australiana'},
 unwellNeonate:{label:'RCH · reconocimiento del neonato y lactante pequeño grave',url:'https://www.rch.org.au/clinicalguide/guideline_index/Recognition_of_the_seriously_unwell_neonate_and_young_infant/',year:'consulta 2026'},
 abdomen:{label:'RCH · dolor abdominal agudo pediátrico',url:'https://www.rch.org.au/clinicalguide/guideline_index/Abdominal_pain_-_acute/',year:'consulta 2026'},
 intuss:{label:'RCH · invaginación intestinal',url:'https://www.rch.org.au/clinicalguide/guideline_index/intussusception/',year:'consulta 2026'},
 sodium:{label:'NICE NG29 · líquidos y electrólitos IV pediátricos',url:'https://www.nice.org.uk/guidance/ng29/chapter/recommendations',year:'2015; consultar vigencia'},
 hypona:{label:'RCH · hiponatremia pediátrica',url:'https://www.rch.org.au/clinicalguide/guideline_index/Hyponatraemia/',year:'consulta 2026'},
 hyperna:{label:'RCH · hipernatremia pediátrica',url:'https://www.rch.org.au/clinicalguide/guideline_index/Hypernatraemia/',year:'consulta 2026'},
 aki:{label:'NICE NG148 · lesión renal aguda',url:'https://www.nice.org.uk/guidance/ng148/chapter/Recommendations',year:'2019'},
 neutro:{label:'RCH · fiebre con neutropenia sospechada/confirmada',url:'https://www.rch.org.au/clinicalguide/guideline_index/febrile_neutropenia/',year:'consulta 2026'}
};
function outcome(tone,title,summary,actions){return {tone,title,summary,actions};}
function simple(s){
 const {id,icon,category,title,subtitle,scope,urgent='prioritaria',sources,danger,hint,critical,screen,screenHint,yes,normal}=s;
 NEW.push({
  id,icon,category,title,subtitle,scope,urgency:urgent,time:'2 decisiones',sources:sources.map(x=>SRC[x]),start:'danger',
  nodes:{
   danger:{question:danger,hint,choices:[
    {label:'🚨 Sí · signos de peligro',next:'critical',tone:'danger'},
    {label:'No se identifican',next:'screen'},
    {label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
   screen:{question:screen,hint:screenHint,choices:[
    {label:'Sí · probable',next:'urgent',tone:'warning'},
    {label:'No · no parece presente',next:'evaluate'},
    {label:'No hay datos suficientes',next:'assess',tone:'warning'}]}
  },
  outcomes:{
   critical:outcome('danger',...critical),
   urgent:outcome('warning',...yes),
   evaluate:outcome('warning',...normal),
   assess:outcome('warning','⚠️ Evaluación clínica sin clasificación segura',
    'Los datos disponibles son insuficientes para considerar descartado un problema potencialmente grave.',
    ['Realizar valoración presencial de vía aérea, respiración, circulación, conciencia y signos vitales según contexto.',
     'Si aparecen inestabilidad o nuevos signos de alarma, activar la ruta de urgencias sin continuar el cuestionario.'])
  }
 });
}
simple({
 id:'abcde-pediatrico',icon:'🔺',category:'Urgencias',title:'ABCDE del niño crítico',
 subtitle:'Reconocimiento inmediato y prioridades de estabilización',
 scope:'Lactantes fuera del periodo de reanimación al nacer, niños y adolescentes. Herramienta de evaluación inicial, no sustituto de PALS ni del Triángulo de Evaluación Pediátrica.',
 urgent:'crítica',sources:['pals','rresp'],
 danger:'¿El niño está inconsciente, presenta apnea, cianosis, convulsión activa o signos de choque?',
 hint:'El Triángulo de Evaluación Pediátrica (apariencia, trabajo respiratorio, circulación cutánea) permite identificar gravedad desde la puerta. Actuar antes de completar la historia.',
 critical:['🚨 Reanimación ABCDE inmediata',
 'Aspecto crítico: pedir ayuda y abordar problemas vitales de manera simultánea.',
 ['Activar equipo de urgencias pediátricas, asegurar permeabilidad de vía aérea y comprobar respiración/oxigenación y perfusión.',
 'Tratar amenazas reversibles según PALS y protocolo hospitalario; monitorización, acceso vascular y glucemia cuando corresponda.',
 'Si no respira normalmente o no hay pulso, comenzar inmediatamente soporte vital pediátrico.']],
 screen:'¿Hay alteración de cualquiera de los componentes del ABCDE o del TEP, aunque los signos vitales sean conservados?',
 screenHint:'A: obstrucción. B: dificultad/falla respiratoria. C: perfusión. D: conciencia/glucosa. E: temperatura, lesiones y exposición sin perder calor.',
 yes:['⚠️ Abordaje sistemático y reevaluación continua',
 'La alteración focal de A, B, C, D o E requiere intervención dirigida, búsqueda de causa y vigilancia de respuesta.',
 ['Priorizar vía aérea/ventilación/perfusión antes de pruebas complementarias.',
 'Repetir TEP/ABCDE después de cada intervención; escalar cuando el paciente se deteriora o no responde.']],
 normal:['Vigilancia clínica, no exclusión de enfermedad',
 'Una evaluación inicial tranquilizadora no sustituye signos vitales seriados ni anamnesis/exploración.',
 ['Investigar motivo de consulta y signos de alarma particulares.',
 'Reevaluar ante cualquier cambio de conducta, respiración o perfusión; documentar criterios de seguimiento.']]
});
NEW.push({
 id:'paro-pediatrico',icon:'❤️‍🩹',category:'Urgencias',title:'Paro cardiorrespiratorio · PALS',
 subtitle:'RCP inmediata, ritmo desfibrilable y no desfibrilable',
 scope:'Lactantes fuera de sala de partos, niños y adolescentes. Para recién nacidos al nacimiento aplicar algoritmo neonatal AHA/AAP 2025, no PALS.',
 urgency:'crítica',time:'2 decisiones',sources:[SRC.pals,SRC.bls,SRC.aha],start:'danger',
 nodes:{
 danger:{question:'¿Está inconsciente, sin respiración normal y sin pulso confirmado en ≤10 segundos?',hint:'Si no se identifica pulso con certeza en un máximo de 10 segundos, iniciar RCP; solicitar ayuda/desfibrilador y ventilación apropiada. NO retrasar compresiones por esta app.',
 choices:[{label:'🚨 Sí / no hay pulso confirmado',next:'rhythm',tone:'danger'},{label:'Respira y tiene pulso',next:'pulse'},{label:'No es posible determinar pulso',next:'rhythm',tone:'danger'}]},
 rhythm:{question:'Con RCP YA en curso: ¿el monitor muestra fibrilación ventricular o taquicardia ventricular sin pulso?',hint:'RCP de alta calidad, oxigenación y acceso inmediato a monitor/desfibrilador. Esta pregunta clasifica ritmo, nunca autoriza detener RCP.',
 choices:[{label:'Sí · FV/TV sin pulso',next:'shock',tone:'danger'},{label:'No · asistolia/AESP',next:'nonshock',tone:'danger'},{label:'Aún no hay trazado',next:'unknown',tone:'danger'}]},
 pulse:{question:'¿Presenta bradicardia con mala perfusión o apnea pese a tener pulso?',hint:'Con pulso, evitar aplicar el algoritmo de desfibrilación; evaluar ventilación y posibles arritmias.',
 choices:[{label:'Sí · comprometido',next:'poor',tone:'danger'},{label:'No · perfusión adecuada',next:'assess',tone:'warning'}]}
 },
 outcomes:{
 shock:outcome('danger','🚨 Ritmo desfibrilable: RCP y desfibrilación','Continuar RCP de alta calidad y aplicar algoritmo PALS de FV/TV sin pulso con desfibrilación y medicamentos protocolizados.',
 ['Desfibrilar tan pronto esté indicado; reanudar inmediatamente RCP sin demoras evitables.',
 'Seguir ciclos de RCP y chequeo de ritmo; identificar causas reversibles. Energía y fármacos requieren tabla oficial PALS y equipo entrenado.']),
 nonshock:outcome('danger','🚨 Ritmo no desfibrilable: RCP y tratamiento','Asistolia/AESP no se desfibrila; mantener RCP, oxigenación adecuada y terapia del algoritmo oficial.',
 ['Administrar adrenalina conforme al protocolo PALS y priorizar su oportunidad en ritmos no desfibrilables.',
 'Reevaluar ritmo y causas reversibles durante RCP; no aplicar descargas por asistolia.']),
 unknown:outcome('danger','🚨 RCP mientras se obtiene monitorización','La incertidumbre del ritmo nunca debe frenar compresiones ni ventilación.',
 ['Pedir monitor/desfibrilador y ayuda avanzada; continuar RCP pediátrica de calidad.',
 'Al obtener trazado, clasificar como desfibrilable/no desfibrilable con el algoritmo AHA oficial.']),
 poor:outcome('danger','🚨 Pulso con compromiso: evaluar bradicardia','Mala perfusión con bradicardia y/o ventilación insuficiente requiere soporte inmediato y otra ruta PALS.',
 ['Optimizar ventilación/oxigenación, buscar causas reversibles y activar equipo de reanimación.',
 'Consultar algoritmo de bradicardia pediátrica con pulso; no desfibrilar por el solo hallazgo de bradicardia.']),
 assess:outcome('warning','Valorar causa clínica del episodio','Si hay pulso y ventilación efectiva no se cumple la definición de paro, pero aún puede existir enfermedad grave.',
 ['Realizar ABCDE, ECG/glucosa según el caso y vigilar tendencias.',
 'Si pierde pulso o respiración efectiva, iniciar RCP inmediatamente.'])
 }
});
simple({
 id:'bradicardia-pals',icon:'💓',category:'Urgencias',title:'Bradicardia pediátrica · PALS',
 subtitle:'Perfusión, ventilación y criterio de compresiones',
 scope:'Lactantes fuera de reanimación en sala de partos, niños y adolescentes con bradicardia y pulso. Neonatos al nacimiento: algoritmo neonatal separado.',
 urgent:'crítica',sources:['pals','aha'],
 danger:'¿Hay bradicardia con mala perfusión y frecuencia <60/min pese a oxigenación/ventilación efectivas?',
 hint:'PALS 2025: la frecuencia <60/min con signos de mala perfusión pese a oxigenación y ventilación adecuadas requiere compresiones. No esperar hipotensión tardía.',
 critical:['🚨 Iniciar RCP pediátrica conforme a PALS','Bradicardia grave con hipoperfusión pese a soporte respiratorio requiere compresiones inmediatas.',
 ['Activar reanimación, compresiones de alta calidad, ventilación y monitorización.',
 'Tratar causas reversibles y considerar adrenalina/otras medidas según tabla oficial PALS; no calcular dosis aquí.']],
 screen:'¿Hay bradicardia con perfusión anormal, apnea o signos de hipoxia?',
 screenHint:'Investigar hipoxia/ventilación deficiente, hipotermia, tóxicos, trastornos electrolíticos, bloqueo y enfermedad cardiaca.',
 yes:['⚠️ Priorizar oxigenación y corregir causa','Con pulso y bradicardia sintomática, valorar ABCDE, perfusión y respuesta a la ventilación.',
 ['Optimizar vía aérea, oxígeno y ventilación cuando corresponda; monitorizar ECG y presión arterial.',
 'Si FC <60/min con mala perfusión pese a ventilación/oxigenación adecuadas, pasar inmediatamente a compresiones PALS.']],
 normal:['Confirmar frecuencia esperada según edad','Una frecuencia baja aislada puede variar con edad, sueño, condición física y medicamentos; no equivale automáticamente a paro.',
 ['Obtener ECG, signos vitales y antecedentes según síntomas.',
 'Reevaluar si aparecen mala perfusión, síncope, apnea o deterioro.']]
});
simple({
 id:'taquicardia-pals',icon:'⚡',category:'Urgencias',title:'Taquicardia pediátrica · PALS',
 subtitle:'Con pulso: estabilidad hemodinámica y sospecha de arritmia',
 scope:'Niños fuera de periodo de reanimación neonatal y adolescentes con taquicardia Y pulso. Ante ausencia de pulso, usar algoritmo de paro; no extrapolar dosis/energía.',
 urgent:'crítica',sources:['pals','aha'],
 danger:'¿Hay taquicardia con pulso y compromiso grave: choque, conciencia alterada, hipotensión o insuficiencia cardiaca?',
 hint:'Valorar ECG y signos de perfusión. En arritmia inestable, no retrasar soporte por búsqueda extensa de causa.',
 critical:['🚨 Arritmia inestable: equipo avanzado','Si la taquiarritmia causa inestabilidad, priorizar tratamiento eléctrico sincronizado cuando esté indicado y soporte PALS.',
 ['Monitorizar, oxigenar si necesita, acceso IV/IO y preparar cardioversión sincronizada por equipo entrenado si se confirma taquiarritmia.',
 'Si el ritmo es irregular o de complejo ancho, pedir valoración experta inmediata; no aplicar algoritmo de taquicardia con pulso si está en paro.']],
 screen:'¿El ECG sugiere taquicardia súbita, regular y no sinusal (posible TSV) o complejo ancho?',
 screenHint:'Frecuencia sola no distingue taquicardia sinusal de supraventricular. Valorar comienzo, variabilidad, P, QRS, fiebre, dolor, deshidratación e hipoxia.',
 yes:['⚠️ Monitorizar y clasificar ritmo','Taquiarritmia estable requiere clasificación electrocardiográfica y tratamiento según duración, QRS y estabilidad.',
 ['Para TSV estable y regular, evaluar maniobras vagales apropiadas y tratamiento protocolizado por equipo entrenado.',
 'Complejo ancho, diagnóstico incierto o mala respuesta: interconsulta inmediata y preparación de escalamiento.']],
 normal:['Buscar causa de taquicardia sinusal','Fiebre, hipovolemia, dolor, anemia o hipoxia pueden explicar taquicardia sinusal, pero requieren evaluación específica.',
 ['Corregir la causa identificada y reevaluar frecuencia, perfusión y ECG.',
 'Si aparece inestabilidad, activar vía de taquiarritmia grave.']]
});
simple({
 id:'dificultad-respiratoria',icon:'🌬️',category:'Urgencias',title:'Dificultad respiratoria aguda',
 subtitle:'Falla respiratoria, estridor, sibilancias y compromiso de oxigenación',
 scope:'Niños y adolescentes; neonato inmediatamente después del parto requiere NRP. Esta es una ruta sindromática y no etiqueta etiología.',
 urgent:'crítica',sources:['rresp','pals'],
 danger:'¿Hay apnea, cianosis, agotamiento, alteración de conciencia o ventilación ineficaz?',
 hint:'Contar FR, observar trabajo respiratorio, entrada de aire, coloración y respuesta; el silencio auscultatorio con fatiga es de alarma.',
 critical:['🚨 Soporte de vía aérea y ventilación inmediato','La dificultad respiratoria se convirtió en falla respiratoria o amenaza vital; pedir apoyo experto.',
 ['ABCDE, posición y permeabilización de vía aérea, oxigenación y ventilación asistida según necesidad.',
 'Monitorizar, preparar escalamiento a soporte avanzado y tratar causa como anafilaxia, obstrucción, broncoespasmo o sepsis.']],
 screen:'¿Hay estridor en reposo, dificultad moderada/intensa, hipoxemia o aumento persistente del trabajo respiratorio?',
 screenHint:'Diferenciar obstrucción superior (estridor), inferior (sibilancias), parénquima (crepitantes) y causa neuromuscular/cardiaca. Saturación sola no mide ventilación.',
 yes:['⚠️ Evaluación hospitalaria y tratamiento dirigido','Dificultad importante o hipoxemia requiere valoración inmediata, soporte apropiado y vigilancia de respuesta.',
 ['Mantener al niño tranquilo, valorar oxigenación y trabajo respiratorio repetidamente; evitar agitación en obstrucción alta.',
 'Consultar vía etiológica (crup, asma, bronquiolitis, neumonía, anafilaxia) y escalar si no responde.']],
 normal:['Evaluación respiratoria y reevaluación','El esfuerzo respiratorio puede progresar aunque la exploración inicial no parezca grave.',
 ['Explorar frecuencia, saturación cuando esté indicada, entrada de aire e hidratación; buscar causa.',
 'Documentar signos de alarma y seguimiento, sin asumir alta por este resultado.']]
});
simple({
 id:'oxigenoterapia-escala',icon:'🫧',category:'Neumología',title:'Escalamiento del soporte respiratorio',
 subtitle:'Hipoxemia, respuesta a oxígeno y necesidad de soporte avanzado',
 scope:'Niños con enfermedad respiratoria bajo atención sanitaria; no usar umbrales genéricos para cardiopatía cianógena, hipercapnia crónica, prematuros o situaciones con metas especiales.',
 urgent:'crítica',sources:['oxygen','rresp'],
 danger:'¿Hay apnea, fracaso ventilatorio, agotamiento o hipoxemia importante pese al soporte disponible?',
 hint:'La saturación no reemplaza examen del esfuerzo ni ventilación; verificar la señal y el sensor. Ante falla ventilatoria, ofrecer soporte inmediato por equipo entrenado.',
 critical:['🚨 Escalar ventilación y pedir ayuda avanzada','La respuesta insuficiente al oxígeno o la incapacidad ventilatoria requiere abordaje urgente.',
 ['ABCDE, optimizar oxigenación y ofrecer ventilación asistida cuando esté indicada; activar UCI/anestesia pediátrica.',
 'La selección de cánula de alto flujo, presión positiva o intubación depende de evaluación, edad y protocolo especializado.']],
 screen:'¿Persiste hipoxemia o trabajo respiratorio pese a oxigenoterapia convencional?',
 screenHint:'Comprobar saturación real, dispositivo, flujo, respuesta, gasometría cuando proceda y signos de fatiga. Los objetivos de SpO₂ cambian por enfermedad.',
 yes:['⚠️ Reevaluar necesidad de soporte avanzado','Persistencia de hipoxemia o dificultad pese a soporte convencional exige evaluación hospitalaria y posible escalamiento.',
 ['Solicitar valoración de equipo con experiencia en alto flujo/CPAP/ventilación; no retrasar apoyo por trámites.',
 'Revisar objetivos de oxigenación del diagnóstico específico, trabajo respiratorio y respuesta seriada.']],
 normal:['Ajustar soporte al diagnóstico y vigilar','Mejoría de SpO₂ no equivale a resolución de la enfermedad; vigilar esfuerzo, alimentación y evolución.',
 ['Usar meta de saturación propia de la condición y titulación institucional apropiada.',
 'Reevaluar y escalar si aumenta el trabajo respiratorio o cae la oxigenación.']]
});
simple({
 id:'itu-pediatrica',icon:'🧫',category:'Infectología',title:'Infección urinaria pediátrica',
 subtitle:'Lactante pequeño, sepsis, toma de muestra y vías de estudio',
 scope:'Pacientes menores de 16 años con sospecha de ITU. Diferenciar neonatos, menores de 3 meses, antecedentes urológicos y pacientes con factores de riesgo de bacteriemia.',
 sources:['uti'],danger:'¿Hay choque, signos de sepsis, aspecto tóxico o menor de 3 meses con fiebre y deterioro?',
 hint:'Fiebre sin foco en lactantes pequeños puede ser ITU invasiva. Hipotensión es tardía; no confiar en tira reactiva para descartar infección grave.',
 critical:['🚨 Evaluar infección invasiva y tratar oportunamente','Lactante pequeño con sospecha de ITU o paciente séptico necesita valoración especializada inmediata.',
 ['Activar ABCDE y protocolo de sepsis; obtener muestras apropiadas si no retrasan antibióticos.',
 'Menores de 3 meses con ITU sospechada requieren valoración pediátrica y tratamiento conforme a guía especializada.']],
 screen:'¿Hay fiebre sin foco, disuria, polaquiuria, dolor lumbar o prueba de orina sugestiva?',
 screenHint:'Obtener muestra de orina apropiada antes de antibióticos si es posible y sin retrasar tratamiento urgente; la bolsa NO es apropiada para cultivo positivo confirmatorio.',
 yes:['⚠️ Obtener orina y confirmar ITU','Prueba y cultivo se interpretan según edad, calidad de muestra, síntomas y sospecha de pielonefritis.',
 ['Solicitar urianálisis y cultivo cuando indiquen las guías, con técnica de recolección adecuada.',
 'Valorar tratamiento específico, vía y necesidad de imagen o ingreso por edad, estado general y complicaciones.']],
 normal:['Considerar diagnóstico diferencial','Ausencia de síntomas urinarios en lactantes no descarta ITU; no etiquetar infección sin datos.',
 ['Reevaluar si persiste fiebre o existe foco no identificado; definir necesidad de muestra según edad.',
 'Considerar otras causas de fiebre/dolor y vigilar deterioro.']]
});
simple({
 id:'meningitis-pediatrica',icon:'🧠',category:'Infectología',title:'Sospecha de meningitis bacteriana',
 subtitle:'Púrpura, deterioro, antibióticos urgentes y punción lumbar segura',
 scope:'Niños y adolescentes con sospecha de meningitis o meningococemia. Neonatos y menores de 28 días exigen adicionalmente NICE NG195/protocolo neonatal.',
 urgent:'crítica',sources:['meningitis','neonatalInf'],
 danger:'¿Hay púrpura no blanqueable con compromiso, choque, convulsiones, conciencia alterada o deterioro rápido?',
 hint:'Rigidez de nuca puede faltar en lactantes. No retrasar antimicrobianos necesarios por imagen, punción lumbar o confirmación microbiológica.',
 critical:['🚨 Sepsis/meningitis: antibiótico inmediato y estabilización','Sospecha de infección invasiva con inestabilidad neurológica o hemodinámica necesita atención hospitalaria urgente.',
 ['ABCDE, cultivos de sangre si no generan demora y antibiótico empírico IV inmediato conforme a edad y guía local.',
 'Si hay signos de contraindicación de punción lumbar o inestabilidad, estabilizar y diferir el procedimiento; valorar UCI.']],
 screen:'¿Hay fiebre con cefalea intensa, fotofobia, rigidez, irritabilidad marcada o fontanela abombada?',
 screenHint:'Evaluar estado neurológico, petequias/púrpura, antecedentes de antibióticos, edad, vacunas y comorbilidades; meningitis puede presentarse sin combinación clásica.',
 yes:['⚠️ Evaluación hospitalaria urgente por posible meningitis','La sospecha clínica de meningitis bacteriana justifica pruebas y antimicrobianos tempranos, sin esperar signos completos.',
 ['Solicitar evaluación pediátrica/infectológica, hemocultivos y pruebas según gravedad; punción lumbar solo cuando sea segura.',
 'Administrar antimicrobianos con oportunidad según guía y vigilar progresión a sepsis o elevación de presión intracraneal.']],
 normal:['No excluir meningitis con reglas de síntomas','La ausencia de tríada clásica no descarta meningitis, especialmente en lactantes.',
 ['Valorar otras causas de fiebre y estado neurológico; reevaluar si persiste o progresa.',
 'Ante signos de infección sistémica o alteración neurológica, activar valoración urgente.']]
});

NEW.push({
 id:'reanimacion-neonatal',icon:'👶',category:'Neonatología',title:'Reanimación neonatal · NRP 2025',
 subtitle:'Pasos iniciales, ventilación efectiva y frecuencia cardiaca',
 scope:'Recién nacidos inmediatamente antes, durante y después del nacimiento. Es una ruta de reconocimiento, no sustituto de entrenamiento NRP ni protocolo de ventilación, oxígeno o compresiones.',
 urgency:'crítica',time:'2 decisiones',sources:[SRC.nres],start:'danger',
 nodes:{
  danger:{question:'Tras los pasos iniciales, ¿el recién nacido está en apnea/jadeo o tiene FC menor de 100/min?',
   hint:'Preparar equipo antes del parto. Control térmico, secar y estimular según edad gestacional; evaluar respiración y FC. La ventilación es la prioridad cuando no respira eficazmente.',
   choices:[{label:'🚨 Sí · iniciar ventilación efectiva',next:'ventilate',tone:'danger'},
    {label:'No · respira y FC adecuada',next:'transition'},
    {label:'No se puede determinar FC/respiración',next:'assess',tone:'warning'}]},
  ventilate:{question:'Tras al menos 30 segundos de ventilación efectiva, ¿la FC permanece por debajo de 60/min?',
   hint:'Antes de decidir compresiones asegurar movimiento torácico, sello de mascarilla y corrección de ventilación; una FC ascendente indica mejoría.',
   choices:[{label:'🚨 Sí · FC <60',next:'compressions',tone:'danger'},
    {label:'No · FC mejoró',next:'ventcheck',tone:'warning'},
    {label:'No se puede confirmar la respuesta',next:'assess',tone:'warning'}]},
  transition:{question:'¿Tiene esfuerzo respiratorio sostenido, buen tono y frecuencia adecuada?',
   hint:'Cianosis persistente, respiración trabajosa, prematurez y signos de transición anormal exigen evaluación especializada aunque FC sea adecuada.',
   choices:[{label:'Sí · transición adecuada',next:'routine'},
    {label:'No · dificultad o mala transición',next:'support',tone:'warning'},
    {label:'No fue posible evaluar',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  compressions:outcome('danger','🚨 Compresiones con ventilación efectiva · NRP','Si FC sigue <60 tras ventilación efectiva, se requiere el algoritmo NRP de compresiones coordinadas y manejo avanzado.',
   ['Activar reanimación neonatal avanzada; comprobar eficacia de ventilación y vía aérea; administrar oxígeno y compresiones según algoritmo oficial.',
    'Si no responde a la secuencia completa, considerar acceso y fármacos solo con dosis/vías específicas verificadas y equipo capacitado.']),
  ventcheck:outcome('warning','Ventilación y reevaluación cardiopulmonar','La FC ascendente es el mejor signo de ventilación efectiva, pero puede persistir apnea o dificultad respiratoria.',
   ['Continuar o retirar gradualmente soporte según FC, respiración, SpO₂ preductal y edad posnatal.',
    'Monitorizar temperatura, glucosa y riesgo neonatal; escalar si reaparece apnea o baja FC.']),
  routine:outcome('warning','Transición con vigilancia posnatal','Si respira, tiene buen tono y FC adecuada, continuar cuidados térmicos y vigilancia habitual acordes al riesgo.',
   ['Favorecer contacto y cuidados inmediatos cuando sean seguros, prevenir hipotermia.',
    'Reevaluar respiración, temperatura, alimentación y factores de riesgo; esta ruta no equivale a alta.']),
  support:outcome('warning','Soporte y observación neonatal','Un recién nacido que respira con FC adecuada puede requerir soporte por dificultad respiratoria o prematurez.',
   ['Valorar soporte respiratorio no invasivo apropiado y monitorización especializada; revisar preductal SpO₂ por minutos de vida.',
    'Descartar infección, neumotórax, cardiopatía y enfermedad pulmonar neonatal.']),
  assess:outcome('warning','Evaluar FC/ventilación sin demora','No conocer la FC o eficacia respiratoria impide clasificar con seguridad.',
   ['Asignar reanimador entrenado, auscultar FC y monitorizar según disponibilidad sin retrasar soporte necesario.',
    'Si apnea/jadeo o FC <100 se sospechan, activar vía de ventilación inmediatamente.'])
 }
});
simple({
 id:'hipoglucemia-neonatal',icon:'🍼',category:'Neonatología',title:'Hipoglucemia neonatal',
 subtitle:'Factores de riesgo, síntomas y glucosa por edad posnatal',
 scope:'Neonatos en el periodo de transición y días iniciales de vida, con decisiones según horas de nacimiento, prematuridad y síntomas. No extrapolar umbrales de niño mayor.',
 urgent:'crítica',sources:['neonatalGlu'],
 danger:'¿El recién nacido presenta convulsiones, apnea, conciencia alterada o mala perfusión con hipoglucemia sospechada?',
 hint:'Síntomas inespecíficos pueden ser también sepsis o asfixia. Tomar glucosa inmediatamente, pero no retrasar intervención urgente ante compromiso neurológico.',
 critical:['🚨 Corregir glucosa neonatal con supervisión','Hipoglucemia sintomática grave requiere intervención hospitalaria inmediata y búsqueda de causa.',
 ['ABCDE neonatal, glucemia urgente y soporte de glucosa parenteral según edad y protocolo si está sintomático o no alimenta con seguridad.',
 'Control glucémico seriado y evaluar sepsis, asfixia, alteración endocrina/metabólica y persistencia de hipoglucemia.']],
 screen:'¿Tiene glucosa baja según su edad posnatal o factores de riesgo como prematuridad, PEG o madre diabética?',
 screenHint:'Interpretar el valor según la hora posnatal, método de medición y síntomas. Repetir/confirmar resultados cuando corresponda; no usar cifra fija sin contexto.',
 yes:['⚠️ Protocolo neonatal de alimentación y control','Asintomáticos con riesgo o medición baja requieren manejo y controles según glucemia, horas de vida y capacidad de alimentación.',
 ['Valorar leche materna/alimentación y gel oral de dextrosa cuando el protocolo y presentación lo permitan, con reevaluación de glucemia.',
 'Persistencia, recurrencia, síntomas o dificultad para alimentarse requieren neonatología y tratamiento parenteral.']],
 normal:['Vigilancia según riesgo neonatal','Una medición aislada normal no elimina riesgo si persisten factores de riesgo o mala ingesta.',
 ['Asegurar alimentación efectiva, termorregulación y controles de glucosa según grupo de riesgo.',
 'Reevaluar de inmediato si aparece letargia, apnea, temblores persistentes o mala succión.']]
});
simple({
 id:'sepsis-neonatal',icon:'🦠',category:'Neonatología',title:'Sospecha de sepsis neonatal',
 subtitle:'Signos inespecíficos, riesgo materno y cultivos',
 scope:'Recién nacidos durante hospitalización neonatal o tras el alta inicial. Distinguir inicio temprano/tardío y protocolos de NICU; prematuros requieren especial valoración.',
 urgent:'crítica',sources:['neonatalInf','unwellNeonate'],
 danger:'¿Hay apnea, choque, fiebre/hipotermia con letargia, hipoxemia o alimentación muy deficiente?',
 hint:'Los neonatos pueden tener sepsis sin fiebre. La mala perfusión, apnea y cambios neurológicos son emergencia; hipoglucemia puede coexistir.',
 critical:['🚨 Sospecha de infección neonatal grave','Sepsis neonatal con compromiso requiere estabilización y antimicrobianos hospitalarios sin demora.',
 ['ABCDE neonatal, acceso, glucemia, termorregulación y monitorización; extraer hemocultivos si no retrasan antibióticos necesarios.',
 'Antimicrobianos IV empíricos según edad al inicio, epidemiología, resistencia local y protocolo NICU; valorar LCR cuando esté estabilizado.']],
 screen:'¿Existen factores maternos/perinatales, cultivos sugestivos o signos inespecíficos de infección?',
 screenHint:'Considerar infección materna, estreptococo B, rotura de membranas, prematuridad, cambios de temperatura, alimentación o respiración. NICE NG195 incluye actualizaciones de factores maternos en 2026.',
 yes:['⚠️ Evaluación neonatal y riesgo infeccioso','Un neonato con factores de riesgo o síntomas requiere evaluación protocolizada para posible infección de inicio temprano o tardío.',
 ['Consultar criterios NICE NG195 y norma hospitalaria para vigilancia, cultivo y tratamiento; no decidir antibióticos solo por una casilla.',
 'Monitorizar síntomas, temperatura, perfusión y alimentación; actuar urgente si deteriora.']],
 normal:['Observación clínica acorde a riesgo','La ausencia de un factor evidente no descarta infección neonatal.',
 ['Mantener vigilancia y revisión de antecedentes obstétricos, evolución, signos vitales e ingesta.',
 'Si aparecen apnea, letargia, alteraciones térmicas o respiratorias, acudir a evaluación inmediata.']]
});
simple({
 id:'apendicitis-pediatrica',icon:'🩻',category:'Gastroenterología',title:'Sospecha de apendicitis',
 subtitle:'Peritonitis, riesgo de perforación y ultrasonido',
 scope:'Niños y adolescentes con dolor abdominal agudo; apendicitis en menores de 5 años puede ser atípica, y el PAS existente no sustituye exploración ni imagen.',
 sources:['abdomen'],
 danger:'¿Hay abdomen rígido, rebote/peritonitis generalizada, choque o deterioro importante?',
 hint:'Pensar en perforación, sepsis o abdomen agudo quirúrgico. No retrasar valoración quirúrgica por escalas ni imagen si está inestable.',
 critical:['🚨 Abdomen agudo: cirugía pediátrica urgente','Sospecha de peritonitis/perforación o inestabilidad requiere intervención hospitalaria inmediata.',
 ['ABCDE y reanimación según perfusión; acceso venoso, ayuno y analgesia adecuada.',
 'Avisar cirugía pediátrica; antibióticos cuando estén indicados por sospecha de infección intraabdominal; imagen solo si no retrasa manejo.']],
 screen:'¿Hay dolor que migra a cuadrante inferior derecho, defensa localizada, fiebre o vómitos compatibles?',
 screenHint:'Examen seriado, dolor focal, síntomas y evolución; leucocitos/ANC y ecografía se interpretan con probabilidad preprueba. Dolor atípico en pequeños.',
 yes:['⚠️ Evaluación quirúrgica e imagen según riesgo','Hallazgos compatibles requieren exploración pediátrica, estratificación y ecografía cuando esté indicada.',
 ['Analgesia, hidratación guiada, evaluación de signos vitales y consulta o interconsulta de cirugía.',
 'No basar descarte ni cirugía exclusivamente en PAS; observación seriada o imágenes complementarias según contexto.']],
 normal:['Diagnóstico diferencial y reevaluación abdominal','La ausencia de presentación clásica no descarta apendicitis, especialmente en niños pequeños.',
 ['Valorar invaginación, infección urinaria, gastroenteritis, torsión gonadal/ovárica y otras urgencias.',
 'Reevaluar el abdomen y advertir retorno inmediato por aumento de dolor, vómito bilioso o deterioro.']]
});
simple({
 id:'obstruccion-invaginacion',icon:'🌀',category:'Gastroenterología',title:'Vómito bilioso e invaginación',
 subtitle:'Obstrucción intestinal, dolor episódico y urgencia quirúrgica',
 scope:'Lactantes y niños con vómitos o episodios de dolor abdominal. En recién nacidos el vómito bilioso obliga a descartar malrotación/vólvulo: ruta quirúrgica urgente específica.',
 urgent:'crítica',sources:['intuss','abdomen'],
 danger:'¿Hay vómito verde bilioso, choque, distensión marcada con peritonitis o mala perfusión?',
 hint:'El vómito verde bilioso es obstrucción hasta demostrar lo contrario, incluso en neonatos. La tríada clásica de invaginación puede estar incompleta.',
 critical:['🚨 Sospecha de obstrucción o isquemia intestinal','Vómito bilioso y/o inestabilidad requieren evaluación quirúrgica urgente, no manejo de gastroenteritis simple.',
 ['Ayuno, ABCDE, acceso vascular y líquidos según perfusión; avisar cirugía pediátrica inmediatamente.',
 'Ecografía/imagen según edad y estabilidad; la reducción por enema no es apropiada en peritonitis, shock o perforación.']],
 screen:'¿Hay dolor paroxístico con palidez/letargia, flexión de piernas o episodios de llanto inconsolable?',
 screenHint:'Considerar invaginación incluso si no hay sangre en heces, una manifestación tardía. En intercrisis el niño puede parecer mejor.',
 yes:['⚠️ Ecografía y valoración urgente por invaginación','La sospecha clínica de invaginación merece diagnóstico rápido y colaboración con cirugía/radiología.',
 ['Solicitar ecografía por personal entrenado y consultar cirugía pediátrica; mantener ayuno y vigilancia.',
 'Valorar reducción por enema solo en condiciones apropiadas, tras excluir peritonitis, shock o perforación.']],
 normal:['Reevaluar otras causas de vómitos y dolor','Ausencia del patrón paroxístico no elimina obstrucción, infección o enfermedad quirúrgica.',
 ['Buscar bilis verde, distensión, alteración perfusional o empeoramiento de dolor en reevaluaciones.',
 'Valorar hidratación, edad y diagnósticos alternativos; si aparece vómito bilioso referir inmediatamente.']]
});
NEW.push({
 id:'trastornos-sodio',icon:'🧂',category:'Hospitalización',title:'Trastornos del sodio',
 subtitle:'Síntomas neurológicos y distinción hipo/hipernatremia',
 scope:'Niños hospitalizados con natremia medida. Excluye cálculo de solución, velocidad de corrección, natremia en hiperglucemia sin ajuste y manejo especializado de CAD.',
 urgency:'crítica',time:'2 decisiones',sources:[SRC.sodium,SRC.hypona,SRC.hyperna],start:'danger',
 nodes:{
  danger:{question:'¿Hay convulsión, alteración aguda de conciencia o deterioro neurológico con sodio alterado?',
   hint:'La hiponatremia sintomática grave puede necesitar solución hipertónica urgente; la hipernatremia grave requiere manejo especializado. Confirmar glucosa y valorar osmolaridad.',
   choices:[{label:'🚨 Sí · encefalopatía / crisis',next:'critical',tone:'danger'},
    {label:'No · aparentemente estable',next:'classify'},
    {label:'Se desconoce',next:'assess',tone:'warning'}]},
  classify:{question:'¿Cómo está el sodio plasmático, interpretado con glucosa y estado hídrico?',
   hint:'Distinguir hipo e hipernatremia, tiempo de evolución, volumen circulante y pérdidas. No corregir rápido ni establecer fórmula sin análisis de causa.',
   choices:[{label:'Hiponatremia',next:'hypo',tone:'warning'},
    {label:'Hipernatremia',next:'hyper',tone:'warning'},
    {label:'Valor no fiable / aún no disponible',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  critical:outcome('danger','🚨 Disnatremia neurológicamente sintomática','Se requiere manejo urgente en entorno monitorizado, evaluación de volumen, glucosa, osmolaridad y asesoría de cuidados intensivos.',
   ['Si hiponatremia aguda con convulsiones/encefalopatía, valorar solución salina hipertónica según protocolo y monitorización estricta.',
    'En hipernatremia grave evitar correcciones precipitadas; personal experto define líquidos y velocidad con controles repetidos.']),
  hypo:outcome('warning','⚠️ Hiponatremia: investigar causa y gravedad','Corregir hiponatremia según duración, síntomas, glucemia y volumen; la sobrecorrección puede ser peligrosa.',
   ['Valorar osmolaridad, sodio urinario, balance de líquidos, medicamentos y probabilidad de SIADH, pérdida renal o GI.',
    'Planificar tratamiento y monitorización de sodio con metas institucionales; no aplicar pauta fija de fluidos.']),
  hyper:outcome('warning','⚠️ Hipernatremia: corrección vigilada','La hipernatremia requiere investigación de pérdidas, acceso a agua, glucosa y estado circulatorio; corrección controlada.',
   ['Evaluar hidratación y perfusión sin asumir que el examen físico refleja el déficit completo.',
    'Controlar sodio seriado y definir sustitución de agua/electrólitos bajo supervisión; evitar cambios rápidos.']),
  assess:outcome('warning','⚠️ Confirmar electrolitos antes de tratar','Sin sodio, glucemia y evaluación clínica fiables no es seguro elegir un esquema.',
   ['Solicitar/evaluar electrolitos y glucosa, estado hídrico y diuresis, y repetir la muestra si hay discordancia.',
    'Si hay compromiso neurológico, activar atención inmediata antes de completar pruebas.'])
 }
});
simple({
 id:'lesion-renal-aguda',icon:'🫘',category:'Hospitalización',title:'Lesión renal aguda pediátrica',
 subtitle:'Oliguria, potasio, sobrecarga y causas reversibles',
 scope:'Niños y adolescentes con sospecha de reducción aguda de función renal. Enfermedad renal crónica, neonatos y diálisis requieren ajustes especializados; no calcula volumen ni estadificación KDIGO.',
 urgent:'crítica',sources:['aki'],
 danger:'¿Hay arritmia por hiperpotasemia, edema pulmonar, anuria con inestabilidad o shock?',
 hint:'Comprobar K+ y ECG si hay riesgo; valorar oxigenación, balance hídrico, diuresis y perfusión. LRA puede presentarse sin oliguria.',
 critical:['🚨 Complicación renal potencialmente mortal','Hiperpotasemia grave, edema pulmonar o compromiso hemodinámico requieren tratamiento hospitalario inmediato.',
 ['ABCDE, ECG/monitorización, medidas urgentes para hiperpotasemia según protocolo y evaluación de sobrecarga.',
 'Consultar nefrología pediátrica/UCI para decidir reemplazo renal y control estricto de fluidos, potasio y diuresis.']],
 screen:'¿Existe descenso de diuresis o elevación aguda de creatinina respecto a basal?',
 screenHint:'Aplicar definición KDIGO apropiada por edad y basal; revisar hipovolemia, fármacos nefrotóxicos, sepsis y obstrucción. Diuresis aislada sin registro es incierta.',
 yes:['⚠️ Investigar LRA y prevenir progresión','Cambios de diuresis/creatinina ameritan estratificación y corrección de causas sin provocar sobrecarga.',
 ['Medir creatinina/electrólitos, balance y presión arterial; obtener urianálisis y ecografía cuando haya sospecha de obstrucción.',
 'Ajustar fármacos nefrotóxicos y fluidoterapia según estado de volumen; escalar si empeora o hay indicación de nefrología.']],
 normal:['Riesgo renal sin evidencia concluyente','Una creatinina aparentemente normal al inicio no excluye lesión renal en evolución.',
 ['Registrar diuresis y función renal según riesgo, especialmente en sepsis, deshidratación, nefrotoxinas o postoperatorio.',
 'Revaluar ante oliguria, edema, hipertensión o incremento de creatinina.']]
});
simple({
 id:'neutropenia-febril',icon:'🧬',category:'Hospitalización',title:'Neutropenia febril pediátrica',
 subtitle:'Fiebre en oncohematología, sepsis y antimicrobianos sin demora',
 scope:'Niños y adolescentes con neutropenia sospechada/confirmada, en especial por quimioterapia, y fiebre o hipotermia. No requiere contar neutrófilos antes de activar si alto riesgo.',
 urgent:'crítica',sources:['neutro'],
 danger:'¿Hay neutropenia sospechada y fiebre con choque, mala perfusión o conciencia alterada?',
 hint:'El paciente inmunocomprometido puede tener signos sutiles. Activar protocolo de sepsis desde triaje ante alteración de perfusión.',
 critical:['🚨 Sepsis en neutropenia: antibióticos sin demora','La neutropenia febril con inestabilidad constituye una emergencia oncohematológica.',
 ['Activar ABCDE/reanimación, cultivos si no atrasan la primera dosis y antibiótico empírico de amplio espectro con cobertura apropiada conforme a protocolo oncológico.',
 'Monitorizar perfusión y lactato cuando indique; llamar oncología/hematología y cuidados intensivos.']],
 screen:'¿Hay fiebre o hipotermia en paciente oncológico con neutropenia probable, aunque esté aparentemente estable?',
 screenHint:'Confirmar antecedentes de quimioterapia, recuento absoluto de neutrófilos y acceso venoso central. El tratamiento debe comenzar oportunamente sin esperar laboratorio si la sospecha es alta.',
 yes:['⚠️ Protocolo urgente de neutropenia febril','La mayoría de pacientes con neutropenia febril requieren evaluación hospitalaria y antibióticos empíricos rápidos.',
 ['Hemocultivos, incluyendo línea central según protocolo, hemograma y cultivos dirigidos sin demorar antimicrobianos.',
 'Elegir antibiótico anti-Pseudomonas según epidemiología, alergias y plan de oncología pediátrica; reevaluar necesidad de ingreso.']],
 normal:['Vigilancia del inmunocomprometido','Sin fiebre ni neutropenia confirmada no se acredita síndrome de neutropenia febril, pero puede existir infección.',
 ['Valorar síntomas, signos vitales, laboratorio y posibilidad de infección afebril en neutropenia intensa.',
 'Escalar ante nueva fiebre, deterioro o instrucciones específicas del equipo oncológico.']]
});
if(NEW.length!==16)throw Error('Fase III: se requieren exactamente 16 rutas, se encontraron '+NEW.length);
const known=new Set(old.algorithms.map(a=>a.id));
for(const a of NEW){if(known.has(a.id))throw Error('ID duplicado '+a.id);known.add(a.id);}
const algorithms=Object.freeze([...old.algorithms,...NEW]),byId=Object.freeze(Object.fromEntries(algorithms.map(a=>[a.id,a])));
const normalize=old.normalize;
const search=(query='',category='all')=>{const q=normalize(query);return algorithms.filter(a=>(category==='all'||a.category===category)&&(!q||normalize(a.title+' '+a.subtitle+' '+a.category).includes(q)));};
const getStep=(id,nodeId)=>{const a=byId[id];if(!a)return null;const n=nodeId||a.start;return a.nodes[n]?{kind:'question',data:a.nodes[n],id:n}:a.outcomes[n]?{kind:'outcome',data:a.outcomes[n],id:n}:null;};
const transition=(id,node,choiceIndex)=>{const s=getStep(id,node);if(!s||s.kind!=='question'||!Number.isInteger(choiceIndex))return null;const n=s.data.choices[choiceIndex]?.next;return n&&getStep(id,n)?n:null;};
function validate(){
 const errors=[];
 for(const a of algorithms){
  const visited=new Set();
  const walk=n=>{
   if(visited.has(n))return;
   visited.add(n);
   const s=getStep(a.id,n);
   if(!s){errors.push(a.id+': broken node '+n);return;}
   if(s.kind==='question'){if(s.data.choices.length<2)errors.push(a.id+': too few choices');for(const c of s.data.choices)walk(c.next);}
  };
  if(!a.scope||!a.sources?.length)errors.push(a.id+': missing scope or source');
  walk(a.start);
  for(const n of [...Object.keys(a.nodes),...Object.keys(a.outcomes)])if(!visited.has(n))errors.push(a.id+': unreachable '+n);
  for(const o of Object.values(a.outcomes))if(!o.summary||o.actions.length<2)errors.push(a.id+': incomplete outcome');
 }
 return errors;
}
root.KidBumPediatricAlgorithms=Object.freeze({algorithms,byId,normalize,search,getStep,transition,validate,version:'0.10.53'});
})(typeof window!=='undefined'?window:globalThis);
