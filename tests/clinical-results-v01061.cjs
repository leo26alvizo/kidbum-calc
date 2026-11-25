// Visual regression smoke test for KidBum Clinical Results 2.0.
// Runs against local static files; no medical data is stored or transmitted.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.json':'application/json'};
function serverHandler(req,res){
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname)}catch{res.writeHead(400).end();return}
 const abs=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(abs!==root&&!abs.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.stat(abs,(err,st)=>{
  if(err||!st.isFile()){res.writeHead(404).end();return}
  res.setHeader('Content-Type',mime[path.extname(abs)]||'application/octet-stream');
  fs.createReadStream(abs).pipe(res);
 });
}
const httpServer=http.createServer(serverHandler);
const listen=()=>new Promise(resolve=>httpServer.listen(0,'127.0.0.1',()=>resolve(httpServer.address().port)));
const stop=()=>new Promise(resolve=>httpServer.close(resolve));
const failures=[];
async function test(name,fn){try{await fn();console.log('PASS',name)}catch(e){failures.push({name,error:e.message});console.error('FAIL',name,e.stack||e)}}
async function noHorizontalOverflow(page,label){
 const dims=await page.evaluate(()=>({screen:innerWidth,root:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 assert.ok(dims.root<=dims.screen+2&&dims.body<=dims.screen+2,label+' overflow '+JSON.stringify(dims));
}
async function main(){
 const port=await listen();
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
 const base='http://127.0.0.1:'+port;
 try{
  await test('lion splash — headlights, skip, session and reduced motion',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    const splash=page.locator('#kb-lion-splash');
    assert.equal(await splash.evaluate(el=>el.hidden),false,'cold start must show lion');
    assert.equal(await page.locator('.kb-lion-eye').count(),1,'paired headlights should be drawn');
    assert.match(await page.locator('.kb-lion-beam').first().evaluate(el=>getComputedStyle(el).animationName),/kb-lion-headlight/);
    assert.equal(await page.locator('.kb-lion-splash-skip').isVisible(),true,'skip must be visible');
    await page.locator('.kb-lion-splash-skip').click();
    await page.waitForFunction(()=>document.querySelector('#kb-lion-splash')?.hidden);
    assert.equal(await page.evaluate(()=>sessionStorage.getItem('kb-lion-splash-seen-v01062')),'1');
    await page.reload({waitUntil:'domcontentloaded'});
    assert.equal(await splash.evaluate(el=>el.hidden),true,'reload in the same session must not repeat');
    assert.equal(errors.length,0,'splash JavaScript errors: '+errors.join('; '));
   }finally{await context.close()}
   const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{
    const page=await reduced.newPage();
    await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#kb-lion-splash').evaluate(el=>el.hidden),true,'reduced-motion must skip splash');
    assert.equal(await page.locator('#search-input').isVisible(),true,'clinical search available immediately');
   }finally{await reduced.close()}
  });
  await test('lion splash — automatic timeout cannot block clinical controls',async()=>{
   const context=await browser.newContext({viewport:{width:320,height:740},serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelector('#kb-lion-splash')?.hidden,null,{timeout:3500});
    assert.equal(await page.locator('#search-input').isVisible(),true);
    await noHorizontalOverflow(page,'splash complete');
   }finally{await context.close()}
  });
  for(const width of [320,390,430,768]){
   await test(width+'px — home, BMI, missing, invalid and dark mode',async()=>{
    const context=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:1,serviceWorkers:'block'});
    try{
     const page=await context.newPage();
     const errors=[];
     page.on('pageerror',err=>errors.push(err.message));
     await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
     await page.locator('#main-content').waitFor();
     await page.waitForFunction(()=>document.querySelector('#main-content').children.length>0);
     const mobile=width<=740;
     assert.equal(await page.locator('.mobile-nav').isVisible(),mobile,'mobile navigation visibility');
     assert.equal(await page.locator('.sidebar').isVisible(),!mobile,'desktop sidebar visibility');
     await noHorizontalOverflow(page,'home');
     const finish=await page.evaluate(()=>{
      const card=document.querySelector('.calc-card');
      const styles=card&&getComputedStyle(card);
      return {
       loaded:[...document.styleSheets].some(sheet=>sheet.href?.includes('ultra-retina-v01063.css')),
       cardRadius:styles?.borderRadius||'',
       cardShadow:styles?.boxShadow||'',
       vectorNavigation:!!document.querySelector('#nav-menu [data-nav="home"] .kb-vector-icon'),
       mobileIcons:document.querySelectorAll('.mobile-nav button svg').length
      };
     });
     assert.equal(finish.loaded,true,'Premium CSS loaded');
     assert.ok(parseFloat(finish.cardRadius)>=16,'Cards receive premium rounded surfaces');
     assert.notEqual(finish.cardShadow,'none','Cards receive calibrated shadows');
     assert.equal(finish.vectorNavigation,true,'Desktop navigation uses SVG, not text glyphs');
     assert.equal(finish.mobileIcons,4,'All four mobile navigation icons are scalable vectors');
     await page.locator('#search-input').fill('Índice de masa corporal');
     await page.locator('[data-open="bmi"]').click();
     await page.locator('#f-weight').fill('70');
     await page.locator('#f-height').fill('175');
     await page.waitForFunction(()=>document.querySelector('#result-state')?.textContent==='Cálculo completado');
     assert.match(await page.locator('#result-value').innerText(),/22[.,]9/);
     assert.match(await page.locator('.result-interpret').innerText(),/Rango habitual/i);
     assert.equal(await page.locator('.result-unit').isVisible(),true);
     await noHorizontalOverflow(page,'BMI');
     await page.locator('#f-height').fill('');
     assert.equal(await page.locator('#result-state').innerText(),'Datos pendientes');
     assert.equal(await page.locator('#result-value').innerText(),'—');
     await page.locator('#f-height').fill('texto');
     assert.equal(await page.locator('#result-state').innerText(),'Revisar campos');
     assert.equal(await page.locator('#result-value').innerText(),'—');
     await page.evaluate(()=>document.documentElement.classList.add('dark'));
     await noHorizontalOverflow(page,'dark BMI');
     assert.equal(errors.length,0,'JS errors: '+errors.join('; '));
    }finally{await context.close()}
   });
  }
  await test('390px — gasometría and PAS results',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelector('#main-content').children.length>0);
    await page.locator('#search-input').fill('gasometria integrada');
    await page.locator('[data-gasometria-open]').click();
    await page.locator('#gas-example').click();
    assert.equal(await page.locator('#gas-state').innerText(),'Cálculo completado');
    assert.match(await page.locator('#gas-score').innerText(),/20[.,]0/);
    assert.equal(await page.locator('#gas-score .result-unit').innerText(),'mmol/L');
    await noHorizontalOverflow(page,'gasometria');
    await page.locator('#gas-form button[type=reset]').click();
    await page.waitForFunction(()=>document.querySelector('#gas-state')?.textContent==='Datos pendientes');
    await page.goto(base+'/pediatria-pas.html',{waitUntil:'domcontentloaded'});
    await page.locator('#pas-outcome').waitFor();
    assert.match(await page.locator('#pas-risk-name').innerText(),/incomplet|valoraci[oó]n/i);
    await noHorizontalOverflow(page,'PAS');
   }finally{await context.close()}
  });
  await test('Ultra Retina — standalone clinical modules at 390px',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    for(const path of ['pharma-pro.html','guardia-pro.html','documentacion.html','pediatria-pas.html']){
     await page.goto(base+'/'+path,{waitUntil:'domcontentloaded'});
     assert.equal(await page.locator('link[href*="ultra-retina-v01063.css"]').count(),1,path+' includes premium CSS');
     const ready=await page.evaluate(()=>[...document.styleSheets].some(sheet=>sheet.href?.includes('ultra-retina-v01063.css')));
     assert.equal(ready,true,path+' stylesheet actually applied');
     await noHorizontalOverflow(page,path);
    }
   }finally{await context.close()}
  });
  await test('ENARM — same-size shortcut below Pharma Pro at 320/390/768px',async()=>{
   for(const width of [320,390,768]){
    const context=await browser.newContext({viewport:{width,height:845},serviceWorkers:'block'});
    try{
     const page=await context.newPage();
     await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
     await page.locator('#search-input').waitFor();
     const pharma=page.locator('a.kb-resource-link[href="./pharma-pro.html"]');
     const enarm=page.locator('a.kb-enarm-link[href="./enarm.html"]');
     assert.equal(await pharma.count(),1);
     assert.equal(await enarm.count(),1);
     const p=await pharma.boundingBox(),e=await enarm.boundingBox();
     assert.ok(p&&e,'Both quick links should be rendered');
     assert.ok(Math.abs(p.width-e.width)<1,'Pharma/ENARM quick links must be same width at '+width+'px');
     assert.ok(Math.abs(p.height-e.height)<2,'Pharma/ENARM quick links must be same height at '+width+'px');
     assert.ok(e.y>=p.y+p.height-1,'ENARM must appear BELOW Pharma Pro at '+width+'px');
     await noHorizontalOverflow(page,'homepage ENARM '+width+'px');
     await enarm.click();
     await page.waitForURL(/enarm\.html/);
     assert.equal(await page.locator('.en-stat').count(),3);
     assert.match(await page.locator('#enarm-app').innerText(),/72\s+Casos originales/);
     assert.match(await page.locator('#enarm-app').innerText(),/144\s+Preguntas disponibles/);
     await noHorizontalOverflow(page,'ENARM '+width+'px');
     const links=await page.evaluate(()=>[...document.querySelectorAll('link[rel=stylesheet]')].map(x=>x.href));
     assert.ok(links.some(url=>url.endsWith('enarm-v01064.css')),'ENARM CSS should be applied');
     assert.ok(links.some(url=>url.endsWith('enarm-radar-v01065.css')),'Radar CSS should load');
     assert.equal(await page.locator('.en-radar-row').count(),7,'Radar lists all seven clinical areas');
     assert.ok(links.some(url=>url.endsWith('enarm-cobalt-v01066.css')),'Legacy Cobalt CSS must remain available');
     assert.ok(links.some(url=>url.endsWith('enarm-ivory-v01067.css')),'Ivory Heritage must load last');
     assert.ok(links.indexOf(links.find(url=>url.endsWith('enarm-ivory-v01067.css')))>links.indexOf(links.find(url=>url.endsWith('enarm-cobalt-v01066.css'))),'Ivory styles must take precedence over old blue colors');
     const artwork=page.locator('.en-hero-art');
     await artwork.evaluate(img=>img.decode());
     const art=await artwork.evaluate(img=>({complete:img.complete,width:img.naturalWidth,height:img.naturalHeight}));
     assert.ok(art.complete&&art.width===1400,'Premium lion SVG cover must be present');
     assert.equal(await page.locator('.en-mode').count(),4);
     assert.equal(await page.locator('.en-mode-icon svg').count(),4,'Each learning mode uses scalable icons');
     assert.equal(await page.locator('.en-area-icon svg').count(),7,'Seven medical specialty icons');
     const visual=await page.evaluate(()=>{
      const styles=getComputedStyle(document.documentElement);
      return{background:styles.getPropertyValue('--en-bg').trim(),images:[...document.querySelectorAll('.en-mode')].map(el=>getComputedStyle(el,'::before').backgroundImage)};
     });
     assert.equal(visual.background.toLowerCase(),'#f4f0e7','Ivory light-mode palette must replace cobalt by default');
     assert.ok(visual.images.every(v=>v.includes('atlas-')),'All four mode cards retain existing local clinical images');
     assert.equal(await artwork.getAttribute('src'),'./assets/enarm-hero-ivory-v01067.svg','Lion must appear in ivory heritage cover');
     const colors=await page.evaluate(()=>({body:getComputedStyle(document.body).color,hero:getComputedStyle(document.querySelector('.en-intro h1')).color,card:getComputedStyle(document.querySelector('.en-mode')).color,background:getComputedStyle(document.querySelector('.en-card')).backgroundColor}));
     assert.equal(colors.hero,'rgb(42, 39, 34)','Hero text is charcoal, not white-on-cobalt');
     assert.equal(colors.card,'rgb(48, 43, 37)','Study cards are charcoal on ivory');
     assert.notEqual(colors.background,'rgb(13, 42, 91)','Legacy blue cards must be overridden');
     await noHorizontalOverflow(page,'ENARM illustrated dashboard '+width);
    }finally{await context.close()}
   }
  });
  await test('ENARM — one-at-a-time feedback, weakness tracking, local persistence and mock exam',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    page.on('dialog',dialog=>dialog.accept());
    await page.goto(base+'/enarm.html',{waitUntil:'domcontentloaded'});
    await page.locator('#en-start').click();
    assert.equal(await page.locator('.en-case-img').count(),1,'Case vignette includes medical image');
    await page.locator('.en-case-img').evaluate(img=>img.decode());
    assert.ok(await page.locator('.en-case-img').evaluate(img=>img.naturalWidth>0),'Medical illustration must load locally');
    assert.equal(await page.locator('input[name="en-answer"]').count(),4);
    assert.equal(await page.locator('.en-feedback').count(),0,'No solution before answer');
    const answer=await page.evaluate(()=>{
     const title=document.querySelector('#en-question-title').textContent.trim();
     const all=window.KidBumENARMBank.cases.flatMap(c=>c.questions);
     const q=all.find(x=>x.prompt===title);
     if(!q)throw Error('Question not in bank');return q.correct;
    });
    await page.locator('input[name="en-answer"][value="'+((answer+1)%4)+'"]').check();
    await page.locator('#en-check').click();
    assert.equal(await page.locator('.en-feedback[data-correct="false"]').count(),1,'Shows clinical rationale after choosing wrong option');
    assert.ok((await page.locator('.en-feedback').innerText()).length>70);
    await page.locator('#en-exit').click();
    assert.equal(await page.locator('.en-mode').count(),4,'Return to dashboard including due review');
    assert.match(await page.locator('.en-statgrid').innerText(),/1 intento/);
    await page.locator('[data-mode="weak"]').click();
    assert.equal(await page.locator('#en-start').isEnabled(),true,'Wrong answer should create a weakness to practice');
    await page.reload({waitUntil:'domcontentloaded'});
    assert.match(await page.locator('.en-statgrid').innerText(),/1 intento/,'Progress survives reload');
    assert.equal(await page.locator('#en-due-start').isEnabled(),true,'A wrong answer is immediately available for review');
    assert.match(await page.locator('#en-radar').innerText(),/Muestra pequeña/,'Radar does not exaggerate one attempt');
    assert.equal(await page.locator('.en-radar-row').count(),7);
    await page.locator('#en-due-start').click();
    assert.match(await page.locator('#enarm-app').innerText(),/repaso de hoy/i);
    const correct=await page.evaluate(()=>{
     const prompt=document.querySelector('#en-question-title').textContent.trim();
     return window.KidBumENARMBank.cases.flatMap(c=>c.questions).find(q=>q.prompt===prompt).correct;
    });
    await page.locator('input[name="en-answer"][value="'+correct+'"]').check();
    await page.locator('#en-check').click();
    assert.equal(await page.locator('.en-feedback[data-correct="true"]').count(),1);
    await page.locator('#en-exit').click();
    assert.equal(await page.locator('#en-due-start').isEnabled(),false,'Correct answer moves today review to tomorrow');
    await page.locator('[data-mode="exam"]').click();
    await page.locator('#en-size').selectOption('10');
    await page.locator('#en-start').click();
    assert.equal(await page.locator('#en-clock').count(),1,'Mock exam clock');
    assert.equal(await page.locator('.en-feedback').count(),0,'Mock exam must not reveal solution while running');
    for(let i=0;i<9;i++)await page.locator('#en-next').click();
    await page.locator('#en-next').click();
    assert.match(await page.locator('#enarm-app').innerText(),/Revisión de preguntas/);
    assert.equal(await page.locator('.en-summary-item').count(),10,'Mock exam reviews all ten questions');
    await noHorizontalOverflow(page,'ENARM mock and feedback');
    assert.equal(errors.length,0,'ENARM JS errors: '+errors.join('; '));
   }finally{await context.close()}
  });
  await test('ENARM Radar — migrate old local progress with no fabricated dates',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    await page.addInitScript(()=>{
     localStorage.setItem('kidbum-enarm-progress-v1',JSON.stringify({'mi-01-0':{seen:3,right:2,wrong:1,streak:1}}));
    });
    await page.goto(base+'/enarm.html',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#en-due-start').isEnabled(),true,'Legacy answered item without dueAt becomes reviewable');
    assert.match(await page.locator('#en-radar').innerText(),/3 intentos/);
    const meta=await page.evaluate(()=>JSON.parse(localStorage.getItem('kidbum-enarm-progress-v1'))['mi-01-0']);
    assert.equal(meta.dueAt,undefined,'Migration must not silently invent historical dates');
    await page.locator('#en-theme').click();
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--en-bg').trim()),'#1D1B19','Theme toggle should use warm graphite, not blue');
    await noHorizontalOverflow(page,'ENARM Radar graphite dark');
   }finally{await context.close()}
  });
  await test('ENARM direct — 210 questions, seven specialties, six categories and responsive layout',async()=>{
   for(const width of [320,390,768]){
    const context=await browser.newContext({viewport:{width,height:845},serviceWorkers:'block'});
    try{
     const page=await context.newPage();
     const errors=[];page.on('pageerror',err=>errors.push(err.message));
     await page.goto(base+'/enarm.html',{waitUntil:'domcontentloaded'});
     assert.equal(await page.locator('.dq-entry a[href="./enarm-direct.html"]').count(),1,'Direct bank entry inside main ENARM');
     await page.locator('.dq-entry a[href="./enarm-direct.html"]').click();
     await page.waitForURL(/enarm-direct\.html/);
     assert.equal(await page.locator('.dq-stat').count(),3);
     assert.match(await page.locator('#direct-app').innerText(),/238/);
     assert.equal(await page.locator('.dq-mode').count(),4);
     assert.equal(await page.locator('#dq-area option').count(),8,'Seven areas + all');
     assert.equal(await page.locator('#dq-type option').count(),7,'Six categories + all');
     assert.equal(await page.locator('.dq-track-row').count(),6,'Six independent knowledge progress bars');
     const light=await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--en-bg').trim());
     assert.equal(light,'#F4F0E7','Retain Ivory Heritage by default');
     await page.locator('#dq-area').selectOption('Medicina Interna');
     assert.match(await page.locator('#dq-available').innerText(),/34 preguntas disponibles/);
     await page.locator('#dq-type').selectOption('Mecanismos');
     assert.match(await page.locator('#dq-available').innerText(),/7 preguntas disponibles/);
     await page.locator('#dq-search').fill('metformina');
     assert.match(await page.locator('#dq-available').innerText(),/1 preguntas disponibles/);
     await page.locator('#dq-start').click();
     assert.equal(await page.locator('input[name="dq-answer"]').count(),4);
     assert.equal(await page.locator('.dq-question-meta span').count(),2);
     assert.equal(await page.locator('.en-feedback').count(),0,'Do not reveal answer before submit');
     await noHorizontalOverflow(page,'ENARM direct '+width+'px');
     assert.equal(errors.length,0,'Direct question JS errors: '+errors.join('; '));
    }finally{await context.close()}
   }
  });
  await test('ENARM direct — study feedback, isolated history, due review and test without answer leaks',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    const errors=[];page.on('pageerror',err=>errors.push(err.message));
    page.on('dialog',dialog=>dialog.accept());
    await page.addInitScript(()=>{
     localStorage.setItem('kidbum-enarm-progress-v1',JSON.stringify({'mi-01-0':{seen:3,right:2,wrong:1,streak:1}}));
    });
    await page.goto(base+'/enarm-direct.html',{waitUntil:'domcontentloaded'});
    await page.locator('#dq-area').selectOption('Medicina Interna');
    await page.locator('#dq-type').selectOption('Mecanismos');
    await page.locator('#dq-search').fill('metformina');
    await page.locator('#dq-start').click();
    const answer=await page.evaluate(()=>{
     const title=document.querySelector('#dq-prompt').textContent.trim();
     const row=window.KidBumDirectBank.items.find(q=>q.prompt===title);
     if(!row)throw Error('Direct question missing from bank');
     return row.correct;
    });
    await page.locator('input[name="dq-answer"][value="'+((answer+1)%4)+'"]').check();
    await page.locator('#dq-check').click();
    assert.equal(await page.locator('.en-feedback[data-correct="false"]').count(),1,'Wrong answer shows specific explanation');
    assert.match(await page.locator('.en-feedback').innerText(),/Lectura general por especialidad/);
    await page.locator('#dq-exit').click();
    assert.equal(await page.locator('.dq-mode').count(),4);
    const local=await page.evaluate(()=>({
     direct:JSON.parse(localStorage.getItem('kidbum-enarm-direct-progress-v1')),
     cases:JSON.parse(localStorage.getItem('kidbum-enarm-progress-v1'))
    }));
    assert.equal(Object.keys(local.direct).length,1,'One direct question saved');
    assert.equal(local.cases['mi-01-0'].seen,3,'Existing case history untouched');
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('[data-dq-mode="weak"]').click();
    assert.match(await page.locator('#dq-available').innerText(),/1 preguntas disponibles/);
    await page.locator('[data-dq-mode="due"]').click();
    await page.locator('#dq-start').click();
    const correct=await page.evaluate(()=>{
     const title=document.querySelector('#dq-prompt').textContent.trim();
     return window.KidBumDirectBank.items.find(q=>q.prompt===title).correct;
    });
    await page.locator('input[name="dq-answer"][value="'+correct+'"]').check();
    await page.locator('#dq-check').click();
    assert.equal(await page.locator('.en-feedback[data-correct="true"]').count(),1);
    await page.locator('#dq-exit').click();
    assert.equal(await page.locator('#dq-start').isEnabled(),false,'Correct answer schedules next day');
    await page.locator('[data-dq-mode="exam"]').click();
    await page.locator('#dq-area').selectOption('Todas');
    await page.locator('#dq-type').selectOption('Todos');
    await page.locator('#dq-length').selectOption('10');
    await page.locator('#dq-start').click();
    assert.equal(await page.locator('#dq-clock').count(),1,'Practice timer available');
    assert.equal(await page.locator('.en-feedback').count(),0,'Exam never reveals answer before finish');
    for(let i=0;i<9;i++)await page.locator('#dq-next').click();
    await page.locator('#dq-next').click();
    assert.equal(await page.locator('.en-summary-item').count(),10,'Test reviews all ten questions');
    assert.equal(await page.locator('.en-indicator.skip').count(),10);
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kidbum-enarm-progress-v1'))['mi-01-0'].seen),3);
    await noHorizontalOverflow(page,'ENARM direct test results');
    assert.equal(errors.length,0,'Direct bank JS errors '+errors.join('; '));
   }finally{await context.close()}
  });
  await test('ENARM Visual clinical images — local file, zoom, attribution and progress',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    const errors=[];page.on('pageerror',err=>errors.push(err.message));
    await page.goto(base+'/enarm-visual.html',{waitUntil:'domcontentloaded'});
    await page.locator('#vis-image-mode').selectOption('clinical');
    assert.match(await page.locator('#vis-count').innerText(),/57 preguntas disponibles/);
    await page.locator('#vis-cat').selectOption('Imagen torácica');
    await page.evaluate(()=>{Math.random=()=>0.999999});
    await page.locator('#vis-start').click();
    const img=page.locator('#vis-clinical-img');
    await img.waitFor({state:'visible'});
    await page.waitForFunction(()=>document.querySelector('#vis-clinical-img')?.naturalWidth>0);
    assert.ok((await img.getAttribute('src')).startsWith('./assets/enarm-clinical/'));
    await page.locator('#vis-zoom').click();
    assert.equal(await page.locator('dialog.kb-image-dialog').isVisible(),true);
    await page.locator('dialog.kb-image-dialog button').click();
    await page.locator('[data-opt="3"]').click();
    assert.match(await page.locator('#vis-feedback').innerText(),/Correcto/);
    assert.equal(await page.locator('#vis-feedback a[href="https://doi.org/10.4103/1817-1737.69106"]').count(),1);
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kidbum-enarm-visual-progress-v1'))['visual-008'].seen),1);
    await noHorizontalOverflow(page,'ENARM Visual clinical');
    assert.equal(errors.length,0,errors.join('; '));
   }finally{await context.close()}
  });
  await test('Centor/McIsaac — search, missing data, scoring, alarm guard',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{const page=await context.newPage();await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    await page.locator('#search-input').fill('Centor');
    await page.locator('.calc-card').filter({hasText:'Centor / McIsaac'}).first().click();
    assert.equal(await page.locator('#result-state').innerText(),'Datos pendientes');
    await page.locator('#f-ageGroup').selectOption('3to14');
    for(const key of ['fever','noCough','nodes','tonsils'])await page.locator('#f-'+key).selectOption('true');
    for(const key of ['viral','alarm','highRisk'])await page.locator('#f-'+key).selectOption('false');
    assert.match(await page.locator('#result-value').innerText(),/5/);
    await page.locator('#f-ageGroup').selectOption('45plus');
    assert.match(await page.locator('#result-value').innerText(),/3/);
    await page.locator('#f-alarm').selectOption('true');
    assert.match(await page.locator('#result-value').innerText(),/No evaluable/);
    await noHorizontalOverflow(page,'Centor');
   }finally{await context.close()}
  });
  await test('ENARM Visual — otoscopy category, real images and feedback',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{const page=await context.newPage();await page.goto(base+'/enarm-visual.html',{waitUntil:'domcontentloaded'});
    await page.locator('#vis-cat').selectOption('Otoscopía');
    assert.match(await page.locator('#vis-count').innerText(),/20 preguntas disponibles/);
    await page.evaluate(()=>{Math.random=()=>0.999999});
    await page.locator('#vis-start').click();
    await page.waitForFunction(()=>document.querySelector('#vis-clinical-img')?.naturalWidth>0);
    assert.match(await page.locator('#vis-clinical-img').getAttribute('src'),/oto-01\.jpg$/);
    await page.locator('[data-opt="0"]').click();
    assert.match(await page.locator('#vis-feedback').innerText(),/Correcto/);
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kidbum-enarm-visual-progress-v1'))['visual-045'].seen),1);
    await noHorizontalOverflow(page,'ENARM otoscopy');
   }finally{await context.close()}
  });
  await test('Oftalmología — original cover, category, signed input and result',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{const page=await context.newPage();await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    const card=page.locator('[data-featured="Oftalmología"]');assert.equal(await card.count(),1);
    assert.match(await card.locator('img').getAttribute('src'),/oftalmologia-portada-original\.webp$/);
    await card.click();assert.equal(await page.locator('#calc-list article.calc-card').count(),15);
    await page.locator('#calc-list article.calc-card').filter({hasText:'Equivalente esférico'}).click();
    await page.locator('#f-sphere').fill('-2');await page.locator('#f-cylinder').fill('-1');
    assert.match(await page.locator('#result-value').innerText(),/-2.500 D/);
    await noHorizontalOverflow(page,'Oftalmología');
   }finally{await context.close()}
  });
  await test('Oftalmología clinical algorithms — category, urgent and uncertain branches, return and dark mode',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{const page=await context.newPage();await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});assert.equal(await page.locator('[data-oph-alg]').count(),0);await page.locator('[data-featured="Oftalmología"]').click();assert.equal(await page.locator('[data-oph-alg]').count(),1);assert.equal(await page.locator('#calc-list article.calc-card').count(),15);await page.locator('[data-oph-alg]').click();await page.waitForURL('**/algoritmos-oftalmologia.html');assert.equal(await page.locator('[data-algo-id]').count(),23);await page.locator('#alg-search-input').fill('QUERATITIS');assert.equal(await page.locator('[data-algo-id="queratitis"]').count(),1);await page.locator('#alg-search-input').fill('');await page.locator('[data-algo-id="quemadura-quimica"]').click();assert.match(await page.locator('#alg-interaction').innerText(),/irrigación copiosa inmediata/);await page.locator('[data-choice-index="2"]').click();assert.match(await page.locator('#alg-interaction').innerText(),/Incertidumbre/);await page.locator('#alg-back-step').click();await page.locator('[data-choice-index="1"]').click();await page.locator('[data-choice-index="0"]').click();assert.match(await page.locator('#alg-interaction').innerText(),/Quemadura de riesgo alto/);await page.locator('#alg-mode-estudio').click();assert.equal(await page.locator('#alg-evidence').getAttribute('open'),'');await page.locator('#alg-theme').click();await noHorizontalOverflow(page,'Algoritmos oftalmología');await page.locator('.alg-back').click();await page.waitForURL('**/index.html?especialidad=oftalmologia');assert.equal(await page.locator('[data-oph-alg]').count(),1);
   }finally{await context.close()}
  });

  await test('Examples — all core and diabetes tools, gasometry, PAS and cervical rule',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{
    const page=await context.newPage();
    await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
    await page.locator('[data-open]').first().waitFor();
    const core=await page.evaluate(()=>{
     const ids=[...document.querySelectorAll('[data-open]')].map(x=>x.dataset.open),failures=[];
     for(const id of ids){try{document.querySelector('[data-open="'+id+'"]').click();const b=document.querySelector('#example');if(!b||b.disabled)throw Error('No example button');b.click();const state=document.querySelector('.kb-result-modern')?.dataset.kbResultState;if(!['ready','not-evaluable'].includes(state))throw Error('State '+state);}catch(e){failures.push(id+': '+e.message);}finally{document.querySelector('#back')?.click();}}
     return {total:ids.length,failures};
    });
    assert.equal(core.total,100);assert.deepEqual(core.failures,[]);
    const diabetesIds=await page.locator('[data-diabetes]').evaluateAll(xs=>xs.map(x=>x.dataset.diabetes));
    assert.equal(diabetesIds.length,6);
    for(const id of diabetesIds){await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});await page.locator('[data-diabetes="'+id+'"]').click();await page.locator('#db-example').click();assert.equal(await page.locator('#db-copy').isEnabled(),true);}
    await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});await page.locator('[data-gasometria-open]').click();await page.locator('#gas-example').click();assert.equal(await page.locator('#gas-panel').getAttribute('data-kb-result-state'),'ready');
    await page.goto(base+'/pediatria-pas.html',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('[data-criterion]').count(),8);assert.equal(await page.locator('input,[data-flag]').count(),0);
    assert.equal(await page.locator('#pas-points').innerText(),'—');
    await page.locator('#pas-example').click();assert.equal(await page.locator('#pas-points').innerText(),'7');
    assert.match(await page.locator('#pas-completeness').innerText(),/8 de 8/);assert.equal(await page.locator('#pas-example-note').isVisible(),true);
    await page.locator('#pas-reset').click();assert.equal(await page.locator('#pas-points').innerText(),'—');assert.equal(await page.locator('#pas-example-note').isVisible(),false);
    await page.goto(base+'/ortopedia.html#ort-canadian-cspine',{waitUntil:'domcontentloaded'});
    await page.locator('#example').click();assert.equal(await page.locator('#ort-low').inputValue(),'1');await page.locator('#form button[type=submit]').click();assert.match(await page.locator('#output').innerText(),/Negativa/);
   }finally{await context.close()}
  });
  await test('Neurología PRO — 12 tools, examples, valid results, reset and return',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/index.html?especialidad=neurologia',{waitUntil:'domcontentloaded'});
    await page.locator('[data-neuro-pro]').first().waitFor();
    assert.equal(await page.locator('[data-neuro-pro]').count(),12);
    assert.equal(await page.locator('#calc-list article.calc-card').count(),20);
    const ids=await page.locator('[data-neuro-pro]').evaluateAll(xs=>xs.map(x=>x.dataset.neuroPro));
    for(const id of ids){
     await page.goto(base+'/neurologia.html#'+id,{waitUntil:'domcontentloaded'});
     await page.locator('#example').waitFor();assert.equal(await page.locator('#result').isVisible(),false);
     await page.locator('#example').click();await page.locator('#result').waitFor();assert.equal(await page.locator('#output .error').count(),0);
     assert.ok((await page.locator('#output strong').innerText()).trim());assert.equal(await page.locator('#example-note').isVisible(),true);
     await page.locator('#clear').click();assert.equal(await page.locator('#result').isVisible(),false);
     await noHorizontalOverflow(page,id);
    }
    assert.deepEqual(errors,[]);
    await page.locator('header nav a').click();await page.waitForURL('**/index.html?especialidad=neurologia');assert.equal(await page.locator('[data-neuro-pro]').count(),12);
   }finally{await context.close()}
  });
  await test('Neurología — 16 clinical pathways, palette, mobile and safe transitions',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
   try{
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/index.html?especialidad=neurologia',{waitUntil:'domcontentloaded'});
    await page.locator('[data-neuro-alg]').waitFor();
    await page.locator('[data-neuro-alg] .neuro-cover-art').evaluate(img=>img.decode());
    assert.equal(await page.locator('[data-neuro-alg] .neuro-cover-art').evaluate(img=>img.naturalWidth),1536);
    assert.equal(await page.locator('[data-neuro-alg] .neuro-cover-art').evaluate(img=>getComputedStyle(img).objectFit),'contain');
    assert.match(await page.locator('[data-neuro-alg]').evaluate(el=>getComputedStyle(el).backgroundImage),/255, 244, 223/);
    await page.locator('[data-neuro-alg]').click();
    await page.waitForURL('**/algoritmos-neurologia.html');
    await page.locator('.neuro-alg-cover').evaluate(img=>img.decode());
    assert.equal(await page.locator('.neuro-alg-cover').evaluate(img=>img.naturalWidth),1536);
    assert.equal(await page.locator('.neuro-alg-cover').evaluate(img=>img.naturalHeight),1152);
    assert.equal(await page.locator('[data-algo-id]').count(),16);
    assert.equal(await page.locator('body.alg-neuro').evaluate(el=>getComputedStyle(el).getPropertyValue('--p-teal').trim()),'#314b4c');
    await page.locator('[data-category="Raquimedular"]').click();assert.equal(await page.locator('[data-algo-id]').count(),4);
    await page.locator('[data-algo-id="cauda"]').click();
    await page.locator('[data-choice-index="0"]').click();assert.match(await page.locator('.alg-outcome').innerText(),/RM urgente/);
    await page.locator('#alg-back-step').click();await page.locator('[data-choice-index="2"]').click();assert.match(await page.locator('.alg-outcome').innerText(),/Información insuficiente/);
    await page.locator('#alg-restart').click();await page.locator('[data-choice-index="1"]').click();await page.locator('[data-choice-index="0"]').click();assert.match(await page.locator('.alg-outcome').innerText(),/RM/);
    await page.locator('#alg-theme').click();
    assert.equal(await page.locator('body.alg-neuro').evaluate(el=>getComputedStyle(el).getPropertyValue('--p-bg').trim()),'#211a16');
    await page.locator('#alg-theme').click();
    await noHorizontalOverflow(page,'Neurología algoritmos');assert.deepEqual(errors,[]);
   }finally{await context.close()}
  });
  await test('Neuro Pharma — contextual medication links and branch safety',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   try{const page=await context.newPage();
    await page.goto(base+'/algoritmos-neurologia.html#status',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('.neuro-pharma-panel').count(),0);
    await page.locator('[data-choice-index="0"]').click();assert.equal(await page.locator('.neuro-pharma-item').count(),6);
    assert.equal(await page.locator('.neuro-pharma-item a[href="./pharma-pro.html#lorazepam"]').count(),1);
    await page.locator('#alg-back-step').click();assert.equal(await page.locator('.neuro-pharma-panel').count(),0);
    await page.locator('[data-choice-index="2"]').click();assert.equal(await page.locator('.neuro-pharma-panel').count(),0);
    await page.goto(base+'/algoritmos-neurologia.html#cauda',{waitUntil:'domcontentloaded'});await page.locator('[data-choice-index="0"]').click();assert.equal(await page.locator('.neuro-pharma-panel').count(),0);
    await page.goto(base+'/algoritmos-neurologia.html#mscc',{waitUntil:'domcontentloaded'});await page.locator('[data-choice-index="0"]').click();
    const popup=context.waitForEvent('page');await page.locator('.neuro-pharma-item a').click();const med=await popup;await med.waitForURL(/pharma-pro\.html#dexametasona$/,{waitUntil:'domcontentloaded',timeout:20000});assert.match(med.url(),/pharma-pro\.html#dexametasona$/);await med.locator('#detail h2').filter({hasText:/Dexametasona/i}).first().waitFor({state:'attached'});assert.match(await med.locator('#detail').innerText(),/Dexametasona/i);assert.equal(await page.locator('.neuro-pharma-item').count(),1);await med.close();
    await noHorizontalOverflow(page,'Neuro Pharma');
   }finally{await context.close()}
  });
  await test('SAMPLE pediátrico — rapid history, example and clear',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   try{const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/index.html?especialidad=pediatria',{waitUntil:'domcontentloaded'});await page.locator('[data-ped-sample]').click();await page.waitForURL('**/pediatria-sample.html');assert.equal(await page.locator('#sample-fields textarea').count(),6);assert.equal(await page.locator('#sample-copy').isEnabled(),false);await page.locator('#sample-example').click();assert.match(await page.locator('#sample-summary').innerText(),/EJEMPLO FICTICIO/);assert.match(await page.locator('#sample-progress').innerText(),/6 de 6/);await page.locator('#sample-clear').click();assert.match(await page.locator('#sample-progress').innerText(),/0 de 6/);await page.locator('#sample-S').fill('Fiebre ficticia');assert.match(await page.locator('#sample-summary').innerText(),/Fiebre ficticia/);assert.match(await page.locator('#sample-summary').innerText(),/No documentado/);await noHorizontalOverflow(page,'SAMPLE');assert.deepEqual(errors,[]);
   }finally{await context.close()}
  });
 }finally{await browser.close();await stop()}
 if(failures.length){console.error(failures.length+' tests failed');process.exitCode=1}
 else console.log('All responsive clinical-results smoke tests passed');
}
main().catch(e=>{console.error(e);process.exitCode=1;stop().catch(()=>{})});
