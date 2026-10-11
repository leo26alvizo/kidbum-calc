'use strict';
// KidBum CALC — regression tests (no dependencies).
// Run locally in repo root: node tests/regression.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(x=>x.trim().length>0);
assert.match(html,/assets\/medical-atlas\.js/,'Medical atlas source must be included');
assert.match(html,/Clinical toolkit · v0\.7\.7/,'Atlas release version must be visible');
const swSource=fs.readFileSync('sw.js','utf8');
assert.match(swSource,/navigation=req\.mode==='navigate'/,'Navigation must use fresh HTML first');
assert.match(swSource,/fetch\(req,\{cache:'no-store'\}\)/,'Bypass stale HTTP-cache for HTML and JS');
assert.match(swSource,/caches\.match\(req,\{ignoreSearch:navigation\}\)/,'Navigation must preserve offline fallback');
assert.match(swSource,/kidbum-calc-v077-8category-cards/,'New PWA cache must be distinguishable');
assert.match(swSource,/assets\/escalas-clinicas-portada\.webp/,'Offline PWA must cache clinical-scales plate');
assert.match(swSource,/assets\/hemodinamica-portada\.webp/,'Offline PWA must cache hemodynamic plate');
assert.match(swSource,/assets\/funcion-renal-portada\.webp/,'Offline PWA must cache renal plate');
assert.match(html,/updateViaCache:'none'/,'PWA registration must request fresh worker scripts');
const atlasSource=fs.readFileSync('assets/medical-atlas.js','utf8');
const ids=['anion','osm','bmi','bsa','map','shock','egfr','cg','fib4','qsofa','curb','correctedna','news2','wellsdvt','wellspe','perc','childpugh','agfum','fppfum','fppus','bishop','obshock','gcs'];
for(const id of ids)assert.ok(fs.existsSync('assets/atlas-'+id+'.jpg'),'Missing pictorial clinical illustration: '+id);
for(const art of ['hero','lab','kidney','lungs','brain','liver','obstetrics','vascular'])
  assert.ok(fs.existsSync('assets/atlas-'+art+'.jpg'),'Missing original atlas source: '+art);
assert.match(atlasSource,/assets\/atlas-/,'Atlas library must load local image assets');
assert.ok(fs.existsSync('assets/portada-atlas-usuario.webp'),'Must preserve author-selected anatomical hero');
assert.match(atlasSource,/portada-atlas-usuario\.webp/,'Hero must reference author-selected image');
assert.ok(fs.existsSync('assets/pediatria-portada.webp'),'Missing user-selected Pediatric feature photograph');
assert.ok(fs.existsSync('assets/ginecologia-portada.webp'),'Missing user-selected Ginecology anatomical illustration');
assert.ok(fs.existsSync('assets/quimica-clinica-portada.webp'),'Missing user-selected clinical chemistry photograph');
assert.ok(fs.existsSync('assets/escalas-clinicas-portada.webp'),'Missing author-selected neurological illustration for Clinical Scales');
assert.ok(fs.existsSync('assets/hemodinamica-portada.webp'),'Missing first cardiopulmonary image for Hemodinámica');
assert.ok(fs.existsSync('assets/funcion-renal-portada.webp'),'Missing second anatomical renal image for Función renal');

assert.equal(scripts.length,2,'Two inline JavaScript blocks expected');
const ctx={};ctx.window=ctx;ctx.globalThis=ctx;
for(const kind of ['wfa','lhfa','hcfa','bmifa','wfl','wfh']){
 const path='assets/who-'+kind+'.js';
 assert.ok(fs.existsSync(path),'Missing daily WHO growth data '+kind);
 vm.runInNewContext(fs.readFileSync(path,'utf8'),ctx,{timeout:2000});
}
vm.runInNewContext(fs.readFileSync('assets/pediatric-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/pediatric-ward.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(scripts[0],ctx,{timeout:2000});
const calc=(id,params)=>ctx.KidBumEngine.calculate(id,params);
const t=[
['Original anion gap',()=>assert.equal(calc('anion',{na:140,cl:104,hco3:23}).value,13)],
['Count',()=>assert.equal(ctx.KidBumEngine.list.length,45)],
['Dating 0w0d',()=>assert.equal(calc('agfum',{lmp:'2026-01-01',asof:'2026-01-01'}).display,'0 sem + 0 d')],
['Dating 40w3d',()=>assert.equal(calc('agfum',{lmp:'2026-01-01',asof:'2026-10-11'}).display,'40 sem + 3 d')],
['Date reversed',()=>assert.ok(calc('agfum',{lmp:'2026-10-11',asof:'2026-01-01'}).error)],
['Invalid leap day',()=>assert.ok(calc('agfum',{lmp:'2026-02-29',asof:'2026-03-01'}).error)],
['FPP from LMP',()=>assert.equal(calc('fppfum',{lmp:'2026-01-01'}).display,'08/10/2026')],
['Leap-year FPP',()=>assert.equal(calc('fppfum',{lmp:'2024-01-01'}).display,'07/10/2024')],
['US FPP',()=>assert.equal(calc('fppus',{scan:'2026-03-12',weeks:10,days:0}).display,'08/10/2026')],
['US out-of-range days',()=>assert.ok(calc('fppus',{scan:'2026-03-12',weeks:10,days:7}).error)],
['US fractional weeks',()=>assert.ok(calc('fppus',{scan:'2026-03-12',weeks:10.5,days:0}).error)],
['Bishop 0',()=>assert.equal(calc('bishop',{dilation:'0',effacement:'0',station:'0',consistency:'0',position:'0'}).value,0)],
['Bishop 13',()=>assert.equal(calc('bishop',{dilation:'3',effacement:'3',station:'3',consistency:'2',position:'2'}).value,13)],
['Bishop missing',()=>assert.ok(calc('bishop',{dilation:'3'}).error)],
['Obstetric shock index',()=>assert.equal(calc('obshock',{hr:100,sbp:100}).value,1)],
['Invalid SBP',()=>assert.ok(calc('obshock',{hr:100,sbp:0}).error)],
['NEWS2 regression',()=>assert.equal(calc('news2',{rr:16,spo2:98,sbp:120,hr:70,temp:37,scale:'one',oxygen:'false',conscious:'alert'}).value,0)],
['Creator credit',()=>assert.ok(html.includes('Leonardo Alvizo Velázquez'))],
['ChatGPT handoff',()=>assert.ok(html.includes("window.location.assign('https://chatgpt.com/')"))],
['No paid API call',()=>assert.ok(!html.includes('api.openai.com'))],
['Illustrated calculator card',()=>assert.match(html,/atlas-card-illustration/)],
['Illustrated calculator header',()=>assert.match(html,/atlas-calc-illustration/)],
['Illustrated specialty cards',()=>assert.match(html,/atlas-category-card/)],
['Clinical atlas 23 JPG',()=>assert.equal(ids.length,23)],
['Glasgow touch selection',()=>assert.match(html,/data-gcs-value/)],
['Glasgow still uses underlying select',()=>assert.match(html,/gcs-native-select/)],
['Mobile two-column specialty cards',()=>assert.match(html,/atlas-category-grid\{grid-template-columns:repeat\(2/)],
['Clinical photographs full opacity',()=>assert.match(html,/atlas-category-illustration\{opacity:1!important/)],
['Hero opacity restored',()=>assert.match(html,/atlas-hero-art\{width:53%;opacity:1!important/)],
['Legacy formulas not modified',()=>assert.equal(calc('gcs',{eye:'4',verbal:'5',motor:'6'}).value,15)],
['Pediatric library',()=>assert.match(html,/category:'Pediatría'/)],
['WHO standards loaded',()=>assert.equal(Object.keys(ctx.KidBumGrowthTables).length,6)],
['Growth datasets age boundary',()=>assert.equal(ctx.KidBumGrowthTables.wfa[0].split(';').length,1827)],
['WHO WFA boy median at birth',()=>assert.ok(Math.abs(calc('pedwfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'male',term:'true',weight:3.3464}).value-50)<.001)],
['WHO WFA girl median at birth',()=>assert.ok(Math.abs(calc('pedwfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'female',term:'true',weight:3.2322}).value-50)<.001)],
['WHO LFA boy median at birth',()=>assert.ok(Math.abs(calc('pedlhfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'male',term:'true',stature:49.8842,method:'length'}).value-50)<.001)],
['WHO head circumference boy median at birth',()=>assert.ok(Math.abs(calc('pedhcfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'male',term:'true',head:34.4618}).value-50)<.001)],
['WHO 7 centile reference table',()=>assert.equal(calc('pedwfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'male',term:'true',weight:3.3464}).table.headers.length,7)],
['WHO preterm safeguard',()=>assert.ok(calc('pedwfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'male',term:'false',weight:3.3464}).error)],
['WHO age outside 5 years',()=>assert.ok(calc('pedwfa',{birth:'2019-01-01',asof:'2026-01-01',sex:'male',term:'true',weight:35}).error)],
['WHO height-method validation',()=>assert.ok(calc('pedlhfa',{birth:'2026-01-01',asof:'2026-01-01',sex:'male',term:'true',stature:49.8842,method:'height'}).error)],
['Pediatric urine rate 1 mL/kg/h',()=>assert.equal(calc('pediou',{weight:10,urine:60,hours:6,agegroup:'child'}).value,1)],
['Pediatric urine alarm',()=>assert.match(calc('pediou',{weight:10,urine:10,hours:6,agegroup:'child'}).interpretation,/alarma/)],
['Balance 150 mL',()=>assert.equal(calc('pedbalance',{weight:10,hours:12,iv:500,enteral:100,urine:400,other:50}).value,150)],
['Holliday 15kg 1250 mL/day',()=>assert.equal(calc('pedholliday',{weight:15,ageDays:365}).value,1250)],
['Rule 421 15kg 50 mL/hr',()=>assert.equal(calc('ped421',{weight:15,ageDays:365}).value,50)],
['Holliday excludes neonates',()=>assert.ok(calc('pedholliday',{weight:3,ageDays:5}).error)],
['Neonate day3 range',()=>assert.equal(calc('pedneofluids',{weight:3,day:3}).display,'240–300 mL/d')],
['Age corrected 32wk / 16wk',()=>assert.equal(calc('pedcorrected',{birth:'2026-01-01',asof:'2026-04-23',gaw:32,gad:0}).display,'8 sem + 0 d')],
['Reliable measured weight loss 5%',()=>assert.equal(calc('peddehydration',{prior:10,current:9.5}).value,5)],
['Growth table displayed in UI',()=>assert.match(html,/id="growth-reference"/)],
['Growth module remains offline',()=>assert.ok(!html.includes('cdn.who.int'))],
['Pediatric ward has ten unique calculators',()=>assert.equal(ctx.KidBumWard.ids.length,10)],
['Pediatric BSA reference losses',()=>assert.ok(Math.abs(calc('pedinsensible',{weight:10,height:75,hours:24,ageDays:180}).value-Math.sqrt(750/3600)*350)<.001)],
['Insensible excludes neonates',()=>assert.ok(calc('pedinsensible',{weight:3,height:50,hours:24,ageDays:2}).error)],
['GIR D10 6mlh 3kg',()=>assert.ok(Math.abs(calc('pedgir',{weight:3,rate:6,dextrose:10,group:'term'}).value-10/3)<1e-8)],
['GIR rejects missing weight',()=>assert.ok(calc('pedgir',{weight:0,rate:6,dextrose:10,group:'term'}).error)],
['NaCl 0.9 ideal osm',()=>assert.ok(Math.abs(calc('pedsolutions',{saline:.9,dextrose:0,volume:1000,hours:24,weight:20}).value-308)<1)],
['D5 ideal osm',()=>assert.ok(Math.abs(calc('pedsolutions',{saline:0,dextrose:5,volume:100,hours:12,weight:3}).value-277.54)<.2)],
['NaCl17.7 no access allowed',()=>assert.match(calc('pedsolutions',{saline:17.7,dextrose:0,volume:10,hours:1,weight:3}).interpretation,/NO administrar/)],
['No negative concentration',()=>assert.ok(calc('pedsolutions',{saline:-1,dextrose:5,volume:10,hours:1,weight:3}).error)],
['PALS 2025 infant HR',()=>assert.equal(calc('pedvitals',{ageGroup:'infant'}).table.values[1],'100–180')],
['PALS tables correctly named',()=>assert.equal(calc('pedvitals',{ageGroup:'infant'}).table.title,'Signos vitales de referencia')],
['Formula guidance excludes preterm',()=>assert.ok(calc('pedformulavol',{weight:5,months:3,feeds:6,term:'false'}).error)],
['Formula guidance excludes newborn first week',()=>assert.ok(calc('pedformulavol',{weight:3,months:0,feeds:8,term:'true'}).error)],
['Formula volume 5kg reference',()=>assert.ok(Math.abs(calc('pedformulavol',{weight:5,months:3,feeds:6,term:'true'}).value-826.7)<1)],
['Milk energy 300mL 67kcal100',()=>assert.equal(calc('pedmilkcal',{volume:300,density:67}).value,201)],
['Food 4 4 9',()=>assert.equal(calc('pedfoodcal',{carbs:20,protein:5,fat:10}).value,190)],
['Dose check detects single and daily excess',()=>assert.match(calc('pedmaxverify',{weight:10,dose:150,frequency:4,maxSingle:120,maxDaily:500}).interpretation,/ALERTA/)],
['Dose limits do not autoauthorize',()=>assert.match(calc('pedmaxverify',{weight:10,dose:100,frequency:4,maxSingle:120,maxDaily:500}).interpretation,/NO equivale/)],
['Access review not approval',()=>assert.equal(calc('pedaccess',{context:'highpn'}).display,'Valorar acceso')],
['Infant supplement reference not prescription',()=>assert.match(calc('pedsupp',{months:5,feeding:'breast',preterm:'false'}).interpretation,/no es prescripción/)],
['All previous 35 preserved',()=>assert.equal(ctx.KidBumEngine.list.length-ctx.KidBumWard.ids.length,35)],
['Mobile reference tables',()=>assert.match(html,/res.table.title/)],
['Ward module included',()=>assert.match(html,/assets\/pediatric-ward\.js/)],
['Pediatric feature uses supplied photo',()=>assert.match(html,/src="\.\/assets\/pediatria-portada\.webp"/)],
['Pediatric image renders without blur',()=>assert.match(html,/\.atlas-pediatria-photo\{[\s\S]*?filter:none!important/)],
['Pediatric feature spans mobile category columns',()=>assert.match(html,/atlas-category-card\.atlas-pediatria-feature\{[\s\S]*?grid-column:1\/-1/)],
['Ginecology category uses exact uploaded illustration',()=>assert.match(html,/src="\.\/assets\/ginecologia-portada\.webp"/)],
['Ginecology featured card spans full row',()=>assert.match(html,/atlas-category-card\.atlas-gineco-feature\{[\s\S]*?grid-column:1\/-1/)],
['Ginecology image keeps full opacity and no filter',()=>assert.match(html,/\.atlas-gineco-photo\{[\s\S]*?opacity:1!important;[\s\S]*?filter:none!important/)],
['Clinical chemistry uses provided photo',()=>assert.match(html,/src="\.\/assets\/quimica-clinica-portada\.webp"/)],
['Clinical chemistry matches highlighted card dimensions',()=>assert.match(html,/atlas-quimica-feature/)],
['Clinical chemistry art is unfiltered',()=>assert.match(html,/\.atlas-quimica-photo\{[\s\S]*?filter:none!important;[\s\S]*?opacity:1!important/)],
['Version update check on return',()=>assert.match(html,/visibilitychange/)],
['Do not interrupt active calculations',()=>assert.match(html,/if\(screen!=='calc'\)window\.location\.reload\(\)/)],
['Clinical Scales card uses supplied image',()=>assert.match(html,/src="\.\/assets\/escalas-clinicas-portada\.webp"/)],
['Clinical Scales card matches featured size',()=>assert.match(html,/atlas-escalas-feature/)],
['Clinical Scales image unfiltered',()=>assert.match(html,/\.atlas-escalas-photo\{[\s\S]*?filter:none!important;[\s\S]*?opacity:1!important/)],
['Hemodynamics: first supplied cardiac plate',()=>assert.match(html,/src="\.\/assets\/hemodinamica-portada\.webp"/)],
['Renal: second supplied kidney plate',()=>assert.match(html,/src="\.\/assets\/funcion-renal-portada\.webp"/)],
['Hemodynamics featured rectangle',()=>assert.match(html,/c==='Hemodinámica'\?' atlas-gineco-feature atlas-hemodinamica-feature'/)],
['Renal featured rectangle',()=>assert.match(html,/c==='Función renal'\?' atlas-gineco-feature atlas-renal-feature'/)],
['Hemodynamics has no visual blurring',()=>assert.match(html,/\.atlas-hemodinamica-photo \{[\s\S]*?filter:none!important;/)],
['Renal has no visual blurring',()=>assert.match(html,/\.atlas-renal-photo \{[\s\S]*?filter:none!important;/)],
['Hepatology is full-width featured card',()=>assert.match(html,/c==='Hepatología'\?' atlas-gineco-feature atlas-hepatologia-feature'/)],
['Anthropometry is full-width featured card',()=>assert.match(html,/c==='Antropometría'\?' atlas-gineco-feature atlas-antropometria-feature'/)],
['Both preserve local atlas JPGs',()=>assert.match(html,/\(c==='Hepatología'\|\|c==='Antropometría'\)\?'atlas-category-illustration atlas-gineco-photo'/)],
['Hepatology image is unfiltered',()=>assert.match(html,/\.atlas-hepatologia-feature \.atlas-gineco-photo \{[\s\S]*?filter:none!important;opacity:1!important;/)],
['Anthropometry image is unfiltered',()=>assert.match(html,/\.atlas-antropometria-feature \.atlas-gineco-photo \{[\s\S]*?filter:none!important;opacity:1!important;/)],
['Hepatology imagery cached offline',()=>assert.match(swSource,/'\.\/assets\/atlas-fib4\.jpg'/)],
['Anthropometry imagery cached offline',()=>assert.match(swSource,/'\.\/assets\/atlas-bmi\.jpg'/)]
];
let errors=0;for(const [name,fn] of t){try{fn();console.log('PASS',name)}catch(e){errors++;console.error('FAIL',name,e.message)}}
if(errors){console.error('Failed:',errors);process.exitCode=1;}else console.log(t.length,'checks passed');
