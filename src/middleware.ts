import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/auth'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value

  const protectedPages = ['/profile']

  const isProtectedPage = protectedPages.some(page => request.nextUrl.pathname.startsWith(page))

  if (isProtectedPage && !currentUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
  updateSession(request)
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
