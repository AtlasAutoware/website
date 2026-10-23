import { useId, type ReactNode } from "react";

/*
 * Shared pieces for the technical drawings.
 * Classes come from styles.css: .ink (1.5px currentColor), .hair (1px subtle), .accent (2px red),
 * .panel (base fill), .dashed, text .t2 (12px muted), .tb (title-block box).
 * Coordinates are SVG user units; at the drawn width 1 unit ≈ 1 CSS px.
 */

export type Pt = readonly [number, number];

/** `y` crops empty space above the drawing: the viewBox starts there. */
type Variant = { w: number; h: number; y?: number; desc: string; children: ReactNode };

function Svg({
  id,
  className,
  title,
  v,
}: {
  id: string;
  className: string;
  title: string;
  v: Variant;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 ${v.y ?? 0} ${v.w} ${v.h}`}
      width={v.w}
      height={v.h}
      role="img"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{v.desc}</desc>
      {v.children}
    </svg>
  );
}

/** A drawing: wide SVG (container ≥ 720px, or ≥ 960px when `full`), narrow SVG and an optional key. */
export function Drawing({
  className,
  full = false,
  title,
  wide,
  narrow,
  keyItems,
}: {
  className?: string;
  full?: boolean;
  title: string;
  wide: Variant;
  narrow: Variant;
  keyItems?: string[];
}) {
  const id = useId();
  const cls = ["aa-drawing", full ? "aa-drawing--full" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <Svg
        id={`${id}-w`}
        className={full ? "aa-drawing__wide" : "aa-drawing__wide aa-drawing__wide--col"}
        title={title}
        v={wide}
      />
      <Svg id={`${id}-n`} className="aa-drawing__narrow" title={title} v={narrow} />
      {keyItems ? (
        <ol className="aa-drawing__key">
          {keyItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

/** Engineering title block: code and date, title, scale. 64 units tall. */
export function TitleBlock({
  x,
  y,
  w,
  code,
  title,
  scale,
}: {
  x: number;
  y: number;
  w: number;
  code: string;
  title: string;
  scale: string;
}) {
  return (
    <g>
      <rect className="tb" x={x} y={y} width={w} height={64} />
      <line className="tb" x1={x} y1={y + 24} x2={x + w} y2={y + 24} />
      <text className="t2" x={x + 8} y={y + 17} fontWeight={600}>
        {code}
      </text>
      <text className="t2" x={x + w - 8} y={y + 17} textAnchor="end">
        Oct 2026
      </text>
      <text x={x + 8} y={y + 42}>
        {title}
      </text>
      <text className="t2" x={x + 8} y={y + 58}>
        {scale}
      </text>
    </g>
  );
}

/** Height a Box needs for its lines: 14px title lines (18 apart), then 12px sub lines (16 apart). */
function boxHeight(titleLines: number, subLines: number) {
  return 22 + 18 * (titleLines - 1) + 16 * subLines + 14;
}

/** A square diagram node: panel fill, ink (or red / dashed) outline, left-aligned labels inset 12. */
export function Box({
  x,
  y,
  w,
  h,
  title,
  sub = [],
  dashed = false,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string[];
  sub?: string[];
  dashed?: boolean;
  accent?: boolean;
}) {
  const height = h ?? boxHeight(title.length, sub.length);
  const stroke = `${accent ? "accent" : "ink"}${dashed ? " dashed" : ""}`;
  const subTop = y + 22 + 18 * (title.length - 1);
  return (
    <g>
      <rect className="panel" x={x} y={y} width={w} height={height} />
      <rect className={stroke} x={x} y={y} width={w} height={height} />
      {title.map((line, i) => (
        <text key={line} x={x + 12} y={y + 22 + 18 * i} fontWeight={600}>
          {line}
        </text>
      ))}
      {sub.map((line, i) => (
        <text key={line} className="t2" x={x + 12} y={subTop + 16 * (i + 1)}>
          {line}
        </text>
      ))}
    </g>
  );
}

function chevron(end: Pt, prev: Pt) {
  const dx = Math.sign(end[0] - prev[0]);
  const dy = Math.sign(end[1] - prev[1]);
  const bx = end[0] - dx * 6;
  const by = end[1] - dy * 6;
  return `M${bx - dy * 4} ${by + dx * 4} L${end[0]} ${end[1]} L${bx + dy * 4} ${by - dx * 4}`;
}

/** An orthogonal connection with an open 6-unit chevron at the end (or none). */
export function Wire({
  pts,
  dashed = false,
  arrow = true,
}: {
  pts: Pt[];
  dashed?: boolean;
  arrow?: boolean;
}) {
  const end = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  return (
    <g>
      <polyline
        className={dashed ? "ink dashed" : "ink"}
        points={pts.map((p) => p.join(",")).join(" ")}
      />
      {arrow ? <path className="ink" d={chevron(end, prev)} /> : null}
    </g>
  );
}

/** A hairline leader from a part to its label. */
export function Leader({ pts }: { pts: Pt[] }) {
  return <polyline className="hair" points={pts.map((p) => p.join(",")).join(" ")} />;
}

/** A label: first line 14px, further lines 12px muted, 16 apart. */
export function Label({
  x,
  y,
  lines,
  anchor = "start",
  strong = false,
}: {
  x: number;
  y: number;
  lines: string[];
  anchor?: "start" | "end" | "middle";
  strong?: boolean;
}) {
  return (
    <g>
      {lines.map((line, i) => (
        <text
          key={line}
          className={i === 0 ? undefined : "t2"}
          x={x}
          y={y + 16 * i}
          textAnchor={anchor}
          fontWeight={i === 0 && strong ? 600 : undefined}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** A small edge label (12px muted). */
export function Note({
  x,
  y,
  text,
  anchor = "start",
}: {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "end" | "middle";
}) {
  return (
    <text className="t2" x={x} y={y} textAnchor={anchor}>
      {text}
    </text>
  );
}

/** A numbered marker (balloon) with a hairline leader to the part. */
export function Balloon({ x, y, n, to }: { x: number; y: number; n: number; to: Pt }) {
  const dx = to[0] - x;
  const dy = to[1] - y;
  const len = Math.hypot(dx, dy) || 1;
  const sx = x + (dx / len) * 11;
  const sy = y + (dy / len) * 11;
  return (
    <g>
      <line className="hair" x1={sx} y1={sy} x2={to[0]} y2={to[1]} />
      <circle className="panel" cx={x} cy={y} r={11} />
      <circle className="ink" cx={x} cy={y} r={11} />
      <text x={x} y={y + 5} textAnchor="middle" fontWeight={600}>
        {n}
      </text>
    </g>
  );
}
