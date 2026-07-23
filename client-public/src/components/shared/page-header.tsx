"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, Terminal } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumb: string;
}

export default function PageHeader({
  badge,
  title,
  description,
  breadcrumb,
}: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-primary/10 via-blue-50/40 to-white overflow-hidden border-b border-slate-100">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          <Link href="/" className="hover:text-primary transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-primary font-bold">{breadcrumb}</span>
        </div>

        {/* Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-blue border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight max-w-3xl mx-auto">
          {title}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
