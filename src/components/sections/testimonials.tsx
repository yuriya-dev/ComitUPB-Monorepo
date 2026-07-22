"use client";

import { useState, useRef } from "react";
import { Testimonial } from "@/types";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const testimonials: Testimonial[] = [
    {
      id: "test-1",
      memberName: "Rizky Ramadhan",
      role: "Frontend Developer at Tech Corp",
      batch: "Informatika '22",
      testimonialText: "Bergabung dengan ComitUPB adalah keputusan terbaik selama kuliah. Di sini saya belajar Next.js dari nol, diajari kakak tingkat yang sangat sabar, dan berhasil mendapat magang pertama saya!",
      memberPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "test-2",
      memberName: "Anisa Putri",
      role: "UI/UX Designer",
      batch: "Sistem Informasi '23",
      testimonialText: "Komunitas yang sangat terbuka & supportive. Projek showcase ComitUPB menjadi salah satu portofolio utama yang dilirik oleh recruiter tempat saya bekerja sekarang.",
      memberPhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "test-3",
      memberName: "Fajar Nugraha",
      role: "Cyber Security Analyst",
      batch: "Teknik Komputer '21",
      testimonialText: "Divisi Cyber Security ComitUPB memberikan pengalaman hands-on CTF yang luar biasa. Banyak ilmu praktis yang tidak saya dapatkan di kelas perkuliahan biasa.",
      memberPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const animateSlideChange = (newIndex: number) => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.25,
        onComplete: () => {
          setCurrentIndex(newIndex);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
          );
        },
      });
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const prevSlide = () => {
    const nextIdx = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    animateSlideChange(nextIdx);
  };

  const nextSlide = () => {
    const nextIdx = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    animateSlideChange(nextIdx);
  };

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Testimoni Anggota &amp; Alumni
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Apa Kata Mereka Tentang ComitUPB?
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            Kisah inspiratif dari para anggota yang berkembang dan berhasil membangun karir di dunia teknologi informasi.
          </p>
        </div>

        {/* Carousel Container */}
        <div ref={cardRef} className="max-w-4xl mx-auto bg-white rounded-[32px_8px_32px_32px] border-[2px] border-slate-900/10 p-8 md:p-12 shadow-[0_16px_40px_-10px_rgba(6,104,198,0.1),6px_6px_0px_0px_rgba(6,104,198,0.14)] relative">
          <Quote className="w-12 h-12 text-primary/15 absolute top-6 left-6 -z-0" />

          <div ref={contentRef} className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar Photo */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-full overflow-hidden border-[3px] border-primary shadow-[4px_4px_0px_0px_rgba(6,104,198,0.25)]">
              <Image
                src={current.memberPhotoUrl}
                alt={current.memberName}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>

            {/* Testimonial Quote & Info */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-base sm:text-lg text-dark/90 italic font-medium leading-relaxed">
                &ldquo;{current.testimonialText}&rdquo;
              </p>

              <div>
                <h4 className="text-lg font-bold text-dark">{current.memberName}</h4>
                <p className="text-xs font-bold text-primary">{current.role}</p>
                <p className="text-xs text-gray-muted font-medium">{current.batch}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => animateSlideChange(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-8 bg-primary shadow-[2px_2px_0px_0px_#044484]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous Testimonial"
                className="p-2.5 rounded-[12px] bg-light-blue text-primary border-[1.5px] border-primary/30 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.15)] hover:bg-primary hover:text-white transition-all active:translate-y-0.5"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Testimonial"
                className="p-2.5 rounded-[12px] bg-light-blue text-primary border-[1.5px] border-primary/30 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.15)] hover:bg-primary hover:text-white transition-all active:translate-y-0.5"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
