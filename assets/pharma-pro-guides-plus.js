(function(root){
'use strict';
/* Pharma Pro 0.10.32 — expansion to guideline-specified adult scenarios only.
 * Index entries have NO validated dosing monograph; therapeutic associations
 * are informative and not a patient-specific prescription or ranking.
 */
const base=root.KidBumPharmaExpansion;
if(!base)return;
const additions=[
 ['colchicina','Colchicina','Reumatología, Inmunología y Oncología','A','Índice para crisis de gota en escenarios seleccionados; no contiene dosis','Revisar función renal/hepática y combinaciones con inhibidores CYP3A4/P-gp: toxicidad potencialmente grave.',0],
 ['alopurinol','Alopurinol','Reumatología, Inmunología y Oncología','A','Índice para tratamiento reductor de uratos a largo plazo; no trata una crisis aguda de forma aislada.','Comprobar indicación, función renal, hipersensibilidad grave, interacciones y titulación supervisada.',0],
 ['febuxostat','Febuxostat','Reumatología, Inmunología y Oncología','A','Índice de terapia reductora de uratos en pacientes seleccionados.','Evaluar historia de enfermedad cardiovascular, función renal/hepática e interacciones.',0],
 ['sumatriptan','Sumatriptán','Neurología y Psiquiatría','A','Índice para tratamiento agudo de migraña en casos seleccionados.','Verificar diagnóstico, enfermedad cardiovascular, hipertensión no controlada, interacciones y tipo de formulación.',0]
];
const routes=[
 {id:'gota-crisis',name:'Crisis aguda de gota',aliases:'ataque de gota artritis gotosa podagra monoartritis aguda',population:'adult',setting:'consulta',
  source:'https://www.nice.org.uk/guidance/ng219/chapter/Recommendations',year:'NICE NG219 · tratamiento de crisis',
  scope:'Adulto con ataque de gota confirmado, clínicamente estable; no corresponde a artritis séptica ni a pacientes embarazadas.',
  factors:['Descartar artritis séptica si monoartritis febril o diagnósticos inciertos','Función renal/hepática y comorbilidades','AINE concomitantes y riesgo gastrointestinal','Interacciones de colchicina y posibilidad de glucocorticoides','Evaluar infección y contraindicaciones'],
  redFlags:'Monoartritis con fiebre, inmunosupresión, sepsis o dolor/destrucción articular grave: excluir artritis séptica sin demorar evaluación.',
  options:[['colchicina','Primera línea posible según contexto','Comprobar función renal/hepática, inhibidores CYP3A4/P-gp y margen terapéutico.'],['naproxeno','Primera línea posible según contexto','Representa AINE; evitar duplicidades, vigilar función renal y riesgo de hemorragia.'],['prednisona','Primera línea posible según contexto','Corticoide oral de corta duración en pacientes seleccionados; excluir infección.']]},
 {id:'gota-uratos',name:'Gota · prevención y reducción de urato',aliases:'gota cronica hiperuricemia gota tofos urato alopurinol tratamiento largo plazo',population:'adult',setting:'consulta',
  source:'https://www.nice.org.uk/guidance/ng219/chapter/Recommendations',year:'NICE NG219 · ULT (tratamiento reductor de urato)',
  scope:'Adulto con gota diagnosticada e indicación de tratamiento reductor de urato; no implica tratar hiperuricemia asintomática.',
  factors:['Número de crisis, tofos y enfermedad renal','Historia cardiovascular','Uricemia y objetivo individual','Función renal y antecedentes de reacciones cutáneas','Prevención de brotes al iniciar terapia'],
  redFlags:'Artritis aguda febril o sospecha de infección articular: evaluación urgente antes de asumir gota.',
  options:[['alopurinol','Primera línea en enfermedad cardiovascular relevante','Titulación individualizada para objetivo de urato; vigilar eventos adversos.'],['febuxostat','Alternativa de primera línea contextual','Valorar riesgo cardiovascular; no sustituye evaluación específica.'],['colchicina','Prevención de brotes durante inicio de ULT','Coadyuvante cuando esté indicado; NO reduce urato.']]},
 {id:'reflujo-gastroesofagico',name:'Reflujo gastroesofágico sin signos de alarma',aliases:'erge gerd enfermedad reflujo acidez ardor pirosis agruras',population:'adult',setting:'consulta',
  source:'https://www.nice.org.uk/guidance/cg184/chapter/Recommendations',year:'NICE CG184 · manejo de ERGE',
  scope:'Adulto con enfermedad por reflujo gastroesofágico evaluada, sin disfagia progresiva, sangrado ni otros signos de alarma.',
  factors:['Descartar alarma y otras causas de dolor torácico','Medicamentos concomitantes y antecedentes de úlcera','Respuesta previa y duración de tratamiento','Interacciones y uso prolongado de IBP','Considerar H. pylori según diagnóstico'],
  redFlags:'Disfagia progresiva, hemorragia digestiva, pérdida ponderal inexplicada o dolor torácico agudo: evaluación prioritaria.',
  options:[['omeprazol','Clase IBP: tratamiento inicial','IBP de referencia; confirmar indicación, pauta y duración según guía.'],['pantoprazol','Alternativa dentro de clase IBP','No utilizar simultáneamente dos IBP; revisar interacciones.'],['famotidina','Alternativa ante respuesta insuficiente a IBP','Bloqueador H2 en escenarios específicos; revisar función renal.']]},
 {id:'fibrilacion-auricular-anticoagulacion',name:'Fibrilación auricular · prevención de ictus',aliases:'fibrilacion auricular fa anticoagulacion cha2ds2 vasc embolia ictus',population:'adult',setting:'especialista',
  source:'https://www.nice.org.uk/guidance/ng196/chapter/Recommendations',year:'NICE NG196 · anticoagulación para FA',
  scope:'Adulto con fibrilación auricular documentada, indicación de prevención embólica tras valoración de CHA₂DS₂-VASc y sangrado; no aplicable automáticamente a prótesis valvular mecánica ni estenosis mitral moderada-grave.',
  factors:['Confirmar ritmo/diagnóstico','Calcular CHA₂DS₂-VASc y revisar factores hemorrágicos','Función renal, peso, edad e interacciones','Tipo de enfermedad valvular','Procedimientos y tratamiento antitrombótico actual'],
  redFlags:'Déficit neurológico focal agudo, síncope, inestabilidad, dolor torácico o sangrado mayor activo requieren valoración urgente.',
  options:[['apixaban','Anticoagulante oral directo opcional','Si está indicada anticoagulación y no existen exclusiones; dosis según criterios individuales.'],['rivaroxaban','Anticoagulante oral directo opcional','Considerar función renal, interacciones y presentación.'],['dabigatran','Anticoagulante oral directo opcional','Revisar función renal y contraindicaciones específicas.'],['edoxaban','Anticoagulante oral directo opcional','Revisar función renal y contraindicaciones específicas.'],['warfarina','Alternativa antagonista vitamina K','Cuando los ACOD no son adecuados; requiere control de INR.']]},
 {id:'hipotiroidismo-primario',name:'Hipotiroidismo primario manifiesto',aliases:'hipotiroidismo tiroides baja tsh alta t4 baja hashimoto',population:'adult',setting:'consulta',
  source:'https://www.nice.org.uk/guidance/ng145/chapter/recommendations',year:'NICE NG145 · hipotiroidismo primario',
  scope:'Adulto con hipotiroidismo primario clínicamente confirmado por evaluación hormonal; NO extrapolar a hipotiroidismo central o subclínico.',
  factors:['TSH y FT4 confirmadas','Edad y cardiopatía','Embarazo','Interacciones que alteran absorción','Objetivo y cronograma de seguimiento'],
  redFlags:'Alteración marcada del estado mental, hipotermia, bradicardia profunda o compromiso ventilatorio: descartar coma mixedematoso urgente.',
  options:[['levotiroxina','Tratamiento de primera línea','Reemplazo hormonal; ajustar según edad, cardiopatía, TSH y seguimiento, sin calcular aquí dosis.']]},
 {id:'migrana-tratamiento-agudo',name:'Migraña · tratamiento de crisis',aliases:'crisis migraña jaqueca dolor migrañoso agudo',population:'adult',setting:'consulta',
  source:'https://www.nice.org.uk/guidance/cg150/chapter/recommendations',year:'NICE CG150 · crisis migrañosa (actualización 2025)',
  scope:'Adulto con migraña diagnosticada y crisis aguda sin signos de alarma neurológicos; no usar en cefalea no estudiada o embarazo.',
  factors:['Confirmar patrón habitual y descartar cefalea secundaria','Comorbilidad cardiovascular e hipertensión','Uso excesivo de analgésicos/triptanes','Contraindicaciones a AINE','Náuseas, vía de administración y tratamientos previos'],
  redFlags:'Cefalea en trueno, déficit neurológico persistente, rigidez de nuca, fiebre o cambio radical del patrón: evaluación urgente.',
  options:[['sumatriptan','Componente triptán de opción combinada','En personas elegibles, combinado con un AINE o paracetamol según guía.'],['naproxeno','Componente AINE de opción combinada','No duplicar otros AINE; considerar riesgo renal y gastrointestinal.'],['paracetamol','Alternativa o componente combinado','Revisar cantidad acumulada, función hepática y duplicación en combinados.'],['metoclopramida','Antiemético adyuvante contextual','Revisar efectos extrapiramidales, interacciones y contraindicación.']]}
];
root.KidBumPharmaExpansion=Object.freeze({...base,catalog:Object.freeze([...base.catalog,...additions]),conditions:Object.freeze([...base.conditions,...routes])});
})(typeof window!=='undefined'?window:globalThis);
