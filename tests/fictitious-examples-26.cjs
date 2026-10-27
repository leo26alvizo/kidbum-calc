'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};const exampleSrc=fs.readFileSync('assets/fictitious-examples.js','utf8');
new vm.Script(exampleSrc);vm.runInNewContext(exampleSrc,ctx);
const examples=ctx.window.KidBumFictitiousExamples;
const code=fs.readFileSync('assets/expansion-20.js','utf8');new vm.Script(code);vm.runInNewContext(code,ctx);
const {tools,active,evaluate}=ctx.window.KidBum20;
assert.equal(tools.length,20);
let variantsTested=0;
for(const tool of tools){
 const keys=tool.variants?Object.keys(tool.variants):[''];
 for(const mode of keys){
  const test=examples.twenty(tool.id,mode),fields=active(tool,mode).fields;
  assert.ok(test&&typeof test==='object','No example for '+tool.id+'/'+mode);
  assert.deepEqual(Object.keys(test).sort(),Array.from(fields,f=>f.key).sort(),'Example keys match form '+tool.id+'/'+mode);
  for(const f of fields){
   const raw=test[f.key];
   if(f.type==='choice')assert.ok(f.options.some(([v])=>String(v)===String(raw)),'Invalid choice '+tool.id+' '+f.key);
   else assert.ok(Number.isFinite(Number(raw))&&Number(raw)>=f.min&&Number(raw)<=f.max,'Invalid number '+tool.id+' '+f.key);
  }
  const result=evaluate(tool,test,mode);assert.ok(result&&result.display,'Example must produce outcome: '+tool.id+'/'+mode);
  variantsTested++;
 }
}
const cardioPage=fs.readFileSync('escalas-cardioembolia.html','utf8');
const begin=cardioPage.indexOf('const Y=('),end=cardioPage.indexOf("let active='geneva'",begin);
assert.ok(begin>0&&end>begin);const clinical={};
vm.runInNewContext(cardioPage.slice(begin,end)+'\nthis.cardio=tools;',clinical);const cardio=clinical.cardio;
for(const [id,def] of Object.entries(cardio)){
 const fixture=examples.forCardio(id);assert.ok(fixture,'Missing cardio fixture '+id);
 assert.deepEqual(Object.keys(fixture).sort(),Array.from(def.fields,f=>f.id).sort(),'Cardio keys '+id);
 for(const field of def.fields){let v=fixture[field.id];
  if(field.kind==='num')assert.ok(Number.isFinite(Number(v))&&Number(v)>=field.min&&Number(v)<=field.max);
  else if(field.kind==='yes')assert.ok(v==='yes'||v==='no');
  else assert.ok(field.options.some(([option])=>option===v));
 }
 const result=def.calc(fixture);assert.ok(result.score&&result.result,'Cardio example must produce complete result '+id);
}
const cap=fs.readFileSync('capurro.html','utf8'),start=cap.indexOf('const CAPURRO_FIELDS='),stop=cap.indexOf('const $=id',start);
assert.ok(start>0&&stop>start);const neo={};vm.runInNewContext(cap.slice(start,stop)+'\nthis.logic={CAPURRO_FIELDS,CAPURRO_MODES,capurroCalculate};',neo);
for(const mode of Object.keys(neo.logic.CAPURRO_MODES)){
 const item=examples.forCapurro(mode);assert.ok(item);
 assert.deepEqual(Object.keys(item).sort(),Array.from(neo.logic.CAPURRO_MODES[mode].keys).sort());
 for(const key of neo.logic.CAPURRO_MODES[mode].keys)assert.ok(neo.logic.CAPURRO_FIELDS[key].options.some(([n])=>n===item[key]));
 const score=neo.logic.capurroCalculate(mode,item);assert.ok(score&&score.weeks>0);
}
const wallacePage=fs.readFileSync('wallace-adultos.html','utf8');const regionSrc=wallacePage.match(/const REGIONS=(\[[\s\S]*?\]);\s*const selected=/);
assert.ok(regionSrc);const REGIONS=vm.runInNewContext(regionSrc[1]);const regions=examples.forWallace();
assert.ok(regions.length>0);
for(const id of regions)assert.ok(REGIONS.some(r=>r.id===id),'Wallace example region exists: '+id);
const area=REGIONS.filter(r=>regions.includes(r.id)).reduce((n,r)=>n+r.pct,0);
assert.ok(area>0&&area<100);
const pages=['capurro.html','wallace-adultos.html','escalas-cardioembolia.html','expansion-20.html'];
for(const path of pages){
 const source=fs.readFileSync(path,'utf8');
 assert.match(source,/id="example"/,path+' requires example button');
 assert.match(source,/id="example-note"/,path+' requires fictitious example disclosure');
 assert.match(source,/src="\.\/assets\/fictitious-examples\.js"/,path+' requires data fixture');
 assert.match(source,/KidBumFictitiousExamples\./,path+' must load a valid fixture');
 assert.match(source,/KidBumAnalysis\.attach\(/,path+' must retain ChatGPT');
 for(const part of source.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g))if(part[1].trim())new vm.Script(part[1],{filename:path});
}
const main=fs.readFileSync('index.html','utf8');
const registry=main.slice(main.indexOf('const externalCalculators='),main.indexOf('const calculatorCount='));
const externalPaths=[...registry.matchAll(/href:'\.\/([^'#]+)(?:#[^']+)?'/g)].map(m=>m[1]);
assert.equal(externalPaths.length,43);
for(const path of new Set(externalPaths)){
 const page=fs.readFileSync(path,'utf8');assert.match(page,/id="example"/,'Future calculator may not omit the fictitious example: '+path);
}
const sw=fs.readFileSync('sw.js','utf8');assert.match(sw,/'\.\/assets\/fictitious-examples\.js'/);
console.log('Example fixtures PASS: '+variantsTested+' score scenarios, 4 cardio, 2 Capurro, Wallace '+area+'% · all 26 tools have test examples and ChatGPT.');
