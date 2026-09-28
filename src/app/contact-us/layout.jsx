const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  title: 'Contact Us - Offshore Project Consultation & Inquiries',
  description:
    'Get in touch with MTS OFFSHORE Group for technical consultations, SPM terminal maintenance campaigns, subsea engineering reviews, and tender inquiries.',
  keywords: [
    'contact MTS Offshore',
    'offshore consultation',
    'SPM maintenance quote',
    'subsea engineering inquiry',
    'offshore tender',
  ],
  alternates: {
    canonical: '/contact-us',
  },
  openGraph: {
    title: 'Contact MTS OFFSHORE Group',
    description:
      'Reach out to our global technical team for offshore construction, PM&C, and SPM marine terminal solutions.',
    url: `${SITE_URL}/contact-us`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact MTS OFFSHORE Group',
      },
    ],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
