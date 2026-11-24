'use strict';
/* PWA reliability: atomic constrained updates, retries, rollback and live recovery. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const sw=fs.readFileSync('sw.js','utf8');
const home=fs.readFileSync('index.html','utf8');
const pharma=fs.readFileSync('pharma-pro.html','utf8');
const updater=fs.readFileSync('assets/pwa-update-v01060.js','utf8');
const recovery=fs.readFileSync('actualizar.html','utf8');
const marker=fs.readFileSync('release-check.js','utf8');
const origin='https://leo26alvizo.github.io/kidbum-calc/';
const normalized=x=>new URL(typeof x==='string'?x:x.url,origin).href;
assert.match(home,/kidbum-app-version" content="0\.10\.71"/);
assert.match(pharma,/kidbum-app-version" content="0\.10\.71"/);
assert.match(home,/assets\/pwa-update-v01060\.js/);
assert.match(home,/href="\.\/actualizar\.html"/);
assert.match(home,/KidBumUpdater\?\.checkNow\(\)/);
assert.match(marker,/KidBumPublicRelease = '0\.10\.71'/);
assert.match(sw,/safe-update-v01060-r1/);
assert.match(sw,/INSTALL_BATCH_SIZE=5/);
assert.match(sw,/INSTALL_RETRIES=3/);
assert.match(sw,/event\.waitUntil\(installRelease\(\)\)/);
assert.match(sw,/await caches\.delete\(CACHE\)/);
assert.match(sw,/url\.pathname===RELEASE_CHECK_PATH\|\|url\.pathname===REPAIR_PATH/);
assert.ok(!sw.includes('cache.addAll(CORE_ASSETS)'),'No 160-file concurrent request burst');
assert.ok(!updater.includes('location.reload('),'Checking does not prematurely reload a clinical calculation');
assert.ok(!updater.includes('localStorage'),'Version checking must not touch saved preferences');
assert.ok(!recovery.includes('localStorage.clear')&&!recovery.includes('localStorage.removeItem'),'Repair must not remove preferences');
assert.match(recovery,/names\.filter\(n=>n\.startsWith\('kidbum-calc-'\)\)/,'Repair affects only KidBum caches');
assert.match(recovery,/reg\.scope===root\.href/,'Repair must unregister only its own SW scope');
assert.match(recovery,/await published\(\); \/\/ No destructive action/,'Repair must test live version before touching offline cache');

function harness(permanentFailure=false){
 const named=new Map(),events={},progress=[],calls=[];
 let installs=0,aborts=0,activations=0;
 class ResponseFake{
  constructor(body,status=200){this.body=body;this.ok=status>=200&&status<300;this.status=status}
  clone(){return new ResponseFake(this.body,this.status)}
 }
 function open(name){
  if(!named.has(name))named.set(name,new Map());
  const entries=named.get(name);
  return {
   async addAll(list){
    calls.push([...list]);
    assert.ok(list.length<=5,'Batch exceeds cellular concurrency cap');
    assert.ok(list.every(req=>req.cache==='no-store'),'Offline assets bypass stale HTTP cache');
    if(list.some(req=>normalized(req)===origin+'assets/startup-bundle.js')){
     aborts++;
     if(permanentFailure||aborts===1)throw Error('Simulated network failure');
    }
    for(const asset of list){
     const relative='./'+new URL(asset.url).pathname.slice(new URL(origin).pathname.length);
     entries.set(normalized(asset),new ResponseFake('cached:'+relative));
    }
   },
   async match(request,options={}){
    const u=normalized(request);
    if(!options.ignoreSearch)return entries.get(u);
    const stripped=u.split('?')[0];
    for(const [key,value]of entries)if(key.split('?')[0]===stripped)return value;
   },
   async put(request,response){entries.set(normalized(request),response.clone())}
  };
 }
 named.set('kidbum-calc-previous-functional',new Map([[origin+'index.html',new ResponseFake('previous working release')]]));
 let networkCalls=0;
 const cacheAPI={open:async name=>open(name),keys:async()=>[...named.keys()],delete:async name=>named.delete(name)};
 const self={registration:{scope:origin},clients:{claim:async()=>{activations++},matchAll:async()=>[{postMessage:m=>progress.push(m)}]},skipWaiting:async()=>{installs++},addEventListener:(name,fn)=>{events[name]=fn}};
 const ctx={self,caches:cacheAPI,URL,Request,AbortController,setTimeout,clearTimeout,Response:{error:()=>new ResponseFake('unavailable',0)},fetch:async request=>{networkCalls++;return new ResponseFake('network:'+normalized(request))}};
 vm.runInNewContext(sw+'\nself.__testAssets=CORE_ASSETS;self.__testCache=CACHE;',ctx,{timeout:3000});
 function install(){
  const waits=[];events.install({waitUntil:p=>waits.push(p)});
  assert.equal(waits.length,1);
  return waits[0];
 }
 async function navigate(path){
  const evt={request:{url:normalized(path),method:'GET',mode:'navigate'},response:null,waits:[],respondWith(p){this.response=Promise.resolve(p)},waitUntil(p){this.waits.push(p)}};
  events.fetch(evt);assert.ok(evt.response,'Missing fetch interception: '+path);
  const response=await evt.response;await Promise.all(evt.waits);return response;
 }
 return {install,navigate,named,events,progress,calls,self,cacheAPI,getStats:()=>({installs,aborts,activations,networkCalls})};
}
(async()=>{
 const ok=harness(false);
 const assets=Array.from(ok.self.__testAssets);
 assert.ok(assets.length>=150&&assets.length<220,'Full offline bundle must remain complete');
 await ok.install();
 assert.equal(ok.getStats().installs,1,'New service worker only activates after complete install');
 assert.equal(ok.getStats().aborts,2,'One transient batch must be retried exactly once');
 assert.ok(ok.calls.length>25,'Installation must happen in several small batches');
 assert.ok(ok.named.has('kidbum-calc-previous-functional'),'Old release must remain safe before activation');
 assert.ok(ok.named.get(ok.self.__testCache).has(origin+'index.html'),'Shell must be in new cache');
 assert.ok(ok.named.get(ok.self.__testCache).has(origin+'assets/wallace-adultos-original-HD.png'),'HD Wallace remains offline');
 assert.ok(ok.progress.some(x=>x.type==='KIDBUM_INSTALL_PROGRESS'&&x.done===assets.length),'Progress must reach all resources');
 const homePage=await ok.navigate('index.html?from=old-shortcut');
 assert.equal(homePage.body,'cached:./index.html','App shell must remain cache-first and not need network');
 const liveVersion=await ok.navigate('release-check.js?check=never-cached');
 assert.match(liveVersion.body,/network:/,'Version checks bypass stale caches');
 const repairPage=await ok.navigate('actualizar.html');
 assert.match(repairPage.body,/network:/,'Recovery screen always loads from network');
 assert.equal(ok.getStats().networkCalls,2,'Only live diagnostics use network while offline bundle cached');
 const activated=[];
 ok.events.activate({waitUntil:p=>activated.push(p)});
 await Promise.all(activated);
 assert.equal(ok.getStats().activations,1,'Worker must claim clients after successful activation');
 assert.ok(!ok.named.has('kidbum-calc-previous-functional'),'Old cache removed only after full activation');
 const fail=harness(true);
 await assert.rejects(fail.install(),/Simulated network failure/,'Failed offline installation must reject');
 assert.equal(fail.getStats().installs,0,'Failed release must never take control');
 assert.equal(fail.getStats().aborts,3,'A failed batch is retried only three times');
 assert.ok(!fail.named.has(fail.self.__testCache),'Partial new release must be removed');
 assert.ok(fail.named.has('kidbum-calc-previous-functional'),'Old app stays available after failure');
 assert.ok(fail.progress.some(x=>x.status==='failed'),'Failure must be signaled');
 console.log('PASS: PWA v0.10.60 bounded retries, atomic rollback, complete offline install, live checks, preferences and recovery.');
})().catch(e=>{console.error(e);process.exitCode=1});
