'use strict';
// KidBum CALC — regression tests (no dependencies).
// Run locally in repo root: node tests/regression.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(x=>x.trim().length>0);
assert.match(html,/assets\/medical-atlas\.js/,'Medical atlas source must be included');
assert.match(html,/Clinical toolkit · v0\.5\.2/,'Atlas release version must be visible');
const atlasSource=fs.readFileSync('assets/medical-atlas.js','utf8');
const ids=['anion','osm','bmi','bsa','map','shock','egfr','cg','fib4','qsofa','curb','correctedna','news2','wellsdvt','wellspe','perc','childpugh','agfum','fppfum','fppus','bishop','obshock','gcs'];
for(const id of ids)assert.ok(fs.existsSync('assets/atlas-'+id+'.jpg'),'Missing pictorial clinical illustration: '+id);
for(const art of ['hero','lab','kidney','lungs','brain','liver','obstetrics','vascular'])
  assert.ok(fs.existsSync('assets/atlas-'+art+'.jpg'),'Missing original atlas source: '+art);
assert.match(atlasSource,/assets\/atlas-/,'Atlas library must load local image assets');

assert.equal(scripts.length,2,'Two inline JavaScript blocks expected');
const ctx={};vm.runInNewContext(scripts[0],{globalThis:ctx}, {timeout:2000});
const calc=(id,params)=>ctx.KidBumEngine.calculate(id,params);
const t=[
['Original anion gap',()=>assert.equal(calc('anion',{na:140,cl:104,hco3:23}).value,13)],
['Count',()=>assert.equal(ctx.KidBumEngine.list.length,23)],
['Dating 0w0d',()=>assert.equal(calc('agfum',{lmp:'2026-01-01',asof:'2026-01-01'}).display,'0 sem + 0 d')],
['Dating 40w3d',()=>assert.equal(calc('agfum',{lmp:'2026-01-01',asof:'2026-10-11'}).display,'40 sem + 3 d')],
['Date reversed',()=>assert.ok(calc('agfum',{lmp:'2026-10-11',asof:'2026-01-01'}).error)],
['Invalid leap day',()=>assert.ok(calc('agfum',{lmp:'2026-02-29',asof:'2026-03-01'}).error)],
['FPP from LMP',()=>assert.equal(calc('fppfum',{lmp:'2026-01-01'}).display,'08/10/2026')],
['Leap-year FPP',()=>assert.equal(calc('fppfum',{lmp:'2024-01-01'}).display,'07/10/2024')],
['US FPP',()=>assert.equal(calc('fppus',{scan:'2026-03-12',weeks:10,days:0}).display,'08/10/2026')],
['US out-of-range days',()=>assert.ok(calc('fppus',{scan:'2026-03-12',weeks:10,days:7}).error)],
['US fractional weeks',()=>assert.ok(calc('fppus',{scan:'2026-03-12',weeks:10.5,days:0}).error)],
['Bishop 0',()=>assert.equal(calc('bishop',{dilation:'0',effacement:'0',station:'0',consistency:'0',position:'0'}).value,0)],
['Bishop 13',()=>assert.equal(calc('bishop',{dilation:'3',effacement:'3',station:'3',consistency:'2',position:'2'}).value,13)],
['Bishop missing',()=>assert.ok(calc('bishop',{dilation:'3'}).error)],
['Obstetric shock index',()=>assert.equal(calc('obshock',{hr:100,sbp:100}).value,1)],
['Invalid SBP',()=>assert.ok(calc('obshock',{hr:100,sbp:0}).error)],
['NEWS2 regression',()=>assert.equal(calc('news2',{rr:16,spo2:98,sbp:120,hr:70,temp:37,scale:'one',oxygen:'false',conscious:'alert'}).value,0)],
['Creator credit',()=>assert.ok(html.includes('Leonardo Alvizo Velázquez'))],
['ChatGPT handoff',()=>assert.ok(html.includes("window.location.assign('https://chatgpt.com/')"))],
['No paid API call',()=>assert.ok(!html.includes('api.openai.com'))],
['Illustrated calculator card',()=>assert.match(html,/atlas-card-illustration/)],
['Illustrated calculator header',()=>assert.match(html,/atlas-calc-illustration/)],
['Illustrated specialty cards',()=>assert.match(html,/atlas-category-card/)],
['Clinical atlas 23 JPG',()=>assert.equal(ids.length,23)],
['Glasgow touch selection',()=>assert.match(html,/data-gcs-value/)],
['Glasgow still uses underlying select',()=>assert.match(html,/gcs-native-select/)],
['Mobile two-column specialty cards',()=>assert.match(html,/atlas-category-grid\{grid-template-columns:repeat\(2/)],
['Legacy formulas not modified',()=>assert.equal(calc('gcs',{eye:'4',verbal:'5',motor:'6'}).value,15)]
];
let errors=0;for(const [name,fn] of t){try{fn();console.log('PASS',name)}catch(e){errors++;console.error('FAIL',name,e.message)}}
if(errors){console.error('Failed:',errors);process.exitCode=1;}else console.log(t.length,'checks passed');
