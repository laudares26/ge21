import { CloseOutlined } from "@ant-design/icons";
import type { ZoningArea } from "../data/zoningData";

interface ZoneLegendProps {
  zones: ZoningArea[];
  highlightedZones: string[];
  onClose: () => void;
}

export default function ZoneLegend({ zones, highlightedZones, onClose }: ZoneLegendProps) {
  const activeZones = zones.filter((z) => highlightedZones.includes(z.id));

  if (activeZones.length === 0) return null;

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <strong style={{ color: "#fff", fontSize: 12 }}>Zonas Permitidas</strong>
        <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#fff", fontSize: 12 }} />
      </div>
      <div style={styles.body}>
        {activeZones.map((z) => (
          <div key={z.id} style={styles.item}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                background: z.color,
                border: `1px solid ${z.color}`,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11 }}>{z.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    bottom: 40,
    right: 10,
    background: "#fff",
    zIndex: 800,
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    borderRadius: 8,
    overflow: "hidden",
    maxWidth: 280,
  },
  header: {
    background: "#1890ff",
    padding: "6px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
};
