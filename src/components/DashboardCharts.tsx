'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

type TimeRange = '1d' | '7d' | '30d' | '365d';

const timeRangeLabels = {
  '1d': 'Tag',
  '7d': 'Woche', 
  '30d': 'Monat',
  '365d': 'Jahr'
};

interface ChartData {
  date: string;
  count: number;
}

interface DashboardData {
  visitors: ChartData[];
  contacts: ChartData[];
  totalVisitors: number;
  totalContacts: number;
}

export default function DashboardCharts() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `/api/admin/dashboard-stats${timeRange !== '30d' ? `?range=${timeRange}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Dashboard stats error:', err);
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Daten');
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Lade Diagramm-Daten...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️ Fehler beim Laden</div>
          <div className="text-gray-600 text-sm">{error}</div>
          <button
            onClick={fetchData}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Keine Daten verfügbar</div>
      </div>
    );
  }

  // Transform data for week view to show day names
  const getDisplayData = () => {
    if (timeRange === '7d') {
      const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
      return {
        labels: data.visitors.map((item, index) => {
          const date = new Date(item.date);
          return dayNames[date.getDay()];
        }),
        visitors: data.visitors.map((item, index) => {
          const date = new Date(item.date);
          const dayName = dayNames[date.getDay()];
          return {
            x: dayName,
            y: item.count
          };
        }),
        contacts: data.contacts.map((item, index) => {
          const date = new Date(item.date);
          const dayName = dayNames[date.getDay()];
          return {
            x: dayName,
            y: item.count
          };
        })
      };
    } else {
      return {
        labels: data.visitors.map(item => item.date),
        visitors: data.visitors.map(item => ({
          x: item.date,
          y: item.count
        })),
        contacts: data.contacts.map(item => ({
          x: item.date,
          y: item.count
        }))
      };
    }
  };

  const displayData = getDisplayData();

  const chartData = {
    labels: displayData.labels,
    datasets: [
      {
        label: 'Besucher',
        data: displayData.visitors,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Kontaktanfragen',
        data: displayData.contacts,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: timeRange === '7d' ? 'category' as const : 'time' as const,
        time: timeRange !== '7d' ? {
          unit: timeRange === '1d' ? 'hour' as const : timeRange === '30d' ? 'day' as const : 'month' as const,
          displayFormats: {
            hour: 'HH:mm',
            day: 'dd.MM',
            month: 'MMM yyyy'
          }
        } : undefined,
        title: {
          display: true,
          text: 'Zeit'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Anzahl'
        },
        ticks: {
          stepSize: 1
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div>
      {/* Zeitbereich Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {timeRangeLabels[range]}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
      
      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Zeitraum:</span> {timeRangeLabels[timeRange]}
        </div>
        <div>
          <span className="font-medium">Datenpunkte:</span> {data.visitors.length}
        </div>
      </div>
    </div>
  );
}
