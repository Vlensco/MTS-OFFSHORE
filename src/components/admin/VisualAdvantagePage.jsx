'use client';

import React from 'react';
import { IconCamera, IconPencil } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';

export default function VisualAdvantagePage({
  content = {},
  openTextEditor,
  openMediaPicker,
}) {
  const advantage = content?.advantagePage || {};
  const general = content?.general || {};

  const heroTag = advantage.heroTag || 'WHY CHOOSE MTS';
  const heroTitle = advantage.heroTitle || 'Our Competitive Advantage';
  const heroDesc =
    advantage.heroDesc ||
    'Lean operations, elite marine engineers, unmatched safety record, and agile offshore mobilization capabilities.';
  const heroBg = advantage.heroBg || '/assets/images/hero_barge.jpg';

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* Advantage Hero */}
      <div
        className="home-four-hero"
        style={{
          position: 'relative',
          height: '460px',
          backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.78)), url("${heroBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
          <button
            type="button"
            onClick={() => openMediaPicker('advantagePage.heroBg', heroBg, 'Change Advantage Hero Background')}
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <IconCamera size={13} color="#38bdf8" />
            <span>Change Hero Background</span>
          </button>
        </div>

        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ marginBottom: '14px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('advantagePage.heroTag', heroTag, 'Edit Advantage Hero Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                backgroundColor: 'rgba(0, 114, 206, 0.4)',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                color: '#38bdf8',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              <span>{heroTag}</span>
              <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
            </div>
          </div>

          <h1
            className="clean-editable-block"
            onClick={() => openTextEditor('advantagePage.heroTitle', heroTitle, 'Edit Advantage Hero Title')}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span>{heroTitle}</span>
            <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
          </h1>

          <p
            className="clean-editable-block"
            onClick={() => openTextEditor('advantagePage.heroDesc', heroDesc, 'Edit Advantage Hero Description', true)}
            style={{
              fontSize: '1.05rem',
              color: '#cbd5e1',
              maxWidth: '740px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
            }}
          >
            <span>{heroDesc}</span>
            <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <section className="section" style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ marginBottom: '40px' }}>
            <div style={{ color: '#0072ce', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              WHY MTS OFFSHORE
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0c3247', margin: '6px 0 0' }}>
              Built On Trust, Safety &amp; Technical Agility
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ padding: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', borderTop: '4px solid #0072ce' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '14px', color: '#0c3247' }}>
                Tier-1 Technical Expertise
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0, fontFamily: 'var(--font-body)' }}>
                Our management team has successfully delivered high-stakes offshore construction, T&amp;I, and FPSO installation campaigns across Asia, Africa, and the Middle East.
              </p>
            </div>

            <div style={{ padding: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', borderTop: '4px solid #f26522' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '14px', color: '#0c3247' }}>
                Hands-On Leadership
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0, fontFamily: 'var(--font-body)' }}>
                We are driven by a commitment to operational excellence, efficiency, and performance. MTS OFFSHORE provides clients with a dependable partner capable of executing critical scopes.
              </p>
            </div>

            <div style={{ padding: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', borderTop: '4px solid #e5a93b' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '14px', color: '#0c3247' }}>
                Focused On Safety
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0, fontFamily: 'var(--font-body)' }}>
                All operations are delivered in compliance with international HSE standards, project-specific requirements, and permit-to-work systems. Safety underpins every decision we make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AdminVisualFooter general={general} openTextEditor={openTextEditor} openMediaPicker={openMediaPicker} />
    </div>
  );
}
