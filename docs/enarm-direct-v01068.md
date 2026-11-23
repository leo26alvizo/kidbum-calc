# KidBum ENARM 1.2 · Banco de preguntas directas (v0.10.68)

## Alcance y estado editorial

**210 preguntas originales**, no copiadas del ENARM y **sin casos clínicos**, organizadas en siete áreas y seis categorías. Fecha de integración: 23 de noviembre de 2026. El contenido está **pendiente de revisión clínica independiente**; la compilación y las comprobaciones de formato NO equivalen a validación médica individual.

| Especialidad | Conceptos | Mecanismos | Fisiopatología | Criterios diagnósticos | Tratamientos | Alto rendimiento | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Medicina Interna | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| Pediatría | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| Ginecología y Obstetricia | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| Cirugía General | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| Urgencias | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| Medicina Familiar | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| Salud Pública | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| **Total** | **35** | **35** | **35** | **35** | **35** | **35** | **210** |

Las 74 preguntas de los 37 casos de ENARM 1.1 se conservan, para un total de **284 reactivos originales** en la aplicación. Nunca se unen las calificaciones de los dos bancos como si fueran una puntuación oficial.

## Funciones de estudio

- Nueva ruta `enarm-direct.html` accesible desde la portada de ENARM. Mantiene identidad **Ivory Heritage** (marfil/champagne/carbón), león, contraste e imágenes ya existentes sin alterarlas.
- Filtros por siete áreas, seis tipos de conocimiento y búsqueda de texto en la pregunta. Sesiones configurables de **10, 20, 30 o 50** preguntas; si hay menos filtradas se ofrecen únicamente las disponibles.
- **Estudio**: una pregunta a la vez, una solución única, justificación al confirmar y enlace de lectura temática. No se revela anticipadamente.
- **Simulacro de práctica**: reloj orientativo de 60 s por pregunta, navegación anterior/siguiente y revisión de respuestas solo al terminar. No afirma reproducir las condiciones del ENARM.
- **Mis errores**: retoma los reactivos con fallos no recuperados. **Repaso de hoy**: utiliza el mismo calendario educativo de 1, 3, 7, 14, 30 y 60 días (que no se acelera por responder antes de la fecha).
- **Seguimiento**: conteo de preguntas únicas vistas, aciertos por categoría, intentos y pendientes de refuerzo. Señal visible «Muestra pequeña» con menos de cinco intentos.
- Almacenamiento solo en `localStorage['kidbum-enarm-direct-progress-v1']`. El banco de casos mantiene la clave distinta `kidbum-enarm-progress-v1`, sin migración ni sobrescritura. Ambos se pueden borrar por separado, tras confirmación.

## Fuentes de lectura temática para cotejo (no validación por pregunta)

Los enlaces que muestra la aplicación son **bibliografía orientativa por especialidad**; ninguna guía individual cubre automáticamente todas las preguntas de su grupo.

- Medicina Interna: [ADA Standards of Care 2026, diagnóstico](https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926); [GINA 2026](https://ginasthma.org/2026-gina-summary-guide/); [Manual Merck, regulación ácido-base](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-regulation).
- Pediatría: [OMS, neumonía y diarrea infantil](https://www.who.int/publications/i/item/9789240103412); [CDC, vacunación SRP](https://www.cdc.gov/measles/hcp/vaccine-considerations/).
- Ginecología y Obstetricia: [ACOG, preeclampsia](https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy); [OMS, hemorragia posparto](https://www.ncbi.nlm.nih.gov/books/NBK619233/table/ch3.tab28/).
- Cirugía: [WSES, apendicitis aguda 2025](https://pubmed.ncbi.nlm.nih.gov/41604201/); [Manual Merck, dolor abdominal agudo](https://www.merckmanuals.com/es-us/professional/trastornos-gastrointestinales/abdomen-agudo-y-gastroenterolog%C3%ADa-quir%C3%BArgica/dolor-abdominal-agudo).
- Urgencias: [AHA, soporte vital básico 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support); [NICE NG39, trauma](https://www.nice.org.uk/guidance/ng39/chapter/Recommendations).
- Medicina Familiar: [AHA/ACC, hipertensión 2025](https://www.ahajournals.org/doi/10.1161/HYP.0000000000000249); [CENETEC, catálogo mexicano de GPC](https://gpc.salud.gob.mx/DDIMBE/).
- Salud Pública: [CDC, principios de epidemiología](https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson3/index.html); [razón de momios](https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson3/section5.html).

Se requieren contrastes con protocolos nacionales PRONAM/CENETEC/IMSS aplicables y revisión por docentes especialistas antes de calificar los reactivos como clínicamente validados.

## Seguridad y verificaciones

- No existen órdenes médicas, tratamientos individualizados para pacientes ni solicitud de datos clínicos de terceros.
- El editor conserva explícitamente la restricción: **«Material educativo, NO oficial del ENARM, revisión clínica independiente pendiente».**
- Se generaron alternativas de respuesta para las 210 preguntas, cuatro opciones cada una. Las claves se rotan de forma determinista para repartir respuestas A–D sin patrones de una sola letra.
- QA `tests/enarm-direct-v01068.cjs` revisa **210 únicas**, 30 por área, 35 por categoría, opciones, explicaciones, claves, orden de carga, privacidad, offline e integridad 37/74.
- Se amplía Playwright para navegador real en 320, 390 y 768 px, búsqueda, filtros, respuestas, simulacro, historial separado y restauración tras recarga.
- Los 7 paquetes de contenido, la biblioteca, la UI, la hoja de estilos y la página nueva están incluidos en la instalación atómica de la PWA v0.10.68. Se reutilizan los iconos/portada actuales sin reemplazar imágenes.

## Pendientes editoriales antes de ampliar el uso académico institucional

1. Revisión clínica documentada de cada uno de los **210** reactivos por médico experto en el área, incluyendo corrección de distractores, fechas de guías e indicaciones en México.
2. Aclaración y adaptación a GPC nacionales si alguna recomendación internacional difiere; evitar convertir afirmaciones generales en decisiones para pacientes.
3. Piloto con usuarios para calcular dificultad, discriminación de distractores y ajustar contenidos sin prometer representatividad del ENARM oficial.
