import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { logger } from '@/lib/logger';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  try {
    const admin = await checkAuth(request);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    
    const skip = (page - 1) * limit;
    
    const [visitors, total] = await Promise.all([
      prisma.visitor.findMany({
        orderBy: { lastVisit: 'desc' },
        skip,
        take: limit,
        include: {
          pages: {
            orderBy: { timestamp: 'desc' },
            take: 5
          }
        }
      }),
      prisma.visitor.count()
    ]);

    return NextResponse.json({
      visitors,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    logger.error('Visitors API error', { error: error instanceof Error ? error.message : error });
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
