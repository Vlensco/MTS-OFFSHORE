'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'SPMs', href: '/single-point-mooring-systems' },
    { name: 'Projects', href: '/project' },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <header
      className={`header-three header-two ${isScrolled ? 'is-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        width: '100%',
        backgroundColor: '#ffffff',
        boxShadow: isScrolled
          ? '0 6px 24px rgba(5, 19, 41, 0.12)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.25s ease',
      }}
    >
      {/* Top Utility Bar */}
      <section style={{ backgroundColor: '#146cac', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
        <div className="w-layout-blockcontainer container-one w-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <a
            href="/assets/docs/MTS_Offshore_Capability_Statement.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="top-utility-link"
            style={{
              display: 'inline-block',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#ffffff',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
              transition: 'opacity 0.2s ease',
            }}
          >
            View Our Capability Statement
          </a>
        </div>
      </section>

      {/* Main Navbar */}
      <div className="w-layout-blockcontainer container-one home-one-header-one-flex w-container">
        {/* Logo */}
        <div className="div-block-3">
          <Link href="/" className="link-block w-inline-block">
            <img
              src="/assets/images/mts_logo.svg"
              alt="MTS Logo"
              width={200}
              height={52}
              className="image-3"
              style={{ objectFit: 'contain', height: 'auto', maxHeight: '50px' }}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="menu-list">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`single-menu w-inline-block ${isActive ? 'w--current' : ''}`}
              >
                <div className="menu-roll-text">
                  <div
                    className={`menu-text-block ${isActive ? 'active-nav-item' : 'text-color-black'}`}
                    style={{
                      color: isActive ? '#0072ce' : '#0c3247',
                      fontWeight: isActive ? 700 : 600,
                    }}
                  >
                    {link.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Trigger (Interactive Morphing) */}
        <div
          className="trigger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
        >
          <div
            className="trigger-menu-icon-block home-two-trigger"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '42px',
              height: '42px',
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: mobileMenuOpen ? '#0072ce' : '#0c3247',
              transition: 'background-color 0.3s ease',
            }}
          >
            <div
              className="menu-line"
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            ></div>
            <div
              className="menu-line middle"
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#ffffff',
                transition: 'all 0.2s ease',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            ></div>
            <div
              className="menu-line"
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Glassmorphic Slide-Down) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '3px solid #0072ce',
            padding: '20px 24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 24px 48px rgba(5, 19, 41, 0.18)',
            zIndex: 9999,
            animation: 'heroFadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  color: isActive ? '#0072ce' : '#0c3247',
                  backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: isActive ? '4px solid #0072ce' : '4px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{link.name}</span>
                <span style={{ fontSize: '0.85rem', color: isActive ? '#0072ce' : '#94a3b8' }}>→</span>
              </Link>
            );
          })}

          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
            <a
              href="/assets/docs/MTS_Offshore_Capability_Statement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#146cac',
                color: '#ffffff',
                padding: '14px 18px',
                textAlign: 'center',
                fontWeight: '700',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.95rem',
                borderRadius: '6px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(20, 108, 172, 0.25)',
              }}
            >
              View Our Capability Statement
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
