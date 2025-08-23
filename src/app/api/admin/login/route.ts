import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Benutzername und Passwort sind erforderlich' },
        { status: 400 }
      );
    }

    // Admin User aus der Datenbank holen
    const adminUser = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }

    // Passwort verifizieren
    const isValid = await verifyPassword(password, adminUser.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }

    // JWT Token generieren
    const token = generateToken({
      id: adminUser.id,
      username: adminUser.username
    });

    // Token als HTTP-Only Cookie setzen
    const response = NextResponse.json({
      message: 'Erfolgreich angemeldet',
      user: {
        id: adminUser.id,
        username: adminUser.username
      }
    });

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 Stunden
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    
    // Specific error handling for database connection issues
    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      return NextResponse.json(
        { error: 'Datenbankverbindung fehlgeschlagen. Bitte versuchen Sie es später erneut.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
