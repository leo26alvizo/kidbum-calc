# KidBum CALC 🩺

**Creada por Teniente Pasante de Medicina Leonardo Alvizo Velázquez.**

Aplicación web progresiva (PWA) gratuita de calculadoras médicas, orientada al uso educativo y al apoyo en razonamiento clínico. Versión **0.9.8**.

**Sitio web:** https://leo26alvizo.github.io/kidbum-calc/

## Contenido

- Brecha aniónica (corrección por albúmina), osmolalidad, IMC, superficie corporal, presión arterial media e índice de choque.
- CKD-EPI 2021, Cockcroft-Gault, FIB-4, qSOFA, CURB-65 y Glasgow.
- NEWS2, Wells para TVP y EP, PERC, Child-Pugh y sodio corregido por hiperglucemia.
- **Ginecología y obstetricia:** EG por FUM, FPP por FUM, FPP desde edad gestacional informada en ultrasonido, Bishop clásico e índice de choque obstétrico.

**Total actual: 63 calculadoras en 11 categorías.**
- Buscador, favoritos, tema oscuro y cálculos locales, sin consumo de una API de pago.

## Publicación en GitHub Pages

1. Publicar estos archivos en la raíz de la rama `main` de un repositorio público.
2. En `Settings → Pages`, configurar `Deploy from a branch`, rama `main`, carpeta `/(root)`.
3. Abrir la dirección HTTPS de GitHub Pages en Chrome para Android y elegir `Instalar aplicación` o `Agregar a pantalla principal`.
4. Abrir la aplicación una vez con conexión para activar la disponibilidad sin conexión.

## Verificación
La versión 0.6.0 usa `index.html` autocontenido. Pasaron 25 comprobaciones del motor, incluidas fechas calendario, años bisiestos, límites de Bishop, índice de choque, casos no válidos y regresión de herramientas previas. El código JavaScript se verificó sintácticamente. Esto no constituye validación clínica institucional.

Las pruebas pueden ampliarse y ejecutarse después de cada actualización; se recomienda confirmar la versión visible en Android y la instalación offline.

## Privacidad y seguridad clínica

No enviar datos identificables de pacientes. Esta aplicación no almacena valores clínicos ni los envía a servidores externos para calcular. Únicamente guarda preferencias del tema y favoritos en el navegador.

**No es un dispositivo médico validado ni reemplaza la valoración clínica, la supervisión o los protocolos institucionales.** Las fórmulas y escalas requieren corroboración de indicaciones, contexto y limitaciones. El código se publica sin una licencia de reutilización expresamente concedida.

## Novedades v0.2.0

NEWS2 (ambas escalas de saturación según indicación), Wells TVP, Wells embolia pulmonar, PERC para riesgo preprueba bajo, Child-Pugh y sodio corregido por hiperglucemia. Las decisiones clínicas requieren juicio del equipo tratante; las calculadoras no sustituyen guías ni protocolos institucionales. Se añadieron 17 comprobaciones de regresión y casos límite en el motor durante el desarrollo.

## Novedades v0.3.0

Cinco herramientas obstétricas con cálculo local y referencias visibles:

- Edad gestacional por FUM (semanas + días), con fecha de valoración escogida manualmente.
- Fecha probable de parto desde FUM fiable (+280 días).
- FPP desde fecha del ultrasonido y edad gestacional reportada (no redatar automáticamente gestaciones previamente fechadas).
- Bishop clásico 0–13 para maduración cervical, con umbral descriptivo de NICE ≤6 frente a >6.
- Índice de choque obstétrico FC/PAS; un valor superior a 0.9 puede alertar sobre inestabilidad en contexto de hemorragia posparto.

**Referencias:** [ACOG/AIUM/SMFM Methods for Estimating Due Date, reafirmado 2025](https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date), [NICE NG207](https://www.nice.org.uk/guidance/ng207/chapter/Recommendations), [Bishop clásico (NCBI)](https://www.ncbi.nlm.nih.gov/books/NBK615337/table/ch10.tab8/) y [FIGO 2022 sobre hemorragia posparto](https://pmc.ncbi.nlm.nih.gov/articles/PMC9313855/).

## KidBum AI v0.4.0 — Selector de modos

Desde cualquier calculadora con resultado válido, pulsa **Analizar con ChatGPT**, elige uno de los modos **Guardia**, **Estudio** o **Pase de visita** y confirma con **Copiar y abrir ChatGPT**. El texto preparado incluye la calculadora, datos introducidos, resultado, interpretación preliminar y precauciones. No hay acceso a una API de pago.

El teléfono abre `https://chatgpt.com/` (en app o navegador según Android). **No** se manda el mensaje por sí solo: el usuario debe pegarlo y enviarlo. No se garantiza abrir automáticamente este proyecto concreto. No incluir identificadores de pacientes. ChatGPT requiere internet; el cálculo sigue siendo local y utilizable sin conexión.


## KidBum v0.5.3 — Medical Atlas Editorial

Rediseño funcional de la interfaz existente (no maqueta):
- Portada ilustrada con estilo editorial, alto contraste y tipografía de títulos serif.
- Siete tarjetas de categorías existentes, con acceso táctil y cantidad real de herramientas por categoría.
- Vista previa individual para las 23 calculadoras; encabezados anatómicos en cada ficha.
- Paleta y acabados diferenciados para temas claro y oscuro, responsive para teléfonos y tabletas.
- Conserva búsquedas, filtros, favoritos, cálculos, referencias, formularios y los tres modos de KidBum AI.
- Ilustraciones originales vectoriales, almacenadas sin depender de servidores externos, mediante \`assets/medical-atlas.js\` (precache PWA).

**Seguridad de las ilustraciones:** representan conceptos de forma editorial. No se presentan como láminas anatómicas certificadas; se deben verificar antes de cualquier uso docente que dependa de relaciones anatómicas exactas. El sistema fue construido para permitir sustituir cada imagen sin cambiar la lógica médica. Las imágenes pictóricas originales ya están integradas en el repositorio. Son composiciones visuales educativas, pero no han recibido certificación de exactitud anatómica por un especialista.

**Inventario:** ver [las 23 asignaciones gráficas y los pendientes](docs/atlas-inventory.md).

**Pruebas:** el script \`tests/regression.cjs\` (ejecutar \`node tests/regression.cjs\`) verifica que los cálculos y elementos esenciales siguen presentes. La puesta en producción se completa cuando GitHub Pages confirme éxito; esto no implica validación clínica institucional ni prueba de apariencia en todos los dispositivos.


### Ajustes v0.5.3

- La portada utiliza una ilustración pictórica distinta de las fichas de cálculo.
- Las siete categorías reales tienen tarjetas visuales y filtros accesibles antes de la galería.
- Cada una de las 23 calculadoras carga un archivo `assets/atlas-<id>.jpg` individual. Su `onerror` utiliza el icono local como respaldo.
- Glasgow presenta opciones de respuesta táctiles con `aria-pressed`, sincronizadas con los desplegables originales, sin modificar el motor matemático.
- Se optimizó la disposición en móvil de categorías y títulos.
- Se preserva la integración con ChatGPT, favorito, tema claro/oscuro y todas las fórmulas clínicas.

La apariencia final requiere revisión de interfaz en dispositivos reales y revisión editorial/anatómica. Los activos ilustrativos no son sustitutos de las representaciones validadas de atlas o de recursos diagnósticos.


### Ajuste de nitidez v0.5.3

- La portada usa exactamente la imagen anatómica seleccionada por el autor, optimizada localmente como \`assets/portada-atlas-usuario.webp\`.
- Las imágenes anatómicas de portada, categorías y calculadoras se muestran sin reducción de opacidad, filtros de color o desenfoque.
- El texto mantiene contraste por medio de un panel y una transición localizada, sin un velo global sobre toda la ilustración.
- La portada nueva está precargada por la PWA para uso sin conexión.
- No se alteró el motor de cálculo médico.


## KidBum CALC v0.6.0 — Pediatría (12 herramientas)

Se agrega una categoría **Pediatría** sin modificar las 23 funciones clínicas preexistentes. Ahora son **35 calculadoras**.

**Crecimiento OMS 2006, nacimiento a 5 años** (ambos sexos, edad cronológica exacta en días):
- Peso para edad, longitud/talla para edad, perímetro cefálico para edad, IMC para edad, peso para longitud/talla.
- Muestran percentil y puntaje Z, más tabla local P3/P10/P25/P50/P75/P90/P97.
- Fuente original: [WorldHealthOrganization/anthro](https://github.com/WorldHealthOrganization/anthro/tree/master/data-raw/growthstandards), con seis datasets LMS originales precargados offline en `assets/who-*.js`.
- Para niños prematuros las tablas requieren valoración de edad corregida y referencias específicas; la app impide aplicar automáticamente las curvas con edad cronológica declarada en prematuridad. El peso para la edad por sí solo no diagnostica exceso de grasa u obesidad. La medición de longitud acostado o talla de pie debe corresponder con la edad.

**Hospitalización / hidratación**:
- Diuresis pediátrica en mL/kg/h, interpretación cautelosa de umbrales por duración y grupo etario.
- Balance hídrico registrado; ingresos menos egresos en mL y mL/kg.
- Holliday–Segar (100/50/20 mL/kg/día), regla rápida 4–2–1 (mL/h).
- Líquidos neonatales: rangos orientativos NICE para recién nacidos a término según día de vida (días 1–28).
- Edad corregida del prematuro, pérdida de peso porcentual entre mediciones.

**Fuentes principales:** [OMS crecimiento](https://www.who.int/tools/child-growth-standards/standards/weight-for-age), [NICE NG29](https://www.nice.org.uk/guidance/ng29/chapter/recommendations), [AAP 2018 líquidos IV](https://publications.aap.org/pediatrics/article/142/6/e20183083/37529/Clinical-Practice-Guideline-Maintenance), [KDIGO y lesión renal pediátrica](https://pmc.ncbi.nlm.nih.gov/articles/PMC5297493/), [AAP edad corregida](https://www.healthychildren.org/Spanish/ages-stages/baby/preemie/Paginas/Corrected-Age-For-Preemies.aspx).

**Límites y seguridad:** tablas WHO para 0–5 años exclusivamente, no 5–19 años; neonatos prematuros requieren curvas especializadas. Los líquidos son estimaciones o rangos, no órdenes médicas. Monitorizar pérdidas, glucosa, electrolitos y parámetros clínicos según contexto y protocolos institucionales. No hay calculadoras de prescripción farmacológica automática.

**Control técnico:** 52 pruebas de regresión completadas antes del despliegue, incluidas 22 pruebas nuevas de pediatría. Las fórmulas originales de la v0.5.3 se compararon sin cambios en su bloque de código. Esta verificación no constituye certificación ni validación hospitalaria; sigue pendiente prueba de usuario en Android.


## KidBum CALC v0.7.0 — Pediatría hospitalaria (10 herramientas adicionales)

La biblioteca ahora cuenta **45 calculadoras** (23 anteriores + 12 de pediatría v0.6 + 10 de ampliación v0.7). El motor original de las 35 previas se mantiene sin modificar. La nueva implementación está aislada en `assets/pediatric-ward.js` y se precarga por la PWA para trabajar sin conexión.

1. **Pérdidas insensibles estimadas** por superficie corporal, rango docente de 300–400 mL/m²/día, sin aplicar automáticamente a neonatos o patologías que modifican evaporación.
2. **Glucose infusion rate (GIR)** en mg/kg/min para infusión conocida, con notas orientativas por grupo neonatal y diferencia entre aportes y necesidades.
3. **Osmolaridad teórica de soluciones NaCl y dextrosa** (% p/v final), gramos de glucosa y carga de sodio. Esto no confirma compatibilidad, ruta ni formulación.
4. **Signos vitales por edad**, rangos FC/FR/PAS/PAD/PAM de tarjeta PALS 2025, no umbrales diagnósticos individuales.
5. **Volumen medio orientativo de fórmula infantil**, solamente para lactantes sanos a término de 1–11 meses; no reemplaza lactancia a demanda.
6. **Calorías de leche o fórmula**, por volumen realmente ingerido y densidad declarada en kcal/100 mL.
7. **Calorías de macronutrientes** (4–4–9), estimación de energía en una comida según gramos aportados.
8. **Verificador de dosis máximas declaradas**, compara propuesta con máximos aportados por personal clínico desde una fuente específica. NO contiene máximos automáticos ni valida indicación o vía.
9. **Acceso venoso periférico/central**, ficha de peligros por tipo de solución/fármaco sin autorizar infusión automáticamente.
10. **Suplementación del lactante**, ficha contextual AAP con vitamina D, hierro y prematuridad; no ordena suplementos ni fortificadores.

### Fuentes y límites críticos

- [NICE NG29 — fluidoterapia pediátrica](https://www.nice.org.uk/guidance/ng29/chapter/recommendations) y referencia docente para [pérdidas insensibles](https://elsevier-elibrary.com/contents/fullcontent/76602/epubcontent_v2/OEBPS/B9780323020404000018.htm).
- [RCH — GIR neonatal](https://www.rch.org.au/rchcpg/hospital_clinical_guideline_index/Neonatal_Hypoglycaemia/) y [manejo IV neonatal](https://www.rch.org.au/rchcpg/hospital_clinical_guideline_index/Neonatal_and_Infant_Intravenous_Fluid_Management/).
- [ESPGHAN/ESPEN/ESPR — complicaciones de nutrición parenteral pediátrica](https://www.clinicalnutritionjournal.com/article/S0261-5614%2818%2931175-0/abstract) y [ASPEN — seguridad de PN](https://aspenjournals.onlinelibrary.wiley.com/doi/full/10.1177/0148607114521833). El valor cercano a 900 mOsm/L en PN periférica NO es umbral universal para todos los líquidos/medicamentos ni garantiza seguridad.
- [PALS 2025 — tarjeta de signos vitales](https://guidelines.redcross.org/wp-content/uploads/2025/12/PALS-Pediatric-Systematic-Assessment.pdf).
- [AAP — fórmula orientativa](https://www.healthychildren.org/Spanish/tips-tools/ask-the-pediatrician/Paginas/How-much-formula-does-my-baby-need.aspx), [MedlinePlus — energía de fórmulas](https://medlineplus.gov/ency/article/002447.htm), [USDA — Atwater y composición de alimentos](https://fdc.nal.usda.gov/Foundation_Foods_Documentation/).
- [AAP lactancia 2022](https://publications.aap.org/pediatrics/article/150/1/e2022057988/188347/Policy-Statement-Breastfeeding-and-the-Use-of), [AAP hierro 2026](https://publications.aap.org/pediatrics/article/158/1/e2026077414/207901/).

**Pendientes deliberados por seguridad:** una base de datos de dosis máximas de medicamentos concretos, concentraciones máximas específicas por fármaco, listas exhaustivas de «solo central» y recetas de preparación de mezclas IV necesitan monografías farmacéuticas y validación hospitalaria antes de agregarse. Nunca deducir «seguro por vía periférica» usando un único valor de osmolaridad.

La estimación de pérdidas insensibles es especialmente incierta en neonatos, prematuros, ventilación, fototerapia, quemaduras y fiebre. Los intervalos de PALS son orientativos y no reemplazan percentiles de presión arterial por edad/sexo/talla. Todo resultado requiere supervisión, contexto y protocolos.


## KidBum v0.7.1 — Tarjeta principal de Pediatría

Se sustituyó la ilustración de categoría de Pediatría por la fotografía proporcionada por el autor. El recurso está optimizado como `assets/pediatria-portada.webp` (aprox. 68 KB), alojado en el repositorio y precargado por la PWA para uso offline. La tarjeta ocupa el ancho de la biblioteca y separa el texto de la foto, que conserva nitidez y color, sin difuminados. Las 45 calculadoras, tablas OMS, motor clínico y otras categorías permanecen sin cambios. Uso público de la fotografía sujeto a los derechos y autorizaciones correspondientes.


### Actualización visual v0.7.2 — Ginecología y obstetricia

La tarjeta de **Ginecología y obstetricia** utiliza la ilustración médica aportada directamente por el autor, optimizada sin recorte ni imágenes generadas como `assets/ginecologia-portada.webp`. Su formato rectangular a ancho completo y diseño responsive es equivalente al de la tarjeta de Pediatría. El encuadre de la lámina se adapta con CSS, sin filtros ni desenfoque. El archivo se agrega al precaché de la PWA. No se han cambiado calculadoras, fórmulas, favoritos ni modos de ChatGPT.


### Ajuste visual v0.7.3 — Química clínica

La tarjeta de **Química clínica** ocupa el ancho completo de la biblioteca y mantiene las mismas dimensiones que Pediatría y Ginecología. Usa exactamente la fotografía suministrada por el autor en `assets/quimica-clinica-portada.webp` (WebP optimizado, aprox. 151 KB), sin generar imágenes nuevas. La zona de texto tiene un fondo azul claro opaco y el material de laboratorio se muestra nítido, sin filtros de desenfoque. El recurso se precarga mediante `sw.js` para funcionamiento offline. No se modificó la lógica médica ni el contenido de las 45 calculadoras.


### Corrección de actualización de PWA v0.7.4

Se verificó que las tres fotografías de portada (Pediatría, Ginecología y Química clínica) existían en GitHub Pages; el problema probable era la política anterior de service worker, que servía primero HTML obsoleto desde caché. Ahora `sw.js` solicita online primero el documento HTML y los scripts JavaScript, con almacenamiento local y fallback offline. La app revisa versiones al abrir y al volver a primer plano, y recarga automáticamente solo si no hay una calculadora abierta, evitando interrumpir datos clínicos en curso.

Enlace para forzar nueva carga inicial y evitar entradas obsoletas cache-first: https://leo26alvizo.github.io/kidbum-calc/?v=074. No requiere reinstalación, cuentas ni servicios pagados. Los 45 cálculos y la autoría permanecen intactos.

**Prueba recomendada:** abrir con conexión, comprobar etiqueta v0.7.4 y las tres tarjetas; después probar sin conexión en la PWA instalada. Evitar borrar los datos del sitio salvo que resulte necesario, pues eliminaría favoritos locales.


### KidBum v0.7.5 — Escalas clínicas

Se incorporó la ilustración del sistema nervioso proporcionada por el autor a la tarjeta principal de **Escalas clínicas**. La imagen se conserva como `assets/escalas-clinicas-portada.webp` (aproximadamente 97 KB, 1536 × 864 px), sin generación de imágenes nuevas. La tarjeta comparte el formato rectangular de ancho completo y tamaños responsive de Pediatría, Ginecología y Química clínica, con panel opaco de texto e imagen nítida sin filtros. Está en el precaché offline de la PWA (v075), con esquema online-first para mantener el HTML actualizado. La lógica de las 45 calculadoras, los favoritos y los modos de ChatGPT permanecen intactos.


### KidBum v0.7.6 — Hemodinámica y Función renal

Se incorporaron, sin generar ilustraciones nuevas, los dos recursos médicos aportados por el autor: **primera imagen cardiopulmonar** en `assets/hemodinamica-portada.webp` para la tarjeta **Hemodinámica** y **segunda imagen renal/urinaria** en `assets/funcion-renal-portada.webp` para la tarjeta **Función renal**. Ambas tarjetas usan los estilos rectangulares anchos de Pediatría y Ginecología, con fondo de texto sólido, imágenes nítidas y adaptación a móviles. Las ilustraciones se optimizaron como WebP (aprox. 169 KB y 166 KB) y son parte del precaché de la PWA (`v076`). No se cambió el motor de las 45 calculadoras, ni favoritos, navegación, modos de ChatGPT o crédito de autoría. Se superaron 95 pruebas de regresión. Las etiquetas anatómicas incluidas en imágenes aportadas son parte del recurso gráfico original y no se presentan como verificaciones clínicas independientes.


### KidBum CALC v0.7.7 — Tarjetas uniformes de Hepatología y Antropometría

Las categorías **Hepatología** y **Antropometría** ahora usan el mismo diseño rectangular destacado y ancho completo de las seis categorías anteriores. Se conservan las ilustraciones locales originales `assets/atlas-fib4.jpg` y `assets/atlas-bmi.jpg`; no se generaron ni sustituyeron recursos gráficos. Se muestra cada imagen sin difuminado ni reducción de opacidad y el texto permanece legible sobre un panel opaco; diseño móvil responsive. El service worker mantiene el funcionamiento sin conexión y usa caché `v077`. Las 45 calculadoras y su lógica médica, favoritos, navegación y crédito de autoría permanecen intactos. Se superaron 102 verificaciones automatizadas de regresión.


## KidBum CALC v0.8.0 — 22 láminas pictóricas de Pediatría

- Se integraron **22 ilustraciones WebP individuales de Pediatría**, una por cada herramienta, en `assets/pediatric/<id>.webp`. Cada composición reutiliza ilustraciones anatómicas editoriales originales ya creadas para KidBum y añade un panel científico particular: crecimiento/antropometría, diuresis, balance de agua, nutrición, metabolismo o administración IV.
- Cada ilustración es local (960×540 px); el conjunto pesa aproximadamente **1.1 MB**, y está íntegramente incluido en el precaché PWA para modo offline.
- `assets/medical-atlas.js` utiliza cada WebP por identificador estable y conserva su ilustración SVG anterior como **respaldo en caso de error de carga**.
- Sin cambios en las **45 calculadoras**, dosis, fórmulas, tablas OMS, favoritos, búsqueda, navegación, tema claro/oscuro o integración con ChatGPT. Se verificó que el motor de cálculos sigue idéntico al de v0.7.7.
- Comprobación de 105 pruebas de regresión, rutas de las 22 imágenes, caché offline y fallback local.

**Límite científico:** estas composiciones sirven como apoyo visual editorial. Varios recursos reutilizan láminas de anatomía general y muestran símbolos fisiológicos; no son representaciones anatómicas pediátricas validadas ni esquemas para decidir tratamientos. No contienen cifras o rótulos clínicos generados automáticamente. Las recomendaciones clínicas se encuentran exclusivamente en los textos y cálculos verificados de las herramientas.


## KidBum CALC v0.8.1 — Icono original del autor

- Se instaló **la imagen exacta proporcionada por el autor**, sin ilustración nueva ni regeneración. Solo se redimensionó para tamaños de icono 192 × 192 y 512 × 512 px.
- Archivos locales: `kidbum-icon-192-v081.png` y `kidbum-icon-512-v081.png`.
- Se actualizaron el manifiesto PWA, favicon del navegador, icono Apple y la lista de recursos offline; el nuevo nombre de archivo ayuda a evitar que los teléfonos conserven el icono anterior.
- **Sin cambios en las 45 calculadoras ni en el motor clínico**. En dispositivos con un acceso directo antiguo, puede ser necesario eliminarlo y volver a instalar la aplicación para actualizar la imagen del lanzador.


## KidBum CALC v0.8.2 — Autoría y título de portada

- Créditos actualizados a **Teniente Pasante de Medicina Leonardo Alvizo Velázquez** en las pantallas de la app, la galería y los metadatos.
- Título de portada solicitado: **Calculadora Médica Integtal** (reproducción literal de la indicación del autor).
- Se conservaron la identidad y los iconos originales del autor, la biblioteca de 45 calculadoras y sus fórmulas.
- Se actualizó la versión de caché PWA y las pruebas de regresión de textos.


## KidBum CALC v0.8.3 — Expansión hospitalaria fase 1

Se incorporaron **Winter, delta ratio, FeNa y FeUrea** en un módulo independiente (`assets/hospital-module.js`) con validación de datos y resultados orientativos. La biblioteca suma **49 calculadoras** en ocho categorías. No se alteraron las fórmulas clínicas anteriores.

- **Winter:** HCO₃⁻ en acidosis metabólica primaria y PaCO₂ arterial observada opcional; fórmula ±2 mmHg.
- **Delta ratio:** requiere AG elevado, disminución de bicarbonato y referencias del laboratorio. Una cifra aislada no diagnostica trastornos mixtos.
- **FeNa/FeUrea:** muestras pareadas, unidades concordantes, antecedente de diuréticos y precauciones en ERC, sepsis y UCI. FeUrea exige la misma forma (urea o BUN) y unidad en ambas muestras.
- Se conservan ilustraciones originales (reutilizadas para tarjetas nuevas), icono aportado por el autor, favoritos, búsqueda y uso sin conexión. Nuevas referencias visibles y pruebas automatizadas.

**Fuentes:** [Merck Manual](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), [Delta ratio](https://pubmed.ncbi.nlm.nih.gov/19769708/), [Limitaciones del delta ratio](https://pubmed.ncbi.nlm.nih.gov/17699401/), [Kidney360 PRO](https://pubmed.ncbi.nlm.nih.gov/37384887/) y [Kidney360 CON](https://pubmed.ncbi.nlm.nih.gov/37384888/).

**Seguridad:** son herramientas de apoyo, no dispositivos clínicos validados; no sustituyen la valoración presencial ni los protocolos institucionales.


## KidBum CALC v0.9.0 — Expansión hospitalaria completada

Se incorporaron **QTc (Bazett y Fridericia), Glasgow-Blatchford y RCRI**, sumando **52 herramientas en 10 categorías**. Nuevas categorías: Cardiología y Gastroenterología. Motor independiente `assets/advanced-module.js`, sin modificar las fórmulas anteriores.

**QTc:** RR regular obligatorio; QTc por Fridericia en el resultado principal y Bazett en el desglose; alertas en QRS ancho y FC extrema. **GBS:** selecciona urea mmol/L, urea mg/dL o BUN mg/dL; se aplica tabla original de urea mmol/L y se desglosa cada criterio. Un GBS de 0–1 nunca genera indicación automática de alta. **RCRI:** cinco criterios de historial/procedimiento, creatinina sérica numérica para sexto factor; clase I–IV sin porcentaje automático de riesgo.

Se conservaron el icono original, autoría, portada, favoritos, búsqueda, envío por copia a ChatGPT y funcionalidad offline. Nuevas tarjetas reutilizan ilustraciones anteriores sin generar imágenes adicionales. Se amplió batería automatizada; se requiere además validación clínica independiente y pruebas de interfaz Android.

Fuentes: [AHA ECG QT 2009](https://www.jacc.org/doi/10.1016/j.jacc.2008.12.014), [ACG 2021](https://pubmed.ncbi.nlm.nih.gov/33929377/), [NHS Glasgow-Blatchford](https://handbook.ggcmedicines.org.uk/guidelines/gastrointestinal-system/glasgow-blatchford-score/), [AHA/ACC 2024](https://www.jacc.org/doi/10.1016/j.jacc.2024.06.013).


## KidBum CALC v0.9.1 — Imagen original en tarjeta de Cardiología

- Se añadió **la imagen exacta aportada por el autor** a `assets/cardiologia-portada.jpg`, sin modificar sus píxeles. La foto original tenía codificación JPEG pese al nombre de subida con extensión .webp.
- La tarjeta destacada de **Cardiología** usa las mismas dimensiones y estructura CSS que las otras tarjetas rectangulares de especialidad. Mantiene el encuadre central sin filtros, con `object-fit: cover` para adaptarse a cualquier pantalla.
- Recurso local disponible offline en la caché de la PWA; se actualiza la versión del caché y se añaden pruebas de regresión. Las demás tarjetas, el icono, la portada y las 52 calculadoras permanecen iguales.


## KidBum CALC v0.9.2 — Gastroenterología en tarjeta destacada

- La tarjeta de **Gastroenterología** adopta el mismo tamaño rectangular de ancho completo que Cardiología y las demás especialidades destacadas, también en móvil.
- Se conserva **exactamente la imagen existente** `assets/atlas-childpugh.jpg` mediante el mapeo `Gastroenterología → childpugh`, sin reemplazar, regenerar ni alterar el archivo.
- Se reutilizan las clases CSS de tarjeta destacada y fotografía a tamaño completo, sin filtros. Se actualizó el caché PWA para propagar los cambios.
- Sin cambios en fórmulas, icono, portada, fotografías restantes ni en las 52 calculadoras.


## KidBum CALC v0.9.3 — Imagen original del autor para Gastroenterología

- La tarjeta rectangular de **Gastroenterología** muestra exactamente el WebP transparente entregado por el autor, almacenado sin modificaciones como `assets/gastroenterologia-portada.webp`.
- La tarjeta mantiene las dimensiones destacadas anteriores: mismo ancho completo y mismas medidas responsivas que Cardiología y las otras tarjetas amplias.
- El estómago se representa completo con `object-fit: contain`, fondo marfil y sin filtros para evitar recortes de la anatomía. No se crea otra ilustración.
- El recurso se incorpora a la caché PWA para uso sin conexión. Se conserva `assets/atlas-childpugh.jpg` para las ilustraciones clínicas preexistentes y no se modifica ninguna fórmula ni cálculo.
- Se añade comprobación automatizada del recurso, su caché y las 52 calculadoras actuales.


## KidBum CALC v0.9.4 — Imagen original en Antropometría

- Se incorporó exactamente la imagen del Hombre de Vitruvio aportada por el autor, guardada en `assets/antropometria-portada.jpg` sin regenerar, borrar ni modificar su contenido.
- La tarjeta **Antropometría** conserva el mismo tamaño rectangular destacado y el diseño responsivo de las demás especialidades, con `object-fit:contain` para visualizar completa la figura anatómica.
- La tarjeta se ve en fondo pergamino, sin filtros. La imagen anterior `assets/atlas-bmi.jpg` permanece en su lugar para los recursos clínicos existentes.
- La nueva imagen se incluye en la caché offline de la PWA. No se alteraron ninguna de las 52 calculadoras, sus fórmulas, las otras tarjetas ni el icono de la aplicación.


## KidBum CALC v0.9.5 — Neurología y Raquimedular, fase 1

- Nueva categoría **Neurología y Raquimedular**: **Glasgow (GCS)** existente, **ABCD² (AIT)** y **Alteplasa (rtPA), referencia de dosis**. Total: **54 calculadoras** y **11 categorías**; no hay una Glasgow duplicada.
- GCS conserva íntegros el motor anterior, los tres componentes, la condición no evaluable (NT) y sus pruebas originales. Cambia únicamente su asignación de categoría.
- **ABCD² (0–7)**: edad ≥60, PA inicial ≥140 sistólica o ≥90 diastólica, debilidad unilateral / alteración de habla sin debilidad, duración y diabetes. Exige indicación de síntomas resueltos; se bloquea si el déficit continúa. Un resultado bajo no excluye urgencia ni sirve para alta automática.
- **Alteplasa IV (rtPA) para EVC isquémico adulto, referencia educativa**: min(peso × 0.9 mg/kg, 90 mg); 10% bolo durante 1 min y 90% infusión durante 60 min posteriores, conforme a la guía AHA/ASA 2026. Solicita confirmación de lectura y no emite orden médica, determina elegibilidad ni sirve para tenecteplasa.
- Se conserva la imagen de Neurología ya disponible para Escalas Clínicas, sin generar imágenes nuevas, y se precarga el módulo neurológico para uso sin conexión. No se modifica ningún motor clínico previo ni las tarjetas previas.
- Pendientes: **Hunt y Hess, Fisher (confirmar Fisher original/modificada), NIHSS y ASIA/ISNCSCI**, que requieren mayor revisión y validación. Ninguna herramienta de Cardiología nueva fue agregada.
- Fuentes: [Johnston y col. 2007 ABCD²](https://pubmed.ncbi.nlm.nih.gov/17258668/), [AHA AIT 2023](https://professional.heart.org/en/science-news/diagnosis-workup-risk-reduction-of-transient-ischemic-attack-in-the-emergency-department-setting), [AHA/ASA EVC isquémico agudo 2026](https://www.ahajournals.org/doi/10.1161/STR.0000000000000513) y [Glasgow oficial](https://www.glasgowcomascale.org/faq/).

**Alcance:** educativo y de verificación aritmética; no certificado como dispositivo clínico ni validado institucionalmente. Requiere evaluación médica presencial y doble verificación de medicamentos según protocolo local.


## KidBum CALC v0.9.6 — Neurología y Raquimedular completada

Se incorporaron NIHSS, Hunt y Hess, Fisher ORIGINAL y ASIA/AIS guiada. Ya están las siete herramientas solicitadas: Glasgow, ABCD², alteplasa, NIHSS, Hunt-Hess, Fisher y ASIA/AIS. Total **58 calculadoras** en 11 categorías; no se añadieron calculadoras de Cardiología.

- NIHSS: 15 ítems NINDS completos, 0–42 y UN solo en ítems específicos. UN produce total no evaluable, no cero. No decide reperfusión.
- Hunt-Hess: grado I–V para HSA confirmada, no un puntaje aditivo.
- Fisher original: grado I–IV según TAC inicial, diferencia explícita con Fisher modificada y bloquea mezcla indeterminada con hemorragia ventricular y sangre subaracnoidea gruesa.
- ASIA/AIS guiada: requiere ISNCSCI completa y NLI **previamente determinado por un profesional**, evaluación sacra S4–5, DAP, VAC, estado motor >3 segmentos debajo del nivel motor ipsilateral (incluyendo músculos no clave), y músculos clave bajo NLI para C/D. Clasifica de forma orientativa A–E; NT o datos faltantes se rechazan. **No calcula niveles motores/sensitivos, NLI ni ZPP y no sustituye la ISNCSCI 9ª edición 2026.**
- Módulo offline `assets/neurology-advanced.js`, referencias visibles y nuevas pruebas de regresión; no se alteran motores clínicos previos ni imágenes originales.

Referencias: [NINDS NIHSS oficial](https://www.ninds.nih.gov/sites/default/files/2025-03/KnowStroke_NIHStrokeScale_March2025_508c.pdf), [AAFP HSA](https://www.aafp.org/afp/2023/1000/nontraumatic-sah-ruptured-intracranial-aneurysm), [Fisher original](https://pmc.ncbi.nlm.nih.gov/articles/PMC3621041/), [ASIA/ISCoS ISNCSCI 2026](https://asia-spinalinjury.org/isncsci-resources/).

**Seguridad:** prueba automatizada aritmética no equivale a validación clínica institucional. Para AIS y NIHSS se necesita exploración presencial de personal capacitado y validación especializada.


## KidBum CALC v0.9.7 — Fotografía original de Neurología

- Se cambió exclusivamente la fotografía de la tarjeta destacada «Neurología y Raquimedular» por la imagen enviada por el autor, guardada en `assets/neurologia-portada.jpg` con sus **bytes JPEG originales**, sin regeneración ni recomprimir.
- La tarjeta mantiene las dimensiones de las otras categorías destacadas; se aplica `object-fit: cover` con encuadre centrado en la anatomía cerebral. El diseño de la tarjeta, la portada y el icono de la aplicación se conservan.
- La fotografía `assets/escalas-clinicas-portada.webp` permanece intacta y sigue utilizándose en la tarjeta «Escalas clínicas».
- Se actualizó la caché PWA para uso offline y se añadieron pruebas automatizadas de la imagen; se conservan sin alteraciones las 58 calculadoras existentes, sus fórmulas, los demás módulos y tarjetas.


## KidBum CALC v0.9.8 — Cardiología (cinco nuevas herramientas)

Se agregan cinco calculadoras en el módulo independiente `assets/cardiology-module.js`: ASCVD Pooled Cohort 2013 (solo histórica), TIMI UA/NSTEMI, TIMI STEMI, CHA₂DS₂-VASc y HAS-BLED. La aplicación alcanza **63 calculadoras**, manteniendo **11 categorías**.

- ASCVD PCE 2013 reproduce las cuatro ecuaciones originales de las cohortes estadounidense (hombres/mujeres, grupos de derivación históricos), con selección explícita y sin inferir atributos personales. **La guía ACC/AHA de 2026 recomienda PREVENT en lugar de PCE para prevención primaria; no usar PCE antigua para decidir estatinas.** Las PCE no están validadas originalmente en población mexicana y pueden descalibrarse. Fuentes: https://pmc.ncbi.nlm.nih.gov/articles/PMC4700825/ y https://professional.heart.org/en/science-news/2026-guideline-on-the-management-of-dyslipidemia/top-things-to-know
- TIMI UA/NSTEMI: siete ítems originales, 0–7. TIMI STEMI: ocho grupos ponderados, 0–14; ambos contrastados con guía ACS ACC/AHA 2025. No diagnostican SCA ni retrasan reperfusión. https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009
- CHA₂DS₂-VASc: 0–9; añade CHA₂DS₂-VA 0–8 sin sexo para comparación con ESC 2024. No ordena anticoagulación ni estima riesgos individuales con porcentajes inventados.
- HAS-BLED: 0–9 y factores correctibles; función renal y hepática separadas, ≥8 unidades de alcohol y PAS >160, umbral etario >65 años; INR lábil solo para antagonistas vitamina K. No se usa aislado para negar anticoagulación. ACC/AHA 2023 y ESC 2024.
- Wells para TVP y TEP **ya existían**: únicamente se reubicaron a Cardiología conservando motores y fórmulas. Se mantienen las 58 calculadoras previas, la portada, imágenes originales e icono, y modo PWA sin conexión. El nuevo módulo incorpora casos de aceptación y referencias visibles.

Estas herramientas son educativas y no constituyen diagnóstico, alta, prescripción o validación clínica independiente.
