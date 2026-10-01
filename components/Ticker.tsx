/** Endless horizontal strip of capabilities. Pure CSS; the second copy of
 *  the list is hidden from assistive tech. */
export function Ticker({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="mono-label whitespace-nowrap px-6 text-text-secondary">{item}</span>
          <span aria-hidden="true" className="font-mono text-sm text-accent">
            +
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-label={label} role="region" className="ticker overflow-hidden border-y border-border py-5">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
