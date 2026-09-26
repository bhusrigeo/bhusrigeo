import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of protected portal routes requiring executive 2FA session
  const isProtectedRoute =
    pathname.startsWith("/portal") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/quotations") ||
    pathname.startsWith("/freelancers") ||
    pathname.startsWith("/contracts") ||
    pathname.startsWith("/invoices") ||
    pathname.startsWith("/admin");

  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get("bhusri_session");

    // If session cookie is missing or empty, redirect to 2FA login page
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/portal/:path*",
    "/projects/:path*",
    "/quotations/:path*",
    "/freelancers/:path*",
    "/contracts/:path*",
    "/invoices/:path*",
    "/admin/:path*"
  ]
};
