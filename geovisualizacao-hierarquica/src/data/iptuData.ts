import type { LatLngExpression } from "leaflet";

export interface MacrozonaInfo {
  nome: string;
  descricao: string;
  cor: string;
}

export interface ZoneamentoInfo {
  zona: string;
  descricao: string;
  usosPermitidos: string[];
  usosRestritos: string[];
  coeficienteBasico: number;
  coeficienteMaximo: number;
  taxaOcupacao: number;
  gabarito: string;
  cor: string;
}

export interface IptuLote {
  iptu: string;
  endereco: string;
  bairro: string;
  area: number;
  areaEdificada: number;
  proprietario: string;
  testada: number;
  profundidade: number;
  macrozona: MacrozonaInfo;
  zoneamento: ZoneamentoInfo;
  coordinates: LatLngExpression[];
  center: [number, number];
  arruamento: string;
  tipoVia: string;
  larguraVia: number;
}

export const iptuLotes: IptuLote[] = [
  {
    iptu: "0001.001.001",
    endereco: "Rua Barão de Aracati, 100 - Meireles",
    bairro: "Meireles",
    area: 450,
    areaEdificada: 320,
    proprietario: "João Silva",
    testada: 15,
    profundidade: 30,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-1", descricao: "Zona de Ocupação Moderada 1 - Predominância residencial com comércios e serviços de pequeno porte", usosPermitidos: ["Residencial unifamiliar", "Residencial multifamiliar", "Comércio varejista", "Serviços profissionais", "Educação"], usosRestritos: ["Indústria", "Depósitos", "Comércio atacadista"], coeficienteBasico: 1.5, coeficienteMaximo: 3.0, taxaOcupacao: 60, gabarito: "48m (15 pavimentos)", cor: "#66BB6A" },
    coordinates: [[-3.7260, -38.5110], [-3.7260, -38.5100], [-3.7268, -38.5100], [-3.7268, -38.5110]],
    center: [-3.7264, -38.5105],
    arruamento: "Rua Barão de Aracati",
    tipoVia: "Via Coletora",
    larguraVia: 12,
  },
  {
    iptu: "0001.001.002",
    endereco: "Rua Barão de Aracati, 120 - Meireles",
    bairro: "Meireles",
    area: 380,
    areaEdificada: 250,
    proprietario: "Maria Santos",
    testada: 12,
    profundidade: 31.6,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-1", descricao: "Zona de Ocupação Moderada 1 - Predominância residencial com comércios e serviços de pequeno porte", usosPermitidos: ["Residencial unifamiliar", "Residencial multifamiliar", "Comércio varejista", "Serviços profissionais", "Educação"], usosRestritos: ["Indústria", "Depósitos", "Comércio atacadista"], coeficienteBasico: 1.5, coeficienteMaximo: 3.0, taxaOcupacao: 60, gabarito: "48m (15 pavimentos)", cor: "#66BB6A" },
    coordinates: [[-3.7260, -38.5100], [-3.7260, -38.5090], [-3.7268, -38.5090], [-3.7268, -38.5100]],
    center: [-3.7264, -38.5095],
    arruamento: "Rua Barão de Aracati",
    tipoVia: "Via Coletora",
    larguraVia: 12,
  },
  {
    iptu: "0002.003.005",
    endereco: "Av. Beira Mar, 3200 - Meireles",
    bairro: "Meireles",
    area: 1200,
    areaEdificada: 850,
    proprietario: "Pedro Lima",
    testada: 30,
    profundidade: 40,
    macrozona: { nome: "Macrozona de Proteção Ambiental", descricao: "Área de relevante interesse ambiental, com ocupação controlada visando a preservação dos recursos naturais e paisagísticos.", cor: "#29B6F6" },
    zoneamento: { zona: "ZOC", descricao: "Zona de Ocupação Costeira - Faixa litorânea com restrições especiais para preservação da paisagem e acesso à praia", usosPermitidos: ["Hotelaria", "Turismo", "Comércio e serviços", "Lazer e cultura", "Residencial multifamiliar"], usosRestritos: ["Indústria", "Postos de combustível", "Depósitos de grande porte"], coeficienteBasico: 2.0, coeficienteMaximo: 4.0, taxaOcupacao: 50, gabarito: "72m (22 pavimentos)", cor: "#42A5F5" },
    coordinates: [[-3.7230, -38.5140], [-3.7230, -38.5120], [-3.7242, -38.5120], [-3.7242, -38.5140]],
    center: [-3.7236, -38.5130],
    arruamento: "Av. Beira Mar",
    tipoVia: "Via Arterial",
    larguraVia: 24,
  },
  {
    iptu: "0003.010.008",
    endereco: "Rua Osvaldo Cruz, 500 - Aldeota",
    bairro: "Aldeota",
    area: 520,
    areaEdificada: 380,
    proprietario: "Fernanda Costa",
    testada: 16,
    profundidade: 32.5,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-2", descricao: "Zona de Ocupação Moderada 2 - Uso misto com predominância de comércios e serviços de médio porte", usosPermitidos: ["Residencial multifamiliar", "Comércio varejista e atacadista", "Serviços empresariais", "Educação e saúde", "Lazer e entretenimento"], usosRestritos: ["Indústria pesada", "Mineração", "Aterros sanitários"], coeficienteBasico: 2.0, coeficienteMaximo: 4.0, taxaOcupacao: 70, gabarito: "60m (18 pavimentos)", cor: "#FFCA28" },
    coordinates: [[-3.7310, -38.5180], [-3.7310, -38.5168], [-3.7320, -38.5168], [-3.7320, -38.5180]],
    center: [-3.7315, -38.5174],
    arruamento: "Rua Osvaldo Cruz",
    tipoVia: "Via Local",
    larguraVia: 8,
  },
  {
    iptu: "0004.007.012",
    endereco: "Av. Santos Dumont, 1500 - Aldeota",
    bairro: "Aldeota",
    area: 900,
    areaEdificada: 720,
    proprietario: "Ricardo Alves",
    testada: 25,
    profundidade: 36,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOC", descricao: "Zona de Ocupação Comercial - Eixos de atividade econômica com alta densidade e verticalização", usosPermitidos: ["Comércio varejista e atacadista", "Shopping centers", "Serviços empresariais", "Hotelaria", "Residencial multifamiliar"], usosRestritos: ["Indústria pesada", "Aterros", "Extração mineral"], coeficienteBasico: 3.0, coeficienteMaximo: 5.0, taxaOcupacao: 80, gabarito: "Sem limite", cor: "#EF5350" },
    coordinates: [[-3.7340, -38.5260], [-3.7340, -38.5240], [-3.7352, -38.5240], [-3.7352, -38.5260]],
    center: [-3.7346, -38.5250],
    arruamento: "Av. Santos Dumont",
    tipoVia: "Via Arterial",
    larguraVia: 30,
  },
  {
    iptu: "0005.002.003",
    endereco: "Rua Padre Valdevino, 800 - Centro",
    bairro: "Centro",
    area: 350,
    areaEdificada: 280,
    proprietario: "Lucia Martins",
    testada: 10,
    profundidade: 35,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-1", descricao: "Zona de Ocupação Moderada 1 - Predominância residencial com comércios e serviços de pequeno porte", usosPermitidos: ["Residencial unifamiliar", "Residencial multifamiliar", "Comércio varejista", "Serviços profissionais", "Educação"], usosRestritos: ["Indústria", "Depósitos", "Comércio atacadista"], coeficienteBasico: 1.5, coeficienteMaximo: 3.0, taxaOcupacao: 60, gabarito: "48m (15 pavimentos)", cor: "#66BB6A" },
    coordinates: [[-3.7380, -38.5320], [-3.7380, -38.5310], [-3.7388, -38.5310], [-3.7388, -38.5320]],
    center: [-3.7384, -38.5315],
    arruamento: "Rua Padre Valdevino",
    tipoVia: "Via Coletora",
    larguraVia: 14,
  },
  {
    iptu: "0006.005.001",
    endereco: "Av. Abolição, 2200 - Mucuripe",
    bairro: "Mucuripe",
    area: 680,
    areaEdificada: 450,
    proprietario: "Carlos Oliveira",
    testada: 20,
    profundidade: 34,
    macrozona: { nome: "Macrozona de Proteção Ambiental", descricao: "Área de relevante interesse ambiental, com ocupação controlada visando a preservação dos recursos naturais e paisagísticos.", cor: "#29B6F6" },
    zoneamento: { zona: "ZOT", descricao: "Zona de Ocupação Turística - Áreas vocacionadas ao turismo e lazer com parâmetros especiais", usosPermitidos: ["Hotelaria e pousadas", "Restaurantes e bares", "Comércio turístico", "Serviços de lazer", "Residencial unifamiliar"], usosRestritos: ["Indústria", "Comércio atacadista", "Depósitos de grande porte", "Postos de combustível"], coeficienteBasico: 1.0, coeficienteMaximo: 2.5, taxaOcupacao: 50, gabarito: "36m (12 pavimentos)", cor: "#AB47BC" },
    coordinates: [[-3.7220, -38.5050], [-3.7220, -38.5035], [-3.7232, -38.5035], [-3.7232, -38.5050]],
    center: [-3.7226, -38.5042],
    arruamento: "Av. Abolição",
    tipoVia: "Via Arterial",
    larguraVia: 20,
  },
  {
    iptu: "0007.001.004",
    endereco: "Rua Torres Câmara, 300 - Aldeota",
    bairro: "Aldeota",
    area: 410,
    areaEdificada: 310,
    proprietario: "Ana Pereira",
    testada: 14,
    profundidade: 29.3,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-2", descricao: "Zona de Ocupação Moderada 2 - Uso misto com predominância de comércios e serviços de médio porte", usosPermitidos: ["Residencial multifamiliar", "Comércio varejista e atacadista", "Serviços empresariais", "Educação e saúde", "Lazer e entretenimento"], usosRestritos: ["Indústria pesada", "Mineração", "Aterros sanitários"], coeficienteBasico: 2.0, coeficienteMaximo: 4.0, taxaOcupacao: 70, gabarito: "60m (18 pavimentos)", cor: "#FFCA28" },
    coordinates: [[-3.7290, -38.5220], [-3.7290, -38.5210], [-3.7298, -38.5210], [-3.7298, -38.5220]],
    center: [-3.7294, -38.5215],
    arruamento: "Rua Torres Câmara",
    tipoVia: "Via Local",
    larguraVia: 9,
  },
  {
    iptu: "0008.004.002",
    endereco: "Av. Dom Luís, 1000 - Aldeota",
    bairro: "Aldeota",
    area: 750,
    areaEdificada: 600,
    proprietario: "Roberto Souza",
    testada: 22,
    profundidade: 34.1,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOC", descricao: "Zona de Ocupação Comercial - Eixos de atividade econômica com alta densidade e verticalização", usosPermitidos: ["Comércio varejista e atacadista", "Shopping centers", "Serviços empresariais", "Hotelaria", "Residencial multifamiliar"], usosRestritos: ["Indústria pesada", "Aterros", "Extração mineral"], coeficienteBasico: 3.0, coeficienteMaximo: 5.0, taxaOcupacao: 80, gabarito: "Sem limite", cor: "#EF5350" },
    coordinates: [[-3.7350, -38.5170], [-3.7350, -38.5155], [-3.7362, -38.5155], [-3.7362, -38.5170]],
    center: [-3.7356, -38.5162],
    arruamento: "Av. Dom Luís",
    tipoVia: "Via Arterial",
    larguraVia: 28,
  },
  {
    iptu: "0009.006.003",
    endereco: "Rua Senador Pompeu, 600 - Centro",
    bairro: "Centro",
    area: 290,
    areaEdificada: 230,
    proprietario: "Mariana Ferreira",
    testada: 10,
    profundidade: 29,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-1", descricao: "Zona de Ocupação Moderada 1 - Predominância residencial com comércios e serviços de pequeno porte", usosPermitidos: ["Residencial unifamiliar", "Residencial multifamiliar", "Comércio varejista", "Serviços profissionais", "Educação"], usosRestritos: ["Indústria", "Depósitos", "Comércio atacadista"], coeficienteBasico: 1.5, coeficienteMaximo: 3.0, taxaOcupacao: 60, gabarito: "48m (15 pavimentos)", cor: "#66BB6A" },
    coordinates: [[-3.7400, -38.5370], [-3.7400, -38.5360], [-3.7407, -38.5360], [-3.7407, -38.5370]],
    center: [-3.7403, -38.5365],
    arruamento: "Rua Senador Pompeu",
    tipoVia: "Via Coletora",
    larguraVia: 12,
  },
  {
    iptu: "0010.003.007",
    endereco: "Rua Ildefonso Albano, 250 - Aldeota",
    bairro: "Aldeota",
    area: 560,
    areaEdificada: 420,
    proprietario: "Gabriel Monteiro",
    testada: 18,
    profundidade: 31.1,
    macrozona: { nome: "Macrozona de Ocupação Urbana", descricao: "Área urbana consolidada com infraestrutura instalada, destinada à intensificação e qualificação da ocupação.", cor: "#FFA726" },
    zoneamento: { zona: "ZOM-2", descricao: "Zona de Ocupação Moderada 2 - Uso misto com predominância de comércios e serviços de médio porte", usosPermitidos: ["Residencial multifamiliar", "Comércio varejista e atacadista", "Serviços empresariais", "Educação e saúde", "Lazer e entretenimento"], usosRestritos: ["Indústria pesada", "Mineração", "Aterros sanitários"], coeficienteBasico: 2.0, coeficienteMaximo: 4.0, taxaOcupacao: 70, gabarito: "60m (18 pavimentos)", cor: "#FFCA28" },
    coordinates: [[-3.7275, -38.5195], [-3.7275, -38.5183], [-3.7284, -38.5183], [-3.7284, -38.5195]],
    center: [-3.7280, -38.5189],
    arruamento: "Rua Ildefonso Albano",
    tipoVia: "Via Local",
    larguraVia: 10,
  },
];
