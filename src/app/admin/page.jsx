'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSiteContent } from '../../context/ContentContext';
import MediaPickerModal from '../../components/admin/MediaPickerModal';
import ThemeCustomizerModal from '../../components/admin/ThemeCustomizerModal';
import AdminHeader from '../../components/admin/AdminHeader';
import VisualHomePage from '../../components/admin/VisualHomePage';
import VisualServicesPage from '../../components/admin/VisualServicesPage';
import VisualSpmPage from '../../components/admin/VisualSpmPage';
import VisualProjectsPage from '../../components/admin/VisualProjectsPage';
import VisualAboutPage from '../../components/admin/VisualAboutPage';
import VisualContactPage from '../../components/admin/VisualContactPage';
import VisualAdvantagePage from '../../components/admin/VisualAdvantagePage';
import AdminInquiriesTab from '../../components/admin/AdminInquiriesTab';
import AdminSettingsTab from '../../components/admin/AdminSettingsTab';
import {
  IconSave,
  IconCheck,
  IconX,
  IconPencil,
  IconCamera,
} from '../../components/admin/AdminIcons';

import { PROJECTS as DEFAULT_PROJECTS } from '../../data/projectsData';

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

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'services' | 'spm' | 'projects' | 'about' | 'contact' | 'advantage' | 'inquiries' | 'settings'
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'form'
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

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

  // Projects state (use DEFAULT_PROJECTS as reliable initial fallback)
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectModal, setProjectModal] = useState({
    isOpen: false,
    data: null,
  });

  // Inquiries state
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Password state
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

  // Sync initial tab from URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') || params.get('page');
      if (
        tabParam &&
        ['home', 'services', 'spm', 'projects', 'about', 'contact', 'advantage', 'inquiries', 'settings'].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleSelectTab = (newTab) => {
    setActiveTab(newTab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', newTab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (activeTab === 'projects' || activeTab === 'home' || activeTab === 'services') {
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
      showToast('✓ Konten berhasil disimpan dan langsung live di website!', 'success');
    } else {
      showToast('Gagal menyimpan: ' + (res.error || 'Unknown error'), 'error');
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
      showToast(`Foto proyek dipilih: ${newUrl}`, 'info');
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
      showToast('✓ Foto berhasil diubah dan tersimpan live!', 'success');
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
      showToast('✓ Teks berhasil diperbarui dan tersimpan live!', 'success');
    }
  };

  const handleSaveTheme = (newTheme) => {
    updateField('theme', newTheme, true);
    showToast('✓ Tema & Font berhasil disimpan dan diterapkan live!', 'success');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordStatus('');

    if (newPassword.length < 6) {
      setPasswordStatus('Password minimal 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus('Konfirmasi password tidak cocok.');
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
        throw new Error(data.error || 'Gagal mengubah password.');
      }

      setPasswordStatus('Password admin berhasil diperbarui!');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password admin berhasil diperbarui!', 'success');
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
        throw new Error(data.error || 'Gagal menyimpan proyek.');
      }

      showToast('Proyek berhasil disimpan!', 'success');
      setProjectModal({ isOpen: false, data: null });
      fetchProjects();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  const handleDeleteProject = async (slug) => {
    if (!confirm(`Hapus proyek "${slug}"?`)) return;

    try {
      const res = await fetch(`/api/projects?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menghapus proyek.');
      }

      showToast(`Proyek "${slug}" berhasil dihapus.`, 'success');
      fetchProjects();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  const general = content?.general || {};
  const theme = content?.theme || {};

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* 1. TOP STICKY ADMIN HEADER & NAVBAR (Exact 1:1 replica of live site with real-time controls) */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        handleSave={handleSave}
        handleLogout={handleLogout}
        onOpenThemeModal={() => setThemeModalOpen(true)}
        capabilityPdf={general.capabilityPdf}
        onEditCapabilityPdf={() =>
          openTextEditor('general.capabilityPdf', general.capabilityPdf, 'Edit Capability Statement PDF URL')
        }
        inquiriesCount={inquiriesList.length}
        topBarColor={theme.colorTopBar || '#146cac'}
      />

      {/* 2. TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            padding: '12px 20px',
            borderRadius: '10px',
            backgroundColor:
              toastType === 'success'
                ? '#15803d'
                : toastType === 'error'
                ? '#b91c1c'
                : '#0284c7',
            color: '#ffffff',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.875rem',
            fontWeight: 700,
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
            }}
          >
            <IconX size={14} />
          </button>
        </div>
      )}

      {/* 3. MAIN CONTENT: VISUAL 1:1 OR FORM DATA */}
      {viewMode === 'visual' ? (
        <main style={{ minHeight: 'calc(100vh - 110px)', backgroundColor: '#ffffff' }}>
          {activeTab === 'home' && (
            <VisualHomePage
              content={content}
              projectsList={projectsList}
              onOpenProjectModal={(p) => setProjectModal({ isOpen: true, data: p })}
              openTextEditor={openTextEditor}
              openMediaPicker={openMediaPicker}
            />
          )}

          {activeTab === 'services' && (
            <VisualServicesPage
              content={content}
              openTextEditor={openTextEditor}
              openMediaPicker={openMediaPicker}
            />
          )}

          {activeTab === 'spm' && (
            <VisualSpmPage
              content={content}
              openTextEditor={openTextEditor}
              openMediaPicker={openMediaPicker}
            />
          )}

          {activeTab === 'projects' && (
            <VisualProjectsPage
              content={content}
              projectsList={projectsList}
              openMediaPicker={openMediaPicker}
              onOpenProjectModal={(p) => setProjectModal({ isOpen: true, data: p })}
              onDeleteProject={handleDeleteProject}
              openTextEditor={openTextEditor}
            />
          )}

          {activeTab === 'about' && (
            <VisualAboutPage
              content={content}
              openTextEditor={openTextEditor}
              openMediaPicker={openMediaPicker}
            />
          )}

          {activeTab === 'contact' && (
            <VisualContactPage
              content={content}
              openTextEditor={openTextEditor}
              openMediaPicker={openMediaPicker}
            />
          )}

          {activeTab === 'advantage' && (
            <VisualAdvantagePage
              content={content}
              openTextEditor={openTextEditor}
              openMediaPicker={openMediaPicker}
            />
          )}

          {activeTab === 'inquiries' && (
            <AdminInquiriesTab
              inquiriesList={inquiriesList}
              loadingInquiries={loadingInquiries}
              fetchInquiries={fetchInquiries}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettingsTab
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordStatus={passwordStatus}
              handleChangePassword={handleChangePassword}
              exportContentJson={exportContentJson}
              resetContent={resetContent}
            />
          )}
        </main>
      ) : (
        /* FORM DATA MODE */
        <main style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0c3247', marginBottom: '8px' }}>
              Form Data Editor — {activeTab.toUpperCase()}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Mode formulir terstruktur untuk memasukkan data teks langsung.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeTab === 'home' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>Hero Tagline</label>
                    <input
                      type="text"
                      value={content?.home?.hero?.tag || ''}
                      onChange={(e) => updateField('home.hero.tag', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>Hero Title</label>
                    <input
                      type="text"
                      value={content?.home?.hero?.title || ''}
                      onChange={(e) => updateField('home.hero.title', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>Hero Description</label>
                    <textarea
                      rows={3}
                      value={content?.home?.hero?.description || ''}
                      onChange={(e) => updateField('home.hero.description', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>Services Hero Tag</label>
                    <input
                      type="text"
                      value={content?.servicesPage?.heroTag || ''}
                      onChange={(e) => updateField('servicesPage.heroTag', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>Services Hero Title</label>
                    <input
                      type="text"
                      value={content?.servicesPage?.heroTitle || ''}
                      onChange={(e) => updateField('servicesPage.heroTitle', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>Services Hero Description</label>
                    <textarea
                      rows={3}
                      value={content?.servicesPage?.heroDesc || ''}
                      onChange={(e) => updateField('servicesPage.heroDesc', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleSave}
                  style={{
                    backgroundColor: '#0072ce',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 4. THEME & TYPOGRAPHY STUDIO MODAL */}
      <ThemeCustomizerModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={content?.theme}
        onSaveTheme={handleSaveTheme}
      />

      {/* 5. MEDIA PICKER MODAL */}
      <MediaPickerModal
        isOpen={mediaModal.isOpen}
        onClose={() => setMediaModal((prev) => ({ ...prev, isOpen: false }))}
        onSelect={handleSelectMedia}
        currentUrl={mediaModal.currentUrl}
        title={mediaModal.title}
      />

      {/* 6. QUICK TEXT EDITOR MODAL */}
      {textModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 19, 41, 0.75)',
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
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '14px',
              padding: '26px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              color: '#0c3247',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconPencil size={18} color="#0072ce" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                  {textModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTextModal((prev) => ({ ...prev, isOpen: false }))}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
              >
                <IconX size={18} />
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
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    color: '#0c3247',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    lineHeight: 1.6,
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
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    color: '#0c3247',
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
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApplyText}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#0072ce',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <IconCheck size={14} />
                <span>Terapkan &amp; Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. PROJECT MODAL (Add / Edit) */}
      {projectModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 19, 41, 0.75)',
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
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              color: '#0c3247',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {projectModal.data?.slug ? 'Edit Project' : 'Add New Offshore Project'}
              </h3>
              <button
                type="button"
                onClick={() => setProjectModal({ isOpen: false, data: null })}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const data = {
                  title: form.title.value,
                  slug: form.slug.value,
                  category: form.category.value,
                  location: form.location.value,
                  client: form.client.value,
                  year: form.year.value,
                  summary: form.summary.value,
                  image: projectModal.data?.image || '/assets/images/mts_hero_cinematic.jpg',
                };
                handleSaveProject(data);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Project Title</label>
                <input
                  name="title"
                  defaultValue={projectModal.data?.title || ''}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Slug (URL identifier)</label>
                  <input
                    name="slug"
                    defaultValue={projectModal.data?.slug || ''}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Category</label>
                  <select
                    name="category"
                    defaultValue={projectModal.data?.category || 'SPM'}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="SPM">SPM</option>
                    <option value="Subsea">Subsea</option>
                    <option value="Platform">Platform</option>
                    <option value="Marine">Marine</option>
                    <option value="Offshore">Offshore</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Location</label>
                  <input
                    name="location"
                    defaultValue={projectModal.data?.location || 'Gulf of Papua / Asia Pacific'}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Client</label>
                  <input
                    name="client"
                    defaultValue={projectModal.data?.client || 'Santos / Operator'}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Year</label>
                <input
                  name="year"
                  defaultValue={projectModal.data?.year || '2025'}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Project Summary</label>
                <textarea
                  name="summary"
                  rows={3}
                  defaultValue={projectModal.data?.summary || projectModal.data?.description || ''}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Project Photo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={projectModal.data?.image || '/assets/images/mts_hero_cinematic.jpg'}
                    alt="Preview"
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <button
                    type="button"
                    onClick={() => openMediaPicker('current_project_modal_img', projectModal.data?.image, 'Pilih Foto Proyek')}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    Ganti Foto Proyek
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setProjectModal({ isOpen: false, data: null })}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 22px',
                    backgroundColor: '#0072ce',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
