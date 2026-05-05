import type { ReactNode } from "react";

export function SectionLabel({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <p
      id={id}
      className={`text-accent text-sm font-semibold uppercase tracking-[0.08em] ${className}`}
    >
      {children}
    </p>
  );
}
