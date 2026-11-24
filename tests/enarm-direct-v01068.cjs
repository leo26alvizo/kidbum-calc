'use strict';
/* KidBum ENARM 1.2: 210 standalone original direct theoretical questions.
 * Checks question integrity, educational safety and noninterference with cases. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const codes=['mi','ped','go','cg','urg','mf','sp'];
const areaNames=['Medicina Interna','Pediatría','Ginecología y Obstetricia','Cirugía General','Urgencias','Medicina Familiar','Salud Pública'];
const types=['Conceptos','Mecanismos','Fisiopatología','Criterios diagnósticos','Tratamientos','Alto rendimiento'];
const ctx=vm.createContext({});ctx.window=ctx;
for(const code of codes){
 const path='assets/enarm-direct-'+code+'-v01068.js';
 const js=read(path);
 new vm.Script(js,{filename:path}).runInContext(ctx);
}
new vm.Script(read('assets/enarm-direct-bank-v01068.js'),{filename:'enarm-direct-bank-v01068.js'}).runInContext(ctx);
const bank=ctx.KidBumDirectBank;
assert.ok(bank);
assert.equal(bank.VERSION,'1.2.0');
assert.equal(bank.questionCount,210);
assert.equal(bank.items.length,210);
assert.deepEqual(Array.from(bank.areas),areaNames);
assert.deepEqual(Array.from(bank.types),types);
assert.equal(new Set(bank.items.map(q=>q.id)).size,210);
assert.ok(bank.notes.includes('revisión clínica independiente pendiente'));
const dist=[0,0,0,0],group=Object.create(null),kind=Object.create(null),titles=new Set();
for(const q of bank.items){
 assert.ok(/^dq-(mi|ped|go|cg|urg|mf|sp)-\d{3}$/.test(q.id),'Direct question stable ID');
 assert.ok(areaNames.includes(q.area));
 assert.ok(types.includes(q.type));
 assert.ok(q.prompt.length>=25,'Question must be focused: '+q.id+' '+q.prompt);
 assert.ok(q.prompt.includes('¿')&&q.prompt.includes('?'),'Direct question must be a question: '+q.id);
 assert.ok(q.why.length>=75,'Detailed rationale missing: '+q.id);
 assert.equal(q.options.length,4,'Four options: '+q.id);
 assert.equal(new Set(q.options).size,4,'Discriminating choices: '+q.id);
 assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4);
 assert.ok(q.options[q.correct].length>=4,'Acronyms such as PHQ-2 are valid short correct answers');
 assert.ok(!titles.has(q.prompt),'No duplicate prompts: '+q.id);titles.add(q.prompt);
 assert.ok(!('stem' in q),'No case vignette/stem permitted');
 assert.ok(Array.isArray(q.reading),'Themed readings available');
 for(const ref of q.reading){
  assert.ok(ref.url.startsWith('https://'),'No HTTP or unsupported sources');
  assert.ok(ref.label.length>10);
 }
 group[q.area]=(group[q.area]||0)+1;kind[q.type]=(kind[q.type]||0)+1;dist[q.correct]++;
}
assert.ok(areaNames.every(a=>group[a]===30),'30 questions per clinical specialty');
assert.ok(types.every(a=>kind[a]===35),'35 questions in each of 6 categories');
assert.ok(Math.max(...dist)-Math.min(...dist)<=1,'Balanced A-D correct options');
const page=read('enarm-direct.html'),home=read('enarm.html'),main=read('index.html');
const css=read('assets/enarm-direct-v01068.css'),ui=read('assets/enarm-direct-ui-v01068.js');
const sw=read('sw.js');
assert.match(home,/kidbum-app-version" content="0\.10\.69"/);
assert.match(page,/kidbum-app-version" content="0\.10\.69"/);
assert.match(main,/kidbum-app-version" content="0\.10\.69"/);
assert.match(read('pharma-pro.html'),/kidbum-app-version" content="0\.10\.69"/);
assert.match(read('release-check.js'),/KidBumPublicRelease = '0\.10\.69'/);
assert.match(read('assets/pwa-update-v01060.js'),/const VERSION='0\.10\.69'/);
assert.match(sw,/const RELEASE='0\.10\.69'/);
assert.match(sw,/direct-v01068/);
assert.ok(home.includes('href="./enarm-direct.html"'),'Accessible ENARM direct mode entry');
assert.match(home,/238 preguntas directas/);
assert.match(page,/id="direct-app"/);
assert.match(page,/enarm-ivory-v01067\.css/);
assert.match(page,/enarm-hero-ivory-v01067\.svg/);
const expected=['enarm-direct.html','assets/enarm-direct-v01068.css','assets/enarm-direct-bank-v01068.js','assets/enarm-direct-ui-v01068.js',...codes.map(x=>'assets/enarm-direct-'+x+'-v01068.js')];
for(const asset of expected){
 assert.ok(sw.includes("'./"+asset+"'"),'Atomic offline precache missing: '+asset);
 assert.ok(asset.endsWith('.html')||page.includes('./'+asset),'Direct page must load '+asset);
}
assert.ok(page.indexOf('enarm-direct-sp-v01068.js')<page.indexOf('enarm-direct-bank-v01068.js'));
assert.ok(page.indexOf('enarm-direct-bank-v01068.js')<page.indexOf('enarm-direct-ui-v01068.js'));
assert.match(ui,/kidbum-enarm-direct-progress-v1/);
assert.doesNotMatch(ui,/kidbum-enarm-progress-v1/,'Cases progress must not be overwritten');
assert.match(ui,/radar\.record\(/);
assert.match(ui,/radar\.due\(/);
assert.match(ui,/s\.mode==='exam'/);
assert.match(ui,/function finish\(/);
assert.match(ui,/function question\(/);
assert.match(ui,/function histogram\(/);
assert.match(ui,/id="dq-search"/);
assert.match(ui,/id="dq-area"/);
assert.match(ui,/id="dq-type"/);
assert.match(ui,/data-dq-mode=/);
assert.match(ui,/no reproduce el examen oficial/i);
assert.ok(ui.includes("60 segundos por pregunta"),'Timer explicitly practice only');
new vm.Script(ui,{filename:'enarm-direct-ui-v01068.js'});
for(const forbidden of ['fetch(','XMLHttpRequest','navigator.sendBeacon','localStorage.clear(','document.cookie']){
 assert.ok(!ui.includes(forbidden),'Direct questions must not call network or dangerous storage API: '+forbidden);
}
assert.ok(!/https?:\/\//.test(css),'No new external fonts or images');
assert.match(css,/@media\(max-width:620px\)/);
assert.match(css,/@media\(forced-colors:active\)/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
const pharma='<a href="./pharma-pro.html" class="kb-resource-link">💊 Biblioteca farmacológica · Pharma Pro →</a>';
const shortcut='<a href="./enarm.html" class="kb-resource-link kb-enarm-link">🎓 KidBum ENARM · Casos clínicos →</a>';
assert.ok(main.includes(pharma+shortcut),'ENARM same-size shortcut under Pharma preserved');
const previous=require('../assets/enarm-bank-v01064.js');
assert.equal(previous.caseCount,37,'Case bank unchanged');
assert.equal(previous.questionCount,74,'Existing 74 case questions unchanged');
console.log('PASS 210 direct MCQ: 7 areas × 30, 6 categories × 35, A-D distribution='+dist.join('/'));
console.log('PASS separate saved progress, offline bundle, filters, quiz logic and 37/74 original case preservation.');
