import { useState, useEffect } from "react"

/**
 * Incrementally builds the text contained in `lines`, typing one
 * character at a time without ever erasing already‑printed text.
 *
 * @param lines  Array of lines to type (each line rendered separately)
 * @param speed  Milliseconds between keystrokes – defaults to 50 ms
 */
export const useTypewriter = (lines: string[], speed = 50) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    const fullText = lines.join("\n")
    let i = 0

    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1))
        i += 1
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [lines, speed])

  return displayText
}
