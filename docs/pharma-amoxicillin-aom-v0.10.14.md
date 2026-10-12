# KidBum CALC v0.10.14 — Amoxicilina oral: exclusivamente OMA

**Alcance:** nueva herramienta de referencia aritmética dentro de **Pediatría → Farmacología Pediátrica**. No constituye diagnóstico, prescripción, recomendación de iniciar antibiótico ni validación clínica institucional.

## Fundamento y diferencia entre fuentes

- **Guía mexicana:** Catálogo Maestro IMSS-496-21, *Prevención, diagnóstico y tratamiento de la otitis media aguda en la edad pediátrica*: https://gpc.salud.gob.mx/DDIMBE/DDIMBE/ContenidoGuia?DocumentoID=3061
- **AAP (2013):** *The Diagnosis and Management of Acute Otitis Media*, Tabla 5: **80–90 mg/kg/día de amoxicilina en dos dosis** para determinados pacientes con OMA: https://publications.aap.org/pediatrics/article/131/3/e964/30912/
- **UCSF (consultado octubre 2026):** *Acute Otitis Media*: **45 mg/kg por dosis cada 12 h, máximo 1000 mg por dosis**; criterios de observación sin antibiótico e indicaciones de amoxicilina-clavulanato: https://idmp.ucsf.edu/content/acute-otitis-media
- **NICE NG91 (última actualización de recomendaciones de tratamiento, 2022):** en muchos casos conviene observación/no antibiótico; emplea dosis por franjas de edad tres veces al día, **no el mismo esquema de dosis alta que AAP**. No se combinan pautas de NICE con la fórmula de AAP: https://www.nice.org.uk/guidance/ng91/chapter/Recommendations
- **Presentación:** amoxicilina sola **400 mg/5 mL** identificada en México como AMOXIL 12H suspensión (revisar registro, envase y etiqueta vigente): https://www.medicamentosplm.com/Home/productos/amoxil.12h.suspension/64/101/6285/194. DailyMed también documenta 400 mg/5 mL en el etiquetado estadounidense; la dosis alta por OMA procede de la guía específica, **no se debe extrapolar a las demás infecciones**.

## Población y cálculos delimitados

- Edades 24–143 meses; peso **8–40 kg**. Límites operativos de la app, no la totalidad de pacientes elegibles clínicamente.
- Solo diagnóstico de OMA **confirmado por médico con otoscopia** y decisión documentada de usar antibiótico tras valorar observación.
- Solo amoxicilina oral **sin clavulanato** y concentración de etiqueta **400 mg/5 mL = 80 mg/mL**.
- El profesional selecciona **80 o 90 mg/kg/DÍA**; el motor calcula (peso × mg/kg/día) ÷ 2 tomas, cada 12 horas, y convierte mg/toma ÷ 80 mg/mL a volumen teórico.
- Si el resultado supera **1000 mg por toma**, el sistema bloquea, **no** aplica un tope silencioso que altere la pauta elegida. Se requiere individualizar.
- **Duración no calculada**: la determina el equipo tratante según edad, gravedad, evolución y guía aplicable. El motor no emite orden médica, ni receta ni redondea mL a un dispositivo.

## Bloqueos explícitos

Cualquier dato no seleccionado, desconocido o clínicamente problemático impide mostrar mg o mL:
1. Diagnóstico no confirmado, decisión de no tratar o no definida, falta de evaluación médica.
2. Alergia a penicilina/otros betalactámicos, posible compromiso renal, imposibilidad de vía oral.
3. Amoxicilina en 30 días previos, conjuntivitis purulenta, OMA recurrente no respondedora o falla del antibiótico inicial (situaciones donde AAP/UCSF pueden preferir amoxicilina-clavulanato u otra evaluación).
4. Datos de complicación o infección grave, inmunosupresión o condición especial.
5. Presentación distinta, no confirmada o combinada con ácido clavulánico.
6. Valores numéricos fuera de límites, dosis diaria diferente a las opciones admitidas, o más de 1000 mg/toma.

El bloqueo significa **«el módulo no puede valorar esta situación»**, no contraindicación absoluta de amoxicilina.

## Casos sintéticos para prueba (NO prescripciones)

| Peso | Referencia elegida | Total diario | Cada 12 horas | Concentración 400 mg/5 mL | Resultado |
|---|---|---|---|---|---|
| 15 kg | 80 mg/kg/día | 1200 mg/día | 600 mg/toma | 80 mg/mL | 7.5 mL teóricos/toma |
| 15 kg | 90 mg/kg/día | 1350 mg/día | 675 mg/toma | 80 mg/mL | 8.4375 mL teóricos/toma |
| 30 kg | 90 mg/kg/día | 2700 mg/día | 1350 mg/toma | 80 mg/mL | **Bloqueado por máximo de 1000 mg/toma** |

**Precisión:** el cálculo interno conserva decimales. La interfaz muestra hasta 3 decimales para lectura, pero **no** determina un volumen medible ni una graduación de jeringa; ese ajuste es una decisión clínica y farmacéutica.

## Qué sigue pendiente

La calculadora de OMA no está validada institucionalmente, no reemplaza revisión farmacológica del etiquetado mexicano de cada producto, no cubre neonatos/menores de 2 años, pacientes especiales ni todos los escenarios de OMA. Faltan pruebas visuales en teléfonos reales y evaluación independiente por pediatría/farmacia. Es un apoyo matemático a una decisión médica previa, no diagnóstico ni prescripción automatizada.

Pruebas automatizadas: `node tests/pediatric-drug-doses.cjs`, `node tests/pediatric-pharmacy.cjs`, `node tests/regression.cjs`, `node tests/safety-audit.cjs` y `node tests/pwa-cellular.cjs`. Las calculadoras originales siguen siendo **68**.
