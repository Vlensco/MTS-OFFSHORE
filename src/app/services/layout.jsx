const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  title: 'Offshore Construction & Project Management Services',
  description:
    'Comprehensive offshore services including Project Management & Consultancy (PMC), Transportation & Installation (T&I), Asset Integrity Management, and SPM Systems.',
  keywords: [
    'offshore services',
    'project management consultancy',
    'PMC offshore',
    'transportation and installation',
    'T&I offshore',
    'asset integrity management',
    'subsea engineering',
    'offshore platform maintenance',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Offshore Construction & Project Management Services | MTS OFFSHORE',
    description:
      'Turnkey offshore services from project inception through subsea commissioning, structural rejuvenation, and platform lifecycle support.',
    url: `${SITE_URL}/services`,
    images: [
      {
        url: '/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg',
        width: 1200,
        height: 630,
        alt: 'MTS Offshore Services',
      },
    ],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
