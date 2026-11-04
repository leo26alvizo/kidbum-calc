/* Pharma Pro · conciliación limitada y transparencia de fuentes. Sin almacenamiento clínico. */
(function(root){
 'use strict';
 const rec=root.KidBumPharmaReconciliation,lib=root.KidBumPharmaCore;
 const target=document.getElementById('pharma-reconciliation');
 if(!rec||!lib||!target)return;
 const $=sel=>target.querySelector(sel);
 const mk=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const rows=$('#pharma-recon-rows'),result=$('#pharma-recon-result');
 const selection=[...lib.records].sort((a,b)=>a.name.localeCompare(b.name,'es'));
 function addRow(value){
  if(rows.children.length>=8)return;
  const index=rows.children.length+1,wrap=mk('div',undefined,'pharma-recon-row');
  const label=mk('label','Medicamento '+index);const sel=mk('select');
  sel.setAttribute('aria-label','Medicamento '+index);
  const blank=mk('option','Seleccionar principio activo');blank.value='';sel.append(blank);
  for(const d of selection){const o=mk('option',d.name+(d.highRisk?' · alto riesgo':''));o.value=d.id;sel.append(o);}
  sel.value=value||'';
  wrap.append(label,sel);
  if(index>2){
   const remove=mk('button','Quitar');remove.type='button';remove.className='pharma-recon-remove';
   remove.setAttribute('aria-label','Quitar medicamento '+index);
   remove.onclick=()=>{wrap.remove();renumber();clearResult();};
   wrap.append(remove);
  }
  rows.append(wrap);
  sel.addEventListener('change',clearResult);
  $('#pharma-recon-add').disabled=rows.children.length>=8;
 }
 function renumber(){
  [...rows.children].forEach((row,i)=>{
   row.querySelector('label').textContent='Medicamento '+(i+1);
   row.querySelector('select').setAttribute('aria-label','Medicamento '+(i+1));
   row.querySelector('button')?.setAttribute('aria-label','Quitar medicamento '+(i+1));
  });
  $('#pharma-recon-add').disabled=rows.children.length>=8;
 }
 function clearResult(){
  result.replaceChildren(mk('p','Cambiaste la selección. Ejecuta nuevamente la revisión; un resultado anterior ya no aplica.','muted small'));
  result.dataset.result='pending';
 }
 function listed(title,items,cls){
  if(!items.length)return;
  result.append(mk('h4',title));
  const ul=mk('ul',undefined,cls||'');
  for(const item of items){
   const li=mk('li',typeof item==='string'?item:item.message||item.name);
   if(typeof item==='object'&&item.source){
    const a=mk('a','Ver etiqueta cotejada ↗');a.href=item.source;a.target='_blank';a.rel='noopener noreferrer';
    li.append(document.createTextNode(' '),a);
   }
   ul.append(li);
  }
  result.append(ul);
 }
 function render(r){
  result.replaceChildren();
  result.dataset.result=r.status;
  if(r.errors.length){
   result.append(mk('strong','Revisión bloqueada: faltan medicamentos identificables'));
   listed('Corrige',r.errors);
   return;
  }
  result.append(mk('strong','Revisión parcial · NO acredita seguridad de la combinación','pharma-recon-alert'));
  const p=mk('p',r.selectionCount+' entradas seleccionadas · '+r.uniqueCount+' principios activos distintos · '+r.reviewedPairs+' pares con alerta de interacción documentada · '+r.notReviewedPairs+' pares SIN evaluación de interacción en KidBum.');
  result.append(p);
  listed('Interacciones documentadas',r.pairs);
  listed('Duplicidades exactas',r.duplicates);
  listed('Confusiones LASA conocidas',r.lasa);
  listed('Posibles solapamientos terapéuticos (comprobación heurística)',r.classes);
  listed('Medicamentos de alto riesgo',r.highRisk);
  listed('Límites obligatorios de esta revisión',r.notices);
 }
 function renderProvenance(){
  const c=rec.coverage(),box=$('#pharma-recon-source-results');
  box.replaceChildren();
  const counts=mk('div',undefined,'pharma-recon-counts');
  for(const [n,label] of [[c.total,'entradas índice'],[c.partial,'cotejos parciales US'],[c.approved,'validaciones clínicas independientes'],[c.recheckedNow,'etiquetas reconsultadas el '+c.reviewedAt]]){
   const e=mk('div',undefined,'pharma-recon-count');e.append(mk('strong',String(n)),mk('span',label));counts.append(e);
  }
  box.append(counts);
  const list=mk('ul',undefined,'pharma-recon-sources');
  for(const s of rec.sourceIntegrity()){
   const item=mk('li');item.append(mk('strong',s.name));
   item.append(mk('p',s.scope+' · '+s.sections,'muted small'));
   item.append(mk('p',s.state+' · versión '+s.version+' · etiqueta '+s.effective,s.valid?'small':'pharma-recon-alert'));
   if(s.valid){const a=mk('a','Abrir fuente DailyMed ↗');a.href=s.source;a.target='_blank';a.rel='noopener noreferrer';item.append(a);}
   list.append(item);
  }
  box.append(list);
  box.append(mk('p',c.other+' entradas restantes sin cotejo documental parcial. El re-chequeo de fecha fija no asegura que la etiqueta siga vigente al momento de la consulta. Ninguna ficha acredita registro mexicano ni prescripción individual.','muted small'));
 }
 $('#pharma-recon-form').addEventListener('submit',e=>{
  e.preventDefault();
  const selected=[...rows.querySelectorAll('select')].map(s=>s.value);
  render(rec.evaluate(selected));
 });
 $('#pharma-recon-add').onclick=()=>{addRow();clearResult();};
 $('#pharma-recon-reset').onclick=()=>{rows.replaceChildren();addRow();addRow();clearResult();};
 addRow();addRow();renderProvenance();clearResult();
})(typeof window!=='undefined'?window:globalThis);
