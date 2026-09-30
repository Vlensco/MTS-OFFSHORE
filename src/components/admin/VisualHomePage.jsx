'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { IconCamera, IconPencil, IconPlus } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';
import { PROJECTS as DEFAULT_PROJECTS } from '../../data/projectsData';

export default function VisualHomePage({
  content = {},
  projectsList = [],
  onOpenProjectModal,
  openTextEditor,
  openMediaPicker,
}) {
  const home = content?.home || {};
  const hero = home.hero || {};
  const services = home.services || {};
  const about = home.about || {};
  const planning = home.planning || {};
  const projectsSection = home.projectsSection || {};
  const general = content?.general || {};

  const [activeAccordionPhase, setActiveAccordionPhase] = useState(1);

  const defaultServices = [
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

  const serviceItems = services.items?.length ? services.items : defaultServices;

  const defaultPhases = [
    {
      id: 1,
      badge: 'Phase 01',
      title: 'Project Planning & FEED Services',
      desc: 'Primary work methods, feasibility, metocean analysis, route surveys, and constructability assessments for complex offshore campaigns.',
      image: '/assets/images/mts_pmc_control.jpg',
    },
    {
      id: 2,
      badge: 'Phase 02',
      title: 'Detailed Design & Engineering Services',
      desc: 'Detailed structural design, subsea flowline modeling, dynamic riser simulation, and CALM buoy configuration under international codes.',
      image: '/assets/images/mts_subsea_aim.jpg',
    },
    {
      id: 3,
      badge: 'Phase 03',
      title: 'Marine Execution, Installation And Commissioning',
      desc: 'Turnkey offshore execution with heavy-lift crane vessels, pipelaying barges, saturation diving spreads, and precision telemetry.',
      image: '/assets/images/mts_ti_heavylift.jpg',
    },
  ];

  const planningPhases = (planning.items?.length ? planning.items : defaultPhases).map((item, idx) => ({
    ...item,
    badge: item.badge || defaultPhases[idx]?.badge || `Phase 0${idx + 1}`,
    desc: item.desc || defaultPhases[idx]?.desc || '',
  }));

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* ---------------- SECTION 1: HERO BANNER ---------------- */}
      <div className="home-four-hero" style={{ position: 'relative' }}>
        <div
          className="home-four-hero-puzzle-wrapper"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.52), rgba(5, 19, 41, 0.74)), url("${hero.bgImage || '/assets/images/mts_hero_cinematic.jpg'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '110px 24px 90px',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Floating Change BG button */}
          <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 20 }}>
            <button
              type="button"
              onClick={() => openMediaPicker('home.hero.bgImage', hero.bgImage, 'Change Hero Background Photo')}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                padding: '7px 14px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              }}
            >
              <IconCamera size={14} color="#38bdf8" />
              <span>Change Hero Background</span>
            </button>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            {/* Tagline Pill */}
            <div style={{ marginBottom: '14px', display: 'inline-block' }}>
              <div
                className="clean-editable-block"
                onClick={() => openTextEditor('home.hero.tag', hero.tag, 'Edit Hero Tagline')}
                style={{
                  padding: '6px 16px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#0072ce',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 8px rgba(0, 114, 206, 0.4)',
                }}
                title="Click to edit tagline"
              >
                <span>{hero.tag || 'WELCOME TO MARINE TERMINAL SERVICES'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </div>
            </div>

            {/* Main Title */}
            <div style={{ marginBottom: '16px' }}>
              <h1
                className="clean-editable-block"
                onClick={() => openTextEditor('home.hero.title', hero.title, 'Edit Hero Title')}
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  margin: 0,
                  padding: '4px 8px',
                  lineHeight: 1.2,
                  color: '#ffffff',
                  textShadow: '0 2px 14px rgba(0,0,0,0.5)',
                }}
                title="Click to edit main title"
              >
                <span>{hero.title || 'Global Offshore Construction & Subsea Services'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h1>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '24px' }}>
              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('home.hero.description', hero.description, 'Edit Hero Description', true)}
                style={{
                  fontSize: '1.05rem',
                  color: '#e2e8f0',
                  margin: 0,
                  lineHeight: 1.6,
                  padding: '4px 8px',
                  maxWidth: '720px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontFamily: 'var(--font-body)',
                }}
                title="Click to edit description"
              >
                <span>{hero.description || 'Delivering safe and efficient PM&C, T&I, and marine terminal services worldwide.'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div
                className="clean-editable-block"
                onClick={() => openTextEditor('home.hero.primaryBtnText', hero.primaryBtnText, 'Edit Button 1 Text')}
                style={{
                  backgroundColor: '#0072ce',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.925rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0, 114, 206, 0.4)',
                }}
              >
                <span>{hero.primaryBtnText || 'Our Advantage'}</span>
                <span>→</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </div>

              <div
                className="clean-editable-block"
                onClick={() => openTextEditor('home.hero.secondaryBtnText', hero.secondaryBtnText, 'Edit Button 2 Text')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.925rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{hero.secondaryBtnText || 'Explore Services'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 2: OUR SERVICES (4 CARDS) ---------------- */}
      <section className="home-four-service" style={{ padding: '80px 32px 90px', backgroundColor: '#f4f6f9', color: '#0f172a' }}>
        <div className="w-layout-blockcontainer home-four-service-container w-container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <div
              className="clean-editable-block tag"
              onClick={() => openTextEditor('home.services.tag', services.tag, 'Edit Services Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                backgroundColor: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#0284c7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              <span>{services.tag || 'OUR SERVICES'}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </div>

            <h2
              className="clean-editable-block heading-2"
              onClick={() => openTextEditor('home.services.title', services.title, 'Edit Services Title')}
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                color: '#0c3247',
                margin: '0 0 12px 0',
                display: 'block',
              }}
            >
              <span>{services.title || 'Comprehensive Offshore Solutions'}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </h2>

            <p
              className="clean-editable-block home-four-service-paragraph-block"
              onClick={() => openTextEditor('home.services.description', services.description, 'Edit Services Description', true)}
              style={{ color: '#556987', maxWidth: '720px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}
            >
              <span>{services.description || 'We deliver a wide range of offshore installation, Construction, Project Management and Consultancy Services for Subsea and Surface Projects Worldwide.'}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div
            className="w-layout-grid home-four-services-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {serviceItems.map((card, idx) => (
              <div
                key={idx}
                className="home-four-service-card overflow-hidden"
                style={{
                  backgroundColor: '#0c1e33',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  height: '448px',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Change Photo Button */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                    <button
                      type="button"
                      onClick={() => openMediaPicker(`home.services.items.${idx}.image`, card.image, `Change Photo: ${card.title}`)}
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
                    <div style={{ marginBottom: '8px' }}>
                      <span
                        className="clean-editable-block"
                        onClick={() => openTextEditor(`home.services.items.${idx}.tag`, card.tag, `Edit Card ${idx + 1} Tag`)}
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
                        {card.tag}
                        <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                      </span>
                    </div>

                    <div
                      className="clean-editable-block"
                      onClick={() => openTextEditor(`home.services.items.${idx}.title`, card.title, `Edit Card ${idx + 1} Title`)}
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.3,
                        marginBottom: '12px',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {card.title}
                      <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>
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

          {/* Two Action Buttons below 4 cards matching Image 1 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '45px', flexWrap: 'wrap' }}>
            <div
              style={{
                backgroundColor: '#146cac',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              MTS OFFSHORE Capability Statement
            </div>
            <div
              style={{
                backgroundColor: '#146cac',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              MTS OFFSHORE BROCHURES
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: ABOUT US ---------------- */}
      <section className="home-four-about-us" style={{ padding: '90px 32px', backgroundColor: '#ffffff', color: '#0c3247' }}>
        <div className="w-layout-blockcontainer home-four-about-us-container w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Left Column */}
            <div>
              <div
                className="clean-editable-block single-line-tag"
                onClick={() => openTextEditor('home.about.tag', about.tag, 'Edit About Tag')}
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
                  marginBottom: '10px',
                }}
              >
                <span>{about.tag || 'ABOUT US'}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block heading-2"
                onClick={() => openTextEditor('home.about.title', about.title, 'Edit About Title')}
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 16px 0',
                }}
              >
                <span>{about.title || 'Offshore Construction Services'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('home.about.description', about.description, 'Edit About Description', true)}
                style={{ color: '#556987', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px', fontFamily: 'var(--font-body)' }}
              >
                <span>{about.description || "MTS OFFSHORE's operations span over three decades, successfully delivering complex marine projects across the Middle East, Europe, South East Asia and Oceania."}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              {/* 3 Checkmark Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {[
                  { key: 'bullet1', text: about.bullet1 || 'Expert Personnel and technical understanding of Offshore Industry Standards' },
                  { key: 'bullet2', text: about.bullet2 || 'Outstanding Quality management and Process Control' },
                  { key: 'bullet3', text: about.bullet3 || 'Proven Track Record Of Safe and Reliable Project Delivery' },
                ].map((b) => (
                  <div key={b.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#e5a93b', fontSize: '1.2rem', fontWeight: 900 }}>●</span>
                    <span
                      className="clean-editable-block"
                      onClick={() => openTextEditor(`home.about.${b.key}`, b.text, 'Edit Checklist Bullet')}
                      style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}
                    >
                      {b.text}
                      <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Mission & Vision Card */}
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '18px',
                  marginBottom: '28px',
                  alignItems: 'center',
                }}
              >
                <div style={{ position: 'relative', width: '130px', height: '90px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
                  <img
                    src={about.thumbImage || '/assets/images/about_thumb.jpg'}
                    alt="Mission"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => openMediaPicker('home.about.thumbImage', about.thumbImage, 'Change Mission Photo')}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: 'rgba(15,23,42,0.85)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <IconCamera size={11} color="#38bdf8" />
                  </button>
                </div>
                <div>
                  <h4
                    className="clean-editable-block"
                    onClick={() => openTextEditor('home.about.missionTitle', about.missionTitle, 'Edit Mission Title')}
                    style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0c3247', margin: '0 0 6px 0', fontFamily: 'var(--font-heading)' }}
                  >
                    {about.missionTitle || 'Our Mission & Vision'}
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </h4>
                  <p
                    className="clean-editable-block"
                    onClick={() => openTextEditor('home.about.missionDesc', about.missionDesc, 'Edit Mission Description', true)}
                    style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}
                  >
                    {about.missionDesc || 'Fueling the future of offshore construction. We are pioneers of turnkey offshore construction services.'}
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </p>
                </div>
              </div>

              {/* Button */}
              <div
                style={{
                  backgroundColor: '#146cac',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'inline-block',
                }}
              >
                About Us
              </div>
            </div>

            {/* Right Column (2 workers image + 80+ badge) */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(5, 19, 41, 0.16)', position: 'relative' }}>
                <img
                  src={about.mainImage || '/assets/images/about_jacket_portrait.jpg'}
                  alt="Offshore Workers"
                  style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block' }}
                />

                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('home.about.mainImage', about.mainImage, 'Change Main About Photo')}
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

                {/* Overlaid 80+ Years Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    maxWidth: '280px',
                  }}
                >
                  <div style={{ position: 'relative', width: '65px', height: '55px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={about.badgeImage || '/assets/img/65d42addbadc4b36cf019683_20200121_134838.jpg'}
                      alt="Experience"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPicker('home.about.badgeImage', about.badgeImage, 'Change Badge Photo')}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <IconCamera size={9} color="#38bdf8" />
                    </button>
                  </div>
                  <div>
                    <div
                      className="clean-editable-block"
                      onClick={() => openTextEditor('home.about.badgeNumber', about.badgeNumber, 'Edit Badge Number')}
                      style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0c3247', lineHeight: 1, fontFamily: 'var(--font-heading)' }}
                    >
                      {about.badgeNumber || '80+'}
                      <span className="hover-edit-badge"><IconPencil size={9} /></span>
                    </div>
                    <div
                      className="clean-editable-block"
                      onClick={() => openTextEditor('home.about.badgeText', about.badgeText, 'Edit Badge Label')}
                      style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}
                    >
                      {about.badgeText || 'Years Of Management Experience'}
                      <span className="hover-edit-badge"><IconPencil size={9} /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: WHY CHOOSE US (PLANNING ACCORDION) ---------------- */}
      <section style={{ padding: '90px 32px', backgroundColor: '#f8fafc', color: '#0c3247' }}>
        <div className="w-layout-blockcontainer w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '50px', alignItems: 'center' }}>
            {/* Left Photo Card */}
            <div style={{ position: 'relative' }}>
              {(() => {
                const currentPhaseIdx = activeAccordionPhase >= 0 && activeAccordionPhase < planningPhases.length ? activeAccordionPhase : 0;
                const currentPhase = planningPhases[currentPhaseIdx] || planningPhases[0] || {};
                return (
                  <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(5, 19, 41, 0.12)', height: '440px', position: 'relative' }}>
                    <img
                      key={currentPhaseIdx}
                      src={currentPhase.image || '/assets/images/mts_pmc_control.jpg'}
                      alt={currentPhase.title || 'Planning'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease-in-out' }}
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPicker(`home.planning.items.${currentPhaseIdx}.image`, currentPhase.image, `Change Photo for ${currentPhase.badge || `Phase 0${currentPhaseIdx + 1}`}`)}
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        backgroundColor: 'rgba(15,23,42,0.88)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        zIndex: 10,
                      }}
                    >
                      <IconCamera size={13} color="#38bdf8" />
                      <span>Change {currentPhase.badge || `Phase 0${currentPhaseIdx + 1}`} Photo</span>
                    </button>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        backgroundColor: 'rgba(5, 19, 41, 0.92)',
                        backdropFilter: 'blur(8px)',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ color: '#e5a93b', fontWeight: 800, fontSize: '1.1rem' }}>
                        100+ Offshore Campaigns Delivered
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                        Flawless execution from initial review to subsea construction worldwide.
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Right Accordion */}
            <div>
              <div
                className="clean-editable-block"
                onClick={() => openTextEditor('home.planning.tag', planning.tag, 'Edit Planning Tag')}
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
                  marginBottom: '10px',
                }}
              >
                <span>{planning.tag || 'WHY CHOOSE US'}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block heading-2"
                onClick={() => openTextEditor('home.planning.title', planning.title, 'Edit Planning Title')}
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 24px 0',
                }}
              >
                <span>{planning.title || 'Project Planning & Offshore Delivery'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              {/* 3 Accordion Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {planningPhases.map((phase, idx) => {
                  const isOpen = activeAccordionPhase === idx;
                  return (
                    <div
                      key={phase.id || idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: isOpen ? '2px solid #0072ce' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        onClick={() => setActiveAccordionPhase(idx)}
                        style={{
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          backgroundColor: isOpen ? '#f0f9ff' : '#ffffff',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span
                            className="clean-editable-block"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTextEditor(`home.planning.items.${idx}.badge`, phase.badge || `Phase 0${idx + 1}`, `Edit Phase ${idx + 1} Badge`);
                            }}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: '#0072ce',
                              textTransform: 'uppercase',
                              padding: '2px 6px',
                              backgroundColor: '#e0f2fe',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <span>{phase.badge || `Phase 0${idx + 1}`}</span>
                            <span className="hover-edit-badge"><IconPencil size={9} /></span>
                          </span>
                          <span
                            className="clean-editable-block"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTextEditor(`home.planning.items.${idx}.title`, phase.title, `Edit Phase ${idx + 1} Title`);
                            }}
                            style={{ fontWeight: 700, fontSize: '1rem', color: '#0c3247' }}
                          >
                            {phase.title}
                            <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                          </span>
                        </div>
                        <span style={{ fontSize: '1rem', color: '#0072ce', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                          ▼
                        </span>
                      </div>

                      {isOpen && (
                        <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                          <p
                            className="clean-editable-block"
                            onClick={() => openTextEditor(`home.planning.items.${idx}.desc`, phase.desc, `Edit Phase ${idx + 1} Description`, true)}
                            style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-body)' }}
                          >
                            {phase.desc}
                            <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: FEATURED PROJECTS (HORIZONTAL CAROUSEL — EXACT IMAGE 2) ---------------- */}
      <section className="home-three-project-section" style={{ backgroundColor: '#ffffff', padding: '70px 0 75px 0', color: '#0c3247' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          {/* Header Row with Tag, Title, and Circular Arrows < > */}
          <div className="projects-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div
                className="clean-editable-block"
                onClick={() => openTextEditor('home.projectsSection.tag', projectsSection.tag, 'Edit Projects Tag')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0c3247',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                }}
              >
                <span>{(projectsSection.tag || 'FEATURED WORK').toUpperCase().replace(/^[-—\s]+/, '')}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block heading-2"
                onClick={() => openTextEditor('home.projectsSection.title', projectsSection.title, 'Edit Projects Title')}
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 2.75rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#0c3247',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                <span>{projectsSection.title || 'Projects'}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>
            </div>

            {/* Circular Navigation Buttons < > matching Image 2 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('admin-home-projects-track');
                  if (el) el.scrollBy({ left: -404, behavior: 'smooth' });
                }}
                title="Previous Projects"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0c3247',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('admin-home-projects-track');
                  if (el) el.scrollBy({ left: 404, behavior: 'smooth' });
                }}
                title="Next Projects"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0c3247',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Projects Carousel Track (Single Row, No Wrap — Exact Image 2) */}
        <div
          id="admin-home-projects-track"
          style={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'block',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              gap: '24px',
              width: 'max-content',
              paddingLeft: 'max(24px, calc((100vw - 1290px) / 2 + 15px))',
              paddingRight: 'max(24px, calc((100vw - 1290px) / 2 + 15px))',
            }}
          >
            {(() => {
              const allProjects = projectsList && projectsList.length > 0 ? projectsList : DEFAULT_PROJECTS;
              const homeProjects = allProjects.slice(0, 5);

              return homeProjects.map((proj, idx) => (
                <div
                  key={proj.slug || idx}
                  style={{
                    flex: '0 0 380px',
                    width: '380px',
                    minWidth: '380px',
                    maxWidth: '380px',
                    height: '460px',
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'block',
                    backgroundColor: '#0c3247',
                    boxShadow: '0 12px 30px rgba(5, 19, 41, 0.14)',
                  }}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Action Buttons: Photo & Edit */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 15, display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => openMediaPicker(`project-img-${proj.slug}`, proj.image, `Change Photo: ${proj.title}`)}
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
                      title="Change Project Cover Photo"
                    >
                      <IconCamera size={12} color="#38bdf8" /> Photo
                    </button>

                    {onOpenProjectModal && (
                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(proj)}
                        style={{
                          backgroundColor: '#0072ce',
                          border: 'none',
                          color: '#ffffff',
                          padding: '5px 10px',
                          borderRadius: '999px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        }}
                        title="Edit Project Details & Text"
                      >
                        <IconPencil size={11} color="#ffffff" /> Edit
                      </button>
                    )}
                  </div>

                  {/* Bottom White Tab with Yellow Accent Line */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      position: 'absolute',
                      bottom: '24px',
                      left: '0',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      maxWidth: '88%',
                      borderRadius: '0 8px 8px 0',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
                      zIndex: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ backgroundColor: '#f6b61b', width: '28px', height: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0072ce', textTransform: 'uppercase' }}>
                        {proj.category || proj.service || 'Offshore'}
                      </span>
                    </div>

                    <h3
                      className="clean-editable-block"
                      onClick={() => onOpenProjectModal ? onOpenProjectModal(proj) : null}
                      style={{
                        margin: '2px 0 0',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.35,
                        fontFamily: 'var(--font-heading)',
                        cursor: 'pointer',
                      }}
                      title="Click to edit project details"
                    >
                      <span>{proj.title}</span>
                      <span className="hover-edit-badge"><IconPencil size={9} /> Edit</span>
                    </h3>

                    {/* Destination Link Badge */}
                    <div style={{ marginTop: '2px' }}>
                      <span
                        onClick={() => onOpenProjectModal ? onOpenProjectModal(proj) : null}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.7rem',
                          color: '#0284c7',
                          backgroundColor: '#f0f9ff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                        title="Destination Link (Click to edit project)"
                      >
                        <span>🔗 /project/{proj.slug}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Progress Bar Indicator: 01 ────────── 05 (Exact Image 2) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <span
            style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              color: '#0c3247',
              letterSpacing: '0.05em',
              minWidth: '24px',
              textAlign: 'right',
            }}
          >
            01
          </span>
          <div
            style={{
              width: '240px',
              height: '4px',
              backgroundColor: '#e2e8f0',
              borderRadius: '999px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                backgroundColor: '#0c3247',
                borderRadius: '999px',
                width: '40%',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              color: '#64748b',
              letterSpacing: '0.05em',
              minWidth: '24px',
            }}
          >
            05
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <AdminVisualFooter general={general} openTextEditor={openTextEditor} openMediaPicker={openMediaPicker} />
    </div>
  );
}
