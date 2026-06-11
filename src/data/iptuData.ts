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

export const iptuLotes: IptuLote[] = [
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
  },
  {
    iptu: "0001.002.003",
    endereco: "Av. Beira Mar, 3000 - Meireles",
    bairro: "Meireles",
    area: 820,
    proprietario: "Maria Oliveira",
    zoneamento: "ZOM-2",
    coordinates: [
      [-3.7235, -38.5130],
      [-3.7235, -38.5118],
      [-3.7243, -38.5118],
      [-3.7243, -38.5130],
    ],
    center: [-3.7239, -38.5124],
  },
  {
    iptu: "0002.005.010",
    endereco: "Rua Frederico Borges, 500 - Varjota",
    bairro: "Varjota",
    area: 360,
    proprietario: "Carlos Santos",
    zoneamento: "ZOC-1",
    coordinates: [
      [-3.7320, -38.5080],
      [-3.7320, -38.5070],
      [-3.7328, -38.5070],
      [-3.7328, -38.5080],
    ],
    center: [-3.7324, -38.5075],
  },
  {
    iptu: "0003.010.020",
    endereco: "Av. Santos Dumont, 1500 - Aldeota",
    bairro: "Aldeota",
    area: 1200,
    proprietario: "Ana Pereira",
    zoneamento: "ZOM-3",
    coordinates: [
      [-3.7340, -38.5150],
      [-3.7340, -38.5135],
      [-3.7352, -38.5135],
      [-3.7352, -38.5150],
    ],
    center: [-3.7346, -38.5142],
  },
  {
    iptu: "0004.003.015",
    endereco: "Rua Canuto de Aguiar, 800 - Meireles",
    bairro: "Meireles",
    area: 540,
    proprietario: "Pedro Lima",
    zoneamento: "ZOM-1",
    coordinates: [
      [-3.7280, -38.5060],
      [-3.7280, -38.5048],
      [-3.7290, -38.5048],
      [-3.7290, -38.5060],
    ],
    center: [-3.7285, -38.5054],
  },
  {
    iptu: "0005.007.002",
    endereco: "Av. Abolição, 2200 - Mucuripe",
    bairro: "Mucuripe",
    area: 680,
    proprietario: "Lucia Fernandes",
    zoneamento: "ZOR-1",
    coordinates: [
      [-3.7220, -38.5020],
      [-3.7220, -38.5008],
      [-3.7230, -38.5008],
      [-3.7230, -38.5020],
    ],
    center: [-3.7225, -38.5014],
  },
  {
    iptu: "0006.012.008",
    endereco: "Rua Ildefonso Albano, 300 - Aldeota",
    bairro: "Aldeota",
    area: 390,
    proprietario: "Roberto Costa",
    zoneamento: "ZOC-2",
    coordinates: [
      [-3.7360, -38.5170],
      [-3.7360, -38.5160],
      [-3.7368, -38.5160],
      [-3.7368, -38.5170],
    ],
    center: [-3.7364, -38.5165],
  },
  {
    iptu: "0007.004.011",
    endereco: "Rua Tibúrcio Cavalcante, 1200 - Dionísio Torres",
    bairro: "Dionísio Torres",
    area: 510,
    proprietario: "Fernanda Souza",
    zoneamento: "ZOR-2",
    coordinates: [
      [-3.7400, -38.5100],
      [-3.7400, -38.5088],
      [-3.7410, -38.5088],
      [-3.7410, -38.5100],
    ],
    center: [-3.7405, -38.5094],
  },
  {
    iptu: "0008.009.005",
    endereco: "Av. Dom Luís, 600 - Meireles",
    bairro: "Meireles",
    area: 950,
    proprietario: "Marcos Almeida",
    zoneamento: "ZOM-2",
    coordinates: [
      [-3.7305, -38.5165],
      [-3.7305, -38.5150],
      [-3.7315, -38.5150],
      [-3.7315, -38.5165],
    ],
    center: [-3.7310, -38.5157],
  },
  {
    iptu: "0009.006.018",
    endereco: "Rua Nogueira Acioli, 450 - Centro",
    bairro: "Centro",
    area: 290,
    proprietario: "Juliana Rocha",
    zoneamento: "ZOC-1",
    coordinates: [
      [-3.7250, -38.5240],
      [-3.7250, -38.5230],
      [-3.7258, -38.5230],
      [-3.7258, -38.5240],
    ],
    center: [-3.7254, -38.5235],
  },
];
