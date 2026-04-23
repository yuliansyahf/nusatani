import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, User, GraduationCap, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pengembang – NusaTani',
  description: 'Tim pengembang NusaTani – Tugas Kreativitas Wirausaha XI RPL 5',
};

const team = [
  {
    name: 'Fadi Alyuliansyah',
    kelas: 'XI RPL 5',
    role: 'Project Manager - Landing Page & Developer Page',
    photo: '/tim/fadi.png',
    color: '#2a7a3b',
    accent: '#dcf1e3',
    initials: 'FA',
  },
  {
    name: 'Vincentius Ferrer Pioraka',
    kelas: 'XI RPL 5',
    role: 'Dashboard Pengolah - Dashboard Petani',
    photo: '/tim/vincent.png',
    color: '#1d5fa8',
    accent: '#dce8f7',
    initials: 'VF',
  },
  {
    name: 'Gisella Safa Alzena',
    kelas: 'XI RPL 5',
    role: 'Cara Kerja Page - Hubungi Kami Page',
    photo: '/tim/gisel.png',
    color: '#c87c1a',
    accent: '#fdf1d6',
    initials: 'GS',
  },
  {
    name: 'Fadhilah Bening Cahyani',
    kelas: 'XI RPL 5',
    role: 'Login & Register Page  - Authorization Database',
    photo: '/tim/dila.png',
    color: '#b5449a',
    accent: '#f7dcf2',
    initials: 'FB',
  },
];

export default function PengembangPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pg-page {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: url('/background/bgdeve.svg') center top / cover no-repeat, #e8f5eb;
          position: relative;
          overflow: hidden;
        }

        /* ── Back button ── */
        .pg-back {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 100;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42,122,59,0.15);
          color: #1a5c34;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pg-back:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

        /* ── Main container ── */
        .pg-container {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 6.5rem 1.5rem 4rem;
        }

        /* ── Hero header ── */
        .pg-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .pg-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(42,122,59,0.1);
          border: 1px solid rgba(42,122,59,0.2);
          color: #1a5c34;
          padding: 0.4rem 1.1rem;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .pg-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: #1a4325;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .pg-title span { color: #2a7a3b; }
        .pg-subtitle {
          font-size: 1.1rem;
          color: #2d6a3f;
          font-weight: 500;
          line-height: 1.6;
          max-width: 560px;
          margin: 0 auto;
        }

        /* ── Project info card (Simple & Clean) ── */
        .pg-project-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(42,122,59,0.15);
          border-radius: 16px;
          padding: 2rem 2.5rem;
          margin: 2.5rem auto 3rem;
          max-width: 900px;
          display: grid;
          grid-template-columns: repeat(4, auto);
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          box-shadow: 0 4px 24px rgba(42,122,59,0.06);
        }
        .pg-info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .pg-info-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(42,122,59,0.08);
          color: #2a7a3b;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pg-info-text {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .pg-info-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #6a8a75;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .pg-info-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a4325;
          line-height: 1.2;
        }
        @media (max-width: 900px) {
          .pg-project-card { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 2rem; 
            padding: 2rem; 
          }
        }
        @media (max-width: 500px) {
          .pg-project-card { 
            grid-template-columns: 1fr; 
            gap: 1.5rem; 
            padding: 1.5rem; 
          }
        }

        /* ── Team grid: 4 columns always ── */
        .pg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        /* ── Team card ── */
        .pg-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          cursor: default;
        }
        .pg-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 48px rgba(0,0,0,0.14);
        }

        .pg-card-photo {
          width: 100%;
          aspect-ratio: 1 / 1;
          position: relative;
          overflow: hidden;
        }
        .pg-card-photo-bg {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          font-weight: 900;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.04em;
        }
        .pg-card-photo img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pg-card-body {
          padding: 1.4rem 1.5rem 1.5rem;
        }
        .pg-card-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1a4325;
          margin-bottom: 0.2rem;
          line-height: 1.2;
        }
        .pg-card-kelas {
          font-size: 0.8rem;
          font-weight: 600;
          color: #2a7a3b;
          margin-bottom: 0.6rem;
          display: inline-block;
        }
        .pg-card-role {
          font-size: 0.85rem;
          color: #4a6855;
          font-weight: 500;
          line-height: 1.4;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          background: rgba(42,122,59,0.07);
          display: inline-block;
        }

        /* ── Footer credit ── */
        .pg-footer {
          text-align: center;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(42,122,59,0.12);
        }
        .pg-footer-text {
          font-size: 0.9rem;
          color: #4a6855;
          font-weight: 500;
        }
        .pg-footer-brand {
          font-size: 1.5rem;
          font-weight: 900;
          color: #1a4325;
          margin-top: 0.75rem;
        }
        .pg-footer-brand span { color: #2a7a3b; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pg-grid { grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        }
        @media (max-width: 768px) {
          .pg-container { padding: 4.5rem 1.25rem 3rem; }
          .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .pg-project-card { padding: 1.25rem 1.5rem; gap: 1rem; }
          .pg-divider { display: none; }
          .pg-card-name { font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
          .pg-card-body { padding: 0.9rem 1rem; }
          .pg-card-name { font-size: 0.85rem; }
          .pg-card-role { font-size: 0.78rem; }
        }
      `}</style>

      <div className="pg-page">
        {/* Navbar */}
        <Navbar />

        <div className="pg-container">

          {/* Header */}
          <div className="pg-header">

            <h1 className="pg-title">
              Dibalik layar<br /><span>NusaTani</span>
            </h1>
            <p className="pg-subtitle">
              Empat siswa yang bersemangat membangun solusi digital untuk pertanian Indonesia yang lebih sejahtera.
            </p>
          </div>

          {/* Project info */}
          <div className="pg-project-card">
            <div className="pg-info-item">
              <div className="pg-info-icon-wrapper">
                <BookOpen size={24} strokeWidth={2} />
              </div>
              <div className="pg-info-text">
                <span className="pg-info-label">Mata Pelajaran</span>
                <span className="pg-info-value">Kreativitas Wirausaha</span>
              </div>
            </div>
            <div className="pg-info-item">
              <div className="pg-info-icon-wrapper">
                <User size={24} strokeWidth={2} />
              </div>
              <div className="pg-info-text">
                <span className="pg-info-label">Guru Pembimbing</span>
                <span className="pg-info-value">Ibu Lyra Hertin, S.Pd.</span>
              </div>
            </div>
            <div className="pg-info-item">
              <div className="pg-info-icon-wrapper">
                <GraduationCap size={24} strokeWidth={2} />
              </div>
              <div className="pg-info-text">
                <span className="pg-info-label">Kelas</span>
                <span className="pg-info-value">XI RPL 5</span>
              </div>
            </div>
            <div className="pg-info-item">
              <div className="pg-info-icon-wrapper">
                <Calendar size={24} strokeWidth={2} />
              </div>
              <div className="pg-info-text">
                <span className="pg-info-label">Tahun</span>
                <span className="pg-info-value">2025 / 2026</span>
              </div>
            </div>
          </div>

          {/* Team grid */}
          <div className="pg-grid">
            {team.map((member) => (
              <div key={member.name} className="pg-card">
                <div className="pg-card-photo">
                  {/* Color background with initials fallback */}
                  <div
                    className="pg-card-photo-bg"
                    style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)` }}
                  >
                    {member.initials}
                  </div>
                  {/* Actual photo — overlays on top when image loads */}
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className="pg-card-body">
                  <div className="pg-card-name">{member.name}</div>
                  <div className="pg-card-kelas">{member.kelas}</div>
                  <br />
                  <span className="pg-card-role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>


        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
