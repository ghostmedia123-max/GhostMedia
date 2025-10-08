'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track pageviews in production environments
    if (process.env.NODE_ENV === 'production') {
      const url = '/api/track';
      const data = JSON.stringify({ path: pathname });
      // Use sendBeacon to send data without blocking page transitions
      navigator.sendBeacon(url, data);
    }
  }, [pathname]);

  return null; // This component does not render anything
}