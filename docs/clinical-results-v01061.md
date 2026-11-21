# KidBum Clinical Results 2.0 · v0.10.61

## Alcance de la implementación

Capa exclusivamente visual compartida en `assets/clinical-results-v01061.css`, sobre el diseño existente de KidBum. Se aplica a:

- Calculadoras del motor principal (`index.html`): valor, unidad, estado **de datos** y de **cálculo** (no estado de salud), interpretación, datos faltantes, notas de seguridad, fuente y opción de copia.
- Panel integral de gasometría (`assets/guardia-gasometria.js`): mismas superficies de lectura, estados textuales “Datos pendientes”, “Revisar campos” y “Cálculo completado” derivados **solo** de los estados técnicos existentes.
- PAS (`pediatria-pas.html`): tipografía/espaciado sobre dial, semáforo, advertencias y orientación. Se preservan los colores y bandas definidos en el componente PAS y el resultado permanece al final de los datos clínicos.
- Guardia Pro (`guardia-pro.html`): tamaño del valor y diferenciación de interpretación y detalle sin cambiar el motor de puntuación.
- Diabetes & Insulin Pro (`assets/diabetes-insulin-ui.js`): estado y advertencias dentro de tarjetas legibles; prioridad visual de mensajes críticos preservada.

**No cambian**: fórmulas, criterios, umbrales, intervalos de referencia, dosis, algoritmos, mensajes clínicos, entradas exigidas, funcionamiento de la copia ni tratamientos.

## Seguridad clínica

- El indicador “Cálculo completado” afirma únicamente que se obtuvo una salida con los datos ingresados. **No** debe interpretarse como “normal”, “seguro” o “bajo riesgo”.
- Datos incompletos no se representan como negativos, y los campos inválidos continúan sin dar puntuación.
- Los mensajes críticos en PAS, gasometría y diabetes conservan sus prioridades y colores de advertencia.
- Los colores decorativos son neutrales y no codifican categorías nuevas.
- No se guardan datos clínicos nuevos ni se agregan solicitudes de red.

## PWA y actualización

El CSS nuevo se añade a `sw.js` como recurso obligatorio de la instalación atómica. El identificador de caché cambia para impedir combinar la edición antigua con esta. Los marcadores visibles y de red pasan a 0.10.61; el script de actualización conserva su nombre histórico `pwa-update-v01060.js` pero reconoce la nueva versión. Actualizar solo cuando no haya un formulario clínico activo.

## Verificación de regresión solicitada antes del despliegue

1. **Móvil:** comprobar en anchos de 320, 390, 430 y 768 px; no debe existir desbordamiento horizontal ni panel que cubra campos.
2. **Modo oscuro / contraste:** revisar contenido, unidades, advertencias, foco visible, modo de contraste forzado y tamaño de texto aumentado.
3. **Motor principal:** estado pendiente → faltantes, valores inválidos → sin resultado, resultado válido → unidad/interpretación, copia del resultado sin campos, enlaces de fuentes.
4. **Gasometría:** falta confirmación arterial → pendiente, datos fuera de rango → inválido, ejemplo ficticio → valor y advertencias, restauración → pendiente.
5. **PAS:** puntuaciones 0/3/4/6/7/10, datos faltantes, menor de 4 años y prioridad de alertas de choque/peritonitis.
6. **Diabetes:** pendientes, advertencias, estado crítico, copia habilitada solo cuando corresponde.
7. **Guardia Pro:** entradas vacías, puntuaciones completas, interpretación y opción de copia.
8. **PWA:** precarga completa del archivo CSS nuevo, instalación fallida sin activar una caché parcial, navegación offline con la caché actualizada.

Estas comprobaciones son **criterios de revisión**, no una afirmación de que se haya ejecutado un navegador en este cambio. La revisión técnica y la validación médica independiente siguen siendo necesarias antes del uso clínico.
