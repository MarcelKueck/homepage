import type { ElementType } from "react";
import { ItalicAccent } from "./ItalicAccent";

export function Headline({
  before,
  accent,
  after = "",
  as: Tag = "h2",
  className = "section-headline text-balance",
  id,
}: {
  before: string;
  accent: string;
  after?: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={className}>
      {before}
      <ItalicAccent>{accent}</ItalicAccent>
      {after}
    </Tag>
  );
}
