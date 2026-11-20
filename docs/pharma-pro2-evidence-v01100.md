# KidBum Pharma Pro 2.0 — fase documental de seguridad

**Fecha del cotejo:** 20 de noviembre de 2026. **Aplicación publicada:** KidBum 0.10.60 (la versión general no cambia en esta entrega de Pharma Pro). **No hay validación clínica, farmacéutica institucional ni verificación de presentación mexicana registrada.**

## Alcance exacto

El catálogo general de Pharma Pro contiene **1,566 entradas** (nombres, no 1,566 monografías). Esta fase selecciona **40 medicamentos prioritarios**, con tres estados exclusivos:

- **9 fichas existentes con cotejo parcial de etiqueta estadounidense y pautas textuales condicionadas** a verificaciones de indicación, vía, edad, presentación, alergias y otros parámetros. Su motor y medidas de bloqueo **no se modificaron**: ceftriaxona, enoxaparina, glargina U-300, metformina IR, amoxicilina, omeprazol, cloruro de potasio concentrado, heparina no fraccionada, insulina lispro U-100.
- **6 fichas NUEVAS de seguridad cotejadas parcialmente con etiquetas US**, donde se muestran indicaciones DEL PRODUCTO, contraindicaciones, interacciones, vigilancia, función renal/hepática y advertencias especiales, pero **NO se muestra ninguna dosis habilitada**. Son cefepima inyectable, cefazolina inyectable, metoclopramida oral, ibuprofeno Motrin IB oral, ondansetrón oral y furosemida oral.
- **25 medicamentos prioritarios restantes**, solo como lista editorial con estado **pendiente**. No son fichas cotejadas ni pueden obtener pautas posológicas nuevas desde este módulo.

Hay **15 medicamentos con algún cotejo de fuente primaria específica** en el subconjunto de 40. Ninguno con validación clínica/farmacéutica independiente; ninguno con producto o registro COFEPRIS confirmado. La fecha de revisión no significa que la etiqueta ni la autorización mexicana se mantengan vigentes indefinidamente.

## Seis etiquetas específicas cotejadas

| Medicamento y presentación | Etiqueta US / empresa | Set ID DailyMed | Versión etiqueta | Fecha publicación |
|---|---|---|---:|---|
| Metoclopramida, Reglan **tabletas** | ANI Pharmaceuticals | de55c133-eb08-4a35-91a2-5dc093027397 | 8 | 2026-02-16 |
| Ibuprofeno, Motrin IB **capletas 200 mg** | Kenvue Brands | d21129f8-4d96-4e36-bc39-a534306dd77e | 16 | 2026-11-02 |
| Cefepima, **polvo inyectable** | Sagent Pharmaceuticals | de477f37-40f6-4295-ae72-a2ee36a8922e | 24 | 2026-09-24 |
| Cefazolina, **polvo inyectable** | Hikma | 1dc9de56-e259-4546-a1db-23119a8a088e | 13 | 2026-05-20 |
| Ondansetrón, **tabletas recubiertas** | QPharma | 2fa30bdb-f60e-40a7-98b4-c346bc85d539 | 7 | 2026-11-19 |
| Furosemida, **tabletas** | PD-Rx Pharmaceuticals | 3ba730ab-90d4-478a-80b3-1ea3edb03e4d | 18 | 2026-11-18 |

Los enlaces de cada set ID se construyen sobre `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=<set-id>`. Los apartados usados se detallan en la interfaz de cada ficha; **no se presume lectura integral del etiquetado ni equivalencia entre marcas o concentraciones**.

## Hallazgos específicos que no deben perderse

1. **Metoclopramida oral:** advertencia destacada por discinesia tardía, diferencias pediátricas, contraindicaciones gastrointestinales y reducción de pauta en deterioro renal (CrCl ≤60 mL/min) y hepático según etiqueta. **No es ficha de metoclopramida IV.**
2. **Ibuprofeno Motrin IB OTC:** riesgo gastrointestinal y cardiovascular, precaución con anticoagulantes y aspirina, advertencia desde 20 semanas de embarazo. **No es esquema de ibuprofeno pediátrico ni de receta.**
3. **Cefepima inyectable:** neurotoxicidad, especialmente relacionada con función renal, aunque posible pese a ajuste; evaluar interacciones con aminoglucósidos y diuréticos; ajustar si CrCl ≤60 mL/min según etiqueta. **No hay pauta numérica en esta ficha.**
4. **Cefazolina inyectable:** hipersensibilidad a cefalosporinas, función renal, probenecid, ámbito de indicaciones y profilaxis quirúrgica. **No validar formulación distinta ni neonatos.**
5. **Ondansetrón tabletas:** apomorfina como contraindicación, prolongación QT, serotonérgicos, limitación hepática y riesgo de íleo enmascarado. **No valida vía intravenosa ni usos fuera del alcance de esta etiqueta.**
6. **Furosemida oral:** contraindicación en anuria, riesgos de hipovolemia y alteración electrolítica, interacción con aminoglucósidos y monitorización renal. **No convierte dosis oral a IV.**

La selección no sustituye comprobación contra la información para prescribir mexicana (IPP), protocolos hospitalarios y farmacia clínica. Por diseño, cualquier pauta para indicación no revisada, función renal sin confirmar, embarazo o paciente pediátrico permanece **pendiente**.

## Referencias mexicanas y mantenimiento

- **COFEPRIS, Visor de registros sanitarios de medicamentos:** https://registros.cofepris.gob.mx/BRSDM/default.aspx — buscar la marca, formulación, estado de autorización y titular; el simple acceso al visor **no verifica automáticamente una de las fichas**.
- **Protocolos Nacionales de Atención Médica (PRONAM), Consejo de Salubridad General:** https://pronamsalud.csg.gob.mx/ — guías para afecciones priorizadas; no constituyen por sí solos la IPP de cada producto.

**Próxima fase editorial:** obtener IPP mexicana y correspondencia exacta de seis fichas, someterlas a revisión por farmacia clínica, cotejar indicación/población/función renal/interacciones/dosis, registrar revisor y fecha y entonces (únicamente entonces) considerar habilitar referencias posológicas específicas con pruebas fail-closed.

## Verificaciones técnicas

`tests/pharma-pro-evidence-v01100.cjs` cubre 40 IDs únicos existentes, 9 monografías previas sin modificación, 6 nuevos registros de seguridad etiquetada con set ID/versión/fecha, 0 nuevas pautas sin validar, ausencia de transmisión de datos desde el módulo, 40 tarjetas de escritorio y móvil, filtro de las seis fichas, navegación al detalle y precarga offline. El service worker rota la caché completa y conserva la instalación atómica.

**Advertencia:** la validación de código no constituye validación clínica ni aprobación regulatoria.
