import { Table, Tag, Button, Input, Space } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { BemPatrimonial } from '../data/patrimonioData';

interface BemTableProps {
  bens: BemPatrimonial[];
  onView: (bem: BemPatrimonial) => void;
  onEdit: (bem: BemPatrimonial) => void;
  onExportPdf: (bem: BemPatrimonial) => void;
}

export default function BemTable({ bens, onView, onEdit, onExportPdf }: BemTableProps) {
  const [search, setSearch] = useState('');

  const filtered = bens.filter(
    (b) =>
      b.nome.toLowerCase().includes(search.toLowerCase()) ||
      b.endereco.toLowerCase().includes(search.toLowerCase()) ||
      b.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status: string) => {
    if (status === 'Ativo') return 'green';
    if (status === 'Em Análise') return 'orange';
    return 'red';
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      width: 200,
      render: (text: string) => <strong style={{ fontSize: 12 }}>{text}</strong>,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 150,
      render: (text: string) => <Tag color="blue" style={{ fontSize: 10 }}>{text}</Tag>,
    },
    {
      title: 'Proteção',
      dataIndex: 'grauProtecao',
      key: 'grauProtecao',
      width: 160,
      render: (text: string) => <span style={{ fontSize: 11 }}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => <Tag color={statusColor(text)}>{text}</Tag>,
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: 140,
      render: (_: unknown, record: BemPatrimonial) => (
        <Space size="small">
          <Button size="small" icon={<EyeOutlined />} onClick={(e) => { e.stopPropagation(); onView(record); }} />
          <Button size="small" icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); onEdit(record); }} />
          <Button size="small" icon={<FilePdfOutlined />} onClick={(e) => { e.stopPropagation(); onExportPdf(record); }} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
        <Input
          placeholder="Buscar bem patrimonial..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          size="small"
        />
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          size="small"
          pagination={false}
          onRow={(record) => ({ onClick: () => onView(record), style: { cursor: 'pointer' } })}
        />
      </div>
    </div>
  );
}
