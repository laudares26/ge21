import { useState } from "react";
import {
  ConfigProvider,
  Card,
  Tag,
  Button,
  Modal,
  Input,
  Collapse,
  Badge,
  Tooltip,
} from "antd";
import ptBR from "antd/locale/pt_BR";
import {
  AppstoreOutlined,
  SearchOutlined,
  LinkOutlined,
  ReadOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { resources, publicoInfo, getPublico } from "./data/resources";
import type { Resource, Publico } from "./data/resources";

const eixoConfig = [
  { key: "salaSituacao", label: "Sala de Situação", color: "#1890ff", icon: <EnvironmentOutlined /> },
  { key: "escutaCidada", label: "Escuta Cidadã", color: "#52c41a", icon: <CustomerServiceOutlined /> },
  { key: "servicoCidadao", label: "Serviço ao Cidadão", color: "#fa8c16", icon: <TeamOutlined /> },
  { key: "geodesign", label: "Geodesign", color: "#722ed1", icon: <GlobalOutlined /> },
] as const;

function App() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = resources.filter((r) => {
    const matchSearch =
      !searchText ||
      r.title.toLowerCase().includes(searchText.toLowerCase()) ||
      r.description.toLowerCase().includes(searchText.toLowerCase());
    const matchFilter =
      !activeFilter || r[activeFilter as keyof Resource] === true;
    return matchSearch && matchFilter;
  });

  const appsImplementados = resources.filter((r) => r.hasApp);
  const publicoOrder: Publico[] = [
    "consulta_cidada",
    "gestor_interno",
    "gestor_projeto",
  ];

  return (
    <ConfigProvider locale={ptBR} theme={{ token: { colorPrimary: "#5b73a6" } }}>
      <div style={styles.page}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.headerLeft}>
              <img
                src="/logo-prefeitura.svg"
                alt="Prefeitura"
                style={{ height: 50 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <AppstoreOutlined style={{ fontSize: 24, color: "#fff" }} />
                  <strong style={{ fontSize: 18, color: "#fff" }}>IDE SEUMA</strong>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>
                  Infraestrutura de Dados Espaciais — Secretaria Municipal de
                  Urbanismo e Meio Ambiente
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Aplicativos e Recursos que podem ser implantados, dependentes da
            maturidade do município em termos de cadastro territorial e coleção
            temática de mapas
          </h1>
          <p style={styles.heroSubtitle}>
            O conjunto de ferramentas que podem ser disponibilizadas e que já
            foram aplicadas em estudos de casos anteriores partem da existência
            de uma IDE — Infraestrutura de Dados Espaciais — na qual se apoiam
            recursos para facilitar a gestão pública e para colocar os recursos
            de tecnologia de geoinformação à disposição do cidadão.
          </p>
          <div style={styles.heroStats}>
            <div style={styles.statCard}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#5b73a6" }}>
                {resources.length}
              </span>
              <span style={{ fontSize: 12, color: "#666" }}>Recursos</span>
            </div>
            <div style={styles.statCard}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#52c41a" }}>
                {appsImplementados.length}
              </span>
              <span style={{ fontSize: 12, color: "#666" }}>
                Apps Implementados
              </span>
            </div>
            <div style={styles.statCard}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#fa8c16" }}>
                4
              </span>
              <span style={{ fontSize: 12, color: "#666" }}>
                Eixos de Contribuição
              </span>
            </div>
          </div>
        </section>

        {/* APPS IMPLEMENTADOS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <CheckCircleOutlined style={{ color: "#52c41a" }} /> Aplicativos
            Disponíveis para Teste
          </h2>
          {publicoOrder.map((pub) => {
            const apps = appsImplementados.filter(
              (a) => getPublico(a) === pub
            );
            if (apps.length === 0) return null;
            return (
              <div key={pub} style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    margin: "12px 0 4px",
                    color: "#333",
                  }}
                >
                  <Tag color={publicoInfo[pub].color}>
                    {publicoInfo[pub].label}
                  </Tag>
                </h3>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>
                  {publicoInfo[pub].descricao}
                </p>
                <div style={styles.appsGrid}>
                  {apps.map((app) => (
                    <Card
                      key={app.id}
                      hoverable
                      size="small"
                      style={styles.appCard}
                      styles={{ body: { padding: 16 } }}
                    >
                      <div style={styles.appCardHeader}>
                        <Badge
                          count={app.id}
                          style={{ backgroundColor: "#5b73a6" }}
                        />
                        <h4 style={{ margin: 0, fontSize: 14, flex: 1 }}>
                          {app.title}
                        </h4>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#666",
                          margin: "8px 0",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {app.description.split("\n")[0]}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          flexWrap: "wrap",
                          marginBottom: 8,
                        }}
                      >
                        <Tag
                          color={publicoInfo[getPublico(app)].color}
                          style={{ fontSize: 10 }}
                        >
                          {publicoInfo[getPublico(app)].label}
                        </Tag>
                        {eixoConfig.map(
                          (e) =>
                            app[e.key] && (
                              <Tag
                                key={e.key}
                                color={e.color}
                                style={{ fontSize: 10 }}
                              >
                                {e.label}
                              </Tag>
                            )
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button
                          type="primary"
                          size="small"
                          icon={<LinkOutlined />}
                          href={app.appUrl}
                          target="_blank"
                          style={{ background: "#5b73a6" }}
                        >
                          Acessar App
                        </Button>
                        <Button
                          size="small"
                          icon={<ReadOutlined />}
                          onClick={() => setSelectedResource(app)}
                        >
                          Documentação
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* EIXOS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Eixos de Contribuição à Cidade Inteligente com Foco no Cidadão</h2>
          <div style={styles.eixosGrid}>
            {eixoConfig.map((e) => {
              const count = resources.filter(
                (r) => r[e.key]
              ).length;
              const isActive = activeFilter === e.key;
              return (
                <Card
                  key={e.key}
                  hoverable
                  size="small"
                  style={{
                    ...styles.eixoCard,
                    borderColor: isActive ? e.color : "#e8e8e8",
                    borderWidth: isActive ? 2 : 1,
                  }}
                  onClick={() =>
                    setActiveFilter(isActive ? null : e.key)
                  }
                  styles={{ body: { padding: 16, textAlign: "center" as const } }}
                >
                  <div style={{ fontSize: 28, color: e.color, marginBottom: 4 }}>
                    {e.icon}
                  </div>
                  <strong style={{ fontSize: 13 }}>{e.label}</strong>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                    {count} recursos
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* TODOS OS RECURSOS */}
        <section style={styles.section}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>
              Catálogo Completo de Recursos ({filtered.length})
            </h2>
            <Input
              placeholder="Buscar recurso..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              size="small"
              allowClear
            />
          </div>
          {activeFilter && (
            <div style={{ marginBottom: 12 }}>
              <Tag
                closable
                onClose={() => setActiveFilter(null)}
                color={
                  eixoConfig.find((e) => e.key === activeFilter)?.color
                }
              >
                Filtro:{" "}
                {eixoConfig.find((e) => e.key === activeFilter)?.label}
              </Tag>
            </div>
          )}
          <Collapse
            accordion
            size="small"
            items={filtered.map((r) => ({
              key: r.id,
              label: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Badge
                    count={r.id}
                    style={{
                      backgroundColor: r.hasApp ? "#52c41a" : "#bbb",
                    }}
                  />
                  <strong style={{ fontSize: 13 }}>{r.title}</strong>
                  {r.hasApp && (
                    <Tooltip title="App disponível para teste">
                      <Tag color="green" style={{ fontSize: 10 }}>
                        <CheckCircleOutlined /> APP
                      </Tag>
                    </Tooltip>
                  )}
                  <Tag
                    color={publicoInfo[getPublico(r)].color}
                    style={{ fontSize: 9 }}
                  >
                    {publicoInfo[getPublico(r)].label}
                  </Tag>
                  {eixoConfig.map(
                    (e) =>
                      r[e.key] && (
                        <Tag
                          key={e.key}
                          color={e.color}
                          style={{ fontSize: 9 }}
                        >
                          {e.label}
                        </Tag>
                      )
                  )}
                </div>
              ),
              children: (
                <div>
                  {r.description.split("\n").map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: "#444",
                        marginBottom: 8,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                  {r.features && r.features.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <strong style={{ fontSize: 12 }}>
                        Funcionalidades:
                      </strong>
                      <ul
                        style={{
                          paddingLeft: 20,
                          margin: "4px 0",
                          fontSize: 12,
                        }}
                      >
                        {r.features.map((f, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {r.appUrl && (
                    <Button
                      type="primary"
                      icon={<LinkOutlined />}
                      href={r.appUrl}
                      target="_blank"
                      style={{ marginTop: 12, background: "#5b73a6" }}
                      size="small"
                    >
                      Acessar Aplicativo
                    </Button>
                  )}
                </div>
              ),
            }))}
          />
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={{ textAlign: "center" }}>
            <strong>IDE SEUMA</strong> — Infraestrutura de Dados Espaciais
            <br />
            <span style={{ fontSize: 11, color: "#999" }}>
              Secretaria Municipal de Urbanismo e Meio Ambiente — Prefeitura de
              Fortaleza
            </span>
          </div>
        </footer>

        {/* MODAL DOCUMENTAÇÃO */}
        <Modal
          open={!!selectedResource}
          onCancel={() => setSelectedResource(null)}
          footer={
            selectedResource?.appUrl ? (
              <Button
                type="primary"
                icon={<LinkOutlined />}
                href={selectedResource.appUrl}
                target="_blank"
                style={{ background: "#5b73a6" }}
              >
                Acessar Aplicativo
              </Button>
            ) : null
          }
          title={
            selectedResource ? (
              <span>
                <Badge
                  count={selectedResource.id}
                  style={{ backgroundColor: "#5b73a6", marginRight: 8 }}
                />
                {selectedResource.title}
              </span>
            ) : null
          }
          width={700}
        >
          {selectedResource && (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <Tag color={publicoInfo[getPublico(selectedResource)].color}>
                  {publicoInfo[getPublico(selectedResource)].label}
                </Tag>
                {eixoConfig.map(
                  (e) =>
                    selectedResource[e.key] && (
                      <Tag key={e.key} color={e.color}>
                        {e.icon} {e.label}
                      </Tag>
                    )
                )}
              </div>
              {selectedResource.description.split("\n").map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {p}
                </p>
              ))}
              {selectedResource.features &&
                selectedResource.features.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      background: "#f6f8fa",
                      padding: 16,
                      borderRadius: 8,
                    }}
                  >
                    <strong>Funcionalidades:</strong>
                    <ul
                      style={{
                        paddingLeft: 20,
                        margin: "8px 0 0",
                        fontSize: 13,
                      }}
                    >
                      {selectedResource.features.map((f, i) => (
                        <li key={i} style={{ marginBottom: 6 }}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "linear-gradient(135deg, #5b73a6 0%, #3d5a99 100%)",
    padding: "12px 0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  hero: {
    background: "linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 100%)",
    padding: "40px 24px",
    textAlign: "center",
  },
  heroTitle: {
    maxWidth: 900,
    margin: "0 auto 16px",
    fontSize: 24,
    fontWeight: 600,
    color: "#1a1a2e",
    lineHeight: 1.4,
  },
  heroSubtitle: {
    maxWidth: 800,
    margin: "0 auto",
    fontSize: 14,
    color: "#555",
    lineHeight: 1.7,
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    gap: 24,
    marginTop: 24,
    flexWrap: "wrap",
  },
  statCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "16px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 24px",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#333",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  appsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 16,
  },
  appCard: {
    borderRadius: 12,
    border: "1px solid #e8e8e8",
  },
  appCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  eixosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 12,
  },
  eixoCard: {
    borderRadius: 12,
    cursor: "pointer",
  },
  footer: {
    background: "#f5f5f5",
    borderTop: "1px solid #e8e8e8",
    padding: "24px",
    marginTop: "auto",
    fontSize: 13,
    color: "#666",
  },
};

export default App;
