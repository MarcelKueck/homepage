import type { ReactNode } from "react";

export function ItalicAccent({ children }: { children: ReactNode }) {
  return <em className="text-accent font-serif-italic italic font-bold">{children}</em>;
}
