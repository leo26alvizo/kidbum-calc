/* KidBum Pediatrics Rapid · v0.10.39
 * Pure, conservative clinical classification. No patient records or network.
 * PAT: Horeczko et al., J Emerg Nurs (PMC7182162); Pediatric Assessment Triangle.
 * Wood-Downes modified by Ferrés: Mexican bronchiolitis GPC (ISSSTESON/CENETEC),
 * scoring 0–14 across 6 domains; historical cutoffs have small boundary gaps.
 * Kramer: IMSS-262-19; AAP 2022 cautions against estimated serum bilirubin.
 */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.KidBumPediatricRapid=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const options=Object.freeze({
  sibilancias:Object.freeze([0,1,2,3]),
  tiraje:Object.freeze([0,1,2,3]),
  fr:Object.freeze([0,1,2,3]),
  fc:Object.freeze([0,1]),
  ventilacion:Object.freeze([0,1,2,3]),
  cianosis:Object.freeze([0,1])
 });
 function safeChoice(value,values){return values.includes(value)?value:null;}
 function wood(values){
  const input=values||{},fields={},missing=[];
  for(const [name,allowed] of Object.entries(options)){
   const raw=input[name];
   const parsed=(typeof raw==='string'&&/^\d+$/.test(raw))?Number(raw):raw;
   const val=safeChoice(parsed,allowed);
   if(val===null)missing.push(name);else fields[name]=val;
  }
  const alerts=[];
  if(fields.cianosis===1)alerts.push('Cianosis presente: valorar oxigenación y respuesta inmediata; el puntaje NO reduce la prioridad.');
  if(fields.ventilacion===3)alerts.push('Tórax silente: posible obstrucción crítica o agotamiento. Escalamiento inmediato.');
  if(fields.ventilacion===2)alerts.push('Entrada de aire muy disminuida: evaluación presencial urgente.');
  if(missing.length)return {ready:false,value:null,max:14,missing,alerts,urgency:alerts.length?'critica':'pendiente',
   message:'Completa los seis dominios para obtener el puntaje. Las alertas ya identificadas requieren atención sin esperar la suma.'};
  const total=Object.values(fields).reduce((a,b)=>a+b,0);
  const grade=total>=8?'Grave':total>=4?'Moderada':total>=1?'Leve':'Sin hallazgos puntuables';
  const emergency=total>=8||fields.cianosis===1||fields.ventilacion===3;
  const urgent=emergency||total>=4||fields.ventilacion===2;
  return {ready:true,value:total,max:14,grade,urgency:emergency?'critica':urgent?'urgente':'revalorar',alerts,
   message:emergency?'Señales de compromiso importante: valorar ABCDE y solicitar apoyo inmediato.':
    total>=4?'Dificultad respiratoria que requiere valoración y reevaluación próximas.':
    'Puntuación baja NO descarta hipoxemia, apnea ni deterioro. Correlacionar con SpO₂ y clínica.',
   parts:fields};
 }
 function tep(values){
  const v=values||{},a=v.apariencia,b=v.respiracion,c=v.circulacion;
  if(!['normal','alterada'].includes(a)||!['normal','alterada'].includes(b)||!['normal','alterada'].includes(c))
   return {ready:false,pattern:'Evaluación incompleta',urgency:'pendiente',
    message:'Marca normal o alterado en los tres lados. No asumir normalidad cuando falta una observación.'};
  const A=a==='alterada',B=b==='alterada',C=c==='alterada';
  let pattern,urgency,explanation;
  if(!A&&!B&&!C){pattern='Sin alteraciones evidentes en el TEP';urgency='revalorar';explanation='La impresión inicial no muestra cambios en los tres componentes. No excluye enfermedad grave oculta.';}
  else if(!A&&B&&!C){pattern='Patrón de dificultad respiratoria';urgency='urgente';explanation='Trabajo respiratorio alterado con apariencia y circulación cutánea conservadas.';}
  else if(A&&B&&!C){pattern='Patrón de posible falla respiratoria';urgency='critica';explanation='Apariencia y respiración alteradas: evaluar oxigenación y ventilación de inmediato.';}
  else if(!A&&!B&&C){pattern='Patrón compatible con choque compensado';urgency='urgente';explanation='Alteración de circulación cutánea con apariencia conservada; comprobar perfusión y signos vitales.';}
  else if(A&&!B&&C){pattern='Patrón compatible con choque descompensado';urgency='critica';explanation='Alteración de apariencia y perfusión cutánea; no equivale a confirmar hipotensión.';}
  else if(A&&!B&&!C){pattern='Posible disfunción neurológica o metabólica';urgency='urgente';explanation='Apariencia alterada sin hallazgos respiratorios o circulatorios visibles; verificar glucosa y nivel de conciencia.';}
  else if(!A&&B&&C){pattern='Patrón mixto respiratorio y circulatorio';urgency='critica';explanation='No existe una categoría única suficientemente específica para esta combinación; valorar ambos compromisos de inmediato.';}
  else {pattern='Patrón de posible falla cardiopulmonar';urgency='critica';explanation='Los tres componentes alterados son un patrón de máximo riesgo. No supone por sí solo paro confirmado.';}
  return {ready:true,pattern,urgency,explanation,
   message:urgency==='critica'?'Priorizar ABCDE, activar equipo de respuesta y reevaluar sin demora.':
    urgency==='urgente'?'Evaluación clínica urgente, signos vitales y reevaluación continua.':
    'Continuar evaluación primaria y secundaria; repetir TEP ante cambios.',
   parts:{apariencia:a,respiracion:b,circulacion:c}};
 }
 const kramerZones=Object.freeze([
  'Sin ictericia visible',
  'Cabeza y cuello',
  'Tronco superior hasta el ombligo',
  'Tronco inferior y muslos',
  'Brazos y segmentos distales de las piernas',
  'Palmas y plantas'
 ]);
 function kramer(values){
  const input=values||{},raw=input.zona,zone=/^[0-5]$/.test(String(raw))?Number(raw):null;
  if(zone===null){
   const urgent=input.primeras24===true||input.neurologico===true;
   const messages=[];
   if(input.primeras24===true)messages.push('Ictericia durante las primeras 24 horas: medición objetiva urgente.');
   if(input.neurologico===true)messages.push('Signos neurológicos presentes: evaluación neonatal inmediata.');
   return {ready:false,zone:null,urgency:urgent?'critica':'pendiente',
    message:urgent?'No esperar selección anatómica para activar valoración neonatal.':'Selecciona la zona más distal donde se observa ictericia.',alerts:messages};
  }
  const flags=[
   ['primeras24','Ictericia en las primeras 24 horas: medición urgente de bilirrubina total sérica o transcutánea según protocolo.'],
   ['neurologico','Letargo marcado, hipotonía, irritabilidad intensa o succión débil: valoración neonatal urgente.'],
   ['alimentacion','Dificultad para alimentarse o deshidratación: valoración neonatal pronta.'],
   ['prematuro','Prematuridad o menor edad gestacional: interpretar con umbrales específicos.'],
   ['coluria','Coluria o acolia: evaluar hiperbilirrubinemia conjugada y enfermedad hepatobiliar.']
  ];
  const alerts=flags.filter(([key])=>input[key]===true).map(([,msg])=>msg);
  const highRisk=['primeras24','neurologico'].some(k=>input[k]===true);
  if(zone>=4)alerts.push('Ictericia distal extensa: solicitar medición objetiva y valoración clínica; el área NO predice un valor de bilirrubina.');
  return {ready:true,zone,area:kramerZones[zone],urgency:highRisk?'critica':alerts.length?'urgente':'revalorar',alerts,
   message:'Kramer describe la distribución, no calcula bilirrubina ni indica fototerapia. Medir TcB/TSB y evaluar según horas de vida, gestación y factores de riesgo.'};
 }
 return Object.freeze({wood,tep,kramer,woodOptions:options,kramerZones});
});