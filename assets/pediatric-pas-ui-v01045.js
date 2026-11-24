/* KidBum PAS 0.10.45 — accessible, reactive, privacy-preserving pediatric workflow. */
(function(){
'use strict';
const api=window.KidBumPAS;
const $=id=>document.getElementById(id);
if(!api){const e=$('pas-risk-name');if(e)e.textContent='Motor PAS no disponible. Actualiza la aplicación con conexión.';return;}
const states={answers:{}};
for(const x of api.criteria)states.answers[x.key]='unknown';
const groups=[...document.querySelectorAll('[data-criterion]')];
const inputs=['pas-temperature','pas-wbc','pas-anc','pas-percent'];
const numeric=id=>$(id)?.value?.trim()||'';
const chosen=(box,which)=>{
 for(const b of box.querySelectorAll('[data-value]')){
  const selected=b.dataset.value===which;
  b.setAttribute('aria-pressed',String(selected));b.classList.toggle('selected',selected);
 }
};
function updateSelections(){
 for(const box of groups)chosen(box,states.answers[box.dataset.criterion]);
}
function assess(){
 const payload={temperatureC:numeric('pas-temperature'),
  wbcK:numeric('pas-wbc'),ancK:numeric('pas-anc'),neutrophilPercent:numeric('pas-percent'),
  answers:{...states.answers}};
 return api.calculate(payload);
}
function make(tag,text,cls){
 const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;
}
function labPreview(){
 const w=numeric('pas-wbc'),p=numeric('pas-percent'),a=numeric('pas-anc'),
 el=$('pas-anc-preview');
 el.className='pas-formula';
 if(!w&&!p&&!a){el.textContent='🧪 ANC = leucocitos × % de neutrófilos / 100. Introduce ANC medido o WBC y porcentaje.';return;}
 const wn=Number(w),pn=Number(p),an=Number(a);
 if(w&&p&&Number.isFinite(wn)&&Number.isFinite(pn)&&wn>=0&&pn>=0&&pn<=100){
  const derived=wn*pn/100;
  el.textContent='ANC derivado: '+derived.toLocaleString('es-MX',{maximumFractionDigits:3})+' ×10³/µL ('+(derived>7.5?'+1 punto':'+0 puntos')+').'+(a?' Se contrastará con el valor informado.':'');
  el.classList.add('valid');
 }else if(a&&Number.isFinite(an)&&an>=0){
  el.textContent='ANC informado: '+an.toLocaleString('es-MX',{maximumFractionDigits:3})+' ×10³/µL ('+(an>7.5?'+1 punto':'+0 puntos')+').';
  el.classList.add('valid');
 }else if(p&&!w){el.textContent='⚠ Necesitas leucocitos del mismo hemograma para derivar ANC.';el.classList.add('invalid');}
 else el.textContent='Completa WBC y ANC o WBC con porcentaje de neutrófilos.';
}
function render(){
 labPreview();
 const out=assess(),card=$('pas-outcome'),alerts=$('pas-alerts');
 alerts.replaceChildren();
 if(!out.ok){
  card.dataset.band='urgent';card.style.setProperty('--angle','0deg');
  $('pas-points').textContent='—';$('pas-completeness').textContent='Revisar datos';
  $('pas-risk-name').textContent='⚠ Datos inconsistentes: corrige el formulario';
  $('pas-range').textContent='Sin puntaje calculable';
  const item=make('p',out.message,'pas-alert-item critical');alerts.append(item);
  $('pas-progress').setAttribute('aria-valuenow','0');$('pas-progress-fill').style.width='0%';
  return;
 }
 card.dataset.band=out.complete?'score':'pending';
 card.style.setProperty('--angle',(out.complete?out.score/10*360:0)+'deg');
 $('pas-points').textContent=out.complete?String(out.score):'—';
 $('pas-completeness').textContent=out.answered+' de 8 criterios';
 $('pas-risk-name').textContent=out.complete?'PAS completo':'Evaluación incompleta';
 $('pas-range').textContent=out.complete?'Puntaje: '+out.score+'/10':
 'PAS parcial '+out.pointsKnown+' puntos conocidos · rango posible '+out.range[0]+'–'+out.range[1]+'/10';
 $('pas-progress').setAttribute('aria-valuenow',String(out.answered));
 $('pas-progress-fill').style.width=(out.answered/8*100)+'%';

}
for(const box of groups){
 box.addEventListener('click',e=>{
  const b=e.target.closest('button[data-value]');if(!b||!box.contains(b))return;
  const key=box.dataset.criterion,value=b.dataset.value;
  if(box.dataset.criterion){
   if(key==='fever'&&numeric('pas-temperature')){
    // Do not silently retain a contradictory measured temperature.
    $('pas-temperature').value='';
   }
   states.answers[key]=value;
  }
  updateSelections();render();
 });
}
for(const id of inputs){
 $(id).addEventListener('input',()=>{
  if(id==='pas-temperature'){
   const v=numeric(id),n=Number(v);
   states.answers.fever=v&&Number.isFinite(n)&&n>=33&&n<=43?(n>38?'yes':'no'):'unknown';
   updateSelections();
  }
  render();
 });
}
function reset(){
 $('pas-example-note').hidden=true;
 for(const id of inputs)$(id).value='';
 for(const x of api.criteria)states.answers[x.key]='unknown';
 updateSelections();render();groups[0]?.querySelector('button')?.focus({preventScroll:true});
}
$('pas-reset').addEventListener('click',reset);
$('pas-example').addEventListener('click',()=>{
 const demo={'pas-temperature':'38.4','pas-wbc':'12.5','pas-anc':'9.2','pas-percent':''};
 for(const id of inputs)$(id).value=demo[id]??'';
 Object.assign(states.answers,{migration:'yes',anorexia:'yes',vomiting:'no',fever:'yes',rlq:'yes',movement:'no',wbc:'unknown',anc:'unknown'});
 $('pas-example-note').hidden=false;updateSelections();render();
});
const report=()=>{
 const r=assess();
 if(!r.ok)return 'PAS pediátrico — CÁLCULO BLOQUEADO: '+r.message;
 const rows=['KidBum · PAS de Samuel (0–10)','Solo puntaje; edad y signos de alarma no evaluados','PAS: '+(r.complete?r.score+'/10':'INCOMPLETO · '+r.pointsKnown+' puntos conocidos; posible '+r.range[0]+'–'+r.range[1]+'/10'),
 'Criterios evaluados: '+r.answered+'/8','ANC: '+(r.ancK===null?'sin dato':r.ancK+' ×10³/µL'+(r.ancDerived?' (derivado)':''))];
 for(const item of api.criteria)rows.push((r.values[item.key]==='yes'?'[+]':r.values[item.key]==='no'?'[-]':'[?]')+' '+item.label+' ('+item.points+' p)');
 rows.push('NO diagnostica, descarta ni establece conducta por sí solo. Revisión médica requerida.');
 return rows.join('\n');
};
$('pas-copy').addEventListener('click',async()=>{
 const btn=$('pas-copy');try{
  const text=report();
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);}
  else{
   const x=document.createElement('textarea');x.value=text;x.style.position='fixed';x.style.opacity='0';document.body.append(x);x.select();
   if(!document.execCommand('copy'))throw Error('No se pudo copiar');x.remove();
  }
  btn.textContent='✓ Copiado (sin identificadores)';
 }catch(e){btn.textContent='Selecciona el texto manualmente';}
});
const theme=$('pas-theme');
function themeApply(dark){
 document.documentElement.classList.toggle('dark',dark);
 theme.textContent=dark?'☀':'◐';theme.setAttribute('aria-pressed',String(dark));
 theme.setAttribute('aria-label',dark?'Cambiar a modo claro':'Cambiar a modo oscuro');
 try{localStorage.setItem('kidbum-theme',dark?'dark':'light');}catch(e){}
}
let initial=false;try{initial=localStorage.getItem('kidbum-theme')==='dark';}catch(e){}
themeApply(initial);theme.addEventListener('click',()=>themeApply(!document.documentElement.classList.contains('dark')));
updateSelections();render();
})();
