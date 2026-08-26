import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { IptuLote } from "../data/iptuData";

export function generateCroqui(lote: IptuLote): void {
  const doc = new jsPDF();

  doc.setFillColor(91, 115, 166);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Croqui Dinâmico — Geovisualização Hierárquica", 14, 14);
  doc.setFontSize(9);
  doc.text("IDE SEUMA — Infraestrutura de Dados Espaciais", 14, 21);
  doc.text("Secretaria Municipal de Urbanismo e Meio Ambiente — Fortaleza/CE", 14, 26);
  doc.text(`Emitido em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 31);

  let y = 40;

  // 1. Macrozoneamento
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13);
  doc.text("1. Macrozoneamento (PDC 2018)", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Campo", "Valor"]],
    body: [
      ["Macrozona", lote.macrozona.nome],
      ["Descrição", lote.macrozona.descricao],
      ["Bairro", lote.bairro],
    ],
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 9 },
    columnStyles: { 0: { cellWidth: 40 } },
  });

  y = ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? y + 30;
  y += 10;

  // 2. Zoneamento
  doc.setFontSize(13);
  doc.text("2. Zoneamento", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Campo", "Valor"]],
    body: [
      ["Zona", lote.zoneamento.zona],
      ["Descrição", lote.zoneamento.descricao],
      ["Coef. Básico", String(lote.zoneamento.coeficienteBasico)],
      ["Coef. Máximo", String(lote.zoneamento.coeficienteMaximo)],
      ["Taxa de Ocupação", `${lote.zoneamento.taxaOcupacao}%`],
      ["Gabarito", lote.zoneamento.gabarito],
      ["Usos Permitidos", lote.zoneamento.usosPermitidos.join(", ")],
      ["Usos Restritos", lote.zoneamento.usosRestritos.join(", ")],
    ],
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 8 },
    columnStyles: { 0: { cellWidth: 40 } },
  });

  y = ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? y + 40;
  y += 10;

  // 3. Arruamento
  doc.setFontSize(13);
  doc.text("3. Arruamento e Infraestrutura Viária", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Campo", "Valor"]],
    body: [
      ["Logradouro", lote.arruamento],
      ["Tipo de Via", lote.tipoVia],
      ["Largura da Via", `${lote.larguraVia}m`],
      ["Endereço Completo", lote.endereco],
    ],
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 9 },
    columnStyles: { 0: { cellWidth: 40 } },
  });

  y = ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? y + 25;
  y += 10;

  // Check page break
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  // 4. Situação da Propriedade
  doc.setFontSize(13);
  doc.text("4. Situação da Propriedade", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Campo", "Valor"]],
    body: [
      ["IPTU", lote.iptu],
      ["Endereço", lote.endereco],
      ["Bairro", lote.bairro],
      ["Proprietário", lote.proprietario],
      ["Área do Terreno", `${lote.area} m²`],
      ["Área Edificada", `${lote.areaEdificada} m²`],
      ["Testada", `${lote.testada}m`],
      ["Profundidade", `${lote.profundidade}m`],
      ["Latitude", String(lote.center[0])],
      ["Longitude", String(lote.center[1])],
    ],
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 9 },
    columnStyles: { 0: { cellWidth: 40 } },
  });

  y = ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? y + 50;
  y += 10;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  // 5. Croqui esquemático do lote
  doc.setFontSize(13);
  doc.text("5. Croqui Esquemático do Lote", 14, y);
  y += 8;

  const croquiX = 40;
  const croquiY = y;
  const croquiW = 60;
  const croquiH = 40;

  // Draw lot rectangle
  doc.setDrawColor(91, 115, 166);
  doc.setLineWidth(0.8);
  doc.rect(croquiX, croquiY, croquiW, croquiH);

  // Fill with zone color
  const r = parseInt(lote.zoneamento.cor.slice(1, 3), 16);
  const g = parseInt(lote.zoneamento.cor.slice(3, 5), 16);
  const b = parseInt(lote.zoneamento.cor.slice(5, 7), 16);
  doc.setFillColor(r, g, b);
  doc.setDrawColor(91, 115, 166);
  doc.rect(croquiX + 1, croquiY + 1, croquiW - 2, croquiH - 2, "F");

  // Lot dimensions
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text(`${lote.testada}m`, croquiX + croquiW / 2 - 5, croquiY - 2);
  doc.text(`${lote.profundidade}m`, croquiX + croquiW + 3, croquiY + croquiH / 2);
  doc.text(`${lote.area} m²`, croquiX + croquiW / 2 - 8, croquiY + croquiH / 2 + 2);

  // Street label
  doc.setFontSize(7);
  doc.setTextColor(100);
  doc.text(lote.arruamento, croquiX, croquiY + croquiH + 6);
  doc.text(`(${lote.tipoVia} - ${lote.larguraVia}m)`, croquiX, croquiY + croquiH + 10);

  // North arrow
  doc.setFontSize(9);
  doc.setTextColor(0);
  doc.text("N", croquiX + croquiW + 15, croquiY + 5);
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(croquiX + croquiW + 17, croquiY + 7, croquiX + croquiW + 17, croquiY + 18);
  doc.line(croquiX + croquiW + 17, croquiY + 7, croquiX + croquiW + 15, croquiY + 11);
  doc.line(croquiX + croquiW + 17, croquiY + 7, croquiX + croquiW + 19, croquiY + 11);

  // Zone legend
  doc.setFontSize(8);
  doc.text(`Zona: ${lote.zoneamento.zona}`, croquiX + croquiW + 8, croquiY + 28);
  doc.text(`Macrozona: ${lote.macrozona.nome.substring(0, 25)}`, croquiX + croquiW + 8, croquiY + 33);

  y = croquiY + croquiH + 18;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Este croqui foi gerado automaticamente pelo sistema IDE SEUMA — Geovisualização Hierárquica.",
    14,
    y
  );
  doc.text(
    "Os dados são fictícios e destinados exclusivamente para fins de demonstração.",
    14,
    y + 5
  );

  doc.save(`croqui_hierarquico_${lote.iptu.replace(/\./g, "_")}.pdf`);
}
