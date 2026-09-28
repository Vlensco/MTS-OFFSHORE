'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  // Always initialize synchronously with initialContent or INITIAL_CONTENT to guarantee identical SSR and initial client DOM
  const [content, setContent] = useState(initialContent || INITIAL_CONTENT);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          setContent((prev) => {
            // Prioritize server content, fall back to initial
            const merged = { ...INITIAL_CONTENT, ...prev, ...data };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      }
    } catch (err) {
      console.warn('Failed to load content from API, using cached/initial:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Safely rehydrate local cache in useEffect AFTER hydration is complete to avoid SSR mismatch
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          setContent((prev) => ({ ...INITIAL_CONTENT, ...prev, ...parsed }));
        }
      }
    } catch {
      // Ignore localStorage error
    }

    fetchContent();
  }, [fetchContent]);

  // Deep update a property using dot notation
  const updateField = useCallback((path, value, autoSave = false) => {
    let nextContent;
    setContent((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || INITIAL_CONTENT));
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
      nextContent = copy;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      } catch {}

      return copy;
    });

    setHasUnsavedChanges(true);

    if (autoSave && nextContent) {
      saveContent(nextContent);
    }
  }, []);

  const saveContent = useCallback(async (overrideContent = null) => {
    setIsSaving(true);
    const targetContent = overrideContent || content;

    try {
      // 1. Always persist to localStorage for instant client durability (Zero-DB Vercel mode)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(targetContent));
      } catch {}

      // 2. Persist to API
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetContent),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan perubahan konten.');
      }

      setHasUnsavedChanges(false);
      return { success: true, message: data.message };
    } catch (err) {
      console.warn('API save note (stored in browser local cache):', err.message);
      // Even if API / DB write fails on read-only serverless, it remains active in client's local cache
      setHasUnsavedChanges(false);
      return { success: true, message: 'Disimpan di cache browser lokal!' };
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  // Download siteContent.json file for easy offline commit
  const exportContentJson = useCallback(() => {
    try {
      const jsonStr = JSON.stringify(content, null, 2);
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
