import { useState, useMemo } from 'react';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// Dummy data for news flash
const newsItems = [
  {
    id: 1,
    title: 'Federal Reserve Holds Interest Rates Steady at 5.25%',
    summary: 'The Federal Reserve announced today that it will maintain the current interest rate, citing stable inflation and strong economic growth indicators.',
    category: 'Monetary Policy',
    time: '2 hours ago',
    impact: 'High',
    source: 'Federal Reserve',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'European Central Bank Signals Potential Rate Cut in Q2',
    summary: 'ECB President Christine Lagarde hinted at possible interest rate reductions in the second quarter, responding to easing inflation pressures across the Eurozone.',
    category: 'Central Banks',
    time: '4 hours ago',
    impact: 'High',
    source: 'Bloomberg',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'US GDP Growth Exceeds Expectations at 3.2%',
    summary: 'The US economy showed stronger than expected growth in the last quarter, driven by robust consumer spending and increased business investment.',
    category: 'Economic Data',
    time: '6 hours ago',
    impact: 'Medium',
    source: 'Reuters',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Oil Prices Surge 5% Following Middle East Tensions',
    summary: 'Crude oil futures jumped significantly after reports of escalating tensions in key production regions, raising concerns about supply disruptions.',
    category: 'Commodities',
    time: '8 hours ago',
    impact: 'High',
    source: 'Financial Times',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'China Manufacturing PMI Rises to 52.1',
    summary: 'China\'s manufacturing sector showed expansion for the third consecutive month, with the PMI reaching its highest level in six months.',
    category: 'Economic Data',
    time: '10 hours ago',
    impact: 'Medium',
    source: 'CNBC',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'Bitcoin Reaches New All-Time High Above $75,000',
    summary: 'The cryptocurrency market saw significant gains as Bitcoin broke through previous resistance levels, driven by increased institutional adoption.',
    category: 'Cryptocurrency',
    time: '12 hours ago',
    impact: 'Medium',
    source: 'CoinDesk',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop'
  },
  {
    id: 7,
    title: 'UK Inflation Drops to 2.3%, Lowest in Three Years',
    summary: 'The UK saw its inflation rate fall to the lowest level since 2021, potentially opening the door for Bank of England rate cuts.',
    category: 'Inflation',
    time: '14 hours ago',
    impact: 'High',
    source: 'BBC News',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
  },
  {
    id: 8,
    title: 'Japan Yen Weakens to 34-Year Low Against Dollar',
    summary: 'The Japanese yen continued its decline, reaching levels not seen since 1990, as the Bank of Japan maintains its ultra-loose monetary policy.',
    category: 'Forex',
    time: '16 hours ago',
    impact: 'High',
    source: 'Nikkei',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop'
  }
];

const getImpactBadge = (impact: string) => {
  const colors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200'
  };
  return colors[impact as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Monetary Policy': 'bg-blue-100 text-blue-800',
    'Central Banks': 'bg-purple-100 text-purple-800',
    'Economic Data': 'bg-green-100 text-green-800',
    'Commodities': 'bg-orange-100 text-orange-800',
    'Cryptocurrency': 'bg-yellow-100 text-yellow-800',
    'Inflation': 'bg-red-100 text-red-800',
    'Forex': 'bg-indigo-100 text-indigo-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

type NewsFilterType = 'all' | 'high-impact' | 'Central Banks' | 'Economic Data' | 'Monetary Policy' | 'Commodities' | 'Cryptocurrency' | 'Inflation' | 'Forex';

export default function NewsFlashPage() {
  const [activeFilter, setActiveFilter] = useState<NewsFilterType>('all');

  // Filter news based on active filter
  const filteredNews = useMemo(() => {
    if (activeFilter === 'all') {
      return newsItems;
    }
    
    if (activeFilter === 'high-impact') {
      return newsItems.filter(news => news.impact === 'High');
    }
    
    // Filter by category
    return newsItems.filter(news => news.category === activeFilter);
  }, [activeFilter]);

  const handleFilterClick = (filter: NewsFilterType) => {
    setActiveFilter(filter);
  };

  const getFilterButtonClass = (filter: NewsFilterType) => {
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
              NewsFlash
            </h1>
            <p className="text-gray-600 text-lg">
              Stay updated with the latest financial and economic news
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterClick('all')}
              className={getFilterButtonClass('all')}
            >
              All News
            </button>
            <button
              onClick={() => handleFilterClick('high-impact')}
              className={getFilterButtonClass('high-impact')}
            >
              High Impact
            </button>
            <button
              onClick={() => handleFilterClick('Central Banks')}
              className={getFilterButtonClass('Central Banks')}
            >
              Central Banks
            </button>
            <button
              onClick={() => handleFilterClick('Economic Data')}
              className={getFilterButtonClass('Economic Data')}
            >
              Economic Data
            </button>
            <button
              onClick={() => handleFilterClick('Monetary Policy')}
              className={getFilterButtonClass('Monetary Policy')}
            >
              Monetary Policy
            </button>
            <button
              onClick={() => handleFilterClick('Commodities')}
              className={getFilterButtonClass('Commodities')}
            >
              Commodities
            </button>
            <button
              onClick={() => handleFilterClick('Forex')}
              className={getFilterButtonClass('Forex')}
            >
              Forex
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
          </div>

          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">No news found for the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getImpactBadge(news.impact)}`}>
                      {news.impact}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getCategoryColor(news.category)}`}>
                      {news.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{news.time}</span>
                    <span className="text-xs text-gray-500">{news.source}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {news.summary}
                  </p>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Load More News
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

