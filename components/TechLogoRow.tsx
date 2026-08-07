"use client";

import { useState } from "react";
import { TECH_LOGO_MAP, type TechLogo } from "@/data/techLogos";

function TechLogoItem({ id, name }: TechLogo) {
  const [hovered, setHovered] = useState(false);
  const icon = TECH_LOGO_MAP[id];
  if (!icon) return null;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span
        tabIndex={0}
        role="img"
        aria-label={name}
        className="flex h-8 w-8 cursor-default items-center justify-center rounded-md border border-border bg-surface p-1 shadow-sm transition-transform duration-150 hover:scale-110 hover:border-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <svg
          role="presentation"
          viewBox={icon.viewBox}
          className="h-full w-full"
          aria-hidden
        >
          <path fill={icon.hex} d={icon.path} />
        </svg>
      </span>

      {hovered && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-semibold text-heading shadow-md"
        >
          {name}
        </span>
      )}
    </span>
  );
}

export default function TechLogoRow({
  logos,
  align = "end",
}: {
  logos: TechLogo[];
  align?: "start" | "end";
}) {
  if (!logos.length) return null;

  // Fixed 4-column grid so rows always wrap the same way for every role.
  return (
    <div
      className={`mt-3 grid w-max grid-cols-4 gap-1.5 ${
        align === "end" ? "ml-auto" : "mr-auto"
      }`}
    >
      {logos.map((logo) => (
        <TechLogoItem key={logo.id} {...logo} />
      ))}
    </div>
  );
}
