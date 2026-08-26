import { Table, Button, Tag } from "antd";
import { EnvironmentOutlined, CloseOutlined } from "@ant-design/icons";
import type { IptuLote } from "../data/iptuData";

interface IptuPanelProps {
  lotes: IptuLote[];
  selectedIptu: string | null;
  onSelect: (iptu: string) => void;
  onClose: () => void;
}

export default function IptuPanel({ lotes, selectedIptu, onSelect, onClose }: IptuPanelProps) {
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
      title: "Zoneamento",
      dataIndex: "zoneamento",
      key: "zoneamento",
      width: 100,
      render: (text: string) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Ação",
      key: "acoes",
      width: 80,
      render: (_: unknown, record: IptuLote) => (
        <Button
          size="small"
          icon={<EnvironmentOutlined />}
          onClick={(e) => { e.stopPropagation(); onSelect(record.iptu); }}
          type={record.iptu === selectedIptu ? "primary" : "default"}
        >
          Ver
        </Button>
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
    maxHeight: 280,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#5b8def",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
