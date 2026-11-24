'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={window:{}};vm.runInNewContext(fs.readFileSync('assets/neurologia-pro-v01092.js','utf8'),c);const E=c.window.KidBumNeurologyPro;
assert.equal(E.bank.length,12);assert.equal(new Set(E.bank.map(x=>x.id)).size,12);
for(const t of E.bank){const d=Object.fromEntries(t.fields.map(f=>[f.id,f.example]));assert.equal(E.evaluate(t.id,d).value,t.expected,t.id);for(const f of t.fields){const copy={...d};delete copy[f.id];assert.ok(E.evaluate(t.id,copy).error,t.id+' missing '+f.id);assert.ok(E.evaluate(t.id,{...d,[f.id]:'invalid'}).error,t.id+' invalid '+f.id);}}
for(const gcs of [3,6,7,12,13,14,15])for(const deficit of [0,1]){const r=E.evaluate('neuro-wfns',{gcs,deficit});if(gcs===15&&deficit)assert.ok(r.error);else assert.equal(r.value,gcs===15?'I':gcs>=13?deficit?'III':'II':gcs>=7?'IV':'V');}
assert.equal(E.evaluate('neuro-cpp',{map:90,icp:20}).value,'70 mmHg');
assert.equal(E.evaluate('neuro-csfratio',{csf:40,blood:100}).interpretation,'Cociente bajo (≤0.4)');assert.ok(E.evaluate('neuro-csfratio',{csf:40,blood:0}).error);
const html=fs.readFileSync('neurologia.html','utf8'),home=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
for(const t of E.bank)assert.ok(home.includes('./neurologia.html#'+t.id));
for(const id of ['example','example-note','clear','kb-ai-mount'])assert.ok(html.includes('id="'+id+'"'));
assert.match(html,/requestSubmit\(\)/);assert.match(html,/ai\?\.setReady\(Boolean\(lastResult\)\)/);
assert.ok(sw.includes("'./neurologia.html'"));assert.ok(sw.includes("'./assets/neurologia-pro-v01092.js'"));
for(const m of html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g))if(m[1].trim())new vm.Script(m[1]);
console.log('PASS Neurología PRO: 12 tools, examples, missing/invalid inputs, WFNS boundaries and offline routes.');
