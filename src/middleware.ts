import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('rcf-enterprise-session')?.value
  const { pathname } = request.nextUrl

  const isLoginPage = pathname === '/portal/login' || pathname === '/admin/login'
  const isAuthRoute = pathname.startsWith('/api/auth')

  if (isAuthRoute) return NextResponse.next()

  // 1. Handle Admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const decoded = verifyToken(token)
    if (!decoded || !decoded.role.includes('ADMIN')) {
      return NextResponse.redirect(new URL('/portal/login', request.url))
    }

    if (isLoginPage && token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // 2. Handle Portal routes
  if (pathname.startsWith('/portal')) {
    if (!token) {
      return NextResponse.redirect(new URL('/portal/login', request.url))
    }

    if (isLoginPage && token) {
      return NextResponse.redirect(new URL('/portal', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
}
