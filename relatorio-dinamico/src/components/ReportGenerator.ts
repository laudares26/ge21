import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { IptuLote } from "../data/iptuData";

export function generatePDF(lote: IptuLote): void {
  const doc = new jsPDF();

  doc.setFillColor(91, 115, 166);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Relatório Dinâmico — Licenciamento Digital", 14, 15);
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
      ["Nº de Processos", String(lote.processos.length)],
    ],
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 9 },
  });

  const afterImovel =
    ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 100;

  doc.setFontSize(13);
  doc.text("Processos de Licenciamento", 14, afterImovel + 12);

  autoTable(doc, {
    startY: afterImovel + 16,
    head: [["Protocolo", "Tipo", "Status", "Data", "Atividade", "Responsável"]],
    body: lote.processos.map((p) => [
      p.protocolo,
      p.tipo,
      p.status,
      new Date(p.dataAbertura).toLocaleDateString("pt-BR"),
      p.atividade,
      p.responsavel,
    ]),
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 8, cellPadding: 3 },
  });

  const afterProcessos =
    ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 180;

  doc.setFontSize(13);
  doc.text("Resumo de Licenciamento", 14, afterProcessos + 12);

  const statusCount: Record<string, number> = {};
  lote.processos.forEach((p) => {
    statusCount[p.status] = (statusCount[p.status] || 0) + 1;
  });

  autoTable(doc, {
    startY: afterProcessos + 16,
    head: [["Status", "Quantidade"]],
    body: Object.entries(statusCount).map(([k, v]) => [k, String(v)]),
    theme: "grid",
    headStyles: { fillColor: [91, 115, 166] },
    styles: { fontSize: 9 },
  });

  const afterResume =
    ((doc as unknown as Record<string, { finalY: number }>).lastAutoTable)?.finalY ?? 220;

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Este relatório foi gerado automaticamente pelo sistema IDE SEUMA — Relatórios Dinâmicos do Licenciamento Digital.",
    14,
    afterResume + 10
  );
  doc.text(
    "Os dados são fictícios e destinados exclusivamente para fins de demonstração.",
    14,
    afterResume + 15
  );

  doc.save(`relatorio_dinamico_${lote.iptu.replace(/\./g, "_")}.pdf`);
}
