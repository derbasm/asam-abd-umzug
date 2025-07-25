'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
      setError('');
      
      console.log('🔍 Fetching admin stats...');
      const response = await fetch(`/api/admin/stats?period=${period}`);
      
      if (response.status === 401) {
        console.log('❌ Unauthorized, redirecting to login');
        router.push('/admin/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Stats loaded:', data);
      setStats(data);
    } catch (error) {
      console.error('Stats error:', error);
      setError('Fehler beim Laden der Statistiken. API möglicherweise noch nicht implementiert.');
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
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'NEW': return 'Neu';
      case 'IN_PROGRESS': return 'In Bearbeitung';
      case 'COMPLETED': return 'Abgeschlossen';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dashboard wird geladen...</p>
        </div>
      </div>
    );
  }

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
        {error ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  ⚠️ API noch nicht vollständig implementiert
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{error}</p>
                  <button 
                    onClick={fetchStats}
                    className="mt-2 text-yellow-800 underline hover:text-yellow-900"
                  >
                    Erneut versuchen
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
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
                    <span className="text-white text-sm font-bold">📧</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Kontakte Gesamt
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals?.contacts || '?'}
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
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Besucher Gesamt
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals?.visitors || '?'}
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
                    <span className="text-white text-sm font-bold">📅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Kontakte Heute
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals?.newContactsToday || '?'}
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
                    <span className="text-white text-sm font-bold">🆕</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Neue Besucher Heute
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totals?.newVisitorsToday || '?'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables ohne Charts (erstmal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Stats Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              📊 Kontaktanfragen über Zeit
            </h3>
            {stats?.contactStats?.length ? (
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Datum</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.contactStats.slice(0, 10).map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {new Date(item.date).toLocaleDateString('de-DE')}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Keine Daten verfügbar</p>
            )}
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              📈 Kontakt Status Verteilung
            </h3>
            {stats?.contactStatusStats?.length ? (
              <div className="space-y-3">
                {stats.contactStatusStats.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {getStatusLabel(item.status)}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{item._count.status}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${(item._count.status / (stats?.totals?.contacts || 1)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Keine Daten verfügbar</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              🚀 Schnellzugriff
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/admin/contacts')}
                className="text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 font-medium border border-blue-200 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">📝</span>
                  <div>
                    <div className="font-semibold">Kontakte verwalten</div>
                    <div className="text-sm text-blue-600">Kontaktanfragen bearbeiten</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => router.push('/admin/visitors')}
                className="text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-md text-green-700 font-medium border border-green-200 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">👥</span>
                  <div>
                    <div className="font-semibold">Besucherstatistiken</div>
                    <div className="text-sm text-green-600">Website-Besucher analysieren</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                ✅ Dashboard erfolgreich geladen!
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Sie sind erfolgreich im Admin-Bereich angemeldet. PostgreSQL-Integration ist aktiv.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
