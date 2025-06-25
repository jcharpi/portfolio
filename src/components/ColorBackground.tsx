"use client"

import { motion } from "motion/react"
import { ACCENT_COLORS, useColorCycle } from "@/contexts/ColorCycleContext"

// Animated full-screen background that follows the current accent color.
export default function ColorBackground() {
  const { colorIndex } = useColorCycle()

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ backgroundColor: ACCENT_COLORS[1] }}
      animate={{ backgroundColor: ACCENT_COLORS[colorIndex] }}
      transition={{
        duration: 0.15,
        ease: "easeIn",
      }}
    />
  )
}
