import { Session } from 'next-auth';

export async function getGoogleToken(session: Session | null): Promise<string | null> {
  if (!session) return null;

  try {
    // @ts-ignore - el token de acceso está en el token de sesión
    let accessToken = session.accessToken;

    // Si no hay token o está expirado, intentar refrescarlo
    if (!accessToken) {
      // @ts-ignore - el refreshToken está en el token de sesión
      const refreshToken = session.refreshToken;
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_ID || '',
          client_secret: process.env.GOOGLE_SECRET || '',
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      accessToken = data.access_token;
    }

    return accessToken;
  } catch (error) {
    console.error('Error getting Google token:', error);
    return null;
  }
}
