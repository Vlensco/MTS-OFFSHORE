import ProjectsPortfolioGrid from '../../components/ProjectsPortfolioGrid';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export const metadata = {
  title: 'Featured Offshore Projects & Track Record',
  description:
    'Explore our proven track record delivering offshore construction, SPM terminal overhauls, subsea flowlines, and marine campaigns worldwide.',
  keywords: [
    'offshore projects',
    'subsea project portfolio',
    'SPM overhaul case studies',
    'Kumul Marine Terminal',
    'Santos projects',
    'offshore track record',
  ],
  alternates: {
    canonical: '/project',
  },
  openGraph: {
    title: 'Featured Offshore Projects | MTS OFFSHORE Group',
    description:
      'Proven execution in complex offshore environments: subsea flowlines, CALM buoy turnarounds, and platform rejuvenations.',
    url: `${SITE_URL}/project`,
    images: [
      {
        url: '/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg',
        width: 1200,
        height: 630,
        alt: 'MTS Offshore Featured Projects',
      },
    ],
  },
};

export default function ProjectPage() {
  return (
    <>
      {/* Hero Banner (Matching Pan Marina Screenshot) */}
      <div
        style={{
          position: 'relative',
          height: '380px',
          backgroundImage:
            'linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.75)), url("/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="single-line-tag tag-white" style={{ marginBottom: '12px' }}>
            RECENT PROJECTS
          </div>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Our Featured Projects
          </h1>
        </div>
      </div>

      {/* 2-Column Projects Grid with Interactive Cursor-Tracking Yellow View Project Badge */}
      <ProjectsPortfolioGrid />
    </>
  );
}
