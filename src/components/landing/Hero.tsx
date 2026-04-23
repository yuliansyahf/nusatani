'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="container hero-content">
        <div style={{ maxWidth: 540 }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--nt-green-dark)',
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            &quot;Mengubah Sisa<br />Jadi Asa&quot;
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#4a5568',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: 480,
              fontWeight: 500,
            }}
          >
            Platform digital yang menghubungkan petani dengan industri pengolah, mengubah panen
            gagal menjadi pupuk organik, pakan ternak, dan energi terbarukan
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/auth/register?type=petani"
              className="bubble-btn bubble-btn-green"
            >
              Jual Panen Gagal
            </Link>
            <Link
              href="/auth/register?type=pengolah"
              className="bubble-btn bubble-btn-yellow"
            >
              Beli Bahan Baku
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Hero Content: responsive padding ── */
        .hero-content {
          position: relative;
          z-index: 1;
          padding-top: 6rem;
          padding-right: 40rem; /* desktop: sisakan ruang untuk ilustrasi */
          padding-bottom: 4rem;
          padding-left: 2rem;
        }

        @media (max-width: 1024px) {
          .hero-content {
            padding-right: 20rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding-top: 5.5rem;
            padding-right: 1.25rem;
            padding-bottom: 3rem;
            padding-left: 1.25rem;
            /* semi-transparan agar teks tetap terbaca di atas ilustrasi */
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(4px);
            border-radius: 0 0 24px 24px;
          }
        }

        /* ── Bubble Buttons ── */
        .bubble-btn {
          position: relative;
          display: inline-block;
          padding: 0.75rem 1.75rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease, color 0.3s ease;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .bubble-btn-green {
          background: #4caf63;
          color: white;
        }

        .bubble-btn-yellow {
          background: #fbbf50;
          color: white;
        }

        .bubble-btn::after {
          content: '';
          position: absolute;
          bottom: -20%;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 120%;
          aspect-ratio: 1 / 0.8;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.3s;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }

        .bubble-btn:hover::after {
          transform: translateX(-50%) scale(1.5);
          opacity: 1;
        }

        .bubble-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }

        .bubble-btn-green:hover {
          background: white;
          color: #2e7d32;
        }

        .bubble-btn-yellow:hover {
          background: white;
          color: #e6a017;
        }
      `}</style>
    </section>
  );
}