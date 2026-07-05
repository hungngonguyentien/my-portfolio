"use client";

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import FloatingNav from "@/components/FloatingNav";
import { LensProvider } from "@/components/LensContext";
import MaterialsSection from "@/components/MaterialsSection";
import PickASide from "@/components/PickASide";

export default function HomeExperience() {
  return (
    <LensProvider>
      <CustomCursor />
      <FloatingNav />
      <main>
        <AboutSection />
        <PickASide />
        <MaterialsSection />
        <ContactSection />
      </main>
    </LensProvider>
  );
}
