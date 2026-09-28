import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/animations.css';
import '../css/mobile-responsive.css';

import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import TextRevealObserver from '../components/TextRevealObserver';
import { ContentProvider } from '../context/ContentContext';

export const metadata = {
  metadataBase: new URL('https://mtsoffshore.com'),
  title: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
  description: 'MTS OFFSHORE Group excels in offshore construction, SPM marine terminal maintenance, subsea flowline installation, and offshore project management worldwide.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
    description: 'MTS OFFSHORE Group excels in offshore construction, SPM marine terminal maintenance, subsea flowline installation, and offshore project management worldwide.',
    url: 'https://mtsoffshore.com',
    siteName: 'MTS OFFSHORE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MTS OFFSHORE Group Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MTS OFFSHORE Group',
    description: 'Specialists in Offshore Construction & Project Management',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/panmarina_shared.css" />
      </head>
      <body>
        <ContentProvider>
          <TextRevealObserver />
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ContentProvider>
        <Script src="/assets/js/jquery-3.5.1.min.dc5e7f18c8.js" strategy="afterInteractive" />
        <Script src="/assets/js/webflow.schunk.4621b44054c4cc64.js" strategy="afterInteractive" />
        <Script src="/assets/js/webflow.schunk.8d02f22f8e77c999.js" strategy="afterInteractive" />
        <Script src="/assets/js/webflow.dcbb3992.8875fdb5b8506d77.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
