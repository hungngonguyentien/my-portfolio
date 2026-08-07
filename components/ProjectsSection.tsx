"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { projects } from "@/data/projects";
import type { ProjectItem } from "@/data/types";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

function ImageThumb({ src, alt }: { src: string; alt: string }) {
  const [preview, setPreview] = useState(false);
  const reduced = useReducedMotion();

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setPreview(true)}
      onMouseLeave={() => setPreview(false)}
      onFocus={() => setPreview(true)}
      onBlur={() => setPreview(false)}
    >
      <button
        type="button"
        aria-label={alt}
        className="relative block h-14 w-14 overflow-hidden rounded-lg border border-border bg-surface-muted shadow-sm transition-transform duration-200 hover:scale-105 hover:border-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:h-16 sm:w-16"
      >
        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
      </button>

      <AnimatePresence>
        {preview && (
          <motion.span
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 block origin-bottom -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-espresso/20"
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }
            }
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 6 }}
            transition={{
              duration: reduced ? 0.12 : 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="block h-auto max-h-[min(320px,50vh)] w-auto max-w-[min(360px,80vw)]"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ProjectSlide({ project }: { project: ProjectItem }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-semibold text-heading">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">Personal Project</p>
        </div>
        <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
          {project.period}
        </span>
      </div>

      <p className="mt-4 text-base leading-relaxed text-muted">
        {project.description}
      </p>

      <ul className="mt-5 flex-1 space-y-2">
        {project.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2 text-sm leading-relaxed text-foreground"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {bullet}
          </li>
        ))}
      </ul>

      {project.images && project.images.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.images.map((src, i) => (
            <ImageThumb
              key={src}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}

      {project.tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent dark:bg-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-blush transition-colors hover:bg-accent-muted"
        >
          View project website
          <span aria-hidden>→</span>
        </a>
      )}
    </article>
  );
}

const AUTO_MS = 5000;

export default function ProjectsSection() {
  const reduced = useReducedMotion();
  const item = fadeUpVariants(reduced);
  const container = staggerContainer(reduced);

  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const project = projects[index];

  const goTo = useCallback(
    (next: number) => {
      const clamped = ((next % count) + count) % count;
      setDirection(clamped > index || (index === count - 1 && clamped === 0) ? 1 : -1);
      // Handle wrap: going from 0 to last is reverse, last to 0 is forward
      if (index === 0 && clamped === count - 1) setDirection(-1);
      if (index === count - 1 && clamped === 0) setDirection(1);
      setIndex(clamped);
    },
    [count, index],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Auto-advance every 5s
  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, count]);

  // Keyboard when section is in view
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const section = document.getElementById("projects");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const slideVariants = {
    enter: (dir: number) =>
      reduced ? { opacity: 0 } : { x: dir > 0 ? 56 : -56, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: (dir: number) =>
      reduced ? { opacity: 0 } : { x: dir > 0 ? -56 : 56, opacity: 0 },
  };

  if (!project) return null;

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-background px-6 py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <motion.p
              variants={item}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted"
            >
              Build
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-2 font-display text-3xl font-semibold text-heading md:text-4xl"
            >
              Projects
            </motion.h2>
            <motion.p variants={item} className="mt-3 max-w-xl text-muted">
              Things I have built
            </motion.p>
          </div>

          <motion.div variants={item} className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-heading shadow-sm transition-colors hover:border-accent-muted hover:bg-surface-muted"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-heading shadow-sm transition-colors hover:border-accent-muted hover:bg-surface-muted"
            >
              →
            </button>
          </motion.div>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.slug}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reduced ? 0.15 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectSlide project={project} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Go to ${p.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-accent"
                  : "w-2 bg-border hover:bg-accent-muted"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-muted">
          {index + 1} / {count}
        </p>
      </div>
    </section>
  );
}
