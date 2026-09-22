import ProjectsPortfolioGrid from '../../components/ProjectsPortfolioGrid';

export const metadata = {
  title: 'Our Featured Projects | MTS OFFSHORE',
  description:
    'Explore our comprehensive track record of successfully delivered offshore construction, SPM terminal overhauls, subsea flowlines, and marine campaigns worldwide.',
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
