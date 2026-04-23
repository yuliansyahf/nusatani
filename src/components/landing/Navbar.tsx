'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: scrolled ? '1rem' : '0',
          left: scrolled ? '50%' : '0',
          transform: scrolled ? 'translateX(-50%)' : 'translate(0, 0)',
          width: scrolled ? 'min(calc(100% - 2rem), 1200px)' : '100%',
          height: scrolled ? '64px' : '72px', // ← tinggi navbar dikunci
          padding: scrolled ? '0 1.5rem' : '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.1)' : 'none',
          borderRadius: scrolled ? '100px' : '0',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Logo Section */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', height: '100%', transition: 'opacity 0.2s ease' }}
          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'; }}
          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
        >
          {/*
            - height: 100% → mengikuti tinggi navbar yang sudah dikunci
            - width: 180px → lebar bebas agar SVG landscape bisa terbaca
            - position: relative wajib ada untuk Next.js Image dengan fill
          */}
          <div style={{ position: 'relative', width: 180, height: '100%' }}>
            <Image
              src="/asset/nusatani.svg"
              alt="NusaTani Logo"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left center', transition: 'filter 0.2s ease' }}
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-links">
          {[
            { label: 'Beranda', href: '/' },
            { label: 'Cara Kerja', href: '/cara-kerja' },
            { label: 'Pengembang', href: '/pengembang' },
            { label: 'Hubungi Kami', href: '/hubungi-kami' },
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`nav-link${scrolled ? ' nav-link--scrolled' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="desktop-actions">
          <Link
            href="/auth/login"
            style={{
              background: scrolled ? 'var(--nt-green)' : '#20683F',
              color: '#fff',
              padding: '0.625rem 1.5rem',
              borderRadius: '100px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: scrolled ? '0 4px 12px rgba(42, 122, 59, 0.2)' : '0 4px 12px rgba(32,104,63,0.2)',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'var(--nt-green-dark)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = scrolled ? 'var(--nt-green)' : '#20683F';
            }}
          >
            Masuk/Daftar
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: scrolled ? 'var(--nt-text)' : '#20683F',
            cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nt-text)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {[
            { label: 'Beranda', href: '/' },
            { label: 'Cara Kerja', href: '/cara-kerja' },
            { label: 'Pengembang', href: '/pengembang' },
            { label: 'Hubungi Kami', href: '/hubungi-kami' },
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--nt-text)', textDecoration: 'none', fontWeight: 700, fontSize: '1.5rem' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'var(--nt-green)', color: '#fff', padding: '1rem 3rem',
              borderRadius: '100px', fontWeight: 700, fontSize: '1.25rem', marginTop: '1rem', textDecoration: 'none'
            }}
          >
            Masuk/Daftar
          </Link>
        </div>
      )}

      <style>{`
        /* ── Nav Link + Animated Underline ── */
        .nav-link {
          color: rgba(32, 104, 63, 0.9);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.2s ease;
        }
        .nav-link--scrolled {
          color: var(--nt-text);
        }

        /* Garis bawah: pseudo-element via box-shadow trick lewat ::after */
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: #1a5c34;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hover & Active: garis muncul dari kiri ke kanan */
        .nav-link:hover::after,
        .nav-link:active::after {
          transform: scaleX(1);
        }

        /* Warna teks berubah saat hover/active */
        .nav-link:hover,
        .nav-link:active {
          color: #1a5c34 !important;
        }

        @media (max-width: 768px) {
          .desktop-links, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}