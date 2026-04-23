'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Topbar from '@/components/layout/Topbar';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { getTransactionsByFarmer, getProducts, getUsers } from '@/lib/storage';
import { Transaction, Product, User } from '@/types';

export default function PetaniRiwayatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    setTransactions(getTransactionsByFarmer(user.id));
    setProducts(getProducts());
    setUsers(getUsers());
  }, [user]);

  if (!user) return null;

  const totalEarning = transactions
    .filter(t => t.status === 'completed')
    .reduce((s, t) => s + t.farmerEarning, 0);

  return (
    <>
      <Topbar title="Riwayat Transaksi" />
      <div className="page-content">
        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
          {[
            { label: 'Total Transaksi', value: transactions.length, color: 'var(--nt-green)', bg: 'var(--nt-green-50)' },
            { label: 'Transaksi Selesai', value: transactions.filter(t => t.status === 'completed').length, color: '#0891b2', bg: '#ecfeff' },
            { label: 'Total Pendapatan', value: `Rp ${totalEarning.toLocaleString('id-ID')}`, color: '#f5a623', bg: '#fef6e7' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}22`, borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.375rem' }}>{s.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--nt-text)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <TransactionTable
          transactions={transactions}
          role="petani"
          users={users}
          products={products}
        />
      </div>
    </>
  );
}
