'use strict';
// Deterministic offline/cellular service-worker tests. node tests/pwa-cellular.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync('sw.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const origin='https://leo26alvizo.github.io/kidbum-calc/';
const requests=[];
const events={};
const keys=new Map();
const resolved=x=>new URL(typeof x==='string'?x:x.url,origin).href;
class FakeResponse{
 constructor(body,status=200){this.body=body;this.status=status;this.ok=status>=200&&status<300;}
 clone(){return new FakeResponse(this.body,this.status);}
}
const fakeCache={
 async addAll(list){
  for(const path of list){keys.set(resolved(path),new FakeResponse('cached:'+path));}
 },
 async match(request,{ignoreSearch=false}={}){
  const key=resolved(request);
  if(!ignoreSearch)return keys.get(key);
  const withoutSearch=new URL(key);
  withoutSearch.search='';
  for(const [url,result] of keys.entries()){
   const normalized=new URL(url);
   normalized.search='';
   if(normalized.href===withoutSearch.href)return result;
  }
  return undefined;
 },
 async put(request,response){keys.set(resolved(request),response.clone());}
};
const cacheNames=new Set();
const caches={
 async open(name){cacheNames.add(name);return fakeCache;},
 async keys(){return Array.from(cacheNames);},
 async delete(name){cacheNames.delete(name);return true;}
};
let networkCalls=0;
let fetchImplementation=()=>Promise.reject(Error('Simulated cellular timeout'));
const self={
 registration:{scope:origin},
 clients:{claim:async()=>true},
 skipWaiting:async()=>true,
 addEventListener:(type,handler)=>{events[type]=handler;}
};
const ctx={self,caches,URL,AbortController,Response,
 fetch:(req,options)=>{networkCalls++;return fetchImplementation(req,options);},
 setTimeout,clearTimeout};
vm.runInNewContext(source,ctx,{timeout:3000});
assert.ok(events.install&&events.fetch&&events.activate,'SW handlers registered');
const installWaits=[];
events.install({waitUntil:x=>installWaits.push(x)});
(async()=>{
 await Promise.all(installWaits);
 assert.ok(keys.has(origin+'index.html'),'App shell must be precached');
 assert.ok(keys.has(origin+'assets/startup-bundle.js'),'All clinical calculators must be precached');
 assert.ok(keys.has(origin+'assets/pediatric-pharma.js'),'Medication safety engine must be precached');
 assert.ok(keys.has(origin+'assets/medical-atlas.js'),'Atlas must be precached');
 assert.ok(source.includes('const NETWORK_DEADLINE_MS=6500'),'Network requests have finite wait');

 async function simulate(path,mode='navigate'){
  const evt={request:{url:new URL(path,origin).href,mode,method:'GET'},
   response:null,waits:[],respondWith(v){this.response=Promise.resolve(v);},
   waitUntil(p){this.waits.push(p);}};
  events.fetch(evt);
  assert.ok(evt.response,'Expected fetch interception: '+path);
  const result=await evt.response;
  await Promise.all(evt.waits);
  return result;
 }
 const cachedPages=[
  ['','navigate','cached:./index.html'],
  ['?actualizar=v01013','navigate','cached:./index.html'],
  ['index.html?actualizar=now','navigate','cached:./index.html'],
  ['assets/startup-bundle.js','no-cors','cached:./assets/startup-bundle.js'],
  ['assets/medical-atlas.js','no-cors','cached:./assets/medical-atlas.js'],
  ['assets/pediatric-pharma.js','no-cors','cached:./assets/pediatric-pharma.js']
 ];
 for(const [url,mode,body] of cachedPages){
  const r=await simulate(url,mode);
  assert.equal(r.body,body,'Cache must respond instantly for '+url);
 }
 assert.equal(networkCalls,0,'Slow cellular requests must never gate an installed app shell');
 const outsider={request:{url:'https://cloud.umami.is/script.js',mode:'no-cors',method:'GET'},response:null,respondWith(x){this.response=x;}};
 events.fetch(outsider);
 assert.equal(outsider.response,null,'Third-party analytics should not be intercepted');
 fetchImplementation=()=>Promise.resolve(new FakeResponse('lazy-artwork'));
 const lazy=await simulate('assets/gastroenterologia-portada.webp','no-cors');
 assert.equal(lazy.body,'lazy-artwork');
 assert.equal(networkCalls,1);
 fetchImplementation=()=>Promise.reject(Error('Cellular connection lost'));
 const retry=await simulate('assets/gastroenterologia-portada.webp','no-cors');
 assert.equal(retry.body,'lazy-artwork','On-demand artwork stays cached for offline use');
 assert.equal(networkCalls,1,'Cached artwork must not cause a data request');
 assert.ok(!source.includes("cache.addAll(ASSETS)"),'Bulk image download not allowed');
 assert.ok(!html.includes("window.addEventListener('load',()=>{"),'Registration must not await slow images');
 assert.ok(html.includes("navigator.serviceWorker.register('./sw.js'"),'Service worker registers immediately');
 assert.ok(!html.includes('window.location.assign(url.toString())'),'Manual update must not force a network-dependent reload');
 assert.ok(html.includes("new Promise((_,reject)=>setTimeout(()=>reject(Error('timeout')),6500))"),
 'Manual update must have a deadline');
 assert.ok(!source.includes('await fetch(req,{cache:'),'App navigation must not be network-first');
 console.log('Mobile-data and offline PWA tests PASSED (cached navigation/JS, lazy assets, update safety)');
})().catch(err=>{console.error(err);process.exitCode=1;});
