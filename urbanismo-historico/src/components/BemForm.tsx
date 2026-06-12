import { Form, Input, Select, InputNumber, Button, DatePicker, Card, message } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { categorias, grausProtecao } from '../data/patrimonioData';
import type { BemPatrimonial } from '../data/patrimonioData';

const { TextArea } = Input;

interface BemFormProps {
  editingBem: BemPatrimonial | null;
  onSave: (values: Partial<BemPatrimonial>) => void;
  onCancel: () => void;
}

export default function BemForm({ editingBem, onSave, onCancel }: BemFormProps) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values: Record<string, unknown>) => {
    onSave(values as Partial<BemPatrimonial>);
    messageApi.success(editingBem ? 'Bem atualizado com sucesso!' : 'Bem cadastrado com sucesso!');
    form.resetFields();
  };

  return (
    <Card
      title={editingBem ? `Editando: ${editingBem.nome}` : 'Cadastrar Novo Bem Patrimonial'}
      size="small"
      extra={editingBem && <Button size="small" onClick={onCancel}>Cancelar</Button>}
      style={{ height: '100%', overflow: 'auto' }}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        size="small"
        onFinish={handleFinish}
        initialValues={editingBem ? {
          nome: editingBem.nome,
          endereco: editingBem.endereco,
          bairro: editingBem.bairro,
          categoria: editingBem.categoria,
          grauProtecao: editingBem.grauProtecao,
          anoConstrucao: editingBem.anoConstrucao,
          descricao: editingBem.descricao,
          significancia: editingBem.significancia,
          responsavel: editingBem.responsavel,
        } : undefined}
      >
        <Form.Item name="nome" label="Nome do Bem" rules={[{ required: true, message: 'Informe o nome' }]}>
          <Input placeholder="Ex: Teatro José de Alencar" />
        </Form.Item>
        <Form.Item name="endereco" label="Endereço" rules={[{ required: true, message: 'Informe o endereço' }]}>
          <Input placeholder="Ex: Rua Liberato Barroso, 525 - Centro" />
        </Form.Item>
        <Form.Item name="bairro" label="Bairro" rules={[{ required: true, message: 'Informe o bairro' }]}>
          <Input placeholder="Ex: Centro" />
        </Form.Item>
        <Form.Item name="categoria" label="Categoria" rules={[{ required: true, message: 'Selecione a categoria' }]}>
          <Select placeholder="Selecione a categoria">
            {categorias.map((c) => <Select.Option key={c} value={c}>{c}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="grauProtecao" label="Grau de Proteção" rules={[{ required: true, message: 'Selecione o grau' }]}>
          <Select placeholder="Selecione o grau de proteção">
            {grausProtecao.map((g) => <Select.Option key={g} value={g}>{g}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="anoConstrucao" label="Ano de Construção">
          <InputNumber style={{ width: '100%' }} min={1500} max={2024} placeholder="Ex: 1910" />
        </Form.Item>
        <Form.Item name="anoTombamento" label="Data do Tombamento">
          <DatePicker picker="year" style={{ width: '100%' }} placeholder="Ano do tombamento" />
        </Form.Item>
        <Form.Item name="responsavel" label="Órgão Responsável">
          <Input placeholder="Ex: IPHAN - Superintendência Ceará" />
        </Form.Item>
        <Form.Item name="descricao" label="Descrição">
          <TextArea rows={3} placeholder="Descrição do bem patrimonial" />
        </Form.Item>
        <Form.Item name="significancia" label="Significância Histórica">
          <TextArea rows={3} placeholder="Importância histórica e cultural" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={editingBem ? <SaveOutlined /> : <PlusOutlined />} block>
            {editingBem ? 'Atualizar Bem' : 'Cadastrar Bem'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
