'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_CONTENT } from '../data/initialContent';

const STORAGE_KEY = 'mts_site_content_cache';

const ContentContext = createContext({
  content: INITIAL_CONTENT,
  loading: true,
  hasUnsavedChanges: false,
  isSaving: false,
  updateField: () => {},
  saveContent: async () => {},
  refreshContent: async () => {},
  resetContent: async () => {},
  exportContentJson: () => {},
});

export function ContentProvider({ children, initialContent = null }) {
  const [content, setContent] = useState(initialContent || INITIAL_CONTENT);
  const contentRef = useRef(initialContent || INITIAL_CONTENT);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          const merged = { ...INITIAL_CONTENT, ...data };
          setContent(merged);
          contentRef.current = merged;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch {}
        }
      }
    } catch (err) {
      console.warn('Failed to load content from API, using cached/initial:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          setContent((prev) => ({ ...INITIAL_CONTENT, ...prev, ...parsed }));
        }
      }
    } catch {}

    fetchContent();
  }, [fetchContent]);

  const saveContent = useCallback(async (overrideContent = null) => {
    setIsSaving(true);
    const targetContent = overrideContent || contentRef.current || INITIAL_CONTENT;

    try {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(targetContent));
      } catch {}

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetContent),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save content to database.');
      }

      setHasUnsavedChanges(false);
      return { success: true, message: data.message || 'Saved successfully!' };
    } catch (err) {
      console.error('Save content error:', err.message);
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Deep update a property using dot notation with synchronous state and autoSave
  const updateField = useCallback(
    (path, value, autoSave = false) => {
      const copy = JSON.parse(JSON.stringify(contentRef.current || INITIAL_CONTENT));
      const parts = path.split('.');
      let curr = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!curr[p] || typeof curr[p] !== 'object') {
          curr[p] = {};
        }
        curr = curr[p];
      }
      curr[parts[parts.length - 1]] = value;

      setContent(copy);
      contentRef.current = copy;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      } catch {}

      if (autoSave) {
        saveContent(copy);
      } else {
        setHasUnsavedChanges(true);
      }
    },
    [saveContent]
  );

  // Download siteContent.json file for easy offline commit
  const exportContentJson = useCallback(() => {
    try {
      const jsonStr = JSON.stringify(contentRef.current || content, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `siteContent_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
    }
  }, [content]);

  const resetContent = useCallback(async () => {
    if (!confirm('Apakah Anda yakin ingin mereset semua konten ke setelan default pabrik?')) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      setContent(INITIAL_CONTENT);
      contentRef.current = INITIAL_CONTENT;
      await saveContent(INITIAL_CONTENT);
      alert('Konten telah direset ke default!');
    } catch (err) {
      console.error('Reset error:', err);
    }
  }, [saveContent]);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        loading,
        hasUnsavedChanges,
        isSaving,
        updateField,
        saveContent,
        refreshContent: fetchContent,
        resetContent,
        exportContentJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  return (
    ctx || {
      content: INITIAL_CONTENT,
      loading: false,
      hasUnsavedChanges: false,
      isSaving: false,
      updateField: () => {},
      saveContent: async () => {},
      refreshContent: async () => {},
      resetContent: async () => {},
      exportContentJson: () => {},
    }
  );
}
