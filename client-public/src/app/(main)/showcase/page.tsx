"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import ProjectShowcase from "@/components/sections/project-showcase";
import Achievements from "@/components/sections/achievements";
import CtaBanner from "@/components/sections/cta-banner";
import RegisterModal from "@/components/shared/register-modal";

export default function ShowcasePage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <PageHeader
        badge="Portofolio & Prestasi"
        title="Showcase Karya & Prestasi Mahasiswa"
        description="Bukti nyata kreativitas dan keahlian mahasiswa COMIT UPB melalui proyek real-world dan deretan penghargaan tingkat nasional."
        breadcrumb="Showcase & Prestasi"
      />

      <ProjectShowcase />
      <Achievements />

      <CtaBanner onOpenRegisterModal={() => setIsRegisterOpen(true)} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
