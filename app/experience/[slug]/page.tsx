import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences, getExperienceBySlug } from "@/data/experience";

export function generateStaticParams() {
  return experiences.map((item) => ({ slug: item.slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <div className="min-h-full bg-background">
      <header className="border-b border-border px-6 py-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/#choose"
            className="text-sm font-semibold text-accent hover:text-accent-muted"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted">
          Professional Experience
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-heading">
          {experience.title}
        </h1>
        <p className="mt-2 text-lg font-medium text-accent">
          {experience.company}
        </p>
        <p className="mt-1 text-sm text-muted">{experience.period}</p>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          {experience.description}
        </p>

        <ul className="mt-8 space-y-4">
          {experience.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-base leading-relaxed text-foreground"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
