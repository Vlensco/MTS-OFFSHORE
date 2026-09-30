'use client';

import React from 'react';
import { IconCamera, IconPencil } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';

export default function VisualContactPage({
  content = {},
  openTextEditor,
  openMediaPicker,
}) {
  const general = content?.general || {};
  const contactPage = content?.contactPage || {};

  // HERO
  const heroTag = contactPage.heroTag || 'GET IN TOUCH';
  const heroTitle = contactPage.heroTitle || 'Contact Us';
  const heroBg = contactPage.heroBg || '/assets/img/69379730c6c6232f46ca69d1_20190108_102901.jpg';

  // LEFT COLUMN INFO (Exact Foto 4)
  const groupTag = contactPage.groupTag || 'MTS OFFSHORE GROUP';
  const groupTitle =
    contactPage.groupTitle ||
    'MTS OFFSHORE Group Offers Offshore Construction Services Worldwide.';
  const groupDesc =
    contactPage.groupDesc ||
    'See below our head office locations and other locations part of the MTS OFFSHORE Group.';

  const office1Title = contactPage.office1Title || 'HEAD OFFICE - SINGAPORE';
  const office1Company = contactPage.office1Company || 'MTS OFFSHORE GROUP PTE LTD';
  const office1Address = contactPage.office1Address || '51 Goldhill Plaza #22-03, Singapore 308900';

  const office2Title = contactPage.office2Title || 'PAPUA NEW GUINEA';
  const office2Company = contactPage.office2Company || 'MTS OFFSHORE PNG LIMITED';
  const office2Address =
    contactPage.office2Address ||
    'L5, MRDC Haus, Cnr of Musgrave Street & Champion Parade, Port Moresby, NCD 121, Papua New Guinea';

  const contactEmailTitle = contactPage.contactEmailTitle || 'HAVE A PROJECT IN MIND? SEND A MESSAGE.';
  const contactEmail = contactPage.contactEmail || general.contactEmail || 'contact@mtsoffshore.com';

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* =========================================================================
          SECTION 1: HERO BANNER (Exact Foto 4 — Crane Vessel, Tag, White Title)
          ========================================================================= */}
      <section
        className="contact-page-hero"
        style={{
          position: 'relative',
          minHeight: '380px',
          backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.6), rgba(5, 19, 41, 0.8)), url("${heroBg}")`,
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
            onClick={() => openMediaPicker('contactPage.heroBg', heroBg, 'Change Contact Hero Background')}
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
          <div style={{ marginBottom: '14px' }}>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('contactPage.heroTag', heroTag, 'Edit Hero Tag')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#e5a93b',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span>{heroTag.replace(/^[-—\s]+/, '')}</span>
              <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
            </div>
          </div>

          <h1
            className="clean-editable-block text-color-white"
            onClick={() => openTextEditor('contactPage.heroTitle', heroTitle, 'Edit Contact Hero Title')}
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#ffffff !important',
              lineHeight: 1.15,
              margin: 0,
              fontFamily: 'var(--font-heading)',
              textShadow: '0 3px 18px rgba(0,0,0,0.6)',
            }}
          >
            <span>{heroTitle}</span>
            <span className="hover-edit-badge"><IconPencil size={12} /> Edit</span>
          </h1>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MAIN CONTACT SECTION (Exact 1:1 Replica of Foto 4)
          ========================================================================= */}
      <section style={{ padding: '90px 24px 110px', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '60px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Column: Office Locations & Contact Info (Exact Foto 4) */}
            <div>
              <div
                className="clean-editable-block single-line-tag"
                onClick={() => openTextEditor('contactPage.groupTag', groupTag, 'Edit Group Tag')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0072ce',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                }}
              >
                <span>{groupTag.replace(/^[-—\s]+/, '')}</span>
                <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
              </div>

              <h2
                className="clean-editable-block"
                onClick={() => openTextEditor('contactPage.groupTitle', groupTitle, 'Edit Group Heading')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
                  fontWeight: 800,
                  color: '#0c3247',
                  lineHeight: 1.25,
                  margin: '0 0 18px',
                }}
              >
                <span>{groupTitle}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </h2>

              <p
                className="clean-editable-block"
                onClick={() => openTextEditor('contactPage.groupDesc', groupDesc, 'Edit Group Description', true)}
                style={{
                  color: '#475569',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '36px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{groupDesc}</span>
                <span className="hover-edit-badge"><IconPencil size={11} /> Edit</span>
              </p>

              {/* Office 1: Singapore (Foto 4) */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1838ce_Location_Icons.svg"
                    alt="Pin"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.office1Title', office1Title, 'Edit Office 1 Title')}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#64748b',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    <span>{office1Title}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Edit</span>
                  </div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.office1Company', office1Company, 'Edit Office 1 Company')}
                    style={{ fontWeight: 800, color: '#0c3247', fontSize: '1.05rem', marginBottom: '4px' }}
                  >
                    <span>{office1Company}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.office1Address', office1Address, 'Edit Office 1 Address', true)}
                    style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.5 }}
                  >
                    <span>{office1Address}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>
                </div>
              </div>

              {/* Office 2: Papua New Guinea (Foto 4) */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1838ce_Location_Icons.svg"
                    alt="Pin"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.office2Title', office2Title, 'Edit Office 2 Title')}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#64748b',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    <span>{office2Title}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Edit</span>
                  </div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.office2Company', office2Company, 'Edit Office 2 Company')}
                    style={{ fontWeight: 800, color: '#0c3247', fontSize: '1.05rem', marginBottom: '4px' }}
                  >
                    <span>{office2Company}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.office2Address', office2Address, 'Edit Office 2 Address', true)}
                    style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.5 }}
                  >
                    <span>{office2Address}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>
                </div>
              </div>

              {/* Item 3: Project Email (Foto 4) */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1838d0_Main_Icons.svg"
                    alt="Mail"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.contactEmailTitle', contactEmailTitle, 'Edit Email Title')}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#64748b',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    <span>{contactEmailTitle}</span>
                    <span className="hover-edit-badge"><IconPencil size={9} /> Edit</span>
                  </div>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('contactPage.contactEmail', contactEmail, 'Edit Contact Email')}
                    style={{ fontWeight: 800, color: '#0072ce', fontSize: '1.05rem' }}
                  >
                    <span>{contactEmail}</span>
                    <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Form with Decorative Blue Offset Block (Exact Foto 4) */}
            <div style={{ position: 'relative' }}>
              {/* Decorative Blue Offset Block behind the card (Foto 4 Signature) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: '-16px',
                  width: '140px',
                  height: '140px',
                  backgroundColor: '#0072ce',
                  borderRadius: '16px',
                  zIndex: 1,
                }}
              />

              {/* Card Container */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '40px 36px',
                  boxShadow: '0 20px 50px rgba(5, 19, 41, 0.1)',
                  border: '1px solid #eef2f6',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#0c3247',
                    margin: '0 0 12px 0',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Contact Us
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: '#64748b',
                    margin: '0 0 28px 0',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  We're committed to protecting and respecting your privacy. From time to time, we would like to contact you about our products and services, if you consent. In order to provide you the content requested, we need to store and process your personal data.
                </p>

                {/* 2x2 Form Input Grid matching Foto 4 */}
                <form onSubmit={(e) => e.preventDefault()}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      disabled
                      style={{
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      disabled
                      style={{
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <input
                      type="text"
                      placeholder="Phone No (inc. Country Code)"
                      disabled
                      style={{
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      disabled
                      style={{
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <textarea
                      placeholder="Message"
                      rows={5}
                      disabled
                      style={{
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                        resize: 'none',
                      }}
                    />
                  </div>

                  {/* Send Message Solid Blue Button (Foto 4) */}
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      backgroundColor: '#0072ce',
                      color: '#ffffff',
                      padding: '14px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'default',
                      boxShadow: '0 4px 14px rgba(0, 114, 206, 0.4)',
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
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
