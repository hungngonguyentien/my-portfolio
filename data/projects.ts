import type { ProjectItem } from "./types";

export const projects: ProjectItem[] = [
  {
    slug: "ryftborn",
    title: "Ryftborn",
    period: "Spring 2026 – Present",
    description:
      "Custom multiplayer game server deployed on VPS (Hetzner) with automated Git-based deployment workflows.",
    bullets: [
      "Engineered champion-based PvP combat systems, ranked matchmaking, progression mechanics, and multiplayer gameplay features using custom server plugins.",
      "Built and maintained VPS infrastructure with GitHub-based CI/CD pipelines for automated deployment, live testing, and rapid iteration.",
      "Designed gameplay UX systems including combat feedback, sound effects, onboarding flow, and progression rewards through iterative player testing.",
    ],
    tech: ["Java", "Minecraft Plugins", "VPS", "GitHub Actions", "Hetzner"],
    images: ["/minecraft-1.png", "/minecraft-2.png", "/minecraft-3.png"],
  },
  {
    slug: "worktemply",
    title: "WorkTemply",
    period: "Fall 2025 – Present",
    description:
      "Full-stack SaaS platform built with Next.js (frontend + backend), MongoDB, and deployed on Vercel.",
    bullets: [
      "Built a production-ready SaaS with user authentication (NextAuth), Paddle billing integration, and customer email handling through Resend.",
      "Developed 30+ AI-powered writing workflows alongside SEO-optimized landing pages and public template systems focused on discoverability and performance.",
    ],
    tech: ["Next.js", "MongoDB", "NextAuth", "Paddle", "Vercel"],
    images: [
      "/work-temply-1.png",
      "/work-temply-2.png",
      "/work-temply-3.png",
    ],
    website: "https://worktemply.com",
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((item) => item.slug === slug);
}
