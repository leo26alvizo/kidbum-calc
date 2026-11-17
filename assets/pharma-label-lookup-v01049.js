/* KidBum Pharma · explorador opt-in de etiquetado estadounidense (v0.10.49).
 * CONSULTA EN LÍNEA Y NO COTEJADA CON MÉXICO.
 * No se envían datos de pacientes, no se elige automáticamente la presentación.
 * No transforma ni recomienda dosis: transcribe las secciones SPL elegidas por el usuario.
 * Etiquetas presentadas por el fabricante / distribuidor; no equivalen a validación FDA.
 */
(function(root){
'use strict';
const API='https://api.fda.gov/drug/label.json';
const DM='https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';
const TERMS=Object.freeze({
 amoxicilina:'amoxicillin','amoxicilina-clavulanato':'amoxicillin clavulanate',
 cefazolina:'cefazolin',ceftriaxona:'ceftriaxone',cefotaxima:'cefotaxime',cefepima:'cefepime',
 'piperacilina-tazobactam':'piperacillin tazobactam',vancomicina:'vancomycin',
 meropenem:'meropenem',metronidazol:'metronidazole',gentamicina:'gentamicin',
 amikacina:'amikacin',azitromicina:'azithromycin',paracetamol:'acetaminophen',
 ibuprofeno:'ibuprofen',ketorolaco:'ketorolac',metamizol:'metamizole',
 morfina:'morphine',fentanilo:'fentanyl',omeprazol:'omeprazole',
 ondansetron:'ondansetron',metoclopramida:'metoclopramide',
 'insulina-regular':'insulin human','insulina-nph':'insulin human',
 'insulina-glargina':'insulin glargine','insulina-lispro':'insulin lispro',
 metformina:'metformin',enoxaparina:'enoxaparin',heparina:'heparin',
 warfarina:'warfarin',apixaban:'apixaban',adrenalina:'epinephrine',
 noradrenalina:'norepinephrine',atropina:'atropine',adenosina:'adenosine',
 amiodarona:'amiodarone','sulfato-magnesio':'magnesium sulfate',
 'potasio-iv':'potassium chloride','gluconato-calcio':'calcium gluconate',
 'bicarbonato-sodio':'sodium bicarbonate',furosemida:'furosemide',
 losartan:'losartan',amlodipino:'amlodipine',metoprolol:'metoprolol',
 enalapril:'enalapril',prednisona:'prednisone',
 aciclovir:'acyclovir',valaciclovir:'valacyclovir',oseltamivir:'oseltamivir',
 ciprofloxacino:'ciprofloxacin',levofloxacino:'levofloxacin',
 doxiciclina:'doxycycline',nitrofurantoina:'nitrofurantoin',
 fosfomicina:'fosfomycin',clindamicina:'clindamycin',
 'trimetoprima-sulfametoxazol':'sulfamethoxazole trimethoprim',
 hidroxizina:'hydroxyzine',hidralazina:'hydralazine',
 valsartan:'valsartan',telmisartan:'telmisartan',olmesartan:'olmesartan',
 clortalidona:'chlorthalidone',hidroclorotiazida:'hydrochlorothiazide',
 bisoprolol:'bisoprolol',levotiroxina:'levothyroxine',
 'levotiroxina-sodica':'levothyroxine',pantoprazol:'pantoprazole',
 naproxeno:'naproxen',sumatriptan:'sumatriptan',colchicina:'colchicine',
 alopurinol:'allopurinol',febuxostat:'febuxostat',
 atorvastatina:'atorvastatin',rosuvastatina:'rosuvastatin',
 simvastatina:'simvastatin',ezetimiba:'ezetimibe',
 clopidogrel:'clopidogrel',dabigatran:'dabigatran',
 rivaroxaban:'rivaroxaban',edoxaban:'edoxaban',
 semaglutida:'semaglutide',empagliflozina:'empagliflozin',
 dapagliflozina:'dapagliflozin',espironolactona:'spironolactone',
 budesonida:'budesonide',salbutamol:'albuterol',
 propranolol:'propranolol',carvedilol:'carvedilol',
 midazolam:'midazolam',diazepam:'diazepam',lorazepam:'lorazepam',
 fenitoina:'phenytoin',levetiracetam:'levetiracetam',
 fluconazol:'fluconazole',anfotericina:'amphotericin',linezolid:'linezolid',
 dexametasona:'dexamethasone',hidrocortisona:'hydrocortisone',
 'acido-tranexamico':'tranexamic acid'
});
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function defaultTerm(m){
 if(TERMS[m.id])return TERMS[m.id];
 /* Search hints are NOT equivalent substances, translated names or indications. */
 return normalize(m.name).replace(/\([^)]*\)/g,'').replace(/[^a-z0-9 /+-]/g,' ').replace(/\s+/g,' ').trim().slice(0,90);
}
function cleanTerm(value){return normalize(value).replace(/[^a-z0-9 /+-]/g,' ').replace(/\s+/g,' ').trim().slice(0,90);}
function buildQuery(value){
 const term=cleanTerm(value);
 if(term.length<3)return null;
 /* Exact phrase query in openFDA syntax; no user-controlled query operators. */
 return 'openfda.generic_name:"'+term.replace(/["\\]/g,'')+'" AND _exists_:dosage_and_administration';
}
function buildApiUrl(value){
 const q=buildQuery(value);
 return q?API+'?search='+encodeURIComponent(q)+'&limit=8':null;
}
function getFirst(x){return Array.isArray(x)&&x.length?String(x[0]):'';}
function parseMeta(label){
 const f=label&&typeof label==='object'&&label.openfda&&typeof label.openfda==='object'?label.openfda:{};
 return {
  generic:getFirst(f.generic_name),brand:getFirst(f.brand_name),
  manufacturer:getFirst(f.manufacturer_name),route:(f.route||[]).join(', '),
  productType:getFirst(f.product_type),
  splSetId:getFirst(f.spl_set_id),
  date:/^\d{8}$/.test(label?.effective_time||'')?
   label.effective_time.slice(0,4)+'-'+label.effective_time.slice(4,6)+'-'+label.effective_time.slice(6):''
 };
}
const FIELDS=Object.freeze([
 ['indications_and_usage','Indicaciones y usos registrados en la etiqueta'],
 ['dosage_and_administration','Dosis y administración · esquema de la presentación elegida'],
 ['dosage_forms_and_strengths','Formas farmacéuticas y concentraciones'],
 ['boxed_warning','Advertencias destacadas'],
 ['contraindications','Contraindicaciones'],
 ['warnings_and_cautions','Advertencias y precauciones'],
 ['drug_interactions','Interacciones descritas'],
 ['pediatric_use','Uso pediátrico'],
 ['geriatric_use','Uso en adultos mayores'],
 ['pregnancy','Embarazo'],
 ['renal_impairment','Insuficiencia renal'],
 ['hepatic_impairment','Insuficiencia hepática']
]);
function labeledSections(label){
 if(!label||typeof label!=='object')return [];
 return FIELDS.map(([key,title])=>({key,title,text:Array.isArray(label[key])?label[key].filter(x=>typeof x==='string').join('\n\n'):''})).filter(x=>x.text);
}
function textNode(tag,text,cls){const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x;}
function sourceLink(href,title){
 const a=textNode('a',title);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a;
}
function render(med){
 const section=textNode('section',undefined,'pharma-reg-label');
 section.setAttribute('aria-label','Consulta voluntaria de etiquetas regulatorias para '+med.name);
 const heading=textNode('h3','📑 Ficha regulatoria por presentación · consulta en línea');
 const notice=textNode('p','Consulta complementaria: busca etiquetas estadounidenses enviando ÚNICAMENTE el nombre del medicamento a openFDA. No se envía información clínica ni personal. Requiere internet. Las etiquetas proceden de empresas y pueden no corresponder a una presentación autorizada en México. Ningún resultado valida automáticamente una dosis ni sustituye la IPP mexicana.','small');
 section.append(heading,notice);
 const form=document.createElement('form');form.className='pharma-reg-search';form.autocomplete='off';
 const id='reg-'+med.id.replace(/[^a-z0-9-]/g,'').slice(0,80);
 const label=textNode('label','Nombre para buscar en etiquetas de EE. UU.');label.htmlFor=id;
 const input=document.createElement('input');input.id=id;input.type='search';input.maxLength=90;input.value=defaultTerm(med);input.placeholder='Nombre genérico en inglés, editable';input.setAttribute('aria-label','Medicamento en inglés para consulta de etiquetas');
 const btn=textNode('button','Consultar etiquetas');btn.type='submit';
 form.append(label,input,btn);section.append(form);
 section.append(textNode('p','La selección de presentación y la lectura de las advertencias son obligatorias. No se carga información externa automáticamente.','small muted'));
 const status=textNode('p','Sin consulta externa. Información offline de KidBum disponible arriba.','small muted');
 status.setAttribute('aria-live','polite');section.append(status);
 const results=textNode('div',undefined,'pharma-reg-results');section.append(results);
 const footer=textNode('div',undefined,'pharma-reg-links');
 footer.append(sourceLink('https://dailymed.nlm.nih.gov/dailymed/search.cfm?query='+encodeURIComponent(defaultTerm(med)),'Buscar manualmente en DailyMed ↗'));
 footer.append(sourceLink('https://registros.cofepris.gob.mx/BRSDM/default.aspx','Consultar registro y presentación en COFEPRIS ↗'));
 section.append(footer);
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const url=buildApiUrl(input.value);
  results.replaceChildren();
  if(!url){status.textContent='Escribe al menos tres caracteres del nombre genérico.';return;}
  status.textContent='Buscando etiquetas… La conexión externa solo se realiza tras pulsar este botón.';
  btn.disabled=true;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),11000);
  try{
   const resp=await fetch(url,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});
   if(!resp.ok)throw Error('openFDA HTTP '+resp.status);
   const data=await resp.json();
   if(!data||!Array.isArray(data.results)||!data.results.length)throw Error('Sin etiquetas para esa búsqueda.');
   const total=Number(data.meta?.results?.total)||data.results.length;
   status.textContent='Etiquetas candidatas: '+data.results.length+' de '+total+' coincidencias. No se selecciona ninguna automáticamente.';
   const tip=textNode('p','Antes de abrir: confirma nombre genérico, ingredientes, concentración, vía, población y producto. Las primeras coincidencias pueden incluir combinaciones, productos OTC o marcas distintas.','small');
   results.append(tip);
   for(const [idx,record] of data.results.entries()){
    const meta=parseMeta(record);
    const item=textNode('article',undefined,'pharma-reg-candidate');
    const title=meta.generic||'Principio activo no identificado';
    const human=/^HUMAN (PRESCRIPTION|OTC) DRUG$/.test(meta.productType);
    const exactName=normalize(title)===normalize(cleanTerm(input.value));
    item.append(textNode('strong',title));
    if(!exactName)item.append(textNode('p','⚠ El principio activo no coincide exactamente con el término buscado: puede ser una combinación o una sal/presentación diferente. Verificar TODOS los ingredientes antes de leer cualquier dosis.','pharma-indication-pending'));
    if(!human)item.append(textNode('p','⚠ No se confirmó clasificación de medicamento para uso humano. No se permite abrir este resultado como pauta clínica.','pharma-indication-pending'));
    item.append(textNode('p','Marca: '+(meta.brand||'no especificada')+' · Vía: '+(meta.route||'no especificada')+' · '+(meta.productType||'tipo no especificado'),'small muted'));
    item.append(textNode('p','Fabricante: '+(meta.manufacturer||'no identificado')+' · Fecha de etiqueta: '+(meta.date||'sin dato'),'small muted'));
    const open=textNode('button',human?'Examinar etiqueta '+(idx+1):'No elegible · clasificación no humana');open.type='button';open.disabled=!human;
    const body=textNode('div',undefined,'pharma-reg-label-detail');
    open.addEventListener('click',()=>{
     body.replaceChildren();
     body.append(textNode('strong','Etiqueta seleccionada por el usuario: '+title));
     body.append(textNode('p','La dosis debe corresponder a la INDICACIÓN, PRESENTACIÓN Y VÍA de esta etiqueta. Texto original en inglés; no es una pauta individual ni una autorización mexicana.','pharma-indication-pending'));
     const link=meta.splSetId&&/^[0-9a-f-]{36}$/i.test(meta.splSetId)?
      DM+encodeURIComponent(meta.splSetId):
      'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query='+encodeURIComponent(title);
     body.append(sourceLink(link,'Ver etiqueta completa y versión en DailyMed ↗'));
     const sections=labeledSections(record);
     if(!sections.length)body.append(textNode('p','No se recibieron secciones clínicas de esta etiqueta. Leer producto original.','small'));
     for(const sec of sections){
      const d=document.createElement('details');d.className='pharma-reg-section';
      const h=textNode('summary',sec.title);d.append(h);
      /* Large source sections are not silently clipped: display full available text. */
      d.append(textNode('p',sec.text,'pharma-reg-source-text'));
      body.append(d);
     }
     if(!sections.some(s=>s.key==='dosage_and_administration'))body.append(textNode('p','Esta etiqueta no incluye una sección de dosificación legible en la respuesta. No se genera una pauta.','pharma-indication-pending'));
     body.append(textNode('p','Fuente: registro SPL mostrado por openFDA, no validado para uso individual. Confirmar jurisdicción y fecha, interacciones, alergias, edad, función renal/hepática y protocolo hospitalario.','small muted'));
    });
    item.append(open,body);results.append(item);
   }
  }catch(err){
   const reason=err?.name==='AbortError'?'Se agotó el tiempo de conexión':(err?.message||'Error de red');
   status.textContent='No fue posible recuperar etiquetas en esta consulta: '+reason+'. Usa el enlace de búsqueda oficial o intenta nuevamente con el nombre en inglés. No se infieren dosis.';
  }finally{clearTimeout(timer);btn.disabled=false;}
 });
 return section;
}
root.KidBumPharmaExternalLabels=Object.freeze({render,defaultTerm,cleanTerm,buildQuery,buildApiUrl,parseMeta,labeledSections,fields:FIELDS});
})(typeof window!=='undefined'?window:globalThis);
