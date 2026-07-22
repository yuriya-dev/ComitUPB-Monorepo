'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Reply, Trash2 } from 'lucide-react';
import { mockMessages } from '@/lib/mockData';
import { ContactMessage } from '@/types/admin';
import { getContactMessages, toggleMessageReadStatus, deleteContactMessage } from '@/services/dataService';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getContactMessages();
      setMessages(data);
      if (data.length > 0) setSelectedMessage(data[0]);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleToggleReadStatus = async (id: string, currentStatus: boolean) => {
    const success = await toggleMessageReadStatus(id, currentStatus);
    if (success) {
      const updatedMessages = messages.map(m => m.id === id ? { ...m, is_read: !m.is_read } : m);
      setMessages(updatedMessages);
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: !selectedMessage.is_read });
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan kontak masuk ini?')) {
      const success = await deleteContactMessage(id);
      if (success) {
        const filtered = messages.filter(m => m.id !== id);
        setMessages(filtered);
        if (selectedMessage?.id === id) {
          setSelectedMessage(filtered[0] || null);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-dark tracking-tight">Pesan & Kontak Masuk</h1>
        <p className="text-xs text-slate-500 font-medium">Pertanyaan dan penawaran kerjasama dari pengunjung landing page ComitUPB</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px]">
        {/* Messages List */}
        <div className="card-sculpted p-4 overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                selectedMessage?.id === msg.id 
                  ? 'bg-light-blue border-primary/40 text-dark shadow-sm' 
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-dark">{msg.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(msg.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
              <p className="text-xs font-bold text-primary truncate mb-1">{msg.subject}</p>
              <p className="text-xs text-slate-600 line-clamp-2">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-2 card-sculpted-tr p-6 flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200/80 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-dark mb-1">{selectedMessage.subject}</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Dari: <strong className="text-dark font-bold">{selectedMessage.name}</strong> ({selectedMessage.email})
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    Diterima pada {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleToggleReadStatus(selectedMessage.id, selectedMessage.is_read)}
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-bold flex items-center gap-1.5 transition-all ${
                      selectedMessage.is_read ? 'bg-slate-100 text-slate-600 border border-slate-300' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {selectedMessage.is_read ? 'Sudah Dibaca' : 'Tandai Dibaca'}
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="p-2 rounded-[10px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors border border-slate-200"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-dark text-sm leading-relaxed whitespace-pre-line font-medium">
                {selectedMessage.message}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="btn-primary-tactile"
                >
                  <Reply className="w-4 h-4" /> Balas Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">
              Pilih pesan di sebelah kiri untuk melihat isi detail.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
