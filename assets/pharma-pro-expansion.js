(function(root){
'use strict';
/* Pharma Pro expansion 0.10.31. Index additions are *not* validated drug monographs.
   Disease pathways are non-patient-specific, adult outpatient guideline orientation.
   High-alert category: ISMP Acute Care 2024 (route-specific where applicable).
   LASA names and Tall Man rendering: FDA name differentiation; 2025 ISMP Spain.
*/
const groups={
'Antimicrobianos':[
'nitrofurantoina|Nitrofurantoína','fosfomicina|Fosfomicina','trimetoprima|Trimetoprima','trimetoprima-sulfametoxazol|Trimetoprima / sulfametoxazol',
'ciprofloxacino|Ciprofloxacino','levofloxacino|Levofloxacino','doxiciclina|Doxiciclina','claritromicina|Claritromicina','eritromicina|Eritromicina','clindamicina|Clindamicina','linezolid|Linezolid','daptomicina|Daptomicina','fluconazol|Fluconazol','voriconazol|Voriconazol','anfotericina-b|Anfotericina B convencional','anfotericina-b-liposomal|Anfotericina B liposomal','aciclovir|Aciclovir','valaciclovir|Valaciclovir','oseltamivir|Oseltamivir','cefixima|Cefixima','cefuroxima|Cefuroxima','ceftazidima|Ceftazidima','cefoxitina|Cefoxitina','penicilina-g|Penicilina G','penicilina-v|Fenoximetilpenicilina','ampicilina|Ampicilina','oxacilina|Oxacilina','rifampicina|Rifampicina','isoniazida|Isoniazida','etambutol|Etambutol','pirazinamida|Pirazinamida','cicloserina|Cicloserina','azitromicina-iv|Azitromicina IV (presentación específica)'],
'Cardiovascular':[
'enalapril|Enalapril','lisinopril|Lisinopril','ramipril|Ramipril','valsartan|Valsartán','candesartan|Candesartán','olmesartan|Olmesartán','telmisartan|Telmisartán','hidroclorotiazida|Hidroclorotiazida','clortalidona|Clortalidona','indapamida|Indapamida','bisoprolol|Bisoprolol','carvedilol|Carvedilol','propranolol|Propranolol','labetalol|Labetalol','hidralazina|Hidralazina','nicardipina|Nicardipina','nifedipina|Nifedipina','diltiazem|Diltiazem','verapamilo|Verapamilo','digoxina|Digoxina','espironolactona|Espironolactona','eplerenona|Eplerenona','sacubitrilo-valsartan|Sacubitrilo / valsartán','nitroglicerina|Nitroglicerina','nitroprusiato|Nitroprusiato sódico','ivabradina|Ivabradina'],
'Endocrinología':[
'empagliflozina|Empagliflozina','dapagliflozina|Dapagliflozina','canagliflozina|Canagliflozina','semaglutida|Semaglutida','liraglutida|Liraglutida','dulaglutida|Dulaglutida','tirzepatida|Tirzepatida','sitagliptina|Sitagliptina','linagliptina|Linagliptina','glimepirida|Glimepirida','glipizida|Glipizida','glibenclamida|Glibenclamida (glyburide)','pioglitazona|Pioglitazona','glucagon|Glucagón'],
'Neurología y Psiquiatría':[
'hidroxizina|Hidroxizina','levetiracetam|Levetiracetam','valproato|Ácido valproico / valproato','lamotrigina|Lamotrigina','carbamazepina|Carbamazepina','fenitoina|Fenitoína','fenobarbital|Fenobarbital','clobazam|Clobazam','topiramato|Topiramato','gabapentina|Gabapentina','pregabalina|Pregabalina','amitriptilina|Amitriptilina','sertralina|Sertralina','fluoxetina|Fluoxetina','escitalopram|Escitalopram','bupropion|Bupropión','buspirona|Buspirona','trazodona|Trazodona','tramadol|Tramadol','risperidona|Risperidona','quetiapina|Quetiapina','haloperidol|Haloperidol','olanzapina|Olanzapina','litio|Carbonato de litio'],
'Neumología':[
'salbutamol|Salbutamol','ipratropio|Ipratropio','budesonida|Budesonida','fluticasona|Fluticasona','budesonida-formoterol|Budesonida / formoterol','fluticasona-salmeterol|Fluticasona / salmeterol','tiotropio|Tiotropio','umeclidinio-vilanterol|Umeclidinio / vilanterol','montelukast|Montelukast','acetilcisteina|Acetilcisteína'],
'Urgencias y Anestesia':[
'propofol|Propofol','ketamina|Ketamina','midazolam|Midazolam','lorazepam|Lorazepam','diazepam|Diazepam','rocuronio|Rocuronio','vecuronio|Vecuronio','succinilcolina|Succinilcolina','cisatracurio|Cisatracurio','dexmedetomidina|Dexmedetomidina','dobutamina|Dobutamina','dopamina|Dopamina','vasopresina|Vasopresina','fenilefrina|Fenilefrina','acido-tranexamico|Ácido tranexámico','naloxona|Naloxona','flumazenilo|Flumazenilo','lidocaina-iv|Lidocaína IV (antiarrítmico)','protamina|Protamina'],
'Antitrombóticos':[
'rivaroxaban|Rivaroxabán','dabigatran|Dabigatrán','edoxaban|Edoxabán','clopidogrel|Clopidogrel','acido-acetilsalicilico|Ácido acetilsalicílico','alteplasa|Alteplasa','tenecteplasa|Tenecteplasa'],
'Reumatología, Inmunología y Oncología':[
'metotrexato|Metotrexato','leflunomida|Leflunomida','sulfasalazina|Sulfasalazina','hidroxicloroquina|Hidroxicloroquina','ciclosporina|Ciclosporina','vincristina|Vincristina','vinblastina|Vinblastina','cisplatino|Cisplatino','carboplatino|Carboplatino','doxorrubicina|Doxorrubicina','azatioprina|Azatioprina'],
'Gastroenterología':[
'pantoprazol|Pantoprazol','famotidina|Famotidina','sucralfato|Sucralfato','mesalazina|Mesalazina','lactulosa|Lactulosa','loperamida|Loperamida','domperidona|Domperidona','acido-ursodesoxicolico|Ácido ursodesoxicólico'],
'Obstetricia y Ginecología':[
'oxitocina|Oxitocina','misoprostol|Misoprostol','metilergonovina|Metilergonovina','atosiban|Atosibán','betametasona|Betametasona','progesterona|Progesterona'],
'Electrolitos y Soluciones':[
'sodio-hipertonico|Cloruro de sodio hipertónico inyectable (>0.9%)','fosfato-potasio-iv|Fosfato de potasio inyectable','dextrosa-hipertonica|Dextrosa hipertónica ≥20%','cloruro-calcio|Cloruro de calcio inyectable','acetazolamida|Acetazolamida'],
'Endocrinología y Corticoides':[
'prednisolona|Prednisolona','hidrocortisona|Hidrocortisona','dexametasona|Dexametasona','metilprednisolona|Metilprednisolona','levotiroxina-sodica-iv|Levotiroxina IV (presentación específica)','propiltiouracilo|Propiltiouracilo','metimazol|Metimazol','cinacalcet|Cinacalcet'],
'Analgesia':[
'buprenorfina|Buprenorfina','hidromorfona|Hidromorfona','oxycodona|Oxicodona','naproxeno|Naproxeno','diclofenaco|Diclofenaco','celecoxib|Celecoxib'],
};
const info={
'Antimicrobianos':['Índice de agente antiinfeccioso: solo usar para diagnóstico susceptible tras valorar microbiología y política antimicrobiana.','Verificar alergias, órgano diana, cultivos, función renal/hepática, vía y resistencia local.'],
'Cardiovascular':['Índice cardiovascular: la elección depende de diagnóstico, estado hemodinámico y comorbilidades.','Verificar PA, FC, función renal, potasio, embarazo e interacciones según clase.'],
'Endocrinología':['Índice endocrinológico: indicación, riesgo de hipoglucemia y beneficio cardiorrenal según producto.','Verificar diagnóstico, glucemia, función renal, embarazo, formulación y tratamiento previo.'],
'Neurología y Psiquiatría':['Índice neurológico/psiquiátrico: indicación concreta y población deben corroborarse.','Revisar sedación, convulsiones, interacciones, embarazo y función renal/hepática.'],
'Neumología':['Índice respiratorio: elegir según diagnóstico y tratamiento escalonado, no por similitud de inhaladores.','Revisar diagnóstico, técnica inhalatoria, tipo de dispositivo y pauta indicada.'],
'Urgencias y Anestesia':['Índice de medicación de urgencias o anestesia: no contiene órdenes ni preparaciones.','Requiere monitorización, identificación de vía/concentración y personal entrenado.'],
'Antitrombóticos':['Índice antitrombótico: distinguir profilaxis, anticoagulación terapéutica y antiagregación.','Revisar sangrado, plaquetas, función renal, interacciones y procedimientos.'],
'Reumatología, Inmunología y Oncología':['Índice de tratamiento especializado: no se propone elección ni pauta sin valoración de especialista.','Verificar indicación, embarazo, inmunosupresión, hemograma y función orgánica.'],
'Gastroenterología':['Índice gastrointestinal: consultar etiología, duración y contraindicaciones del tratamiento.','Verificar diagnóstico, duración, interacciones y función renal/hepática.'],
'Obstetricia y Ginecología':['Índice obstétrico: requiere indicación y protocolo materno-fetal específico.','Verificar edad gestacional, contexto obstétrico, contraindicaciones y monitorización.'],
'Electrolitos y Soluciones':['Índice de productos electrolíticos: formulación y vía son determinantes de seguridad.','Alto riesgo de errores de concentración, compatibilidad y velocidad; confirmar farmacia.'],
'Endocrinología y Corticoides':['Índice de terapia hormonal/corticoide: diferenciar indicación, dosis y suspensión.','Verificar embarazo, función orgánica, infecciones y cambios terapéuticos.'],
'Analgesia':['Índice de analgesia: la elección depende de dolor, contraindicaciones y antecedentes.','Verificar función renal/hepática, otros depresores y riesgos hemorrágicos.']
};
const highAlertNames=new Set([
'anfotericina-b','anfotericina-b-liposomal',
'digoxina','nitroprusiato',
'glimepirida','glipizida','glibenclamida',
'tramadol',
'propofol','ketamina','midazolam','lorazepam','diazepam','rocuronio','vecuronio','succinilcolina','cisatracurio','dexmedetomidina','dobutamina','dopamina','vasopresina','fenilefrina','acido-tranexamico','lidocaina-iv',
'rivaroxaban','dabigatran','edoxaban','alteplasa','tenecteplasa',
'metotrexato','vincristina','vinblastina','cisplatino','carboplatino','doxorrubicina',
'oxitocina','sodio-hipertonico','fosfato-potasio-iv','dextrosa-hipertonica','buprenorfina','hidromorfona','oxycodona'
]);
const riskScope={
 digoxina:'Inotrópico IV (alto riesgo en esa vía); revisar formulación',
 midazolam:'Sedación IV / sedación pediátrica según contexto',lorazepam:'Sedación IV / sedación pediátrica según contexto',diazepam:'Sedación IV y pediátrica según contexto',
 'acido-tranexamico':'Solo formulación inyectable',lidocaina-iv:'Solo formulación IV antiarrítmica',
 oxitocina:'Solo vía IV en lista ISMP',dopamina:'Administración IV',dobutamina:'Administración IV',vasopresina:'IV o intraósea',
 fenilefrina:'Administración IV',metotrexato:'Metotrexato oral no oncológico y antineoplásicos',
 'anfotericina-b':'Formulación convencional: no intercambiar con liposomal','anfotericina-b-liposomal':'Formulación liposomal: no intercambiar con convencional',
};
const catalog=Object.freeze(Object.entries(groups).flatMap(([group,lines])=>lines.map(v=>{
 const [id,name]=v.split('|');
 return [id,name,group,'A',info[group][0],info[group][1],highAlertNames.has(id)?1:0];
})));
const highAlertScope=Object.freeze(riskScope);
/* Only evidence-backed name pairs. Do not extrapolate LASA status from spelling distance. */
const lasaPairs=Object.freeze([
 {ids:['hidralazina','hidroxizina'],display:['hydrALAZINE','hydrOXYzine'],source:'fda'},
 {ids:['dopamina','dobutamina'],display:['DOPamine','DOBUTamine'],source:'fda'},
 {ids:['prednisona','prednisolona'],display:['predniSONE','prednisoLONE'],source:'fda'},
 {ids:['glipizida','glibenclamida'],display:['glipiZIDE','glyBURIDE'],source:'fda'},
 {ids:['vincristina','vinblastina'],display:['vinCRIStine','vinBLAStine'],source:'fda'},
 {ids:['ciclosporina','cicloserina'],display:['cycloSPORINE','cycloSERINE'],source:'fda'},
 {ids:['trazodona','tramadol'],display:['traZODone','traMADol'],source:'fda'},
 {ids:['cisplatino','carboplatino'],display:['CISplatin','CARBOplatin'],source:'fda'},
 {ids:['bupropion','buspirona'],display:['buPROPion','busPIRone'],source:'fda'},
 {ids:['nicardipina','nifedipina'],display:['niCARdipine','NIFEdipine'],source:'fda'},
 {ids:['cefotaxima','cefoxitina'],display:['cefOTAXima','cefOXitina'],source:'ismpes'}
]);
const sources=Object.freeze({
 high:{title:'ISMP 2024 · Medicamentos de alto riesgo en hospitales',url:'https://www.ismp.org/system/files/resources/2024-01/ISMP_HighAlert_AcuteCare_List_010924_MS5760.pdf'},
 fda:{title:'FDA · Name Differentiation Project / Tall Man Lettering',url:'https://www.fda.gov/drugs/medication-errors-related-cder-regulated-drug-products/fda-name-differentiation-project'},
 ismpes:{title:'ISMP España · Lista de nombres similares actualizada 2025',url:'https://www.ismp-espana.org/noticias/view/204'},
 who:{title:'OMS · Medication safety for look-alike, sound-alike medicines (2023)',url:'https://www.who.int/publications/i/item/9789240058897'}
});
/* Guideline mappings apply ONLY to specified ADULT setting and clinical phenotype.
   'first' means a guideline-listed pathway option, not best treatment for a person.
   Each medication must be in catalog and no drug dose is provided by this module. */
const conditions=Object.freeze([
 {id:'hipertension-arterial',name:'Hipertensión arterial primaria',aliases:'hta has presion alta hipertension arterial esencial',population:'adult',setting:'consulta',source:'https://www.dof.gob.mx/2025/CSG/PRONAM_Hipertension_Arterial_Sistemica.pdf',year:'PRONAM México 2025',
  scope:'Adulto con hipertensión primaria confirmada, no embarazado, sin urgencia hipertensiva ni causa secundaria.',
  factors:['Edad y fragilidad','Riesgo cardiovascular','Diabetes/IRC/cardiopatía','Función renal y potasio','Embarazo y ortostatismo'],
  redFlags:'Dolor torácico, déficit neurológico, disnea o datos de lesión aguda de órgano blanco requieren urgencias.',
  options:[['amlodipino','Opción de primera línea','Calcioantagonista; considerar comorbilidades y edema'],['losartan','Opción de primera línea','ARA-II; controlar K y función renal, contraindicado en embarazo'],['enalapril','Opción de primera línea','IECA; no combinar con ARA-II'],['clortalidona','Alternativa/componente de combinación','Diurético; vigilar sodio, potasio, función renal']]},
 {id:'diabetes-tipo-2',name:'Diabetes mellitus tipo 2',aliases:'dm2 diabetes tipo ii azucar alta hiperglucemia cronica',population:'adult',setting:'consulta',source:'https://www.nice.org.uk/guidance/ng28/chapter/initial-medicines',year:'NICE NG28 actualizado febrero 2026 · contrastar PRONAM México',
  scope:'Adulto no embarazado con DM2 establecida y sin crisis hiperglucémica; recomendaciones dependen de comorbilidades y TFG.',
  factors:['TFG','Enfermedad cardiovascular, insuficiencia cardiaca o renal','HbA1c y síntomas','Riesgo hipoglucemia','Disponibilidad y presentación local'],
  redFlags:'Deshidratación marcada, vómitos, alteración de conciencia o sospecha de CAD/EHH: evaluación urgente; no tratar desde este buscador.',
  options:[['metformina','Componente inicial contextual','NICE 2026 utiliza metformina de liberación modificada si elegible'],['empagliflozina','Componente inicial contextual','Inhibidor SGLT2 si función renal y perfil adecuados'],['dapagliflozina','Alternativa de la misma clase','Inhibidor SGLT2; no combinar dos de la misma clase'],['semaglutida','Según comorbilidad','GLP-1 RA en escenarios concretos; revisar formulación, comorbilidades y criterios']]},
 {id:'asma-adultos',name:'Asma persistente o episódica en adultos',aliases:'asma bronquial asma inhaladores control asma no severa',population:'adult',setting:'consulta',source:'https://ginasthma.org/wp-content/uploads/2026/07/GINA-Summary-Guide-2026-WEB-WMS.pdf',year:'GINA 2026 · Track 1',
  scope:'Asma confirmada en adulto/adolescente; tratamiento escalonado según síntomas, exacerbaciones, técnica inhalatoria y adherencia.',
  factors:['Frecuencia de síntomas y exacerbaciones','Control y función pulmonar','Técnica y dispositivo','Adherencia','Acceso a inhalador combinado adecuado'],
  redFlags:'Disnea intensa, silencio auscultatorio, agotamiento, hipoxemia o dificultad para hablar: urgencia respiratoria.',
  options:[['budesonida-formoterol','Preferido según escalón de GINA Track 1','Combinación CI-formoterol para alivio antiinflamatorio, con o sin mantenimiento según escalón'],['budesonida','Componente de otra vía escalonada','Corticoide inhalado; no equivale a la pauta Track 1 si se usa sin formoterol']]},
 {id:'epoc-estable',name:'EPOC estable (tratamiento inhalado)',aliases:'epoc copd enfermedad pulmonar obstructiva cronica bronquitis cronica enfisema',population:'adult',setting:'consulta',source:'https://goldcopd.org/wp-content/uploads/2025/11/GOLD-REPORT-2026-v1.2-20Nov2025_WMV.pdf',year:'GOLD 2026',
  scope:'Adulto con EPOC confirmado por espirometría; esquema inicial depende de grupo A/B/E, síntomas y exacerbaciones.',
  factors:['Espirometría compatible','Grupo clínico A/B/E','Exacerbaciones previas','Eosinófilos','Técnica y adherencia'],
  redFlags:'Aumento agudo de disnea, hipoxemia o hipercapnia, confusión o cianosis: valorar exacerbación/urgencia, NO buscar esquema estable.',
  options:[['tiotropio','Opción para broncodilatación de mantenimiento','LAMA; puede ser opción según grupo y respuesta'],['umeclidinio-vilanterol','Preferible en grupos B/E si elegible','Combinación LAMA/LABA; no universal para todos los grupos'],['salbutamol','Alivio de síntomas','Broncodilatador de rescate; no sustituye mantenimiento indicado']]},
 {id:'cistitis-no-complicada',name:'Cistitis aguda no complicada',aliases:'infeccion urinaria baja ivu itu cistitis disuria',population:'adult',setting:'consulta',source:'https://www.nice.org.uk/guidance/ng109/chapter/Recommendations',year:'NICE NG109 · antibiograma y protocolo mexicano prevalecen',
  scope:'MUJER adulta NO embarazada con cistitis baja NO complicada, sin fiebre ni dolor en flancos. No aplica a varones, embarazo, pielonefritis o infección complicada.',
  factors:['Sexo clínico/población elegible','Embarazo','Fiebre o dolor lumbar','Función renal','Alergias, cultivos y resistencias'],
  redFlags:'Fiebre, dolor lumbar, vómitos, choque o embarazo: requiere vía diagnóstica/terapéutica distinta.',
  options:[['nitrofurantoina','Primera opción contextual','NICE condiciona al umbral de eGFR apropiado y al cultivo/local resistencia'],['trimetoprima','Primera opción cuando resistencia baja','No asumir susceptibilidad; revisar epidemiología local'],['fosfomicina','Segunda opción según guía citada','Usar presentación e indicación específicas; verificar disponibilidad y resistencia']]},
 {id:'neumonia-comunidad-baja',name:'Neumonía adquirida en la comunidad de baja gravedad',aliases:'neumonia comunitaria nac cap infeccion pulmonar',population:'adult',setting:'consulta',source:'https://www.nice.org.uk/guidance/NG250/chapter/recommendations',year:'NICE NG250 2025',
  scope:'Adulto con NAC confirmada de baja gravedad, tratamiento oral viable, sin inmunosupresión relevante o riesgo especial de resistencias.',
  factors:['CRB65/CURB65 y oxigenación','Comorbilidades e inmunosupresión','Alergias','Antibióticos previos','Resistencia y sospecha etiológica'],
  redFlags:'Hipoxemia, sepsis, confusión, TA baja o FR elevada requieren valoración urgente/hospitalaria.',
  options:[['amoxicilina','Primera opción en NAC baja gravedad','Antibiótico oral según NICE 2025 si infección bacteriana probable'],['doxiciclina','Alternativa contextual','Alergia a penicilina o patógenos atípicos; verificar contraindicaciones'],['claritromicina','Alternativa contextual','Revisar QT, interacciones, resistencia local']]},
 {id:'insuficiencia-cardiaca-fervi',name:'Insuficiencia cardiaca con fracción de eyección reducida',aliases:'icfer hfr ef falla cardiaca insuficiencia cardiaca sistolica',population:'adult',setting:'consulta',source:'https://www.nice.org.uk/guidance/ng106/chapter/recommendations',year:'NICE NG106 actualizado 2025',
  scope:'IC con FEVI reducida documentada en adulto clínicamente estable; terapia combinada en seguimiento supervisado.',
  factors:['FEVI y clase funcional','TA/FC','Creatinina, TFG y potasio','Congestión y estabilidad','Contraindicaciones e intolerancia'],
  redFlags:'Disnea en reposo, edema agudo pulmonar, hipoperfusión, hipotensión o síncope ameritan evaluación urgente.',
  options:[['enalapril','Componente clase IECA','Una opción representativa de la terapia combinada, si es tolerada'],['bisoprolol','Componente betabloqueador','Sólo iniciar/titular según estabilidad y criterios clínicos'],['espironolactona','Componente antagonista mineralocorticoide','Vigilar potasio/función renal'],['dapagliflozina','Componente SGLT2','Beneficio cardiovascular en población elegible'],['sacubitrilo-valsartan','Considerar cambio según síntomas/tolerancia','ARNI en contextos especificados; NO combinar simultáneamente con IECA']]},
 {id:'migrana-prevencion',name:'Prevención farmacológica de migraña',aliases:'migraña cronica prevencion profilaxis jaqueca migraña',population:'adult',setting:'consulta',source:'https://www.nice.org.uk/guidance/cg150/chapter/recommendations',year:'NICE CG150 actualizado 2025',
  scope:'Adulto con migraña diagnosticada y necesidad de profilaxis; opciones individualizadas tras ponderar eficacia/seguridad.',
  factors:['Frecuencia y discapacidad','Embarazo / capacidad reproductiva','Comorbilidades','Riesgo de sobredosis e interacciones','Tolerancia previa'],
  redFlags:'Cefalea súbita explosiva, focalidad neurológica, fiebre o alteración de conciencia requieren evaluación etiológica, no profilaxis.',
  options:[['propranolol','Opción para considerar','Revisar asma, bradicardia e hipotensión'],['topiramato','Opción para considerar','Restricciones importantes de embarazo y prevención del embarazo'],['amitriptilina','Opción para considerar','Valorar sedación, riesgos anticolinérgicos y efectos cardiovasculares']]},
 {id:'artritis-reumatoide',name:'Artritis reumatoide activa (tratamiento modificador)',aliases:'artritis reumatoide ar dmard fames',population:'adult',setting:'especialista',source:'https://www.nice.org.uk/guidance/ng100/chapter/Recommendations',year:'NICE NG100',
  scope:'Adultos con artritis reumatoide diagnosticada; DMARD bajo seguimiento reumatológico; NO para automedicación.',
  factors:['Actividad y diagnóstico confirmado','Hemograma, función renal/hepática','Embarazo y anticoncepción','Infecciones y vacunas','Plan de vigilancia'],
  redFlags:'Artritis séptica, neutropenia febril o toxicidad farmacológica grave requieren evaluación inmediata.',
  options:[['metotrexato','Primera línea especializada','Metotrexato oral para AR; verificar pauta SEMANAL, nunca diaria'],['leflunomida','Alternativa de primera línea especializada','Contraindicaciones de embarazo, monitorización y seguimiento'],['sulfasalazina','Alternativa de primera línea especializada','Vigilancia hematológica y hepática'],['hidroxicloroquina','Enfermedad leve/palindrómica','Considerar según gravedad y monitorización ocular']]}
]);
root.KidBumPharmaExpansion=Object.freeze({catalog,conditions,lasaPairs,sources,highAlertScope});
})(typeof window!=='undefined'?window:globalThis);
