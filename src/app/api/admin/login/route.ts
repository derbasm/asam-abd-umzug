import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validation';

// Route depends on request headers for rate limiting and IP detection — force dynamic
export const dynamic = 'force-dynamic';

const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_RATE_LIMIT_MAX_ATTEMPTS = 10;

const loginRateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

function registerLoginAttempt(key: string): boolean {
  const now = Date.now();
  const existing = loginRateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    loginRateLimitStore.set(key, {
      count: 1,
      resetAt: now + LOGIN_RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= LOGIN_RATE_LIMIT_MAX_ATTEMPTS) {
    return true;
  }

  existing.count += 1;
  return false;
}

function clearLoginAttempts(key: string): void {
  loginRateLimitStore.delete(key);
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = adminLoginSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Benutzername und Passwort sind erforderlich' },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;
    const clientIP = getClientIP(request);
    const rateLimitKey = `${clientIP}:${username}`;

    if (registerLoginAttempt(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Zu viele Login-Versuche. Bitte versuchen Sie es in einigen Minuten erneut.' },
        { status: 429 }
      );
    }

    // Admin User aus der Datenbank holen (case-insensitive)
    const adminUser = await prisma.adminUser.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
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

    clearLoginAttempts(rateLimitKey);

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
