/* KidBum Urgencias/UCI ↔ Pharma Pro v0.10.56.
 * Per-outcome clinical context, live catalog identifiers, no auto prescribing.
 * Medication names/high-alert flags match catalog at review time; regression tested.
 */
(function(root){
'use strict';
const lib=root.KidBumCriticalAlgorithms;
if(!lib)throw Error('Urgencias: engine needs to load before pharmacology bridge');
const DRUGS=Object.freeze({"adrenalina":{"name":"Adrenalina (epinefrina)","highRisk":true,"populations":["Adultos","Pediatría","Neonatología"]},"noradrenalina":{"name":"Noradrenalina","highRisk":true,"populations":["Adultos","Pediatría","Neonatología"]},"atropina":{"name":"Atropina","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"adenosina":{"name":"Adenosina","highRisk":false,"populations":["Adultos","Pediatría"]},"amiodarona":{"name":"Amiodarona","highRisk":true,"populations":["Adultos"]},"lidocaina-iv":{"name":"Lidocaína IV (antiarrítmico)","highRisk":true,"populations":["Adultos"]},"dobutamina":{"name":"Dobutamina","highRisk":true,"populations":["Adultos"]},"vasopresina":{"name":"Vasopresina","highRisk":true,"populations":["Adultos"]},"ceftriaxona":{"name":"Ceftriaxona","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"piperacilina-tazobactam":{"name":"Piperacilina / tazobactam","highRisk":false,"populations":["Adultos","Pediatría"]},"cefepima":{"name":"Cefepima","highRisk":false,"populations":["Adultos","Pediatría"]},"vancomicina":{"name":"Vancomicina","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"meropenem":{"name":"Meropenem","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"cefazolina":{"name":"Cefazolina","highRisk":false,"populations":["Adultos","Pediatría"]},"metronidazol":{"name":"Metronidazol","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"heparina":{"name":"Heparina no fraccionada","highRisk":true,"populations":["Adultos","Pediatría","Neonatología"]},"enoxaparina":{"name":"Enoxaparina","highRisk":true,"populations":["Adultos"]},"apixaban":{"name":"Apixabán","highRisk":true,"populations":["Adultos"]},"rivaroxaban":{"name":"Rivaroxabán","highRisk":true,"populations":["Adultos"]},"alteplasa":{"name":"Alteplasa","highRisk":true,"populations":["Adultos"]},"tenecteplasa":{"name":"Tenecteplasa","highRisk":true,"populations":["Adultos"]},"acido-acetilsalicilico":{"name":"Ácido acetilsalicílico","highRisk":false,"populations":["Adultos"]},"clopidogrel":{"name":"Clopidogrel","highRisk":false,"populations":["Adultos"]},"nitroglicerina":{"name":"Nitroglicerina","highRisk":false,"populations":["Adultos"]},"metoprolol":{"name":"Metoprolol","highRisk":false,"populations":["Adultos"]},"labetalol":{"name":"Labetalol","highRisk":false,"populations":["Adultos"]},"nicardipina":{"name":"Nicardipina","highRisk":false,"populations":["Adultos"]},"nitroprusiato":{"name":"Nitroprusiato sódico","highRisk":true,"populations":["Adultos"]},"furosemida":{"name":"Furosemida","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"hidrocortisona":{"name":"Hidrocortisona","highRisk":false,"populations":["Adultos"]},"dexametasona":{"name":"Dexametasona","highRisk":false,"populations":["Adultos"]},"metilprednisolona":{"name":"Metilprednisolona","highRisk":false,"populations":["Adultos"]},"salbutamol":{"name":"Salbutamol","highRisk":false,"populations":["Adultos"]},"ipratropio":{"name":"Ipratropio","highRisk":false,"populations":["Adultos"]},"sulfato-magnesio":{"name":"Sulfato de magnesio","highRisk":true,"populations":["Adultos","Pediatría","Neonatología"]},"propofol":{"name":"Propofol","highRisk":true,"populations":["Adultos"]},"ketamina":{"name":"Ketamina","highRisk":true,"populations":["Adultos"]},"midazolam":{"name":"Midazolam","highRisk":true,"populations":["Adultos"]},"lorazepam":{"name":"Lorazepam","highRisk":true,"populations":["Adultos"]},"diazepam":{"name":"Diazepam","highRisk":true,"populations":["Adultos"]},"levetiracetam":{"name":"Levetiracetam","highRisk":false,"populations":["Adultos"]},"fenitoina":{"name":"Fenitoína","highRisk":false,"populations":["Adultos"]},"rocuronio":{"name":"Rocuronio","highRisk":true,"populations":["Adultos"]},"succinilcolina":{"name":"Succinilcolina","highRisk":true,"populations":["Adultos"]},"fentanilo":{"name":"Fentanilo","highRisk":true,"populations":["Adultos","Pediatría","Neonatología"]},"dexmedetomidina":{"name":"Dexmedetomidina","highRisk":true,"populations":["Adultos"]},"morfina":{"name":"Morfina","highRisk":true,"populations":["Adultos","Pediatría","Neonatología"]},"insulina-regular":{"name":"Insulina humana regular","highRisk":true,"populations":["Adultos","Pediatría"]},"gluconato-calcio":{"name":"Gluconato de calcio","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"cloruro-calcio":{"name":"Cloruro de calcio inyectable","highRisk":false,"populations":["Adultos"]},"bicarbonato-sodio":{"name":"Bicarbonato de sodio","highRisk":false,"populations":["Adultos","Pediatría","Neonatología"]},"dextrosa-hipertonica":{"name":"Dextrosa hipertónica ≥20%","highRisk":true,"populations":["Adultos"]},"glucagon":{"name":"Glucagón","highRisk":false,"populations":["Adultos"]},"pantoprazol":{"name":"Pantoprazol","highRisk":false,"populations":["Adultos"]},"omeprazol":{"name":"Omeprazol","highRisk":false,"populations":["Adultos","Pediatría"]},"acido-tranexamico":{"name":"Ácido tranexámico","highRisk":true,"populations":["Adultos"]},"naloxona":{"name":"Naloxona","highRisk":false,"populations":["Adultos"]},"octreotida":{"name":"Octreotida","highRisk":false,"populations":["Adultos"]},"sodio-hipertonico":{"name":"Cloruro de sodio hipertónico inyectable (>0.9%)","highRisk":true,"populations":["Adultos"]},"ciclosilicato-zirconio-sodio":{"name":"Ciclosilicato de zirconio y sodio","highRisk":false,"populations":["Adultos"]},"haloperidol":{"name":"Haloperidol","highRisk":false,"populations":["Adultos"]},"azitromicina":{"name":"Azitromicina","highRisk":false,"populations":["Adultos","Pediatría"]}});
const D=Object.freeze({
 'paro-adulto':{
  vf:[['adrenalina','Adrenalina IV/IO según secuencia ACLS de paro; NO usar la presentación IM de anafilaxia.','Tratamiento según ACLS'],['amiodarona','Antiarrítmico exclusivamente cuando FV/TV sin pulso sea refractaria a descargas, según ACLS.','Condicionado'],['lidocaina-iv','Alternativa a amiodarona en FV/TV refractaria; no combinarlas automáticamente.','Alternativa']],
  pea:[['adrenalina','Adrenalina IV/IO en asistolia/AESP durante RCP; NO desfibrilar este ritmo.','Tratamiento según ACLS']]
 },
 'bradicardia-adulto':{
  critical:[['atropina','Para bradicardia con compromiso cuando la conducción/causa lo permiten; no retrasar estimulación si ineficaz.','Considerar'],['adrenalina','Infusión vasoactiva de rescate si la bradicardia no responde, según monitorización y ACLS; NO es vía IM de anafilaxia.','Rescate condicionado']],
  urgent:[['atropina','Solo si bradicardia sintomática con indicación y contraindicaciones revisadas; el ECG guía conducta.','Condicionado']]
 },
 'taquiarritmia-adulto':{
  urgent:[['adenosina','Solo taquicardia REGULAR de QRS estrecho compatible con TSV, monitorizada; evitar ritmos irregulares/preexcitacion.','Condicionado'],['amiodarona','Solo si taquiarritmia apropiada y evaluada por experto; NO alternativa universal para FA o TSV.','Evaluación especializada']]
 },
 'post-paro':{
  critical:[['noradrenalina','Vasopresor para hipotensión persistente cuando esté indicado por perfusión; titulación en UCI.','Condicionado']]
 },
 'choque-indiferenciado':{
  critical:[['noradrenalina','Solo si fenotipo de shock vasodilatador o hipotensión persistente y tratamiento hemodinámico apropiado; no sirve para todo shock.','Condicionado']]
 },
 'sepsis-choque':{
  critical:[['noradrenalina','Vasopresor de primera línea para shock séptico que lo requiere; titular según perfusión y guía SSC 2026.','Primera línea hemodinámica'],['piperacilina-tazobactam','Posible cobertura empírica en foco y riesgo susceptibles; seleccionar con antibiograma local, alergias y foco.','Opción empírica'],['cefepima','Alternativa de cobertura gramnegativa según riesgo; no sumar a piperacilina-tazobactam sin motivo.','Alternativa'],['vancomicina','Agregar SOLO con indicación fundada de grampositivos resistentes como MRSA.','Condicionado'],['hidrocortisona','Considerar corticoide IV en shock séptico con necesidad persistente de vasopresores según guía; no de rutina en toda sepsis.','Rescate condicionado']],
  urgent:[['ceftriaxona','Ejemplo posible de antibiótico empírico según foco/edad/epidemiología; no sirve para toda sepsis.','Elección condicionada'],['piperacilina-tazobactam','Alternativa basada en foco, gramnegativos y resistencias; no es esquema universal.','Alternativa']]
 },
 'anafilaxia-adulto':{
  critical:[['adrenalina','Adrenalina INTRAMUSCULAR inmediata en muslo. No confundir con adrenalina IV/IO de paro; confirmar presentación.','Primera línea']]
 },
 'choque-cardiogenico':{
  critical:[['noradrenalina','Solo ante hipotensión/hipoperfusión y necesidad de vasopresor; titular en centro monitorizado.','Condicionado'],['dobutamina','Inotrópico condicionado por función ventricular y presión/perfusión; no siempre apropiado.','Condicionado']],
  urgent:[['furosemida','Solo si sobrecarga/congestión y perfusión adecuada; no usar ciegamente en choque hipovolémico.','Condicionado']]
 },
 'sindrome-coronario':{
  critical:[['acido-acetilsalicilico','Antiagregación inicial cuando SCA confirmado/probable y no existe contraindicación; revisar disección aórtica y sangrado.','Tratamiento condicionado'],['heparina','Anticoagulación del SCA según estrategia de reperfusión y perfil de sangrado; no en disección.','Condicionado'],['clopidogrel','Antiagregante P2Y12 elegido según estrategia, diagnóstico y comorbilidades; no siempre primera opción.','Condicionado']],
  urgent:[['acido-acetilsalicilico','Antiplaquetario del SCA cuando está indicado y se descarta sangrado/disección.','Condicionado'],['clopidogrel','P2Y12 según estrategia invasiva y riesgo de sangrado; combinar solo por protocolo.','Condicionado']]
 },
 'edema-agudo-pulmon':{
  critical:[['nitroglicerina','Vasodilatador para edema pulmonar hipertensivo seleccionado, NUNCA si hipotensión/VD dependiente de precarga.','Condicionado'],['furosemida','Para congestión y sobrecarga cuando esté indicado; vigilar perfusión y función renal.','Condicionado']],
  urgent:[['furosemida','Diurético cuando se documenta congestión con estado hemodinámico apropiado.','Condicionado'],['nitroglicerina','Solo si presión/perfusión permiten vasodilatación y hay indicación clínica.','Condicionado']]
 },
 'tromboembolia-pulmonar':{
  critical:[['heparina','Anticoagulación si TEP y riesgo/contraindicaciones permiten; elegir agente por estabilidad, procedimientos y riesgo hemorrágico.','Condicionado'],['alteplasa','Reperfusión sistémica SOLO en TEP de alto riesgo seleccionado y con contraindicaciones evaluadas por equipo experto.','Alto riesgo; rescate']],
  urgent:[['heparina','Una alternativa de anticoagulación según riesgo, función renal y procedimiento planificado.','Condicionado'],['apixaban','Opción oral en pacientes apropiados con TEP confirmado y estabilidad; revisar criterios y contraindicaciones.','Alternativa']]
 },
 'diseccion-aortica':{
  critical:[['labetalol','Control de impulso hemodinámico cuando indicado y tolerado; no sustituye tratamiento quirúrgico.','Condicionado'],['metoprolol','Beta bloqueo seleccionado bajo monitor, según contraindicación y función hemodinámica.','Alternativa']],
  urgent:[['labetalol','Control hemodinámico temporal mientras se confirma/suspende causa aórtica; no dar fibrinolíticos.','Condicionado']]
 },
 'emergencia-hipertensiva':{
  critical:[['nicardipina','Antihipertensivo IV titulable para ciertos síndromes, con metas específicas de órgano; no universal.','Condicionado'],['labetalol','Alternativa IV en algunos síndromes si no hay bradicardia/broncoespasmo/contraindicaciones.','Alternativa']],
  urgent:[]},
 'fibrilacion-auricular':{
  critical:[],
  urgent:[['metoprolol','Control de frecuencia solo en paciente apropiado; evitar en shock, bloqueo y situaciones especiales como FA preexcitada.','Condicionado'],['diltiazem','Control de frecuencia seleccionado si no hay contraindicación, especialmente disfunción ventricular significativa.','Alternativa']]
 },
 'taponamiento-cardiaco':{critical:[],urgent:[]},
 'ictus-isquemico':{
  critical:[['tenecteplasa','Fibrinólisis IV exclusivamente en EVC isquémico discapacitante ELEGIBLE tras imagen y contraindicaciones, por equipo código EVC.','Alta vigilancia'],['alteplasa','Alternativa de fibrinólisis IV según algoritmo AHA/ASA 2026 y elegibilidad; NO combinar con tenecteplasa.','Alternativa']],
  urgent:[['acido-acetilsalicilico','Antiagregación solo cuando se descarta hemorragia y según decisiones de trombólisis/tiempo; no administrar inmediatamente después de trombólisis sin protocolo.','Condicionado']]
 },
 'hemorragia-intracerebral':{
  critical:[['nicardipina','Control de PA en determinadas HIC con metas específicas; evitar caída excesiva de perfusión.','Condicionado']],
  urgent:[['labetalol','Opción para control de PA si apropiado, tras perfil cerebral y hemodinámico.','Condicionado']]
 },
 'estatus-epileptico-adulto':{
  critical:[['midazolam','Benzodiacepina de rescate de primera línea en crisis prolongada según vía/protocolo.','Primera línea'],['lorazepam','Benzodiacepina IV alternativa con equipo que vigila respiración; NO sumar de rutina a midazolam.','Alternativa'],['levetiracetam','Segunda línea si crisis persiste tras benzodiacepina, según equipo y protocolos.','Escalamiento condicionado']],
  urgent:[['levetiracetam','Solo ante indicación de segunda línea/mantenimiento tras evaluación de etiología y riesgo; no por toda crisis resuelta.','Condicionado']]
 },
 'coma-alteracion-conciencia':{
  critical:[['dextrosa-hipertonica','Corregir hipoglucemia confirmada o muy probable con vía IV apropiada; ficha de catálogo NO valida concentración específica.','Solo si hipoglucemia'],['naloxona','Si depresión respiratoria por opioides es probable; no sustituye ventilación.','Solo si opioides']],
  urgent:[['naloxona','Considerar únicamente ante depresión respiratoria compatible con opioides; no antídoto universal de coma.','Condicionado']]
 },
 'hipertension-intracraneal':{
  critical:[['sodio-hipertonico','Agente hiperosmolar solo en edema cerebral/herniación seleccionada y con sodio/osmolaridad monitorizados.','Rescate especializado']],
  urgent:[]},
 'insuficiencia-respiratoria-adulto':{critical:[],urgent:[]},
 'crisis-asma-adulto':{
  critical:[['salbutamol','Broncodilatador inhalado de rescate de primera línea; verificar dispositivo/concentración.','Primera línea'],['ipratropio','Coadyuvante en crisis grave, no reemplaza SABA.','Condicionado'],['sulfato-magnesio','Vía IV solo en crisis grave refractaria seleccionada con vigilancia hemodinámica.','Rescate especializado'],['metilprednisolona','Corticoide sistémico cuando sea apropiado, no reemplaza broncodilatador ni tratamiento de anafilaxia.','Condicionado']],
  urgent:[['salbutamol','Broncodilatador inhalado de acción corta según gravedad y protocolo.','Rescate'],['metilprednisolona','Glucocorticoide sistémico si exacerbación lo justifica; revisar contraindicaciones.','Condicionado']]
 },
 'exacerbacion-epoc':{
  critical:[['salbutamol','Broncodilatador de corta acción, vía/dispositivo según ventilación y protocolo.','Tratamiento condicionado'],['ipratropio','Anticolinérgico de rescate combinado cuando apropiado.','Condicionado'],['metilprednisolona','Corticoide sistémico en exacerbación seleccionada; dosis y duración verificables externamente.','Condicionado']],
  urgent:[['salbutamol','Broncodilatador en exacerbación con componente obstructivo.','Condicionado'],['ipratropio','Adyuvante inhalado según gravedad; no usar antibióticos por toda disnea EPOC.','Condicionado']]
 },
 'intubacion-secuencia-rapida':{
  critical:[['ketamina','Inductor seleccionado por fisiología y plan de vía aérea; precauciones según paciente y contraindicación.','Inductor posible'],['rocuronio','Bloqueador neuromuscular para ISR cuando está indicado: NO sedante ni analgésico.','Paralizante, alto riesgo'],['succinilcolina','Alternativa de bloqueo neuromuscular con contraindicaciones importantes (hiperpotasemia, denervación, quemaduras tardías, etc.).','Alternativa']],
  urgent:[['propofol','Hipnótico seleccionado SOLO si fisiología tolera hipotensión y hay vía aérea planificada.','Inductor condicionado'],['ketamina','Alternativa para inducción; asegurar analgesia/sedación posterior.','Alternativa']]
 },
 'ventilacion-mecanica':{
  critical:[['fentanilo','Analgosedación cuando está indicada, titulada en UCI; tratar primero problemas de tubo/circuito.','Condicionado']],
  urgent:[['fentanilo','Analgesia de paciente intubado según objetivo de dolor/sedación.','Condicionado'],['dexmedetomidina','Sedación seleccionada, no reemplaza evaluación de dolor y estabilidad.','Alternativa']]
 },
 'sindrome-distres-respiratorio':{
  critical:[['rocuronio','Bloqueo neuromuscular solo para SDRA grave temprano seleccionado bajo sedación/analgesia, nunca sin sedación adecuada.','Rescate especializado'],['metilprednisolona','Corticoide según protocolo de ARDS en paciente específico, no universal.','Condicionado']],
  urgent:[]},
 'cetoacidosis-diabetica-adulto':{
  critical:[['insulina-regular','Infusión IV solo cuando potasio y reanimación lo permiten; no dar bolo rutinario.','Tratamiento condicionado']],
  urgent:[['insulina-regular','Insulina IV protocolizada con glucosa/cetonas/potasio seriados y plan de transición.','Tratamiento condicionado']]
 },
 'estado-hiperosmolar':{
  critical:[['insulina-regular','Infusión según protocolo de EHH, diferente a CAD, tras balance hídrico y potasio.','Condicionado']],
  urgent:[['insulina-regular','Solo cuando osmolaridad, hidratación y potasio permiten; no copiar dosis de CAD.','Condicionado']]
 },
 'hipoglucemia-adulto':{
  critical:[['dextrosa-hipertonica','Dextrosa IV de concentración y vía apropiadas en conciencia alterada, con glucemia seriada.','Rescate'],['glucagon','Alternativa cuando no hay vía venosa y situación permite respuesta; podría fallar si depleción de glucógeno.','Alternativa']],
  urgent:[]},
 'hiperpotasemia-adulto':{
  critical:[['gluconato-calcio','Protección miocárdica cuando K y ECG/estado indican calcio; no baja la concentración de potasio.','Protección cardiaca'],['insulina-regular','Desplazamiento intracelular de K con glucosa y monitorización estrecha de hipoglucemia.','Condicionado'],['salbutamol','Adyuvante para desplazamiento de K según protocolo, no sustituto único del calcio/insulina en grave.','Coadyuvante'],['ciclosilicato-zirconio-sodio','Aumenta eliminación intestinal cuando protocolo indica; no sustituye terapia inmediata de arritmia o diálisis.','Complementario']],
  urgent:[['insulina-regular','Solo hiperpotasemia que exige desplazamiento con monitorización, y glucosa apropiada.','Condicionado'],['ciclosilicato-zirconio-sodio','Eliminación intestinal condicionada por gravedad y disponibilidad; no rescate único en arritmia.','Condicionado']]
 },
 'hiponatremia-adulto':{
  critical:[['sodio-hipertonico','SOLO si hiponatremia con síntomas neurológicos graves y monitorización intensiva; concentración/volumen deben verificarse.','Rescate especializado']],
  urgent:[]},
 'hipernatremia-adulto':{critical:[],urgent:[]},
 'lesion-renal-aguda-adulto':{
  critical:[['gluconato-calcio','Solo si hiperpotasemia complicada con indicación de protección cardiaca; LRA aislada no lo indica.','Condicionado'],['furosemida','Solo sobrecarga de volumen seleccionada; no revierte LRA ni reemplaza diálisis.','Condicionado']],
  urgent:[]},
 'hemorragia-digestiva-alta':{
  critical:[['pantoprazol','PPI IV cuando sangrado ulceroso es probable o tras endoscopia según hallazgo; no sustituye hemostasia.','Condicionado'],['octreotida','Considerar si hemorragia variceal probable como parte de manejo especializado, no toda HDA.','Solo probable variceal']],
  urgent:[['pantoprazol','PPI si etiología ulcerosa/lesión de alto riesgo y estrategia endoscópica lo requieren.','Condicionado'],['octreotida','Solo si hay sospecha de sangrado portal/varices, junto a manejo correspondiente.','Condicionado']]
 },
 'choque-hemorragico-adulto':{
  critical:[['acido-tranexamico','Antifibrinolítico solamente si tipo de trauma/hemorragia y tiempo desde lesión cumplen criterios; no generalizar a cualquier sangrado.','Condicionado']],
  urgent:[]},
 'intoxicacion-opioides':{
  critical:[['naloxona','Antagonista de opioides si depresión respiratoria compatible; la ventilación sigue siendo primera intervención.','Antídoto condicionado']],
  urgent:[['naloxona','Solo si hay depresión respiratoria o sedación significativa por opioides; monitorizar recurrencia.','Condicionado']]
 },
 'sedacion-analgesia-uci':{
  critical:[],
  urgent:[['fentanilo','Analgesia titulada cuando hay dolor, evitando sobre-sedación y deterioro respiratorio.','Condicionado'],['dexmedetomidina','Sedación ligera seleccionada bajo meta RASS, efectos hemodinámicos y control de delirium.','Condicionado'],['propofol','Hipnótico IV si indicado, con vigilancia hemodinámica y duración; no analgesia por sí solo.','Alternativa']]
 },
 'delirium-uci':{
  critical:[],
  urgent:[['haloperidol','NO uso rutinario para delirium. Solo considerar agitación peligrosa seleccionada tras corregir causas, revisar QT e interacciones.','Rescate excepcional']]
 },
 'neutropenia-febril-adulto':{
  critical:[['piperacilina-tazobactam','Opción antipseudomónica empírica según epidemiología y alergias, no combinación automática con cefepima.','Elección condicionada'],['cefepima','Alternativa empírica antipseudomónica de igual objetivo según protocolo de centro.','Alternativa'],['meropenem','Reserva para resistencia o situaciones especiales; no usar indiscriminadamente.','Escalamiento especializado'],['vancomicina','Solo si indicación específica de grampositivo resistente o catéter/estabilidad.','Añadir si indicado']],
  urgent:[['piperacilina-tazobactam','Una opción empírica, guiada por antibiótico institucional y flora.','Condicionado'],['cefepima','Alternativa seleccionada, NO combinación rutinaria con piperacilina.','Alternativa']]
 }
});
function get(algorithmId,outcomeId){
 const a=lib.byId[algorithmId];
 if(!a||!a.outcomes[outcomeId])return null;
 const choices=D[algorithmId]?.[outcomeId]||[];
 const drugs=Object.freeze(choices.map(([id,context,role])=>{
  const d=DRUGS[id];
  if(!d)throw Error('No existe fármaco '+id+' para '+algorithmId);
  return Object.freeze({id,name:d.name,highRisk:Boolean(d.highRisk),populations:Object.freeze(d.populations.slice()),
   context,role,warning:'Verificar indicación, presentación autorizada en México, concentración, vía, dosis, alergias, interacciones, función renal/hepática y monitorización. La ficha del catálogo no valida esta pauta.',
   href:'./pharma-pro.html#'+encodeURIComponent(id)});
 }));
 return Object.freeze({algorithmId,outcomeId,title:a.title,scope:a.scope,purpose:a.outcomes[outcomeId].summary,
  context:a.outcomes[outcomeId].actions.join(' '),actions:Object.freeze(a.outcomes[outcomeId].actions.slice()),
  drugs,hasMedications:drugs.length>0,sources:Object.freeze(a.sources.slice()),
  needsClinicalValidation:true,status:'vínculo educativo, no prescripción ni dosis personalizadas'});
}
function validate(){
 const errs=[];
 for(const a of lib.algorithms){
  if(!a.outcomes||!a.sources.length)errs.push(a.id+': sin datos');
  for(const o of Object.keys(a.outcomes)){
   const p=get(a.id,o);
   if(!p||!p.context||!p.sources.length)errs.push(a.id+'/'+o+': sin conducta');
   for(const d of p?.drugs||[])if(!DRUGS[d.id]||!d.context)errs.push(a.id+': ficha incompleta '+d.id);
  }
  for(const k of Object.keys(D[a.id]||{}))if(!a.outcomes[k])errs.push(a.id+': rama inexistente '+k);
 }
 return errs;
}
root.KidBumCriticalTreatmentBridge=Object.freeze({version:'0.10.56',get,validate,drugs:DRUGS,coverage:Object.freeze({
 algorithms:lib.algorithms.length,outcomes:lib.algorithms.reduce((n,a)=>n+Object.keys(a.outcomes).length,0)
})});
})(typeof window!=='undefined'?window:globalThis);
