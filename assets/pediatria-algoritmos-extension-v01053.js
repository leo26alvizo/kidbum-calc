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
