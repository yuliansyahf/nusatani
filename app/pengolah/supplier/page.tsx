'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { HiArrowLeft, HiTruck } from 'react-icons/hi';

export default function SupplierPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSidebarOpen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <HiTruck className="text-2xl text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Supplier Aktif</h1>
            </div>
            <p className="text-gray-500">Daftar supplier/petani yang aktif bekerja sama dengan Anda.</p>
            
            <div className="mt-6 space-y-3">
              <div className="border border-gray-100 rounded-xl p-4 hover:bg-green-50 transition">
                <p className="font-medium text-gray-800">Petani Darman</p>
                <p className="text-sm text-gray-500">Komoditas: Singkong, Jagung</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 hover:bg-green-50 transition">
                <p className="font-medium text-gray-800">Kel. Tani Makmur</p>
                <p className="text-sm text-gray-500">Komoditas: Jagung, Kedelai</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 hover:bg-green-50 transition">
                <p className="font-medium text-gray-800">Gabungan Tani Sejahtera</p>
                <p className="text-sm text-gray-500">Komoditas: Kedelai, Jahe</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}