// app/petani/transaksi/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  HiHome, HiShoppingBag, HiBell, HiChevronDown, HiChatAlt2,
  HiUserCircle, HiPlusCircle, HiDocumentText, HiOutlineUserGroup,
  HiArrowLeft, HiCheckCircle, HiClock, HiXCircle,
} from 'react-icons/hi';

export default function TransaksiPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (path: string) => router.push(path);
  const isActive = (path: string) => pathname === path;

  const [transaksi] = useState([
    { id: 'TRX-001', pembeli: 'Bu Sinta', komoditas: 'Jagung Retak', jumlah: '50 kg', total: 'Rp 200.000', status: 'Selesai', tanggal: '01/04/2024', statusColor: 'green' },
    { id: 'TRX-002', pembeli: 'Bapak Ahmad', komoditas: 'Tomat Grade B', jumlah: '100 kg', total: 'Rp 500.000', status: 'Selesai', tanggal: '15/03/2024', statusColor: 'green' },
    { id: 'TRX-003', pembeli: 'Toko Pakan "Sejahtera"', komoditas: 'Kedelai', jumlah: '200 kg', total: 'Rp 1.600.000', status: 'Diproses', tanggal: '10/03/2024', statusColor: 'yellow' },
    { id: 'TRX-004', pembeli: 'PT Grow Garden', komoditas: 'Singkong', jumlah: '500 kg', total: 'Rp 2.500.000', status: 'Dibatalkan', tanggal: '05/03/2024', statusColor: 'red' },
  ]);

  const getStatusIcon = (status: string) => {
    if (status === 'Selesai') return <HiCheckCircle />;
    if (status === 'Diproses') return <HiClock />;
    return <HiXCircle />;
  };

  const getStatusStyle = (statusColor: string) => {
    switch (statusColor) {
      case 'green': return { background: '#dcfce7', color: '#15803d' };
      case 'yellow': return { background: '#fef3c7', color: '#d97706' };
      case 'red': return { background: '#fee2e2', color: '#dc2626' };
      default: return { background: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
      {/* ========== NAVBAR ========== */}
      <header style={{
        position: 'fixed', top: 0, zIndex: 50, width: '100%',
        padding: scrolled ? '0.75rem 1.5rem' : '0',
        transition: 'padding 0.3s',
      }}>
        <div style={{
          margin: '0 auto', maxWidth: 1280, background: '#fff',
          transition: 'all 0.3s',
          ...(scrolled
            ? { borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '0.75rem 1.5rem' }
            : { borderBottom: '1px solid #f3f4f6', padding: '1rem 2.5rem' }),
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => go('/petani/dashboard')}>
              <div style={{ width: 40, height: 40, background: '#15803d', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.25rem' }}>🌱</span>
              </div>
              <span style={{ fontSize: '1.875rem', fontWeight: 700, color: '#15803d' }}>NusaTani</span>
            </div>

            {/* Nav links */}
            <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => go('/petani/dashboard')} style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: isActive('/petani/dashboard') ? 700 : 500,
                color: isActive('/petani/dashboard') ? '#15803d' : '#4b5563',
                fontSize: '1.125rem',
              }}>
                <HiHome style={{ fontSize: '1.25rem' }} /> Beranda
              </button>
              <button onClick={() => go('/petani/marketplace')} style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: isActive('/petani/marketplace') ? 700 : 500,
                color: isActive('/petani/marketplace') ? '#15803d' : '#4b5563',
                fontSize: '1.125rem',
              }}>
                <HiShoppingBag style={{ fontSize: '1.25rem' }} /> Marketplace
              </button>
              <button onClick={() => go('/petani/chat')} style={{
                position: 'relative', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: isActive('/petani/chat') ? 700 : 500,
                color: isActive('/petani/chat') ? '#15803d' : '#4b5563',
                fontSize: '1.125rem',
              }}>
                <HiChatAlt2 style={{ fontSize: '1.25rem' }} /> Pesan
                <span style={{ position: 'absolute', top: -8, right: -14, background: '#ef4444', color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '9999px' }}>3</span>
              </button>
              <button onClick={() => go('/petani/transaksi')} style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: isActive('/petani/transaksi') ? 700 : 500,
                color: isActive('/petani/transaksi') ? '#15803d' : '#4b5563',
                fontSize: '1.125rem',
              }}>
                <HiDocumentText style={{ fontSize: '1.25rem' }} /> Transaksi
              </button>
              <button onClick={() => go('/petani/pembeli')} style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: isActive('/petani/pembeli') ? 700 : 500,
                color: isActive('/petani/pembeli') ? '#15803d' : '#4b5563',
                fontSize: '1.125rem',
              }}>
                <HiOutlineUserGroup style={{ fontSize: '1.25rem' }} /> Pembeli
              </button>
            </nav>

            {/* Right section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <button onClick={() => go('/petani/jual-panen')}
                style={{ background: '#16a34a', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
                onMouseOver={e => e.currentTarget.style.background = '#15803d'}
                onMouseOut={e => e.currentTarget.style.background = '#16a34a'}
              >
                <HiPlusCircle style={{ fontSize: '1.25rem' }} /> + Jual Panen
              </button>
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <HiBell style={{ fontSize: '1.5rem', color: '#6b7280' }} />
                <span style={{ position: 'absolute', top: -4, right: -4, width: 12, height: 12, background: '#ef4444', borderRadius: '50%' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <div onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ cursor: 'pointer', width: 44, height: 44, borderRadius: '50%', border: '4px solid #bbf7d0', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HiUserCircle style={{ color: '#16a34a', fontSize: '1.875rem' }} />
                </div>
                {showProfileMenu && (
                  <div style={{ position: 'absolute', top: '50px', right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '0.5rem 0', minWidth: '180px', zIndex: 60 }}>
                    <button onClick={() => { go('/petani/profil'); setShowProfileMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Profil Saya</button>
                    <button onClick={() => { go('/petani/pengaturan'); setShowProfileMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Pengaturan</button>
                    <hr style={{ margin: '0.25rem 0', borderColor: '#f3f4f6' }} />
                    <button onClick={() => router.push('/auth/logout')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444' }}>Keluar</button>
                  </div>
                )}
              </div>
              <HiChevronDown style={{ color: '#9ca3af', fontSize: '1.25rem', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main style={{ paddingTop: '7rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Tombol Kembali */}
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'transparent', border: 'none', color: '#15803d',
              fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
              marginBottom: '1.5rem', padding: '0.25rem 0',
            }}
          >
            <HiArrowLeft /> Kembali
          </button>

          {/* Card Transaksi */}
          <div style={{
            background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HiDocumentText style={{ color: '#15803d', fontSize: '2rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>Riwayat Transaksi</h1>
                  <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Daftar semua transaksi penjualan Anda</p>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                      {['ID', 'Tanggal', 'Pembeli', 'Komoditas', 'Jumlah', 'Total', 'Status'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#4b5563' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transaksi.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.12s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#fafafa'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{item.id}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.tanggal}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.pembeli}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.komoditas}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.jumlah}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#15803d' }}>{item.total}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                            ...getStatusStyle(item.statusColor),
                            padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                          }}>
                            {getStatusIcon(item.status)} {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========== FOOTER ========== */}
      <footer style={{ background: '#15803d', color: '#fff', textAlign: 'center', padding: '3.5rem 0', marginTop: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>🌱</span>
          </div>
          <span style={{ fontSize: '2.25rem', fontWeight: 700 }}>NusaTani</span>
        </div>
        <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mengubah Sisa Jadi Asa</p>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>© 2024 NusaTani. All rights reserved.</p>
      </footer>
    </div>
  );
}