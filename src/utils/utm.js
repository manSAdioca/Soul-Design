// Captura e armazena os parâmetros UTM da URL na SessionStorage
export const captureUTMs = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utms = {};
  
  // Lista de parâmetros comuns de marketing que queremos capturar
  const paramsToCapture = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'src', // comum no facebook ads
    'gclid', // google ads
    'fbclid' // facebook click id
  ];

  let hasNewUTMs = false;

  paramsToCapture.forEach(param => {
    if (urlParams.has(param)) {
      utms[param] = urlParams.get(param);
      hasNewUTMs = true;
    }
  });

  // Só sobrescreve se a nova URL tiver UTMs (evita perder se o usuário navegar internamente)
  if (hasNewUTMs) {
    sessionStorage.setItem('soul_utms', JSON.stringify(utms));
  }
};

// Retorna as UTMs salvas formatadas para adicionar em textos (WhatsApp/Email)
export const getFormattedUTMs = () => {
  if (typeof window === 'undefined') return '';
  
  const savedUTMs = sessionStorage.getItem('soul_utms');
  if (!savedUTMs) return '';

  try {
    const utms = JSON.parse(savedUTMs);
    const formattedArray = [];
    
    if (utms.utm_source) formattedArray.push(`Origem: ${utms.utm_source}`);
    if (utms.utm_campaign) formattedArray.push(`Campanha: ${utms.utm_campaign}`);
    if (utms.utm_medium) formattedArray.push(`Meio: ${utms.utm_medium}`);
    if (utms.utm_term) formattedArray.push(`Termo: ${utms.utm_term}`);
    if (utms.utm_content) formattedArray.push(`Conteúdo: ${utms.utm_content}`);
    
    if (formattedArray.length > 0) {
      return ` [${formattedArray.join(' | ')}]`;
    }
    return '';
  } catch (e) {
    return '';
  }
};
