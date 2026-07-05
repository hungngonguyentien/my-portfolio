"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import ContentCard from "./ContentCard";
import { useLens, type Lens } from "./LensContext";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

type Side = Lens;
type ImageState = "neutral" | "got-picked" | "not-picked";

function getImageState(
  side: Side,
  selected: Side | null,
  hovered: Side | null,
): ImageState {
  if (selected === side) return "got-picked";
  // Unselected character: neutral on hover, not-picked otherwise
  if (selected && selected !== side) {
    return hovered === side ? "neutral" : "not-picked";
  }
  return "neutral";
}

function getImageSrc(side: Side, state: ImageState): string {
  return `/${side}-${state}.png`;
}

interface CharacterCardProps {
  side: Side;
  label: string;
  description: string;
  imageState: ImageState;
  isHovered: boolean;
  isSelected: boolean;
  isLoser: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}

function CharacterCard({
  side,
  label,
  description,
  imageState,
  isHovered,
  isSelected,
  isLoser,
  onHover,
  onLeave,
  onSelect,
}: CharacterCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onSelect}
      className="group relative flex w-full max-w-sm flex-col items-center gap-3 bg-transparent p-0"
      aria-pressed={isSelected}
      aria-label={`Select ${label}`}
      animate={
        reduced
          ? {
              opacity: isLoser ? 0.55 : 1,
              scale: isHovered || isSelected ? 1.04 : 1,
            }
          : {
              opacity: isLoser ? 0.45 : 1,
              scale: isSelected ? 1.06 : isHovered ? 1.04 : isLoser ? 0.94 : 1,
              y: isSelected ? -4 : isLoser ? 8 : 0,
              filter: isLoser ? "grayscale(0.45)" : "grayscale(0)",
            }
      }
      transition={
        isSelected && !reduced
          ? { type: "spring", stiffness: 320, damping: 16 }
          : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="relative flex h-80 w-full items-end justify-center">
        {!reduced && isSelected && (
          <motion.div
            aria-hidden
            className="absolute bottom-2 left-1/2 h-6 w-36 -translate-x-1/2 rounded-full bg-accent/35 blur-md"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: [0.5, 0.9, 0.65], scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
        <Image
          src={getImageSrc(side, imageState)}
          alt={`${label} — ${imageState.replace("-", " ")}`}
          width={280}
          height={360}
          className="relative h-full w-auto max-w-full object-contain object-bottom"
          priority={side === "work"}
        />
      </div>

      <div className="max-w-[16rem] text-center">
        <p
          className={`font-display text-lg font-semibold transition-colors ${
            isSelected || isHovered ? "text-accent" : "text-heading"
          }`}
        >
          {label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </motion.button>
  );
}

export default function PickASide() {
  const [hovered, setHovered] = useState<Side | null>(null);
  const { selected, setSelected } = useLens();
  const reduced = useReducedMotion();
  const item = fadeUpVariants(reduced);
  const container = staggerContainer(reduced);

  const workImageState = getImageState("work", selected, hovered);
  const projectsImageState = getImageState("projects", selected, hovered);

  return (
    <section
      id="choose"
      className="scroll-mt-24 bg-surface-muted/40 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted"
          >
            Explore
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-2 font-display text-3xl font-semibold text-heading md:text-4xl"
          >
            Choose how you want to explore my work
          </motion.h2>
        </motion.div>

        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-start justify-center gap-10 sm:flex-row sm:items-stretch sm:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={item} className="flex w-full justify-center">
            <CharacterCard
              side="work"
              label="Professional"
              description="Internships, client work, production systems, ML/backend, product features"
              imageState={workImageState}
              isHovered={hovered === "work"}
              isSelected={selected === "work"}
              isLoser={selected === "projects" && hovered !== "work"}
              onHover={() => setHovered("work")}
              onLeave={() => setHovered(null)}
              onSelect={() => setSelected("work")}
            />
          </motion.div>
          <motion.div variants={item} className="flex w-full justify-center">
            <CharacterCard
              side="projects"
              label="Builder"
              description="Projects built from curiosity — multiplayer systems, niche tools, experiments, and software around things I genuinely care about"
              imageState={projectsImageState}
              isHovered={hovered === "projects"}
              isSelected={selected === "projects"}
              isLoser={selected === "work" && hovered !== "projects"}
              onHover={() => setHovered("projects")}
              onLeave={() => setHovered(null)}
              onSelect={() => setSelected("projects")}
            />
          </motion.div>
        </motion.div>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="placeholder"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center"
              >
                <p className="font-display text-xl font-semibold text-heading">
                  Choose a lens above to get started
                </p>
                <p className="mt-2 text-sm text-muted">
                  Professional work or builder projects — your call.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selected}
                initial="hidden"
                animate="visible"
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                variants={container}
              >
                <motion.div
                  variants={item}
                  className="mb-8 flex items-center justify-between gap-4"
                >
                  <h3 className="font-display text-2xl font-semibold text-heading">
                    {selected === "work" ? "Professional" : "Builder"}
                  </h3>
                  <p className="text-sm text-muted">
                    Switch anytime by choosing the other lens.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-6 md:grid-cols-2"
                  variants={container}
                >
                  {selected === "work"
                    ? experiences.map((itemData) => (
                        <motion.div key={itemData.slug} variants={item}>
                          <ContentCard
                            title={itemData.title}
                            subtitle={itemData.company}
                            period={itemData.period}
                            description={itemData.description}
                            bullets={itemData.bullets}
                            images={itemData.images}
                            tags={itemData.tech}
                            href={itemData.website}
                            linkLabel="View company website"
                            external
                          />
                        </motion.div>
                      ))
                    : projects.map((itemData) => (
                        <motion.div key={itemData.slug} variants={item}>
                          <ContentCard
                            title={itemData.title}
                            subtitle="Personal Project"
                            period={itemData.period}
                            description={itemData.description}
                            bullets={itemData.bullets}
                            images={itemData.images}
                            tags={itemData.tech}
                            href={itemData.website}
                            linkLabel="View project website"
                            external
                          />
                        </motion.div>
                      ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
