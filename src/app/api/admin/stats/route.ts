import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import { Visitor } from '@/models/Visitor';
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now);
    const monthStart = startOfMonth(now);

    const [total, today, thisWeek, thisMonth, locations] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ lastVisit: { $gte: todayStart } }),
      Visitor.countDocuments({ lastVisit: { $gte: weekStart } }),
      Visitor.countDocuments({ lastVisit: { $gte: monthStart } }),
      Visitor.aggregate([
        {
          $group: {
            _id: '$location.country',
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