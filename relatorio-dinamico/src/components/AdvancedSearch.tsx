import { Modal, Form, Select, Input, Button } from "antd";

interface AdvancedSearchProps {
  open: boolean;
  onClose: () => void;
  onSearch: (values: AdvancedSearchValues) => void;
}

export interface AdvancedSearchValues {
  tipoLogradouro?: string;
  tituloLogradouro?: string;
  nomeLogradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  statusProcesso?: string;
  tipoProcesso?: string;
}

export default function AdvancedSearch({ open, onClose, onSearch }: AdvancedSearchProps) {
  const [form] = Form.useForm();

  const handleBuscar = () => {
    const values = form.getFieldsValue();
    onSearch(values);
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Pesquisa Avançada"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancelar</Button>,
        <Button key="search" type="primary" onClick={handleBuscar}>Buscar</Button>,
      ]}
      width={640}
    >
      <Form form={form} layout="vertical">
        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item label="Tipo logradouro" name="tipoLogradouro" style={{ flex: 1 }}>
            <Select placeholder="Selecione o tipo" allowClear>
              <Select.Option value="Rua">Rua</Select.Option>
              <Select.Option value="Avenida">Avenida</Select.Option>
              <Select.Option value="Travessa">Travessa</Select.Option>
              <Select.Option value="Alameda">Alameda</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Título logradouro" name="tituloLogradouro" style={{ flex: 1 }}>
            <Select placeholder="Selecione o título" allowClear>
              <Select.Option value="Barão">Barão</Select.Option>
              <Select.Option value="Padre">Padre</Select.Option>
              <Select.Option value="Senador">Senador</Select.Option>
              <Select.Option value="Monsenhor">Monsenhor</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item label="Nome logradouro" name="nomeLogradouro">
          <Input placeholder="Pesquise pelo nome do logradouro" />
        </Form.Item>
        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item label="Número" name="numero" style={{ flex: 1 }}>
            <Input placeholder="Nº" />
          </Form.Item>
          <Form.Item label="Complemento" name="complemento" style={{ flex: 1 }}>
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item label="Bairro" name="bairro" style={{ flex: 1 }}>
            <Select placeholder="Filtrar por bairro" allowClear>
              <Select.Option value="Meireles">Meireles</Select.Option>
              <Select.Option value="Aldeota">Aldeota</Select.Option>
              <Select.Option value="Centro">Centro</Select.Option>
              <Select.Option value="Mucuripe">Mucuripe</Select.Option>
              <Select.Option value="Praia de Iracema">Praia de Iracema</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status do processo" name="statusProcesso" style={{ flex: 1 }}>
            <Select placeholder="Filtrar por status" allowClear>
              <Select.Option value="Aprovado">Aprovado</Select.Option>
              <Select.Option value="Em Análise">Em Análise</Select.Option>
              <Select.Option value="Pendente">Pendente</Select.Option>
              <Select.Option value="Indeferido">Indeferido</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tipo de processo" name="tipoProcesso" style={{ flex: 1 }}>
            <Select placeholder="Filtrar por tipo" allowClear>
              <Select.Option value="Licença Ambiental">Licença Ambiental</Select.Option>
              <Select.Option value="Licença de Operação">Licença de Operação</Select.Option>
              <Select.Option value="Licença de Instalação">Licença de Instalação</Select.Option>
              <Select.Option value="Alvará de Construção">Alvará de Construção</Select.Option>
              <Select.Option value="Alvará de Funcionamento">Alvará de Funcionamento</Select.Option>
              <Select.Option value="Estudo de Impacto">Estudo de Impacto</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
