export const GEOSERVER_WMS_URL =
  "https://ubigeodesign.ge21gt.cloud/geoserver/RMs/wms";

export interface MapLayer {
  id: string;
  nome: string;
  visible: boolean;
  opacity: number;
  color: string;
  wmsLayer: string;
}

export const defaultLayers: MapLayer[] = [
  {
    id: "quadras",
    nome: "Quadras (SEFIN)",
    visible: true,
    opacity: 0.9,
    color: "#8c8c8c",
    wmsLayer: "RMs:Quadras_SEFIN",
  },
  {
    id: "lotes",
    nome: "Lotes (SEFIN)",
    visible: true,
    opacity: 0.8,
    color: "#fadb14",
    wmsLayer: "RMs:Lotes_SEFIN",
  },
  {
    id: "edificacoes",
    nome: "Edificações (SEFIN)",
    visible: false,
    opacity: 0.9,
    color: "#d46b08",
    wmsLayer: "RMs:Edificacoes_SEFIN",
  },
  {
    id: "vias",
    nome: "Vias (Fortaleza)",
    visible: false,
    opacity: 0.9,
    color: "#434343",
    wmsLayer: "RMs:Vias_FOR",
  },
  {
    id: "uc",
    nome: "Unidades de Conservação",
    visible: false,
    opacity: 0.8,
    color: "#237804",
    wmsLayer: "RMs:UC_Municipal_Estadual_Federal_FOR",
  },
  {
    id: "vegetacao",
    nome: "Vegetação Expressiva",
    visible: false,
    opacity: 0.8,
    color: "#52c41a",
    wmsLayer: "RMs:Vegetacao_Expressiva_FOR",
  },
  {
    id: "hidro-rede",
    nome: "Hidrografia — Rede",
    visible: false,
    opacity: 0.9,
    color: "#096dd9",
    wmsLayer: "RMs:Hidro_Rede_FOR",
  },
  {
    id: "hidro-massa",
    nome: "Hidrografia — Massa d'água",
    visible: false,
    opacity: 0.8,
    color: "#0050b3",
    wmsLayer: "RMs:Hidro_Massa_dagua_FOR",
  },
  {
    id: "escolas",
    nome: "Escolas",
    visible: false,
    opacity: 0.9,
    color: "#722ed1",
    wmsLayer: "RMs:Escolas_FOR",
  },
  {
    id: "esgoto",
    nome: "Rede de Esgoto (IBGE)",
    visible: false,
    opacity: 0.8,
    color: "#ad4e00",
    wmsLayer: "RMs:Rede_de_Esgoto_IBGE_FOR",
  },
];
