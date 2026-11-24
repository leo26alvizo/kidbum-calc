'use strict';
/* KidBum Ultra Retina UI — scoped visual system only. No image or clinical edits. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const read=p=>fs.readFileSync(p,'utf8');
const css=read('assets/ultra-retina-v01063.css');
const home=read('index.html');
const pharma=read('pharma-pro.html');
const sw=read('sw.js');
const marker=read('release-check.js');
const updater=read('assets/pwa-update-v01060.js');
const pages=[
 'index.html','pharma-pro.html','guardia-pro.html','pediatria-pas.html',
 'pediatria-evaluacion-rapida.html','algoritmos-pediatria.html',
 'algoritmos-urgencias.html','snnoop10.html','wallace-adultos.html',
 'escalas-cardioembolia.html','capurro.html','expansion-20.html',
 'geriatria-escalas.html','hepatologia-indices.html',
 'documentacion.html','historia-pediatria.html','atlas-gallery.html'
];
for(const page of pages){
 const html=read(page);
 assert.equal(html.split('assets/ultra-retina-v01063.css').length-1,1,page+' must load shared visual stylesheet exactly once');
 assert.ok(html.indexOf('assets/ultra-retina-v01063.css')<html.indexOf('</head>'),page+' styles must load inside the head');
}
assert.match(home,/kidbum-app-version" content="0\.10\.74"/);
assert.match(pharma,/kidbum-app-version" content="0\.10\.74"/);
assert.match(sw,/const RELEASE='0\.10\.74'/);
assert.match(marker,/KidBumPublicRelease = '0\.10\.74'/);
assert.match(updater,/const VERSION='0\.10\.74'/);
assert.ok(sw.includes("'./assets/ultra-retina-v01063.css'"),'Critical stylesheet precached atomically for offline use');
assert.match(sw,/ultra-retina-v01063-enarm-v01064-radar-v01065-cobalt-v01066-ivory-v01067-direct-v01068-enarm-visual-radar-v01069-clinical-images-v01070-centor-v01071-enarm-visual-expansion-v01072-otoscopy-v01073-ophthalmology-v01074'/,'Cache identity remains invalidated and includes new ENARM release');
assert.match(css,/html\[data-kb-page="index"\]/,'Core styles must be scoped by page');
assert.match(css,/html\.dark\[data-kb-page\]/,'Dark mode must be implemented');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/,'Respect reduced motion');
assert.match(css,/@media\(forced-colors:active\)/,'Respect forced colors');
assert.match(css,/:focus-visible/,'Keyboard focus remains visible');
assert.match(css,/hover:hover/,'Hover-only enhancements must be device-aware');
assert.match(css,/font-variant-numeric:tabular-nums/,'Clinical numbers remain legible');
assert.match(home,/class="kb-vector-icon"/,'Primary controls should use crisp inline SVGs');
for(const route of ['favorite','docs','about']){
 assert.match(home,new RegExp('data-mobile-nav="'+route+'">\\s*<svg class="kb-vector-icon"'),'Mobile '+route+' should use vector icon');
}
assert.match(home,/function renderNav\(\)\{const navIcons=/);
assert.match(home,/navIcons\[s\]\|\|i/,'Desktop sidebar icons stay vector-based with fallback');
assert.ok(!/https?:\/\//.test(css),'No external UI/font dependencies');
assert.ok(!/\b(?:img|picture)\s*[{.#:\[]/.test(css),'Do not alter image element display or source styling');
for(const forbidden of ['object-fit:','object-position:','image-rendering:','srcset','filter:','background-image:','image-set(','@font-face']){
 assert.ok(!css.includes(forbidden),'No image pixel treatment or remote font-loading via '+forbidden);
}
assert.ok(!/url\(/i.test(css),'No image/font URLs in visual CSS');
assert.ok(!/\.result-warning\s*\{|\.result-errors\s*\{|\.pas-alert-item\s*\{/.test(css),
 'Do not change clinical warning states');
console.log('PASS v0.10.63 Ultra Retina — 17 pages, SVG icons, dark/light, mobile, keyboard focus, image integrity scope, offline cache and no clinical changes');
