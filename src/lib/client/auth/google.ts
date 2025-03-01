'use client';

import { signIn, useSession } from 'next-auth/react';

export const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

export const useGoogleAuth = () => {
  const { data: session, status } = useSession();
  
  const initiateGoogleAuth = async () => {
    return signIn('google', {
      callbackUrl: '/dashboard',
      scope: SCOPES.join(' ')
    });
  };

  return {
    session,
    status,
    initiateGoogleAuth
  };
};
