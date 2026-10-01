import type { ReactNode } from "react";

/** Small mono label above headlines, e.g. "02 / The workshop". */
export function SectionLabel({
  children,
  index,
  className = "",
  id,
}: {
  children: ReactNode;
  index?: string;
  className?: string;
  id?: string;
}) {
  return (
    <p id={id} className={`mono-label flex items-center gap-2.5 text-text-secondary ${className}`}>
      {index ? (
        <>
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
        </>
      ) : (
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      )}
      <span>{children}</span>
    </p>
  );
}
