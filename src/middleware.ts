import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar rutas protegidas
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Validación de API routes
    return NextResponse.next();
  }

  // Validación de rutas de networking
  if (request.nextUrl.pathname.startsWith('/networking/')) {
    return NextResponse.next();
  }

  // Validación de rutas del blog
  if (request.nextUrl.pathname.startsWith('/blog/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/networking/:path*',
    '/blog/:path*',
  ],
};
