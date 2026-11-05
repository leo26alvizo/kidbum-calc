'use strict';
/* Counts unique catalog tools. Excludes non-calculator Pharma module and repeated clinical shortcuts. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
const defsPart=html.slice(html.indexOf('const defs=['),html.indexOf('/* Non-calculator, pediatric-only'));
const defs=[...defsPart.matchAll(/\{id:'([^']+)',title:'([^']+)',category:'([^']+)'/g)]
 .map(x=>({id:x[1],category:x[3]}));
const extPart=html.slice(html.indexOf('const externalCalculators=['),html.indexOf('/* Diabetes modules'));
const external=[...extPart.matchAll(/\{id:'([^']+)',category:'([^']+)',href:'([^']+)',image:'([^']+)'\}/g)]
 .map(x=>({id:x[1],category:x[2],href:x[3],image:x[4]}));
const dmPart=html.slice(html.indexOf('const diabetesTools=['),html.indexOf('/* Calculator cards with their own integrated UX'));
const diabetes=[...dmPart.matchAll(/\{id:'([^']+)',title:'[^']+',short:'[^']+',category:'([^']+)'\}/g)]
 .map(x=>({id:x[1],category:x[2]}));
const otherPart=html.slice(html.indexOf('const integratedCalculators=['),html.indexOf('const countedCalculatorRegistry='));
const integrated=[...otherPart.matchAll(/\{id:'([^']+)',category:'([^']+)'\}/g)]
 .map(x=>({id:x[1],category:x[2]}));
assert.equal(defs.length,84,'Core engine tool count');
assert.equal(external.length,46,'Illustrated standalone entries');
assert.equal(diabetes.length,6,'Diabetes utilities');
assert.equal(integrated.length,2,'Integrated PAS and gasometry panel');
assert.deepEqual(integrated.map(x=>x.id).sort(),['gasometria','pas']);
const all=[...defs,...external,...diabetes,...integrated];
assert.equal(all.length,138,'Complete tool count in main catalog');
assert.equal(new Set(all.map(x=>x.id)).size,138,'Do not duplicate registered tool IDs');
for(const item of external)assert.ok(fs.existsSync('assets/'+item.image),'Missing cover for '+item.id);
const count=cat=>all.filter(x=>cat==='Todas'||x.category===cat).length;
assert.equal(count('Todas'),138);
assert.equal(count('Pediatría'),35);
assert.equal(count('Urgencias y Terapia Intensiva'),21);
assert.equal(count('Endocrinología y Diabetes'),6);
assert.equal(count('Geriatría'),10);
assert.equal(count('Hepatología'),9);
assert.equal(count('Cardiología'),11);
assert.equal(count('Ginecología y obstetricia'),7);
const categories=html.match(/const categories=\[([^\]]+)\]/)?.[1].match(/'[^']+'/g).map(x=>x.slice(1,-1))||[];
assert.equal(categories.length,15);
assert.equal(categories.slice(1).reduce((n,c)=>n+count(c),0),138,'Category badges sum to global count');
const rapidPart=html.slice(html.indexOf('const rapidTools=['),html.indexOf('const rapidCards='));
const rapid=[...rapidPart.matchAll(/\{id:'([^']+)',title:'([^']+)'/g)].map(x=>x[1]);
assert.deepEqual(rapid,['tep','wood','kramer','pas']);
const aliases={tep:'pediatrictep',wood:'woodferres',kramer:'kramer',pas:'pas'};
for(const id of rapid)assert.ok(all.some(x=>x.id===aliases[id]),'Unregistered pediatric visual calculator '+id);
assert.match(html,/id:'pas',category:'Pediatría'/);
assert.match(html,/id:'gasometria',category:'Urgencias y Terapia Intensiva'/);
assert.match(html,/const countedCalculatorRegistry=\[\.\.\.defs,\.\.\.externalCalculators,\.\.\.diabetesTools,\.\.\.integratedCalculators\]/);
assert.match(html,/const calculatorCount=\(cat='Todas'\)=>countedCalculatorRegistry\.filter/);
assert.match(html,/<strong>\$\{calculatorCount\(\)\}<\/strong>calculadoras/);
assert.match(html,/class="chip-count">\$\{calculatorCount\(c\)\}/);
assert.match(html,/const count=calculatorCount\(c\)/);
assert.match(html,/data-gasometria-open/);
assert.match(html,/data-ped-rapid/);
assert.match(html,/Módulo farmacológico no puntuable; no se incluye en el recuento de calculadoras/);
assert.match(html,/content="0\.10\.47"/);
assert.match(sw,/catalog-count-audit-v01047/);
console.log('PASS catalog: 84 core + 46 external + 6 diabetes + PAS + gasometry = 138 unique calculators; Pediatrics 35; Urgencias 21; specialty totals sum to 138. Pharma resources excluded.');
