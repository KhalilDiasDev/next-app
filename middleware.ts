import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Allow NextAuth API routes to bypass middleware
  if (path.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Paths that are accessible to the public
  const publicPaths = ["/", "/auth/signin", "/auth/error"];
  const isPublicPath = publicPaths.includes(path);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if trying to access a protected route without a token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Redirect to dashboard if already logged in and trying to access login page
  if (isPublicPath && token && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Specify the paths that the middleware should run on
export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};