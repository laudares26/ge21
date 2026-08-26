import { Tag, Collapse, Descriptions, Button, message } from "antd";
import {
  GlobalOutlined,
  BlockOutlined,
  CompassOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  FilePdfOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { IptuLote } from "../data/iptuData";
import { generateCroqui } from "./CroquiGenerator";

interface HierarchyPanelProps {
  lote: IptuLote;
  onClose: () => void;
}

export default function HierarchyPanel({ lote, onClose }: HierarchyPanelProps) {
  const handleGenerateCroqui = () => {
    generateCroqui(lote);
    message.success("Croqui gerado com sucesso!");
  };

  const items = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GlobalOutlined style={{ color: lote.macrozona.cor, fontSize: 16 }} />
          <strong>Nível 1 — Macrozoneamento (PDC 2018)</strong>
        </span>
      ),
      children: (
        <div>
          <Tag color={lote.macrozona.cor} style={{ fontSize: 13, padding: "4px 12px", marginBottom: 8 }}>
            {lote.macrozona.nome}
          </Tag>
          <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
            {lote.macrozona.descricao}
          </p>
          <Descriptions size="small" column={1} bordered style={{ marginTop: 8 }}
            labelStyle={{ fontSize: 11, fontWeight: 600, background: "#fafafa", width: 130 }}
            contentStyle={{ fontSize: 11 }}
          >
            <Descriptions.Item label="PDC2018 Macrozona">{lote.macrozona.nome}</Descriptions.Item>
            <Descriptions.Item label="Bairro">{lote.bairro}</Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BlockOutlined style={{ color: lote.zoneamento.cor, fontSize: 16 }} />
          <strong>Nível 2 — Zoneamento</strong>
        </span>
      ),
      children: (
        <div>
          <Tag color={lote.zoneamento.cor} style={{ fontSize: 13, padding: "4px 12px", marginBottom: 8 }}>
            {lote.zoneamento.zona}
          </Tag>
          <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>
            {lote.zoneamento.descricao}
          </p>
          <Descriptions size="small" column={1} bordered
            labelStyle={{ fontSize: 11, fontWeight: 600, background: "#fafafa", width: 150 }}
            contentStyle={{ fontSize: 11 }}
          >
            <Descriptions.Item label="Zona">{lote.zoneamento.zona}</Descriptions.Item>
            <Descriptions.Item label="Coeficiente Básico">{lote.zoneamento.coeficienteBasico}</Descriptions.Item>
            <Descriptions.Item label="Coeficiente Máximo">{lote.zoneamento.coeficienteMaximo}</Descriptions.Item>
            <Descriptions.Item label="Taxa de Ocupação">{lote.zoneamento.taxaOcupacao}%</Descriptions.Item>
            <Descriptions.Item label="Gabarito">{lote.zoneamento.gabarito}</Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 10 }}>
            <strong style={{ fontSize: 12 }}>Usos Permitidos:</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              {lote.zoneamento.usosPermitidos.map((u) => (
                <Tag key={u} color="green" style={{ fontSize: 10 }}>
                  <CheckCircleOutlined /> {u}
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <strong style={{ fontSize: 12 }}>Usos Restritos:</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              {lote.zoneamento.usosRestritos.map((u) => (
                <Tag key={u} color="red" style={{ fontSize: 10 }}>
                  <CloseCircleOutlined /> {u}
                </Tag>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 10, color: "#999", marginTop: 8, fontStyle: "italic" }}>
            No caso de usos restritos a vias arteriais ou coletoras, ficará de total responsabilidade
            do interessado a solicitação, junto à Prefeitura.
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CompassOutlined style={{ color: "#F44336", fontSize: 16 }} />
          <strong>Nível 3 — Arruamento e Infraestrutura</strong>
        </span>
      ),
      children: (
        <div>
          <Descriptions size="small" column={1} bordered
            labelStyle={{ fontSize: 11, fontWeight: 600, background: "#fafafa", width: 130 }}
            contentStyle={{ fontSize: 11 }}
          >
            <Descriptions.Item label="Logradouro">{lote.arruamento}</Descriptions.Item>
            <Descriptions.Item label="Tipo de Via">
              <Tag color={lote.tipoVia === "Via Arterial" ? "red" : lote.tipoVia === "Via Coletora" ? "orange" : "default"}>
                {lote.tipoVia}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Largura">{lote.larguraVia}m</Descriptions.Item>
            <Descriptions.Item label="Endereço Completo">{lote.endereco}</Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <EnvironmentOutlined style={{ color: "#1890ff", fontSize: 16 }} />
          <strong>Nível 4 — Ortofoto / Imagem de Alta Resolução</strong>
        </span>
      ),
      children: (
        <div>
          <p style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>
            Ortofoto PMF sobreposta ao lote selecionado — imagem de satélite de alta resolução
            (Esri World Imagery). A visualização do mapa à esquerda mostra a situação real do lote.
          </p>
          <Descriptions size="small" column={1} bordered
            labelStyle={{ fontSize: 11, fontWeight: 600, background: "#fafafa", width: 130 }}
            contentStyle={{ fontSize: 11 }}
          >
            <Descriptions.Item label="Latitude">{lote.center[0].toFixed(6)}</Descriptions.Item>
            <Descriptions.Item label="Longitude">{lote.center[1].toFixed(6)}</Descriptions.Item>
            <Descriptions.Item label="Fonte">Esri World Imagery / Ortofoto PMF</Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <HomeOutlined style={{ color: "#722ED1", fontSize: 16 }} />
          <strong>Nível 5 — Situação da Propriedade (Lote)</strong>
        </span>
      ),
      children: (
        <div>
          <Descriptions size="small" column={1} bordered
            labelStyle={{ fontSize: 11, fontWeight: 600, background: "#fafafa", width: 150 }}
            contentStyle={{ fontSize: 11 }}
          >
            <Descriptions.Item label="IPTU">{lote.iptu}</Descriptions.Item>
            <Descriptions.Item label="Endereço">{lote.endereco}</Descriptions.Item>
            <Descriptions.Item label="Bairro">{lote.bairro}</Descriptions.Item>
            <Descriptions.Item label="Proprietário">{lote.proprietario}</Descriptions.Item>
            <Descriptions.Item label="Área do Terreno">{lote.area} m²</Descriptions.Item>
            <Descriptions.Item label="Área Edificada">{lote.areaEdificada} m²</Descriptions.Item>
            <Descriptions.Item label="Testada">{lote.testada}m</Descriptions.Item>
            <Descriptions.Item label="Profundidade">{lote.profundidade}m</Descriptions.Item>
            <Descriptions.Item label="Zoneamento">
              <Tag color={lote.zoneamento.cor}>{lote.zoneamento.zona}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Macrozona">
              <Tag color={lote.macrozona.cor}>{lote.macrozona.nome}</Tag>
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              onClick={handleGenerateCroqui}
              style={{ background: "#5b73a6" }}
            >
              Gerar Croqui / Relatório
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <strong style={{ color: "#fff", fontSize: 13 }}>
          Geovisualização Hierárquica — {lote.iptu}
        </strong>
        <span
          onClick={onClose}
          style={{ color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1 }}
        >
          ×
        </span>
      </div>
      <div style={styles.body}>
        <Collapse
          defaultActiveKey={["1", "2", "3", "4", "5"]}
          items={items}
          size="small"
          style={{ fontSize: 12 }}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 460,
    background: "#fff",
    zIndex: 1000,
    boxShadow: "-2px 0 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#5b73a6",
    padding: "10px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: 12,
  },
};
