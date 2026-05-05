import type { ReactNode } from "react";

export function ServiceCard({
  title,
  body,
  pricing,
  icon,
}: {
  title: string;
  body: string;
  pricing: string;
  icon?: ReactNode;
}) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[24px] border border-border bg-bg-secondary p-8">
      {icon ? (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-tertiary text-accent">
          {icon}
        </div>
      ) : null}
      <h3 className="text-2xl font-semibold tracking-tight text-text-primary">{title}</h3>
      <p className="text-text-secondary">{body}</p>
      <p className="mt-auto pt-4 text-sm text-text-tertiary">{pricing}</p>
    </article>
  );
}
