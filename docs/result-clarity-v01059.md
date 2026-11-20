# KidBum · resultados clínicos más legibles (presentación v0.10.59)

**Alcance:** mejora de interfaz. No actualiza fórmulas, puntos de corte, coeficientes, guías, nomenclatura ni motores clínicos.

## Aplicación principal

La vista de resultados que comparten las calculadoras del motor principal ahora muestra:

- Resultado numérico o textual con mayor contraste, tipografía adaptable y unidades separadas visualmente.
- Etiqueta de estado neutra: «Datos pendientes», «Revisar campos», «Cálculo completado» o «Resultado no evaluable». **No** representa un semáforo de riesgo clínico.
- Progreso de campos obligatorios y, si faltan datos, lista de campos sin completar. No se consideran respuestas faltantes como normales o negativas.
- Interpretación ya suministrada por el motor original, detalles, notas y advertencia clínica, sin recalcularla ni modificarla.
- Hasta dos enlaces de referencia que **ya** estaban asociados a la calculadora, junto al panel original de fuentes y límites. Si no hay fuente registrada no se inventa una.
- Botón independiente para copiar un resumen con nombre de herramienta, **resultado calculado**, interpretación y primera fuente; excluye deliberadamente todos los campos de entrada y datos identificadores. **Nunca transmite ni guarda el resumen** automáticamente. El resultado resumido puede seguir siendo información clínica sensible: revisar antes de compartir.
- Copia bloqueada ante datos faltantes, entrada inválida o resultado no evaluable. El enlace de análisis educativo previo permanece disponible por separado.

## Calculadoras externas

La misma escala tipográfica accesible se aplica **solo** a las superficies de resultados ya existentes de Guardia Pro, Geriatría, Hepatología, Calculadoras adicionales (20), Escalas de cardioembolia y Capurro.

Estas páginas conservan sus propios estados, advertencias, fuentes y botones de copia existentes. Otras herramientas independientes (por ejemplo PAS, Wallace y Pediatría rápida) conservan sus interfaces especializadas; no se afirma que hayan sido rediseñadas.

## Seguridad, experiencia y compatibilidad

- Se mantiene la secuencia validateClinicalInputs(...) || engine.calculate(...); no cambian fórmulas.
- La mejora es visual: sin asignación automática de gravedad, diagnóstico o dosis por colores.
- Tamaño adaptable a móvil de 390 px y escritorio de 1366 px, navegación de teclado, modo de alto contraste, movimiento reducido e impresión.
- Los estilos se precargan para uso offline con nueva clave de caché atómica. No se alteran los datos de preferencias ni favoritos.
- Pruebas estáticas y Chromium móvil/escritorio verifican estados incompletos, ejemplo ficticio, limpieza, botón de copia, fuentes y ausencia de desbordamiento.

**Validación clínica:** las pruebas de software no equivalen a validación clínica institucional o farmacéutica de las escalas. Las guías específicas deben contrastarse con el entorno asistencial actual.
