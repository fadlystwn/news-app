import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value

  const protectedPages = ['/news']

  const isProtectedPage = protectedPages.some(page => request.nextUrl.pathname.startsWith(page))

  if (isProtectedPage && !currentUser) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
