import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { startOfDay, startOfMonth, startOfYear, endOfDay, endOfMonth, endOfYear, subDays, subMonths, subYears } from 'date-fns';

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
    const period = searchParams.get('period') || 'day'; // 'day', 'month', 'year'
    const days = parseInt(searchParams.get('days') || '30');

    let startDate: Date;
    let endDate: Date;
    let groupBy: string;

    const now = new Date();

    switch (period) {
      case 'day':
        startDate = subDays(now, days);
        endDate = now;
        groupBy = 'DATE(created_at)';
        break;
      case 'month':
        startDate = subMonths(now, 12);
        endDate = now;
        groupBy = 'DATE_TRUNC(\'month\', created_at)';
        break;
      case 'year':
        startDate = subYears(now, 5);
        endDate = now;
        groupBy = 'DATE_TRUNC(\'year\', created_at)';
        break;
      default:
        startDate = subDays(now, 30);
        endDate = now;
        groupBy = 'DATE(created_at)';
    }

    // Kontaktanfragen über Zeit
    const contactStats = await prisma.$queryRaw`
      SELECT 
        ${groupBy} as date,
        COUNT(*)::int as count
      FROM contacts 
      WHERE created_at >= ${startDate} AND created_at <= ${endDate}
      GROUP BY ${groupBy}
      ORDER BY date ASC
    ` as Array<{ date: Date; count: number }>;

    // Besucher über Zeit
    const visitorStats = await prisma.$queryRaw`
      SELECT 
        ${groupBy} as date,
        COUNT(DISTINCT ip)::int as unique_visitors,
        SUM(visits)::int as total_visits
      FROM visitors 
      WHERE created_at >= ${startDate} AND created_at <= ${endDate}
      GROUP BY ${groupBy}
      ORDER BY date ASC
    ` as Array<{ date: Date; unique_visitors: number; total_visits: number }>;

    // Gesamtstatistiken
    const totalContacts = await prisma.contact.count();
    const totalVisitors = await prisma.visitor.count();
    const newContactsToday = await prisma.contact.count({
      where: {
        createdAt: {
          gte: startOfDay(now),
          lte: endOfDay(now)
        }
      }
    });
    const newVisitorsToday = await prisma.visitor.count({
      where: {
        createdAt: {
          gte: startOfDay(now),
          lte: endOfDay(now)
        }
      }
    });

    // Kontakt Status Verteilung
    const contactStatusStats = await prisma.contact.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    return NextResponse.json({
      period,
      contactStats,
      visitorStats,
      totals: {
        contacts: totalContacts,
        visitors: totalVisitors,
        newContactsToday,
        newVisitorsToday
      },
      contactStatusStats
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ])
    ]);

    const locationStats = locations.reduce((acc: { [key: string]: number }, curr: any) => {
      if (curr._id) {
        acc[curr._id] = curr.count;
      }
      return acc;
    }, {});

    return NextResponse.json({
      visitors: {
        total,
        today,
        thisWeek,
        thisMonth,
      },
      locations: locationStats,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 