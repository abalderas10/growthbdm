-- Insertar tipo de reunión predeterminado
INSERT INTO meeting_types (name, duration, description, color, is_active)
VALUES 
  ('Consultoría Estratégica', 30, 'Sesión personalizada para analizar oportunidades de crecimiento y desarrollo de negocio', '#3B82F6', true),
  ('Presentación de Servicios', 45, 'Conoce nuestros servicios y cómo podemos ayudarte a potenciar tu negocio', '#2563EB', true),
  ('Reunión de Networking', 30, 'Conecta con otros profesionales del sector y explora sinergias', '#1D4ED8', true);

-- Insertar slots disponibles predeterminados (Lunes a Viernes, 9 AM a 5 PM)
INSERT INTO available_slots (day_of_week, start_time, end_time, meeting_type_id)
SELECT 
  d.day_of_week,
  t.start_time,
  t.end_time,
  mt.id
FROM 
  (SELECT unnest(ARRAY[1,2,3,4,5]) as day_of_week) d
CROSS JOIN
  (SELECT '09:00'::time as start_time, '09:30'::time as end_time
   UNION ALL SELECT '10:00'::time, '10:30'::time
   UNION ALL SELECT '11:00'::time, '11:30'::time
   UNION ALL SELECT '12:00'::time, '12:30'::time
   UNION ALL SELECT '13:00'::time, '13:30'::time
   UNION ALL SELECT '14:00'::time, '14:30'::time
   UNION ALL SELECT '15:00'::time, '15:30'::time
   UNION ALL SELECT '16:00'::time, '16:30'::time
   UNION ALL SELECT '17:00'::time, '17:30'::time) t
CROSS JOIN
  meeting_types mt;
