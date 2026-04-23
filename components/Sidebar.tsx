'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiHome,
  HiShoppingBag,
  HiChartBar,
  HiCog,
  HiSearch,
  HiDocumentText,
  HiClipboardList,
  HiChatAlt2,
  HiOfficeBuilding,
} from 'react-icons/hi';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r border-green-100 shadow-lg z-40 overflow-y-auto flex flex-col">

      {/* LOGO */}
      <div className="flex justify-center py-6">
        <div className="w-48 h-20">
          <img
            src="/asset/nusatani.svg"
            alt="NusaTani Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="px-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          MAIN NAVIGATION
        </div>

        <Link
          href="/pengolah/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition ${pathname === '/pengolah/dashboard'
              ? 'bg-green-50 text-green-700 font-semibold'
              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
        >
          <HiHome className="text-xl" />
          <span className="text-sm">Beranda</span>
        </Link>

        <Link
          href="/pengolah/marketplace"
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <HiShoppingBag className="text-xl" />
          <span className="text-sm">Marketplace</span>
        </Link>

        <Link
          href="/pengolah/laporan"
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <HiChartBar className="text-xl" />
          <span className="text-sm">Laporan</span>
        </Link>

        <Link
          href="/pengolah/pengaturan"
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <HiCog className="text-xl" />
          <span className="text-sm">Pengaturan</span>
        </Link>
      </div>

      {/* FITUR CEPAT */}
      <div className="px-4 py-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          FITUR CEPAT
        </div>

        <Link
          href="/pengolah/cari-bahan"
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <HiSearch className="text-xl" />
          <span className="text-sm">Cari Bahan Baku</span>
        </Link>

        <Link
          href="/pengolah/penawaran"
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <HiDocumentText className="text-xl" />
          <span className="text-sm">Penawaran Saya</span>
        </Link>

        <Link
          href="/pengolah/pesanan"
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <HiClipboardList className="text-xl" />
          <span className="text-sm">Pesanan Aktif</span>
        </Link>

        <Link
          href="/pengolah/chat"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition ${pathname === '/pengolah/chat'
              ? 'bg-green-50 text-green-700 font-semibold'
              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
        >
          <HiChatAlt2 className="text-xl" />
          <span className="text-sm">Chat</span>
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* FOOTER BARU */}
      <div className="p-3">
        <div className="bg-green-50 rounded-2xl px-3 py-3 flex items-center gap-2.5">

          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center shrink-0">
            <HiOfficeBuilding className="text-white text-lg" />
          </div>

          <div className="leading-tight">
            <h3 className="text-sm font-bold text-green-800">
              PT Grow Garden
            </h3>

            <p className="text-xs text-green-700">
              Pengolah - Premium
            </p>
          </div>

        </div>
      </div>
    </aside>
  );
}