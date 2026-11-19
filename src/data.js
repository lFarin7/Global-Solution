
export const ALERTS = [
  { id: 1, category: "Alagamento", title: "Exemplo: chuva forte", text: "Aviso de demonstração. Configure os alertas oficiais para ver dados reais da sua região.", when: "demonstração" },
  { id: 2, category: "Calor", title: "Exemplo: onda de calor", text: "Aviso de demonstração. Beba água e evite o sol entre 10h e 16h.", when: "demonstração" },
];


export const REPORT_TYPES = ["Alagamento", "Deslizamento", "Calor extremo", "Queda de árvore", "Sem energia", "Outro"];

export const GUIDES = [
  { id: "alagamento", title: "Alagamento e enchente", tips: [
    "Nunca atravesse ruas alagadas, a pé ou de carro. Pouca água já pode derrubar uma pessoa ou arrastar um veículo.",
    "Se a água entrar em casa, desligue a energia e o gás antes de sair.",
    "Vá para um lugar alto e evite tocar em fios, postes e grades metálicas.",
    "Peça ajuda à Defesa Civil (199) ou aos Bombeiros (193)."] },

  { id: "deslizamento", title: "Deslizamento de terra", tips: [
    "Sinais de risco: rachaduras no chão ou nas paredes, árvores e postes inclinados, barulho de terra se movendo.",
    "Se notar esses sinais, saia da área e vá para um local seguro, mesmo que a chuva seja fraca.",
    "Avise os vizinhos e ligue para a Defesa Civil (199)."] },
    
  { id: "calor", title: "Calor extremo", tips: [
    "Beba água mesmo sem sede e evite o sol entre 10h e 16h.",
    "Dê atenção especial a crianças, idosos e animais. Nunca deixe ninguém dentro de um carro fechado.",
    "Sinais de insolação: pele quente e seca, confusão, desmaio. Ligue para o SAMU (192)."] },
  { id: "tempestade", title: "Tempestade e ventos fortes", tips: [
    "Fique dentro de construções firmes, longe de janelas.",
    "Não se abrigue debaixo de árvores nem perto de postes.",
    "Durante raios, evite usar aparelhos ligados na tomada."] },
];

export const CONTACTS = [
  { number: "199", name: "Defesa Civil", text: "Enchentes, deslizamentos" },
  { number: "193", name: "Bombeiros", text: "Resgate e incêndio" },
  { number: "192", name: "SAMU", text: "Emergência médica" },
  { number: "190", name: "Polícia Militar", text: "Segurança" },
];
