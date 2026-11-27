'use strict';
// Verify that an installed KidBum release can open all 136 clinical tools in
// airplane mode, including pages never visited before and query-string images.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const sw=fs.readFileSync('sw.js','utf8');
const home=fs.readFileSync('index.html','utf8');
const origin='https://leo26alvizo.github.io/kidbum-calc/';
const normalize=req=>new URL(typeof req==='string'?req:req.url,origin).href;
const entries=new Map();
let networkCalls=0,installing=true;
const handlers={};
class FakeResponse {
 constructor(path){this.body=path;this.ok=true;this.status=200;}
 clone(){return new FakeResponse(this.body);}
 async arrayBuffer(){const b=fs.readFileSync(this.body);return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);}
}
const cache={
 async addAll(paths){
  for(const path of paths){
   assert.equal(path.cache,'no-store','Offline assets must be freshly downloaded');
   const relative='./'+new URL(path.url).pathname.slice(new URL(origin).pathname.length);
   assert.match(relative,/^\.\//,'Only local assets may be precached');
   assert.ok(fs.existsSync(relative),'Required offline file missing: '+relative);
   entries.set(normalize(path),new FakeResponse(relative));
  }
 },
 async match(req,options={}){
  let key=normalize(req);
  if(options.ignoreSearch)key=key.split('?')[0];
  return entries.get(key);
 },
 async put(req,res){entries.set(normalize(req),res.clone());}
};
const self={
 registration:{scope:origin},
 skipWaiting:async()=>true,
 clients:{claim:async()=>true},
 addEventListener:(name,listener)=>{handlers[name]=listener;}
};
const context={
 self,URL,Request,AbortController,TextEncoder,crypto:require('node:crypto').webcrypto,setTimeout,clearTimeout,
 caches:{open:async()=>cache,keys:async()=>['kidbum-calc-old'],delete:async()=>true},
 fetch:async req=>{if(installing){assert.equal(req.cache,'no-store');const p='./'+new URL(req.url).pathname.slice(new URL(origin).pathname.length);assert.ok(fs.existsSync(p));return new FakeResponse(p);}networkCalls++;throw Error('No Wi-Fi, no cellular data');},
 Response:{error:()=>({status:0,body:'unavailable'})}
};
vm.runInNewContext(sw+'\nself.__offlineAssets=CORE_ASSETS;',context,{timeout:3000});
const packed=Array.from(self.__offlineAssets);
const packedSet=new Set(packed);
const mustHave=['pediatria-sample.html','assets/pediatria-sample-v01095.js','assets/pediatria-sample-ui-v01095.js','assets/neurologia-algoritmos-portada.webp','algoritmos-oftalmologia.html','assets/oftalmologia-algoritmos-core-v01075.js','assets/oftalmologia-algoritmos-ui-v01075.js','assets/oftalmologia-algoritmos-v01075.css',
 'index.html','expansion-20.html','geriatria-escalas.html','hepatologia-indices.html','guardia-pro.html','escalas-cardioembolia.html',
 'capurro.html','wallace-adultos.html','snnoop10.html','pharma-pro.html','pediatria-evaluacion-rapida.html',
 'documentacion.html','historia-pediatria.html','atlas-gallery.html',
 'assets/pediatria-rapid-v01039.css','assets/pediatria-rapid-core.js','assets/pediatria-rapid-ui.js','assets/mobile-first-v01035.css','assets/pharma-mobile-v01035.css','assets/dark-graphite-v01036.css','assets/theme-chrome-v01036.js','assets/startup-bundle.js','assets/pediatric-pharma.js','assets/pharma-pro-core.js','assets/pharma-pro-ui.js','assets/pharma-pro-monographs.js','assets/pharma-pro-source-audit.js','assets/pharma-pro-high-alert.js','assets/pharma-pro-monographs-ui.js','assets/pharma-pro-expansion.js','assets/pharma-pro-indications-ui.js','assets/pharma-pro-guides-plus.js','assets/pharma-pro-quick-ui.js','assets/diabetes-insulin-core.js','assets/diabetes-insulin-ui.js',
 'assets/expansion-20.js','assets/geriatria-escalas.js','assets/hepatologia-indices.js','assets/guardia-pro.js','assets/guardia-gasometria.js','assets/fictitious-examples.js',
 'assets/chatgpt-analysis.js','assets/medical-atlas.js',
 'assets/wallace-adultos-original-HD.png','assets/wallace-adultos.webp',
 'assets/snnoop10-portada.jpg'
];
for(const p of mustHave)assert.ok(packedSet.has('./'+p),'Not precached: '+p);
const external=[...home.matchAll(/\{id:'([^']+)',category:'[^']+',href:'([^']+)',image:'([^']+)'\}/g)];
assert.equal(external.length,83,'All 83 standalone tool links must remain registered');
for(const match of external){
 const page=match[2].split('#')[0];
 assert.ok(packedSet.has(page),'Calculator '+match[1]+' not precached: '+page);
 const cover='./assets/'+match[3];
 assert.ok(packedSet.has(cover)||fs.existsSync(cover),'Missing image for '+match[1]);
}
// Every local script referenced by an alternate tool must be available offline.
const pages=['index.html','expansion-20.html','geriatria-escalas.html','hepatologia-indices.html','escalas-cardioembolia.html',
 'capurro.html','wallace-adultos.html','snnoop10.html','pediatria-evaluacion-rapida.html',
 'documentacion.html','historia-pediatria.html','atlas-gallery.html','ortopedia.html','neurologia.html','algoritmos-neurologia.html','guardia-pro.html','enarm.html','enarm-direct.html','enarm-visual.html','pharma-pro.html','algoritmos-pediatria.html','algoritmos-urgencias.html','algoritmos-oftalmologia.html','algoritmos-ortopedia.html','pediatria-pas.html'];
for(const p of pages){
 const html=fs.readFileSync(p,'utf8');
 for(const m of html.matchAll(/<script[^>]*src=["'](\.\/[^"']+)["']/g)){
  assert.ok(packedSet.has(m[1].split('?')[0]),'Uncached script in '+p+': '+m[1]);
 }
}
assert.ok(packedSet.has('./assets/oftalmologia-portada-original.webp'));
for(const p of ["algoritmos-oftalmologia.html","assets/oftalmologia-algoritmos-core-v01075.js","assets/oftalmologia-algoritmos-ui-v01075.js","assets/oftalmologia-algoritmos-v01075.css"])assert.ok(packedSet.has('./'+p));
const sourceSize=packed.reduce((n,p)=>n+fs.statSync(p).size,0);
const otoSize=packed.filter(p=>/\/enarm-clinical\/oto-\d+\.jpg$/.test(p)).reduce((n,p)=>n+fs.statSync(p).size,0);
const eyeSize=fs.statSync('assets/oftalmologia-portada-original.webp').size;
assert.ok(eyeSize<256*1024,'Original ophthalmology cover size');
assert.ok(sourceSize-otoSize-eyeSize<24*1024*1024,'Non-otoscopy/non-cover pack exceeds 24 MiB');
assert.ok(otoSize<2*1024*1024,'Otoscopic educational images exceed 2 MiB');
assert.ok(sourceSize<26*1024*1024,'Expanded offline pack exceeds 26 MiB');
assert.ok(sourceSize>8*1024*1024,'HD anatomical image was not bundled');
assert.equal(packed.length,packedSet.size,'Offline pack must not contain duplicates');
assert.ok(sw.includes('ignoreSearch:true'),'Versioned images require query-independent cache fallback');
assert.ok(!sw.includes('cache.addAll(ASSETS)'),'Install should exclude duplicate clinical source files');
assert.ok(handlers.install&&handlers.fetch,'SW must register offline handlers');
async function navigate(path){
 const evt={request:{url:normalize(path),method:'GET',mode:'navigate'},
  result:null,waits:[],respondWith(p){this.result=Promise.resolve(p);},
  waitUntil(p){this.waits.push(p);}};
 handlers.fetch(evt);
 assert.ok(evt.result,'No SW response for '+path);
 const response=await evt.result;
 await Promise.all(evt.waits);
 assert.equal(response.status,200,'Offline resource could not be loaded: '+path);
 return response;
}
(async()=>{
 const installs=[];
 handlers.install({waitUntil:p=>installs.push(p)});
 await Promise.all(installs);installing=false;
 for(const p of mustHave)await navigate('./'+p);
 for(const p of pages)await navigate('./'+p);
 for(const match of external)await navigate(match[2].split('#')[0]);
 await navigate('./');
 await navigate('./index.html?from=pwa-shortcut');
 await navigate('./assets/wallace-adultos-original-HD.png?v=hd-original-20261021');
 await navigate('./assets/wallace-adultos.webp?v=20261021-repaired');
 await navigate('./assets/snnoop10-portada.jpg?v=cover');
 assert.equal(networkCalls,0,'Cold airplane-mode app navigation contacted the network');
 console.log('FULL OFFLINE PASS: 83 standalone calculator routes and local pages, scripts, HD anatomy, versioned images; '+packed.length+' files, '+(sourceSize/1048576).toFixed(2)+' MiB');
})().catch(e=>{console.error(e);process.exitCode=1;});
