'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { HiArrowLeft, HiDocumentText, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';

export default function PenawaranPage() {
  const router = useRouter();

  // Data contoh penawaran
  const penawaran = [
    {
      id: 'PW-001',
      komoditas: 'Singkong',
      jumlah: '500 kg',
      harga: 'Rp 2.500.000',
      petani: 'Petani Darman',
      status: 'Menunggu Respon',
      statusClass: 'bg-yellow-100 text-yellow-700',
      tanggal: '15 Apr 2025',
    },
    {
      id: 'PW-002',
      komoditas: 'Jagung',
      jumlah: '1.000 kg',
      harga: 'Rp 4.200.000',
      petani: 'Kel. Tani Makmur',
      status: 'Diterima',
      statusClass: 'bg-green-100 text-green-700',
      tanggal: '12 Apr 2025',
    },
    {
      id: 'PW-003',
      komoditas: 'Kedelai',
      jumlah: '200 kg',
      harga: 'Rp 1.600.000',
      petani: 'Gabungan Tani Sejahtera',
      status: 'Ditolak',
      statusClass: 'bg-red-100 text-red-700',
      tanggal: '10 Apr 2025',
    },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'Menunggu Respon') return <HiClock style={{ fontSize: '0.9rem' }} />;
    if (status === 'Diterima') return <HiCheckCircle style={{ fontSize: '0.9rem' }} />;
    return <HiXCircle style={{ fontSize: '0.9rem' }} />;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Penawaran Saya" />

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
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
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
                <HiDocumentText style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a2e1c',
                    margin: 0,
                  }}
                >
                  Penawaran Saya
                </h1>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#8a9e8d',
                    margin: '0.2rem 0 0',
                  }}
                >
                  Daftar semua penawaran yang telah Anda kirim
                </p>
              </div>
            </div>

            {/* Daftar Penawaran */}
            <div style={{ padding: '0.5rem 0' }}>
              {penawaran.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/pengolah/penawaran/${item.id}`)}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    borderBottom: idx < penawaran.length - 1 ? '1px solid #f7f7f7' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#f8fdf8')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ flex: '2', minWidth: '180px' }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#1a2e1c',
                        margin: 0,
                      }}
                    >
                      {item.komoditas} • {item.jumlah}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#8a9e8d',
                        margin: '0.2rem 0 0',
                      }}
                    >
                      Kepada: {item.petani} • {item.tanggal}
                    </p>
                  </div>
                  <div style={{ minWidth: '120px' }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a5c28',
                        margin: 0,
                      }}
                    >
                      {item.harga}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: item.statusClass.split(' ')[0],
                      color: item.statusClass.split(' ')[1],
                      borderRadius: 30,
                      padding: '0.3rem 0.8rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {getStatusIcon(item.status)}
                    <span>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Jika tidak ada data */}
            {penawaran.length === 0 && (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#8a9e8d',
                  fontSize: '0.85rem',
                }}
              >
                Belum ada penawaran yang dikirim.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}