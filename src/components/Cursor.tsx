"use client"

import useMousePosition from "@/hooks/useMousePosition"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
const ACCENT_COLORS = ["#EFF1F3", "#586183", "#C01C1C"]

export default function Cursor() {
  // Start at 1 → left = blue, right = red (white is “waiting in line”)
  const [step, setStep] = useState(1)
  const { x, y } = useMousePosition()

  // Rotate colors on any left‑click in the window.
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setStep((prev) => (prev + 1) % ACCENT_COLORS.length)
    }
    window.addEventListener("mousedown", handleMouseDown)
    return () => window.removeEventListener("mousedown", handleMouseDown)
  }, [])

  const leftColor = ACCENT_COLORS[step % ACCENT_COLORS.length] // calcu
  const rightColor = ACCENT_COLORS[(step + 1) % ACCENT_COLORS.length]

  return (
    <motion.div
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      animate={{ x, y }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="relative w-10 h-10 pointer-events-none opacity-70">
        {/* main dot */}
        <div className="absolute inset-0 rounded-full bg-black " />

        {/* bottom‑left accent dot */}
        <div
          className="absolute -bottom-3 -left-5 w-4 h-4 rounded-full"
          style={{ backgroundColor: leftColor }}
        />

        {/* bottom‑right accent dot */}
        <div
          className="absolute -bottom-3 -right-5 w-4 h-4 rounded-full"
          style={{ backgroundColor: rightColor }}
        />
      </div>
    </motion.div>
  )
}
