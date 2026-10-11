/* KidBum CALC Pediatrics v0.6, pure calculations. No API, no patient storage.
 Sources: WHO Anthro (2006 LMS), NICE NG29, AAP Pediatrics 2018 isotonic maintenance,
 KDIGO AKI urine-output criteria, AAP HealthyChildren corrected age.
 General educational tool; all treatment plans require supervision.
 */
(function(root){
'use strict';
const tables=root.KidBumGrowthTables||{};
const perAge=['wfa','lhfa','hcfa','bmifa'];
const allGrowth=[...perAge,'wfl','wfh'];
const cache=Object.create(null);
function num(v){if(typeof v==='boolean'||v===null||v===undefined||v===''||String(v).trim()==='')return NaN;const n=Number(String(v).trim().replace(',','.'));return Number.isFinite(n)?n:NaN}
function valid(v,min,max){return Number.isFinite(v)&&v>=min&&v<=max}
function date(v){
 if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return null;
 const [y,m,d]=v.split('-').map(Number),ms=Date.UTC(y,m-1,d),x=new Date(ms);
 if(y<1900||y>2100||x.getUTCFullYear()!==y||x.getUTCMonth()!==m-1||x.getUTCDate()!==d)return null;
 return Math.round(ms/86400000);
}
function daysSince(o){
 const b=date(o.birth),a=date(o.asof);if(b===null||a===null)return {error:['Escribe fechas válidas de nacimiento y valoración.']};
 const days=a-b;if(days<0)return {error:['La valoración es anterior al nacimiento.']};
 if(days>1826)return {error:['Tablas OMS 2006 disponibles solo de 0 a 1,826 días (5 años).']};
 return {days};
}
function outcome(v,unit,interpretation,notes,detail,other={}){
 if(!Number.isFinite(v))return {error:['No fue posible producir un resultado numérico válido.']};
 return {value:v,unit,interpretation,notes,detail,...other};
}
function lmsRow(kind,sex,coordinate){
 const raw=tables[kind];if(!raw||!raw[sex-1])return null;
 const i=perAge.includes(kind)?Math.round(coordinate):
  Math.round((coordinate-(kind==='wfl'?45:65))*10);
 const expected=perAge.includes(kind)?i:(kind==='wfl'?45:65)+i/10;
 if(!Number.isFinite(coordinate)||Math.abs(expected-coordinate)>0.052||i<0)return null;
 const key=kind+':'+sex;
 if(!cache[key])cache[key]=raw[sex-1].split(';');
 const entry=cache[key][i];if(!entry)return null;
 const v=entry.split(',').map(Number);
 return v.length===3&&v.every(Number.isFinite)?v:null;
}
function zOf(x,arr){const [L,M,S]=arr;return Math.abs(L)<1e-10?Math.log(x/M)/S:(Math.pow(x/M,L)-1)/(L*S)}
function atZ(z,arr){const [L,M,S]=arr;const b=1+L*S*z;return Math.abs(L)<1e-10?M*Math.exp(S*z):b>0?M*Math.pow(b,1/L):NaN}
function cdf(z){
 const a=Math.abs(z),t=1/(1+0.2316419*a);
 const pdf=Math.exp(-.5*a*a)/Math.sqrt(2*Math.PI);
 const tail=pdf*(0.319381530*t-0.356563782*t*t+1.781477937*t*t*t-1.821255978*t*t*t*t+1.330274429*t*t*t*t*t);
 return z>=0?1-tail:tail;
}
const quantiles=[['P3',-1.8807936],['P10',-1.2815516],['P25',-.6744898],['P50',0],['P75',.6744898],['P90',1.2815516],['P97',1.8807936]];
function growth(kind,o){
 if(o.sex!=='male'&&o.sex!=='female')return {error:['Selecciona la referencia OMS por sexo.']};
 if(o.term!=='true')return {error:['Este módulo usa edad cronológica y estándares OMS 0–5 años para nacidos a término. En prematuridad, utiliza edad corregida y curvas apropiadas bajo supervisión.']};
 const age=daysSince(o);if(age.error)return age;
 const male=o.sex==='male'?1:2;
 const isLength=age.days<731;
 let x=NaN;
 if(kind==='wfa')x=num(o.weight);
 if(kind==='lhfa')x=num(o.stature);
 if(kind==='hcfa')x=num(o.head);
 if(kind==='bmifa')x=num(o.weight)/Math.pow(num(o.stature)/100,2);
 if(kind==='wfl')x=num(o.weight);
 const s=num(o.stature),method=o.method;
 if(['lhfa','bmifa','wfl'].includes(kind)){
   if(method!=='length'&&method!=='height')return {error:['Selecciona cómo se midió la longitud/talla.']};
   if(isLength&&method!=='length')return {error:['Antes de 24 meses, utiliza longitud recumbente. No se aplica una corrección automática de 0.7 cm; confirma la medida y su método.']};
   if(!isLength&&method!=='height')return {error:['Desde 24 meses, utiliza talla de pie. Confirma el método antes de calcular.']};
 }
 if(!valid(x,kind==='bmifa'?6:kind==='hcfa'?20:kind==='lhfa'?40:1,kind==='bmifa'?60:kind==='hcfa'?70:kind==='lhfa'?140:75))return {error:['Medición fuera del rango permitido; comprueba valor y unidades.']};
 if(['bmifa','wfl'].includes(kind)&&!valid(s,40,140))return {error:['Longitud o talla: dato faltante o inválido.']};
 const lookupKind=kind==='wfl'?(isLength?'wfl':'wfh'):kind;
 const coordinate=kind==='wfl'?s:age.days;
 const arr=lmsRow(lookupKind,male,coordinate);
 if(!arr)return {error:['Dato fuera de los límites de las tablas OMS originales para la edad o longitud/talla seleccionada.']};
 const z=zOf(x,arr),pct=100*cdf(z);
 if(!Number.isFinite(z)||!Number.isFinite(pct))return {error:['No se pudo calcular el puntaje Z. Revisa las mediciones.']};
 let interpretation;
 if(kind==='wfa')interpretation=z< -3?'Peso muy bajo para la edad (Z < −3)':z< -2?'Peso bajo para la edad (Z < −2)':z>2?'Peso elevado para edad: evaluar talla e IMC/longitud':'Peso para edad dentro de ±2 DE';
 else if(kind==='lhfa')interpretation=z< -3?'Longitud/talla muy baja para la edad':z< -2?'Longitud/talla baja para la edad':z>2?'Longitud/talla alta para la edad':'Longitud/talla dentro de ±2 DE';
 else if(kind==='hcfa')interpretation=z< -2?'Perímetro cefálico <−2 DE: confirmar y evaluar tendencia':z>2?'Perímetro cefálico >+2 DE: confirmar y evaluar tendencia':'Perímetro cefálico entre −2 y +2 DE';
 else interpretation=z< -3?'Índice <−3 DE: déficit antropométrico importante':z< -2?'Índice <−2 DE: déficit antropométrico':z>3?'Índice >+3 DE: exceso importante según referencia OMS':z>2?'Índice >+2 DE: exceso según referencia OMS':'Índice entre −2 y +2 DE';
 const um=kind==='wfa'||kind==='wfl'?'kg':kind==='bmifa'?'kg/m²':'cm';
 const table={headers:quantiles.map(x=>x[0]),values:quantiles.map(p=>Number(atZ(p[1],arr).toFixed(kind==='bmifa'?2:1))),unit:um,caption:'Valores OMS 2006 para la referencia seleccionada. Tabla orientativa, no cortes diagnósticos automáticos.'};
 const label={wfa:'Peso/edad',lhfa:'Longitud/talla/edad',hcfa:'Perímetro cefálico/edad',bmifa:'IMC/edad',wfl:isLength?'Peso/longitud':'Peso/talla'}[kind];
 const notes=['Referencia OMS 2006 basada en sexo y edad cronológica; válida para población apropiada, no diagnostica por sí sola.','Interpretar con historia clínica, mediciones seriadas, edad gestacional y trayectoria de crecimiento.',kind==='wfa'?'Peso/edad NO permite diagnosticar obesidad sin evaluar talla y otros indicadores.':'No interpretar percentil aislado como indicación de tratamiento.'];
 if(['lhfa','bmifa','wfl'].includes(kind))notes.push('Método: longitud recumbente antes de 24 meses; talla de pie desde 24 meses.');
 if(Math.abs(z)>3)notes.push('Z fuera de ±3: confirmar medición; la conversión extrema por LMS puede diferir de los ajustes utilizados por WHO Anthro.');
 const labelPercent=pct<0.01?'<P0.01':pct>99.99?'>P99.99':'P'+pct.toFixed(1);
 return outcome(pct,'percentil',interpretation,notes,label+': Z='+z.toFixed(2)+'; '+age.days+' días de edad; valor='+x.toFixed(2)+' '+um+'. LMS OMS: L='+arr[0]+', M='+arr[1]+', S='+arr[2]+'.',
 {display:labelPercent,table,zScore:z});
}
function urinary(o){
 const kg=num(o.weight),ml=num(o.urine),h=num(o.hours);
 if(!valid(kg,.4,200)||!valid(ml,0,10000)||!valid(h,.25,48))return {error:['Introduce peso (kg), volumen urinario (mL) y tiempo observado (h) válidos.']};
 if(!['neonate','child'].includes(o.agegroup))return {error:['Selecciona grupo de edad (neonato o mayor de 28 días).']};
 const v=ml/kg/h;
 const interpretation=o.agegroup==='neonate'?'Diuresis neonatal cuantificada; interpretar con protocolos de neonatología':v<.5&&h>=6?'Diuresis <0.5 mL/kg/h durante ≥6 h: alarma renal que requiere evaluación':v<.5?'Diuresis <0.5 mL/kg/h en intervalo menor a 6 horas':v>4?'Diuresis alta para investigar según hidratación y glucosa':'Diuresis ≥0.5 mL/kg/h en el periodo registrado';
 return outcome(v,'mL/kg/h',interpretation,[
 'La diuresis es uno de varios indicadores de perfusión y función renal; se interpretan también creatinina, ingresos, pérdidas y exploración.',
 o.agegroup==='neonate'?'En recién nacidos, especialmente prematuros, usar referencias y criterios neonatales específicos.':'En mayores de 28 días, <0.5 mL/kg/h por ≥6 h puede cumplir un criterio urinario KDIGO; no establece etiología ni diagnóstico aislado.',
 'Verificar si la medición de orina es completa. La ausencia de registro no equivale a anuria.'
 ],'Volumen urinario '+ml+' mL ÷ ('+kg+' kg × '+h+' h).');
}
function fluidBalance(o){
 const w=num(o.weight),h=num(o.hours),iv=num(o.iv),enteral=num(o.enteral),urine=num(o.urine),other=num(o.other);
 if(!valid(w,.4,200)||!valid(h,.5,48)||![iv,enteral,urine,other].every(x=>valid(x,0,20000)))return {error:['Completa peso, duración y TODOS los ingresos/egresos en mL (usar 0 cuando corresponda).']};
 const income=iv+enteral,loss=urine+other,net=income-loss;
 return outcome(net,'mL de balance',net>0?'Balance registrado positivo':net<0?'Balance registrado negativo':'Balance registrado cero',
 ['Balance registrado ≠ balance fisiológico total: puede omitir pérdidas insensibles, sangre, heces no cuantificadas y evaporación.','Corroborar pesos, estado circulatorio, pérdidas y metas clínicas; no prescribe velocidad de infusión.'],
 'Ingresos='+income+' mL; egresos='+loss+' mL; balance='+net.toFixed(1)+' mL ('+(net/w).toFixed(2)+' mL/kg) en '+h+' horas. Diuresis registrada='+(urine/w/h).toFixed(2)+' mL/kg/h.');
}
function holliday(o){
 const w=num(o.weight),days=num(o.ageDays);
 if(!valid(w,.4,200)||!Number.isInteger(days)||!valid(days,28,6574))return {error:['La fórmula se presenta para 28 días a 18 años. Requiere edad en días y peso válidos.']};
 const daily=Math.min(w,10)*100+Math.min(Math.max(w-10,0),10)*50+Math.max(w-20,0)*20;
 return outcome(daily,'mL/24 h','Mantenimiento teórico Holliday–Segar, NO es prescripción',
 ['No utilizar para reanimación, deshidratación, pérdidas persistentes ni para ajustar por sí solo enfermedad grave.','La AAP recomienda líquidos isotónicos en muchos niños de 28 días a 18 años que requieren mantenimiento IV, con excepciones importantes; composición, volumen y monitoreo deben individualizarse.','En pacientes críticos, exceso de ADH, falla renal/cardiaca, hepatopatía y otros escenarios, la necesidad puede ser menor; consultar protocolo y electrólitos.',...(daily>2000?['NICE NG29: rara vez se requieren más de 2,000 mL/día en niñas o 2,500 mL/día en niños; este cálculo no debe extrapolarse como prescripción automática.']:[])],
 'Holliday–Segar: 100 mL/kg/d para primeros 10 kg + 50 mL/kg/d para siguientes 10 kg + 20 mL/kg/d por kg adicional. Volumen teórico/24 = '+daily.toFixed(1)+' mL; equivalente horario exacto='+(daily/24).toFixed(2)+' mL/h.');
}
function rule421(o){
 const w=num(o.weight),days=num(o.ageDays);
 if(!valid(w,.4,200)||!Number.isInteger(days)||!valid(days,28,6574))return {error:['Regla 4-2-1 orientativa solo para niños ≥28 días hasta 18 años.']};
 const rate=Math.min(w,10)*4+Math.min(Math.max(w-10,0),10)*2+Math.max(w-20,0);
 return outcome(rate,'mL/h','Regla rápida 4–2–1 (estimación horaria, no prescripción)',
 ['Es un atajo clínico de mantenimiento; NO equivale exactamente a Holliday–Segar diario dividido entre 24.','Las necesidades reales varían por edad, enfermedad y ADH; verificar composición isotónica cuando corresponda, glucosa, electrólitos y protocolo.','No usar como velocidad automática de tratamiento en neonatos ni reanimación.'],
 'Primeros 10 kg: 4 mL/kg/h; siguientes 10 kg: 2 mL/kg/h; peso restante: 1 mL/kg/h. Equivale a '+(rate*24).toFixed(1)+' mL/24 h por esta regla.');
}
function neonatal(o){
 const w=num(o.weight),day=num(o.day);
 if(!valid(w,1,8)||!Number.isInteger(day)||!valid(day,1,28))return {error:['Solo recién nacido a término, día de vida 1–28 y peso 1–8 kg.']};
 const band=day===1?[50,60]:day===2?[70,80]:day===3?[80,100]:day===4?[100,120]:[120,150];
 const low=band[0]*w,high=band[1]*w;
 return outcome((low+high)/2,'mL/24 h (punto medio)','Rango de referencia neonatal: '+low.toFixed(1)+'–'+high.toFixed(1)+' mL/24 h',
 ['Mostrar un intervalo NO equivale a prescribir su punto medio. El resultado numérico central se muestra solo como referencia matemática.','Rangos NICE NG29 orientativos para neonatos a término; individualizar según edad, diuresis, pérdidas, estado hemodinámico, peso y glucosa/electrólitos.','No extrapolar a prematuros, falla renal, cardiopatía u otras enfermedades sin guía de neonatología.'],
 'Día '+day+': '+band[0]+'–'+band[1]+' mL/kg/día × '+w+' kg = '+low.toFixed(1)+'–'+high.toFixed(1)+' mL/día.',
 {display:low.toFixed(0)+'–'+high.toFixed(0)+' mL/d'});
}
function correctedAge(o){
 const birth=date(o.birth),now=date(o.asof),weeks=num(o.gaw),extra=num(o.gad);
 if(birth===null||now===null||now<birth)return {error:['Fechas inválidas o fecha de valoración anterior al nacimiento.']};
 if(!Number.isInteger(weeks)||!valid(weeks,22,40)||!Number.isInteger(extra)||!valid(extra,0,6))return {error:['Edad gestacional al nacer: semanas enteras (22–40) y días (0–6).']};
 const chron=now-birth;
 if(chron>1096)return {error:['Esta calculadora de edad corregida se limita a los primeros 3 años.']};
 const premature=Math.max(0,280-(weeks*7+extra));
 const adj=chron-premature;const neg=adj<0?'Todavía antes de 40 semanas posmenstruales':'Edad corregida calculada';
 const abs=Math.abs(adj),sign=adj<0?'-':'';
 return outcome(adj,'días corregidos',neg,
 ['Para nacidos prematuros la edad corregida suele emplearse en el seguimiento temprano; revisar edad, grado de prematuridad y tablas específicas.','No utilizar automáticamente estándares OMS para neonatos prematuros antes de alcanzar edad a término.','Es una conversión cronológica; no evalúa maduración ni neurodesarrollo.'],
 'Edad cronológica='+chron+' días; prematuridad de '+premature+' días respecto a 40 semanas; edad corregida='+sign+Math.floor(abs/7)+' semanas y '+(abs%7)+' días.',
 {display:sign+Math.floor(abs/7)+' sem + '+(abs%7)+' d'});
}
function measuredDehydration(o){
 const prior=num(o.prior),current=num(o.current);
 if(!valid(prior,.4,200)||!valid(current,.4,200)||current>prior)return {error:['Se requiere peso previo fiable igual o mayor al peso actual, ambos en kg.']};
 const pct=(prior-current)/prior*100;if(pct>20)return {error:['Pérdida calculada >20%: verifica pesos; requiere valoración clínica urgente.']};
 return outcome(pct,'% peso perdido','Porcentaje de pérdida de peso entre mediciones',
 ['Este cálculo solo es interpretable como posible déficit hídrico si el peso previo era confiable y el cambio se debe principalmente a líquidos.','No equiparar pérdida ponderal con deshidratación en todos los contextos (nutrición, ropa, básculas, edema, crecimiento).','Signos de choque, alteración neurológica o mala perfusión requieren atención urgente independientemente de este cálculo.'],
 '[(peso previo−peso actual)/peso previo]×100 = '+pct.toFixed(2)+'%; diferencia '+(prior-current).toFixed(3)+' kg.');
}
const functions={
 pedwfa:o=>growth('wfa',o),
 pedlhfa:o=>growth('lhfa',o),
 pedhcfa:o=>growth('hcfa',o),
 pedbmifa:o=>growth('bmifa',o),
 pedwfl:o=>growth('wfl',o),
 pediou:urinary,
 pedbalance:fluidBalance,
 pedholliday:holliday,
 ped421:rule421,
 pedneofluids:neonatal,
 pedcorrected:correctedAge,
 peddehydration:measuredDehydration
};
root.KidBumPediatrics=Object.freeze({calculate:(id,input)=>functions[id]?functions[id](input||{}):{error:['Herramienta pediátrica desconocida.']},ids:Object.freeze(Object.keys(functions)),_test:Object.freeze({lmsRow,zOf,atZ,cdf})});
})(typeof globalThis!=='undefined'?globalThis:this);
