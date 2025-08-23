'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';

interface Visitor {
  id: number;
  ip: string;
  userAgent?: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  referrer?: string;
  firstVisit: string;
  lastVisit: string;
  visits: number;
  pages: Array<{
    path: string;
    timestamp: string;
  }>;
}

interface VisitorsResponse {
  visitors: Visitor[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchVisitors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/visitors?page=${page}&limit=20`);
      
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Besucher');
      }
      
      const data: VisitorsResponse = await response.json();
      setVisitors(data.visitors);
      setTotal(data.total);
    } catch (error) {
      console.error('Visitors error:', error);
    } finally {
      setLoading(false);
    }
  }, [page, router]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detaillierte Besucherstatistiken</h1>
                <p className="text-gray-600">Übersicht aller Website-Besucher mit Details</p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Herkunft
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Zeitpunkt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Besuche
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visitors.map((visitor) => {
                      // Determine traffic source
                      const getTrafficSource = () => {
                        if (!visitor.referrer || visitor.referrer === '') return 'Direkt';
                        if (visitor.referrer.includes('google')) return 'Google';
                        if (visitor.referrer.includes('facebook')) return 'Facebook';
                        if (visitor.referrer.includes('instagram')) return 'Instagram';
                        if (visitor.referrer.includes('twitter') || visitor.referrer.includes('t.co')) return 'Twitter';
                        if (visitor.referrer.includes('linkedin')) return 'LinkedIn';
                        if (visitor.referrer.includes('youtube')) return 'YouTube';
                        if (visitor.referrer.includes('bing')) return 'Bing';
                        if (visitor.referrer.includes('yahoo')) return 'Yahoo';
                        return 'Andere Website';
                      };

                      return (
                        <tr key={visitor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-medium">
                                    {getTrafficSource() === 'Direkt' ? '🌐' : 
                                     getTrafficSource() === 'Google' ? '🔍' :
                                     getTrafficSource() === 'Facebook' ? '📘' :
                                     getTrafficSource() === 'Instagram' ? '📷' :
                                     getTrafficSource() === 'Twitter' ? '🐦' :
                                     getTrafficSource() === 'LinkedIn' ? '💼' :
                                     getTrafficSource() === 'YouTube' ? '📺' : '🔗'}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {getTrafficSource()}
                                </div>
                                {visitor.referrer && visitor.referrer !== '' && (
                                  <div className="text-sm text-gray-500 truncate max-w-48">
                                    {visitor.referrer}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {visitor.city && visitor.country ? 
                                `${visitor.city}, ${visitor.country}` : 
                                visitor.country || 'Unbekannt'}
                            </div>
                            {visitor.region && (
                              <div className="text-sm text-gray-500">{visitor.region}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(visitor.firstVisit).toLocaleString('de-DE')}
                            </div>
                            {visitor.visits > 1 && (
                              <div className="text-sm text-gray-500">
                                Letzter: {new Date(visitor.lastVisit).toLocaleString('de-DE')}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {visitor.visits}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {visitors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Keine Besucher gefunden</p>
                </div>
              )}
            </div>

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Vorherige
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(total / 20)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Nächste
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Zeige <span className="font-medium">{(page - 1) * 20 + 1}</span> bis{' '}
                    <span className="font-medium">{Math.min(page * 20, total)}</span> von{' '}
                    <span className="font-medium">{total}</span> Ergebnissen
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Vorherige
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page >= Math.ceil(total / 20)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Nächste
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
