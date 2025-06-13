// src/components/ColorBackground.tsx
"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const ACCENT_COLORS = ["#EFF1F3", "#586183", "#C01C1C"]

export default function ColorBackground() {
  const [bgColorIndex, setBgColorIndex] = useState(0)

  // Handle clicks anywhere in the document
  useEffect(() => {
    const handleClick = () => {
      setBgColorIndex((prev) => (prev + 1) % ACCENT_COLORS.length)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ backgroundColor: ACCENT_COLORS[1] }}
      animate={{ backgroundColor: ACCENT_COLORS[bgColorIndex] }}
      transition={{
        duration: 0.05,
        ease: "easeIn",
      }}
    />
  )
}
