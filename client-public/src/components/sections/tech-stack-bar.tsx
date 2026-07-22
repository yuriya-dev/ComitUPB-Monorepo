"use client";

import { Code2, Globe, Cpu, Terminal, Database, Layers, ShieldCheck, Palette } from "lucide-react";

export default function TechStackBar() {
  const stacks = [
    { name: "React & Next.js", icon: Code2, desc: "Web Frontend" },
    { name: "Python & AI", icon: Cpu, desc: "Data & ML" },
    { name: "TypeScript", icon: Terminal, desc: "Type Safety" },
    { name: "Cyber Security", icon: ShieldCheck, desc: "Networking & Defense" },
    { name: "UI/UX Design", icon: Palette, desc: "Figma & Wireframe" },
    { name: "Cloud & DevOps", icon: Database, desc: "Backend Infra" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100/80">
        <p className="text-center text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
          Teknologi & Stack Unggulan Yang Dipelajari Di COMIT UPB
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
          {stacks.map((stack, i) => {
            const Icon = stack.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center p-3 rounded-xl hover:bg-light-blue/60 transition-colors group cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-light-blue text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-bold text-dark">{stack.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{stack.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
