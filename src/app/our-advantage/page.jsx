import Link from 'next/link';
import ProjectsSection from '../../components/ProjectsSection';

export const metadata = {
  title: 'Our Advantage | MTS OFFSHORE Group',
  description: 'Built On Experience. Driven By Performance. MTS OFFSHORE delivers world-class offshore project management, T&I, and subsea construction.',
};

export default function OurAdvantagePage() {
  return (
    <>
      {/* Advantage Hero */}
      <div className="home-four-hero" style={{ height: '520px' }}>
        <div
          className="home-four-hero-puzzle-wrapper"
          style={{
            backgroundImage:
              'linear-gradient(rgba(5, 19, 41, 0.5), rgba(5, 19, 41, 0.7)), url("/assets/images/mts_hero_cinematic.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="home-four-content-block-container" style={{ paddingTop: '80px' }}>
            <div className="home-four-content-block">
              <div className="tag-two-block padding-bottom-ten">
                <div className="tag-two">OUR ADVANTAGE</div>
              </div>
              <h1 className="text-color-white text-center padding-bottom-ten">
                Built On Experience.<br />Driven By Performance.
              </h1>
              <p className="home-four-hero-description text-center padding-bottom-twenty light-color-text" style={{ maxWidth: '740px', margin: '0 auto 24px' }}>
                MTS OFFSHORE Group delivers world-class offshore project management, transport and installation (T&amp;I), and subsea construction services, backed by over 50 years of Tier-1 leadership experience.
              </p>
              <div className="home-one-hero-btn-flex home-four-flex-center">
                <Link href="/contact-us" className="body-button bg-dark-pmg-blue w-inline-block">
                  <div className="text-block">Contact Us</div>
                  <img
                    width="20"
                    height="12"
                    src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                    alt="White Medium Arrow"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <section className="section" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ marginBottom: '40px' }}>
            <div className="single-line-tag">WHY MTS OFFSHORE</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0c3247', margin: '4px 0 0' }}>
              Built On Trust, Safety &amp; Technical Agility
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ padding: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', borderTop: '4px solid #006699' }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.35rem', fontWeight: '700', marginBottom: '14px', color: '#0c3247' }}>
                Tier-1 Technical Expertise
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Our management team has successfully delivered high-stakes offshore construction, T&amp;I, and FPSO installation campaigns across Asia, Africa, and the Middle East.
              </p>
            </div>

            <div style={{ padding: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', borderTop: '4px solid #f26522' }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.35rem', fontWeight: '700', marginBottom: '14px', color: '#0c3247' }}>
                Hands-On Leadership
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '0.95rem' }}>
                We are driven by a commitment to operational excellence, efficiency, and performance. MTS OFFSHORE provides clients with a dependable partner capable of executing critical scopes.
              </p>
            </div>

            <div style={{ padding: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', borderTop: '4px solid #e5a93b' }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.35rem', fontWeight: '700', marginBottom: '14px', color: '#0c3247' }}>
                Focused On Safety
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '0.95rem' }}>
                All operations are delivered in compliance with international HSE standards, project-specific requirements, and permit-to-work systems. Safety underpins every decision we make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-surface" style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div className="single-line-tag">
                OUR CAPABILITIES
              </div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.4rem', fontWeight: '800', color: '#0c3247', lineHeight: '1.2', marginBottom: '20px' }}>
                End-To-End Offshore Construction Expertise.
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '28px' }}>
                Our team has delivered complex FPSO moorings, SPM systems, pipelay, diving, and T&amp;I campaigns for global clients and national operators.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', paddingLeft: 0, listStyle: 'none' }}>
                {[
                  'Single Point Mooring (SPM) Systems & Overhaul',
                  'Inspection, Repairs & Maintenance (IRM)',
                  'Topsides, Substructure and General Offshore Transport & Installation',
                  'SURF, Subsea Structure Construction and Diving Services',
                  'Pipelines and Cable Lay Campaigns',
                  'Onshore & Offshore Project Management & Consultancy',
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#1e293b' }}>
                    <span style={{ color: '#006699', fontWeight: 'bold' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-2">Explore All Services →</div>
              </Link>
            </div>

            <div>
              <img
                src="/assets/images/mts_ti_heavylift.jpg"
                alt="Offshore Construction Expertise"
                style={{ width: '100%', height: '460px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <ProjectsSection />
    </>
  );
}
