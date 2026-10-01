import type { ReactNode } from "react";

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-bg-primary/40 px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-text-secondary">
      {children}
    </span>
  );
}
