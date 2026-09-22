import Link from 'next/link';

export default function ServicesCards() {
  const services = [
    {
      tag: 'PMC',
      title: 'Project Management & Consultancy',
      image: '/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg',
      href: '/services/pmc',
      desc: 'FEED review, technical consultancy, client representation, and full onshore/offshore execution management.',
    },
    {
      tag: 'T&I',
      title: 'Transportation & Installation',
      image: '/assets/img/65d40ba94f193551362148d7_TI86.png',
      href: '/services/transport-installation',
      desc: 'Heavy lift, offshore jacket launch, topsides float-over, subsea flowline laying, and dynamic positioning spreads.',
    },
    {
      tag: 'O&M',
      title: 'Operations & Maintenance',
      image: '/assets/img/65d407d1d8b67f4dedd837f4_20170309_164902.jpg',
      href: '/services',
      desc: 'Turnkey marine terminal operations, AHTS support, CALM buoy preventative overhauls, and offshore logistics.',
    },
    {
      tag: 'AIM',
      title: 'Asset Integrity Management',
      image: '/assets/img/692b8093fa6b54589904f7a2_20161015_133338.jpg',
      href: '/services/asset-integrity',
      desc: 'Subsea saturation diving, robotic ROV surveys, non-destructive testing (NDT), and structural life extension.',
    },
  ];

  return (
    <section className="home-four-service">
      <div className="w-layout-blockcontainer home-four-service-container w-container">
        <div className="home-four-service-flex">
          <div className="home-four-service-title-block">
            <div className="tag">Our Services</div>
            <h2 className="heading-2">Comprehensive Offshore Solutions</h2>
            <p className="home-four-service-paragraph-block">
              We deliver a wide range of offshore construction, project management and consultancy services for subsea and surface installations.
            </p>
          </div>
        </div>

        {/* 4 Pillar Grid */}
        <div className="w-layout-grid home-four-services-grid">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="home-four-service-card overflow-hidden"
              style={{
                position: 'relative',
                borderRadius: '8px',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              <img
                src={s.image}
                alt={s.title}
                width={300}
                height={448}
                className="responsive-full-width cover-image"
                style={{
                  height: '448px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div className="home-four-services-card-content">
                <div className="home-four-services-card-tag-block padding-bottom-ten">
                  <div className="home-four-services-card-tag">{s.tag}</div>
                </div>
                <div className="service-one-text-block padding-bottom-fifteen">
                  {s.title}
                </div>
                <div className="inline-btn-flex">
                  <Link href={s.href} className="learn-more-btn text-color-white w-inline-block">
                    <span style={{ whiteSpace: 'nowrap' }}>Learn More</span>
                    <img
                      src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                      alt="White Arrow"
                      width="18"
                      height="10"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Central Action Buttons */}
      <div className="talk-flex-copy" style={{ marginTop: '40px' }}>
        <div className="w-layout-layout wf-layout-layout" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <div className="w-layout-cell" style={{ textAlign: 'center' }}>
            <a
              href="/assets/docs/MTS_Offshore_Capability_Statement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="body-button bg-dark-pmg-blue w-inline-block"
            >
              <div className="text-block-2">MTS OFFSHORE Capability Statement</div>
            </a>
          </div>
          <div className="w-layout-cell" style={{ textAlign: 'center' }}>
            <a
              href="/assets/images/iso_certs.png"
              target="_blank"
              rel="noopener noreferrer"
              className="body-button bg-dark-pmg-blue w-inline-block"
            >
              <div className="text-block-2">MTS OFFSHORE ISO Certificates</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
