"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play, Star, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export default function Hero({ onOpenRegisterModal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const polaroidBackRef = useRef<HTMLDivElement>(null);
  const polaroidFrontRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);

  // Rotating phrases for looping text animation
  const phrases = [
    "Kembangkan Karir IT.",
    "Bangun Portofolio Impian.",
    "Kuasai Skill Masa Depan.",
    "Raih Kesempatan Magang.",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const phraseRef = useRef<HTMLSpanElement>(null);

  // Loop phrase animation using GSAP
  useEffect(() => {
    const interval = setInterval(() => {
      if (phraseRef.current) {
        gsap.to(phraseRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
            gsap.fromTo(
              phraseRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
            );
          },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  useGSAP(
    () => {
      // 1. Parallax background via GSAP ScrollTrigger scrub
      if (bgRef.current && containerRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Left column elements entrance animation (stagger fade up)
      if (leftColRef.current) {
        const elements = leftColRef.current.children;
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // 3. Right column polaroid cards entrance animation
      if (polaroidBackRef.current && polaroidFrontRef.current) {
        gsap.fromTo(
          polaroidBackRef.current,
          { scale: 0.8, opacity: 0, rotation: -12, x: -30 },
          { scale: 1, opacity: 1, rotation: -6, x: 0, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
        );

        gsap.fromTo(
          polaroidFrontRef.current,
          { scale: 0.8, opacity: 0, rotation: 10, x: 30 },
          { scale: 1, opacity: 1, rotation: 3, x: 0, duration: 1, delay: 0.45, ease: "back.out(1.7)" }
        );
      }

      // 4. Badges pop-in entrance
      if (badge1Ref.current && badge2Ref.current) {
        gsap.fromTo(
          [badge1Ref.current, badge2Ref.current],
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            delay: 0.7,
            ease: "elastic.out(1, 0.5)",
          }
        );

        // 5. Continuous Floating Animation for Badges
        gsap.to(badge1Ref.current, {
          y: -8,
          rotation: 4,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(badge2Ref.current, {
          y: 8,
          rotation: -5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden text-dark">
      {/* Background Image with GSAP ScrollTrigger Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      />
      {/* Overlay gradient to keep text readable & crisp */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/85 via-white/70 to-white/90 backdrop-blur-[2px]" />

      {/* Ambient Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Hack Club Badge Style */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-primary/20 text-primary text-xs font-bold uppercase tracking-widest -rotate-1 hover:rotate-0 transition-transform duration-200 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>Ecosystem &amp; Platform Belajar IT #1 UPB</span>
              </div>
            </div>

            {/* Main Headline with Looping Text & Without Wavy Line */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-dark">
              Belajar. Terapkan. <br />
              <span ref={phraseRef} className="text-gradient inline-block min-h-[1.2em]">
                {phrases[currentPhraseIndex]}
              </span>
            </h1>

            {/* Body Text */}
            <p className="text-base sm:text-xl text-gray-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Akses tanpa batas ke pelatihan Web Dev, Cyber Security, UI/UX, AI, dan Mobile App. Belajar langsung dari mentor praktisi dan bangun portofolio impianmu di Universitas Putra Bangsa.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenRegisterModal}
                className="w-full sm:w-auto btn-primary-tactile -rotate-1 hover:rotate-0 transition-transform"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/divisi"
                className="w-full sm:w-auto btn-secondary-sculpted rotate-1 hover:rotate-0 transition-transform"
              >
                <Play className="w-4 h-4 text-primary fill-primary" />
                <span>Jelajahi Divisi</span>
              </Link>
            </div>

            {/* Rating & Social Proof */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3 overflow-hidden">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Member 1" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Member 2" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Member 3" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Member 4" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-gray-muted mt-1 font-medium">
                  Bergabung dengan <span className="font-bold text-dark">250+ Mahasiswa</span> COMIT UPB
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hack Club Style Stacked Polaroid Photo Cards & Badges */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none min-h-[460px]">
              
              {/* Back Polaroid Card (Rotated -6 deg) */}
              <div 
                ref={polaroidBackRef}
                className="absolute top-4 -left-4 w-[88%] hack-polaroid -rotate-6 z-10"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="hero1.png"
                    alt="Workshop ComitUPB"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs font-bold text-slate-700 tracking-wider">#SabtuKopdar</span>
                </div>
              </div>

              {/* Main Front Polaroid Card (Rotated 3 deg) */}
              <div 
                ref={polaroidFrontRef}
                className="relative w-[92%] ml-auto hack-polaroid rotate-3 z-20"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="hero2.png"
                    alt="Mahasiswa ComitUPB Belajar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                      Komunitas IT Teladan
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">Universitas Putra Bangsa Kebumen</h3>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-800">Komunitas IT UPB</span>
                  <span className="text-[11px] text-gray-muted font-semibold">99+ Members</span>
                </div>
              </div>

              {/* Hack Club Interactive Floating Sticker Badge 1 */}
              <div 
                ref={badge1Ref}
                className="absolute -top-4 right-0 bg-white p-3.5 rounded-2xl border-2 border-primary/20 shadow-hack z-30 flex items-center gap-3 rotate-6 hover:rotate-0 hover:scale-110 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-dark leading-none">150+ Jam</div>
                  <div className="text-[11px] text-gray-muted font-medium mt-1">Modul &amp; Bootcamp</div>
                </div>
              </div>

              {/* Hack Club Interactive Floating Sticker Badge 2 */}
              <div 
                ref={badge2Ref}
                className="absolute -bottom-4 left-2 bg-white p-3.5 rounded-2xl border-2 border-slate-200 shadow-hack z-30 flex items-center gap-3 -rotate-3 hover:rotate-0 hover:scale-110 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-dark leading-none">15+ Mentor</div>
                  <div className="text-[11px] text-gray-muted font-medium mt-1">Praktisi Senior</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
