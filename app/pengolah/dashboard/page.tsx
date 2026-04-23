'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { useAuth } from '@/contexts/AuthContext';
import {
  HiSearch, HiDocumentText, HiChatAlt2, HiClipboardList,
  HiOfficeBuilding, HiQuestionMarkCircle, HiMail,
  HiUserGroup, HiTruck, HiClipboard, HiChevronLeft, HiChevronRight,
} from 'react-icons/hi';

export default function PengolahDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  const companyName = 'PT Grow Garden';

  const scrollMenu = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  const menuItems = [
    { name: 'Cari Bahan Baku', icon: HiSearch, description: 'Temukan komoditas', path: '/pengolah/cari-bahan' },
    { name: 'Penawaran Saya', icon: HiDocumentText, description: 'Penawaran Aktif', path: '/pengolah/penawaran' },
    { name: 'Chat', icon: HiChatAlt2, description: 'Chat dengan petani', path: '/pengolah/chat' },
    { name: 'Pesanan Aktif', icon: HiClipboardList, description: 'Pesanan berjalan', path: '/pengolah/pesanan' },
    { name: 'Profil', icon: HiOfficeBuilding, description: 'Data perusahaan', path: '/pengolah/profil' },
    { name: 'Bantuan', icon: HiQuestionMarkCircle, description: 'Pusat solusi', path: '/pengolah/bantuan' },
  ];

  const stats = [
    { icon: HiMail, value: 5, label: 'Penawaran Dikirim', path: '/pengolah/penawaran' },
    { icon: HiUserGroup, value: 8, label: 'Deal Berhasil', path: '/pengolah/deal' },
    { icon: HiTruck, value: 3, label: 'Supplier Aktif', path: '/pengolah/supplier' },
    { icon: HiClipboard, value: 4, label: 'Pesanan Aktif', path: '/pengolah/pesanan' },
  ];

  const aktivitas = [
    { label: 'Penawaran dikirim ke Petani Darman', sub: 'Bahan Baku Singkong 500kg – Rp 2.500.000', time: 'Hari ini, 07:55', icon: HiDocumentText },
    { label: 'Deal berhasil dengan Kel. Tani Stecu', sub: 'Menawarkan jahe merah 80kg – harga nego', time: 'Hari ini, 05:28', icon: HiUserGroup },
    { label: 'Penawaran diterima untuk komoditas jagung', sub: 'Harga disepakati – Rp 4.200/kg', time: 'Hari ini, 00:57', icon: HiMail },
    { label: 'Pesanan aktif #NT-2305', sub: 'Pengiriman beras medium – estimasi tiba besok', time: 'Kemarin, 16:55', icon: HiClipboard, warning: 'Keterangan: 16:55' },
  ];

  const chats = [
    { name: 'Dikel. Nadi Pasar "Segar"', msg: 'Selamat pagi, pak. Untuk punya banyak kredisi...', time: 'Hari ini', rate: 86, online: true },
    { name: 'Petani Binaan Lestari', msg: 'Kami ada panen pisang kepok 300kg, harga kompetitif', time: 'Hari ini', rate: 74, online: false },
    { name: 'Gabungan Tani Sejahtera', msg: 'Bisa kirim sampai jahe merah? butuh 150kg', time: 'Kemarin', rate: 92, online: false },
  ];

  const pesanan = [
    { id: 'PO-2401', petani: 'Petani Darman', komoditas: 'Singkong', jumlah: '500 kg', total: 'Rp 2.500.000', status: 'Dikirim', statusClass: 'bg-yellow-100 text-yellow-700', estimasi: '2 hari lagi' },
    { id: 'PO-2402', petani: 'Kel. Tani Makmur', komoditas: 'Jagung', jumlah: '1.000 kg', total: 'Rp 4.200.000', status: 'Dalam Perjalanan', statusClass: 'bg-blue-100 text-blue-700', estimasi: 'Besok tiba' },
    { id: 'PO-2403', petani: 'Gabungan Tani Sejahtera', komoditas: 'Kedelai', jumlah: '200 kg', total: 'Rp 1.600.000', status: 'Menunggu Pembayaran', statusClass: 'bg-purple-100 text-purple-700', estimasi: 'Menunggu konfirmasi' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Dashboard" />

        {/* ─── No padding wrapper so hero is edge-to-edge ─── */}
        <div>

          {/* ══════════════════════════════════════
              HERO BANNER — full width, bgpengolah.png
          ══════════════════════════════════════ */}
          <div
            onClick={() => router.push('/pengolah/dashboard')}
            style={{
              backgroundImage: "url('/background/bgpengolah1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
              minHeight: 500,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Text content — top left */}
            <div style={{ padding: '1.75rem 2rem 0', maxWidth: '52%' }}>
              <h1
                style={{
                  fontSize: 'clamp(4rem, 3.5vw, 2.6rem)',
                  fontWeight: 900,
                  color: '#1a5c28',
                  lineHeight: 1.15,
                  marginBottom: '0.5rem',
                  marginLeft: '5rem',
                  marginTop: '5rem',

                }}
              >
                Selamat Datang,<br />
                {companyName}
              </h1>
              <p style={{ color: '#3a6e47', fontSize: '0.875rem', lineHeight: 1.5, marginLeft: '5rem' }}>
                Kelola hasil panen mitra &amp; pantau pengiriman dengan lebih mudah dan efisien
              </p>
            </div>

            {/* Stats cards — bottom, full width */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
                padding: '0 6.5rem 5rem',
              }}
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  onClick={e => { e.stopPropagation(); router.push(stat.path); }}
                  style={{
                    background: '#2d6a3f',
                    borderRadius: 15,
                    padding: '0.875rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background 0.2s',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = '#1a5c28')}
                  onMouseOut={e => (e.currentTarget.style.background = '#2d6a3f')}
                >
                  {/* Icon box */}
                  <div style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: 'rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <stat.icon style={{ color: '#fff', fontSize: '1.15rem' }} />
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1 }}>
                      {stat.value}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.7rem', marginTop: '0.18rem' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════
              CONTENT BELOW HERO — with padding
          ══════════════════════════════════════ */}
          <div className="page-content">

            {/* MENU UTAMA */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a2e1c' }}>Menu Utama</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => scrollMenu('left')}
                    style={{ width: 38, height: 38, borderRadius: 10, border: '1.5px solid #e0e0e0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                  >
                    <HiChevronLeft style={{ color: '#888', fontSize: '1.1rem' }} />
                  </button>
                  <button
                    onClick={() => scrollMenu('right')}
                    style={{ width: 38, height: 38, borderRadius: 10, border: 'none', background: '#2a7a3b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(42,122,59,0.35)' }}
                  >
                    <HiChevronRight style={{ color: '#fff', fontSize: '1.1rem' }} />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}
              >
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(item.path)}
                    style={{
                      minWidth: 210,
                      background: '#fff',
                      border: '1px solid #eee',
                      borderRadius: 16,
                      padding: '1.25rem 1.25rem 1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    }}
                    onMouseOver={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: '#e8f5eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                      <item.icon style={{ color: '#2a7a3b', fontSize: '1.4rem' }} />
                    </div>
                    <p style={{ fontWeight: 700, color: '#1a2e1c', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.name}</p>
                    <p style={{ color: '#8a9e8d', fontSize: '0.8rem' }}>{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* AKTIVITAS + CHAT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>

              {/* Aktivitas Terbaru */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a2e1c', display: 'flex', alignItems: 'center', gap: 6 }}>
                    🗂️ Aktivitas Terbaru
                  </span>
                  <button onClick={() => router.push('/pengolah/laporan')} style={{ background: 'none', border: 'none', color: '#2a7a3b', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Lihat Semua</button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1.25rem', padding: '0 1.25rem', borderBottom: '1px solid #f0f0f0' }}>
                  {['Semua', 'Penawaran', 'Transaksi', 'Pesan'].map((t, i) => (
                    <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#2a7a3b' : '#aaa', fontSize: '0.82rem', padding: '0.75rem 0', borderBottom: i === 0 ? '2px solid #2a7a3b' : '2px solid transparent', transition: '0.15s' }}>
                      {t}
                    </button>
                  ))}
                </div>

                {aktivitas.map((a, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', gap: '0.875rem', padding: '0.875rem 1.25rem', borderBottom: i < aktivitas.length - 1 ? '1px solid #f7f7f7' : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseOver={e => (e.currentTarget.style.background = '#f8fdf8')}
                    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e8f5eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <a.icon style={{ color: '#2a7a3b', fontSize: '1rem' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a2e1c' }}>{a.label}</p>
                      <p style={{ fontSize: '0.76rem', color: '#8a9e8d', marginTop: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.sub}</p>
                      {a.warning && <p style={{ fontSize: '0.74rem', color: '#e07a22', fontWeight: 600, marginTop: '0.15rem' }}>{a.warning}</p>}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#bbb', flexShrink: 0, whiteSpace: 'nowrap', paddingTop: 2 }}>{a.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a2e1c', display: 'flex', alignItems: 'center', gap: 6 }}>
                    💬 Chat
                  </span>
                  <button onClick={() => router.push('/pengolah/chat')} style={{ background: 'none', border: 'none', color: '#2a7a3b', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Lihat Semua</button>
                </div>

                {/* Info tooltip */}
                <div style={{ padding: '0.6rem 1.25rem', background: '#f0f7f2', borderBottom: '1px solid #d9eed4' }}>
                  <p style={{ fontSize: '0.76rem', color: '#2a7a3b', fontWeight: 500 }}>
                    💙 <strong>Apa arti persentase?</strong> = Response Rate (tingkat balasan pesan dari petani)
                  </p>
                </div>

                {chats.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => router.push('/pengolah/chat')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.25rem', borderBottom: i < chats.length - 1 ? '1px solid #f7f7f7' : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseOver={e => (e.currentTarget.style.background = '#f8fdf8')}
                    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2a7a3b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                        {c.name[0]}
                      </div>
                      {c.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '2px solid #fff' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1a2e1c' }}>{c.name}</p>
                      <p style={{ fontSize: '0.76rem', color: '#8a9e8d', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.15rem' }}>{c.msg}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: '0.7rem', color: '#bbb', marginBottom: '0.3rem' }}>{c.time}</p>
                      <span style={{ background: '#e8f5eb', color: '#1a5c28', fontWeight: 700, fontSize: '0.73rem', padding: '0.15rem 0.55rem', borderRadius: 100 }}>{c.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PESANAN AKTIF TABLE */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a2e1c', display: 'flex', alignItems: 'center', gap: 6 }}>
                  🔴 Pesanan Aktif
                </span>
                <button onClick={() => router.push('/pengolah/pesanan')} style={{ background: 'none', border: 'none', color: '#2a7a3b', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Lihat Semua</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#fafafa' }}>
                      {['ID', 'Petani', 'Komoditas', 'Jumlah', 'Total', 'Status', 'Estimasi'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#8a9e8d', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pesanan.map((p, i) => (
                      <tr
                        key={i}
                        onClick={() => router.push('/pengolah/pesanan')}
                        style={{ borderBottom: i < pesanan.length - 1 ? '1px solid #f7f7f7' : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseOver={e => (e.currentTarget.style.background = '#f8fdf8')}
                        onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '0.875rem 1.25rem', fontWeight: 700, color: '#2a7a3b', fontFamily: 'monospace' }}>{p.id}</td>
                        <td style={{ padding: '0.875rem 1.25rem', color: '#1a2e1c' }}>{p.petani}</td>
                        <td style={{ padding: '0.875rem 1.25rem', color: '#4a5568' }}>{p.komoditas}</td>
                        <td style={{ padding: '0.875rem 1.25rem', color: '#4a5568' }}>{p.jumlah}</td>
                        <td style={{ padding: '0.875rem 1.25rem', fontWeight: 600, color: '#1a2e1c' }}>{p.total}</td>
                        <td style={{ padding: '0.875rem 1.25rem' }}>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${p.statusClass}`}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.875rem 1.25rem', color: '#8a9e8d' }}>{p.estimasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}