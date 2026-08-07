"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import TechLogoRow from "@/components/TechLogoRow";
import { experiences } from "@/data/experience";
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

export default function ExperienceSection() {
  const reduced = useReducedMotion();
  const item = fadeUpVariants(reduced);
  const container = staggerContainer(reduced);

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-border bg-surface-muted/30 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 md:mb-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted"
          >
            Career
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-2 font-display text-3xl font-semibold text-heading md:text-4xl"
          >
            Experience
          </motion.h2>
          <motion.p variants={item} className="mt-3 max-w-xl text-muted">
            Roles where I shipped production software, AI systems, and client
            websites.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Vertical line sits in a gutter between date and content */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[15.5rem] top-2 hidden w-px bg-border md:block"
          />

          <ol className="space-y-12 md:space-y-16">
            {experiences.map((exp) => (
              <motion.li
                key={exp.slug}
                className="relative grid gap-4 md:grid-cols-[14.5rem_1.5rem_1fr] md:items-start md:gap-0"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* Time + tech logos — stay left of the line */}
                <motion.div
                  variants={item}
                  className="flex items-start gap-3 md:flex-col md:items-end md:pr-6 md:pt-1"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent ring-4 ring-surface-muted/30 md:hidden"
                  />
                  <div className="min-w-0 flex-1 md:flex-none md:text-right">
                    <time className="block whitespace-nowrap text-sm font-semibold tracking-tight text-heading">
                      {exp.period}
                    </time>
                    {exp.logos && exp.logos.length > 0 && (
                      <TechLogoRow logos={exp.logos} />
                    )}
                  </div>
                </motion.div>

                {/* Gutter with timeline marker */}
                <div
                  aria-hidden
                  className="relative hidden h-full justify-center md:flex"
                >
                  <span className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-accent bg-surface shadow-sm" />
                </div>

                {/* Content */}
                <motion.article
                  variants={item}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-accent-muted hover:shadow-md"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold text-heading">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-medium text-accent">
                      {exp.company}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm leading-relaxed text-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {exp.images && exp.images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.images.map((src, i) => (
                        <ImageThumb
                          key={src}
                          src={src}
                          alt={`${exp.title} screenshot ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {exp.website && (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-blush transition-colors hover:bg-accent-muted"
                    >
                      View company website
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </motion.article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
