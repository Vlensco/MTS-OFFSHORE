'use client';

import React, { useState } from 'react';
import { IconMail, IconRefresh, IconCheck, IconTrash } from './AdminIcons';

export default function AdminInquiriesTab({
  inquiriesList = [],
  loadingInquiries = false,
  fetchInquiries,
  showToast,
}) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInquiries = inquiriesList.filter((inq) => {
    const q = searchTerm.toLowerCase();
    return (
      inq.name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.company?.toLowerCase().includes(q) ||
      inq.message?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', padding: '40px 24px', color: '#0c3247' }}>
      <div className="w-layout-blockcontainer container-one w-container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconMail size={24} color="#0072ce" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>
                Client Inquiries Inbox
              </h2>
            </div>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              Pesan dan penawaran proyek yang dikirimkan oleh klien melalui formulir Contact Us.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Cari pesan atau nama klien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                minWidth: '240px',
              }}
            />
            <button
              type="button"
              onClick={fetchInquiries}
              disabled={loadingInquiries}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <IconRefresh size={14} />
              <span>{loadingInquiries ? 'Memuat...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Content Table */}
        {filteredInquiries.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px dashed #cbd5e1',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📬</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 6px' }}>Belum Ada Pesan Masuk</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
              Formulir kontak di halaman Contact Us siap menerima pesan dari calon klien offshore.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                  <th style={{ padding: '14px 18px' }}>Pengirim</th>
                  <th style={{ padding: '14px 18px' }}>Perusahaan</th>
                  <th style={{ padding: '14px 18px' }}>Email &amp; Telepon</th>
                  <th style={{ padding: '14px 18px' }}>Ringkasan Pesan</th>
                  <th style={{ padding: '14px 18px' }}>Tanggal</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq, idx) => (
                  <tr
                    key={inq.id || idx}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0c3247' }}>
                      {inq.name || '-'}
                    </td>
                    <td style={{ padding: '14px 18px', color: '#334155' }}>
                      {inq.company || '-'}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ color: '#0072ce', fontWeight: 600 }}>{inq.email}</div>
                      <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{inq.phone || '-'}</div>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#475569', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {inq.message || '-'}
                    </td>
                    <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      {inq.created_at ? new Date(inq.created_at).toLocaleString('id-ID') : '-'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInquiry(inq);
                        }}
                        style={{
                          backgroundColor: '#0072ce',
                          color: '#ffffff',
                          border: 'none',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Buka
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Selected Inquiry Modal */}
        {selectedInquiry && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 19, 41, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSelectedInquiry(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '580px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                color: '#0c3247',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Detail Pesan Klien</h3>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Nama Pengirim</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0c3247' }}>{selectedInquiry.name}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Email</span>
                    <div><a href={`mailto:${selectedInquiry.email}`} style={{ color: '#0072ce', fontWeight: 600 }}>{selectedInquiry.email}</a></div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Telepon</span>
                    <div style={{ fontWeight: 600 }}>{selectedInquiry.phone || '-'}</div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Perusahaan</span>
                  <div style={{ fontWeight: 600 }}>{selectedInquiry.company || '-'}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Isi Pesan</span>
                  <div style={{ marginTop: '6px', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#334155' }}>
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: Offshore Inquiry - MTS Offshore`}
                  style={{
                    backgroundColor: '#0072ce',
                    color: '#ffffff',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  Balas Email Klien
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
