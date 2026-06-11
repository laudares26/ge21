import { Table, Button, Tag } from "antd";
import { EnvironmentOutlined, FilePdfOutlined, CloseOutlined } from "@ant-design/icons";
import type { LoteComConfinantes } from "../data/iptuData";

interface IptuPanelProps {
  lotes: LoteComConfinantes[];
  selectedIptu: string | null;
  onSelect: (iptu: string) => void;
  onReport: (iptu: string) => void;
  onClose: () => void;
}

export default function IptuPanel({ lotes, selectedIptu, onSelect, onReport, onClose }: IptuPanelProps) {
  const columns = [
    {
      title: "IPTU",
      dataIndex: "iptu",
      key: "iptu",
      width: 130,
      render: (text: string) => (
        <Tag color={text === selectedIptu ? "blue" : "default"}>{text}</Tag>
      ),
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
      ellipsis: true,
    },
    {
      title: "Área (m²)",
      dataIndex: "area",
      key: "area",
      width: 90,
    },
    {
      title: "Ações",
      key: "acoes",
      width: 180,
      render: (_: unknown, record: LoteComConfinantes) => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button
            size="small"
            icon={<EnvironmentOutlined />}
            onClick={(e) => { e.stopPropagation(); onSelect(record.iptu); }}
            type={record.iptu === selectedIptu ? "primary" : "default"}
          >
            Ver
          </Button>
          <Button
            size="small"
            icon={<FilePdfOutlined />}
            onClick={(e) => { e.stopPropagation(); onReport(record.iptu); }}
            style={{ color: "#c41d7f" }}
          >
            Confinantes
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={{ fontWeight: 600, color: "#fff" }}>
          <EnvironmentOutlined /> IPTU — Resultados ({lotes.length})
        </span>
        <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
      </div>
      <Table
        dataSource={lotes}
        columns={columns}
        rowKey="iptu"
        size="small"
        pagination={false}
        scroll={{ y: 200 }}
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
    background: "#2e7d6e",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
