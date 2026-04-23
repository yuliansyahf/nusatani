'use client';

import { HiCheckCircle, HiTruck, HiClock, HiCube, HiUserGroup, HiShoppingBag } from 'react-icons/hi';

const orders = [
  { 
    id: 'PO-2401', 
    petani: 'Petani Darman', 
    komoditas: 'Singkong', 
    jumlah: '500 kg', 
    totalHarga: 'Rp 2.500.000', 
    status: 'Dikemas', 
    estimasi: '2 hari lagi', 
    icon: HiCube, 
    statusColor: 'bg-yellow-100 text-yellow-700' 
  },
  { 
    id: 'PO-2402', 
    petani: 'Kel. Tani Makmur', 
    komoditas: 'Jagung', 
    jumlah: '1.000 kg', 
    totalHarga: 'Rp 4.200.000', 
    status: 'Dalam Perjalanan', 
    estimasi: 'Besok tiba', 
    icon: HiTruck, 
    statusColor: 'bg-blue-100 text-blue-700' 
  },
  { 
    id: 'PO-2403', 
    petani: 'Gabungan Tani Sejahtera', 
    komoditas: 'Kedelai', 
    jumlah: '200 kg', 
    totalHarga: 'Rp 1.600.000', 
    status: 'Menunggu Pembayaran', 
    estimasi: 'Menunggu konfirmasi', 
    icon: HiClock, 
    statusColor: 'bg-orange-100 text-orange-700' 
  },
];

export default function OrderList() {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-green-100">
      <div className="flex justify-between items-center mb-3 md:mb-4 flex-wrap gap-2">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">📦 Pesanan Aktif</h3>
        <button className="text-[10px] md:text-xs text-green-600 hover:text-green-700 transition">
          Lihat Semua
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-green-100">
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">ID</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">Petani</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">Komoditas</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">Jumlah</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">Total</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">Status</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">Estimasi</th>
             </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="border-b border-green-50 hover:bg-green-50 transition cursor-pointer"
                onClick={() => alert(`Detail pesanan: ${order.id}`)}
              >
                <td className="py-3 px-2 font-medium text-gray-800 text-xs">{order.id}</td>
                <td className="py-3 px-2 text-gray-600 text-xs">{order.petani}</td>
                <td className="py-3 px-2 text-gray-600 text-xs">{order.komoditas}</td>
                <td className="py-3 px-2 text-gray-600 text-xs">{order.jumlah}</td>
                <td className="py-3 px-2 text-gray-600 text-xs">{order.totalHarga}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-500 text-[10px]">{order.estimasi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-3">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-green-50 rounded-xl p-3 cursor-pointer hover:bg-green-100 transition"
            onClick={() => alert(`Detail pesanan: ${order.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <order.icon className="text-green-600 text-base" />
                <span className="font-semibold text-gray-800 text-sm">{order.id}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${order.statusColor}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <p><span className="text-gray-500">Petani:</span> {order.petani}</p>
              <p><span className="text-gray-500">Komoditas:</span> {order.komoditas} ({order.jumlah})</p>
              <p><span className="text-gray-500">Total:</span> {order.totalHarga}</p>
              <p><span className="text-gray-500">Estimasi:</span> {order.estimasi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}