import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { niches } from '@/config/niches';
import SalesChartWidget from './ui/SalesChartWidget';
import OrdersWidget from './ui/OrdersWidget';
import B2BGrowthSection from './B2BGrowthSection';


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
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.1)_0%,transparent_50%)] opacity-0 pointer-events-none"
            style={{ transform: 'translate(-400px, -400px)' }}
          />
        </div>

        {/* Ícone com Efeito de Parallax */}
        <div 
          className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-[#111] border border-white/5 mb-6 shadow-inner group-hover:border-[#FF6A00]/40 transition-colors duration-500"
          style={{ transform: 'translateZ(30px)' }}
          dangerouslySetInnerHTML={{ __html: icon }}
        />

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
    }, linesRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={linesRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden">
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

    }, sectionRef.current);

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

  let currentNiche = 'default';
  if (typeof window !== 'undefined') {
    if (window.location.hostname.includes('corretores')) {
      currentNiche = 'corretores';
    } else if (window.location.hostname.includes('distribuidoras')) {
      currentNiche = 'distribuidoras';
    } else if (window.NICHE) {
      currentNiche = window.NICHE;
    }
  }
  
  // Roteamento condicional de Componente: Se for Distribuidora, carrega o Bento Grid Agressivo
  if (currentNiche === 'distribuidoras') {
    return <B2BGrowthSection />;
  }

  const nicheData = niches[currentNiche] || niches.default;
  const problems = nicheData.problems;
  const solutions = nicheData.solutions;

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-32 lg:py-48 overflow-hidden z-10">
      
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="w-[80vw] h-[400px] bg-[radial-gradient(circle,rgba(255,106,0,0.05)_0%,transparent_60%)] opacity-50" />
      </div>

      {/* Linhas verticais passando pelo Fundo */}
      <BackgroundLines />

      <div className="max-w-[85rem] mx-auto px-6 relative z-10">
        
        {/* Header da Seção sem GSAP Scrubbing (Texto branco visível sempre) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">

          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
            {nicheData.problemsTitle}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mt-4">
            {nicheData.problemsSubhead}
          </p>
        </div>

        {/* Grid Magnético 3D - Problemas */}
        <div ref={cardsContainerRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] perspective-1000 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {problems.map((problem, index) => (
            <MagneticCard 
              key={index}
              title={problem.title}
              description={problem.description}
              icon={problem.iconSvg}
            />
          ))}
        </div>

        {/* Indicador de Swipe Mobile para Problemas */}
        <div className="flex md:hidden justify-center mt-6">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111111]/80 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-pulse">
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
            {nicheData.solutionsTitle} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66]">{nicheData.solutionsTitleHighlight}</span>
          </h2>
        </div>

        {/* Grid Magnético 3D - Soluções */}
        <div ref={solutionsContainerRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] perspective-1000 pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 mt-8 md:mt-0">
          {solutions.map((solution, index) => (
            <MagneticCard 
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.iconSvg}
            />
          ))}
        </div>

        {/* Indicador de Swipe Mobile para Soluções */}
        <div className="flex md:hidden justify-center mt-6">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111111]/80 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-pulse">
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
