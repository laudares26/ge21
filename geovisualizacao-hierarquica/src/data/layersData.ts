import type { LatLngExpression } from "leaflet";

export interface MapLayer {
  id: string;
  nome: string;
  visible: boolean;
  opacity: number;
  color: string;
  type: "polygon" | "line";
  features: { coordinates: LatLngExpression[] | LatLngExpression[][]; label?: string }[];
}

export const defaultLayers: MapLayer[] = [
  {
    id: "macrozona_urbana",
    nome: "Macrozona de Ocupação Urbana",
    visible: true,
    opacity: 0.25,
    color: "#FFA726",
    type: "polygon",
    features: [
      { coordinates: [[-3.7200, -38.5400], [-3.7200, -38.5100], [-3.7450, -38.5100], [-3.7450, -38.5400]], label: "Macrozona de Ocupação Urbana" },
    ],
  },
  {
    id: "macrozona_ambiental",
    nome: "Macrozona de Proteção Ambiental",
    visible: true,
    opacity: 0.25,
    color: "#29B6F6",
    type: "polygon",
    features: [
      { coordinates: [[-3.7150, -38.5200], [-3.7150, -38.5000], [-3.7250, -38.5000], [-3.7250, -38.5200]], label: "Macrozona de Proteção Ambiental" },
    ],
  },
  {
    id: "zona_zom1",
    nome: "ZOM-1 - Ocupação Moderada 1",
    visible: true,
    opacity: 0.3,
    color: "#66BB6A",
    type: "polygon",
    features: [
      { coordinates: [[-3.7250, -38.5120], [-3.7250, -38.5080], [-3.7280, -38.5080], [-3.7280, -38.5120]], label: "ZOM-1" },
      { coordinates: [[-3.7370, -38.5330], [-3.7370, -38.5290], [-3.7410, -38.5290], [-3.7410, -38.5330]], label: "ZOM-1" },
      { coordinates: [[-3.7370, -38.5380], [-3.7370, -38.5350], [-3.7415, -38.5350], [-3.7415, -38.5380]], label: "ZOM-1" },
    ],
  },
  {
    id: "zona_zom2",
    nome: "ZOM-2 - Ocupação Moderada 2",
    visible: true,
    opacity: 0.3,
    color: "#FFCA28",
    type: "polygon",
    features: [
      { coordinates: [[-3.7300, -38.5190], [-3.7300, -38.5160], [-3.7330, -38.5160], [-3.7330, -38.5190]], label: "ZOM-2" },
      { coordinates: [[-3.7280, -38.5230], [-3.7280, -38.5200], [-3.7305, -38.5200], [-3.7305, -38.5230]], label: "ZOM-2" },
      { coordinates: [[-3.7265, -38.5200], [-3.7265, -38.5175], [-3.7295, -38.5175], [-3.7295, -38.5200]], label: "ZOM-2" },
    ],
  },
  {
    id: "zona_zoc",
    nome: "ZOC - Ocupação Comercial",
    visible: true,
    opacity: 0.3,
    color: "#EF5350",
    type: "polygon",
    features: [
      { coordinates: [[-3.7330, -38.5270], [-3.7330, -38.5230], [-3.7360, -38.5230], [-3.7360, -38.5270]], label: "ZOC" },
      { coordinates: [[-3.7340, -38.5180], [-3.7340, -38.5145], [-3.7370, -38.5145], [-3.7370, -38.5180]], label: "ZOC" },
      { coordinates: [[-3.7315, -38.5320], [-3.7315, -38.5290], [-3.7345, -38.5290], [-3.7345, -38.5320]], label: "ZOC" },
    ],
  },
  {
    id: "zona_zot",
    nome: "ZOT - Ocupação Turística",
    visible: true,
    opacity: 0.3,
    color: "#AB47BC",
    type: "polygon",
    features: [
      { coordinates: [[-3.7210, -38.5060], [-3.7210, -38.5025], [-3.7240, -38.5025], [-3.7240, -38.5060]], label: "ZOT" },
      { coordinates: [[-3.7195, -38.5210], [-3.7195, -38.5145], [-3.7230, -38.5145], [-3.7230, -38.5210]], label: "ZOT" },
    ],
  },
  {
    id: "arruamento_arterial",
    nome: "Vias Arteriais",
    visible: true,
    opacity: 0.8,
    color: "#F44336",
    type: "line",
    features: [
      { coordinates: [[-3.7180, -38.5150], [-3.7450, -38.5150]], label: "Av. Beira Mar" },
      { coordinates: [[-3.7250, -38.5000], [-3.7250, -38.5400]], label: "Av. Santos Dumont" },
      { coordinates: [[-3.7320, -38.5050], [-3.7320, -38.5350]], label: "Av. Dom Luís" },
      { coordinates: [[-3.7200, -38.5060], [-3.7400, -38.5060]], label: "Av. Abolição" },
    ],
  },
  {
    id: "arruamento_coletora",
    nome: "Vias Coletoras",
    visible: true,
    opacity: 0.7,
    color: "#FF9800",
    type: "line",
    features: [
      { coordinates: [[-3.7255, -38.5115], [-3.7275, -38.5115]], label: "Rua Barão de Aracati" },
      { coordinates: [[-3.7370, -38.5330], [-3.7395, -38.5330]], label: "Rua Padre Valdevino" },
      { coordinates: [[-3.7395, -38.5375], [-3.7410, -38.5375]], label: "Rua Senador Pompeu" },
    ],
  },
  {
    id: "arruamento_local",
    nome: "Vias Locais",
    visible: false,
    opacity: 0.5,
    color: "#78909C",
    type: "line",
    features: [
      { coordinates: [[-3.7305, -38.5180], [-3.7325, -38.5180]], label: "Rua Osvaldo Cruz" },
      { coordinates: [[-3.7285, -38.5220], [-3.7300, -38.5220]], label: "Rua Torres Câmara" },
      { coordinates: [[-3.7270, -38.5195], [-3.7290, -38.5195]], label: "Rua Ildefonso Albano" },
    ],
  },
  {
    id: "limite_bairro",
    nome: "Limite de Bairro",
    visible: false,
    opacity: 0.6,
    color: "#795548",
    type: "line",
    features: [
      { coordinates: [[-3.7200, -38.5200], [-3.7300, -38.5200], [-3.7300, -38.5100], [-3.7200, -38.5100], [-3.7200, -38.5200]], label: "Meireles" },
      { coordinates: [[-3.7280, -38.5300], [-3.7380, -38.5300], [-3.7380, -38.5150], [-3.7280, -38.5150], [-3.7280, -38.5300]], label: "Aldeota" },
      { coordinates: [[-3.7350, -38.5400], [-3.7430, -38.5400], [-3.7430, -38.5280], [-3.7350, -38.5280], [-3.7350, -38.5400]], label: "Centro" },
    ],
  },
];
