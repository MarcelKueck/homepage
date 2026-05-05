import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  alt = false,
  as: Tag = "section",
  className = "",
  containerClassName = "",
  ariaLabelledBy,
  id,
  snap = true,
}: {
  children: ReactNode;
  alt?: boolean;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
  id?: string;
  snap?: boolean;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`section-padding ${snap ? "snap-section" : ""} ${alt ? "bg-bg-secondary" : ""} ${className}`}
    >
      <Container className={`snap-section-inner ${containerClassName}`}>
        {children}
      </Container>
    </Tag>
  );
}
