'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale
);

interface StatsData {
  period: string;
  contactStats: Array<{ date: string; count: number }>;
  visitorStats: Array<{ date: string; unique_visitors: number; total_visits: number }>;
  totals: {
    contacts: number;
    visitors: number;
    newContactsToday: number;
    newVisitorsToday: number;
  };
  contactStatusStats: Array<{ status: string; _count: { status: number } }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [period, setPeriod] = useState('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/stats?period=${period}`);
      
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Statistiken');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError('Fehler beim Laden der Statistiken');
      console.error('Stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [period]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p>{error}</p>
          <button 
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  const contactChartData = {
    labels: stats?.contactStats.map(item => 
      format(new Date(item.date), period === 'day' ? 'dd.MM' : period === 'month' ? 'MMM yyyy' : 'yyyy', { locale: de })
    ) || [],
    datasets: [
      {
        label: 'Kontaktanfragen',
        data: stats?.contactStats.map(item => item.count) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const visitorChartData = {
    labels: stats?.visitorStats.map(item => 
      format(new Date(item.date), period === 'day' ? 'dd.MM' : period === 'month' ? 'MMM yyyy' : 'yyyy', { locale: de })
    ) || [],
    datasets: [
      {
        label: 'Eindeutige Besucher',
        data: stats?.visitorStats.map(item => item.unique_visitors) || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Gesamtbesuche',
        data: stats?.visitorStats.map(item => item.total_visits) || [],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const statusChartData = {
    labels: stats?.contactStatusStats.map(item => {
      switch(item.status) {
        case 'NEW': return 'Neu';
        case 'IN_PROGRESS': return 'In Bearbeitung';
        case 'COMPLETED': return 'Abgeschlossen';
        default: return item.status;
      }
    }) || [],
    datasets: [
      {
        data: stats?.contactStatusStats.map(item => item._count.status) || [],
        backgroundColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(34, 197, 94)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Abmelden
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['day', 'month', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  period === p
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p === 'day' ? 'Tage' : p === 'month' ? 'Monate' : 'Jahre'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">K</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Kontakte Gesamt
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals.contacts || 0}
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
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">B</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Besucher Gesamt
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals.visitors || 0}
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
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">H</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Kontakte Heute
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals.newContactsToday || 0}
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
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">N</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Neue Besucher Heute
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals.newVisitorsToday || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Kontaktanfragen über Zeit
            </h3>
            <Line data={contactChartData} options={chartOptions} />
          </div>

          {/* Visitor Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Besucherstatistiken über Zeit
            </h3>
            <Line data={visitorChartData} options={chartOptions} />
          </div>

          {/* Status Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Kontakt Status Verteilung
            </h3>
            <div className="max-w-xs mx-auto">
              <Doughnut data={statusChartData} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Schnellzugriff
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/admin/contacts')}
                className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 font-medium"
              >
                Alle Kontakte anzeigen
              </button>
              <button
                onClick={() => router.push('/admin/visitors')}
                className="w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-md text-green-700 font-medium"
              >
                Besucherstatistiken anzeigen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
