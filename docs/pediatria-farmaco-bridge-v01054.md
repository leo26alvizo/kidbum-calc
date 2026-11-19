# KidBum v0.10.54 — Algoritmos pediátricos conectados con Pharma Pro

## Qué está implementado
**28/28 algoritmos pediátricos, 122/122 desenlaces enlazados a un plan orientativo de tratamiento**. De ellos, **39 desenlaces** cuentan con vínculos explícitos a fármacos; los restantes corresponden a soporte, observación, diagnóstico incompleto, medidas no farmacológicas o situaciones donde recomendar un fármaco sería inseguro. Los 39 desenlaces incluyen vínculos a **29 principios activos presentes en los 643 registros de Pharma Pro** (hay 36 fichas declaradas en el índice compacto de integración; varias quedan sin uso por seguridad o para futuras variantes). El número de algoritmos clínicos sigue siendo 28: el puente terapéutico no infla el catálogo de calculadoras.

Cada desenlace de la ruta abierta muestra:
- Resumen contextual de **tratamiento/objetivo** y las medidas clínicas de la ruta original.
- Tarjetas específicas por fármaco: **nombre real de Pharma Pro, rol clínico, indicación/condición, precaución y enlace directo** a `pharma-pro.html#<id>` en otra pestaña (para conservar la decisión del algoritmo).
- Etiqueta visible de **alto riesgo** según Pharma Pro y advertencia de **ausencia de ficha pediátrica/neonatal** cuando la población de la ficha solo está catalogada como adulto. Una etiqueta «Pediatría» en el catálogo NO verifica por sí sola una indicación ni una dosis.
- Checklist plegable antes de prescribir: diagnóstico y edad/peso, alergias, vías y concentraciones, función renal/hepática, interacciones, autorización del producto y guía mexicana/institucional.
- Cuando no hay enlace de fármaco, mensaje explícito de que **no se propone medicamento automáticamente**, más acceso a la biblioteca.

### Casos de seguridad críticos
- **Anafilaxia**: adrenalina IM del muslo como primera línea. Salbutamol solo si broncoespasmo persistente *después* de adrenalina; no sustituirla por antihistamínicos/corticoides.
- **Crup**: la vía de adrenalina asociada es **nebulizada** en cuadros graves/seleccionados, **no IM por defecto**. Dexametasona marcada con estado «solo Adultos» en la ficha de Pharma Pro: dosis y presentación pediátricas externas obligatorias.
- **Paro PALS**: no retrasar RCP/desfibrilación. Adrenalina según secuencia PALS; amiodarona solo en FV/TV sin pulso refractaria, *no* en asistolia/AESP.
- **Reanimación neonatal**: ventilación efectiva antes de compresiones; adrenalina asociada únicamente a rama de compresiones/soporte avanzado, nunca a «transición normal».
- **Lactante febril 8–21 días**: no se ofrece ceftriaxona por defecto. 29–60 días tiene enlace condicionado y alertas de seguridad por bilirrubina/calcio IV.
- **Bronquiolitis**: tratamiento de sostén; se excluyen broncodilatadores, corticoides y antibióticos rutinarios.
- **Ictericia neonatal**: fototerapia según nomograma, no se convierte en medicamento.
- **Hipoglucemia neonatal**: no enlazar dextrosa hipertónica concentrada ≥20% del índice adulto como si fuera una orden neonatal.
- **Disnatremia**: solución hipertónica solo contextualizada en hiponatremia grave sintomática, *nunca* hipernatremia.
- **LRA**: furosemida únicamente en sobrecarga seleccionada; no como tratamiento para revertir LRA.
- **Neutropenia febril**: alternativas antipseudomonas por protocolo; no indicar varios antibióticos alternativos simultáneamente.
- **Insulina en CAD**: tratamiento hospitalario y reevaluación de potasio, sin bolos ni dosis inventadas.

## Fuentes y validación
Los algoritmos clínicos previos tienen su propia bibliografía vinculada a cada ruta. La integración v0.10.54 usa esas fuentes **para contexto**, no transforma un diagnóstico vinculado del catálogo en una indicación pediátrica aprobada. Se contrastaron situaciones prioritarias con:
- [AHA/AAP PALS 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support).
- [ASCIA, manejo de anafilaxia, octubre de 2026](https://www.allergy.org.au/hp/anaphylaxis/acute-management-guidelines).
- [NICE NG240, meningitis, 2024](https://www.nice.org.uk/guidance/ng240/chapter/Recommendations).
- [RCH Croup](https://www.rch.org.au/clinicalguide/guideline_index/croup_laryngotracheobronchitis/).
- [RCH Febrile neutropenia](https://www.rch.org.au/clinicalguide/guideline_index/febrile_neutropenia/).
- [AAP 2021, lactante febril](https://publications.aap.org/pediatrics/article/148/2/e2021052228/180223/Clinical-Practice-Guideline-for-the-Management-of).

**Estado editorial:** estos vínculos son *contextuales/para revisión*, NO 29 monografías pediátricas individualmente cotejadas. No hay cálculo de dosis, autorización de uso, prescripción automática, sugerencias para contraindicaciones individuales ni motor de interacciones completo. Las 643 asociaciones diagnóstico–fármaco de Pharma Pro v0.10.50 siguen siendo orientativas. La adecuación a ficha del producto en México, cuadro básico/protocolo y validación clínica por centro **continúa pendiente**.

## Arquitectura
- `assets/pediatria-farmaco-bridge-v01054.js`: módulo liviano, sin red ni datos del paciente. API `window.KidBumPediatricTherapyBridge.get(algorithmId, outcomeId)`, `.validate()`, `.coverage`, `.drugs`.
- `assets/pediatria-algoritmos-ui-v01051.js`: vista terminal muestra plan contextual y tarjeta/s de Pharma Pro, con advertencias, fuente y checklist.
- `assets/pediatria-farmaco-bridge-v01054.css`: tarjetas visuales mobile-first, botones 49 px, accesibilidad, modo oscuro.
- `algoritmos-pediatria.html`, `index.html`, `sw.js`: biblioteca y portada conectadas, precarga offline.
- `tests/pediatric-pharma-bridge-v01054.cjs`: verifica contra el catálogo **real de 643** (nombre, población, alto riesgo), cobertura de **122 salidas**, roles de fármacos, integridad de enlaces y regresiones peligrosas.
- `tests/pediatric-pharma-bridge-browser-v01054.cjs`: flujos reales en Chromium móvil y recorrido de todos los 122 desenlaces, contextos y links.

## Trabajo pendiente
1. Cotejar **cada medicamento–diagnóstico–edad/indicación** con guías mexicanas vigentes e información para prescribir del producto autorizado; no confiar en el indicador editorial de poblaciones como permiso de uso.
2. Crear pautas pediátricas/neonatales de referencia con edad gestacional/posnatal, peso, formulación, vía, intervalos, contraindicaciones, ajustes renal/hepático, monitorización y fuentes, **solo para cada indicación verificada**.
3. Incorporar pruebas farmacológicas independientes y revisión institucional antes de plantear cálculo de dosis o prescripción asistida. Seguimiento de dosis originales: [issue #55](https://github.com/leo26alvizo/kidbum-calc/issues/55).
4. Continuar los nueve algoritmos pediátricos aún pendientes: [issue #58](https://github.com/leo26alvizo/kidbum-calc/issues/58).

*Fecha de referencia de la integración: 18 de noviembre de 2026. Los resultados clínicos son apoyo orientativo y no reemplazan evaluación médica ni protocolo del hospital.*
