import type { ExperienceItem } from "./types";

export const experiences: ExperienceItem[] = [
  {
    slug: "address-income",
    title: "Software Engineering Intern",
    company: "Address Income",
    period: "January 2026 – May 2026",
    description:
      "A home investing intelligence platform for realtors and their clients.",
    bullets: [
      "Engineered and deployed a rent prediction model using PyTorch and Scikit-Learn, achieving a MAE of $118 through AWS SAM",
      "Implemented an automated alert system using Postgres, Resend API, Golang (GIN), AWS Lambda to deliver scheduled user notifications and event tracking",
      "Developed reusable React TypeScript UI components and designed the company onboarding flow to improve user activation, streamline edge-case handling, and support adoption across multiple production pages",
    ],
    images: [
      "/address-income-1.jpg",
      "/address-income-2.jpg",
      "/address-income-3-2.png",
    ],
    tech: [
      "PyTorch",
      "Scikit-Learn",
      "AWS SAM",
      "Postgres",
      "Golang",
      "AWS Lambda",
      "React",
      "TypeScript",
    ],
    website: "https://addressincome.com",
  },
  {
    slug: "vinfast-freelance",
    title: "Website Developer",
    company: "Vinfast Phu Dung (Freelance)",
    period: "September 2025 – October 2025",
    description:
      "An official VinFast electric bike dealership website for Phú Dũng in Đắk Lắk.",
    bullets: [
      "Built and deployed a responsive Next.js web application with SEO optimization, structured metadata, and dynamic product management integration using Google Sheets.",
      "Designed scalable UI/UX workflows enabling non-technical clients to manage website content while improving customer engagement and maintainability.",
    ],
    images: ["/phudung-1.png", "/phudung-2.png", "/phudung-3.png"],
    tech: ["Next.js", "React", "TypeScript", "SEO", "Google Sheets"],
    website: "https://vinfastphudung.vn",
  },
];

export function getExperienceBySlug(slug: string): ExperienceItem | undefined {
  return experiences.find((item) => item.slug === slug);
}
