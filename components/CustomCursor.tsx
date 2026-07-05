"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { useLens } from "./LensContext";

type CursorMode = "default" | "work" | "projects";

function getMode(selected: "work" | "projects" | null): CursorMode {
  return selected ?? "default";
}

export default function CustomCursor() {
  const { selected } = useLens();
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.4 });

  const mode = getMode(selected);

  useEffect(() => {
    if (reduced) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!finePointer || !canHover) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        setHovering(false);
        return;
      }
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, label, summary",
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [reduced, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: hovering ? 1.4 : 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {mode === "default" && <DefaultCursor />}
            {mode === "work" && <ProfessionalCursor />}
            {mode === "projects" && <BuilderCursor />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** Orange ring — default. */
function DefaultCursor() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center">
      <span className="absolute inset-0 rounded-full border-2 border-amber bg-amber/20 shadow-[0_0_14px_color-mix(in_srgb,var(--amber)_45%,transparent)] dark:border-[#e8a06a] dark:bg-[#e8a06a]/25 dark:shadow-[0_0_16px_color-mix(in_srgb,#e8a06a_50%,transparent)]" />
      <span className="h-1.5 w-1.5 rounded-full bg-amber dark:bg-[#e8a06a]" />
    </span>
  );
}

/** Black ring — professional (stays black; soft light halo in dark mode for contrast). */
function ProfessionalCursor() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center">
      <span className="absolute -inset-0.5 rounded-full bg-transparent dark:bg-white/25 dark:blur-[3px]" />
      <span className="absolute inset-0 rounded-full border-[1.5px] border-black bg-black/15 shadow-[0_0_14px_rgba(0,0,0,0.25)]" />
      <span className="absolute inset-1.5 rounded-full border border-black/45" />
      <span className="h-1.5 w-1.5 rounded-full bg-black" />
    </span>
  );
}

/** Sage green diamond — builder (brighter sage in dark mode). */
function BuilderCursor() {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center">
      <span className="absolute inset-0 rotate-45 rounded-[4px] bg-[#87a878]/40 blur-[3px] dark:bg-[#a8c49a]/40" />
      <span className="absolute inset-1 rotate-45 rounded-[3px] border-2 border-[#87a878] bg-[#87a878]/25 shadow-[0_0_16px_color-mix(in_srgb,#87a878_50%,transparent)] dark:border-[#a8c49a] dark:bg-[#a8c49a]/25 dark:shadow-[0_0_18px_color-mix(in_srgb,#a8c49a_50%,transparent)]" />
      <span className="h-2 w-2 rotate-45 rounded-[1px] bg-[#6f9160] dark:bg-[#a8c49a]" />
    </span>
  );
}
