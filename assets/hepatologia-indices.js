'use strict';
/* Six local hepatology equations. Inputs are measurements, not default normal values.
 * This is educational decision support, not a diagnostic device. */
(function(global){
const N=(key,label,min,max,unit='',step='any')=>({key,label,type:'number',min,max,unit,step});
const C=(key,label,options)=>({key,label,type:'choice',options:options.map(([v,t])=>[String(v),t])});
const refs=Object.freeze({
 rfactor:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9936988/',
 deritis:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8546458/',
 apri:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11299976/',
 albi:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11551678/',
 fli:'https://pmc.ncbi.nlm.nih.gov/articles/PMC1636651/',
 nfs:'https://onlinelibrary.wiley.com/doi/full/10.1002/hep.21496'
});
const out=(value,interpretation,detail)=>({value,interpretation,detail});
const fixed=(n,places=2)=>Number(n.toFixed(places)).toLocaleString('es-MX',{maximumFractionDigits:places,minimumFractionDigits:places});
const tools=[
 {id:'rfactor',title:'Factor R · patrón de lesión hepática',short:'ALT y fosfatasa alcalina respecto de sus límites normales',source:refs.rfactor,image:'atlas-liver.jpg',
 warning:'El factor R caracteriza el patrón BIOQUÍMICO, especialmente en sospecha de lesión hepática inducida por medicamentos (DILI). No diagnostica DILI ni obstrucción biliar. Usar ALT y FA tomadas simultáneamente al inicio de la evaluación; sus límites superiores normales deben corresponder al mismo laboratorio. Confirmar origen hepático de FA (p. ej., GGT). Revisar bilirrubina, INR, síntomas y causas alternativas. El patrón puede cambiar con el tiempo.',
 fields:[N('alt','ALT (TGP) medida',1,10000,'U/L'),N('altUln','Límite superior normal de ALT del laboratorio',1,300,'U/L'),N('alp','Fosfatasa alcalina (FA/ALP) medida',1,10000,'U/L'),N('alpUln','Límite superior normal de FA del laboratorio',1,800,'U/L')],
 calc(v){const a=v.alt/v.altUln,p=v.alp/v.alpUln,r=a/p;
  if(a<=1&&p<=1)return out('R = '+fixed(r),'Sin patrón de lesión clasificable por esta regla','ALT y FA no superan sus límites superiores normales; no clasificar como lesión hepatocelular, colestásica o mixta únicamente por el cociente.');
  const type=r>=5?'Patrón hepatocelular':r<=2?'Patrón colestásico':'Patrón mixto';
  return out('R = '+fixed(r),type,'ALT '+fixed(a)+' × LSN; FA '+fixed(p)+' × LSN. Convención: R ≤2 colestásico; 2<R<5 mixto; R ≥5 hepatocelular. La cifra no mide gravedad ni demuestra etiología.');
 }},
 {id:'deritis',title:'Cociente AST/ALT · De Ritis',short:'Relación de aminotransferasas, sin diagnóstico automático',source:refs.deritis,image:'atlas-liver.jpg',
 warning:'AST/ALT es inespecífico. Puede variar con enfermedad muscular, hemólisis, alcohol, ejercicio, fármacos y cirrosis; un resultado ≥2 NO diagnostica hepatopatía alcohólica, y un resultado <1 NO descarta fibrosis o cirrosis. Interpretar con historia, contexto y otras pruebas.',
 fields:[N('ast','AST (TGO)',1,10000,'U/L'),N('alt','ALT (TGP)',1,10000,'U/L')],
 calc(v){const r=v.ast/v.alt;return out(fixed(r)+' ×','Relación AST/ALT calculada (no diagnóstica)','AST '+v.ast+' U/L ÷ ALT '+v.alt+' U/L. El resultado aislado carece de especificidad etiológica.');}},
 {id:'apri',title:'APRI · índice AST/plaquetas',short:'Marcador no invasivo de fibrosis, dependiente de etiología',source:refs.apri,image:'atlas-liver.jpg',
 warning:'APRI fue desarrollado sobre todo para hepatitis viral crónica; los puntos de corte varían según etiología y población. No es una medida directa de fibrosis ni reemplaza elastografía o FIB-4. AST aguda y trombocitopenia por otras causas distorsionan el resultado; se requieren U/L y plaquetas ×10⁹/L.',
 fields:[N('ast','AST medida',1,10000,'U/L'),N('astUln','Límite superior normal AST del laboratorio',1,300,'U/L'),N('platelets','Plaquetas',1,1500,'×10⁹/L')],
 calc(v){const r=(v.ast/v.astUln)*100/v.platelets;return out(fixed(r),'APRI calculado · sin estadio automático','[(AST / LSN AST) × 100] / plaquetas (×10⁹/L). Los puntos de corte no son intercambiables entre hepatitis viral y MASLD.');}},
 {id:'albi',title:'ALBI · albúmina-bilirrubina',short:'Puntuación de reserva hepática (grados 1–3)',source:refs.albi,image:'atlas-liver.jpg',
 warning:'ALBI se desarrolló en pacientes con carcinoma hepatocelular y se estudia en otras hepatopatías: NO sustituye Child-Pugh ni MELD, ni determina por sí solo indicaciones de tratamiento o trasplante. Las unidades importan: esta pantalla recibe bilirrubina mg/dL y albúmina g/dL y convierte internamente a µmol/L y g/L.',
 fields:[N('bilirubin','Bilirrubina total',0.05,80,'mg/dL'),N('albumin','Albúmina sérica',0.5,6.5,'g/dL')],
 calc(v){const b=v.bilirubin*17.104,a=v.albumin*10,score=0.66*Math.log10(b)-0.085*a,grade=score<=-2.60?'Grado 1':score<=-1.39?'Grado 2':'Grado 3';
 return out('ALBI '+fixed(score,3),grade+' de ALBI','Conversión: bilirrubina '+fixed(b,2)+' µmol/L y albúmina '+fixed(a,1)+' g/L; ALBI = 0.66 × log₁₀(bilirrubina µmol/L) − 0.085 × albúmina g/L. Grado 1 ≤−2.60; grado 2 >−2.60 a ≤−1.39; grado 3 >−1.39.');}},
 {id:'fli',title:'Fatty Liver Index · FLI',short:'Índice de esteatosis histórica 0–100',source:refs.fli,image:'atlas-liver.jpg',
 warning:'El FLI es un modelo poblacional para esteatosis, NO porcentaje de grasa, probabilidad individual exacta ni diagnóstico de MASLD/MASH. FLI <30 y ≥60 proceden de la cohorte original y requieren cautela según población. No informa estadio de fibrosis ni debe retrasar pruebas apropiadas.',
 fields:[N('bmi','Índice de masa corporal',12,75,'kg/m²'),N('waist','Circunferencia de cintura',40,220,'cm'),N('tg','Triglicéridos',10,2000,'mg/dL'),N('ggt','GGT',1,2500,'U/L')],
 calc(v){const z=0.953*Math.log(v.tg)+0.139*v.bmi+0.718*Math.log(v.ggt)+0.053*v.waist-15.745;
 const score=100/(1+Math.exp(-z));
 const interpretation=score<30?'FLI <30: esteatosis menos probable en cohorte original':score>=60?'FLI ≥60: compatible con mayor probabilidad de esteatosis':'FLI 30–<60: zona intermedia';
 return out(fixed(score,1)+'/100',interpretation,'Transformación logística original con ln de triglicéridos (mg/dL) y GGT (U/L); IMC en kg/m² y cintura en cm. El FLI no es la proporción de grasa hepática.');}},
 {id:'nfs',title:'NAFLD Fibrosis Score · NFS (histórico)',short:'Estimación antigua de riesgo de fibrosis avanzada en NAFLD',source:refs.nfs,image:'atlas-liver.jpg',
 warning:'NFS es una escala histórica derivada para NAFLD. En la práctica actual de MASLD, FIB-4 suele ser primera línea y los casos indeterminados o de riesgo necesitan evaluación adicional (p. ej. elastografía). NFS rinde peor en menores de 35 años, adultos mayores y diabetes; no usar para estadificar histológicamente ni sustituir evaluación especializada.',
 fields:[N('age','Edad',18,100,'años'),N('bmi','IMC',12,75,'kg/m²'),C('ifg','Glucosa en ayuno alterada o diabetes diagnosticada',[['no','No, se verificó su ausencia'],['yes','Sí, al menos una está presente']]),N('ast','AST',1,10000,'U/L'),N('alt','ALT',1,10000,'U/L'),N('platelets','Plaquetas',1,1500,'×10⁹/L'),N('albumin','Albúmina',0.5,6.5,'g/dL')],
 calc(v){const score=-1.675+0.037*v.age+0.094*v.bmi+(v.ifg==='yes'?1.13:0)+0.99*(v.ast/v.alt)-0.013*v.platelets-0.66*v.albumin;
 const label=score< -1.455?'Por debajo del umbral histórico inferior':score>0.676?'Por encima del umbral histórico superior':'Resultado indeterminado por NFS';
 return out(fixed(score,3),label,'Umbrales históricos: <−1.455 (baja probabilidad de fibrosis avanzada); −1.455 a 0.676 (indeterminado); >0.676 (mayor probabilidad en población NAFLD original). Interpretar junto a FIB-4 y contexto actual de MASLD.');}}
];
const examples=Object.freeze({
 rfactor:{alt:'280',altUln:'40',alp:'240',alpUln:'120'},
 deritis:{ast:'84',alt:'45'},
 apri:{ast:'80',astUln:'40',platelets:'200'},
 albi:{bilirubin:'1',albumin:'4'},
 fli:{bmi:'30',waist:'105',tg:'200',ggt:'70'},
 nfs:{age:'50',bmi:'30',ifg:'yes',ast:'80',alt:'60',platelets:'180',albumin:'3.6'}
});
function evaluate(id,input){
 const def=typeof id==='string'?tools.find(t=>t.id===id):id;
 if(!def||!input||typeof input!=='object')return null;
 const values={};
 for(const f of def.fields){
  const raw=input[f.key];
  if(raw===undefined||raw===null||String(raw).trim()==='')return null;
  if(f.type==='choice'){
   const choice=String(raw);
   if(!f.options.some(o=>o[0]===choice))return null;
   values[f.key]=choice;
  }else{
   const s=String(raw).trim().replace(',','.');
   if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s))return null;
   const n=Number(s);
   if(!Number.isFinite(n)||n<f.min||n>f.max)return null;
   values[f.key]=n;
  }
 }
 return def.calc(values);
}
global.KidBumHepatologia=Object.freeze({tools,evaluate,examples,references:refs});
})(window);
