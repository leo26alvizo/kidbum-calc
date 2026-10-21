'use strict';
const CACHE='kidbum-calc-v01022-seven-clinical-scores-20261020-snnoop10-documentacion-mvp-20261021-pediatria18-theme-selectors-groups-ocular-link-home-crumb-refresh-fix-clinical-premium-ui-wallace9-hotspots';
const ASSETS=['./','./index.html','./snnoop10.html','./documentacion.html','./historia-pediatria.html','./wallace-adultos.html','./manifest.webmanifest','./icon.svg','./kidbum-icon-192-v081.png','./kidbum-icon-512-v081.png','./assets/medical-atlas.js','./assets/analytics.js','./assets/pediatric-pharma.js','./assets/pediatric/ped421.webp','./assets/pediatric/pedaccess.webp','./assets/pediatric/pedbalance.webp','./assets/pediatric/pedbmifa.webp','./assets/pediatric/pedcorrected.webp','./assets/pediatric/peddehydration.webp','./assets/pediatric/pedfoodcal.webp','./assets/pediatric/pedformulavol.webp','./assets/pediatric/pedgir.webp','./assets/pediatric/pedhcfa.webp','./assets/pediatric/pedholliday.webp','./assets/pediatric/pedinsensible.webp','./assets/pediatric/pediou.webp','./assets/pediatric/pedlhfa.webp','./assets/pediatric/pedmaxverify.webp','./assets/pediatric/pedmilkcal.webp','./assets/pediatric/pedneofluids.webp','./assets/pediatric/pedsolutions.webp','./assets/pediatric/pedsupp.webp','./assets/pediatric/pedvitals.webp','./assets/pediatric/pedwfa.webp','./assets/pediatric/pedwfl.webp','./assets/pediatria-portada.webp','./assets/ginecologia-portada.webp','./assets/quimica-clinica-portada.webp','./assets/escalas-clinicas-portada.webp','./assets/hemodinamica-portada.webp','./assets/cardiologia-portada.jpg','./assets/gastroenterologia-portada.webp','./assets/antropometria-portada.jpg','./assets/funcion-renal-portada.webp','./assets/who-wfa.js','./assets/who-lhfa.js','./assets/who-hcfa.js','./assets/who-bmifa.js','./assets/who-wfl.js','./assets/who-wfh.js','./assets/pediatric-module.js','./assets/pediatric-ward.js','./assets/hospital-module.js','./assets/advanced-module.js','./assets/neurology-module.js','./assets/neurology-advanced.js','./assets/cardiology-module.js','./assets/critical-module.js','./assets/critical-advanced.js','./assets/startup-bundle.js','./assets/urgencias-portada.jpg','./assets/neurologia-portada.jpg','./assets/portada-atlas-usuario.webp','./atlas-gallery.html','./assets/atlas-hero.jpg','./assets/atlas-lab.jpg','./assets/atlas-kidney.jpg','./assets/atlas-lungs.jpg','./assets/atlas-brain.jpg','./assets/atlas-liver.jpg','./assets/atlas-obstetrics.jpg','./assets/atlas-vascular.jpg','./assets/atlas-anion.jpg','./assets/atlas-osm.jpg','./assets/atlas-bmi.jpg','./assets/atlas-bsa.jpg','./assets/atlas-map.jpg','./assets/atlas-shock.jpg','./assets/atlas-egfr.jpg','./assets/atlas-cg.jpg','./assets/atlas-fib4.jpg','./assets/atlas-qsofa.jpg','./assets/atlas-curb.jpg','./assets/atlas-correctedna.jpg','./assets/atlas-news2.jpg','./assets/atlas-wellsdvt.jpg','./assets/atlas-wellspe.jpg','./assets/atlas-perc.jpg','./assets/atlas-childpugh.jpg','./assets/atlas-agfum.jpg','./assets/atlas-fppfum.jpg','./assets/atlas-fppus.jpg','./assets/atlas-bishop.jpg','./assets/atlas-obshock.jpg','./assets/atlas-gcs.jpg'];
/* Keep the complete asset manifest for audits and future offline packs, but
   do NOT download all illustrations/WHO source files on first mobile visit.
   The bundle contains identical WHO and clinical JS data for full offline calculations.
   Images and extra resources are cached only when requested. */
/* Precache the complete clinical shell; NOT the redundant directory landing
   page (index.html has the same contents but costs another ~180 KB per update).
   Lazy load illustrations and reference material as requested. */
const CORE_ASSETS=['./index.html','./manifest.webmanifest','./icon.svg',
 './kidbum-icon-192-v081.png','./assets/wallace-adultos.webp','./assets/startup-bundle.js',
 './assets/medical-atlas.js','./assets/analytics.js','./assets/pediatric-pharma.js'];
const SHELL_URL=new URL('./index.html',self.registration.scope).href;
const NETWORK_DEADLINE_MS=6500;
function fetchWithDeadline(request,timeout=NETWORK_DEADLINE_MS){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),timeout);
 return fetch(request,{signal:controller.signal,cache:'no-store'}).finally(()=>clearTimeout(timer));
}
function remember(event,cache,key,response){
 if(response.ok)event.waitUntil(cache.put(key,response.clone()).catch(()=>{}));
 return response;
}
self.addEventListener('install',event=>{
 /* Atomic: if even one required module fails, do not activate a partly
    upgraded bundle. The previous working version remains installed. */
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE_ASSETS))
  .then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(
  keys.filter(k=>k.startsWith('kidbum-calc-')&&k!==CACHE)
    .map(k=>caches.delete(k))
 )).then(()=>self.clients.claim()));
});
/* CACHE FIRST for the installed app shell and code. On cellular, a stalled
   remote server cannot delay a cached calculation. The service worker script
   itself is updated independently by navigator.serviceWorker.register/update;
   the next release atomically installs its own matching HTML + clinical JS.
   Never silently replace only index.html in a live cache: mixing HTML and
   clinical modules across versions is a medication-safety risk. */
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 const scope=new URL(self.registration.scope);
 if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 const isShell=url.pathname===scope.pathname||
  url.pathname===scope.pathname+'index.html';
 const isScript=/\.(?:js|webmanifest)$/.test(url.pathname);
 if(isShell||isScript){
  event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   const key=isShell?SHELL_URL:req;
   const cached=await cache.match(key,{ignoreSearch:isShell});
   if(cached)return cached;
   try{
    const response=await fetchWithDeadline(req);
    if(!response.ok)throw Error('HTTP '+response.status);
    return remember(event,cache,key,response);
   }catch{
    /* Last chance only for an uncached shell. Never send an incomplete app. */
    if(isShell){
     const fallback=await cache.match(SHELL_URL);
     if(fallback)return fallback;
    }
    return Response.error();
   }
  })());
  return;
 }
 /* Illustrations, alternate pages and other resources remain on demand. */
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const cached=await cache.match(req);
  if(cached)return cached;
  try{
   const response=await fetchWithDeadline(req);
   return remember(event,cache,req,response);
  }catch{return Response.error();}
 })());
});
