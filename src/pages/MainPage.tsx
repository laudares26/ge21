import { useState, useMemo } from "react";
import { Input, Button, message, Tooltip } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import MapView from "../components/MapView";
import LayersPanel from "../components/LayersPanel";
import IptuPanel from "../components/IptuPanel";
import { defaultLayers } from "../data/layersData";
import { iptuLotes } from "../data/iptuData";
import { analyzeNeighborhood, generatePDF } from "../components/ReportGenerator";
import type { MapLayer } from "../data/layersData";
import type { IptuLote } from "../data/iptuData";

export default function MainPage() {
  const [layers, setLayers] = useState<MapLayer[]>(defaultLayers);
  const [showLayers, setShowLayers] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchIptu, setSearchIptu] = useState("");
  const [filteredLotes, setFilteredLotes] = useState<IptuLote[]>([]);
  const [selectedIptu, setSelectedIptu] = useState<string | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const selectedLote = useMemo(
    () => iptuLotes.find((l) => l.iptu === selectedIptu) || null,
    [selectedIptu]
  );

  const handleSearchAddress = () => {
    if (!searchAddress.trim()) {
      setFilteredLotes(iptuLotes);
      setShowResults(true);
      return;
    }
    const q = searchAddress.toLowerCase();
    const results = iptuLotes.filter(
      (l) =>
        l.endereco.toLowerCase().includes(q) ||
        l.bairro.toLowerCase().includes(q)
    );
    setFilteredLotes(results);
    setShowResults(true);
    if (results.length === 0) message.info("Nenhum imóvel encontrado");
  };

  const handleSearchIptu = () => {
    if (!searchIptu.trim()) {
      setFilteredLotes(iptuLotes);
      setShowResults(true);
      return;
    }
    const results = iptuLotes.filter((l) =>
      l.iptu.includes(searchIptu.trim())
    );
    setFilteredLotes(results);
    setShowResults(true);
    if (results.length === 0) message.info("IPTU não encontrado");
    else if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
    }
  };

  const handleSelectLote = (iptu: string) => {
    setSelectedIptu(iptu);
    setFlyKey((k) => k + 1);
  };

  const handleReport = async (iptu: string) => {
    const lote = iptuLotes.find((l) => l.iptu === iptu);
    if (!lote) return;
    message.loading({ content: "Consultando camadas reais no GeoServer...", key: "report" });
    const analysis = await analyzeNeighborhood(lote, layers);
    generatePDF(lote, analysis);
    message.success({ content: "Relatório gerado com sucesso!", key: "report" });
  };

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const setLayerOpacity = (id: string, val: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity: val } : l))
    );
  };

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
            <AppstoreOutlined style={{ fontSize: 28, color: "#1890ff" }} />
            <div>
              <strong style={{ fontSize: 16 }}>IDE SEUMA</strong>
              <br />
              <span style={{ fontSize: 9, color: "#666" }}>
                Infraestrutura de Dados Espaciais
              </span>
            </div>
          </div>
          <h3 style={styles.title}>Análise de Vizinhança</h3>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchGroup}>
            <Input
              placeholder="Pesquise o endereço"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onPressEnter={handleSearchAddress}
              suffix={
                <SearchOutlined
                  onClick={handleSearchAddress}
                  style={{ cursor: "pointer" }}
                />
              }
              style={{ width: 240 }}
            />
            <Input
              placeholder="Pesquise pelo número de IPTU (ex.: 0001.001.001)"
              value={searchIptu}
              onChange={(e) => setSearchIptu(e.target.value)}
              onPressEnter={handleSearchIptu}
              suffix={
                <SearchOutlined
                  onClick={handleSearchIptu}
                  style={{ cursor: "pointer" }}
                />
              }
              style={{ width: 240 }}
            />
          </div>

        </div>
      </header>

      {/* MAP AREA */}
      <div style={styles.mapArea}>
        <div style={styles.dataNotice}>
          Camadas do mapa: dados reais de Fortaleza (GeoServer IDE SEUMA —
          Quadras, Lotes, Edificações SEFIN, UC, Hidrografia etc.). Os registros
          de IPTU listados são fictícios, apenas para demonstração da consulta.
        </div>
        {/* Left side buttons */}
        <div style={styles.sideButtons}>
          <Tooltip title="Painel de Camadas">
            <Button
              shape="circle"
              icon={<AppstoreOutlined />}
              onClick={() => setShowLayers(!showLayers)}
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
          <Tooltip title="Listar todos os IPTUs">
            <Button
              shape="circle"
              icon={<EnvironmentOutlined />}
              onClick={() => {
                setFilteredLotes(iptuLotes);
                setShowResults(true);
              }}
              style={styles.sideBtn}
            />
          </Tooltip>
        </div>

        {/* Map */}
        <MapView
          layers={layers}
          selectedLote={selectedLote}
          allLotes={iptuLotes}
          onLoteClick={handleSelectLote}
          flyKey={flyKey}
        />

        {/* Layers Panel */}
        {showLayers && (
          <LayersPanel
            layers={layers}
            onToggle={toggleLayer}
            onOpacity={setLayerOpacity}
            onClose={() => setShowLayers(false)}
          />
        )}

        {/* Results Panel */}
        {showResults && filteredLotes.length > 0 && (
          <IptuPanel
            lotes={filteredLotes}
            selectedIptu={selectedIptu}
            onSelect={handleSelectLote}
            onReport={handleReport}
            onClose={() => setShowResults(false)}
          />
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>Lat: {selectedLote ? selectedLote.center[0].toFixed(4) : "-"}</span>
        <span>Long: {selectedLote ? selectedLote.center[1].toFixed(4) : "-"}</span>
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
    fontSize: 20,
    fontWeight: 400,
    color: "#333",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  searchGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mapArea: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  sideButtons: {
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
  dataNotice: {
    position: "absolute",
    bottom: 8,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 900,
    background: "rgba(255,255,255,0.92)",
    padding: "6px 14px",
    borderRadius: 6,
    fontSize: 11,
    color: "#555",
    maxWidth: 640,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  footer: {
    background: "#f5f5f5",
    padding: "4px 16px",
    display: "flex",
    gap: 20,
    fontSize: 12,
    color: "#666",
    borderTop: "1px solid #e8e8e8",
  },
};
