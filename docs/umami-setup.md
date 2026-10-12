# KidBum CALC — activar estadísticas de uso con Umami Cloud

**Estado actual:** Umami Cloud se encuentra configurado desde KidBum Calc v0.10.10 con el ID público del sitio. No hay credenciales administrativas en el repositorio. Las estadísticas se registran cuando el navegador permite el seguimiento, el dispositivo tiene conexión y el usuario no lo ha desactivado.

## Activación

1. Entra a https://cloud.umami.is/ y registra una cuenta propia. Selecciona el plan gratuito Hobby si está disponible.
2. En el panel Umami, añade un sitio llamado **KidBum CALC** con dominio **leo26alvizo.github.io** (sin la ruta `/kidbum-calc/`).
3. En los ajustes del sitio, localiza **Tracking code** y copia únicamente el valor público de `data-website-id` (UUID). El script esperado para Umami Cloud es `https://cloud.umami.is/script.js`.
4. **Completado en v0.10.10:** el identificador público quedó configurado en `assets/analytics.js`. **Nunca compartas contraseñas, API keys, tokens o cookies de acceso.**
5. Abre KidBum Calc en un navegador sin Do Not Track ni bloqueo de analítica; después consulta **Descripción general**, **Eventos** y **Tiempo real** en Umami. La aplicación continúa funcionando sin estadísticas cuando el servicio está bloqueado o no hay conexión.

## Eventos medidos

| Señal | Significado | Limitación |
| --- | --- | --- |
| Pageviews automáticas | Visitas a la dirección principal | No son personas únicas exactas |
| `kidbum_open_browser` | Se abrió como página web | Puede repetirse con recargas |
| `kidbum_open_app` | Se abrió en modo aplicación instalada | Aproxima sesiones, no instalaciones |
| `kidbum_install_android` | El navegador emitió el evento `appinstalled` | Principalmente Android/Chromium, no cubre instalaciones iOS |

**No** se registra el nombre de calculadora abierta, diagnóstico, valor, dosis, resultado, búsqueda clínica ni identificador de paciente. El rastreador se restringe al dominio de producción, no incluye parámetros ni fragmentos de URL, respeta Do Not Track y omite la referencia de procedencia en el payload. El usuario puede desactivar la analítica desde **Acerca de → Estadísticas de uso**; esa decisión permanece en su dispositivo.

Umami Cloud, como proveedor externo, puede procesar información técnica de conexión necesaria para medir visitas (consulta su aviso de privacidad y ubicación de servidores). La interfaz mantiene las calculadoras íntegramente locales y accesibles sin conexión. El seguimiento es aproximado: algunas personas usarán bloqueadores, Do Not Track, modo privado o estarán sin internet.

**El panel de resultados es privado en tu cuenta de Umami**. No se crean credenciales administrativas ni endpoints de métricas públicos en GitHub Pages. No se recomienda incrustar secretos de acceso al panel en JavaScript.

## Pruebas y publicación

Se ejecutan automáticamente:
- `node tests/regression.cjs`
- `node tests/safety-audit.cjs`
- `node tests/analytics.cjs`

Estas pruebas comprueban que el seguimiento se activa únicamente en producción, que respeta el control de privacidad y que los pageviews y eventos eliminan campos ajenos a la lista permitida. Los cálculos clínicos no cambian.
