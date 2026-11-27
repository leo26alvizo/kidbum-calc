'use strict';

const releasePattern = require('node:fs').readFileSync('release-check.js','utf8').match(/KidBumPublicRelease\s*=\s*'([0-9.]+)'/)[1].replace(/\./g,'\\.');
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
assert.match(home,new RegExp("kidbum-app-version\" content=\""+releasePattern+"\""));
assert.match(pharma,new RegExp("kidbum-app-version\" content=\""+releasePattern+"\""));
assert.match(home,/assets\/pwa-update-v01060\.js/);
assert.match(home,/href="\.\/actualizar\.html"/);
assert.match(home,/KidBumUpdater\?\.checkNow\(\)/);
assert.match(marker,new RegExp("KidBumPublicRelease = '"+releasePattern+"'"));
assert.match(sw,/safe-update-v01060-r1/);
assert.match(sw,/INSTALL_BATCH_SIZE=3/);
assert.match(sw,/INSTALL_RETRIES=4/);
assert.match(sw,/INSTALL_DEADLINE_MS=300000/);
assert.match(sw,/event\.waitUntil\(installRelease\(\)\)/);
assert.match(sw,/crypto\.subtle\.digest\('SHA-1',input\)/);
assert.match(sw,/url\.pathname===RELEASE_CHECK_PATH\|\|url\.pathname===REPAIR_PATH/);
assert.ok(!updater.includes('location.reload('),'No premature reload');
assert.ok(!updater.includes('localStorage'),'Checking preserves preferences');
assert.doesNotMatch(recovery,/caches\.delete|\.unregister\(|localStorage\.(?:clear|removeItem)/);
assert.match(updater,/45000/);
assert.match(recovery,/datos móviles o Wi-Fi/);
function harness(){
 const named=new Map(),events={},progress=[],attempts=new Map();
 let installs=0,activations=0,networkCalls=0,downloads=0,concurrent=0,peak=0,mode='transient',target='assets/startup-bundle.js';
 class ResponseFake{
  constructor(body,status=200,bytes=null){this.body=body;this.ok=status>=200&&status<300;this.status=status;this.bytes=bytes}
  clone(){return new ResponseFake(this.body,this.status,this.bytes)}
  async arrayBuffer(){const b=this.bytes||Buffer.from(this.body);return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}
 }
 function fromFile(path){return new ResponseFake('cached:./'+path,200,fs.readFileSync(path))}
 function open(name){if(!named.has(name))named.set(name,new Map());const entries=named.get(name);return {async match(req,opts={}){const u=normalized(req);return entries.get(opts.ignoreSearch?u.split('?')[0]:u)},async put(req,res){entries.set(normalized(req),res.clone())}}}
 named.set('kidbum-calc-previous-functional',new Map([[origin+'index.html',new ResponseFake('previous working release')],[origin+'assets/wallace-adultos-original-HD.png',fromFile('assets/wallace-adultos-original-HD.png')]]));
 const cacheAPI={open:async name=>open(name),keys:async()=>[...named.keys()],delete:async name=>named.delete(name)};
 const self={registration:{scope:origin},clients:{claim:async()=>{activations++},matchAll:async()=>[{postMessage:m=>progress.push(m)}]},skipWaiting:async()=>{installs++},addEventListener:(name,fn)=>{events[name]=fn}};
 const ctx={self,caches:cacheAPI,URL,Request,AbortController,TextEncoder,crypto:require('node:crypto').webcrypto,setTimeout:(fn,ms)=>setTimeout(fn,ms<10000?0:ms),clearTimeout,Response:{error:()=>new ResponseFake('unavailable',0)},fetch:async req=>{
  networkCalls++;const url=normalized(req),path=new URL(url).pathname.slice(new URL(origin).pathname.length);if(path==='release-check.js'||path==='actualizar.html')return new ResponseFake('network:'+url);
  downloads++;concurrent++;peak=Math.max(peak,concurrent);try{assert.equal(req.cache,'no-store');const n=(attempts.get(path)||0)+1;attempts.set(path,n);if(path===target){if(mode==='permanent'||(mode==='transient'&&n===1))throw Error('Simulated cellular interruption');if(mode==='corrupt')return new ResponseFake('wrong bytes');}return fromFile(path)}finally{concurrent--}
 }};
 vm.runInNewContext(sw+'\nself.__testAssets=CORE_ASSETS;self.__testCache=CACHE;self.__hashes=ASSET_HASHES;',ctx,{timeout:3000});
 function install(){const waits=[];events.install({waitUntil:p=>waits.push(p)});assert.equal(waits.length,1);return waits[0]}
 async function navigate(path){const evt={request:{url:normalized(path),method:'GET',mode:'navigate'},response:null,waits:[],respondWith(p){this.response=Promise.resolve(p)},waitUntil(p){this.waits.push(p)}};events.fetch(evt);const response=await evt.response;await Promise.all(evt.waits);return response}
 return {install,navigate,named,events,progress,self,attempts,mode:m=>{mode=m},stats:()=>({installs,activations,networkCalls,downloads,peak})};
}
(async()=>{
 const h=harness(),assets=Array.from(h.self.__testAssets),hashes=h.self.__hashes;
 assert.ok(assets.length>=253&&assets.length<=300);
 assert.equal(Object.keys(hashes).length,assets.length);
 for(const p of assets){const bytes=fs.readFileSync(p);assert.equal(hashes[p],require('node:crypto').createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),p+' manifest integrity')}
 await h.install();assert.equal(h.stats().installs,1);assert.equal(h.attempts.get('assets/startup-bundle.js'),2);assert.ok(!h.attempts.has('assets/wallace-adultos-original-HD.png'),'Reuse identical 8 MiB image, zero download');
 assert.ok(h.stats().peak<=3);assert.ok(h.named.has('kidbum-calc-previous-functional'));assert.ok(h.progress.some(x=>x.done===assets.length));
 assert.equal((await h.navigate('index.html?from=shortcut')).body,'cached:./index.html');assert.match((await h.navigate('release-check.js?check=1')).body,/network:/);assert.match((await h.navigate('actualizar.html')).body,/network:/);
 const waits=[];h.events.activate({waitUntil:p=>waits.push(p)});await Promise.all(waits);assert.equal(h.stats().activations,1);assert.ok(!h.named.has('kidbum-calc-previous-functional'));
 const fail=harness();fail.mode('permanent');await assert.rejects(fail.install(),/Simulated cellular interruption/);assert.equal(fail.stats().installs,0);assert.equal(fail.attempts.get('assets/startup-bundle.js'),4);assert.ok(fail.named.has('kidbum-calc-previous-functional'));const partial=fail.named.get(fail.self.__testCache).size;assert.ok(partial>0&&partial<assets.length);assert.ok(fail.progress.some(x=>x.status==='failed'&&x.done>0));
 const before=fail.stats().downloads;fail.mode('ok');await fail.install();assert.equal(fail.stats().installs,1);assert.ok(fail.stats().downloads-before<=assets.length-partial);assert.equal(fail.named.get(fail.self.__testCache).size,assets.length);
 const corrupt=harness();corrupt.mode('corrupt');await assert.rejects(corrupt.install(),/Descarga incompleta o archivo de otra versión/);assert.equal(corrupt.stats().installs,0);assert.ok(!corrupt.named.get(corrupt.self.__testCache).has(origin+'assets/startup-bundle.js'));assert.ok(corrupt.named.has('kidbum-calc-previous-functional'));
 console.log('PASS cellular: per-file retries, verified reuse, resume, corrupt payload rejected, atomic activation, offline and preferences');
})().catch(e=>{console.error(e);process.exitCode=1});
