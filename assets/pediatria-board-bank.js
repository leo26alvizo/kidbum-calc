'use strict';
window.KidBumPediatriaBoard=Object.freeze({
  "sections": [
    "Neonatología",
    "Urgencias y terapia intensiva",
    "Gastroenterología y nutrición",
    "Hemato-oncología",
    "Infectología y vacunología",
    "Cardio-pulmonar",
    "Cirugía pediátrica",
    "Alergia y dermatología",
    "Endocrinología",
    "Nefro-urología",
    "Genética",
    "Ortopedia",
    "Neurología",
    "Inmuno-reumatología",
    "Oftalmología",
    "Otorrinolaringología"
  ],
  "questions": [
    {
      "id": "PB001",
      "section": "Neonatología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué mecanismo explica la enfermedad de membrana hialina del prematuro?",
      "options": [
        "Déficit de surfactante con aumento de tensión superficial",
        "Retraso de absorción de líquido pulmonar",
        "Hipertensión pulmonar aislada",
        "Obstrucción por meconio"
      ],
      "correct": 0,
      "why": "El déficit de surfactante favorece el colapso alveolar y disminuye la distensibilidad.",
      "others": "El retraso de absorción caracteriza la taquipnea transitoria; la hipertensión pulmonar y el meconio son otros mecanismos.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 1 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB002",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Prematuro de 29 semanas, día 12, distensión abdominal, residuo bilioso y sangre en heces. Radiografía: neumatosis intestinal.",
      "prompt": "¿Cuál es la hipótesis principal?",
      "options": [
        "Enterocolitis necrotizante",
        "Estenosis hipertrófica de píloro",
        "Atresia duodenal",
        "Enfermedad de Hirschsprung no complicada"
      ],
      "correct": 0,
      "why": "La neumatosis en este contexto apoya enterocolitis necrotizante.",
      "others": "El píloro causa vómito no bilioso; la atresia suele manifestarse precozmente; Hirschsprung no complicado no explica bien la neumatosis.",
      "caseId": "NEC-01",
      "critical": false,
      "reference": "Guía CMCP, sección 1 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB003",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Prematuro de 29 semanas, día 12, distensión abdominal, residuo bilioso y sangre en heces. Radiografía: neumatosis intestinal.",
      "prompt": "Además de estabilizar y valorar sepsis, ¿qué estrategia inicial corresponde?",
      "options": [
        "Suspender alimentación enteral, descompresión y valoración urgente neonatal-quirúrgica",
        "Aumentar la leche enteral",
        "Administrar laxante osmótico",
        "Realizar enema de reducción como primera intervención"
      ],
      "correct": 0,
      "why": "La sospecha de enterocolitis requiere reposo intestinal, soporte, antibióticos según protocolo y evaluación de complicaciones.",
      "others": "La alimentación y laxantes pueden agravar el cuadro; el enema se usa en invaginación seleccionada, no en enterocolitis.",
      "caseId": "NEC-01",
      "critical": false,
      "reference": "Guía CMCP, sección 1 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB004",
      "section": "Urgencias y terapia intensiva",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "En la cetoacidosis diabética, ¿qué ocurre con el potasio corporal total aunque el sérico sea inicialmente normal o elevado?",
      "options": [
        "Existe depleción corporal de potasio",
        "Existe sobrecarga corporal constante",
        "No cambia respecto al basal",
        "Depende exclusivamente de la ingesta"
      ],
      "correct": 0,
      "why": "La diuresis osmótica y pérdidas gastrointestinales reducen las reservas, mientras el desplazamiento extracelular altera el valor sérico.",
      "others": "El potasio plasmático no refleja el total corporal y requiere vigilancia durante el manejo.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 2 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB005",
      "section": "Urgencias y terapia intensiva",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Escolar con cetoacidosis en tratamiento. Aparece cefalea, deterioro del estado mental y bradicardia relativa.",
      "prompt": "¿Qué complicación obliga a escalar inmediatamente?",
      "options": [
        "Lesión cerebral asociada a cetoacidosis",
        "Neuropatía diabética distal",
        "Hipotiroidismo adquirido",
        "Retinopatía proliferativa"
      ],
      "correct": 0,
      "why": "El deterioro neurológico durante una cetoacidosis obliga a tratar la sospecha de lesión cerebral urgentemente según protocolo, sin demorar por imagen.",
      "others": "Las otras complicaciones son crónicas o no explican el deterioro agudo.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 2 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB006",
      "section": "Urgencias y terapia intensiva",
      "type": "visual",
      "skill": "Interpretación",
      "stem": "Monitor simulado: FC 158/min, PA 88/52 mmHg, relleno capilar 5 s, extremidades frías, lactato 5 mmol/L.",
      "prompt": "En un escolar febril, ¿qué interpretación es prioritaria?",
      "options": [
        "Hipoperfusión sistémica con sospecha de choque",
        "Perfusión normal por presión arterial detectable",
        "Hipertensión arterial aislada",
        "Bradicardia fisiológica"
      ],
      "correct": 0,
      "why": "Taquicardia, relleno prolongado y lactato elevado apoyan hipoperfusión; se requiere evaluación y estabilización inmediata.",
      "others": "La PA aislada no excluye choque; ni hipertensión ni bradicardia explican los datos.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 2 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB007",
      "section": "Gastroenterología y nutrición",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Por qué la diarrea por déficit de lactasa tiende a mejorar al suspender la exposición al sustrato?",
      "options": [
        "Disminuye la carga osmótica intraluminal",
        "Se inhibe directamente la secreción de cloro por CFTR",
        "Se bloquea la motilidad intestinal",
        "Aumenta la producción de ácido gástrico"
      ],
      "correct": 0,
      "why": "La lactosa no absorbida retiene agua y se fermenta; retirarla disminuye la carga osmótica.",
      "others": "No es primariamente un mecanismo secretor, motor ni de ácido gástrico.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 3 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB008",
      "section": "Gastroenterología y nutrición",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Lactante de seis semanas con ictericia persistente, heces acólicas y coluria.",
      "prompt": "¿Cuál es el hallazgo de laboratorio que exige estudio urgente de colestasis?",
      "options": [
        "Elevación de bilirrubina directa",
        "Bilirrubina indirecta aislada",
        "Elevación aislada de hemoglobina",
        "Hipocalcemia aislada"
      ],
      "correct": 0,
      "why": "La hiperbilirrubinemia conjugada es patológica y obliga a descartar atresia biliar y otras etiologías.",
      "others": "La ictericia indirecta no explica heces acólicas; hemoglobina y calcio no definen colestasis.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 3 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB009",
      "section": "Gastroenterología y nutrición",
      "type": "visual",
      "skill": "Interpretación",
      "stem": "Perfil simulado: Hb 10.2 g/dL, VCM 68 fL, ferritina 6 ng/mL, PCR normal. Escolar con dieta restrictiva.",
      "prompt": "¿Qué carencia predomina?",
      "options": [
        "Hierro",
        "Vitamina B12",
        "Folato",
        "Vitamina D"
      ],
      "correct": 0,
      "why": "Microcitosis y ferritina baja en ausencia de inflamación apoyan ferropenia.",
      "others": "B12 y folato suelen asociarse a macrocitosis; vitamina D no explica este patrón.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 3 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB010",
      "section": "Hemato-oncología",
      "type": "directa",
      "skill": "Interpretación",
      "stem": "",
      "prompt": "¿Qué patrón de coagulación es típico de hemofilia A no tratada?",
      "options": [
        "TTPa prolongado con TP habitualmente normal",
        "TP prolongado aislado",
        "Plaquetas bajas aisladas",
        "TP y TTPa siempre normales"
      ],
      "correct": 0,
      "why": "La deficiencia de factor VIII altera la vía intrínseca; un TTPa normal no descarta formas leves.",
      "others": "El TP aislado orienta a vía extrínseca; trombocitopenia no es el defecto primario.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 4 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB011",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Niño con palidez, dolor óseo, fiebre, hepatoesplenomegalia y dos citopenias; frotis con blastos.",
      "prompt": "¿Qué diagnóstico debe investigarse de forma prioritaria?",
      "options": [
        "Leucemia aguda",
        "Púrpura trombocitopénica inmune aislada",
        "Anemia ferropénica aislada",
        "Hemofilia A"
      ],
      "correct": 0,
      "why": "La combinación de blastos y citopenias sugiere infiltración medular; requiere valoración hemato-oncológica urgente.",
      "others": "PTI y ferropenia aisladas no explican blastos ni el conjunto; hemofilia afecta coagulación.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 4 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB012",
      "section": "Hemato-oncología",
      "type": "visual",
      "skill": "Complicaciones",
      "stem": "Tras iniciar tratamiento de una leucemia: K 6.4 mmol/L, fósforo elevado, calcio bajo, ácido úrico elevado y creatinina ascendente.",
      "prompt": "¿Qué síndrome explica el patrón?",
      "options": [
        "Lisis tumoral",
        "Secreción inadecuada de ADH",
        "Hipercalcemia maligna aislada",
        "Síndrome nefrótico"
      ],
      "correct": 0,
      "why": "La liberación de contenido intracelular produce hiperpotasemia, hiperfosfatemia e hiperuricemia con riesgo renal y arrítmico.",
      "others": "Los otros síndromes no explican el conjunto de alteraciones.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 4 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB013",
      "section": "Infectología y vacunología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Por qué las vacunas conjugadas contra bacterias encapsuladas son útiles en lactantes?",
      "options": [
        "Transforman la respuesta a polisacáridos en dependiente de células T",
        "Suprimen la memoria inmunitaria",
        "Evitan toda respuesta de anticuerpos",
        "Solo inducen inmunidad innata transitoria"
      ],
      "correct": 0,
      "why": "La proteína transportadora permite cooperación T-B, memoria y mejor respuesta en edades tempranas.",
      "others": "Las demás opciones contradicen el mecanismo de conjugación.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 5 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB014",
      "section": "Infectología y vacunología",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Niño con fiebre, rigidez de nuca, alteración de conciencia y mala perfusión.",
      "prompt": "¿Qué principio debe guiar la conducta inicial si se sospecha meningitis bacteriana?",
      "options": [
        "Estabilizar e iniciar antimicrobianos oportunos sin retrasarlos por una punción lumbar insegura",
        "Esperar cultivo positivo antes de tratar",
        "Practicar punción lumbar sin evaluar estabilidad",
        "Indicar manejo ambulatorio por defecto"
      ],
      "correct": 0,
      "why": "La prioridad es estabilización y tratamiento temprano; se obtienen cultivos si no retrasan el manejo, y la punción se difiere si es insegura.",
      "others": "Esperar resultados, ignorar contraindicaciones o enviar a casa aumenta el riesgo.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 5 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB015",
      "section": "Infectología y vacunología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Lactante con tos, rinorrea, primer episodio de sibilancias y crepitantes difusos, sin focalidad.",
      "prompt": "¿Qué diagnóstico clínico es más probable?",
      "options": [
        "Bronquiolitis",
        "Fibrosis quística confirmada",
        "Neumonía lobar demostrada",
        "Aspiración de cuerpo extraño confirmada"
      ],
      "correct": 0,
      "why": "El pródromo catarral y los hallazgos difusos favorecen bronquiolitis, especialmente en lactantes.",
      "others": "Los otros diagnósticos requerirían datos adicionales; la aspiración suele tener inicio brusco o hallazgos focales.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 5 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB016",
      "section": "Cardio-pulmonar",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "En tetralogía de Fallot, ¿qué componente favorece más el cortocircuito derecha-izquierda?",
      "options": [
        "Obstrucción del tracto de salida del ventrículo derecho",
        "Comunicación interauricular aislada",
        "Insuficiencia mitral primaria",
        "Coartación aórtica aislada"
      ],
      "correct": 0,
      "why": "La obstrucción de salida derecha aumenta la presión ventricular derecha y favorece el paso por la CIV.",
      "others": "Las otras lesiones no son el determinante principal del cortocircuito de Fallot.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 6 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB017",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Lactante de dos meses con taquipnea al comer, diaforesis, pobre ganancia ponderal, hepatomegalia y soplo holosistólico paraesternal.",
      "prompt": "¿Qué mecanismo es probable?",
      "options": [
        "Cortocircuito izquierda-derecha significativo por CIV con sobrecirculación pulmonar",
        "Estenosis pulmonar crítica sin sobrecirculación",
        "Arritmia sinusal respiratoria fisiológica",
        "Dextrocardia aislada"
      ],
      "correct": 0,
      "why": "Al caer la resistencia vascular pulmonar puede aumentar el flujo por una CIV y manifestarse insuficiencia cardiaca.",
      "others": "La estenosis limita flujo pulmonar; la arritmia fisiológica y dextrocardia aislada no explican el cuadro.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 6 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB018",
      "section": "Cardio-pulmonar",
      "type": "visual",
      "skill": "Interpretación",
      "stem": "Datos de pulsioximetría simulados: mano derecha 96%, pie 82%, recién nacido con dificultad respiratoria.",
      "prompt": "¿Qué sugiere la diferencia preductal-posductal?",
      "options": [
        "Cortocircuito ductal derecha-izquierda; valorar hipertensión pulmonar y cardiopatía",
        "Normalidad obligatoria",
        "Anemia ferropénica como única explicación",
        "Error diagnóstico descartado por la cifra preductal"
      ],
      "correct": 0,
      "why": "La diferencia puede indicar paso de sangre menos oxigenada a la aorta descendente; no identifica por sí sola la etiología.",
      "others": "Ni la saturación preductal normal ni la anemia aislada descartan una lesión crítica.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 6 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB019",
      "section": "Cirugía pediátrica",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Cuál es el origen de la alcalosis metabólica hipoclorémica clásica en estenosis hipertrófica de píloro?",
      "options": [
        "Pérdida de ácido clorhídrico por vómito persistente",
        "Pérdida intestinal de bicarbonato",
        "Acumulación de lactato aislada",
        "Retención de ácido por insuficiencia renal"
      ],
      "correct": 0,
      "why": "La pérdida de HCl y la contracción de volumen perpetúan la alcalosis.",
      "others": "Las pérdidas de bicarbonato y acumulación de ácidos favorecen acidosis.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 7 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB020",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Lactante con episodios de dolor intenso intermitente, palidez, vómito y períodos asintomáticos.",
      "prompt": "¿Qué estudio inicial suele ser más útil si se sospecha invaginación intestinal?",
      "options": [
        "Ultrasonido abdominal",
        "Electroencefalograma",
        "Radiografía de cráneo",
        "Endoscopia alta como primera elección"
      ],
      "correct": 0,
      "why": "El ultrasonido identifica patrones característicos de invaginación y orienta la reducción en pacientes elegibles.",
      "others": "Los otros estudios no son de primera línea para esta hipótesis.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 7 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB021",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Adolescente con dolor testicular súbito, testículo elevado y náusea; alta sospecha clínica de torsión.",
      "prompt": "¿Qué conducta es prioritaria?",
      "options": [
        "Valoración quirúrgica urgente sin retrasarla por estudios innecesarios",
        "Observación hasta el día siguiente",
        "Antibiótico oral como única medida",
        "Punción del escroto"
      ],
      "correct": 0,
      "why": "La torsión compromete la viabilidad testicular y exige manejo urgente.",
      "others": "La observación, antibióticos o punción no corrigen la isquemia.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 7 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB022",
      "section": "Alergia y dermatología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué alteración de barrera contribuye a la dermatitis atópica?",
      "options": [
        "Disfunción de filagrina y del estrato córneo",
        "Exceso de melanina como mecanismo único",
        "Oclusión arterial dérmica",
        "Déficit aislado de plaquetas"
      ],
      "correct": 0,
      "why": "La barrera epidérmica alterada facilita pérdida de agua, entrada de irritantes y sensibilización.",
      "others": "Los demás mecanismos no explican la alteración de barrera atópica.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 8 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB023",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Niña con urticaria generalizada, sibilancias y mala perfusión minutos después de ingerir un alimento.",
      "prompt": "¿Cuál es el tratamiento farmacológico de primera línea?",
      "options": [
        "Adrenalina intramuscular",
        "Antihistamínico oral como monoterapia",
        "Corticoide inhalado como monoterapia",
        "Antibiótico intravenoso"
      ],
      "correct": 0,
      "why": "La anafilaxia requiere adrenalina IM temprana, además de medidas de soporte y vigilancia.",
      "others": "Antihistamínicos y corticoides no sustituyen adrenalina; antibióticos no tratan anafilaxia.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 8 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB024",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Complicaciones",
      "stem": "Lactante con hemangioma periocular en crecimiento que cubre parcialmente la pupila.",
      "prompt": "¿Qué riesgo motiva referencia prioritaria?",
      "options": [
        "Ambliopía por deprivación visual",
        "Glaucoma congénito inevitable",
        "Retinoblastoma por transformación",
        "Ceguera cortical por defecto cromosómico"
      ],
      "correct": 0,
      "why": "La obstrucción del eje visual y el astigmatismo inducido pueden comprometer el desarrollo visual.",
      "others": "No implica transformación maligna ni los otros trastornos de forma inevitable.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 8 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB025",
      "section": "Endocrinología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué déficit enzimático causa la mayoría de casos de hiperplasia suprarrenal congénita clásica?",
      "options": [
        "21-hidroxilasa",
        "11β-hidroxiesteroide deshidrogenasa tipo 2",
        "5α-reductasa",
        "Aromatasa placentaria"
      ],
      "correct": 0,
      "why": "La deficiencia de 21-hidroxilasa altera síntesis de cortisol y en formas graves aldosterona, aumentando andrógenos.",
      "others": "Las otras enzimas causan trastornos diferentes.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 9 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB026",
      "section": "Endocrinología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Niña de seis años con telarquia progresiva, aceleración de crecimiento, edad ósea avanzada y respuesta puberal de LH a estímulo.",
      "prompt": "¿Cuál es el mecanismo más probable?",
      "options": [
        "Activación prematura del eje hipotálamo-hipófisis-gónada",
        "Telarquia aislada no progresiva",
        "Insensibilidad completa a andrógenos",
        "Hipogonadismo hipogonadotrópico"
      ],
      "correct": 0,
      "why": "La progresión, edad ósea y respuesta de LH apoyan pubertad precoz central.",
      "others": "La telarquia aislada no suele acelerar edad ósea; las otras opciones no explican el patrón.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 9 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB027",
      "section": "Endocrinología",
      "type": "visual",
      "skill": "Interpretación",
      "stem": "Sodio 155 mmol/L, osmolaridad plasmática elevada, orina muy diluida pese a hiperosmolaridad, poliuria.",
      "prompt": "¿Qué trastorno debe evaluarse?",
      "options": [
        "Diabetes insípida",
        "SIADH",
        "Polidipsia primaria como explicación más probable",
        "Síndrome de secreción excesiva de aldosterona aislada"
      ],
      "correct": 0,
      "why": "La incapacidad de concentrar orina ante hiperosmolaridad sugiere déficit o resistencia a vasopresina.",
      "others": "SIADH concentra orina y suele causar hiponatremia; polidipsia suele bajar osmolaridad plasmática.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 9 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB028",
      "section": "Nefro-urología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué patrón ácido-base es típico de acidosis tubular renal distal clásica?",
      "options": [
        "Acidosis metabólica hiperclorémica con brecha aniónica normal",
        "Alcalosis metabólica hipoclorémica",
        "Acidosis respiratoria pura",
        "Alcalosis respiratoria pura"
      ],
      "correct": 0,
      "why": "La excreción distal de protones está alterada, con acidosis de brecha normal y orina inapropiadamente alcalina en el contexto adecuado.",
      "others": "Los otros patrones no corresponden al defecto de acidificación renal.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 10 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB029",
      "section": "Nefro-urología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Escolar con edema palpebral, hematuria macroscópica, hipertensión y C3 bajo dos semanas después de faringitis.",
      "prompt": "¿Cuál es la hipótesis principal?",
      "options": [
        "Glomerulonefritis postinfecciosa",
        "Síndrome nefrótico de cambios mínimos aislado",
        "Cistitis no complicada",
        "Diabetes insípida"
      ],
      "correct": 0,
      "why": "El síndrome nefrítico con hipocomplementemia tras infección es compatible con glomerulonefritis postinfecciosa.",
      "others": "Cambios mínimos suele dar proteinuria nefrótica; cistitis y diabetes insípida no explican hipertensión y C3 bajo.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 10 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB030",
      "section": "Nefro-urología",
      "type": "visual",
      "skill": "Interpretación",
      "stem": "Proteinuria intensa, albúmina sérica 1.8 g/dL, edema generalizado e hiperlipidemia.",
      "prompt": "¿Qué síndrome define el conjunto?",
      "options": [
        "Síndrome nefrótico",
        "Síndrome nefrítico puro",
        "Acidosis tubular renal",
        "Enuresis primaria"
      ],
      "correct": 0,
      "why": "Proteinuria importante, hipoalbuminemia y edema caracterizan el síndrome nefrótico.",
      "others": "El nefrítico se caracteriza más por hematuria e hipertensión; los otros no producen este patrón.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 10 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB031",
      "section": "Genética",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué proteína está afectada en la distrofia muscular de Duchenne?",
      "options": [
        "Distrofina",
        "Fibrilina-1",
        "Colágeno tipo I",
        "Alfa-1 antitripsina"
      ],
      "correct": 0,
      "why": "La pérdida de distrofina desestabiliza la membrana de la fibra muscular.",
      "others": "Fibrilina se relaciona con Marfan, colágeno I con osteogénesis imperfecta y alfa-1 antitripsina con enfermedad hepato-pulmonar.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 11 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB032",
      "section": "Genética",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Niño con infecciones respiratorias recurrentes, esteatorrea, pobre crecimiento y cloro en sudor repetidamente elevado en rango diagnóstico.",
      "prompt": "¿Qué trastorno explica mejor el conjunto?",
      "options": [
        "Fibrosis quística",
        "Discinesia ciliar primaria aislada",
        "Celiaquía aislada",
        "Asma alérgica aislada"
      ],
      "correct": 0,
      "why": "La alteración de CFTR afecta secreciones y puede causar insuficiencia pancreática exocrina.",
      "others": "Las demás entidades no explican bien simultáneamente la alteración del sudor, malabsorción y clínica pulmonar.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 11 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB033",
      "section": "Genética",
      "type": "caso",
      "skill": "Complicaciones",
      "stem": "Recién nacido con trisomía 21 confirmada y sin soplo evidente.",
      "prompt": "¿Qué evaluación estructural es importante aun sin soplo?",
      "options": [
        "Ecocardiograma",
        "Biopsia muscular rutinaria",
        "Tomografía cerebral rutinaria",
        "Colonoscopia rutinaria"
      ],
      "correct": 0,
      "why": "Las cardiopatías congénitas pueden pasar inadvertidas a la auscultación y se recomienda valoración ecocardiográfica.",
      "others": "Los demás estudios no son evaluación estructural rutinaria indicada por este contexto.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 11 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB034",
      "section": "Ortopedia",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué defecto molecular se encuentra con frecuencia en osteogénesis imperfecta clásica?",
      "options": [
        "Alteraciones del colágeno tipo I",
        "Alteraciones de distrofina",
        "Alteraciones de CFTR",
        "Alteraciones de hemoglobina beta"
      ],
      "correct": 0,
      "why": "El colágeno tipo I aporta resistencia a hueso y otros tejidos.",
      "others": "Distrofina, CFTR y hemoglobina beta corresponden a otros trastornos.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 12 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB035",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Niño de siete años con cojera atraumática de semanas, dolor referido a rodilla y limitación de abducción y rotación interna de cadera.",
      "prompt": "¿Qué diagnóstico debe considerarse especialmente?",
      "options": [
        "Enfermedad de Legg-Calvé-Perthes",
        "Osgood-Schlatter aislado",
        "Esguince de tobillo",
        "Escoliosis idiopática"
      ],
      "correct": 0,
      "why": "La edad y limitación de cadera con dolor referido apoyan Perthes; se requiere imagen de cadera.",
      "others": "Las otras opciones no explican la limitación articular de cadera.",
      "caseId": null,
      "critical": true,
      "reference": "Guía CMCP, sección 12 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB036",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Escolar febril con dolor intenso de cadera, incapacidad para apoyar y movilidad pasiva muy dolorosa.",
      "prompt": "¿Qué conducta es prioritaria ante sospecha de artritis séptica?",
      "options": [
        "Evaluación urgente, cultivos y coordinación de drenaje y antibióticos",
        "Fisioterapia ambulatoria sin estudios",
        "Infiltración esteroidea antes de excluir infección",
        "Reposo domiciliario hasta que ceda"
      ],
      "correct": 0,
      "why": "La artritis séptica amenaza la articulación y requiere diagnóstico y tratamiento urgentes.",
      "others": "Fisioterapia, esteroides o demora sin excluir infección son inadecuados.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 12 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB037",
      "section": "Neurología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué patrón electroencefalográfico clásico se asocia con ausencias típicas infantiles?",
      "options": [
        "Complejos punta-onda generalizados alrededor de 3 Hz",
        "Hipsarritmia",
        "Descargas focales temporales exclusivas",
        "Silencio eléctrico persistente"
      ],
      "correct": 0,
      "why": "La punta-onda generalizada de aproximadamente 3 Hz es característica de ausencias típicas.",
      "others": "Hipsarritmia orienta a espasmos infantiles; descargas focales a epilepsia focal.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 13 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB038",
      "section": "Neurología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Lactante de seis meses con salvas de flexión breve al despertar y pérdida de habilidades adquiridas.",
      "prompt": "¿Qué síndrome debe evaluarse urgentemente?",
      "options": [
        "Síndrome de espasmos epilépticos infantiles",
        "Mioclonías benignas del sueño neonatal",
        "Síncope vasovagal recurrente",
        "Tics motores simples"
      ],
      "correct": 0,
      "why": "Las salvas de espasmos y regresión requieren EEG y evaluación especializada urgente.",
      "others": "Los otros trastornos no explican bien regresión y agrupación típica.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 13 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB039",
      "section": "Neurología",
      "type": "visual",
      "skill": "Interpretación",
      "stem": "Exploración simulada: debilidad ascendente simétrica, arreflexia, sensibilidad relativamente conservada tras infección respiratoria.",
      "prompt": "¿Qué complicación se debe vigilar de forma prioritaria?",
      "options": [
        "Insuficiencia ventilatoria y disautonomía",
        "Retinopatía diabética",
        "Hernia inguinal",
        "Hipertensión intracraneal como única complicación"
      ],
      "correct": 0,
      "why": "El patrón sugiere Guillain-Barré; la debilidad respiratoria y disautonomía pueden evolucionar rápidamente.",
      "others": "Las demás opciones no son complicaciones características de este síndrome.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 13 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB040",
      "section": "Inmuno-reumatología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué tipo de inmunodeficiencia sugiere un defecto de la NADPH oxidasa fagocítica?",
      "options": [
        "Enfermedad granulomatosa crónica",
        "Agammaglobulinemia ligada a X",
        "Deficiencia selectiva de IgA",
        "Deficiencia de C1 inhibidor"
      ],
      "correct": 0,
      "why": "La NADPH oxidasa participa en el estallido respiratorio de fagocitos.",
      "others": "Las otras entidades afectan linfocitos B, IgA o complemento respectivamente.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 14 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB041",
      "section": "Inmuno-reumatología",
      "type": "caso",
      "skill": "Complicaciones",
      "stem": "Niño con fiebre prolongada, conjuntivitis bilateral no purulenta, cambios orales, exantema y edema de manos.",
      "prompt": "¿Qué complicación debe buscarse con evaluación cardiológica?",
      "options": [
        "Aneurismas de arterias coronarias",
        "Estenosis hipertrófica de píloro",
        "Retinoblastoma",
        "Acidosis tubular proximal obligatoria"
      ],
      "correct": 0,
      "why": "El fenotipo sugiere Kawasaki, con riesgo de lesión coronaria.",
      "others": "Las otras opciones no son complicaciones típicas de Kawasaki.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 14 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB042",
      "section": "Inmuno-reumatología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Niña con debilidad proximal progresiva, pápulas sobre articulaciones de dedos y eritema violáceo periorbitario.",
      "prompt": "¿Cuál es el diagnóstico más probable?",
      "options": [
        "Dermatomiositis juvenil",
        "Artritis idiopática juvenil oligoarticular aislada",
        "Distrofia de Duchenne típica",
        "Urticaria aguda"
      ],
      "correct": 0,
      "why": "Pápulas de Gottron, heliotropo y debilidad proximal orientan a dermatomiositis juvenil.",
      "others": "Las demás no explican el patrón cutáneo-muscular característico.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 14 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB043",
      "section": "Oftalmología",
      "type": "directa",
      "skill": "Fisiopatología",
      "stem": "",
      "prompt": "¿Qué mecanismo explica el riesgo de ambliopía por catarata congénita unilateral?",
      "options": [
        "Privación de estímulo visual durante el período sensible",
        "Degeneración retiniana hereditaria obligatoria",
        "Hipertensión intracraneal primaria",
        "Neuritis óptica autoinmune inevitable"
      ],
      "correct": 0,
      "why": "La falta de imagen adecuada durante el desarrollo altera la maduración cortical visual.",
      "others": "Los otros mecanismos no son la causa de ambliopía por deprivación.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 15 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB044",
      "section": "Oftalmología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Lactante con leucocoria unilateral persistente identificada en fotografías y exploración.",
      "prompt": "¿Qué diagnóstico potencialmente letal debe excluirse de manera urgente?",
      "options": [
        "Retinoblastoma",
        "Conjuntivitis alérgica",
        "Orzuelo",
        "Blefaritis simple"
      ],
      "correct": 0,
      "why": "La leucocoria tiene varias causas; el retinoblastoma es una prioridad diagnóstica.",
      "others": "Las afecciones superficiales propuestas no explican leucocoria verdadera.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 15 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB045",
      "section": "Oftalmología",
      "type": "caso",
      "skill": "Tratamiento",
      "stem": "Preescolar con estrabismo constante y preferencia de fijación por un ojo.",
      "prompt": "¿Cuál es el objetivo de la referencia oftalmológica temprana?",
      "options": [
        "Detectar y tratar ambliopía y causas del estrabismo",
        "Esperar hasta completar la maduración visual",
        "Prescribir antibióticos empíricos",
        "Ocluir ambos ojos de forma permanente"
      ],
      "correct": 0,
      "why": "La intervención durante el período sensible puede preservar el desarrollo visual.",
      "others": "Esperar reduce oportunidades; antibióticos y oclusión bilateral permanente no son manejo apropiado.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 15 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB046",
      "section": "Otorrinolaringología",
      "type": "directa",
      "skill": "Diagnóstico",
      "stem": "",
      "prompt": "¿Qué hallazgo otoscópico apoya más otitis media aguda que eritema aislado?",
      "options": [
        "Abombamiento de la membrana timpánica",
        "Conducto externo normal",
        "Cerumen escaso",
        "Membrana translúcida y móvil"
      ],
      "correct": 0,
      "why": "El abombamiento es un hallazgo discriminante de derrame inflamatorio agudo en el contexto clínico.",
      "others": "El eritema aislado es inespecífico; los otros hallazgos no apoyan OMA.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 16 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB047",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Diagnóstico",
      "stem": "Preescolar con tos perruna, disfonía y estridor inspiratorio tras pródromo catarral.",
      "prompt": "¿Qué diagnóstico es más probable?",
      "options": [
        "Laringotraqueítis viral",
        "Asma aislada",
        "Bronquiolitis distal aislada",
        "Otitis media aguda"
      ],
      "correct": 0,
      "why": "La clínica de obstrucción subglótica con tos perruna favorece crup.",
      "others": "Asma y bronquiolitis afectan principalmente vías inferiores; otitis no explica estridor.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 16 · referencia temática; justificación clínica pendiente de revisión independiente."
    },
    {
      "id": "PB048",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Complicaciones",
      "stem": "Niño febril con antecedente de otitis media, dolor retroauricular, eritema y desplazamiento del pabellón.",
      "prompt": "¿Qué complicación debe evaluarse urgentemente?",
      "options": [
        "Mastoiditis aguda",
        "Rinitis alérgica",
        "Tapón de cerumen",
        "Otitis externa no complicada como explicación suficiente"
      ],
      "correct": 0,
      "why": "Los signos retroauriculares y el desplazamiento auricular sugieren mastoiditis y requieren evaluación urgente.",
      "others": "Las otras entidades no explican el conjunto posotitis.",
      "caseId": null,
      "critical": false,
      "reference": "Guía CMCP, sección 16 · referencia temática; justificación clínica pendiente de revisión independiente."
    }
  ]
});
