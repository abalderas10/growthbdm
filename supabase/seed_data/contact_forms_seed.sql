-- Insertar datos de prueba en contact_forms
INSERT INTO contact_forms (name, email, company, message, status, created_at) VALUES
('Juan Pérez', 'juan.perez@empresa.com', 'Constructora XYZ', 'Me interesa conocer más sobre las oportunidades de inversión en el sector inmobiliario.', 'pending', NOW() - INTERVAL '2 days'),
('María González', 'maria.gonzalez@desarrollo.mx', 'Desarrollos Inmobiliarios MG', 'Quisiera agendar una reunión para discutir posibles alianzas estratégicas.', 'contacted', NOW() - INTERVAL '5 days'),
('Carlos Rodríguez', 'carlos.rodriguez@inversionista.com', 'Inversiones CR', 'Busco oportunidades de inversión en proyectos residenciales.', 'completed', NOW() - INTERVAL '1 week'),
('Ana Martínez', 'ana.martinez@arquitectos.com', 'Arquitectos & Asociados', 'Necesito información sobre los servicios de consultoría en desarrollo inmobiliario.', 'pending', NOW() - INTERVAL '3 days'),
('Roberto Silva', 'roberto.silva@constructora.com', 'Constructora Silva', 'Interesado en formar parte de la red de aliados estratégicos.', 'contacted', NOW() - INTERVAL '4 days');
