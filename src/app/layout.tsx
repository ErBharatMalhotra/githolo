import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'GitHolo — 3D Holographic Developer Trading Card Generator',
  description: 'Turn your GitHub stats into legendary 3D holographic collectible cards. Free, open-source, zero watermarks.',
  metadataBase: new URL('https://githolo.bharatdn.com'),
  openGraph: {
    title: 'GitHolo — 3D Holographic Developer Trading Cards',
    description: 'Turn your GitHub stats into legendary 3D holographic collectible cards. Free, open-source, zero watermarks.',
    url: 'https://githolo.bharatdn.com',
    siteName: 'GitHolo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHolo — 3D Holographic Developer Trading Cards',
    description: 'Turn your GitHub stats into legendary 3D holographic collectible cards. Free, open-source, zero watermarks.',
    creator: '@ErBharatMalhotra',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
