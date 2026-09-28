const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  title: 'Single Point Mooring (SPM) Systems & CALM Buoy Services',
  description:
    'Full-cycle Single Point Mooring (SPM) solutions, CALM buoy inspection, hose string changeouts, telemetry calibration, and EPCI operations backed by over 50 years of global offshore experience.',
  keywords: [
    'Single Point Mooring',
    'SPM systems',
    'CALM buoy inspection',
    'CALM buoy overhaul',
    'hose changeout',
    'mooring telemetry calibration',
    'EPCI offshore',
    'offshore marine terminal',
    'Santos Kumul Marine Terminal',
  ],
  alternates: {
    canonical: '/single-point-mooring-systems',
  },
  openGraph: {
    title: 'Single Point Mooring (SPM) Systems | MTS OFFSHORE',
    description:
      'Engineering, Procurement, Construction, Installation (EPCI) and Operations & Maintenance (O&M) for CALM Buoys and SPM marine terminals globally.',
    url: `${SITE_URL}/single-point-mooring-systems`,
    images: [
      {
        url: '/assets/images/mts_spm_epic.jpg',
        width: 1200,
        height: 630,
        alt: 'MTS Offshore Single Point Mooring (SPM) Systems',
      },
    ],
  },
};

const spmServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Single Point Mooring (SPM) Systems & Operations',
  serviceType: 'Offshore Marine Terminal & Mooring Engineering',
  provider: {
    '@type': 'Corporation',
    name: 'MTS OFFSHORE Group',
  },
  description:
    'Full-cycle SPM EPCI and preventative maintenance campaigns including CALM buoy overhaul, subsea and floating hose changeouts, and telemetry system calibrations.',
  areaServed: 'Worldwide',
};

export default function SPMLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spmServiceSchema) }}
      />
      {children}
    </>
  );
}
