import { NextRequest, NextResponse } from "next/server"

const allowedOrigins = ['https://pintu-sewa-one.vercel.app']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api")) {
    const origin = request.headers.get("origin") ?? ""
    const isAllowedOrigin = allowedOrigins.includes(origin)
    const isPreflight = request.method === "OPTIONS"

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsOptions,
        Vary: "Origin",
      }
      return new NextResponse(null, { status: 204, headers: preflightHeaders })
    }

    const response = NextResponse.next()
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin)
      response.headers.set("Vary", "Origin")
    }
    Object.entries(corsOptions).forEach(([k, v]) => {
      response.headers.set(k, v)
    })
    return response
  }

  const cookies = request.cookies
  const customerId = cookies.get("customerId")?.value
  const token = cookies.get("token")?.value
  const isLoggedIn = Boolean(customerId && token)

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
    "/dashboard",
  ]

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/dev")

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|webp|ico|json)$).*)'
  ]
}
