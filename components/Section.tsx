import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";
import { ScrollIndicator } from "./ScrollIndicator";

export function Section({
  children,
  alt = false,
  as: Tag = "section",
  className = "",
  containerClassName = "",
  ariaLabelledBy,
  id,
  snap = true,
  nextSection,
  nextSectionLabel = "Scroll to next section",
}: {
  children: ReactNode;
  alt?: boolean;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
  id?: string;
  snap?: boolean;
  /** Hash of the next section, e.g. "#featured" — renders the bouncing chevron when set. */
  nextSection?: string;
  nextSectionLabel?: string;
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
      {nextSection ? (
        <ScrollIndicator href={nextSection} label={nextSectionLabel} />
      ) : null}
    </Tag>
  );
}
