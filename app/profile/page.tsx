// app/profile/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import {
    HiArrowLeft,
    HiOfficeBuilding,
    HiMail,
    HiPhone,
    HiLocationMarker,
    HiPencil,
    HiX,
    HiCheckCircle,
    HiTrendingUp,
    HiShoppingBag,
    HiUserGroup,
    HiEmojiHappy,
    HiCamera,
} from 'react-icons/hi';

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+62 812 3456 7890',
        address: user?.address || 'Jakarta, Indonesia',
        role: user?.role === 'pengolah' ? 'Pengolah · Premium' : user?.role === 'supplier' ? 'Supplier · Terverifikasi' : 'Petani · Aktif',
    });

    const handleEditClick = () => setIsEditModalOpen(true);
    const handleCloseModal = () => setIsEditModalOpen(false);

    const handleSaveChanges = () => {
        // Di sini nanti bisa update ke API
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

    // Statistik berdasarkan role (contoh)
    const stats = [
        { value: '12', label: 'Total Transaksi', icon: HiShoppingBag, color: '#2a7a3b' },
        { value: 'Rp 8.3Jt', label: 'Total Belanja', icon: HiTrendingUp, color: '#e67e22' },
        { value: '3', label: 'Mitra Aktif', icon: HiUserGroup, color: '#2a7a3b' },
        { value: '98%', label: 'Kepuasan', icon: HiEmojiHappy, color: '#2a7a3b' },
    ];

    if (loading) {
        return (
            <div className="dashboard-layout">
                <Sidebar />
                <div className="dashboard-main">
                    <Topbar title="Profil" />
                    <div className="page-content" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p>Memuat profil...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        router.push('/auth/login');
        return null;
    }

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Topbar title="Profil Saya" />

                <div className="page-content">
                    {/* Success Toast */}
                    {showSuccess && (
                        <div
                            style={{
                                position: 'fixed',
                                top: '5rem',
                                right: '2rem',
                                zIndex: 1000,
                                background: '#2a7a3b',
                                color: '#fff',
                                padding: '0.75rem 1.25rem',
                                borderRadius: 40,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                animation: 'fadeIn 0.3s ease',
                            }}
                        >
                            <HiCheckCircle style={{ fontSize: '1.2rem' }} />
                            <span>Profil berhasil diperbarui!</span>
                        </div>
                    )}

                    {/* Tombol Kembali */}
                    <button
                        onClick={() => router.back()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#2a7a3b',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            marginBottom: '1.25rem',
                            padding: '0.25rem 0',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#1a5c28')}
                        onMouseOut={(e) => (e.currentTarget.style.color = '#2a7a3b')}
                    >
                        <HiArrowLeft style={{ fontSize: '1rem' }} /> Kembali
                    </button>

                    {/* Kartu Profil Utama */}
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 16,
                            border: '1px solid #efefef',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header dengan Banner & Avatar */}
                        <div
                            style={{
                                position: 'relative',
                                backgroundImage: bannerUrl ? `url(${bannerUrl})` : 'linear-gradient(135deg, #f0f9f0 0%, #e8f5eb 100%)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: '1.5rem',
                                borderBottom: '1px solid #e0ece2',
                                minHeight: 160,
                            }}
                        >
                            <label
                                htmlFor="bannerUpload"
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255,255,255,0.9)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: 30,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: '#2a7a3b',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    backdropFilter: 'blur(2px)',
                                }}
                            >
                                <HiCamera /> Ganti Banner
                            </label>
                            <input
                                type="file"
                                id="bannerUpload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageUpload(e, 'banner')}
                            />

                            <button
                                onClick={handleEditClick}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '8rem',
                                    background: 'rgba(255,255,255,0.9)',
                                    border: 'none',
                                    borderRadius: 30,
                                    padding: '0.4rem 0.8rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: '#2a7a3b',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    backdropFilter: 'blur(2px)',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,1)')}
                                onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
                            >
                                <HiPencil /> Edit Profil
                            </button>

                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 20,
                                            background: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <HiOfficeBuilding style={{ color: '#2a7a3b', fontSize: '2.5rem' }} />
                                        )}
                                    </div>
                                    <label
                                        htmlFor="avatarUpload"
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            background: '#2a7a3b',
                                            borderRadius: 30,
                                            padding: '0.3rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            border: '2px solid #fff',
                                        }}
                                    >
                                        <HiCamera style={{ color: '#fff', fontSize: '0.7rem' }} />
                                    </label>
                                    <input
                                        type="file"
                                        id="avatarUpload"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageUpload(e, 'avatar')}
                                    />
                                </div>

                                <div>
                                    <h1
                                        style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 800,
                                            color: '#1a2e1c',
                                            margin: 0,
                                            background: 'rgba(255,255,255,0.7)',
                                            display: 'inline-block',
                                            padding: '0.2rem 0.8rem',
                                            borderRadius: 30,
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        {formData.name}
                                    </h1>
                                    <p
                                        style={{
                                            fontSize: '0.75rem',
                                            color: '#2a7a3b',
                                            background: '#fff',
                                            display: 'inline-block',
                                            padding: '0.2rem 0.8rem',
                                            borderRadius: 20,
                                            marginTop: '0.4rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {formData.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Perusahaan / Pribadi */}
                        <div style={{ padding: '1.5rem' }}>
                            <h2
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: '#1a2e1c',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <span style={{ width: 4, height: 18, background: '#2a7a3b', borderRadius: 4 }} />
                                Informasi Akun
                            </h2>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '0.75rem',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        background: '#fafafa',
                                        borderRadius: 12,
                                        border: '1px solid #f0f0f0',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            background: '#e8f5eb',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <HiMail style={{ color: '#2a7a3b', fontSize: '1rem' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', color: '#8a9e8d', margin: 0 }}>Email</p>
                                        <p style={{ fontSize: '0.85rem', color: '#1a2e1c', fontWeight: 500, margin: 0 }}>
                                            {formData.email}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        background: '#fafafa',
                                        borderRadius: 12,
                                        border: '1px solid #f0f0f0',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            background: '#e8f5eb',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <HiPhone style={{ color: '#2a7a3b', fontSize: '1rem' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', color: '#8a9e8d', margin: 0 }}>Telepon</p>
                                        <p style={{ fontSize: '0.85rem', color: '#1a2e1c', fontWeight: 500, margin: 0 }}>
                                            {formData.phone}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        background: '#fafafa',
                                        borderRadius: 12,
                                        border: '1px solid #f0f0f0',
                                        gridColumn: 'span 2',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            background: '#e8f5eb',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <HiLocationMarker style={{ color: '#2a7a3b', fontSize: '1rem' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', color: '#8a9e8d', margin: 0 }}>Alamat</p>
                                        <p style={{ fontSize: '0.85rem', color: '#1a2e1c', fontWeight: 500, margin: 0 }}>
                                            {formData.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistik Akun */}
                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                            <h2
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: '#1a2e1c',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <span style={{ width: 4, height: 18, background: '#2a7a3b', borderRadius: 4 }} />
                                Statistik Aktivitas
                            </h2>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '0.75rem',
                                }}
                            >
                                {stats.map((stat, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: '#f8fdf8',
                                            borderRadius: 12,
                                            padding: '1rem 0.5rem',
                                            textAlign: 'center',
                                            border: '1px solid #e8f5eb',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                    >
                                        <div
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 12,
                                                background: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 0.5rem',
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                                            }}
                                        >
                                            <stat.icon style={{ color: stat.color, fontSize: '1.2rem' }} />
                                        </div>
                                        <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a2e1c', margin: 0 }}>
                                            {stat.value}
                                        </p>
                                        <p style={{ fontSize: '0.7rem', color: '#8a9e8d', marginTop: '0.2rem' }}>
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit Profil */}
            {isEditModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        padding: '1rem',
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 20,
                            maxWidth: '450px',
                            width: '100%',
                            boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
                            overflow: 'hidden',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.5rem',
                                borderBottom: '1px solid #f0f0f0',
                                background: '#fafafa',
                            }}
                        >
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a2e1c', margin: 0 }}>
                                Edit Profil
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    borderRadius: 8,
                                    display: 'flex',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = '#e8e8e8')}
                                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                                <HiX style={{ fontSize: '1.2rem', color: '#888' }} />
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.25rem' }}>
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.8rem',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 12,
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                        }}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2a7a3b')}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.25rem' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.8rem',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 12,
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                        }}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2a7a3b')}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.25rem' }}>
                                        Telepon
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.8rem',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 12,
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                        }}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2a7a3b')}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.25rem' }}>
                                        Alamat
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.8rem',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 12,
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                        }}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2a7a3b')}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <button
                                    onClick={handleCloseModal}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 30,
                                        padding: '0.6rem',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#666',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#f5f5f5';
                                        e.currentTarget.style.borderColor = '#ccc';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = '#e0e0e0';
                                    }}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    style={{
                                        flex: 1,
                                        background: '#2a7a3b',
                                        border: 'none',
                                        borderRadius: 30,
                                        padding: '0.6rem',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.background = '#1a5c28')}
                                    onMouseOut={(e) => (e.currentTarget.style.background = '#2a7a3b')}
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
        </div>
    );
}