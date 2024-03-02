import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const res = NextResponse.next();
  //get token from request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  if (token && pathname.startsWith("/user")) {
    return res;
  }
  if (!token && pathname.startsWith("/booking")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token && token.role === "admin" && pathname.startsWith("/admin")) {
    return res;
  }
  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/user"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register", "/user/:path*", "/booking"],
};
