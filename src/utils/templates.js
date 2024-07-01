export const medicines_template = [
  { text: "Varfarina" },
  { text: "Rivaroxabana" },
  { text: "Apixabana" },
  { text: "Dabigatrana" },
  { text: "Foundaparinux" },
  { text: "⁠Heparina não fracionada plena" },
  { text: "⁠Heparina de baixo peso molecular plena" },
];

export const comorbidities_template = [
  { text: "Hipertensao arterial" },
  { text: "Diabetes melitus" },
  { text: "Dislipidemia" },
  { text: "Doenca renal crônica" },
  { text: "Tabagismo" },
];

export const absolute_contraindication_template = [
  {
    text: "O paciente sofreu traumatismo cranioencefálico grave  ( ver critérios de gravidade)  nos últimos 3 meses?",
  },
  {
    text: "O paciente tem qualquer relato de sangramento intracraniano ou meníngeo?",
  },
  {
    text: "O paciente possui história de sangramento intestinal ativo no momento?",
  },
  {
    text: "O paciente possui história de febre, petéquias, infecção de corrente sanguínea ou lesão valvar prévia?",
  },
  { text: "O paciente possui história de Neurocirurgia nos últimos 3 meses?" },
  { text: "O paciente possui história de AVC isquêmico nos últimos 3 meses?" },
  {
    text: "O paciente possui neoplasia? ( sim abrirá outro fluxo, pode ser absoluta ou relativa a contraindicação)",
  },
  {
    text: "O paciente fez uso de qualquer agente ANTICOAGULANTE recentemente (com exceção do Marevan/Varfarina)? Questionar os familiares utilizando o nome das medicações mais utilizadas ( se sim , abrirá outro fluxograma destrinchando qual e o que fazer em cada situação - engloba itens 5, 6, 7)",
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
        text: "Sem queda; mantém o braço a 90° (ou 45°) por um período de 10 segundos",
        pts: 0,
      },
      {
        text: "Membro cai em < 10 seg",
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
    text: "5B: Força Muscular MSD (contar em voz alta e usar os dedos para mostrar ao paciente sua contagem)",
    questions: [
      {
        text: "Sem queda; mantém o braço a 90° (ou 45°) por um período de 10 segundos",
        pts: 0,
      },
      {
        text: "Membro cai em < 10 seg",
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
        text: "Sem afasia",
        pts: 0,
      },
      {
        text: "Afasia leve a moderada",
        pts: 1,
      },
      {
        text: "Afasia grave",
        pts: 2,
      },
      {
        text: "Mutismo",
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
