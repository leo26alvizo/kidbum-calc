(function(root){
'use strict';
/* Guardia Pro: escalas de referencia, sin decisiones terapéuticas automáticas.
 * 4Ts ASH, Padua Prediction Score, IMPROVE Bleeding Risk.
 */
const choice=(key,label,options,help)=>({key,label,type:'choice',options,help:help||''});
const yn=(key,label,help)=>choice(key,label,[['yes','Sí, comprobado'],['no','No, comprobado']],help);
const num=(key,label,min,max,unit)=>({key,label,type:'number',min,max,unit});
const hitFields=[
 choice('platelets','Trombocitopenia (caída porcentual y nadir)',[
  ['2','2 · Caída >50% Y nadir ≥20 ×10⁹/L'],
  ['1','1 · Caída 30–50% O nadir 10–19 ×10⁹/L'],
  ['0','0 · Caída <30% O nadir <10 ×10⁹/L']
 ],'Calcular descenso desde el recuento previo apropiado; revisar causas perioperatorias.'),
 choice('timing','Temporalidad respecto a heparina',[
  ['2','2 · Inicio claro días 5–10, o ≤1 día con heparina en los últimos 30 días'],
  ['1','1 · Inicio compatible pero incierto; >10 días; o ≤1 día con exposición hace 30–100 días'],
  ['0','0 · Inicio ≤4 días sin exposición reciente (100 días)']
 ],'Revisar todas las exposiciones, incluidos lavados y heparina de bajo peso molecular.'),
 choice('thrombosis','Trombosis u otra manifestación',[
  ['2','2 · Nueva trombosis confirmada, necrosis cutánea o reacción sistémica aguda tras bolo IV'],
  ['1','1 · Trombosis recurrente/progresiva, sospechada o lesiones eritematosas no necróticas'],
  ['0','0 · Ausente, comprobado']
 ]),
 choice('other','Otras causas de trombocitopenia',[
  ['2','2 · Ninguna aparente tras valoración'],
  ['1','1 · Otras causas posibles'],
  ['0','0 · Otra causa definida']
 ]),
 yn('context','¿Se verificó exposición a heparina y se revisaron los cuatro dominios?')
];
const paduaFlags=[
 ['cancer','Cáncer activo (metástasis o quimio/radioterapia en 6 meses)',3],
 ['prior','TEV previa (no cuenta tromboflebitis superficial)',3],
 ['mobility','Movilidad reducida / reposo con permiso de baño ≥3 días',3],
 ['thrombophilia','Trombofilia conocida',3],
 ['surgery','Traumatismo o cirugía en ≤1 mes',2],
 ['age70','Edad ≥70 años',1],
 ['failure','Insuficiencia cardiaca o respiratoria',1],
 ['infarct','IAM o EVC isquémico agudo',1],
 ['infection','Infección aguda o enfermedad reumatológica',1],
 ['obesity','IMC ≥30 kg/m²',1],
 ['hormone','Tratamiento hormonal en curso',1]
];
const bleedFlags=[
 ['ulcer','Úlcera gastroduodenal activa',4.5],
 ['bleed','Sangrado en los 3 meses previos',4],
 ['platelets','Plaquetas <50 ×10⁹/L',4],
 ['liver','Insuficiencia hepática (INR >1.5)',2.5],
 ['icu','Ingreso en UCI/unidad coronaria',2.5],
 ['catheter','Catéter venoso central',2],
 ['rheuma','Enfermedad reumatológica',2],
 ['cancer','Neoplasia activa',2]
];
const tools=[
 {id:'hit4ts',title:'4Ts · sospecha de HIT',short:'Probabilidad preprueba de trombocitopenia inducida por heparina; 0–8 puntos.',fields:hitFields,source:'https://www.hematology.org/-/media/hematology/files/education/clinicians/guidelines-quality/documents/watermarked-pocket-guides/watermark-ash_vte_hit_pocketguide.pdf',
 warning:'Sospecha de HIT: requiere valoración inmediata de exposición, plaquetas, trombosis y pruebas específicas. Una puntuación ≥4 amerita evaluación clínica urgente. NO iniciar, continuar ni suspender anticoagulantes por esta calculadora.'},
 {id:'padua',title:'Padua · riesgo de TEV',short:'11 factores; pacientes médicos adultos hospitalizados, no quirúrgicos; 0–20 puntos.',fields:[yn('scope','¿Paciente adulto médico hospitalizado, no quirúrgico?'),...paduaFlags.map(([k,l])=>yn(k,l))],source:'https://www.ncbi.nlm.nih.gov/books/NBK585614/table/ch17.Tab17/',
 warning:'Riesgo de TEV en pacientes médicos hospitalizados. No prescribe heparina ni decide profilaxis. Excluir sangrado activo, HIT sospechada, indicaciones y contraindicaciones individuales y protocolos institucionales.'},
 {id:'improvebleed',title:'IMPROVE Bleeding · riesgo hemorrágico',short:'Estimación de hemorragia en pacientes médicos adultos hospitalizados; umbral ≥7 puntos.',fields:[
  yn('scope','¿Paciente adulto médico hospitalizado?'),
  num('age','Edad (años completos)',18,120,'años'),
  choice('sex','Sexo utilizado en el modelo original',[['male','Masculino'],['female','Femenino']]),
  num('egfr','TFG documentada para la escala',0,200,'mL/min/1.73 m²'),
  ...bleedFlags.map(([k,l])=>yn(k,l))
 ],source:'https://eval.health/improve-bleeding-risk-score',
 warning:'IMPROVE es pronóstico, no diagnostica hemorragia ni constituye contraindicación absoluta. No recomienda anticoagulantes ni los descarta. TFG debe ser clínicamente válida y sexo corresponde a la variable del modelo original.'}
];
const examples={
 hit4ts:{platelets:'2',timing:'2',thrombosis:'1',other:'1',context:'yes'},
 padua:{scope:'yes',cancer:'yes',prior:'no',mobility:'yes',thrombophilia:'no',surgery:'no',age70:'yes',failure:'no',infarct:'no',infection:'no',obesity:'no',hormone:'no'},
 improvebleed:{scope:'yes',age:'70',sex:'male',egfr:'55',ulcer:'no',bleed:'no',platelets:'no',liver:'no',icu:'yes',catheter:'yes',rheuma:'no',cancer:'yes'}
};
function parseNum(raw,field){
 if(typeof raw==='number')return Number.isFinite(raw)&&raw>=field.min&&raw<=field.max?raw:null;
 if(typeof raw!=='string'||! /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw.trim().replace(',','.')))return null;
 const n=Number(raw.trim().replace(',','.'));return Number.isFinite(n)&&n>=field.min&&n<=field.max?n:null;
}
function evaluate(tool,data){
 if(typeof tool==='string')tool=tools.find(x=>x.id===tool);
 if(!tool||!data||typeof data!=='object')return null;
 const v={},details=[];
 for(const f of tool.fields){
  const raw=data[f.key];
  if(raw===undefined||raw===null||String(raw).trim()==='')return null;
  if(f.type==='choice'){
   if(!f.options.some(([key])=>key===raw))return null;
   v[f.key]=raw;
  }else{
   const n=parseNum(raw,f);if(n===null)return null;
   if(f.key==='age'&&!Number.isInteger(n))return null;
   v[f.key]=n;
  }
 }
 if(tool.id==='hit4ts'){
  if(v.context!=='yes')return null;
  const score=['platelets','timing','thrombosis','other'].reduce((sum,k)=>sum+Number(v[k]),0);
  const classification=score<=3?'Probabilidad preprueba BAJA':score<=5?'Probabilidad preprueba INTERMEDIA':'Probabilidad preprueba ALTA';
  for(const f of tool.fields.slice(0,4))details.push(f.label+': '+v[f.key]+' puntos');
  return {value:score,display:score+' / 8',interpretation:classification+(score>=4?'. Valoración urgente de posible HIT.':'. No descarta otras urgencias.'),detail:details.join(' · '),urgent:score>=4};
 }
 if(v.scope!=='yes')return null;
 if(tool.id==='padua'){
  const score=paduaFlags.reduce((sum,[k,label,points])=>{
   if(v[k]==='yes'){details.push(label+': +'+points);return sum+points}
   return sum;
  },0);
  return {value:score,display:score+' / 20',interpretation:score>=4?'Riesgo tromboembólico ELEVADO (Padua ≥4), en población validada.':'Riesgo tromboembólico INFERIOR (Padua <4), no riesgo nulo.',detail:details.length?details.join(' · '):'Todos los factores evaluados como ausentes.',urgent:false};
 }
 const age=v.age>=85?3.5:v.age>=40?1.5:0;
 const renal=v.egfr<30?2.5:v.egfr<60?1:0;
 const male=v.sex==='male'?1:0;
 if(age)details.push('Edad: +'+age);
 if(renal)details.push('TFG: +'+renal);
 if(male)details.push('Variable sexo: +1');
 let score=age+renal+male;
 for(const [k,label,points] of bleedFlags){
  if(v[k]==='yes'){score+=points;details.push(label+': +'+points)}
 }
 return {value:score,display:score.toLocaleString('es-MX',{maximumFractionDigits:1})+' puntos',interpretation:score>=7?'Riesgo hemorrágico ELEVADO (IMPROVE ≥7).':'Sin criterio de riesgo hemorrágico elevado por IMPROVE (<7); no excluye sangrado.',detail:details.length?details.join(' · '):'Factores puntuables ausentes.',urgent:score>=7};
}
root.KidBumGuardiaPro=Object.freeze({tools,evaluate,examples});
})(typeof window!=='undefined'?window:globalThis);