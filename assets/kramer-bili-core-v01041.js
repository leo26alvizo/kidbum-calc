/* KidBum 0.10.41 — Neonatal jaundice objective-data support, AAP 2022.
 * PURE calculation module. No network, persisted browser state, or curves inferred from the visual Kramer illustration.
 * AAP treatment thresholds MUST be independently sourced and explicitly verified by clinician.
 * This module is decision support, not an autonomous prescription.
 */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.KidBumKramerClinical=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const FACTOR=17.104;
 const SOURCES=Object.freeze({
  aap:'https://publications.aap.org/pediatrics/article/150/3/e2022058859/188726/',
  aapFaq:'https://www.aap.org/en/patient-care/hyperbilirubinemia/frequently-asked-questions-about-the-2022-aap-guideline-on-the-management-of-hyperbilirubinemia/',
  mexican:'https://www.cenetec-difusion.com/CMGPC/SS-372-16/RR.pdf',
  peditools:'https://peditools.org/bili2022/'
 });
 function num(value){
  if(value===null||value===undefined||String(value).trim()==='')return null;
  const s=String(value).trim();
  if(!/^\d+(?:\.\d+)?$/.test(s))return NaN;
  return Number(s);
 }
 function fmt(n){return Math.round((n+Number.EPSILON)*100)/100;}
 function ageFromDates(birth,sample){
  if(!birth||!sample)return null;
  const a=Date.parse(birth),b=Date.parse(sample);
  if(!Number.isFinite(a)||!Number.isFinite(b)||b<=a)return null;
  return fmt((b-a)/3600000);
 }
 function mgdl(value,unit){
  const n=num(value);
  return n===null?n:Number.isFinite(n)?(unit==='umol'?n/FACTOR:n):NaN;
 }
 function followup(delta,age,discharge){
  // AAP 2022 Fig 7: only for infants NEVER treated with phototherapy.
  if(!Number.isFinite(delta)||delta<=0)return null;
  if(delta<2)return age<24?'Posponer alta; considerar fototerapia y medir TSB en 4–8 h.':'Medir TSB en 4–24 h; individualizar alta y considerar fototerapia.';
  if(delta<3.5)return 'Medir TcB o TSB en 4–24 h.';
  if(delta<5.5)return 'Medir TcB o TSB en 1–2 días.';
  if(delta<7)return discharge==='before72'?'Seguimiento en ≤2 días; TcB/TSB según evaluación.':discharge==='after72'?'Seguimiento y medición según juicio clínico (alta ≥72 h).':'Si el alta es <72 h: seguimiento ≤2 días; si es ≥72 h: juicio clínico.';
  return discharge==='before72'?'Seguimiento en ≤3 días; TcB/TSB según evaluación.':discharge==='after72'?'Seguimiento y medición según juicio clínico (alta ≥72 h).':'Si el alta es <72 h: seguimiento ≤3 días; si es ≥72 h: juicio clínico.';
 }
 function evaluate(raw){
  const x=raw||{},alerts=[],notes=[],errors=[],stats={};
  const age=num(x.age),ga=num(x.ga);
  const method=x.method==='TcB'?'TcB':'TSB',unit=x.unit==='umol'?'umol':'mgdl';
  const bili=mgdl(x.bili,unit),prior=mgdl(x.prior,unit);
  const priorAge=num(x.priorAge),direct=mgdl(x.direct,unit);
  const photo=mgdl(x.photo,unit),exchange=mgdl(x.exchange,unit);
  const birthWeight=num(x.birthWeight),currentWeight=num(x.currentWeight);
  const extraRisk=['hemolysis','sepsis','instability','lowAlbumin'].some(k=>x[k]===true);
  const riskReviewed=x.riskReviewed===true;
  const thresholdChecked=x.thresholdChecked===true;
  const validGa=Number.isInteger(ga)&&ga>=35&&ga<=42;
  const validAge=Number.isFinite(age)&&age>=1&&age<=336;
  const validBili=Number.isFinite(bili)&&bili>=0&&bili<=45;
  const notesOnly=[];
  if(ga!==null&&!validGa)errors.push('La guía AAP 2022 utilizada aquí requiere EG ≥35 semanas completas; seleccione 35–42.');
  if(age!==null&&!validAge)errors.push('Edad de medición fuera de rango: se admiten 1–336 horas para AAP 2022.');
  if(bili!==null&&!validBili)errors.push('Bilirrubina no válida: verifique número, unidades y rango de 0–45 mg/dL.');
  if((prior!==null)!==(priorAge!==null))errors.push('Para la tendencia introduzca tanto la bilirrubina anterior como su edad en horas.');
  if(prior!==null&&(!Number.isFinite(prior)||prior<0||prior>45||!Number.isFinite(priorAge)||priorAge<1||!validAge||priorAge>=age))
   errors.push('Tendencia inválida: ambas mediciones deben tener valores válidos y edades crecientes.');
  if(direct!==null&&(!Number.isFinite(direct)||direct<0||!validBili||direct>bili))
   errors.push('Bilirrubina directa inválida: requiere TSB total y no puede excederla.');
  if((birthWeight!==null)!==(currentWeight!==null))errors.push('Para pérdida ponderal introduce ambos pesos en gramos.');
  if(birthWeight!==null&&(!Number.isFinite(birthWeight)||!Number.isFinite(currentWeight)||birthWeight<=0||currentWeight<=0||birthWeight>10000||currentWeight>10000))
   errors.push('Pesos no válidos: usa gramos y verifica que ambos sean positivos.');
  if(photo!==null&&(!Number.isFinite(photo)||photo<=0||photo>40))errors.push('Umbral de fototerapia fuera de rango; verifica tabla/unidades.');
  if(exchange!==null&&(!Number.isFinite(exchange)||exchange<=0||exchange>45))errors.push('Umbral de exanguinotransfusión fuera de rango; verifica tabla/unidades.');
  if(photo!==null&&exchange!==null&&Number.isFinite(photo)&&Number.isFinite(exchange)&&exchange<=photo)
   errors.push('Umbral de intercambio debe exceder al de fototerapia; revisa la transcripción.');
  if(x.onPhoto===true&&method==='TcB'&&validBili)alerts.push('TcB durante o poco después de fototerapia no sustituye TSB para decisiones.');
  if(x.first24===true||(validAge&&age<24&&x.zone>0))
   alerts.push('Ictericia en primeras 24 h: obtener medición objetiva lo antes posible y valorar hemólisis.');
  if(x.neurologic===true)alerts.push('Signos neurológicos/alteración del estado general: valoración neonatal INMEDIATA; no esperar resultados.');
  if(x.acholia===true)alerts.push('Acolia o coluria: descartar colestasis y atresia biliar; valoración prioritaria.');
  if(x.feeding===true)alerts.push('Alimentación ineficaz/deshidratación: valoración y apoyo de alimentación pronto.');
  if(ga!==null&&Number.isFinite(ga)&&ga<35)
   alerts.push('EG <35 semanas: AAP 2022 ≥35 semanas NO aplica. Usar protocolo específico de prematuridad.');
  if(validGa&&ga<38)notes.push('EG <38 semanas ya está contemplada en la curva propia; NO activa por sí sola la curva de factores adicionales.');
  if(extraRisk)alerts.push('Factor adicional de neurotoxicidad: utilizar curva de riesgo AAP, además de curva de EG.');
  if(!riskReviewed)notes.push('Factores de neurotoxicidad aún NO confirmados: no se interpretarán umbrales sin verificar.');
  if(validBili){
   stats.biliMg=fmt(bili);stats.biliUmol=fmt(bili*FACTOR);
   notes.push((method==='TSB'?'TSB':'TcB')+' medida: '+fmt(bili)+' mg/dL ('+fmt(bili*FACTOR)+' µmol/L).');
   if(method==='TcB'&&bili>=15)alerts.push('TcB ≥15 mg/dL: obtener TSB de confirmación (AAP KAS 6).');
   if(method==='TSB'&&bili>=25)alerts.push('TSB muy elevada (≥25 mg/dL): valoración neonatal inmediata y comprobar umbral específico.');
  }else notes.push('Falta valor de bilirrubina; Kramer NO permite inferirla.');
  if(validBili&&validAge&&Number.isFinite(prior)&&Number.isFinite(priorAge)&&prior>=0&&priorAge>=1&&priorAge<age&&x.priorMethod===method){
   const rate=(bili-prior)/(age-priorAge);
   stats.rate=fmt(rate);stats.intervalHours=fmt(age-priorAge);
   notes.push('Cambio de '+method+': '+(rate>=0?'+':'')+fmt(rate)+' mg/dL/h en '+fmt(age-priorAge)+' h.');
   if(rate>=((age<=24)?0.3:0.2))alerts.push('Velocidad de ascenso sugestiva de hemólisis (AAP KAS 7): investigar, considerar DAT y valoración rápida.');
  }else if(prior!==null&&x.priorMethod!==method)notes.push('No se calcula velocidad mezclando métodos TcB y TSB.');
  if(method==='TSB'&&validBili&&Number.isFinite(direct)&&direct>=0&&direct<=bili){
   stats.directMg=fmt(direct);stats.directPct=bili>0?fmt(direct/bili*100):0;
   notes.push('Bilirrubina directa: '+fmt(direct)+' mg/dL ('+stats.directPct+'% de TSB).');
   if(direct>1)alerts.push('Bilirrubina directa >1 mg/dL: valor anormal; investigar colestasis. NO se requiere >20% para sospecharla.');
   if(bili>0&&direct/bili>0.5)alerts.push('Bilirrubina directa >50% de TSB: consultar especialista según AAP.');
  }else if(direct!==null&&method==='TcB')errors.push('La fracción directa requiere bilirrubina sérica total (TSB), no TcB.');
  if(Number.isFinite(birthWeight)&&Number.isFinite(currentWeight)&&birthWeight>0&&currentWeight>0){
   stats.lossPct=fmt((birthWeight-currentWeight)/birthWeight*100);
   notes.push('Cambio de peso respecto al nacimiento: '+stats.lossPct+'%'+(stats.lossPct<0?' (ganancia)':' (pérdida)')+'.');
   if(stats.lossPct>=10)alerts.push('Pérdida ponderal ≥10%: evaluar hidratación, técnica de alimentación y evolución, según edad y contexto.');
  }
  if(validAge&&age>=24&&age<=48&&!validBili)
   alerts.push('AAP KAS 5: medir TcB o TSB entre 24 y 48 h, o antes del alta si ocurre primero.');
  if(validAge&&age>=336&&x.zone>0)notes.push('Ictericia persistente: evaluar bilirrubina total y directa según tipo de alimentación, sin atribuirla automáticamente a leche materna.');
  const thresholdReady=validGa&&validAge&&riskReviewed&&thresholdChecked&&errors.length===0;
  if((photo!==null||exchange!==null)&&!thresholdReady)
   notes.push('Umbrales no interpretados: confirme EG, edad, factores y que los valores fueron verificados en la tabla AAP correspondiente.');
  if(thresholdReady&&Number.isFinite(photo)&&photo>0&&validBili){
   const delta=photo-bili;stats.deltaPhoto=fmt(delta);
   notes.push('Distancia al umbral de fototerapia registrado: '+(delta>=0?fmt(delta)+' mg/dL por debajo':fmt(-delta)+' mg/dL por encima')+'.');
   if(method==='TcB'){
    if(delta<=3)alerts.push('TcB a ≤3 mg/dL del umbral o por encima: confirmar con TSB; no iniciar fototerapia solo por TcB.');
   }else if(delta<=0){
    alerts.push('TSB ≥umbral AAP VERIFICADO: evaluación inmediata para fototerapia intensiva según protocolo.');
   }else if(!x.onPhoto&&age<=120){
    stats.followup=followup(delta,age,x.discharge);
    if(stats.followup)notes.push('Seguimiento AAP Fig. 7 (sin fototerapia previa, primer periodo neonatal): '+stats.followup);
   }else if(x.onPhoto)notes.push('AAP Fig. 7 de alta no aplica tras fototerapia; evaluar riesgo de rebote y seguimiento específico.');
   else notes.push('Después del día 5, individualizar el seguimiento según contexto clínico.');
  }
  if(thresholdReady&&Number.isFinite(exchange)&&exchange>0&&validBili){
   stats.exchangeGap=fmt(exchange-bili);
   const escalation=exchange-2;
   stats.escalation=fmt(escalation);
   if(method==='TSB'){
    if(bili>=exchange)alerts.push('TSB ≥umbral AAP de exanguinotransfusión: emergencia; neonatología/UCIN inmediatamente.');
    else if(bili>=escalation)alerts.push('TSB ≥umbral de escalamiento (intercambio −2 mg/dL): emergencia; neonatología/UCIN, fototerapia intensiva y vigilancia estrecha.');
   }else if(bili>=escalation)alerts.push('TcB en rango potencialmente crítico: obtener TSB URGENTE, activar evaluación neonatal.');
  }
  // No fabricated thresholds, no bilirubin from Kramer and no automated prescription.
  const urgency=alerts.some(a=>/INMEDIATA|inmediata|emergencia|primeras 24|≥umbral|crítico|muy elevada/.test(a))?'critica':alerts.length?'urgente':'revalorar';
  return {ready:errors.length===0,age:validAge?age:null,ga:validGa?ga:null,method,
   extraRisk,curve:riskReviewed?(extraRisk?'AAP factores adicionales':'AAP sin factores adicionales'):'pendiente',
   stats,alerts,notes,errors,urgency,thresholdReady,
   summary:['Ictericia neonatal: Kramer zona '+(Number.isInteger(x.zone)?x.zone:'pendiente'),
    'EG '+(validGa?ga+' sem':'pendiente'),'Edad '+(validAge?age+' h':'pendiente'),
    'Bilirrubina '+(validBili?method+' '+fmt(bili)+' mg/dL':'pendiente'),
    'Curva '+(riskReviewed?(extraRisk?'con':'sin')+' factores adicionales':'sin revisar'),
    ...notes,...alerts].join('. ')};
 }
 function peditoolsUrl(v){
  const ga=num(v&&v.ga),age=num(v&&v.age),method=v&&v.method==='TcB'?'TcB':'TSB';
  if(!Number.isInteger(ga)||ga<35||ga>42||!Number.isFinite(age)||age<1||age>336)return SOURCES.peditools;
  const risk=['hemolysis','sepsis','instability','lowAlbumin'].some(k=>v[k]===true)?'any':'none';
  const unit=v&&v.unit==='umol'?'umol':'mgdl',bili=mgdl(v&&v.bili,unit);
  const params=['ga='+Math.min(40,ga),'age='+Math.round(age),'risk='+risk];
  if(Number.isFinite(bili)&&bili>=0&&bili<=45)params.push((method==='TcB'?'tcb':'bili')+'='+fmt(bili));
  return 'https://peditools.org/bili2022/api/?'+params.join('&');
 }
 return Object.freeze({evaluate,followup,ageFromDates,mgdl,FACTOR,SOURCES,peditoolsUrl});
});
