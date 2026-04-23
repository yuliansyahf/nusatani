'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiHome,
  HiShoppingBag,
  HiChatAlt2,
  HiBell,
  HiChevronDown,
} from 'react-icons/hi';

export default function SidebarPetani() {
  const pathname = usePathname();

  const menu = [
    { name: 'Beranda', href: '/petani/dashboard', icon: HiHome },
    { name: 'Marketplace', href: '/petani/marketplace', icon: HiShoppingBag },
    { name: 'Pesan', href: '/petani/pesan', icon: HiChatAlt2, badge: 3 },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-8 lg:px-12 h-20 items-center justify-between shadow-sm">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo-petani.png"
            alt="Logo"
            className="w-11 h-11 object-contain"
          />

          <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
            NusaTani
          </h1>
        </div>

        {/* Menu Tengah */}
        <nav className="flex items-center gap-10">
          {menu.map((item, i) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={i}
                href={item.href}
                className={`relative flex items-center gap-2 font-semibold transition ${
                  active
                    ? 'text-green-700'
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                <Icon className="text-xl" />
                {item.name}

                {item.badge && (
                  <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Kanan */}
        <div className="flex items-center gap-5">
          <button className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-sm">
            + Jual Panen
          </button>

          <div className="relative">
            <HiBell className="text-2xl text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/avatar-petani.png"
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-green-500 object-cover"
            />
            <HiChevronDown className="text-gray-400 text-xl" />
          </div>
        </div>
      </header>

      {/* MOBILE NAVBAR */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="/logo-petani.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-green-700 text-xl">
            NusaTani
          </span>
        </div>

        <img
          src="/avatar-petani.png"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-green-500"
        />
      </header>
    </>
  );
}