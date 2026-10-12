# KidBum CALC — Auditoría funcional y prioridades de seguridad (v0.10.6)

**Alcance:** versión 0.10.6, 68 calculadoras. Revisión automatizada de formularios y del motor JavaScript, con ejemplos ficticios.

## Resultados

| Comprobación | Resultado |
| --- | --- |
| Formularios con ejemplo y resultado calculable | **68/68** |
| Pruebas de entrada alterada exploradas | **769** |
| Valores alterados rechazados por el motor | **748** |
| Campos de rama no aplicable de ASIA/AIS | **21** |
| Comprobaciones aritméticas independientes | **15/15** |
| ROX y RASS sin contexto clínico confirmado | Bloqueados |

Las 769 pruebas de entrada alterada incluyen valores inferiores y superiores a los límites del formulario, texto no numérico, infinito, fechas inválidas y opciones no permitidas.

**Observación ASIA/AIS:** los 21 casos aparecen al inyectar artificialmente valores inválidos en motorBeyond3 y 20 campos musculares, mientras que la evaluación indica AIS A por ausencia de preservación sacra. Esa rama termina antes de leer los campos motores, que no intervienen en esa clasificación. El menú normal no ofrece las opciones artificialmente inyectadas. Debe reforzarse la validación defensiva y hacerse explícitos los campos no utilizados. No se modificó la clasificación clínica durante esta auditoría.

**Reproducir:** ejecutar 'node tests/safety-audit.cjs' y 'node tests/regression.cjs'.

## Cobertura de formularios por categoría

| Categoría | Con ejemplo calculado |
| --- | ---: |
| Pediatría | 22 |
| Cardiología | 9 |
| Neurología y Raquimedular | 7 |
| Urgencias y Terapia Intensiva | 5 |
| Química clínica | 5 |
| Ginecología y obstetricia | 5 |
| Función renal | 4 |
| Escalas clínicas | 4 |
| Antropometría | 2 |
| Hemodinámica | 2 |
| Hepatología | 2 |
| Gastroenterología | 1 |
| **Total** | **68** |

## Alcance y limitaciones

- **Comprobado técnicamente:** cada formulario tiene un motor, su ejemplo genera resultado, las entradas numéricas inválidas auditadas se rechazan, y 15 casos sintéticos tienen el cálculo aritmético esperado.
- **No comprobado:** exactitud clínica de las 68 ecuaciones y tablas, vigencia de todas las referencias y umbrales, indicaciones y contraindicaciones completas, accesibilidad, comportamiento exhaustivo de todas las ramas ni pruebas de interfaz/offline en móviles reales.
- **No constituye** certificación ni validación clínica independiente de un dispositivo médico, y no autoriza decisiones terapéuticas.

## Plan de seguridad clínica prioritario

1. **P0: bloqueos críticos.** Revisar elegibilidad, datos ausentes, unidades, valores contradictorios, resultado no evaluable y criterios de escalamiento en escalas de EVC, terapia intensiva, lesión medular, fluidos IV pediátricos y cálculos de dosis.
2. **P1: validación de referencia por fórmula.** Para cada calculadora registrar fuente primaria, edición/fecha, población, ecuación, unidades, casos de referencia y límites de uso. Priorizar alteplasa, SOFA-2, CAM-ICU, NIHSS, ASIA/AIS, P/F, ROX, líquidos pediátricos y función renal.
3. **P2: interfaz segura.** Advertencias legibles, resultados con unidades y desglose, distinguir datos no evaluables, no insinuar prescripciones, mantener la privacidad de los datos y aclarar la transferencia manual a ChatGPT.
4. **P3: calidad del despliegue.** Ejecutar pruebas por cambio, mantener la versión visible sincronizada, y comprobar Android/iOS con y sin conexión.

**Regla propuesta:** una calculadora no está validada clínicamente solo por producir un resultado. Se requiere contraste independiente con referencias vigentes y supervisión profesional.
