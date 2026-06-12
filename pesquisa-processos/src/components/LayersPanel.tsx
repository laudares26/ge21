import { Slider, Switch } from "antd";
import { CloseOutlined, EyeOutlined, MenuOutlined } from "@ant-design/icons";
import type { MapLayer } from "../data/layersData";

interface LayersPanelProps {
  layers: MapLayer[];
  onToggle: (id: string) => void;
  onOpacity: (id: string, value: number) => void;
  onClose: () => void;
}

export default function LayersPanel({ layers, onToggle, onOpacity, onClose }: LayersPanelProps) {
  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
        <strong style={{ color: "#fff" }}>Painel de Camadas</strong>
      </div>
      <div style={styles.body}>
        {layers.map((layer) => (
          <div key={layer.id} style={styles.layerItem}>
            <div style={styles.layerRow}>
              <Switch
                size="small"
                checked={layer.visible}
                onChange={() => onToggle(layer.id)}
                checkedChildren={<EyeOutlined />}
              />
              <MenuOutlined style={{ color: "#aaa", fontSize: 12 }} />
              <span style={{ fontSize: 13 }}>{layer.nome}</span>
            </div>
            <Slider
              min={0}
              max={1}
              step={0.05}
              value={layer.opacity}
              onChange={(v) => onOpacity(layer.id, v)}
              style={{ margin: "4px 8px" }}
              disabled={!layer.visible}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 290,
    background: "#fff",
    zIndex: 1000,
    boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#1890ff",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: 8,
  },
  layerItem: {
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: 4,
    marginBottom: 4,
  },
  layerRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 4px 0",
  },
};
