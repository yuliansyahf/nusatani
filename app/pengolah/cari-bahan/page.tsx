'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { HiArrowLeft, HiSearch } from 'react-icons/hi';

export default function CariBahanPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const results = [
    { name: 'Singkong', petani: 'Petani Darman', harga: 'Rp 5.000/kg', stok: '500 kg' },
    { name: 'Jagung', petani: 'Kel. Tani Makmur', harga: 'Rp 4.200/kg', stok: '1.000 kg' },
    { name: 'Kedelai', petani: 'Gabungan Tani Sejahtera', harga: 'Rp 8.000/kg', stok: '200 kg' },
  ];

  const filteredResults = results.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Cari Bahan Baku" />

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
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #f0f0f0',
                flexWrap: 'wrap',
                gap: '1rem',
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
                  <HiSearch style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
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
                    Cari Bahan Baku
                  </h1>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#8a9e8d',
                      margin: '0.2rem 0 0',
                    }}
                  >
                    Temukan komoditas dari petani terdekat
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <HiSearch
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aaa',
                    fontSize: '1rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="Cari komoditas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 30,
                    fontSize: '0.85rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2a7a3b')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                />
              </div>
            </div>

            {/* Daftar Hasil Pencarian */}
            <div style={{ padding: '0.5rem 0' }}>
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      router.push(`/pengolah/buat-penawaran?produk=${encodeURIComponent(item.name)}`)
                    }
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1rem 1.5rem',
                      borderBottom:
                        idx < filteredResults.length - 1 ? '1px solid #f7f7f7' : 'none',
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
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: '#8a9e8d',
                          margin: '0.2rem 0 0',
                        }}
                      >
                        Petani: {item.petani} | Stok: {item.stok}
                      </p>
                    </div>
                    <div style={{ minWidth: '100px' }}>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/pengolah/buat-penawaran?produk=${encodeURIComponent(item.name)}`);
                      }}
                      style={{
                        background: '#2a7a3b',
                        border: 'none',
                        borderRadius: 30,
                        padding: '0.5rem 1.2rem',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = '#1a5c28')}
                      onMouseOut={(e) => (e.currentTarget.style.background = '#2a7a3b')}
                    >
                      Buat Penawaran
                    </button>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#8a9e8d',
                    fontSize: '0.85rem',
                  }}
                >
                  Tidak ada hasil untuk "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}