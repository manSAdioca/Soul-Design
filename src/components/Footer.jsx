import React, { useState } from 'react';
import { X } from 'lucide-react';
import logo from '../assets/logo.webp';
import { trackConversion } from '@/utils/analytics';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'termos' | 'privacidade'

  const openModal = (type) => {
    trackConversion('footer_link_' + type);
    setModalType(type);
    setIsModalOpen(true);
    // Remove o scroll do body para não bugar a tela de fundo
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Devolve o scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <footer className="w-full bg-[#020202] py-12 border-t border-white/[0.05] relative z-20">
      <div className="max-w-[90rem] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="Soul Logo" loading="lazy" className="h-10 relative z-10" />
          <div>
            <p className="text-white/30 text-sm font-light">
              © {new Date().getFullYear()} Soul Design. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Links Legais */}
        <div className="flex items-center gap-6 text-sm text-white/40 font-light">
          <button 
            onClick={() => openModal('termos')}
            className="hover:text-[#FF6A00] transition-colors duration-300"
          >
            Termos de Uso
          </button>
          <button 
            onClick={() => openModal('privacidade')}
            className="hover:text-[#FF6A00] transition-colors duration-300"
          >
            Políticas de Privacidade
          </button>
        </div>
      </div>

      {/* Modal Glassmorphism Minimalista */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Overlay escuro com Blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={closeModal}
          />

          {/* Container do Modal */}
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#080808] border border-white/10 rounded-2xl shadow-[0_0_100px_rgba(255,106,0,0.15)] flex flex-col overflow-hidden animate-[modal-slide-up_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {modalType === 'termos' ? 'Termos de Uso' : 'Políticas de Privacidade'}
              </h3>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo do Modal (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto text-white/50 font-light text-sm md:text-base leading-relaxed space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              
              {modalType === 'termos' ? (
                <>
                  <p>Estes Termos de Uso regulam a utilização do site e serviços da Soul Design. Ao acessar nosso site, você concorda expressamente em cumprir e ser regido por estes termos.</p>
                  
                  <h4 className="text-white/80 font-medium text-base mt-6">1. Propriedade Intelectual</h4>
                  <p>Todo o conteúdo presente neste site — incluindo, mas não se limitando a textos, gráficos, logotipos, ícones, imagens, clipes de áudio e software — é propriedade exclusiva da Soul Design e está protegido por leis internacionais de direitos autorais.</p>
                  
                  <h4 className="text-white/80 font-medium text-base mt-6">2. Limitação de Responsabilidade</h4>
                  <p>A Soul Design não se responsabiliza por danos diretos, indiretos, acidentais ou consequentes resultantes da utilização de nossos serviços ou da incapacidade de uso do nosso site.</p>
                  
                  <h4 className="text-white/80 font-medium text-base mt-6">3. Modificações dos Termos</h4>
                  <p>Reservamo-nos o direito de alterar, modificar ou atualizar estes Termos de Uso a qualquer momento, sem aviso prévio. O uso contínuo do site após tais alterações constitui sua aceitação formal dos novos termos estabelecidos.</p>
                  
                  <p className="mt-8 pt-6 border-t border-white/5 text-xs text-white/30">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                </>
              ) : (
                <>
                  <p>A confidencialidade e segurança dos dados dos nossos clientes são prioridades absolutas na Soul Design. Esta Política de Privacidade descreve as práticas que adotamos em relação à coleta e uso de dados.</p>
                  
                  <h4 className="text-white/80 font-medium text-base mt-6">1. Coleta e Uso de Informações</h4>
                  <p>Coletamos informações voluntariamente fornecidas por você através dos nossos formulários de contato (nome, e-mail, telefone). Esses dados são utilizados única e exclusivamente para a elaboração de propostas comerciais e comunicação direta com você.</p>
                  
                  <h4 className="text-white/80 font-medium text-base mt-6">2. Proteção de Dados</h4>
                  <p>Nós não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros sob nenhuma circunstância, exceto quando estritamente necessário para cumprir exigências legais.</p>
                  
                  <h4 className="text-white/80 font-medium text-base mt-6">3. Cookies e Tecnologias de Rastreamento</h4>
                  <p>O nosso site pode utilizar "cookies" para aprimorar a experiência do usuário, coletando dados anônimos de tráfego e comportamento (via Google Analytics/Pixel). Você pode optar por desativar os cookies diretamente nas configurações do seu navegador de internet.</p>
                  
                  <p className="mt-8 pt-6 border-t border-white/5 text-xs text-white/30">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                </>
              )}
              
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;
