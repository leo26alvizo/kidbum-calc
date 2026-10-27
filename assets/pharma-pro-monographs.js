(function(root){
'use strict';
/* KidBum Pharma Pro 0.10.30 — initial source-matched, scoped US-label references.
   These are EXCERPTS for supervised reference only, not complete monographs,
   product interchangeability claims, validated orders or individualized doses.
   No data is stored, sent, or used for automated dose calculation.
*/
const monographs=[
 {id:'ceftriaxona',name:'Ceftriaxona para inyección',status:'Referencias posológicas parciales verificadas',jurisdiction:'Etiquetado de Estados Unidos; NO acredita presentación/uso autorizado en México',
  source:{title:'Ceftriaxone for Injection, USP · Hikma Pharmaceuticals USA',setid:'8351aa37-552d-471d-b293-c564dcb6ec29',version:18,effective:'2026-09-30',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8351aa37-552d-471d-b293-c564dcb6ec29'},
  formulation:'Polvo para solución inyectable; vías IV o IM. No trasladar diluciones entre marcas o formulaciones.',
  monitoring:['Respuesta clínica y microbiología cuando corresponda.','Ante deterioro renal más hepatopatía significativa, reevaluar dosis y seguimiento.','Reacciones de hipersensibilidad y complicaciones biliares cuando corresponda.'],
  cautions:['Contraindicación en neonatos prematuros o hiperbilirrubinémicos, y en neonatos de ≤28 días si requieren soluciones IV con calcio.','No utilizar soluciones de calcio (Ringer/Hartmann) para reconstituir o diluir. No combinar ceftriaxona y calcio IV simultáneamente.','Si se usa lidocaína como diluyente IM, la preparación NO debe administrarse IV.','En disfunción renal y hepática significativa combinadas, esta etiqueta indica no exceder 2 g/día; se requiere revisión individual.'],
  regimens:[
   {id:'adult-general',population:'adult',title:'Adultos · pauta habitual para infecciones bacterianas susceptibles',indication:'adult-general',route:'ivim',
    reference:'1–2 g al día, en una administración o divididos cada 12 h, según indicación y gravedad; máximo absoluto etiquetado 4 g/día.',
    context:'No aplicar automáticamente a gonorrea, meningitis, profilaxis quirúrgica ni otras indicaciones con pautas específicas. Antibiótico solo ante infección bacteriana demostrada o muy probable.',
    constraints:['Edad adulta ≥18 años confirmada','Indicación y susceptibilidad clínica/microbiológica evaluadas']},
   {id:'pediatric-skin',population:'pediatric',title:'Pediatría no neonatal · infecciones de piel/tejidos blandos',indication:'pediatric-skin',route:'ivim',
    reference:'50–75 mg/kg/DÍA en una administración o dos fracciones cada 12 h; máximo 2 g/día para esta indicación.',
    context:'Referencia de la etiqueta específica; NO extrapolar a meningitis, otitis, sepsis neonatal u otras indicaciones. No calcula mg por paciente.',
    constraints:['Paciente pediátrico, edad >28 días, no neonatal','Peso actual e indicación documentados']},
   {id:'pediatric-aom',population:'pediatric',title:'Pediatría no neonatal · otitis media bacteriana aguda',indication:'pediatric-aom',route:'im',
    reference:'50 mg/kg en una sola administración IM, máximo 1 g.',
    context:'No toda otitis media requiere antibiótico. Confirmar diagnóstico otoscópico, selección de antibiótico y alternativas según guía local. Esta referencia es específica de inyección IM.',
    constraints:['Paciente pediátrico, edad >28 días, no neonatal','OMA diagnosticada y decisión médica de antibiótico verificada']}
  ]},
 {id:'enoxaparina',name:'Enoxaparina (Lovenox)',status:'Referencias posológicas parciales verificadas',jurisdiction:'Etiquetado estadounidense de Lovenox; comprobar producto autorizado en México',
  source:{title:'Lovenox (enoxaparin sodium) · Sanofi-Aventis U.S.',setid:'5017a927-2a24-4f27-89f9-27c805bf7d59',version:33,effective:'2026-05-28',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5017a927-2a24-4f27-89f9-27c805bf7d59'},
  formulation:'Solución inyectable de enoxaparina; estos regímenes se refieren exclusivamente a vía subcutánea.',
  monitoring:['Evaluar sangrado activo o trastorno hemorrágico antes de iniciar.','Plaquetas, hemoglobina y vigilancia de HIT/hemorragia según contexto.','Depuración de creatinina en mL/min, estabilidad renal, peso e intervenciones neuroaxiales.'],
  cautions:['Contraindicada ante hemorragia mayor activa o HIT inmunitaria en los últimos 100 días / anticuerpos circulantes, conforme a esta etiqueta.','Riesgo de hematoma espinal/epidural con punciones/anestesia neuroaxiales.','La dosis PROFILÁCTICA no equivale a una pauta TERAPÉUTICA; no extrapolar entre indicaciones.','La etiqueta indica ajustes cuando CrCl <30 mL/min; en función renal inestable el esquema no debe derivarse de una estimación aislada.'],
  regimens:[
   {id:'medical-prophy-normal',population:'adult',title:'Profilaxis · paciente médico agudo con movilidad muy restringida · CrCl ≥30',indication:'medical-prophy',route:'sc',renal:'ge30',
    reference:'40 mg subcutáneos una vez al día; duración habitual de esta indicación según etiqueta: 6–11 días.',
    context:'Solo para la indicación descrita, tras valorar riesgo trombótico, sangrado, plaquetas y contraindicación. No aplicar a cirugía, trombosis establecida ni gestación.',
    constraints:['Adulto con riesgo tromboembólico médico y movilidad gravemente reducida','CrCl documentada ≥30 mL/min y función renal estable']},
   {id:'medical-prophy-severe',population:'adult',title:'Profilaxis · paciente médico agudo con movilidad muy restringida · CrCl <30',indication:'medical-prophy',route:'sc',renal:'lt30',
    reference:'30 mg subcutáneos una vez al día según tabla de ajuste de Lovenox en deterioro renal grave (CrCl <30 mL/min).',
    context:'Requiere revisión médica/farmacéutica de función renal, sangrado y presentación específica. No implica que el uso sea adecuado en diálisis o lesión renal aguda.',
    constraints:['Adulto con indicación de profilaxis médica','CrCl documentada <30 mL/min; validar contexto de lesión renal aguda/diálisis']},
   {id:'dvt-treatment-normal',population:'adult',title:'Tratamiento · TVP aguda hospitalaria · CrCl ≥30',indication:'dvt-inpatient',route:'sc',renal:'ge30',
    reference:'1 mg/kg cada 12 h SC O 1.5 mg/kg una vez al día SC (alternativas del etiquetado para TVP aguda hospitalaria).',
    context:'La elección depende de contexto clínico. La etiqueta describe tratamiento acompañado de warfarina cuando corresponda; confirmar protocolo actual, anticoagulante y transición. No calcula dosis total.',
    constraints:['TVP aguda con o sin embolia pulmonar, manejo hospitalario','CrCl documentada ≥30 mL/min y función renal estable']},
   {id:'dvt-treatment-severe',population:'adult',title:'Tratamiento · TVP aguda hospitalaria · CrCl <30',indication:'dvt-inpatient',route:'sc',renal:'lt30',
    reference:'1 mg/kg subcutáneo UNA vez al día según tabla renal específica de la etiqueta de Lovenox.',
    context:'No extrapolar a SCA/STEMI, intervenciones ni poblaciones pediátricas. Comprobar hemostasia, plaquetas, peso, esquema anticoagulante y función renal.',
    constraints:['TVP aguda con o sin embolia pulmonar, manejo hospitalario','CrCl <30 mL/min documentada; confirmar estabilidad, diálisis y pertinencia clínica']}
  ]},
 {id:'insulina-glargina',name:'Insulina glargina U-300 (Toujeo)',status:'Referencia posológica parcial verificada',jurisdiction:'Etiqueta estadounidense de Toujeo U-300; NO acredita registro en México ni debe extrapolarse a glargina U-100 u otras presentaciones',
  source:{title:'Toujeo / Toujeo Max (insulin glargine U-300) · Sanofi-Aventis U.S.',setid:'c9561d96-124d-48ca-982f-0aa1575bff36',version:25,effective:'2025-05-30',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c9561d96-124d-48ca-982f-0aa1575bff36'},
  formulation:'Únicamente glargina U-300 (300 unidades/mL), en plumas Toujeo SoloStar/Max SoloStar. No incluye glargina U-100.',
  monitoring:['Glucemia y episodios de hipoglucemia, especialmente en cambios de esquema y enfermedad aguda.','Ingesta, horarios, función renal/hepática, riesgo de hipopotasemia.','En DM1 siempre revisar cobertura de insulina prandial/rápida, no usar basal sola.'],
  cautions:['NO administrar por vía intravenosa ni bomba de insulina. No mezclar ni diluir.','NO transferir desde la pluma precargada a una jeringa: riesgo de sobredosis.','No hacer conversiones de las unidades marcadas por la pluma a mililitros.','Contraindicada durante episodios de hipoglucemia y ante hipersensibilidad a glargina o excipientes.','No utilizar para tratamiento de cetoacidosis diabética. Los ajustes de dosis requieren titulación supervisada, no automática.'],
  regimens:[
   {id:'adult-t2-naive',population:'adult',title:'DM2 adulto · inicio en persona sin tratamiento previo con insulina',indication:'adult-t2-naive',route:'sc',formulation:'u300',prior:'no',
    reference:'La etiqueta Toujeo U-300 indica una dosis inicial de referencia de 0.2 unidades/kg UNA vez al día para DM2 sin tratamiento previo con insulina.',
    context:'No se calcula aquí la dosis absoluta ni se extrapola a DM1, pediatría, U-100, pacientes previamente insulinados, embarazo o crisis metabólicas. Confirmar indicación y supervisión.',
    constraints:['Adulto con DM2 confirmada','Sin tratamiento previo con insulina y U-300 en pluma verificada']}
  ]}
];
const byId=Object.freeze(Object.fromEntries(monographs.map(x=>[x.id,Object.freeze(x)])));
const opts={adult:'Adulto ≥18 años',pediatric:'Pediátrico >28 días',neonate:'Neonato ≤28 días'};
function check(id,x){
 const m=byId[id];if(!m)return {status:'absent',messages:['No existe referencia posológica revisada para este medicamento.'],regimen:null};
 const errors=[],warnings=[];
 if(!x||!Object.hasOwn(opts,x.population))errors.push('Seleccionar explícitamente población y confirmar edad.');
 if(x?.population==='neonate')errors.push('Neonatos: NO hay referencias posológicas habilitadas. Revisar contraindicaciones, prematuridad, bilirrubina y calcio IV cuando aplique.');
 if(!['yes','no','unknown'].includes(x?.allergy))errors.push('Comprobar antecedentes de hipersensibilidad antes de interpretar la referencia.');
 else if(x.allergy!=='no')errors.push('Alergia presente o sin aclarar: no se presenta pauta.');
 const options=m.regimens.filter(r=>r.population===x?.population);
 if(options.length===0)errors.push('La población seleccionada no cuenta con una pauta verificada en esta edición.');
 const indication=x?.indication;
 if(!indication)errors.push('Elegir una indicación concreta.');
 const possible=options.filter(r=>r.indication===indication);
 if(indication&&!possible.length)errors.push('Indicación no respaldada para esta población.');
 if(x?.population==='pediatric'&&x?.weightVerified!=='yes')errors.push('En pediatría, confirmar peso actual e indicación sin generar dosis individual.');
 if(id==='ceftriaxona'){
  if(x?.combinedSevereImpairment!=='no')errors.push('Función renal y hepática significativamente alteradas / inciertas: individualizar y aplicar límite etiquetado de 2 g/día antes de consultar pautas generales.');
  if(x?.calciumIV!=='no')errors.push('Calcio IV pendiente o indicado: verificar compatibilidad/calcio-ceftriaxona, especialmente en neonatos.');
 }
 if(id==='enoxaparina'){
  if(!['ge30','lt30'].includes(x?.renal))errors.push('CrCl documentada y estable (≥30 o <30 mL/min) es obligatoria; no asumir función renal.');
  if(x?.bleeding!=='no')errors.push('Hemorragia activa mayor o sin descartar: revisión imprescindible, no mostrar pauta.');
  if(x?.hit!=='no')errors.push('HIT inmunitaria reciente/anticuerpos circulantes o antecedentes inciertos: revisión imprescindible.');
  if(x?.neuroaxial!=='no')errors.push('Procedimiento neuroaxial previsto o desconocido: requiere plan específico de anticoagulación.');
  if(x?.kidneyStable!=='yes')errors.push('Función renal no estable o sin confirmar: una CrCl aislada no valida pauta.');
 }
 if(id==='insulina-glargina'){
  if(x?.formulation!=='u300')errors.push('Solo la presentación específica Toujeo U-300, en pluma, tiene referencia habilitada.');
  if(x?.type!=='t2')errors.push('La pauta de esta monografía está delimitada a DM2 confirmada.');
  if(x?.prior!=='no')errors.push('Solo se muestra referencia para persona sin insulina previa; conversiones requieren otra pauta.');
  if(x?.hypoglycemia!=='no')errors.push('Hipoglucemia presente o no evaluada: no mostrar pauta.');
  if(x?.basalOnlyT1==='yes')errors.push('En DM1 no debe usarse insulina basal como único componente.');
 }
 const candidate=possible.find(r=>(r.renal===undefined||r.renal===x?.renal)&&(r.formulation===undefined||r.formulation===x?.formulation)&&(r.prior===undefined||r.prior===x?.prior))||null;
 if(possible.length&&!candidate)errors.push('La condición renal/formulación no coincide con las pautas revisadas.');
 if(!['iv','im','sc'].includes(x?.route))errors.push('Seleccionar una vía de administración verificada.');
 if(candidate&&!(candidate.route==='ivim'&&['iv','im'].includes(x?.route))&&candidate.route!==x?.route)errors.push('La vía propuesta NO coincide con la vía de la referencia etiquetada.');
 if(errors.length)return {status:'blocked',messages:errors,warnings,regimen:null,monograph:m};
 warnings.push('REFERENCIA DOCUMENTAL DE ETIQUETA ESTADOUNIDENSE; no receta, ajuste personalizado ni autorización de uso en México.');
 warnings.push('Verificar producto, alergias, datos clínicos, presentación, guías mexicanas y validación por médico/farmacia.');
 return {status:'reference',messages:[],warnings,regimen:candidate,monograph:m};
}
function indications(id,population){
 const m=byId[id];if(!m||!['adult','pediatric','neonate'].includes(population))return [];
 return Array.from(new Map(m.regimens.filter(x=>x.population===population).map(r=>[r.indication,{id:r.indication,title:r.title}])).values());
}
root.KidBumPharmaMonographs=Object.freeze({records:Object.freeze(monographs),byId,check,indications,populations:opts});
})(typeof window!=='undefined'?window:globalThis);
