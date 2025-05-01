import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;

  const customerId = cookies.get("customerId")?.value;
  const token = cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;
  const isLoggedIn = Boolean(customerId && token);

  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/otp",
    "/input-biodata",
    "/input-email-otp",
    "/input-address",
    "/input-confirmation",
    "/",
    "/dashboard"
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/shop");

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|webp|ico|json)$).*)"
  ]
};
