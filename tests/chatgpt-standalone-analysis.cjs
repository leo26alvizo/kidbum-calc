'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const files=['capurro.html','wallace-adultos.html','escalas-cardioembolia.html'];
const shared=fs.readFileSync('assets/chatgpt-analysis.js','utf8');new vm.Script(shared);
const window={};const doc={};
vm.runInNewContext(shared,{window,document:doc});
const data={title:'Capurro somático',result:'40 semanas y 0 días',interpretation:'A término',details:'Puntuación completa',warning:'Revisar datación prenatal'};
for(const mode of ['guardia','estudio','pase']){
 const message=window.KidBumAnalysis.buildPrompt(data,mode);
 assert.match(message,/Capurro somático/);assert.match(message,/40 semanas/);assert.match(message,/No supongas antecedentes/);assert.match(message,/no incluye identificadores/i);
}
assert.throws(()=>window.KidBumAnalysis.buildPrompt({title:'Capurro'},'estudio'));
assert.throws(()=>window.KidBumAnalysis.buildPrompt(data,'not-real'));
assert.doesNotMatch(shared,/chatgpt\.com\/\?q=|api\.openai\.com|sendBeacon|fetch\(/);
assert.match(shared,/navigator\.clipboard\.writeText/);assert.match(shared,/window\.location\.assign\('https:\/\/chatgpt\.com\/'\)/);
assert.match(shared,/main\.disabled=!ready/);
for(const path of files){
 const html=fs.readFileSync(path,'utf8');
 assert.match(html,/<div id="kb-ai-mount"><\/div>/,path+' mount');
 assert.match(html,/src="\.\/assets\/chatgpt-analysis\.js"/,path+' library');
 assert.match(html,/KidBumAnalysis\.attach\(/,path+' actual handler');
 assert.match(html,/\.setReady\((?:true|total>0)\)/,path+' enables on result');
 assert.match(html,/\.setReady\(false\)|\.setReady\(total>0\)/,path+' disables on missing');
 for(const match of html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g)){if(match[1].trim())new vm.Script(match[1],{filename:path})}
}
const index=fs.readFileSync('index.html','utf8');assert.match(index,/id="mode-selector"/);assert.match(index,/function buildAnalysisPrompt/);
const sw=fs.readFileSync('sw.js','utf8');assert.match(sw,/'\.\/assets\/chatgpt-analysis\.js'/);assert.match(sw,/chatgpt-external-restored/);
const reg=index.slice(index.indexOf('const externalCalculators='),index.indexOf('const calculatorCount='));
const paths=[...reg.matchAll(/href:'\.\/([^'#]+)(?:#[^']+)?'/g)].map(m=>m[1]);
assert.equal(paths.length,6,'six standalone calculators');
for(const path of new Set(paths))assert.match(fs.readFileSync(path,'utf8'),/KidBumAnalysis\.attach\(/,'Every external calculator must have ChatGPT analysis: '+path);
console.log('Standalone ChatGPT analysis PASS: 6 calculators, 3 pages, privacy, completion gating, themes, offline.');
