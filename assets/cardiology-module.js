/* KidBum CALC cardiology v0.9.8. Original PCE 2013 (historical),
 * TIMI UA/NSTEMI & STEMI, CHA2DS2-VASc, HAS-BLED.
 * References: Goff 2013 ACC/AHA PCE Table A; 2026 ACC/AHA prevention PREVENT;
 * 2025 ACC/AHA ACS Table 5; 2023 ACC/AHA AF; 2024 ESC AF.
 * Strictly educational. Not diagnostic, discharge, anticoagulation, or drug orders.
 */
(function(root){
'use strict';
const ids=Object.freeze(['ascvdpce','timinstemi','timistemi','chadsvasc','hasbled']);
function error(text){return {error:[text]};}
function num(value,label,min,max){
 let n=NaN;
 if(typeof value==='number')n=value;
 else if(typeof value==='string'){
  const s=value.trim().replace(',','.');
  if(/^[+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))n=Number(s);
 }
 if(!Number.isFinite(n)||n<min||n>max)throw Error(label+': introduce un número entre '+min+' y '+max+'.');
 return n;
}
function select(value,label,opts){
 if(!opts.includes(value))throw Error(label+': selecciona una opción válida.');
 return value;
}
function yn(value,label){return select(value,label,['true','false'])==='true';}
function output(value,unit,interpretation,notes,detail){
 if(!Number.isFinite(value))throw Error('Resultado no finito. Revisa los datos.');
 return {value,unit,interpretation,notes,detail};
}
// Original sex-and-race grouped PCE (2013) coefficient table.
// Group refers solely to the historical derivation cohorts, never biological race.
// [lnAge,lnAge²,lnTC,lnAge*lnTC,lnHDL,lnAge*lnHDL,
//  lnSBP_treated,lnAge*lnSBP_treated,lnSBP_untreated,lnAge*lnSBP_untreated,
//  smoker,lnAge*smoker,diabetes]
const pce=Object.freeze({
 fw:{coef:[-29.799,4.884,13.540,-3.114,-13.578,3.149,2.019,0,1.957,0,7.574,-1.665,0.661],survival:.9665,mean:-29.18},
 fb:{coef:[17.114,0,.940,0,-18.920,4.475,29.291,-6.432,27.820,-6.087,.691,0,.874],survival:.9533,mean:86.61},
 mw:{coef:[12.344,0,11.853,-2.664,-7.990,1.769,1.797,0,1.764,0,7.837,-1.795,.658],survival:.9144,mean:61.18},
 mb:{coef:[2.469,0,.302,0,-.307,0,1.916,0,1.809,0,.549,0,.645],survival:.8954,mean:19.54}
});
function evaluatePce(d){
 const age=num(d.age,'Edad',40,79);
 const tc=num(d.tc,'Colesterol total',130,320);
 const hdl=num(d.hdl,'Colesterol HDL',20,100);
 const sbp=num(d.sbp,'Presión sistólica',90,200);
 const cohort=select(d.cohort,'Cohorte histórica de la ecuación',['fw','fb','mw','mb']);
 const treated=yn(d.treated,'Tratamiento antihipertensivo');
 const smoke=yn(d.smoke,'Tabaquismo actual');
 const diabetes=yn(d.diabetes,'Diabetes');
 const established=yn(d.ascvd,'ASCVD clínica establecida');
 const acknowledge=yn(d.acknowledge,'Limitaciones de la PCE');
 if(established) return error('La PCE original se diseñó para prevención PRIMARIA sin ASCVD conocida. En enfermedad cardiovascular establecida, no calcular este riesgo como guía de prevención primaria.');
 if(!acknowledge)return error('Confirma que comprendes que esta PCE de 2013 es histórica y NO es el método recomendado por ACC/AHA 2026 para decidir tratamiento.');
 const la=Math.log(age),lt=Math.log(tc),lh=Math.log(hdl),lp=Math.log(sbp);
 const x=[la,la*la,lt,la*lt,lh,la*lh,treated?lp:0,treated?la*lp:0,treated?0:lp,treated?0:la*lp,smoke?1:0,smoke?la:0,diabetes?1:0];
 const {coef,mean,survival}=pce[cohort];
 const sum=coef.reduce((acc,c,i)=>acc+c*x[i],0);
 const exponent=Math.exp(sum-mean);
 const risk=100*(1-Math.pow(survival,exponent));
 const notes=[
  'Modelo histórico ACC/AHA 2013 Pooled Cohort Equations (PCE), riesgo de primer infarto/ictus aterosclerótico a 10 años. ACC/AHA 2026 recomienda PREVENT-ASCVD para decisiones preventivas actuales.',
  'Las cuatro ecuaciones dependen de cohortes estadounidenses categorizadas históricamente por sexo y raza; NO son categorías biológicas. No se validaron originalmente en población mexicana y pueden sobreestimar o subestimar el riesgo. No asignar grupo racial automáticamente.',
  'Aplicable solo a personas de 40–79 años sin enfermedad aterosclerótica clínica conocida y dentro de límites de la ecuación. No aplicar a personas menores, mayores o con valores fuera de los rangos.',
  'Este porcentaje NO constituye recomendación de estatina ni un pronóstico individual. Complementar con PREVENT, contexto mexicano, antecedentes, LDL-C, enfermedad renal, factores modificadores y juicio médico.',
  'Se usan los coeficientes y constantes de redondeo publicados en Table A (Goff et al. 2013); puede haber pequeñas diferencias decimales con otras implementaciones.'
 ];
 const cohortText={fw:'mujeres blancas no hispanas',fb:'mujeres negras estadounidenses',mw:'hombres blancos no hispanos',mb:'hombres negros estadounidenses'}[cohort];
 return output(risk,'% a 10 años (PCE histórica)','Estimación histórica: '+risk.toFixed(1)+'% a 10 años. No utilizar como indicación terapéutica; guía 2026 prioriza PREVENT.',notes,
   'Cohorte de derivación histórica: '+cohortText+'. Ecuación 2013: riesgo = 100 × [1 − S₁₀ ^ exp(ΣβX − mediaβX)]. S₁₀='+survival+', media='+mean+', ΣβX='+sum.toFixed(4)+'.');
}
function calculate(id,data){
 if(!ids.includes(id))return error('Calculadora cardiológica desconocida.');
 const d=data||{};
 try{
 if(id==='ascvdpce')return evaluatePce(d);
 if(id==='timinstemi'){
  const valid=yn(d.suspected,'Sospecha/confirmación de SCASEST');
  if(!valid)return error('TIMI UA/NSTEMI es una escala de riesgo para SCASEST; no se utiliza para descartar o diagnosticar infarto.');
  const age=num(d.age,'Edad',18,120);
  const factors=select(d.riskfactors,'Número de factores coronarios',['0','1','2','3','4','5']);
  const dataPts=[
   ['Edad ≥65 años',age>=65],
   ['≥3 factores coronarios (historia familiar, hipertensión, dislipidemia, DM o fumador)',Number(factors)>=3],
   ['Estenosis coronaria conocida ≥50%',yn(d.stenosis,'Estenosis ≥50%')],
   ['Aspirina en últimos 7 días',yn(d.aspirin,'Aspirina')],
   ['≥2 episodios de angina en 24 horas',yn(d.angina,'Angina frecuente')],
   ['Desviación del ST ≥0.5 mm',yn(d.st,'Alteración ST')],
   ['Biomarcadores cardíacos positivos',yn(d.biomarker,'Biomarcadores')]
  ];
  const score=dataPts.reduce((s,row)=>s+Number(row[1]),0);
  return output(score,'/ 7 puntos','TIMI UA/NSTEMI: '+score+'/7. Estratifica eventos a 14 días en cohortes históricas; no diagnostica ni excluye SCA.',[
    'Aplicable en sospecha o diagnóstico de angina inestable/NSTEMI. Ante inestabilidad hemodinámica, dolor persistente o arritmia: atención de urgencias sin esperar el puntaje.',
    'Guía ACC/AHA 2025: TIMI o GRACE pueden complementar la valoración; GRACE también es útil para pronóstico. La escala no sustituye ECG seriados, troponinas ni evaluación cardiológica.',
    'Se define un factor coronario como cada uno de: antecedente familiar de EAC, hipertensión, hipercolesterolemia, diabetes o tabaquismo actual.',
    'No mostrar porcentajes precisos actuales basados en poblaciones históricas como si fueran probabilidad individual.'
  ],dataPts.map(([label,yes])=>label+': '+(yes?1:0)).join('; ')+'. Total '+score+'/7.');
 }
 if(id==='timistemi'){
  const valid=yn(d.confirm,'Diagnóstico de STEMI');
  if(!valid)return error('TIMI STEMI se utiliza con STEMI identificado, no como prueba diagnóstica ni para retrasar reperfusión.');
  const age=num(d.age,'Edad',18,120),sbp=num(d.sbp,'PAS',40,250),hr=num(d.hr,'Frecuencia cardíaca',30,220),weight=num(d.weight,'Peso',20,250),hrs=num(d.hours,'Horas desde inicio de síntomas a tratamiento',0,72);
  const pts=[
    ['Edad 65–74 (+2) o ≥75 (+3)',age>=75?3:age>=65?2:0],
    ['Diabetes, hipertensión o angina (+1)',yn(d.history,'DM/HTA/angina')?1:0],
    ['PAS <100 mmHg (+3)',sbp<100?3:0],
    ['Frecuencia >100 lpm (+2)',hr>100?2:0],
    ['Killip II–IV (+2)',yn(d.killip,'Killip II–IV')?2:0],
    ['Peso <67 kg (+1)',weight<67?1:0],
    ['ST anterior o BRI (+1)',yn(d.anterior,'ST anterior / BRI')?1:0],
    ['Tratamiento >4 h (+1)',hrs>4?1:0]
  ];
  const score=pts.reduce((s,row)=>s+row[1],0);
  return output(score,'/ 14 puntos','TIMI STEMI: '+score+'/14. Pronóstico orientativo de mortalidad a 30 días en cohortes derivadas; no determina tratamiento.',[
    'En STEMI la reperfusión y estabilización NO deben retrasarse por esta escala. Es herramienta pronóstica, no criterio de candidatura ni selección de fibrinólisis.',
    'Criterios y límites de la escala original contrastados con ACC/AHA ACS 2025 y TIMI Study Group.',
    'Se usa tiempo hasta el tratamiento >4 horas en el diseño original. Si es desconocido o la estrategia difiere, interpretar con cautela; no inventar hora ni registrar 0.',
    'El riesgo absoluto varía con las técnicas modernas de reperfusión y poblaciones de práctica clínica.'
  ],pts.map(([label,p])=>label+': '+p).join('; ')+'. Total '+score+'/14.');
 }
 if(id==='chadsvasc'){
  const confirmed=yn(d.af,'Fibrilación auricular');
  if(!confirmed)return error('CHA₂DS₂-VASc se usa en fibrilación auricular/aletéo auricular según valoración clínica. No asignar resultado ante arritmia no establecida.');
  const age=num(d.age,'Edad',18,120);
  const sex=select(d.sex,'Sexo usado por el algoritmo histórico',['male','female']);
  const inputs=[
   ['Insuficiencia cardíaca',yn(d.hf,'Insuficiencia cardíaca'),1],
   ['Hipertensión',yn(d.htn,'Hipertensión'),1],
   ['Edad 65–74',age>=65&&age<75,1],
   ['Edad ≥75',age>=75,2],
   ['Diabetes',yn(d.diabetes,'Diabetes'),1],
   ['EVC/AIT/tromboembolia previa',yn(d.stroke,'EVC/AIT'),2],
   ['Enfermedad vascular',yn(d.vascular,'Enfermedad vascular'),1],
   ['Sexo femenino en escala original',sex==='female',1]
  ];
  const score=inputs.reduce((a,b)=>a+(b[1]?b[2]:0),0);
  const va=score-(sex==='female'?1:0);
  return output(score,'/ 9 puntos','CHA₂DS₂-VASc '+score+'/9 (CHA₂DS₂-VA sin sexo '+va+'/8). Evaluar riesgo y factores individuales; no prescribir anticoagulación automáticamente.',[
    'ACC/AHA/ACCP/HRS 2023 reconoce CHA₂DS₂-VASc. ESC 2024 propone CHA₂DS₂-VA sin sexo; se muestra como información adicional para comparación sin doble captura.',
    'El sexo femenino no debe interpretarse aisladamente como un factor suficiente para anticoagular: es modificador del riesgo en la herramienta clásica.',
    'La presencia de válvula mecánica o estenosis mitral reumática moderada-grave exige valoración específica; no basarse únicamente en el puntaje.',
    'No asignar porcentajes anuales individualizados ni dosis de fármacos. Evaluar sangrado, insuficiencia renal, comorbilidades, preferencias y protocolo.'
  ],inputs.map(([label,v,p])=>label+': '+(v?p:0)).join('; ')+'. CHA₂DS₂-VASc '+score+'; CHA₂DS₂-VA '+va+'.');
 }
 const hasAf=yn(d.af,'Fibrilación auricular');
 if(!hasAf)return error('HAS-BLED se incorpora para valorar factores hemorrágicos en pacientes con FA y posibles decisiones sobre anticoagulación; no lo uses como permiso/contraindicación por sí solo.');
 const age=num(d.age,'Edad',18,120);
 const anticoag=select(d.anticoag,'Tipo de anticoagulación',['vka','doac','none']);
 let inr=false;
 if(anticoag==='vka')inr=yn(d.labile,'INR lábil: tiempo en rango terapéutico <60%');
 const entries=[
   ['Hipertensión no controlada, PAS >160',yn(d.htn,'HTA sistólica >160'),1],
   ['Función renal anormal',yn(d.renal,'Función renal anormal'),1],
   ['Función hepática anormal',yn(d.liver,'Función hepática anormal'),1],
   ['EVC previo',yn(d.stroke,'EVC previo'),1],
   ['Antecedente/predisposición a sangrado',yn(d.bleed,'Sangrado previo/predisposición'),1],
   ['INR lábil (solo antagonistas vitamina K)',inr,1],
   ['Edad >65 años',age>65,1],
   ['Fármacos de riesgo (antiagregantes/AINE)',yn(d.drugs,'Fármacos de riesgo'),1],
   ['Alcohol ≥8 unidades/semana',yn(d.alcohol,'Alcohol'),1]
 ];
 const score=entries.reduce((a,[,yes,p])=>a+(yes?p:0),0);
 return output(score,'/ 9 puntos','HAS-BLED '+score+'/9.'+(score>=3?' ≥3: revisar activamente factores corregibles y seguimiento clínico estrecho.':' Revisar igualmente factores de riesgo modificables.'),[
   'HAS-BLED no debe usarse como única razón para negar o suspender anticoagulación. La guía ACC/AHA 2023 y ESC 2024 recomiendan valorar y modificar factores de sangrado.',
   'Función renal anormal: diálisis, trasplante renal o creatinina ≥2.26 mg/dL (≥200 μmol/L); hepática: cirrosis o bilirrubina >2 veces el límite superior más AST/ALT/FA >3 veces.',
   'Si no usa antagonista de vitamina K, el criterio INR lábil no aplica y se asigna 0. Si usa antagonista de vitamina K, debe verificarse el tiempo en rango terapéutico.',
   'Edad >65 años es el umbral original de HAS-BLED (no confundir con ≥65 de otras escalas). Fármacos y alcohol suman un punto cada uno.',
   'El puntaje es orientativo y no representa un riesgo hemorrágico individual exacto; abordar hipertensión, interacciones, alcohol, función renal y sangrados previos.'
 ],entries.map(([label,v,p])=>label+': '+(v?p:0)).join('; ')+'. Anticoagulación: '+anticoag+'. Total '+score+'/9.');
 }catch(e){return error(String(e&&e.message||e));}
}
root.KidBumCardio=Object.freeze({ids,calculate});
})(typeof globalThis!=='undefined'?globalThis:this);
