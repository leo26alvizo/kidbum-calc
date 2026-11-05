'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const read=x=>fs.readFileSync(x,'utf8');
const page=read('pediatria-evaluacion-rapida.html'),home=read('index.html');
const core=read('assets/pediatria-rapid-core.js'),ui=read('assets/pediatria-rapid-ui.js');
const css=read('assets/pediatria-rapid-v01039.css'),sw=read('sw.js');
new vm.Script(core);new vm.Script(ui);
const ctx={};ctx.globalThis=ctx;vm.runInNewContext(core,ctx,{timeout:2000});
const e=ctx.KidBumPediatricRapid;assert.ok(e);
const normal={apariencia:'normal',respiracion:'normal',circulacion:'normal'};
assert.equal(e.tep({}).ready,false,'No assume missing PAT observations normal');
assert.equal(e.tep(normal).pattern,'Sin alteraciones evidentes en el TEP');
const patterns={
 'normal,alterada,normal':'Patrón de dificultad respiratoria',
 'alterada,alterada,normal':'Patrón de posible falla respiratoria',
 'normal,normal,alterada':'Patrón compatible con choque compensado',
 'alterada,normal,alterada':'Patrón compatible con choque descompensado',
 'alterada,normal,normal':'Posible disfunción neurológica o metabólica',
 'normal,alterada,alterada':'Patrón mixto respiratorio y circulatorio',
 'alterada,alterada,alterada':'Patrón de posible falla cardiopulmonar'
};
for(const [key,expected] of Object.entries(patterns)){
 const [apariencia,respiracion,circulacion]=key.split(',');
 assert.equal(e.tep({apariencia,respiracion,circulacion}).pattern,expected,key);
}
assert.equal(e.tep({apariencia:'n/a',respiracion:'normal',circulacion:'normal'}).ready,false);
const zero={sibilancias:0,tiraje:0,fr:0,fc:0,ventilacion:0,cianosis:0};
assert.equal(e.wood({}).ready,false);
assert.equal(e.wood(zero).value,0);
assert.equal(e.wood(zero).grade,'Sin hallazgos puntuables');
assert.equal(e.wood({...zero,sibilancias:3}).grade,'Leve');
assert.equal(e.wood({...zero,sibilancias:3,tiraje:2}).grade,'Moderada');
assert.equal(e.wood({...zero,sibilancias:3,tiraje:3,fr:2}).grade,'Grave');
assert.equal(e.wood({sibilancias:3,tiraje:3,fr:3,fc:1,ventilacion:3,cianosis:1}).value,14);
assert.equal(e.wood({...zero,cianosis:1}).urgency,'critica','Cyanosis trumps low score');
assert.equal(e.wood({...zero,ventilacion:3}).urgency,'critica','Silent chest trumps low score');
assert.equal(e.wood({...zero,ventilacion:2}).urgency,'urgente');
assert.equal(e.wood({...zero,fc:2}).ready,false,'Invalid points must block calculation');
assert.equal(e.wood({...zero,fr:null}).ready,false,'Missing vital range must not coerce to 0');
assert.equal(e.kramer({}).ready,false);
assert.equal(e.kramer({zona:5}).area,'Palmas y plantas');
assert.equal(e.kramer({zona:0}).urgency,'revalorar');
assert.equal(e.kramer({zona:1,primeras24:true}).urgency,'critica');
assert.equal(e.kramer({zona:3,neurologico:true}).urgency,'critica');
assert.ok(e.kramer({zona:5}).alerts.length>=1);
for(let i=0;i<=5;i++)assert.equal(e.kramer({zona:i}).ready,true);
assert.doesNotMatch(core,/fototerapia.+(?:iniciar|ordenar)|mg\/dL\s*=|doseMgKg/);
for(const id of ['tep','wood','kramer'])assert.ok(page.includes('id="'+id+'"'),id);
for(const path of ['pediatria-evaluacion-rapida.html','assets/pediatria-rapid-core.js','assets/pediatria-rapid-ui.js','assets/pediatria-rapid-v01039.css'])
 assert.ok(sw.includes("'./"+path+"'"),'Missing offline asset '+path);
for(const code of ['pediatrictep','woodferres','kramer'])assert.ok(home.includes("id:'"+code+"'"),code);
for(const hash of ['#tep','#wood','#kramer'])assert.ok(home.includes("pediatria-evaluacion-rapida.html"+hash));
assert.match(home,/content="0\.10\.46"/);
assert.match(page,/content="0\.10\.41"/);
assert.match(sw,/pediatria-rapid-v01039/);
const imageBytes=fs.readFileSync('assets/kramer-bebe-referencia-v01040.jpg');
assert.equal(imageBytes.length,174636,'Original user image bytes preserved');
assert.equal(crypto.createHash('sha256').update(imageBytes).digest('hex'),'0bda95a511a1d9deb6563f5da42a8ea17451498ef8e047171e6b5520f6e5cfe2','Original image must be byte-identical');
assert.ok(imageBytes.subarray(0,3).equals(Buffer.from([255,216,255])),'Original image has JPEG magic bytes');
assert.match(page,/src="\.\/assets\/kramer-bebe-referencia-v01040\.jpg" width="1229" height="1536"/);
assert.match(page,/viewBox="0 0 1229 1536"/);
assert.equal((page.match(/class="zone" data-zone="[1-5]"/g)||[]).length,5);
for(let zone=1;zone<=5;zone++)assert.match(page,new RegExp('class="zone" data-zone="'+zone+'" role="button" tabindex="0" aria-pressed="false"'));
assert.match(css,/kramer-image-stage/);
assert.match(css,/\.kramer-hotspot/);
assert.ok(sw.includes("'./assets/kramer-bebe-referencia-v01040.jpg'"),'Original image is available offline');
assert.match(css,/@media\(max-width:740px\)/);
assert.match(css,/html\.dark/);
assert.doesNotMatch(ui,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|api\.openai\.com/,'No clinical telemetry');
assert.doesNotMatch(core,/\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage/,'Pure engine');
console.log('Pediatric rapid triad PASS: 3 scales, 8 PAT patterns, 0–14 Ferrés, urgent overrides, Kramer warnings, offline and no patient telemetry.');
