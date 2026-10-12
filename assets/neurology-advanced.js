/* KidBum CALC · Módulo neurológico fase 2 · 2026-10-11.
 * Clinical sources: NINDS NIH Stroke Scale (2025), Hunt-Hess, Fisher original,
 * American Spinal Injury Association ISNCSCI 2026 (AIS guided ONLY).
 * Not a regulated or clinically independently validated application.
 */
(function(root){
'use strict';
const ids=Object.freeze(['nihss','hunthess','fisher','asiaais']);
const levels=Object.freeze(['C2','C3','C4','C5','C6','C7','C8','T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12','L1','L2','L3','L4','L5','S1','S2','S3','S4-5']);
const motorRoots=Object.freeze(['C5','C6','C7','C8','T1','L2','L3','L4','L5','S1']);
const nihssItems=Object.freeze([
 ['loca',3,'1a Conciencia'],
 ['locb',2,'1b Preguntas LOC'],
 ['locc',2,'1c Órdenes LOC'],
 ['gaze',2,'2 Mirada'],
 ['visual',3,'3 Campo visual'],
 ['face',3,'4 Parálisis facial'],
 ['armL',4,'5a Brazo izquierdo'],
 ['armR',4,'5b Brazo derecho'],
 ['legL',4,'6a Pierna izquierda'],
 ['legR',4,'6b Pierna derecha'],
 ['ataxia',2,'7 Ataxia'],
 ['sensory',2,'8 Sensibilidad'],
 ['language',3,'9 Lenguaje'],
 ['dysarthria',2,'10 Disartria'],
 ['neglect',2,'11 Extinción/neglect']
]);
const hunt={
  '1':'Asintomático o cefalea leve; rigidez de nuca mínima.',
  '2':'Cefalea moderada-intensa y rigidez de nuca, sin déficit salvo posible parálisis de nervio craneal.',
  '3':'Somnolencia o confusión y/o déficit neurológico focal leve.',
  '4':'Estupor y déficit focal moderado-grave (p. ej., hemiparesia).',
  '5':'Coma profundo, postura de descerebración o estado agónico.'
};
const fisher={
 '1':'No se observa sangre subaracnoidea en la TAC (Fisher original).',
 '2':'Sangre subaracnoidea difusa fina o capas verticales menores de 1 mm.',
 '3':'Coágulo subaracnoideo localizado y/o capa vertical gruesa de 1 mm o más.',
 '4':'Sangre intraventricular o intraparenquimatosa con HSA difusa fina o ausente.'
};
function fail(message){return {error:[message]};}
function pick(value,name,allowed){
 if(!allowed.includes(value))throw Error(name+': selecciona una opción válida.');
 return value;
}
function finished(value,unit,interpretation,notes,detail){
 if(value!==null&&!Number.isFinite(value))return fail('Resultado numérico inválido.');
 return {value,unit,interpretation,notes,detail};
}
function aisResult(letter,interpretation,notes,detail){const o=finished(null,'',interpretation,notes,detail);o.display='AIS '+letter;return o;}
function calculate(id,d){
 if(!ids.includes(id))return fail('Escala neurológica no disponible.');
 const x=d||{};
 try{
  if(id==='nihss'){
    pick(x.confirm,'Evaluación NIHSS presencial',['yes','no']);
    if(x.confirm!=='yes')return fail('La NIHSS requiere exploración neurológica estructurada de acuerdo con las instrucciones oficiales.');
    let sum=0;const lines=[],un=[];
    for(const [key,max,label] of nihssItems){
      const allowed=Array.from({length:max+1},(_,i)=>String(i));
      if(['armL','armR','legL','legR','ataxia','dysarthria'].includes(key))allowed.push('UN');
      const v=pick(x[key],label,allowed);
      if(v==='UN'){un.push(label);lines.push(label+': UN');}
      else{sum+=Number(v);lines.push(label+': '+v);}
    }
    const notes=[
      'NIHSS debe realizarse por un profesional capacitado en el orden establecido, registrando el comportamiento observado; no sustituye imagen cerebral ni evaluación de EVC.',
      'UN solo está permitido donde la hoja oficial lo contempla y requiere justificar causa (amputación, fusión articular, barrera física o intubación, según ítem). NO equivale a cero.',
      'Las reglas específicas para coma y para pruebas con deficiencias previas deben seguir el instructivo NINDS; el programa no infiere puntajes automáticamente.',
      'NIHSS 0 no excluye EVC posterior, síntomas incapacitantes o isquemia de circulación posterior; tampoco decide por sí sola trombólisis o trombectomía.'
    ];
    if(un.length)return finished(null,'', 'NIHSS total NO determinable: '+un.length+' ítem(s) UN. Registrar subítems y motivo; no sumar como cero.',notes,
      'Subtotal de ítems puntuables (NO equivale al NIHSS total): '+sum+'. No evaluables: '+un.join(', ')+'. '+lines.join('; ')+'.');
    let severity=sum===0?'sin déficit medible en NIHSS':sum<=4?'déficit leve (categoría orientativa)':sum<=15?'déficit moderado (categoría orientativa)':sum<=20?'déficit moderado-grave (categoría orientativa)':'déficit grave (categoría orientativa)';
    return finished(sum,'/ 42 puntos','NIHSS '+sum+'/42: '+severity+'. No define por sí sola candidatura a reperfusión.',notes,lines.join('; ')+'. Total = '+sum+'.');
  }
  if(id==='hunthess'){
    pick(x.confirm,'Hemorragia subaracnoidea confirmada',['yes','no']);
    if(x.confirm!=='yes')return fail('Hunt y Hess se utiliza para graduar la situación clínica en HSA diagnosticada, no para diagnosticarla.');
    const v=pick(x.grade,'Grado clínico Hunt y Hess',['1','2','3','4','5']);
    const n=Number(v);
    return finished(n,'grado Hunt–Hess','Grado '+v+': '+hunt[v],[
      'Es una clasificación clínica de HSA, no una suma de puntos ni un pronóstico individual exacto.',
      'Valoración inicial e intervención de neurocirugía/neurología urgentes según la situación. Un grado bajo no excluye resangrado o deterioro.',
      'Sedación, intubación, comorbilidades y evolución pueden alterar el examen. Registrar hallazgos y momento de evaluación.'
    ],'Selección clínica de grado '+v+'. Criterio: '+hunt[v]);
  }
  if(id==='fisher'){
    pick(x.confirm,'Valoración de TAC para HSA',['yes','no']);
    if(x.confirm!=='yes')return fail('La escala original de Fisher requiere revisar la tomografía cerebral; no clasifica síntomas ni sustituye valoración radiológica.');
    const pattern=pick(x.pattern,'Patrón de sangre en TAC',['none','thin','thick','ivhthin','ivhthick','unclear']);
    if(pattern==='ivhthick'||pattern==='unclear')return fail('Fisher original no asigna aquí un grado inequívoco a esta combinación/patrón. Revisar TAC y considerar Fisher modificada por separado con experto; NO mezclar sus grados.');
    const v={none:1,thin:2,thick:3,ivhthin:4}[pattern];
    return finished(v,'grado Fisher original','Grado '+v+': '+fisher[v],[
      'Fisher ORIGINAL (1–4), no confundir con Fisher MODIFICADA (0–4), cuya estratificación de hemorragia intraventricular es distinta.',
      'Debe basarse en TAC inicial; no interpreta imágenes ni diagnostica hemorragia. El grado 3 original se asocia históricamente con mayor riesgo de vasoespasmo.',
      'La HSA es potencialmente crítica: vigilar deterioro, hidrocefalia y complicaciones con evaluación neurovascular urgente; no utilizar esta cifra sola para tratamiento o pronóstico.'
    ],'TAC: '+fisher[v]+' Categoría de Fisher original '+v+'.');
  }
  // Asistente de AIS basado en evaluación ISNCSCI COMPLETA suministrada por profesional.
  // No determina niveles sensoriales/motores ni ZPP, ni sustituye hoja original ASIA/ISCoS.
  /* Reject invalid supplied motor values, even when AIS A/B/E does not use
     them. Omitted non-applicable fields remain optional. */
  const motorGradeOptions=['0','1','2','3','4','5','NT'];
  if(x.motorBeyond3!==undefined&&x.motorBeyond3!=='')
    pick(x.motorBeyond3,'Motor >3 niveles',['yes','no','unknown']);
  for(const side of ['R','L'])for(const segment of motorRoots){
    const motorKey='m'+side+segment;
    if(x[motorKey]!==undefined&&x[motorKey]!=='')
      pick(x[motorKey],side+' '+segment+' fuerza muscular',motorGradeOptions);
  }
  pick(x.exam,'Exploración completa ISNCSCI',['yes','no']);
  if(x.exam!=='yes')return fail('Se requiere examen ISNCSCI completo y NLI establecido por profesional. La herramienta no calcula nivel neurológico ni reemplaza la hoja de 2026.');
  const nli=pick(x.nli,'Nivel neurológico único (NLI)',levels);
  const normal=pick(x.normal,'Todos los segmentos normales',['yes','no']);
  const prior=pick(x.prior,'Lesión medular documentada previa',['yes','no']);
  const sacral=[];
  for(const key of ['ltR','ltL','ppR','ppL'])sacral.push(pick(x[key],key+' S4–5',['0','1','2','NT']));
  const dap=pick(x.dap,'Presión anal profunda (DAP)',['yes','no','NT']);
  const vac=pick(x.vac,'Contracción anal voluntaria (VAC)',['yes','no','NT']);
  if(sacral.includes('NT')||dap==='NT'||vac==='NT')return fail('AIS no determinable (ND) por S4–5/DAP/VAC no explorables. Registrar NT y causa según ISNCSCI 2026.');
  const sensorySacral=sacral.some(v=>Number(v)>0)||dap==='yes';
  const notes=[
    'Asistente AIS: sólo utiliza datos clínicos ya obtenidos mediante la hoja ISNCSCI completa. NO calcula niveles sensoriales, niveles motores, NLI ni zonas de preservación parcial (ZPP).',
    'Clasificar y confirmar con estándares ASIA/ISCoS vigentes (9ª edición, 2026) y profesional entrenado. Lesiones no medulares, NT y anotaciones con asterisco necesitan valoración manual.',
    'La conservación sacra incluye S4–S5 (tacto ligero o pinchazo), DAP y VAC; músculos no clave pueden cambiar AIS B a C. No interpretar una letra aislada sin niveles y exploración.',
    'La lesión medular aguda requiere inmovilización/estabilización según contexto, vigilancia neurológica y valoración especializada.'
  ];
  if(normal==='yes'){
   if(prior!=='yes')return fail('Exploración normal sin lesión medular documentada previa: AIS E NO aplica en una persona sin antecedente de lesión medular.');
   if(nli!=='S4-5'||sacral.some(v=>v!=='2')||dap!=='yes'||vac!=='yes')return fail('Datos contradictorios: examen declarado completamente normal pero S4–5, DAP, VAC o NLI no son normales.');
   return aisResult('E','AIS E — normal en seguimiento de lesión medular previa, sujeto a confirmación del examen ISNCSCI completo.',notes,'Exploración reportada completamente normal; lesión medular anterior documentada. NLI '+nli+'.');
  }
  if(vac==='no'&&!sensorySacral)return aisResult('A','AIS A — lesión medular completa por ausencia de conservación sacra, condicionado a evaluación ISNCSCI correcta.',notes,
    'Sin tacto ni pinchazo S4–5, sin DAP y sin VAC. NLI comunicado: '+nli+'. ZPP requiere clasificación adicional en hoja oficial.');
  const sparing=pick(x.motorBeyond3,'Función motora >3 niveles caudal al nivel motor ipsilateral (incluye no clave)',['yes','no','unknown']);
  if(vac==='no'&&sensorySacral){
   if(sparing==='unknown')return fail('AIS B vs C no determinable: explorar músculos clave y NO clave a más de tres niveles del nivel motor ipsilateral.');
   if(sparing==='no')return aisResult('B','AIS B — lesión sensitiva incompleta: conservación sacra sensitiva, sin VAC ni función motora >3 niveles caudal al nivel motor.',notes,
      'NLI comunicado: '+nli+'; conservación sacra sensitiva: sí; VAC no; prueba motora >3 niveles: no.');
  }
  const below=[];
  for(const side of ['R','L'])for(const rootName of motorRoots){
   if(levels.indexOf(rootName)>levels.indexOf(nli)){
    const key='m'+side+rootName;
    const val=pick(x[key],side+' '+rootName+' fuerza muscular',['0','1','2','3','4','5','NT']);
    if(val==='NT')return fail('AIS C/D no determinable: músculo clave '+side+' '+rootName+' NT por debajo del NLI. Revisar en hoja oficial.');
    below.push({side,root:rootName,score:Number(val)});
   }
  }
  if(!below.length)return fail('Sin músculos clave por debajo del NLI registrado: AIS C/D necesita clasificación especializada.');
  const strong=below.filter(v=>v.score>=3).length;
  const grade=strong*2>=below.length?'D':'C';
  const interpretation='AIS '+grade+' — lesión motora incompleta; '+strong+' de '+below.length+' músculos clave por debajo del NLI con grado ≥3/5 ('+(100*strong/below.length).toFixed(1)+'%). Requiere confirmación ISNCSCI 2026.';
  return aisResult(grade,interpretation,notes,
    'NLI informado '+nli+'. Motora incompleta: '+(vac==='yes'?'VAC presente':'>3 niveles bajo el nivel motor ipsilateral con conservación sacra sensitiva')+'. Músculos clave caudales '+strong+'/'+below.length+' con fuerza ≥3/5. No se calcularon ZPP ni niveles segmentarios.');
 }catch(e){return fail(String(e&&e.message||e));}
}
root.KidBumNeurologyAdvanced=Object.freeze({ids,levels,motorRoots,nihssItems,calculate});
})(typeof globalThis!=='undefined'?globalThis:this);
