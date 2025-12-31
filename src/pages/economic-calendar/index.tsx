import { useState, useMemo } from 'react';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// Dummy data for economic calendar
const economicEvents = [
  {
    id: 1,
    time: '08:30',
    currency: 'USD',
    event: 'Non-Farm Payrolls',
    impact: 'High',
    actual: '187K',
    forecast: '200K',
    previous: '209K',
    status: 'positive'
  },
  {
    id: 2,
    time: '10:00',
    currency: 'EUR',
    event: 'ECB Interest Rate Decision',
    impact: 'High',
    actual: '4.50%',
    forecast: '4.50%',
    previous: '4.25%',
    status: 'neutral'
  },
  {
    id: 3,
    time: '12:00',
    currency: 'GBP',
    event: 'GDP Growth Rate',
    impact: 'Medium',
    actual: '0.2%',
    forecast: '0.3%',
    previous: '0.1%',
    status: 'negative'
  },
  {
    id: 4,
    time: '14:30',
    currency: 'JPY',
    event: 'CPI Year-over-Year',
    impact: 'Medium',
    actual: '2.8%',
    forecast: '2.9%',
    previous: '2.7%',
    status: 'positive'
  },
  {
    id: 5,
    time: '16:00',
    currency: 'AUD',
    event: 'RBA Monetary Policy Statement',
    impact: 'High',
    actual: '-',
    forecast: '4.35%',
    previous: '4.35%',
    status: 'pending'
  },
  {
    id: 6,
    time: '18:00',
    currency: 'CAD',
    event: 'Employment Change',
    impact: 'Medium',
    actual: '-',
    forecast: '25K',
    previous: '39.9K',
    status: 'pending'
  }
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'positive':
      return 'text-green-600';
    case 'negative':
      return 'text-red-600';
    case 'neutral':
      return 'text-gray-600';
    default:
      return 'text-blue-600';
  }
};

type FilterType = 'all' | 'high-impact' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD';

export default function EconomicCalendarPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') {
      return economicEvents;
    }
    
    if (activeFilter === 'high-impact') {
      return economicEvents.filter(event => event.impact === 'High');
    }
    
    // Filter by currency
    return economicEvents.filter(event => event.currency === activeFilter);
  }, [activeFilter]);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const getFilterButtonClass = (filter: FilterType) => {
    const isActive = activeFilter === filter;
    return `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Economic Calendar
            </h1>
            <p className="text-gray-600 text-lg">
              Track important economic events and indicators
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {today}
              </span>
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterClick('all')}
              className={getFilterButtonClass('all')}
            >
              All Events
            </button>
            <button
              onClick={() => handleFilterClick('high-impact')}
              className={getFilterButtonClass('high-impact')}
            >
              High Impact
            </button>
            <button
              onClick={() => handleFilterClick('USD')}
              className={getFilterButtonClass('USD')}
            >
              USD
            </button>
            <button
              onClick={() => handleFilterClick('EUR')}
              className={getFilterButtonClass('EUR')}
            >
              EUR
            </button>
            <button
              onClick={() => handleFilterClick('GBP')}
              className={getFilterButtonClass('GBP')}
            >
              GBP
            </button>
            <button
              onClick={() => handleFilterClick('JPY')}
              className={getFilterButtonClass('JPY')}
            >
              JPY
            </button>
            <button
              onClick={() => handleFilterClick('AUD')}
              className={getFilterButtonClass('AUD')}
            >
              AUD
            </button>
            <button
              onClick={() => handleFilterClick('CAD')}
              className={getFilterButtonClass('CAD')}
            >
              CAD
            </button>
          </div>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Economic Events</CardTitle>
                <span className="text-sm text-gray-500">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredEvents.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-lg">No events found for the selected filter.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Currency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Impact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actual
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Forecast
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Previous
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {event.currency}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{event.event}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getImpactColor(event.impact)}`}>
                            {event.impact}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor(event.status)}`}>
                          {event.actual}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.forecast}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.previous}
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 border border-red-200 text-xs font-semibold">
                High
              </span>
              <span className="text-gray-600">High Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs font-semibold">
                Medium
              </span>
              <span className="text-gray-600">Medium Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">↑</span>
              <span className="text-gray-600">Better than expected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-medium">↓</span>
              <span className="text-gray-600">Worse than expected</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

