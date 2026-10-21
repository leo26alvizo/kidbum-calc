'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('historia-pediatria.html','utf8');
const entry=fs.readFileSync('documentacion.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const m=html.match(/const TEMPLATE=(\[[\s\S]*?\]);\s*let step=/);
assert.ok(m,'Pediatric schema must parse');
const template=JSON.parse(m[1]);
assert.equal(template.length,18,'Preserve all eighteen pediatric sections');
assert.equal(new Set(template.map(s=>s.name)).size,18,'Unique headings');
for(const [i,section] of template.entries()){
 assert.ok(section.name&&section.hint&&section.fields.length>0,'Section '+i+' complete');
 assert.equal(new Set(section.fields).size,section.fields.length,'Unique fields in section '+i);
}
assert.ok(template.flatMap(s=>s.fields).length>=270,'Preserve detailed pediatric interrogation');
for(const term of ['Ficha de identificación','Antecedentes prenatales','Antecedentes perinatales','Alimentación','Crecimiento y desarrollo','Inmunizaciones','Interrogatorio por aparatos','Exploración física','Pronóstico'])assert.ok(template.some(s=>s.name.includes(term)),'Missing section '+term);
assert.match(entry,/name==='Pediatría'/);
assert.match(entry,/location\.assign\('\.\/historia-pediatria\.html'\)/);
assert.match(sw,/'\.\/historia-pediatria\.html'/);
assert.match(html,/window\.print\(\)/);
assert.match(html,/@media print/);
assert.match(html,/size:A4/);
assert.match(html,/\[PENDIENTE\]/);
assert.match(html,/document\.createTextNode\(/,'User content must render as literal text');
assert.ok(!/sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(html),'No persistence or network');
assert.match(html,/BORRADOR SIN FIRMA/);
console.log('Pediatric history PASSED: '+template.length+' sections, '+template.flatMap(s=>s.fields).length+' fields, navigation, offline and privacy checks.');

assert.ok(!/localStorage\.(?:setItem|getItem)\((?!'kidbum-theme')/.test(html),'Only theme preference may use localStorage');
