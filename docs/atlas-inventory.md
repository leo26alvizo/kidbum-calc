# KidBum Medical Atlas Editorial — Inventario v0.5

Fuente: `index.html` y `assets/medical-atlas.js` de KidBum CALC.

**Estado:** 23 composiciones vectoriales originales asignadas por ID. Las imágenes son elementos decorativos educativos, NO láminas anatómicas certificadas ni sustitutos de referencias clínicas. Son autónomas y no requieren conexión. Las propuestas pictóricas generadas anteriormente siguen siendo referencias artísticas pendientes de sustitución/validación en el producto.

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
- Los SVG se generan dentro de `assets/medical-atlas.js` y se convierten a `data:image/svg+xml`, evitando solicitudes de red.
- La PWA almacena el script del atlas con `sw.js` y presenta un estilo de respaldo si falta.
- Los gráficos requieren revisión por anatomista o especialista antes de mostrarse como **representaciones científicamente validadas**.
- La interfaz preserva el formulario, los avisos de seguridad, referencias, favoritos y modos de análisis con ChatGPT.

## Pendientes de diseño

- Sustituir progresivamente ciertos SVG editoriales por las ilustraciones pictóricas rasterizadas originales, optimizadas para móviles, cuando estén transferidas al repositorio y revisadas.
- Revisión visual real en Android/iOS/tableta y contraste de accesibilidad mediante dispositivos.
