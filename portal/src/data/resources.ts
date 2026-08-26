export interface Resource {
  id: number;
  title: string;
  description: string;
  features?: string[];
  salaSituacao: boolean;
  escutaCidada: boolean;
  servicoCidadao: boolean;
  geodesign: boolean;
  appUrl?: string;
  hasApp: boolean;
}

export type Publico = "consulta_cidada" | "gestor_interno" | "gestor_projeto";

export const publicoInfo: Record<
  Publico,
  { label: string; color: string; descricao: string }
> = {
  consulta_cidada: {
    label: "Consulta cidadã",
    color: "orange",
    descricao:
      "Acesso aberto ao cidadão, sem necessidade de login: consulta a mapas, dados e serviços.",
  },
  gestor_interno: {
    label: "Ação do gestor — uso interno",
    color: "blue",
    descricao:
      "Ferramentas administrativas de uso interno do setor público (técnicos e gestores municipais).",
  },
  gestor_projeto: {
    label: "Ação do gestor — acesso cidadão por projeto/login",
    color: "purple",
    descricao:
      "Recursos configurados pelo gestor em que o cidadão participa mediante projeto e login gerenciado, como o IDE Cidadão e o Geodesign.",
  },
};

const publicoById: Record<number, Publico> = {
  1: "consulta_cidada",
  2: "gestor_interno",
  3: "consulta_cidada",
  4: "gestor_interno",
  5: "gestor_projeto",
  6: "gestor_interno",
  7: "consulta_cidada",
  8: "gestor_interno",
  9: "consulta_cidada",
  10: "gestor_interno",
  11: "consulta_cidada",
  12: "gestor_interno",
  13: "gestor_interno",
  14: "consulta_cidada",
  15: "gestor_interno",
  16: "consulta_cidada",
  17: "consulta_cidada",
  18: "gestor_interno",
  19: "gestor_interno",
  20: "consulta_cidada",
  21: "gestor_interno",
  22: "consulta_cidada",
  23: "consulta_cidada",
  24: "consulta_cidada",
  25: "gestor_projeto",
  26: "consulta_cidada",
  27: "gestor_interno",
  28: "gestor_interno",
  29: "gestor_interno",
  30: "gestor_projeto",
  31: "consulta_cidada",
  32: "consulta_cidada",
  33: "consulta_cidada",
  34: "gestor_interno",
  35: "consulta_cidada",
};

export function getPublico(r: Resource): Publico {
  return publicoById[r.id] ?? "consulta_cidada";
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "Recursos Web para Análise Geográfica",
    description:
      "Consulta a banco de dados e a bases cartográficas de modo a favorecer a interpretação da realidade existente e dar suporte a tomadas de decisão. Recurso apoiado em geovisualização na ferramenta de webmap e em dashboards. Recurso amplamente empregado na plataforma DataGeo do estado de São Paulo, com destaque para a aplicação AVA – Ambiente Virtual de Análise e Monitoramento do ZEE (Zoneamento Ecológico Econômico).\n\nA navegação nos mapas apresenta recursos de geovisualização associadas a seleção e ordenação de camadas, recuperação de informações (tais características onde estão localizadas e em tais localidades quais são as características), medir distâncias e áreas, desenho de vetores sobre as bases, download da informação geográfica visualizada.",
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 2,
    title: "Catálogo de Informações",
    description:
      "As camadas de dados publicadas podem ser associadas ao catálogo de metadados para cumprirem orientações técnicas sobre a publicação de dados geoespaciais e para facilitação da gestão da informação disponível, tanto para o consumo de usuário em função de facilitação de buscas, como para o gestor administrativo para controle dos recursos existentes. Os usuários podem fazer buscas associadas a temas, a data de publicação, a áreas de interesse, entre outras. As informações sobre os dados informam a origem, o autor, os dados específicos sobre resolução e data de elaboração, e as condições de uso (quais são os direitos de acesso de uso da informação).",
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: false,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 3,
    title: "Plugins de Suporte à Visualização",
    description:
      "A ferramenta permite a adoção de plugins que podem facilitar as buscas e consultas do usuário, a exemplo poder selecionar um conjunto de camadas e salvar em um contexto, escolher um mapa de fundo (Open Street Map com desenho das vias, imagem de satélite, entre outros), realizar consultas de localizações (busca Google, busca rápida, busca por coordenadas geográficas, busca por coordenadas UTM), ferramentas de desenho para acrescentar algum croqui de interesse, ferramentas de medição, ferramenta de upload geoserver, ferramenta de share (compartilhar) para compor uma visualização de camadas e enviar a um outro usuário (por link ou QRCode) ou mesmo publicar em mídia social, imprimir mapa a partir de uma composição de camadas escolhidas (ou exportar pdf), realizar anotações, realizar diálogos de comentários sobre temas de interesse espacializando a informação, elaborar um perfil topográfico longitudinal e aproveitar a visualização 3D.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 4,
    title: "Criação de Contas Diferenciadas",
    description:
      "A juízo do coordenador do projeto podem ser planejados diferentes condições de acesso para a governança e uso dos dados, separando as diferentes formas de produção e consumo da informação geográfica (perfis administrador, gestor, publicador e editor na instituição, além de diferentes condições de consumo no público final).",
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: false,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 5,
    title: "Criação de Formulários",
    description:
      "Um gestor pode elaborar um formulário alfanumérico, especificando colunas para preenchimento de atributos, a partir da expectativa de um projeto. Uma vez criado o formulário, os usuários poderão preenchê-lo na plataforma a partir das necessidades do projeto. Podem existir campos texto curto, texto longo, numérico, data, seleção de lista, múltipla escolha, email, associação de arquivo. Ao criar o formulário é possível definir regras de dependência, fixação de valor padrão, regras de validação para guiarem os usuários.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 6,
    title: "Publicação de Gráficos",
    description:
      "É possível criar um widget para publicação da informação na forma de gráficos que favoreçam a compreensão sobre o tema de interesse. Os gráficos podem ser de barras ou histogramas, gráficos de pizza, ou mesmo textos extraídos da consulta.",
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: false,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 7,
    title: "Publicação de dados em Dashboard",
    description:
      "É uma ferramenta que favorece muito a transparência pública e a publicização de informações. Na interface de dashboards é possível publicar mapas, gráficos, textos e imagens. Os mapas podem ser compostos em alguma visualização específica para destacar alguma temática ou podem ser composta uma coleção de mapas cuja sobreposição ajude na compreensão de uma ocorrência ou fenômeno. Os gráficos podem ajudar na compreensão da distribuição e quantitativos de atributos.\n\nDestaca-se que os dashboards podem ser de visualização dinâmica dos recortes de interesse, apresentando a informação tratada e organizada de uma janela espacial escolhida. O espaço pode ser usado para comunicar uma condição existente ou para divulgar processos em desenvolvimento, tais como decisões em etapas de revisão do Plano Diretor, a distribuição de recursos em um Orçamento Participativo, entre outros.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 8,
    title: "Geovisualização Facilitada de Conjunto de Imagens",
    description:
      "No caso de composição de coleção de imagens Geotiff, a exemplo de imagens de satélite, imagens de voos, ou mesmo de composição de imagens tiffs resultantes de escanerização e georreferenciamento de mosaico de mapas históricos, há recursos para otimização da visualização.\n\nTrata-se do processamento digital de imagens em pirâmide (ou overview), que é a técnica de decomposição de uma imagem raster em múltiplos níveis hierárquicos de resolução espacial. Essa abordagem visa otimizar a renderização e a visualização progressiva dos dados geoespaciais, permitindo que a imagem seja exibida de forma eficiente conforme o nível de zoom requisitado pelo usuário final ou pela aplicação. A geração técnica das imagens em pirâmide é realizada por meio da biblioteca GDAL (Geospatial Data Abstraction Library).",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 9,
    title: "Análise de Vizinhança",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: A partir de uma referência geográfica, endereço, polígono ou código de IPTU, uma ferramenta de análise espacial quantifica as distâncias da referência em relação a múltiplas camadas de dados de infraestrutura, escolas, hospitais, parques, a partir de um mapa interativo, customizável na WEB.\n\nAplicação web contendo uma série de camadas (layers) em um mapa interativo, onde o cidadão poderá consultar a partir de um determinado endereço ou número de IPTU, se este imóvel está inserido ou não em áreas de restrição previstas na legislação vigente. A partir da identificação do imóvel o cidadão poderá selecionar o número de IPTU que deseja gerar o relatório contendo informações específicas da análise de vizinhança.",
    features: [
      "Pesquisar por endereço ou número de IPTU",
      "Habilitar e desabilitar camadas para auxílio a análise do cidadão",
      "Gerar relatório de Análise de Vizinhança, contendo informações específicas do imóvel em relação as áreas de restrição conforme legislação vigente",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "https://dist-ywewxmym.devinapps.com",
    hasApp: true,
  },
  {
    id: 10,
    title: "Usucapião Digital",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta que permite de forma interativa, a partir de múltiplas camadas de informação geográfica, imagens, dados ambientais e de infraestrutura e suas séries históricas, permitir uma interpretação e análise da evolução do entorno de uma área de usucapião.\n\nAplicação para apoio aos técnicos municipais para análise de processos de Usucapião protocolados no Licenciamento Digital – LD, auxiliando na localização do objeto de estudo a partir da pesquisa por endereço.",
    features: [
      "Consulta a base de endereços e IPTU para identificação do lote ou área requerida",
      "Consultar camadas de dados de referência do acervo de anos anteriores",
      "Gerar croqui de apoio ao processo",
    ],
    salaSituacao: false,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 11,
    title: "Gera Confinantes",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: De forma interativa, a ferramenta gera de forma automatizada a partir do polígono de um lote, o relatório de confinante, levando em consideração valores de azimute e rumo das arestas do lote.\n\nA partir da pesquisa por endereço ou número de inscrição (IPTU) o cidadão poderá selecionar em uma lista de resultados o logradouro desejado ou inscrição, identificando em mapa interativo o lote que deseja gerar o relatório de confinantes. A certidão de confinantes consiste em identificar os endereços dos logradouros que fazem divisa, ou confinam o imóvel requerente e lista nos sentidos norte, sul, leste e oeste as informações identificadas no sistema.",
    features: [
      "Consulta a base de endereços e IPTU para identificação do lote",
      "Gerar o relatório de confinantes a partir de regras de azimute, dos rumos e angulação das arestas do lote",
    ],
    salaSituacao: false,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "https://dist-lhpkdrcb.devinapps.com",
    hasApp: true,
  },
  {
    id: 12,
    title: "Relatório Dinâmico Licenciamento Digital",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta que a partir do relacionamento espacial de dados georreferenciados e informações cadastrais de licenciamento ambiental, permita de forma integrada, consulta e construção de relatórios dinâmicos georreferenciados de dados de licenciamento.\n\nA partir da filtragem do LD (Licenciamento Digital), o usuário é redirecionado para o portal e assim poderá acessar a aplicação do relatório dinâmico, onde terá acesso ao resultado espacial da filtragem realizada no mesmo.",
    features: [
      "Visualizar os lotes aos quais a filtragem foi feita",
      "Visualizar as camadas inseridas na aplicação por padrão",
      "Consultar IPTU ou endereço",
    ],
    salaSituacao: false,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "https://dist-dabcnqfc.devinapps.com",
    hasApp: true,
  },
  {
    id: 13,
    title: "Painel Negócios Urbanos 2.0",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta interativa de Dashboard que permite a consulta interativa de dados relacionados a um determinado imóvel urbano ou logradouro. Essa ferramenta de Dashboard vai integrar mapas e tabelas interativas de forma a permitir a consulta e análise de dados relacionados ao imóvel urbano ou logradouro.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: false,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 14,
    title: "Consulta de Adequabilidade Invertida",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Permite de forma interativa consultar permissão de uso a partir do CNAE em um mapa dinâmico. Acessível em múltiplas escalas até o detalhamento de lote, interagindo com infraestruturas, como quadras e vias.\n\nA partir da pesquisa por código CNAE e ou atividade o cidadão poderá selecionar em uma lista de resultados a Atividade que queria prospectar no município e no mapa interativo será representado as áreas que a atividade selecionada é permitida, auxiliando o cidadão na identificação de locais permitidos a implementação de atividades em conformidade com a legislação vigente.",
    features: [
      "Consulta por atividade ou código CNAE",
      "Consulta por endereço ou IPTU",
      "Identificar áreas permitidas para a atividade selecionada no visualizador de mapas",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "https://dist-opungpbj.devinapps.com",
    hasApp: true,
  },
  {
    id: 15,
    title: "Pesquisa de Processos",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta que permite a pesquisa de processos levando em conta um código ou um referencial geográfico. Permitindo o acesso a informações relacionadas aos status de processo e a dados relacionados ao licenciamento digital.\n\nAlém de visualizar a delimitação e abrangência de processos já tramitados e ou em tramitação, o técnico pode fazer a consulta dos atributos associados aos processos identificados pelo técnico, e caso o processo seja proveniente do sistema do Licenciamento Digital - LD, é possível abrir os documentos anexados ao processo diretamente na tela da aplicação.",
    salaSituacao: false,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "https://dist-afwexlxr.devinapps.com",
    hasApp: true,
  },
  {
    id: 16,
    title: "Futura 3D",
    description:
      "A partir da visualização tridimensional de um volume gerado por meio de parâmetros da legislação urbanística vigente, o usuário poderá analisar as possibilidades de implantação e volumetria da edificação possível em um lote.",
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 17,
    title: "Programa de Certificação Ambiental",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta de consulta que permita a identificação de áreas verdes passíveis de adoção, contendo informações geográficas e de atributo, como área e características cadastrais.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 18,
    title: "Plantio Verde Compensatórias Ambientais",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Permite a gestão de áreas de plantio compensatório, integrando informações cadastrais de forma a permitir a edição e atualização. A partir de consultas geográficas e cadastrais.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 19,
    title: "Patrimônio Verde Cobertura Vegetal",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Permitir a consulta de bens patrimoniais, áreas verdes, parques, jardins, a partir de consulta geográfica ou por atributos. Permitindo acessar dados relacionados a informações relacionadas a instrumentos de gestão.",
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: false,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 20,
    title: "Onde Descarto",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta de consulta em interface de mapa que, baseado na localização do cidadão e do tipo de resíduo a ser descartado, retorna uma lista de locais mais próximos, autorizados pela prefeitura, aptos a recolher o material. A ferramenta obtém a localização do GPS do dispositivo do cidadão e consulta a base da IDE para indicar os locais dentro de um raio de busca, exibindo o resultado na tela.",
    salaSituacao: false,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 21,
    title: "Geovisualização Hierárquica",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta dinâmica que permita a interação de múltiplas camadas de informação em diferentes escalas, envolvendo as temáticas como zoneamento, arruamento e imagens de alta resolução. De forma a automatizar a elaboração de croquis integrados com itens de cadastro, permitindo a consulta e a seleção geográfica ou por atributos do cadastro, exemplo IPTU.\n\nTrata-se de um WebGIS hierárquico: oferece uma compreensão abrangente do espaço municipal, começando com o zoneamento da cidade e suas diretrizes. Ela integra ortofotos sobrepostas para apresentar a situação específica de cada lote em relação às permissões e restrições impostas. Desde o macrozoneamento, permite uma visualização progressiva até alcançar o nível do lote, possibilitando ao usuário compreender claramente as atividades permitidas, as possibilidades de prospecção e as ações executáveis em cada área.",
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "https://dist-clnvqjgc.devinapps.com",
    hasApp: true,
  },
  {
    id: 22,
    title: "Biblilog",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Sistema de cadastramento de dados de logradouro via QR CODE, integrado a um banco de dados e acessível via WEB. Acessando mapa de localização com informações cadastrais disponíveis.",
    salaSituacao: false,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 23,
    title: "Pede Placas",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta que permite a solicitação de serviço de implantação de placa de logradouro, de forma interativa o demandante registre a solicitação e acompanha o andamento do processo pela empresa responsável. A localização do pedido é informada por clique diretamente no mapa ou pela busca de endereço. Permitindo consulta geográfica e acompanhamento do status.",
    salaSituacao: false,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: false,
    hasApp: false,
  },
  {
    id: 24,
    title: "Radar Municipal",
    description:
      "O Radar Municipal é uma plataforma online que oferece uma análise detalhada dos dados relacionados a alvarás de funcionamento e construção na cidade. Utilizando informações georreferenciadas, a plataforma apresenta visualizações interativas para facilitar a compreensão e a tomada de decisões relacionadas ao desenvolvimento urbano e à regulamentação comercial na região.\n\nO objetivo principal é proporcionar uma visão abrangente e acessível dos dados de alvarás, permitindo que os usuários, que podem incluir gestores públicos, empreendedores e pesquisadores, compreendam e analisem padrões e tendências relacionados às atividades comerciais e construções na cidade. A plataforma visa melhorar a transparência e promover um desenvolvimento urbano sustentável.",
    features: [
      "Visualizar a emissão por alvará de maneira geoespacialização",
      "Visualizar gráficos estatísticos referentes aos alvarás emitidos",
      "Realizar filtragem de dados através de vários tipos de filtros",
    ],
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 25,
    title: "Geodesign",
    description:
      "O Geodesign é um método para planejamento compartilhado, no qual são tomadas decisões de modo a envolver diferentes grupos de interesse, sejam setores dentro de uma mesma empresa, a diferentes grupos sociais na discussão, por exemplo, de um Plano Diretor municipal ou de planos de mitigação ao risco climático de uma região.\n\nA plataforma de Geodesign trabalha apoiada na estrutura de IDE – Infraestrutura de Dados Espaciais e de um WebGis com coleção de mapas cadastrais e temáticos de interesse das discussões. Usa tecnologia baseada em Open Geospatial Consortium (OGC) e foram planejados recursos de Web Processing Service (WPS), Web Map Service (WMS) e Web Feature Service (WFS). Tem como princípios adaptabilidade, escalabilidade e flexibilidade.",
    features: [
      "WebGis – acesso a conjunto de camadas de interesse",
      "Mapeamento Voluntário segundo princípio de VGI",
      "Criação e cocriação de ideias na forma de registro geográfico",
      "Recurso de registro de comentários e votação nas ideias",
      "Recurso de mensuração de performances",
      "Publicação de dashboards para publicização de decisões",
    ],
    salaSituacao: true,
    escutaCidada: true,
    servicoCidadao: false,
    geodesign: true,
    hasApp: false,
  },
  {
    id: 26,
    title: "Urbanismo Histórico - Visualização Temporal",
    description:
      "App de consulta/visualização pública das diversas fases temporais de bens históricos. É a face de consulta do par de aplicações de Urbanismo Histórico: o cadastro e a manutenção do acervo são feitos na aplicação administrativa (Urbanismo Histórico - Cadastro).",
    features: [
      "Visualizar imagens de satélite de diferentes anos para cada bem patrimonial",
      "Selecionar bens tombados no mapa interativo",
      "Navegar pela linha do tempo com controle deslizante de anos",
      "Consultar dados cadastrais e significância histórica de cada bem",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "https://dist-uiufzglb.devinapps.com",
    hasApp: true,
  },
  {
    id: 27,
    title: "Urbanismo Histórico - Cadastro",
    description:
      "App administrativo/autoral para cadastro e gestão de bens patrimoniais históricos, de uso do gestor/técnico municipal. A consulta pública do acervo é feita na aplicação Urbanismo Histórico - Visualização Temporal.",
    features: [
      "Cadastrar novos bens patrimoniais com formulário completo",
      "Gerenciar bens existentes (editar, visualizar, exportar)",
      "Localizar bens no mapa interativo com polígono vetorial",
      "Gerar ficha cadastral em PDF de cada bem patrimonial",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "https://dist-esjzbwcs.devinapps.com",
    hasApp: true,
  },
  {
    id: 28,
    title: "Gerenciador de Contextos",
    description:
      "Ferramenta que permite ao usuário selecionar um conjunto de camadas de dados geoespaciais e salvá-las em um contexto nomeado, facilitando a organização e o acesso rápido a visualizações personalizadas. O contexto pode ser compartilhado com outros usuários por link ou QR Code, permitindo a composição colaborativa de mapas temáticos. A ferramenta integra-se à IDE municipal, possibilitando a gestão eficiente de contextos cartográficos para diferentes finalidades de planejamento e análise territorial.",
    features: [
      "Selecionar e organizar conjuntos de camadas em contextos nomeados",
      "Salvar e recuperar contextos personalizados de visualização",
      "Compartilhar contextos com outros usuários por link ou QR Code",
      "Integração com a IDE municipal e suas camadas de dados",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "http://54.173.85.244/gerenciador-contexto/",
    hasApp: true,
  },
  {
    id: 29,
    title: "IDE Cidadão - Back-office",
    description:
      "Interface administrativa da plataforma IDE Cidadão, destinada aos gestores e técnicos municipais. Permite o gerenciamento de conteúdos, camadas de dados, formulários e configurações da plataforma voltada ao cidadão. A partir do back-office, o administrador pode configurar os recursos disponíveis, gerenciar perfis de acesso, monitorar o uso da plataforma e atualizar as informações geoespaciais disponibilizadas ao público.",
    features: [
      "Gerenciar conteúdos e configurações da plataforma IDE Cidadão",
      "Administrar perfis de acesso e permissões de usuários",
      "Configurar camadas de dados e formulários disponíveis",
      "Monitorar o uso e estatísticas da plataforma",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "http://54.173.85.244/ide-cidadao-backoffice/",
    hasApp: true,
  },
  {
    id: 30,
    title: "IDE Cidadão - Cliente",
    description:
      "Portal voltado ao cidadão que disponibiliza recursos de consulta geográfica e acesso a informações municipais. O cidadão pode consultar dados geoespaciais, acessar mapas interativos, realizar buscas por endereço ou IPTU, e acessar serviços digitais da prefeitura. A plataforma visa colocar os recursos de tecnologia de geoinformação à disposição do cidadão, facilitando o acesso a informações sobre o território municipal.",
    features: [
      "Consultar dados geoespaciais e mapas interativos do município",
      "Buscar por endereço, IPTU ou referência geográfica",
      "Acessar serviços digitais da prefeitura",
      "Visualizar camadas de interesse sobre o território municipal",
    ],
    salaSituacao: false,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "http://54.173.85.244/ide-cidadao-client/",
    hasApp: true,
  },
  {
    id: 31,
    title: "Fortaleza Verde",
    description:
      "Plataforma integrada de gestão ambiental do município de Fortaleza, reunindo recursos relacionados ao Programa de Certificação Ambiental, Plantio Verde de Compensatórias Ambientais e Patrimônio Verde de Cobertura Vegetal.\n\nA plataforma reúne três frentes distintas: (1) consulta de dados existentes — áreas verdes, parques, jardins e patrimônio verde; (2) solicitação de novos dados/serviços pelo cidadão, como pedidos de poda ou supressão de árvores; e (3) acompanhamento dos processos abertos. Integra informações geográficas e cadastrais para suporte à gestão ambiental municipal.",
    features: [
      "Consultar áreas verdes, parques e jardins do município",
      "Identificar áreas verdes passíveis de adoção (Certificação Ambiental)",
      "Gerenciar áreas de plantio compensatório ambiental",
      "Consultar patrimônio verde e cobertura vegetal por referência geográfica",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "http://54.173.85.244/fortaleza-verde/",
    hasApp: true,
  },
  {
    id: 32,
    title: "Futura 3D",
    description:
      "A partir da visualização tridimensional de um volume gerado por meio de parâmetros da legislação urbanística vigente, o usuário poderá analisar as possibilidades de implantação e volumetria da edificação possível em um lote. A ferramenta permite simular o potencial construtivo de cada lote com base nos coeficientes de aproveitamento, taxa de ocupação, gabarito e recuos definidos no zoneamento, apresentando o resultado em modelo 3D interativo.",
    features: [
      "Visualização tridimensional do potencial construtivo de lotes",
      "Simulação de volumetria com base na legislação urbanística vigente",
      "Análise de parâmetros como coeficiente de aproveitamento, gabarito e recuos",
      "Interação com o modelo 3D para avaliação de implantação",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "http://54.173.85.244/futura-3d/",
    hasApp: true,
  },
  {
    id: 33,
    title: "Geoportal - IDE SEUMA",
    description:
      "Portal principal da Infraestrutura de Dados Espaciais da Secretaria Municipal de Urbanismo e Meio Ambiente de Fortaleza. Oferece consulta a banco de dados e bases cartográficas para suporte a tomadas de decisão, com recursos de geovisualização em webmap e dashboards. A navegação nos mapas apresenta recursos de seleção e ordenação de camadas, recuperação de informações, medição de distâncias e áreas, desenho de vetores sobre as bases e download da informação geográfica visualizada.",
    features: [
      "Consultar bases cartográficas e dados geoespaciais do município",
      "Selecionar, ordenar e sobrepor camadas de informação",
      "Medir distâncias e áreas no mapa interativo",
      "Desenhar vetores e exportar informações geográficas",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: true,
    appUrl: "http://54.173.85.244/geoportal-front/",
    hasApp: true,
  },
  {
    id: 34,
    title: "Usucapião Digital",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta que permite de forma interativa, a partir de múltiplas camadas de informação geográfica, imagens, dados ambientais e de infraestrutura e suas séries históricas, permitir uma interpretação e análise da evolução do entorno de uma área de usucapião.\n\nAplicação para apoio aos técnicos municipais para análise de processos de Usucapião protocolados no Licenciamento Digital – LD, auxiliando na localização do objeto de estudo a partir da pesquisa por endereço o técnico poderá selecionar em uma lista de resultados o logradouro desejado e obter maiores informações sobre os registros existentes nas bases de dados oficiais e histórica da prefeitura incidente na área requerida no processo.\n\nEsta é uma aplicação para uso exclusivo do técnico.",
    features: [
      "Consulta a base de endereços e IPTU para identificação do lote ou área requerida",
      "Consultar camadas de dados de referência do acervo de anos anteriores",
      "Gerar croqui de apoio ao processo",
    ],
    salaSituacao: true,
    escutaCidada: false,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "http://54.173.85.244/usucapiao/",
    hasApp: true,
  },
  {
    id: 35,
    title: "Pede Placas",
    description:
      "Recurso que pode estar disponível em plataforma de gestão da Prefeitura Municipal: Ferramenta que permite a solicitação de serviço de implantação de placa de logradouro, de forma interativa o demandante registre a solicitação e acompanha o andamento do processo pela empresa responsável. A localização do pedido é informada por clique diretamente no mapa ou pela busca de endereço. Permitindo consulta geográfica e acompanhamento do status.",
    features: [
      "Solicitar implantação de placa de logradouro de forma interativa",
      "Registrar solicitação com localização geográfica",
      "Acompanhar o andamento do processo pela empresa responsável",
      "Consultar status das solicitações por mapa ou atributos",
    ],
    salaSituacao: false,
    escutaCidada: true,
    servicoCidadao: true,
    geodesign: false,
    appUrl: "http://54.173.85.244/pede-placa/",
    hasApp: true,
  },
];
