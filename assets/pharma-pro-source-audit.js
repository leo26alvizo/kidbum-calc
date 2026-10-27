(function(root){
'use strict';
/* KidBum Pharma Pro 0.10.33 / Primary-label source audit.
 * This module DOES NOT certify independent clinical/pharmacy validation.
 * Entries are locked unless indication, route and high-impact contraindications
 * are explicitly answered. Entire catalogue remains unvalidated for prescribing.
 */
const base=root.KidBumPharmaMonographs;
if(!base)return;
const SRC=(setid,title,version,effective)=>({
 setid,title,version,effective,
 url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid='+setid
});
const preparation={
 ceftriaxona:{
  method:'Preparación IV de ceftriaxona, SOLO polvo para inyección Hikma señalado en la fuente: para vial de 1 g, añadir 9.6 mL de diluyente IV compatible para obtener aproximadamente 100 mg/mL. Diluir ulteriormente hasta 10–40 mg/mL. La etiqueta describe infusión intravenosa en 30 minutos para NO neonatos.',
  restrictions:'NO reconstituir ni diluir con soluciones que contengan calcio, como Ringer o Hartmann; no pasar simultáneamente por Y con calcio IV. La preparación IM tiene volúmenes y diluyentes diferentes. No aplicar estas instrucciones a otra marca, diluyente, tipo de vial ni población neonatal.',
  scope:'IV: vial de 1 g, formulación Hikma, adulto o paciente pediátrico no neonatal, siempre sujeto a protocolo de farmacia',
  sourceSection:'DIRECTIONS FOR USE / COMPATIBILITY AND STABILITY · secciones 43–44',
  finalValidation:'Pendiente de validación de farmacia institucional y presentación mexicana. NO autoriza preparación clínica.'
 },
 enoxaparina:{
  method:'Solución en jeringa precargada para administración subcutánea según presentación específica de Lovenox. No requiere reconstitución ni dilución para los regímenes SC mostrados.',
  restrictions:'NO trasladar estas pautas SC a administración IV, bolos para síndromes coronarios ni concentraciones distintas; verificar fuerza, jeringa y técnica con ficha íntegra y farmacia.',
  scope:'Jeringa precargada Lovenox, regímenes SC de profilaxis médica o TVP hospitalaria',
  sourceSection:'DOSAGE AND ADMINISTRATION / HOW SUPPLIED',
  finalValidation:'Pendiente de comprobación de presentación mexicana y validación institucional.'
 },
 'insulina-glargina':{
  method:'Toujeo U-300 viene en pluma precargada y se administra por vía subcutánea. No se reconstituye ni se prepara una bolsa de infusión. Inspeccionar que la solución sea clara, incolora y sin partículas antes del uso.',
  restrictions:'NO mezclar, diluir, usar por vía IV/bomba ni extraer el contenido de la pluma hacia una jeringa. Confirmar U-300, pluma SoloStar o Max SoloStar, unidades marcadas y entrenamiento.',
  scope:'Solo pluma Toujeo U-300, uso subcutáneo',
  sourceSection:'2.1 Important Administration Instructions, 2.2 General Dosing Instructions',
  finalValidation:'No equivale a validar una dosis individual ni el esquema hospitalario.'
 }
};
const entries=[
 {id:'metformina',name:'Metformina de liberación inmediata (tabletas)',status:'Referencia etiquetada cotejada · revisión clínica externa pendiente',
  jurisdiction:'Etiqueta US de METFORMIN HYDROCHLORIDE TABLETS, solución no parenteral. Verificar registro/formulación en México.',
  source:SRC('bfd6ec0f-8264-4877-aa6d-f347f53bc426','Metformin hydrochloride tablets · RemedyRepack / etiqueta combinada IR-ER',4,'2026-10-23'),
  formulation:'Tabletas de liberación inmediata, vía oral. No confundir con tabletas XR/ER. El etiquetado fuente contempla IR y ER; esta ficha solo aborda IR.',
  monitoring:['TFG al inicio y periódicamente.','Síntomas de intolerancia gastrointestinal o acidosis láctica.','Revisar condiciones de hipoxia, enfermedad aguda y estudios con contraste iodado.'],
  cautions:['Metformina contraindica TFG <30 mL/min/1.73 m² y acidosis metabólica activa (incluida CAD).','NO iniciar metformina si TFG 30–44 mL/min/1.73 m² según esta etiqueta.','Con contraste yodado puede requerirse suspensión temporal por criterios de TFG/comorbilidad/vía; comprobar protocolo y etiqueta.','Las tabletas IR y ER tienen pautas y máximos diferentes; NO intercambiarlas sin revisión.'],
  preparation:{method:'Administración ORAL de tableta de liberación inmediata con alimentos; no hay preparación intravenosa ni reconstitución.',restrictions:'No usar estas instrucciones para metformina XR/ER ni fórmulas combinadas.',scope:'Metformina IR oral',sourceSection:'2.1 Adult Dosage; 2.4 Renal Impairment',finalValidation:'Presentación mexicana y pauta individual requieren revisión.'},
  regimens:[{id:'adult-t2-metformin-ir-start',population:'adult',indication:'adult-t2-metformin-ir-start',title:'DM2 en adulto · inicio de metformina IR',route:'po',
   reference:'Inicio etiquetado: 500 mg VO dos veces al día con comidas O 850 mg VO una vez al día con comida. Máximo del etiquetado IR: 2,550 mg/día en dosis divididas; titulación según tolerancia y control.',
   context:'No aplica a formulaciones de liberación prolongada, embarazo ni enfermedad aguda; no calculamos dosis individuales. Confirmar TFG y tolerancia.',constraints:['Adulto con DM2 confirmada y necesidad clínica documentada','Tableta de liberación inmediata y TFG estable ≥45 mL/min/1.73 m²']}]},
 {id:'amoxicilina',name:'Amoxicilina vía oral (cápsulas)',status:'Referencia etiquetada cotejada · revisión clínica externa pendiente',
  jurisdiction:'Etiqueta estadounidense de amoxicilina; producto reenvasado, NO autoriza todas las presentaciones mexicanas.',
  source:SRC('82c0c5d1-df2d-4352-bd12-99f955af569e','Amoxicillin capsules/tablets/oral suspension · RemedyRepack',11,'2026-10-19'),
  formulation:'Solo pauta orientativa ORAL de cápsulas de amoxicilina, no amoxicilina/clavulanato ni suspensión reconstituida.',
  monitoring:['Signos de hipersensibilidad y tolerancia gastrointestinal.','Respuesta al tratamiento, cultivo, resistencia local y control de infección.','Ajustar según función renal cuando aplique y protocolo institucional.'],
  cautions:['Contraindicada con hipersensibilidad grave previa a amoxicilina o a otros betalactámicos según etiqueta.','No prescribir si la infección es viral o no hay alta sospecha bacteriana.','La pauta de ENT/piel/genitourinaria de intensidad leve-moderada NO equivale a pautas de neumonía, meningitis u otras infecciones.','En TFG <30 mL/min no usar pauta general; la etiqueta contiene ajuste específico.'],
  preparation:{method:'Cápsulas de administración oral, sin reconstitución. La etiqueta recomienda tomarlas al comienzo de una comida para mejorar tolerancia digestiva.',restrictions:'Las suspensiones tienen volúmenes de reconstitución dependientes de concentración y tamaño del frasco: NO usar un volumen de mezcla genérico ni extrapolar de una formulación a otra.',scope:'Amoxicilina en cápsulas, vía oral',sourceSection:'2.1 Instructions, 2.2 Dosage, 2.6 Suspension mixing (NO aplicable a cápsulas)',finalValidation:'Confirmar producto/IPP mexicana y revisión antimicrobiana local.'},
  regimens:[{id:'adult-ent-skin-gu-mild',population:'adult',indication:'adult-ent-skin-gu-mild',title:'Adulto >40 kg · ENT/piel/urinaria susceptible leve-moderada',route:'po',
   reference:'Pauta de referencia de etiqueta: 500 mg VO cada 12 h O 250 mg VO cada 8 h, para infecciones bacterianas susceptibles de oído/nariz/garganta, piel y tracto genitourinario de gravedad leve-moderada.',
   context:'No selecciona duración ni antimicrobiano óptimo. Es imprescindible diagnóstico confirmado/probable y sensibilidad/resistencia; NO extrapolar a neumonía u otros escenarios.',constraints:['Adulto >40 kg, infección bacteriana susceptible del ámbito indicado','Función renal estable documentada ≥30 mL/min; revisar resistencia regional']}]},
 {id:'omeprazol',name:'Omeprazol de liberación retardada (cápsulas)',status:'Referencia etiquetada cotejada · revisión clínica externa pendiente',
  jurisdiction:'Etiqueta estadounidense de cápsulas de omeprazol delayed-release; otras formulaciones pueden diferir.',
  source:SRC('ed9895ae-3d18-434c-8b56-47bccdc8fe6d','Omeprazole delayed-release capsules USP · PD-RX',51,'2026-10-15'),
  formulation:'Cápsulas de liberación retardada para vía oral, no formulación IV, tableta OTC ni mezcla con bicarbonato.',
  monitoring:['Persistencia de síntomas o signos de alarma digestiva.','Revisar duración/indicación y uso simultáneo de otros IBP.','Revisar interacciones y eventos adversos según duración.'],
  cautions:['Contraindicado con productos que contengan rilpivirina según etiqueta estadounidense.','Contraindicado con hipersensibilidad a la formulación u otros benzimidazoles sustituidos.','Síntomas de alarma no deben manejarse con ensayo terapéutico sin evaluación.','No triturar ni masticar los microgránulos de liberación retardada.'],
  preparation:{method:'Tomar la cápsula vía oral antes de los alimentos. Tragar íntegra, sin masticar; para personas que no pueden tragar cápsula, la etiqueta permite abrir y mezclar los microgránulos con una cucharada de puré de manzana no caliente, tomar inmediatamente con agua fría, SIN triturar los microgránulos.',restrictions:'La técnica de apertura descrita aplica a esta formulación concreta y NO a todo IBP o sistema de liberación retardada; verificar presentación mexicana.',scope:'Cápsulas omeprazol delayed-release de la etiqueta consultada',sourceSection:'2.1 Adult Dosage y 2.3 Administration Instructions',finalValidation:'No se ha validado compatibilidad con sondas/administración enteral.'},
  regimens:[{id:'adult-symptomatic-gerd',population:'adult',indication:'adult-symptomatic-gerd',title:'Adulto · ERGE sintomática sin signos de alarma',route:'po',
   reference:'Pauta etiquetada para ERGE sintomática en adultos: 20 mg VO una vez al día por hasta 4 semanas.',
   context:'No aplicar automáticamente a esofagitis erosiva, úlcera, erradicación de Helicobacter pylori ni necesidad de terapia prolongada.',constraints:['Adulto con ERGE sintomática, sin datos de alarma','Sin interacción por rilpivirina y formulación oral de liberación retardada confirmada']}]}
];
const old=base.byId,added=Object.fromEntries(entries.map(x=>[x.id,x]));
const records=Object.freeze([...base.records,...entries]);
const byId=Object.freeze({...old,...added});
function check(id,x){
 if(!added[id])return base.check(id,x);
 const m=added[id],errors=[];
 if(!x||x.population!=='adult')errors.push('La referencia de esta ficha está habilitada SOLO para adultos.');
 if(x?.allergy!=='no')errors.push('Hipersensibilidad o alergias no descartadas: referencia bloqueada.');
 const candidate=m.regimens.find(r=>r.indication===x?.indication&&r.population===x?.population);
 if(!candidate)errors.push('Indicación seleccionada no validada para este producto.');
 if(x?.route!=='po')errors.push('Únicamente vía oral, según formulación comprobada.');
 if(x?.productConfirmed!=='yes')errors.push('Confirmar explícitamente la presentación indicada en la etiqueta.');
 if(x?.pregnancy!=='no')errors.push('Embarazo no descartado: requiere revisión específica, no mostrar esta pauta.');
 if(id==='metformina'){
  if(x?.renal!=='ge45')errors.push('Metformina IR: se exige TFG estable ≥45 mL/min/1.73 m² para esta referencia inicial; por debajo o incierta se bloquea.');
  if(x?.metabolicAcidosis!=='no')errors.push('Acidosis metabólica presente/no descartada: no mostrar pauta.');
  if(x?.acuteIllness!=='no')errors.push('Enfermedad aguda/hipoxia presente o no documentada: valorar antes de uso.');
  if(x?.iodinatedContrast!=='no')errors.push('Contraste yodado próximo/reciente o desconocido: verificar protocolo de suspensión/reinicio.');
 }
 if(id==='amoxicilina'){
  if(x?.weightOver40!=='yes')errors.push('No se ha confirmado peso corporal >40 kg; esta referencia no cubre niños de bajo peso.');
  if(x?.renal!=='ge30')errors.push('TFG ≥30 mL/min estable no confirmada: esta pauta no aplica a deterioro renal grave.');
  if(x?.bacterial!=='yes')errors.push('Infección bacteriana susceptible/probable no documentada; no mostrar antibiótico.');
 }
 if(id==='omeprazol'){
  if(x?.alarmSymptoms!=='no')errors.push('Signos de alarma digestiva presentes/no descartados: no usar esta vía rápida.');
  if(x?.rilpivirine!=='no')errors.push('Rilpivirina presente o sin verificar: contraindicación potencial, referencia bloqueada.');
 }
 if(errors.length)return {status:'blocked',messages:errors,warnings:[],regimen:null,monograph:m};
 return {status:'reference',messages:[],regimen:candidate,monograph:m,
  warnings:['COTEJO DOCUMENTAL DE ETIQUETA ESTADOUNIDENSE; NO representa validación clínica/farmacéutica independiente ni registro mexicano.',
  'Referencias de consulta bajo supervisión. La dosis individual y la preparación real dependen de producto, protocolo y verificación farmacéutica.']};
}
function indications(id,pop){if(!added[id])return base.indications(id,pop);return entries.filter(x=>x.id===id).flatMap(x=>x.regimens.filter(r=>r.population===pop).map(r=>({id:r.indication,title:r.title})));}
const allPrep=Object.freeze({...preparation,...Object.fromEntries(entries.map(x=>[x.id,x.preparation]))});
const report=Object.freeze({totalIndexed:227,labelChecked:records.length,clinicallyApproved:0,partiallyChecked:records.length,notLabelChecked:227-records.length,reviewStandard:'Cotejo documental con etiqueta US; validación clínica independiente y producto mexicano aún pendientes'});
root.KidBumPharmaMonographs=Object.freeze({records,byId,check,indications,populations:base.populations,preparations:allPrep,coverage:report});
})(typeof window!=='undefined'?window:globalThis);
