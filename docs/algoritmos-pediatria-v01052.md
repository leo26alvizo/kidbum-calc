# KidBum Algoritmos Pediátricos · Fase II (v0.10.52)

## Implementación

Se amplió la biblioteca de **4 a 12 algoritmos clínicos interactivos** con la misma interfaz móvil, totalmente precargada para uso offline. La portada de Pediatría ahora muestra **12 rutas interactivas**. Las ocho nuevas se incorporan con el módulo `assets/pediatria-algoritmos-extension-v01052.js`; la base 0.10.51 permanece intacta.

| Algoritmo nuevo | Objetivo clínico de la ruta | Fuente principal |
|---|---|---|
| Anafilaxia | Compromiso respiratorio/circulatorio → **adrenalina intramuscular inmediata**, sin retraso por antihistamínicos | ASCIA, actualización 2026; orientación IMSS |
| Convulsión prolongada | Crisis ≥5 minutos o repetidas sin recuperación → protocolo de estado epiléptico | IMSS 244-09 (histórica); RCH Seizures |
| Hipoglucemia | Alteración de conciencia o deglución insegura → **prohibición de vía oral**, corrección protocolizada y reevaluación | RCH Hypoglycaemia |
| Cetoacidosis diabética | Detectar lesión cerebral, inestabilidad y necesidad de tratamiento hospitalario supervisado | RCH Diabetic ketoacidosis |
| Exacerbación asmática | Identificar peligro, **descartar anafilaxia** y evaluar respuesta a tratamiento | GINA 2026; RCH Acute asthma; GPC IMSS SS-009-08 (histórica) |
| Crup | Reconocer obstrucción grave, estridor en reposo y diagnósticos alternativos como epiglotitis | RCH Croup |
| Neumonía comunitaria | Identificar hipoxemia, mala perfusión, dificultad respiratoria y criterios de evaluación hospitalaria | RCH Community acquired pneumonia; NICE NG143 |
| Lactante febril | Diferenciar grupos **8–21, 22–28 y 29–60 días**; no aplicar AAP si mal aspecto, prematuro o fuera de edad | AAP 2021, lactante febril 8–60 días; NICE NG143 |

### Enlaces de fuentes específicas

- ASCIA: https://www.allergy.org.au/hp/anaphylaxis/acute-management-guidelines
- IMSS: https://climss.imss.gob.mx/cursos/vacuna_pfizer_biontech/t1/d13.php
- IMSS 244-09: https://www.imss.gob.mx/node/85162
- RCH convulsiones: https://www.rch.org.au/clinicalguide/guideline_index/Seizures_-_acute_management/
- RCH hipoglucemia: https://www.rch.org.au/clinicalguide/guideline_index/hypoglycaemia_guideline/
- RCH CAD: https://www.rch.org.au/clinicalguide/guideline_index/Diabetic_ketoacidosis/
- GINA 2026: https://ginasthma.org/2026-gina-strategy-report/
- RCH asma: https://www.rch.org.au/clinicalguide/guideline_index/Asthma_Acute/
- IMSS asma: https://www.imss.gob.mx/sites/all/statics/guiasclinicas/009GRR.pdf
- RCH crup: https://www.rch.org.au/clinicalguide/guideline_index/croup_laryngotracheobronchitis/
- RCH neumonía: https://www.rch.org.au/clinicalguide/guideline_index/Community_acquired_pneumonia/
- NICE fiebre: https://www.nice.org.uk/guidance/ng143/chapter/Recommendations
- AAP lactante febril: https://publications.aap.org/pediatrics/article/148/2/e2021052228/180223/Clinical-Practice-Guideline-for-the-Management-of

**Jerarquía de fuentes y límites:** se identificaron los recursos mexicanos IMSS aplicables, pero sus versiones históricas NO prueban su vigencia actual. Se contrastaron con ASCIA, GINA, RCH, AAP y NICE. El flujo es una **adaptación editorial de reconocimiento de peligro y escalamiento**, no transcripción de un algoritmo original ni un esquema de prescripción validado para México. Fuentes extranjeras tienen criterios propios y no sustituyen normativa institucional mexicana.

## UX y seguridad
- 12 tarjetas, orden prioritario de cuadros críticos, filtrado por especialidad y búsqueda insensible a tildes.
- Rutas de 2–5 decisiones, botones táctiles grandes y opción **desconocido** para llevar a reevaluación; sin opciones de alta automáticas.
- Navegación atrás/reinicio, modos **Guardia/Estudio**, fuentes por ruta y acceso opcional a **PRAM**, **Triángulo de Evaluación Pediátrica** y **Kramer** (este último con advertencia de que no estima bilirrubina).
- **No hay cálculo de dosis**, concentraciones, volumen de líquidos, administración automatizada ni umbrales inventados. Toda intervención debe cotejarse con paciente, presentación, edad/peso y protocolo; el usuario debe actuar inmediatamente ante emergencia sin agotar cuestionarios.
- Funcionamiento sin conexión una vez descargada la PWA; no se transmiten ni almacenan datos de pacientes.

## QA
- `tests/pediatric-algorithms-v01051.cjs`: conserva 4 rutas anteriores.
- `tests/pediatric-algorithms-phase2-v01052.cjs`: comprueba 8 rutas nuevas, los 12 grafos completos, salidas alcanzables, signos de peligro, fuentes, ámbitos, prohibición de dosis editoriales y precarga PWA.
- `tests/pediatric-algorithms-browser-v01051.cjs`: smoke móvil de las 12 rutas.
- `tests/pediatric-algorithms-phase2-browser-v01052.cjs`: prueba las ocho nuevas en Chrome headless con escenarios de peligro y alternativas, referencias, enlaces y ausencia de desplazamiento lateral.

## Próximo alcance

**12/37 objetivos pediátricos implantados; quedan 25**. Se continúan según prioridad: PALS (paro, arritmias), ABCDE, dificultad respiratoria, meningitis, ITU, reanimación neonatal, trastornos electrolíticos y demás pendientes en [issue #58](https://github.com/leo26alvizo/kidbum-calc/issues/58). No se consideran implementados hasta revisión clínica y pruebas.

*Fecha de cotejo de fuentes: noviembre de 2026. Fuentes revisadas no equivale a cada ruta clínicamente validada por un comité local.*
