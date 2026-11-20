# KidBum CALC · Actualizaciones fiables y recuperación de PWA (v0.10.60)

**Alcance:** estabilidad, diagnóstico de publicación y recuperación de archivos de instalación. **No se modificaron motores, algoritmos, fórmulas, dosis ni advertencias clínicas.**

## Problema corregido

El servicio offline descargaba todos los recursos en una única llamada `cache.addAll(CORE_ASSETS)`, causando una ráfaga de más de 160 solicitudes, incluido un recurso anatómico HD de alrededor de 8 MB. Si fallaba una petición, el navegador conservaba correctamente la versión antigua, pero no explicaba bien el fallo; el botón de actualización anterior podía recargar la página antes de que terminara la instalación.

## Cambios

- **Caché atómica con lotes de cinco:** máximo cinco recursos por lote y hasta tres intentos por lote. El nuevo worker toma control **solo cuando los archivos requeridos terminaron**. Si no, se elimina la caché nueva incompleta, sin eliminar la copia funcional anterior.
- **Sin mezclar versiones clínicas:** no se importan módulos, motores ni scripts desde cachés de otra versión; se mantiene la precarga completa y el material de anatomía HD requerido para el modo offline documentado.
- **Monitoreo progresivo:** cuando el navegador lo permite, el worker comunica cuántos archivos se prepararon y notifica fallos a la interfaz.
- **Versión visible v0.10.60:** Inicio y Pharma Pro tienen versión de aplicación unificada; el marcador de red es `release-check.js`. Se solicita como URL única sin reutilizar caché, incluso desde trabajadores de versiones antiguas que interceptaban scripts con consultas distintas.
- **Comprobación no destructiva:** el botón «Buscar actualización» del apartado Acerca de consulta el marcador público y solicita `registration.update()` con límites de espera; **no recarga** una calculadora ni confunde la simple comprobación con una instalación terminada.
- **Aviso posterior a la activación:** el usuario decide cuándo recargar. No se interrumpen formularios clínicos por `controllerchange`.
- **Recuperación por acción expresa:** `actualizar.html` siempre se obtiene desde la red con el worker v0.10.60; muestra conexión, publicación y disponibilidad del servicio offline. Permite reintentar `registration.update()`. Un segundo botón de reparación, solo si el usuario decide usarlo y se confirmó versión pública con internet, desregistra únicamente el worker del mismo ámbito y borra exclusivamente los nombres de Cache Storage que empiezan con `kidbum-calc-`; después abre Inicio con URL fresca.
- **Privacidad:** no se borra `localStorage` (favoritos, tema, preferencias); no se recopilan valores de calculadoras ni historial. La reparación no modifica cachés ajenas, datos de otros sitios ni aplicaciones.

## En dispositivos

1. Con internet, entrar a **KidBum → Acerca de → Buscar actualización** y observar el mensaje de progreso.
2. Si aparece el aviso de nueva versión, **terminar cualquier cálculo y tocar «Actualizar ahora»**.
3. Si continúa una versión anterior, entrar desde el **mismo navegador o app instalada** en `https://leo26alvizo.github.io/kidbum-calc/actualizar.html`; usar «Comprobar e instalar actualización».
4. Solo si falla lo anterior, con buena conexión y sin sesión clínica activa, usar «Reparar archivos temporales de KidBum». **La reparación deja el modo offline temporalmente sin recursos hasta completar una descarga nueva.**

En iPhone, Safari y una PWA instalada pueden tener distintos almacenes de navegación. La reparación actúa solo sobre la instancia donde se ejecuta. Nunca desinstalar como primer paso ni borrar datos de sitio a ciegas.

## Verificaciones

- Regresión de cálculos y protocolos existentes.
- Simulación de fallo transitorio con recuperación; fallo persistente con rechazo de instalación, conservación del caché antiguo y borrado de la caché nueva incompleta.
- Confirmación de precarga completa, incluyendo scripts, páginas e imagen HD; navegación offline sin solicitar red.
- El marcador de versión y la página de recuperación se consultan desde la red (no versiones obsoletas de la caché).
- Comprobación de que ninguna rutina de actualización o reparación borra `localStorage`.

**Seguridad:** una prueba de software y un despliegue exitoso no son validación clínica independiente. Ante pérdida de conexión mientras se actualiza, la copia estable anterior continúa siendo la opción segura hasta instalar la versión completa.
