/* Urgencias/UCI 0.10.56 · Resuscitation and cardiovascular module, adult-only */
(function(root){
'use strict';
const {simple,custom,outcome,sources:S}=root.KidBumCriticalDraft;
const adult='Adultos ≥18 años. Para obstetricia, embarazo/puerperio, menores, intoxicaciones complejas y situaciones especiales, usar protocolos específicos.';
simple({id:'abcde-adulto',icon:'🆘',cat:'Reanimación',title:'ABCDE del paciente crítico',sub:'Valoración primaria, tratamiento simultáneo y nueva evaluación',scope:adult,priority:'crítica',sources:['AHA','SSC'],
 red:'apnea, vía aérea amenazada, deterioro de conciencia, hipoxemia grave, choque o hemorragia exanguinante',
 redHint:'A: permeabilidad; B: respiración y oxigenación; C: perfusión/hemorragia; D: glucosa/neurología; E: exposición y temperatura. Tratar amenazas vitales antes de estudios.',
 critTitle:'🚨 ABCDE y ayuda de reanimación',crit:'Paciente con amenaza vital; activar respuesta inmediata y tratar A/B/C en paralelo.',critA:'Solicitar equipo experimentado, monitor, pulsioximetría, accesos y control de hemorragia; asistir ventilación si se requiere.',critB:'Si no hay pulso o respiración normal, iniciar RCP y desfibrilador; valorar causas reversibles.',
 yellow:'alteración de un componente ABCDE o tendencia a deterioro aunque mantenga presión arterial',yellowHint:'La hipotensión es signo tardío en algunas formas de choque. Repetir ABCDE después de cada intervención; no confundir presión conservada con estabilidad.',
 yesTitle:'⚠️ Alteración ABCDE: tratar y reevaluar',yes:'Una anomalía aislada puede preceder a falla orgánica; requiere manejo dirigido y vigilancia estrecha.',yesA:'Intervenir sobre componente alterado, reevaluar respuesta y repetir signos vitales/estado mental.',yesB:'Escalar a área de choque o UCI si persiste hipoxemia, mala perfusión, ventilación insuficiente o disfunción orgánica.',
 normal:'Un ABCDE inicialmente conservado no descarta evolución rápida en sepsis, trombosis, isquemia o tóxicos.'});
custom({
 id:'paro-adulto',icon:'🫀',category:'Reanimación',title:'Paro cardiorrespiratorio · ACLS 2025',
 subtitle:'RCP de calidad, ritmo desfibrilable/no desfibrilable y causas reversibles',
 scope:adult+' No aplicar ALS adulto a recién nacidos o menores.',urgency:'crítica',time:'2 decisiones',sources:[S.AHA,S.AHA_ALG],start:'danger',
 nodes:{
  danger:{question:'¿Está inconsciente, sin respiración normal y sin pulso confirmable en ≤10 segundos?',hint:'Si no se confirma pulso con certeza rápidamente, iniciar RCP de alta calidad, pedir ayuda y desfibrilador. No usar el cuestionario para retrasar compresiones.',
   choices:[{label:'🚨 Sin pulso o no confirmable',next:'rhythm',tone:'danger'},{label:'Hay pulso y respiración efectiva',next:'haspulse'},{label:'No puedo valorar pulso con certeza',next:'rhythm',tone:'danger'}]},
  rhythm:{question:'Con RCP ya iniciada: ¿el monitor muestra FV/TV sin pulso o asistolia/AESP?',hint:'Desfibrilar FV/TV sin pulso tan pronto sea posible. NO desfibrilar asistolia/AESP; continuar RCP e identificar causas reversibles.',
   choices:[{label:'🚨 FV/TV sin pulso · desfibrilable',next:'vf',tone:'danger'},{label:'🚨 Asistolia/AESP · no desfibrilable',next:'pea',tone:'danger'},{label:'Ritmo aún desconocido',next:'norhythm',tone:'danger'}]},
  haspulse:{question:'¿Hay compromiso hemodinámico, respiratorio o neurológico pese a tener pulso?',hint:'Puede requerir ventilación, tratamiento de arritmia o soporte hemodinámico; no iniciar algoritmo de fármacos del paro con pulso conservado.',
   choices:[{label:'Sí · inestabilidad',next:'poor',tone:'danger'},{label:'No · evaluación inicial',next:'evaluate'},{label:'No se puede valorar',next:'assess',tone:'warning'}]}
 },
 outcomes:{
  vf:outcome('danger','🚨 FV/TV sin pulso: desfibrilación + RCP','Desfibrilación inmediata según dispositivo/algoritmo ACLS, compresiones de alta calidad y ciclos de reevaluación.',[
   'Activar equipo de paro, desfibrilar ritmo indicado, reanudar RCP y asegurar oxigenación/monitorización.',
   'Adrenalina y antiarrítmico únicamente según secuencia oficial y reanimador capacitado; corregir H/T reversibles.']),
  pea:outcome('danger','🚨 Asistolia/AESP: NO desfibrilar','La asistolia/AESP requiere RCP continua y búsqueda de causas reversibles, no descargas.',[
   'Iniciar/continuar RCP efectiva, ventilación y acceso vascular sin retrasar compresiones.',
   'Administrar adrenalina según ACLS y buscar hipoxia, hipovolemia, potasio, trombosis, tóxicos, taponamiento y otras H/T.']),
  norhythm:outcome('danger','🚨 RCP mientras se obtiene ritmo','El ritmo desconocido nunca justifica suspender compresiones ni ventilación.',[
   'Mantener RCP y obtener monitor/desfibrilador cuanto antes.', 'Una vez interpretado el trazado por equipo entrenado, seguir algoritmo desfibrilable/no desfibrilable.']),
  poor:outcome('danger','🚨 Con pulso e inestable: ABCDE y arritmia','Existe compromiso potencialmente mortal aunque no haya paro confirmado.',[
   'Abordar ventilación, oxigenación, perfusión, monitor y ECG.', 'Considerar ruta de bradicardia, taquiarritmia, choque y apoyo avanzado según mecanismo.']),
  evaluate:outcome('warning','Pulso presente: investigar evento y monitorizar','No se confirma paro en este momento; es necesaria evaluación clínica y vigilancia.',[
   'Obtener signos vitales, ECG y antecedentes con revaloración.', 'Si desaparece pulso o respiración normal, iniciar RCP inmediata.']),
  assess:outcome('warning','Sin datos suficientes: evaluación inmediata','No es seguro concluir estabilidad ni descartar una causa vital.',[
   'Evaluar pulso, perfusión y respiración por personal capacitado.', 'Actuar según soporte vital si pierde pulso o la valoración no puede completarse.'])
 }});
simple({id:'bradicardia-adulto',icon:'💓',cat:'Reanimación',title:'Bradicardia con pulso · ACLS',sub:'Distinguir bradicardia sintomática, hipoxia y bloqueo',priority:'crítica',sources:['AHA','AHA_ALG'],
 red:'bradicardia con hipotensión, choque, dolor isquémico, insuficiencia cardiaca aguda o conciencia alterada',
 redHint:'Antes del fármaco: oxigenar si indicado, monitor ECG, presión y acceso; identificar bloqueo AV, isquemia, hipoxia y electrolitos.',
 critTitle:'🚨 Bradicardia inestable',crit:'Tratar compromiso perfusional y preparar medidas de rescate, incluido marcapaso transcutáneo si procede.',critA:'ABCDE, monitorización, ECG y tratamiento de causas reversibles; solicitar equipo con capacidad de estimulación.',critB:'Atropina cuando corresponde; si falla o se anticipa bloqueo de alto grado, estimulación y apoyo farmacológico bajo ACLS.',
 yellow:'bradicardia sintomática persistente o bloqueo significativo aunque todavía mantenga presión',yellowHint:'La frecuencia aislada no define necesidad de atropina; considerar síntomas, perfusión y tipo de conducción.',
 yes:'ECG y diagnóstico etiológico urgentemente; preparar estimulación si progresión o bloqueo avanzado.',yesA:'Correlacionar ritmo con perfusión y consultar cardiología/reanimación.',yesB:'Revisar fármacos depresores, potasio, hipoxia, isquemia y causas reversibles.',
 normal:'Una bradicardia asintomática puede ser fisiológica, pero ECG y contexto son esenciales.',normalA:'Confirmar signos vitales, ECG, síntomas y medicación.',normalB:'Vigilar y escalar si síncope, dolor, disnea o deterioro.'});
simple({id:'taquiarritmia-adulto',icon:'⚡',cat:'Reanimación',title:'Taquiarritmia con pulso · ACLS',sub:'Inestable vs estable; QRS, regularidad y sincronización',priority:'crítica',sources:['AHA','AHA_ALG'],
 red:'taquiarritmia con choque, hipotensión, isquemia, edema pulmonar o estado mental alterado',
 redHint:'Comprobar pulso. Si ausente usar ruta de paro; con pulso e inestable, no retrasar cardioversión sincronizada si está indicada.',
 critTitle:'🚨 Taquiarritmia inestable: cardioversión',crit:'Taquiarritmia causal de compromiso hemodinámico requiere cardioversión sincronizada urgente por personal entrenado.',critA:'Asegurar ECG y función de sincronización, equipo de reanimación y sedación si no retrasa la descarga necesaria.',critB:'Clasificar mecanismo y corregir hipoxia/isquemia/electrólitos; si polimórfica o sin pulso, seguir algoritmo de desfibrilación apropiado.',
 yellow:'taquicardia no sinusal confirmada en ECG, regular o irregular, de QRS estrecho o ancho',
 yellowHint:'Un QRS ancho se trata como TV hasta aclarar diagnóstico. La adenosina no se administra automáticamente a ritmos irregulares ni a FA preexcitada.',
 yes:'Estable con arritmia probable: clasificar ECG y riesgo antes de seleccionar maniobra o fármaco.',yesA:'Evaluar duración, cardiopatía, QRS, regularidad y estabilidad, más ECG de 12 derivaciones.',yesB:'Elegir vía de control de ritmo o frecuencia según diagnóstico; interconsulta urgente si QRS ancho o incertidumbre.',
 normal:'La taquicardia sinusal suele ser respuesta a fiebre, hipovolemia, hipoxia, dolor o anemia.',normalA:'Buscar y tratar causa de base.',normalB:'Repetir ECG y signos de perfusión si la frecuencia no mejora.'});
simple({id:'post-paro',icon:'🫁',cat:'Reanimación',title:'Cuidados post-paro · ROSC',sub:'Oxigenación, perfusión, temperatura y pronóstico diferido',priority:'crítica',sources:['POST','AHA'],
 red:'tras retorno de circulación, hipoxia, hipotensión persistente, arritmia grave o shock refractario',
 redHint:'El regreso del pulso no significa estabilidad. Evitar hipoxemia e hiperoxemia extremas, vigilar ventilación, ECG y glucosa.',
 critTitle:'🚨 Inestabilidad post-ROSC: soporte avanzado',crit:'Priorizar tratamiento de causa reversible y evitar lesión cerebral secundaria.',critA:'Asegurar ventilación y oxigenación tituladas, presión/perfusión, ECG de 12 derivaciones y apoyo UCI.',critB:'Considerar coronariografía cuando esté indicada; manejo protocolizado de temperatura y búsqueda de convulsiones.',
 yellow:'coma persistente, necesidad de ventilación, encefalopatía o disfunción orgánica post-ROSC',
 yellowHint:'Pronóstico neurológico prematuro es inseguro; sedación y temperatura confunden. Aplicar neuropronóstico multimodal y diferido.',
 yes:'UCI con estrategia post-paro, prevención de fiebre y monitorización neurológica.',yesA:'Evaluar causas cardiacas y no cardiacas; optimizar perfusión y gasometría.',yesB:'Prevenir fiebre, detectar convulsiones y evitar decisiones pronósticas antes del tiempo recomendado.',
 normal:'Paciente despierto post-ROSC requiere estudio etiológico, evaluación cardíaca/neurológica y vigilancia intensiva.',normalA:'Planificar valoración cardiológica y causas precipitantes.',normalB:'Monitorizar recurrencia de arritmia y deterioro.'});
simple({id:'choque-indiferenciado',icon:'🩸',cat:'Reanimación',title:'Choque indiferenciado',sub:'Séptico, cardiogénico, hipovolémico u obstructivo',priority:'crítica',sources:['SSC','AHA'],
 red:'hipoperfusión, piel moteada, oliguria, conciencia alterada, lactato alto o hipotensión con deterioro',
 redHint:'El choque no exige hipotensión; integrar perfusión, ecografía a pie de cama, ECG, Hb/lactato y antecedentes. No dar cargas indiscriminadas en edema pulmonar/taponamiento.',
 critTitle:'🚨 Choque: reanimación y fenotipificación',crit:'Paciente en falla circulatoria; requiere soporte inmediato y búsqueda de mecanismo.',critA:'ABCDE, monitorización y accesos; examinar sangrado, sepsis, corazón, pulmón y obstrucción con POCUS si disponible.',critB:'Resucitar según fenotipo y respuesta; considerar vasoactivos, hemoderivados o control de foco sin retrasos.',
 yellow:'signos de mala perfusión compensada o posible causa de choque sin hipotensión sostenida',
 yellowHint:'Tendencia de frecuencia, llenado capilar, diuresis y lactato son útiles, pero ninguna variable sola establece etiología.',
 yes:'Evaluación hemodinámica seriada y preparación de reanimación.',yesA:'Buscar foco séptico, hemorragia, SCA, TEP, taponamiento o tensión intratorácica.',yesB:'Reevaluar líquidos/vasoactivos y criterio UCI en función de respuesta y comorbilidades.',
 normal:'Valores iniciales normales no excluyen choque oculto ni evolución a falla circulatoria.',normalA:'Tomar signos vitales seriados, perfusión y evaluación dirigida.',normalB:'Escalar si aumenta lactato, cae diuresis o se altera estado mental.'});
simple({id:'sepsis-choque',icon:'🦠',cat:'Reanimación',title:'Sepsis y choque séptico · SSC 2026',sub:'Antimicrobianos oportunos, perfusión, cultivos y foco',priority:'crítica',sources:['SSC'],
 red:'infección probable con shock, hipoperfusión o falla orgánica progresiva',
 redHint:'La sepsis es diagnóstico clínico; no esperar un biomarcador ni un score aislado. Antibioterapia inmediata en shock probable, tomando cultivos si no generan demora.',
 critTitle:'🚨 Choque séptico: antibióticos y reanimación',crit:'Sepsis con inestabilidad: priorizar antimicrobianos, hemodinamia y control de foco según SSC 2026.',critA:'Cultivos antes de antibiótico si no retrasan; antibiótico IV oportuno adaptado al foco, resistencia, alergias y riesgo de MDR.',critB:'Cristaloides guiados por respuesta y tolerancia, vasopresor temprano si persiste hipotensión; considerar comienzo concomitante si shock inestable.',critC:'Buscar drenaje/control de foco e ingreso UCI; desescalar según microbiología.',
 yellow:'infección probable con disfunción orgánica sin shock o datos que exigen valoración de sepsis',
 yellowHint:'Identificar foco y probabilidad de infección bacteriana; documentar estado circulatorio, oxigenación, riñón, estado mental y lactato según contexto.',
 yes:'Evaluar y tratar sepsis sin shock según probabilidad y evolución.',yesA:'Iniciar antibióticos en el tiempo recomendado para sepsis probable, según gravedad y diagnóstico diferencial.',yesB:'Buscar foco/cultivos e iniciar vigilancia de perfusión, órgano diana y respuesta.',
 normal:'Ausencia de criterios de sepsis no excluye infección ni enfermedad no infecciosa potencialmente grave.',normalA:'Investigar alternativas y foco con evaluación clínica completa.',normalB:'Reevaluar si hay deterioro, hipotensión, encefalopatía u oliguria.'});
simple({id:'anafilaxia-adulto',icon:'🚨',cat:'Reanimación',title:'Anafilaxia del adulto',sub:'Adrenalina IM inmediata; evitar retrasos y vías erróneas',priority:'crítica',sources:['ANAPH','AHA'],
 red:'exposición posible con compromiso respiratorio, circulatorio, laringeo o anafilaxia clínica probable',
 redHint:'No esperar hipotensión o urticaria para tratar. La adrenalina IM en muslo es primera línea; vía/concentración diferentes del paro IV/IO.',
 critTitle:'🚨 Adrenalina IM y ABCDE',crit:'Anafilaxia probable con compromiso vital requiere adrenalina intramuscular inmediata.',critA:'Adrenalina IM apropiada a edad/peso y presentación, oxigenar, colocar al paciente según perfusión y pedir ayuda de reanimación.',critB:'Líquidos y soporte de vía aérea según respuesta; los antihistamínicos/corticoides no sustituyen adrenalina.',
 yellow:'manifestaciones alérgicas de progresión o síntomas sistémicos tras posible alérgeno',
 yellowHint:'La evolución puede ser impredecible y bifásica. Diferenciar urticaria aislada de anafilaxia y revisar tiempo desde exposición.',
 yes:'Vigilancia y decisión clínica por evolución; si aparece anafilaxia, adrenalina IM sin demora.',yesA:'Reexaminar respiración, voz, perfusión y síntomas GI/sistémicos.',yesB:'Definir observación, educación y seguimiento según gravedad; no dar de alta desde esta ruta.',
 normal:'No toda reacción cutánea es anafilaxia; vigilar y documentar criterios de retorno.',normalA:'Confirmar síntomas y posibles desencadenantes.',normalB:'Activar vía de anafilaxia ante compromiso respiratorio/circulatorio.'});
simple({id:'choque-cardiogenico',icon:'🫀',cat:'Cardiovascular',title:'Choque cardiogénico',sub:'Hipoperfusión por falla de bomba, POCUS y soporte escalonado',priority:'crítica',sources:['ACS','AHA_HF'],
 red:'hipoperfusión con edema pulmonar, isquemia, falla de bomba o arritmia inestable',
 redHint:'POCUS/eco y ECG para diferenciar disfunción ventricular, taponamiento y shock mixto. No dar cargas de líquidos a ciegas.',
 critTitle:'🚨 Shock cardiogénico: equipo de choque',crit:'Requiere valoración cardiológica/UCI inmediata, identificación de causa y soporte perfusional.',critA:'Monitorizar oxigenación/ECG/perfusión, realizar eco cuando disponible y buscar SCA o arritmia.',critB:'Vasoactivos e inotrópicos titulados a fenotipo y respuesta, revascularización urgente si SCA causante; evaluar soporte mecánico en shock refractario.',
 yellow:'congestión pulmonar, troponina/ECG anormales o datos de disfunción ventricular sin hipotensión franca',
 yellowHint:'Congestión, hipoperfusión y presiones de llenado varían; distinguir shock derecho/izquierdo y sepsis concomitante.',
 yes:'Insuficiencia cardiaca aguda con alto riesgo: valoración hospitalaria y hemodinámica.',yesA:'ECG, troponina, ecocardiograma, balance y función renal.',yesB:'Guiar descongestión o soporte según perfusión, evitando hipotensión iatrogénica.',
 normal:'Ante sospecha persistente de disfunción cardiaca seguir evaluación cardiológica y ECG seriado.',normalA:'Buscar causas alternativas de disnea e hipotensión.',normalB:'Reevaluar perfusión y signos vitales si progresa.'});
simple({id:'sindrome-coronario',icon:'❤️',cat:'Cardiovascular',title:'Síndrome coronario agudo · ACC/AHA 2025',sub:'ECG rápido, STEMI y estrategia invasiva sin demoras',priority:'crítica',sources:['ACS'],
 red:'dolor/isquemia con shock, edema pulmonar, arritmia grave o elevación ST compatible con oclusión coronaria',
 redHint:'ECG de 12 derivaciones urgente y repetido cuando corresponda. No retrasar reperfusión por troponina si oclusión coronaria probable.',
 critTitle:'🚨 Activar código infarto/reperfusión',crit:'El IAM con elevación ST o SCA inestable necesita circuito de reperfusión/angiografía urgente.',critA:'ABCDE, ECG y contacto cardiología/hemodinamia; determinar si ICP primaria factible o estrategia de reperfusión local apropiada.',critB:'Antiagregación/anticoagulación ajustadas a diagnóstico y contraindicaciones; no dar fibrinolíticos sin descartar disección aórtica y evaluar riesgos.',
 yellow:'dolor sugestivo con cambios isquémicos, troponina dinámica o alto riesgo clínico sin elevación ST',
 yellowHint:'Riesgo de NSTEMI/angina inestable: ECG seriado y troponinas según protocolo; evaluar hipotensión, sangrado y terapias antitrombóticas.',
 yes:'SCA sin elevación ST probable: riesgo y manejo cardiológico temprano.',yesA:'Troponina seriada, ECG repetido y estratificación de riesgo/complicaciones.',yesB:'Elegir estrategia invasiva y fármacos antitrombóticos tras revisar sangrado, alergias y etiología.',
 normal:'ECG y troponina iniciales normales no descartan todo SCA en fase temprana.',normalA:'Considerar diagnósticos alternativos letales: disección, TEP, neumotórax.',normalB:'Seguir regla de descarte validada y observación cuando corresponda.'});
simple({id:'edema-agudo-pulmon',icon:'🌊',cat:'Cardiovascular',title:'Edema agudo pulmonar cardiogénico',sub:'Oxígeno/VNI, congestión, perfusión y urgencia hipertensiva',priority:'crítica',sources:['AHA_HF','RSI'],
 red:'edema pulmonar con fatiga, hipoxemia grave, hipotensión o fracaso ventilatorio',
 redHint:'Distinguir congestión hipertensiva de shock cardiogénico. La VNI exige conciencia y protección de vía aérea adecuadas; no retrasar intubación cuando falla.',
 critTitle:'🚨 Soporte respiratorio y hemodinámico',crit:'Edema pulmonar con falla respiratoria o choque requiere soporte urgente e identificación del precipitante.',critA:'Oxigenación y considerar presión positiva si candidata; monitor ECG y presión, ecografía y preparación de vía aérea experta.',critB:'En hipertensión con congestión considerar vasodilatación apropiada; en hipoperfusión evitar vasodilatadores/diuréticos indiscriminados y priorizar perfusión.',
 yellow:'ortopnea, crepitantes y signos de sobrecarga con trabajo respiratorio aumentado',
 yellowHint:'Considerar SCA, FA rápida, crisis hipertensiva, valvulopatía e insuficiencia renal; BNP/eco e imagen ayudan.',
 yes:'Descompensación congestiva: tratamiento dirigido a presión/perfusión.',yesA:'Valorar oxígeno, VNI, tratamiento de congestión y causa precipitante según hemodinamia.',yesB:'Vigilar diuresis, electrólitos, ECG y trabajo respiratorio; escalar si no responde.',
 normal:'Explorar alternativas: EPOC, neumonía, TEP, ARDS y otras causas de disnea.',normalA:'Reexaminar signos vitales y prueba dirigida.',normalB:'Reevaluar urgencia de ingreso si persiste dificultad respiratoria.'});
simple({id:'tromboembolia-pulmonar',icon:'🫁',cat:'Cardiovascular',title:'Tromboembolia pulmonar aguda · AHA 2026',sub:'Inestabilidad, sospecha clínica, imagen y reperfusión',priority:'crítica',sources:['PE'],
 red:'TEP sospechada con shock, síncope inestable, paro o insuficiencia derecha aguda',
 redHint:'El paciente inestable puede no tolerar traslado a tomografía. POCUS y eco apoyan, pero no sustituyen la integración clínica; considerar contraindicación a anticoagulación.',
 critTitle:'🚨 TEP de alto riesgo: respuesta multidisciplinaria',crit:'Hipotensión/choque con sospecha fuerte de TEP requiere tratamiento y consideración urgente de reperfusión.',critA:'ABCDE, apoyo UCI y PERT/cardiología, eco a pie de cama si disponible y hemodinamia orientada a falla de VD.',critB:'Decidir anticoagulación y trombólisis/trombectomía/embolectomía según diagnóstico probable, riesgo hemorrágico y recursos; no usar fibrinolítico sin evaluación experta.',
 yellow:'disnea súbita, dolor pleurítico, hipoxemia, TVP o probabilidad clínica elevada en paciente estable',
 yellowHint:'Usar probabilidad preprueba (Wells/Ginebra), dímero D en apropiados y angioTC según algoritmo. Dímero D no descarta en alta probabilidad.',
 yes:'Estable con TEP posible: estratificar y obtener diagnóstico.',yesA:'Aplicar probabilidad preprueba; solicitar imagen/laboratorio por riesgo y contraindicaciones.',yesB:'Evaluar indicación/elección de anticoagulante y necesidad de hospitalización por riesgo de deterioro.',
 normal:'Baja sospecha y pruebas negativas conforme a vía validada exigen explorar otras causas; un resultado aislado no autoriza alta.',normalA:'Considerar SCA, neumotórax, infección y patología vascular.',normalB:'Reevaluar ante taquicardia, hipoxemia o síncope.'});
simple({id:'diseccion-aortica',icon:'🩻',cat:'Cardiovascular',title:'Síndrome aórtico agudo',sub:'Dolor desgarrante, déficit de pulso y cirugía urgente',priority:'crítica',sources:['ACS','BP'],
 red:'dolor torácico/dorsal súbito con déficit de pulso, síncope, shock, síntomas neurológicos o sospecha de disección proximal',
 redHint:'No confundir disección con SCA ni dar fibrinólisis/anticoagulantes por rutina antes de valorarla. Evaluar imagen urgente y cirugía vascular/cardiotorácica.',
 critTitle:'🚨 Sospecha de disección aórtica de alto riesgo',crit:'Se requiere imagen y evaluación quirúrgica inmediata sin esperar troponina u otros resultados accesorios.',critA:'ABCDE, monitor, analgesia y control de impulso aórtico por equipo entrenado cuando hemodinámicamente apropiado.',critB:'Coordinar angioTC/eco según estabilidad y referencia para cirugía/endovascular urgente; evitar antitrombóticos no indicados.',
 yellow:'dolor abrupto de alta intensidad, asimetría de pulsos, mediastino anormal o factores predisponentes',
 yellowHint:'La ausencia de todos los signos clásicos NO descarta disección. Tomografía con protocolo aórtico si está indicada.',
 yes:'Evaluación inmediata de aorta y riesgo.',yesA:'Confirmar sospecha clínica, función renal, estabilidad e imagen apropiada.',yesB:'Interconsulta cardio/vascular, monitor y analgesia mientras se resuelve diagnóstico.',
 normal:'Si sospecha persiste, valorar diagnósticos letales alternativos y examen vascular seriado.',normalA:'Descartar SCA/TEP/esofágico según hallazgos.',normalB:'Reevaluar si reaparece dolor intenso o alteración perfusional.'});
simple({id:'emergencia-hipertensiva',icon:'🩺',cat:'Cardiovascular',title:'Emergencia hipertensiva',sub:'Lesión de órgano diana, no solo cifras de presión',priority:'crítica',sources:['BP','STROKE','ICH'],
 red:'elevación marcada de PA CON edema pulmonar, encefalopatía, disección, SCA, LRA aguda o lesión vascular activa',
 redHint:'La emergencia se define por lesión aguda de órgano blanco, no por cifra aislada. En disección, ictus, hemorragia intracerebral y embarazo las metas difieren.',
 critTitle:'🚨 PA alta con órgano diana: UCI y control específico',crit:'Se requiere tratamiento parenteral titulado y monitorización del órgano afectado, sin reducciones bruscas no indicadas.',critA:'Confirmar PA con técnica adecuada, evaluar ECG, neurología, pulmones, riñón y fondo según contexto.',critB:'Elegir antihipertensivo IV y velocidad por síndrome; evitar reducción excesiva de perfusión cerebral/coronaria.',
 yellow:'PA muy elevada persistente SIN lesión aguda demostrada o síntomas que requieren estudio dirigido',
 yellowHint:'No medicalizar una cifra con fármacos IV sin evidencia de daño agudo; identificar dolor, abstinencia y pseudoelevación.',
 yes:'Hipertensión severa sin daño confirmado: estudio y tratamiento gradual.',yesA:'Confirmar técnica/mediciones y buscar lesión aguda según síntomas.',yesB:'Modificar tratamiento y plan de seguimiento según perfil; no bajar bruscamente la presión sin indicación.',
 normal:'La PA normal al momento de una sola medición no excluye lesión vascular en curso.',normalA:'Repetir mediciones y buscar causa de síntomas.',normalB:'Escalar si aparece déficit neurológico, dolor torácico o falla cardiaca.'});
})(typeof window!=='undefined'?window:globalThis);
