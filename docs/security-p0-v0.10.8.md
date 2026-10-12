# KidBum CALC 0.10.8 — Seguridad P0: bloqueos clínicos

**Alcance de esta intervención:** controles de datos obligatorios, valores inválidos, fechas imposibles, opciones fuera de escala y una contradicción de presión arterial. **No incluye** revisión clínica independiente de todas las 68 fórmulas, cambios de dosis ni nueva funcionalidad terapéutica.

## Protecciones incorporadas

- **68 formularios:** verificación común de datos obligatorios, selección perteneciente a las opciones ofrecidas, números finitos dentro de rangos previamente declarados y fechas calendario existentes. No se transforman entradas desconocidas en cero.
- **ASIA/AIS:** comprobación defensiva de los veinte campos motores opcionales y del campo de conservación motora, cuando el dato está presente, aun si la rama AIS A/B/E no lo necesita. Los campos no aplicables pueden permanecer vacíos; se mantienen las opciones NT válidas.
- **Presión arterial:** cuando un formulario incluye presión sistólica y diastólica, la diastólica no puede ser mayor que la sistólica. Se añadió el mismo bloqueo al motor de ABCD²; PAM y CURB-65 ya lo incluían.
- **Código sin conexión:** los módulos clínicos modificados están sincronizados con el paquete de arranque de la PWA, y se actualizó la caché a v0.10.8.

## Pruebas y alcance

- **68/68** formularios devuelven un resultado con su ejemplo ficticio.
- **769/769** entradas deliberadamente inválidas se rechazan en el formulario y en el motor.
- **3/3** casos de presión diastólica superior a sistólica (ABCD², PAM y CURB-65) son rechazados en ambas capas.
- **15** comprobaciones aritméticas independientes incluidas en la batería previa permanecen.
- Ejecutar `node tests/regression.cjs` y `node tests/safety-audit.cjs`. Los resultados quedan verificados mediante GitHub Actions en cada actualización del código.

## Límites que no deben confundirse con validación clínica

Estas pruebas NO demuestran que los límites de aplicación, los criterios de inclusión o exclusión, la interpretación de todos los puntajes o las tablas de crecimiento sean clínicamente correctos. No certifican un dispositivo médico ni autorizan órdenes o tratamiento. Las calculadoras de especial riesgo siguen sujetas a valoración presencial, protocolo institucional, supervisión y verificación individual antes de uso asistencial.

Esta intervención cubre la **primera barrera técnica de seguridad P0**. Pueden requerirse bloqueos clínicos adicionales a medida que se revisen casos específicos; no se declaran terminados todos los escenarios clínicos.
