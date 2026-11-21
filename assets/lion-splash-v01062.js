/* Lion Awakening · short, optional decorative splash on cold app launch.
   Never stores entered health data or modifies clinical engine/UI state. */
(function(){
 'use strict';
 const splash=document.getElementById('kb-lion-splash');
 if(!splash)return;
 // Skip completely on reduced-motion, revisits in same tab/app session,
 // background/pre-render loads, or when sessionStorage is unavailable.
 try{
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
  if(document.visibilityState==='hidden')return;
  if(sessionStorage.getItem('kb-lion-splash-seen-v01062'))return;
  sessionStorage.setItem('kb-lion-splash-seen-v01062','1');
 }catch{return;}
 let finished=false;
 let timer=null,cleanupTimer=null;
 const skip=splash.querySelector('[data-kb-lion-skip]');
 function finish(){
  if(finished)return;
  finished=true;
  clearTimeout(timer);clearTimeout(cleanupTimer);
  splash.hidden=true;
  document.removeEventListener('keydown',onKey);
  document.removeEventListener('pointerdown',onPointer,true);
  skip?.removeEventListener('click',onSkip);
 }
 function dismiss(){
  if(finished||splash.classList.contains('kb-lion-splash-closing'))return;
  clearTimeout(timer);
  splash.classList.add('kb-lion-splash-closing');
  cleanupTimer=setTimeout(finish,150);
 }
 function onPointer(){dismiss();}
 function onSkip(){dismiss();}
 function onKey(event){if(event.key==='Escape')dismiss();}
 splash.hidden=false;
 skip?.addEventListener('click',onSkip);
 document.addEventListener('pointerdown',onPointer,true);
 document.addEventListener('keydown',onKey);
 window.addEventListener('pagehide',finish,{once:true});
 // Fixed upper bound: a slow/failed clinical script cannot trap the screen.
 timer=setTimeout(finish,1390);
})();
