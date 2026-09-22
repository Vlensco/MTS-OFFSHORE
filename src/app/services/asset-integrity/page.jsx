import Link from 'next/link';
import ProjectsSection from '../../../components/ProjectsSection';

export const metadata = {
  title: 'Asset Integrity Management (AIM) | MTS OFFSHORE',
  description: 'Offshore asset life extension, non-destructive testing (NDT), structural steel remediation, and cathodic protection.',
};

export default function AssetIntegrityPage() {
  return (
    <>
      <div className="home-four-hero" style={{ height: '480px' }}>
        <div
          className="home-four-hero-puzzle-wrapper"
          style={{
            backgroundImage:
              'linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.75)), url("/assets/images/mts_subsea_aim.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="home-four-content-block-container" style={{ paddingTop: '80px' }}>
            <div className="home-four-content-block">
              <div className="tag-two-block padding-bottom-ten">
                <div className="tag-two">LIFETIME ASSET PRESERVATION</div>
              </div>
              <h1 className="text-color-white text-center padding-bottom-ten">
                Asset Integrity Management (AIM)
              </h1>
              <p className="home-four-hero-description text-center padding-bottom-twenty light-color-text" style={{ maxWidth: '720px', margin: '0 auto 24px' }}>
                Safeguarding critical offshore energy infrastructure through advanced inspection, rope access NDT, and brownfield maintenance campaigns.
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
                AIM CAPABILITIES
              </div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.2rem', fontWeight: '800', color: '#0c3247', marginBottom: '20px' }}>
                Extending the Operating Life of Offshore Assets
              </h2>
              <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
                We provide comprehensive inspection and maintenance programs that minimize downtime and ensure compliance with class requirements.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', listStyle: 'none', paddingLeft: 0 }}>
                {[
                  'Rope Access NDT Inspection (UT, MPI, Eddy Current)',
                  'Blast, Prime & Marine Protective Coating Systems',
                  'Platform Topsides Structural Steel Refurbishment',
                  'Cathodic Protection & Sacrificial Anode Surveys',
                  'Subsea Pipeline & Manifold Integrity Assurance',
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', fontWeight: '600' }}>
                    <span style={{ color: '#f26522' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact-us" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-2">Schedule Integrity Review</div>
              </Link>
            </div>
            <div>
              <img
                src="/assets/images/mts_subsea_aim.jpg"
                alt="Asset Integrity Management"
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
