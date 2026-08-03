import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { getTestimonials } from '@/data/testimonials';
import { TestimonialCard } from './ui/TestimonialCard';
import { niches } from '@/config/niches';
const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const currentNiche = import.meta.env.VITE_NICHE || 'default';
  const nicheData = niches[currentNiche] || niches.default;
  const { r1: row1, r2: row2 } = getTestimonials(currentNiche);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-24 lg:py-32 overflow-hidden z-10 border-t border-white/[0.02]">
      
      {/* Linha Neon Animada na Divisão Superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent">
        <div className="absolute top-0 left-0 h-[2px] w-[30%] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent shadow-[0_0_15px_#FF6A00] animate-[neon-line_2.5s_ease-in-out_infinite]" />
      </div>

      {/* Luz de Fundo Direita */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,106,0,0.05)_0%,transparent_60%)] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        
        {/* Header da Seção */}
        <div ref={textRef} className="w-full flex flex-col items-center text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter">
            {nicheData.testimonialsTitle} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66]">{nicheData.testimonialsHighlight}</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl mt-6 max-w-2xl font-light">
            {nicheData.testimonialsSubhead}
          </p>
        </div>
      </div>

      {/* Marquee de Depoimentos */}
      <div className="w-full relative flex flex-col gap-6 lg:gap-8 pb-10">
        
        {/* Row 1 - Desliza para a Esquerda */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex gap-6 lg:gap-8 min-w-max animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] px-3 lg:px-4">
            {row1.map((item, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={item} />
            ))}
          </div>
        </div>

        {/* Row 2 - Desliza para a Direita */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex gap-6 lg:gap-8 min-w-max animate-[marquee-reverse_50s_linear_infinite] group-hover:[animation-play-state:paused] px-3 lg:px-4">
            {row2.map((item, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={item} />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default TestimonialSection;
