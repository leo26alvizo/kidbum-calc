/* KidBum ENARM 1.1 · UI and local training logic · v0.10.66
 * Runs offline, no analytics/network requests, no patient data or prescriptions.
 * Timed mode is a PRACTICE timer, not an ENARM timing claim. */
(function(){
 'use strict';
 const root=document.getElementById('enarm-app');
 const bank=window.KidBumENARMBank;
 const radar=window.KidBumENARMRadar;
 if(!root)return;
 if(!bank||!Array.isArray(bank.cases)||!radar){root.textContent='No se pudo cargar el banco educativo o el Radar. Actualiza los archivos de KidBum antes de estudiar.';return;}
 const storageKey='kidbum-enarm-progress-v1';
 const alphabet='ABCD';
 const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const history=loadHistory();
 const state={screen:'home',mode:'study',area:'Todas',size:10,session:null};
 let timer=null;
 function loadHistory(){
  try{
   const raw=localStorage.getItem(storageKey);
   if(!raw||raw.length>70000)return Object.create(null);
   const obj=JSON.parse(raw);
   if(!obj||typeof obj!=='object'||Array.isArray(obj))return Object.create(null);
   const out=Object.create(null);
   for(const [key,h] of Object.entries(obj).slice(0,250)){
    if(!/^[a-z]{2,3}-\d{2}-[01]$/.test(key)||!h||typeof h!=='object')continue;
    const n=v=>Number.isSafeInteger(v)&&v>=0&&v<=10000?v:0;
    out[key]=radar.normalize({seen:n(h.seen),right:n(h.right),wrong:n(h.wrong),streak:n(h.streak),lastAt:h.lastAt,dueAt:h.dueAt,intervalDays:h.intervalDays});
   }
   return out;
  }catch{return Object.create(null)}
 }
 function persist(){try{localStorage.setItem(storageKey,JSON.stringify(history))}catch{/* Remains in memory */}}
 const keyOf=(c,qi)=>c.id+'-'+qi;
 function isWeak(c){return c.questions.some((q,i)=>radar.weak(history[keyOf(c,i)]))}
 function counts(){
  const stats=Object.values(history);
  const attempts=stats.reduce((n,x)=>n+x.seen,0),correct=stats.reduce((n,x)=>n+x.right,0);
  return{attempts,correct,weak:bank.cases.filter(isWeak).length,percent:attempts?Math.round(correct/attempts*100):null}
 }
 function available(){
  let items=bank.cases.filter(c=>state.area==='Todas'||c.area===state.area);
  if(state.mode==='weak')items=items.filter(isWeak);
  if(state.mode==='due')items=radar.dueCases(bank,history,state.area);
  return items;
 }
 function shuffle(items){
  const arr=items.slice();
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}
  return arr;
 }
 function ref(c){
  if(!c.source||!/^https:\/\//.test(c.source.url))return '';
  return '<a class="en-ref" href="'+esc(c.source.url)+'" target="_blank" rel="noopener noreferrer">Lectura sugerida para cotejo: '+esc(c.source.label)+' ↗</a>';
 }
 function enIcon(name){
  const paths={
   book:'<path d="M12 6.5C9.6 5 7.2 4.7 3 5.2V20c4.1-.6 6.7-.2 9 1.3 2.3-1.5 4.9-1.9 9-1.3V5.2c-4.2-.5-6.6-.2-9 1.3ZM12 6.5V21"/>',
   timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3M19 6l2-2"/>',
   target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.7"/><path d="m12 12 8-8"/>',
   calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15l2.2 2.2L16 12"/>',
   layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
   checklist:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.4 1.4L12 7M14 8h3M8 15l1.4 1.4L12 14M14 15h3"/>',
   chart:'<path d="M4 20V12M10 20V8M16 20V4M22 20V13"/><path d="M2 21h21"/>',
   brain:'<path d="M12 20V5M12 5c-2-3-6-2-7 1-3 0-4 5-1 7-2 3 0 7 4 7 1 2 3 2 4 0M12 5c2-3 6-2 7 1 3 0 4 5 1 7 2 3 0 7-4 7-1 2-3 2-4 0M7 9l2 2M17 9l-2 2M6 15l3 1M18 15l-3 1"/>',
   heart:'<path d="M20.8 5.6a5.6 5.6 0 0 0-7.9 0l-.9.9-.9-.9a5.6 5.6 0 0 0-7.9 7.3 7.3 0 0 0 0 9.3L12 22l8.8-7.1a7.3 7.3 0 0 0 0-9.3Z"/>',
   medical:'<path d="M4 4v6a5 5 0 0 0 10 0V4M2 4h4M12 4h4M14 10v3a4 4 0 0 0 8 0v-1M22 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>',
   people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M17 15a5 5 0 0 1 4 5v1"/>',
   scalpel:'<path d="M18 3 9 12M18 3l3 3-9 9-3-3M8 13l-5 5v3h3l5-5"/>',
   shield:'<path d="M12 2 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z"/><path d="M12 7v9M8 11.5h8"/>',
   globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/>'
  };
  return '<svg class="en-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+(paths[name]||paths.book)+'</svg>';
 }
 const caseArt={
  'Medicina Interna':'./assets/cardiologia-portada.jpg',
  'Pediatría':'./assets/pediatria-portada.webp',
  'Ginecología y Obstetricia':'./assets/ginecologia-portada.webp',
  'Cirugía General':'./assets/atlas-bmi.jpg',
  'Urgencias':'./assets/urgencias-portada.jpg',
  'Medicina Familiar':'./assets/atlas-lungs.jpg',
  'Salud Pública':'./assets/atlas-brain.jpg'
 };
 const areaIcon={
  'Medicina Interna':'medical',
  'Pediatría':'heart',
  'Ginecología y Obstetricia':'people',
  'Cirugía General':'scalpel',
  'Urgencias':'shield',
  'Medicina Familiar':'book',
  'Salud Pública':'globe'
 };
 function radarSection(data){
  const next=data.dueQuestions?'Hoy · tienes repasos pendientes':data.nextDueAt?new Date(data.nextDueAt).toLocaleDateString('es-MX',{day:'numeric',month:'short',year:'numeric'}):'Sin repaso programado';
  const weakest=data.weakest?'Área con más errores registrados (mínimo 5 intentos): <strong>'+esc(data.weakest.area)+'</strong>.':'Sin suficientes intentos por área para identificar una debilidad comparativa.';
  return '<section class="en-card en-radar" id="en-radar" aria-labelledby="en-radar-title">'+
   '<div class="en-overline">Tu progreso · solo en este dispositivo</div>'+
   '<div class="en-radar-title-row"><span class="en-radar-logo" aria-hidden="true">'+enIcon('chart')+'</span><h2 id="en-radar-title">Radar de Conocimiento · Casos clínicos</h2></div>'+
   '<p class="en-small en-muted">Aciertos de entrenamiento por área, calculados únicamente a partir de tus respuestas. No predice tu calificación ni el nivel de competencia clínica.</p>'+
   '<div class="en-radar-summary"><div><strong>'+data.seenQuestions+'</strong><span>Preguntas practicadas</span></div>'+
   '<div><strong>'+data.dueQuestions+'</strong><span>Preguntas listas para repasar</span></div>'+
   '<div><strong>'+data.weakQuestions+'</strong><span>Preguntas con errores por reforzar</span></div></div>'+
   '<div class="en-radar-bars" aria-label="Desempeño por especialidad">'+
   data.areas.map(area=>{
    const pct=area.percent,hasData=pct!==null;
    const qualifier=area.smallSample&&hasData?' · Muestra pequeña':'';
    return '<div class="en-radar-row"><div class="en-radar-head"><span class="en-area-name"><span class="en-area-icon" aria-hidden="true">'+enIcon(areaIcon[area.area])+'</span><strong>'+esc(area.area)+'</strong></span>'+
      '<span>'+(!hasData?'Sin datos':pct+' % · '+area.attempts+' '+(area.attempts===1?'intento':'intentos')+qualifier)+'</span></div>'+
      '<div class="en-radar-track"'+(hasData?' role="progressbar" aria-label="'+esc(area.area)+': aciertos de práctica" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'"':' aria-hidden="true"')+'>'+
      '<div style="width:'+(hasData?pct:0)+'%"></div></div>'+
      (area.dueQuestions?'<span class="en-radar-due">'+area.dueQuestions+' pendiente'+(area.dueQuestions===1?'':'s')+' de repaso</span>':'')+
     '</div>';
   }).join('')+'</div>'+
   '<p class="en-radar-insight">'+weakest+'</p>'+
   '<div class="en-radar-next"><div><strong>Repaso espaciado</strong>'+
   '<p class="en-small en-muted">Intervalos progresivos de 1, 3, 7, 14, 30 y 60 días tras respuestas correctas. Un error vuelve a poner la pregunta en la cola. Próximo: '+esc(next)+'.</p></div>'+
   '<button type="button" class="en-btn" id="en-due-start"'+(data.dueQuestions===0?' disabled':'')+'>Repasar ahora ('+data.dueQuestions+')</button></div>'+
   '<p class="en-micro">Los porcentajes con menos de cinco intentos llevan la etiqueta «Muestra pequeña». Las preguntas nunca respondidas no cuentan como repaso pendiente.</p>'+
   '</section>';
 }
 function home(){
  clearInterval(timer);timer=null;state.screen='home';state.session=null;
  const x=counts(),pool=available(),radarData=radar.scores(bank,history);
  root.innerHTML='<section aria-label="Estadísticas de entrenamiento" class="en-statgrid">'+
   '<div class="en-stat"><span class="en-stat-icon" aria-hidden="true">'+enIcon('book')+'</span><strong>'+bank.caseCount+'</strong><span>Casos originales</span></div>'+
   '<div class="en-stat"><span class="en-stat-icon" aria-hidden="true">'+enIcon('checklist')+'</span><strong>'+bank.questionCount+'</strong><span>Preguntas disponibles</span></div>'+
   '<div class="en-stat"><span class="en-stat-icon" aria-hidden="true">'+enIcon('chart')+'</span><strong>'+(x.percent===null?'—':x.percent+'%')+'</strong><span>Aciertos acumulados · '+x.attempts+' '+(x.attempts===1?'intento':'intentos')+'</span></div></section>'+
   '<section class="en-card" aria-labelledby="en-choose-title"><div class="en-overline">Entrenamiento personalizado</div>'+
   '<h2 id="en-choose-title">¿Cómo quieres estudiar?</h2>'+
   '<p class="en-small en-muted">Contesta una pregunta a la vez. El formato de caso (2 preguntas, 4 opciones) se inspira en la convocatoria 2026, pero este banco es de elaboración original y NO oficial.</p>'+
   '<div class="en-modes" role="group" aria-label="Modo de entrenamiento">'+
   [['study','Modo estudio','Retroalimentación inmediatamente después de responder.'],['exam','Simulacro breve','Tiempo orientativo, revisión al concluir; no reproduce el ENARM oficial.'],['weak','Mis debilidades','Repite casos con errores hasta lograr dos aciertos seguidos.'],['due','Repaso de hoy','Preguntas pendientes según tus respuestas y la repetición espaciada.']].map(v=>
    '<button type="button" class="en-mode" data-mode="'+v[0]+'" aria-pressed="'+(state.mode===v[0])+'"><span class="en-mode-icon" aria-hidden="true">'+enIcon(({study:'book',exam:'timer',weak:'target',due:'calendar'})[v[0]])+'</span><span class="en-mode-copy"><strong>'+v[1]+'</strong><small>'+v[2]+'</small></span><span class="en-mode-arrow" aria-hidden="true">›</span></button>'
   ).join('')+'</div>'+
   '<div class="en-form"><div class="en-field"><label for="en-area">Área clínica</label><select id="en-area">'+
   ['Todas',...bank.areas].map(v=>'<option value="'+esc(v)+'"'+(state.area===v?' selected':'')+'>'+esc(v)+'</option>').join('')+
   '</select></div><div class="en-field"><label for="en-size">Extensión de sesión</label>'+
   '<select id="en-size">'+[10,20,30,60].map(v=>'<option value="'+v+'"'+(state.size===v?' selected':'')+'>'+v+' preguntas ('+(v/2)+' casos)</option>').join('')+'</select></div></div>'+
   '<p class="en-micro" id="en-availability" aria-live="polite">'+pool.length+' casos disponibles en esta selección · '+(pool.length*2)+' preguntas. Si eliges más, la sesión usará todas las disponibles.</p>'+
   '<div class="en-actions"><button class="en-btn" id="en-start" type="button"'+(!pool.length?' disabled':'')+'>Comenzar entrenamiento →</button>'+
   '<button class="en-btn en-quiet" id="en-reset" type="button"'+(!x.attempts?' disabled':'')+'>Borrar mi progreso</button></div>'+
   '<p class="en-micro">El progreso de preguntas se guarda únicamente en este navegador mediante almacenamiento local. No se guardan datos de pacientes ni se envían respuestas a servidores.</p></section>'+
   radarSection(radarData)+
   '<section class="en-card" aria-label="Alcance del contenido"><h2>Aprende con criterio clínico</h2>'+
   '<p class="en-small en-muted">El banco incluye Medicina Interna, Pediatría, Ginecología y Obstetricia, Cirugía, Urgencias, Medicina Familiar y Salud Pública. Cada respuesta explica el razonamiento y permite consultar referencias para su cotejo.</p>'+
   '<p class="en-scope"><strong>Alcance:</strong> '+esc(bank.disclaimer)+' Los casos pueden contener simplificaciones y deben revisarse antes de uso docente institucional.</p>'+
   '<p class="en-small"><a href="'+esc(bank.format.url)+'" target="_blank" rel="noopener noreferrer">Formato oficial de referencia: CIFRHS / 50.º ENARM 2026 ↗</a></p></section>';
  root.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;home()});
  root.querySelector('#en-area').onchange=e=>{state.area=e.target.value;home()};
  root.querySelector('#en-size').onchange=e=>{state.size=Number(e.target.value);home()};
  root.querySelector('#en-start').onclick=startSession;
  root.querySelector('#en-due-start').onclick=()=>{state.mode='due';state.area='Todas';startSession()};
  root.querySelector('#en-reset').onclick=()=>{
   if(!window.confirm('¿Eliminar el registro local de aciertos y errores ENARM de este navegador?'))return;
   for(const k of Object.keys(history))delete history[k];
   try{localStorage.removeItem(storageKey)}catch{}
   home();
  };
 }
 function startSession(){
  const pool=available();
  const cases=(state.mode==='due'?radar.sortDue(pool,history):shuffle(pool)).slice(0,Math.ceil(state.size/2));
  if(!cases.length)return;
  const steps=cases.flatMap(c=>c.questions.map((q,qi)=>({c,qi,key:keyOf(c,qi)})));
  const seconds=steps.length*90;
  state.session={mode:state.mode,steps,index:0,answers:Array(steps.length).fill(null),revealed:new Set(),deadline:Date.now()+seconds*1000,seconds,finished:false};
  state.screen='session';
  if(state.mode==='exam')timer=setInterval(tick,1000);
  question();
 }
 function record(step,answer){
  if(answer===null)return;
  history[step.key]=radar.record(history[step.key],answer===step.c.questions[step.qi].correct);
  persist();
 }
 function formatTime(seconds){return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')}
 function tick(){
  const s=state.session;
  if(!s||s.mode!=='exam'||s.finished){clearInterval(timer);timer=null;return}
  const left=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));
  const clock=root.querySelector('#en-clock');
  if(clock){clock.textContent=formatTime(left);clock.dataset.low=left<=60?'true':'false'}
  if(!left)finishSession(true);
 }
 function question(){
  const s=state.session;if(!s||s.finished)return;
  state.screen='session';
  const step=s.steps[s.index],q=step.c.questions[step.qi];
  const selected=s.answers[s.index],reviewed=s.revealed.has(s.index);
  const study=s.mode!=='exam';
  const rest=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));
  root.innerHTML='<div class="en-card" aria-label="Pregunta clínica actual">'+
   '<div class="en-progress-top"><span>Pregunta '+(s.index+1)+' de '+s.steps.length+' · '+esc(step.c.area)+'</span>'+
   (s.mode==='exam'?'<span class="en-clock" id="en-clock" data-low="'+(rest<=60)+'" role="timer" aria-label="Tiempo restante">⌛ '+formatTime(rest)+'</span>':'<span>Modo '+(s.mode==='weak'?'debilidades':s.mode==='due'?'repaso de hoy':'estudio')+'</span>')+
   '</div><div class="en-track" aria-hidden="true"><div style="width:'+Math.round((s.index+1)/s.steps.length*100)+'%"></div></div>'+
   '<div class="en-case"><div class="en-case-copy"><span class="en-overline">Caso clínico · '+esc(step.c.topic)+'</span><p>'+esc(step.c.stem)+'</p></div><img class="en-case-img" src="'+(caseArt[step.c.area]||caseArt['Medicina Interna'])+'" alt="" width="115" height="115" loading="lazy" decoding="async" aria-hidden="true"></div>'+
   '<h2 id="en-question-title" tabindex="-1" class="en-question">'+esc(q.prompt)+'</h2>'+
   '<fieldset class="en-choices" aria-labelledby="en-question-title">'+q.options.map((option,i)=>
    '<label class="en-choice'+(reviewed?(i===q.correct?' en-correct':i===selected?' en-incorrect':''):'')+'">'+
    '<input type="radio" name="en-answer" value="'+i+'"'+(selected===i?' checked':'')+(reviewed?' disabled':'')+' />'+
    '<span class="en-option-label">'+alphabet[i]+'.</span><span>'+esc(option)+'</span></label>'
   ).join('')+'</fieldset>'+
   (reviewed?'<div class="en-feedback" data-correct="'+(selected===q.correct)+'" role="status">'+
    '<strong>'+(selected===q.correct?'✓ Respuesta correcta':'Respuesta correcta: '+alphabet[q.correct]+'. '+esc(q.options[q.correct]))+'</strong>'+
    '<p>'+esc(q.why)+'</p>'+ref(step.c)+
    '<p class="en-note">Explicación educativa. Material pendiente de revisión clínica independiente.</p></div>':'')+
   '<div class="en-actions">'+
   (s.mode==='exam'?'<button class="en-btn en-quiet" type="button" id="en-prev"'+(!s.index?' disabled':'')+'>← Anterior</button>'+
      '<button class="en-btn" id="en-next" type="button">'+(s.index===s.steps.length-1?'Finalizar simulacro':'Siguiente →')+'</button>'
    :reviewed?'<button class="en-btn" id="en-next" type="button">'+(s.index===s.steps.length-1?'Ver resultados':'Siguiente pregunta →')+'</button>'
    :'<button class="en-btn" type="button" id="en-check"'+(selected===null?' disabled':'')+'>Comprobar respuesta</button><button class="en-btn en-quiet" id="en-skip" type="button">Omitir pregunta</button>')+
   '<button class="en-btn en-quiet" id="en-exit" type="button">Salir al inicio</button></div>'+
   '<p class="en-micro">'+(s.mode==='exam'?'Simulacro de práctica: 90 segundos orientativos por pregunta. Los aciertos se mostrarán al finalizar.':'Una pregunta a la vez; la solución aparece solo tras comprobar la respuesta.')+'</p>'+
   '</div>';
  root.querySelectorAll('input[name="en-answer"]').forEach(input=>input.onchange=()=>{
   if(reviewed)return;
   s.answers[s.index]=Number(input.value);
   const check=root.querySelector('#en-check');if(check)check.disabled=false;
  });
  const next=root.querySelector('#en-next');if(next)next.onclick=()=>{
   if(s.mode==='exam'&&s.index===s.steps.length-1){finishSession(false);return}
   if(s.index===s.steps.length-1){finishSession(false);return}
   s.index++;question();
  };
  const prev=root.querySelector('#en-prev');if(prev)prev.onclick=()=>{if(s.index){s.index--;question()}};
  const check=root.querySelector('#en-check');if(check)check.onclick=()=>{
   if(s.answers[s.index]===null||s.revealed.has(s.index))return;
   s.revealed.add(s.index);
   record(step,s.answers[s.index]);
   question();
  };
  const skip=root.querySelector('#en-skip');if(skip)skip.onclick=()=>{if(s.index===s.steps.length-1)finishSession(false);else{s.index++;question()}};
  root.querySelector('#en-exit').onclick=()=>{
   if(!window.confirm('¿Salir de esta sesión? En modo simulacro, las respuestas sin finalizar no se guardarán.'))return;
   home();
  };
  if(s.index===0&&s.mode==='exam')tick();
 }
 function finishSession(timedOut){
  const s=state.session;if(!s||s.finished)return;
  if(s.mode==='exam'&&!timedOut){
   const blanks=s.answers.filter(v=>v===null).length;
   if(blanks&&!window.confirm('Quedan '+blanks+' preguntas sin contestar. ¿Finalizar y revisarlas como omitidas?'))return;
  }
  s.finished=true;clearInterval(timer);timer=null;state.screen='summary';
  if(s.mode==='exam')s.steps.forEach((step,i)=>record(step,s.answers[i]));
  const answered=s.answers.filter(a=>a!==null).length;
  const right=s.steps.reduce((n,step,i)=>n+(s.answers[i]===step.c.questions[step.qi].correct?1:0),0);
  const wrong=answered-right;
  const percent=answered?Math.round(right/answered*100):null;
  root.innerHTML='<div class="en-card" aria-label="Resultados del entrenamiento">'+
   '<div class="en-overline">Sesión completada'+(timedOut?' · Tiempo agotado':'')+'</div>'+
   '<h2>Tu revisión clínica</h2>'+
   '<p class="en-small en-muted">Aciertos de práctica, no equivalentes a una calificación oficial del ENARM. Los reactivos no han sido validados independientemente.</p>'+
   '<div class="en-statgrid">'+
   '<div class="en-stat"><strong>'+right+'/'+s.steps.length+'</strong><span>Correctas</span></div>'+
   '<div class="en-stat"><strong>'+wrong+'</strong><span>Incorrectas</span></div>'+
   '<div class="en-stat"><strong>'+(percent===null?'—':percent+'%')+'</strong><span>Aciertos entre respondidas · '+answered+' contestadas</span></div></div>'+
   '<h3>Revisión de preguntas</h3><div class="en-summary-list">'+
   s.steps.map((step,i)=>{
    const q=step.c.questions[step.qi],a=s.answers[i],good=a===q.correct;
    const badge=a===null?'Omitida':good?'Correcta':'Incorrecta';
    return '<article class="en-summary-item">'+
     '<div class="en-progress-top"><strong>'+(i+1)+'. '+esc(step.c.topic)+'</strong><span class="en-indicator '+(a===null?'skip':good?'good':'bad')+'">'+badge+'</span></div>'+
     '<p><strong>'+esc(q.prompt)+'</strong></p>'+
     '<p>Tu respuesta: '+(a===null?'Sin contestar':esc(alphabet[a]+'. '+q.options[a]))+'</p>'+
     '<p>Correcta: '+alphabet[q.correct]+'. '+esc(q.options[q.correct])+'</p>'+
     '<p>'+esc(q.why)+'</p>'+ref(step.c)+'</article>';
   }).join('')+'</div>'+
   '<div class="en-actions"><button type="button" class="en-btn" id="en-home">Volver a entrenar →</button></div></div>';
  root.querySelector('#en-home').onclick=()=>home();
  root.querySelector('.en-card h2')?.focus?.();
  window.scrollTo({top:0,behavior:'instant'});
 }
 function initTheme(){
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
 window.addEventListener('pagehide',()=>{clearInterval(timer);timer=null});
 initTheme();home();
})();
