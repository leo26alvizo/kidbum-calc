# KidBum CALC — Referencia farmacológica pediátrica oral v0.10.12

**Ámbito:** módulo Farmacología pediátrica dentro de Pediatría. Primera entrega de cálculo aritmético condicionado para dos principios activos orales (paracetamol e ibuprofeno); sin automatizar tratamientos ni antibióticos. Las 68 calculadoras anteriores permanecen intactas.

## Fuentes contrastadas y selección conservadora

| Fármaco | Rango de referencia seleccionado | Presentación revisada | Intervalo mínimo | Límite operativo conservador |
|---|---|---|---|---|
| Paracetamol oral | 10 o 15 mg/kg/toma | 160 mg/5 mL | 6 horas | Hasta 4 dosis y 60 mg/kg en 24 horas |
| Ibuprofeno oral | 5 o 10 mg/kg/toma | 100 mg/5 mL | 8 horas | Hasta 3 dosis y 30 mg/kg en 24 horas |

Los límites representan una **política conservadora de esta interfaz**, no un protocolo universal, y no deben extrapolarse fuera del escenario definido. Cualquier esquema de frecuencia más alta o de otra concentración exige revisión individual y se bloquea aquí.

**Población admitida en esta fase:** niños de 24–143 meses, con peso actual 8–40 kg, valoración por personal médico y confirmación del producto; se excluyen escenarios que requieran individualización especial. Un bloqueo **no significa necesariamente contraindicación absoluta**; significa que el módulo no puede verificar el caso sin evaluación adicional.

**Fuentes clínicas:**
1. Secretaría de Salud de México, CENSIA, [documento de referencia](https://www.censia.salud.gob.mx/contenidos/descargas/vacunas/Lineamientos_de_Vac_25_10_13_media.pdf), incluye paracetamol 10–15 mg/kg/dosis cada 4–6 h e ibuprofeno 10 mg/kg/dosis cada 6–8 h. Corroborar aplicabilidad y edición al emplearlo institucionalmente.
2. American Academy of Pediatrics, [acetaminophen dosing table, actualización enero de 2026](https://www.healthychildren.org/English/safety-prevention/at-home/medication-safety/Pages/Acetaminophen-for-Fever-and-Pain.aspx), concentración de referencia 160 mg/5 mL, verificación de etiqueta y limitación de dosis.
3. Royal Children's Hospital Melbourne, [Acute pain management, actualización octubre de 2024](https://www.rch.org.au/clinicalguide/guideline_index/Acute_pain_management/), paracetamol oral e ibuprofeno oral, riesgos de deshidratación y deterioro renal, máximo recomendado 30 mg/kg/día para ibuprofeno en su protocolo.
4. NHS, [Ibuprofen for children](https://www.nhs.uk/medicines/ibuprofen-for-children/), presentación 100 mg/5 mL y precauciones por edad, hidratación y enfermedad renal.

**Origen del inventario inicial:** archivo «Calculadora Pediátrica AnetteB» aportado por el usuario. Se utiliza para orientar qué productos revisar, **no como fuente independiente que justifique dosis o conversiones**. Algunas filas del archivo requieren comprobación especial de unidades y máximos.

## Reglas de seguridad

El motor bloquea y **no muestra valores numéricos** si:
- No se declara edad exacta en meses y peso actual dentro de la población seleccionada.
- La dosis en mg/kg está fuera de las opciones previstas o la concentración no coincide con el frasco confirmado.
- No existe indicación clínica sintomática y confirmación de revisión por personal médico.
- Se reporta alergia o contraindicación/preocupación que requiere reevaluación. Para ibuprofeno: deshidratación, nefropatía, varicela, sangrado digestivo, asma sin revisión de tolerancia o hipersensibilidad a AINE. Para paracetamol: enfermedad hepática grave, hipersensibilidad o productos concomitantes no contabilizados.
- No se documenta explícitamente el número de dosis y mg administrados en las últimas 24 h, o los datos se contradicen.
- No ha transcurrido el intervalo mínimo desde la última dosis (cuando existe dosis previa), se alcanza el número máximo de tomas o la suma de mg superaría el límite conservador por 24 h.

No se redondea automáticamente el resultado a graduaciones de jeringa ni se convierten mg en gotas. Los resultados se calculan en memoria local; no se guardan historias de pacientes ni se transmiten a Umami.

## Casos aritméticos básicos (no son recetas)

| Caso sintético | Dosis por toma | Conversión teórica |
|---|---:|---:|
| Paracetamol 15 kg a 15 mg/kg/toma y 160 mg/5 mL | 225 mg | 7.03125 mL |
| Ibuprofeno 15 kg a 10 mg/kg/toma y 100 mg/5 mL | 150 mg | 7.5 mL |

La interfaz puede mostrar resultados redondeados a dos decimales **para lectura**, pero la selección de una cantidad medible, intervalo y pauta final corresponde al equipo tratante.

## Medicamentos pendientes

**Amoxicilina oral** no se habilita como conversor genérico. La elección de pauta debe estar vinculada a una infección concreta y su gravedad, edad, peso, alergias, exposición reciente a antibióticos, función renal y situación epidemiológica. La guía de AAP para otitis media aguda describe 80–90 mg/kg/día en dos tomas en casos indicados, pero **no debe extenderse ese esquema automáticamente a toda infección**. Véanse [AAP AOM](https://publications.aap.org/pediatrics/article-lookup/doi/10.1542/peds.2012-3488) y [AAP antibiotic stewardship dosage table](https://eqipp.aap.org/File%20Library/Courses/Antibiotics/InitialAntibioticManagementDosageAndCourseTable.pdf).

## Validación técnica y pendiente

- Ejecutar `node tests/pediatric-drug-doses.cjs`, `node tests/pediatric-pharmacy.cjs`, `node tests/regression.cjs` y `node tests/safety-audit.cjs`.
- Falta evaluación institucional y revisión farmacéutica independiente de la interfaz en escenarios reales, etiquetas actuales del mercado mexicano, compatibilidad de concentraciones, pesos extremos y factores especiales.
- Este desarrollo **no constituye prescripción automatizada** ni aprobación de dispositivo médico regulado.
