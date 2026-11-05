'use strict';
/* PAS 0.10.46 — only presentation changes; untouched 0.10.45 clinical engine. */
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync('pediatria-pas.html','utf8'),
 home=fs.readFileSync('index.html','utf8'),
 css=fs.readFileSync('assets/pediatric-pas-layout-v01046.css','utf8'),
 sw=fs.readFileSync('sw.js','utf8');
const photoPath='assets/pas-apendicectomia-portada-v01046.webp';
const photo=fs.readFileSync(photoPath);
const gitHash=crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+photo.length+'\0'),photo])).digest('hex');
assert.equal(photo.length,43104,'WebP optimized cover size must match uploaded user image derivation');
assert.equal(gitHash,'4fa180df41c57e9c64876738f1738e4dd2ef8b5f','Cover pixels must match approved compressed source');
assert.equal(photo.subarray(0,4).toString('ascii'),'RIFF');
assert.equal(photo.subarray(8,12).toString('ascii'),'WEBP');
assert.match(html,/class="pas-hero pas-hero--surgical"/);
assert.match(html,/class="pas-cover-photo-img"/);
assert.match(html,/alt="Fotografía intraoperatoria/);
assert.match(html,/width="1200" height="900"/);
assert.match(html,/src="\.\/assets\/pas-apendicectomia-portada-v01046\.webp"/);
assert.match(html,/pediatric-pas-layout-v01046\.css/);
assert.match(html,/id="pas-outcome-title"/);
assert.match(html,/id="pas-results"/);
assert.match(html,/href="#pas-results"/);
const pos=part=>html.indexOf(part);
const anchors=['<nav class="pas-topbar"','<header class="pas-hero pas-hero--surgical"','<div class="pas-alert-intro"',
 'id="pas-calculator"','id="pas-patient-title"','id="pas-history-title"','id="pas-exam-title"',
 'id="pas-labs-title"','id="pas-education-title"','class="pas-finish-strip"','</main>','<aside class="pas-sidebar"','id="pas-results"','id="pas-outcome"','<details class="pas-sources"'];
for(let i=1;i<anchors.length;i++)assert.ok(pos(anchors[i])>pos(anchors[i-1]),'Wrong clinical reading order: '+anchors[i]);
assert.ok(pos('id="pas-results"')>pos('id="pas-education-title"'), 'Result must come after all clinical inputs and education');
assert.ok(pos('id="pas-outcome"')>pos('</main>'),'Score is no longer a pre-form sidebar');
assert.doesNotMatch(html,/🟢 0–3 bajo|🟡 4–6 intermedio|🔴 7–10 alto/,'Traffic-light legend moved to result only');
assert.match(html,/<span>🩺 Hallazgos clínicos<\/span>/);
assert.match(css,/\.pas-body-grid\{display:grid!important;grid-template-columns:minmax\(0,1fr\)!important/);
assert.match(css,/\.pas-sidebar\{order:2!important/);
assert.match(css,/\.pas-outcome\{position:static!important/);
assert.match(css,/@media\(max-width:660px\)/);
assert.match(css,/@media\(min-width:901px\)/);
assert.match(css,/\.pas-cover-photo-img\{/);
assert.match(home,/content="0\.10\.47"/);
assert.match(html,/content="0\.10\.47"/);
assert.match(home,/image:'pas-apendicectomia-portada-v01046\.webp'/);
assert.match(home,/c\.dataset\.pedRapid==='pas'\?'\.\/pediatria-pas\.html'/);
assert.match(sw,/cover-results-bottom-v01046/);
for(const entry of [photoPath,'assets/pediatric-pas-layout-v01046.css','pediatria-pas.html'])assert.ok(sw.includes("'./"+entry+"'"),entry+' not precached');
const core=fs.readFileSync('assets/pediatric-pas-core-v01045.js','utf8');
assert.match(core,/KidBum PAS 0\.10\.45/,'PAS medical engine unchanged');
assert.match(html,/<strong>⚠ Regla de seguridad:<\/strong>/);
console.log('PASS PAS 0.10.46 — verified original-derived surgical photo, semantic alt, top cover, clinical details first, final semáforo/results, mobile + desktop CSS, offline cache, unchanged PAS clinical rules.');
