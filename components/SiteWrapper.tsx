'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalyticsBeacon from '@/components/AnalyticsBeacon';
import { FooterData } from '@/lib/types';

interface SiteWrapperProps {
  children: React.ReactNode;
  footerData: FooterData;
}

export default function SiteWrapper({ children, footerData }: SiteWrapperProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the main site layout for public-facing pages.
  const isPublicRoute = isClient && !pathname.startsWith('/admin') && pathname !== '/login';

  if (!isPublicRoute) {
    return <>{children}</>; // For admin/login, render children directly without the wrapper.
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar footerData={footerData} />
      <main className="flex-grow">{children}</main>
      <AnalyticsBeacon />
      <Footer data={footerData} />
    </div>
  );
}