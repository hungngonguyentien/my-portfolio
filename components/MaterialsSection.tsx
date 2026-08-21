"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import DocumentPanel from "./DocumentPanel";
import { materials, type MaterialItem } from "@/data/materials";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

function MaterialCard({
  material,
  onPreview,
}: {
  material: MaterialItem;
  onPreview: () => void;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-accent-muted">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-muted text-lg">
        📄
      </div>
      <h3 className="font-display text-lg font-semibold text-heading">
        {material.title}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
        {material.description}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onPreview}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-blush transition-colors hover:bg-accent-muted"
        >
          Preview
        </button>
        <a
          href={material.path}
          download={material.downloadName}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-heading transition-colors hover:border-accent-muted hover:bg-surface-muted/60"
        >
          Download
        </a>
      </div>
    </article>
  );
}

export default function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null,
  );
  const reduced = useReducedMotion();
  const item = fadeUpVariants(reduced);
  const container = staggerContainer(reduced);

  return (
    <>
      <section
        id="resumes"
        className="scroll-mt-24 border-t border-border bg-surface-muted/30 px-6 py-20 md:py-28"
      >
        <motion.div
          className="mx-auto max-w-5xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={item} className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-muted">
              Resumes
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-heading md:text-4xl">
              Documents for recruiters
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Two focused resumes plus a recommendation from my Address Income
              internship.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
          >
            {materials.map((material) => (
              <motion.div key={material.id} variants={item}>
                <MaterialCard
                  material={material}
                  onPreview={() => setActiveMaterial(material)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <DocumentPanel
        material={activeMaterial}
        onClose={() => setActiveMaterial(null)}
      />
    </>
  );
}
