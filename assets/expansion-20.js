'use strict';
/* 20 separate, reference-linked clinical tools. No omitted field is interpreted as normal. */
(function(global){
const Q=(key,label,items)=>({key,label,type:'choice',options:items});
const N=(key,label,min,max,unit='',step='any')=>({key,label,type:'number',min,max,unit,step});
const Y=(key,label)=>Q(key,label,[['no','No, evaluado y ausente'],['yes','Sí, presente']]);
const S=(key,label,labels)=>Q(key,label,labels.map((x,i)=>[String(x[0]),x[1]]));
const sources={
 pecarn:'https://www.ncbi.nlm.nih.gov/books/NBK591248/table/tbl001/',
 silverman:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4922755/',
 ballard:'https://www.ncbi.nlm.nih.gov/books/NBK613281/',
 pram:'https://www.mdcalc.com/calc/3384/pediatric-respiratory-assessment-measure-pram-asthma-exacerbation-severity',
 kdigo:'https://kdigo.org/guidelines/acute-kidney-injury/',
 heart:'https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events',
 grace:'https://www.gracescore.org/website.html',
 meld:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8608337/',
 ich:'https://www.mdcalc.com/calc/1727/ich-score-intracerebral-hemorrhage',
 bisap:'https://www.mdcalc.com/calc/1798/bisap-score-pancreatitis-mortality',
 aims65:'https://www.mdcalc.com/calc/3885/aims65-score-upper-gi-bleeding-mortality',
 appendicitis:'https://www.mdcalc.com/calc/3984/appendicitis-inflammatory-response-air-score',
 westley:'https://www.mdcalc.com/calc/677/westley-croup-score',
 pews:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3753259/',
 nexus:'https://acsearch.acr.org/docs/69359/Narrative/',
 ottawa:'https://www.mdcalc.com/calc/1670/ottawa-ankle-rule',
 meows:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11622726/',
 fullpiers:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11111297/',
 at4:'https://www.the4at.com/userguide',
 frailty:'https://www.dal.ca/sites/gmr/our-tools/clinical-frailty-scale.html'
};
const T=[
{id:'pecarn',title:'PECARN · TCE pediátrico',cat:'Pediatría',image:'atlas-brain.jpg',short:'Regla de decisión por edad: menor de 2 años o ≥2 años',source:sources.pecarn,
 warning:'Solo TCE cerrado menor con evaluación fiable. GCS ≤13, trauma penetrante, signos neurológicos o inestabilidad requieren manejo urgente; no reemplaza la valoración del trauma.',
 variants:{
 infant:{label:'Menor de 2 años',fields:[Y('gcs','GCS ≤14 o alteración del estado mental'),Y('fracture','Fractura craneal palpable'),Y('hematoma','Hematoma no frontal: parietal/temporal/occipital'),Y('loc','Pérdida de conocimiento ≥5 segundos'),Y('mechanism','Mecanismo grave (incluye caída >0.9 m)'),Y('parent','No actúa normalmente según cuidadores')]},
 older:{label:'2 años o más',fields:[Y('gcs','GCS ≤14 o alteración del estado mental'),Y('fracture','Signos de fractura de base de cráneo'),Y('loc','Cualquier pérdida de conciencia'),Y('vomit','Vómitos tras el traumatismo'),Y('mechanism','Mecanismo grave (incluye caída >1.5 m)'),Y('headache','Cefalea intensa')]}
 },kind:'pecarn'},
{id:'silverman',title:'Silverman-Andersen · dificultad respiratoria neonatal',cat:'Pediatría',image:'pediatria-portada.webp',short:'Cinco componentes · 0 a 10 puntos',source:sources.silverman,warning:'La hipoxemia y la necesidad de soporte respiratorio se valoran de forma independiente. Si existe compromiso vital, la atención no debe esperar la puntuación.',
fields:[
S('chest','Movimientos toracoabdominales',[[0,'Sincronizados'],[1,'Tórax inmóvil, abdomen se mueve'],[2,'Disociación toracoabdominal/paradójicos']]),
S('intercostal','Tiraje intercostal',[[0,'Ausente'],[1,'Discreto'],[2,'Marcado']]),
S('xiphoid','Retracción xifoidea',[[0,'Ausente'],[1,'Discreta'],[2,'Acentuada']]),
S('nasal','Aleteo nasal',[[0,'Ausente'],[1,'Discreto'],[2,'Acentuado']]),
S('grunt','Quejido espiratorio',[[0,'Ausente'],[1,'Solo audible con estetoscopio'],[2,'Audible a distancia']])
],kind:'sum',cutoffs:[[0,'Sin signos clínicos en esta escala'],[3,'Dificultad respiratoria leve'],[5,'Dificultad respiratoria moderada'],[10,'Dificultad respiratoria grave']]},
{id:'ballard',title:'Ballard modificado · edad gestacional',cat:'Pediatría',image:'pediatria-portada.webp',short:'12 criterios · suma y conversión a semanas',source:sources.ballard,warning:'Escribe exclusivamente puntuaciones asignadas mediante la TABLA OFICIAL; esta calculadora no presume madurez por el número aislado. El examen requiere entrenamiento; confirmar con datación obstétrica.',
fields:['Postura','Ventana cuadrada','Retroceso de brazo','Ángulo poplíteo','Signo de la bufanda','Talón-oreja','Piel','Lanugo','Superficie plantar','Mama','Ojo/oreja','Genitales'].map((name,i)=>N('b'+i,name,-2,5,'puntos',1)),
kind:'ballard'},
{id:'pram',title:'PRAM · asma pediátrica',cat:'Pediatría',image:'atlas-lungs.jpg',short:'Cinco observaciones · gravedad de crisis asmática',source:sources.pram,warning:'Aplicar a exacerbación asmática; saturación y auscultación deben medirse directamente. Tórax silencioso, agotamiento, hipoxemia o alteración de conciencia exigen atención inmediata.',
fields:[
S('sat','SatO₂',[[0,'≥95%'],[1,'92–94%'],[2,'<92%']]),
S('supra','Tiraje supraesternal',[[0,'No'],[2,'Sí']]),
S('scalene','Contracción de escalenos',[[0,'No'],[2,'Sí']]),
S('air','Entrada de aire',[[0,'Normal'],[1,'Disminuida en bases'],[2,'Disminuida en vértices y bases'],[3,'Mínima/ausente']]),
S('wheeze','Sibilancias',[[0,'Ausentes'],[1,'Solo espiratorias'],[2,'Inspiratorias ± espiratorias'],[3,'Audibles sin estetoscopio o tórax silencioso']])
],kind:'sum',cutoffs:[[3,'Exacerbación leve'],[7,'Exacerbación moderada'],[12,'Exacerbación grave']]},
{id:'kdigo',title:'KDIGO · lesión renal aguda',cat:'Función renal',image:'atlas-kidney.jpg',short:'Estadificación por creatinina y diuresis',source:sources.kdigo,warning:'Exige relación temporal correcta: cambio ≥0.3 mg/dL en ≤48 h o 1.5 veces basal en ≤7 días; considerar causas, sobrecarga, diálisis y contexto. El descenso de diuresis puede ser el primer signo.',
fields:[N('baseline','Creatinina basal conocida',0.05,30,'mg/dL'),N('current','Creatinina actual',0.05,30,'mg/dL'),Y('delta48','¿Aumento ≥0.3 mg/dL confirmado en ≤48 horas?'),Y('within7','¿Valor actual ≤7 días del basal confiable?'),
S('urine','Diuresis medida',[[0,'≥0.5 mL/kg/h o no evaluada (no descarta LRA)'],[1,'<0.5 mL/kg/h durante 6–11 horas'],[2,'<0.5 mL/kg/h durante 12–23 horas'],[3,'<0.3 mL/kg/h ≥24 h o anuria ≥12 h']]),
Y('rrt','¿Inició terapia de reemplazo renal por LRA?')],
kind:'kdigo'},
{id:'heart',title:'HEART · dolor torácico',cat:'Cardiología',image:'cardiologia-portada.jpg',short:'Historia, ECG, edad, riesgos y troponina',source:sources.heart,warning:'Requiere ECG y troponina interpretados según ensayo y evolución; no aplicable a STEMI evidente ni a pacientes inestables. Un resultado bajo no garantiza el alta.',
fields:[
S('history','Historia clínica',[[0,'Poco sugestiva'],[1,'Moderadamente sugestiva'],[2,'Altamente sugestiva']]),
S('ecg','ECG',[[0,'Normal'],[1,'Alteraciones inespecíficas de repolarización'],[2,'Descenso significativo de ST']]),
S('age','Edad',[[0,'<45 años'],[1,'45–64 años'],[2,'≥65 años']]),
S('risk','Factores de riesgo',[[0,'Ninguno conocido'],[1,'1–2 factores'],[2,'≥3 factores o aterosclerosis documentada']]),
S('trop','Troponina respecto al límite superior normal',[[0,'≤1× LSN'],[1,'>1–3× LSN'],[2,'>3× LSN']])
],kind:'sum',cutoffs:[[3,'Categoría de riesgo baja'],[6,'Categoría de riesgo intermedia'],[10,'Categoría de riesgo alta']]},
{id:'grace',title:'GRACE 2.0 · síndrome coronario agudo',cat:'Cardiología',image:'cardiologia-portada.jpg',short:'Asistente de variables · cálculo oficial enlazado',source:sources.grace,official:'https://www.gracescore.org/website.html',warning:'El GRACE 2.0 oficial utiliza relaciones NO LINEALES para estimar probabilidades; no se fabrican coeficientes ni porcentajes. Obtén el riesgo definitivo en el sitio original.',
fields:[N('age','Edad',18,110,'años'),N('heart','Frecuencia cardíaca',25,250,'lpm'),N('sbp','Presión sistólica',50,260,'mmHg'),N('creat','Creatinina',0.1,20,'mg/dL'),
S('killip','Clase Killip',[[1,'I'],[2,'II'],[3,'III'],[4,'IV']]),Y('st','Desviación del segmento ST'),Y('arrest','Paro cardíaco al ingreso'),Y('trop','Biomarcadores cardíacos elevados')],
kind:'reference'},
{id:'meld',title:'MELD 3.0 · función hepática',cat:'Hepatología',image:'atlas-liver.jpg',short:'Ecuación MELD 3.0 con sodio y albúmina',source:sources.meld,warning:'Fórmula MELD 3.0 publicada para adultos con enfermedad hepática avanzada. No extrapolar a población pediátrica; un puntaje no representa mortalidad personal exacta ni asignación automática de trasplante. Validar política de trasplante local.',
fields:[S('female','Sexo empleado en ecuación original',[[0,'Masculino'],[1,'Femenino']]),N('bilirubin','Bilirrubina total',0.01,60,'mg/dL'),N('inr','INR',0.5,20,''),N('cr','Creatinina',0.01,20,'mg/dL'),N('na','Sodio sérico',90,180,'mmol/L'),N('albumin','Albúmina',0.5,6,'g/dL'),Y('dialysis','Diálisis ≥2 veces en semana previa o diálisis continua durante 24 h')],
kind:'meld'},
{id:'ich',title:'ICH Score · hemorragia intracerebral',cat:'Neurología y Raquimedular',image:'atlas-brain.jpg',short:'Estratificación pronóstica de hemorragia intraparenquimatosa',source:sources.ich,warning:'No usar puntajes pronósticos como justificación exclusiva de limitación del tratamiento. No sustituye estabilización, neuroimagen ni atención neurocrítica.',
fields:[S('gcs','Glasgow',[[0,'GCS 13–15'],[1,'GCS 5–12'],[2,'GCS 3–4']]),Y('age','Edad ≥80 años'),Y('volume','Volumen hemorrágico ≥30 mL'),Y('ventricle','Extensión intraventricular'),Y('infratentorial','Localización infratentorial')],
kind:'ich'},
{id:'bisap',title:'BISAP · pancreatitis aguda',cat:'Gastroenterología',image:'gastroenterologia-portada.webp',short:'Cinco criterios dentro de las primeras 24 horas',source:sources.bisap,warning:'El puntaje estima riesgo poblacional de complicaciones/mortalidad, no sustituye valoración de fallo orgánico ni reevaluación; se obtiene en primeras 24 h de ingreso.',
fields:[Y('bun','BUN >25 mg/dL'),Y('mental','Alteración de estado mental'),Y('sirs','≥2 criterios SIRS'),Y('age','Edad >60 años'),Y('effusion','Derrame pleural en imagen')],
kind:'sum',cutoffs:[[2,'Menor riesgo relativo'],[5,'Mayor riesgo relativo (≥3 criterios)']]},
{id:'aims65',title:'AIMS65 · hemorragia digestiva alta',cat:'Gastroenterología',image:'gastroenterologia-portada.webp',short:'Pronóstico en sangrado digestivo alto',source:sources.aims65,warning:'Un AIMS65 bajo no descarta sangrado grave. Valorar reanimación, hemodinamia, GBS y oportunidad de endoscopia según protocolos.',
fields:[Y('alb','Albúmina <3 g/dL'),Y('inr','INR >1.5'),Y('mental','Alteración del estado mental'),Y('sbp','Presión sistólica ≤90 mmHg'),Y('age','Edad ≥65 años')],
kind:'sum',cutoffs:[[1,'Riesgo pronóstico relativamente menor'],[5,'Mayor riesgo pronóstico (≥2)']]},
{id:'appendicitis',title:'AIR / Alvarado · apendicitis',cat:'Urgencias y Terapia Intensiva',image:'gastroenterologia-portada.webp',short:'Dos escalas independientes para sospecha de apendicitis',source:sources.appendicitis,warning:'No descartan apendicitis por sí solas; correlacionar con exploración, evolución, imagen, edad y embarazo. Peritonitis o choque requieren evaluación urgente.',
variants:{
 alvarado:{label:'Alvarado clásico',fields:[S('migration','Migración a fosa ilíaca derecha',[[0,'No'],[1,'Sí']]),S('anorexia','Anorexia',[[0,'No'],[1,'Sí']]),S('nausea','Náusea o vómito',[[0,'No'],[1,'Sí']]),S('tender','Dolor a palpación de FID',[[0,'No'],[2,'Sí']]),S('rebound','Rebote peritoneal',[[0,'No'],[1,'Sí']]),S('fever','Temperatura elevada',[[0,'No'],[1,'Sí']]),S('wbc','Leucocitosis',[[0,'No'],[2,'Sí']]),S('left','Desviación a izquierda',[[0,'No'],[1,'Sí']])],cutoffs:[[4,'Probabilidad menor, reevaluar'],[6,'Sospecha intermedia'],[10,'Sospecha elevada']]},
 air:{label:'AIR Score',fields:[S('vomit','Vómitos',[[0,'No'],[1,'Sí']]),S('pain','Dolor FID',[[0,'No'],[1,'Sí']]),S('rebound','Defensa o rebote',[[0,'Ninguno'],[1,'Leve'],[2,'Moderado'],[3,'Intenso']]),S('fever','Temperatura ≥38.5 °C',[[0,'No'],[1,'Sí']]),S('pmn','Neutrófilos',[[0,'<70%'],[1,'70–84%'],[2,'≥85%']]),S('wbc','Leucocitos ×10⁹/L',[[0,'<10'],[1,'10–14.9'],[2,'≥15']]),S('crp','Proteína C reactiva',[[0,'<10 mg/L'],[1,'10–49 mg/L'],[2,'≥50 mg/L']])],cutoffs:[[4,'Riesgo bajo'],[8,'Riesgo intermedio'],[12,'Riesgo alto']]}
},kind:'sum'},
{id:'westley',title:'Westley · crup pediátrico',cat:'Pediatría',image:'atlas-lungs.jpg',short:'Gravedad clínica de crup · 0–17 puntos',source:sources.westley,warning:'Estridor en reposo, cianosis, fatiga o alteración de conciencia indican posible compromiso de vía aérea: no retrasar atención por la puntuación.',
fields:[S('stridor','Estridor',[[0,'Ausente'],[1,'Solo agitación'],[2,'En reposo']]),S('retractions','Retracciones',[[0,'Ausentes'],[1,'Leves'],[2,'Moderadas'],[3,'Graves']]),S('air','Entrada de aire',[[0,'Normal'],[1,'Reducida'],[2,'Muy reducida']]),S('cyanosis','Cianosis',[[0,'Ausente'],[4,'Durante agitación'],[5,'En reposo']]),S('mental','Estado mental',[[0,'Normal'],[5,'Alterado']])],
kind:'sum',cutoffs:[[2,'Crup leve'],[5,'Crup moderado'],[11,'Crup grave'],[17,'Insuficiencia respiratoria inminente posible']]},
{id:'pews',title:'PEWS · Brighton/Monaghan',cat:'Pediatría',image:'pediatria-portada.webp',short:'3 dominios clínicos + disparadores adicionales',source:sources.pews,warning:'No existe un PEWS universal: se usa estructura Brighton/Monaghan y se deben seguir las tablas de edad y el protocolo del hospital. Los grados clínicos deben ser asignados con una ficha oficial; no inferir por signos aislados.',
fields:[S('behavior','Dominio conducta/neurológico (evaluado con tabla de Brighton)',[[0,'0 puntos'],[1,'1 punto'],[2,'2 puntos'],[3,'3 puntos']]),S('cv','Dominio cardiovascular (FC/llenado capilar/color para edad)',[[0,'0 puntos'],[1,'1 punto'],[2,'2 puntos'],[3,'3 puntos']]),S('resp','Dominio respiratorio (FR/esfuerzo/O₂ para edad)',[[0,'0 puntos'],[1,'1 punto'],[2,'2 puntos'],[3,'3 puntos']]),S('nebs','Nebulizaciones cada 15 min o CPAP según versión local',[[0,'No'],[2,'Sí (+2)']]),S('vomiting','Vómito posoperatorio persistente',[[0,'No'],[2,'Sí (+2)']])],
kind:'sum',cutoffs:[[2,'Sin umbral ≥3; requiere juicio clínico'],[13,'Alerta PEWS ≥3: aplicar escalamiento institucional']]},
{id:'nexus',title:'NEXUS · columna cervical',cat:'Urgencias y Terapia Intensiva',image:'neurologia-portada.jpg',short:'Cinco criterios de exclusión de imagen tras trauma',source:sources.nexus,warning:'Para traumatismo cervical cerrado en paciente valorable. No usar si paciente no evaluable, con inestabilidad, lesiones penetrantes u otras exclusiones; seguir criterios institucionales y proteger columna.',
fields:[Y('midline','Dolor a palpación de línea media cervical'),Y('neuro','Déficit neurológico focal'),Y('alert','Estado de alerta anormal'),Y('intox','Datos de intoxicación'),Y('distract','Lesión dolorosa distractora')],kind:'nexus'},
{id:'ottawa',title:'Ottawa · tobillo y mediopié',cat:'Urgencias y Terapia Intensiva',image:'antropometria-portada.jpg',short:'Regla de indicación de radiografía de tobillo/pie',source:sources.ottawa,warning:'Aplicar a traumatismo agudo de tobillo/pie en pacientes elegibles. Menores pequeños, neuropatía, intoxicación, politrauma, deformidad evidente o valoración poco fiable exigen criterio independiente.',
variants:{
 ankle:{label:'Zona maleolar',fields:[Y('pain','Dolor en zona maleolar'),Y('lat','Dolor óseo en borde posterior de 6 cm o punta de maléolo lateral'),Y('med','Dolor óseo en borde posterior de 6 cm o punta de maléolo medial'),Y('steps','Incapacidad de dar 4 pasos tras lesión y en urgencias')]},
 foot:{label:'Mediopié',fields:[Y('pain','Dolor en mediopié'),Y('nav','Dolor óseo sobre navicular'),Y('fifth','Dolor óseo en base de quinto metatarsiano'),Y('steps','Incapacidad de dar 4 pasos tras lesión y en urgencias')]}
},kind:'ottawa'},
{id:'meows',title:'MEOWS · alerta obstétrica',cat:'Ginecología y obstetricia',image:'atlas-obstetrics.jpg',short:'Semáforo obstétrico explícito: señales rojas/amarillas',source:sources.meows,warning:'Los umbrales varían por adaptación local; versión informativa basada en tabla publicada de MEOWS. Una alerta roja o dos amarillas requieren valoración/escalamiento, aun sin suma total.',
fields:[N('temp','Temperatura',30,43,'°C'),N('sbp','Presión sistólica',40,260,'mmHg'),N('dbp','Presión diastólica',20,170,'mmHg'),N('hr','Frecuencia cardíaca',20,240,'lpm'),N('rr','Frecuencia respiratoria',4,65,'rpm'),Y('neuro','Alteración del estado mental'),Y('bleed','Sangrado obstétrico anormal')],
kind:'meows'},
{id:'fullpiers',title:'fullPIERS · preeclampsia',cat:'Ginecología y obstetricia',image:'ginecologia-portada.webp',short:'Reúne seis predictores; riesgo oficial externo',source:sources.fullpiers,official:'https://pre-empt.obgyn.ubc.ca/home-page/past-projects/fullPIERS/',warning:'La probabilidad a 48 h depende de un modelo de regresión validado con interacciones no disponibles aquí: NO estimar porcentajes inventados. Preeclampsia con datos graves exige valoración obstétrica urgente sin esperar cálculo.',
fields:[N('ga','Semanas gestacionales',20,44,'semanas'),N('spo2','Saturación de oxígeno',50,100,'%'),N('platelet','Plaquetas',1,1000,'×10⁹/L'),N('creatinine','Creatinina',0.1,15,'mg/dL'),N('ast','AST',1,3000,'U/L'),Y('chest','Dolor torácico o disnea')],
kind:'reference'},
{id:'at4',title:'4AT · tamizaje de delirium',cat:'Geriatría',image:'escalas-clinicas-portada.webp',short:'4 dominios, puntuación 0 a 12',source:sources.at4,warning:'Tamizaje, no diagnóstico de delirium. La sospecha clínica debe motivar evaluación de causas reversibles y comparación con estado basal.',
fields:[S('alert','Nivel de alerta',[[0,'Normal, incluido somnolencia breve al despertar'],[4,'Claramente anormal (agitación o somnolencia marcada)']]),S('amt4','AMT4: edad, fecha de nacimiento, lugar, año',[[0,'Ningún error'],[1,'1 error'],[2,'≥2 errores o no evaluable']]),S('attention','Atención: meses del año en orden inverso',[[0,'≥7 meses correctos'],[1,'Inicia pero <7 meses correctos / rechaza'],[2,'No evaluable por somnolencia u otra imposibilidad']]),S('acute','Cambio agudo o fluctuación últimas 2 semanas y últimas 24 h',[[0,'No'],[4,'Sí']])],
kind:'sum',cutoffs:[[0,'Tamizaje negativo, no descarta delirium'],[3,'Posible deterioro cognitivo'],[12,'Tamizaje positivo de posible delirium (≥4)']]},
{id:'frailty',title:'Clinical Frailty Scale · evaluación guiada',cat:'Geriatría',image:'antropometria-portada.jpg',short:'Registro de clasificación profesional 1–9 · guía oficial',source:sources.frailty,official:sources.frailty,warning:'© Dalhousie University. No se reproduce su tabla o pictogramas sin autorización. La clasificación se realiza con la guía oficial y juicio clínico sobre funcionamiento basal, no por enfermedad aguda aislada.',
fields:[S('cfs','Nivel CFS asignado mediante material oficial',[[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'5'],[6,'6'],[7,'7'],[8,'8'],[9,'9']])],kind:'frailty'}
];
function active(def,variant){return def.variants?(def.variants[variant]||Object.values(def.variants)[0]):def}
function evaluate(def,values,variant){
 const model=active(def,variant),fields=model.fields||[];
 if(!fields.every(f=>values[f.key]!==''&&values[f.key]!==undefined&&values[f.key]!==null))return null;
 for(const f of fields){const val=values[f.key];if(f.type==='choice'){if(!f.options.some(x=>String(x[0])===String(val)))return null}else{const n=Number(val);if(!Number.isFinite(n)||n<f.min||n>f.max||f.step===1&&!Number.isInteger(n))return null}}
 const num=k=>Number(values[k]), yes=k=>values[k]==='yes', get=k=>values[k];
 const out=(display,interpretation,details='')=>({display:String(display),interpretation,details});
 if(def.kind==='reference')return out('Datos clínicos completos · cálculo oficial pendiente','NO se generó probabilidad de riesgo. Abra la calculadora original validada; esta pantalla no sustituye el resultado oficial.','Se recopilaron '+fields.length+' variables.');
 if(def.kind==='frailty'){const n=num('cfs');return out('CFS '+n+'/9','Nivel consignado por profesional con referencia externa. No sustituye puntuación mediante guía autorizada.');}
 if(def.kind==='ballard'){const pts=fields.reduce((a,f)=>a+num(f.key),0);if(pts < -10||pts>50)return out('Puntuación fuera de rango','Verifica puntajes con la tabla oficial; total válido aproximado -10 a 50.');const weeks=24+pts*0.4;return out(weeks.toFixed(1)+' semanas','Madurez gestacional estimada mediante conversión Ballard, condicionada a la asignación correcta de los 12 criterios.','Total = '+pts+' puntos; semanas = 24 + 0.4 × total.');}
 if(def.kind==='meld'){let b=Math.max(1,num('bilirubin')),cr=Math.max(1,Math.min(3,num('cr'))),inr=Math.max(1,num('inr')),na=Math.max(125,Math.min(137,num('na'))),alb=Math.max(1.5,Math.min(3.5,num('albumin')));if(yes('dialysis'))cr=3;const ln=Math.log;let score=1.33*num('female')+4.56*ln(b)+0.82*(137-na)-0.24*(137-na)*ln(b)+9.09*ln(inr)+11.14*ln(cr)+1.85*(3.5-alb)-1.83*(3.5-alb)*ln(cr)+6;const total=Math.max(6,Math.min(40,Math.round(score)));return out(total+' puntos','MELD 3.0, puntaje pronóstico relativo; no traduce mortalidad individual ni prioridad asignada en México.','Variables restringidas por fórmula: bilirrubina/INR ≥1, creatinina 1–3 (diálisis=3), sodio 125–137, albúmina 1.5–3.5.');}
 if(def.kind==='pecarn'){const hi=yes('gcs')||yes('fracture');const intermediates=fields.some(f=>!['gcs','fracture'].includes(f.key)&&yes(f.key));return hi?out('Criterios de alto riesgo','Valorar neuroimagen y atención urgente de acuerdo al estado clínico.'):intermediates?out('Riesgo intermedio','Observación supervisada versus TAC según factores, evolución y evaluación clínica.'):out('Muy bajo riesgo por PECARN','En paciente elegible y estable, la TC de rutina generalmente no se recomienda; entregar signos de alarma.');}
 if(def.kind==='kdigo'){
 const baseline=num('baseline'),current=num('current'),ratio=current/baseline;let stage=0;
 if(yes('rrt')||num('urine')===3||(get('within7')==='yes'&&(ratio>=3||current>=4&&current-baseline>=0.3)))stage=3;
 else if(num('urine')===2||(get('within7')==='yes'&&ratio>=2))stage=2;
 else if(num('urine')===1||yes('delta48')||(get('within7')==='yes'&&ratio>=1.5))stage=1;
 return stage?out('KDIGO: estadio '+stage,'Criterio de lesión renal aguda documentado; evaluar causas, gravedad y necesidad de valoración especializada.','Relación creatinina actual/basal '+ratio.toFixed(2)+'×; estadio máximo por datos documentados.'):out('Sin criterios positivos documentados','NO descarta LRA: la diuresis puede no estar medida y la temporalidad o valores basales pueden ser inciertos.','Relación creatinina '+ratio.toFixed(2)+'×.');
 }
 if(def.kind==='ich'){let total=num('gcs')+['age','volume','ventricle','infratentorial'].reduce((x,k)=>x+(yes(k)?1:0),0);return out(total+'/6 puntos',total>=3?'ICH Score elevado, se requiere evaluación neurocrítica integrada.':'Puntaje pronóstico; no usar para limitar atención.');}
 if(def.kind==='nexus'){const present=fields.filter(f=>yes(f.key)).map(f=>f.label);return present.length?out('NEXUS positivo / no aclara columna cervical','No utilizar la regla para omitir imagen; considerar evaluación y estudios según protocolo.',present.join('; ')):out('Cinco criterios NEXUS ausentes','Regla de bajo riesgo solo en paciente plenamente evaluable y población válida; la decisión final es clínica.');}
 if(def.kind==='ottawa'){const region=variant==='foot'?'pie':'tobillo';const positive=yes('pain')&&(yes('steps')||(variant==='foot'?yes('nav')||yes('fifth'):yes('med')||yes('lat')));return positive?out('Regla de Ottawa positiva','Apoya solicitar imagen de '+region+' en paciente elegible.'):out('Regla de Ottawa negativa','En paciente elegible puede apoyar evitar imagen; lesiones fuera del dominio y excepciones requieren juicio clínico.');}
 if(def.kind==='meows'){
 let red=[],yellow=[];const r=(key,high,low)=>{let v=num(key);if((low!==null&&v<low)||(high!==null&&v>high))red.push(key)};
 r('temp',38,35);r('sbp',160,90);r('dbp',100,null);r('hr',120,40);r('rr',30,10);
 if(yes('neuro'))red.push('neuro');if(yes('bleed'))red.push('bleed');
 const w=(key,a,b)=>{const v=num(key);if(v>=a&&v<=b)yellow.push(key)};
 w('temp',35,36);w('sbp',150,160);w('sbp',90,100);w('dbp',90,100);w('hr',100,120);w('hr',40,50);w('rr',21,30);
 const yellowUnique=[...new Set(yellow.filter(k=>!red.includes(k)))];
 const alarm=red.length?'Alerta roja':yellowUnique.length>=2?'≥2 alertas amarillas':'Sin disparadores MEOWS de esta variante';
 return out(alarm,red.length||yellowUnique.length>=2?'Evaluación materna prioritaria según protocolo institucional.':'Aun sin disparadores, investigar síntomas preocupantes.',red.length+' rojas ('+red.join(', ')+'); '+yellowUnique.length+' amarillas ('+yellowUnique.join(', ')+').');
 }
 if(def.kind==='sum'){const total=fields.reduce((s,f)=>s+(f.type==='choice'&&f.options.some(x=>x[0]==='yes')?(yes(f.key)?1:0):num(f.key)),0);const cutoff=model.cutoffs||def.cutoffs||[];const label=(cutoff.find(([max])=>total<=max)||cutoff[cutoff.length-1]||[0,'Puntuación obtenida'])[1];return out(total+' puntos',label,'Puntaje bruto validado a partir de '+fields.length+' componentes.');}
 throw Error('Implementación clínica no disponible');
}
global.KidBum20=Object.freeze({tools:T,active,evaluate,sources});
})(window);
