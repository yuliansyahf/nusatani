'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home, ShoppingBag, BarChart3, Settings, Search,
  FileText, ClipboardList, MessageCircle, LogOut,
  Leaf, Package, Tractor, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface NavSection {
  title: string;
  items: { href: string; label: string; icon: React.ReactNode }[];
}

const petaniSections: NavSection[] = [
  {
    title: 'MAIN NAVIGATION',
    items: [
      { href: '/petani/dashboard', label: 'Beranda', icon: <Home size={18} /> },
      { href: '/petani/marketplace', label: 'Marketplace', icon: <ShoppingBag size={18} /> },
      { href: '/petani/laporan', label: 'Laporan', icon: <BarChart3 size={18} /> },
      { href: '/petani/pengaturan', label: 'Pengaturan', icon: <Settings size={18} /> },
    ],
  },
  {
    title: 'FITUR CEPAT',
    items: [
      { href: '/petani/jual-panen', label: 'Jual Panen Baru', icon: <Tractor size={18} /> },
      { href: '/petani/penawaran', label: 'Penawaran Saya', icon: <FileText size={18} /> },
      { href: '/petani/transaksi', label: 'Riwayat Transaksi', icon: <ClipboardList size={18} /> },
      { href: '/petani/chat', label: 'Chat', icon: <MessageCircle size={18} /> },
    ],
  },
];

const pengolahSections: NavSection[] = [
  {
    title: 'MAIN NAVIGATION',
    items: [
      { href: '/pengolah/dashboard', label: 'Beranda', icon: <Home size={18} /> },
      { href: '/pengolah/marketplace', label: 'Marketplace', icon: <ShoppingBag size={18} /> },
      { href: '/pengolah/laporan', label: 'Laporan', icon: <BarChart3 size={18} /> },
      { href: '/pengolah/pengaturan', label: 'Pengaturan', icon: <Settings size={18} /> },
    ],
  },
  {
    title: 'FITUR CEPAT',
    items: [
      { href: '/pengolah/cari-bahan', label: 'Cari Bahan Baku', icon: <Search size={18} /> },
      { href: '/pengolah/penawaran', label: 'Penawaran Saya', icon: <FileText size={18} /> },
      { href: '/pengolah/pesanan', label: 'Pesanan Aktif', icon: <Package size={18} /> },
      { href: '/pengolah/chat', label: 'Chat', icon: <MessageCircle size={18} /> },
    ],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = user?.role === 'petani' ? petaniSections : pengolahSections;
  const roleLabel = user?.role === 'petani' ? 'Petani · Member' : 'Pengolah · Premium';
  const roleColor = user?.role === 'petani' ? 'var(--nt-green)' : 'var(--nt-green)';

  function handleLogout() {
    logout();
    document.cookie = 'nusatani_uid=; Max-Age=0; path=/';
    document.cookie = 'nusatani_role=; Max-Age=0; path=/';
    toast.success('Berhasil keluar dari akun.');
    router.push('/');
  }

  const renderSidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ── Logo ── */}
      <div className="sidebar-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/asset/nusatani.svg" alt="NusaTani" style={{ height: '34px', width: 'auto' }} />
      </div>

      {/* ── Nav Sections ── */}
      <nav style={{ flex: 1, padding: '0.75rem' }}>
        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: '1.25rem' }}>
            <div className="sidebar-section-label">{section.title}</div>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── User Info (Bottom) ── */}
      <div style={{
        margin: '0.75rem',
        padding: '0.875rem',
        borderRadius: 'var(--nt-radius)',
        background: 'var(--nt-green-50)',
        border: '1.5px solid var(--nt-green-100)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--nt-green)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: '1rem', flexShrink: 0
        }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 700, fontSize: '0.82rem',
            color: 'var(--nt-text)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {user?.name || 'Pengguna'}
          </div>
          <span style={{
            fontSize: '0.68rem', fontWeight: 600,
            color: 'var(--nt-green)',
            background: 'var(--nt-green-100)',
            padding: '0.1rem 0.5rem',
            borderRadius: 100,
            display: 'inline-block',
            marginTop: '0.15rem'
          }}>
            {roleLabel}
          </span>
        </div>
        <button
          onClick={handleLogout}
          title="Keluar"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#dc2626', padding: '0.25rem', borderRadius: 6,
            display: 'flex', alignItems: 'center', flexShrink: 0
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#fee2e2')}
          onMouseOut={e => (e.currentTarget.style.background = 'none')}
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        id="sidebar-toggle"
        aria-label="Toggle menu"
        style={{
          display: 'none', position: 'fixed', top: '1rem', left: '1rem',
          zIndex: 200, background: 'var(--nt-green)', color: '#fff',
          border: 'none', borderRadius: 8, padding: '0.5rem',
          cursor: 'pointer', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        {renderSidebarContent()}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          id="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            zIndex: 99, display: 'none'
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          #sidebar-toggle { display: flex !important; }
          #sidebar-overlay { display: block !important; }
        }
      `}</style>
    </>
  );
}
