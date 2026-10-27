'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ui=fs.readFileSync('assets/pharma-pro-ui.js','utf8');
const from=ui.indexOf('/* One shared theme preference across ALL KidBum modules.');
const to=ui.indexOf('function fromHash()',from);
assert.ok(from>0&&to>from,'Shared pharma theme handler exists');
const handler=ui.slice(from,to);
assert.match(handler,/localStorage\.setItem\('kidbum-theme'/);
assert.match(handler,/localStorage\.getItem\('kidbum-theme'\)/);
assert.match(handler,/shared!=='light'&&localStorage\.getItem\('kidbum-pharma-theme'\)==='dark'/,'Migrate legacy Pharma preference only if no global override');
assert.match(handler,/theme\.setAttribute\('aria-label'/);
assert.match(handler,/theme\.onclick=\(\)=>applyPharmaTheme/);
function run(initial){
 const memory=new Map(Object.entries(initial||{}));
 const root={dark:false},btn={textContent:'◐ Tema',onclick:null,attributes:{},setAttribute(n,v){this.attributes[n]=v;}};
 const document={documentElement:{classList:{
  contains(name){assert.equal(name,'dark');return root.dark;},
  toggle(name,on){assert.equal(name,'dark');root.dark=!!on;}
 }}};
 const localStorage={getItem:key=>memory.has(key)?memory.get(key):null,setItem:(key,value)=>memory.set(key,value)};
 const ctx={document,localStorage,$:name=>{assert.equal(name,'theme');return btn;}};
 new vm.Script(handler);vm.runInNewContext(handler,ctx,{timeout:2000});
 return {memory,root,btn};
}
let x=run({'kidbum-theme':'dark','kidbum-pharma-theme':'light'});
assert.equal(x.root.dark,true,'Global dark beats stale local pharma light');
assert.equal(x.btn.textContent,'☀ Modo claro');
assert.equal(x.btn.attributes['aria-label'],'Cambiar a modo claro');
assert.equal(x.btn.attributes['aria-pressed'],'true');
x.btn.onclick();
assert.equal(x.root.dark,false,'Dark to light actually works');
assert.equal(x.memory.get('kidbum-theme'),'light','Global key stores light');
assert.equal(x.btn.textContent,'◐ Tema','Original light UI button restored');
x.btn.onclick();assert.equal(x.root.dark,true);assert.equal(x.memory.get('kidbum-theme'),'dark','Light to dark works');
x=run({'kidbum-theme':'light','kidbum-pharma-theme':'dark'});
assert.equal(x.root.dark,false,'Global explicit light beats legacy pharma dark');
x=run({'kidbum-pharma-theme':'dark'});
assert.equal(x.root.dark,true,'Legacy pharma dark is migrated when shared preference absent');
assert.equal(x.memory.get('kidbum-theme'),'dark');
x=run({});
assert.equal(x.root.dark,false,'Default still light');
assert.equal(x.memory.get('kidbum-theme'),'light','Global setting initialized consistently');
const home=fs.readFileSync('index.html','utf8'),pharma=fs.readFileSync('pharma-pro.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
assert.match(home,/content="0\.10\.37"/);
assert.match(pharma,/content="0\.10\.37"/);
assert.match(pharma,/class="phone-brand">💊 Pharma Pro <small>v0\.10\.37<\/small>/);
assert.match(sw,/pharma-theme-sync-v01037/);
assert.match(pharma,/assets\/dark-graphite-v01036\.css/);
assert.match(pharma,/assets\/theme-chrome-v01036\.js/);
console.log('PASS Pharma Pro v0.10.37: global dark/light preference, toggle both directions, legacy migration, accessibility and same graphite PWA.');
