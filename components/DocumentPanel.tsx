"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import type { MaterialItem } from "@/data/materials";

interface DocumentPanelProps {
  material: MaterialItem | null;
  onClose: () => void;
}

export default function DocumentPanel({ material, onClose }: DocumentPanelProps) {
  const reduced = useReducedMotion();
  const open = Boolean(material);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("document-preview-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("document-preview-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!material) return null;

  const encodedPath = encodeURI(material.path);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.12 : 0.2 }}
        >
          <button
            type="button"
            aria-label="Close document preview"
            className="absolute inset-0 bg-espresso/40 backdrop-blur-sm dark:bg-black/50"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-panel-title"
            className="relative z-10 flex max-h-[min(90vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-espresso/20"
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={
              reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduced ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    id="document-panel-title"
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted"
                  >
                    {material.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">{material.description}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:border-accent-muted hover:text-heading"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden bg-surface-muted/40 p-4 sm:p-5">
              <div className="h-[min(52vh,520px)] overflow-hidden rounded-xl border border-border bg-background shadow-inner">
                <iframe
                  src={`${encodedPath}#view=FitH&toolbar=0&navpanes=0`}
                  title={`${material.title} preview`}
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:px-6">
              <a
                href={material.path}
                download={material.downloadName}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-blush transition-colors hover:bg-accent-muted"
              >
                Download PDF
              </a>
              <a
                href={material.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-accent-muted hover:bg-surface-muted/60"
              >
                Open full document
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
