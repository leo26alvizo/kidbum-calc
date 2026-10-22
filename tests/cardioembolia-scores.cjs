'use strict';const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const src=fs.readFileSync('escalas-cardioembolia.html','utf8'),index=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
const block=src.slice(src.indexOf('const Y='),src.indexOf("let active='geneva'"));assert.ok(block.startsWith('const Y=')&&block.includes('sgarbossa:{'));const ctx={};vm.runInNewContext(block+'\nthis.allTools=tools',ctx);const {geneva,pesi,bova,sgarbossa}=ctx.allTools;
function data(t,obj){return Object.fromEntries(t.fields.map(f=>[f.id,f.kind==='yes'?'no':f.kind==='num'?String(f.min):f.options[0][0]]).map(([id,v])=>[id,obj[id]??v]))}
let a=geneva.calc(data(geneva,{hr:'95'}));assert.equal(a.score,'5 puntos');a=geneva.calc(data(geneva,{hr:'74'}));assert.equal(a.score,'0 puntos');a=geneva.calc(data(geneva,{hr:'75'}));assert.equal(a.score,'3 puntos');
let p=pesi.calc(data(pesi,{age:'65',sex:'female',hr:'109',sbp:'100',rr:'29',temp:'36',spo2:'90'}));assert.equal(p.score,'65 puntos');assert.match(p.result,/Clase I/);
p=pesi.calc(data(pesi,{age:'66',sex:'female',hr:'109',sbp:'100',rr:'29',temp:'36',spo2:'90'}));assert.match(p.result,/Clase II/);
p=pesi.calc(data(pesi,{age:'81',sex:'male',cancer:'yes',heart:'yes',lung:'yes',mental:'yes',hr:'110',sbp:'99',rr:'30',temp:'35',spo2:'89'}));assert.match(p.result,/Clase V/);
let b=bova.calc(data(bova,{sbp:'100',hr:'110',trop:'yes',rv:'yes'}));assert.equal(b.score,'7 / 7 puntos');assert.match(b.result,/Estadio III/);
b=bova.calc(data(bova,{sbp:'89',hr:'110',trop:'yes',rv:'yes'}));assert.equal(b.score,'No aplicable');
b=bova.calc(data(bova,{sbp:'101',hr:'109',trop:'no',rv:'no'}));assert.equal(b.score,'0 / 7 puntos');
let e=sgarbossa.calc(data(sgarbossa,{stecon:'0',stdcon:'0',stedisc:'2',swave:'8'}));assert.match(e.score,/Smith positivo/);assert.match(e.score,/Original 0 puntos/);e=sgarbossa.calc(data(sgarbossa,{stecon:'1',stdcon:'0',stedisc:'0',swave:'1'}));assert.match(e.score,/Original 5 puntos/);e=sgarbossa.calc(data(sgarbossa,{stecon:'0',stdcon:'0',stedisc:'5',swave:'40'}));assert.match(e.score,/Smith negativo/);
for(const id of ['geneva','pesi','bova','sgarbossa']){assert.match(index,new RegExp("id:'"+id+"'"));assert.match(src,new RegExp("data-tab=\\\""+id+"\\\""))}
assert.match(sw,/escalas-cardioembolia.html/);assert.match(src,/ninguna respuesta se asume normal/);assert.match(src,/kidbum-theme/);
console.log('Cardiopulmonary calculators PASS: Geneva boundaries, PESI class thresholds, Bova 0–7 and shock exclusion, Sgarbossa Smith ratio and navigation.');
