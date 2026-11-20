# KidBum Urgencias y Terapia Intensiva · v0.10.56

**Actualización 19 noviembre 2026**. Nueva biblioteca accesible **desde DENTRO de la tarjeta «Urgencias y Terapia Intensiva»** de la página principal de KidBum: al seleccionar esa especialidad aparece primero el mosaico destacado «40 algoritmos clínicos». Las escalas/calculadoras previas de Urgencias permanecen en su lugar y la tarjeta de Pediatría no se modifica.

## Alcance editorial y producto

- **40 rutas clínicas para adultos (≥18 años)**, con **162 resultados posibles** conectados a un plan de conducta contextual.
- **49 fármacos reales enlazados a Pharma Pro** en **58 desenlaces** donde tienen pertinencia clínica condicionada. La biblioteca Pharma Pro original preserva sus **643 fichas**.
- **7 áreas:** Reanimación (8), Cardiovascular (8), Neurocríticos (5), Respiratorio (6), Metabólico (6), UCI y soporte (5), Trauma y toxicología (2).
- Dos preguntas habituales por ruta, con acceso visible a urgencia desde el primer clic y respuesta explícita «No puedo determinarlo». Una ruta ACLS especial separa 3 ritmos/estados y se ejecuta durante RCP, jamás antes de iniciar compresiones.
- Búsqueda insensible a tildes, filtros táctiles, botón para volver, reiniciar, referencias clínicas, enlaces a herramientas propias de KidBum, **Modo Guardia/Estudio**, contraste claro/oscuro, móvil 390 px, sin conexión tras actualizar PWA.
- La tarjeta de acceso **NO aumenta el número de calculadoras**; los algoritmos son herramientas separadas de evaluación.
- Sin captura ni almacenamiento de pacientes, sin conexión de red durante la ejecución del algoritmo, sin cálculo de medicamentos, sin emisión de órdenes y sin autorización de alta.

### Rutas publicadas

| Área | Algoritmos |
|---|---|
| **Reanimación (8)** | ABCDE del paciente crítico; paro cardiorrespiratorio ACLS 2025; bradicardia con pulso; taquiarritmia con pulso; cuidados post-ROSC; choque indiferenciado; sepsis/choque séptico SSC 2026; anafilaxia del adulto |
| **Cardiovascular (8)** | Choque cardiogénico; síndrome coronario agudo ACC/AHA 2025; edema agudo pulmonar; TEP aguda AHA 2026; síndrome aórtico agudo; emergencia hipertensiva; FA y respuesta rápida; taponamiento pericárdico |
| **Neurocríticos (5)** | EVC isquémico agudo AHA/ASA 2026; hemorragia intracerebral espontánea; estado epiléptico convulsivo; coma/alteración súbita de conciencia; hipertensión intracraneal/herniación |
| **Respiratorio (6)** | Insuficiencia respiratoria aguda; crisis asmática GINA 2026; exacerbación EPOC GOLD 2026; intubación de secuencia rápida; ventilación mecánica invasiva; SDRA adulto |
| **Metabólico (6)** | Cetoacidosis diabética; estado hiperglucémico hiperosmolar; hipoglucemia; hiperpotasemia UKKA 2026; hiponatremia; hipernatremia |
| **UCI y soporte (5)** | Lesión renal aguda; hemorragia digestiva alta; analgosedación; delirium del adulto en UCI; neutropenia febril del adulto |
| **Trauma y toxicología (2)** | Choque hemorrágico/trauma mayor; toxicidad por opioides |

## Conexión farmacológica por desenlace

Cada resultado ofrece las acciones prioritarias con una sección **«Tratamiento y farmacología vinculada»**. En los escenarios donde procede, sus tarjetas incluyen:
- Fármaco con nombre **idéntico al catálogo real** de Pharma Pro e hipervínculo profundo `./pharma-pro.html#id`.
- Papel condicionado: primera línea, tratamiento especializado, alternativa o rescate. **Las alternativas nunca se interpretan como indicación de administración simultánea**.
- Precaución concreta de vía, contraindicación o población; alerta de fármaco de alto riesgo y checklist de dosis, concentración, compatibilidad, alergias, interacciones, función renal/hepática y autorización local.
- **Sin números de dosis extrapolados ni órdenes automáticas**. Las etiquetas «Adultos» del catálogo son índices editoriales, NO verificaciones de todas las indicaciones/formulaciones en México.

### Casos límite expresamente protegidos

1. **ACLS**: FV/TV sin pulso incluye tratamiento y antiarrítmicos según secuencia; **asistolia/AESP NO se desfibrila ni muestra amiodarona**; ritmo desconocido no muestra fármaco hasta monitorizar.
2. **Anafilaxia**: adrenalina **IM**; en paro la misma sustancia es **IV/IO por algoritmo independiente**. No copiar dosis/concentración entre condiciones.
3. **Choque indiferenciado**: no se «prescribe noradrenalina» en caso no fenotipificado o estable; diferenciar séptico/cardiogénico/hemorrágico/obstructivo.
4. **Sepsis 2026**: antimicrobianos por foco/riesgo, hemodinamia individual, vasopresores cuando corresponden; no infundir todos los antimicrobianos mostrados.
5. **TEP/EVC isquémico**: las opciones de reperfusión requieren diagnóstico, ventana, contraindicaciones y equipo experto. **No hay trombolíticos en hemorragia intracerebral o disección aórtica**.
6. **Intubación**: los bloqueadores neuromusculares NO son sedantes ni analgésicos. Preoxigenación, plan de rescate y sedación posterior requieren equipo capacitado.
7. **Hiperpotasemia**: calcio protege corazón pero no elimina K; insulina-glucosa desplaza K y requiere glucemia seriada. No se liga cloruro de potasio.
8. **Hiponatremia**: cloruro de sodio hipertónico solo en la rama de encefalopatía hiponatrémica. **No aparece en hipernatremia**.
9. **Hemorragia digestiva**: no aparece anticoagulación rutinaria. Octreotida solo en situación posible de sangrado variceal.
10. **Delirium UCI**: antipsicóticos no son estándar universal; la rama crítica está enfocada en causas reversibles y protección, no sedación automática.

## Fuentes clínicas priorizadas (consultadas en noviembre de 2026)

La biblioteca identifica fuentes y años **dentro de cada algoritmo**, con enlaces externos. Principales:

- [AHA · Adult Advanced Life Support 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support), [algoritmos originales](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms) y [cuidados post-paro](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care).
- [SCCM/ESICM · Surviving Sepsis Campaign 2026](https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026).
- [ACC/AHA · SCA 2025](https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes); [AHA/ACC · EP 2026](https://professional.heart.org/en/science-news/2026-guideline-for-the-evaluation-and-management-of-acute-pulmonary-embolism-in-adults); [AHA/ASA · EVC isquémico 2026](https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke).
- [Resuscitation Council UK · Anafilaxia](https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis/emergency-treatment-anaphylactic-reactions).
- [AHA/ASA · Hemorragia intracerebral 2022](https://www.ahajournals.org/doi/10.1161/STR.0000000000000407); [NICE NG217 · estado epiléptico](https://www.nice.org.uk/guidance/ng217/chapter/7-Treating-status-epilepticus-repeated-or-cluster-seizures-and-prolonged-seizures).
- [GINA 2026](https://ginasthma.org/2026-gina-strategy-report/); [GOLD 2026](https://goldcopd.org/2026-gold-report-and-pocket-guide/); [ATS · ARDS 2024](https://academic.oup.com/ajrccm/article/209/1/24/8427573); [SCCM · ISR](https://sccm.org/clinical-resources/guidelines/guidelines/guidelines-rapid-sequence-intubation).
- [ADA · crisis hiperglucémicas del adulto 2024](https://diabetesjournals.org/care/article/47/8/1257/156758/Hyperglycemic-Crises-in-Adults-With-Diabetes-A); [UK Kidney Association · hiperpotasemia, actualización 2026](https://guidelines.ukkidney.org/hyperkalaemia/).
- [NICE NG148 · lesión renal aguda](https://www.nice.org.uk/guidance/ng148/chapter/Recommendations); [NICE CG141 · hemorragia digestiva alta](https://www.nice.org.uk/guidance/cg141); [SCCM · PADIS 2025](https://sccm.org/clinical-resources/guidelines/guidelines/focused-update-padis-guideline).

### Marco de México y límites

Se prioriza seguridad del paciente y protocolos institucionales mexicanos. Estas guías internacionales **no constituyen aprobación COFEPRIS, PRONAM vigente ni validación clínica institucional**. Es necesario cotejar cada ruta, fármaco, formulación y escalamiento con la guía nacional actual y con la infraestructura de cada hospital. Los regímenes farmacológicos siguen pendientes de validación individual. **La herramienta es un sistema editorial de reconocimiento del peligro y orientación, no un motor de tratamiento autónomo.**

## Arquitectura / QA

- `algoritmos-urgencias.html`: biblioteca independiente accesible **desde la especialidad existente**, no una especialidad adicional.
- `assets/urgencias-algoritmos-core-v01056.js`, `assets/urgencias-algoritmos-resuc-cardio-v01056.js`, `assets/urgencias-algoritmos-neuro-resp-v01056.js`, `assets/urgencias-algoritmos-metab-uci-v01056.js`, `assets/urgencias-algoritmos-build-v01056.js`: definición, ensamblado y validación de grafos, sin red.
- `assets/urgencias-farma-bridge-v01056.js`: `get(algorithmId,outcomeId)` devuelve exclusivamente información y medicamentos condicionados por la salida exacta.
- `assets/urgencias-algoritmos-ui-v01056.js`: interfaz táctil, navegación reversible, cautelas por fármaco, fuentes y modos.
- `assets/urgencias-algoritmos-v01056.css`: estilo distintivo rojo/granate, tarjetas accesibles y vista móvil; `index.html` conserva la tarjeta original Urgencias y agrega mosaico interno, sin tocar Pediatría.
- `sw.js`: nuevo cache versionado incluye todos los recursos para uso offline.
- `tests/urgencias-uci-algoritmos-v01056.cjs`: recorre todos los nodos y compara cada medicamento enlazado contra los **643 registros reales** de Pharma Pro; verifica ausencia de rutas letales de prescripción indebida.
- `tests/urgencias-uci-algoritmos-browser-v01056.cjs`: pruebas con Chrome de 390 px en las **40 rutas, los 162 finales, enlaces farmacológicos, filtros y la tarjeta dentro de Urgencias**.

**No contiene dosis automáticas, órdenes ni protocolos ejecutables.** Para reanimación real deben utilizarse formación y tablas oficiales con doble verificación.
