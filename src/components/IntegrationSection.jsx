import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Server, Cloud, ArrowRightLeft, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  { name: 'Bling', type: 'ERP Cloud', icon: Cloud, color: 'from-blue-500/20 to-blue-900/20', border: 'border-blue-500/30' },
  { name: 'Tiny', type: 'ERP Cloud', icon: Cloud, color: 'from-cyan-500/20 to-cyan-900/20', border: 'border-cyan-500/30' },
  { name: 'SAP', type: 'Enterprise', icon: Server, color: 'from-yellow-500/20 to-yellow-900/20', border: 'border-yellow-500/30' },
  { name: 'Sankhya', type: 'Enterprise', icon: Server, color: 'from-green-500/20 to-green-900/20', border: 'border-green-500/30' },
  { name: 'Totvs', type: 'Enterprise', icon: Server, color: 'from-purple-500/20 to-purple-900/20', border: 'border-purple-500/30' },
  { name: 'Omie', type: 'ERP Cloud', icon: Cloud, color: 'from-pink-500/20 to-pink-900/20', border: 'border-pink-500/30' },
];

const IntegrationSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-24 lg:py-32 overflow-hidden z-10 border-t border-white/[0.02]">
      
      {/* Grade de fundo estilo Tech */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Luz Neon Laranja Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,106,0,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />

      <div className="max-w-[85rem] mx-auto px-6 relative z-10">
        
        <div className="w-full flex flex-col items-center text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
            <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Infraestrutura Robusta</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter">
            Conectado ao seu <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66]">Ecossistema</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl mt-6 max-w-2xl font-light">
            Seu estoque, notas fiscais e faturamento sincronizados em tempo real, sem retrabalho. Integrado com os maiores sistemas de gestão do mercado.
          </p>
        </div>

        {/* Central Hub UI */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 w-full relative z-20">
            {integrations.map((item, i) => (
              <div 
                key={i}
                ref={el => cardsRef.current[i] = el}
                className={`relative overflow-hidden rounded-2xl bg-[#0a0a0a] border ${item.border} p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <item.icon className="w-10 h-10 text-white/70 mb-4 relative z-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white relative z-10">{item.name}</h3>
                <span className="text-sm text-white/40 mt-1 font-medium tracking-wide uppercase relative z-10">{item.type}</span>
              </div>
            ))}
          </div>

          {/* Logic Node Path Effect */}
          <div className="mt-12 w-full flex justify-center">
             <div className="inline-flex items-center gap-4 text-white/40">
               <Database className="w-5 h-5" />
               <div className="flex items-center gap-1">
                 <div className="w-1 h-1 rounded-full bg-[#FF6A00] animate-ping" />
                 <div className="w-16 h-[1px] bg-gradient-to-r from-[#FF6A00]/50 to-transparent" />
               </div>
               <ArrowRightLeft className="w-5 h-5 text-[#FF6A00]" />
               <div className="flex items-center gap-1">
                 <div className="w-16 h-[1px] bg-gradient-to-l from-[#FF6A00]/50 to-transparent" />
                 <div className="w-1 h-1 rounded-full bg-[#FF6A00] animate-ping delay-150" />
               </div>
               <span className="text-sm font-semibold text-white tracking-widest uppercase">Portal Imperatriz</span>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default IntegrationSection;
