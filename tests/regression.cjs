'use strict';
// KidBum CALC — regression tests (no dependencies).
// Run locally in repo root: node tests/regression.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(x=>x.trim().length>0);
assert.match(html,/assets\/medical-atlas\.js/,'Medical atlas source must be included');
assert.match(html,/<meta name="kidbum-app-version" content="0\.10\.37" \/>/,'Release version is defined centrally');
assert.match(html,/Clinical toolkit · v<span class="kidbum-version"><\/span>/,'Sidebar version comes from release metadata');
assert.match(html,/KidBum CALC <b class="kidbum-version"><\/b>/,'Footer version comes from release metadata');
assert.match(html,/KidBum CALC <strong>\$\{enc\(APP_VERSION\)\}<\/strong>/,'About version comes from release metadata');
assert.ok(!html.includes('KidBum CALC 0.10.3'),'About must not show an obsolete release');
assert.ok(!html.includes('Descarga el archivo ZIP'),'Install guide must match the live hosted PWA');
assert.match(html,/id="check-kidbum-update"/,'About offers an update action');
assert.match(html,/registration\.update\(\)/,'Update action checks current service worker');
const swSource=fs.readFileSync('sw.js','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
assert.equal(manifest.icons[0].src,'kidbum-icon-192-v081.png');
assert.equal(manifest.icons[1].src,'kidbum-icon-512-v081.png');
for(const path of manifest.icons.map(x=>x.src)) {
 assert.ok(fs.existsSync(path),'Missing app icon: '+path);
 assert.ok(swSource.includes("'./"+path+"'"),'PWA must precache icon '+path);
}
assert.match(html,/kidbum-icon-192-v081\.png/,'Browser icon must be the original author image');
assert.match(swSource,/const isShell=/,'App shell requests must be identified explicitly');
assert.match(swSource,/const cached=await cache\.match\(key,\{ignoreSearch:isShell\}\)/,'Cached HTML and JS must be used before fetching');
assert.match(swSource,/function fetchWithDeadline\(/,'Uncached network requests must have a timeout');
assert.match(swSource,/kidbum-calc-v01022-seven-clinical-scores/,'New PWA cache must be distinguishable');
assert.match(swSource,/assets\/escalas-clinicas-portada\.webp/,'Offline PWA must cache clinical-scales plate');
assert.match(swSource,/assets\/hemodinamica-portada\.webp/,'Offline PWA must cache hemodynamic plate');
assert.match(swSource,/assets\/funcion-renal-portada\.webp/,'Offline PWA must cache renal plate');
assert.match(html,/updateViaCache:'none'/,'PWA registration must request fresh worker scripts');
const pediatricPlateIds=['pedwfa','pedlhfa','pedhcfa','pedbmifa','pedwfl','pediou','pedbalance','pedholliday','ped421','pedneofluids','pedcorrected','peddehydration','pedinsensible','pedgir','pedsolutions','pedvitals','pedformulavol','pedmilkcal','pedfoodcal','pedmaxverify','pedaccess','pedsupp'];
for(const id of pediatricPlateIds){
 const plate='assets/pediatric/'+id+'.webp';
 assert.ok(fs.existsSync(plate),'Missing Pediatric illustrated image: '+id);
 assert.ok(swSource.includes("'./"+plate+"'"),'PWA must precache Pediatric image '+id);
}
assert.equal(pediatricPlateIds.length,22,'Every Pediatric calculator has artwork');
const atlasSource=fs.readFileSync('assets/medical-atlas.js','utf8');
const atlasGlobal={};
vm.runInNewContext(atlasSource,{globalThis:atlasGlobal,window:atlasGlobal},{timeout:2000});
assert.ok(atlasGlobal.KidBumAtlas,'Atlas library should initialize');
for(const id of pediatricPlateIds){
 const markup=atlasGlobal.KidBumAtlas.img(id);
 assert.ok(markup.includes('./assets/pediatric/'+id+'.webp'),'Use individualized WebP image '+id);
 assert.ok(markup.includes("window.KidBumAtlas.src('"+id+"')"),'Keep vector backup '+id);
}

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

assert.ok(scripts.length>=2,'Clinical engine and main application inline scripts must be present');
const ctx={};ctx.window=ctx;ctx.globalThis=ctx;
for(const kind of ['wfa','lhfa','hcfa','bmifa','wfl','wfh']){
 const path='assets/who-'+kind+'.js';
 assert.ok(fs.existsSync(path),'Missing daily WHO growth data '+kind);
 vm.runInNewContext(fs.readFileSync(path,'utf8'),ctx,{timeout:2000});
}
vm.runInNewContext(fs.readFileSync('assets/pediatric-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/pediatric-ward.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/hospital-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/advanced-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/neurology-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/neurology-advanced.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/cardiology-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/critical-module.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(fs.readFileSync('assets/critical-advanced.js','utf8'),ctx,{timeout:2000});
vm.runInNewContext(scripts[0],ctx,{timeout:2000});
/* These historical preservation tests predate two new APACHE II calculators.
   Check the original 68 separately AND verify both new IDs exist. */
const clinicalIds=ctx.KidBumEngine.list;
assert.equal(clinicalIds.length,84,'Total actual: 77 existing tools plus seven new scores and clinical references');
assert.ok(clinicalIds.includes('apache2')&&clinicalIds.includes('apache2quick'),'Both APACHE modes present');
const newElectrolyteIds=['nadeficit','freewater','correctedca','osmgap','potassiumreview','bicarbdef'];
for(const id of newElectrolyteIds)assert.ok(clinicalIds.includes(id),'New electrolyte engine must be present: '+id);
assert.ok(clinicalIds.includes('urineoutputadult'),'Adult urine output must be available in renal section');
const newClinicalImageIds=['sofa1','psiport','parklandburn','aldrete','apgar','devineibw','pedmathdose'];
for(const id of newClinicalImageIds)assert.ok(clinicalIds.includes(id),'New reference present: '+id);
const legacyCalculatorCount=clinicalIds.filter(id=>!['apache2','apache2quick','urineoutputadult',...newElectrolyteIds,...newClinicalImageIds].includes(id)).length;
assert.equal(legacyCalculatorCount,68,'Original 68 calculator IDs preserved');

const calc=(id,params)=>ctx.KidBumEngine.calculate(id,params);
const t=[
['Original anion gap',()=>assert.equal(calc('anion',{na:140,cl:104,hco3:23}).value,13)],
['Count',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length),63)],
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
['Creator credit',()=>assert.ok(html.includes('Teniente Pasante de Medicina Leonardo Alvizo Velázquez'))],
['Cover main title',()=>assert.ok(html.includes('atlas-hero-main">Calculadora Médica</span> <span class="atlas-hero-tagline">Integral</span>'))],
['Manifest creator',()=>assert.ok(manifest.description.includes('Teniente Pasante de Medicina Leonardo Alvizo Velázquez'))],
['Creator across page',()=>assert.equal(html.split('Teniente Pasante de Medicina Leonardo Alvizo Velázquez').length-1,6)],
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
['All previous 35 preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumWard.ids.length-ctx.KidBumHospital.ids.length-ctx.KidBumAdvanced.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,35)],
['Mobile reference tables',()=>assert.match(html,/res.table.title/)],
['Ward module preserved and bundled',()=>assert.ok(fs.existsSync('assets/pediatric-ward.js')&&html.includes('src="./assets/startup-bundle.js"'))],
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
['Never reload on background update or first install',()=>assert.ok(html.includes('const initiallyControlled=Boolean(navigator.serviceWorker.controller)')&&!/controllerchange[\s\S]{0,260}window\.location\.reload\(\)/.test(html))],
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
['Anthropometry imagery cached offline',()=>assert.match(swSource,/'\.\/assets\/atlas-bmi\.jpg'/)],
['Pediatrics pictorial WebP artwork count',()=>assert.equal(pediatricPlateIds.length,22)],
['Pediatric graphic remains crisp',()=>assert.match(html,/img\[src\*="\/pediatric\/"\][\s\S]*?filter:none!important/)],
['Pediatric WHO data preserved',()=>assert.equal(ctx.KidBumGrowthTables.wfa[0].split(';').length,1827)]
];
const expansionTests=[
['Hospital offline module',()=>assert.ok(swSource.includes('./assets/hospital-module.js'))],
['Hospital module in startup bundle',()=>assert.ok(fs.existsSync('assets/hospital-module.js')&&html.includes('<script src="./assets/startup-bundle.js"></script>'))],
['Hospital module IDs',()=>assert.equal(ctx.KidBumHospital.ids.length,4)],
['Winter bicarbonate 12',()=>assert.equal(calc('winter',{hco3:12}).value,26)],
['Winter respiratory acidosis warning',()=>assert.ok(calc('winter',{hco3:12,paco2:40}).interpretation.includes('acidosis respiratoria'))],
['Winter respiratory alkalosis warning',()=>assert.ok(calc('winter',{hco3:12,paco2:20}).interpretation.includes('alcalosis respiratoria'))],
['Winter valid compensation',()=>assert.ok(calc('winter',{hco3:12,paco2:26}).interpretation.includes('dentro del intervalo'))],
['Winter no metabolic acidosis',()=>assert.ok(calc('winter',{hco3:24}).error)],
['Winter invalid PaCO2',()=>assert.ok(calc('winter',{hco3:12,paco2:'error'}).error)],
['Delta ratio 1.2',()=>assert.ok(Math.abs(calc('deltaratio',{ag:24,hco3:14,agref:12,hcoref:24}).value-1.2)<1e-9)],
['Delta non elevated gap',()=>assert.ok(calc('deltaratio',{ag:10,hco3:14,agref:12,hcoref:24}).error)],
['Delta zero denominator',()=>assert.ok(calc('deltaratio',{ag:24,hco3:24,agref:12,hcoref:24}).error)],
['Delta low ratio warning',()=>assert.ok(calc('deltaratio',{ag:18,hco3:10,agref:12,hcoref:24}).interpretation.includes('brecha normal'))],
['Delta high ratio warning',()=>assert.ok(calc('deltaratio',{ag:45,hco3:17,agref:12,hcoref:24}).interpretation.includes('alcalosis metabólica'))],
['FeNa reference',()=>assert.ok(Math.abs(calc('fena',{una:20,pna:140,ucr:80,pcr:2,diuretics:'false'}).value-0.35714285714285715)<1e-9)],
['FeNa zero urine creatinine',()=>assert.ok(calc('fena',{una:20,pna:140,ucr:0,pcr:2,diuretics:'false'}).error)],
['FeNa missing diuretic status',()=>assert.ok(calc('fena',{una:20,pna:140,ucr:80,pcr:2}).error)],
['FeUrea reference',()=>assert.equal(calc('feurea',{ureaU:300,ureaP:40,ucr:80,pcr:2,ureaunit:'urea_mgdl',diuretics:'false'}).value,18.75)],
['FeUrea unit required',()=>assert.ok(calc('feurea',{ureaU:300,ureaP:40,ucr:80,pcr:2,diuretics:'false'}).error)],
['FeUrea no zero denominator',()=>assert.ok(calc('feurea',{ureaU:300,ureaP:0,ucr:80,pcr:2,ureaunit:'urea_mgdl',diuretics:'false'}).error)],
['FeUrea BUN consistent',()=>assert.equal(calc('feurea',{ureaU:300,ureaP:40,ucr:80,pcr:2,ureaunit:'bun_mgdl',diuretics:'false'}).value,18.75)],
['Hospital reference visible',()=>assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/37384888/'))],
['Original 45 preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumHospital.ids.length-ctx.KidBumAdvanced.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,45)]
];
t.push(...expansionTests);

const advancedTests=[
['Advanced module loaded via core bundle',()=>assert.ok(html.includes('assets/startup-bundle.js'))],
['Advanced module cached offline',()=>assert.ok(swSource.includes('./assets/advanced-module.js'))],
['Advanced module three tools',()=>assert.equal(ctx.KidBumAdvanced.ids.length,3)],
['58 calculators in engine',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length),63)],
['Cardiology category',()=>assert.ok(html.includes("'Cardiología'"))],
['Gastroenterology category',()=>assert.ok(html.includes("'Gastroenterología'"))],
['New categories shown on home page',()=>assert.ok(html.includes("'Cardiología','Gastroenterología'"))],
['QTc Fridericia at HR60',()=>assert.equal(calc('qtc',{qt:400,hr:60,rhythm:'regular',qrs:'narrow'}).value,400)],
['QTc Bazett shown',()=>assert.ok(calc('qtc',{qt:400,hr:60,rhythm:'regular',qrs:'narrow'}).interpretation.includes('Bazett 400.0'))],
['QTc at HR100',()=>assert.ok(Math.abs(calc('qtc',{qt:400,hr:100,rhythm:'regular',qrs:'narrow'}).value-400/Math.cbrt(.6))<1e-9)],
['QTc irregular blocked',()=>assert.ok(calc('qtc',{qt:400,hr:60,rhythm:'irregular',qrs:'narrow'}).error)],
['QTc wide QRS alert',()=>assert.ok(calc('qtc',{qt:400,hr:60,rhythm:'regular',qrs:'wide'}).notes.some(n=>n.includes('JT')))],
['QTc >=500 warning',()=>assert.ok(calc('qtc',{qt:600,hr:60,rhythm:'regular',qrs:'narrow'}).notes.some(n=>n.includes('500')))],
['QTc blank QT rejected',()=>assert.ok(calc('qtc',{qt:'',hr:60,rhythm:'regular',qrs:'narrow'}).error)],
['QTc missing rhythm rejected',()=>assert.ok(calc('qtc',{qt:400,hr:60,qrs:'narrow'}).error)],
['RCRI 0',()=>assert.equal(calc('rcri',{surgery:'false',ischemia:'false',hf:'false',cvd:'false',insulin:'false',scr:1}).value,0)],
['RCRI renal threshold',()=>assert.equal(calc('rcri',{surgery:'false',ischemia:'false',hf:'false',cvd:'false',insulin:'false',scr:2}).value,1)],
['RCRI renal below threshold',()=>assert.equal(calc('rcri',{surgery:'false',ischemia:'false',hf:'false',cvd:'false',insulin:'false',scr:1.99}).value,0)],
['RCRI all six',()=>assert.equal(calc('rcri',{surgery:'true',ischemia:'true',hf:'true',cvd:'true',insulin:'true',scr:2}).value,6)],
['RCRI missing field',()=>assert.ok(calc('rcri',{surgery:'false',ischemia:'false',hf:'false',cvd:'false',scr:2}).error)],
['Previous 49 preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumAdvanced.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,49)]
];
const gbsBase={ureaunit:'urea_mmoll',urea:5,hb:14,hbsex:'male',sbp:120,hr:80,melena:'false',syncope:'false',liver:'false',hf:'false'};
advancedTests.push(['GBS zero',()=>assert.equal(calc('gbs',gbsBase).value,0)]);
for(const [field,value,score] of [['urea',6.5,2],['urea',8,3],['urea',10,4],['urea',25,6],['hb',12,1],['hb',11.9,3],['hb',9.9,6],['sbp',100,1],['sbp',90,2],['sbp',89,3],['hr',100,1]]){
 advancedTests.push(['GBS boundary '+field+' '+value,()=>assert.equal(calc('gbs',{...gbsBase,[field]:value}).value,score)]);
}
for(const [field,score] of [['melena',1],['syncope',2],['liver',2],['hf',2]]){
 advancedTests.push(['GBS clinical point '+field,()=>assert.equal(calc('gbs',{...gbsBase,[field]:'true'}).value,score)]);
}
advancedTests.push(
['GBS woman Hb11.9',()=>assert.equal(calc('gbs',{...gbsBase,hbsex:'female',hb:11.9}).value,1)],
['GBS woman Hb12',()=>assert.equal(calc('gbs',{...gbsBase,hbsex:'female',hb:12}).value,0)],
['GBS BUN conversion',()=>assert.equal(calc('gbs',{...gbsBase,ureaunit:'bun_mgdl',urea:6.5*2.80134}).value,2)],
['GBS urea mg/dL conversion',()=>assert.equal(calc('gbs',{...gbsBase,ureaunit:'urea_mgdl',urea:8*6.006}).value,3)],
['GBS 23 maximum',()=>assert.equal(calc('gbs',{...gbsBase,urea:30,hb:8,sbp:80,hr:120,melena:'true',syncope:'true',liver:'true',hf:'true'}).value,23)],
['GBS missing melena',()=>assert.ok(calc('gbs',{...gbsBase,melena:''}).error)],
['GBS no automatic discharge',()=>assert.ok(calc('gbs',gbsBase).interpretation.includes('no equivale a indicación automática'))],
['GBS contributions visible',()=>assert.ok(calc('gbs',gbsBase).detail.includes('PAS'))],
['New medical sources displayed',()=>assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/33929377/'))]
);
t.push(...advancedTests);
const cardiologiaTests=[
 ['Original Cardiology image is present',()=>assert.ok(fs.existsSync('assets/cardiologia-portada.jpg'))],
 ['Original Cardiology image available offline',()=>assert.ok(swSource.includes("'./assets/cardiologia-portada.jpg'"))],
 ['Cardiology category has identical full width card dimensions',()=>assert.ok(html.includes("c==='Cardiología'?' atlas-gineco-feature atlas-cardiologia-feature'"))],
 ['Cardiology category uses supplied JPEG',()=>assert.ok(html.includes('src="./assets/cardiologia-portada.jpg"'))],
 ['Cardiology image shares photo class of other cards',()=>assert.ok(html.includes('atlas-gineco-photo atlas-cardiologia-photo'))],
 ['Cardiology preserves no filter and full opacity',()=>assert.match(html,/\.atlas-cardiologia-feature \.atlas-cardiologia-photo\{[\s\S]*?filter:none!important/)],
 ['All previous 52 calculators preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,52)]
];
t.push(...cardiologiaTests);

const gastroCardTests=[
 ['Gastroenterology card uses full-width featured layout',()=>assert.ok(html.includes("c==='Gastroenterología'?' atlas-gineco-feature atlas-gastro-feature'"))],
 ['Gastroenterology preserves original atlas photo mapping',()=>assert.equal(atlasGlobal.KidBumAtlas.categoryMap['Gastroenterología'],'childpugh')],
 ['Gastroenterology preserves existing local raster image',()=>assert.ok(atlasGlobal.KidBumAtlas.img('childpugh','atlas-category-illustration atlas-gineco-photo atlas-gastro-photo').includes('./assets/atlas-childpugh.jpg'))],
 ['Gastroenterology card has shared photo class',()=>assert.ok(html.includes('class="atlas-category-illustration atlas-gineco-photo atlas-gastro-photo"'))],
 ['Gastroenterology image remains unfiltered',()=>assert.match(html,/\.atlas-gastro-feature \.atlas-gastro-photo \{[\s\S]*?filter:none!important/)],
 ['Gastroenterology retains previous 52 calculators',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,52)],
 ['Existing gastrointestinal raster remains offline cached',()=>assert.ok(swSource.includes("'./assets/atlas-childpugh.jpg'"))]
];
t.push(...gastroCardTests);
const gastroPhotoTests=[
 ['Original Gastroenterology author photo exists',()=>assert.ok(fs.existsSync('assets/gastroenterologia-portada.webp'))],
 ['Gastroenterology photo referenced directly',()=>assert.ok(html.includes('src="./assets/gastroenterologia-portada.webp"'))],
 ['Gastroenterology remains full-width featured',()=>assert.ok(html.includes("c==='Gastroenterología'?' atlas-gineco-feature atlas-gastro-feature'"))],
 ['Gastroenterology transparent art fully visible',()=>assert.match(html,/\.atlas-gastro-feature \.atlas-gastro-photo \{[\s\S]*?object-fit:contain/)],
 ['Gastroenterology image precached',()=>assert.ok(swSource.includes("'./assets/gastroenterologia-portada.webp'"))],
 ['All previous 52 calculators preserved after Gastro photo',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,52)]
];
t.push(...gastroPhotoTests);

const anthropometryPhotoTests=[
 ['Anthropometry original JPEG exists',()=>assert.ok(fs.existsSync('assets/antropometria-portada.jpg'))],
 ['Anthropometry photo displayed in its home card',()=>assert.ok(html.includes('src="./assets/antropometria-portada.jpg"'))],
 ['Anthropometry card preserves full-width layout',()=>assert.ok(html.includes("c==='Antropometría'?' atlas-gineco-feature atlas-antropometria-feature'"))],
 ['Anthropometry uses shared photo styles',()=>assert.ok(html.includes('atlas-gineco-photo atlas-antropometria-photo'))],
 ['Anthropometry photograph displays without cropping',()=>assert.match(html,/\.atlas-antropometria-feature \.atlas-antropometria-photo \{[\s\S]*?object-fit:contain/)],
 ['Anthropometry image available offline',()=>assert.ok(swSource.includes("'./assets/antropometria-portada.jpg'"))],
 ['Original 52 clinical tools preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumNeuro.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,52)],
 ['Other category photos retained',()=>assert.ok(html.includes('src="./assets/gastroenterologia-portada.webp"')&&html.includes('src="./assets/cardiologia-portada.jpg"'))]
];
t.push(...anthropometryPhotoTests);

const neuroPhaseOneTests=[
 ['Neurology module bundled',()=>assert.ok(html.includes('<script src="./assets/startup-bundle.js"></script>'))],
 ['Neurology module cached offline',()=>assert.ok(swSource.includes("'./assets/neurology-module.js'"))],
 ['Neurology category created',()=>assert.ok(html.includes("const categories=['Todas','Urgencias y Terapia Intensiva','Neurología y Raquimedular'"))],
 ['Neurology featured wide card',()=>assert.ok(html.includes("c==='Neurología y Raquimedular'?' atlas-gineco-feature atlas-neuro-feature'"))],
 ['Neurology uses existing local art',()=>assert.ok(html.includes("atlas-neuro-photo")&&html.includes('src="./assets/escalas-clinicas-portada.webp"'))],
 ['58 unique calculator ids',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length),63)],
 ['Two new neuro calculators',()=>assert.equal(ctx.KidBumNeuro.ids.length,2)],
 ['Glasgow no duplicate',()=>assert.equal((html.match(/\{id:'gcs',title:/g)||[]).length,1)],
 ['Glasgow moved to Neuro',()=>assert.ok(html.includes("title:'Glasgow',category:'Neurología y Raquimedular'"))],
 ['Glasgow 15 unmodified',()=>assert.equal(calc('gcs',{eye:'4',verbal:'5',motor:'6'}).value,15)],
 ['Glasgow NT no false total',()=>assert.equal(calc('gcs',{eye:'4',verbal:'NT',motor:'6'}).value,null)],
 ['No new cardiology calculators',()=>assert.equal(ctx.KidBumAdvanced.ids.length,3)],
 ['Original author and icon remain',()=>assert.ok(html.includes('Teniente Pasante de Medicina Leonardo Alvizo Velázquez')&&html.includes('kidbum-icon-192-v081.png'))]
];
const abcBase={age:68,sbp:155,dbp:90,feature:'weakness',duration:'min10to59',diabetes:'false',resolved:'true'};
neuroPhaseOneTests.push(
 ['ABCD2 sample 5',()=>assert.equal(calc('abcd2',abcBase).value,5)],
 ['ABCD2 minimum 0',()=>assert.equal(calc('abcd2',{...abcBase,age:35,sbp:110,dbp:70,feature:'other',duration:'lt10'}).value,0)],
 ['ABCD2 maximum 7',()=>assert.equal(calc('abcd2',{...abcBase,age:60,sbp:140,dbp:80,duration:'ge60',diabetes:'true'}).value,7)],
 ['ABCD2 systolic threshold',()=>assert.equal(calc('abcd2',{...abcBase,age:59,sbp:140,dbp:80,feature:'other',duration:'lt10'}).value,1)],
 ['ABCD2 diastolic threshold',()=>assert.equal(calc('abcd2',{...abcBase,age:59,sbp:100,dbp:90,feature:'other',duration:'lt10'}).value,1)],
 ['ABCD2 speech without weakness',()=>assert.equal(calc('abcd2',{...abcBase,age:59,sbp:110,dbp:70,feature:'speech',duration:'lt10'}).value,1)],
 ['ABCD2 ongoing deficit rejected',()=>assert.ok(calc('abcd2',{...abcBase,resolved:'false'}).error)],
 ['ABCD2 missing resolved status rejected',()=>assert.ok(calc('abcd2',{...abcBase,resolved:''}).error)],
 ['ABCD2 invalid numeric age rejected',()=>assert.ok(calc('abcd2',{...abcBase,age:'x'}).error)],
 ['ABCD2 incomplete diabetes rejected',()=>assert.ok(calc('abcd2',{...abcBase,diabetes:''}).error)],
 ['ABCD2 not used for discharge',()=>assert.ok(calc('abcd2',abcBase).notes.some(n=>n.includes('alta')))],
 ['ABCD2 no definitive diagnosis',()=>assert.ok(calc('abcd2',abcBase).interpretation.includes('NO descarta'))]
);
const alteplaseBase={weight:70,context:'adult_ais_reference',acknowledge:'yes'};
neuroPhaseOneTests.push(
 ['Alteplase 70kg total 63 mg',()=>assert.equal(calc('alteplaseais',alteplaseBase).value,63)],
 ['Alteplase 70kg bolus 6.3',()=>assert.ok(calc('alteplaseais',alteplaseBase).interpretation.includes('6.30 mg'))],
 ['Alteplase 70kg infusion 56.7',()=>assert.ok(calc('alteplaseais',alteplaseBase).interpretation.includes('56.70 mg'))],
 ['Alteplase 100kg cap 90mg',()=>assert.equal(calc('alteplaseais',{...alteplaseBase,weight:100}).value,90)],
 ['Alteplase 130kg cap 90mg',()=>assert.equal(calc('alteplaseais',{...alteplaseBase,weight:130}).value,90)],
 ['Alteplase capped bolus 9mg',()=>assert.ok(calc('alteplaseais',{...alteplaseBase,weight:130}).interpretation.includes('9.00 mg'))],
 ['Alteplase 50kg total 45mg',()=>assert.equal(calc('alteplaseais',{...alteplaseBase,weight:50}).value,45)],
 ['Alteplase zero weight rejected',()=>assert.ok(calc('alteplaseais',{...alteplaseBase,weight:0}).error)],
 ['Alteplase invalid context rejected',()=>assert.ok(calc('alteplaseais',{...alteplaseBase,context:'cardiac'}).error)],
 ['Alteplase no acknowledgement rejected',()=>assert.ok(calc('alteplaseais',{...alteplaseBase,acknowledge:'no'}).error)],
 ['Alteplase missing acknowledgement rejected',()=>assert.ok(calc('alteplaseais',{...alteplaseBase,acknowledge:''}).error)],
 ['Alteplase not a prescription',()=>assert.ok(calc('alteplaseais',alteplaseBase).notes.some(n=>n.includes('NO es una prescripción')))],
 ['Alteplase not tenecteplase',()=>assert.ok(calc('alteplaseais',alteplaseBase).notes.some(n=>n.includes('NO confundir fármacos')))],
 ['Reference to AHA ASA 2026',()=>assert.ok(html.includes('https://www.ahajournals.org/doi/10.1161/STR.0000000000000513'))],
 ['Reference to Johnston 2007',()=>assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/17258668/'))]
);
t.push(...neuroPhaseOneTests);

const completionTests=[
 ['NIHSS module included in bundle',()=>assert.ok(html.includes('assets/startup-bundle.js'))],
 ['NIHSS module precached',()=>assert.ok(swSource.includes("'./assets/neurology-advanced.js'"))],
 ['58 calculators now registered',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length),63)],
 ['Four neurologic advanced tools',()=>assert.equal(ctx.KidBumNeurologyAdvanced.ids.length,4)],
 ['All previous 54 remain',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length-ctx.KidBumNeurologyAdvanced.ids.length,54)],
 ['One original Glasgow only',()=>assert.equal((html.match(/\{id:'gcs',title:/g)||[]).length,1)],
 ['No additional cardiology tools',()=>assert.equal(ctx.KidBumAdvanced.ids.length,3)],
 ['NIHSS all default normal',()=>assert.equal(calc('nihss',{confirm:'yes',loca:'0',locb:'0',locc:'0',gaze:'0',visual:'0',face:'0',armL:'0',armR:'0',legL:'0',legR:'0',ataxia:'0',sensory:'0',language:'0',dysarthria:'0',neglect:'0'}).value,0)]
];
const NIH={confirm:'yes',loca:'0',locb:'0',locc:'0',gaze:'0',visual:'0',face:'0',armL:'0',armR:'0',legL:'0',legR:'0',ataxia:'0',sensory:'0',language:'0',dysarthria:'0',neglect:'0'};
const nihMax={loca:'3',locb:'2',locc:'2',gaze:'2',visual:'3',face:'3',armL:'4',armR:'4',legL:'4',legR:'4',ataxia:'2',sensory:'2',language:'3',dysarthria:'2',neglect:'2'};
completionTests.push(
 ['NIHSS max 42',()=>assert.equal(calc('nihss',{...NIH,...nihMax}).value,42)],
 ['NIHSS arm UN no total',()=>assert.equal(calc('nihss',{...NIH,armL:'UN'}).value,null)],
 ['NIHSS ataxia UN no total',()=>assert.equal(calc('nihss',{...NIH,ataxia:'UN'}).value,null)],
 ['NIHSS dysarthria UN no total',()=>assert.equal(calc('nihss',{...NIH,dysarthria:'UN'}).value,null)],
 ['NIHSS visual UN invalid',()=>assert.ok(calc('nihss',{...NIH,visual:'UN'}).error)],
 ['NIHSS face grade 4 invalid',()=>assert.ok(calc('nihss',{...NIH,face:'4'}).error)],
 ['NIHSS missing item invalid',()=>assert.ok(calc('nihss',{...NIH,language:''}).error)],
 ['NIHSS must be examined',()=>assert.ok(calc('nihss',{...NIH,confirm:'no'}).error)],
 ['NIHSS zero not excluding stroke',()=>assert.ok(calc('nihss',NIH).notes.some(n=>n.toLowerCase().includes('no excluye')))],
 ['NIHSS UN requires explanation',()=>assert.ok(calc('nihss',{...NIH,armL:'UN'}).notes.some(n=>n.includes('justificar')))]
);
for(let grade=1;grade<=5;grade++){
 completionTests.push(['Hunt-Hess grade '+grade,()=>assert.equal(calc('hunthess',{confirm:'yes',grade:String(grade)}).value,grade)]);
}
completionTests.push(
 ['Hunt-Hess requires confirmed SAH',()=>assert.ok(calc('hunthess',{confirm:'no',grade:'1'}).error)],
 ['Hunt-Hess missing grade',()=>assert.ok(calc('hunthess',{confirm:'yes',grade:''}).error)]
);
for(const [pattern,grade] of [['none',1],['thin',2],['thick',3],['ivhthin',4]]){
 completionTests.push(['Original Fisher '+grade,()=>assert.equal(calc('fisher',{confirm:'yes',pattern}).value,grade)]);
}
completionTests.push(
 ['Fisher blocks ambiguous thick SAH and IVH',()=>assert.ok(calc('fisher',{confirm:'yes',pattern:'ivhthick'}).error)],
 ['Fisher blocks uncertain CT',()=>assert.ok(calc('fisher',{confirm:'yes',pattern:'unclear'}).error)],
 ['Fisher CT exam required',()=>assert.ok(calc('fisher',{confirm:'no',pattern:'thin'}).error)],
 ['Fisher modified warning',()=>assert.ok(calc('fisher',{confirm:'yes',pattern:'thick'}).notes.some(x=>x.includes('MODIFICADA')))]
);
const AIS={exam:'yes',nli:'T12',normal:'no',prior:'no',ltR:'0',ltL:'0',ppR:'0',ppL:'0',dap:'no',vac:'no',motorBeyond3:'no'};
const roots=['C5','C6','C7','C8','T1','L2','L3','L4','L5','S1'];
function muscles(value){const values={};for(const side of ['R','L'])for(const root of roots)values['m'+side+root]=value;return values}
completionTests.push(
 ['AIS A absent sacral sparing',()=>assert.equal(calc('asiaais',AIS).display,'AIS A')],
 ['AIS B sensory sacral sparing',()=>assert.equal(calc('asiaais',{...AIS,ltR:'1'}).display,'AIS B')],
 ['AIS B/C unknown motor sparing prohibited',()=>assert.ok(calc('asiaais',{...AIS,ltR:'1',motorBeyond3:'unknown'}).error)],
 ['AIS C motor incomplete with low grades',()=>assert.equal(calc('asiaais',{...AIS,ltR:'1',motorBeyond3:'yes',...muscles('1')}).display,'AIS C')],
 ['AIS D half or more antigravity motor',()=>assert.equal(calc('asiaais',{...AIS,ltR:'1',motorBeyond3:'yes',...muscles('4')}).display,'AIS D')],
 ['AIS motor incomplete by VAC',()=>assert.equal(calc('asiaais',{...AIS,vac:'yes',...muscles('4')}).display,'AIS D')],
 ['AIS motor data incomplete prohibited',()=>assert.ok(calc('asiaais',{...AIS,vac:'yes'}).error)],
 ['AIS motor NT blocked',()=>assert.ok(calc('asiaais',{...AIS,vac:'yes',...muscles('4'),mRL2:'NT'}).error)],
 ['AIS sacral NT blocked',()=>assert.ok(calc('asiaais',{...AIS,ltR:'NT'}).error)],
 ['AIS D with prior normal exam',()=>assert.equal(calc('asiaais',{...AIS,nli:'S4-5',normal:'yes',prior:'yes',ltR:'2',ltL:'2',ppR:'2',ppL:'2',dap:'yes',vac:'yes'}).display,'AIS E')],
 ['AIS E not allowed without prior SCI',()=>assert.ok(calc('asiaais',{...AIS,nli:'S4-5',normal:'yes',prior:'no',ltR:'2',ltL:'2',ppR:'2',ppL:'2',dap:'yes',vac:'yes'}).error)],
 ['AIS no full assessment blocked',()=>assert.ok(calc('asiaais',{...AIS,exam:'no'}).error)],
 ['AIS only guided no calculated NLI',()=>assert.ok(calc('asiaais',AIS).notes.some(n=>n.includes('NO calcula')))],
 ['AIS muscle form has 20 controls',()=>assert.ok(html.includes("const asiaMuscleFields=['R','L'].flatMap"))],
 ['AIS E visible with correct UI',()=>assert.ok(html.includes("res.value===null?(res.display?enc(res.display):'No evaluable')"))],
 ['ISNCSCI 2026 reference visible',()=>assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/42812624/'))],
 ['NINDS official reference visible',()=>assert.ok(html.includes('https://www.ninds.nih.gov/sites/default/files/2025-03/KnowStroke_NIHStrokeScale_March2025_508c.pdf'))]
);
// Validate the actual UI field contract, not just calls directly to the clinical engines.
const clinicalUiContracts=[
 ['sofa2','confirm'],['camicu','assessed'],['rox','hfno'],['rass','assessed'],
 ['nihss','confirm'],['hunthess','confirm'],['fisher','confirm'],
 ['asiaais','exam'],['asiaais','normal'],['asiaais','prior']
];
completionTests.push(['Clinical yes/no UI helper yields values recognized by calculation engines',()=>{
 const match=html.match(/const yesnoClinical=([^\n;]+);/);
 assert.ok(match,'Missing dedicated yes/no adapter');
 const factory=vm.runInNewContext('('+match[1]+')',{
  choice:(key,label,options,example)=>({key,label,options,example})
 },{timeout:2000});
 assert.equal(factory('confirm','Exam','true').example,'yes');
 assert.equal(factory('prior','Previous','false').example,'no');
 assert.equal(factory('confirm','Exam','true').options.find(x=>x[0]==='yes')[1],'Sí');
 assert.equal(factory('confirm','Exam','true').options.find(x=>x[0]==='no')[1],'No');
}]);
for(const [calcId,fieldKey] of clinicalUiContracts){
 completionTests.push(['Clinical UI accepts real engine value '+calcId+'.'+fieldKey,()=>{
  const definitionLine=html.split('\n').find(line=>line.includes("{id:'"+calcId+"',title:"));
  assert.ok(definitionLine,'Definition missing: '+calcId);
  assert.ok(definitionLine.includes("yesnoClinical('"+fieldKey+"',"),
    'UI option value disagrees with engine: '+calcId+'.'+fieldKey);
 }]);
}

// End-to-end contract regression: example values from the REAL UI definitions,
// executed against the installed application's bundled neurologic engine.
// This guards against yes/no mismatches missed by engine-only tests.
const clinicalDefsStart=html.indexOf('const dateInput=');
const clinicalDefsEnd=html.indexOf('const categories=',clinicalDefsStart);
assert.ok(clinicalDefsStart>0&&clinicalDefsEnd>clinicalDefsStart,'Clinical UI definitions available');
const actualClinicalDefs=vm.runInNewContext(html.slice(clinicalDefsStart,clinicalDefsEnd)+'\ndefs;',{}, {timeout:3000});
const bundledCtx={};bundledCtx.window=bundledCtx;bundledCtx.globalThis=bundledCtx;
vm.runInNewContext(fs.readFileSync('assets/startup-bundle.js','utf8'),bundledCtx,{timeout:8000});
const publishedNeuro=bundledCtx.KidBumNeurologyAdvanced;
const publishedCritical=bundledCtx.KidBumCritical;
assert.ok(publishedNeuro,'Production bundle should register the neurologic module');
assert.ok(publishedCritical,'Production bundle should register the critical care module');
for(const [calcId,expectedValue,expectedDisplay] of [
 ['nihss',0,null],['hunthess',2,null],['fisher',3,null],['asiaais',null,'AIS A'],
 ['rox',7.36,null],['rass',0,null]
]){
 completionTests.push(['Form example produces clinical result: '+calcId,()=>{
  const def=actualClinicalDefs.find(x=>x.id===calcId);
  assert.ok(def,'Actual form definition should exist: '+calcId);
  const input=Object.fromEntries(def.fields.map(field=>[field.key,field.example||'']));
  assert.ok(def.fields.every(field=>field.optional||input[field.key]!==''),'No missing required fields: '+calcId);
  for(const compute of [ctx.KidBumEngine.calculate,(calcId==='rox'||calcId==='rass'?publishedCritical:publishedNeuro).calculate]){
   const result=compute(calcId,input);
   assert.equal(result.error,undefined,'No calculation error: '+calcId);
   if(calcId==='rox')assert.ok(Math.abs(result.value-expectedValue)<1e-9,'Expected ROX = 7.36');
   else assert.equal(result.value,expectedValue,'Expected example score: '+calcId);
   if(expectedDisplay!==null)assert.equal(result.display,expectedDisplay,'Expected example label: '+calcId);
  }
 }]);
}

completionTests.push(['ROX and RASS decline non-assessed clinical context',()=>{
 for(const [calcId,fieldKey] of [['rox','hfno'],['rass','assessed']]){
  const def=actualClinicalDefs.find(x=>x.id===calcId);
  const values=Object.fromEntries(def.fields.map(f=>[f.key,f.example||'']));
  values[fieldKey]='no';
  assert.ok(ctx.KidBumEngine.calculate(calcId,values).error,'No examination context must block: '+calcId);
 }
}]);

// Every real form's example must reach a result through the SAME data
// conversion used by update(), including boolean mental/confusion fields.
for(const definition of actualClinicalDefs){
 completionTests.push(['All form examples calculate: '+definition.id,()=>{
  const data={};
  for(const f of definition.fields){
   const raw=f.example||'';
   if(f.type==='choice'&&(f.key==='mental'||f.key==='confusion'))data[f.key]=raw===''?undefined:raw==='true';
   else data[f.key]=raw;
  }
  const result=ctx.KidBumEngine.calculate(definition.id,data);
  assert.equal(result.error,undefined,'Clinical form must calculate: '+definition.id+' '+(result.error||[]).join('; '));
  assert.equal(result.missing,undefined,'Example must be complete: '+definition.id);
  assert.ok(result.value!==undefined||result.display!==undefined,'Example must return result: '+definition.id);
 }]);
}

t.push(...completionTests);

const neurologyPhotoTests=[
 ['New original Neurology JPEG exists',()=>assert.ok(fs.existsSync('assets/neurologia-portada.jpg'))],
 ['Neurology card uses exact author-uploaded JPEG path',()=>assert.ok(html.includes("c==='Neurología y Raquimedular'?'<img class=\"atlas-category-illustration atlas-gineco-photo atlas-neuro-photo\" src=\"./assets/neurologia-portada.jpg\""))],
 ['Neurology wide card layout preserved',()=>assert.ok(html.includes("c==='Neurología y Raquimedular'?' atlas-gineco-feature atlas-neuro-feature'"))],
 ['Neurology shares original card photo class',()=>assert.ok(html.includes('atlas-gineco-photo atlas-neuro-photo'))],
 ['Neurology full photo without filter',()=>assert.match(html,/\.atlas-neuro-feature \.atlas-neuro-photo\{[\s\S]*?object-fit:cover;[\s\S]*?filter:none!important/)],
 ['Neurology new image cached offline',()=>assert.ok(swSource.includes("'./assets/neurologia-portada.jpg'"))],
 ['Old Escalas Clínicas image retained',()=>assert.ok(html.includes("c==='Escalas clínicas'?'<img")&&html.includes('src="./assets/escalas-clinicas-portada.webp"'))],
 ['All 58 previous calculators preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length,58)],
 ['Existing original icon retained',()=>assert.ok(html.includes('kidbum-icon-192-v081.png'))]
];
t.push(...neurologyPhotoTests);

const cardiologyTests=[
 ['Cardiology module bundled',()=>assert.ok(html.includes('<script src="./assets/startup-bundle.js"></script>'))],
 ['Cardiology module available offline',()=>assert.ok(swSource.includes("'./assets/cardiology-module.js'"))],
 ['Five new cardiology tools',()=>assert.equal(ctx.KidBumCardio.ids.length,5)],
 ['63 calculators total',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length),63)],
 ['Existing 58 preserved',()=>assert.equal((legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length)-ctx.KidBumCardio.ids.length,58)],
 ['Wells DVT appears in Cardiología without duplication',()=>assert.ok(html.includes("id:'wellsdvt',title:'Wells para TVP',category:'Cardiología'"))],
 ['Wells PE appears in Cardiología without duplication',()=>assert.ok(html.includes("id:'wellspe',title:'Wells para embolia pulmonar',category:'Cardiología'"))],
 ['Original cardiology photograph remains',()=>assert.ok(html.includes('src="./assets/cardiologia-portada.jpg"'))],
 ['Existing original app icon remains',()=>assert.ok(html.includes('kidbum-icon-192-v081.png'))],
 ['Historical PCE 2013 reference visible',()=>assert.ok(html.includes('https://pmc.ncbi.nlm.nih.gov/articles/PMC4700825/'))],
 ['Current PREVENT 2026 replacement disclosed',()=>assert.ok(html.includes('https://professional.heart.org/en/science-news/2026-guideline-on-the-management-of-dyslipidemia/top-things-to-know'))]
];
const pceBase={age:55,tc:213,hdl:50,sbp:120,cohort:'fw',treated:'false',smoke:'false',diabetes:'false',ascvd:'false',acknowledge:'true'};
for(const [group,expected] of [['fw',2.1],['fb',3.0],['mw',5.3],['mb',6.1]]){
 cardiologyTests.push(['PCE 2013 official vignette '+group,()=>assert.ok(Math.abs(calc('ascvdpce',{...pceBase,cohort:group}).value-expected)<0.15)]);
}
cardiologyTests.push(
 ['PCE rejects established ASCVD',()=>assert.ok(calc('ascvdpce',{...pceBase,ascvd:'true'}).error)],
 ['PCE rejects age 39',()=>assert.ok(calc('ascvdpce',{...pceBase,age:39}).error)],
 ['PCE rejects absent cohort',()=>assert.ok(calc('ascvdpce',{...pceBase,cohort:''}).error)],
 ['PCE rejects invalid HDL',()=>assert.ok(calc('ascvdpce',{...pceBase,hdl:0}).error)],
 ['PCE blocks without historical acknowledgment',()=>assert.ok(calc('ascvdpce',{...pceBase,acknowledge:'false'}).error)],
 ['PCE warns that PREVENT supersedes',()=>assert.ok(calc('ascvdpce',pceBase).notes.some(n=>n.includes('PREVENT')))]
);
const nst={suspected:'true',age:65,riskfactors:'3',stenosis:'true',aspirin:'true',angina:'true',st:'true',biomarker:'true'};
cardiologyTests.push(
 ['TIMI NSTEMI maximum 7',()=>assert.equal(calc('timinstemi',nst).value,7)],
 ['TIMI NSTEMI minimum 0',()=>assert.equal(calc('timinstemi',{...nst,age:40,riskfactors:'2',stenosis:'false',aspirin:'false',angina:'false',st:'false',biomarker:'false'}).value,0)],
 ['TIMI NSTEMI one point >=3 factors',()=>assert.equal(calc('timinstemi',{...nst,age:40,riskfactors:'3',stenosis:'false',aspirin:'false',angina:'false',st:'false',biomarker:'false'}).value,1)],
 ['TIMI NSTEMI invalid marker',()=>assert.ok(calc('timinstemi',{...nst,biomarker:''}).error)],
 ['TIMI NSTEMI non-SCA blocks',()=>assert.ok(calc('timinstemi',{...nst,suspected:'false'}).error)],
 ['TIMI NSTEMI details',()=>assert.ok(calc('timinstemi',nst).detail.includes('ST'))]
);
const stem={confirm:'true',age:75,sbp:99,hr:101,weight:66,hours:4.1,history:'true',killip:'true',anterior:'true'};
cardiologyTests.push(
 ['TIMI STEMI maximum 14',()=>assert.equal(calc('timistemi',stem).value,14)],
 ['TIMI STEMI minimum 0',()=>assert.equal(calc('timistemi',{...stem,age:64,sbp:100,hr:100,weight:67,hours:4,history:'false',killip:'false',anterior:'false'}).value,0)],
 ['TIMI STEMI 65 age threshold',()=>assert.equal(calc('timistemi',{...stem,age:65}).value,13)],
 ['TIMI STEMI 75 age threshold',()=>assert.equal(calc('timistemi',stem).value,14)],
 ['TIMI STEMI >100 not >=100 HR',()=>assert.equal(calc('timistemi',{...stem,hr:100}).value,12)],
 ['TIMI STEMI >4 hours',()=>assert.equal(calc('timistemi',{...stem,hours:4}).value,13)],
 ['TIMI STEMI no reperfusion delay warning',()=>assert.ok(calc('timistemi',stem).notes.some(n=>n.includes('NO deben retrasarse')))],
 ['TIMI STEMI missing Killip prohibited',()=>assert.ok(calc('timistemi',{...stem,killip:''}).error)]
);
const af={af:'true',age:75,sex:'female',hf:'true',htn:'true',diabetes:'true',stroke:'true',vascular:'true'};
cardiologyTests.push(
 ['CHA2DS2 VASc maximum 9',()=>assert.equal(calc('chadsvasc',af).value,9)],
 ['CHA2DS2 VASc zero',()=>assert.equal(calc('chadsvasc',{...af,age:40,sex:'male',hf:'false',htn:'false',diabetes:'false',stroke:'false',vascular:'false'}).value,0)],
 ['CHA2DS2 VASc 65-74 one age point',()=>assert.equal(calc('chadsvasc',{...af,age:65}).value,8)],
 ['CHA2DS2 VASc accompanying VA 8',()=>assert.ok(calc('chadsvasc',af).interpretation.includes('8/8'))],
 ['CHA2DS2 VASc no AF blocked',()=>assert.ok(calc('chadsvasc',{...af,af:'false'}).error)],
 ['CHA2DS2 VASc missing sex prohibited',()=>assert.ok(calc('chadsvasc',{...af,sex:''}).error)]
);
const bleed={af:'true',age:66,anticoag:'vka',htn:'true',renal:'true',liver:'true',stroke:'true',bleed:'true',labile:'true',drugs:'true',alcohol:'true'};
cardiologyTests.push(
 ['HAS-BLED max 9',()=>assert.equal(calc('hasbled',bleed).value,9)],
 ['HAS-BLED age 65 not >65',()=>assert.equal(calc('hasbled',{...bleed,age:65}).value,8)],
 ['HAS-BLED DOAC no labile INR point',()=>assert.equal(calc('hasbled',{...bleed,anticoag:'doac'}).value,8)],
 ['HAS-BLED VKA requires INR criterion',()=>assert.ok(calc('hasbled',{...bleed,labile:''}).error)],
 ['HAS-BLED absent renal status prohibited',()=>assert.ok(calc('hasbled',{...bleed,renal:''}).error)],
 ['HAS-BLED no AF blocked',()=>assert.ok(calc('hasbled',{...bleed,af:'false'}).error)],
 ['HAS-BLED no automatic anticoag stop',()=>assert.ok(calc('hasbled',bleed).notes.some(n=>n.includes('no debe usarse como única razón')))]
);
t.push(...cardiologyTests);

const phase1=[
['Original critical script bundled',()=>assert.ok(html.includes('src="./assets/startup-bundle.js"'))],
['New script offline',()=>assert.ok(swSource.includes("'./assets/critical-module.js'"))],
['68 calculators in total',()=>assert.equal(legacyCalculatorCount,68)],
['Original 63 preserved',()=>assert.equal(legacyCalculatorCount-ctx.KidBumCritical.ids.length-ctx.KidBumCriticalAdvanced.ids.length,63)],
['Three critical tools',()=>assert.equal(ctx.KidBumCritical.ids.length,3)],
['Urgencias category visible',()=>assert.ok(html.includes('Urgencias y Terapia Intensiva'))],
['Mobile Inicio replaces Guardia navigation',()=>assert.ok(html.includes('data-mobile-nav="home"')&&!html.includes('data-mobile-nav="guard"'))],
['Guardia route',()=>assert.ok(html.includes("if(screen==='guard'){renderGuard();return;}"))],
['Guardia links',()=>assert.ok(html.includes('button.dataset.guardOpen'))],
['Original icon',()=>assert.ok(html.includes('kidbum-icon-192-v081.png'))]
];
const pf={pao2:80,fio2:40,peep:'yes'};
phase1.push(
['PF200',()=>assert.equal(calc('pafi',pf).value,200)],
['PF100',()=>assert.equal(calc('pafi',{...pf,pao2:50,fio2:50}).value,100)],
['PF no ARDS diagnosis without PEEP',()=>assert.ok(calc('pafi',{...pf,peep:'unknown'}).interpretation.includes('NO clasificación diagnóstica'))],
['PF rejects fraction FiO2',()=>assert.ok(calc('pafi',{...pf,fio2:0.4}).error)],
['PF rejects empty PEEP',()=>assert.ok(calc('pafi',{...pf,peep:''}).error)],
['PF notes ARDS limitation',()=>assert.ok(calc('pafi',pf).notes.some(n=>n.includes('NO diagnostica')))]
);
const rox={spo2:92,fio2:50,rr:25,time:'6',hfno:'yes'};
phase1.push(
['ROX reference',()=>assert.ok(Math.abs(calc('rox',rox).value-7.36)<1e-10)],
['ROX 2h lower limit',()=>assert.ok(calc('rox',{...rox,spo2:80,fio2:80,rr:40,time:'2'}).interpretation.includes('por debajo'))],
['ROX gray zone',()=>assert.ok(calc('rox',{...rox,spo2:90,fio2:70,rr:30}).interpretation.includes('zona intermedia'))],
['ROX unknown time',()=>assert.ok(calc('rox',{...rox,time:'other'}).interpretation.includes('no se aplica'))],
['ROX not HFNC blocked',()=>assert.ok(calc('rox',{...rox,hfno:'no'}).error)],
['ROX 0.50 FiO2 invalid',()=>assert.ok(calc('rox',{...rox,fio2:.5}).error)],
['ROX no zero frequency',()=>assert.ok(calc('rox',{...rox,rr:0}).error)]
);
for(const score of ['-5','-4','-3','-2','-1','0','1','2','3','4']){
 phase1.push(['RASS ordinal '+score,()=>assert.equal(calc('rass',{assessed:'yes',score}).value,Number(score))]);
}
phase1.push(
['RASS assessment required',()=>assert.ok(calc('rass',{assessed:'no',score:'0'}).error)],
['RASS invalid 5 blocked',()=>assert.ok(calc('rass',{assessed:'yes',score:'5'}).error)],
['RASS CAM-ICU caution',()=>assert.ok(calc('rass',{assessed:'yes',score:'-5'}).notes.some(n=>n.includes('CAM-ICU')))]
);
t.push(...phase1);

const phase2=[
 ['Advanced ICU module bundled',()=>assert.ok(html.includes('src="./assets/startup-bundle.js"'))],
 ['Advanced ICU module offline precache',()=>assert.ok(swSource.includes("'./assets/critical-advanced.js'"))],
 ['Total 68 calculators',()=>assert.equal(legacyCalculatorCount,68)],
 ['Original 66 calculators unchanged',()=>assert.equal(legacyCalculatorCount-ctx.KidBumCriticalAdvanced.ids.length,66)],
 ['Phase 2 adds exactly two',()=>assert.equal(ctx.KidBumCriticalAdvanced.ids.length,2)],
 ['SOFA-2 and CAM-ICU in catalog',()=>assert.ok(html.includes("{id:'sofa2'")&&html.includes("{id:'camicu'"))],
 ['SOFA-2 and CAM-ICU accessible in Guardia',()=>assert.ok(html.includes("ids:['pafi','rox','rass','camicu','sofa2','news2']"))],
 ['SOFA-2 JAMA 2025 paper linked',()=>assert.ok(html.includes('https://jamanetwork.com/journals/jama/fullarticle/2840822'))],
 ['CAM-ICU Vanderbilt source linked',()=>assert.ok(html.includes('https://www.vumc.org/cvicu/sites/default/files/2020-02/CAM-ICU-flowsheet.pdf'))],
 ['Original author artwork retained',()=>assert.ok(html.includes('src="./assets/neurologia-portada.jpg"')&&html.includes('src="./assets/cardiologia-portada.jpg"'))]
];
const so0={adult:'yes',confirm:'yes',brain:'0',resp:'0',cv:'0',liver:'0',kidney:'0',hemo:'0'};
phase2.push(
 ['SOFA-2 minimum 0',()=>assert.equal(calc('sofa2',so0).value,0)],
 ['SOFA-2 maximum 24',()=>assert.equal(calc('sofa2',{...so0,brain:'4',resp:'4',cv:'4',liver:'4',kidney:'4',hemo:'4'}).value,24)],
 ['SOFA-2 mixed six domains',()=>assert.equal(calc('sofa2',{...so0,brain:'1',resp:'2',cv:'3',liver:'4',kidney:'1',hemo:'2'}).value,13)],
 ['SOFA-2 missing kidney blocked',()=>assert.ok(calc('sofa2',{...so0,kidney:''}).error)],
 ['SOFA-2 invalid domain blocked',()=>assert.ok(calc('sofa2',{...so0,liver:'5'}).error)],
 ['SOFA-2 not validated for pediatrics',()=>assert.ok(calc('sofa2',{...so0,adult:'no'}).error)],
 ['SOFA-2 complete assessment mandatory',()=>assert.ok(calc('sofa2',{...so0,confirm:'no'}).error)],
 ['SOFA-2 no automatic mortality estimate',()=>assert.ok(calc('sofa2',so0).notes.some(n=>n.includes('NO es el SOFA clásico')))],
 ['SOFA-2 guidelines detail',()=>assert.ok(calc('sofa2',so0).detail.includes('Hemostasia'))]
);
const cam0={assessed:'yes',rass:'0',acute:'yes',attention:'3',thinking:'2'};
phase2.push(
 ['CAM-ICU positive feature 4',()=>assert.equal(calc('camicu',cam0).display,'Positivo')],
 ['CAM-ICU negative feature 4 error <=1',()=>assert.equal(calc('camicu',{...cam0,thinking:'1'}).display,'Negativo')],
 ['CAM-ICU positive by altered RASS',()=>assert.equal(calc('camicu',{...cam0,rass:'-1',thinking:''}).display,'Positivo')],
 ['CAM-ICU negative absent feature 1',()=>assert.equal(calc('camicu',{...cam0,acute:'no',thinking:''}).display,'Negativo')],
 ['CAM-ICU negative 0-2 attention errors',()=>assert.equal(calc('camicu',{...cam0,attention:'2',thinking:''}).display,'Negativo')],
 ['CAM-ICU -4 no evaluable',()=>assert.equal(calc('camicu',{...cam0,rass:'-4'}).display,'No evaluable')],
 ['CAM-ICU -5 no evaluable',()=>assert.equal(calc('camicu',{...cam0,rass:'-5'}).value,null)],
 ['CAM-ICU attention not evaluable cannot become negative',()=>assert.ok(calc('camicu',{...cam0,attention:'NT'}).error)],
 ['CAM-ICU no thought test when needed blocked',()=>assert.ok(calc('camicu',{...cam0,thinking:''}).error)],
 ['CAM-ICU thought test NT when needed blocked',()=>assert.ok(calc('camicu',{...cam0,thinking:'NT'}).error)],
 ['CAM-ICU no assessment refused',()=>assert.ok(calc('camicu',{...cam0,assessed:'no'}).error)],
 ['CAM-ICU invalid RASS refused',()=>assert.ok(calc('camicu',{...cam0,rass:'-6'}).error)],
 ['CAM-ICU no sedative orders',()=>assert.ok(calc('camicu',cam0).notes.some(n=>n.includes('no indicar fármacos')||n.includes('No indicar fármacos')))]
);
t.push(...phase2);

const urgenciasOriginalTests=[
 ['User-original Urgencias JPEG exists',()=>assert.ok(fs.existsSync('assets/urgencias-portada.jpg'))],
 ['Urgencias image assigned to correct card',()=>assert.ok(html.includes("c==='Urgencias y Terapia Intensiva'?'<img class=\"atlas-category-illustration atlas-gineco-photo atlas-urgencias-photo\" src=\"./assets/urgencias-portada.jpg\""))],
 ['Urgencias uses same featured rectangular dimensions',()=>assert.ok(html.includes("c==='Urgencias y Terapia Intensiva'?' atlas-gineco-feature atlas-urgencias-feature'"))],
 ['Urgencias original photo displayed fully',()=>assert.ok(html.includes('object-fit:contain;object-position:50% 50%'))],
 ['Urgencias image no visual filters',()=>assert.ok(html.includes('filter:none!important'))],
 ['Original JPG is available offline',()=>assert.ok(swSource.includes("'./assets/urgencias-portada.jpg'"))],
 ['Other clinical feature photos preserved',()=>assert.ok(html.includes('src="./assets/cardiologia-portada.jpg"')&&html.includes('src="./assets/neurologia-portada.jpg"'))],
 ['Previous 68 calculators preserved',()=>assert.equal(legacyCalculatorCount,68)],
 ['Modo Guardia retained in desktop sidebar',()=>assert.ok(html.includes("['guard','✚','Modo Guardia']")&&html.includes("if(screen==='guard'){renderGuard();return;}"))],
 ['Original app icon retained',()=>assert.ok(html.includes('kidbum-icon-192-v081.png'))]
];
t.push(...urgenciasOriginalTests);

const mobileLoadingTests=[
 ['Only 1 critical clinical startup network request',()=>assert.equal((html.match(/<script src="\.\/assets\/startup-bundle\.js"/g)||[]).length,1)],
 ['No original WHO blocking script requests',()=>assert.ok(!html.includes('<script src="./assets/who-wfa.js"></script>'))],
 ['Original clinical module files remain in repository',()=>assert.ok(fs.existsSync('assets/pediatric-module.js')&&fs.existsSync('assets/critical-advanced.js'))],
 ['Startup bundle exists',()=>assert.ok(fs.existsSync('assets/startup-bundle.js'))],
 ['Startup bundle contains all WHO tables unchanged',()=>assert.ok(fs.readFileSync('assets/startup-bundle.js','utf8').includes(fs.readFileSync('assets/who-bmifa.js','utf8')))],
 ['Startup bundle contains cardiology and ICU modules unchanged',()=>assert.ok(fs.readFileSync('assets/startup-bundle.js','utf8').includes(fs.readFileSync('assets/cardiology-module.js','utf8'))&&fs.readFileSync('assets/startup-bundle.js','utf8').includes(fs.readFileSync('assets/critical-advanced.js','utf8')))],
 ['Offline installation atomically precaches tools without duplicate source modules',()=>assert.ok(swSource.includes('cache.addAll(CORE_ASSETS)')&&!swSource.includes('cache.addAll(ASSETS)')&&swSource.includes('BUNDLED_SOURCE_FILES'))],
 ['Core includes startup clinical bundle and atlas',()=>assert.ok(swSource.includes("'./assets/startup-bundle.js'")&&swSource.includes("'./assets/medical-atlas.js'"))],
 ['Clinical illustrations are precached and versioned URLs use offline cache',()=>assert.ok(swSource.includes("'./assets/urgencias-portada.jpg'")&&swSource.includes("'./assets/wallace-adultos-original-HD.png'")&&swSource.includes("const cached=await cache.match(req,{ignoreSearch:true})"))],
 ['Initial service worker claim never reloads page',()=>assert.ok(html.includes('const initiallyControlled=Boolean(navigator.serviceWorker.controller)')&&html.includes('window.location.reload()'))],
 ['Registration no longer waits for images',()=>assert.ok(!html.includes("window.addEventListener('load',()=>{"))],
 ['Manual update keeps current clinical session',()=>assert.ok(!html.includes('window.location.assign(url.toString())'))],
 ['No duplicate immediate registration update',()=>assert.ok(!html.includes('.then(reg=>reg.update()).catch('))],
 ['Update check throttled',()=>assert.ok(html.includes('60*60*1000'))],
 ['No scripts or fonts loaded from external CDN',()=>assert.ok(!html.includes('<script src="https://'))],
 ['Medical calculations unchanged at 68',()=>assert.equal(legacyCalculatorCount,68)],
 ['Original Neurologia photo preserved',()=>assert.ok(html.includes('src="./assets/neurologia-portada.jpg"'))],
 ['Original Urgencias photo preserved',()=>assert.ok(html.includes('src="./assets/urgencias-portada.jpg"'))],
 ['Offline core still includes app metadata',()=>assert.ok(swSource.includes("'./manifest.webmanifest'"))]
];
t.push(...mobileLoadingTests);

const loadingFailureTests=[
 ['Clinical bundle failure triggers visible alert',()=>assert.ok(html.includes('La aplicación no terminó de cargar'))],
 ['Clinical bundle failure allows user-initiated retry',()=>assert.ok(html.includes('id="retry-kidbum-load"')&&html.includes("retry.onclick=()=>location.reload()"))],
 ['Clinical bundle failure prevents partial calculators',()=>assert.ok(html.includes("if(!window.KidBumPediatrics||!window.KidBumCardio||!window.KidBumCriticalAdvanced)"))]
];
t.push(...loadingFailureTests);

const appleSupportTests=[
 ['Apple standalone mode meta',()=>assert.ok(html.includes('<meta name="apple-mobile-web-app-capable" content="yes" />'))],
 ['Apple standalone title',()=>assert.ok(html.includes('<meta name="apple-mobile-web-app-title" content="KidBum CALC" />'))],
 ['Apple safe status bar',()=>assert.ok(html.includes('<meta name="apple-mobile-web-app-status-bar-style" content="default" />'))],
 ['Original iPhone home icon still selected',()=>assert.ok(html.includes('<link rel="apple-touch-icon" sizes="192x192" href="./kidbum-icon-192-v081.png" />'))],
 ['Manifest standalone preserved',()=>assert.ok(manifest.display==='standalone')],
 ['iPhone install guide in About page',()=>assert.ok(html.includes('Instalar en iPhone o iPad (Safari)')&&html.includes('Agregar a Inicio'))],
 ['iOS app opened via Safari outside WhatsApp',()=>assert.ok(html.includes('navegador interno de WhatsApp'))],
 ['iOS safe area preserved',()=>assert.ok(html.includes('env(safe-area-inset-bottom)'))],
 ['No duplicate clinical tools',()=>assert.equal(legacyCalculatorCount,68)],
 ['Android clinical icon preserved',()=>assert.ok(html.includes('kidbum-icon-192-v081.png'))]
];
t.push(...appleSupportTests);
let errors=0;for(const [name,fn] of t){try{fn();console.log('PASS',name)}catch(e){errors++;console.error('FAIL',name,e.message)}}
if(errors){console.error('Failed:',errors);process.exitCode=1;}else console.log(t.length,'checks passed');
