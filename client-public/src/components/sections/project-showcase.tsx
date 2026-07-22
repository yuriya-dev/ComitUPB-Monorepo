"use client";

import { useRef } from "react";
import { Project } from "@/types";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 50, opacity: 0, scale: 0.95 },
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

  const projects: Project[] = [
    {
      id: "proj-1",
      name: "Sistem Informasi Akademik UPB (SIAKAD Mobile)",
      description: "Aplikasi Android & iOS mahasiswa untuk mengecek KRS, jadwal kuliah, dan transkrip nilai secara real-time.",
      technologies: ["Flutter", "Dart", "REST API", "PostgreSQL"],
      githubLink: "https://github.com/comitupb/siakad-mobile",
      demoUrl: "https://siakad.comitupb.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "proj-2",
      name: "E-Commerce UMKM Kebumen Marketplace",
      description: "Platform digitalisasi produk UMKM lokal Kebumen dengan payment gateway otomatis dan fitur live chat seller.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Midtrans"],
      githubLink: "https://github.com/comitupb/umkm-kebumen",
      demoUrl: "https://umkm-kebumen.vercel.app",
      thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "proj-3",
      name: "AI Flood Early Warning & Disaster System",
      description: "Sistem deteksi dini potensi banjir wilayah Kebumen memanfaatkan sensor IoT dan algoritma Machine Learning.",
      technologies: ["Python", "TensorFlow", "IoT Sensor", "FastAPI", "React"],
      githubLink: "https://github.com/comitupb/ai-early-warning",
      demoUrl: "https://disaster-ai.comitupb.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "proj-4",
      name: "CTF Vulnerability Lab & Training Platform",
      description: "Platform simulator keamanan siber interaktif untuk latihan penyelesaian tantangan CTF anggota ComitUPB.",
      technologies: ["Docker", "Node.js", "Express", "Tailwind CSS"],
      githubLink: "https://github.com/comitupb/ctf-lab-platform",
      demoUrl: "https://ctf.comitupb.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section ref={containerRef} id="projects" className="py-20 md:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Project Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Karya &amp; Inovasi Mahasiswa ComitUPB
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            Berbagai proyek nyata yang dikembangkan oleh anggota komunitas dalam kegiatan bootcamp, hackathon, dan riset kolaboratif.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="card-sculpted overflow-hidden flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={proj.thumbnailUrl}
                  alt={proj.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Content Body */}
              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-gray-muted leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-[6px_12px_12px_6px] bg-light-blue text-primary text-xs font-bold border border-primary/30 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.1)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-dark hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
