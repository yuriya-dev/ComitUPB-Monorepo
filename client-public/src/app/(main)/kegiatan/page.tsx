"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import Activities from "@/components/sections/activities";
import CtaBanner from "@/components/sections/cta-banner";
import RegisterModal from "@/components/shared/register-modal";

export default function KegiatanPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <PageHeader
        badge="Agenda & Dokumentasi"
        title="Kegiatan & Event COMIT UPB"
        description="Jelajahi berbagai aktivitas seru mulai dari workshop rutin, bootcamp intensif, hackathon internal, hingga pengabdian masyarakat."
        breadcrumb="Kegiatan"
      />

      <Activities />

      <CtaBanner onOpenRegisterModal={() => setIsRegisterOpen(true)} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
