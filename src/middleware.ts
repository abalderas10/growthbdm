import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // /admin solo es accesible directamente — no aparece en nav ni sitemap
  // La autenticación se maneja en la propia página con contraseña
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/networking/')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/blog/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/networking/:path*',
    '/blog/:path*',
  ],
};
