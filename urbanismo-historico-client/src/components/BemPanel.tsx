import { Input, List, Button, Tag } from 'antd';
import { SearchOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { BemPatrimonial } from '../data/patrimonioData';

interface BemPanelProps {
  bens: BemPatrimonial[];
  selectedBem: BemPatrimonial | null;
  onSelectBem: (bem: BemPatrimonial) => void;
}

export default function BemPanel({ bens, selectedBem, onSelectBem }: BemPanelProps) {
  const [searchText, setSearchText] = useState('');

  const filtered = bens.filter(
    (b) =>
      b.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      b.endereco.toLowerCase().includes(searchText.toLowerCase()) ||
      b.bairro.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
        <Input
          placeholder="Buscar bem patrimonial..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
        <List
          size="small"
          dataSource={filtered}
          renderItem={(bem) => (
            <List.Item
              style={{
                cursor: 'pointer',
                background: selectedBem?.id === bem.id ? '#e6f4ff' : 'transparent',
                borderRadius: 6,
                padding: '8px 12px',
                marginBottom: 4,
              }}
              onClick={() => onSelectBem(bem)}
            >
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 13 }}>{bem.nome}</strong>
                  <Button
                    type="link"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={(e) => { e.stopPropagation(); onSelectBem(bem); }}
                  />
                </div>
                <div style={{ fontSize: 11, color: '#888' }}>
                  <EnvironmentOutlined /> {bem.endereco}
                </div>
                <div style={{ marginTop: 4 }}>
                  <Tag color="orange" style={{ fontSize: 10 }}>{bem.categoria}</Tag>
                  <Tag color="blue" style={{ fontSize: 10 }}>Tombado: {bem.anoTombamento}</Tag>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
