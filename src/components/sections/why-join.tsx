"use client";

import { useRef } from "react";
import { BookOpen, Users2, Trophy, Rocket, Briefcase, Network } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WhyJoin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);

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

      if (rightGridRef.current) {
        gsap.fromTo(
          rightGridRef.current.children,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightGridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const benefits = [
    {
      icon: BookOpen,
      title: "Mentoring & Bootcamp Gratis",
      description: "Akses ke modul pembelajaran intensif dan sesi mentoring rutin dari para alumni dan praktisi IT profesional.",
    },
    {
      icon: Rocket,
      title: "Portofolio Proyek Nyata",
      description: "Kerjakan proyek aplikasi nyata secara tim yang siap dipamerkan dalam CV dan LinkedIn kamu.",
    },
    {
      icon: Trophy,
      title: "Dukungan Kompetisi & Hackathon",
      description: "Tim pembimbing dan fasilitas pendukung penuh untuk mengikuti perlombaan IT tingkat nasional & internasional.",
    },
    {
      icon: Users2,
      title: "Relasi & Komunitas Solutif",
      description: "Perluas jaringan pertemanan antar mahasiswa lintas prodi yang antusias dan saling membantu.",
    },
    {
      icon: Network,
      title: "Networking Alumni & Industri",
      description: "Koneksi langsung dengan alumni ComitUPB yang telah bekerja di tech company terkemuka.",
    },
    {
      icon: Briefcase,
      title: "Persiapan Karir & Magang",
      description: "Sesi review CV, simulasi coding interview, dan rekomendasi kesempatan magang IT.",
    },
  ];

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Intro Header */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div>
              <div className="badge-sculpted">
                Kenapa Bergabung?
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight leading-tight">
              Investasi Terbaik untuk Karir Digital Masa Depanmu
            </h2>
            <p className="text-base text-gray-muted leading-relaxed">
              Bergabung di ComitUPB bukan hanya sekadar menambah kegiatan organisasi, melainkan tempat akselerasi kemampuan teknis dan soft skill di lingkungan yang mendukung.
            </p>
            <div className="card-sculpted p-6 space-y-2">
              <div className="font-bold text-dark text-base">Syarat Pendaftaran Anggota:</div>
              <ul className="text-sm text-gray-muted space-y-1 list-disc list-inside font-medium">
                <li>Mahasiswa aktif Universitas Putra Bangsa.</li>
                <li>Memiliki antusiasme dan komitmen belajar IT.</li>
                <li>Terbuka untuk semua jurusan (TI, SI, Manajemen, Akuntansi, dll).</li>
              </ul>
            </div>
          </div>

          {/* Right Benefits Grid */}
          <div ref={rightGridRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="card-sculpted p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-[12px_4px_12px_12px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-dark">{b.title}</h3>
                  <p className="text-sm text-gray-muted leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
