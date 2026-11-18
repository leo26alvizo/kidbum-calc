# KidBum Algoritmos Pediátricos v0.10.51 — Primera entrega

## Producto
Se añadió una tarjeta **Algoritmos clínicos** dentro de la especialidad Pediatría de `index.html`, que enlaza a `algoritmos-pediatria.html`. El nuevo módulo no es una calculadora numérica y **no incrementa** el total de calculadoras.

**Cuatro flujos clínicos táctiles y sin conexión:** diarrea/deshidratación (niños de 2 meses a <5 años), bronquiolitis (<2 años), sepsis y choque séptico pediátrico e ictericia neonatal (≥35 semanas).

El usuario puede filtrar categorías, buscar por términos sin tildes, pulsar opciones grandes (sí/no/no se sabe), volver a una decisión, reiniciar, alternar entre **Guardia** (rápido) y **Estudio** (criterios y referencias), compartir un enlace directo con `#id` y consultar las fuentes por algoritmo. Los árboles no solicitan ni conservan datos identificables ni realizan solicitudes remotas al funcionar. Todos los diagnósticos de riesgo comienzan por una pregunta de alarma, antes de determinar edad o modalidad de seguimiento.

## Fuentes y ámbito
1. **Diarrea aguda y deshidratación:** IMSS [GPC 156-08](https://www.imss.gob.mx/node/85161) (documento histórico; no afirmar actualización por la fecha de acceso), complementado por [NICE CG84](https://www.nice.org.uk/guidance/cg84/chapter/Recommendations) (2009). Se usa una ruta simplificada de detección de alarma y necesidad de valoración; **no** se asignan grados de deshidratación ni volúmenes.
2. **Bronquiolitis:** [NICE NG9](https://www.nice.org.uk/guidance/ng9/chapter/Recommendations) (2015, umbrales de oxigenoterapia actualizados en 2021). Se priorizan apnea, cianosis, esfuerzo, hidratación y riesgo. La ruta **no** pretende reemplazar los umbrales exactos de ingreso por edad y comorbilidad.
3. **Sepsis:** [Surviving Sepsis Campaign infantil 2026](https://www.survivingsepsis.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-the-management-of-sepsis-and-septic-shock-in). Se diferencia choque (antibiótico idealmente ≤1 h) de sepsis probable sin choque (evaluar y tratar idealmente ≤3 h cuando persiste sospecha). Fluidos/vasoactivos requieren contexto de recursos, reevaluación y supervisión.
4. **Ictericia neonatal:** [AAP 2022, ≥35 semanas](https://www.aap.org/en/patient-care/hyperbilirubinemia/) (AAP señala vigencia hasta agosto 2027). Interpretación depende de bilirrubina sérica total, horas de vida, semanas de gestación y factores de riesgo; **no** se calcula un umbral arbitrario ni se extrapola Kramer a bilirrubina.

En los cuatro: la respuesta “No sé” deriva a valoración segura, nunca a alta. No se generan órdenes, prescripciones, dosis ni volúmenes de fluidos. En caso de deterioro la atención clínica precede a la herramienta.

## Arquitectura
- `assets/pediatria-algoritmos-core-v01051.js`: motor determinista y datos clínicos, con `validate()` para comprobar que cada nodo, resultado y ruta es alcanzable.
- `assets/pediatria-algoritmos-ui-v01051.js`: navegación, búsqueda, modo de visualización, bibliografía y tema oscuro compartido (único dato persistido: preferencia de tema).
- `assets/pediatria-algoritmos-v01051.css`: diseño responsivo y accesible; botones de 42–62 px, focos visibles, semántica de riesgos y reducción de animaciones.
- `algoritmos-pediatria.html`: interfaz de la biblioteca.
- `index.html`: tarjeta de acceso dentro de Pediatría; acceso separado de los 138 cálculos existentes.
- `sw.js`: módulo precargado para uso sin conexión.
- `tests/pediatric-algorithms-v01051.cjs` y `tests/pediatric-algorithms-browser-v01051.cjs`: integridad clínica y ruta táctil real en Chromium.

## Alcance pendiente
Es una **primera entrega de 4**, no las 37 rutas propuestas. Para continuar: dificultad respiratoria y crisis asmática, lactante febril, anafilaxia, estado epiléptico y otras rutas priorizadas, pero deben publicarse **solo después** de cotejo clínico, validación de población y escenarios peligrosos, pruebas e integración con herramientas ya existentes.

Ninguna relación editorial de Pharma Pro se transforma en pauta por abrir estos algoritmos.
