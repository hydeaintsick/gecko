import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("gecko_token")?.value;
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith("/app") ||
    pathname.startsWith("/edit") ||
    pathname.startsWith("/add");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Non connecté et tente d'aller sur une page protégée
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Connecté et tente d'aller sur login ou signup
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  return NextResponse.next();
}
