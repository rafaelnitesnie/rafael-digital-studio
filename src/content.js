// ============================================================
// Conteúdo do site — edite os textos aqui.
// Nenhum componente tem texto fixo importante: tudo vem deste arquivo.
// ============================================================

export const brand = {
  name: "Rafael Digital Studio",
  tagline: "Sites, automações e interfaces para negócios",
  // Troque pelo link real de contato quando tiver (WhatsApp, e-mail, 99freelas etc.)
  contactHref: "#contato",
};

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como trabalho", href: "#processo" },
  { label: "Projetos", href: "#projetos" },
  { label: "Faixas", href: "#faixas" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  badge: "Estúdio independente de desenvolvimento web",
  title: "Sites, automações e sistemas simples para tirar ideias do papel",
  // Parte do título renderizada com gradiente (deve ser o final de `title`).
  titleHighlight: "tirar ideias do papel",
  subtitle:
    "Criação de landing pages, sites institucionais, dashboards, automações e MVPs com escopo claro, entrega por etapas e foco em uma primeira versão funcional.",
  primaryCta: { label: "Ver serviços", href: "#servicos" },
  secondaryCta: { label: "Falar sobre um projeto", href: "#contato" },
  highlights: [
    "Escopo definido antes de começar",
    "Entrega por etapas",
    "Primeira versão funcional",
  ],
};

export const services = {
  eyebrow: "Serviços",
  title: "O que eu construo",
  subtitle:
    "Do site que apresenta o negócio à automação que elimina trabalho manual.",
  items: [
    {
      icon: "layout",
      title: "Landing pages e páginas de venda",
      description:
        "Páginas focadas em apresentar uma oferta com clareza e levar o visitante à ação: contato, compra ou cadastro.",
    },
    {
      icon: "globe",
      title: "Sites institucionais",
      description:
        "Presença digital profissional para o seu negócio: quem você é, o que faz e como entrar em contato.",
    },
    {
      icon: "workflow",
      title: "Automações com planilhas, APIs e no-code",
      description:
        "Rotinas manuais transformadas em fluxos automáticos usando planilhas, integrações e ferramentas no-code.",
    },
    {
      icon: "chart",
      title: "Dashboards e sistemas internos",
      description:
        "Painéis e telas internas para organizar dados, acompanhar operações e sair do controle por planilha.",
    },
    {
      icon: "rocket",
      title: "MVPs e primeiras versões funcionais",
      description:
        "A menor versão útil da sua ideia, pronta para ser testada com usuários reais antes de investir mais.",
    },
    {
      icon: "spark",
      title: "Integrações com IA e assistentes operacionais",
      description:
        "Uso de IA para atendimento, triagem, resumo de informações e apoio a processos internos do dia a dia.",
    },
  ],
};

export const process = {
  eyebrow: "Processo",
  title: "Como trabalho",
  subtitle:
    "Antes de tentar construir tudo, eu ajudo a definir uma primeira entrega funcional e validável.",
  steps: [
    {
      number: "01",
      title: "Entendimento do projeto",
      description:
        "Conversa inicial para entender o problema, o contexto do negócio e o que precisa existir primeiro.",
    },
    {
      number: "02",
      title: "Recorte do escopo",
      description:
        "Definição clara do que entra na primeira entrega, o que fica para depois e quais são os critérios de pronto.",
    },
    {
      number: "03",
      title: "Construção da primeira versão",
      description:
        "Desenvolvimento da versão funcional combinada, com comunicação durante o processo e sem surpresas no final.",
    },
    {
      number: "04",
      title: "Revisão e ajustes finais",
      description:
        "Rodada de revisão sobre o que foi entregue, ajustes dentro do escopo e orientação para os próximos passos.",
    },
  ],
};

export const demoProjects = {
  eyebrow: "Projetos",
  title: "Exemplos de como estruturo cada projeto",
  subtitle:
    "Exemplos de escopo para mostrar como estruturo cada tipo de projeto. São demonstrações de formato de trabalho, não casos de clientes reais.",
  disclaimer:
    "Todos os projetos abaixo são exemplos ilustrativos de escopo e entrega — não representam clientes reais.",
  items: [
    {
      tag: "Landing page",
      title: "Landing page para produto digital",
      problem:
        "Um produto digital precisa de uma página que explique a oferta e converta visitantes em interessados.",
      solution:
        "Página única com proposta de valor, benefícios, prova de conceito, FAQ e chamada para ação clara.",
      stack: ["React", "Tailwind CSS", "Vercel"],
      delivery: "Entrega única, escopo fechado",
    },
    {
      tag: "Dashboard",
      title: "Dashboard interno de controle operacional",
      problem:
        "A operação é controlada em várias planilhas e ninguém tem visão consolidada do que está acontecendo.",
      solution:
        "Painel com indicadores principais, filtros por período e visão por área, alimentado pelos dados existentes.",
      stack: ["React", "Planilhas/API", "Gráficos"],
      delivery: "Entrega por etapas",
    },
    {
      tag: "Sistema simples",
      title: "Sistema de cadastro e acompanhamento",
      problem:
        "Cadastros feitos em papel ou planilha se perdem, duplicam e ninguém sabe o status de cada item.",
      solution:
        "Tela de cadastro, listagem com busca e status de acompanhamento — o essencial para organizar o fluxo.",
      stack: ["React", "CRUD simples", "Banco leve"],
      delivery: "Primeira versão + iterações",
    },
    {
      tag: "Automação",
      title: "Automação de atendimento e captura de leads",
      problem:
        "Mensagens de interessados chegam por vários canais e parte delas fica sem resposta ou sem registro.",
      solution:
        "Fluxo que captura o contato, registra em planilha ou CRM e envia resposta inicial automática.",
      stack: ["No-code", "APIs", "Planilhas"],
      delivery: "Entrega única, escopo fechado",
    },
    {
      tag: "Integração",
      title: "Integração com planilhas e API",
      problem:
        "Dados precisam ser copiados manualmente entre sistemas, gerando retrabalho e erros de digitação.",
      solution:
        "Integração que sincroniza os dados automaticamente entre a planilha e o sistema, com registro de erros.",
      stack: ["API REST", "Google Sheets", "Automação"],
      delivery: "Entrega por etapas",
    },
    {
      tag: "MVP",
      title: "MVP web com painel administrativo",
      problem:
        "Uma ideia de produto precisa ser testada com usuários reais antes de justificar um investimento maior.",
      solution:
        "Versão mínima com o fluxo principal do usuário e um painel administrativo simples para operar o produto.",
      stack: ["React", "Backend leve", "Deploy simples"],
      delivery: "Primeira etapa + roadmap",
    },
  ],
};

export const projectTypes = {
  eyebrow: "Formatos",
  title: "Tipos de projeto que aceito",
  subtitle:
    "Cada projeto tem um formato de trabalho adequado. Isso evita frustração dos dois lados.",
  groups: [
    {
      icon: "bolt",
      title: "Projetos rápidos",
      description: "Escopo fechado, entrega única.",
      accent: "emerald",
      items: [
        "Landing page",
        "Site simples",
        "Ajustes de frontend",
        "Formulário",
        "Automação simples",
      ],
    },
    {
      icon: "layers",
      title: "Projetos por etapa",
      description: "Divididos em entregas menores e validáveis.",
      accent: "sky",
      items: [
        "Dashboard",
        "Sistema interno",
        "Integração com API",
        "MVP",
        "Automação mais complexa",
      ],
    },
    {
      icon: "scissors",
      title: "Projetos que prefiro recortar antes",
      description:
        "Grandes demais para começar de uma vez — primeiro definimos a primeira entrega.",
      accent: "amber",
      items: [
        "Plataformas maiores",
        "SaaS",
        "Sistemas com muitos módulos",
        "Projetos ainda confusos",
      ],
    },
  ],
};

export const pricing = {
  eyebrow: "Investimento",
  title: "Faixas de projeto",
  subtitle:
    "Faixas típicas para escopo inicial. Cada projeto recebe uma proposta específica.",
  disclaimer:
    "Os valores dependem do escopo, conteúdo disponível, integrações e prazo.",
  items: [
    { label: "Landing page", range: "R$ 500 a R$ 1.200" },
    { label: "Site institucional simples", range: "R$ 700 a R$ 1.500" },
    { label: "Automação simples", range: "R$ 500 a R$ 1.500" },
    { label: "Integração / API", range: "R$ 900 a R$ 2.800" },
    { label: "Dashboard ou CRUD simples", range: "R$ 1.200 a R$ 3.500" },
    { label: "MVP ou primeira etapa", range: "a partir de R$ 1.500" },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Perguntas frequentes",
  items: [
    {
      question: "Você faz projetos grandes?",
      answer:
        "Sim, desde que a gente recorte o escopo antes. Projetos grandes funcionam melhor divididos em etapas: primeiro uma versão funcional do núcleo, depois as expansões. Isso reduz risco para você e mantém o projeto sob controle.",
    },
    {
      question: "Você trabalha com escopo fechado?",
      answer:
        "Sim. Para projetos rápidos, o escopo é fechado antes de começar: o que entra, o que não entra e quando está pronto. Para projetos maiores, cada etapa tem seu próprio escopo fechado.",
    },
    {
      question: "Preciso ter tudo definido antes?",
      answer:
        "Não. Parte do meu trabalho é justamente ajudar a transformar uma ideia ou processo confuso em um escopo claro. A primeira conversa serve para isso — sem compromisso.",
    },
    {
      question: "Você entrega o código?",
      answer:
        "Sim. O código-fonte é seu ao final do projeto, com instruções de como rodar e publicar. Sem dependência forçada de mim para o futuro.",
    },
    {
      question: "Dá para começar por uma primeira versão?",
      answer:
        "Esse é o formato que eu mais recomendo. Uma primeira versão funcional permite validar a ideia, ajustar o rumo com base em uso real e investir mais apenas no que fizer sentido.",
    },
    {
      question: "Você faz automações com IA?",
      answer:
        "Sim. Integro IA em fluxos de atendimento, triagem de mensagens, resumo de informações e apoio a processos internos, sempre com escopo definido e foco em resolver um problema específico.",
    },
  ],
};

export const cta = {
  title: "Tem uma ideia, processo manual ou projeto que precisa sair do papel?",
  subtitle:
    "Me conte o contexto e eu te ajudo a definir por onde começar — sem compromisso.",
  button: { label: "Me chamar para conversar", href: "#contato" },
};

export const footer = {
  note: "Sites, automações e interfaces para negócios que querem sair da planilha, organizar processos e ganhar presença digital.",
  // Adicione links reais quando tiver (GitHub, LinkedIn, 99freelas, WhatsApp)
  links: [],
  copyright: `© ${new Date().getFullYear()} Rafael Digital Studio`,
};
