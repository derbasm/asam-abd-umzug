/**
 * Performance monitoring utilities
 */

// Measure page load performance
export function measurePageLoad() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
      const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Page Load Performance:', {
          loadTime: `${loadTime}ms`,
          domContentLoaded: `${domContentLoaded}ms`,
          firstContentfulPaint: perfData.responseEnd - perfData.requestStart
        });
      }
    });
  }
}

// Measure Core Web Vitals
export function measureCoreWebVitals() {
  if (typeof window !== 'undefined') {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', (entry as any).value);
          }
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
}
