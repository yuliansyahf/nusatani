import { CircleDollarSign, Leaf, Users } from 'lucide-react';

const problems = [
  {
    title: 'Kerugian Ekonomi',
    desc: 'Nilai kerugian mencapai jutaan per petani setiap musim',
    Icon: CircleDollarSign,
    color: '#febb43',
    bg: '#fdf1d6'
  },
  {
    title: 'Masalah Lingkungan',
    desc: 'Limbah panen gagal mencemari tanah dan air',
    Icon: Leaf,
    color: '#46a56e',
    bg: '#dcf1e3'
  },
  {
    title: 'Dampak Sosial',
    desc: 'Petani frustasi dan kehilangan motivasi',
    Icon: Users,
    color: '#e25968',
    bg: '#fbdddf'
  },
];

export default function MasalahSection() {
  return (
    <section className="section" style={{ background: 'transparent', position: 'relative', zIndex: 5 }}>
      <style>{`
        .problem-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }
        .problem-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
        }
        .icon-wrapper {
          transition: all 0.3s ease;
        }
        .problem-card:hover .icon-wrapper {
          transform: scale(1.15) rotate(5deg);
        }
        .masalah-container {
          padding: 15rem 1.5rem 8rem;
        }
        @media (max-width: 1024px) {
          .masalah-container { padding: 10rem 1.5rem 6rem; }
        }
        @media (max-width: 768px) {
          .masalah-container { padding: 4rem 1.25rem 3rem; }
          .problem-card { padding: 2rem 1.5rem !important; }
        }
      `}</style>
      <div className="container masalah-container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: 'var(--nt-green-dark, #1a4325)',
            marginBottom: '0.75rem'
          }}>
            Masalah yang kami atasi!
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--nt-green-dark, #1a4325)',
            maxWidth: 600,
            margin: '0 auto',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            Berbagai tantangan yang dihadapi petani Indonesia dalam mengelola hasil panen yang tidak optimal
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {problems.map((p, idx) => (
            <div key={p.title} className="problem-card" style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid rgba(0,0,0,0.03)'
            }}>

              <div className="icon-wrapper" style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: p.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <p.Icon size={40} color={p.color} strokeWidth={1.5} />
              </div>

              <h3 style={{
                fontWeight: 800,
                fontSize: '1.35rem',
                marginBottom: '1rem',
                color: '#2d3748'
              }}>
                {p.title}
              </h3>

              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
