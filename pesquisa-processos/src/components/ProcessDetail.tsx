import { Tag, Descriptions, Table, Button } from "antd";
import { CloseOutlined, FilePdfOutlined, FileOutlined } from "@ant-design/icons";
import type { IptuLote, LicenciamentoProcess, ProcessDocument } from "../data/iptuData";

interface ProcessDetailProps {
  lote: IptuLote;
  processo: LicenciamentoProcess;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  Aprovado: "green",
  "Em Análise": "blue",
  Indeferido: "red",
  Pendente: "orange",
};

export default function ProcessDetail({ lote, processo, onClose }: ProcessDetailProps) {
  const docColumns = [
    {
      title: "Documento",
      dataIndex: "nome",
      key: "nome",
      render: (text: string, record: ProcessDocument) => (
        <span style={{ fontSize: 12 }}>
          {record.tipo === "PDF" ? (
            <FilePdfOutlined style={{ color: "#cf1322", marginRight: 6 }} />
          ) : (
            <FileOutlined style={{ color: "#1890ff", marginRight: 6 }} />
          )}
          {text}
        </span>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      width: 60,
      render: (text: string) => <Tag style={{ fontSize: 10 }}>{text}</Tag>,
    },
    {
      title: "Data Upload",
      dataIndex: "dataUpload",
      key: "dataUpload",
      width: 100,
      render: (d: string) => (
        <span style={{ fontSize: 11 }}>
          {new Date(d).toLocaleDateString("pt-BR")}
        </span>
      ),
    },
    {
      title: "Ação",
      key: "action",
      width: 70,
      render: () => (
        <Button type="link" size="small" style={{ fontSize: 11 }}>
          Abrir
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <strong style={{ color: "#fff", fontSize: 13 }}>
          Detalhes do Processo — {processo.protocolo}
        </strong>
        <CloseOutlined
          onClick={onClose}
          style={{ color: "#fff", cursor: "pointer" }}
        />
      </div>
      <div style={styles.body}>
        <Descriptions
          size="small"
          column={2}
          bordered
          style={{ marginBottom: 12 }}
          labelStyle={{ fontSize: 11, fontWeight: 600, background: "#fafafa" }}
          contentStyle={{ fontSize: 11 }}
        >
          <Descriptions.Item label="Protocolo">{processo.protocolo}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={statusColors[processo.status]}>{processo.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Tipo">{processo.tipo}</Descriptions.Item>
          <Descriptions.Item label="Data Abertura">
            {new Date(processo.dataAbertura).toLocaleDateString("pt-BR")}
          </Descriptions.Item>
          <Descriptions.Item label="Atividade">{processo.atividade}</Descriptions.Item>
          <Descriptions.Item label="Responsável">{processo.responsavel}</Descriptions.Item>
          <Descriptions.Item label="IPTU">{lote.iptu}</Descriptions.Item>
          <Descriptions.Item label="Endereço">{lote.endereco}</Descriptions.Item>
          <Descriptions.Item label="Proprietário">{lote.proprietario}</Descriptions.Item>
          <Descriptions.Item label="Zoneamento">{lote.zoneamento}</Descriptions.Item>
        </Descriptions>

        <h4 style={{ margin: "8px 0 4px", fontSize: 13 }}>
          Documentos Anexados ({processo.documentos.length})
        </h4>
        <Table
          dataSource={processo.documentos}
          columns={docColumns}
          rowKey="nome"
          size="small"
          pagination={false}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 460,
    background: "#fff",
    zIndex: 1000,
    boxShadow: "-2px 0 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#5b73a6",
    padding: "10px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
  },
};
