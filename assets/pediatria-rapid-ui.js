/* KidBum Pediatría Rápida · visual interface v0.10.39
 * Local processing only. The independent clinical engine owns every result.
 */
(function(root){
'use strict';
const engine=root.KidBumPediatricRapid;
if(!engine||!document.getElementById('tep'))return;
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const state={tep:{apariencia:null,respiracion:null,circulacion:null},wood:{},kramer:{zona:null}};
const summaries={tep:'',wood:'',kramer:''};
const exampleNote=$('#example-note');
function clearExampleNote(){exampleNote.hidden=true;}
let activeTool='tep',analysis=null;
function element(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function sectionMessage(holder,urgency,title,detail,alerts,score){
 holder.className='outcome '+(urgency||'pending');holder.replaceChildren();
 if(score!==undefined&&score!==null)holder.append(element('strong',score,'score'));
 if(title)holder.append(element('h3',title));
 if(detail)holder.append(element('p',detail));
 if(alerts&&alerts.length){const ul=element('ul');alerts.forEach(x=>ul.append(element('li',x)));holder.append(ul);}
}
function setCopy(tool,summary){summaries[tool]=summary;const b=$('[data-copy="'+tool+'"]');if(b)b.disabled=!summary;if(analysis&&activeTool===tool)analysis.setReady(Boolean(summary));}
function navTo(tool){
 if(!['tep','wood','kramer'].includes(tool))tool='tep';
 activeTool=tool;if(analysis)analysis.setReady(Boolean(summaries[tool]));
 all('.tool').forEach(e=>e.classList.toggle('hidden',e.id!==tool));
 all('[data-tool-tab]').forEach(e=>{
  if(e.dataset.toolTab===tool)e.setAttribute('aria-current','page');
  else e.removeAttribute('aria-current');
 });
}
root.addEventListener('hashchange',()=>navTo(location.hash.slice(1)));
navTo(location.hash.slice(1));
all('[data-tep-field]').forEach(row=>{
 const field=row.dataset.tepField;
 row.querySelectorAll('[data-tep-value]').forEach(button=>{
  button.onclick=()=>{clearExampleNote();state.tep[field]=button.dataset.tepValue;renderTep();};
 });
});
all('[data-tep-focus]').forEach(node=>{
 const target=node.dataset.tepFocus;
 const focus=()=>document.querySelector('[data-tep-field="'+target+'"]')?.scrollIntoView({behavior:'smooth',block:'center'});
 node.addEventListener('click',focus);
 node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();focus();}});
});
function renderTep(){
 const result=engine.tep(state.tep);
 all('[data-tep-field]').forEach(row=>{
  const selected=state.tep[row.dataset.tepField];
  row.querySelectorAll('[data-tep-value]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.tepValue===selected)));
 });
 all('[data-tep-focus]').forEach(node=>{
  node.classList.remove('active-normal','active-altered');
  if(state.tep[node.dataset.tepFocus]==='normal')node.classList.add('active-normal');
  if(state.tep[node.dataset.tepFocus]==='alterada')node.classList.add('active-altered');
 });
 if(!result.ready){sectionMessage($('#tep-output'),'pending','Evaluación pendiente',result.message);setCopy('tep','');return;}
 const alerts=result.urgency==='critica'?['Si se sospecha insuficiencia respiratoria, choque o paro, activar respuesta inmediata; no esperar estudios.']:[];
 sectionMessage($('#tep-output'),result.urgency,result.pattern,result.explanation+' '+result.message,alerts);
 setCopy('tep','TEP: apariencia '+state.tep.apariencia+', trabajo respiratorio '+state.tep.respiracion+', circulación cutánea '+state.tep.circulacion+'. '+result.pattern+'. '+result.message+' No es diagnóstico definitivo.');
}
const woodDomains=[
 {id:'sibilancias',name:'Sibilancias',hint:'Auscultar la fase respiratoria',opts:['Ausentes','Final de espiración','Toda la espiración','Inspiración y espiración']},
 {id:'tiraje',name:'Tiraje',hint:'Verificar retracciones progresivas',opts:['Sin tiraje','Subcostal / intercostal inferior','Además supraclavicular y aleteo nasal','Además supraesternal']},
 {id:'fr',name:'Frecuencia respiratoria (rpm)',hint:'Rangos específicos de la tabla histórica; 30 exacto requiere comprobación institucional',opts:['< 30','31–45','46–60','> 60']},
 {id:'fc',name:'Frecuencia cardíaca (lpm)',hint:'120 exacto no está asignado en la tabla original',opts:['< 120','> 120']},
 {id:'ventilacion',name:'Entrada de aire',hint:'Auscultación; el tórax silente es signo de alarma',opts:['Buena y simétrica','Regular y simétrica','Muy disminuida','Tórax silente']},
 {id:'cianosis',name:'Cianosis',hint:'La cianosis es alarma aunque sume un solo punto',opts:['No','Sí']}
];
for(const domain of woodDomains){
 const box=element('section',undefined,'wood-domain');box.dataset.domain=domain.id;
 box.append(element('h3',domain.name),element('p',domain.hint));
 const grid=element('div',undefined,'wood-buttons'+(domain.opts.length===2?' two':''));
 domain.opts.forEach((label,value)=>{
  const b=element('button');b.type='button';b.dataset.woodField=domain.id;b.dataset.woodValue=String(value);
  b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',domain.name+': '+value+' puntos · '+label);
  b.append(element('strong',String(value)),element('span',label));
  b.onclick=()=>{clearExampleNote();state.wood[domain.id]=value;renderWood();};
  grid.append(b);
 });
 box.append(grid);$('#wood-fields').append(box);
}
function renderWood(){
 all('[data-wood-field]').forEach(button=>{
  button.setAttribute('aria-pressed',String(state.wood[button.dataset.woodField]===Number(button.dataset.woodValue)));
 });
 const filled=woodDomains.filter(d=>Object.hasOwn(state.wood,d.id)).length;
 $('#wood-progress-text').textContent=filled+' de 6 dominios seleccionados';
 $('#wood-progress-fill').style.width=Math.round(filled/6*100)+'%';
 const r=engine.wood(state.wood);
 if(!r.ready){
  sectionMessage($('#wood-output'),r.urgency,'Puntaje pendiente',r.message,r.alerts);
  setCopy('wood','');return;
 }
 const label=r.value+' / 14 puntos';
 const explicit=r.grade+' · '+label;
 sectionMessage($('#wood-output'),r.urgency,r.grade,
  'Wood-Downes-Ferrés: '+label+'. '+r.message,
  r.alerts,r.value);
 const summary='Wood-Downes modificada por Ferrés: '+explicit+'. '+woodDomains.map(d=>d.name+': '+state.wood[d.id]).join('; ')+'. '+r.message+(r.alerts.length?' Alertas: '+r.alerts.join(' '):'')+' Confirmar SpO₂ y valoración clínica.';
 setCopy('wood',summary);
}
const zones=engine.kramerZones;
zones.forEach((title,id)=>{
 const b=element('button');b.type='button';b.dataset.zone=String(id);b.setAttribute('aria-pressed','false');
 b.append(element('strong',id?'Z'+id:'0'),element('span',title));
 b.onclick=()=>{clearExampleNote();state.kramer.zona=id;renderKramer();};
 $('#kramer-buttons').append(b);
});
all('.kramer-svg [data-zone]').forEach(node=>{
 const set=()=>{clearExampleNote();state.kramer.zona=Number(node.dataset.zone);renderKramer();};
 node.addEventListener('click',set);
 node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();set();}});
});
all('[data-kramer-flag]').forEach(box=>box.addEventListener('change',()=>{
 clearExampleNote();state.kramer[box.dataset.kramerFlag]=box.checked;
 renderKramer();
}));
function renderKramer(){
 const zone=state.kramer.zona;
 all('#kramer-buttons button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.zone)===zone)));
 all('.kramer-svg [data-zone]').forEach(node=>node.classList.toggle('selected',Number(node.dataset.zone)===zone));
 const r=engine.kramer(state.kramer);
 if(!r.ready){sectionMessage($('#kramer-output'),r.urgency||'pending','Zona pendiente',r.message,r.alerts);setCopy('kramer','');return;}
 const tag=zone===0?'Sin ictericia visible':'Zona '+zone+' · '+r.area;
 sectionMessage($('#kramer-output'),r.urgency,tag,r.message,r.alerts);
 setCopy('kramer','Kramer: '+tag+'. '+r.message+(r.alerts.length?' Alertas: '+r.alerts.join(' '):''));
}
function reset(tool){
 clearExampleNote();
 if(tool==='tep'){state.tep={apariencia:null,respiracion:null,circulacion:null};renderTep();}
 else if(tool==='wood'){state.wood={};renderWood();}
 else if(tool==='kramer'){state.kramer={zona:null};all('[data-kramer-flag]').forEach(x=>x.checked=false);renderKramer();}
}
all('[data-reset]').forEach(b=>b.onclick=()=>reset(b.dataset.reset));
async function copySummary(tool){
 const message=summaries[tool];if(!message)return;
 try{
  if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(message);
  else{const el=element('textarea');el.value=message;el.style.position='fixed';el.style.left='-9999px';document.body.append(el);el.select();
   const ok=document.execCommand('copy');el.remove();if(!ok)throw Error('clipboard');}
  const b=$('[data-copy="'+tool+'"]');b.textContent='✓ Copiado';setTimeout(()=>b.textContent='Copiar resumen',1800);
 }catch{const b=$('[data-copy="'+tool+'"]');b.textContent='No se pudo copiar';setTimeout(()=>b.textContent='Copiar resumen',1800);}
}
all('[data-copy]').forEach(b=>b.onclick=()=>copySummary(b.dataset.copy));
const theme=$('#rapid-theme');
function themeApply(dark){
 document.documentElement.classList.toggle('dark',dark);
 theme.textContent=dark?'☀':'◐';
 theme.setAttribute('aria-label',dark?'Cambiar a modo claro':'Cambiar a modo oscuro');
 theme.setAttribute('aria-pressed',String(dark));
 try{localStorage.setItem('kidbum-theme',dark?'dark':'light');}catch(e){}
}
let dark=false;try{dark=localStorage.getItem('kidbum-theme')==='dark';}catch(e){}
themeApply(dark);
theme.onclick=()=>themeApply(!document.documentElement.classList.contains('dark'));
renderTep();renderWood();renderKramer();
$('#example').onclick=()=>{
 const fake=root.KidBumFictitiousExamples?.forPediatricRapid(activeTool);
 if(!fake){exampleNote.textContent='No hay ejemplo docente disponible.';exampleNote.hidden=false;return;}
 if(activeTool==='tep'){state.tep={...fake};renderTep();}
 if(activeTool==='wood'){state.wood={...fake};renderWood();}
 if(activeTool==='kramer'){
  state.kramer={...fake};
  all('[data-kramer-flag]').forEach(box=>box.checked===Boolean(fake[box.dataset.kramerFlag])?null:(box.checked=Boolean(fake[box.dataset.kramerFlag])));
  renderKramer();
 }
 exampleNote.textContent='Ejemplo ficticio cargado para '+({tep:'el TEP',wood:'Wood-Downes-Ferrés',kramer:'Kramer'}[activeTool])+'. No representa a un paciente. Puedes cambiar cualquier respuesta.';
 exampleNote.hidden=false;
};
if(root.KidBumAnalysis){
 analysis=root.KidBumAnalysis.attach({mountId:'kb-ai-mount',getPayload:()=>{
  const summary=summaries[activeTool];
  if(!summary)return null;
  const title={tep:'Triángulo de Evaluación Pediátrica',wood:'Wood-Downes-Ferrés (0–14)',kramer:'Zonas de Kramer'}[activeTool];
  return {title,result:summary,interpretation:'Evaluación visual orientativa, no diagnóstico ni prescripción.',
   details:'Cálculo local con datos clínicos seleccionados voluntariamente; sin identificadores.',
   warning:'Verificar al paciente presencialmente y aplicar ABCDE, laboratorio y protocolo institucional cuando corresponda.'};
 }});
 analysis.setReady(Boolean(summaries[activeTool]));
}
if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{});
})(typeof window!=='undefined'?window:globalThis);