'use client';

import { Offer, User } from '@/types';
import { Check, X, MessageSquare, Weight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface OfferCardProps {
  offer: Offer;
  buyer?: User;
  onAccept?: (offerId: string) => void;
  onReject?: (offerId: string) => void;
  readonly?: boolean;
}

const statusConfig = {
  pending:  { label: 'Menunggu', className: 'badge-gold' },
  accepted: { label: 'Diterima', className: 'badge-green' },
  rejected: { label: 'Ditolak',  className: 'badge-red' },
};

export default function OfferCard({ offer, buyer, onAccept, onReject, readonly }: OfferCardProps) {
  const status = statusConfig[offer.status];
  const total = offer.offeredPricePerKg * offer.quantityKg;

  return (
    <div style={{
      border: `1.5px solid ${offer.status === 'accepted' ? 'var(--nt-green)' : 'var(--nt-border)'}`,
      borderRadius: 'var(--nt-radius)',
      padding: '1.25rem',
      background: offer.status === 'accepted' ? 'var(--nt-green-50)' : 'var(--nt-surface)',
      display: 'flex', flexDirection: 'column', gap: '1rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: 'var(--nt-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
          }}>
            {buyer?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--nt-text)' }}>
              {buyer?.name || 'Pengolah'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--nt-text-muted)' }}>
              {format(new Date(offer.createdAt), 'd MMM yyyy', { locale: id })}
            </div>
          </div>
        </div>
        <span className={`badge ${status.className}`}>{status.label}</span>
      </div>

      {/* Offer details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        <div style={{ background: 'var(--nt-bg)', borderRadius: 8, padding: '0.625rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--nt-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Harga Tawar</div>
          <div style={{ fontWeight: 800, color: 'var(--nt-green)', fontSize: '1rem', marginTop: '0.125rem' }}>
            Rp {offer.offeredPricePerKg.toLocaleString('id-ID')}/kg
          </div>
        </div>
        <div style={{ background: 'var(--nt-bg)', borderRadius: 8, padding: '0.625rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--nt-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Jumlah</div>
          <div style={{ fontWeight: 800, color: 'var(--nt-text)', fontSize: '1rem', marginTop: '0.125rem' }}>
            {offer.quantityKg.toLocaleString('id-ID')} kg
          </div>
        </div>
        <div style={{ background: 'var(--nt-bg)', borderRadius: 8, padding: '0.625rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--nt-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total</div>
          <div style={{ fontWeight: 800, color: 'var(--nt-gold-dark)', fontSize: '1rem', marginTop: '0.125rem' }}>
            Rp {total.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* Note */}
      {offer.note && (
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--nt-bg)', borderRadius: 8, padding: '0.75rem' }}>
          <MessageSquare size={14} color="var(--nt-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.825rem', color: 'var(--nt-text-muted)', lineHeight: 1.6 }}>{offer.note}</p>
        </div>
      )}

      {/* Actions */}
      {!readonly && offer.status === 'pending' && (onAccept || onReject) && (
        <div style={{ display: 'flex', gap: '0.625rem' }}>
          {onAccept && (
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onAccept(offer.id)}>
              <Check size={15} /> Terima Penawaran
            </button>
          )}
          {onReject && (
            <button className="btn btn-danger" onClick={() => onReject(offer.id)}>
              <X size={15} /> Tolak
            </button>
          )}
        </div>
      )}
    </div>
  );
}
