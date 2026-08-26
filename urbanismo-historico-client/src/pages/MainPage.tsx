import { useState, useCallback } from 'react';
import { Layout, Typography } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import MapView from '../components/MapView';
import BemPanel from '../components/BemPanel';
import TimelinePanel from '../components/TimelinePanel';
import { bensPatrimoniais } from '../data/patrimonioData';
import type { BemPatrimonial } from '../data/patrimonioData';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function MainPage() {
  const [selectedBem, setSelectedBem] = useState<BemPatrimonial | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [flyKey, setFlyKey] = useState(0);

  const handleSelectBem = useCallback((bem: BemPatrimonial) => {
    setSelectedBem(bem);
    setFlyKey((k) => k + 1);
    const anos = bem.imagensHistoricas.map((i) => i.ano);
    setSelectedYear(Math.max(...anos));
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ background: '#5b73a6', padding: '0 24px', display: 'flex', alignItems: 'center', height: 56 }}>
        <img
          src="/logo-prefeitura.svg"
          alt="IDE SEUMA"
          style={{ height: 36, marginRight: 16 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <Title level={4} style={{ color: '#fff', margin: 0, fontSize: 16 }}>
          <BankOutlined style={{ marginRight: 8 }} />
          Urbanismo Histórico - Visualização Temporal de Bens Patrimoniais
        </Title>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, marginLeft: 12 }}>
          Consulta pública (cidadão): visualização do acervo por período. O cadastro é feito na ferramenta administrativa.
        </span>
      </Header>
      <Layout>
        <Sider width={320} style={{ background: '#fff', borderRight: '1px solid #f0f0f0', overflow: 'hidden' }}>
          <BemPanel bens={bensPatrimoniais} selectedBem={selectedBem} onSelectBem={handleSelectBem} />
        </Sider>
        <Content style={{ position: 'relative' }}>
          <MapView bens={bensPatrimoniais} selectedBem={selectedBem} onSelectBem={handleSelectBem} flyKey={flyKey} />
          {selectedBem && (
            <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 8,
              padding: '8px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 1000,
              fontSize: 13,
            }}>
              <strong style={{ color: '#5b73a6' }}>Visualizando: {selectedYear}</strong>
              <span style={{ marginLeft: 8, color: '#666' }}>
                {selectedBem.imagensHistoricas.find(i => i.ano === selectedYear)?.descricao}
              </span>
            </div>
          )}
        </Content>
        <Sider width={380} style={{ background: '#fff', borderLeft: '1px solid #f0f0f0', overflow: 'hidden' }}>
          <TimelinePanel bem={selectedBem} selectedYear={selectedYear} onYearChange={setSelectedYear} />
        </Sider>
      </Layout>
    </Layout>
  );
}
