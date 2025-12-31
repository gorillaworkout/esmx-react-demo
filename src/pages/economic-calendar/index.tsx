import { useState, useMemo, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// Types for API response
interface ApiCalendarItem {
  id: number;
  date: string | null;
  time: string | null;
  weightiness: string;
  countryCode: string;
  countryName: string;
  content: string;
  columnCode: string;
  previous: string;
  predict: string;
  currentValue: string;
  revised: string | null;
  dataType: string | null;
  dataTypeName: string;
  currencyCode: string;
  countryIcon: string;
  publishTime: number;
  lastUpdateTime: number;
  unit: string | null;
}

interface ApiCalendarResponse {
  code: number;
  message: string;
  data: {
    items: ApiCalendarItem[];
  };
}

interface EconomicEvent {
  id: number;
  date: string;
  time: string;
  currency: string;
  event: string;
  impact: string;
  actual: string;
  forecast: string;
  previous: string;
  status: string;
  countryName: string;
  countryIcon: string;
}

// Helper function to map weightiness to impact
const mapWeightinessToImpact = (weightiness: string): string => {
  switch (weightiness) {
    case '1':
      return 'High';
    case '2':
      return 'Medium';
    case '3':
      return 'Low';
    default:
      return 'Medium';
  }
};

// Helper function to format time from timestamp (UTC+1)
const formatTimeFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  // Convert to UTC+1 (CET/CEST timezone) - add 1 hour to UTC
  const utc1Time = date.getTime() + (1 * 60 * 60 * 1000);
  const utc1Date = new Date(utc1Time);
  const hours = String(utc1Date.getUTCHours()).padStart(2, '0');
  const minutes = String(utc1Date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper function to format date from timestamp
const formatDateFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to determine status based on actual, forecast, and previous
const determineStatus = (actual: string, forecast: string, previous: string): string => {
  if (!actual || actual === '') return 'pending';
  if (!forecast || forecast === '') return 'neutral';
  
  // Try to parse numeric values
  const actualNum = parseFloat(actual.replace(/[^0-9.-]/g, ''));
  const forecastNum = parseFloat(forecast.replace(/[^0-9.-]/g, ''));
  
  if (isNaN(actualNum) || isNaN(forecastNum)) return 'neutral';
  
  if (actualNum > forecastNum) return 'positive';
  if (actualNum < forecastNum) return 'negative';
  return 'neutral';
};

// Fetch calendar data from API
const fetchCalendarData = async (startTime: number, endTime: number): Promise<EconomicEvent[]> => {
  try {
    const url = `https://portal.dupoin.co.id/api/v1/pro/social/news/calendar/query?startTime=${startTime}&endTime=${endTime}&publish=0&area=en&weightiness=1,2,3&countryCode=10001,10002,10003,10004,10005,10006,10007,10008,10009,10010,10011,10017,10021,10036,20724,20076,16`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiCalendarResponse = await response.json();
    
    if (data.code !== 0 || !data.data?.items) {
      throw new Error(data.message || 'Failed to fetch calendar data');
    }
    
    // Transform API data to EconomicEvent format
    return data.data.items.map((item): EconomicEvent => ({
      id: item.id,
      date: formatDateFromTimestamp(item.publishTime),
      time: formatTimeFromTimestamp(item.publishTime),
      currency: item.currencyCode || 'USD',
      event: item.content || item.dataTypeName || 'Economic Event',
      impact: mapWeightinessToImpact(item.weightiness),
      actual: item.currentValue || '-',
      forecast: item.predict || '-',
      previous: item.previous || '-',
      status: determineStatus(item.currentValue, item.predict, item.previous),
      countryName: item.countryName || 'Unknown',
      countryIcon: item.countryIcon || ''
    }));
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
};

// Helper function to generate dates (using local time to avoid timezone issues)
const getDateString = (daysFromToday: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Format: YYYY-MM-DD (local time)
};

// Dummy data for economic calendar with dates (fallback)
const economicEventsDummy = [
  // Today's events - More dummy data
  {
    id: 1,
    date: getDateString(0),
    time: '06:00',
    currency: 'AUD',
    event: 'Retail Sales MoM',
    impact: 'Medium',
    actual: '0.4%',
    forecast: '0.3%',
    previous: '0.2%',
    status: 'positive'
  },
  {
    id: 2,
    date: getDateString(0),
    time: '07:00',
    currency: 'JPY',
    event: 'Household Spending YoY',
    impact: 'Low',
    actual: '-1.2%',
    forecast: '-0.8%',
    previous: '-0.5%',
    status: 'negative'
  },
  {
    id: 3,
    date: getDateString(0),
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
    id: 4,
    date: getDateString(0),
    time: '09:00',
    currency: 'EUR',
    event: 'German Factory Orders MoM',
    impact: 'Medium',
    actual: '2.1%',
    forecast: '1.5%',
    previous: '-0.5%',
    status: 'positive'
  },
  {
    id: 5,
    date: getDateString(0),
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
    id: 6,
    date: getDateString(0),
    time: '10:30',
    currency: 'GBP',
    event: 'Services PMI',
    impact: 'Medium',
    actual: '52.5',
    forecast: '51.8',
    previous: '50.9',
    status: 'positive'
  },
  {
    id: 7,
    date: getDateString(0),
    time: '11:00',
    currency: 'CAD',
    event: 'Ivey PMI',
    impact: 'Low',
    actual: '56.2',
    forecast: '54.5',
    previous: '53.1',
    status: 'positive'
  },
  {
    id: 8,
    date: getDateString(0),
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
    id: 9,
    date: getDateString(0),
    time: '12:30',
    currency: 'USD',
    event: 'Unemployment Rate',
    impact: 'High',
    actual: '3.7%',
    forecast: '3.8%',
    previous: '3.9%',
    status: 'positive'
  },
  {
    id: 10,
    date: getDateString(0),
    time: '13:00',
    currency: 'EUR',
    event: 'ECB Press Conference',
    impact: 'High',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 11,
    date: getDateString(0),
    time: '14:00',
    currency: 'USD',
    event: 'ISM Manufacturing PMI',
    impact: 'Medium',
    actual: '49.5',
    forecast: '48.8',
    previous: '47.2',
    status: 'positive'
  },
  {
    id: 12,
    date: getDateString(0),
    time: '15:00',
    currency: 'USD',
    event: 'Consumer Confidence',
    impact: 'Low',
    actual: '102.5',
    forecast: '100.2',
    previous: '98.5',
    status: 'positive'
  },
  {
    id: 13,
    date: getDateString(0),
    time: '16:00',
    currency: 'USD',
    event: 'Crude Oil Inventories',
    impact: 'Medium',
    actual: '-2.5M',
    forecast: '-1.8M',
    previous: '3.2M',
    status: 'positive'
  },
  {
    id: 14,
    date: getDateString(0),
    time: '17:00',
    currency: 'USD',
    event: 'Fed Chair Powell Speech',
    impact: 'High',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 15,
    date: getDateString(0),
    time: '18:00',
    currency: 'NZD',
    event: 'RBNZ Interest Rate Decision',
    impact: 'High',
    actual: '5.50%',
    forecast: '5.50%',
    previous: '5.25%',
    status: 'neutral'
  },
  {
    id: 16,
    date: getDateString(0),
    time: '19:00',
    currency: 'USD',
    event: 'FOMC Member Williams Speech',
    impact: 'Medium',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 17,
    date: getDateString(0),
    time: '20:00',
    currency: 'EUR',
    event: 'ECB President Lagarde Speech',
    impact: 'High',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 18,
    date: getDateString(0),
    time: '21:00',
    currency: 'GBP',
    event: 'BOE Governor Bailey Speech',
    impact: 'Medium',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 19,
    date: getDateString(0),
    time: '22:00',
    currency: 'USD',
    event: 'API Weekly Crude Oil Stock',
    impact: 'Low',
    actual: '-',
    forecast: '-1.2M',
    previous: '2.5M',
    status: 'pending'
  },
  {
    id: 20,
    date: getDateString(0),
    time: '23:00',
    currency: 'JPY',
    event: 'BoJ Governor Ueda Speech',
    impact: 'Medium',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 21,
    date: getDateString(0),
    time: '05:30',
    currency: 'AUD',
    event: 'Building Approvals MoM',
    impact: 'Low',
    actual: '1.2%',
    forecast: '0.8%',
    previous: '-0.5%',
    status: 'positive'
  },
  {
    id: 22,
    date: getDateString(0),
    time: '07:30',
    currency: 'CNH',
    event: 'Caixin Manufacturing PMI',
    impact: 'Medium',
    actual: '51.2',
    forecast: '50.5',
    previous: '49.8',
    status: 'positive'
  },
  {
    id: 23,
    date: getDateString(0),
    time: '08:00',
    currency: 'EUR',
    event: 'Spanish Manufacturing PMI',
    impact: 'Low',
    actual: '48.5',
    forecast: '47.8',
    previous: '46.2',
    status: 'positive'
  },
  {
    id: 24,
    date: getDateString(0),
    time: '08:30',
    currency: 'GBP',
    event: 'Manufacturing PMI',
    impact: 'Medium',
    actual: '49.8',
    forecast: '48.5',
    previous: '47.2',
    status: 'positive'
  },
  {
    id: 25,
    date: getDateString(0),
    time: '09:30',
    currency: 'EUR',
    event: 'French Manufacturing PMI',
    impact: 'Low',
    actual: '47.5',
    forecast: '46.8',
    previous: '45.2',
    status: 'positive'
  },
  {
    id: 26,
    date: getDateString(0),
    time: '10:30',
    currency: 'EUR',
    event: 'German Manufacturing PMI',
    impact: 'Medium',
    actual: '46.8',
    forecast: '45.5',
    previous: '44.2',
    status: 'positive'
  },
  {
    id: 27,
    date: getDateString(0),
    time: '11:30',
    currency: 'EUR',
    event: 'Eurozone Manufacturing PMI',
    impact: 'Medium',
    actual: '47.2',
    forecast: '46.5',
    previous: '45.8',
    status: 'positive'
  },
  {
    id: 28,
    date: getDateString(0),
    time: '13:30',
    currency: 'USD',
    event: 'Initial Jobless Claims',
    impact: 'Medium',
    actual: '210K',
    forecast: '215K',
    previous: '218K',
    status: 'positive'
  },
  {
    id: 29,
    date: getDateString(0),
    time: '14:30',
    currency: 'USD',
    event: 'Natural Gas Storage',
    impact: 'Low',
    actual: '-85B',
    forecast: '-75B',
    previous: '-65B',
    status: 'negative'
  },
  {
    id: 30,
    date: getDateString(0),
    time: '15:30',
    currency: 'USD',
    event: 'EIA Natural Gas Storage',
    impact: 'Low',
    actual: '-',
    forecast: '-80B',
    previous: '-70B',
    status: 'pending'
  },
  // Tomorrow's events
  {
    id: 31,
    date: getDateString(1),
    time: '09:00',
    currency: 'JPY',
    event: 'CPI Year-over-Year',
    impact: 'Medium',
    actual: '2.8%',
    forecast: '2.9%',
    previous: '2.7%',
    status: 'positive'
  },
  {
    id: 32,
    date: getDateString(1),
    time: '14:00',
    currency: 'AUD',
    event: 'RBA Monetary Policy Statement',
    impact: 'High',
    actual: '-',
    forecast: '4.35%',
    previous: '4.35%',
    status: 'pending'
  },
  // This week's events
  {
    id: 33,
    date: getDateString(2),
    time: '11:00',
    currency: 'CAD',
    event: 'Employment Change',
    impact: 'Medium',
    actual: '-',
    forecast: '25K',
    previous: '39.9K',
    status: 'pending'
  },
  {
    id: 34,
    date: getDateString(3),
    time: '13:30',
    currency: 'USD',
    event: 'Consumer Price Index',
    impact: 'High',
    actual: '-',
    forecast: '3.2%',
    previous: '3.1%',
    status: 'pending'
  },
  {
    id: 35,
    date: getDateString(4),
    time: '15:00',
    currency: 'EUR',
    event: 'Manufacturing PMI',
    impact: 'Medium',
    actual: '-',
    forecast: '48.5',
    previous: '47.8',
    status: 'pending'
  },
  // Events in the next 3 months
  {
    id: 36,
    date: getDateString(15),
    time: '10:30',
    currency: 'GBP',
    event: 'Bank of England Rate Decision',
    impact: 'High',
    actual: '-',
    forecast: '5.25%',
    previous: '5.25%',
    status: 'pending'
  },
  {
    id: 37,
    date: getDateString(30),
    time: '09:30',
    currency: 'USD',
    event: 'Federal Reserve Meeting',
    impact: 'High',
    actual: '-',
    forecast: '5.50%',
    previous: '5.50%',
    status: 'pending'
  },
  {
    id: 38,
    date: getDateString(45),
    time: '12:00',
    currency: 'EUR',
    event: 'ECB Press Conference',
    impact: 'High',
    actual: '-',
    forecast: '-',
    previous: '-',
    status: 'pending'
  },
  {
    id: 39,
    date: getDateString(60),
    time: '14:00',
    currency: 'JPY',
    event: 'Bank of Japan Policy Decision',
    impact: 'High',
    actual: '-',
    forecast: '-0.1%',
    previous: '-0.1%',
    status: 'pending'
  },
  {
    id: 40,
    date: getDateString(75),
    time: '11:30',
    currency: 'AUD',
    event: 'RBA Cash Rate Decision',
    impact: 'High',
    actual: '-',
    forecast: '4.35%',
    previous: '4.35%',
    status: 'pending'
  },
  {
    id: 41,
    date: getDateString(90),
    time: '13:00',
    currency: 'CAD',
    event: 'Bank of Canada Rate Decision',
    impact: 'High',
    actual: '-',
    forecast: '5.00%',
    previous: '5.00%',
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

type DateFilterType = 'today' | 'tomorrow' | 'this-week' | '3-months';

export default function EconomicCalendarPage() {
  const [activeDateFilter, setActiveDateFilter] = useState<DateFilterType>('today');
  const [economicEvents, setEconomicEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch calendar data on component mount
  useEffect(() => {
    const loadCalendarData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Calculate time range (today to 3 months ahead)
        const now = Math.floor(Date.now() / 1000);
        const endTime = now + (90 * 24 * 60 * 60); // 90 days from now
        
        const data = await fetchCalendarData(now, endTime);
        setEconomicEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load calendar data');
        // Fallback to dummy data on error
        setEconomicEvents(economicEventsDummy.map((event, index) => ({
          id: event.id,
          date: event.date,
          time: event.time,
          currency: event.currency,
          event: event.event,
          impact: event.impact,
          actual: event.actual,
          forecast: event.forecast,
          previous: event.previous,
          status: event.status,
          countryName: 'Unknown',
          countryIcon: ''
        })));
      } finally {
        setLoading(false);
      }
    };
    
    loadCalendarData();
  }, []);

  // Helper function to get date string in YYYY-MM-DD format (local time)
  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to generate date string (using local time, called at render time)
  const getDateStringAtRender = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return getLocalDateString(date);
  };

  // Use events from API directly (they already have correct dates)
  const economicEventsAtRender = useMemo(() => {
    return economicEvents;
  }, [economicEvents]);

  // Helper functions for date filtering
  const getTodayDate = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const getTomorrowDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const getEndOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(date);
    monday.setDate(diff);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Sunday
    sunday.setHours(23, 59, 59, 999);
    return sunday;
  };

  const getThreeMonthsLater = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    date.setHours(23, 59, 59, 999);
    return date;
  };

  // Filter events based on date filter
  const filteredEvents = useMemo(() => {
    const todayDate = getTodayDate();
    const tomorrowDate = getTomorrowDate();
    const endOfWeek = getEndOfWeek();
    const threeMonthsLater = getThreeMonthsLater();

    switch (activeDateFilter) {
      case 'today': {
        const todayStr = getLocalDateString(todayDate);
        return economicEventsAtRender.filter(event => event.date === todayStr);
      }
      case 'tomorrow': {
        const tomorrowStr = getLocalDateString(tomorrowDate);
        return economicEventsAtRender.filter(event => event.date === tomorrowStr);
      }
      case 'this-week': {
        return economicEventsAtRender.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= todayDate && eventDate <= endOfWeek;
        });
      }
      case '3-months': {
        return economicEventsAtRender.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= todayDate && eventDate <= threeMonthsLater;
        });
      }
      default:
        return economicEventsAtRender;
    }
  }, [activeDateFilter, economicEventsAtRender]);

  const handleDateFilterClick = (filter: DateFilterType) => {
    setActiveDateFilter(filter);
  };

  const getDateFilterButtonClass = (filter: DateFilterType) => {
    const isActive = activeDateFilter === filter;
    return `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
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
          </div>

          {/* Submenu Navigation */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-1">
              <a
                href="/economic-calendar"
                className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Economic Calendar</span>
                </div>
              </a>
              <a
                href="/newsflash"
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>NewsFlash</span>
                </div>
              </a>
            </nav>
          </div>

          {/* Date Filter Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Periode Waktu</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleDateFilterClick('today')}
                className={getDateFilterButtonClass('today')}
              >
                Today
              </button>
              <button
                onClick={() => handleDateFilterClick('tomorrow')}
                className={getDateFilterButtonClass('tomorrow')}
              >
                Tomorrow
              </button>
              <button
                onClick={() => handleDateFilterClick('this-week')}
                className={getDateFilterButtonClass('this-week')}
              >
                This Week
              </button>
              <button
                onClick={() => handleDateFilterClick('3-months')}
                className={getDateFilterButtonClass('3-months')}
              >
                3 Months
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-500 text-lg">Loading calendar events...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">Warning: {error}. Showing fallback data.</p>
            </div>
          )}

          {/* Events Table */}
          {!loading && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {activeDateFilter === 'today' && "Today's Economic Events"}
                    {activeDateFilter === 'tomorrow' && "Tomorrow's Economic Events"}
                    {activeDateFilter === 'this-week' && "This Week's Economic Events"}
                    {activeDateFilter === '3-months' && "Next 3 Months Economic Events"}
                  </CardTitle>
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
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time (UTC+1)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country/Region
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
                      {filteredEvents.map((event) => {
                        const eventDate = new Date(event.date);
                        const formattedDate = eventDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        });
                        return (
                        <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{formattedDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{event.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {event.countryIcon && (
                                <img
                                  src={event.countryIcon}
                                  alt={event.countryName}
                                  className="w-5 h-5 rounded-sm object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              )}
                              <span className="text-sm font-medium text-gray-900">{event.countryName}</span>
                            </div>
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          )}

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

