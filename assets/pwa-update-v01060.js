/* KidBum PWA update diagnostics. No personal data, clinical values or analytics.
   An update is ready only after the browser activates a complete service worker. */
(function(root,factory){
 'use strict';
 const api=factory(root);
 root.KidBumUpdater=api;
 if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis,function(root){
 'use strict';
 const VERSION='0.10.87';
 let seenRegistration=null,initiallyControlled=false,started=false,lastMessage='';
 const $=id=>root.document?.getElementById(id);
 function parseRelease(text){
  const hit=/KidBumPublicRelease\s*=\s*['"]([0-9]+(?:\.[0-9]+){2})['"]/.exec(String(text||''));
  return hit?hit[1]:null;
 }
 function say(message,kind='info'){
  lastMessage=message;
  const node=$('kb-update-detail');
  if(node){node.textContent=message;node.dataset.state=kind;}
 }
 function currentVersion(){
  return root.document?.querySelector('meta[name="kidbum-app-version"]')?.content||VERSION;
 }
 function withDeadline(promise,ms){
  let timer;
  return Promise.race([
   Promise.resolve(promise),
   new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Tiempo de espera agotado')),ms);})
  ]).finally(()=>clearTimeout(timer));
 }
 async function remoteVersion(){
  if(root.navigator?.onLine===false)throw Error('Sin conexión a internet');
  const url=new URL('./release-check.js',root.location.href);
  url.searchParams.set('comprobar',String(Date.now())+'-'+Math.random().toString(36).slice(2));
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8500);
  try{
   const response=await root.fetch(url.href,{cache:'no-store',signal:controller.signal});
   if(!response.ok)throw Error('HTTP '+response.status);
   const version=parseRelease(await response.text());
   if(!version)throw Error('Respuesta sin versión verificable');
   return version;
  }finally{clearTimeout(timer);}
 }
 function watchWorker(worker){
  if(!worker||worker.__kidbumWatched)return;
  worker.__kidbumWatched=true;
  function reflect(){
   const state=worker.state;
   if(state==='installing')say('Descargando nueva versión. Puedes seguir usando la anterior mientras termina.');
   else if(state==='installed')say('Archivos descargados; esperando activación completa.');
   else if(state==='activating')say('Activando la nueva versión.');
   else if(state==='redundant')say('La instalación no terminó. La copia anterior sigue disponible. Abre «Recuperar actualización» si persiste.','error');
  }
  worker.addEventListener('statechange',reflect);
  reflect();
 }
 function watch(registration){
  if(!registration||seenRegistration===registration)return;
  seenRegistration=registration;
  registration.addEventListener('updatefound',()=>watchWorker(registration.installing));
  watchWorker(registration.installing);
 }
 function init(){
  if(started)return;
  started=true;
  if(!('serviceWorker'in root.navigator)){
   say('Este navegador no admite instalación offline. Puedes seguir usando KidBum con internet.','error');return;
  }
  initiallyControlled=Boolean(root.navigator.serviceWorker.controller);
  root.navigator.serviceWorker.addEventListener('message',event=>{
   const info=event.data;
   if(!info||info.type!=='KIDBUM_INSTALL_PROGRESS'||typeof info.version!=='string'||!/^[0-9]+(?:\.[0-9]+){2}$/.test(info.version))return;
   if(info.status==='failed'){
    say('Falló una descarga. Se conserva la versión anterior; revisa tu conexión y prueba otra vez.','error');
    return;
   }
   say('Preparando uso sin conexión: '+info.done+' de '+info.total+' archivos descargados.');
  });
  root.navigator.serviceWorker.addEventListener('controllerchange',()=>{
   if(initiallyControlled){
    say('Nueva versión instalada. Finaliza tu cálculo y pulsa «Actualizar ahora» para verla.','success');
    root.KidBumAccess?.showUpdate();
   }else{
    say('Instalación offline terminada. La pantalla actual sigue disponible.');
   }
  });
  root.navigator.serviceWorker.getRegistration().then(watch).catch(()=>{});
 }
 async function checkNow(){
  const button=$('check-kidbum-update');
  if(button){button.disabled=true;button.textContent='Verificando publicación…';}
  try{
   if(root.navigator.onLine===false){say('Sin red. La copia offline sigue disponible; no se puede confirmar la versión pública.','error');return;}
   const remote=await remoteVersion();
   const local=currentVersion();
   say('Publicada: v'+remote+' · Abierta: v'+local+'. Comprobando instalación…');
   if(!('serviceWorker'in root.navigator)){
    say('Publicada: v'+remote+'. Este navegador no admite actualizaciones offline.','error');return;
   }
   const registration=await withDeadline(root.navigator.serviceWorker.getRegistration(),8000)
    ||await withDeadline(root.navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}),12000);
   watch(registration);
   await withDeadline(registration.update(),15000);
   watchWorker(registration.installing);
   if(registration.installing||registration.waiting){
    say('Publicada: v'+remote+' · Abierta: v'+local+'. Descargando o activando recursos; conserva abierta la app.');
   }else if(remote!==local){
    say('Publicada: v'+remote+' · Abierta: v'+local+'. Si no aparece el aviso para recargar, usa «Recuperar actualización».','error');
   }else{
    say('Versión v'+remote+' verificada. No hay cambios pendientes detectados en este navegador.','success');
   }
  }catch(error){
   say('No se pudo confirmar la actualización ('+(error?.message||'conexión o descarga')+'). La copia anterior se conserva.','error');
  }finally{
   if(button){button.disabled=false;button.textContent='↻ Buscar actualización';}
  }
 }
 return Object.freeze({VERSION,parseRelease,remoteVersion,watch,init,checkNow,getLastMessage:()=>lastMessage});
});
