"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Shield, Smartphone, Cpu, Palette, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getLandingDivisions } from "@/lib/services/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Divisions() {
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

  const iconMap: Record<string, any> = { Globe, Shield, Smartphone, Cpu, Palette };

  const defaultDivisions = [
    {
      id: "div-web",
      name: "Divisi Web Development",
      icon: Globe,
      description: "Fokus membangun website & web apps modern berkecerdasan tinggi dan terintegrasi API.",
      memberCount: 85,
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    },
    {
      id: "div-cyber",
      name: "Divisi Cyber Security",
      icon: Shield,
      description: "Fokus pada keamanan jaringan, analisis sistem, penetration testing, dan tim CTF.",
      memberCount: 45,
      techStack: ["Kali Linux", "Wireshark", "BurpSuite", "Python", "Metasploit", "Bash"],
    },
    {
      id: "div-mobile",
      name: "Divisi Mobile App",
      icon: Smartphone,
      description: "Fokus pada pengembangan aplikasi Android & iOS responsif berkinerja cepat.",
      memberCount: 50,
      techStack: ["Flutter", "Dart", "React Native", "Firebase", "SQLite", "REST API"],
    },
    {
      id: "div-ai",
      name: "Divisi Data & AI",
      icon: Cpu,
      description: "Fokus pada pengolahan data, machine learning, visualisasi insight, dan otomatisasi.",
      memberCount: 40,
      techStack: ["Python", "Pandas", "NumPy", "TensorFlow", "Scikit-Learn", "Power BI"],
    },
    {
      id: "div-uiux",
      name: "Divisi Creative UI/UX",
      icon: Palette,
      description: "Fokus pada desain antarmuka, riset pengalaman pengguna, dan aset grafis digital.",
      memberCount: 38,
      techStack: ["Figma", "Adobe Illustrator", "Design System", "Prototyping", "Usability Test"],
    },
  ];

  const [divisions, setDivisions] = useState<any[]>(defaultDivisions);

  useEffect(() => {
    async function loadDivisions() {
      const liveData = await getLandingDivisions();
      if (liveData && liveData.length > 0) {
        setDivisions(liveData.map((d: any) => ({
          id: d.id,
          name: d.name,
          icon: iconMap[d.icon] || Globe,
          description: d.description,
          memberCount: d.member_count || 30,
          techStack: ["React", "TypeScript", "Tailwind CSS", "API Integrasi"]
        })));
      }
    }
    loadDivisions();
  }, []);

  return (
    <section ref={containerRef} id="divisions" className="py-20 md:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Divisi Keahlian
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Struktur Divisi Spesifik &amp; Terfokus
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            Setiap anggota memilih divisi utama sesuai minat untuk pendalaman materi dan pengerjaan proyek divisi secara lebih intensif.
          </p>
        </div>

        {/* Divisions Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                className="card-sculpted p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary text-white flex items-center justify-center border border-primary-600 shadow-[3px_3px_0px_0px_#044484]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-[6px_14px_14px_6px] bg-light-blue text-primary text-xs font-bold border-[1.5px] border-primary/30">
                      <Users className="w-3.5 h-3.5" />
                      <span>{div.memberCount} Anggota</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-dark">{div.name}</h3>
                    <p className="text-sm text-gray-muted mt-2 leading-relaxed">{div.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-dark/70 mb-2">Tech Stack Utama:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {div.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-[6px_12px_12px_6px] bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
