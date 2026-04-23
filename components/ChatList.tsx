'use client';

import { HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
// Atau bisa pakai dari react-icons/fa
// import { FaStore, FaLeaf, FaUsers } from 'react-icons/fa';

const chats = [
  { id: 1, name: 'Dikel. Nadi Pasar "Segar"', message: 'Selamat pagi, pak. Untuk punya banyak kredisi...', time: 'Hari ini', avatar: HiOutlineOfficeBuilding, unread: true, responseRate: '86%' },
  { id: 2, name: 'Petani Binaan Lestari', message: 'Kami ada panen pisang kepok 300kg, harga kompetitif', time: 'Hari ini', avatar: HiOutlineUser, unread: false, responseRate: '74%' },
  { id: 3, name: 'Gabungan Tani Sejahtera', message: 'Bisa kirim sampel jahe merah? butuh 150kg', time: 'Kemarin', avatar: HiOutlineUsers, unread: false, responseRate: '92%' },
];

export default function ChatList() {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-green-100">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">💬 Chat</h3>
        <button className="text-[10px] md:text-xs text-green-600 hover:text-green-700">Lihat Semua </button>
      </div>

      <div className="bg-green-50 rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 md:py-2 mb-3 md:mb-4 text-[10px] md:text-xs text-green-700">
        ℹ️ <strong>Apa arti persentase?</strong> = Response Rate (tingkat balasan pesan dari petani)
      </div>

      <div className="space-y-2 md:space-y-3 max-h-[350px] md:max-h-[400px] overflow-y-auto">
        {chats.map((chat) => (
          <div key={chat.id} className="flex gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-green-50 transition cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <chat.avatar className="text-base md:text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 md:gap-2">
                <p className="font-medium text-gray-800 text-xs md:text-sm truncate">{chat.name}</p>
                {chat.unread && <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>}
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 truncate">{chat.message}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] md:text-xs text-gray-400">{chat.time}</div>
              <div className="text-[10px] md:text-xs font-medium text-green-600 bg-green-100 px-1.5 md:px-2 py-0.5 rounded-full mt-0.5 md:mt-1">
                {chat.responseRate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}