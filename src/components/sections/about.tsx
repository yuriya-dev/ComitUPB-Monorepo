"use client";

import { useRef } from "react";
import { Compass, Target, HeartHandshake, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Tentang ComitUPB
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Membangun Generasi Talenta Digital Unggul di Universitas Putra Bangsa
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            ComitUPB (Computer & Information Technology Student Community) adalah organisasi independen mahasiswa berbasis minat dan bakat teknologi informasi. Kami hadir sebagai inkubator skill, jaringan profesional, dan wadah inovasi bagi seluruh mahasiswa UPB.
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Visi Card */}
          <div className="card-sculpted p-8 space-y-4">
            <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-dark">Visi Utama</h3>
            <p className="text-gray-muted text-sm leading-relaxed">
              Menjadi pusat unggulan mahasiswa dalam penguasaan teknologi digital, melahirkan inovator yang solutif, kompetitif di tingkat nasional, serta siap menghadapi era revolusi industri 4.0.
            </p>
          </div>

          {/* Misi Card */}
          <div className="card-sculpted-tr p-8 space-y-4">
            <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-dark">Misi Strategis</h3>
            <ul className="text-gray-muted text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Menyelenggarakan pelatihan &amp; workshop berkala.</li>
              <li>Mendorong kolaborasi pembuatan proyek nyata.</li>
              <li>Mendampingi anggota dalam perlombaan IT.</li>
              <li>Membangun jejaring industri dan alumni IT.</li>
            </ul>
          </div>

          {/* Nilai Komunitas Card */}
          <div className="card-sculpted p-8 space-y-4">
            <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-dark">Nilai Komunitas</h3>
            <p className="text-gray-muted text-sm leading-relaxed">
              Inklusif, kolaboratif, progresif, dan berorientasi pada integritas. Kami percaya bahwa setiap mahasiswa dapat menguasai pemrograman dan teknologi jika diberikan lingkungan belajar yang positif.
            </p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div ref={bannerRef} className="mt-16 bg-dark text-white rounded-[28px_8px_28px_28px] border-[2px] border-slate-800 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(6,104,198,0.3)]">
          <div className="space-y-2 text-center md:text-left z-10">
            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Siap Mengasah Skill IT Kamu Bersama Kami?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Tidak perlu khawatir jika baru mulai dari nol. Di ComitUPB, mentor dan senior siap membimbing perjalanan belajar kamu step-by-step.
            </p>
          </div>

          <a
            href="#learning"
            className="z-10 btn-primary-tactile shrink-0"
          >
            Lihat Bidang Belajar
          </a>

          {/* Background Decorative Circles */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
