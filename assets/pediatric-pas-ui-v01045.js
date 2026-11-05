/* KidBum PAS 0.10.45 — accessible, reactive, privacy-preserving pediatric workflow. */
(function(){
'use strict';
const api=window.KidBumPAS;
const $=id=>document.getElementById(id);
if(!api){const e=$('pas-risk-name');if(e)e.textContent='Motor PAS no disponible. Actualiza la aplicación con conexión.';return;}
const states={answers:{},redFlags:{unstable:'unknown',peritonitis:'unknown'}};
for(const x of api.criteria)states.answers[x.key]='unknown';
const groups=[...document.querySelectorAll('[data-criterion],[data-flag]')];
const inputs=['pas-age','pas-duration','pas-temperature','pas-wbc','pas-anc','pas-percent'];
const numeric=id=>$(id)?.value?.trim()||'';
const chosen=(box,which)=>{
 for(const b of box.querySelectorAll('[data-value]')){
  const selected=b.dataset.value===which;
  b.setAttribute('aria-pressed',String(selected));b.classList.toggle('selected',selected);
 }
};
function updateSelections(){
 for(const box of groups)chosen(box,box.dataset.criterion?states.answers[box.dataset.criterion]:states.redFlags[box.dataset.flag]);
}
function assess(){
 const payload={ageYears:numeric('pas-age'),temperatureC:numeric('pas-temperature'),
  wbcK:numeric('pas-wbc'),ancK:numeric('pas-anc'),neutrophilPercent:numeric('pas-percent'),
  answers:{...states.answers},redFlags:{...states.redFlags}};
 return api.calculate(payload);
}
function make(tag,text,cls){
 const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;
}
function ageDescription(){
 const raw=numeric('pas-age'),age=Number(raw),note=$('pas-age-note');
 note.className='pas-warning-lab';
 if(!raw){note.textContent='🧒 Introduce la edad. PAS se desarrolló en niños de 4–15 años; menos de 4 años requieren valoración individual.';return;}
 if(!Number.isFinite(age)||age<0||age>=19){note.className+=' urgent';note.textContent='⚠ Edad fuera del alcance; revisa el dato.';return;}
 if(age<4){note.className+=' warning';note.textContent='🚨 Menor de 4 años: el PAS no debe usarse para excluir apendicitis, porque los síntomas pueden ser atípicos.';return;}
 if(age>=18){note.className+=' warning';note.textContent='⚠ Paciente de 18 años: considera protocolos de población adulta.';return;}
 note.textContent='✓ Edad dentro del uso pediátrico habitual. Derivación original 4–15 años; no equivale a diagnóstico.';
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
 ageDescription();labPreview();
 const out=assess(),card=$('pas-outcome'),alerts=$('pas-alerts'),recs=$('pas-recommend-list');
 alerts.replaceChildren();recs.replaceChildren();
 if(!out.ok){
  card.dataset.band='urgent';card.style.setProperty('--angle','0deg');
  $('pas-points').textContent='—';$('pas-completeness').textContent='Revisar datos';
  $('pas-risk-name').textContent='⚠ Datos inconsistentes: corrige el formulario';
  $('pas-range').textContent='Sin puntaje calculable';
  const item=make('p',out.message,'pas-alert-item critical');alerts.append(item);
  recs.append(make('li','Revisar unidades, temperatura, laboratorio y respuestas antes de continuar.'));
  $('pas-progress').setAttribute('aria-valuenow','0');$('pas-progress-fill').style.width='0%';
  return;
 }
 card.dataset.band=out.band;
 card.style.setProperty('--angle',(out.complete?out.score/10*360:0)+'deg');
 $('pas-points').textContent=out.complete?String(out.score):out.urgent?'!':'—';
 $('pas-completeness').textContent=out.answered+' de 8 criterios';
 $('pas-risk-name').textContent=out.riskLabel;
 $('pas-range').textContent=out.complete?'PAS completo: '+out.score+'/10 · '+(out.urgent?'alerta clínica prevalece':out.ageValid?'clasificación de riesgo, NO diagnóstico':'edad fuera de validación'):
 'PAS parcial '+out.pointsKnown+' puntos conocidos · rango posible '+out.range[0]+'–'+out.range[1]+'/10';
 $('pas-progress').setAttribute('aria-valuenow',String(out.answered));
 $('pas-progress-fill').style.width=(out.answered/8*100)+'%';
 for(let i=0;i<out.warnings.length;i++){
  const p=make('p',out.warnings[i],'pas-alert-item'+(out.urgent&&i===0?' critical':''));
  alerts.append(p);
 }
 const duration=numeric('pas-duration');
 if(duration){
  const d=Number(duration);
  if(Number.isFinite(d)&&d>=0&&d<24)alerts.append(make('p','Dolor con menos de 24 horas de evolución: una presentación temprana puede tener PAS bajo aunque exista apendicitis.','pas-alert-item'));
  if(!Number.isFinite(d)||d<0||d>720)alerts.append(make('p','Duración no válida; revisar el contexto clínico.','pas-alert-item'));
 }
 for(const item of out.recommendations)recs.append(make('li',item));
}
for(const box of groups){
 box.addEventListener('click',e=>{
  const b=e.target.closest('button[data-value]');if(!b||!box.contains(b))return;
  const key=box.dataset.criterion||box.dataset.flag,value=b.dataset.value;
  if(box.dataset.criterion){
   if(key==='fever'&&numeric('pas-temperature')){
    // Do not silently retain a contradictory measured temperature.
    $('pas-temperature').value='';
   }
   states.answers[key]=value;
  }else states.redFlags[key]=value;
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
 for(const id of inputs)$(id).value='';
 for(const x of api.criteria)states.answers[x.key]='unknown';
 states.redFlags.unstable='unknown';states.redFlags.peritonitis='unknown';
 updateSelections();render();$('pas-age').focus({preventScroll:true});
}
$('pas-reset').addEventListener('click',reset);
const report=()=>{
 const r=assess();
 if(!r.ok)return 'PAS pediátrico — CÁLCULO BLOQUEADO: '+r.message;
 const rows=['KidBum · PAS de Samuel (0–10)','Edad: '+(r.ageYears===null?'sin registrar':r.ageYears+' años'),
 'Estado: '+r.riskLabel,'PAS: '+(r.complete?r.score+'/10':'INCOMPLETO · '+r.pointsKnown+' puntos conocidos; posible '+r.range[0]+'–'+r.range[1]+'/10'),
 'Criterios evaluados: '+r.answered+'/8','ANC: '+(r.ancK===null?'sin dato':r.ancK+' ×10³/µL'+(r.ancDerived?' (derivado)':''))];
 for(const item of api.criteria)rows.push((r.values[item.key]==='yes'?'[+]':r.values[item.key]==='no'?'[-]':'[?]')+' '+item.label+' ('+item.points+' p)');
 rows.push('Alertas: '+(r.warnings.join(' | ')||'ninguna registrada'));
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
