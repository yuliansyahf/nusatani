import { HiSearch, HiDocumentText, HiChatAlt2, HiClipboardList, HiOfficeBuilding, HiQuestionMarkCircle } from 'react-icons/hi';

const menus = [
  { name: 'Cari Bahan Baku', icon: <HiSearch className="text-3xl" />, description: 'Laporan Dikirim' },
  { name: 'Penawaran Saya', icon: <HiDocumentText className="text-3xl" />, description: 'Penawaran Aktif' },
  { name: 'Chat', icon: <HiChatAlt2 className="text-3xl" />, description: 'Chat dengan petani' },
  { name: 'Pesanan Aktif', icon: <HiClipboardList className="text-3xl" />, description: 'Lihat pesanan berjalan' },
  { name: 'Profil Perusahaan', icon: <HiOfficeBuilding className="text-3xl" />, description: 'Kelola data perusahaan' },
  { name: 'Bantuan', icon: <HiQuestionMarkCircle className="text-3xl" />, description: 'Pusat solusi' },
];

export default function MenuGrid() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-green-600">📌 MENU UTAMA</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {menus.map((menu) => (
          <button
            key={menu.name}
            className="bg-white rounded-2xl p-4 text-center border border-green-100 hover:border-green-300 hover:shadow-md transition group"
          >
            <div className="flex justify-center mb-2 text-green-600 group-hover:scale-110 transition">
              {menu.icon}
            </div>
            <p className="font-semibold text-sm text-gray-700">{menu.name}</p>
            <p className="text-xs text-gray-400 mt-1">{menu.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}