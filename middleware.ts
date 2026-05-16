import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Protect /admin/* — must be authenticated AND have ADMIN role
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    // Protect /dashboard/* — must be authenticated
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        const { pathname } = req.nextUrl
        // Let the middleware function handle auth logic for protected routes
        if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
          return true // Always run the middleware function for these paths
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}

