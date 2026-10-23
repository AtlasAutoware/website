import type { ReactNode } from "react";

/**
 * The ledger primitive. A narrow side column holds the H2 and up to three
 * one-fact meta lines; a wide main column holds one kind of content.
 */

function MetaLines({ lines }: { lines?: string[] }) {
  if (!lines || lines.length === 0) return null;
  return (
    <ul className="aa-meta">
      {lines.slice(0, 3).map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

/** Page header: meta in the side column, the page's only H1 and its lead in the main column. */
export function PageHead({
  title,
  lead,
  meta,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  meta?: string[];
  children?: ReactNode;
}) {
  return (
    <header className="aa-row aa-row--head aa-pagehead">
      <div className="aa-row__side">
        <MetaLines lines={meta} />
      </div>
      <div className="aa-row__main">
        <h1 className="aa-h1">{title}</h1>
        {lead ? <p className="aa-lead">{lead}</p> : null}
        {children ? <div className="aa-pagehead__extra">{children}</div> : null}
      </div>
    </header>
  );
}

type RowVariant = "default" | "headless" | "wide" | "split";

/**
 * One ledger row. `topic` starts a new topic (2px rule, more space above); `band` puts the row
 * on the page's single full-bleed surface band; `sticky` pins the side column at ≥1024px.
 * `split` expects exactly two children (7fr / 5fr at ≥1024px).
 */
export function Row({
  id,
  title,
  meta,
  side,
  variant = "default",
  topic = false,
  band = false,
  sticky = false,
  children,
}: {
  id?: string;
  title?: string;
  meta?: string[];
  side?: ReactNode;
  variant?: RowVariant;
  topic?: boolean;
  band?: boolean;
  sticky?: boolean;
  children: ReactNode;
}) {
  const classes = [
    "aa-row",
    variant !== "default" ? `aa-row--${variant}` : "",
    topic ? "aa-row--topic" : "",
    band ? "aa-band" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const heading = title ? <h2 className="aa-h2">{title}</h2> : null;

  if (variant === "default") {
    return (
      <section id={id} className={classes}>
        <div className={`aa-row__side${sticky ? " aa-row__side--sticky" : ""}`}>
          <div className="aa-row__side-inner">
            {heading}
            <MetaLines lines={meta} />
            {side}
          </div>
        </div>
        <div className="aa-row__main">{children}</div>
      </section>
    );
  }

  if (variant === "headless") {
    return (
      <section id={id} className={classes}>
        <div className="aa-row__main">
          {heading}
          <MetaLines lines={meta} />
          {side}
          {children}
        </div>
      </section>
    );
  }

  // wide and split: the heading block spans the row, then the content.
  const head =
    heading || (meta && meta.length > 0) || side ? (
      <div className="aa-row__head">
        {heading}
        <MetaLines lines={meta} />
        {side}
      </div>
    ) : null;

  return (
    <section id={id} className={classes}>
      {head}
      {variant === "split" ? (
        <div className="aa-row__split">{children}</div>
      ) : (
        <div className="aa-row__main">{children}</div>
      )}
    </section>
  );
}
