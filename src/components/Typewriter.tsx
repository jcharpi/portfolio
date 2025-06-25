import React from "react"
import { useTypewriter } from "../hooks/useTypewriter"

type TypewriterProps = {
  /** Lines of text to type out, each on its own line */
  lines: string[]
  /** Delay between keystrokes (ms). 50 ms by default */
  speed?: number
  /**
   * Words that should appear bold. Comparison is done on the
   * word stripped of punctuation (e.g. "Josh," → "Josh").
   */
  bold?: string[]
}

const Typewriter = ({ lines, speed = 80, bold = [] }: TypewriterProps) => {
  const displayText = useTypewriter(lines, speed)

  /**
   * Break the live string into lines, then into words,
   * bolding any word whose cleaned representation appears in `bold`.
   */
  const formatted = displayText.split("\n").map((line, lineIdx) => (
    <React.Fragment key={lineIdx}>
      {line.split(/(\s+)/).map((segment, segIdx) => {
        // Keep whitespace segments exactly as-is.
        if (/^\s+$/.test(segment)) return segment

        // Pull out any leading or trailing punctuation.
        const match = segment.match(/^([A-Za-z0-9]+)([^A-Za-z0-9]*)$/)
        const word = match ? match[1] : segment // “Josh”
        const punctuation = match ? match[2] : "" // “,”

        // Decide whether the word (sans punctuation) should be bold.
        return bold.includes(word) ? (
          <React.Fragment key={segIdx}>
            <strong className="font-bold">{word}</strong>
            {punctuation}
          </React.Fragment>
        ) : (
          <React.Fragment key={segIdx}>{segment}</React.Fragment>
        )
      })}
      {/* Insert <br/> after every line except the last. */}
      {lineIdx < lines.length - 1 && <br />}
    </React.Fragment>
  ))

  return <p>{formatted}</p>
}

export default Typewriter
