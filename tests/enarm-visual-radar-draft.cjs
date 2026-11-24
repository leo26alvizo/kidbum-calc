'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({});ctx.window=ctx;
const run=p=>new vm.Script(fs.readFileSync(p,'utf8'),{filename:p}).runInContext(ctx);
run('assets/enarm-bank-v01064.js');run('assets/enarm-radar-v01065.js');
for(const c of ['mi','ped','go','cg','urg','mf','sp'])run('assets/enarm-direct-'+c+'-v01068.js');
run('assets/enarm-direct-bank-v01068.js');
const original=JSON.stringify(ctx.KidBumDirectBank.items);
run('assets/enarm-expansion-draft.js');run('assets/enarm-visual-bank-draft.js');run('assets/enarm-unified-radar-draft.js');
const d=ctx.KidBumDirectBank,v=ctx.KidBumVisualBank,c=ctx.KidBumENARMBank,r=ctx.KidBumENARMRadar,a=ctx.KidBumUnifiedRadar;
assert.equal(d.questionCount,238);assert.equal(JSON.stringify(d.items.slice(0,210)),original);
assert.equal(new Set(d.items.map(q=>q.id)).size,238);assert.equal(new Set(d.items.map(q=>q.prompt)).size,238);assert.equal(v.items.length,61);assert.equal(Object.keys(v.figures).length,6);
for(const q of [...d.items,...v.items]){assert.equal(new Set(q.options).size,4);assert.ok(q.correct>=0&&q.correct<4);assert.ok(q.why.length>40)}
for(const q of v.items)assert.ok(v.clinical[q.figure]||v.figures[q.figure]?.startsWith('<svg'));
const empty=a.aggregate(c,d,v,{},r,1000);assert.equal(empty.total,373);assert.equal(empty.unique,0);assert.ok(empty.areas.every(x=>x.accuracy===null));
const id=d.items[0].id,vid=v.items[0].id;const histories={direct:{[id]:{seen:2,right:1,wrong:1}},visual:{[vid]:{seen:1,right:1}},cases:{}};
const before=JSON.stringify(histories),stats=a.aggregate(c,d,v,histories,r,1000);
assert.equal(stats.unique,2);assert.equal(stats.attempts,3);assert.equal(stats.correct,2);assert.equal(stats.due,2);assert.equal(JSON.stringify(histories),before);assert.equal(stats.priority,null);
for(const p of ['assets/enarm-visual-ui-draft.js','assets/enarm-direct-ui-v01068.js','sw.js'])new vm.Script(fs.readFileSync(p,'utf8'),{filename:p});
const sw=fs.readFileSync('sw.js','utf8');for(const p of ['enarm-visual.html','assets/enarm-visual-bank-draft.js','assets/enarm-visual-ui-draft.js','assets/enarm-unified-radar-draft.js','assets/enarm-expansion-draft.js','assets/enarm-visual-radar-draft.css'])assert.ok(sw.includes("'./"+p+"'"));
console.log('PASS 373 questions, preserved IDs and read-only radar aggregation');

assert.equal(Object.keys(v.clinical).length,29);for(const a of Object.values(v.clinical)){assert.ok(a.credit&&a.license&&a.record.startsWith('https://'));const p='assets/enarm-clinical/'+a.file;assert.ok(sw.includes("'./"+p+"'"));const bytes=fs.readFileSync(p);assert.ok(bytes.length>1000&&bytes[0]===255&&bytes[1]===216,'Actual local JPEG '+p);}
assert.match(fs.readFileSync('assets/enarm-visual-ui-draft.js','utf8'),/showModal\(/);

assert.ok(v.items.every(q=>q.category!=='Epidemiología'));assert.equal(v.items.filter(q=>v.clinical[q.figure]).length,57);assert.equal(new Set(v.items.map(q=>q.id)).size,61);for(const id of ['visual-010','visual-011','visual-012'])assert.ok(!v.items.some(q=>q.id===id));const retired=a.aggregate(c,d,v,{visual:{'visual-010':{seen:3,right:2,wrong:1}}},r,1000);assert.equal(retired.unique,0);assert.equal(retired.total,373);

assert.equal(new Set(v.items.map(q=>q.prompt)).size,61);for(const id of ['visual-033','visual-035','visual-037','visual-039','visual-041','visual-043'])assert.ok(v.clinical[v.items.find(q=>q.id===id).figure]);

const otoscopy=v.items.filter(q=>q.category==='Otoscopía');assert.equal(otoscopy.length,20);assert.equal(new Set(otoscopy.map(q=>q.figure)).size,10);assert.ok(otoscopy.every(q=>v.clinical[q.figure]&&q.source.startsWith('https://')));for(const q of otoscopy)assert.ok(['Medicina Interna','Pediatría','Urgencias'].includes(q.area));
