import { Descriptions, Table, Tag, Button, Divider } from "antd";
import { FilePdfOutlined, CloseOutlined, FileTextOutlined } from "@ant-design/icons";
import type { IptuLote } from "../data/iptuData";

interface LoteDetailProps {
  lote: IptuLote;
  onReport: () => void;
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

export default function LoteDetail({ lote, onReport, onClose }: LoteDetailProps) {
  const columns = [
    {
      title: "Protocolo",
      dataIndex: "protocolo",
      key: "protocolo",
      width: 140,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      width: 150,
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
      title: "Atividade",
      dataIndex: "atividade",
      key: "atividade",
      ellipsis: true,
    },
    {
      title: "Responsável",
      dataIndex: "responsavel",
      key: "responsavel",
      width: 140,
      ellipsis: true,
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>
          <FileTextOutlined /> IPTU {lote.iptu} — Detalhes
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button
            size="small"
            icon={<FilePdfOutlined />}
            onClick={onReport}
            style={{ background: "#fff", color: "#c41d7f", borderColor: "#c41d7f" }}
          >
            Gerar Relatório
          </Button>
          <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
        </div>
      </div>
      <div style={styles.body}>
        <Descriptions size="small" column={2} bordered>
          <Descriptions.Item label="IPTU">{lote.iptu}</Descriptions.Item>
          <Descriptions.Item label="Zoneamento">{lote.zoneamento}</Descriptions.Item>
          <Descriptions.Item label="Endereço" span={2}>{lote.endereco}</Descriptions.Item>
          <Descriptions.Item label="Proprietário">{lote.proprietario}</Descriptions.Item>
          <Descriptions.Item label="Área">{lote.area} m²</Descriptions.Item>
          <Descriptions.Item label="Bairro">{lote.bairro}</Descriptions.Item>
          <Descriptions.Item label="Processos">{lote.processos.length}</Descriptions.Item>
        </Descriptions>

        <Divider style={{ margin: "8px 0" }} />

        <strong style={{ fontSize: 12 }}>Processos de Licenciamento</strong>
        <Table
          dataSource={lote.processos}
          columns={columns}
          rowKey="protocolo"
          size="small"
          pagination={false}
          style={{ marginTop: 6 }}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    top: 10,
    right: 50,
    background: "#fff",
    zIndex: 900,
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    borderRadius: 8,
    overflow: "hidden",
    width: 580,
    maxHeight: "calc(100vh - 120px)",
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
  body: {
    padding: 12,
    overflowY: "auto",
    flex: 1,
  },
};
