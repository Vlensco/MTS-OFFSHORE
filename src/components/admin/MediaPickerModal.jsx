'use client';

import { useState, useEffect, useRef } from 'react';
import {
  IconCamera,
  IconImage,
  IconUpload,
  IconLink,
  IconSearch,
  IconCheck,
  IconX,
} from './AdminIcons';

// Helper function to compress and resize large photos in browser before upload (prevents Vercel 413 Payload Too Large)
async function compressImageIfNeeded(file, maxDimension = 2400) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    return file;
  }
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  // If already under 1.5MB, no compression needed
  if (file.size <= 1.5 * 1024 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve(file);
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => resolve(file);
      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down dimensions if needed
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Use image/jpeg for efficient compression
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const quality = 0.88;

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // If still large (> 3.5MB, near Vercel's 4.5MB limit), re-encode with jpeg at quality 0.78
              if (blob.size > 3.5 * 1024 * 1024) {
                canvas.toBlob(
                  (smallerBlob) => {
                    if (!smallerBlob) {
                      resolve(file);
                      return;
                    }
                    const newName = file.name.replace(/\.[^.]+$/, '.jpg');
                    const compressedFile = new File([smallerBlob], newName, {
                      type: 'image/jpeg',
                      lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                  },
                  'image/jpeg',
                  0.78
                );
                return;
              }

              const compressedFile = new File([blob], file.name, {
                type: blob.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            mimeType,
            quality
          );
        } catch (err) {
          console.warn('Canvas compression error, using original file:', err);
          resolve(file);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentImage = '',
  title = 'Select / Change Photo',
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'library' | 'url'
  const [mediaList, setMediaList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(currentImage || '');
  const [customUrl, setCustomUrl] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [lastUploaded, setLastUploaded] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelectedUrl(currentImage || '');
    setCustomUrl(currentImage || '');
    setUploadError('');
    setLastUploaded(null);
  }, [currentImage, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setLoadingMedia(true);
    fetch('/api/media-library')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.media)) {
          setMediaList(data.media);
        }
      })
      .catch((err) => console.error('Failed to load media library:', err))
      .finally(() => setLoadingMedia(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (file, autoApply = false) => {
    if (!file) return;
    setUploadError('');
    setUploading(true);
    setUploadStatusText('Memproses foto...');

    try {
      // 1. Auto-compress photos > 1.5MB to bypass Vercel 4.5MB Payload Too Large (413) limit
      let fileToUpload = file;
      if (file.size > 1.5 * 1024 * 1024) {
        setUploadStatusText(`Mengompresi resolusi foto (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);
        fileToUpload = await compressImageIfNeeded(file);
      }

      setUploadStatusText('Mengunggah foto ke server...');
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 413) {
        throw new Error('Ukuran foto terlalu besar untuk server Vercel (413 Payload Too Large). Silakan coba dengan foto di bawah 4.5MB.');
      }

      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error(`Upload server error (${res.status}): Server tidak mengembalikan response yang valid.`);
      }

      if (!res.ok) {
        throw new Error(data.error || `Upload gagal dengan status ${res.status}`);
      }

      // Add to mediaList
      const newMedia = {
        name: data.fileName,
        url: data.url,
        folder: 'Uploaded Files',
        size: data.size,
        modifiedAt: Date.now(),
      };
      setMediaList((prev) => [newMedia, ...prev]);
      setSelectedUrl(data.url);
      setLastUploaded(data.url);

      if (autoApply) {
        onSelect(data.url);
        onClose();
        return;
      }
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      setUploadStatusText('');
    }
  };

  const handleFileChange = (e, autoApply = false) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file, autoApply);
  };

  const handleApply = () => {
    const finalUrl = activeTab === 'url' ? customUrl.trim() : (lastUploaded || selectedUrl);
    if (finalUrl) {
      onSelect(finalUrl);
      onClose();
    }
  };

  const filteredMedia = mediaList.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 19, 41, 0.85)',
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
          maxWidth: '860px',
          maxHeight: '90vh',
          backgroundColor: '#0c1424',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#ffffff',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#070d18',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center' }}>
              <IconCamera size={20} color="#38bdf8" />
            </span>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
              {title}
            </h2>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Tabs Bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#0b1322',
            padding: '0 20px',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            style={{
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'upload' ? '2.5px solid #0284c7' : '2.5px solid transparent',
              color: activeTab === 'upload' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <IconUpload size={16} />
            <span>Upload From Computer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('library')}
            style={{
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'library' ? '2.5px solid #0284c7' : '2.5px solid transparent',
              color: activeTab === 'library' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <IconImage size={16} />
            <span>Media Library ({mediaList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            style={{
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'url' ? '2.5px solid #0284c7' : '2.5px solid transparent',
              color: activeTab === 'url' ? '#38bdf8' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <IconLink size={16} />
            <span>Image URL</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* TAB 1: UPLOAD */}
          {activeTab === 'upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 10px' }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, false)}
                style={{ display: 'none' }}
              />

              {lastUploaded ? (
                /* Success state after upload with instant action */
                <div
                  style={{
                    width: '100%',
                    maxWidth: '520px',
                    backgroundColor: 'rgba(22, 101, 52, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontWeight: 700, fontSize: '0.95rem' }}>
                    <IconCheck size={18} color="#4ade80" />
                    <span>Photo Uploaded Successfully!</span>
                  </div>

                  <div style={{ width: '100%', maxHeight: '240px', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img
                      src={lastUploaded}
                      alt="Uploaded preview"
                      style={{ width: '100%', height: '220px', objectFit: 'contain', backgroundColor: '#020617' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(lastUploaded);
                        onClose();
                      }}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#16a34a',
                        backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)',
                      }}
                    >
                      <IconCheck size={16} color="#fff" />
                      <span>Use This Photo Now</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLastUploaded(null);
                        fileInputRef.current?.click();
                      }}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      Upload Another File
                    </button>
                  </div>
                </div>
              ) : (
                /* Initial Upload Dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileUpload(file, false);
                  }}
                  style={{
                    width: '100%',
                    maxWidth: '520px',
                    border: '2px dashed rgba(56, 189, 248, 0.4)',
                    borderRadius: '12px',
                    padding: '40px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ marginBottom: '14px', color: '#38bdf8', display: 'flex', justifyContent: 'center' }}>
                    <IconUpload size={44} color="#38bdf8" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 6px 0' }}>
                    Click to Browse Image from Computer or Drag &amp; Drop Here
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.825rem', margin: '0 0 18px 0' }}>
                    Supports JPG, PNG, WEBP, SVG, GIF (Foto otomatis dioptimalkan agar upload lancar)
                  </p>
                  <button
                    type="button"
                    style={{
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                    }}
                  >
                    Choose Photo File
                  </button>
                </div>
              )}

              {uploading && (
                <div style={{ marginTop: '20px', color: '#38bdf8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #38bdf8', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                  <span>{uploadStatusText || 'Uploading and processing photo...'}</span>
                </div>
              )}

              {uploadError && (
                <div style={{ marginTop: '16px', color: '#f87171', fontSize: '0.85rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  Error: {uploadError}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIBRARY */}
          {activeTab === 'library' && (
            <div>
              {/* Search & Filter */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search media by filename..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                  <IconSearch size={16} />
                </span>
              </div>

              {loadingMedia ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
                  Loading media gallery...
                </div>
              ) : filteredMedia.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>
                  No photos found.
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
                    gap: '12px',
                  }}
                >
                  {filteredMedia.map((item, idx) => {
                    const isSelected = selectedUrl === item.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedUrl(item.url)}
                        onDoubleClick={handleApply}
                        style={{
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #0284c7' : '1px solid rgba(255, 255, 255, 0.1)',
                          backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.18)' : 'rgba(30, 41, 59, 0.5)',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          transition: 'all 0.2s',
                          position: 'relative',
                        }}
                      >
                        <div style={{ height: '95px', overflow: 'hidden', backgroundColor: '#020617' }}>
                          <img
                            src={item.url}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
                        <div style={{ padding: '8px', fontSize: '0.75rem' }}>
                          <div
                            style={{
                              fontWeight: 600,
                              color: isSelected ? '#38bdf8' : '#e2e8f0',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                          <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                            {item.folder}
                          </div>
                        </div>

                        {isSelected && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '6px',
                              right: '6px',
                              backgroundColor: '#0284c7',
                              color: '#ffffff',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconCheck size={12} color="#fff" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div style={{ padding: '20px 0' }}>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
                Direct Image URL:
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg or /assets/images/photo.jpg"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  marginBottom: '16px',
                }}
              />
              {customUrl && (
                <div style={{ marginTop: '14px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '8px' }}>Preview URL:</div>
                  <img
                    src={customUrl}
                    alt="Preview URL"
                    onError={(e) => (e.target.style.display = 'none')}
                    onLoad={(e) => (e.target.style.display = 'inline-block')}
                    style={{
                      maxHeight: '220px',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Selection Preview & Action */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#070d18',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Active selection preview */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
            {(activeTab === 'url' ? customUrl : (lastUploaded || selectedUrl)) ? (
              <>
                <img
                  src={activeTab === 'url' ? customUrl : (lastUploaded || selectedUrl)}
                  alt="Selected thumbnail"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    flexShrink: 0,
                  }}
                  onError={(e) => (e.target.style.opacity = '0.3')}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#cbd5e1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeTab === 'url' ? customUrl : (lastUploaded || selectedUrl)}
                </span>
              </>
            ) : (
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                No photo selected yet
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                color: '#e2e8f0',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.85rem',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!(activeTab === 'url' ? customUrl.trim() : (lastUploaded || selectedUrl))}
              style={{
                padding: '8px 20px',
                backgroundColor: '#0284c7',
                border: 'none',
                borderRadius: '6px',
                color: '#ffffff',
                cursor: (activeTab === 'url' ? customUrl.trim() : (lastUploaded || selectedUrl)) ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                fontSize: '0.85rem',
                opacity: (activeTab === 'url' ? customUrl.trim() : (lastUploaded || selectedUrl)) ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <IconCheck size={14} color="#fff" />
              <span>Apply Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
