"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2, UserPlus, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export default function Navbar({ onOpenRegisterModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.06)] border-b-[1.5px] border-slate-200 py-3"
          : "bg-white/75 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          >
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <img src="logo.svg" alt="logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-dark flex items-center gap-1">
                Comit<span className="text-primary">UPB</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-muted -mt-1">
                Universitas Putra Bangsa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-[16px] border-[1.5px] border-slate-300 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.08)]">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-bold rounded-[10px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-primary text-white shadow-[2px_2px_0px_0px_#044484]"
                      : "text-dark/80 hover:text-primary hover:bg-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenRegisterModal}
              className="btn-primary-tactile !py-2.5 !px-5 !text-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Gabung Anggota</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-[12px] bg-light-blue text-dark border border-primary/30 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-[2px_2px_0px_0px_rgba(6,104,198,0.15)]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b-[2px] border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-[12px] text-base font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-white shadow-[3px_3px_0px_0px_#044484]"
                      : "text-dark hover:bg-light-blue hover:text-primary border border-transparent"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-muted"}`} />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full btn-primary-tactile"
            >
              <UserPlus className="w-5 h-5" />
              <span>Daftar Anggota Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
