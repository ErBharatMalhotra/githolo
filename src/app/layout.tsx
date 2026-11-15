import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#00f5ff',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://githolo.bharatdn.com'),
  alternates: {
    canonical: './',
  },
  title: {
    default: 'GitHolo — 3D Holographic Developer Trading Card Generator',
    template: '%s | GitHolo',
  },
  description:
    'Turn your GitHub stats into legendary 3D holographic collectible cards. Free, open-source, zero watermarks. WebGL shaders, real-time data.',
  keywords: [
    'GitHub 3D cards',
    'holographic trading cards',
    'developer profile cards',
    'WebGL shaders',
    'GitHolo',
    'Bharat Malhotra',
    'GitHub visualization',
  ],
  authors: [{ name: 'Bharat Malhotra', url: 'https://bharatdn.com' }],
  creator: 'ErBharatMalhotra',
  publisher: 'GitHolo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-githolo.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icon-githolo.svg', type: 'image/svg+xml', sizes: '32x32' },
      { url: '/icon-githolo.svg', type: 'image/svg+xml', sizes: '16x16' },
    ],
    shortcut: '/icon-githolo.svg',
    apple: '/apple-touch-icon.svg',
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon.svg' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#00f5ff',
  colorScheme: 'dark',
  openGraph: {
    title: 'GitHolo — 3D Holographic Developer Trading Cards',
    description:
      'Turn your GitHub stats into legendary 3D holographic collectible cards. Free, open-source, zero watermarks.',
    url: 'https://githolo.bharatdn.com',
    siteName: 'GitHolo',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-githolo.svg',
        width: 1200,
        height: 630,
        alt: 'GitHolo — 3D Holographic Developer Trading Cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHolo — 3D Holographic Developer Trading Cards',
    description:
      'Turn your GitHub stats into legendary 3D holographic collectible cards. Free, open-source, zero watermarks.',
    images: ['/og-githolo.svg'],
    creator: '@ErBharatMalhotra',
    site: '@ErBharatMalhotra',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'GitHolo',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Cloud',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              author: {
                '@type': 'Person',
                name: 'Bharat Malhotra',
                url: 'https://bharatdn.com',
                sameAs: ['https://github.com/ErBharatMalhotra', 'https://twitter.com/ErBharatMalhotra'],
              },
              featureList: [
                '3D Holographic WebGL Shaders',
                'Real-time GitHub data',
                'Profile & Repository cards',
                'Zero watermarks, fully open source',
                'Custom themes & animations',
                'Export as image/video',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#05080f] text-[#f1f5f9] selection:bg-[#00f5ff]/30 selection:text-[#00f5ff] antialiased">
        {children}
      </body>
    </html>
  );
}