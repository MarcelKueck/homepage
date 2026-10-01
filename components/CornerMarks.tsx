/** Registration marks in the four corners of a framed element, like the
 *  crop marks on a drawing sheet. Parent must be `relative`. */
export function CornerMarks({
  className = "",
  inset = "-8px",
}: {
  className?: string;
  inset?: string;
}) {
  const base = "pointer-events-none absolute h-4 w-4 border-accent";
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${base} border-l border-t`} style={{ left: inset, top: inset }} />
      <span className={`${base} border-r border-t`} style={{ right: inset, top: inset }} />
      <span className={`${base} border-b border-l`} style={{ left: inset, bottom: inset }} />
      <span className={`${base} border-b border-r`} style={{ right: inset, bottom: inset }} />
    </span>
  );
}
