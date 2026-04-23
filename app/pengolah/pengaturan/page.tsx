'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { HiArrowLeft, HiCog, HiBell, HiLockClosed, HiUserCircle } from 'react-icons/hi';

export default function PengaturanPage() {
  const router = useRouter();

  const menuPengaturan = [
    {
      icon: HiUserCircle,
      title: 'Profil Perusahaan',
      description: 'Ubah informasi profil perusahaan',
      path: '/pengolah/profil',
    },
    {
      icon: HiBell,
      title: 'Notifikasi',
      description: 'Atur preferensi notifikasi',
      path: '/pengolah/notifikasi',
    },
    {
      icon: HiLockClosed,
      title: 'Keamanan',
      description: 'Ubah password dan pengaturan keamanan',
      path: '/pengolah/keamanan',
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Pengaturan" />

        <div className="page-content">
          {/* Tombol Kembali */}
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#2a7a3b',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginBottom: '1.25rem',
              padding: '0.25rem 0',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#1a5c28')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#2a7a3b')}
          >
            <HiArrowLeft style={{ fontSize: '1rem' }} /> Kembali
          </button>

          {/* Kartu Pengaturan */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #efefef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: '#e8f5eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HiCog style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a2e1c',
                    margin: 0,
                  }}
                >
                  Pengaturan
                </h1>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#8a9e8d',
                    margin: '0.2rem 0 0',
                  }}
                >
                  Kelola pengaturan akun dan preferensi Anda
                </p>
              </div>
            </div>

            {/* Daftar Menu Pengaturan */}
            <div style={{ padding: '0.5rem 0' }}>
              {menuPengaturan.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => router.push(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    borderBottom: idx < menuPengaturan.length - 1 ? '1px solid #f7f7f7' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#f8fdf8')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: '#e8f5eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <item.icon style={{ color: '#2a7a3b', fontSize: '1.1rem' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a2e1c', margin: 0 }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#8a9e8d', margin: '0.2rem 0 0' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span style={{ color: '#2a7a3b', fontSize: '1rem' }}>→</span>
                </div>
              ))}
            </div>

            {/* Tombol Simpan Perubahan */}
            <div style={{ padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid #f7f7f7' }}>
              <button
                onClick={() => {
                  // Simpan perubahan (integrasi dengan API nanti)
                  alert('Pengaturan telah disimpan!');
                }}
                style={{
                  width: '100%',
                  background: '#2a7a3b',
                  border: 'none',
                  borderRadius: 12,
                  padding: '0.75rem',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1a5c28')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#2a7a3b')}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}