'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiHome, HiShoppingBag, HiBell, HiChevronDown, HiArrowLeft,
  HiChartBar, HiDocumentDownload, HiChatAlt2, HiUserCircle, HiPlusCircle,
} from 'react-icons/hi';

export default function LaporanPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [bulan, setBulan] = useState('Januari 2024');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (path: string) => router.push(path);

  const dataLaporan = [
    { tanggal: '01/04/2024', id: '#TRX-001', pembeli: 'Bu Sinta', komoditas: 'Jagung', jumlah: '50 kg', total: 'Rp 200.000' },
    { tanggal: '15/03/2024', id: '#TRX-002', pembeli: 'Bapak Ahmad', komoditas: 'Tomat', jumlah: '100 kg', total: 'Rp 500.000' },
    { tanggal: '10/03/2024', id: '#TRX-003', pembeli: 'Toko Pakan', komoditas: 'Kedelai', jumlah: '100 kg', total: 'Rp 800.000' },
  ];

  const totalPendapatan = dataLaporan.reduce((sum, item) => {
    const angka = parseInt(item.total.replace(/[^0-9]/g, '')) || 0;
    return sum + angka;
  }, 0);
  const formattedTotal = `Rp ${totalPendapatan.toLocaleString('id-ID')}`;

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>

      {/* ══════════ NAVBAR (sama seperti dashboard petani) ══════════ */}
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
            <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              <button onClick={() => go('/petani/dashboard')} style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 600, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HiHome style={{ fontSize: '1.25rem' }} /> Beranda
              </button>
              <button onClick={() => go('/petani/marketplace')} style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 600, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HiShoppingBag style={{ fontSize: '1.25rem' }} /> Marketplace
              </button>
              <button onClick={() => go('/petani/chat')} style={{ position: 'relative', background: 'none', border: 'none', color: '#15803d', fontWeight: 600, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HiChatAlt2 style={{ fontSize: '1.25rem' }} /> Pesan
                <span style={{ position: 'absolute', top: -8, right: -14, background: '#ef4444', color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '9999px' }}>3</span>
              </button>
            </nav>

            {/* Right section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <button onClick={() => go('/petani/jual-panen')}
                style={{ background: '#16a34a', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <HiPlusCircle style={{ fontSize: '1.25rem' }} /> + Jual Panen
              </button>
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <HiBell style={{ fontSize: '1.5rem', color: '#6b7280' }} />
                <span style={{ position: 'absolute', top: -4, right: -4, width: 12, height: 12, background: '#ef4444', borderRadius: '50%', display: 'block' }} />
              </div>
              <div onClick={() => go('/petani/profil')} style={{ cursor: 'pointer', width: 44, height: 44, borderRadius: '50%', border: '4px solid #bbf7d0', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HiUserCircle style={{ color: '#16a34a', fontSize: '1.875rem' }} />
              </div>
              <HiChevronDown style={{ color: '#9ca3af', fontSize: '1.25rem' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ MAIN CONTENT ══════════ */}
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

          {/* Card Laporan */}
          <div style={{
            background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HiChartBar style={{ color: '#15803d', fontSize: '2rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>Laporan Penjualan</h1>
                  <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Ringkasan transaksi penjualan panen Anda</p>
                </div>
              </div>

              {/* Filter & Export */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <select
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  style={{
                    padding: '0.6rem 1rem', border: '1px solid #d1d5db', borderRadius: 12,
                    fontSize: '0.9rem', background: '#fff', cursor: 'pointer',
                    outline: 'none', transition: 'border 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#15803d'}
                  onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                >
                  <option>Januari 2024</option><option>Februari 2024</option><option>Maret 2024</option><option>April 2024</option>
                </select>
                <button
                  onClick={() => alert('Fitur export PDF akan segera hadir')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: '#15803d', color: '#fff', padding: '0.6rem 1.2rem',
                    borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#166534'}
                  onMouseOut={e => e.currentTarget.style.background = '#15803d'}
                >
                  <HiDocumentDownload /> Export PDF
                </button>
              </div>

              {/* Tabel Laporan */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                      {['Tanggal', 'ID', 'Pembeli', 'Komoditas', 'Jumlah', 'Total'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#4b5563' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataLaporan.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.12s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#fafafa'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '0.75rem 1rem' }}>{item.tanggal}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{item.id}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.pembeli}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.komoditas}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{item.jumlah}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#15803d' }}>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Pendapatan */}
              <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', background: '#dcfce7', borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span style={{ fontWeight: 500, color: '#166534' }}>Total Pendapatan</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#15803d' }}>{formattedTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ══════════ FOOTER ══════════ */}
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