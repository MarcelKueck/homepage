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
  lastBeforeFooter = false,
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
  /** Reserves footer height in the snap viewport so both are co-visible. */
  lastBeforeFooter?: boolean;
  /** Hash of the next section, e.g. "#featured" — renders the bouncing chevron when set. */
  nextSection?: string;
  nextSectionLabel?: string;
}) {
  const snapClasses = snap
    ? `snap-section${lastBeforeFooter ? " snap-section--with-footer" : ""}`
    : "";
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`section-padding ${snapClasses} ${alt ? "bg-bg-secondary" : ""} ${className}`}
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
