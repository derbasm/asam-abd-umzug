'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';
import DashboardCharts from '@/components/DashboardCharts';

interface DashboardStats {
  totalVisitors: number;
  totalContacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitors: 0,
    totalContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats');
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    }
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/dashboard-stats');
      if (response.ok) {
        const data = await response.json();
        // Calculate today's stats from the chart data
        const today = new Date().toISOString().split('T')[0];
        const todayVisitorData = data.visitors.find((item: any) => item.date === today);
        const todayContactData = data.contacts.find((item: any) => item.date === today);
        
        setStats({
          totalVisitors: data.totalVisitors || 0,
          totalContacts: data.totalContacts || 0,
        });
      } else {
        console.error('Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Alle Besucher
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalVisitors}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📧</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Alle Kontakte
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalContacts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Besucherdaten & Kontaktanfragen über Zeit
            </h2>
            <DashboardCharts />
          </div>
        </div>
      </div>
    </div>
  );
}