import AboutPageClient from '../../components/AboutPageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  title: 'About Us - Heritage & Tier-1 Global Offshore Experience',
  description:
    'MTS OFFSHORE Group brings over 50 years of collective leadership delivering offshore construction, SPM marine terminals, subsea stability engineering, and project management.',
  keywords: [
    'about MTS Offshore',
    'offshore construction company',
    'marine engineering leadership',
    'subsea experts',
    'offshore project team',
    'IMCA compliance',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | MTS OFFSHORE Group',
    description:
      'Lean, responsive, and experienced. Delivering safe, efficient offshore construction and marine terminal campaigns worldwide.',
    url: `${SITE_URL}/about`,
    images: [
      {
        url: '/assets/images/mts_hero_cinematic.jpg',
        width: 1200,
        height: 630,
        alt: 'About MTS OFFSHORE Group',
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
