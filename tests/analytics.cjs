'use strict';
// Tests for the optional Umami integration; node tests/analytics.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync('assets/analytics.js','utf8');
const enabledSource=source.replace("const WEBSITE_ID='';",
 "const WEBSITE_ID='e676c9b4-11e4-4ef1-a4d7-87001773e9f2';");
assert.notEqual(enabledSource,source,'Umami configuration has a clear insertion point');
const html=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
assert.ok(html.includes('<script src="./assets/analytics.js"></script>'));
assert.ok(sw.includes("'./assets/analytics.js'"));
assert.ok(!html.includes('data-website-id="e676c9b4-11e4-4ef1-a4d7-87001773e9f2"'),
 'Tests must never activate a fake analytics ID in production');
assert.ok(html.includes('kidbum-analytics-optout'),'Users can disable analytics');
assert.ok(html.includes('Los datos clínicos introducidos'),'Disclosure covers clinical information');
function launch({enabled=false,hostname='leo26alvizo.github.io',dnt='0',
 optedOut=false,online=true,standalone=false,ios=false}={}){
 const scripts=[],events={},sent=[],storage=new Map();
 if(optedOut)storage.set('kidbum-analytics-optout','1');
 const root={
  location:{hostname,reloaded:false,reload(){this.reloaded=true;}},
  navigator:{onLine:online,doNotTrack:dnt,standalone:ios},
  matchMedia:()=>({matches:standalone}),
  localStorage:{
   getItem:key=>storage.get(key)||null,
   setItem:(key,value)=>storage.set(key,value),
   removeItem:key=>storage.delete(key)
  },
  document:{
   createElement:()=>({dataset:{}}),
   head:{appendChild:element=>scripts.push(element)}
  },
  addEventListener:(name,handler)=>{events[name]=handler;},
  umami:{track:name=>sent.push(name)}
 };
 root.window=root;root.globalThis=root;
 vm.runInNewContext(enabled?enabledSource:source,root,{timeout:2000});
 return {root,scripts,events,sent,storage};
}
let x=launch();assert.equal(x.root.KidBumAnalytics.isConfigured(),false);
assert.equal(x.scripts.length,0,'No third-party script before setup');
x=launch({enabled:true});
assert.equal(x.root.KidBumAnalytics.isConfigured(),true);
assert.equal(x.scripts.length,1,'One tracker per page load');
const tag=x.scripts[0];
assert.equal(tag.src,'https://cloud.umami.is/script.js');
assert.equal(tag.dataset.excludeSearch,'true');
assert.equal(tag.dataset.excludeHash,'true');
assert.equal(tag.dataset.doNotTrack,'true');
assert.equal(tag.dataset.domains,'leo26alvizo.github.io');
assert.equal(tag.referrerPolicy,'no-referrer');
assert.equal(tag.dataset.beforeSend,'kidbumAnalyticsBeforeSend');
tag.onload();
assert.deepEqual(x.sent,['kidbum_open_browser']);
x.events.appinstalled();
assert.deepEqual(x.sent,['kidbum_open_browser','kidbum_install_android']);
const safe=x.root.kidbumAnalyticsBeforeSend('event',{
 name:'kidbum_open_app',url:'/kidbum-calc/?paciente=123#secreto',
 title:'paciente',referrer:'https://example.org/patient/123',
 data:{weight:70},website:'e676c9b4-11e4-4ef1-a4d7-87001773e9f2'
});
assert.equal(safe.url,'/kidbum-calc/');
assert.equal(safe.title,'KidBum CALC');
assert.equal(safe.referrer,undefined);
assert.equal(safe.data,undefined);
assert.equal(x.root.kidbumAnalyticsBeforeSend('event',{name:'calculation_result',value:123}),false);
x=launch({enabled:true,standalone:true});
x.scripts[0].onload();assert.deepEqual(x.sent,['kidbum_open_app']);
x=launch({enabled:true,ios:true});
x.scripts[0].onload();assert.deepEqual(x.sent,['kidbum_open_app']);
for(const p of [
 {enabled:true,hostname:'localhost'},
 {enabled:true,hostname:'fake.github.io'},
 {enabled:true,dnt:'1'},
 {enabled:true,optedOut:true},
 {enabled:true,online:false}
]){
 x=launch(p);assert.equal(x.scripts.length,0,'Must not run: '+JSON.stringify(p));
}
x=launch({enabled:true});
assert.equal(x.root.KidBumAnalytics.setOptOut(true),true);
assert.equal(x.storage.get('kidbum-analytics-optout'),'1');
assert.equal(x.root.location.reloaded,true);
console.log('KidBum analytics: privacy, installation-event and no-configuration checks PASSED');
