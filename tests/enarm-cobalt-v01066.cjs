'use strict';
/* KidBum ENARM 0.10.66: rich visual refresh must preserve clinical study logic. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const home=read('index.html'),enarm=read('enarm.html');
const css=read('assets/enarm-cobalt-v01066.css'),art=read('assets/enarm-hero-v01066.svg');
const ui=read('assets/enarm-ui-v01064.js'),sw=read('sw.js');
const bank=require('../assets/enarm-bank-v01064.js');
const radar=require('../assets/enarm-radar-v01065.js');
assert.equal(bank.caseCount,37);
assert.equal(bank.questionCount,74);
assert.equal(bank.areas.length,7);
assert.equal(radar.INTERVALS.length,6);
assert.match(enarm,/meta name="kidbum-app-version" content="0\.10\.66"/);
assert.match(home,/kidbum-app-version" content="0\.10\.66"/);
assert.match(read('pharma-pro.html'),/kidbum-app-version" content="0\.10\.66"/);
assert.match(read('release-check.js'),/KidBumPublicRelease = '0\.10\.66'/);
assert.match(read('assets/pwa-update-v01060.js'),/const VERSION='0\.10\.66'/);
assert.match(sw,/const RELEASE='0\.10\.66'/);
assert.match(sw,/cobalt-v01066/,'Versioned atomic cache identity');
for(const p of ['assets/enarm-cobalt-v01066.css','assets/enarm-hero-v01066.svg']){
 assert.ok(sw.includes("'./"+p+"'"),'New visuals must be precached for offline use: '+p);
 assert.ok(enarm.includes('./'+p),'ENARM page must load visual asset: '+p);
}
assert.ok(enarm.indexOf('enarm-cobalt-v01066.css')>enarm.indexOf('enarm-radar-v01065.css'),'Visual CSS should override legacy theme last');
assert.match(enarm,/class="en-hero-art"/);
assert.match(enarm,/class="en-intro-content"/);
assert.match(enarm,/Modo <span>ENARM<\/span>/);
assert.match(enarm,/Casos clínicos/);
assert.match(art,/<svg[^>]+viewBox="0 0 1400 740"/);
assert.match(art,/<linearGradient id="sky"/);
assert.match(art,/gold.*lion|gold lion/i);
assert.match(art,/path d="M120 24L103/,'Lion is drawn as actual path geometry');
assert.match(art,/<path d="M0 0H1400V6H0Z"/);
assert.ok(art.length<32000,'Portable vector illustration must be lightweight');
assert.match(css,/#0750B9|#085ea7|#0868e4/i,'Premium royal-blue accents are present');
assert.match(css,/\.en-hero-art\s*\{/);
assert.match(css,/\.en-mode\[data-mode="study"\]::before/);
assert.match(css,/\.en-mode\[data-mode="exam"\]::before/);
assert.match(css,/\.en-mode\[data-mode="weak"\]::before/);
assert.match(css,/\.en-mode\[data-mode="due"\]::before/);
for(const ref of ['atlas-brain.jpg','atlas-heart.jpg','atlas-shock.jpg','atlas-lungs.jpg']){
 assert.ok(css.includes(ref),'Decorative medical study artwork should use existing local image: '+ref);
 assert.ok(sw.includes("'./assets/"+ref+"'"),'Medical artwork must be cached offline: '+ref);
}
assert.match(css,/@media\(max-width:580px\)/);
assert.match(css,/@media\(max-width:355px\)/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.match(css,/@media\(forced-colors:active\)/);
assert.match(css,/:focus-visible/);
assert.match(ui,/function enIcon\(name\)/);
assert.match(ui,/const areaIcon=/);
assert.match(ui,/const caseArt=/);
assert.match(ui,/class="en-mode-icon"/);
assert.match(ui,/class="en-area-icon"/);
assert.match(ui,/class="en-case-img"/);
assert.match(ui,/class="en-stat-icon"/);
assert.match(ui,/radar\.record\(history\[step\.key\]/,'Spaced repetition state change remains the existing one');
assert.match(ui,/kidbum-enarm-progress-v1/,'Existing local history key remains untouched');
new vm.Script(ui,{filename:'assets/enarm-ui-v01064.js'});
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.clear(','navigator.sendBeacon']){
 assert.ok(!ui.includes(forbidden),'A visual refresh cannot add network or destructive data APIs: '+forbidden);
}
const pharma='<a href="./pharma-pro.html" class="kb-resource-link">💊 Biblioteca farmacológica · Pharma Pro →</a>';
const shortcut='<a href="./enarm.html" class="kb-resource-link kb-enarm-link">🎓 KidBum ENARM · Casos clínicos →</a>';
assert.ok(home.includes(pharma+shortcut),'Equal-size ENARM quick link remains below Pharma Pro');
console.log('PASS v0.10.66: original lion vector portada, cobalt, 4 image-backed study cards, seven specialty icons, offline assets, safe history and stable study engine');
