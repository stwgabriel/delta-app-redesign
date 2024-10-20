export const medicines_anticoagulant_template = [
  {
    text: "Marevan (warfarina)",
    should_collect_inr: true,
    dbname: "anticoagulant_marevan",
    dbname_timestamp: "anticoagulant_marevan_taken_at",
  },
  {
    text: "Rivaroxabana (xarelto)",
    dbname: "anticoagulant_rivaroxabana",
    dbname_timestamp: "anticoagulant_rivaroxabana_taken_at",
  },
  {
    text: "Apixabana",
    dbname: "anticoagulant_apixabana",
    dbname_timestamp: "anticoagulant_apixabana_taken_at",
  },
  {
    text: "Dabigatrana",
    dbname: "anticoagulant_dabigatrana",
    dbname_timestamp: "anticoagulant_dabigatrana_taken_at",
  },
  {
    text: "Foundaparinux",
    dbname: "anticoagulant_foundaparinux",
    dbname_timestamp: "anticoagulant_foundaparinux_taken_at",
  },
  {
    text: "Heparina não fracionada plena",
    dbname: "anticoagulant_full_unfractionated_heparin",
    dbname_timestamp: "anticoagulant_full_unfractionated_heparin_taken_at",
  },
  {
    text: "Heparina de baixo peso molecular plena",
    dbname: "anticoagulant_full_low_molecular_weight_heparin",
    dbname_timestamp:
      "anticoagulant_full_low_molecular_weight_heparin_taken_at",
  },
  {
    text: "Outros",
    text_input: true,
    dbname: "anticoagulant_others",
    dbname_timestamp: "anticoagulant_others_taken_at",
  },
];

export const comorbidities_template = [
  { text: "Hipertensao arterial", dbname: "comorbidity_arterial_hypertension" },
  { text: "Diabetes melitus", dbname: "comorbidity_diabetes_mellitus" },
  { text: "Dislipidemia", dbname: "comorbidity_dyslipidemia" },
  {
    text: "Doenca renal crônica",
    dbname: "comorbidity_chronic_kidney_disease",
  },
  { text: "Tabagismo", dbname: "comorbidity_smoking" },
  { text: "Epilepsia", dbname: "comorbidity_epilepsy" },
  {
    text: "Transtorno psiquiátrico",
    dbname: "comorbidity_psychiatric_disorder",
  },
  { text: "Drogadição", dbname: "comorbidity_drug_addiction" },
];

export const rankin = [
  { number: 0, text: "Assintomático", help: "Regressão dos sintomas" },
  {
    number: 1,
    text: "Sintomas sem incapacidade",
    help: "Capaz de realizar suas tarefas e atividades habituaveis prévias",
  },
  {
    number: 2,
    text: "Incapacidade leve",
    help: "Incapaz de realizar todas suas atividades habituais prévias, mas capaz de realizar suas necessidades pessoais sem ajuda",
  },
  {
    number: 3,
    text: "Incapacidade moderada",
    help: "Requer alguma ajuda para as suas atividades, mas é capaz de andar sem ajuda de outra pessoa",
  },
  {
    number: 4,
    text: "Incapacidade moderada a grave",
    help: "Incapacidade de andar sem ajuda, incapacidade de realizar suas atividades sem ajuda",
  },
  {
    number: 5,
    text: "Incapacidade grave",
    help: "limitado a cama, incontinência, requer cuidados de enfermeiros e atenção constante",
  },
  { number: 6, text: "Óbito", help: "" },
];

export const absolute_contraindication_template = [
  {
    text: "O paciente sofreu traumatismo cranioencefálico grave nos últimos 3 meses?",
    dbname: "ac_severe_head_trauma_last_3_months",
  },
  {
    text: "O paciente tem qualquer relato de sangramento intracraniano ou meníngeo?",
    dbname: "ac_intracranial_or_meningeal_bleeding",
  },
  {
    text: "O paciente possui história de sangramento intestinal ativo no momento?",
    dbname: "ac_active_intestinal_bleeding",
  },
  {
    text: "O paciente possui história de febre, petéquias, infecção de corrente sanguínea ou lesão valvar prévia?",
    dbname: "ac_fever_petechiae_blood_infection_valve_damage",
  },
  {
    text: "O paciente possui história de Neurocirurgia nos últimos 3 meses?",
    dbname: "ac_neurosurgery_last_3_months",
  },
  {
    text: "O paciente possui história de AVC isquêmico nos últimos 3 meses?",
    dbname: "ac_ischemic_stroke_last_3_months",
  },
  {
    text: "O paciente possui neoplasia?",
    dbname: "ac_neoplasia",
    case_yes: [
      {
        text: "Qual sistema?",
        dbname: "ac_neoplasia_system",
        options: [
          {
            text: "Cérebro",
          },
          {
            text: "Pulmão",
          },
          {
            text: "Fígado",
          },
          {
            text: "Outro",
            text_input: true,
          },
        ],
      },
      {
        text: "Em tratamento?",
        dbname: "ac_neoplasia_treatment",
        options: [
          {
            text: "Sim",
          },
          {
            text: "Não",
          },
          {
            text: "Não sei",
          },
        ],
      },
    ],
  },
];

export const nih_template = [
  {
    text: "1A: Nível de Consciência",
    questions: [
      {
        text: "Alerta",
        pts: 0,
      },
      {
        text: "Sonolento, desperta com pequenos estímulos",
        pts: 1,
      },
      {
        text: "Estuporoso, desperta com estímulos fortes (repetido ou doloroso)",
        pts: 2,
      },
      {
        text: "Comatoso, apenas respostas reflexas motoras ou esterotipadas ou sem qualquer tipo de resposta",
        pts: 3,
      },
    ],
  },
  {
    text: "1B: Orientação (pergunte mês e idade)",
    questions: [
      {
        text: "Ambas corretas",
        pts: 0,
      },
      {
        text: "Uma resposta correta",
        pts: 1,
      },
      {
        text: "Nenhuma resposta correta",
        pts: 2,
      },
    ],
  },
  {
    text: "1C: Comandos (piscar os olhos e apertar a mão)",
    questions: [
      {
        text: "Obedece às duas ordens",
        pts: 0,
      },
      {
        text: "Obedece a uma ordem",
        pts: 1,
      },
      {
        text: "Ambas incorretas",
        pts: 2,
      },
    ],
  },
  {
    text: "2: Olhar (apenas avalie o olhar horizontal)",
    questions: [
      {
        text: "Normal",
        pts: 0,
      },
      {
        text: "Paralisia parcial do olhar conjugado",
        pts: 1,
      },
      {
        text: "Desvio forçado ou paralisia total do olhar conjugado",
        pts: 2,
      },
    ],
  },
  {
    text: "3: Campos Visuais",
    questions: [
      {
        text: "Sem déficts",
        pts: 0,
      },
      {
        text: "Hemianopsia parcial",
        pts: 1,
      },
      {
        text: "Hemianopsia completa",
        pts: 2,
      },
      {
        text: "Hemianopsia bilateral (cego, incluindo cegueira cortical)",
        pts: 3,
      },
    ],
  },
  {
    text: "4: Paralisia Facial",
    questions: [
      {
        text: "Movimentos simétricos e normais",
        pts: 0,
      },
      {
        text: "Paresia mínima (apagamento da prega nasolabial, assimetria no sorriso)",
        pts: 1,
      },
      {
        text: "Paralisia facial central evidente (paralisia facial inferior ou quase total)",
        pts: 2,
      },
      {
        text: "Paralisia facial completa (ausência de movimentos faciais das regições superior e inferior de um lado da face)",
        pts: 3,
      },
    ],
  },
  {
    text: "5A: Força Muscular MSE (contar em voz alta e usar os dedos para mostrar ao paciente sua contagem)",
    questions: [
      {
        text: "Sem queda; mantém o braço a 90° (ou 45°) por 10 segundos",
        pts: 0,
      },
      {
        text: "Queda; mnatém o braço a 90° (ou 45°) porém este apresenta queda antes dos 10 segundos completos; não toca a cama ou outro suporte",
        pts: 1,
      },
      {
        text: "Algum esforço contra a gravidade; o braço não atinge ou não mantém 90° (ou 45°), cai na cama, mas tem alguma força contra a gravidade.",
        pts: 2,
      },
      {
        text: "Nenhum esforço contra a gravidade; braço despenca",
        pts: 3,
      },
      {
        text: "Nenhum movimento",
        pts: 4,
      },
      {
        text: "NT - Amputação ou fusão articular",
        text_input: true,
        pts: 0,
      },
    ],
  },
  {
    text: "5B: Força Muscular MSD (contar em voz alta e usar os dedos para mostrar ao paciente sua contagem)",
    questions: [
      {
        text: "Sem queda; mantém o braço a 90° (ou 45°) por 10 segundos",
        pts: 0,
      },
      {
        text: "Queda; mnatém o braço a 90° (ou 45°) porém este apresenta queda antes dos 10 segundos completos; não toca a cama ou outro suporte",
        pts: 1,
      },
      {
        text: "Algum esforço contra a gravidade; o braço não atinge ou não mantém 90° (ou 45°), cai na cama, mas tem alguma força contra a gravidade.",
        pts: 2,
      },
      {
        text: "Nenhum esforço contra a gravidade; braço despenca",
        pts: 3,
      },
      {
        text: "Nenhum movimento",
        pts: 4,
      },
      {
        text: "NT = Amputação ou fusão articular, explique:",
        text_input: true,
        pts: 0,
      },
    ],
  },
  {
    text: "6A: Força Muscular MIE (contar em voz alta e usar os dedos para mostrar ao paciente sua contagem)",
    questions: [
      {
        text: "Sem queda; mantém a perna a 30° por um período de 5 segundos",
        pts: 0,
      },
      {
        text: "Membro cai em < 5 seg",
        pts: 1,
      },
      {
        text: "Vence gravidade",
        pts: 2,
      },
      {
        text: "Não vence gravidade",
        pts: 3,
      },
      {
        text: "Sem movimento",
        pts: 4,
      },
      {
        text: "Impossível avaliar",
        pts: 0,
      },
    ],
  },
  {
    text: "6B: Força Muscular MID (contar em voz alta e usar os dedos para mostrar ao paciente sua contagem)",
    questions: [
      {
        text: "Sem queda; mantém a perna a 30° por um período de 5 segundos",
        pts: 0,
      },
      {
        text: "Membro cai em < 5 seg",
        pts: 1,
      },
      {
        text: "Vence gravidade",
        pts: 2,
      },
      {
        text: "Não vence gravidade",
        pts: 3,
      },
      {
        text: "Sem movimento",
        pts: 4,
      },
      {
        text: "Impossível avaliar",
        pts: 0,
      },
    ],
  },
  {
    text: "7: Ataxia dos Membros",
    questions: [
      {
        text: "Sem ataxia",
        pts: 0,
      },
      {
        text: "Em um membro",
        pts: 1,
      },
      {
        text: "Em dois membros",
        pts: 2,
      },
    ],
  },
  {
    text: "8: Sensibilidade",
    questions: [
      {
        text: "Normal",
        pts: 0,
      },
      {
        text: "Déficit sutil",
        pts: 1,
      },
      {
        text: "Déficit evidente",
        pts: 2,
      },
    ],
  },
  {
    text: "9: Linguagem",
    questions: [
      {
        text: "Sem afasia; normal.",
        pts: 0,
      },
      {
        text: "Afasia leve a moderada; alguma perda da fluência ou compreensão, sem limitação significativa das idéias",
        pts: 1,
      },
      {
        text: "Afasia grave; expressões fragmentadas; grande necessidade de interferência, e adivinhação por parte do ouvinte.",
        pts: 2,
      },
      {
        text: "Mudo, afasia global; nenhuma fala útil ou compreensão auditiva.",
        pts: 3,
      },
    ],
  },
  {
    text: "10: Disartria (leia palavras)",
    questions: [
      {
        text: "Articulação normal",
        pts: 0,
      },
      {
        text: "Disartria leve",
        pts: 1,
      },
      {
        text: "Palavras incompreensíveis",
        pts: 2,
      },
      {
        text: "Impossível avaliar",
        pts: 0,
      },
    ],
  },
  {
    text: "11: Desatenção",
    questions: [
      {
        text: "Normal",
        pts: 0,
      },
      {
        text: "Desatenção visual, tátil, auditiva, espacial ou pessoal",
        pts: 1,
      },
      {
        text: "Profunda hemidesatenção ou hemidesatenção para mais de uma modalidade",
        pts: 2,
      },
    ],
  },
];
