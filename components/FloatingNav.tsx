"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "resumes", label: "Resumes" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function FloatingNav() {
  const [activeId, setActiveId] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);
  // While smooth-scrolling from a nav click, ignore intermediate section hits
  // so the active pill doesn't jump through every section in between.
  const lockedTargetRef = useRef<SectionId | null>(null);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const unlock = () => {
      lockedTargetRef.current = null;
      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = null;
      }
    };

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 12);

      // Keep the clicked section highlighted until we arrive (or timeout).
      if (lockedTargetRef.current) {
        const targetEl = document.getElementById(lockedTargetRef.current);
        if (targetEl) {
          const top = targetEl.getBoundingClientRect().top;
          // Close enough to the sticky offset — unlock and sync.
          if (Math.abs(top - 120) < 80 || top <= 120) {
            setActiveId(lockedTargetRef.current);
            unlock();
          }
        }
        return;
      }

      const offset = 120;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Short last sections never reach the offset line — treat near-bottom as Contact.
      if (scrollBottom >= pageHeight - 100) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current: SectionId = sections[0].id;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      unlock();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    event.preventDefault();

    lockedTargetRef.current = id;
    setActiveId(id);

    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
    }
    // Safety unlock if scrollend never settles (very long pages / interrupted).
    unlockTimerRef.current = window.setTimeout(() => {
      lockedTargetRef.current = null;
      unlockTimerRef.current = null;
    }, 1200);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pl-3 pr-14 pt-3 sm:px-4 sm:pt-4"
    >
      <ul
        className={`pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border px-1 py-1 transition-all duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-1 sm:px-1.5 sm:py-1.5 ${
          scrolled
            ? "border-border/80 bg-surface/85 shadow-lg shadow-espresso/10 backdrop-blur-md"
            : "border-transparent bg-surface/60 shadow-md shadow-espresso/5 backdrop-blur-sm"
        }`}
      >
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id} className="relative shrink-0">
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-heading shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <a
                href={`#${id}`}
                onClick={(event) => handleNavClick(event, id)}
                className={`relative z-10 block whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 sm:px-3.5 sm:py-2 sm:text-sm ${
                  isActive
                    ? "text-blush"
                    : "text-muted hover:bg-surface-muted/70 hover:text-heading"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
