import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

function getClientIP(request: NextRequest): string {
  // Try different headers for IP detection
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    
    // Get or create visitor
    let visitor = await prisma.visitor.findFirst({
      where: { ip }
    });
    
    if (visitor) {
      // Update existing visitor
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          lastVisit: new Date(),
          visits: { increment: 1 },
          userAgent
        }
      });
    } else {
      // Create new visitor
      visitor = await prisma.visitor.create({
        data: {
          ip,
          userAgent,
          firstVisit: new Date(),
          lastVisit: new Date(),
          visits: 1
        }
      });
    }
    
    // Track page visit
    await prisma.visitorPage.create({
      data: {
        visitorId: visitor.id,
        path: path || '/'
      }
    });
    
    return NextResponse.json({ success: true, visitorId: visitor.id });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
