/* KidBum Algoritmos Pediátricos v0.10.52 — Fase II
 * 8 nuevas rutas editoriales de apoyo a decisiones. No calcula dosis,
 * no reemplaza la valoración presencial ni certifica protocolos mexicanos.
 * El motor 0.10.51 y sus cuatro algoritmos siguen disponibles.
 */
(function(root){
'use strict';
const previous=root.KidBumPediatricAlgorithms;
if(!previous)throw Error('Cargar primero pediatria-algoritmos-core-v01051.js');
const NEW=[
{
 id:'anafilaxia',icon:'🆘',category:'Urgencias',title:'Anafilaxia',subtitle:'Adrenalina IM primero: vía aérea, respiración y circulación',scope:'Niños y adolescentes con sospecha de reacción alérgica sistémica aguda; puede presentarse sin urticaria. Incluye lactantes; requiere presentación y dosis de adrenalina adecuadas por peso/edad verificadas externamente.',start:'danger',time:'2–3 decisiones',urgency:'crítica',
 sources:[
  {label:'ASCIA · tratamiento urgente de anafilaxia (actualización octubre 2026)',url:'https://www.allergy.org.au/hp/anaphylaxis/acute-management-guidelines',year:'2026 · guía australiana; productos mexicanos requieren cotejo'},
  {label:'IMSS · reconocimiento y epinefrina como primera línea',url:'https://climss.imss.gob.mx/cursos/vacuna_pfizer_biontech/t1/d13.php',year:'material educativo mexicano; comprobar protocolo'}
 ],
 nodes:{
  danger:{question:'¿Aparecieron síntomas respiratorios, de vía aérea o circulatorios compatibles con anafilaxia?',hint:'Disnea/sibilancias súbitas, estridor, voz ronca, edema faríngeo, colapso, síncope, perfusión inadecuada tras posible alérgeno. La urticaria NO es obligatoria; la hipotensión puede ser tardía en niños.',choices:[{label:'Sí · anafilaxia probable',next:'immediate',tone:'danger'},{label:'No identificados',next:'systemic'},{label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
  systemic:{question:'¿Hubo inicio agudo de síntomas multisistémicos tras una exposición compatible?',hint:'Piel/mucosas, respiración, gastrointestinales intensos o circulación. Una reacción cutánea aislada puede no ser anafilaxia, pero exige vigilancia y reevaluación.',choices:[{label:'Sí o progresión rápida',next:'immediate',tone:'danger'},{label:'Solo síntomas cutáneos leves, estable',next:'observe'},{label:'No sé / datos incompletos',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  immediate:{tone:'danger',title:'🚨 Adrenalina intramuscular inmediata + ABCDE',summary:'Ante anafilaxia probable, administrar adrenalina IM sin retraso; activar urgencias, colocar al paciente en posición segura, evaluar vía aérea/perfusión y vigilar respuesta.',actions:['Administrar adrenalina (epinefrina) IM en muslo anterolateral conforme a protocolo, peso, concentración y presentación local; no esperar antihistamínicos ni corticoides.','Solicitar apoyo; posición recostada según tolerancia respiratoria, evitar incorporarlo o hacerlo caminar súbitamente; oxígeno y acceso vascular según situación.','Reevaluar estrechamente: si persisten síntomas respiratorios o circulatorios, repetir adrenalina según protocolo; anafilaxia refractaria exige equipo avanzado.','Observación hospitalaria, plan de emergencia y valoración alergológica posterior.']},
  observe:{tone:'warning',title:'Reevaluar posible reacción alérgica',summary:'Síntomas cutáneos aislados sin compromiso sistémico no prueban anafilaxia, pero el cuadro puede progresar.',actions:['Evaluar exposición, evolución temporal, signos vitales y exploración.','Mantener vigilancia y plan de escalamiento: si surge compromiso respiratorio/circulatorio, tratar inmediatamente como anafilaxia.']},
  assess:{tone:'warning',title:'Evaluación urgente ante incertidumbre',summary:'No es seguro descartar anafilaxia con datos incompletos o únicamente por ausencia de lesiones cutáneas.',actions:['Realizar ABCDE y valoración presencial inmediata si hubo exposición y síntomas de inicio súbito.','Si el compromiso respiratorio o circulatorio hace probable anafilaxia, no retrasar la adrenalina IM para completar el algoritmo.']}
 }
},
{
 id:'convulsion',icon:'🧠',category:'Urgencias',title:'Convulsión prolongada',subtitle:'Crisis ≥5 minutos, recurrencia y recuperación posictal',scope:'Niños fuera de reanimación neonatal con crisis convulsivas agudas; causas metabólicas, traumatismos y fiebre precisan valoración específica. No es algoritmo para movimientos no epilépticos.',start:'danger',time:'2–3 decisiones',urgency:'crítica',
 sources:[
  {label:'IMSS · GPC 244-09 Crisis Convulsivas en Niños',url:'https://www.imss.gob.mx/node/85162',year:'GPC mexicana histórica · no dar por vigente'},
  {label:'RCH Melbourne · Seizures – acute management',url:'https://www.rch.org.au/clinicalguide/guideline_index/Seizures_-_acute_management/',year:'consulta 2026; versión específica en sitio'}
 ],
 nodes:{
  danger:{question:'¿La convulsión dura 5 minutos o más, o hay crisis repetidas sin recuperación?',hint:'Cronometrar desde el inicio observado. Durante la crisis: proteger de lesiones, posición segura, ABCDE, glucosa, sin sujetar ni introducir objetos en boca.',choices:[{label:'Sí · crisis prolongada',next:'status',tone:'danger'},{label:'No · cedió',next:'recovery'},{label:'Duración o recuperación incierta',next:'assess',tone:'warning'}]},
  recovery:{question:'¿Recuperó su nivel de conciencia habitual y respira adecuadamente?',hint:'Valorar oxigenación, focalidad persistente, traumatismo, signos meníngeos, hipoglucemia, fiebre y primera crisis.',choices:[{label:'Sí · recuperación adecuada',next:'evaluate'},{label:'No · alteración persiste',next:'assess',tone:'warning'},{label:'Recurre / se deteriora',next:'status',tone:'danger'}]}
 },
 outcomes:{
  status:{tone:'danger',title:'🚨 Tratar como estado epiléptico convulsivo',summary:'Crisis ≥5 min o crisis seriadas sin recuperación necesitan intervención inmediata según protocolo de estado epiléptico.',actions:['Activar reanimación, asegurar ventilación/oxigenación y acceso IV/IO sin retrasar anticonvulsivantes; medir glucemia y tratar hipoglucemia cuando proceda.','Administrar benzodiacepina de primera línea por vía disponible conforme a protocolo, peso y número de dosis ya recibidas; vigilar depresión respiratoria.','Si persiste tras tratamiento inicial, escalar oportunamente a segunda línea y especialistas/UCI; buscar causas reversibles.']},
  assess:{tone:'warning',title:'Valoración hospitalaria prioritaria',summary:'Una recuperación inadecuada, duración desconocida o datos incompletos impiden clasificar la crisis como resuelta sin riesgo.',actions:['Verificar ABCDE, glucometría, estado neurológico y crisis sutil o repetida.','Escalar si persiste alteración de conciencia, se sospecha crisis no convulsiva, intoxicación, infección o lesión intracraneal.']},
  evaluate:{tone:'warning',title:'Evaluar la causa y el riesgo de recurrencia',summary:'La resolución de una crisis no determina por sí sola que el niño sea candidato a alta.',actions:['Documentar duración, semiología, focalidad, fiebre, medicación y antecedentes; comprobar glucosa y exploración dirigida.','Primera crisis, focalidad, trauma, signos meníngeos o factores de riesgo exigen ruta diagnóstica específica y plan de seguimiento.']}
 }
},
{
 id:'hipoglucemia',icon:'🍬',category:'Urgencias',title:'Hipoglucemia',subtitle:'Conciencia, deglución, medición y reevaluación inmediata',scope:'Niños más allá del periodo neonatal de transición; neonatos menores de 72 horas requieren ruta neonatal diferenciada. Los umbrales varían según diabetes y edad.',start:'danger',time:'3 decisiones',urgency:'crítica',
 sources:[{label:'RCH Melbourne · Hypoglycaemia Clinical Practice Guideline',url:'https://www.rch.org.au/clinicalguide/guideline_index/hypoglycaemia_guideline/',year:'consulta 2026; distinguir neonatal y diabetes'}],
 nodes:{
  danger:{question:'¿Presenta convulsiones, compromiso de conciencia o no puede deglutir con seguridad?',hint:'Hipoglucemia grave puede generar lesión cerebral. No dar alimentos ni bebidas por boca si está obnubilado, convulsiona o no protege vía aérea.',choices:[{label:'Sí · alteración neurológica',next:'emergency',tone:'danger'},{label:'No · consciente',next:'scope'},{label:'No sé',next:'assess',tone:'warning'}]},
  scope:{question:'¿Se trata de un recién nacido en las primeras 72 horas de vida?',hint:'Neonatos requieren umbrales, alimentación y monitorización propios. Las cifras normales no deben extrapolarse desde niños mayores.',choices:[{label:'Sí · periodo neonatal',next:'neonate',tone:'warning'},{label:'No · mayor',next:'confirm'},{label:'Edad desconocida',next:'assess',tone:'warning'}]},
  confirm:{question:'¿La glucosa capilar o plasmática indica hipoglucemia o hay fuerte sospecha clínica?',hint:'Comprobar valor y síntomas de forma inmediata; la glucosa capilar muy baja requiere confirmación según contexto, pero el tratamiento no debe esperar si hay síntomas importantes.',choices:[{label:'Sí · confirmada o probable',next:'oral'},{label:'No · valor adecuado y estable',next:'differential'},{label:'No se ha medido / dudosa',next:'assess',tone:'warning'}]},
  oral:{question:'¿Está alerta y puede ingerir carbohidratos de forma segura?',hint:'La decisión de ruta de glucosa depende de la conciencia y riesgo de aspiración, no solo del valor.',choices:[{label:'Sí · puede ingerir',next:'oral-reassess'},{label:'No / vómitos persistentes',next:'emergency',tone:'danger'}]}
 },
 outcomes:{
  emergency:{tone:'danger',title:'🚨 Corregir glucosa y proteger vía aérea',summary:'Ante alteración neurológica o imposibilidad de vía oral, activar atención urgente y corregir glucosa por vía indicada por el equipo.',actions:['ABCDE, glucometría inmediata sin demorar tratamiento si la sospecha es alta.','Administrar glucosa IV/IO o glucagón según situación y protocolo por edad/peso; NO ofrecer nada por boca si la deglución no es segura.','Repetir glucemia tras intervención, vigilar recurrencia y buscar causa (insulina, ingesta, sepsis, endocrinopatía o intoxicación).']},
  neonate:{tone:'warning',title:'Ruta de hipoglucemia neonatal',summary:'En las primeras 72 horas, aplicar protocolo neonatal específico según edad posnatal, síntomas, alimentación y factores de riesgo.',actions:['Medir glucosa y valorar signos como apnea, hipotermia, succión deficiente, letargia y convulsiones.','Escalar a neonatología; no usar umbrales de niño mayor.']},
  'oral-reassess':{tone:'warning',title:'Glucosa enteral supervisada + control cercano',summary:'Si está consciente y puede tragar, utilizar carbohidrato rápido según protocolo y confirmar respuesta.',actions:['Dar aporte oral de glucosa apropiado para edad y plan individual cuando corresponda; monitorizar y repetir glucemia.','Tras corregir, ofrecer alimentación sostenida y valorar causa y riesgo de recurrencia; ingreso/observación si es grave, inexplicada o recurrente.']},
  differential:{tone:'warning',title:'Reevaluar diagnóstico y evolución',summary:'Una medición adecuada no descarta otras causas de síntomas neurológicos o autonómicos.',actions:['Evaluar signos vitales, alimentación, diabetes, tóxicos y otras causas.','Repetir glucosa ante deterioro o discordancia clínico-analítica.']},
  assess:{tone:'warning',title:'Medir glucosa y valorar presencialmente',summary:'La ausencia de una medición fiable o la incertidumbre sobre conciencia exige valoración rápida.',actions:['Obtener glucemia capilar o plasmática apropiada sin demorar ABCDE.','Si aparece alteración de conciencia, tratar como emergencia y evitar líquidos por boca.']}
 }
},
{
 id:'cetoacidosis',icon:'🧪',category:'Urgencias',title:'Cetoacidosis diabética',subtitle:'Triada metabólica, lesión cerebral, potasio y vigilancia',scope:'Niños y adolescentes con diabetes conocida o sospecha de debut; los neonatos y estados hiperosmolares requieren ruta especializada. Los esquemas de líquidos e insulina NO se calculan aquí.',start:'danger',time:'2–3 decisiones',urgency:'crítica',
 sources:[{label:'RCH Melbourne · Diabetic ketoacidosis',url:'https://www.rch.org.au/clinicalguide/guideline_index/Diabetic_ketoacidosis/',year:'consulta 2026 · manejo hospitalario especializado'}],
 nodes:{
  danger:{question:'¿Hay alteración de conciencia, cefalea progresiva, bradicardia anormal o datos de choque?',hint:'La lesión cerebral es la complicación grave de CAD. Vómitos, respiración de Kussmaul, deshidratación y dolor abdominal requieren evaluación simultánea.',choices:[{label:'Sí · peligro neurológico/hemodinámico',next:'critical',tone:'danger'},{label:'No identificado',next:'triad'},{label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
  triad:{question:'¿Existe hiperglucemia con cetonemia/cetonuria y acidosis metabólica?',hint:'Evaluar glucosa, beta-hidroxibutirato, gasometría venosa/equilibrio ácido-base, electrólitos y anion gap. No confundir cetosis sin acidosis con CAD.',choices:[{label:'Sí · triada compatible',next:'hospital',tone:'danger'},{label:'Falta algún dato o estudio',next:'assess',tone:'warning'},{label:'No · hay hiperglucemia/cetosis sin acidosis',next:'differential'}]}
 },
 outcomes:{
  critical:{tone:'danger',title:'🚨 Emergencia: posible CAD complicada',summary:'Prioridad a ABCDE, monitorización y evaluación por pediatría/UCI; sospecha de lesión cerebral requiere tratamiento urgente sin esperar neuroimagen.',actions:['Activar atención hospitalaria avanzada y comprobar glucosa, cetonas, gasometría, sodio, potasio, perfusión y estado neurológico.','Aplicar protocolo de CAD para líquidos, potasio e insulina tras evaluación específica; evitar bolos de insulina y variaciones no protocolizadas.','Si sospecha lesión cerebral, iniciar manejo específico por equipo experto sin retrasarlo por tomografía.']},
  hospital:{tone:'danger',title:'🚨 CAD probable: manejo hospitalario protocolizado',summary:'La cetoacidosis diabética pediátrica requiere vigilancia de glucemia, cetosis, sodio corregido, potasio, diuresis y estado neurológico.',actions:['Hospitalizar para protocolo específico de CAD, supervisado por equipo pediátrico y, según gravedad, cuidados intensivos.','Registrar fluidos recibidos antes del ingreso; evaluar sodio corregido y potasio ANTES y DURANTE la insulinoterapia.','Revaluar seriamente complicaciones: lesión cerebral, hipopotasemia, hipoglucemia, sobrecarga y arritmias.']},
  differential:{tone:'warning',title:'Hiperglucemia/cetosis: confirmar clasificación',summary:'No hay evidencia suficiente de acidosis para etiquetar CAD, pero no se descartan otras emergencias metabólicas.',actions:['Verificar estado ácido-base y cetonas con estudio apropiado.','Si hay deterioro, osmolalidad elevada o estado mental alterado, investigar emergencia hiperosmolar u otra causa con endocrinología pediátrica.']},
  assess:{tone:'warning',title:'Completar evaluación metabólica urgente',summary:'Sin glucosa, cetonas, equilibrio ácido-base y electrolitos no puede decidirse la ruta de CAD con seguridad.',actions:['Realizar mediciones clínicas y laboratorio urgente; ABCDE y acceso según gravedad.','No iniciar una pauta de insulina, reposición de potasio o líquidos solo con esta aplicación.']}
 }
},
{
 id:'asma-crisis',icon:'🫁',category:'Neumología',title:'Exacerbación asmática',subtitle:'Distinguir anafilaxia, agotamiento y crisis leve/moderada',scope:'Niños mayores de 12 meses con diagnóstico o sospecha razonable de asma/episodio sibilante; lactantes pequeños con sibilancias requieren descartar bronquiolitis y otros diagnósticos.',start:'danger',time:'3–4 decisiones',urgency:'prioritaria',
 sources:[
  {label:'GINA · informe de estrategia 2026',url:'https://ginasthma.org/2026-gina-strategy-report/',year:'2026 · revisar por edad'},
  {label:'RCH Melbourne · Acute asthma',url:'https://www.rch.org.au/clinicalguide/guideline_index/Asthma_Acute/',year:'consulta 2026'},
  {label:'IMSS · asma pediátrica SS-009-08',url:'https://www.imss.gob.mx/sites/all/statics/guiasclinicas/009GRR.pdf',year:'guía mexicana histórica; no certificar vigencia'}
 ],
 nodes:{
  danger:{question:'¿Hay tórax silencioso, agotamiento, cianosis, hipoxemia grave o conciencia alterada?',hint:'La ausencia de sibilancias NO descarta obstrucción grave; observar entrada de aire, esfuerzo, perfusión y respuesta. Si existe peligro, comenzar atención mientras se llama al equipo.',choices:[{label:'Sí · amenaza vital',next:'critical',tone:'danger'},{label:'No se identifican',next:'allergy'},{label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
  allergy:{question:'¿El cuadro comenzó bruscamente tras posible alérgeno o sugiere anafilaxia?',hint:'Sibilancias con exposición a alimento, fármaco o picadura; síntomas cutáneos pueden faltar. Si dudas entre asma y anafilaxia, se prioriza anafilaxia.',choices:[{label:'Sí · posible anafilaxia',next:'allergic',tone:'danger'},{label:'No',next:'scope'},{label:'Desconocido',next:'assess',tone:'warning'}]},
  scope:{question:'¿Es mayor de 12 meses y el síndrome es compatible con crisis asmática?',hint:'En menores de un año con primer episodio sibilante, bronquiolitis es más probable; explorar neumonía, aspiración de cuerpo extraño y cardiopatía.',choices:[{label:'Sí',next:'severity'},{label:'No / es menor de 1 año',next:'differential',tone:'warning'}]},
  severity:{question:'¿Tiene disnea moderada/intensa, retracciones, mala entrada de aire o respuesta insuficiente al rescate?',hint:'Saturación y esfuerzo respiratorio guían gravedad junto con examen físico. El PRAM existente en KidBum puede ayudar si la edad y datos son adecuados.',choices:[{label:'Sí · requiere tratamiento supervisado',next:'treat',tone:'warning'},{label:'No · leve y estable',next:'mild'},{label:'No se ha valorado bien',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  critical:{tone:'danger',title:'🚨 Crisis potencialmente mortal',summary:'Priorizar ABCDE, oxigenación, broncodilatadores de rescate y escalamiento inmediato a equipo pediátrico experimentado.',actions:['Activar reanimación, monitorizar oxigenación/ventilación y administrar broncodilatador de acción rápida bajo protocolo.','Considerar tratamiento sistémico temprano y coadyuvantes según gravedad; vigilar agotamiento respiratorio y necesidad de UCI.','No usar sedación rutinaria; comprobar que el cuadro no sea anafilaxia u obstrucción de vía aérea por otro motivo.']},
  allergic:{tone:'danger',title:'🚨 Tratar primero la posible anafilaxia',summary:'Si hay sospecha de anafilaxia, la adrenalina IM es el tratamiento prioritario y el broncodilatador es coadyuvante.',actions:['Activar manejo de anafilaxia y administrar adrenalina IM según protocolo institucional y peso.','No retrasar adrenalina por salbutamol, antihistamínico o corticoide.']},
  treat:{tone:'warning',title:'Rescate broncodilatador y reevaluación frecuente',summary:'Crisis moderada o grave: tratamiento supervisado, corticosteroide sistémico temprano cuando esté indicado y decisión de hospitalización según respuesta.',actions:['SABA inhalado con espaciador o nebulización según situación, oxígeno si precisa y vigilancia clínica.','Valorar corticoide sistémico y coadyuvantes para gravedad según guía; reevaluar respuesta, SpO₂ y esfuerzo.','Si no mejora claramente o necesita soporte, referir/ingresar y considerar equipo avanzado.']},
  mild:{tone:'warning',title:'Crisis leve: manejo guiado y seguimiento',summary:'Aun con síntomas leves, confirmar respuesta clínica al tratamiento y un plan escrito antes de considerar manejo ambulatorio.',actions:['Administrar tratamiento de rescate conforme al plan vigente y evaluar respuesta en forma presencial.','Verificar técnica inhalatoria, controlador con corticoide inhalado según edad/guía y educación sobre signos de alarma.','No utilizar este resultado como alta automática ni prescripción.']},
  assess:{tone:'warning',title:'Clasificar gravedad presencialmente',summary:'Sin una evaluación fiable de esfuerzo, entrada de aire, oxigenación y contexto, no se puede declarar crisis leve.',actions:['ABCDE, saturación y evaluación respiratoria; actuar de inmediato si hay agotamiento, tórax silencioso o deterioro.','Considerar diagnóstico diferencial y pedir ayuda si la gravedad no es clara.']},
  differential:{tone:'warning',title:'Confirmar causa de sibilancias',summary:'En menores de un año y presentaciones atípicas, considerar bronquiolitis, aspiración, neumonía y otras etiologías.',actions:['Explorar edad, inicio, fiebre, antecedentes y signos de dificultad respiratoria.','No asumir respuesta a broncodilatadores ni aplicar automáticamente la ruta de asma.']}
 }
},
{
 id:'crup',icon:'🎺',category:'Neumología',title:'Crup (laringotraqueítis)',subtitle:'Estridor, agotamiento, aspecto tóxico y referencia',scope:'Generalmente niños de 6 meses a 6 años con tos perruna, disfonía y estridor; cuadro atípico o <6 meses obliga a valorar diagnóstico alternativo.',start:'danger',time:'3 decisiones',urgency:'prioritaria',
 sources:[{label:'RCH Melbourne · Croup (Laryngotracheobronchitis)',url:'https://www.rch.org.au/clinicalguide/guideline_index/croup_laryngotracheobronchitis/',year:'consulta 2026; manejo individual por gravedad'}],
 nodes:{
  danger:{question:'¿Hay agotamiento, cianosis, alteración de conciencia, pobre entrada de aire o estridor con gran esfuerzo?',hint:'Hipoxia es signo tardío. Un estridor que se vuelve tenue acompañado de fatiga puede anunciar obstrucción inminente. Minimizar estímulos, evitar procedimientos innecesarios.',choices:[{label:'Sí · obstrucción grave probable',next:'critical',tone:'danger'},{label:'No identificados',next:'atypical'},{label:'No se puede determinar',next:'assess',tone:'warning'}]},
  atypical:{question:'¿Hay babeo, disfagia, aspecto tóxico, inicio súbito o edad menor de 6 meses?',hint:'Pensar en epiglotitis, traqueítis bacteriana, cuerpo extraño o anafilaxia; no forzar inspección de garganta en un niño con riesgo de obstrucción.',choices:[{label:'Sí · cuadro atípico',next:'alternate',tone:'danger'},{label:'No · crup típico',next:'stridor'},{label:'Desconocido',next:'assess',tone:'warning'}]},
  stridor:{question:'¿Existe estridor en reposo o retracciones persistentes?',hint:'Estridor solo durante el llanto y niño bien perfundido indica menor gravedad que estridor en reposo con trabajo respiratorio.',choices:[{label:'Sí · en reposo/persistente',next:'moderate',tone:'warning'},{label:'No · solo al llorar o tos perruna',next:'mild'},{label:'No se valoró',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  critical:{tone:'danger',title:'🚨 Obstrucción de vía aérea: manejo inmediato',summary:'Estridor con fatiga, cianosis o conciencia alterada exige apoyo experto para vía aérea y tratamiento hospitalario urgente.',actions:['Evitar agitar al niño; mantenerlo con cuidador y activar anestesia/pediatría de urgencias.','Usar adrenalina nebulizada y corticoide sistémico según gravedad y protocolo; disponer de soporte avanzado de vía aérea.','No posponer tratamiento por radiografías, hisopados o exploración faríngea estresante.']},
  alternate:{tone:'danger',title:'🚨 Buscar obstrucción grave NO típica de crup',summary:'Babeo, mal estado general, inicio súbito o presentación atípica exigen descartar diagnósticos con riesgo de vía aérea.',actions:['Mantener al niño tranquilo, no manipular orofaringe innecesariamente y solicitar equipo experto.','Evaluar epiglotitis, cuerpo extraño, traqueítis bacteriana o anafilaxia según exposición y síntomas.']},
  moderate:{tone:'warning',title:'Crup moderado: tratamiento y vigilancia',summary:'Estridor en reposo o retracciones requieren evaluación presencial, corticoide y consideración de adrenalina nebulizada con observación.',actions:['Administrar corticoide según pauta específica y considerar adrenalina nebulizada si persiste o empeora, con observación posterior apropiada.','Reevaluar trabajo respiratorio y estridor; escalar si progresa a agotamiento, hipoxemia o alteración de conciencia.']},
  mild:{tone:'warning',title:'Crup de menor gravedad: evaluación y plan',summary:'Con tos perruna sin estridor en reposo, confirmar diagnóstico, factores de riesgo y acceso a reevaluación.',actions:['Mantener calma e hidratación, evitar procedimientos innecesarios; valorar corticoide según estridor y factores de riesgo.','Explicar signos de alarma y necesidad de reevaluación; no afirmar alta automática.']},
  assess:{tone:'warning',title:'Valorar vía aérea antes de clasificar',summary:'Sin información fiable de estridor en reposo, respiración y estado general no puede considerarse leve.',actions:['Valorar presencialmente con mínima agitación.','Si hay empeoramiento, activar atención urgente de vía aérea.']}
 }
},
{
 id:'neumonia',icon:'🦠',category:'Neumología',title:'Neumonía comunitaria',subtitle:'Hipoxemia, dificultad respiratoria, hidratación y sitio de manejo',scope:'Niños mayores de 3 meses con sospecha de neumonía adquirida en la comunidad; en menores de 3 meses consultar protocolo de infección del lactante/recién nacido.',start:'danger',time:'3 decisiones',urgency:'prioritaria',
 sources:[
  {label:'RCH Melbourne · Community acquired pneumonia',url:'https://www.rch.org.au/clinicalguide/guideline_index/Community_acquired_pneumonia/',year:'consulta 2026; pautas locales de antibioterapia'},
  {label:'NICE NG143 · fiebre en menores de 5 años',url:'https://www.nice.org.uk/guidance/ng143/chapter/Recommendations',year:'2019 · evaluar señales de alarma'}
 ],
 nodes:{
  danger:{question:'¿Hay apnea, cianosis, alteración de conciencia, choque o agotamiento respiratorio?',hint:'No confiar solo en la fiebre: valorar perfusión, esfuerzo, saturación de oxígeno y alimentación. Hipoxemia significativa y falla respiratoria exigen soporte inmediato.',choices:[{label:'Sí · inestabilidad',next:'critical',tone:'danger'},{label:'No identificado',next:'age'},{label:'No se ha evaluado',next:'assess',tone:'warning'}]},
  age:{question:'¿Tiene más de 3 meses y cuadro compatible con neumonía comunitaria?',hint:'En lactantes pequeños, fiebre/hipotermia o dificultad respiratoria pueden ser sepsis o enfermedad neonatal; necesitan otra ruta.',choices:[{label:'Sí',next:'hospital'},{label:'No / menor de 3 meses',next:'young',tone:'warning'}]},
  hospital:{question:'¿Requiere oxígeno, soporte de hidratación o tiene trabajo respiratorio moderado/importante?',hint:'Estos hallazgos favorecen hospitalización; valorar comorbilidades, capacidad para beber, hipoxemia, sepsis y posibilidad real de reevaluación.',choices:[{label:'Sí · criterios de ingreso probables',next:'refer',tone:'warning'},{label:'No · aparentemente estable',next:'assess-mild'},{label:'Datos no disponibles',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  critical:{tone:'danger',title:'🚨 Neumonía grave / insuficiencia respiratoria',summary:'Inestabilidad o agotamiento respiratorio: manejo hospitalario inmediato y apoyo pediátrico avanzado.',actions:['ABCDE, soporte de oxígeno/ventilación y sepsis según hallazgos.','Antibióticos según sospecha bacteriana, contexto, edad y resistencia local sin retrasar estabilización.','Buscar derrame, empiema y otras complicaciones si el cuadro lo sugiere.']},
  young:{tone:'warning',title:'Lactante pequeño: ruta de infección grave',summary:'En menores de 3 meses no se debe aplicar sin adaptación la vía simplificada de neumonía de niños mayores.',actions:['Evaluar sepsis, infección neonatal y necesidad de hospitalización urgente según edad exacta.','Valorar cultivos, laboratorio y tratamiento conforme a protocolo de lactante febril/neonatología.']},
  refer:{tone:'warning',title:'Valoración hospitalaria e indicación de ingreso',summary:'Necesidad de oxígeno, hidratación asistida o dificultad respiratoria moderada a grave requieren valoración hospitalaria.',actions:['Oximetría, monitorización y líquidos según estado clínico.','Evaluar antimicrobiano apropiado para sospecha bacteriana según guía y epidemiología; no prescribir automáticamente.','Reevaluación clínica y búsqueda de complicaciones.']},
  'assess-mild':{tone:'warning',title:'Evaluación de neumonía no grave y seguimiento',summary:'Si está estable, puede valorarse manejo ambulatorio solo tras exploración, diagnóstico probable y condiciones adecuadas de vigilancia.',actions:['Valorar etiología viral/bacteriana y necesidad real de antibiótico; radiografía no siempre es rutinaria.','Comprobar ingesta, frecuencia respiratoria, saturación cuando esté indicada y posibilidad de seguimiento.','Explicar signos de alarma e indicar reevaluación si empeora; no emitir alta desde el algoritmo.']},
  assess:{tone:'warning',title:'Completar valoración respiratoria',summary:'Sin signos vitales, esfuerzo respiratorio y oxigenación no puede determinarse gravedad ni sitio de manejo.',actions:['Evaluación presencial, oximetría si indicada, perfusión e hidratación.','Si hay peligro respiratorio, activar vía de urgencias antes de continuar.']}
 }
},
{
 id:'lactante-febril',icon:'🌡️',category:'Infectología',title:'Lactante febril ≤60 días',subtitle:'Distinguir lactante de riesgo y grupos por edad',scope:'AAP 2021: lactantes de término (≥37 semanas), clínicamente bien, 8–60 días de vida y temperatura documentada ≥38 °C. NO incluye mal aspecto, prematuridad ni 0–7 días.',start:'danger',time:'3 decisiones',urgency:'prioritaria',
 sources:[
  {label:'AAP · Evaluation and Management of Well-Appearing Febrile Infants 8–60 Days',url:'https://publications.aap.org/pediatrics/article/148/2/e2021052228/180223/Clinical-Practice-Guideline-for-the-Management-of',year:'2021 · comprobar actualizaciones y exclusiones'},
  {label:'NICE NG143 · Fever in under 5s',url:'https://www.nice.org.uk/guidance/ng143/chapter/Recommendations',year:'2019 · menores de 3 meses con ≥38 °C requieren valoración urgente'}
 ],
 nodes:{
  danger:{question:'¿Tiene mal estado general, apnea, letargia, choque, cianosis o signos de meningitis?',hint:'La guía AAP 2021 de lactantes bien aparentes NO aplica a lactantes inestables o de mal aspecto. La temperatura ≥38 °C en menores de 3 meses es siempre señal de alto riesgo en NICE.',choices:[{label:'Sí · aspecto tóxico/inestable',next:'critical',tone:'danger'},{label:'No · aspecto bien',next:'scope'},{label:'No se ha valorado',next:'assess',tone:'warning'}]},
  scope:{question:'¿Nació ≥37 semanas y presenta temperatura ≥38 °C documentada?',hint:'La AAP requiere término y fiebre documentada; prematuros, hipotermia, otros criterios de exclusión y fiebre no confirmada necesitan evaluación individual. Ante sospecha alta, no descartar infección por termómetro normal actual.',choices:[{label:'Sí · cumple criterios generales',next:'age'},{label:'No / fuera de alcance',next:'outside',tone:'warning'},{label:'No se conocen datos',next:'assess',tone:'warning'}]},
  age:{question:'¿Qué edad exacta tiene el lactante?',hint:'Días completos de vida al momento de la fiebre. Los grupos AAP difieren en cultivos, punción lumbar, antimicrobianos y posible observación.',choices:[{label:'8–21 días',next:'age8',tone:'warning'},{label:'22–28 días',next:'age22',tone:'warning'},{label:'29–60 días',next:'age29',tone:'warning'},{label:'0–7 días, >60 días o se desconoce',next:'outside',tone:'warning'}]}
 },
 outcomes:{
  critical:{tone:'danger',title:'🚨 Tratar como posible infección invasiva',summary:'Lactante febril inestable o de mal aspecto: valoración y estabilización hospitalaria urgente por riesgo de sepsis/meningitis.',actions:['ABCDE, toma de cultivos si no retrasa antimicrobianos urgentes, vigilancia hemodinámica y manejo especializado.','No usar algoritmos de lactante febril de buen aspecto para autorizar observación domiciliaria.']},
  age8:{tone:'warning',title:'8–21 días: estudio y hospitalización',summary:'AAP recomienda evaluación invasiva y tratamiento antimicrobiano parenteral con observación hospitalaria en este grupo.',actions:['Evaluar orina, sangre y LCR conforme a protocolo de lactante febril; iniciar tratamiento empírico indicado por la guía.','Ingreso bajo equipo pediátrico y reevaluación con cultivos/evolución.']},
  age22:{tone:'warning',title:'22–28 días: estudio hospitalario individualizado',summary:'La evaluación incluye orina, hemocultivo y marcadores inflamatorios; la indicación de punción lumbar y tratamiento depende de hallazgos y protocolo.',actions:['Obtener muestras y considerar LCR según marcadores/infección urinaria y evaluación pediátrica.','Determinar ingreso, antimicrobianos u observación supervisada; NO decidir manejo domiciliario con este cuestionario.']},
  age29:{tone:'warning',title:'29–60 días: estratificación con pruebas y seguimiento',summary:'La decisión depende de examen, uroanálisis, cultivos, marcadores inflamatorios, acceso fiable a seguimiento y criterios de exclusión.',actions:['Valorar orina, hemocultivo y marcadores inflamatorios según AAP/protocolo; considerar LCR cuando esté indicado.','Solo equipo clínico puede seleccionar observación o manejo ambulatorio con criterios completos y reevaluación documentada.']},
  outside:{tone:'warning',title:'Fuera del ámbito simplificado AAP 8–60 días',summary:'Lactante prematuro, 0–7 días, mayor de 60 días, sin fiebre documentada o con criterios excluyentes requiere algoritmo específico.',actions:['Realizar valoración presencial según edad gestacional, edad posnatal, temperatura y factores de riesgo.','En menores de 3 meses con sospecha de infección grave, no retrasar evaluación especializada.']},
  assess:{tone:'warning',title:'Evaluación urgente con información insuficiente',summary:'Sin apariencia general, edad gestacional, temperatura y edad posnatal precisa no es seguro establecer riesgo bajo.',actions:['Documentar signos vitales, perfusión, alimentación, examen y temperatura apropiada.','Escalar inmediatamente ante aspecto tóxico, signos de meningitis, hipoxemia o mala perfusión.']}
 }
}
];
if(NEW.length!==8)throw Error('Se requieren exactamente ocho nuevas rutas');
const seen=new Set(previous.algorithms.map(x=>x.id));
for(const a of NEW){if(seen.has(a.id))throw Error('Ruta duplicada '+a.id);seen.add(a.id);}
const algorithms=Object.freeze([...previous.algorithms,...NEW]);
const byId=Object.freeze(Object.fromEntries(algorithms.map(a=>[a.id,a])));
const normalize=previous.normalize;
function search(query='',category='all'){
 const q=normalize(query);
 return algorithms.filter(a=>(category==='all'||a.category===category)&&(!q||normalize(a.title+' '+a.subtitle+' '+a.category).includes(q)));
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
 for(const a of algorithms){
  const visited=new Set(),walk=id=>{
   if(visited.has(id))return;
   visited.add(id);
   const step=getStep(a.id,id);
   if(!step){errors.push(a.id+': missing '+id);return;}
   if(step.kind==='question'){
    if(step.data.choices.length<2)errors.push(a.id+': too few choices');
    for(const c of step.data.choices)walk(c.next);
   }
  };
  if(!a.scope||!a.sources?.length)errors.push(a.id+': no scope or sources');
  walk(a.start);
  for(const id of [...Object.keys(a.nodes),...Object.keys(a.outcomes)])if(!visited.has(id))errors.push(a.id+': unreachable '+id);
  for(const o of Object.values(a.outcomes))if(!Array.isArray(o.actions)||o.actions.length<2||!o.summary)errors.push(a.id+': incomplete outcome');
 }
 return errors;
}
root.KidBumPediatricAlgorithms=Object.freeze({algorithms,byId,search,getStep,transition,validate,normalize,version:'0.10.52'});
})(typeof window!=='undefined'?window:globalThis);
