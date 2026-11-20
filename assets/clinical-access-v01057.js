/* KidBum 0.10.57 · Nonclinical access layer.
 * Stores only fixed tool keys (never patient information or form inputs).
 * All destinations must come from the local, reviewed tool registry.
 */
(function(root,factory){
 'use strict';
 const api=factory();
 root.KidBumAccess=api;
 if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 const PINS='kidbum-access-pins-v1';
 // Remove pre-existing automatic navigation history. Preserve explicit favorites.
 try{if(typeof localStorage!=='undefined')localStorage.removeItem('kidbum-access-recent-v1');}catch{/* Optional browser storage. */}
 const aliases={
  'calc:gcs':'glasgow escala de coma gcs',
  'calc:nihss':'ictus evc evento vascular cerebral stroke',
  'calc:qsofa':'sepsis q sofa',
  'calc:news2':'alerta temprana deterioro',
  'calc:apache2':'apache ii terapia intensiva uci',
  'calc:apache2quick':'apache ii terapia intensiva uci',
  'calc:pafi':'pafi pao2 fio2 oxigenacion',
  'calc:anion':'anion gap brecha anionica',
  'calc:winter':'compensacion acido base',
  'url:./expansion-20.html#pecarn':'traumatismo craneoencefalico tce',
  'url:./pediatria-evaluacion-rapida.html#tep':'triangulo evaluacion pediatrica',
  'url:./algoritmos-urgencias.html':'urgencias uci reanimacion acls sepsis choque evc',
  'url:./algoritmos-pediatria.html':'pals reanimacion neonatal pediatria',
  'url:./pharma-pro.html':'farmacos medicamentos farmacia farmacologia dosis ficha farmaceutica'
 };
 function normalize(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
 function safeRead(key){
  try{const data=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(data)?data.filter(x=>typeof x==='string'&&x.length<180).slice(0,80):[];}
  catch{return [];}
 }
 function safeWrite(key,items){try{localStorage.setItem(key,JSON.stringify(items));}catch{/* Storage is optional. */}}
 function pinned(){return safeRead(PINS);}
 function togglePin(key){
  const items=pinned();safeWrite(PINS,items.includes(key)?items.filter(x=>x!==key):[key,...items].slice(0,70));
 }
 function searchEntries(entries,term,limit=18){
  const words=normalize(term).split(' ').filter(Boolean);
  if(!words.length)return [];
  return entries.map((item,i)=>{
   const name=normalize(item.title),hay=normalize(item.title+' '+item.id+' '+item.category+' '+(item.short||'')+' '+(aliases[item.key]||''));
   if(!words.every(w=>hay.includes(w)))return null;
   const rank=(name===words.join(' ')?200:0)+(name.startsWith(words[0])?80:0)+(normalize(item.id)===words.join(' ')?100:0)+(name.includes(words.join(' '))?30:0)-(item.kind==='Medicamento'?6:0);
   return {item,rank,i};
  }).filter(Boolean).sort((a,b)=>b.rank-a.rank||a.i-b.i).slice(0,limit).map(x=>x.item);
 }
 function encode(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function dedupe(entries){const seen=new Set();return entries.filter(e=>{if(!e||!e.key||seen.has(e.key))return false;seen.add(e.key);return true;});}
 function catalog(items){
  const meds=(typeof window!=='undefined'&&Array.isArray(window.KidBumDrugSearchNames))?window.KidBumDrugSearchNames:[];
  return dedupe([...items,...meds.map(pair=>({key:'url:./pharma-pro.html#'+pair[0],url:'./pharma-pro.html#'+pair[0],id:pair[0],title:pair[1],category:'Pharma Pro',kind:'Medicamento',short:'Ficha índice · revisar cobertura clínica y formulación'}))]);
 }
 function makeList(entries,selected,pinnedKeys,buttons=true){
  return '<ul class="kb-access-list">'+entries.map(entry=>{
   const saved=pinnedKeys.has(entry.key);
   return '<li class="kb-access-item"><button type="button" class="kb-access-open" data-kb-open="'+encode(entry.key)+'"><span class="kb-access-name">'+encode(entry.title)+'</span><small>'+encode(entry.category||entry.kind||'Herramienta')+(entry.kind==='Medicamento'?' · Índice, no dosis validada':'')+'</small></button>'+
    (buttons?'<button type="button" class="kb-access-star" data-kb-pin="'+encode(entry.key)+'" aria-pressed="'+saved+'" aria-label="'+(saved?'Quitar de favoritos: ':'Guardar en favoritos: ')+encode(entry.title)+'">'+(saved?'★':'☆')+'</button>':'')+'</li>';
  }).join('')+'</ul>';
 }
 function render(options){
  const slot=document.getElementById('kb-access-slot');if(!slot)return;
  const entries=catalog(options.entries), lookup=new Map(entries.map(e=>[e.key,e]));
  const core=new Set((options.favorites||[]).map(id=>'calc:'+id));
  const saved=new Set([...core,...pinned()]);
  const savedModules=entries.filter(e=>saved.has(e.key)&&!e.key.startsWith('calc:'));
  const query=String(options.search||'').trim();
  let html='';
  if(query){
   const scope=options.screen==='favorite'?entries.filter(e=>saved.has(e.key)):entries;
   const matches=searchEntries(scope,query,18);
   html='<section class="kb-access-section" aria-labelledby="kb-access-heading"><h3 id="kb-access-heading">Resultados en todas las herramientas</h3><p id="kb-access-count" role="status" aria-live="polite">'+(matches.length===18?'Primeras 18 coincidencias':matches.length+' coincidencia'+(matches.length===1?'':'s'))+' · Calculadoras, módulos y catálogo farmacológico</p>'+
    (matches.length?makeList(matches,null,saved):'<p class="kb-access-empty">No hay resultados en el índice general. Prueba con una sigla o sin acentos.</p>')+'</section>';
  }else if(options.screen==='favorite'&&savedModules.length){
   html='<section class="kb-access-section" aria-labelledby="kb-access-heading"><h3 id="kb-access-heading">Otros módulos guardados</h3>'+makeList(savedModules,null,saved)+'</section>';
  }
  slot.innerHTML=html;
  slot.querySelectorAll('[data-kb-open]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.kbOpen;if(lookup.has(key))options.onOpen(key);}));
  slot.querySelectorAll('[data-kb-pin]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.kbPin;if(lookup.has(key))options.onPin(key);}));
 }
 function offlineStatus(){
  const node=document.getElementById('kb-offline-status');if(!node)return;
  const connected=navigator.onLine!==false;
  const set=message=>{node.textContent=message;node.dataset.connection=connected?'online':'offline';const side=document.getElementById('net-label');if(side)side.textContent=message;};
  if(!('serviceWorker'in navigator)||!('caches'in window)){set(connected?'Conexión detectada · modo offline no verificado':'Sin red · recursos offline no verificados');return;}
  caches.keys().then(async names=>{
   const candidates=names.filter(n=>n.startsWith('kidbum-calc-')).reverse();
   let ready=false;
   for(const name of candidates){
    const cache=await caches.open(name);
    const critical=['./index.html','./assets/startup-bundle.js','./assets/clinical-access-v01057.js','./pharma-pro.html','./algoritmos-urgencias.html'];
    const checks=await Promise.all(critical.map(p=>cache.match(new URL(p,location.href).href)));
    if(checks.every(Boolean)){ready=true;break;}
   }
   set(ready?(connected?'Offline preparado · herramientas guardadas':'Sin red · recursos clínicos guardados'):(connected?'Conexión detectada · offline aún no verificado':'Sin red · instalación offline incompleta'));
  }).catch(()=>set(connected?'Conexión detectada · offline no verificado':'Sin red · no se pudo comprobar la caché'));
 }
 function showUpdate(){
  const banner=document.getElementById('kb-update-banner');if(!banner)return;
  banner.hidden=false;
  const btn=banner.querySelector('button');
  if(btn)btn.onclick=()=>window.location.reload();
 }
 function bindStatus(){
  window.addEventListener('online',offlineStatus);
  window.addEventListener('offline',offlineStatus);
  if('serviceWorker'in navigator){
   navigator.serviceWorker.addEventListener('controllerchange',offlineStatus);
   navigator.serviceWorker.ready.then(offlineStatus).catch(()=>{});
  }
  offlineStatus();
 }
 return Object.freeze({normalize,searchEntries,pinned,togglePin,catalog,render,offlineStatus,showUpdate,bindStatus});
});
