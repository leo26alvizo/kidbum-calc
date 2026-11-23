/* KidBum ENARM 1.2 · 210 preguntas teóricas originales (no casos)
 * Fuentes: enlaces temáticos sugeridos, NO pruebas de validación de cada ítem.
 * Revisión clínica externa pendiente. No usar como guía de atención a pacientes.
 * Módulo local, sin funciones de red ni identificadores de pacientes. */
(function(root,factory){
 'use strict';
 const api=factory(root.KidBumDirectParts||[]);
 root.KidBumDirectBank=api;
 if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis,function(parts){
 'use strict';
 const TYPES=['Conceptos','Mecanismos','Fisiopatología','Criterios diagnósticos','Tratamientos','Alto rendimiento'];
 const READINGS={
  mi:[
   {label:'ADA Standards of Care 2026 · diagnóstico de diabetes',url:'https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926'},
   {label:'GINA 2026 · guía de asma',url:'https://ginasthma.org/2026-gina-summary-guide/'},
   {label:'Manual Merck · regulación ácido-base',url:'https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-regulation'}
  ],
  ped:[
   {label:'OMS · Manejo integrado de enfermedades infantiles',url:'https://www.who.int/publications/i/item/9789240103412'},
   {label:'CDC · Vacunación contra sarampión',url:'https://www.cdc.gov/measles/hcp/vaccine-considerations/'},
   {label:'CDC · Manejo ambulatorio pediátrico',url:'https://www.cdc.gov/antibiotic-use/hcp/clinical-care/pediatric-outpatient.html'}
  ],
  go:[
   {label:'ACOG · Preeclampsia y presión arterial en embarazo',url:'https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy'},
   {label:'OMS · Prevención y tratamiento de hemorragia posparto',url:'https://www.ncbi.nlm.nih.gov/books/NBK619233/table/ch3.tab28/'}
  ],
  cg:[
   {label:'WSES · Guías de apendicitis aguda 2025',url:'https://pubmed.ncbi.nlm.nih.gov/41604201/'},
   {label:'Manual Merck · dolor abdominal agudo',url:'https://www.merckmanuals.com/es-us/professional/trastornos-gastrointestinales/abdomen-agudo-y-gastroenterolog%C3%ADa-quir%C3%BArgica/dolor-abdominal-agudo'}
  ],
  urg:[
   {label:'AHA · Soporte vital básico adulto 2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support'},
   {label:'AHA · Soporte vital avanzado adulto 2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support/'},
   {label:'NICE NG39 · Atención inicial del trauma',url:'https://www.nice.org.uk/guidance/ng39/chapter/Recommendations'}
  ],
  mf:[
   {label:'ADA · Diagnóstico y clasificación de diabetes 2026',url:'https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926'},
   {label:'AHA/ACC · Guía de presión arterial 2025',url:'https://www.ahajournals.org/doi/10.1161/HYP.0000000000000249'},
   {label:'CENETEC · Catálogo de guías de práctica clínica de México',url:'https://gpc.salud.gob.mx/DDIMBE/'}
  ],
  sp:[
   {label:'CDC · Principios de epidemiología, medidas de asociación',url:'https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson3/index.html'},
   {label:'CDC · Principios de epidemiología, razones de momios',url:'https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson3/section5.html'},
   {label:'OMS · Manejo de antimicrobianos e infección',url:'https://www.who.int/health-topics/antimicrobial-resistance'}
  ]
 };
 const EXPECTED=['mi','ped','go','cg','urg','mf','sp'];
 const seen=new Set(),items=[];
 for(const part of parts){
  if(!part||!EXPECTED.includes(part.code)||seen.has(part.code)||!Array.isArray(part.rows))continue;
  seen.add(part.code);
  part.rows.forEach((row,i)=>{
   if(!Array.isArray(row)||row.length!==6)throw Error('Reactivo directo incompleto: '+part.code+'-'+i);
   const [prompt,correct,d1,d2,d3,why]=row;
   const shift=items.length%4;
   const choices=Array(4);
   [correct,d1,d2,d3].forEach((option,k)=>{choices[(k+shift)%4]=option});
   items.push(Object.freeze({
    id:'dq-'+part.code+'-'+String(i+1).padStart(3,'0'),
    area:part.area,
    type:TYPES[Math.min(5,Math.floor(i/5))],
    prompt,
    options:Object.freeze(choices),
    correct:shift,
    why,
    reading:Object.freeze(READINGS[part.code]||[])
   }));
  });
 }
 const result=Object.freeze({
  VERSION:'1.2.0',
  questionCount:items.length,
  areas:Object.freeze(parts.filter(p=>p&&EXPECTED.includes(p.code)).map(p=>p.area)),
  types:Object.freeze(TYPES),
  items:Object.freeze(items),
  notes:'210 preguntas teóricas originales no oficiales, con revisión clínica independiente pendiente. Las referencias son lecturas por especialidad para cotejo, no validación de cada respuesta.'
 });
 return result;
});
