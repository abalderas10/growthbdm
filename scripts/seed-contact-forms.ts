import { supabase } from '../src/lib/supabase';

const seedData = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    company: 'Constructora XYZ',
    message: 'Me interesa conocer más sobre las oportunidades de inversión en el sector inmobiliario.',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
  },
  {
    name: 'María González',
    email: 'maria.gonzalez@desarrollo.mx',
    company: 'Desarrollos Inmobiliarios MG',
    message: 'Quisiera agendar una reunión para discutir posibles alianzas estratégicas.',
    status: 'contacted',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
  },
  {
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@inversionista.com',
    company: 'Inversiones CR',
    message: 'Busco oportunidades de inversión en proyectos residenciales.',
    status: 'completed',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana atrás
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@arquitectos.com',
    company: 'Arquitectos & Asociados',
    message: 'Necesito información sobre los servicios de consultoría en desarrollo inmobiliario.',
    status: 'pending',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
  },
  {
    name: 'Roberto Silva',
    email: 'roberto.silva@constructora.com',
    company: 'Constructora Silva',
    message: 'Interesado en formar parte de la red de aliados estratégicos.',
    status: 'contacted',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 días atrás
  },
];

async function seedContactForms() {
  try {
    console.log('Insertando datos de prueba en contact_forms...');
    
    const { data, error } = await supabase
      .from('contact_forms')
      .insert(seedData);

    if (error) {
      console.error('Error al insertar datos:', error);
      return;
    }

    console.log('Datos insertados exitosamente');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

// Ejecutar sin requerir confirmación
seedContactForms();
