'use client';

import React from 'react';
import Link from 'next/link';
import { IconCamera, IconPencil } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';

export default function VisualSpmPage({
  content = {},
  openTextEditor,
  openMediaPicker,
}) {
  const spm = content?.spmPage || {};
  const general = content?.general || {};

  // SECTION 1: HERO
  const heroTag = spm.heroTag || 'SPECIALIZED EXPERTISE';
  const heroTitle = spm.heroTitle || 'Single Point Mooring (SPM) Systems';
  const heroDesc =
    spm.heroDesc ||
    'World-class CALM buoy installation, overhaul, maintenance, subsea hose replacement, and mooring telemetry services backed by over 50 years of collective leadership.';
  const heroBg = spm.heroBg || '/assets/images/mts_spm_epic.jpg';

  // SECTION 2: 6 CAPABILITIES CARDS (Foto 2)
  const defaultCapabilities = [
    {
      title: 'PROJECT MANAGEMENT',
      image: '/assets/img/6937955547f3f19cab2173bc_On_site_Training_Tanzainia_3.JPG',
    },
    {
      title: 'TRANSPORT & INSTALLATION',
      image: '/assets/img/6937948b492fc7e0a9c284b4_Buoy_Lift__5_.JPG',
    },
    {
      title: 'MOORING SYSTEM INSTALLATION',
      image: '/assets/img/65d40c6689b5e659b722318d_PC86.png',
    },
    {
      title: 'SUBSEA INSTALLATION',
      image: '/assets/img/65d42f6dfd1f245d084048a5_PMT2.png',
    },
    {
      title: 'FLOWLINE INSTALLATION',
      image: '/assets/img/69c040bdb0bd6707f3fccde4_DJI_20260214070435_0974_D.JPG',
    },
    {
      title: 'OVERHAUL & REFURBISHMENT',
      image: '/assets/img/69379528a31e1173b4aa81ee_20161018_081811.jpg',
    },
  ];

  const sec2Title = spm.sec2Title || 'Comprehensive SPM & CALM Buoy Services';
  const capabilities = spm.capabilities && spm.capabilities.length === 6 ? spm.capabilities : defaultCapabilities;

  // SECTION 3: SPM SYSTEMS EXPLAINED
  const sec3Tag = spm.sec3Tag || 'SPM SYSTEMS EXPLAINED';
  const sec3Title = spm.sec3Title || 'Reliable Marine Terminal Solutions';
  const sec3Desc =
    spm.sec3Desc ||
    "CALM Buoy systems are securely moored offshore, allowing cargo operations to proceed safely in nearly all weather and sea conditions. Floating hoses, which rotate with the tanker around the SPM, link the vessel's cargo manifolds to the terminal. Additional hoses connect the underside of the SPM to the subsea pipelines on the seabed via a Pipeline End Manifold (PLEM).";
  const sec3Img = spm.sec3Img || '/assets/img/65d42b949551f31fe9f72a8b_IMG_20181228_172705.jpg';

  // SECTION 4: OUR ADVANTAGE
  const sec4Tag = spm.sec4Tag || 'OUR ADVANTAGE';
  const sec4Title = spm.sec4Title || 'Major Project Experience, Delivered with Agility';
  const sec4Desc =
    spm.sec4Desc ||
    'With decades of offshore project experience, we offer dependable leadership, transparent engagement, and a shared focus on results.';
  const sec4Img = spm.sec4Img || '/assets/img/69379730c6c6232f46ca69d1_20190108_102901.jpg';

  // SECTION 5: COMPREHENSIVE KNOWLEDGE OF OFFSHORE ASSETS (Foto 3)
  const sec5Tag = spm.sec5Tag || 'COMPREHENSIVE EXPERIENCE';
  const sec5Title = spm.sec5Title || 'Comprehensive Knowledge Of Offshore Assets';
  const sec5Desc =
    spm.sec5Desc ||
    'Our management team is experienced in a diverse range of subsea, floating, and fixed offshore energy assets, providing you with exceptional Offshore Transport & Installation services.';
  const sec5Img = spm.sec5Img || '/assets/img/693793d2a7b5023e4cf67502_37.JPG';

  const defaultAssets = [
    'Catenary Anchor Leg Mooring (CALM) Buoys',
    'Single Point Mooring (SPM) Systems',
    'Single Anchor Leg Mooring Systems (SALM)',
    'Floating, Production, Storage and Offloading (FPSO)',
    'Floating, Storage and Offloading (FSO)',
    'Floating Liquid Natural Gas (FLNG)',
    'Floating Storage and Regasification Unit (FSRU)',
    'Fixed Wellhead & Production Platform',
  ];
  const assetTypes = spm.sec5Assets && spm.sec5Assets.length > 0 ? spm.sec5Assets : defaultAssets;
  const sec5BtnText = spm.sec5BtnText || 'Learn More';
  const sec5BtnLink = spm.sec5BtnLink || '/services';

  // SECTION 6: THREE BLUE VALUE CARDS (Foto 5)
  const defaultBlueCards = [
    {
      title: 'Tier-1 Technical Expertise',
      description:
        'Our management team have successfully delivered high-stakes offshore construction, T&I, and FPSO installation campaigns across Asia, Africa, and the Middle East.',
      link: '/about',
    },
    {
      title: 'Hands-On Leadership',
      description:
        'We are driven by a commitment to operational excellence, efficiency, and performance. MTS OFFSHORE provides clients with a dependable partner capable of executing critical scopes.',
      link: '/about',
    },
    {
      title: 'Focused On Safety',
      description:
        'All operations are delivered in compliance with international HSE standards, project-specific requirements, and permit-to-work systems. Safety underpins every decision we make.',
      link: '/about',
    },
  ];
  const blueCards = spm.blueCards && spm.blueCards.length === 3 ? spm.blueCards : defaultBlueCards;

  // SECTION 7: RECENT PROJECTS (3 cards)
  const defaultRecentProjects = [
    {
      badge: 'EPCI CAMPAIGN',
      title: 'EPCI FPSO Overhaul Project',
      image: '/assets/images/mts_ti_heavylift.jpg',
      link: '/services/transport-installation',
    },
    {
      badge: 'SPM TERMINAL',
      title: 'Kumul SPM Buoy Subsea Pipelay EPCI',
      image: '/assets/img/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D.jpeg',
      link: '/services',
    },
    {
      badge: 'PLATFORM REJUVENATION',
      title: 'Platform Maintenance Project',
      image: '/assets/img/692b8093fa6b54589904f7a2_20161015_133338.jpg',
      link: '/services/asset-integrity',
    },
  ];

  const sec7Tag = spm.sec7Tag || 'SUCCESSFUL OFFSHORE CAMPAIGNS';
  const sec7Title = spm.sec7Title || 'Recent Projects';
  const recentProjects = spm.recentProjects && spm.recentProjects.length > 0 ? spm.recentProjects : defaultRecentProjects;

  // SECTION 8: SPM MANAGEMENT EXPERIENCES (6 cards)
  const defaultSpmExperiences = [
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
      desc: 'Monitoring of all offshore SPM Installation works with regards to 3x Full SPM Buoy Installations.',
      image: '/assets/img/673bea8708adff4c66fd15f8_Buoy_Lift__5_.JPG',
    },
    {
      tag: 'Russia',
      year: '2008',
      title: 'SALM Buoy Salvage',
      desc: 'Disaster management, oil prevention and salvage of detached SALM buoy in Sakhalin.',
      image: '/assets/img/673bf72d62dd00cec51cf6e5_RES_DSC2127.jpg',
    },
    {
      tag: 'Japan & Russia',
      year: '2008',
      title: 'SALM Repair & Commissioning',
      desc: 'Supervising repair works to SALM Buoy in Japan and offshore commissioning.',
      image: '/assets/img/673bf6cd3477712e48fee7c6_RES_DSC8495.jpg',
    },
  ];

  const sec8Tag = spm.sec8Tag || 'TRACK RECORD & CASE HISTORIES';
  const sec8Title = spm.sec8Title || 'SPM Management Experiences';
  const spmExperiences = spm.spmExperiences && spm.spmExperiences.length > 0 ? spm.spmExperiences : defaultSpmExperiences;

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* =========================================================================
          SECTION 1: HERO BANNER (Exact Foto 1 Color: Crisp White Title, Blue Button)
          ========================================================================= */}
      <section
        className="home-four-hero"
        style={{
          position: 'relative',
          minHeight: '460px',
          backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.65), rgba(5, 19, 41, 0.8)), url("${heroBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20 }}>
          <button
            type="button"
            onClick={() => openMediaPicker('spmPage.heroBg', heroBg, 'Change SPM Hero Background')}
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <IconCamera size={13} color="#38bdf8" />
            <span>Change Hero Background</span>
          </button>
        </div>

        <div className="w-layout-blockcontainer container-one w-container">
          {/* Tagline */}
          <div style={{ marginBottom: '14px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('spmPage.heroTag', heroTag, 'Edit SPM Hero Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span>— {heroTag}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </div>
          </div>

          {/* Main Title (Foto 1 Style: Crisp White, Big Bold) */}
          <h1
            className="clean-editable-block text-color-white"
            onClick={() => openTextEditor('spmPage.heroTitle', heroTitle, 'Edit SPM Main Title')}
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              color: '#ffffff !important',
              lineHeight: 1.18,
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
              textShadow: '0 3px 18px rgba(0,0,0,0.6)',
            }}
          >
            <span>{heroTitle}</span>
            <span className="hover-edit-badge"><IconPencil size={12} /> Edit</span>
          </h1>

          {/* Description */}
          <p
            className="clean-editable-block"
            onClick={() => openTextEditor('spmPage.heroDesc', heroDesc, 'Edit SPM Description', true)}
            style={{
              fontSize: '1.05rem',
              color: '#e2e8f0',
              maxWidth: '740px',
              margin: '0 auto 28px',
              lineHeight: 1.65,
              fontFamily: 'var(--font-body)',
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            }}
          >
            <span>{heroDesc}</span>
            <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
          </p>

          {/* Solid Blue Button matching Foto 1 */}
          <div style={{ display: 'inline-block' }}>
            <div
              style={{
                backgroundColor: '#0072ce',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 114, 206, 0.4)',
              }}
            >
              <span>Contact Us</span>
              <span style={{ fontSize: '1.15rem' }}>→</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 6 SPM CAPABILITIES CARDS (FOTO 2 — FULLY EDITABLE!)
          ========================================================================= */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <h2
              className="clean-editable-block"
              onClick={() => openTextEditor('spmPage.sec2Title', sec2Title, 'Edit Section 2 Title')}
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: '#0c3247',
                margin: 0,
                fontFamily: 'var(--font-heading)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <span>{sec2Title}</span>
              <span className="hover-edit-badge"><IconPencil size={12} /> Edit</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Photo with Change Photo button */}
                <div style={{ position: 'relative', height: '240px' }}>
                  <img
                    src={cap.image}
                    alt={cap.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Change Photo Button */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker(
                          `spmPage.capabilities.${idx}.image`,
                          cap.image,
                          `Change Photo: ${cap.title}`
                        )
                      }
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.88)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        padding: '5px 10px',
                        borderRadius: '999px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <IconCamera size={12} color="#38bdf8" />
                      <span>Change Photo</span>
                    </button>
                  </div>
                </div>

                {/* Title & Link Destination Badge */}
                <div style={{ padding: '18px 16px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                  <h3
                    className="clean-editable-block"
                    onClick={() =>
                      openTextEditor(
                        `spmPage.capabilities.${idx}.title`,
                        cap.title,
                        `Edit Card ${idx + 1} Title`
                      )
                    }
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      color: '#0c3247',
                      margin: 0,
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{cap.title}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </h3>

                  <div
                    className="clean-editable-block"
                    onClick={() =>
                      openTextEditor(
                        `spmPage.capabilities.${idx}.href`,
                        cap.href || '/services/transport-installation',
                        `Edit Card ${idx + 1} Destination Link`
                      )
                    }
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#0284c7',
                      backgroundColor: '#f0f9ff',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      border: '1px solid #bae6fd',
                      cursor: 'pointer',
                    }}
                    title="Click to change link destination"
                  >
                    <span>🔗 {cap.href || '/services/transport-installation'}</span>
                    <IconPencil size={10} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SPM SYSTEMS EXPLAINED (Foto 3)
          ========================================================================= */}
      <section style={{ padding: '90px 24px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                className="clean-editable-block single-line-tag"
                onClick={() => openTextEditor('spmPage.sec3Tag', sec3Tag, 'Edit Section 3 Tag')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0072ce',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                <span>{sec3Tag.replace(/^[-—\s]+/, '')}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block"
                onClick={() => openTextEditor('spmPage.sec3Title', sec3Title, 'Edit Section 3 Title')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.85rem, 3vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 18px',
                }}
              >
                <span>{sec3Title}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('spmPage.sec3Desc', sec3Desc, 'Edit Section 3 Description', true)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#475569',
                  marginBottom: '28px',
                }}
              >
                <span>{sec3Desc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              <div
                style={{
                  backgroundColor: '#0072ce',
                  color: '#ffffff',
                  padding: '12px 26px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Contact Us</span>
                <span style={{ fontSize: '1.15rem' }}>→</span>
              </div>
            </div>

            {/* Right Photo */}
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5,19,41,0.12)' }}>
              <img
                src={sec3Img}
                alt="Flange Operations"
                style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
              />
              <button
                type="button"
                onClick={() => openMediaPicker('spmPage.sec3Img', sec3Img, 'Change Section 3 Photo')}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(15,23,42,0.88)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  zIndex: 10,
                }}
              >
                <IconCamera size={13} color="#38bdf8" /> Change Photo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR ADVANTAGE (Foto 3)
          ========================================================================= */}
      <section style={{ padding: '90px 24px', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Photo */}
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5,19,41,0.12)' }}>
              <img
                src={sec4Img}
                alt="Offshore Crane Lift"
                style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
              />
              <button
                type="button"
                onClick={() => openMediaPicker('spmPage.sec4Img', sec4Img, 'Change Section 4 Photo')}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(15,23,42,0.88)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  zIndex: 10,
                }}
              >
                <IconCamera size={13} color="#38bdf8" /> Change Photo
              </button>
            </div>

            {/* Right Text */}
            <div>
              <div
                className="clean-editable-block single-line-tag"
                onClick={() => openTextEditor('spmPage.sec4Tag', sec4Tag, 'Edit Section 4 Tag')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0072ce',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                <span>{sec4Tag.replace(/^[-—\s]+/, '')}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block"
                onClick={() => openTextEditor('spmPage.sec4Title', sec4Title, 'Edit Section 4 Title')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.85rem, 3vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 18px',
                }}
              >
                <span>{sec4Title}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('spmPage.sec4Desc', sec4Desc, 'Edit Section 4 Description', true)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#475569',
                  marginBottom: '28px',
                }}
              >
                <span>{sec4Desc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              <div
                style={{
                  backgroundColor: '#0072ce',
                  color: '#ffffff',
                  padding: '12px 26px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Learn More</span>
                <span style={{ fontSize: '1.15rem' }}>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMPREHENSIVE KNOWLEDGE OF OFFSHORE ASSETS (Foto 3)
          ========================================================================= */}
      <section style={{ padding: '90px 24px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                className="clean-editable-block single-line-tag"
                onClick={() => openTextEditor('spmPage.sec5Tag', sec5Tag, 'Edit Section 5 Tag')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0072ce',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                <span>{sec5Tag.replace(/^[-—\s]+/, '')}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block"
                onClick={() => openTextEditor('spmPage.sec5Title', sec5Title, 'Edit Section 5 Title')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.85rem, 3vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 18px',
                }}
              >
                <span>{sec5Title}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('spmPage.sec5Desc', sec5Desc, 'Edit Section 5 Description', true)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#475569',
                  marginBottom: '20px',
                }}
              >
                <span>{sec5Desc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              {/* 8 Asset Bullet Points (Foto 3) */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {assetTypes.map((asset, idx) => (
                  <li
                    key={idx}
                    className="clean-editable-block"
                    onClick={() => openTextEditor(`spmPage.sec5Assets.${idx}`, asset, `Edit Asset Item ${idx + 1}`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.94rem',
                      color: '#0072ce',
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: 'fit-content',
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0072ce', flexShrink: 0 }} />
                    <span>{asset}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </li>
                ))}
              </ul>

              {/* Button & Link Destination */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <div
                  className="clean-editable-block"
                  onClick={() => openTextEditor('spmPage.sec5BtnText', sec5BtnText, 'Edit Button Label')}
                  style={{
                    backgroundColor: '#0072ce',
                    color: '#ffffff',
                    padding: '12px 26px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <span>{sec5BtnText}</span>
                  <span style={{ fontSize: '1.15rem' }}>→</span>
                  <span className="hover-edit-badge" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}><IconPencil size={11} /> Edit Text</span>
                </div>

                <div
                  className="clean-editable-block"
                  onClick={() => openTextEditor('spmPage.sec5BtnLink', sec5BtnLink, 'Edit Button Destination Link (e.g. /services or /contact-us)')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#0284c7',
                    cursor: 'pointer',
                  }}
                  title="Click to edit link destination"
                >
                  <span>🔗 Linked to: <strong>{sec5BtnLink}</strong></span>
                  <IconPencil size={11} />
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(5,19,41,0.12)' }}>
              <img
                src={sec5Img}
                alt="Offshore SPM CALM Buoy in Field"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <button
                type="button"
                onClick={() => openMediaPicker('spmPage.sec5Img', sec5Img, 'Change Section 5 Photo')}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(15,23,42,0.88)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  zIndex: 10,
                }}
              >
                <IconCamera size={13} color="#38bdf8" /> Change Photo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: THREE BLUE VALUE CARDS (Foto 5 Style)
          ========================================================================= */}
      <section style={{ padding: '60px 24px 90px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {blueCards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#084877',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '40px 32px',
                  boxShadow: '0 8px 26px rgba(5, 19, 41, 0.16)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Header: Yellow Icon on Left + White Arrow on Right */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  {idx === 0 && (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f6b61b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#f6b61b" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f6b61b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                      <circle cx="11" cy="7" r="4" />
                      <polyline points="16 11 18 13 22 9" stroke="#f6b61b" strokeWidth="2.4" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f6b61b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 11 12 14 15 11" stroke="#f6b61b" strokeWidth="2.4" />
                    </svg>
                  )}

                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.95 }}>
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>

                {/* Title */}
                <h3
                  className="clean-editable-block"
                  onClick={() => openTextEditor(`spmPage.blueCards.${idx}.title`, card.title, `Edit Card ${idx + 1} Title`)}
                  style={{
                    fontSize: '1.32rem',
                    fontWeight: 700,
                    margin: '0 0 16px',
                    fontFamily: 'var(--font-heading)',
                    color: '#ffffff !important',
                    lineHeight: 1.3,
                  }}
                >
                  <span>{card.title}</span>
                  <span className="hover-edit-badge" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}><IconPencil size={11} /> Edit</span>
                </h3>

                {/* Description */}
                <p
                  className="clean-editable-block"
                  onClick={() => openTextEditor(`spmPage.blueCards.${idx}.description`, card.description, `Edit Card ${idx + 1} Description`, true)}
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: '#ffffff !important',
                    opacity: 0.95,
                    margin: '0 0 20px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span>{card.description}</span>
                  <span className="hover-edit-badge" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}><IconPencil size={11} /> Edit</span>
                </p>

                {/* Link Destination Badge */}
                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor(`spmPage.blueCards.${idx}.link`, card.link || '/about', `Edit Card ${idx + 1} Destination Link`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#bae6fd',
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                    }}
                    title="Click to edit destination link"
                  >
                    <span>🔗 Linked to: <strong>{card.link || '/about'}</strong></span>
                    <IconPencil size={10} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: RECENT PROJECTS (Foto 3)
          ========================================================================= */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ marginBottom: '32px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('spmPage.sec7Tag', sec7Tag, 'Edit Section 7 Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#0072ce',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              <span>— {sec7Tag}</span>
              <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
            </div>

            <h2
              className="clean-editable-block heading-2"
              onClick={() => openTextEditor('spmPage.sec7Title', sec7Title, 'Edit Section 7 Title')}
              style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0c3247', margin: 0, fontFamily: 'var(--font-heading)', cursor: 'pointer' }}
            >
              <span>{sec7Title}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {recentProjects.map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#0c1e33',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '320px',
                  boxShadow: '0 10px 25px rgba(5,19,41,0.18)',
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />

                {/* Change Photo Button */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 15 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker(`spmPage.recentProjects.${idx}.image`, p.image, `Change Photo: ${p.title}`)}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.88)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '5px 10px',
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

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    background: 'linear-gradient(to top, rgba(5,19,41,0.95), transparent)',
                    color: '#ffffff',
                    zIndex: 10,
                  }}
                >
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor(`spmPage.recentProjects.${idx}.badge`, p.badge, `Edit Project ${idx + 1} Badge`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#e5a93b',
                      color: '#000000',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      marginBottom: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{p.badge}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /></span>
                  </div>

                  <h4
                    className="clean-editable-block"
                    onClick={() => openTextEditor(`spmPage.recentProjects.${idx}.title`, p.title, `Edit Project ${idx + 1} Title`)}
                    style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0, cursor: 'pointer' }}
                  >
                    <span>{p.title}</span>
                    <span className="hover-edit-badge" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}><IconPencil size={10} /> Edit</span>
                  </h4>

                  {/* Destination Link */}
                  <div style={{ marginTop: '10px' }}>
                    <span
                      className="clean-editable-block"
                      onClick={() => openTextEditor(`spmPage.recentProjects.${idx}.link`, p.link || '/services', `Edit Destination Link (e.g. /services or /project/...)`)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        color: '#bae6fd',
                        backgroundColor: 'rgba(255,255,255,0.14)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        cursor: 'pointer',
                      }}
                      title="Click to edit destination link"
                    >
                      <span>🔗 {p.link || '/services'}</span>
                      <IconPencil size={9} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SPM MANAGEMENT EXPERIENCES (Foto 3)
          ========================================================================= */}
      <section style={{ padding: '80px 24px 100px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ marginBottom: '36px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('spmPage.sec8Tag', sec8Tag, 'Edit Section 8 Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#0072ce',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              <span>— {sec8Tag}</span>
              <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
            </div>

            <h2
              className="clean-editable-block heading-2"
              onClick={() => openTextEditor('spmPage.sec8Title', sec8Title, 'Edit Section 8 Title')}
              style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0c3247', margin: 0, fontFamily: 'var(--font-heading)', cursor: 'pointer' }}
            >
              <span>{sec8Title}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {spmExperiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
              >
                {/* Photo with Change Photo button */}
                <div style={{ position: 'relative', width: '100px', height: '80px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => openMediaPicker(`spmPage.spmExperiences.${idx}.image`, exp.image, `Change Photo: ${exp.title}`)}
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Change Photo"
                  >
                    <IconCamera size={11} color="#38bdf8" />
                  </button>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#e5a93b', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span
                      className="clean-editable-block"
                      onClick={() => openTextEditor(`spmPage.spmExperiences.${idx}.tag`, exp.tag, `Edit Location / Country`)}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>{exp.tag}</span>
                      <span className="hover-edit-badge"><IconPencil size={9} /></span>
                    </span>
                    <span>•</span>
                    <span
                      className="clean-editable-block"
                      onClick={() => openTextEditor(`spmPage.spmExperiences.${idx}.year`, exp.year, `Edit Year`)}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>{exp.year}</span>
                      <span className="hover-edit-badge"><IconPencil size={9} /></span>
                    </span>
                  </div>

                  <h4
                    className="clean-editable-block"
                    onClick={() => openTextEditor(`spmPage.spmExperiences.${idx}.title`, exp.title, `Edit Experience Title`)}
                    style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0c3247', margin: '0 0 4px', lineHeight: 1.3, cursor: 'pointer' }}
                  >
                    <span>{exp.title}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Edit</span>
                  </h4>

                  <p
                    className="clean-editable-block"
                    onClick={() => openTextEditor(`spmPage.spmExperiences.${idx}.desc`, exp.desc, `Edit Experience Description`, true)}
                    style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.4, cursor: 'pointer' }}
                  >
                    <span>{exp.desc}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Edit</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AdminVisualFooter
        general={general}
        openTextEditor={openTextEditor}
        openMediaPicker={openMediaPicker}
      />
    </div>
  );
}
