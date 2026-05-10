import { Link } from "@/i18n/routing";
import { Section } from "@/components/Section";

export default function LocaleNotFound() {
  return (
    <Section>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-[0.08em]">
          404
        </p>
        <h1 className="display-headline text-balance">Page not found.</h1>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-button-bg px-6 py-3 text-sm font-semibold text-button-text"
        >
          Back to home
        </Link>
      </div>
    </Section>
  );
}
