'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import {
  HiUserAdd, HiCamera, HiThumbUp, HiCalendar, HiCreditCard,
  HiShieldCheck, HiShoppingBag, HiChatAlt2, HiTruck, HiCheckCircle,
  HiStar, HiArrowRight,
} from 'react-icons/hi';
import { Factory, Leaf } from 'lucide-react';

/* ─── Data ─── */
const farmerSteps = [
  { icon: HiUserAdd, title: 'Daftar & Login', desc: 'Buat akun sebagai petani dengan mudah. Cukup dengan email atau nomor telepon.', detail: 'Proses 2 menit', benefit: 'Gratis selamanya' },
  { icon: HiCamera, title: 'Upload Penawaran', desc: 'Foto dan deskripsikan hasil panen gagal Anda. Tim kami akan membantu verifikasi.', detail: 'Terverifikasi', benefit: 'Publikasi instan' },
  { icon: HiThumbUp, title: 'Terima Penawaran', desc: 'Lihat berbagai penawaran dari pengolah dan pilih yang terbaik untuk Anda.', detail: 'Bandingkan harga', benefit: 'Harga terbaik' },
  { icon: HiCalendar, title: 'Jadwalkan Penjemputan', desc: 'Atur waktu penjemputan yang sesuai dengan jadwal Anda.', detail: 'Fleksibel', benefit: 'Notifikasi realtime' },
  { icon: HiCreditCard, title: 'Dapatkan Pembayaran', desc: 'Dana akan langsung ditransfer setelah petugas kami melakukan penjemputan.', detail: 'Aman 100%', benefit: 'Cair instan' },
];

const processorSteps = [
  { icon: HiShieldCheck, title: 'Daftar & Verifikasi', desc: 'Verifikasi sebagai pengolah terdaftar. Kirim dokumen legal dan izin usaha.', detail: 'Verifikasi 1x24 jam', benefit: 'Terpercaya & legal' },
  { icon: HiShoppingBag, title: 'Jelajahi Marketplace', desc: 'Telusuri katalog panen gagal dari berbagai petani di seluruh Indonesia.', detail: 'Filter lengkap', benefit: 'Ribuan pilihan' },
  { icon: HiThumbUp, title: 'Beri Penawaran', desc: 'Tawar harga sesuai dengan kualitas dan kebutuhan produksi Anda.', detail: 'Bebas tawar', benefit: 'Negosiasi fleksibel' },
  { icon: HiChatAlt2, title: 'Negosiasi & Deal', desc: 'Gunakan fitur chat untuk negosiasi hingga mencapai kesepakatan.', detail: 'Chat terenkripsi', benefit: 'Komunikasi realtime' },
  { icon: HiTruck, title: 'Jadwalkan Pengambilan', desc: 'Atur logistik penjemputan dengan mitra transportasi kami.', detail: 'Tracking live', benefit: 'Logistik terintegrasi' },
];

export default function CaraKerjaPage() {
  const [tab, setTab] = useState<'petani' | 'pengolah'>('petani');
  const steps = tab === 'petani' ? farmerSteps : processorSteps;

  // Warna konsisten
  const primaryColor = '#16a34a';
  const primaryDark = '#15803d';
  const primaryLight = '#86efac';
  const gradientIcon = `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`;

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>

        {/* ── HERO dengan background gambar, teks hitam ── */}
        <section style={{
          backgroundImage: `url('/background/carakerja.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding: '9rem 1.5rem 5rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(0,0,0,0.08)',
              backdropFilter: 'blur(4px)',
              borderRadius: '9999px',
              padding: '0.4rem 1.1rem',
              marginBottom: '1.5rem',
            }}>
              <Leaf size={18} color="#1f2937" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Panduan Pengguna</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#000000',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
            }}>
              Bagaimana{' '}
              <span style={{ background: `linear-gradient(90deg, ${primaryLight}, ${primaryColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NusaTani
              </span>{' '}
              Bekerja?
            </h1>

            <p style={{ fontSize: '1.125rem', color: '#000000', maxWidth: 600, margin: '0 auto', fontWeight: 500 }}>
              Hubungkan petani dengan pengolah untuk mengurangi limbah panen gagal.
              Pilih peranmu dan ikuti langkah-langkah berikut.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem' }}>

          {/* Tab buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {([
              { key: 'petani', label: '🌾 Untuk Petani', Icon: Leaf },
              { key: 'pengolah', label: '🏭 Untuk Pengolah', Icon: Factory },
            ] as const).map(({ key, label, Icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 2rem', borderRadius: 16, border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: '1rem',
                    background: active ? primaryColor : '#fff',
                    color: active ? '#fff' : '#4b5563',
                    boxShadow: active ? `0 8px 20px ${primaryColor}66` : '0 2px 12px rgba(0,0,0,0.07)',
                    transform: active ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={20} color={active ? '#fff' : primaryColor} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Role description pill */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block',
              background: '#f0fdf4',
              border: `1px solid ${primaryLight}`,
              borderRadius: 16,
              padding: '0.875rem 2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <p style={{ color: '#374151', fontWeight: 500, fontSize: '0.975rem' }}>
                {tab === 'petani'
                  ? '🌾 Jual hasil panen gagal dengan mudah, dapatkan harga terbaik & pembayaran cepat'
                  : '🏭 Dapatkan bahan baku berkualitas dengan harga kompetitif & logistik terintegrasi'}
              </p>
            </div>
          </div>

          {/* Steps dengan panah antar card (desktop) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Card */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: '1.75rem 1.5rem 1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    position: 'relative',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    cursor: 'default',
                    width: '260px',
                    flexShrink: 0,
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: -16,
                    left: 16,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: primaryColor,
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${primaryColor}99`,
                  }}>
                    {i + 1}
                  </div>

                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 14,
                    background: gradientIcon,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    marginTop: '0.5rem',
                    boxShadow: `0 6px 16px ${primaryColor}66`,
                  }}>
                    <step.icon style={{ color: '#fff', fontSize: '1.75rem' }} />
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65, marginBottom: '0.875rem' }}>{step.desc}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: primaryColor, marginBottom: '0.625rem' }}>
                    <HiCheckCircle style={{ fontSize: '0.9rem', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{step.detail}</span>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: '#f0fdf4',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                  }}>
                    <HiStar style={{ color: '#eab308', fontSize: '0.8rem' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: primaryDark }}>{step.benefit}</span>
                  </div>
                </div>

                {/* Panah antar card, tidak muncul setelah card terakhir dan di mobile */}
                {i < steps.length - 1 && (
                  <div className="arrow-desktop" style={{ color: primaryColor, fontSize: '2rem' }}>
                    <HiArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Separator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
            <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, transparent, ${primaryLight}, ${primaryColor}, ${primaryLight}, transparent)`, borderRadius: 2 }} />
          </div>

          {/* CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #1f2937, #111827)',
            borderRadius: 28,
            padding: 'clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Siap Memulai?</h2>
            <p style={{ color: '#9ca3af', maxWidth: 520, margin: '0 auto 2rem' }}>
              Bergabung dengan ribuan petani &amp; pengolah yang telah menggunakan platform kami
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/register" style={{
                background: primaryColor,
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 12px ${primaryColor}99`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${primaryColor}cc`;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${primaryColor}99`;
                }}
              >
                Daftar Sekarang <HiArrowRight style={{ fontSize: '1.1rem' }} />
              </Link>
              <Link href="/" style={{
                border: '2px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* CSS untuk menyembunyikan panah di mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .arrow-desktop {
            display: none;
          }
        }
        @media (min-width: 769px) {
          .arrow-desktop {
            display: block;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}