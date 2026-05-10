import Image from "next/image";
import { TagPill } from "./TagPill";

export type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  image: { src: string; alt: string };
  cta: { label: string; href?: string; disabled?: boolean };
};

export function ProjectCard({ title, description, tags, image, cta }: ProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-bg-secondary">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* TODO: Replace with real photo */}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
            {title}
          </h3>
          <p className="text-text-secondary">{description}</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <TagPill>{tag}</TagPill>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          {cta.disabled || !cta.href ? (
            <span className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-text-tertiary">
              {cta.label}
            </span>
          ) : (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-text-primary/80 px-5 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-text-primary hover:text-button-text"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
