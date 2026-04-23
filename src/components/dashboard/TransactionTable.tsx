'use client';

import { Transaction, User, Product } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface TransactionTableProps {
  transactions: Transaction[];
  role: 'petani' | 'pengolah';
  users: User[];
  products: Product[];
  onAction?: (txId: string, action: string) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  deal: { label: 'Menunggu Pembayaran', className: 'badge-gold' },
  paid: { label: 'Sudah Dibayar', className: 'badge-blue' },
  pickup_scheduled: { label: 'Siap Pickup', className: 'badge-purple' },
  in_transit: { label: 'Dalam Perjalanan', className: 'badge-gold' },
  completed: { label: 'Selesai', className: 'badge-green' },
};

export default function TransactionTable({ transactions, role, users, products, onAction }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--nt-text-muted)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📋</div>
        <p style={{ fontWeight: 600 }}>Belum ada transaksi</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Transaksi akan muncul di sini setelah deal terjadi.</p>
      </div>
    );
  }

  function getActionButton(tx: Transaction) {
    if (!onAction) return null;

    if (role === 'pengolah') {
      if (tx.status === 'deal') return (
        <button className="btn btn-primary btn-sm" onClick={() => onAction(tx.id, 'pay')}>
          💳 Bayar
        </button>
      );
      if (tx.status === 'in_transit') return (
        <button className="btn btn-gold btn-sm" onClick={() => onAction(tx.id, 'receive')}>
          ✅ Terima Barang
        </button>
      );
    }

    if (role === 'petani') {
      if (tx.status === 'paid') return (
        <button className="btn btn-primary btn-sm" onClick={() => onAction(tx.id, 'ship')}>
          🚛 Konfirmasi Pengiriman
        </button>
      );
    }

    return null;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Produk</th>
            <th>{role === 'petani' ? 'Pengolah' : 'Petani'}</th>
            <th>Total</th>
            {role === 'petani' && <th>Pendapatan Bersih</th>}
            <th>Tanggal</th>
            <th>Status</th>
            {onAction && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => {
            const product = products.find(p => p.id === tx.productId);
            const counterparty = users.find(u => u.id === (role === 'petani' ? tx.buyerId : tx.farmerId));
            const status = statusConfig[tx.status] ?? { label: tx.status, className: 'badge-gray' };

            return (
              <tr key={tx.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{product?.name ?? 'Produk'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--nt-text-muted)' }}>
                    {tx.finalPricePerKg.toLocaleString('id-ID')}/kg
                  </div>
                </td>
                <td style={{ fontSize: '0.875rem' }}>{counterparty?.name ?? '-'}</td>
                <td style={{ fontWeight: 700, color: 'var(--nt-text)' }}>
                  Rp {tx.totalAmount.toLocaleString('id-ID')}
                </td>
                {role === 'petani' && (
                  <td style={{ fontWeight: 700, color: 'var(--nt-green)' }}>
                    Rp {tx.farmerEarning.toLocaleString('id-ID')}
                  </td>
                )}
                <td style={{ fontSize: '0.825rem', color: 'var(--nt-text-muted)', whiteSpace: 'nowrap' }}>
                  {format(new Date(tx.createdAt), 'd MMM yyyy', { locale: id })}
                </td>
                <td>
                  <span className={`badge ${status.className}`}>{status.label}</span>
                </td>
                {onAction && <td>{getActionButton(tx)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
