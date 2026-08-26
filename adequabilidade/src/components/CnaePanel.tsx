import { Table, Tag, Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import type { CnaeActivity } from "../data/cnaeData";

interface CnaePanelProps {
  activities: CnaeActivity[];
  selectedCnae: CnaeActivity | null;
  onSelect: (activity: CnaeActivity) => void;
  onClose: () => void;
}

export default function CnaePanel({ activities, selectedCnae, onSelect, onClose }: CnaePanelProps) {
  const columns = [
    {
      title: "CNAE",
      dataIndex: "codigo",
      key: "codigo",
      width: 110,
      render: (text: string, record: CnaeActivity) => (
        <Tag color={selectedCnae?.codigo === record.codigo ? "blue" : "default"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Atividade",
      dataIndex: "descricao",
      key: "descricao",
      ellipsis: true,
    },
    {
      title: "Zonas Permitidas",
      key: "zonas",
      width: 200,
      render: (_: unknown, record: CnaeActivity) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {record.zonasPermitidas.map((z) => (
            <Tag key={z} color="green" style={{ fontSize: 10 }}>
              {z}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Ação",
      key: "acao",
      width: 100,
      render: (_: unknown, record: CnaeActivity) => (
        <Button
          size="small"
          type={selectedCnae?.codigo === record.codigo ? "primary" : "default"}
          icon={
            selectedCnae?.codigo === record.codigo ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
          onClick={(e) => {
            e.stopPropagation();
            onSelect(record);
          }}
        >
          {selectedCnae?.codigo === record.codigo ? "Ativo" : "Ver"}
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={{ fontWeight: 600, color: "#fff" }}>
          <CheckCircleOutlined /> Resultados CNAE ({activities.length})
        </span>
        <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
      </div>
      <Table
        dataSource={activities}
        columns={columns}
        rowKey="codigo"
        size="small"
        pagination={false}
        scroll={{ y: 180 }}
        onRow={(record) => ({
          onClick: () => onSelect(record),
          style: {
            cursor: "pointer",
            background: selectedCnae?.codigo === record.codigo ? "#e6f7ff" : undefined,
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
    background: "#1890ff",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
