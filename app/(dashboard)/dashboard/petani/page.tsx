'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Topbar from '@/components/layout/Topbar';
import ProductCard from '@/components/dashboard/ProductCard';
import { getProducts, getTransactionsByFarmer, getOffersByProduct } from '@/lib/storage';
import { Product, Transaction } from '@/types';
import { Wallet, Package, ClipboardList, BookOpen, Plus, TrendingUp } from 'lucide-react';

export default function PetaniDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    if (user.role !== 'petani') { router.push('/dashboard/pengolah'); return; }
    const myProducts = getProducts().filter(p => p.farmerId === user.id);
    setProducts(myProducts);
    setTransactions(getTransactionsByFarmer(user.id));
  }, [user]);

  if (!user) return null;

  const activeProducts = products.filter(p => p.status === 'aktif');
  const soldProducts = products.filter(p => p.status === 'terjual');
  const totalEarning = transactions.filter(t => t.status === 'completed').reduce((s, t) => s + t.farmerEarning, 0);
  const pendingOffers = activeProducts.reduce((sum, p) => sum + getOffersByProduct(p.id).filter(o => o.status === 'pending').length, 0);

  const menuItems = [
    { href: '/dashboard/petani/produk/baru', icon: '🌱', label: 'Jual Panen Baru', desc: 'Upload produk baru', color: 'var(--nt-green)' },
    { href: '/dashboard/petani/produk', icon: '📦', label: 'Produk Saya', desc: `${products.length} produk`, color: '#7c3aed' },
    { href: '/dashboard/petani/riwayat', icon: '📋', label: 'Riwayat Transaksi', desc: `${transactions.length} transaksi`, color: '#0891b2' },
    { href: '/dashboard/petani/edukasi', icon: '📚', label: 'Edukasi', desc: 'Panduan & video', color: '#f5a623' },
  ];

  return (
    <>
      <Topbar title="Dashboard Petani" />
      <div className="page-content">

        {/* Welcome banner */}
        <div style={{
          background: 'url(/background/dashboard-public.png) center/cover no-repeat',
          borderRadius: 16, padding: '2rem 2rem', marginBottom: '1.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', color: '#fff',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          {/* Overlay to ensure text readability against the image */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(28, 84, 39, 0.85) 0%, rgba(42, 122, 59, 0.6) 100%)',
            zIndex: 0
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.35rem', marginBottom: '0.25rem' }}>
              Selamat datang, {user.name.split(' ')[0]}! 👋
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
              {pendingOffers > 0
                ? `Anda memiliki ${pendingOffers} penawaran baru yang menunggu respons.`
                : 'Kelola produk dan pantau transaksi Anda di sini.'}
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Link href="/dashboard/petani/produk/baru" className="btn btn-gold">
              <Plus size={16} /> Jual Panen Baru
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
          {[
            { icon: <Wallet size={22} />, bg: '#f0f7f2', iconColor: 'var(--nt-green)', label: 'Saldo Tersedia', value: `Rp ${user.saldo.toLocaleString('id-ID')}` },
            { icon: <Package size={22} />, bg: '#ede9fe', iconColor: '#7c3aed', label: 'Produk Aktif', value: activeProducts.length },
            { icon: <TrendingUp size={22} />, bg: '#fef6e7', iconColor: '#f5a623', label: 'Total Terjual', value: soldProducts.length },
            { icon: <ClipboardList size={22} />, bg: '#ecfeff', iconColor: '#0891b2', label: 'Total Transaksi', value: transactions.length },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.iconColor }}>{s.icon}</div>
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value" style={{ fontSize: '1.35rem' }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main menu */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Menu Utama</h3>
          <div className="grid-4">
            {menuItems.map(m => (
              <Link key={m.href} href={m.href} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ padding: '1.25rem', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: '2.25rem', marginBottom: '0.625rem' }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--nt-text)', marginBottom: '0.25rem' }}>{m.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--nt-text-muted)' }}>{m.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest products */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Produk Terbaru Saya</h3>
            <Link href="/dashboard/petani/produk" style={{ fontSize: '0.85rem', color: 'var(--nt-green)', fontWeight: 600, textDecoration: 'none' }}>
              Lihat Semua →
            </Link>
          </div>
          {activeProducts.length === 0 ? (
            <div className="card" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--nt-text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌱</div>
              <p style={{ fontWeight: 600 }}>Belum ada produk aktif</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '1rem' }}>Mulai jual panen Anda sekarang!</p>
              <Link href="/dashboard/petani/produk/baru" className="btn btn-primary">Jual Panen Baru</Link>
            </div>
          ) : (
            <div className="grid-3">
              {activeProducts.slice(0, 3).map(p => (
                <ProductCard
                  key={p.id} product={p} context="petani"
                  offerCount={getOffersByProduct(p.id).filter(o => o.status === 'pending').length}
                />
              ))}
            </div>
          )}
        </div>

        {/* Withdraw modal hint */}
        {user.saldo > 0 && (
          <div style={{ marginTop: '1.75rem', background: 'var(--nt-green-50)', border: '1px solid var(--nt-green-100)', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--nt-green)', fontSize: '0.9rem' }}>💰 Saldo siap ditarik!</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--nt-text-muted)', marginTop: '0.125rem' }}>
                Rp {user.saldo.toLocaleString('id-ID')} menunggu penarikan.
              </div>
            </div>
            <WithdrawButton />
          </div>
        )}
      </div>
    </>
  );
}

function WithdrawButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button className="btn btn-gold btn-sm" onClick={() => setShow(true)}>Tarik Saldo</button>
      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700 }}>Tarik Saldo</h3>
              <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nt-text-muted)' }}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🚧</div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Fitur Segera Hadir!</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--nt-text-muted)', lineHeight: 1.7 }}>
                Fitur penarikan saldo ke rekening bank sedang dalam pengembangan dan akan tersedia segera.
                Hubungi kami via WhatsApp untuk penarikan manual.
              </p>
              <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" style={{ marginTop: '1.25rem', textDecoration: 'none' }}>
                💬 Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
