"use client";

import { useState } from "react";
import { X, UserPlus, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { registerMember } from "@/lib/services/api";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    major: "S1 Informatika",
    divisionInterest: "Web Development",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await registerMember(formData);
    setLoading(false);

    if (res.success) {
      setFeedback({ type: "success", text: res.message });
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        major: "S1 Informatika",
        divisionInterest: "Web Development",
        reason: "",
      });
    } else {
      setFeedback({ type: "error", text: res.message || "Pendaftaran gagal." });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[28px_8px_28px_28px] max-w-lg w-full p-6 sm:p-8 border-[2px] border-slate-900/10 shadow-[0_20px_50px_rgba(15,23,42,0.25),8px_8px_0px_0px_rgba(6,104,198,0.2)] relative animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-5 right-5 p-2 rounded-[10px] text-gray-muted hover:text-dark hover:bg-slate-100 transition-colors border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484] shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-dark tracking-tight">Formulir Pendaftaran</h3>
            <p className="text-xs text-gray-muted font-bold">Gabung Calon Anggota ComitUPB 2025/2026</p>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-[14px] mb-6 flex items-start gap-3 text-sm font-medium ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-[1.5px] border-emerald-300 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.2)]"
                : "bg-red-50 text-red-800 border-[1.5px] border-red-300 shadow-[3px_3px_0px_0px_rgba(239,68,68,0.2)]"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span>{feedback.text}</span>
              {feedback.type === "success" && (
                <div className="mt-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-[8px] border border-emerald-700 shadow-[2px_2px_0px_0px_#047857] hover:bg-emerald-700 transition-colors"
                  >
                    Tutup Modal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Body */}
        {feedback?.type !== "success" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold uppercase text-dark mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                required
                placeholder="Contoh: Ahmad Fauzi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all shadow-[2px_2px_0px_0px_#CBD5E1]"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-bold uppercase text-dark mb-1.5">
                Alamat Email Mahasiswa <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                required
                placeholder="email.mahasiswa@mhs.upb.ac.id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all shadow-[2px_2px_0px_0px_#CBD5E1]"
              />
            </div>

            <div>
              <label htmlFor="reg-phone" className="block text-xs font-bold uppercase text-dark mb-1.5">
                Nomor WhatsApp / HP <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-phone"
                type="tel"
                required
                placeholder="081234567890"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="w-full px-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all shadow-[2px_2px_0px_0px_#CBD5E1]"
              />
            </div>

            <div>
              <label htmlFor="reg-major" className="block text-xs font-bold uppercase text-dark mb-1.5">
                Program Studi / Jurusan <span className="text-red-500">*</span>
              </label>
              <select
                id="reg-major"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="w-full px-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all bg-white shadow-[2px_2px_0px_0px_#CBD5E1]"
              >
                <option value="S1 Informatika">S1 Ilmu Komputer</option>
                <option value="S1 Sistem Informasi">S1 Sains Data</option>
                <option value="D3 Teknik Komputer">S1 Agribisnis</option>
                <option value="Lainnya">Program Studi Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="reg-division" className="block text-xs font-bold uppercase text-dark mb-1.5">
                Minat Divisi Utama
              </label>
              <select
                id="reg-division"
                value={formData.divisionInterest}
                onChange={(e) => setFormData({ ...formData, divisionInterest: e.target.value })}
                className="w-full px-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all bg-white shadow-[2px_2px_0px_0px_#CBD5E1]"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Data Science & AI">Data Science &amp; AI</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>

            <div>
              <label htmlFor="reg-reason" className="block text-xs font-bold uppercase text-dark mb-1.5">
                Alasan Ingin Bergabung
              </label>
              <textarea
                id="reg-reason"
                rows={3}
                placeholder="Ceritakan singkat motivasimu..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all resize-none shadow-[2px_2px_0px_0px_#CBD5E1]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary-tactile disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span>Memproses Pendaftaran...</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Formulir Pendaftaran</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
