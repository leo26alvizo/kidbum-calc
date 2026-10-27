'use strict';
// Verify that an installed KidBum release can open all 133 clinical tools in
// airplane mode, including pages never visited before and query-string images.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const sw=fs.readFileSync('sw.js','utf8');
const home=fs.readFileSync('index.html','utf8');
const origin='https://leo26alvizo.github.io/kidbum-calc/';
const normalize=req=>new URL(typeof req==='string'?req:req.url,origin).href;
const entries=new Map();
let networkCalls=0;
const handlers={};
class FakeResponse {
 constructor(path){this.body=path;this.ok=true;this.status=200;}
 clone(){return new FakeResponse(this.body);}
}
const cache={
 async addAll(paths){
  for(const path of paths){
   assert.match(path,/^\.\//,'Only local assets may be precached');
   assert.ok(fs.existsSync(path), 'Required offline file missing: '+path);
   entries.set(normalize(path),new FakeResponse(path));
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
 self,URL,AbortController,setTimeout,clearTimeout,
 caches:{open:async()=>cache,keys:async()=>['kidbum-calc-old'],delete:async()=>true},
 fetch:async()=>{networkCalls++;throw Error('No Wi-Fi, no cellular data');},
 Response:{error:()=>({status:0,body:'unavailable'})}
};
vm.runInNewContext(sw+'\nself.__offlineAssets=CORE_ASSETS;',context,{timeout:3000});
const packed=Array.from(self.__offlineAssets);
const packedSet=new Set(packed);
const mustHave=[
 'index.html','expansion-20.html','geriatria-escalas.html','hepatologia-indices.html','guardia-pro.html','escalas-cardioembolia.html',
 'capurro.html','wallace-adultos.html','snnoop10.html','pharma-pro.html',
 'documentacion.html','historia-pediatria.html','atlas-gallery.html',
 'assets/startup-bundle.js','assets/pediatric-pharma.js','assets/pharma-pro-core.js','assets/pharma-pro-ui.js','assets/pharma-pro-monographs.js','assets/pharma-pro-monographs-ui.js','assets/pharma-pro-expansion.js','assets/pharma-pro-indications-ui.js','assets/diabetes-insulin-core.js','assets/diabetes-insulin-ui.js',
 'assets/expansion-20.js','assets/geriatria-escalas.js','assets/hepatologia-indices.js','assets/guardia-pro.js','assets/guardia-gasometria.js','assets/fictitious-examples.js',
 'assets/chatgpt-analysis.js','assets/medical-atlas.js',
 'assets/wallace-adultos-original-HD.png','assets/wallace-adultos.webp',
 'assets/snnoop10-portada.jpg'
];
for(const p of mustHave)assert.ok(packedSet.has('./'+p),'Not precached: '+p);
const external=[...home.matchAll(/\{id:'([^']+)',category:'[^']+',href:'([^']+)',image:'([^']+)'\}/g)];
assert.equal(external.length,43,'All 43 standalone tool links must remain registered');
for(const match of external){
 const page=match[2].split('#')[0];
 assert.ok(packedSet.has(page),'Calculator '+match[1]+' not precached: '+page);
 const cover='./assets/'+match[3];
 assert.ok(packedSet.has(cover)||fs.existsSync(cover),'Missing image for '+match[1]);
}
// Every local script referenced by an alternate tool must be available offline.
const pages=['index.html','expansion-20.html','geriatria-escalas.html','hepatologia-indices.html','escalas-cardioembolia.html',
 'capurro.html','wallace-adultos.html','snnoop10.html',
 'documentacion.html','historia-pediatria.html','atlas-gallery.html'];
for(const p of pages){
 const html=fs.readFileSync(p,'utf8');
 for(const m of html.matchAll(/<script[^>]*src=["'](\.\/[^"']+)["']/g)){
  assert.ok(packedSet.has(m[1].split('?')[0]),'Uncached script in '+p+': '+m[1]);
 }
}
const sourceSize=packed.reduce((n,p)=>n+fs.statSync(p).size,0);
assert.ok(sourceSize<20*1024*1024,'Offline pack unexpectedly exceeds 20 MiB');
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
 await Promise.all(installs);
 for(const p of mustHave)await navigate('./'+p);
 for(const p of pages)await navigate('./'+p);
 for(const match of external)await navigate(match[2].split('#')[0]);
 await navigate('./');
 await navigate('./index.html?from=pwa-shortcut');
 await navigate('./assets/wallace-adultos-original-HD.png?v=hd-original-20261021');
 await navigate('./assets/wallace-adultos.webp?v=20261021-repaired');
 await navigate('./assets/snnoop10-portada.jpg?v=cover');
 assert.equal(networkCalls,0,'Cold airplane-mode app navigation contacted the network');
 console.log('FULL OFFLINE PASS: 127 calculator routes, 12 local pages, scripts, HD anatomy, versioned images; '+packed.length+' files, '+(sourceSize/1048576).toFixed(2)+' MiB');
})().catch(e=>{console.error(e);process.exitCode=1;});
