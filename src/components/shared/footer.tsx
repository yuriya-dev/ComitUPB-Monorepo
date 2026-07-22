import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
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
                <img src="logo.svg" alt="logo" />
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
                href={siteConfig.contact.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord ComitUPB"
                className="w-9 h-9 rounded-[10px_4px_10px_10px] bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 shadow-[2px_2px_0px_0px_rgba(6,104,198,0.2)] group/discord"
              >
                <svg
                  className="w-4 h-4 fill-slate-300 group-hover/discord:fill-white transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
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
