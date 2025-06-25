import { useState, useEffect } from "react"

// Animate strings with a simple typewriter effect.

export const useTypewriter = (lines: string[], speed = 50) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    // Combine all lines so we can index through them character by character.
    const fullText = lines.join("\n")
    let i = 0

    const interval = setInterval(() => {
      if (i < fullText.length) {
        // Reveal the next character.
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
