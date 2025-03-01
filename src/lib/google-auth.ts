'use client';

import { OAuth2Client } from 'google-auth-library';

// Solo crear el cliente si estamos en el servidor
const createOAuth2Client = () => {
  if (typeof window === 'undefined') {
    return new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }
  return null;
};

export const oauth2Client = createOAuth2Client();

// Scopes necesarios para Google Calendar
export const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

// Función para generar URL de autorización
export function getAuthUrl() {
  if (!oauth2Client) return '';
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
}

// Función para obtener y guardar tokens
export async function getTokens(code: string) {
  if (!oauth2Client) return null;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Función para verificar si el token es válido
export async function verifyToken(token: string) {
  if (!oauth2Client) return false;
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}
