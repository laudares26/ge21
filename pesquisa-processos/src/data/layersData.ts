export interface MapLayer {
  id: string;
  nome: string;
  visible: boolean;
  opacity: number;
  color: string;
  type: "polygon" | "polyline" | "circle";
  features: { coordinates: [number, number][]; label?: string }[];
}

export const defaultLayers: MapLayer[] = [
  {
    id: "lote_fiscal",
    nome: "Lote fiscal",
    visible: false,
    opacity: 0.5,
    color: "#FFFF00",
    type: "polygon",
    features: [],
  },
  {
    id: "energia_eletrica",
    nome: "Sistema de energia elétrica",
    visible: false,
    opacity: 0.5,
    color: "#FFD700",
    type: "polyline",
    features: [
      { coordinates: [[-3.7180, -38.5350], [-3.7220, -38.5300], [-3.7260, -38.5250], [-3.7300, -38.5200], [-3.7340, -38.5150]] },
      { coordinates: [[-3.7250, -38.5400], [-3.7280, -38.5350], [-3.7310, -38.5300], [-3.7340, -38.5250]] },
    ],
  },
  {
    id: "aeroportuario",
    nome: "Sistema aeroportuário",
    visible: false,
    opacity: 0.5,
    color: "#E91E63",
    type: "polygon",
    features: [
      {
        coordinates: [[-3.7750, -38.5320], [-3.7750, -38.5200], [-3.7810, -38.5200], [-3.7810, -38.5320]],
        label: "Aeroporto Int. Pinto Martins",
      },
    ],
  },
  {
    id: "portuario",
    nome: "Sistema portuário",
    visible: false,
    opacity: 0.5,
    color: "#3F51B5",
    type: "polygon",
    features: [
      {
        coordinates: [[-3.7140, -38.5110], [-3.7140, -38.5070], [-3.7160, -38.5070], [-3.7160, -38.5110]],
        label: "Porto de Mucuripe",
      },
    ],
  },
  {
    id: "cicloviario",
    nome: "Sistema cicloviário",
    visible: false,
    opacity: 0.6,
    color: "#4CAF50",
    type: "polyline",
    features: [
      { coordinates: [[-3.7200, -38.5050], [-3.7220, -38.5100], [-3.7240, -38.5150], [-3.7260, -38.5200]] },
      { coordinates: [[-3.7300, -38.5100], [-3.7320, -38.5150], [-3.7340, -38.5200], [-3.7360, -38.5250]] },
      { coordinates: [[-3.7250, -38.5250], [-3.7280, -38.5280], [-3.7310, -38.5310], [-3.7340, -38.5340]] },
    ],
  },
  {
    id: "ferroviario",
    nome: "Sistema ferroviário",
    visible: false,
    opacity: 0.6,
    color: "#795548",
    type: "polyline",
    features: [
      { coordinates: [[-3.7180, -38.5400], [-3.7250, -38.5350], [-3.7320, -38.5300], [-3.7400, -38.5250], [-3.7480, -38.5200]] },
    ],
  },
  {
    id: "viario",
    nome: "Sistema viário",
    visible: false,
    opacity: 0.4,
    color: "#FF5722",
    type: "polyline",
    features: [
      { coordinates: [[-3.7200, -38.5050], [-3.7200, -38.5400]], label: "Av. Beira Mar" },
      { coordinates: [[-3.7250, -38.5050], [-3.7250, -38.5400]], label: "Av. Abolição" },
      { coordinates: [[-3.7300, -38.5100], [-3.7300, -38.5400]], label: "Av. Santos Dumont" },
      { coordinates: [[-3.7350, -38.5100], [-3.7350, -38.5400]], label: "Av. Dom Luís" },
      { coordinates: [[-3.7200, -38.5150], [-3.7450, -38.5150]] },
      { coordinates: [[-3.7200, -38.5250], [-3.7450, -38.5250]] },
      { coordinates: [[-3.7200, -38.5350], [-3.7450, -38.5350]] },
    ],
  },
  {
    id: "hidrografia",
    nome: "Hidrografia",
    visible: false,
    opacity: 0.5,
    color: "#2196F3",
    type: "polyline",
    features: [
      { coordinates: [[-3.7100, -38.5350], [-3.7150, -38.5300], [-3.7200, -38.5280], [-3.7250, -38.5260], [-3.7300, -38.5240]], label: "Rio Cocó" },
      { coordinates: [[-3.7400, -38.5150], [-3.7420, -38.5200], [-3.7440, -38.5250], [-3.7460, -38.5300]], label: "Riacho Pajeú" },
    ],
  },
  {
    id: "limite_bairro",
    nome: "Limite bairro",
    visible: false,
    opacity: 0.4,
    color: "#9C27B0",
    type: "polyline",
    features: [
      { coordinates: [[-3.7150, -38.5150], [-3.7280, -38.5150], [-3.7280, -38.5050], [-3.7150, -38.5050], [-3.7150, -38.5150]], label: "Meireles" },
      { coordinates: [[-3.7280, -38.5250], [-3.7380, -38.5250], [-3.7380, -38.5150], [-3.7280, -38.5150], [-3.7280, -38.5250]], label: "Aldeota" },
      { coordinates: [[-3.7280, -38.5400], [-3.7430, -38.5400], [-3.7430, -38.5250], [-3.7280, -38.5250], [-3.7280, -38.5400]], label: "Centro" },
    ],
  },
  {
    id: "limite_fortaleza",
    nome: "Limite Fortaleza",
    visible: false,
    opacity: 0.3,
    color: "#FF9800",
    type: "polygon",
    features: [
      {
        coordinates: [
          [-3.6900, -38.5800], [-3.6900, -38.4700], [-3.7000, -38.4600], [-3.7200, -38.4500],
          [-3.7600, -38.4500], [-3.7900, -38.4700], [-3.8000, -38.5000], [-3.8000, -38.5500],
          [-3.7800, -38.5700], [-3.7500, -38.5800], [-3.7200, -38.5850], [-3.6900, -38.5800],
        ],
        label: "Fortaleza",
      },
    ],
  },
  {
    id: "limite_municipal",
    nome: "Limite municipal",
    visible: false,
    opacity: 0.3,
    color: "#607D8B",
    type: "polyline",
    features: [
      {
        coordinates: [
          [-3.6900, -38.5800], [-3.6900, -38.4700], [-3.7000, -38.4600], [-3.7200, -38.4500],
          [-3.7600, -38.4500], [-3.7900, -38.4700], [-3.8000, -38.5000], [-3.8000, -38.5500],
          [-3.7800, -38.5700], [-3.7500, -38.5800], [-3.7200, -38.5850], [-3.6900, -38.5800],
        ],
      },
    ],
  },
];
