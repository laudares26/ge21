import type { LatLngExpression } from "leaflet";

export interface IptuLote {
  iptu: string;
  endereco: string;
  bairro: string;
  area: number;
  proprietario: string;
  zoneamento: string;
  coordinates: LatLngExpression[];
  center: [number, number];
}

export interface Confinante {
  iptu: string;
  endereco: string;
  proprietario: string;
  direcao: "Norte" | "Sul" | "Leste" | "Oeste";
}

export interface LoteComConfinantes extends IptuLote {
  confinantes: Confinante[];
}

export const iptuLotes: LoteComConfinantes[] = [
  {
    iptu: "0001.001.001",
    endereco: "Rua Barão de Aracati, 100 - Meireles",
    bairro: "Meireles",
    area: 450,
    proprietario: "João Silva",
    zoneamento: "ZOM-1",
    coordinates: [
      [-3.7260, -38.5110],
      [-3.7260, -38.5100],
      [-3.7268, -38.5100],
      [-3.7268, -38.5110],
    ],
    center: [-3.7264, -38.5105],
    confinantes: [
      { iptu: "0001.001.002", endereco: "Rua Barão de Aracati, 120", proprietario: "Maria Santos", direcao: "Leste" },
      { iptu: "0001.002.001", endereco: "Rua Ana Bilhar, 50", proprietario: "Carlos Oliveira", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Rua Barão de Aracati", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0001.001.010", endereco: "Rua Nunes Valente, 200", proprietario: "Ana Pereira", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0001.001.002",
    endereco: "Rua Barão de Aracati, 120 - Meireles",
    bairro: "Meireles",
    area: 380,
    proprietario: "Maria Santos",
    zoneamento: "ZOM-1",
    coordinates: [
      [-3.7260, -38.5100],
      [-3.7260, -38.5090],
      [-3.7268, -38.5090],
      [-3.7268, -38.5100],
    ],
    center: [-3.7264, -38.5095],
    confinantes: [
      { iptu: "0001.001.003", endereco: "Rua Barão de Aracati, 140", proprietario: "Pedro Lima", direcao: "Leste" },
      { iptu: "0001.002.002", endereco: "Rua Ana Bilhar, 70", proprietario: "Fernanda Costa", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Rua Barão de Aracati", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0001.001.001", endereco: "Rua Barão de Aracati, 100", proprietario: "João Silva", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0002.003.005",
    endereco: "Av. Beira Mar, 3200 - Meireles",
    bairro: "Meireles",
    area: 1200,
    proprietario: "Pedro Lima",
    zoneamento: "ZOC",
    coordinates: [
      [-3.7230, -38.5140],
      [-3.7230, -38.5120],
      [-3.7242, -38.5120],
      [-3.7242, -38.5140],
    ],
    center: [-3.7236, -38.5130],
    confinantes: [
      { iptu: "0002.003.006", endereco: "Av. Beira Mar, 3220", proprietario: "Lucia Martins", direcao: "Leste" },
      { iptu: "0002.004.001", endereco: "Rua Frei Mansueto, 10", proprietario: "Ricardo Alves", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Av. Beira Mar", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0002.003.004", endereco: "Av. Beira Mar, 3180", proprietario: "Sandra Rocha", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0003.010.008",
    endereco: "Rua Osvaldo Cruz, 500 - Aldeota",
    bairro: "Aldeota",
    area: 520,
    proprietario: "Fernanda Costa",
    zoneamento: "ZOM-2",
    coordinates: [
      [-3.7310, -38.5180],
      [-3.7310, -38.5168],
      [-3.7320, -38.5168],
      [-3.7320, -38.5180],
    ],
    center: [-3.7315, -38.5174],
    confinantes: [
      { iptu: "0003.010.009", endereco: "Rua Osvaldo Cruz, 520", proprietario: "Roberto Souza", direcao: "Leste" },
      { iptu: "0003.011.001", endereco: "Rua Tibúrcio Cavalcante, 100", proprietario: "Claudia Mendes", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Rua Osvaldo Cruz", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0003.010.007", endereco: "Rua Osvaldo Cruz, 480", proprietario: "Marcos Vieira", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0004.007.012",
    endereco: "Av. Santos Dumont, 1500 - Aldeota",
    bairro: "Aldeota",
    area: 900,
    proprietario: "Ricardo Alves",
    zoneamento: "ZOC",
    coordinates: [
      [-3.7340, -38.5260],
      [-3.7340, -38.5240],
      [-3.7352, -38.5240],
      [-3.7352, -38.5260],
    ],
    center: [-3.7346, -38.5250],
    confinantes: [
      { iptu: "0004.007.013", endereco: "Av. Santos Dumont, 1520", proprietario: "Teresa Barbosa", direcao: "Leste" },
      { iptu: "0004.008.001", endereco: "Rua Silva Jatahy, 200", proprietario: "Paulo Ferreira", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Av. Santos Dumont", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0004.007.011", endereco: "Av. Santos Dumont, 1480", proprietario: "Juliana Campos", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0005.002.003",
    endereco: "Rua Padre Valdevino, 800 - Centro",
    bairro: "Centro",
    area: 350,
    proprietario: "Lucia Martins",
    zoneamento: "ZOM-1",
    coordinates: [
      [-3.7380, -38.5320],
      [-3.7380, -38.5310],
      [-3.7388, -38.5310],
      [-3.7388, -38.5320],
    ],
    center: [-3.7384, -38.5315],
    confinantes: [
      { iptu: "0005.002.004", endereco: "Rua Padre Valdevino, 820", proprietario: "Antônio Ribeiro", direcao: "Leste" },
      { iptu: "0005.003.001", endereco: "Rua Guilherme Rocha, 50", proprietario: "Beatriz Lopes", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Rua Padre Valdevino", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0005.002.002", endereco: "Rua Padre Valdevino, 780", proprietario: "Eduardo Lima", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0006.005.001",
    endereco: "Av. Abolição, 2200 - Mucuripe",
    bairro: "Mucuripe",
    area: 680,
    proprietario: "Carlos Oliveira",
    zoneamento: "ZOT",
    coordinates: [
      [-3.7220, -38.5050],
      [-3.7220, -38.5035],
      [-3.7232, -38.5035],
      [-3.7232, -38.5050],
    ],
    center: [-3.7226, -38.5042],
    confinantes: [
      { iptu: "0006.005.002", endereco: "Av. Abolição, 2220", proprietario: "Helena Dias", direcao: "Leste" },
      { iptu: "0006.006.001", endereco: "Rua Joaquim Nabuco, 30", proprietario: "Gustavo Nunes", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Av. Abolição", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0006.004.010", endereco: "Av. Abolição, 2180", proprietario: "Renata Moura", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0007.001.004",
    endereco: "Rua Torres Câmara, 300 - Aldeota",
    bairro: "Aldeota",
    area: 410,
    proprietario: "Ana Pereira",
    zoneamento: "ZOM-2",
    coordinates: [
      [-3.7290, -38.5220],
      [-3.7290, -38.5210],
      [-3.7298, -38.5210],
      [-3.7298, -38.5220],
    ],
    center: [-3.7294, -38.5215],
    confinantes: [
      { iptu: "0007.001.005", endereco: "Rua Torres Câmara, 320", proprietario: "Diego Pinto", direcao: "Leste" },
      { iptu: "0007.002.001", endereco: "Rua Leonardo Mota, 80", proprietario: "Camila Araújo", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Rua Torres Câmara", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0007.001.003", endereco: "Rua Torres Câmara, 280", proprietario: "Fábio Gomes", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0008.004.002",
    endereco: "Av. Dom Luís, 1000 - Aldeota",
    bairro: "Aldeota",
    area: 750,
    proprietario: "Roberto Souza",
    zoneamento: "ZOC",
    coordinates: [
      [-3.7350, -38.5170],
      [-3.7350, -38.5155],
      [-3.7362, -38.5155],
      [-3.7362, -38.5170],
    ],
    center: [-3.7356, -38.5162],
    confinantes: [
      { iptu: "0008.004.003", endereco: "Av. Dom Luís, 1020", proprietario: "Patrícia Teixeira", direcao: "Leste" },
      { iptu: "0008.005.001", endereco: "Rua Desembargador Moreira, 150", proprietario: "André Carvalho", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Av. Dom Luís", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0008.004.001", endereco: "Av. Dom Luís, 980", proprietario: "Viviane Melo", direcao: "Oeste" },
    ],
  },
  {
    iptu: "0009.006.003",
    endereco: "Rua Senador Pompeu, 600 - Centro",
    bairro: "Centro",
    area: 290,
    proprietario: "Mariana Ferreira",
    zoneamento: "ZOM-1",
    coordinates: [
      [-3.7400, -38.5370],
      [-3.7400, -38.5360],
      [-3.7407, -38.5360],
      [-3.7407, -38.5370],
    ],
    center: [-3.7403, -38.5365],
    confinantes: [
      { iptu: "0009.006.004", endereco: "Rua Senador Pompeu, 620", proprietario: "Leonardo Barros", direcao: "Leste" },
      { iptu: "0009.007.001", endereco: "Rua Major Facundo, 40", proprietario: "Simone Cardoso", direcao: "Sul" },
      { iptu: "VIA_PUBLICA", endereco: "Rua Senador Pompeu", proprietario: "Logradouro Público", direcao: "Norte" },
      { iptu: "0009.006.002", endereco: "Rua Senador Pompeu, 580", proprietario: "Thiago Ramos", direcao: "Oeste" },
    ],
  },
];
