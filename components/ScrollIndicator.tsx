import { ChevronDown } from "lucide-react";

export function ScrollIndicator({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a href={href} aria-label={label} className="scroll-indicator">
      <ChevronDown className="scroll-indicator-icon" size={32} aria-hidden="true" strokeWidth={2.25} />
    </a>
  );
}
