'use strict';
// Standalone SNNOOP10 clinical guide: content, no invented scores, offline availability.
const fs=require('node:fs'),assert=require('node:assert/strict');
const page=fs.readFileSync('snnoop10.html','utf8');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const clinicalTopics=[
 'Síntomas sistémicos','Antecedente de neoplasia','Déficit neurológico',
 'Inicio súbito','edad avanzada','Cambio del patrón',
 'relacionada con la posición','Valsalva','Papiledema',
 'progresiva','Embarazo o puerperio','Ojo doloroso',
 'traumatismo','Inmunodeficiencia','Sobreuso de analgésicos'
];
const match=page.match(/const FLAGS=(\[[\s\S]*?\]);\s*const flags=/);
assert.ok(match,'SNNOOP10 dataset must be declared as static JSON');
const items=JSON.parse(match[1]);
assert.equal(items.length,15,'Original SNNOOP10 presents 15 groups of red/orange flags');
assert.deepEqual(items.map(item=>item[0]),clinicalTopics.map(part=>items.find(item=>item[0].includes(part))?.[0]));
for(const [i,row] of items.entries()){
 assert.equal(row.length,5,'Each red flag provides differential, clue, alternatives and urgency: '+i);
 assert.ok(row.every((x,j)=>typeof x==='string'&&x.length>(j===0?4:15)),'Every clinical element must be populated: '+i);
}
assert.ok(page.includes('type=\'checkbox\'')||page.includes("input.type='checkbox'"),'Multiselect clinical findings');
assert.match(page,/textContent=text/,'Clinical text must be inserted without HTML interpretation');
assert.match(page,/replaceChildren\(\)/,'Selection must replace prior results');
assert.match(page,/no representan probabilidades/i,'Do not claim probability from a red flag');
assert.match(page,/Una sola bandera puede requerir atención inmediata/i,'No false reassurance');
assert.match(page,/10\.1212\/WNL\.0000000000006697/,'Cite original SNNOOP10 publication');
assert.match(index,/href="\.\/snnoop10\.html"/,'Module discoverable in home library');
assert.match(sw,/'\.\/snnoop10\.html'/,'Precache the module for offline use');
assert.match(sw,/20261020-snnoop10/,'Rotate cache when adding new HTML');
console.log('SNNOOP10 checks PASSED: 15 independent flags, descriptions, multi-selection, bibliographic reference and offline cache.');

// The approved anatomical cover must be present before deployment.
assert.ok(fs.existsSync('assets/snnoop10-portada.jpg'),'Falta la fotografía original assets/snnoop10-portada.jpg; no publicar portada vacía.');
assert.match(page,/url\('\.\/assets\/snnoop10-portada\.jpg'\)/);
