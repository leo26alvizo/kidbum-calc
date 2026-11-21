'use strict';
/* Offline Lion Awakening splash regression. Never touch clinical data. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const home=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('assets/lion-splash-v01062.css','utf8');
const js=fs.readFileSync('assets/lion-splash-v01062.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const marker=fs.readFileSync('release-check.js','utf8');
const pharma=fs.readFileSync('pharma-pro.html','utf8');
assert.match(home,/kidbum-app-version" content="0\.10\.63"/);
assert.match(pharma,/kidbum-app-version" content="0\.10\.63"/);
assert.match(marker,/KidBumPublicRelease = '0\.10\.63'/);
assert.match(sw,/const RELEASE='0\.10\.63'/);
assert.match(sw,/lion-headlight-splash-v01062/);
assert.match(home,/assets\/lion-splash-v01062\.css/);
assert.match(home,/assets\/lion-splash-v01062\.js/);
assert.match(sw,/'\.\/assets\/lion-splash-v01062\.css'/);
assert.match(sw,/'\.\/assets\/lion-splash-v01062\.js'/);
assert.ok(home.indexOf('id="kb-lion-splash"')<home.indexOf('assets/startup-bundle.js'),'Splash must be available before clinical startup');
assert.match(home,/id="kb-lion-splash" hidden/,'Splash defaults to hidden if JS or storage fails');
assert.match(home,/kb-lion-splash-skip/,'Splash has skip control');
assert.match(home,/aria-label="Omitir animación de inicio"/,'Skip button is accessible');
assert.match(home,/class="kb-lion-eye-glow"/);
assert.equal((home.match(/<ellipse cx="/g)||[]).length,2,'Both lion eyes glow');
assert.match(home,/class="kb-lion-beam"/,'Premium horizontal headlight flare');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.match(css,/\.kb-lion-splash\[hidden\]\{display:none!important\}/);
assert.match(css,/@media\(forced-colors:active\)/);
assert.match(css,/kb-lion-splash-hide 1\.34s/);
assert.match(css,/pointer-events:none;animation:kb-lion-splash-hide/,'Overlay cannot intercept clinical actions');
assert.match(css,/pointer-events:auto;min-height:40px/,'Skip control remains interactive');
assert.match(js,/timer=setTimeout\(finish,1390\)/,'Hard upper bound to dismiss');
assert.match(js,/sessionStorage\.setItem\('kb-lion-splash-seen-v01062','1'\)/);
for(const unsafe of ['localStorage','fetch(','XMLHttpRequest','navigator.sendBeacon','location.reload(','eval(']){
 assert.ok(!js.includes(unsafe),'Splash must not use '+unsafe);
}

function makeHarness(opts={}){
 const listeners=new Map(),timers=new Map(),saved=opts.saved||new Map();
 let nextTimer=0;
 const skip={listeners:new Map(),addEventListener(k,f){this.listeners.set(k,f)},removeEventListener(k){this.listeners.delete(k)}};
 const classes=new Set();
 const splash={hidden:true,querySelector:s=>s==='[data-kb-lion-skip]'?skip:null,
  listeners:new Map(),classList:{add(x){classes.add(x)},contains(x){return classes.has(x)}},
  addEventListener(k,f){this.listeners.set(k,f)},removeEventListener(k){this.listeners.delete(k)}};
 const document={visibilityState:opts.hidden?'hidden':'visible',
  getElementById:id=>id==='kb-lion-splash'?splash:null,
  addEventListener(k,f){listeners.set(k,f)},removeEventListener(k){listeners.delete(k)}};
 const window={matchMedia:()=>({matches:!!opts.reduced}),addEventListener(k,f){listeners.set(k,f)}};
 const sessionStorage={
  getItem:k=>{if(opts.denied)throw Error('storage unavailable');return saved.get(k)||null},
  setItem:(k,v)=>{if(opts.denied)throw Error('storage unavailable');saved.set(k,v)}
 };
 const context={document,window,sessionStorage,
  setTimeout:(f,ms)=>{const id=++nextTimer;timers.set(id,{f,ms});return id},
  clearTimeout:id=>timers.delete(id)};
 vm.runInNewContext(js,context,{timeout:1200});
 return {splash,skip,saved,timers,classes,listeners,runTimers(){
  for(const [id,t] of [...timers]){if(timers.has(id)){timers.delete(id);t.f()}}
 }};
}
let h=makeHarness();
assert.equal(h.splash.hidden,false,'First launch shows splash');
assert.equal(h.saved.get('kb-lion-splash-seen-v01062'),'1');
assert.equal([...h.timers.values()].some(t=>t.ms===1390),true,'Splash always auto-dismisses');
h.runTimers();assert.equal(h.splash.hidden,true,'Timeout never blocks the app');
h=makeHarness({saved:h.saved});
assert.equal(h.splash.hidden,true,'Same session must not repeat');
h=makeHarness({reduced:true});
assert.equal(h.splash.hidden,true,'Reduced-motion users skip splash entirely');
h=makeHarness({hidden:true});
assert.equal(h.splash.hidden,true,'Background tabs skip splash');
h=makeHarness({denied:true});
assert.equal(h.splash.hidden,true,'Storage failures do not block clinical access');
h=makeHarness();
h.skip.listeners.get('click')();
assert.equal(h.classes.has('kb-lion-splash-closing'),true,'Manual skip begins immediate fade');
assert.equal([...h.timers.values()].some(t=>t.ms===150),true,'Manual skip is prompt');
h.runTimers();
assert.equal(h.splash.hidden,true,'Manual skip actually hides splash');
h=makeHarness();
h.listeners.get('keydown')({key:'Escape'});
h.runTimers();
assert.equal(h.splash.hidden,true,'Escape bypasses introduction');
h=makeHarness();
h.listeners.get('pointerdown')();
h.runTimers();
assert.equal(h.splash.hidden,true,'Any tap bypasses introduction');
console.log('PASS v0.10.62 Lion Awakening — eye glints, offline precache, skip, max duration, once/session, accessibility, reduced motion, no clinical data.');
