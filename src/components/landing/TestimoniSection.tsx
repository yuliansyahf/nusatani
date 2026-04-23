'use client';

import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

const testimonials = [
  {
    name: 'Mas Rio',
    role: 'Pengolah Pupuk Organik',
    avatar: '/asset/user3.svg',
    text: '"Berkat NusaTani, tomat busuk saya tidak sia-sia. Hasil penjualannya bisa buat tambahan beli pupuk dan modal tanam berikutnya. Sekarang saya punya penghasilan tambahan dari yang biasanya cuma dibuang!"',
  },
  {
    name: 'Bu Yuli',
    role: 'Ibu Rumah Tangga',
    avatar: '/asset/user1.svg',
    text: '"Sebagai ibu rumah tangga, saya senang bisa beli pupuk kompos berkualitas dengan harga terjangkau dari NusaTani. Tanaman di rumah jadi subur, dan saya merasa ikut mendukung lingkungan yang lebih bersih."',
  },
  {
    name: 'Pak Eko',
    role: 'Petani Brebes',
    avatar: '/asset/user2.svg',
    text: '"NusaTani sangat membantu usaha saya. Supplier baku jadi lebih terpercaya, harga kompetitif, dan saya tidak perlu lagi capek-capek keliling desa — semua bisa diatur dari satu platform."',
  },
  {
    name: 'Bu Sari',
    role: 'Petani Sayur',
    avatar: '/asset/user1.svg',
    text: '"Dulu saya bingung mau buang ke mana sisa panen yang tidak laku. Sekarang lewat NusaTani langsung ada yang beli. Prosesnya mudah dan pembayarannya cepat. Sangat membantu sekali!"',
  },
  {
    name: 'Pak Hendra',
    role: 'Pengolah Kompos',
    avatar: '/asset/user2.svg',
    text: '"Stok bahan baku untuk produksi kompos saya jadi lebih stabil sejak pakai NusaTani. Harganya juga lebih bersaing dibanding beli langsung ke pasar. Recommended banget!"',
  },
  {
    name: 'Mbak Dewi',
    role: 'Ibu Rumah Tangga',
    avatar: '/asset/user3.svg',
    text: '"Platform NusaTani sangat user friendly. Saya yang tidak terlalu paham teknologi pun bisa dengan mudah membeli pupuk organik untuk tanaman hias di rumah. Terima kasih NusaTani!"',
  },
];

function AvatarWithFallback({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid rgba(42,122,59,0.2)',
        background: '#fff',
        display: 'block',
      }}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><circle cx='26' cy='26' r='26' fill='%232a7a3b'/><text x='26' y='32' text-anchor='middle' fill='white' font-size='20' font-family='sans-serif'>${name.charAt(0)}</text></svg>`;
      }}
    />
  );
}

const TOTAL = testimonials.length;

export default function TestimoniSection() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const gapRef = useRef(20);

  const maxIndex = TOTAL - cardsVisible;

  // Update card width AND cards visible on resize
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const newCardsVisible = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setCardsVisible(newCardsVisible);
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gap = 20;
        const cardWidth = (containerWidth - (gap * (newCardsVisible - 1))) / newCardsVisible;
        cardWidthRef.current = cardWidth;
        gapRef.current = gap;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);;

  const snapToIndex = useCallback((newIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
    setIsAnimating(true);
    setIndex(clampedIndex);
    setTranslateX(0);
    setTimeout(() => setIsAnimating(false), 500);
  }, [maxIndex]);

  const handleDragStart = (clientX: number) => {
    if (isAnimating) return;
    setIsDragging(true);
    setStartX(clientX);
    setIsAnimating(false);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || isAnimating) return;

    const diff = clientX - startX;
    const maxDrag = cardWidthRef.current + gapRef.current;
    const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));

    setTranslateX(clampedDiff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const threshold = (cardWidthRef.current + gapRef.current) * 0.2;
    const diff = translateX;

    if (diff < -threshold && index < maxIndex) {
      snapToIndex(index + 1);
    } else if (diff > threshold && index > 0) {
      snapToIndex(index - 1);
    } else {
      // Snap back to current position
      setIsAnimating(true);
      setTranslateX(0);
      setTimeout(() => setIsAnimating(false), 500);
    }

    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Navigation buttons
  const goToPrev = () => {
    if (index > 0 && !isAnimating) {
      snapToIndex(index - 1);
    }
  };

  const goToNext = () => {
    if (index < maxIndex && !isAnimating) {
      snapToIndex(index + 1);
    }
  };

  const getTransform = () => {
    const baseOffset = -(index * (cardWidthRef.current + gapRef.current));
    return `translateX(${baseOffset + translateX}px)`;
  };

  const cardFlexBasis = cardsVisible === 1
    ? '100%'
    : cardsVisible === 2
      ? 'calc((100% - 1.25rem) / 2)'
      : 'calc((100% - 2.5rem) / 3)';

  return (
    <section style={{ background: 'transparent', overflow: 'hidden' }}>
      <style>{`
        .testimoni-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 5rem 3rem 4rem;
          gap: 2rem;
          max-width: 1200px;
          margin-left: 30rem;
        }
        @media (max-width: 1280px) {
          .testimoni-wrapper {
            margin-left: 10rem;
          }
        }
        @media (max-width: 1024px) {
          .testimoni-wrapper {
            margin-left: 0;
            padding: 4rem 2rem;
            flex-direction: column;
            max-width: 100%;
          }
          .testimoni-spacer { display: none !important; }
        }
        @media (max-width: 768px) {
          .testimoni-wrapper {
            padding: 3rem 1.25rem 2.5rem;
          }
        }
      `}</style>
      <div className="testimoni-wrapper">
        {/* Spacer kiri */}
        <div className="testimoni-spacer" style={{ flex: '0 0 35%', minWidth: 0 }} />

        {/* Konten kanan */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Heading + Nav Buttons */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  color: 'var(--nt-green-dark)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.15,
                }}
              >
                Apa Kata Mereka?
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#1a4325',
                  maxWidth: 480,
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Cerita langsung dari petani, pengolah, dan masyarakat yang telah
                merasakan manfaat NusaTani
              </p>
            </div>

            {/* Nav Arrows */}
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, paddingTop: '0.5rem' }}>
              <button
                onClick={goToPrev}
                disabled={index === 0}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '2px solid',
                  borderColor: index === 0 ? 'rgba(42,122,59,0.2)' : '#2a7a3b',
                  background: index === 0 ? 'transparent' : '#2a7a3b',
                  color: index === 0 ? 'rgba(42,122,59,0.3)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: index === 0 ? 'scale(1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (index !== 0) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(42,122,59,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                disabled={index >= maxIndex}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '2px solid',
                  borderColor: index >= maxIndex ? 'rgba(42,122,59,0.2)' : '#2a7a3b',
                  background: index >= maxIndex ? 'transparent' : '#2a7a3b',
                  color: index >= maxIndex ? 'rgba(42,122,59,0.3)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: index >= maxIndex ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (index < maxIndex) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(42,122,59,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dot Indicator */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => snapToIndex(i)}
                style={{
                  width: i === index ? 28 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: i === index ? '#2a7a3b' : 'rgba(42,122,59,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Cards Container with Drag */}
          <div
            ref={containerRef}
            style={{
              overflow: 'hidden',
              borderRadius: '18px',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                transform: getTransform(),
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform',
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.name + t.role + i}
                  style={{
                    flex: `0 0 ${cardFlexBasis}`,
                    background: 'rgba(220, 242, 228, 0.85)',
                    borderRadius: '18px',
                    padding: '1.75rem 1.5rem 1.5rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(135, 203, 153, 0.45)',
                    boxShadow: isDragging
                      ? '0 8px 32px rgba(42,122,59,0.12)'
                      : '0 2px 16px rgba(42,122,59,0.06)',
                    minHeight: 280,
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    transform: isDragging ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  {/* Quote icon */}
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#BDDEC7' }}>
                    <Quote size={44} fill="currentColor" />
                  </div>
                  {/* Avatar */}
                  <div style={{ marginBottom: '1rem' }}>
                    <AvatarWithFallback src={t.avatar} name={t.name} />
                  </div>

                  {/* Teks */}
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#1a4325',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    flex: 1,
                    marginBottom: '1.5rem',
                    pointerEvents: 'none',
                  }}>
                    {t.text}
                  </p>

                  {/* Nama & Role */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1a4325', marginBottom: '0.15rem' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#2a7a3b', fontStyle: 'italic' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drag hint */}
          <p style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(42,122,59,0.6)',
            fontStyle: 'italic',
          }}>
            Geser untuk melihat lebih banyak testimoni
          </p>
        </div>
      </div>
    </section>
  );
}