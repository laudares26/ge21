import { Table, Tag, Button } from "antd";
import { FileTextOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { IptuLote, LicenciamentoProcess } from "../data/iptuData";

interface FlatProcess extends LicenciamentoProcess {
  iptu: string;
  endereco: string;
  bairro: string;
}

interface ProcessListProps {
  lotes: IptuLote[];
  selectedProtocolo: string | null;
  onSelectProcess: (protocolo: string) => void;
  onLocateLote: (iptu: string) => void;
  onReport: (iptu: string) => void;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  Aprovado: "green",
  "Em Análise": "blue",
  Indeferido: "red",
  Pendente: "orange",
};

export default function ProcessList({
  lotes,
  selectedProtocolo,
  onSelectProcess,
  onLocateLote,
  onReport,
  onClose,
}: ProcessListProps) {
  const flatProcesses: FlatProcess[] = lotes.flatMap((lote) =>
    lote.processos.map((p) => ({
      ...p,
      iptu: lote.iptu,
      endereco: lote.endereco,
      bairro: lote.bairro,
    }))
  );

  const columns = [
    {
      title: "Protocolo",
      dataIndex: "protocolo",
      key: "protocolo",
      width: 150,
      render: (text: string) => (
        <span style={{ fontWeight: 500, fontSize: 12 }}>{text}</span>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      width: 140,
      render: (text: string) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag color={statusColors[status] || "default"} style={{ fontSize: 11 }}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Data",
      dataIndex: "dataAbertura",
      key: "dataAbertura",
      width: 90,
      render: (d: string) => (
        <span style={{ fontSize: 11 }}>
          {new Date(d).toLocaleDateString("pt-BR")}
        </span>
      ),
    },
    {
      title: "Atividade",
      dataIndex: "atividade",
      key: "atividade",
      width: 140,
      render: (text: string) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "IPTU",
      dataIndex: "iptu",
      key: "iptu",
      width: 110,
      render: (text: string) => <span style={{ fontSize: 11 }}>{text}</span>,
    },
    {
      title: "Ações",
      key: "actions",
      width: 80,
      render: (_: unknown, record: FlatProcess) => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button
            type="link"
            size="small"
            icon={<EnvironmentOutlined />}
            onClick={(e) => { e.stopPropagation(); onLocateLote(record.iptu); }}
            title="Localizar no mapa"
          />
          <Button
            type="link"
            size="small"
            icon={<FileTextOutlined />}
            onClick={(e) => { e.stopPropagation(); onReport(record.iptu); }}
            title="Gerar relatório"
          />
        </div>
      ),
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <strong style={{ color: "#fff", fontSize: 13 }}>
          Processos ({flatProcesses.length})
        </strong>
        <span
          onClick={onClose}
          style={{ color: "#fff", cursor: "pointer", fontSize: 18 }}
        >
          ×
        </span>
      </div>
      <div style={styles.body}>
        <Table
          dataSource={flatProcesses}
          columns={columns}
          rowKey="protocolo"
          size="small"
          pagination={{ pageSize: 8, size: "small" }}
          scroll={{ x: 800 }}
          onRow={(record) => ({
            onClick: () => onSelectProcess(record.protocolo),
            style: {
              cursor: "pointer",
              background:
                record.protocolo === selectedProtocolo ? "#e6f7ff" : undefined,
            },
          })}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 320,
    background: "#fff",
    zIndex: 900,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#5b73a6",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 12px",
  },
};
