import type { ExperienceItem } from "./types";
import type { TechLogo } from "./techLogos";

export const experiences: ExperienceItem[] = [
  {
    slug: "address-income",
    title: "Software Engineering Intern",
    company: "Address Income",
    period: "January 2026 - May 2026",
    description:
      "A home investing intelligence platform for realtors and their clients.",
    bullets: [
      "Engineered and deployed a rent prediction model, achieving a MAE of $118",
      "Implemented an automated alert system to deliver scheduled user notifications and event tracking",
      "Developed reusable UI components and designed the company onboarding flow to improve user activation, streamline edge-case handling, and support adoption across multiple production pages",
    ],
    images: [
      "/address-income-1.jpg",
      "/address-income-2.jpg",
      "/address-income-3-2.png",
    ],
    logos: [
      { id: "pytorch", name: "PyTorch" },
      { id: "scikit-learn", name: "Scikit-learn" },
      { id: "aws", name: "AWS" },
      { id: "go", name: "Go" },
      { id: "postgresql", name: "PostgreSQL" },
      { id: "react", name: "React" },
      { id: "typescript", name: "TypeScript" },
    ] satisfies TechLogo[],
    website: "https://addressincome.com",
  },
  {
    slug: "vinfast-freelance",
    title: "Website Developer",
    company: "VinFast Phu Dung (Freelance)",
    period: "September 2025 - October 2025",
    description:
      "An official VinFast electric bike dealership website for Phú Dũng in Đắk Lắk.",
    bullets: [
      "Built and deployed a responsive web application with SEO optimization, structured metadata, and dynamic product management",
      "Designed scalable UI/UX workflows enabling non-technical clients to manage website content while improving customer engagement and maintainability",
    ],
    images: ["/phudung-1.png", "/phudung-2.png", "/phudung-3.png"],
    logos: [
      { id: "nextjs", name: "Next.js" },
      { id: "react", name: "React" },
      { id: "vite", name: "Vite" },
      { id: "supabase", name: "Supabase" },
    ] satisfies TechLogo[],
    website: "https://vinfastphudung.vn",
  },
];

export function getExperienceBySlug(slug: string): ExperienceItem | undefined {
  return experiences.find((item) => item.slug === slug);
}
