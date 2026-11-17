# KidBum Pharma Pro — Indicaciones y esquemas v0.10.48 (candidato)

## Cambios implementados
- Cada una de las 643 fichas muestra un apartado explícito «¿En qué diagnósticos se utiliza?» en consulta rápida y ficha completa.
- 51 medicamentos tienen al menos una asociación medicamento–diagnóstico con fuente, procedente de las 15 rutas preexistentes o de la tabla PRONAM 2026. Los otros 592 permanecen sin asociación específica cotejada.
- El buscador encuentra medicamentos por diagnóstico vinculado, además de nombre y grupo.
- 9 antihipertensivos reciben intervalos de referencia de la tabla del PRONAM de Hipertensión Arterial Sistémica, segunda edición (2026).
- Las 3 monografías con referencias posológicas parciales de etiquetado estadounidense (ceftriaxona, enoxaparina, glargina U-300) conservan sus controles antes de mostrar una pauta.
- En conjunto 12/643 medicamentos tienen alguna referencia posológica documentada (9 PRONAM + 3 monografías US). 631/643 no tienen esquema cotejado en la biblioteca. Una pauta para una indicación no valida todas las formulaciones, poblaciones y enfermedades de ese medicamento.
- Las fichas sin suficiente evidencia permanecen explícitamente «esquema no cotejado»; se añaden búsquedas manuales externas en COFEPRIS y DailyMed, sin sugerir que los resultados están validados.

## Referencias de dosis incorporadas
Consejo de Salubridad General (México), PRONAM Hipertensión Arterial Sistémica, 2.ª ed., aprobado el 6 de marzo de 2026:
https://dof.gob.mx/2026/CSG/PRONAM_Hipertension_arterial_sistemica.pdf

Infografía, sección «Tratamiento farmacológico»:
https://pronamsalud.csg.gob.mx/infografia-hipertension-arterial-sistemica.pdf

| Principio activo | Intervalo de referencia | Frecuencia |
|---|---|---|
| Amlodipino | 5–10 mg | Cada 24 h |
| Enalapril | 10–40 mg | Cada 24 h |
| Lisinopril | 10–40 mg | Cada 24 h |
| Clortalidona | 12.5–50 mg | Cada 24 h |
| Hidroclorotiazida | 12.5–50 mg | Cada 24 h |
| Valsartán | 80–320 mg | Cada 24 h |
| Telmisartán | 40–80 mg | Cada 24 h |
| Olmesartán | 10–40 mg | Cada 24 h |
| Bisoprolol | 2.5–20 mg | Cada 24 h |

Ámbito: la infografía refiere adultos >20 años y excluye mujeres en edad fértil o embarazadas. No extrapolar a niños, embarazadas, urgencia hipertensiva ni otras indicaciones del medicamento. No constituye dosis inicial personalizada ni permite omitir ajuste por función renal, comorbilidades, formulación, respuesta o interacciones. No se incorporaron las filas de metoprolol, ramipril o carvedilol por incertidumbre de formulación o límites sin cotejo farmacéutico adicional.

## Plan para completar los 643
Cada fármaco requiere revisión independiente de: diagnóstico exacto y línea terapéutica, población/edad/gestación, principio activo/sal/presentación/concentración, vía, dosis inicial y de mantenimiento, unidades, frecuencia, duración, máximo, ajustes renal y hepático, contraindicaciones, interacciones, vigilancia, indicaciones no autorizadas, fuente primaria versionada y presentación autorizada por COFEPRIS cuando corresponda.

Los medicamentos de alto riesgo, neonatos, pacientes críticos, anticoagulantes, insulinas, quimioterapia y perfusiones IV precisan puerta de seguridad específica; las dosis no deben inferirse desde otras formulaciones. Cada ficha debe tener casos de prueba independientes y revisión clínica/farmacéutica antes del uso asistencial.

Prueba nueva: tests/pharma-diagnoses-v01048.cjs, añadida al CI. Las pruebas técnicas no equivalen a una validación médica independiente.

## Consulta de etiquetas oficiales por presentación — v0.10.49

Se añadió un lector **opt-in** para los 643 medicamentos: al abrir la ficha, el usuario puede solicitar al API público de openFDA una lista de etiquetas estadounidenses candidatas. Debe **elegir explícitamente** la etiqueta concreta; por seguridad **nunca** se adopta automáticamente la primera coincidencia (una búsqueda simple puede devolver productos combinados, vías y concentraciones diferentes). Al seleccionarla se muestran las secciones originales: indicaciones/uso, dosis y administración, presentaciones, contraindicaciones, advertencias, interacciones, pediatría, geriatría, embarazo y función renal/hepática cuando la etiqueta contenga el dato. Se ofrece acceso a DailyMed para cotejar el documento completo.

**Importante:** este mecanismo NO añade 631 pautas mexicanas validadas ni garantiza que los 643 principios activos tengan etiqueta estadounidense encontrada. No traduce, interpreta ni transforma regímenes en prescripciones; los textos pertenecen a la etiqueta seleccionada, no se ha verificado la equivalencia con la formulación de un producto mexicano. La información está disponible solamente con conexión, mediante clic voluntario; no se transmiten signos vitales, datos de pacientes ni selecciones farmacológicas salvo el término de búsqueda. El resto del catálogo sigue operando sin conexión.

**Fuente API:** https://open.fda.gov/apis/drug/label/ . openFDA aclara que la documentación de medicamentos presentada es información enviada por empresas, reformateada, sin validación farmacológica individual por la FDA y no destinada por sí sola a decisiones de atención médica. Diario oficial mexicano: verificar siempre la IPP, registro COFEPRIS y protocolos del centro.

**Prueba:** `node tests/pharma-official-label-v01049.cjs` (643 aperturas sin llamadas involuntarias, selección manual antes de mostrar dosis, secciones originales y ausencia de almacenamiento de datos clínicos). No equivale a pruebas de la conexión real, aprobación de fuentes o validación clínica independiente.
