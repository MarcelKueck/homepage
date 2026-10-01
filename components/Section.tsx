import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  alt = false,
  divider = false,
  as: Tag = "section",
  className = "",
  containerClassName = "",
  ariaLabelledBy,
  id,
}: {
  children: ReactNode;
  /** Slightly lighter background to separate neighbouring sections. */
  alt?: boolean;
  /** Hairline border at the top of the section. */
  divider?: boolean;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`section-padding relative ${alt ? "bg-bg-secondary" : ""} ${
        divider ? "border-t border-border" : ""
      } ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
