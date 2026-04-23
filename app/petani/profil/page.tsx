// app/petani/profil/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
    HiHome, HiShoppingBag, HiBell, HiChevronDown, HiChatAlt2,
    HiUserCircle, HiPlusCircle, HiDocumentText, HiOutlineUserGroup,
    HiArrowLeft, HiPencil, HiCamera, HiMail, HiPhone, HiLocationMarker,
    HiCheckCircle, HiX, HiTrendingUp, HiShoppingBag as HiStatBag, HiUserGroup, HiEmojiHappy,
} from 'react-icons/hi';

export default function ProfilPage() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const [formData, setFormData] = useState({
        name: user?.name || 'Petani Nusantara',
        email: user?.email || 'petani@nusatani.com',
        phone: user?.phone || '+62 812 3456 7890',
        address: user?.address || 'Desa Sukamaju, Kec. Maju, Kab. Sejahtera',
        role: 'Petani · Aktif',
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const go = (path: string) => router.push(path);
    const isActive = (path: string) => pathname === path;

    const handleEditClick = () => setIsEditModalOpen(true);
    const handleCloseModal = () => setIsEditModalOpen(false);

    const handleSaveChanges = () => {
        // Update profil (integrasi API nanti)
        setIsEditModalOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'avatar') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'banner') setBannerUrl(reader.result as string);
                else setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push('/'); // arahkan ke beranda/homepage
    };

    const stats = [
        { value: '24', label: 'Total Penjualan', icon: HiStatBag, color: '#15803d' },
        { value: 'Rp 12.5Jt', label: 'Pendapatan', icon: HiTrendingUp, color: '#e67e22' },
        { value: '8', label: 'Pembeli Aktif', icon: HiUserGroup, color: '#15803d' },
        { value: '100%', label: 'Kepuasan', icon: HiEmojiHappy, color: '#15803d' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#fff', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
            {/* Toast Sukses */}
            {showSuccess && (
                <div style={{ position: 'fixed', top: '5rem', right: '2rem', zIndex: 1000, background: '#15803d', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 40, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '0.85rem', fontWeight: 500 }}>
                    <HiCheckCircle /> Profil berhasil diperbarui!
                </div>
            )}

            {/* ========== NAVBAR ========== */}
            <header style={{ position: 'fixed', top: 0, zIndex: 50, width: '100%', padding: scrolled ? '0.75rem 1.5rem' : '0', transition: 'padding 0.3s' }}>
                <div style={{ margin: '0 auto', maxWidth: 1280, background: '#fff', transition: 'all 0.3s', ...(scrolled ? { borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '0.75rem 1.5rem' } : { borderBottom: '1px solid #f3f4f6', padding: '1rem 2.5rem' }) }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => go('/petani/dashboard')}>
                            <div style={{ width: 40, height: 40, background: '#15803d', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '1.25rem' }}>🌱</span></div>
                            <span style={{ fontSize: '1.875rem', fontWeight: 700, color: '#15803d' }}>NusaTani</span>
                        </div>
                        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button onClick={() => go('/petani/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: isActive('/petani/dashboard') ? 700 : 500, color: isActive('/petani/dashboard') ? '#15803d' : '#4b5563', fontSize: '1.125rem' }}><HiHome /> Beranda</button>
                            <button onClick={() => go('/petani/marketplace')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: isActive('/petani/marketplace') ? 700 : 500, color: isActive('/petani/marketplace') ? '#15803d' : '#4b5563', fontSize: '1.125rem' }}><HiShoppingBag /> Marketplace</button>
                            <button onClick={() => go('/petani/chat')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: isActive('/petani/chat') ? 700 : 500, color: isActive('/petani/chat') ? '#15803d' : '#4b5563', fontSize: '1.125rem' }}><HiChatAlt2 /> Pesan<span style={{ position: 'absolute', top: -8, right: -14, background: '#ef4444', color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '9999px' }}>3</span></button>
                            <button onClick={() => go('/petani/transaksi')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: isActive('/petani/transaksi') ? 700 : 500, color: isActive('/petani/transaksi') ? '#15803d' : '#4b5563', fontSize: '1.125rem' }}><HiDocumentText /> Transaksi</button>
                            <button onClick={() => go('/petani/pembeli')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: isActive('/petani/pembeli') ? 700 : 500, color: isActive('/petani/pembeli') ? '#15803d' : '#4b5563', fontSize: '1.125rem' }}><HiOutlineUserGroup /> Pembeli</button>
                        </nav>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <button onClick={() => go('/petani/jual-panen')} style={{ background: '#16a34a', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }} onMouseOver={e => e.currentTarget.style.background = '#15803d'} onMouseOut={e => e.currentTarget.style.background = '#16a34a'}><HiPlusCircle /> + Jual Panen</button>
                            <div style={{ position: 'relative', cursor: 'pointer' }}><HiBell style={{ fontSize: '1.5rem', color: '#6b7280' }} /><span style={{ position: 'absolute', top: -4, right: -4, width: 12, height: 12, background: '#ef4444', borderRadius: '50%' }} /></div>
                            <div style={{ position: 'relative' }}>
                                <div onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ cursor: 'pointer', width: 44, height: 44, borderRadius: '50%', border: '4px solid #bbf7d0', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HiUserCircle style={{ color: '#16a34a', fontSize: '1.875rem' }} /></div>
                                {showProfileMenu && (
                                    <div style={{ position: 'absolute', top: '50px', right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '0.5rem 0', minWidth: '180px', zIndex: 60 }}>
                                        <button onClick={() => { go('/petani/profil'); setShowProfileMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Profil Saya</button>
                                        <button onClick={() => { go('/petani/pengaturan'); setShowProfileMenu(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Pengaturan</button>
                                        <hr style={{ margin: '0.25rem 0', borderColor: '#f3f4f6' }} />
                                        <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444' }}>Keluar</button>
                                    </div>
                                )}
                            </div>
                            <HiChevronDown style={{ color: '#9ca3af', fontSize: '1.25rem', cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
            </header>

            {/* ========== MAIN CONTENT ========== */}
            <main style={{ paddingTop: '7rem' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
                    <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: '#15803d', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.5rem' }}><HiArrowLeft /> Kembali</button>

                    {/* Kartu Profil */}
                    <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        {/* Banner + Avatar */}
                        <div style={{ position: 'relative', backgroundImage: bannerUrl ? `url(${bannerUrl})` : 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '1.5rem', minHeight: 160 }}>
                            <label htmlFor="bannerUpload" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.4rem 0.8rem', borderRadius: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 600, color: '#15803d' }}><HiCamera /> Ganti Banner</label>
                            <input type="file" id="bannerUpload" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'banner')} />
                            <button onClick={handleEditClick} style={{ position: 'absolute', top: '1rem', right: '8rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 30, padding: '0.4rem 0.8rem', fontSize: '0.7rem', fontWeight: 600, color: '#15803d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><HiPencil /> Edit Profil</button>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ width: 80, height: 80, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                                        {avatarUrl ? <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <HiUserCircle style={{ color: '#15803d', fontSize: '3rem' }} />}
                                    </div>
                                    <label htmlFor="avatarUpload" style={{ position: 'absolute', bottom: 0, right: 0, background: '#15803d', borderRadius: 30, padding: '0.3rem', cursor: 'pointer', display: 'flex', border: '2px solid #fff' }}><HiCamera style={{ color: '#fff', fontSize: '0.7rem' }} /></label>
                                    <input type="file" id="avatarUpload" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'avatar')} />
                                </div>
                                <div>
                                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937', margin: 0, background: 'rgba(255,255,255,0.7)', display: 'inline-block', padding: '0.2rem 0.8rem', borderRadius: 30 }}>{formData.name}</h1>
                                    <p style={{ fontSize: '0.75rem', color: '#15803d', background: '#fff', display: 'inline-block', padding: '0.2rem 0.8rem', borderRadius: 20, marginTop: '0.4rem' }}>{formData.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Akun */}
                        <div style={{ padding: '1.5rem' }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: 4, height: 18, background: '#15803d', borderRadius: 4 }} /> Informasi Akun</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#fafafa', borderRadius: 12, border: '1px solid #f0f0f0' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HiMail style={{ color: '#15803d' }} /></div>
                                    <div><p style={{ fontSize: '0.7rem', color: '#6b7280' }}>Email</p><p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{formData.email}</p></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#fafafa', borderRadius: 12, border: '1px solid #f0f0f0' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HiPhone style={{ color: '#15803d' }} /></div>
                                    <div><p style={{ fontSize: '0.7rem', color: '#6b7280' }}>Telepon</p><p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{formData.phone}</p></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#fafafa', borderRadius: 12, border: '1px solid #f0f0f0', gridColumn: 'span 2' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HiLocationMarker style={{ color: '#15803d' }} /></div>
                                    <div><p style={{ fontSize: '0.7rem', color: '#6b7280' }}>Alamat</p><p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{formData.address}</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Statistik */}
                        <div style={{ padding: '0 1.5rem 1.5rem' }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: 4, height: 18, background: '#15803d', borderRadius: 4 }} /> Statistik Aktivitas</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                {stats.map((stat, idx) => (
                                    <div key={idx} style={{ background: '#f8fdf8', borderRadius: 12, padding: '1rem 0.5rem', textAlign: 'center', border: '1px solid #dcfce7', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}><stat.icon style={{ color: stat.color, fontSize: '1.2rem' }} /></div>
                                        <p style={{ fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{stat.value}</p>
                                        <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.2rem' }}>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ background: '#15803d', color: '#fff', textAlign: 'center', padding: '3.5rem 0', marginTop: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '1.5rem' }}>🌱</span></div>
                    <span style={{ fontSize: '2.25rem', fontWeight: 700 }}>NusaTani</span>
                </div>
                <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mengubah Sisa Jadi Asa</p>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>© 2024 NusaTani. All rights reserved.</p>
            </footer>

            {/* Modal Edit Profil */}
            {isEditModalOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '1rem' }} onClick={handleCloseModal}>
                    <div style={{ background: '#fff', borderRadius: 20, maxWidth: '450px', width: '100%', boxShadow: '0 20px 35px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Edit Profil</h2>
                            <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', borderRadius: 8 }}><HiX style={{ fontSize: '1.2rem', color: '#888' }} /></button>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Nama</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: '0.85rem', outline: 'none' }} onFocus={e => e.currentTarget.style.borderColor = '#15803d'} onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} /></div>
                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: '0.85rem', outline: 'none' }} onFocus={e => e.currentTarget.style.borderColor = '#15803d'} onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} /></div>
                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Telepon</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: '0.85rem', outline: 'none' }} onFocus={e => e.currentTarget.style.borderColor = '#15803d'} onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} /></div>
                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Alamat</label><input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: '0.85rem', outline: 'none' }} onFocus={e => e.currentTarget.style.borderColor = '#15803d'} onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} /></div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <button onClick={handleCloseModal} style={{ flex: 1, background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 30, padding: '0.6rem', fontSize: '0.8rem', fontWeight: 600, color: '#666', cursor: 'pointer' }}>Batal</button>
                                <button onClick={handleSaveChanges} style={{ flex: 1, background: '#15803d', border: 'none', borderRadius: 30, padding: '0.6rem', fontSize: '0.8rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}