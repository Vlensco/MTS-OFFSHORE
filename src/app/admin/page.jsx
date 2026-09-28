'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSiteContent } from '../../context/ContentContext';
import MediaPickerModal from '../../components/admin/MediaPickerModal';
import {
  IconHome,
  IconInfo,
  IconBriefcase,
  IconAnchor,
  IconAward,
  IconFolder,
  IconMail,
  IconLock,
  IconEye,
  IconFileText,
  IconSave,
  IconExternalLink,
  IconLogOut,
  IconCamera,
  IconPencil,
  IconTrash,
  IconPlus,
  IconCheck,
  IconX,
  IconRefresh,
} from '../../components/admin/AdminIcons';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    content,
    updateField,
    saveContent,
    isSaving,
    hasUnsavedChanges,
    exportContentJson,
    resetContent,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'about' | 'services' | 'spm' | 'advantage' | 'projects' | 'inquiries' | 'settings'
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'form'
  const [showGuideBanner, setShowGuideBanner] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [activeAccordionPhase, setActiveAccordionPhase] = useState(2); // Phase 2 open by default matching front-end

  // Media Modal state
  const [mediaModal, setMediaModal] = useState({
    isOpen: false,
    path: '',
    currentUrl: '',
    title: '',
  });

  // Text Modal state
  const [textModal, setTextModal] = useState({
    isOpen: false,
    path: '',
    currentValue: '',
    title: '',
    multiline: false,
  });

  // Projects state
  const [projectsList, setProjectsList] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectModal, setProjectModal] = useState({
    isOpen: false,
    data: null,
  });

  // Inquiries state
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  // Fetch projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjectsList(data.projects);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch inquiries
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiriesList(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'projects' || activeTab === 'home') {
      fetchProjects();
    }
    if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const handleSave = async () => {
    const res = await saveContent();
    if (res.success) {
      showToast('✓ Content saved successfully and live on the website!', 'success');
    } else {
      showToast('Save failed: ' + (res.error || 'Unknown error'), 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const openMediaPicker = (path, currentUrl, title = 'Change Photo') => {
    setMediaModal({
      isOpen: true,
      path,
      currentUrl: currentUrl || '',
      title,
    });
  };

  const handleSelectMedia = (newUrl) => {
    if (mediaModal.path === 'current_project_modal_img') {
      setProjectModal((prev) => ({
        ...prev,
        data: { ...prev.data, image: newUrl },
      }));
      showToast(`Project photo selected: ${newUrl}`, 'info');
      return;
    }

    if (mediaModal.path.startsWith('project-img-')) {
      const slug = mediaModal.path.replace('project-img-', '');
      const proj = projectsList.find((p) => p.slug === slug);
      if (proj) {
        handleSaveProject({ ...proj, image: newUrl });
      }
      return;
    }

    if (mediaModal.path) {
      updateField(mediaModal.path, newUrl, true);
      showToast('✓ Photo updated and saved live!', 'success');
    }
  };

  const openTextEditor = (path, currentValue, title, multiline = false) => {
    setTextModal({
      isOpen: true,
      path,
      currentValue: currentValue || '',
      title,
      multiline,
    });
  };

  const handleApplyText = () => {
    if (textModal.path) {
      updateField(textModal.path, textModal.currentValue, true);
      setTextModal((prev) => ({ ...prev, isOpen: false }));
      showToast('✓ Text updated and saved live!', 'success');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordStatus('');

    if (newPassword.length < 6) {
      setPasswordStatus('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus('Password confirmation does not match.');
      return;
    }

    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setPasswordStatus('Admin password successfully updated!');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin password successfully updated!', 'success');
    } catch (err) {
      setPasswordStatus('Error: ' + err.message);
    }
  };

  const handleSaveProject = async (projectData) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project.');
      }

      showToast('Project saved successfully!', 'success');
      setProjectModal({ isOpen: false, data: null });
      fetchProjects();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  const handleDeleteProject = async (slug) => {
    if (!confirm(`Are you sure you want to delete project "${slug}"?`)) return;

    try {
      const res = await fetch(`/api/projects?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete project.');
      }

      showToast(`Project "${slug}" deleted successfully.`, 'success');
      fetchProjects();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  const home = content?.home || {};
  const hero = home.hero || {};
  const services = home.services || {};
  const about = home.about || {};
  const planning = home.planning || {};
  const projectsSection = home.projectsSection || {};
  const aboutPage = content?.aboutPage || {};
  const servicesPage = content?.servicesPage || {};
  const spmPage = content?.spmPage || {};
  const advantagePage = content?.advantagePage || {};

  // Destination link for Live Site button
  const getTabUrl = () => {
    switch (activeTab) {
      case 'about':
        return '/about';
      case 'services':
        return '/services';
      case 'spm':
        return '/single-point-mooring-systems';
      case 'advantage':
        return '/our-advantage';
      default:
        return '/';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070c18', color: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. TOP STICKY ADMIN COMMAND BAR */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 9000,
          backgroundColor: '#051021',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.55)',
          padding: '12px 24px 8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          {/* Brand & Sync Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <img
                src="/assets/images/mts_logo.png"
                alt="MTS OFFSHORE"
                style={{ height: '36px', width: 'auto' }}
              />
            </Link>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#38bdf8',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              Live Console
            </div>

            {hasUnsavedChanges && (
              <span
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  color: '#fbbf24',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#fbbf24' }} />
                Unsaved Changes
              </span>
            )}
          </div>

          {/* Action Center: View Mode, Save, View Site, Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Mode Switcher */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '3px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('visual')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: viewMode === 'visual' ? '#0284c7' : 'transparent',
                  color: viewMode === 'visual' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.18s ease',
                }}
              >
                <IconEye size={14} color={viewMode === 'visual' ? '#fff' : '#94a3b8'} />
                <span>Visual 11/12</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('form')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: viewMode === 'form' ? '#0284c7' : 'transparent',
                  color: viewMode === 'form' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.18s ease',
                }}
              >
                <IconFileText size={14} color={viewMode === 'form' ? '#fff' : '#94a3b8'} />
                <span>Form Data</span>
              </button>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: '8px 18px',
                backgroundColor: hasUnsavedChanges ? '#16a34a' : '#0284c7',
                backgroundImage: hasUnsavedChanges
                  ? 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)'
                  : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: hasUnsavedChanges
                  ? '0 0 16px rgba(34, 197, 94, 0.45)'
                  : '0 4px 12px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.2s',
              }}
            >
              <IconSave size={15} color="#fff" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>

            {/* View Live Site */}
            <a
              href={getTabUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 13px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'border-color 0.15s',
              }}
            >
              <span>View Live Page</span>
              <IconExternalLink size={13} color="#94a3b8" />
            </a>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              style={{
                padding: '8px 13px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.28)',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.15s',
              }}
            >
              <IconLogOut size={14} color="#fca5a5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Clean Navigation Tabs (100% English) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            paddingTop: '10px',
            marginTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {[
            { id: 'home', label: 'Home', icon: IconHome },
            { id: 'about', label: 'About Us', icon: IconInfo },
            { id: 'services', label: 'Services', icon: IconBriefcase },
            { id: 'spm', label: 'SPM Systems', icon: IconAnchor },
            { id: 'advantage', label: 'Our Advantage', icon: IconAward },
            { id: 'projects', label: 'Projects', icon: IconFolder },
            { id: 'inquiries', label: 'Inquiries', icon: IconMail },
            { id: 'settings', label: 'Security & Backup', icon: IconLock },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '7px 14px',
                  backgroundColor: isActive ? 'rgba(2, 132, 199, 0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                  borderRadius: '6px',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  transition: 'all 0.15s',
                }}
              >
                <TabIcon size={14} color={isActive ? '#38bdf8' : '#94a3b8'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* TOAST ALERT BANNER */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            padding: '12px 18px',
            borderRadius: '10px',
            backgroundColor:
              toastType === 'success'
                ? '#15803d'
                : toastType === 'error'
                ? '#b91c1c'
                : '#0284c7',
            color: '#ffffff',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.875rem',
            fontWeight: 600,
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage('')}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconX size={14} />
          </button>
        </div>
      )}

      {/* 2. MAIN ADMIN CONTENT CONTAINER */}
      <main style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Helper Notice */}
        {showGuideBanner && (
          <div
            style={{
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '10px',
              padding: '10px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              fontSize: '0.85rem',
              color: '#cbd5e1',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center' }}>
                <IconInfo size={16} color="#38bdf8" />
              </span>
              <span>
                <strong style={{ color: '#38bdf8' }}>Visual 11/12 Mode Active:</strong> Click directly on any text or camera button to edit and replace media. Changes are automatically saved live!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowGuideBanner(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Close guide"
            >
              <IconX size={14} />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: HOME PAGE (COMPLETE 1:1 VISUAL REPLICA)                 */}
        {/* ============================================================== */}
        {activeTab === 'home' && (
          <div>
            {viewMode === 'visual' ? (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* ---------------- SECTION 1: HERO BANNER ---------------- */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'relative',
                      backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.52), rgba(5, 19, 41, 0.76)), url("${hero.bgImage || '/assets/images/mts_hero_cinematic.jpg'}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      padding: '110px 24px 90px',
                      color: '#ffffff',
                      textAlign: 'center',
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
                      {/* Tagline */}
                      <div style={{ marginBottom: '14px', display: 'inline-block' }}>
                        <div
                          className="clean-editable-block"
                          onClick={() => openTextEditor('home.hero.tag', hero.tag, 'Edit Hero Tagline', true)}
                          style={{
                            padding: '6px 14px',
                            color: '#e2e8f0',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            whiteSpace: 'pre-line',
                            backgroundColor: 'rgba(0, 114, 206, 0.35)',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                          title="Click to edit tagline"
                        >
                          <span>{hero.tag || 'Tier-One Experience.\nIndependent Agility.'}</span>
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
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
                            fontFamily: "'Montserrat', sans-serif",
                            margin: 0,
                            padding: '6px 12px',
                            lineHeight: 1.2,
                          }}
                        >
                          <span>{hero.title || 'Global Offshore Construction & Subsea Services'}</span>
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
                        </h1>
                      </div>

                      {/* Description */}
                      <div style={{ marginBottom: '24px' }}>
                        <p
                          className="clean-editable-block"
                          onClick={() => openTextEditor('home.hero.description', hero.description, 'Edit Hero Description', true)}
                          style={{
                            fontSize: '1.05rem',
                            color: '#cbd5e1',
                            margin: 0,
                            lineHeight: 1.6,
                            padding: '6px 12px',
                          }}
                        >
                          <span>{hero.description || 'Lean, responsive, and experienced — delivering safe and efficient PM&C, T&I, and marine terminal services worldwide.'}</span>
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
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
                            gap: '6px',
                          }}
                        >
                          <span>{hero.primaryBtnText || 'Our Advantage'}</span>
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
                        </div>

                        <div
                          className="clean-editable-block"
                          onClick={() => openTextEditor('home.hero.secondaryBtnText', hero.secondaryBtnText, 'Edit Button 2 Text')}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
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
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- SECTION 2: OUR SERVICES (4 CARDS) ---------------- */}
                <div style={{ padding: '80px 32px 90px', backgroundColor: '#f4f6f9', color: '#0f172a' }}>
                  <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                    <div
                      className="clean-editable-block"
                      onClick={() => openTextEditor('home.services.tag', services.tag, 'Edit Services Tag')}
                      style={{
                        display: 'inline-block',
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
                      <span>{services.tag || 'Our Services'}</span>
                      <span className="hover-edit-badge">
                        <IconPencil size={11} /> Edit
                      </span>
                    </div>

                    <h2
                      className="clean-editable-block"
                      onClick={() => openTextEditor('home.services.title', services.title, 'Edit Services Title')}
                      style={{
                        fontSize: '2.4rem',
                        fontWeight: 800,
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#0c3247',
                        margin: '0 0 12px 0',
                        display: 'block',
                      }}
                    >
                      <span>{services.title || 'Comprehensive Offshore Solutions'}</span>
                      <span className="hover-edit-badge">
                        <IconPencil size={11} /> Edit
                      </span>
                    </h2>

                    <div>
                      <p
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.services.description', services.description, 'Edit Services Description', true)}
                        style={{ color: '#556987', maxWidth: '720px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}
                      >
                        <span>{services.description || 'We deliver a wide range of offshore construction, project management and consultancy services for subsea and surface installations.'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 4 Cards Grid Matching Front-end */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '20px',
                    }}
                  >
                    {(services.items || []).map((card, idx) => (
                      <div
                        key={idx}
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
                        {/* Background Photo */}
                        <img
                          src={card.image}
                          alt={card.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(180deg, rgba(5,19,41,0.1) 0%, rgba(5,19,41,0.88) 100%)',
                          }}
                        />

                        {/* Top-Right Change Photo Overlay */}
                        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                          <button
                            type="button"
                            onClick={() => openMediaPicker(`home.services.items.${idx}.image`, card.image, `Change Photo: ${card.title}`)}
                            style={{
                              backgroundColor: 'rgba(5, 19, 41, 0.85)',
                              backdropFilter: 'blur(6px)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              color: '#ffffff',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
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

                        {/* Card Content at Bottom */}
                        <div style={{ position: 'relative', zIndex: 5, padding: '24px', marginTop: 'auto', color: '#ffffff' }}>
                          <div style={{ marginBottom: '8px' }}>
                            <span
                              className="clean-editable-block"
                              onClick={() => openTextEditor(`home.services.items.${idx}.tag`, card.tag, 'Edit Service Tag')}
                              style={{
                                backgroundColor: '#f26522',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '0.72rem',
                                padding: '4px 10px',
                                borderRadius: '3px',
                                textTransform: 'uppercase',
                              }}
                            >
                              <span>{card.tag}</span>
                              <span className="hover-edit-badge">
                                <IconPencil size={11} /> Edit
                              </span>
                            </span>
                          </div>

                          <h3
                            className="clean-editable-block"
                            onClick={() => openTextEditor(`home.services.items.${idx}.title`, card.title, 'Edit Service Title')}
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              color: '#ffffff',
                              margin: '0 0 14px 0',
                              lineHeight: 1.3,
                            }}
                          >
                            <span>{card.title}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </h3>

                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>
                            <span>Learn More →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Two Buttons Matching Front-End */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
                    <div
                      style={{
                        backgroundColor: '#0c3247',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      MTS OFFSHORE Capability Statement
                    </div>
                    <div
                      style={{
                        backgroundColor: '#0c3247',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      MTS OFFSHORE ISO Certificates
                    </div>
                  </div>
                </div>

                {/* ---------------- SECTION 3: ABOUT US (JACKET & BADGE) ---------------- */}
                <div style={{ padding: '90px 32px', backgroundColor: '#ffffff', color: '#0f172a' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '50px', alignItems: 'center' }}>
                    {/* Left Column */}
                    <div>
                      <div
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.about.tag', about.tag, 'Edit About Tag')}
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '10px',
                        }}
                      >
                        <span>{about.tag || 'ABOUT US'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </div>

                      <h2
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.about.title', about.title, 'Edit About Title')}
                        style={{
                          fontSize: '2.4rem',
                          fontWeight: 800,
                          color: '#0c3247',
                          fontFamily: "'Montserrat', sans-serif",
                          margin: '0 0 16px 0',
                          lineHeight: 1.25,
                        }}
                      >
                        <span>{about.title || 'Offshore Construction Services'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </h2>

                      <p
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.about.description', about.description, 'Edit About Description', true)}
                        style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '22px' }}
                      >
                        <span>{about.description || "MTS OFFSHORE's operations span over three decades, successfully delivering complex marine projects across the Middle East, Europe, South East Asia and Oceania."}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </p>

                      {/* 3 Checkpoint items with Yellow Ticks */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                        {[
                          { key: 'bullet1', val: about.bullet1, label: 'Checklist Item 1' },
                          { key: 'bullet2', val: about.bullet2, label: 'Checklist Item 2' },
                          { key: 'bullet3', val: about.bullet3, label: 'Checklist Item 3' },
                        ].map((b) => (
                          <div
                            key={b.key}
                            className="clean-editable-block"
                            onClick={() => openTextEditor(`home.about.${b.key}`, b.val, `Edit ${b.label}`)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '6px 8px',
                              borderRadius: '6px',
                            }}
                          >
                            <img
                              src="/assets/img/65d4023f0fe16f42cb1838cf_Yellow_Tick.svg"
                              alt="Tick"
                              width={20}
                              height={20}
                            />
                            <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: 600 }}>{b.val}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Mission & Vision Card with Thumbnail */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '16px',
                          padding: '18px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          alignItems: 'center',
                          marginBottom: '26px',
                        }}
                      >
                        <div style={{ position: 'relative', width: '130px', height: '95px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                          <img
                            src={about.thumbImage || '/assets/images/about_thumb.jpg'}
                            alt="Mission"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <button
                            type="button"
                            onClick={() => openMediaPicker('home.about.thumbImage', about.thumbImage, 'Change Mission Thumbnail')}
                            style={{
                              position: 'absolute',
                              bottom: '4px',
                              right: '4px',
                              backgroundColor: 'rgba(5, 19, 41, 0.85)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '3px 6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <IconCamera size={11} color="#38bdf8" />
                          </button>
                        </div>
                        <div>
                          <h4
                            className="clean-editable-block"
                            onClick={() => openTextEditor('home.about.missionTitle', about.missionTitle, 'Edit Mission Title')}
                            style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0c3247' }}
                          >
                            <span>{about.missionTitle || 'Our Mission & Vision'}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </h4>
                          <p
                            className="clean-editable-block"
                            onClick={() => openTextEditor('home.about.missionDesc', about.missionDesc, 'Edit Mission Description', true)}
                            style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}
                          >
                            <span>{about.missionDesc || 'Fueling the future of offshore construction. Pioneers of turnkey offshore construction services that are flexible and cost-effective.'}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          backgroundColor: '#0c3247',
                          color: '#ffffff',
                          padding: '12px 24px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          display: 'inline-block',
                        }}
                      >
                        About Us →
                      </div>
                    </div>

                    {/* Right Column: Jacket Portrait Photo + Overlapping 50+ Badge */}
                    <div style={{ position: 'relative', paddingRight: '20px' }}>
                      <div
                        style={{
                          position: 'relative',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          height: '540px',
                          boxShadow: '0 20px 40px rgba(5, 19, 41, 0.16)',
                        }}
                      >
                        <img
                          src={about.mainImage || '/assets/images/about_jacket_portrait.jpg'}
                          alt="Offshore Jacket Portrait"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() => openMediaPicker('home.about.mainImage', about.mainImage, 'Change Jacket Portrait Photo')}
                          style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            backgroundColor: 'rgba(5, 19, 41, 0.85)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <IconCamera size={13} color="#38bdf8" />
                          <span>Change Jacket Photo</span>
                        </button>
                      </div>

                      {/* Overlapping 50+ Experience Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-25px',
                          left: '-20px',
                          backgroundColor: '#ffffff',
                          borderRadius: '10px',
                          padding: '16px',
                          boxShadow: '0 16px 36px rgba(5, 19, 41, 0.18)',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          maxWidth: '320px',
                        }}
                      >
                        <div style={{ position: 'relative', width: '90px', height: '70px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
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
                              bottom: '2px',
                              right: '2px',
                              backgroundColor: 'rgba(5, 19, 41, 0.85)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '2px 4px',
                              cursor: 'pointer',
                            }}
                          >
                            <IconCamera size={10} color="#38bdf8" />
                          </button>
                        </div>

                        <div>
                          <div
                            className="clean-editable-block"
                            onClick={() => openTextEditor('home.about.badgeNumber', about.badgeNumber, 'Edit Experience Number')}
                            style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}
                          >
                            <span>{about.badgeNumber || '50+'}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </div>
                          <div
                            className="clean-editable-block"
                            onClick={() => openTextEditor('home.about.badgeText', about.badgeText, 'Edit Experience Label')}
                            style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginTop: '4px' }}
                          >
                            <span>{about.badgeText || 'Years Of Management Experience'}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- SECTION 4: WORK PROCESS (PLANNING ACCORDION) ---------------- */}
                <div style={{ padding: '90px 32px', backgroundColor: '#f8fafc', color: '#0f172a' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
                    {/* Left Column: Subsea Diving Image with 100+ Badge */}
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          height: '460px',
                          position: 'relative',
                          boxShadow: '0 20px 40px rgba(5, 19, 41, 0.16)',
                        }}
                      >
                        <img
                          src={planning.items?.[activeAccordionPhase - 1]?.image || '/assets/images/mts_ti_heavylift.jpg'}
                          alt="Subsea Diving Process"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            openMediaPicker(
                              `home.planning.items.${activeAccordionPhase - 1}.image`,
                              planning.items?.[activeAccordionPhase - 1]?.image,
                              `Change Photo: Phase 0${activeAccordionPhase}`
                            )
                          }
                          style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            backgroundColor: 'rgba(5, 19, 41, 0.85)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <IconCamera size={13} color="#38bdf8" />
                          <span>Change Phase Photo</span>
                        </button>

                        {/* Floating 100+ Stat Card */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            right: '20px',
                            backgroundColor: 'rgba(5, 19, 41, 0.92)',
                            backdropFilter: 'blur(8px)',
                            padding: '18px 22px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #e5a93b',
                            color: '#ffffff',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ color: '#e5a93b', fontWeight: 800, fontSize: '1.4rem' }}>100+</span>
                            <span style={{ fontWeight: 700, fontSize: '1rem' }}>Offshore Campaigns Delivered</span>
                          </div>
                          <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>
                            Safe, incident-free marine terminal overhauls and subsea construction worldwide.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Accordion Items */}
                    <div>
                      <div
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.planning.tag', planning.tag, 'Edit Planning Tag')}
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '8px',
                        }}
                      >
                        <span>{planning.tag || 'WORK PROCESS'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </div>

                      <h2
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.planning.title', planning.title, 'Edit Planning Title')}
                        style={{
                          fontSize: '2.4rem',
                          fontWeight: 800,
                          fontFamily: "'Montserrat', sans-serif",
                          color: '#0c3247',
                          margin: '0 0 24px 0',
                          lineHeight: 1.2,
                        }}
                      >
                        <span>{planning.title || 'Precision Planning & Offshore Delivery'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(planning.items || []).map((item, idx) => {
                          const isActive = activeAccordionPhase === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setActiveAccordionPhase(item.id)}
                              style={{
                                backgroundColor: '#ffffff',
                                border: isActive ? '2px solid #0072ce' : '1px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '20px 24px',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                boxShadow: isActive ? '0 10px 25px rgba(0, 114, 206, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span
                                  className="clean-editable-block"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openTextEditor(`home.planning.items.${idx}.badge`, item.badge, 'Edit Phase Badge');
                                  }}
                                  style={{
                                    backgroundColor: isActive ? '#e0f2fe' : '#f1f5f9',
                                    color: isActive ? '#0284c7' : '#64748b',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                  }}
                                >
                                  <span>{item.badge}</span>
                                  <span className="hover-edit-badge">
                                    <IconPencil size={11} /> Edit
                                  </span>
                                </span>
                                <span style={{ color: isActive ? '#0072ce' : '#94a3b8', fontSize: '1.2rem', transform: isActive ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                                  ›
                                </span>
                              </div>

                              <h4
                                className="clean-editable-block"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openTextEditor(`home.planning.items.${idx}.title`, item.title, 'Edit Phase Title');
                                }}
                                style={{ margin: '10px 0 6px 0', fontSize: '1.15rem', fontWeight: 800, color: '#0c3247' }}
                              >
                                <span>{item.title}</span>
                                <span className="hover-edit-badge">
                                  <IconPencil size={11} /> Edit
                                </span>
                              </h4>

                              {isActive && (
                                <p
                                  className="clean-editable-block"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openTextEditor(`home.planning.items.${idx}.desc`, item.desc, 'Edit Phase Description', true);
                                  }}
                                  style={{ margin: '8px 0 0 0', fontSize: '0.9rem', color: '#4a5568', lineHeight: 1.6 }}
                                >
                                  <span>{item.desc}</span>
                                  <span className="hover-edit-badge">
                                    <IconPencil size={11} /> Edit
                                  </span>
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- SECTION 5: FEATURED WORK / PROJECTS ---------------- */}
                <div style={{ padding: '80px 32px 90px', backgroundColor: '#ffffff', color: '#0f172a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <div
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.projectsSection.tag', projectsSection.tag, 'Edit Projects Tag')}
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '8px',
                        }}
                      >
                        <span>{projectsSection.tag || 'FEATURED WORK'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </div>

                      <h2
                        className="clean-editable-block"
                        onClick={() => openTextEditor('home.projectsSection.title', projectsSection.title, 'Edit Projects Title')}
                        style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0c3247', margin: 0 }}
                      >
                        <span>{projectsSection.title || 'Projects'}</span>
                        <span className="hover-edit-badge">
                          <IconPencil size={11} /> Edit
                        </span>
                      </h2>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>‹</button>
                      <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>›</button>
                    </div>
                  </div>

                  {/* Horizontal Scroll / Grid of 4 Project Cards Matching Screenshot */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '20px',
                      marginBottom: '40px',
                    }}
                  >
                    {[
                      { title: 'Ras Laffan Single Point Mooring Maintenance (SPM)', img: '/assets/images/proj_1.jpg' },
                      { title: 'Bonga Field SPM CALM Buoy Replacement', img: '/assets/images/proj_2.jpg' },
                      { title: 'South Pars Pipeline Stabilization & Subsea IRM', img: '/assets/images/proj_3.jpg' },
                      { title: 'West African Deepwater Jacket Installation', img: '/assets/images/proj_4.jpg' },
                    ].map((proj, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          height: '340px',
                          position: 'relative',
                        }}
                      >
                        <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '16px',
                            left: '16px',
                            right: '16px',
                            backgroundColor: '#ffffff',
                            padding: '14px 18px',
                            borderRadius: '8px',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: '#0c3247',
                          }}
                        >
                          {proj.title}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Projects Button */}
                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab('projects')}
                      style={{
                        padding: '12px 28px',
                        backgroundColor: '#0c3247',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      View All Offshore Projects →
                    </button>
                  </div>
                </div>

                {/* ---------------- SECTION 6: FOOTER PREVIEW ---------------- */}
                <div style={{ backgroundColor: '#006699', color: '#ffffff', padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <img src="/assets/images/mts_logo.png" alt="MTS Logo" style={{ height: '80px', width: 'auto', display: 'inline-block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))' }} />
                  <img src="/assets/images/iso_certs.png" alt="ISO Certificates" style={{ maxHeight: '42px', display: 'inline-block' }} />
                </div>
              </div>
            ) : (
              /* FORM MODE HOME */
              <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ margin: '0 0 18px 0', color: '#38bdf8' }}>Home Page Data Fields</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>Hero Tagline</label>
                    <input
                      type="text"
                      value={hero.tag || ''}
                      onChange={(e) => updateField('home.hero.tag', e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>Hero Title</label>
                    <input
                      type="text"
                      value={hero.title || ''}
                      onChange={(e) => updateField('home.hero.title', e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>Hero Description</label>
                    <textarea
                      rows={3}
                      value={hero.description || ''}
                      onChange={(e) => updateField('home.hero.description', e.target.value)}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ABOUT US (/about)                                       */}
        {/* ============================================================== */}
        {activeTab === 'about' && (
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* HERO BANNER ABOUT */}
              <div
                style={{
                  position: 'relative',
                  backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.6), rgba(5, 19, 41, 0.78)), url("${aboutPage.heroBg || '/assets/images/mts_hero_cinematic.jpg'}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '90px 24px 70px',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 20 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('aboutPage.heroBg', aboutPage.heroBg, 'Change About Hero Background')}
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
                    }}
                  >
                    <IconCamera size={14} color="#38bdf8" />
                    <span>Change About Background</span>
                  </button>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('aboutPage.heroTag', aboutPage.heroTag, 'Edit About Hero Tagline')}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#38bdf8',
                      marginBottom: '12px',
                    }}
                  >
                    <span>{aboutPage.heroTag || 'ABOUT MTS OFFSHORE'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </div>

                  <h1
                    className="clean-editable-block"
                    onClick={() => openTextEditor('aboutPage.heroTitle', aboutPage.heroTitle, 'Edit About Hero Title')}
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 0 14px 0' }}
                  >
                    <span>{aboutPage.heroTitle || 'Fueling The Future Of Offshore Construction'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </h1>

                  <p
                    className="clean-editable-block"
                    onClick={() => openTextEditor('aboutPage.heroDesc', aboutPage.heroDesc, 'Edit About Hero Description', true)}
                    style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}
                  >
                    <span>{aboutPage.heroDesc || 'Delivering safe, efficient, and cost-effective offshore construction, transport & installation, and marine terminal services worldwide.'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </p>
                </div>
              </div>

              {/* MAIN STORY SECTION */}
              <div style={{ padding: '70px 32px', backgroundColor: '#ffffff', color: '#0f172a' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
                  <div>
                    <div
                      className="clean-editable-block"
                      onClick={() => openTextEditor('aboutPage.storyTag', aboutPage.storyTag, 'Edit Story Tag')}
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#0284c7',
                        marginBottom: '10px',
                      }}
                    >
                      <span>{aboutPage.storyTag || 'WHO WE ARE'}</span>
                      <span className="hover-edit-badge">
                        <IconPencil size={11} /> Edit
                      </span>
                    </div>

                    <h2
                      className="clean-editable-block"
                      onClick={() => openTextEditor('aboutPage.storyTitle', aboutPage.storyTitle, 'Edit Story Title')}
                      style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0c3247', margin: '0 0 18px 0', lineHeight: 1.25 }}
                    >
                      <span>{aboutPage.storyTitle || 'Specialists In Complex Offshore & Subsea Environments.'}</span>
                      <span className="hover-edit-badge">
                        <IconPencil size={11} /> Edit
                      </span>
                    </h2>

                    <p
                      className="clean-editable-block"
                      onClick={() => openTextEditor('aboutPage.storyP1', aboutPage.storyP1, 'Edit Story Paragraph 1', true)}
                      style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '16px' }}
                    >
                      <span>{aboutPage.storyP1 || 'MTS OFFSHORE Group operates as an agile, technically advanced offshore solutions provider. We bring together seasoned Tier-1 marine engineering expertise with responsiveness and flexibility.'}</span>
                      <span className="hover-edit-badge">
                        <IconPencil size={11} /> Edit
                      </span>
                    </p>

                    <p
                      className="clean-editable-block"
                      onClick={() => openTextEditor('aboutPage.storyP2', aboutPage.storyP2, 'Edit Story Paragraph 2', true)}
                      style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}
                    >
                      <span>{aboutPage.storyP2 || 'From Single Point Mooring (SPM) CALM buoy changeouts to deepwater subsea flowline stabilization and jacket installations, our taskforces deliver safely and within budget.'}</span>
                      <span className="hover-edit-badge">
                        <IconPencil size={11} /> Edit
                      </span>
                    </p>
                  </div>

                  {/* Story Photo */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ height: '420px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={aboutPage.storyImg || '/assets/images/about_jacket.jpg'}
                        alt="Offshore Story"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => openMediaPicker('aboutPage.storyImg', aboutPage.storyImg, 'Change Story Photo')}
                        style={{
                          position: 'absolute',
                          bottom: '14px',
                          left: '14px',
                          backgroundColor: 'rgba(5, 19, 41, 0.85)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: '#ffffff',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <IconCamera size={13} color="#38bdf8" />
                        <span>Change Operations Photo</span>
                      </button>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-20px',
                        right: '-10px',
                        backgroundColor: '#0c3247',
                        color: '#ffffff',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        maxWidth: '240px',
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24' }}>ISO</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>Certified Systems: 9001, 14001 &amp; 45001</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SERVICES (/services)                                    */}
        {/* ============================================================== */}
        {activeTab === 'services' && (
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* HERO BANNER SERVICES */}
              <div
                style={{
                  position: 'relative',
                  backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.6), rgba(5, 19, 41, 0.78)), url("${servicesPage.heroBg || '/assets/images/hero-offshore.jpg'}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '90px 24px 70px',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 20 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('servicesPage.heroBg', servicesPage.heroBg, 'Change Services Hero Background')}
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
                    }}
                  >
                    <IconCamera size={14} color="#38bdf8" />
                    <span>Change Services Background</span>
                  </button>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.heroTag', servicesPage.heroTag, 'Edit Services Tagline')}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#38bdf8',
                      marginBottom: '12px',
                    }}
                  >
                    <span>{servicesPage.heroTag || 'Our Services'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </div>

                  <h1
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.heroTitle', servicesPage.heroTitle, 'Edit Services Title')}
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 0 14px 0' }}
                  >
                    <span>{servicesPage.heroTitle || 'Best In Class Offshore Construction & Project Management Services'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </h1>

                  <p
                    className="clean-editable-block"
                    onClick={() => openTextEditor('servicesPage.heroDesc', servicesPage.heroDesc, 'Edit Services Description', true)}
                    style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}
                  >
                    <span>{servicesPage.heroDesc || 'MTS Group, boasting over 50 years of collaboration with top-tier EPC providers, offers flexible, agile solutions to asset owners.'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </p>
                </div>
              </div>

              {/* 4 CORE SERVICES GRID */}
              <div style={{ padding: '70px 32px', backgroundColor: '#f8fafc', color: '#0f172a' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Core Offerings
                  </span>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0c3247', margin: '8px 0 0' }}>
                    Comprehensive Offshore Capabilities
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  {(services.items || []).map((card, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                      }}
                    >
                      <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={card.image}
                          alt={card.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() => openMediaPicker(`home.services.items.${idx}.image`, card.image, `Change Photo: ${card.title}`)}
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(5, 19, 41, 0.85)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: '#ffffff',
                            padding: '5px 12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <IconCamera size={13} color="#38bdf8" />
                          <span>Change Photo</span>
                        </button>
                      </div>

                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <span
                            className="clean-editable-block"
                            onClick={() => openTextEditor(`home.services.items.${idx}.tag`, card.tag, 'Edit Service Tag')}
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#0284c7',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              padding: '3px 8px',
                              borderRadius: '4px',
                            }}
                          >
                            <span>{card.tag}</span>
                            <span className="hover-edit-badge">
                              <IconPencil size={11} /> Edit
                            </span>
                          </span>
                        </div>

                        <h3
                          className="clean-editable-block"
                          onClick={() => openTextEditor(`home.services.items.${idx}.title`, card.title, 'Edit Service Title')}
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            margin: '0 0 10px 0',
                          }}
                        >
                          <span>{card.title}</span>
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
                        </h3>

                        <p
                          className="clean-editable-block"
                          onClick={() => openTextEditor(`home.services.items.${idx}.desc`, card.desc, 'Edit Service Description', true)}
                          style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            margin: 0,
                            lineHeight: 1.5,
                            flex: 1,
                          }}
                        >
                          <span>{card.desc}</span>
                          <span className="hover-edit-badge">
                            <IconPencil size={11} /> Edit
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SPM SYSTEMS (/single-point-mooring-systems)              */}
        {/* ============================================================== */}
        {activeTab === 'spm' && (
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* HERO BANNER SPM */}
              <div
                style={{
                  position: 'relative',
                  backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.65), rgba(5, 19, 41, 0.8)), url("${spmPage.heroBg || '/assets/images/mts_spm_epic.jpg'}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '90px 24px 70px',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 20 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('spmPage.heroBg', spmPage.heroBg, 'Change SPM Background Photo')}
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
                    }}
                  >
                    <IconCamera size={14} color="#38bdf8" />
                    <span>Change SPM Background</span>
                  </button>
                </div>

                <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('spmPage.heroTag', spmPage.heroTag, 'Edit SPM Tagline')}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#38bdf8',
                      marginBottom: '12px',
                    }}
                  >
                    <span>{spmPage.heroTag || 'SAFE, EFFICIENT & RELIABLE'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </div>

                  <h1
                    className="clean-editable-block"
                    onClick={() => openTextEditor('spmPage.heroTitle', spmPage.heroTitle, 'Edit SPM Title')}
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 0 14px 0' }}
                  >
                    <span>{spmPage.heroTitle || 'Single Point Mooring Systems'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </h1>

                  <p
                    className="clean-editable-block"
                    onClick={() => openTextEditor('spmPage.heroDesc', spmPage.heroDesc, 'Edit SPM Description', true)}
                    style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}
                  >
                    <span>{spmPage.heroDesc || 'MTS OFFSHORE Group delivers full-cycle Single Point Mooring (SPM) System solutions backed by more than 50 years of global experience.'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </p>
                </div>
              </div>

              {/* 6 SPM CAPABILITIES */}
              <div style={{ padding: '60px 32px', backgroundColor: '#f8fafc', color: '#0f172a' }}>
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Integrated Expertise
                  </span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0c3247', margin: '6px 0 0' }}>
                    6 Core Single Point Mooring Solutions
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  {[
                    { title: 'Project Management & Consultancy', img: '/assets/img/6937955547f3f19cab2173bc_On_site_Training_Tanzainia_3.JPG' },
                    { title: 'Transport & Installation (T&I)', img: '/assets/img/6937948b492fc7e0a9c284b4_Buoy_Lift__5_.JPG' },
                    { title: 'Mooring System Installation', img: '/assets/img/65d40c6689b5e659b722318d_PC86.png' },
                    { title: 'Subsea Installation & Spool Ties', img: '/assets/img/65d42f6dfd1f245d084048a5_PMT2.png' },
                    { title: 'Flowline & PLEM Installation', img: '/assets/img/69c040bdb0bd6707f3fccde4_DJI_20260214070435_0974_D.JPG' },
                    { title: 'Overhaul, Refurbishment & Dry Docking', img: '/assets/img/69379528a31e1173b4aa81ee_20161018_081811.jpg' },
                  ].map((cap, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ height: '160px', overflow: 'hidden' }}>
                        <img src={cap.img} alt={cap.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '14px', fontWeight: 700, fontSize: '0.95rem', color: '#0c3247', textAlign: 'center' }}>
                        {cap.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: OUR ADVANTAGE (/our-advantage)                          */}
        {/* ============================================================== */}
        {activeTab === 'advantage' && (
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* HERO BANNER ADVANTAGE */}
              <div
                style={{
                  position: 'relative',
                  backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.75)), url("${advantagePage.heroBg || '/assets/images/mts_hero_cinematic.jpg'}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '90px 24px 70px',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 20 }}>
                  <button
                    type="button"
                    onClick={() => openMediaPicker('advantagePage.heroBg', advantagePage.heroBg, 'Change Advantage Background')}
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
                    }}
                  >
                    <IconCamera size={14} color="#38bdf8" />
                    <span>Change Advantage Background</span>
                  </button>
                </div>

                <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                  <div
                    className="clean-editable-block"
                    onClick={() => openTextEditor('advantagePage.heroTag', advantagePage.heroTag, 'Edit Advantage Tagline')}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#38bdf8',
                      marginBottom: '12px',
                    }}
                  >
                    <span>{advantagePage.heroTag || 'OUR ADVANTAGE'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </div>

                  <h1
                    className="clean-editable-block"
                    onClick={() => openTextEditor('advantagePage.heroTitle', advantagePage.heroTitle, 'Edit Advantage Title', true)}
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 0 14px 0', whiteSpace: 'pre-line' }}
                  >
                    <span>{advantagePage.heroTitle || 'Built On Experience.\nDriven By Performance.'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </h1>

                  <p
                    className="clean-editable-block"
                    onClick={() => openTextEditor('advantagePage.heroDesc', advantagePage.heroDesc, 'Edit Advantage Description', true)}
                    style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}
                  >
                    <span>{advantagePage.heroDesc || 'MTS OFFSHORE Group delivers world-class offshore project management, transport and installation (T&I), and subsea construction services, backed by over 50 years of Tier-1 leadership experience.'}</span>
                    <span className="hover-edit-badge">
                      <IconPencil size={11} /> Edit
                    </span>
                  </p>
                </div>
              </div>

              {/* 3 PILLARS */}
              <div style={{ padding: '70px 32px', backgroundColor: '#ffffff', color: '#0f172a' }}>
                <div style={{ marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                    WHY MTS OFFSHORE
                  </span>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0c3247', margin: '6px 0 0' }}>
                    Built On Trust, Safety &amp; Technical Agility
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  <div style={{ padding: '30px', border: '1px solid #e2e8f0', borderRadius: '10px', borderTop: '4px solid #006699' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0c3247', marginBottom: '10px' }}>
                      Tier-1 Technical Expertise
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      Our management team has successfully delivered high-stakes offshore construction, T&amp;I, and FPSO installation campaigns across Asia, Africa, and the Middle East.
                    </p>
                  </div>

                  <div style={{ padding: '30px', border: '1px solid #e2e8f0', borderRadius: '10px', borderTop: '4px solid #f26522' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0c3247', marginBottom: '10px' }}>
                      Hands-On Leadership
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      We are driven by a commitment to operational excellence, efficiency, and performance. MTS OFFSHORE provides clients with a dependable partner capable of executing critical scopes.
                    </p>
                  </div>

                  <div style={{ padding: '30px', border: '1px solid #e2e8f0', borderRadius: '10px', borderTop: '4px solid #e5a93b' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0c3247', marginBottom: '10px' }}>
                      Focused On Safety
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      All operations are delivered in compliance with international HSE standards, project-specific requirements, and permit-to-work systems. Safety underpins every decision we make.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: PROJECTS MANAGER                                        */}
        {/* ============================================================== */}
        {activeTab === 'projects' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '1.3rem' }}>
                  Offshore Track Record Projects ({projectsList.length})
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                  Manage project records, photo documentation, client names, and scope of work
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setProjectModal({
                    isOpen: true,
                    data: {
                      slug: 'proj-' + Date.now().toString().slice(-6),
                      title: '',
                      client: '',
                      year: new Date().getFullYear().toString(),
                      location: '',
                      service: 'Project Management & Consultancy',
                      scope: '',
                      image: '/assets/images/proj_1.jpg',
                      featured: true,
                    },
                  })
                }
                style={{
                  padding: '9px 16px',
                  backgroundColor: '#0284c7',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <IconPlus size={15} color="#fff" />
                <span>+ Add New Project</span>
              </button>
            </div>

            {loadingProjects ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                Loading projects list...
              </div>
            ) : projectsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                No projects found. Click + Add New Project above.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px',
                }}
              >
                {projectsList.map((proj) => (
                  <div
                    key={proj.slug}
                    style={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ height: '180px', position: 'relative' }}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          color: '#fbbf24',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {proj.year} • {proj.location}
                      </div>
                      <button
                        type="button"
                        onClick={() => openMediaPicker(`project-img-${proj.slug}`, proj.image, `Change Photo: ${proj.title}`)}
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(5, 19, 41, 0.85)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
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

                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        {proj.service}
                      </div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                        {proj.title}
                      </h4>
                      <p style={{ margin: '0 0 16px 0', color: '#94a3b8', fontSize: '0.85rem', flex: 1, lineHeight: 1.5 }}>
                        {proj.scope || 'Offshore execution scope'}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Client: <strong style={{ color: '#cbd5e1' }}>{proj.client || '-'}</strong>
                        </span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setProjectModal({ isOpen: true, data: proj })}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: 'rgba(56, 189, 248, 0.1)',
                              border: '1px solid rgba(56, 189, 248, 0.25)',
                              color: '#38bdf8',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <IconPencil size={12} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj.slug)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: 'rgba(239, 68, 68, 0.12)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#f87171',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            title="Delete project"
                          >
                            <IconTrash size={14} color="#f87171" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: INQUIRIES VIEWER                                        */}
        {/* ============================================================== */}
        {activeTab === 'inquiries' && (
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '1.25rem' }}>
                  Contact Form Inquiries ({inquiriesList.length})
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                  Messages submitted through the Contact Us page
                </p>
              </div>
              <button
                type="button"
                onClick={fetchInquiries}
                style={{
                  padding: '7px 14px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <IconRefresh size={13} />
                <span>Refresh</span>
              </button>
            </div>

            {loadingInquiries ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Loading inquiries...
              </div>
            ) : inquiriesList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                No inquiries received yet.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Name</th>
                      <th style={{ padding: '12px' }}>Email &amp; Phone</th>
                      <th style={{ padding: '12px' }}>Company</th>
                      <th style={{ padding: '12px' }}>Service Interest</th>
                      <th style={{ padding: '12px' }}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiriesList.map((inq) => (
                      <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <td style={{ padding: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                          {inq.created_at ? new Date(inq.created_at).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-'}
                        </td>
                        <td style={{ padding: '12px', fontWeight: 600, color: '#f8fafc' }}>
                          {inq.name}
                        </td>
                        <td style={{ padding: '12px', color: '#38bdf8' }}>
                          <div>{inq.email}</div>
                          {inq.phone && <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{inq.phone}</div>}
                        </td>
                        <td style={{ padding: '12px', color: '#e2e8f0' }}>{inq.company || '-'}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                            {inq.service_interest || 'General'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: '#cbd5e1', maxWidth: '300px', lineHeight: 1.5 }}>
                          {inq.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: SECURITY & BACKUP (Zero-DB Vercel Mode)                 */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px', margin: '0 auto' }}>
            {/* Password Change Box */}
            <div style={{ backgroundColor: '#0f172a', padding: '30px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <IconLock size={20} color="#38bdf8" />
                <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1.2rem' }}>
                  Admin Account Security
                </h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 20px 0' }}>
                Change your admin password to maintain website security.
              </p>

              {passwordStatus && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontSize: '0.85rem',
                    backgroundColor: passwordStatus.includes('success') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: passwordStatus.includes('success') ? '#86efac' : '#fca5a5',
                    border: passwordStatus.includes('success') ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  {passwordStatus}
                </div>
              )}

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '6px' }}>
                    New Password (min 6 characters)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '6px' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repeat new password"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '10px',
                    backgroundColor: '#0284c7',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '6px',
                  }}
                >
                  Update Admin Password
                </button>
              </form>
            </div>

            {/* Vercel Zero-DB Backup & Export Tools */}
            <div style={{ backgroundColor: '#0f172a', padding: '30px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <IconSave size={20} color="#22c55e" />
                <h3 style={{ margin: 0, color: '#4ade80', fontSize: '1.2rem' }}>
                  Content Backup &amp; Zero-DB Mode
                </h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                This website is fully resilient with <strong>Zero-DB Mode</strong>. All edits are stored in your browser cache and synced to the server. You can export the current content file anytime.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  onClick={exportContentJson}
                  style={{
                    padding: '12px 18px',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                    borderRadius: '8px',
                    color: '#86efac',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <IconSave size={16} />
                  <span>Download siteContent.json (Content File)</span>
                </button>

                <button
                  type="button"
                  onClick={resetContent}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '8px',
                    color: '#fca5a5',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Reset All Content to Factory Default
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. UNIVERSAL MEDIA PICKER MODAL */}
      <MediaPickerModal
        isOpen={mediaModal.isOpen}
        onClose={() => setMediaModal((prev) => ({ ...prev, isOpen: false }))}
        onSelect={handleSelectMedia}
        currentImage={mediaModal.currentUrl}
        title={mediaModal.title}
      />

      {/* 4. QUICK TEXT EDITOR MODAL */}
      {textModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 19, 41, 0.82)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTextModal((prev) => ({ ...prev, isOpen: false }));
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconPencil size={16} color="#38bdf8" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc' }}>
                  {textModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTextModal((prev) => ({ ...prev, isOpen: false }))}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <IconX size={16} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              {textModal.multiline ? (
                <textarea
                  rows={5}
                  value={textModal.currentValue}
                  onChange={(e) => setTextModal((prev) => ({ ...prev, currentValue: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    lineHeight: 1.5,
                  }}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={textModal.currentValue}
                  onChange={(e) => setTextModal((prev) => ({ ...prev, currentValue: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  autoFocus
                />
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setTextModal((prev) => ({ ...prev, isOpen: false }))}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyText}
                style={{
                  padding: '9px 22px',
                  backgroundColor: '#16a34a',
                  backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)',
                }}
              >
                <IconCheck size={14} color="#fff" />
                <span>Save &amp; Apply Live</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD / EDIT PROJECT MODAL */}
      {projectModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 19, 41, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setProjectModal({ isOpen: false, data: null });
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '28px',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconFolder size={18} color="#38bdf8" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8' }}>
                  {projectModal.data?.id ? 'Edit Project' : 'Add New Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProjectModal({ isOpen: false, data: null })}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <IconX size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProject(projectModal.data);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectModal.data?.title || ''}
                  onChange={(e) =>
                    setProjectModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, title: e.target.value },
                    }))
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                    Unique Slug URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectModal.data?.slug || ''}
                    onChange={(e) =>
                      setProjectModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, slug: e.target.value },
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                    Year
                  </label>
                  <input
                    type="text"
                    value={projectModal.data?.year || ''}
                    onChange={(e) =>
                      setProjectModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, year: e.target.value },
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                    Client
                  </label>
                  <input
                    type="text"
                    value={projectModal.data?.client || ''}
                    onChange={(e) =>
                      setProjectModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, client: e.target.value },
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={projectModal.data?.location || ''}
                    onChange={(e) =>
                      setProjectModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, location: e.target.value },
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Service / Category
                </label>
                <input
                  type="text"
                  value={projectModal.data?.service || ''}
                  onChange={(e) =>
                    setProjectModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, service: e.target.value },
                    }))
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Project Photo
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={projectModal.data?.image || ''}
                    onChange={(e) =>
                      setProjectModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, image: e.target.value },
                      }))
                    }
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      color: '#fff',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      openMediaPicker('current_project_modal_img', projectModal.data?.image, 'Select Project Photo');
                    }}
                    style={{
                      padding: '0 16px',
                      backgroundColor: '#0284c7',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <IconCamera size={14} />
                    <span>Choose Photo</span>
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Scope of Work
                </label>
                <textarea
                  rows={4}
                  value={projectModal.data?.scope || ''}
                  onChange={(e) =>
                    setProjectModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, scope: e.target.value },
                    }))
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setProjectModal({ isOpen: false, data: null })}
                  style={{
                    padding: '9px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '9px 20px',
                    backgroundColor: '#16a34a',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
