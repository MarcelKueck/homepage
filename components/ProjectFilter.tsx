"use client";

import { useState, type ReactNode } from "react";

type Filter = { key: string; label: string; count: number };

/** Category chips above the project grid. Cards stay server-rendered; the
 *  active filter is applied with CSS via data-filter (see globals.css). */
export function ProjectFilter({
  filters,
  groupLabel,
  children,
}: {
  filters: Filter[];
  groupLabel: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState("all");

  return (
    <>
      <div role="group" aria-label={groupLabel} className="mb-8 flex flex-wrap gap-2 md:mb-10">
        {filters.map((f) => {
          const isActive = f.key === active;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-text-primary bg-text-primary text-button-text"
                  : "border-border-strong text-text-secondary hover:border-text-secondary hover:text-text-primary"
              }`}
            >
              {f.label}
              <span
                className={`font-mono text-[0.6875rem] ${
                  isActive ? "text-button-text/60" : "text-text-tertiary"
                }`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>
      <div data-filter={active} className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {children}
      </div>
    </>
  );
}
