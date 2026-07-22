'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Plus, Search, Edit2, Trash2, Upload } from 'lucide-react';
import { mockEvents } from '@/lib/mockData';
import { EventItem } from '@/types/admin';
import Modal from '@/components/Modal';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State for Add / Edit Event
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workshop');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [quota, setQuota] = useState(40);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [status, setStatus] = useState<'Open' | 'Closed' | 'Draft' | 'Finished'>('Open');
  const [imageUrl, setImageUrl] = useState('');

  const filteredEvents = events.filter((evt) =>
    evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evt.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setCategory('Workshop');
    setDate('');
    setLocation('');
    setDescription('');
    setQuota(40);
    setRegisteredCount(0);
    setStatus('Open');
    setImageUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (evt: EventItem) => {
    setEditingId(evt.id);
    setTitle(evt.title);
    setCategory(evt.category);
    setDate(evt.date);
    setLocation(evt.location);
    setDescription(evt.description);
    setQuota(evt.quota);
    setRegisteredCount(evt.registered_count);
    setStatus(evt.status);
    setImageUrl(evt.image_url || '');
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    if (editingId) {
      setEvents(events.map(evt => evt.id === editingId ? {
        ...evt,
        title,
        category,
        date,
        location: location || 'UPB Kebumen',
        description,
        quota: Number(quota),
        registered_count: Number(registeredCount),
        status,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
      } : evt));
    } else {
      const newEvt: EventItem = {
        id: `evt-${Date.now()}`,
        title,
        category,
        date,
        location: location || 'UPB Kebumen',
        description,
        quota: Number(quota),
        registered_count: 0,
        status,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
      };
      setEvents([newEvt, ...events]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus event kegiatan ini?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-[4px_10px_10px_4px] bg-light-blue text-primary border border-primary/30 uppercase tracking-wider block w-fit mb-1">
            Kegiatan & Dokumentasi
          </span>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Jejak Langkah & Event Seru ComitUPB</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola jadwal event, bootcamp, workshop, kompetisi internal, dan dokumentasi kegiatan ComitUPB.</p>
        </div>

        <button 
          onClick={openAddModal} 
          className="btn-primary-tactile"
        >
          <Plus className="w-4 h-4" /> Buat Event Baru
        </button>
      </div>

      {/* Toolbar Search */}
      <div className="card-sculpted p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama event, kategori, atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[12px] border border-slate-300 bg-slate-50 text-xs font-semibold text-dark focus:outline-none focus:border-primary"
          />
        </div>
        <span className="text-xs text-slate-500 font-bold">Total: {filteredEvents.length} Event</span>
      </div>

      {/* Events Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((act) => (
          <div key={act.id} className="card-sculpted overflow-hidden flex flex-col justify-between group bg-white">
            {/* Image Banner */}
            <div className="relative h-40 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
              <img
                src={act.image_url || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'}
                alt={act.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-[4px_10px_10px_4px] border border-primary-600 shadow-[2px_2px_0px_0px_#044484]">
                {act.category}
              </div>

              <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[4px_8px_8px_4px] text-[9px] font-bold uppercase tracking-wider border ${
                act.status === 'Open' ? 'bg-emerald-500 text-white border-emerald-600' :
                act.status === 'Finished' ? 'bg-slate-700 text-slate-200 border-slate-800' :
                'bg-amber-500 text-white border-amber-600'
              }`}>
                {act.status}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-primary font-bold">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {act.date}
                  </span>
                  <span className="flex items-center gap-1 text-dark font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {act.location}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {act.title}
                </h3>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-2">
                  {act.description}
                </p>
              </div>

              {/* Card Footer with Edit Action */}
              <div className="pt-3 mt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-500 font-medium">
                  Kuota: <span className="font-bold text-primary">{act.registered_count}/{act.quota}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => openEditModal(act)}
                    className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200"
                    title="Edit Event"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(act.id)}
                    className="p-1.5 rounded-[8px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors border border-slate-200"
                    title="Hapus Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Modal for Add / Edit Event */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Event & Kegiatan' : 'Buat Event & Kegiatan Baru'}
        icon={<CalendarIcon className="w-5 h-5 text-primary" />}
      >
        <form onSubmit={handleSaveEvent} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Judul Event / Kegiatan</label>
            <input
              type="text"
              required
              placeholder="Contoh: ComitUPB Tech Bootcamp 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Bootcamp">Bootcamp</option>
                <option value="Workshop">Workshop</option>
                <option value="Kompetisi">Kompetisi</option>
                <option value="Webinar">Webinar</option>
                <option value="Pengabdian">Pengabdian</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Tanggal Pelaksanaan</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Status Event</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Open">Open</option>
                <option value="Finished">Finished</option>
                <option value="Closed">Closed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Lokasi Kegiatan</label>
              <input
                type="text"
                placeholder="Contoh: Auditorium UPB"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Kuota Total</label>
              <input
                type="number"
                value={quota}
                onChange={(e) => setQuota(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Deskripsi Kegiatan</label>
            <textarea
              rows={3}
              placeholder="Jelaskan secara ringkas mengenai agenda kegiatan ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2 text-dark font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Banner / Dokumentasi Foto Event</label>
            <div className="flex items-center gap-3">
              <label className="w-16 h-12 rounded-[12px] bg-slate-100 border-[1.5px] border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-primary overflow-hidden">
                {imageUrl ? (
                  <img src={imageUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-4 h-4 text-slate-400" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              </label>
              <input
                type="url"
                placeholder="Atau tempel URL gambar banner..."
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
              {editingId ? 'Simpan Perubahan' : 'Simpan Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
