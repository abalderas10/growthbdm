import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token?.email?.endsWith("@growthbdm.com") ?? false;
    },
  },
});

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

  return authMiddleware(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
