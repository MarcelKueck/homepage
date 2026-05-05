import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  alt = false,
  as: Tag = "section",
  className = "",
  containerClassName = "",
  ariaLabelledBy,
}: {
  children: ReactNode;
  alt?: boolean;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
}) {
  return (
    <Tag
      aria-labelledby={ariaLabelledBy}
      className={`section-padding ${alt ? "bg-bg-secondary" : ""} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
