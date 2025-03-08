'use server';

import { google } from 'googleapis';

const calendar = google.calendar('v3');

export async function getCalendarToken() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return auth;
}

export async function listCalendarEvents() {
  const auth = await getCalendarToken();
  if (!auth) return null;

  try {
    const response = await calendar.events.list({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
    });

    if (!response.data.items) {
      throw new Error('Error fetching calendar events');
    }

    return response.data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return null;
  }
}

export async function createCalendarEvent(
  summary: string,
  description: string,
  startTime: string,
  endTime: string,
  attendeeEmail: string
) {
  try {
    const auth = await getCalendarToken();
    if (!auth) throw new Error('No token available');

    const event = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: 'America/Mexico_City',
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Mexico_City',
      },
      attendees: [{ email: attendeeEmail }],
      reminders: {
        useDefault: true,
      },
    };

    const response = await calendar.events.insert({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

export async function getAvailability(startDate: Date, endDate: Date) {
  const auth = await getCalendarToken();
  if (!auth) throw new Error('No token available');

  try {
    const response = await calendar.freebusy.query({
      auth,
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    if (!response.data.calendars) {
      throw new Error('Error getting availability');
    }

    return response.data.calendars[process.env.GOOGLE_CALENDAR_ID].busy || [];
  } catch (error) {
    console.error('Error getting availability:', error);
    throw error;
  }
}

export async function deleteCalendarEvent(eventId: string) {
  const auth = await getCalendarToken();
  if (!auth) throw new Error('No token available');

  try {
    const response = await calendar.events.delete({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
    });

    if (!response.status === 204) {
      throw new Error('Error deleting calendar event');
    }
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw error;
  }
}
