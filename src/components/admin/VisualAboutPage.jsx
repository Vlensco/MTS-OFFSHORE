'use client';

import React from 'react';
import Link from 'next/link';
import { IconCamera, IconPencil } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';

export default function VisualAboutPage({
  content = {},
  openTextEditor,
  openMediaPicker,
}) {
  const about = content?.aboutPage || {};
  const general = content?.general || {};

  // SECTION 1: HERO
  const heroTag = about.heroTag || 'ABOUT MTS OFFSHORE';
  const heroTitle = about.heroTitle || 'Experts In Offshore Construction, Operations & Maintenance';
  const heroDesc =
    about.heroDesc ||
    'Delivering Proven safe, and cost-effective offshore construction, transport & installation, and marine terminal services worldwide.';
  const heroBg = about.heroBg || '/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg';

  // SECTION 2: STORY
  const storyTag = about.storyTag || 'OUR STORY';
  const storyTitle =
    about.storyTitle ||
    'Over 80 Years Of Combined Management Experience Delivering Worldwide Oil & Gas Projects';
  const storyP1 =
    about.storyP1 ||
    'MTS OFFSHORE brings together seasoned offshore marine construction professionals with decades of hands-on expertise in Surface / Subsea Installation & O&M on FSO / FPSO, SPM Systems, Platform projects around the world.';
  const storyP2 =
    about.storyP2 ||
    'From Single Point Mooring (SPM) CALM buoy changeouts to deepwater subsea flowline stabilization, jacket installations, and topside rejuvenations, our multi-disciplinary offshore taskforces deliver safely, on schedule, and within budget.';
  const storyImg = about.storyImg || '/assets/images/mts_ti_heavylift.jpg';

  // SECTION 3: WHY CHOOSE US (DARK NAVY SECTION - IMAGE 2)
  const whyTag = about.whyTag || 'WHY CHOOSE US';
  const whyTitle = about.whyTitle || 'Tailored Solutions For Offshore';
  const whyDesc =
    about.whyDesc ||
    'MTS OFFSHORE develops tailored offshore solutions that work specifically for Client operations. Our flexible and collaborative approach ensures stakeholder satisfaction and reliable work delivery.';

  const whyCards = about.whyCards || [
    {
      title: 'Commitment to Safety & Quality',
      img: '/assets/img/65d42f6da16840ca2f806a13_PMT3.png',
      link: '/services',
      alt: 'Commitment to Safety & Quality',
    },
    {
      title: 'Global Turn-key Offshore Solutions',
      img: '/assets/img/69c040bdb0bd6707f3fccde4_DJI_20260214070435_0974_D.JPG',
      link: '/services',
      alt: 'Global Turn-key Offshore Solutions',
    },
    {
      title: 'Expert Personnel and Engineering',
      img: '/assets/img/65d42c822b203dab730eac0d_TI3.png',
      link: '/our-advantage',
      alt: 'Expert Personnel and Engineering',
    },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* =========================================================================
          SECTION 1: HERO BANNER (Image 2 — Crisp White Title, Blue Pill Tag)
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
            onClick={() => openMediaPicker('aboutPage.heroBg', heroBg, 'Change About Hero Background')}
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
          {/* Blue Pill Tag with Gold Border on Left */}
          <div style={{ marginBottom: '16px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('aboutPage.heroTag', heroTag, 'Edit About Hero Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: '#0072ce',
                borderLeft: '4px solid #e5a93b',
                color: '#ffffff',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <span>{heroTag}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </div>
          </div>

          {/* Crisp White Heading (Image 2) */}
          <h1
            className="clean-editable-block text-color-white"
            onClick={() => openTextEditor('aboutPage.heroTitle', heroTitle, 'Edit About Hero Title')}
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              color: '#ffffff !important',
              lineHeight: 1.2,
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
              textShadow: '0 3px 18px rgba(0,0,0,0.6)',
            }}
          >
            <span>{heroTitle}</span>
            <span className="hover-edit-badge"><IconPencil size={12} /> Edit</span>
          </h1>

          {/* Clean Description */}
          <p
            className="clean-editable-block"
            onClick={() => openTextEditor('aboutPage.heroDesc', heroDesc, 'Edit About Hero Description', true)}
            style={{
              fontSize: '1.05rem',
              color: '#cbd5e1',
              maxWidth: '760px',
              margin: '0 auto',
              lineHeight: 1.65,
              fontFamily: 'var(--font-body)',
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            }}
          >
            <span>{heroDesc}</span>
            <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPANY STORY WITH ISO BADGE (Exact Image 2)
          ========================================================================= */}
      <section style={{ padding: '90px 24px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            {/* Left Story Text */}
            <div>
              <div
                className="clean-editable-block single-line-tag"
                onClick={() => openTextEditor('aboutPage.storyTag', storyTag, 'Edit Story Tag')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0072ce',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                <span>{storyTag.replace(/^[-—\s]+/, '')}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block"
                onClick={() => openTextEditor('aboutPage.storyTitle', storyTitle, 'Edit Story Main Title')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 24px',
                }}
              >
                <span>{storyTitle}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('aboutPage.storyP1', storyP1, 'Edit Story Paragraph 1', true)}
                style={{
                  color: '#475569',
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  marginBottom: '18px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{storyP1}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('aboutPage.storyP2', storyP2, 'Edit Story Paragraph 2', true)}
                style={{
                  color: '#475569',
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  marginBottom: '32px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{storyP2}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              {/* Two Buttons matching Image 2 */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    backgroundColor: '#0072ce',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>Our Advantage →</span>
                </div>
                <div
                  style={{
                    border: '2px solid #0c3247',
                    color: '#0c3247',
                    backgroundColor: 'transparent',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <span>Get In Touch</span>
                </div>
              </div>
            </div>

            {/* Right Photo with ISO Badge (Exact Image 2) */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(5, 19, 41, 0.16)',
                }}
              >
                <img
                  src={storyImg}
                  alt="Offshore Construction Operations"
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Change Photo Button */}
                <button
                  type="button"
                  onClick={() => openMediaPicker('aboutPage.storyImg', storyImg, 'Change Story Photo')}
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

              {/* Floating ISO Badge in Bottom-Right Corner (Exact Image 2) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-15px',
                  backgroundColor: '#0c1e33',
                  color: '#ffffff',
                  padding: '20px 24px',
                  borderRadius: '8px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                  maxWidth: '240px',
                  zIndex: 5,
                  borderLeft: '4px solid #e5a93b',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e5a93b', lineHeight: 1.1 }}>
                  ISO
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginTop: '4px', lineHeight: 1.4 }}>
                  Certified Management Systems: 9001, 14001 &amp; 45001
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHY CHOOSE US (DARK NAVY BACKGROUND — EXACT IMAGE 2)
          ========================================================================= */}
      <section style={{ backgroundColor: '#0c1e33', color: '#ffffff', padding: '90px 24px 100px' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          {/* Header Row: Left Title & Right Description */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '30px',
              marginBottom: '50px',
            }}
          >
            <div style={{ maxWidth: '520px' }}>
              <div
                className="clean-editable-block"
                onClick={() => openTextEditor('aboutPage.whyTag', whyTag, 'Edit Why Choose Us Tag')}
                style={{
                  color: '#ffb800',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{whyTag}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block text-color-white text-white"
                onClick={() => openTextEditor('aboutPage.whyTitle', whyTitle, 'Edit Why Choose Us Title')}
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <span>{whyTitle}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>
            </div>

            <div style={{ maxWidth: '560px' }}>
              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('aboutPage.whyDesc', whyDesc, 'Edit Why Choose Us Description', true)}
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.7,
                  color: '#cbd5e1',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{whyDesc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>
            </div>
          </div>

          {/* 3 Cards Grid (Exact Image 2) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '26px',
            }}
          >
            {whyCards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Photo with Change Photo button */}
                <div style={{ position: 'relative', height: '260px' }}>
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker(
                          `aboutPage.whyCards.${idx}.img`,
                          card.img,
                          `Change Photo: ${card.title}`
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
                      <IconCamera size={12} color="#38bdf8" /> Photo
                    </button>
                  </div>
                </div>

                {/* Bottom White Tab with Title and Arrow (Exact Image 2) */}
                <div
                  style={{
                    padding: '20px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div
                    className="clean-editable-block"
                    onClick={() =>
                      openTextEditor(
                        `aboutPage.whyCards.${idx}.title`,
                        card.title,
                        `Edit Card ${idx + 1} Title`
                      )
                    }
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0072ce',
                      margin: 0,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    <span>{card.title}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>

                  <span style={{ fontSize: '1.2rem', color: '#0072ce', fontWeight: 800 }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <AdminVisualFooter
        general={general}
        openTextEditor={openTextEditor}
        openMediaPicker={openMediaPicker}
      />
    </div>
  );
}
