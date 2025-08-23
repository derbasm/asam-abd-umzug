import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Erfolgreich abgemeldet' });
  
  // Cookie löschen
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  });

  return response;
}

export async function GET(request: NextRequest) {
  // Für direkte Links - redirect nach logout
  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  
  // Cookie löschen
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  });

  return response;
}
