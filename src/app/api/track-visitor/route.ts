import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Visitor tracking relies on request headers (IP, user-agent) and DB — run dynamically
export const dynamic = 'force-dynamic';

// Rate limiting for visitor tracking (max 10 requests per IP per 10 minutes)
const TRACK_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const TRACK_RATE_LIMIT_MAX = 10;
const trackRateLimitStore = new Map<string, { count: number; resetAt: number }>();

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
    const ip = getClientIP(request);

    // Rate limiting check
    const now = Date.now();
    const existing = trackRateLimitStore.get(ip);
    if (existing && now <= existing.resetAt) {
      if (existing.count >= TRACK_RATE_LIMIT_MAX) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      existing.count += 1;
    } else {
      trackRateLimitStore.set(ip, { count: 1, resetAt: now + TRACK_RATE_LIMIT_WINDOW_MS });
    }

    const { path } = await request.json();
    
    const userAgent = request.headers.get('user-agent') || '';
    const currentTime = new Date();
    
    // Get or create visitor
    let visitor = await prisma.visitor.findFirst({
      where: { ip }
    });
    
    if (visitor) {
      // Check if last visit was within last 30 minutes (prevent spam)
      const timeDiff = currentTime.getTime() - visitor.lastVisit.getTime();
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (timeDiff < thirtyMinutes) {
        // Too recent, don't increment but update lastVisit
        visitor = await prisma.visitor.update({
          where: { id: visitor.id },
          data: {
            lastVisit: currentTime,
            userAgent
          }
        });
      } else {
        // Update existing visitor with visit increment
        visitor = await prisma.visitor.update({
          where: { id: visitor.id },
          data: {
            lastVisit: currentTime,
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
          gte: new Date(currentTime.getTime() - 5 * 60 * 1000) // Last 5 minutes
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
