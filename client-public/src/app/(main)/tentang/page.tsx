"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import About from "@/components/sections/about";
import WhyJoin from "@/components/sections/why-join";
import Statistics from "@/components/sections/statistics";
import FAQ from "@/components/sections/faq";
import CtaBanner from "@/components/sections/cta-banner";
import RegisterModal from "@/components/shared/register-modal";

export default function TentangPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <PageHeader
        badge="Profil & Organisasi"
        title="Tentang COMIT UPB"
        description="Mengenal lebih dekat Komunitas IT Universitas Putra Bangsa Kebumen, profil, visi misi, serta komitmen kami dalam membangun generasi talenta digital unggulan."
        breadcrumb="Tentang Kami"
      />

      <About />
      <Statistics />
      <WhyJoin />
      <FAQ />

      <CtaBanner onOpenRegisterModal={() => setIsRegisterOpen(true)} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
