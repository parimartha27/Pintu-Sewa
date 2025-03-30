import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const customSession = request.cookies.get("custom_session")?.value;

  const isLoggedIn = Boolean(token || customSession);
  const pathname = request.nextUrl.pathname;

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔒 **Cegah user yang belum login mengakses halaman yang dilindungi**
  const protectedRoutes = [
    "/chat", 
    "/profile", 
    "/order-history", 
    "/profile/edit-profile", 
    "/profile/edit-address", 
    "/profile/edit-password", 
    "/cart", 
    "/cart/checkout"
  ];

  if (!isLoggedIn && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/login", "/chat", "/profile", "/order-history", 
//             "/profile/edit-profile", "/profile/edit-address", 
//             "/profile/edit-password", "/cart", "/cart/checkout"],
// };
