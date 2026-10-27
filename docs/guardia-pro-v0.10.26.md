# Guardia Pro v0.10.26 — ficha clínica y seguridad

Fecha de revisión: 26 de octubre de 2026. Para apoyar razonamiento y docencia, no sustituye protocolos institucionales, validación por adscrito ni consulta especializada. La puntuación nunca prescribe anticoagulantes, suspende heparina o determina alta.

## 4Ts (HIT)
Cuatro dominios 0–2: trombocitopenia; temporalidad; trombosis/secuela; causas alternativas. Total 0–8. 0–3 baja, 4–5 intermedia, 6–8 alta. Usar datos documentados de exposición a heparina, serie plaquetaria y alternativas; un resultado ≥4 obliga a evaluación clínica urgente de posible HIT. El recuento de plaquetas nadir y su porcentaje de caída deben documentarse.
Referencias:
- ASH, 2018: https://www.hematology.org/-/media/hematology/files/education/clinicians/guidelines-quality/documents/watermarked-pocket-guides/watermark-ash_vte_hit_pocketguide.pdf
- ASH Education Program 2018: https://ashpublications.org/hematology/article/2018/1/576/277620/Drug-associated-thrombocytopenia
- JAMA Network Open, cohorte de evaluación de diagnóstico 2024: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2816742

## Padua
11 factores: cáncer activo 3, TEV previa 3, movilidad reducida por al menos 3 días 3, trombofilia conocida 3, traumatismo/cirugía ≤1 mes 2, edad ≥70 1, insuficiencia cardiaca/respiratoria 1, IAM/EVC isquémico agudo 1, infección aguda/enfermedad reumatológica 1, IMC ≥30 1, tratamiento hormonal 1. Total 0–20; riesgo alto ≥4 en pacientes médicos adultos hospitalizados. La escala no debe extrapolarse sin contexto a poblaciones quirúrgicas, embarazadas ni ambulatorias. No decide profilaxis.
Referencia: https://www.ncbi.nlm.nih.gov/books/NBK585614/table/ch17.Tab17/

## IMPROVE Bleeding
11 componentes: edad 40–84 = 1.5, ≥85 = 3.5 (excluyentes), variable sexo masculino = 1, TFG 30–59 = 1, <30 = 2.5 (excluyentes); neoplasia activa 2, enfermedad reumatológica 2, CVC 2, UCI/coronaria 2.5, enfermedad hepática (INR >1.5) 2.5, plaquetas <50×10⁹/L 4, sangrado últimos 3 meses 4, úlcera gastroduodenal activa 4.5. Alto riesgo ≥7. TFG expresada por 1.73 m² (modelo original); no realizar extrapolación a AKI inestable sin evaluación. No define contraindicación absoluta.
Referencia de componentes: https://eval.health/improve-bleeding-risk-score

## Gasometría integrada
Esta pantalla no cuenta como calculadora adicional. Exige datos clínicos completos, edad adulta, gasometría ARTERIAL y electrólitos temporalmente comparables. Reutiliza motor de AG (AG = Na − Cl − HCO₃⁻) y expone su componente numérico opcional AG ajustada por albúmina (AG + 2.5×(4−alb g/dL)); no altera el valor anterior. Usa KidBumHospital para Winter (1.5 HCO₃⁻ +8 ±2) cuando se ha confirmado acidosis metabólica primaria y para delta ratio ((AG − AGref)/(HCO₃ref − HCO₃)); AGref y HCO₃ref NO se adivinan. Delta ratio orienta a posibles trastornos mixtos, no los confirma. No extrapolar pCO₂ venosa como PaCO₂. No indicar bicarbonato ni intubación mediante estos cálculos.
Referencias dentro del proyecto: index.html, keys winter/deltaratio/anion; hospital-module.js.

## Checklist de salida
- Validar 4Ts, Padua, IMPROVE con tablas oficiales y extremos.
- Bloquear datos faltantes y rangos inválidos, nunca asumir opción No.
- Garantizar navegación, modo oscuro, créditos, imágenes, cero transferencia automática de datos.
- Confirmar apertura tras instalación offline en primeras visitas.
- Ejecutar tests/guardia-pro.cjs, tests/guardia-gasometria.cjs, regresión, catálogo, PWA y auditoría.
- Evaluación por clínico responsable antes de usarse en decisiones de paciente real.
