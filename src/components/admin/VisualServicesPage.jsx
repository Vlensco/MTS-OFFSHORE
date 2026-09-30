'use client';

import React from 'react';
import Link from 'next/link';
import { IconCamera, IconPencil } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';

export default function VisualServicesPage({
  content = {},
  openTextEditor,
  openMediaPicker,
}) {
  const servicesPage = content?.servicesPage || {};
  const homeServices = content?.home?.services || {};
  const general = content?.general || {};

  const heroTag = servicesPage.heroTag || 'MTS OFFSHORE CAPABILITIES';
  const heroTitle = servicesPage.heroTitle || 'Our Core Offshore Services';
  const heroDesc = servicesPage.heroDesc || 'Specialized marine engineering, offshore construction, and project management capabilities tailored to complex offshore environments.';
  const heroImg1 = servicesPage.heroImg1 || '/assets/img/65d42c82ea20de5cb161c673_TI2.png';
  const heroImg2 = servicesPage.heroImg2 || '/assets/img/65d42c823e182d08ae643b4f_TI1.png';

  const offeringsTag = servicesPage.offeringsTag || 'SERVICE OFFERINGS';
  const offeringsTitle = servicesPage.offeringsTitle || homeServices.title || 'Comprehensive Offshore Solutions';
  const offeringsDesc = servicesPage.offeringsDesc || homeServices.description || 'We deliver a wide range of offshore construction, project management and consultancy services for subsea and topsides installations.';

  const capabilitiesTag = servicesPage.capabilitiesTag || 'OUR CAPABILITIES';
  const capabilitiesTitle = servicesPage.capabilitiesTitle || 'End-to-End Offshore Construction Expertise.';
  const capabilitiesDesc = servicesPage.capabilitiesDesc || 'Our team has delivered complex FPSO moorings, SPM systems, pipelay, diving, and T&I campaigns for clients including Aramco, Shell, SBM Offshore, Chevron, and more.';
  const capabilitiesImg = servicesPage.capabilitiesImg || '/assets/img/65d42addbadc4b36cf019683_20200121_134838.jpg';

  const recentProjects = servicesPage.recentProjects || {
    tag: 'Built for Offshore. Trusted Worldwide.',
    title: 'Recent Projects.',
    card1: {
      image: '/assets/img/69c03cc860a13c5a7bd11c8d_DJI_20260214070435_0974_D.JPG',
      title: 'Subsea & Floating Flowline',
      link: '/project/pro2504-mpl',
    },
    card2: {
      image: '/assets/img/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D.jpeg',
      title: 'Kumul Marine Terminal (KMT)',
      link: '/project/santos-kumul-marine-terminal-maintenance-2025',
    },
    card3: {
      image: '/assets/img/67b02679cc056d21a6f5593e_KMT_Campaign_.jpg',
      title: 'Santos CALM Buoy Overhaul',
      link: '/project/santos-calm-buoy-inspection-maintenance-2024',
    },
    card4: {
      image: '/assets/img/6886c8def384dd4d6106911d_P1062762.JPG',
      title: 'South And Central Platform Rejuvenation',
      link: '/project/santos-platform-maintenance-2024',
    },
  };

  const card1 = recentProjects.card1 || {};
  const card2 = recentProjects.card2 || {};
  const card3 = recentProjects.card3 || {};
  const card4 = recentProjects.card4 || {};

  const defaultOfferings = [
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

  const serviceOfferings = homeServices.items?.length ? homeServices.items : defaultOfferings;

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* SECTION 1: Top Hero Header (White background, left title column, right description + button) */}
      <section className="service-one-hero-section" style={{ backgroundColor: '#ffffff', padding: '60px 0 24px', position: 'relative', zIndex: 1 }}>
        <div className="w-layout-blockcontainer service-one-hero-section-container w-container">
          <div className="service-one-hero-section-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px' }}>
            {/* Left Title Column */}
            <div className="service-one-hero-title-block" style={{ flex: '1', minWidth: '320px', maxWidth: '620px' }}>
              <div className="service-one-tag-block" style={{ marginBottom: '12px' }}>
                <div
                  className="clean-editable-block tag change-weight-medium"
                  onClick={() => openTextEditor('servicesPage.heroTag', heroTag, 'Edit Services Tagline')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                  title="Click to edit tag"
                >
                  <span>{heroTag}</span>
                  <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
                </div>
              </div>

              <div className="overflow-hidden">
                <h1
                  className="clean-editable-block heading-3"
                  onClick={() => openTextEditor('servicesPage.heroTitle', heroTitle, 'Edit Services Main Title')}
                  style={{
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
                    fontWeight: 800,
                    color: '#0c3247',
                    lineHeight: '1.25',
                    letterSpacing: '-0.015em',
                    margin: '10px 0 0',
                    fontFamily: 'var(--font-heading)',
                  }}
                  title="Click to edit title"
                >
                  <span>{heroTitle}</span>
                  <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
                </h1>
              </div>
            </div>

            {/* Right Paragraph & Action Column */}
            <div className="service-one-hero-section-paragraph" style={{ flex: '1', minWidth: '320px', maxWidth: '540px' }}>
              <p
                className="clean-editable-block padding-bottom-fifteen"
                onClick={() => openTextEditor('servicesPage.heroDesc', heroDesc, 'Edit Services Description', true)}
                style={{ fontSize: '1.02rem', lineHeight: '1.65', color: '#4a5568', margin: '0 0 20px', fontFamily: 'var(--font-body)' }}
                title="Click to edit description"
              >
                <span>{heroDesc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              <div className="btn-flex">
                <div
                  style={{
                    backgroundColor: '#146cac',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 12px rgba(20, 108, 172, 0.3)',
                    cursor: 'default',
                  }}
                >
                  <span>Contact Us</span>
                  <img
                    src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                    alt="White Arrow"
                    height={12}
                    width={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Hero Two-Column Image Showcase (Reset negative margin so text is not overlapped) */}
      <section className="service-one-hero-image-section" style={{ backgroundColor: '#ffffff', padding: '0 0 50px', marginTop: '0px', position: 'relative', zIndex: 2 }}>
        <div className="w-layout-blockcontainer service-one-hero-image-container w-container">
          <div className="service-one-hero-image-flex overflow-hidden" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {/* Left Photo */}
            <div style={{ flex: '1.4', minWidth: '320px', position: 'relative' }}>
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5, 19, 41, 0.12)' }}>
                <img
                  src={heroImg1}
                  alt="Offshore Marine Operations"
                  width={741}
                  height={401}
                  className="responsive-full-width cover-image"
                  style={{ width: '100%', height: '401px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('servicesPage.heroImg1', heroImg1, 'Change Services Photo 1')}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <IconCamera size={13} color="#38bdf8" />
                    <span>Change Photo 1</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div style={{ flex: '1', minWidth: '280px', position: 'relative' }}>
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5, 19, 41, 0.12)' }}>
                <img
                  src={heroImg2}
                  alt="FPSO Tanker Offshore"
                  width={519}
                  height={401}
                  className="responsive-full-width cover-image"
                  style={{ width: '100%', height: '401px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('servicesPage.heroImg2', heroImg2, 'Change Services Photo 2')}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <IconCamera size={13} color="#38bdf8" />
                    <span>Change Photo 2</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Service Offerings (4 Pillars Grid) — SYNCED WITH HOME PAGE */}
      <section className="home-four-service" style={{ backgroundColor: '#f4f6f9', padding: '80px 0 90px' }}>
        <div className="w-layout-blockcontainer home-four-service-container w-container">
          {/* Header with Sync Notice */}
          <div
            className="home-four-service-flex"
            style={{
              marginBottom: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div className="home-four-service-title-block" style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div
                  className="clean-editable-block tag change-tag-letterspacing"
                  onClick={() => openTextEditor('servicesPage.offeringsTag', offeringsTag, 'Edit Offerings Tag')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    backgroundColor: '#e2e8f0',
                    color: '#0284c7',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                  title="Click to edit tag"
                >
                  <span>{offeringsTag}</span>
                  <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '999px',
                    padding: '2px 8px',
                  }}
                >
                  🔗 Synced with Home Page
                </span>
              </div>

              <h2
                className="clean-editable-block heading-4"
                onClick={() => openTextEditor('home.services.title', offeringsTitle, 'Edit Core Offerings Title')}
                style={{
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: '1.25',
                  margin: '6px 0 0',
                  fontFamily: 'var(--font-heading)',
                }}
                title="Click to edit title"
              >
                <span>{offeringsTitle}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>
            </div>

            <p
              className="clean-editable-block home-four-service-paragraph-block"
              onClick={() => openTextEditor('home.services.description', offeringsDesc, 'Edit Core Offerings Description', true)}
              style={{ maxWidth: '480px', color: '#556987', fontSize: '0.98rem', lineHeight: '1.6', margin: 0, fontFamily: 'var(--font-body)' }}
              title="Click to edit description"
            >
              <span>{offeringsDesc}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </p>
          </div>

          {/* 4 Cards Grid Matching Front-end */}
          <div className="w-layout-grid home-four-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {serviceOfferings.map((s, idx) => (
              <div
                key={idx}
                className="home-four-service-card overflow-hidden"
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  backgroundColor: '#0c1e33',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  height: '448px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    width={300}
                    height={448}
                    className="responsive-full-width cover-image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Change Photo Button */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                    <button
                      type="button"
                      onClick={() => openMediaPicker(`home.services.items.${idx}.image`, s.image, `Change Card Photo: ${s.title}`)}
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        padding: '5px 10px',
                        borderRadius: '999px',
                        fontWeight: 600,
                        fontSize: '0.74rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <IconCamera size={12} color="#38bdf8" />
                      <span>Change Photo</span>
                    </button>
                  </div>

                  {/* Shared Sync Pill */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(5, 19, 41, 0.85)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                      }}
                    >
                      🔗 Synced (Card {idx + 1})
                    </span>
                  </div>

                  {/* Card Content Overlay */}
                  <div
                    className="home-four-services-card-content"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px 20px',
                      background: 'linear-gradient(to top, rgba(5, 19, 41, 0.95) 0%, rgba(5, 19, 41, 0.6) 70%, transparent 100%)',
                      color: '#ffffff',
                    }}
                  >
                    {/* Tag */}
                    <div style={{ marginBottom: '8px' }}>
                      <span
                        className="clean-editable-block home-four-services-card-tag"
                        onClick={() => openTextEditor(`home.services.items.${idx}.tag`, s.tag, `Edit Card ${idx + 1} Tag`)}
                        style={{
                          backgroundColor: '#e5a93b',
                          color: '#000000',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          display: 'inline-block',
                        }}
                      >
                        {s.tag}
                        <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div
                      className="clean-editable-block service-one-text-block"
                      onClick={() => openTextEditor(`home.services.items.${idx}.title`, s.title, `Edit Card ${idx + 1} Title`)}
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.3,
                        marginBottom: '12px',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {s.title}
                      <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                    </div>

                    {/* Learn More link */}
                    <div className="inline-btn-flex" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span>Learn More</span>
                      <img
                        src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                        alt="White Arrow"
                        width="18"
                        height="10"
                      />
                    </div>
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
                <div
                  className="clean-editable-block tag change-tag-letterspacing"
                  onClick={() => openTextEditor('servicesPage.capabilitiesTag', capabilitiesTag, 'Edit Capabilities Tag')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  <span>{capabilitiesTag}</span>
                  <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                </div>
              </div>

              <div className="overflow-hidden">
                <h2
                  className="clean-editable-block margin-top-seventeen padding-bottom-fifteen"
                  onClick={() => openTextEditor('servicesPage.capabilitiesTitle', capabilitiesTitle, 'Edit Capabilities Title')}
                  style={{
                    fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)',
                    fontWeight: 800,
                    color: '#0c3247',
                    lineHeight: '1.25',
                    margin: '12px 0 16px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  <strong className="bold-text">{capabilitiesTitle}</strong>
                  <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
                </h2>
              </div>

              <p
                className="clean-editable-block padding-bottom-thirteen width-five-hundred-ten"
                onClick={() => openTextEditor('servicesPage.capabilitiesDesc', capabilitiesDesc, 'Edit Capabilities Description', true)}
                style={{ color: '#4a5568', fontSize: '1.02rem', lineHeight: '1.65', marginBottom: '24px', fontFamily: 'var(--font-body)' }}
              >
                <span>{capabilitiesDesc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
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
                <div
                  className="body-button bg-dark-pmg-blue"
                  style={{ backgroundColor: '#146cac', color: '#fff', padding: '10px 22px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <span style={{ fontWeight: 600 }}>Learn More</span>
                  <img
                    src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                    alt="White Arrow"
                    height={12}
                    width={20}
                  />
                </div>
              </div>
            </div>

            {/* Right Capabilities Image with Animated Blue Accent Box */}
            <div className="why-choose-us-section-image-block" style={{ flex: '1', minWidth: '320px', position: 'relative' }}>
              <div className="service-two-features-image-block-inner" style={{ position: 'relative' }}>
                {/* Decorative Blue Box (matching live page) */}
                <div
                  style={{
                    backgroundColor: '#146cac',
                    width: '280px',
                    height: '320px',
                    position: 'absolute',
                    right: '-20px',
                    bottom: '-20px',
                    zIndex: 0,
                    borderRadius: '10px',
                  }}
                />

                <div className="creative-image-block" style={{ position: 'relative', zIndex: 1, borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5, 19, 41, 0.14)' }}>
                  <img
                    src={capabilitiesImg}
                    alt="Offshore Pipeline Flange Bolting"
                    height={520}
                    width={531}
                    className="responsive-full-width cover-image"
                    style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Change Photo Button */}
                  <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
                    <button
                      type="button"
                      onClick={() => openMediaPicker('servicesPage.capabilitiesImg', capabilitiesImg, 'Change Capabilities Photo')}
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <IconCamera size={13} color="#38bdf8" />
                      <span>Change Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Recent Projects Showcase (Exact Image 2 - 3 Columns Layout with Link Inspector & Full Editing) */}
      <section className="why-choose-us-project" style={{ backgroundColor: '#ffffff', padding: '20px 0 110px' }}>
        <div className="w-layout-blockcontainer why-choose-us-project-container w-container">
          {/* Header Row: Tag & Title */}
          <div style={{ marginBottom: '32px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('servicesPage.recentProjects.tag', recentProjects.tag || 'Built for Offshore. Trusted Worldwide.', 'Edit Recent Projects Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0c3247',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              <span>{(recentProjects.tag || 'Built for Offshore. Trusted Worldwide.').toUpperCase().replace(/^[-—\s]+/, '')}</span>
              <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
            </div>

            <h2
              className="clean-editable-block heading-2"
              onClick={() => openTextEditor('servicesPage.recentProjects.title', recentProjects.title || 'Recent Projects.', 'Edit Recent Projects Title')}
              style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: '#0c3247',
                margin: 0,
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.2,
              }}
            >
              <span>{recentProjects.title || 'Recent Projects.'}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </h2>
          </div>

          {/* 3-Column Grid Matching Image 2 */}
          <div
            className="w-layout-grid why-choose-us-work-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              alignItems: 'stretch',
            }}
          >
            {/* Column 1: Subsea & Floating Flowline (Full Height 486px) */}
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '486px',
                backgroundColor: '#0c3247',
                boxShadow: '0 10px 30px rgba(5, 19, 41, 0.12)',
              }}
            >
              <img
                src={card1.image || '/assets/img/69c03cc860a13c5a7bd11c8d_DJI_20260214070435_0974_D.JPG'}
                alt="Subsea and Floating Flowline Installation"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Photo Change Button */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 15 }}>
                <button
                  type="button"
                  onClick={() => openMediaPicker('servicesPage.recentProjects.card1.image', card1.image || '/assets/img/69c03cc860a13c5a7bd11c8d_DJI_20260214070435_0974_D.JPG', 'Change Subsea Flowline Photo')}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    padding: '5px 11px',
                    borderRadius: '999px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <IconCamera size={12} color="#38bdf8" /> Photo
                </button>
              </div>

              {/* Bottom Content with Title and Target Link Inspector */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(5, 19, 41, 0.95) 0%, rgba(5, 19, 41, 0.6) 70%, transparent 100%)',
                  padding: '30px 20px 20px',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  className="clean-editable-block"
                  onClick={() => openTextEditor('servicesPage.recentProjects.card1.title', card1.title || 'Subsea & Floating Flowline', 'Edit Card 1 Title')}
                  style={{
                    color: '#ffffff',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1.3,
                  }}
                >
                  <span>{card1.title || 'Subsea & Floating Flowline'}</span>
                  <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
                </div>

                {/* Target Link Inspector & Editor */}
                <div
                  className="clean-editable-block"
                  onClick={() => openTextEditor('servicesPage.recentProjects.card1.link', card1.link || '/project/pro2504-mpl', 'Edit Destination URL (e.g. /project/pro2504-mpl)')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(0, 114, 206, 0.95)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    width: 'fit-content',
                    marginTop: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                  title="Click to edit destination link"
                >
                  <span>🔗 Link: {card1.link || '/project/pro2504-mpl'}</span>
                  <span className="hover-edit-badge"><IconPencil size={10} /> Change</span>
                </div>
              </div>
            </div>

            {/* Column 2: Kumul Marine Terminal (Full Height 486px) */}
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '486px',
                backgroundColor: '#0c3247',
                boxShadow: '0 10px 30px rgba(5, 19, 41, 0.12)',
              }}
            >
              <img
                src={card2.image || '/assets/img/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D.jpeg'}
                alt="Kumul Marine Terminal Maintenance 2025"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Photo Change Button */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 15 }}>
                <button
                  type="button"
                  onClick={() => openMediaPicker('servicesPage.recentProjects.card2.image', card2.image || '/assets/img/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D.jpeg', 'Change Kumul Marine Terminal Photo')}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    padding: '5px 11px',
                    borderRadius: '999px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <IconCamera size={12} color="#38bdf8" /> Photo
                </button>
              </div>

              {/* Bottom Content with Title and Target Link Inspector */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(5, 19, 41, 0.95) 0%, rgba(5, 19, 41, 0.6) 70%, transparent 100%)',
                  padding: '30px 20px 20px',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  className="clean-editable-block"
                  onClick={() => openTextEditor('servicesPage.recentProjects.card2.title', card2.title || 'Kumul Marine Terminal (KMT)', 'Edit Card 2 Title')}
                  style={{
                    color: '#ffffff',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1.3,
                  }}
                >
                  <span>{card2.title || 'Kumul Marine Terminal (KMT)'}</span>
                  <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
                </div>

                {/* Target Link Inspector & Editor */}
                <div
                  className="clean-editable-block"
                  onClick={() => openTextEditor('servicesPage.recentProjects.card2.link', card2.link || '/project/santos-kumul-marine-terminal-maintenance-2025', 'Edit Destination URL')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(0, 114, 206, 0.95)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    width: 'fit-content',
                    marginTop: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                  title="Click to edit destination link"
                >
                  <span>🔗 Link: {card2.link || '/project/santos-kumul-marine-terminal-maintenance-2025'}</span>
                  <span className="hover-edit-badge"><IconPencil size={10} /> Change</span>
                </div>
              </div>
            </div>

            {/* Column 3: Two Stacked Photos (Exact Image 2) */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: '1fr 1fr',
                gap: '16px',
                height: '486px',
              }}
            >
              {/* Stack Top: CALM Buoy in Rough Sea (Height 235px) */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '235px',
                  backgroundColor: '#0c3247',
                  boxShadow: '0 8px 24px rgba(5, 19, 41, 0.1)',
                }}
              >
                <img
                  src={card3.image || '/assets/img/67b02679cc056d21a6f5593e_KMT_Campaign_.jpg'}
                  alt="Inspection and Maintenance of CALM Buoy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Photo Change Button */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 15 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('servicesPage.recentProjects.card3.image', card3.image || '/assets/img/67b02679cc056d21a6f5593e_KMT_Campaign_.jpg', 'Change CALM Buoy Photo')}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.88)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <IconCamera size={11} color="#38bdf8" /> Photo
                  </button>
                </div>

                {/* Bottom Content with Title and Target Link Inspector */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(5, 19, 41, 0.95) 0%, rgba(5, 19, 41, 0.6) 70%, transparent 100%)',
                    padding: '20px 16px 14px',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.recentProjects.card3.title', card3.title || 'Santos CALM Buoy Overhaul', 'Edit Card 3 Title')}
                    style={{
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.25,
                    }}
                  >
                    <span>{card3.title || 'Santos CALM Buoy Overhaul'}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>

                  {/* Target Link Inspector & Editor */}
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.recentProjects.card3.link', card3.link || '/project/santos-calm-buoy-inspection-maintenance-2024', 'Edit Destination URL')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(0, 114, 206, 0.95)',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                    title="Click to edit destination link"
                  >
                    <span>🔗 Link: {card3.link || '/project/santos-calm-buoy-inspection-maintenance-2024'}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Change</span>
                  </div>
                </div>
              </div>

              {/* Stack Bottom: Technicians on Gangway (Height 235px) */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '235px',
                  backgroundColor: '#0c3247',
                  boxShadow: '0 8px 24px rgba(5, 19, 41, 0.1)',
                }}
              >
                <img
                  src={card4.image || '/assets/img/6886c8def384dd4d6106911d_P1062762.JPG'}
                  alt="Platform Maintenance 2024"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Photo Change Button */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 15 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('servicesPage.recentProjects.card4.image', card4.image || '/assets/img/6886c8def384dd4d6106911d_P1062762.JPG', 'Change Platform Photo')}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.88)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <IconCamera size={11} color="#38bdf8" /> Photo
                  </button>
                </div>

                {/* Bottom Content with Title and Target Link Inspector */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(5, 19, 41, 0.95) 0%, rgba(5, 19, 41, 0.6) 70%, transparent 100%)',
                    padding: '20px 16px 14px',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.recentProjects.card4.title', card4.title || 'South And Central Platform Rejuvenation', 'Edit Card 4 Title')}
                    style={{
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.25,
                    }}
                  >
                    <span>{card4.title || 'South And Central Platform Rejuvenation'}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>

                  {/* Target Link Inspector & Editor */}
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.recentProjects.card4.link', card4.link || '/project/santos-platform-maintenance-2024', 'Edit Destination URL')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(0, 114, 206, 0.95)',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                    title="Click to edit destination link"
                  >
                    <span>🔗 Link: {card4.link || '/project/santos-platform-maintenance-2024'}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Change</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AdminVisualFooter general={general} openTextEditor={openTextEditor} openMediaPicker={openMediaPicker} />
    </div>
  );
}
