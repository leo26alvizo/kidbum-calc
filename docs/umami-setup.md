# KidBum CALC — activar estadísticas de uso con Umami Cloud

**Estado actual:** el módulo está preparado pero desactivado; la constante `WEBSITE_ID` de `assets/analytics.js` está vacía. No se hacen solicitudes a servidores externos de analítica hasta completar la configuración.

## Activación

1. Entra a https://cloud.umami.is/ y registra una cuenta propia. Selecciona el plan gratuito Hobby si está disponible.
2. En el panel Umami, añade un sitio llamado **KidBum CALC** con dominio **leo26alvizo.github.io** (sin la ruta `/kidbum-calc/`).
3. En los ajustes del sitio, localiza **Tracking code** y copia únicamente el valor público de `data-website-id` (UUID). El script esperado para Umami Cloud es `https://cloud.umami.is/script.js`.
4. Sustituye el valor vacío de `const WEBSITE_ID='';` dentro de `assets/analytics.js` por ese UUID público, manteniendo las comillas. **Nunca compartas contraseñas, API keys, tokens o cookies de acceso.**
5. Publica y comprueba el contador en Umami después de visitar la web desde un navegador sin Do Not Track ni bloqueo de analítica. La aplicación continúa funcionando sin estadísticas cuando el servicio está bloqueado o no hay conexión.

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

Estas pruebas comprueban que la analítica no se activa sin configurar el sitio, respeta las opciones de privacidad y no altera el funcionamiento clínico. Para activar posteriormente el seguimiento, actualizar la constante del ID y aumentar la versión/caché de la PWA después de pasar las pruebas.
