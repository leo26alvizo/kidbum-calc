/* KidBum Urgencias y Terapia Intensiva v0.10.56
 * Adults only. Fast deterministic danger-first, source-linked clinical pathways.
 * No patient data, automated orders, dosing, differential claim of exclusion or discharge decisions.
 */
(function(root){
'use strict';
const SOURCES=Object.freeze({
 AHA:{label:'AHA · Adult Advanced Life Support 2025',year:'2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support'},
 AHA_ALG:{label:'AHA · algoritmos originales ALS, BLS y cuidados post-paro',year:'2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms'},
 POST:{label:'AHA · Adult Post-Cardiac Arrest Care',year:'2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care'},
 SSC:{label:'SCCM/ESICM · Surviving Sepsis Campaign en adultos',year:'2026',url:'https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'},
 ACS:{label:'ACC/AHA · Síndromes coronarios agudos',year:'2025',url:'https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes'},
 PE:{label:'AHA/ACC y otras sociedades · Embolia pulmonar aguda',year:'2026',url:'https://professional.heart.org/en/science-news/2026-guideline-for-the-evaluation-and-management-of-acute-pulmonary-embolism-in-adults'},
 BP:{label:'ACC/AHA · Evaluación y manejo de presión arterial',year:'2025',url:'https://www.jacc.org/doi/10.1016/j.jacc.2025.05.007'},
 AF:{label:'ESC · Fibrilación auricular (referencia, no reproducción)',year:'2024',url:'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/atrial-fibrillation'},
 STROKE:{label:'AHA/ASA · Atención temprana de ictus isquémico',year:'2026',url:'https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke'},
 ICH:{label:'AHA/ASA · Hemorragia intracerebral espontánea',year:'2022',url:'https://www.ahajournals.org/doi/10.1161/STR.0000000000000407'},
 EPILEPSY:{label:'NICE NG217 · Estado epiléptico y crisis prolongadas',year:'2022; actualización en sitio',url:'https://www.nice.org.uk/guidance/ng217/chapter/7-Treating-status-epilepticus-repeated-or-cluster-seizures-and-prolonged-seizures'},
 GINA:{label:'GINA · Estrategia global de asma',year:'2026',url:'https://ginasthma.org/2026-gina-strategy-report/'},
 GOLD:{label:'GOLD · Informe y guía EPOC',year:'2026',url:'https://goldcopd.org/2026-gold-report-and-pocket-guide/'},
 ARDS:{label:'ATS · Actualización ARDS del adulto',year:'2024',url:'https://academic.oup.com/ajrccm/article/209/1/24/8427573'},
 RSI:{label:'SCCM · Secuencia rápida de intubación en paciente crítico',year:'2023',url:'https://sccm.org/clinical-resources/guidelines/guidelines/guidelines-rapid-sequence-intubation'},
 ADA:{label:'ADA/AACE/EASD/JBDS · Consenso de crisis hiperglucémicas en adultos',year:'2024',url:'https://diabetesjournals.org/care/article/47/8/1257/156758/Hyperglycemic-Crises-in-Adults-With-Diabetes-A'},
 UKKA:{label:'UK Kidney Association · Hiperpotasemia del adulto',year:'2026',url:'https://guidelines.ukkidney.org/hyperkalaemia/'},
 NICE_LIQ:{label:'NICE CG174 · Líquidos IV en adultos hospitalizados',year:'2013; verificar revisiones',url:'https://www.nice.org.uk/guidance/cg174'},
 NICE_AKI:{label:'NICE NG148 · Lesión renal aguda',year:'2019; verificar revisiones',url:'https://www.nice.org.uk/guidance/ng148/chapter/Recommendations'},
 NICE_GI:{label:'NICE CG141 · Hemorragia digestiva alta aguda',year:'2012; verificar revisiones',url:'https://www.nice.org.uk/guidance/cg141'},
 ACG_GI:{label:'ACG · Upper gastrointestinal and ulcer bleeding',year:'2021',url:'https://pubmed.ncbi.nlm.nih.gov/33929377/'},
 PADIS:{label:'SCCM · PADIS: actualización de dolor, sedación y delirium',year:'2025',url:'https://sccm.org/clinical-resources/guidelines/guidelines/focused-update-padis-guideline'},
 TX:{label:'NICE NG225 · Autolesión y atención de urgencia (marco de seguridad)',year:'2022',url:'https://www.nice.org.uk/guidance/ng225'},
 END:{label:'Endocrine Society · Hipoglucemia en diabetes y riesgo',year:'2022; actualización en sitio',url:'https://www.endocrine.org/clinical-practice-guidelines/management-of-individuals-with-diabetes-at-high-risk-for-hypoglycemia'},
 AHA_HF:{label:'AHA/ACC/HFSA · Insuficiencia cardiaca',year:'2022; actualizaciones por sociedad',url:'https://professional.heart.org/en/science-news/2022-guideline-for-the-management-of-heart-failure'},
 WHO_BURN:{label:'WHO · Burn management guidance',year:'recurso de referencia',url:'https://www.who.int/news-room/fact-sheets/detail/burns'}
});
const ALGORITHMS=[];
function outcome(tone,title,summary,actions){return {tone,title,summary,actions};}
function simple(x){
 const scope=x.scope||'Adultos de 18 años o más en urgencias/UCI. No extrapolar a pediatría, embarazo, gestación/puerperio o poblaciones excluidas sin protocolo específico.';
 const Q='¿Existe amenaza vital inmediata: '+x.red+'?';
 const H=x.redHint||'Hacer ABCDE, signos vitales, glucemia/ECG y exploración dirigida; actuar antes de completar el algoritmo si aparece inestabilidad.';
 const B='Sin esa alarma inmediata: ¿hay '+x.yellow+'?';
 const I=x.yellowHint||'Considerar diagnóstico diferencial, examen seriado, estudio indicado y recursos de reanimación disponibles.';
 const critical=outcome('danger',x.critTitle||'🚨 Reanimación y escalamiento inmediato',x.crit,[x.critA,x.critB].concat(x.critC?[x.critC]:[]));
 const urgent=outcome('warning',x.yesTitle||'⚠️ Atención urgente y tratamiento dirigido',x.yes,[x.yesA,x.yesB].concat(x.yesC?[x.yesC]:[]));
 const evaluate=outcome('warning',x.normalTitle||'Evaluación clínica y vigilancia',x.normal,[x.normalA||'Buscar diagnósticos alternativos y registrar constantes vitales con evolución.',x.normalB||'Reevaluar si aparecen signos de alarma, síntomas progresivos o nueva información.']);
 const uncertain=outcome('warning','⚠️ No se puede clasificar con los datos disponibles','La incertidumbre no permite descartar una enfermedad tiempo-dependiente ni indicar tratamiento a ciegas.',[
  'Completar ABCDE, ECG, perfusión, oxigenación, exploración dirigida y estudios discriminatorios indicados; pedir evaluación experta según gravedad.',
  'Si hay deterioro o signos vitales críticos, activar atención inmediata sin esperar esta herramienta.'
 ]);
 const sources=x.sources.map(k=>{if(!SOURCES[k])throw Error('Fuente no registrada '+k);return SOURCES[k];});
 ALGORITHMS.push({id:x.id,icon:x.icon,category:x.cat,title:x.title,subtitle:x.sub,scope,
  urgency:x.priority||'prioritaria',time:'2 decisiones',sources,start:'danger',
  nodes:{
   danger:{question:Q,hint:H,choices:[
    {label:'🚨 Sí · amenaza vital',next:'critical',tone:'danger'},
    {label:'No se identifican esas alarmas',next:'screen'},
    {label:'No puedo determinarlo',next:'assess',tone:'warning'}]},
   screen:{question:B,hint:I,choices:[
    {label:'Sí · sospecha/criterios presentes',next:'urgent',tone:'warning'},
    {label:'No se identifican esos datos',next:'evaluate'},
    {label:'Información insuficiente',next:'assess',tone:'warning'}]}
  },
  outcomes:{critical,urgent,evaluate,assess:uncertain}
 });
}
function custom(a){ALGORITHMS.push(a);}
root.KidBumCriticalDraft=Object.freeze({simple,custom,outcome,sources:SOURCES,algorithms:ALGORITHMS});
})(typeof window!=='undefined'?window:globalThis);
