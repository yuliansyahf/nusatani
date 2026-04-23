'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Topbar from '@/components/layout/Topbar';
import ProductCard from '@/components/dashboard/ProductCard';
import { getProducts, deleteProduct, getOffersByProduct } from '@/lib/storage';
import { Product } from '@/types';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function PetaniProdukPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'semua' | 'aktif' | 'terjual' | 'kadaluarsa'>('semua');

  function loadProducts() {
    if (!user) return;
    setProducts(getProducts().filter(p => p.farmerId === user.id));
  }

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    loadProducts();
  }, [user]);

  function handleDelete(id: string) {
    if (!confirm('Hapus produk ini?')) return;
    deleteProduct(id);
    loadProducts();
    toast.success('Produk berhasil dihapus.');
  }

  const filtered = products
    .filter(p => filter === 'semua' || p.status === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Topbar title="Produk Saya" />
      <div className="page-content">
        {/* Header actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1, minWidth: 240 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nt-text-muted)' }} />
              <input className="form-input" placeholder="Cari produk..." value={search}
                onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
            </div>
          </div>
          <Link href="/dashboard/petani/produk/baru" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={16} /> Jual Panen Baru
          </Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--nt-border)', paddingBottom: '0' }}>
          {(['semua', 'aktif', 'terjual', 'kadaluarsa'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '0.625rem 1rem',
                fontWeight: filter === f ? 700 : 500,
                color: filter === f ? 'var(--nt-green)' : 'var(--nt-text-muted)',
                borderBottom: `2px solid ${filter === f ? 'var(--nt-green)' : 'transparent'}`,
                marginBottom: '-2px', fontSize: '0.9rem', textTransform: 'capitalize', transition: 'all 0.15s'
              }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {' '}
              <span style={{
                background: filter === f ? 'var(--nt-green-100)' : 'var(--nt-bg)',
                color: filter === f ? 'var(--nt-green)' : 'var(--nt-text-muted)',
                borderRadius: 100, padding: '0.1rem 0.4rem', fontSize: '0.72rem', fontWeight: 700
              }}>
                {products.filter(p => f === 'semua' || p.status === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--nt-text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📦</div>
            <p style={{ fontWeight: 600 }}>Tidak ada produk ditemukan</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {search ? 'Coba kata kunci lain.' : 'Mulai tambahkan produk panen Anda.'}
            </p>
            {!search && <Link href="/dashboard/petani/produk/baru" className="btn btn-primary" style={{ marginTop: '1rem', textDecoration: 'none', display: 'inline-flex' }}>Jual Panen Baru</Link>}
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(p => (
              <ProductCard
                key={p.id} product={p} context="petani"
                offerCount={getOffersByProduct(p.id).filter(o => o.status === 'pending').length}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
