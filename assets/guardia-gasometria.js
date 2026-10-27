(function(root){
'use strict';
/* Composite view; all arithmetic is delegated to existing KidBumEngine. */
const fields=[
 {key:'ph',label:'pH arterial',unit:'',min:6.8,max:7.8},
 {key:'paco2',label:'PaCO₂ arterial',unit:'mmHg',min:10,max:130},
 {key:'hco3',label:'HCO₃⁻',unit:'mmol/L',min:1,max:60},
 {key:'na',label:'Sodio sérico',unit:'mmol/L',min:90,max:190},
 {key:'cl',label:'Cloro sérico',unit:'mmol/L',min:40,max:180},
 {key:'alb',label:'Albúmina',unit:'g/dL',min:0.5,max:7,optional:true},
 {key:'agref',label:'AG referencia local sin potasio',unit:'mmol/L',min:3,max:20,optional:true},
 {key:'hcoref',label:'HCO₃⁻ de referencia local',unit:'mmol/L',min:20,max:30,optional:true}
];
function read(raw,field){
 if(raw===undefined||raw===null||String(raw).trim()==='')return field.optional?null:NaN;
 const clean=String(raw).trim().replace(',','.');
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(clean))return NaN;
 const n=Number(clean);return Number.isFinite(n)&&n>=field.min&&n<=field.max?n:NaN;
}
function evaluate(x,engine){
 if(!x||!engine||typeof engine.calculate!=='function')return {pending:['Motor clínico no disponible.']};
 const missing=[];
 if(x.pop!=='adult')missing.push('Población adulta confirmada');
 if(x.sample!=='arterial')missing.push('Gasometría arterial comprobada');
 if(x.paired!=='yes')missing.push('Muestras temporalmente comparables');
 if(!['yes','no','unknown'].includes(x.primary))missing.push('Evaluación de acidosis metabólica primaria');
 if(missing.length)return {pending:missing};
 const v={};const errors=[];
 for(const f of fields){v[f.key]=read(x[f.key],f);if(Number.isNaN(v[f.key]))errors.push(f.label+' ausente, inválido o fuera de rango');}
 if(errors.length)return {error:errors};
 const ag=engine.calculate('anion',{na:v.na,cl:v.cl,hco3:v.hco3,...(v.alb===null?{}:{alb:v.alb})});
 if(!ag||ag.error)return {error:ag?.error||['Fallo del motor de brecha aniónica.']};
 const items=['AG (sin K): '+ag.value.toFixed(1)+' mmol/L'];
 const warnings=['AG y umbrales dependen del laboratorio y del método analítico.'];
 if(Number.isFinite(ag.correctedAG))items.push('AG corregida por albúmina: '+ag.correctedAG.toFixed(1)+' mmol/L');
 else warnings.push('Albúmina no disponible: considerar infravaloración del AG ante hipoalbuminemia.');
 const phState=v.ph<7.35?'acidemia':v.ph>7.45?'alcalemia':'pH dentro del intervalo convencional (no excluye trastorno mixto)';
 items.push('pH: '+v.ph.toFixed(2)+' · '+phState);
 if(x.primary==='yes'&&v.ph<7.35&&v.hco3<24){
  const w=engine.calculate('winter',{hco3:v.hco3,paco2:v.paco2});
  if(!w||w.error)warnings.push('Winter no aplicable: '+(w?.error||['verificar valores']).join(' '));
  else items.push('Winter: PaCO₂ esperada '+(w.value-2).toFixed(1)+'–'+(w.value+2).toFixed(1)+' mmHg; medida '+v.paco2.toFixed(1)+'. '+w.interpretation);
  if(v.agref!==null&&v.hcoref!==null){
   const corrected=Number.isFinite(ag.correctedAG)?ag.correctedAG:ag.value;
   const delta=engine.calculate('deltaratio',{ag:corrected,hco3:v.hco3,agref:v.agref,hcoref:v.hcoref});
   if(!delta||delta.error)warnings.push('Delta ratio no interpretable: '+(delta?.error||['revisar referencias']).join(' '));
   else items.push('Delta ratio '+delta.value.toFixed(2)+' · '+delta.interpretation+' [AG usado: '+corrected.toFixed(1)+', referencia '+v.agref+'; HCO₃⁻ referencia '+v.hcoref+']');
  }else warnings.push('Delta ratio pendiente: proporcionar ambas referencias del laboratorio, sin valores por defecto.');
 }else warnings.push('Winter y delta ratio no aplicados: requieren acidosis metabólica primaria corroborada, pH <7.35 y HCO₃⁻ <24.');
 if(v.ph<7.20)warnings.unshift('Acidemia importante: priorizar estabilización, perfusión y valoración urgente.');
 warnings.push('Compensación concordante no excluye trastorno mixto. No indica bicarbonato, fluidoterapia ni ventilación.');
 return {value:ag.value,display:ag.value.toFixed(1)+' mmol/L',interpretation:'Brecha aniónica sin potasio · evaluación integrada',items,warnings};
}
function render(host,engine,onBack){
 host.innerHTML='<button class="breadcrumb-back" type="button" id="gas-back">← Volver a Guardia</button>'+
 '<section class="guard-intro"><div class="eyebrow">KIDBUM · GUARDIA PRO</div><h1>Panel integral de gasometría</h1><p>Una captura, tres motores existentes. Sin diagnóstico ni prescripción automáticos.</p></section>'+
 '<div class="calc-detail-grid"><section class="panel"><div class="panel-head"><h2>01 / Verifica y captura</h2><small>Sin valores predeterminados</small></div><div class="panel-body">'+
 '<form id="gas-form" autocomplete="off"><div class="field-grid">'+
 '<div class="field"><label for="gas-pop">Población</label><select class="control" id="gas-pop"><option value="">Seleccionar</option><option value="adult">Adulto ≥18 años confirmado</option><option value="other">No confirmado / pediátrico</option></select></div>'+
 '<div class="field"><label for="gas-sample">Tipo de gasometría</label><select class="control" id="gas-sample"><option value="">Seleccionar</option><option value="arterial">Arterial, comprobada</option><option value="venous">Venosa / incierta</option></select></div>'+
 '<div class="field"><label for="gas-paired">¿Muestras comparables en tiempo?</label><select class="control" id="gas-paired"><option value="">Seleccionar</option><option value="yes">Sí, comprobado</option><option value="no">No / incierto</option></select></div>'+
 '<div class="field"><label for="gas-primary">¿Acidosis metabólica primaria corroborada?</label><select class="control" id="gas-primary"><option value="">Seleccionar</option><option value="yes">Sí</option><option value="no">No</option><option value="unknown">No determinada</option></select></div>'+
 '</div><div id="gas-fields" class="field-grid"></div><div class="actions"><button class="btn outline" type="button" id="gas-example">↗ Ejemplo ficticio</button><button class="btn outline" type="reset">↻ Limpiar</button><button class="btn outline" type="button" id="gas-copy" disabled>Copiar resumen</button></div></form>'+
 '<p class="input-info">Datos procesados localmente. Na, Cl, HCO₃⁻ en mmol/L; albúmina g/dL; PaCO₂ arterial en mmHg.</p></div></section>'+
 '<aside class="panel result-panel" aria-live="polite"><div class="result-top"><div class="result-label">02 / RESULTADO</div><div class="result-value" id="gas-score">—</div><div class="result-interpret" id="gas-interpret">Verifica todos los datos.</div></div><div class="result-extra"><div class="note-heading">Cálculos</div><ul id="gas-items"></ul><div class="note-heading">Seguridad</div><ul id="gas-warnings"></ul><div class="result-warning">⚠ Ante paciente inestable, priorizar valoración y tratamiento inmediato, no la calculadora.</div></div></aside></div>';
 const $=id=>host.querySelector('#'+id);
 $('gas-back').onclick=onBack;
 const froot=$('gas-fields');
 for(const f of fields){
  const d=document.createElement('div');d.className='field';
  const label=document.createElement('label');label.htmlFor='gas-'+f.key;label.textContent=f.label+(f.unit?' ('+f.unit+')':'');
  const input=document.createElement('input');input.id='gas-'+f.key;input.className='control';input.type='text';input.inputMode='decimal';input.placeholder=f.optional?'Opcional':'Introduce valor documentado';
  d.append(label,input);froot.append(d);
 }
 let last=null;
 function update(){
  const x={pop:$('gas-pop').value,sample:$('gas-sample').value,paired:$('gas-paired').value,primary:$('gas-primary').value};
  for(const f of fields)x[f.key]=$('gas-'+f.key).value;
  last=evaluate(x,engine);
  $('gas-score').textContent=last.display||'—';
  $('gas-interpret').textContent=last.interpretation||(last.pending?'Datos o verificaciones pendientes.':'Revisa los valores documentados.');
  const draw=(id,items)=>{const root=$(id);root.replaceChildren();for(const value of items){const li=document.createElement('li');li.textContent=value;root.append(li)}};
  draw('gas-items',last.items||[]);
  draw('gas-warnings',last.warnings||last.pending||last.error||[]);
  $('gas-copy').disabled=!last.items;
 }
 $('gas-form').addEventListener('input',update);
 $('gas-form').addEventListener('change',update);
 $('gas-form').addEventListener('reset',()=>setTimeout(update,0));
 $('gas-example').onclick=()=>{
  const example={pop:'adult',sample:'arterial',paired:'yes',primary:'yes',ph:'7.28',paco2:'29',hco3:'14',na:'140',cl:'106',alb:'2',agref:'12',hcoref:'24'};
  for(const [key,value] of Object.entries(example))$('gas-'+key).value=value;
  update();
 };
 $('gas-copy').onclick=async()=>{
  if(!last?.items)return;
  const text='KidBum CALC · Gasometría\n'+last.items.join('\n')+'\nPrecauciones:\n'+last.warnings.join('\n')+'\nNo es prescripción ni diagnóstico definitivo.';
  try{await navigator.clipboard.writeText(text);$('gas-copy').textContent='✓ Copiado'}catch{$('gas-copy').textContent='No disponible'}
 };
 update();
}
root.KidBumGasometria=Object.freeze({fields,evaluate,render});
})(typeof window!=='undefined'?window:globalThis);