export const genericTestimonialsRow1 = [
  {
    name: "Carlos Silva",
    company: "TechNova Solutions",
    text: "O nível de sofisticação que a Soul trouxe para a nossa marca é absurdo. Nossa taxa de conversão dobrou logo no primeiro mês após o lançamento. Absolutamente premium.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Mariana Costa",
    company: "Elevate Marketing",
    text: "Nós precisávamos de um design que impusesse autoridade imediata. O trabalho que entregaram superou todas as expectativas. Não é só bonito, é uma máquina de vendas.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Ricardo Almeida",
    company: "Fintech X",
    text: "A atenção aos mínimos detalhes impressiona. Animações, tempo de carregamento e fluidez perfeitos. A Soul não cria sites, eles criam experiências cinematográficas.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    name: "Fernanda Lima",
    company: "Arch & Design",
    text: "Como escritório de arquitetura, somos chatos com estética. A Soul conseguiu captar nossa essência e traduzir em um ambiente digital impecável. Estamos maravilhados.",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

export const genericTestimonialsRow2 = [
  {
    name: "João Pedro",
    company: "StartUp Go",
    text: "Eles entendem de conversão. O design é focado em guiar o olhar do cliente exatamente para onde importa. O investimento se pagou na primeira semana.",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Aline Barros",
    company: "Clínica Harmonize",
    text: "Nossos pacientes elogiam o site diariamente. Ele passa tanta confiança e luxo que conseguimos até aumentar nosso ticket médio sem reclamações. Trabalho genial.",
    avatar: "https://i.pravatar.cc/150?img=20"
  },
  {
    name: "Roberto Mendes",
    company: "Mendes & Advogados",
    text: "Procurávamos sobriedade, mas sem parecer velho. Eles entregaram um design moderno, escuro e extremamente elegante. Transmite exatamente a força do nosso escritório.",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    name: "Camila Santos",
    company: "Agência Flow",
    text: "Velocidade de carregamento aliada a um visual de cair o queixo. Os desenvolvedores e designers da Soul jogam em outra liga. Recomendamos de olhos fechados.",
    avatar: "https://i.pravatar.cc/150?img=47"
  }
];

// Testimonials for "distribuidoras" niche (Realistic, Revenue-focused)
export const distribuidorasRow1 = [
  {
    name: "Sérgio Moraes",
    company: "Moraes Atacadista",
    text: "A Soul revolucionou nossa operação. Nosso time comercial perdia horas tirando pedido no WhatsApp. Agora, 40% das vendas rodam no automático enquanto a gente dorme.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Felipe Costa",
    company: "Distribuidora Costa",
    text: "Fiquei com medo de implementar o sistema e não integrar com meu estoque, mas a plataforma da Soul leu tudo. Zeramos as rupturas de estoque nos pedidos B2B.",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    name: "Luciana Silva",
    company: "Bebidas Premium",
    text: "O dashboard da Soul me deu um raio-x que eu não tinha no meu ERP antigo. Eu vejo exatamente o que mais vende e consigo fazer campanhas focadas. Faturamento subiu 28% no semestre.",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    name: "Marcos Venâncio",
    company: "Venâncio Alimentos",
    text: "Antes da Soul, eu precisava contratar mais dois vendedores para dar conta de sexta-feira. Com o catálogo online, o próprio lojista faz o pedido. Economizei em folha e vendi mais.",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

export const distribuidorasRow2 = [
  {
    name: "Thiago Oliveira",
    company: "Oliveira & Cia Distribuição",
    text: "A clareza dos dados que a Soul entrega é um absurdo. Sei exatamente qual vendedor está batendo meta e qual cliente parou de comprar, tudo na tela do meu celular.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    name: "Renata Alves",
    company: "Atacadão das Embalagens",
    text: "O catálogo é extremamente rápido. Nossos clientes do varejo elogiavam a facilidade, porque eles compram direto pelo celular, sem precisar baixar app nenhum. Resultado imediato.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Rodrigo Almeida",
    company: "Almeida Ferragens",
    text: "Sempre achei que e-commerce B2B era luxo para distribuidora gigante. A Soul me mostrou que com o portal certo, qualquer distribuidora vira uma máquina de lucros 24h.",
    avatar: "https://i.pravatar.cc/150?img=60"
  },
  {
    name: "Bruno Garcia",
    company: "Garcia Distribuidora",
    text: "Reduzimos a margem de erro nos pedidos para literalmente zero. Cliente entra, vê a tabela de preços dele logada na Soul, compra, e a nota já sai no sistema. Coisa de louco.",
    avatar: "https://i.pravatar.cc/150?img=59"
  }
];

export const getTestimonials = (niche) => {
  if (niche === 'distribuidoras') {
    return {
      r1: [...distribuidorasRow1, ...distribuidorasRow1],
      r2: [...distribuidorasRow2, ...distribuidorasRow2]
    };
  }
  return {
    r1: [...genericTestimonialsRow1, ...genericTestimonialsRow1],
    r2: [...genericTestimonialsRow2, ...genericTestimonialsRow2]
  };
};
