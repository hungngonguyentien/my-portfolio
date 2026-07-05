import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((item) => ({ slug: item.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
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
          Personal Project
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-heading">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{project.period}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-8 space-y-4">
          {project.bullets.map((bullet) => (
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
