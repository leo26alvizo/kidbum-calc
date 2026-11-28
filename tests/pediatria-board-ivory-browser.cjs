'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict'),url=require('node:url');
const root=path.resolve(__dirname,'..'),chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/google-chrome-stable'].filter(Boolean).find(fs.existsSync);
assert.ok(chrome,'Chromium required');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'kidbum-board-'));
const src=fs.readFileSync(path.join(root,'pediatria-board.html'),'utf8');
const script=String.raw`<script>
window.confirm=()=>true;
window.addEventListener('DOMContentLoaded',()=>{
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],check=(v,m)=>{if(!v)throw Error(m)},click=s=>{const el=$(s);check(el,'missing '+s);el.click()},view=()=>document.documentElement.dataset.boardView,history=()=>JSON.parse(localStorage.getItem('kidbum-pediatria-board-history-v1')||'{}');
try{
localStorage.removeItem('kidbum-pediatria-board-history-v1');
check(view()==='home','home rendered');check($('.radar-chart')&&!$('.radar-fill'),'no fabricated radar');check(all('#source-list li').length===11,'source bibliography');check($('[data-mode=repaso]').disabled,'empty review disabled');check(all('[data-mode]').length===7,'all seven modes');check($('#bank-total').textContent==='72'&&$('#bank-advanced').textContent==='24'&&$('#bank-areas').textContent==='11/16','live counts');
check(document.documentElement.scrollWidth<=innerWidth+3,'home overflow');check($('.crest').complete&&$('.crest').naturalWidth>0,'crest loaded');
if(document.documentElement.dataset.theme!=='light')click('#theme');const scheme=()=>getComputedStyle(document.documentElement).colorScheme;const color=s=>getComputedStyle($(s)).backgroundColor;const lightHome=color('body'),lightRadar=color('.radar-overview'),lightMode=color('[data-mode=board]'),lightHero=color('.hero');check(scheme()==='light','home light color scheme');click('#theme');check(scheme()==='dark'&&color('body')!==lightHome&&color('.radar-overview')!==lightRadar&&color('[data-mode=board]')!==lightMode&&color('.hero')!==lightHero,'entire home changes theme');check(localStorage.getItem('kidbum-pediatria-board-theme')==='dark','dark persisted');click('#theme');check(scheme()==='light'&&color('body')===lightHome&&localStorage.getItem('kidbum-pediatria-board-theme')==='light','home light restored');
click('[data-mode=board]');check(view()==='question'&&scheme()==='light','practice inherits light');check(getComputedStyle($('.hero')).display==='none','focus mode');check(all('[data-choice]').length===4,'four options');
check($('#confirm').disabled,'requires input');click('[data-choice]');check($('#confirm').disabled,'requires confidence');click('input[name=board-confidence][value=seguro]');check(!$('#confirm').disabled,'enabled');click('#confirm');check($('#feedback').textContent.includes('Respuesta'),'feedback');check(Object.keys(history()).length===1,'history persisted');
check(document.documentElement.scrollWidth<=innerWidth+3,'question overflow');click('#theme');check(document.documentElement.dataset.theme==='dark','dark theme');click('#theme');check(document.documentElement.dataset.theme==='light','ivory theme');
click('#exit');check(view()==='home'&&scheme()==='light'&&color('body')===lightHome,'exit returns light home');click('[data-mode=simulador]');check($('#clock')&&$('#feedback').textContent==='','exam no feedback');click('[data-choice]');click('input[name=board-confidence][value=dudoso]');click('#confirm');check($('#feedback').textContent==='','exam does not reveal answer');click('#end');check(view()==='result'&&$('.review')&&scheme()==='light','result and review in light');click('#theme');check(scheme()==='dark','result dark');click('#theme');check(scheme()==='light','result light');click('#back');check(view()==='home','return radar');check(Object.keys(history()).length>=1,'history retained');check($('.radar-fill'),'radar after real attempt');const before=location.href;click('#radar-detail-link');check($('#area-detail').open,'area detail opens');check(location.href===before,'radar navigation stays in document');click('.board-tabs a[href="#bibliografia"]');check(location.href===before,'bibliography navigation stays in document');const section=$('#section');section.value='Genética';section.dispatchEvent(new Event('change'));check($('[data-mode=board]').disabled&&$('[data-mode=simulador]').disabled,'uncovered advanced area disabled');check(!$('[data-mode=directa]').disabled,'foundation remains available');document.body.dataset.qa='pass';
}catch(e){document.body.dataset.qa='fail';document.body.dataset.qaError=String(e)}
});
</script>`;
try{
const file=path.join(tmp,'board.html');fs.writeFileSync(file,src.replace('<head>','<head><base href="'+url.pathToFileURL(root+path.sep).href+'">').replace('</body>',script+'</body>'));
for(const size of ['390,844','1280,900']){
const out=cp.execFileSync(chrome,['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--allow-file-access-from-files','--window-size='+size,'--user-data-dir='+path.join(tmp,'profile-'+size.replace(',','-')),'--dump-dom','--virtual-time-budget=4000',url.pathToFileURL(file).href],{encoding:'utf8',timeout:45000,maxBuffer:10*1024*1024,stdio:['ignore','pipe','ignore']});
assert.match(out,/data-qa="pass"/,size+' '+(out.match(/data-qa-error="[^"]*"/)||[]).join(''));console.log('PASS Board Ivory Heritage '+size);
}
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
