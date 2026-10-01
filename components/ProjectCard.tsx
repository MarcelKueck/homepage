import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { TagPill } from "./TagPill";

export type ProjectCardProps = {
  index: number;
  title: string;
  description: ReactNode;
  tags: string[];
  categories: readonly string[];
  categoryLabels: string[];
  image: { src: string; alt: string };
  cta: { label: string; href?: string };
};

export function ProjectCard({
  index,
  title,
  description,
  tags,
  categories,
  categoryLabels,
  image,
  cta,
}: ProjectCardProps) {
  return (
    <article
      data-categories={categories.join(" ")}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-secondary transition-colors duration-300 hover:border-border-strong"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-tertiary">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="mono-label absolute left-4 top-4 rounded-md bg-bg-primary/80 px-2 py-1 text-text-secondary backdrop-blur-sm">
          P-{String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <p className="mono-label text-accent">{categoryLabels.join(" · ")}</p>
        <h3 className="text-2xl font-semibold tracking-tight text-text-primary">{title}</h3>
        <p className="text-text-secondary">{description}</p>
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <li key={tag}>
              <TagPill>{tag}</TagPill>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-border pt-5">
          {cta.href ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              {cta.label}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </a>
          ) : (
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-tertiary">
              {cta.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
