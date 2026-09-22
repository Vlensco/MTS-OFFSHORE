import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '../../../data/projectsData';
import LatestProjectsGrid from '../../../components/LatestProjectsGrid';

export async function generateStaticParams() {
  return PROJECTS.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found | MTS OFFSHORE' };

  return {
    title: `${project.title} | MTS OFFSHORE`,
    description: project.scope,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Project Top Title Banner */}
      <div style={{ backgroundColor: '#ffffff', padding: '48px 0 28px', borderBottom: '1px solid #eef2f6' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          {/* Back to Projects Button */}
          <div style={{ marginBottom: '18px' }}>
            <Link
              href="/project"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0072ce',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>←</span> Back to Projects
            </Link>
          </div>

          {/* Single-line Service Category Tag */}
          <div className="single-line-tag">
            {project.service}
          </div>

          {/* Project Title */}
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)',
              fontWeight: 800,
              color: '#0c3247',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              margin: '8px 0 0',
            }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Main Project Visual Banner */}
      <div
        style={{
          width: '100%',
          maxHeight: '540px',
          overflow: 'hidden',
          backgroundColor: '#0c3247',
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '540px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Scope of Work & Details Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#fcfcfd' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)',
              gap: '64px',
              alignItems: 'start',
            }}
            className="project-detail-content-grid"
          >
            {/* Scope Narrative Column */}
            <div>
              <div className="single-line-tag" style={{ marginBottom: '16px' }}>
                SCOPE OF WORK
              </div>

              <p
                style={{
                  color: '#334155',
                  fontSize: '1.05rem',
                  lineHeight: '1.85',
                  marginBottom: '32px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {project.scope}
              </p>

              {project.details && (
                <div style={{ marginBottom: '38px' }}>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0c3247',
                      marginBottom: '18px',
                    }}
                  >
                    Key Deliverables:
                  </h3>
                  <ul
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      listStyle: 'none',
                      paddingLeft: 0,
                      margin: 0,
                    }}
                  >
                    {project.details.map((d, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          color: '#1e293b',
                          fontSize: '0.98rem',
                          fontWeight: 600,
                          lineHeight: '1.5',
                        }}
                      >
                        <span
                          style={{
                            color: '#0072ce',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            lineHeight: '1',
                          }}
                        >
                          •
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <Link
                  href="/contact-us"
                  className="body-button bg-dark-pmg-blue w-inline-block"
                  style={{
                    backgroundColor: '#146cac',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    boxShadow: '0 4px 14px rgba(20, 108, 172, 0.25)',
                  }}
                >
                  <div className="text-block-2" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Discuss A Similar Campaign →
                  </div>
                </Link>
              </div>
            </div>

            {/* Project Specifications Card (Matching Photo 1 & 2) */}
            <div>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(5, 19, 41, 0.06)',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#0c3247',
                    color: '#ffffff',
                    padding: '18px 26px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  Project Details
                </div>

                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      Client
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c3247', lineHeight: '1.4' }}>
                      {project.client}
                    </div>
                  </div>

                  <div style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      Service
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c3247', lineHeight: '1.4' }}>
                      {project.service}
                    </div>
                  </div>

                  <div style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      Year
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c3247' }}>
                      {project.year}
                    </div>
                  </div>

                  <div style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      Project
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c3247', lineHeight: '1.4' }}>
                      {project.title}
                    </div>
                  </div>

                  <div style={{ paddingTop: '16px' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      Location
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c3247' }}>
                      {project.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section (2x2 Grid with Interactive Yellow "View Project" Hover Badge) */}
      <LatestProjectsGrid currentSlug={slug} />
    </>
  );
}
