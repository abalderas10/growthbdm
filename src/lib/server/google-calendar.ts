'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function getCalendarToken() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  
  // @ts-ignore - el token de acceso está en el token de sesión
  return session.accessToken;
}

export async function createCalendarEvent({
  summary,
  description,
  startDateTime,
  endDateTime,
  attendeeEmail,
}: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail: string;
}) {
  const token = await getCalendarToken();
  if (!token) throw new Error('No token available');

  try {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: 'America/Mexico_City',
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'America/Mexico_City',
        },
        attendees: [
          { email: attendeeEmail },
        ],
        reminders: {
          useDefault: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating calendar event');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

export async function getAvailability(startDate: Date, endDate: Date) {
  const token = await getCalendarToken();
  if (!token) throw new Error('No token available');

  try {
    const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: 'primary' }],
      }),
    });

    if (!response.ok) {
      throw new Error('Error getting availability');
    }

    const data = await response.json();
    return data.calendars?.primary.busy || [];
  } catch (error) {
    console.error('Error getting availability:', error);
    throw error;
  }
}
