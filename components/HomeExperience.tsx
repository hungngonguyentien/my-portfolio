"use client";

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import ExperienceSection from "@/components/ExperienceSection";
import FloatingNav from "@/components/FloatingNav";
import MaterialsSection from "@/components/MaterialsSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function HomeExperience() {
  return (
    <>
      <CustomCursor />
      <FloatingNav />
      <main>
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <MaterialsSection />
        <ContactSection />
      </main>
    </>
  );
}
