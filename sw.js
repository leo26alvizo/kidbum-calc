'use strict';
const CACHE='kidbum-calc-v01010-analytics-live-20261011';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./kidbum-icon-192-v081.png','./kidbum-icon-512-v081.png','./assets/medical-atlas.js','./assets/analytics.js','./assets/pediatric/ped421.webp','./assets/pediatric/pedaccess.webp','./assets/pediatric/pedbalance.webp','./assets/pediatric/pedbmifa.webp','./assets/pediatric/pedcorrected.webp','./assets/pediatric/peddehydration.webp','./assets/pediatric/pedfoodcal.webp','./assets/pediatric/pedformulavol.webp','./assets/pediatric/pedgir.webp','./assets/pediatric/pedhcfa.webp','./assets/pediatric/pedholliday.webp','./assets/pediatric/pedinsensible.webp','./assets/pediatric/pediou.webp','./assets/pediatric/pedlhfa.webp','./assets/pediatric/pedmaxverify.webp','./assets/pediatric/pedmilkcal.webp','./assets/pediatric/pedneofluids.webp','./assets/pediatric/pedsolutions.webp','./assets/pediatric/pedsupp.webp','./assets/pediatric/pedvitals.webp','./assets/pediatric/pedwfa.webp','./assets/pediatric/pedwfl.webp','./assets/pediatria-portada.webp','./assets/ginecologia-portada.webp','./assets/quimica-clinica-portada.webp','./assets/escalas-clinicas-portada.webp','./assets/hemodinamica-portada.webp','./assets/cardiologia-portada.jpg','./assets/gastroenterologia-portada.webp','./assets/antropometria-portada.jpg','./assets/funcion-renal-portada.webp','./assets/who-wfa.js','./assets/who-lhfa.js','./assets/who-hcfa.js','./assets/who-bmifa.js','./assets/who-wfl.js','./assets/who-wfh.js','./assets/pediatric-module.js','./assets/pediatric-ward.js','./assets/hospital-module.js','./assets/advanced-module.js','./assets/neurology-module.js','./assets/neurology-advanced.js','./assets/cardiology-module.js','./assets/critical-module.js','./assets/critical-advanced.js','./assets/startup-bundle.js','./assets/urgencias-portada.jpg','./assets/neurologia-portada.jpg','./assets/portada-atlas-usuario.webp','./atlas-gallery.html','./assets/atlas-hero.jpg','./assets/atlas-lab.jpg','./assets/atlas-kidney.jpg','./assets/atlas-lungs.jpg','./assets/atlas-brain.jpg','./assets/atlas-liver.jpg','./assets/atlas-obstetrics.jpg','./assets/atlas-vascular.jpg','./assets/atlas-anion.jpg','./assets/atlas-osm.jpg','./assets/atlas-bmi.jpg','./assets/atlas-bsa.jpg','./assets/atlas-map.jpg','./assets/atlas-shock.jpg','./assets/atlas-egfr.jpg','./assets/atlas-cg.jpg','./assets/atlas-fib4.jpg','./assets/atlas-qsofa.jpg','./assets/atlas-curb.jpg','./assets/atlas-correctedna.jpg','./assets/atlas-news2.jpg','./assets/atlas-wellsdvt.jpg','./assets/atlas-wellspe.jpg','./assets/atlas-perc.jpg','./assets/atlas-childpugh.jpg','./assets/atlas-agfum.jpg','./assets/atlas-fppfum.jpg','./assets/atlas-fppus.jpg','./assets/atlas-bishop.jpg','./assets/atlas-obshock.jpg','./assets/atlas-gcs.jpg'];
/* Keep the complete asset manifest for audits and future offline packs, but
   do NOT download all illustrations/WHO source files on first mobile visit.
   The bundle contains identical WHO and clinical JS data for full offline calculations.
   Images and extra resources are cached only when requested. */
const CORE_ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg',
  './kidbum-icon-192-v081.png','./assets/startup-bundle.js','./assets/medical-atlas.js','./assets/analytics.js'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kidbum-calc-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
/* Online-first for navigations and code, offline-first for illustration assets.
   This prevents an installed PWA from serving stale HTML after a GitHub Pages update. */
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 const scope=new URL(self.registration.scope);
 if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 const navigation=req.mode==='navigate'||url.pathname.endsWith('/index.html');
 const code=/\.(?:js|webmanifest)$/.test(url.pathname);
 if(navigation||code){
  event.respondWith((async()=>{
   try{
    const response=await fetch(req,{cache:'no-store'});
    if(!response.ok)throw Error('HTTP '+response.status);
    const cache=await caches.open(CACHE);
    const storedKey=navigation?new URL('./index.html',scope).href:req;
    event.waitUntil(cache.put(storedKey,response.clone()).catch(()=>{}));
    return response;
   }catch(err){
    const fallback=await caches.match(req,{ignoreSearch:navigation});
    if(fallback)return fallback;
    if(navigation){
      const home=await caches.match(new URL('./index.html',scope).href);
      if(home)return home;
      const root=await caches.match(new URL('./',scope).href);
      if(root)return root;
    }
    return Response.error();
   }
  })());
  return;
 }
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{
   if(response.ok)event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,response.clone())).catch(()=>{}));
   return response;
 })));
});