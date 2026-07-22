'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Globe, 
  Bell, 
  Sliders, 
  ShieldCheck, 
  Mail, 
  Palette, 
  CheckCircle2 
} from 'lucide-react';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [siteName, setSiteName] = useState('ComitUPB - Komunitas IT UPB Kebumen');
  const [contactEmail, setContactEmail] = useState('contact@comitupb.org');
  const [announcementText, setAnnouncementText] = useState('Pendaftaran Perekrutan Anggota Baru ComitUPB 2026 Telah Dibuka!');
  const [showBanner, setShowBanner] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-[4px_10px_10px_4px] bg-light-blue text-primary border border-primary/30 uppercase tracking-wider block w-fit mb-1">
            Konfigurasi Website
          </span>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Pengaturan Lainnya</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola informasi publik, pengumuman banner, serta mode operasional landing page ComitUPB.</p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Pengaturan Berhasil Disimpan!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Site Information */}
        <div className="card-sculpted p-6 space-y-5 bg-white">
          <h3 className="text-base font-extrabold text-dark flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-4.5 h-4.5 text-primary" /> Informasi Umum Website & Kontak
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Judul / Nama Organisasi Publik</label>
              <input 
                type="text" 
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-bold">Email Resmi Kontak Organisasi</label>
              <input 
                type="email" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Announcement Banner Settings */}
        <div className="card-sculpted p-6 space-y-5 bg-white">
          <h3 className="text-base font-extrabold text-dark flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-4.5 h-4.5 text-amber-500" /> Pengumuman Banner Top Bar
          </h3>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Teks Pengumuman Utama Banner</label>
              <input 
                type="text" 
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Masukkan teks pengumuman penting yang tampil di landing page..."
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input 
                type="checkbox" 
                id="show_banner" 
                checked={showBanner}
                onChange={(e) => setShowBanner(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-50 border-slate-300 text-primary focus:ring-0 cursor-pointer" 
              />
              <label htmlFor="show_banner" className="text-slate-700 font-bold cursor-pointer">
                Aktifkan Tampilan Banner Pengumuman di Landing Page Utama
              </label>
            </div>
          </div>
        </div>

        {/* Operational & Mode Settings */}
        <div className="card-sculpted p-6 space-y-5 bg-white">
          <h3 className="text-base font-extrabold text-dark flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4.5 h-4.5 text-indigo-500" /> Mode Operasional Website
          </h3>

          <div className="space-y-4 text-xs font-medium">
            <div className="flex items-center justify-between p-3 rounded-[12px] bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-dark block text-xs">Buka Pendaftaran Anggota Baru</span>
                <span className="text-[11px] text-slate-500">Memungkinkan mahasiswa UPB mendaftar secara mandiri melalui form pendaftaran.</span>
              </div>
              <input 
                type="checkbox" 
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="w-4 h-4 rounded bg-white border-slate-300 text-primary focus:ring-0 cursor-pointer" 
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-[12px] bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-dark block text-xs">Mode Pemeliharaan (Maintenance Mode)</span>
                <span className="text-[11px] text-slate-500">Menampilkan halaman pemeliharaan sementara di landing page pengunjung.</span>
              </div>
              <input 
                type="checkbox" 
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded bg-white border-slate-300 text-primary focus:ring-0 cursor-pointer" 
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="btn-primary-tactile">
            <Save className="w-4 h-4" /> Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
}
