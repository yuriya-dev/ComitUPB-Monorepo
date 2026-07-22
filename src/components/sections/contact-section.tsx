"use client";

import { useState, useRef } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { sendContactMessage } from "@/lib/services/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (formBoxRef.current) {
        gsap.fromTo(
          formBoxRef.current,
          { x: 30, opacity: 0, scale: 0.96 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formBoxRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setFeedback({ type: "success", text: res.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setFeedback({ type: "error", text: res.message || "Gagal mengirim pesan." });
    }
  };

  return (
    <section ref={containerRef} id="contact" className="py-20 md:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div>
              <div className="badge-sculpted">
                Hubungi Kami
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
              Ada Pertanyaan? Mari Berdiskusi Bersama Tim ComitUPB
            </h2>
            <p className="text-base text-gray-muted leading-relaxed">
              Punya pertanyaan seputar keanggotaan, penawaran kolaborasi proyek, atau ingin mengundang kami sebagai pemateri workshop? Kirimkan pesanmu melalui formulir di samping.
            </p>

            <div className="space-y-4 pt-4">
              <div className="card-sculpted p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px_4px_12px_12px] bg-primary text-white flex items-center justify-center shrink-0 border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-muted uppercase">Email Resmi</div>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-base font-bold text-dark hover:text-primary transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="card-sculpted p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px_4px_12px_12px] bg-primary text-white flex items-center justify-center shrink-0 border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-muted uppercase">Lokasi Sekretariat</div>
                  <div className="text-sm font-bold text-dark leading-snug">
                    {siteConfig.contact.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div ref={formBoxRef} className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[28px_8px_28px_28px] border-[2px] border-slate-900/10 shadow-[0_16px_40px_-10px_rgba(6,104,198,0.1),6px_6px_0px_0px_rgba(6,104,198,0.14)]">
            <h3 className="text-2xl font-extrabold text-dark mb-6">Formulir Kontak</h3>

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
                <span>{feedback.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase text-dark mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Nama kamu..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all shadow-[2px_2px_0px_0px_#CBD5E1]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase text-dark mb-2">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all shadow-[2px_2px_0px_0px_#CBD5E1]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold uppercase text-dark mb-2">
                  Subjek Pesan <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Contoh: Penawaran Kolaborasi Event"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all shadow-[2px_2px_0px_0px_#CBD5E1]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase text-dark mb-2">
                  Isi Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tuliskan detail pertanyaan atau pesanmu..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] border-[1.5px] border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all resize-none shadow-[2px_2px_0px_0px_#CBD5E1]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary-tactile disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
