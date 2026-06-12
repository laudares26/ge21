import { useState, useMemo, useCallback } from "react";
import { Input, Button, message, Tooltip, Table, Tag } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import MapView from "../components/MapView";
import LayersPanel from "../components/LayersPanel";
import HierarchyPanel from "../components/HierarchyPanel";
import { iptuLotes } from "../data/iptuData";
import { defaultLayers } from "../data/layersData";
import { generateCroqui } from "../components/CroquiGenerator";
import type { MapLayer } from "../data/layersData";
import type { IptuLote } from "../data/iptuData";

export default function MainPage() {
  const [searchText, setSearchText] = useState("");
  const [layers, setLayers] = useState<MapLayer[]>(defaultLayers);
  const [selectedIptu, setSelectedIptu] = useState<string | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const [showLayers, setShowLayers] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [searchResults, setSearchResults] = useState<IptuLote[] | null>(null);

  const selectedLote = useMemo(
    () => iptuLotes.find((l) => l.iptu === selectedIptu) || null,
    [selectedIptu]
  );

  const handleToggleLayer = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  }, []);

  const handleOpacityLayer = useCallback((id: string, value: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity: value } : l))
    );
  }, []);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchResults(null);
      return;
    }
    const q = searchText.toLowerCase().trim();
    const results = iptuLotes.filter(
      (l) =>
        l.iptu.includes(q) ||
        l.endereco.toLowerCase().includes(q) ||
        l.bairro.toLowerCase().includes(q)
    );
    if (results.length === 0) {
      message.info("Nenhum imóvel encontrado");
      setSearchResults([]);
    } else if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
      setFlyKey((k) => k + 1);
      setShowHierarchy(true);
      setSearchResults(null);
    } else {
      setSearchResults(results);
    }
  };

  const handleSelectLote = (iptu: string) => {
    setSelectedIptu(iptu);
    setFlyKey((k) => k + 1);
    setShowHierarchy(true);
    setSearchResults(null);
  };

  const resultColumns = [
    {
      title: "IPTU",
      dataIndex: "iptu",
      key: "iptu",
      width: 120,
      render: (text: string) => <span style={{ fontWeight: 600, fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
      render: (text: string) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Zona",
      key: "zona",
      width: 80,
      render: (_: unknown, record: IptuLote) => (
        <Tag color={record.zoneamento.cor} style={{ fontSize: 10 }}>
          {record.zoneamento.zona}
        </Tag>
      ),
    },
    {
      title: "Área",
      dataIndex: "area",
      key: "area",
      width: 80,
      render: (a: number) => <span style={{ fontSize: 11 }}>{a} m²</span>,
    },
    {
      title: "",
      key: "actions",
      width: 60,
      render: (_: unknown, record: IptuLote) => (
        <div style={{ display: "flex", gap: 2 }}>
          <Button
            type="link"
            size="small"
            icon={<EnvironmentOutlined />}
            onClick={(e) => { e.stopPropagation(); handleSelectLote(record.iptu); }}
          />
          <Button
            type="link"
            size="small"
            icon={<FilePdfOutlined />}
            onClick={(e) => { e.stopPropagation(); generateCroqui(record); message.success("Croqui gerado!"); }}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <img
            src="/logo-prefeitura.svg"
            alt="Prefeitura"
            style={{ height: 44 }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div style={styles.ideLabel}>
            <AppstoreOutlined style={{ fontSize: 28, color: "#5b73a6" }} />
            <div>
              <strong style={{ fontSize: 16 }}>IDE SEUMA</strong>
              <br />
              <span style={{ fontSize: 9, color: "#666" }}>
                Infraestrutura de Dados Espaciais
              </span>
            </div>
          </div>
          <h3 style={styles.title}>Geovisualização Hierárquica</h3>
        </div>
        <div style={styles.headerRight}>
          <Input
            placeholder="Insira o número de IPTU ou endereço"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            suffix={
              <SearchOutlined
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
              />
            }
            style={{ width: 300 }}
            size="small"
          />
        </div>
      </header>

      {/* MAP AREA */}
      <div style={styles.mapArea}>
        {/* Left buttons */}
        <div style={styles.sideButtonsLeft}>
          <Tooltip title="Painel de Camadas">
            <Button
              shape="circle"
              icon={<AppstoreOutlined />}
              onClick={() => setShowLayers(!showLayers)}
              type={showLayers ? "primary" : "default"}
              style={styles.sideBtn}
            />
          </Tooltip>
          <Tooltip title="Zoom inicial">
            <Button
              shape="circle"
              icon={<HomeOutlined />}
              style={styles.sideBtn}
            />
          </Tooltip>
        </div>

        {/* Layers Panel */}
        {showLayers && (
          <LayersPanel
            layers={layers}
            onToggle={handleToggleLayer}
            onOpacity={handleOpacityLayer}
            onClose={() => setShowLayers(false)}
          />
        )}

        {/* Map */}
        <MapView
          layers={layers}
          selectedLote={selectedLote}
          allLotes={iptuLotes}
          onLoteClick={handleSelectLote}
          flyKey={flyKey}
        />

        {/* Hierarchy Panel */}
        {showHierarchy && selectedLote && (
          <HierarchyPanel
            lote={selectedLote}
            onClose={() => setShowHierarchy(false)}
          />
        )}

        {/* Search Results Panel */}
        {searchResults && searchResults.length > 0 && (
          <div style={styles.resultsPanel}>
            <div style={styles.resultsHeader}>
              <strong style={{ color: "#fff", fontSize: 13 }}>
                Resultados da Pesquisa ({searchResults.length})
              </strong>
              <span
                onClick={() => setSearchResults(null)}
                style={{ color: "#fff", cursor: "pointer", fontSize: 18 }}
              >
                ×
              </span>
            </div>
            <div style={{ padding: 8, overflowY: "auto", flex: 1 }}>
              <Table
                dataSource={searchResults}
                columns={resultColumns}
                rowKey="iptu"
                size="small"
                pagination={false}
                onRow={(record) => ({
                  onClick: () => handleSelectLote(record.iptu),
                  style: { cursor: "pointer" },
                })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>Lat: {selectedLote ? selectedLote.center[0].toFixed(4) : "-"}</span>
        <span>Long: {selectedLote ? selectedLote.center[1].toFixed(4) : "-"}</span>
        {selectedLote && (
          <span style={{ marginLeft: 20, color: "#5b73a6" }}>
            IPTU: {selectedLote.iptu} | {selectedLote.endereco} |{" "}
            <Tag color={selectedLote.zoneamento.cor} style={{ fontSize: 10 }}>
              {selectedLote.zoneamento.zona}
            </Tag>
          </span>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e8e8e8",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1100,
    flexWrap: "wrap",
    gap: 8,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  ideLabel: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 400,
    color: "#333",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  mapArea: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  sideButtonsLeft: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 800,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  sideBtn: {
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  resultsPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 280,
    background: "#fff",
    zIndex: 900,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
  },
  resultsHeader: {
    background: "#5b73a6",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    background: "#f5f5f5",
    padding: "4px 16px",
    display: "flex",
    gap: 20,
    fontSize: 12,
    color: "#666",
    borderTop: "1px solid #e8e8e8",
    alignItems: "center",
  },
};
