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
    },
    {
      "id": "PB088",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hemólisis neonatal",
      "stem": "Recién nacido de 37 semanas con enfermedad hemolítica isoimmune (DAT positivo), 40 horas de vida. Se documentó bilirrubina total sérica 1.2 mg/dL por encima del umbral de exanguinotransfusión correspondiente a su edad y factores de riesgo. En UCIN, tras fototerapia intensiva y líquidos IV, la muestra inmediatamente previa a iniciar el recambio está 0.6 mg/dL por debajo del umbral de recambio, pero aún por encima del umbral de escalamiento. No hay hipertonía, arqueamiento, llanto agudo ni apnea recurrente. El equipo tiene sangre preparada.",
      "prompt": "¿Cuál es la conducta más apropiada en este punto, de acuerdo con AAP 2022?",
      "options": [
        "Proceder al recambio por haber superado el umbral en la muestra inicial",
        "Diferir el recambio con fototerapia intensiva y bilirrubina cada 2 h hasta quedar por debajo del umbral de escalamiento",
        "Diferir el recambio con fototerapia y regresar a controles cada 6 h desde ahora",
        "Iniciar inmunoglobulina IV como alternativa al seguimiento intensivo y diferir controles"
      ],
      "correct": 1,
      "why": "La caída bajo el umbral permite diferir el procedimiento mientras continúa el tratamiento intensivo; sigue en zona de escalamiento, con medición cada dos horas y capacidad inmediata de recambio.",
      "others": "La cifra previa justificó preparar el recambio, pero la guía permite reconsiderarlo si la bilirrubina cae bajo el umbral antes de comenzar y no hay encefalopatía intermedia o avanzada. El intervalo de seis horas no es apropiado mientras persista por encima del umbral de escalamiento. La inmunoglobulina es una opción en hemólisis isoimmune seleccionada, no sustituye fototerapia ni vigilancia estrecha y no debe demorar un recambio indicado.",
      "rationales": [
        "La cifra previa justificó preparar el recambio, pero la guía permite reconsiderarlo si la bilirrubina cae bajo el umbral antes de comenzar y no hay encefalopatía intermedia o avanzada.",
        "La caída bajo el umbral permite diferir el procedimiento mientras continúa el tratamiento intensivo; sigue en zona de escalamiento, con medición cada dos horas y capacidad inmediata de recambio.",
        "El intervalo de seis horas no es apropiado mientras persista por encima del umbral de escalamiento.",
        "La inmunoglobulina es una opción en hemólisis isoimmune seleccionada, no sustituye fototerapia ni vigilancia estrecha y no debe demorar un recambio indicado."
      ],
      "source": {
        "title": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-058859",
        "locator": "KAS 23: reevaluación inmediatamente antes de exanguinotransfusión"
      },
      "reference": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks (2022), KAS 23: reevaluación inmediatamente antes de exanguinotransfusión",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar dos umbrales, tendencia y estado neurológico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB089",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hemólisis neonatal",
      "stem": "Recién nacida de 38 semanas, DAT positivo por incompatibilidad Rh, con fototerapia intensiva verificada desde hace cuatro horas. La bilirrubina total sigue aumentando y se encuentra a 1.1 mg/dL por debajo del umbral de exanguinotransfusión correspondiente. No tiene datos de encefalopatía aguda. Se inició escalamiento, líquidos IV y traslado a centro con capacidad de recambio, pero se anticipa una demora logística. Se discute la inmunoglobulina intravenosa.",
      "prompt": "¿Cuál es la mejor interpretación de su papel según AAP 2022?",
      "options": [
        "Debe utilizarse de manera rutinaria en todo recién nacido DAT positivo antes de alcanzar escalamiento",
        "Es preferible esperar a que supere el umbral de recambio antes de considerar inmunoglobulina",
        "Puede considerarse como coadyuvante por hemólisis isoimmune, ascenso pese a fototerapia y dificultad para recambio oportuno; mantener preparación y vigilancia",
        "Debe sustituir la exanguinotransfusión si posteriormente alcanza el umbral de recambio"
      ],
      "correct": 2,
      "why": "El beneficio es incierto y existen efectos adversos posibles, pero la combinación de hemólisis, ascenso persistente y acceso difícil al recambio hace razonable discutirla sin sustituir el escalamiento.",
      "others": "La positividad del DAT por sí sola no justifica inmunoglobulina; debe valorarse la intensidad de la hiperbilirrubinemia y su trayectoria. En este contexto ya se superó el umbral de escalamiento, situado dos mg/dL por debajo del de recambio; no es necesario esperar a cruzar este último para considerar la opción. El recambio sigue indicado si alcanza el umbral o aparecen signos neurológicos pertinentes; la inmunoglobulina no constituye reemplazo seguro.",
      "rationales": [
        "La positividad del DAT por sí sola no justifica inmunoglobulina; debe valorarse la intensidad de la hiperbilirrubinemia y su trayectoria.",
        "En este contexto ya se superó el umbral de escalamiento, situado dos mg/dL por debajo del de recambio; no es necesario esperar a cruzar este último para considerar la opción.",
        "El beneficio es incierto y existen efectos adversos posibles, pero la combinación de hemólisis, ascenso persistente y acceso difícil al recambio hace razonable discutirla sin sustituir el escalamiento.",
        "El recambio sigue indicado si alcanza el umbral o aparecen signos neurológicos pertinentes; la inmunoglobulina no constituye reemplazo seguro."
      ],
      "source": {
        "title": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-058859",
        "locator": "KAS 17 y 21; FAQ de AAP sobre uso selectivo de IVIG"
      },
      "reference": "AAP. Management of Hyperbilirubinemia in the Newborn Infant ≥35 Weeks (2022), KAS 17 y 21; FAQ de AAP sobre uso selectivo de IVIG",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Valorar beneficio incierto, tendencia y disponibilidad de terapia definitiva.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB090",
      "section": "Urgencias y terapia intensiva",
      "type": "visual",
      "skill": "Interpretación",
      "topic": "Acidosis durante tratamiento de CAD",
      "stem": "Adolescente de 14 años en UCIP, 16 h tras iniciar tratamiento de CAD. Al ingreso: Na 133, Cl 100, HCO₃ 7 mmol/L, β-hidroxibutirato 6.5 mmol/L. Actual: Na 140, Cl 115, HCO₃ 15 mmol/L, pH venoso 7.29, β-hidroxibutirato 0.6 mmol/L, glucosa 172 mg/dL, K 4.1 mmol/L. Está despierto, tolera alimentos, perfusión normal y sin datos infecciosos. Cuenta con esquema de insulina subcutánea supervisado.",
      "prompt": "¿Qué interpretación y conducta se ajustan mejor a ISPAD 2022?",
      "options": [
        "Persistencia de CAD: aumentar la infusión IV de insulina hasta HCO₃ mayor de 18 mmol/L, aunque la cetonemia esté normalizada",
        "Acidosis láctica persistente: mantener el esquema de CAD hasta normalizar bicarbonato y administrar nueva expansión",
        "Resolución de cetosis con acidosis hiperclorémica residual: considerar transición subcutánea con solapamiento conforme al protocolo",
        "Acidosis hiperclorémica residual: administrar bicarbonato IV como requisito para transición"
      ],
      "correct": 2,
      "why": "El cierre del anión gap, la cetonemia inferior a 1 y la recuperación clínica apoyan resolución de cetosis. La acidosis residual por cloro no debe por sí sola retrasar la transición, con solapamiento adecuado.",
      "others": "El anión gap actual es 10 mmol/L (140−115−15) y la cetonemia ha descendido; el bicarbonato aislado puede confundir acidosis hiperclorémica con CAD persistente. No hay datos aportados de hipoperfusión ni de aumento del anión gap que apoyen lactato como explicación principal; no se justifica expansión por el bicarbonato aislado. La acidosis por cloro usualmente se resuelve sin bicarbonato; su uso no es requisito de transición y conlleva riesgos.",
      "rationales": [
        "El anión gap actual es 10 mmol/L (140−115−15) y la cetonemia ha descendido; el bicarbonato aislado puede confundir acidosis hiperclorémica con CAD persistente.",
        "No hay datos aportados de hipoperfusión ni de aumento del anión gap que apoyen lactato como explicación principal; no se justifica expansión por el bicarbonato aislado.",
        "El cierre del anión gap, la cetonemia inferior a 1 y la recuperación clínica apoyan resolución de cetosis. La acidosis residual por cloro no debe por sí sola retrasar la transición, con solapamiento adecuado.",
        "La acidosis por cloro usualmente se resuelve sin bicarbonato; su uso no es requisito de transición y conlleva riesgos."
      ],
      "source": {
        "title": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state",
        "year": 2022,
        "url": "https://doi.org/10.1111/pedi.13406",
        "locator": "Secciones 6.4–6.6: resolución de cetosis, acidosis hiperclorémica y transición"
      },
      "reference": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state (2022), Secciones 6.4–6.6: resolución de cetosis, acidosis hiperclorémica y transición",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Interpretar evolución ácido-base y separar dos mecanismos de acidosis.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB091",
      "section": "Urgencias y terapia intensiva",
      "type": "caso",
      "skill": "Complicaciones",
      "topic": "Lesión cerebral asociada a CAD",
      "stem": "Niña de 4 años con CAD grave y alto riesgo de lesión cerebral. A las cinco horas de hidratación e insulina, glucosa 264 mg/dL y K 4.0 mmol/L; pH mejoró de 6.98 a 7.12. Aparece cefalea intensa, vómito, Glasgow de 15 a 12 y descenso sostenido de FC de 142 a 98 lpm sin sueño ni mejoría circulatoria que lo explique. No tiene focalidad clara. UCIP dispone de solución hipertónica y TC.",
      "prompt": "¿Qué secuencia de actuación es más apropiada?",
      "options": [
        "Administrar terapia hiperosmolar de inmediato, preservar perfusión y valorar neuroimagen después de iniciarla",
        "Realizar TC urgente antes de terapia hiperosmolar para distinguir edema de trombosis cerebral",
        "Reducir líquidos y esperar una nueva gasometría para decidir si se inicia tratamiento hiperosmolar",
        "Ajustar primero insulina y dextrosa para disminuir la glucosa más lentamente y reservar terapia hiperosmolar si persiste Glasgow bajo"
      ],
      "correct": 0,
      "why": "El deterioro neurológico junto con desaceleración cardíaca sostenida permite sospechar lesión cerebral clínicamente; iniciar tratamiento sin esperar imagen y mantener perfusión es prioritario.",
      "others": "La imagen puede ser necesaria si se sospecha otra lesión tratable, pero no debe demorar el tratamiento de la lesión cerebral sintomática. Ajustar líquidos puede formar parte del manejo, pero la nueva gasometría no sustituye intervención inmediata ante signos neurológicos. La evolución de glucosa no explica por sí sola la combinación de signos; esperar respuesta a ajustes metabólicos retrasaría terapia urgente.",
      "rationales": [
        "El deterioro neurológico junto con desaceleración cardíaca sostenida permite sospechar lesión cerebral clínicamente; iniciar tratamiento sin esperar imagen y mantener perfusión es prioritario.",
        "La imagen puede ser necesaria si se sospecha otra lesión tratable, pero no debe demorar el tratamiento de la lesión cerebral sintomática.",
        "Ajustar líquidos puede formar parte del manejo, pero la nueva gasometría no sustituye intervención inmediata ante signos neurológicos.",
        "La evolución de glucosa no explica por sí sola la combinación de signos; esperar respuesta a ajustes metabólicos retrasaría terapia urgente."
      ],
      "source": {
        "title": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state",
        "year": 2022,
        "url": "https://doi.org/10.1111/pedi.13406",
        "locator": "Sección 8.2.1: diagnóstico clínico y tratamiento de lesión cerebral"
      },
      "reference": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state (2022), Sección 8.2.1: diagnóstico clínico y tratamiento de lesión cerebral",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Priorizar deterioro neurológico sobre mejoría bioquímica aparente.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB092",
      "section": "Endocrinología",
      "type": "visual",
      "skill": "Interpretación",
      "topic": "Presentación mixta CAD/EHH",
      "stem": "Adolescente de 15 años con obesidad, poliuria de dos semanas y deshidratación marcada. Glucosa 864 mg/dL, Na medido 150 mmol/L, pH 7.18, HCO₃ 11 mmol/L, β-hidroxibutirato 5.1 mmol/L. TA 88/50 mmHg, taquicardia y llenado capilar prolongado. Se dispone de atención intensiva pediátrica. Osmolalidad efectiva estimada = 2 × Na medido + glucosa/18.",
      "prompt": "¿Qué enfoque integra mejor el fenotipo metabólico y la prioridad inicial?",
      "options": [
        "CAD convencional; utilizar únicamente el esquema habitual sin ajustar pérdidas osmóticas",
        "EHH puro; diferir insulina hasta que la glucosa deje de disminuir con líquidos aun si persiste cetosis importante",
        "CAD con hipernatremia aislada; corregir sodio rápidamente con líquidos hipotónicos antes de estabilizar circulación",
        "CAD/EHH mixto; estabilizar circulación primero, ajustar reposición a las pérdidas e iniciar insulina tras bolos iniciales y estabilización, con vigilancia estrecha"
      ],
      "correct": 3,
      "why": "El cuadro combina hiperosmolalidad y CAD. La reposición puede superar la habitual de CAD, con reevaluación frecuente; la insulina es necesaria tras estabilizar circulación y se vigilan K, fósforo y osmolalidad.",
      "others": "La osmolalidad efectiva es 348 mOsm/kg y existe cetosis/acidosis; el enfoque convencional puede infraestimar necesidades circulatorias. La cetonemia y acidosis cumplen criterios de CAD, por lo que no corresponde extrapolar sin más la estrategia de EHH puro. La hipernatremia no justifica retrasar restauración circulatoria ni una caída osmótica rápida; requiere corrección vigilada.",
      "rationales": [
        "La osmolalidad efectiva es 348 mOsm/kg y existe cetosis/acidosis; el enfoque convencional puede infraestimar necesidades circulatorias.",
        "La cetonemia y acidosis cumplen criterios de CAD, por lo que no corresponde extrapolar sin más la estrategia de EHH puro.",
        "La hipernatremia no justifica retrasar restauración circulatoria ni una caída osmótica rápida; requiere corrección vigilada.",
        "El cuadro combina hiperosmolalidad y CAD. La reposición puede superar la habitual de CAD, con reevaluación frecuente; la insulina es necesaria tras estabilizar circulación y se vigilan K, fósforo y osmolalidad."
      ],
      "source": {
        "title": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state",
        "year": 2022,
        "url": "https://doi.org/10.1111/pedi.13406",
        "locator": "Sección 10.3: presentación mixta CAD y EHH"
      },
      "reference": "ISPAD. Diabetic ketoacidosis and hyperglycemic hyperosmolar state (2022), Sección 10.3: presentación mixta CAD y EHH",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Calcular osmolalidad e integrar hipoperfusión, cetosis y pérdidas.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB093",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Neutropenia febril e infección fúngica",
      "stem": "Niño de 10 años con leucemia mieloide aguda en inducción, neutrófilos 40/mm³ y fiebre durante 110 h pese a betalactámico antipseudomónico adecuado. Sin trasplante hematopoyético ni profilaxis activa contra mohos. Hemocultivos repetidos negativos, TC pulmonar y ultrasonido abdominal sin lesiones; clínicamente estable. El hospital dispone de reevaluación especializada y estudios oportunos. El equipo acuerda explorar una estrategia antifúngica anticipada (preemptive).",
      "prompt": "¿Qué conducta es congruente con la guía internacional pediátrica 2023 bajo esa estrategia?",
      "options": [
        "Iniciar caspofungina en todos los casos, ya que una estrategia anticipada nunca es admisible en alto riesgo",
        "Diferir antifúngico mientras la evaluación permanezca negativa, con vigilancia y comienzo de tratamiento ante evidencia sugestiva de infección fúngica",
        "Suspender el betalactámico y diferir antifúngico hasta documentar recuperación medular",
        "Iniciar fluconazol como cobertura anticipada universal, independientemente de sospecha de mohos"
      ],
      "correct": 1,
      "why": "El caso cumple los criterios de la recomendación condicional para estrategia anticipada; exige evaluación y capacidad de intervención oportuna, no simple espera.",
      "others": "El tratamiento empírico es una alternativa válida, pero la guía permite un enfoque anticipado en pacientes seleccionados de alto riesgo sin trasplante ni profilaxis contra mohos. Persiste fiebre de alto riesgo, por lo que no cumple criterios de suspensión antibacteriana; la estrategia fúngica no sustituye ese manejo. Fluconazol no cubre mohos relevantes y la estrategia anticipada se basa en hallazgos diagnósticos, no en profilaxis universal.",
      "rationales": [
        "El tratamiento empírico es una alternativa válida, pero la guía permite un enfoque anticipado en pacientes seleccionados de alto riesgo sin trasplante ni profilaxis contra mohos.",
        "El caso cumple los criterios de la recomendación condicional para estrategia anticipada; exige evaluación y capacidad de intervención oportuna, no simple espera.",
        "Persiste fiebre de alto riesgo, por lo que no cumple criterios de suspensión antibacteriana; la estrategia fúngica no sustituye ese manejo.",
        "Fluconazol no cubre mohos relevantes y la estrategia anticipada se basa en hallazgos diagnósticos, no en profilaxis universal."
      ],
      "source": {
        "title": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update",
        "year": 2023,
        "url": "https://doi.org/10.1200/JCO.22.02224",
        "locator": "C5: estrategia anticipada en alto riesgo sin trasplante ni profilaxis contra mohos"
      },
      "reference": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update (2023), C5: estrategia anticipada en alto riesgo sin trasplante ni profilaxis contra mohos",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Discriminar entre estrategias válidas según población, recursos y riesgo.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB094",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Neutropenia febril e infección fúngica",
      "stem": "Adolescente de 13 años, día +45 de trasplante alogénico, bajo inmunosupresión por enfermedad injerto contra huésped y neutropenia prolongada. Continúa febril después de 100 h de antibacteriano de amplio espectro; cultivos negativos, sin tos, disnea, dolor facial ni rinorrea. Radiografía de tórax sin infiltrados y estabilidad hemodinámica. Se inicia evaluación de infección fúngica invasiva y se discute tratamiento antifúngico con infectología.",
      "prompt": "¿Qué estrategia de imagen recomienda prioritariamente el consenso pediátrico 2023 en este contexto?",
      "options": [
        "TC de tórax pese a radiografía normal; considerar imagen abdominal según contexto y no indicar TC sinusal rutinaria sin síntomas",
        "TC de senos paranasales y radiografía de tórax seriada; reservar TC torácica para síntomas respiratorios",
        "TC torácica solo si el galactomanano sérico resulta positivo",
        "Ultrasonido abdominal como único estudio inicial mientras no aparezcan signos respiratorios"
      ],
      "correct": 0,
      "why": "El alto riesgo y fiebre prolongada justifican TC pulmonar incluso sin síntomas respiratorios; el estudio abdominal puede considerarse y la TC sinusal no se indica rutinariamente sin síntomas localizadores.",
      "others": "La radiografía tiene sensibilidad limitada para lesiones pulmonares fúngicas; los senos paranasales no son la prioridad rutinaria sin manifestaciones locales. Un resultado sérico negativo no excluye infección fúngica y no debe condicionar el estudio pulmonar indicado. La imagen abdominal es complementaria; no sustituye la TC pulmonar recomendada.",
      "rationales": [
        "El alto riesgo y fiebre prolongada justifican TC pulmonar incluso sin síntomas respiratorios; el estudio abdominal puede considerarse y la TC sinusal no se indica rutinariamente sin síntomas localizadores.",
        "La radiografía tiene sensibilidad limitada para lesiones pulmonares fúngicas; los senos paranasales no son la prioridad rutinaria sin manifestaciones locales.",
        "Un resultado sérico negativo no excluye infección fúngica y no debe condicionar el estudio pulmonar indicado.",
        "La imagen abdominal es complementaria; no sustituye la TC pulmonar recomendada."
      ],
      "source": {
        "title": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update",
        "year": 2023,
        "url": "https://doi.org/10.1200/JCO.22.02224",
        "locator": "C3a–C3c: imagen para fiebre prolongada y riesgo fúngico elevado"
      },
      "reference": "Lehrnbecher et al. Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update (2023), C3a–C3c: imagen para fiebre prolongada y riesgo fúngico elevado",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar estado postrasplante, tiempo de fiebre y limitación de imagen inicial.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB095",
      "section": "Nefro-urología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Síndrome nefrótico resistente a esteroides",
      "stem": "Escolar de 7 años con síndrome nefrótico de primera presentación. Cociente proteína/creatinina en primera orina al diagnóstico 9.0 g/g, albúmina 1.6 g/dL. Tras cuatro semanas de prednisona estándar con adherencia documentada, el cociente es 0.9 g/g, albúmina 3.3 g/dL, edema resuelto y función renal normal. Nefrología verifica remisión parcial, sin remisión completa.",
      "prompt": "¿Qué estrategia integra mejor la respuesta y la evaluación etiológica conforme a KDIGO 2025?",
      "options": [
        "Clasificar de inmediato como corticosensible tardío y comenzar esquema de recaídas",
        "Considerar remisión parcial como resistencia irreversible y cambiar a inhibidor de calcineurina sin completar evaluación",
        "Aprovechar el período de confirmación hasta la sexta semana, mantener vigilancia y avanzar estudio genético/biopsia según nefrología",
        "Dar por terminada la inducción y observar sin evaluar etiología mientras no reaparezca edema"
      ],
      "correct": 2,
      "why": "KDIGO distingue esta situación de falta absoluta de respuesta; debe completar evaluación, vigilar y reclasificar según alcance o no remisión completa a las seis semanas.",
      "others": "La respuesta tardía corticosensible requiere remisión completa durante el período de confirmación; todavía no la ha alcanzado. La remisión parcial a las cuatro semanas permite un período adicional de confirmación y estudio de causas; no equivale a resistencia irreversible. La resolución del edema no prueba remisión completa; persiste proteinuria y requiere evaluación especializada.",
      "rationales": [
        "La respuesta tardía corticosensible requiere remisión completa durante el período de confirmación; todavía no la ha alcanzado.",
        "La remisión parcial a las cuatro semanas permite un período adicional de confirmación y estudio de causas; no equivale a resistencia irreversible.",
        "KDIGO distingue esta situación de falta absoluta de respuesta; debe completar evaluación, vigilar y reclasificar según alcance o no remisión completa a las seis semanas.",
        "La resolución del edema no prueba remisión completa; persiste proteinuria y requiere evaluación especializada."
      ],
      "source": {
        "title": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children",
        "year": 2025,
        "url": "https://kdigo.org/wp-content/uploads/2025/04/KDIGO-2025-Guideline-for-Nephrotic-Syndrome-in-Children.pdf",
        "locator": "Figura 1 y sección 1.4: período de confirmación"
      },
      "reference": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children (2025), Figura 1 y sección 1.4: período de confirmación",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Interpretar respuesta parcial cuantificada y decidir tiempo de reclasificación.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB096",
      "section": "Nefro-urología",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Resistencia a inhibidores de calcineurina",
      "stem": "Niña de 9 años con síndrome nefrótico corticorresistente, biopsia compatible con glomeruloesclerosis focal y segmentaria, evaluación genética sin causa identificada. Ha recibido tacrolimus durante seis meses con adherencia confirmada, niveles adecuados y bloqueo del sistema renina-angiotensina tolerado. Cociente proteína/creatinina inicial 8.0 g/g y actual 5.4 g/g, albúmina 2.1 g/dL. No alcanza remisión parcial. Sin infección activa.",
      "prompt": "¿Qué decisión corresponde discutir con nefrología según KDIGO 2025?",
      "options": [
        "Mantener tacrolimus hasta 12 meses porque toda respuesta completa puede tardar ese tiempo",
        "Suspender tacrolimus por ausencia de respuesta parcial a seis meses y reevaluar alternativas especializadas o ensayos",
        "Aumentar sistemáticamente tacrolimus por encima del rango de monitorización durante otros seis meses",
        "Cambiar automáticamente a ciclofosfamida como tratamiento estándar tras resistencia a tacrolimus"
      ],
      "correct": 1,
      "why": "La guía identifica resistencia al inhibidor en esta situación y recomienda suspenderlo; procede valorar opciones individualizadas, incluidos ensayos cuando existan.",
      "others": "La posibilidad de respuesta completa tardía se refiere a quienes alcanzan respuesta parcial; no justifica continuar un inhibidor sin respuesta parcial tras seis meses adecuados. Aumentar por encima del rango sin justificación expone a nefrotoxicidad; adherencia y exposición ya se verificaron. La ciclofosfamida no es el estándar recomendado para síndrome nefrótico corticorresistente y no debe seleccionarse automáticamente.",
      "rationales": [
        "La posibilidad de respuesta completa tardía se refiere a quienes alcanzan respuesta parcial; no justifica continuar un inhibidor sin respuesta parcial tras seis meses adecuados.",
        "La guía identifica resistencia al inhibidor en esta situación y recomienda suspenderlo; procede valorar opciones individualizadas, incluidos ensayos cuando existan.",
        "Aumentar por encima del rango sin justificación expone a nefrotoxicidad; adherencia y exposición ya se verificaron.",
        "La ciclofosfamida no es el estándar recomendado para síndrome nefrótico corticorresistente y no debe seleccionarse automáticamente."
      ],
      "source": {
        "title": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children",
        "year": 2025,
        "url": "https://kdigo.org/wp-content/uploads/2025/04/KDIGO-2025-Guideline-for-Nephrotic-Syndrome-in-Children.pdf",
        "locator": "Figura 4 y sección 1.4.1: ausencia de remisión parcial tras seis meses de CNI"
      },
      "reference": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children (2025), Figura 4 y sección 1.4.1: ausencia de remisión parcial tras seis meses de CNI",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir respuesta parcial, resistencia y toxicidad por escalamiento injustificado.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB097",
      "section": "Nefro-urología",
      "type": "directa",
      "skill": "Farmacología",
      "topic": "Toxicidad por inhibidores de calcineurina",
      "stem": "Paciente de 12 años con síndrome nefrótico dependiente de glucocorticoides en remisión con ciclosporina. Creatinina basal 0.60 mg/dL; durante seguimiento ascendió a 0.84 y luego a 0.87 mg/dL. Se descartaron hipovolemia, obstrucción, infección y otras causas reversibles; la proteinuria continúa en remisión. El nivel valle está dentro del objetivo individual.",
      "prompt": "¿Qué ajuste farmacológico corresponde considerar primero conforme a KDIGO 2025?",
      "options": [
        "Mantener dosis porque el valle está dentro de objetivo y la proteinuria en remisión",
        "Cambiar inmediatamente a tacrolimus a exposición equivalente sin reevaluar función renal",
        "Reducir ciclosporina y reevaluar creatinina; suspenderla si no mejora tras reducción",
        "Aumentar el bloqueo renina-angiotensina para contrarrestar el aumento de creatinina"
      ],
      "correct": 2,
      "why": "El incremento es 45% respecto a basal. La guía contempla reducir dosis ante aumento superior al 30% o progresivo y discontinuar si no desciende después de reducirla.",
      "others": "Los niveles valle no excluyen nefrotoxicidad; el aumento de creatinina sobre basal es clínicamente relevante. Cambiar entre inhibidores de calcineurina no elimina necesariamente la toxicidad de clase y no es la primera medida indicada por esta guía. Intensificar bloqueo renina-angiotensina sin indicación puede empeorar función renal; no corrige la exposición al inhibidor.",
      "rationales": [
        "Los niveles valle no excluyen nefrotoxicidad; el aumento de creatinina sobre basal es clínicamente relevante.",
        "Cambiar entre inhibidores de calcineurina no elimina necesariamente la toxicidad de clase y no es la primera medida indicada por esta guía.",
        "El incremento es 45% respecto a basal. La guía contempla reducir dosis ante aumento superior al 30% o progresivo y discontinuar si no desciende después de reducirla.",
        "Intensificar bloqueo renina-angiotensina sin indicación puede empeorar función renal; no corrige la exposición al inhibidor."
      ],
      "source": {
        "title": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children",
        "year": 2025,
        "url": "https://kdigo.org/wp-content/uploads/2025/04/KDIGO-2025-Guideline-for-Nephrotic-Syndrome-in-Children.pdf",
        "locator": "Figura 3: titulación individual y aumento de creatinina mayor del 30%"
      },
      "reference": "KDIGO. Clinical Practice Guideline for Nephrotic Syndrome in Children (2025), Figura 3: titulación individual y aumento de creatinina mayor del 30%",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Calcular cambio relativo y ponderar eficacia frente a toxicidad.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB098",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Artritis bacteriana con cultivos negativos",
      "stem": "Niño de 22 meses con cojera febril, derrame de rodilla y líquido sinovial con 38 000 leucocitos/mm³, predominio neutrofílico. PCR moderadamente elevada. Se obtuvo aspirado antes de antibiótico; tinción de Gram y cultivos habituales permanecen negativos a las 48 h. Mejora clínica parcial con tratamiento empírico. Se conservó líquido sinovial y hay acceso a pruebas moleculares. No existen datos epidemiológicos de tuberculosis o Lyme.",
      "prompt": "¿Qué estudio adicional tiene mayor utilidad etiológica inmediata en esta edad?",
      "options": [
        "PCR dirigida a Kingella kingae en líquido sinovial conservado",
        "Repetir exclusivamente hemocultivos tras 48 h de antibiótico y retirar evaluación del aspirado",
        "Solicitar anticuerpos antinucleares como sustituto de pruebas microbiológicas",
        "Realizar PCR de Kingella exclusivamente en exudado orofaríngeo e interpretar positividad como confirmación articular"
      ],
      "correct": 0,
      "why": "Kingella es un patógeno fastidioso relevante entre 6 y 48 meses; la detección molecular en líquido articular puede identificarlo cuando cultivos ordinarios son negativos.",
      "others": "Repetir hemocultivos puede ser pertinente ante nuevas indicaciones, pero no aprovecha la muestra del foco para detectar este patógeno fastidioso. Una etiología inflamatoria puede entrar en el diferencial si la evolución lo sugiere, pero ANA no sustituye la evaluación microbiológica del cuadro. La detección orofaríngea puede representar colonización; no confirma por sí sola etiología articular como una prueba positiva del líquido afectado.",
      "rationales": [
        "Kingella es un patógeno fastidioso relevante entre 6 y 48 meses; la detección molecular en líquido articular puede identificarlo cuando cultivos ordinarios son negativos.",
        "Repetir hemocultivos puede ser pertinente ante nuevas indicaciones, pero no aprovecha la muestra del foco para detectar este patógeno fastidioso.",
        "Una etiología inflamatoria puede entrar en el diferencial si la evolución lo sugiere, pero ANA no sustituye la evaluación microbiológica del cuadro.",
        "La detección orofaríngea puede representar colonización; no confirma por sí sola etiología articular como una prueba positiva del líquido afectado."
      ],
      "source": {
        "title": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics",
        "year": 2023,
        "url": "https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/",
        "locator": "Sección III: pruebas moleculares de líquido sinovial y patógenos fastidiosos"
      },
      "reference": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics (2023), Sección III: pruebas moleculares de líquido sinovial y patógenos fastidiosos",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar edad, rendimiento microbiológico, sitio de muestra y evolución.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB099",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Artritis bacteriana complicada",
      "stem": "Niño de 9 años con artritis bacteriana de cadera por S. aureus sensible a meticilina. Drenaje inicial y cefazolina IV a dosis revisada; a las 72 h persisten fiebre y dolor, PCR de 115 a 167 mg/L y hemocultivo de control positivo. La RM muestra absceso subperióstico femoral adyacente no drenado. El antibiograma sigue confirmando sensibilidad, sin reacción al fármaco.",
      "prompt": "¿Qué modificación es prioritaria para abordar la mala respuesta?",
      "options": [
        "Sustituir cefazolina por vancomicina y mantener manejo conservador del absceso",
        "Añadir cobertura antipseudomónica y esperar cinco días antes de reevaluar control del foco",
        "Mantener antimicrobiano dirigido, reevaluar urgentemente con cirugía el drenaje del foco y ajustar duración por osteomielitis adyacente",
        "Completar 10–14 días de tratamiento como artritis primaria, con transición oral al desaparecer la fiebre"
      ],
      "correct": 2,
      "why": "La persistencia de bacteriemia y el absceso documentado obligan a reevaluar control del foco con el equipo quirúrgico; la osteomielitis modifica el curso respecto a artritis primaria.",
      "others": "La persistencia puede explicarse por el foco no controlado; el aislamiento sigue siendo sensible y el caso no establece superioridad de vancomicina. La ampliación empírica no resuelve un absceso no drenado y no se apoya en la microbiología disponible. El curso corto corresponde a artritis primaria no complicada con respuesta rápida, condiciones que este niño no cumple.",
      "rationales": [
        "La persistencia puede explicarse por el foco no controlado; el aislamiento sigue siendo sensible y el caso no establece superioridad de vancomicina.",
        "La ampliación empírica no resuelve un absceso no drenado y no se apoya en la microbiología disponible.",
        "La persistencia de bacteriemia y el absceso documentado obligan a reevaluar control del foco con el equipo quirúrgico; la osteomielitis modifica el curso respecto a artritis primaria.",
        "El curso corto corresponde a artritis primaria no complicada con respuesta rápida, condiciones que este niño no cumple."
      ],
      "source": {
        "title": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics",
        "year": 2023,
        "url": "https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/",
        "locator": "VI: respuesta insuficiente y procedimientos adicionales; XII: duración según extensión"
      },
      "reference": "PIDS/IDSA. 2023 Guideline on Diagnosis and Management of Acute Bacterial Arthritis in Pediatrics (2023), VI: respuesta insuficiente y procedimientos adicionales; XII: duración según extensión",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir fracaso por foco no controlado de fracaso por resistencia antimicrobiana.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB100",
      "section": "Gastroenterología y nutrición",
      "type": "visual",
      "skill": "Interpretación",
      "topic": "Enfermedad celíaca con serología discordante",
      "stem": "Niña de 9 años con talla baja, ferropenia refractaria y consumo habitual de gluten. IgA total normal; anticuerpos antitransglutaminasa IgA (tTG) de 78 U/mL (límite superior 10 U/mL), EMA-IgA positivo en una segunda muestra. HLA-DQ2 positivo. La familia solicita evitar endoscopia y comenzar dieta sin gluten.",
      "prompt": "Según ESPGHAN 2020, ¿qué conducta permite establecer el diagnóstico con mayor rigor?",
      "options": [
        "Confirmar celiaquía sin biopsia por EMA positivo y HLA compatible",
        "Mantener gluten hasta obtener biopsias de bulbo y duodeno distal, coordinadas con gastroenterología",
        "Repetir tTG tras seis semanas de dieta sin gluten; confirmar si disminuye",
        "Confirmar sin biopsia porque la clínica y la ferropenia sustituyen el umbral serológico"
      ],
      "correct": 1,
      "why": "Se requieren al menos cuatro muestras distales y una del bulbo cuando el tTG positivo es inferior a diez veces el límite. Mantener exposición al gluten protege el rendimiento diagnóstico.",
      "others": "El EMA y el HLA apoyan la sospecha, pero el tTG es 7.8 veces el límite superior, insuficiente para la vía sin biopsia. La retirada anticipada del gluten puede disminuir anticuerpos y cambios histológicos, haciendo más difícil confirmar el diagnóstico. La clínica no modifica el umbral requerido para la estrategia sin histología; el HLA compatible tampoco lo sustituye.",
      "rationales": [
        "El EMA y el HLA apoyan la sospecha, pero el tTG es 7.8 veces el límite superior, insuficiente para la vía sin biopsia.",
        "Se requieren al menos cuatro muestras distales y una del bulbo cuando el tTG positivo es inferior a diez veces el límite. Mantener exposición al gluten protege el rendimiento diagnóstico.",
        "La retirada anticipada del gluten puede disminuir anticuerpos y cambios histológicos, haciendo más difícil confirmar el diagnóstico.",
        "La clínica no modifica el umbral requerido para la estrategia sin histología; el HLA compatible tampoco lo sustituye."
      ],
      "source": {
        "title": "ESPGHAN Guidelines for Diagnosing Coeliac Disease",
        "year": 2020,
        "url": "https://doi.org/10.1097/MPG.0000000000002497",
        "locator": "Algoritmo diagnóstico y muestreo duodenal con tTG-IgA <10× límite superior"
      },
      "reference": "ESPGHAN Guidelines for Diagnosing Coeliac Disease (2020), Algoritmo diagnóstico y muestreo duodenal con tTG-IgA <10× límite superior",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Calcular el múltiplo del límite normal e interpretar serología discordante con criterios de diagnóstico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB101",
      "section": "Gastroenterología y nutrición",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Celiaquía potencial",
      "stem": "Escolar de 11 años, asintomático, hermano de paciente con celiaquía. Mientras consume gluten, tTG-IgA 4.5 veces el límite superior, EMA-IgA positivo y concentración total de IgA normal. Endoscopia con una muestra de bulbo y cuatro distales bien orientadas, informadas Marsh 0–1. Segunda revisión por patólogo experto confirma ausencia de atrofia; no hay otra causa identificada de los anticuerpos.",
      "prompt": "¿Cuál es la mejor clasificación y estrategia de seguimiento?",
      "options": [
        "Celiaquía descartada definitivamente; alta sin controles serológicos",
        "Celiaquía confirmada con atrofia vellositaria; indicar dieta estricta de por vida por histología",
        "Celiaquía potencial; seguimiento especializado de clínica y serología, reevaluando necesidad de biopsia",
        "Falso positivo confirmado; repetir únicamente HLA-DQ2/DQ8 cada año"
      ],
      "correct": 2,
      "why": "La combinación de autoanticuerpos específicos y cambios mínimos corresponde a celiaquía potencial tras revisar la calidad de las muestras. Se necesita seguimiento estrecho.",
      "others": "La autoimunidad confirmada puede preceder a lesiones histológicas; la biopsia normal no excluye evolución futura. Marsh 0–1 no representa atrofia vellosa. La conducta debe individualizarse en lugar de afirmar enfermedad atrófica confirmada. El HLA es estable y no permite vigilar progresión histológica ni establecer que el resultado sea falso.",
      "rationales": [
        "La autoimunidad confirmada puede preceder a lesiones histológicas; la biopsia normal no excluye evolución futura.",
        "Marsh 0–1 no representa atrofia vellosa. La conducta debe individualizarse en lugar de afirmar enfermedad atrófica confirmada.",
        "La combinación de autoanticuerpos específicos y cambios mínimos corresponde a celiaquía potencial tras revisar la calidad de las muestras. Se necesita seguimiento estrecho.",
        "El HLA es estable y no permite vigilar progresión histológica ni establecer que el resultado sea falso."
      ],
      "source": {
        "title": "ESPGHAN Guidelines for Diagnosing Coeliac Disease",
        "year": 2020,
        "url": "https://doi.org/10.1097/MPG.0000000000002497",
        "locator": "Resultados serológicos e histológicos discordantes; seguimiento de Marsh 0/I con autoimunidad"
      },
      "reference": "ESPGHAN Guidelines for Diagnosing Coeliac Disease (2020), Resultados serológicos e histológicos discordantes; seguimiento de Marsh 0/I con autoimunidad",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir predisposición, autoimunidad y lesión histológica sin cerrar prematuramente el diagnóstico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB102",
      "section": "Infectología y vacunología",
      "type": "visual",
      "skill": "Tratamiento",
      "topic": "Lactante febril con probable ITU",
      "stem": "Lactante de 46 días, nacido a término, previamente sano, fiebre rectal de 38.4 °C, buen aspecto y alimentación conservada. Sin bronquiolitis ni foco cutáneo. Orina obtenida por cateterismo: esterasa positiva y 22 leucocitos/campo; urocultivo y hemocultivo en proceso. Procalcitonina 0.15 ng/mL, PCR 6 mg/L y neutrófilos absolutos 2500/mm³. Familia con transporte, comunicación y reevaluación asegurada en 24 h.",
      "prompt": "Según AAP 2021, ¿cuál es la conducta apropiada tras valorar criterios de inclusión y seguimiento?",
      "options": [
        "Obtener LCR obligatoriamente por piuria e iniciar cefalosporina IV hospitalaria",
        "Observar sin antibiótico hasta confirmar el urocultivo porque los marcadores son normales",
        "Hospitalizar y tratar vía IV sin obtener LCR por tener menos de 60 días",
        "Iniciar antimicrobiano oral adecuado para probable ITU; puede omitirse LCR y ofrecerse manejo ambulatorio estrecho"
      ],
      "correct": 3,
      "why": "Cumple las condiciones de la estrategia oral y no requiere rutinariamente LCR. Reevaluar en 24 horas y actuar sobre resultados de cultivos es esencial.",
      "others": "En el grupo de 29–60 días con marcadores normales, la orina positiva por sí sola no obliga a obtener LCR. El uroanálisis positivo con marcadores normales apoya tratamiento oral empírico mientras se revisa el cultivo; la ausencia de inflamación sistémica no excluye ITU. La edad por sí sola no obliga a vía IV en este grupo de bajo riesgo; la posibilidad de seguimiento es determinante.",
      "rationales": [
        "En el grupo de 29–60 días con marcadores normales, la orina positiva por sí sola no obliga a obtener LCR.",
        "El uroanálisis positivo con marcadores normales apoya tratamiento oral empírico mientras se revisa el cultivo; la ausencia de inflamación sistémica no excluye ITU.",
        "La edad por sí sola no obliga a vía IV en este grupo de bajo riesgo; la posibilidad de seguimiento es determinante.",
        "Cumple las condiciones de la estrategia oral y no requiere rutinariamente LCR. Reevaluar en 24 horas y actuar sobre resultados de cultivos es esencial."
      ],
      "source": {
        "title": "AAP Clinical Practice Guideline: Well-Appearing Febrile Infants 8 to 60 Days Old",
        "year": 2021,
        "url": "https://doi.org/10.1542/peds.2021-052228",
        "locator": "KAS 15–20: lactantes 29–60 días, uroanálisis positivo y marcadores inflamatorios normales"
      },
      "reference": "AAP Clinical Practice Guideline: Well-Appearing Febrile Infants 8 to 60 Days Old (2021), KAS 15–20: lactantes 29–60 días, uroanálisis positivo y marcadores inflamatorios normales",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar edad, origen de muestra, marcadores y capacidad de seguimiento para elegir vía y lugar de tratamiento.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB103",
      "section": "Infectología y vacunología",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Lactante febril con discordancia inflamatoria",
      "stem": "Lactante de 25 días, nacido a las 39 semanas, sin antecedentes perinatales relevantes, fiebre rectal 38.2 °C y aspecto clínico conservado. Uroanálisis por cateterismo negativo; hemocultivo obtenido. Procalcitonina 0.82 ng/mL, PCR 8 mg/L y neutrófilos 3000/mm³. No ha recibido antibiótico y no presenta contraindicaciones a punción lumbar. Se encuentra en un hospital con vigilancia neonatal.",
      "prompt": "Según AAP 2021, ¿qué decisión integra correctamente su edad y resultados?",
      "options": [
        "Obtener LCR y proporcionar antimicrobianos parenterales y vigilancia hospitalaria, ajustando a resultados",
        "Omitir LCR y observar en domicilio porque dos marcadores y la orina son normales",
        "Repetir procalcitonina en 24 h sin tratar para comprobar si persiste elevada",
        "Tratar vía oral una bacteriemia presunta y reservar LCR para hemocultivo positivo"
      ],
      "correct": 0,
      "why": "En el grupo de 22–28 días basta un marcador anormal para indicar estudio de LCR. La evaluación de meningitis y el tratamiento parenteral no se sustituyen por el buen aspecto.",
      "others": "El grupo etario tiene riesgo significativo de infección invasiva y la procalcitonina anormal impide aplicar la vía de bajo riesgo. La discordancia entre marcadores no descarta infección bacteriana invasiva; posponer la evaluación no es la conducta indicada. La positividad del hemocultivo no debe ser requisito para estudiar LCR en un lactante de esta edad con marcador anormal.",
      "rationales": [
        "En el grupo de 22–28 días basta un marcador anormal para indicar estudio de LCR. La evaluación de meningitis y el tratamiento parenteral no se sustituyen por el buen aspecto.",
        "El grupo etario tiene riesgo significativo de infección invasiva y la procalcitonina anormal impide aplicar la vía de bajo riesgo.",
        "La discordancia entre marcadores no descarta infección bacteriana invasiva; posponer la evaluación no es la conducta indicada.",
        "La positividad del hemocultivo no debe ser requisito para estudiar LCR en un lactante de esta edad con marcador anormal."
      ],
      "source": {
        "title": "AAP Clinical Practice Guideline: Well-Appearing Febrile Infants 8 to 60 Days Old",
        "year": 2021,
        "url": "https://doi.org/10.1542/peds.2021-052228",
        "locator": "KAS 10–13: lactantes 22–28 días con al menos un marcador inflamatorio anormal"
      },
      "reference": "AAP Clinical Practice Guideline: Well-Appearing Febrile Infants 8 to 60 Days Old (2021), KAS 10–13: lactantes 22–28 días con al menos un marcador inflamatorio anormal",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Reconocer que un único marcador anormal cambia la vía de evaluación invasiva en un grupo de edad específico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB104",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Apnea obstructiva residual tras adenoamigdalectomía",
      "stem": "Niño de 9 años con obesidad grave, cinco meses después de adenoamigdalectomía. Persiste somnolencia y dificultad escolar; polisomnografía muestra índice obstructivo 14/h y nadir de SpO₂ 79%. Evaluación especializada de vía aérea no identifica sitio de obstrucción corregible de forma específica. No hay hipoventilación sostenida. Se inicia programa multidisciplinario de peso.",
      "prompt": "Según ATS 2024, ¿qué estrategia es apropiada para la apnea residual mientras se aborda la obesidad?",
      "options": [
        "Esperar pérdida de peso antes de ofrecer soporte respiratorio, con nueva polisomnografía anual",
        "Considerar CPAP con titulación y seguimiento de adherencia junto al manejo del peso",
        "Indicar amigdalectomía lingual aunque no exista hipertrofia ni obstrucción localizada",
        "Utilizar oxígeno nocturno como sustituto de tratamiento de la obstrucción"
      ],
      "correct": 1,
      "why": "ATS contempla CPAP cuando no existe tratamiento anatómico específico, y recomienda considerar intervención de peso en obesidad. Son estrategias complementarias.",
      "others": "El trastorno residual es grave; esperar a que el peso cambie deja sin tratar una obstrucción clínicamente significativa. La cirugía de amígdala lingual requiere correlación con una obstrucción anatómica demostrada; no se justifica por gravedad aislada. El oxígeno puede modificar saturación, pero no corrige colapso de vía aérea y no sustituye terapia dirigida de la apnea.",
      "rationales": [
        "El trastorno residual es grave; esperar a que el peso cambie deja sin tratar una obstrucción clínicamente significativa.",
        "ATS contempla CPAP cuando no existe tratamiento anatómico específico, y recomienda considerar intervención de peso en obesidad. Son estrategias complementarias.",
        "La cirugía de amígdala lingual requiere correlación con una obstrucción anatómica demostrada; no se justifica por gravedad aislada.",
        "El oxígeno puede modificar saturación, pero no corrige colapso de vía aérea y no sustituye terapia dirigida de la apnea."
      ],
      "source": {
        "title": "ATS: Management of Persistent Post-adenotonsillectomy Obstructive Sleep Apnea in Children",
        "year": 2024,
        "url": "https://doi.org/10.1164/rccm.202310-1857ST",
        "locator": "Recomendaciones 1 y 3: CPAP y control ponderal en apnea persistente"
      },
      "reference": "ATS: Management of Persistent Post-adenotonsillectomy Obstructive Sleep Apnea in Children (2024), Recomendaciones 1 y 3: CPAP y control ponderal en apnea persistente",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar severidad polisomnográfica, anatomía y comorbilidad para elegir tratamiento combinado.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB105",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Apnea residual y obstrucción lingual",
      "stem": "Adolescente de 12 años con trisomía 21, adenoamigdalectomía previa y apnea obstructiva persistente (índice obstructivo 18/h). No tolera CPAP pese a adaptación y apoyo especializado. Endoscopia bajo sueño inducido demuestra hipertrofia importante de amígdala lingual como sitio dominante; no hay recidiva adenoidea ni colapso supraglótico significativo. Familia desea explorar alternativas quirúrgicas.",
      "prompt": "¿Qué opción anatómicamente dirigida puede discutirse conforme a ATS 2024?",
      "options": [
        "Adenoidectomía de revisión pese a ausencia de obstrucción adenoidea",
        "Supraglotoplastia por el índice obstructivo elevado",
        "Amigdalectomía lingual, con explicación de beneficios inciertos y riesgo de enfermedad residual",
        "Expansión maxilar rápida como sustituto de toda cirugía sin demostrar constricción maxilar"
      ],
      "correct": 2,
      "why": "La hipertrofia lingual es un blanco potencial de cirugía conforme a una recomendación condicional de muy baja certeza; requiere valoración especializada y reevaluación posterior.",
      "others": "No existe evidencia en el caso de tejido adenoideo obstructivo; repetir esa intervención no aborda el sitio identificado. La supraglotoplastia se considera ante laringomalacia dependiente del sueño, no demostrada aquí. La expansión ortodóncica depende de características craneofaciales apropiadas y no sustituye una evaluación del sitio obstructivo demostrado.",
      "rationales": [
        "No existe evidencia en el caso de tejido adenoideo obstructivo; repetir esa intervención no aborda el sitio identificado.",
        "La supraglotoplastia se considera ante laringomalacia dependiente del sueño, no demostrada aquí.",
        "La hipertrofia lingual es un blanco potencial de cirugía conforme a una recomendación condicional de muy baja certeza; requiere valoración especializada y reevaluación posterior.",
        "La expansión ortodóncica depende de características craneofaciales apropiadas y no sustituye una evaluación del sitio obstructivo demostrado."
      ],
      "source": {
        "title": "ATS: Management of Persistent Post-adenotonsillectomy Obstructive Sleep Apnea in Children",
        "year": 2024,
        "url": "https://doi.org/10.1164/rccm.202310-1857ST",
        "locator": "Recomendaciones 2, 4 y 5: tratamiento específico según sitio de obstrucción"
      },
      "reference": "ATS: Management of Persistent Post-adenotonsillectomy Obstructive Sleep Apnea in Children (2024), Recomendaciones 2, 4 y 5: tratamiento específico según sitio de obstrucción",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Seleccionar terapia de rescate por anatomía demostrada y reconocer la incertidumbre de la evidencia.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB106",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Invaginación ileocólica tras reducción parcial",
      "stem": "Lactante de 13 meses con invaginación ileocólica confirmada. Tras reanimación, está estable, sin defensa ni signos de perforación. Primer enema neumático desplaza la cabeza desde colon transverso a válvula ileocecal, pero no se documenta reducción completa. Se mantiene perfusión mural al Doppler; cirugía pediátrica y radiología intervencionista disponibles.",
      "prompt": "¿Qué conducta es razonable antes de proceder a cirugía, conforme a la revisión APSA?",
      "options": [
        "Indicar laparotomía inmediata por cualquier fracaso del primer enema",
        "Repetir enema solo si aparece deterioro hemodinámico",
        "Dar por resuelta la invaginación por el desplazamiento de la cabeza y reiniciar dieta",
        "Considerar un segundo intento diferido de reducción bajo vigilancia, con disponibilidad quirúrgica"
      ],
      "correct": 3,
      "why": "Los tres criterios —estabilidad, ausencia de peritonitis y reducción parcial previa— respaldan considerar un nuevo intento diferido con vigilancia.",
      "others": "El fracaso parcial en un niño estable sin peritonitis no obliga a operar inmediatamente; un nuevo intento seleccionado puede evitar cirugía. La inestabilidad es una contraindicación para repetir reducción no quirúrgica y exige reevaluación urgente. El avance parcial no equivale a reducción completa; persiste riesgo de isquemia y recurrencia clínica.",
      "rationales": [
        "El fracaso parcial en un niño estable sin peritonitis no obliga a operar inmediatamente; un nuevo intento seleccionado puede evitar cirugía.",
        "La inestabilidad es una contraindicación para repetir reducción no quirúrgica y exige reevaluación urgente.",
        "El avance parcial no equivale a reducción completa; persiste riesgo de isquemia y recurrencia clínica.",
        "Los tres criterios —estabilidad, ausencia de peritonitis y reducción parcial previa— respaldan considerar un nuevo intento diferido con vigilancia."
      ],
      "source": {
        "title": "APSA Outcomes and Evidence-Based Practice Committee: Management of Intussusception in Children, systematic review",
        "year": 2021,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7920908/",
        "locator": "Pregunta 2: criterios para delayed repeat enema"
      },
      "reference": "APSA Outcomes and Evidence-Based Practice Committee: Management of Intussusception in Children, systematic review (2021), Pregunta 2: criterios para delayed repeat enema",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Diferenciar fracaso parcial susceptible de rescate de indicaciones de exploración urgente.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB107",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Invaginación con punto guía patológico",
      "stem": "Escolar de 7 años con tercer episodio de invaginación ileocólica en tres meses, los dos anteriores reducidos por enema. En esta ocasión se consigue reducción completa y estabilidad clínica, pero una evaluación por imagen identifica una lesión intraluminal persistente que actúa como punto guía, confirmada por radiología y cirugía pediátricas. No hay peritonitis.",
      "prompt": "¿Qué estrategia aborda mejor el riesgo de nuevos episodios?",
      "options": [
        "Planear evaluación y tratamiento quirúrgico del punto guía, individualizando el procedimiento según la lesión",
        "Dar alta con el mismo plan que una primera invaginación idiopática sin lesión",
        "Programar enemas profilácticos periódicos hasta que desaparezca el punto guía",
        "Observar indefinidamente porque la reducción radiológica completa descarta necesidad de cirugía"
      ],
      "correct": 0,
      "why": "La reducción resuelve el episodio, no elimina una lesión anatómica causante; la evaluación quirúrgica dirigida es apropiada.",
      "others": "La edad, recurrencia y punto guía identificado distinguen este caso de una invaginación idiopática de lactante. Los enemas tratan episodios de invaginación; no eliminan un punto guía estructural ni son profilaxis programada. El éxito de la reducción no excluye la indicación quirúrgica cuando hay una causa patológica demostrada.",
      "rationales": [
        "La reducción resuelve el episodio, no elimina una lesión anatómica causante; la evaluación quirúrgica dirigida es apropiada.",
        "La edad, recurrencia y punto guía identificado distinguen este caso de una invaginación idiopática de lactante.",
        "Los enemas tratan episodios de invaginación; no eliminan un punto guía estructural ni son profilaxis programada.",
        "El éxito de la reducción no excluye la indicación quirúrgica cuando hay una causa patológica demostrada."
      ],
      "source": {
        "title": "APSA Outcomes and Evidence-Based Practice Committee: Management of Intussusception in Children, systematic review",
        "year": 2021,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7920908/",
        "locator": "Manejo de invaginación recurrente y puntos guía; estrategias quirúrgicas"
      },
      "reference": "APSA Outcomes and Evidence-Based Practice Committee: Management of Intussusception in Children, systematic review (2021), Manejo de invaginación recurrente y puntos guía; estrategias quirúrgicas",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Separar éxito técnico de la reducción de resolución etiológica en un escolar con recurrencias.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB108",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Anafilaxia refractaria",
      "stem": "Adolescente de 14 años con anafilaxia por alimento. Recibió dos dosis IM apropiadas de adrenalina separadas por cinco minutos y cristaloide isotónico; persiste hipotensión con mala perfusión y broncoespasmo, aunque mantiene pulso central. Acceso IV permeable, monitorización continua y personal de terapia intensiva a pie de cama.",
      "prompt": "¿Qué escalamiento se ajusta a la revisión de evidencia RCUK 2021?",
      "options": [
        "Cambiar a noradrenalina como único vasopresor antes de intentar adrenalina en infusión",
        "Establecer infusión IV titulada de adrenalina por personal experto, continuar reanimación y dosis IM mientras se prepara si siguen indicadas",
        "Administrar bolo IV de adrenalina equivalente a la dosis IM por persistir hipotensión",
        "Administrar corticoide IV y esperar su efecto antes de añadir soporte vasopresor"
      ],
      "correct": 1,
      "why": "La persistencia de síntomas cardiovasculares o respiratorios tras dos dosis apropiadas justifica ayuda experta e infusión titulada, sin interrumpir medidas de reanimación.",
      "others": "Otros vasopresores pueden considerarse ante refractariedad a la infusión, pero no sustituyen el escalamiento inicial con adrenalina. El bolo IV en un paciente con circulación espontánea aumenta el riesgo de sobredosis y arritmias; no equivale a una infusión controlada. Los corticoides no revierten de inmediato el choque ni deben retrasar adrenalina y reposición circulatoria.",
      "rationales": [
        "Otros vasopresores pueden considerarse ante refractariedad a la infusión, pero no sustituyen el escalamiento inicial con adrenalina.",
        "La persistencia de síntomas cardiovasculares o respiratorios tras dos dosis apropiadas justifica ayuda experta e infusión titulada, sin interrumpir medidas de reanimación.",
        "El bolo IV en un paciente con circulación espontánea aumenta el riesgo de sobredosis y arritmias; no equivale a una infusión controlada.",
        "Los corticoides no revierten de inmediato el choque ni deben retrasar adrenalina y reposición circulatoria."
      ],
      "source": {
        "title": "Dodd et al. Evidence update for the treatment of anaphylaxis (RCUK evidence review)",
        "year": 2021,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8139870/",
        "locator": "Manejo de anafilaxia refractaria después de dos dosis apropiadas"
      },
      "reference": "Dodd et al. Evidence update for the treatment of anaphylaxis (RCUK evidence review) (2021), Manejo de anafilaxia refractaria después de dos dosis apropiadas",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Reconocer fracaso de la primera línea y seleccionar escalamiento seguro según estado circulatorio.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB109",
      "section": "Alergia y dermatología",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Riesgo de reacción bifásica",
      "stem": "Niña de 12 años con asma grave, anafilaxia alimentaria con compromiso respiratorio intenso e hipotensión inicial. Requirió tres dosis de adrenalina IM y líquidos, con resolución completa a las 19:00. Permanece estable, cuenta con autoinyector y vive a 90 minutos del hospital. Se discute alta según estrategia de observación de RCUK 2021.",
      "prompt": "¿Qué vigilancia mínima corresponde desde la resolución de síntomas según esa estrategia?",
      "options": [
        "Dos horas porque ya cuenta con autoinyector y está asintomática",
        "Seis horas porque la respuesta fue completa antes de terminar la tercera dosis",
        "Al menos doce horas de observación hospitalaria, con reevaluación de estabilidad y condiciones de egreso",
        "Alta tras normalización de triptasa, independientemente del tiempo y gravedad"
      ],
      "correct": 2,
      "why": "El esquema RCUK estratifica por gravedad y factores de riesgo. Este caso reúne varios criterios de observación al menos doce horas, sin sustituir juicio clínico.",
      "others": "La vía rápida de dos horas se reserva para casos seleccionados de respuesta rápida a una sola dosis y condiciones seguras; no aplica aquí. Seis horas puede ser un umbral para otros perfiles, pero más de dos dosis, compromiso respiratorio grave y acceso difícil justifican observación más prolongada. La triptasa no excluye recurrencia bifásica ni determina por sí sola el momento del egreso.",
      "rationales": [
        "La vía rápida de dos horas se reserva para casos seleccionados de respuesta rápida a una sola dosis y condiciones seguras; no aplica aquí.",
        "Seis horas puede ser un umbral para otros perfiles, pero más de dos dosis, compromiso respiratorio grave y acceso difícil justifican observación más prolongada.",
        "El esquema RCUK estratifica por gravedad y factores de riesgo. Este caso reúne varios criterios de observación al menos doce horas, sin sustituir juicio clínico.",
        "La triptasa no excluye recurrencia bifásica ni determina por sí sola el momento del egreso."
      ],
      "source": {
        "title": "Dodd et al. Evidence update for the treatment of anaphylaxis (RCUK evidence review)",
        "year": 2021,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8139870/",
        "locator": "Tabla 5: observación después de anafilaxia según riesgo"
      },
      "reference": "Dodd et al. Evidence update for the treatment of anaphylaxis (RCUK evidence review) (2021), Tabla 5: observación después de anafilaxia según riesgo",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar gravedad, número de dosis, comorbilidad y acceso a atención para individualizar observación.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB110",
      "section": "Genética",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Mielopatía cervical en trisomía 21",
      "stem": "Niño de 10 años con síndrome de Down, nueva torpeza manual, marcha espástica y urgencia urinaria. Radiografía cervical neutra muestra desplazamiento atlantoaxoideo importante. Está consciente y sin compromiso ventilatorio. Un estudio radiográfico de tamizaje realizado años antes había sido normal.",
      "prompt": "¿Qué conducta prioriza seguridad según la vigilancia de salud AAP 2022?",
      "options": [
        "Completar radiografías dinámicas de flexión y extensión para cuantificar el desplazamiento antes de referir",
        "Repetir la radiografía neutra tras fisioterapia cervical para excluir artefacto posicional",
        "Solicitar electromiografía y considerar neuropatía periférica antes de referir",
        "Mantener precauciones cervicales, evitar estudios dinámicos adicionales y referir urgentemente a equipo quirúrgico especializado"
      ],
      "correct": 3,
      "why": "La anomalía radiográfica concordante con síntomas requiere valoración rápida por neurocirugía u ortopedia pediátrica especializada, con protección cervical.",
      "others": "Si la proyección neutra ya muestra una anomalía significativa, la guía indica no realizar radiografías adicionales antes de evaluación especializada. La movilización cervical puede agravar compresión medular; la imagen previa normal no protege de enfermedad posterior. La combinación de signos piramidales y esfinterianos sugiere mielopatía; la electromiografía no debe retrasar la atención.",
      "rationales": [
        "Si la proyección neutra ya muestra una anomalía significativa, la guía indica no realizar radiografías adicionales antes de evaluación especializada.",
        "La movilización cervical puede agravar compresión medular; la imagen previa normal no protege de enfermedad posterior.",
        "La combinación de signos piramidales y esfinterianos sugiere mielopatía; la electromiografía no debe retrasar la atención.",
        "La anomalía radiográfica concordante con síntomas requiere valoración rápida por neurocirugía u ortopedia pediátrica especializada, con protección cervical."
      ],
      "source": {
        "title": "AAP Health Supervision for Children and Adolescents With Down Syndrome",
        "year": 2022,
        "url": "https://doi.org/10.1542/peds.2022-057010",
        "locator": "Inestabilidad atlantoaxoidea sintomática; radiografía neutra anormal"
      },
      "reference": "AAP Health Supervision for Children and Adolescents With Down Syndrome (2022), Inestabilidad atlantoaxoidea sintomática; radiografía neutra anormal",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Reconocer mielopatía y evitar maniobras diagnósticas que pueden aumentar riesgo neurológico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB111",
      "section": "Genética",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Anomalías congénitas y retraso del desarrollo sin diagnóstico",
      "stem": "Niña de 4 años con retraso global grave, cardiopatía congénita corregida, malformación renal y rasgos dismórficos no específicos. Cariotipo y microarreglo cromosómico sin hallazgos causales; tamiz metabólico dirigido no revelador. No hay un síndrome clínico que justifique una prueba de gen único. Ambos padres están disponibles y desean diagnóstico etiológico.",
      "prompt": "¿Qué estrategia genética es apropiada según ACMG 2021?",
      "options": [
        "Considerar secuenciación de exoma o genoma con consejo genético y estudio parental según disponibilidad",
        "Repetir microarreglo cada seis meses hasta que aparezca una variante causal",
        "Completar paneles secuenciales de cada órgano como requisito antes de considerar exoma",
        "Realizar cariotipo de alta resolución como única prueba de segunda línea"
      ],
      "correct": 0,
      "why": "ACMG recomienda considerar exoma/genoma como estudio de primera o segunda línea en anomalías congénitas o retraso intelectual/desarrollo; el análisis parental puede facilitar interpretación.",
      "others": "Repetir la misma tecnología sin nueva indicación no es la estrategia recomendada para detectar variantes de secuencia. Una serie extensa de paneles no es requisito de ACMG y puede prolongar la búsqueda; el fenotipo multisistémico favorece evaluación genómica amplia. El cariotipo no identifica muchas variantes de secuencia y ya se obtuvo sin resultado causal.",
      "rationales": [
        "ACMG recomienda considerar exoma/genoma como estudio de primera o segunda línea en anomalías congénitas o retraso intelectual/desarrollo; el análisis parental puede facilitar interpretación.",
        "Repetir la misma tecnología sin nueva indicación no es la estrategia recomendada para detectar variantes de secuencia.",
        "Una serie extensa de paneles no es requisito de ACMG y puede prolongar la búsqueda; el fenotipo multisistémico favorece evaluación genómica amplia.",
        "El cariotipo no identifica muchas variantes de secuencia y ya se obtuvo sin resultado causal."
      ],
      "source": {
        "title": "ACMG: Exome and genome sequencing for pediatric patients with congenital anomalies or intellectual disability",
        "year": 2021,
        "url": "https://doi.org/10.1038/s41436-021-01242-6",
        "locator": "Recomendación de ES/GS como prueba de primer o segundo nivel en CA/DD/ID"
      },
      "reference": "ACMG: Exome and genome sequencing for pediatric patients with congenital anomalies or intellectual disability (2021), Recomendación de ES/GS como prueba de primer o segundo nivel en CA/DD/ID",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Elegir tecnología genética según fenotipo, limitaciones de pruebas previas y rendimiento diagnóstico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB112",
      "section": "Neurología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Espasmos epilépticos con esclerosis tuberosa",
      "stem": "Lactante de 7 meses con esclerosis tuberosa confirmada e inicio reciente de espasmos epilépticos. Tras una semana de vigabatrina a dosis revisada por neurología, persisten racimos diarios y EEG anormal compatible con espasmos. Se comprobó adherencia, no hay infección activa ni contraindicación importante a corticoide.",
      "prompt": "Según NICE NG217, ¿qué ajuste corresponde discutir de inmediato con neurología pediátrica?",
      "options": [
        "Sustituir vigabatrina por levetiracetam como monoterapia y reevaluar en un mes",
        "Añadir prednisolona oral a dosis altas a vigabatrina con vigilancia especializada",
        "Mantener vigabatrina sin cambios durante seis semanas antes de declarar respuesta insuficiente",
        "Suspender vigabatrina e iniciar prednisolona sola por fracaso de la primera semana"
      ],
      "correct": 1,
      "why": "NICE indica añadir prednisolona de dosis alta si vigabatrina resulta ineficaz tras una semana en espasmos relacionados con esclerosis tuberosa.",
      "others": "Levetiracetam no es el rescate preferido por esta recomendación específica tras vigabatrina en esclerosis tuberosa. La persistencia de espasmos exige reevaluación temprana; retrasar semanas la intensificación no se ajusta al esquema. El ajuste indicado es añadir el glucocorticoide, no retirar automáticamente vigabatrina.",
      "rationales": [
        "Levetiracetam no es el rescate preferido por esta recomendación específica tras vigabatrina en esclerosis tuberosa.",
        "NICE indica añadir prednisolona de dosis alta si vigabatrina resulta ineficaz tras una semana en espasmos relacionados con esclerosis tuberosa.",
        "La persistencia de espasmos exige reevaluación temprana; retrasar semanas la intensificación no se ajusta al esquema.",
        "El ajuste indicado es añadir el glucocorticoide, no retirar automáticamente vigabatrina."
      ],
      "source": {
        "title": "NICE NG217: Epilepsies in children, young people and adults",
        "year": 2022,
        "url": "https://www.nice.org.uk/guidance/ng217/chapter/6-Treating-childhood-onset-epilepsies",
        "locator": "6.3.5: tratamiento de espasmos asociados a esclerosis tuberosa"
      },
      "reference": "NICE NG217: Epilepsies in children, young people and adults (2022), 6.3.5: tratamiento de espasmos asociados a esclerosis tuberosa",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Aplicar una modificación terapéutica dependiente de etiología y tiempo de respuesta.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB113",
      "section": "Neurología",
      "type": "visual",
      "skill": "Seguimiento",
      "topic": "Respuesta electroclínica incompleta de espasmos infantiles",
      "stem": "Lactante de 6 meses con espasmos infantiles sin esclerosis tuberosa, tratado con prednisolona de dosis alta y vigabatrina. Tras 14 días, los cuidadores no observan racimos desde hace cuatro días; sin embargo, EEG de sueño de control documenta espasmos electroclínicos sutiles persistentes. Adherencia verificada y evaluación terciaria disponible.",
      "prompt": "¿Qué interpretación debe dirigir la conducta?",
      "options": [
        "Considerar remisión completa por ausencia de racimos percibidos y suspender ambos fármacos",
        "Reducir tratamiento porque la anormalidad de EEG carece de relevancia sin reporte familiar",
        "Considerar respuesta incompleta y discutir intensificación con neurólogo terciario según la persistencia clínica y electroencefalográfica",
        "Esperar hasta el próximo EEG rutinario anual sin ajustar manejo porque el niño ya no tiene racimos visibles"
      ],
      "correct": 2,
      "why": "NICE contempla EEG de sueño a las dos semanas y valoración especializada de ajustes si persisten espasmos; este resultado cambia la conducta.",
      "others": "La remisión requiere valorar el componente clínico y electroencefalográfico; el relato familiar no excluye espasmos sutiles. Los eventos registrados muestran que la aparente mejoría no representa cese completo; no justifican reducción automática. La reevaluación debe ser temprana y orientada a detener los espasmos, no diferirse un año.",
      "rationales": [
        "La remisión requiere valorar el componente clínico y electroencefalográfico; el relato familiar no excluye espasmos sutiles.",
        "Los eventos registrados muestran que la aparente mejoría no representa cese completo; no justifican reducción automática.",
        "NICE contempla EEG de sueño a las dos semanas y valoración especializada de ajustes si persisten espasmos; este resultado cambia la conducta.",
        "La reevaluación debe ser temprana y orientada a detener los espasmos, no diferirse un año."
      ],
      "source": {
        "title": "NICE NG217: Epilepsies in children, young people and adults",
        "year": 2022,
        "url": "https://www.nice.org.uk/guidance/ng217/chapter/6-Treating-childhood-onset-epilepsies",
        "locator": "6.3.2 y recomendaciones de seguimiento/ajuste ante persistencia de espasmos"
      },
      "reference": "NICE NG217: Epilepsies in children, young people and adults (2022), 6.3.2 y recomendaciones de seguimiento/ajuste ante persistencia de espasmos",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir respuesta clínica aparente de control electroclínico mediante estudio de seguimiento.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB114",
      "section": "Inmuno-reumatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Kawasaki resistente a inmunoglobulina",
      "stem": "Niño de 3 años con Kawasaki confirmado, tratado con inmunoglobulina IV y ácido acetilsalicílico. A 42 horas de terminar la primera infusión persiste fiebre de 39 °C y elevación de PCR. Reevaluación descarta otra infección o diagnóstico alternativo; no hay choque, hemólisis ni sobrecarga de volumen. Cardiología y reumatología discuten segundo tratamiento.",
      "prompt": "Si se sigue específicamente la guía ACR/VF de Kawasaki 2021, ¿qué opción favorece condicionalmente?",
      "options": [
        "Cambiar a infliximab como única opción aceptable tras una primera infusión",
        "Utilizar pulsos de glucocorticoide como sustituto obligatorio de una segunda inmunoglobulina",
        "Esperar 72 horas adicionales sin terapia antiinflamatoria por ser fiebre esperada tras infusión",
        "Considerar una segunda dosis de inmunoglobulina, individualizando riesgos y alternativas"
      ],
      "correct": 3,
      "why": "ACR/VF favorece condicionalmente una segunda inmunoglobulina frente a glucocorticoides después de fiebre persistente tras el primer curso, sin afirmar superioridad universal.",
      "others": "Infliximab es una opción en escenarios seleccionados, pero la recomendación citada no lo establece como única alternativa inicial de rescate. Los glucocorticoides pueden ser válidos según situación; esta guía favorece condicionalmente repetir inmunoglobulina en este escenario. La fiebre persistente más allá de 36 horas exige reevaluar resistencia y considerar rescate, no esperar de forma sistemática.",
      "rationales": [
        "Infliximab es una opción en escenarios seleccionados, pero la recomendación citada no lo establece como única alternativa inicial de rescate.",
        "Los glucocorticoides pueden ser válidos según situación; esta guía favorece condicionalmente repetir inmunoglobulina en este escenario.",
        "La fiebre persistente más allá de 36 horas exige reevaluar resistencia y considerar rescate, no esperar de forma sistemática.",
        "ACR/VF favorece condicionalmente una segunda inmunoglobulina frente a glucocorticoides después de fiebre persistente tras el primer curso, sin afirmar superioridad universal."
      ],
      "source": {
        "title": "ACR/Vasculitis Foundation Guideline for the Management of Kawasaki Disease (2021 guideline)",
        "year": 2022,
        "url": "https://doi.org/10.1002/acr.24838",
        "locator": "Recomendación 7: fiebre persistente después de inmunoglobulina inicial"
      },
      "reference": "ACR/Vasculitis Foundation Guideline for the Management of Kawasaki Disease (2021 guideline) (2022), Recomendación 7: fiebre persistente después de inmunoglobulina inicial",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir recomendación condicional de tratamiento obligatorio y reconocer resistencia temporal.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB115",
      "section": "Inmuno-reumatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "MIS-C refractario con rasgos de activación macrofágica",
      "stem": "Escolar de 8 años con MIS-C, disfunción ventricular (FEVI 36%), choque tratado en UCIP y marcadores de activación macrofágica progresivos: ferritina 6200 ng/mL, trombocitopenia e hipofibrinogenemia. Recibió inmunoglobulina y glucocorticoides, pero persisten fiebre e inflamación; el equipo reevalúa infección activa y causas alternativas. Existe riesgo importante de sobrecarga hídrica.",
      "prompt": "Según guía ACR versión 3, ¿qué intensificación es razonable discutir en este perfil?",
      "options": [
        "Considerar anakinra a dosis altas con monitorización multidisciplinaria, sin repetir rutinariamente inmunoglobulina",
        "Repetir inmunoglobulina como rescate obligatorio aplicando el algoritmo de Kawasaki sin modificaciones",
        "Suspender todo inmunomodulador y mantener únicamente antiagregación por riesgo de infección",
        "Elegir infliximab como opción preferente precisamente por rasgos de activación macrofágica"
      ],
      "correct": 0,
      "why": "La guía contempla anakinra en refractariedad a inmunoglobulina y glucocorticoides, especialmente con rasgos de activación macrofágica; exige evaluación individual y vigilancia.",
      "others": "En MIS-C refractario la repetición de inmunoglobulina se desaconseja por sobrecarga y hemólisis; no se extrapola sin más el algoritmo de Kawasaki. El riesgo infeccioso requiere evaluación simultánea, pero no justifica suspender automáticamente la inmunomodulación ante inflamación grave persistente. La guía no favorece infliximab en pacientes con características de activación macrofágica; anakinra es una opción mejor respaldada para el perfil descrito.",
      "rationales": [
        "La guía contempla anakinra en refractariedad a inmunoglobulina y glucocorticoides, especialmente con rasgos de activación macrofágica; exige evaluación individual y vigilancia.",
        "En MIS-C refractario la repetición de inmunoglobulina se desaconseja por sobrecarga y hemólisis; no se extrapola sin más el algoritmo de Kawasaki.",
        "El riesgo infeccioso requiere evaluación simultánea, pero no justifica suspender automáticamente la inmunomodulación ante inflamación grave persistente.",
        "La guía no favorece infliximab en pacientes con características de activación macrofágica; anakinra es una opción mejor respaldada para el perfil descrito."
      ],
      "source": {
        "title": "ACR Clinical Guidance for MIS-C Associated With SARS-CoV-2, Version 3",
        "year": 2022,
        "url": "https://doi.org/10.1002/art.42062",
        "locator": "Tabla de inmunomodulación y tratamiento de MIS-C refractario, versión 3"
      },
      "reference": "ACR Clinical Guidance for MIS-C Associated With SARS-CoV-2, Version 3 (2022), Tabla de inmunomodulación y tratamiento de MIS-C refractario, versión 3",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Discriminar rescate inmunomodulador entre síndromes inflamatorios con diferente perfil de riesgo.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB116",
      "section": "Oftalmología",
      "type": "visual",
      "skill": "Interpretación",
      "topic": "Retinopatía del prematuro: interpretación de zona y estadio",
      "stem": "Prematuro nacido a las 26 semanas, ahora con 35 semanas de edad posmenstrual. Oftalmología describe proliferación fibrovascular extrarretiniana en zona I, estadio 3, sin enfermedad plus ni desprendimiento. El ojo contralateral muestra zona II, estadio 2, sin plus. El niño está estable y ambos ojos pueden valorarse por un especialista en retina pediátrica.",
      "prompt": "¿Qué prioridad de manejo corresponde al ojo con zona I, estadio 3?",
      "options": [
        "Vigilancia habitual hasta que aparezca enfermedad plus, porque su ausencia excluye tratamiento",
        "Considerarlo ROP tipo 1 y coordinar tratamiento oportuno con el equipo especializado",
        "Clasificarlo como tipo 2 y vigilar sin tratamiento hasta superar 40 semanas",
        "Esperar a que aparezca desprendimiento parcial para justificar terapia"
      ],
      "correct": 1,
      "why": "El patrón zona I estadio 3 sin plus pertenece a ROP tipo 1 según ETROP y requiere tratamiento oportuno; la modalidad se decide con retina pediátrica.",
      "others": "La localización en zona I cambia el riesgo; el estadio 3 en zona I puede indicar tratamiento aun sin plus. La categoría tipo 2 incluye otros patrones, como zona I estadio 1–2 sin plus; no este escenario. Esperar desprendimiento pierde la oportunidad de prevenir daño irreversible y no corresponde a criterios de tratamiento temprano.",
      "rationales": [
        "La localización en zona I cambia el riesgo; el estadio 3 en zona I puede indicar tratamiento aun sin plus.",
        "El patrón zona I estadio 3 sin plus pertenece a ROP tipo 1 según ETROP y requiere tratamiento oportuno; la modalidad se decide con retina pediátrica.",
        "La categoría tipo 2 incluye otros patrones, como zona I estadio 1–2 sin plus; no este escenario.",
        "Esperar desprendimiento pierde la oportunidad de prevenir daño irreversible y no corresponde a criterios de tratamiento temprano."
      ],
      "source": {
        "title": "AAP/AAO/AAPOS: Screening Examination of Premature Infants for Retinopathy of Prematurity",
        "year": 2018,
        "url": "https://doi.org/10.1542/peds.2018-3061",
        "locator": "Criterios de tratamiento de ROP tipo 1 basados en ETROP"
      },
      "reference": "AAP/AAO/AAPOS: Screening Examination of Premature Infants for Retinopathy of Prematurity (2018), Criterios de tratamiento de ROP tipo 1 basados en ETROP",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Clasificar por combinación de zona, estadio y plus, no por un único dato.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB117",
      "section": "Oftalmología",
      "type": "caso",
      "skill": "Seguimiento",
      "topic": "Reactivación tardía de retinopatía del prematuro",
      "stem": "Lactante nacido a las 24 semanas, tratado con anti-VEGF por ROP posterior. A las 49 semanas posmenstruales muestra regresión de proliferación y ausencia de plus, pero persiste retina periférica avascular. Se planea traslado a hospital regional; la familia interpreta que la mejoría permite finalizar controles. No hay laser previo.",
      "prompt": "¿Qué decisión de transición asistencial reduce el riesgo de pérdida de seguimiento?",
      "options": [
        "Finalizar controles especializados por regresión de plus y esperar revisión visual al año",
        "Aplicar calendario de egreso de tamizaje de un prematuro nunca tratado, sin considerar retina avascular",
        "Concertar seguimiento oftalmológico antes del traslado, mantener vigilancia prolongada por riesgo de reactivación tardía y valorar retina residual",
        "Repetir anti-VEGF profilácticamente antes del traslado como sustituto de controles"
      ],
      "correct": 2,
      "why": "Debe garantizarse continuidad antes del traslado; la retina incompletamente vascularizada y la edad actual justifican seguimiento estrecho y decisiones especializadas.",
      "others": "La regresión inicial tras anti-VEGF no excluye reactivación tardía, particularmente durante el período posmenstrual actual. El tratamiento anti-VEGF modifica la evolución natural y puede requerir vigilancia más prolongada que un tamizaje habitual. La repetición profiláctica sin indicación oftalmológica no sustituye controles y añade exposición terapéutica.",
      "rationales": [
        "La regresión inicial tras anti-VEGF no excluye reactivación tardía, particularmente durante el período posmenstrual actual.",
        "El tratamiento anti-VEGF modifica la evolución natural y puede requerir vigilancia más prolongada que un tamizaje habitual.",
        "Debe garantizarse continuidad antes del traslado; la retina incompletamente vascularizada y la edad actual justifican seguimiento estrecho y decisiones especializadas.",
        "La repetición profiláctica sin indicación oftalmológica no sustituye controles y añade exposición terapéutica."
      ],
      "source": {
        "title": "AAP/AAO/AAPOS: Screening Examination of Premature Infants for Retinopathy of Prematurity",
        "year": 2018,
        "url": "https://doi.org/10.1542/peds.2018-3061",
        "locator": "Seguimiento posterior a anti-VEGF y continuidad antes de egreso/traslado"
      },
      "reference": "AAP/AAO/AAPOS: Screening Examination of Premature Infants for Retinopathy of Prematurity (2018), Seguimiento posterior a anti-VEGF y continuidad antes de egreso/traslado",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar efecto del tratamiento, maduración retiniana y riesgo de reactivación durante una transición.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB118",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Otitis media con efusión en niño de alto riesgo",
      "stem": "Niña de 3 años con paladar hendido reparado y retraso de lenguaje. Efusión bilateral documentada desde hace seis semanas, timpanogramas tipo B con volumen de conducto normal e hipoacusia conductiva confirmada. No tiene infección aguda. ORL y audiología discuten ventilación del oído medio antes de completar tres meses.",
      "prompt": "Según AAO-HNSF 2022, ¿qué decisión es defendible en este caso?",
      "options": [
        "Requerir tres meses completos de efusión en todos los casos antes de considerar tubos",
        "Indicar antibiótico sistémico prolongado para resolver efusión antes de discutir cirugía",
        "Colocar tubos de larga duración como primera cirugía en forma obligatoria por paladar hendido",
        "Considerar tubos por riesgo del desarrollo y efusión con alta probabilidad de persistencia, mediante decisión compartida"
      ],
      "correct": 3,
      "why": "KAS 9 permite considerar tubos en niños de riesgo con efusión probablemente persistente; el tipo B y el impacto auditivo son elementos relevantes.",
      "others": "En niños con riesgo del desarrollo, un timpanograma plano puede respaldar considerar tubos antes del plazo convencional de tres meses. La efusión sin infección aguda no se trata de forma rutinaria con antibiótico prolongado; no aborda el riesgo auditivo descrito. Los tubos prolongados no se recomiendan rutinariamente como primera intervención salvo necesidad específica de ventilación prolongada.",
      "rationales": [
        "En niños con riesgo del desarrollo, un timpanograma plano puede respaldar considerar tubos antes del plazo convencional de tres meses.",
        "La efusión sin infección aguda no se trata de forma rutinaria con antibiótico prolongado; no aborda el riesgo auditivo descrito.",
        "Los tubos prolongados no se recomiendan rutinariamente como primera intervención salvo necesidad específica de ventilación prolongada.",
        "KAS 9 permite considerar tubos en niños de riesgo con efusión probablemente persistente; el tipo B y el impacto auditivo son elementos relevantes."
      ],
      "source": {
        "title": "AAO-HNSF Clinical Practice Guideline: Tympanostomy Tubes in Children (Update)",
        "year": 2022,
        "url": "https://doi.org/10.1177/01945998211065662",
        "locator": "KAS 8–10: niños de riesgo, efusión probablemente persistente y tipo de tubo"
      },
      "reference": "AAO-HNSF Clinical Practice Guideline: Tympanostomy Tubes in Children (Update) (2022), KAS 8–10: niños de riesgo, efusión probablemente persistente y tipo de tubo",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Aplicar una excepción por riesgo del desarrollo e interpretar timpanometría en contexto anatómico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB119",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Otorrea aguda por tubo de ventilación",
      "stem": "Niño de 5 años con tubos de ventilación permeables, colocado por efusión crónica. Presenta otorrea purulenta unilateral de 48 horas, dolor leve, afebril, sin celulitis periauricular, mastoidalgia ni inmunodeficiencia. El tubo está visible y permite administración local; no ha recibido antimicrobianos para este episodio.",
      "prompt": "¿Cuál es la estrategia antimicrobiana inicial con mejor respaldo en esta otorrea no complicada?",
      "options": [
        "Gotas óticas antibióticas apropiadas para oído medio, sin antibiótico oral de rutina",
        "Amoxicilina-clavulanato oral sin gotas por el origen en oído medio",
        "Combinación rutinaria de gotas antibióticas y cefalosporina oral durante todo el episodio",
        "Gotas de aminoglucósido como primera opción sin considerar exposición del oído medio"
      ],
      "correct": 0,
      "why": "KAS 14 recomienda gotas antibióticas solas en otorrea aguda no complicada por tubos; debe utilizarse un preparado adecuado para membrana no íntegra.",
      "others": "La vía oral sola no aprovecha el acceso directo al foco a través del tubo y no es la primera estrategia respaldada. La adición sistémica rutinaria aumenta exposición innecesaria; las complicaciones o circunstancias especiales podrían cambiar conducta. La comunicación con oído medio obliga a considerar ototoxicidad; no se elige un aminoglucósido rutinariamente ignorando ese riesgo.",
      "rationales": [
        "KAS 14 recomienda gotas antibióticas solas en otorrea aguda no complicada por tubos; debe utilizarse un preparado adecuado para membrana no íntegra.",
        "La vía oral sola no aprovecha el acceso directo al foco a través del tubo y no es la primera estrategia respaldada.",
        "La adición sistémica rutinaria aumenta exposición innecesaria; las complicaciones o circunstancias especiales podrían cambiar conducta.",
        "La comunicación con oído medio obliga a considerar ototoxicidad; no se elige un aminoglucósido rutinariamente ignorando ese riesgo."
      ],
      "source": {
        "title": "AAO-HNSF Clinical Practice Guideline: Tympanostomy Tubes in Children (Update)",
        "year": 2022,
        "url": "https://doi.org/10.1177/01945998211065662",
        "locator": "KAS 14: otorrea aguda no complicada con tubos"
      },
      "reference": "AAO-HNSF Clinical Practice Guideline: Tympanostomy Tubes in Children (Update) (2022), KAS 14: otorrea aguda no complicada con tubos",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Elegir vía antimicrobiana según acceso al foco, complicaciones y seguridad ótica.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB120",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Empiema paraneumónico",
      "stem": "Escolar de 7 años, previamente sano, con neumonía bacteriana y fiebre persistente tras 48 h de antibiótico. Requiere oxígeno y presenta derrame pleural purulento de tamaño moderado, con septos limitados en ultrasonido. Sin fístula broncopleural ni loculaciones extensas. El hospital tiene experiencia tanto en drenaje guiado como en cirugía toracoscópica.",
      "prompt": "Según IDSA/PIDS 2026, ¿qué estrategia inicial de control del foco se favorece condicionalmente?",
      "options": [
        "Drenaje guiado mediante tubo pleural y fibrinolítico intrapleural",
        "VATS primaria en todos los casos con septos, independientemente de extensión",
        "Drenaje simple sin fibrinólisis como estrategia preferida aunque haya septos",
        "Toracocentesis evacuadora intermitente con reevaluación diaria"
      ],
      "correct": 0,
      "why": "La guía favorece inicialmente tubo y fibrinólisis en la mayoría de los empiemas que requieren drenaje, teniendo en cuenta invasividad y recursos.",
      "others": "VATS es una opción válida en enfermedad extensa o refractaria; los septos limitados no obligan a elegirla como primera intervención. El drenaje simple puede ser útil en líquido libre, pero el abordaje sugerido para empiema incluye fibrinólisis. La aspiración intermitente no es la estrategia de drenaje continuo favorecida en este contexto.",
      "rationales": [
        "La guía favorece inicialmente tubo y fibrinólisis en la mayoría de los empiemas que requieren drenaje, teniendo en cuenta invasividad y recursos.",
        "VATS es una opción válida en enfermedad extensa o refractaria; los septos limitados no obligan a elegirla como primera intervención.",
        "El drenaje simple puede ser útil en líquido libre, pero el abordaje sugerido para empiema incluye fibrinólisis.",
        "La aspiración intermitente no es la estrategia de drenaje continuo favorecida en este contexto."
      ],
      "source": {
        "title": "IDSA/PIDS 2026 Guidelines for Community-Acquired Pneumonia in Children: parapneumonic effusion",
        "year": 2026,
        "url": "https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-in-infants-and-children/",
        "locator": "Pleural fluid drainage compared to surgical debridement"
      },
      "reference": "IDSA/PIDS 2026 Guidelines for Community-Acquired Pneumonia in Children: parapneumonic effusion (2026), Pleural fluid drainage compared to surgical debridement",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Seleccionar control del foco según anatomía, riesgo invasivo y certeza de la recomendación.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB121",
      "section": "Cardio-pulmonar",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Fibrinólisis pleural pediátrica",
      "stem": "Niña de 8 años con empiema asociado a neumonía. Se instaló tubo pleural de 10 Fr guiado por imagen, con posición adecuada y drenaje parcial; persisten tabiques susceptibles de fibrinólisis. No presenta sangrado activo ni contraindicaciones al fibrinolítico. El equipo plantea extrapolar el esquema combinado usado en pacientes adultos.",
      "prompt": "Según la actualización pediátrica IDSA/PIDS 2026, ¿qué régimen intrapleural debe preferirse?",
      "options": [
        "tPA más DNasa de rutina, por evidencia de superioridad pediátrica",
        "tPA sin adición rutinaria de DNasa",
        "DNasa sola para evitar el riesgo hemorrágico de tPA",
        "Cambiar primero a tubo de gran calibre y omitir fibrinólisis"
      ],
      "correct": 1,
      "why": "La recomendación condicional favorece tPA solo frente a tPA más DNasa para este grupo; se vigila respuesta y seguridad.",
      "others": "La evidencia pediátrica no demuestra el beneficio adicional que justificaría usar la combinación sistemáticamente. La DNasa sola no es la alternativa respaldada para fibrinólisis pleural pediátrica. El tubo pequeño puede permitir drenaje y fibrinólisis; su calibre no obliga a recambio antes del tratamiento.",
      "rationales": [
        "La evidencia pediátrica no demuestra el beneficio adicional que justificaría usar la combinación sistemáticamente.",
        "La recomendación condicional favorece tPA solo frente a tPA más DNasa para este grupo; se vigila respuesta y seguridad.",
        "La DNasa sola no es la alternativa respaldada para fibrinólisis pleural pediátrica.",
        "El tubo pequeño puede permitir drenaje y fibrinólisis; su calibre no obliga a recambio antes del tratamiento."
      ],
      "source": {
        "title": "IDSA/PIDS 2026 Guidelines for Community-Acquired Pneumonia in Children: parapneumonic effusion",
        "year": 2026,
        "url": "https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-in-infants-and-children/",
        "locator": "The Use of tPA and DNase or tPA Alone for Fibrinolysis"
      },
      "reference": "IDSA/PIDS 2026 Guidelines for Community-Acquired Pneumonia in Children: parapneumonic effusion (2026), The Use of tPA and DNase or tPA Alone for Fibrinolysis",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Evitar extrapolar una estrategia farmacológica de adultos cuando la evidencia pediátrica es distinta.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB122",
      "section": "Cirugía pediátrica",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Empiema refractario",
      "stem": "Niño de 10 años con empiema neumónico por neumococo sensible. Recibió antimicrobiano dirigido, tubo pequeño bien colocado y ciclo completo de fibrinólisis según protocolo. Continúa con dificultad respiratoria y fiebre; ultrasonido muestra una colección importante multiloculada no comunicada con el tubo. Cirugía y radiología revisan la imagen y confirman que no es accesible de forma segura con otro drenaje percutáneo.",
      "prompt": "¿Cuál es la conducta de control del foco más razonable?",
      "options": [
        "Prolongar antibiótico sin nueva intervención hasta normalización de PCR",
        "Cambiar a tubo de mayor calibre en la misma cavidad ya drenada",
        "Valorar desbridamiento por VATS como rescate, manteniendo terapia antimicrobiana apropiada",
        "Añadir DNasa por el tubo actual como alternativa a acceder a la colección"
      ],
      "correct": 2,
      "why": "VATS es una alternativa de rescate en enfermedad refractaria o loculación extensa; la decisión corresponde al equipo multidisciplinario.",
      "others": "La persistencia de una colección no drenada y compromiso respiratorio exige reevaluar control del foco, no solo duración antimicrobiana. Un tubo mayor en una cavidad distinta no resuelve las loculaciones no comunicantes. El fármaco administrado en una cavidad no comunicada no accede necesariamente al foco residual.",
      "rationales": [
        "La persistencia de una colección no drenada y compromiso respiratorio exige reevaluar control del foco, no solo duración antimicrobiana.",
        "Un tubo mayor en una cavidad distinta no resuelve las loculaciones no comunicantes.",
        "VATS es una alternativa de rescate en enfermedad refractaria o loculación extensa; la decisión corresponde al equipo multidisciplinario.",
        "El fármaco administrado en una cavidad no comunicada no accede necesariamente al foco residual."
      ],
      "source": {
        "title": "IDSA/PIDS 2026 Guidelines for Community-Acquired Pneumonia in Children: parapneumonic effusion",
        "year": 2026,
        "url": "https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-in-infants-and-children/",
        "locator": "Pleural fluid drainage compared to surgical debridement: refractory disease"
      },
      "reference": "IDSA/PIDS 2026 Guidelines for Community-Acquired Pneumonia in Children: parapneumonic effusion (2026), Pleural fluid drainage compared to surgical debridement: refractory disease",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir fracaso anatómico del drenaje de fracaso antimicrobiano.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB123",
      "section": "Gastroenterología y nutrición",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Colitis ulcerosa aguda grave: día 3",
      "stem": "Adolescente de 13 años con colitis ulcerosa extensa hospitalizado por exacerbación grave. En el día 3 de metilprednisolona IV el PUCAI permanece en 55, desde 75 al ingreso. Estudios iniciales de patógenos fecales y C. difficile negativos. No presenta dilatación colónica ni peritonismo; albúmina 2.4 g/dL. No ha recibido biológicos previamente.",
      "prompt": "Según ESPGHAN/ECCO 2025, ¿qué decisión corresponde en este momento?",
      "options": [
        "Cambiar a prednisona oral porque el PUCAI disminuyó veinte puntos",
        "Iniciar rescate obligatorio en ese instante sin completar evaluación infecciosa",
        "Mantener el esquema actual hasta el día 7 antes de plantear otras opciones",
        "Preparar rescate entre días 3–5, valorar cirugía y realizar sigmoidoscopia con biopsias para descartar CMV"
      ],
      "correct": 3,
      "why": "El PUCAI por encima de 45 en día 3 orienta a preparar segunda línea. La ausencia de respuesta adecuada justifica evaluación mucosa para CMV y coordinación quirúrgica.",
      "others": "La mejoría relativa no implica respuesta suficiente: la actividad absoluta continúa siendo elevada. La puntuación del día 3 exige planificación; no obliga por sí sola a iniciar rescate sin evaluación pertinente. Esperar hasta el día 7 sin preparar segunda línea retrasa decisiones ante alto riesgo de fracaso.",
      "rationales": [
        "La mejoría relativa no implica respuesta suficiente: la actividad absoluta continúa siendo elevada.",
        "La puntuación del día 3 exige planificación; no obliga por sí sola a iniciar rescate sin evaluación pertinente.",
        "Esperar hasta el día 7 sin preparar segunda línea retrasa decisiones ante alto riesgo de fracaso.",
        "El PUCAI por encima de 45 en día 3 orienta a preparar segunda línea. La ausencia de respuesta adecuada justifica evaluación mucosa para CMV y coordinación quirúrgica."
      ],
      "source": {
        "title": "ESPGHAN/ECCO Management of paediatric ulcerative colitis, part 2: Acute severe colitis",
        "year": 2025,
        "url": "https://doi.org/10.1002/jpn3.70096",
        "locator": "Predicción de respuesta a corticoide IV y evaluación de infecciones en día 3"
      },
      "reference": "ESPGHAN/ECCO Management of paediatric ulcerative colitis, part 2: Acute severe colitis (2025), Predicción de respuesta a corticoide IV y evaluación de infecciones en día 3",
      "caseId": "ASC-01",
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Usar el valor absoluto de actividad y la trayectoria para anticipar rescate.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB124",
      "section": "Gastroenterología y nutrición",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Colitis ulcerosa aguda grave: día 5",
      "stem": "El adolescente de 13 años con colitis ulcerosa extensa sigue hospitalizado en el día 5 de corticoide IV. PUCAI 65, albúmina 2.3 g/dL; no hay megacolon, hemorragia masiva ni peritonismo. Se descartaron C. difficile y colitis por CMV mediante evaluación apropiada. No ha recibido anti-TNF; se completó la evaluación previa a biológico y cirugía pediátrica participa.",
      "prompt": "¿Qué decisión se ajusta a ESPGHAN/ECCO 2025?",
      "options": [
        "Iniciar terapia de segunda línea sin demorarla por un curso adicional de corticoide, con vigilancia quirúrgica",
        "Esperar hasta el día 10 de corticoide porque no hay megacolon",
        "Cambiar a corticoide oral y reservar rescate para un PUCAI superior a 75",
        "Indicar colectomía inmediata como única opción válida por PUCAI de 65"
      ],
      "correct": 0,
      "why": "En el día 5 una actividad de 65 o mayor apoya iniciar segunda línea; en un candidato adecuado puede considerarse infliximab, sin perder vigilancia de indicaciones quirúrgicas.",
      "others": "No se requiere megacolon para reconocer fracaso del corticoide; prolongarlo sin rescate aumenta riesgos. La actividad grave persistente no justifica desescalamiento a vía oral; no se exige un valor superior a 75. La colectomía es una alternativa importante, pero no la única en un paciente estable sin indicación quirúrgica inmediata.",
      "rationales": [
        "En el día 5 una actividad de 65 o mayor apoya iniciar segunda línea; en un candidato adecuado puede considerarse infliximab, sin perder vigilancia de indicaciones quirúrgicas.",
        "No se requiere megacolon para reconocer fracaso del corticoide; prolongarlo sin rescate aumenta riesgos.",
        "La actividad grave persistente no justifica desescalamiento a vía oral; no se exige un valor superior a 75.",
        "La colectomía es una alternativa importante, pero no la única en un paciente estable sin indicación quirúrgica inmediata."
      ],
      "source": {
        "title": "ESPGHAN/ECCO Management of paediatric ulcerative colitis, part 2: Acute severe colitis",
        "year": 2025,
        "url": "https://doi.org/10.1002/jpn3.70096",
        "locator": "Inicio de segunda línea según PUCAI en día 5"
      },
      "reference": "ESPGHAN/ECCO Management of paediatric ulcerative colitis, part 2: Acute severe colitis (2025), Inicio de segunda línea según PUCAI en día 5",
      "caseId": "ASC-01",
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Identificar el momento en que la preparación de rescate pasa a intervención efectiva.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB125",
      "section": "Gastroenterología y nutrición",
      "type": "visual",
      "skill": "Farmacología",
      "topic": "Pérdida de respuesta a infliximab",
      "stem": "Adolescente de 15 años con colitis ulcerosa que alcanzó remisión con infliximab y posteriormente presenta recaída clínica y endoscópica. Coprocultivos y evaluación de infección negativos. En dos muestras inmediatamente antes de infusión, infliximab indetectable con anticuerpos antifármaco persistentemente elevados; se confirmó adherencia. Sin indicación quirúrgica urgente.",
      "prompt": "¿Qué interpretación justifica considerar otro anti-TNF, según ESPGHAN/ECCO 2025?",
      "options": [
        "Fracaso farmacodinámico primario; adalimumab sería ineficaz por definición",
        "Pérdida secundaria inmunogénica; valorar cambio a adalimumab con monitorización especializada",
        "Exposición excesiva al fármaco; reducir dosis y prolongar intervalo",
        "Recaída no inflamatoria; continuar sin modificar tratamiento por anticuerpos positivos"
      ],
      "correct": 1,
      "why": "El patrón apoya pérdida inmunogénica de exposición, situación en que otro anti-TNF puede ser considerado, según contexto y regulación.",
      "others": "Existió respuesta inicial y ahora hay fármaco indetectable con anticuerpos persistentes, distinto de no respuesta primaria con exposición adecuada. La concentración indetectable no apoya sobreexposición; disminuir dosis podría empeorar el problema. Se documentó inflamación endoscópica; los anticuerpos persistentes explican una posible pérdida de eficacia.",
      "rationales": [
        "Existió respuesta inicial y ahora hay fármaco indetectable con anticuerpos persistentes, distinto de no respuesta primaria con exposición adecuada.",
        "El patrón apoya pérdida inmunogénica de exposición, situación en que otro anti-TNF puede ser considerado, según contexto y regulación.",
        "La concentración indetectable no apoya sobreexposición; disminuir dosis podría empeorar el problema.",
        "Se documentó inflamación endoscópica; los anticuerpos persistentes explican una posible pérdida de eficacia."
      ],
      "source": {
        "title": "ESPGHAN/ECCO Management of paediatric ulcerative colitis, part 1: Ambulatory care",
        "year": 2025,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12408984/",
        "locator": "Sección 7.1 y figura 4: monitorización terapéutica de infliximab"
      },
      "reference": "ESPGHAN/ECCO Management of paediatric ulcerative colitis, part 1: Ambulatory care (2025), Sección 7.1 y figura 4: monitorización terapéutica de infliximab",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Diferenciar pérdida inmunogénica de fracaso farmacodinámico usando niveles y respuesta previa.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB126",
      "section": "Urgencias y terapia intensiva",
      "type": "visual",
      "skill": "Interpretación",
      "topic": "Ventilación protectora en SDRA pediátrico",
      "stem": "Niño de 6 años con SDRA pediátrico ventilado en UCIP. Sin esfuerzo espontáneo durante mediciones estáticas: volumen corriente 8 mL/kg de peso predicho, PEEP total 10 cmH₂O, presión meseta 30 cmH₂O. PaCO₂ 48 mmHg, pH 7.31, oxigenación aceptable; sin hipertensión intracraneal ni disminución de distensibilidad de pared torácica.",
      "prompt": "¿Qué ajuste responde mejor a las recomendaciones PALICC-2?",
      "options": [
        "Aumentar volumen corriente para normalizar PaCO₂ y mantener PEEP",
        "Mantener volumen corriente y reducir PEEP a 5 para bajar presión meseta",
        "Reducir volumen corriente y retitular soporte para disminuir presión meseta y de conducción, tolerando hipercapnia dentro de límites",
        "Aumentar presión meseta hasta 35 si la saturación mejora"
      ],
      "correct": 2,
      "why": "La presión de conducción es 20 cmH₂O y la meseta supera 28; se favorece reducir exposición a ambas, con valoración de ventilación y perfusión.",
      "others": "La prioridad no es normalizar PaCO₂ a costa de aumentar estrés mecánico pulmonar. Reducir PEEP sin considerar reclutamiento puede empeorar oxigenación y distensibilidad; no garantiza disminuir presión de conducción. Sin indicación especial por pared torácica, una meseta mayor excede el objetivo sugerido y puede aumentar lesión inducida por ventilación.",
      "rationales": [
        "La prioridad no es normalizar PaCO₂ a costa de aumentar estrés mecánico pulmonar.",
        "Reducir PEEP sin considerar reclutamiento puede empeorar oxigenación y distensibilidad; no garantiza disminuir presión de conducción.",
        "La presión de conducción es 20 cmH₂O y la meseta supera 28; se favorece reducir exposición a ambas, con valoración de ventilación y perfusión.",
        "Sin indicación especial por pared torácica, una meseta mayor excede el objetivo sugerido y puede aumentar lesión inducida por ventilación."
      ],
      "source": {
        "title": "PALICC-2 Executive Summary of the Second International Guidelines for Pediatric ARDS",
        "year": 2023,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9848214/",
        "locator": "Recomendaciones de volumen corriente, presión meseta y driving pressure"
      },
      "reference": "PALICC-2 Executive Summary of the Second International Guidelines for Pediatric ARDS (2023), Recomendaciones de volumen corriente, presión meseta y driving pressure",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Calcular presión de conducción y priorizar protección pulmonar sobre normalización de CO₂.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB127",
      "section": "Urgencias y terapia intensiva",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hipercapnia permisiva con lesión cerebral",
      "stem": "Escolar de 11 años con SDRA secundario a aspiración tras traumatismo craneoencefálico grave. Monitor invasivo registra PIC de 24 mmHg; PaCO₂ 62 mmHg, pH 7.23. Presión meseta 27 y de conducción 14 cmH₂O; perfusión sistémica estable. El equipo intenta ajustar ventilación sin provocar lesión pulmonar.",
      "prompt": "¿Qué razonamiento es apropiado según PALICC-2?",
      "options": [
        "Aceptar automáticamente PaCO₂ 62 porque pH ≥7.20 excluye contraindicaciones",
        "Normalizar CO₂ aumentando de inmediato volumen corriente sin límites de presión",
        "Inducir hiperventilación profunda sostenida como profilaxis en todo traumatismo",
        "Reconocer la hipertensión intracraneal como excepción a hipercapnia permisiva y ajustar objetivos con neurointensivos preservando protección pulmonar"
      ],
      "correct": 3,
      "why": "PALICC-2 identifica la hipertensión intracraneal como excepción. Se deben integrar CO₂, PIC y perfusión cerebral con mecánica pulmonar.",
      "others": "El objetivo de pH no se aplica indiscriminadamente cuando existen condiciones que hacen peligrosa la hipercapnia. La corrección requiere estrategia individualizada; abandonar límites protectores puede lesionar el pulmón. La hiperventilación profunda profiláctica puede comprometer perfusión cerebral; no es la respuesta universal.",
      "rationales": [
        "El objetivo de pH no se aplica indiscriminadamente cuando existen condiciones que hacen peligrosa la hipercapnia.",
        "La corrección requiere estrategia individualizada; abandonar límites protectores puede lesionar el pulmón.",
        "La hiperventilación profunda profiláctica puede comprometer perfusión cerebral; no es la respuesta universal.",
        "PALICC-2 identifica la hipertensión intracraneal como excepción. Se deben integrar CO₂, PIC y perfusión cerebral con mecánica pulmonar."
      ],
      "source": {
        "title": "PALICC-2 Executive Summary of the Second International Guidelines for Pediatric ARDS",
        "year": 2023,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9848214/",
        "locator": "3.10.1: excepciones a la hipercapnia permisiva"
      },
      "reference": "PALICC-2 Executive Summary of the Second International Guidelines for Pediatric ARDS (2023), 3.10.1: excepciones a la hipercapnia permisiva",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Resolver conflicto entre objetivos neurocríticos y protección pulmonar.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB128",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Trombocitopenia inmune persistente",
      "stem": "Niña de 10 años con trombocitopenia inmune de 11 meses. Plaquetas 13 000/mm³, epistaxis recurrente no mayor y ausencias escolares frecuentes. Respuestas breves a corticoides e inmunoglobulina IV; sin sangrado crítico. Se confirmó diagnóstico con hematología y la familia desea evitar inmunosupresión prolongada y cirugía.",
      "prompt": "Según ASH 2019, ¿qué segunda línea favorece condicionalmente la guía?",
      "options": [
        "Agonista del receptor de trombopoyetina, individualizando elección y seguimiento",
        "Rituximab como opción obligatoria antes de todo agonista de trombopoyetina",
        "Esplenectomía inmediata como alternativa preferida en este momento",
        "Corticoide diario prolongado como estrategia de mantenimiento"
      ],
      "correct": 0,
      "why": "Los agonistas del receptor de trombopoyetina se favorecen frente a rituximab o esplenectomía en niños con sangrado no mayor o afectación de calidad de vida y fracaso inicial.",
      "others": "Rituximab puede considerarse según preferencias y perfil clínico, pero no es el paso obligatorio que plantea la guía. La esplenectomía tiene riesgos permanentes y no es la opción preferida frente a agonistas en este escenario. Exposición crónica a corticoide añade toxicidad; se busca una alternativa de segunda línea.",
      "rationales": [
        "Los agonistas del receptor de trombopoyetina se favorecen frente a rituximab o esplenectomía en niños con sangrado no mayor o afectación de calidad de vida y fracaso inicial.",
        "Rituximab puede considerarse según preferencias y perfil clínico, pero no es el paso obligatorio que plantea la guía.",
        "La esplenectomía tiene riesgos permanentes y no es la opción preferida frente a agonistas en este escenario.",
        "Exposición crónica a corticoide añade toxicidad; se busca una alternativa de segunda línea."
      ],
      "source": {
        "title": "American Society of Hematology 2019 guidelines for immune thrombocytopenia",
        "year": 2019,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6963252/",
        "locator": "Recomendaciones 19 y 20"
      },
      "reference": "American Society of Hematology 2019 guidelines for immune thrombocytopenia (2019), Recomendaciones 19 y 20",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Elegir segunda línea considerando sangrado, calidad de vida, respuesta previa y preferencias.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB129",
      "section": "Hemato-oncología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Trombocitopenia inmune y decisión de ingreso",
      "stem": "Escolar de 8 años con trombocitopenia inmune de nuevo diagnóstico; plaquetas 9 000/mm³, petequias y equimosis leves, sin epistaxis ni hemorragia mucosa. Hemoglobina y leucocitos normales, frotis revisado sin hallazgos atípicos, exploración sin adenopatías ni hepatoesplenomegalia. Familia comprende alarmas y hematología garantiza revisión en 24–72 h.",
      "prompt": "Según ASH 2019, ¿qué enfoque es defendible pese a la cifra plaquetaria?",
      "options": [
        "Ingresar para inmunoglobulina IV obligatoria por plaquetas menores de 10 000/mm³",
        "Manejo ambulatorio con observación, educación y seguimiento hematológico estrecho",
        "Transfundir plaquetas profilácticamente antes del alta y programar control",
        "Iniciar corticoide prolongado para llevar plaquetas al rango normal antes del egreso"
      ],
      "correct": 1,
      "why": "La guía favorece manejo ambulatorio y observación en niños seleccionados con sangrado ausente o leve; debe existir diagnóstico razonablemente seguro y acceso a control.",
      "others": "El recuento aislado no obliga a ingreso ni inmunoglobulina si solo hay manifestaciones cutáneas y condiciones seguras de seguimiento. La transfusión profiláctica por cifra aislada no es el manejo de una trombocitopenia inmune estable sin hemorragia grave. No se busca normalizar la cifra a costa de toxicidad; las manifestaciones y el contexto guían tratamiento.",
      "rationales": [
        "El recuento aislado no obliga a ingreso ni inmunoglobulina si solo hay manifestaciones cutáneas y condiciones seguras de seguimiento.",
        "La guía favorece manejo ambulatorio y observación en niños seleccionados con sangrado ausente o leve; debe existir diagnóstico razonablemente seguro y acceso a control.",
        "La transfusión profiláctica por cifra aislada no es el manejo de una trombocitopenia inmune estable sin hemorragia grave.",
        "No se busca normalizar la cifra a costa de toxicidad; las manifestaciones y el contexto guían tratamiento."
      ],
      "source": {
        "title": "American Society of Hematology 2019 guidelines for immune thrombocytopenia",
        "year": 2019,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6963252/",
        "locator": "Recomendaciones 10a y 11: ingreso y observación en ITP pediátrica"
      },
      "reference": "American Society of Hematology 2019 guidelines for immune thrombocytopenia (2019), Recomendaciones 10a y 11: ingreso y observación en ITP pediátrica",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Ponderar fenotipo hemorrágico y seguridad del seguimiento frente a un valor extremo de laboratorio.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB130",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Osteomielitis hematógena con bacteriemia transitoria",
      "stem": "Niño de 8 años con osteomielitis tibial por S. aureus sensible a meticilina. Tras drenaje del foco y cuatro días de cefazolina IV está afebril, camina con menor dolor y PCR cayó de 115 a 22 mg/L. Hemocultivos de control negativos desde 48 h; sin evidencia de infección endovascular o focos secundarios. Tolera vía oral y hay antibiótico oral activo con seguimiento fiable.",
      "prompt": "¿Qué estrategia de continuidad favorece PIDS/IDSA 2021?",
      "options": [
        "Completar todo el curso IV por el hemocultivo inicial positivo",
        "Colocar acceso central para al menos dos semanas IV sin considerar respuesta",
        "Transición a tratamiento oral activo, guiada por evolución clínica y vigilancia",
        "Suspender todos los antibióticos al negativizar hemocultivo"
      ],
      "correct": 2,
      "why": "La guía favorece transición oral cuando es factible y la respuesta es adecuada; la bacteriemia resuelta no impide esta opción.",
      "others": "La bacteriemia transitoria no obliga a curso IV completo si se controló el foco y no hay sospecha endovascular. La duración IV no se fija únicamente por bacteriemia inicial; el acceso central agrega riesgos. La negativización de hemocultivo no demuestra erradicación de infección ósea; se completa un curso total apropiado.",
      "rationales": [
        "La bacteriemia transitoria no obliga a curso IV completo si se controló el foco y no hay sospecha endovascular.",
        "La duración IV no se fija únicamente por bacteriemia inicial; el acceso central agrega riesgos.",
        "La guía favorece transición oral cuando es factible y la respuesta es adecuada; la bacteriemia resuelta no impide esta opción.",
        "La negativización de hemocultivo no demuestra erradicación de infección ósea; se completa un curso total apropiado."
      ],
      "source": {
        "title": "PIDS/IDSA 2021 Acute Hematogenous Osteomyelitis in Pediatrics",
        "year": 2021,
        "url": "https://www.idsociety.org/practice-guideline/bone-and-joint-infections---osteomyelitis/",
        "locator": "X: transición oral, consideración de bacteriemia por S. aureus"
      },
      "reference": "PIDS/IDSA 2021 Acute Hematogenous Osteomyelitis in Pediatrics (2021), X: transición oral, consideración de bacteriemia por S. aureus",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar control microbiológico y clínico para decidir vía sin extrapolar reglas de bacteriemia adulta.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB131",
      "section": "Ortopedia",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "Osteomielitis y bacteriemia persistente",
      "stem": "Adolescente de 13 años con osteomielitis femoral por S. aureus, antibiótico activo y drenaje inicial. A las 72 h continúan hemocultivos positivos y fiebre; presenta nuevo edema de muslo, dolor y taquicardia. La exposición al fármaco está verificada y no hay una explicación microbiológica de resistencia.",
      "prompt": "¿Qué estrategia diagnóstica es prioritaria además de mantener la evaluación hemodinámica?",
      "options": [
        "Interpretar bacteriemia persistente como curso esperado si el antibiograma es favorable",
        "Cambiar antibiótico solo por fiebre sin reevaluar extensión",
        "Solicitar PCR seriada como único estudio y diferir evaluación por imagen",
        "Reevaluar control del foco e investigar trombosis venosa profunda y focos metastásicos con imagen dirigida"
      ],
      "correct": 3,
      "why": "La guía destaca trombosis y focos ocultos como causas de persistencia; el nuevo edema refuerza la necesidad de imagen dirigida.",
      "others": "La bacteriemia prolongada pese a tratamiento activo es una señal de posible foco no controlado o complicación. Un cambio empírico no sustituye búsqueda de absceso, trombosis u otro foco; el perfil de sensibilidad sigue siendo pertinente. La PCR apoya seguimiento, pero no identifica la causa anatómica de bacteriemia persistente.",
      "rationales": [
        "La bacteriemia prolongada pese a tratamiento activo es una señal de posible foco no controlado o complicación.",
        "Un cambio empírico no sustituye búsqueda de absceso, trombosis u otro foco; el perfil de sensibilidad sigue siendo pertinente.",
        "La PCR apoya seguimiento, pero no identifica la causa anatómica de bacteriemia persistente.",
        "La guía destaca trombosis y focos ocultos como causas de persistencia; el nuevo edema refuerza la necesidad de imagen dirigida."
      ],
      "source": {
        "title": "PIDS/IDSA 2021 Acute Hematogenous Osteomyelitis in Pediatrics",
        "year": 2021,
        "url": "https://www.idsociety.org/practice-guideline/bone-and-joint-infections---osteomyelitis/",
        "locator": "Manejo de fracaso terapéutico y bacteriemia persistente"
      },
      "reference": "PIDS/IDSA 2021 Acute Hematogenous Osteomyelitis in Pediatrics (2021), Manejo de fracaso terapéutico y bacteriemia persistente",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Detectar complicación vascular y foco oculto cuando la sensibilidad antimicrobiana no explica la evolución.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB132",
      "section": "Neurología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hipertensión intracraneal refractaria",
      "stem": "Niño de 9 años con traumatismo craneal grave. Tras 18 h en UCIP, PIC de 28–30 mmHg sostenida pese a sedoanalgesia, medidas posturales y bolos de solución salina al 3%. Se descartó lesión expansiva nueva que requiera evacuación inmediata; existe acceso central y monitorización continua de sodio y perfusión. Equipo neurocrítico plantea rescate osmótico.",
      "prompt": "¿Qué intervención contempla específicamente la Brain Trauma Foundation para PIC refractaria?",
      "options": [
        "Considerar bolo de solución salina hipertónica al 23.4% bajo protocolo experto y monitorización",
        "Administrar solución hipertónica concentrada como mantenimiento sin monitorizar sodio",
        "Sustituir toda terapia osmótica por hiperventilación profiláctica profunda",
        "Repetir estudios de imagen hasta resolución espontánea antes de tratar PIC"
      ],
      "correct": 0,
      "why": "La guía contempla bolos de solución al 23.4% para hipertensión intracraneal refractaria, con control de seguridad y reevaluación clínica.",
      "others": "La solución de rescate no debe convertirse en mantenimiento sin vigilancia de sodio y otras complicaciones. La hiperventilación profiláctica no es reemplazo seguro de terapia dirigida; puede reducir perfusión cerebral. La investigación etiológica no sustituye intervención urgente cuando la PIC permanece elevada.",
      "rationales": [
        "La guía contempla bolos de solución al 23.4% para hipertensión intracraneal refractaria, con control de seguridad y reevaluación clínica.",
        "La solución de rescate no debe convertirse en mantenimiento sin vigilancia de sodio y otras complicaciones.",
        "La hiperventilación profiláctica no es reemplazo seguro de terapia dirigida; puede reducir perfusión cerebral.",
        "La investigación etiológica no sustituye intervención urgente cuando la PIC permanece elevada."
      ],
      "source": {
        "title": "Brain Trauma Foundation Guidelines for Pediatric Severe TBI, 3rd edition",
        "year": 2019,
        "url": "https://braintrauma.org/coma/guidelines/pediatric",
        "locator": "Hyperosmolar therapy: refractory ICP"
      },
      "reference": "Brain Trauma Foundation Guidelines for Pediatric Severe TBI, 3rd edition (2019), Hyperosmolar therapy: refractory ICP",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Reconocer indicación de rescate osmótico y requisitos de administración segura.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB133",
      "section": "Neurología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Control de temperatura en traumatismo craneal grave",
      "stem": "Adolescente de 14 años con traumatismo craneal grave, normotermia, PIC controlada a 15 mmHg y perfusión cerebral adecuada. Se propone enfriamiento a 32–33 °C durante 48 horas para mejorar desenlaces neurológicos, aunque no presenta hipertensión intracraneal refractaria.",
      "prompt": "¿Cuál es la mejor interpretación de la guía Brain Trauma Foundation?",
      "options": [
        "La hipotermia moderada profiláctica mejora desenlaces y debe aplicarse a todo TCE grave",
        "No utilizar hipotermia profiláctica para mejorar desenlaces; puede considerarse para control de PIC en escenarios seleccionados",
        "Utilizar hipotermia solo si el Glasgow es menor de 5, aunque PIC esté controlada",
        "La hipotermia está contraindicada incluso como opción de rescate para PIC"
      ],
      "correct": 1,
      "why": "La guía diferencia indicación profiláctica sin beneficio demostrado de uso selectivo para controlar PIC.",
      "others": "Los estudios no respaldan la hipotermia profiláctica moderada para mejorar resultados generales. El Glasgow aislado no establece beneficio de hipotermia profiláctica en ausencia de PIC elevada. La guía contempla hipotermia moderada para control de PIC con cautela y protocolo especializado.",
      "rationales": [
        "Los estudios no respaldan la hipotermia profiláctica moderada para mejorar resultados generales.",
        "La guía diferencia indicación profiláctica sin beneficio demostrado de uso selectivo para controlar PIC.",
        "El Glasgow aislado no establece beneficio de hipotermia profiláctica en ausencia de PIC elevada.",
        "La guía contempla hipotermia moderada para control de PIC con cautela y protocolo especializado."
      ],
      "source": {
        "title": "Brain Trauma Foundation Guidelines for Pediatric Severe TBI, 3rd edition",
        "year": 2019,
        "url": "https://braintrauma.org/coma/guidelines/pediatric",
        "locator": "Temperature control/hypothermia: nivel II para desenlaces y III para control de PIC"
      },
      "reference": "Brain Trauma Foundation Guidelines for Pediatric Severe TBI, 3rd edition (2019), Temperature control/hypothermia: nivel II para desenlaces y III para control de PIC",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Diferenciar una intervención de rescate de su utilización preventiva no respaldada.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB134",
      "section": "Infectología y vacunología",
      "type": "caso",
      "skill": "Diagnóstico",
      "topic": "CMV congénito de diagnóstico tardío",
      "stem": "Lactante de 7 semanas con hipoacusia neurosensorial unilateral confirmada. PCR de CMV en orina positiva a los 46 días; no existe muestra de orina ni saliva de las primeras tres semanas. Se conserva tarjeta de sangre seca obtenida en el día 3 de vida; recibió leche materna desde nacimiento.",
      "prompt": "¿Qué estrategia permite discriminar infección congénita de posnatal según ECCI 2024?",
      "options": [
        "Confirmar CMV congénito exclusivamente por PCR urinaria positiva a las siete semanas",
        "Solicitar IgM actual; si es negativa descartar CMV congénito",
        "Buscar ADN de CMV retrospectivamente en sangre seca neonatal; una prueba negativa no excluye infección congénita",
        "Repetir PCR urinaria un mes después y clasificar como congénita si permanece positiva"
      ],
      "correct": 2,
      "why": "La muestra obtenida en los primeros días puede demostrar infección presente al nacimiento; su sensibilidad imperfecta impide excluirla con un resultado negativo.",
      "others": "Una muestra tardía detecta infección, pero no establece el momento de adquisición. La serología neonatal o posterior no es la herramienta apropiada para fechar la infección. La persistencia de excreción viral no permite distinguir de modo confiable adquisición prenatal de posnatal.",
      "rationales": [
        "Una muestra tardía detecta infección, pero no establece el momento de adquisición.",
        "La serología neonatal o posterior no es la herramienta apropiada para fechar la infección.",
        "La muestra obtenida en los primeros días puede demostrar infección presente al nacimiento; su sensibilidad imperfecta impide excluirla con un resultado negativo.",
        "La persistencia de excreción viral no permite distinguir de modo confiable adquisición prenatal de posnatal."
      ],
      "source": {
        "title": "ECCI Consensus recommendation for prenatal, neonatal and postnatal management of congenital CMV",
        "year": 2024,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10999471/",
        "locator": "Neonatal diagnosis: timing and dried blood spots"
      },
      "reference": "ECCI Consensus recommendation for prenatal, neonatal and postnatal management of congenital CMV (2024), Neonatal diagnosis: timing and dried blood spots",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Distinguir diagnóstico de infección del establecimiento de su cronología mediante muestra retrospectiva.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB135",
      "section": "Otorrinolaringología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "CMV congénito e hipoacusia aislada",
      "stem": "Lactante de 5 semanas con CMV congénito confirmado mediante PCR urinaria positiva en el día 10. Evaluación oftalmológica, neuroimagen, biometría y función hepática sin alteraciones; audiología confirma hipoacusia neurosensorial aislada. Función renal adecuada y acceso a infectología pediátrica y controles hematológicos. Familia solicita información sobre tratamiento antiviral.",
      "prompt": "Conforme al informe clínico AAP 2026, ¿qué decisión puede ofrecerse de manera individualizada?",
      "options": [
        "No ofrecer antiviral en ningún caso de hipoacusia aislada, aunque se detecte temprano",
        "Indicar seis meses obligatorios de valganciclovir por cualquier hipoacusia congénita",
        "Esperar al año de vida para decidir tratamiento según progresión audiológica",
        "Considerar valganciclovir oral durante seis semanas, iniciado dentro de la ventana descrita, con vigilancia y decisión compartida"
      ],
      "correct": 3,
      "why": "La tabla de AAP 2026 permite ofrecer un curso de seis semanas para hipoacusia aislada en la ventana indicada, coordinado con especialistas y monitorización.",
      "others": "El informe actualizado contempla ofrecer tratamiento en este fenotipo, aunque la decisión requiere valorar incertidumbre y toxicidad. El curso prolongado para determinados cuadros sintomáticos no se extrapola obligatoriamente a hipoacusia aislada. La opción descrita se refiere a inicio temprano, dentro de las primeras 13 semanas; esperar un año pierde esa ventana.",
      "rationales": [
        "El informe actualizado contempla ofrecer tratamiento en este fenotipo, aunque la decisión requiere valorar incertidumbre y toxicidad.",
        "El curso prolongado para determinados cuadros sintomáticos no se extrapola obligatoriamente a hipoacusia aislada.",
        "La opción descrita se refiere a inicio temprano, dentro de las primeras 13 semanas; esperar un año pierde esa ventana.",
        "La tabla de AAP 2026 permite ofrecer un curso de seis semanas para hipoacusia aislada en la ventana indicada, coordinado con especialistas y monitorización."
      ],
      "source": {
        "title": "AAP Care of the Infant With Congenital Cytomegalovirus Infection: Clinical Report",
        "year": 2026,
        "url": "https://doi.org/10.1542/peds.2026-078595",
        "locator": "Tabla de tratamiento: cCMV with isolated sensorineural hearing loss"
      },
      "reference": "AAP Care of the Infant With Congenital Cytomegalovirus Infection: Clinical Report (2026), Tabla de tratamiento: cCMV with isolated sensorineural hearing loss",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Aplicar una recomendación reciente dependiente de fenotipo, edad y balance beneficio-toxicidad.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB136",
      "section": "Neonatología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Hipotermia neonatal en prematuro tardío",
      "stem": "Recién nacido de 34+2 semanas tras desprendimiento placentario, acidosis metabólica perinatal marcada y encefalopatía moderada a las dos horas de vida. El centro dispone de hipotermia terapéutica y neurovigilancia. Se discute trasladar directamente los criterios de hipotermia de recién nacidos a término al prematuro.",
      "prompt": "Según el informe AAP 2026, ¿qué decisión es apropiada?",
      "options": [
        "No iniciar hipotermia de rutina a esta edad gestacional; brindar neurocuidados intensivos y evitar hipertermia",
        "Aplicar hipotermia estándar porque edad menor de seis horas y encefalopatía moderada bastan",
        "Aplicar hipotermia solo durante 24 h como régimen demostrado eficaz en 34 semanas",
        "Esperar hasta las 12 horas y comenzar hipotermia si persiste encefalopatía"
      ],
      "correct": 0,
      "why": "La evidencia reciente no demostró beneficio en 33–35 semanas y sugirió posible daño; a 34 semanas no se recomienda extrapolar hipotermia estándar.",
      "others": "La edad gestacional modifica elegibilidad; cumplir ventana y gravedad no elimina esta limitación. No existe respaldo de eficacia para acortar el esquema a 24 h en este grupo como alternativa validada. Demorar no transforma al niño en candidato respaldado y se aparta de las ventanas estudiadas.",
      "rationales": [
        "La evidencia reciente no demostró beneficio en 33–35 semanas y sugirió posible daño; a 34 semanas no se recomienda extrapolar hipotermia estándar.",
        "La edad gestacional modifica elegibilidad; cumplir ventana y gravedad no elimina esta limitación.",
        "No existe respaldo de eficacia para acortar el esquema a 24 h en este grupo como alternativa validada.",
        "Demorar no transforma al niño en candidato respaldado y se aparta de las ventanas estudiadas."
      ],
      "source": {
        "title": "AAP Therapeutic Hypothermia for Neonatal Hypoxic-Ischemic Encephalopathy: Clinical Report",
        "year": 2026,
        "url": "https://doi.org/10.1542/peds.2025-073627",
        "locator": "Recomendaciones por edad gestacional: ≥36 semanas; 35 semanas caso por caso"
      },
      "reference": "AAP Therapeutic Hypothermia for Neonatal Hypoxic-Ischemic Encephalopathy: Clinical Report (2026), Recomendaciones por edad gestacional: ≥36 semanas; 35 semanas caso por caso",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Integrar edad gestacional, evidencia de beneficio y daño y elegibilidad para neuroprotección.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB137",
      "section": "Neurología",
      "type": "visual",
      "skill": "Diagnóstico",
      "topic": "MOGAD y neuritis óptica",
      "stem": "Niña de 11 años con pérdida visual bilateral simultánea, dolor ocular y edema de papila. RM orbitaria demuestra realce de más de la mitad de la longitud de ambos nervios ópticos y realce perineural. AQP4-IgG negativo, MOG-IgG sérico de bajo título por ensayo celular validado. No se identifica una explicación alternativa tras evaluación especializada.",
      "prompt": "¿Qué interpretación de los criterios internacionales 2023 es apropiada?",
      "options": [
        "El título bajo excluye MOGAD pese al fenotipo típico",
        "El síndrome central, AQP4 negativo y las características de soporte permiten cumplir criterios de MOGAD pese al título bajo",
        "El título bajo confirma MOGAD por sí solo, independientemente de clínica e imagen",
        "La bilateralidad obliga a clasificar como NMOSD aunque AQP4 sea negativo y existan rasgos de MOGAD"
      ],
      "correct": 1,
      "why": "La neuritis bilateral y el realce longitudinal/perineural son características de soporte, junto con AQP4 negativo y exclusión de diagnósticos alternativos.",
      "others": "El título bajo exige evidencia adicional; no constituye exclusión automática. La positividad baja aislada puede ser inespecífica; no sustituye criterios clínicos y radiológicos. NMOSD permanece en el diferencial cuando corresponda, pero la bilateralidad no obliga a ese diagnóstico; aquí los criterios de MOGAD están respaldados.",
      "rationales": [
        "El título bajo exige evidencia adicional; no constituye exclusión automática.",
        "La neuritis bilateral y el realce longitudinal/perineural son características de soporte, junto con AQP4 negativo y exclusión de diagnósticos alternativos.",
        "La positividad baja aislada puede ser inespecífica; no sustituye criterios clínicos y radiológicos.",
        "NMOSD permanece en el diferencial cuando corresponda, pero la bilateralidad no obliga a ese diagnóstico; aquí los criterios de MOGAD están respaldados."
      ],
      "source": {
        "title": "Validation of the 2023 International Diagnostic Criteria for MOGAD in a Selected Cohort of Adults and Children",
        "year": 2024,
        "url": "https://doi.org/10.1212/WNL.0000000000209321",
        "locator": "Tabla 1 y descripción de criterios MOGAD 2023 con resultado de bajo título"
      },
      "reference": "Validation of the 2023 International Diagnostic Criteria for MOGAD in a Selected Cohort of Adults and Children (2024), Tabla 1 y descripción de criterios MOGAD 2023 con resultado de bajo título",
      "caseId": null,
      "critical": false,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Interpretar anticuerpos de baja positividad usando probabilidad preprueba y rasgos de soporte.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB138",
      "section": "Endocrinología",
      "type": "caso",
      "skill": "Tratamiento",
      "topic": "Insuficiencia suprarrenal y absorción oral",
      "stem": "Niño de 6 años con insuficiencia suprarrenal primaria en sustitución, gastroenteritis y vómitos repetidos. Recibió hidrocortisona de estrés por vía oral dos veces, pero vomitó en los siguientes diez minutos. Está alerta, TA en límite inferior normal y glucosa 67 mg/dL. La familia dispone de kit de emergencia y plan escrito.",
      "prompt": "¿Qué escalamiento corresponde conforme a BSPED 2023?",
      "options": [
        "Continuar dosis orales cada hora hasta que retenga alguna, sin solicitar ayuda",
        "Administrar antiemético y esperar hipotensión franca antes de terapia parenteral",
        "Usar hidrocortisona de emergencia IM según plan y solicitar atención urgente para evaluación y corrección metabólica",
        "Aumentar fludrocortisona oral como sustituto del glucocorticoide no absorbido"
      ],
      "correct": 2,
      "why": "La imposibilidad de retener dosis de estrés indica hidrocortisona parenteral urgente y evaluación hospitalaria, con vigilancia de glucosa y perfusión.",
      "others": "La absorción no es fiable en vómitos repetidos; insistir por vía oral puede retrasar la intervención. La crisis puede evolucionar antes de hipotensión franca; no debe esperarse al colapso. El mineralocorticoide no sustituye cortisol ni resuelve falta de absorción del glucocorticoide.",
      "rationales": [
        "La absorción no es fiable en vómitos repetidos; insistir por vía oral puede retrasar la intervención.",
        "La crisis puede evolucionar antes de hipotensión franca; no debe esperarse al colapso.",
        "La imposibilidad de retener dosis de estrés indica hidrocortisona parenteral urgente y evaluación hospitalaria, con vigilancia de glucosa y perfusión.",
        "El mineralocorticoide no sustituye cortisol ni resuelve falta de absorción del glucocorticoide."
      ],
      "source": {
        "title": "BSPED Emergency and perioperative management of adrenal insufficiency in children and young people",
        "year": 2023,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10646833/",
        "locator": "Sick day guidance: vómitos e imposibilidad de tolerar hidrocortisona oral"
      },
      "reference": "BSPED Emergency and perioperative management of adrenal insufficiency in children and young people (2023), Sick day guidance: vómitos e imposibilidad de tolerar hidrocortisona oral",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Reconocer fracaso de vía oral y actuar antes de la descompensación circulatoria.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    },
    {
      "id": "PB139",
      "section": "Endocrinología",
      "type": "caso",
      "skill": "Farmacología",
      "topic": "Cobertura perioperatoria en insuficiencia suprarrenal",
      "stem": "Adolescente de 13 años con insuficiencia suprarrenal central por cirugía hipofisaria previa. Recibe hidrocortisona habitual. Se programa laparotomía mayor bajo anestesia general, con ayuno y posible imposibilidad de vía oral en primeras 24 h. Electrolitos y glucosa normales; anestesia y endocrinología coordinan el procedimiento.",
      "prompt": "¿Qué estrategia perioperatoria corresponde según BSPED 2023?",
      "options": [
        "Mantener únicamente hidrocortisona habitual oral hasta el momento de la cirugía",
        "Administrar fludrocortisona adicional antes de inducción y omitir glucocorticoide IV",
        "Administrar glucocorticoide solo si aparece hipotensión intraoperatoria refractaria",
        "Planear hidrocortisona IV de estrés desde inducción, continuar cobertura parenteral y pasar a dosis orales de estrés cuando sea seguro"
      ],
      "correct": 3,
      "why": "La guía recomienda cobertura parenteral desde inducción y durante estrés mayor, con transición guiada por recuperación y tolerancia oral.",
      "others": "La cirugía mayor aumenta demanda de cortisol y el ayuno limita vía oral; el esquema habitual no cubre ese estrés. En insuficiencia central la aldosterona suele conservarse; el problema perioperatorio es déficit glucocorticoide. La cobertura debe ser preventiva, no esperar una crisis durante anestesia.",
      "rationales": [
        "La cirugía mayor aumenta demanda de cortisol y el ayuno limita vía oral; el esquema habitual no cubre ese estrés.",
        "En insuficiencia central la aldosterona suele conservarse; el problema perioperatorio es déficit glucocorticoide.",
        "La cobertura debe ser preventiva, no esperar una crisis durante anestesia.",
        "La guía recomienda cobertura parenteral desde inducción y durante estrés mayor, con transición guiada por recuperación y tolerancia oral."
      ],
      "source": {
        "title": "BSPED Emergency and perioperative management of adrenal insufficiency in children and young people",
        "year": 2023,
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10646833/",
        "locator": "Perioperative management: major surgery"
      },
      "reference": "BSPED Emergency and perioperative management of adrenal insufficiency in children and young people (2023), Perioperative management: major surgery",
      "caseId": null,
      "critical": true,
      "level": "board",
      "standard": "r3-specialist-v1",
      "reasoning": "Anticipar necesidad hormonal y seleccionar vía y duración según estrés quirúrgico.",
      "reviewStatus": "diseñado para R3/especialista; revisión editorial y bibliográfica; validación clínica independiente y psicométrica pendientes"
    }
  ]
});
