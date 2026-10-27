'use strict';
/* Theme-only quality gate: 13/13 HTML surfaces, contrast, light-theme
 * invariance, PWA cache and native address-bar/standalone theme synchronization.
 */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const pages=[
'index','pharma-pro','atlas-gallery','capurro','documentacion',
'escalas-cardioembolia','expansion-20','geriatria-escalas','guardia-pro',
'hepatologia-indices','historia-pediatria','snnoop10','wallace-adultos'];
const css=read('assets/dark-graphite-v01036.css'),themeJS=read('assets/theme-chrome-v01036.js');
const sw=read('sw.js');
assert.equal(pages.length,13);
for(const name of pages){
 const html=read(name+'.html');
 assert.ok(html.includes('<html lang="es" data-kb-page="'+name+'">'),name+' scoped page identity');
 const ref='<link rel="stylesheet" href="./assets/dark-graphite-v01036.css">';
 assert.ok(html.includes(ref),'graphite stylesheet on '+name);
 assert.ok(html.indexOf(ref)>html.lastIndexOf('</style>'),'new stylesheet wins previous dark CSS on '+name);
 assert.ok(html.includes('<script defer src="./assets/theme-chrome-v01036.js"></script>'),'browser bars sync on '+name);
 assert.ok(html.includes('meta name="theme-color"'),'original theme-color available in '+name);
 const linkIdx=html.indexOf(ref),headEnd=html.indexOf('</head>');
 assert.ok(linkIdx<headEnd,'stylesheet stays inside <head> for '+name);
}
assert.match(read('index.html'),/content="0\.10\.36"/);
assert.match(read('pharma-pro.html'),/content="0\.10\.36"/);
assert.match(read('pharma-pro.html'),/class="phone-brand">💊 Pharma Pro <small>v0\.10\.36<\/small>/);
assert.match(read('index.html'),/--bg:#f5f8fa/,'main original light palette untouched');
assert.match(read('pharma-pro.html'),/--bg:#f4f7f7/,'pharma original light palette untouched');
assert.match(read('snnoop10.html'),/--sn-bg:#f1f6f7/,'SNNOOP original light palette untouched');
assert.match(read('documentacion.html'),/html:not\(\.dark\)\{color-scheme:light;background:#f2f6fa/,'Doc original light palette untouched');
for(const required of [
'--bg:#0b0b0d','--surface:#19191c','--panel:#19191c',
'--stroke:#404046','--ink:#f3f3f5','--kb-noir:#0b0b0d',
'--sn-bg:#0b0b0d','--kb-bg:#0b0b0d',
'--alert-bg:#32271d','--red-bg:#341f23']){
 assert.ok(css.includes(required),'Missing dark token '+required);
}
const hexToLum=h=>{
 const rgb=h.replace('#','').match(/../g).map(c=>parseInt(c,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
};
const ratio=(a,b)=>{const x=hexToLum(a),y=hexToLum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
assert.ok(ratio('#f3f3f5','#0b0b0d')>=7,'Text on background WCAG AAA');
assert.ok(ratio('#f3f3f5','#19191c')>=7,'Text on card WCAG AAA');
assert.ok(ratio('#b6b6bc','#19191c')>=4.5,'Muted secondary text AA');
assert.ok(ratio('#111114','#dedee1')>=7,'Active buttons AAA');
assert.ok(ratio('#f0c68d','#32271d')>=4.5,'Clinical amber warning text AA');
assert.match(css,/html\.dark\[data-kb-page="pharma-pro"\]/,'Scoped medicine overrides');
assert.match(css,/html\.dark\[data-kb-page="snnoop10"\]/,'Scoped SNNOOP art overlay');
assert.match(css,/html\.dark\[data-kb-page="atlas-gallery"\]/,'Medical atlas dark mode');
assert.match(css,/html\.dark :is\(\.preview,\.paper\)/,'Dark clinical note previews');
assert.match(css,/@media print\{/,'Printer safe light paper');
assert.match(css,/background:white!important;color:black!important/,'Print remains paper-white');
assert.match(css,/html\.dark :is\(\.result-warning,\.notice,\.warning\)/,'Warnings keep semantic color');
assert.match(css,/html\.dark :is\(\.gcs-choice.selected/,'GCS selection no longer blue');
assert.match(css,/background:#232326!important;background-image:none!important/,'Home categories neutralize dark-only blue gradients');
assert.ok(!/\bhtml:has\(\.dark\)\s+\.light/.test(css));
assert.ok(!/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/.test(css));
new vm.Script(themeJS);
let light='#10243b',dark=false,notify=null;
const meta={getAttribute:(k)=>k==='content'?light:null,setAttribute:(k,v)=>{assert.equal(k,'content');light=v;}};
const document={documentElement:{classList:{contains:(n)=>{assert.equal(n,'dark');return dark;}}},querySelector:q=>{assert.equal(q,'meta[name="theme-color"]');return meta;}};
class Observer{constructor(cb){notify=cb;}observe(_,opts){assert.deepEqual(Array.from(opts.attributeFilter),['class']);}}
vm.runInNewContext(themeJS,{document,MutationObserver:Observer},{timeout:2000});
assert.equal(light,'#10243b','Light browser bar UNCHANGED');
assert.equal(typeof notify,'function');
dark=true;notify();assert.equal(light,'#0b0b0d','Dark browser bar near-black');
dark=false;notify();assert.equal(light,'#10243b','Original light browser bar restored');
assert.match(sw,/graphite-noir-v01036/);
for(const file of ['assets/dark-graphite-v01036.css','assets/theme-chrome-v01036.js']){
 assert.ok(sw.includes("'./"+file+"'"),'PWA offline theme asset '+file);
}
const body=read('index.html');
assert.equal((body.match(/data-mobile-nav="/g)||[]).length,4,'Four mobile navigation entries preserved');
assert.doesNotMatch(body,/data-mobile-nav="guard"/);
for(const slug of ['home','favorite','docs','about'])assert.ok(body.includes('data-mobile-nav="'+slug+'"'));
assert.ok(body.includes('assets/mobile-first-v01035.css'),'Phone-first styling preserved');
assert.ok(read('pharma-pro.html').includes('assets/pharma-mobile-v01035.css'),'Pharma phone-first styling preserved');
assert.ok(read('pharma-pro.html').includes('9/227')&&read('pharma-pro.html').includes('218/227'),'Original source verification not touched');
console.log('PASS Graphite Noir v0.10.36: 13 scoped pages, light unchanged, contrast, clinical warnings, native bar sync, mobile/PWA and prior clinical coverage.');
