import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request, { params }) {
  const res = NextResponse.next();
  //get token from request
  let id = null;
  const originalUrl = request.url;
  if (originalUrl.split("/").includes("user")) {
    id = originalUrl.split("/")[4];
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  const { searchParams } = new URL(request.url);
  console.log(id, "id");
  console.log(token.id, "token");
  if (
    (token && token.role === "admin" && pathname.startsWith("/user")) ||
    token.id !== id
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && pathname.startsWith("/booking")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token && token.role === "admin" && pathname.startsWith("/booking")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    token &&
    pathname.startsWith("/booking") &&
    (!searchParams.get("from") ||
      !searchParams.get("to") ||
      !searchParams.get("room") ||
      !searchParams.get("roomName") ||
      !searchParams.get("allRoomId") ||
      !searchParams.get("userId") ||
      !searchParams.get("roomPrice"))
  ) {
    return NextResponse.redirect(new URL("/room_detail", request.url));
  }
  if (token && token.role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !token &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/user") ||
      pathname.startsWith("/booking"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register", "/user/:path*", "/booking"],
};
