import type { LatLngExpression } from "leaflet";

export interface BemPatrimonial {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  anoTombamento: number;
  anoConstrucao: number;
  descricao: string;
  significancia: string;
  categoria: string;
  grauProtecao: string;
  status: 'Ativo' | 'Em Análise' | 'Pendente';
  responsavel: string;
  coordinates: LatLngExpression[];
  center: [number, number];
}

export const categorias = [
  "Edificação Teatral",
  "Edificação Militar",
  "Edificação Comercial",
  "Edificação Religiosa",
  "Parque / Jardim Histórico",
  "Edificação Ferroviária",
  "Edificação Portuária",
  "Edificação Civil",
  "Monumento",
  "Conjunto Urbano",
];

export const grausProtecao = [
  "Tombamento Federal (IPHAN)",
  "Tombamento Estadual",
  "Tombamento Municipal",
  "Registro de Patrimônio Imaterial",
];

export const bensPatrimoniais: BemPatrimonial[] = [
  {
    id: 1,
    nome: "Teatro José de Alencar",
    endereco: "Rua Liberato Barroso, 525 - Centro",
    bairro: "Centro",
    anoTombamento: 1964,
    anoConstrucao: 1910,
    descricao: "Teatro de arquitetura eclética com estrutura metálica importada da Escócia.",
    significancia: "Principal espaço teatral da cidade, referência da arquitetura Art Nouveau no Brasil.",
    categoria: "Edificação Teatral",
    grauProtecao: "Tombamento Federal (IPHAN)",
    status: "Ativo",
    responsavel: "IPHAN - Superintendência Ceará",
    coordinates: [[-3.7262, -38.5275], [-3.7262, -38.5268], [-3.7270, -38.5268], [-3.7270, -38.5275]],
    center: [-3.7266, -38.5272],
  },
  {
    id: 2,
    nome: "Fortaleza de Nossa Senhora da Assunção",
    endereco: "Av. Alberto Nepomuceno, s/n - Centro",
    bairro: "Centro",
    anoTombamento: 1950,
    anoConstrucao: 1649,
    descricao: "Fortaleza holandesa do século XVII, sede da 10ª Região Militar.",
    significancia: "Marco fundador da cidade de Fortaleza.",
    categoria: "Edificação Militar",
    grauProtecao: "Tombamento Federal (IPHAN)",
    status: "Ativo",
    responsavel: "Exército Brasileiro / IPHAN",
    coordinates: [[-3.7180, -38.5145], [-3.7180, -38.5130], [-3.7195, -38.5130], [-3.7195, -38.5145]],
    center: [-3.7188, -38.5138],
  },
  {
    id: 3,
    nome: "Mercado Central de Fortaleza",
    endereco: "Av. Alberto Nepomuceno, 199 - Centro",
    bairro: "Centro",
    anoTombamento: 2004,
    anoConstrucao: 1975,
    descricao: "Mercado público com mais de 500 boxes de artesanato e gastronomia.",
    significancia: "Principal ponto de comércio popular e turístico de Fortaleza.",
    categoria: "Edificação Comercial",
    grauProtecao: "Tombamento Municipal",
    status: "Ativo",
    responsavel: "Prefeitura Municipal de Fortaleza",
    coordinates: [[-3.7270, -38.5310], [-3.7270, -38.5298], [-3.7282, -38.5298], [-3.7282, -38.5310]],
    center: [-3.7276, -38.5304],
  },
  {
    id: 4,
    nome: "Catedral Metropolitana de Fortaleza",
    endereco: "Av. Frei Mansueto, 180 - Centro",
    bairro: "Centro",
    anoTombamento: 2002,
    anoConstrucao: 1978,
    descricao: "Catedral de estilo gótico romano, terceira maior do mundo.",
    significancia: "Marco religioso e arquitetônico, inspirada na Catedral de Colônia.",
    categoria: "Edificação Religiosa",
    grauProtecao: "Tombamento Estadual",
    status: "Ativo",
    responsavel: "Arquidiocese de Fortaleza / SECULT-CE",
    coordinates: [[-3.7240, -38.5260], [-3.7240, -38.5248], [-3.7254, -38.5248], [-3.7254, -38.5260]],
    center: [-3.7247, -38.5254],
  },
  {
    id: 5,
    nome: "Passeio Público de Fortaleza",
    endereco: "Praça dos Mártires, s/n - Centro",
    bairro: "Centro",
    anoTombamento: 1965,
    anoConstrucao: 1880,
    descricao: "Primeiro parque público de Fortaleza, com três platôs e rica arborização.",
    significancia: "Mais antigo jardim público de Fortaleza, palco de eventos históricos.",
    categoria: "Parque / Jardim Histórico",
    grauProtecao: "Tombamento Estadual",
    status: "Ativo",
    responsavel: "SECULT-CE",
    coordinates: [[-3.7212, -38.5210], [-3.7212, -38.5192], [-3.7228, -38.5192], [-3.7228, -38.5210]],
    center: [-3.7220, -38.5201],
  },
  {
    id: 6,
    nome: "Estação Ferroviária João Felipe",
    endereco: "Praça Castro Carreira, s/n - Centro",
    bairro: "Centro",
    anoTombamento: 1983,
    anoConstrucao: 1880,
    descricao: "Antiga estação central da Rede Viação Cearense com torre do relógio.",
    significancia: "Símbolo do desenvolvimento ferroviário do Ceará no século XIX.",
    categoria: "Edificação Ferroviária",
    grauProtecao: "Tombamento Federal (IPHAN)",
    status: "Ativo",
    responsavel: "IPHAN / Metrofor",
    coordinates: [[-3.7198, -38.5340], [-3.7198, -38.5328], [-3.7210, -38.5328], [-3.7210, -38.5340]],
    center: [-3.7204, -38.5334],
  },
  {
    id: 7,
    nome: "Farol do Mucuripe",
    endereco: "Av. Vicente de Castro, s/n - Mucuripe",
    bairro: "Mucuripe",
    anoTombamento: 2007,
    anoConstrucao: 1846,
    descricao: "Farol de ferro fundido de 1846, um dos mais antigos do Brasil.",
    significancia: "Marco da navegação no litoral cearense.",
    categoria: "Edificação Portuária",
    grauProtecao: "Tombamento Estadual",
    status: "Em Análise",
    responsavel: "SECULT-CE / Marinha do Brasil",
    coordinates: [[-3.7100, -38.4830], [-3.7100, -38.4822], [-3.7108, -38.4822], [-3.7108, -38.4830]],
    center: [-3.7104, -38.4826],
  },
  {
    id: 8,
    nome: "Palacete Ceará",
    endereco: "Rua Major Facundo, 154 - Centro",
    bairro: "Centro",
    anoTombamento: 1995,
    anoConstrucao: 1916,
    descricao: "Palacete eclético com elementos Art Nouveau, hoje centro cultural.",
    significancia: "Exemplar da arquitetura comercial da Belle Époque em Fortaleza.",
    categoria: "Edificação Civil",
    grauProtecao: "Tombamento Municipal",
    status: "Pendente",
    responsavel: "Prefeitura Municipal de Fortaleza",
    coordinates: [[-3.7255, -38.5295], [-3.7255, -38.5289], [-3.7261, -38.5289], [-3.7261, -38.5295]],
    center: [-3.7258, -38.5292],
  },
];
