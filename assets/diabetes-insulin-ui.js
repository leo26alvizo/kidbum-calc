(function(root){
'use strict';
/* UI for six deterministic diabetes modules; no network/storage/patient identifiers. */
const core=root.KidBumDiabetesCore;
if(!core)return;
const names={hospital:'Hospital',consulta:'Consulta externa',urgencias:'Urgencias diabéticas'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[c]));
function render(host,engine,onBack,initialId){
 let active=core.tools.some(x=>x.id===initialId)?initialId:null;
 const styleId='kidbum-diabetes-style';
 if(!document.getElementById(styleId)){
  const style=document.createElement('style');style.id=styleId;
  style.textContent='.db-hero{padding:26px 29px;border-radius:21px;background:linear-gradient(115deg,#103049,#0c686a);color:#f1fffc;margin:13px 0 19px}.db-hero h1{font-size:clamp(26px,3.5vw,37px);letter-spacing:-.8px;margin:5px 0}.db-hero p{font-size:13px;line-height:1.7;max-width:780px;color:#d7eded}.db-overline{font-size:10px;font-weight:800;letter-spacing:1.2px;color:#89e3d7}.db-sections{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 17px}.db-sections button{border:1px solid var(--stroke);border-radius:999px;background:var(--surface);color:var(--ink);padding:10px 14px;font-size:12px;font-weight:740}.db-sections button.active{background:var(--accent);border-color:var(--accent);color:#fff}.db-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.db-tile{border:1px solid var(--stroke);border-radius:17px;background:var(--surface);padding:20px;text-align:left;color:var(--ink);display:grid;gap:8px;min-height:149px}.db-tile:hover{border-color:var(--accent)}.db-tile b{font-size:16px}.db-tile span{font-size:11px;color:var(--accent-dark);font-weight:800;letter-spacing:1px}.db-tile p{font-size:12px;color:var(--ink-soft);margin:0;line-height:1.55}.db-lead{margin:0 0 19px;color:var(--ink-soft);font-size:12px}.db-two{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(270px,.85fr);gap:17px;align-items:start}.db-panel{background:var(--surface);border:1px solid var(--stroke);border-radius:17px;padding:23px;min-width:0}.db-form{display:grid;gap:13px}.db-field{display:grid;gap:6px;font-size:12px;font-weight:700}.db-field input,.db-field select,.db-field textarea{width:100%;background:var(--surface);color:var(--ink);border:1px solid var(--stroke);border-radius:10px;min-height:43px;padding:10px 12px;font:inherit;font-size:13px;font-weight:500}.db-field textarea{min-height:125px;resize:vertical;font-family:ui-monospace,monospace;font-size:12px}.db-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:5px}.db-btn{border:1px solid var(--stroke);background:var(--surface);color:var(--ink);padding:10px 13px;border-radius:9px;min-height:42px;font-size:12px;font-weight:700}.db-btn.emphasis{background:var(--accent);color:#fff;border-color:var(--accent)}.db-results h2{font-size:18px;margin:0 0 11px}.db-results strong{font-size:15px}.db-results p,.db-results li{font-size:13px;line-height:1.55;overflow-wrap:anywhere}.db-results ul{padding-left:20px;margin:8px 0 17px}.db-results li+li{margin-top:5px}.db-status{padding:12px 14px;border-radius:11px;background:var(--soft);border-left:4px solid var(--accent);margin:12px 0 15px}.db-status.critical{border-color:var(--red);background:var(--red-bg)}.db-status.review{border-color:var(--alert);background:var(--alert-bg)}.db-note{padding:14px;border:1px solid var(--stroke);border-radius:12px;margin-top:19px;font-size:12px;color:var(--ink-soft)}.db-note a{overflow-wrap:anywhere}.db-hint{font-size:11px;color:var(--ink-soft);line-height:1.5}.db-link{background:none;border:0;color:var(--accent-dark);font-weight:750;padding:9px 0;text-align:left}.db-cardback{margin:0 0 12px}.db-flag{margin-bottom:13px}.db-flag h3{font-size:13px;margin:0 0 5px}.db-flag.urgent h3{color:var(--red)}.db-safety{padding:14px 17px;margin:16px 0;background:var(--alert-bg);border-radius:12px;border-left:4px solid var(--alert);color:var(--ink);font-size:12px}@media(max-width:820px){.db-two,.db-tiles{grid-template-columns:1fr}.db-hero{padding:21px}.db-panel{padding:16px}}';
  document.head.appendChild(style);
 }
 function layout(){
  host.innerHTML='<button class="breadcrumb-back" type="button" id="db-leave">← Endocrinología y Diabetes</button>'+
   '<section class="db-hero"><div class="db-overline">KIDBUM · SEGURIDAD METABÓLICA</div><h1>Diabetes & Insulin Pro</h1><p>Hospital · consulta externa · urgencias diabéticas. Herramientas educativas y de verificación: nunca sustituyen indicaciones médicas, validación farmacológica ni protocolos institucionales.</p></section>'+
   '<p class="db-lead">Solo adultos no embarazados · procesamiento local · sin envío de datos ni almacenamiento de información clínica.</p>'+
   '<div id="db-view"></div>';
  host.querySelector('#db-leave').onclick=onBack;
  show();
 }
 function show(){
  const view=host.querySelector('#db-view');if(!view)return;
  if(!active)return showGrid(view);
  const tool=core.tools.find(x=>x.id===active);
  view.innerHTML='<div class="db-cardback"><button class="db-link" type="button" id="db-tools">← Todas las herramientas</button></div>'+
   '<div class="db-two"><section class="db-panel"><div class="db-overline">'+esc(tool.tag)+'</div><h2>'+esc(tool.title)+'</h2><p class="db-lead">'+esc(tool.intro)+'</p><form id="db-form" class="db-form" autocomplete="off"></form>'+
   '<div class="db-actions"><button type="button" class="db-btn" id="db-example">Ejemplo ficticio</button><button type="button" class="db-btn" id="db-clear">Limpiar</button><button type="button" class="db-btn" id="db-copy" disabled>Copiar resumen</button></div>'+
   '</section><aside class="db-panel db-results" aria-live="polite"><h2>Evaluación clínica</h2><div id="db-output"><p>Completa todos los datos obligatorios.</p></div>'+
   '<div class="db-note"><strong>Fuentes y límites</strong><p>Referencias para verificar criterios y alcance clínico; sin actualización automática de guías.</p><p><a href="'+esc(tool.source)+'" target="_blank" rel="noopener noreferrer">Referencia principal de la herramienta ↗</a></p><p>Las salidas NO son órdenes terapéuticas.</p></div></aside></div>';
  view.querySelector('#db-tools').onclick=()=>{active=null;show();};
  const form=view.querySelector('#db-form'),entries=new Map();
  for(const f of tool.fields){
   const wrap=document.createElement('div');wrap.className='db-field';
   const label=document.createElement('label');label.htmlFor='db-'+f.key;label.textContent=f.label+(f.unit?' ('+f.unit+')':'')+(f.optional?' · opcional':'');
   const input=f.type==='choice'?document.createElement('select'):f.type==='text'?document.createElement('textarea'):document.createElement('input');
   input.id='db-'+f.key;input.name=f.key;
   if(f.type==='choice'){
    const empty=document.createElement('option');empty.value='';empty.textContent='Seleccionar · obligatorio';input.append(empty);
    for(const [value,title] of f.options){const o=document.createElement('option');o.value=value;o.textContent=title;input.append(o);}
   }else if(f.type==='number'){input.type='text';input.inputMode='decimal';input.placeholder='Solo dato documentado';}
   else {input.spellcheck=false;input.rows=active==='cgm-intelligence'?7:3;input.placeholder=f.hint||'';}
   wrap.append(label,input);
   if(f.hint){const p=document.createElement('span');p.className='db-hint';p.textContent=f.hint;wrap.append(p);}
   form.append(wrap);entries.set(f.key,input);
  }
  if(active==='cgm-intelligence'){
   const note=document.createElement('div');note.className='db-field';
   const label=document.createElement('label');label.textContent='Importar CSV local (opcional)';label.htmlFor='db-csv-import';
   const picker=document.createElement('input');picker.type='file';picker.id='db-csv-import';picker.accept='.csv,text/csv,text/plain';
   picker.onchange=async()=>{
    const file=picker.files&&picker.files[0];if(!file)return;
    if(file.size>500000){alert('El archivo supera 500 KB. No se importará.');return;}
    const str=await file.text();entries.get('csv').value=str;update();
   };
   note.append(label,picker);form.append(note);
  }
  let last=null;
  const output=view.querySelector('#db-output');
  function read(){const obj={};for(const [k,input] of entries)obj[k]=input.value;return obj;}
  function lineGroup(title,items,klass){
   if(!items||!items.length)return;
   const container=document.createElement('div');container.className='db-flag'+(klass?' '+klass:'');
   const h=document.createElement('h3');h.textContent=title;container.append(h);
   const ul=document.createElement('ul');for(const text of items){const li=document.createElement('li');li.textContent=text;ul.append(li);}container.append(ul);output.append(container);
  }
  function update(){
   last=core.evaluate(active,read(),engine);output.replaceChildren();
   const top=document.createElement('div');top.className='db-status '+last.status;
   const head=document.createElement('strong');head.textContent=last.headline;top.append(head);output.append(top);
   if(last.ready){
    lineGroup('Hallazgos y cálculos',last.details,'');
    lineGroup('ALERTAS DE PRIORIDAD',last.critical,'urgent');
    lineGroup('Aspectos para verificar',last.warnings,'');
   }else lineGroup('Campos pendientes / no evaluables',last.warnings,'');
   view.querySelector('#db-copy').disabled=!last.ready;
  }
  for(const input of entries.values())input.addEventListener('input',update);
  view.querySelector('#db-example').onclick=()=>{const x=core.examples[active];for(const [k,input] of entries)input.value=x[k]??'';update();};
  view.querySelector('#db-clear').onclick=()=>{for(const input of entries.values())input.value='';view.querySelector('#db-csv-import')&&(view.querySelector('#db-csv-import').value='');update();};
  view.querySelector('#db-copy').onclick=()=>{
   if(!last||!last.ready)return;
   const body=[tool.title,last.headline,...last.details,...last.critical.map(z=>'ALERTA: '+z),...last.warnings.map(z=>'Revisar: '+z),'Fuente: '+tool.source,'Ejemplo educativo, no orden médica.'].join('\n');
   if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(body).catch(()=>alert('No se pudo copiar.'));else alert('El navegador no permite copiar aquí.');
  };
  update();
 }
 function showGrid(view){
  view.innerHTML='<div class="db-sections" id="db-tabs" role="group" aria-label="Área clínica">'+
   '<button type="button" data-filter="all" class="active">Todas (6)</button>'+
   '<button type="button" data-filter="hospital">Hospital</button>'+
   '<button type="button" data-filter="urgencias">Urgencias</button>'+
   '<button type="button" data-filter="consulta">Consulta externa</button></div>'+
   '<div class="db-tiles" id="db-tiles"></div>'+
   '<div class="db-safety">⚠ No introducir nombres, fechas de nacimiento, identificadores, historias clínicas ni otros datos personales. Las evaluaciones se realizan localmente y no quedan almacenadas. No hay prescripción automática.</div>';
  const tiles=view.querySelector('#db-tiles');
  function draw(filter){
   tiles.replaceChildren();
   for(const tool of core.tools.filter(x=>filter==='all'||x.area===filter)){
    const btn=document.createElement('button');btn.type='button';btn.className='db-tile';
    const tag=document.createElement('span');tag.textContent=names[tool.area]+' · '+tool.tag;
    const title=document.createElement('b');title.textContent=tool.title;
    const p=document.createElement('p');p.textContent=tool.intro;
    btn.append(tag,title,p);btn.onclick=()=>{active=tool.id;show();window.scrollTo({top:0,behavior:'instant'});};tiles.append(btn);
   }
   view.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  }
  view.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>draw(b.dataset.filter));
  draw('all');
 }
 layout();
}
root.KidBumDiabetes=Object.freeze({render});
})(typeof window!=='undefined'?window:globalThis);
