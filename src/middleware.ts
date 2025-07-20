import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Nur Admin-Routen prüfen, aber erstmal ohne Token-Verifikation
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      console.log('No admin token found for path:', path);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    console.log('Admin token found for path:', path);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Nur Admin-Routen überwachen
    '/admin/:path*'
  ],
}
