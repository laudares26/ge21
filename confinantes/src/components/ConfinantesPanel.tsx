import { Button, Table, Tag, Divider } from "antd";
import { FilePdfOutlined, CloseOutlined, CompassOutlined } from "@ant-design/icons";
import type { LoteComConfinantes } from "../data/iptuData";
import type { EdgeInfo } from "./ReportGenerator";

interface ConfinantesPanelProps {
  lote: LoteComConfinantes;
  edges: EdgeInfo[];
  onReport: () => void;
  onClose: () => void;
}

export default function ConfinantesPanel({ lote, edges, onReport, onClose }: ConfinantesPanelProps) {
  const confColumns = [
    {
      title: "Direção",
      dataIndex: "direcao",
      key: "direcao",
      width: 80,
      render: (text: string) => {
        const colorMap: Record<string, string> = {
          Norte: "blue",
          Sul: "red",
          Leste: "green",
          Oeste: "orange",
        };
        return <Tag color={colorMap[text] || "default"}>{text}</Tag>;
      },
    },
    {
      title: "IPTU",
      dataIndex: "iptu",
      key: "iptu",
      width: 120,
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
      ellipsis: true,
    },
    {
      title: "Proprietário",
      dataIndex: "proprietario",
      key: "proprietario",
      width: 140,
      ellipsis: true,
    },
  ];

  const edgeColumns = [
    {
      title: "Aresta",
      key: "aresta",
      width: 55,
      render: (_: unknown, __: unknown, idx: number) => (
        <Tag color="cyan">A{idx + 1}</Tag>
      ),
    },
    {
      title: "Comprimento",
      dataIndex: "comprimento",
      key: "comprimento",
      width: 100,
    },
    {
      title: "Azimute",
      dataIndex: "azimute",
      key: "azimute",
      width: 90,
    },
    {
      title: "Rumo",
      dataIndex: "rumo",
      key: "rumo",
      width: 110,
    },
    {
      title: "Direção",
      dataIndex: "direcao",
      key: "direcao",
      width: 80,
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>
          <CompassOutlined /> Confinantes — IPTU {lote.iptu}
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button
            size="small"
            icon={<FilePdfOutlined />}
            onClick={onReport}
            style={{ background: "#fff", color: "#c41d7f", borderColor: "#c41d7f" }}
          >
            Gerar PDF
          </Button>
          <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
        </div>
      </div>
      <div style={styles.body}>
        <div style={{ marginBottom: 4 }}>
          <strong style={{ fontSize: 12 }}>Confrontantes</strong>
        </div>
        <Table
          dataSource={lote.confinantes}
          columns={confColumns}
          rowKey="iptu"
          size="small"
          pagination={false}
          style={{ fontSize: 11 }}
        />
        <Divider style={{ margin: "8px 0" }} />
        <div style={{ marginBottom: 4 }}>
          <strong style={{ fontSize: 12 }}>Arestas do Polígono — Azimute e Rumo</strong>
        </div>
        <Table
          dataSource={edges}
          columns={edgeColumns}
          rowKey="verticeA"
          size="small"
          pagination={false}
          style={{ fontSize: 11 }}
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
    width: 520,
    maxHeight: "calc(100vh - 120px)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#2e7d6e",
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
