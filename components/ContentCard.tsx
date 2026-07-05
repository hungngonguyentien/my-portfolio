"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent } from "react";

interface ContentCardProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  bullets?: string[];
  href?: string;
  linkLabel?: string;
  images?: string[];
  tags?: string[];
  external?: boolean;
}

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
        <Image
          src={src}
          alt=""
          fill
          sizes="64px"
          className="object-cover"
        />
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
            transition={{ duration: reduced ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Native img so the frame follows the photo’s real aspect ratio */}
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

export default function ContentCard({
  title,
  subtitle,
  period,
  description,
  bullets,
  href,
  linkLabel = "View details",
  images,
  tags,
  external = false,
}: ContentCardProps) {
  const showLink = Boolean(href);
  const hasBullets = Boolean(bullets && bullets.length > 0);
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const hasImages = Boolean(images && images.length > 0);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -3.5, y: px * 3.5 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  const linkClassName =
    "inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-blush transition-colors hover:bg-accent-muted";

  const linkContent = (
    <>
      {linkLabel}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </>
  );

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={
        reduced
          ? undefined
          : {
              rotateX: tilt.x,
              rotateY: tilt.y,
              y: hovered ? -2 : 0,
            }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ transformPerspective: 800 }}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-accent-muted hover:shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--espresso)_28%,transparent),0_4px_12px_-4px_color-mix(in_srgb,var(--amber)_20%,transparent)]"
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl font-semibold text-heading">
            {title}
          </h3>
          <p className="text-sm font-medium text-accent">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
          {period}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted">{description}</p>

      {hasBullets && bullets && (
        <ul className="mb-4 flex-1 space-y-2">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-sm leading-relaxed text-foreground"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {hasImages && images && (
        <div className="mb-4 flex flex-wrap gap-2">
          {images.map((src, i) => (
            <ImageThumb
              key={src}
              src={src}
              alt={`${title} screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${showLink ? "mb-4" : ""}`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {showLink &&
        href &&
        (external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {linkContent}
          </a>
        ) : (
          <Link href={href} className={linkClassName}>
            {linkContent}
          </Link>
        ))}
    </motion.article>
  );
}
