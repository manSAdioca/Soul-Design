import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Mail, MessageSquare, Phone, User, Lock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackConversion } from '@/utils/analytics';
import { getFormattedUTMs } from '@/utils/utm';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = ({ niche = 'default' }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    trackConversion('contact_submit');
    setStatus('success');
    let currentProgress = 0;
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    const utms = getFormattedUTMs();

    // Disparo Silencioso de E-mail via EmailJS
    emailjs.send(
      'service_t3jobhh', // Service ID
      'template_o4xsb3f', // Template ID
      {
        name: name,
        phone: phone,
        email: email,
        origem: niche + utms,
      },
      'af8fsz3hVjcJCBrSJ' // Public Key
    ).then((response) => {
      console.log('E-mail enviado com sucesso!', response.status, response.text);
    }).catch((err) => {
      console.error('Falha ao enviar e-mail...', err);
    });
    
    const text = `Olá! Acabei de preencher o formulário no site e gostaria de iniciar meu atendimento. (Origem: ${niche})${utms}`;
    const link = `https://wa.me/5547992419566?text=${encodeURIComponent(text)}`;
    setWhatsappLink(link);
    
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        window.location.href = link;
        
        setTimeout(() => {
          setStatus('idle');
          setProgress(0);
        }, 1000);
      }
    }, 100);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação Lado Esquerdo (Textos)
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }
      );

      // Animação Lado Direito (Formulário)
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative w-full bg-[#030303] py-24 lg:py-32 overflow-hidden z-10 border-t border-white/[0.02]">
      
      {/* Linha Neon Animada na Divisão Superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent">
        <div className="absolute top-0 left-0 h-[2px] w-[30%] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent shadow-[0_0_15px_#FF6A00] animate-[neon-line_2.5s_ease-in-out_infinite]" />
      </div>

      {/* Background Cinematográfico - Glow Centralizado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,106,0,0.05)_0%,transparent_60%)] pointer-events-none rounded-full z-0" />

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Lado Esquerdo: Copy e Impacto */}
          <div ref={leftRef} className="flex flex-col items-center text-center opacity-0">

            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-8">
              Eleve o nível do <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffaa66]">seu jogo.</span>
            </h2>
            
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-sm">
              O amadorismo custa caro. Chegou a hora de transformar sua marca na maior autoridade do seu nicho.
            </p>
          </div>

          {/* Lado Direito: Formulário Glassmorphism Premium */}
          <div ref={rightRef} className="w-full opacity-0">
            <div className="w-full rounded-[2rem] p-8 md:p-12 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group">
              
              {/* Efeito Glow Laranja Interno na borda */}
              <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,106,0,0.15)_0%,transparent_60%)] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-[radial-gradient(circle,rgba(255,106,0,0.25)_0%,transparent_60%)]" />

              {status === 'success' ? (
                <div className="relative z-10 flex flex-col items-center text-center animate-[fade-in_0.5s_ease-out] py-8">
                  <span className="inline-flex items-center gap-2 text-[#FF6A00] font-bold tracking-[0.2em] uppercase text-xs mb-8 px-5 py-2 rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>
                    Solicitação recebida com sucesso
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Obrigado pelo seu contato!</h3>
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-sm mb-12">
                    Recebemos suas informações e estamos preparando seu atendimento. Você será direcionado automaticamente para o WhatsApp em alguns segundos.
                  </p>

                  <div className="w-full max-w-sm mb-10 text-left">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Redirecionando para o WhatsApp...</span>
                      <span className="text-white/40 text-[10px] md:text-xs font-bold tracking-widest">{Math.ceil((100 - progress) / 20)}s</span>
                    </div>
                    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF4500] transition-all duration-100 ease-linear" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackConversion('contact_whatsapp')}
                    className="w-full max-w-sm flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white py-4 px-8 rounded-xl font-bold text-sm tracking-wide transition-colors duration-300 shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                  >
                    <MessageSquare className="w-5 h-5" />
                    CONTINUAR PARA O WHATSAPP
                  </a>
                </div>
              ) : (
                <div className="relative z-10">
                  <p className="text-white/70 text-lg md:text-xl font-light mb-10 text-center">
                    Preencha os dados abaixo e nossa equipe entrará em contato.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    {/* Nome */}
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase ml-1">Nome Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Seu nome"
                        className="w-full bg-transparent border-b border-white/10 focus:border-[#FF6A00] outline-none text-white placeholder-white/20 font-light text-base py-3 transition-colors duration-300"
                        required
                      />
                    </div>

                    {/* Telefone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase ml-1">Telefone / WhatsApp</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="(00) 00000-0000"
                        className="w-full bg-transparent border-b border-white/10 focus:border-[#FF6A00] outline-none text-white placeholder-white/20 font-light text-base py-3 transition-colors duration-300"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase ml-1">E-mail</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="seu@email.com"
                        className="w-full bg-transparent border-b border-white/10 focus:border-[#FF6A00] outline-none text-white placeholder-white/20 font-light text-base py-3 transition-colors duration-300"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="mt-6 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6A00] to-[#FF4500] text-white py-4 md:py-5 px-8 rounded-xl font-bold text-[13px] tracking-[0.2em] uppercase hover:shadow-[0_0_40px_rgba(255,106,0,0.4)] transition-all duration-300"
                    >
                      Concluir Atendimento
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Lock className="w-3 h-3 text-white/30" />
                      <p className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center">Seus dados estão seguros e não serão compartilhados.</p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
