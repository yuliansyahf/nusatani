'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { HiArrowLeft, HiQuestionMarkCircle, HiPhone, HiMail, HiBookOpen } from 'react-icons/hi';

export default function BantuanPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSidebarOpen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const faqs = [
    { q: 'Cara mencari bahan baku?', a: 'Gunakan menu "Cari Bahan Baku" dan filter sesuai kebutuhan.' },
    { q: 'Bagaimana cara mengirim penawaran?', a: 'Pilih komoditas, klik "Buat Penawaran", isi harga dan jumlah.' },
    { q: 'Cek status pesanan?', a: 'Buka menu "Pesanan Aktif" untuk melihat status terbaru.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`fixed inset-0 z-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
        <div className={`absolute left-0 top-0 h-full transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </div>
      </div>
      <div className="hidden lg:block"><Sidebar /></div>

      <main className="lg:ml-72 min-h-screen">
        <div className="p-6 md:p-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
            <HiArrowLeft /> Kembali
          </button>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><HiQuestionMarkCircle className="text-2xl text-green-600" /></div><h1 className="text-2xl font-bold text-gray-800">Pusat Bantuan</h1></div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4 text-center"><HiPhone className="text-2xl text-green-600 mx-auto mb-2" /><p className="font-medium">Call Center</p><p className="text-sm text-gray-500">+62 812 3456 7890</p></div>
              <div className="bg-green-50 rounded-xl p-4 text-center"><HiMail className="text-2xl text-green-600 mx-auto mb-2" /><p className="font-medium">Email</p><p className="text-sm text-gray-500">support@nusatani.com</p></div>
              <div className="bg-green-50 rounded-xl p-4 text-center"><HiBookOpen className="text-2xl text-green-600 mx-auto mb-2" /><p className="font-medium">Dokumentasi</p><p className="text-sm text-gray-500">Panduan lengkap</p></div>
            </div>
            
            <h2 className="font-semibold text-gray-800 mb-4">FAQ</h2>
            <div className="space-y-3">{faqs.map((faq, i) => (<div key={i} className="border border-gray-100 rounded-xl p-4"><p className="font-medium text-gray-800">{faq.q}</p><p className="text-sm text-gray-500 mt-1">{faq.a}</p></div>))}</div>
          </div>
        </div>
      </main>
    </div>
  );
}