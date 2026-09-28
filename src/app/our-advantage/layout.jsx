const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  title: 'Our Advantage - Proven Expertise & Agile Execution',
  description:
    'Discover why global operators partner with MTS OFFSHORE: over 50 years of Tier-1 collaboration, proven incident-free offshore execution, and independent agility.',
  keywords: [
    'MTS offshore advantage',
    'Tier-1 offshore experience',
    'safe offshore operations',
    'agile offshore engineering',
    'maritime consultancy',
    'IMCA compliance',
  ],
  alternates: {
    canonical: '/our-advantage',
  },
  openGraph: {
    title: 'Our Advantage | MTS OFFSHORE Group',
    description:
      'Built on experience, driven by performance. Over 50 years delivering complex offshore construction and subsea solutions.',
    url: `${SITE_URL}/our-advantage`,
    images: [
      {
        url: '/assets/images/mts_hero_cinematic.jpg',
        width: 1200,
        height: 630,
        alt: 'MTS Offshore Advantage',
      },
    ],
  },
};

export default function AdvantageLayout({ children }) {
  return children;
}
