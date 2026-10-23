import type { ReactNode } from "react";

/** A definition list: 16px/600 terms over prose bodies. */
export function DefList({ items }: { items: { term: ReactNode; body: ReactNode }[] }) {
  return (
    <dl className="aa-dl">
      {items.map((item, i) => (
        <div key={i} className="aa-dl__item">
          <dt>{item.term}</dt>
          <dd>{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}
