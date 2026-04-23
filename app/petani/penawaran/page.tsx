'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiHome, HiShoppingBag, HiBell, HiChevronDown, HiArrowLeft,
  HiDocumentText, HiChatAlt2, HiUserCircle, HiPlusCircle,
} from 'react-icons/hi';

export default function PenawaranPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (path: string) => router.push(path);

  const penawaran = [
    { id: 1, pembeli: 'Bu Sinta', komoditas: 'Jagung Retak', jumlah: '50 kg', harga: 'Rp 4.000/kg', status: 'Menunggu', waktu: '08:30' },
    { id: 2, pembeli: 'Toko Pakan "Sejahtera"', komoditas: 'Kacang Kedelai', jumlah: '100 kg', harga: 'Rp 8.000/kg', status: 'Diterima', waktu: '09:45' },
    { id: 3, pembeli: 'Bapak Ahmad', komoditas: 'Tomat Grade B', jumlah: '100 kg', harga: 'Rp 5.000/kg', status: 'Selesai', waktu: '14:20' },
  ];

  const getStatusStyle = (status: string) => {
    if (status === 'Menunggu') return { background: '#fef3c7', color: '#d97706' };
    if (status === 'Diterima') return { background: '#dcfce7', color: '#15803d' };
    return { background: '#dbeafe', color: '#2563eb' };
  };

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

          {/* Card Penawaran */}
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
                  <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>Penawaran Aktif</h1>
                  <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Daftar penawaran yang masuk dari pembeli</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {penawaran.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/petani/penawaran/${item.id}`)}
                    style={{
                      display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
                      gap: '1rem', padding: '1rem 1.5rem', background: '#fff', borderRadius: 16,
                      border: '1px solid #f3f4f6', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
                  >
                    <div style={{ flex: '2', minWidth: '200px' }}>
                      <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1f2937', margin: 0 }}>{item.pembeli}</p>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {item.komoditas} - {item.jumlah} @ {item.harga}
                      </p>
                    </div>
                    <div style={{ minWidth: '100px', textAlign: 'right' }}>
                      <span style={{
                        background: getStatusStyle(item.status).background,
                        color: getStatusStyle(item.status).color,
                        padding: '0.25rem 0.75rem', borderRadius: '9999px',
                        fontSize: '0.75rem', fontWeight: 600, display: 'inline-block',
                      }}>
                        {item.status}
                      </span>
                      <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.5rem' }}>{item.waktu}</p>
                    </div>
                  </div>
                ))}
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