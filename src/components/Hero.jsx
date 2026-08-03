import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, BarChart3, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { trackConversion } from '@/utils/analytics';
import { niches } from '@/config/niches';

export default function Hero() {
  const [isNotebookClicked, setIsNotebookClicked] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Refs para animações
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const ctaRef = useRef(null);
  const benefitsRef = useRef(null);
  const rightColRef = useRef(null);
  const textColRef = useRef(null);

  // Carregar dados baseados na variável injetada pelo SSG ou fallback pro default
  const currentNiche = typeof window !== 'undefined' && window.NICHE ? window.NICHE : 'default';
  const nicheData = niches[currentNiche] || niches.default;

  useEffect(() => {
    // 1. Canvas Particles Logic (Layer 4)
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let animationFrameId;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          
          // Brasas de fogo reais (curtas e levemente arredondadas, não traços longos)
          this.thickness = Math.random() * 2 + 1;
          
          // Vento empurrando o fogo para cima e levemente para a direita (graus: -40 a -60)
          const angle = -(Math.random() * 20 + 40) * (Math.PI / 180);
          this.speed = Math.random() * 2 + 0.5;
          this.speedX = Math.cos(angle) * this.speed;
          this.speedY = Math.sin(angle) * this.speed;
          
          // Opacidade base baixa (translúcida) para não parecer luz artificial
          this.opacityBase = Math.random() * 0.4 + 0.1; 
          
          // Cores de brasa viva (Laranjas escuros e avermelhados, sem amarelo neon)
          const colors = ['255, 90, 0', '255, 120, 0', '255, 50, 0'];
          this.color = colors[Math.floor(Math.random() * colors.length)];
          
          // Fator de cintilação (piscar das brasas)
          this.flickerSpeed = Math.random() * 0.05 + 0.01;
          this.time = Math.random() * 100;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.time += this.flickerSpeed; // Atualiza a cintilação
          
          // Se sair da tela, recria embaixo
          if (this.x > canvas.width || this.y < -10) {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
          }
        }
        draw() {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          
          // Rastro orgânico bem curto baseado na velocidade
          ctx.lineTo(this.x - (this.speedX * 1.5), this.y - (this.speedY * 1.5));
          
          // Calcula a opacidade cintilante usando o tempo
          const currentOpacity = this.opacityBase + (Math.sin(this.time) * 0.2);
          
          ctx.strokeStyle = `rgba(${this.color}, ${Math.max(0.1, currentOpacity)})`;
          ctx.lineWidth = this.thickness;
          ctx.lineCap = 'round';
          
          // Glow muito sutil (para não virar neon)
          // ctx.shadowBlur = 4; // REMOVIDO: Causa extremo lag em celulares
          // ctx.shadowColor = `rgba(${this.color}, 0.5)`;
          
          ctx.stroke();
        }
      }

      const particleCount = window.innerWidth < 768 ? 50 : 150; // Menos faíscas no celular para salvar bateria e CPU
      for (let i = 0; i < particleCount; i++) { 
        particles.push(new Particle());
      }

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        animationFrameId = requestAnimationFrame(animateParticles);
      };
      animateParticles();

      // 2. GSAP Animations (Premium Sequence)
      const ctxGsap = gsap.context(() => {
        const tl = gsap.timeline();

        // Setup inicial (esconder)
        gsap.set([subheadRef.current, ctaRef.current, rightColRef.current], {
          y: 20,
          opacity: 0
        });
        
        if (benefitsRef.current) {
          gsap.set(benefitsRef.current.children, {
            y: 20,
            opacity: 0
          });
        }

        // Split headline text manually for word-by-word animation
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.set(words, { y: 30, opacity: 0, rotateX: 40, scale: 1.15 });

        // Sequência de entrada (Efeito 3D Pop sem blur para salvar CPU)
        tl.to(words, {
          y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, stagger: 0.05, ease: 'back.out(1.4)'
        })
        .to(subheadRef.current, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out'
        }, "-=0.8")
        .to(ctaRef.current, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
        }, "-=0.7")
        .to(rightColRef.current, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power2.out'
        }, "-=1.2");

        // Glow respirando lentamente (Loop) - efeito de fumaça iluminada
        gsap.to('.ambient-glow', {
          scale: 1.1,
          opacity: 0.25,
          duration: 6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });

      }, containerRef.current);

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
        ctxGsap.revert();
      };
    }
  }, []);

  // Parallax Effect Separado (Segurança de Memória)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!textColRef.current || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;
      
      gsap.to(textColRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power2.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col justify-center overflow-hidden pt-20 md:pt-24 pb-0 bg-[#030303] selection:bg-[#FF6A00]/30"
    >
      {/* Camada 1: Background Fixo Fumaça/Fogo */}
      
      {/* Fumaça sutil no fundo */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(255,106,0,0.1) 0%, transparent 60%)' }} />

      {/* Camada 3: Glow Radial (Iluminação de Fogo - Sem Filtro Blur para Performance) */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none flex justify-center items-center">
        <div className="ambient-glow absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,50,0,0.15) 0%, transparent 70%)' }} />
        <div className="ambient-glow absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.1) 0%, transparent 70%)' }} />
      </div>

      {/* Camada 4: Canvas Partículas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-[3] pointer-events-none mix-blend-screen"
      />

      {/* Camada 5: Conteúdo Principal */}
      <div className="relative z-[10] w-full max-w-[85rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        
        {/* Coluna da Esquerda (Texto Ultra Limpo e Focado em Conversão) */}
        <div ref={textColRef} className="flex flex-col max-w-xl mx-auto lg:mx-0 items-center text-center lg:items-start lg:text-left">
          
          <h1 
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] mb-8 md:mb-10 perspective-[1200px] [text-shadow:0_10px_20px_rgba(0,0,0,0.9),_0_2px_4px_rgba(255,255,255,0.1)]"
          >
            {nicheData.heroTitleLines.map((line, lineIndex) => (
              <span key={lineIndex} className="inline-block">
                {line.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex}>
                    <span className="word inline-block">{word}</span>
                    {wordIndex !== line.split(' ').length - 1 && <>&nbsp;</>}
                  </span>
                ))}
                {lineIndex !== nicheData.heroTitleLines.length - 1 && <br className="hidden lg:block" />}
              </span>
            ))}
            <br className="hidden lg:block" />
            <span className="word inline-block bg-gradient-to-r from-[#FF6A00] to-[#ff984d] text-transparent bg-clip-text mt-2 drop-shadow-[0_0_30px_rgba(255,106,0,0.2)]">
              {nicheData.heroHighlight}
            </span>
          </h1>

          <h2 
            ref={subheadRef}
            className="text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-16 md:mb-14 max-w-[90%] lg:max-w-none tracking-wide"
          >
            {nicheData.heroSubhead}
          </h2>
          
          <div ref={ctaRef} className="flex flex-col items-center lg:items-start gap-4 mb-14 w-full sm:w-auto relative">
            {/* Botão Premium com Pulso */}
            <div className="relative group w-full sm:w-auto">
              
              {/* Glow Premium Pulsante atrás do botão (Aura respirando) */}
              <div className="absolute -inset-2 rounded-[24px] bg-[#25D366] blur-xl opacity-30 animate-[pulse_4s_ease-in-out_infinite] z-0 pointer-events-none mix-blend-screen" />
              
              <button 
                onClick={() => {
                  trackConversion('hero_cta');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto relative flex items-center justify-center gap-3 px-10 py-5 rounded-[20px] bg-gradient-to-b from-[#25D366] to-[#1DA851] text-white text-lg font-bold shadow-[0_8px_30px_rgba(37,211,102,0.25)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden z-10 animate-[button-pulse_2s_ease-in-out_infinite] hover:animate-none hover:-translate-y-0.5"
              >
                {/* Brilho passando lentamente no hover (Shine effect) */}
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shine_1.5s_ease-in-out_infinite] z-20 pointer-events-none" />
                
                <span className="relative z-10">{nicheData.heroButton}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                {/* Glow interno (Inner shadow sutil) */}
                <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] pointer-events-none" />
              </button>
            </div>


          </div>
        </div>

        {/* Camada 5 & 6: Coluna da Direita (Mockups ou Imagem) */}
        <div className="relative hidden lg:block h-[650px] flex items-center justify-center perspective-[2000px]">
          
          {currentNiche === 'distribuidoras' ? (
            <div ref={rightColRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Glow forte atrás da imagem para mesclar com o fundo */}
              <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#FF6A00]/15 blur-[120px] rounded-full z-0" />
              
              {/* Imagem mesclada sem bordas */}
              <div className="relative w-[130%] ml-20 z-10 transform-gpu rotate-y-[-15deg] rotate-x-[5deg] transition-transform duration-1000 ease-out">
                <img 
                  src="/assets/hero-distribuidora.png" 
                  alt="Plataforma B2B Distribuidoras"
                  className="w-full h-auto object-cover opacity-90 filter contrast-125"
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
                    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
                  }}
                />
              </div>
            </div>
          ) : (
            <div ref={rightColRef} className="absolute inset-0">
              {/* Glow indireto atrás do notebook */}
              <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#FF6A00]/10 blur-[100px] rounded-full z-0" />
              
              {/* Notebook Mockup */}
              <div 
                onClick={() => setIsNotebookClicked(!isNotebookClicked)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] h-[432px] rotate-[-5deg] rotateX-[4deg] rotateY-[-12deg] shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden transform-gpu transition-all duration-700 hover:rotate-[-3deg] hover:rotateY-[-8deg] cursor-pointer group z-10"
              >
                <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2 relative z-10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Interagir
                  </span>
                </div>
                <div className="relative h-[400px] w-full bg-[#030303] overflow-hidden">
                  <img 
                    src="/assets/Sun & SAL DOBRA 2.webp" 
                    alt="Criação de Loja Virtual de Alta Conversão"
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${isNotebookClicked ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <img 
                    src="/assets/Sun e sal 2 dobra 2.webp" 
                    alt="Design Premium de E-commerce"
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${isNotebookClicked ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              </div>

              {/* Smartphone Mockup */}
              <div className="absolute left-[-2%] bottom-12 w-[32%] h-[400px] rotate-[6deg] rotateY-[12deg] shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-[2.5rem] bg-[#050505] border-[5px] border-[#1a1a1a] p-1 overflow-hidden transform-gpu transition-all duration-700 hover:rotate-[4deg] hover:rotateY-[8deg] z-20">
                <div className="absolute top-0 inset-x-0 h-4 bg-[#1a1a1a] rounded-b-xl w-[40%] mx-auto z-20" />
                <div className="h-full w-full rounded-[1.75rem] bg-[#030303] border border-white/5 overflow-hidden relative">
                  <img 
                    src="/assets/Drink Voro dobra 2.webp" 
                    alt="Site Mobile First Focado em Conversão"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </section>
  );
}
