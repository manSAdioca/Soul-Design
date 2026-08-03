import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SalesChartWidget({ className }) {
  const barsRef = useRef([]);

  useEffect(() => {
    // Animando as barras do gráfico para crescerem
    gsap.fromTo(barsRef.current, 
      { height: '10%' },
      { 
        height: (i) => `${40 + (i * 15) + (Math.random() * 20)}%`, // Crescimento progressivo
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barsRef.current[0],
          start: 'top 85%'
        }
      }
    );
  }, []);

  return (
    <div className={`flex flex-col bg-[#050505] border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-[320px] ${className}`}>
      
      {/* Header do Widget */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-white/80 text-xs uppercase tracking-wider font-semibold mb-1">Vendas B2B (Mensal)</h4>
          <div className="text-2xl font-black text-white">R$ 1.240.500</div>
        </div>
        <div className="px-2 py-1 rounded bg-[#25D366]/20 text-[#25D366] text-xs font-bold border border-[#25D366]/30">
          +34.5%
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div className="flex items-end justify-between h-[120px] gap-2 mb-4 border-b border-white/5 pb-2">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className="relative w-full h-full flex items-end group">
            <div 
              ref={el => barsRef.current[i] = el}
              className={`w-full rounded-t-sm transition-all duration-300 ${i === 5 ? 'bg-gradient-to-t from-[#FF6A00] to-[#ffaa66] shadow-[0_0_15px_rgba(255,106,0,0.4)]' : 'bg-white/10 group-hover:bg-white/20'}`}
              style={{ height: '10%' }}
            />
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="flex justify-between text-[10px] text-white/40 font-medium">
        <span>Jan</span>
        <span>Fev</span>
        <span>Mar</span>
        <span>Abr</span>
        <span>Mai</span>
        <span className="text-[#FF6A00]">Jun</span>
      </div>

    </div>
  );
}
