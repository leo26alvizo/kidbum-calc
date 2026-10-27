(function(root){
'use strict';
const engine=root.KidBumPharmaMonographs;
if(!engine)return;
function el(tag,text,cls){
 const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;
}
function chooser(host,name,label,values){
 const group=el('div',undefined,'field');
 const lab=el('label',label);lab.htmlFor='pm-'+name;
 const sel=el('select');sel.id='pm-'+name;sel.name=name;sel.required=true;
 const empty=el('option','Elegir · obligatorio');empty.value='';sel.append(empty);
 for(const [v,title] of values){const op=el('option',title);op.value=v;sel.append(op);}
 group.append(lab,sel);host.append(group);return sel;
}
const yn=[['yes','Sí'],['no','No'],['unknown','No documentado']];
function render(id){
 const m=engine.byId[id];
 if(!m)return null;
 const wrap=el('section',undefined,'fact pm-verified');
 const heading=el('h3','Referencia posológica seleccionada · etiqueta estadounidense');
 wrap.append(heading,el('p',m.status+' · '+m.jurisdiction,'muted small'));
 const details=el('p','Producto revisado: '+m.formulation,'small');wrap.append(details);
 const form=el('form');form.autocomplete='off';
 const grid=el('div',undefined,'form-grid');
 const population=chooser(grid,'population','Población de referencia',[
  ['adult','Adulto ≥18 años'],['pediatric','Pediátrico >28 días'],['neonate','Neonato ≤28 días (sin pauta habilitada)']
 ]);
 const indication=chooser(grid,'indication','Indicación específica',[]);
 const route=chooser(grid,'route','Vía propuesta',[
  ['iv','Intravenosa'],['im','Intramuscular'],['sc','Subcutánea'],['po','Oral'],['unknown','Sin verificar']
 ]);
 const allergy=chooser(grid,'allergy','¿Alergia o hipersensibilidad relevante?',yn);
 const extra={};
 if(id==='ceftriaxona'){
  extra.weightVerified=chooser(grid,'weightVerified','Si pediátrico, ¿peso actual documentado?',yn);
  extra.combinedSevereImpairment=chooser(grid,'combinedSevereImpairment','¿Deterioro renal y hepático significativo combinado?',yn);
  extra.calciumIV=chooser(grid,'calciumIV','¿Calcio IV concomitante o previsto?',yn);
 }
 if(id==='enoxaparina'){
  extra.renal=chooser(grid,'renal','CrCl confirmada (mL/min)',[['ge30','≥30 y valor documentado'],['lt30','<30 y valor documentado'],['unknown','Desconocida']]);
  extra.kidneyStable=chooser(grid,'kidneyStable','¿Función renal estable y contexto valorado?',yn);
  extra.bleeding=chooser(grid,'bleeding','¿Hemorragia mayor activa?',yn);
  extra.hit=chooser(grid,'hit','¿HIT inmunitaria reciente/anticuerpos circulantes?',yn);
  extra.neuroaxial=chooser(grid,'neuroaxial','¿Punción o anestesia neuroaxial prevista?',yn);
 }
 if(id==='insulina-glargina'){
  extra.formulation=chooser(grid,'formulation','¿Presentación exacta?',[['u300','Toujeo U-300 (pluma)'],['u100','Glargina U-100 / otra'],['unknown','Sin confirmar']]);
  extra.type=chooser(grid,'type','Tipo de diabetes', [['t2','DM2 confirmada'],['t1','DM1'],['unknown','No confirmado']]);
  extra.prior=chooser(grid,'prior','¿Recibe o recibió insulina previamente?',yn);
  extra.hypoglycemia=chooser(grid,'hypoglycemia','¿Hipoglucemia presente?',yn);
 }
 if(['metformina','amoxicilina','omeprazol'].includes(id)){
  extra.productConfirmed=chooser(grid,'productConfirmed','¿Presentación exacta confirmada?',yn);
  extra.pregnancy=chooser(grid,'pregnancy','¿Embarazo o posibilidad de embarazo?',yn);
  if(id==='metformina'){
   extra.renal=chooser(grid,'renal','TFG estable mL/min/1.73 m²', [['ge45','≥45 confirmada'],['low','<45'],['unknown','Desconocida']]);
   extra.metabolicAcidosis=chooser(grid,'metabolicAcidosis','¿Acidosis metabólica activa?',yn);
   extra.acuteIllness=chooser(grid,'acuteIllness','¿Enfermedad aguda o hipoxia?',yn);
   extra.iodinatedContrast=chooser(grid,'iodinatedContrast','¿Contraste yodado próximo o reciente?',yn);
  }
  if(id==='amoxicilina'){
   extra.weightOver40=chooser(grid,'weightOver40','¿Peso corporal >40 kg?',yn);
   extra.renal=chooser(grid,'renal','Filtración renal estable', [['ge30','≥30 mL/min confirmada'],['low','<30 mL/min'],['unknown','Desconocida']]);
   extra.bacterial=chooser(grid,'bacterial','¿Infección bacteriana susceptible o fuertemente sospechada?',yn);
  }
  if(id==='omeprazol'){
   extra.alarmSymptoms=chooser(grid,'alarmSymptoms','¿Signos de alarma digestiva?',yn);
   extra.rilpivirine=chooser(grid,'rilpivirine','¿Usa medicamentos con rilpivirina?',yn);
  }
 }
 if(['potasio-iv','heparina','insulina-lispro'].includes(id)){
  extra.productConfirmed=chooser(grid,'productConfirmed','¿Concentración y presentación exactas verificadas?',yn);
  extra.pregnancy=chooser(grid,'pregnancy','¿Embarazo posible o documentado?',yn);
  extra.hospitalProtocol=chooser(grid,'hospitalProtocol','¿Protocolo y supervisión disponibles?',yn);
  if(id==='potasio-iv'){
   extra.kRange=chooser(grid,'kRange','Potasio sérico actual',[['noncritical','>2.5 a <3.5 mEq/L, confirmado'],['critical','≤2.5 mEq/L (NO cubierto)'],['normal','≥3.5 mEq/L / otra situación'],['unknown','Sin laboratorio']]);
   extra.renalStable=chooser(grid,'renalStable','¿Función renal y diuresis adecuadas, confirmadas?',yn);
   extra.monitoring=chooser(grid,'monitoring','¿Vigilancia de K/ECG según protocolo?',yn);
   extra.dilutionValidated=chooser(grid,'dilutionValidated','¿Farmacia validó concentración, diluyente y acceso?',yn);
   extra.urgentSymptoms=chooser(grid,'urgentSymptoms','¿Síntomas graves o cambios ECG?',yn);
  }
  if(id==='heparina'){
   extra.bleeding=chooser(grid,'bleeding','¿Sangrado activo no controlado?',yn);
   extra.hit=chooser(grid,'hit','¿HIT previa o sospechada?',yn);
   extra.labMonitoring=chooser(grid,'labMonitoring','¿aPTT/anti-Xa, plaquetas y hemoglobina disponibles?',yn);
   extra.neuroaxial=chooser(grid,'neuroaxial','¿Procedimiento neuroaxial previsto?',yn);
   extra.vialStrength=chooser(grid,'vialStrength','¿Unidades/mL del vial y uso sistémico confirmados?',yn);
  }
  if(id==='insulina-lispro'){
   extra.formulation=chooser(grid,'formulation','Presentación Humalog', [['u100','Humalog U-100'],['u200','Humalog U-200 (NO cubierto)'],['mix','Humalog Mix (NO cubierto)'],['unknown','Sin identificar']]);
   extra.hypoglycemia=chooser(grid,'hypoglycemia','¿Hipoglucemia actual?',yn);
   extra.meal=chooser(grid,'meal','¿Comida e ingesta confirmadas?',yn);
   extra.glucose=chooser(grid,'glucose','¿Glucemia actual y plan de monitoreo?',yn);
   extra.insulinPlan=chooser(grid,'insulinPlan','¿Pauta individual de insulina revisada?',yn);
  }
 }
 function refill(){
  const prior=indication.value;indication.replaceChildren();const zero=el('option','Elegir indicación · obligatorio');zero.value='';indication.append(zero);
  for(const x of engine.indications(id,population.value)){const o=el('option',x.title);o.value=x.id;indication.append(o);}
  if([...indication.options].some(o=>o.value===prior))indication.value=prior;
 }
 population.addEventListener('change',()=>{refill();clear();});
 form.append(grid);
 const btn=el('button','Mostrar referencia etiquetada','button');btn.type='submit';form.append(btn);
 const output=el('div','Indica población, vía, alergias e indicación antes de consultar pautas. No se rellenan datos clínicos por defecto.','tool-result');
 output.setAttribute('aria-live','polite');
 function clear(){output.replaceChildren();output.append(el('p','Los datos obligatorios deben verificarse antes de mostrar una pauta.','muted small'));}
 function group(title,items){
  const h=el('strong',title);output.append(h);const ul=el('ul');
  for(const s of items)ul.append(el('li',s));
  output.append(ul);
 }
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const ctx={population:population.value,indication:indication.value,route:route.value,allergy:allergy.value};
  for(const [name,field] of Object.entries(extra))ctx[name]=field.value;
  const r=engine.check(id,ctx);output.replaceChildren();
  if(r.status!=='reference'){group('NO MOSTRAR PAUTA: verificación pendiente o población/condición no cubierta',r.messages);return;}
  const regimen=r.regimen;
  if(!regimen){group('Pauta no disponible',r.warnings);return;}
  group('Alcance validado de esta referencia',regimen.constraints);
  group('Referencia de dosis textual · NO es una indicación médica',[regimen.reference]);
  group('Interpretación y limitaciones',[regimen.context,...r.warnings]);
  const preparation=engine.preparations?.[id];
  if(preparation){
   group('Vía y preparación específica de la presentación etiquetada · NO orden de preparación',[preparation.scope,preparation.method,preparation.restrictions,preparation.sourceSection,preparation.finalValidation]);
  }
  const cite=el('a',m.source.title+' · v'+m.source.version+' · '+m.source.effective+' ↗');
  cite.href=m.source.url;cite.rel='noopener noreferrer';cite.target='_blank';output.append(cite);
 });
 wrap.append(form,output);
 wrap.append(el('p','La consulta es local. No se generan órdenes, no se calculan mg por paciente y la ficha NO garantiza aprobación de la formulación en México. Para otras indicaciones, usar referencia institucional y farmacia clínica.','small muted'));
 const monitoring=el('div',undefined,'fact');monitoring.append(el('h3','Contraindicaciones, precauciones y vigilancia etiquetadas'));const ul=el('ul');
 for(const t of [...m.cautions,...m.monitoring])ul.append(el('li',t));
 monitoring.append(ul);wrap.append(monitoring);
 const bibliography=el('div',undefined,'refs');const official=el('a','Ver etiqueta íntegra: '+m.source.title+' · versión '+m.source.version+' (fecha '+m.source.effective+') ↗');official.href=m.source.url;official.rel='noopener noreferrer';official.target='_blank';bibliography.append(official);wrap.append(bibliography);
 return wrap;
}
root.KidBumPharmaMonographUI=Object.freeze({render});
})(typeof window!=='undefined'?window:globalThis);
