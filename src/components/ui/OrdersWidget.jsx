import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function OrdersWidget({ className }) {
  const itemsRef = useRef([]);

  useEffect(() => {
    // Animando as linhas de pedidos entrando suavemente
    gsap.fromTo(itemsRef.current, 
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemsRef.current[0],
          start: 'top 85%'
        }
      }
    );
  }, []);

  return (
    <div className={`flex flex-col bg-[#080808] border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-[400px] mx-auto ${className}`}>
      
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
        <h4 className="text-white/90 text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
          Pedidos em Tempo Real
        </h4>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { id: '#4902', cliente: 'Supermercado Silva', valor: 'R$ 14.500', time: 'Agora' },
          { id: '#4901', cliente: 'Adega Premium', valor: 'R$ 3.200', time: '2 min atrás' },
          { id: '#4900', cliente: 'Restaurante Central', valor: 'R$ 8.900', time: '15 min atrás' },
        ].map((order, i) => (
          <div key={i} ref={el => itemsRef.current[i] = el} className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.03]">
            <div>
              <div className="text-white text-xs font-bold">{order.cliente}</div>
              <div className="text-white/40 text-[10px]">{order.id} &bull; {order.time}</div>
            </div>
            <div className="text-[#FF6A00] text-sm font-black">{order.valor}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
