"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { contact } from "@/data/contact";

export default function CopyEmailButton({
  className = "",
  centered = false,
}: {
  className?: string;
  centered?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      const input = document.createElement("input");
      input.value = contact.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const status = copied ? "Copied" : hovered ? "Click to copy" : null;

  return (
    <button
      type="button"
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 ${
        centered ? "justify-center text-center" : "text-left"
      } ${className}`}
      aria-label={copied ? "Email copied" : "Copy email to clipboard"}
    >
      <span
        className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
          copied || hovered ? "text-accent" : "text-muted"
        }`}
      >
        {contact.email}
        <span aria-hidden className="text-sm">
          ⧉
        </span>
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {status && (
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-medium text-accent"
          >
            {status}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
