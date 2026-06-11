export interface CnaeActivity {
  codigo: string;
  descricao: string;
  zonasPermitidas: string[];
}

export const cnaeActivities: CnaeActivity[] = [
  {
    codigo: "4711-3/01",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC"],
  },
  {
    codigo: "4712-1/00",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOR-1", "ZOR-2"],
  },
  {
    codigo: "5611-2/01",
    descricao: "Restaurantes e similares",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOR-1", "ZOT"],
  },
  {
    codigo: "5611-2/02",
    descricao: "Bares e outros estabelecimentos especializados em servir bebidas",
    zonasPermitidas: ["ZOM-2", "ZOC", "ZOT"],
  },
  {
    codigo: "8511-2/00",
    descricao: "Educação infantil - creche",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOR-1", "ZOR-2", "ZOC"],
  },
  {
    codigo: "8512-1/00",
    descricao: "Educação infantil - pré-escola",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOR-1", "ZOR-2", "ZOC"],
  },
  {
    codigo: "8630-5/01",
    descricao: "Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC"],
  },
  {
    codigo: "8630-5/02",
    descricao: "Atividade médica ambulatorial com recursos para realização de exames complementares",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOR-1"],
  },
  {
    codigo: "4520-0/01",
    descricao: "Serviços de manutenção e reparação mecânica de veículos automotores",
    zonasPermitidas: ["ZOM-2", "ZOI", "ZOC"],
  },
  {
    codigo: "4520-0/02",
    descricao: "Serviços de lanternagem ou funilaria e pintura de veículos automotores",
    zonasPermitidas: ["ZOI"],
  },
  {
    codigo: "6201-5/01",
    descricao: "Desenvolvimento de programas de computador sob encomenda",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOR-1", "ZOR-2", "ZOT", "ZOI"],
  },
  {
    codigo: "6311-9/00",
    descricao: "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOI"],
  },
  {
    codigo: "5510-8/01",
    descricao: "Hotéis",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOT", "ZOC"],
  },
  {
    codigo: "5590-6/01",
    descricao: "Albergues, exceto assistenciais",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOT"],
  },
  {
    codigo: "9312-3/00",
    descricao: "Clubes sociais, esportivos e similares",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOR-1", "ZOR-2"],
  },
  {
    codigo: "4930-2/01",
    descricao: "Transporte rodoviário de carga, exceto produtos perigosos e mudanças, municipal",
    zonasPermitidas: ["ZOI"],
  },
  {
    codigo: "1011-2/01",
    descricao: "Frigorífico - abate de bovinos",
    zonasPermitidas: ["ZOI"],
  },
  {
    codigo: "4781-4/00",
    descricao: "Comércio varejista de artigos do vestuário e acessórios",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOR-1", "ZOT"],
  },
  {
    codigo: "4763-6/01",
    descricao: "Comércio varejista de brinquedos e artigos recreativos",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOR-1"],
  },
  {
    codigo: "9329-8/99",
    descricao: "Outras atividades de recreação e lazer não especificadas anteriormente",
    zonasPermitidas: ["ZOM-1", "ZOM-2", "ZOC", "ZOT", "ZOR-1"],
  },
];
