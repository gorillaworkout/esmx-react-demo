import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';

// Types for API response
interface ApiArticleItem {
  id?: number;
  articleId?: number;
  title?: string;
  summary?: string;
  content?: string;
  category?: string;
  categoryName?: string;
  publishTime?: number;
  publishDate?: string;
  author?: string;
  authorName?: string;
  image?: string;
  thumbnail?: string;
  coverImage?: string;
  source?: string;
  sourceName?: string;
  tags?: string[];
  views?: number;
  [key: string]: any; // Allow for flexible API response structure
}

interface ApiArticleResponse {
  code?: number;
  status?: number;
  message?: string;
  data?: {
    items?: ApiArticleItem[];
    list?: ApiArticleItem[];
    articles?: ApiArticleItem[];
    total?: number;
    page?: number;
    limit?: number;
  };
  items?: ApiArticleItem[];
  [key: string]: any; // Allow for flexible API response structure
}

interface NewsItem {
  id: number;
  title: string;
  seotitle?: string;
  date: string;
  publishTime?: number;
  publishDate?: string;
}

// Helper function to format date
const formatDate = (timestamp: number | string | undefined, dateString?: string): string => {
  if (dateString) {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }
  
  if (!timestamp) return 'N/A';
  
  let timestampNum: number;
  if (typeof timestamp === 'string') {
    timestampNum = new Date(timestamp).getTime() / 1000;
  } else {
    timestampNum = timestamp;
  }
  
  const date = new Date(timestampNum * 1000);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};


// Fetch news data from API
const fetchNewsData = async (pageIndex: number = 1, pageSize: number = 20, important: boolean = false): Promise<NewsItem[]> => {
  try {
    const url = `https://mydupoin.com/api/v1/pro/cms2/article/list?lang=en-US`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'lang': 'en-US',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8'
      },
      body: JSON.stringify({
        categoryId: 0,
        columnId: 4,
        pageIndex: pageIndex,
        pageSize: pageSize,
        important: important,
        windowId: 0,
        isDesc: true,
        lang: 'en-US',
        orderBy: 'publishedTime'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiArticleResponse = await response.json();
    
    // Handle different possible response structures
    let articles: ApiArticleItem[] = [];
    
    if (data.data) {
      articles = data.data.items || data.data.list || data.data.articles || [];
    } else if (data.items) {
      articles = data.items;
    } else if (Array.isArray(data)) {
      articles = data;
    }
    
    if (!articles || articles.length === 0) {
      return [];
    }
    
    // Transform API data to NewsItem format
    return articles.map((item, index): NewsItem => {
      const id = item.id || item.articleId || index;
      const title = item.title || 'News Article';
      const seotitle = item.seotitle || item.seoTitle || item.seo_title || undefined;
      const publishTime = item.publishTime;
      const publishDate = item.publishDate;
      const date = formatDate(publishTime, publishDate);
      
      return {
        id: id,
        title: title,
        seotitle: seotitle,
        date: date,
        publishTime: publishTime,
        publishDate: publishDate
      };
    });
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
};


export default function NewsFlashPage() {
  const [highImportanceOnly, setHighImportanceOnly] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch news data on component mount and when highImportanceOnly changes
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNewsData(1, 20, highImportanceOnly);
        setNewsItems(data);
        setPage(1);
        setHasMore(data.length >= 20);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    
    loadNews();
  }, [highImportanceOnly]);

  // Load more news
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await fetchNewsData(nextPage, 20, highImportanceOnly);
      if (data.length > 0) {
        setNewsItems(prev => [...prev, ...data]);
        setPage(nextPage);
        setHasMore(data.length >= 20);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more news');
    } finally {
      setLoading(false);
    }
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

          {/* Submenu Navigation */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-1">
              <a
                href="/economic-calendar"
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 transition-colors"
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
                className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600 transition-colors"
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

          {/* High Importance Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={highImportanceOnly}
                onChange={(e) => setHighImportanceOnly(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">High Importance</span>
            </label>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500 text-lg">Loading news...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="py-12 text-center">
              <p className="text-red-500 text-lg mb-4">Error: {error}</p>
              <button
                onClick={async () => {
                  setLoading(true);
                  setError(null);
                  try {
                    const data = await fetchNewsData(1, 20, highImportanceOnly);
                    setNewsItems(data);
                    setPage(1);
                    setHasMore(data.length >= 20);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to load news');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Results Count */}
          {!loading && !error && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {newsItems.length} {newsItems.length === 1 ? 'article' : 'articles'}
            </div>
          )}

          {/* News Table */}
          {!loading && !error && newsItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">
                {highImportanceOnly ? 'No high importance news found.' : 'No news found.'}
              </p>
            </div>
          ) : !loading && !error && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SEO Title
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newsItems.map((news) => (
                    <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {news.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {news.seotitle || news.title || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Load More Button */}
          {!loading && !error && hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Load More News
              </button>
            </div>
          )}
          {!loading && !error && !hasMore && newsItems.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">No more news to load</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

