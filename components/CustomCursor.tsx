"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.4 });

  // Watch for document preview open class
  useEffect(() => {
    const update = () => {
      setDocOpen(
        document.documentElement.classList.contains("document-preview-open"),
      );
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || docOpen) {
      document.documentElement.classList.remove("custom-cursor");
      return;
    }

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
  }, [reduced, docOpen, mouseX, mouseY]);

  if (!enabled || reduced || docOpen) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: hovering ? 1.4 : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full border-2 border-amber bg-amber/20 shadow-[0_0_14px_color-mix(in_srgb,var(--amber)_45%,transparent)] dark:border-[#e8a06a] dark:bg-[#e8a06a]/25 dark:shadow-[0_0_16px_color-mix(in_srgb,#e8a06a_50%,transparent)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber dark:bg-[#e8a06a]" />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
