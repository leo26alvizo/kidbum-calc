# KidBum CALC 🩺

**Creada por Leonardo Alvizo Velázquez.**

Aplicación web progresiva (PWA) gratuita de calculadoras médicas, orientada al uso educativo y al apoyo en razonamiento clínico. Versión **0.5.3**.

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
La versión 0.5.3 usa `index.html` autocontenido. Pasaron 25 comprobaciones del motor, incluidas fechas calendario, años bisiestos, límites de Bishop, índice de choque, casos no válidos y regresión de herramientas previas. El código JavaScript se verificó sintácticamente. Esto no constituye validación clínica institucional.

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
