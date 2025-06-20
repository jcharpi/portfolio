import React from "react"

export type RowChild = [React.ReactNode, number]

interface RowProps {
  /** Total number of columns for the grid */
  columns: number
  /** Each child paired with the number of columns it spans */
  items: RowChild[]
  /** Additional classes for the container */
  className?: string
}

export default function Row({ columns, items, className = "" }: RowProps) {
  return (
    <div
      className={`grid ${className}`.trim()}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map(([child, span], idx) => (
        <div key={idx} style={{ gridColumn: `span ${span} / span ${span}` }}>
          {child}
        </div>
      ))}
    </div>
  )
}
