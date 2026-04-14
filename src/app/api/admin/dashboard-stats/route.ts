import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { subDays, format, startOfDay, endOfDay } from 'date-fns';
import { getAdminFromRequest } from '@/lib/auth';

// Force dynamic rendering: this route depends on request headers/cookies and DB access
export const dynamic = 'force-dynamic';

const ALLOWED_RANGES = new Set(['1d', '7d', '30d', '365d']);

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const requestedRange = searchParams.get('range') || '30d';
    const range = ALLOWED_RANGES.has(requestedRange) ? requestedRange : '30d';
    
    // Calculate date range based on time period
    let days: number;
    let groupBy: string;
    let dateFormat: string;
    
    switch(range) {
      case '1d':
        days = 1;
        groupBy = 'HOUR';
        dateFormat = 'yyyy-MM-dd HH:00:00';
        break;
      case '7d':
        days = 7;
        groupBy = 'DATE';
        dateFormat = 'yyyy-MM-dd';
        break;
      case '30d':
        days = 30;
        groupBy = 'DATE';
        dateFormat = 'yyyy-MM-dd';
        break;
      case '365d':
        days = 365;
        groupBy = 'MONTH';
        dateFormat = 'yyyy-MM-01';
        break;
      default:
        days = 30;
        groupBy = 'DATE';
        dateFormat = 'yyyy-MM-dd';
    }
    
    const endDate = endOfDay(new Date());
    const startDate = range === '1d' ? startOfDay(new Date()) : startOfDay(subDays(endDate, days));

        // Get visitor counts based on time range
    let visitorStats: Array<{ date: string; count: bigint }>;
    let contactStats: Array<{ date: string; count: bigint }>;
    
    if (range === '1d') {
      visitorStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          TO_CHAR(DATE_TRUNC('hour', first_visit), 'YYYY-MM-DD HH24:00:00') as date,
          COUNT(DISTINCT id)::bigint as count
        FROM visitors 
        WHERE first_visit >= ${startDate} AND first_visit <= ${endDate}
        GROUP BY DATE_TRUNC('hour', first_visit)
        ORDER BY date
      `;
      contactStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          TO_CHAR(DATE_TRUNC('hour', created_at), 'YYYY-MM-DD HH24:00:00') as date,
          COUNT(*)::bigint as count
        FROM contacts 
        WHERE created_at >= ${startDate} AND created_at <= ${endDate}
        GROUP BY DATE_TRUNC('hour', created_at)
        ORDER BY date
      `;
    } else if (range === '365d') {
      visitorStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          TO_CHAR(DATE_TRUNC('month', first_visit), 'YYYY-MM-01') as date,
          COUNT(DISTINCT id)::bigint as count
        FROM visitors 
        WHERE first_visit >= ${startDate} AND first_visit <= ${endDate}
        GROUP BY DATE_TRUNC('month', first_visit)
        ORDER BY date
      `;
      contactStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM-01') as date,
          COUNT(*)::bigint as count
        FROM contacts 
        WHERE created_at >= ${startDate} AND created_at <= ${endDate}
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY date
      `;
    } else {
      visitorStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          DATE(first_visit) as date,
          COUNT(DISTINCT id)::bigint as count
        FROM visitors 
        WHERE first_visit >= ${startDate} AND first_visit <= ${endDate}
        GROUP BY DATE(first_visit)
        ORDER BY date
      `;
      contactStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          DATE(created_at) as date,
          COUNT(*)::bigint as count
        FROM contacts 
        WHERE created_at >= ${startDate} AND created_at <= ${endDate}
        GROUP BY DATE(created_at)
        ORDER BY date
      `;
    }

    // Get total counts
    const totalVisitors = await prisma.visitor.count();
    const totalContacts = await prisma.contact.count();

    // Create complete time range array based on period
    const timeArray = [];
    
    if (range === '1d') {
      // 24 hours for today
      for (let i = 0; i < 24; i++) {
        const hour = new Date();
        hour.setHours(i, 0, 0, 0);
        timeArray.push(format(hour, 'yyyy-MM-dd HH:00:00'));
      }
    } else if (range === '7d') {
      // 7 days
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        timeArray.push(format(date, 'yyyy-MM-dd'));
      }
    } else if (range === '30d') {
      // 30 days
      for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        timeArray.push(format(date, 'yyyy-MM-dd'));
      }
    } else if (range === '365d') {
      // 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        timeArray.push(format(date, 'yyyy-MM-01'));
      }
    }

    // Fill in missing dates/times with 0 counts
    const visitors = timeArray.map(time => {
      const found = visitorStats.find(stat => stat.date === time);
      return {
        date: time,
        count: found ? Number(found.count) : 0
      };
    });

    const contacts = timeArray.map(time => {
      const found = contactStats.find(stat => stat.date === time);
      return {
        date: time,
        count: found ? Number(found.count) : 0
      };
    });

    return NextResponse.json({
      visitors,
      contacts,
      totalVisitors,
      totalContacts,
      dateRange: {
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd'),
        days
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
