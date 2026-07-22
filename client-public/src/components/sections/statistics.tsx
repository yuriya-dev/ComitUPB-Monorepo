"use client";

import { useRef } from "react";
import { Users, Code2, Trophy, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (statsBoxRef.current) {
        gsap.fromTo(
          statsBoxRef.current.children,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsBoxRef.current,
              start: "top 85%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const statsList = [
    {
      icon: Users,
      value: "250+",
      label: "Anggota Aktif",
      subtext: "Tersebar di berbagai program studi",
    },
    {
      icon: Code2,
      value: "45+",
      label: "Proyek Selesai",
      subtext: "Web, Mobile & AI Apps",
    },
    {
      icon: Trophy,
      value: "18+",
      label: "Juara Kompetisi",
      subtext: "Tingkat regional & nasional",
    },
    {
      icon: GraduationCap,
      value: "95%",
      label: "Alumni Bekerja di IT",
      subtext: "Tech companies & startups",
    },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-dark text-white relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={statsBoxRef} className="bg-slate-900/90 rounded-[28px_8px_28px_28px] border-[2px] border-slate-800 p-8 shadow-[6px_6px_0px_0px_rgba(6,104,198,0.18)] grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          {statsList.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className={`pt-6 lg:pt-0 ${i !== 0 ? "lg:pl-8" : ""} text-center space-y-2`}>
                <div className="w-12 h-12 rounded-[14px_4px_14px_14px] bg-primary/20 text-primary border border-primary/40 flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_rgba(6,104,198,0.25)]">
                  <Icon className="w-6 h-6 text-primary-300" />
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {st.value}
                </div>
                <div className="text-base font-bold text-slate-200">
                  {st.label}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {st.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
