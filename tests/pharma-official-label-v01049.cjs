'use strict';
/* Pharma 0.10.49 · opt-in openFDA label reader QA. Tests inert-by-default
 * consent, candidate choice, unmodified source sections, privacy, and fallback.
 * This does NOT validate clinical doses or authorize a prescription. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const scripts=[
 'assets/pharma-pro-expansion.js',
 'assets/pharma-pro-guides-plus.js',
 'assets/pharma-pro-expansion-index-v01043.js',
 'assets/pharma-pro-core.js',
 'assets/pharma-label-lookup-v01049.js'
];
class Node{
 constructor(tag){this.tag=tag;this.textContent='';this.children=[];this.listeners={};this.attributes={};}
 append(...x){this.children.push(...x);}
 replaceChildren(...x){this.children=x;}
 setAttribute(k,v){this.attributes[k]=v;}
 addEventListener(k,fn){this.listeners[k]=fn;}
 find(tag){if(this.tag===tag)return this;for(const c of this.children){if(c.find){const t=c.find(tag);if(t)return t;}}return null;}
 all(tag){return [...(this.tag===tag?[this]:[]),...this.children.flatMap(c=>c.all?c.all(tag):[])];}
}
let calls=0,lastUrl='';
const sample={
 meta:{results:{total:315}},
 results:[{
   openfda:{generic_name:['AMOXICILLIN'],brand_name:['Sample brand'],manufacturer_name:['Sample manufacturer'],
    route:['ORAL'],product_type:['HUMAN PRESCRIPTION DRUG'],spl_set_id:['05b9b595-05d9-469f-82a3-c2bc94c50be2']},
   effective_time:'20261101',
   indications_and_usage:['For susceptible bacterial infections.'],
   dosage_and_administration:['This is an FDA label text excerpt, not a locally verified dose.'],
   contraindications:['Known serious hypersensitivity.'],
   pediatric_use:['See pediatric product labeling.']
 }]
};
const fakeDocument={createElement:tag=>new Node(tag)};
const context={window:{},document:fakeDocument,encodeURIComponent,AbortController,setTimeout,clearTimeout,
 fetch:async url=>{calls++;lastUrl=url;return {ok:true,json:async()=>sample};}};
for(const path of scripts){
 const content=fs.readFileSync(path,'utf8');
 new vm.Script(content,{filename:path});
 vm.runInNewContext(content,context,{timeout:5000,filename:path});
}
const lib=context.window.KidBumPharmaCore,engine=context.window.KidBumPharmaExternalLabels;
assert.equal(lib.records.length,643);
assert.ok(engine);
const input={id:'amoxicilina',name:'Amoxicilina'};
assert.equal(engine.defaultTerm(input),'amoxicillin');
assert.equal(engine.defaultTerm({id:'amoxicilina-clavulanato',name:'Amoxicilina / ácido clavulánico'}),'amoxicillin clavulanate');
assert.equal(engine.defaultTerm({id:'paracetamol',name:'Paracetamol'}),'acetaminophen');
assert.match(engine.buildApiUrl('amoxicillin'),/^https:\/\/api\.fda\.gov\/drug\/label\.json\?/);
assert.equal(engine.buildApiUrl('  a  '),null);
assert.equal(engine.buildQuery('omeprazole OR renal_impairment:*').includes(':"omeprazole or renal impairment *"'),false,'No wildcard or unquoted query operators');
assert.ok(engine.buildQuery('amoxicillin').includes('_exists_:dosage_and_administration'));
const sections=engine.labeledSections(sample.results[0]);
assert.ok(sections.some(s=>s.key==='dosage_and_administration'&&s.text.includes('FDA label text')));
assert.ok(sections.some(s=>s.key==='contraindications'));
assert.equal(engine.labeledSections({}).length,0);
for(const med of lib.records){
 const rendered=engine.render(med);
 assert.equal(rendered.tag,'section',med.id);
 assert.ok(rendered.find('form'));
}
assert.equal(calls,0,'Opening 643 forms MUST NOT contact any external server');
const dom=engine.render(input),form=dom.find('form'),inputNode=dom.find('input');
assert.ok(form&&inputNode);
assert.equal(inputNode.value,'amoxicillin');
(async()=>{
 await form.listeners.submit({preventDefault(){}});
 assert.equal(calls,1,'Network only after direct user submission');
 assert.ok(lastUrl.includes('openfda.generic_name'));
 const candidates=dom.all('article');
 assert.equal(candidates.length,1);
 assert.equal(candidates[0].all('details').length,0,'Never auto-select a label');
 const choose=candidates[0].find('button');assert.ok(choose);
 choose.listeners.click();
 const details=candidates[0].all('details');
 assert.ok(details.length>=3,'Display source sections after manual selection');
 assert.ok(JSON.stringify(details.map(x=>x.children.map(z=>z.textContent))).includes('FDA label text excerpt'));
 const src=fs.readFileSync('assets/pharma-label-lookup-v01049.js','utf8');
 assert.doesNotMatch(src,/localStorage|sessionStorage|sendBeacon|api\.openai\.com/,'No patient storage and no ChatGPT transfer');
 assert.doesNotMatch(src,/innerHTML|eval\s*\(/,'No HTML injection of supplier text');
 assert.match(src,/credentials:'omit'/);
 assert.match(src,/mode:'cors'/);
 assert.match(fs.readFileSync('assets/pharma-pro-ui.js','utf8'),/KidBumPharmaExternalLabels\?\.render\(med\)/);
 const page=fs.readFileSync('pharma-pro.html','utf8');
 const scriptNames=[...page.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(m=>m[1]);
 assert.equal(scriptNames.length,21,'Original label viewer and pediatric scripts remain, plus two nonprescriptive Pharma Pro 2.0 evidence files');
 assert.ok(scriptNames.indexOf('assets/pediatric-drug-references-v01055.js')<scriptNames.indexOf('assets/pharma-pro-ui.js'));

 assert.ok(scriptNames.indexOf('assets/pharma-label-lookup-v01049.js')<scriptNames.indexOf('assets/pharma-pro-ui.js'));
 const sw=fs.readFileSync('sw.js','utf8');
 assert.ok(sw.includes("'./assets/pharma-label-lookup-v01049.js'"));
 assert.match(sw,/pharma-spl-label-reader-v01049/);
 console.log('Pharma label viewer PASS: 643 opt-in links, manual product selection, source sections and offline fallback.');
})().catch(err=>{console.error(err);process.exitCode=1;});
