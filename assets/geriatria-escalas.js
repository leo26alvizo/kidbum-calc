'use strict';
/* KidBum Geriatría: independent local scoring; no assumed normality and no
   reproduction of licensed questionnaires. Every field must be evaluated. */
(function(global){
const C=(key,label,options,help='')=>({key,label,type:'choice',options:options.map(([v,text])=>[String(v),text]),help});
const N=(key,label,min,max,help='')=>({key,label,type:'number',min,max,help});
const binary=(key,label)=>C(key,label,[[1,'Independiente en esta actividad'],[0,'Requiere ayuda, guía o supervisión']]);
const barthel=(key,label,max,desc)=>C(key,label,Array.from({length:max/5+1},(_,i)=>[i*5,(i*5)+' puntos']),desc);
const src={
 katz:'https://www.alz.org/getmedia/d548ca27-309c-43b5-a789-5de837401452/cognitive-impairment-care-planning-toolkit_012623-%281%29-%281%29.pdf',
 barthel:'https://www.sralab.org/rehabilitation-measures/barthel-index',
 lawton:'https://www.merckmanuals.com/professional/multimedia/table/lawton-instrumental-activities-of-daily-living-scale',
 frail:'https://efrailty.hsl.harvard.edu/ToolFRAILScale.html',
 sarcf:'https://www.ncbi.nlm.nih.gov/books/NBK532533/table/obesity-in-elderly.T.sarcf_questionnaire/',
 mnasf:'https://www.mna-elderly.com/mna-forms',
 tug:'https://www.cdc.gov/steadi/hcp/clinical-resources/index.html',
 sppb:'https://www.nia.nih.gov/research/resource/short-physical-performance-battery-sppb'
};
const T=[
{id:'katz',title:'Katz · actividades básicas (ABVD)',short:'6 funciones · independencia funcional 0–6',symbol:'KZ',image:'geriatria-portada.webp',source:src.katz,
 warning:'Describir funcionamiento basal real, no capacidad potencial. Una limitación en el episodio agudo puede ser transitoria. Una puntuación no diagnostica demencia ni determina destino de egreso.',
 fields:[binary('bath','Baño'),binary('dress','Vestido'),binary('toilet','Uso del sanitario'),binary('transfer','Transferencia cama-silla'),binary('continence','Continencia urinaria y fecal'),binary('feed','Alimentación')],
 calculate(v){const score=sum(v);return result(score+'/6',score===6?'Independiente en las seis funciones evaluadas':score<=2?'Dependencia importante en actividades básicas':score===4?'Limitación funcional moderada en esta escala':'Dependencia en '+(6-score)+' de seis actividades',score+' actividades independientes; '+(6-score)+' con ayuda o supervisión.');}},
{id:'barthel',title:'Barthel · actividades básicas (0–100)',short:'10 dominios · versión clásica de incrementos de 5',symbol:'BT',image:'geriatria-portada.webp',source:src.barthel,
 warning:'Versión clásica de 0–100, no la modificación Shah. Los puntos de cada actividad deben corresponder a su descriptor en la escala original; no basta calificar subjetivamente. Atención a movilidad en silla de ruedas, ayuda y supervisión. Las bandas de dependencia varían entre protocolos.',
 fields:[
 barthel('feed','Comer',10,'0 dependiente · 5 ayuda parcial · 10 independiente'),
 barthel('bath','Baño',5,'0 necesita ayuda · 5 independiente'),
 barthel('groom','Aseo personal',5,'0 necesita ayuda · 5 independiente'),
 barthel('dress','Vestirse',10,'0 dependiente · 5 ayuda parcial · 10 independiente'),
 barthel('bowel','Control de heces',10,'0 incontinente · 5 accidente ocasional · 10 continente'),
 barthel('bladder','Control urinario',10,'0 incontinente · 5 accidente ocasional · 10 continente'),
 barthel('toilet','Uso del retrete',10,'0 dependiente · 5 ayuda · 10 independiente'),
 barthel('transfer','Transferencias',15,'0 incapaz · 5 gran ayuda · 10 ayuda mínima · 15 independiente'),
 barthel('mobile','Marcha o desplazamiento',15,'0 inmóvil · 5 silla de ruedas autónoma · 10 marcha con ayuda · 15 marcha independiente'),
 barthel('stairs','Escaleras',10,'0 incapaz · 5 con ayuda · 10 independiente')
 ],
 calculate(v){const score=sum(v),level=score===100?'Independencia según Barthel':score<=20?'Dependencia total (banda orientativa)':score<=60?'Dependencia grave (banda orientativa)':score<=90?'Dependencia moderada (banda orientativa)':'Dependencia leve (banda orientativa)';return result(score+'/100',level,'Versión clásica; documentar la ayuda efectivamente necesaria y usar la misma versión en seguimientos.');}},
{id:'lawton',title:'Lawton-Brody · AIVD (8 dominios)',short:'8 actividades instrumentales · versión de puntuación 0–8 para todos',symbol:'LW',image:'geriatria-portada.webp',source:src.lawton,
 warning:'Se incluyen los 8 dominios independientemente del sexo para evitar exclusión histórica basada en roles de género. No compare este resultado 0–8 con la variante histórica masculina 0–5. No confundir tareas nunca aprendidas o no realizadas por costumbre con incapacidad; registrar contexto.',
 fields:[binary('phone','Uso de teléfono o medio de comunicación'),binary('shopping','Compras'),binary('food','Preparación de alimentos'),binary('house','Tareas del hogar'),binary('laundry','Lavado de ropa'),binary('transport','Uso del transporte'),binary('meds','Manejo de medicación'),binary('money','Administración de dinero')],
 calculate(v){const score=sum(v);return result(score+'/8',score===8?'Independencia registrada en las 8 AIVD':'Necesidad de apoyo en '+(8-score)+' AIVD', 'Registro funcional descriptivo: '+score+' independientes, '+(8-score)+' dependientes.');}},
{id:'frail',title:'FRAIL · tamizaje de fragilidad',short:'Fatiga · resistencia · marcha · enfermedades · pérdida de peso',symbol:'FR',image:'geriatria-portada.webp',source:src.frail,
 warning:'Cribado, no diagnóstico definitivo de fragilidad. Los 5 componentes requieren entrevista clínica (enfermedades según lista original y pérdida de peso involuntaria). Valorar estado basal y contexto agudo; considerar valoración geriátrica integral.',
 fields:[C('fatigue','F: Fatiga habitual',[[0,'Ausente'],[1,'Presente']]),C('resistance','R: Dificultad para subir un piso de escaleras',[[0,'No'],[1,'Sí']]),C('ambulation','A: Dificultad para caminar una cuadra aproximadamente',[[0,'No'],[1,'Sí']]),C('illness','I: Cinco o más enfermedades de la lista FRAIL',[[0,'Menos de cinco'],[1,'Cinco o más']], 'No sustituir con el número indiscriminado de diagnósticos.'),C('loss','L: Pérdida involuntaria de peso superior a 5% en un año',[[0,'No'],[1,'Sí']])],
 calculate(v){const score=sum(v);return result(score+'/5',score===0?'Sin fragilidad por FRAIL':score<=2?'Prefragilidad por FRAIL':'Tamizaje de fragilidad positivo', '0 robustez, 1–2 prefragilidad, 3–5 fragilidad.');}},
{id:'sarcf',title:'SARC-F · riesgo de sarcopenia',short:'5 preguntas · 0–10 · tamiz positivo ≥4',symbol:'SF',image:'antropometria-portada.jpg',source:src.sarcf,
 warning:'SARC-F tiene sensibilidad limitada: un resultado bajo NO descarta sarcopenia. Un tamiz positivo requiere medir fuerza muscular (dinamometría o cinco levantamientos), masa muscular y desempeño según protocolo; no equivale a diagnóstico.',
 fields:[C('strength','Fuerza: levantar/cargar aproximadamente 5 kg',[[0,'Sin dificultad'],[1,'Alguna dificultad'],[2,'Mucha dificultad o incapacidad']]),C('walk','Marcha: atravesar una habitación',[[0,'Sin dificultad'],[1,'Alguna dificultad'],[2,'Mucha dificultad, ayudas o incapacidad']]),C('rise','Levantarse de silla o cama',[[0,'Sin dificultad'],[1,'Alguna dificultad'],[2,'Mucha dificultad o incapacidad']]),C('stairs','Subir diez escalones',[[0,'Sin dificultad'],[1,'Alguna dificultad'],[2,'Mucha dificultad o incapacidad']]),C('falls','Caídas en los últimos 12 meses',[[0,'Ninguna'],[1,'1–3 caídas'],[2,'4 o más caídas']])],
 calculate(v){const score=sum(v);return result(score+'/10',score>=4?'Tamizaje positivo: posible sarcopenia':'Tamizaje negativo, NO excluye sarcopenia','Punto de corte habitual ≥4 puntos; correlacionar con fuerza y masa muscular.');}},
{id:'mnasf',title:'MNA®-SF · suma de hoja oficial',short:'Transcribe 6 puntuaciones del instrumento autorizado · 0–14',symbol:'MN',image:'geriatria-portada.webp',source:src.mnasf,
 warning:'MNA® es un instrumento con condiciones de uso y licencia. Esta herramienta NO reproduce ni sustituye el formulario oficial: aplica primero la versión autorizada y transcribe sus seis puntuaciones (A, B, C, D, E y F). No sumar simultáneamente IMC y perímetro de pantorrilla: F es un solo apartado. Tamizaje, no diagnóstico etiológico.',
 fields:[C('a','A · puntuación asignada en formulario oficial',[[0,'0'],[1,'1'],[2,'2']]),C('b','B · puntuación asignada',[[0,'0'],[1,'1'],[2,'2'],[3,'3']]),C('c','C · puntuación asignada',[[0,'0'],[1,'1'],[2,'2']]),C('d','D · puntuación asignada',[[0,'0'],[2,'2']]),C('e','E · puntuación asignada',[[0,'0'],[1,'1'],[2,'2']]),C('f','F · IMC O pantorrilla, puntuación asignada',[[0,'0'],[1,'1'],[2,'2'],[3,'3']])],
 calculate(v){const score=sum(v);return result(score+'/14',score<=7?'Tamizaje compatible con desnutrición':score<=11?'Riesgo de desnutrición':'Estado nutricional normal en este tamiz','Verificar en el formulario oficial: 0–7 desnutrición; 8–11 riesgo; 12–14 normal.');}},
{id:'tug',title:'Timed Up and Go · marcha y caídas',short:'Cronometra levantarse, recorrer 3 m, volver y sentarse',symbol:'TG',image:'geriatria-portada.webp',source:src.tug,
 warning:'Realizar solo si es seguro, con vigilancia y la ayuda habitual. El umbral STEADI ≥12 segundos es orientativo; no predice caídas con certeza y varía por población. Si la prueba es insegura o no puede completarse, NO registrar 0 segundos ni interpretar como resultado negativo.',
 fields:[C('status','¿Se completó el recorrido seguro de 3 metros?', [['done','Sí, cronometrado'],['unable','No se completó o fue inseguro']]),N('seconds','Duración en segundos (solo si completada)',0.1,300,'Registrar cronómetro real, precisión hasta centésimas; no estimar tiempos.')],
 calculate(v){if(v.status==='unable')return result('No evaluable','Prueba no completada o insegura','No interpretar como riesgo bajo: documentar razón, marcha, equilibrio y apoyo requerido.');const sec=v.seconds;return result(sec+' segundos',sec>=12?'≥12 s: marcador de riesgo de caídas (STEADI)':'<12 s: el resultado aislado no descarta riesgo de caídas','Valor medido; evaluar antecedentes de caídas, fármacos, hipotensión ortostática, marcha y equilibrio.');}},
{id:'sppb',title:'SPPB · desempeño físico',short:'Batería oficial · equilibrio, 4 m y cinco levantamientos',symbol:'SP',image:'geriatria-portada.webp',source:src.sppb,
 warning:'Aplicar el protocolo oficial NIA en condiciones seguras. Introduce las puntuaciones 0–4 ya obtenidas para equilibrio, marcha 4 m y cinco levantamientos, con sus tiempos y reglas oficiales; esta pantalla no administra el examen ni infiere puntuaciones de datos omitidos. Una puntuación baja no establece etiología.',
 fields:[C('balance','Equilibrio · puntos según prueba oficial',[[0,'0'],[1,'1'],[2,'2'],[3,'3'],[4,'4']]),C('gait','Marcha de 4 metros · puntos según tiempos oficiales',[[0,'0'],[1,'1'],[2,'2'],[3,'3'],[4,'4']]),C('chair','Cinco levantamientos de silla · puntos según tiempos oficiales',[[0,'0'],[1,'1'],[2,'2'],[3,'3'],[4,'4']])],
 calculate(v){const score=sum(v);return result(score+'/12',score<=8?'Desempeño físico reducido (criterio orientativo EWGSOP2)':'Puntuación de desempeño físico registrada','Equilibrio '+v.balance+'/4; marcha '+v.gait+'/4; silla '+v.chair+'/4. Registrar tiempos y limitaciones por separado.');}}
];
function sum(v){return Object.values(v).reduce((total,x)=>total+x,0);}
function result(display,interpretation,detail){return {display,interpretation,detail};}
function evaluate(tool,input){
 const model=typeof tool==='string'?T.find(t=>t.id===tool):tool;
 if(!model||!input||typeof input!=='object')return null;
 const values={};
 for(const f of model.fields){
  const raw=input[f.key];
  if(raw===undefined||raw===null||String(raw).trim()==='')return null;
  if(f.type==='choice'){
   if(!f.options.some(([v])=>v===String(raw)))return null;
   values[f.key]=isNaN(Number(raw))?String(raw):Number(raw);
  }else{
   const s=String(raw).trim().replace(',','.');
   if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s))return null;
   const n=Number(s);if(!Number.isFinite(n)||n<f.min||n>f.max)return null;values[f.key]=n;
  }
 }
 if(model.id==='tug'){
  if(values.status==='done'&&(!Number.isFinite(values.seconds)||values.seconds<=0))return null;
  if(values.status==='unable'&&values.seconds!==0) return null;
 }
 return model.calculate(values);
}
function activeFields(tool,input){
 if(tool.id!=='tug')return tool.fields;
 return tool.fields;
}
const examples=Object.freeze({
 katz:{bath:'1',dress:'1',toilet:'0',transfer:'1',continence:'0',feed:'1'},
 barthel:{feed:'10',bath:'0',groom:'5',dress:'5',bowel:'10',bladder:'5',toilet:'5',transfer:'10',mobile:'10',stairs:'5'},
 lawton:{phone:'1',shopping:'0',food:'0',house:'1',laundry:'0',transport:'0',meds:'1',money:'1'},
 frail:{fatigue:'1',resistance:'1',ambulation:'1',illness:'0',loss:'0'},
 sarcf:{strength:'1',walk:'1',rise:'2',stairs:'1',falls:'1'},
 mnasf:{a:'1',b:'2',c:'1',d:'0',e:'1',f:'2'},
 tug:{status:'done',seconds:'15.2'},
 sppb:{balance:'2',gait:'3',chair:'1'}
});
global.KidBumGeriatria=Object.freeze({tools:T,evaluate,examples,sources:src});
})(window);
