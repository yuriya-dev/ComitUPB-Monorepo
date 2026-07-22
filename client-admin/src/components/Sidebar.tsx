'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Layers, 
  FolderKanban, 
  Mail, 
  Settings, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Event & Kegiatan', href: '/dashboard/events', icon: Calendar },
  { name: 'Divisi & Pengurus', href: '/dashboard/divisions', icon: Layers },
  { name: 'Vault Modul & Workshop', href: '/dashboard/vault', icon: BookOpen },
  { name: 'Anggota', href: '/dashboard/members', icon: Users },
  { name: 'Showcase Proyek', href: '/dashboard/showcases', icon: FolderKanban },
  { name: 'Pesan & Kontak', href: '/dashboard/messages', icon: Mail },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 shadow-[4px_0_20px_rgba(6,104,198,0.03)] flex flex-col justify-between h-screen sticky top-0 z-40">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center">
            <img src="logo.svg" alt="logo" />
          </div>
          <div>
            <h1 className="font-extrabold text-dark tracking-tight text-base leading-tight">ComitUPB</h1>
            <p className="text-xs text-primary font-bold">Admin Portal</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-[14px] text-xs font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-light-blue text-primary border-[1.5px] border-primary/30 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.15)] font-extrabold' 
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Quick Link */}
      <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
        <a 
          href="http://localhost:3000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary-sculpted w-full justify-between !py-2.5"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            Landing Page
          </span>
        </a>
        <div className="px-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>v1.0.0 • Supabase</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>
    </aside>
  );
}
