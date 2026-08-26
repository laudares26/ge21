import type { LatLngExpression } from "leaflet";

export interface ProcessDocument {
  nome: string;
  tipo: string;
  dataUpload: string;
}

export interface LicenciamentoProcess {
  protocolo: string;
  tipo: string;
  status: "Aprovado" | "Em Análise" | "Indeferido" | "Pendente";
  dataAbertura: string;
  atividade: string;
  responsavel: string;
  documentos: ProcessDocument[];
}

export interface IptuLote {
  iptu: string;
  endereco: string;
  bairro: string;
  area: number;
  proprietario: string;
  zoneamento: string;
  coordinates: LatLngExpression[];
  center: [number, number];
  processos: LicenciamentoProcess[];
}

export const iptuLotes: IptuLote[] = [
  {
    iptu: "0001.001.001",
    endereco: "Rua Barão de Aracati, 100 - Meireles",
    bairro: "Meireles",
    area: 450,
    proprietario: "João Silva",
    zoneamento: "ZOM-1",
    coordinates: [[-3.7260, -38.5110], [-3.7260, -38.5100], [-3.7268, -38.5100], [-3.7268, -38.5110]],
    center: [-3.7264, -38.5105],
    processos: [
      { protocolo: "LD-2025-001234", tipo: "Licença Ambiental", status: "Aprovado", dataAbertura: "2025-01-15", atividade: "Comércio varejista", responsavel: "Eng. Carlos Lima", documentos: [{ nome: "Parecer Técnico Ambiental", tipo: "PDF", dataUpload: "2025-01-20" }, { nome: "Laudo de Vistoria", tipo: "PDF", dataUpload: "2025-01-18" }] },
      { protocolo: "LD-2025-001235", tipo: "Alvará de Construção", status: "Em Análise", dataAbertura: "2025-03-22", atividade: "Reforma predial", responsavel: "Arq. Maria Santos", documentos: [{ nome: "Projeto Arquitetônico", tipo: "DWG", dataUpload: "2025-03-22" }, { nome: "ART do Responsável", tipo: "PDF", dataUpload: "2025-03-22" }] },
    ],
  },
  {
    iptu: "0001.001.002",
    endereco: "Rua Barão de Aracati, 120 - Meireles",
    bairro: "Meireles",
    area: 380,
    proprietario: "Maria Santos",
    zoneamento: "ZOM-1",
    coordinates: [[-3.7260, -38.5100], [-3.7260, -38.5090], [-3.7268, -38.5090], [-3.7268, -38.5100]],
    center: [-3.7264, -38.5095],
    processos: [
      { protocolo: "LD-2024-009876", tipo: "Licença de Operação", status: "Aprovado", dataAbertura: "2024-11-10", atividade: "Restaurante", responsavel: "Eng. Pedro Alves", documentos: [{ nome: "Licença de Operação - Aprovada", tipo: "PDF", dataUpload: "2024-12-05" }, { nome: "Certificado Bombeiros", tipo: "PDF", dataUpload: "2024-11-25" }, { nome: "Alvará Sanitário", tipo: "PDF", dataUpload: "2024-11-20" }] },
    ],
  },
  {
    iptu: "0002.003.005",
    endereco: "Av. Beira Mar, 3200 - Meireles",
    bairro: "Meireles",
    area: 1200,
    proprietario: "Pedro Lima",
    zoneamento: "ZOC",
    coordinates: [[-3.7230, -38.5140], [-3.7230, -38.5120], [-3.7242, -38.5120], [-3.7242, -38.5140]],
    center: [-3.7236, -38.5130],
    processos: [
      { protocolo: "LD-2025-002100", tipo: "Licença Ambiental", status: "Pendente", dataAbertura: "2025-04-05", atividade: "Hotel", responsavel: "Eng. Ana Costa", documentos: [{ nome: "EIA/RIMA", tipo: "PDF", dataUpload: "2025-04-05" }] },
      { protocolo: "LD-2025-002101", tipo: "Alvará de Funcionamento", status: "Aprovado", dataAbertura: "2025-02-18", atividade: "Hotel e Turismo", responsavel: "Eng. Ana Costa", documentos: [{ nome: "Alvará de Funcionamento", tipo: "PDF", dataUpload: "2025-03-10" }, { nome: "Habite-se", tipo: "PDF", dataUpload: "2025-02-28" }] },
      { protocolo: "LD-2024-008500", tipo: "Estudo de Impacto", status: "Aprovado", dataAbertura: "2024-08-12", atividade: "Empreendimento turístico", responsavel: "Eng. Roberto Dias", documentos: [{ nome: "EIV - Estudo de Impacto de Vizinhança", tipo: "PDF", dataUpload: "2024-08-12" }, { nome: "Relatório de Impacto", tipo: "PDF", dataUpload: "2024-09-15" }] },
    ],
  },
  {
    iptu: "0003.010.008",
    endereco: "Rua Osvaldo Cruz, 500 - Aldeota",
    bairro: "Aldeota",
    area: 520,
    proprietario: "Fernanda Costa",
    zoneamento: "ZOM-2",
    coordinates: [[-3.7310, -38.5180], [-3.7310, -38.5168], [-3.7320, -38.5168], [-3.7320, -38.5180]],
    center: [-3.7315, -38.5174],
    processos: [
      { protocolo: "LD-2025-003400", tipo: "Licença de Instalação", status: "Indeferido", dataAbertura: "2025-05-10", atividade: "Oficina mecânica", responsavel: "Eng. Thiago Ramos", documentos: [{ nome: "Despacho de Indeferimento", tipo: "PDF", dataUpload: "2025-05-25" }, { nome: "Requerimento Inicial", tipo: "PDF", dataUpload: "2025-05-10" }] },
    ],
  },
  {
    iptu: "0004.007.012",
    endereco: "Av. Santos Dumont, 1500 - Aldeota",
    bairro: "Aldeota",
    area: 900,
    proprietario: "Ricardo Alves",
    zoneamento: "ZOC",
    coordinates: [[-3.7340, -38.5260], [-3.7340, -38.5240], [-3.7352, -38.5240], [-3.7352, -38.5260]],
    center: [-3.7346, -38.5250],
    processos: [
      { protocolo: "LD-2025-004500", tipo: "Licença Ambiental", status: "Aprovado", dataAbertura: "2025-01-28", atividade: "Shopping center", responsavel: "Eng. Juliana Campos", documentos: [{ nome: "Licença Ambiental - Deferida", tipo: "PDF", dataUpload: "2025-02-20" }, { nome: "PRAD - Plano de Recuperação", tipo: "PDF", dataUpload: "2025-02-15" }] },
      { protocolo: "LD-2025-004501", tipo: "Licença de Operação", status: "Em Análise", dataAbertura: "2025-06-01", atividade: "Shopping center", responsavel: "Eng. Juliana Campos", documentos: [{ nome: "Memorial Descritivo", tipo: "PDF", dataUpload: "2025-06-01" }] },
    ],
  },
  {
    iptu: "0005.002.003",
    endereco: "Rua Padre Valdevino, 800 - Centro",
    bairro: "Centro",
    area: 350,
    proprietario: "Lucia Martins",
    zoneamento: "ZOM-1",
    coordinates: [[-3.7380, -38.5320], [-3.7380, -38.5310], [-3.7388, -38.5310], [-3.7388, -38.5320]],
    center: [-3.7384, -38.5315],
    processos: [
      { protocolo: "LD-2024-007600", tipo: "Alvará de Construção", status: "Aprovado", dataAbertura: "2024-09-15", atividade: "Edifício residencial", responsavel: "Arq. Eduardo Lima", documentos: [{ nome: "Alvará de Construção", tipo: "PDF", dataUpload: "2024-10-10" }, { nome: "Projeto Estrutural", tipo: "DWG", dataUpload: "2024-09-20" }] },
      { protocolo: "LD-2025-005600", tipo: "Licença Ambiental", status: "Em Análise", dataAbertura: "2025-03-10", atividade: "Edifício residencial", responsavel: "Eng. Beatriz Lopes", documentos: [{ nome: "RCA - Relatório de Controle Ambiental", tipo: "PDF", dataUpload: "2025-03-10" }] },
    ],
  },
  {
    iptu: "0006.005.001",
    endereco: "Av. Abolição, 2200 - Mucuripe",
    bairro: "Mucuripe",
    area: 680,
    proprietario: "Carlos Oliveira",
    zoneamento: "ZOT",
    coordinates: [[-3.7220, -38.5050], [-3.7220, -38.5035], [-3.7232, -38.5035], [-3.7232, -38.5050]],
    center: [-3.7226, -38.5042],
    processos: [
      { protocolo: "LD-2025-006700", tipo: "Licença de Operação", status: "Aprovado", dataAbertura: "2025-02-05", atividade: "Pousada", responsavel: "Eng. Helena Dias", documentos: [{ nome: "Licença de Operação", tipo: "PDF", dataUpload: "2025-03-01" }, { nome: "AVCB - Auto Vistoria Bombeiros", tipo: "PDF", dataUpload: "2025-02-20" }] },
    ],
  },
  {
    iptu: "0007.001.004",
    endereco: "Rua Torres Câmara, 300 - Aldeota",
    bairro: "Aldeota",
    area: 410,
    proprietario: "Ana Pereira",
    zoneamento: "ZOM-2",
    coordinates: [[-3.7290, -38.5220], [-3.7290, -38.5210], [-3.7298, -38.5210], [-3.7298, -38.5220]],
    center: [-3.7294, -38.5215],
    processos: [
      { protocolo: "LD-2025-007800", tipo: "Licença Ambiental", status: "Pendente", dataAbertura: "2025-05-20", atividade: "Clínica médica", responsavel: "Eng. Diego Pinto", documentos: [{ nome: "Formulário de Requerimento", tipo: "PDF", dataUpload: "2025-05-20" }] },
      { protocolo: "LD-2024-006300", tipo: "Alvará de Funcionamento", status: "Aprovado", dataAbertura: "2024-07-12", atividade: "Consultório odontológico", responsavel: "Eng. Camila Araújo", documentos: [{ nome: "Alvará de Funcionamento", tipo: "PDF", dataUpload: "2024-08-05" }, { nome: "Licença Vigilância Sanitária", tipo: "PDF", dataUpload: "2024-07-28" }] },
    ],
  },
  {
    iptu: "0008.004.002",
    endereco: "Av. Dom Luís, 1000 - Aldeota",
    bairro: "Aldeota",
    area: 750,
    proprietario: "Roberto Souza",
    zoneamento: "ZOC",
    coordinates: [[-3.7350, -38.5170], [-3.7350, -38.5155], [-3.7362, -38.5155], [-3.7362, -38.5170]],
    center: [-3.7356, -38.5162],
    processos: [
      { protocolo: "LD-2025-008900", tipo: "Licença Ambiental", status: "Aprovado", dataAbertura: "2025-01-05", atividade: "Centro empresarial", responsavel: "Eng. Patrícia Teixeira", documentos: [{ nome: "Parecer Ambiental Favorável", tipo: "PDF", dataUpload: "2025-02-01" }, { nome: "PCA - Plano de Controle Ambiental", tipo: "PDF", dataUpload: "2025-01-20" }] },
      { protocolo: "LD-2025-008901", tipo: "Licença de Instalação", status: "Aprovado", dataAbertura: "2025-04-15", atividade: "Centro empresarial", responsavel: "Eng. André Carvalho", documentos: [{ nome: "Licença de Instalação", tipo: "PDF", dataUpload: "2025-05-10" }] },
      { protocolo: "LD-2025-008902", tipo: "Licença de Operação", status: "Em Análise", dataAbertura: "2025-06-02", atividade: "Centro empresarial", responsavel: "Eng. Patrícia Teixeira", documentos: [{ nome: "Requerimento LO", tipo: "PDF", dataUpload: "2025-06-02" }, { nome: "Relatório de Monitoramento", tipo: "PDF", dataUpload: "2025-06-05" }] },
    ],
  },
  {
    iptu: "0009.006.003",
    endereco: "Rua Senador Pompeu, 600 - Centro",
    bairro: "Centro",
    area: 290,
    proprietario: "Mariana Ferreira",
    zoneamento: "ZOM-1",
    coordinates: [[-3.7400, -38.5370], [-3.7400, -38.5360], [-3.7407, -38.5360], [-3.7407, -38.5370]],
    center: [-3.7403, -38.5365],
    processos: [
      { protocolo: "LD-2024-005200", tipo: "Alvará de Construção", status: "Indeferido", dataAbertura: "2024-06-20", atividade: "Galpão comercial", responsavel: "Arq. Leonardo Barros", documentos: [{ nome: "Despacho de Indeferimento", tipo: "PDF", dataUpload: "2024-07-15" }, { nome: "Notificação ao Requerente", tipo: "PDF", dataUpload: "2024-07-16" }] },
      { protocolo: "LD-2025-009100", tipo: "Licença Ambiental", status: "Pendente", dataAbertura: "2025-05-28", atividade: "Galpão comercial", responsavel: "Eng. Simone Cardoso", documentos: [{ nome: "Formulário LD", tipo: "PDF", dataUpload: "2025-05-28" }] },
    ],
  },
  {
    iptu: "0010.003.007",
    endereco: "Rua Ildefonso Albano, 250 - Aldeota",
    bairro: "Aldeota",
    area: 560,
    proprietario: "Gabriel Monteiro",
    zoneamento: "ZOM-2",
    coordinates: [[-3.7275, -38.5195], [-3.7275, -38.5183], [-3.7284, -38.5183], [-3.7284, -38.5195]],
    center: [-3.7280, -38.5189],
    processos: [
      { protocolo: "LD-2025-010200", tipo: "Licença Ambiental", status: "Aprovado", dataAbertura: "2025-02-14", atividade: "Escola particular", responsavel: "Eng. Renata Moura", documentos: [{ nome: "Licença Ambiental - Deferida", tipo: "PDF", dataUpload: "2025-03-10" }, { nome: "Laudo Acústico", tipo: "PDF", dataUpload: "2025-02-28" }, { nome: "Plano de Gerenciamento de Resíduos", tipo: "PDF", dataUpload: "2025-03-05" }] },
    ],
  },
  {
    iptu: "0011.008.001",
    endereco: "Av. Monsenhor Tabosa, 900 - Praia de Iracema",
    bairro: "Praia de Iracema",
    area: 820,
    proprietario: "Tereza Barbosa",
    zoneamento: "ZOT",
    coordinates: [[-3.7210, -38.5170], [-3.7210, -38.5152], [-3.7222, -38.5152], [-3.7222, -38.5170]],
    center: [-3.7216, -38.5161],
    processos: [
      { protocolo: "LD-2025-011300", tipo: "Licença de Operação", status: "Em Análise", dataAbertura: "2025-04-22", atividade: "Bar e restaurante", responsavel: "Eng. Gustavo Nunes", documentos: [{ nome: "Memorial Descritivo", tipo: "PDF", dataUpload: "2025-04-22" }, { nome: "Planta Baixa", tipo: "DWG", dataUpload: "2025-04-22" }] },
      { protocolo: "LD-2024-004100", tipo: "Alvará de Funcionamento", status: "Aprovado", dataAbertura: "2024-05-08", atividade: "Bar noturno", responsavel: "Eng. Fábio Gomes", documentos: [{ nome: "Alvará de Funcionamento", tipo: "PDF", dataUpload: "2024-06-01" }] },
    ],
  },
  {
    iptu: "0012.002.009",
    endereco: "Rua Nogueira Acioli, 400 - Centro",
    bairro: "Centro",
    area: 310,
    proprietario: "Paulo Ferreira",
    zoneamento: "ZOM-1",
    coordinates: [[-3.7370, -38.5290], [-3.7370, -38.5280], [-3.7378, -38.5280], [-3.7378, -38.5290]],
    center: [-3.7374, -38.5285],
    processos: [
      { protocolo: "LD-2025-012400", tipo: "Licença Ambiental", status: "Aprovado", dataAbertura: "2025-03-01", atividade: "Estacionamento", responsavel: "Eng. Viviane Melo", documentos: [{ nome: "Licença Ambiental", tipo: "PDF", dataUpload: "2025-04-01" }, { nome: "Laudo Técnico Solo", tipo: "PDF", dataUpload: "2025-03-15" }] },
    ],
  },
  {
    iptu: "0013.005.006",
    endereco: "Rua Dragão do Mar, 80 - Praia de Iracema",
    bairro: "Praia de Iracema",
    area: 1500,
    proprietario: "Claudia Mendes",
    zoneamento: "ZOT",
    coordinates: [[-3.7200, -38.5200], [-3.7200, -38.5175], [-3.7214, -38.5175], [-3.7214, -38.5200]],
    center: [-3.7207, -38.5187],
    processos: [
      { protocolo: "LD-2025-013500", tipo: "Estudo de Impacto", status: "Em Análise", dataAbertura: "2025-05-15", atividade: "Centro cultural", responsavel: "Arq. Marcos Vieira", documentos: [{ nome: "EIV - Estudo de Impacto de Vizinhança", tipo: "PDF", dataUpload: "2025-05-15" }, { nome: "Mapa de Localização", tipo: "KML", dataUpload: "2025-05-15" }] },
      { protocolo: "LD-2025-013501", tipo: "Licença Ambiental", status: "Pendente", dataAbertura: "2025-06-01", atividade: "Centro cultural", responsavel: "Eng. Sandra Rocha", documentos: [{ nome: "Formulário de Solicitação", tipo: "PDF", dataUpload: "2025-06-01" }] },
      { protocolo: "LD-2024-003200", tipo: "Alvará de Construção", status: "Aprovado", dataAbertura: "2024-04-10", atividade: "Centro cultural", responsavel: "Arq. Marcos Vieira", documentos: [{ nome: "Alvará de Construção", tipo: "PDF", dataUpload: "2024-05-05" }, { nome: "Projeto Executivo", tipo: "DWG", dataUpload: "2024-04-15" }] },
    ],
  },
  {
    iptu: "0014.007.003",
    endereco: "Av. Historiador Raimundo Girão, 600 - Centro",
    bairro: "Centro",
    area: 430,
    proprietario: "Antônio Ribeiro",
    zoneamento: "ZOC",
    coordinates: [[-3.7325, -38.5310], [-3.7325, -38.5298], [-3.7334, -38.5298], [-3.7334, -38.5310]],
    center: [-3.7330, -38.5304],
    processos: [
      { protocolo: "LD-2025-014600", tipo: "Licença de Instalação", status: "Aprovado", dataAbertura: "2025-01-20", atividade: "Supermercado", responsavel: "Eng. Thiago Ramos", documentos: [{ nome: "Licença de Instalação - Aprovada", tipo: "PDF", dataUpload: "2025-02-18" }, { nome: "Plano de Gerenciamento de Resíduos Sólidos", tipo: "PDF", dataUpload: "2025-02-10" }] },
      { protocolo: "LD-2025-014601", tipo: "Licença de Operação", status: "Pendente", dataAbertura: "2025-05-30", atividade: "Supermercado", responsavel: "Eng. Thiago Ramos", documentos: [{ nome: "Requerimento LO", tipo: "PDF", dataUpload: "2025-05-30" }] },
    ],
  },
];
