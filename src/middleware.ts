import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return `${ip}-${request.nextUrl.pathname}`;
}

function isRateLimited(key: string, maxRequests = 100, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (record.count >= maxRequests) {
    return true;
  }
  
  record.count++;
  return false;
}

// Simple token validation for Edge Runtime
function isValidToken(token: string): boolean {
  if (!token) return false;
  
  try {
    // Simple token format validation
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode payload (basic validation)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Rate limiting for API routes
  if (path.startsWith('/api/')) {
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }
  
  // Admin route protection
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      if (!isValidToken(token)) {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Invalid admin token:', error);
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
      redirectResponse.cookies.delete('admin-token');
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
