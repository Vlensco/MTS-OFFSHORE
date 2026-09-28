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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
    template: '%s | MTS OFFSHORE Group',
  },
  description:
    'MTS OFFSHORE Group delivers tier-one offshore construction, SPM marine terminal maintenance, subsea flowline installation, transport & installation (T&I), and global project management.',
  keywords: [
    'MTS Offshore',
    'offshore construction',
    'Single Point Mooring',
    'SPM systems',
    'CALM buoy inspection',
    'CALM buoy maintenance',
    'subsea flowline installation',
    'project management and consultancy',
    'PMC offshore',
    'transport and installation',
    'asset integrity management',
    'marine terminal services',
    'EPCI offshore',
    'Kumul Marine Terminal',
    'offshore engineering',
    'subsea stability',
  ],
  authors: [{ name: 'MTS OFFSHORE Group', url: SITE_URL }],
  creator: 'MTS OFFSHORE Group',
  publisher: 'MTS OFFSHORE Group',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
    description:
      'MTS OFFSHORE Group delivers tier-one offshore construction, SPM marine terminal maintenance, subsea flowline installation, transport & installation (T&I), and global project management.',
    url: SITE_URL,
    siteName: 'MTS OFFSHORE Group',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MTS OFFSHORE Group - Global Offshore & Subsea Specialists',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
    description:
      'Lean, responsive, and experienced — delivering safe and efficient PM&C, T&I, and marine terminal services worldwide.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#002b49',
};

// Structured Data (JSON-LD)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'MTS OFFSHORE Group',
  alternateName: 'MTS Offshore',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/mts_logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    'Specialists in Offshore Construction, Single Point Mooring (SPM) Systems, Marine Terminal Operations & Maintenance, and Global Project Management.',
  knowsAbout: [
    'Single Point Mooring Systems',
    'CALM Buoy Maintenance',
    'Subsea Flowline Installation',
    'Offshore Transport and Installation',
    'Project Management and Consultancy (PMC)',
    'Asset Integrity Management',
  ],
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${SITE_URL}/contact-us`,
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MTS OFFSHORE Group',
  url: SITE_URL,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <ContentProvider>
          <TextRevealObserver />
          <Header />
          <main id="main-content">{children}</main>
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
