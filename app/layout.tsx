import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'NusaTani – Mengubah Sisa Jadi Asa',
  description: 'Platform digital yang menghubungkan petani dengan industri pengolahan. Ubah panen gagal menjadi pupuk organik, pakan ternak, dan energi terbarukan.',
  keywords: 'pertanian, panen gagal, pengolahan hasil tani, agritech indonesia',
  icons: {
    icon: '/asset/nt.svg',         // ← file SVG icon di folder public
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: 'Inter, sans-serif',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '0.875rem',
              },
              success: {
                iconTheme: { primary: '#2a7a3b', secondary: '#fff' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}