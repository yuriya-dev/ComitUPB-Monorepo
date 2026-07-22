import Link from "next/link";
import { Code2, Github, Instagram, Linkedin, Send, Mail, MapPin, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-[12px_4px_12px_12px] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <img src="logo.png" alt="logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  Comit<span className="text-primary">UPB</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 -mt-1">
                  Universitas Putra Bangsa
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
              Komunitas IT mahasiswa Universitas Putra Bangsa Kebumen. Wadah pengembangan minat, bakat, skill pemrograman, dan inovasi teknologi digital.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub ComitUPB"
                className="w-9 h-9 rounded-[10px_4px_10px_10px] bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.2)]"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram ComitUPB"
                className="w-9 h-9 rounded-[10px_4px_10px_10px] bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.2)]"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn ComitUPB"
                className="w-9 h-9 rounded-[10px_4px_10px_10px] bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.2)]"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram ComitUPB"
                className="w-9 h-9 rounded-[10px_4px_10px_10px] bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.2)]"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-primary transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Divisi &amp; Track</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/divisi" className="hover:text-primary transition-colors">Web Development</Link>
              </li>
              <li>
                <Link href="/divisi" className="hover:text-primary transition-colors">Mobile App Dev</Link>
              </li>
              <li>
                <Link href="/divisi" className="hover:text-primary transition-colors">Cyber Security</Link>
              </li>
              <li>
                <Link href="/divisi" className="hover:text-primary transition-colors">Data Science &amp; AI</Link>
              </li>
              <li>
                <Link href="/divisi" className="hover:text-primary transition-colors">Creative UI/UX</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak Official</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs">{siteConfig.contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
