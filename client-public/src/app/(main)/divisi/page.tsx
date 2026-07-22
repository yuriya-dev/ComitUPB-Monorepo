"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import Divisions from "@/components/sections/divisions";
import LearningPaths from "@/components/sections/learning-paths";
import FeaturedVault from "@/components/sections/featured-vault";
import CtaBanner from "@/components/sections/cta-banner";
import RegisterModal from "@/components/shared/register-modal";

export default function DivisiPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <PageHeader
        badge="Bidang Keahlian & Kurikulum"
        title="Divisi & Alur Belajar COMIT UPB"
        description="Eksplorasi divisi peminatan spesifik dan alur kurikulum hands-on yang disesuaikan dengan kebutuhan teknologi & industri modern."
        breadcrumb="Divisi & Belajar"
      />

      <Divisions />
      <LearningPaths />
      <FeaturedVault />

      <CtaBanner onOpenRegisterModal={() => setIsRegisterOpen(true)} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
