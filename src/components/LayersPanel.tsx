import { Slider, Switch } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, UnorderedListOutlined, CloseOutlined } from "@ant-design/icons";
import type { MapLayer } from "../data/layersData";

interface LayersPanelProps {
  layers: MapLayer[];
  onToggle: (id: string) => void;
  onOpacity: (id: string, val: number) => void;
  onClose: () => void;
}

export default function LayersPanel({ layers, onToggle, onOpacity, onClose }: LayersPanelProps) {
  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff" }} />
        <span style={{ fontWeight: 600, color: "#fff" }}>Painel de Camadas</span>
      </div>
      <div style={styles.body}>
        {layers.map((layer) => (
          <div key={layer.id} style={styles.layerRow}>
            <div style={styles.layerTop}>
              <Switch
                size="small"
                checked={layer.visible}
                onChange={() => onToggle(layer.id)}
                checkedChildren={<EyeOutlined />}
                unCheckedChildren={<EyeInvisibleOutlined />}
              />
              <UnorderedListOutlined style={{ color: layer.color, marginLeft: 8 }} />
              <span style={styles.layerName}>{layer.name}</span>
            </div>
            {layer.visible && (
              <Slider
                min={0}
                max={100}
                value={layer.opacity * 100}
                onChange={(v) => onOpacity(layer.id, v / 100)}
                style={{ margin: "0 4px" }}
                tooltip={{ formatter: (v) => `${v}%` }}
              />
            )}
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
    width: 320,
    background: "#fff",
    zIndex: 1000,
    boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#1890ff",
    padding: "12px 16px",
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: 12,
  },
  layerRow: {
    borderBottom: "1px solid #f0f0f0",
    padding: "8px 0",
  },
  layerTop: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  layerName: {
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },
};
