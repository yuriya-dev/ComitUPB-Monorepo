'use client';

import React, { useState } from 'react';
import { Search, Plus, UserCheck } from 'lucide-react';
import { mockMembers } from '@/lib/mockData';
import { MemberItem } from '@/types/admin';

export default function MembersPage() {
  const [members] = useState<MemberItem[]>(mockMembers);
  const [search, setSearch] = useState('');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.npm.includes(search) || 
    m.division_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Manajemen Anggota & Pengurus</h1>
          <p className="text-xs text-slate-500 font-medium">Daftar pengurus aktif, nomor pokok mahasiswa (NPM), dan divisi</p>
        </div>
        <button 
          onClick={() => alert('Form pendaftaran anggota dapat dihubungkan ke Supabase auth/db')}
          className="btn-primary-tactile"
        >
          <Plus className="w-4 h-4" /> Tambah Anggota
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Cari berdasarkan nama, NPM, atau divisi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-[1.5px] border-slate-200 text-dark text-xs rounded-[12px] pl-9 pr-4 py-2.5 focus:outline-none focus:border-primary font-medium"
          />
        </div>
      </div>

      <div className="card-sculpted overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-dark uppercase font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nama Anggota</th>
                <th className="px-6 py-4">NPM</th>
                <th className="px-6 py-4">Divisi</th>
                <th className="px-6 py-4">Jabatan / Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((mem) => (
                <tr key={mem.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-bold text-dark flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-light-blue border border-primary/30 flex items-center justify-center text-primary font-black text-xs">
                      {mem.name.charAt(0)}
                    </div>
                    <div>
                      <div>{mem.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{mem.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500 font-semibold">{mem.npm}</td>
                  <td className="px-6 py-4 font-semibold">{mem.division_name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-[6px_14px_14px_6px] bg-light-blue text-primary border border-primary/30 text-[10px] font-extrabold">
                      {mem.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
                      <UserCheck className="w-3 h-3" /> {mem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-bold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
