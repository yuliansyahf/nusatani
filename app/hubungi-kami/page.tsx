'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import {
  HiLocationMarker, HiPhone, HiMail, HiClock,
  HiPaperAirplane, HiCheckCircle, HiUser, HiChatAlt2,
  HiOfficeBuilding, HiGlobe, HiChevronDown,
} from 'react-icons/hi';
import { Leaf, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

/* ─── Data ─── */
const contactInfo = [
  {
    icon: HiLocationMarker,
    title: 'Kunjungi Kami',
    details: ['Jl. Pertanian Raya No. 123', 'Kelapa Gading, Jakarta Utara', 'DKI Jakarta 14240'],
  },
  {
    icon: HiPhone,
    title: 'Hubungi Kami',
    details: ['+62 812 3456 7890', '+62 21 1234 5678', 'Senin - Jumat, 08:00 - 17:00'],
  },
  {
    icon: HiMail,
    title: 'Email Kami',
    details: ['info@nusatani.com', 'support@nusatani.com', 'kerjasama@nusatani.com'],
  },
  {
    icon: HiClock,
    title: 'Jam Operasional',
    details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 08:00 - 12:00', 'Minggu: Tutup'],
  },
];

const socialLinks = [
  { label: 'Facebook', url: '#', bg: '#1877f2', emoji: '📘' },
  { label: 'Instagram', url: '#', bg: '#dd2a7b', emoji: '📷' },
  { label: 'Twitter', url: '#', bg: '#1da1f2', emoji: '🐦' },
  { label: 'YouTube', url: '#', bg: '#ff0000', emoji: '▶️' },
];

const faqs = [
  { q: 'Bagaimana cara mendaftar sebagai petani?', a: 'Anda dapat mendaftar melalui halaman pendaftaran dengan mengisi data diri dan verifikasi nomor telepon. Prosesnya cepat dan gratis.' },
  { q: 'Apakah ada biaya untuk menggunakan NusaTani?', a: 'Pendaftaran gratis! Kami hanya mengambil komisi kecil dari transaksi yang berhasil untuk menjaga operasional platform.' },
  { q: 'Berapa lama proses verifikasi?', a: 'Verifikasi dokumen membutuhkan waktu 1x24 jam pada hari kerja. Anda akan mendapat notifikasi via email/WA.' },
  { q: 'Bagaimana sistem pembayaran?', a: 'Pembayaran dilakukan melalui transfer bank setelah barang dijemput dan diverifikasi oleh tim kami. Dana akan cair dalam 1x24 jam.' },
];

export default function HubungiKamiPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  // Warna konsisten
  const primaryColor = '#16a34a';
  const primaryDark = '#15803d';
  const primaryLight = '#86efac';
  const gradientIcon = `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
    border: '2px solid #e5e7eb', borderRadius: 12,
    fontSize: '0.95rem', outline: 'none', background: '#f9fafb',
    transition: 'border-color 0.2s, background 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>

        {/* ── HERO dengan background gambar (sama seperti cara kerja) ── */}
        <section style={{
          backgroundImage: `url('/background/carakerja.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding: '9rem 1.5rem 5.5rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* Overlay transparan (tidak mengganggu) */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '0%',
            height: '0%',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            zIndex: 1,
          }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto' }}>
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
              <MessageCircle size={16} color="#1f2937" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Hubungi Kami</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 900,
              color: '#000000',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}>
              Kami Siap{' '}
              <span style={{ background: 'linear-gradient(90deg, #86efac, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Membantu
              </span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#000000', maxWidth: 560, margin: '0 auto', fontWeight: 500 }}>
              Punya pertanyaan atau butuh bantuan? Tim kami siap memberikan solusi terbaik untuk Anda melalui berbagai channel berikut.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem' }}>

          {/* ── INFO CARDS (semua gradien hijau) ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {contactInfo.map((item, i) => (
              <div key={i}
                style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.11)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: gradientIcon, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: `0 6px 16px ${primaryColor}66` }}>
                  <item.icon style={{ color: '#fff', fontSize: '1.5rem' }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.625rem' }}>{item.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {item.details.map((d, j) => (
                    <p key={j} style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>{d}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── FORM + SIDEBAR ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3.5rem', alignItems: 'start' }}>

            {/* Contact Form */}
            <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg,#f0fdf4,#ecfdf5)', padding: '1.5rem 2rem', borderBottom: `1px solid ${primaryLight}` }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Sparkles size={20} color={primaryColor} /> Kirim Pesan
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Tim kami akan merespon dalam 1×24 jam</p>
              </div>

              <div style={{ padding: '2rem' }}>
                {submitted && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f0fdf4', border: `1px solid ${primaryLight}`, borderRadius: 12, padding: '0.875rem 1rem', marginBottom: '1.5rem' }}>
                    <HiCheckCircle style={{ color: primaryColor, fontSize: '1.25rem', flexShrink: 0 }} />
                    <p style={{ color: primaryDark, fontWeight: 600, fontSize: '0.9rem' }}>Pesan berhasil dikirim! Kami akan segera menghubungi Anda.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.375rem' }}>
                        Nama Lengkap <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <HiUser style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.1rem', pointerEvents: 'none' }} />
                        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Nama lengkap" style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.background = '#fff'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.375rem' }}>
                        Email <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <HiMail style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.1rem', pointerEvents: 'none' }} />
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.background = '#fff'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.375rem' }}>Nomor Telepon</label>
                      <div style={{ position: 'relative' }}>
                        <HiPhone style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.1rem', pointerEvents: 'none' }} />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+62 812 3456 7890" style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.background = '#fff'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.375rem' }}>
                        Subjek <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <HiOfficeBuilding style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.1rem', pointerEvents: 'none', zIndex: 1 }} />
                        <select name="subject" required value={form.subject} onChange={handleChange}
                          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                          onFocus={e => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.background = '#fff'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                        >
                          <option value="">Pilih subjek</option>
                          <option value="Pendaftaran">Pendaftaran Akun</option>
                          <option value="Bantuan Teknis">Bantuan Teknis</option>
                          <option value="Kerjasama">Kerjasama</option>
                          <option value="Keluhan">Keluhan</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.375rem' }}>
                      Pesan <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tulis pesan Anda di sini..."
                      style={{ ...inputStyle, padding: '0.75rem 1rem', resize: 'none' }}
                      onFocus={e => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                    />
                  </div>

                  <button type="submit" disabled={loading}
                    style={{ width: '100%', padding: '0.9rem', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '1rem', background: loading ? primaryLight : `linear-gradient(135deg,${primaryColor},${primaryDark})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'opacity 0.2s, transform 0.2s', boxShadow: `0 4px 16px ${primaryColor}99` }}
                    onMouseOver={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'none'; }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan <HiPaperAirplane style={{ fontSize: '1rem', transform: 'rotate(90deg)' }} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Map */}
              <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg,#f0fdf4,#ecfdf5)', padding: '1rem 1.5rem', borderBottom: `1px solid ${primaryLight}`, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HiLocationMarker style={{ color: primaryColor, fontSize: '1.2rem' }} />
                  <span style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.95rem' }}>Lokasi Kantor Kami</span>
                </div>
                <div style={{ height: 220, overflow: 'hidden' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.828442!3d-6.207231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"
                    width="100%" height="100%" style={{ border: 0, display: 'block' }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="NusaTani Location"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <HiGlobe style={{ color: primaryColor, fontSize: '1.25rem' }} />
                  <span style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.95rem' }}>Ikuti Kami</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {socialLinks.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ background: s.bg, color: '#fff', borderRadius: 12, padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; }}
                    >
                      <span>{s.emoji}</span> {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* 24/7 Support card dengan gradien hijau */}
              <div style={{ background: `linear-gradient(135deg,${primaryColor},${primaryDark})`, borderRadius: 20, padding: '1.5rem', boxShadow: `0 8px 24px ${primaryColor}99` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HiChatAlt2 style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1rem', marginBottom: '0.375rem' }}>Dukungan 24/7</h4>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                      Tim kami siap membantu kapan saja. Hubungi hotline di{' '}
                      <strong style={{ color: '#fde047' }}>+62 812 3456 7890</strong> untuk bantuan darurat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: '3.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg,#f0fdf4,#ecfdf5)', padding: '1.5rem 2rem', borderBottom: `1px solid ${primaryLight}`, textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: 0 }}>
                <Sparkles size={20} color={primaryColor} /> Pertanyaan yang Sering Diajukan
              </h2>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Temukan jawaban cepat untuk pertanyaan umum</p>
            </div>

            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#f9fafb')}
                  onMouseOut={e => (e.currentTarget.style.background = 'none')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: '#1f2937', fontSize: '0.975rem' }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: primaryColor, flexShrink: 0 }}>Q</span>
                    {faq.q}
                  </span>
                  <HiChevronDown style={{ color: '#9ca3af', fontSize: '1.25rem', transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 2rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: primaryColor, flexShrink: 0, marginTop: '0.1rem' }}>A</span>
                    <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.9rem' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={{ background: 'linear-gradient(135deg,#111827,#1f2937)', borderRadius: 28, padding: 'clamp(2rem,5vw,3rem)', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: 'clamp(1.25rem,2.5vw,1.875rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Butuh Bantuan Lebih Lanjut?</h2>
            <p style={{ color: '#9ca3af', maxWidth: 520, margin: '0 auto 2rem' }}>
              Tim kami siap membantu Anda. Jangan ragu untuk menghubungi kami atau konsultasi gratis.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/register" style={{
                background: `linear-gradient(135deg,${primaryColor},${primaryDark})`, color: '#fff',
                padding: '0.875rem 2rem', borderRadius: '9999px', fontWeight: 700,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: `0 4px 16px ${primaryColor}99`, transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${primaryColor}cc`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 16px ${primaryColor}99`; }}
              >
                Konsultasi Gratis <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/6281233345153" target="_blank" rel="noopener noreferrer" style={{
                border: '2px solid rgba(255,255,255,0.25)', color: '#fff',
                padding: '0.875rem 2rem', borderRadius: '9999px', fontWeight: 700,
                textDecoration: 'none', transition: 'background 0.2s',
              }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>

      <Footer />
    </>
  );
}