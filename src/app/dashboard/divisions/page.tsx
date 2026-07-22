'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Globe, Smartphone, Shield, Palette, Cpu, Plus, Edit2, Trash2, GitGraph } from 'lucide-react';
import { mockDivisions } from '@/lib/mockData';
import { DivisionItem } from '@/types/admin';
import OrgChartCanvas from '@/components/OrgChartCanvas';
import Modal from '@/components/Modal';
import { getDivisions, addDivision, updateDivision, deleteDivision } from '@/services/dataService';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Shield,
  Palette,
  Cpu
};

export default function DivisionsPage() {
  const [divisions, setDivisions] = useState<DivisionItem[]>(mockDivisions);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'grid' | 'canvas'>('canvas');

  // Modal State for Add & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Globe');
  const [headName, setHeadName] = useState('');
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getDivisions();
      setDivisions(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setIcon('Globe');
    setHeadName('');
    setMemberCount(0);
    setIsModalOpen(true);
  };

  const openEditModal = (div: DivisionItem) => {
    setEditingId(div.id);
    setName(div.name);
    setSlug(div.slug);
    setDescription(div.description || '');
    setIcon(div.icon || 'Globe');
    setHeadName(div.head_name || '');
    setMemberCount(div.member_count || 0);
    setIsModalOpen(true);
  };

  const handleSaveDivision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedSlug = slug.trim() ? slug.trim() : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const divPayload = {
      name,
      slug: generatedSlug,
      description,
      icon,
      head_name: headName,
      member_count: Number(memberCount)
    };

    if (editingId) {
      const success = await updateDivision(editingId, divPayload);
      if (success) {
        setDivisions(divisions.map(div => div.id === editingId ? { ...div, ...divPayload } : div));
      }
    } else {
      const created = await addDivision(divPayload);
      if (created) {
        setDivisions([...divisions, created]);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus divisi ini?')) {
      const success = await deleteDivision(id);
      if (success) {
        setDivisions(divisions.filter(d => d.id !== id));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Divisi & Grafik Struktur Organisasi</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola struktur bidang keahlian dan visualisasi bagan hierarki pengurus ComitUPB</p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'grid' && (
            <button onClick={openAddModal} className="btn-primary-tactile">
              <Plus className="w-4 h-4" /> Tambah Divisi
            </button>
          )}

          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-[14px]">
            <button 
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-xs font-bold transition-all ${
                activeTab === 'canvas' ? 'bg-white text-primary shadow-sm font-extrabold' : 'text-slate-600 hover:text-dark'
              }`}
            >
              <GitGraph className="w-4 h-4" /> Canvas Bagan Interaktif
            </button>
            <button 
              onClick={() => setActiveTab('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-xs font-bold transition-all ${
                activeTab === 'grid' ? 'bg-white text-primary shadow-sm font-extrabold' : 'text-slate-600 hover:text-dark'
              }`}
            >
              <Layers className="w-4 h-4" /> Daftar Divisi
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'canvas' ? (
        <OrgChartCanvas />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div) => {
            const IconComponent = iconMap[div.icon] || Layers;
            return (
              <div key={div.id} className="card-sculpted p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-[6px_14px_14px_6px] bg-light-blue text-primary text-xs font-bold border-[1.5px] border-primary/30">
                      {div.member_count} Anggota
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-dark text-xl">{div.name}</h3>
                    <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">{div.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Ketua Divisi</span>
                    <span className="text-xs font-bold text-dark">{div.head_name || '-'}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => openEditModal(div)}
                      className="p-2 rounded-[10px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200"
                      title="Edit Divisi"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(div.id)}
                      className="p-2 rounded-[10px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors border border-slate-200"
                      title="Hapus Divisi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add / Edit Division */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Divisi Organisasi' : 'Tambah Divisi Baru'}
        icon={<Layers className="w-5 h-5 text-primary" />}
      >
        <form onSubmit={handleSaveDivision} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Nama Divisi</label>
            <input 
              type="text" 
              required
              placeholder="Contoh: Divisi Web Development"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Ikon Divisi</label>
              <select 
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Globe">Globe (Web)</option>
                <option value="Smartphone">Smartphone (Mobile)</option>
                <option value="Shield">Shield (Cyber Security)</option>
                <option value="Cpu">Cpu (AI & Data)</option>
                <option value="Palette">Palette (UI/UX Design)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Nama Ketua Divisi</label>
              <input 
                type="text" 
                placeholder="Contoh: Ahmad Rizky"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Jumlah Anggota</label>
            <input 
              type="number" 
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Deskripsi Divisi</label>
            <textarea 
              rows={3}
              placeholder="Jelaskan secara ringkas fokus divisi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2 text-dark font-semibold focus:outline-none focus:border-primary"
            />
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
              {editingId ? 'Simpan Perubahan' : 'Tambah Divisi'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
