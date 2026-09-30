'use client';

import React from 'react';
import { IconCamera, IconPencil } from './AdminIcons';

export default function AdminVisualFooter({
  general = {},
  openTextEditor,
  openMediaPicker,
}) {
  const siteName = general.siteName || 'MTS OFFSHORE Group';
  const copyright = general.copyright || '© 2026 MTS OFFSHORE Group. All rights reserved.';
  const phone = general.phone || '+65 6235 0000';
  const email = general.contactEmail || 'commercial@mtsoffshore.com';

  return (
    <footer className="footer footer-blue" style={{ backgroundColor: '#146cac', color: '#ffffff', padding: '60px 0 40px' }}>
      <div className="w-layout-blockcontainer container-one w-container">
        <div
          className="w-layout-grid footer-bottom-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2fr 1.2fr',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          {/* Col 1: Logo & Company Entity */}
          <div
            className="footer-col-company"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src="/assets/images/mts_logo.png"
                alt="MTS Offshore - Marine Terminal Services"
                width={260}
                height={165}
                className="image-2"
                style={{
                  objectFit: 'contain',
                  height: '95px',
                  maxHeight: '100px',
                  width: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.18))',
                }}
              />
            </div>
            <div
              className="clean-editable-block"
              onClick={() => openTextEditor('general.copyright', copyright, 'Edit Copyright Text')}
              style={{ marginTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}
            >
              <span>{copyright}</span>
              <span className="hover-edit-badge"><IconPencil size={10} /> Edit</span>
            </div>
          </div>

          {/* Col 2: Site Links with White Vertical Left/Right Borders */}
          <div
            className="footer-text-block align-center"
            style={{
              borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
              borderRight: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0 24px',
            }}
          >
            <div
              className="footer-title"
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '14px',
                textAlign: 'center',
              }}
            >
              Site Links
            </div>
            <div
              className="w-layout-grid grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px 18px',
                textAlign: 'center',
                fontSize: '0.85rem',
              }}
            >
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Home</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Services</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Projects</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Project Management</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Asset Integrity</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Transport &amp; Installation</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>SPMs</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>About</span>
              <span style={{ color: '#ffffff', opacity: 0.9 }}>Contact Us</span>
            </div>
          </div>

          {/* Col 3: ISO Certification Badges */}
          <div
            className="footer-col-iso"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <img
              src="/assets/img/68aeae5e149ae54ab4564fe7_Combined_ISO_Certifications.png"
              alt="Combined ISO Certifications"
              width={190}
              height={135}
              className="image"
              style={{ objectFit: 'contain', height: '115px', width: 'auto' }}
            />
            <div style={{ marginTop: '6px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>
              ISO 9001 • ISO 45001 • ISO 14001
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
