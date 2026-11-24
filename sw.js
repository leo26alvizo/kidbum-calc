'use strict';
const CACHE='kidbum-calc-v01022-seven-clinical-scores-20261020-snnoop10-documentacion-mvp-20261021-pediatria18-theme-selectors-groups-ocular-link-home-crumb-refresh-fix-clinical-premium-ui-wallace9-hotspots-image-repair-large-anatomy-mobile-v2-wallace-card-hd-clean-cardioembolia4-dynamic-counts-cardio-card-images-snnoop-light-card-images-fix-integral-typo-fix-snnoop-cover-photo-capurro-illustrated-chatgpt-external-restored-expansion-20-illustrated-examples26-geriatria-home-card-v1-offline110-20261023-geriatria8-v01023-mobile-inicio-v01024-hepatologia6-v01025-guardia-pro-v01026-gasometria-en-urgencias-v01027-diabetes-pro-v01028-pharma-pro-v01029-monographs-v01030-pharma-indications-lasa-v01031-pharma-fast-ux-v01032-pharma-source-audit-v01033-pharma-high-alert-v01034-phone-first-v01035-graphite-noir-v01036-pharma-theme-sync-v01037-pharma-ux-v01038-pediatria-rapid-v01039-kramer-bebe-v01040-kramer-clinical-v01041-pharma-reconciliation-v01042-pharma-massive-catalog-v01043-pediatric-infant-pharma-v01044-pediatric-pas-v01045-cover-results-bottom-v01046-catalog-count-audit-v01047-pharma-indicaciones-pronam26-v01048-pharma-spl-label-reader-v01049-pharma-drug-diagnosis-coverage-v01050-pediatric-clinical-algorithms-v01051-expanded-phase2-v01052-phase3-v01053-pediatric-pharma-bridge-v01054-pediatric-drug-references-v01055-urgencias-uci-alg-v01056-clinical-access-v01057-pharma-index-v01058-release-label-r2-no-recent-history-r1-result-clarity-v01059-safe-update-v01060-r1-pharma-evidence2-r1-clinical-results-v01061-lion-headlight-splash-v01062-ultra-retina-v01063-enarm-v01064-radar-v01065-cobalt-v01066-ivory-v01067-direct-v01068-enarm-visual-radar-v01069-clinical-images-v01070-centor-v01071';
const RELEASE='0.10.71';
const ASSETS=['./assets/enarm-clinical/ecg-03.jpg','./assets/enarm-clinical/ecg-04.jpg','./assets/enarm-clinical/ecg-05.jpg','./assets/enarm-clinical/rx-02.jpg','./assets/enarm-clinical/rx-03.jpg','./assets/enarm-clinical/rx-04.jpg','./assets/enarm-clinical/ct-01.jpg','./assets/enarm-clinical/ecg-01.jpg','./assets/enarm-clinical/ecg-02.jpg','./assets/enarm-clinical/rx-01.jpg','./assets/enarm-clinical/us-01.jpg','./assets/enarm-clinical/clinical-01.jpg','./assets/enarm-clinical/micro-01.jpg','./enarm-visual.html','./assets/enarm-visual-bank-draft.js','./assets/enarm-visual-ui-draft.js','./assets/enarm-unified-radar-draft.js','./assets/enarm-expansion-draft.js','./assets/enarm-visual-radar-draft.css','./','./index.html','./snnoop10.html','./documentacion.html','./historia-pediatria.html','./wallace-adultos.html','./escalas-cardioembolia.html','./capurro.html','./expansion-20.html','./geriatria-escalas.html','./hepatologia-indices.html','./guardia-pro.html','./pharma-pro.html','./enarm.html','./enarm-direct.html','./pediatria-evaluacion-rapida.html','./pediatria-pas.html','./algoritmos-pediatria.html','./algoritmos-urgencias.html','./assets/urgencias-algoritmos-v01056.css','./assets/urgencias-algoritmos-core-v01056.js','./assets/urgencias-algoritmos-resuc-cardio-v01056.js','./assets/urgencias-algoritmos-neuro-resp-v01056.js','./assets/urgencias-algoritmos-metab-uci-v01056.js','./assets/urgencias-algoritmos-build-v01056.js','./assets/urgencias-farma-bridge-v01056.js','./assets/urgencias-algoritmos-ui-v01056.js','./assets/pediatria-algoritmos-core-v01051.js','./assets/pediatria-algoritmos-extension-v01052.js','./assets/pediatria-algoritmos-extension-v01053.js','./assets/pediatria-farmaco-bridge-v01054.js','./assets/pediatria-farmaco-bridge-v01054.css','./assets/pediatric-drug-references-v01055.js','./assets/pediatric-drug-references-ui-v01055.js','./assets/pediatric-drug-references-v01055.css','./assets/pediatria-algoritmos-ui-v01051.js','./assets/pediatria-algoritmos-v01051.css','./assets/pediatric-pas-core-v01045.js','./assets/pediatric-pas-ui-v01045.js','./assets/pediatric-pas-v01045.css','./assets/pediatric-pas-layout-v01046.css','./assets/pas-apendicectomia-portada-v01046.webp','./assets/kramer-bebe-referencia-v01040.jpg','./assets/kramer-bili-core-v01041.js','./assets/kramer-bili-ui-v01041.js','./assets/pediatria-rapid-v01039.css','./assets/pediatria-rapid-core.js','./assets/pediatria-rapid-ui.js','./assets/mobile-first-v01035.css','./assets/clinical-access-v01057.css','./assets/result-clarity-v01059.css','./assets/clinical-results-v01061.css','./assets/ultra-retina-v01063.css','./assets/enarm-entry-v01064.css','./assets/enarm-v01064.css','./assets/enarm-bank-v01064.js','./assets/enarm-ui-v01064.js','./assets/enarm-radar-v01065.js','./assets/enarm-radar-v01065.css','./assets/enarm-cobalt-v01066.css','./assets/enarm-hero-v01066.svg','./assets/enarm-hero-ivory-v01067.svg','./assets/enarm-ivory-v01067.css','./assets/enarm-direct-v01068.css','./assets/enarm-direct-mi-v01068.js','./assets/enarm-direct-ped-v01068.js','./assets/enarm-direct-go-v01068.js','./assets/enarm-direct-cg-v01068.js','./assets/enarm-direct-urg-v01068.js','./assets/enarm-direct-mf-v01068.js','./assets/enarm-direct-sp-v01068.js','./assets/enarm-direct-bank-v01068.js','./assets/enarm-direct-ui-v01068.js','./assets/lion-splash-v01062.css','./assets/lion-splash-v01062.js','./assets/clinical-access-v01057.js','./assets/pwa-update-v01060.js','./assets/clinical-drug-names-v01057.js','./assets/pharma-mobile-v01035.css','./assets/pharma-pro-ux-v01038.css','./assets/dark-graphite-v01036.css','./assets/theme-chrome-v01036.js','./assets/pharma-pro-core.js','./assets/pharma-pro-ui.js','./assets/pharma-pro-monographs.js','./assets/pharma-pro-monographs-ui.js','./assets/pharma-pro-evidence-v01100.js','./assets/pharma-pro-evidence-ui-v01100.js','./assets/pharma-pro-evidence-v01100.css','./assets/pharma-pro-source-audit.js','./assets/pharma-pro-high-alert.js','./assets/pharma-pro-reconciliation-v01042.js','./assets/pharma-pro-reconciliation-ui-v01042.js','./assets/pharma-pro-reconciliation-v01042.css','./assets/pharma-pro-expansion.js','./assets/pharma-pro-expansion-index-v01043.js','./assets/pharma-broad-index-v01058.js','./assets/pharma-disease-index-ui-v01043.js','./assets/pharma-disease-index-v01043.css','./assets/pharma-drug-diagnoses-v01050.js','./assets/pharma-pro-indications-ui.js','./assets/pharma-label-lookup-v01049.js','./assets/pharma-pro-guides-plus.js','./assets/pharma-pro-quick-ui.js','./manifest.webmanifest','./icon.svg','./kidbum-icon-192-v081.png','./kidbum-icon-512-v081.png','./assets/medical-atlas.js','./assets/geriatria-portada.webp','./assets/chatgpt-analysis.js','./assets/fictitious-examples.js','./assets/expansion-20.js','./assets/geriatria-escalas.js','./assets/hepatologia-indices.js','./assets/guardia-pro.js','./assets/guardia-gasometria.js','./assets/diabetes-insulin-core.js','./assets/diabetes-insulin-ui.js','./assets/analytics.js','./assets/pediatric-pharma.js','./assets/pediatric-dose-math-v01044.js','./assets/pediatric-pharma-v01044.css','./assets/pediatric/ped421.webp','./assets/pediatric/pedaccess.webp','./assets/pediatric/pedbalance.webp','./assets/pediatric/pedbmifa.webp','./assets/pediatric/pedcorrected.webp','./assets/pediatric/peddehydration.webp','./assets/pediatric/pedfoodcal.webp','./assets/pediatric/pedformulavol.webp','./assets/pediatric/pedgir.webp','./assets/pediatric/pedhcfa.webp','./assets/pediatric/pedholliday.webp','./assets/pediatric/pedinsensible.webp','./assets/pediatric/pediou.webp','./assets/pediatric/pedlhfa.webp','./assets/pediatric/pedmaxverify.webp','./assets/pediatric/pedmilkcal.webp','./assets/pediatric/pedneofluids.webp','./assets/pediatric/pedsolutions.webp','./assets/pediatric/pedsupp.webp','./assets/pediatric/pedvitals.webp','./assets/pediatric/pedwfa.webp','./assets/pediatric/pedwfl.webp','./assets/pediatria-portada.webp','./assets/ginecologia-portada.webp','./assets/quimica-clinica-portada.webp','./assets/escalas-clinicas-portada.webp','./assets/hemodinamica-portada.webp','./assets/cardiologia-portada.jpg','./assets/gastroenterologia-portada.webp','./assets/antropometria-portada.jpg','./assets/funcion-renal-portada.webp','./assets/who-wfa.js','./assets/who-lhfa.js','./assets/who-hcfa.js','./assets/who-bmifa.js','./assets/who-wfl.js','./assets/who-wfh.js','./assets/pediatric-module.js','./assets/pediatric-ward.js','./assets/hospital-module.js','./assets/advanced-module.js','./assets/neurology-module.js','./assets/neurology-advanced.js','./assets/cardiology-module.js','./assets/critical-module.js','./assets/critical-advanced.js','./assets/startup-bundle.js','./assets/urgencias-portada.jpg','./assets/neurologia-portada.jpg','./assets/portada-atlas-usuario.webp','./atlas-gallery.html','./assets/atlas-hero.jpg','./assets/atlas-lab.jpg','./assets/atlas-kidney.jpg','./assets/atlas-lungs.jpg','./assets/atlas-brain.jpg','./assets/atlas-liver.jpg','./assets/atlas-obstetrics.jpg','./assets/atlas-vascular.jpg','./assets/atlas-anion.jpg','./assets/atlas-osm.jpg','./assets/atlas-bmi.jpg','./assets/atlas-bsa.jpg','./assets/atlas-map.jpg','./assets/atlas-shock.jpg','./assets/atlas-egfr.jpg','./assets/atlas-cg.jpg','./assets/atlas-fib4.jpg','./assets/atlas-qsofa.jpg','./assets/atlas-curb.jpg','./assets/atlas-correctedna.jpg','./assets/atlas-news2.jpg','./assets/atlas-wellsdvt.jpg','./assets/atlas-wellspe.jpg','./assets/atlas-perc.jpg','./assets/atlas-childpugh.jpg','./assets/atlas-agfum.jpg','./assets/atlas-fppfum.jpg','./assets/atlas-fppus.jpg','./assets/atlas-bishop.jpg','./assets/atlas-obshock.jpg','./assets/atlas-gcs.jpg'];
/* Every calculator, clinical support script, page and normal illustration is
   available after the service worker finishes installing.  Bundle originals
   listed below are redundant with startup-bundle.js; excluding only these
   avoids duplicate downloads while retaining identical offline calculations.
   HD Wallace anatomy remains required for the documented first-launch offline
   guarantee. Installation is atomic. Small bounded batches and retries reduce
   transient cellular failures without ever mixing old/new clinical JS. */
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
const INSTALL_BATCH_SIZE=5;
const INSTALL_RETRIES=3;
const RELEASE_CHECK_PATH=new URL('./release-check.js',self.registration.scope).pathname;
const REPAIR_PATH=new URL('./actualizar.html',self.registration.scope).pathname;
function progress(done,total,status='loading'){
 if(!self.clients||typeof self.clients.matchAll!=='function')return Promise.resolve();
 return self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
  for(const client of list)client.postMessage({type:'KIDBUM_INSTALL_PROGRESS',status,done,total,version:RELEASE});
 }).catch(()=>{});
}
async function installRelease(){
 const cache=await caches.open(CACHE);
 try{
  // Requests bypass the browser HTTP cache to avoid stale HTML or clinical JS.
  // A failed download is retried without 160+ parallel connections.
  // Never reuse clinical files from another cache generation.
  for(let offset=0;offset<CORE_ASSETS.length;offset+=INSTALL_BATCH_SIZE){
   const batch=CORE_ASSETS.slice(offset,offset+INSTALL_BATCH_SIZE).map(path=>
    new Request(new URL(path,self.registration.scope),{cache:'no-store'})
   );
   for(let attempt=1;attempt<=INSTALL_RETRIES;attempt++){
    try{await cache.addAll(batch);break;}
    catch(error){
     if(attempt===INSTALL_RETRIES)throw error;
     await new Promise(resolve=>setTimeout(resolve,200*attempt));
    }
   }
   await progress(Math.min(offset+batch.length,CORE_ASSETS.length),CORE_ASSETS.length);
  }
  await self.skipWaiting();
 }catch(error){
  // Never activate half a release, and keep the previous working SW/caches.
  await caches.delete(CACHE).catch(()=>{});
  await progress(0,CORE_ASSETS.length,'failed');
  throw error;
 }
}
self.addEventListener('install',event=>{
 event.waitUntil(installRelease());
});
self.addEventListener('message',event=>{
 if(event.data?.type!=='KIDBUM_BUILD_INFO')return;
 event.source?.postMessage({type:'KIDBUM_BUILD_INFO',version:RELEASE,cache:CACHE});
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
 // Always network-only: never report an obsolete release marker or recovery UI.
 if(url.pathname===RELEASE_CHECK_PATH||url.pathname===REPAIR_PATH){
  event.respondWith(fetchWithDeadline(req));
  return;
 }
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
