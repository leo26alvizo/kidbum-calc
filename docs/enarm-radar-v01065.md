# KidBum ENARM 1.1 — Radar de Conocimiento y revisión editorial

Fecha de revisión documental de esta entrega: **23 de noviembre de 2026**. Registro de diseño y fuentes de referencia; **no constituye validación clínica independiente de los reactivos**.

## Alcance

- Banco ampliado de 30 a **37 casos originales**, dos preguntas por caso: de 60 a **74 reactivos**.
- El formato de casos con dos a tres preguntas, cuatro opciones por reactivo y una respuesta correcta se comprobó en la **convocatoria del 50.º ENARM 2026** de CIFRHS. Los casos de KidBum son originales y **NO** reactivos publicados o aprobados por la CIFRHS.
- Estado editorial de **los 74 reactivos**: *pendiente de revisión clínica independiente*. No se atribuye aval a ninguna sociedad, guía, adscrito, autoridad, autor ni publicación. Cada fuente es material de cotejo de principios clínicos, **no** un certificado de validación caso por caso.
- No se introdujeron dosis individualizadas, reglas nuevas de prescripción, ni funciones de soporte para atención de pacientes.

## Fuentes públicas consultadas para orientar los siete casos añadidos

| Caso | Tema | Fuente de consulta y precisión |
|---|---|---|
| mi-08 | EPOC | [GOLD, informe y guía de bolsillo 2026](https://goldcopd.org/2026-gold-report/) — confirmar obstrucción con VEF1/CVF posbroncodilatador y contexto clínico. |
| ped-06 | Otitis media aguda | [CDC, atención pediátrica ambulatoria](https://www.cdc.gov/antibiotic-use/hcp/clinical-care/pediatric-outpatient.html) — tímpano abombado y factores de selección de manejo. |
| go-06 | Distocia de hombros | [MSF, guía clínica](https://medicalguidelines.msf.org/en/viewport/ONC/english/7-5-shoulder-dystocia-51417529.html) — McRoberts, presión suprapúbica y evitar presión fúndica; emergencia obstétrica. |
| cg-05 | Hernia complicada | [HerniaSurge, actualización 2023](https://academic.oup.com/bjsopen/article/7/5/zrad080/7325871) — hernia inguinal agudamente irreductible y sospecha de estrangulación. |
| urg-05 | Neumotórax a tensión | [NICE NG39, traumatismos graves](https://www.nice.org.uk/guidance/ng39/chapter/Recommendations) — descompresión antes de imagen con inestabilidad o compromiso respiratorio grave. |
| mf-04 | Vacunación antigripal | [OMS, programa mundial de influenza](https://www.who.int/teams/global-influenza-programme/vaccines/vaccine-use) — personal sanitario y embarazadas entre grupos prioritarios; seguir políticas nacionales vigentes. |
| sp-03 | Valor predictivo positivo | [CDC, Principios de Epidemiología, apéndice A](https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson5/appendixa.html) — VP+ = verdaderos positivos / todos los positivos y dependencia de prevalencia. |

**Prioridad editorial:** revisar primero los casos de conducta urgente (distocia de hombros, neumotórax a tensión, hernia complicada), después medicina interna y pediatría. Requerir, antes de etiquetar una pregunta como validada: adscrito responsable, fecha, fuente primaria aplicada al escenario completo, discriminación de alternativas y vigencia en el contexto de México.

## Radar y datos locales

- No se crea cuenta ni servicio de seguimiento. Solo se reutiliza `localStorage['kidbum-enarm-progress-v1']`, **sin sobrescribir favoritos, cálculos ni preferencias**.
- La v1 guarda `seen,right,wrong,streak`; v1.1 conserva estos valores e incorpora opcionalmente `lastAt,dueAt,intervalDays`. Cuando un historial anterior carece de fechas, **no se inventan**: sus respuestas previamente practicadas quedan disponibles para repaso inicial; las no respondidas no se consideran pendientes.
- Un acierto programa el próximo repaso a 1, 3, 7, 14, 30 o 60 días según aciertos consecutivos; un error restablece la secuencia y queda disponible de inmediato. Los intervalos son una **regla pedagógica local**, no una intervención con eficacia individual demostrada.
- Se muestra porcentaje observado **por área**, con número de intentos. Se indica «Muestra pequeña» cuando hay menos de cinco intentos en esa área. Con cero intentos se muestra «Sin datos», nunca 0 % inventado.
- Una recomendación comparativa del área más débil solo aparece con cinco o más respuestas contabilizadas; el resultado es descriptivo, **no** un puntaje ENARM, diagnóstico, evaluación de competencias ni predicción de aprobación.
- El modo **Repaso de hoy** incluye casos con al menos una pregunta previamente contestada y vencida. El contenido del caso mantiene dos preguntas para conservar el contexto. Las nuevas preguntas nunca practicadas no se contabilizan como vencidas.
- La hora del dispositivo se usa para programar próximos repasos. Cambios manuales de fecha/hora pueden alterar la cola; no hay notificaciones push, correos ni sincronización entre dispositivos.
- Los controles «Borrar mi progreso» preservan la confirmación explícita del usuario. Si el almacenamiento falla, el entrenamiento sigue en memoria sin prometer persistencia.

## Ingeniería y compatibilidad

- `assets/enarm-radar-v01065.js` es función pura, fácil de probar con fechas fijas; `assets/enarm-radar-v01065.css` implementa barras accesibles con soporte modo oscuro, móvil, alto contraste y movimiento reducido.
- `assets/enarm-bank-v01064.js` se amplía sin eliminar ni reordenar identificadores previos. `assets/enarm-ui-v01064.js` conserva los mismos modos, añade Radar y conserva las estadísticas históricas. Se mantienen los nombres de archivos JS de v1 por compatibilidad, con versión de servicio v0.10.65.
- `sw.js` incluye los dos nuevos recursos de forma atómica con el shell offline. No se cambian las imágenes ni motores clínicos de KidBum.
- Verificar en CI: conteos 37/74, estructura de 4 alternativas, distribución, URLs, seis intervalos, migración de datos, recuperación tras fallos de storage, comportamiento de «Muestra pequeña», pruebas móviles y ausencia de errores de navegador.

## Pendientes antes de presentar el banco como clínicamente validado

1. Revisión independiente documentada de los **74 reactivos**, opciones, racionales, diagnósticos diferenciales y lenguaje seguro.
2. Cotejo GPC mexicanas vigentes / PRONAM y sociedades internacionales, con fechas y secciones precisas por pregunta.
3. Piloto docente con calibración de dificultad, discriminación de distractores y retroalimentación; ninguna cifra de rendimiento debe confundirse con una predicción de puntaje oficial.
