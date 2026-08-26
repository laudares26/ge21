import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { IptuLote } from "../data/iptuData";
import { GEOSERVER_WFS_URL } from "../data/layersData";
import type { MapLayer } from "../data/layersData";

function distanceDeg(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

interface AnalysisRow {
  camada: string;
  elemento: string;
  distancia: string;
  status: string;
}

interface WfsFeature {
  geometry: { type: string; coordinates: unknown } | null;
  properties: Record<string, unknown>;
}

function flattenCoords(coordinates: unknown): [number, number][] {
  const out: [number, number][] = [];
  const walk = (c: unknown): void => {
    if (!Array.isArray(c)) return;
    if (c.length >= 2 && typeof c[0] === "number" && typeof c[1] === "number") {
      out.push([c[1] as number, c[0] as number]);
      return;
    }
    for (const child of c) walk(child);
  };
  walk(coordinates);
  return out;
}

function featureName(props: Record<string, unknown>): string {
  for (const key of ["nome", "name", "nm_uc", "descricao", "tipo", "classe"]) {
    const v = props[key];
    if (typeof v === "string" && v.trim()) return v;
  }
  return "-";
}

const ANALYSIS_RADIUS_M = 500;
const RESTRICTION_DIST_M = 300;

export async function analyzeNeighborhood(
  lote: IptuLote,
  layers: MapLayer[]
): Promise<AnalysisRow[]> {
  const rows: AnalysisRow[] = [];
  const center = lote.center as [number, number];
  const dLat = ANALYSIS_RADIUS_M / 111320;
  const dLon =
    ANALYSIS_RADIUS_M / (111320 * Math.cos((center[0] * Math.PI) / 180));
  const bbox = `${center[0] - dLat},${center[1] - dLon},${center[0] + dLat},${center[1] + dLon},urn:ogc:def:crs:EPSG::4326`;

  const wmsLayers = layers.filter((l) => l.visible && l.wmsLayer);

  const results = await Promise.all(
    wmsLayers.map(async (layer) => {
      const typeName = layer.wmsLayer as string;
      const url =
        `${GEOSERVER_WFS_URL}?service=WFS&version=2.0.0&request=GetFeature` +
        `&typeNames=${encodeURIComponent(typeName)}` +
        `&outputFormat=application/json&srsName=EPSG:4326` +
        `&count=25&bbox=${encodeURIComponent(bbox)}`;
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(String(resp.status));
        const data = (await resp.json()) as { features: WfsFeature[] };
        return { layer, features: data.features || [] };
      } catch {
        return { layer, features: null };
      }
    })
  );

  for (const { layer, features } of results) {
    if (features === null) {
      rows.push({
        camada: layer.name,
        elemento: "Serviço indisponível",
        distancia: "-",
        status: "N/D",
      });
      continue;
    }
    if (features.length === 0) {
      rows.push({
        camada: layer.name,
        elemento: `Nenhum elemento num raio de ${ANALYSIS_RADIUS_M} m`,
        distancia: `> ${ANALYSIS_RADIUS_M} m`,
        status: "OK",
      });
      continue;
    }
    for (const feat of features.slice(0, 5)) {
      const coords = flattenCoords(feat.geometry?.coordinates);
      let minD = Infinity;
      for (const pt of coords) {
        const d = distanceDeg(center, pt);
        if (d < minD) minD = d;
      }
      const dist = minD === Infinity ? NaN : minD;
      rows.push({
        camada: layer.name,
        elemento: featureName(feat.properties),
        distancia: Number.isNaN(dist) ? "-" : `${Math.round(dist)} m`,
        status:
          !Number.isNaN(dist) && dist < RESTRICTION_DIST_M ? "PRÓXIMO" : "OK",
      });
    }
  }
  return rows;
}

export function generatePDF(lote: IptuLote, analysis: AnalysisRow[]): void {
  const doc = new jsPDF();
  const now = new Date().toLocaleDateString("pt-BR");

  doc.setFillColor(46, 125, 110);
  doc.rect(0, 0, 210, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Relatório de Análise de Vizinhança", 14, 18);
  doc.setFontSize(10);
  doc.text("Prefeitura Municipal — SEUMA", 14, 28);
  doc.text(`Data: ${now}`, 170, 28);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Dados do Imóvel", 14, 45);

  autoTable(doc, {
    startY: 50,
    head: [["Campo", "Valor"]],
    body: [
      ["IPTU", lote.iptu],
      ["Endereço", lote.endereco],
      ["Bairro", lote.bairro],
      ["Área (m²)", String(lote.area)],
      ["Proprietário", lote.proprietario],
      ["Zoneamento", lote.zoneamento],
      ["Latitude", String(lote.center[0])],
      ["Longitude", String(lote.center[1])],
    ],
    theme: "grid",
    headStyles: { fillColor: [46, 125, 110] },
    styles: { fontSize: 9 },
  });

  const afterTable = ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 120;
  doc.setFontSize(12);
  doc.text("Análise de Restrições por Camada", 14, afterTable + 12);

  autoTable(doc, {
    startY: afterTable + 16,
    head: [["Camada", "Elemento", "Distância", "Status"]],
    body: analysis.map((r) => [r.camada, r.elemento, r.distancia, r.status]),
    theme: "grid",
    headStyles: { fillColor: [46, 125, 110] },
    styles: { fontSize: 8, cellPadding: 3 },
    bodyStyles: { fontSize: 8 },
    didParseCell: (data) => {
      if (data.column.index === 3 && data.section === "body") {
        const val = data.cell.raw as string;
        if (val === "PRÓXIMO") {
          data.cell.styles.textColor = [220, 20, 60];
          data.cell.styles.fontStyle = "bold";
        } else {
          data.cell.styles.textColor = [0, 128, 0];
        }
      }
    },
  });

  const pageH = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Documento gerado automaticamente pelo sistema de Análise de Vizinhança — SEUMA. Dados espaciais: GeoServer IDE SEUMA (Fortaleza).",
    14,
    pageH - 10
  );

  doc.save(`analise-vizinhanca-${lote.iptu}.pdf`);
}
