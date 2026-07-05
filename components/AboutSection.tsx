"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import AmbientBlobs from "./AmbientBlobs";
import DocumentPanel from "./DocumentPanel";
import { resumeMaterial } from "@/data/materials";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

const UNR_IMAGES = [
  "/unr-1.JPG",
  "/unr-2.JPG",
  "/unr-3.JPG",
  "/unr-4.JPG",
  "/unr-5.JPG",
];

function UnrHover() {
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!hovered) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % UNR_IMAGES.length);
    }, 900);

    return () => window.clearInterval(id);
  }, [hovered]);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setIndex(0);
      }}
    >
      <span
        className="cursor-default font-semibold text-accent underline decoration-accent/40 decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
        tabIndex={0}
        onFocus={() => setHovered(true)}
        onBlur={() => {
          setHovered(false);
          setIndex(0);
        }}
      >
        UNR
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 block w-36 origin-bottom -translate-x-1/2 overflow-hidden rounded-xl shadow-xl shadow-espresso/20 sm:w-40"
            role="img"
            aria-label="Photos from UNR"
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.88, y: 8 }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: 6 }
            }
            transition={{ duration: reduced ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute inset-0 rounded-xl ring-2 ring-accent/40"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: [0.9, 0.35, 0.55] }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-surface-muted">
              {UNR_IMAGES.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={
                    i === index
                      ? reduced
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 1, scale: 1.06 }
                      : { opacity: 0, scale: 1 }
                  }
                  transition={{
                    opacity: { duration: 0.35 },
                    scale: { duration: reduced ? 0 : 0.9, ease: "easeOut" },
                  }}
                />
              ))}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ResumeTrigger({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={onOpen}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="cursor-pointer font-semibold text-accent underline decoration-accent/40 decoration-2 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        full-stack developer
      </button>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 block -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/25 bg-surface/95 px-2.5 py-1 text-xs font-medium text-accent shadow-sm shadow-espresso/10 backdrop-blur-sm"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.95 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: reduced ? 0.12 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            click me
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function AboutSection() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduced = useReducedMotion();
  const item = fadeUpVariants(reduced);
  const container = staggerContainer(reduced);

  return (
    <>
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden border-b border-border bg-background px-6 py-24 pb-32 md:py-32 md:pb-40"
    >
      <AmbientBlobs />

      <motion.div
        className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[280px_1fr] md:gap-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={item} className="relative mx-auto w-full max-w-[280px]">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-champagne/50 via-transparent to-cognac/20 blur-sm"
          />
          <motion.div
            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-sm"
            animate={
              reduced
                ? undefined
                : { y: [0, -6, 0] }
            }
            transition={
              reduced
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <motion.div
              className="absolute inset-0"
              animate={
                reduced
                  ? undefined
                  : { scale: [1, 1.04, 1] }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src="/main-self-photo.JPG"
                alt="Hung Ngo"
                fill
                priority
                sizes="280px"
                className="object-cover object-top"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={container} className="space-y-6 md:space-y-7">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-surface/80 px-3.5 py-1.5 shadow-sm shadow-espresso/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50 opacity-75" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-medium text-heading">
              Open to internships &amp; junior roles
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted"
          >
            About me
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-tight text-heading md:text-5xl"
          >
            Hi, I&apos;m Hung.
          </motion.h1>
          <motion.div
            variants={container}
            className="space-y-5 text-base leading-relaxed text-muted md:text-lg"
          >
            <motion.p variants={item}>
              I&apos;m a <ResumeTrigger onOpen={() => setResumeOpen(true)} />{" "}
              studying Computer Science at <UnrHover />, with experience
              building production software, AI features, and backend systems.
            </motion.p>
            <motion.p variants={item}>
              I build software around things I genuinely care about — from
              production systems and client work to personal projects like game
              servers and niche tools. I care about making them useful, polished,
              and enjoyable to use.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>

    <DocumentPanel
      material={resumeOpen ? resumeMaterial : null}
      onClose={() => setResumeOpen(false)}
    />
    </>
  );
}
