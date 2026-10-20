# KidBum CALC v0.10.22 — Herramientas de cuidados críticos y evaluación general

## Resultado del inventario
Del listado de 14 nombres de la imagen del usuario, se incorporaron **7 herramientas nuevas**. Los siguientes ya existían, sin duplicación: APACHE II, qSOFA, CURB-65, IMC, superficie corporal BSA, mantenimiento pediátrico 4–2–1 y Holliday–Segar. El SOFA original se agregó separado de SOFA-2 (2025). Se conserva la estructura de 12 categorías y 77 herramientas previas; total **84**.

## Nuevas herramientas y fuentes verificadas

| Herramienta | Categoría | Especificación y límites |
|---|---|---|
| SOFA clásico (1996) | Urgencias y Terapia Intensiva | 6 dominios, 0–4 por dominio, puntuación 0–24; requiere tabla y contexto clínico. Distinto de SOFA-2 |
| PSI/PORT | Escalas clínicas | Adultos con neumonía adquirida en comunidad, puntuación, clases I–V. Requiere datos positivos y negativos explícitos |
| Parkland clásica / ABA 2024 | Urgencias y Terapia Intensiva | Adultos con ≥20% SCQ; 4 o 2 mL/kg/%SCQ elegidos expresamente. Solo modelo matemático, NO orden IV |
| Aldrete modificado | Escalas clínicas | 5 dominios (actividad, respiración, PA relativa, conciencia y SpO₂), 0–10. No determina alta |
| Apgar | Pediatría | Color, FC, reflejos, tono, respiración, 0–2 cada uno, momento de evaluación. No retrasar reanimación |
| Devine adulto | Antropometría | Para adultos ≥152.4 cm: masculino 50 +2.3(altura pulgadas−60), femenino 45.5 +2.3(altura pulgadas−60); peso de referencia, no dosis |
| Verificador de pauta pediátrica | Pediatría | Verifica aritmética mg/kg/TOMA × peso, máximos mg/toma y mg/día ingresados por clínico. Puede utilizar peso de referencia justificado, pero NO calcula «peso ideal» infantil automáticamente |

### Fuentes primarias o institucionales

- SOFA original: [Sepsis-3, JAMA 2016, Tabla 1](https://jamanetwork.com/journals/jama/fullarticle/2492881). El aumento de SOFA frente a basal en contexto de infección es diferente del valor total aislado.
- PSI/PORT: [Tabla PORT para neumonía — NIH PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7155735/). La clase I se identifica por algoritmo clínico de bajo riesgo; la clasificación no sustituye la valoración.
- Parkland clásica: [OMS 2024, anexo de fórmulas](https://www.ncbi.nlm.nih.gov/books/NBK609549/). [American Burn Association 2024](https://academic.oup.com/jbcr/article/45/3/565/7458089) considera 2 mL/kg/%SCQ al inicio para quemaduras extensas en adultos, con titulación posterior por respuesta. Parkland histórica 4 mL/kg/%SCQ no es estándar universal contemporáneo.
- Aldrete modificado: [Tabla de puntuación, NCBI StatPearls](https://www.ncbi.nlm.nih.gov/books/NBK594237/table/article-155763.table2/). Alta postanestésica requiere protocolos adicionales.
- Apgar: [ACOG/AAP, The Apgar Score](https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/10/the-apgar-score). Apgar no determina el inicio de reanimación ni equivale a diagnóstico de asfixia.
- Devine: [FDA, anexo B de fórmula de peso de referencia](https://www.accessdata.fda.gov/cdrh_docs/pdf16/P160013c.pdf). Histórica, no pediátrica.
- Dosis pediátrica: [WHO Model Formulary for Children](https://www.who.int/publications/i/item/9789241548373). La herramienta no contiene dosis de fármacos ni recomienda tratamientos; exige que se consulten monografías clínicas actuales, indicación, vía, función renal/hepática, contraindicaciones y la validación médica del peso aplicable.

## Seguridad y pruebas

1. Cada formulario carga un ejemplo ficticio completo y exige que no queden datos requeridos sin seleccionar.
2. Ningún puntaje por selección se asigna automáticamente a «normal» cuando el dato está vacío.
3. Las herramientas no determinan diagnóstico ni altas, ni emiten recetas o volúmenes IV.
4. Parkland presenta **volumen teórico 24 horas**, sin prescribir ritmo de infusión; el tiempo se mide desde la quemadura.
5. La calculadora pediátrica solo verifica cifras que el personal médico ya ha seleccionado; el peso de referencia se introduce expresamente y no se deriva de una fórmula adulta.
6. Las referencias corresponden a escalas históricas o guías externas; no constituyen validación institucional, y el tratamiento debe seguir los protocolos locales.

**Pruebas**: `node tests/clinical-image-additions.cjs`, `node tests/regression.cjs`, `node tests/safety-audit.cjs` y las baterías previas. Las comprobaciones del motor no sustituyen pruebas visuales en dispositivos reales ni revisión clínica independiente.
