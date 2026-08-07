"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-3 right-3 z-[60] flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface/85 text-sm shadow-lg shadow-espresso/10 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-surface-muted sm:top-4 sm:right-4 sm:h-10 sm:w-10 sm:text-base"
    >
      {mounted ? (theme === "dark" ? "☀️" : "🌙") : "◐"}
    </button>
  );
}
