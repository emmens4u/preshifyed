import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Add your middleware here. This function will be called before any of your API routes are called.

  const token = req.cookies.get("token")?.value;
  console.log("Token: ", token);

  const guestRoutes = ["/login", "/register"];
  const authRoutes = ["/dashboard"];

  if (token && guestRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};
