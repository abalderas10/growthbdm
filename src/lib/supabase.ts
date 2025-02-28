import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

export type Meeting = {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  attendee_email: string;
  attendee_name: string;
  meeting_type: string;
  google_event_id: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
};
