'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Simple test to see if we can access the dashboard
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking dashboard access...');
        setLoading(false);
      } catch (error) {
        console.error('Dashboard error:', error);
        setError('Zugriff verweigert');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/admin/login';
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
            onClick={() => router.push('/admin/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Zurück zum Login
          </button>
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
            <h1 className="text-3xl font-bold text-gray-900">🎉 Admin Dashboard</h1>
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
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            ✅ Login erfolgreich!
          </h2>
          <p className="text-gray-600 mb-6">
            Sie haben sich erfolgreich im Admin-Bereich angemeldet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">📊 Dashboard Features</h3>
              <ul className="mt-2 text-blue-600 text-sm">
                <li>• Besucherstatistiken</li>
                <li>• Kontaktanfragen verwalten</li>
                <li>• Zeitdiagramme</li>
                <li>• PostgreSQL Integration</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">🔧 Nächste Schritte</h3>
              <ul className="mt-2 text-green-600 text-sm">
                <li>• Charts installieren</li>
                <li>• Visitor Tracking aktivieren</li>
                <li>• Statistiken implementieren</li>
                <li>• Kontakte-Seite testen</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => alert('Kontakte-Seite kommt bald!')}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 font-medium border border-blue-200"
            >
              📝 Kontakte verwalten
            </button>
            <button
              onClick={() => alert('Besucher-Statistiken kommen bald!')}
              className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-md text-green-700 font-medium border border-green-200"
            >
              👥 Besucherstatistiken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
