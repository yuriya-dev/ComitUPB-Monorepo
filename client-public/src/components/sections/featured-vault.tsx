"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Play, BookOpen, Sparkles, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getLandingVaultModules } from "@/lib/services/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function FeaturedVault() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const vaultBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Smooth GSAP Parallax for Background Image
      if (bgRef.current && sectionRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Header Entrance Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3. Vault Box Entrance Scale & Fade
      if (vaultBoxRef.current) {
        gsap.fromTo(
          vaultBoxRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: vaultBoxRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const categories = [
    { id: "all", label: "Semua Topik" },
    { id: "web", label: "Web Development" },
    { id: "cyber", label: "Cyber Security" },
    { id: "ai", label: "AI & Data Science" },
    { id: "design", label: "UI/UX Design" },
  ];

  const defaultModules = [
    {
      id: 1,
      category: "web",
      title: "Mastering Next.js 14 & Tailwind CSS Masterclass",
      speaker: "Fajar Pratama (Alumni Senior Web Dev)",
      duration: "45:32",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      level: "Intermediate",
    },
    {
      id: 2,
      category: "cyber",
      title: "Fundamental Network Penetration Testing & CTF",
      speaker: "Rizal Hidayat (Lead Cyber Security)",
      duration: "58:10",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      level: "Beginner - Advanced",
    },
    {
      id: 3,
      category: "ai",
      title: "Building LLM Apps with Python & OpenAI API",
      speaker: "Dian Sastro (Data & AI Enthusiast)",
      duration: "38:17",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      level: "Advanced",
    },
    {
      id: 4,
      category: "design",
      title: "Design System & Prototyping di Figma dari Nol",
      speaker: "Anisa Rahma (UI/UX Designer)",
      duration: "42:05",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80",
      level: "Beginner",
    },
  ];

  const [modules, setModules] = useState<any[]>(defaultModules);

  useEffect(() => {
    async function loadVault() {
      const liveData = await getLandingVaultModules();
      if (liveData && liveData.length > 0) {
        setModules(liveData.map(m => ({
          id: m.id,
          category: m.category,
          title: m.title,
          speaker: m.speaker,
          duration: m.duration,
          image: m.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
          level: m.level
        })));
      }
    }
    loadVault();
  }, []);

  const filteredModules = modules.filter((mod) => {
    const matchCategory = activeTab === "all" || mod.category === activeTab;
    const matchSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        mod.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden text-dark">
      {/* GSAP Parallax Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50/90 via-light-blue/40 to-slate-50/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="badge-sculpted">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vault Modul Pembelajaran</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Akses Rekaman Workshop &amp; Modul Eksklusif
          </h2>
          <p className="text-base text-slate-600">
            Satu vault terpadu. Ribuan insight dan materi praktis untuk mendukung perjalanan belajar IT-mu.
          </p>
        </div>

        {/* Vault Container Box */}
        <div ref={vaultBoxRef} className="bg-white rounded-[32px_8px_32px_32px] p-6 sm:p-8 border-[2px] border-slate-900/10 shadow-[0_16px_40px_-10px_rgba(6,104,198,0.1),6px_6px_0px_0px_rgba(6,104,198,0.14)]">
          
          {/* Upper Bar: Highlights + Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
            
            {/* Highlights bullet badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-600 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px_3px_8px_8px] bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </div>
                <span>Pencarian Cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px_3px_8px_8px] bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Struktur Rapi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px_3px_8px_8px] bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Update Berkelanjutan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px_3px_8px_8px] bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span>Akses Bebas kapanpun</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari topik, materi, atau mentormu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border-[1.5px] border-slate-300 bg-slate-50 text-sm text-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white shadow-[2px_2px_0px_0px_#CBD5E1] transition-all"
              />
            </div>

          </div>

          {/* Main Vault Workspace: Sidebar Category Tabs + Video Cards List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Sidebar Category Tabs */}
            <div className="lg:col-span-3 space-y-1 border-r border-slate-200 pr-0 lg:pr-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 block">
                Kategori Materi
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-[8px_16px_16px_8px] text-sm font-bold transition-all flex items-center justify-between ${
                    activeTab === cat.id
                      ? "bg-primary text-white border border-primary-600 shadow-[3px_3px_0px_0px_#044484]"
                      : "text-slate-700 hover:bg-light-blue hover:text-primary border border-transparent"
                  }`}
                >
                  <span>{cat.label}</span>
                  {activeTab === cat.id && <Sparkles className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>

            {/* Content Modules Grid */}
            <div className="lg:col-span-9">
              {filteredModules.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Tidak ada materi yang cocok dengan kriteria pencarianmu.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredModules.map((mod) => (
                    <div
                      key={mod.id}
                      className="card-sculpted p-4 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        {/* Thumbnail image with duration badge */}
                        <div className="relative rounded-[16px_4px_16px_16px] overflow-hidden aspect-video border border-slate-200">
                          <img
                            src={mod.image}
                            alt={mod.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors" />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-[4px_8px_8px_4px] bg-dark/90 text-white text-[10px] font-mono font-bold border border-slate-700">
                            {mod.duration}
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded-[12px_4px_12px_12px] bg-primary text-white flex items-center justify-center shadow-[3px_3px_0px_0px_#044484] border border-primary-600">
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Title & speaker */}
                        <div>
                          <span className="px-2.5 py-0.5 rounded-[4px_10px_10px_4px] bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                            {mod.level}
                          </span>
                          <h4 className="text-sm font-bold text-dark mt-1.5 group-hover:text-primary transition-colors line-clamp-2">
                            {mod.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 font-medium">
                            {mod.speaker}
                          </p>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Video Workshop</span>
                        <button className="px-3.5 py-1.5 rounded-[10px] bg-white border-[1.5px] border-primary text-primary font-bold shadow-[2px_2px_0px_0px_rgba(6,104,198,0.2)] hover:bg-primary hover:text-white transition-all">
                          Akses Modul
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
