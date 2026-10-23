import type { ReactNode } from "react";

type Note = {
  /** ISO date or partial date ("2026-10-22", "2026-07", "2022") for the <time> element. */
  date: string;
  /** The date as readers see it ("22 Oct 2026", "Jul–Aug"). */
  label: string;
  title: string;
  body?: ReactNode;
  href?: string;
  byline?: string;
};

/** Dated notes, newest first: a <time> column, then an H3, one or two sentences, a byline. */
export function Notes({ items }: { items: Note[] }) {
  return (
    <ol className="aa-notes">
      {items.map((item) => {
        const external = item.href ? /^https?:\/\//.test(item.href) : false;
        return (
          <li key={`${item.date}-${item.title}`} className="aa-note">
            {item.date ? <time dateTime={item.date}>{item.label}</time> : <span>{item.label}</span>}
            <div>
              <h3 className="aa-h3">
                {item.href ? (
                  <a
                    href={item.href}
                    className="aa-link"
                    {...(external ? { rel: "noopener noreferrer" } : {})}
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              {item.body ? <p className="aa-note__body">{item.body}</p> : null}
              {item.byline ? <p className="aa-note__byline">{item.byline}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
