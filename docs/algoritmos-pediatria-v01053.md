# KidBum Algoritmos Pediátricos — Tercera entrega v0.10.53

## Resultado: 28 de 37 rutas previstas

Se añadieron **16 nuevas rutas** al catálogo de 12 (PR #59), conservando todas las anteriores. **Quedan 9** de las 37 propuestas. Las 16 nuevas están en `assets/pediatria-algoritmos-extension-v01053.js`, importada después de los motores 0.10.51 y 0.10.52 y antes de la interfaz. Uso local/offline, sin datos identificables ni cálculos de medicación.

| Área | Nuevas rutas y prioridad | Fuentes primarias |
|---|---|---|
| Urgencias (5) | ABCDE y niño crítico, paro cardiaco PALS, bradicardia PALS, taquicardia PALS, dificultad respiratoria aguda | AHA/AAP 2025: [PALS](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support), [BLS](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support), [algoritmos oficiales](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/) |
| Neumología (1) | Escalamiento de oxigenoterapia/soporte respiratorio | [RCH Oxygen delivery](https://www.rch.org.au/rchcpg/hospital_clinical_guideline_index/oxygen_delivery/), [severidad respiratoria](https://www.rch.org.au/clinicalguide/guideline_index/assessment_of_severity_of_respiratory_conditions/) |
| Infectología (2) | Infección urinaria pediátrica; sospecha de meningitis bacteriana | [NICE NG224](https://www.nice.org.uk/guidance/ng224/chapter/Recommendations) (2022), [NICE NG240](https://www.nice.org.uk/guidance/ng240/chapter/Recommendations) (2024) |
| Neonatología (3) | Reanimación neonatal; hipoglucemia neonatal; sepsis neonatal | [AHA/AAP 2025 neonatal](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation), [RCH hipoglucemia neonatal](https://www.rch.org.au/rchcpg/hospital_clinical_guideline_index/Neonatal_hypoglycaemia/), [NICE NG195](https://www.nice.org.uk/guidance/ng195) (2021; revisiones 2024 y 2026) |
| Gastroenterología (2) | Apendicitis/abdomen agudo; vómito bilioso/invaginación | [RCH dolor abdominal agudo](https://www.rch.org.au/clinicalguide/guideline_index/Abdominal_pain_-_acute/), [RCH intussusception](https://www.rch.org.au/clinicalguide/guideline_index/intussusception/) |
| Hospitalización (3) | Trastornos de sodio (hipo/hipernatremia); lesión renal aguda; neutropenia febril | [NICE NG29](https://www.nice.org.uk/guidance/ng29/chapter/recommendations), [RCH hyponatraemia](https://www.rch.org.au/clinicalguide/guideline_index/Hyponatraemia/), [RCH hypernatraemia](https://www.rch.org.au/clinicalguide/guideline_index/Hypernatraemia/), [NICE NG148](https://www.nice.org.uk/guidance/ng148/chapter/Recommendations), [RCH febrile neutropenia](https://www.rch.org.au/clinicalguide/guideline_index/febrile_neutropenia/) |

**Referencias mexicanas identificadas para cotejo:** GPC IMSS de reanimación neonatal `632GRR` (documento histórico de 2013) y GPC IMSS de apendicitis pediátrica `031GER` (histórico de 2014). En esta versión, los pasos de reanimación neonatal se orientan por AHA/AAP 2025; no se sustituyeron por contenidos antiguos. La mera existencia de una GPC no demuestra vigencia.

## Seguridad: decisiones sin números no verificados

- **Paro PALS:** comenzar RCP inmediatamente; diferenciar ritmo desfibrilable de asistolia/AESP **solo con monitor**, no desfibrilar asistolia. No se inferirán julios, dosis de adrenalina o tiempos de fármacos a partir del diseño visual.
- **Bradicardia PALS:** FC menor de 60 con mala perfusión persistente pese a oxigenación y ventilación efectivas es señal para compresiones según AHA. Taquicardia con pulso y compromiso hemodinámico necesita evaluación experta para cardioversión sincronizada; los síntomas aislados de fiebre no equivalen a arritmia.
- **RN al nacimiento:** algoritmo **distinto de PALS**. Ventilación efectiva prioritaria en apnea/gasping o FC menor de 100; reevaluar tras ventilación y considerar compresiones si FC permanece menor de 60 pese a ventilación eficaz. El esquema NRP real depende de entrenamiento/equipo.
- **Meningitis y sepsis neonatal:** cultivos/punción lumbar solo cuando sean seguros y sin retrasar antimicrobianos en pacientes que los requieren; nunca excluir meningitis por ausencia de tríada clásica.
- **Abdomen:** vómito verde bilioso o peritonitis ameritan valoración quirúrgica inmediata; no indicar reducción por enema si hay shock/perforación/peritonitis.
- **Sodio:** urgencia neurológica primero; jamás aplicar correcciones rápidas genéricas ni una fórmula sin historia, glucosa, volumen y monitorización.
- **Inmunocomprometidos:** neutropenia febril requiere evaluación/antibióticos con oportunidad según equipo oncológico y normativa del centro, sin retraso injustificado por hemograma.
- **Resultados:** todos los finales son rojos (urgentes) o ámbar (necesitan valoración). No se concede alta automática, no se prescriben fármacos, no se calculan dosis.

## Producto y comprobaciones

- Nuevas tarjetas indexadas en **Pediatría**: 28 realmente implementadas, no el objetivo pendiente.
- Filtros: Urgencias (10), Neumología (5), Infectología (3), Neonatología (4), Gastroenterología (3), Hospitalización (3).
- Accesos a **TEP, PAS, KDIGO y documentos oficiales AHA/AAP**, con links externos en nuevas pestañas seguras.
- PWA precarga la fase III para navegación sin conexión después de actualización de caché.
- `tests/pediatric-algorithms-phase3-v01053.cjs`: recorrido exhaustivo de decisiones/nodos/salidas, prioridad de alarma, fuentes, poblaciones, prohibición de recetas automáticas y precarga offline.
- `tests/pediatric-algorithms-phase3-browser-v01053.cjs`: 38 escenarios en Chromium 390 px para 16 nuevas rutas, navegación, categorías, fuentes y diferencias clave PALS/NRP.
- Se actualizaron los navegadores de prueba v0.10.51/0.10.52 para el contador nuevo; el núcleo de esas versiones se conserva para pruebas históricas independientes.

**Limitación fundamental:** 28 algoritmos editoriales de reconocimiento y escalamiento ≠ 28 protocolos hospitalarios revisados/validados. Se requiere cotejo clínico formal, adecuación a recursos de México y aprobación institucional antes de usar como herramienta de prescripción o decisión autónoma.

## Pendientes restantes: 9/37
Faringoamigdalitis, otitis media aguda, dificultad respiratoria neonatal, problemas de alimentación/deshidratación neonatal, estabilización del prematuro, sangrado gastrointestinal, desnutrición aguda, líquidos IV de mantenimiento y anemia pediátrica. Seguimiento: [issue #58](https://github.com/leo26alvizo/kidbum-calc/issues/58).

*Fuentes web verificadas el 18 de noviembre de 2026. Revisar versiones y normativa local antes de adopción clínica.*
