import type { ReactNode } from "react";

/**
 * A plain data table: no fill, no radius, 1px rules. With `rowHeader` (default) the first cell
 * of each row is a row header. `numericCols` are right-aligned with tabular figures.
 * With `stack`, rows turn into labelled blocks below 640px instead of squeezing into columns.
 * With `even`, the data columns share the width equally (a narrow row-header column first).
 * Wrapped so a wide table scrolls sideways instead of the page.
 */
export function SpecTable({
  rows,
  columns,
  caption,
  rowHeader = true,
  numericCols = [],
  stack = false,
  even = false,
}: {
  rows: ReactNode[][];
  columns?: string[];
  caption?: ReactNode;
  rowHeader?: boolean;
  numericCols?: number[];
  stack?: boolean;
  even?: boolean;
}) {
  const numClass = (i: number) => (numericCols.includes(i) ? "num" : undefined);

  return (
    <div className="aa-table-wrap">
      <table
        className={["aa-table", stack ? "aa-table--stack" : "", even ? "aa-table--even" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {caption ? <caption>{caption}</caption> : null}
        {columns && columns.length > 0 ? (
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={`${col}-${i}`} scope="col" className={numClass(i)}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, i) =>
                rowHeader && i === 0 ? (
                  <th key={i} scope="row" className={numClass(i)}>
                    {cell}
                  </th>
                ) : (
                  <td key={i} className={numClass(i)} data-label={stack ? columns?.[i] : undefined}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
