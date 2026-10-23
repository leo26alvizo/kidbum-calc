'use strict';
/* Independent geriatrics clinical tests: no inputs are silently assumed normal. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync('assets/geriatria-escalas.js','utf8');
const ctx={window:{}};new vm.Script(script,{filename:'geriatria-escalas.js'});vm.runInNewContext(script,ctx);
const {tools,evaluate,examples,sources}=ctx.window.KidBumGeriatria;
const ids=['katz','barthel','lawton','frail','sarcf','mnasf','tug','sppb'];
assert.deepEqual(Array.from(tools,t=>t.id),ids);
assert.equal(new Set(ids).size,8);
for(const def of tools){
 assert.match(def.source,/^https:\/\//);
 assert.ok(def.warning.length>90,'Safety message '+def.id);
 assert.ok(fs.existsSync('assets/'+def.image),'Missing original illustration '+def.id);
 assert.equal(evaluate(def,{}),null,'Missing data must block '+def.id);
 const example=examples[def.id];assert.ok(example,'No fictional example '+def.id);
 assert.deepEqual(Object.keys(example).sort(),Array.from(def.fields,f=>f.key).sort(),'Example must match exact fields '+def.id);
 const out=evaluate(def,example);
 assert.ok(out&&out.display&&out.interpretation,'Incomplete vignette '+def.id);
 for(const f of def.fields){
  const without={...example};delete without[f.key];
  if(!(def.id==='tug'&&f.key==='seconds'&&example.status==='unable'))
   assert.equal(evaluate(def,without),null,'Cannot assume a missing answer: '+def.id+'/'+f.key);
  const invalid={...example,[f.key]:'-999'};assert.equal(evaluate(def,invalid),null,'Out of range: '+def.id+'/'+f.key);
 }
}
const check=(id,fixture,expected,interpretation='')=>{
 const actual=evaluate(id,fixture);
 assert.ok(actual,'Missing result '+id);
 assert.equal(actual.display,expected,'Incorrect score '+id);
 if(interpretation)assert.match(actual.interpretation,new RegExp(interpretation,'i'));
};
check('katz',examples.katz,'4/6');
check('barthel',examples.barthel,'65/100');
check('lawton',examples.lawton,'4/8');
check('frail',examples.frail,'3/5','fragilidad');
check('sarcf',examples.sarcf,'6/10','positivo');
check('mnasf',examples.mnasf,'7/14','desnutrición');
check('tug',examples.tug,'15.2 segundos','riesgo');
check('sppb',examples.sppb,'6/12','reducido');
const all=(id,which)=>Object.fromEntries(tools.find(x=>x.id===id).fields.map(f=>[f.key,String(f.type==='choice'?f.options[which==='max'?f.options.length-1:0][0]:f.min)]));
check('katz',all('katz','min'),'6/6'); // Katz's first option is independent
check('katz',all('katz','max'),'0/6');
check('barthel',all('barthel','min'),'0/100');
check('barthel',all('barthel','max'),'100/100');
check('lawton',all('lawton','min'),'8/8'); // All eight are scored regardless of sex
check('lawton',all('lawton','max'),'0/8');
check('frail',all('frail','min'),'0/5');
check('frail',all('frail','max'),'5/5');
check('sarcf',all('sarcf','min'),'0/10');
check('sarcf',all('sarcf','max'),'10/10');
check('mnasf',all('mnasf','min'),'0/14');
check('mnasf',all('mnasf','max'),'14/14');
check('sppb',all('sppb','min'),'0/12');
check('sppb',all('sppb','max'),'12/12');
check('sarcf',{...examples.sarcf,strength:'0',walk:'1',rise:'1',stairs:'1',falls:'1'},'4/10','positivo');
check('mnasf',{a:'2',b:'3',c:'2',d:'2',e:'2',f:'1'},'12/14','normal');
check('mnasf',{a:'2',b:'2',c:'1',d:'2',e:'2',f:'2'},'11/14','riesgo');
check('tug',{status:'done',seconds:'12'},'12 segundos','riesgo');
check('tug',{status:'done',seconds:'11.99'},'11.99 segundos','no descarta');
check('tug',{status:'unable'},'No evaluable','insegura');
assert.equal(evaluate('tug',{status:'done',seconds:'0'}),null,'TUG cannot be zero');
assert.equal(evaluate('tug',{status:'done',seconds:'abc'}),null);
assert.equal(evaluate('tug',{status:'done',seconds:'Infinity'}),null);
assert.equal(evaluate('tug',{status:'done',seconds:'301'}),null);
assert.equal(evaluate('tug',{status:'done',seconds:'13e1'}),null);
assert.equal(evaluate('katz',{...examples.katz,bath:'2'}),null);
assert.equal(evaluate('sppb',{...examples.sppb,gait:'5'}),null);
assert.ok(tools.find(x=>x.id==='mnasf').warning.includes('NO reproduce'));
assert.ok(tools.find(x=>x.id==='lawton').warning.includes('0–5'));
assert.ok(tools.find(x=>x.id==='sarcf').warning.includes('NO descarta'));
const h=fs.readFileSync('geriatria-escalas.html','utf8');
assert.match(h,/id="example"/);assert.match(h,/id="reset"/);assert.match(h,/id="copy"/);
assert.match(h,/KidBumAnalysis\.attach/);assert.match(h,/id="kb-ai-mount"/);
assert.match(h,/src="\.\/assets\/geriatria-escalas\.js"/);
assert.match(h,/localStorage\.getItem\('kidbum-theme'\)/);
assert.match(h,/@media\(max-width:800px\)/);
assert.ok(!/\bfetch\(|XMLHttpRequest|indexedDB/.test(h+script),'Patient data must not be transmitted');
const home=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
for(const id of ids){
 assert.match(home,new RegExp("id:'"+id+"',category:'Geriatría',href:'\\./geriatria-escalas\\.html#"+id+"'"));
 assert.match(home,new RegExp('data-geriatria'));
}
assert.match(home,/geriatricCards/);
assert.match(sw,/'\.\/geriatria-escalas\.html'/);
assert.match(sw,/'\.\/assets\/geriatria-escalas\.js'/);
console.log('GERIATRICS PASS: 8 independent scales, boundary cases, zero assumptions, copyright care, illustrations, offline navigation.');
