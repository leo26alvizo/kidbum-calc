/* KidBum ENARM 1.2 · Preguntas directas.
 * Original educational bank, not an official ENARM simulator or medical order.
 * All answers and history stay on this device. */
(function(){
 'use strict';
 const root=document.getElementById('direct-app');
 const bank=window.KidBumDirectBank;
 const radar=window.KidBumENARMRadar;
 if(!root)return;
 if(!bank||bank.questionCount!==238||!radar){
  root.textContent='No se pudo cargar el banco de preguntas directas. Actualiza KidBum e inténtalo de nuevo.';
  return;
 }
 const KEY='kidbum-enarm-direct-progress-v1';
 const ABCD='ABCD';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const history=loadHistory();
 const state={mode:'study',area:'Todas',type:'Todos',length:10,search:'',session:null};
 let timer=null;
 function loadHistory(){
  try{
   const raw=localStorage.getItem(KEY);
   if(!raw||raw.length>135000)return Object.create(null);
   const value=JSON.parse(raw);
   if(!value||typeof value!=='object'||Array.isArray(value))return Object.create(null);
   const out=Object.create(null);
   const ids=new Set(bank.items.map(x=>x.id));
   for(const [id,h] of Object.entries(value).slice(0,240)){
    if(!ids.has(id)||!h||typeof h!=='object')continue;
    out[id]=radar.normalize(h);
   }
   return out;
  }catch{return Object.create(null)}
 }
 function persist(){try{localStorage.setItem(KEY,JSON.stringify(history))}catch{/* In-memory fallback */}}
 function counts(){
  const all=Object.values(history);
  const attempts=all.reduce((n,h)=>n+h.seen,0);
  const right=all.reduce((n,h)=>n+h.right,0);
  const weak=all.filter(radar.weak).length;
  const due=all.filter(h=>radar.due(h)).length;
  return{attempts,right,weak,due,unique:all.filter(h=>h.seen>0).length,accuracy:attempts?Math.round(right/attempts*100):null};
 }
 function matching(){
  const q=state.search.trim().toLocaleLowerCase('es-MX');
  return bank.items.filter(item=>
   (state.area==='Todas'||item.area===state.area)&&
   (state.type==='Todos'||item.type===state.type)&&
   (!q||(item.prompt+' '+item.area+' '+item.type).toLocaleLowerCase('es-MX').includes(q))&&
   (state.mode!=='weak'||radar.weak(history[item.id]))&&
   (state.mode!=='due'||radar.due(history[item.id]))
  );
 }
 function shuffle(items){
  const values=items.slice();
  for(let i=values.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   [values[i],values[j]]=[values[j],values[i]];
  }
  return values;
 }
 function stopTimer(){if(timer!==null){clearInterval(timer);timer=null}}
 function formatClock(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
 function reading(item){
  const r=item.reading&&item.reading[0];
  if(!r||!/^https:\/\//.test(r.url))return '';
  return '<p class="dq-ref">Lectura general por especialidad (no valida esta pregunta): <a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.label)+' ↗</a></p>';
 }
 function histogram(){
  return '<section class="en-card dq-performance" aria-label="Resultados por tipo de conocimiento">'+
   '<div class="en-overline">Aprendizaje en este dispositivo</div><h2>Dominio por conocimiento</h2>'+
   '<p class="en-small en-muted">Son porcentajes de práctica, no una predicción de rendimiento ENARM. Menos de cinco respuestas por tema es muestra pequeña.</p>'+
   '<div class="dq-performance-grid">'+bank.types.map(type=>{
    const arr=bank.items.filter(i=>i.type===type);
    const h=arr.map(i=>history[i.id]).filter(Boolean);
    const attempts=h.reduce((n,x)=>n+x.seen,0);
    const correct=h.reduce((n,x)=>n+x.right,0);
    const pct=attempts?Math.round(correct/attempts*100):null;
    return '<div class="dq-track-row"><div class="dq-track-head"><strong>'+esc(type)+'</strong><span>'+(pct===null?'Sin datos':pct+' % · '+attempts+' '+(attempts===1?'intento':'intentos')+(attempts<5?' · Muestra pequeña':''))+'</span></div>'+
     '<div class="dq-track"'+(pct===null?' aria-hidden="true"':' role="progressbar" aria-label="'+esc(type)+' · aciertos" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'"')+'><span style="width:'+(pct??0)+'%"></span></div></div>';
   }).join('')+'</div></section>';
 }
 function home(){
  stopTimer();state.session=null;
  const stat=counts(),pool=matching();
  root.innerHTML='<section class="dq-stats" aria-label="Estadísticas de preguntas directas">'+
   '<div class="dq-stat"><span class="dq-stat-icon" aria-hidden="true">✦</span><strong>'+bank.questionCount+'</strong><span>Preguntas directas</span></div>'+
   '<div class="dq-stat"><span class="dq-stat-icon" aria-hidden="true">◈</span><strong>'+stat.unique+'</strong><span>Preguntas practicadas</span></div>'+
   '<div class="dq-stat"><span class="dq-stat-icon" aria-hidden="true">◎</span><strong>'+(stat.accuracy===null?'—':stat.accuracy+' %')+'</strong><span>Aciertos · '+stat.attempts+' intentos</span></div></section>'+
   '<section class="en-card dq-setup" aria-labelledby="dq-setup-title">'+
   '<div class="en-overline">Pregunta por pregunta · Sin viñetas clínicas</div>'+
   '<h2 id="dq-setup-title">Entrena lo que realmente sabes</h2>'+
   '<p class="en-small en-muted">Elige una especialidad, un tema y una modalidad. Cuatro opciones, una respuesta y una explicación escrita para cada reactivo.</p>'+
   '<div class="dq-modes" role="group" aria-label="Modalidad">'+
   [['study','Estudio','Explicación al responder','book'],['exam','Simulacro','Resultados al finalizar','timer'],['weak','Mis errores','Vuelve a lo que fallaste','target'],['due','Repaso de hoy','Repetición espaciada','calendar']].map(v=>
    '<button type="button" class="dq-mode" data-dq-mode="'+v[0]+'" aria-pressed="'+(state.mode===v[0])+'"><span class="dq-mode-head">'+(v[3]==='timer'?'⏱':v[3]==='target'?'◎':v[3]==='calendar'?'▦':'▤')+'</span><strong>'+v[1]+'</strong><small>'+v[2]+'</small></button>'
   ).join('')+'</div>'+
   '<div class="dq-filters">'+
   '<div class="en-field"><label for="dq-area">Especialidad</label><select id="dq-area">'+
    ['Todas',...bank.areas].map(v=>'<option value="'+esc(v)+'"'+(state.area===v?' selected':'')+'>'+esc(v)+'</option>').join('')+
   '</select></div>'+
   '<div class="en-field"><label for="dq-type">Tipo de conocimiento</label><select id="dq-type">'+
    ['Todos',...bank.types].map(v=>'<option value="'+esc(v)+'"'+(state.type===v?' selected':'')+'>'+esc(v)+'</option>').join('')+
   '</select></div>'+
   '<div class="en-field"><label for="dq-length">Preguntas por sesión</label><select id="dq-length">'+
    [10,20,30,50].map(v=>'<option value="'+v+'"'+(state.length===v?' selected':'')+'>'+v+' preguntas</option>').join('')+
   '</select></div>'+
   '<div class="en-field"><label for="dq-search">Buscar tema o palabra</label><input id="dq-search" type="search" autocomplete="off" value="'+esc(state.search)+'" placeholder="Ej.: insulina, RCP, sensibilidad"></div>'+
   '</div><p id="dq-available" class="en-micro" aria-live="polite">'+pool.length+' preguntas disponibles con estos filtros. '+(state.mode==='weak'?'Solo las que aún necesitan reforzarse.':state.mode==='due'?'Solo las ya practicadas y vencidas.':'')+'</p>'+
   '<div class="en-actions"><button type="button" class="en-btn" id="dq-start"'+(!pool.length?' disabled':'')+'>Comenzar '+(state.mode==='exam'?'simulacro':'preguntas')+' →</button>'+
   '<button type="button" class="en-btn en-quiet" id="dq-reset"'+(!stat.attempts?' disabled':'')+'>Borrar progreso directo</button></div>'+
   '<p class="en-micro">Las respuestas de preguntas directas se guardan por separado del modo casos. Sin cuentas, sin envío de resultados y sin datos de pacientes.</p></section>'+
   histogram()+
   '<section class="en-card" aria-label="Referencias y límites del banco"><h2>Banco original, no oficial</h2>'+
   '<p class="en-small en-muted">'+esc(bank.notes)+' Se emplearon referencias temáticas para orientar el contenido, sin revisión clínica independiente documentada de cada reactivo.</p>'+
   '<p class="en-small"><a href="./enarm.html">← Volver a los 37 casos clínicos</a></p></section>';
  root.querySelectorAll('[data-dq-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.dqMode;home()});
  root.querySelector('#dq-area').onchange=e=>{state.area=e.target.value;home()};
  root.querySelector('#dq-type').onchange=e=>{state.type=e.target.value;home()};
  root.querySelector('#dq-length').onchange=e=>{state.length=Number(e.target.value);home()};
  root.querySelector('#dq-search').oninput=e=>{
   state.search=e.target.value;
   const n=matching().length;
   root.querySelector('#dq-available').textContent=n+' preguntas disponibles con estos filtros.';
   root.querySelector('#dq-start').disabled=!n;
  };
  root.querySelector('#dq-start').onclick=start;
  root.querySelector('#dq-reset').onclick=()=>{
   if(!window.confirm('¿Borrar únicamente el progreso de preguntas directas guardado en este dispositivo? Los casos clínicos no se modificarán.'))return;
   for(const k of Object.keys(history))delete history[k];
   try{localStorage.removeItem(KEY)}catch{}
   home();
  };
 }
 function start(){
  const all=matching();
  if(!all.length)return;
  const pool=state.mode==='due'?all.slice().sort((a,b)=>
   (history[a.id]?.dueAt||0)-(history[b.id]?.dueAt||0)
  ):shuffle(all);
  const selected=pool.slice(0,Math.min(state.length,pool.length));
  const duration=selected.length*60;
  state.session={mode:state.mode,items:selected,answers:Array(selected.length).fill(null),revealed:new Set(),index:0,deadline:Date.now()+duration*1000,finished:false};
  if(state.mode==='exam')timer=setInterval(tick,1000);
  question();
 }
 function record(item,index){
  const answer=state.session.answers[index];
  if(answer===null)return;
  history[item.id]=radar.record(history[item.id],answer===item.correct);
  persist();
 }
 function tick(){
  const s=state.session;
  if(!s||s.mode!=='exam'||s.finished){stopTimer();return}
  const left=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));
  const display=root.querySelector('#dq-clock');
  if(display){display.textContent=formatClock(left);display.dataset.low=String(left<=60)}
  if(!left)finish(true);
 }
 function question(){
  const s=state.session;
  if(!s||s.finished)return;
  const i=s.index,q=s.items[i],ans=s.answers[i],revealed=s.revealed.has(i);
  const rem=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));
  root.innerHTML='<section class="en-card dq-question-card" aria-label="Pregunta directa">'+
   '<div class="en-progress-top"><span>Pregunta '+(i+1)+' de '+s.items.length+'</span>'+
   (s.mode==='exam'?'<span id="dq-clock" class="en-clock" data-low="'+(rem<=60)+'" role="timer" aria-label="Tiempo restante">'+formatClock(rem)+'</span>':'<span>'+esc(q.area)+'</span>')+'</div>'+
   '<div class="en-track" aria-hidden="true"><div style="width:'+Math.round((i+1)/s.items.length*100)+'%"></div></div>'+
   '<div class="dq-question-meta"><span>'+esc(q.type)+'</span><span>'+esc(q.area)+'</span></div>'+
   '<h2 class="en-question" id="dq-prompt" tabindex="-1">'+esc(q.prompt)+'</h2>'+
   '<fieldset class="en-choices" aria-labelledby="dq-prompt">'+
   q.options.map((v,j)=>'<label class="en-choice'+(revealed?(j===q.correct?' en-correct':j===ans?' en-incorrect':''):'')+'">'+
    '<input type="radio" name="dq-answer" value="'+j+'"'+(ans===j?' checked':'')+(revealed?' disabled':'')+'><span class="en-option-label">'+ABCD[j]+'.</span><span>'+esc(v)+'</span></label>').join('')+'</fieldset>'+
   (revealed?'<div class="en-feedback" data-correct="'+(ans===q.correct)+'" role="status"><strong>'+
    (ans===q.correct?'✓ Respuesta correcta':'Respuesta correcta: '+ABCD[q.correct]+'. '+esc(q.options[q.correct]))+
    '</strong><p>'+esc(q.why)+'</p>'+reading(q)+
    '<p class="en-note">Pregunta educativa original, pendiente de revisión clínica independiente.</p></div>':'')+
   '<div class="en-actions">'+
   (s.mode==='exam'?'<button type="button" class="en-btn en-quiet" id="dq-prev"'+(i===0?' disabled':'')+'>← Anterior</button>'+
    '<button type="button" class="en-btn" id="dq-next">'+(i===s.items.length-1?'Finalizar simulacro':'Siguiente →')+'</button>':
     revealed?'<button type="button" class="en-btn" id="dq-next">'+(i===s.items.length-1?'Ver resultados':'Siguiente pregunta →')+'</button>':
     '<button type="button" class="en-btn" id="dq-check"'+(ans===null?' disabled':'')+'>Comprobar</button>'+
     '<button type="button" class="en-btn en-quiet" id="dq-skip">Omitir</button>')+
    '<button type="button" class="en-btn en-quiet" id="dq-exit">Salir</button></div>'+
   '<p class="en-micro">'+(s.mode==='exam'?'Temporizador orientativo: 60 segundos por pregunta. No reproduce el examen oficial.':'Resuelve sin consultar el banco. La explicación aparece después de responder.')+'</p></section>';
  root.querySelectorAll('input[name="dq-answer"]').forEach(el=>el.onchange=()=>{
   if(revealed)return;
   s.answers[s.index]=Number(el.value);
   const check=root.querySelector('#dq-check');
   if(check)check.disabled=false;
  });
  const check=root.querySelector('#dq-check');
  if(check)check.onclick=()=>{
   if(s.answers[s.index]===null||s.revealed.has(s.index))return;
   s.revealed.add(s.index);record(q,s.index);question();
  };
  const next=root.querySelector('#dq-next');
  if(next)next.onclick=()=>{
   if(s.index===s.items.length-1)finish(false);
   else{s.index++;question()}
  };
  const prev=root.querySelector('#dq-prev');
  if(prev)prev.onclick=()=>{if(s.index>0){s.index--;question()}};
  const skip=root.querySelector('#dq-skip');
  if(skip)skip.onclick=()=>{if(s.index===s.items.length-1)finish(false);else{s.index++;question()}};
  root.querySelector('#dq-exit').onclick=()=>{
   if(!window.confirm('¿Salir de esta sesión? Las respuestas de un simulacro sin terminar no se guardan.'))return;
   home();
  };
  if(s.mode==='exam'&&s.index===0)tick();
 }
 function finish(timedOut){
  const s=state.session;
  if(!s||s.finished)return;
  const blanks=s.answers.filter(x=>x===null).length;
  if(s.mode==='exam'&&!timedOut&&blanks&&!window.confirm('Quedan '+blanks+' preguntas sin responder. ¿Finalizar?'))return;
  s.finished=true;stopTimer();
  if(s.mode==='exam')s.items.forEach((item,i)=>record(item,i));
  const answered=s.answers.filter(x=>x!==null).length;
  const right=s.items.reduce((n,item,i)=>n+(s.answers[i]===item.correct?1:0),0);
  root.innerHTML='<section class="en-card dq-results" aria-label="Resultados de preguntas directas">'+
   '<div class="en-overline">Sesión '+(timedOut?'finalizada por tiempo':'finalizada')+'</div>'+
   '<h2>Conocimiento en revisión</h2>'+
   '<p class="en-small en-muted">Resultados de práctica, no equivalen a puntuación ni validación oficial. Se conservan únicamente en este dispositivo.</p>'+
   '<div class="dq-stats"><div class="dq-stat"><strong>'+right+'/'+s.items.length+'</strong><span>Aciertos</span></div>'+
   '<div class="dq-stat"><strong>'+(answered-right)+'</strong><span>Incorrectas</span></div>'+
   '<div class="dq-stat"><strong>'+blanks+'</strong><span>Omitidas</span></div></div>'+
   '<h3>Revisión detallada</h3><div class="en-summary-list">'+
   s.items.map((item,i)=>{
    const a=s.answers[i],ok=a===item.correct;
    return '<article class="en-summary-item"><div class="en-progress-top"><strong>'+(i+1)+'. '+esc(item.type)+'</strong>'+
      '<span class="en-indicator '+(a===null?'skip':ok?'good':'bad')+'">'+(a===null?'Omitida':ok?'Correcta':'Incorrecta')+'</span></div>'+
      '<p><strong>'+esc(item.prompt)+'</strong></p>'+
      '<p>Tu respuesta: '+(a===null?'Sin contestar':esc(ABCD[a]+'. '+item.options[a]))+'</p>'+
      '<p>Correcta: '+ABCD[item.correct]+'. '+esc(item.options[item.correct])+'</p>'+
      '<p>'+esc(item.why)+'</p>'+reading(item)+'</article>';
   }).join('')+'</div>'+
   '<div class="en-actions"><button type="button" class="en-btn" id="dq-home">Volver a preguntas →</button></div></section>';
  root.querySelector('#dq-home').onclick=home;
  window.scrollTo({top:0,behavior:'instant'});
 }
 function setupTheme(){
  try{document.documentElement.classList.toggle('dark',localStorage.getItem('kidbum-theme')==='dark')}catch{}
  const btn=document.getElementById('en-theme');
  if(!btn)return;
  const reflect=()=>{btn.textContent=document.documentElement.classList.contains('dark')?'☀ Modo claro':'◐ Modo oscuro'};
  reflect();
  btn.onclick=()=>{
   document.documentElement.classList.toggle('dark');
   try{localStorage.setItem('kidbum-theme',document.documentElement.classList.contains('dark')?'dark':'light')}catch{}
   reflect();
  };
 }
 window.addEventListener('pagehide',stopTimer);
 setupTheme();home();
})();
