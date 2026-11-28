/* PAS rápido: ocho criterios, sin campos numéricos ni supuestos clínicos. */
(function(){
'use strict';
const api=window.KidBumPAS,$=id=>document.getElementById(id);
if(!api?.calculateQuick){$('pas-risk-name').textContent='Motor PAS rápido no disponible. Actualiza con conexión.';return;}
const answers=Object.fromEntries(api.criteria.map(c=>[c.key,'unknown']));
const groups=[...document.querySelectorAll('[data-criterion]')];
let demo=false;
function render(){
 const out=api.calculateQuick(answers);
 for(const box of groups)for(const b of box.querySelectorAll('[data-value]')){
  const on=b.dataset.value===answers[box.dataset.criterion];
  b.setAttribute('aria-pressed',String(on));b.classList.toggle('selected',on);
 }
 $('pas-example-note').hidden=!demo;
 const card=$('pas-outcome');
 card.dataset.band=out.complete?'score':'pending';
 card.style.setProperty('--angle',(out.complete?out.score/10*360:0)+'deg');
 $('pas-points').textContent=out.complete?String(out.score):'—';
 $('pas-completeness').textContent=out.answered+' de 8 criterios';
 $('pas-risk-name').textContent=out.complete?'PAS completo':'Evaluación incompleta';
 $('pas-range').textContent=out.complete?'Puntaje: '+out.score+'/10':'PAS parcial '+out.pointsKnown+' puntos conocidos · rango posible '+out.range[0]+'–'+out.range[1]+'/10';
 $('pas-progress').setAttribute('aria-valuenow',String(out.answered));
 $('pas-progress-fill').style.width=(out.answered/8*100)+'%';
 $('pas-copy').disabled=!out.complete;
}
for(const box of groups)box.addEventListener('click',e=>{
 const b=e.target.closest('button[data-value]');if(!b||!box.contains(b)||!['yes','no'].includes(b.dataset.value))return;
 answers[box.dataset.criterion]=b.dataset.value;render();
});
function reset(){for(const c of api.criteria)answers[c.key]='unknown';demo=false;render();}
$('pas-reset').addEventListener('click',reset);
$('pas-clear-top').addEventListener('click',reset);
$('pas-example').addEventListener('click',()=>{
 Object.assign(answers,{migration:'yes',anorexia:'yes',vomiting:'no',fever:'yes',rlq:'yes',movement:'no',wbc:'yes',anc:'yes'});demo=true;render();
});
$('pas-copy').addEventListener('click',async()=>{
 const r=api.calculateQuick(answers);if(!r.complete)return;
 const rows=['KidBum · PAS rápido '+r.score+'/10',demo?'EJEMPLO FICTICIO':'Criterios confirmados por el usuario','Edad y signos de alarma no evaluados',...api.criteria.map(c=>(r.values[c.key]==='yes'?'[+]':'[-]')+' '+c.label),'No diagnostica, descarta ni determina conducta.'];
 try{const txt=rows.join('\n');if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(txt);else{const x=document.createElement('textarea');x.value=txt;x.style.position='fixed';x.style.opacity='0';document.body.append(x);try{x.select();if(!document.execCommand('copy'))throw Error('copy');}finally{x.remove();}}$('pas-copy').textContent='✓ Copiado';}catch(e){$('pas-copy').textContent='No se pudo copiar';}
});
const theme=$('pas-theme');function themeApply(dark){document.documentElement.classList.toggle('dark',dark);theme.textContent=dark?'☀':'◐';theme.setAttribute('aria-pressed',String(dark));theme.setAttribute('aria-label',dark?'Cambiar a modo claro':'Cambiar a modo oscuro');try{localStorage.setItem('kidbum-theme',dark?'dark':'light');}catch(e){}}
let initial=false;try{initial=localStorage.getItem('kidbum-theme')==='dark';}catch(e){}themeApply(initial);theme.addEventListener('click',()=>themeApply(!document.documentElement.classList.contains('dark')));
render();
})();
