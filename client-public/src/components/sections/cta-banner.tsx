"use client";

import { useState, useEffect } from "react";
import { Trophy, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface CtaBannerProps {
  onOpenRegisterModal: () => void;
}

export default function CtaBanner({ onOpenRegisterModal }: CtaBannerProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out scale-110 opacity-40"
        style={{
          backgroundImage: "url('/bg.jpg')",
          transform: `translateY(${(scrollY - 2000) * 0.12}px) scale(1.1)`,
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-light-blue/50 to-white/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Card Container */}
        <div className="bg-white rounded-[32px_8px_32px_32px] p-8 sm:p-12 border-[2px] border-slate-900/10 shadow-[0_16px_40px_-10px_rgba(6,104,198,0.1),6px_6px_0px_0px_rgba(6,104,198,0.14)] flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Side: Icon & Headline */}
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px_6px_20px_20px] bg-primary/10 text-primary border border-primary/30 flex items-center justify-center shrink-0 hidden sm:flex shadow-[4px_4px_0px_0px_rgba(6,104,198,0.12)]">
              <Trophy className="w-9 h-9 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                Belajar Dari yang Terbaik. Kembangkan Skill IT-Mu.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl font-medium">
                Bergabung bersama ratusan mahasiswa Universitas Putra Bangsa dan raih kesempatan emas membangun portofolio serta karir teknologi impianmu.
              </p>
            </div>
          </div>

          {/* Right Side: CTA Button & Trust Badge */}
          <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenRegisterModal}
              className="w-full sm:w-auto btn-primary-tactile"
            >
              <span>Daftar Sekarang Juga</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Gratis &amp; Terbuka Untuk Seluruh Mahasiswa UPB</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
