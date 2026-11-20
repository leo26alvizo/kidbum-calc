(function(root){
'use strict';
/* Pharma Pro 2.0: primary US label safety excerpts only, 20 Nov 2026.
   These are NOT dose regimens, independently approved monographs or Mexican IPP.
   A formulation-specific label cannot validate different routes or concentrations.
   Keep all pending medications fail-closed. */
const reviewedAt='2026-11-20';
const makeSource=(id,title,version,published,sections)=>Object.freeze({
 setid:id,title,version,published,sections,
 url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid='+id
});
const safety=[
 {id:'metoclopramida',name:'Metoclopramida · tabletas Reglan',formulation:'Reglan tabletas 5 y 10 mg, vía oral; esta ficha NO cubre metoclopramida inyectable ni otro producto.',
  source:makeSource('de55c133-eb08-4a35-91a2-5dc093027397','REGLAN tablets · ANI Pharmaceuticals',8,'2026-02-16',['WARNING: TARDIVE DYSKINESIA','1','4','5.1','7.1','8.4','8.6','8.7']),
  indications:['En la etiqueta: gastroparesia diabética aguda o recurrente sintomática en adultos.','En la etiqueta: reflujo gastroesofágico sintomático documentado en adultos tras respuesta insuficiente a tratamiento convencional.'],
  cautions:['Advertencia destacada: discinesia tardía potencialmente irreversible; aumenta con duración acumulada del tratamiento.','Contraindicaciones de la etiqueta incluyen discinesia tardía o distonía previa por metoclopramida y motilidad peligrosa ante hemorragia, obstrucción o perforación gastrointestinal.','La etiqueta de estas tabletas NO recomienda uso pediátrico; no extrapolar a formulaciones parenterales.'],
  interactions:['Antipsicóticos: mayor riesgo de efectos extrapiramidales, discinesia tardía y síndrome neuroléptico maligno.','Revisar fármacos dopaminérgicos y depresores del SNC según la sección de interacciones.'],
  monitoring:['Síntomas extrapiramidales, inquietud motora y movimientos involuntarios.','Evolución clínica, duración y respuesta, riesgo de sedación.'],
  adjustment:'La etiqueta exige reducir dosis cuando CrCl es ≤60 mL/min, también en diálisis; y por hepatopatía Child-Pugh B/C. No se muestra una pauta numérica hasta validar el escenario.',
  pregnancy:'La etiqueta incluye apartados específicos de embarazo y lactancia; se requiere revisión de cada situación, sin decisión automática.'
 },
 {id:'ibuprofeno',name:'Ibuprofeno · Motrin IB 200 mg',formulation:'Capletas Motrin IB 200 mg de uso OTC; NO valida gotas infantiles, suspensión, ibuprofeno de receta o formulaciones parenterales.',
  source:makeSource('d21129f8-4d96-4e36-bc39-a534306dd77e','MOTRIN IB 200 mg · Kenvue Brands LLC',16,'2026-11-02',['Active ingredient','Uses','Allergy alert','Stomach bleeding warning','Heart attack and stroke warning','Directions','Pregnancy']),
  indications:['Uso OTC de esta presentación para alivio temporal de dolores leves y reducción de fiebre según su sección Drug Facts.'],
  cautions:['Riesgo de hemorragia gastrointestinal, especialmente con úlcera previa, edad avanzada o medicamentos concomitantes que aumentan sangrado.','AINE: riesgo cardiovascular de infarto, insuficiencia cardiaca y accidente vascular cerebral.','No usar con antecedente de reacción alérgica a ibuprofeno u otros analgésicos/antipiréticos conforme al envase revisado.','Advertencia en embarazo: desde las 20 semanas, evitar salvo instrucción médica expresa.'],
  interactions:['Anticoagulantes, esteroides y otros AINE elevan el riesgo de sangrado.','Ibuprofeno puede disminuir el beneficio antiagregante de aspirina; revisar indicación y horarios con profesional.'],
  monitoring:['Hemorragia digestiva, melena, dolor abdominal persistente, síntomas de alergia.','Hidratación, presión arterial, función renal y riesgo cardiovascular en personas vulnerables.'],
  adjustment:'Esta etiqueta OTC NO aporta un ajuste renal universal por filtrado ni valida dosis pediátricas de otras presentaciones. Se requiere evaluación clínica.',
  pregnancy:'Advertencia explícita de no usar desde la semana 20 salvo indicación de profesional de salud.'
 },
 {id:'cefepima',name:'Cefepima · polvo inyectable Sagent',formulation:'Cefepime for Injection USP, polvo de 1 g o 2 g para vías IV/IM de la presentación Sagent; no extrapolar a zidebactam/cefepima ni otras formulaciones.',
  source:makeSource('de477f37-40f6-4295-ae72-a2ee36a8922e','CEFEPIME for Injection · Sagent Pharmaceuticals',24,'2026-09-24',['1.1–1.6','2.1–2.2','2.3 renal','4','5.1','5.2 Neurotoxicity','7.2','7.3']),
  indications:['La etiqueta incluye neumonía, neutropenia febril, infecciones urinarias y otras infecciones por bacterias susceptibles, sujetas a diagnóstico y microbiología.'],
  cautions:['Neurotoxicidad potencialmente grave: encefalopatía, mioclonías, convulsiones y estado epiléptico no convulsivo; puede presentarse incluso tras ajustes renales.','Contraindicación de la etiqueta ante reacciones de hipersensibilidad inmediata a cefepima o betalactámicos especificados.','No indicado frente a infección viral ni para tratar microorganismos sin susceptibilidad plausible.'],
  interactions:['Aminoglucósidos: monitorizar función renal por potencial de nefrotoxicidad y ototoxicidad.','Con diuréticos potentes como furosemida se requiere vigilancia renal.'],
  monitoring:['Creatinina y depuración renal, estado mental, mioclonías y convulsiones.','Evolución infecciosa, microbiología, diarrea asociada a antibióticos.'],
  adjustment:'La etiqueta requiere ajuste cuando CrCl ≤60 mL/min; no habilita aquí un esquema calculado, diálisis ni pacientes pediátricos con función renal alterada.',
  pregnancy:'No se han trasladado pautas obstétricas; comprobar embarazo, presentación y protocolo institucional.'
 },
 {id:'cefazolina',name:'Cefazolina · polvo inyectable Hikma',formulation:'Cefazolin for Injection USP, viales para administración parenteral de Hikma; no valida mezclas, estabilidad ni dilución de otra marca.',
  source:makeSource('1dc9de56-e259-4546-a1db-23119a8a088e','CEFAZOLIN for Injection USP · Hikma',13,'2026-05-20',['INDICATIONS AND USAGE','CONTRAINDICATIONS','WARNINGS','Drug Interactions','Perioperative Prophylactic Use','Dosage Adjustment']),
  indications:['La etiqueta aborda tratamiento de infecciones por bacterias susceptibles y profilaxis perioperatoria en escenarios específicos.'],
  cautions:['Contraindicación de la etiqueta ante alergia conocida al grupo de cefalosporinas; interrogar hipersensibilidad a otros betalactámicos.','La etiqueta no establece seguridad y eficacia para prematuros o neonatos: no extrapolar las pautas pediátricas.','Riesgo de diarrea asociada a antibióticos y sobrecrecimiento de microorganismos no susceptibles.'],
  interactions:['Probenecid puede disminuir eliminación renal y prolongar concentraciones de cefalosporinas según la etiqueta.'],
  monitoring:['Función renal y diuresis: la eliminación reducida modifica la exposición del antibiótico.','Reacciones de hipersensibilidad, diarrea asociada a antibióticos, microbiología y respuesta clínica.'],
  adjustment:'La etiqueta contiene ajustes por depuración de creatinina reducida; no mostrar dosis o intervalos hasta verificar contexto y formulación.',
  pregnancy:'Se requiere contextualización obstétrica y farmacéutica del producto local; esta ficha no avala empleo individual.'
 },
 {id:'ondansetron',name:'Ondansetrón · tabletas QPharma',formulation:'Ondansetron hydrochloride, tabletas recubiertas orales. NO avala dosis IV, ODT, uso inespecífico de gastroenteritis o equivalencia de producto mexicano.',
  source:makeSource('2fa30bdb-f60e-40a7-98b4-c346bc85d539','ONDANSETRON tablets · QPharma',7,'2026-11-19',['1 INDICATIONS AND USAGE','2.2 Hepatic Impairment','4','5.2 QT Prolongation','5.3 Serotonin Syndrome','7.1']),
  indications:['La etiqueta revisada se centra en prevención de náusea/vómito asociados con quimioterapia y radioterapia en poblaciones específicas.'],
  cautions:['Contraindicado en uso concomitante de apomorfina por riesgo de hipotensión profunda y pérdida de conciencia, y en hipersensibilidad al medicamento.','Puede prolongar QT y se han reportado torsades de pointes; evitar en QT largo congénito y valorar ECG según factores de riesgo.','Puede enmascarar íleo progresivo o distensión gástrica.'],
  interactions:['Con medicamentos serotoninérgicos (p. ej., ISRS/IRSN), vigilar síndrome serotoninérgico.','Evaluar medicamentos que prolongan QT, alteraciones de potasio y magnesio.'],
  monitoring:['ECG cuando exista riesgo de QT, electrolitos y síntomas de arritmia.','Signos de síndrome serotoninérgico y cambios en motilidad intestinal.'],
  adjustment:'En hepatopatía grave Child-Pugh ≥10 la etiqueta limita la exposición diaria; no extrapolar ese límite a otros escenarios ni calcular una pauta aquí.',
  pregnancy:'Los estudios epidemiológicos citados en la etiqueta tienen resultados inconsistentes; requiere decisión clínica individual, no extrapolación de seguridad.'
 },
 {id:'furosemida',name:'Furosemida · tabletas PD-Rx',formulation:'Tabletas orales de furosemida USP; la ficha NO cubre presentaciones IV ni conversión VO/IV.',
  source:makeSource('3ba730ab-90d4-478a-80b3-1ea3edb03e4d','FUROSEMIDE tablets USP · PD-Rx Pharmaceuticals',18,'2026-11-18',['WARNING','Edema','Hypertension','CONTRAINDICATIONS','Laboratory Tests','Drug Interactions','Dosage']),
  indications:['En la etiqueta: edema de origen cardiaco, hepático o renal; en adultos, hipertensión seleccionada.'],
  cautions:['Potente diurético: la diuresis excesiva puede causar hipovolemia, hipotensión y pérdidas significativas de electrolitos.','Contraindicación de la etiqueta ante anuria o antecedente de hipersensibilidad a furosemida.','En cirrosis con ascitis, alteraciones agudas de volumen o electrolitos pueden precipitar complicaciones; requiere vigilancia.'],
  interactions:['La asociación con aminoglucósidos puede incrementar ototoxicidad, especialmente con deterioro renal.','Considerar interacciones con otros antihipertensivos y medicamentos que modifican volumen o potasio.'],
  monitoring:['Balance hídrico, presión arterial y signos de deshidratación.','Potasio, sodio, creatinina, BUN y CO₂ conforme a situación clínica.'],
  adjustment:'La etiqueta exige individualizar según respuesta, edad, situación renal y objetivo terapéutico; no se habilitan dosis ni equivalencias VO/IV.',
  pregnancy:'La etiqueta exige sopesar beneficios y riesgos durante embarazo; no se aporta pauta obstétrica.'
 }
];
const priorityIds=Object.freeze([
 'amoxicilina','amoxicilina-clavulanato','cefazolina','ceftriaxona','cefepima',
 'piperacilina-tazobactam','vancomicina','meropenem','metronidazol','gentamicina',
 'amikacina','azitromicina','paracetamol','ibuprofeno','ketorolaco','morfina',
 'fentanilo','omeprazol','ondansetron','metoclopramida','insulina-regular',
 'insulina-nph','insulina-glargina','insulina-lispro','metformina','enoxaparina',
 'heparina','warfarina','apixaban','adrenalina','noradrenalina','atropina',
 'amiodarona','sulfato-magnesio','potasio-iv','gluconato-calcio','furosemida',
 'losartan','amlodipino','prednisona'
]);
const byId=Object.freeze(Object.fromEntries(safety.map(row=>[row.id,Object.freeze({
 ...row,source:row.source,indications:Object.freeze(row.indications),
 cautions:Object.freeze(row.cautions),interactions:Object.freeze(row.interactions),
 monitoring:Object.freeze(row.monitoring),reviewedAt,
 status:'Etiqueta US cotejada parcialmente · seguridad, SIN dosis habilitada',
 jurisdiction:'EE. UU. · no verifica registro ni IPP del producto en México',
 clinicalApproved:false,mexicanProductConfirmed:false,hasRegimen:false
})])));
function summary(lib,monographs){
 const ids=priorityIds.filter(id=>lib?.byId?.[id]);
 const sourceDose=ids.filter(id=>Boolean(monographs?.byId?.[id]));
 const sourceSafety=ids.filter(id=>Boolean(byId[id]));
 const verified=new Set([...sourceDose,...sourceSafety]);
 return Object.freeze({
 priority:ids.length,scopedDose:sourceDose.length,sourceSafety:sourceSafety.length,
 sourceChecked:verified.size,pending:ids.length-verified.size,
 fullyApproved:0,mexicanConfirmed:0,
 totalIndex:lib?.records?.length||0,reviewedAt
 });
}
function state(id,monographs){
 if(monographs?.byId?.[id])return 'source-dose-partial';
 if(byId[id])return 'source-safety-only';
 return priorityIds.includes(id)?'priority-pending':'index-pending';
}
root.KidBumPharmaEvidence=Object.freeze({version:'2.0 · fase documental',reviewedAt,records:Object.freeze(safety),byId,priorityIds,summary,state});
})(typeof window!=='undefined'?window:globalThis);
