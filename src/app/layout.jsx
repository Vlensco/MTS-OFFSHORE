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

export const metadata = {
  title: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
  description: 'MTS OFFSHORE Group excels in offshore construction, SPM marine terminal maintenance, subsea flowline installation, and offshore project management worldwide.',
  icons: {
    icon: '/favicon.svg',
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
        <TextRevealObserver />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <Script src="/assets/js/jquery-3.5.1.min.dc5e7f18c8.js" strategy="afterInteractive" />
        <Script src="/assets/js/webflow.schunk.4621b44054c4cc64.js" strategy="afterInteractive" />
        <Script src="/assets/js/webflow.schunk.8d02f22f8e77c999.js" strategy="afterInteractive" />
        <Script src="/assets/js/webflow.dcbb3992.8875fdb5b8506d77.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
