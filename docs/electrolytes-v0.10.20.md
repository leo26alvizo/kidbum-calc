# KidBum CALC v0.10.20 — Nefrología, balance hídrico y electrólitos

**Ámbito:** referencias aritméticas locales, para adultos, dentro de **Función renal** y **Química clínica**. No son órdenes médicas; requieren juicio y supervisión clínica. Esta versión conserva las 70 calculadoras anteriores y añade seis herramientas; total de 76.

## Inventario sin duplicados

| Tema de la referencia visual | Estado | Categoría |
|---|---|---|
| Déficit teórico de sodio en hiponatremia | NUEVO | Función renal |
| Déficit de agua libre en hipernatremia | NUEVO | Función renal |
| Calcio ajustado por albúmina | NUEVO (fórmula histórica con alerta) | Química clínica |
| TFG CKD-EPI 2021 | Existente | Función renal |
| Cockcroft–Gault | Existente | Función renal |
| Brecha aniónica | Existente | Química clínica |
| FeNa | Existente | Función renal |
| FeUrea | Existente | Función renal |
| Brecha osmolal sérica (osmol gap) | NUEVO | Química clínica |
| Potasio sérico, seguridad antes de reposición | NUEVO (sin dosis automáticas) | Función renal |
| Sodio corregido por hiperglucemia | Existente | Química clínica |
| Osmolalidad calculada | Existente | Química clínica |
| Diferencia teórica de bicarbonato | NUEVO (sin dosis automáticas) | Química clínica |

## Fórmulas y límites

### Déficit teórico de sodio
ACT estimada = peso (kg) × factor elegido explícitamente (0.40, 0.45, 0.50 o 0.60). Diferencia matemática = ACT × (Na objetivo − Na medido), en **mmol teóricos**, no dosis ni volumen de salino. Aplicación restringida a adultos con Na 110–134.9 mmol/L y objetivo cercano que no implique un salto mayor de 6 mmol/L; requiere exclusión clínica de urgencia neurológica. **La hiponatremia usualmente implica alteraciones del agua y el estado de volumen, por lo que NO se infiere reposición de sodio a partir de esta fórmula.** La compensación real depende de diuresis, cambios en potasio y agua corporal, etiología y monitoreo continuo.

Fuentes: [Hyponatremia, NCBI Bookshelf (actualización 2026)](https://www.ncbi.nlm.nih.gov/books/NBK470386/); [Limitaciones de ecuaciones de corrección, 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10278828/).

### Déficit de agua libre
ACT × [(Na interpretado / 140) − 1] en L. Requiere hipernatremia en adulto (Na >145), peso y factor de ACT seleccionados; el ejemplo 60 kg × 0.5, Na 166 produce aproximadamente **5.57 L**. NO equivale al volumen a administrar: no contabiliza pérdidas en curso, volemia, hiperglucemia ni vía/velocidad. Si hay choque o hipovolemia grave, priorizar estabilización presencial.

Fuente: [Evaluation and management of hypernatremia in adults, 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10175862/).

### Calcio corregido por albúmina, fórmula histórica
Ca ajustado (mg/dL) = Ca total (mg/dL) + 0.8 × [4 − albúmina (g/dL)]. Ejemplo Ca 7.6 y albúmina 2 → **9.2 mg/dL**. La fórmula **NO mide ni predice fiablemente el calcio ionizado**; su rendimiento es deficiente en pacientes hospitalizados, críticos y con enfermedad renal. Utilizar ionizado cuando la decisión clínica requiere precisión. Se incluyó solo como comparación con sistemas existentes y docencia.

Fuentes: [JAMA Network Open 2025, 22 658 pacientes](https://pmc.ncbi.nlm.nih.gov/articles/PMC11751745/); [Revisión Pathology 2026](https://pubmed.ncbi.nlm.nih.gov/41318320/).

### Brecha osmolal
Osm calculada ≈ 2 × Na (mmol/L) + glucosa (mg/dL)/18 + BUN (mg/dL)/2.8 + etanol (mg/dL)/3.7 **solo cuando se dispone de etanol medido**. Brecha = osmolalidad medida (mOsm/kg) − estimada (mOsm/kg aproximados). Se exige muestra pareada y unidades verificadas. No se infiere etanol desde el osmol gap. Una brecha normal **NO excluye alcoholes tóxicos**, particularmente tardíamente. La aproximación y el valor normal dependen del método.

Fuentes: [Cleveland Clinic Journal of Medicine](https://www.ccjm.org/content/84/1/27); [Contribución del etanol, estudio de derivación y validación](https://pubmed.ncbi.nlm.nih.gov/11719745/).

### Potasio sérico y necesidad de valoración
La tarjeta muestra clasificación del potasio sérico, señales de alarma y necesidad de revisar ECG, función renal, magnesio, diuresis y estado ácido-base. **No estima déficit corporal cuantitativo ni prescribe KCl, vía de administración, concentración o ritmo de infusión.** El potasio sérico puede variar por redistribución aun con contenido corporal normal; un valor extremo o cambios ECG requieren evaluación urgente.

Fuente: [Clinical Methods, Serum Potassium](https://www.ncbi.nlm.nih.gov/books/NBK307/); [A physiologic-based approach to hypokalemia](https://pubmed.ncbi.nlm.nih.gov/22901631/).

### Déficit teórico de bicarbonato
Estimación exclusivamente matemática = peso (kg) × factor de distribución seleccionado (0.3 o 0.5) × [HCO₃⁻ objetivo − HCO₃⁻ observado] (mmol teóricos). Requiere confirmación de acidosis metabólica primaria y pH arterial documentado, con tope matemático de Δ8 en esta interfaz. La estimación no constituye indicación de alcalinización, ni dosis de ampollas. El tratamiento suele depender de la causa y del contexto de acidemia, perfusión, ventilación y riñón; evitar considerar que el déficit teórico necesita reponerse integralmente.

## Seguridad técnica

- Todas las fórmulas exigen unidades precisas, condiciones de elegibilidad y datos clínicos explícitos.
- Los ejemplos ficticios están completos y generan resultado numérico; valores faltantes, no numéricos, fuera de rango o con selección incompatible deben bloquear.
- En ningún caso se ofrecen órdenes de soluciones, reposición IV/VO, concentraciones, medicamentos, ritmos o objetivos temporales.
- Se mantienen los resultados exclusivamente en el dispositivo y la opción de privacidad de la app.
- La validación de código y casos de referencia no equivale a validación institucional ni farmacológica. Revisar las fuentes y protocolo local antes de usar con pacientes.

Pruebas: `node tests/electrolytes.cjs`, `node tests/regression.cjs`, `node tests/safety-audit.cjs`, `node tests/pwa-cellular.cjs`. 
