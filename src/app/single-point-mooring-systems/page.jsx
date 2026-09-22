'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SPMPage() {
  // Intersection observers for creative image accent frames
  const [sec3Animated, setSec3Animated] = useState(false);
  const [sec4Animated, setSec4Animated] = useState(false);
  const [sec5Animated, setSec5Animated] = useState(false);

  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);

  useEffect(() => {
    const createObs = (setter) =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
        },
        { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
      );

    const obs3 = createObs(setSec3Animated);
    const obs4 = createObs(setSec4Animated);
    const obs5 = createObs(setSec5Animated);

    if (sec3Ref.current) obs3.observe(sec3Ref.current);
    if (sec4Ref.current) obs4.observe(sec4Ref.current);
    if (sec5Ref.current) obs5.observe(sec5Ref.current);

    return () => {
      obs3.disconnect();
      obs4.disconnect();
      obs5.disconnect();
    };
  }, []);

  // Section 2 Capabilities Data
  const capabilities = [
    {
      title: 'PROJECT MANAGEMENT',
      image: '/assets/img/6937955547f3f19cab2173bc_On_site_Training_Tanzainia_3.JPG',
      href: '/services/pmc',
    },
    {
      title: 'TRANSPORT & INSTALLATION',
      image: '/assets/img/6937948b492fc7e0a9c284b4_Buoy_Lift__5_.JPG',
      href: '/services/transport-installation',
    },
    {
      title: 'MOORING SYSTEM INSTALLATION',
      image: '/assets/img/65d40c6689b5e659b722318d_PC86.png',
      href: '/services/transport-installation',
    },
    {
      title: 'SUBSEA INSTALLATION',
      image: '/assets/img/65d42f6dfd1f245d084048a5_PMT2.png',
      href: '/services/transport-installation',
    },
    {
      title: 'FLOWLINE INSTALLATION',
      image: '/assets/img/69c040bdb0bd6707f3fccde4_DJI_20260214070435_0974_D.JPG',
      href: '/services/transport-installation',
    },
    {
      title: 'OVERHAUL & REFURBISHMENT',
      image: '/assets/img/69379528a31e1173b4aa81ee_20161018_081811.jpg',
      href: '/services/asset-integrity',
    },
  ];

  // Section 5 Asset items
  const assetTypes = [
    'Catenary Anchor Leg Mooring (CALM) Buoys',
    'Single Point Mooring (SPM) Systems',
    'Single Anchor Leg Mooring Systems (SALM)',
    'Floating, Production, Storage and Offloading (FPSO)',
    'Floating, Storage and Offloading (FSO)',
    'Floating Liquid Natural Gas (FLNG)',
    'Floating Storage and Regasification Unit (FSRU)',
    'Fixed Wellhead & Production Platform',
  ];

  // Section 6 Blue cards
  const blueCards = [
    {
      icon: '/assets/img/65d4023f0fe16f42cb1837e1_Project_Planning_White_Icons.svg',
      title: 'Tier-1 Technical Expertise',
      description:
        'Our management team have successfully delivered high-stakes offshore construction, T&I, and FPSO installation campaigns across Asia, Africa, and the Middle East.',
      href: '/about',
    },
    {
      icon: '/assets/img/65d4023f0fe16f42cb1837a9_Building_Construction_White.svg',
      title: 'Hands-On Leadership',
      description:
        'We are driven by a commitment to operational excellence, efficiency, and performance. MTS OFFSHORE provides clients with a dependable partner capable of executing critical scopes.',
      href: '/about',
    },
    {
      icon: '/assets/img/65d4023f0fe16f42cb1837df_Modern_Technology_White.svg',
      title: 'Focused On Safety',
      description:
        'All operations are delivered in compliance with international HSE standards, project-specific requirements, and permit-to-work systems. From vessel mobilisation to diving and T&I scopes, safety underpins every decision we make.',
      href: '/about',
    },
  ];

  // Section 8 SPM Management Experiences
  const spmExperiences = [
    {
      tag: 'Algeria',
      year: '2019',
      title: 'Arzew CALM Buoy Refurbishment Project',
      desc: 'Delivered end-to-end Algeria SPM refurbishment of 2x SOFEC buoys.',
      image: '/assets/img/693798a99af507446e85cdbc_20190108_102901.jpg',
    },
    {
      tag: 'Iraq',
      year: '2017',
      title: 'Iraq CALM Buoy Transport & Installation',
      desc: 'Full SPM 5 Buoy Installation, 6x Anchor Legs & Subsea Hoses and associated Pre-Commissioning.',
      image: '/assets/img/673beb2ab89a402d38109695_20170301_123429.jpeg',
    },
    {
      tag: 'Iraq',
      year: '2016',
      title: 'Iraq CALM Buoy Refurbishment & Dry Docking',
      desc: 'Full refurbishment SPM Buoy including SPM Main Bearing, CPU Bearing, All Valves.',
      image: '/assets/img/69379a7a8551da87aca7709a_20161018_081811.jpg',
    },
    {
      tag: 'Iraq',
      year: '2012',
      title: 'Iraq Crude Oil Expansion - SPM Transport & Installation',
      desc: 'Monitoring of all offshore SPM Installation works with regards to 3x Full SPM Buoy Installations. Client liaison / advisor for all associated installation works.',
      image: '/assets/img/673bea8708adff4c66fd15f8_Buoy_Lift__5_.JPG',
    },
    {
      tag: 'Sakhalin Island, Russia',
      year: '2008',
      title: 'SALM Buoy Salvage',
      desc: 'Disaster management, oil prevention and salvage of detached SALM buoy. Diving works on SALM base, closing of pipe-line valve, blanking off hard piping and air lifting of SALM base for inspection.',
      image: '/assets/img/673bf72d62dd00cec51cf6e5_RES_DSC2127.jpg',
    },
    {
      tag: 'Russia & Japan',
      year: '2008',
      title: 'SALM Repair, Installation & Commissioning',
      desc: 'Installation and commissioning of SALM Buoy (Sakhalin Russia). SALM Repair Works (Japan) Supervising of repair works to SALM Buoy in Japan. Preparations of towing arrangement and installation aids.',
      image: '/assets/img/673bf6cd3477712e48fee7c6_RES_DSC8495.jpg',
    },
  ];

  return (
    <>
      {/* =========================================================================
          SECTION 1: HERO (SAFE, EFFICIENT & RELIABLE)
          ========================================================================= */}
      <section className="spm-hero-section">
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="spm-hero-content">
            <div className="spm-hero-tag">
              SAFE, EFFICIENT &amp; RELIABLE
            </div>

            <h1 className="spm-hero-title">
              Single Point Mooring Systems
            </h1>

            <p className="spm-hero-desc">
              MTS OFFSHORE Group delivers full-cycle Single Point Mooring (SPM) System solutions backed by more than 50 years of global experience. Our expertise spans the complete Engineering, Procurement, Construction and Installation (EPCI) of all SPM system types. We also provide comprehensive Operations &amp; Maintenance (O&amp;M) services, offering full maintenance, refurbishment, dry-docking, and inspection capabilities for SPM assets.
            </p>

            <div className="spm-hero-actions">
              <Link href="/contact-us" className="spm-hero-btn">
                <span>Contact Us</span>
                <span style={{ fontSize: '1.15rem' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 6 SPM CAPABILITIES GRID
          ========================================================================= */}
      <section id="spm-capabilities" style={{ padding: '80px 0 90px', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="spm-capabilities-grid">
            {capabilities.map((item, idx) => (
              <Link key={idx} href={item.href} className="spm-capability-card">
                <div className="spm-capability-img-wrap">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="spm-capability-title">{item.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SPM SYSTEMS EXPLAINED (Reliable Marine Terminal Solutions)
          ========================================================================= */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="spm-two-col-grid">
            <div>
              <div className="single-line-tag">SPM SYSTEMS EXPLAINED</div>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.2,
                  margin: '14px 0 20px',
                }}
              >
                Reliable Marine Terminal Solutions
              </h2>
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: '#475569',
                  marginBottom: '28px',
                }}
              >
                CALM Buoy systems are securely moored offshore, allowing cargo operations to
                proceed safely in nearly all weather and sea conditions. Floating hoses, which rotate
                with the tanker around the SPM, link the vessel's cargo manifolds to the terminal.
                Additional hoses connect the underside of the SPM to the subsea pipelines on the
                seabed via a Pipeline End Manifold (PLEM).
              </p>
              <Link href="/contact-us" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-10">Contact Us</div>
                <span style={{ fontSize: '1.15rem', marginLeft: '6px' }}>→</span>
              </Link>
            </div>

            <div ref={sec3Ref} style={{ position: 'relative' }}>
              <div
                className={`home-one-about-yellow-bg ${sec3Animated ? 'is-animated' : 'is-initial'}`}
              />
              <div
                className="creative-image-block"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(5, 19, 41, 0.12)',
                }}
              >
                <img
                  src="/assets/img/65d42b949551f31fe9f72a8b_IMG_20181228_172705.jpg"
                  alt="Marine Terminal Flange Operations"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR ADVANTAGE (Major Project Experience, Delivered with Agility)
          ========================================================================= */}
      <section style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="spm-two-col-grid">
            <div ref={sec4Ref} style={{ position: 'relative' }}>
              <div
                className={`home-one-about-yellow-bg ${sec4Animated ? 'is-animated' : 'is-initial'}`}
              />
              <div
                className="creative-image-block"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(5, 19, 41, 0.12)',
                }}
              >
                <img
                  src="/assets/img/69379730c6c6232f46ca69d1_20190108_102901.jpg"
                  alt="Offshore SPM Installation Crane Lift"
                  style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            <div>
              <div className="single-line-tag">OUR ADVANTAGE</div>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.2,
                  margin: '14px 0 20px',
                }}
              >
                Major Project Experience, Delivered with Agility
              </h2>
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: '#475569',
                  marginBottom: '28px',
                }}
              >
                With decades of offshore project experience, we offer dependable leadership,
                transparent engagement, and a shared focus on results.
              </p>
              <Link href="/about" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-11">Learn More</div>
                <span style={{ fontSize: '1.15rem', marginLeft: '6px' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMPREHENSIVE EXPERIENCE (Knowledge Of Offshore Assets)
          ========================================================================= */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="spm-two-col-grid">
            <div>
              <div className="single-line-tag">COMPREHENSIVE EXPERIENCE</div>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.2,
                  margin: '14px 0 20px',
                }}
              >
                Comprehensive Knowledge Of Offshore Assets
              </h2>
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: '#475569',
                  marginBottom: '24px',
                }}
              >
                Our management team is experienced in a diverse range of subsea, floating, and
                fixed offshore energy assets, providing you with exceptional Offshore Transport &amp;
                Installation services.
              </p>

              <ul className="spm-asset-list">
                {assetTypes.map((asset, idx) => (
                  <li key={idx} className="spm-asset-item">
                    <span className="spm-asset-dot" />
                    <span>{asset}</span>
                  </li>
                ))}
              </ul>

              <Link href="/services" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-10">Learn More</div>
                <span style={{ fontSize: '1.15rem', marginLeft: '6px' }}>→</span>
              </Link>
            </div>

            <div ref={sec5Ref} style={{ position: 'relative' }}>
              <div
                className={`home-one-about-yellow-bg ${sec5Animated ? 'is-animated' : 'is-initial'}`}
              />
              <div
                className="creative-image-block"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(5, 19, 41, 0.12)',
                }}
              >
                <img
                  src="/assets/img/693793d2a7b5023e4cf67502_37.JPG"
                  alt="Offshore SPM CALM Buoy in Field"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: THREE BLUE VALUE CARDS (Tier-1, Hands-On, Safety)
          ========================================================================= */}
      <section style={{ padding: '40px 0 100px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="spm-blue-cards-grid">
            {blueCards.map((card, idx) => (
              <Link key={idx} href={card.href} className="spm-blue-card">
                <div className="spm-blue-card-header">
                  <img src={card.icon} alt={card.title} className="spm-blue-card-icon" />
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1837e4_Up_White_Arrow.svg"
                    alt="Arrow"
                    className="spm-blue-card-arrow"
                  />
                </div>
                <h3 className="spm-blue-card-title">{card.title}</h3>
                <div className="spm-blue-card-divider" />
                <p className="spm-blue-card-desc">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: RECENT PROJECTS (Grid with Interactive '+' Trigger)
          ========================================================================= */}
      <section style={{ padding: '90px 0 100px', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="single-line-tag">Built for Offshore. Trusted Worldwide.</div>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
              fontWeight: 800,
              color: '#0c3247',
              margin: '14px 0 36px',
            }}
          >
            Recent Projects
          </h2>

          <div className="spm-work-grid">
            {/* Card 1: Simberi Gold Mine (Full Height) */}
            <Link
              href="/project/simberi-gold-mine"
              className="home-four-service-card spm-work-card overflow-hidden"
              style={{ height: '486px' }}
            >
              <img
                src="/assets/img/67b02712ac5c50c9f7b3dbb5_WhatsApp_Image_2025-02-15_at_13.40.13.jpeg"
                alt="Simberi Gold Mine Project"
                className="cover-image"
              />
              <div className="home-four-services-card-content">
                <div className="home-four-services-card-tag-block padding-bottom-ten">
                  <div className="home-four-services-card-tag">OFFSHORE &amp; MINING</div>
                </div>
                <div className="service-one-text-block padding-bottom-fifteen">
                  Simberi Gold Mine Project
                </div>
                <div className="inline-btn-flex">
                  <div className="learn-more-btn text-color-white">
                    <span>View Project</span>
                    <img
                      src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                      alt="Arrow"
                      width={18}
                      height={10}
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Kumul Marine Terminal Maintenance 2025 (Full Height) */}
            <Link
              href="/project/santos-kumul-marine-terminal-maintenance-2025"
              className="home-four-service-card spm-work-card overflow-hidden"
              style={{ height: '486px' }}
            >
              <img
                src="/assets/img/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D.jpeg"
                alt="Kumul Marine Terminal Maintenance 2025"
                className="cover-image"
              />
              <div className="home-four-services-card-content">
                <div className="home-four-services-card-tag-block padding-bottom-ten">
                  <div className="home-four-services-card-tag">SPM TERMINAL</div>
                </div>
                <div className="service-one-text-block padding-bottom-fifteen">
                  Kumul Marine Terminal Maintenance (2025)
                </div>
                <div className="inline-btn-flex">
                  <div className="learn-more-btn text-color-white">
                    <span>View Project</span>
                    <img
                      src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                      alt="Arrow"
                      width={18}
                      height={10}
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Column 3: 2 Stacked Cards */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '20px' }}>
              {/* Card 3: Kumul CALM Buoy Inspection */}
              <Link
                href="/project/santos-calm-buoy-inspection-maintenance-2024"
                className="home-four-service-card spm-work-card spm-work-compact overflow-hidden"
                style={{ height: '233px' }}
              >
                <img
                  src="/assets/img/67b02679cc056d21a6f5593e_KMT_Campaign_.jpg"
                  alt="Kumul CALM Buoy Inspection"
                  className="cover-image"
                />
                <div className="home-four-services-card-content">
                  <div className="home-four-services-card-tag-block" style={{ paddingBottom: '4px' }}>
                    <div className="home-four-services-card-tag">CALM BUOY</div>
                  </div>
                  <div className="service-one-text-block">
                    Inspection &amp; Maintenance Of CALM Buoy
                  </div>
                  <div className="inline-btn-flex">
                    <div className="learn-more-btn text-color-white">
                      <span>View Project</span>
                      <img
                        src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                        alt="Arrow"
                        width={18}
                        height={10}
                      />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Card 4: Platform Maintenance */}
              <Link
                href="/project/santos-platform-maintenance-2024"
                className="home-four-service-card spm-work-card spm-work-compact overflow-hidden"
                style={{ height: '233px' }}
              >
                <img
                  src="/assets/img/6886c8def384dd4d6106911d_P1062762.JPG"
                  alt="Platform Maintenance Project"
                  className="cover-image"
                />
                <div className="home-four-services-card-content">
                  <div className="home-four-services-card-tag-block" style={{ paddingBottom: '4px' }}>
                    <div className="home-four-services-card-tag">PLATFORM TOPSIDES</div>
                  </div>
                  <div className="service-one-text-block">
                    Platform Maintenance Project
                  </div>
                  <div className="inline-btn-flex">
                    <div className="learn-more-btn text-color-white">
                      <span>View Project</span>
                      <img
                        src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                        alt="Arrow"
                        width={18}
                        height={10}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SPM MANAGEMENT EXPERIENCES
          ========================================================================= */}
      <section style={{ padding: '90px 0 110px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="single-line-tag">DIVERSIFIED GLOBAL EXPERIENCE</div>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
              fontWeight: 800,
              color: '#0c3247',
              margin: '14px 0 40px',
            }}
          >
            SPM Management Experiences
          </h2>

          <div className="spm-exp-grid">
            {spmExperiences.map((item, idx) => (
              <div key={idx} className="spm-exp-card">
                <div className="spm-exp-img-wrap">
                  <span className="spm-exp-tag">{item.tag}</span>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="spm-exp-content">
                  <p className="spm-exp-year">{item.year}</p>
                  <h3 className="spm-exp-title">{item.title}</h3>
                  <p className="spm-exp-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
