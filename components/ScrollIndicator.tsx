import { ChevronDown } from "lucide-react";

export function ScrollIndicator({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="scroll-indicator h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-secondary/60 text-text-secondary backdrop-blur-md transition-colors hover:border-text-secondary hover:text-text-primary"
    >
      <ChevronDown className="scroll-indicator-icon" size={22} aria-hidden="true" />
    </a>
  );
}
