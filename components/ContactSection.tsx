"use client";

import { motion, useReducedMotion } from "motion/react";
import CopyEmailButton from "@/components/CopyEmailButton";
import { SocialIcon } from "@/components/SocialIcons";
import { contact } from "@/data/contact";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export default function ContactSection() {
  const reduced = useReducedMotion();
  const item = fadeUpVariants(reduced);
  const container = staggerContainer(reduced);

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background px-6 py-20 md:py-28"
    >
      <motion.div
        className="mx-auto max-w-2xl text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.p
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted"
        >
          Contact
        </motion.p>
        <motion.h2
          variants={item}
          className="mt-2 font-display text-3xl font-semibold text-heading md:text-4xl"
        >
          Let&apos;s talk
        </motion.h2>

        <motion.div
          variants={item}
          className="mx-auto mt-5 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50 opacity-75" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="text-sm font-semibold text-accent">
            Open to internships &amp; junior roles
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg"
        >
          Also open to collaborations and interesting problems. If something
          here resonates, I&apos;d love to hear from you.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <div className="flex items-center gap-3">
            {contact.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-heading transition-colors hover:border-accent-muted hover:bg-surface-muted/60 hover:text-accent"
              >
                <SocialIcon id={link.id} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-5">
          <CopyEmailButton centered />
        </motion.div>
      </motion.div>
    </section>
  );
}
