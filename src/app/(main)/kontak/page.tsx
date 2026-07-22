"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import ContactSection from "@/components/sections/contact-section";
import FAQ from "@/components/sections/faq";
import CtaBanner from "@/components/sections/cta-banner";
import RegisterModal from "@/components/shared/register-modal";

export default function KontakPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <PageHeader
        badge="Pusat Informasi & Bantuan"
        title="Kontak & FAQ ComitUPB"
        description="Hubungi tim COMIT UPB untuk informasi pendaftaran, kerja sama, sponsorship, atau pertanyaan seputar kegiatan komunitas."
        breadcrumb="Kontak & FAQ"
      />

      <ContactSection />
      <FAQ />

      <CtaBanner onOpenRegisterModal={() => setIsRegisterOpen(true)} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
