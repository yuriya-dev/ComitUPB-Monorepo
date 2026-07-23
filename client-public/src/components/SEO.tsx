'use client';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { siteConfig } from '@/config/site';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title,
  description = siteConfig.description,
  keywords = [
    'ComitUPB',
    'Komunitas IT Kebumen',
    'Komunitas IT Pelita Bangsa',
    'Universitas Putra Bangsa',
    'Web Development',
    'Cyber Security',
    'Data Science',
    'Mobile Development',
    'UI/UX Design',
    'Mahasiswa IT Kebumen',
  ],
  image = '/logo.svg',
  url = siteConfig.url || 'https://comitupb.org',
  type = 'website',
}: SEOProps) {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.fullName}`;

  return (
    <Helmet>
      {/* HTML Title & Canonical */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={url} />

      {/* Favicon & Icons */}
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="apple-touch-icon" href="/logo.svg" />
      <link rel="shortcut icon" href="/logo.svg" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {/* Structured Data / JSON-LD Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.name,
          alternateName: siteConfig.fullName,
          url: url,
          logo: `${url}/logo.svg`,
          description: description,
          sameAs: [
            'https://instagram.com/comitupb',
            'https://github.com/comitupb',
          ],
        })}
      </script>
    </Helmet>
  );
}

export { HelmetProvider };
