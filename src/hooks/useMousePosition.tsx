import { useState, useEffect } from "react"

// Track the user's mouse coordinates.

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const updateMousePosition = (e: MouseEvent) => {
    // Update state with the latest cursor position.
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])
  return mousePosition
}
