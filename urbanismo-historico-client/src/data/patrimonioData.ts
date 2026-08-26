import type { LatLngExpression } from "leaflet";

export interface ImagemHistorica {
  ano: number;
  descricao: string;
  tileUrl: string;
  observacao: string;
}

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
  coordinates: LatLngExpression[];
  center: [number, number];
  imagensHistoricas: ImagemHistorica[];
}

export const bensPatrimoniais: BemPatrimonial[] = [
  {
    id: 1,
    nome: "Teatro José de Alencar",
    endereco: "Rua Liberato Barroso, 525 - Centro",
    bairro: "Centro",
    anoTombamento: 1964,
    anoConstrucao: 1910,
    descricao: "Teatro de arquitetura eclética com estrutura metálica importada da Escócia. Patrimônio tombado pelo IPHAN.",
    significancia: "Principal espaço teatral da cidade, referência da arquitetura Art Nouveau no Brasil. Inaugurado em 1910, é um dos marcos culturais de Fortaleza.",
    categoria: "Edificação Teatral",
    grauProtecao: "Tombamento Federal (IPHAN)",
    coordinates: [
      [-3.7262, -38.5275],
      [-3.7262, -38.5268],
      [-3.7270, -38.5268],
      [-3.7270, -38.5275],
    ],
    center: [-3.7266, -38.5272],
    imagensHistoricas: [
      { ano: 2005, descricao: "Vista aérea pré-restauração", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Período anterior à última restauração completa" },
      { ano: 2010, descricao: "Após restauração de 2009", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Restauração completa da fachada e estrutura metálica" },
      { ano: 2015, descricao: "Consolidação da área cultural", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Entorno requalificado com praça e iluminação" },
      { ano: 2020, descricao: "Período pandêmico", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Teatro fechado durante pandemia, manutenção preventiva" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Em pleno funcionamento com programação cultural ativa" },
    ],
  },
  {
    id: 2,
    nome: "Fortaleza de Nossa Senhora da Assunção",
    endereco: "Av. Alberto Nepomuceno, s/n - Centro",
    bairro: "Centro",
    anoTombamento: 1950,
    anoConstrucao: 1649,
    descricao: "Fortaleza holandesa do século XVII, sede da 10ª Região Militar. Monumento mais antigo de Fortaleza.",
    significancia: "Marco fundador da cidade de Fortaleza. Edificação militar colonial que deu nome à capital cearense.",
    categoria: "Edificação Militar",
    grauProtecao: "Tombamento Federal (IPHAN)",
    coordinates: [
      [-3.7180, -38.5145],
      [-3.7180, -38.5130],
      [-3.7195, -38.5130],
      [-3.7195, -38.5145],
    ],
    center: [-3.7188, -38.5138],
    imagensHistoricas: [
      { ano: 2003, descricao: "Antes da urbanização costeira", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Área do entorno ainda não requalificada" },
      { ano: 2008, descricao: "Obras no calçadão", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Início das obras de requalificação da orla" },
      { ano: 2013, descricao: "Pós requalificação", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Calçadão e entorno requalificados" },
      { ano: 2018, descricao: "Consolidação turística", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Área consolidada como ponto turístico" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Sede militar com visitação controlada" },
    ],
  },
  {
    id: 3,
    nome: "Mercado Central de Fortaleza",
    endereco: "Av. Alberto Nepomuceno, 199 - Centro",
    bairro: "Centro",
    anoTombamento: 2004,
    anoConstrucao: 1975,
    descricao: "Mercado público com mais de 500 boxes. Centro de artesanato, cultura e gastronomia cearense.",
    significancia: "Principal ponto de comércio popular e turístico de Fortaleza, referência cultural do artesanato cearense.",
    categoria: "Edificação Comercial",
    grauProtecao: "Tombamento Municipal",
    coordinates: [
      [-3.7270, -38.5310],
      [-3.7270, -38.5298],
      [-3.7282, -38.5298],
      [-3.7282, -38.5310],
    ],
    center: [-3.7276, -38.5304],
    imagensHistoricas: [
      { ano: 2004, descricao: "Ano do tombamento", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Reconhecimento como patrimônio municipal" },
      { ano: 2009, descricao: "Reforma estrutural", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Reforma de cobertura e instalações elétricas" },
      { ano: 2014, descricao: "Expansão turística", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Aumento do fluxo turístico com Copa do Mundo" },
      { ano: 2019, descricao: "Modernização", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Instalação de WiFi e sinalização digital" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Em funcionamento pleno com mais de 500 boxes" },
    ],
  },
  {
    id: 4,
    nome: "Catedral Metropolitana de Fortaleza",
    endereco: "Av. Frei Mansueto, 180 - Centro",
    bairro: "Centro",
    anoTombamento: 2002,
    anoConstrucao: 1978,
    descricao: "Catedral de estilo gótico romano, terceira maior do mundo. Capacidade para 5.000 pessoas.",
    significancia: "Marco religioso e arquitetônico, inspirada na Catedral de Colônia. Uma das maiores igrejas do Brasil.",
    categoria: "Edificação Religiosa",
    grauProtecao: "Tombamento Estadual",
    coordinates: [
      [-3.7240, -38.5260],
      [-3.7240, -38.5248],
      [-3.7254, -38.5248],
      [-3.7254, -38.5260],
    ],
    center: [-3.7247, -38.5254],
    imagensHistoricas: [
      { ano: 2002, descricao: "Tombamento estadual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Reconhecimento como patrimônio cultural do Ceará" },
      { ano: 2007, descricao: "Restauração dos vitrais", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Restauração completa dos vitrais franceses" },
      { ano: 2012, descricao: "Iluminação especial", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Instalação de iluminação monumental" },
      { ano: 2017, descricao: "Jubileu da catedral", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Celebração dos 39 anos de inauguração" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Em atividade religiosa e turística" },
    ],
  },
  {
    id: 5,
    nome: "Passeio Público de Fortaleza",
    endereco: "Praça dos Mártires, s/n - Centro",
    bairro: "Centro",
    anoTombamento: 1965,
    anoConstrucao: 1880,
    descricao: "Primeiro parque público de Fortaleza, com três platôs e rica arborização. Tombado pelo patrimônio estadual.",
    significancia: "Mais antigo jardim público de Fortaleza, palco de importantes eventos históricos e sociais da cidade.",
    categoria: "Parque / Jardim Histórico",
    grauProtecao: "Tombamento Estadual",
    coordinates: [
      [-3.7212, -38.5210],
      [-3.7212, -38.5192],
      [-3.7228, -38.5192],
      [-3.7228, -38.5210],
    ],
    center: [-3.7220, -38.5201],
    imagensHistoricas: [
      { ano: 2005, descricao: "Antes da revitalização", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Período de abandono parcial do espaço" },
      { ano: 2010, descricao: "Projeto de revitalização", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Início dos trabalhos de recuperação" },
      { ano: 2015, descricao: "Revitalização concluída", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Espaço reaberto com nova infraestrutura" },
      { ano: 2020, descricao: "Período pandêmico", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Fechado temporariamente durante pandemia" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Aberto ao público com atividades culturais" },
    ],
  },
  {
    id: 6,
    nome: "Estação Ferroviária João Felipe",
    endereco: "Praça Castro Carreira, s/n - Centro",
    bairro: "Centro",
    anoTombamento: 1983,
    anoConstrucao: 1880,
    descricao: "Antiga estação central da Rede Viação Cearense. Arquitetura neoclássica com torre do relógio.",
    significancia: "Símbolo do desenvolvimento ferroviário do Ceará no século XIX. Exemplar da arquitetura ferroviária brasileira.",
    categoria: "Edificação Ferroviária",
    grauProtecao: "Tombamento Federal (IPHAN)",
    coordinates: [
      [-3.7198, -38.5340],
      [-3.7198, -38.5328],
      [-3.7210, -38.5328],
      [-3.7210, -38.5340],
    ],
    center: [-3.7204, -38.5334],
    imagensHistoricas: [
      { ano: 2003, descricao: "Estação em operação", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Ainda em operação ferroviária parcial" },
      { ano: 2008, descricao: "Desativação parcial", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Redução das linhas em operação" },
      { ano: 2013, descricao: "Projeto museu", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Proposta de conversão em museu ferroviário" },
      { ano: 2018, descricao: "Restauração", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Restauração da fachada e torre do relógio" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Uso cultural e operação do VLT" },
    ],
  },
  {
    id: 7,
    nome: "Farol do Mucuripe",
    endereco: "Av. Vicente de Castro, s/n - Mucuripe",
    bairro: "Mucuripe",
    anoTombamento: 2007,
    anoConstrucao: 1846,
    descricao: "Farol de ferro fundido de 1846, um dos mais antigos do Brasil. Desativado e preservado como patrimônio.",
    significancia: "Marco da navegação no litoral cearense. Farol de importância histórica para a atividade portuária de Fortaleza.",
    categoria: "Edificação Portuária",
    grauProtecao: "Tombamento Estadual",
    coordinates: [
      [-3.7100, -38.4830],
      [-3.7100, -38.4822],
      [-3.7108, -38.4822],
      [-3.7108, -38.4830],
    ],
    center: [-3.7104, -38.4826],
    imagensHistoricas: [
      { ano: 2004, descricao: "Antes da restauração", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Estrutura degradada pela maresia" },
      { ano: 2009, descricao: "Restauração completa", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Restauração estrutural e paisagística" },
      { ano: 2014, descricao: "Museu do farol", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Instalação de acervo museológico" },
      { ano: 2019, descricao: "Expansão do parque", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Ampliação da área de visitação" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Ponto turístico consolidado" },
    ],
  },
  {
    id: 8,
    nome: "Palacete Ceará",
    endereco: "Rua Major Facundo, 154 - Centro",
    bairro: "Centro",
    anoTombamento: 1995,
    anoConstrucao: 1916,
    descricao: "Palacete eclético com elementos Art Nouveau. Antigo escritório comercial hoje centro cultural.",
    significancia: "Exemplar da arquitetura comercial da Belle Époque em Fortaleza. Testemunho da prosperidade do início do séc. XX.",
    categoria: "Edificação Civil",
    grauProtecao: "Tombamento Municipal",
    coordinates: [
      [-3.7255, -38.5295],
      [-3.7255, -38.5289],
      [-3.7261, -38.5289],
      [-3.7261, -38.5295],
    ],
    center: [-3.7258, -38.5292],
    imagensHistoricas: [
      { ano: 2005, descricao: "Deterioração visível", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Fachada com sinais de deterioração" },
      { ano: 2010, descricao: "Projeto de restauro", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Início do projeto de restauro arquitetônico" },
      { ano: 2015, descricao: "Centro cultural", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Conversão em centro cultural concluída" },
      { ano: 2020, descricao: "Pandemia", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Fechado durante o período pandêmico" },
      { ano: 2024, descricao: "Situação atual", tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", observacao: "Em funcionamento como espaço cultural" },
    ],
  },
];
