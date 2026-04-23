'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { HiArrowLeft, HiChartBar, HiDocumentDownload } from 'react-icons/hi';

export default function LaporanPage() {
  const router = useRouter();

  const laporanData = [
    { tanggal: '01/04/2024', id: '#TRX-001', komoditas: 'Singkong', jumlah: '500 kg', total: 'Rp 2.500.000', status: 'Selesai', statusClass: 'bg-green-100 text-green-700' },
    { tanggal: '15/03/2024', id: '#TRX-002', komoditas: 'Jagung', jumlah: '1.000 kg', total: 'Rp 4.200.000', status: 'Selesai', statusClass: 'bg-green-100 text-green-700' },
    { tanggal: '10/03/2024', id: '#TRX-003', komoditas: 'Kedelai', jumlah: '200 kg', total: 'Rp 1.600.000', status: 'Proses', statusClass: 'bg-yellow-100 text-yellow-700' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Laporan" />

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

          {/* Kartu Laporan */}
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
                  <HiChartBar style={{ color: '#2a7a3b', fontSize: '1.3rem' }} />
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
                    Laporan Transaksi
                  </h1>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#8a9e8d',
                      margin: '0.2rem 0 0',
                    }}
                  >
                    Lihat dan unduh laporan transaksi Anda
                  </p>
                </div>
              </div>

              {/* Filter & Export */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <select
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 30,
                    fontSize: '0.8rem',
                    background: '#fff',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option>Januari 2024</option>
                  <option>Februari 2024</option>
                  <option>Maret 2024</option>
                  <option>April 2024</option>
                </select>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#2a7a3b',
                    border: 'none',
                    borderRadius: 30,
                    padding: '0.5rem 1.2rem',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#1a5c28')}
                  onMouseOut={(e) => (e.currentTarget.style.background = '#2a7a3b')}
                >
                  <HiDocumentDownload /> Export PDF
                </button>
              </div>
            </div>

            {/* Tabel Laporan */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                    {['Tanggal', 'ID Transaksi', 'Komoditas', 'Jumlah', 'Total', 'Status'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.75rem 1.25rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#8a9e8d',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {laporanData.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => router.push(`/pengolah/laporan/${item.id}`)} // opsional detail
                      style={{
                        borderBottom: idx < laporanData.length - 1 ? '1px solid #f7f7f7' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = '#f8fdf8')}
                      onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '0.875rem 1.25rem', color: '#4a5568' }}>{item.tanggal}</td>
                      <td style={{ padding: '0.875rem 1.25rem', fontWeight: 600, color: '#2a7a3b', fontFamily: 'monospace' }}>{item.id}</td>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#1a2e1c' }}>{item.komoditas}</td>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#4a5568' }}>{item.jumlah}</td>
                      <td style={{ padding: '0.875rem 1.25rem', fontWeight: 600, color: '#1a2e1c' }}>{item.total}</td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${item.statusClass}`}
                          style={{ display: 'inline-block' }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {laporanData.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#8a9e8d', fontSize: '0.85rem' }}>
                Belum ada data laporan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}