'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

const ADMIN_TOKEN_KEY = 'comitupb_admin_token';
const ADMIN_USER_KEY = 'comitupb_admin_user';

export function setAdminAuth(token: string, user: AdminUser) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    // Set cookie for middleware/server check if needed
    document.cookie = `${ADMIN_TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  }
  return null;
}

export function getAdminUser(): AdminUser | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(ADMIN_USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearAdminAuth() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    document.cookie = `${ADMIN_TOKEN_KEY}=; path=/; max-age=0`;
  }
}

export function useAdminAuth(requireAuth = true) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAdminToken();
    const currentUser = getAdminUser();

    if (requireAuth && (!token || !currentUser)) {
      clearAdminAuth();
      router.push('/login');
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  }, [requireAuth, router]);

  return { user, loading, logout: () => { clearAdminAuth(); router.push('/login'); } };
}
