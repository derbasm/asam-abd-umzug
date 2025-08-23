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
    const now = new Date();
    
    // Get or create visitor
    let visitor = await prisma.visitor.findFirst({
      where: { ip }
    });
    
    if (visitor) {
      // Check if last visit was within last 30 minutes (prevent spam)
      const timeDiff = now.getTime() - visitor.lastVisit.getTime();
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (timeDiff < thirtyMinutes) {
        // Too recent, don't increment but update lastVisit
        visitor = await prisma.visitor.update({
          where: { id: visitor.id },
          data: {
            lastVisit: now,
            userAgent
          }
        });
      } else {
        // Update existing visitor with visit increment
        visitor = await prisma.visitor.update({
          where: { id: visitor.id },
          data: {
            lastVisit: now,
            visits: { increment: 1 },
            userAgent
          }
        });
      }
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
    
    // Track page visit - only if path hasn't been visited recently
    const recentPageVisit = await prisma.visitorPage.findFirst({
      where: {
        visitorId: visitor.id,
        path: path || '/',
        timestamp: {
          gte: new Date(now.getTime() - 5 * 60 * 1000) // Last 5 minutes
        }
      }
    });
    
    if (!recentPageVisit) {
      await prisma.visitorPage.create({
        data: {
          visitorId: visitor.id,
          path: path || '/'
        }
      });
    }
    
    return NextResponse.json({ success: true, visitorId: visitor.id });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    
    // Graceful handling for database connection issues
    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      console.warn('Database not available, skipping visitor tracking');
      return NextResponse.json({ success: true, message: 'Database unavailable' }, { status: 200 });
    }
    
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
