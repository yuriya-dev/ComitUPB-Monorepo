'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title = 'Dashboard' }: NavbarProps) {
  return (
    <header className="h-20 bg-white/90 border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(6,104,198,0.04)]">
      <div>
        <h2 className="text-xl font-extrabold text-dark tracking-tight">{title}</h2>
        <p className="text-xs text-slate-500 font-medium">Panel administrasi organisasi ComitUPB</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari data, event, anggota..." 
            className="w-full bg-slate-50 border-[1.5px] border-slate-200 text-dark text-xs rounded-[12px] pl-9 pr-4 py-2 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-[12px] bg-white border-[1.5px] border-slate-200 text-slate-600 hover:text-primary hover:border-primary/50 shadow-sm transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-[10px] bg-light-blue border-[1.5px] border-primary/30 flex items-center justify-center text-primary font-black text-xs shadow-sm">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-dark leading-tight">Administrator</p>
            <p className="text-[10px] text-slate-500 font-medium">admin@comitupb.org</p>
          </div>
        </div>
      </div>
    </header>
  );
}
