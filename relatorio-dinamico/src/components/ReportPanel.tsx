import { Table, Tag, Button } from "antd";
import {
  CloseOutlined,
  FilePdfOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { IptuLote, LicenciamentoProcess } from "../data/iptuData";

interface ReportPanelProps {
  lotes: IptuLote[];
  selectedIptu: string | null;
  onSelect: (iptu: string) => void;
  onReport: (iptu: string) => void;
  onClose: () => void;
}

function statusColor(status: string): string {
  switch (status) {
    case "Aprovado": return "green";
    case "Em Análise": return "blue";
    case "Pendente": return "orange";
    case "Indeferido": return "red";
    default: return "default";
  }
}

export default function ReportPanel({ lotes, selectedIptu, onSelect, onReport, onClose }: ReportPanelProps) {
  const allProcesses = lotes.flatMap((l) =>
    l.processos.map((p) => ({
      ...p,
      iptu: l.iptu,
      endereco: l.endereco,
      bairro: l.bairro,
    }))
  );

  const columns = [
    {
      title: "Protocolo",
      dataIndex: "protocolo",
      key: "protocolo",
      width: 150,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "IPTU",
      dataIndex: "iptu",
      key: "iptu",
      width: 120,
      render: (text: string) => (
        <Tag
          color={text === selectedIptu ? "cyan" : "default"}
          style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onSelect(text); }}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      width: 160,
    },
    {
      title: "Atividade",
      dataIndex: "atividade",
      key: "atividade",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (text: string) => <Tag color={statusColor(text)}>{text}</Tag>,
    },
    {
      title: "Data",
      dataIndex: "dataAbertura",
      key: "dataAbertura",
      width: 100,
      render: (text: string) => new Date(text).toLocaleDateString("pt-BR"),
    },
    {
      title: "Ações",
      key: "acoes",
      width: 120,
      render: (_: unknown, record: LicenciamentoProcess & { iptu: string }) => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button
            size="small"
            icon={<EnvironmentOutlined />}
            onClick={(e) => { e.stopPropagation(); onSelect(record.iptu); }}
            title="Ver no mapa"
          />
          <Button
            size="small"
            icon={<FilePdfOutlined />}
            onClick={(e) => { e.stopPropagation(); onReport(record.iptu); }}
            style={{ color: "#c41d7f" }}
            title="Gerar relatório"
          />
        </div>
      ),
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={{ fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined />
          Relatório Dinâmico ({allProcesses.length} processos em {lotes.length} lotes)
        </span>
        <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
      </div>
      <Table
        dataSource={allProcesses}
        columns={columns}
        rowKey="protocolo"
        size="small"
        pagination={false}
        scroll={{ y: 180 }}
        onRow={(record) => ({
          onClick: () => onSelect(record.iptu),
          style: {
            cursor: "pointer",
            background: record.iptu === selectedIptu ? "#e6f7ff" : undefined,
          },
        })}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    background: "#fff",
    zIndex: 900,
    boxShadow: "0 -4px 16px rgba(0,0,0,0.12)",
    maxHeight: 300,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#5b73a6",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
