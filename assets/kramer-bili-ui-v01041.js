/* KidBum 0.10.41 | Kramer objective bilirubin panel (offline, no telemetry). */
(function(root){
 'use strict';
 const engine=root.KidBumKramerClinical,section=document.getElementById('kramer');
 if(!engine||!section)return;
 const $=s=>section.querySelector(s);
 const all=s=>[...section.querySelectorAll(s)];
 const keys=['ga','age','birth','sample','method','unit','bili','prior','priorAge','priorMethod','direct',
  'birthWeight','currentWeight','photo','exchange','discharge','riskReviewed',
  'hemolysis','sepsis','instability','lowAlbumin','onPhoto','thresholdChecked'];
 function input(key){return $('[data-kbili="'+key+'"]');}
 function collect(){
  const v={zone:null};
  for(const key of keys){
   const el=input(key);if(!el)continue;
   v[key]=el.type==='checkbox'?el.checked:el.value;
  }
  const selected=$('#kramer-buttons [aria-pressed="true"]');
  if(selected)v.zone=Number(selected.dataset.zone);
  const flag=(k)=>Boolean($('[data-kramer-flag="'+k+'"]')?.checked);
  v.first24=flag('primeras24');v.neurologic=flag('neurologico');
  v.feeding=flag('alimentacion');v.acholia=flag('coluria');
  return v;
 }
 function span(text,cls){
  const n=document.createElement('div');n.textContent=text;if(cls)n.className=cls;
  return n;
 }
 function output(items){
  const ul=document.createElement('ul');ul.className='kbili-messages';
  for(const a of items){const li=document.createElement('li');li.textContent=a;ul.append(li);}
  return ul;
 }
 function refresh(){
  const v=collect();
  const r=engine.evaluate(v),holder=$('#kbili-output');
  holder.replaceChildren();
  holder.className='kbili-result '+(r.errors.length?'kbili-invalid':r.urgency);
  const title=document.createElement('h3');
  title.textContent=r.errors.length?'Corrige datos antes de interpretar':r.urgency==='critica'?'Atención neonatal inmediata':r.urgency==='urgente'?'Se requiere valoración clínica':'Evaluación objetiva de ictericia';
  holder.append(title);
  if(r.errors.length)holder.append(output(r.errors));
  const meta=span('EG: '+(r.ga===null?'pendiente':r.ga+' sem')+' · Edad: '+(r.age===null?'pendiente':r.age+' h')+
   ' · Riesgo AAP: '+r.curve,'kbili-meta');
  holder.append(meta);
  const stats=r.stats;
  const tiles=[];
  if(stats.biliMg!==undefined)tiles.push(['Bilirrubina '+r.method,stats.biliMg+' mg/dL',stats.biliUmol+' µmol/L']);
  if(stats.rate!==undefined)tiles.push(['Velocidad de ascenso',stats.rate+' mg/dL/h',stats.intervalHours+' h de intervalo']);
  if(stats.directMg!==undefined)tiles.push(['Bilirrubina directa',stats.directMg+' mg/dL',stats.directPct+'% de TSB']);
  if(stats.lossPct!==undefined)tiles.push(['Peso vs nacimiento',stats.lossPct+'%',stats.lossPct<0?'Ganancia':'Pérdida']);
  if(stats.deltaPhoto!==undefined)tiles.push(['Distancia a fototerapia',stats.deltaPhoto+' mg/dL','Umbral verificado manualmente']);
  if(stats.escalation!==undefined)tiles.push(['Umbral escalamiento',stats.escalation+' mg/dL','Intercambio − 2 mg/dL']);
  if(tiles.length){
   const grid=document.createElement('div');grid.className='kbili-metrics';
   for(const [title,value,hint] of tiles){
    const box=document.createElement('div');box.className='kbili-metric';
    box.append(span(title,'kbili-metric-title'),span(value,'kbili-metric-value'),span(hint,'kbili-metric-hint'));grid.append(box);
   }holder.append(grid);
  }
  if(r.alerts.length){
   holder.append(span('⚠ Alertas y decisiones de seguridad','kbili-hint-title'),output(r.alerts));
  }
  if(r.notes.length){
   holder.append(span('Interpretación y próximos pasos','kbili-hint-title'),output(r.notes));
  }
  holder.append(span('El color de Kramer no estima TSB. Para fototerapia, escalamiento e intercambio utilizar TSB y umbrales por edad/EG/riesgo, confirmados contra AAP y protocolo institucional.','kbili-safety'));
  const link=$('#kbili-peditools');
  if(link)link.href=v.riskReviewed?engine.peditoolsUrl(v):engine.SOURCES.peditools;
  const copy=$('#kbili-copy');if(copy)copy.disabled=!r.ready||r.stats.biliMg===undefined;
  holder.dataset.qaStatus=r.errors.length?'invalid':r.urgency;
  holder.dataset.qaRisk=r.curve;
  holder.dataset.qaDelta=stats.deltaPhoto===undefined?'':String(stats.deltaPhoto);
  holder.dataset.qaRate=stats.rate===undefined?'':String(stats.rate);
 }
 // Invalidate acknowledged AAP curves whenever a clinically material reference changes.
 // When switching mg/dL ↔ µmol/L, convert ALL entered values together and force re-verification.
 let previousUnit=input('unit')?.value||'mgdl';
 const invalidatesThreshold=new Set(['ga','age','birth','sample','riskReviewed','hemolysis','sepsis','instability','lowAlbumin','photo','exchange','unit']);
 for(const key of keys){
  const el=input(key);if(!el)continue;
  const changed=()=>{
   if(key==='unit'&&el.value!==previousUnit){
    const factor=engine.FACTOR;
    for(const other of ['bili','prior','direct','photo','exchange']){
     const node=input(other);if(!node||node.value==='')continue;
     const n=Number(node.value);if(!Number.isFinite(n))continue;
     node.value=String(Number((previousUnit==='mgdl'?n*factor:n/factor).toFixed(5)));
    }
    previousUnit=el.value;
   }
   if(invalidatesThreshold.has(key)&&input('thresholdChecked'))input('thresholdChecked').checked=false;
   refresh();
  };
  el.addEventListener('input',changed);
  el.addEventListener('change',changed);
 }
 for(const key of ['birth','sample']){
  input(key)?.addEventListener('change',()=>{
   const birth=input('birth')?.value,sample=input('sample')?.value;
   if(!birth||!sample)return;
   const result=engine.ageFromDates(birth,sample);
   const age=input('age');
   if(age)age.value=result===null?'':String(result);
   const warning=$('#kbili-time-warning');
   if(warning)warning.textContent=result===null?'Fechas incoherentes: la toma debe ser posterior al nacimiento.':'Edad calculada: '+result+' horas (horario local del dispositivo).';
   refresh();
  });
 }
 // The Kramer silhouette interactions stay in their existing, tested module.
 // Here we only observe completed events and display the objective panel state.
 all('.kramer-svg [data-zone],#kramer-buttons,[data-kramer-flag]').forEach(el=>{
  el.addEventListener('click',()=>queueMicrotask(refresh));
  el.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')queueMicrotask(refresh);});
  el.addEventListener('change',refresh);
 });
 $('[data-reset="kramer"]')?.addEventListener('click',()=>{
  for(const key of keys){
   const el=input(key);if(!el)continue;
   if(el.type==='checkbox')el.checked=false;
   else if(el.tagName==='SELECT')el.selectedIndex=0;
   else el.value='';
  }
  previousUnit='mgdl';
  const warning=$('#kbili-time-warning');if(warning)warning.textContent='';
  queueMicrotask(refresh);
 });
 $('#kbili-copy')?.addEventListener('click',async()=>{
  const r=engine.evaluate(collect());if(!r.ready||r.stats.biliMg===undefined)return;
  try{
   await navigator.clipboard.writeText(r.summary);
   $('#kbili-copy').textContent='✓ Resumen copiado';
   root.setTimeout(()=>{$('#kbili-copy').textContent='Copiar evaluación objetiva';},1700);
  }catch(e){
   $('#kbili-copy').textContent='No se pudo copiar';
   root.setTimeout(()=>{$('#kbili-copy').textContent='Copiar evaluación objetiva';},1700);
  }
 });
 refresh();
})(typeof window!=='undefined'?window:globalThis);
