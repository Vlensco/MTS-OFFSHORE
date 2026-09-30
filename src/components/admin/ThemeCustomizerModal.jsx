'use client';

import React, { useState, useEffect } from 'react';
import { IconX, IconCheck, IconRefresh } from './AdminIcons';

const FONT_OPTIONS_HEADING = [
  { label: 'Montserrat (Marine Bold - Recommended)', value: 'Montserrat' },
  { label: 'Inter (Clean & Modern)', value: 'Inter' },
  { label: 'Outfit (Geometric Luxury)', value: 'Outfit' },
  { label: 'Poppins (Friendly & Premium)', value: 'Poppins' },
  { label: 'Roboto (Engineering Classic)', value: 'Roboto' },
  { label: 'Playfair Display (Editorial Serif)', value: 'Playfair Display' },
  { label: 'Arial (System Standard)', value: 'Arial' },
];

const FONT_OPTIONS_BODY = [
  { label: 'Inter (Clean & High Legibility - Recommended)', value: 'Inter' },
  { label: 'Roboto (Technical Standard)', value: 'Roboto' },
  { label: 'Outfit (Contemporary)', value: 'Outfit' },
  { label: 'Poppins (Soft & Clean)', value: 'Poppins' },
  { label: 'Montserrat (Modern)', value: 'Montserrat' },
  { label: 'Arial (System Standard)', value: 'Arial' },
];

const HEADING_COLOR_PRESETS = [
  { label: 'Deep Marine Navy', color: '#0c3247' },
  { label: 'Midnight Blue', color: '#051329' },
  { label: 'Dark Slate', color: '#0f172a' },
  { label: 'Charcoal Black', color: '#1a202c' },
  { label: 'Ocean Blue', color: '#0072ce' },
];

const BODY_COLOR_PRESETS = [
  { label: 'Cool Slate', color: '#4a5568' },
  { label: 'Slate Gray', color: '#334155' },
  { label: 'Muted Navy', color: '#556987' },
  { label: 'Dark Charcoal', color: '#2d3748' },
];

const ACCENT_COLOR_PRESETS = [
  { label: 'MTS Ocean Blue', color: '#0072ce' },
  { label: 'Marine Navy Blue', color: '#146cac' },
  { label: 'Sky Blue', color: '#0284c7' },
  { label: 'Royal Blue', color: '#1d4ed8' },
];

const TOPBAR_COLOR_PRESETS = [
  { label: 'Header Marine Blue', color: '#146cac' },
  { label: 'Deep Navy', color: '#0c3247' },
  { label: 'Ocean Blue', color: '#0072ce' },
  { label: 'Midnight', color: '#051329' },
];

const DEFAULT_THEME = {
  fontHeading: 'Montserrat',
  fontBody: 'Inter',
  colorHeading: '#0c3247',
  colorBody: '#4a5568',
  colorAccent: '#0072ce',
  colorTopBar: '#146cac',
};

export default function ThemeCustomizerModal({
  isOpen,
  onClose,
  currentTheme = {},
  onSaveTheme,
}) {
  const [theme, setTheme] = useState({ ...DEFAULT_THEME, ...currentTheme });
  const [activeSubTab, setActiveSubTab] = useState('fonts'); // 'fonts' | 'colors'

  useEffect(() => {
    setTheme({ ...DEFAULT_THEME, ...currentTheme });
  }, [currentTheme]);

  if (!isOpen) return null;

  const handleLivePreviewChange = (key, value) => {
    const updated = { ...theme, [key]: value };
    setTheme(updated);

    // Apply live preview in the document immediately
    const root = document.documentElement;
    if (key === 'fontHeading') {
      root.style.setProperty('--font-heading', `'${value}', sans-serif`);
    } else if (key === 'fontBody') {
      root.style.setProperty('--font-body', `'${value}', sans-serif`);
    } else if (key === 'colorHeading') {
      root.style.setProperty('--navy-deep', value);
      root.style.setProperty('--text-primary', value);
    } else if (key === 'colorBody') {
      root.style.setProperty('--text-secondary', value);
    } else if (key === 'colorAccent') {
      root.style.setProperty('--blue-accent', value);
    }
  };

  const handleApply = () => {
    onSaveTheme(theme);
    onClose();
  };

  const handleResetDefaults = () => {
    setTheme(DEFAULT_THEME);
    const root = document.documentElement;
    root.style.setProperty('--font-heading', `'${DEFAULT_THEME.fontHeading}', sans-serif`);
    root.style.setProperty('--font-body', `'${DEFAULT_THEME.fontBody}', sans-serif`);
    root.style.setProperty('--navy-deep', DEFAULT_THEME.colorHeading);
    root.style.setProperty('--text-primary', DEFAULT_THEME.colorHeading);
    root.style.setProperty('--text-secondary', DEFAULT_THEME.colorBody);
    root.style.setProperty('--blue-accent', DEFAULT_THEME.colorAccent);
    onSaveTheme(DEFAULT_THEME);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 19, 41, 0.78)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: '#0c1b30',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#071224',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎨</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Website Typography &amp; Color Studio
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                Otak-atik jenis font dan palet warna. Perubahan langsung terlihat di layar!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Sub-tabs: Typography vs Colors */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            padding: '8px 24px',
            gap: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveSubTab('fonts')}
            style={{
              padding: '8px 18px',
              backgroundColor: activeSubTab === 'fonts' ? '#0284c7' : 'transparent',
              color: activeSubTab === 'fonts' ? '#ffffff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🔤 Font Family (Tipografi)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('colors')}
            style={{
              padding: '8px 18px',
              backgroundColor: activeSubTab === 'colors' ? '#0284c7' : 'transparent',
              color: activeSubTab === 'colors' ? '#ffffff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🌈 Color Palette (Warna Teks &amp; Aksen)</span>
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {activeSubTab === 'fonts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Heading Font */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
                  1. Heading Font Family (Font Judul / Header)
                </label>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 10px' }}>
                  Digunakan untuk semua judul besar H1, H2, H3, dan nama layanan.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {FONT_OPTIONS_HEADING.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => handleLivePreviewChange('fontHeading', f.value)}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: theme.fontHeading === f.value ? 'rgba(2, 132, 199, 0.35)' : 'rgba(255, 255, 255, 0.05)',
                        border: theme.fontHeading === f.value ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ fontFamily: `'${f.value}', sans-serif`, fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>
                        {f.value} Preview
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{f.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Font */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
                  2. Body Font Family (Font Paragraf &amp; Deskripsi)
                </label>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 10px' }}>
                  Digunakan untuk isi teks, deskripsi layanan, paragraf tentang kami, dan teks form.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {FONT_OPTIONS_BODY.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => handleLivePreviewChange('fontBody', f.value)}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: theme.fontBody === f.value ? 'rgba(2, 132, 199, 0.35)' : 'rgba(255, 255, 255, 0.05)',
                        border: theme.fontBody === f.value ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ fontFamily: `'${f.value}', sans-serif`, fontSize: '0.95rem', fontWeight: 500, marginBottom: '4px' }}>
                        The quick brown fox jumps
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{f.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'colors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Heading Color */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                    Heading Font Color (Warna Judul)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={theme.colorHeading || '#0c3247'}
                      onChange={(e) => handleLivePreviewChange('colorHeading', e.target.value)}
                      style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent' }}
                    />
                    <input
                      type="text"
                      value={theme.colorHeading || '#0c3247'}
                      onChange={(e) => handleLivePreviewChange('colorHeading', e.target.value)}
                      style={{ width: '85px', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.8rem', textAlign: 'center' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {HEADING_COLOR_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => handleLivePreviewChange('colorHeading', p.color)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: theme.colorHeading === p.color ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#cbd5e1',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: p.color, border: '1px solid #fff' }} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Text Color */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                    Body Text Color (Warna Paragraf)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={theme.colorBody || '#4a5568'}
                      onChange={(e) => handleLivePreviewChange('colorBody', e.target.value)}
                      style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent' }}
                    />
                    <input
                      type="text"
                      value={theme.colorBody || '#4a5568'}
                      onChange={(e) => handleLivePreviewChange('colorBody', e.target.value)}
                      style={{ width: '85px', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.8rem', textAlign: 'center' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {BODY_COLOR_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => handleLivePreviewChange('colorBody', p.color)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: theme.colorBody === p.color ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#cbd5e1',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: p.color, border: '1px solid #fff' }} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Button Color */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                    Brand Accent Color (Warna Tombol &amp; Aksen)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={theme.colorAccent || '#0072ce'}
                      onChange={(e) => handleLivePreviewChange('colorAccent', e.target.value)}
                      style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent' }}
                    />
                    <input
                      type="text"
                      value={theme.colorAccent || '#0072ce'}
                      onChange={(e) => handleLivePreviewChange('colorAccent', e.target.value)}
                      style={{ width: '85px', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.8rem', textAlign: 'center' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {ACCENT_COLOR_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => handleLivePreviewChange('colorAccent', p.color)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: theme.colorAccent === p.color ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#cbd5e1',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: p.color, border: '1px solid #fff' }} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Bar Color */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                    Top Utility Bar Color (Warna Bar Atas)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={theme.colorTopBar || '#146cac'}
                      onChange={(e) => handleLivePreviewChange('colorTopBar', e.target.value)}
                      style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent' }}
                    />
                    <input
                      type="text"
                      value={theme.colorTopBar || '#146cac'}
                      onChange={(e) => handleLivePreviewChange('colorTopBar', e.target.value)}
                      style={{ width: '85px', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.8rem', textAlign: 'center' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {TOPBAR_COLOR_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => handleLivePreviewChange('colorTopBar', p.color)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: theme.colorTopBar === p.color ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#cbd5e1',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: p.color, border: '1px solid #fff' }} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#071224',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={handleResetDefaults}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#94a3b8',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <IconRefresh size={14} />
            <span>Kembalikan Default</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#cbd5e1',
                padding: '8px 16px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleApply}
              style={{
                backgroundColor: '#0284c7',
                backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                padding: '8px 20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
              }}
            >
              <IconCheck size={16} />
              <span>Simpan &amp; Terapkan Tema</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
