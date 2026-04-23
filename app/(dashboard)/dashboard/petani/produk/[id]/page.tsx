'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Topbar from '@/components/layout/Topbar';
import OfferCard from '@/components/dashboard/OfferCard';
import {
  getProductById, getOffersByProduct, upsertOffer,
  upsertTransaction, upsertProduct, getUsers
} from '@/lib/storage';
import { Product, Offer, User, Transaction } from '@/types';
import { ArrowLeft, MapPin, Calendar, Package, Tag, Warehouse } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export default function PetaniDetailProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    params.then(({ id }) => {
      setProductId(id);
      loadData(id);
    });
  }, []);

  function loadData(pid: string) {
    const p = getProductById(pid);
    if (!p) { router.push('/dashboard/petani/produk'); return; }
    setProduct(p);
    setOffers(getOffersByProduct(pid));
    setUsers(getUsers());
  }

  function handleAccept(offerId: string) {
    if (!product || !user) return;
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    // Reject all other offers
    offers.forEach(o => {
      if (o.id !== offerId) {
        upsertOffer({ ...o, status: 'rejected' });
      }
    });

    // Accept this offer
    upsertOffer({ ...offer, status: 'accepted' });

    // Mark product as sold
    upsertProduct({ ...product, status: 'terjual' });

    // Create transaction
    const total = offer.offeredPricePerKg * offer.quantityKg;
    const commission = Math.round(total * 0.05);
    const tx: Transaction = {
      id: `t_${Date.now()}`,
      productId: product.id,
      farmerId: user.id,
      buyerId: offer.buyerId,
      offerId: offer.id,
      finalPricePerKg: offer.offeredPricePerKg,
      totalAmount: total,
      commission,
      farmerEarning: total - commission,
      status: 'deal',
      createdAt: new Date().toISOString(),
    };
    upsertTransaction(tx);

    toast.success('Penawaran diterima! Transaksi berhasil dibuat. 🎉');
    loadData(productId);
  }

  function handleReject(offerId: string) {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;
    upsertOffer({ ...offer, status: 'rejected' });
    toast('Penawaran ditolak.', { icon: '❌' });
    loadData(productId);
  }

  if (!product) return null;

  const pendingOffers = offers.filter(o => o.status === 'pending');
  const otherOffers = offers.filter(o => o.status !== 'pending');

  return (
    <>
      <Topbar title="Detail Produk" />
      <div className="page-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Link href="/dashboard/petani/produk" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Kembali
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', alignItems: 'start' }} className="detail-grid">
          {/* Product info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card">
              <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <h1 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--nt-text)', lineHeight: 1.3 }}>{product.name}</h1>
                  <span className={`badge ${product.status === 'aktif' ? 'badge-green' : product.status === 'terjual' ? 'badge-blue' : 'badge-red'}`}>
                    {product.status === 'aktif' ? 'Aktif' : product.status === 'terjual' ? 'Terjual' : 'Kadaluarsa'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    { icon: <Tag size={14} />, label: 'Harga', value: `Rp ${product.pricePerKg.toLocaleString('id-ID')}/kg` },
                    { icon: <Package size={14} />, label: 'Stok', value: `${product.quantityKg.toLocaleString('id-ID')} kg` },
                    { icon: <MapPin size={14} />, label: 'Lokasi', value: product.location },
                    { icon: <Calendar size={14} />, label: 'Panen', value: format(new Date(product.harvestDate), 'd MMM yyyy', { locale: idLocale }) },
                    { icon: <Warehouse size={14} />, label: 'Penyimpanan', value: product.storageMethod },
                  ].map(item => (
                    <div key={item.label} style={{ background: 'var(--nt-bg)', borderRadius: 8, padding: '0.625rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', color: 'var(--nt-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--nt-green)' }}>{item.icon}</span> {item.label}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--nt-text)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {product.description && (
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nt-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Deskripsi</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--nt-text)', lineHeight: 1.7 }}>{product.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Offers */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                Penawaran Masuk
                {pendingOffers.length > 0 && (
                  <span className="badge badge-gold" style={{ marginLeft: '0.5rem' }}>{pendingOffers.length} Baru</span>
                )}
              </h2>
            </div>

            {offers.length === 0 ? (
              <div className="card" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--nt-text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📬</div>
                <p style={{ fontWeight: 600 }}>Belum ada penawaran</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Pengolah akan mengirimkan penawaran ketika tertarik dengan produk Anda.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pendingOffers.length > 0 && (
                  <>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nt-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Menunggu Respons ({pendingOffers.length})
                    </div>
                    {pendingOffers.map(o => (
                      <OfferCard key={o.id} offer={o}
                        buyer={users.find(u => u.id === o.buyerId)}
                        onAccept={product.status === 'aktif' ? handleAccept : undefined}
                        onReject={product.status === 'aktif' ? handleReject : undefined}
                      />
                    ))}
                  </>
                )}
                {otherOffers.length > 0 && (
                  <>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--nt-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.5rem' }}>
                      Riwayat Penawaran ({otherOffers.length})
                    </div>
                    {otherOffers.map(o => (
                      <OfferCard key={o.id} offer={o}
                        buyer={users.find(u => u.id === o.buyerId)}
                        readonly
                      />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
