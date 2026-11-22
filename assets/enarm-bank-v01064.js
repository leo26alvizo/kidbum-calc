/* KidBum ENARM 1.0 · Banco local de CASOS ORIGINALES v0.10.64
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
  cold:{label:'OMS · Cadena de frío de inmunización',url:'https://www.who.int/teams/immunization-vaccines-and-biologicals/essential-programme-on-immunization/supply-chain/controlled-temperature-chain-%28ctc%29'}
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
  Q('¿Qué se sospecha?',['Hipertensión arterial por confirmar','Choque hipovolémico','Hipotensión ortostática','Crisis hipertensiva obligada'],0,'Lecturas repetidas elevadas generan sospecha, pero en paciente estable es preferible confirmar con medición correcta y, de ser posible, fuera del consultorio.'),
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
 ];
 const AREAS=['Medicina Interna','Pediatría','Ginecología y Obstetricia','Cirugía General','Urgencias','Medicina Familiar','Salud Pública'];
 const questions=cases.reduce((n,c)=>n+c.questions.length,0);
 const api={VERSION:'1.0.0',caseCount:cases.length,questionCount:questions,cases,areas:AREAS,format:R.enarm,
  disclaimer:'Casos educativos originales; revisión clínica independiente pendiente. No son preguntas oficiales ni sustituyen guías, supervisión ni juicio clínico.'};
 return Object.freeze(api);
});
