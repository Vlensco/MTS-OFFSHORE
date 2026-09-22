'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const capRef = useRef(null);
  const [isCapAnimated, setIsCapAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCapAnimated(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (capRef.current) {
      observer.observe(capRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const serviceOfferings = [
    {
      tag: 'PMC',
      title: 'Project Management & Consultancy',
      image: '/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg',
      href: '/services/pmc',
    },
    {
      tag: 'T&I',
      title: 'Transportation & Installation',
      image: '/assets/img/65d40ba94f193551362148d7_TI86.png',
      href: '/services/transport-installation',
    },
    {
      tag: 'O&M',
      title: 'Operations & Maintenance',
      image: '/assets/img/65d407d1d8b67f4dedd837f4_20170309_164902.jpg',
      href: '/services',
    },
    {
      tag: 'AIM',
      title: 'Asset Integrity Management',
      image: '/assets/img/692b8093fa6b54589904f7a2_20161015_133338.jpg',
      href: '/services/asset-integrity',
    },
  ];

  return (
    <>
      {/* SECTION 1: Top Hero Header */}
      <section className="service-one-hero-section">
        <div className="w-layout-blockcontainer service-one-hero-section-container w-container">
          <div className="service-one-hero-section-flex">
            {/* Left Title Column */}
            <div className="service-one-hero-title-block">
              <div className="service-one-tag-block">
                <div className="tag change-weight-medium">Our Services</div>
              </div>
              <div className="overflow-hidden">
                <h1 className="heading-3" style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)', fontWeight: 800, color: '#0c3247', lineHeight: '1.25', letterSpacing: '-0.015em', margin: '10px 0 0' }}>
                  Best In Class Offshore Construction &amp; Project Management Services
                </h1>
              </div>
            </div>

            {/* Right Paragraph & Action Column */}
            <div className="service-one-hero-section-paragraph">
              <p className="padding-bottom-fifteen" style={{ fontSize: '1.02rem', lineHeight: '1.65', color: '#4a5568' }}>
                MTS Group, boasting over 50 years of collaboration with top-tier EPC providers, offers flexible, agile solutions to asset owners. Our approach combines seasoned expertise with innovative practices, ensuring efficient, tailored results in offshore construction and project management.
              </p>
              <div className="btn-flex">
                <Link
                  href="/contact-us"
                  className="body-button bg-dark-pmg-blue w-inline-block"
                  style={{ backgroundColor: '#146cac', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <div className="text-block-13" style={{ fontWeight: 600 }}>Contact Us</div>
                  <img
                    src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                    alt="White Medium Arrow"
                    height={12}
                    width={20}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Hero Two-Column Image Showcase */}
      <section className="service-one-hero-image-section">
        <div className="w-layout-blockcontainer service-one-hero-image-container w-container">
          <div className="service-one-hero-image-flex overflow-hidden">
            <div style={{ flex: '1.4', minWidth: '0' }}>
              <img
                src="/assets/img/65d42c82ea20de5cb161c673_TI2.png"
                alt="Offshore Marine Operations"
                width={741}
                height={401}
                className="responsive-full-width cover-image"
                style={{ width: '100%', height: '401px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 16px 36px rgba(5, 19, 41, 0.12)' }}
              />
            </div>
            <div style={{ flex: '1', minWidth: '0' }}>
              <img
                src="/assets/img/65d42c823e182d08ae643b4f_TI1.png"
                alt="FPSO Tanker Offshore"
                width={519}
                height={401}
                className="responsive-full-width cover-image"
                style={{ width: '100%', height: '401px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 16px 36px rgba(5, 19, 41, 0.12)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Service Offerings (4 Pillars Grid) */}
      <section className="home-four-service" style={{ backgroundColor: '#f4f6f9', padding: '80px 0 90px' }}>
        <div className="w-layout-blockcontainer home-four-service-container w-container">
          <div className="home-four-service-flex" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div className="home-four-service-title-block" style={{ maxWidth: '600px' }}>
              <div className="service-one-project-management-tag">
                <div className="tag change-tag-letterspacing">
                  SERVICE OFFERINGS
                </div>
              </div>
              <h2 className="heading-4" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)', fontWeight: 800, color: '#0c3247', lineHeight: '1.25', margin: '10px 0 0' }}>
                Comprehensive Offshore Solutions
              </h2>
            </div>
            <p className="home-four-service-paragraph-block" style={{ maxWidth: '480px', color: '#556987', fontSize: '0.98rem', lineHeight: '1.6', margin: 0 }}>
              We deliver a wide range of offshore construction, project management and consultancy services for subsea and topsides installations.
            </p>
          </div>

          <div className="w-layout-grid home-four-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {serviceOfferings.map((s, idx) => (
              <div
                key={idx}
                className="home-four-service-card overflow-hidden"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  width={300}
                  height={440}
                  className="responsive-full-width cover-image"
                />
                <div className="home-four-services-card-content">
                  <div className="home-four-services-card-tag-block">
                    <div className="home-four-services-card-tag">{s.tag}</div>
                  </div>
                  <div className="service-one-text-block">
                    {s.title}
                  </div>
                  <div className="inline-btn-flex">
                    <Link href={s.href} className="learn-more-btn w-inline-block">
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
      </section>

      {/* SECTION 4: Our Capabilities */}
      <section className="why-choose-us-section" style={{ backgroundColor: '#ffffff', padding: '90px 0 100px' }}>
        <div className="w-layout-blockcontainer why-choose-us-section-container w-container">
          <div className="why-choose-us-section-flex" style={{ display: 'flex', alignItems: 'center', gap: '70px', flexWrap: 'wrap' }}>
            {/* Left Capabilities Content */}
            <div className="why-choose-us-section-content" style={{ flex: '1', minWidth: '320px' }}>
              <div className="service-one-project-management-tag">
                <div className="tag change-tag-letterspacing">
                  OUR CAPABILITIES
                </div>
              </div>
              <div className="overflow-hidden">
                <h2 className="margin-top-seventeen padding-bottom-fifteen" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)', fontWeight: 800, color: '#0c3247', lineHeight: '1.25', margin: '12px 0 16px' }}>
                  <strong className="bold-text">End-to-End Offshore Construction Expertise.</strong>
                </h2>
              </div>
              <p className="padding-bottom-thirteen width-five-hundred-ten" style={{ color: '#4a5568', fontSize: '1.02rem', lineHeight: '1.65', marginBottom: '24px' }}>
                Our team has delivered complex FPSO moorings, SPM systems, pipelay, diving, and T&amp;I campaigns for clients including Aramco, Shell, SBM Offshore, Chevron, and more.
              </p>

              <div className="gray-card-line" style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '26px' }} />

              <div className="w-layout-grid why-choose-us-grid margin-top-thirty-two">
                <ul role="list" className="service-one-list" style={{ listStyleType: 'square', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li className="home-two-why-choose-us-list-item text-color-light-black" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>
                    Single Point Mooring Systems
                  </li>
                  <li className="home-two-why-choose-us-list-item text-color-light-black" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>
                    Onshore &amp; Offshore Project Management &amp; Consultancy
                  </li>
                  <li className="home-two-why-choose-us-list-item text-color-light-black" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>
                    Inspection, Repairs &amp; Maintenance
                  </li>
                  <li className="home-two-why-choose-us-list-item text-color-light-black" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>
                    Floating Production &amp; Storage System Transport &amp; Installation
                  </li>
                  <li className="home-two-why-choose-us-list-item text-color-light-black" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>
                    Subsea Construction and Diving
                  </li>
                  <li className="home-two-why-choose-us-list-item text-color-light-black" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>
                    Pipeline and Cable Lay
                  </li>
                </ul>
              </div>

              <div className="inline-btn-flex margin-top-twenty-six" style={{ marginTop: '32px' }}>
                <Link
                  href="/our-advantage"
                  className="body-button bg-dark-pmg-blue w-inline-block"
                  style={{ backgroundColor: '#146cac', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <div className="text-block-14" style={{ fontWeight: 600 }}>Learn More</div>
                  <img
                    src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                    alt="White Medium Arrow"
                    height={12}
                    width={20}
                  />
                </Link>
              </div>
            </div>

            {/* Right Capabilities Image with Animated Blue Accent Box */}
            <div ref={capRef} className="why-choose-us-section-image-block" style={{ flex: '1', minWidth: '320px', position: 'relative' }}>
              <div className="service-two-features-image-block-inner" style={{ position: 'relative' }}>
                {/* Decorative Blue Box with Slide-in Animation (matches home page) */}
                <div
                  className={`home-one-about-yellow-bg ${isCapAnimated ? 'is-animated' : 'is-initial'}`}
                  style={{
                    backgroundColor: '#146cac',
                    width: '280px',
                    height: '320px',
                    position: 'absolute',
                    right: '-24px',
                    bottom: '-24px',
                    zIndex: 0,
                    borderRadius: '10px',
                    transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
                    transform: isCapAnimated ? 'translate(0, 0)' : 'translate(-38px, -38px)',
                    opacity: isCapAnimated ? 1 : 0,
                    pointerEvents: 'none',
                  }}
                />

                <div className="creative-image-block" style={{ position: 'relative', zIndex: 1, borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5, 19, 41, 0.14)' }}>
                  <img
                    src="/assets/img/65d42addbadc4b36cf019683_20200121_134838.jpg"
                    alt="Offshore Pipeline Flange Bolting"
                    height={520}
                    width={531}
                    className="responsive-full-width cover-image"
                    style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Recent Projects Showcase */}
      <section className="why-choose-us-project" style={{ backgroundColor: '#ffffff', padding: '10px 0 110px' }}>
        <div className="w-layout-blockcontainer why-choose-us-project-container w-container">
          <div className="service-one-project-management-tag">
            <div className="tag change-tag-letterspacing">
              Built for Offshore. Trusted Worldwide.
            </div>
          </div>
          <h2 className="bold-text" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)', fontWeight: 800, color: '#0c3247', margin: '10px 0 36px' }}>
            <strong>Recent Projects.</strong>
          </h2>

          <div className="w-layout-grid why-choose-us-work-grid">
            {/* Column 1: Yellow SPM Deck Structure */}
            <div className="why-choose-us-work-block">
              <div className="why-choose-us-work-block-overlay" />
              <img
                src="/assets/img/69c03cc860a13c5a7bd11c8d_DJI_20260214070435_0974_D.JPG"
                alt="Subsea and Floating Flowline Installation"
                width={502}
                height={486}
                className="responsive-full-width cover-image"
                style={{ width: '100%', height: '486px', objectFit: 'cover' }}
              />
              <Link
                href="/project/pro2504-mpl"
                className="why-choose-us-work-block-plus"
                title="View Project"
              >
                <img
                  src="/assets/img/65d4023f0fe16f42cb1837f4_Black_Plus.svg"
                  alt="Plus Icon"
                  width={16}
                  height={16}
                />
              </Link>
            </div>

            {/* Column 2: Crane Lifting Offshore Container */}
            <div className="why-choose-us-work-block">
              <div className="why-choose-us-work-block-overlay" />
              <img
                src="/assets/img/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D.jpeg"
                alt="Kumul Marine Terminal Maintenance 2025"
                width={502}
                height={486}
                className="responsive-full-width cover-image"
                style={{ width: '100%', height: '486px', objectFit: 'cover' }}
              />
              <Link
                href="/project/santos-kumul-marine-terminal-maintenance-2025"
                className="why-choose-us-work-block-plus"
                title="View Project"
              >
                <img
                  src="/assets/img/65d4023f0fe16f42cb1837f4_Black_Plus.svg"
                  alt="Plus Icon"
                  width={16}
                  height={16}
                />
              </Link>
            </div>

            {/* Column 3: Two Stacked Photos */}
            <div className="w-layout-grid why-choose-us-work-grid-inner-grid" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '16px' }}>
              {/* Stack Top: CALM Buoy in Rough Sea */}
              <div className="why-choose-us-work-block" style={{ height: '235px' }}>
                <div className="why-choose-us-work-block-overlay" />
                <img
                  src="/assets/img/67b02679cc056d21a6f5593e_KMT_Campaign_.jpg"
                  alt="Inspection and Maintenance of CALM Buoy"
                  width={406}
                  height={235}
                  className="responsive-full-width cover-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Link
                  href="/project/santos-calm-buoy-inspection-maintenance-2024"
                  className="why-choose-us-work-block-plus"
                  title="View Project"
                >
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1837f4_Black_Plus.svg"
                    alt="Plus Icon"
                    width={16}
                    height={16}
                  />
                </Link>
              </div>

              {/* Stack Bottom: Technicians on Gangway */}
              <div className="why-choose-us-work-block" style={{ height: '235px' }}>
                <div className="why-choose-us-work-block-overlay" />
                <img
                  src="/assets/img/6886c8def384dd4d6106911d_P1062762.JPG"
                  alt="Platform Maintenance 2024"
                  width={406}
                  height={235}
                  className="responsive-full-width cover-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Link
                  href="/project/santos-platform-maintenance-2024"
                  className="why-choose-us-work-block-plus"
                  title="View Project"
                >
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1837f4_Black_Plus.svg"
                    alt="Plus Icon"
                    width={16}
                    height={16}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
