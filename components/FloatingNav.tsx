"use client";

import { motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
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
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
