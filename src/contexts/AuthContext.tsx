'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUserId,
  clearCurrentUser,
  upsertUser,
  isSeeded,
  markSeeded,
} from '@/lib/storage';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_OFFERS, MOCK_TRANSACTIONS } from '@/lib/mockData';

// ── Seed mock data on first load ──────────────────────
function seedIfNeeded() {
  if (isSeeded()) return;
  if (typeof window === 'undefined') return;
  localStorage.setItem('nusatani_users', JSON.stringify(MOCK_USERS));
  localStorage.setItem('nusatani_products', JSON.stringify(MOCK_PRODUCTS));
  localStorage.setItem('nusatani_offers', JSON.stringify(MOCK_OFFERS));
  localStorage.setItem('nusatani_transactions', JSON.stringify(MOCK_TRANSACTIONS));
  markSeeded();
}

// ── Context shape ─────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updated: User) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'petani' | 'pengolah';
  address: string;
  waNumber: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedIfNeeded();
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const users = getUsers();
    let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    // Fallback: cek MOCK_USERS jika tidak ada di localStorage
    // (terjadi jika seed dilakukan sebelum user baru ditambahkan)
    if (!found) {
      found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        users.push(found);
        saveUsers(users);
      }
    }

    if (!found) return { ok: false, error: 'Email tidak ditemukan.' };
    setCurrentUserId(found.id);
    setUser(found);
    return { ok: true };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const users = getUsers();
    const exists = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) return { ok: false, error: 'Email sudah terdaftar.' };

    const newUser: User = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      address: data.address,
      waNumber: data.waNumber,
      saldo: 0,
      avatar: '',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  const updateUser = useCallback((updated: User) => {
    upsertUser(updated);
    setUser(updated);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
