import Image from "next/image";
import type { ReactNode } from "react";

/** One machine or area of the workshop. Shows a photo when there is one,
 *  otherwise an icon on a fine blueprint grid. */
export function WorkshopTile({
  index,
  title,
  body,
  icon,
  image,
  className = "",
}: {
  index: string;
  title: string;
  body: string;
  icon: ReactNode;
  image?: string;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-primary ${className}`}
    >
      {image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="blueprint-fine absolute inset-0 opacity-70" />
      )}
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-bg-primary text-accent">
            {icon}
          </span>
          <span className="font-mono text-xs text-text-tertiary">{index}</span>
        </div>
        <h3 className="pt-3 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-text-secondary">{body}</p>
      </div>
    </article>
  );
}
