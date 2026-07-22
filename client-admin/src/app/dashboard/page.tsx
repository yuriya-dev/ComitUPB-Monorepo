'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Layers, 
  FolderKanban, 
  Mail, 
  ArrowUpRight, 
  TrendingUp, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { 
  getEvents, 
  getDivisions, 
  getMembers, 
  getShowcases, 
  getContactMessages 
} from '@/services/dataService';
import { EventItem, DivisionItem, MemberItem, ShowcaseItem, ContactMessage } from '@/types/admin';

export default function DashboardOverview() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [divisions, setDivisions] = useState<DivisionItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [showcases, setShowcases] = useState<ShowcaseItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [evtData, divData, memData, scData, msgData] = await Promise.all([
          getEvents(),
          getDivisions(),
          getMembers(),
          getShowcases(),
          getContactMessages()
        ]);
        setEvents(evtData);
        setDivisions(divData);
        setMembers(memData);
        setShowcases(scData);
        setMessages(msgData);
      } catch (error) {
        console.error('Error fetching dashboard backend metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const unreadMessages = messages.filter(m => !m.is_read).length;

  const stats = [
    { name: 'Total Event Aktif', value: events.length, icon: Calendar, change: 'Event Terdaftar', bg: 'bg-primary/10 text-primary border-primary/20' },
    { name: 'Total Pengurus & Anggota', value: members.length, icon: Users, change: 'Anggota Terdata', bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { name: 'Total Divisi Keahlian', value: divisions.length, icon: Layers, change: 'Divisi Utama', bg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
    { name: 'Showcase Proyek Selesai', value: showcases.length, icon: FolderKanban, change: 'Proyek Terpublikasi', bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[26px_8px_26px_26px] bg-gradient-to-r from-primary via-primary-600 to-primary-800 p-8 shadow-hack text-white">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px_14px_14px_6px] bg-white/15 text-white text-xs font-bold uppercase tracking-wider border border-white/20 mb-4 backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Supabase Realtime Sync Active
          </span>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Selamat Datang di Portal Admin ComitUPB
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed font-medium">
            Kelola seluruh konten landing page, event pendaftaran, divisi pengurus, serta showcase karya anggota Komunitas IT Universitas Putra Bangsa Kebumen secara terpusat.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="card-sculpted p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{stat.name}</span>
                <div className={`w-10 h-10 rounded-[12px] border-[1.5px] ${stat.bg} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-dark tracking-tight">{loading ? '...' : stat.value}</div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Event & Registration Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-sculpted p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-extrabold text-dark">Event & Kegiatan Mendatang</h3>
                <p className="text-xs text-slate-500 font-medium">Ringkasan statistik pendaftaran peserta</p>
              </div>
              <Link href="/dashboard/events" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                Kelola Event <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="text-slate-400 text-xs py-4 text-center">Belum ada data event.</div>
              ) : (
                events.map((evt) => (
                  <div key={evt.id} className="p-4 rounded-2xl bg-slate-50/80 border-[1.5px] border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          evt.status === 'Open' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {evt.status}
                        </span>
                        <span className="text-xs font-bold text-primary">{evt.category}</span>
                      </div>
                      <h4 className="font-extrabold text-dark text-sm">{evt.title}</h4>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.date} • {evt.location}
                      </p>
                    </div>

                    <div className="w-full sm:w-auto text-right space-y-1 min-w-[120px]">
                      <div className="text-xs font-bold text-dark">
                        {evt.registered_count} / {evt.quota} Peserta
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(100, (evt.registered_count / (evt.quota || 1)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Messages */}
        <div className="space-y-6">
          <div className="card-sculpted-tr p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-dark flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> Pesan Masuk
              </h3>
              {unreadMessages > 0 && (
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-primary text-white rounded-full">
                  {unreadMessages} Baru
                </span>
              )}
            </div>

            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="text-slate-400 text-xs py-4 text-center">Belum ada pesan masuk.</div>
              ) : (
                messages.slice(0, 4).map((msg) => (
                  <div key={msg.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-dark">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(msg.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-primary truncate">{msg.subject}</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            <Link href="/dashboard/messages" className="mt-4 block text-center py-2.5 text-xs font-bold text-slate-600 hover:text-primary bg-slate-100 rounded-[12px] hover:bg-light-blue transition-colors">
              Lihat Semua Pesan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
