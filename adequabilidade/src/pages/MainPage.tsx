import { useState, useMemo } from "react";
import { Input, AutoComplete, Button, message, Tooltip, Tag } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import MapView from "../components/MapView";
import CnaePanel from "../components/CnaePanel";
import IptuPanel from "../components/IptuPanel";
import ZoneLegend from "../components/ZoneLegend";
import { cnaeActivities } from "../data/cnaeData";
import { zoningAreas } from "../data/zoningData";
import { iptuLotes } from "../data/iptuData";
import type { CnaeActivity } from "../data/cnaeData";
import type { IptuLote } from "../data/iptuData";

export default function MainPage() {
  const [cnaeSearch, setCnaeSearch] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchIptu, setSearchIptu] = useState("");

  const [filteredCnaes, setFilteredCnaes] = useState<CnaeActivity[]>([]);
  const [filteredLotes, setFilteredLotes] = useState<IptuLote[]>([]);

  const [selectedCnae, setSelectedCnae] = useState<CnaeActivity | null>(null);
  const [selectedIptu, setSelectedIptu] = useState<string | null>(null);
  const [flyKey, setFlyKey] = useState(0);

  const [showCnaeResults, setShowCnaeResults] = useState(false);
  const [showIptuResults, setShowIptuResults] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [showAllZones, setShowAllZones] = useState(false);

  const highlightedZones = useMemo(
    () => (selectedCnae ? selectedCnae.zonasPermitidas : []),
    [selectedCnae]
  );

  const selectedLote = useMemo(
    () => iptuLotes.find((l) => l.iptu === selectedIptu) || null,
    [selectedIptu]
  );

  const cnaeOptions = useMemo(() => {
    if (!cnaeSearch.trim()) return [];
    const q = cnaeSearch.toLowerCase();
    return cnaeActivities
      .filter(
        (c) =>
          c.codigo.toLowerCase().includes(q) ||
          c.descricao.toLowerCase().includes(q)
      )
      .map((c) => ({
        value: c.codigo,
        label: (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Tag color="blue" style={{ fontSize: 10, flexShrink: 0 }}>
              {c.codigo}
            </Tag>
            <span style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {c.descricao}
            </span>
          </div>
        ),
      }));
  }, [cnaeSearch]);

  const handleCnaeSelect = (value: string) => {
    const activity = cnaeActivities.find((c) => c.codigo === value);
    if (activity) {
      setSelectedCnae(activity);
      setShowLegend(true);
      setCnaeSearch(`${activity.codigo} - ${activity.descricao}`);
      message.success(`Zonas permitidas: ${activity.zonasPermitidas.join(", ")}`);
    }
  };

  const handleCnaeSearch = () => {
    if (!cnaeSearch.trim()) {
      setFilteredCnaes(cnaeActivities);
      setShowCnaeResults(true);
      return;
    }
    const q = cnaeSearch.toLowerCase();
    const results = cnaeActivities.filter(
      (c) =>
        c.codigo.toLowerCase().includes(q) ||
        c.descricao.toLowerCase().includes(q)
    );
    setFilteredCnaes(results);
    setShowCnaeResults(true);
    if (results.length === 0) message.info("Nenhuma atividade encontrada");
    if (results.length === 1) {
      setSelectedCnae(results[0]);
      setShowLegend(true);
    }
  };

  const handleSearchAddress = () => {
    if (!searchAddress.trim()) {
      setFilteredLotes(iptuLotes);
      setShowIptuResults(true);
      return;
    }
    const q = searchAddress.toLowerCase();
    const results = iptuLotes.filter(
      (l) =>
        l.endereco.toLowerCase().includes(q) ||
        l.bairro.toLowerCase().includes(q)
    );
    setFilteredLotes(results);
    setShowIptuResults(true);
    if (results.length === 0) message.info("Nenhum imóvel encontrado");
  };

  const handleSearchIptu = () => {
    if (!searchIptu.trim()) {
      setFilteredLotes(iptuLotes);
      setShowIptuResults(true);
      return;
    }
    const results = iptuLotes.filter((l) => l.iptu.includes(searchIptu.trim()));
    setFilteredLotes(results);
    setShowIptuResults(true);
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

  const handleSelectCnae = (activity: CnaeActivity) => {
    setSelectedCnae(activity);
    setShowLegend(true);
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
          <h3 style={styles.title}>Consulta de Adequabilidade Invertida</h3>
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
              style={{ width: 220 }}
              size="small"
            />
            <Input
              placeholder="Pesquise o número de IPTU"
              value={searchIptu}
              onChange={(e) => setSearchIptu(e.target.value)}
              onPressEnter={handleSearchIptu}
              suffix={
                <SearchOutlined
                  onClick={handleSearchIptu}
                  style={{ cursor: "pointer" }}
                />
              }
              style={{ width: 220 }}
              size="small"
            />
          </div>
          <AutoComplete
            options={cnaeOptions}
            onSelect={handleCnaeSelect}
            onSearch={setCnaeSearch}
            value={cnaeSearch}
            style={{ width: 320 }}
          >
            <Input
              placeholder="Insira o número de CNAE ou Nome da Atividade"
              onPressEnter={handleCnaeSearch}
              suffix={
                <SearchOutlined
                  onClick={handleCnaeSearch}
                  style={{ cursor: "pointer" }}
                />
              }
              size="small"
            />
          </AutoComplete>
        </div>
      </header>

      {/* Info banner */}
      {!selectedCnae && (
        <div style={styles.cnaeBanner}>
          <span style={{ fontSize: 12, color: "#333" }}>
            <strong>Como funciona:</strong> 1) selecione primeiro a atividade
            (CNAE); 2) o mapa destaca as áreas onde essa atividade é permitida.
            O resultado indica locais potenciais e não constitui aprovação
            legal final. As áreas exibidas (A a G) são demonstrativas; as
            camadas Quadras/Lotes vêm do GeoServer IDE SEUMA.
          </span>
        </div>
      )}

      {/* Selected CNAE banner */}
      {selectedCnae && (
        <div style={styles.cnaeBanner}>
          <Tag color="blue" style={{ fontSize: 12 }}>
            {selectedCnae.codigo}
          </Tag>
          <span style={{ fontSize: 12, color: "#333" }}>
            {selectedCnae.descricao}
          </span>
          <span style={{ fontSize: 11, color: "#888", marginLeft: 8 }}>
            Permitido em: {selectedCnae.zonasPermitidas.join(", ")}
          </span>
          <Button
            size="small"
            type="text"
            onClick={() => {
              setSelectedCnae(null);
              setCnaeSearch("");
            }}
            style={{ marginLeft: "auto", fontSize: 11 }}
          >
            Limpar
          </Button>
        </div>
      )}

      {/* MAP AREA */}
      <div style={styles.mapArea}>
        {/* Side buttons */}
        <div style={styles.sideButtons}>
          <Tooltip title="Mostrar/ocultar todas as zonas">
            <Button
              shape="circle"
              icon={<AppstoreOutlined />}
              onClick={() => setShowAllZones(!showAllZones)}
              type={showAllZones ? "primary" : "default"}
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
                setShowIptuResults(true);
                setShowCnaeResults(false);
              }}
              style={styles.sideBtn}
            />
          </Tooltip>
        </div>

        {/* Map */}
        <MapView
          zoningAreas={zoningAreas}
          highlightedZones={highlightedZones}
          selectedLote={selectedLote}
          allLotes={iptuLotes}
          onLoteClick={handleSelectLote}
          flyKey={flyKey}
          showAllZones={showAllZones}
        />

        {/* Legend */}
        {showLegend && highlightedZones.length > 0 && (
          <ZoneLegend
            zones={zoningAreas}
            highlightedZones={highlightedZones}
            onClose={() => setShowLegend(false)}
          />
        )}

        {/* CNAE Results Panel */}
        {showCnaeResults && filteredCnaes.length > 0 && (
          <CnaePanel
            activities={filteredCnaes}
            selectedCnae={selectedCnae}
            onSelect={handleSelectCnae}
            onClose={() => setShowCnaeResults(false)}
          />
        )}

        {/* IPTU Results Panel */}
        {showIptuResults && filteredLotes.length > 0 && !showCnaeResults && (
          <IptuPanel
            lotes={filteredLotes}
            selectedIptu={selectedIptu}
            onSelect={handleSelectLote}
            onClose={() => setShowIptuResults(false)}
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
        {selectedCnae && (
          <span style={{ marginLeft: 20, color: "#1890ff" }}>
            CNAE: {selectedCnae.codigo}
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
    gap: 4,
  },
  cnaeBanner: {
    background: "#e6f7ff",
    borderBottom: "1px solid #91d5ff",
    padding: "6px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    zIndex: 1050,
    flexWrap: "wrap",
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
