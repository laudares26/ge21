import { useState, useMemo, useCallback } from "react";
import { Input, Button, message, Tooltip } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  HomeOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MapView from "../components/MapView";
import LayersPanel from "../components/LayersPanel";
import ProcessList from "../components/ProcessList";
import ProcessDetail from "../components/ProcessDetail";
import { iptuLotes } from "../data/iptuData";
import { defaultLayers } from "../data/layersData";
import { generateProcessReport } from "../components/ReportGenerator";
import type { MapLayer } from "../data/layersData";
import type { IptuLote, LicenciamentoProcess } from "../data/iptuData";

export default function MainPage() {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchIptu, setSearchIptu] = useState("");
  const [searchProtocolo, setSearchProtocolo] = useState("");
  const [layers, setLayers] = useState<MapLayer[]>(defaultLayers);
  const [selectedIptu, setSelectedIptu] = useState<string | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const [filteredLotes, setFilteredLotes] = useState<IptuLote[]>(iptuLotes);
  const [showLayers, setShowLayers] = useState(false);
  const [showProcessList, setShowProcessList] = useState(true);
  const [selectedProtocolo, setSelectedProtocolo] = useState<string | null>(null);

  const selectedLote = useMemo(
    () => iptuLotes.find((l) => l.iptu === selectedIptu) || null,
    [selectedIptu]
  );

  const selectedProcess: { lote: IptuLote; processo: LicenciamentoProcess } | null =
    useMemo(() => {
      if (!selectedProtocolo) return null;
      for (const lote of iptuLotes) {
        const proc = lote.processos.find((p) => p.protocolo === selectedProtocolo);
        if (proc) return { lote, processo: proc };
      }
      return null;
    }, [selectedProtocolo]);

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
      return;
    }
    const q = searchAddress.toLowerCase();
    const results = iptuLotes.filter(
      (l) =>
        l.endereco.toLowerCase().includes(q) ||
        l.bairro.toLowerCase().includes(q)
    );
    setFilteredLotes(results);
    setShowProcessList(true);
    if (results.length === 0) message.info("Nenhum imóvel encontrado");
    if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
      setFlyKey((k) => k + 1);
    }
  };

  const handleSearchIptu = () => {
    if (!searchIptu.trim()) {
      setFilteredLotes(iptuLotes);
      return;
    }
    const results = iptuLotes.filter((l) => l.iptu.includes(searchIptu.trim()));
    setFilteredLotes(results);
    setShowProcessList(true);
    if (results.length === 0) message.info("IPTU não encontrado");
    else if (results.length === 1) {
      setSelectedIptu(results[0].iptu);
      setFlyKey((k) => k + 1);
    }
  };

  const handleSearchProtocolo = () => {
    if (!searchProtocolo.trim()) {
      setFilteredLotes(iptuLotes);
      return;
    }
    const q = searchProtocolo.trim().toUpperCase();
    const results = iptuLotes.filter((l) =>
      l.processos.some((p) => p.protocolo.toUpperCase().includes(q))
    );
    setFilteredLotes(results);
    setShowProcessList(true);
    if (results.length === 0) message.info("Processo não encontrado");
    else {
      if (results.length === 1) {
        setSelectedIptu(results[0].iptu);
        setFlyKey((k) => k + 1);
        const proc = results[0].processos.find((p) =>
          p.protocolo.toUpperCase().includes(q)
        );
        if (proc) setSelectedProtocolo(proc.protocolo);
      }
    }
  };

  const handleSelectLote = (iptu: string) => {
    setSelectedIptu(iptu);
    setFlyKey((k) => k + 1);
  };

  const handleReport = (iptu: string) => {
    const lote = iptuLotes.find((l) => l.iptu === iptu);
    if (!lote) return;
    generateProcessReport(lote);
    message.success("Relatório de processos gerado com sucesso!");
  };

  const totalProcesses = filteredLotes.reduce(
    (acc, l) => acc + l.processos.length,
    0
  );

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
          <h3 style={styles.title}>Pesquisa de Processos</h3>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchGroup}>
            <Input
              placeholder="Pesquisar por endereço"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onPressEnter={handleSearchAddress}
              suffix={
                <SearchOutlined
                  onClick={handleSearchAddress}
                  style={{ cursor: "pointer" }}
                />
              }
              style={{ width: 200 }}
              size="small"
            />
            <Input
              placeholder="Pesquisar pelo IPTU"
              value={searchIptu}
              onChange={(e) => setSearchIptu(e.target.value)}
              onPressEnter={handleSearchIptu}
              suffix={
                <SearchOutlined
                  onClick={handleSearchIptu}
                  style={{ cursor: "pointer" }}
                />
              }
              style={{ width: 200 }}
              size="small"
            />
            <Input
              placeholder="Pesquisar por protocolo"
              value={searchProtocolo}
              onChange={(e) => setSearchProtocolo(e.target.value)}
              onPressEnter={handleSearchProtocolo}
              suffix={
                <SearchOutlined
                  onClick={handleSearchProtocolo}
                  style={{ cursor: "pointer" }}
                />
              }
              style={{ width: 200 }}
              size="small"
            />
          </div>
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

        {/* Right buttons */}
        <div style={styles.sideButtonsRight}>
          <Tooltip title="Lista de processos">
            <Button
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => setShowProcessList(!showProcessList)}
              type={showProcessList ? "primary" : "default"}
              style={styles.sideBtn}
            />
          </Tooltip>
          <Tooltip title="Gerar relatório do lote selecionado">
            <Button
              shape="circle"
              icon={<FileTextOutlined />}
              onClick={() => {
                if (selectedLote) {
                  handleReport(selectedLote.iptu);
                } else {
                  message.info("Selecione um lote primeiro");
                }
              }}
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

        {/* Process Detail Panel */}
        {selectedProcess && (
          <ProcessDetail
            lote={selectedProcess.lote}
            processo={selectedProcess.processo}
            onClose={() => setSelectedProtocolo(null)}
          />
        )}

        {/* Process List Panel */}
        {showProcessList && (
          <ProcessList
            lotes={filteredLotes}
            selectedProtocolo={selectedProtocolo}
            onSelectProcess={setSelectedProtocolo}
            onLocateLote={handleSelectLote}
            onReport={handleReport}
            onClose={() => setShowProcessList(false)}
          />
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>
          Lat: {selectedLote ? selectedLote.center[0].toFixed(4) : "-"}
        </span>
        <span>
          Long: {selectedLote ? selectedLote.center[1].toFixed(4) : "-"}
        </span>
        <span style={{ color: "#5b73a6" }}>
          {filteredLotes.length} lote(s) | {totalProcesses} processo(s)
        </span>
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
    gap: 6,
    flexWrap: "wrap",
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
