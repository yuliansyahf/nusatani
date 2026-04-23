'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, ChevronDown, Leaf, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Topbar({ title }: { title?: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleLogout() {
    logout();
    document.cookie = 'nusatani_uid=; Max-Age=0; path=/';
    document.cookie = 'nusatani_role=; Max-Age=0; path=/';
    toast.success('Berhasil keluar.');
    router.push('/');
  }

  return (
    <header className="topbar">
      <div>
        {title && (
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--nt-text)' }}>{title}</h1>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* User dropdown */}
        <div style={{ position: 'relative' }} ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--nt-green-50)', border: '1.5px solid var(--nt-green-100)',
              borderRadius: 100, padding: '0.375rem 0.875rem 0.375rem 0.5rem',
              cursor: 'pointer', transition: 'all 0.15s'
            }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: '50%', background: 'var(--nt-green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '0.8rem'
            }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--nt-text)' }}>
              {user?.name?.split(' ')[0]}
            </span>
            <ChevronDown size={14} color="var(--nt-text-muted)" />
          </button>

          {open && (
            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 8px)',
              background: 'var(--nt-surface)', border: '1px solid var(--nt-border)',
              borderRadius: 'var(--nt-radius)', boxShadow: 'var(--nt-shadow-md)',
              minWidth: 180, zIndex: 200, overflow: 'hidden',
              animation: 'slideUp 0.15s ease'
            }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--nt-border)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--nt-text-muted)' }}>{user?.email}</div>
              </div>
              <Link
                href="/profile"
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.625rem 1rem', color: 'var(--nt-text)', textDecoration: 'none', fontSize: '0.875rem', transition: 'background 0.15s' }}
                onClick={() => setOpen(false)}
                onMouseOver={e => (e.currentTarget.style.background = 'var(--nt-green-50)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                <User size={15} /> Profil Saya
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.625rem 1rem', color: '#dc2626', background: 'none',
                  border: 'none', width: '100%', cursor: 'pointer', fontSize: '0.875rem',
                  transition: 'background 0.15s'
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#fee2e2')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                <LogOut size={15} /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
