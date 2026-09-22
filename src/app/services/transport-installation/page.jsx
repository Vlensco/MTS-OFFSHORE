import Link from 'next/link';
import ProjectsSection from '../../../components/ProjectsSection';

export const metadata = {
  title: 'Transportation & Installation (T&I) | MTS OFFSHORE',
  description: 'Specialist offshore transport, heavy-lift logistics, and marine installation services for topsides, moorings, and subsea structures.',
};

export default function TIPage() {
  return (
    <>
      <div className="home-four-hero" style={{ height: '480px' }}>
        <div
          className="home-four-hero-puzzle-wrapper"
          style={{
            backgroundImage:
              'linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.75)), url("/assets/images/mts_ti_heavylift.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="home-four-content-block-container" style={{ paddingTop: '80px' }}>
            <div className="home-four-content-block">
              <div className="tag-two-block padding-bottom-ten">
                <div className="tag-two">HEAVY MARINE LOGISTICS</div>
              </div>
              <h1 className="text-color-white text-center padding-bottom-ten">
                Transportation &amp; Installation (T&amp;I)
              </h1>
              <p className="home-four-hero-description text-center padding-bottom-twenty light-color-text" style={{ maxWidth: '720px', margin: '0 auto 24px' }}>
                Safe and precise marine transportation, loadout, mooring installation, and topsides float-over for complex offshore energy facilities.
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
                T&amp;I SOLUTIONS
              </div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.2rem', fontWeight: '800', color: '#0c3247', marginBottom: '20px' }}>
                Full-Scope Marine Spread Management
              </h2>
              <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
                From engineering loadout calculations to offshore anchor handling tugs and crane vessel operations, we ensure seamless mobilization and installation.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', listStyle: 'none', paddingLeft: 0 }}>
                {[
                  'Barge Loadout & Ballasting Operations',
                  'FPSO / FSO Pre-Lay Mooring Lines',
                  'Jacket Setting & Heavy Lifting',
                  'Offshore Hook-up & Tow Assistance',
                  'Subsea Spool & Manifold Placement',
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', fontWeight: '600' }}>
                    <span style={{ color: '#f26522' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact-us" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-2">Request T&amp;I Proposal</div>
              </Link>
            </div>
            <div>
              <img
                src="/assets/images/mts_ti_heavylift.jpg"
                alt="Transportation & Installation"
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
