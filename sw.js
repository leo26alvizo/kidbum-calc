'use strict';
const CACHE='kidbum-calc-v01022-seven-clinical-scores-20261020-snnoop10-documentacion-mvp-20261021-pediatria18-theme-selectors-groups-ocular-link-home-crumb-refresh-fix-clinical-premium-ui-wallace9-hotspots-image-repair-large-anatomy-mobile-v2-wallace-card-hd-clean-cardioembolia4-dynamic-counts-cardio-card-images-snnoop-light-card-images-fix-integral-typo-fix-snnoop-cover-photo-capurro-illustrated-chatgpt-external-restored-expansion-20-illustrated-examples26-geriatria-home-card-v1-offline110-20261023-geriatria8-v01023-mobile-inicio-v01024-hepatologia6-v01025-guardia-pro-v01026-gasometria-en-urgencias-v01027-diabetes-pro-v01028-pharma-pro-v01029-monographs-v01030-pharma-indications-lasa-v01031-pharma-fast-ux-v01032-pharma-source-audit-v01033-pharma-high-alert-v01034-phone-first-v01035-graphite-noir-v01036';
const ASSETS=['./','./index.html','./snnoop10.html','./documentacion.html','./historia-pediatria.html','./wallace-adultos.html','./escalas-cardioembolia.html','./capurro.html','./expansion-20.html','./geriatria-escalas.html','./hepatologia-indices.html','./guardia-pro.html','./pharma-pro.html','./assets/mobile-first-v01035.css','./assets/pharma-mobile-v01035.css','./assets/dark-graphite-v01036.css','./assets/pharma-pro-core.js','./assets/pharma-pro-ui.js','./assets/pharma-pro-monographs.js','./assets/pharma-pro-monographs-ui.js','./assets/pharma-pro-source-audit.js','./assets/pharma-pro-high-alert.js','./assets/pharma-pro-expansion.js','./assets/pharma-pro-indications-ui.js','./assets/pharma-pro-guides-plus.js','./assets/pharma-pro-quick-ui.js','./manifest.webmanifest','./icon.svg','./kidbum-icon-192-v081.png','./kidbum-icon-512-v081.png','./assets/medical-atlas.js','./assets/geriatria-portada.webp','./assets/chatgpt-analysis.js','./assets/fictitious-examples.js','./assets/expansion-20.js','./assets/geriatria-escalas.js','./assets/hepatologia-indices.js','./assets/guardia-pro.js','./assets/guardia-gasometria.js','./assets/diabetes-insulin-core.js','./assets/diabetes-insulin-ui.js','./assets/analytics.js','./assets/pediatric-pharma.js','./assets/pediatric/ped421.webp','./assets/pediatric/pedaccess.webp','./assets/pediatric/pedbalance.webp','./assets/pediatric/pedbmifa.webp','./assets/pediatric/pedcorrected.webp','./assets/pediatric/peddehydration.webp','./assets/pediatric/pedfoodcal.webp','./assets/pediatric/pedformulavol.webp','./assets/pediatric/pedgir.webp','./assets/pediatric/pedhcfa.webp','./assets/pediatric/pedholliday.webp','./assets/pediatric/pedinsensible.webp','./assets/pediatric/pediou.webp','./assets/pediatric/pedlhfa.webp','./assets/pediatric/pedmaxverify.webp','./assets/pediatric/pedmilkcal.webp','./assets/pediatric/pedneofluids.webp','./assets/pediatric/pedsolutions.webp','./assets/pediatric/pedsupp.webp','./assets/pediatric/pedvitals.webp','./assets/pediatric/pedwfa.webp','./assets/pediatric/pedwfl.webp','./assets/pediatria-portada.webp','./assets/ginecologia-portada.webp','./assets/quimica-clinica-portada.webp','./assets/escalas-clinicas-portada.webp','./assets/hemodinamica-portada.webp','./assets/cardiologia-portada.jpg','./assets/gastroenterologia-portada.webp','./assets/antropometria-portada.jpg','./assets/funcion-renal-portada.webp','./assets/who-wfa.js','./assets/who-lhfa.js','./assets/who-hcfa.js','./assets/who-bmifa.js','./assets/who-wfl.js','./assets/who-wfh.js','./assets/pediatric-module.js','./assets/pediatric-ward.js','./assets/hospital-module.js','./assets/advanced-module.js','./assets/neurology-module.js','./assets/neurology-advanced.js','./assets/cardiology-module.js','./assets/critical-module.js','./assets/critical-advanced.js','./assets/startup-bundle.js','./assets/urgencias-portada.jpg','./assets/neurologia-portada.jpg','./assets/portada-atlas-usuario.webp','./atlas-gallery.html','./assets/atlas-hero.jpg','./assets/atlas-lab.jpg','./assets/atlas-kidney.jpg','./assets/atlas-lungs.jpg','./assets/atlas-brain.jpg','./assets/atlas-liver.jpg','./assets/atlas-obstetrics.jpg','./assets/atlas-vascular.jpg','./assets/atlas-anion.jpg','./assets/atlas-osm.jpg','./assets/atlas-bmi.jpg','./assets/atlas-bsa.jpg','./assets/atlas-map.jpg','./assets/atlas-shock.jpg','./assets/atlas-egfr.jpg','./assets/atlas-cg.jpg','./assets/atlas-fib4.jpg','./assets/atlas-qsofa.jpg','./assets/atlas-curb.jpg','./assets/atlas-correctedna.jpg','./assets/atlas-news2.jpg','./assets/atlas-wellsdvt.jpg','./assets/atlas-wellspe.jpg','./assets/atlas-perc.jpg','./assets/atlas-childpugh.jpg','./assets/atlas-agfum.jpg','./assets/atlas-fppfum.jpg','./assets/atlas-fppus.jpg','./assets/atlas-bishop.jpg','./assets/atlas-obshock.jpg','./assets/atlas-gcs.jpg'];
/* Every calculator, clinical support script, page and normal illustration is
   available after the service worker finishes installing.  Bundle originals
   listed below are redundant with startup-bundle.js; excluding only these
   avoids duplicate downloads while retaining identical offline calculations.
   The large HD Wallace anatomy is included deliberately because its hotspots
   must remain usable on first offline opening.  Installation is atomic: if a
   required download fails, the old functional release stays in service.
   Open the app online once and let installation finish before using airplane
   mode. */
const BUNDLED_SOURCE_FILES = new Set([
 './assets/who-wfa.js',
 './assets/who-lhfa.js',
 './assets/who-hcfa.js',
 './assets/who-bmifa.js',
 './assets/who-wfl.js',
 './assets/who-wfh.js',
 './assets/pediatric-module.js',
 './assets/pediatric-ward.js',
 './assets/hospital-module.js',
 './assets/advanced-module.js',
 './assets/neurology-module.js',
 './assets/neurology-advanced.js',
 './assets/cardiology-module.js',
 './assets/critical-module.js',
 './assets/critical-advanced.js'
]);
const CORE_ASSETS=[...new Set([
 ...ASSETS.filter(asset=>asset!=='./'&&!BUNDLED_SOURCE_FILES.has(asset)),
 './assets/pediatric-pharma.js',
 './assets/wallace-adultos.webp',
 './assets/wallace-adultos-original-HD.png',
 './assets/snnoop10-portada.jpg'
])];
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
 /* Search parameters on static assets must not defeat precached images. */
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const cached=await cache.match(req,{ignoreSearch:true});
  if(cached)return cached;
  try{
   const response=await fetchWithDeadline(req);
   return remember(event,cache,req,response);
  }catch{return Response.error();}
 })());
});
