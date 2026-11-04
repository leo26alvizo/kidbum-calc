'use strict';
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(root,'pharma-pro.html'),'utf8');
function fixture(name,client){
 if(!src.includes('</body>'))throw Error('Pharma HTML closing body not found');
 const js='<script>window.addEventListener("load",()=>setTimeout(function(){'+client+'},250));</script>';
 const output=src.replace('</body>',js+'</body>');
 fs.writeFileSync(path.join(root,'.pharma-visual-'+name+'.html'),output);
}
fixture('full',"window.KidBumPharmaUI.openDrug('ceftriaxona');document.querySelector('.pharma-ux-switcher button:nth-child(2)').click();document.querySelectorAll('.pharma-ux-fold')[0].open=true;");
fixture('dark',"if(!document.documentElement.classList.contains('dark'))document.getElementById('theme').click();");
console.log('Visual QA fixtures: full medication sheet and dark catalog.');
