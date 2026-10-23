'use strict';
/* KidBum CALC: shared, privacy-first ChatGPT analysis handoff for standalone calculators.
   Clinical inputs stay in the browser. Only an explicitly copied, non-identifying
   result summary is placed on the clipboard; never use query-string transmissions. */
(function(){
const prompts=Object.freeze({
 guardia:'MODO /GUARDIA. Prioriza inestabilidad, signos de alarma, patologías graves, datos faltantes, limitaciones de la escala, reevaluación y criterios de escalamiento. No generes órdenes médicas sin validar.',
 estudio:'MODO /ESTUDIO. Explica para qué sirve esta herramienta, la fisiopatología pertinente, interpretación, población de aplicación, limitaciones, errores frecuentes y evidencia verificable. Termina con una pregunta de recuperación activa.',
 pase:'MODO /PASE. Resume los datos efectivamente proporcionados, el resultado y sus limitaciones; identifica problemas activos, pendientes [PENDIENTE] y preguntas probables del adscrito. No inventes hallazgos.'
});
let styleReady=false;
function addStyles(){
 if(styleReady)return;styleReady=true;const style=document.createElement('style');
 style.textContent='.kb-ai{border:1px solid var(--border,var(--stroke,var(--line,#bad4dc)));border-radius:13px;background:var(--card,var(--panel,#fff));padding:13px;margin-top:12px;color:var(--ink,#153747)}.kb-ai button,.kb-ai select{font:inherit}.kb-ai-toggle,.kb-ai-send{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid var(--accent,#087e88);border-radius:11px;background:var(--accent,#087e88);color:var(--accentText,#fff);font-weight:800;padding:11px 15px;min-height:44px;cursor:pointer}.kb-ai-toggle:disabled,.kb-ai-send:disabled{opacity:.55;cursor:not-allowed}.kb-ai-toggle:focus-visible,.kb-ai-send:focus-visible,.kb-ai-select:focus-visible{outline:3px solid var(--accent,#087e88);outline-offset:2px}.kb-ai-panel{display:grid;gap:9px;margin-top:12px}.kb-ai-panel[hidden]{display:none}.kb-ai-label{font-size:.86rem;font-weight:750}.kb-ai-select{width:100%;min-height:43px;color:var(--ink,#153747);background:var(--card,var(--panel,#fff));border:1px solid var(--border,var(--stroke,#b5d0da));border-radius:10px;padding:9px}.kb-ai-privacy,.kb-ai-status{font-size:.82rem;line-height:1.5;color:var(--muted,var(--sub,#576f7a));margin:0}.kb-ai-status{font-weight:650}.kb-ai-send{width:max-content;max-width:100%}';
 document.head.append(style);
}
function buildPrompt(payload,mode){
 if(!Object.prototype.hasOwnProperty.call(prompts,mode))throw Error('Modo de análisis inválido');
 if(!payload||!payload.title||!payload.result)throw Error('No hay un resultado válido para analizar');
 return [
  'KidBum CALC — análisis clínico educativo',
  'Herramienta: '+payload.title,
  'Resultado calculado: '+payload.result,
  'Interpretación: '+(payload.interpretation||'No disponible'),
  'Método / detalles: '+(payload.details||'No informados'),
  'Limitaciones de aplicación: '+(payload.warning||'Interpretar según el contexto clínico.'),
  '',
  prompts[mode],
  'Usa fuentes clínicas verificables y explica la incertidumbre. Este texto no incluye identificadores personales ni historia clínica completa.',
  'No supongas antecedentes, signos vitales, exploración ni datos omitidos. La valoración presencial, los protocolos institucionales y el equipo tratante tienen prioridad.'
 ].join('\n');
}
async function copySafe(message){
 if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(message);return}
 const field=document.createElement('textarea');field.value=message;field.readOnly=true;field.style.cssText='position:fixed;left:-100vw;top:0;opacity:0';document.body.append(field);field.select();
 try{if(!document.execCommand('copy'))throw Error('Portapapeles no disponible')}finally{field.remove()}
}
function attach(config){
 if(!config||!config.mountId||typeof config.getPayload!=='function')throw Error('Configuración del análisis incompleta');
 const container=document.getElementById(config.mountId);if(!container)throw Error('Contenedor ChatGPT no encontrado: '+config.mountId);
 addStyles();const section=document.createElement('section');section.className='kb-ai';
 const main=document.createElement('button');main.type='button';main.className='kb-ai-toggle';main.textContent='↗ Analizar con ChatGPT';main.disabled=true;
 const panel=document.createElement('div');panel.className='kb-ai-panel';panel.hidden=true;
 const label=document.createElement('label');label.className='kb-ai-label';label.textContent='Tipo de análisis';
 const select=document.createElement('select');select.className='kb-ai-select';
 select.id='kb-ai-mode-'+config.mountId;label.htmlFor=select.id;
 for(const [key,title] of [['guardia','Guardia · seguridad y urgencias'],['estudio','Estudio · explicación y evidencia'],['pase','Pase de visita · resumen clínico']]){const opt=document.createElement('option');opt.value=key;opt.textContent=title;select.add(opt)}
 const send=document.createElement('button');send.type='button';send.className='kb-ai-send';send.textContent='Copiar análisis y abrir ChatGPT ↗';
 const privacy=document.createElement('p');privacy.className='kb-ai-privacy';privacy.textContent='Privacidad: solo copia un resumen del resultado, sin identificadores ni datos personales; deberás pegarlo y enviarlo tú en ChatGPT. Se necesita internet.';
 const status=document.createElement('p');status.className='kb-ai-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const panelId=select.id+'-panel';panel.id=panelId;main.setAttribute('aria-controls',panelId);main.setAttribute('aria-expanded','false');
 main.onclick=()=>{panel.hidden=!panel.hidden;main.setAttribute('aria-expanded',String(!panel.hidden));status.textContent=''};
 send.onclick=async()=>{
  try{const prompt=buildPrompt(config.getPayload(),select.value);await copySafe(prompt);status.textContent='Mensaje copiado. Abriendo ChatGPT; pégalo allí para iniciar el análisis.';window.location.assign('https://chatgpt.com/')}
  catch(e){status.textContent='No se pudo copiar el mensaje. Revisa el permiso del portapapeles y vuelve a intentar.'}
 };
 panel.append(label,select,send,privacy,status);section.append(main,panel);container.append(section);
 return {setReady(ready){main.disabled=!ready;if(!ready){panel.hidden=true;main.setAttribute('aria-expanded','false');status.textContent=''}},buildPrompt:(mode)=>buildPrompt(config.getPayload(),mode)};
}
window.KidBumAnalysis=Object.freeze({attach,buildPrompt});
})();