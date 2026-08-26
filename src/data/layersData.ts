export const GEOSERVER_WMS_URL =
  "https://ubigeodesign.ge21gt.cloud/geoserver/RMs/wms";
export const GEOSERVER_WFS_URL =
  "https://ubigeodesign.ge21gt.cloud/geoserver/RMs/ows";

export interface MapLayer {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  opacity: number;
  wmsLayer?: string;
  geojsonUrl?: string;
}

export const defaultLayers: MapLayer[] = [
  {
    id: "quadras",
    name: "Quadras (SEFIN)",
    color: "#8c8c8c",
    visible: true,
    opacity: 0.9,
    geojsonUrl: "/quadras_sefin.geojson",
  },
  {
    id: "lotes",
    name: "Lotes (SEFIN)",
    color: "#fadb14",
    visible: true,
    opacity: 0.7,
    geojsonUrl: "/lotes_sefin.geojson",
  },
  {
    id: "edificacoes",
    name: "Edificações (SEFIN)",
    color: "#d46b08",
    visible: false,
    opacity: 0.9,
    wmsLayer: "RMs:Edificacoes_SEFIN",
  },
  {
    id: "trechos",
    name: "Trechos de Vias (SEFIN)",
    color: "#595959",
    visible: false,
    opacity: 0.9,
    geojsonUrl: "/trechos_sefin.geojson",
  },
  {
    id: "vias",
    name: "Vias (Fortaleza)",
    color: "#434343",
    visible: false,
    opacity: 0.9,
    wmsLayer: "RMs:Vias_FOR",
  },
  {
    id: "bens-arqueologicos",
    name: "Bens Arqueológicos e Patrimônio",
    color: "#c41d7f",
    visible: true,
    opacity: 0.9,
    wmsLayer: "RMs:Bens_Arqueologicos_Imoveis_Moveis_FOR",
  },
  {
    id: "turismo-lazer",
    name: "Turismo e Lazer",
    color: "#1890ff",
    visible: false,
    opacity: 0.9,
    wmsLayer: "RMs:Turismo_e_Lazer_FOR",
  },
  {
    id: "escolas",
    name: "Escolas",
    color: "#722ed1",
    visible: false,
    opacity: 0.9,
    wmsLayer: "RMs:Escolas_FOR",
  },
  {
    id: "uc",
    name: "Unidades de Conservação",
    color: "#237804",
    visible: true,
    opacity: 0.8,
    wmsLayer: "RMs:UC_Municipal_Estadual_Federal_FOR",
  },
  {
    id: "vegetacao",
    name: "Vegetação Expressiva",
    color: "#52c41a",
    visible: false,
    opacity: 0.8,
    wmsLayer: "RMs:Vegetacao_Expressiva_FOR",
  },
  {
    id: "hidro-rede",
    name: "Hidrografia — Rede",
    color: "#096dd9",
    visible: true,
    opacity: 0.9,
    wmsLayer: "RMs:Hidro_Rede_FOR",
  },
  {
    id: "hidro-massa",
    name: "Hidrografia — Massa d'água",
    color: "#0050b3",
    visible: false,
    opacity: 0.8,
    wmsLayer: "RMs:Hidro_Massa_dagua_FOR",
  },
];
