'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiHome, HiShoppingBag, HiBell, HiChevronDown, HiChevronRight,
  HiCurrencyDollar, HiClipboardList, HiChatAlt2, HiCheckCircle,
  HiUserCircle, HiPlusCircle, HiMail, HiDocumentText,
} from 'react-icons/hi';

export default function DashboardPetani() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (path: string) => router.push(path);

  const menuItems = [
    { title: 'Jual Panen Baru', desc: 'Upload panen gagal Anda', icon: HiPlusCircle, iconBg: '#15803d', bg: '#f0fdf4', path: '/petani/jual-panen' },
    { title: 'Penawaran Saya', desc: 'Lihat status penawaran', icon: HiMail, iconBg: '#1d4ed8', bg: '#eff6ff', path: '/petani/penawaran' },
    { title: 'Pesan', desc: 'Chat dengan pembeli', icon: HiChatAlt2, iconBg: '#15803d', bg: '#f0fdf4', badge: '3 Baru', path: '/petani/chat' },
    { title: 'Riwayat Transaksi', desc: 'Lihat semua transaksi', icon: HiClipboardList, iconBg: '#7e22ce', bg: '#faf5ff', path: '/petani/transaksi' },
  ];

  const stats = [
    { icon: HiCurrencyDollar, value: 'Rp 0', label: 'Total Saldo', path: '/petani/laporan' },
    { icon: HiMail, value: '3', label: 'Penawaran Aktif', path: '/petani/penawaran' },
    { icon: HiClipboardList, value: '12', label: 'Transaksi Selesai', path: '/petani/transaksi' },
  ];

  const aktivitas = [
    { title: 'Penawaran Diterima!', desc: 'Pembeli: Bu Sinta • Untuk: 50kg Jagung Retak', time: 'Hari Ini, 08:30', status: 'Menunggu Konfirmasimu', icon: HiMail, path: '/petani/penawaran' },
    { title: 'Pesan Baru', desc: 'Dari: Toko Pakan Sejahtera', time: 'Hari Ini, 09:45', status: 'Lihat Pesan', icon: HiChatAlt2, path: '/petani/chat' },
    { title: 'Transaksi Selesai!', desc: 'Pembeli: Bapak Ahmad • Item: 100kg Tomat Grade B', time: 'Kemarin, 14:20', status: 'Dana Telah Ditransfer', icon: HiCheckCircle, path: '/petani/transaksi' },
    { title: 'Penawaran Baru Dikirim', desc: 'Kepada: Kelompok Tani Subur', time: 'Kemarin, 16:15', status: 'Menunggu Respon', icon: HiDocumentText, path: '/petani/penawaran' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>

      {/* ══════════ NAVBAR ══════════ */}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => go('/petani/dashboard')}>
              <div style={{ width: 40, height: 40, background: '#15803d', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.25rem' }}>🌱</span>
              </div>
              <span style={{ fontSize: '1.875rem', fontWeight: 700, color: '#15803d' }}>NusaTani</span>
            </div>

            {/* Nav links */}
            <nav style={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { label: 'Beranda', icon: HiHome, path: '/petani/dashboard' },
                { label: 'Marketplace', icon: HiShoppingBag, path: '/petani/marketplace' },
              ].map(item => (
                <button key={item.path} onClick={() => go(item.path)} style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 600, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#22c55e')}
                  onMouseOut={e => (e.currentTarget.style.color = '#15803d')}
                >
                  <item.icon style={{ fontSize: '1.25rem' }} /> {item.label}
                </button>
              ))}
              {/* Chat with badge */}
              <button onClick={() => go('/petani/chat')} style={{ position: 'relative', background: 'none', border: 'none', color: '#15803d', fontWeight: 600, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HiChatAlt2 style={{ fontSize: '1.25rem' }} /> Pesan
                <span style={{ position: 'absolute', top: -8, right: -14, background: '#ef4444', color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '9999px' }}>3</span>
              </button>
            </nav>

            {/* Right section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <button onClick={() => go('/petani/jual-panen')}
                style={{ background: '#16a34a', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', transition: 'background 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.background = '#15803d')}
                onMouseOut={e => (e.currentTarget.style.background = '#16a34a')}
              >
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
      <main style={{ paddingTop: '8rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>

          {/* HERO */}
          <section style={{ background: '#cffafe', borderRadius: 24, padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#15803d', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Selamat pagi, Cak Eko! 👨‍🌾
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#15803d', maxWidth: 768, lineHeight: 1.625 }}>
              Mari ubah panen gagal jadi penghasilan tambahan.<br />Mulai jual hasil panen Anda sekarang!
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
              {stats.map((stat, idx) => (
                <div key={idx} onClick={() => go(stat.path)}
                  style={{ background: '#15803d', borderRadius: 16, padding: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#166534')}
                  onMouseOut={e => (e.currentTarget.style.background = '#15803d')}
                >
                  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <stat.icon style={{ fontSize: '1.875rem', color: '#fff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{stat.label}</p>
                    <h3 style={{ fontSize: '1.875rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MENU UTAMA */}
          <section style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Menu Utama</h2>
              <button onClick={() => go('/petani/laporan')} style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 700, fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Lihat Semua <HiChevronRight style={{ fontSize: '1.25rem' }} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {menuItems.map((item, i) => (
                <div key={i} onClick={() => go(item.path)}
                  style={{ background: item.bg, borderRadius: 24, padding: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: item.iconBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon style={{ fontSize: '1.875rem' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h3>
                      <p style={{ color: '#4b5563', fontSize: '1.125rem' }}>{item.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                    {item.badge && (
                      <span style={{ background: '#ef4444', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                        {item.badge}
                      </span>
                    )}
                    <HiChevronRight style={{ fontSize: '1.875rem', color: '#9ca3af' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AKTIVITAS TERBARU */}
          <section style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Aktifitas Terbaru</h2>
              <button onClick={() => go('/petani/laporan')} style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 700, fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Lihat Semua <HiChevronRight style={{ fontSize: '1.25rem' }} />
              </button>
            </div>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Semua', 'Penawaran', 'Transaksi', 'Pesan'].map((t, i) => (
                <button key={i} style={{ background: i === 0 ? '#15803d' : '#f3f4f6', color: i === 0 ? '#fff' : '#1f2937', padding: '0.5rem 1.25rem', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '1rem', transition: 'background 0.2s' }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {aktivitas.map((item, i) => (
                <div key={i} onClick={() => go(item.path)}
                  style={{ background: '#f9fafb', borderRadius: 24, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#f3f4f6')}
                  onMouseOut={e => (e.currentTarget.style.background = '#f9fafb')}
                >
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon style={{ color: '#16a34a', fontSize: '1.5rem' }} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                      <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{item.desc}</p>
                      <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{item.time}</span>
                    </div>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER */}
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
      </main>
    </div>
  );
}