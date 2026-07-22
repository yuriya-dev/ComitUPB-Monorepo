"use client";

import { useState } from "react";
import Hero from "@/components/sections/hero";
import TechStackBar from "@/components/sections/tech-stack-bar";
import LearningPaths from "@/components/sections/learning-paths";
import FeaturedVault from "@/components/sections/featured-vault";
import CommunityBanner from "@/components/sections/community-banner";
import Testimonials from "@/components/sections/testimonials";
import CtaBanner from "@/components/sections/cta-banner";
import RegisterModal from "@/components/shared/register-modal";

export default function HomePage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  return (
    <>
      {/* Hero Section with floating cards & student graphic */}
      <Hero onOpenRegisterModal={openRegisterModal} />

      {/* Tech Stack & Ecosystem Bar (Inspired by reference image logo bar) */}
      <TechStackBar />

      {/* Core Learning Tracks & Features Grid */}
      <LearningPaths />

      {/* Interactive Vault / Featured Module Showcase (Inspired by reference image "Inside the Replay Vault") */}
      <FeaturedVault />

      {/* Community Banner Showcase Section */}
      <CommunityBanner />

      {/* Member Testimonials */}
      <Testimonials />

      {/* Bottom CTA Banner (Inspired by reference image bottom card) */}
      <CtaBanner onOpenRegisterModal={openRegisterModal} />

      {/* Global Register Modal */}
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegisterModal} />
    </>
  );
}
