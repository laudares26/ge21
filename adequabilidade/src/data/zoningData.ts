export interface ZoningArea {
  id: string;
  nome: string;
  descricao: string;
  color: string;
  polygons: [number, number][][];
}

export const zoningAreas: ZoningArea[] = [
  {
    id: "ZOM-1",
    nome: "ZOM-1 — Zona de Ocupação Moderada 1",
    descricao: "Zona residencial e comercial de médio porte",
    color: "#4CAF50",
    polygons: [
      [
        [-3.7200, -38.5200],
        [-3.7200, -38.5100],
        [-3.7280, -38.5100],
        [-3.7280, -38.5200],
      ],
      [
        [-3.7350, -38.5400],
        [-3.7350, -38.5310],
        [-3.7420, -38.5310],
        [-3.7420, -38.5400],
      ],
    ],
  },
  {
    id: "ZOM-2",
    nome: "ZOM-2 — Zona de Ocupação Moderada 2",
    descricao: "Zona mista de maior densidade",
    color: "#8BC34A",
    polygons: [
      [
        [-3.7280, -38.5200],
        [-3.7280, -38.5100],
        [-3.7350, -38.5100],
        [-3.7350, -38.5200],
      ],
      [
        [-3.7420, -38.5400],
        [-3.7420, -38.5310],
        [-3.7480, -38.5310],
        [-3.7480, -38.5400],
      ],
    ],
  },
  {
    id: "ZOC",
    nome: "ZOC — Zona de Ocupação Consolidada",
    descricao: "Zona comercial e serviços consolidada",
    color: "#FF9800",
    polygons: [
      [
        [-3.7250, -38.5300],
        [-3.7250, -38.5200],
        [-3.7330, -38.5200],
        [-3.7330, -38.5300],
      ],
      [
        [-3.7100, -38.5150],
        [-3.7100, -38.5050],
        [-3.7180, -38.5050],
        [-3.7180, -38.5150],
      ],
    ],
  },
  {
    id: "ZOR-1",
    nome: "ZOR-1 — Zona de Ocupação Restrita 1",
    descricao: "Zona residencial de baixa densidade",
    color: "#2196F3",
    polygons: [
      [
        [-3.7350, -38.5200],
        [-3.7350, -38.5100],
        [-3.7420, -38.5100],
        [-3.7420, -38.5200],
      ],
    ],
  },
  {
    id: "ZOR-2",
    nome: "ZOR-2 — Zona de Ocupação Restrita 2",
    descricao: "Zona residencial unifamiliar",
    color: "#03A9F4",
    polygons: [
      [
        [-3.7420, -38.5200],
        [-3.7420, -38.5100],
        [-3.7480, -38.5100],
        [-3.7480, -38.5200],
      ],
    ],
  },
  {
    id: "ZOT",
    nome: "ZOT — Zona de Ocupação Turística",
    descricao: "Zona turística e hoteleira",
    color: "#9C27B0",
    polygons: [
      [
        [-3.7220, -38.5100],
        [-3.7220, -38.5000],
        [-3.7290, -38.5000],
        [-3.7290, -38.5100],
      ],
    ],
  },
  {
    id: "ZOI",
    nome: "ZOI — Zona de Ocupação Industrial",
    descricao: "Zona industrial e logística",
    color: "#795548",
    polygons: [
      [
        [-3.7500, -38.5400],
        [-3.7500, -38.5280],
        [-3.7580, -38.5280],
        [-3.7580, -38.5400],
      ],
    ],
  },
];
