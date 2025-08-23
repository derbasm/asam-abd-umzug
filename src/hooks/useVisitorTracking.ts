import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useVisitorTracking() {
  const pathname = usePathname();
  const hasTracked = useRef(new Set<string>());

  useEffect(() => {
    const trackVisitor = async () => {
      // Prevent duplicate tracking for the same session and path
      if (hasTracked.current.has(pathname)) {
        return; // Already tracked this path in this session
      }

      try {
        hasTracked.current.add(pathname);
        
        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname
          })
        });
      } catch (error) {
        console.error('Visitor tracking failed:', error);
        // Remove from tracked set on error so it can be retried
        hasTracked.current.delete(pathname);
      }
    };

    // Only track once per pathname per session
    trackVisitor();

    // Optional: Track on page visibility change (but only if not already tracked)
    const handleVisibilityChange = () => {
      if (!document.hidden && !hasTracked.current.has(pathname)) {
        trackVisitor();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);
}
