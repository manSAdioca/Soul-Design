import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => (
  <div className="w-[300px] md:w-[450px] flex-shrink-0 p-6 md:p-8 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] hover:border-[#FF6A00]/50 hover:bg-[#111111] transition-all duration-500 group relative overflow-hidden">
    
    {/* Efeito Glow Laranja Interno no Hover */}
    <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-[#FF6A00]/0 group-hover:bg-[radial-gradient(circle,rgba(255,106,0,0.2)_0%,transparent_70%)] rounded-full transition-all duration-700 pointer-events-none" />
    
    {/* Aspas Gigantes Decorativas */}
    <Quote className="absolute top-6 right-6 w-12 h-12 md:w-16 md:h-16 text-white/[0.03] rotate-180 pointer-events-none group-hover:text-[#FF6A00]/10 transition-colors duration-500" />
    
    {/* Estrelas */}
    <div className="flex gap-1 mb-4 md:mb-6 relative z-10">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#FF6A00] text-[#FF6A00]" />
      ))}
    </div>
    
    {/* Texto */}
    <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8 relative z-10 font-light group-hover:text-white/90 transition-colors duration-300">
      "{testimonial.text}"
    </p>
    
    {/* Perfil */}
    <div className="flex items-center gap-3 md:gap-4 relative z-10">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-[#FF6A00]/50 transition-colors duration-300">
        <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
      <div>
        <h4 className="text-white font-bold text-sm md:text-base">{testimonial.name}</h4>
        <p className="text-[#FF6A00]/70 text-xs md:text-sm font-medium tracking-wide">{testimonial.company}</p>
      </div>
    </div>
  </div>
);
