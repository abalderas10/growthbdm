'use client';

import { useEffect } from 'react';
import Cal from '@calcom/embed-react';

// Constantes para Cal.com
export const CAL_LINKS = {
  CONSULTA_ESTRATEGICA: 'alberto-balderas/30min'
};

// Tipos para los componentes Cal.com
interface CalUIConfig {
  hideEventTypeDetails?: boolean;
  hideBranding?: boolean;
  layout?: string;
}

interface CalOptions {
  calLink: string;
  config?: CalUIConfig;
  style?: React.CSSProperties;
}

// Componente Cal.com Inline
export function CalInline({ calLink, config, style }: CalOptions) {
  return (
    <Cal
      calLink={calLink}
      style={style || { width: '100%', height: '600px', overflow: 'hidden' }}
      config={{
        layout: config?.layout || 'month_view',
        hideEventTypeDetails: config?.hideEventTypeDetails ? 'true' : 'false',
        hideBranding: config?.hideBranding ? 'true' : 'false',
      }}
    />
  );
}

// Hook para cargar el script de Cal.com
export function useCalComScript() {
  useEffect(() => {
    // Solo carga el script si no existe ya
    if (!document.querySelector('script[src="https://cal.com/embed.js"]')) {
      console.log('Loading Cal.com script...');
      const script = document.createElement('script');
      script.src = 'https://cal.com/embed.js';
      script.async = true;
      script.defer = true;
      script.id = 'cal-com-script';
      script.onload = () => console.log('Cal.com script loaded successfully');
      script.onerror = (error) => console.error('Failed to load Cal.com script:', error);
      document.body.appendChild(script);
      
      return () => {
        const scriptElement = document.getElementById('cal-com-script');
        if (scriptElement) document.body.removeChild(scriptElement);
      };
    }
  }, []);
}

// Función para abrir Cal.com como popup
export function openCalPopup(calLink: string, config?: CalUIConfig): boolean {
  try {
    // Asegurarse de que estamos en el cliente
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Construir la URL completa
    const fullCalLink = !calLink.startsWith('https://') 
      ? `https://cal.com/${calLink}`
      : calLink;
    
    // Abrir en una nueva ventana con dimensiones de popup
    const width = 1000;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      fullCalLink,
      'CalendarPopup',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
    );
    
    return true;
  } catch (error) {
    console.error('Error opening Cal.com popup:', error);
    return false;
  }
}
