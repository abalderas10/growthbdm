'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function getCalendarToken() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  
  // @ts-ignore - el token de acceso está en el token de sesión
  return session.accessToken;
}

export async function listCalendarEvents() {
  const token = await getCalendarToken();
  if (!token) return null;

  try {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching calendar events');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return null;
  }
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
        },
        end: {
          dateTime: endDateTime,
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

export async function deleteCalendarEvent(eventId: string) {
  const token = await getCalendarToken();
  if (!token) throw new Error('No token available');

  try {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting calendar event');
    }
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw error;
  }
}
