import type { ReactNode } from "react";

export function ItalicAccent({ children }: { children: ReactNode }) {
  return <em className="accent-serif">{children}</em>;
}
