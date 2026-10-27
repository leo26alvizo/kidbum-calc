(function(root){
'use strict';
/* KidBum Pharma Pro - offline and non-prescriptive.
  Inventory records are INDEX ENTRIES, not approved clinical monographs.
  Only individual evidence highlights are linked to checked primary labels.
  No medication doses, infusion preparation instructions or blanket interaction clearance.
*/
const SOURCES=Object.freeze({
 ismp:{label:'ISMP · lista de medicamentos de alto riesgo (2024)',url:'https://www.ismp.org/system/files/resources/2024-01/ISMP_HighAlert_AcuteCare_List_010924_MS5760.pdf'},
 who:{label:'OMS · listas de medicamentos esenciales (2025)',url:'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists/'},
 cofepris:{label:'COFEPRIS · visor de registros de medicamentos',url:'https://registros.cofepris.gob.mx/BRSDM/default.aspx'},
 dailymed:{label:'DailyMed · etiquetado de medicamentos (FDA, EE. UU.)',url:'https://dailymed.nlm.nih.gov/dailymed/'},
 ceftriaxona:{label:'DailyMed · ceftriaxona, advertencias neonatales',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8351aa37-552d-471d-b293-c564dcb6ec29'},
 potasio:{label:'DailyMed · cloruro de potasio IV concentrado',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=559a0a8c-a8fe-40a5-b196-21f9308780ab'},
 glargina:{label:'DailyMed · insulina glargina U-300',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c9561d96-124d-48ca-982f-0aa1575bff36'},
 enoxaparina:{label:'DailyMed · enoxaparina, etiqueta revisada 2026',url:'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5017a927-2a24-4f27-89f9-27c805bf7d59'},
 warfarina:{label:'DailyMed · warfarina y interacciones CYP450',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2cbcc99d-9107-4d39-a1e9-e19305de8b5d'},
 ketorolaco:{label:'DailyMed · ketorolaco y riesgo hemorrágico',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=04df9620-6dcb-494a-83e2-6d28036be974'}
});
const defs=[
/* id | nombre | grupo | población (A/P/N) | uso orientativo | control previo (no reemplaza IPP) | alto riesgo */
['amoxicilina','Amoxicilina','Antimicrobianos','AP','Infecciones bacterianas susceptibles','Confirmar indicación, alergia a betalactámicos, edad/peso, función renal y formulación.',0],
['amoxicilina-clavulanato','Amoxicilina / ácido clavulánico','Antimicrobianos','AP','Infecciones bacterianas seleccionadas','Verificar formulación de ambos componentes y diferencia entre mg de amoxicilina y mg totales.',0],
['cefazolina','Cefazolina','Antimicrobianos','AP','Profilaxis quirúrgica y otras infecciones susceptibles','Confirmar indicación, alergias y función renal; verificar tiempo de administración.',0],
['ceftriaxona','Ceftriaxona','Antimicrobianos','APN','Infecciones bacterianas seleccionadas','Neonatos: comprobar edad gestacional y posnatal, hiperbilirrubinemia y necesidad de calcio IV.',0],
['cefotaxima','Cefotaxima','Antimicrobianos','APN','Infecciones bacterianas seleccionadas','Verificar indicación, edad, peso, función renal y antibiograma cuando corresponda.',0],
['cefepima','Cefepima','Antimicrobianos','AP','Infecciones graves por bacterias susceptibles','Verificar función renal, neurotoxicidad y microbiología.',0],
['piperacilina-tazobactam','Piperacilina / tazobactam','Antimicrobianos','AP','Infecciones bacterianas seleccionadas','Verificar alergias, función renal, indicación y protocolo local.',0],
['vancomicina','Vancomicina','Antimicrobianos','APN','Infecciones por microorganismos susceptibles','Verificar función renal, exposición y estrategia institucional de monitorización.',0],
['meropenem','Meropenem','Antimicrobianos','APN','Infecciones bacterianas graves seleccionadas','Verificar indicación, alergias, función renal y política antimicrobiana.',0],
['metronidazol','Metronidazol','Antimicrobianos','APN','Infecciones por anaerobios y otras indicaciones','Revisar función hepática, indicación y otros medicamentos; interacción con warfarina.',0],
['gentamicina','Gentamicina','Antimicrobianos','APN','Infecciones susceptibles seleccionadas','Verificar peso para pauta, función renal y vigilancia auditiva/renal.',0],
['amikacina','Amikacina','Antimicrobianos','APN','Infecciones por microorganismos susceptibles','Verificar indicación, peso, función renal y concentraciones según protocolo.',0],
['azitromicina','Azitromicina','Antimicrobianos','AP','Infecciones bacterianas susceptibles','Revisar QT, interacciones y pertinencia antimicrobiana.',0],
['paracetamol','Paracetamol','Analgesia','AP','Analgesia y antipiresis','Revisar dosis acumulada de todos los productos, hepatopatía y vía.',0],
['ibuprofeno','Ibuprofeno','Analgesia','AP','Analgesia, antipiresis y antiinflamatorio','Revisar deshidratación, función renal, antecedentes gastrointestinales y alergias.',0],
['ketorolaco','Ketorolaco','Analgesia','A','Analgesia de corta duración en indicaciones seleccionadas','Revisar riesgo de sangrado, AINE concomitantes, función renal y duración.',0],
['metamizol','Metamizol','Analgesia','AP','Analgesia y antipiresis donde se autorice','Revisar agranulocitosis, contraindicaciones y formulación local.',0],
['morfina','Morfina','Analgesia','APN','Analgesia opioide seleccionada','Alto riesgo: depresión respiratoria, sedación, función renal y otras sustancias depresoras.',1],
['fentanilo','Fentanilo','Analgesia','APN','Analgesia y anestesia bajo supervisión','Alto riesgo: presentación/vía, monitorización ventilatoria y duplicidad de opioides.',1],
['omeprazol','Omeprazol','Gastroenterología','AP','Supresión de ácido en indicaciones seleccionadas','Verificar indicación, duración, interacciones y vía.',0],
['ondansetron','Ondansetrón','Gastroenterología','AP','Antiemético en indicaciones seleccionadas','Revisar intervalo QT, potasio/magnesio y combinaciones farmacológicas.',0],
['metoclopramida','Metoclopramida','Gastroenterología','AP','Antiemético/procinético en indicaciones seleccionadas','Revisar reacciones extrapiramidales, edad, función renal y duración.',0],
['insulina-regular','Insulina humana regular','Endocrinología','AP','Control glucémico supervisado','Alto riesgo: concentración, vía, hora, glucemia, alimentación y esquema completo.',1],
['insulina-nph','Insulina NPH','Endocrinología','AP','Insulina intermedia','Alto riesgo: identificar insulina, suspensión, esquema, concentración e hipoglucemia.',1],
['insulina-glargina','Insulina glargina','Endocrinología','AP','Insulina basal','Alto riesgo: confirmar U-100/U-300, dispositivo; no administrar glargina U-300 IV.',1],
['insulina-lispro','Insulina lispro','Endocrinología','AP','Insulina prandial rápida','Alto riesgo: coordinación con ingesta, glucemia y concentración.',1],
['metformina','Metformina','Endocrinología','A','Tratamiento de diabetes mellitus tipo 2','Verificar indicación, función renal y condiciones de enfermedad aguda.',0],
['enoxaparina','Enoxaparina','Antitrombóticos','A','Anticoagulación, profiláctica o terapéutica según indicación','Alto riesgo: distinguir indicación, función renal, peso, plaquetas, sangrado y manejo neuraxial.',1],
['heparina','Heparina no fraccionada','Antitrombóticos','APN','Anticoagulación en indicaciones seleccionadas','Alto riesgo: concentración, vía, indicación, plaquetas y monitorización.',1],
['warfarina','Warfarina','Antitrombóticos','A','Anticoagulación oral en indicaciones seleccionadas','Alto riesgo: INR, hemorragia, interacciones e indicación específica.',1],
['apixaban','Apixabán','Antitrombóticos','A','Anticoagulación oral en indicaciones seleccionadas','Alto riesgo: indicación, función renal, edad, peso e interacciones; no extrapolar ajuste.',1],
['adrenalina','Adrenalina (epinefrina)','Urgencias','APN','Reanimación, anafilaxia y otras indicaciones','Alto riesgo: concentración, indicación, vía y monitorización; evitar error mg/mL.',1],
['noradrenalina','Noradrenalina','Urgencias','APN','Vasopresor bajo monitorización','Alto riesgo: concentración, bomba, vía, perfusión y protocolo de extravasación.',1],
['atropina','Atropina','Urgencias','APN','Indicaciones cardiovasculares/toxicológicas seleccionadas','Confirmar contexto, edad, vía, formulación y ECG.',0],
['adenosina','Adenosina','Urgencias','AP','Taquicardias específicas según algoritmo','Verificar ritmo, contraindicaciones y equipo de monitorización/reanimación.',0],
['amiodarona','Amiodarona','Cardiovascular','A','Arritmias en indicaciones seleccionadas','Alto riesgo IV: ritmo, QT, interacciones, función tiroidea/hepática y monitorización.',1],
['sulfato-magnesio','Sulfato de magnesio','Urgencias','APN','Indicaciones obstétricas, cardiológicas y electrolíticas','Alto riesgo IV: concentración, vía, reflejos, función renal y monitorización.',1],
['potasio-iv','Cloruro de potasio IV concentrado','Electrolitos','APN','Corrección de hipopotasemia cuando la vía oral no es viable','Alto riesgo: el concentrado NUNCA debe administrarse IV sin dilución.',1],
['gluconato-calcio','Gluconato de calcio','Electrolitos','APN','Indicaciones electrolíticas y otras seleccionadas','Confirmar indicación, compatibilidad IV, vía y monitorización ECG.',0],
['bicarbonato-sodio','Bicarbonato de sodio','Electrolitos','APN','Indicaciones acidobásicas específicas','Revisar gasometría, sodio, estado ventilatorio e indicación concreta.',0],
['furosemida','Furosemida','Cardiovascular','APN','Diurético de asa','Vigilar estado de volumen, presión arterial, función renal y electrolitos.',0],
['losartan','Losartán','Cardiovascular','A','Hipertensión y otras indicaciones seleccionadas','Revisar embarazo, potasio, función renal e interacciones.',0],
['amlodipino','Amlodipino','Cardiovascular','A','Hipertensión y angina en indicaciones seleccionadas','Revisar presión arterial, edema, contraindicaciones y combinaciones.',0],
['metoprolol','Metoprolol','Cardiovascular','A','Indicaciones cardiológicas seleccionadas','Revisar frecuencia cardiaca, presión arterial, conducción y formulación.',0],
['levotiroxina','Levotiroxina','Endocrinología','APN','Reemplazo tiroideo según indicación','Verificar formulación, administración, TSH/FT4 e interacciones.',0],
['prednisona','Prednisona','Corticoides','AP','Glucocorticoide oral en indicaciones específicas','Revisar duración, infecciones, glucemia, supresión del eje y retiro gradual.',0]
];
const population=Object.freeze({A:'Adultos',P:'Pediatría',N:'Neonatología'});
function slug(id){return id;}
const extras=Object.freeze({
 ceftriaxona:{source:'ceftriaxona',highlights:[
  'En neonatos prematuros o con hiperbilirrubinemia se describen contraindicaciones específicas.',
  'En neonatos de ≤28 días que requieren calcio intravenoso, la ceftriaxona está contraindicada por precipitación ceftriaxona-calcio.'
 ]},
 'potasio-iv':{source:'potasio',highlights:[
  'El cloruro de potasio IV concentrado DEBE diluirse antes de su administración; la inyección directa puede causar arritmias fatales.',
  'No se proporcionan dilución, velocidad, concentración final ni vía de acceso sin validación institucional de la presentación.'
 ]},
 'insulina-glargina':{source:'glargina',highlights:[
  'La formulación glargina U-300 no debe administrarse por vía IV ni bomba de insulina.',
  'No transferir insulina glargina U-300 desde su pluma precargada a una jeringa.'
 ]},
 enoxaparina:{source:'enoxaparina',highlights:[
  'En insuficiencia renal grave puede requerirse modificación de pauta según indicación y depuración estimada.',
  'Existe riesgo de hematoma epidural/espinal en procedimientos neuroaxiales; verificar anticoagulación y tiempos.'
 ]},
 warfarina:{source:'warfarina',highlights:[
  'Amiodarona y metronidazol figuran como inhibidores que pueden elevar el efecto de warfarina; monitorizar INR según prescripción.'
 ]},
 ketorolaco:{source:'ketorolaco',highlights:[
  'El tratamiento concomitante con anticoagulantes incrementa el riesgo de complicaciones hemorrágicas; valorar contraindicaciones y seguimiento.'
 ]}
});
const records=Object.freeze(defs.map(([id,name,group,pop,use,checks,high])=>Object.freeze({
 id,name,group,populations:pop.split('').map(x=>population[x]),use,checks,
 highRisk:high===1,evidence:extras[id]||null,
 reviewStatus:extras[id]?'Alerta de seguridad con fuente comprobada · monografía incompleta':'Ficha índice · monografía y dosis pendientes de validación'
})));
const byId=Object.freeze(Object.fromEntries(records.map(x=>[x.id,x])));
const interactionRules=Object.freeze([
 {drugs:['enoxaparina','ketorolaco'],level:'warning',message:'Enoxaparina + ketorolaco: mayor riesgo hemorrágico. Evaluar combinación con el equipo tratante y vigilar sangrado.',source:'enoxaparina'},
 {drugs:['warfarina','metronidazol'],level:'warning',message:'Warfarina + metronidazol: puede aumentar el INR. Requiere revisión de interacción y vigilancia prescrita.',source:'warfarina'},
 {drugs:['warfarina','amiodarona'],level:'warning',message:'Warfarina + amiodarona: puede aumentar el INR. Revisar el etiquetado y la monitorización.',source:'warfarina'}
]);
function interaction(a,b){
 if(!byId[a]||!byId[b])return {supported:false,message:'Selecciona dos medicamentos del catálogo.',source:null};
 if(a===b)return {supported:true,level:'review',message:'Duplicidad del mismo principio activo: verificar si es una entrada doble o dos administraciones intencionales; NO equivale a dosis validada.',source:null};
 const r=interactionRules.find(x=>x.drugs.includes(a)&&x.drugs.includes(b));
 return r?{supported:true,level:r.level,message:r.message,source:SOURCES[r.source]}:
 {supported:false,message:'La base de interacciones es parcial: ausencia de alerta NO significa que la combinación sea segura. Confirmar en referencia completa y con Farmacia.',source:null};
}
function audit(x){
 if(!x||!byId[x.drug])return {status:'pending',messages:['Selecciona un principio activo del catálogo.']};
 const drug=byId[x.drug],problems=[],warnings=[],checks=[drug.checks];
 if(!['adulto','pediatrico','neonato'].includes(x.population))problems.push('Especifica población; no se extrapolan fichas entre adultos, niños y neonatos.');
 if(x.population==='pediatrico'&&(!x.weight||!Number.isFinite(Number(x.weight))||Number(x.weight)<=0))problems.push('Pediatría: falta peso actual en kg antes de comprobar cualquier pauta.');
 if(x.population==='neonato')problems.push('Neonatología: exige edad gestacional, edad posnatal, peso y valoración farmacéutica; no hay dosis neonatales publicadas.');
 if(x.allergy==='yes')problems.push('Ante alergia farmacológica conocida, identificar sustancia y reacción; comprobar contraindicación antes de administrar.');
 if(x.allergy!=='yes'&&x.allergy!=='no')problems.push('Alergias no comprobadas: revisión incompleta.');
 if(x.route==='unknown')problems.push('Vía de administración no identificada.');
 if(x.renal==='unknown')warnings.push('Función renal no documentada: verificar si el medicamento requiere ajuste individual.');
 if(x.renal==='impaired')warnings.push('Alteración renal documentada: revisar producto, indicación y estimación renal apropiada antes de indicar dosis.');
 if(x.pregnancy==='yes')warnings.push('Embarazo/lactancia: verificar monografía específica y valoración obstétrica.');
 if(x.drug==='ceftriaxona'&&x.population==='neonato'&&x.ivcalcium==='yes')problems.push('CONTRAINDICACIÓN de etiquetado: ceftriaxona en neonato ≤28 días con necesidad de calcio IV.');
 if(x.drug==='ceftriaxona'&&x.population==='neonato')checks.push('Comprobar hiperbilirrubinemia, prematuridad y necesidad de calcio IV.');
 if(x.drug==='potasio-iv'&&x.route==='iv')problems.push('KCl IV concentrado: administración únicamente tras dilución validada; nunca IV directo.');
 if(x.drug==='insulina-glargina'&&x.route==='iv')problems.push('Glargina U-300 no es de uso IV; confirmar presentación exacta antes de administrar.');
 if(drug.highRisk)warnings.push('Medicamento/grupo de alto riesgo ISMP: establecer doble verificación independiente cuando proceda según protocolo.');
 warnings.push('Este módulo NO comprueba dosis ni compatibilidad completa. No sustituye las fichas del producto autorizado en México.');
 return {status:problems.length?'blocked':'review',messages:problems,warnings,checks,drug};
}
function search(q='',filter='all',population='all',onlyHigh=false){
 const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const term=normalize(q.trim());
 return records.filter(d=>(filter==='all'||d.group===filter)&&(population==='all'||d.populations.includes(population))&&(!onlyHigh||d.highRisk)&&normalize(d.name+' '+d.group+' '+d.use+' '+d.id).includes(term));
}
root.KidBumPharmaCore=Object.freeze({records,byId,sources:SOURCES,interactionRules,interaction,audit,search});
})(typeof window!=='undefined'?window:globalThis);
