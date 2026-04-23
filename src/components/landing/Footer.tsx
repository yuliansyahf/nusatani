'use client';

import Link from 'next/link';
import { MessageCircle, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#1C5427', // ← diubah dari var(--nt-green-dark)
      color: 'rgba(255,255,255,0.85)',
    }}>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 2.5rem;
          }
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
          }
          @media (max-width: 480px) {
            .footer-grid {
              gap: 1.5rem;
            }
          }
        `}</style>
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img
                src="/asset/nusatanii.svg"
                alt="NusaTani Logo"
                style={{ height: 36, width: 'auto' }}
              />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 300 }}>
              Platform digital yang menghubungkan petani dengan industri pengolahan untuk
              mengurangi pemborosan hasil panen dan meningkatkan kesejahteraan petani Indonesia.
            </p>
            <a
              href="https://wa.me/628123456789?text=Halo%20NusaTani%2C%20saya%20ingin%20bertanya%20lebih%20lanjut"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '1.25rem', background: '#25D366', color: '#fff',
                padding: '0.5rem 1rem', borderRadius: 8, textDecoration: 'none',
                fontWeight: 600, fontSize: '0.85rem'
              }}
            >
              <MessageCircle size={16} /> Chat WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 700, color: '#fff', marginBottom: '1rem', fontSize: '0.9rem' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/auth/register?role=petani', label: 'Untuk Petani' },
                { href: '/auth/register?role=pengolah', label: 'Untuk Pengolah' },
                { href: '/auth/login', label: 'Masuk Akun' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.15s' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 700, color: '#fff', marginBottom: '1rem', fontSize: '0.9rem' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '#', label: 'Kebijakan Privasi' },
                { href: '#', label: 'Syarat & Ketentuan' },
              ].map(l => (
                <a key={l.label} href={l.href}
                  style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.15s' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {l.label}
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                <Shield size={13} /> Transaksi Aman & Terpercaya
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2.5rem',
          paddingTop: '1.5rem', textAlign: 'center',
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)'
        }}>
          © 2025 NusaTani. Mengubah Sisa Jadi Asa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}