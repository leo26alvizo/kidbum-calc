(function(root){
'use strict';
const lib=root.KidBumPharmaCore;
if(!lib||!document.getElementById('drug-grid'))return;
const $=id=>document.getElementById(id);
const key='kidbum-pharma-favorite-drugs';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','&#39;': '&#39;'}[c]));
let favorites=[];
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))favorites=saved.filter(x=>typeof x==='string'&&lib.byId[x]).slice(0,100);}catch(e){}
let pop='all',tool='audit',activeDrug=null;
const a=(url,label)=>{const el=document.createElement('a');el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.textContent=label+' ↗';return el};
const p=(text,cls='')=>{const el=document.createElement('p');el.textContent=text;if(cls)el.className=cls;return el};
const elt=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el};
const group=$('group');
for(const name of [...new Set(lib.records.map(x=>x.group))].sort((a,b)=>a.localeCompare(b,'es'))){const o=elt('option',name);o.value=name;group.append(o);}
$('num-meds').textContent=lib.records.length+' principios activos';
function persist(){
 try{localStorage.setItem(key,JSON.stringify(favorites));}catch(e){}
}
function fav(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];persist();draw();if(activeDrug===id)showDrug(id);}
function draw(){
 const query=$('search').value;
 let data=lib.search(query,group.value,['Adultos','Pediatría','Neonatología'].includes(pop)?pop:'all',pop==='high');
 if(pop==='favorites')data=data.filter(d=>favorites.includes(d.id));
 if(pop==='lasa')data=data.filter(d=>d.lasaPairs.length>0);
 $('count').textContent=data.length+' de '+lib.records.length+' principios activos · '+(pop==='favorites'?'Favoritos del dispositivo':pop==='high'?'Medicamentos/grupos de alto riesgo':pop==='lasa'?'Parejas LASA con fuente':pop==='all'?'Todas las poblaciones':pop);
 const grid=$('drug-grid');grid.replaceChildren();
 if(!data.length){grid.append(elt('div','No hay coincidencias. Prueba otro nombre o elimina filtros.','empty'));return;}
 for(const med of data){
  const item=elt('article',undefined,'med-card');
  const top=elt('div',undefined,'med-card-top');
  const title=elt('h3',med.name);
  const star=elt('button',favorites.includes(med.id)?'★':'☆','star');star.type='button';star.setAttribute('aria-label',(favorites.includes(med.id)?'Quitar favorito: ':'Guardar favorito: ')+med.name);star.title='Favorito (solo se guarda el identificador del medicamento)';
  star.onclick=()=>fav(med.id);top.append(title,star);
  const grp=p(med.group+' · '+med.populations.join(', '),'small');
  const tags=elt('div');if(med.highRisk)tags.append(elt('span','⚠ Alto riesgo'+(med.highRiskScope?' · '+med.highRiskScope:''),'pill warn'));
  if(med.lasaPairs.length)tags.append(elt('span','LASA · nombre confuso','pill lasa'));
  if(med.evidence)tags.append(elt('span','Aviso con fuente','pill review'));
  if(window.KidBumPharmaMonographs?.byId[med.id])tags.append(elt('span','Referencia posológica parcial','pill review'));
  const use=p(med.use);
  const footer=elt('div',undefined,'card-footer');const b=elt('button','Ver ficha y precauciones →');b.type='button';b.onclick=()=>{location.hash=med.id;showDrug(med.id);};footer.append(b);
  item.append(top,grp,tags,use,footer);grid.append(item);
 }
}
function showDrug(id){
 const med=lib.byId[id];if(!med){return closeDrug();}
 activeDrug=id;
 const d=$('detail');d.classList.remove('hidden');$('browse').classList.add('hidden');
 d.replaceChildren();
 const back=elt('button','← Volver a biblioteca','back');back.type='button';back.onclick=()=>{history.replaceState(null,'',location.pathname+location.search);closeDrug();};
 d.append(back);
 const panel=elt('div',undefined,'panel');
 const hdr=elt('div',undefined,'detail-header'),titleBox=elt('div');titleBox.append(elt('div',med.group,'eyebrow'),elt('h2',med.name),p(med.populations.join(' · '),'muted small'));
 const star=elt('button',favorites.includes(id)?'★ Favorito':'☆ Guardar','back');star.type='button';star.onclick=()=>fav(id);
 hdr.append(titleBox,star);panel.append(hdr);
 const extended=Boolean(window.KidBumPharmaMonographs?.byId[id]);
 const notice=elt('div',undefined,'pending');notice.textContent=extended?'Referencias posológicas delimitadas y documentadas para esta formulación estadounidense; NO son recetas ni equivalentes a autorización mexicana. Otras indicaciones, ajustes y diluciones pendientes.':med.reviewStatus+'. Dosis, máximos, ajustes individualizados y diluciones NO disponibles hasta la revisión clínica/farmacéutica de cada formulación y jurisdicción.';panel.append(notice);
 const cols=elt('div',undefined,'detail-col');
 const left=elt('div');
 const f1=elt('section',undefined,'fact');f1.append(elt('h3','Ámbito y uso orientativo'),p(med.use+'; revisar diagnóstico, indicación autorizada y microbiología cuando aplique.'));left.append(f1);
 const f2=elt('section',undefined,'fact');f2.append(elt('h3','Revisión previa imprescindible'),p(med.checks));left.append(f2);
 const related=window.KidBumPharmaIndicationsUI?.filterByDrug(med.id)||[];
 if(related.length){const section=elt('section',undefined,'fact');section.append(elt('h3','Enfermedades relacionadas · rutas de guía delimitadas'));for(const item of related){const b=elt('button',item.name+' · ver vía terapéutica','db-btn');b.type='button';b.onclick=()=>{closeDrug();document.getElementById('disease-search').value=item.name;document.getElementById('disease-search').dispatchEvent(new Event('input'));document.getElementById('disease-finder').scrollIntoView({behavior:'smooth'});};section.append(b);}left.append(section);}
 
 if(extended&&window.KidBumPharmaMonographUI){left.append(window.KidBumPharmaMonographUI.render(id));}else{ const f3=elt('section',undefined,'fact');f3.append(elt('h3','Dosis, vía y ajuste renal/hepático'),p('Pendiente de validación por indicación, población, presentación y fuente. Consultar etiquetado mexicano y farmacia clínica. Las estimaciones Cockcroft–Gault / CKD-EPI de KidBum NO definen por sí solas el ajuste de este medicamento.'));left.append(f3);}
 const f4=elt('section',undefined,'fact');f4.append(elt('h3','Preparación intravenosa y compatibilidades'),p('NO se publica diluyente, concentración final, velocidad, estabilidad ni compatibilidad sin comprobación de formulación y protocolo institucional.'));left.append(f4);
 const right=elt('aside');
 const safety=elt('section');safety.append(elt('h3','Alertas y documentación'));
 if(med.highRisk){const badge=elt('div','⚠ Medicamento o grupo de alto riesgo según ISMP 2024'+(med.highRiskScope?' · '+med.highRiskScope:'')+'. Confirmar presentación, unidades, concentración y salvaguardas institucionales.','verified');safety.append(badge);safety.append(a(lib.highAlertSource.url,lib.highAlertSource.title));}
 if(med.evidence){
  for(const text of med.evidence.highlights){const box=elt('div',undefined,'verified');box.append(p(text));safety.append(box);}
  safety.append(p('Estos avisos están respaldados por una etiqueta concreta; NO validan toda la monografía ni equivalen automáticamente al etiquetado autorizado en México.','small muted'));
 }else safety.append(p('No hay alertas individuales verificadas cargadas para este medicamento. NO implica ausencia de contraindicaciones, interacciones o efectos adversos.','pending'));
 right.append(safety);
 if(med.lasaPairs.length){const panel=elt('div',undefined,'lasa-panel');panel.append(elt('strong','LASA · riesgo de confusión de nombres'));for(const pair of med.lasaPairs){const other=lib.byId[pair.id];panel.append(p('Tall Man: '+pair.tallMan+' ≠ '+pair.partnerTallMan));const b=elt('button','Comparar con '+other.name+' →');b.type='button';b.onclick=()=>{location.hash=other.id;showDrug(other.id);};panel.append(b);const src=lib.lasaSources[pair.source];if(src)panel.append(a(src.url,src.title));}panel.append(p('Verifica principio activo, indicación, concentración, paciente y presentación; las advertencias NO reflejan necesariamente nombres comerciales mexicanos.','small muted'));right.append(panel);}
 const source=elt('section',undefined,'fact');source.append(elt('h3','Fuentes y trazabilidad'));
 const refs=elt('div',undefined,'refs');
 if(med.evidence)refs.append(a(lib.sources[med.evidence.source].url,lib.sources[med.evidence.source].label));
 refs.append(a(lib.sources.cofepris.url,'COFEPRIS: comprobar registro y presentación en México'));
 refs.append(a(lib.sources.dailymed.url,'DailyMed: buscar etiqueta específica del producto'));
 if(med.highRisk)refs.append(a(lib.sources.ismp.url,'ISMP: medicamentos de alto riesgo, 2024'));
 source.append(refs);right.append(source);
 const act=elt('button','Usar en auditoría de seguridad →','button');act.type='button';act.onclick=()=>{closeDrug();document.querySelector('[data-tool="audit"]').click();$('audit-drug').value=id;$('tools').scrollIntoView({behavior:'smooth'});};right.append(act);
 cols.append(left,right);panel.append(cols);d.append(panel);
 d.scrollIntoView({behavior:'smooth',block:'start'});
}
function closeDrug(){activeDrug=null;$('detail').classList.add('hidden');$('browse').classList.remove('hidden');draw();}
$('search').addEventListener('input',draw);group.addEventListener('change',draw);
document.querySelectorAll('[data-pop]').forEach(b=>b.onclick=()=>{pop=b.dataset.pop;document.querySelectorAll('[data-pop]').forEach(x=>x.classList.toggle('active',x.dataset.pop===pop));draw();});
const sourceLink=(id)=>lib.sources[id]||null;
function options(list,holder,placeholder){const first=elt('option',placeholder||'Selecciona un medicamento');first.value='';holder.append(first);for(const d of list){const o=elt('option',d.name);o.value=d.id;holder.append(o);}}
function selectField(form,id,label,items){const wrapper=elt('div',undefined,'field');const l=elt('label',label);l.htmlFor=id;const sel=elt('select');sel.id=id;for(const [value,txt] of items){const o=elt('option',txt);o.value=value;sel.append(o);}wrapper.append(l,sel);form.append(wrapper);return sel;}
function commonDrugField(form,id){const wrap=elt('div',undefined,'field');const label=elt('label','Principio activo');label.htmlFor=id;const sel=elt('select');sel.id=id;options([...lib.records].sort((a,b)=>a.name.localeCompare(b.name,'es')),sel);wrap.append(label,sel);form.append(wrap);return sel;}
function drawAudit(){
 const panel=$('tool-panel');panel.replaceChildren();
 panel.append(p('Auditoría orientativa del medicamento seleccionado. No registra ni almacena datos clínicos; NO valida dosis, vías ni pautas.','tool-instruction'));
 const form=elt('form');form.autocomplete='off';const grid=elt('div',undefined,'form-grid');const drug=commonDrugField(grid,'audit-drug');
 const population=selectField(grid,'audit-pop','Población',[['','Seleccionar'],['adulto','Adulto'],['pediatrico','Pediátrica'],['neonato','Neonatal']]);
 const allergy=selectField(grid,'audit-allergy','Alergias farmacológicas comprobadas',[['','No verificadas'],['yes','Sí, existe alergia'],['no','No se documenta alergia']]);
 const renal=selectField(grid,'audit-renal','Función renal',[['unknown','Sin información'],['normal','Revisada, sin alteración documentada'],['impaired','Alteración documentada']]);
 const route=selectField(grid,'audit-route','Vía prevista',[['unknown','No confirmada'],['oral','Oral'],['iv','Intravenosa'],['sc','Subcutánea'],['im','Intramuscular'],['other','Otra (verificar)']]);
 const pregnancy=selectField(grid,'audit-pregnancy','Embarazo o lactancia',[['unknown','No aplica / no verificado'],['no','No'],['yes','Sí']]);
 const ivcalcium=selectField(grid,'audit-calcium','¿Neonato requiere calcio IV?', [['unknown','No confirmado'],['yes','Sí'],['no','No']]);
 const weightWrap=elt('div',undefined,'field'),wl=elt('label','Peso pediátrico (kg; verificado)');wl.htmlFor='audit-weight';const weight=elt('input');weight.id='audit-weight';weight.type='number';weight.inputMode='decimal';weight.min='0.2';weight.max='300';weight.step='any';weight.placeholder='Solo cuando corresponda';weightWrap.append(wl,weight);grid.append(weightWrap);
 form.append(grid);
 const btn=elt('button','Evaluar verificaciones','button');btn.type='submit';form.append(btn);
 const result=elt('div',undefined,'tool-result');result.setAttribute('aria-live','polite');
 result.append(p('Completa los campos para revisar alertas y datos pendientes.'));
 form.onsubmit=e=>{
  e.preventDefault();const r=lib.audit({drug:drug.value,population:population.value,weight:weight.value,allergy:allergy.value,renal:renal.value,route:route.value,pregnancy:pregnancy.value,ivcalcium:ivcalcium.value});
  result.replaceChildren();result.append(elt('strong',r.status==='blocked'?'No evaluable / requiere bloqueo de validación':'Verificaciones registradas · NO autoriza administrar',r.status==='blocked'?'urgent':''));
  const ul=elt('ul');for(const m of [...(r.messages||[]),...(r.warnings||[]),...(r.checks||[])])ul.append(elt('li',m));result.append(ul);
  if(r.drug?.evidence)result.append(a(lib.sources[r.drug.evidence.source].url,'Consultar fuente de la alerta'));
 };
 panel.append(form,result);
}
function drawInteractions(){
 const panel=$('tool-panel');panel.replaceChildren();
 panel.append(p('Cobertura muy limitada: únicamente combinaciones de etiquetado ya cargadas. No es un detector exhaustivo de interacciones y nunca emite confirmación de seguridad.','tool-instruction'));
 const form=elt('form'),grid=elt('div',undefined,'form-grid');
 const a1=commonDrugField(grid,'int-a'),a2=commonDrugField(grid,'int-b');grid.querySelector('label[for="int-a"]').textContent='Medicamento 1';grid.querySelector('label[for="int-b"]').textContent='Medicamento 2';
 form.append(grid);const btn=elt('button','Consultar combinación','button');btn.type='submit';form.append(btn);
 const result=elt('div',undefined,'tool-result');result.setAttribute('aria-live','polite');result.append(p('Selecciona dos principios activos.'));
 form.onsubmit=e=>{e.preventDefault();const r=lib.interaction(a1.value,a2.value);result.replaceChildren();result.append(elt('strong',r.supported?'Aviso de interacción / duplicidad':'No evaluable con esta base de interacciones'));result.append(p(r.message));if(r.source)result.append(a(r.source.url,r.source.label));};
 panel.append(form,result);
}
function drawSources(){
 const panel=$('tool-panel');panel.replaceChildren();panel.append(elt('h3','Fuentes y alcance'));
 panel.append(p('Los siguientes portales son referencias para comprobar producto, jurisdicción, presentaciones y advertencias. Su mera inclusión NO equivale a validación de todas las fichas.','small muted'));
 const refs=elt('div',undefined,'refs');for(const [id,s] of Object.entries(lib.sources)){const box=elt('div');box.append(a(s.url,s.label));if(['cofepris','dailymed','who','ismp'].includes(id))box.append(p('Fuente transversal · consultar directamente la ficha o documento específico.','small muted'));refs.append(box);}panel.append(refs);
 panel.append(p('Proceso editorial previsto: identidad del producto → fuente primaria y jurisdicción → datos por indicación/población → validación farmacéutica → pruebas clínicas y actualización con fecha.','small muted'));
}
function openTool(name){tool=name;document.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('active',x.dataset.tool===name));if(name==='audit')drawAudit();else if(name==='interactions')drawInteractions();else drawSources();}
document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>openTool(b.dataset.tool));
const theme=$('theme');theme.onclick=()=>{document.documentElement.classList.toggle('dark');try{localStorage.setItem('kidbum-pharma-theme',document.documentElement.classList.contains('dark')?'dark':'light');}catch(e){}};
try{if(localStorage.getItem('kidbum-pharma-theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}
function fromHash(){const id=decodeURIComponent(location.hash.slice(1));if(lib.byId[id])showDrug(id);else closeDrug();}
window.addEventListener('hashchange',fromHash);
if(window.KidBumPharmaIndicationsUI)window.KidBumPharmaIndicationsUI.mount(id=>{location.hash=id;showDrug(id);});
draw();openTool('audit');if(location.hash)fromHash();
})(typeof window!=='undefined'?window:globalThis);
