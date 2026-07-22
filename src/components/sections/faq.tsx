"use client";

import { useState, useRef } from "react";
import { FAQItem } from "@/types";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (accordionRef.current) {
        gsap.fromTo(
          accordionRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 85%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const faqList: FAQItem[] = [
    {
      id: "faq-1",
      question: "Apakah mahasiswa non-Informatika bisa bergabung dengan ComitUPB?",
      answer: "Tentu saja! ComitUPB terbuka untuk seluruh mahasiswa Universitas Putra Bangsa dari jurusan apapun (Manajemen, Akuntansi, Sistem Informasi, Teknik Komputer, dll) selama memiliki antusiasme dan komitmen belajar IT.",
    },
    {
      id: "faq-2",
      question: "Apakah ada biaya pendaftaran atau iuran bulanan?",
      answer: "Pendaftaran anggota ComitUPB 100% GRATIS. Seluruh kegiatan mentoring dasar, bootcamp internal, dan sharing session diselenggarakan tanpa pemungutan biaya pendaftaran.",
    },
    {
      id: "faq-3",
      question: "Saya pemula dan belum pernah coding sama sekali, apakah bisa ikut?",
      answer: "Sangat bisa! Kurikulum di ComitUPB dirancang berjenjang dari level Beginner hingga Advanced. Kamu akan dibimbing oleh mentor senior dari pengenalan logika pemrograman dasar hingga membangun proyek.",
    },
    {
      id: "faq-4",
      question: "Kapan jadwal pendaftaran anggota baru dibuka?",
      answer: "Pendaftaran anggota baru (Open Recruitment) dibuka setiap awal semester gasal dan genap. Kamu bisa mendaftar kapan saja melalui form di website ini untuk mendapatkan informasi jadwal terupdate.",
    },
    {
      id: "faq-5",
      question: "Bagaimana sistem pertemuan dan pelatihan di ComitUPB?",
      answer: "Kegiatan rutin diselenggarakan dalam mode hybrid (online melalui Discord/Google Meet dan offline di Lab Komputer Kampus UPB) sesuai kesepakatan jadwal divisi.",
    },
  ];

  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={containerRef} id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-sculpted">
            Pertanyaan Umum (FAQ)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Sering Ditanyakan Calon Anggota
          </h2>
          <p className="text-base sm:text-lg text-gray-muted leading-relaxed">
            Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan mengenai pendaftaran dan kegiatan ComitUPB.
          </p>
        </div>

        {/* Accordion List */}
        <div ref={accordionRef} className="max-w-3xl mx-auto space-y-4">
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="card-sculpted overflow-hidden transition-all duration-300 bg-white"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-light-blue/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-dark flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-muted transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-muted leading-relaxed border-t border-slate-200 animate-fade-in font-medium">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
