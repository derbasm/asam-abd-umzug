'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'completed';
}

interface VisitorStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

interface LocationStats {
  [key: string]: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [locationStats, setLocationStats] = useState<LocationStats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contacts
        const contactsRes = await fetch('/api/admin/contacts');
        const contactsData = await contactsRes.json();
        setContacts(contactsData);

        // Fetch visitor stats
        const statsRes = await fetch('/api/admin/stats');
        const statsData = await statsRes.json();
        setVisitorStats(statsData.visitors);
        setLocationStats(statsData.locations);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const updateContactStatus = async (id: string, status: Contact['status']) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, status } : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  if (loading) {
    return <div>Wird geladen...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Visitor Stats */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Besucher Statistiken</h2>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Gesamt Besucher
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {visitorStats.total}
                    </dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Heute
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {visitorStats.today}
                    </dd>
                  </div>
                </div>
                {/* Add more stat boxes as needed */}
              </div>
            </div>

            {/* Location Stats */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Besucher nach Standort</h2>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {Object.entries(locationStats).map(([location, count]) => (
                    <li key={location} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">{location}</div>
                        <div className="text-sm text-gray-500">{count} Besucher</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Requests */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Kontaktanfragen</h2>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <li key={contact._id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.email} • {contact.service}
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            {format(new Date(contact.createdAt), 'PPP', { locale: de })}
                          </div>
                        </div>
                        <div>
                          <select
                            value={contact.status}
                            onChange={(e) => updateContactStatus(contact._id, e.target.value as Contact['status'])}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            <option value="new">Neu</option>
                            <option value="in_progress">In Bearbeitung</option>
                            <option value="completed">Abgeschlossen</option>
                          </select>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 