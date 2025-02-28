import { supabase } from '../src/lib/supabase';

async function getStats() {
  // Get count of registered users
  const { count: userCount, error: userError } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  if (userError) {
    console.error('Error getting user count:', userError);
    return;
  }

  // Get count of scheduled meetings
  const { count: meetingCount, error: meetingError } = await supabase
    .from('meetings')
    .select('*', { count: 'exact', head: true });

  if (meetingError) {
    console.error('Error getting meeting count:', meetingError);
    return;
  }

  console.log('Estadísticas:');
  console.log('-------------');
  console.log(`Usuarios registrados: ${userCount}`);
  console.log(`Reuniones agendadas: ${meetingCount}`);
}

getStats();
