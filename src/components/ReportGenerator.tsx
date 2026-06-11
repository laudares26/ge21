import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { IptuLote } from "../data/iptuData";
import type { MapLayer } from "../data/layersData";

function pointInPolygon(
  point: [number, number],
  polygon: [number, number][]
): boolean {
  let inside = false;
  const [x, y] = point;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

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

function centroid(coords: [number, number][]): [number, number] {
  const n = coords.length;
  const sum = coords.reduce(
    (acc, c) => [acc[0] + c[0], acc[1] + c[1]],
    [0, 0]
  );
  return [sum[0] / n, sum[1] / n];
}

interface AnalysisRow {
  camada: string;
  elemento: string;
  distancia: string;
  status: string;
}

export function analyzeNeighborhood(
  lote: IptuLote,
  layers: MapLayer[]
): AnalysisRow[] {
  const rows: AnalysisRow[] = [];
  const center = lote.center as [number, number];

  for (const layer of layers) {
    if (layer.id === "lote-fiscal") continue;
    for (const feat of layer.features) {
      const coords = feat.coordinates as [number, number][];
      let dist: number;
      let inside = false;

      if (feat.type === "polygon") {
        inside = pointInPolygon(center, coords);
        const c = centroid(coords);
        dist = distanceDeg(center, c);
      } else {
        let minD = Infinity;
        for (const pt of coords) {
          const d = distanceDeg(center, pt);
          if (d < minD) minD = d;
        }
        dist = minD;
      }

      rows.push({
        camada: layer.name,
        elemento: feat.properties.nome || "-",
        distancia: inside ? "Dentro da área" : `${Math.round(dist)} m`,
        status: inside || dist < 300 ? "RESTRIÇÃO" : "OK",
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
        if (val === "RESTRIÇÃO") {
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
    "Documento gerado automaticamente pelo sistema de Análise de Vizinhança — SEUMA",
    14,
    pageH - 10
  );

  doc.save(`analise-vizinhanca-${lote.iptu}.pdf`);
}
