# KidBum CALC 🩺

**Creada por Leonardo Alvizo Velázquez.**

Aplicación web progresiva (PWA) gratuita de calculadoras médicas, orientada al uso educativo y al apoyo en razonamiento clínico. Versión **0.7.2**.

**Sitio web:** https://leo26alvizo.github.io/kidbum-calc/

## Contenido

- Brecha aniónica (corrección por albúmina), osmolalidad, IMC, superficie corporal, presión arterial media e índice de choque.
- CKD-EPI 2021, Cockcroft-Gault, FIB-4, qSOFA, CURB-65 y Glasgow.
- NEWS2, Wells para TVP y EP, PERC, Child-Pugh y sodio corregido por hiperglucemia.
- **Ginecología y obstetricia:** EG por FUM, FPP por FUM, FPP desde edad gestacional informada en ultrasonido, Bishop clásico e índice de choque obstétrico.

**Total: 23 calculadoras.**
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
