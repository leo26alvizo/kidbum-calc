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
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const base='http://127.0.0.1:'+port;
 try{
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
     await page.evaluate(()=>go('calc','bmi'));
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
    await page.evaluate(()=>go('gasometria'));
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
 }finally{await browser.close();await stop()}
 if(failures.length){console.error(failures.length+' tests failed');process.exitCode=1}
 else console.log('All responsive clinical-results smoke tests passed');
}
main().catch(e=>{console.error(e);process.exitCode=1;stop().catch(()=>{})});
