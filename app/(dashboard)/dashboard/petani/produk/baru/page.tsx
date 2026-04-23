'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Topbar from '@/components/layout/Topbar';
import { upsertProduct } from '@/lib/storage';
import { Product } from '@/types';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const CATEGORIES = ['cabai', 'padi', 'jagung', 'tomat', 'sayuran', 'buah', 'kedelai', 'singkong', 'kentang', 'lainnya'];
const STORAGE_METHODS = ['Suhu ruang', 'Pendingin', 'Karung goni', 'Gudang kering', 'Lainnya'];

export default function PetaniProdukBaruPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', category: 'padi', quantityKg: '', pricePerKg: '',
    location: user?.address || '', description: '', imageUrl: '',
    harvestDate: '', storageMethod: 'Suhu ruang'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update(field: string, val: string) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama produk wajib diisi';
    if (!form.quantityKg || isNaN(+form.quantityKg) || +form.quantityKg <= 0) e.quantityKg = 'Jumlah harus > 0';
    if (!form.pricePerKg || isNaN(+form.pricePerKg) || +form.pricePerKg <= 0) e.pricePerKg = 'Harga harus > 0';
    if (!form.location.trim()) e.location = 'Lokasi wajib diisi';
    if (!form.harvestDate) e.harvestDate = 'Tanggal panen wajib diisi';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!user) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate async

    const product: Product = {
      id: `p_${Date.now()}`,
      farmerId: user.id,
      name: form.name,
      category: form.category,
      quantityKg: +form.quantityKg,
      pricePerKg: +form.pricePerKg,
      location: form.location,
      description: form.description,
      imageUrl: form.imageUrl || `https://placehold.co/400x300/e8f5e9/2a7a3b?text=${encodeURIComponent(form.name)}`,
      harvestDate: form.harvestDate,
      storageMethod: form.storageMethod,
      status: 'aktif',
      createdAt: new Date().toISOString(),
    };

    upsertProduct(product);
    toast.success('Produk berhasil ditambahkan! 🌱');
    setLoading(false);
    router.push('/dashboard/petani/produk');
  }

  const Field = ({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) => (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );

  return (
    <>
      <Topbar title="Jual Panen Baru" />
      <div className="page-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Link href="/dashboard/petani/produk" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Kembali
          </Link>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Detail Produk Panen</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--nt-text-muted)', marginTop: '0.25rem' }}>
                Isi informasi produk panen Anda agar mudah ditemukan pengolah.
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Field label="Nama Produk *" id="name" error={errors.name}>
                  <input id="name" className="form-input" placeholder="Contoh: Cabai Merah Keriting Gagal Panen"
                    value={form.name} onChange={e => update('name', e.target.value)} />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <Field label="Kategori *" id="category">
                    <select id="category" className="form-select" value={form.category} onChange={e => update('category', e.target.value)}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                    </select>
                  </Field>
                  <Field label="Tanggal Panen *" id="harvestDate" error={errors.harvestDate}>
                    <input id="harvestDate" type="date" className="form-input"
                      value={form.harvestDate} onChange={e => update('harvestDate', e.target.value)} />
                  </Field>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <Field label="Jumlah (kg) *" id="quantityKg" error={errors.quantityKg}>
                    <input id="quantityKg" type="number" className="form-input" placeholder="500"
                      value={form.quantityKg} onChange={e => update('quantityKg', e.target.value)} min="1" />
                  </Field>
                  <Field label="Harga per kg (Rp) *" id="pricePerKg" error={errors.pricePerKg}>
                    <input id="pricePerKg" type="number" className="form-input" placeholder="3500"
                      value={form.pricePerKg} onChange={e => update('pricePerKg', e.target.value)} min="1" />
                  </Field>
                </div>

                <Field label="Lokasi *" id="location" error={errors.location}>
                  <input id="location" className="form-input" placeholder="Kabupaten, Provinsi"
                    value={form.location} onChange={e => update('location', e.target.value)} />
                </Field>

                <Field label="Metode Penyimpanan" id="storageMethod">
                  <select id="storageMethod" className="form-select" value={form.storageMethod} onChange={e => update('storageMethod', e.target.value)}>
                    {STORAGE_METHODS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </Field>

                <Field label="Deskripsi Produk" id="description">
                  <textarea id="description" className="form-textarea"
                    placeholder="Jelaskan kondisi produk, alasan gagal sortasi, kegunaan potensial, dll."
                    value={form.description} onChange={e => update('description', e.target.value)}
                    style={{ minHeight: 120 }} />
                </Field>

                <Field label="URL Foto Produk (opsional)" id="imageUrl">
                  <input id="imageUrl" className="form-input" placeholder="https://..."
                    value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--nt-text-muted)', marginTop: '0.25rem' }}>
                    Kosongkan untuk menggunakan gambar placeholder otomatis.
                  </span>
                </Field>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <Link href="/dashboard/petani/produk" className="btn btn-ghost" style={{ textDecoration: 'none' }}>Batal</Link>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : <Upload size={18} />}
                    {loading ? 'Menyimpan...' : 'Publikasikan Produk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
