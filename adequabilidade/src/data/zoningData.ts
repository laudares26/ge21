export interface ZoningArea {
  id: string;
  nome: string;
  descricao: string;
  color: string;
  polygons: [number, number][][];
}

export const zoningAreas: ZoningArea[] = [
  {
    id: "Área A",
    nome: "Área A — perfil de ocupação moderada 1 (demonstrativo)",
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
    id: "Área B",
    nome: "Área B — perfil de ocupação moderada 2 (demonstrativo)",
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
    id: "Área C",
    nome: "Área C — perfil de ocupação consolidada (demonstrativo)",
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
    id: "Área D",
    nome: "Área D — perfil de ocupação restrita 1 (demonstrativo)",
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
    id: "Área E",
    nome: "Área E — perfil de ocupação restrita 2 (demonstrativo)",
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
    id: "Área F",
    nome: "Área F — perfil de ocupação turística (demonstrativo)",
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
    id: "Área G",
    nome: "Área G — perfil de ocupação industrial (demonstrativo)",
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
