'use strict';
/* KidBum ENARM 1.0: static integrity and educational safety regression. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const bank=require('../assets/enarm-bank-v01064.js');
const read=path=>fs.readFileSync(path,'utf8');
const home=read('index.html'),ui=read('assets/enarm-ui-v01064.js');
const enarm=read('enarm.html'),css=read('assets/enarm-v01064.css');
const entry=read('assets/enarm-entry-v01064.css'),sw=read('sw.js');
const publicVersion=read('release-check.js'),updater=read('assets/pwa-update-v01060.js');
assert.equal(bank.caseCount,37);
assert.equal(bank.questionCount,74);
assert.equal(bank.areas.length,7);
assert.equal(new Set(bank.cases.map(c=>c.id)).size,37,'No duplicate cases');
assert.ok(bank.disclaimer.includes('revisión clínica independiente pendiente'),'Editorial status remains honest');
assert.ok(bank.disclaimer.includes('No son preguntas oficiales'),'No false affiliation');
const areas=new Set(bank.areas),distribution=[0,0,0,0];
for(const c of bank.cases){
 assert.ok(areas.has(c.area),'Case has official-area grouping');
 assert.equal(c.questions.length,2,'CIFRHS case format (2 questions here)');
 assert.ok(c.stem.length>80,'Case must contain meaningful clinical context');
 assert.ok(c.source?.url?.startsWith('https://'),'Each case has a readable suggested source');
 assert.ok(c.source?.label?.length>4);
 for(const q of c.questions){
  assert.equal(q.options.length,4,'Four answer choices');
  assert.equal(new Set(q.options).size,4,'Choices must be distinguishable');
  assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4,'Exactly one valid correct index');
  assert.ok(q.prompt.length>18,'Meaningful discriminating prompt');
  assert.ok(q.why.length>45,'Meaningful clinical rationale');
  distribution[q.correct]++;
 }
}
assert.ok(distribution.every(count=>count>=7),'Answers should be reasonably distributed among A/B/C/D: '+distribution);
assert.match(enarm,/assets\/enarm-bank-v01064\.js/);
assert.match(enarm,/assets\/enarm-ui-v01064\.js/);
assert.match(enarm,/assets\/enarm-v01064\.css/);
assert.match(enarm,/id="enarm-app"/);
assert.match(home,/kidbum-app-version" content="0\.10\.73"/);
assert.match(enarm,/kidbum-app-version" content="0\.10\.73"/);
assert.match(publicVersion,/KidBumPublicRelease = '0\.10\.73'/);
assert.match(updater,/const VERSION='0\.10\.73'/);
assert.match(sw,/const RELEASE='0\.10\.73'/);
assert.match(sw,/enarm-v01064-radar-v01065-cobalt-v01066-ivory-v01067-direct-v01068-enarm-visual-radar-v01069-clinical-images-v01070-centor-v01071-enarm-visual-expansion-v01072-otoscopy-v01073'/,'Atomic offline cache identifier must include ENARM 1.1');
for(const file of ['enarm.html','assets/enarm-entry-v01064.css','assets/enarm-v01064.css','assets/enarm-bank-v01064.js','assets/enarm-ui-v01064.js']){
 assert.ok(sw.includes("'./"+file+"'"),'Offline precache must include '+file);
}
const pharma='<a href="./pharma-pro.html" class="kb-resource-link">💊 Biblioteca farmacológica · Pharma Pro →</a>';
const newLink='<a href="./enarm.html" class="kb-resource-link kb-enarm-link">🎓 KidBum ENARM · Casos clínicos →</a>';
assert.ok(home.includes(pharma+newLink),'ENARM access immediately below Pharma Pro with same button base class');
assert.match(entry,/\.kb-resource-links:has\(\.kb-enarm-link\)/);
assert.match(entry,/grid-template-columns:minmax\(0,1fr\)/);
assert.match(entry,/width:100%/,'Both buttons should have equal width');
assert.match(home,/id:'enarm',title:'KidBum ENARM/,'ENARM indexed by quick search');
assert.match(ui,/kidbum-enarm-progress-v1/,'Private local progress');
assert.match(ui,/localStorage\.setItem/);
assert.match(ui,/session\.answers|s\.answers|answers:Array/,'Answers stored for session');
assert.match(ui,/function finishSession/);
assert.match(ui,/function tick/);
assert.match(ui,/function record/);
assert.match(ui,/s\.mode==='exam'/);
assert.match(ui,/s\.revealed\.has/);
assert.match(ui,/ni se envían respuestas a servidores/i);
assert.match(css,/@media\(max-width:650px\)/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.match(css,/:focus-visible/);
for(const forbidden of ['XMLHttpRequest','navigator.sendBeacon','fetch(','localStorage.clear(','window.location.reload(']){
 assert.ok(!ui.includes(forbidden),'ENARM UI must not perform networking or destructive storage actions: '+forbidden);
}
console.log('PASS ENARM 1.1: 37 original cases, 74 questions, seven areas, sources, local progress, linked same-size shortcut, privacy and offline integrity. Answer distribution: '+distribution.join('/'));
