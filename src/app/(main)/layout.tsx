"use client";

import { useState } from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import RegisterModal from "@/components/shared/register-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-primary selection:text-white">
      <Navbar onOpenRegisterModal={() => setIsRegisterOpen(true)} />
      <main className="flex-1">
        {/* Pass down modal trigger function via custom prop if needed */}
        {typeof children === "object" && children !== null && "type" in children
          ? children
          : children}
      </main>
      <Footer />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
