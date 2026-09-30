'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function LiveAdminButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Only run on client and ignore /admin routes
    if (!pathname || pathname.startsWith('/admin')) return;

    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session');
        const data = await res.json();
        if (data.authenticated) {
          setIsAdminLoggedIn(true);
        }
      } catch {
        // Not authenticated
      }
    };
    checkSession();
  }, [pathname]);

  // Don't render on admin routes
  if (!pathname || pathname.startsWith('/admin')) {
    return null;
  }

  // Determine target admin tab based on current pathname
  const getAdminTab = () => {
    if (pathname.includes('/services')) return 'services';
    if (pathname.includes('/single-point-mooring-systems')) return 'spm';
    if (pathname.includes('/about')) return 'about';
    if (pathname.includes('/project')) return 'projects';
    if (pathname.includes('/contact')) return 'contact';
    if (pathname.includes('/our-advantage')) return 'advantage';
    return 'home';
  };

  const handleEditClick = () => {
    const tab = getAdminTab();
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <button
        type="button"
        onClick={handleEditClick}
        title="Edit this page directly in MTS Admin Visual Twin Editor"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: isAdminLoggedIn ? '#0072ce' : 'rgba(12, 50, 71, 0.92)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          padding: '10px 18px',
          borderRadius: '999px',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 8px 24px rgba(5, 19, 41, 0.35)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.02em',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 114, 206, 0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 19, 41, 0.35)';
        }}
      >
        <span style={{ fontSize: '1rem' }}>✏️</span>
        <span>Edit This Page {isAdminLoggedIn ? '(Admin)' : ''}</span>
      </button>
    </div>
  );
}
