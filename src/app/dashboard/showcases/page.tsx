'use client';

import React, { useState } from 'react';
import { Plus, ExternalLink, Github, Star } from 'lucide-react';
import { mockShowcases } from '@/lib/mockData';
import { ShowcaseItem } from '@/types/admin';

export default function ShowcasesPage() {
  const [showcases] = useState<ShowcaseItem[]>(mockShowcases);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Showcase Proyek Mahasiswa</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola portofolio karya & hasil inovasi anggota ComitUPB</p>
        </div>
        <button 
          onClick={() => alert('Tambah showcase baru')}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
