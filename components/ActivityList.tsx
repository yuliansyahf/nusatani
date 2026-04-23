'use client';

import { useState } from 'react';
import { 
  HiDocumentText, 
  HiUserGroup, 
  HiCheckCircle, 
  HiClipboardList, 
  HiChat 
} from 'react-icons/hi';

const activities = [
  { id: 1, type: 'penawaran', title: 'Penawaran dikirim ke Petani Darman', detail: 'Bahan Baku Singkong 500kg - Rp 2.500.000', time: 'Hari ini, 07:55', icon: HiDocumentText },
  { id: 2, type: 'penawaran', title: 'Deal berhasil dengan Kel. Tani Stecu', detail: 'Menawarkan jahe merah 80kg - harga nego', time: 'Hari ini, 05:28', icon: HiUserGroup },
  { id: 3, type: 'transaksi', title: 'Penawaran diterima untuk komoditas jagung', detail: 'Harga disepakati - Rp 4.200/kg', time: 'Hari ini, 00:57', icon: HiCheckCircle },
  { id: 4, type: 'transaksi', title: 'Pesanan aktif #NT-2305', detail: 'Pengiriman beras medium - estimasi tiba besok', time: 'Kemarin, 16:55', icon: HiClipboardList, note: 'Keterangan: 16:55' },
];

export default function ActivityList() {
  const [filter, setFilter] = useState('semua');

  const filtered = filter === 'semua' ? activities : activities.filter(a => a.type === filter);

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-green-100">
      <div className="flex justify-between items-center mb-3 md:mb-4 flex-wrap gap-2">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">📋 Aktivitas Terbaru</h3>
        <button className="text-[10px] md:text-xs text-green-600 hover:text-green-700">Lihat Semua </button>
      </div>

      <div className="flex gap-3 md:gap-4 border-b border-green-100 mb-3 md:mb-4 overflow-x-auto">
        {['semua', 'penawaran', 'transaksi', 'pesan'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-2 text-xs md:text-sm font-medium capitalize whitespace-nowrap ${
              filter === tab ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'
            }`}
          >
            {tab === 'semua' ? 'Semua' : tab}
          </button>
        ))}
      </div>

      <div className="space-y-2 md:space-y-3 max-h-[350px] md:max-h-[400px] overflow-y-auto">
        {filtered.map((item) => (
          <div key={item.id} className="flex gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-green-50 transition cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center text-green-600">
              <item.icon className="text-base md:text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-xs md:text-sm truncate">{item.title}</p>
              <p className="text-[10px] md:text-xs text-gray-500 truncate">{item.detail}</p>
              {item.note && <p className="text-[10px] md:text-xs text-orange-500 mt-0.5 md:mt-1">{item.note}</p>}
            </div>
            <div className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}