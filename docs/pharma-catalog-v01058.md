# KidBum Pharma Pro · catálogo de descubrimiento v0.10.58

**Fecha de preparación:** 20 de noviembre de 2026  
**Alcance:** ampliación terminológica para búsqueda **sin emisión de prescripciones**.

## Resumen cuantitativo

| Indicador | Total |
| --- | ---: |
| Registros de búsqueda originales | 643 |
| Nuevas entradas sin duplicado normalizado | **923** |
| Registros totales en Pharma Pro | **1,566** |
| Grupos editoriales nuevos | **29** |
| Entradas con cotejo documental parcial de etiqueta US (sin validación independiente) | **9** |
| Entradas sin cotejo documental de etiqueta | **1,557** |
| Entradas con validación clínica/farmacéutica independiente documentada | **0** |
| Registros con asociaciones diagnósticas editoriales heredadas | **643** |
| Nuevos registros SIN asociación diagnóstica individual revisada | **923** |
| Rutas clínicas previamente documentadas (sin cambios) | **15** |

## Áreas ampliadas

Antibacterianos de reserva; antimicobacterianos; antivirales y antirretrovirales; antifúngicos; antiparasitarios; cardiovascular, anticoagulación y lípidos; neumología y alergia; diabetes; endocrinología; gastroenterología; nefrología; neurología; psiquiatría; anestesia y urgencias; hematología; oncología citotóxica, dirigida e inmunoterapia; reumatología; dermatología; oftalmología; ginecología y urología; genética y enfermedades raras; toxicología; vacunas e inmunoglobulinas.

## Reglas de seguridad

1. Las 923 entradas nuevas son **solo nomenclatura editorial / búsqueda**, no monografías cotejadas.
2. La población de uso nueva se etiqueta **«No verificada»**. No se infiere autorización pediátrica, neonatal ni en adultos.
3. Cada ficha nueva muestra **«Sin cotejo de riesgos»**; no tener insignia ISMP **no** acredita bajo riesgo.
4. No se completan automáticamente indicaciones, diagnósticos, interacciones, dosis, preparaciones IV, intervalos, máximos ni ajustes renal/hepático.
5. La conciliación alerta explícitamente cuando incluye una ficha nueva y declara que una búsqueda sin alertas **no demuestra seguridad**.
6. La base no confirma **registro COFEPRIS, inclusión en el CNIS, comercialización ni disponibilidad en México** para cada medicamento. Algunas entradas pueden corresponder a productos internacionales, variantes de formulación o grupos de vacunas que requieren identificación de producto.
7. El índice de búsqueda global contiene únicamente **identificador + nombre**; no guarda información de pacientes.

## Fuentes marco para la verificación editorial futura

- [OMS: Lista Modelo de Medicamentos Esenciales 24.ª edición (septiembre de 2025)](https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists). Es una lista de prioridad sanitaria, **no** una validación individual de todos los nombres añadidos.
- [Consejo de Salubridad General: Compendio Nacional de Insumos para la Salud versión 2025 y actualizaciones](https://www.gob.mx/csg/articulos/acuerdos-por-el-que-se-actualiza-el-compendio-nacional-de-insumos-para-la-salud). **El CNIS y sus actualizaciones** son referencias mexicanas para confirmar inclusión y variantes, caso por caso.
- [ACNIS · actualizaciones del Compendio](https://acnis.csg.gob.mx/). Las solicitudes en trámite o no procedentes **no** se interpretan como aprobaciones.
- [COFEPRIS: consulta de registros sanitarios](https://registros.cofepris.gob.mx/BRSDM/default.aspx). Debe verificarse el registro de cada presentación y titular.
- [Centro Colaborador OMS: ATC/DDD 2026](https://atcddd.fhi.no/atc_ddd_index/). Orienta nomenclatura y clasificación; el código ATC **no** supone autorización clínica o regulatoria en México.

**Nota de procedencia:** estas fuentes identifican estándares y directorios para la siguiente etapa de auditoría. La colección v0.10.58 fue **curada editorialmente**, no extraída ni cotejada exhaustivamente contra esos documentos. **No atribuir a OMS/CNIS una aprobación o inclusión de los 923 nombres.**

## Integración técnica

- `assets/pharma-broad-index-v01058.js`: anexo aditivo idempotente por nombre normalizado.
- `assets/pharma-pro-core.js`: nueva población `U: No verificada`; motor previo sin cambios.
- `assets/clinical-drug-names-v01057.js`: 1,566 enlaces de búsqueda, sin datos clínicos.
- `pharma-pro.html`: incorporado el anexo antes de inicializar el motor y actualizado el texto de alcance.
- `sw.js`: índice incluido en la instalación offline **atómica** con versión de caché renovada.
- `tests/pharma-broad-index-v01058.cjs`: unicidad, ausencia de aprobación, contadores, seguridad, búsqueda y caché.

## Próximo proceso de curaduría

Auditar por prioridad clínica: medicamentos de alto riesgo y de guardia, antimicrobianos, fármacos pediátricos/neonatales, anticoagulantes e insulinas. Por **cada medicamento y presentación**: nombre DCI, estado COFEPRIS/CNIS con fecha, IPP mexicana, población, indicación, contraindicaciones, interacciones críticas, ISMP/LASA, fuentes específicas y revisión de Farmacia Clínica. Publicar dosis **solo** después del cotejo de uso clínico, población, vía y formulación pertinentes.
