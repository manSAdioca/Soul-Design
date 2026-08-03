import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const SolutionSection = () => {
  const sectionRef = useRef(null);
  const laptopEnterRef = useRef(null);
  const laptopFloatRef = useRef(null);
  const textRef = useRef(null);
  const glareRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const autoPlayRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));

  // Auto-play logic
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [current]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada da pequena Headline
      gsap.fromTo(textRef.current, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }
      );

      // Entrada do Notebook Gigante (Usando a Ref do container externo)
      gsap.fromTo(laptopEnterRef.current,
        { y: 100, opacity: 0, rotateX: 10 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: 'power3.out'
        }
      );

      // Efeito de gravidade zero ultra suave (Usando a Ref do elemento interno)
      gsap.to(laptopFloatRef.current, {
        y: '-=15',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });

      // Animação do Reflexo na tela (Glare passing by)
      gsap.to(glareRef.current, {
        x: '200%',
        duration: 6,
        repeat: -1,
        ease: 'power1.inOut',
        delay: 2
      });

    }, sectionRef.current);
    return () => ctx.revert();
  }, []);  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden z-10 border-t border-white/[0.02]">
      
      {/* Linha Neon Animada na Divisão Superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent">
        <div className="absolute top-0 left-0 h-[2px] w-[30%] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent shadow-[0_0_15px_#FF6A00] animate-[neon-line_2.5s_ease-in-out_infinite]" />
      </div>

      {/* Background Cinematográfico */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,106,0,0.1)_0%,transparent_60%)] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-[#000000] to-transparent pointer-events-none z-0" />

      <div className="max-w-[90rem] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Textos Minimalistas */}
        <div ref={textRef} className="w-full flex flex-col items-center text-center mb-10 lg:mb-16">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tighter">
            Projetamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66] whitespace-nowrap">Obras-Primas</span>
          </h2>
        </div>

        {/* Palco do Mockup Centralizado */}
        <div className="w-full relative perspective-1000 flex justify-center mt-8">
          
          {/* Container Externo para Entrada (Slide In) */}
          <div ref={laptopEnterRef} className="w-full max-w-[1300px] 2xl:max-w-[1400px] z-40 relative px-0" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Container Interno para Flutuação (Zero Gravity) */}
            <div 
              ref={laptopFloatRef}
              className="w-full rounded-xl bg-[#0a0a0a] border-[4px] border-[#1a1a1a] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_60px_rgba(255,106,0,0.15)] overflow-hidden transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Webcam */}
              <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black border border-[#333] z-50" />
              
              {/* Tela do Laptop */}
              <div className="w-full h-full pt-4 md:pt-6 bg-[#050505]">
                <div className="w-full aspect-[16/10] md:aspect-[16/9] bg-[#050505] relative overflow-hidden border-b border-[#222]">
                  
                  {/* Imagens do Carrossel */}
                  {projects.map((project, i) => (
                    <img 
                      loading="lazy"
                      key={`${project.id}-${i}`}
                      src={project.desktop} 
                      alt={project.name} 
                      className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${current === i ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03] pointer-events-none'}`}
                    />
                  ))}
                  
                  {/* Reflexo Cinematográfico (Glare) */}
                  <div 
                    ref={glareRef}
                    className="absolute top-0 left-[-100%] w-[150%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-[30deg] pointer-events-none z-30"
                  />
                  
                  {/* Removido o Inset Shadow para não escurecer NADA */}
                </div>
              </div>
              
              {/* Base do Laptop */}
              <div className="w-full h-4 md:h-8 bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] rounded-b-xl border-t border-[#333] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SolutionSection;
