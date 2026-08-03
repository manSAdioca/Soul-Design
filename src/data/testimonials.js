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

// Testimonials for "distribuidoras" niche (Drinks / Bebidas focused)
export const distribuidorasRow1 = [
  {
    name: "Sérgio Moraes",
    company: "Disk Bebidas Moraes",
    text: "A Soul revolucionou nossa operação. Nosso time perdia horas tirando pedido no WhatsApp na sexta-feira. Agora, 40% das vendas de fardos e barris rodam no automático enquanto a gente atende o balcão.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Felipe Costa",
    company: "Adega e Distribuidora Costa",
    text: "Fiquei com medo de implementar o sistema e dar pau no fim de semana, que é quando a adega bomba. A plataforma da Soul segurou a onda e zeramos os erros de entrega de gelo e destilados.",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    name: "Luciana Silva",
    company: "Império das Bebidas",
    text: "O dashboard da Soul me deu um raio-x que eu não tinha. Vejo exatamente qual cerveja está saindo mais rápido na sexta-feira e consigo fazer promoções relâmpago. Faturamento subiu 28%.",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    name: "Marcos Venâncio",
    company: "Venâncio Disk Bebidas",
    text: "Antes da Soul, o WhatsApp congestionava no sábado à noite e a gente perdia pedido. Com o catálogo online, o próprio cliente do bar acessa e pede. Economizei em folha e vendi mais.",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

export const distribuidorasRow2 = [
  {
    name: "Thiago Oliveira",
    company: "Oliveira Distribuidora",
    text: "A clareza dos dados que a Soul entrega é um absurdo. Sei exatamente qual festa comprou mais barris de chopp na semana passada e se o estoque de gelo vai aguentar o feriado, tudo pelo celular.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    name: "Renata Alves",
    company: "Atacadão do Gelo",
    text: "O catálogo é extremamente rápido. Nossos clientes e donos de bar elogiam muito a facilidade, porque eles compram a reposição direto pelo celular, sem precisar baixar app nenhum.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Rodrigo Almeida",
    company: "Almeida Bebidas B2B",
    text: "Sempre achei que catálogo online era luxo das gigantes como Ambev. A Soul me mostrou que com o portal certo, qualquer distribuidora de bebidas vira uma máquina de lucros 24h.",
    avatar: "https://i.pravatar.cc/150?img=60"
  },
  {
    name: "Bruno Garcia",
    company: "Garcia Adega Atacadista",
    text: "Reduzimos a margem de erro nos pedidos para zero. Dono de bar entra, vê a tabela de preços dele, pede os fardos de cerveja e a nota já sai no sistema. Coisa de louco.",
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
