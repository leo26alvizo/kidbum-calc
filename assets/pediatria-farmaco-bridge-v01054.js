/* KidBum · Algoritmos Pediátricos ↔ Pharma Pro v0.10.54
 * Per-OUTCOME contextual treatment plan, explicit drug selection and verifiable
 * deep links to the EXISTING 643-medication Pharma Pro library.
 * This module never doses, prescribes, determines eligibility or approves discharge.
 * 643 catalog links are informational, not regulatory or pediatric monographs.
 */
(function(root){
'use strict';
const engine=root.KidBumPediatricAlgorithms;
if(!engine)throw Error('Cargar primero los algoritmos de Pediatría');
const P=['Adultos','Pediatría'],PN=['Adultos','Pediatría','Neonatología'],A=['Adultos'];
const DRUGS=Object.freeze({
 adrenalina:['Adrenalina (epinefrina)',PN,1],noradrenalina:['Noradrenalina',PN,1],
 salbutamol:['Salbutamol',A,0],ipratropio:['Ipratropio',A,0],
 dexametasona:['Dexametasona',A,0],prednisolona:['Prednisolona',A,0],prednisona:['Prednisona',P,0],metilprednisolona:['Metilprednisolona',A,0],
 'insulina-regular':['Insulina humana regular',P,1],
 glucagon:['Glucagón',A,0],amiodarona:['Amiodarona',A,1],adenosina:['Adenosina',P,0],atropina:['Atropina',PN,0],
 'sulfato-magnesio':['Sulfato de magnesio',PN,1],
 midazolam:['Midazolam',A,1],diazepam:['Diazepam',A,1],lorazepam:['Lorazepam',A,1],levetiracetam:['Levetiracetam',A,0],
 ceftriaxona:['Ceftriaxona',PN,0],cefotaxima:['Cefotaxima',PN,0],ampicilina:['Ampicilina',A,0],gentamicina:['Gentamicina',PN,0],vancomicina:['Vancomicina',PN,0],
 'piperacilina-tazobactam':['Piperacilina / tazobactam',P,0],cefepima:['Cefepima',P,0],meropenem:['Meropenem',PN,0],
 azitromicina:['Azitromicina',P,0],amoxicilina:['Amoxicilina',P,0],metronidazol:['Metronidazol',PN,0],
 ondansetron:['Ondansetrón',P,0],'sodio-hipertonico':['Cloruro de sodio hipertónico inyectable (>0.9%)',A,1],
 furosemida:['Furosemida',PN,0],'amoxicilina-clavulanato':['Amoxicilina / ácido clavulánico',P,0],
 cefalexina:['Cefalexina',A,0],paracetamol:['Paracetamol',P,0],ibuprofeno:['Ibuprofeno',P,0]
});
function drug(id,role,context,warning=''){
 if(!DRUGS[id])throw Error('Fármaco Pharma Pro no registrado: '+id);
 const [name,populations,highRisk]=DRUGS[id];
 return Object.freeze({id,name,populations:Object.freeze(populations.slice()),highRisk:Boolean(highRisk),role,context,warning,href:'./pharma-pro.html#'+encodeURIComponent(id)});
}
const urgent=(id,context,warning='')=>drug(id,'Fármaco clave en esta situación',context,warning);
const conditional=(id,context,warning='')=>drug(id,'Solo si se cumplen los criterios clínicos',context,warning);
const alternative=(id,context,warning='')=>drug(id,'Alternativa según protocolo y susceptibilidad',context,warning);
const route=(medicines=[],note='')=>Object.freeze({medicines:Object.freeze(medicines),note});
const T=Object.freeze({
 diarrea:{
  purpose:'Reposición de agua y electrólitos según grado de deshidratación; no indicar antibióticos ni antieméticos de rutina.',
  branches:{
   emergency:route([],'La prioridad es reanimación y balance hídrico; no se sugiere medicamento automático.'),
   rehydrate:route([],'Solución de rehidratación ORAL es la intervención inicial si está indicada y tolerada; no es una ficha farmacológica de Pharma Pro.'),
   'no-dehydration':route([],'Hidratación oral, alimentación y educación sobre signos de alarma.'),
   assess:route([],'La incertidumbre exige revaluar hidratación y tolerancia; no iniciar fármacos sin diagnóstico.')
  }
 },
 bronquiolitis:{
  purpose:'El tratamiento estándar es de sostén: oxigenación, líquidos y vigilancia según gravedad; NO broncodilatadores, corticoides o antibióticos de rutina.',
  branches:{
   support:route([],'No se vincula salbutamol, prednisolona o antibiótico por la sola bronquiolitis.'),
   emergency:route([],'El soporte de vía aérea/ventilación tiene prioridad sobre medicaciones no indicadas rutinariamente.'),
   refer:route([],'Oxígeno e hidratación según saturación, esfuerzo respiratorio e ingesta; criterio de ingreso individual.'),
   assess:route([],'Completar evaluación respiratoria antes de proponer tratamiento.')
  }
 },
 sepsis:{
  purpose:'Control de foco, antimicrobianos oportunos y restauración de perfusión, adaptados a foco, edad, recursos y epidemiología local.',
  branches:{
   emergency:route([
    conditional('ceftriaxona','Antimicrobiano empírico en cuadros seleccionados con probable infección bacteriana invasiva; valorar edad y foco.','Neonatos: revisar contraindicaciones por bilirrubina y calcio IV.'),
    alternative('cefotaxima','Alternativa en escenarios invasivos específicos, por edad y foco.'),
    conditional('noradrenalina','Vasopresor en choque persistente tras evaluación hemodinámica en entorno monitorizado.','Alto riesgo; doble verificación de concentración y vía.')
   ],'Priorizar antibiótico temprano y manejo del choque; no asumir que estos fármacos se administran juntos ni que son un esquema universal.'),
   'sepsis-evaluation':route([
    conditional('ceftriaxona','Solo cuando la evaluación confirma necesidad de antimicrobiano empírico apropiado a edad, foco y resistencias.')
   ],'Cultivos si no retrasan tratamiento; la elección final depende del síndrome clínico.')
  }
 },
 ictericia:{
  purpose:'La decisión se basa en bilirrubina total sérica, horas posnatales, semanas de gestación y factores de neurotoxicidad; la fototerapia NO es un medicamento.',
  branches:{
   emergency:route([],'Evaluación neonatal urgente y nomograma validado: no existen dosis farmacológicas automáticas para este resultado.'),
   compare:route([],'Prioridad: verificar umbral de fototerapia o escalamiento; no sustituir fototerapia por un fármaco.'),
   measure:route([],'Primero medir bilirrubina cuando corresponda; no indicar tratamiento por la apariencia.')
  }
 },
 anafilaxia:{
  purpose:'La adrenalina intramuscular es el tratamiento de primera línea cuando se sospecha anafilaxia; nunca esperar antihistamínicos.',
  branches:{
   immediate:route([
    urgent('adrenalina','VÍA INTRAMUSCULAR en muslo anterolateral para anafilaxia.','Confirmar peso, concentración, dispositivo, intervalo y vía; NO usar presentación o ruta IV por error.'),
    conditional('salbutamol','Solo coadyuvante para broncoespasmo persistente DESPUÉS de adrenalina; no reemplaza la adrenalina.','La ficha de Pharma Pro figura solo en Adultos; revisar pauta pediátrica externa.')
   ],'Adrenalina IM inmediata y ABCDE. Los adyuvantes nunca deben retrasarla.'),
   observe:route([],'Reacción cutánea leve sin anafilaxia: vigilar progresión, no administrar adrenalina automáticamente desde esta rama.'),
   assess:route([],'Ante posible anafilaxia y compromiso vital, tratar de inmediato; no esperar validación de esta pantalla.')
  }
 },
 convulsion:{
  purpose:'Crisis ≥5 minutos: medicación anticonvulsiva de rescate y escalamiento protocolizados con preparación para proteger la vía aérea.',
  branches:{
   status:route([
    urgent('midazolam','Benzodiacepina de rescate según vía disponible y protocolo; elección entre alternativas según acceso.','Ficha de Pharma Pro indexada solo Adultos: dosis pediátrica NO validada aquí.'),
    alternative('diazepam','Otra benzodiacepina posible según vía y protocolo, NO coadministrar rutinariamente con todas las opciones.','Alto riesgo de depresión respiratoria; vigilar número acumulado de dosis.'),
    conditional('levetiracetam','Posible segunda línea por equipo experto si persiste crisis tras primera línea.','Ficha de Pharma Pro indexada solo Adultos, no es pauta pediátrica.')
   ],'No elegir varios anticonvulsivantes automáticamente ni retrasar soporte ABCDE y glucemia.'),
   evaluate:route([],'Tras una crisis resuelta no se indica necesariamente anticonvulsivante de mantenimiento.'),
   assess:route([],'Evaluar si hay estado epiléptico no convulsivo o deterioro antes de elegir medicamento.')
  }
 },
 hipoglucemia:{
  purpose:'Corregir glucosa y tratar la causa; la vía depende de conciencia y protección de vía aérea.',
  branches:{
   emergency:route([
    conditional('glucagon','Alternativa de rescate en escenarios seleccionados cuando el acceso IV no está disponible.','Pharma Pro lo clasifica solo Adultos. La presentación y pauta pediátricas requieren fuente independiente.')
   ],'Glucosa IV/IO según protocolo pediátrico con vigilancia; la biblioteca solo tiene una ficha de dextrosa hipertónica ≥20% catalogada para ADULTOS y NO se vincula como dosis pediátrica.'),
   'oral-reassess':route([],'Si puede tragar, aportar carbohidrato oral apropiado y repetir glucemia; sin prescripción numérica desde esta pantalla.'),
   neonate:route([],'Usar hipoglucemia neonatal: su estrategia difiere del niño mayor.'),
   assess:route([],'Primero medir glucosa; los síntomas neurológicos graves se atienden sin esperar esta herramienta.')
  }
 },
 cetoacidosis:{
  purpose:'Hospitalización con rehidratación, insulina y corrección de electrólitos individualizadas; vigilancia neurológica y potasio.',
  branches:{
   critical:route([
    conditional('insulina-regular','Insulina intravenosa dentro del protocolo de CAD, cuando sea seguro iniciarla.','NO administrar bolo ni comenzar sin evaluar potasio, perfusión y plan de líquidos.')
   ],'La sospecha de lesión cerebral debe atenderse urgentemente.'),
   hospital:route([
    conditional('insulina-regular','Insulina en infusión protocolizada según glucosa, cetonas, sodio y potasio.','Alto riesgo: confirmar potasio y condiciones de inicio, nunca dosis calculada desde aquí.')
   ],'La indicación requiere valores y monitorización; no sugerir potasio IV por defecto.'),
   differential:route([],'Sin acidosis no se debe iniciar automáticamente protocolo completo de CAD.')
  }
 },
 'asma-crisis':{
  purpose:'Broncodilatador de rescate; considerar antiinflamatorio y coadyuvantes conforme a gravedad y respuesta.',
  branches:{
   critical:route([
    urgent('salbutamol','Broncodilatador inhalado de acción corta para obstrucción bronquial en crisis asmática.','Ficha catalogada solo Adultos; no contiene dosis pediátrica validada.'),
    conditional('ipratropio','Coadyuvante de la exacerbación grave junto con broncodilatador rápido, según protocolo.','Ficha catalogada solo Adultos.'),
    conditional('sulfato-magnesio','Consideración en crisis grave refractaria bajo equipo experto y vigilancia.','Alto riesgo: monitorización y pauta intravenosa individual.')
   ],'Verificar que no se trate de anafilaxia; no retrasar soporte ventilatorio si hay agotamiento.'),
   allergic:route([
    urgent('adrenalina','Sospecha de ANAFILAXIA: vía IM inmediata, aunque haya sibilancias.','No sustituir por salbutamol. Confirmar vía, concentración y peso.')
   ],'Esta rama exige tratamiento de anafilaxia, no solo de asma.'),
   treat:route([
    urgent('salbutamol','Broncodilatador de rescate; reevaluar respuesta clínica.','La ficha actual está etiquetada Adultos; revisar indicación/dosis pediátrica.'),
    conditional('ipratropio','Coadyuvante cuando la crisis es moderada/grave y corresponde según protocolo.'),
    conditional('prednisona','Glucocorticoide sistémico cuando esté indicado según gravedad, edad y plan clínico.')
   ],'Confirmar vía de administración, oxigenación y necesidad de hospitalización.'),
   mild:route([
    conditional('salbutamol','Rescate conforme a plan de acción individual y observación de respuesta.')
   ],'Revisar controlador antiinflamatorio apropiado por edad; el índice no determina terapia de mantenimiento.')
  }
 },
 crup:{
  purpose:'Corticoide sistémico cuando corresponde; adrenalina NEBULIZADA solo en estridor significativo o crup grave.',
  branches:{
   critical:route([
    urgent('adrenalina','VÍA NEBULIZADA para crup grave, no vía IM salvo que el diagnóstico sea anafilaxia.','Concentración, presentación y dosis para nebulización requieren protocolo específico.'),
    conditional('dexametasona','Corticoide sistémico apropiado al crup, adaptado a gravedad y tolerancia.','Ficha de Pharma Pro indexada solo Adultos; revisar esquema pediátrico.')
   ],'Cualquier procedimiento debe minimizar la agitación; solicitar equipo experto para vía aérea.'),
   moderate:route([
    conditional('dexametasona','Corticoide sistémico según gravedad y guía.','Ficha indexada solo Adultos.'),
    conditional('adrenalina','Nebulizada cuando hay estridor en reposo/dificultad importante, con observación posterior.','NO usar automáticamente vía IM como para anafilaxia.')
   ],'Vigilar durante y después de la adrenalina nebulizada.'),
   mild:route([
    conditional('dexametasona','Considerar corticoide cuando está indicado por estridor o factores de riesgo.')
   ],'Tos perruna aislada y cuadro leve no requieren adrenalina nebulizada rutinaria.'),
   alternate:route([],'No aplicar automáticamente tratamiento de crup a epiglotitis, cuerpo extraño o traqueítis bacteriana.')
  }
 },
 neumonia:{
  purpose:'Soporte respiratorio según gravedad; antibiótico solo cuando la etiología bacteriana o el riesgo lo justifiquen.',
  branches:{
   critical:route([
    conditional('ceftriaxona','Tratamiento parenteral en neumonía bacteriana grave seleccionada, condicionado a edad, microbiología y resistencias.','Revisar precauciones neonatales si hay edad pequeña.')
   ],'Soporte respiratorio y manejo de sepsis tienen prioridad.'),
   refer:route([
    conditional('ceftriaxona','Antimicrobiano hospitalario si sospecha bacteriana y la situación/edad lo indican.'),
    alternative('cefotaxima','Alternativa por edad, foco y protocolo institucional.')
   ],'No administrar ambas cefalosporinas como combinación rutinaria.'),
   'assess-mild':route([
    conditional('amoxicilina','Cuando la evaluación confirme neumonía bacteriana susceptible y el niño sea candidato a vía oral.','No indicada automáticamente en neumonía viral.'),
    conditional('azitromicina','Solo en cuadros con sospecha fundada de patógeno atípico y edad/epidemiología correspondientes.')
   ],'La decisión de antibiótico requiere diagnóstico y criterios de gravedad.')
  }
 },
 'lactante-febril':{
  purpose:'Lactante pequeño con fiebre: estudios y antimicrobianos según edad exacta, aspecto, cultivos, marcadores inflamatorios y protocolo.',
  branches:{
   critical:route([
    conditional('ampicilina','Componente de un esquema empírico hospitalario en lactantes muy pequeños seleccionados.','Pharma Pro lo etiqueta Adultos: dosis neonatal/pediátrica pendiente.'),
    conditional('gentamicina','Posible componente de esquema empírico neonatal bajo vigilancia y protocolo.','Necesita función renal, niveles cuando corresponda y dosificación por edad/gestación.')
   ],'No usar ceftriaxona universalmente en neonatos; en menores de 28 días considerar riesgos relacionados con bilirrubina y calcio IV.'),
   age8:route([
    conditional('ampicilina','Parte de esquemas empíricos en 8–21 días según protocolo local.','Ficha indexada solo Adultos, sin pauta neonatal validada.'),
    conditional('gentamicina','Componente de tratamiento parenteral según sospecha y protocolo neonatal.')
   ],'Hospitalización/estudio invasivo según guía AAP; no usar un esquema universal sin cobertura definida.'),
   age22:route([
    conditional('cefotaxima','Opción hospitalaria en casos que requieren antibiótico parenteral según estudio y protocolo, ajustada a edad.')
   ],'No todos requieren la misma terapia: evaluar resultados, LCR y riesgo.'),
   age29:route([
    conditional('ceftriaxona','En casos seleccionados de lactante mayor con indicación de antimicrobiano parenteral, con precauciones pertinentes.','Comprobar bilirrubina/calcio IV y criterios de exclusión antes de usar ceftriaxona.')
   ],'No implica que todos los lactantes de 29–60 días deban recibir este medicamento.'),
   outside:route([],'Fuera de alcance de la guía AAP 8–60 días; ruta infecciosa correspondiente.')
  }
 },
 'abcde-pediatrico':{
  purpose:'Corregir primero problemas vitales de vía aérea, ventilación, perfusión o conciencia: ningún medicamento sirve para todo ABCDE.',
  branches:{
   critical:route([],'Elegir fármacos solo tras establecer causa: paro, anafilaxia, choque, hipoglucemia o convulsión.'),
   urgent:route([],'El tratamiento cambia según componente alterado; no asociar adrenalina o antibiótico por ABCDE anormal aislado.')
  }
 },
 'paro-pediatrico':{
  purpose:'RCP, desfibrilación cuando proceda y fármacos del algoritmo PALS oficial; nunca retrasar compresiones por consultar fichas.',
  branches:{
   shock:route([
    conditional('adrenalina','Parte del algoritmo PALS de FV/TV sin pulso conforme a secuencia protocolizada.','VÍA IV/IO en paro; nunca copiar ruta IM de anafilaxia.'),
    conditional('amiodarona','Solo FV/TV SIN PULSO refractaria a descargas, tras evaluación experta.','Alto riesgo; ficha de Pharma Pro indexada solo Adultos.')
   ],'Prioridad absoluta: RCP/desfibrilación inmediata.'),
   nonshock:route([
    urgent('adrenalina','En asistolia/AESP, dentro de la secuencia PALS de RCP y acceso vascular.','Confirmar presentación/IV-IO y dosis pediátrica oficial con doble verificación.')
   ],'Asistolia/AESP NO se desfibrila.'),
   unknown:route([],'Continuar RCP mientras se conecta monitor. No inferir fármacos por ritmo no identificado.'),
   poor:route([],'Con pulso, aplicar evaluación de bradicardia y ventilación, NO protocolo universal de paro.')
  }
 },
 'bradicardia-pals':{
  purpose:'Primero oxigenación y ventilación; compresiones cuando FC y perfusión cumplen criterios PALS.',
  branches:{
   critical:route([
    conditional('adrenalina','Dentro del protocolo de bradicardia con compromiso/compresiones bajo equipo de reanimación.','Vía y dosis de reanimación no se infieren de la ficha de catálogo.'),
    conditional('atropina','Solo ante aumento de tono vagal o bloqueo AV primario, según PALS.','NO es tratamiento rutinario de bradicardia por hipoxia.')
   ],'La prioridad es corregir hipoxia y comenzar compresiones cuando corresponde.'),
   urgent:route([
    conditional('atropina','Considerar exclusivamente en bradicardia vagal o bloqueo AV sintomático, no hipoxia aislada.')
   ],'Ventilación y corrección de causa preceden a selección farmacológica.')
  }
 },
 'taquicardia-pals':{
  purpose:'La estabilidad y morfología de QRS determinan intervención; con compromiso grave puede requerir cardioversión sincronizada.',
  branches:{
   critical:route([],'En taquiarritmia inestable, no retrasar cardioversión indicada por buscar adenosina; consultar PALS.'),
   urgent:route([
    conditional('adenosina','Solo taquicardia supraventricular regular y de complejo estrecho, estable y apropiada según evaluación de ECG.','NO administrar automáticamente a ritmos irregulares o complejos anchos no caracterizados.')
   ],'Interpretar ECG con especialista. La mera frecuencia alta no indica adenosina.'),
   evaluate:route([],'Corregir fiebre, deshidratación, dolor u otra causa de taquicardia sinusal; no administrar antiarrítmicos de rutina.')
  }
 },
 'dificultad-respiratoria':{
  purpose:'Oxígeno y soporte ventilatorio según examen y etiología; NO usar broncodilatadores o adrenalina sin síndrome que los justifique.',
  branches:{
   critical:route([],'Identificar obstrucción alta, asma, anafilaxia, sepsis o neumonía antes de elegir tratamiento farmacológico.'),
   urgent:route([],'La terapia específica depende de estridor, sibilancias, hipoxemia y etiología.')
  }
 },
 'oxigenoterapia-escala':{
  purpose:'Oxígeno y escalamiento de soporte respiratorio por gravedad y enfermedad; no existe un medicamento universal para hipoxemia.',
  branches:{
   critical:route([],'Escalar ventilación conforme a equipo y protocolo, no por un medicamento de catálogo.'),
   urgent:route([],'Valorar alto flujo/CPAP según respuesta y recursos, con reevaluación; no inferir dosis ni metas SpO₂ fijas.')
  }
 },
 'itu-pediatrica':{
  purpose:'Confirmar infección con muestra correcta y elegir antibiótico según edad, sitio (cistitis/pielonefritis), antibiograma y resistencia local.',
  branches:{
   critical:route([
    conditional('ceftriaxona','Antimicrobiano parenteral en casos graves seleccionados y fuera de contraindicaciones neonatales.','No usar universalmente en menores de 28 días con bilirrubina/calcio IV.')
   ],'Priorizar manejo de sepsis y recolección de muestras cuando no retrase tratamiento.'),
   urgent:route([
    conditional('amoxicilina-clavulanato','Opción oral en ITU susceptible cuando evaluación, edad y resistencia local lo permiten.','La resistencia local puede descartar su uso empírico.'),
    alternative('ceftriaxona','Alternativa parenteral en pielonefritis/ITU complicada o cuando vía oral no es segura.')
   ],'Nunca tratar por uroanálisis positivo aislado sin valorar clínica y calidad de muestra.')
  }
 },
 'meningitis-pediatrica':{
  purpose:'Antibiótico IV temprano según edad, alergias y resistencias; punción lumbar cuando sea segura.',
  branches:{
   critical:route([
    urgent('ceftriaxona','Tratamiento empírico para meningitis bacteriana en niños elegibles según NICE NG240.','Neonatos y calcio IV requieren cautela especial; revisar guía neonatal.'),
    alternative('cefotaxima','Alternativa por edad y contraindicaciones a ceftriaxona.','No se administran ambas como terapia combinada estándar.')
   ],'No demorar antibióticos por punción lumbar o neuroimagen en paciente inestable.'),
   urgent:route([
    conditional('ceftriaxona','Tratamiento hospitalario de meningitis bacteriana probable en edad apropiada.'),
    alternative('cefotaxima','Alternativa si ceftriaxona no puede utilizarse y la guía lo permite.')
   ],'Antibiótico y tratamiento adyuvante se individualizan según edad y microorganismo.')
  }
 },
 'reanimacion-neonatal':{
  purpose:'Ventilación EFECTIVA es la intervención principal. Fármacos solo después de pasos avanzados NRP completos.',
  branches:{
   compressions:route([
    conditional('adrenalina','Solo si la FC continúa gravemente baja pese a ventilación efectiva y compresiones protocolizadas, bajo equipo NRP.','Dosis/concentración/ruta específicas del RN, no extrapolar de PALS o anafilaxia.')
   ],'La selección farmacológica depende de respuesta tras ventilación efectiva y compresiones, NO del primer minuto.'),
   ventcheck:route([],'Si la FC responde a ventilación, mantener soporte/monitorización; no indicar adrenalina por defecto.'),
   routine:route([],'Cuidados térmicos, contacto y vigilancia; sin medicación rutinaria desde esta rama.'),
   support:route([],'Soporte respiratorio según evaluación neonatal; la hipotensión/hipoxemia no implica automáticamente adrenalina.')
  }
 },
 'hipoglucemia-neonatal':{
  purpose:'La elección de dextrosa/alimentación depende de horas de vida, síntomas y valor verificado; nunca usar concentraciones adultas por defecto.',
  branches:{
   critical:route([],'Priorizar glucosa IV neonatal de concentración protocolizada y monitorización; la ficha de dextrosa ≥20% existente en Pharma Pro está marcada solo para adultos y NO se vincula.'),
   urgent:route([],'Alimentación/gel de dextrosa o tratamiento parenteral según valor, hora posnatal y protocolo; sin pauta calculada desde aquí.')
  }
 },
 'sepsis-neonatal':{
  purpose:'Antibioterapia neonatal empírica por síndrome de inicio temprano/tardío, edad gestacional, foco y epidemiología; ajustes según cultivos.',
  branches:{
   critical:route([
    conditional('ampicilina','Posible componente de tratamiento empírico neonatal según protocolo local.','La ficha actual está etiquetada solo Adultos, no contiene pauta neonatal.'),
    conditional('gentamicina','Posible combinación empírica neonatal según protocolo y factores de resistencia.','Requiere seguimiento renal y, en indicaciones, niveles; esquema depende de madurez/edad.')
   ],'No extrapolar antibióticos adultos ni usar ceftriaxona neonatal rutinaria.'),
   urgent:route([
    conditional('ampicilina','Esquema empírico de sepsis neonatal de inicio temprano cuando corresponde.'),
    conditional('gentamicina','Componente adicional de esquema elegido por neonatología según sospecha.')
   ],'Confirmar necesidad, población y controles microbiológicos.')
  }
 },
 'apendicitis-pediatrica':{
  purpose:'Analgesia, hidratación, evaluación quirúrgica e imagen; antibióticos solo según probabilidad de apendicitis complicada y plan hospitalario.',
  branches:{
   critical:route([
    conditional('ceftriaxona','Cobertura seleccionada para infección intraabdominal complicada según cirugía y resistencias.'),
    conditional('metronidazol','Cobertura anaerobia adicional en regímenes combinados seleccionados.','No asumir que el esquema es universal.')
   ],'Ayuno, reanimación y cirugía prioritaria ante peritonitis; antibióticos según equipo tratante.'),
   urgent:route([
    conditional('paracetamol','Analgesia si apropiada a edad/peso, vía y función hepática; no sustituye evaluación de abdomen agudo.')
   ],'El control del dolor NO dificulta necesariamente la evaluación y no debe negarse indiscriminadamente.')
  }
 },
 'obstruccion-invaginacion':{
  purpose:'Ayuno, reposición de volumen, analgesia y atención quirúrgica/radiológica oportuna; no retrasar por búsqueda de fármacos.',
  branches:{
   critical:route([],'La obstrucción/volvulus o peritonitis requieren cirugía y soporte, no un medicamento que resuelva el problema.'),
   urgent:route([],'Ecografía y posible reducción neumática/hidrostática bajo equipo especializado cuando esté indicada.')
  }
 },
 'trastornos-sodio':{
  purpose:'Distinguir síntomas neurológicos y tipo de disnatremia; la rapidez y solución específica se determinan bajo protocolo.',
  branches:{
   critical:route([
    conditional('sodio-hipertonico','Solo en HIPONATREMIA sintomática grave con compromiso neurológico y protocolo hospitalario.','Ficha de Pharma Pro indexada solo Adultos y alto riesgo; no contiene pauta pediátrica ni aplica a hipernatremia.')
   ],'No asumir que toda disnatremia neurológica exige solución hipertónica: primero verificar si es hiponatremia.'),
   hypo:route([],'Corregir según síntomas y duración; no enlazar solución hipertónica a hiponatremia asintomática sin indicación.'),
   hyper:route([],'Tratamiento de déficit de agua/volumen bajo vigilancia. No usar sodio hipertónico para hipernatremia.')
  }
 },
 'lesion-renal-aguda':{
  purpose:'Corregir hipoperfusión/obstrucción y detener nefrotóxicos; tratar complicaciones, no administrar diuréticos para “curar” LRA.',
  branches:{
   critical:route([
    conditional('furosemida','Solo si sobrecarga de volumen y criterio clínico específico; no trata la lesión renal en sí.','No retrasar diálisis ni tratar hipovolemia con diuréticos.')
   ],'La hiperpotasemia grave requiere tratamiento urgente propio; no seleccionar KCl IV.'),
   urgent:route([],'Vigilar creatinina, potasio, diuresis y balance; retirar nefrotóxicos y tratar causa.')
  }
 },
 'neutropenia-febril':{
  purpose:'Antibiótico empírico antipseudomónico temprano en oncohematología, ajustado a protocolo local y perfil de resistencia.',
  branches:{
   critical:route([
    conditional('piperacilina-tazobactam','Opción antipseudomónica empírica en protocolos de neutropenia febril.','No elegir si alergia relevante o resistencia local; comprobar función renal.'),
    alternative('cefepima','Alternativa antipseudomónica según protocolo de centro y susceptibilidad.'),
    alternative('meropenem','Reserva para casos específicos de resistencia o criterios de gravedad según infectología.')
   ],'No se administran estas tres alternativas simultáneamente de rutina.'),
   urgent:route([
    conditional('piperacilina-tazobactam','Opción empírica antipseudomónica habitual cuando la guía institucional lo respalda.'),
    alternative('cefepima','Alternativa en planes institucionales equivalentes; seleccionar UNA estrategia apropiada.')
   ],'No esperar recuento final de neutrófilos para iniciar tratamiento cuando hay sospecha fuerte.')
  }
 }
});
function get(algorithmId,outcomeId){
 const a=engine.byId[algorithmId],setting=T[algorithmId];
 if(!a||!setting||!a.outcomes[outcomeId])return null;
 const routeData=setting.branches[outcomeId]||route();
 return Object.freeze({
  algorithmId,outcomeId,title:a.title,purpose:setting.purpose,
  context:routeData.note||a.outcomes[outcomeId].summary,
  actions:Object.freeze(a.outcomes[outcomeId].actions.slice()),
  drugs:routeData.medicines,
  hasMedications:routeData.medicines.length>0,
  sources:Object.freeze(a.sources.slice()),
  population:a.scope,
  status:'apoyo educativo; selección y dosis pendientes de validación individual',
  needsClinicalValidation:true
 });
}
function validate(){
 const errors=[];
 for(const a of engine.algorithms){
  const t=T[a.id];
  if(!t){errors.push(a.id+': sin conexión de tratamiento');continue;}
  if(!t.purpose)errors.push(a.id+': sin propósito');
  for(const [outcome,entry] of Object.entries(t.branches)){
   if(!a.outcomes[outcome])errors.push(a.id+': rama inexistente '+outcome);
   for(const drugLink of entry.medicines){
    if(!DRUGS[drugLink.id])errors.push(a.id+': medicamento inexistente '+drugLink.id);
    if(!drugLink.context||!drugLink.role||!drugLink.href.endsWith('#'+drugLink.id))errors.push(a.id+': enlace incompleto '+drugLink.id);
   }
  }
  for(const outcome of Object.keys(a.outcomes))if(!get(a.id,outcome))errors.push(a.id+': salida sin acceso de tratamiento '+outcome);
 }
 return errors;
}
root.KidBumPediatricTherapyBridge=Object.freeze({version:'0.10.54',byId:T,drugs:DRUGS,get,validate,coverage:Object.freeze({algorithms:Object.keys(T).length,medications:Object.keys(DRUGS).length})});
})(typeof window!=='undefined'?window:globalThis);
