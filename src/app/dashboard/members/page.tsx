'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, UserCheck, Edit2, Trash2, User } from 'lucide-react';
import { mockMembers } from '@/lib/mockData';
import { MemberItem } from '@/types/admin';
import Modal from '@/components/Modal';
import { getMembers, addMember, updateMember, deleteMember } from '@/services/dataService';

export default function MembersPage() {
  const [members, setMembers] = useState<MemberItem[]>(mockMembers);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State for Add / Edit Member
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [npm, setNpm] = useState('');
  const [divisionName, setDivisionName] = useState('Divisi Web Development');
  const [role, setRole] = useState('Anggota');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'Active' | 'Alumni' | 'Inactive'>('Active');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getMembers();
      setMembers(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setNpm('');
    setDivisionName('Divisi Web Development');
    setRole('Anggota');
    setEmail('');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (mem: MemberItem) => {
    setEditingId(mem.id);
    setName(mem.name);
    setNpm(mem.npm);
    setDivisionName(mem.division_name);
    setRole(mem.role);
    setEmail(mem.email);
    setStatus(mem.status);
    setIsModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !npm.trim()) return;

    const divisionIdMap: Record<string, string> = {
      'Divisi Web Development': 'div-web',
      'Divisi Cyber Security': 'div-cyber',
      'Divisi Mobile App': 'div-mobile',
      'Divisi Data & AI': 'div-ai',
      'Divisi Creative UI/UX': 'div-uiux'
    };

    const payload = {
      name,
      npm,
      division_id: divisionIdMap[divisionName] || 'div-web',
      division_name: divisionName,
      role,
      email: email || `${npm}@comitupb.org`,
      status
    };

    if (editingId) {
      const success = await updateMember(editingId, payload);
      if (success) {
        setMembers(members.map(m => m.id === editingId ? { ...m, ...payload } : m));
      }
    } else {
      const created = await addMember(payload);
      if (created) {
        setMembers([created, ...members]);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data anggota ini?')) {
      const success = await deleteMember(id);
      if (success) {
        setMembers(members.filter(m => m.id !== id));
      }
    }
  };

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
          onClick={openAddModal}
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
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      mem.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                      mem.status === 'Alumni' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' :
                      'bg-slate-100 text-slate-600 border-slate-300'
                    }`}>
                      <UserCheck className="w-3 h-3" /> {mem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => openEditModal(mem)}
                        className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200"
                        title="Edit Anggota"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(mem.id)}
                        className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors border border-slate-200"
                        title="Hapus Anggota"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Member */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Data Anggota' : 'Tambah Anggota Baru'}
        icon={<User className="w-5 h-5 text-primary" />}
      >
        <form onSubmit={handleSaveMember} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              placeholder="Contoh: Dimas Pratama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">NPM</label>
              <input
                type="text"
                required
                placeholder="312210..."
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Email</label>
              <input
                type="email"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Divisi</label>
              <select
                value={divisionName}
                onChange={(e) => setDivisionName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Divisi Web Development">Web Development</option>
                <option value="Divisi Cyber Security">Cyber Security</option>
                <option value="Divisi Mobile App">Mobile App</option>
                <option value="Divisi Data & AI">Data & AI</option>
                <option value="Divisi Creative UI/UX">Creative UI/UX</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Jabatan / Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Anggota">Anggota</option>
                <option value="Ketua Divisi">Ketua Divisi</option>
                <option value="Wakil Ketua">Wakil Ketua</option>
                <option value="Ketua Umum">Ketua Umum</option>
                <option value="Sekretaris">Sekretaris</option>
                <option value="Bendahara">Bendahara</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Active">Active</option>
                <option value="Alumni">Alumni</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-[12px] bg-slate-100 text-slate-600 font-bold hover:bg-slate-200"
            >
              Batal
            </button>
            <button type="submit" className="btn-primary-tactile">
              {editingId ? 'Simpan Perubahan' : 'Tambah Anggota'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
