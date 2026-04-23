'use client';

import Link from 'next/link';
import { MapPin, Tag, Weight, Edit, Trash2, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  farmerName?: string;
  context: 'petani' | 'pengolah';
  offerCount?: number;
  onDelete?: (id: string) => void;
}

const statusConfig = {
  aktif:     { label: 'Aktif',     className: 'badge-green',  icon: <CheckCircle size={11} /> },
  terjual:   { label: 'Terjual',   className: 'badge-blue',   icon: <CheckCircle size={11} /> },
  kadaluarsa:{ label: 'Kadaluarsa',className: 'badge-red',    icon: <XCircle size={11} /> },
};

export default function ProductCard({ product, farmerName, context, offerCount = 0, onDelete }: ProductCardProps) {
  const status = statusConfig[product.status];
  const detailHref = context === 'petani'
    ? `/dashboard/petani/produk/${product.id}`
    : `/dashboard/pengolah/produk/${product.id}`;

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={product.imageUrl || 'https://placehold.co/400x300/e8f5e9/2a7a3b?text=Produk'}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Status badge overlay */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
          <span className={`badge ${status.className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {status.icon} {status.label}
          </span>
        </div>
        {/* Offer badge */}
        {context === 'petani' && offerCount > 0 && (
          <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
            <span className="badge badge-gold">{offerCount} Penawaran</span>
          </div>
        )}
      </div>

      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--nt-text)', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        {farmerName && (
          <p style={{ fontSize: '0.78rem', color: 'var(--nt-text-muted)', fontWeight: 500 }}>oleh {farmerName}</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.825rem', color: 'var(--nt-text-muted)' }}>
            <Weight size={13} color="var(--nt-green)" />
            {product.quantityKg.toLocaleString('id-ID')} kg tersedia
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.825rem', color: 'var(--nt-text-muted)' }}>
            <Tag size={13} color="var(--nt-green)" />
            <span style={{ fontWeight: 700, color: 'var(--nt-green)', fontSize: '0.925rem' }}>
              Rp {product.pricePerKg.toLocaleString('id-ID')}
            </span>
            <span>/kg</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: 'var(--nt-text-muted)' }}>
            <MapPin size={13} color="var(--nt-green)" />
            {product.location}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card-footer" style={{ display: 'flex', gap: '0.5rem' }}>
        {context === 'petani' ? (
          <>
            <Link href={detailHref} className="btn btn-primary btn-sm" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center' }}>
              <Eye size={13} /> Lihat
            </Link>
            <Link href={`/dashboard/petani/produk/${product.id}/edit`} className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
              <Edit size={13} />
            </Link>
            {onDelete && (
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>
                <Trash2 size={13} />
              </button>
            )}
          </>
        ) : (
          <Link
            href={detailHref}
            className={`btn btn-sm ${product.status === 'aktif' ? 'btn-primary' : 'btn-ghost'} w-full`}
            style={{ textDecoration: 'none', justifyContent: 'center' }}
          >
            {product.status === 'aktif' ? '🤝 Ajukan Penawaran' : 'Lihat Detail'}
          </Link>
        )}
      </div>
    </div>
  );
}
