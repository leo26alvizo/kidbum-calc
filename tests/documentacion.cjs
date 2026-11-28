'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('documentacion.html','utf8');
const home=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
assert.match(home,/data-mobile-nav="docs"/,'Documentation is in bottom mobile navigation');
assert.match(home,/\['docs','▤','Documentación clínica'\]/,'Documentation is in sidebar');
assert.match(home,/window\.location\.assign\('\.\/documentacion\.html'\)/,'Navigation opens editor');
assert.match(sw,/'\.\/documentacion\.html'/,'Editor is available offline');
assert.match(sw,/safe-update-v01060-r1/,'Current release preloads documentation in a distinct cache');
assert.match(html,/const SERVICES=/,'Specialty cards are defined');
assert.match(html,/const STEPS=/,'Guided steps are defined');
assert.match(html,/window\.print\(\)/,'User-triggered browser Save as PDF');
assert.match(html,/@media print/,'Print stylesheet exists');
assert.match(html,/size:A4/,'A4 PDF print layout exists');
assert.match(html,/\[PENDIENTE\]/,'Missing clinical details are not invented');
assert.match(html,/document\.createTextNode\(row\.value\)/,'User text is inserted as text, not HTML');
assert.match(html,/replaceChildren/,'Preview rebuilds without injection');
assert.match(html,/No se guardan borradores/,'Non-persistence privacy warning exists');
assert.match(html,/BORRADOR SIN FIRMA/,'Preview does not impersonate a signed clinical record');
assert.ok(!/sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(html),'No identified patient data persistence or transmission');
for(const term of ['Padecimiento actual','Antecedentes','Exploración','Análisis y plan','Urgencias','Pediatría','Ginecología y obstetricia'])
 assert.ok(html.includes(term),'Missing clinical workflow term: '+term);
console.log('Clinical documentation MVP checks PASSED: routing, steps, print-PDF, privacy, XSS and offline.');

assert.ok(!/localStorage\.(?:setItem|getItem)\((?!'kidbum-theme')/.test(html),'Only theme preference may use localStorage');

const sharedStyle=fs.readFileSync('assets/historias-coral-jade-v01205.css','utf8');
assert.match(html,/historias-coral-jade-v01205\.css/);
assert.match(html,/id="hc-progress"/);assert.match(html,/id="hc-exportar"/);assert.match(html,/id="hc-editor"/);
assert.match(sharedStyle,/#8e3345/);assert.match(sharedStyle,/#276b58/);assert.match(sw,/'\.\/assets\/historias-coral-jade-v01205\.css'/);
assert.match(html,/id="hc-search"/);assert.match(html,/function filterServices\(/);assert.match(html,/id="hc-service-status"/);
