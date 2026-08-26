import { Slider, Card, Typography, Tag, Empty, Descriptions } from 'antd';
import { CalendarOutlined, HistoryOutlined } from '@ant-design/icons';
import type { BemPatrimonial } from '../data/patrimonioData';

const { Title, Text } = Typography;

interface TimelinePanelProps {
  bem: BemPatrimonial | null;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export default function TimelinePanel({ bem, selectedYear, onYearChange }: TimelinePanelProps) {
  if (!bem) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 24 }}>
        <Empty description="Selecione um bem patrimonial para visualizar sua evolução temporal" />
      </div>
    );
  }

  const anos = bem.imagensHistoricas.map((img) => img.ano);
  const minAno = Math.min(...anos);
  const maxAno = Math.max(...anos);
  const currentImage = bem.imagensHistoricas.find((img) => img.ano === selectedYear);
  const marks: Record<number, string> = {};
  anos.forEach((a) => { marks[a] = String(a); });

  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <Card size="small" style={{ marginBottom: 12 }}>
        <Title level={5} style={{ margin: 0, color: '#5b73a6' }}>
          <HistoryOutlined /> {bem.nome}
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>{bem.endereco}</Text>
      </Card>

      <Card size="small" title={<><CalendarOutlined /> Linha do Tempo</>} style={{ marginBottom: 12 }}>
        <Slider
          min={minAno}
          max={maxAno}
          step={null}
          marks={marks}
          value={selectedYear}
          onChange={(v) => onYearChange(v)}
          tooltip={{ formatter: (v) => `${v}` }}
        />
        {currentImage && (
          <div style={{ marginTop: 12, padding: 8, background: '#f6f8fa', borderRadius: 6 }}>
            <Tag color="blue">{currentImage.ano}</Tag>
            <strong>{currentImage.descricao}</strong>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              {currentImage.observacao}
            </div>
          </div>
        )}
      </Card>

      <Card size="small" title="Dados do Bem Patrimonial" style={{ marginBottom: 12 }}>
        <Descriptions column={1} size="small" bordered>
          <Descriptions.Item label="Categoria">{bem.categoria}</Descriptions.Item>
          <Descriptions.Item label="Ano Construção">{bem.anoConstrucao}</Descriptions.Item>
          <Descriptions.Item label="Ano Tombamento">{bem.anoTombamento}</Descriptions.Item>
          <Descriptions.Item label="Grau de Proteção">
            <Tag color="red">{bem.grauProtecao}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Bairro">{bem.bairro}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card size="small" title="Descrição">
        <Text>{bem.descricao}</Text>
        <div style={{ marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            <strong>Significância:</strong> {bem.significancia}
          </Text>
        </div>
      </Card>
    </div>
  );
}
