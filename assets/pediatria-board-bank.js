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
      "reference": "Guía CMCP, sección 1 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 1 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 1 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 2 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 2 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 2 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 3 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 3 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 3 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 4 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 4 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 4 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 5 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 5 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 5 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 6 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 6 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 6 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 7 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 7 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 7 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 8 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 8 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 8 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 9 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 9 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 9 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 10 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 10 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 10 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 11 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 11 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 11 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 12 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 12 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 12 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 13 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 13 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 13 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 14 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 14 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 14 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 15 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 15 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 15 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 16 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 16 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
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
      "reference": "Guía CMCP, sección 16 · referencia temática; justificación clínica pendiente de revisión independiente.",
      "level": "fundamentos",
      "reviewStatus": "referencia temática; revisión clínica independiente pendiente"
    },
    {
      "id": "PB049",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hiperbilirrubinemia",
      "stem": "RN de 37 semanas, 51 h de vida, hemólisis isoimmune confirmada por DAT positivo. Bilirrubina sérica total 19.4 mg/dL pese a fototerapia intensiva. El nomograma AAP correspondiente a su edad y factores de riesgo establece un umbral de exanguinotransfusión de 21 mg/dL. Está despierto y sin signos de encefalopatía.",
      "prompt": "Según AAP 2022, ¿cuál es la conducta más apropiada en este momento?",
      "options": [
        "Mantener fototerapia en alojamiento conjunto y repetir bilirrubina en 12 h",
        "Escalar a atención intensiva neonatal, continuar fototerapia intensiva y preparar eventual exanguinotransfusión",
        "Realizar exanguinotransfusión de inmediato solo por superar el umbral de escalamiento",
        "Administrar inmunoglobulina IV y suspender fototerapia mientras se evalúa respuesta"
      ],
      "correct": 1,
      "why": "El umbral de escalamiento es 2 mg/dL por debajo del umbral de recambio. Se requiere manejo intensivo y vigilancia estrecha, aun sin signos neurológicos.",
      "others": "La cifra está a 1.6 mg/dL del umbral de recambio; el control diferido no es apropiado. El umbral de escalamiento no es idéntico al de recambio; sin encefalopatía ni cifra en el umbral de recambio, no basta este dato para indicar recambio inmediato. La inmunoglobulina puede considerarse en hemólisis isoimmune seleccionada, pero nunca sustituye el escalamiento ni la fototerapia intensiva.",
      "rationales": [
        "La cifra está a 1.6 mg/dL del umbral de recambio; el control diferido no es apropiado.",
        "El umbral de escalamiento es 2 mg/dL por debajo del umbral de recambio. Se requiere manejo intensivo y vigilancia estrecha, aun sin signos neurológicos.",
        "El umbral de escalamiento no es idéntico al de recambio; sin encefalopatía ni cifra en el umbral de recambio, no basta este dato para indicar recambio inmediato.",
        "La inmunoglobulina puede considerarse en hemólisis isoimmune seleccionada, pero nunca sustituye el escalamiento ni la fototerapia intensiva."
      ],
      "source": {
        "title": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-058859",
        "locator": "KAS 17–23"
      },
      "reference": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks (2022), KAS 17–23",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB050",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Hiperbilirrubinemia",
      "stem": "RN de 38 semanas con DAT positivo que inició fototerapia durante la hospitalización de nacimiento a las 30 h. A las 68 h cumple criterios de suspensión de fototerapia. Come bien y está clínicamente estable.",
      "prompt": "Según AAP 2022, ¿qué vigilancia de rebote es preferible?",
      "options": [
        "Bilirrubina sérica únicamente a las 48–72 h",
        "Control clínico en 24 h sin bilirrubina si no se observa ictericia",
        "Bilirrubina sérica a las 6–12 h y repetir al día siguiente",
        "Bilirrubina transcutánea inmediatamente al retirar la fototerapia, sin controles posteriores"
      ],
      "correct": 2,
      "why": "DAT positivo e inicio antes de 48 h identifican al RN para control sérico precoz y un segundo control al día siguiente.",
      "others": "La hemólisis y el inicio precoz de fototerapia confieren riesgo de rebote; esperar 48–72 h omite el control temprano. La inspección clínica no sustituye el control sérico recomendado en este grupo. La medición transcutánea inmediatamente después de fototerapia puede subestimar la cifra; no sustituye el seguimiento indicado.",
      "rationales": [
        "La hemólisis y el inicio precoz de fototerapia confieren riesgo de rebote; esperar 48–72 h omite el control temprano.",
        "La inspección clínica no sustituye el control sérico recomendado en este grupo.",
        "DAT positivo e inicio antes de 48 h identifican al RN para control sérico precoz y un segundo control al día siguiente.",
        "La medición transcutánea inmediatamente después de fototerapia puede subestimar la cifra; no sustituye el seguimiento indicado."
      ],
      "source": {
        "title": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-058859",
        "locator": "KAS 16"
      },
      "reference": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks (2022), KAS 16",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB051",
      "section": "Urgencias y terapia intensiva",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Cetoacidosis diabética",
      "stem": "Adolescente de 12 años, debut de diabetes tipo 1, glucosa 468 mg/dL, pH venoso 7.09, bicarbonato 8 mmol/L, cetonemia 5.4 mmol/L, K 4.5 mmol/L. Tras iniciar cristaloide isotónico, lleva 20 min de hidratación, perfusión en mejoría, diuresis presente.",
      "prompt": "Conforme a ISPAD 2022, ¿cuál es la estrategia de insulinoterapia inicial?",
      "options": [
        "Bolo IV de insulina y después infusión continua inmediata",
        "Infusión IV de insulina sin bolo desde el momento de canalización",
        "Insulina subcutánea basal como única estrategia durante la acidosis grave",
        "Infusión IV de insulina sin bolo, después de al menos 1 h de iniciada la hidratación"
      ],
      "correct": 3,
      "why": "La insulina IV continua se inicia una vez transcurrida al menos una hora de líquidos, sin bolo; se ajusta según gravedad y protocolo.",
      "others": "El bolo inicial no es recomendado y puede agravar los cambios osmóticos y del potasio. El consenso establece un intervalo de al menos una hora desde el inicio de líquidos, aun si mejora la perfusión. La cetoacidosis grave requiere insulinoterapia apropiada y monitorizada; la basal aislada no corrige adecuadamente la cetogénesis.",
      "rationales": [
        "El bolo inicial no es recomendado y puede agravar los cambios osmóticos y del potasio.",
        "El consenso establece un intervalo de al menos una hora desde el inicio de líquidos, aun si mejora la perfusión.",
        "La cetoacidosis grave requiere insulinoterapia apropiada y monitorizada; la basal aislada no corrige adecuadamente la cetogénesis.",
        "La insulina IV continua se inicia una vez transcurrida al menos una hora de líquidos, sin bolo; se ajusta según gravedad y protocolo."
      ],
      "source": {
        "title": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state",
        "year": 2022,
        "url": "https://doi.org/10.1111/pedi.13406",
        "locator": "Apartados de tratamiento con líquidos e insulina"
      },
      "reference": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state (2022), Apartados de tratamiento con líquidos e insulina",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB052",
      "section": "Urgencias y terapia intensiva",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Cetoacidosis diabética",
      "stem": "Niña de 9 años con cetoacidosis moderada, pH 7.17, glucosa 390 mg/dL y K 2.8 mmol/L antes de insulina. ECG con ondas U, función renal conservada y diuresis comprobada. Ya inició hidratación y cuenta con monitorización continua.",
      "prompt": "¿Qué modificación del manejo reduce el riesgo inmediato de arritmia?",
      "options": [
        "Diferir insulina y corregir potasio con monitorización antes de iniciarla",
        "Iniciar insulina a la mitad de la dosis y diferir potasio hasta glucosa <250 mg/dL",
        "Iniciar insulina y reponer potasio solo si aparece una arritmia sostenida",
        "Administrar bicarbonato para normalizar pH y empezar insulina simultáneamente"
      ],
      "correct": 0,
      "why": "La hipopotasemia marcada requiere reponer potasio antes de insulina; esta desplaza K al interior celular y puede precipitar arritmias.",
      "others": "Reducir la dosis no elimina el riesgo de empeorar una hipopotasemia significativa. Esperar una arritmia expone a un evento potencialmente fatal y retrasa la corrección del déficit. El bicarbonato no está indicado de rutina y puede agravar el descenso de potasio.",
      "rationales": [
        "La hipopotasemia marcada requiere reponer potasio antes de insulina; esta desplaza K al interior celular y puede precipitar arritmias.",
        "Reducir la dosis no elimina el riesgo de empeorar una hipopotasemia significativa.",
        "Esperar una arritmia expone a un evento potencialmente fatal y retrasa la corrección del déficit.",
        "El bicarbonato no está indicado de rutina y puede agravar el descenso de potasio."
      ],
      "source": {
        "title": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state",
        "year": 2022,
        "url": "https://doi.org/10.1111/pedi.13406",
        "locator": "Apartado de reposición de potasio"
      },
      "reference": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state (2022), Apartado de reposición de potasio",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB053",
      "section": "Infectología y vacunología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Infecciones bacterianas en lactantes pequeños",
      "stem": "Lactante de 17 días, nacido a término, previamente sano, temperatura rectal 38.3 °C en casa, exploración sin foco, buen estado general. No recibió antibióticos y no tiene datos clínicos que sugieran infección por herpes.",
      "prompt": "Según el algoritmo AAP 2021 para lactantes febriles de 8–21 días, ¿cuál es la estrategia inicial?",
      "options": [
        "Uroanálisis y cultivo si positivo; alta sin antimicrobianos si el resultado es normal",
        "Hemocultivo y marcadores inflamatorios; omitir LCR si la procalcitonina es baja",
        "Evaluación de orina, sangre y LCR según protocolo, antimicrobianos parenterales y vigilancia hospitalaria",
        "Obtener hemocultivo y observar en domicilio hasta disponer del resultado"
      ],
      "correct": 2,
      "why": "La edad de 17 días sitúa al paciente en el grupo para estudio de infección bacteriana invasiva, tratamiento parenteral y observación hospitalaria.",
      "others": "La corta edad impide utilizar un uroanálisis normal como criterio único de bajo riesgo. En esta franja de edad los marcadores no reemplazan la evaluación del LCR. La bacteriemia y meningitis pueden presentarse con buen aspecto; la observación domiciliaria aislada no es el esquema recomendado.",
      "rationales": [
        "La corta edad impide utilizar un uroanálisis normal como criterio único de bajo riesgo.",
        "En esta franja de edad los marcadores no reemplazan la evaluación del LCR.",
        "La edad de 17 días sitúa al paciente en el grupo para estudio de infección bacteriana invasiva, tratamiento parenteral y observación hospitalaria.",
        "La bacteriemia y meningitis pueden presentarse con buen aspecto; la observación domiciliaria aislada no es el esquema recomendado."
      ],
      "source": {
        "title": "AAP. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old",
        "year": 2021,
        "url": "https://doi.org/10.1542/peds.2021-052228",
        "locator": "Algoritmo 8–21 días; KAS 1–7"
      },
      "reference": "AAP. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old (2021), Algoritmo 8–21 días; KAS 1–7",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB054",
      "section": "Infectología y vacunología",
      "type": "caso",
      "skill": "Interpretación",
      "topic": "Infecciones bacterianas en lactantes pequeños",
      "stem": "Lactante de 45 días, término, previamente sano, fiebre rectal de 38.2 °C, buen aspecto, sin foco clínico ni bronquiolitis. Uroanálisis negativo, procalcitonina 0.12 ng/mL y neutrófilos absolutos 2600/mm³. Hemocultivo obtenido. Familia con teléfono, transporte y reevaluación garantizada en 24 h.",
      "prompt": "Según AAP 2021, ¿qué conducta es razonable?",
      "options": [
        "Punción lumbar obligatoria y antibiótico IV hasta negatividad de cultivos",
        "Manejo ambulatorio sin antibiótico empírico ni punción lumbar, con vigilancia y reevaluación acordadas",
        "Antibiótico oral empírico por 10 días pese a uroanálisis negativo",
        "Hospitalización y repetir marcadores a las 48 h como requisito universal"
      ],
      "correct": 1,
      "why": "El algoritmo permite manejo ambulatorio de lactantes seleccionados de 29–60 días con criterios de bajo riesgo y seguimiento fiable.",
      "others": "Con uroanálisis y marcadores normales, en esta franja de edad no es obligatoria la punción lumbar ni la antibioterapia parenteral. No se ha documentado indicación de antibiótico oral y el uroanálisis es negativo. La hospitalización puede ser necesaria por otras razones, pero no es universal si cumple los criterios de seguimiento seguro.",
      "rationales": [
        "Con uroanálisis y marcadores normales, en esta franja de edad no es obligatoria la punción lumbar ni la antibioterapia parenteral.",
        "El algoritmo permite manejo ambulatorio de lactantes seleccionados de 29–60 días con criterios de bajo riesgo y seguimiento fiable.",
        "No se ha documentado indicación de antibiótico oral y el uroanálisis es negativo.",
        "La hospitalización puede ser necesaria por otras razones, pero no es universal si cumple los criterios de seguimiento seguro."
      ],
      "source": {
        "title": "AAP. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old",
        "year": 2021,
        "url": "https://doi.org/10.1542/peds.2021-052228",
        "locator": "Algoritmo 29–60 días; KAS 15–20"
      },
      "reference": "AAP. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old (2021), Algoritmo 29–60 días; KAS 15–20",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB055",
      "section": "Gastroenterología y nutrición",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Síndrome colestásico",
      "stem": "Lactante de 24 días, término, alimentado al seno materno y con adecuada ganancia ponderal. Persiste tinte escleral amarillo; la madre muestra heces color crema muy pálidas. No se ha medido bilirrubina directa desde el nacimiento.",
      "prompt": "¿Cuál es la siguiente prueba más útil para decidir referencia por posible colestasis?",
      "options": [
        "Bilirrubina transcutánea y reevaluación en dos semanas",
        "Prueba de Coombs directa como único estudio inicial",
        "Aminotransferasas sin fraccionamiento de bilirrubina",
        "Bilirrubina sérica total y directa o conjugada"
      ],
      "correct": 3,
      "why": "La ictericia persistente y heces pálidas entre las 2–4 semanas indican medir bilirrubina directa/conjugada para identificar colestasis.",
      "others": "La medición transcutánea no distingue fracciones y la espera puede retrasar el diagnóstico de atresia biliar. El Coombs estudia hemólisis, pero no permite establecer colestasis. Las aminotransferasas pueden integrar el estudio posterior, pero no sustituyen la medición de bilirrubina directa o conjugada.",
      "rationales": [
        "La medición transcutánea no distingue fracciones y la espera puede retrasar el diagnóstico de atresia biliar.",
        "El Coombs estudia hemólisis, pero no permite establecer colestasis.",
        "Las aminotransferasas pueden integrar el estudio posterior, pero no sustituyen la medición de bilirrubina directa o conjugada.",
        "La ictericia persistente y heces pálidas entre las 2–4 semanas indican medir bilirrubina directa/conjugada para identificar colestasis."
      ],
      "source": {
        "title": "AAP. Identifying Infants With Biliary Atresia by 2–4 Weeks of Life",
        "year": 2025,
        "url": "https://doi.org/10.1542/peds.2024-070077",
        "locator": "Estrategia de detección entre 2 y 4 semanas"
      },
      "reference": "AAP. Identifying Infants With Biliary Atresia by 2–4 Weeks of Life (2025), Estrategia de detección entre 2 y 4 semanas",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB056",
      "section": "Gastroenterología y nutrición",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Síndrome colestásico",
      "stem": "Lactante de 25 días con ictericia persistente; bilirrubina total 8.0 mg/dL, directa 1.3 mg/dL. Buen estado general y sin fiebre. Las heces conservan algo de pigmentación.",
      "prompt": "Según el informe AAP 2025, ¿qué conducta es prioritaria?",
      "options": [
        "Consultar de forma urgente a gastroenterología pediátrica por posible colestasis",
        "Repetir bilirrubina al cumplir dos meses porque la fracción directa es <20% del total",
        "Suspender lactancia materna durante 48 h y reevaluar",
        "Solicitar únicamente ultrasonido y cerrar el estudio si la vesícula se visualiza"
      ],
      "correct": 0,
      "why": "A las 2–4 semanas una directa/conjugada de al menos 1 mg/dL amerita consulta urgente; el pigmento en heces no excluye atresia biliar.",
      "others": "La razón directa/total no debe emplearse para descartar colestasis cuando la cifra absoluta cumple el criterio de referencia. La ictericia asociada a leche materna suele ser no conjugada; suspender la lactancia no resuelve el riesgo de colestasis. La visualización de la vesícula no excluye atresia biliar; el estudio no debe retrasar la referencia.",
      "rationales": [
        "A las 2–4 semanas una directa/conjugada de al menos 1 mg/dL amerita consulta urgente; el pigmento en heces no excluye atresia biliar.",
        "La razón directa/total no debe emplearse para descartar colestasis cuando la cifra absoluta cumple el criterio de referencia.",
        "La ictericia asociada a leche materna suele ser no conjugada; suspender la lactancia no resuelve el riesgo de colestasis.",
        "La visualización de la vesícula no excluye atresia biliar; el estudio no debe retrasar la referencia."
      ],
      "source": {
        "title": "AAP. Identifying Infants With Biliary Atresia by 2–4 Weeks of Life",
        "year": 2025,
        "url": "https://doi.org/10.1542/peds.2024-070077",
        "locator": "Interpretación de bilirrubina directa/conjugada a las 2–4 semanas"
      },
      "reference": "AAP. Identifying Infants With Biliary Atresia by 2–4 Weeks of Life (2025), Interpretación de bilirrubina directa/conjugada a las 2–4 semanas",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB057",
      "section": "Nefro-urología",
      "type": "caso",
      "skill": "Interpretación",
      "topic": "Síndrome nefrótico",
      "stem": "Niño de 5 años con primer episodio de síndrome nefrótico idiopático, tratado con prednisona diaria a dosis estándar y adherencia corroborada. Al terminar la cuarta semana persiste proteinuria intensa sin remisión parcial. No hay infección intercurrente ni otra causa identificada.",
      "prompt": "Según KDIGO 2025, ¿cómo se clasifica la respuesta?",
      "options": [
        "Síndrome nefrótico corticodependiente",
        "Síndrome nefrótico corticorresistente",
        "Síndrome nefrótico con recaídas frecuentes",
        "Síndrome nefrótico corticosensible de respuesta tardía"
      ],
      "correct": 1,
      "why": "No alcanzar remisión completa a las cuatro semanas, sin siquiera respuesta parcial, corresponde a corticorresistencia y requiere estudio especializado.",
      "others": "La dependencia exige recaídas relacionadas con el tratamiento o su suspensión; aquí nunca hubo remisión. Las recaídas requieren remisión previa; no se describe ninguna. La respuesta tardía supone remisión completa entre las semanas 4 y 6 en el contexto de respuesta parcial previa; no se ha documentado.",
      "rationales": [
        "La dependencia exige recaídas relacionadas con el tratamiento o su suspensión; aquí nunca hubo remisión.",
        "No alcanzar remisión completa a las cuatro semanas, sin siquiera respuesta parcial, corresponde a corticorresistencia y requiere estudio especializado.",
        "Las recaídas requieren remisión previa; no se describe ninguna.",
        "La respuesta tardía supone remisión completa entre las semanas 4 y 6 en el contexto de respuesta parcial previa; no se ha documentado."
      ],
      "source": {
        "title": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children",
        "year": 2025,
        "url": "https://kdigo.org/wp-content/uploads/2025/04/KDIGO-2025-Guideline-for-Nephrotic-Syndrome-in-Children.pdf",
        "locator": "Figura 1; definiciones"
      },
      "reference": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children (2025), Figura 1; definiciones",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB058",
      "section": "Nefro-urología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Síndrome nefrótico",
      "stem": "Niña de 7 años, síndrome nefrótico corticosensible, dos recaídas consecutivas durante la reducción de prednisolona a pesar de adherencia adecuada. Tiene toxicidad glucocorticoide importante. Actualmente está en remisión.",
      "prompt": "Según KDIGO 2025, ¿qué estrategia de prevención de recaídas corresponde discutir con nefrología?",
      "options": [
        "Prolongar indefinidamente prednisolona a dosis altas como único tratamiento",
        "Suspender inmunosupresión y vigilar sin estrategia preventiva",
        "Seleccionar un fármaco ahorrador de glucocorticoides según perfil clínico y preferencias",
        "Administrar pulsos mensuales de metilprednisolona de forma rutinaria sin evaluar alternativas"
      ],
      "correct": 2,
      "why": "KDIGO recomienda ahorradores de glucocorticoides en corticodependencia y en recaídas frecuentes con toxicidad grave; la elección se individualiza.",
      "others": "La corticodependencia y toxicidad favorecen reducir la exposición acumulada, no prolongar dosis altas como única estrategia. Sin prevención, la corticodependencia mantiene riesgo de recaídas; la guía recomienda una estrategia ahorradora. Los pulsos rutinarios no constituyen la recomendación preventiva para esta situación.",
      "rationales": [
        "La corticodependencia y toxicidad favorecen reducir la exposición acumulada, no prolongar dosis altas como única estrategia.",
        "Sin prevención, la corticodependencia mantiene riesgo de recaídas; la guía recomienda una estrategia ahorradora.",
        "KDIGO recomienda ahorradores de glucocorticoides en corticodependencia y en recaídas frecuentes con toxicidad grave; la elección se individualiza.",
        "Los pulsos rutinarios no constituyen la recomendación preventiva para esta situación."
      ],
      "source": {
        "title": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children",
        "year": 2025,
        "url": "https://kdigo.org/wp-content/uploads/2025/04/KDIGO-2025-Guideline-for-Nephrotic-Syndrome-in-Children.pdf",
        "locator": "Recomendación 1.3.3.1"
      },
      "reference": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children (2025), Recomendación 1.3.3.1",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB059",
      "section": "Inmuno-reumatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Enfermedad de Kawasaki",
      "stem": "Lactante de 4 meses con enfermedad de Kawasaki confirmada por equipo tratante. Ecocardiograma inicial: Z de coronaria derecha +3.1; no presenta choque. Se planea inmunoglobulina IV.",
      "prompt": "Según la actualización AHA 2024, ¿qué estrategia antiinflamatoria inicial debe considerarse especialmente?",
      "options": [
        "Inmunoglobulina IV y ácido acetilsalicílico, sin considerar intensificación por la edad",
        "Inmunoglobulina IV con tratamiento antiinflamatorio intensificado por alto riesgo, además del manejo antiagregante indicado",
        "Corticoide como sustituto sistemático de inmunoglobulina IV",
        "Diferir tratamiento antiinflamatorio hasta confirmar persistencia del aneurisma"
      ],
      "correct": 1,
      "why": "Edad inferior a seis meses y Z coronario ≥2.5 son factores de alto riesgo; la actualización apoya considerar tratamiento dual inicial.",
      "others": "El esquema estándar es importante, pero la edad y la lesión coronaria identifican un perfil de alto riesgo que amerita considerar intensificación. La intensificación se añade a la inmunoglobulina, no se sustituye sistemáticamente. El retraso favorece daño coronario; se actúa en fase aguda.",
      "rationales": [
        "El esquema estándar es importante, pero la edad y la lesión coronaria identifican un perfil de alto riesgo que amerita considerar intensificación.",
        "Edad inferior a seis meses y Z coronario ≥2.5 son factores de alto riesgo; la actualización apoya considerar tratamiento dual inicial.",
        "La intensificación se añade a la inmunoglobulina, no se sustituye sistemáticamente.",
        "El retraso favorece daño coronario; se actúa en fase aguda."
      ],
      "source": {
        "title": "AHA. Update on Diagnosis and Management of Kawasaki Disease",
        "year": 2024,
        "url": "https://doi.org/10.1161/CIR.0000000000001295",
        "locator": "Apartado de pacientes de alto riesgo y tratamiento inicial"
      },
      "reference": "AHA. Update on Diagnosis and Management of Kawasaki Disease (2024), Apartado de pacientes de alto riesgo y tratamiento inicial",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB060",
      "section": "Inmuno-reumatología",
      "type": "caso",
      "skill": "Interpretación",
      "topic": "Enfermedad de Kawasaki",
      "stem": "Niño de 3 años tratado por Kawasaki. Ecocardiograma de seguimiento: arteria descendente anterior con Z +6.2 y diámetro absoluto de 4.5 mm. Se solicita clasificar la lesión para planificar seguimiento y tromboprofilaxis.",
      "prompt": "Conforme a la clasificación AHA, ¿qué categoría corresponde a esa arteria?",
      "options": [
        "Dilatación coronaria sin aneurisma",
        "Aneurisma pequeño",
        "Aneurisma grande o gigante",
        "Aneurisma mediano"
      ],
      "correct": 3,
      "why": "Z entre 5 y menos de 10, con diámetro absoluto menor de 8 mm, define aneurisma mediano.",
      "others": "La dilatación sin aneurisma corresponde a Z inferior a 2.5; no es el caso. El aneurisma pequeño tiene Z desde 2.5 y menor de 5. El aneurisma gigante corresponde a Z ≥10 o diámetro absoluto ≥8 mm; ninguno se cumple.",
      "rationales": [
        "La dilatación sin aneurisma corresponde a Z inferior a 2.5; no es el caso.",
        "El aneurisma pequeño tiene Z desde 2.5 y menor de 5.",
        "El aneurisma gigante corresponde a Z ≥10 o diámetro absoluto ≥8 mm; ninguno se cumple.",
        "Z entre 5 y menos de 10, con diámetro absoluto menor de 8 mm, define aneurisma mediano."
      ],
      "source": {
        "title": "AHA. Update on Diagnosis and Management of Kawasaki Disease",
        "year": 2024,
        "url": "https://doi.org/10.1161/CIR.0000000000001295",
        "locator": "Tabla de clasificación de aneurismas por Z y diámetro"
      },
      "reference": "AHA. Update on Diagnosis and Management of Kawasaki Disease (2024), Tabla de clasificación de aneurismas por Z y diámetro",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografia-revisada; revisión clínica independiente pendiente"
    },
    {
      "id": "PB061",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Neutropenia febril",
      "stem": "Niño de 8 años en quimioterapia de mantenimiento por leucemia linfoblástica aguda. Presentó neutropenia febril clasificada de bajo riesgo con una regla institucional validada. Recibió cefepima, lleva 30 horas afebril, está clínicamente bien, hemocultivos negativos a las 48 horas y sin foco documentado. Neutrófilos absolutos: 180/mm³, sin recuperación medular. Seguimiento estrecho garantizado por oncología.",
      "prompt": "Según la actualización internacional de 2023, ¿qué estrategia es razonable considerar?",
      "options": [
        "Mantener cefepima hasta recuperación medular, sin contemplar excepciones",
        "Considerar suspensión del antibacteriano empírico con seguimiento según protocolo",
        "Cambiar obligatoriamente a una fluoroquinolona oral hasta normalizar neutrófilos",
        "Añadir vancomicina y mantener ambos fármacos hasta negatividad de cultivos a siete días"
      ],
      "correct": 1,
      "why": "La recomendación B4 permite considerar suspensión a las 48 horas con cultivos negativos, buen estado y al menos 24 horas afebril, aun sin recuperación medular. Es condicional.",
      "others": "La recuperación medular no es requisito absoluto en pacientes seleccionados de bajo riesgo. No se exige transición a fluoroquinolona oral para cumplir B4; la decisión depende del protocolo local. No hay indicación microbiológica o clínica para ampliar cobertura en este escenario.",
      "rationales": [
        "La recuperación medular no es requisito absoluto en pacientes seleccionados de bajo riesgo.",
        "La recomendación B4 permite considerar suspensión a las 48 horas con cultivos negativos, buen estado y al menos 24 horas afebril, aun sin recuperación medular. Es condicional.",
        "No se exige transición a fluoroquinolona oral para cumplir B4; la decisión depende del protocolo local.",
        "No hay indicación microbiológica o clínica para ampliar cobertura en este escenario."
      ],
      "source": {
        "title": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update",
        "year": 2023,
        "url": "https://doi.org/10.1200/JCO.22.02224",
        "locator": "B4, suspensión temprana en bajo riesgo"
      },
      "reference": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update (2023), B4, suspensión temprana en bajo riesgo",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB062",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Neutropenia febril",
      "stem": "Escolar con leucemia mieloide aguda en inducción, neutropenia de alto riesgo. Lleva 36 horas de cefepima empírica. Persiste temperatura de 38.3 °C, sin foco, hemocultivos sin crecimiento hasta ahora, perfusión normal y sin deterioro respiratorio. No hay antecedente de colonización resistente ni nuevos datos clínicos.",
      "prompt": "De acuerdo con la guía internacional 2023, ¿qué conducta es preferible respecto a la cobertura antibacteriana?",
      "options": [
        "Cambiar a meropenem por persistencia aislada de fiebre",
        "Añadir vancomicina por el diagnóstico de leucemia mieloide aguda",
        "Mantener el esquema y reevaluar de forma estrecha; ampliar si aparecen indicaciones clínicas o microbiológicas",
        "Suspender cefepima a las 48 horas aunque continúe febril"
      ],
      "correct": 2,
      "why": "A6b recomienda no ampliar solo por fiebre persistente si hay estabilidad; deben continuar vigilancia y evaluación de focos.",
      "others": "La fiebre aislada en un paciente estable no justifica ampliar automáticamente a carbapenémico. La neoplasia por sí sola no establece una indicación de glucopéptido en este escenario. No cumple condiciones de defervescencia ni bajo riesgo para suspensión temprana.",
      "rationales": [
        "La fiebre aislada en un paciente estable no justifica ampliar automáticamente a carbapenémico.",
        "La neoplasia por sí sola no establece una indicación de glucopéptido en este escenario.",
        "A6b recomienda no ampliar solo por fiebre persistente si hay estabilidad; deben continuar vigilancia y evaluación de focos.",
        "No cumple condiciones de defervescencia ni bajo riesgo para suspensión temprana."
      ],
      "source": {
        "title": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update",
        "year": 2023,
        "url": "https://doi.org/10.1200/JCO.22.02224",
        "locator": "A6b, fiebre persistente sin inestabilidad"
      },
      "reference": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update (2023), A6b, fiebre persistente sin inestabilidad",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB063",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Neutropenia febril",
      "stem": "Adolescente de 14 años en tratamiento por linfoma con neutropenia febril de alto riesgo. Tras 48 horas de antibiótico empírico, está clínicamente bien y afebril desde hace 28 horas. Cultivos negativos, sin foco documentado. El recuento de neutrófilos sigue en ascenso y oncología confirma recuperación medular.",
      "prompt": "Según la guía internacional 2023, ¿qué conducta corresponde respecto al tratamiento antibacteriano empírico?",
      "options": [
        "Suspender el esquema con vigilancia y seguimiento del equipo tratante",
        "Prolongar necesariamente siete días desde la última fiebre",
        "Mantener antibiótico hasta que la cifra de neutrófilos alcance el rango normal del laboratorio",
        "Cambiar obligatoriamente a tratamiento oral por 10 días"
      ],
      "correct": 0,
      "why": "B3 recomienda suspensión con recuperación medular, cultivos negativos a 48 horas, estabilidad y al menos 24 horas sin fiebre.",
      "others": "No se exige una duración fija de siete días cuando se cumplen las condiciones de B3. La evidencia de recuperación medular no equivale a exigir normalización completa del recuento. No existe foco que requiera completar diez días por vía oral.",
      "rationales": [
        "B3 recomienda suspensión con recuperación medular, cultivos negativos a 48 horas, estabilidad y al menos 24 horas sin fiebre.",
        "No se exige una duración fija de siete días cuando se cumplen las condiciones de B3.",
        "La evidencia de recuperación medular no equivale a exigir normalización completa del recuento.",
        "No existe foco que requiera completar diez días por vía oral."
      ],
      "source": {
        "title": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update",
        "year": 2023,
        "url": "https://doi.org/10.1200/JCO.22.02224",
        "locator": "B3, suspensión con recuperación medular"
      },
      "reference": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update (2023), B3, suspensión con recuperación medular",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB064",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Artritis bacteriana aguda",
      "stem": "Niño de 20 meses, previamente sano, con artritis bacteriana de rodilla presunta, líquido sinovial inflamatorio y cultivos pendientes. El equipo planea tratamiento empírico tras obtener muestras; el patrón local de resistencia requiere cobertura frente a S. aureus resistente a meticilina. No hay datos de osteomielitis adyacente.",
      "prompt": "Además de S. aureus, ¿qué agente debe quedar cubierto por el esquema empírico debido a la edad, según PIDS/IDSA 2023?",
      "options": [
        "Streptococcus pneumoniae resistente a penicilina exclusivamente",
        "Pseudomonas aeruginosa",
        "Kingella kingae",
        "Salmonella enterica"
      ],
      "correct": 2,
      "why": "La recomendación V.2 sugiere actividad contra K. kingae en niños de 6 a 48 meses, además de la cobertura contra S. aureus.",
      "others": "El neumococo puede ser causal, pero no es el microorganismo adicional destacado específicamente para niños de 6–48 meses. Pseudomonas requiere factores epidemiológicos particulares, ausentes en el caso. Salmonella adquiere relevancia especial en situaciones como drepanocitosis; no se describe ese contexto.",
      "rationales": [
        "El neumococo puede ser causal, pero no es el microorganismo adicional destacado específicamente para niños de 6–48 meses.",
        "Pseudomonas requiere factores epidemiológicos particulares, ausentes en el caso.",
        "La recomendación V.2 sugiere actividad contra K. kingae en niños de 6 a 48 meses, además de la cobertura contra S. aureus.",
        "Salmonella adquiere relevancia especial en situaciones como drepanocitosis; no se describe ese contexto."
      ],
      "source": {
        "title": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics",
        "year": 2023,
        "url": "https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/",
        "locator": "V.2, cobertura empírica por edad"
      },
      "reference": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics (2023), V.2, cobertura empírica por edad",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB065",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Artritis bacteriana aguda",
      "stem": "Niña de 9 años con artritis bacteriana de cadera por S. aureus sensible a meticilina. Se realizó drenaje inicial y recibió tratamiento IV activo. A las 72 horas continúa febril, PCR aumentó de 110 a 160 mg/L y persiste dolor importante. No se realizó resonancia previamente.",
      "prompt": "Además de reevaluar control del foco, ¿qué estudio es preferible para buscar extensión no reconocida?",
      "options": [
        "Ultrasonido aislado de la articulación como único estudio de extensión ósea",
        "Resonancia magnética de la región afectada",
        "Radiografía simple de control como estudio definitivo de osteomielitis temprana",
        "Tomografía computarizada como primera elección para edema medular"
      ],
      "correct": 1,
      "why": "La respuesta deficiente a las 48–96 horas justifica considerar RM para detectar osteomielitis, abscesos o focos persistentes.",
      "others": "El ultrasonido permite evaluar derrame, pero no es la mejor modalidad para caracterizar extensión medular y muscular. La radiografía es poco sensible para osteomielitis temprana y no excluye extensión. La RM es preferida para valorar médula ósea y partes blandas.",
      "rationales": [
        "El ultrasonido permite evaluar derrame, pero no es la mejor modalidad para caracterizar extensión medular y muscular.",
        "La respuesta deficiente a las 48–96 horas justifica considerar RM para detectar osteomielitis, abscesos o focos persistentes.",
        "La radiografía es poco sensible para osteomielitis temprana y no excluye extensión.",
        "La RM es preferida para valorar médula ósea y partes blandas."
      ],
      "source": {
        "title": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics",
        "year": 2023,
        "url": "https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/",
        "locator": "VI.1 y II.3, mala respuesta y extensión"
      },
      "reference": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics (2023), VI.1 y II.3, mala respuesta y extensión",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB066",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Artritis bacteriana aguda",
      "stem": "Niño de 6 años con artritis bacteriana primaria de rodilla por S. aureus sensible a meticilina. Drenaje adecuado; RM descarta osteomielitis adyacente. A los siete días está afebril, recuperó movilidad, PCR desciende sostenidamente y tolera un antibiótico oral activo. No hay complicaciones.",
      "prompt": "Según PIDS/IDSA 2023, ¿qué duración total de tratamiento puede considerarse?",
      "options": [
        "5–7 días de tratamiento total",
        "21–28 días intravenosos necesariamente",
        "42 días de tratamiento total por tratarse de S. aureus",
        "10–14 días de tratamiento total, con transición oral apropiada"
      ],
      "correct": 3,
      "why": "XII.1 permite 10–14 días en artritis primaria por patógeno habitual, control adecuado y mejoría clínica y de PCR; XI.1 favorece transición oral.",
      "others": "La guía contempla cursos de 10–14 días en respuesta rápida, no de 5–7 días totales. No exige prolongar tratamiento intravenoso cuando hay mejoría y una opción oral activa y tolerable. La duración prolongada puede corresponder a osteomielitis u otras complicaciones, excluidas aquí.",
      "rationales": [
        "La guía contempla cursos de 10–14 días en respuesta rápida, no de 5–7 días totales.",
        "No exige prolongar tratamiento intravenoso cuando hay mejoría y una opción oral activa y tolerable.",
        "La duración prolongada puede corresponder a osteomielitis u otras complicaciones, excluidas aquí.",
        "XII.1 permite 10–14 días en artritis primaria por patógeno habitual, control adecuado y mejoría clínica y de PCR; XI.1 favorece transición oral."
      ],
      "source": {
        "title": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics",
        "year": 2023,
        "url": "https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/",
        "locator": "XI.1 y XII.1, vía y duración"
      },
      "reference": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics (2023), XI.1 y XII.1, vía y duración",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB067",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Bronquiolitis",
      "stem": "Lactante de 4 semanas, nacido a término, con primer cuadro de bronquiolitis. En observación hospitalaria, saturación persistente de 91% en aire ambiente, señal confiable y mediciones repetidas en calma. Toma 85% de sus alimentos habituales, sin apneas ni agotamiento. Sin comorbilidades.",
      "prompt": "Según NICE NG9 actualizado en 2021, ¿qué decisión respecto al oxígeno corresponde?",
      "options": [
        "Iniciar oxígeno suplementario y reevaluar respuesta",
        "No iniciar oxígeno mientras la saturación sea de al menos 90%, sin considerar edad",
        "Iniciar CPAP por la cifra de saturación, independientemente del trabajo respiratorio",
        "Esperar a que aparezca apnea antes de iniciar soporte"
      ],
      "correct": 0,
      "why": "En menores de seis semanas, la guía establece un umbral de saturación persistente inferior a 92% para administrar oxígeno.",
      "others": "El umbral inferior a 90% corresponde a niños de seis semanas o mayores sin condiciones subyacentes. CPAP se considera ante insuficiencia respiratoria inminente; no se indica automáticamente por esta cifra. La hipoxemia persistente por debajo del umbral etario requiere atención antes de una apnea.",
      "rationales": [
        "En menores de seis semanas, la guía establece un umbral de saturación persistente inferior a 92% para administrar oxígeno.",
        "El umbral inferior a 90% corresponde a niños de seis semanas o mayores sin condiciones subyacentes.",
        "CPAP se considera ante insuficiencia respiratoria inminente; no se indica automáticamente por esta cifra.",
        "La hipoxemia persistente por debajo del umbral etario requiere atención antes de una apnea."
      ],
      "source": {
        "title": "NICE NG9. Bronchiolitis in children: diagnosis and management (oxygen thresholds updated 2021)",
        "year": 2021,
        "url": "https://www.nice.org.uk/guidance/ng9/chapter/Recommendations",
        "locator": "Recomendaciones de suplementación de oxígeno"
      },
      "reference": "NICE NG9. Bronchiolitis in children: diagnosis and management (oxygen thresholds updated 2021) (2021), Recomendaciones de suplementación de oxígeno",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB068",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Bronquiolitis",
      "stem": "Lactante de 4 meses, sin enfermedades subyacentes, hospitalizado por bronquiolitis. Tras retirar oxígeno está estable y se alimenta adecuadamente. Durante cinco horas continuas en aire ambiente, incluido un período de sueño, mantiene saturaciones de 91–93%. Cuidadores entrenados, acceso a transporte y seguimiento.",
      "prompt": "Según NICE NG9, ¿qué conclusión es más adecuada respecto al egreso?",
      "options": [
        "Debe permanecer ingresado hasta mantener SpO₂ ≥95% durante 24 horas",
        "Puede considerarse egreso tras confirmar los demás criterios clínicos y familiares",
        "Debe reiniciarse oxígeno nocturno por toda saturación inferior a 94%",
        "Debe obtenerse radiografía normal antes de decidir el alta"
      ],
      "correct": 1,
      "why": "Para mayores de seis semanas sin condiciones subyacentes, la guía acepta saturación en aire superior a 90% durante cuatro horas incluyendo sueño, junto a estabilidad e ingesta adecuada.",
      "others": "La guía no exige esa meta ni esa duración en un lactante sin comorbilidades de esta edad. No se justifica reintroducir oxígeno automáticamente con las cifras descritas. No se recomienda radiografía rutinaria para decidir egreso de bronquiolitis no complicada.",
      "rationales": [
        "La guía no exige esa meta ni esa duración en un lactante sin comorbilidades de esta edad.",
        "Para mayores de seis semanas sin condiciones subyacentes, la guía acepta saturación en aire superior a 90% durante cuatro horas incluyendo sueño, junto a estabilidad e ingesta adecuada.",
        "No se justifica reintroducir oxígeno automáticamente con las cifras descritas.",
        "No se recomienda radiografía rutinaria para decidir egreso de bronquiolitis no complicada."
      ],
      "source": {
        "title": "NICE NG9. Bronchiolitis in children: diagnosis and management (oxygen thresholds updated 2021)",
        "year": 2021,
        "url": "https://www.nice.org.uk/guidance/ng9/chapter/Recommendations",
        "locator": "1.5.1, criterios de egreso"
      },
      "reference": "NICE NG9. Bronchiolitis in children: diagnosis and management (oxygen thresholds updated 2021) (2021), 1.5.1, criterios de egreso",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB069",
      "section": "Neurología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Espasmos epilépticos infantiles",
      "stem": "Lactante de 5 meses con espasmos epilépticos infantiles confirmados por video-EEG, regresión del desarrollo y estudio etiológico en curso. No presenta datos de esclerosis tuberosa; se descartaron contraindicaciones o alto riesgo por esteroides. Evaluación por especialista en epilepsia pediátrica.",
      "prompt": "Según NICE NG217, ¿qué estrategia inicial se recomienda?",
      "options": [
        "Levetiracetam como monoterapia",
        "Vigabatrina como monoterapia en todos los casos",
        "Prednisolona oral a dosis altas combinada con vigabatrina",
        "Ácido valproico como primera elección universal"
      ],
      "correct": 2,
      "why": "6.3.4 recomienda combinación de prednisolona a dosis altas y vigabatrina cuando no se debe a esclerosis tuberosa y no existe alto riesgo por esteroides.",
      "others": "Levetiracetam no es el esquema de primera línea de NG217 para este síndrome. Vigabatrina sola es primera elección en esclerosis tuberosa o alternativa si el riesgo esteroideo es alto; esas condiciones no están presentes. Valproato no es primera elección universal en espasmos infantiles.",
      "rationales": [
        "Levetiracetam no es el esquema de primera línea de NG217 para este síndrome.",
        "Vigabatrina sola es primera elección en esclerosis tuberosa o alternativa si el riesgo esteroideo es alto; esas condiciones no están presentes.",
        "6.3.4 recomienda combinación de prednisolona a dosis altas y vigabatrina cuando no se debe a esclerosis tuberosa y no existe alto riesgo por esteroides.",
        "Valproato no es primera elección universal en espasmos infantiles."
      ],
      "source": {
        "title": "NICE NG217. Epilepsies in children, young people and adults",
        "year": 2022,
        "url": "https://www.nice.org.uk/guidance/ng217/chapter/6-Treating-childhood-onset-epilepsies",
        "locator": "6.3.4, espasmos sin esclerosis tuberosa"
      },
      "reference": "NICE NG217. Epilepsies in children, young people and adults (2022), 6.3.4, espasmos sin esclerosis tuberosa",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB070",
      "section": "Neurología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Espasmos epilépticos infantiles",
      "stem": "Lactante de 6 meses con esclerosis tuberosa confirmada y espasmos epilépticos en salvas. Video-EEG compatible. No recibió tratamiento previo. Se organiza valoración oftalmológica y seguimiento por epileptología pediátrica.",
      "prompt": "Según NICE NG217, ¿qué fármaco inicial se prefiere específicamente por la etiología?",
      "options": [
        "Vigabatrina",
        "Prednisolona oral como monoterapia inicial",
        "Levetiracetam",
        "Topiramato"
      ],
      "correct": 0,
      "why": "6.3.5 recomienda vigabatrina sola como primera línea cuando los espasmos se asocian a esclerosis tuberosa; si no funciona después de una semana, se añade prednisolona a dosis altas.",
      "others": "La prednisolona puede añadirse ante respuesta insuficiente, pero no es la primera opción aislada recomendada para esta etiología. No es la primera elección específica para espasmos por esclerosis tuberosa. No es el esquema inicial preferido para este contexto.",
      "rationales": [
        "6.3.5 recomienda vigabatrina sola como primera línea cuando los espasmos se asocian a esclerosis tuberosa; si no funciona después de una semana, se añade prednisolona a dosis altas.",
        "La prednisolona puede añadirse ante respuesta insuficiente, pero no es la primera opción aislada recomendada para esta etiología.",
        "No es la primera elección específica para espasmos por esclerosis tuberosa.",
        "No es el esquema inicial preferido para este contexto."
      ],
      "source": {
        "title": "NICE NG217. Epilepsies in children, young people and adults",
        "year": 2022,
        "url": "https://www.nice.org.uk/guidance/ng217/chapter/6-Treating-childhood-onset-epilepsies",
        "locator": "6.3.5, espasmos asociados a esclerosis tuberosa"
      },
      "reference": "NICE NG217. Epilepsies in children, young people and adults (2022), 6.3.5, espasmos asociados a esclerosis tuberosa",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB071",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Otitis media aguda",
      "stem": "Niño de 20 meses con fiebre de 39.2 °C, otalgia y abombamiento bilateral de membranas timpánicas; además presenta secreción conjuntival purulenta. No tiene alergia a penicilinas, tolera vía oral y no presenta complicaciones. Se decide iniciar antibiótico.",
      "prompt": "Conforme a AAP 2013, ¿qué opción oral empírica es preferible?",
      "options": [
        "Amoxicilina sola",
        "Amoxicilina con clavulanato",
        "Azitromicina",
        "Clindamicina"
      ],
      "correct": 1,
      "why": "KAS 4B recomienda cobertura adicional de betalactamasa en otitis con conjuntivitis purulenta. Amoxicilina-clavulanato es la opción preferida sin alergia.",
      "others": "La conjuntivitis purulenta concomitante orienta a necesidad de cobertura frente a productores de betalactamasa; amoxicilina sola no es la opción preferida. El macrólido no es la primera elección en un paciente que tolera betalactámicos y tiene este patrón. Clindamicina carece de cobertura confiable contra H. influenzae, relevante en este síndrome.",
      "rationales": [
        "La conjuntivitis purulenta concomitante orienta a necesidad de cobertura frente a productores de betalactamasa; amoxicilina sola no es la opción preferida.",
        "KAS 4B recomienda cobertura adicional de betalactamasa en otitis con conjuntivitis purulenta. Amoxicilina-clavulanato es la opción preferida sin alergia.",
        "El macrólido no es la primera elección en un paciente que tolera betalactámicos y tiene este patrón.",
        "Clindamicina carece de cobertura confiable contra H. influenzae, relevante en este síndrome."
      ],
      "source": {
        "title": "AAP. The Diagnosis and Management of Acute Otitis Media",
        "year": 2013,
        "url": "https://doi.org/10.1542/peds.2012-3488",
        "locator": "KAS 4B, cobertura de betalactamasa"
      },
      "reference": "AAP. The Diagnosis and Management of Acute Otitis Media (2013), KAS 4B, cobertura de betalactamasa",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB072",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Otitis media aguda",
      "stem": "Lactante de 18 meses con otitis media aguda unilateral confirmada por otoscopia. Otalgia leve de 18 horas, temperatura de 38 °C, sin otorrea ni comorbilidad. Familia prefiere evitar antibióticos si es seguro y garantiza reevaluación y acceso a tratamiento en 48–72 horas si no mejora.",
      "prompt": "Según AAP 2013, ¿qué estrategia puede ofrecerse mediante decisión compartida?",
      "options": [
        "Antibioterapia inmediata obligatoria por tener menos de dos años",
        "Observación sin analgesia y sin plan de reevaluación",
        "Analgesia y observación estrecha con plan de inicio antibiótico ante empeoramiento o falta de mejoría",
        "Antibiótico tópico como único tratamiento con membrana íntegra"
      ],
      "correct": 2,
      "why": "KAS 3C admite observación con seguimiento fiable en otitis unilateral no grave de 6–23 meses, e iniciar antibiótico si empeora o no mejora en 48–72 horas.",
      "others": "Entre 6 y 23 meses, la otitis unilateral no grave admite observación seleccionada; no es obligatorio tratar de inmediato a todos. La analgesia y un mecanismo de seguimiento son componentes indispensables. Las gotas antibióticas no constituyen tratamiento de la infección del oído medio con tímpano íntegro.",
      "rationales": [
        "Entre 6 y 23 meses, la otitis unilateral no grave admite observación seleccionada; no es obligatorio tratar de inmediato a todos.",
        "La analgesia y un mecanismo de seguimiento son componentes indispensables.",
        "KAS 3C admite observación con seguimiento fiable en otitis unilateral no grave de 6–23 meses, e iniciar antibiótico si empeora o no mejora en 48–72 horas.",
        "Las gotas antibióticas no constituyen tratamiento de la infección del oído medio con tímpano íntegro."
      ],
      "source": {
        "title": "AAP. The Diagnosis and Management of Acute Otitis Media",
        "year": 2013,
        "url": "https://doi.org/10.1542/peds.2012-3488",
        "locator": "KAS 3C, observación en otitis unilateral no grave"
      },
      "reference": "AAP. The Diagnosis and Management of Acute Otitis Media (2013), KAS 3C, observación en otitis unilateral no grave",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB073",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Apendicitis pediátrica",
      "stem": "Escolar de 9 años con 18 horas de dolor que migró a fosa ilíaca derecha, anorexia, temperatura 37.9 °C y defensa localizada. Leucocitos 12 600/mm³, neutrófilos 78%. Está estable, sin peritonismo generalizado. La estratificación clínica institucional indica riesgo intermedio y se dispone de imagen pediátrica experta.",
      "prompt": "Según IDSA 2024, ¿qué estudio debe solicitarse inicialmente?",
      "options": [
        "TC abdominopélvica con contraste IV",
        "Ultrasonido abdominal dirigido a fosa ilíaca derecha",
        "RM abdominopélvica como estudio inicial sistemático",
        "Radiografía abdominal en dos proyecciones"
      ],
      "correct": 1,
      "why": "El ultrasonido es la modalidad inicial sugerida en niños con sospecha de apendicitis; evita radiación y puede confirmar el diagnóstico.",
      "others": "La TC puede ser apropiada tras un ultrasonido no concluyente, pero expone a radiación y no es la primera modalidad preferida en este escenario. La RM es útil como segunda modalidad cuando persiste la sospecha tras un ultrasonido indeterminado; no es la primera sugerida de rutina. La radiografía simple tiene rendimiento insuficiente para confirmar o excluir apendicitis.",
      "rationales": [
        "La TC puede ser apropiada tras un ultrasonido no concluyente, pero expone a radiación y no es la primera modalidad preferida en este escenario.",
        "El ultrasonido es la modalidad inicial sugerida en niños con sospecha de apendicitis; evita radiación y puede confirmar el diagnóstico.",
        "La RM es útil como segunda modalidad cuando persiste la sospecha tras un ultrasonido indeterminado; no es la primera sugerida de rutina.",
        "La radiografía simple tiene rendimiento insuficiente para confirmar o excluir apendicitis."
      ],
      "source": {
        "title": "IDSA 2024. Diagnostic Imaging of Suspected Acute Appendicitis",
        "year": 2024,
        "url": "https://www.idsociety.org/practice-guideline/intra-abdominal-infections/",
        "locator": "Diagnóstico por imagen en niños: modalidad inicial"
      },
      "reference": "IDSA 2024. Diagnostic Imaging of Suspected Acute Appendicitis (2024), Diagnóstico por imagen en niños: modalidad inicial",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB074",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Apendicitis pediátrica",
      "stem": "Niña de 11 años con 26 horas de dolor abdominal, ahora localizado en cuadrante inferior derecho. Ultrasonido inicial no visualiza el apéndice y es indeterminado. En reevaluación persisten dolor focal, defensa y neutrofilia; sin inestabilidad. Cirugía pediátrica valora el caso. Hay RM rápida sin sedación disponible de inmediato.",
      "prompt": "Se requiere una segunda imagen que evite radiación ionizante. ¿Cuál es la mejor opción conforme a IDSA 2024?",
      "options": [
        "Repetir ultrasonido como única estrategia de imagen",
        "TC abdominopélvica con contraste IV",
        "RM abdominal y pélvica",
        "Radiografía abdominal en bipedestación"
      ],
      "correct": 2,
      "why": "La RM permite estudiar la apendicitis sin radiación; satisface la condición del caso y la recomendación condicional.",
      "others": "Si persiste la sospecha, IDSA sugiere RM o TC en vez de otro ultrasonido; la observación clínica sigue siendo una opción según contexto. La TC es una alternativa apropiada tras ultrasonido indeterminado, pero utiliza radiación y aquí existe RM inmediata. La radiografía no caracteriza suficientemente el apéndice ni resuelve el ultrasonido equívoco.",
      "rationales": [
        "Si persiste la sospecha, IDSA sugiere RM o TC en vez de otro ultrasonido; la observación clínica sigue siendo una opción según contexto.",
        "La TC es una alternativa apropiada tras ultrasonido indeterminado, pero utiliza radiación y aquí existe RM inmediata.",
        "La RM permite estudiar la apendicitis sin radiación; satisface la condición del caso y la recomendación condicional.",
        "La radiografía no caracteriza suficientemente el apéndice ni resuelve el ultrasonido equívoco."
      ],
      "source": {
        "title": "IDSA 2024. Diagnostic Imaging of Suspected Acute Appendicitis",
        "year": 2024,
        "url": "https://www.idsociety.org/practice-guideline/intra-abdominal-infections/",
        "locator": "Diagnóstico por imagen: ultrasonido equívoco con sospecha persistente"
      },
      "reference": "IDSA 2024. Diagnostic Imaging of Suspected Acute Appendicitis (2024), Diagnóstico por imagen: ultrasonido equívoco con sospecha persistente",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB075",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Interpretación",
      "topic": "Apendicitis pediátrica y evidencia",
      "stem": "Familia de un niño de 10 años con apendicitis presuntamente no perforada pregunta por los antibióticos frente a la cirugía. Se revisa el ensayo internacional de no inferioridad publicado en Lancet en 2025, en niños de 5–16 años: fracaso del tratamiento al año en 153/452 con antibióticos y 28/394 con apendicectomía; diferencia estimada 26.7 puntos porcentuales (IC 90% 22.4–30.9).",
      "prompt": "¿Qué conclusión refleja mejor el resultado de este ensayo, sin extrapolarlo a todos los protocolos?",
      "options": [
        "El estudio apoya no inferioridad de los antibióticos porque la mayoría evitó cirugía",
        "Ambas estrategias son equivalentes porque existe fracaso en los dos grupos",
        "La diferencia corresponde a reducción relativa de riesgo de 26.7% con cirugía",
        "La estrategia antibiótica no demostró no inferioridad y tuvo mayor fracaso al año"
      ],
      "correct": 3,
      "why": "El ensayo encontró más fracaso con antibióticos y concluyó inferioridad frente a apendicectomía; la decisión individual requiere discutir selección y preferencias.",
      "others": "Que muchos niños eviten cirugía no prueba no inferioridad; se debe evaluar la diferencia entre grupos frente al margen predefinido. La presencia de eventos en ambos grupos no implica equivalencia; las tasas fueron distintas. 26.7 puntos porcentuales es la diferencia absoluta estimada, no una reducción relativa del 26.7%.",
      "rationales": [
        "Que muchos niños eviten cirugía no prueba no inferioridad; se debe evaluar la diferencia entre grupos frente al margen predefinido.",
        "La presencia de eventos en ambos grupos no implica equivalencia; las tasas fueron distintas.",
        "26.7 puntos porcentuales es la diferencia absoluta estimada, no una reducción relativa del 26.7%.",
        "El ensayo encontró más fracaso con antibióticos y concluyó inferioridad frente a apendicectomía; la decisión individual requiere discutir selección y preferencias."
      ],
      "source": {
        "title": "St Peter et al. Appendicectomy versus antibiotics for acute uncomplicated appendicitis in children: randomised non-inferiority trial",
        "year": 2025,
        "url": "https://pubmed.ncbi.nlm.nih.gov/39826968/",
        "locator": "Resultados y conclusión del ensayo de no inferioridad"
      },
      "reference": "St Peter et al. Appendicectomy versus antibiotics for acute uncomplicated appendicitis in children: randomised non-inferiority trial (2025), Resultados y conclusión del ensayo de no inferioridad",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB076",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Prevención de alergia alimentaria",
      "stem": "Lactante de 5 meses con dermatitis atópica grave que requiere tratamiento tópico frecuente. Tolera alimentos complementarios apropiados para su desarrollo; nunca ha ingerido cacahuate. IgE específica a cacahuate por ImmunoCAP: 0.12 kUA/L. No ha tenido reacciones alimentarias inmediatas.",
      "prompt": "Con base en NIAID 2017, ¿qué estrategia de introducción del cacahuate es apropiada?",
      "options": [
        "Introducir pronto una preparación segura para la edad; considerar supervisión si existe preocupación",
        "Diferir toda exposición hasta los 12 meses y repetir IgE",
        "Realizar provocación hospitalaria obligatoria antes de toda introducción, por el eccema",
        "Excluir cacahuate hasta que desaparezca completamente la dermatitis"
      ],
      "correct": 0,
      "why": "En el grupo de alto riesgo, una IgE específica inferior a 0.35 kUA/L permite introducción temprana en forma apropiada; puede ofrecerse supervisión según preocupación clínica.",
      "others": "Retrasar de rutina pierde la oportunidad de prevención temprana que plantea la guía. La prueba por debajo del umbral tiene buen valor predictivo negativo; la provocación hospitalaria no es requisito universal. La gravedad del eccema identifica riesgo y necesidad de evaluación temprana, no indica exclusión indefinida.",
      "rationales": [
        "En el grupo de alto riesgo, una IgE específica inferior a 0.35 kUA/L permite introducción temprana en forma apropiada; puede ofrecerse supervisión según preocupación clínica.",
        "Retrasar de rutina pierde la oportunidad de prevención temprana que plantea la guía.",
        "La prueba por debajo del umbral tiene buen valor predictivo negativo; la provocación hospitalaria no es requisito universal.",
        "La gravedad del eccema identifica riesgo y necesidad de evaluación temprana, no indica exclusión indefinida."
      ],
      "source": {
        "title": "NIAID. Addendum Guidelines for the Prevention of Peanut Allergy",
        "year": 2017,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5226648/",
        "locator": "Addendum 1, categoría A de IgE específica"
      },
      "reference": "NIAID. Addendum Guidelines for the Prevention of Peanut Allergy (2017), Addendum 1, categoría A de IgE específica",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB077",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Interpretación",
      "topic": "Prevención de alergia alimentaria",
      "stem": "Lactante de 5 meses con eccema grave, listo para alimentación complementaria y sin exposición previa a cacahuate. La IgE específica por ImmunoCAP es 0.52 kUA/L. No hay historia de anafilaxia y la familia pregunta si el resultado confirma alergia.",
      "prompt": "Conforme a NIAID 2017, ¿qué decisión corresponde?",
      "options": [
        "Introducción en domicilio sin evaluación adicional, porque el resultado es inferior a 1 kUA/L",
        "Diagnosticar alergia al cacahuate e indicar exclusión permanente únicamente por la IgE",
        "Referir a alergología para evaluación adicional antes de decidir la introducción",
        "Solicitar un panel amplio de IgE a todos los alimentos y excluir los positivos"
      ],
      "correct": 2,
      "why": "En la categoría B se indica valoración especializada; una prueba cutánea y, según resultado, una exposición supervisada pueden orientar la decisión.",
      "others": "El umbral de derivación en esta vía de prevención es 0.35 kUA/L, no 1 kUA/L. Un resultado positivo a ese nivel no confirma alergia clínica por sí solo; puede representar sensibilización. Los paneles indiscriminados tienen bajo valor predictivo positivo y favorecen restricciones injustificadas.",
      "rationales": [
        "El umbral de derivación en esta vía de prevención es 0.35 kUA/L, no 1 kUA/L.",
        "Un resultado positivo a ese nivel no confirma alergia clínica por sí solo; puede representar sensibilización.",
        "En la categoría B se indica valoración especializada; una prueba cutánea y, según resultado, una exposición supervisada pueden orientar la decisión.",
        "Los paneles indiscriminados tienen bajo valor predictivo positivo y favorecen restricciones injustificadas."
      ],
      "source": {
        "title": "NIAID. Addendum Guidelines for the Prevention of Peanut Allergy",
        "year": 2017,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5226648/",
        "locator": "Addendum 1, categoría B de IgE específica"
      },
      "reference": "NIAID. Addendum Guidelines for the Prevention of Peanut Allergy (2017), Addendum 1, categoría B de IgE específica",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB078",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Anafilaxia",
      "stem": "Adolescente de 13 años con alergia conocida a nuez, que ingiere accidentalmente una porción. Diez minutos después desarrolla disfonía, estridor leve, tos y sibilancias. No presenta urticaria; TA 110/68 mmHg. Está consciente y el equipo inicia valoración ABCDE.",
      "prompt": "¿Cuál es la intervención farmacológica prioritaria conforme a WAO 2020?",
      "options": [
        "Salbutamol inhalado y reevaluación antes de administrar adrenalina",
        "Adrenalina intramuscular en muslo anterolateral",
        "Antihistamínico H1 intravenoso seguido de adrenalina si aparece urticaria",
        "Adrenalina intravenosa en bolo como primera vía por el estridor"
      ],
      "correct": 1,
      "why": "El compromiso respiratorio agudo tras un alérgeno conocido basta para sospechar anafilaxia incluso sin lesiones cutáneas; la vía IM es primera línea.",
      "others": "El broncodilatador puede complementar el tratamiento de broncoespasmo, pero no revierte todos los mecanismos de la anafilaxia. Un antihistamínico no trata el compromiso laríngeo ni debe retrasar adrenalina. El bolo IV aumenta riesgo de eventos cardiovasculares y errores; no es la vía inicial habitual en un paciente sin paro.",
      "rationales": [
        "El broncodilatador puede complementar el tratamiento de broncoespasmo, pero no revierte todos los mecanismos de la anafilaxia.",
        "El compromiso respiratorio agudo tras un alérgeno conocido basta para sospechar anafilaxia incluso sin lesiones cutáneas; la vía IM es primera línea.",
        "Un antihistamínico no trata el compromiso laríngeo ni debe retrasar adrenalina.",
        "El bolo IV aumenta riesgo de eventos cardiovasculares y errores; no es la vía inicial habitual en un paciente sin paro."
      ],
      "source": {
        "title": "World Allergy Organization Anaphylaxis Guidance 2020",
        "year": 2020,
        "url": "https://doi.org/10.1016/j.waojou.2020.100472",
        "locator": "Criterios diagnósticos modificados y tratamiento agudo"
      },
      "reference": "World Allergy Organization Anaphylaxis Guidance 2020 (2020), Criterios diagnósticos modificados y tratamiento agudo",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB079",
      "section": "Endocrinología",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Hiperplasia suprarrenal congénita",
      "stem": "Niña de 7 años con pubarquia progresiva, aceleración de crecimiento y edad ósea adelantada dos años. Sin signos de pubertad central. La 17-hidroxiprogesterona basal de las 07:30 h medida por LC-MS/MS es limítrofe para el método; no recibe glucocorticoides.",
      "prompt": "¿Qué prueba discrimina mejor la deficiencia de 21-hidroxilasa de otros defectos enzimáticos, según Endocrine Society 2018?",
      "options": [
        "Estudio aislado de cariotipo",
        "Perfil adrenocortical completo tras estimulación con cosintropina",
        "Genotipificación CYP21A2 como sustituto obligatorio de la prueba dinámica",
        "Repetición aislada de DHEA-S en seis meses"
      ],
      "correct": 1,
      "why": "La recomendación 3.3 indica perfil completo poscosintropina ante 17-OHP limítrofe para caracterizar el defecto.",
      "others": "El cariotipo no identifica el bloqueo de síntesis esteroidea responsable de este fenotipo. La genotipificación se reserva, entre otros contextos, para resultados dinámicos equívocos, imposibilidad de realizar la prueba o consejo genético. DHEA-S aislada no discrimina los defectos esteroidogénicos ni resuelve la sospecha actual.",
      "rationales": [
        "El cariotipo no identifica el bloqueo de síntesis esteroidea responsable de este fenotipo.",
        "La recomendación 3.3 indica perfil completo poscosintropina ante 17-OHP limítrofe para caracterizar el defecto.",
        "La genotipificación se reserva, entre otros contextos, para resultados dinámicos equívocos, imposibilidad de realizar la prueba o consejo genético.",
        "DHEA-S aislada no discrimina los defectos esteroidogénicos ni resuelve la sospecha actual."
      ],
      "source": {
        "title": "Endocrine Society. Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency",
        "year": 2018,
        "url": "https://www.endocrine.org/clinical-practice-guidelines/congenital-adrenal-hyperplasia-guideline-resources",
        "locator": "3.2–3.4, diagnóstico después de la lactancia"
      },
      "reference": "Endocrine Society. Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency (2018), 3.2–3.4, diagnóstico después de la lactancia",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB080",
      "section": "Endocrinología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hiperplasia suprarrenal congénita",
      "stem": "Recién nacida de 18 días con hiperplasia suprarrenal congénita clásica perdedora de sal por deficiencia de 21-hidroxilasa. Tras estabilización hospitalaria, se normalizan perfusión, glucosa y electrolitos. El equipo prepara la terapia crónica y seguimiento por endocrinología.",
      "prompt": "¿Qué combinación de mantenimiento se recomienda en esta etapa?",
      "options": [
        "Prednisolona y fludrocortisona, sin suplemento de sodio",
        "Hidrocortisona sola con seguimiento de sodio",
        "Hidrocortisona, fludrocortisona y suplemento de cloruro de sodio",
        "Dexametasona y suplemento de sodio, sin mineralocorticoide"
      ],
      "correct": 2,
      "why": "Las recomendaciones 4.1 y 4.3 incluyen hidrocortisona, fludrocortisona y sodio durante el periodo neonatal y lactancia temprana, con ajuste clínico y bioquímico.",
      "others": "Se prefiere hidrocortisona en niños en crecimiento; en lactantes pequeños también se recomienda suplemento de sodio. La hidrocortisona sola no cubre adecuadamente la necesidad mineralocorticoide de esta forma perdedora de sal. Dexametasona crónica no es el glucocorticoide preferido en crecimiento y omitir fludrocortisona es inadecuado.",
      "rationales": [
        "Se prefiere hidrocortisona en niños en crecimiento; en lactantes pequeños también se recomienda suplemento de sodio.",
        "La hidrocortisona sola no cubre adecuadamente la necesidad mineralocorticoide de esta forma perdedora de sal.",
        "Las recomendaciones 4.1 y 4.3 incluyen hidrocortisona, fludrocortisona y sodio durante el periodo neonatal y lactancia temprana, con ajuste clínico y bioquímico.",
        "Dexametasona crónica no es el glucocorticoide preferido en crecimiento y omitir fludrocortisona es inadecuado."
      ],
      "source": {
        "title": "Endocrine Society. Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency",
        "year": 2018,
        "url": "https://www.endocrine.org/clinical-practice-guidelines/congenital-adrenal-hyperplasia-guideline-resources",
        "locator": "4.1–4.3, mantenimiento de la forma clásica"
      },
      "reference": "Endocrine Society. Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency (2018), 4.1–4.3, mantenimiento de la forma clásica",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB081",
      "section": "Endocrinología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hiperplasia suprarrenal congénita",
      "stem": "Escolar de 8 años con hiperplasia suprarrenal congénita clásica, tratado con hidrocortisona y fludrocortisona. Presenta infección respiratoria febril de 39 °C. Tolera vía oral, está bien perfundido y sin vómitos. La familia dispone de un plan escrito de dosis de estrés.",
      "prompt": "¿Qué ajuste general corresponde según Endocrine Society 2018?",
      "options": [
        "Aumentar fludrocortisona y mantener hidrocortisona habitual",
        "Duplicar ambos fármacos sistemáticamente durante cualquier infección",
        "Mantener ambos sin cambios mientras no aparezca hipotensión",
        "Incrementar hidrocortisona según el plan de estrés, sin aumentar rutinariamente fludrocortisona"
      ],
      "correct": 3,
      "why": "Las recomendaciones 4.7 y 4.10 respaldan aumento de glucocorticoide en fiebre superior a 38.5 °C sin incrementar sistemáticamente mineralocorticoide; si no tolera vía oral requiere plan parenteral y valoración.",
      "others": "El estrés febril incrementa la necesidad de glucocorticoide, no solo de mineralocorticoide. La guía recomienda incrementar glucocorticoide en enfermedad febril, no aumentar automáticamente mineralocorticoide. Esperar hipotensión puede permitir progresión hacia crisis suprarrenal; la fiebre descrita ya justifica el plan de estrés.",
      "rationales": [
        "El estrés febril incrementa la necesidad de glucocorticoide, no solo de mineralocorticoide.",
        "La guía recomienda incrementar glucocorticoide en enfermedad febril, no aumentar automáticamente mineralocorticoide.",
        "Esperar hipotensión puede permitir progresión hacia crisis suprarrenal; la fiebre descrita ya justifica el plan de estrés.",
        "Las recomendaciones 4.7 y 4.10 respaldan aumento de glucocorticoide en fiebre superior a 38.5 °C sin incrementar sistemáticamente mineralocorticoide; si no tolera vía oral requiere plan parenteral y valoración."
      ],
      "source": {
        "title": "Endocrine Society. Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency",
        "year": 2018,
        "url": "https://www.endocrine.org/clinical-practice-guidelines/congenital-adrenal-hyperplasia-guideline-resources",
        "locator": "4.7–4.11, dosis de estrés y prevención de crisis"
      },
      "reference": "Endocrine Society. Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency (2018), 4.7–4.11, dosis de estrés y prevención de crisis",
      "caseId": null,
      "critical": true,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB082",
      "section": "Genética",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Síndrome de Down",
      "stem": "Niña de 3 años y 8 meses con trisomía 21 confirmada. Sus padres niegan ronquido habitual, pausas respiratorias o somnolencia. No se ha realizado estudio de sueño previo; la exploración no muestra hipertrofia amigdalina evidente.",
      "prompt": "Según la vigilancia de salud AAP 2022, ¿qué conducta es apropiada?",
      "options": [
        "Solicitar polisomnografía aunque el interrogatorio sea negativo",
        "Diferir el estudio hasta que aparezca ronquido habitual",
        "Solicitar únicamente oximetría nocturna como reemplazo definitivo de polisomnografía",
        "Realizar polisomnografía solo si presenta obesidad o hipertrofia amigdalina"
      ],
      "correct": 0,
      "why": "La historia negativa no excluye apnea obstructiva; la AAP recomienda estudio de sueño entre los 3 y 4 años para todos los niños con síndrome de Down.",
      "others": "El interrogatorio familiar tiene correlación insuficiente con los resultados del estudio de sueño en esta población. La oximetría puede aportar información, pero no sustituye la polisomnografía recomendada para el tamizaje universal. El riesgo es inherente al síndrome y no se limita a quienes presentan esos factores.",
      "rationales": [
        "La historia negativa no excluye apnea obstructiva; la AAP recomienda estudio de sueño entre los 3 y 4 años para todos los niños con síndrome de Down.",
        "El interrogatorio familiar tiene correlación insuficiente con los resultados del estudio de sueño en esta población.",
        "La oximetría puede aportar información, pero no sustituye la polisomnografía recomendada para el tamizaje universal.",
        "El riesgo es inherente al síndrome y no se limita a quienes presentan esos factores."
      ],
      "source": {
        "title": "AAP. Health Supervision for Children and Adolescents With Down Syndrome",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-057010",
        "locator": "Vigilancia de 1 a 5 años: apnea obstructiva del sueño"
      },
      "reference": "AAP. Health Supervision for Children and Adolescents With Down Syndrome (2022), Vigilancia de 1 a 5 años: apnea obstructiva del sueño",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB083",
      "section": "Genética",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Síndrome de Down",
      "stem": "Varón de 6 años con síndrome de Down que acude a control y desea iniciar actividades recreativas no competitivas. No presenta cervicalgia, cambios de marcha, debilidad, alteraciones esfinterianas ni signos de mielopatía. Exploración neurológica sin cambios respecto a controles anteriores.",
      "prompt": "Conforme a AAP 2022, ¿qué enfoque de detección de inestabilidad atlantoaxoidea es apropiado en un niño asintomático?",
      "options": [
        "Radiografías cervicales de flexión y extensión anuales",
        "Radiografía cervical lateral de tamizaje antes de cada anestesia",
        "Vigilancia clínica de síntomas y precauciones cervicales; sin radiografías rutinarias",
        "RM cervical anual como sustituto de radiografías"
      ],
      "correct": 2,
      "why": "Se recomienda evaluación clínica dirigida y educar a cuidadores sobre síntomas de alarma; la imagen se indica ante síntomas o hallazgos pertinentes.",
      "others": "La radiografía rutinaria en ausencia de síntomas no predice adecuadamente el desarrollo posterior de problemas cervicales. La recomendación enfatiza precauciones de posicionamiento durante procedimientos, no radiografías repetidas en asintomáticos. La RM anual de tamizaje no es una recomendación de vigilancia rutinaria.",
      "rationales": [
        "La radiografía rutinaria en ausencia de síntomas no predice adecuadamente el desarrollo posterior de problemas cervicales.",
        "La recomendación enfatiza precauciones de posicionamiento durante procedimientos, no radiografías repetidas en asintomáticos.",
        "Se recomienda evaluación clínica dirigida y educar a cuidadores sobre síntomas de alarma; la imagen se indica ante síntomas o hallazgos pertinentes.",
        "La RM anual de tamizaje no es una recomendación de vigilancia rutinaria."
      ],
      "source": {
        "title": "AAP. Health Supervision for Children and Adolescents With Down Syndrome",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-057010",
        "locator": "Vigilancia cervical y evaluación de inestabilidad atlantoaxoidea"
      },
      "reference": "AAP. Health Supervision for Children and Adolescents With Down Syndrome (2022), Vigilancia cervical y evaluación de inestabilidad atlantoaxoidea",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB084",
      "section": "Genética",
      "type": "caso",
      "skill": "Interpretación",
      "topic": "Síndrome de Down",
      "stem": "Niño de 4 años con trisomía 21, dieta restrictiva y cansancio leve. Biometría hemática: Hb 12.1 g/dL, VCM 94 fL. No ha recibido hierro. El pediatra desea completar la vigilancia anual de deficiencia de hierro sin basarse solo en el VCM.",
      "prompt": "Según AAP 2022, ¿qué par de estudios complementa apropiadamente la biometría?",
      "options": [
        "Ferritina aislada sin considerar inflamación",
        "Ferritina y proteína C reactiva",
        "Reticulocitos y bilirrubina indirecta",
        "Electroforesis de hemoglobina y haptoglobina"
      ],
      "correct": 1,
      "why": "AAP recomienda desde el año de edad biometría con diferencial y ferritina más PCR, o hierro sérico más capacidad total de fijación de hierro.",
      "others": "La ferritina puede elevarse con inflamación y ocultar deficiencia; interpretarla junto a PCR mejora el contexto. Estos estudios se orientan a hemólisis o respuesta medular, no son el par recomendado para tamizaje de hierro. La electroforesis y haptoglobina se reservan para preguntas diagnósticas específicas; no constituyen la vigilancia anual indicada.",
      "rationales": [
        "La ferritina puede elevarse con inflamación y ocultar deficiencia; interpretarla junto a PCR mejora el contexto.",
        "AAP recomienda desde el año de edad biometría con diferencial y ferritina más PCR, o hierro sérico más capacidad total de fijación de hierro.",
        "Estos estudios se orientan a hemólisis o respuesta medular, no son el par recomendado para tamizaje de hierro.",
        "La electroforesis y haptoglobina se reservan para preguntas diagnósticas específicas; no constituyen la vigilancia anual indicada."
      ],
      "source": {
        "title": "AAP. Health Supervision for Children and Adolescents With Down Syndrome",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-057010",
        "locator": "Vigilancia anual de anemia y deficiencia de hierro"
      },
      "reference": "AAP. Health Supervision for Children and Adolescents With Down Syndrome (2022), Vigilancia anual de anemia y deficiencia de hierro",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB085",
      "section": "Oftalmología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Ambliopía",
      "stem": "Niño de 5 años con anisometropía corregida con lentes desde hace cuatro meses. Usa los lentes de manera constante. La agudeza visual corregida del ojo ambliope se estabilizó en 20/60 y la del otro ojo es 20/20. Sin patología orgánica. La familia prefiere iniciar oclusión bajo seguimiento oftalmológico.",
      "prompt": "Según AAO PPP actualizada en 2024, ¿cuál es el esquema inicial de oclusión apropiado?",
      "options": [
        "Oclusión del ojo dominante durante todas las horas de vigilia",
        "Oclusión del ojo dominante durante 6 horas diarias como requisito inicial",
        "Oclusión del ojo dominante durante 2 horas diarias",
        "Oclusión alternante de ambos ojos durante 2 horas diarias"
      ],
      "correct": 2,
      "why": "Una agudeza de 20/60 corresponde a ambliopía moderada; después de corrección óptica, dos horas diarias constituyen una opción inicial respaldada.",
      "others": "La oclusión a tiempo completo aumenta carga terapéutica sin beneficio demostrado frente a esquemas menos intensivos para ambliopía moderada. En ambliopía moderada, dos horas iniciales obtienen resultados comparables a seis; se puede intensificar si la respuesta es insuficiente. Ocluir alternadamente el ojo ambliope no cumple el objetivo de estimular su uso visual.",
      "rationales": [
        "La oclusión a tiempo completo aumenta carga terapéutica sin beneficio demostrado frente a esquemas menos intensivos para ambliopía moderada.",
        "En ambliopía moderada, dos horas iniciales obtienen resultados comparables a seis; se puede intensificar si la respuesta es insuficiente.",
        "Una agudeza de 20/60 corresponde a ambliopía moderada; después de corrección óptica, dos horas diarias constituyen una opción inicial respaldada.",
        "Ocluir alternadamente el ojo ambliope no cumple el objetivo de estimular su uso visual."
      ],
      "source": {
        "title": "AAO. Amblyopia Preferred Practice Pattern 2022, updated 2024",
        "year": 2024,
        "url": "https://www.aao.org/education/preferred-practice-pattern/amblyopia-ppp-2022",
        "locator": "Tratamiento: patching tras corrección refractiva"
      },
      "reference": "AAO. Amblyopia Preferred Practice Pattern 2022, updated 2024 (2024), Tratamiento: patching tras corrección refractiva",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB086",
      "section": "Oftalmología",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Ambliopía",
      "stem": "Niña de 6 años con ambliopía anisometrópica y corrección óptica adecuada. Mejoró de 20/80 a 20/50 con oclusión del ojo dominante dos horas diarias. En dos controles sucesivos la agudeza permanece estable; adherencia confirmada, sin pérdida visual ni hallazgos orgánicos nuevos. Se desea continuar oclusión.",
      "prompt": "¿Qué modificación es razonable para intentar mayor recuperación visual?",
      "options": [
        "Aumentar la oclusión del ojo dominante a seis horas diarias con seguimiento",
        "Mantener indefinidamente dos horas sin nueva evaluación",
        "Suspender lentes y mantener oclusión dos horas",
        "Cambiar la oclusión al ojo ambliope para prevenir recaída"
      ],
      "correct": 0,
      "why": "Ante meseta con adherencia, AAO contempla aumentar la oclusión de dos a seis horas; debe vigilarse la agudeza de ambos ojos.",
      "others": "Continuar sin ajustar ni evaluar pierde una oportunidad terapéutica ante déficit residual y meseta confirmada. La corrección refractiva sigue siendo fundamental y no debe retirarse para intensificar la oclusión. Ocluir el ojo afectado contradice el objetivo del tratamiento.",
      "rationales": [
        "Ante meseta con adherencia, AAO contempla aumentar la oclusión de dos a seis horas; debe vigilarse la agudeza de ambos ojos.",
        "Continuar sin ajustar ni evaluar pierde una oportunidad terapéutica ante déficit residual y meseta confirmada.",
        "La corrección refractiva sigue siendo fundamental y no debe retirarse para intensificar la oclusión.",
        "Ocluir el ojo afectado contradice el objetivo del tratamiento."
      ],
      "source": {
        "title": "AAO. Amblyopia Preferred Practice Pattern 2022, updated 2024",
        "year": 2024,
        "url": "https://www.aao.org/education/preferred-practice-pattern/amblyopia-ppp-2022",
        "locator": "Seguimiento: ajuste del tratamiento ante respuesta insuficiente"
      },
      "reference": "AAO. Amblyopia Preferred Practice Pattern 2022, updated 2024 (2024), Seguimiento: ajuste del tratamiento ante respuesta insuficiente",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    },
    {
      "id": "PB087",
      "section": "Oftalmología",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Ambliopía",
      "stem": "Niño de 7 años tratado con lentes y oclusión de seis horas al día por ambliopía. Ahora presenta agudeza visual simétrica 20/25 estable en controles sucesivos. El oftalmólogo considera retirar oclusión, manteniendo corrección óptica. Familia pregunta cómo reducir riesgo de recurrencia.",
      "prompt": "Según AAO PPP actualizada en 2024, ¿qué estrategia es preferible?",
      "options": [
        "Suspender abruptamente oclusión y lentes",
        "Suspender abruptamente la oclusión y dar de alta sin controles",
        "Continuar seis horas indefinidamente aunque la visión sea estable",
        "Reducir la oclusión a dos horas antes de suspenderla y vigilar recurrencia"
      ],
      "correct": 3,
      "why": "La reducción gradual a dos horas antes de suspender y el seguimiento permiten disminuir el riesgo de recurrencia en este grupo.",
      "others": "Retirar la corrección óptica puede reintroducir el estímulo visual desigual; no es parte de la retirada de oclusión descrita. En menores de ocho años tratados con seis o más horas, la retirada brusca se asocia con más recurrencia que reducción previa; se requieren controles. El tratamiento intensivo indefinido no es necesario una vez que se ha alcanzado una respuesta estable y se decide retirar.",
      "rationales": [
        "Retirar la corrección óptica puede reintroducir el estímulo visual desigual; no es parte de la retirada de oclusión descrita.",
        "En menores de ocho años tratados con seis o más horas, la retirada brusca se asocia con más recurrencia que reducción previa; se requieren controles.",
        "El tratamiento intensivo indefinido no es necesario una vez que se ha alcanzado una respuesta estable y se decide retirar.",
        "La reducción gradual a dos horas antes de suspender y el seguimiento permiten disminuir el riesgo de recurrencia en este grupo."
      ],
      "source": {
        "title": "AAO. Amblyopia Preferred Practice Pattern 2022, updated 2024",
        "year": 2024,
        "url": "https://www.aao.org/education/preferred-practice-pattern/amblyopia-ppp-2022",
        "locator": "Seguimiento: retirada de oclusión y recurrencia"
      },
      "reference": "AAO. Amblyopia Preferred Practice Pattern 2022, updated 2024 (2024), Seguimiento: retirada de oclusión y recurrencia",
      "caseId": null,
      "critical": false,
      "level": "board",
      "reviewStatus": "bibliografía contrastada con recomendación específica; revisión clínica independiente pendiente"
    }
  ]
});
