'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function PengolahLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else if (user.role !== 'pengolah') {
        // Jika bukan pengolah, arahkan ke dashboard sesuai role
        if (user.role === 'petani') {
          router.push('/petani/dashboard');
        } else if (user.role === 'supplier') {
          router.push('/supplier/dashboard');
        } else {
          router.push('/auth/login');
        }
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4fbf1' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏭</div>
          <p style={{ color: '#6a8a75' }}>Memuat data pengolah...</p>
        </div>
      </div>
    );
  }

  // Hanya tampilkan children jika user adalah pengolah
  if (!user || user.role !== 'pengolah') return null;

  return <>{children}</>;
}
