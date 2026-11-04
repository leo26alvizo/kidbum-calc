'use strict';
/* Temporary HTML fixtures for screenshot-only QA. The production page stays unchanged. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const base=fs.readFileSync(path.join(root,'pediatria-evaluacion-rapida.html'),'utf8');
const cases={
 tep:[
  "for(const name of ['apariencia','circulacion'])document.querySelector('[data-tep-field=\"'+name+'\"] [data-tep-value=\"normal\"]').click();",
  "document.querySelector('[data-tep-field=\"respiracion\"] [data-tep-value=\"alterada\"]').click();"
 ].join(''),
 wood:"for(const id of ['sibilancias','tiraje','fr','fc','ventilacion','cianosis'])document.querySelector('[data-wood-field=\"'+id+'\"][data-wood-value=\"0\"]').click();document.querySelector('[data-wood-field=\"sibilancias\"][data-wood-value=\"3\"]').click();document.querySelector('[data-wood-field=\"tiraje\"][data-wood-value=\"2\"]').click();",
 kramer:"document.querySelector('#kramer-buttons [data-zone=\"4\"]').click();",
 kramer5:"document.querySelector('#kramer-buttons [data-zone=\"5\"]').click();",
 dark:"document.querySelector('#rapid-theme').click();for(const name of ['apariencia','respiracion','circulacion'])document.querySelector('[data-tep-field=\"'+name+'\"] [data-tep-value=\"normal\"]').click();"
};
for(const [key,client] of Object.entries(cases)){
 const target=key==='dark'?'tep':(key==='kramer5'?'kramer':key);
 const script='<script>addEventListener("load",()=>setTimeout(()=>{location.hash="#'+target+'";dispatchEvent(new Event("hashchange"));'+client+'},200));</script>';
 const html=base.replace('</body>',script+'</body>');
 const file=path.join(root,'.pediatria-visual-'+key+'.html');
 fs.writeFileSync(file,html);
}
console.log('Prepared four local pediatric screenshot fixtures.');
