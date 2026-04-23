'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import {
  HiArrowLeft,
  HiUserGroup,
  HiCheckCircle,
} from 'react-icons/hi';

export default function DealPage() {
  const router = useRouter();

  // Data contoh transaksi deal berhasil
  const deals = [
    {
      id: 'DL-001',
      petani: 'Kel. Tani Makmur',
      komoditas: 'Jagung',
      jumlah: '1.000 kg',
      total: 'Rp 4.200.000',
      status: 'Selesai',
      tanggal: '12 Apr 2025',
    },
    {
      id: 'DL-002',
      petani: 'Petani Darman',
      komoditas: 'Singkong',
      jumlah: '500 kg',
      total: 'Rp 2.500.000',
      status: 'Selesai',
      tanggal: '10 Apr 2025',
    },
    {
      id: 'DL-003',
      petani: 'Gabungan Tani Sejahtera',
      komoditas: 'Kedelai',
      jumlah: '200 kg',
      total: 'Rp 1.600.000',
      status: 'Selesai',
      tanggal: '8 Apr 2025',
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Deal Berhasil" />

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

          {/* Kartu utama */}
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
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
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
                  <HiUserGroup style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
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
                    Deal Berhasil
                  </h1>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#8a9e8d',
                      margin: '0.2rem 0 0',
                    }}
                  >
                    Daftar transaksi yang telah berhasil deal dengan petani
                  </p>
                </div>
              </div>
            </div>

            {/* Daftar Deal */}
            <div style={{ padding: '0.5rem 0' }}>
              {deals.map((deal, idx) => (
                <div
                  key={deal.id}
                  onClick={() => router.push(`/pengolah/deal/${deal.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    borderBottom:
                      idx < deals.length - 1 ? '1px solid #f7f7f7' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#f8fdf8')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Icon lingkaran hijau dengan centang */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      background: '#e8f5eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <HiCheckCircle style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
                  </div>

                  {/* Informasi deal */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: '#1a2e1c',
                          margin: 0,
                        }}
                      >
                        {deal.komoditas} • {deal.jumlah}
                      </p>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: '#8a9e8d',
                          background: '#f0f0f0',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 20,
                        }}
                      >
                        {deal.tanggal}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#4a5568',
                        margin: '0.25rem 0 0',
                      }}
                    >
                      {deal.petani}
                    </p>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#1a5c28',
                        margin: '0.3rem 0 0',
                      }}
                    >
                      {deal.total}
                    </p>
                  </div>

                  {/* Badge status */}
                  <div
                    style={{
                      background: '#e6f7ec',
                      color: '#2a7a3b',
                      borderRadius: 30,
                      padding: '0.2rem 0.8rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {deal.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Jika tidak ada data */}
            {deals.length === 0 && (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#8a9e8d',
                  fontSize: '0.85rem',
                }}
              >
                Belum ada deal berhasil.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}