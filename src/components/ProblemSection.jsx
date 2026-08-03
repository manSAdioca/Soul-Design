import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MagneticCard = ({ title, description, icon }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Rotação 3D sutil (-10 a +10 graus)
    const rotateX = -((y / height) - 0.5) * 20; 
    const rotateY = ((x / width) - 0.5) * 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: 'power3.out',
      transformPerspective: 1000,
      transformOrigin: 'center center'
    });

    // Mover o Glare Interno suavemente
    gsap.to(glowRef.current, {
      x: x - 400, // Centralizar o gradiente (assumindo w-800)
      y: y - 400,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    // Retornar ao estado original com efeito elástico
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.4)',
    });
    
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  };

  return (
    <div 
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrapper relative [perspective:1000px] z-20 flex-none w-[85vw] md:w-auto snap-center md:snap-align-none"
    >
      <div 
        ref={cardRef}
        className="problem-card group relative flex flex-col p-6 lg:p-8 rounded-2xl bg-[#080808] border border-white/[0.05] shadow-2xl z-10 w-full h-full transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Magnético (Lanterna do Mouse) */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0">
          <div 
            ref={glowRef}
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.1)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-screen"
            style={{ transform: 'translate(-400px, -400px)' }}
          />
        </div>

        {/* Ícone com Efeito de Parallax */}
        <div 
          className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-[#111] border border-white/5 mb-6 shadow-inner group-hover:border-[#FF6A00]/40 transition-colors duration-500"
          style={{ transform: 'translateZ(30px)' }}
        >
          {icon}
        </div>

        {/* Textos com Parallax Sutil */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#FF6A00] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const BackgroundLines = () => {
  const linesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const beams = gsap.utils.toArray('.beam');
      beams.forEach((beam) => {
        gsap.fromTo(beam, 
          { y: '-50vh' }, // Começa fora da tela por cima
          { 
            y: '150vh', // Vai até o fim da tela por baixo
            duration: gsap.utils.random(4, 7), 
            repeat: -1, 
            ease: 'none', // Movimento contínuo e reto
            delay: gsap.utils.random(0, 4)
          }
        );
      });
    }, linesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={linesRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden mix-blend-screen">
      <div className="absolute inset-0 flex justify-evenly">
        {/* Linhas guias verticais com feixes de luz (beams) caindo */}
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className={`relative w-[1px] h-full bg-white/[0.03] ${i > 2 ? 'hidden md:block' : ''}`}>
            <div className="beam absolute top-0 w-[2px] -ml-[0.5px] h-[25vh] bg-gradient-to-b from-transparent via-[#FF6A00] to-transparent opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const solutionsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada dos Cards Magnéticos
      gsap.fromTo('.magnetic-wrapper', 
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out'
        }
      );

      // DrawSVG: Animando o traçado dos ícones (Stroke Reveal)
      gsap.fromTo('.draw-path',
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 75%',
          },
          strokeDashoffset: 0,
          duration: 2.5,
          stagger: 0.15,
          ease: 'power3.inOut'
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Efeito de Auto-Scroll nos Carrosséis Mobile
  useEffect(() => {
    const containers = [cardsContainerRef.current, solutionsContainerRef.current];
    const cleanups = [];

    containers.forEach((container) => {
      if (!container) return;
      
      let interval;
      let isUserInteracting = false;

      const startAutoScroll = () => {
        interval = setInterval(() => {
          if (!isUserInteracting && window.innerWidth < 768) {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
              container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              container.scrollBy({ left: container.clientWidth * 0.85, behavior: 'smooth' });
            }
          }
        }, 3500);
      };

      startAutoScroll();

      const stopInteraction = () => { isUserInteracting = false; };
      const startInteraction = () => { isUserInteracting = true; };

      container.addEventListener('touchstart', startInteraction, { passive: true });
      container.addEventListener('touchend', stopInteraction, { passive: true });
      
      cleanups.push(() => {
        clearInterval(interval);
        container.removeEventListener('touchstart', startInteraction);
        container.removeEventListener('touchend', stopInteraction);
      });
    });
    
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  const problems = [
    {
      title: "Primeira Impressão Fraca",
      description: "O visitante decide se confia na sua empresa em menos de 3 segundos. Um layout ultrapassado destrói sua credibilidade antes mesmo do seu discurso de vendas.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Guerra de Preços",
      description: "Sem autoridade visual, você é nivelado por baixo. O cliente não percebe o valor real do seu serviço e começa a te comparar apenas por quem cobra mais barato.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      title: "Dinheiro Queimado",
      description: "Você investe em tráfego pago (Google/Meta), mas o visitante clica, se decepciona com o design e vai para o concorrente. É orçamento rasgado todos os dias.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    },
    {
      title: "Velocidade de Tartaruga",
      description: "Seu site demora para carregar e o cliente fecha a aba antes mesmo de ver o que você faz. Cada segundo de lentidão é dinheiro entregue de bandeja para a concorrência.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Design Genérico",
      description: "Você usa os mesmos templates básicos que seus concorrentes menores. Nada te destaca como líder de mercado ou justifica cobrar o preço que seu serviço realmente vale.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Mensagem Confusa",
      description: "O visitante entra, lê seus textos e não entende imediatamente o que você resolve. Jargões difíceis e falta de clareza matam o desejo de compra na hora.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const solutions = [
    {
      title: "Landing Pages de Alta Conversão",
      description: "Páginas focadas em um único objetivo: transformar visitantes em leads quentes ou vendas diretas com copy persuasiva e design estratégico.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Sites Institucionais",
      description: "A vitrine digital perfeita para sua empresa. Apresente seus serviços, transmita autoridade e gere confiança logo no primeiro clique.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "E-commerces Premium",
      description: "Lojas virtuais desenhadas para vender 24/7. Checkout otimizado, navegação fluida e design que valoriza o seu produto.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Sistemas e Dashboards",
      description: "Soluções robustas sob medida. De painéis administrativos a plataformas completas, construímos a tecnologia do seu negócio.",
      icon: (
        <svg className="w-7 h-7 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="draw-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-32 lg:py-48 overflow-hidden z-10">
      
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="w-[80vw] h-[400px] bg-[#FF6A00]/5 blur-[150px] mix-blend-screen opacity-50" />
      </div>

      {/* Linhas verticais passando pelo Fundo */}
      <BackgroundLines />

      <div className="max-w-[85rem] mx-auto px-6 relative z-10">
        
        {/* Header da Seção sem GSAP Scrubbing (Texto branco visível sempre) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">

          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
            Quantos clientes excelentes você perdeu hoje porque seu site parece amador?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mt-4">
            Seu site deveria ser sua melhor e mais incansável ferramenta de vendas, não o principal motivo de você perder autoridade no mercado.
          </p>
        </div>

        {/* Grid Magnético 3D - Problemas */}
        <div ref={cardsContainerRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] perspective-1000 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {problems.map((problem, index) => (
            <MagneticCard 
              key={index}
              title={problem.title}
              description={problem.description}
              icon={problem.icon}
            />
          ))}
        </div>

        {/* Indicador de Swipe Mobile para Problemas */}
        <div className="flex md:hidden justify-center mt-6">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-pulse">
            <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.2em] font-medium">Deslize para ver mais</span>
          </div>
        </div>

        {/* Separador e Header de Soluções */}
        <div className="mt-40 mb-20 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#FF6A00]/50" />
            <span className="text-[#FF6A00] text-xs font-bold tracking-[0.2em] uppercase">Nosso Arsenal</span>
            <div className="w-8 h-[1px] bg-[#FF6A00]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            O que nós construímos <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66]">para o seu negócio</span>
          </h2>
        </div>

        {/* Grid Magnético 3D - Soluções */}
        <div ref={solutionsContainerRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] perspective-1000 pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 mt-8 md:mt-0">
          {solutions.map((solution, index) => (
            <MagneticCard 
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
            />
          ))}
        </div>

        {/* Indicador de Swipe Mobile para Soluções */}
        <div className="flex md:hidden justify-center mt-6">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-pulse">
            <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.2em] font-medium">Deslize para ver mais</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
