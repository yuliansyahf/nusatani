'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const steps = [
  {
    num: 1,
    title: 'Gabung dengan\nkami',
    color: '#e25968',
    img: '/asset/gabung.svg',
    href: '/auth/register',
    label: 'Daftar Sekarang →',
  },
  {
    num: 2,
    title: 'Coba sekarang',
    color: '#46a56e',
    img: '/asset/coba.svg',
    href: '/dashboard',
    label: 'Mulai Jelajahi →',
  },
  {
    num: 3,
    title: 'Deal dan Transaksi',
    color: '#febb43',
    img: '/asset/deal.svg',
    href: '/marketplace',
    label: 'Lihat Penawaran →',
  },
];

function StepCard({ s }: { s: typeof steps[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={s.href}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: s.color,
          borderRadius: '16px',
          padding: '1.5rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '320px',
          boxShadow: hovered
            ? '0 20px 40px rgba(0,0,0,0.18)'
            : '0 4px 6px rgba(0,0,0,0.05)',
          transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
          cursor: 'pointer',
        }}
      >
        {/* Number Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-1.5rem',
            left: '-1.5rem',
            width: 65,
            height: 65,
            borderRadius: '50% 50% 50% 12px',
            background: s.color,
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '-2px 4px 10px rgba(0,0,0,0.15)',
            transition: 'transform 0.25s ease',
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          {s.num}
        </div>

        {/* Image Container */}
        <div
          style={{
            flex: 1,
            background: '#fff',
            borderRadius: '12px',
            marginBottom: '1.25rem',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem',
            position: 'relative',
            minHeight: '180px',
            transition: 'box-shadow 0.25s ease',
            boxShadow: hovered ? `0 0 0 3px rgba(255,255,255,0.6)` : 'none',
          }}
        >
          <Image
            src={s.img}
            alt={s.title.replace('\n', ' ')}
            fill
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>

        {/* Bottom Label */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.7)',
            padding: '0.75rem',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            minHeight: '50px',
            background: hovered ? 'rgba(255,255,255,0.2)' : 'transparent',
            transition: 'background 0.2s ease',
          }}
        >
          {s.title}
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            {s.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function LangkahSection() {
  return (
    <section className="section" style={{ background: 'transparent', position: 'relative', zIndex: 10 }}>
      <style>{`
        .langkah-container {
          padding: 15rem 1.5rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .langkah-container { padding: 10rem 1.5rem 4rem; }
        }
        @media (max-width: 768px) {
          .langkah-container {
            padding: 4rem 1.25rem 3rem;
          }
          .langkah-header {
            margin-bottom: 3rem !important;
          }
          .step-card-inner {
            min-height: 260px !important;
          }
          .step-img-box {
            min-height: 140px !important;
          }
        }
      `}</style>
      <div className="container langkah-container">

        {/* Header */}
        <div className="langkah-header" style={{ maxWidth: '700px', textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: 'var(--nt-green-dark, #1a4325)',
            marginBottom: '1.25rem',
            lineHeight: 1.2,
          }}>
            Langkah mudah<br />bersama NusaTani
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--nt-green-dark, #1a4325)',
            fontWeight: 500,
            lineHeight: 1.6,
            margin: '0 auto',
            maxWidth: '650px',
          }}>
            Daftar, upload, terima penawaran, dan deal! NusaTani memudahkan Anda
            mengubah limbah pertanian menjadi sumber penghasilan tambahan.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          width: '100%',
          maxWidth: '1000px',
        }}>
          {steps.map((s) => (
            <StepCard key={s.num} s={s} />
          ))}
        </div>

      </div>
    </section>
  );
}