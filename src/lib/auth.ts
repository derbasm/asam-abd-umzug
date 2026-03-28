import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

function getJwtSecret(): string | null {
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (!secret || secret.trim().length < 32) {
    return null;
  }

  return secret;
}

export interface AdminUser {
  id: number;
  username: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AdminUser): string {
  const jwtSecret = getJwtSecret();
  if (!jwtSecret) {
    throw new Error('NEXTAUTH_SECRET (or AUTH_SECRET) must be set with at least 32 characters');
  }

  return jwt.sign(
    { id: user.id, username: user.username },
    jwtSecret,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return null;
    }

    const decoded = jwt.verify(token, jwtSecret) as AdminUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getAdminFromRequest(request: NextRequest): Promise<AdminUser | null> {
  const authHeader = request.headers.get('authorization');
  let token: string | undefined;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    token = request.cookies.get('admin-token')?.value;
  }

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireAuth() {
  return async (request: NextRequest) => {
    const admin = await getAdminFromRequest(request);
    
    if (!admin) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer'
        }
      });
    }
    
    return admin;
  };
}
