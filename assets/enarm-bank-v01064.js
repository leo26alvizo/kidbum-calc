/* KidBum ENARM 1.0 · Banco local de CASOS ORIGINALES v0.10.65
 * Ejercicios educativos redactados para esta aplicación. No oficiales.
 * Sin revisión clínica independiente documentada; no usar como órdenes ni
 * para decisiones con pacientes. Los enlaces son lecturas sugeridas de cotejo,
 * NO atribuciones de validación individual a los reactivos. */
(function(root,factory){
 'use strict';
 const api=factory();
 root.KidBumENARMBank=api;
 if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 const R={
  mexico:{label:'CENETEC · Catálogo de guías de práctica clínica',url:'https://gpc.salud.gob.mx/DDIMBE/'},
  pronam:{label:'PRONAM · Protocolos nacionales de atención',url:'https://ccinshae.salud.gob.mx/investigacion/protocolos-nacionales-atencion-medica/'},
  enarm:{label:'CIFRHS · 50.º ENARM 2026 (formato oficial)',url:'https://cifrhs.salud.gob.mx/site1/enarm/2026/'},
  ada:{label:'ADA · Diabetes Standards of Care 2026',url:'https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes'},
  gina:{label:'GINA · 2026 Summary Guide',url:'https://ginasthma.org/2026-gina-summary-guide/'},
  sepsis:{label:'SCCM · Surviving Sepsis Campaign 2026',url:'https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'},
  aha:{label:'AHA · Situaciones especiales de reanimación 2025',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation/'},
  who:{label:'OMS · Sarampión',url:'https://www.who.int/es/news-room/fact-sheets/detail/measles'},
  cold:{label:'OMS · Cadena de frío de inmunización',url:'https://www.who.int/teams/immunization-vaccines-and-biologicals/essential-programme-on-immunization/supply-chain/controlled-temperature-chain-%28ctc%29'},
  gold2026:{label:'GOLD · Global Strategy for COPD 2026',url:'https://goldcopd.org/2026-gold-report/'},
  cdcAom:{label:'CDC · Atención ambulatoria pediátrica, otitis media aguda',url:'https://www.cdc.gov/antibiotic-use/hcp/clinical-care/pediatric-outpatient.html'},
  msfShoulder:{label:'MSF · Distocia de hombros, guía clínica',url:'https://medicalguidelines.msf.org/en/viewport/ONC/english/7-5-shoulder-dystocia-51417529.html'},
  hernia:{label:'HerniaSurge · Update of international groin hernia guidelines (2023)',url:'https://academic.oup.com/bjsopen/article/7/5/zrad080/7325871'},
  niceTrauma:{label:'NICE NG39 · Major trauma, assessment and management',url:'https://www.nice.org.uk/guidance/ng39/chapter/Recommendations'},
  whoFlu:{label:'OMS · Programa mundial de influenza, grupos prioritarios',url:'https://www.who.int/teams/global-influenza-programme/vaccines/vaccine-use'},
  predictive:{label:'CDC · Principios de epidemiología, valor predictivo positivo',url:'https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson5/appendixa.html'}
 };
 const Q=(prompt,options,correct,why)=>({prompt,options,correct,why});
 const C=(id,area,topic,stem,source,qs)=>({id,area,topic,stem,source:R[source],questions:qs});
 const cases=[
 C('mi-01','Medicina Interna','Síndrome coronario agudo','Hombre de 60 años con dolor retroesternal opresivo de 50 minutos, diaforesis y elevación del ST en DII, DIII y aVF.','mexico',[
  Q('¿Qué territorio miocárdico sugieren las derivaciones descritas?',['Anterior','Inferior','Septal','Lateral alta'],1,'DII, DIII y aVF exploran la cara inferior; no permiten por sí solas identificar con certeza la arteria culpable.'),
  Q('¿Qué estrategia es prioritaria ante este cuadro compatible con infarto con elevación del ST?',['Esperar la tercera troponina','Organizar reperfusión urgente conforme a tiempos y recursos','Realizar una prueba de esfuerzo','Dar el alta si cede el dolor'],1,'El electrocardiograma y la clínica activan la ruta de reperfusión. No debe retrasarse esperando biomarcadores en un IAM con elevación del ST claramente establecido.')
 ]),
 C('mi-02','Medicina Interna','Cetoacidosis diabética','Mujer de 24 años con diabetes tipo 1, vómitos, polidipsia y respiración profunda. Glucosa 380 mg/dL, pH 7.16, bicarbonato 10 mmol/L y cetonas elevadas.','ada',[
  Q('¿Cuál es el trastorno metabólico más probable?',['Síndrome hiperosmolar aislado','Acidosis respiratoria','Cetoacidosis diabética','Alcalosis metabólica'],2,'La combinación de diabetes, cetosis significativa y acidosis metabólica corresponde a cetoacidosis diabética.'),
  Q('Antes de iniciar insulina IV, ¿qué electrólito requiere evaluación inmediata?',['Calcio','Potasio','Magnesio','Fósforo'],1,'La insulina desplaza potasio al interior celular y puede precipitar hipopotasemia peligrosa; se debe conocer y corregir según protocolo.')
 ]),
 C('mi-03','Medicina Interna','Lesión renal aguda','Hombre de 76 años con tres días de diarrea, hipotensión ortostática y oliguria. Creatinina previa 0.9 mg/dL, ahora 1.9 mg/dL; mucosas secas.','mexico',[
  Q('¿Cuál mecanismo es inicialmente más probable?',['Hipoperfusión renal por depleción de volumen','Glomerulonefritis rápidamente progresiva','Obstrucción ureteral bilateral','Necrosis papilar'],0,'Las pérdidas gastrointestinales con datos de hipovolemia hacen probable una lesión renal aguda prerrenal, pero deben vigilarse evolución y causas alternativas.'),
  Q('¿Qué información es esencial para orientar la valoración inicial?',['Solo el grupo sanguíneo','Balance hídrico, medicación y evaluación de perfusión','Únicamente el ácido úrico','Una gammagrafía ósea'],1,'Las pérdidas, fármacos nefrotóxicos, perfusión, diuresis y evolución de creatinina guían la prioridad diagnóstica y de reanimación.')
 ]),
 C('mi-04','Medicina Interna','Fibrilación auricular','Mujer de 77 años con hipertensión y diabetes presenta palpitaciones. ECG: ritmo irregularmente irregular, sin ondas P organizadas. Está hemodinámicamente estable.','mexico',[
  Q('¿Cuál arritmia es más probable?',['Flutter auricular regular 2:1','Fibrilación auricular','Taquicardia sinusal','Bloqueo AV completo'],1,'La ausencia de ondas P definidas y la irregularidad de los intervalos RR son hallazgos característicos de fibrilación auricular.'),
  Q('¿Qué dimensión de riesgo debe valorarse para decidir prevención de embolia?',['Solo la duración de la consulta','Riesgo tromboembólico y de sangrado','Únicamente la frecuencia de respiración','El grupo Rh'],1,'La indicación de anticoagulación requiere estimar riesgo de ictus, sangrado y contraindicaciones, no asumirla solo por las palpitaciones.')
 ]),
 C('mi-05','Medicina Interna','Encefalopatía hepática','Hombre con cirrosis y ascitis, asterixis y desorientación nueva tras presentar melena. Glucosa capilar normal.','mexico',[
  Q('¿Cuál complicación se debe considerar de forma importante?',['Encefalopatía hepática','Cefalea tensional','Miastenia gravis','Parálisis de Bell'],0,'La alteración cognitiva y asterixis en cirrosis sugieren encefalopatía, pero deben excluirse hipoglucemia, infección, fármacos y daño neurológico.'),
  Q('¿Qué factor precipitante del cuadro destaca en la historia?',['Hemorragia digestiva','Cambio de estación','Miopía','Otitis externa'],0,'El sangrado gastrointestinal aumenta carga nitrogenada y es un precipitante clásico; su atención es tan importante como tratar la encefalopatía.')
 ]),
 C('mi-06','Medicina Interna','Hipotiroidismo','Mujer de 49 años con fatiga, estreñimiento y piel seca. TSH alta y T4 libre baja.','mexico',[
  Q('¿Qué patrón endocrino representan estos resultados?',['Hipertiroidismo primario','Hipotiroidismo primario','Hipotiroidismo central','Síndrome de Cushing'],1,'TSH elevada frente a T4 libre baja implica falla tiroidea primaria con respuesta compensatoria hipofisaria.'),
  Q('¿Cuál es el tratamiento de reemplazo habitual?',['Levotiroxina','Metimazol','Yodo radiactivo','Propranolol como monoterapia'],0,'La levotiroxina reemplaza T4; la dosis se individualiza por edad, cardiopatía, embarazo y respuesta de TSH.')
 ]),
 C('mi-07','Medicina Interna','Anemia ferropénica','Hombre de 64 años con astenia, Hb 9.4 g/dL, VCM 69 fL y ferritina marcadamente disminuida. Niega hemorragia visible.','mexico',[
  Q('¿Qué diagnóstico explica mejor el patrón analítico?',['Anemia ferropénica','Anemia megaloblástica por B12','Policitemia','Hemólisis autoinmune'],0,'La microcitosis junto a ferritina baja apoya fuertemente deficiencia de hierro.'),
  Q('Además de reponer hierro según indicación, ¿qué debe investigarse prioritariamente en este paciente?',['Pérdida gastrointestinal oculta, incluida neoplasia','Solo alergia al polen','Miopía progresiva','Intoxicación por vitamina C'],0,'En un hombre mayor con ferropenia es importante encontrar el origen del sangrado o malabsorción y descartar patología digestiva significativa.')
 ]),
 C('ped-01','Pediatría','Bronquiolitis','Lactante de 7 meses con rinorrea previa, tos, sibilancias difusas y dificultad leve para alimentarse. Primer episodio de sibilancias en temporada viral.','mexico',[
  Q('¿Cuál diagnóstico clínico es más probable?',['Bronquiolitis viral','Epiglotitis','Laringomalacia congénita','Aspiración de cuerpo extraño con inicio súbito'],0,'El primer episodio de sibilancias precedido de catarro en un lactante es típico de bronquiolitis.'),
  Q('En bronquiolitis no complicada, ¿cuál es la base del manejo?',['Antibiótico sistemático','Soporte respiratorio/hidratación y vigilancia','Corticoide sistémico para todos','Antitusígeno con codeína'],1,'Las medidas de soporte y la evaluación de trabajo respiratorio e hidratación son centrales; broncodilatadores y corticoides no se indican de rutina.')
 ]),
 C('ped-02','Pediatría','Crup viral','Niño de 2 años con tos perruna, disfonía y estridor inspiratorio, empeoramiento nocturno luego de rinorrea.','mexico',[
  Q('¿Cuál es el diagnóstico más probable?',['Crup (laringotraqueítis viral)','Bronquiolitis','Amigdalitis estreptocócica','Asma aislada'],0,'La tos metálica, la voz ronca y el estridor inspiratorio son característicos del crup.'),
  Q('Si presenta estridor en reposo y retracciones, ¿qué escalamiento terapéutico es apropiado?',['Observación sin valorar gravedad','Adrenalina nebulizada y corticoide según protocolo, con vigilancia','Antibiótico oral como única intervención','Sedación para dormir'],1,'El estridor en reposo implica mayor gravedad y puede requerir adrenalina nebulizada, corticoide y observación por recurrencia de síntomas.')
 ]),
 C('ped-03','Pediatría','Deshidratación con choque','Niña de 18 meses con diarrea abundante, letargo, extremidades frías, relleno capilar de 5 segundos y pulsos débiles.','mexico',[
  Q('¿Cómo se interpreta la perfusión en este escenario?',['Perfusión normal','Probable choque hipovolémico','Hipervolemia aislada','Deshidratación mínima'],1,'La alteración del estado mental, los pulsos débiles y el relleno capilar prolongado indican hipoperfusión y posible choque.'),
  Q('¿Cuál es la prioridad inicial?',['Ofrecer solo té en casa','Reanimación ABC y reposición IV isotónica monitorizada','Administrar antidiarreicos sedantes','Esperar el cultivo de heces antes de evaluar'],1,'En un niño con choque se priorizan vía aérea, respiración y circulación, acceso IV/IO y fluidos isotónicos con reevaluación estrecha.')
 ]),
 C('ped-04','Pediatría','Ictericia neonatal temprana','Recién nacido de término de 18 horas con ictericia visible hasta tórax. Se encuentra clínicamente estable y se desconoce la bilirrubina sérica.','mexico',[
  Q('¿Qué característica de esta presentación obliga a estudio oportuno?',['Inicio antes de las 24 horas de vida','Sexo masculino','Nacimiento de término','Alimentación al pecho'],0,'La ictericia visible durante las primeras 24 horas se considera de inicio temprano y exige descartar hemólisis u otras causas.'),
  Q('¿Cuál es el siguiente paso diagnóstico central?',['Estimar tratamiento solo por color de piel','Medir bilirrubina total y evaluar riesgo por horas de vida','Suspender alimentación indefinidamente','Dar de alta sin seguimiento'],1,'La bilirrubina medida, las horas exactas de vida y los factores de riesgo determinan necesidad de vigilancia y tratamiento.')
 ]),
 C('ped-05','Pediatría','Exacerbación asmática','Escolar de 9 años con diagnóstico previo de asma, sibilancias, tos nocturna y disnea tras infección viral. Está despierto, habla frases completas y no hay datos de choque.','gina',[
  Q('¿Qué síndrome se sospecha?',['Exacerbación de asma','Crup','Neumotórax a tensión confirmado','Tos ferina sin crisis obstructiva'],0,'Sibilancias y disnea en paciente con asma preexistente después de desencadenante respiratorio sugieren exacerbación asmática.'),
  Q('¿Qué debe evaluarse para clasificar gravedad y decidir tratamiento?',['Solo el color de los zapatos','Trabajo respiratorio, oxigenación y respuesta al broncodilatador','Únicamente una radiografía de muñeca','Solo la temperatura'],1,'La gravedad depende de signos de agotamiento, habla, saturación, flujo aéreo y respuesta; el manejo se adapta a la clasificación.')
 ]),
 C('go-01','Ginecología y Obstetricia','Preeclampsia con datos de severidad','Primigesta de 33 semanas con PA 168/112 mmHg en mediciones repetidas, cefalea persistente y fosfenos.','mexico',[
  Q('¿Qué diagnóstico debe priorizarse?',['Preeclampsia con características de severidad','Hipertensión de bata blanca sin riesgo','Infección urinaria simple','Hipotensión gestacional'],0,'La hipertensión de rango severo con síntomas neurológicos a partir de 20 semanas es una emergencia obstétrica.'),
  Q('¿Qué intervención se asocia con prevención de convulsiones eclámpticas?',['Sulfato de magnesio bajo vigilancia','Diurético de asa como monoterapia para todas','Antitérmico y alta','Restricción hídrica sin evaluación'],0,'En preeclampsia con datos severos, el magnesio disminuye el riesgo de convulsiones; requiere monitoreo y estabilización materna integral.')
 ]),
 C('go-02','Ginecología y Obstetricia','Embarazo ectópico','Mujer de 27 años con amenorrea de 7 semanas, dolor pélvico unilateral y prueba de embarazo positiva. Presenta presión arterial 80/50 mmHg y palidez.','mexico',[
  Q('¿Qué diagnóstico potencialmente letal debe descartarse de inmediato?',['Embarazo ectópico roto','Dismenorrea primaria','Vulvovaginitis','Síndrome premenstrual'],0,'Embarazo temprano con dolor, hipotensión y palidez exige sospechar hemorragia intraabdominal por ectópico roto.'),
  Q('¿Cuál es la prioridad de manejo?',['Esperar 7 días para nueva prueba','Reanimación y valoración quirúrgica ginecológica urgente','Solicitar solo cultivo vaginal','Indicar ejercicio abdominal'],1,'La inestabilidad hemodinámica con sospecha de ectópico roto obliga a estabilizar y resolver quirúrgicamente de urgencia.')
 ]),
 C('go-03','Ginecología y Obstetricia','Placenta previa','Gestante de 31 semanas con sangrado vaginal rojo brillante indoloro, sin trabajo de parto aparente, hemodinámicamente estable.','mexico',[
  Q('¿Qué diagnóstico anatómico debe considerarse?',['Placenta previa','Corioamnionitis siempre','Rotura uterina como única causa','Embarazo molar del segundo trimestre'],0,'La hemorragia roja, sin dolor, en el tercer trimestre es clásica de placenta previa; requiere confirmación por imagen.'),
  Q('¿Qué exploración debe evitarse hasta determinar localización placentaria?',['Ultrasonido obstétrico','Tacto vaginal digital','Evaluación de signos vitales','Monitorización fetal'],1,'El tacto vaginal digital puede desencadenar hemorragia grave en placenta previa. La evaluación placentaria por ultrasonido se realiza primero.')
 ]),
 C('go-04','Ginecología y Obstetricia','Hemorragia posparto','Después de un parto vaginal presenta sangrado abundante. El útero está blando y aumentado de tamaño a la palpación.','mexico',[
  Q('¿Cuál etiología es más probable?',['Atonía uterina','Placenta previa a las 10 semanas','Trombosis venosa profunda','Eclampsia como única explicación'],0,'Útero blando y hemorragia inmediata posparto sugieren atonía, causa frecuente de hemorragia obstétrica.'),
  Q('¿Qué componentes deben iniciarse sin demora según protocolo?',['Solo observar','Masaje uterino, uterotónico y reanimación, mientras se investigan otras causas','Enviar a casa','Solicitar resonancia antes de controlar la hemorragia'],1,'El tratamiento es simultáneo: reanimación, tono uterino y uterotónicos, vigilancia y búsqueda de otras causas de las 4 T.')
 ]),
 C('go-05','Ginecología y Obstetricia','Ruptura prematura de membranas','Gestante de 35 semanas refiere salida brusca de líquido claro por vagina y humedad continua; sin sangrado. No hay datos de inestabilidad.','mexico',[
  Q('¿Qué situación obstétrica debe confirmarse primero?',['Rotura prematura de membranas','Preeclampsia aislada','Hiperémesis gravídica','Placenta acreta'],0,'La pérdida persistente de líquido acuoso antes del trabajo de parto hace sospechar ruptura prematura de membranas.'),
  Q('¿Cómo se aborda la confirmación inicial evitando infecciones?',['Tactos vaginales digitales repetidos','Especuloscopia estéril y pruebas según disponibilidad','Prueba de glucosa capilar como único método','Radiografía de abdomen'],1,'La evaluación con espéculo puede mostrar líquido; se evitan tactos digitales innecesarios que aumentan riesgo de infección.')
 ]),
 C('cg-01','Cirugía General','Apendicitis aguda','Varón de 21 años con dolor periumbilical que migra a fosa iliaca derecha, anorexia, náuseas y dolor localizado en punto de McBurney.','mexico',[
  Q('¿Qué diagnóstico explica mejor la evolución?',['Apendicitis aguda','Cólico biliar','Cistitis hemorrágica','Pancreatitis aguda'],0,'La migración del dolor hacia fosa iliaca derecha con anorexia y sensibilidad focal es una presentación clásica de apendicitis.'),
  Q('¿Qué prioridad es apropiada ante sospecha clínica significativa?',['Evaluación quirúrgica y estudios según riesgo, sin retrasar si hay peritonitis','Dar laxantes y alta sistemática','Esperar un mes sin vigilancia','Comenzar actividad física intensa'],0,'La valoración quirúrgica, exploración, embarazo cuando aplique e imagen selectiva permiten decidir tratamiento. Signos peritoneales requieren escalamiento.')
 ]),
 C('cg-02','Cirugía General','Colecistitis aguda','Mujer de 42 años con dolor persistente en hipocondrio derecho, fiebre y signo de Murphy positivo; antecedente de cólicos tras comida grasa.','mexico',[
  Q('¿Cuál proceso es más probable?',['Colecistitis aguda','Apendicitis retrocecal confirmada','Obstrucción intestinal baja','Cistitis'],0,'Dolor constante en hipocondrio derecho, fiebre y Murphy sugieren inflamación vesicular aguda.'),
  Q('¿Cuál estudio de imagen es usualmente inicial?',['Ultrasonido hepatobiliar','Resonancia cerebral','Radiografía de mano','Electroencefalograma'],0,'El ultrasonido permite evaluar litiasis, pared vesicular, líquido pericolecístico y Murphy sonográfico.')
 ]),
 C('cg-03','Cirugía General','Pancreatitis aguda','Hombre de 46 años con dolor epigástrico intenso irradiado a espalda y lipasa sérica cuatro veces el límite superior de referencia.','mexico',[
  Q('¿Qué diagnóstico es más probable?',['Pancreatitis aguda','Hernia inguinal','Colecistitis crónica asintomática','Apendicitis pélvica'],0,'Dolor característico y enzimas pancreáticas >3 veces el límite normal cumplen dos criterios diagnósticos habituales.'),
  Q('En una pancreatitis sin infección documentada, ¿qué afirmación es correcta?',['Siempre requiere antibiótico profiláctico','La reposición de volumen guiada y analgesia son claves; antibióticos no son rutinarios','Toda pancreatitis requiere cirugía inmediata','La lipasa indica por sí sola gravedad exacta'],1,'El tratamiento inicial incluye soporte y búsqueda de causa; el antibiótico profiláctico no está indicado por una pancreatitis estéril.')
 ]),
 C('cg-04','Cirugía General','Obstrucción intestinal','Paciente de 63 años con cirugía abdominal previa, distensión progresiva, vómitos biliosos y ausencia de gases y evacuaciones.','mexico',[
  Q('¿Qué síndrome abdominal es más probable?',['Obstrucción intestinal mecánica','Cistitis','Gastritis funcional aislada','Síndrome nefrótico'],0,'Distensión, vómitos y obstipación tras cirugía previa sugieren obstrucción por adherencias, aunque el diagnóstico debe verificarse.'),
  Q('¿Qué hallazgo aumenta preocupación por estrangulación/isquemia?',['Dolor intenso continuo, defensa y acidosis','Presencia de sed normal','Ruidos de teléfono','Dolor leve transitorio sin irritación'],0,'Dolor desproporcionado o continuo, peritonismo, deterioro hemodinámico o lactato elevado pueden sugerir compromiso vascular y requieren cirugía urgente.')
 ]),
 C('urg-01','Urgencias','Sepsis e hipotensión','Mujer de 69 años con neumonía y confusión, PA 82/46 mmHg, taquicardia, extremidades frías y lactato elevado.','sepsis',[
  Q('¿Qué síndrome requiere reconocimiento inmediato?',['Sepsis con hipoperfusión y posible choque','Resfriado común sin complicaciones','Insomnio','Migraña típica'],0,'Infección probable más alteración orgánica e hipoperfusión es una urgencia; el choque séptico requiere criterios adicionales tras reanimación.'),
  Q('¿Qué grupo de medidas iniciales es apropiado?',['Cultivos si no retrasan antibióticos, antimicrobianos oportunos y reanimación guiada','Solo analgésico oral','Esperar siete días','Suspender vigilancia hemodinámica'],0,'En probable sepsis grave se priorizan evaluación ABC, antimicrobianos tempranos, búsqueda de foco y reanimación monitorizada según guías y respuesta.')
 ]),
 C('urg-02','Urgencias','Anafilaxia','Minutos después de consumir cacahuate, adolescente presenta urticaria extensa, edema labial, sibilancias e hipotensión.','aha',[
  Q('¿Cuál diagnóstico sindromático se debe asumir?',['Anafilaxia','Urticaria aislada sin gravedad','Crisis de ansiedad como única causa','Rinitis alérgica simple'],0,'Compromiso respiratorio y cardiovascular agudo tras exposición alergénica es anafilaxia hasta demostrar lo contrario.'),
  Q('¿Qué medicamento es prioritario como primera línea?',['Adrenalina intramuscular en cara anterolateral del muslo','Antihistamínico como única medida','Solo corticoide oral','Antitusígeno sedante'],0,'La adrenalina IM es el tratamiento esencial de primera línea; deben atenderse vía aérea, perfusión y monitorización.')
 ]),
 C('urg-03','Urgencias','Ictus agudo','Hombre de 72 años con afasia y hemiparesia derecha de inicio súbito hace 55 minutos, confirmado por familia. Glucosa capilar dentro de rango.','mexico',[
  Q('¿Qué síndrome neurológico sospechas?',['Evento vascular cerebral agudo','Migraña común sin déficit focal','Neuropatía periférica aislada','Síndrome cerebeloso puro'],0,'Déficit focal brusco de lenguaje y fuerza es compatible con ictus agudo; debe activarse el código correspondiente.'),
  Q('¿Qué estudio inicial suele descartar hemorragia antes de reperfusión?',['TC cerebral simple sin contraste','Radiografía de codo','Ultrasonido de vesícula','Densitometría ósea'],0,'La TC cerebral simple identifica hemorragia intracraneal y es parte esencial del algoritmo urgente de reperfusión.')
 ]),
 C('urg-04','Urgencias','Hiperpotasemia con cambios ECG','Paciente con insuficiencia renal llega con debilidad, potasio 7.0 mmol/L y ondas T altas picudas con ensanchamiento del QRS.','aha',[
  Q('¿Cuál urgencia electrolítica presenta?',['Hiperpotasemia grave con toxicidad eléctrica','Hipocalcemia aislada','Hipopotasemia leve','Hiponatremia crónica simple'],0,'Potasio muy elevado y alteraciones de conducción amenazan con arritmia maligna y requieren respuesta inmediata.'),
  Q('¿Qué intervención protege inicialmente el miocardio ante cambios ECG?',['Calcio intravenoso según protocolo','Hierro oral','Suero glucosado sin tratamiento adicional','Aspirina en monoterapia'],0,'El calcio IV estabiliza membrana cardiaca pero no reduce el potasio; se requieren simultáneamente medidas para trasladarlo y eliminarlo.')
 ]),
 C('mf-01','Medicina Familiar','Confirmación de hipertensión','Hombre de 52 años sin síntomas con PA en consultorio de 152/92 y 148/94 mmHg en una misma visita. No hay datos de daño de órgano agudo.','pronam',[
  Q('¿Qué diagnóstico debe sospecharse ante estas lecturas?',['Hipertensión arterial por confirmar','Choque hipovolémico','Hipotensión ortostática','Crisis hipertensiva obligada'],0,'Lecturas repetidas elevadas generan sospecha, pero en paciente estable es preferible confirmar con medición correcta y, de ser posible, fuera del consultorio.'),
  Q('¿Qué estrategia mejora la certeza diagnóstica?',['MAPA/AMPA o medidas estandarizadas seriadas','Solo tomar pulso radial una vez','Diagnosticar con un reloj inteligente sin validar','Prueba de esfuerzo como requisito universal'],0,'La monitorización ambulatoria o domiciliaria ayuda a confirmar hipertensión y a detectar efecto de bata blanca o enmascarada.')
 ]),
 C('mf-02','Medicina Familiar','Diagnóstico de diabetes','Mujer de 50 años sin síntomas de hiperglucemia, glucosa en ayunas de 138 mg/dL en laboratorio durante chequeo.','ada',[
  Q('¿Cómo debe interpretarse el hallazgo?',['Valor en rango diagnóstico de diabetes que requiere confirmación','Hipoglucemia','Valor siempre normal','Cetoacidosis diabética establecida'],0,'Glucosa en ayunas ≥126 mg/dL está en rango diagnóstico, pero sin hiperglucemia inequívoca se requieren dos resultados anormales confirmatorios.'),
  Q('¿Qué conducta diagnóstica es apropiada?',['Confirmar con nueva prueba validada en otro momento o prueba alternativa diagnóstica','Empezar insulina IV sin otra valoración','Ignorar el resultado','Usar solo glucosuria de tira'],0,'Ante ausencia de síntomas inequívocos se confirma con otro valor anormal en laboratorio, según criterios aceptados.')
 ]),
 C('mf-03','Medicina Familiar','Intervención para dejar de fumar','Hombre de 37 años que fuma 12 cigarrillos diarios y desea dejarlo. No presenta urgencia médica.','pronam',[
  Q('¿Qué intervención de primer nivel tiene impacto demostrado?',['Consejo breve estructurado y apoyo conductual','Regañarlo sin plan','Evitar hablar del tabaco','Recomendar cambio a tabaco sin filtro'],0,'Preguntar, aconsejar y ofrecer apoyo concreto permite iniciar una estrategia de cesación centrada en la persona.'),
  Q('¿Qué enfoque mejora la probabilidad de abandono sostenido?',['Plan de seguimiento y tratamiento farmacológico si es apropiado','Una sola advertencia sin seguimiento','Suspender toda actividad física','Sustituir por fumar más esporádicamente sin plan'],0,'El acompañamiento continuo y farmacoterapia cuando esté indicada son más eficaces que un consejo aislado.')
 ]),
 C('sp-01','Salud Pública','Sarampión · vigilancia','Niño no vacunado con fiebre alta, tos, coriza, conjuntivitis y exantema maculopapular que inició en la cara y se extendió al tronco.','who',[
  Q('¿Qué enfermedad transmisible es prioritaria?',['Sarampión','Varicela con vesículas típicas','Escarlatina sin tos','Rubéola confirmada por este dato aislado'],0,'El pródromo con tos, coriza y conjuntivitis seguido de exantema descendente en no vacunado es altamente sugerente de sarampión.'),
  Q('¿Qué respuesta de salud pública es correcta ante caso sospechoso?',['Aislamiento respiratorio aéreo y notificación inmediata según lineamiento','Enviar sin recomendaciones a escuela','Esperar brote grande para avisar','Aplicar antibiótico a todos los contactos indiscriminadamente'],0,'El sarampión es muy contagioso; el aislamiento y la notificación temprana permiten confirmar, rastrear contactos y tomar acciones de control.')
 ]),
 C('sp-02','Salud Pública','Cadena de frío de vacunas','En un centro de salud se detecta que un refrigerador con vacunas termolábiles tuvo una excursión de temperatura no documentada durante la noche.','cold',[
  Q('Para muchas vacunas del programa regular, ¿qué intervalo de conservación se usa como referencia?',['+2 a +8 °C, con excepciones según producto','−40 a −30 °C para todas','+20 a +30 °C para todas','Cualquier temperatura si la caja está cerrada'],0,'La cadena de frío estándar de múltiples vacunas es +2 a +8 °C; algunos productos tienen requisitos específicos que prevalecen.'),
  Q('¿Qué se debe hacer con lotes posiblemente expuestos fuera de rango?',['Separar, identificar «no usar» y consultar evaluación técnica antes de liberar','Administrarlos rápidamente para no perderlos','Congelarlos todos inmediatamente','Descartar sin registrar el incidente ni consultar'],0,'No se asume que son seguros o inservibles sin evaluación; se inmovilizan y documentan para decisión del programa de inmunizaciones.')
 ])
,
 C('mi-08','Medicina Interna','Diagnóstico de EPOC','Hombre de 62 años con tabaquismo de larga evolución, tos crónica y disnea progresiva. La espirometría posbroncodilatador muestra cociente VEF1/CVF de 0.63; se encuentra clínicamente estable.','gold2026',[
  Q('¿Qué hallazgo permite documentar limitación persistente al flujo aéreo bajo el criterio GOLD?',['Cociente VEF1/CVF posbroncodilatador menor de 0.70','Disnea aislada sin espirometría','Frecuencia cardiaca mayor de 90','Radiografía normal con tos'],0,'GOLD utiliza VEF1/CVF posbroncodilatador menor de 0.70 como criterio espirométrico de obstrucción persistente, interpretado en contexto de síntomas y factores de riesgo.'),
  Q('¿Cuál es una afirmación correcta sobre la evaluación integral posterior?',['Solo la radiografía define el pronóstico','Síntomas, exacerbaciones, comorbilidades y función pulmonar guían la evaluación','Todo paciente requiere antibiótico crónico','La espirometría excluye cualquier diagnóstico alternativo'],1,'La espirometría confirma obstrucción; el abordaje integral considera carga sintomática, historia de exacerbaciones, comorbilidades y diagnósticos alternativos.')
 ]),
 C('ped-06','Pediatría','Otitis media aguda','Niña de 3 años con otalgia de inicio agudo y fiebre. La otoscopia muestra membrana timpánica intensamente abombada con derrame en oído medio; no hay signos de mastoiditis.','cdcAom',[
  Q('¿Qué hallazgo otoscópico apoya con más fuerza el diagnóstico de otitis media aguda?',['Membrana timpánica moderada o intensamente abombada','Canal auditivo externo normal sin derrame','Cerumen blando sin dolor','Tímpano ligeramente opaco sin clínica'],0,'La protrusión moderada a severa de la membrana timpánica o la otorrea nueva no atribuible a otitis externa es criterio diagnóstico importante de otitis media aguda.'),
  Q('¿Qué evaluación clínica debe preceder a decidir entre observación y antibiótico?',['Solo preguntar por el color de la secreción nasal','Valorar edad, lateralidad, dolor, fiebre, duración y posibilidad de seguimiento','Ordenar antibiótico sin explorar oídos','Tratar siempre con antivirales'],1,'La conducta se individualiza por gravedad, edad, afectación bilateral o unilateral, seguimiento y hallazgos confirmatorios; no todos los casos necesitan la misma estrategia.')
 ]),
 C('go-06','Ginecología y Obstetricia','Distocia de hombros','Tras la salida de la cabeza fetal, esta se retrae contra el periné y no ocurre la salida de los hombros con tracción suave habitual; se sospecha impactación del hombro anterior.','msfShoulder',[
  Q('¿Cuál es una maniobra inicial apropiada en distocia de hombros?',['Presión fúndica vigorosa','McRoberts con ayuda y presión suprapúbica según respuesta','Tracción forzada de la cabeza','Esperar diez minutos sin pedir apoyo'],1,'Debe solicitarse ayuda e iniciar maniobras sistemáticas; McRoberts y presión suprapúbica son maniobras externas iniciales habituales.'),
  Q('¿Qué maniobra debe evitarse por aumentar la impactación o el riesgo de lesión?',['Presión sobre el fondo uterino','Flexión materna de caderas tipo McRoberts','Presión suprapúbica dirigida','Pedir apoyo adicional al equipo obstétrico'],0,'La presión fúndica no libera el hombro impactado y puede empeorar la obstrucción, aumentando el riesgo de lesión materna o fetal.')
 ]),
 C('cg-05','Cirugía General','Hernia inguinal complicada','Hombre de 71 años presenta masa inguinal dolorosa, irreductible desde hace horas, vómitos y distensión; el abdomen tiene defensa involuntaria y hay deterioro del estado general.','hernia',[
  Q('¿Qué complicación debe considerarse prioritariamente ante este cuadro?',['Hernia estrangulada con posible isquemia intestinal','Hernia reducible asintomática','Dermatitis de contacto aislada','Lipoma subcutáneo no complicado'],0,'La irreductibilidad con dolor intenso, signos obstructivos y peritoneales sugiere estrangulación intestinal, situación potencialmente letal.'),
  Q('¿Qué curso de acción es más adecuado ante sospecha de estrangulación?',['Esperar control programado a seis meses','Valoración quirúrgica y preparación para intervención urgente','Realizar reducción forzada reiterada sin valorar','Administrar únicamente analgésico y alta'],1,'Las guías de hernias complicadas recomiendan atención quirúrgica urgente cuando se sospecha estrangulación; no debe demorarse por pruebas innecesarias.')
 ]),
 C('urg-05','Urgencias','Neumotórax a tensión','Adulto tras trauma torácico presenta disnea intensa, SpO₂ 82 %, PA 72/40 mmHg, ingurgitación yugular y ausencia de murmullo vesicular izquierdo.','niceTrauma',[
  Q('¿Qué diagnóstico amenazante para la vida debe reconocerse de inmediato?',['Neumotórax a tensión con inestabilidad hemodinámica','Bronquitis no complicada','EPOC estable','Tos posviral'],0,'La combinación de trauma, hipoxemia, asimetría auscultatoria y choque hace sospechar neumotórax a tensión; no es necesario observar desviación traqueal para actuar.'),
  Q('¿Qué prioridad se indica si la sospecha es alta y persiste la inestabilidad?',['Esperar tomografía antes de intervenir','Descompresión torácica inmediata por personal capacitado mientras se reanima','Dar alta con analgesia','Solicitar prueba de función respiratoria'],1,'En neumotórax a tensión con inestabilidad hemodinámica o compromiso respiratorio grave, se prioriza descompresión antes de imágenes según recursos y competencia técnica.')
 ]),
 C('mf-04','Medicina Familiar','Prevención de influenza','Médica de primer nivel de 32 años, embarazada de 22 semanas, pregunta si la vacunación de influenza estacional es relevante para ella. No refiere antecedente de anafilaxia a la vacuna.','whoFlu',[
  Q('¿Qué poblaciones aparecen entre los grupos prioritarios de vacunación estacional de influenza de la OMS?',['Solo personas con rinitis','Personal de salud y personas embarazadas, entre otros grupos','Exclusivamente adolescentes sanos','Solo varones mayores de cuarenta años'],1,'La OMS incluye al personal sanitario y a las personas embarazadas entre los grupos prioritarios, además de otros grupos de riesgo, según políticas nacionales.'),
  Q('¿Qué enfoque de prevención es apropiado en este caso?',['Desalentar vacunación por embarazo sin evaluar tipo de producto','Revisar esquema y ofrecer vacuna estacional apropiada según recomendaciones nacionales','Indicar antibiótico preventivo','Reemplazar la vacuna por suplementos como único cuidado'],1,'En el embarazo debe ofrecerse inmunización antigripal estacional indicada y adecuada al producto, conforme a las recomendaciones sanitarias locales.')
 ]),
 C('sp-03','Salud Pública','Valor predictivo positivo','En un programa de tamizaje, 200 personas tuvieron resultado positivo; la prueba de referencia confirma enfermedad en 120 y la descarta en las otras 80. Se desea interpretar la utilidad de la prueba.','predictive',[
  Q('¿Cuál es el valor predictivo positivo observado de la prueba en este programa?',['20 %','40 %','60 %','80 %'],2,'El valor predictivo positivo es verdaderos positivos entre todos los positivos: 120 dividido entre 200 = 0.60, equivalente a 60 %.'),
  Q('Si baja la prevalencia de la enfermedad y sensibilidad/especificidad permanecen iguales, ¿qué ocurre en general con el valor predictivo positivo?',['Disminuye','Aumenta necesariamente','Permanece siempre fijo','Se convierte en la sensibilidad'],0,'Con prevalencia menor, una proporción relativamente mayor de resultados positivos puede ser falsa; el valor predictivo positivo usualmente disminuye si sensibilidad y especificidad se mantienen constantes.')
 ]),
 ];
 // 35 additional original educational cases, added after the legacy cases to preserve their option order and progress IDs.
 cases.push(...[
  {
    "id": "mi-09",
    "area": "Medicina Interna",
    "topic": "Neumonía adquirida en la comunidad",
    "stem": "Varón de 68 años, sin hospitalizaciones recientes, con fiebre de 39 °C, tos productiva, dolor pleurítico, estertores basales derechos y consolidación lobar nueva en la radiografía. FR 32/min, PA 88/54 mmHg.",
    "source": {
      "label": "GPC IMSS-234-09 · Neumonía adquirida en la comunidad",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/234GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el diagnóstico sindromático más probable?",
        "options": [
          "Neumonía adquirida en la comunidad",
          "Exacerbación aislada de EPOC",
          "Bronquitis aguda sin neumonía",
          "Edema pulmonar cardiogénico"
        ],
        "correct": 0,
        "why": "La fiebre, síntomas respiratorios y consolidación nueva apoyan neumonía; el patrón no determina por sí solo el agente."
      },
      {
        "prompt": "¿Qué hallazgo favorece valoración hospitalaria urgente?",
        "options": [
          "Localización basal del infiltrado",
          "Hipotensión y taquipnea marcada",
          "Expectoración amarilla aislada",
          "Dolor pleurítico sin otros datos"
        ],
        "correct": 1,
        "why": "La hipotensión y la frecuencia respiratoria elevada indican posible compromiso sistémico; no debe basarse el destino solo en la imagen."
      }
    ]
  },
  {
    "id": "mi-10",
    "area": "Medicina Interna",
    "topic": "Enfermedad renal crónica albuminúrica",
    "stem": "Mujer de 58 años con diabetes tipo 2. TFGe de 48 mL/min/1.73 m² hace cuatro meses y 46 actualmente; cociente albúmina/creatinina urinario de 420 mg/g confirmado. No hay enfermedad aguda.",
    "source": {
      "label": "GPC IMSS-335-19 · Enfermedad renal crónica",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/335GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué categoría de TFGe corresponde al valor actual?",
        "options": [
          "G4",
          "G3a",
          "G2",
          "G3b"
        ],
        "correct": 1,
        "why": "G3a corresponde a 45–59 mL/min/1.73 m²; la persistencia por más de tres meses apoya enfermedad renal crónica."
      },
      {
        "prompt": "¿Cómo se clasifica la albuminuria de 420 mg/g?",
        "options": [
          "A2",
          "No clasificable por cociente",
          "A3",
          "A1"
        ],
        "correct": 2,
        "why": "A3 corresponde a albuminuria superior a 300 mg/g y agrega riesgo renal y cardiovascular independientemente de la TFGe."
      }
    ]
  },
  {
    "id": "mi-11",
    "area": "Medicina Interna",
    "topic": "Hipotiroidismo subclínico",
    "stem": "Mujer de 46 años no embarazada, con TSH discretamente elevada de forma persistente en dos mediciones y T4 libre normal. No toma biotina ni presenta enfermedad aguda; no hay bocio palpable.",
    "source": {
      "label": "GPC IMSS-265-10 · Hipotiroidismo del adulto",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/265GER.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la interpretación bioquímica?",
        "options": [
          "Hipertiroidismo subclínico",
          "Hipotiroidismo primario manifiesto",
          "Hipotiroidismo subclínico primario",
          "Hipotiroidismo central manifiesto"
        ],
        "correct": 2,
        "why": "La TSH elevada con T4 libre dentro del intervalo es el patrón de hipotiroidismo subclínico primario."
      },
      {
        "prompt": "¿Qué anticuerpo apoya etiología tiroidea autoinmune?",
        "options": [
          "Antirreceptor de acetilcolina",
          "Anticentrómero",
          "Antimembrana basal glomerular",
          "Antiperoxidasa tiroidea (anti-TPO)"
        ],
        "correct": 3,
        "why": "Los anti-TPO apoyan tiroiditis autoinmune y ayudan a valorar riesgo de progresión, sin establecer por sí solos necesidad de tratamiento."
      }
    ]
  },
  {
    "id": "mi-12",
    "area": "Medicina Interna",
    "topic": "Trombosis venosa profunda",
    "stem": "Mujer de 63 años, diez días después de artroplastia de rodilla, con aumento unilateral del perímetro de pantorrilla, dolor a lo largo de las venas profundas y edema. Sin disnea ni dolor torácico.",
    "source": {
      "label": "GPC IMSS · Enfermedad tromboembólica venosa",
      "url": "https://revistamedica.imss.gob.mx/index.php/revista_medica/article/view/1707"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el diagnóstico que debe descartarse prioritariamente?",
        "options": [
          "Linfedema primario",
          "Insuficiencia arterial crónica",
          "Rotura de tendón de Aquiles",
          "Trombosis venosa profunda"
        ],
        "correct": 3,
        "why": "La cirugía reciente, inmovilidad y edema unilateral elevan la sospecha de trombosis venosa profunda."
      },
      {
        "prompt": "Con probabilidad clínica alta, ¿cuál es el estudio inicial más útil?",
        "options": [
          "Ultrasonido venoso compresivo",
          "Radiografía simple de rodilla",
          "Dímero D como única prueba definitiva",
          "Arteriografía de miembros inferiores"
        ],
        "correct": 0,
        "why": "La ecografía compresiva permite detectar trombosis; el dímero D aislado no descarta de forma segura una TVP con probabilidad alta."
      }
    ]
  },
  {
    "id": "mi-13",
    "area": "Medicina Interna",
    "topic": "Tuberculosis pulmonar",
    "stem": "Varón de 39 años con tos de seis semanas, pérdida de peso, sudoración nocturna y hemoptisis escasa. Convive con una persona que recibió tratamiento por tuberculosis. Radiografía con cavitación apical.",
    "source": {
      "label": "IMSS · Tuberculosis pulmonar",
      "url": "https://www.imss.gob.mx/node/95078"
    },
    "questions": [
      {
        "prompt": "¿Qué etiología debe investigarse prioritariamente?",
        "options": [
          "Mycobacterium tuberculosis",
          "Streptococcus pneumoniae",
          "Pneumocystis jirovecii",
          "Mycoplasma pneumoniae"
        ],
        "correct": 0,
        "why": "La evolución subaguda, síntomas constitucionales, exposición y cavitación superior obligan a investigar tuberculosis."
      },
      {
        "prompt": "¿Qué muestra es adecuada para investigar tuberculosis pulmonar activa?",
        "options": [
          "Piel para biopsia sin lesiones",
          "Esputo para prueba molecular y estudios microbiológicos según disponibilidad",
          "Suero para anticuerpos aislados",
          "Orina para urocultivo como única prueba"
        ],
        "correct": 1,
        "why": "El estudio de secreciones respiratorias permite identificar el microorganismo y, según la técnica, resistencia; se aplican precauciones respiratorias y notificación según protocolo."
      }
    ]
  },
  {
    "id": "ped-07",
    "area": "Pediatría",
    "topic": "Síndrome nefrítico postestreptocócico",
    "stem": "Escolar de 8 años con edema palpebral, orina color té e hipertensión dos semanas después de faringitis. EGO con hematuria y cilindros eritrocitarios, proteinuria no masiva.",
    "source": {
      "label": "GPC-IMSS-826-18 · Síndrome nefrítico postestreptocócico",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/826GRR_0.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el diagnóstico más probable?",
        "options": [
          "Diabetes insípida",
          "Glomerulonefritis postestreptocócica",
          "Síndrome nefrótico por cambios mínimos",
          "Cistitis no complicada"
        ],
        "correct": 1,
        "why": "El intervalo posterior a infección y el sedimento glomerular con edema e hipertensión sugieren síndrome nefrítico postestreptocócico."
      },
      {
        "prompt": "¿Qué alteración del complemento es característica en la fase aguda?",
        "options": [
          "Ausencia aislada de C1 inhibidor",
          "Elevación exclusiva de C4",
          "Disminución transitoria de C3",
          "Aumento persistente de C3"
        ],
        "correct": 2,
        "why": "El consumo de C3 es habitual y su recuperación en el seguimiento ayuda a distinguir este cuadro de otras glomerulopatías."
      }
    ]
  },
  {
    "id": "ped-08",
    "area": "Pediatría",
    "topic": "Torsión testicular",
    "stem": "Adolescente de 14 años con dolor escrotal unilateral intenso de 90 minutos, náusea, testículo elevado y reflejo cremastérico ausente. Afebril y sin síntomas urinarios.",
    "source": {
      "label": "GPC IMSS-229-10 · Escroto agudo",
      "url": "https://imss.gob.mx/sites/all/statics/guiasclinicas/229GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué diagnóstico es prioritario?",
        "options": [
          "Hidrocele comunicante",
          "Varicocele",
          "Torsión testicular",
          "Epididimitis bacteriana"
        ],
        "correct": 2,
        "why": "El inicio abrupto, posición anormal y ausencia del reflejo apoyan torsión, una urgencia dependiente del tiempo."
      },
      {
        "prompt": "¿Qué conducta es apropiada ante sospecha clínica muy alta?",
        "options": [
          "Observar hasta el día siguiente",
          "Iniciar antibiótico oral y citar en una semana",
          "Realizar biopsia testicular electiva",
          "Valoración quirúrgica urgente sin retrasarla por estudios"
        ],
        "correct": 3,
        "why": "La viabilidad depende del tiempo de isquemia; una ecografía puede ayudar si no retrasa la exploración indicada."
      }
    ]
  },
  {
    "id": "ped-09",
    "area": "Pediatría",
    "topic": "Diarrea aguda sin deshidratación",
    "stem": "Niña de 20 meses con cinco evacuaciones acuosas desde ayer, sin sangre ni vómitos persistentes. Está alerta, bebe normalmente, tiene mucosas húmedas y diuresis conservada.",
    "source": {
      "label": "GPC IMSS-156-08 · Diarrea aguda en niños",
      "url": "https://imss.gob.mx/sites/all/statics/guiasclinicas/156GER.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el manejo de hidratación más apropiado?",
        "options": [
          "Solución intravenosa de mantenimiento por rutina",
          "Suspender toda ingesta por doce horas",
          "Solo bebidas deportivas azucaradas",
          "Solución de rehidratación oral y vigilancia de pérdidas"
        ],
        "correct": 3,
        "why": "Sin datos de deshidratación se mantienen líquidos y alimentación, se reponen pérdidas con solución oral y se vigilan alarmas."
      },
      {
        "prompt": "¿Qué hallazgo obliga a reevaluar de forma urgente?",
        "options": [
          "Incapacidad para beber y letargo",
          "Una evacuación acuosa adicional con buen estado",
          "Apetito ligeramente reducido con diuresis normal",
          "Persistencia de ruidos intestinales"
        ],
        "correct": 0,
        "why": "El deterioro del estado mental y la imposibilidad de hidratarse pueden indicar deshidratación grave u otra complicación."
      }
    ]
  },
  {
    "id": "ped-10",
    "area": "Pediatría",
    "topic": "Bronquiolitis: gravedad y pruebas",
    "stem": "Lactante de 4 meses con coriza de tres días seguida de tos y sibilancias bilaterales por primera vez. Está alerta, tolera tomas, sin focalidad pulmonar ni datos de insuficiencia respiratoria.",
    "source": {
      "label": "GPC IMSS-032 · Bronquiolitis",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/032GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué método suele establecer el diagnóstico en este escenario típico?",
        "options": [
          "Historia y exploración clínica",
          "Tomografía torácica sistemática",
          "Cultivo de esputo obligatorio",
          "Espirometría forzada"
        ],
        "correct": 0,
        "why": "La bronquiolitis típica es un diagnóstico clínico; las pruebas se reservan para incertidumbre o complicaciones."
      },
      {
        "prompt": "¿Qué dato debe motivar atención urgente?",
        "options": [
          "Sibilancias leves con alimentación normal",
          "Episodios de apnea o cianosis",
          "Rinorrea transparente aislada",
          "Tos ocasional sin dificultad respiratoria"
        ],
        "correct": 1,
        "why": "Apnea o cianosis indican posible compromiso respiratorio grave, especialmente en lactantes pequeños."
      }
    ]
  },
  {
    "id": "ped-11",
    "area": "Pediatría",
    "topic": "Estenosis hipertrófica del píloro",
    "stem": "Lactante masculino de 5 semanas con vómitos en proyectil no biliosos después de alimentarse, hambre posterior y pérdida ponderal. Se palpa una masa epigástrica pequeña; mucosas secas.",
    "source": {
      "label": "GPC IMSS-330-10 · Estenosis hipertrófica de píloro (ficha oficial)",
      "url": "https://www.imss.gob.mx/node/85002"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la alteración ácido-base clásica si las pérdidas son prolongadas?",
        "options": [
          "Alcalosis respiratoria primaria",
          "Alcalosis metabólica hipoclorémica",
          "Acidosis metabólica hiperclorémica",
          "Acidosis respiratoria aislada"
        ],
        "correct": 1,
        "why": "La pérdida repetida de ácido clorhídrico gástrico produce alcalosis metabólica y depleción de cloro, a menudo también de potasio."
      },
      {
        "prompt": "¿Cuál es la prueba de imagen inicial de elección?",
        "options": [
          "Radiografía de cráneo",
          "Colangiografía endoscópica",
          "Ultrasonido pilórico",
          "Tomografía abdominal con contraste"
        ],
        "correct": 2,
        "why": "El ultrasonido permite evaluar el engrosamiento y longitud del píloro; deben corregirse deshidratación y electrólitos antes del tratamiento definitivo."
      }
    ]
  },
  {
    "id": "go-07",
    "area": "Ginecología y Obstetricia",
    "topic": "Diabetes gestacional: seguimiento",
    "stem": "Gestante de 29 semanas sin diabetes previa, con diagnóstico de diabetes gestacional por curva de tolerancia. Crecimiento fetal adecuado, inicia plan nutricional y monitoreo glucémico.",
    "source": {
      "label": "GPC IMSS-320-10 · Diabetes en el embarazo",
      "url": "https://imss.gob.mx/sites/all/statics/guiasclinicas/320GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué complicación fetal se asocia con hiperglucemia materna persistente?",
        "options": [
          "Restricción simétrica obligatoria",
          "Anencefalia adquirida en el tercer trimestre",
          "Crecimiento fetal excesivo",
          "Agenesia renal bilateral como consecuencia típica tardía"
        ],
        "correct": 2,
        "why": "La glucosa materna atraviesa la placenta y estimula hiperinsulinemia fetal, favoreciendo crecimiento excesivo."
      },
      {
        "prompt": "Tras el parto, ¿qué acción es importante?",
        "options": [
          "Suspender definitivamente vigilancia metabólica",
          "Diagnosticar diabetes tipo 1 en todas las pacientes",
          "Realizar amniocentesis de control",
          "Reevaluar metabolismo de glucosa y riesgo futuro de diabetes"
        ],
        "correct": 3,
        "why": "La diabetes gestacional incrementa el riesgo posterior de diabetes tipo 2; se requiere reevaluación posparto y seguimiento periódico."
      }
    ]
  },
  {
    "id": "go-08",
    "area": "Ginecología y Obstetricia",
    "topic": "Síndrome HELLP",
    "stem": "Gestante de 35 semanas con hipertensión, dolor epigástrico y náuseas. Plaquetas 78 000/µL, AST 190 U/L, LDH elevada y esquistocitos en frotis. No tiene antecedente de hepatopatía.",
    "source": {
      "label": "GPC IMSS-058-08 · Enfermedades hipertensivas del embarazo",
      "url": "https://imss.gob.mx/sites/all/statics/guiasclinicas/058GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la complicación obstétrica más probable?",
        "options": [
          "Hiperemesis gravídica no complicada",
          "Colestasis intrahepática aislada",
          "Trombocitopenia gestacional benigna",
          "Síndrome HELLP"
        ],
        "correct": 3,
        "why": "Hemólisis, elevación de enzimas hepáticas y trombocitopenia constituyen el patrón HELLP."
      },
      {
        "prompt": "¿Cuál es la prioridad general de manejo?",
        "options": [
          "Estabilización materna y valoración obstétrica urgente para resolución",
          "Alta con control prenatal ordinario",
          "Esperar normalización espontánea sin vigilancia",
          "Administrar hierro oral como única intervención"
        ],
        "correct": 0,
        "why": "HELLP puede evolucionar rápidamente; requiere manejo especializado y decisión obstétrica tras estabilizar a la madre."
      }
    ]
  },
  {
    "id": "go-09",
    "area": "Ginecología y Obstetricia",
    "topic": "Enfermedad trofoblástica gestacional",
    "stem": "Mujer de 25 años con amenorrea de 11 semanas, sangrado vaginal, hiperemesis intensa y útero mayor de lo esperado. Ultrasonido con tejido vesicular difuso sin embrión y hCG muy elevada.",
    "source": {
      "label": "GPC SS-228-09 · Enfermedad trofoblástica gestacional",
      "url": "https://imss.gob.mx/sites/all/statics/guiasclinicas/228GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el diagnóstico más probable?",
        "options": [
          "Mola hidatidiforme completa",
          "Embarazo ectópico tubárico",
          "Aborto completo",
          "Embarazo intrauterino viable normal"
        ],
        "correct": 0,
        "why": "La proliferación trofoblástica vesicular sin embrión con hCG elevada sugiere mola completa; la confirmación es histopatológica."
      },
      {
        "prompt": "¿Qué marcador es esencial para vigilancia tras evacuación?",
        "options": [
          "Prolactina sérica",
          "hCG cuantitativa seriada",
          "Alfafetoproteína aislada",
          "CA 19-9"
        ],
        "correct": 1,
        "why": "El seguimiento de hCG permite detectar persistencia o ascenso sugestivo de neoplasia trofoblástica, conforme al protocolo especializado."
      }
    ]
  },
  {
    "id": "go-10",
    "area": "Ginecología y Obstetricia",
    "topic": "Hipertensión gestacional",
    "stem": "Mujer previamente normotensa a las 30 semanas, PA repetida de 146/94 mmHg. Proteinuria negativa, plaquetas y función renal y hepática normales; niega cefalea, fosfenos y dolor epigástrico.",
    "source": {
      "label": "GPC IMSS-058-08 · Enfermedades hipertensivas del embarazo",
      "url": "https://imss.gob.mx/sites/all/statics/guiasclinicas/058GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la clasificación inicial más probable?",
        "options": [
          "Preeclampsia con datos de severidad",
          "Hipertensión gestacional",
          "Hipertensión crónica conocida",
          "Eclampsia"
        ],
        "correct": 1,
        "why": "La hipertensión nueva posterior a 20 semanas sin proteinuria ni datos de disfunción orgánica corresponde inicialmente a hipertensión gestacional."
      },
      {
        "prompt": "¿Por qué requiere vigilancia estrecha?",
        "options": [
          "Implica siempre hemólisis presente",
          "Solo aumenta riesgo de infección urinaria",
          "Puede evolucionar a preeclampsia",
          "Descarta complicaciones maternas futuras"
        ],
        "correct": 2,
        "why": "La ausencia actual de proteinuria o síntomas no excluye progresión a preeclampsia; se requieren controles maternos y fetales."
      }
    ]
  },
  {
    "id": "go-11",
    "area": "Ginecología y Obstetricia",
    "topic": "Control prenatal temprano",
    "stem": "Primigesta de 9 semanas acude por primera vez. No conoce su grupo sanguíneo, no tiene estudios prenatales ni síntomas urinarios; refiere antecedente familiar de diabetes.",
    "source": {
      "label": "IMSS · Consulta de vigilancia prenatal",
      "url": "https://www.imss.gob.mx/maternidad/estas-embarazada/consulta-vigilancia-prenatal"
    },
    "questions": [
      {
        "prompt": "¿Cuál es una finalidad central de los estudios iniciales prenatales?",
        "options": [
          "Establecer por laboratorio la vía de nacimiento",
          "Determinar la fecha exacta del parto sin ultrasonido ni historia",
          "Identificar anemia, riesgos infecciosos y trastornos metabólicos",
          "Confirmar madurez pulmonar fetal"
        ],
        "correct": 2,
        "why": "La evaluación prenatal temprana busca detectar enfermedades y factores modificables para reducir riesgos maternos y fetales."
      },
      {
        "prompt": "¿Qué conducta es apropiada con los resultados y antecedentes?",
        "options": [
          "Posponer todos los controles hasta el tercer trimestre",
          "Solicitar únicamente estudios si aparecen síntomas",
          "Indicar cesárea por el antecedente familiar de diabetes",
          "Estratificar riesgos y ajustar el calendario de seguimiento"
        ],
        "correct": 3,
        "why": "La vigilancia se individualiza según factores de riesgo, edad gestacional y resultados, sin asumir complicaciones no demostradas."
      }
    ]
  },
  {
    "id": "cg-06",
    "area": "Cirugía General",
    "topic": "Cólico biliar no complicado",
    "stem": "Mujer de 36 años con episodios de dolor en hipocondrio derecho tras comidas, que ceden por completo en dos horas. Afebril, sin ictericia, leucocitos normales; ultrasonido con cálculos sin engrosamiento parietal.",
    "source": {
      "label": "GPC IMSS-237-09 · Colecistitis y colelitiasis",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/237GER.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué diagnóstico explica mejor el cuadro?",
        "options": [
          "Colecistitis aguda complicada",
          "Colangitis aguda",
          "Pancreatitis aguda",
          "Colelitiasis sintomática sin colecistitis"
        ],
        "correct": 3,
        "why": "El dolor transitorio con litiasis sin inflamación sistémica ni hallazgos ecográficos inflamatorios orienta a cólico biliar."
      },
      {
        "prompt": "¿Cuál es una conducta razonable tras resolver el episodio y descartar complicaciones?",
        "options": [
          "Referencia programada para valorar colecistectomía",
          "Antibiótico intravenoso indefinido",
          "CPRE urgente en ausencia de datos de obstrucción",
          "Evitar seguimiento porque los cálculos desaparecen siempre"
        ],
        "correct": 0,
        "why": "La litiasis sintomática puede recurrir; se valora tratamiento definitivo electivo según comorbilidades y contexto."
      }
    ]
  },
  {
    "id": "cg-07",
    "area": "Cirugía General",
    "topic": "Coledocolitiasis",
    "stem": "Paciente de 51 años con dolor en hipocondrio derecho, ictericia y coluria. Afebril, estable, bilirrubina directa y fosfatasa alcalina elevadas, colédoco dilatado en ultrasonido.",
    "source": {
      "label": "GPC IMSS-237-09 · Colecistitis y colelitiasis",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/237GER.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué patrón de alteración hepática predomina?",
        "options": [
          "Colestásico",
          "Hepatocelular puro",
          "Hemolítico aislado",
          "Insuficiencia sintética aislada"
        ],
        "correct": 0,
        "why": "El predominio de bilirrubina conjugada y fosfatasa alcalina con dilatación ductal orienta a obstrucción biliar."
      },
      {
        "prompt": "¿Qué complicación sugiere la aparición posterior de fiebre y escalofríos?",
        "options": [
          "Cólico renal",
          "Colangitis aguda",
          "Hernia hiatal",
          "Hepatitis autoinmune aislada"
        ],
        "correct": 1,
        "why": "Fiebre sobre un cuadro obstructivo biliar sugiere infección de la vía biliar y exige evaluación urgente."
      }
    ]
  },
  {
    "id": "cg-08",
    "area": "Cirugía General",
    "topic": "Pancreatitis de origen biliar",
    "stem": "Mujer de 48 años con dolor epigástrico irradiado a espalda y lipasa cinco veces el límite superior. Ultrasonido con litiasis vesicular; hemodinámicamente estable y sin fiebre.",
    "source": {
      "label": "GPC IMSS-239-09 · Pancreatitis aguda",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/239GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué etiología es más probable?",
        "options": [
          "Inducida por hiperparatiroidismo demostrado",
          "Biliar",
          "Autoinmune confirmada",
          "Traumática"
        ],
        "correct": 1,
        "why": "Los cálculos vesiculares en el contexto de pancreatitis apoyan etiología biliar; deben evaluarse otras causas y obstrucción persistente."
      },
      {
        "prompt": "¿Qué criterio clínico indica mayor gravedad?",
        "options": [
          "Dolor irradiado a espalda por sí solo",
          "Presencia de náusea aislada",
          "Disfunción orgánica persistente",
          "Magnitud de lipasa como único parámetro"
        ],
        "correct": 2,
        "why": "La falla orgánica y su duración son determinantes de gravedad; la cifra de lipasa no cuantifica por sí sola la severidad."
      }
    ]
  },
  {
    "id": "cg-09",
    "area": "Cirugía General",
    "topic": "Apendicitis: presentación atípica",
    "stem": "Adolescente de 17 años con dolor abdominal de inicio periumbilical, ahora predominante en flanco derecho y exacerbado al extender la cadera. Fiebre y anorexia; sin disuria.",
    "source": {
      "label": "GPC IMSS-031-08 · Diagnóstico de apendicitis aguda",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/031GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué variante anatómica explica el dolor con extensión de cadera?",
        "options": [
          "Apéndice pélvico cercano al obturador interno",
          "Apéndice intramural gástrico",
          "Apéndice retrocecal próximo al psoas",
          "Apéndice subhepático en todos los casos"
        ],
        "correct": 2,
        "why": "La irritación del psoas puede aparecer con un apéndice retrocecal; el signo aislado no confirma apendicitis."
      },
      {
        "prompt": "¿Qué conducta procede si persiste sospecha pese a exploración poco típica?",
        "options": [
          "Descartarla por no tener dolor exacto en McBurney",
          "Administrar laxante como prueba diagnóstica",
          "Esperar varias semanas sin control",
          "Valoración quirúrgica y estudios de imagen según contexto"
        ],
        "correct": 3,
        "why": "La posición apendicular modifica los hallazgos; la evaluación clínica seriada e imagen selectiva ayudan a evitar retrasos."
      }
    ]
  },
  {
    "id": "cg-10",
    "area": "Cirugía General",
    "topic": "Hernia femoral",
    "stem": "Mujer de 72 años con masa pequeña dolorosa inferior al ligamento inguinal, medial a los vasos femorales, de aparición reciente al estar de pie. Actualmente reductible, sin vómitos.",
    "source": {
      "label": "HerniaSurge · Actualización 2023 de hernia inguinal",
      "url": "https://academic.oup.com/bjsopen/article/7/5/zrad080/7325871"
    },
    "questions": [
      {
        "prompt": "¿Qué tipo de hernia corresponde mejor a la localización?",
        "options": [
          "Inguinal directa",
          "Umbilical",
          "Incisional supraumbilical",
          "Femoral"
        ],
        "correct": 3,
        "why": "La hernia femoral protruye por el canal femoral, inferior al ligamento inguinal y medial a la vena femoral."
      },
      {
        "prompt": "¿Por qué se recomienda valoración quirúrgica oportuna?",
        "options": [
          "Riesgo relativamente elevado de incarceración y estrangulación",
          "Siempre se resuelve de forma espontánea",
          "La reducción excluye riesgo futuro",
          "Es una contraindicación absoluta para cualquier reparación"
        ],
        "correct": 0,
        "why": "El cuello estrecho del canal femoral aumenta el riesgo de complicación, aun cuando la hernia sea inicialmente reductible."
      }
    ]
  },
  {
    "id": "urg-06",
    "area": "Urgencias",
    "topic": "Dengue con signos de alarma",
    "stem": "Adulto de 23 años residente en zona endémica, quinto día de fiebre y mialgias. Al bajar la fiebre aparece dolor abdominal intenso, vómitos persistentes y aumento del hematocrito con descenso plaquetario.",
    "source": {
      "label": "CENAPRECE · Protocolo de dengue, 10 septiembre 2024",
      "url": "https://dengue.salud.gob.mx/interna/Evidencias.html"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la clasificación clínica más probable si no hay choque ni falla orgánica?",
        "options": [
          "Dengue con signos de alarma",
          "Dengue sin signos de alarma",
          "Dengue grave por choque establecido",
          "Convalecencia sin riesgo"
        ],
        "correct": 0,
        "why": "Dolor intenso, vómitos y hemoconcentración progresiva con plaquetopenia sugieren riesgo de fuga plasmática y requieren valoración estrecha."
      },
      {
        "prompt": "¿Qué estrategia general corresponde a esta presentación?",
        "options": [
          "Transfusión de plaquetas automática por cualquier descenso",
          "Evaluación hospitalaria, vigilancia de perfusión y líquidos según protocolo",
          "Alta sin reevaluación porque desapareció la fiebre",
          "Diurético rutinario para prevenir fuga capilar"
        ],
        "correct": 1,
        "why": "La fase crítica puede comenzar con la defervescencia; la reposición de líquidos y vigilancia se individualizan, no se basan solo en plaquetas."
      }
    ]
  },
  {
    "id": "urg-07",
    "area": "Urgencias",
    "topic": "Dengue: seguridad farmacológica",
    "stem": "Mujer de 28 años con fiebre, cefalea retroocular y mialgias de dos días en zona con transmisión de dengue. Está estable, sin sangrado ni signos de alarma y tolera líquidos.",
    "source": {
      "label": "OMS · Dengue y dengue grave",
      "url": "https://www.who.int/es/news-room/fact-sheets/detail/Dengue-and-severe-Dengue"
    },
    "questions": [
      {
        "prompt": "¿Qué fármaco debe evitarse ante sospecha de dengue?",
        "options": [
          "Ningún analgésico requiere precaución",
          "Ácido acetilsalicílico",
          "Paracetamol a dosis apropiada",
          "Solución de rehidratación oral"
        ],
        "correct": 1,
        "why": "El ácido acetilsalicílico y otros AINE pueden incrementar el riesgo de hemorragia; paracetamol puede emplearse con precauciones habituales."
      },
      {
        "prompt": "¿Qué síntoma nuevo exige reevaluación urgente?",
        "options": [
          "Resolución de cefalea sin otros síntomas",
          "Diuresis conservada",
          "Dolor abdominal intenso persistente",
          "Mejoría sostenida del apetito"
        ],
        "correct": 2,
        "why": "El dolor abdominal intenso es signo de alarma, particularmente al disminuir la fiebre."
      }
    ]
  },
  {
    "id": "urg-08",
    "area": "Urgencias",
    "topic": "Trauma abdominal con choque",
    "stem": "Varón de 29 años tras colisión presenta PA 76/42 mmHg, taquicardia, abdomen distendido y doloroso. Tras evaluación inicial se sospecha hemorragia interna; eFAST muestra líquido libre intraperitoneal.",
    "source": {
      "label": "NICE NG39 · Trauma mayor",
      "url": "https://www.nice.org.uk/guidance/ng39/chapter/Recommendations"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el tipo de choque más probable?",
        "options": [
          "Anafiláctico",
          "Cardiogénico primario",
          "Hipovolémico hemorrágico",
          "Neurogénico"
        ],
        "correct": 2,
        "why": "La inestabilidad tras trauma y líquido intraperitoneal sugieren hemorragia; se deben valorar simultáneamente otras fuentes."
      },
      {
        "prompt": "¿Qué prioridad terapéutica es coherente con la inestabilidad persistente?",
        "options": [
          "Tomografía electiva antes de activar recursos",
          "Observación ambulatoria con analgésicos",
          "Diuréticos para reducir líquido abdominal",
          "Reanimación hemostática y control urgente de hemorragia por equipo de trauma"
        ],
        "correct": 3,
        "why": "El control del sangrado y la reanimación no deben retrasarse por estudios que no cambiarían la necesidad de intervención inmediata."
      }
    ]
  },
  {
    "id": "urg-09",
    "area": "Urgencias",
    "topic": "Embolia pulmonar en paciente estable",
    "stem": "Mujer de 54 años tras inmovilización por fractura, con disnea súbita, taquicardia y dolor pleurítico. PA 122/75 mmHg. Probabilidad clínica alta de embolia pulmonar; función renal y contraste sin impedimentos conocidos.",
    "source": {
      "label": "GPC IMSS · Enfermedad tromboembólica venosa",
      "url": "https://revistamedica.imss.gob.mx/index.php/revista_medica/article/view/1707"
    },
    "questions": [
      {
        "prompt": "¿Qué prueba de imagen es apropiada para confirmar el diagnóstico?",
        "options": [
          "Radiografía de tórax como prueba definitiva",
          "Doppler carotídeo",
          "Ecocardiograma transtorácico como único método de exclusión",
          "Angiotomografía pulmonar"
        ],
        "correct": 3,
        "why": "En paciente estable con probabilidad alta y sin contraindicación al contraste, la angiotomografía permite demostrar defectos de llenado pulmonares."
      },
      {
        "prompt": "¿Qué hallazgo cambiaría la prioridad hacia un cuadro de alto riesgo?",
        "options": [
          "Hipotensión persistente atribuible a embolia",
          "Dolor pleurítico leve aislado",
          "Taquicardia sin hipotensión por sí sola",
          "Tos seca sin hipoxemia"
        ],
        "correct": 0,
        "why": "La inestabilidad hemodinámica por embolia implica alto riesgo y puede requerir estrategia de reperfusión urgente según evaluación."
      }
    ]
  },
  {
    "id": "urg-10",
    "area": "Urgencias",
    "topic": "Anafilaxia sin manifestaciones cutáneas",
    "stem": "Paciente de 33 años desarrolla estridor, broncoespasmo e hipotensión minutos después de recibir un medicamento al que había reaccionado previamente. No presenta urticaria.",
    "source": {
      "label": "AHA · Situaciones especiales de reanimación 2025",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation/"
    },
    "questions": [
      {
        "prompt": "¿Qué diagnóstico debe considerarse aun sin lesiones cutáneas?",
        "options": [
          "Anafilaxia",
          "Crisis de ansiedad aislada",
          "Rinitis alérgica no complicada",
          "Urticaria crónica espontánea"
        ],
        "correct": 0,
        "why": "El compromiso respiratorio y circulatorio abrupto tras exposición compatible permite sospechar anafilaxia aunque falten manifestaciones cutáneas."
      },
      {
        "prompt": "¿Cuál es el tratamiento farmacológico inicial de elección?",
        "options": [
          "Adrenalina oral",
          "Adrenalina intramuscular",
          "Antihistamínico oral como monoterapia",
          "Corticoide inhalado como única intervención"
        ],
        "correct": 1,
        "why": "La adrenalina intramuscular es de primera línea; se activa apoyo urgente y se maneja vía aérea y circulación según respuesta."
      }
    ]
  },
  {
    "id": "mf-05",
    "area": "Medicina Familiar",
    "topic": "Hipertensión de bata blanca",
    "stem": "Hombre de 45 años con cifras repetidas en consultorio de 150/92 mmHg y registros domiciliarios validados consistentemente normales. No hay daño agudo de órgano blanco ni síntomas.",
    "source": {
      "label": "GPC IMSS-076-08 · Hipertensión arterial en primer nivel",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/076GER.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué fenómeno debe investigarse?",
        "options": [
          "Hipotensión ortostática demostrada",
          "Hipertensión de bata blanca",
          "Hipertensión enmascarada",
          "Emergencia hipertensiva"
        ],
        "correct": 1,
        "why": "La elevación en consultorio con cifras externas normales sugiere efecto o hipertensión de bata blanca según el contexto."
      },
      {
        "prompt": "¿Qué estudio permite aclarar la discrepancia?",
        "options": [
          "Radiografía de columna",
          "Troponina seriada de rutina",
          "Monitoreo ambulatorio de presión arterial",
          "Electroencefalograma"
        ],
        "correct": 2,
        "why": "El monitoreo ambulatorio o domiciliario protocolizado permite comparar las cifras fuera del consultorio antes de clasificar y tratar."
      }
    ]
  },
  {
    "id": "mf-06",
    "area": "Medicina Familiar",
    "topic": "Lumbalgia mecánica sin alarmas",
    "stem": "Mujer de 37 años presenta dolor lumbar tras cargar cajas, de cuatro días, aumenta con movimiento. Sin fiebre, trauma importante, pérdida de peso, déficit neurológico ni disfunción de esfínteres.",
    "source": {
      "label": "GPC IMSS-045-08 · Lumbalgia",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/045GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué enfoque diagnóstico inicial es apropiado?",
        "options": [
          "Tomografía con contraste como primer estudio obligatorio",
          "Punción lumbar",
          "Evaluación clínica sin imagen rutinaria",
          "Resonancia magnética urgente a toda persona"
        ],
        "correct": 2,
        "why": "En lumbalgia aguda inespecífica sin signos de alarma, la imagen rutinaria no suele mejorar los resultados y puede mostrar hallazgos incidentales."
      },
      {
        "prompt": "¿Qué síntoma nuevo exige valoración urgente?",
        "options": [
          "Rigidez muscular leve al despertar",
          "Dolor localizado que mejora al caminar",
          "Sensibilidad paravertebral sin déficit",
          "Retención urinaria con anestesia en silla de montar"
        ],
        "correct": 3,
        "why": "La alteración esfinteriana y anestesia perineal sugieren síndrome de cauda equina, que requiere evaluación urgente."
      }
    ]
  },
  {
    "id": "mf-07",
    "area": "Medicina Familiar",
    "topic": "Tamizaje cervicouterino",
    "stem": "Mujer de 39 años asintomática, con cuello uterino y sin tamizaje previo, solicita orientación en primer nivel. No refiere inmunosupresión ni antecedentes de lesión cervical.",
    "source": {
      "label": "GPC IMSS · Tamizaje de cáncer cervicouterino",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/146GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la finalidad del tamizaje en esta paciente?",
        "options": [
          "Confirmar cáncer invasor en toda prueba positiva",
          "Diagnosticar endometriosis",
          "Determinar reserva ovárica",
          "Detectar lesiones precursoras o riesgo de cáncer antes de síntomas"
        ],
        "correct": 3,
        "why": "El tamizaje identifica riesgo o lesiones precursoras; una prueba positiva necesita seguimiento según el algoritmo, no equivale a cáncer."
      },
      {
        "prompt": "¿Qué factor debe determinar la prueba y periodicidad?",
        "options": [
          "Edad, historia de tamizaje y programa nacional aplicable",
          "Grupo sanguíneo",
          "Número de consultas al año",
          "Presencia de dolor lumbar aislado"
        ],
        "correct": 0,
        "why": "Los métodos e intervalos dependen de edad, antecedentes, población y lineamientos vigentes, que deben verificarse antes de aplicar un esquema."
      }
    ]
  },
  {
    "id": "mf-08",
    "area": "Medicina Familiar",
    "topic": "Obesidad y atención longitudinal",
    "stem": "Hombre de 47 años con IMC de 34 kg/m², hipertensión tratada y sedentarismo. Desea mejorar su salud; niega síntomas de urgencia. Ha intentado dietas restrictivas sin resultados sostenibles.",
    "source": {
      "label": "Consejo de Salubridad General · PRONAM, catálogo oficial",
      "url": "https://pronamsalud.csg.gob.mx/"
    },
    "questions": [
      {
        "prompt": "¿Qué comorbilidad es relevante investigar de manera dirigida?",
        "options": [
          "Diabetes tipo 2",
          "Enfermedad de Addison en todos los casos",
          "Hipoparatiroidismo obligatorio",
          "Síndrome de Marfan"
        ],
        "correct": 0,
        "why": "La obesidad aumenta riesgo cardiometabólico; la evaluación debe incluir glucemia y otros factores asociados según contexto."
      },
      {
        "prompt": "¿Qué estrategia se ajusta mejor a su manejo longitudinal?",
        "options": [
          "Considerar éxito solo si alcanza IMC menor de 20",
          "Plan individualizado con objetivos sostenibles y seguimiento",
          "Dieta extrema idéntica para todos sin controles",
          "Suspensión automática de antihipertensivos"
        ],
        "correct": 1,
        "why": "La obesidad es una enfermedad crónica; el enfoque debe considerar comorbilidades, preferencias, seguimiento y metas clínicas realistas."
      }
    ]
  },
  {
    "id": "mf-09",
    "area": "Medicina Familiar",
    "topic": "Enfermedad renal crónica: tamizaje dirigido",
    "stem": "Mujer de 61 años con diabetes tipo 2 de diez años e hipertensión. Creatinina dentro del rango del laboratorio, sin síntomas urinarios y sin mediciones recientes de albuminuria.",
    "source": {
      "label": "GPC IMSS-335-19 · Enfermedad renal crónica",
      "url": "https://www.imss.gob.mx/sites/all/statics/guiasclinicas/335GRR.pdf"
    },
    "questions": [
      {
        "prompt": "¿Qué estudios permiten detectar afectación renal temprana?",
        "options": [
          "Densitometría ósea exclusivamente",
          "TFGe y cociente albúmina/creatinina urinario",
          "Urea aislada sin estimar filtración",
          "Radiografía simple de abdomen"
        ],
        "correct": 1,
        "why": "La creatinina aislada puede ocultar alteración de filtración; la albuminuria añade información de daño renal y riesgo."
      },
      {
        "prompt": "¿Por qué repetir una alteración inicial según el contexto?",
        "options": [
          "Porque la albuminuria nunca varía",
          "Para sustituir por completo la evaluación clínica",
          "Para confirmar persistencia y descartar causas transitorias",
          "Para asumir enfermedad crónica con cualquier resultado aislado"
        ],
        "correct": 2,
        "why": "La definición de enfermedad renal crónica exige alteraciones durante al menos tres meses, salvo evidencia previa suficiente."
      }
    ]
  },
  {
    "id": "sp-04",
    "area": "Salud Pública",
    "topic": "Brote alimentario: riesgo relativo",
    "stem": "Tras una comida comunitaria se estudia a 100 asistentes: 30 de 50 que comieron ensalada enfermaron, frente a 5 de 50 que no la consumieron. Todos fueron identificados y evaluados.",
    "source": {
      "label": "CDC · Field Epidemiology Manual: análisis de datos",
      "url": "https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html"
    },
    "questions": [
      {
        "prompt": "¿Cuál fue la tasa de ataque entre los expuestos?",
        "options": [
          "35 %",
          "10 %",
          "60 %",
          "30 %"
        ],
        "correct": 2,
        "why": "Treinta enfermos entre cincuenta expuestos representan 0.60; el denominador corresponde a quienes comieron ensalada."
      },
      {
        "prompt": "¿Cuál es el riesgo relativo de enfermar asociado a la exposición?",
        "options": [
          "3",
          "0.6",
          "12",
          "6"
        ],
        "correct": 3,
        "why": "El riesgo de los expuestos es 0.60 y el de no expuestos 0.10; su cociente es 6. La asociación no prueba causalidad por sí sola."
      }
    ]
  },
  {
    "id": "sp-05",
    "area": "Salud Pública",
    "topic": "Estudio de casos y controles",
    "stem": "Se seleccionan 80 personas con una enfermedad rara y 80 sin ella para investigar exposiciones previas a un producto. Los participantes se eligen según presencia o ausencia del desenlace.",
    "source": {
      "label": "CDC · Field Epidemiology Manual: análisis de datos",
      "url": "https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html"
    },
    "questions": [
      {
        "prompt": "¿Qué diseño epidemiológico se utiliza?",
        "options": [
          "Cohorte prospectiva",
          "Ensayo clínico aleatorizado",
          "Serie de casos sin comparación",
          "Casos y controles"
        ],
        "correct": 3,
        "why": "Los participantes se seleccionan a partir del desenlace y se compara la frecuencia de exposiciones previas."
      },
      {
        "prompt": "¿Qué medida de asociación se obtiene directamente?",
        "options": [
          "Razón de momios (odds ratio)",
          "Riesgo relativo de incidencia directamente",
          "Tasa de ataque poblacional directamente",
          "Diferencia de supervivencia a cinco años obligatoria"
        ],
        "correct": 0,
        "why": "En casos y controles convencionales no se conocen denominadores poblacionales de riesgo; se estima la razón de momios."
      }
    ]
  },
  {
    "id": "sp-06",
    "area": "Salud Pública",
    "topic": "Incidencia acumulada",
    "stem": "En una comunidad cerrada de 1 000 personas sin una enfermedad al inicio del año se diagnostican 40 casos nuevos en doce meses; no hay pérdidas de seguimiento.",
    "source": {
      "label": "CDC · Field Epidemiology Manual: descripción de datos",
      "url": "https://www.cdc.gov/field-epi-manual/php/chapters/describing-epi-data.html"
    },
    "questions": [
      {
        "prompt": "¿Cuál es la incidencia acumulada anual?",
        "options": [
          "4 %",
          "0.4 %",
          "40 %",
          "25 %"
        ],
        "correct": 0,
        "why": "La incidencia acumulada es casos nuevos entre población inicialmente en riesgo: 40/1000 = 0.04."
      },
      {
        "prompt": "¿Qué medida describiría a todos los enfermos existentes en una fecha concreta?",
        "options": [
          "Letalidad",
          "Prevalencia puntual",
          "Incidencia acumulada",
          "Riesgo relativo"
        ],
        "correct": 1,
        "why": "La prevalencia puntual cuantifica casos existentes, nuevos o previos, en una fecha definida respecto de la población correspondiente."
      }
    ]
  },
  {
    "id": "sp-07",
    "area": "Salud Pública",
    "topic": "Brote en comunidad: definición de caso",
    "stem": "Una clínica identifica un aumento inesperado de gastroenteritis tras una fiesta. Se requiere comparar casos y describir la distribución temporal antes de establecer el agente causal.",
    "source": {
      "label": "CDC · Field Epidemiology Manual: investigación de campo",
      "url": "https://www.cdc.gov/field-epi-manual/php/chapters/field-investigation.html"
    },
    "questions": [
      {
        "prompt": "¿Qué debe incluir una definición operativa inicial de caso?",
        "options": [
          "Solo resultados positivos de cualquier laboratorio",
          "Criterios clínicos y restricciones de persona, lugar y tiempo",
          "Solo el alimento que se sospecha como causa",
          "Únicamente casos con complicaciones graves"
        ],
        "correct": 1,
        "why": "Una definición uniforme permite identificar casos de manera reproducible; no debe incorporar la exposición que se pretende investigar como requisito sin justificación."
      },
      {
        "prompt": "¿Qué gráfica ayuda a visualizar la distribución por inicio de síntomas?",
        "options": [
          "Gráfico de supervivencia por tratamiento",
          "Histograma de edades sin información temporal",
          "Curva epidémica",
          "Diagrama de dispersión de peso y talla"
        ],
        "correct": 2,
        "why": "La curva epidémica organiza los casos por tiempo de inicio y ayuda a formular hipótesis sobre patrón y duración del brote."
      }
    ]
  },
  {
    "id": "sp-08",
    "area": "Salud Pública",
    "topic": "Dengue: prevención vectorial",
    "stem": "En un municipio con transmisión de dengue se identifican recipientes domésticos con agua estancada y alta densidad de mosquitos. La comunidad solicita medidas preventivas sostenibles.",
    "source": {
      "label": "OMS · Dengue y dengue grave",
      "url": "https://www.who.int/es/news-room/fact-sheets/detail/Dengue-and-severe-Dengue"
    },
    "questions": [
      {
        "prompt": "¿Cuál es el principal vector urbano del dengue?",
        "options": [
          "Triatoma infestans",
          "Culex pipiens como principal vector de dengue",
          "Aedes aegypti",
          "Anopheles gambiae"
        ],
        "correct": 2,
        "why": "Aedes aegypti es el principal vector urbano; otras especies de Aedes también pueden transmitir el virus."
      },
      {
        "prompt": "¿Qué medida comunitaria reduce criaderos domésticos?",
        "options": [
          "Antibióticos profilácticos a toda la comunidad",
          "Usar solo mosquiteros nocturnos como única acción",
          "Clorar exclusivamente agua de consumo sin retirar criaderos",
          "Eliminar, vaciar o cubrir recipientes que acumulan agua"
        ],
        "correct": 3,
        "why": "La reducción de sitios de reproducción y la protección contra picaduras forman parte del control integrado del vector."
      }
    ]
  }
]);
 // Deterministically rotate answer positions so trainees cannot infer the
 // answer from a repeated option letter. Wording and clinical content stay
 // identical; only option order and index are transformed together.
 cases.forEach((c,ci)=>c.questions.forEach((q,qi)=>{
  const shift=(ci*2+qi)%4;
  if(!shift)return;
  const options=Array(4);
  q.options.forEach((value,i)=>{options[(i+shift)%4]=value});
  q.options=options;
  q.correct=(q.correct+shift)%4;
 }));
 const AREAS=['Medicina Interna','Pediatría','Ginecología y Obstetricia','Cirugía General','Urgencias','Medicina Familiar','Salud Pública'];
 const questions=cases.reduce((n,c)=>n+c.questions.length,0);
 const api={VERSION:'1.1.0',caseCount:cases.length,questionCount:questions,cases,areas:AREAS,format:R.enarm,
  disclaimer:'Casos educativos originales; revisión clínica independiente pendiente. No son preguntas oficiales ni sustituyen guías, supervisión ni juicio clínico.'};
 return Object.freeze(api);
});
