"use client";

import { useRef } from "react";
import { Achievement } from "@/types";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const achievements: Achievement[] = [
    {
      id: "ach-1",
      title: "Juara 1 Hackathon Nasional Software Innovation 2025",
      description: "Tim Web ComitUPB menyabet juara pertama dengan karya solusi manajemen sampah pintar berbasis AI.",
      year: 2025,
      imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
      category: "Tingkat Nasional",
    },
    {
      id: "ach-2",
      title: "Juara 2 National Cyber CTF Defense 2025",
      description: "Tim Cyber Security ComitUPB meraih posisi runner-up pada kompetisi keamanan siber antar perguruan tinggi.",
      year: 2025,
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
      category: "Tingkat Nasional",
    },
    {
      id: "ach-3",
      title: "Best UI/UX Design Award Gemastik XVII",
      description: "Perolehan penghargaan desain antarmuka aplikasi terfavorit dalam ajang Gemastik tingkat mahasiswa.",
      year: 2024,
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      category: "Gemastik",
    },
    {
      id: "ach-4",
      title: "Juara 1 Business Plan & Tech Pitching Central Java",
      description: "Kategori produk inovasi startup teknologi mahasiswa tingkat Provinsi Jawa Tengah.",
      year: 2024,
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      category: "Tingkat Regional",
    },
  ];

  return (
    <section ref={containerRef} id="achievements" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Prestasi &amp; Penghargaan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Kebanggaan Komunitas ComitUPB
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            Bukti nyata dedikasi dan kerja keras para anggota dalam menjuarai berbagai ajang kompetisi IT di tingkat regional dan nasional.
          </p>
        </div>

        {/* Grid List */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="card-sculpted overflow-hidden p-6 flex flex-col sm:flex-row gap-6 items-center"
            >
              {/* Icon / Thumbnail Box */}
              <div className="relative w-full sm:w-36 h-36 shrink-0 rounded-[16px_4px_16px_16px] overflow-hidden bg-light-blue border-[1.5px] border-slate-200 shadow-[3px_3px_0px_0px_rgba(6,104,198,0.15)] flex items-center justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 150px"
                />
                <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px_8px_8px_4px] shadow-[2px_2px_0px_0px_#044484]">
                  {item.year}
                </div>
              </div>

              {/* Text Detail */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="inline-block px-3 py-1 rounded-[6px_14px_14px_6px] bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-[2px_2px_0px_0px_rgba(217,119,6,0.15)]">
                  🏆 {item.category}
                </span>
                <h3 className="text-lg font-bold text-dark leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-muted leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
