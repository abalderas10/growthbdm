import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Añade aquí cualquier lógica personalizada que necesites
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/dashboard/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
