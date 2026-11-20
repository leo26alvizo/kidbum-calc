'use strict';
/* v0.10.57: nonclinical search, privacy, bookmarks, offline integrity and a11y. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const html=read('index.html'),sw=read('sw.js');
const code=read('assets/clinical-access-v01057.js'),css=read('assets/clinical-access-v01057.css');
const meds=read('assets/clinical-drug-names-v01057.js');
const memory=new Map();
global.localStorage={
 getItem:key=>memory.has(key)?memory.get(key):null,
 setItem:(key,value)=>memory.set(key,String(value)),
 removeItem:key=>memory.delete(key)
};
memory.set('kidbum-access-recent-v1',JSON.stringify(['calc:gcs']));
const access=require('../assets/clinical-access-v01057.js');
assert.equal(memory.has('kidbum-access-recent-v1'),false,'A previously stored history is deleted during migration');
assert.equal(access.normalize('ÁCIDO–BÁSE'),'acido base');
const fixtures=[
 {key:'calc:gcs',id:'gcs',title:'Escala de Glasgow',category:'Neurología',kind:'Calculadora'},
 {key:'url:./algoritmos-pediatria.html',id:'algoritmos-pediatria',title:'Algoritmos clínicos de Pediatría',category:'Pediatría',kind:'Algoritmos'},
 {key:'url:./pharma-pro.html',id:'pharma-pro',title:'Pharma Pro',category:'Farmacología',kind:'Módulo'}
];
assert.equal(access.searchEntries(fixtures,'GLASGOW')[0].key,'calc:gcs');
assert.equal(access.searchEntries(fixtures,'gcs')[0].key,'calc:gcs');
assert.equal(access.searchEntries(fixtures,'Algoritmos PEDIATRÍA')[0].key,'url:./algoritmos-pediatria.html');
assert.equal(access.searchEntries(fixtures,'inexistente').length,0);
access.togglePin('url:./algoritmos-pediatria.html');
assert.ok(access.pinned().includes('url:./algoritmos-pediatria.html'),'Module bookmarks persist');
assert.equal(typeof access.remember,'undefined','No history writer is exposed');
assert.equal(typeof access.recent,'undefined','No recent tools API remains');
assert.equal(typeof access.trackClicks,'undefined','Click tracking is disabled');
assert.ok(access.pinned().includes('url:./algoritmos-pediatria.html'),'Favorites remain supported');
const sandbox={window:{}};
vm.runInNewContext(meds,sandbox,{timeout:1000});
const drugNames=sandbox.window.KidBumDrugSearchNames;
assert.ok(Array.isArray(drugNames)&&drugNames.length>=630,'Medication names were indexed from Pharma Pro');
assert.ok(drugNames.some(x=>x[0]==='ceftriaxona'&&x[1]==='Ceftriaxona'));
assert.ok(drugNames.some(x=>x[0]==='ácido-zoledrónico'));
const mapped=access.catalog([...fixtures,...drugNames.map(([id,name])=>({key:'url:./pharma-pro.html#'+id,id,title:name,category:'Pharma Pro',kind:'Medicamento'}))]);
assert.equal(access.searchEntries(mapped,'ceftriaxona')[0].key,'url:./pharma-pro.html#ceftriaxona');
assert.ok(!meds.includes('mg/kg'),'Search index must not include medication dosing');
for(const file of ['clinical-access-v01057.js','clinical-access-v01057.css','clinical-drug-names-v01057.js']){
 assert.ok(sw.includes("'./assets/"+file+"'"),'Offline precache missing '+file);
 assert.match(html,new RegExp(file.replace(/\./g,'\\.')),'HTML does not reference '+file);
}
assert.match(sw,/clinical-access-v01057/,'Cache generation must invalidate previous release atomically');
assert.match(sw,/cache\.addAll\(CORE_ASSETS\)/,'Atomic full install preserved');
assert.match(sw,/if\(cached\)return cached/,'Cache-first clinical runtime retained');
assert.match(html,/id="kb-access-slot"/,'Global access UI must be mounted');
assert.match(html,/kidbum-favs/,'Original calculator bookmarks remain present');
assert.match(html,/id="kb-offline-status" role="status" aria-live="polite"/);
assert.match(html,/id="kb-update-banner" hidden role="status"/);
assert.match(html,/Saltar al contenido principal/);
assert.match(html,/aria-controls="kb-access-slot calc-list"/);
assert.match(code,/aria-pressed/);
assert.match(css,/prefers-contrast:more/);
assert.match(css,/forced-colors:active/);
assert.match(css,/prefers-reduced-motion:reduce/);
assert.doesNotMatch(html,/window\.KidBumAccess\?\.trackClicks\(\)/);
assert.doesNotMatch(code,/Utilizadas recientemente|Borrar historial|data-kb-clear/);
assert.doesNotMatch(html,/KidBumAccess\?\.remember\(/);
assert.match(code,/removeItem\('kidbum-access-recent-v1'\)/,'Old history must be cleaned up');
assert.match(code,/offline aún no verificado/,'Offline success cannot be claimed before cache inspection');
assert.match(html,/KidBumAccess\?\.showUpdate\(\)/,'New-version notice must allow explicit reloading');
assert.match(html,/engine\.calculate\(id,data\)/,'Existing clinical calculation engine call preserved');
console.log('PASS mobile access v0.10.57: accent-insensitive universal search, Pharma links, no history, module favorites, atomic offline cache, truthful status and accessibility.');
