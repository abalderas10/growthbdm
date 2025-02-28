import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith('/dashboard/login');

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return null;
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/dashboard/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  // Verificar el email solo si estamos autenticados
  if (isAuth && token.email) {
    const isAllowedEmail = token.email.endsWith('@growthbdm.com') || 
      ['alberto.balderas@growthbdm.com', 'adriana.vargas@growthbdm.com'].includes(token.email);

    if (!isAllowedEmail) {
      return NextResponse.redirect(new URL('/dashboard/error', req.url));
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
};
