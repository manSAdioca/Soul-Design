import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SalesChartWidget from './ui/SalesChartWidget';
import OrdersWidget from './ui/OrdersWidget';
import { niches } from '@/config/niches';

gsap.registerPlugin(ScrollTrigger);

export default function B2BGrowthSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const nicheData = niches['distribuidoras']; // Hardcoded to distribuidoras since this is a dedicated section

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada dos blocos do Bento Grid
      gsap.fromTo(cardsRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-24 lg:py-32 overflow-hidden z-10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="w-[100vw] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.03)_0%,transparent_70%)] opacity-80" />
      </div>

      <div className="max-w-[75rem] mx-auto px-6 relative z-10">
        
        {/* Header Ultra Agressivo */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
            Vazamento de Lucro Detectado
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Quanto faturamento sua distribuidora deixou na mesa neste <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66]">fim de semana?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl">
            Enquanto sua equipe descansa, os concorrentes estão capturando pedidos online 24 horas por dia. Se você não tem um portal automático, você está perdendo dinheiro.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 max-w-full">
          
          {/* Card 1: Vendas 24/7 (Grande) */}
          <div 
            ref={el => cardsRef.current[0] = el}
            className="md:col-span-2 flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-white/10 transition-colors shadow-2xl overflow-hidden relative group"
          >
            {/* Efeito Glow Interno */}
            <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-[#FF6A00]/10 blur-[80px] rounded-full group-hover:bg-[#FF6A00]/20 transition-colors pointer-events-none" />
            
            <div className="flex-1 z-10 w-full">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight">Venda Atacado (B2B) e Varejo (B2C) 24h</h3>
              <p className="text-gray-400 text-sm md:text-base mb-5 md:mb-6 leading-relaxed">
                O bar precisa de reposição de urgência. O consumidor final quer bebida pro churrasco de domingo. Se você depende apenas de vendedores humanos no WhatsApp, você perde essas vendas.
              </p>
              <ul className="flex flex-col gap-2 md:gap-3">
                {['Portal Atacado para bares e eventos', 'Delivery automatizado para o consumidor final', 'Integração de estoque em tempo real'].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-3 text-xs md:text-sm text-gray-300 font-medium">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-[#25D366] flex-shrink-0 mt-0.5 md:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Gráfico Real Injetado */}
            <div className="w-full md:w-auto relative z-10 flex-shrink-0 flex justify-center perspective-[1000px] mt-6 md:mt-0">
              <div className="transform-gpu md:-rotate-y-12 md:rotate-x-12 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 w-full max-w-[300px] md:max-w-none mx-auto">
                <SalesChartWidget className="scale-95 md:scale-100 origin-right" />
              </div>
            </div>
          </div>

          {/* Card 2: Crescimento (+47%) (Pequeno) */}
          <div 
            ref={el => cardsRef.current[1] = el}
            className="flex flex-col justify-center bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-[#FF6A00]/30 transition-colors shadow-2xl relative overflow-hidden group min-h-[250px]"
          >
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FF6A00]/5 to-transparent pointer-events-none" />
            
            <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
              +47%
            </div>
            <h4 className="text-white font-bold text-base md:text-lg mb-2">Crescimento Médio</h4>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Distribuidoras que unem vendas físicas ao varejo digital e atacado automatizado disparam em faturamento.
            </p>
          </div>

          {/* Card 3: Pedidos ao Vivo (Pequeno) */}
          <div 
            ref={el => cardsRef.current[2] = el}
            className="flex flex-col bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden min-h-[300px]"
          >
            <div className="mb-4 md:mb-6 z-10 relative">
              <h4 className="text-white font-bold text-lg md:text-xl mb-2">Máquina Autônoma</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Deixe o sistema vender para o churrasco e repor o estoque do bar sozinho.
              </p>
            </div>
            
            <div className="relative z-10 w-full flex justify-center flex-1 items-end -mb-4">
              <OrdersWidget className="w-full scale-95 md:scale-100" />
            </div>
          </div>

          {/* Card 4: Fim dos Erros Logísticos (Grande) */}
          <div 
            ref={el => cardsRef.current[3] = el}
            className="md:col-span-2 flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-[#FF6A00]/20 transition-colors shadow-2xl relative group overflow-hidden"
          >
            <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center gap-3 md:gap-4">
              <div className="flex items-end gap-3 text-[#FF6A00] mb-2">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <span className="text-2xl md:text-3xl font-black">- 85%</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Queda nos Erros Logísticos</h3>
              <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                Pedido anotado errado gera devolução e dor de cabeça. Quando o cliente (CNPJ ou CPF) faz a compra direto no portal e ela cai no seu sistema, o erro cai a zero. Mais eficiência na rota de entrega.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 relative z-10 bg-[#111] border border-white/5 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex justify-between text-xs text-white/50 uppercase tracking-wider font-bold mb-2">
                <span>Antes (WhatsApp)</span>
                <span>Depois (Portal)</span>
              </div>
              
              <div className="relative h-2 w-full bg-red-500/20 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[85%] bg-red-500" />
              </div>
              <div className="relative h-2 w-full bg-[#25D366]/20 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[15%] bg-[#25D366]" />
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section for B2B */}
        <div className="mt-20 flex justify-center relative z-10">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#ffaa66] text-white text-lg font-bold shadow-[0_10px_30px_rgba(255,106,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,106,0,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span>Quero digitalizar minha distribuidora</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
