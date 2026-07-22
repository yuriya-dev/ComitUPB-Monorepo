"use client";

import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Activities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
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

  const activities = [
    {
      id: "act-1",
      name: "ComitUPB Tech Bootcamp 2025: Fullstack Web",
      description: "Pelatihan intensif 4 minggu pembuatan web app menggunakan Next.js dan Tailwind CSS diikuti 120+ mahasiswa.",
      date: "2025-11-15",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      category: "Bootcamp",
      location: "Auditorium UPB",
    },
    {
      id: "act-2",
      name: "Internal Cyber CTF Hackathon Competition",
      description: "Kompetisi hacking etis internal pertama ComitUPB untuk menguji kemampuan penetration testing & cryptography.",
      date: "2025-09-20",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      category: "Kompetisi",
      location: "Lab Komputer UPB",
    },
    {
      id: "act-3",
      name: "Workshop UI/UX Design System with Figma",
      description: "Sesi kolaboratif merancang design token, reusable component, dan interactive prototype aplikasi mobile.",
      date: "2025-07-10",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      category: "Workshop",
      location: "Gedung B Room 204",
    },
    {
      id: "act-4",
      name: "Comit Goes to School & Tech Sharing",
      description: "Pengabdian masyarakat dengan memberikan edukasi literasi digital dan pengenalan coding dasar ke SMA/SMK di Kebumen.",
      date: "2025-05-18",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      category: "Pengabdian",
      location: "SMKN 1 Kebumen",
    },
  ];

  return (
    <section ref={containerRef} id="activities" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Kegiatan &amp; Dokumentasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Jejak Langkah &amp; Event Seru ComitUPB
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            Intip berbagai kegiatan seru kami mulai dari workshop berkala, bootcamp intensif, kompetisi internal, hingga sharing alumni.
          </p>
        </div>

        {/* Activity Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((act) => (
            <div
              key={act.id}
              className="card-sculpted overflow-hidden flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={act.imageUrl}
                  alt={act.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3.5 py-1 rounded-[4px_12px_12px_4px] border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
                  {act.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-muted">
                    <span className="flex items-center gap-1.5 text-primary font-bold">
                      <Calendar className="w-4 h-4" />
                      {formatDate(act.date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-dark font-medium">
                      <MapPin className="w-4 h-4 text-gray-muted" />
                      {act.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                    {act.name}
                  </h3>

                  <p className="text-sm text-gray-muted leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-primary font-bold">
                  <span>Dokumentasi Kegiatan</span>
                  <span className="group-hover:translate-x-1 transition-transform">Lihat Galeri →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
