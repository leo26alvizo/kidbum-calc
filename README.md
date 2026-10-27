# KidBum CALC 🩺

**Creada por Teniente Pasante de Medicina Leonardo Alvizo Velázquez.**

Aplicación web progresiva (PWA) gratuita de calculadoras médicas, orientada al uso educativo y al apoyo en razonamiento clínico. Versión **0.10.28**.

**Sitio web:** https://leo26alvizo.github.io/kidbum-calc/

## Acceso directo a gasometría v0.10.27 — navegación desde Urgencias

La **Gasometría integrada · Panel** aparece como tarjeta visible y buscable desde **Inicio → Urgencias y Terapia Intensiva**, junto a 4Ts, Padua e IMPROVE Bleeding. Se abre por clic, Enter o barra espaciadora. Al volver, se muestra la categoría de Urgencias. **No se recupera el botón eliminado de Modo Guardia en la barra inferior móvil**, que continúa como Inicio | Favoritos | Historias | Acerca de. Mantiene las 127 calculadoras: la gasometría es un panel que reutiliza motores y NO incrementa el contador.

## Diabetes & Insulin Pro v0.10.28 — nueva categoría

**Endocrinología y Diabetes** en Inicio incorpora seis herramientas integradas: Insulin Safety Check, Hospital Glucose Monitor, Hypoglycemia Assist, DKA/HHS Assist, DM2 Treatment Navigator y CGM Intelligence. Se ejecutan localmente, con datos obligatorios explícitos, ejemplos ficticios, importación CSV local de CGM, bloqueos ante unidades/esquemas no verificables y sin cálculo automático de dosis ni órdenes médicas.

La herramienta CAD/EHH **reutiliza los motores numéricos KidBum `osm` y `correctedna`**, requiriendo potasio y muestras temporalmente comparables. Registros CGM <14 días o con cobertura <70% se califican como exploratorios. Los seis módulos se cuentan como nuevas herramientas (84 integradas previas + 43 standalone + 6 diabetes = **133 herramientas**). Se conserva la barra móvil **Inicio | Favoritos | Historias | Acerca de**; no se añade Modo Guardia.

**Fuentes y límites:** ADA 2026 (https://doi.org/10.2337/dc26-s016; https://doi.org/10.2337/dc26-s006); consenso CAD/EHH 2024 (https://doi.org/10.2337/dci24-0032); PRONAM DT2 2025 (https://sidof.segob.gob.mx/notas/docFuente/5761885). La implementación requiere validación clínica independiente y pruebas en dispositivos físicos antes de uso asistencial.

## Guardia Pro v0.10.26 — 4Ts, Padua, IMPROVE Bleeding y gasometría integrada

- **4Ts** (HIT, 0–8): cuatro dominios puntuados y explicados según ASH, clasificación baja 0–3, intermedia 4–5 y alta 6–8. No diagnostica HIT ni autoriza heparina.
- **Padua** (0–20): 11 factores, alto riesgo a partir de 4, limitado a pacientes médicos adultos hospitalizados; no prescribe profilaxis.
- **IMPROVE Bleeding**: 11 componentes con puntos fraccionarios, grupos de edad y TFG excluyentes; clasificación de riesgo elevado desde 7. No permite decidir anticoagulación por sí solo.
- **Panel de gasometría arterial**: pantalla integrada en Modo Guardia, con pH/PaCO₂/HCO₃⁻/Na/Cl y albúmina opcional, referencias de laboratorio explícitas y confirmación de tipo de muestra y población. Reutiliza los motores existentes de brecha aniónica, Winter y delta ratio, sin duplicar fórmulas. La brecha aniónica puede exponer ahora AG corregida de modo estructurado, sin alterar el resultado tradicional.
- Se conserva Modo Guardia en menú lateral, la barra inferior Inicio | Favoritos | Historias | Acerca de, créditos originales, imágenes previas y PWA offline.
- **Total: 127 calculadoras, 84 integradas y 43 externas, en 13 especialidades, más un panel de integración que no añade fórmula duplicada.**
- Validación: `tests/guardia-pro.cjs`, `tests/guardia-gasometria.cjs`, auditoría de catálogo, regresión y primera apertura offline. Las escalas y cálculos requieren revisión clínica local antes de emplearlos para decisiones.

## Hepatología v0.10.25 — Factor R y cinco índices hepáticos

Hepatología pasa de 3 a **9 calculadoras**; toda KidBum de 118 a **124**. Se conservan sin duplicar FIB-4, Child-Pugh y MELD 3.0.

- **Factor R**: (ALT/LSN ALT) / (fosfatasa alcalina/LSN FA), con clasificación ≤2 colestásica, 2<R<5 mixta, ≥5 hepatocelular y aviso cuando no hay elevaciones bioquímicas. No diagnostica DILI. Fuente: AASLD 2023/LiverTox.
- **Cociente AST/ALT (De Ritis)**: relación aritmética, sin adjudicación etiológica automática.
- **APRI**: (AST/LSN AST) ×100/plaquetas (10⁹/L), sin estadificación universal fuera de contexto.
- **ALBI**: 0.66 × log10(bilirrubina en µmol/L) − 0.085 × albúmina g/L; admite mg/dL y g/dL y los convierte de manera explícita; clasifica grados 1–3.
- **FLI**: modelo logístico original para esteatosis basado en IMC, cintura, triglicéridos en mg/dL y GGT.
- **NFS histórico**: fórmula de Angulo con edad, IMC, IFG/diabetes, AST/ALT, plaquetas y albúmina; FIB-4 suele ser el primer escalón actual de evaluación de MASLD.

Todas las calculadoras tienen datos de ejemplo totalmente ficticios, referencias verificables, resultados locales, validación estricta, avisos de seguridad y precarga PWA para abrirse sin Internet. Véase `tests/hepatologia-indices.cjs`. Ninguna herramienta confirma diagnósticos ni reemplaza protocolos o valoración médica.

## Navegación móvil v0.10.24 — acceso directo a Inicio

- La barra de navegación inferior cambia la pestaña Guardia por Inicio, con ícono de casa accesible.
- Al tocar Inicio regresa a la portada y restaura Todas las especialidades y búsqueda vacía.
- Favoritos, Historias y Acerca de mantienen su posición y funcionalidad. El Modo Guardia del menú lateral y las calculadoras permanecen sin cambios.
- La PWA actualiza la clave del caché para que el cambio se publique también en la app instalada y permanezca disponible sin Internet.

## Geriatría v0.10.23 — ocho nuevas herramientas para valoración geriátrica integral

La categoría de Geriatría ahora incluye **10 herramientas**, conservando **4AT** (delirium) y **Clinical Frailty Scale** (CFS, interpretación mediante guía oficial) y agregando:

- **Katz** (0–6), **Barthel clásico** (0–100) y **Lawton-Brody** (0–8, 8 tareas independientemente del sexo) para ABVD/AIVD.
- **FRAIL** (0–5) para fragilidad y **SARC-F** (0–10, tamiz positivo ≥4) para riesgo de sarcopenia.
- **MNA®-SF** (0–14) como sumador de las puntuaciones A–F obtenidas con la hoja oficial autorizada; no reproduce el instrumento ni concede licencia.
- **Timed Up and Go** (3 metros; ≥12 s como criterio orientativo de CDC STEADI; permite registrar prueba no completada) y **SPPB** (0–12, sumador de dominios evaluados mediante el protocolo NIA).

Todas las pruebas requieren datos documentados, incluyen ejemplos ficticios, referencias, advertencias y cálculo local. No emiten diagnósticos ni órdenes clínicas y se precargan para uso sin conexión. Pruebas: `node tests/geriatria-scales.cjs` y `node tests/offline-110.cjs`.

## Nuevas referencias clínicas v0.10.22 — Imagen de cuidados críticos, reanimación y pediatría

Se incorporaron **7 herramientas nuevas** sin duplicar las ya disponibles, conservando 12 categorías y todas las 77 herramientas anteriores:

1. **SOFA clásico (1996)** — Urgencias y Terapia Intensiva, 6 componentes 0–4, total 0–24; diferente de SOFA-2 (2025). Puntuaciones seleccionadas a partir de la tabla original por personal clínico.
2. **PSI / PORT para neumonía adquirida en comunidad** — Escalas clínicas: adultos, evaluación explícita de antecedentes, hallazgos físicos y datos de laboratorio, clases I–V; no recomienda alta automática.
3. **Parkland clásica** — Urgencias y Terapia Intensiva: muestra fórmula histórica 4 mL/kg/%SCQ frente al modelo inicial 2 mL/kg/%SCQ de la guía ABA 2024, solo para ≥20% SCQ adultos. No indica litros a infundir ni ritmos.
4. **Aldrete modificado** — Escalas clínicas: cinco dominios de 0–2, total 0–10. No autoriza egreso postanestésico.
5. **Apgar** — Pediatría: cinco dominios de 0–2 con minuto específico. No debe demorar maniobras de reanimación.
6. **Devine, peso de referencia en adultos** — Antropometría: no aplicar a niños ni utilizar automáticamente como peso de dosificación.
7. **Verificador matemático de pauta pediátrica** — Pediatría: el médico proporciona la dosis por toma, máximos por toma y por día y, si corresponde, un peso de referencia documentado para ESE fármaco. No existe peso ideal pediátrico universal; no se genera dosis farmacológica prescrita ni conversión a mL.

**Ya existían y no se duplicaron**: APACHE II, qSOFA, CURB-65, IMC, BSA, mantenimiento pediátrico Holliday–Segar y 4–2–1. El PSI y SOFA clásico sí son independientes.

Pruebas: `node tests/clinical-image-additions.cjs`; sin afectar auditoría, farmacología, nefrología ni caché PWA. Fuentes y límites están en `docs/clinical-image-v0.10.22.md`.

## Función renal v0.10.21 — Gasto urinario en adultos

Se incorpora **Gasto urinario en adultos**, categoría **Función renal**, conservando la calculadora pediátrica independiente y las otras 76 herramientas.

- Fórmula: gasto urinario promedio = orina total medida (mL) / [peso (kg) × duración consecutiva (h)], resultado en **mL/kg/h** y promedio complementario en mL/h.
- Requiere edad adulta documentada (18–120 años), peso entre 20–300 kg, periodo medido continuo de 1–24 horas y confirmación de recolección completa.
- Ejemplo ficticio 210 mL, 70 kg, 8 horas = **0.375 mL/kg/h**, promedio **26.3 mL/h**.
- Alertas orientativas según **KDIGO 2012**, guía vigente mientras la actualización 2026 está en revisión: umbral <0.5 mL/kg/h ≥6 horas, alertas para periodos ≥12 horas, <0.3 durante 24 h y anuria ≥12 h.
- El promedio agregado **no basta para confirmar continuidad de oliguria en cada intervalo ni estadificar LRA**. Deben revisarse la serie horaria, creatinina y contexto.
- No prescribe líquidos, diuréticos, ni terapia de reemplazo renal.

Pruebas automáticas `node tests/urine-output-adult.cjs`, con datos ficticios, puntos de corte exactos, anuria, intervalos insuficientes, entradas inválidas y preservación del catálogo.

## Nefrología y electrólitos v0.10.20 — Seis referencias incorporadas

Se añadieron seis tarjetas con datos de ejemplo reales de prueba (ficticios), cálculos locales y validación de unidades:
- **Función renal**: déficit teórico de sodio (hiponatremia), déficit de agua libre (hipernatremia) y evaluación de potasio sérico sin dosificación automática de KCl.
- **Química clínica**: calcio total ajustado por albúmina (fórmula histórica de baja fiabilidad), brecha osmolal sérica (requiere osmolalidad medida) y diferencia teórica de bicarbonato.
- Ya disponibles, sin duplicar: CKD-EPI 2021, Cockcroft–Gault, FeNa, FeUrea, brecha aniónica, sodio corregido por glucosa y osmolalidad calculada.

**Seguridad:** no se generan pautas, ritmos de infusión, soluciones, ampollas ni dosis de reposición. El potasio sérico no refleja un déficit corporal cuantificable. Los déficits de sodio/agua/bicarbonato son modelos con límites estrictos, sin equivalencia directa a tratamiento. Calcio ajustado no sustituye calcio ionizado. La brecha osmolal no descarta intoxicaciones si es normal. Revisar `docs/electrolytes-v0.10.20.md` para referencias y limitaciones.

Prueba automática independiente `node tests/electrolytes.cjs` y auditoría integral de campos, junto con regresión de las 70 herramientas preexistentes.

## APACHE II v0.10.19 — Corrección de ejemplo ficticio y revisión de puntuación

Se reparó **Cargar ejemplo ficticio** en APACHE II, modo rápido: el formulario tenía vacías todas las selecciones de puntuación, de modo que no podía generar un resultado. Ahora el ejemplo del modo rápido está completo y corresponde al mismo caso del modo preciso; **ambos deben mostrar 15/71 puntos**.

Se reforzó el cálculo rápido para aceptar exclusivamente las puntuaciones válidas en la tabla APACHE II de cada variable, con bloqueo de entradas imposibles. La verificación independiente (tabla APACHE II del Manual Merck, adaptada de Knaus et al., *Crit Care Med*. 1985;13:818–829) cubre extremos y puntos de corte de los componentes fisiológicos, oxigenación, bicarbonato/pH, edad, Glasgow, salud crónica y duplicación de creatinina por lesión renal aguda. Los valores de referencia deben ser los peores documentados durante las primeras 24 h de UCI en adultos; no inferir mortalidad individual a partir de la suma.

Pruebas adicionales: `node tests/apache2.cjs`. Ninguna otra fórmula clínica ha sido modificada.

## Contenido

- Brecha aniónica (corrección por albúmina), osmolalidad, IMC, superficie corporal, presión arterial media e índice de choque.
- CKD-EPI 2021, Cockcroft-Gault, FIB-4, qSOFA, CURB-65 y Glasgow.
- NEWS2, Wells para TVP y EP, PERC, Child-Pugh y sodio corregido por hiperglucemia.
- **Ginecología y obstetricia:** EG por FUM, FPP por FUM, FPP desde edad gestacional informada en ultrasonido, Bishop clásico e índice de choque obstétrico.

**Total actual: 127 calculadoras y herramientas en 13 categorías: 84 integradas y 43 independientes.**
- Buscador, favoritos, tema oscuro y cálculos locales, sin consumo de una API de pago.

## Farmacología pediátrica v0.10.14 — Amoxicilina OMA, cálculo específico

Se agrega a la misma tarjeta de Pediatría una **referencia matemática de amoxicilina oral SOLO para otitis media aguda clínicamente confirmada**, sin crear categorías principales ni alterar las 68 calculadoras originales. La indicación y pauta deben decidirlas previamente un médico. La calculadora no diagnostica ni prescribe.

Referencia respaldada por IMSS/AAP: **80–90 mg/kg/DÍA, dividido en 2 tomas cada 12 horas**. Única presentación admitida: **amoxicilina SOLA suspensión 400 mg/5 mL**, verificada en el frasco. Población de esta versión: 24–143 meses y 8–40 kg. Máximo conservador de **1000 mg por toma** (UCSF); si se excede, bloquea sin reducir automáticamente la dosis.

Bloqueos obligatorios: diagnóstico no confirmado, sin decisión de tratar tras valorar observación, alergia betalactámica, función renal comprometida, amoxicilina en 30 días previos, conjuntivitis purulenta, enfermedad recurrente no respondedora, falla de tratamiento, complicaciones, inmunosupresión, falta de tolerancia oral, formulación distinta o falta de revisión médica. La duración del tratamiento **no se calcula**. Para cualquier otro diagnóstico la conversión antibiótica está deshabilitada.

Pruebas: `node tests/pediatric-drug-doses.cjs` (cálculo y bloqueos), pruebas anteriores de `Pediatría`, `regression`, auditoría de 68 herramientas, arranque offline y analítica. No se envían datos del paciente ni se modifica la recolección de Umami.

Fuentes y limitaciones: `docs/pharma-amoxicillin-aom-v0.10.14.md`. La tabla de AnetteB se usó para elegir qué medicamento revisar, no como validación independiente. El motor es apoyo educativo de aritmética clínica, no una receta aprobada.

## PWA v0.10.13 — Inicio inmediato sin esperar datos móviles

Se corrigió un defecto de experiencia PWA: el service worker anterior usaba una estrategia **online-first sin límite de espera** para HTML y JavaScript, por lo que una red móvil intermitente podía bloquear el inicio incluso cuando existían recursos locales. Ahora **HTML, motor clínico y módulos clave salen primero del caché local**, sin solicitar datos ni esperar una conexión para responder. Los recursos sin caché tienen un límite de espera de 6.5 segundos.

Cada versión nueva se descarga como un grupo de archivos críticos durante la instalación del service worker; solo después de completar la descarga reemplaza la versión anterior, sin mezclar HTML y módulos clínicos. El registro ocurre inmediatamente, sin esperar ilustraciones. «Buscar actualización» solicita una comprobación con límite de tiempo y ya no fuerza una navegación de red que podía provocar `ERR_TIMED_OUT`. Los archivos ilustrativos continúan en caché bajo demanda.

**Limitación:** un visitante nuevo, sin versión previa en caché y con GitHub Pages inaccesible, aún necesitará conexión para instalarla. Para corregir el service worker antiguo en un teléfono, es necesario abrir la v0.10.13 al menos una vez con conexión estable (preferentemente Wi-Fi). Luego podrá arrancar desde el caché incluso con datos lentos o temporalmente desconectados.

Pruebas automatizadas: `node tests/pwa-cellular.cjs`. No se modificaron las 68 calculadoras, los dos módulos orales de dosificación de referencia ni el seguimiento de Umami.

## Farmacología pediátrica v0.10.12 — Primera fase de cálculo condicionado

Se activa una referencia matemática de dos fármacos orales exclusivamente dentro de la tarjeta **Pediatría → Farmacología pediátrica**, conservando 68 calculadoras previas:

- **Paracetamol oral**, 10 o 15 mg/kg/toma, presentación **160 mg/5 mL**, intervalo de referencia **6 horas**, no más de **4 administraciones/24 h** ni **60 mg/kg/24 h** para esta fase. Únicamente en 24–143 meses y peso 8–40 kg.
- **Ibuprofeno oral**, 5 o 10 mg/kg/toma, presentación **100 mg/5 mL**, intervalo de referencia **8 horas**, no más de **3 administraciones/24 h** ni **30 mg/kg/24 h** para esta fase. Únicamente en 24–143 meses y peso 8–40 kg.
- **Amoxicilina sigue sin cálculo**: es imprescindible validar la indicación específica, dosis máxima, función renal, alergias y duración para evitar uso antibiótico inapropiado.

El usuario debe confirmar concentración exacta de la etiqueta, supervisión clínica, historia de dosis en las últimas 24 horas y ausencia de precauciones/contraindicaciones relevantes. Cualquier dato indispensable ausente, edad/peso fuera de rango, dosis previa incompatible o límite superado **bloquea el resultado**. El cálculo entrega mg y mL teóricos, sin redondeo automático a dispositivos de administración ni emitir órdenes. No se incluyen gotas.

Fuentes externas de contraste: CENSIA Secretaría de Salud (documento de referencia), AAP HealthyChildren 2026, Royal Children's Hospital Melbourne (actualización octubre 2024) y NHS. El PDF de AnetteB sirve únicamente como inventario inicial: sus números no se copian sin validar. Véase `docs/pharma-oral-v0.10.12.md`. Se ejecutan `node tests/pediatric-drug-doses.cjs` y las pruebas previas en GitHub Actions. No equivale a aprobación institucional ni registro de dispositivo médico.

## Pediatría v0.10.11 — Farmacología integrada dentro de la categoría

La tarjeta **Farmacología pediátrica** aparece al lado de las 22 calculadoras existentes al abrir la categoría «Pediatría» (también se puede localizar mediante búsqueda). **No se ha creado una decimotercera categoría principal ni una calculadora número 69**; las 68 fórmulas anteriores permanecen intactas.

La nueva pantalla contiene fichas de trabajo iniciales de **paracetamol, ibuprofeno y amoxicilina**, basadas en el inventario del PDF «Calculadora Pediátrica AnetteB» facilitado al proyecto. Incluye presentaciones generales y comprobaciones pendientes: no genera dosis, frecuencias ni conversiones mg/mL, porque el material todavía requiere validación independiente y existen discrepancias en otras entradas del PDF. Las fichas están marcadas «en revisión clínica». No son órdenes ni prescripciones.

Se incluyeron pruebas de ubicación, navegación, retorno a Pediatría, búsqueda, favoritos, mensajes de seguridad e inventario inalterado (`node tests/pediatric-pharmacy.cjs`). La aplicación permanece utilizable sin conexión; no se modifica el seguimiento de Umami.

## Analítica v0.10.10 — Activada en Umami Cloud

Se conectó el identificador público del sitio KidBum CALC de Umami Cloud. La medición registra visitas y eventos de aperturas en navegador/app instalada, así como instalaciones detectables por navegadores compatibles. Se corrigió el filtro de envío para permitir visitas anónimas sin nombre de evento y restringir cada carga útil a propiedades permitidas. No se transmiten datos clínicos, resultados, términos buscados, consultas en URL ni identificadores de pacientes. El modo sin conexión, el respeto a Do Not Track y la opción de exclusión voluntaria se mantienen.

## Analítica opcional v0.10.9 — Integración preparada, NO activada

Se incorporó el módulo local `assets/analytics.js` para conectar en el futuro Umami Cloud mediante el identificador público de sitio (`data-website-id`). El identificador no está configurado, por lo que **la versión 0.10.9 no transmite estadísticas a Umami**.

Cuando se configure, registrará únicamente visitas generales, aperturas desde pantalla de inicio en Android/iOS y señales de aceptación de instalación disponibles en algunos navegadores (principalmente Android). Nunca registra campos, resultados ni nombres de calculadoras. Respeta Do Not Track, excluye parámetros/fragmentos de URL y permite desactivar la medición desde «Acerca de». La analítica no afecta el modo sin conexión.

El panel privado vive en la cuenta Umami Cloud del administrador. Los visitantes y las aperturas son estimaciones, no descargas exactas ni personas identificadas. Pruebas automáticas: `node tests/analytics.cjs`.

## Seguridad P0 v0.10.8 — Datos contradictorios

Se agrega rechazo explícito de presión arterial diastólica superior a la sistólica en el motor ABCD² y en la validación común de todos los formularios que requieren ambas presiones. Se conserva la verificación existente en PAM y CURB-65. Se prueban los tres escenarios tanto en interfaz como en motor. No se modificaron ecuaciones.

## Seguridad P0 v0.10.7 — Bloqueos clínicos

Se añade una validación común a los 68 formularios para impedir el uso de opciones ajenas a la escala, valores fuera de los rangos declarados, fechas imposibles y datos obligatorios ausentes. ASIA/AIS rechaza valores motores inválidos incluso cuando la clasificación se decide antes de necesitar esos campos. Los campos motores no aplicables siguen siendo opcionales; los estados UN/NT válidos no se convierten en cero.

Se actualizan el motor empaquetado para uso sin conexión y las pruebas automatizadas, que deben rechazar las 769 entradas alteradas. No cambian fórmulas clínicas ni se afirma una validación médica independiente.

## Corrección v0.10.6 — Actualización y versión unificada

Se corrigió la ficha «Acerca de», que aún mostraba 0.10.3 pese a ejecutarse una versión posterior. Sidebar, pie y «Acerca de» muestran ahora la versión leída desde una sola etiqueta meta. Se eliminaron instrucciones obsoletas de instalación por ZIP y se añadió la instalación Android junto a la guía Safari ya existente. «Buscar actualización» solicita revisar el service worker y recarga la URL con un parámetro para recuperar HTML fresco al estar conectado. Se cambió la versión de caché PWA sin modificar fórmulas médicas ni preferencias locales.

## Corrección v0.10.5 — ROX y RASS

Se resolvió el mismo conflicto de opciones «Sí/No» (`true/false` frente a `yes/no`) en los formularios de ROX y RASS. Se añadieron regresiones con los formularios reales y el módulo crítico empaquetado: ROX = 7.36 con SpO₂ 92%, FiO₂ 50% y FR 25, y RASS = 0 con paciente alerta y tranquilo. Las opciones de contexto no elegible siguen bloqueando interpretaciones inválidas. Las fórmulas clínicas no fueron modificadas.

## Corrección v0.10.4 — Formularios de escalas clínicas

Se corrigió la correspondencia de los valores «Sí/No» entre interfaz y motor en NIHSS, Hunt-Hess, Fisher original, ASIA/AIS, SOFA-2 y CAM-ICU. Anteriormente, la interfaz transmitía `true/false` donde estos módulos requerían `yes/no`, por lo que se rechazaban respuestas válidas. Se añadió una prueba de regresión de contrato interfaz-motor y se conservan las fórmulas originales. Las pruebas automatizadas no sustituyen validación clínica independiente ni pruebas en dispositivos reales.

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


### Ajuste visual v0.7.3 — Química clínica

La tarjeta de **Química clínica** ocupa el ancho completo de la biblioteca y mantiene las mismas dimensiones que Pediatría y Ginecología. Usa exactamente la fotografía suministrada por el autor en `assets/quimica-clinica-portada.webp` (WebP optimizado, aprox. 151 KB), sin generar imágenes nuevas. La zona de texto tiene un fondo azul claro opaco y el material de laboratorio se muestra nítido, sin filtros de desenfoque. El recurso se precarga mediante `sw.js` para funcionamiento offline. No se modificó la lógica médica ni el contenido de las 45 calculadoras.


### Corrección de actualización de PWA v0.7.4

Se verificó que las tres fotografías de portada (Pediatría, Ginecología y Química clínica) existían en GitHub Pages; el problema probable era la política anterior de service worker, que servía primero HTML obsoleto desde caché. Ahora `sw.js` solicita online primero el documento HTML y los scripts JavaScript, con almacenamiento local y fallback offline. La app revisa versiones al abrir y al volver a primer plano, y recarga automáticamente solo si no hay una calculadora abierta, evitando interrumpir datos clínicos en curso.

Enlace para forzar nueva carga inicial y evitar entradas obsoletas cache-first: https://leo26alvizo.github.io/kidbum-calc/?v=074. No requiere reinstalación, cuentas ni servicios pagados. Los 45 cálculos y la autoría permanecen intactos.

**Prueba recomendada:** abrir con conexión, comprobar etiqueta v0.7.4 y las tres tarjetas; después probar sin conexión en la PWA instalada. Evitar borrar los datos del sitio salvo que resulte necesario, pues eliminaría favoritos locales.


### KidBum v0.7.5 — Escalas clínicas

Se incorporó la ilustración del sistema nervioso proporcionada por el autor a la tarjeta principal de **Escalas clínicas**. La imagen se conserva como `assets/escalas-clinicas-portada.webp` (aproximadamente 97 KB, 1536 × 864 px), sin generación de imágenes nuevas. La tarjeta comparte el formato rectangular de ancho completo y tamaños responsive de Pediatría, Ginecología y Química clínica, con panel opaco de texto e imagen nítida sin filtros. Está en el precaché offline de la PWA (v075), con esquema online-first para mantener el HTML actualizado. La lógica de las 45 calculadoras, los favoritos y los modos de ChatGPT permanecen intactos.


### KidBum v0.7.6 — Hemodinámica y Función renal

Se incorporaron, sin generar ilustraciones nuevas, los dos recursos médicos aportados por el autor: **primera imagen cardiopulmonar** en `assets/hemodinamica-portada.webp` para la tarjeta **Hemodinámica** y **segunda imagen renal/urinaria** en `assets/funcion-renal-portada.webp` para la tarjeta **Función renal**. Ambas tarjetas usan los estilos rectangulares anchos de Pediatría y Ginecología, con fondo de texto sólido, imágenes nítidas y adaptación a móviles. Las ilustraciones se optimizaron como WebP (aprox. 169 KB y 166 KB) y son parte del precaché de la PWA (`v076`). No se cambió el motor de las 45 calculadoras, ni favoritos, navegación, modos de ChatGPT o crédito de autoría. Se superaron 95 pruebas de regresión. Las etiquetas anatómicas incluidas en imágenes aportadas son parte del recurso gráfico original y no se presentan como verificaciones clínicas independientes.


### KidBum CALC v0.7.7 — Tarjetas uniformes de Hepatología y Antropometría

Las categorías **Hepatología** y **Antropometría** ahora usan el mismo diseño rectangular destacado y ancho completo de las seis categorías anteriores. Se conservan las ilustraciones locales originales `assets/atlas-fib4.jpg` y `assets/atlas-bmi.jpg`; no se generaron ni sustituyeron recursos gráficos. Se muestra cada imagen sin difuminado ni reducción de opacidad y el texto permanece legible sobre un panel opaco; diseño móvil responsive. El service worker mantiene el funcionamiento sin conexión y usa caché `v077`. Las 45 calculadoras y su lógica médica, favoritos, navegación y crédito de autoría permanecen intactos. Se superaron 102 verificaciones automatizadas de regresión.


## KidBum CALC v0.8.0 — 22 láminas pictóricas de Pediatría

- Se integraron **22 ilustraciones WebP individuales de Pediatría**, una por cada herramienta, en `assets/pediatric/<id>.webp`. Cada composición reutiliza ilustraciones anatómicas editoriales originales ya creadas para KidBum y añade un panel científico particular: crecimiento/antropometría, diuresis, balance de agua, nutrición, metabolismo o administración IV.
- Cada ilustración es local (960×540 px); el conjunto pesa aproximadamente **1.1 MB**, y está íntegramente incluido en el precaché PWA para modo offline.
- `assets/medical-atlas.js` utiliza cada WebP por identificador estable y conserva su ilustración SVG anterior como **respaldo en caso de error de carga**.
- Sin cambios en las **45 calculadoras**, dosis, fórmulas, tablas OMS, favoritos, búsqueda, navegación, tema claro/oscuro o integración con ChatGPT. Se verificó que el motor de cálculos sigue idéntico al de v0.7.7.
- Comprobación de 105 pruebas de regresión, rutas de las 22 imágenes, caché offline y fallback local.

**Límite científico:** estas composiciones sirven como apoyo visual editorial. Varios recursos reutilizan láminas de anatomía general y muestran símbolos fisiológicos; no son representaciones anatómicas pediátricas validadas ni esquemas para decidir tratamientos. No contienen cifras o rótulos clínicos generados automáticamente. Las recomendaciones clínicas se encuentran exclusivamente en los textos y cálculos verificados de las herramientas.


## KidBum CALC v0.8.1 — Icono original del autor

- Se instaló **la imagen exacta proporcionada por el autor**, sin ilustración nueva ni regeneración. Solo se redimensionó para tamaños de icono 192 × 192 y 512 × 512 px.
- Archivos locales: `kidbum-icon-192-v081.png` y `kidbum-icon-512-v081.png`.
- Se actualizaron el manifiesto PWA, favicon del navegador, icono Apple y la lista de recursos offline; el nuevo nombre de archivo ayuda a evitar que los teléfonos conserven el icono anterior.
- **Sin cambios en las 45 calculadoras ni en el motor clínico**. En dispositivos con un acceso directo antiguo, puede ser necesario eliminarlo y volver a instalar la aplicación para actualizar la imagen del lanzador.


## KidBum CALC v0.8.2 — Autoría y título de portada

- Créditos actualizados a **Teniente Pasante de Medicina Leonardo Alvizo Velázquez** en las pantallas de la app, la galería y los metadatos.
- Título de portada solicitado: **Calculadora Médica Integtal** (reproducción literal de la indicación del autor).
- Se conservaron la identidad y los iconos originales del autor, la biblioteca de 45 calculadoras y sus fórmulas.
- Se actualizó la versión de caché PWA y las pruebas de regresión de textos.


## KidBum CALC v0.8.3 — Expansión hospitalaria fase 1

Se incorporaron **Winter, delta ratio, FeNa y FeUrea** en un módulo independiente (`assets/hospital-module.js`) con validación de datos y resultados orientativos. La biblioteca suma **49 calculadoras** en ocho categorías. No se alteraron las fórmulas clínicas anteriores.

- **Winter:** HCO₃⁻ en acidosis metabólica primaria y PaCO₂ arterial observada opcional; fórmula ±2 mmHg.
- **Delta ratio:** requiere AG elevado, disminución de bicarbonato y referencias del laboratorio. Una cifra aislada no diagnostica trastornos mixtos.
- **FeNa/FeUrea:** muestras pareadas, unidades concordantes, antecedente de diuréticos y precauciones en ERC, sepsis y UCI. FeUrea exige la misma forma (urea o BUN) y unidad en ambas muestras.
- Se conservan ilustraciones originales (reutilizadas para tarjetas nuevas), icono aportado por el autor, favoritos, búsqueda y uso sin conexión. Nuevas referencias visibles y pruebas automatizadas.

**Fuentes:** [Merck Manual](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), [Delta ratio](https://pubmed.ncbi.nlm.nih.gov/19769708/), [Limitaciones del delta ratio](https://pubmed.ncbi.nlm.nih.gov/17699401/), [Kidney360 PRO](https://pubmed.ncbi.nlm.nih.gov/37384887/) y [Kidney360 CON](https://pubmed.ncbi.nlm.nih.gov/37384888/).

**Seguridad:** son herramientas de apoyo, no dispositivos clínicos validados; no sustituyen la valoración presencial ni los protocolos institucionales.


## KidBum CALC v0.9.0 — Expansión hospitalaria completada

Se incorporaron **QTc (Bazett y Fridericia), Glasgow-Blatchford y RCRI**, sumando **52 herramientas en 10 categorías**. Nuevas categorías: Cardiología y Gastroenterología. Motor independiente `assets/advanced-module.js`, sin modificar las fórmulas anteriores.

**QTc:** RR regular obligatorio; QTc por Fridericia en el resultado principal y Bazett en el desglose; alertas en QRS ancho y FC extrema. **GBS:** selecciona urea mmol/L, urea mg/dL o BUN mg/dL; se aplica tabla original de urea mmol/L y se desglosa cada criterio. Un GBS de 0–1 nunca genera indicación automática de alta. **RCRI:** cinco criterios de historial/procedimiento, creatinina sérica numérica para sexto factor; clase I–IV sin porcentaje automático de riesgo.

Se conservaron el icono original, autoría, portada, favoritos, búsqueda, envío por copia a ChatGPT y funcionalidad offline. Nuevas tarjetas reutilizan ilustraciones anteriores sin generar imágenes adicionales. Se amplió batería automatizada; se requiere además validación clínica independiente y pruebas de interfaz Android.

Fuentes: [AHA ECG QT 2009](https://www.jacc.org/doi/10.1016/j.jacc.2008.12.014), [ACG 2021](https://pubmed.ncbi.nlm.nih.gov/33929377/), [NHS Glasgow-Blatchford](https://handbook.ggcmedicines.org.uk/guidelines/gastrointestinal-system/glasgow-blatchford-score/), [AHA/ACC 2024](https://www.jacc.org/doi/10.1016/j.jacc.2024.06.013).


## KidBum CALC v0.9.1 — Imagen original en tarjeta de Cardiología

- Se añadió **la imagen exacta aportada por el autor** a `assets/cardiologia-portada.jpg`, sin modificar sus píxeles. La foto original tenía codificación JPEG pese al nombre de subida con extensión .webp.
- La tarjeta destacada de **Cardiología** usa las mismas dimensiones y estructura CSS que las otras tarjetas rectangulares de especialidad. Mantiene el encuadre central sin filtros, con `object-fit: cover` para adaptarse a cualquier pantalla.
- Recurso local disponible offline en la caché de la PWA; se actualiza la versión del caché y se añaden pruebas de regresión. Las demás tarjetas, el icono, la portada y las 52 calculadoras permanecen iguales.


## KidBum CALC v0.9.2 — Gastroenterología en tarjeta destacada

- La tarjeta de **Gastroenterología** adopta el mismo tamaño rectangular de ancho completo que Cardiología y las demás especialidades destacadas, también en móvil.
- Se conserva **exactamente la imagen existente** `assets/atlas-childpugh.jpg` mediante el mapeo `Gastroenterología → childpugh`, sin reemplazar, regenerar ni alterar el archivo.
- Se reutilizan las clases CSS de tarjeta destacada y fotografía a tamaño completo, sin filtros. Se actualizó el caché PWA para propagar los cambios.
- Sin cambios en fórmulas, icono, portada, fotografías restantes ni en las 52 calculadoras.


## KidBum CALC v0.9.3 — Imagen original del autor para Gastroenterología

- La tarjeta rectangular de **Gastroenterología** muestra exactamente el WebP transparente entregado por el autor, almacenado sin modificaciones como `assets/gastroenterologia-portada.webp`.
- La tarjeta mantiene las dimensiones destacadas anteriores: mismo ancho completo y mismas medidas responsivas que Cardiología y las otras tarjetas amplias.
- El estómago se representa completo con `object-fit: contain`, fondo marfil y sin filtros para evitar recortes de la anatomía. No se crea otra ilustración.
- El recurso se incorpora a la caché PWA para uso sin conexión. Se conserva `assets/atlas-childpugh.jpg` para las ilustraciones clínicas preexistentes y no se modifica ninguna fórmula ni cálculo.
- Se añade comprobación automatizada del recurso, su caché y las 52 calculadoras actuales.


## KidBum CALC v0.9.4 — Imagen original en Antropometría

- Se incorporó exactamente la imagen del Hombre de Vitruvio aportada por el autor, guardada en `assets/antropometria-portada.jpg` sin regenerar, borrar ni modificar su contenido.
- La tarjeta **Antropometría** conserva el mismo tamaño rectangular destacado y el diseño responsivo de las demás especialidades, con `object-fit:contain` para visualizar completa la figura anatómica.
- La tarjeta se ve en fondo pergamino, sin filtros. La imagen anterior `assets/atlas-bmi.jpg` permanece en su lugar para los recursos clínicos existentes.
- La nueva imagen se incluye en la caché offline de la PWA. No se alteraron ninguna de las 52 calculadoras, sus fórmulas, las otras tarjetas ni el icono de la aplicación.


## KidBum CALC v0.9.5 — Neurología y Raquimedular, fase 1

- Nueva categoría **Neurología y Raquimedular**: **Glasgow (GCS)** existente, **ABCD² (AIT)** y **Alteplasa (rtPA), referencia de dosis**. Total: **54 calculadoras** y **11 categorías**; no hay una Glasgow duplicada.
- GCS conserva íntegros el motor anterior, los tres componentes, la condición no evaluable (NT) y sus pruebas originales. Cambia únicamente su asignación de categoría.
- **ABCD² (0–7)**: edad ≥60, PA inicial ≥140 sistólica o ≥90 diastólica, debilidad unilateral / alteración de habla sin debilidad, duración y diabetes. Exige indicación de síntomas resueltos; se bloquea si el déficit continúa. Un resultado bajo no excluye urgencia ni sirve para alta automática.
- **Alteplasa IV (rtPA) para EVC isquémico adulto, referencia educativa**: min(peso × 0.9 mg/kg, 90 mg); 10% bolo durante 1 min y 90% infusión durante 60 min posteriores, conforme a la guía AHA/ASA 2026. Solicita confirmación de lectura y no emite orden médica, determina elegibilidad ni sirve para tenecteplasa.
- Se conserva la imagen de Neurología ya disponible para Escalas Clínicas, sin generar imágenes nuevas, y se precarga el módulo neurológico para uso sin conexión. No se modifica ningún motor clínico previo ni las tarjetas previas.
- Pendientes: **Hunt y Hess, Fisher (confirmar Fisher original/modificada), NIHSS y ASIA/ISNCSCI**, que requieren mayor revisión y validación. Ninguna herramienta de Cardiología nueva fue agregada.
- Fuentes: [Johnston y col. 2007 ABCD²](https://pubmed.ncbi.nlm.nih.gov/17258668/), [AHA AIT 2023](https://professional.heart.org/en/science-news/diagnosis-workup-risk-reduction-of-transient-ischemic-attack-in-the-emergency-department-setting), [AHA/ASA EVC isquémico agudo 2026](https://www.ahajournals.org/doi/10.1161/STR.0000000000000513) y [Glasgow oficial](https://www.glasgowcomascale.org/faq/).

**Alcance:** educativo y de verificación aritmética; no certificado como dispositivo clínico ni validado institucionalmente. Requiere evaluación médica presencial y doble verificación de medicamentos según protocolo local.


## KidBum CALC v0.9.6 — Neurología y Raquimedular completada

Se incorporaron NIHSS, Hunt y Hess, Fisher ORIGINAL y ASIA/AIS guiada. Ya están las siete herramientas solicitadas: Glasgow, ABCD², alteplasa, NIHSS, Hunt-Hess, Fisher y ASIA/AIS. Total **58 calculadoras** en 11 categorías; no se añadieron calculadoras de Cardiología.

- NIHSS: 15 ítems NINDS completos, 0–42 y UN solo en ítems específicos. UN produce total no evaluable, no cero. No decide reperfusión.
- Hunt-Hess: grado I–V para HSA confirmada, no un puntaje aditivo.
- Fisher original: grado I–IV según TAC inicial, diferencia explícita con Fisher modificada y bloquea mezcla indeterminada con hemorragia ventricular y sangre subaracnoidea gruesa.
- ASIA/AIS guiada: requiere ISNCSCI completa y NLI **previamente determinado por un profesional**, evaluación sacra S4–5, DAP, VAC, estado motor >3 segmentos debajo del nivel motor ipsilateral (incluyendo músculos no clave), y músculos clave bajo NLI para C/D. Clasifica de forma orientativa A–E; NT o datos faltantes se rechazan. **No calcula niveles motores/sensitivos, NLI ni ZPP y no sustituye la ISNCSCI 9ª edición 2026.**
- Módulo offline `assets/neurology-advanced.js`, referencias visibles y nuevas pruebas de regresión; no se alteran motores clínicos previos ni imágenes originales.

Referencias: [NINDS NIHSS oficial](https://www.ninds.nih.gov/sites/default/files/2025-03/KnowStroke_NIHStrokeScale_March2025_508c.pdf), [AAFP HSA](https://www.aafp.org/afp/2023/1000/nontraumatic-sah-ruptured-intracranial-aneurysm), [Fisher original](https://pmc.ncbi.nlm.nih.gov/articles/PMC3621041/), [ASIA/ISCoS ISNCSCI 2026](https://asia-spinalinjury.org/isncsci-resources/).

**Seguridad:** prueba automatizada aritmética no equivale a validación clínica institucional. Para AIS y NIHSS se necesita exploración presencial de personal capacitado y validación especializada.


## KidBum CALC v0.9.7 — Fotografía original de Neurología

- Se cambió exclusivamente la fotografía de la tarjeta destacada «Neurología y Raquimedular» por la imagen enviada por el autor, guardada en `assets/neurologia-portada.jpg` con sus **bytes JPEG originales**, sin regeneración ni recomprimir.
- La tarjeta mantiene las dimensiones de las otras categorías destacadas; se aplica `object-fit: cover` con encuadre centrado en la anatomía cerebral. El diseño de la tarjeta, la portada y el icono de la aplicación se conservan.
- La fotografía `assets/escalas-clinicas-portada.webp` permanece intacta y sigue utilizándose en la tarjeta «Escalas clínicas».
- Se actualizó la caché PWA para uso offline y se añadieron pruebas automatizadas de la imagen; se conservan sin alteraciones las 58 calculadoras existentes, sus fórmulas, los demás módulos y tarjetas.


## KidBum CALC v0.9.8 — Cardiología (cinco nuevas herramientas)

Se agregan cinco calculadoras en el módulo independiente `assets/cardiology-module.js`: ASCVD Pooled Cohort 2013 (solo histórica), TIMI UA/NSTEMI, TIMI STEMI, CHA₂DS₂-VASc y HAS-BLED. La aplicación alcanza **63 calculadoras**, manteniendo **11 categorías**.

- ASCVD PCE 2013 reproduce las cuatro ecuaciones originales de las cohortes estadounidense (hombres/mujeres, grupos de derivación históricos), con selección explícita y sin inferir atributos personales. **La guía ACC/AHA de 2026 recomienda PREVENT en lugar de PCE para prevención primaria; no usar PCE antigua para decidir estatinas.** Las PCE no están validadas originalmente en población mexicana y pueden descalibrarse. Fuentes: https://pmc.ncbi.nlm.nih.gov/articles/PMC4700825/ y https://professional.heart.org/en/science-news/2026-guideline-on-the-management-of-dyslipidemia/top-things-to-know
- TIMI UA/NSTEMI: siete ítems originales, 0–7. TIMI STEMI: ocho grupos ponderados, 0–14; ambos contrastados con guía ACS ACC/AHA 2025. No diagnostican SCA ni retrasan reperfusión. https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009
- CHA₂DS₂-VASc: 0–9; añade CHA₂DS₂-VA 0–8 sin sexo para comparación con ESC 2024. No ordena anticoagulación ni estima riesgos individuales con porcentajes inventados.
- HAS-BLED: 0–9 y factores correctibles; función renal y hepática separadas, ≥8 unidades de alcohol y PAS >160, umbral etario >65 años; INR lábil solo para antagonistas vitamina K. No se usa aislado para negar anticoagulación. ACC/AHA 2023 y ESC 2024.
- Wells para TVP y TEP **ya existían**: únicamente se reubicaron a Cardiología conservando motores y fórmulas. Se mantienen las 58 calculadoras previas, la portada, imágenes originales e icono, y modo PWA sin conexión. El nuevo módulo incorpora casos de aceptación y referencias visibles.

Estas herramientas son educativas y no constituyen diagnóstico, alta, prescripción o validación clínica independiente.


## KidBum CALC v0.9.9 — Fase 1 de 1.0.0 (monitorización y Guardia)

**Nuevas herramientas:** PaO₂/FiO₂ (P/F), ROX y RASS. **66 calculadoras en 12 categorías.** Nueva categoría «Urgencias y Terapia Intensiva». Las 63 calculadoras originales se conservan, sin cambiar sus motores.

- **PaO₂/FiO₂:** gasometría ARTERIAL en mmHg y FiO₂ introducida en porcentaje (21–100), no fracción. PEEP/CPAP ≥5 confirmada, ausente o desconocida. Resultados son bandas de oxigenación, **no diagnóstico automático de SDRA**; vigilar definición global, imágenes, clínica y soporte. Referencia: https://pmc.ncbi.nlm.nih.gov/articles/PMC10870872/
- **ROX:** (SpO₂/FiO₂)/FR con FiO₂ en fracción internamente y entrada en porcentaje. Solicita alto flujo y momento 2, 6, 12 u otro. Comparación orientativa con umbrales de Roca 2019; fuera de horas establecidas no emite estrato. No determina intubación ni alta. https://pubmed.ncbi.nlm.nih.gov/30576221/
- **RASS:** escala ordinal −5 a +4 con observación estructurada, descripción clínica y advertencias; no sustituye evaluación de delirium ni titulación de sedación. https://jamanetwork.com/journals/jama/fullarticle/196696
- **Modo Guardia inicial:** nueva pantalla accesible desde barra lateral y navegación inferior móvil, agrupa calculadoras existentes en cuatro conjuntos (respiratorio, deterioro, neurología, química/renal). Sin duplicación de cálculos ni almacenamiento de datos sensibles. Las alertas de inestabilidad tienen prioridad sobre resultados.
- **Seguridad:** rangos explícitos, FiO₂ como porcentaje, controles de contexto, guía/estudio original, rechazo de entradas inválidas y pruebas automatizadas. Se incorpora módulo `assets/critical-module.js` al precaché PWA; las imágenes y el icono originales permanecen.

**Pendientes para versión 1.0.0:** SOFA-2 (tabla 2025), CAM-ICU, KDIGO-LRA, PREVENT-ASCVD 2026 y MELD 3.0; mejora adicional de auditoría clínica y navegación accesible. Objetivo final: **71 calculadoras**. No presentar esta fase como versión final ni producto validado clínicamente.


## KidBum CALC v0.10.0 — Fase 2 de 1.0.0, SOFA-2 y CAM-ICU

- **SOFA-2 (JAMA 2025)**: selección explícita de los seis dominios (cerebro, respiratorio, cardiovascular, hígado, riñón y hemostasia), 0–4 por órgano, total 0–24, sin asumir que faltantes equivalen a normal. Se presentan criterios de la tabla 2 publicada y se exige validación del contexto adulto/UCI. No sustituye SOFA 1996, ni diagnostica sepsis ni predice mortalidad individual. Atención especial a soporte respiratorio avanzado, dosis vasopresoras combinadas, soporte mecánico, TRR y datos preexistentes.
- **CAM-ICU (Vanderbilt)**: RASS −4/−5 es no evaluable; rasgo 1 cambio agudo, rasgo 2 inatención (>2 errores en diez letras), rasgo 3 RASS distinto de 0 y rasgo 4 pensamiento desorganizado (>1 error entre cuatro preguntas y orden). Positivo si 1 Y 2 Y (3 O 4); no se informa resultado si faltan pruebas necesarias. No prescribe medicamentos ni reemplaza evaluación médica.
- Integración en Modo Guardia, uso local sin conexión, desgloses y pruebas de consistencia. **Total: 68 calculadoras en 12 categorías.** Las 66 anteriores quedan intactas.

Referencias: https://jamanetwork.com/journals/jama/fullarticle/2840822 (Ranzani et al, JAMA 2025); https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2840786 (consenso); https://www.vumc.org/cvicu/sites/default/files/2020-02/CAM-ICU-flowsheet.pdf (Vanderbilt).

**Advertencia:** suma guiada de criterios de SOFA-2 y tamizaje CAM-ICU requieren capacitación y valoración presencial. Pruebas automatizadas NO equivalen a validación clínica independiente.


## KidBum CALC v0.10.1 — Foto original de Urgencias

Se añadió la imagen exacta enviada por el usuario en assets/urgencias-portada.jpg (1536 × 864; 231685 bytes), sin cambios de píxeles ni generación nueva. La tarjeta Urgencias y Terapia Intensiva usa la misma clase atlas-gineco-feature y las mismas dimensiones que las otras tarjetas destacadas. Su fotografía se muestra completa con object-fit:contain, sin filtros ni recortes. Se incluye el recurso en la caché PWA. Las 68 calculadoras, las demás imágenes y el Modo Guardia no cambian.


## KidBum CALC v0.10.2 — Arranque optimizado para datos móviles

- La vista inicial ahora solicita **un paquete clínico `assets/startup-bundle.js` en vez de 15 archivos JavaScript encadenados**. Las fuentes individuales originales siguen disponibles en `assets/` y se concatenan sin modificar algoritmos ni datos OMS.
- El *service worker* deja de descargar en la primera visita las ~89 entradas del inventario de recursos. Instala únicamente la estructura, el motor clínico y el atlas visual. Las imágenes se descargan y guardan en caché cuando se solicitan; no necesariamente todas estarán disponibles sin conexión tras una sola visita.
- Al instalarse la PWA por primera vez ya **no recarga la página automáticamente**; tampoco la recarga al actualizar, evitando descargas duplicadas y evitando interrumpir cálculos activos. Si hay una actualización, indica que la nueva versión se verá al volver a abrir.
- Reduce comprobaciones de actualización al volver del segundo plano a un máximo aproximado de una por hora; mantiene `updateViaCache:'none'` y la estrategia de consulta en red con respaldo de caché.
- Se preservan **68 calculadoras, 12 categorías, todas las imágenes originales, créditos, iconos y Modo Guardia**. Los módulos individuales siguen en el repositorio para auditoría.
- Si una persona no puede abrir el sitio con datos, pedir probar Chrome/Safari fuera del navegador de WhatsApp, verificar permiso de datos de navegador y disponibilidad de red. El funcionamiento real en redes celulares debe validarse externamente; las pruebas automatizadas no permiten simular la cobertura del operador.

Para mantener el paquete tras cambios en los módulos, ejecutar `node scripts/build-startup.cjs` y confirmar las pruebas antes de publicar.


## KidBum CALC v0.10.3 — Compatibilidad de instalación en Apple

- Confirmado que el sitio PWA dispone de HTTPS por GitHub Pages, manifiesto `display:standalone`, icono Apple existente, viewport adaptable y caché de funcionamiento sin conexión.
- Añadidas etiquetas específicas de Safari iOS/iPadOS `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style` y `apple-mobile-web-app-title`. El icono original de 192×192 no se modifica.
- Las instrucciones oficiales de instalación para iPhone/iPad aparecen en **Información**: Safari → Compartir → Agregar a Inicio → activar «Abrir como app web» → Agregar.
- El usuario puede usar Wi-Fi o datos celulares; solo el contenido ya descargado puede funcionar sin conexión. La primera visita requiere conexión para preparar el motor y precaché esencial.
- Se mantienen 68 calculadoras, 12 categorías, Modo Guardia, diseño de Android y todas las imágenes originales. No se requiere App Store ni paquete nativo.
- No se ha realizado una prueba física en iPhone/iPad. Debe comprobarse en Safari real antes de afirmar plena compatibilidad entre versiones de iOS.

Referencias: https://support.apple.com/es-mx/guide/iphone/iphea86e5236/ios y https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html.
