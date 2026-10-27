(function(root){
'use strict';
/* KidBum Pharma Pro 0.10.34 — third documentary-label audit.
 * No source verified here implies Mexican authorization or independent
 * pharmacist/clinical approval. Never calculate patient-specific doses.
 * Confirm source version/date before updating, and prefer institution policy.
 */
const base=root.KidBumPharmaMonographs;
if(!base)return;
const src=(setid,title,version,effective)=>({
 setid,title,version,effective,url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid='+setid
});
const review=[
 {id:'potasio-iv',name:'Cloruro de potasio concentrado IV (Hospira, 2 mEq/mL)',
  status:'Cotejo documental parcial · medicamento de alto riesgo',
  jurisdiction:'Etiquetado estadounidense de Hospira, sin verificación de registro ni equivalencia de formulación en México.',
  source:src('559a0a8c-a8fe-40a5-b196-21f9308780ab','Potassium Chloride for Injection Concentrate, USP · Hospira',23,'2026-07-01'),
  formulation:'Concentrado 2 mEq/mL (10 mEq/5 mL; 20 mEq/10 mL; 40 mEq/20 mL). EXCLUSIVAMENTE para diluir y administrar por infusión IV. NO es solución lista para usar.',
  monitoring:['Potasio sérico actual y repetido; magnesio, creatinina y diuresis.','ECG y vigilancia cardíaca según gravedad, situación clínica y protocolo institucional.','Concentración final y velocidad verificadas por farmacia y enfermería con medidas institucionales de seguridad.'],
  cautions:['ALTO RIESGO · ISMP 2024: KCl inyectable concentrado. La inyección IV sin diluir puede provocar paro cardiaco inmediato.','Contraindicado ante hiperpotasemia, insuficiencia renal o condiciones con retención de potasio según la etiqueta consultada.','Las velocidades para hipopotasemia crítica requieren un protocolo de urgencias/UCI con monitorización continua; NO se habilitan aquí.','No convertir automáticamente mEq del vial a una orden de infusión. La velocidad y concentración finales dependen del acceso venoso, laboratorio y protocolo.'],
  preparation:{
   method:'Presentación específica Hospira: KCl concentrado 2 mEq/mL; DEBE diluirse en un volumen grande de solución compatible, con mezclado completo del recipiente antes de administrar. La etiqueta enumera envases de 10 mEq/5 mL, 20 mEq/10 mL y 40 mEq/20 mL (todos 2 mEq/mL); NO se entrega un procedimiento de preparación calculado.',
   restrictions:'NUNCA IV directo/bolo, IM ni SC. Sin bomba, protocolo, acceso apropiado y validación de farmacia, NO preparar. No extrapolar las concentraciones a otras marcas.',
   scope:'Solo concentrado de Hospira 2 mEq/mL como dato de identificación; no preparación final prescriptiva',
   sourceSection:'DOSAGE AND ADMINISTRATION / CONTRAINDICATIONS / HOW SUPPLIED (secc. 4, 5, 10, 11)',
   finalValidation:'ALTO RIESGO: preparación, estabilidad, concentración final y ritmo requieren validación local de Farmacia y protocolo institucional.'
  },
  regimens:[{id:'adult-kcl-noncritical',population:'adult',indication:'adult-kcl-noncritical',title:'Adulto · hipopotasemia NO crítica, hospitalizado y monitorizado',route:'iv',
   reference:'La etiqueta Hospira indica para K sérico >2.5 mEq/L: velocidad de infusión que NO exceda 10 mEq/h y concentración de hasta 40 mEq/L; límite de la etiqueta 200 mEq/24 h. ESTOS SON LÍMITES DOCUMENTALES, NO DOSIS PRESCRITA. Existen situaciones con requisitos distintos que deben manejarse con protocolo específico.',
   context:'La ficha no determina déficit de potasio, mEq a administrar, volumen, diluyente, acceso ni tiempo de reposición. Solo adultos con hipopotasemia no crítica y sin insuficiencia renal; requerir protocolo hospitalario y farmacia. Para K ≤2.5, síntomas graves o cambios ECG, NO utilizar esta ruta.',
   constraints:['K sérico documentado >2.5 y <3.5 mEq/L, sin datos de urgencia cardiaca','Función renal/diuresis y monitorización verificadas, concentrado identificado y validación por farmacia']}]},
 {id:'heparina',name:'Heparina sódica no fraccionada inyectable (Hikma)',
  status:'Cotejo documental parcial · anticoagulante de alto riesgo',
  jurisdiction:'Etiqueta estadounidense de Hikma; sin autorización o equivalencia de presentación confirmada en México.',
  source:src('7014808d-cec9-4b2c-8eb5-940493e356ab','Heparin Sodium Injection · Hikma Pharmaceuticals USA',18,'2026-10-23'),
  formulation:'Solución inyectable de heparina sódica. La etiqueta comprende presentaciones de distinta potencia; la concentración exacta DEBE verificarse antes de cualquier cálculo o mezcla.',
  monitoring:['aPTT basal y seriado (o protocolo anti-Xa aplicable), INR basal, plaquetas y hemoglobina.','Hemorragia, HIT y perfusión; supervisión hospitalaria con ajuste según laboratorios.','La selección de vial y vía exige comprobar unidades/mL y diferenciar anticoagulación sistémica de lavado de catéter.'],
  cautions:['ALTO RIESGO ISMP 2024: anticoagulante con potencial de hemorragia grave.','Contraindicada ante antecedente de HIT, hemorragia activa no controlada, hipersensibilidad a heparina o productos porcinos y cuando no es posible monitorizar coagulación para dosis plenas.','Prohibida la administración intramuscular por riesgo de hematoma.','No confundir vial de anticoagulación con soluciones para mantener permeable un catéter. Las tablas de etiqueta no reemplazan nomogramas contemporáneos por peso y anti-Xa/aPTT.'],
  preparation:{
   method:'La etiqueta exige verificar vial, POTENCIA (unidades/mL) y vía IV/SC antes de preparar; si se añade a una infusión IV, invertir el recipiente varias veces para evitar distribución desigual. NO ofrece aquí una mezcla prescrita por paciente.',
   restrictions:'Nunca intramuscular. No preparar sin confirmación de unidades totales, concentración final, volumen, compatibilidad y revisión de Farmacia. Protocolo institucional de anticoagulación prevalece.',
   scope:'Heparin Sodium Injection Hikma, referencia documental de uso intravenoso terapéutico adulto',
   sourceSection:'2.1 Preparation for Administration / 2.3 Monitoring / 2.4 Therapeutic Anticoagulation',
   finalValidation:'Falta validación de protocolo hospitalario, nomograma local e información para prescribir mexicana.'
  },
  regimens:[{id:'adult-heparin-full-iv',population:'adult',indication:'adult-heparin-full-iv',title:'Adulto · anticoagulación IV terapéutica (referencia histórica de etiqueta)',route:'iv',
   reference:'Tabla de referencia Hikma para un adulto ejemplo de 68 kg: carga IV de 5,000 unidades y posteriormente 20,000–40,000 unidades en 24 h mediante infusión. NO ES UNA PAUTA EMPÍRICA UNIVERSAL ni debe usarse para establecer el ritmo de bomba; la etiqueta exige ajuste mediante pruebas de coagulación.',
   context:'El esquema del fabricante es histórico y de ejemplo, NO un nomograma actual ajustado a peso o anti-Xa. La elección del bolus, objetivo y velocidad deben basarse en protocolo institucional vigente, indicación precisa y resultado de aPTT/anti-Xa. En embarazo, pediatría, HIT, sangrado, lesión neuroaxial o indicación quirúrgica especial esta referencia NO aplica.',
   constraints:['Adulto hospitalizado, decisión de anticoagulación sistémica IV verificada','Vial/concentración correctos, resultados basales y capacidad de monitorización seriada']}]},
 {id:'insulina-lispro',name:'Insulina lispro Humalog U-100 (referencia SC)',
  status:'Cotejo documental parcial · insulina de alto riesgo',
  jurisdiction:'Etiqueta estadounidense de Humalog Eli Lilly; comprobar formulación y registro en México.',
  source:src('c8ecbd7a-0e22-4fc7-a503-faa58c1b6f3f','HUMALOG insulin lispro injection U-100/U-200 · Eli Lilly',87,'2026-06-16'),
  formulation:'Ficha acotada a lispro U-100 (100 unidades/mL) por vía subcutánea. El etiquetado incluye también U-200 y otras vías: NO extrapolar entre ellas.',
  monitoring:['Glucosa capilar/CGM y episodios de hipoglucemia; ingesta actual.','Potasio y función renal/hepática cuando el contexto lo requiere.','Insulina basal/bolos y objetivos glucémicos en un plan integral supervisado.'],
  cautions:['ALTO RIESGO ISMP 2024: todas las insulinas SC/IV. Diferenciar U-100, U-200 y mezclas preformuladas.','No administrar ante hipoglucemia ni con hipersensibilidad conocida.','La U-200 NO se administra por vía IV ni se extrae de su pluma hacia jeringa. No confundir Humalog con Humalog Mix.','No hay dosis de inicio universal en la etiqueta. La pauta prandial se individualiza por ingesta, glucosa, necesidades metabólicas e insulina previa.'],
  preparation:{
   method:'Para Humalog U-100 SC: solución transparente e incolora; administrar dentro de los 15 minutos antes de una comida o inmediatamente después. Rotar sitios de inyección. NO hay reconstitución para la presentación SC de referencia.',
   restrictions:'No trasladar estas indicaciones a Humalog U-200, formulaciones Mix, vías IV ni bomba. Las plumas muestran unidades, sin conversión a mL. Evitar mezclas no autorizadas.',
   scope:'Humalog U-100, administración subcutánea con comida; vía IV no habilitada en esta ficha',
   sourceSection:'2.1 Important Administration; 2.2 SC Administration; 2.3 Dosage Recommendations',
   finalValidation:'La cantidad de unidades depende de prescripción individual y protocolo de diabetes; no puede inferirse de la etiqueta.'
  },
  regimens:[{id:'adult-lispro-mealtime-sc',population:'adult',indication:'adult-lispro-mealtime-sc',title:'Adulto · lispro U-100 como bolo prandial SC',route:'sc',
   reference:'La etiqueta NO establece una dosis fija segura para todos los pacientes. Indica ADMINISTRAR la dosis individual prescrita dentro de los 15 minutos antes de comer o inmediatamente después; ajustar según glucosa, comidas, actividad, función orgánica y esquema previo.',
   context:'No genera unidades ni propone correcciones de glucosa. DM1 debe tener estrategia basal junto con dosis prandiales; ante crisis hiperglucémica o ayuno hospitalario se requiere protocolo diferente.',
   constraints:['Humalog U-100 identificado; comida disponible y glucosa verificada','Hipoglucemia ausente y plan de insulina basal/bolos revisado']}]}
];
const newIds=Object.freeze(Object.fromEntries(review.map(x=>[x.id,x])));
const records=Object.freeze([...base.records,...review]);
const byId=Object.freeze({...base.byId,...newIds});
const yesNo=['yes','no','unknown'];
function check(id,x){
 if(!newIds[id])return base.check(id,x);
 const item=newIds[id],errors=[];
 if(!x||x.population!=='adult')errors.push('Pauta solo cotejada para adultos en esta indicación.');
 if(x?.allergy!=='no')errors.push('Alergia/hipersensibilidad presente o incierta: requiere verificación.');
 if(x?.pregnancy!=='no')errors.push('Embarazo posible/no evaluado: no se habilita este escenario.');
 if(x?.productConfirmed!=='yes')errors.push('Presentación, concentración y etiqueta no verificadas.');
 if(x?.hospitalProtocol!=='yes')errors.push('Protocolo o supervisión clínica institucional no confirmados.');
 const regimen=item.regimens.find(r=>r.population===x?.population&&r.indication===x?.indication);
 if(!regimen)errors.push('Indicación fuera de los escenarios con cotejo documental.');
 if(x?.route!==regimen?.route)errors.push('Vía no coincide con la referencia de formulación.');
 if(id==='potasio-iv'){
  if(x?.kRange!=='noncritical')errors.push('Solo hipopotasemia no crítica con K >2.5 y <3.5 mEq/L; otros rangos requieren protocolo distinto.');
  if(x?.renalStable!=='yes')errors.push('Función renal/diuresis no verificadas o alteradas.');
  if(x?.monitoring!=='yes')errors.push('Monitorización de K/ECG no disponible o no confirmada.');
  if(x?.dilutionValidated!=='yes')errors.push('La dilución/concentración por Farmacia no ha sido validada.');
  if(x?.urgentSymptoms!=='no')errors.push('Síntomas graves o alteración ECG requieren evaluación urgente.');
 }
 if(id==='heparina'){
  if(x?.bleeding!=='no')errors.push('Hemorragia activa no descartada.');
  if(x?.hit!=='no')errors.push('Antecedente/sospecha de HIT presente o no evaluada.');
  if(x?.labMonitoring!=='yes')errors.push('Sin monitorización aPTT/anti-Xa, plaquetas y laboratorio basal.');
  if(x?.neuroaxial!=='no')errors.push('Procedimiento neuroaxial por aclarar.');
  if(x?.vialStrength!=='yes')errors.push('Potencia y finalidad del vial de heparina sin verificar.');
 }
 if(id==='insulina-lispro'){
  if(x?.formulation!=='u100')errors.push('Referencia únicamente para Humalog U-100, no U-200 o Mix.');
  if(x?.hypoglycemia!=='no')errors.push('Hipoglucemia presente o no descartada.');
  if(x?.meal!=='yes')errors.push('Comida e ingesta no confirmadas.');
  if(x?.glucose!=='yes')errors.push('Glucemia actual y plan de vigilancia no verificados.');
  if(x?.insulinPlan!=='yes')errors.push('Plan individual basal/bolo no revisado.');
 }
 if(errors.length)return {status:'blocked',messages:errors,warnings:[],regimen:null,monograph:item};
 return {status:'reference',messages:[],warnings:[
  'LECTURA DOCUMENTAL DE ETIQUETA US; NO implica dosis individual, autorización en México, ni validación clínica/farmacéutica independiente.',
  'Alto riesgo (ISMP). No efectuar preparación o administración sin verificación farmacéutica y protocolo institucional.'],regimen,monograph:item};
}
function indications(id,pop){if(!newIds[id])return base.indications(id,pop);return review.filter(x=>x.id===id).flatMap(x=>x.regimens.filter(r=>r.population===pop).map(r=>({id:r.indication,title:r.title})));}
const preparations=Object.freeze({...base.preparations,...Object.fromEntries(review.map(x=>[x.id,x.preparation]))});
const coverage=Object.freeze({totalIndexed:227,labelChecked:records.length,partiallyChecked:records.length,notLabelChecked:227-records.length,clinicallyApproved:0,reviewStandard:'9 fichas parcialmente cotejadas con etiquetas US; ninguna con validación clínica/farmacéutica independiente o IPP mexicana'});
root.KidBumPharmaMonographs=Object.freeze({records,byId,check,indications,preparations,coverage,populations:base.populations});
})(typeof window!=='undefined'?window:globalThis);
