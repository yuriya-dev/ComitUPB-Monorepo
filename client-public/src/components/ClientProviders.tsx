'use client';

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from '@/components/SEO';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <SEO />
      {children}
    </HelmetProvider>
  );
}
