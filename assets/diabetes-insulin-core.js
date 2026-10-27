(function(root){
'use strict';
/* KidBum Diabetes & Insulin Pro 0.10.28.
 * Adult-only, local, deterministic decision support; never generates an insulin order.
 * Engines already available in index: osm, correctedna, anion, egfr and others.
 */
const ADA26='https://doi.org/10.2337/dc26-s016';
const ADA6='https://doi.org/10.2337/dc26-s006';
const CRISES='https://doi.org/10.2337/dci24-0032';
const PRONAM='https://sidof.segob.gob.mx/notas/docFuente/5761885';
const opts=(...x)=>x.map(a=>[a[0],a[1]]);
const yes=opts(['yes','Sí, confirmado'],['no','No, confirmado'],['unknown','No documentado']);
const field=(key,label,type,extra={})=>({key,label,type,...extra});
const n=(key,label,min,max,unit,optional=false)=>field(key,label,'number',{min,max,unit,optional});
const c=(key,label,options,optional=false)=>field(key,label,'choice',{options,optional});
const t=(key,label,hint)=>field(key,label,'text',{hint});
const specs=[
 {id:'insulin-safety',title:'Insulin Safety Check',area:'hospital',tag:'SEGURIDAD',intro:'Auditoría de un esquema indicado: no prescribe, calcula ni valida dosis terapéuticas.',source:ADA26,
  fields:[c('adult','Población adulta',opts(['yes','Adulto ≥18 años'],['no','Pediatría / no confirmado'])),
   c('type','Tipo de diabetes',opts(['t1','Tipo 1'],['t2','Tipo 2'],['other','Otro / incierto'])),
   c('setting','Entorno',opts(['ward','Hospitalización'],['outpatient','Consulta externa'])),
   c('food','Estado nutricional',opts(['eating','Ingesta oral'],['npo','Ayuno'],['enteral','Nutrición enteral/parenteral'],['unknown','Incierto'])),
   c('basal','¿Existe cobertura basal documentada? (SC, bomba o IV según caso)',yes),
   c('prandial','¿Existe insulina prandial programada?',yes),
   c('correction','¿Existe insulina de corrección?',yes),
   c('kind','Formulación que se revisa',opts(['rapid','Análogo rápido'],['regular','Regular U-100'],['nph','NPH U-100'],['basal','Análogo basal'],['premix','Premezcla'],['u500','Regular U-500'],['other','Otra / incierta'])),
   c('concentration','Concentración declarada',opts(['u100','U-100'],['u200','U-200'],['u300','U-300'],['u500','U-500'],['unknown','No identificada'])),
   c('device','Dispositivo',opts(['pen','Pluma específica'],['syringe','Jeringa'],['pump','Bomba'],['unknown','No verificado'])),
   c('route','Vía indicada',opts(['sc','Subcutánea'],['iv','Intravenosa'],['other','Otra / no verificada'])),
   n('dose','Dosis prescrita por administración (sin conversión a mL)',0.01,1000,'unidades',true),
   c('volume','¿Se pretende convertir unidades a mL manualmente?',yes)],
  example:{adult:'yes',type:'t1',setting:'ward',food:'npo',basal:'no',prandial:'no',correction:'yes',kind:'rapid',concentration:'u100',device:'pen',route:'sc',dose:'6',volume:'no'}},
 {id:'hospital-glucose',title:'Hospital Glucose Monitor',area:'hospital',tag:'MONITORIZACIÓN',intro:'Análisis de mediciones con hora comprobada; no infiere causalidad ni modifica insulina.',source:ADA26,
  fields:[c('adult','Adulto hospitalizado',opts(['yes','Sí'],['no','No / no confirmado'])),
   c('ward','Ámbito',opts(['noncritical','Hospitalización no crítica'],['icu','UCI / paciente crítico'])),
   c('units','Unidad de todas las lecturas',opts(['mgdl','mg/dL'])),
   t('readings','Glucometrías (HH:MM=mg/dL, separadas por ;)', 'Ejemplo 06:00=165; 12:00=225; 18:00=175; 22:00=95')],
  example:{adult:'yes',ward:'noncritical',units:'mgdl',readings:'06:00=168; 10:00=224; 14:00=257; 18:00=211; 22:00=65'}},
 {id:'hypoglycemia',title:'Hypoglycemia Assist',area:'urgencias',tag:'URGENCIAS',intro:'Clasificación ADA y detección de situación que requiere atención inmediata.',source:ADA6,
  fields:[c('adult','Adulto (≥18 años)',opts(['yes','Sí'],['no','No / no confirmado'])),
   n('glucose','Glucosa medida',10,1000,'mg/dL'),
   c('help','¿Requiere ayuda de otra persona por alteración física/cognitiva?',yes),
   c('conscious','Estado de conciencia',opts(['normal','Alerta'],['altered','Alteración de conciencia'],['unknown','No evaluado'])),
   c('swallow','¿Puede tragar de forma segura?',yes)],
  example:{adult:'yes',glucose:'48',help:'no',conscious:'normal',swallow:'yes'}},
 {id:'dka-hhs',title:'DKA / HHS Assist',area:'urgencias',tag:'CRISIS HIPERGLUCÉMICAS',intro:'Evalúa criterios del consenso 2024 y usa los motores KidBum existentes sin duplicar ecuaciones.',source:CRISES,
  fields:[c('adult','Adulto, no embarazada',opts(['yes','Confirmado'],['no','No / incierto'])),
   c('diabetes','Antecedente de diabetes documentado',opts(['yes','Sí'],['no','No'],['unknown','No establecido'])),
   n('glucose','Glucosa',20,2000,'mg/dL'),n('bohb','β-hidroxibutirato',0,15,'mmol/L'),
   n('ph','pH sanguíneo (arterial o venoso)',6.7,7.8,''),n('bicarb','Bicarbonato',1,55,'mmol/L'),
   n('na','Na medido (muestra temporalmente comparable)',80,200,'mmol/L'),
   n('potassium','Potasio',1.5,9,'mmol/L'),
   n('bun','BUN (no es urea)',0,250,'mg/dL',true),
   c('sample','Datos verificados y temporalmente comparables',opts(['yes','Sí'],['no','No / incierto']))],
  example:{adult:'yes',diabetes:'yes',glucose:'320',bohb:'5.2',ph:'7.21',bicarb:'12',na:'133',potassium:'3.2',bun:'22',sample:'yes'}},
 {id:'dm2-navigator',title:'DM2 Treatment Navigator',area:'consulta',tag:'CONSULTA EXTERNA',intro:'Marco para revisión del tratamiento de DM2; nunca selecciona automáticamente medicamentos ni dosis.',source:PRONAM,
  fields:[c('adult','Adulto no embarazado',opts(['yes','Sí'],['no','No / incierto'])),
   c('type','Diagnóstico confirmado',opts(['t2','DM2'],['t1','DM1'],['unknown','Otro / incierto'])),
   n('a1c','HbA1c reciente',3,18,'%',true),n('glucose','Glucosa actual',30,1000,'mg/dL',true),
   c('symptoms','¿Síntomas de hiperglucemia o catabolismo?',yes),
   c('hf','¿Insuficiencia cardiaca diagnosticada?',yes),
   c('ckd','¿Enfermedad renal crónica diagnosticada?',yes),
   c('cvd','¿Enfermedad cardiovascular aterosclerótica?',yes),
   c('risk','¿Alto riesgo de hipoglucemia?',yes),
   c('insulin','¿Ya recibe insulina?',yes)],
  example:{adult:'yes',type:'t2',a1c:'9.1',glucose:'235',symptoms:'no',hf:'yes',ckd:'no',cvd:'no',risk:'yes',insulin:'no'}},
 {id:'cgm-intelligence',title:'CGM Intelligence',area:'consulta',tag:'DATOS CGM',intro:'Análisis local de CSV de sensor. Datos suficientes y cobertura temporal se muestran explícitamente; sin sincronización externa.',source:ADA6,
  fields:[c('adult','Adulto no embarazado',opts(['yes','Sí'],['no','No / incierto'])),
   t('csv','CSV: ISO8601 con zona horaria,glucosa mg/dL', 'Una fila por muestra. Ejemplo: 2026-10-01T12:00:00Z,120')],
  example:{adult:'yes',csv:'2026-10-01T12:00:00Z,120\n2026-10-01T12:05:00Z,148\n2026-10-01T12:10:00Z,185\n2026-10-01T12:15:00Z,68\n2026-10-01T12:20:00Z,115'}}
];
const byId=Object.fromEntries(specs.map(x=>[x.id,x]));
function number(raw,f){
 if(raw===undefined||raw===null||String(raw).trim()==='')return f.optional?null:NaN;
 const str=String(raw).trim().replace(',','.');
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(str))return NaN;
 const x=Number(str);return Number.isFinite(x)&&x>=f.min&&x<=f.max?x:NaN;
}
function fail(messages){return {ready:false,status:'pending',headline:'No evaluable',details:[],warnings:messages,critical:[]};}
function result(headline,details=[],warnings=[],critical=[],metrics={}){return {ready:true,status:critical.length?'critical':warnings.length?'review':'informative',headline,details,warnings,critical,metrics};}
function validate(id,raw){
 const spec=byId[id];if(!spec||!raw)return null;
 const v={},errors=[];
 for(const f of spec.fields){
  if(f.type==='number'){v[f.key]=number(raw[f.key],f);if(Number.isNaN(v[f.key]))errors.push(f.label+': falta o no cumple el intervalo esperado.');}
  else if(f.type==='choice'){v[f.key]=raw[f.key];if(!f.options.some(o=>o[0]===v[f.key]))errors.push(f.label+': selección obligatoria.');}
  else {v[f.key]=String(raw[f.key]||'').trim();if(!v[f.key])errors.push(f.label+': falta información.');if(v[f.key].length>500000)errors.push(f.label+': supera el tamaño permitido.');}
 }
 return {v,errors};
}
function safety(x){
 if(x.adult!=='yes')return fail(['Solo adultos; población pediátrica fuera del alcance.']);
 const critical=[],warnings=[],details=['Contexto: '+(x.setting==='ward'?'hospital': 'consulta')+' · vía declarada: '+x.route.toUpperCase()+'.'];
 if(x.type==='t1'&&x.basal!=='yes')critical.push('DM1 sin cobertura basal confirmada: riesgo de cetosis/CAD; revisión médica inmediata incluso en ayuno.');
 if(x.type==='t1'&&x.correction==='yes'&&x.basal==='no')critical.push('Insulina de corrección como único componente sin basal en DM1: esquema incompatible con recomendaciones hospitalarias.');
 if(x.concentration==='unknown'||x.kind==='other'||x.device==='unknown')warnings.push('Identidad, concentración y dispositivo no suficientemente verificables.');
 if(x.kind==='u500'&&x.concentration!=='u500')critical.push('Regular U-500 sin concentración U-500 concordante.');
 if(x.concentration==='u500'&&x.kind!=='u500')critical.push('Concentración U-500 no concuerda con formulación seleccionada.');
 if(['u200','u300','u500'].includes(x.concentration)&&x.device==='syringe')critical.push('Insulina concentrada y jeringa: riesgo mayor de error de unidades/volumen; validar dispositivo y farmacia.');
 if(x.volume==='yes')critical.push('Se requiere conversión manual de unidades a mL: KidBum no calcula volúmenes ni valida esta administración.');
 if(x.route==='iv'&&['basal','nph','premix'].includes(x.kind))critical.push('Formulación no apropiada para vía IV; verificar vía/formulación antes de administración.');
 if(x.route==='other')critical.push('Vía no verificada: no usar la salida para administración.');
 if(x.food==='npo'&&x.prandial==='yes')warnings.push('Ayuno con insulina prandial programada: comprobar indicación, nutrición y riesgo de hipoglucemia.');
 if(x.food==='enteral')warnings.push('Nutrición artificial: debe verificarse interrupción de aporte y coordinación insulina-nutrición.');
 if(x.food==='unknown')warnings.push('Ingesta desconocida: impedir extrapolar esquema prandial.');
 if(x.setting==='ward'&&x.type==='t2'&&x.correction==='yes'&&x.basal==='no')warnings.push('Corrección aislada: revisar indicación y persistencia de hiperglucemia; no asumir que es régimen suficiente.');
 if(x.kind==='premix'&&x.setting==='ward')warnings.push('Premezclas no suelen preferirse durante hospitalización por riesgo de hipoglucemia.');
 if(x.dose!==null)details.push('Dosis DECLARADA: '+x.dose+' unidades por administración; no calculada ni aprobada.');
 if(x.type==='other')warnings.push('Tipo de diabetes incierto: confirmar antes de valorar el esquema.');
 if(!critical.length)details.push('Lista de verificación completada; NO supone validación farmacológica ni autoriza administración.');
 return result(critical.length?'REVISIÓN INMEDIATA DEL ESQUEMA':warnings.length?'Revisión clínica requerida':'Sin incompatibilidad codificada detectada',details,warnings,critical);
}
function measurements(x){
 if(x.adult!=='yes')return fail(['La herramienta corresponde a adultos hospitalizados.']);
 const lines=x.readings.split(/[;\n]+/).map(x=>x.trim()).filter(Boolean);const out=[];const errors=[];
 if(lines.length<2||lines.length>24)return fail(['Se requieren entre 2 y 24 glucometrías de un mismo día, con hora y mg/dL.']);
 for(const line of lines){
  const m=/^([01]\d|2[0-3]):([0-5]\d)\s*=\s*(\d{2,4}(?:\.\d+)?)$/.exec(line);
  if(!m){errors.push('Formato no válido: '+line.slice(0,35));continue;}
  const mins=Number(m[1])*60+Number(m[2]),g=Number(m[3]);if(g<20||g>1000)errors.push('Lectura fuera de rango instrumental esperado.');else out.push({mins,g});
 }
 if(errors.length)return fail(errors);
 if(out.some((v,i)=>i>0&&v.mins<=out[i-1].mins))return fail(['Las horas deben estar ordenadas y no repetirse dentro del mismo día.']);
 const g=out.map(v=>v.g),mean=g.reduce((a,b)=>a+b,0)/g.length,min=Math.min(...g),max=Math.max(...g);
 const lo=g.filter(v=>v<70).length,severe=g.filter(v=>v<54).length,hi=g.filter(v=>v>180).length;
 const critical=[],warnings=[],details=['Mediciones: '+g.length+' · media aritmética '+mean.toFixed(1)+' mg/dL; mínimo '+min+'; máximo '+max+'.',
  'Bajo 70: '+lo+'; bajo 54: '+severe+'; superior a 180: '+hi+'.'];
 if(severe)critical.push('Hay mediciones <54 mg/dL: hipoglucemia nivel 2; revisar atención inmediata y prevención de recurrencia.');
 else if(lo)warnings.push('Hay al menos una medición <70 mg/dL: revisar el tratamiento e implementar protocolo local.');
 if(g.filter(v=>v>=180).length>=2)warnings.push('Hiperglucemia persistente posible: confirmar intervalo, contexto y tratamiento, no modificar dosis automáticamente.');
 if(x.ward==='icu')details.push('Objetivo habitual UCI ADA 2026: 140–180 mg/dL individualizado.');
 else details.push('Objetivo habitual hospitalización no crítica ADA 2026: 100–180 mg/dL si es seguro.');
 warnings.push('Una serie aislada de un día no define un patrón causal ni permite estimar HbA1c o ajustar insulina.');
 return result('Glucemias del día analizadas',details,warnings,critical,{mean,min,max,below70:lo,below54:severe,above180:hi});
}
function hypoglycemia(x){
 if(x.adult!=='yes')return fail(['Algoritmo para adultos; no extrapolar a pediatría.']);
 const critical=[],warnings=[],details=[];
 const severe=x.help==='yes';
 const level=severe?3:x.glucose<54?2:x.glucose<70?1:0;
 details.push('Nivel ADA: '+(level?level:'sin hipoglucemia bioquímica documentada')+' · glucemia '+x.glucose+' mg/dL.');
 if(severe||x.conscious==='altered'||x.swallow==='no'){
  critical.push('Alteración funcional/consciencia o deglución insegura: solicitar atención inmediata, aplicar protocolo institucional y NO administrar carbohidratos por vía oral.');
 }else if(x.glucose<54){
  critical.push('Hipoglucemia nivel 2 (<54 mg/dL): atención inmediata y reevaluación según protocolo local.');
 }else if(x.glucose<70){
  warnings.push('Hipoglucemia nivel 1 (<70 mg/dL): aplicar protocolo local y repetir medición.');
 }
 if(x.help==='unknown'||x.conscious==='unknown'||x.swallow==='unknown')warnings.push('Evaluación incompleta de seguridad: comprobar conciencia, deglución y necesidad de ayuda.');
 if(x.glucose>=70&&severe)warnings.push('Nivel 3 depende de la necesidad de ayuda por alteración funcional, independientemente de glucemia.');
 details.push('Nivel 3 es clínico e independiente del valor numérico; niveles 1/2 se definen por umbrales de glucosa.');
 return result(level===3?'Hipoglucemia nivel 3 (criterio clínico)':level?'Hipoglucemia nivel '+level:'Sin criterio bioquímico de hipoglucemia',details,warnings,critical,{level});
}
function crises(x,engine){
 if(x.adult!=='yes')return fail(['Requiere adulto no embarazada; usar protocolo específico en otros pacientes.']);
 if(x.sample!=='yes')return fail(['Confirmar misma ventana temporal y calidad de las muestras antes de comparar criterios.']);
 if(!engine||typeof engine.calculate!=='function')return fail(['Motor KidBum no disponible; no duplicar ecuaciones.']);
 const critical=[],warnings=[],details=[];
 const d=(x.glucose>=200||x.diabetes==='yes')&&x.bohb>=3&&(x.ph<7.3||x.bicarb<18);
 const effective=2*x.na+x.glucose/18; // Diagnostic effective osm threshold only; compare with existing osm when BUN supplied.
 let total=null;
 if(x.bun!==null){
  const o=engine.calculate('osm',{na:x.na,gluc:x.glucose,bun:x.bun});
  if(o.error||!Number.isFinite(o.value))return fail(['Cálculo de osmolalidad KidBum no disponible: verificar Na, glucosa y BUN.']);
  total=o.value;
  if(Math.abs((total-x.bun/2.8)-effective)>0.001)return fail(['Incoherencia entre osmolalidad compartida y valores de entrada.']);
 }
 const h=x.glucose>=600&&(effective>300||(total!==null&&total>320))&&x.bohb<3&&x.ph>=7.3&&x.bicarb>=15;
 details.push('Criterios completos CAD: '+(d?'sí':'no')+'; criterios completos EHH: '+(h?'sí':'no')+'.');
 details.push('Osmolalidad efectiva estimada: '+effective.toFixed(1)+' mOsm/kg. '+(total===null?'Osmolalidad total pendiente: requiere BUN.':'Osmolalidad total con motor KidBum: '+total.toFixed(1)+' mOsm/kg.'));
 if(x.glucose>=100&&x.glucose<=200){
  const na=engine.calculate('correctedna',{na:x.na,gluc:x.glucose});
  if(!na.error)details.push('Na corregido orientativo (motor KidBum): '+na.value.toFixed(1)+' mmol/L.');
 }else if(x.glucose>200){
  const na=engine.calculate('correctedna',{na:x.na,gluc:x.glucose});
  if(!na.error)details.push('Na corregido orientativo (Hillier, motor KidBum): '+na.value.toFixed(1)+' mmol/L.');
 }
 if(d)critical.push('CRITERIOS COMPATIBLES CON CAD: evaluación y atención hospitalaria urgente según protocolo.');
 if(h)critical.push('CRITERIOS COMPATIBLES CON EHH: evaluación y atención hospitalaria urgente según protocolo.');
 if(x.bohb>=3&&x.glucose>=600&&effective>300)critical.push('Posible cuadro MIXTO CAD/EHH: reconocer superposición aun si EHH puro no cumple ausencia de acidosis/cetosis.');
 if(x.potassium<3.5)critical.push('K <3.5 mmol/L: riesgo grave de hipopotasemia con insulina; el consenso 2024 exige corregir K antes de administrar insulina.');
 if(x.potassium>=6)critical.push('Hiperpotasemia marcada: valorar inmediatamente ECG, riesgo arrítmico y protocolo local.');
 if(x.ph<7||x.bicarb<10)critical.push('Acidosis grave: requiere valoración de mayor nivel de atención.');
 if(!d&&!h)warnings.push('Criterios completos no demostrados con estos datos: NO excluye crisis, CAD euglucémica o diagnóstico alternativo. Revalorar clínica.');
 if(x.diabetes==='unknown'&&x.glucose<200)warnings.push('Antecedente de diabetes no confirmado: no asumir criterio de hiperglucemia/diabetes para CAD.');
 if(total===null)warnings.push('Sin BUN, la osmolalidad total no se estima; EHH solo puede evaluarse por osmolalidad efectiva.');
 warnings.push('La brecha aniónica aislada NO confirma resolución de CAD; se requiere evaluación de cetonas y acidosis.');
 warnings.push('Sin cálculos de infusión IV, reposición de potasio, fluidos ni transición de insulina.');
 return result(d&&h?'Posible crisis mixta':d?'Criterios compatibles con CAD':h?'Criterios compatibles con EHH':'Evaluación de crisis hiperglucémica',details,warnings,critical,{dka:d,hhs:h,effective,total});
}
function navigator(x){
 if(x.adult!=='yes'||x.type!=='t2')return fail(['Se requiere adulto no embarazado con DM2 confirmada; no extrapolar a DM1 o embarazo.']);
 if(x.a1c===null&&x.glucose===null)return fail(['Registrar HbA1c o glucosa documentada para evaluación contextual.']);
 const critical=[],warnings=[],details=[];
 if(x.a1c!==null)details.push('HbA1c declarada: '+x.a1c+'% (requiere valorar validez analítica).');
 if(x.glucose!==null)details.push('Glucosa declarada: '+x.glucose+' mg/dL.');
 if(x.glucose!==null&&x.glucose<70)critical.push('Hipoglucemia detectada: revisar de inmediato antes de planificar intensificación.');
 if(x.symptoms==='yes'||(x.a1c!==null&&x.a1c>10)||(x.glucose!==null&&x.glucose>=300))warnings.push('Hiperglucemia importante o síntomas: valorar necesidad de insulinoterapia y descartar crisis metabólica según clínica; no calcular dosis.');
 if(x.hf==='yes'||x.ckd==='yes'||x.cvd==='yes')warnings.push('Comorbilidad cardiorrenal/aterosclerótica: revisar terapias con beneficio demostrado, función renal, contraindicaciones y disponibilidad local; decisión individualizada.');
 if(x.risk==='yes')warnings.push('Riesgo de hipoglucemia elevado: individualizar objetivo de HbA1c y revisar fármacos que provocan hipoglucemia.');
 if(x.insulin==='yes')warnings.push('Paciente ya insulinizando: considerar patrones glucémicos, ingesta y riesgos antes de titular; no recomendar ajustes automáticos.');
 if(['unknown'].includes(x.symptoms)||['unknown'].includes(x.hf)||['unknown'].includes(x.ckd)||['unknown'].includes(x.cvd)||['unknown'].includes(x.risk))warnings.push('Existen comorbilidades o síntomas sin documentar: análisis farmacológico incompleto.');
 details.push('Revisión clínica basada en PRONAM DT2 2025 y ADA 2026. No receta ni sustituye revisión de interacciones, embarazo o TFG.');
 return result('Ruta de discusión terapéutica DM2',details,warnings,critical);
}
function cgm(x){
 if(x.adult!=='yes')return fail(['Esta versión solo admite adultos no embarazados.']);
 const lines=x.csv.trim().split(/\r?\n/).map(v=>v.trim()).filter(Boolean);
 if(lines.length>15000)return fail(['Máximo 15 000 filas; dividir archivos mayores sin perder trazabilidad.']);
 const readings=[];
 for(let i=0;i<lines.length;i++){
  if(i===0&&/^(timestamp|fecha)\s*,/i.test(lines[i]))continue;
  const m=/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})),\s*(\d{2,3}(?:\.\d+)?)$/.exec(lines[i]);
  if(!m)return fail(['Fila '+(i+1)+': usar fecha ISO8601 con zona (Z o ±hh:mm),coma,glucosa mg/dL.']);
  const ms=Date.parse(m[1]),g=Number(m[2]);
  if(!Number.isFinite(ms)||g<40||g>400)return fail(['Fila '+(i+1)+': fecha imposible o glucosa fuera de 40–400 mg/dL; revisar formato o sensor.']);
  if(readings.length&&ms<=readings[readings.length-1].ms)return fail(['Fechas repetidas o no ordenadas: ordenar y eliminar duplicados antes de analizar.']);
  readings.push({ms,g});
 }
 if(readings.length<4)return fail(['Se requieren al menos 4 lecturas válidas para mostrar estadísticos exploratorios.']);
 const days=(readings.at(-1).ms-readings[0].ms)/86400000;
 if(days>31)return fail(['Máximo 31 días por importación en esta versión.']);
 const gap=readings.reduce((n,z,i)=>i>0&&z.ms-readings[i-1].ms>10*60000?n+1:n,0);
 const captured=readings.length;const expected=(readings.at(-1).ms-readings[0].ms)/(5*60000)+1;
 const coverage=Math.min(100,100*captured/expected);
 const vals=readings.map(z=>z.g),sum=vals.reduce((a,b)=>a+b,0),mean=sum/captured;
 const sd=Math.sqrt(vals.reduce((a,v)=>a+(v-mean)**2,0)/captured),percent=f=>100*vals.filter(f).length/captured;
 const tir=percent(v=>v>=70&&v<=180),tbr=percent(v=>v<70),verylow=percent(v=>v<54),tar=percent(v=>v>180),veryhigh=percent(v=>v>250);
 const gmi=3.31+0.02392*mean;
 const warnings=[],critical=[],details=[
  'Registros: '+captured+'; duración '+days.toFixed(2)+' días; cobertura aproximada de muestras de 5 min '+coverage.toFixed(1)+'%.',
  'TIR 70–180 mg/dL: '+tir.toFixed(1)+'%; TBR <70: '+tbr.toFixed(1)+'%; TBR <54: '+verylow.toFixed(1)+'%.',
  'TAR >180: '+tar.toFixed(1)+'%; TAR >250: '+veryhigh.toFixed(1)+'%.',
  'Glucosa media: '+mean.toFixed(1)+' mg/dL; CV: '+(100*sd/mean).toFixed(1)+'%; GMI: '+gmi.toFixed(2)+'% (estimación, NO HbA1c medida).'
 ];
 if(days<14||coverage<70)warnings.push('Insuficiente para informe CGM representativo: objetivo ≥14 días con ≥70% de datos; porcentajes son exploratorios.');
 if(gap)warnings.push('Hay '+gap+' intervalo(s) >10 min. Los porcentajes cuentan muestras disponibles, NO ponderan tiempo faltante.');
 if(verylow>0)critical.push('Existen lecturas <54 mg/dL: comprobar episodios y confirmar con medición capilar cuando corresponda.');
 else if(tbr>0)warnings.push('Lecturas <70 mg/dL: analizar episodios y tratamiento.');
 warnings.push('La distribución CGM no verifica exactitud individual ni autoriza titulación de insulina. No se suben datos ni se conservan.');
 return result('Resumen CGM local'+(days<14||coverage<70?' · exploratorio':''),details,warnings,critical,{tir,tbr,verylow,tar,veryhigh,gmi,cv:100*sd/mean,coverage,days});
}
function evaluate(id,raw,engine){
 const v=validate(id,raw);if(!v)return fail(['Herramienta desconocida.']);
 if(v.errors.length)return fail(v.errors);
 try{
  if(id==='insulin-safety')return safety(v.v);
  if(id==='hospital-glucose')return measurements(v.v);
  if(id==='hypoglycemia')return hypoglycemia(v.v);
  if(id==='dka-hhs')return crises(v.v,engine);
  if(id==='dm2-navigator')return navigator(v.v);
  if(id==='cgm-intelligence')return cgm(v.v);
  return fail(['Módulo no disponible.']);
 }catch(e){return fail(['No se pudo evaluar: revisar formato de datos y volver a intentar.']);}
}
root.KidBumDiabetesCore=Object.freeze({tools:specs.map(x=>Object.freeze(x)),evaluate,examples:Object.fromEntries(specs.map(x=>[x.id,x.example])),sources:{ADA26,ADA6,CRISES,PRONAM}});
})(typeof window!=='undefined'?window:globalThis);
