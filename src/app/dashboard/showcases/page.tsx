'use client';

import React, { useState, useEffect } from 'react';
import { Plus, ExternalLink, Github, Star, Edit2, Trash2, FolderKanban } from 'lucide-react';
import { mockShowcases } from '@/lib/mockData';
import { ShowcaseItem } from '@/types/admin';
import Modal from '@/components/Modal';
import { getShowcases, addShowcase, updateShowcase, deleteShowcase } from '@/services/dataService';

export default function ShowcasesPage() {
  const [showcases, setShowcases] = useState<ShowcaseItem[]>(mockShowcases);
  const [loading, setLoading] = useState(true);

  // Modal State for Add / Edit Showcase
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [division, setDivision] = useState('Divisi Web Development');
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getShowcases();
      setShowcases(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setAuthor('');
    setDivision('Divisi Web Development');
    setDescription('');
    setTechStackInput('Next.js, Tailwind CSS, TypeScript');
    setDemoUrl('');
    setRepoUrl('');
    setImageUrl('');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ShowcaseItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setAuthor(item.author);
    setDivision(item.division);
    setDescription(item.description);
    setTechStackInput(item.tech_stack.join(', '));
    setDemoUrl(item.demo_url || '');
    setRepoUrl(item.repo_url || '');
    setImageUrl(item.image_url || '');
    setFeatured(item.featured);
    setIsModalOpen(true);
  };

  const handleSaveShowcase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const tech_stack = techStackInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      author,
      division,
      description,
      tech_stack,
      demo_url: demoUrl,
      repo_url: repoUrl,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      featured
    };

    if (editingId) {
      const success = await updateShowcase(editingId, payload);
      if (success) {
        setShowcases(showcases.map(s => s.id === editingId ? { ...s, ...payload } : s));
      }
    } else {
      const created = await addShowcase(payload);
      if (created) {
        setShowcases([created, ...showcases]);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus proyek showcase ini?')) {
      const success = await deleteShowcase(id);
      if (success) {
        setShowcases(showcases.filter(s => s.id !== id));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Showcase Proyek Mahasiswa</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola portofolio karya & hasil inovasi anggota ComitUPB</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn-primary-tactile"
        >
          <Plus className="w-4 h-4" /> Tambah Proyek Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showcases.map((item) => (
          <div key={item.id} className="card-sculpted p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-[6px_14px_14px_6px] text-[10px] font-extrabold bg-light-blue text-primary border border-primary/30 uppercase tracking-wider">
                  {item.division}
                </span>
                {item.featured && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-300">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured Project
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-dark text-lg">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tech_stack.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-[6px_12px_12px_6px] bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Oleh: <strong className="text-dark font-bold">{item.author}</strong></span>
              <div className="flex items-center gap-2">
                {item.demo_url && (
                  <a href={item.demo_url} target="_blank" rel="noreferrer" className="p-2 rounded-[10px] bg-light-blue text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {item.repo_url && (
                  <a href={item.repo_url} target="_blank" rel="noreferrer" className="p-2 rounded-[10px] bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                <button 
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-[10px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200"
                  title="Edit Proyek"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-[10px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors border border-slate-200"
                  title="Hapus Proyek"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Showcase */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Proyek Showcase' : 'Tambah Proyek Showcase Baru'}
        icon={<FolderKanban className="w-5 h-5 text-primary" />}
      >
        <form onSubmit={handleSaveShowcase} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Judul Proyek</label>
            <input
              type="text"
              required
              placeholder="Contoh: ComitUPB Official Landing Page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Pembuat / Author</label>
              <input
                type="text"
                required
                placeholder="Nama Mahasiswa / Tim"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Divisi Penanggung Jawab</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Divisi Web Development">Divisi Web Development</option>
                <option value="Divisi Cyber Security">Divisi Cyber Security</option>
                <option value="Divisi Mobile App">Divisi Mobile App</option>
                <option value="Divisi Data & AI">Divisi Data & AI</option>
                <option value="Divisi Creative UI/UX">Divisi Creative UI/UX</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Tech Stack (Pisahkan dengan koma)</label>
            <input
              type="text"
              placeholder="Next.js, Tailwind CSS, Supabase"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">URL Live Demo</label>
              <input
                type="url"
                placeholder="https://demo.com"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">URL Repositori GitHub</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Deskripsi Proyek</label>
            <textarea
              rows={3}
              placeholder="Jelaskan secara singkat mengenai keunggulan karya ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
            />
            <label htmlFor="featured" className="text-slate-700 font-bold cursor-pointer">
              Tandai sebagai Featured Project di Landing Page
            </label>
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
              {editingId ? 'Simpan Perubahan' : 'Tambah Proyek'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
