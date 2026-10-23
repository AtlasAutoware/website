import { useId } from "react";

/*
 * Drawing 6: car one as a glyph, front to the right, no labels. Wheels, chassis, deck,
 * the OAK-D Pro at the front and the RPLIDAR C1 behind it in red.
 * The OG image (scripts/og.svg) carries a copy of this glyph: keep the two in sync.
 */

const GLYPH_INK =
  "M24 60 H43 M85 60 H155 M197 60 H216 M24 54 V66 M216 54 V66 " + // chassis rail and bumpers, broken at the wheels
  "M36 44 H204 M100 44 V60 M140 44 V60 " + // deck and standoffs
  "M187 40 V44"; // camera riser

export function CarGlyph({ className, title }: { className?: string; title?: string }) {
  const id = useId();
  const cls = ["aa-drawing", className ?? ""].filter(Boolean).join(" ");
  const a11y = title
    ? { role: "img", "aria-labelledby": `${id}-title` }
    : { "aria-hidden": true, focusable: "false" as const };
  return (
    <svg className={cls} viewBox="0 0 240 96" width={240} height={96} {...a11y}>
      {title ? <title id={`${id}-title`}>{title}</title> : null}
      <path className="ink" d={GLYPH_INK} />
      {[64, 176].map((cx) => (
        <g key={cx}>
          <circle className="ink" cx={cx} cy={70} r={20} />
          <circle className="ink" cx={cx} cy={70} r={8} />
        </g>
      ))}
      <rect className="ink" x={180} y={22} width={14} height={18} />
      <g>
        <rect className="accent" x={144} y={30} width={30} height={14} rx={2} />
        <rect className="accent" x={148} y={22} width={22} height={8} rx={1} />
      </g>
    </svg>
  );
}
