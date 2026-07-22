'use client';

import React, { useState } from 'react';
import { Layers, Globe, Smartphone, Shield, Palette, Cpu, Plus, Edit2, GitGraph } from 'lucide-react';
import { mockDivisions } from '@/lib/mockData';
import { DivisionItem } from '@/types/admin';
import OrgChartCanvas from '@/components/OrgChartCanvas';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Shield,
  Palette,
  Cpu
};

export default function DivisionsPage() {
  const [divisions] = useState<DivisionItem[]>(mockDivisions);
  const [activeTab, setActiveTab] = useState<'grid' | 'canvas'>('canvas');

  return (
    <div className="space-y-6">
      {/* Header Bar & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Divisi & Grafik Struktur Organisasi</h1>
          <p className="text-xs text-slate-500 font-medium">Kelola struktur bidang keahlian dan visualisasi bagan hierarki pengurus ComitUPB</p>
        </div>

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
                    <span className="text-xs font-bold text-dark">{div.head_name}</span>
                  </div>
                  <button className="p-2 rounded-[10px] bg-slate-100 hover:bg-light-blue text-slate-700 hover:text-primary transition-colors border border-slate-200">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
