import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('Test login attempt:', username);
    
    // Get admin user
    const adminUser = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    console.log('Admin user found:', !!adminUser);
    
    if (!adminUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Test password
    const isValid = await verifyPassword(password, adminUser.passwordHash);
    console.log('Password valid:', isValid);
    
    return NextResponse.json({
      username: adminUser.username,
      passwordValid: isValid,
      hash: adminUser.passwordHash
    });
    
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
