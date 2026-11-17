# Pharma Pro 0.10.50 · mapa explícito de diagnósticos y usos clínicos

## Cobertura estructural
- **643/643** principios activos/entradas del catálogo vinculados de manera explícita a **al menos un diagnóstico o motivo clínico de uso**.
- **250** categorías distintas de diagnóstico/contexto, agrupadas en el módulo local `assets/pharma-drug-diagnoses-v01050.js`.
- **0** medicamentos sin relación y **0** vínculos generados automáticamente por una regla general de familia farmacológica.
- Navegación bidireccional: medicamento → diagnósticos y diagnóstico → medicamentos; búsqueda rápida por diagnóstico; resumen en tarjetas y fichas.
- La tabla es **editorial y orientativa, no una monografía aprobada**. Cada vínculo declara `reviewed:false`, `source:null` y **no contiene dosis ni esquemas**. No equivale a una indicación validada en México, a autorización de COFEPRIS, a prescripción ni a primera línea.
- Se muestran en un apartado **separado** las 15 rutas previas de guías documentadas, para no confundir estos nuevos vínculos orientativos con evidencia verificada.
- El módulo de etiquetas externas por formulación y los 12 medicamentos con alguna referencia posológica anterior no se alteran.

## Casos especiales
Algunos medicamentos no se usan para tratar una enfermedad, sino para un **motivo de intervención médica**, por ejemplo anestesia general, reversión de bloqueo neuromuscular, profilaxis quirúrgica, anticoncepción, reproducción asistida o midriasis diagnóstica. En esos casos se vincula la **indicación clínica procedural**, no se inventa una enfermedad.

Las asociaciones de anticoagulantes, insulinas, antivirales, quimioterapia, transfusión/hemorragia, obstetricia, fármacos de alto riesgo y soluciones IV son puntos de orientación, no autorización de administración. Una relación no tiene efecto sobre el motor posológico ni sobre las restricciones por edad, peso, embarazo o función renal.

## Verificación y mantenimiento
- Test: `node tests/pharma-diagnosis-coverage-v01050.cjs` en GitHub Actions.
- La prueba exige **cobertura exacta 643/643**, identidad de todos los fármacos, consistencia en ambos sentidos, uso explícitamente orientativo y separación del esquema posológico; un medicamento nuevo sin diagnóstico hace fallar el despliegue.
- **Pendiente clínico:** cotejar y documentar indicación(s), línea terapéutica y ámbito de cada relación individual con IPP mexicana y GPC/PRONAM; para usos regulatorios exteriores, documentar el producto/jurisdicción. Los casos editoriales complejos o potencialmente desactualizados exigen auditoría especial.
- **Pendiente posológico:** como se detalla en `docs/pharma-diagnosticos-posologia-v01048.md`, asociar un diagnóstico NO resuelve la ausencia de dosis completas validadas de 631 medicamentos.

La integridad del índice está comprobada por código. La validación médica/farmacéutica de cada relación individual **no** ha sido completada y no debe anunciarse como tal.
