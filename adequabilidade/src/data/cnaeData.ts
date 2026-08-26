export interface CnaeActivity {
  codigo: string;
  descricao: string;
  zonasPermitidas: string[];
}

export const cnaeActivities: CnaeActivity[] = [
  {
    codigo: "4711-3/01",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados",
    zonasPermitidas: ["Área A", "Área B", "Área C"],
  },
  {
    codigo: "4712-1/00",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área D", "Área E"],
  },
  {
    codigo: "5611-2/01",
    descricao: "Restaurantes e similares",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área D", "Área F"],
  },
  {
    codigo: "5611-2/02",
    descricao: "Bares e outros estabelecimentos especializados em servir bebidas",
    zonasPermitidas: ["Área B", "Área C", "Área F"],
  },
  {
    codigo: "8511-2/00",
    descricao: "Educação infantil - creche",
    zonasPermitidas: ["Área A", "Área B", "Área D", "Área E", "Área C"],
  },
  {
    codigo: "8512-1/00",
    descricao: "Educação infantil - pré-escola",
    zonasPermitidas: ["Área A", "Área B", "Área D", "Área E", "Área C"],
  },
  {
    codigo: "8630-5/01",
    descricao: "Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos",
    zonasPermitidas: ["Área A", "Área B", "Área C"],
  },
  {
    codigo: "8630-5/02",
    descricao: "Atividade médica ambulatorial com recursos para realização de exames complementares",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área D"],
  },
  {
    codigo: "4520-0/01",
    descricao: "Serviços de manutenção e reparação mecânica de veículos automotores",
    zonasPermitidas: ["Área B", "Área G", "Área C"],
  },
  {
    codigo: "4520-0/02",
    descricao: "Serviços de lanternagem ou funilaria e pintura de veículos automotores",
    zonasPermitidas: ["Área G"],
  },
  {
    codigo: "6201-5/01",
    descricao: "Desenvolvimento de programas de computador sob encomenda",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área D", "Área E", "Área F", "Área G"],
  },
  {
    codigo: "6311-9/00",
    descricao: "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área G"],
  },
  {
    codigo: "5510-8/01",
    descricao: "Hotéis",
    zonasPermitidas: ["Área A", "Área B", "Área F", "Área C"],
  },
  {
    codigo: "5590-6/01",
    descricao: "Albergues, exceto assistenciais",
    zonasPermitidas: ["Área A", "Área B", "Área F"],
  },
  {
    codigo: "9312-3/00",
    descricao: "Clubes sociais, esportivos e similares",
    zonasPermitidas: ["Área A", "Área B", "Área D", "Área E"],
  },
  {
    codigo: "4930-2/01",
    descricao: "Transporte rodoviário de carga, exceto produtos perigosos e mudanças, municipal",
    zonasPermitidas: ["Área G"],
  },
  {
    codigo: "1011-2/01",
    descricao: "Frigorífico - abate de bovinos",
    zonasPermitidas: ["Área G"],
  },
  {
    codigo: "4781-4/00",
    descricao: "Comércio varejista de artigos do vestuário e acessórios",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área D", "Área F"],
  },
  {
    codigo: "4763-6/01",
    descricao: "Comércio varejista de brinquedos e artigos recreativos",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área D"],
  },
  {
    codigo: "9329-8/99",
    descricao: "Outras atividades de recreação e lazer não especificadas anteriormente",
    zonasPermitidas: ["Área A", "Área B", "Área C", "Área F", "Área D"],
  },
];
