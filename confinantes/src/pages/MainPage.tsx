import { useState, useMemo } from "react";
import { Input, Button, message, Tooltip } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  HomeOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import MapView from "../components/MapView";
import IptuPanel from "../components/IptuPanel";
import ConfinantesPanel from "../components/ConfinantesPanel";
import { iptuLotes } from "../data/iptuData";
import { calculateEdges, generatePDF } from "../components/ReportGenerator";
import type { LoteComConfinantes } from "../data/iptuData";

export default function MainPage() {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchIptu, setSearchIptu] = useState("");
  const [filteredLotes, setFilteredLotes] = useState<LoteComConfinantes[]>([]);
  const [selectedIptu, setSelectedIptu] = useState<string | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showConfinantes, setShowConfinantes] = useState(false);
  const [showEdgeLabels, setShowEdgeLabels] = useState(false);

  const selectedLote = useMemo(
    () => iptuLotes.find((l) => l.iptu === selectedIptu) || null,
    [selectedIptu]
  );

  const edges = useMemo(
    () => (selectedLote ? calculateEdges(selectedLote) : []),
    [selectedLote]
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
    const results = iptuLotes.filter((l) => l.iptu.includes(searchIptu.trim()));
    setFilteredLotes(results);
    setShowResults(true);
    if (results.length === 0) message.info("IPTU não encontrado");
    else if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
      setFlyKey((k) => k + 1);
    }
  };

  const handleSelectLote = (iptu: string) => {
    setSelectedIptu(iptu);
    setFlyKey((k) => k + 1);
  };

  const handleReport = (iptu: string) => {
    const lote = iptuLotes.find((l) => l.iptu === iptu);
    if (!lote) return;
    const e = calculateEdges(lote);
    generatePDF(lote, e);
    message.success("Relatório de confinantes gerado com sucesso!");
  };

  const handleShowConfinantes = () => {
    if (!selectedLote) {
      message.info("Selecione um lote primeiro");
      return;
    }
    setShowConfinantes(true);
    setShowEdgeLabels(true);
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
            <AppstoreOutlined style={{ fontSize: 28, color: "#2e7d6e" }} />
            <div>
              <strong style={{ fontSize: 16 }}>IDE SEUMA</strong>
              <br />
              <span style={{ fontSize: 9, color: "#666" }}>
                Infraestrutura de Dados Espaciais
              </span>
            </div>
          </div>
          <h3 style={styles.title}>Gera-Confinantes</h3>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchGroup}>
            <Input
              placeholder="Pesquise pelo endereço"
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
              placeholder="Pesquise pelo número de IPTU"
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
        {/* Side buttons */}
        <div style={styles.sideButtons}>
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
          <Tooltip title="Zoom inicial">
            <Button
              shape="circle"
              icon={<HomeOutlined />}
              style={styles.sideBtn}
            />
          </Tooltip>
          <Tooltip title="Ver confinantes do lote selecionado">
            <Button
              shape="circle"
              icon={<CompassOutlined />}
              onClick={handleShowConfinantes}
              type={showConfinantes ? "primary" : "default"}
              style={styles.sideBtn}
            />
          </Tooltip>
          <Tooltip title="Mostrar/ocultar vértices e arestas">
            <Button
              shape="circle"
              icon={<AppstoreOutlined />}
              onClick={() => setShowEdgeLabels(!showEdgeLabels)}
              type={showEdgeLabels ? "primary" : "default"}
              style={styles.sideBtn}
            />
          </Tooltip>
        </div>

        {/* Map */}
        <MapView
          allLotes={iptuLotes}
          selectedLote={selectedLote}
          onLoteClick={handleSelectLote}
          flyKey={flyKey}
          showEdgeLabels={showEdgeLabels}
        />

        {/* Confinantes Panel */}
        {showConfinantes && selectedLote && (
          <ConfinantesPanel
            lote={selectedLote}
            edges={edges}
            onReport={() => handleReport(selectedLote.iptu)}
            onClose={() => {
              setShowConfinantes(false);
              setShowEdgeLabels(false);
            }}
          />
        )}

        {/* Results Panel */}
        {showResults && filteredLotes.length > 0 && !showConfinantes && (
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
        {selectedLote && (
          <span style={{ marginLeft: 20, color: "#2e7d6e" }}>
            IPTU: {selectedLote.iptu} | {selectedLote.endereco}
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
