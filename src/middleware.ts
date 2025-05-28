import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });

    if (!token) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
  }

  // Track visitors (except for admin routes and API routes)
  if (!path.startsWith('/admin') && !path.startsWith('/api')) {
    try {
      await fetch('/api/track-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          userAgent: request.headers.get('user-agent'),
          ip: request.ip || request.headers.get('x-forwarded-for'),
        }),
      });
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 