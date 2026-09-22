import Link from 'next/link';
import ProjectsSection from '../../../components/ProjectsSection';

export const metadata = {
  title: 'Project Management & Consultancy (PMC) | MTS OFFSHORE',
  description: 'World-class offshore project management and consultancy services backed by seasoned maritime leadership.',
};

export default function PMCPage() {
  return (
    <>
      <div className="home-four-hero" style={{ height: '480px' }}>
        <div
          className="home-four-hero-puzzle-wrapper"
          style={{
            backgroundImage:
              'linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.75)), url("/assets/images/mts_pmc_control.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="home-four-content-block-container" style={{ paddingTop: '80px' }}>
            <div className="home-four-content-block">
              <div className="tag-two-block padding-bottom-ten">
                <div className="tag-two">EXECUTE WITH CONFIDENCE</div>
              </div>
              <h1 className="text-color-white text-center padding-bottom-ten">
                Project Management &amp; Consultancy
              </h1>
              <p className="home-four-hero-description text-center padding-bottom-twenty light-color-text" style={{ maxWidth: '720px', margin: '0 auto 24px' }}>
                MTS OFFSHORE Group delivers world-class offshore project management and consultancy services, backed by over 50 years of Tier-1 leadership experience.
              </p>
              <div className="home-one-hero-btn-flex home-four-flex-center">
                <Link href="/contact-us" className="body-button bg-dark-pmg-blue w-inline-block">
                  <div className="text-block">Contact Us →</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div className="single-line-tag">
                PMC CAPABILITIES
              </div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.2rem', fontWeight: '800', color: '#0c3247', marginBottom: '20px' }}>
                End-To-End Offshore Construction Expertise.
              </h2>
              <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
                MTS OFFSHORE&apos;s PMC services leverage decades of global offshore experience. Regardless of region or complexity, our team delivers dependability for energy asset owners.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', listStyle: 'none', paddingLeft: 0 }}>
                {[
                  'Constructability Reviews & Engineering Studies',
                  'Documentation & Procedure Creation & Review',
                  'Offshore Client Representation & Subcontractor Oversight',
                  'Interface Management & Logistics Coordination',
                  'Turnkey Offshore Campaign Execution',
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', fontWeight: '600' }}>
                    <span style={{ color: '#f26522' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact-us" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-2">Inquire Regarding PMC Scope</div>
              </Link>
            </div>
            <div>
              <img
                src="/assets/images/mts_hero_cinematic.jpg"
                alt="PMC Operations"
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />
    </>
  );
}
