'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import {
  HiArrowLeft,
  HiClipboardList,
  HiShoppingBag,
  HiTruck,
  HiCreditCard,
  HiCheckCircle,
  HiClock,
  HiEye,
  HiLocationMarker,
} from 'react-icons/hi';

export default function PesananPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('semua');

  const orders = [
    { id: 'PO-2401', petani: 'Petani Darman', komoditas: 'Singkong', jumlah: '500 kg', total: 'Rp 2.500.000', status: 'Dikemas', statusClass: 'bg-blue-100 text-blue-700', estimasi: '2 hari lagi', lokasi: 'Gudang Bintan' },
    { id: 'PO-2402', petani: 'Kel. Tani Makmur', komoditas: 'Jagung', jumlah: '1.000 kg', total: 'Rp 4.200.000', status: 'Dalam Perjalanan', statusClass: 'bg-purple-100 text-purple-700', estimasi: 'Besok tiba', lokasi: 'Dalam perjalanan' },
    { id: 'PO-2403', petani: 'Gabungan Tani Sejahtera', komoditas: 'Kedelai', jumlah: '200 kg', total: 'Rp 1.600.000', status: 'Menunggu Pembayaran', statusClass: 'bg-yellow-100 text-yellow-700', estimasi: 'Menunggu konfirmasi', lokasi: '-' },
  ];

  const stats = [
    { label: 'Total Pesanan', value: orders.length, icon: HiClipboardList, color: '#2a7a3b' },
    { label: 'Dalam Pengiriman', value: orders.filter(o => o.status === 'Dalam Perjalanan').length, icon: HiTruck, color: '#e67e22' },
    { label: 'Selesai', value: orders.filter(o => o.status === 'Dikemas' || o.status === 'Selesai').length, icon: HiCheckCircle, color: '#2a7a3b' },
  ];

  const filteredOrders = activeTab === 'semua' ? orders : orders.filter(o => {
    if (activeTab === 'dikemas') return o.status === 'Dikemas';
    if (activeTab === 'perjalanan') return o.status === 'Dalam Perjalanan';
    if (activeTab === 'bayar') return o.status === 'Menunggu Pembayaran';
    return true;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Pesanan Aktif" />

        <div className="page-content">
          {/* Tombol Kembali */}
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#2a7a3b',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginBottom: '1.25rem',
              padding: '0.25rem 0',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#1a5c28')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#2a7a3b')}
          >
            <HiArrowLeft style={{ fontSize: '1rem' }} /> Kembali
          </button>

          {/* Kartu Statistik */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1rem',
                  border: '1px solid #efefef',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#e8f5eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <stat.icon style={{ color: stat.color, fontSize: '1.3rem' }} />
                </div>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a2e1c', margin: 0 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#8a9e8d', margin: 0 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Kartu Utama */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #efefef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Header dengan Tab */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: '#e8f5eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <HiShoppingBag style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
                  </div>
                  <div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a2e1c', margin: 0 }}>
                      Pesanan Aktif
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: '#8a9e8d', margin: '0.2rem 0 0' }}>
                      Daftar pesanan yang sedang berjalan
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                  {['semua', 'dikemas', 'perjalanan', 'bayar'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: '0.4rem 1rem',
                        borderRadius: 30,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        background: activeTab === tab ? '#2a7a3b' : '#f0f0f0',
                        color: activeTab === tab ? '#fff' : '#666',
                        transition: 'all 0.2s',
                      }}
                    >
                      {tab === 'semua' ? 'Semua' : tab === 'dikemas' ? 'Dikemas' : tab === 'perjalanan' ? 'Perjalanan' : 'Pembayaran'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daftar Pesanan */}
            <div style={{ padding: '0.5rem 0' }}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <div
                    key={order.id}
                    onClick={() => router.push(`/pengolah/pesanan/${order.id}`)}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1rem 1.5rem',
                      borderBottom: idx < filteredOrders.length - 1 ? '1px solid #f7f7f7' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.12s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = '#f8fdf8')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ flex: '2', minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a2e1c', margin: 0 }}>
                          {order.komoditas} • {order.jumlah}
                        </p>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#aaa' }}>{order.id}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#8a9e8d', margin: '0.2rem 0 0' }}>
                        Petani: {order.petani}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
                        <HiLocationMarker style={{ fontSize: '0.7rem', color: '#aaa' }} />
                        <p style={{ fontSize: '0.7rem', color: '#aaa', margin: 0 }}>{order.lokasi}</p>
                      </div>
                    </div>
                    <div style={{ minWidth: '120px' }}>
                      <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1a5c28', margin: 0 }}>
                        {order.total}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: '#8a9e8d', margin: '0.1rem 0 0' }}>
                        Estimasi: {order.estimasi}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: order.statusClass.split(' ')[0],
                        color: order.statusClass.split(' ')[1],
                        borderRadius: 30,
                        padding: '0.3rem 0.8rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {order.status === 'Dikemas' && <HiClock style={{ fontSize: '0.8rem' }} />}
                      {order.status === 'Dalam Perjalanan' && <HiTruck style={{ fontSize: '0.8rem' }} />}
                      {order.status === 'Menunggu Pembayaran' && <HiCreditCard style={{ fontSize: '0.8rem' }} />}
                      <span>{order.status}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/pengolah/pesanan/${order.id}`);
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid #2a7a3b',
                        borderRadius: 30,
                        padding: '0.4rem 0.8rem',
                        color: '#2a7a3b',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#2a7a3b';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#2a7a3b';
                      }}
                    >
                      <HiEye /> Detail
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#8a9e8d', fontSize: '0.85rem' }}>
                  Tidak ada pesanan dengan status ini.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}