'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Play, 
  Clock, 
  Edit3, 
  Trash2, 
  Eye, 
  Upload
} from 'lucide-react';
import { mockVaultModules } from '@/lib/mockData';
import { VaultModuleItem } from '@/types/admin';
import Modal from '@/components/Modal';
import { getVaultModules, addVaultModule, updateVaultModule, deleteVaultModule } from '@/services/dataService';

export default function VaultPage() {
  const [modules, setModules] = useState<VaultModuleItem[]>(mockVaultModules);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State for Add / Edit Module
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [category, setCategory] = useState<'web' | 'cyber' | 'ai' | 'design'>('web');
  const [duration, setDuration] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner - Advanced'>('Intermediate');

  const categories = [
    { id: 'all', label: 'Semua Topik' },
    { id: 'web', label: 'Web Development' },
    { id: 'cyber', label: 'Cyber Security' },
    { id: 'ai', label: 'AI & Data Science' },
    { id: 'design', label: 'UI/UX Design' },
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getVaultModules();
      setModules(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredModules = modules.filter((mod) => {
    const matchCategory = activeCategory === 'all' || mod.category === activeCategory;
    const matchSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        mod.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSpeaker('');
    setCategory('web');
    setDuration('');
    setVideoUrl('');
    setImageUrl('');
    setLevel('Intermediate');
    setIsModalOpen(true);
  };

  const openEditModal = (mod: VaultModuleItem) => {
    setEditingId(mod.id);
    setTitle(mod.title);
    setSpeaker(mod.speaker);
    setCategory(mod.category);
    setDuration(mod.duration);
    setVideoUrl(mod.video_url);
    setImageUrl(mod.image_url);
    setLevel(mod.level);
    setIsModalOpen(true);
  };

  const handleSaveModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !speaker.trim()) return;

    const categoryNames: Record<string, string> = {
      web: 'Web Development',
      cyber: 'Cyber Security',
      ai: 'AI & Data Science',
      design: 'UI/UX Design'
    };

    const payload = {
      title,
      speaker,
      category,
      category_name: categoryNames[category] || 'Web Development',
      duration: duration || '45:00',
      video_url: videoUrl || 'https://youtube.com',
      image_url: imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      level,
      is_published: true,
      created_at: new Date().toISOString()
    };

    if (editingId) {
      const success = await updateVaultModule(editingId, payload);
      if (success) {
        setModules(modules.map(mod => mod.id === editingId ? { ...mod, ...payload } : mod));
      }
    } else {
      const created = await addVaultModule(payload);
      if (created) {
        setModules([created, ...modules]);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus modul rekaman workshop ini?')) {
      const success = await deleteVaultModule(id);
      if (success) {
        setModules(modules.filter(m => m.id !== id));
      }
    }
  };

  const togglePublish = async (id: string, currentPublished: boolean) => {
    const success = await updateVaultModule(id, { is_published: !currentPublished });
    if (success) {
      setModules(modules.map(m => m.id === id ? { ...m, is_published: !m.is_published } : m));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-[4px_10px_10px_4px] bg-light-blue text-primary border border-primary/30 uppercase tracking-wider">
              Vault Modul Landing Page
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Manajemen Rekaman Workshop & Modul Eksklusif</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola video rekaman webinar, modul pembelajaran interaktif, serta akses materi bagi mahasiswa UPB.</p>
        </div>

        <button 
          onClick={openAddModal}
          className="btn-primary-tactile"
        >
          <Plus className="w-4 h-4" /> Tambah Rekaman Modul Baru
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="card-sculpted p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-[12px] text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-[0_3px_0_0_#044484]'
                  : 'bg-slate-100 text-slate-600 hover:text-dark hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul modul atau pembicara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[12px] border border-slate-300 bg-slate-50 text-xs font-semibold text-dark focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Modules Grid List (3 Columns per Row) */}
      {filteredModules.length === 0 ? (
        <div className="card-sculpted p-12 text-center text-slate-400 text-sm">
          Belum ada modul rekaman workshop pada kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map((mod) => (
            <div key={mod.id} className="card-sculpted p-4 flex flex-col justify-between group">
              <div className="space-y-3">
                {/* Thumbnail Image & Badge */}
                <div className="relative rounded-[14px_4px_14px_14px] overflow-hidden aspect-video border border-slate-200">
                  <img 
                    src={mod.image_url} 
                    alt={mod.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors" />
                  
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-[4px_8px_8px_4px] bg-dark/90 text-white text-[10px] font-mono font-bold border border-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" /> {mod.duration}
                  </span>

                  <span className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-[4px_10px_10px_4px] text-[9px] font-bold border uppercase tracking-wider ${
                    mod.is_published 
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' 
                      : 'bg-slate-700 text-slate-200 border-slate-800'
                  }`}>
                    {mod.is_published ? 'Aktif Tampil' : 'Draft'}
                  </span>
                </div>

                {/* Content Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-[4px_8px_8px_4px] bg-light-blue text-primary text-[9px] font-extrabold uppercase border border-primary/30">
                      {mod.category_name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">• {mod.level}</span>
                  </div>

                  <h3 className="font-extrabold text-dark text-sm group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    Pemateri: <span className="text-slate-700 font-bold">{mod.speaker}</span>
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                <button
                  onClick={() => togglePublish(mod.id, mod.is_published)}
                  className={`text-[11px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-[8px] border transition-all ${
                    mod.is_published 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {mod.is_published ? 'Publik' : 'Draft'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => openEditModal(mod)}
                    className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200"
                    title="Edit Modul"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <a 
                    href={mod.video_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200"
                    title="Buka Video"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <button 
                    onClick={() => handleDelete(mod.id)}
                    className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors border border-slate-200"
                    title="Hapus Modul"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable Modal for Add / Edit Vault Module */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Modul Workshop' : 'Tambah Modul Workshop Baru'}
        icon={<BookOpen className="w-5 h-5 text-primary" />}
      >
        <form onSubmit={handleSaveModule} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Judul Workshop / Modul</label>
            <input
              type="text"
              required
              placeholder="Contoh: Mastering Next.js 14 Masterclass"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Pemateri / Mentor</label>
              <input
                type="text"
                required
                placeholder="Nama Pemateri"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Kategori Topik</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="web">Web Development</option>
                <option value="cyber">Cyber Security</option>
                <option value="ai">AI & Data Science</option>
                <option value="design">UI/UX Design</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Durasi Video (Contoh: 45:30)</label>
              <input
                type="text"
                placeholder="45:00"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Tingkat Kesulitan</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Beginner - Advanced">Beginner - Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Link Rekaman Video (YouTube / Drive)</label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Thumbnail Cover Modul</label>
            <div className="flex items-center gap-3">
              <label className="w-16 h-12 rounded-[12px] bg-slate-100 border-[1.5px] border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-primary overflow-hidden">
                {imageUrl ? (
                  <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-4 h-4 text-slate-400" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageFileSelect} />
              </label>
              <input
                type="url"
                placeholder="Atau tempel URL gambar cover..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
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
            <button
              type="submit"
              className="btn-primary-tactile"
            >
              {editingId ? 'Simpan Perubahan' : 'Simpan Modul'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
