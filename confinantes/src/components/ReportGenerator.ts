import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { LoteComConfinantes } from "../data/iptuData";

export interface EdgeInfo {
  verticeA: string;
  verticeB: string;
  comprimento: string;
  azimute: string;
  rumo: string;
  direcao: string;
}

function toDeg(rad: number): number {
  return rad * (180 / Math.PI);
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

function calcAzimuth(latA: number, lonA: number, latB: number, lonB: number): number {
  const dLon = toRad(lonB - lonA);
  const lat1 = toRad(latA);
  const lat2 = toRad(latB);
  const x = Math.sin(dLon) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let brng = toDeg(Math.atan2(x, y));
  if (brng < 0) brng += 360;
  return brng;
}

function azimuthToRumo(az: number): { rumo: string; direcao: string } {
  let grau: number;
  let direcao: string;

  if (az >= 0 && az < 90) {
    grau = az;
    direcao = "NE";
  } else if (az >= 90 && az < 180) {
    grau = 180 - az;
    direcao = "SE";
  } else if (az >= 180 && az < 270) {
    grau = az - 180;
    direcao = "SO";
  } else {
    grau = 360 - az;
    direcao = "NO";
  }

  const d = Math.floor(grau);
  const mFull = (grau - d) * 60;
  const m = Math.floor(mFull);
  const s = Math.round((mFull - m) * 60);

  return {
    rumo: `${d}°${m}'${s}" ${direcao}`,
    direcao,
  };
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDMS(deg: number): string {
  const d = Math.floor(deg);
  const mFull = (deg - d) * 60;
  const m = Math.floor(mFull);
  const s = Math.round((mFull - m) * 60);
  return `${d}°${m}'${s}"`;
}

function cardinalDirection(az: number): string {
  if (az >= 337.5 || az < 22.5) return "Norte";
  if (az >= 22.5 && az < 67.5) return "Nordeste";
  if (az >= 67.5 && az < 112.5) return "Leste";
  if (az >= 112.5 && az < 157.5) return "Sudeste";
  if (az >= 157.5 && az < 202.5) return "Sul";
  if (az >= 202.5 && az < 247.5) return "Sudoeste";
  if (az >= 247.5 && az < 292.5) return "Oeste";
  return "Noroeste";
}

export function calculateEdges(lote: LoteComConfinantes): EdgeInfo[] {
  const coords = lote.coordinates as [number, number][];
  const edges: EdgeInfo[] = [];

  for (let i = 0; i < coords.length; i++) {
    const a = coords[i];
    const b = coords[(i + 1) % coords.length];

    const az = calcAzimuth(a[0], a[1], b[0], b[1]);
    const dist = haversineDistance(a[0], a[1], b[0], b[1]);
    const { rumo } = azimuthToRumo(az);

    edges.push({
      verticeA: `V${i + 1} (${a[0].toFixed(4)}, ${a[1].toFixed(4)})`,
      verticeB: `V${(i + 1) % coords.length + 1} (${b[0].toFixed(4)}, ${b[1].toFixed(4)})`,
      comprimento: `${dist.toFixed(2)} m`,
      azimute: formatDMS(az),
      rumo,
      direcao: cardinalDirection(az),
    });
  }

  return edges;
}

export function generatePDF(lote: LoteComConfinantes, edges: EdgeInfo[]): void {
  const doc = new jsPDF();

  doc.setFillColor(46, 125, 110);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Relatório de Confinantes", 14, 15);
  doc.setFontSize(9);
  doc.text("IDE SEUMA — Infraestrutura de Dados Espaciais", 14, 22);
  doc.text(`Emitido em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 27);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13);
  doc.text("Dados do Imóvel", 14, 40);

  autoTable(doc, {
    startY: 44,
    head: [["Campo", "Valor"]],
    body: [
      ["IPTU", lote.iptu],
      ["Endereço", lote.endereco],
      ["Bairro", lote.bairro],
      ["Área", `${lote.area} m²`],
      ["Proprietário", lote.proprietario],
      ["Zoneamento", lote.zoneamento],
      ["Latitude", String(lote.center[0])],
      ["Longitude", String(lote.center[1])],
    ],
    theme: "grid",
    headStyles: { fillColor: [46, 125, 110] },
    styles: { fontSize: 9 },
  });

  const afterImovel =
    ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 100;

  doc.setFontSize(13);
  doc.text("Confinantes", 14, afterImovel + 12);

  autoTable(doc, {
    startY: afterImovel + 16,
    head: [["Direção", "IPTU Confrontante", "Endereço", "Proprietário"]],
    body: lote.confinantes.map((c) => [c.direcao, c.iptu, c.endereco, c.proprietario]),
    theme: "grid",
    headStyles: { fillColor: [46, 125, 110] },
    styles: { fontSize: 8, cellPadding: 3 },
  });

  const afterConf =
    ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 160;

  doc.setFontSize(13);
  doc.text("Arestas do Polígono — Azimute e Rumo", 14, afterConf + 12);

  autoTable(doc, {
    startY: afterConf + 16,
    head: [["Aresta", "De", "Para", "Comprimento", "Azimute", "Rumo", "Direção"]],
    body: edges.map((e, i) => [
      `A${i + 1}`,
      e.verticeA,
      e.verticeB,
      e.comprimento,
      e.azimute,
      e.rumo,
      e.direcao,
    ]),
    theme: "grid",
    headStyles: { fillColor: [46, 125, 110] },
    styles: { fontSize: 7, cellPadding: 2 },
  });

  const afterEdges =
    ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 220;

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Este relatório foi gerado automaticamente pelo sistema IDE SEUMA — Gera-Confinantes.",
    14,
    afterEdges + 10
  );
  doc.text(
    "Os dados são fictícios e destinados exclusivamente para fins de demonstração.",
    14,
    afterEdges + 15
  );

  doc.save(`confinantes_${lote.iptu.replace(/\./g, "_")}.pdf`);
}
