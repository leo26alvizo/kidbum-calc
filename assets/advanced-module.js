/* KidBum CALC v0.9.0 · QTc, Glasgow-Blatchford, RCRI.
 * Calculations are educational support, not discharge or perioperative orders.
 */
(function(root){
'use strict';
const ids=Object.freeze(['qtc','gbs','rcri']);
function number(v,label,min,max){
 let n=NaN;
 if(typeof v==='number')n=v;
 else if(typeof v==='string'){
  const t=v.trim().replace(',','.');
  if(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(t))n=Number(t);
 }
 if(!Number.isFinite(n)||n<min||n>max)throw Error(label+': introduce un número válido entre '+min+' y '+max+'.');
 return n;
}
function select(v,label,valid){
 if(!valid.includes(v))throw Error(label+': selecciona una opción válida.');
 return v;
}
function yes(v,label){return select(v,label,['true','false'])==='true';}
function done(value,unit,interpretation,notes,detail){
 if(!Number.isFinite(value))throw Error('Cálculo no finito; verifica los datos.');
 return {value,unit,interpretation,notes,detail};
}
function calculate(id,x){
 if(!ids.includes(id))return {error:['Herramienta avanzada desconocida.']};
 const o=x||{};
 try{
  if(id==='qtc'){
   const qt=number(o.qt,'Intervalo QT',150,800);
   const hr=number(o.hr,'Frecuencia cardíaca',30,220);
   const rhythm=select(o.rhythm,'Regularidad del intervalo RR',['regular','irregular']);
   const qrs=select(o.qrs,'Duración del QRS',['narrow','wide']);
   if(rhythm==='irregular')return {error:['El RR es irregular o variable: Bazett/Fridericia con una sola FC pueden inducir error. Se requiere valoración manual del ECG y método apropiado.']};
   const rr=60/hr;
   const bazett=qt/Math.sqrt(rr);
   const fridericia=qt/Math.cbrt(rr);
   const notes=[
    'QT medido manualmente en ECG y FC del mismo trazo; verificar el final de onda T. RR = 60/FC (segundos).',
    'En fibrilación auricular o variabilidad marcada del RR no utilizar automáticamente un único intervalo para la corrección.',
    'Bazett suele sobrecorregir en taquicardia y subcorregir en bradicardia; ambas fórmulas tienen limitaciones.',
    'QTc es una estimación: revisar fármacos, potasio, magnesio, calcio, síntomas y antecedentes; no diagnostica una arritmia.'
   ];
   if(hr<50||hr>100)notes.push('FC fuera de 50–100 lpm: aumenta el sesgo de corrección, especialmente con Bazett.');
   if(qrs==='wide')notes.push('QRS ≥120 ms o conducción ventricular alterada: QTc puede resultar engañoso; considerar análisis JT o corrección especializada.');
   if(fridericia>=500||bazett>=500)notes.push('Algún QTc ≥500 ms: revisar manualmente ECG y factores de riesgo de torsades de pointes; priorizar valoración clínica.');
   const description='QTc Fridericia '+fridericia.toFixed(1)+' ms; QTc Bazett '+bazett.toFixed(1)+' ms.';
   return done(fridericia,'ms (Fridericia)',description,notes,'RR = 60/'+hr+' = '+rr.toFixed(3)+' s. QTc Fridericia = QT / RR^(1/3); QTc Bazett = QT / √RR. QT = '+qt+' ms. QRS '+(qrs==='wide'?'≥120 ms':'<120 ms')+'.');
  }
  if(id==='gbs'){
   const units=select(o.ureaunit,'Unidad de urea/BUN',['urea_mmoll','bun_mgdl','urea_mgdl']);
   const raw=number(o.urea,'Urea o BUN séricos',0.1,units==='urea_mmoll'?250:units==='bun_mgdl'?700:1500);
   const urea=units==='urea_mmoll'?raw:units==='bun_mgdl'?raw/2.80134:raw/6.006;
   const hb=number(o.hb,'Hemoglobina',2,25);
   const sex=select(o.hbsex,'Referencia de hemoglobina de GBS',['male','female']);
   const sbp=number(o.sbp,'Presión arterial sistólica',40,300);
   const hr=number(o.hr,'Frecuencia cardíaca',20,250);
   const melena=yes(o.melena,'Melena');
   const syncope=yes(o.syncope,'Síncope');
   const liver=yes(o.liver,'Enfermedad hepática');
   const hf=yes(o.hf,'Insuficiencia cardíaca');
   const up=urea<6.5?0:urea<8?2:urea<10?3:urea<25?4:6;
   const hp=sex==='male'?(hb<10?6:hb<12?3:hb<13?1:0):(hb<10?6:hb<12?1:0);
   const pp=sbp<90?3:sbp<100?2:sbp<110?1:0;
   const pulse=hr>=100?1:0;
   const m=melena?1:0,s=syncope?2:0,l=liver?2:0,c=hf?2:0;
   const score=up+hp+pp+pulse+m+s+l+c;
   const detail='GBS = urea '+up+' + Hb '+hp+' + PAS '+pp+' + pulso '+pulse+' + melena '+m+' + síncope '+s+' + hepatopatía '+l+' + insuficiencia cardíaca '+c+' = '+score+'. Urea equivalente: '+urea.toFixed(3)+' mmol/L ('+({urea_mmoll:'urea mmol/L',bun_mgdl:'BUN mg/dL',urea_mgdl:'urea mg/dL'})[units]+').';
   const low=score<=1;
   const interpret=low?'GBS 0–1: riesgo muy bajo según estratificación inicial de ACG 2021; no equivale a indicación automática de alta.':'GBS >1: no corresponde al estrato de riesgo muy bajo del criterio ACG 2021; requiere evaluación y plan clínico.';
   return done(score,'/ 23 puntos',interpret,[
    'Aplicable a adultos con sospecha de hemorragia digestiva alta antes de endoscopia; usar signos vitales y analítica de la evaluación clínica.',
    'ACG 2021 describe GBS 0–1 como ejemplo de riesgo muy bajo; cualquier decisión de alta depende de estabilidad, sangrado activo, comorbilidad y seguimiento.',
    'Una hemoglobina inicialmente normal NO excluye hemorragia aguda significativa. Inestabilidad, hematemesis activa o choque requieren atención urgente.',
    'Se convirtió internamente el analito sérico a urea mmol/L; NO equiparar los valores numéricos de BUN mg/dL y urea mg/dL.',
    'Confirmar referencia de hemoglobina según la tabla original GBS y evaluar limitaciones individuales.'
   ],detail);
  }
  // RCRI: planned high-risk procedure, ischemic disease, HF, cerebrovascular disease,
  // insulin-treated diabetes, and creatinine at or above 2 mg/dL.
  const surgery=yes(o.surgery,'Cirugía de alto riesgo');
  const ischemia=yes(o.ischemia,'Cardiopatía isquémica');
  const hf=yes(o.hf,'Antecedente de insuficiencia cardíaca');
  const cvd=yes(o.cvd,'Enfermedad cerebrovascular');
  const insulin=yes(o.insulin,'Tratamiento con insulina');
  const cr=number(o.scr,'Creatinina sérica',0.1,25);
  const renal=cr>=2;
  const criteria=[['Procedimiento quirúrgico de alto riesgo',surgery],['Cardiopatía isquémica',ischemia],['Antecedente de insuficiencia cardíaca',hf],['Enfermedad cerebrovascular',cvd],['Diabetes tratada con insulina',insulin],['Creatinina sérica ≥2.0 mg/dL',renal]];
  const score=criteria.reduce((sum,row)=>sum+(row[1]?1:0),0);
  const klass=score===0?'I':score===1?'II':score===2?'III':'IV';
  const desc='RCRI '+score+' / 6: clase '+klass+' (Lee).'+(score>1?' Se considera riesgo calculado elevado en los algoritmos perioperatorios de 2024; requiere evaluación clínica integrada.':' La puntuación no excluye eventos perioperatorios.');
  return done(score,'/ 6 puntos',desc,[
   'Aplicar a adultos antes de cirugía NO cardíaca; los seis factores corresponden al índice de Lee.',
   'La definición de cirugía de alto riesgo incluye intraperitoneal, intratorácica y vascular suprainguinal; verificar el procedimiento y contexto.',
   'RCRI no sustituye valoración de inestabilidad cardíaca, síntomas, capacidad funcional, tipo de cirugía, urgencia ni decisiones compartidas.',
   'No derivar un porcentaje individual de riesgo o autorizar/suspender cirugía basándose exclusivamente en el puntaje.'
  ],criteria.map(row=>row[0]+': '+(row[1]?1:0)).join('; ')+'. Creatinina '+cr+' mg/dL.');
 }catch(e){return {error:[String(e&&e.message||e)]};}
}
root.KidBumAdvanced=Object.freeze({ids,calculate});
})(typeof globalThis!=='undefined'?globalThis:this);
