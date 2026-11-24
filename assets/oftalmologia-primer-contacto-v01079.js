/* KidBum v0.10.79 · original first-contact clinical routes; independent review pending. */
(function(root){'use strict';root.KidBumOphthalmologyFirstContact=[
  {
    "id": "orzuelo-chalazion-blefaritis",
    "title": "Orzuelo, chalazión y blefaritis",
    "icon": "🧿",
    "category": "Párpados y vía lagrimal",
    "subtitle": "Nódulo palpebral, inflamación del borde y disfunción de Meibomio.",
    "scope": "Adultos y niños; cuadros febriles, neonatales o complicados requieren evaluación específica.",
    "initial": "Inspeccionar párpados y borde ciliar, agudeza visual, pupilas y motilidad. No exprimir lesiones ni automedicar esteroides.",
    "sources": [
      {
        "label": "MSD Professional · Chalazion and Hordeolum",
        "year": "2026",
        "url": "https://www.msdmanuals.com/professional/eye-disorders/eyelid-and-lacrimal-disorders/chalazion-and-hordeolum-stye"
      },
      {
        "label": "AAO · Cornea/External Disease Summary Benchmarks",
        "year": "2025",
        "url": "https://www.aao.org/education/summary-benchmark-detail/cornea-external-disease-summary-benchmarks-2020"
      },
      {
        "label": "IMSS · GPC Oftalmología; referencias históricas, vigencia no confirmada",
        "year": "2011–2012",
        "url": "https://www.imss.gob.mx/guias_practicaclinica?field_categoria_gs_value=26"
      }
    ],
    "firstContact": true,
    "urgency": "prioritaria",
    "time": "Triaje por riesgo",
    "start": "danger",
    "nodes": {
      "danger": {
        "question": "¿Hay signos orbitarios, dolor ocular importante o afectación visual?",
        "hint": "Buscar fiebre con mal estado, proptosis, dolor o limitación de motilidad, diplopía, caída visual, fotofobia o extensión rápida.",
        "choices": [
          {
            "label": "Sí / sospecha presente",
            "next": "critical",
            "tone": "danger"
          },
          {
            "label": "No, evaluado de forma fiable",
            "next": "diffuse"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "diffuse": {
        "question": "¿Edema y eritema difusos, sin nódulo bien delimitado?",
        "hint": "Celulitis preseptal puede conservar motilidad y visión; distinguir de orbitaria y dacriocistitis.",
        "choices": [
          {
            "label": "Sí, posible celulitis preseptal",
            "next": "preseptal",
            "tone": "danger"
          },
          {
            "label": "No, lesión localizada o marginal",
            "next": "atypical"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "atypical": {
        "question": "¿Recurrencia en el mismo sitio, ulceración, madarosis o aspecto atípico?",
        "hint": "Buscar induración fija, deformación, asimetría persistente o fracaso; considerar carcinoma sebáceo y otros tumores.",
        "choices": [
          {
            "label": "Sí / sospecha",
            "next": "atypical_mass",
            "tone": "danger"
          },
          {
            "label": "No",
            "next": "nodule"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "nodule": {
        "question": "¿Existe nódulo palpebral localizado?",
        "hint": "Dolor agudo en raíz de pestaña: orzuelo externo; profundo tarsal: interno; firme poco doloroso crónico: chalazión.",
        "choices": [
          {
            "label": "Agudo y doloroso",
            "next": "stye_type"
          },
          {
            "label": "Firme, poco doloroso o crónico",
            "next": "chalazion"
          },
          {
            "label": "No, predomina inflamación del borde",
            "next": "margin"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "stye_type": {
        "question": "¿Foco en borde ciliar o tarso profundo?",
        "hint": "No forzar eversión ante trauma; revisar extensión y absceso.",
        "choices": [
          {
            "label": "Externo localizado",
            "next": "external"
          },
          {
            "label": "Interno o absceso sospechado",
            "next": "internal"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "margin": {
        "question": "¿Qué patrón marginal predomina?",
        "hint": "Anterior: costras, collaretes; posterior: orificios de Meibomio obstruidos, secreción alterada y rosácea.",
        "choices": [
          {
            "label": "Anterior",
            "next": "anterior"
          },
          {
            "label": "Posterior / Meibomio",
            "next": "posterior"
          },
          {
            "label": "Mixto o persistente pese a higiene",
            "next": "refractory"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      }
    },
    "outcomes": {
      "critical": {
        "title": "Alarma ocular: atención urgente",
        "summary": "No atribuir amenaza visual a una enfermedad superficial o palpebral simple.",
        "actions": [
          "Activar urgencias y oftalmología; medir agudeza visual si seguro, sin demorar intervención.",
          "Exposición química aislada: irrigar inmediatamente; posible globo abierto: escudo rígido sin presión, evitar tonometría y manipulación.",
          "Dolor intenso, fotofobia, pérdida visual, proptosis, alteración de motilidad o deterioro sistémico requieren escalamiento inmediato."
        ],
        "tone": "danger"
      },
      "preseptal": {
        "title": "Posible celulitis preseptal",
        "summary": "La inflamación difusa requiere evaluación.",
        "actions": [
          "Evaluación el mismo día; urgencias si signos orbitarios o mal estado.",
          "Consultar ruta de celulitis para antibiótico sistémico, hospitalización y seguimiento."
        ],
        "tone": "danger"
      },
      "atypical_mass": {
        "title": "Lesión palpebral atípica",
        "summary": "Descartar neoplasia ante recurrencia unifocal, madarosis o ulceración.",
        "actions": [
          "Referencia prioritaria a oftalmología/oculoplástica para valoración de biopsia.",
          "Evitar repetir drenajes, antibióticos o esteroides empíricos."
        ],
        "tone": "danger"
      },
      "external": {
        "title": "Orzuelo externo localizado",
        "summary": "Inflamación aguda de folículo o glándula marginal.",
        "actions": [
          "Compresas tibias no calientes 5–10 minutos varias veces al día e higiene palpebral; no exprimir.",
          "No antibiótico sistémico rutinario; tópico solo si infección marginal asociada lo justifica.",
          "Reevaluar si no mejora en 48–72 horas o aparece fiebre, extensión, dolor ocular o alteración visual."
        ],
        "tone": "warning"
      },
      "internal": {
        "title": "Orzuelo interno / posible absceso",
        "summary": "Inflamación tarsal profunda; puede requerir tratamiento especializado.",
        "actions": [
          "Compresas tibias e higiene sin presión; valoración pronta si dolor intenso, absceso, extensión o mala evolución.",
          "Valorar antibiótico sistémico y drenaje por equipo según gravedad; gotas aisladas no sustituyen evaluación.",
          "Revisar en 24–48 horas según gravedad; escalar ante signos orbitarios."
        ],
        "tone": "warning"
      },
      "chalazion": {
        "title": "Chalazión probable",
        "summary": "Obstrucción e inflamación granulomatosa, no infección bacteriana por defecto.",
        "actions": [
          "Compresas tibias y masaje palpebral suave si no hay infección aguda; tratar blefaritis asociada.",
          "No antibióticos rutinarios. Referir si persiste varias semanas, es grande, altera visión o supone riesgo ambliogénico infantil.",
          "Recurrencia en mismo sitio, ulceración o madarosis requieren descartar malignidad."
        ],
        "tone": "warning"
      },
      "anterior": {
        "title": "Blefaritis anterior probable",
        "summary": "Inflamación marginal con costras; considerar Demodex y dermatitis.",
        "actions": [
          "Higiene palpebral suave y regular, compresas tibias; evitar cosméticos irritantes.",
          "Si persiste o infección marginal documentada, valorar tratamiento dirigido; no combinar corticoide empírico.",
          "Revisión en 2–4 semanas, antes si dolor, fotofobia o alteración visual."
        ],
        "tone": "warning"
      },
      "posterior": {
        "title": "Blefaritis posterior / MGD",
        "summary": "Disfunción lipídica de película lagrimal.",
        "actions": [
          "Compresas tibias, masaje suave, higiene palpebral y lubricación.",
          "Evaluar rosácea, medicamentos y ojo seco; tratar factores asociados.",
          "Referir si persiste o hay lesión corneal."
        ],
        "tone": "warning"
      },
      "refractory": {
        "title": "Blefaritis persistente o mixta",
        "summary": "Reevaluar etiología y lesión de superficie.",
        "actions": [
          "Revisar adherencia, Demodex, rosácea, dermatitis, irritantes y córnea.",
          "Oftalmología puede valorar doxiciclina en MGD/rosácea refractaria de pacientes elegibles; no es tratamiento universal.",
          "Escalar ante dolor, fotofobia o caída visual."
        ],
        "tone": "warning"
      },
      "uncertain": {
        "title": "Exploración insuficiente: no cerrar diagnóstico",
        "summary": "La ausencia de datos no descarta urgencia.",
        "actions": [
          "Completar agudeza visual por ojo, pupilas, superficie y factores de riesgo según seguridad. Evaluación el mismo día si no se descarta alarma.",
          "No iniciar corticoides ni antibióticos automáticamente. Escalar inmediatamente ante amenaza visual o sistémica."
        ],
        "tone": "danger"
      }
    }
  },
  {
    "id": "ojo-seco",
    "title": "Síndrome de ojo seco",
    "icon": "🏜️",
    "category": "Segmento anterior",
    "subtitle": "Pruebas de homeostasis, fenotipo evaporativo/acuodeficiente y manejo escalonado.",
    "scope": "Principalmente adultos; niños, autoinmunidad y posquirúrgicos requieren individualización.",
    "initial": "Registrar síntomas, agudeza visual, pantallas, lentes, fármacos, cirugía, cierre palpebral y antecedentes autoinmunes.",
    "sources": [
      {
        "label": "TFOS DEWS III · Diagnostic Methodology",
        "year": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40451408/"
      },
      {
        "label": "TFOS DEWS III · Management and Therapy",
        "year": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40467022/"
      },
      {
        "label": "IMSS · GPC ojo seco y pterigión; referencias históricas, vigencia no confirmada",
        "year": "2010–2011",
        "url": "https://www.imss.gob.mx/guias_practicaclinica?field_categoria_gs_value=26&page=1"
      }
    ],
    "firstContact": true,
    "urgency": "prioritaria",
    "time": "Triaje por riesgo",
    "start": "danger",
    "nodes": {
      "danger": {
        "question": "¿Dolor importante, fotofobia, pérdida visual persistente o lesión corneal?",
        "hint": "Buscar infiltrado, úlcera, pupila anormal, trauma, químico, complicación posquirúrgica o infección asociada a lentes.",
        "choices": [
          {
            "label": "Sí / sospecha presente",
            "next": "critical",
            "tone": "danger"
          },
          {
            "label": "No, evaluado de forma fiable",
            "next": "exposure"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "exposure": {
        "question": "¿Lagoftalmos, hipoestesia corneal o exposición marcada?",
        "hint": "Parálisis facial y alteración neurosensorial pueden producir daño con síntomas escasos.",
        "choices": [
          {
            "label": "Sí / sospecha",
            "next": "exposure_risk",
            "tone": "danger"
          },
          {
            "label": "No",
            "next": "symptoms"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "symptoms": {
        "question": "¿Ardor, sensación de arena o visión fluctuante compatibles?",
        "hint": "Preguntar por empeoramiento ambiental y mejoría al parpadear; cuestionario validado si disponible. Prurito dominante sugiere alergia.",
        "choices": [
          {
            "label": "Sí",
            "next": "tests"
          },
          {
            "label": "No / otro patrón",
            "next": "mimic"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "tests": {
        "question": "¿Hay evidencia de pérdida de homeostasis lagrimal?",
        "hint": "TFOS DEWS III: síntomas más al menos un signo positivo; NIBUT <10 s, osmolaridad ≥308 mOsm/L en algún ojo o diferencia >8, o tinción patológica. Para excluir, evaluar al menos dos signos. No diagnosticar por Schirmer aislado.",
        "choices": [
          {
            "label": "Sí, signo positivo y síntomas",
            "next": "phenotype"
          },
          {
            "label": "Pruebas no disponibles o no concluyentes",
            "next": "unconfirmed"
          },
          {
            "label": "Pruebas negativas suficientes / discordancia marcada",
            "next": "mimic"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "phenotype": {
        "question": "¿Predomina evaporación/MGD o déficit acuoso?",
        "hint": "Inspección del borde, calidad y expresibilidad del meibum, menisco y Schirmer cuando indicado; pueden coexistir.",
        "choices": [
          {
            "label": "Evaporativo / Meibomio",
            "next": "evaporative"
          },
          {
            "label": "Acuodeficiente o mixto",
            "next": "systemic"
          },
          {
            "label": "Subtipo no definido",
            "next": "unconfirmed"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "systemic": {
        "question": "¿Xerostomía, artralgias, autoinmunidad o sequedad intensa?",
        "hint": "Considerar Sjögren, fármacos, radiación y enfermedad de superficie; no suspender medicamentos esenciales sin tratante.",
        "choices": [
          {
            "label": "Sí / sospecha sistémica",
            "next": "systemic_dry"
          },
          {
            "label": "No",
            "next": "aqueous"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      }
    },
    "outcomes": {
      "critical": {
        "title": "Alarma ocular: atención urgente",
        "summary": "No atribuir amenaza visual a una enfermedad superficial o palpebral simple.",
        "actions": [
          "Activar urgencias y oftalmología; medir agudeza visual si seguro, sin demorar intervención.",
          "Exposición química aislada: irrigar inmediatamente; posible globo abierto: escudo rígido sin presión, evitar tonometría y manipulación.",
          "Dolor intenso, fotofobia, pérdida visual, proptosis, alteración de motilidad o deterioro sistémico requieren escalamiento inmediato."
        ],
        "tone": "danger"
      },
      "exposure_risk": {
        "title": "Riesgo de queratopatía por exposición/neurotrófica",
        "summary": "Daño corneal puede progresar con poco dolor.",
        "actions": [
          "Evaluación oftalmológica el mismo día; inmediata si defecto corneal o caída visual.",
          "Proteger superficie con lubricación apropiada bajo valoración y coordinar manejo de cierre palpebral."
        ],
        "tone": "danger"
      },
      "mimic": {
        "title": "Buscar diagnóstico alternativo",
        "summary": "Discordancia de síntomas/signos exige reconsiderar etiología.",
        "actions": [
          "Evaluar alergia, blefaritis, infección, toxicidad, erosión y dolor neuropático.",
          "No escalar antiinflamatorios empíricos; referir si persiste."
        ],
        "tone": "warning"
      },
      "unconfirmed": {
        "title": "Ojo seco sospechado, no confirmado",
        "summary": "Sin pruebas suficientes no se establece pérdida de homeostasis.",
        "actions": [
          "Pausas de pantalla, parpadeo, evitar corrientes y lágrimas artificiales si apropiado.",
          "Coordinar pruebas lagrimales y tinción; reevaluar en 2–4 semanas o antes si deterioro."
        ],
        "tone": "warning"
      },
      "evaporative": {
        "title": "Ojo seco evaporativo / MGD",
        "summary": "Priorizar componente lipídico y evaporación.",
        "actions": [
          "Pausas, parpadeo completo, ambiente húmedo, compresas tibias e higiene palpebral.",
          "Lágrimas artificiales según tolerancia, considerar formulación lipídica; sin conservantes si uso frecuente.",
          "Reevaluar en 2–4 semanas; si persiste, valorar tratamiento dirigido a Meibomio e inflamación."
        ],
        "tone": "warning"
      },
      "systemic_dry": {
        "title": "Déficit acuoso con sospecha sistémica",
        "summary": "Considerar enfermedad autoinmune o farmacológica.",
        "actions": [
          "Lubricación sin conservantes según necesidad; valorar gravedad y daño de superficie.",
          "Coordinar oftalmología y medicina interna/reumatología; no diagnosticar Sjögren por Schirmer solo.",
          "Priorizar si daño corneal; revisar medicamentos con tratante."
        ],
        "tone": "warning"
      },
      "aqueous": {
        "title": "Ojo seco acuodeficiente o mixto",
        "summary": "Tratamiento según gravedad y mecanismos.",
        "actions": [
          "Lágrimas artificiales, sin conservantes si uso frecuente; gel nocturno si indicado y medidas ambientales.",
          "Reevaluar en 2–4 semanas; si inflamación persistente, especialista puede valorar ciclosporina oftálmica u otras terapias; no esteroide empírico.",
          "Oclusión de puntos y terapias avanzadas solo tras evaluación de superficie e inflamación."
        ],
        "tone": "warning"
      },
      "uncertain": {
        "title": "Exploración insuficiente: no cerrar diagnóstico",
        "summary": "La ausencia de datos no descarta urgencia.",
        "actions": [
          "Completar agudeza visual por ojo, pupilas, superficie y factores de riesgo según seguridad. Evaluación el mismo día si no se descarta alarma.",
          "No iniciar corticoides ni antibióticos automáticamente. Escalar inmediatamente ante amenaza visual o sistémica."
        ],
        "tone": "danger"
      }
    }
  },
  {
    "id": "abrasion-corneal",
    "title": "Abrasión corneal y cuerpo extraño",
    "icon": "🩹",
    "category": "Trauma ocular",
    "subtitle": "Mecanismo, integridad del globo, fluoresceína, infección y seguimiento.",
    "scope": "Adultos y niños con trauma superficial sospechado; procedimientos solo por personal capacitado.",
    "initial": "Agudeza visual si seguro. No retirar objeto penetrante, ejercer presión ni medir PIO ante posible globo abierto; químico aislado: irrigación inmediata.",
    "sources": [
      {
        "label": "RACGP · Ophthalmic trauma in primary care",
        "year": "2026",
        "url": "https://ajgp.racgp.org.au/issues/july-2026/clinical-ophthalmic-trauma-first-line-management-in-primary-care"
      },
      {
        "label": "Merck Professional · Corneal Abrasions and Corneal Foreign Bodies",
        "year": "consulta 2026",
        "url": "https://www.merckmanuals.com/professional/injuries-poisoning/eye-trauma/corneal-abrasions-and-corneal-foreign-bodies"
      },
      {
        "label": "IMSS · GPC Oftalmología; referencias históricas, vigencia no confirmada",
        "year": "2011–2012",
        "url": "https://www.imss.gob.mx/guias_practicaclinica?field_categoria_gs_value=26"
      }
    ],
    "firstContact": true,
    "urgency": "prioritaria",
    "time": "Triaje por riesgo",
    "start": "danger",
    "nodes": {
      "danger": {
        "question": "¿Mecanismo penetrante, alta velocidad, objeto enclavado o signos de globo abierto/quemadura?",
        "hint": "Metal contra metal, herramientas de alta velocidad, pupila irregular, cámara anterior alterada o herida; Seidel negativa no excluye lesión.",
        "choices": [
          {
            "label": "Sí / sospecha presente",
            "next": "critical",
            "tone": "danger"
          },
          {
            "label": "No, evaluado de forma fiable",
            "next": "infection"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "infection": {
        "question": "¿Infiltrado, opacidad, secreción purulenta, hipopión o síntomas desproporcionados?",
        "hint": "Distinguir abrasión simple de queratitis o uveítis. Si córnea no valorable, no declarar abrasión simple.",
        "choices": [
          {
            "label": "Sí / sospecha",
            "next": "keratitis_risk",
            "tone": "danger"
          },
          {
            "label": "No, evaluado",
            "next": "contact"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "contact": {
        "question": "¿Usa lentes de contacto?",
        "hint": "Aumenta riesgo de Pseudomonas y queratitis. Retirar lentes; no reutilizar hasta curación y autorización.",
        "choices": [
          {
            "label": "Sí",
            "next": "contact_risk",
            "tone": "danger"
          },
          {
            "label": "No",
            "next": "foreign"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "foreign": {
        "question": "¿Cuerpo extraño visible o sospechado, incluso subtarsal?",
        "hint": "Con globo íntegro, eversión y fluoresceína por personal entrenado; estrías verticales pueden indicar cuerpo extraño subtarsal.",
        "choices": [
          {
            "label": "Superficial, no enclavado, bajo riesgo",
            "next": "superficial"
          },
          {
            "label": "Incrustado, profundo, central o no extraíble con seguridad",
            "next": "embedded",
            "tone": "danger"
          },
          {
            "label": "No",
            "next": "size"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "size": {
        "question": "¿Defecto epitelial simple, periférico, pequeño y visión conservada?",
        "hint": "Confirmar con fluoresceína, ausencia de infiltrado y globo íntegro; dolor al despertar sin trauma puede sugerir erosión recurrente.",
        "choices": [
          {
            "label": "Sí, simple",
            "next": "simple"
          },
          {
            "label": "Grande, central, visión alterada, recurrente o mala evolución",
            "next": "complex",
            "tone": "danger"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      }
    },
    "outcomes": {
      "critical": {
        "title": "Alarma ocular: atención urgente",
        "summary": "No atribuir amenaza visual a una enfermedad superficial o palpebral simple.",
        "actions": [
          "Activar urgencias y oftalmología; medir agudeza visual si seguro, sin demorar intervención.",
          "Exposición química aislada: irrigar inmediatamente; posible globo abierto: escudo rígido sin presión, evitar tonometría y manipulación.",
          "Dolor intenso, fotofobia, pérdida visual, proptosis, alteración de motilidad o deterioro sistémico requieren escalamiento inmediato."
        ],
        "tone": "danger"
      },
      "keratitis_risk": {
        "title": "Sospecha de queratitis/úlcera",
        "summary": "No tratar como abrasión simple.",
        "actions": [
          "Oftalmología urgente, suspender lentes; muestras si indicadas sin retrasar manejo.",
          "No parche ni corticoide tópico; seguir ruta de queratitis."
        ],
        "tone": "danger"
      },
      "contact_risk": {
        "title": "Abrasión asociada a lentes de contacto",
        "summary": "Riesgo de queratitis bacteriana.",
        "actions": [
          "Evaluación oftalmológica el mismo día; excluir infiltrado y penetración.",
          "Si abrasión sin queratitis confirmada, valorar profilaxis tópica antipseudomónica; no parche ni corticoide.",
          "Reevaluar en 24 horas o antes si empeora; evitar lentes."
        ],
        "tone": "danger"
      },
      "superficial": {
        "title": "Cuerpo extraño superficial de bajo riesgo",
        "summary": "La extracción exige globo íntegro, equipo y entrenamiento.",
        "actions": [
          "Irrigación suave si objeto libre y globo íntegro; extracción solo por personal capacitado. No manipular objeto adherido o profundo.",
          "Tras retirada, revisar visión y defecto con fluoresceína; manejar abrasión residual.",
          "Revisar en 24 horas si defecto residual o síntomas; referir si no se retira con seguridad."
        ],
        "tone": "warning"
      },
      "embedded": {
        "title": "Cuerpo extraño incrustado, central o de difícil extracción",
        "summary": "Riesgo de lesión profunda y cicatriz visual.",
        "actions": [
          "No extracción a ciegas; no retirar objeto penetrante. Escudo sin presión si posible globo abierto.",
          "Referencia el mismo día o inmediata según mecanismo, profundidad y amenaza; imagen si sospecha intraocular."
        ],
        "tone": "danger"
      },
      "simple": {
        "title": "Abrasión corneal simple probable",
        "summary": "Defecto superficial confirmado sin factores especiales.",
        "actions": [
          "Analgesia sistémica si apropiada; valorar profilaxis antibiótica tópica según mecanismo/protocolo (beneficio en simple no plenamente establecido).",
          "No parche rutinario, corticoide ni anestésico tópico domiciliario desde esta ruta; revisar profilaxis antitetánica si lesión penetrante/contaminada.",
          "Revisar en 24–48 horas si persiste; escalar ante dolor creciente, secreción, fotofobia o caída visual."
        ],
        "tone": "warning"
      },
      "complex": {
        "title": "Defecto complejo o erosión recurrente",
        "summary": "Tamaño, localización, evolución y recurrencia modifican riesgo.",
        "actions": [
          "Oftalmología el mismo día si grande/central, visión alterada o mala evolución.",
          "No parche ni corticoide; reevaluar integridad, infiltrado y tratamiento especializado."
        ],
        "tone": "danger"
      },
      "uncertain": {
        "title": "Exploración insuficiente: no cerrar diagnóstico",
        "summary": "La ausencia de datos no descarta urgencia.",
        "actions": [
          "Completar agudeza visual por ojo, pupilas, superficie y factores de riesgo según seguridad. Evaluación el mismo día si no se descarta alarma.",
          "No iniciar corticoides ni antibióticos automáticamente. Escalar inmediatamente ante amenaza visual o sistémica."
        ],
        "tone": "danger"
      }
    }
  },
  {
    "id": "hemorragia-subconjuntival",
    "title": "Hemorragia subconjuntival",
    "icon": "🟥",
    "category": "Segmento anterior",
    "subtitle": "Distinguir sangrado superficial de trauma, hifema y causas sistémicas.",
    "scope": "Adultos y niños; trauma, maltrato posible, anticoagulación y recurrencias requieren evaluación específica.",
    "initial": "Confirmar sangre bajo conjuntiva, no en cámara anterior. Medir agudeza visual, pupilas y presión arterial; preguntar por otros sangrados.",
    "sources": [
      {
        "label": "Merck Professional · Subconjunctival Hemorrhages",
        "year": "consulta 2026",
        "url": "https://www.merckmanuals.com/en-ca/professional/eye-disorders/conjunctival-and-scleral-disorders/subconjunctival-hemorrhages"
      },
      {
        "label": "NCBI Bookshelf · Subconjunctival Hemorrhage",
        "year": "2025",
        "url": "https://www.ncbi.nlm.nih.gov/books/NBK551666/"
      }
    ],
    "firstContact": true,
    "urgency": "prioritaria",
    "time": "Triaje por riesgo",
    "start": "danger",
    "nodes": {
      "danger": {
        "question": "¿Dolor, fotofobia, pérdida visual, hifema o trauma penetrante/de alto riesgo?",
        "hint": "Hemorragia bullosa de 360°, pupila irregular, cámara anterior anormal o alta energía pueden ocultar globo abierto.",
        "choices": [
          {
            "label": "Sí / sospecha presente",
            "next": "critical",
            "tone": "danger"
          },
          {
            "label": "No, evaluado de forma fiable",
            "next": "trauma"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "trauma": {
        "question": "¿Traumatismo ocular o facial, incluso aparentemente leve?",
        "hint": "Precisar mecanismo; en niños considerar seguridad y maltrato si historia discordante.",
        "choices": [
          {
            "label": "Sí",
            "next": "traumatic",
            "tone": "danger"
          },
          {
            "label": "No",
            "next": "bleeding"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "bleeding": {
        "question": "¿Recurrente, bilateral, extensa sin explicación u otros sangrados?",
        "hint": "Equimosis, epistaxis, sangrado gingival, plaquetopenia, hepatopatía o coagulopatía.",
        "choices": [
          {
            "label": "Sí",
            "next": "systemic"
          },
          {
            "label": "No",
            "next": "meds"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "meds": {
        "question": "¿Anticoagulantes/antiagregantes, hipertensión conocida o PA elevada?",
        "hint": "Medir PA; revisar indicación, interacciones e INR si warfarina. No suspender medicación automáticamente.",
        "choices": [
          {
            "label": "Sí",
            "next": "risk_review"
          },
          {
            "label": "No, PA evaluada",
            "next": "typical"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      }
    },
    "outcomes": {
      "critical": {
        "title": "Alarma ocular: atención urgente",
        "summary": "No atribuir amenaza visual a una enfermedad superficial o palpebral simple.",
        "actions": [
          "Activar urgencias y oftalmología; medir agudeza visual si seguro, sin demorar intervención.",
          "Exposición química aislada: irrigar inmediatamente; posible globo abierto: escudo rígido sin presión, evitar tonometría y manipulación.",
          "Dolor intenso, fotofobia, pérdida visual, proptosis, alteración de motilidad o deterioro sistémico requieren escalamiento inmediato."
        ],
        "tone": "danger"
      },
      "traumatic": {
        "title": "Hemorragia subconjuntival traumática",
        "summary": "No excluye lesión profunda.",
        "actions": [
          "Evaluación el mismo día según mecanismo; sospecha de globo abierto: escudo sin presión, no tonometría y referencia inmediata.",
          "Valorar hifema, abrasión, fractura y lesiones asociadas; aplicar protección infantil cuando corresponda."
        ],
        "tone": "danger"
      },
      "systemic": {
        "title": "Sangrado recurrente o trastorno sistémico posible",
        "summary": "Investigar especialmente si otros sangrados.",
        "actions": [
          "PA, hemograma/plaquetas y coagulación según historia; INR si warfarina e indicado.",
          "Coordinar atención médica/oftalmológica; urgencias ante sangrado significativo o deterioro.",
          "No cambiar anticoagulación sin tratante."
        ],
        "tone": "warning"
      },
      "risk_review": {
        "title": "Hemorragia con factores vasculares o medicamentos",
        "summary": "Revisar riesgo sin atribuir causalidad automáticamente.",
        "actions": [
          "Repetir PA correctamente; elevación marcada con síntomas de daño agudo de órgano blanco requiere urgencias.",
          "Revisar indicación, interacciones y adherencia; no suspender ni revertir anticoagulación por hemorragia superficial aislada sin indicación.",
          "Seguimiento de PA y evolución; escalar si nuevos sangrados o síntomas visuales."
        ],
        "tone": "warning"
      },
      "typical": {
        "title": "Hemorragia subconjuntival aislada probable",
        "summary": "Mancha roja delimitada, indolora y visión conservada.",
        "actions": [
          "Explicar reabsorción habitual en 1–2 semanas, a veces más; lágrimas artificiales si irritación.",
          "Medir PA y documentar; preguntar por Valsalva, tos y frotamiento.",
          "No antibiótico ni vasoconstrictor rutinario; revalorar si no disminuye, recurre o aparece dolor, fotofobia o visión reducida."
        ],
        "tone": "warning"
      },
      "uncertain": {
        "title": "Exploración insuficiente: no cerrar diagnóstico",
        "summary": "La ausencia de datos no descarta urgencia.",
        "actions": [
          "Completar agudeza visual por ojo, pupilas, superficie y factores de riesgo según seguridad. Evaluación el mismo día si no se descarta alarma.",
          "No iniciar corticoides ni antibióticos automáticamente. Escalar inmediatamente ante amenaza visual o sistémica."
        ],
        "tone": "danger"
      }
    }
  },
  {
    "id": "dacriocistitis-obstruccion-lagrimal",
    "title": "Dacriocistitis y obstrucción lagrimal",
    "icon": "🫧",
    "category": "Párpados y vía lagrimal",
    "subtitle": "Epífora, secreción, infección del saco, obstrucción congénita y complicaciones.",
    "scope": "Adultos y niños; lactantes con infección o dacriocistocele requieren evaluación especializada.",
    "initial": "Localizar edema respecto al canto medial y puntos lagrimales; medir visión, temperatura y motilidad. No sondar, irrigar o masajear saco infectado.",
    "sources": [
      {
        "label": "Merck Professional · Dacryocystitis",
        "year": "2026",
        "url": "https://www.merckmanuals.com/en-ca/professional/eye-disorders/eyelid-and-lacrimal-disorders/dacryocystitis"
      },
      {
        "label": "AAPOS · Nasolacrimal Duct Obstruction",
        "year": "consulta 2026",
        "url": "https://www.aapos.org/glossary/nasolacrimal-duct-obstruction"
      }
    ],
    "firstContact": true,
    "urgency": "prioritaria",
    "time": "Triaje por riesgo",
    "start": "danger",
    "nodes": {
      "danger": {
        "question": "¿Fiebre con mal estado, proptosis, alteración visual, dolor con motilidad o compromiso respiratorio?",
        "hint": "Considerar extensión orbitaria, absceso, sepsis o dacriocistocele con obstrucción nasal en lactante.",
        "choices": [
          {
            "label": "Sí / sospecha presente",
            "next": "critical",
            "tone": "danger"
          },
          {
            "label": "No, evaluado de forma fiable",
            "next": "acute"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "acute": {
        "question": "¿Dolor, eritema y tumefacción sobre saco lagrimal inferomedial?",
        "hint": "Epífora y secreción apoyan dacriocistitis; distinguir de orzuelo, canaliculitis y celulitis.",
        "choices": [
          {
            "label": "Sí, infección aguda sospechada",
            "next": "age"
          },
          {
            "label": "No, epífora/secreción sin inflamación aguda",
            "next": "infant"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "age": {
        "question": "¿Neonato/lactante, inmunosupresión, absceso o infección extensa?",
        "hint": "Edad y extensión determinan hospitalización y drenaje; no masaje del saco infectado.",
        "choices": [
          {
            "label": "Sí / alto riesgo",
            "next": "acute_high",
            "tone": "danger"
          },
          {
            "label": "No, adulto estable con infección localizada",
            "next": "acute_adult"
          },
          {
            "label": "Niño mayor u otra situación no incluida",
            "next": "acute_high",
            "tone": "danger"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "infant": {
        "question": "¿Lactante con epífora/secreción desde primeras semanas, sin dolor ni eritema del saco?",
        "hint": "Descartar glaucoma congénito (fotofobia, blefaroespasmo, córnea aumentada/opaca), conjuntivitis neonatal y dacriocistocele.",
        "choices": [
          {
            "label": "Sí, obstrucción congénita simple compatible",
            "next": "congenital"
          },
          {
            "label": "Lactante con signos atípicos o masa azulada",
            "next": "infant_atypical",
            "tone": "danger"
          },
          {
            "label": "No, paciente mayor",
            "next": "chronic"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "chronic": {
        "question": "¿Epífora persistente con secreción recurrente o inflamación del punto lagrimal?",
        "hint": "Concreciones y punto inflamado sugieren canaliculitis; revisar malposición, ojo seco y causas nasales.",
        "choices": [
          {
            "label": "Sangre, masa firme o unilateralidad atípica",
            "next": "mass",
            "tone": "danger"
          },
          {
            "label": "Punto inflamado / sospecha canaliculitis",
            "next": "canaliculitis"
          },
          {
            "label": "Epífora crónica compatible con obstrucción",
            "next": "chronic_obstruction"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      }
    },
    "outcomes": {
      "critical": {
        "title": "Alarma ocular: atención urgente",
        "summary": "No atribuir amenaza visual a una enfermedad superficial o palpebral simple.",
        "actions": [
          "Activar urgencias y oftalmología; medir agudeza visual si seguro, sin demorar intervención.",
          "Exposición química aislada: irrigar inmediatamente; posible globo abierto: escudo rígido sin presión, evitar tonometría y manipulación.",
          "Dolor intenso, fotofobia, pérdida visual, proptosis, alteración de motilidad o deterioro sistémico requieren escalamiento inmediato."
        ],
        "tone": "danger"
      },
      "acute_high": {
        "title": "Dacriocistitis aguda de alto riesgo o edad pediátrica",
        "summary": "Riesgo de absceso, extensión o infección sistémica.",
        "actions": [
          "Evaluación hospitalaria urgente según riesgo y edad; oftalmología y pediatría si procede; valorar antibiótico sistémico IV, cultivos, imagen y drenaje.",
          "No sondar, irrigar ni masajear el saco inflamado; gotas solas insuficientes."
        ],
        "tone": "danger"
      },
      "acute_adult": {
        "title": "Dacriocistitis localizada en adulto estable",
        "summary": "Infección que requiere valoración sistémica y vigilancia.",
        "actions": [
          "Evaluar el mismo día; antibiótico sistémico según alergias, función renal, gravedad, flora y protocolo.",
          "Compresas tibias sin presión; no masaje, sondaje ni irrigación durante infección.",
          "Revisar en 24–48 horas o antes si empeora; referencia para tratamiento definitivo de obstrucción tras controlar infección."
        ],
        "tone": "warning"
      },
      "congenital": {
        "title": "Obstrucción nasolagrimal congénita probable",
        "summary": "Muchos casos simples mejoran durante el primer año.",
        "actions": [
          "Higiene de secreciones; masaje lagrimal solo tras confirmar obstrucción no infectada y enseñanza por profesional.",
          "Antibiótico tópico solo si secreción significativa y clínico lo indica; no abre el conducto.",
          "Seguimiento pediátrico/oftalmológico; valorar sondaje si persiste alrededor de 12 meses o antes por complicaciones. Fiebre, edema medial, fotofobia o córnea opaca: urgencia."
        ],
        "tone": "warning"
      },
      "infant_atypical": {
        "title": "Lactante con signos atípicos",
        "summary": "Descartar glaucoma congénito, dacriocistocele u otras causas.",
        "actions": [
          "Valoración pediátrica/oftalmológica pronta; urgente ante fotofobia marcada, córnea opaca, fiebre, edema doloroso o dificultad respiratoria.",
          "No asumir obstrucción simple ni masajear masa inflamada."
        ],
        "tone": "danger"
      },
      "mass": {
        "title": "Epífora con masa o sangre",
        "summary": "Descartar lesión de vía lagrimal, incluida neoplasia.",
        "actions": [
          "Referencia prioritaria para examen especializado e imagen si indicada.",
          "No repetir antibióticos ni sondaje empírico ante masa no caracterizada."
        ],
        "tone": "danger"
      },
      "canaliculitis": {
        "title": "Sospecha de canaliculitis",
        "summary": "Puede simular conjuntivitis recurrente.",
        "actions": [
          "Evaluar punto, concreciones y secreción; referir para cultivo y tratamiento dirigido.",
          "Puede requerir retirada de concreciones; gotas aisladas pueden no resolver el foco."
        ],
        "tone": "warning"
      },
      "chronic_obstruction": {
        "title": "Epífora crónica / obstrucción adquirida probable",
        "summary": "Confirmar nivel de obstrucción y excluir hipersecreción.",
        "actions": [
          "Evaluar superficie, párpado y antecedentes nasales; pruebas de vía lagrimal por especialista cuando no haya infección aguda.",
          "Sin antibióticos rutinarios; posible dacriocistorrinostomía según evaluación.",
          "Escalar ante dolor medial, fiebre o edema progresivo."
        ],
        "tone": "warning"
      },
      "uncertain": {
        "title": "Exploración insuficiente: no cerrar diagnóstico",
        "summary": "La ausencia de datos no descarta urgencia.",
        "actions": [
          "Completar agudeza visual por ojo, pupilas, superficie y factores de riesgo según seguridad. Evaluación el mismo día si no se descarta alarma.",
          "No iniciar corticoides ni antibióticos automáticamente. Escalar inmediatamente ante amenaza visual o sistémica."
        ],
        "tone": "danger"
      }
    }
  },
  {
    "id": "pterigion-pinguecula",
    "title": "Pterigión y pingüécula",
    "icon": "☀️",
    "category": "Segmento anterior",
    "subtitle": "Lesión conjuntival, invasión corneal, inflamación y criterios de intervención.",
    "scope": "Adultos principalmente; lesiones atípicas, niños, recurrencia y alteración visual requieren evaluación.",
    "initial": "Agudeza visual, localización, extensión corneal en mm si seguro, crecimiento, exposición UV y antecedentes quirúrgicos.",
    "sources": [
      {
        "label": "AAO · Pinguecula and Pterygium",
        "year": "2026",
        "url": "https://www.aao.org/eye-health/diseases/pinguecula-pterygium"
      },
      {
        "label": "IMSS · GPC ojo seco y pterigión; referencias históricas, vigencia no confirmada",
        "year": "2010–2011",
        "url": "https://www.imss.gob.mx/guias_practicaclinica?field_categoria_gs_value=26&page=1"
      }
    ],
    "firstContact": true,
    "urgency": "prioritaria",
    "time": "Triaje por riesgo",
    "start": "danger",
    "nodes": {
      "danger": {
        "question": "¿Dolor importante, fotofobia, disminución visual aguda o defecto/infiltrado corneal?",
        "hint": "No atribuir a pingüécula simple; considerar queratitis, uveítis y otras causas.",
        "choices": [
          {
            "label": "Sí / sospecha presente",
            "next": "critical",
            "tone": "danger"
          },
          {
            "label": "No, evaluado de forma fiable",
            "next": "atypical"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "atypical": {
        "question": "¿Lesión irregular, leucoplasia, vaso nutricio prominente, crecimiento rápido o pigmentación atípica?",
        "hint": "Considerar neoplasia escamosa de superficie ocular u otra lesión.",
        "choices": [
          {
            "label": "Sí / sospecha",
            "next": "atypical_lesion",
            "tone": "danger"
          },
          {
            "label": "No, aspecto típico",
            "next": "extension"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "extension": {
        "question": "¿Tejido fibrovascular cruza limbo e invade córnea?",
        "hint": "Pingüécula: lesión amarillenta conjuntival sin invasión. Pterigión: triangular fibrovascular cruza limbo. Considerar pseudopterigión tras trauma/inflamación.",
        "choices": [
          {
            "label": "No, lesión conjuntival típica",
            "next": "pinguecula"
          },
          {
            "label": "Sí, extensión corneal típica",
            "next": "progression"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "progression": {
        "question": "¿Progresión, astigmatismo inducido, amenaza al eje visual o recurrencia?",
        "hint": "Documentar extensión, refracción/queratometría, motilidad y cambios seriados; cirugía no depende solo de milímetros.",
        "choices": [
          {
            "label": "Sí / afectación funcional",
            "next": "surgical"
          },
          {
            "label": "No, estable",
            "next": "symptoms"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      },
      "symptoms": {
        "question": "¿Inflamación o irritación persistente pese a lubricación y protección UV?",
        "hint": "Evaluar ojo seco, blefaritis y conjuntivitis asociada; buscar lesión corneal.",
        "choices": [
          {
            "label": "Sí",
            "next": "inflamed"
          },
          {
            "label": "No, leve o asintomático",
            "next": "stable"
          },
          {
            "label": "No puedo determinarlo / datos insuficientes",
            "next": "uncertain",
            "tone": "danger"
          }
        ]
      }
    },
    "outcomes": {
      "critical": {
        "title": "Alarma ocular: atención urgente",
        "summary": "No atribuir amenaza visual a una enfermedad superficial o palpebral simple.",
        "actions": [
          "Activar urgencias y oftalmología; medir agudeza visual si seguro, sin demorar intervención.",
          "Exposición química aislada: irrigar inmediatamente; posible globo abierto: escudo rígido sin presión, evitar tonometría y manipulación.",
          "Dolor intenso, fotofobia, pérdida visual, proptosis, alteración de motilidad o deterioro sistémico requieren escalamiento inmediato."
        ],
        "tone": "danger"
      },
      "atypical_lesion": {
        "title": "Lesión de superficie atípica",
        "summary": "Descartar neoplasia o lesión diferente.",
        "actions": [
          "Referencia prioritaria a córnea/superficie para evaluación y posible biopsia.",
          "No corticoide empírico ni resección no planificada."
        ],
        "tone": "danger"
      },
      "pinguecula": {
        "title": "Pingüécula probable",
        "summary": "Lesión sin invasión corneal, generalmente benigna.",
        "actions": [
          "Protección UV, evitar polvo/viento y lubricación si irritación.",
          "No antibiótico rutinario; revisar si cambia tamaño/aspecto, inflamación persistente o alteración visual."
        ],
        "tone": "warning"
      },
      "surgical": {
        "title": "Pterigión con posible indicación quirúrgica",
        "summary": "Progresión, alteración funcional y recurrencia requieren valoración.",
        "actions": [
          "Referir para refracción, queratometría/topografía y evaluación del eje visual; documentar progresión.",
          "Individualizar cirugía y explicar posibilidad de recurrencia.",
          "Protección UV y lubricación mientras se coordina referencia; escalar ante dolor o caída visual aguda."
        ],
        "tone": "warning"
      },
      "inflamed": {
        "title": "Pterigión sintomático persistente",
        "summary": "Revisar inflamación y enfermedad de superficie concomitante.",
        "actions": [
          "Lubricación, protección UV, evitar irritantes; tratar ojo seco/blefaritis.",
          "Oftalmología puede valorar antiinflamatorio tópico de corta duración si indicado, con monitorización de PIO y córnea; no esteroides empíricos.",
          "Revisar en 2–4 semanas; valorar cirugía si limitación persistente."
        ],
        "tone": "warning"
      },
      "stable": {
        "title": "Pterigión estable no amenazante",
        "summary": "Manejo conservador y vigilancia objetiva.",
        "actions": [
          "Protección UV y lubricación según síntomas.",
          "Documentar extensión y visión; revisión según riesgo, antes si crecimiento, astigmatismo o cambio visual.",
          "No antibiótico ni cirugía rutinaria solo por presencia de lesión."
        ],
        "tone": "warning"
      },
      "uncertain": {
        "title": "Exploración insuficiente: no cerrar diagnóstico",
        "summary": "La ausencia de datos no descarta urgencia.",
        "actions": [
          "Completar agudeza visual por ojo, pupilas, superficie y factores de riesgo según seguridad. Evaluación el mismo día si no se descarta alarma.",
          "No iniciar corticoides ni antibióticos automáticamente. Escalar inmediatamente ante amenaza visual o sistémica."
        ],
        "tone": "danger"
      }
    }
  }
];})(typeof window!=='undefined'?window:globalThis);
