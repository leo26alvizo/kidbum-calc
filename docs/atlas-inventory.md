# KidBum Medical Atlas Editorial — Inventario v0.7.0

Fuente: `index.html` y `assets/medical-atlas.js` de KidBum CALC.

**Estado:** 23 ilustraciones pictóricas individuales (`assets/atlas-<id>.jpg`), derivadas de 8 composiciones originales de calidad editorial, todas alojadas en el repositorio y precargadas por la PWA. Se preserva el generador SVG como respaldo para futuros diseños. Son recursos visuales educativos, no láminas anatómicas certificadas.

| ID estable | Calculadora | Categoría en la app | Ilustración específica |
|---|---|---|---|
| `anion` | Brecha aniónica | Química clínica | Tubos sanguíneos y moléculas de equilibrio ácido-base |
| `osm` | Osmolalidad calculada | Química clínica | Distribución de agua y solutos del plasma |
| `bmi` | Índice de masa corporal | Antropometría | Composición corporal y tejidos humanos |
| `bsa` | Superficie corporal | Antropometría | Contorno anatómico y superficie corporal |
| `map` | Presión arterial media | Hemodinámica | Corazón y árbol arterial |
| `shock` | Índice de choque | Hemodinámica | Circulación y perfusión periférica |
| `egfr` | TFG estimada CKD-EPI | Función renal | Riñones y glomérulo |
| `cg` | Cockcroft–Gault | Función renal | Riñón y túbulos renales |
| `fib4` | FIB-4 | Hepatología | Parénquima hepático y fibrosis |
| `qsofa` | qSOFA | Escalas clínicas | Corazón, pulmones y perfusión sistémica |
| `curb` | CURB-65 | Escalas clínicas | Pulmones y árbol bronquial |
| `correctedna` | Sodio corregido por glucosa | Química clínica | Plasma, glucosa y electrolitos |
| `news2` | NEWS2 | Escalas clínicas | Sistema respiratorio y circulación |
| `wellsdvt` | Wells para TVP | Escalas clínicas | Venas profundas de la extremidad inferior |
| `wellspe` | Wells para embolia pulmonar | Escalas clínicas | Arterias pulmonares y trombo |
| `perc` | PERC | Escalas clínicas | Circulación pulmonar y vasos |
| `childpugh` | Child-Pugh | Hepatología | Hígado y circulación portal |
| `agfum` | Edad gestacional por FUM | Ginecología y obstetricia | Útero gestante y desarrollo fetal |
| `fppfum` | Fecha probable de parto por FUM | Ginecología y obstetricia | Gestación y cronología obstétrica |
| `fppus` | FPP según ultrasonido | Ginecología y obstetricia | Ultrasonografía obstétrica |
| `bishop` | Bishop clásico | Ginecología y obstetricia | Cuello uterino y pelvis |
| `obshock` | Índice de choque obstétrico | Ginecología y obstetricia | Circulación materno-placentaria |
| `gcs` | Glasgow | Escalas clínicas | Cerebro y tronco encefálico |

## Categorías representadas
- **Química clínica**: portada basada en `anion` — 3 calculadoras
- **Antropometría**: portada basada en `bmi` — 2 calculadoras
- **Hemodinámica**: portada basada en `map` — 2 calculadoras
- **Función renal**: portada basada en `egfr` — 2 calculadoras
- **Hepatología**: portada basada en `fib4` — 2 calculadoras
- **Escalas clínicas**: portada basada en `gcs` — 7 calculadoras
- **Ginecología y obstetricia**: portada basada en `agfum` — 5 calculadoras

## Reglas de mantenimiento

- No modificar `window.KidBumEngine` para cambios de presentación.
- Cada ID del motor debe aparecer en `KidBumAtlas.ids` y tener su descripción `anatomy[id]`.
- Las 23 imágenes JPG se alojan en `assets/atlas-<id>.jpg`, con rutas proporcionadas por `assets/medical-atlas.js`. El generador SVG sigue disponible para respaldo/editorial.
- La PWA precarga el script, las 23 ilustraciones individuales y las 8 composiciones originales. Cada imagen de interfaz utiliza `./icon.svg` si no puede cargar el JPG.
- Los gráficos requieren revisión por anatomista o especialista antes de mostrarse como **representaciones científicamente validadas**.
- La interfaz preserva el formulario, los avisos de seguridad, referencias, favoritos y modos de análisis con ChatGPT.

## Pendientes de diseño

- Hecho: sustitución de los SVG como imagen principal por ilustraciones pictóricas locales. Sigue pendiente la revisión anatómica por especialidad y ajustes artísticos finos.
- Revisión visual real en Android/iOS/tableta y contraste de accesibilidad mediante dispositivos.


## Módulo Pediatría 0.6.0 — 12 recursos visuales nuevos

Las 12 herramientas añadidas tienen ilustraciones vectoriales originales ligadas a sus identificadores clínicos en `medical-atlas.js`; los 23 JPG anatómicos anteriores se conservan. Estas nuevas ilustraciones son esquemas editoriales, no placas certificadas, y aún pueden reemplazarse por versiones pictóricas después de revisión anatómica.

| ID | Herramienta | Ilustración vinculada |
|---|---|---|
| `pedwfa` | Peso por edad OMS | Silueta infantil y escala de crecimiento |
| `pedlhfa` | Longitud/talla por edad OMS | Medición de longitud corporal |
| `pedhcfa` | Perímetro cefálico por edad OMS | Cráneo pediátrico con cinta perimetral |
| `pedbmifa` | IMC por edad OMS | Tejidos corporales y proporción |
| `pedwfl` | Peso por longitud/talla | Medición dual de peso y talla |
| `pediou` | Diuresis pediátrica | Riñones y volumen urinario |
| `pedbalance` | Balance hídrico | Líquidos de ingresos y pérdidas |
| `pedholliday` | Holliday–Segar | Volumen de agua por segmentos de peso |
| `ped421` | Regla 4–2–1 | Flujo horario segmentado |
| `pedneofluids` | Líquidos del neonato | Neonato y fisiología de líquidos |
| `pedcorrected` | Edad corregida | Desarrollo prematuro y cronología |
| `peddehydration` | Cambio de peso | Pérdida de agua y medición de peso |

## Recursos adicionales

Seis tablas WHO LMS originales para ambos sexos `assets/who-{wfa,lhfa,hcfa,bmifa,wfl,wfh}.js`, usando los valores diarios 0–1826 días y rangos de longitud/talla a pasos de 0.1 cm. Todos los recursos se precargan con la PWA. El módulo clínico y los datos están separados de las otras calculadoras.


## Pediatría hospitalaria v0.7.0 — 10 ilustraciones adicionales

| Identificador | Herramienta | Recurso editorial |
|---|---|---|
| `pedinsensible` | Pérdidas insensibles | Superficie corporal y evaporación |
| `pedgir` | GIR glucosa IV | Infusión y metabolismo celular |
| `pedsolutions` | Osmolaridad y solutos | Tubos y partículas de NaCl/dextrosa |
| `pedvitals` | Signos vitales por edad | Corazón, pulmones y trazado fisiológico |
| `pedformulavol` | Volumen de fórmula | Anatomía infantil y botella |
| `pedmilkcal` | Calorías de leche | Leche y energía |
| `pedfoodcal` | Calorías de alimentos | Macronutrientes y digestión |
| `pedmaxverify` | Verificador de topes de dosis | Seguridad farmacológica |
| `pedaccess` | Acceso periférico/central | Anatomía venosa |
| `pedsupp` | Suplementos infantiles | Crecimiento y nutrición |

Las 10 láminas son **SVG editoriales originales**, asignadas por ID y reproducidas localmente; no se presentan como láminas de anatomía certificadas ni sustituyen las fotografías/atlas originales de las 23 herramientas anteriores. Revisión pictórica anatómica especializada pendiente para los nuevos esquemas.
