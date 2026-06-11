import type { LatLngExpression } from "leaflet";

export interface LayerFeature {
  type: string;
  coordinates: LatLngExpression[] | LatLngExpression[][];
  properties: Record<string, string>;
}

export interface MapLayer {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  opacity: number;
  features: LayerFeature[];
}

export const defaultLayers: MapLayer[] = [
  {
    id: "lote-fiscal",
    name: "Lote fiscal",
    color: "#FFFF00",
    visible: true,
    opacity: 0.7,
    features: [],
  },
  {
    id: "edificacao-tombada-ef",
    name: "Edificação tombada (Estadual - Federal)",
    color: "#FF0000",
    visible: false,
    opacity: 0.7,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7265, -38.5270],
          [-3.7265, -38.5260],
          [-3.7275, -38.5260],
          [-3.7275, -38.5270],
        ],
        properties: { nome: "Theatro José de Alencar" },
      },
      {
        type: "polygon",
        coordinates: [
          [-3.7240, -38.5230],
          [-3.7240, -38.5220],
          [-3.7250, -38.5220],
          [-3.7250, -38.5230],
        ],
        properties: { nome: "Farol do Mucuripe" },
      },
    ],
  },
  {
    id: "entorno-tombado-ef",
    name: "Entorno de bem tombado (Estadual - Federal)",
    color: "#FF6600",
    visible: false,
    opacity: 0.5,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7255, -38.5280],
          [-3.7255, -38.5250],
          [-3.7285, -38.5250],
          [-3.7285, -38.5280],
        ],
        properties: { nome: "Entorno Theatro José de Alencar", raio: "300m" },
      },
    ],
  },
  {
    id: "edificacao-tombada-sc",
    name: "Edificação tombada (Sec. Cultura de Fortaleza)",
    color: "#CC0066",
    visible: false,
    opacity: 0.7,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7300, -38.5200],
          [-3.7300, -38.5192],
          [-3.7308, -38.5192],
          [-3.7308, -38.5200],
        ],
        properties: { nome: "Casa de Cultura" },
      },
    ],
  },
  {
    id: "entorno-tombado-sc",
    name: "Entorno de bem tombado (Sec. Cultura de Fortaleza)",
    color: "#FF99CC",
    visible: false,
    opacity: 0.5,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7290, -38.5210],
          [-3.7290, -38.5182],
          [-3.7318, -38.5182],
          [-3.7318, -38.5210],
        ],
        properties: { nome: "Entorno Casa de Cultura", raio: "300m" },
      },
    ],
  },
  {
    id: "unidade-protegida",
    name: "Unidade protegida",
    color: "#00CC00",
    visible: false,
    opacity: 0.5,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7440, -38.5020],
          [-3.7440, -38.4960],
          [-3.7490, -38.4960],
          [-3.7490, -38.5020],
        ],
        properties: { nome: "Parque do Cocó" },
      },
      {
        type: "polygon",
        coordinates: [
          [-3.7180, -38.5300],
          [-3.7180, -38.5260],
          [-3.7210, -38.5260],
          [-3.7210, -38.5300],
        ],
        properties: { nome: "Parque Beira Mar" },
      },
    ],
  },
  {
    id: "restricao-viario",
    name: "Restrição sobre caixa do sistema viário básico",
    color: "#9900FF",
    visible: false,
    opacity: 0.5,
    features: [
      {
        type: "line",
        coordinates: [
          [-3.7200, -38.5300],
          [-3.7400, -38.5100],
        ],
        properties: { nome: "Av. Santos Dumont" },
      },
      {
        type: "line",
        coordinates: [
          [-3.7220, -38.5200],
          [-3.7220, -38.4950],
        ],
        properties: { nome: "Av. Beira Mar" },
      },
    ],
  },
  {
    id: "protecao-aerodromos",
    name: "Plano Básico Zona Proteção Aeródromos",
    color: "#0066FF",
    visible: false,
    opacity: 0.3,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7600, -38.5400],
          [-3.7600, -38.5000],
          [-3.7800, -38.5000],
          [-3.7800, -38.5400],
        ],
        properties: { nome: "Zona de Proteção Aeroporto Pinto Martins" },
      },
    ],
  },
  {
    id: "sistema-cicloviario",
    name: "Sistema cicloviário",
    color: "#00CCCC",
    visible: false,
    opacity: 0.7,
    features: [
      {
        type: "line",
        coordinates: [
          [-3.7220, -38.5180],
          [-3.7220, -38.4980],
        ],
        properties: { nome: "Ciclovia Beira Mar" },
      },
      {
        type: "line",
        coordinates: [
          [-3.7260, -38.5200],
          [-3.7380, -38.5200],
        ],
        properties: { nome: "Ciclofaixa Av. da Universidade" },
      },
    ],
  },
  {
    id: "hidrografia",
    name: "Hidrografia",
    color: "#0099FF",
    visible: false,
    opacity: 0.6,
    features: [
      {
        type: "line",
        coordinates: [
          [-3.7450, -38.4900],
          [-3.7380, -38.5000],
          [-3.7300, -38.5050],
          [-3.7220, -38.5000],
        ],
        properties: { nome: "Rio Cocó" },
      },
      {
        type: "line",
        coordinates: [
          [-3.7350, -38.5350],
          [-3.7280, -38.5300],
          [-3.7230, -38.5280],
        ],
        properties: { nome: "Riacho Pajeú" },
      },
    ],
  },
  {
    id: "limite-bairro",
    name: "Limite bairro",
    color: "#666666",
    visible: false,
    opacity: 0.6,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.7200, -38.5180],
          [-3.7200, -38.5030],
          [-3.7310, -38.5030],
          [-3.7310, -38.5180],
        ],
        properties: { nome: "Meireles" },
      },
      {
        type: "polygon",
        coordinates: [
          [-3.7310, -38.5200],
          [-3.7310, -38.5100],
          [-3.7400, -38.5100],
          [-3.7400, -38.5200],
        ],
        properties: { nome: "Aldeota" },
      },
    ],
  },
  {
    id: "limite-fortaleza",
    name: "Limite Fortaleza",
    color: "#333333",
    visible: false,
    opacity: 0.5,
    features: [
      {
        type: "polygon",
        coordinates: [
          [-3.6900, -38.5800],
          [-3.6900, -38.4500],
          [-3.8100, -38.4500],
          [-3.8100, -38.5800],
        ],
        properties: { nome: "Município de Fortaleza" },
      },
    ],
  },
];
