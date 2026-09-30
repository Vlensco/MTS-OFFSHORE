'use client';

import React from 'react';
import { IconLock, IconRefresh } from './AdminIcons';

export default function AdminSettingsTab({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  passwordStatus,
  handleChangePassword,
  exportContentJson,
  resetContent,
}) {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', padding: '40px 24px', color: '#0c3247' }}>
      <div className="w-layout-blockcontainer container-one w-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <IconLock size={26} color="#0072ce" />
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>
              Security &amp; Content Management
            </h2>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              Kelola keamanan akun admin, unduh salinan backup data, dan setelan sistem.
            </p>
          </div>
        </div>

        {/* Card 1: Change Admin Password */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            marginBottom: '28px',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0c3247', margin: '0 0 8px 0', fontFamily: 'var(--font-heading)' }}>
            Ganti Password Admin
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 20px 0' }}>
            Pastikan password baru memiliki minimal 6 karakter kombinasi huruf dan angka.
          </p>

          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Password Baru
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang password baru"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                }}
                required
              />
            </div>

            {passwordStatus && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: passwordStatus.includes('Error') || passwordStatus.includes('must') || passwordStatus.includes('not match') ? '#fee2e2' : '#ecfdf5',
                  color: passwordStatus.includes('Error') || passwordStatus.includes('must') || passwordStatus.includes('not match') ? '#b91c1c' : '#047857',
                }}
              >
                {passwordStatus}
              </div>
            )}

            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#0072ce',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 22px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 114, 206, 0.3)',
                }}
              >
                Simpan Password Baru
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: Backup & Export JSON */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            marginBottom: '28px',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0c3247', margin: '0 0 8px 0', fontFamily: 'var(--font-heading)' }}>
            Ekspor &amp; Backup Data Konten (JSON)
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px 0' }}>
            Unduh seluruh konten website dalam bentuk file <code>siteContent.json</code> untuk keperluan cadangan (backup) atau commit ke Git repository.
          </p>

          <button
            type="button"
            onClick={exportContentJson}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              color: '#0c3247',
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>📥</span>
            <span>Download Backup siteContent.json</span>
          </button>
        </div>

        {/* Card 3: Reset Content to Factory Defaults */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#b91c1c', margin: '0 0 8px 0', fontFamily: 'var(--font-heading)' }}>
            Zona Bahaya: Reset ke Setelan Awal
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px 0' }}>
            Tindakan ini akan mengembalikan semua teks, foto, dan tata letak ke konten standar bawaan pabrik MTS Offshore.
          </p>

          <button
            type="button"
            onClick={resetContent}
            style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #f87171',
              borderRadius: '8px',
              color: '#b91c1c',
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <IconRefresh size={14} color="#b91c1c" />
            <span>Reset Seluruh Konten ke Default</span>
          </button>
        </div>
      </div>
    </div>
  );
}
