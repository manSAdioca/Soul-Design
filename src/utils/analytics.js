export const trackConversion = (buttonName) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'conversion_click',
    'button_name': buttonName
  });
};
