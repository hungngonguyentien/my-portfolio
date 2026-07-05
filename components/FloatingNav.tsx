"use client";

import { motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "choose", label: "Choose" },
  { id: "materials", label: "Materials" },
  { id: "contact", label: "Contact" },
] as const;

export default function FloatingNav() {
  const [activeId, setActiveId] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const offset = 120;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Short last sections never reach the offset line — treat near-bottom as Contact.
      if (scrollBottom >= pageHeight - 100) {
        setActiveId(sections[sections.length - 1].id);
        setScrolled(window.scrollY > 12);
        return;
      }

      let current: (typeof sections)[number]["id"] = sections[0].id;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      setActiveId(current);
      setScrolled(window.scrollY > 12);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <ul
        className={`pointer-events-auto flex items-center gap-1 rounded-full border px-1.5 py-1.5 transition-all duration-300 ${
          scrolled
            ? "border-border/80 bg-surface/85 shadow-lg shadow-espresso/10 backdrop-blur-md"
            : "border-transparent bg-surface/60 shadow-md shadow-espresso/5 backdrop-blur-sm"
        }`}
      >
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-heading shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <a
                href={`#${id}`}
                onClick={(event) => handleNavClick(event, id)}
                className={`relative z-10 block rounded-full px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 sm:px-4 ${
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
