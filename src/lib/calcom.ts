/**
 * Servicio para interactuar con la API de Cal.com
 * Documentación: https://cal.com/docs/developing/guides/api/how-to-setup-api-in-a-local-instance
 */

const CALCOM_API_KEY = process.env.CALCOM_API_KEY;
const CALCOM_API_URL = 'https://api.cal.com/v1';

/**
 * Obtiene los eventos disponibles para el usuario
 */
export async function getAvailableEvents() {
  try {
    const response = await fetch(`${CALCOM_API_URL}/event-types`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CALCOM_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener eventos: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener eventos de Cal.com:', error);
    return { eventTypes: [] };
  }
}

/**
 * Obtiene las horas disponibles para un evento específico
 */
export async function getAvailability(eventTypeId: string, startTime: string, endTime: string) {
  try {
    const response = await fetch(`${CALCOM_API_URL}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CALCOM_API_KEY}`
      },
      body: JSON.stringify({
        eventTypeId,
        startTime,
        endTime,
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener disponibilidad: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener disponibilidad de Cal.com:', error);
    return { slots: [] };
  }
}

/**
 * Crea una reserva en el calendario
 */
export async function createBooking(eventTypeId: string, start: string, end: string, name: string, email: string, notes?: string) {
  try {
    const response = await fetch(`${CALCOM_API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CALCOM_API_KEY}`
      },
      body: JSON.stringify({
        eventTypeId,
        start,
        end,
        name,
        email,
        notes,
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error al crear reserva: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al crear reserva en Cal.com:', error);
    throw error;
  }
}

/**
 * Función para inicializar el widget de Cal.com
 * Esta función es llamada desde el cliente
 */
export function initCalWidget() {
  return {
    openCalModal: (eventSlug: string = 'consulta-estrategica') => {
      // @ts-ignore - Cal está disponible globalmente después de cargar el script
      if (typeof window !== 'undefined' && window.Cal) {
        // @ts-ignore
        window.Cal.ui.openModal({
          calLink: `abalderas10/${eventSlug}`,
          config: {
            layout: 'month_view',
            hideEventTypeDetails: false,
            hideBranding: true,
          }
        });
      } else {
        console.error('Cal.com script not loaded');
        // Fallback - abrir en una nueva pestaña si el script no cargó
        window.open(`https://app.cal.com/abalderas10/${eventSlug}`, '_blank');
      }
    }
  };
}
