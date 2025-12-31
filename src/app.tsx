import { useEffect, useState, useCallback } from 'react';
import HomePage from './pages/home';
import EconomicCalendarPage from './pages/economic-calendar';
import NewsFlashPage from './pages/newsflash';
import './styles/globals.css';

export interface AppProps {
  initialPathname?: string;
}

function usePathname(initialPathname?: string) {
  // Get initial pathname from props (SSR) or window (client)
  const [pathname, setPathname] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return initialPathname || '/';
  });

  const updatePathname = useCallback((newPath?: string) => {
    if (typeof window !== 'undefined') {
      setPathname(newPath || window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial pathname on client mount
    updatePathname();

    const handlePopState = () => {
      updatePathname();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updatePathname]);

  return { pathname, updatePathname };
}

export default function App({ initialPathname }: AppProps = {}) {
  const { pathname, updatePathname } = usePathname(initialPathname);

  // Handle client-side navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Skip external links, mailto, and anchors
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
        return;
      }

      // Skip if it's the same path
      if (href === window.location.pathname) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      
      // Update URL and pathname
      window.history.pushState({ path: href }, '', href);
      updatePathname(href);
    };

    // Use capture phase to catch events early
    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [updatePathname]);

  // Route based on pathname
  switch (pathname) {
    case '/economic-calendar':
      return <EconomicCalendarPage />;
    case '/newsflash':
      return <NewsFlashPage />;
    case '/':
    default:
      return <HomePage />;
  }
}
