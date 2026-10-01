import type { ReactNode } from "react";

export function ServiceCard({
  index,
  title,
  body,
  meta,
  icon,
}: {
  index: string;
  title: string;
  body: string;
  meta: string;
  icon?: ReactNode;
}) {
  return (
    <article className="group relative flex h-full flex-col gap-4 bg-bg-secondary p-7 transition-colors duration-300 hover:bg-bg-tertiary sm:p-8">
      <div className="flex items-center justify-between">
        {icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong text-accent">
            {icon}
          </span>
        ) : null}
        <span className="font-mono text-xs text-text-tertiary">{index}</span>
      </div>
      <h3 className="pt-2 text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">{title}</h3>
      <p className="text-text-secondary">{body}</p>
      <p className="mt-auto pt-3 font-mono text-xs uppercase leading-relaxed tracking-[0.06em] text-text-tertiary">
        {meta}
      </p>
    </article>
  );
}
