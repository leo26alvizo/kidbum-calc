/* KidBum Pediatría × Pharma Pro · 0.10.55
 * 29/29 clinical reference dossiers. Every numeric regimen is restricted to
 * a specific algorithm, outcome, indication, population, route and source.
 * Doses are CITED TEXT REFERENCES, never orders, dosage calculators, or Mexico
 * marketing authorization. Unverified contexts FAIL CLOSED.
 * This module does not store, collect, send or infer patient information.
 */
(function(root){
'use strict';
const bridge=root.KidBumPediatricTherapyBridge||null;
/* Standalone in Pharma Pro; linked-graph validation runs when bridge is loaded. */
const SOURCE=Object.freeze({
 AHA_PALS:{name:'AHA/AAP · PALS 2025',year:'2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support'},
 AHA_BRADY:{name:'AHA/AAP · algoritmo de bradicardia pediátrica 2025',year:'2025',url:'https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-PALS-Bradycardia-250121.pdf'},
 AHA_TACHY:{name:'AHA/AAP · algoritmo taquiarritmia pediátrica 2025',year:'2025',url:'https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-PALS-Tachyarrhythmia-250117.pdf'},
 ANZ_PALS:{name:'ANZCOR · Pediatric Advanced Life Support',year:'2026',url:'https://www.anzcor.org/home/paediatric-advanced-life-support/guideline-12-2-paediatric-advanced-life-support-pals'},
 RCH_ANAPH:{name:'RCH Melbourne · Anaphylaxis',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Anaphylaxis/'},
 RCH_CROUP:{name:'RCH Melbourne · Croup',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Croup_laryngotracheobronchitis/'},
 RCH_SEIZURE:{name:'RCH Melbourne · Seizures – acute management',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Seizures_-_acute_management/'},
 RCH_MEN:{name:'RCH Melbourne · Meningitis and encephalitis',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Meningitis_and_encephalitis/'},
 RCH_NEUTRO:{name:'RCH Melbourne · Febrile neutropenia',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/febrile_neutropenia/'},
 RCH_ASTHMA:{name:'RCH Melbourne · Acute asthma',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Asthma_acute/'},
 RCH_CAP:{name:'RCH Melbourne · Community acquired pneumonia',year:'2023',url:'https://www.rch.org.au/clinicalguide/guideline_index/Community_acquired_pneumonia/'},
 NICE_CAP:{name:'NICE NG250 · Pneumonia diagnosis and management',year:'2025',url:'https://www.nice.org.uk/guidance/ng250/chapter/Recommendations'},
 RCH_ABX:{name:'RCH Melbourne · Antimicrobial guidelines',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/antibiotics/'},
 RCH_UTI:{name:'RCH Melbourne · Urinary tract infection',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Urinary_tract_infection/'},
 RCH_GLU:{name:'RCH Melbourne · Diabetes: unwell children in hospital',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Diabetes_mellitus__management_of_unwell_children_with_established_diabetes_in_hospital/'},
 CPS_DKA:{name:'Canadian Paediatric Society · Pediatric diabetic ketoacidosis',year:'2023',url:'https://cps.ca/en/documents/position/current-recommendations-for-management-of-paediatric-diabetic-ketoacidosis'},
 RCH_PAIN:{name:'RCH Melbourne · Acute pain management',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Analgesia_and_sedation/'},
 RCH_NEO:{name:'RCH Melbourne · Recognition of the seriously unwell neonate',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Recognition_of_the_seriously_unwell_neonate_and_young_infant/'},
 NICE_NEO:{name:'NICE NG195 · Neonatal infection',year:'2021 con actualizaciones',url:'https://www.nice.org.uk/guidance/ng195'},
 RCH_HYPO:{name:'RCH Melbourne · Hyponatraemia',year:'consulta 2026',url:'https://www.rch.org.au/clinicalguide/guideline_index/Hyponatraemia/'},
 RCH_AKI:{name:'NICE NG148 · Acute kidney injury',year:'2019',url:'https://www.nice.org.uk/guidance/ng148/chapter/Recommendations'}
});
const check=(d)=>Object.freeze(d);
function dose(id,algorithm,branches,scope,doseText,route,interval,maximum,source,guard,monitor,duration='Según respuesta y protocolo'){
 return Object.freeze({id,algorithm,branches:Object.freeze(branches),scope,doseText,route,interval,maximum,source,guard,monitor,duration,
  evidence:'pauta-documental-especifica',jurisdiction:'Guía internacional; NO autorización ni posología mexicana confirmada'});
}
function dossier(id,indication,source,watch,avoid,renal,hepatic,regimens=[],pending='No se cotejó una pauta numérica segura para todas las indicaciones, vías, edades y presentaciones de este medicamento.'){
 return Object.freeze({id,indication,source,watch:Object.freeze(watch),avoid:Object.freeze(avoid),renal,hepatic,
  regimens:Object.freeze(regimens),pending,status:regimens.length?'referencias-documentadas-parciales':'sin-pauta-numerica-revisada'});
}
const M=Object.freeze({
 adrenalina:dossier('adrenalina','Anafilaxia, crup, paro PALS y reanimación neonatal: vías y concentraciones NO intercambiables.','RCH_ANAPH',
 ['Monitorización respiratoria y hemodinámica; posible arritmia.','Doble verificación independiente de vía, concentración, dispositivo y unidades.'],
 ['NUNCA usar dosis de anafilaxia IM como si fuera dosis IV/IO de paro.','La adrenalina nebulizada para crup NO reemplaza adrenalina IM de anafilaxia.'],
 'No hay ajuste universal; situación hemodinámica determina vigilancia.','Insuficiencia hepática no permite extrapolar una pauta de otra indicación.',[
  dose('anaphylaxis-im','anafilaxia',['immediate'],'Anafilaxia pediátrica probable; valoración ABCDE inmediata.',
  '0.01 mg/kg de adrenalina 1 mg/mL por vía IM (0.01 mL/kg del preparado 1 mg/mL).','IM en muslo anterolateral','Repetir según respuesta y protocolo de anafilaxia, habitualmente cada 5 min.','0.5 mg por dosis','RCH_ANAPH',
  'Usar SOLO presentación IM apropiada. No es pauta IV; no demorar por antihistamínicos.','Estado respiratorio, perfusión, ritmo y respuesta a adrenalina.'),
  dose('pals-arrest','paro-pediatrico',['shock','nonshock'],'Paro pediátrico confirmado, durante RCP y acceso IV/IO; fuera de reanimación neonatal al nacer.',
  '0.01 mg/kg por vía IV/IO utilizando concentración 0.1 mg/mL.','IV/IO','Según secuencia PALS (habitualmente cada 3–5 min)','1 mg por dosis','ANZ_PALS',
  'NO es la misma concentración que IM de anafilaxia. Primero RCP y desfibrilación si procede.','Calidad RCP, ritmo y tiempo de dosis.'),
  dose('pals-brady','bradicardia-pals',['critical'],'Bradicardia sintomática persistente con mala perfusión tras oxigenación/ventilación correctas.',
  '0.01 mg/kg IV/IO (concentración 0.1 mg/mL).','IV/IO','Seguir algoritmo de bradicardia PALS y reevaluación','1 mg por dosis','AHA_BRADY',
  'Ventilación y compresiones si FC <60/min con mala perfusión; no confundir con vía IM.','ECG, perfusión, respuesta de FC.'),
  dose('croup-nebulized','crup',['critical'],'Crup con obstrucción potencialmente mortal, tratamiento en área de reanimación.',
  '5 mL de adrenalina 1 mg/mL (1:1000) nebulizada, según RCH para crup potencialmente mortal.','NEBULIZADA','Según respuesta, siempre con observación y apoyo experto','5 mg (5 mL del preparado 1 mg/mL)','RCH_CROUP',
  'No usar esta dosis o vía para anafilaxia. Preparar equipo de vía aérea y evitar agitación.','Estridor en reposo, trabajo respiratorio, FC y recurrencia tras nebulización.')
 ],'En reanimación neonatal las dosis dependen del algoritmo NRP 2025 y deben verificarse por el equipo de neonatología; NO extrapolar la pauta PALS.'),
 noradrenalina:dossier('noradrenalina','Vasopresor de choque séptico persistente individualizado bajo cuidados avanzados.','AHA_PALS',
 ['Presión arterial continua, perfusión, lactato/diuresis, extravasación y arritmias.','Validar dilución, bomba y acceso con el servicio.'],
 ['No iniciar por una lectura aislada de presión ni sin evaluar reanimación hemodinámica.'],
 'Ajustar según perfusión y situación renal; ninguna velocidad universal se muestra.','Valorar aclaramiento y respuesta en falla multiorgánica.'),
 salbutamol:dossier('salbutamol','Broncodilatador SABA en crisis asmática; coadyuvante solo después de adrenalina en anafilaxia.','RCH_ASTHMA',
 ['Frecuencia cardiaca, esfuerzo, saturación y respuesta.','Potasio/lactato si uso frecuente/prolongado.'],
 ['No indicar de rutina en bronquiolitis.','No reemplaza adrenalina IM de anafilaxia.'],
 'En enfermedad renal, controlar potasio según uso acumulado.','Vigilancia clínica si enfermedad hepática.'),
 ipratropio:dossier('ipratropio','Adyuvante anticolinérgico inhalado en crisis asmática moderada/grave seleccionada.','RCH_ASTHMA',
 ['Evaluar mejoría en esfuerzo/entrada de aire y frecuencia de rescate.'],
 ['No sustituye salbutamol ni soporte respiratorio.','No es un tratamiento rutinario de bronquiolitis.'],
 'Absorción sistémica habitualmente limitada; verificar formulación y comorbilidades.','Verificar respuesta y medicación concomitante.'),
 dexametasona:dossier('dexametasona','Glucocorticoide para crup, dosis específica según gravedad.','RCH_CROUP',
 ['Respuesta respiratoria y glucemia cuando corresponda.'],
 ['No confundir con la dosis de meningitis ni con terapia de bronquiolitis.','Precaución ante infección no tratada cuando corresponde.'],
 'Revisar función renal y comorbilidades; no ajustar automáticamente.','Valorar enfermedad hepática y exposición a esteroides.',[
  dose('croup-severe','crup',['critical'],'Crup grave o potencialmente mortal con apoyo avanzado.',
  '0.6 mg/kg por dosis.','VO, IM o IV según tolerancia y gravedad','Dosis única inicial en protocolo de crup','12 mg por dosis','RCH_CROUP',
  'Si hay inestabilidad respiratoria, vía aérea y soporte experto primero.','Estridor, trabajo respiratorio, recurrencia.'),
  dose('croup-moderate','crup',['moderate','mild'],'Crup moderado con estridor o caso leve con factores que justifican corticoide.',
  '0.15 mg/kg por vía oral cuando está indicado.','VO','Dosis inicial única; reevaluar','La referencia usada no especifica un máximo en este subgrupo; comprobar protocolo','RCH_CROUP',
  'No indicar por tos perruna aislada sin estridor/factores de riesgo; crup grave usa pauta diferente.','Estridor y capacidad de ingerir líquidos.')
 ]),
 prednisona:dossier('prednisona','Glucocorticoide sistémico en exacerbación asmática seleccionada.','RCH_ASTHMA',
 ['Glucosa, vómito, duración de terapia y respuesta clínica.'],
 ['La pauta de PREDNISOLONA de otra guía no valida automáticamente formulaciones de PREDNISONA.'],
 'No extrapolar ajuste sin conocer comorbilidades.','Metabolismo hepático: validar producto y exposición.'),
 midazolam:dossier('midazolam','Benzodiacepina de primera línea en convulsión prolongada.','RCH_SEIZURE',
 ['Frecuencia respiratoria, saturación y conciencia.','Llevar registro de benzodiacepinas ya administradas.'],
 ['No repetir múltiples dosis sin soporte ventilatorio y protocolo.','No sumar alternativas de benzodiacepinas como una orden combinada.'],
 'Valorar función renal en exposición repetida/infusiones.','Alteración hepática puede prolongar sedación.',[
  dose('seizure-buccal-in','convulsion',['status'],'Crisis convulsiva prolongada, vía bucal/intranasal disponible y equipo entrenado.',
  '0.3 mg/kg por dosis.','Bucal o intranasal','Dosis de rescate según protocolo (considerar dosis previas)','10 mg por dosis','RCH_SEIZURE',
  'Solución inyectable y presentación oromucosal NO son intercambiables por vía; verificar concentración.','Vía aérea, respiración y persistencia de crisis.'),
  dose('seizure-parenteral','convulsion',['status'],'Crisis prolongada cuando está indicada vía parenteral por equipo clínico.',
  '0.15 mg/kg por dosis.','IV, IM o IO','Dosis de primera línea según protocolo y fármacos previos','10 mg por dosis','RCH_SEIZURE',
  'Preparar soporte de ventilación; no duplicar por tener dos vías en pantalla.','Ventilación, saturación y respuesta.')
 ]),
 diazepam:dossier('diazepam','Alternativa benzodiacepina de rescate para estado convulsivo.','RCH_SEIZURE',
 ['Ventilación, conciencia, ritmo y número de dosis previas.'],
 ['NO administrar diazepam IM en la ruta RCH de convulsiones.','No sumar sistemáticamente diazepam con midazolam.'],
 'Valorar acumulación en enfermedad renal y paciente crítico.','Mayor vida media en disfunción hepática.',[
  dose('seizure-iv','convulsion',['status'],'Estado convulsivo con vía IV/IO y soporte de respiración disponible.',
  '0.3 mg/kg por dosis.','IV/IO (NO IM)','Según respuesta y protocolo de benzodiacepinas','10 mg por dosis','RCH_SEIZURE',
  'El documento RCH indica no administrar IM; vigilar ventilación.','Cese de convulsión, respiración y sedación.')
 ]),
 levetiracetam:dossier('levetiracetam','Anticonvulsivante de segunda línea en estado epiléptico tras tratamiento inicial.','RCH_SEIZURE',
 ['Resolución de convulsión, somnolencia, conducta y función renal.'],
 ['No reemplaza benzodiacepina inicial en estado convulsivo prolongado.'],
 'Requiere ajuste individual en disminución de función renal.','Evaluar comorbilidad hepática si existe.',[
  dose('seizure-second-line','convulsion',['status'],'Estado epiléptico persistente tras primera línea y equipo con acceso IV/IO.',
  '40–60 mg/kg dosis de carga.','IV/IO','Dosis de carga única según protocolo de segunda línea','4.5 g por carga','RCH_SEIZURE',
  'No convertir esta referencia en dosis de mantenimiento; confirmar dilución y velocidad de administración con el hospital.','Convulsión, estado neurológico y función renal.')
 ]),
 glucagon:dossier('glucagon','Rescate de hipoglucemia grave en niño con diabetes conocida cuando vía oral no es segura y acceso IV no disponible.','RCH_GLU',
 ['Glucemia repetida, vómitos, recidiva y recuperación neurológica.'],
 ['Puede fallar con ayuno prolongado, malnutrición o depleción de glucógeno.','No administrar alimento VO si conciencia/deglución alterada.'],
 'Valorar situación clínica, no pauta renal automática.','Respuesta puede reducirse con depleción hepática de glucógeno.',[
  dose('hypoglycemia-rescue','hipoglucemia',['emergency'],'Niños con diabetes conocida y crisis grave; producto tradicional reconstituido y manejo supervisado.',
  'Menos de 25 kg: 0.5 mg. Más de 25 kg: 1 mg. Peso EXACTAMENTE 25 kg: verificar protocolo y producto, no inferir.','IM','Rescate inicial; revaluar glucemia y solicitar atención urgente','1 mg para los pacientes incluidos en la pauta de >25 kg','RCH_GLU',
  'Las nuevas formulaciones de glucagón NO comparten necesariamente esta pauta.','Glucosa y recuperación de conciencia.')
 ]),
 'insulina-regular':dossier('insulina-regular','Insulina regular IV en cetoacidosis diabética pediátrica bajo protocolo hospitalario.','CPS_DKA',
 ['Glucosa, cetonas, electrolitos, sodio corregido, potasio y estado neurológico en forma seriada.'],
 ['NUNCA bolo IV de insulina en CAD pediátrica de rutina.','No comenzar si potasio ≤3.0 mmol/L ni antes de reanimación inicial adecuada.'],
 'Ajustar por respuesta, perfusión y alteraciones renales; no inferir dosis personalizada.','En falla hepática, vigilar hipoglucemia.',[
  dose('dka-infusion','cetoacidosis',['critical','hospital'],'CAD pediátrica hospitalaria, tras primera hora de fluidos y potasio >3.0 mmol/L según CPS.',
  'Infusión IV 0.05–0.1 unidades/kg/h (rango de referencia).','Infusión IV continua','Continuo; ajustar solo por glucosa/cetonas/gasometría seriadas y protocolo','No hay máximo universal por peso en la guía citada','CPS_DKA',
  'Nunca bolo IV. La elección entre 0.05 y 0.1 depende de gravedad y monitorización.','Glucemia, cetonas, potasio, sodio corregido, signos de lesión cerebral.')
 ]),
 'sulfato-magnesio':dossier('sulfato-magnesio','Coadyuvante parenteral en crisis asmática potencialmente mortal o grave refractaria.','RCH_ASTHMA',
 ['Presión arterial, ritmo, reflejos, ventilación y respuesta bronquial.'],
 ['No usar rutinariamente en asma leve.','Confirmar concentración y unidad: mg vs mmol vs mL.'],
 'Insuficiencia renal aumenta toxicidad; requiere control individual.','Valorar comorbilidades.',[
  dose('asthma-refractory','asma-crisis',['critical'],'Crisis asmática grave/refractaria evaluada por equipo especializado.',
  '50 mg/kg (equivalente a 0.2 mmol/kg en la guía RCH).','IV bajo monitorización','Una administración según protocolo de emergencia','8 mmol por dosis (equivalente a 2 g de sulfato de magnesio)','RCH_ASTHMA',
  'La presentación de MgSO4 varía; NO calcular mL aquí.','TA, respiración, ECG y función renal.')
 ]),
 amoxicilina:dossier('amoxicilina','Neumonía adquirida en comunidad probablemente bacteriana en niño clínicamente elegible para vía oral.','NICE_CAP',
 ['Respuesta en 24–48 h, alergias, diarrea y tolerancia.'],
 ['No indicar por neumonía viral ni bronquiolitis.','Confirmar amoxicilina SOLA, no amoxicilina/clavulanato.'],
 'La insuficiencia renal puede requerir ajuste de intervalo; validar función renal.','Ajuste según hepatopatía y formulación cuando corresponda.',[
  dose('cap-oral','neumonia',['assess-mild'],'Niños ≥3 meses y ≤17 años con neumonía comunitaria para la que se ha decidido tratamiento con amoxicilina oral.',
  '30 mg/kg por dosis (NO mg/kg/día).','VO','Cada 8 horas, según NICE NG250','1.2 g por dosis','NICE_CAP',
  'Duración depende de edad y gravedad: no aplicar 3 días a neumonía complicada o lactantes fuera de alcance.','Respuesta clínica, alergia, adherencia, tolerancia.')
 ]),
 azitromicina:dossier('azitromicina','Solo patógeno atípico sospechado o circunstancias de alergia a betalactámicos según gravedad/edad.','RCH_CAP',
 ['Evolución respiratoria, ECG/QT si factores de riesgo e interacciones.'],
 ['No añadir macrólido a toda neumonía infantil.','Considerar resistencia y diagnóstico probable.'],
 'Insuficiencia renal grave requiere revisión individual.','Hepatotoxicidad posible; vigilancia según riesgo.',[
  dose('cap-atypical','neumonia',['assess-mild'],'Neumonía atípica considerada por evaluación clínica/epidemiológica; no de primera elección para neumonía neumocócica típica.',
  '10 mg/kg por dosis.','VO','Cada 24 horas; duración según régimen específico del centro','500 mg por dosis','RCH_CAP',
  'RCH advierte beneficio incierto en Mycoplasma pneumoniae no grave; evitar uso indiscriminado.','Respuesta y efectos adversos cardiovasculares.')
 ]),
 ceftriaxona:dossier('ceftriaxona','Cefalosporina parenteral de espectro extendido; la dosis de meningitis NO sirve como pauta de cualquier sepsis o ITU.','RCH_MEN',
 ['Alergia, respuesta microbiológica, colestasis y uso de calcio IV.'],
 ['Neonatos ≤28 días con calcio IV y neonatos hiperbilirrubinémicos: contraindicaciones relevantes.','No mezclar con soluciones que contengan calcio.'],
 'Revisión de función renal/hepática combinada; verificar etiqueta de presentación.','Revisar bilirrubina y patología biliar.',[
  dose('meningitis-2m','meningitis-pediatrica',['critical','urgent'],'Meningitis bacteriana sospechada/confirmada en niños de ≥2 meses según RCH; no neonatal.',
  '100 mg/kg por día (total diario).','IV','Cada 24 horas según pauta RCH','4 g/día','RCH_MEN',
  'Antes de usar: edad, susceptibilidad y contraindicaciones neonatales, interacciones con calcio IV.','Cultivos/LCR, respuesta, tolerancia y bilirrubina.')
 ],'La dosis para sepsis, neumonía grave, ITU o lactante febril NO se extrapola del régimen de meningitis.'),
 cefotaxima:dossier('cefotaxima','Cefalosporina parenteral para meningitis bacteriana en edades específicas; neonatos requieren intervalos particulares.','RCH_MEN',
 ['Respuesta a infección, alergias, función renal y microbiología.'],
 ['No extrapolar intervalo q6h del niño mayor al neonato.'],
 'Ajuste individual si lesión renal.','Comorbilidad hepática y combinación con otros antibióticos.',[
  dose('meningitis-2m','meningitis-pediatrica',['critical','urgent'],'Meningitis bacteriana en niños ≥2 meses; no aplicar al neonato.',
  '50 mg/kg por dosis.','IV','Cada 6 horas','2 g por dosis','RCH_MEN',
  'La pauta de menores de 2 meses depende de edad posnatal y gestacional; consultar protocolo específico.','LCR/cultivos, función renal y respuesta.')
 ]),
 ampicilina:dossier('ampicilina','Parte de algunos esquemas de infección neonatal o lactante febril, nunca aislado sin valoración de foco y susceptibilidad.','NICE_NEO',
 ['Infección, función renal, respuesta microbiológica y reacción alérgica.'],
 ['Dosis y frecuencia cambian por semanas gestacionales, edad posnatal, infección del SNC y función renal.'],
 'Se requiere ajuste renal individual y esquema neonatal correspondiente.','No suponer pauta en colestasis o infección grave.'),
 gentamicina:dossier('gentamicina','Aminoglucósido en infección neonatal, ITU y otros escenarios bajo monitorización farmacológica.','RCH_ABX',
 ['Creatinina, diuresis, niveles farmacológicos según protocolo, audición y respuesta.'],
 ['Toxicidad nefro/otológica; no copiar intervalos entre neonato prematuro y niño mayor.','Compatibilidad y administración IV deben revisarse con farmacia.'],
 'Requiere ajuste por función renal, edad gestacional/posnatal y monitorización de concentraciones.','Valorar situaciones especiales; no ajuste empírico automático.'),
 amiodarona:dossier('amiodarona','Antiarrítmico para FV/TV sin pulso refractaria a desfibrilación, NO asistolia/AESP.','ANZ_PALS',
 ['ECG, QT, presión arterial y respuesta durante reanimación.'],
 ['No retrasar desfibrilación por búsqueda de antiarrítmico.','No es tratamiento automático de taquicardia sinusal.'],
 'Valorar función renal y electrolitos; ajustar según equipo.','Hepatotoxicidad e interacciones relevantes.',[
  dose('pals-fv-tv','paro-pediatrico',['shock'],'FV/TV sin pulso refractaria a descargas en paro pediátrico PALS.',
  '5 mg/kg dosis inicial.','IV/IO durante paro','Según ciclo PALS y decisión del equipo experto','300 mg por dosis inicial','ANZ_PALS',
  'No aplicar a asistolia/AESP. No extrapolar velocidad/forma a arritmia CON pulso.','ECG, desfibrilación, ritmo y perfusión.')
 ]),
 atropina:dossier('atropina','Considerar bradicardia por aumento del tono vagal o bloqueo AV primario en contexto PALS.','AHA_BRADY',
 ['ECG y respuesta de frecuencia/perfusión.'],
 ['NO reemplaza tratamiento de hipoxia con ventilación adecuada.'],
 'Verificar comorbilidad renal y presentación.','Verificar comorbilidad hepática.',[
  dose('pals-vagal','bradicardia-pals',['critical','urgent'],'Bradicardia con pulso causada por tono vagal aumentado o bloqueo AV primario.',
  '0.02 mg/kg por dosis.','IV/IO','Se puede repetir UNA vez según PALS','Mínimo 0.1 mg y máximo 0.5 mg por dosis','AHA_BRADY',
  'No usar por bradicardia hipoxémica sin corregir ventilación/oxigenación.','ECG, pulso y perfusión.')
 ]),
 adenosina:dossier('adenosina','TVS regular de complejo estrecho estable; ciertos ritmos monomorfos regulares de QRS ancho solo bajo equipo experto.','AHA_TACHY',
 ['ECG continuo, ritmo y respuesta, disponibilidad inmediata de reanimación.'],
 ['No usar rutinariamente en taquiarritmias irregulares o de complejo ancho no caracterizadas.','No retrasar cardioversión sincronizada si hay inestabilidad.'],
 'Revisar factores farmacológicos e interacciones; no ajuste renal universal publicado.','Revisión clínica pertinente.',[
  dose('pals-svt','taquicardia-pals',['urgent'],'TSV regular con pulso en paciente clínicamente estable; ritmo confirmado por ECG.',
  'Primera dosis 0.1 mg/kg; si se requiere, segunda 0.2 mg/kg.','IV/IO rápido + lavado','Administración rápida por equipo con ECG y reanimación disponible','Primera: 6 mg. Segunda: 12 mg.','AHA_TACHY',
  'Confirmar ritmo; no usar en taquicardia sinusal o irregular sin especialista.','Trazado ECG continuo y perfusión.')
 ]),
 'amoxicilina-clavulanato':dossier('amoxicilina-clavulanato','Antibiótico oral según microorganismo susceptible; la asociación a ITU es orientativa y no primera línea universal.','RCH_UTI',
 ['Alergias, diarrea, hepatopatía y resultado de urocultivo.'],
 ['Proporción amoxicilina/clavulanato varía mucho por formulación: NO convertir mg de ambos en forma indiscriminada.','No elegir por tira reactiva aislada.'],
 'Amoxicilina puede requerir modificación en insuficiencia renal.','Clavulanato se asocia a lesión hepatobiliar; confirmar antecedentes.'),
 metronidazol:dossier('metronidazol','Cobertura anaerobia seleccionada en infección intraabdominal complicada, en combinación definida por cirugía.','RCH_ABX',
 ['Respuesta, función hepática, síntomas neurológicos e interacciones.'],
 ['No es terapia aislada de todo abdomen agudo.','No se asume cobertura completa de gramnegativos con metronidazol solo.'],
 'Revisar función renal y acumulación de metabolitos.','En hepatopatía severa requiere revisión de dosis.',[
  dose('intraabdominal-sepsis','apendicitis-pediatrica',['critical'],'Apendicitis/infección abdominal complicada con necesidad de cobertura anaerobia según cirugía.',
  '7.5 mg/kg por dosis.','IV','Cada 8 horas','500 mg por dosis','RCH_ABX',
  'Usar como parte del esquema seleccionado, NO sin evaluación de foco y cobertura de gramnegativos.','Estado neurológico, hígado y evolución infecciosa.')
 ]),
 paracetamol:dossier('paracetamol','Analgesia pediátrica, incluso en dolor abdominal mientras continúa diagnóstico.','RCH_PAIN',
 ['Alivio de dolor, cantidad total acumulada en 24 h y formulaciones combinadas.'],
 ['Riesgo de hepatotoxicidad por duplicación.','No convertir miligramos en mL sin concentración verificada.'],
 'Revisar función renal cuando existen otros factores.','Hepatopatía exige límite individual y supervisión.',[
  dose('abdominal-analgesia','apendicitis-pediatrica',['urgent'],'Niños de >1 mes con indicación de analgesia y vía oral segura.',
  '15 mg/kg por dosis.','VO','Cada 6 horas según necesidad y plan','1 g por dosis; 60 mg/kg/día (máximo 4 g/día) en mayores de 1 mes según RCH','RCH_PAIN',
  'En menores de 1 mes, fallo hepático o desnutrición aplicar pauta específica, NO esta.','Dolor y dosis acumulada total de paracetamol.')
 ]),
 'sodio-hipertonico':dossier('sodio-hipertonico','Cloruro de sodio hipertónico para hiponatremia aguda sintomática grave; no para hipernatremia.','RCH_HYPO',
 ['Sodio seriado, síntomas neurológicos, diuresis y osmolaridad.','Confirmar concentración antes de cualquier administración.'],
 ['No aplicar a hipernatremia.','Corrección inadecuada de sodio tiene riesgo neurológico grave.'],
 'Función renal y diuresis determinan manejo; no hay volumen general aquí.','Valorar causa metabólica y hepática.'),
 furosemida:dossier('furosemida','Diurético solo si sobrecarga real de volumen en LRA y paciente seleccionado.','RCH_AKI',
 ['Diuresis, balance, peso, creatinina, sodio, potasio y presión arterial.'],
 ['La furosemida NO revierte la lesión renal aguda.','No usar en hipovolemia no corregida ni retrasar diálisis si está indicada.'],
 'Respuesta alterada en falla renal: evaluación y titulación especializada.','Monitorizar comorbilidades y otros fármacos.'),
 'piperacilina-tazobactam':dossier('piperacilina-tazobactam','Antibiótico antipseudomónico empírico en neutropenia febril seleccionada.','RCH_NEUTRO',
 ['Alergias a betalactámicos, función renal, cultivos y perfusión.'],
 ['La cifra de dosis refiere al componente PIPERACILINA, no al peso combinado del frasco.','No sumar automáticamente cefepime y meropenem.'],
 'Ajuste renal obligatorio por función y situación clínica.','Monitorización de tolerancia y pruebas hepáticas cuando procede.',[
  dose('neutropenia-empiric','neutropenia-febril',['critical','urgent'],'Neutropenia febril pediátrica que necesita antibiótico IV según protocolo oncohematológico.',
  '100 mg/kg por dosis, calculados como componente PIPERACILINA.','IV','Cada 6 horas en la tabla RCH para paciente clínicamente estable','Máximo 4 g del componente piperacilina por dosis','RCH_NEUTRO',
  'En sepsis o alto riesgo puede requerir cobertura adicional y tiempo de administración diferente por hospital.','Perfusión, antibiograma, función renal y reacciones.')
 ]),
 cefepima:dossier('cefepima','Antibiótico antipseudomónico alternativo según alergia no anafiláctica y protocolo local.','RCH_NEUTRO',
 ['Neurotoxicidad, función renal, signos de sepsis y cultivo.'],
 ['No usar de forma automática en anafilaxia documentada a betalactámicos sin análisis experto.','No administrar como segundo antipseudomónico rutinario junto con piperacilina/tazobactam.'],
 'Requiere ajuste renal individual; riesgo de neurotoxicidad en insuficiencia renal.','Revisar función hepática/otros riesgos.',[
  dose('neutropenia-alternative','neutropenia-febril',['critical','urgent'],'Neutropenia febril, alternativa empírica según protocolos de centro/hipersensibilidad no inmediata.',
  '50 mg/kg por dosis.','IV','Cada 8 horas','2 g por dosis','RCH_NEUTRO',
  'Confirmar alergia y epidemiología; no es una segunda dosis del mismo esquema con piperacilina.','Estado neurológico, cultivos y función renal.')
 ]),
 meropenem:dossier('meropenem','Carbapenémico reservado para infección grave seleccionada con resistencia o factores específicos.','RCH_ABX',
 ['Cultivos, función renal, convulsiones e interacciones.'],
 ['No elegir como fármaco estándar de todo paciente neutropénico.','Evitar duplicación con otros betalactámicos sin motivo.'],
 'Requiere ajuste en deterioro renal.','Valorar función hepática y comorbilidad.')
});
function find(id,algorithm,outcome){
 const record=M[id];if(!record)return null;
 const matches=record.regimens.filter(r=>r.algorithm===algorithm&&r.branches.includes(outcome));
 return Object.freeze({
  id,algorithm,outcome,name:bridge?.drugs?.[id]?.[0]||id,record,
  regimens:Object.freeze(matches),
  status:matches.length?'referencia-documentada-contextual':'pauta-no-cotejada-para-esta-rama',
  populationVerifiedForRegimen:matches.length>0,
  needsIndividualValidation:true
 });
}
function validate(){
 const errors=[];
 const linked=new Set();
 for(const a of Object.values(bridge?.byId||{})){
  for(const [outcome,branch] of Object.entries(a.branches)){
   for(const d of branch.medicines){linked.add(d.id);const x=find(d.id,Object.entries(bridge.byId).find(([k,v])=>v===a)?.[0],outcome);
    if(!x)errors.push('Sin ficha: '+d.id);
   }
  }
 }
 for(const id of linked)if(!M[id])errors.push('Falta dosier activo '+id);
 for(const [id,record] of Object.entries(M)){
  if(bridge&&!bridge.drugs[id])errors.push('ID inexistente Pharma Pro '+id);
  if(!record.source||!SOURCE[record.source])errors.push(id+': fuente principal ausente');
  if(!record.watch.length||!record.avoid.length||!record.renal||!record.hepatic)errors.push(id+': seguridad incompleta');
  for(const r of record.regimens){
   if(!SOURCE[r.source])errors.push(id+': referencia no encontrada '+r.id);
   if(!r.doseText||!r.route||!r.interval||!r.maximum||!r.guard||!r.monitor)errors.push(id+': información parcial '+r.id);
   for(const out of r.branches){if(!bridge)continue;const p=bridge.get(r.algorithm,out);if(!p||!p.drugs.some(d=>d.id===id))errors.push(id+': ruta o indicación no vinculada '+r.algorithm+'/'+out);}
  }
 }
 return errors;
}
const coverage=Object.freeze({
 linked: [...new Set(Object.keys(M))].length,
 withNumericReference:Object.values(M).filter(m=>m.regimens.length>0).length,
 pendingNumericReference:Object.values(M).filter(m=>!m.regimens.length).length,
 contextualRegimens:Object.values(M).reduce((n,m)=>n+m.regimens.length,0)
});
root.KidBumPediatricDrugReferences=Object.freeze({version:'0.10.55',records:M,sources:SOURCE,find,validate,coverage});
})(typeof window!=='undefined'?window:globalThis);
