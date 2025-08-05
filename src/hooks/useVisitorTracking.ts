import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useVisitorTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
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
      }
    };

    // Track immediately
    trackVisitor();

    // Track on page visibility change (return from background)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackVisitor();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);
}
