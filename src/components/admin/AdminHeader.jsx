'use client';

import React from 'react';
import Link from 'next/link';
import {
  IconSave,
  IconExternalLink,
  IconLogOut,
  IconEye,
  IconFileText,
  IconPencil,
} from './AdminIcons';

export default function AdminHeader({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  hasUnsavedChanges,
  isSaving,
  handleSave,
  handleLogout,
  onOpenThemeModal,
  capabilityPdf = '/assets/docs/MTS_Offshore_Capability_Statement.pdf',
  onEditCapabilityPdf,
  inquiriesCount = 0,
  topBarColor = '#146cac',
}) {
  const getTabUrl = () => {
    switch (activeTab) {
      case 'about':
        return '/about';
      case 'services':
        return '/services';
      case 'spm':
        return '/single-point-mooring-systems';
      case 'projects':
        return '/project';
      case 'contact':
        return '/contact-us';
      case 'advantage':
        return '/our-advantage';
      default:
        return '/';
    }
  };

  // Nav links matching public Header.jsx EXACTLY
  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'spm', label: 'SPMs' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const adminExtraItems = [
    { id: 'advantage', label: 'Our Advantage' },
    { id: 'inquiries', label: `Inquiries${inquiriesCount > 0 ? ` (${inquiriesCount})` : ''}` },
    { id: 'settings', label: 'Security & Backup' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 9000, width: '100%', boxShadow: '0 4px 20px rgba(5, 19, 41, 0.12)' }}>
      {/* 1. TOP UTILITY BAR (Exact 1:1 replica of public top blue bar + admin tool buttons) */}
      <section
        style={{
          backgroundColor: topBarColor,
          padding: '6px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem',
        }}
      >
        {/* Left: Capability Statement Link with Quick Edit Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={capabilityPdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>View Our Capability Statement</span>
          </a>
          <button
            type="button"
            onClick={onEditCapabilityPdf}
            title="Edit Capability Statement PDF URL"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '4px',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '2px 6px',
              fontSize: '0.72rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <IconPencil size={11} /> Edit PDF
          </button>
        </div>

        {/* Center: Customize Fonts & Colors Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={onOpenThemeModal}
            style={{
              backgroundColor: '#ffffff',
              color: '#0c3247',
              border: 'none',
              borderRadius: '999px',
              padding: '4px 14px',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>🎨</span>
            <span>Customize Fonts &amp; Colors</span>
          </button>

          {hasUnsavedChanges && (
            <span
              style={{
                backgroundColor: '#fbbf24',
                color: '#78350f',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                animation: 'pulse 1.5s infinite',
              }}
            >
              ● Unsaved Changes
            </span>
          )}
        </div>

        {/* Right: Mode Switcher, Save, Live Site, Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Visual Twin vs Form Data Mode */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgba(0, 0, 0, 0.22)',
              borderRadius: '6px',
              padding: '2px',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              style={{
                padding: '4px 10px',
                backgroundColor: viewMode === 'visual' ? '#ffffff' : 'transparent',
                color: viewMode === 'visual' ? '#0c3247' : '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <IconEye size={12} color={viewMode === 'visual' ? '#0c3247' : '#ffffff'} />
              <span>Visual 1:1</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('form')}
              style={{
                padding: '4px 10px',
                backgroundColor: viewMode === 'form' ? '#ffffff' : 'transparent',
                color: viewMode === 'form' ? '#0c3247' : '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <IconFileText size={12} color={viewMode === 'form' ? '#0c3247' : '#ffffff'} />
              <span>Form Data</span>
            </button>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '5px 14px',
              backgroundColor: hasUnsavedChanges ? '#22c55e' : '#ffffff',
              color: hasUnsavedChanges ? '#ffffff' : '#0c3247',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: hasUnsavedChanges
                ? '0 0 14px rgba(34, 197, 94, 0.6)'
                : '0 2px 6px rgba(0,0,0,0.15)',
              transition: 'all 0.18s ease',
            }}
          >
            <IconSave size={13} color={hasUnsavedChanges ? '#ffffff' : '#0c3247'} />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          {/* View Live Site */}
          <a
            href={getTabUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '5px 11px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>Live Page</span>
            <IconExternalLink size={12} color="#ffffff" />
          </a>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: '5px 10px',
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <IconLogOut size={12} color="#ffffff" />
            <span>Logout</span>
          </button>
        </div>
      </section>

      {/* 2. MAIN NAVBAR (Pure White Background, exact site layout, logo, order, colors) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          height: '70px',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* Left: MTS Offshore Logo (Identical size & position as public header) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/assets/images/mts_logo.png"
            alt="MTS OFFSHORE"
            style={{
              height: '82px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12))',
            }}
          />
        </div>

        {/* Center: Main Site Nav Links in EXACT same order as public site */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {mainNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: isActive ? '#0072ce' : '#0c3247',
                  fontSize: '0.98rem',
                  fontWeight: isActive ? 700 : 600,
                  borderBottom: isActive ? '3px solid #0072ce' : '3px solid transparent',
                  borderRadius: '2px',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#0072ce',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Extra Admin Tabs + Live Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {adminExtraItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: isActive ? 'rgba(0, 114, 206, 0.12)' : '#f8fafc',
                  border: isActive ? '1px solid #0072ce' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  color: isActive ? '#0072ce' : '#475569',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {item.label}
              </button>
            );
          })}

          <div
            style={{
              marginLeft: '6px',
              padding: '4px 10px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>Live Sync Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
