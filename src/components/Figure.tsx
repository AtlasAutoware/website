import type { ReactNode } from "react";

/**
 * A numbered figure. `drawing` gets the surface panel and padding; `photo` and `render`
 * clip an image to the 12px frame. The caption always starts "Figure n."
 */
export function Figure({
  n,
  kind,
  caption,
  children,
}: {
  n: number;
  kind: "drawing" | "photo" | "render";
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className={`aa-figure aa-figure--${kind}`}>
      <div className="aa-figure__media">{children}</div>
      <figcaption className="aa-figure__caption">
        <strong>Figure {n}.</strong> {caption}
      </figcaption>
    </figure>
  );
}
