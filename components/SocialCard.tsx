import type { ReactNode } from "react";

export function SocialCard({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-bg-tertiary p-8 transition-colors hover:bg-bg-secondary hover:border-text-secondary/40"
    >
      <span className="text-text-primary transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
        {icon}
      </span>
      <span className="text-sm font-semibold text-text-secondary transition-colors group-hover:text-text-primary">
        {label}
      </span>
    </a>
  );
}
