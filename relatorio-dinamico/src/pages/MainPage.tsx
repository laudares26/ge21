import { useState, useMemo, useCallback } from "react";
import { Input, Button, message, Tooltip } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  HomeOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import MapView from "../components/MapView";
import LayersPanel from "../components/LayersPanel";
import ReportPanel from "../components/ReportPanel";
import LoteDetail from "../components/LoteDetail";
import AdvancedSearch from "../components/AdvancedSearch";
import { iptuLotes } from "../data/iptuData";
import { defaultLayers } from "../data/layersData";
import { generatePDF } from "../components/ReportGenerator";
import type { MapLayer } from "../data/layersData";
import type { IptuLote } from "../data/iptuData";
import type { AdvancedSearchValues } from "../components/AdvancedSearch";

export default function MainPage() {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchIptu, setSearchIptu] = useState("");
  const [layers, setLayers] = useState<MapLayer[]>(defaultLayers);
  const [selectedIptu, setSelectedIptu] = useState<string | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const [filteredLotes, setFilteredLotes] = useState<IptuLote[]>(iptuLotes);
  const [showLayers, setShowLayers] = useState(false);
  const [showReport, setShowReport] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const handleSearchAddress = () => {
    if (!searchAddress.trim()) {
      setFilteredLotes(iptuLotes);
      setShowReport(true);
      return;
    }
    const q = searchAddress.toLowerCase();
    const results = iptuLotes.filter(
      (l) =>
        l.endereco.toLowerCase().includes(q) ||
        l.bairro.toLowerCase().includes(q)
    );
    setFilteredLotes(results);
    setShowReport(true);
    if (results.length === 0) message.info("Nenhum imóvel encontrado");
    if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
      setFlyKey((k) => k + 1);
    }
  };

  const handleSearchIptu = () => {
    if (!searchIptu.trim()) {
      setFilteredLotes(iptuLotes);
      setShowReport(true);
      return;
    }
    const results = iptuLotes.filter((l) => l.iptu.includes(searchIptu.trim()));
    setFilteredLotes(results);
    setShowReport(true);
    if (results.length === 0) message.info("IPTU não encontrado");
    else if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
      setFlyKey((k) => k + 1);
    }
  };

  const handleAdvancedSearch = (values: AdvancedSearchValues) => {
    let results = [...iptuLotes];

    if (values.nomeLogradouro) {
      const q = values.nomeLogradouro.toLowerCase();
      results = results.filter((l) => l.endereco.toLowerCase().includes(q));
    }
    if (values.bairro) {
      results = results.filter((l) => l.bairro === values.bairro);
    }
    if (values.tipoLogradouro) {
      const tipo = values.tipoLogradouro.toLowerCase();
      results = results.filter((l) => l.endereco.toLowerCase().startsWith(tipo));
    }
    if (values.statusProcesso) {
      results = results.filter((l) =>
        l.processos.some((p) => p.status === values.statusProcesso)
      );
    }
    if (values.tipoProcesso) {
      results = results.filter((l) =>
        l.processos.some((p) => p.tipo === values.tipoProcesso)
      );
    }

    setFilteredLotes(results);
    setShowReport(true);
    if (results.length === 0) message.info("Nenhum resultado encontrado");
    else message.success(`${results.length} imóvel(is) encontrado(s)`);
  };

  const handleSelectLote = (iptu: string) => {
    setSelectedIptu(iptu);
    setFlyKey((k) => k + 1);
  };

  const handleReport = (iptu: string) => {
    const lote = iptuLotes.find((l) => l.iptu === iptu);
    if (!lote) return;
    generatePDF(lote);
    message.success("Relatório dinâmico gerado com sucesso!");
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
            <AppstoreOutlined style={{ fontSize: 28, color: "#5b73a6" }} />
            <div>
              <strong style={{ fontSize: 16 }}>IDE SEUMA</strong>
              <br />
              <span style={{ fontSize: 9, color: "#666" }}>
                Infraestrutura de Dados Espaciais
              </span>
            </div>
          </div>
          <h3 style={styles.title}>
            Relatórios Dinâmicos do Licenciamento Digital
          </h3>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchGroup}>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
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
                size="small"
              />
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setShowAdvanced(true); }}
                style={{ fontSize: 11, color: "#1890ff", whiteSpace: "nowrap" }}
              >
                Pesquisa avançada
              </a>
            </div>
            <Input
              placeholder="Pesquise pelo numero de IPTU"
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
              size="small"
            />
          </div>
        </div>
      </header>

      {/* MAP AREA */}
      <div style={styles.mapArea}>
        {/* Left side buttons */}
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

        {/* Right side buttons */}
        <div style={styles.sideButtonsRight}>
          <Tooltip title="Identificação da área">
            <Button
              shape="circle"
              icon={<InfoCircleOutlined />}
              onClick={() => {
                if (selectedLote) {
                  setShowDetail(true);
                } else {
                  message.info("Selecione um lote primeiro");
                }
              }}
              style={styles.sideBtn}
            />
          </Tooltip>
          <Tooltip title="Abrir relatório dinâmico">
            <Button
              shape="circle"
              icon={<FileTextOutlined />}
              onClick={() => setShowReport(!showReport)}
              type={showReport ? "primary" : "default"}
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
          filteredLotes={filteredLotes}
          onLoteClick={handleSelectLote}
          flyKey={flyKey}
        />

        {/* Lote Detail Panel */}
        {showDetail && selectedLote && (
          <LoteDetail
            lote={selectedLote}
            onReport={() => handleReport(selectedLote.iptu)}
            onClose={() => setShowDetail(false)}
          />
        )}

        {/* Report Panel */}
        {showReport && filteredLotes.length > 0 && (
          <ReportPanel
            lotes={filteredLotes}
            selectedIptu={selectedIptu}
            onSelect={handleSelectLote}
            onReport={handleReport}
            onClose={() => setShowReport(false)}
          />
        )}

        {/* Advanced Search */}
        <AdvancedSearch
          open={showAdvanced}
          onClose={() => setShowAdvanced(false)}
          onSearch={handleAdvancedSearch}
        />
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>Lat: {selectedLote ? selectedLote.center[0].toFixed(4) : "-"}</span>
        <span>Long: {selectedLote ? selectedLote.center[1].toFixed(4) : "-"}</span>
        {selectedLote && (
          <span style={{ marginLeft: 20, color: "#5b73a6" }}>
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
    fontSize: 18,
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
    gap: 2,
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
  sideButtonsRight: {
    position: "absolute",
    right: 10,
    bottom: 340,
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
