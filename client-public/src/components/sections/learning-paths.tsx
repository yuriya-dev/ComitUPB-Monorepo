"use client";

import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LearningPaths() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardsGridRef.current && containerRef.current) {
        const cards = cardsGridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const paths = [
    {
      id: "web-dev",
      title: "Web Development",
      badge: "Populer",
      description: "Pelajari pembuatan aplikasi web modern dari dasar hingga advanced dengan React, Next.js, Node.js, dan Tailwind CSS.",
      skills: ["Frontend Dev", "Backend API", "Fullstack Integration", "Deployment"],
      tools: "HTML, CSS, TS, React, Next.js",
      blobClass: "rounded-blob-1 bg-primary/10 border border-primary/20",
      iconSvg: (
        <svg className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      badge: "Trending",
      description: "Kuasai pembuatan aplikasi mobile cross-platform Android & iOS menggunakan Flutter dan React Native.",
      skills: ["Cross-platform UI", "State Management", "REST API", "Play Store Release"],
      tools: "Flutter, Dart, React Native, Firebase",
      blobClass: "rounded-blob-2 bg-blue-500/10 border border-blue-500/20",
      iconSvg: (
        <svg className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "cyber-security",
      title: "Cyber Security & Defense",
      badge: "High Demand",
      description: "Pelajari prinsip keamanan jaringan, ethical hacking, CTF competition, dan analisis kerentanan sistem.",
      skills: ["Network Security", "Ethical Hacking", "CTF Challenges", "Penetration Testing"],
      tools: "Linux, Wireshark, BurpSuite",
      blobClass: "rounded-blob-3 bg-sky-500/10 border border-sky-500/20",
      iconSvg: (
        <svg className="w-7 h-7 text-sky-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: "data-ai",
      title: "Data Science & AI",
      badge: "Masa Depan",
      description: "Eksplorasi analisis data, machine learning, visualisasi data, dan pemanfaatan AI untuk pemecahan masalah.",
      skills: ["Data Analysis", "Machine Learning", "Python Scripting", "Data Viz"],
      tools: "Python, Pandas, TensorFlow",
      blobClass: "rounded-blob-1 bg-indigo-500/10 border border-indigo-500/20",
      iconSvg: (
        <svg className="w-7 h-7 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "ui-ux",
      title: "UI/UX Design & Prototyping",
      badge: "Kreatif",
      description: "Rancang antarmuka aplikasi yang estetik, intuitif, dan responsif dengan metodologi Design Thinking.",
      skills: ["User Research", "Wireframing", "Interactive Prototype", "Design System"],
      tools: "Figma, Adobe XD, Whimsical",
      blobClass: "rounded-blob-2 bg-rose-500/10 border border-rose-500/20",
      iconSvg: (
        <svg className="w-7 h-7 text-rose-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud Basic",
      badge: "Essential",
      description: "Pahami pengelolaan server, CI/CD pipeline, kontainerisasi Docker, dan cloud hosting.",
      skills: ["Docker Containers", "Git Version Control", "CI/CD Deployment", "Cloud Admin"],
      tools: "Git, GitHub, Docker, AWS",
      blobClass: "rounded-blob-3 bg-emerald-500/10 border border-emerald-500/20",
      iconSvg: (
        <svg className="w-7 h-7 text-emerald-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
  ];

  return (
    <section ref={containerRef} id="learning" className="py-24 bg-white text-dark relative overflow-hidden">
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,104,198,0.06)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Bidang Pembelajaran
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight">
            Pilih Track Pembelajaran Sesuai Minat &amp; Karir Impianmu
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Kurikulum ComitUPB dirancang secara hands-on dan berbasis studi kasus praktis untuk membekali kamu dengan skill teknologi yang paling dibutuhkan industri.
          </p>
        </div>

        {/* Grid Cards */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((item) => (
            <div
              key={item.id}
              className="card-sculpted p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Top Bar Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.blobClass}`}>
                    {item.iconSvg}
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Skills List */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-dark/70">Yang Dipelajari:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {item.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Tools */}
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
                <span className="font-bold text-dark">Tools &amp; Tech:</span> {item.tools}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
