import { useState, useCallback } from 'react';
import { Layout, Typography, Tabs } from 'antd';
import { FormOutlined, TableOutlined, BankOutlined } from '@ant-design/icons';
import MapView from '../components/MapView';
import BemForm from '../components/BemForm';
import BemTable from '../components/BemTable';
import { bensPatrimoniais as initialBens } from '../data/patrimonioData';
import type { BemPatrimonial } from '../data/patrimonioData';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function MainPage() {
  const [bens, setBens] = useState<BemPatrimonial[]>(initialBens);
  const [selectedBem, setSelectedBem] = useState<BemPatrimonial | null>(null);
  const [editingBem, setEditingBem] = useState<BemPatrimonial | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const [activeTab, setActiveTab] = useState('list');

  const handleSelectBem = useCallback((bem: BemPatrimonial) => {
    setSelectedBem(bem);
    setFlyKey((k) => k + 1);
  }, []);

  const handleSave = useCallback((values: Partial<BemPatrimonial>) => {
    if (editingBem) {
      setBens((prev) => prev.map((b) => b.id === editingBem.id ? { ...b, ...values } : b));
      setEditingBem(null);
    } else {
      const newBem: BemPatrimonial = {
        id: Date.now(),
        nome: (values.nome as string) || '',
        endereco: (values.endereco as string) || '',
        bairro: (values.bairro as string) || '',
        anoTombamento: 2024,
        anoConstrucao: (values.anoConstrucao as number) || 2000,
        descricao: (values.descricao as string) || '',
        significancia: (values.significancia as string) || '',
        categoria: (values.categoria as string) || '',
        grauProtecao: (values.grauProtecao as string) || '',
        status: 'Pendente',
        responsavel: (values.responsavel as string) || '',
        coordinates: [[-3.7300, -38.5250], [-3.7300, -38.5240], [-3.7310, -38.5240], [-3.7310, -38.5250]],
        center: [-3.7305, -38.5245],
      };
      setBens((prev) => [...prev, newBem]);
    }
    setActiveTab('list');
  }, [editingBem]);

  const handleExportPdf = useCallback((bem: BemPatrimonial) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(91, 115, 166);
    doc.text('Ficha Cadastral - Bem Patrimonial', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Emitido em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 28);
    doc.line(14, 30, 196, 30);

    const data = [
      ['Nome', bem.nome],
      ['Endereço', bem.endereco],
      ['Bairro', bem.bairro],
      ['Categoria', bem.categoria],
      ['Grau de Proteção', bem.grauProtecao],
      ['Ano de Construção', String(bem.anoConstrucao)],
      ['Ano de Tombamento', String(bem.anoTombamento)],
      ['Status', bem.status],
      ['Responsável', bem.responsavel],
      ['Descrição', bem.descricao],
      ['Significância', bem.significancia],
    ];

    (doc as unknown as { autoTable: (opts: unknown) => void }).autoTable({
      startY: 35,
      head: [['Campo', 'Valor']],
      body: data,
      theme: 'striped',
      headStyles: { fillColor: [91, 115, 166] },
      styles: { fontSize: 9 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 } },
    });

    doc.save(`ficha_${bem.nome.replace(/\s/g, '_')}.pdf`);
  }, []);

  const tabItems = [
    {
      key: 'list',
      label: <><TableOutlined /> Bens Cadastrados</>,
      children: (
        <BemTable
          bens={bens}
          onView={handleSelectBem}
          onEdit={(bem) => { setEditingBem(bem); setActiveTab('form'); }}
          onExportPdf={handleExportPdf}
        />
      ),
    },
    {
      key: 'form',
      label: <><FormOutlined /> {editingBem ? 'Editar Bem' : 'Novo Cadastro'}</>,
      children: (
        <BemForm
          editingBem={editingBem}
          onSave={handleSave}
          onCancel={() => { setEditingBem(null); setActiveTab('list'); }}
        />
      ),
    },
  ];

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
          Urbanismo Histórico - Cadastro de Bens Patrimoniais
        </Title>
      </Header>
      <Layout>
        <Content style={{ position: 'relative' }}>
          <MapView bens={bens} selectedBem={selectedBem} onSelectBem={handleSelectBem} flyKey={flyKey} />
          {selectedBem && (
            <div style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 8,
              padding: '12px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxHeight: 120,
              overflow: 'auto',
            }}>
              <strong style={{ color: '#5b73a6' }}>{selectedBem.nome}</strong>
              <span style={{ marginLeft: 12, fontSize: 12, color: '#666' }}>{selectedBem.endereco}</span>
              <div style={{ fontSize: 11, marginTop: 4 }}>
                <span>{selectedBem.categoria}</span>
                <span style={{ margin: '0 8px' }}>|</span>
                <span>{selectedBem.grauProtecao}</span>
                <span style={{ margin: '0 8px' }}>|</span>
                <span style={{ color: selectedBem.status === 'Ativo' ? 'green' : selectedBem.status === 'Em Análise' ? 'orange' : 'red' }}>
                  {selectedBem.status}
                </span>
              </div>
            </div>
          )}
        </Content>
        <Sider width={450} style={{ background: '#fff', borderLeft: '1px solid #f0f0f0', overflow: 'hidden' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            style={{ height: '100%' }}
            tabBarStyle={{ padding: '0 12px', margin: 0 }}
          />
        </Sider>
      </Layout>
    </Layout>
  );
}
